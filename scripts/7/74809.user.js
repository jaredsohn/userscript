// ==UserScript==
// @name         MANHUNT TrackList and BuddyList #anchor replace
// @include      http://www.manhunt.net/*
// @description  Replaces the #anchor at the end of URLs to prevent scrolling to top of page on profile link click.
// @author       Tomasz P. Koluda | MHUserScripts.5un@gishpuppy.com  | Facebook http://sn.im/tomasz
// @namespace    http://sn.im/74809mh | http://userscripts.org/scripts/show/74809
// ==/UserScript==

    (function()
{
    var allLinks = document.links;
    var blankLink = "##";
    var poundSign = "#";

		for (i = 0; i <allLinks.length; ++i)
			{
				allLinks [i].href = allLinks [i].href.replace (poundSign, blankLink);
			}
}
)();