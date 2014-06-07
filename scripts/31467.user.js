// ==UserScript==
// @name           modcp_addon2
// @namespace      http://userscripts.org/users/60487
// @include        http://board.ogame.onet.pl/board.php?boardid=*
// ==/UserScript==


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
	return classElements;
}

tid = getElementsByClass("tablea");
komorki = getElementsByClass("tableb_fc");
for (i = 0, j=2; i < komorki.length; i++) {
  threadid = tid[j].innerHTML.split("threadid=");
  if (threadid.length > 1) {
    threadid = threadid[1].split("\">");
  } else {
    threadid="";
  }
  threadid[0] = threadid[0].replace("&amp;goto=firstnew","");
  komorki[i].innerHTML = komorki[i].innerHTML+"<a style=\"border-style: none; border-width: 0px;\" href=\"http://board.ogame.onet.pl/modcp.php?action=thread_close&amp;threadid="+threadid[0]+"\" target=\"_blank\"><img src=\"http://board.ogame.onet.pl/pl_images_ogame/lockfolder.gif\" style=\"border-style: none; border-width: 0px;\"/></a>";		
  j = j+4;
}
