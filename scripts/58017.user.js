// ==UserScript==
// @name           EvGeniusTools
// @namespace      www.erepublik.com
// @author         EvGenius
// @version        0.01
// @include        http://www.erepublik.com/en/citizen/profile/*
// ==/UserScript==

function AddCitizenDonationsLink ()
{
	var li = document.createElement ("LI");
	url = location.href.replace (/profile/, "donate/list");
	li.innerHTML = "<a href=\"" + url + "\">Donation list</a>";
	document.getElementById ("user_menu").appendChild (li);
}

window.addEventListener ("load", AddCitizenDonationsLink, false);
