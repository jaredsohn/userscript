// ==UserScript==
// @name           Automate eBay Revisions
// @namespace      eBay Revision Tool
// @description    Automatically click through the eBay revise item screens
// @include         http://cgi5.ebay.com/*
// @include        http://cgi.ebay.com/ws/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


window.addEventListener ("load", LocalMain, false);

function LocalMain ()
{

var TargetLink          = $("a:contains('Revise your item')")

if (TargetLink  &&  TargetLink.length) 
    window.location.href    = TargetLink[0].href

window.setTimeout(function() var TargetLink          = $("a:contains('addPicturesBtn')")

if (TargetLink  &&  TargetLink.length) 
    window.location.href    = TargetLink[0].href, 5000);


window.setTimeout(function() {document.evaluate("//button[@name='aidZ1']", document, null, 

9, null).singleNodeValue.click();}, 5000);

document.evaluate("//button[@name='aidZ18']", document, null, 9, 

null).singleNodeValue.click();


}