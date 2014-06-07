// ==UserScript==
// @name            GLB Team Links & Eq Fund Link Mod v1.0
// @description	    Mod script to add equipment fund link for owners
// @include         http://goallineblitz.com/game/home.pl
// ==/UserScript==

function teamlinks() {
modhtml(window.document,document.getElementById('teams'),/<div class="team_name"><a href="\/game\/team\.pl\?team_id=(\d*)">(.*)<\/a><\/div>/gi,'<div class="team_name"><a href="/game/team.pl?team_id=$1">$2</a><span style="font-weight:normal; font-size:12px;">&nbsp;(<a href="/game/forum_thread_list.pl?team_id=$1">Forum</a>)<br /><a href="/game/roster.pl?team_id=$1">Roster</a>&nbsp;|&nbsp;<a href="/game/depth_chart.pl?team_id=$1">Depth</a>&nbsp;|&nbsp;<a href="/game/team_player_stats.pl?team_id=$1">Leaders</a>&nbsp;|&nbsp;<a href="/game/stadium.pl?team_id=$1">Stadium</a>&nbsp;|&nbsp;<a href="/game/team_gm.pl?team_id=$1">GMs</a>&nbsp;|&nbsp;<a href="/game/team_loan.pl?team_id=$1">Loan</a>&nbsp;|&nbsp;<a href="/game/team_item_fund.pl?team_id=$1">Fund</a>&nbsp;|&nbsp;<a href="/game/team_offers.pl?team_id=$1">Offers</a>&nbsp;|&nbsp;<a href="/game/team_tactics.pl?team_id=$1">Tactics</a></span></div>',null);
modhtml(window.document,document.getElementById('gm_teams'),/<div class="team_name"><a href="\/game\/team\.pl\?team_id=(\d*)">(.*)<\/a><\/div>/gi,'<div class="team_name"><a href="/game/team.pl?team_id=$1">$2</a><span style="font-weight:normal; font-size:12px;">&nbsp;(<a href="/game/forum_thread_list.pl?team_id=$1">Forum</a>)<br /><a href="/game/roster.pl?team_id=$1">Roster</a>&nbsp;|&nbsp;<a href="/game/depth_chart.pl?team_id=$1">Depth</a>&nbsp;|&nbsp;<a href="/game/team_player_stats.pl?team_id=$1">Leaders</a>&nbsp;|&nbsp;<a href="/game/stadium.pl?team_id=$1">Stadium</a>&nbsp;|&nbsp;<a href="/game/team_gm.pl?team_id=$1">GMs</a>&nbsp;|&nbsp;<a href="/game/team_loan.pl?team_id=$1">Loan</a>&nbsp;|&nbsp;<a href="/game/team_offers.pl?team_id=$1">Offers</a>&nbsp;|&nbsp;<a href="/game/team_tactics.pl?team_id=$1">Tactics</a></span></div>',null);
};
window.addEventListener("load", function() { teamlinks() }, false);

function modhtml(doc, element, m, r) {
    m = new RegExp(m);
    if (element.innerHTML) {
element.innerHTML = element.innerHTML.replace(m, r);
    };
};