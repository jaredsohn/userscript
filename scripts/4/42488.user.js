// ==UserScript==
// @name           xkcd
// @namespace      xkcd
// @include        http://*xkcd.*
// ==/UserScript==

var header = document.getElementById("topContainer");
header.style.display = "none";


var footer = document.getElementById("middleFooter");
footer.style.display = "none";


var divs = document.getElementsByTagName("div");
var x = 0, i;
for (i=0; i<divs.length; ++i) {
    if (divs[i].getAttribute("class") == "menuCont") {
	x++;
	if (x>1) {
	    //divs[i].style.display = "none";
	    var title = divs[i].parentNode.childNodes[1].innerHTML;
/* Fixme, forum search is broken */
	    divs[i].innerHTML = "<a href=\"http://forums.xkcd.com/search.php?sr=topics&fid[]=7&keywords=" + encodeURI(title) + ">Forum</a><br/>";
	}
    }
}
