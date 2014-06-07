// ==UserScript==
// @name           Top of Page Link2
// @namespace      Top of Page Link2
// @description    You are all still lazy.
// @include        http://*bungie.net/Forums/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.robbyamhawt {background: url(/images/base_struct_images/contentBg/blueheader.jpg) no-repeat scroll left top; border: 1px solid #63605D; width: 200px; height: 100px; font-size: x-large;');

var footer, newcontent;

        footer = document.getElementById('ctl00_footer_footerMenu');
        if (footer)
        {
             footer.innerHTML = '<a class="robbyamhawt" href="#ctl00_forumHeader_forumTitleImage">Top of Page</a>'
        }

// cookies
// are
// good
// yay
// you should probably watch this: molvania.com/video_medium_2.html  