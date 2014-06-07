// ==UserScript==
// @name           Remove user comments from hs.fi
// @namespace      http://userscripts.org/users/mikko2014
// @description    Removes user comments from hs.fi
// @include        http://www.hs.fi/*
// ==/UserScript==
var discussionsElement = $('div#commenting');
if (discussionsElement) {
    discussionsElement.remove();
}