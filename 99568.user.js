// ==UserScript==
// @name          StratoCommunicatorSizer
// @namespace     http://userscripts.org/scripts/show/brazil42
// @description   Resizes the window of the Strato Communicator
// @include       https://communicator.strato.de/*
// @include       https://communicator.strato.tld/*
// @version       21 March 2011
// ==/UserScript==

/*
	Author: TB
	Version: 21 March 2011
*/

var head_height = 120;
var iframe_height = document.body.clientHeight - head_height;
document.getElementById('main_mail').height = iframe_height; 
