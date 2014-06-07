// ==UserScript==
// @name           MAL MyPanel Mods
// @namespace      MAL Mods
// @description    Makes a 3rd collumn and you can sort the panel by drag and drop. v0.4.2 by Dalon
// @include        http://myanimelist.net/panel.php
// ==/UserScript==

var time = new Date();

// Add jQuery newest version
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Add jQuery UI for sortable plugin
var GM_JQUI = document.createElement('script');
GM_JQUI.src = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js';
GM_JQUI.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQUI);

// Add some CSS to -s###c#rew- alter some stylish stylings
var GM_CSS = document.createElement('style');
GM_CSS.type = 'text/css';
GM_CSS.innerHTML = "#contentHome div.panel-column{width:32%!important; float:left;}";
GM_CSS.innerHTML += " #panel_left1{padding:0 7px 7px 7px; width:33%!important}";
GM_CSS.innerHTML += " #panel_center{min-height: 600px; float: left; padding: 5px; border-width: 0 1px 0 1px; border-color:#EBEBEB; border-style:solid; width:33%!important}";
GM_CSS.innerHTML += " #panel_right1{ float:left; width:33%!important;}";
GM_CSS.innerHTML += " .panelItem{border: none; -moz-border-radius:5px; padding:6px; margin-bottom: 10px;}";
GM_CSS.innerHTML += " .panelItem:hover{border:1px solid blue; padding:5px}";
GM_CSS.innerHTML += " .panelItem .normal_header:hover{cursor:move; background-color:#F6F6F6}";
GM_CSS.innerHTML += " .panelItem .normal_header>div{display:none;}";
GM_CSS.innerHTML += " .panelItem .normal_header>div:hover{display:block;}";
GM_CSS.innerHTML += " .ui-sortable-placeholder{border:1px dotted black; visibility:visible!important; height:300px!important; background:#F6F6F6;} .ui-sortable-placeholder *{visibility:hidden;}";
document.getElementsByTagName('head')[0].appendChild(GM_CSS);

// early jquery load using the Jquery MAL has loaded
JQ_init();

// Check if (newest) jQuery's loaded (for drag and drop)
function GM_wait() {
		if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
		else if(unsafeWindow.jQuery.fn.jquery != "1.4.1"){ window.setTimeout(GM_wait,100); }
		else if(unsafeWindow.jQuery.ui.version != "1.7.2"){ window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; JQ14_init(); }
	}
	
GM_wait();

// when jQuery is loaded do this
function JQ_init(){
	$ = unsafeWindow.jQuery;
	
	// first of all, let's fix some things so we get a nice structure
	panel_bugfixes();
	
	// lets add the 3rd collumn and make all other collums ready
	third_collumn();
	
	// create the panelitems for sorting
	create_panelitems();
	
	// look if there are already settings for a custom panel
	get_panelcookie();
	
	re_mal_fix();
}

function JQ14_init(){
	// add functionality to make the panelitems sortable
	sortable_panelitems();
}

function panel_bugfixes(){
	// some jquery stuff first
	$.fn.orphans = function(){var ret = []; this.each(function(){$.each(this.childNodes, function() {if	(this.nodeType == 3) ret.push(this)})});return $(ret);}
	$.fn.unwrap = function() {return this.each(function(){$(this).parent().replaceWith( this );});};
	
	// remove that retarded container
	$(".container").replaceWith($(".container").html());
	
	// make things consistent
	$("#contentHome h2").replaceWith("<div class='normal_header'>" + $("#contentHome h2").text() + "</div>");
	$("#contentHome .normal_header span").replaceWith("<div style='float: right; display: none;'>" + $("#contentHome .normal_header span").html() + "</div>");
	$("#contentHome>br").remove();
	// and make a node of the birthday message
	$("#panel_left, #panel_right").orphans().each(function(){
		if($(this).text() == "No friend birthdays are upcoming.")$(this).wrap("<p></p>");
	});
}

function third_collumn(){
	$("#panel_left").after("<div id='panel_center'></div>");
	$("#panel_left, #panel_center, #panel_right").addClass("panel-column");
}

function create_panelitems(){
	
	$("#contentHome .normal_header").each(function(){
		
		var item = $(this).next();
		var siblings = new Array();
		var i = 0;
		while( !$(item).hasClass("normal_header")){
			if($(item).attr("class") != "adHome300")
				siblings.push(item);
			item = item.next();
			//if(item.length) break;
			i++;
			if(i>50) break;
		}
		
		$(this).wrap("<div class='panelItem'></div>");
		var panel = $(this).parent();
		$(siblings).appendTo(panel); 
		
		$(this).filter(':contains(Latest Reviews)').parent().attr("id","latestRef");
		$(this).filter(':contains(My Recently Active Clubs)').parent().attr("id","recentClubs");
		$(this).filter(':contains(My Watched Topics)').parent().attr("id","watchedTopics");
		$(this).filter(':contains(MyAnimeList Announcements)').parent().attr("id","malAnnounce");
		$(this).filter(':contains(News)').parent().attr("id","malNews");
		$(this).filter(':contains(My Statistics)').parent().attr("id","myStats");
		$(this).filter(':contains(My Last List Updates)').parent().attr("id","listUpdates");
		$(this).filter(':contains(Recent Friend Updates)').parent().attr("id","friendUpdates");
		$(this).filter(':contains(Latest Recommendations)').parent().attr("id","lastRecs");
		$(this).filter(':contains(Upcoming Friend Birthdays)').parent().attr("id","friendBirthdays");
	});
}

function sortable_panelitems(){
	
	$(".panelItem .normal_header>div", this).addClass("ui-widget ui-widget-content ui-helper-clearfix ui-corner-all");
	$(".panel-column").sortable({connectWith: '.panel-column', stop: function(){set_panelcookie();}});
	$(".column").disableSelection();
}

function set_panelcookie(){
	
	var left_panel = [];
	$("#panel_left1 .panelItem").each(function(){
		left_panel.push($(this).attr("id"));
	});
	window.localStorage.setItem("malPanelMod_left", left_panel);
	
	var center_panel = [];
	$("#panel_center .panelItem").each(function(){
		center_panel.push($(this).attr("id"));
	});
	window.localStorage.setItem("malPanelMod_center", center_panel);
	
	var right_panel = [];
	$("#panel_right1 .panelItem").each(function(){
		right_panel.push($(this).attr("id"));
	});
	window.localStorage.setItem("malPanelMod_right", right_panel);
	
}

function get_panelcookie(){
	if(window.localStorage.getItem("malPanelMod_left") && window.localStorage.getItem("malPanelMod_center") && window.localStorage.getItem("malPanelMod_right")){
		
		var left = window.localStorage.getItem("malPanelMod_left").split(",");
		for(var i=0;i < left.length;i++)
			$("#"+left[i]).appendTo("#panel_left");
		
		var center = window.localStorage.getItem("malPanelMod_center").split(",");
		for(var i=0;i < center.length;i++)
			$("#"+center[i]).appendTo("#panel_center");
		
		var right = window.localStorage.getItem("malPanelMod_right").split(",");
		for(var i=0;i < right.length;i++)
			$("#"+right[i]).appendTo("#panel_right");
	}
}

function re_mal_fix(){
	$("#panel_left").attr("id", "panel_left1");
	$("#panel_right").attr("id", "panel_right1");
}