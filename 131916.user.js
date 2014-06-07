// ==UserScript==
// @name Code Project Daily News Fix
// @description Puts the redirect back into the Code Project Daily News links, by breaking the pages out of their iFrames.
// @match http://www.codeproject.com/script/News/View.aspx*
// ==/UserScript==

(function f(n){
	for(x in a=document.getElementsByTagName("iframe")){
		if((l=a[x].src)!=undefined){
			break;
		}
	}
	if(l||n>10){
		document.location = l;
	} else {
		setTimeout(f(n++),500);
	}
})(0);