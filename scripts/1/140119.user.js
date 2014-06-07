// ==UserScript==
// @name        Neopets: NFs
// @namespace   userscripts.org
// @description Creates a textbox with list of current neofriends (for ticketing purposes)
// @include     http://www.neopets.com/neofriends.phtml*
// @require	http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

var neofriends = [];

$("tbody:contains('Gender'):last tr:contains('VIP'):gt(0)").find('td:eq(1)').each(function(){
	var current = $(this).text();
	neofriends.push(current);
});

$("table:contains('Gender'):last").after("<center><br><br><textarea id='txtarea'>" + neofriends + "</textarea></center>");
$("#txtarea").css("display","block","margin-left","auto","margin-right","auto");