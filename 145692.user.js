// ==UserScript==
// @name        quakenet TW
// @namespace   *
// @include     http://*.the-west.*/game.php*
// @version     1
// ==/UserScript==

var script = document.createElement ('script');
script.type = 'text/javascript';
script.id = 'externer_chat';
script.innerHTML = "ChatWindow = undefined;var div_chat = document.createElement('div');div_chat.style.position = 'relative';div_chat.style.top = '5px';div_chat.style.left = '-120px';div_chat.style.width = '300px';div_chat.innerHTML = '<div onclick=\"OpenW();\"><div class=\"tw2gui_button\"><div class=\"tw2gui_button_right_cap\"></div><div class=\"tw2gui_button_left_cap\"></div><div class=\"tw2gui_button_middle_bg\"></div><div class=\"textart_title\" style=\"font: bold 10pt Arial;\">Externer Chat</div></div></div>';document.getElementById('character_money').appendChild(div_chat);function OpenW(){ChatWindow = wman.open('chatWin', 'Externer Chat').setMiniTitle('Externer Chat');var new_frame = document.createElement('iframe');new_frame.src = 'http://webchat.quakenet.org/';new_frame.width = '680px';new_frame.height = '370px';new_frame.style.marginTop = '5px';new_frame.style.marginLeft = '5px';document.getElementsByClassName('chatWin')[0].getElementsByClassName('tw2gui_window_content_pane')[0].appendChild(new_frame);}";
document.getElementsByTagName ('body')[0].appendChild (script);