// allenap's Launchpad Hacks
// version 0.1.2 (2008-01-25)
// Copyright (c) Gavin Panella
// Available under GPLv2+
//
// Features:
//
// 1. Highlight rows on milestone pages that contain the logged-in
// users name.
//
// ==UserScript==
// @name           allenap's Launchpad Hacks
// @namespace      http://www.premolo.net/~gavin/Scripts/Greasemonkey/
// @description    Various hacks to make Launchpad.net work how I like it.
// @include        https://*.launchpad.net/*/+milestone/*
// ==/UserScript==


function addGlobalStyle(css) {
    var head = document.getElementsByTagName('head')[0];
    if (head) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
}

function findParent(element, tagName) {
    // Find a parent element matching tagName, which should probably
    // be all capitals.
    var parent = element.parentNode;
    return (parent == null || parent.tagName == tagName) ?
        parent : arguments.callee(parent, tagName);
}

function getLoggedInUserLink() {
    // Returns the href to the page of the logged-in user.
    var forms = document.getElementsByTagName('form');
    for (var i = 0; i < forms.length; i++) {
        var form = forms[i];
        if (form.action.match(/[/][+]logout$/)) {
            return form.getElementsByTagName('a')[0].href;
        }
    }
}

function highlightMilestoneRows() {
    // Highlight rows for specs and bugs that are assigned to the
    // logged-in user.
    var user_href = getLoggedInUserLink()
    if (user_href == null) {
        return;
    }

    addGlobalStyle(
        'tr.highlight-for-user td { background-color: #ffcc56; }');

    var highlight = function(table) {
        if (table == null) return;
        var links = table.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            if (link.href == user_href) {
                var row = findParent(link, 'TR');
                if (row) {
                    if (row.className) {
                        row.className += ' highlight-for-user';
                    }
                    else {
                        row.className = 'highlight-for-user';
                    }
                }
            }
        }
    };

    highlight(document.getElementById('milestone_specs'));
    highlight(document.getElementById('milestone_bugtasks'));
}


var location = document.location.href;

if (location.indexOf('/+milestone/') >= 0) {
    // Milestone page
    highlightMilestoneRows();
}




// End
