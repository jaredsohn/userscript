// ==UserScript==

// @name           Ians Forum Script
// @namespace      Ian
// @include        http://forums.myspace.com/*
// Description 	   Myspace Forum Skin
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

addGlobalStyle('#wrap{width:960px; background-color:#83AFBF;}' +
'#topnav, .ForumTitlePadding, #header {background-color:#102030;}' +
'div.tlTitle,div.trTitle{visibility:hidden;}' +
'div.TitlePadding{visibility:visible;}' +
'.ForumSubTitle {border-color:#102030!important;}' +
'span.ForumTitle {background-color:#E2EBF4; color:#102030;}' +
'span.ForumsText {border-color:#1B1D1F !important; background-color:#102030; color:#EFF3FF;}' +
'.ForumTitleArea,#CommonBodyTable,#CommonBodyColumn,.CommonContentArea, .ForumContentArea {background-color:#83AFBF;border:0px;}' +
'.ForumPostHeader{background-color:#102030; color:#FFFFFF;border-color:#102030 !important;}' +
'.ForumPostHeader *{color:#ffffff;}' +
'td.Listing a, td.PrevNext a {border-width:1px !important; border-color:#EFF3FF !important; font-weight:bold; color:black !important;}' +
'td.Listing a:hover, td.PrevNext a:hover {background-color:#000000!important;border-width:1px !important; border-color:#102030!important; font-weight:bold; color:#EFF3FF !important;}' +
'table.ForumPostContentArea {background-color:#E2EBF4;border-color:#102030 !important; border-width:2px;}' +
'td .ForumPostUserArea {color:#102030 !important;background-color:#CCCCCC; border-right-color:#102030 !important; border-left-color:#CCCCCC !important; border-top-color:#CCCCCC !important; border-bottom-color:#CCCCCC !important; border-width:2px;}' +
'td.PrevNext {color:#EFF3FF !important;}' +
'blockquote {background-color:#CCCCCC;color:#102030 !important;border-color:#102030 !important;}'+
'A {color:#EFF3FF!important;}'+
'A:hover {background-color:#EFF3FF;color:#102030!important;}'+
'.ForumMyImageAndNameHeader, .ForumMyRepliesHeader, .ForumGroupImageAndNameHeader, .ForumGroupTotalThreadsHeader, .ForumGroupTotalPostsHeader {color:#000000 !important;background-color:#E2EBF4;border-color:#EFF3FF !important;}' +
'.ForumMyNameColumn, .ForumMyRepliesColumn, .ForumMyImageColumn, .ForumGroupImageColumn, .ForumSubGroupNameColumn, .ForumGroupTotalThreadsColumn, .ForumGroupTotalPostsColumn, .ForumGroupNameColumn {color:#000000 !important;border-color:#EFF3FF !important;background-color:#83AFBF;}' +
'.ForumGroupLastPostColumn {color:#000000 !important;border-color:#EFF3FF !important;}' +
'select {background-color:#E2EBF4 !important; color:#000000 !important;border-color:#EFF3FF !important;}' +
'input {background-color:#E2EBF4 !important; color:#000000 !important;border-color:#EFF3FF !important;}' +
'span.CurrentPage {background-color:#EFF3FF !important; color:#000000 !important;border-color:#000000 !important;}' +
'div.tabPaneActive {border-color:#83AFBF !important;}' +
'div.ComposeHead, div.Headline, div.tr {background-color:#E2EBF4; border-color:#E2EBF4 !important;}' +
'SPAN.mceToolbarContainer {background-color:#EFF3FF; !important;}' +
'#footer a {color:#000000;}');