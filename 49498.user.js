// ==UserScript==
// @name           Top of Page Link
// @namespace      Top of Page Link
// @description    Adds a pretty link at the bottom of each page that takes you to the top.
// @include        http://*bungie.net/*
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

addGlobalStyle('.robbyamhawt {background: url(/images/base_struct_images/contentBg/blueheader.jpg) no-repeat scroll left top; border: 1px solid #63605D; font-size: x-large; -moz-border-radius-bottomleft: 7px; -moz-border-radius-bottomright: 7px; -moz-border-radius-topleft: 7px; -moz-border-radius-topright: 7px;} div.footer {height: 62px;}');

var footer, newcontent;

        footer = document.getElementById('ctl00_footer_footerMenu');

             footer.innerHTML = '<li><a href="/help/privacy_statement.aspx">Privacy Statement</a></li><li><a href="/help/terms_of_use.aspx">Terms of Use</a></li><li><a href="/help/code_of_conduct.aspx">Code of Conduct</a></li><li><a href="/inside/jobs.aspx">Jobs</a></li><li><a href="/help/contact_us.aspx">Contact Us</a></li><li><a href="/help/default.aspx">Help</a></li><br><br><li><p align="right"><a class="robbyamhawt" href="#ctl00_dashboardNav">Top of Page</a></li></p>'

// cookies
// are
// good
// yay
// you should probably watch this: molvania.com/video_medium_2.html
// Duardo likes it... or does he?