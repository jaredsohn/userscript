// ==UserScript==
// @author			Kitsuneymg
// @name			GMail Cleanup
// @namespace		http://google.com/kitsuneymg/gmailcleanup
// @description		Removes a lot of the footer stuff. Moves logged in info to the top
// @include			http://mail.google.*
// @include			https://mail.google.*
// ==/UserScript==

(function(){
var css="\
	div.nH.l2.ov div.nH div.l6 /*Last Activity -- actually usefull*/\
	{\
		position:absolute !important;\
		right: 10px !important;\
		top: 35px!important;\
	}\
\
	div.J-Zh-I.J-J5-Ji.L3[id=\":rj\"], /*Seacrh Web*/\
    div.nH.pY,	/*Invites*/\
	div.nH.l2.ov div.nH div.mn, /*Learn More*/\
	div.nH.l2.ov div.nH div.md, /*Storage -- Like I have anywhere near 8 GB of EMAIL*/\
	div.nH.l2.ov div.nH div.mp, /*Interface Controls*/\
	div.nH.l2.ov div.nH div.ma, /*Misc Bullshit*/\
	div.AY.D.E					/*Bottom Toolbar -- Copy of top*/\
	{\
		display: none !important;\
	}\
";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();


