// Создаем экземляр класса
var skylink = new Skylink();

//Присоединение к чату
skylink.on('peerJoined', function(peerId, peerInfo, isSelf) {
  var input = document.getElementById('name');	
  var user = input.value;
  if(!isSelf) {
    user = peerInfo.userData.name || peerId;
  }
  addMessage(user + ' joined the room');
});

//Обновление имени собеседника
skylink.on('peerUpdated', function(peerId, peerInfo, isSelf) {
  if(isSelf) {
    user = peerInfo.userData.name || peerId;
    addMessage('You\'re now known as ' + user);
  }
});

//Уйти из чата
skylink.on('peerLeft', function(peerId, peerInfo, isSelf) {
  var input = document.getElementById('name');
  var user = onput.value;
  if(!isSelf) {
    user = peerInfo.userData.name || peerId;
  }
  addMessage(user + ' left the room', 'action');
});

//Добавить сообщение
skylink.on('incomingMessage', function(message, peerId, peerInfo, isSelf) {
  var input = document.getElementById('name');
  var user = input.value;
  if(!isSelf) {
    user = peerInfo.userData.name || peerId;
  }
  addMessage(user + ': ' + message.content);
});
//Инициализация апликейшн ключа. Требуется регистраци на сайте developer.temasys.com.sg
skylink.init('8390f8de-21ce-4fb5-b9b0-b467938e128a');

var next_butt = document.getElementById("next_button");
var leave_room = document.getElementById("leave_room");
var send = document.getElementById("send_mes");
leave_room.addEventListener("click", leaveRoom);
next_butt.addEventListener("click", startChat);
send.addEventListener("click", sendMessage);

// Идентифицируем беседника
function startChat() {
  var input = document.getElementById('name');
  document.getElementById('greeting').innerHTML = "Welcome, " + input.value;
  //var input = document.querySelector("input[name=Name]");
  if (input.value == ""){
  	alert("Input name please");
  	//input.className = "error_input";
  	document.querySelector("input[name=Name]").style.cssText="border: 2px solid red;";
  	return false;
  }
  skylink.setUserData({
    name: input.value
  });
  document.querySelector("#mainform fieldset:first-of-type").style.display = "none";
  document.querySelector("#mainform fieldset:last-of-type").style.display = "block";
  //присоедениться к чату
  skylink.joinRoom();
}
//Покинуть комнату
function leaveRoom() {
  skylink.leaveRoom();
  location.reload();
}
//Отправить лсообщение
function sendMessage() {
  alert("Message");
  var input = document.getElementById('message');
  skylink.sendP2PMessage(input.value);
  input.value = '';
}
//Добавить сообщение 
function addMessage(message) {
  var chatbox = document.getElementById('message_holder');
  chatbox.value+=message+"\n";
}