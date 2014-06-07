// ==UserScript==
// @name        Neopets - Jelly World board
// @namespace   NPjellyworldboard
// @include     *neopets.com/neoboards*
// @version     1
// @grant       none
// @require	http://www.zoidberg25.com/jquery-1.11.0.min.js
// ==/UserScript==

url = $(location).attr('href');

if (url.contains("create_topic.phtml?board=18")) {
	$("select[name=\"board_id\"] > option[value=\"35\"]").before("<option selected=\"\" value=\"18\">Jelly World</option>");
} else if (url.contains("create_topic.phtml?board=")) {
	$("select[name=\"board_id\"] > option[value=\"35\"]").before("<option value=\"18\">Jelly World</option>");
}


if (url.contains("neoboards/index.phtml")) {
$("a.indexTitle[href*=\"boardlist.phtml?board=35\"]").parent().parent().before("<tr><td width=\"60\" align=\"left\" style=\"border-top: 1px solid black;\"><a href=\"boardlist.phtml?board=18\"><img width=\"50\" height=\"50\" border=\"0\" alt=\"\" src=\"http://images.neopets.com/neoboards/boardIcons/jelly.png\"></a></td><td align=\"left\" style=\"border-top: 1px solid black;\" class=\"medText\"><a class=\"indexTitle\" href=\"boardlist.phtml?board=18\"><strong><span class=\"pointer\">»</span> Jelly World</strong></a><br>Jelly World? That's just a myth. It doesn't exist.</td></tr>");
}