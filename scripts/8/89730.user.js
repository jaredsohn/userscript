// ==UserScript==
// @name           Gamefaqs Recolor
// @description    Gamefaqs Recolor
// @include        http://www.gamefaqs.com/*
// @include        http://www.gamefaqs.com/boards/*
// ==/UserScript==

(function () {

colorscheme = '#ADFF2F';

document.getElementById("full_col_wrap").style.backgroundColor = colorscheme;
document.getElementById("gutter_top").style.backgroundColor = lightenColor(colorscheme, -60);
document.getElementById("masthead").style.backgroundColor = lightenColor(colorscheme, -60);

var selectedTopicsUser =
document.evaluate("//table[@class='board topics']//tr[not(@class='head')]/td[3]/text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for ( var i = 0; i < selectedTopicsUser.snapshotLength; ++i ) {
  var item = selectedTopicsUser.snapshotItem(i);
	  for each( var children in item.parentNode.parentNode.childNodes ) {
		  
		if ( children.nodeType == 1 )
		  children.style.backgroundColor = colorscheme;
	  }
}

var selectedMessagesUser =
document.evaluate("//table[@class='board message']//tr/td//a/text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var selectedMessagesRows =
document.evaluate("//table[@class='board message']//tr//text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var lightAmt =50;
var lastJ = 0;
for ( var i = 0; i < selectedMessagesUser.snapshotLength; ++i ) {
  var item = selectedMessagesUser.snapshotItem(i);
       if(item.parentNode.parentNode.tagName == "DIV"){
	 	item.parentNode.parentNode.parentNode.style.backgroundColor = colorscheme;
		var j = lastJ;
		while(j < selectedMessagesRows.snapshotLength){
			var nextItem = selectedMessagesRows.snapshotItem(j);
			if(item.nodeValue == nextItem.nodeValue){
				nextItem = selectedMessagesRows.snapshotItem(j+3);
				if(nextItem.nodeValue.match(new RegExp("^From:"))){
	 				nextItem.parentNode.parentNode.parentNode.style.backgroundColor = lightenColor(colorscheme, lightAmt);
	 				nextItem.parentNode.parentNode.parentNode.parentNode.parentNode.style.backgroundColor = lightenColor(colorscheme, lightAmt);
				} else {
					var lightColor = lightenColor(colorscheme, lightAmt);
	 				nextItem.parentNode.parentNode.style.backgroundColor = lightColor;
	 				nextItem.parentNode.parentNode.parentNode.style.backgroundColor = lightColor;
	 				nextItem.parentNode.parentNode.parentNode.parentNode.style.backgroundColor = lightColor;
				}
				j++;
				lastJ = j;
				break;
			}
			j++;
		}
	   
	}
}

function lightenColor(col, amt){
	var r = col.substring(1, 3);
	var g = col.substring(3, 5);
	var b = col.substring(5, 7);
	r = parseInt(r, 16);
	g = parseInt(g, 16);
	b = parseInt(b, 16);
	r = Math.max(0,Math.min(r+amt, 255));
	g = Math.max(0,Math.min(g+amt, 255));
	b = Math.max(0,Math.min(b+amt, 255));
	r = r.toString(16);
	if(r.length==1)
		r = "0"+r;
	g = g.toString(16);
	if(g.length==1)
		g = "0"+g;
	b = b.toString(16);
	if(b.length==1)
		b = "0"+b;
	var newcol = '#'+r+g+b;
	return newcol;
}

})();