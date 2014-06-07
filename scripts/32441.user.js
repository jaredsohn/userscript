// ==UserScript==
// @name           OpenID Autocomplete
// @namespace      http://tankadillo.com/openid-autocomplete
// @description    Autocomplete OpenID forms just like password forms
// @author         raezr
// @include        *
// ==/UserScript==
/*
  This code is licenced under the GPL
  http://www.fsf.org/licensing/licenses/gpl.html
*/

// User configuration
var manual = "yourname.example.com"; //manually enter your OpenID here if you're not using Greasemonkey

// in case your enviroment doesn't have the GM functions
if(typeof(GM_getValue) == 'undefined') var GM_getValue = function(){return manual;};
if(typeof(GM_setValue) == 'undefined') var GM_setValue = function(){};
if(typeof(GM_registerMenuCommand) == 'undefined') var GM_registerMenuCommand = function(){};

// the core code
var xpath = document.evaluate("//input[@type='text']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for(var i=0;i < xpath.snapshotLength; i++)
  if(xpath.snapshotItem(i).name.indexOf('openid') != -1 && GM_getValue('uri') != null)
    xpath.snapshotItem(i).value = GM_getValue('uri');

// register the menu command
var setURI = function()
{
  var uri = window.prompt("Enter your OpenID URI below (example: yourname.livejournal.com)", GM_getValue('uri'));
  if(typeof(uri) == 'string') GM_setValue('uri',uri);
}
GM_registerMenuCommand("Set OpenID URI", setURI) 