// ==UserScript==
// @name           GameFAQs Forum Cleaner
// @namespace      http://github.com/ander1dw
// @description    Removes all the ads and cruft from GameFAQs's message boards.
// @include        http://gamefaqs.com/boards/gen*
// @include        http://*.gamefaqs.com/boards/gen*
// ==/UserScript==

// Based on a function written by Mark Pilgrim (diveintogreasemonkey.org)
function addGlobalStyle(css) {
    var head = document.getElementsByTagName('head')[0];
    if (head) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
}

// Remove the platform jumper.
//addGlobalStyle('#platformlist { display: none !important; }');
//addGlobalStyle('#masthead { height: 143px !important; }');

// Remove sponsored links and recolor the board nav. 
addGlobalStyle('#content #sponsored_links { display: none !important; }');
addGlobalStyle('.board_nav .body { background: #FFFFFF none repeat scroll 0 0 !important; }');

if (window.location.pathname.indexOf('gentopic') > 0) {

    // Remove the side ad and fix the table width. 
    addGlobalStyle('#sky_col_wrap #side_col { display: none !important; }');
    addGlobalStyle('#sky_col_wrap .col_layout { padding: 0 10px !important; }');

    // Fix spacing between the bottom of the topic list and the page footer.
    addGlobalStyle('.searchtopics { background: #FFFFFF none repeat scroll 0 0 !important; margin: 20px 0 15px 0 !important; padding: 0 !important; }');
    addGlobalStyle(' #content .pagejumper { margin: 0 !important; }');

    // Remove thread images. 
    addGlobalStyle('table.topics img { display: none !important; }');

    // Adjust cell sizes.
    addGlobalStyle('table.topics td { padding: 8px 22px 8px 0 !important; }');
    addGlobalStyle('#content thead th, #content tr.head th { padding: 2px 22px 2px 0 !important; }');

    // Make the 'Last Post' column right-aligned. 
    addGlobalStyle('#content tr.head th.lastpost { text-align: right !important; }');
    addGlobalStyle('table.board .date, table.board .lastpost { text-align: right !important; }');

    // Remove the table header and change row colors. 
    addGlobalStyle('#content .pod div.head { display: none !important; }');
    addGlobalStyle('table.board tr.even td { background: #D3D3D3 none repeat scroll 0 0 !important; }');
    addGlobalStyle('table.topics { color: #333333 !important; }');

} else {

    // Change the color of rows with user info.
    addGlobalStyle('table.board th, table.board td { background: #D3D3D3 none repeat scroll 0 0 !important; }');
    addGlobalStyle('table.board tr.even td, table.board tr.even th { background: #FFFFFF none repeat scroll 0 0 !important; }');
    addGlobalStyle('table.message { border-style: none !important; }');
    addGlobalStyle('table.message td { border: 0px solid #FFFFFF !important; }');
}