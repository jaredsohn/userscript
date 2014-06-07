// Hello World! example user script
// version 0.1 BETA!
// 2005-04-25
// Copyright (c) 2005, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Hello World
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   example script to alert "Hello world!" on every page
// @include       *
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==

      var domainLoweringIsDown = false;
    document.domain = "live.com";
    
    if (window.top != self)
    {
        var hostname = "";
        try
        {
            hostname = window.top.location.hostname;
        }
        catch(e)
        {
            hostname = "";
        }

        var mailUrlDomain = "mail.live.com";
        var peopleUrlDomain = "people.live.com";
        var hasMailUrl = (hostname != "") &&
            (hostname.indexOf(mailUrlDomain) != -1) &&
            ((hostname.indexOf(mailUrlDomain) + mailUrlDomain.length) == hostname.length);
        var hasPeopleUrl = (hostname != "") &&
            (hostname.indexOf(peopleUrlDomain) != -1) &&
            ((hostname.indexOf(peopleUrlDomain) + peopleUrlDomain.length) == hostname.length);
        if (!hasMailUrl && !hasPeopleUrl)
        {
            window.top.location.href = self.location.href;
        }
        
    }