// ==UserScript==
// @name           Make GitHub Pull Request and Commit pages full width
// @namespace      https://bitbucket.org/deadlydog/greasemonkeyscripts
// @description    Makes the GitHub Pull Request page and Commit page span the full width of the browser.
// @include        https://github.com/*/pull/*
// @include        https://github.com/*/commit/*
// @version        1.5
// ==/UserScript==

function set_width(elements, width_value) {
    var length = elements.length;
    for (var index = 0; index < length; index++) {
        elements[index].style.width = width_value;
    }
}

set_width(document.getElementsByClassName('container'), "95%");
set_width([document.getElementById('files_bucket')], "100%");
set_width(document.getElementsByClassName('discussion-timeline'), "90%");
set_width(document.getElementsByClassName('mini-avatar-bubble'), "100%");

