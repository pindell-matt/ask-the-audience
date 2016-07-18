var socket = io();

var connectionCount = document.getElementById('connection-count');
var currentTally = document.getElementById('current-tally');

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

var statusMessage = document.getElementById('status-message');

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

socket.on('voteCount', function (votes) {
  currentTally.innerText = 'Current Tally: ' + formatVotes(votes);
  console.log(votes);
});

var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}

// do a for each alt option
function formatVotes(votes){
  let a = "A: " + votes.A + " ",
      b = "B: " + votes.B + " ",
      c = "C: " + votes.C + " ",
      d = "D: " + votes.D + " ";
  return a + b + c + d;
}
