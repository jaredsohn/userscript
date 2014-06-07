// ==UserScript==
// @name           Greenpach
// @namespace      quad
// @description    Changes Pachube colors and removes the Disqus and Google Maps parts.
// @include        *pachube.com*
// ==/UserScript==
unsafeWindow.console.log("Started")
disq=document.getElementById("disqus")
if (disq != null){
disq.parentNode.removeChild(disq);
}
map=document.getElementById("map_canvas")
if (map != null){
map.parentNode.removeChild(map);
}
toppic=document.getElementById("background-top")
if (toppic != null){
toppic.parentNode.removeChild(toppic);
}
floatmid=document.getElementById("background-float")
if (floatmid!=null){
floatmid.parentNode.removeChild(floatmid);
}
unsafeWindow.console.log("start css edit")
document.body.style.backgroundImage="none"
GM_addStyle("body {background-image:none; background-color: #2D6722;}\
	a:hover{color:#449333;}\
	section.sidebar nav.content-block h2{color:#31A41A;}\
	a:visited:hover{color:#449333;}\
	a.current{color:#449333;}\
	#sidebar-wrapper{background-color:#2D6722;}\
	.sidebar{background-color:#2D6722;}\
	.sidebar .block h2{color:#2D6722;}\
	!important")
unsafeWindow.console.log("Done")