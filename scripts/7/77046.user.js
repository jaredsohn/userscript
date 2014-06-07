// ==UserScript==
// @name           UUsearch
// @namespace      
// @description    Search on pressing the return key
// @include        http://www.uu.nl/*
// ==/UserScript==

/*
The homepage of the website of the University of Utrecht seems to let you search only upon pressing a search button; pressing a return key returns you to their homepage.
This script, as one can see below, prevents the website's 'default' action upon pressing return.
*/

var searchboxx = document.getElementById("ctl00_SmallSearchInputBox_SDDC1528D_InputKeywords");

function searchWithReturn(event){
	
	//Keycode 13 is the code of the return key
	if(event.keyCode == 13) event.preventDefault();

}

searchboxx.addEventListener("keypress", searchWithReturn, true);

