// ==UserScript==
// @name BUX.TO.HAX
// @description BUX.TO Autoclicker
// @author CaptMicro
// @match http://bux.to/ads.php*
// @match http://bux.to/cks.php*
// @run-at document-end
// ==/UserScript==

var docloc = (new String(document.location)).substr(0, 21);
var BTH_Ads_WaitTimer = 0;
var BTH_Ads_AdTimer = 0;
var BTH_Ads_Clicked = new Array();

if (docloc == "http://bux.to/ads.php")
{
	BTH_Ads_AdTimer = 0;
	BTH_Ads_WaitTimer = 10;
	BTH_Ads_CreatePanel();
	BTH_Ads_UpdateLoop();
}
else if (docloc == "http://bux.to/cks.php")
{
	setTimeout(BTH_Cks_CloseWindow, 53 * 1000);
}

//http://www.bux.to/cks.php*
function BTH_Cks_CloseWindow()
{
	window.onbeforeunload = function (e) { };
	var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	var is_ie = navigator.userAgent.toLowerCase().indexOf('msie') > -1;
	if (is_ie || is_chrome) window.open('', '_self', '');
	window.close();
}

//http://www.bux.to/ads.php*
function BT_Ads_GetNumValidAds()
{
	var atags = document.getElementsByTagName('a');
	var adlinks = new Array(); var j = 0;
	for (var i = 0; i < atags.length; i++)
	{
		var href = atags[i].getAttribute('href');
		if (href.substr(0,10) == 'cks.php?k=')
		{
			var failed = 1;
			var tag = atags[i].parentNode.parentNode.parentNode.getElementsByTagName('s');
			if (tag.length == 0) failed = 0;
			if (href in BTH_Ads_Clicked) failed = 1;
			if (failed == 0)
			{
				adlinks[j] = atags[i];
				j = j + 1;
			}
		}
	}
	return adlinks.length;
}

function BT_Ads_GetNextValidAd()
{
	var atags = document.getElementsByTagName('a');
	var adlinks = new Array(); var j = 0;
	for (var i = 0; i < atags.length; i++)
	{
		var href = atags[i].getAttribute('href');
		if (href.substr(0,10) == 'cks.php?k=')
		{
			var failed = 1;
			var tag = atags[i].parentNode.parentNode.parentNode.getElementsByTagName('s');
			if (tag.length == 0) failed = 0;
			if (href in BTH_Ads_Clicked) failed = 1;
			if (failed == 0)
			{
				adlinks[j] = atags[i];
				j = j + 1;
			}
		}
	}
	if (adlinks.length > 0) return adlinks[0].getAttribute('href');
	return false;
}

function BTH_Ads_CreatePanel()
{
	var buxtohax = document.createElement('div'); buxtohax.id = 'buxtohax';
	buxtohax.setAttribute('style', 'align:center;text-align:center;border:1px solid #FF0000;');
	buxtohax.innerHTML = [
	'<span style="text-align:center;">[BUX.<text style="color:#AFCD20;">TO</text>.HAX]</span>',
	'<table style="width:100%;border:none;font-size:1em;">',
	'	<tr><td style="width:20%;">Random Wait Timer:</td>',
	'	<td style="width:80%;" id="buxtohax_nxttimer">Unknown</td></tr>',
	'	<tr><td style="width:20%;">Next Ad:</td>',
	'	<td style="width:80%;" id="buxtohax_adcurr">Unknown</td></tr>',
	'	<tr><td style="width:20%;">Current Ad Timer:</td>',
	'	<td style="width:80%;" id="buxtohax_adtimer">Unknown</td></tr>',
	'	<tr><td style="width:20%;">Ads Left:</td>',
	'	<td style="width:80%;" id="buxtohax_adsleft">Unknown</td></tr>',
	'</table>',
	].join('\n');
	var content = document.getElementById('content');
	var pagebreak = document.createElement('br');
	content.insertBefore(pagebreak, content.firstChild);
	content.insertBefore(buxtohax, content.firstChild);
}

function BTH_Ads_UpdateLoop()
{
	if (BTH_Ads_AdTimer > 0)
	{
		document.getElementById('buxtohax_nxttimer').innerHTML = "Waiting for ad to finish...";
		document.getElementById('buxtohax_adcurr').innerHTML = BT_Ads_GetNextValidAd();
		document.getElementById('buxtohax_adtimer').innerHTML = '' + BTH_Ads_AdTimer;
		document.getElementById('buxtohax_adsleft').innerHTML = BT_Ads_GetNumValidAds();
		BTH_Ads_AdTimer = BTH_Ads_AdTimer - 1;
		if (BTH_Ads_AdTimer <= 0) {
			BTH_Ads_WaitTimer = Math.floor(Math.random() * 11) + 7;
			document.getElementById('buxtohax_adtimer').innerHTML = "Waiting for random wait to finish...";
		}
	}
	if (BTH_Ads_WaitTimer > 0)
	{
		document.getElementById('buxtohax_nxttimer').innerHTML = '' + BTH_Ads_WaitTimer;
		BTH_Ads_WaitTimer = BTH_Ads_WaitTimer - 1;
		if (BTH_Ads_WaitTimer <= 0)
		{
			document.getElementById('buxtohax_nxttimer').innerHTML = "Waiting for ad to finish...";
			BTH_Ads_AdTimer = Math.floor(Math.random() * 5) + 53;
			BTH_Ads_OpenNextAd();
		}
	}
	setTimeout(BTH_Ads_UpdateLoop, 1000);
}

function BTH_Ads_OpenNextAd()
{
	var adhref = BT_Ads_GetNextValidAd();
	if (adhref == false) return false;
	var adfull = 'http://www.bux.to/' + adhref;
	window.open(adfull); //window.focus();
	BTH_Ads_Clicked[adhref] = true;
}
