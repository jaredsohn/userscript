// ==UserScript==
// @name           Which Gallery Moderator are you?
// @namespace      http://solitude12.deviantart.com
// @description    Shows you which gallery a gallery moderator moderates on their page.
// @include        http://*.deviantart.com/
// @include        http://www.*.deviantart.com/
// @include        http://*.deviantart.com/?*
// ==/UserScript==

/*
 * Author: Solitude12
 * Date: Feb 16, 2009/Jan 31, 2010
 * Version: 0.4
 *
 * Copyright © Solitude12 - http://solitude12.deviantart.com/
 * Please do not redistribute any part of this code without
 * permission of Solitude12.
 *
 */
var username = window.location.host.substring(0, window.location.host.replace('http://www.', 'http://').indexOf(".")).toLowerCase();

if(!unsafeWindow.deviantART.deviant.username){
	var user = "loggedout";
} else {
	var user = unsafeWindow.deviantART.deviant.username;
}
var ami = document.evaluate("//a[@href='#super-secret-why']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).getElementsByTagName('strong')[0].innerHTML;
var iwanttobealive = document.evaluate("//div[@class='pbox']", document.getElementById('super-secret-why'), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

if(!ami || !iwanttobealive) return;
if(ami.indexOf("Gallery Director")<0 && ami.indexOf("Gallery Moderator")<0) return;

GM_xmlhttpRequest({method:'POST',url:'http://solitude.24bps.com/SuggestDD/generate.php',headers:{"Content-type":"application/x-www-form-urlencoded"},data:"get="+escape(unsafeWindow.deviantART.deviant.username)+"&devid=GMScript&v=gmscript",onload:function(responseDetails){var data=responseDetails.responseText;eval(data);for(var gallerias in galleries){for(var t in galleries[gallerias]){if(galleries[gallerias][t].toLowerCase()==username.toLowerCase()){iwanttobealive.innerHTML+="<div align=\"center\" style=\"display:inline-block; background-color:#B5CFC7;border:1px solid #8EAFA4;padding:5px 6px;margin:10px 0px 0px 0px;text-align:center;-moz-border-radius:8px;\">Gallery Moderator: <strong>"+gallerias+"</strong></div>";}}}}});
