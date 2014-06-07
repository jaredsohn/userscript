// ==UserScript==
// @name           JeuxDeMots Censure Mod
// @namespace      Plop
// @description    Muhahaha
// @include        *diko-comment.php*
// @version        1.7
// @author         Arnaud BEY
// ==/UserScript==


	
	
text = document.getElementById('diko_discussion_block').innerHTML

var reg=new RegExp('<div id="diko_name_block" style="display:inline;font-weight:bold;">k@tsof</div><div id="diko_text_block" style="display:inline;font-weight:normal;color:black;">(.*?)</div>',"g");
text = text.replace(reg,"<div style='color:lightgrey;'>k@tsof BLABLABLA $1 BLABLABLA</div>");

document.getElementById('diko_discussion_block').innerHTML = text;

