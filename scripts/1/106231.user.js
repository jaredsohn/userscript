// ==UserScript==
// @name           Luna Eclipse
// @namespace      http://userscripts.org/users/nitrogl
// @description    Replace annoying advertisement of Luna Free with a loading page. You'll be automatically redirected to the page you request...
// @include        http://apps.futur3.it/*
// @copyright      Roberto Metere
// @version        2.6
// @license        MIT License
// ==/UserScript==

// 5 seconds of timeout
var timeout = 1; // No need to wait 5 seconds (due to a bug in their code)
var getName = 'url';
var rndn = Math.floor(Math.random()*6);
var version = '2.6';

// Countdown function
function countDown() {
	var w = parseInt(document.getElementById('luna_eclipse_loading').style.width);
	timeout--;
	document.getElementById('luna_eclipse_loading').style.width = (w + 20) + "px";
	if (timeout <= 0) window.location = newLocation;
	else setTimeout(countDown, 100);
	return true;
	};

// Get request location
var tmp = new Array();
tmp = window.document.documentElement.innerHTML.split('continue.php?');
tmp = window.document.documentElement.innerHTML = tmp[1].split('\'');
var newLocation = 'http://apps.futur3.it/interstitial/continue.php?' + tmp[0];

// Replace noising Luna ads with a waiting page...
document.body.innerHTML = "<div style=\"position: fixed;top: 0px;left: 0px;width: 100%;height: 100%;vertical-align: middle;font-size: 72px;background-color: black;background-image: url('http://www.metere.it/Images/luna_eclipsev" + rndn + ".jpg'); background-position: top right;background-repeat: no-repeat;color: #ccccff;text-align: center;padding: 50px auto auto auto;\"><p style=\"font-weight: bold;padding-top: 30px;\">Luna Eclipse</p><p style=\"font-size: 16px;padding-top: 30px;\">Loading your page. Please wait...</p><div style=\"background-image: url('http://www.metere.it/Images/loading_back.png'); background-position: top center;background-repeat: no-repeat;height: 32px;width: 305px;padding: 0px 0px 0px 0px;margin: 0px auto 0px auto;\"></div><div style=\"height: 32px;width: 305px;padding: 0px 0px 0px 0px;margin: -32px auto 0px auto;\" ><div id=\"luna_eclipse_loading\" style=\"background-image: url('http://www.metere.it/Images/loading_fill.png'); background-position: top left;background-repeat: no-repeat;height: 32px;width: 4px;padding: 0px 0px 0px 0px;margin: 0px auto 0px 0px;\" ></div></div><div style=\"background-image: url('http://www.metere.it/Images/loading_edge.png'); background-position: top center;background-repeat: no-repeat;height: 32px;width: 305px;padding: 0px 0px 0px 0px;margin: -32px auto 0px auto;\"></div></div><div style=\"position: absolute;bottom: 0px;right: 50px;width: auto;height: 24px;color: white;font-size: 10pt;text-align: right;\">Luna Eclipse v" + version + ". Thank you for using this script.</div>";

// Start the countdown
countDown();