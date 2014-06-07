// ==UserScript==
// @name		Gmail Cleanup
// @namespace	http://www.tigerjay.net/req/greasemonkey/gmailcleanup.user.js
// @description	Tweak the Gmail interface to your hearts delight.
// @include		http://mail.google.com/*
// @include		https://mail.google.com/*
// @include		http://gmail.google.com/*
// @include		https://gmail.google.com/*
// ==/UserScript==



// Preferences ( 0 = NO, 1 = YES )

var prefNewLogo         = 1; // Show the new Gmail Logo ?
var prefNewIndicator    = 1; // Show disk space as a graphical bar ?

var prefHideAds         = 0; // Hide Adverts ?
var prefHideBookmarks   = 1; // Hide the Bookmarks toolbar ?
var prefHideLowBar      = 1; // Hide repeated toolbar at the bottom of lists ?
var prefHideInvites     = 1; // Hide Invites Menu ?
var prefHideLabels      = 1; // Hide Labels Menu ?

var prefLargeText       = 0; // Increase Text Size ?
var prefContrastUnread  = 0; // Make unread mail highly visible ?



// Script

var html = '';

html = html + '.thm{padding:10px;}';
html = html + '.tf,.tf .lk{color:#222222 !important;}';
html = html + '#ft .fq,#ft .fv,#ft .fv .lk{color:#222222 !important;}';
html = html + '#ft .fcs,#ft .ft,#ft .fv .lc{display:none;}';
html = html + '#nav .lk{line-height:1.5;display:block;}';

if (prefNewIndicator==1)
{
	html = html + '#ft .fq{display:none;}';

	footer = document.getElementById('ft');

	strPercent = footer.innerHTML;
	loc1 = strPercent.indexOf('MB (');
	loc1 = loc1+4;
	loc2 = strPercent.indexOf('%)');
	strPercentUsed = strPercent.slice(loc1,loc2);

	if (strPercentUsed<90)
	{
		strColorA = 'C6DBFF';
		strColorB = '609BFF';
	}
	else
	{
		strColorA = 'FFC8C6';
		strColorB = 'FF6660';
	}

	newElement = document.createElement('div');

	newElement.innerHTML = '<div style="z-index:1;width:200px;margin:12px auto;background:#'+strColorA+';text-align:center;font-size:12px;color:white;"><div style="z-index:2;position:absolute;background:#'+strColorB+';width:'+(strPercentUsed*2)+'px">&nbsp;</div><div style="z-index:3;position:absolute;width:200px;">'+strPercentUsed+'%</div>&nbsp;</div>';

	footer.parentNode.insertBefore(newElement, footer.nextSibling);
}

if (prefHideAds==1)			html = html + '#ra,#rp{display:none;}';
if (prefHideBookmarks==1)	html = html + '.bookmarks{display:none;}';
if (prefHideLowBar==1)		html = html + '#tcb{padding-top:7px;}#tcb div{display:none;}.chc{padding-top:7px;}.chc div{display:none;}';
if (prefHideLabels==1)		html = html + '#nb_0{display:none;}';
if (prefHideInvites==1)		html = html + '#nb_1{display:none;}';
if (prefLargeText==1)		html = html + '*{font-size:large !important;}';
if (prefContrastUnread==1)	html = html + '.rr{background:white;}.ur{background:#FCFF5D;}';

var htmlDiv = document.createElement("div");
htmlDiv.innerHTML = '<style type="text/css">' + html + '</style>';
document.body.insertBefore(htmlDiv, document.body.firstChild);

if (prefNewLogo==1)
{
	setTimeout("document.images['su_s_l'].src='http://services.google.com/images/gmail/logo1.gif';", 100);
}

// End