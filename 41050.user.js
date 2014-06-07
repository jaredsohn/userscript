// Ravelry Remove Fave Curse Word
// version 0.1
// 2009-01-23
// Copyright (c) 2009, Tibbi Scott
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ----------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Ravelry Remove Fave Curse Word", and click Uninstall.
//
// ----------------------------------------------------------------------
//
// There was a request on ravelry.com to remove the fave curse word field
//
// This should hide the field on any profile page.
//
// Does not hide the box when editing the profile.
//
// ----------------------------------------------------------------------
//
// ==UserScript==
// @name           Ravelry remove fave curse word field
// @namespace      http://userscripts.org/scripts/show/41050
// @description    Move project tab list down a litle
// @include        http://www.ravelry.com/people/*
// @exclude        http://www.ravelry.com/people/*/*
// ==/UserScript==
//
// ----------------------------------------------------------------------

// find proper div, blank it out

// Code from: http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
function getElementsByClassName(oElm, strTagName, strClassName){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all :
        oElm.getElementsByTagName(strTagName);

    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];     
        if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
        }   
    }
    return (arrReturnElements)
}

function blankOutFaveCurseWordField() {

	// find the last field div, it's always the Fave Curse Word field box
	var allProfileFieldDivs = getElementsByClassName(document, "div", "field"), i = allProfileFieldDivs.length, i = --i,
		divBlankCWord = " ", divFaveCWord = allProfileFieldDivs[i].innerHTML; 

	// test alert
	// alert ("i:" + i + ", " + divFaveCWord);
	

	allProfileFieldDivs[i].innerHTML = divBlankCWord;

	// test alert
	// divFaveCWord = allProfileFieldDivs[i].innerHTML;
	// alert ("after: " + divFaveCWord);

}

blankOutFaveCurseWordField();

