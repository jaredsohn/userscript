// Mefi-Killfile (0.12 BETA!)
//
// Copyright (C) 2005  Fuyugare <fuyugare@fuyugare.org>
//
// This file is  free software; you can redistribute  it and/or modify
// it under the  terms of the GNU General  Public License as published
// by  the Free  Software Foundation;  either version  2, or  (at your
// option) any later version.
//
// --------------------------------------------------------------------
//
// This  is a  Greasemonkey (  http://greasemonkey.mozdev.org/  ) user
// script.  Greasemonkey  is a Mozilla Firefox extension.  It needs to
// be installed and activated first.
//
// It implements  killfiles for MeFi.  There is  one tunable parameter
// -- the  location of your killfile  -- that should  be a (preferably
// web-accessible) text file.  List the killed usernames one entry per
// line.   The default value  is an  example.  (It  is the  killfile I
// personally use; you might find it offensive to your tastes.)
//
//
// To INSTALL this script,
//    save the script in some local directory
//    edit it to replace the "roster" line (see comments below)
//    view the script in Firefox (i.e., "File > Open File")
//    click on "Tools > Install User Script"
//
// To UNINSTALL this script,
//    go to "Tools > Manage User Scripts"
//    select "MeFi-Killfile"
//    click on "uninstall"
//
//
// NOTES
//
// 1.  I am  not a MeFi  user, and never  intend to become  one.  This
//     script  is only  guaranteed to  work  for the  page visible  to
//     non-logged-in  users. I've  been told  that it  also  works for
//     logged-in users, but caveat usor.
//
// 2.  Despite killing  individual comments,  someone or the  other is
//     going  to quote  the comment  anyway, which  defeats  the whole
//     point.  Until Matt systematizes the 'reply to' feature, perhaps
//     by adding some sensible  threading scheme, it's just impossible
//     to truly filter someone out.
//
// 3.  Greasemonkey scripts are brittle as fuck. Any time Matt changes
//     the structure of  the MeFi page -- and he  does it often enough
//     --  I try to  release a  new version  of these  scripts.  (That
//     said, all versions  of this script from 0.04  onwards *do* work
//     on the  current MeFi front page,  as of July 15,  2005.) By the
//     way, those of  you with pull with Matt  should encourage him to
//     enclose every comment in its own div.
//
// 4.  This script might not work on metatalk in the future (though it
//     appears to work  for now). I don't care. MeTa  is a septic tank
//     of the most effluvial kind.  It smells worse than the inside of
//     Karl   Rove's   rectum.    It   rapes   kittens   and   poisons
//     cube-cactuses.  It  is the  leading cause of  SIDS.  Terrorists
//     point to  metatalk as  their vision of  the perfect  future. In
//     summary, adding support for metatalk pages spoils the otherwise
//     straightforward code in this script, so I can't be bothered.
//
// 5.  AskMe is excluded by default.
//
// -------------------------------------------------------------------
//
// ==UserScript==
// @name          MeFi-Killfile
// @namespace     http://fuyugare.org/mofi/
// @description	  Killfiles for MeFi
// @include       http://*.metafilter.com/*
// @include       http://metafilter.com/*
// @exclude       http://ask.metafilter.com/*
// ==/UserScript==

(function() {
    var Killfile = {


/* BEGIN USER-SPECIFIC MODIFICATIONS */

        // Change the following line to point to your own killfile
        // The default value is only an example.

        roster: 'http://fuyugare.org/mofi/mefi-killfile.txt',

        // That was the only line you needed to modify.  Future
        // versions will probably store it in a cookie.

/* END USER-SPECIFIC MODIFICATIONS */


        doit: function() {
            var req = {
                method: 'GET',
                url: Killfile.roster,
                onload: function (details) {
                    var r = details.responseText.split ('\n');

                    var coms = document.evaluate ("//div[@class='comments']/span[@class='smallcopy']/a[1]",
                                                  document,
                                                  null,
                                                  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                                  null); 
                    for (var i = 0; i < coms.snapshotLength; i ++) {
                        var a = coms.snapshotItem (i);
                        // var username = a.textContent.replace (/[ \.?]/g, '_');
                        
                        for (var w = 0; w < r.length; w ++) {
                            if (username == r[w]){
                                a.parentNode.insertBefore (document.createTextNode ("[killed comment]"), a.previousSibling);
                                a.parentNode.insertBefore (document.createElement ('br'), a.previousSibling);

                                /* scan backwards until we hit the <a name="foo"></a> */
                                var cnode = a.parentNode.previousSibling;
                                while (cnode) {
                                    if (cnode.nodeName.toLowerCase() == 'a'
                                        && cnode.hasAttribute ('name'))
                                        break;

                                    var prev = cnode.previousSibling;
                                    cnode.parentNode.removeChild (cnode);
                                    cnode = prev;
                                }
                            } // if
                        } // for w
                    } // for i
                } // onload
            }; // req
            
            GM_xmlhttpRequest (req);
        },
    }

    Killfile.doit ();
}) ();
