// ==UserScript==
// @name           Tweak Runners World Forum Layout
// @namespace      http://glenncarr.com/greasemonkey
// @include        http://www.runnersworld.com/community/forums/*
// $LastChangedRevision$
// $LastChangedDate$
// ==/UserScript==
GM_addStyle( '#container {width: 100%} #pluckDiv {width: 70%} #rightDiv { width: 25%}' );
GM_addStyle( 'div.Discussion_UserSignature, div.Discussion_UserInfo { display: none }' );
GM_addStyle( '.mceEditor, .mceEditorIframe { width: 100% }' );
GM_addStyle( '.DiscussionList_ListTableName A { display: block; height: 100%; }' );
GM_addStyle( '\
TD.DiscussionList_ListTableImg IMG { height: 14px } \
td.DiscussionList_ListTableImg, \
td.DiscussionList_ListTableImg, \
td.DiscussionList_ListTableName, \
td.DiscussionList_ListTableStarted, \
td.DiscussionList_ListTablePosts, \
td.DiscussionList_ListTableLatest { padding: 1px 0px } \
ForumsTable_AltTRcolor TD, ForumsTable_TRcolor TD { padding: 2px 1px }\
TR.ForumsTable_AltTRcolor { background: #CCDDDD }\
' );