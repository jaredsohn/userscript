// ==UserScript==
// @name           Ikariam Delete Rabbits
// @namespace      http://ika-info.ucoz.ru
// @autor          Vit'OS (hakergtr@yandex.ru)
// @version        1.0 
// @description    Returns old images of advisors
// @include        http://s*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// @exclude        http://support.ikariam.*/*
// ==/UserScript==

function NS(cssStyle) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = cssStyle;
    head.appendChild(style);
}

NS('#advisors #advCities a.normal{background-image:url(skin/layout/advisors/mayor.gif)}');
NS('#advisors #advCities a.normalactive{background-image:url(skin/layout/advisors/mayor_active.gif)}');
NS('#advisors #advCities a.premium{background-image:url(skin/layout/advisors/mayor_premium.gif)}');
NS('#advisors #advCities a.premiumactive{background-image:url(skin/layout/advisors/mayor_premium_active.gif)}');
NS('#advisors #advMilitary a.normal{background-image:url(skin/layout/advisors/general.gif)}');
NS('#advisors #advMilitary a.normalactive{background-image:url(skin/layout/advisors/general_active.gif)}');
NS('#advisors #advMilitary a.normalalert{background-image:url(skin/layout/advisors/general_alert.gif)}');
NS('#advisors #advMilitary a.premium{background-image:url(skin/layout/advisors/general_premium.gif)}');
NS('#advisors #advMilitary a.premiumactive{background-image:url(skin/layout/advisors/general_premium_active.gif)}');
NS('#advisors #advMilitary a.premiumalert{background-image:url(skin/layout/advisors/general_premium_alert.gif)}');
NS('#advisors #advResearch a.normal{background-image:url(skin/layout/advisors/scientist.gif)}');
NS('#advisors #advResearch a.normalactive{background-image:url(skin/layout/advisors/scientist_active.gif)}');
NS('#advisors #advResearch a.premium{background-image:url(skin/layout/advisors/scientist_premium.gif)}');
NS('#advisors #advResearch a.premiumactive{background-image:url(skin/layout/advisors/scientist_premium_active.gif)}');
NS('#advisors #advDiplomacy a.normal{background-image:url(skin/layout/advisors/diplomat.gif)}');
NS('#advisors #advDiplomacy a.normalactive{background-image:url(skin/layout/advisors/diplomat_active.gif)}');
NS('#advisors #advDiplomacy a.premium{background-image:url(skin/layout/advisors/diplomat_premium.gif)}}');
NS('#advisors #advDiplomacy a.premiumactive{background-image:url(skin/layout/advisors/diplomat_premium_active.gif)}');





