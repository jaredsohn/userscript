// ==UserScript==
// @name           Chilled times safe section button renamer
// @include        http://www.chilledtimes.com/showthread.php*
// @include        http://www.chilledtimes.com/newreply.php*
// @include        http://www.chilledtimes.com/newthread.php*
// @version        1.3.1
// ==/UserScript==

var drugs = new Array();

drugs[0] = "Cannabis Photography";
drugs[1] = "Smoking Paraphernalia";
drugs[2] = "Other Cannabis Hotspots";
drugs[3] = "Glass Section";
drugs[4] = "Cannnabis Cookery Forum";
drugs[5] = "Medical Cannabis";
drugs[6] = "General Drug Chat";
drugs[7] = "Psychedelics";
drugs[8] = "Grow Forum";
drugs[9] = "Legal Highs";
drugs[10] = "Forum Access Nominations";
drugs[11] = "Moderator Forum";
drugs[12] = "The Secret Garden";

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

var gotmatch = 0;

var navs=getElementsByClass('navbar',document,'span');
var navsLen = navs.length;
var drugsLen = drugs.length;
for (x = 0; x < navsLen; x++) {
for (y = 0; y < drugsLen; y++) {
var thisnav=navs[x].innerHTML;
if(!thisnav.match(drugs[y])) {
// do nothing
} else {
gotmatch++;
}
}
}
var txt=document.getElementsByName("sbutton");
if(gotmatch>0) {
txt[0].style.background ="#00ff00";
txt[0].value = "Post In Drug Area";
var logo = document.createElement("div");
logo.innerHTML = '<div id="leaf" style="position: fixed; top:0; left: 0; width: 32; height: 32;"><img src="http://www.shepy.co.uk/chilled/weed_icon_32.png"></div>';
document.body.insertBefore(logo, document.body.firstChild);
} else {
txt[0].style.background ="#ff0000";
txt[0].value = "NO DRUG TALK";
}

	

