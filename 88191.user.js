// ==UserScript==
// @name           Google SuperTabs
// @namespace      http://www.chengsdifferent.com/
// @description    Hotkeys tab and shift+tab for fast browsing through google search links
// @include        http://www.google.com/search*
// ==/UserScript==


var linkList = document.getElementsByClassName('l');
var placeHold = 0;
//focus on first search result
//var item = linkList[placeHold];
linkList[placeHold].focus();
linkList[placeHold].style.background= '#ccffff';
//linkList[placeHold].style.font= 'bold';

//listen for keyboard input
document.addEventListener('keypress', keyHandler, true);

function keyHandler(e){
var value = e.keyCode;
if(e.shiftKey && value ==9){
	if(placeHold > 0){
		placeHold--;
		var listItem = linkList[placeHold];
		var prev = linkList[placeHold+1];
		listItem.style.background = '#ccffff';
		//listItem.style.font= 'bold';
		listItem.focus();
		prev.style.background = 'white';
		//prev.style.font= 'normal';
	}
	else{	
		var prevLink = document.getElementById('pnprev');
		if (prevLink){
			window.location.href = prevLink.href;
		}
	}
}
else if(value==9){
	if(placeHold<linkList.length-1){
		placeHold++;
		var listItem = linkList[placeHold];
		var prev = linkList[placeHold-1];
		listItem.style.background = '#ccffff';
		//listItem.style.font= 'bold';
		listItem.focus();
		prev.style.background = 'white';
		//prev.style.font= 'normal';
	}
	else{
		var nextLink = document.getElementById('pnnext');
		if (nextLink){
			window.location.href = nextLink.href;
		}
	}
}
else if(value ==13){
	e.preventDefault();
	var listItem = linkList[placeHold];
	window.location.href = listItem.href;
}
	/*
else if(key=='space')
	navigate_down_pages(true);
else if(key=='`')
	navigate_down_pages(false);
	*/
}

/*
//navigate forward or backward pages
function navigate_down_pages(down){
	

}

*/

