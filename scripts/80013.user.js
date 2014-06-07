// ==UserScript==
// @name           MoarArmory
// @description    Modifies wowarmory to display additional rows per page
// @include        http://www.wowarmory.com/*
// @match        http://www.wowarmory.com/*
// ==/UserScript==

{
    var ps = document.getElementById("pageSize")
	if (ps) {
		ps.innerHTML = "<option selected value=\"10\">10</option><option value=\"20\">20</option><option value=\"30\">30</option><option value=\"40\">40</option><option value=\"100\">100</option><option value=\"500\">500</option><option value=\"1000\">1000</option>"
	}
}
