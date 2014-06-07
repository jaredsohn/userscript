// ==UserScript==
// @name next moon
// @namespace nextmoon
// @description next moon link attempt 1
// @include http://apps.facebook.com/starconquest/moon.php?moon=*
// ==/UserScript==

var div=document.createElement("div");
var div.innerHTML="<a href='"+document.location.href.replace(/(item=)(\d+)/i,function(){return arguments[1]+(parseInt(arguments[2])+1);})+"'>Next</a>";
div.setAttribute("style","position:relative;left:10px;top:10px;z-index:1000;backgroup:white;border:solid 1px black;padding:2px;");
document.body.appendChild(div);