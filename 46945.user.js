// ==UserScript==
// @name           MSDNLib = Dev10
// @namespace      msdnLib
// @include        http://msdn.microsoft.com/en-us/library/*
// @version        2
// ==/UserScript==

function msdnToTen() {
	aTags = unsafeWindow.document.getElementsByTagName("a");
	for (var i=0; i<aTags.length; i++) {
		if (aTags[i].href.indexOf("dev10ide")===-1 && aTags[i].href.indexOf(".aspx")!==-1) {
			aTags[i].href = aTags[i].href.replace(/(\.aspx)$/i,"(dev10ide)$1");
		}
	}
}

// fix the current URL if it's not v10
if (location.href.indexOf("dev10ide")===-1){
	location.href = location.href.replace(/(\([^\)]+\))?(\.aspx)$/i, "(dev10ide)$2");
	return;
}

// fix links on immediately loaded page parts
msdnToTen();

// 1 second intervals until 3 (while the page loads),
// then 3 second intervals forever (to handle expanding nav tree nodes)
setTimeout(msdnToTen, 1000);
setTimeout(msdnToTen, 2000);
setInterval(msdnToTen, 3000);