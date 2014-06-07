// xbox.com Scaledown
// version 1.0 BETA!
// 2010-10-21
// Copyright (c) 2010, Mike Audleman
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.8 or later: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Xbox.com Scaledown", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @namespace		http://www.wolfiesden.com/greasemonkey/
// @name           Xbox.com Scaledown
// @description    Strips out the huge banners and removes many spacings and reduces huge font sizes
// @include        http://live.xbox.com/en-US/*
// ==/UserScript==

var currentURL = window.location.href;

// General
GM_addStyle("div#BodyHeader div#ShellHeaderContent div#ShellBreadcrumbs { padding-top: 4px; padding-bottom: 4px; }");

GM_addStyle("h1 { font-size: 24px; margin-top: 2px; margin-bottom: 10px; }");
GM_addStyle("h2 { font-size: 16px; margin-bottom: 5px; }");
GM_addStyle("h3 { font-size: 14px; margin-bottom: 5px; }");

GM_addStyle("div#ShellHeaderContent div#ShellMeBarArea, div#ShellHeaderContent div#ShellMeBarArea,div#ShellHeaderContent div#ShellMeBarArea div#ShellMeBar, div#ShellHeaderContent div#ShellMeBarArea div#HeadShotBox.SignedIn div.avatarHeadshot,div#ShellHeaderContent div#ShellMeBarArea div#HeadShotBox { height: 50px; }");
GM_addStyle("div#ShellHeaderContent div#ShellMeBarArea div.LinkArea { top: 34px; }");
GM_addStyle("div#ShellHeaderContent div#ShellMeBarArea div#ShellLogo { top: 11px; }");
GM_addStyle("div#ShellHeaderContent div#ShellMeBarArea div.GamerStatArea { bottom: 20px; }");

// Profile Page
GM_addStyle("div#CrossPromotion div#AdSection { display:none; }");
GM_addStyle("div#ProfileArea div#SideBar div#ProfileInfo div#bio { display:none; }");
GM_addStyle("div.ProfileViewContent div.section img { height:80px; }");
GM_addStyle("div.ProfileViewContent div.section { padding:10px 10px 10px 5px; }");
GM_addStyle("div.ProfileViewContent div.section div.text { padding-bottom: 2px; }");
GM_addStyle("div.ProfileViewContent div.section div.text p  { margin-bottom: 5px; }");
GM_addStyle("div#RecentActivity div.ActivitySlot img.BoxShot { width: 88px; height: 120px; }");
GM_addStyle("div.ProfileHeroContent div#ProfileArea div#RecentActivity { height: 188px; }");
GM_addStyle("div.ProfileHeroContent div#ProfileArea div#Avatar { height: 215px; }");
GM_addStyle("div.ProfileHeroContent div#ProfileArea div#Avatar img.AvatarBody { height: 200px; }");
GM_addStyle("div.ProfileHeroContent div#ProfileArea { height: 290px; }");
GM_addStyle("div.ProfileHeroContent div#ProfileArea div#Avatar div#Motto  { left: 80px; font-size: 12px; }");
GM_addStyle("div.ProfileHeroContent div#ProfileArea div#SideBar  { height: 240px; }");
GM_addStyle("div#RecentActivity div.ActivitySlot div.PedastalArea { height: 60px; }");

GM_addStyle("div#CrossPromotion div#Touts div.tout { padding:0px 10px 10px 5px; margin-bottom: 10px; }");
GM_addStyle("div#CrossPromotion div#Touts div.tout div.text h1.title { font-size: 24px;margin-top: 2px;margin-bottom: 10px; }");
GM_addStyle("div#CrossPromotion div#Touts div.tout div.text .description { margin-bottom: 5px; }");
GM_addStyle("div#CrossPromotion div#Touts div.tout div.toutimage img { width: 176px; height: 105px; }");
GM_addStyle("div#CrossPromotion div#Touts div.tout div.toutimage { width: 176px }");

// Friends Page
GM_addStyle("#fc-main .fc-title { margin-top: 6px; }");
GM_addStyle("div#fc-main img { display:none; }");
GM_addStyle("div#fc-main div#fc-content img { display:inline; }");
GM_addStyle("#fc-main dd { margin-top: 0px; margin-bottom: 0px; }");

// Messages
GM_addStyle("div#messagecenter img { display:none; }");
GM_addStyle("#messagecenter h1 { display:none; }");

GM_addStyle("div#messagecenter div#messages img,div#messagecenter div.recipientpanel img { display:inline; }");
GM_addStyle("div#messagecenter div.recipientpanel img { display:inline; }");
GM_addStyle("#messagecenter .messagecentertabs .Link, #messagecenter .messagecentertabs .HighlightedLink,#messagecenter .unused { height: 18px; line-height: 18px; font-size: 13px; padding-top:1px; padding-bottom:1px }");
GM_addStyle("#messages .header { font-size: 16px; padding-bottom: 5px; }");
GM_addStyle("#messages .message { margin-top: 3px; padding-top: 3px; padding-bottom: 3px; }");
GM_addStyle("#messages .messagetext { margin-top: 3px; margin-bottom: 3px; }");
GM_addStyle("#messages .more { margin-top: 10px; }");
GM_addStyle("div.friendpicker .friend { margin-bottom: 1px; height: 26px; line-height: 26px; }");
GM_addStyle("div.friendpicker .friend img {height: 26px; }");

// Achievements page
GM_addStyle("div.SpaceItem {padding-top: 2px; padding-bottom: 2px;}");
GM_addStyle("div.GameProgressBlock div.StatBlock div.Stat {height: 20px; margin-bottom: 8px;}");
GM_addStyle("a div.AchievementsLink {margin-top: 10px;}");
GM_addStyle("div.LineItem {padding-top: 4px;padding-bottom: 4px;}");
GM_addStyle("div.LineItem div.grid-7 {margin-top: 1px; margin-bottom: 1px;}");

// Footer
GM_addStyle("body div#BodyFooter div#ShellFooterContent div.PrimaryContent { padding-top: 2px; padding-bottom: 0px; }");
GM_addStyle("body div#BodyFooter div#ShellFooterContent div.SecondaryContent { padding-top: 2px; padding-bottom: 0px; }");
