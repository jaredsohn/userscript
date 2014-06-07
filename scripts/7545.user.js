// ==UserScript==
// @name           WebSudoku Colors
// @namespace      http://fatknowledge.blogspot.com/
// @description    Add Colors to WebSudoku
// @include        http://show.websudoku.com/*
// @include        http://view.websudoku.com/*
// ==/UserScript==

//add colors to pre-set numbers
var allElements, thisElement;
allElements = document.evaluate(
    '//input[@value]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allElements.snapshotLength; i++) {
    inp = allElements.snapshotItem(i);
    switch (inp.getAttribute("value")) {
        case '1': inp.setAttribute("style","color:red; font-weight: bold;"); break;
        case '2': inp.setAttribute("style","color:#ECD672; font-weight: bold;"); break; //yellow
        case '3': inp.setAttribute("style","color:green; font-weight: bold;"); break;
        case '4': inp.setAttribute("style","color:blue; font-weight: bold;"); break;
        case '5': inp.setAttribute("style","color:orange; font-weight: bold;"); break;
        case '6': inp.setAttribute("style","color:brown; font-weight: bold;"); break;
        case '7': inp.setAttribute("style","color:gray; font-weight: bold;"); break;
        case '8': inp.setAttribute("style","color:purple; font-weight: bold;"); break;
        case '9': inp.setAttribute("style","color:#F660AB; font-weight: bold;"); break; //pink
 	 //GM_log('value:'+ inp.getAttribute("value"));
	}
}


//add colors to enetered values
var allElements, thisElement;
allElements = document.evaluate(
    '//input[@OnKeyUp]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allElements.snapshotLength; i++) {
    inp = allElements.snapshotItem(i);
	inp.addEventListener('keyup', function(event) {
		add_colors(this);
	}, true);

}

function add_colors(f)
{	//GM_log("entered value: "+f.value);
	switch (f.value) {
        case '1': f.setAttribute("style","color:red;"); break;
        case '2': f.setAttribute("style","color:#ECD672; "); break; //yellow
        case '3': f.setAttribute("style","color:green; "); break;
        case '4': f.setAttribute("style","color:blue; "); break;
        case '5': f.setAttribute("style","color:orange; "); break;
        case '6': f.setAttribute("style","color:brown; "); break;
        case '7': f.setAttribute("style","color:gray; "); break;
        case '8': f.setAttribute("style","color:purple; "); break;
        case '9': f.setAttribute("style","color:#F660AB; "); break; //pink
		default : f.setAttribute("style",""); 
	}
}


