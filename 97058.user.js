// ==UserScript==
// @name           New Gawker Sites Giant Ad Killer
// @namespace      http://kodewerx.org/
// @include        http://gizmodo.com/*
// @include        http://lifehacker.com/*
// @include        http://io9.com/*
// @include        http://kotaku.com/*
// ==/UserScript==

if ('undefined' == typeof __James0x57__Gawker__) {
  (function page_scope_runner() {
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.setAttribute("src", "data:,"+escape("var __James0x57__Gawker__ = true;\n" + my_src));
    setTimeout(function() { document.body.appendChild(script); document.body.removeChild(script); }, 0);
  })(); return; // this block is to avoid the use of exploitable Greasemonkey API
}// via http://wiki.greasespot.net/Content_Scope_Runner

keepdead = function (){
	if(document.getElementById("marquee-frame"))
	{
		document.getElementById("marquee-frame").style.display="none";
		document.getElementById("marquee-frame").parentNode.style.display="none";
	}
}
setInterval("keepdead()", 100);