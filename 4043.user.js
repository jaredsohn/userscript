// No ads on USA Mail
// By Steve
// Version 0.1
// Updated 07/05/06
//
// ==UserScript==
// @name           No ads on USA Mail
// @namespace      http://greasemonkey.mozdev.com
// @description    Remove ads on USA.mail.com and go directly to Inbox on login
// @include        http://usa.mail.com/*
// @include        http://mymail.usa.mail.com/*
// ==/UserScript==

// Remove ads from login page and other pages
var snapAdFrames = document.evaluate("//iframe[starts-with(@id, 'sac_fra_')]",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = snapAdFrames.snapshotLength-1; i >= 0; i--)
{
	var elmAdFrame = snapAdFrames.snapshotItem(i);
	elmAdFrame.parentNode.removeChild(elmAdFrame);
}

// More ads...
var snapAdLinks = document.evaluate("//center/a[@target='_blank'][starts-with(@href, 'http://oas-central.realmedia.com')]",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = snapAdLinks.snapshotLength-1; i >= 0; i--)
{
	var elmAdLink = snapAdLinks.snapshotItem(i);
	var elmAdCenter = elmAdLink.parentNode;
	elmAdCenter.parentNode.removeChild(elmAdCenter);
}

// Remove ads from bottom half of logout page
if(location.href.match('/scripts/common/logout.main'))
{
	var elmBottomFrame = document.evaluate("//frame[contains(@src, 'logout_bottom.htm')]",
		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(elmBottomFrame)
	{
		elmBottomFrame.parentNode.removeChild(elmBottomFrame);
	}
}

// Change links to mailbox folders in navigation bar on the left
if(location.href.match('/scripts/common/navbar.main'))
{
	// Change background color. We have to use the method setAttribute to set the new value.
	document.body.setAttribute('bgcolor', '#909064');
	// Look for all links to mailbox folders
	var snapBoxLinks = document.evaluate("//a[contains(@href, '/scripts/mail/mailbox.mail')]",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = snapBoxLinks.snapshotLength-1; i >= 0; i--)
	{
		var elmBoxLink = snapBoxLinks.snapshotItem(i);
		var elmFontLink = elmBoxLink.firstChild;
		if(elmFontLink)
		{
			elmFontLink.face = 'Arial';
			if(!elmFontLink.textContent.match('Get New Messages'))
			{
				elmFontLink.title = 'Open folder ' + elmFontLink.textContent;
			}
			if(elmFontLink.textContent == 'Inbox')
			{
				elmFontLink.size  = 6;
				elmFontLink.color = '#B4001B';
			}
			else
			{
				elmFontLink.size  = 4;
				elmFontLink.color = '#FFD418';
			}
		}
	}
}

// Go directly to Inbox on login
if(location.pathname.match('/scripts/common/home.main'))
{
	var elmMainFrame = document.evaluate("//frame[@name='main'][contains(@src, 'frontpage.main')]",
		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(elmMainFrame)
	{
		elmMainFrame.src = location.protocol + '//' + location.host + '/scripts/mail/mailbox.mail?folder=INBOX';
	}
}
