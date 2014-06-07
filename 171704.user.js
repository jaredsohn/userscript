// ==UserScript==
// @name        OGame Alliance Chat
// @namespace   By WaKo
// @description Places an alliance chatbox in the bottom left corner
// @include     http://*.ogame.*/game/index.php?page=*
// @version     1.1
// ==/UserScript==

Floatdiv = document.createElement('div');
Floatdiv.setAttribute("id", "ChatBoxDiv");
Floatdiv.setAttribute("style", "position: fixed; bottom: 15px; left: 5px; z-index:100");
document.getElementsByTagName("body")[0].appendChild(Floatdiv);

Shoutbox = document.getElementById('ChatBoxDiv');

// Visit [http://www.yourshoutbox.com/users/register/1] to register your own shoutbox.
// Then change [key=000000000] to your shoutbox key which is given in your code.
Shoutbox.innerHTML += '<iframe src="http://www.yourshoutbox.com/shoutbox/sb.php?key=000000000" scrolling="no" frameborder="0" width="200px" height="330px" style="border:0; margin:0; padding: 0;">';
Shoutbox.innerHTML += '</iframe>';