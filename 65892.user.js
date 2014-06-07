// ==UserScript==
// @name           Get Twitter out of my Google.
// @namespace      http://userscripts.org/users/86154
// @description    Removes twitter from google search results (when the hell did Twitter become a news outlet?)
// @require        http://buzzy.hostoi.com/AutoUpdater.js
// @include        http://www.google.*
// @include        http://google.*
// ==/UserScript==

var script_id      = 65892;
var script_version = '1.0a';

function check_page() {
    var li_tags = document.getElementsByTagName("li");
    var count    = li_tags.length;

    for (var i = count - 1; i >= 0; i--) {
        if (   li_tags[i].className == 'g'
            && li_tags[i].innerHTML.indexOf('Latest results for') != -1) {
                li_tags[i].style.display = 'none';
                // For Debugging
                //li_tags[i].style.border = "1px solid red";
        }
    }
}

var page_length;

function delete_twitter() {
    if (page_length != document.getElementsByTagName('body')[0].innerHTML.length) {
        page_length = document.getElementsByTagName('body')[0].innerHTML.length;
        check_page();
    }
}

var timer;

window.addEventListener("load",  function () { timer = setTimeout( delete_twitter, 1000 ) }, true);
window.addEventListener('scroll', function () { clearTimeout( timer ); timer = setTimeout( delete_twitter, 1000 ) }, true);

autoUpdate(script_id, script_version);

