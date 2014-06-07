/* 

LICENSE
=======

Copyright 2006 in USA by Joseph James Frantz.

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the
Free Software Foundation; either version 2 of the License, or (at your
option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
59 Temple Place, Suite 330, Boston, MA 02111-1307 USA

Modified form of the Blank Title Fixer Greasemonkey script by Andy Kaplan-Myrth.

Safari is a site for reading books by many technical publishers. I use the Oreilly
version at http://safari.oreilly.com/. If you signed up with another service you
will need to modify this script to match your domain instead. Or if someone sends
me a list of the domains I will add them to this script.

This script takes the text from the first heading on the page (an h3 element with
an ID="-100000") and sets it to be the title of the page. This is useful for things
like saving a page or two off to another format. I typical view Safari on my pepper
pad (http://www.pepper.com/). Well it is 800x600 display and the newer version is
something like 800x480 display. So I use this extension to view JUST the html without
all of the buttons and bars and so forth. But I cannot tell what page is what normally,
since they have no titles. Now I can see the titles. This works well with my userstyle
over at http://userstyles.org/style/show/757 . 

Also I KNOW it is annoying, but I had to put an alert. Currently without the alert the 
title will not be fixed. I believe this is because safari uses javascript to generate 
the page. So the page load takes a while. Thus, by the time it finally generates the
head portion of the html, the greasemonkey script has finished and wont change the title.
Also if I try to access the dom after document.title= line, the script does not work.
Ive tried all sorts of things, looping, delaying, longer setTimeouts ...but to no avail.
If I ever figure it out I will update the script. If anyone has any suggestions, I will
gladly listen.


CHANGELOG
=========

Version .01
    - initial release
Date August 11, 2006   

*/

// ==UserScript==
// @name           Oreilly Print Title Fixer
// @namespace      http://www.gwenyfer.com/
// @description    Adds a default title for safari.com/print page's title is blank. This is necessary if you wish to save into some other format like PDF.
// @include        http://safari.oreilly.com/print*
// ==/UserScript==

alert('Oreilly Print Title Fixer by Joseph Frantz (sorry but an alert is required or the title wont fix)');
window.setTimeout(function() { document.title=document.getElementById('-100000').textContent }, 60);
