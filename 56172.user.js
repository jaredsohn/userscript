// ==UserScript==
// @name           Ikariam Alive!
// @author         Whitebeard
// @namespace      http://userscripts.org/scripts/show/56172
// @description    Adds subtle animation to Ikariam images
// @version        0.0.1001
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==


// *** COMMON: ADVISORS ***
GM_addStyle ("#advisors #advCities    a.normalactive { background-image:url(http://img38.imageshack.us/img38/5236/wbmayoractive.gif); }");
GM_addStyle ("#advisors #advMilitary  a.normalactive { background-image:url(http://img33.imageshack.us/img33/9307/wbgeneralactive.gif); }");
GM_addStyle ("#advisors #advMilitary  a.normalalert  { background-image:url(http://img36.imageshack.us/img36/2456/wbgeneralalert.gif); }");
GM_addStyle ("#advisors #advResearch  a.normalactive { background-image:url(http://img39.imageshack.us/img39/1719/wbscientistactive.gif); }");
GM_addStyle ("#advisors #advDiplomacy a.normalactive { background-image:url(http://img90.imageshack.us/img90/7612/wbdiplomatactive.gif); }");

// *** COMMON: ADVISORS (PREMIUM) ***
GM_addStyle ("#advisors #advCities    a.premiumactive { background-image:url(http://img41.imageshack.us/img41/3680/wbmayorpremiumactive.gif); }");
GM_addStyle ("#advisors #advMilitary  a.premiumactive { background-image:url(http://img24.imageshack.us/img24/6787/wbgeneralpremiumactive.gif); }");
GM_addStyle ("#advisors #advMilitary  a.premiumalert  { background-image:url(http://img18.imageshack.us/img18/5553/wbgeneralpremiumalert.gif); }");
GM_addStyle ("#advisors #advResearch  a.premiumactive { background-image:url(http://img13.imageshack.us/img13/2170/wbscientistpremiumactiv.gif); }");
GM_addStyle ("#advisors #advDiplomacy a.premiumactive { background-image:url(http://img9.imageshack.us/img9/2170/wbdiplomatpremiumactive.gif); }");

/// *** ISLAND: CITIES (RED) ***
GM_addStyle ("#island #container #mainview #cities .level1  div.cityimg { background:url(http://img178.imageshack.us/img178/6776/wbcity1red.gif) no-repeat 13px 10px; }");
GM_addStyle ("#island #container #mainview #cities .level2  div.cityimg, #island #container #mainview #cities .level3  div.cityimg { background:url(http://img259.imageshack.us/img259/8996/wbcity2red.gif) no-repeat 13px 13px; }");
GM_addStyle ("#island #container #mainview #cities .level4  div.cityimg, #island #container #mainview #cities .level5  div.cityimg, #island #container #mainview #cities .level6  div.cityimg { background:url(http://img31.imageshack.us/img31/4707/wbcity3red.gif) no-repeat 13px 13px; }");
GM_addStyle ("#island #container #mainview #cities .level7  div.cityimg, #island #container #mainview #cities .level8  div.cityimg, #island #container #mainview #cities .level9  div.cityimg { background:url(http://img10.imageshack.us/img10/9251/wbcity4red.gif) no-repeat 11px 13px; }");
GM_addStyle ("#island #container #mainview #cities .level10 div.cityimg, #island #container #mainview #cities .level11 div.cityimg, #island #container #mainview #cities .level12 div.cityimg { background:url(http://img31.imageshack.us/img31/2725/wbcity5red.gif) no-repeat  8px 13px; }");
GM_addStyle ("#island #container #mainview #cities .level13 div.cityimg, #island #container #mainview #cities .level14 div.cityimg, #island #container #mainview #cities .level15 div.cityimg { background:url(http://img33.imageshack.us/img33/5228/wbcity6red.gif) no-repeat  4px  7px; }");
GM_addStyle ("#island #container #mainview #cities .level16 div.cityImg, #island #container #mainview #cities .level17 div.cityImg { background:url(http://img178.imageshack.us/img178/257/wbcity7red.gif) no-repeat  4px  7px; }");
GM_addStyle ("#island #container #mainview #cities .level18 div.cityimg, #island #container #mainview #cities .level19 div.cityimg, #island #container #mainview #cities .level20 div.cityimg, #island #container #mainview #cities .level21 div.cityimg, #island #container #mainview #cities .level22 div.cityimg, #island #container #mainview #cities .level23 div.cityimg, #island #container #mainview #cities .level24 div.cityimg { background:url(http://img18.imageshack.us/img18/6179/wbcity8red.gif) no-repeat 2px 4px; }");

// *** ISLAND (MISC) ***
GM_addStyle("#island #container #mainview #cities .selectimg { position:absolute; top:10px; left:3px; visibility:hidden;  background-image:url(http://img38.imageshack.us/img38/2586/wbselectcity.gif); width:63px; height:63px; }");
GM_addStyle("#island #container #mainview #cities .selected div.selectimg{ visibility:visible;z-index:9999;}");
