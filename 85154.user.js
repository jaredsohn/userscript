// ==UserScript==
// @name           Pigskin Empire: Team Page Link
// @namespace      Tyante
// @include        http://beta.pigskinempire.com/proteam.asp?id=*
// @include		   http://beta.pigskinempire.com/team.asp?id=*
// @copyright      2010, Tyante
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        09.01.10
// ==/UserScript==

window.setTimeout( 
	function() {
		main();
	}, 
	100
);

function main() {
	
	var table = document.getElementsByTagName("table")[1];
	var team_img = table.rows[0].cells[0].innerHTML;
	
	var link= window.location.toString();
	
	var pro = link.indexOf("/proteam.asp?id=");
	var index_start = link.indexOf("=");
	var index_end = link.indexOf("&", index_start);
	var index;
	if (index_end < 0) {
		index = link.substring(index_start + 1);
	} else {
		index = link.substring(index_start + 1, index_end);
	}

	var team_link;
	
	if (pro > 0) {
		team_link = "franchise.asp?id=" + index;
	}
	var college = window.location.toString().indexOf("/team.asp?id=");
	if (college > 0) {
		team_link = "school.asp?id=" + index;
	}
	var html = "<a href='" + team_link + "'>" + team_img + "</a>";
	
	table.rows[0].cells[0].innerHTML = html;
}