// ==UserScript==
// @name       Imgur Direct Link
// @namespace  http://www.benbristow.co.uk/
// @version    1.0	
// @description  Adds a 'direct image' link for new imgur uploads.
// @match http://imgur.com/*
// @match https://imgur.com/*
// @copyright  2014+ Ben Bristow. Licensed under the MIT license. http://opensource.org/licenses/MIT
// ==/UserScript==

//Get direct image link from markdown link
var imgurl = document.getElementById("markdown").value;
imgurl = imgurl.replace("[Imgur](", "");
imgurl = imgurl.replace(")", "");

//Make new textbox
var linkcodes = document.getElementById("link-codes");
var linkboxes = linkcodes.getElementsByTagName("div");
var linkbox = linkboxes[1];

var newhtml = '<h3>Direct Image Link</h3><input type="text" readonly="readonly" width="100%" value="' + imgurl + '">';

//Add to DOM
linkbox.innerHTML = newhtml + linkbox.innerHTML;

//And we're done ;)