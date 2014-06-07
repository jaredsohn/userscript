// ==UserScript==
// @name			EydisWhineRemover
// @description	    Remove whine-infested forum sections from the layout (including Shoutbox :O)
// @include			http://*eydis.fantasy-hr.com/*
// @include			http://*eydis.fantasy-hr.com/forums.html
// @include			http://*eydis.fantasy-hr.com/index.php?*
// ==/UserScript==
//Todo: error checking, custom menus, center align existing menus

var whine, whineTemp, whineChildren;


//Shoutbox
if(whine = document.getElementById("fc_shoutbox-global")){
	whine = whine.parentNode;
	whine.parentNode.removeChild(whine);
}


//Array containing id's of sections which are to be removed
var divArray = ["f-13",  //Oltar Tajni
				"f-14"]; //Hram Zivota
				
for(i = 0; i < divArray.length; i++) {
	if(whine = document.getElementById(divArray[i])) {
		whine = whine.parentNode.parentNode;
		whine.parentNode.removeChild(whine);
	}
}


//Removal of larger sections

//Podzemlje
if(whine = document.getElementById("fo_18")) {
	whine = whine.parentNode.parentNode.parentNode;
	whine.parentNode.removeChild(whine);
}


//Top SubMenu
//could be done with an array just like sections but I like DIVERSITY
if(whineTemp = document.evaluate(
		"//div[@class='ipb-top-right-link']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null)) {

	for (var a = 0; a < whineTemp.snapshotLength; a++) {
		whine = whineTemp.snapshotItem(a);
		whineChildren = whine.childNodes;
		
		for(j = 0; j < whineChildren.length; j++) {
			
			switch(whineChildren[j].innerHTML) {
				case 'Kalendar':
					whine.parentNode.removeChild(whine);
					break;
				case 'Reputacija':
					whine.parentNode.removeChild(whine);
					break;
				case 'Statistika':
					whine.parentNode.removeChild(whine);
					break;
				case 'Shoutbox':
					whine.parentNode.removeChild(whine);
					break;
				case 'Fantasy Hrvatska':
					whine.parentNode.removeChild(whine);
					break;
				case 'Igrice':	//TYPO CORRECTION
					whineChildren[j].innerHTML = 'Igre';
					break;
				default:
			}
		}
	}
}


