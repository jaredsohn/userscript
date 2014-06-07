// ==UserScript==
// @name          Black list RLSlog Author
// @description	  Lets you ban an author in RLSlog, namely Koala(The mac applications spammer)
// @include       http://www.rlslog.net/page/*/
// @include       http://www.rlslog.net/
// ==/UserScript==

var BlistAuthor="Koala"
var allPageEntries=document.getElementsByTagName("div"); 
for (i=0; i<allPageEntries.length; i++) {
	//Pick out the tags with our class name 
	if (allPageEntries[i].className=="entry") { 
		//alert("booyah"+allPageEntries[i].innerHTML);
		if (allPageEntries[i].innerHTML.indexOf('title="Posts by '+BlistAuthor) != -1){
		//alert("kazaam");
		allPageEntries[i].parentNode.removeChild(allPageEntries[i]);
		}
	} 
} 