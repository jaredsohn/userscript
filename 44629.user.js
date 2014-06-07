// ==UserScript==
// @name        NoLo
// @namespace   tag:ethan.torretta@gmail.com,2009-03-15:No-Lo
// @description Erase irritating NRO posters, especially Kathryn Lopez ("K-Lo").
// @include     http://corner.nationalreview.com/*
// ==/UserScript==

// $Revision: 1.2 $

// I can only imagine the film's latest horrors, its flaunting of
// vulgarity in the face of theology and geometry, taste and decency.
// List menaces to geometry, taste, and decency here:
var nolo_hide_users = new Array("Kathryn Jean Lopez", "Kathryn Lopez", "K-Lo",
                                "Jay Nordlinger");
var nolo_user_rx = new RegExp("\\[.*?(" + nolo_hide_users.join("|") +
                              ").*?\\]");

// See below for explanation
var nolo_nonsense    = new Array("buckawk", "bawk", "blah", "cluck",
                                 "cluck-cluck", "pope");

// The corner's blog format is very hacky, so this is all kind of shaky.
// The reliance on <p> to enclose the blog text explains why the layout of
// the corner breaks so very often.
function nolo_clean_corner() {
    var divs = document.body.getElementsByTagName("DIV");
    var i, j, k;
    for (i = 0; i < divs.length; i++) {
        if (divs[i].className != "blog_text") {
            continue;
        }

        // Check whether one of the ungeometrical posted this.
        var paras = divs[i].getElementsByTagName("P");
        var match = 0;
        for (j = 0; j < paras.length; j++) {
            if (paras[j].className != "blog_title_holder" ||
                    ! (match = nolo_user_rx.exec(paras[j].innerHTML))) {
                continue;
            }
            break;
        }

        if (! match) {
            continue;
        }

        // Replace the p.className == blog_text section and unlabeled <p>
        // blocks.  It's far from ideal, but trying a proper replacement
        // of the top div seems to confuse the page layout and there's no
        // other reliable method.  Again, this explains why the corner page
        // layout breaks a lot.  All the nonsense is just making the best
        // of an annoying situation.  Also, who can deny that Lopez's
        // posts amount to "bawk bawk pope!!"?

        var pcount = 0;
        for (j = 0; j < paras.length; j++) {
            if (! paras[j].className ||
                   paras[j].className == "blog_permalink" ||
                   paras[j].className == "blog_title_holder") {
                continue;
            }

            // these nitwits are extraordinarily verbose so cut them off
            pcount = ((pcount + 1) % 6) || 1;
            var numnonsense = Math.floor(Math.random() * pcount) + 1;
            var text = "";
            for (k = 0; k < numnonsense; k++) {
                var ntype = Math.floor(Math.random() * nolo_nonsense.length);
                text += text ? " " : "";
                text += nolo_nonsense[ntype];
            }

            var punct = Math.random();
            if (punct > 0.9) {
                text = text + "!?";
            } else if (punct > 0.8) {
                text = text + "?";
            } else if (punct > 0.5) {
                text = text + "!";
            } else {
                text = text + ".";
            }
            text = text.charAt(0).toUpperCase() + text.slice(1);
            if (paras[j].parentNode.nodeName == "BLOCKQUOTE") {
                text = '"' + text + '"';
            }

            paras[j].innerHTML = text;
        }
    }
}

nolo_clean_corner();
