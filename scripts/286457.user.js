// ==UserScript==
// @name        PlagScan Email fix
// @namespace   PlagScanHSikkema
// @description Adds a PlagScan Original Document Download link
// @include     https://mail.google.com/*
// @include     http://mail.google.com/*
// @version     1
// @grant       none
// ==/UserScript==

/*'| <a href="https://www.plagscan.com/view?3780969" target="_blank">View within text</a><br>'
*/
if (window.top != window.self){  //don't run on frames or iframes
	return;
}

var zGbl_PageChangedByAJAX_Timer = '';

window.addEventListener ("load", LocalMain, false);

function LocalMain (){
	if (typeof zGbl_PageChangedByAJAX_Timer == "number"){
		clearTimeout (zGbl_PageChangedByAJAX_Timer);
		zGbl_PageChangedByAJAX_Timer = '';
	}

	document.body.addEventListener ("DOMNodeInserted", PageBitHasLoaded, false);
}


function PageBitHasLoaded (zEvent){
	if (typeof zGbl_PageChangedByAJAX_Timer == "number"){
		clearTimeout (zGbl_PageChangedByAJAX_Timer);
		zGbl_PageChangedByAJAX_Timer  = '';
	}
	zGbl_PageChangedByAJAX_Timer = setTimeout (function() {HandlePageChange (); }, 666);
}


function HandlePageChange (){
	removeEventListener ("DOMNodeInserted", PageBitHasLoaded, false);
	//var d=new Date();
	//alert ('Page has finished loading! '+d);
	//alert('going...');
	ChangeLink2();
}
function ChangeLink2 (){

	var links = document.getElementsByTagName('a');
	var notdoneyet = true;

	for(var i = 0; i < links.length; ++i) {
		var a = links[i];
		if(a.href.indexOf("https://www.plagscan.com/dlOrig?") == 0) {
			notdoneyet=false;
		}
	}
	if (notdoneyet==true){
		for(var i = 0; i < links.length; ++i) {

			var a = links[i];
			if(a.href.indexOf("https://www.plagscan.com/view?") == 0) {
				//alert('links # = '+i);
				var id = a.href.split('?');
				id = id[id.length - 1];
				//alert('id = '+id);
				if((id !== "")&&(notdoneyet==true)) {
					var hp = document.createElement('a');
					hp.setAttribute("href", "https://www.plagscan.com/dlOrig?" + id);
					hp.appendChild(document.createTextNode(" | [Download Original Here]"));
					if(a.nextSibling){
						a.parentNode.insertBefore(hp, a.nextSibling);
					}else{
						a.parentNode.appendChild(hp);
					}
					notdoneyet=false;

				}
			}
		}
	}
	//alert('Done');

}
