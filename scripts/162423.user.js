// ==UserScript==
// @author Boom_Box
// @name no_ignore
// @version 0.1.08
// @description Hide ignored users on WoT forums
// @match http://forum.worldoftanks.com/*
// @include http://forum.worldoftanks.com/*
// ==/UserScript==

if (window.top == window.self) // trigger just once thanks
{
    // first we read your ignored prefs, then parse it as a normal DOM
    var iu_url = "http://forum.worldoftanks.com/index.php?app=core&module=usercp&tab=core&area=ignoredusers";

    var xhr = new XMLHttpRequest();
    var onLoadHandler = function(event) {
            iuHnd(event.target);
        }
    xhr.open("GET", iu_url, true);
    xhr.onload = onLoadHandler;
    xhr.send(null);

    function iuHnd(resp)
    {
        var parser = new DOMParser(),

            doc = parser.parseFromString(resp.responseText,"text/html"),
            ipb_tbl = doc.getElementsByTagName("table")[0],
            ipb_body = ipb_tbl.getElementsByTagName("tbody")[0],

            // got your ignored users table, now to get names off of it
            mre = /"name">([\w]+)<\//,  // normal entries
            sre = /<strong>\W+([\w]+)/; // funky whitespace precedes name in some cases

        var ignores = [];

        for (var row=1; row<ipb_body.rows.length; row++)
        {
            var user,
                cell = ipb_body.rows[row].cells[0].innerHTML,
                post = ipb_body.rows[row].cells[2].innerHTML; // show/hide posts toggle

            if ( ((user = cell.match(mre)) != null) ||
                 ((user = cell.match(sre)) != null) )
            {
                // only scrub ignores if "hide posts" property is set,
                // allowing you to block sigs/msgr and still show posts
                if (post.match(/Hide/) != null) {
                    ignores.push([user[1]]);
                }
            }
            else console.log("missed a user: ", cell);
        }
        // ready to go
        if (ignores.length > 0) {
            scrub(ignores);
        }
    }

    // back to the main document, ie. some forum page where we use your ignore list
    function scrub(u_list)
    {
        var forum_host = "http://"+window.location.host+"/",         // to match href
            starts = document.getElementsByClassName("desc lighter blend_links"), // who started threads
            topics = document.getElementsByClassName("last_post"),   // who last posted in topic lists
            quotes = document.getElementsByClassName("citation"),    // quoted posts
            alerts = document.getElementsByClassName("post_ignore"), // alert post, "want to see it anyway?"...no
            xposts = document.getElementsByClassName("hentry"),      // all post entries
            recent = document.getElementsByClassName("url fn name ___hover___member _hoversetup"); // recent topics

        for (var i=0; i<u_list.length; ++i)
        {
            var re = new RegExp(u_list[i]);

            // remove from recent topics on main page
            if (window.location.href == forum_host) {
                for (var r=0; r<recent.length; ++r) {
                    if (recent[r].innerHTML.match(re)) {
                        recent[r].innerHTML = "ignored user";
                    }
                }
            }
            // remove from forum listings
            if (window.location.href.match(/\?\/forum\//) != null)
            {
                // remove from who started
                for (var c=0; c<starts.length; ++c) {
                    if (starts[c].innerHTML.match(re)) {
                        starts[c].innerHTML = "started by ignored user";
                    }
                }
                // remove from who last posted
                for (var t=0; t<topics.length; ++t) {
                    if (topics[t].innerHTML.match(re)) {
                        var stripped = topics[t].innerHTML.replace(re, "");
                        topics[t].innerHTML = stripped;
                    }
                }
            }
            // remove from inside threads
            if (window.location.href.match(/\?\/topic\//) != null)
            {
                // remove quoted user
                for (var q=0; q<quotes.length; ++q) {
                    if (quotes[q].innerHTML.match(re)) {
                        quotes[q].nextSibling.innerHTML = ""; // body
                        quotes[q].innerHTML = "ignored user"; // citation
                    }
                }

                // test: nuke posts in lieu of failing forum ignore feature
                for (var x=0; x<xposts.length; ++x) {
                    if (xposts[x].innerHTML.match(re)) {
                        xposts[x].innerHTML = ". . . IGNORED POST";
                    }
                }
                // just scratch the alert posts, leaving a blank box
                for (var a=0; a<alerts.length; ++a) alerts[a].innerHTML = "";
            }
        }
    }

    // needed for Opera, which doesn't support "text/html" type
    (function(DOMParser) {
        "use strict";
        var DOMParser_proto = DOMParser.prototype,
            real_parseFromString = DOMParser_proto.parseFromString;

        // Firefox/Opera/IE throw errors on unsupported types
        try {
            // WebKit returns null on unsupported types
            if ((new DOMParser).parseFromString("", "text/html")) {
                // text/html parsing is natively supported
                return;
            }
        }
        catch (ex) {}

        DOMParser_proto.parseFromString = function(markup, type) {
            if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
                var doc = document.implementation.createHTMLDocument("");
                doc.body.innerHTML = markup;
                return doc;
            }
            else {
                return real_parseFromString.apply(this, arguments);
            }
        };
    }(DOMParser));
}
// end script
