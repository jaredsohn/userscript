// Modified from original "Mailto 2 Webmail"
//              -Original created by ElectroFox Designs (Max Smiley)
//              http://www.efoxdesigns.com
//              -GPL
//
//
// Optimized by BikeHelmet(userscripts.org, and @gmail)
//  -Download: http://userscripts.org/scripts/show/12321
//
//  -The old "Mailto 2 Webmail" was taking 10+ seconds to work its magic on an average page, on my computer.
// For large forums, it'd take several minutes. Well, now it takes under 2 seconds.
// ...
// ...
// I know, I need to upgrade my system. :P
//
// Well, maybe this more efficient version will be helpful to someone.
//


// ==UserScript==
// @name           Mailto 2 Gmail
// @description    Makes "mailto" links open in the web interface to your gmail account, instead of a POP-3 client (like Outlook, Eudora, Thunderbird, etc.)
// @include        *
// @exclude       http://mail.google.com/*
// @exclude       https://mail.google.com/*
// ==/UserScript==


var GmailURL = 'https://mail.google.com/mail/?ui=1&view=cm&fs=1&tf=1&to=';
var ATags = document.getElementsByTagName('a');
var TagHref = 0;
var TagHrefL = 0;
var EmailAddy = 0;
var EmailAddy_Offset = 0;
var Subject_Offset = 0;
var Subject = 0;

var CompleteURL = 0;


var LoopA = 0;
while(LoopA < ATags.length)
	{
	EmailAddy = 0;
	EmailAddy_Offset = 0;
	Subject_Offset = 0;
	Subject = 0;


	TagHref = ATags[LoopA].getAttribute('href');
	if(TagHref != null)
		{
		TagHrefL = TagHref.toLowerCase();


		EmailAddy_Offset = TagHrefL.indexOf('mailto:');
		if(EmailAddy_Offset > -1)
			{
			EmailAddy_Offset += 7;
			Subject_Offset = TagHrefL.indexOf('?subject=', EmailAddy_Offset);
			if(Subject_Offset > -1)
				{
				EmailAddy = TagHref.substring(EmailAddy_Offset, Subject_Offset);
				Subject_Offset += 9;
				Subject = TagHref.substring(Subject_Offset);
				}
			else EmailAddy = TagHref.substring(EmailAddy_Offset);


			CompleteURL = GmailURL+EmailAddy;
			if(Subject != 0) CompleteURL += '&su='+Subject;

			ATags[LoopA].setAttribute('href', CompleteURL);
			ATags[LoopA].setAttribute('title', 'Send from Gmail');
			ATags[LoopA].setAttribute('target', '_blank');
			}
		}

	LoopA++;
	}

// Cleanup
delete ATags;

