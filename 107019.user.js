// ==UserScript==
// @name OGame - CHAT GT-R v2
// @author THORMENTA GT - ogame.com.es
// @include http://uni113.ogame.com.es*
// @description    CHAT GT-R v2
// ==/UserScript==
// Versión 1.1


(function(){

var footer = document.getElementById('siteFooter');

var p = document.createElement("p");
var chat = '<embed wmode="transparent" src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="760" height="500" name="chat" FlashVars="id=150987744&rl=Argentina" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small><a target="_BLANK" href="http://xat.com/web_gear/?cb">Get your own Chat Box!</a> <a target="_BLANK" href="http://xat.com/web_gear/chat/go_large.php?id=150987744">Go Large!</a></small><br>';


p.setAttribute('style', 'margin:0px;');
p.innerHTML = chat;
footer.appendChild(p);

})(); 