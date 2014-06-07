// ==UserScript==
// @name        OGame: Convertidor de links
// @namespace   Convertidor-de-links
// @description Cuando alguien envia un link sin formatearlo corectamente, este script lo convierte en un link evitando que tengas que copiar y pegar para poder abrirlo (todos los links se abren en una pestaña nueva)
// @include     http://*.ogame.gameforge.com/game/index.php?page=messages*
// @version     1.4
// @grant       none
// @downloadURL https://userscripts.org/scripts/source/182905.user.js
// @updateURL   http://userscripts.org/scripts/source/182905.meta.js
// @require     http://userscripts.org/scripts/source/118453.user.js
// ==/UserScript==

(function() {
  
  if((typeof(oGameVersionCheck) != "undefined")) {
  	oGameVersionCheck('OGame: Convertidor de links','5.6.99.99','http://userscripts.org/scripts/show/182905');
  }

  if (document.location.href.indexOf ("/game/index.php?page=messages") < 0) return;
  
  var myFunction = (function () {
  
    $(document).ajaxSuccess(function (e, xhr, settings) {
    /* inicio */
    
    
        var replacedText, replacePattern1, replacePattern2, replacePattern3;
        
        var inputText = $(".read .note").html();
        
        if(inputText.indexOf("te dice:") > 0){
          inputText = inputText.split("te dice:")[1];
        }
        
        var exp = /<a\s.*href=['"](\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])['"].*>.*<\/a>/ig;
        inputText = inputText.replace(exp,"$1");
        
        //URLs starting with http://, https://, or ftp://
        replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
        replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
        
        //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
        replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
        replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');
        
        //Change email addresses to mailto:: links.
        replacePattern3 = /(\w+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim;
        replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1" target="_blank">$1</a>');
        
        inputText = $(".note").html();
        if(inputText.indexOf("te dice:") > 0){
          replacedText = (inputText).split("te dice:")[0] + "te dice:" + replacedText;
        }
        
        $(".read .note").html(replacedText);
        
        
    /* fin */
    }); 
	}).toString ();
	var script = document.createElement("script");
	script.setAttribute ("type", "application/javascript");
	script.textContent = "(" + myFunction + ") ();";
	document.body.appendChild (script);
})();