// ==UserScript==

// @name           Teal Forum Script
// @namespace  yo
// @include        http://forums.myspace.com/*
// Description 	   Boobies
// Credits	   created by mark (myspace.com/xenomark) Edited by Ian (myspace.com/ian1978/test)
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

addGlobalStyle('#wrap{width:960px; background-color:#008080;}' +
'#topnav, .ForumTitlePadding, #header {background-color:#1B1D1F;}' +
'div.tlTitle,div.trTitle{visibility:hidden;}' +
'div.TitlePadding{visibility:visible;}' +
'.ForumSubTitle {border-color:#1B1D1F!important;}' +
'span.ForumTitle {background-color:#FFCFE7; color:#1B1D1F;}' +
'span.ForumsText {border-color:#1B1D1F !important; background-color:#1B1D1F; color:#FF99CC;}' +
'.ForumTitleArea,#CommonBodyTable,#CommonBodyColumn,.CommonContentArea, .ForumContentArea {background-color:#008080;border:0px;}' +
'.ForumPostHeader{background-color:#1B1D1F; color:#FFFFFF;border-color:#1B1D1F !important;}' +
'.ForumPostHeader *{color:#ffffff;}' +
'td.Listing a, td.PrevNext a {border-width:1px !important; border-color:#EF3B97 !important; font-weight:bold; color:black !important;}' +
'td.Listing a:hover, td.PrevNext a:hover {background-color:#000000!important;border-width:1px !important; border-color:#1B1D1F!important; font-weight:bold; color:#EF3B97 !important;}' +
'table.ForumPostContentArea {background-color:#FFCFE7;border-color:#1B1D1F !important; border-width:2px;}' +
'td .ForumPostUserArea {color:#1B1D1F !important;background-color:#CCCCCC; border-right-color:#1B1D1F !important; border-left-color:#CCCCCC !important; border-top-color:#CCCCCC !important; border-bottom-color:#CCCCCC !important; border-width:2px;}' +
'td.PrevNext {color:#EF3B97 !important;}' +
'blockquote {background-color:#CCCCCC;color:#1B1D1F !important;border-color:#1B1D1F !important;}'+
'A {color:#EF3B97!important;}'+
'A:hover {background-color:#EF3B97;color:#1B1D1F!important;}'+
'.ForumMyImageAndNameHeader, .ForumMyRepliesHeader, .ForumGroupImageAndNameHeader, .ForumGroupTotalThreadsHeader, .ForumGroupTotalPostsHeader {color:#000000 !important;background-color:#FFCFE7;border-color:#EF3B97 !important;}' +
'.ForumMyNameColumn, .ForumMyRepliesColumn, .ForumMyImageColumn, .ForumGroupImageColumn, .ForumSubGroupNameColumn, .ForumGroupTotalThreadsColumn, .ForumGroupTotalPostsColumn, .ForumGroupNameColumn {color:#000000 !important;border-color:#EF3B97 !important;background-color:#008080;}' +
'.ForumGroupLastPostColumn {color:#000000 !important;border-color:#EF3B97 !important;}' +
'select {background-color:#FFCFE7 !important; color:#000000 !important;border-color:#EF3B97 !important;}' +
'input {background-color:#FFCFE7 !important; color:#000000 !important;border-color:#EF3B97 !important;}' +
'span.CurrentPage {background-color:#EF3B97 !important; color:#000000 !important;border-color:#000000 !important;}' +
'#footer a {color:#000000;}');