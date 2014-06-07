// ==UserScript==
// @name SOJavaScriptGreetRemover
// @description Removing the annoying bot greeter from the StackOverflow JS chatroom
// @match http://chat.stackoverflow.com/rooms/*
// @version 0.0.2
// ==/UserScript==

var main = function () {
  var checkForWelcome = function (event) {
      var e = JSON.parse(event.data).r17.e;
      if (e != null) {
          if (e.length > 0) {
              for (var i = 0; i < e.length; i++) {
                  if (e[i].content != null) {
                      if (e[i].content.indexOf("Welcome to the JavaScript chat!") >= 0 && e[i].user_name === 'SO ChatBot' && e[i].user_id === 1839506) {
                          var $userMessage = $('#message-' + e[i].message_id);
                          var $userMessages = $userMessage.parent();
                          if ($userMessages.children('.message').length === 1) {
                              $userMessages.parent().remove();
                          } else {
                              $userMessage.remove();
                          }
                      }
                  }
              }
          }
      }
  }
 
  $.post("/ws-auth", fkey({roomid: /\d+/.exec(location)[0] }), function (data) { 
      var socket = new WebSocket(data.url + "?l=99999999999");
      socket.addEventListener('message', checkForWelcome);
  });
};
 
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);