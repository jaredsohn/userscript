// ==UserScript==
// @name           Swagbucks.com Sponsored Results Remover
// @namespace      http://swagbucks.com/*
// @description    Removes Swagbucks.com's "Sponsored By" results.
// @include        http://swagbucks.com/*
// ==/UserScript==

var uls = document.getElementsByTagName("ul");
//var uls = document.getElementsByClassName("webSearchResults").item(0)
var ulx, l, c, t, iflag;

iflag = 0;
var pagenum = getQueryVariable("p");

for (var ulxs=0; ulxs<uls.length; ulxs++){
	ulx = uls[ulxs];
	for (var lis=0; lis<ulx.childNodes.length; lis++){
		l=ulx.childNodes[lis];
		if (l.nodeType==1) {
			c=l.innerHTML;
			if (pagenum == 1) {
				iflag = iflag + 1;
			}
			if ((c.indexOf("Sponsored By http") > 0) && (iflag > 1 || iflag == 0)) {
				l.style.display = 'none';
			}
		}
	}
}


//function from here: http://snipplr.com/view.php?codeview&id=623
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  } 
}