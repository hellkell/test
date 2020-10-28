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
	for (let i=0; i < input.length; i++) {
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
	console.log(zet, ' => ', arr);
	res.create({input: arr, output: zet});
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
// sequelize.query('INSERT INTO res (input, output) VALUES (ARRAY[5, 1, 3, 4, 2]::INTEGER[], ARRAY[1, 2, 3, 4, 5]::INTEGER[])');
// sequelize
//   .query('SELECT * FROM res', { raw: true })
//   .then(res => {
//     console.log(res[0])
//   })