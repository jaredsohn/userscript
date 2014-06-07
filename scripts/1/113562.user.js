// ==UserScript==
// @name          ChatGem Voodoo
// @namespace     ironhenge
// @description   Unveil the fabled ChatGem
// @include       http://us.battle.net/d3/en/
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require       http://us.battle.net/d3/static/local-common/js/core.js?v29
// @require       http://us.battle.net/d3/static/local-common/js/tooltip.js?v29
// @require       http://us.battle.net/d3/static/js/d3.js?v4
// ==/UserScript==

function showChatGemVal(){
   alert('Cookie.read(\'d3.chatGem\'):' + Cookie.read('d3.chatGem'));
}

var autoClickGemEnabled = false;
var autoClickGemId = 0;
function autoClickChatGem(){
	autoClickGemEnabled = !autoClickGemEnabled ;	
	clearInterval(autoClickGemId );
	if(autoClickGemEnabled){
		autoClickGemId = setInterval('D3.activateGem()', 200);
                autoClickskullId= setInterval('D3.activateSkull()', 200);
	}
        else{
            //showChatGemVal();
        }
}

$(document).ready(function(){
   $('#chat-gem').click(autoClickChatGem);
   $('#skull-eyes').click(autoClickChatGem);
});
