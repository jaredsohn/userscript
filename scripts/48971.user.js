// Free Sound Snap
// Version 1.0!
// May 12, 2009
// Copyright (C) 2009, Caleb Helbling
//
// Sound snap used to be free, but no it isn't :'(
// This script lets you download the mp3 preview that you can listen to
// for free.
// NOTE: This script is also available as a bookmarklet
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Free Sound Snap", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Free Sound Snap
// @description   Download sound snap sounds for free, no limit
// @include       http://www.soundsnap.com/*
// @include       http://soundsnap.com/*
// ==/UserScript==

function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)", "i") : null;
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

url_elements=getElementsByAttribute(document,"param","name","FlashVars");

image_elements=getElementsByAttribute(document,"img","src","/themes/soundsnap2/assets/aiff-na.gif");

urls=new Array();
for (i=0; i<url_elements.length; i++) {
	current_url = url_elements[i].getAttribute('value');
	current_url = current_url.substring(10,current_url.indexOf("&"));
	link_element = newElement = document.createElement('a');
	link_element.setAttribute("href",current_url);
	link_element.innerHTML="<br />Download Free";
	image_elements[i].parentNode.insertBefore(link_element, image_elements[i].nextSibling);
}