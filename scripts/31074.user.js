// ==UserScript==
// @name           Svt video-downloader
// @namespace      http://userscripts.org/scripts/show/31074
// @description    Ladda ner videos från svt.se/play
// @include        http://svt.se/svt/road/*
// ==/UserScript==

function id(what) {
  return document.getElementById(what);
}

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	if(classElements[0]==null)
	return false;

	return classElements;
}

//download flash movie
var player = id("flashmovie");
if(player){
	var flashvars = player.getAttribute("flashvars").split('&');
		
 		var td = document.createElement("td");
		td.innerHTML="<a href=" + flashvars[0].split('=')[1] + ">Ladda ner</a>";
		td.setAttribute("class", "download");

		var tip = getElementsByClass('tip')[0];
		GM_addStyle("td.download { width: 27%; padding-left: 18px; background: url(/svt_se/css/global/cssimg/regular/downloadPodcast.gif) no-repeat 0 2px;}");
		tip.parentNode.insertBefore(td,tip.nextSibling);
}

var topMeny = id("crumbsWrap");
if(topMeny){
	if(topMeny.innerHTML.search('Start')<0)
		topMeny.innerHTML ="<a onclick='shL()'; href='navigation.jsp?d=37591'>Start</a> / " + topMeny.innerHTML; 
}
