// ==UserScript==
// @name        OGame Alliance Chat
// @namespace   By Kill-joy
// @description Places an alliance chatbox in the bottom right corner
// @include     http://*.ogame.*/game/index.php?page=*
// @version     1.001
// ==/UserScript==

Floatdiv = document.createElement('div');
Floatdiv.setAttribute("id", "ChatBoxDiv");
Floatdiv.setAttribute("style", "position: fixed; bottom: 15px; right: 5px; z-index:100");
document.getElementsByTagName("body")[0].appendChild(Floatdiv);

Shoutbox = document.getElementById('ChatBoxDiv');

// Visit [http://www.yourshoutbox.com/users/register/1] to register your own shoutbox.
// Then change [key=000000000] to your shoutbox key which is given in your code.
Shoutbox.innerHTML += '<iframe src="http://blacksouls.chatovod.ru/widget/" scrolling="no" frameborder="0" width="500px" height="700px" style="border:0; margin:0; padding: 0;">';
Shoutbox.innerHTML += '</iframe>';