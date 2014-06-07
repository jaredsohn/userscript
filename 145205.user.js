// ==UserScript==
// @name        FL
// @namespace   http://userscripts.org/users/484334
// @description FL
// @include     http://filelist.ro/*
// @include     http://flro.org/*
// @version     1
// ==/UserScript==
document.body.innerHTML = document.body.innerHTML.replace(/<div style="background:#e4ebf2; padding:5px;border: 1px black dotted;max-width: 700px;word-wrap:break-word;">/g,"<div class=\"quote\">");
document.body.innerHTML = document.body.innerHTML.replace(/<font class="small" color="#999999">Offline<\/font>/g,"<font class=\"small\" color=\"#A1A1A1\">Offline</font>");
document.body.innerHTML = document.body.innerHTML.replace(/<font class="small" color="#000066">Online<\/font>/g,"<font class=\"small\" color=\"#336633\">Online</font>");
document.body.innerHTML = document.body.innerHTML.replace(/<font color="#000000">/g,"<font color=\"#E0E0E0\">");
document.body.innerHTML = document.body.innerHTML.replace(/<font color="#444444">/g,"<font color=\"#E0E0E0\">");
document.body.innerHTML = document.body.innerHTML.replace(/<font color="black">/g,"<font color=\"#E0E0E0\">");

function replaceStyleSheet(oldCSS, newCSS) {
    document.evaluate('//link[@rel="stylesheet" and @href="'+oldCSS+'"]', document, null, 
		      XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href = newCSS;
}

replaceStyleSheet("/styles/2.css", "http://142.4.205.51/2.css");