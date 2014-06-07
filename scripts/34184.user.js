// ==UserScript==
// @name           Reveal Password on Mouseover
// @description    Shows you your password when you roll over it. Good to occasionally remind yourself what your passwords are. :)
// @namespace      #
// @include        *
// @version        0.2.1
// ==/UserScript==
var inps=document.getElementsByTagName("input"), inp;
for(var i=inps.length - 1; i >=0 ; --i) {
	inp = inps[i];
	if(inp.type=="password")
	{
		inp.addEventListener("mouseover",function(){this.type="text";}, false);
		inp.addEventListener("mouseout", function(){this.type="password";}, false);
	}
}