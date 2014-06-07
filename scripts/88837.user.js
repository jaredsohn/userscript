// ==UserScript== 
// @name            Normal Advisors
// @description     Palauttaa normaalit neuvonantajat.
// @author          Muppetti, made with Ikariam Theme-Generator
// @homepage        Not yet created.
// @include         http://s*.ikariam.*/*
// @exclude         http://board.*.ikariam.*/*
// @exclude         http://board.ikariam.*/*
// @exclude         http://support.*.ikariam.*/*
// @exclude         http://support.ikariam.*/*
// @exclude         http://s*.ikariam.*/skin/*
// @exclude         http://s*.ikariam.*/js/*
// ==/UserScript==

GM_addStyle('#advisors a {margin-top: 0px;}');

GM_addStyle('#advisors #advCities a.normal {background-image:url(http://s1.fi.ikariam.com/skin/layout/advisors/mayor.gif);}');
GM_addStyle('#advisors #advCities a.normalactive {background-image:url(http://s1.fi.ikariam.com/skin/layout/advisors/mayor_active.gif);}');
GM_addStyle('#advisors #advMilitary a.normal {background-image:url(http://s1.fi.ikariam.com/skin/layout/advisors/general.gif);}');
GM_addStyle('#advisors #advMilitary a.normalactive {background-image:url(http://s1.fi.ikariam.com/skin/layout/advisors/general_active.gif);}');
GM_addStyle('#advisors #advMilitary a.normalalert {background-image:url(http://s1.fi.ikariam.com/skin/layout/advisors/general_alert.gif);}');
GM_addStyle('#advisors #advResearch a.normal {background-image:url(http://s1.fi.ikariam.com/skin/layout/advisors/scientist.gif);}');
GM_addStyle('#advisors #advResearch a.normalactive {background-image:url(http://s1.fi.ikariam.com/skin/layout/advisors/scientist_active.gif);}');
GM_addStyle('#advisors #advDiplomacy a.normal {background-image:url(http://s1.fi.ikariam.com/skin/layout/advisors/diplomat.gif);}');
GM_addStyle('#advisors #advDiplomacy a.normalactive {background-image:url(http://s1.fi.ikariam.com/skin/layout/advisors/diplomat_active.gif);}');
GM_addStyle('#advisors #advCities a.premium {background-image:url(http://s1.fi.ikariam.com/skin/layout/advisors/mayor.gif);}');
GM_addStyle('#advisors #advCities a.premiumactive {background-image:url(http://s1.fi.ikariam.com/skin/layout/advisors/mayor_active.gif);}');
GM_addStyle('#advisors #advMilitary a.premium {background-image:url(http://s1.fi.ikariam.com/skin/layout/advisors/general.gif);}');
GM_addStyle('#advisors #advMilitary a.premiumactive {background-image:url(http://s1.fi.ikariam.com/skin/layout/advisors/general_active.gif);}');
GM_addStyle('#advisors #advMilitary a.premiumalert {background-image:url(http://s1.fi.ikariam.com/skin/layout/advisors/general_alert.gif);}');
GM_addStyle('#advisors #advResearch a.premium {background-image:url(http://s1.fi.ikariam.com/skin/layout/advisors/scientist.gif);}');
GM_addStyle('#advisors #advResearch a.premiumactive {background-image:url(http://s1.fi.ikariam.com/skin/layout/advisors/scientist_active.gif);}');
GM_addStyle('#advisors #advDiplomacy a.premium {background-image:url(http://s1.fi.ikariam.com/skin/layout/advisors/diplomat.gif);}');
GM_addStyle('#advisors #advDiplomacy a.premiumactive {background-image:url(http://s1.fi.ikariam.com/skin/layout/advisors/diplomat_active.gif);}');
