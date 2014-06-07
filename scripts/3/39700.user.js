// ==UserScript==
// @name           HTTP to HTTPS
// @description    Allows circumvention of sites by changing the protocol to https:// (from http://). Currently configured to work with Facebook.com.
// @version        1.5
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// @copyright      TheNad
// ==/UserScript==

if(window.location.protocol != "https:")
{

document.location.href="https://" + window.location.host + window.location.pathname + window.location.hash + window.location.search;

var images = document
.evaluate("//img[starts-with(@src,'/images')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for ( var image, i = images.snapshotLength ; image = images.snapshotItem(--i) ; )
	img.src = 'http://www.facebook.com' + img.src;

document.body.innerHTML=document.body.innerHTML.replace(/\/script" src="/gi, "script\" src=\"http://www.facebook.com");

document.body.innerHTML=document.body.innerHTML.replace(/FB.XdComm.Server.init\("\//gi, "FB.XdComm.Server.init(\"http://www.facebook.com/");

}