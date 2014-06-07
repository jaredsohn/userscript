// ==UserScript==
// @name           Forum clicking tweak
// @namespace      kwierso@kwiersoisaprettycoolguy.com
// @include        http://roosterteeth.com/forum/
// ==/UserScript==

(function() {
    //watchedforums is a comma-delimited array of forum id numbers that you care about
    var watchedforums = [11, 38, 14];

    var doc = document;
    var forums = getElementsByClass("hlines", doc.getElementById("pageContent"))[0].getElementsByTagName("tbody")[0].children;
    var current;

    // loop to attach click event listeners to forum table rows
    for(var i = 0; i < forums.length; i++) {
        current = forums[i].getElementsByTagName("table")[0];
        if(current) {
            current.addEventListener("click", captureClick ,false);
        }
    }

    // stringify watchedforums
    for(var i = 0; i < watchedforums.length; i++) {
        watchedforums[i] = watchedforums[i].toString();
    }

    // loop to color rows/links specified by watchedforums
    for(var i = 0; i < forums.length; i++) {
        current = forums[i].getElementsByTagName("table")[0];
        if(current) {
            rowbold = current.getElementsByTagName("b");
            if(rowbold[1] && watchedforums.indexOf(current.getElementsByTagName("a")[0].href.split("=")[1]) >= 0) {
                //rowbold[1].parentNode.setAttribute("userwatched", "true");
                current.setAttribute("userwatched", "true");
            }
        }
    }
})();

function captureClick(e) {
    document.location = this.getElementsByTagName("a")[0].href;
}

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