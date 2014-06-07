// ==UserScript==

// @name           MK Chrome Extension
// @namespace      categoryfilter
// @description    Makes the userbar less shitty.
// @include        http://*mushroom-kingdom.info/*
// @include        https://*mushroom-kingdom.info/*
// @include        http://*www.cybernations.net/*
// @include        https://*www.cybernations.net/*
// @include        http://*forums.cybernations.net/*
// @include        https://*forums.cybernations.net/*
// @include        https://*umbrella-alliance.com/*
// @include        http://*umbrella-alliance.com/*
// @include        https://*cngoons.com/*
// @include        http://*cngoons.com/*
// @include        https://*orangedefense.net/*
// @include        http://*orangedefense.net/*
// @include        https://*ordoparadox.com/*
// @include        http://**ordoparadox.com/*
// @include        https://*thelastremnants.com/*
// @include        http://*thelastremnants.com/*
// @include        https://*fokalliance.com/*
// @include        http://*fokalliance.com/*
// @include        https://*cnalchemy.com/*
// @include        http://*cnalchemy.com/*
// @include        https://*cybernations.wikia.com/*
// @include        http://*cybernations.wikia.com/*
// @include        https://*s4.zetaboards.com/*
// @include        http://*s4.zetaboards.com/*
// @include        https://*thecastlehall.no-ip.org/*
// @include        http://*thecastlehall.no-ip.org/*

// ==/UserScript==

//Version 2011.1.1

var logo = document.createElement("div");

logo.innerHTML = '<div id="navbar"><div id="centernav"><ul><li><a href="//mushroom-kingdom.info/boards/index.php">Mushroom Kingdom</a><ul><li><a href="//mushroom-kingdom.info/boards/index.php?board=15.0">Announcements</a></li><li><a href="//mushroom-kingdom.info/boards/index.php?board=14.0">Private General</a></li><li><a href="//mushroom-kingdom.info/boards/index.php?board=717.0">Economic HQ</a></li><li><a href="//mushroom-kingdom.info/boards/index.php?board=271.0">Private Social</a></li><li><a href="//mushroom-kingdom.info/boards/index.php?board=571.0">Castle Fairgrounds</a></li><li><a href="//mushroom-kingdom.info/boards/index.php?board=9.0">The Restaurant at the End of the Universe</a></li><li class="divider"></li><li><a href="//mushroom-kingdom.info/boards/index.php?action=pm">Private Messages</a></li><li><a href="//mushroom-kingdom.info/boards/index.php?action=profile">Profile</a></li><li><a href="//mushroom-kingdom.info/boards/index.php?action=recent">Recent Posts</a></li></ul></li><li><a href="//www.cybernations.net/nation_drill_display.asp?Nation_ID=390258">Nation</a><ul><li><a href="//www.cybernations.net/nation_edit.asp?Nation_ID=390258">Nation Options</a></li><li><a href="//www.cybernations.net/nation_drill_display_charts.asp?Nation_ID=390258">Chart Display</a></li><li><a href="//thecastlehall.no-ip.org/8bit/vanguard/rollcall.php/">Roll Call</a></li><li class="divider"></li><li><a href="//www.cybernations.net/stats_alliance_stats_custom.asp?Alliance=mUsHrOoM%20kInGdOm">MK Stats</a></li><li><a href="//www.cybernations.net/stats_alliance_stats_custom.asp?View=Charts&Alliance=MUsHrOoM%20KInGdOm">MK Stat Charts</a></li><li><a href="//www.cybernations.net/allNations_display_alliances.asp?Alliance=mUsHrOoM%20kInGdOm">MK Member Display</a></li><li><a href="//www.cybernations.net/search_aid.asp?searchstring=Declaring_Alliance%2CReceiving_Alliance&search=mUsHrOoM%20kInGdOm&anyallexact=exact">MK Wars</a></li><li><a href="//www.cybernations.net/search_wars.asp?searchstring=Declaring_Alliance%2CReceiving_Alliance&search=mUsHrOoM%20kInGdOm&anyallexact=exact">MK Aid</a></li><li class="divider"></li><li><a href="//www.cybernations.net/trade_information.asp?Nation_ID=390258">Trade Screen</a></li><li><a href="//www.cybernations.net/aid_information.asp?Nation_ID=390258"> Aid Screen </a></li></ul></li><li><a href="//Add_Later">Other Forums</a><ul><li><a href="//forums.cybernations.net/index.php?showforum=69">OWF</a></li><li><a href="//www.umbrella-alliance.com/">Umbrella</a></li><li><a href="//cngoons.com/Board/index.php">GOONS</a></li><li><a href="//www.orangedefense.net/forums/index.php?">ODN</a></li><li><a href="//ordoparadox.com/top/index.php?act=idx">TOP</a><li><a href="//www.thelastremnants.com/">TLR</a></li><li><a href="//www.fokalliance.com/forum/">FOK!</a></li><li><a href="//www.cnalchemy.com/">Alchemy</a></li><li class="divider"><li><a href="//cybernations.wikia.com/wiki/Main_Page">CN Wiki</a></li><li><a href="//s4.zetaboards.com/CNtel/index/">CNTel</a></li></ul></li><li><a href="//Add_Later">CN Help</a><ul><li><a href="//thecastlehall.no-ip.org/8bit/general/battlecalc.php">Battle Calculator</a></li><li><a href="//www.cybernations.net/search_advanced_trades.asp">Trade Finder</a></li><li><a href="//www.cybernations.net/stats_resource_tool.asp">Trade Resource Tool</a></li><li><a href="//http://www.cn-utilities.com/InfrastructureCalculator.aspx">Infra Calculator</a></li><li class="divider"></li><li><a href="//mushroom-kingdom.info/boards/index.php?topic=16015.0">Vanguard Codex</a></li><li><a href="//mushroom-kingdom.info/boards/index.php?topic=14590.0">War Guide</a></li><li><a href="//mushroom-kingdom.info/boards/index.php?topic=14590.0">Short War Guide</a></li><li class="divider"></li><li><a href="//mushroom-kingdom.info/boards/index.php?topic=18712.0">Nation Guide</a></li><li><a href="//mushroom-kingdom.info/boards/index.php?topic=24874.0">Temp Trade Guide</a></li><li><a href="//mushroom-kingdom.info/boards/index.php?topic=24873.0">Space Wonder Guide</a></li><li><a href="//mushroom-kingdom.info/boards/index.php?topic=29186.0">Space Hotspot Guide</a></li><li class="divider"></li><li><a href="//mushroom-kingdom.info/boards/index.php?topic=4103.0">IRC Guide</a></li></ul><li><a href="//Add_Later">News Feed</a><ul></li></ul></li></div></div>';

//Who the fuck has multiple body tags....
document.body.insertBefore(logo, document.body.firstChild);

//Style the menu items

function addGlobalStyle(css) {
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}



addGlobalStyle(' body { margin-top: 32px; }  #p-cactions { top: 4em;} #p-logo { top: 32px;} .body { margin-top: 40px; } #navbar, #navbar ul {  padding: 0;  margin: 0;  list-style: none; font-size: 9pt; font-family: "Arial",sans-serif; line-height: 14px;} #navbar a:link { text-decoration: none; color: #eee; } #navbar a:hover { text-decoration: none; color: #eee; background-color: #76889c; } #navbar a:visited { text-decoration: none; color: #eee; } #navbar a:active { text-decoration: none; color: #eee; }  #navbar li:hover ul {  display: block; }  #navbar {  top: 0px;  left: 0px;  width: 100%;  height: 30px;  position: fixed;  background-color: #76889c;  z-index: 50; }  #navbar a {  display: block;  padding: 2px 0px; }  #navbar li {  width:250px;  margin: 4px 0px 0px 6px;  border: 2px solid #eee;  float: left;  text-align: center;  font-weight: bold; }  #navbar li ul {  display: none;  position: absolute;  width:200px;  background-color: #76889c;  margin-top: 2px;  margin-left: -2px;  border-left: 2px solid #eee;  border-bottom: 2px solid #eee;  border-right: 2px solid #eee;  z-index: 50; }  #navbar li ul li {  width:200px;  position: relative;  margin: 0px;  border: none;  text-align: left; } #navbar li ul li a {  padding: 2px 4px; }  #navbar li .divider {  border-bottom: 2px solid #eee; }  div.userbar {  top: 28px;  left: 0px;  width: 100%;  padding: 2px 0px;  position: fixed; z-index: 0; } #centernav { width:1300px; margin:0 auto; }');
