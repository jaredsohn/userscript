// ==UserScript==
// @name           Spoiler FC
// @namespace      Spoiler tag for FC
// @description    Añade las funcionalidad SPOILER a Forocoches
// @include        http://*.forocoches.com/*
// @include        http://forocoches.com/*
// @author         WeSo
// @version        20120818
// ==/UserScript==


var pattern = "(.*?)\\[SPOILER\\](.*?)\\[/SPOILER\\](.*?)";
var post;
var exp = new RegExp(pattern, "gi");
var num = 0;

var elem = document.evaluate("//div[contains(@id, 'post_message_')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < elem.snapshotLength; i++) {
	post = elem.snapshotItem(i);
	
	if (post.innerHTML.match(exp)) {
		post.innerHTML = post.innerHTML.replace(exp, function(match, t1, t2, t3, offset, string){
			num++;
			return t1 + "<br /><button id=\"spoiler_btn_" + num + "\" onclick=\"var spoiler_e = document.getElementById('spoiler_" + num + "'); if(spoiler_e.style.display == 'block') { spoiler_e.style.display = 'none'; this.innerHTML = 'MOSTRAR SPOILER'; } else { spoiler_e.style.display = 'block'; this.innerHTML = 'OCULTAR SPOILER'; }\";>MOSTRAR SPOILER</button><div style=\"display: none\" id=\"spoiler_" + num + "\">" + t2 + "</div><br />" + t3;
		});	
	}
}