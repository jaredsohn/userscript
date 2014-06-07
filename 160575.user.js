// ==UserScript==
// @name       MW Rozkazy
// @namespace  http://userscripts.org/scripts/show/160575
// @version    1.4.2
// @description  Wyswietla rozkazy MW i MUDO podane na ircu
// @include      /^http?://www\.erepublik\.com/(pl|en)$/
// @include      htt*://*erepublik.com/*military*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js
// @updateURL		https://userscripts.org/scripts/source/160575.meta.js
// @downloadURL		https://userscripts.org/scripts/source/160575.user.js
// @grant    GM_xmlhttpRequest
// @copyright  2013+, Sorsha
// ==/UserScript==

$("#header").append("<div class='rozkazy_mw'></div>");
$("div.rozkazy_mw").css({'background-color': '#F2FCFF', 'border-left': '1px solid #C5E4FE', 'border-right': '1px solid #C5E4FE', 'border-top': '1px solid #C5E4FE', 'border-bottom': '1px solid #C5E4FE',
     'border-collapse': 'separate', 'border-radius' : '5px 5px 5px 5px', 'clear' : 'both', 'height' : '55px', 'position':'relative', 'bottom' :'10px', 'right' : '3px', 'width' : '758px', 'display' : 'block',
     'float' : 'right' });
$("div.rozkazy_mw").append("<span class='mw_info'><img src='http://h188116344.rev.rootvps.pl/~lete/mw.png' alt='mw' class='mw_info_img'></span>");
$("span.mw_info").css({"color":"#5A8931", 'float' : 'left', 'width' : '50px'});
$("img.mw_info_img").css({'padding-top' : '4px', 'padding-left' : '8px'});
$('#orderContainer').after("<div style='clear: both;'></div><div class='mudo_mw'></div>");
$("div.mudo_mw").css({'background-color': '#F2FCFF', 'border-left': '1px solid #C5E4FE', 'border-right': '1px solid #C5E4FE', 'border-top': '1px solid #C5E4FE', 'border-bottom': '1px solid #C5E4FE',
     'border-collapse': 'separate', 'border-radius' : '5px 5px 5px 5px', 'clear' : 'both', 'height' : '54px',});
    
GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://h188116344.rev.rootvps.pl/~lete/',
	onload: function(xpr) {         
		$("div.rozkazy_mw").append("<span class='mw_rozkazy'>" + showText(xpr.responseText) + "</span>");
        $("span.mw_rozkazy").css({"color":"#3C8FA7", "font-weight" : "bold", 'float' : 'left', 'position' : 'relative', 'top' : '8px', 'font-size' : '9pt', 'left' : '8px', 'width' : '700px'});
        $("span.mw_rozkazy a").css({"color":"red"});
	},
	onerror: function(xpr) {
		$("div.rozkazy_mw").append("<span class='mw_rozkazy'>Bijcie wg rozkazow MON</span>");
        $("span.mw_rozkazy").css({"color":"#3C8FA7", "font-weight" : "bold", 'float' : 'left', 'position' : 'relative', 'top' : '8px', 'font-size' : '9pt', 'left' : '8px', 'width' : '700px'});
        $("span.mw_rozkazy a").css({"color":"red"});
	}
});

GM_xmlhttpRequest({
      method: "GET",
      url: "http://h188116344.rev.rootvps.pl/~lete/mudo.txt",
      headers: {
      	"Accept": "text/html"
      },
      onload: function(xpr){
          $("div.mudo_mw").append("<div class='mudo_content'><span class='mudo_value'><span class='mudo_text'>MUDO MW: </span>" + showText(xpr.responseText) + "</span></div>");
          $("span.mudo_text").css({"color":"black", "font-weight" : "bold"});
          $("span.mudo_value").css({"color":"#3C8FA7", "font-weight" : "bold", 'float' : 'left', 'position' : 'relative', 'top' : '4px', 'font-size' : '9pt', 'padding-left' : '8px', 'padding-right' : '8px'});
      }
});

function showText(text){
    var newText = "";
    var step = text.indexOf("MON</a>]");
    var step2 = text.indexOf("<br>");
    if(step == -1){
    	step = text.indexOf("MON]");
    }
    if(step == -1){
    	return linkify(text);   
    }
    newText += text.substring(0, step);
    newText += linkify(text.substring(step, step2+4));           
    step = text.indexOf("MW]");
    if(step == -1){
    	return newText;   
    }
    newText +=text.substring(step2+4, step);
    newText +=linkify(text.substring(step));
    
    return newText;
}

function linkify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');
    replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
}
