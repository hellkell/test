let socket = io.connect();
let input_arr = document.getElementsByClassName('rect')[0];
input_arr.addEventListener("keydown", function(event) {
  if (event.keyCode == 13) {//Enter
    this.blur();
    let input = this.value.toString().replace(/\s+/g, ' ').trim().split(' ');
    let parseArray = [], k;
    for (let i = 0; i < input.length; i++) {
      k = parseInt(input[i], 10);
      if (!isNaN(k)) {
        parseArray.push(k);
      }
    }
    socket.emit('send input', {array: parseArray});
  }
});

input_arr.addEventListener("focus", function(event) {
  clearInputs()
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function clearInputs() {
  document.getElementsByClassName('rect')[0].value = '';
  document.getElementsByClassName('rect')[1].value = '';
}

document.getElementsByClassName('btn')[0].addEventListener("click", function(event) {
  let arr = [];
  clearInputs();
  for (let i = 0; i < 10; i++) {
    arr[i] = getRandomInt(150);
  }
  document.getElementsByClassName('rect')[0].value = arr.join(' ');
  socket.emit('send input', {array: arr});
});

socket.on('send output', function (data) {
  document.getElementsByClassName('rect')[1].value = data.array.join(' ');
  console.log(data.array);
});