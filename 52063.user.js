// ==UserScript==
// @name           ToggleTopTopics
// @namespace      wort wort wort
// @description    This script will allow you to toggle top topics section to collapse or expand the content in the box area. Single click to expand and double click to collapse.
// @include        http://*bungie.net/fanclub/*/Forums*
// @include        http://*bungie.net/Forums/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

	function Initialize()
{
    var IsToggled = GM_getValue("IsToggled", false);
    $("div ul li h3:contains('Top Forum')").click(function() { 
	GM_setValue("IsToggled", !$(this).parents("div.boxA").children("table").is(":hidden")); 
	$(this).parents("div.boxA").children("table").slideToggle("slow"); });
    if (IsToggled)
    {
        $("table.pinned_topic_grid").slideUp("slow");
    }
    unsafeWindow.jQuery = jQuery;
}

Initialize();
 
       

	//I'M ON A DOPLPHIN DOIN FLIPS AND SHIT
	//Props to iggy to looking at it a furxing it.