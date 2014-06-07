// ==UserScript==
// @name        youtube redesign
// @namespace   None
// @include     http://www.youtube.com/*
// @include     *youtube.com/*
// @include     http://www.youtube.de/*
// @include     *youtube.de/*
// @version     1.3
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js
// @grant       none
// ==/UserScript==

jQuery.fn.style = function()
{
    var args = arguments || {};
	if(args == null || args.length == 0)
		return;

	var map = {};
	// For string,string arguments
	if(typeof args[0] == 'string' && typeof args[1] == 'string')
	{
		map[args[0]] = args[1];
	}
	//For map arguments
	else if(args.length == 1 && typeof args[0] == 'object')
	{
		map = args[0];
	}else
	{
		return;
	}
	
	var obj = this;

	$.each(map, function(name, value){
		var style = obj.attr("style") != undefined ? obj.attr("style") + ";" : "";
		obj.attr("style", style+name + ":"+value);
	});
}

$.fn.exists = function () {
    return this.length !== 0;
}

var yt = 
{
	page: null,
	ad: null,
	masthead: null,
	player: null,
	mastheadSubnav: null,
	baseDiv: null,
	mainlink: 'http://www.youtube.com/feed/subscriptions'
};

yt.init = function()
{
	this.player = $("#watch7-player");
	this.page = $("#page");
	this.ad = $("#header");
	this.masthead = $("#yt-masthead");
	this.mastheadSubnav=$("#masthead-subnav");
	this.baseDiv= $("#baseDiv");
		
	if(this.page.hasClass("home"))
		this.mainStylen();
	else
		this.defStylen();
		
	$("#logo-container").attr("href",this.mainlink);
}

yt.mainStylen = function()
{
	this.masthead.style({
		"margin":"0 auto !important",
		"width":"1003px !important"
	})
		
	this.ad.remove();
					
	this.page.style({
		"margin": "-20px auto !important",
		"box-shadow":"0 0 5px 1px grey"
	});
}

yt.defStylen = function()
{
	this.masthead.style({
		"margin":"0 auto !important",
		"width":"1003px !important"
	})
	
	this.page.style({
		"margin": "15px auto !important",
		"width":"1003px !important"
	});

	if(this.mastheadSubnav.exists())
		this.mastheadSubnav.style({
			"margin":"0 auto !important",
			"width":"1003px !important"
		});
	
	if(this.baseDiv.exists())
		this.baseDiv.style({
			"margin":"15px auto !important",
			"width":"1003px !important"
		});
	
	this.player.css("width", "100% !important");
}

yt.init();