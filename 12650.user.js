// ==UserScript==
// @name          MySpace Edit Page
// @description      Resizes the boxes and moves around a few things. Makes it easier to use.
// @namespace     http://userscripts.org/users/34883
// @include       http://profileedit.myspace.com/*=profile.interests*
// ==/UserScript==

s= 'input#ctl00_ctl00_cpMain_ProfileEditContent_editInterests_HeadlineText {font-family:verdana; color:rgb(0,0,0) !important; font-size:11px;}\n'
s+= 'input#ctl00_ctl00_cpMain_ProfileEditContent_editInterests_PreviewTop {position:fixed; right:120px; top:265px;}\n'
s+= 'input#ctl00_ctl00_cpMain_ProfileEditContent_editInterests_SaveTop {position:fixed; right:111px; top:235px;}\n'
s+= 'input#ctl00_ctl00_cpMain_ProfileEditContent_editInterests_PreviewBottom {display:none;}\n'
s+= 'input#ctl00_ctl00_cpMain_ProfileEditContent_editInterests_SaveInterests {display:none;}\n'
s+= '#footer, div.alignL, div.saveButtons, .weightN {display:none;}\n'
s+= 'div.row label {position:abolute; left:50%; margin-left:-107px; font-size:14px;}\n'
s+= 'textarea.w500 {width:630px; color:black; font-family:verdana; font-size:11px;}\n'

GM_addStyle(s);