// ==UserScript==
// @name OGame - RAWRR chat
// @author Xilexio
// @include http://uni110.ogame.org/*alliance*
// ==/UserScript==
// Version 1.0


(function(){

var footer = document.getElementById('planet');// para planeta
var p = document.createElement("p");
var chat = '<div style="width:210px"><embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" bgcolor="#000000" width="654" height="219" name="chat" FlashVars="id=145329601" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /></div>'

p.setAttribute('style', 'margin:0px;');
p.innerHTML = chat;
footer.appendChild(p);

})();
