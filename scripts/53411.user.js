// ==UserScript==
// @name           PL
// @namespace      pl
// @description    Gestaltet das Forum so um, dass es wieder ein wenig an das alte Layout erinnert und optimiert es vor allem für kleinere Auflösungen.
// @include        http://www.planet-liebe.de/*
// ==/UserScript==

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait,100);
	} else {
		jQuery = unsafeWindow.jQuery;
		letsJQuery();
	}
}
GM_wait();

// All your GM code must be inside this function

function letsJQuery() {
	hideMenu();
	jQuery("#page-border").css("margin","0 15px 0 50px");
	jQuery("#navigation").css("z-index","10").css("background-color","#5D565D");
	jQuery(".navigation_button_left").css("background-color","#5D565D");
	jQuery("#vertical_navigation_1_0").css("background-color","#5D565D");
	

	jQuery('#impressum').css("top","5px").css("z-index","100");
	jQuery('#info').css("top","5px").css("z-index","100");
	jQuery('#notfall').css("top","5px").css("z-index","100");
	jQuery('#logo').css("top","0px").css("z-index","10").css("height","128px");
	jQuery('#breadcrumb').css("z-index","20");
	jQuery("img[src='/forum/images/template/logo.png']").css("top","-15px").css("position","absolute");
	jQuery("img[src='http://www.planet-liebe.de/forum/images/misc/no_avatar.gif']").remove();
	var posts = jQuery(".tborder_post");
	jQuery(".userinfo_block").css("background-color","#eeeeee");
	posts.each(
		function(intIndex){
			var current = jQuery(this);
			var left = current.find(".avatar_block");
			var usercellmiddle = current.find(".user_cell_middle");
			var usercellright = current.find(".user_cell_right");
			left.css("background-color","#eeeeee").css("padding","10px").css("min-width","110px"); //#cfdcde
			current.find(".user_cell_left").remove().children().appendTo(left);
			var span = jQuery("<span></span>");
			var postBlock = current.find(".postcount_block").remove();
			span.text("#" + postBlock.text());
			usercellmiddle.find("div").prepend(span);
			usercellright.children().appendTo(left).css("width","80px").css("padding-top","5px");
			usercellright.css("padding","0px");
			usercellmiddle.css("padding","0px");
			current.find(".textbuttons").children().appendTo(usercellright);
			current.css("background-color","#cfdcde");
			left.children().css("width","110px");
		}
	)
}

function unhideMenu(e){
		var target = jQuery(e.target);
		var navigation = target.parent();
		navigation.children().css("display","");
		navigation.css("height","");
		navigation.css("width","");
		target.remove();
		var hider = jQuery("<div id='hider' class='navigation_button_right'>««</div>").prependTo(navigation);
		hider.click(hideMenu);
}

function hideMenu(e){
	if (e != null){
		var target = jQuery(e.target);
		target.remove();
	}
	var navigation = jQuery('#navigation');
	navigation.css("width","40px");
	navigation.css("height","40px");
	navigation.children().css("display","none");
	var unhider = jQuery("<div id='unhider' class='navigation_button_right'>»»</div>").appendTo(navigation);
	unhider.click(unhideMenu);
}


