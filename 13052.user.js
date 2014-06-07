// ==UserScript==
// @name           Cambridge Library Search
// @namespace      cam.ac.uk
// @description    Provides a link to search Cambridge University's libraries wherever an ISBN or ISSN is displayed.
// @version 0.1    Not fully tested but appears to work
// @version 0.2    Support for non-plain-text; should work universally
// @include        *
// @exclude        http://ucat-newton.lib.cam.ac.uk/cgi-bin*
// ==/UserScript==

issn = /\b(e?issn(?=[^>]*<)(?:[^<]|<[^>]*>)*?(\d{4})[\-\s]?([\dx]{4}))/ig;
if (issn.test(document.body.innerHTML)) document.body.innerHTML = document.body.innerHTML.replace(issn, "$1&nbsp;<a href='http://ucat-newton.lib.cam.ac.uk/cgi-bin/Pwebrecon.cgi?DB=local&Search_Arg=ISSN+%22$2-$3%22&Search_Code=CMD&CNT=10'>[Find]</a>");

isbn = /\b(isbn(?=[^>]*<)(?:\W|<[^>]*>)*(\d+)[\-\s]?(\d+)[\-\s]?(\d+)[\-\s]?(\d+)[\-\s]?([\dx]+))/ig;
if (isbn.test(document.body.innerHTML)) document.body.innerHTML = document.body.innerHTML.replace(isbn, "$1&nbsp;<a href='http://ucat-newton.lib.cam.ac.uk/cgi-bin/Pwebrecon.cgi?DB=local&Search_Arg=ISBN+%22$2$3$4$5$6%22&Search_Code=CMD&CNT=10'>[Find]</a>");