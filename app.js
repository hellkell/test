let input, output = [];
let stdin = process.openStdin();
const Sequelize = require("sequelize");
const sequelize = new Sequelize("postgres", "postgres", "1234", {
  dialect: "postgres",
	logging: false,
	define: {
		timestamps: false
	}
});
stdin.addListener("data", function(d) {
	input = d.toString().replace(/\s+/g, ' ').trim().split(' ');
	for (let i = 0; i < input.length; i++) {
		input[i] = parseInt(input[i], 10);
	}
	output = bubble(input);
});

function bubble(arr) {
	let zet = Array.from(arr);
	let len = arr.length;
	for (let i = 0; i < len ; i++) {
		for(let j = 0 ; j < len - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				let temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			}
		}
	}
	res.create({input: zet, output: arr});
	return arr;
}

const res = sequelize.define("res", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  input: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false
  },
  output: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false
  }
});

sequelize.query('CREATE TABLE IF NOT EXISTS res (id SERIAL, input integer[], output integer[]);');

const express = require("express");
const app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);
app.set("view engine", "hbs");
app.get('/', function(request, response) {
	response.render("index.hbs", {
    title: "Test",
  });
});
app.use(express.static('public'));
io.sockets.on('connection', function (socket) {
	socket.on('send input', function (data) {
		io.sockets.emit('send output', {array: bubble(data.array)});
	});
});
server.listen(4000);