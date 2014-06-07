// ==UserScript==
// @name           CPAN authenticated RT
// @namespace      http://o.mengue.free.fr/gm/
// @author         Olivier Mengué <dolmen@cpan.org>
// @description    Rewrite links to rt.cpan.org to use only authenticated links
// @include        http://search.cpan.org/*
// @include        http://cpan.uwinnipeg.ca/*
// ==/UserScript==
(function() {
    "use strict";
    var links = document.getElementsByTagName('a'), i, m;
    for(i=links.length-1; i>=0; i--) {
        a = links[i];
        // < http://rt.cpan.org/NoAuth/Bugs.html?Dist=Acme-PM-Paris-Meetings
        // < https://rt.cpan.org/Public/Display.html?Name=Acme-PM-Paris-Meetings
        // > https://rt.cpan.org/Dist/Display.html?Name=Acme-PM-Paris-Meetings
        m = /^https?:\/\/rt.cpan.org\/(?:NoAuth\/Bugs\.html\?Dist|Public\/Dist\/Display\.html\?Name)=(.*)$/.exec(a.href);
        if (m !== null) {
            a.href = 'https://rt.cpan.org/Dist/Display.html?Name='+m[1];
            continue;
        }
        // < http://rt.cpan.org/NoAuth/ReportBug.html?Queue=Acme-PM-Paris-Meetings
        // < http://rt.cpan.org/Public/Bug/Report.html?Queue=Acme-PM-Paris-Meetings
        // > https://rt.cpan.org/Ticket/Create.html?Queue=Acme-PM-Paris-Meetings
        m = /^https?:\/\/rt.cpan.org\/(?:NoAuth\/ReportBug|Public\/Bug\/Report)\.html\?Queue=(.*)$/.exec(a.href);
        if (m !== null) {
            a.href = 'https://rt.cpan.org/Ticket/Create.html?Queue='+m[1];
            continue;
        }
    }
})();