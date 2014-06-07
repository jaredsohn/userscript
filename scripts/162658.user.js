// ==UserScript==
// @name        My Hotmail
// @namespace   http://userscripts.org/users/498057/scripts
// @description Filter Live.com email
// @include     https://*.live.com/*
// @version     5
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle('#MainContent {margin-right: 0 !important; right: 0 !important}');
GM_addStyle('#contentLeft, .PaginationContainer, #sortFilterContainer, #composeHeader, .leftColumn, .ContactsListContainer, .CL_SearchBox, .CL_Row {background: #EEDDBB !important}');
GM_addStyle('#readingPaneSplitPane, #messageListContainer, #messageListBottom, #ManagedContentWrapper, .c_base  .CP_DetailsContainer, #ComposeContent, .RichText, #fSubject, #ComposeFooterContainer, .ReadMsgHeader {background: #FFFACD !important}');
GM_addStyle('.CL_Sel_Prsn {background: #D24726 !important}');
GM_addStyle('.OuterContainer {background: #fd8 !important}');
GM_addStyle('.bgCell, .hCell {background: #F8F8F8 !important}');
GM_addStyle('.lightbg {background: #EEEEEE !important}');
GM_addStyle('.monthViewEventItem {font-weight:bold !important}');
GM_addStyle('.TextSizeXSmall {font-size: 85% !important}');
GM_addStyle('p, li, h1, h2, h3, .FolderLabel {color: #000 !important}');
GM_addStyle('#contentFolderQuickViewList {margin-top: -30px !important}');
GM_addStyle('.SideAds, #CustComm_120x60, #Ad160x600, #SkyscraperContent, #RadAd_Skyscraper, #FooterContainer, #contentSearchBox, #uxp_ftr_control, #c_hiconm, #quickViewList, #leftPanePrivacy, #calendarViewNavigatorTab, #calendarShortcutsContainer, #RightRailContainer {display: none !important}');

//