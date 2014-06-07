// ==UserScript==
// @name OGame - Chat Alianza Returns
// @author Samuelhm - ogame.com.es - Kassiopeia
// @namespace http://userscripts.org/scripts/show/65521
// @include http://uni111.ogame.com.es/*overview*

// @include http://uni111.ogame.com.es/*alliance*
// ==/UserScript==
// Version 1.0


(function(){

var footer = document.getElementById('planet');// para planeta
//var titulo = document.getElementsByTagName('h2');
//titulo[0].innerHTML = 'CHAT RETURNS';
var p = document.createElement("p");
var chat = '<div style="width:210px"><embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="490" height="220" name="chat" FlashVars="id=119209458"  allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br></div>'

//elemento.setAttribute('style', 'height:346px;background-image:none;');
p.setAttribute('style', 'margin:0px;');
p.innerHTML = chat;
footer.appendChild(p);

})();