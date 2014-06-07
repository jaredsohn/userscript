// Ravelry Hide Forum Buttons
// version 0.1
// 2009-02-24
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
// select "Ravelry Hide Forum Buttons", and click Uninstall.
//
// ----------------------------------------------------------------------
//
// There was a request on ravelry.com to hide the forum buttons
//
// ----------------------------------------------------------------------
//
// ==UserScript==
// @name           Ravelry Hide Forum Buttons
// @namespace      http://userscripts.org/scripts/show/43059
// @description    Hide the buttons below a post in a ravelry forum
// @include        http://www.ravelry.com/discuss/*/*/*
// ==/UserScript==
//
// ----------------------------------------------------------------------

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

function blankOutForumVotingFields() {
	
	// find all voting divs
	var allVotingDivs = getElementsByClassName(document, "div", "voting"); var blankVotingField = "";

	var j;
	var jl=allVotingDivs.length;

	//jl=2;

	//alert("jl: " + jl);

	for(j=0; j<jl; j+=1){
		//alert ("j: " + j + ", " + allVotingDivs[j].innerHTML);
		allVotingDivs[j].innerHTML = blankVotingField;
	}
}


blankOutForumVotingFields();

