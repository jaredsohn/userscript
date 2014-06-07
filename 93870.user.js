// ==UserScript==
// @name		Dawn of the Dragons (DotD) Army adder
// @description         Modified from the LoTS Script by Cruz. M @ http://userscripts.org/scripts/show/91605
// @include		http://www.facebook.com/social_graph.php?node_id=268652830776&*
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

CheckArmyPage();

function CheckArmyPage(){
	$('.actionspro_li').find('a:contains("Send a Message")').each(function(index) {
		playerID = $(this).attr('href').replace(/\D/g,"");
		//GM_log("pID = " + playerID);
		fltLink = '<li class="actionspro_li"><a class="actionspro_a" target="_blank" href="http://apps.facebook.com/dawnofthedragons/addarmy.php?ffbuid=' + playerID + '">Add Army</a></li>';
		$(this).before(fltLink);
	});
};