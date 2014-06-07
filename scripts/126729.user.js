// ==UserScript==
// @name           Pinterest Enabler
// @namespace      http://lesleh.co.uk/scripts/
// @description    Enables pinning on Flickr.
// @include        http://www.flickr.com/*
// ==/UserScript==

var result = document.evaluate( "//meta[@name='pinterest']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
var tag = result.singleNodeValue;

if(tag != null)
    tag.parentNode.removeChild(tag);