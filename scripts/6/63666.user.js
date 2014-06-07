// ==UserScript==
// @name           vBulletin v4 Button Fixer
// @namespace      http://userscripts.org/users/92396
// @description    Fix buttons for Vbulletin v4 beta
// @include        http://www.forums.westtexasimports.net/*
// @include        http://www.westtexasimports.net/*
// ==/UserScript==

function Right(str, n) {
        /***
                IN: str - the string we are RIGHTing
                    n - the number of characters we want to return

                RETVAL: n characters from the right side of the string
        ***/
	if (n <= 0)     // Invalid bound, return blank string
		return "";
	else if (n > String(str).length)   // Invalid bound, return
		return str;                     // entire string
	else { // Valid bound, return appropriate substring
		var iLen = String(str).length;
		return String(str).substring(iLen, iLen - n);
	}
}

function Left(str, n) {
	/***
		IN: str - the string we are LEFTing
			n - the number of characters we want to return

		RETVAL: n characters from the left side of the string
	***/
	if (n <= 0)     // Invalid bound, return blank string
		return "";
	else if (n > String(str).length)   // Invalid bound, return
		return str;                // entire string
	else // Valid bound, return appropriate substring
		return String(str).substring(0,n);
}

function fixButton(oElm, strTitle, strGoto) {
	//Replace action of 'first' and 'last' buttons
	var arrElements = oElm.getElementsByTagName("a");
	strTitle = strTitle.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strTitle + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
	    oElement = arrElements[i];
	    if(oRegExp.test(oElement.getAttribute("title"))){
		var page = oElm.location.href;
		if (page.lastIndexOf('&') != -1) 
			page =  Left(page,page.lastIndexOf('&'));
		if( Left(Right(page,page.length - page.lastIndexOf('/') - 1),4) == 'page' )		
			oElement.setAttribute('href',Left(page,page.lastIndexOf('/')) + strGoto);
		else
			oElement.setAttribute('href',page + strGoto);
	    }
	}	
}

function makeLast(oElm, strClassName) {
	//Add a 'last' button to threads with more than 10 posts
	var arrElements = oElm.getElementsByClassName(strClassName);
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];
		var innerElements = oElement.getElementsByTagName("a");	
		if (innerElements[innerElements.length-1].textContent == '10'){
			var lastLink = innerElements[innerElements.length-1].href;
			lastLink = Left(lastLink,lastLink.lastIndexOf('/')) + '/page1000';
			oElement.innerHTML = oElement.innerHTML + '<a href="' + lastLink + '" >Last</a>';
		}
	}	
}

function addLastArrow(oElm, strClassName) {
	//Add a 'last' arrow in 'last post by' column
	var arrElements = oElm.getElementsByClassName(strClassName);
	var oElement;
	var lastLink;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];
		lastLink = oElement.href;
		if (lastLink.length > 0)
			oElement.innerHTML = oElement.innerHTML + ' <img src="http://www.westtexasimports.net/images/buttons/lastpost_40b.png" </img>';
	}	
}

addLastArrow(document,'lastpostdate');
makeLast(document,'pagelinks');
//fixButton(document,'Last Page','/page1000');
//fixButton(document,'First Page','/page1');
