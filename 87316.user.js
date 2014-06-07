// ==UserScript==
// @name           Facebook chat name fixer
// @namespace      sg_06
// @include        *.facebook.com*
// @description    Changes the "Me" in facebook chat to your name! ("Jason" by default.)
// ==/UserScript==
n="Jason";
function m(){
	a=document.getElementsByTagName("h5");
		for(q in a){
			if(a[q].innerHTML.slice(-3)==">Me"){
			a[q].innerHTML = a[q].innerHTML.slice(0,-2) + n;
		}
	}
}
setInterval(m,200);