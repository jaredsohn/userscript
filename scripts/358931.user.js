/*<![CDATA[*//*
// ==UserScript==
// @name          defPrefs
// @description   improvement of style
// @include       *
// @namespace     userscripts.org/users/46776
// ==/UserScript==*/
function adstyle(){
	var doc=document,adstyle=doc.createElement('style'),
	usercs="body{text-shadow:.3px .2px 0 rgb(0,0,0);}div{background-image:none!important;}";
	adstyle.appendChild(doc.createTextNode(usercs));
	doc.getElementsByTagName('head')[0].appendChild(adstyle);
}

  document.addEventListener('load',adstyle(),false);


/*]]>*/