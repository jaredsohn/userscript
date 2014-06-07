// ==UserScript==
// @name          TotalConnections
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include       http://bigipadmin.int.westgroup.com/cgi-bin/bigipadmin/poolinfo.pl?bigip=bigipprema--bigippremb--&poolname=LAWSCHOOL-80&vipurl=lawschool.westlaw.com&port=80&viplist=167.68.7.81--167.68.6.81
// ==/UserScript==

function main() {
	var total = 0;
	$.each($("a"),function() {
		total += parseInt($(this).text());
	});
	$(body).append("<div>Total Connections: " + total + "</div>);
}
main();