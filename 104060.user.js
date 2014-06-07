// ==UserScript==
// @name           Pigskin Empire: Offers/Commits/Visits Totals
// @namespace      OCV
// @include        http://pigskinempire.com/team.aspx?id=*&v=O
// @include 	   http://pigskinempire.com/team.aspx?id=*&v=C
// @include		   http://pigskinempire.com/team.aspx?id=*&v=V
// @version        6.2.11
// ==/UserScript==



window.setTimeout( function() {
	main();
}, 100);


function main()
{
	var tab = document.getElementsByTagName("table")[8];
	var title = document.getElementsByTagName("h2")[0];
	var string = title.innerHTML;
	string += " Total: " + (tab.rows.length - 1);
	title.innerHTML = string;
	
	
}
