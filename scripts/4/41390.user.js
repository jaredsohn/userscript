// ==UserScript==
// @name           Fakten einblenden
// @namespace      Kambfhase
// @description    Blendet didyouknow Fakten ein!
// @include        http://tf2.de/*
// ==/UserScript==

var div = <div class="inbox" style="color:black; font-size: 12px; font-weight: bold; text-align: center; margin-top: 30px"><img src="/global/images/inbox-top.jpg" class="inbox-top" /><img src="/global/images/inbox-bottom.jpg" class="inbox-bottom" /></div>;
GM_xmlhttpRequest({
	method:"GET", url:"http://tf2.de/fun/didyouknow.php?rnd",
	onload:function( response) {
		var text = response.responseText;	
		for( var [key, wert] in Iterator({'ouml':'#246',"auml":"#228","uuml":"#252","szlig":"#223"}))
			text = text.replace( new RegExp(key,"gi"), wert);
		div.insertChildAfter( div.children()[0], new XML("<p>Wusstest du schon, dass ... <br />"+text+"</p>"));
		document.evaluate("//div[@id='content']/div[last()-1]", document, null, 8, null).singleNodeValue.innerHTML += div.toString();
	}
});