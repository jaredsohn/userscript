// ==UserScript==
// @name           QuestMenu
// @namespace      Jacko and Toni
// @include        *subeta.net/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

function questsleft(url) {
	var times = 0;
	jQuery.get(url, function(ret) {
		if (jQuery("center:contains('You have already played the maximum')").length > 0) {
			times = 0;
		} else {
			times = 1;
		}
	});
	return times;
}

quest_menu = (<><![CDATA[
	<li class='menu-btn' id='menu-btn-quest-css'>
		<a href='/explore/' class='menu-tab item' role='menuitem' aria-haspopup='true'>
		<span class='menu-btn-left'>&nbsp;</span>quests<span class='menu-btn-right'>&nbsp;</span></a>
		<ul role='menu'>
			<li><a href='/explore/saggitarius.php'>Saggitarius</a></li>
			<li><a href='/explore/opp.php'>Cursed</a></li>
			<li><a href='/explore/wizard_quests.php'>Wizard</a></li>
			<li><a href='/explore/maleria.php'>Maleria</a></li>
			<li><a href='/explore/quest_computer.php'>Computer Geek</a></li>
			<li><a href='/games/gravequests.php'>Graveyard</a></li>
			<li class='bottom'><a href='/games/library.php'>Library</a></li>
		</ul>
	</li>
]]></>).toString ();
jQuery("#menu-ul").append(quest_menu);
jQuery("#menu-ul #menu-btn-quest-css li a").each(function() {
	console.log(jQuery(this).attr("href"));
	count = questsleft("http://subeta.net/"+jQuery(this).attr("href"));
	jQuery(this).append(" ("+count+")");
});
