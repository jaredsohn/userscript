// ==UserScript==
// @name           CD Center Links
// @namespace      http://senior.cyberdunk.com/194956
// @include        http://senior.cyberdunk.com/home.php
// ==/UserScript==

var buttons = document.createElement("div");
buttons.innerHTML = '<tr><center><font class="white_10">Other Centers</div></center></tr><tr><center><div class="gradient2"><font class="white_10"><td><a href="team.php?m=match_center">Match</a></td><td> | </td><td><a href="team.php?m=cash_center">Cash</a></td><td> | </td><td><a href="team.php?m=skill_center">Skill</a></td><td> | </td><td><a href="team.php?m=contract_center">Contract</a></td><td> | </td><td><a href="team.php?m=boost_center">Boost</a></td><td> | </td><td><a href="team.php?m=ranking_center">Ranking</a></div>';

var navbar;
navbar = document.getElementsByTagName('div');
if (navbar) {
    navbar[19].parentNode.insertBefore(buttons, navbar[19].nextSibling);
}