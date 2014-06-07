// ==UserScript==

// @name          Facebook Like all tool
// @namespace     http://scripts.namdx1987.org/
// @description   Like/Unlike all button
// @copyright     namdx1987
// @version       0.1
// @require			http://userscripts.org/scripts/source/92373.user.js
// @include			http://www.facebook.com/*

// ==/UserScript==

var xml=<>
	<a onclick='likeAll();'>Like all</a> | <a onclick='unlikeAll();'>Unlike all</a>
</>

var bar=document.body.appendChild(document.createElement("div"));

bar.innerHTML=xml.toString();

bar.style.position="fixed";
bar.style.bottom="0px";
bar.style.left="200px";
bar.style.backgroundColor="#EBEEF4";
bar.style.border="1px solid rgba(29, 49, 91, 0.3)";
bar.style.padding="5px";

function likeAll()
{
	Utils.Dom.select("//button[contains(@class, 'like_link') and contains(@name, 'like') and not(contains(@name, 'unlike'))]").forEach(function(b){b.click();});
}

unsafeWindow.likeAll=likeAll;

function  unlikeAll()
{
	Utils.Dom.select("//button[contains(@class, 'like_link') and contains(@name, 'unlike') ]").forEach(function(b){b.click();});
}

unsafeWindow.unlikeAll=unlikeAll;