// ==UserScript==
// @name           Ikariam Mayor's Wife
// @author         Raymon
// @description    For people who wants the mayor's wife longer as advisor!
// @version        1.1.1
// @include        http://s*.*.ikariam.*/*
// @exclude        http://board.*.ikariam.*/*
// ==/UserScript==

GM_addStyle("#headers #advisors #advCities a.normal, #advisors #advCities a.normal { background-image: url(http://img716.imageshack.us/img716/7498/buergermeisterin.png) !important; }");

GM_addStyle("#headers #advisors #advCities a.normalactive, #advisors #advCities a.normalactive { background-image: url(http://img805.imageshack.us/img805/3582/buergermeisterinaktiv.png) !important; }");

GM_addStyle("#headers #advisors #advCities a.premium, #advisors #advCities a.premium { background-image: url(http://img801.imageshack.us/img801/8527/buergermeisterinpremium.png) !important; }");

GM_addStyle("#headers #advisors #advCities a.premiumactive, #advisors #advCities a.premiumactive { background-image: url(http://img857.imageshack.us/img857/8527/buergermeisterinpremium.png) !important; }");

GM_addStyle("#container #tradeAdvisor_c::before, #container #premiumTradeAdvisor_c::before, #container #tradeRoutes_c::before, #container #premiumTradeAdvisorCitizens_c::before, #container #premiumTradeAdvisorBuildings_c::before { content: url(http://img827.imageshack.us/img827/9682/tradeadvisor.png); margin-top:-5px; }");