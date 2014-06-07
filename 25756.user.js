// ==UserScript==
// @creator        Caio Guimarães <caio.guimaraes@gmail.com>
// @version        1.0.2
// @email          caio.guimaraes@gmail.com
// @name           Orkut AntiVirus
// @namespace      http://userscripts.org/users/51226
// @description    Prevents potentially harmful posts on any scrapbook to spread by removing the links and placing a warning message on the malicious post.
// @include        http://www.orkut.com/Scrapbook.aspx
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

scraps = getElementsByClass("listitemchk", document, "div");

keywords = ["orkut", "youtube", "scrap", "freewebtown", "instantflashx", "watchx", "circulosamizade", "pisem.su", "topwebline", "snapvine", "ifrance", "fantasminha01", "videos11", "videossafadinha", "nytimes", "cinevideo"];

for (i=0; i < scraps.length; i++) {
	if (scraps[i].innerHTML.indexOf("flashDiv") == -1){
		aElements = scraps[i].getElementsByTagName("a");
		inputElements = scraps[i].getElementsByTagName("input");

		for  (j=0; j < aElements.length; j++){
			for (k=0; k<keywords.length; k++){
				if (aElements[j].getAttribute("href") && aElements[j].getAttribute("href").indexOf(keywords[k]) != -1){
					alert("MALICIOUS LINK FOUND!\n\n" + aElements[j].getAttribute("href") + "\n\nNOTE: Do not visit this URL, it's here just educational purposes only!");
					aElements[j].removeAttribute("href");
					aElements[j].setAttribute("title", "Link removed for your safety!");
					inputElements[0].checked = true;
				}
			}
		}
	}
}