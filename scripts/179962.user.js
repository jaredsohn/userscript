// ==UserScript==
// @name        minimal RTM
// @namespace   hellochameleon.com
// @description Simple design update for the web app. Best if used used with the "A bit better RTM" plug-in for Firefox.
// @include     https://www.rememberthemilk.com/home/*
// @version     1.2
// ==/UserScript==

// Move the status box to the bottom of the page
node = document.getElementById('statusbox');
if(node)
{
   node.parentNode.removeChild(node);
   var newParent = document.getElementById('content');
   newParent.appendChild(node);
}

// Restyle

GM_addStyle('a {text-decoration:none!important;}')


//top nav
GM_addStyle('#content {padding: 0;} #appheader {background-color: #F6F6F6; border-bottom: 1px solid #EEEEEE; height: 16px; padding: 12px; margin:0 0 18px;}')
GM_addStyle('#topnav {float:left!important;}')
GM_addStyle('#topnav, #topnav a {font-weight:400; color:#bbb;}')
GM_addStyle('#topnav a:hover {color:#777;}')
GM_addStyle('#viewSelector > span {color:#777;}')
GM_addStyle('#searchbox {clear: none; float: right; padding-top: 0;}')
GM_addStyle('#list {width:600px; margin:auto;}')
GM_addStyle('#searchbox div { float: none; display: inline-block;}')
GM_addStyle('#searchtogglewrap {text-align:left; width:auto;}')

//Lists nav
GM_addStyle('.abr-listtabs li a {color:#999!important;}')
GM_addStyle('.abr-listtabs li a:hover {color:#0060BF!important;}')
GM_addStyle('.abr-listtabs li.xtab_selected {background-color: #d1edff!important;}')
GM_addStyle('.abr-listtabs li.xtab_selected a {color:#555!important;}')

//Task list styles
GM_addStyle('#sorting, #tasksToolbox, #tasksCompletedToolbox, #tasksSentToolbox, #contactsToolbox, #groupsToolbox, #listsToolbox, #locationsToolbox, #tagToolbox {padding: 9px 0 12px!important;}')
GM_addStyle('.xtoolbox_actions, .xtoolbox_selector {padding-left:0!important;}')
GM_addStyle('#sorting {padding-right:0!important;}')
GM_addStyle('#midcontent > div, #tools {border-left: 1px solid #eee!important; border-right: 1px solid #eee!important;}')
GM_addStyle('#tools {padding: 0 9px 0 9px;}')
GM_addStyle('.xtd_prio {border-right:none;}')
GM_addStyle('.xtd {border-bottom: 1px solid #eee; height: 36px;}')
GM_addStyle('.xtable {background-color: #FFFFFF; border-color: #EEEEEE;}')
GM_addStyle('.xtr_hover {background-color:#D1EDFF!important;}')
GM_addStyle('.add-box {border-top: 1px solid #eee;}')
GM_addStyle('#listwrap > div#tools_spacer {border-left: 1px solid #eee!important; border-right: 1px solid #eee!important; border-top: 1px solid #eee!important;}')
GM_addStyle('#appview > .taskcloudcontent, #detailsstatuswrap {border:1px solid #eee!important; background-color:#F9F9F9;}')
GM_addStyle('.taskoverdue {text-decoration:none; color:#000;}')
GM_addStyle('.prio1 {background-color: #d50003;}')
GM_addStyle('.prio2 {background-color: #F47A00;}')
GM_addStyle('.prio3 {background-color: #FADA63;}')

//Form elements over the task list
GM_addStyle('.xtoolbox_actions form input, .xtoolbox_actions form select {cursor:pointer;}')
GM_addStyle('.xtoolbox_actions form input {background: none repeat scroll 0 0 #E7E7E7; border: 1px solid #CCCCCC; border-radius: 4px; font-size: 1em; padding: 3px;}')
GM_addStyle('.xtoolbox_actions form input:hover {background-color: #D1EDFF;}')
GM_addStyle('.xtoolbox_actions form select {background: none repeat scroll 0 0 #FFFFFF; border: 1px solid #CCCCCC; border-radius: 4px; font-size: 1em; padding: 3px;}')

//detailsbox
GM_addStyle('#detailswrap {background: none repeat scroll 0 0 #FAFAFA; border: solid 1px #EEE; width: 293px;}')
GM_addStyle('.xtabs_grey a, .xtabs a, .xtabs_grey li {background:none;}')
GM_addStyle('.xtabs {background:none; padding:6px;} .xtabs ul {padding:0;}')
GM_addStyle('xtabs_grey li, .xtabs li, .xtabs li.xtab_selected {border:none;}')
GM_addStyle('.xtabs li a:link, .xtabs li a:visited, .xtabs li a:active {color:#999;}')
GM_addStyle('.xtabs li a:hover, .xtabs_grey a:hover {color:#000;}')
GM_addStyle('.xtabs .xtab_selected {background:none; border-bottom:solid 1px #cacaca!important;}')

//Tag cloud
GM_addStyle('.white_rbtop div, .white_rbtop, .white_rbbot div, .white_rbbot, .white_rbcontent, .white_rbcontentwrap {background:none!important;}')
GM_addStyle('.taskcloudbox {border:1px solid #eee;}')

GM_addStyle('#onlinehelpwrap {border:solid 1px #eee;}')

//Footer
GM_addStyle('.appfooter {width:600px; margin:auto;}')
GM_addStyle('.appfooter a {color:#bbb;}')
GM_addStyle('.appfooter a:hover {color:#777;}')

// Hide

GM_addStyle('#datetime, #appheaderlogo {display:none!important;}')