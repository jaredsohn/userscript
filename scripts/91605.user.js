// ==UserScript==
// @name		LoTS Fleet adder
// @include		http://www.facebook.com/social_graph.php?node_id=149755978384927&*
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

CheckArmyPage();

function CheckArmyPage(){
	$('.actionspro_li').find('a:contains("Send a Message")').each(function(index) {
		playerID = $(this).attr('href').replace(/\D/g,"");
		//GM_log("pID = " + playerID);
		fltLink = '<li class="actionspro_li"><a class="actionspro_a" target="_blank" href="http://apps.facebook.com/legacythousandsuns/addfleet.php?ffbuid=' + playerID + '">Add Fleet</a></li>';
		$(this).before(fltLink);
	});
};