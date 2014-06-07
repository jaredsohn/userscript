// ==UserScript==
// @name          Custom Google Logo
// @namespace     http://www.nathanmalkin.com/projects/userscripts/
// @description	  Replaces the Google logo with your own custom logo - NOTE: manual configuration required
// @include       http://google.tld/*
// @include       http://www.google.tld/*
// ==/UserScript==
// Notes:
//   *** You must define the URL of the custom logo below, or the script will display the default logo! ***
var newLogoURL = "http://i46.photobucket.com/albums/f138/techchick70124/FerretsRumble.gif";
var newSearchURL = "http://i46.photobucket.com/albums/f138/techchick70124/FerretsRumble.gif";
/*
    getElementsByAttribute function is:
	    Copyright Robert Nyman, http://www.robertnyman.com
	    Free to use if this text is included
	Slightly modified to work in this user script
*/
window.getElementsByAttribute = function(oElm, strTagName, strAttributeName, strAttributeValue){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)") : null;
    var oCurrent;
    var oAttribute;
    for(var i=0; i<arrElements.length; i++){
        oCurrent = arrElements[i];
        oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
        if(typeof oAttribute == "string" && oAttribute.length > 0){
            if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
                arrReturnElements.push(oCurrent);
            }
        }
    }
    return arrReturnElements;
}

var logos = getElementsByAttribute(document.body, "img", "src", "/intl/en_ALL/images/logo.gif");
if(logos != "") {
	logos[0].src = newLogoURL;
} else {
	logos = getElementsByAttribute(document.body, "img", "src", "/logos/mlk07.gif");
	if(logos != "") {	logos[0].src = newSearchURL; }
}