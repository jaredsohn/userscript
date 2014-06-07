// ==UserScript==
// @name           GameOne Max
// @namespace      www.gameone.de
// @include        *gameone.de/tv/*
// @include        *gameone.de/blog/*
// @version        1.2.3
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js
// ==/UserScript==

var $ = unsafeWindow.jQuery;

video = 
{
	maxWidth: 900,
	width: 566,
	height: 424,
	maxHeight: 600,
	name : "videos",
	_max : false
}

video.css = function()
{
	var css = ".button { "+
	"background:-moz-linear-gradient(top, #000, #333);"+
	"background:-webkit-linear-gradient(top, #000, #333);"+
	"background:-o-linear-gradient(top, #000, #333);"+
	"background:-ms-linear-gradient(top, #000, #333);"+
	"background:linear-gradient(top, #000, #333);"+
	"color:grey;"+
	"border:1px solid darkgrey;"+
	"border-top-width:0px;"+
	"border-radius:0px 0px 10px 10px;"+
	"margin:0px;"+
	"padding:0px 10px 0px 10px;"+
	"position:relative;"+
	"top:-4px;}"+
	".button:hover{color:white;}";
	var style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = css;
	document.body.appendChild(style);
}

video.hideSide = function()
{
	var side = document.getElementsByClassName('sidebar col')[0];
	if(side != null)
		side.setAttribute("style","display: none;");
	
	side = document.getElementsByClassName('sidebar')[0];
	if(side != null)
		side.setAttribute("style","display: none;");
}

video.checkAllMax = function()
{
	var players = document.getElementsByName('embeddedPlayer');
	
	var unhide = true;
	for each (var player in players)
	{
		if(player.width == video.maxWidth)
		{
			unhide = false;
			break;
		}
	}
	if(unhide)
	{
		video.unhideSide();
	}
	else
	{
		video.hideSide();
	}
}

video.unhideSide = function()
{
	var side = document.getElementsByClassName('sidebar col')[0];
	if(side != null)
		side.setAttribute("style","");
	
	side = document.getElementsByClassName('sidebar')[0];
	if(side != null)
		side.setAttribute("style","");
}

video.max = function(evt)
{
	var button = evt.target;
	var div = button.parentNode;
	var player = div.firstChild;
	if(player.getAttribute('width') < video.maxWidth){
		
		player.setAttribute('width', video.maxWidth);
		player.setAttribute('height',video.maxHeight);
		this.hideSide();
		this._max = true;
		button.innerHTML = "Min";
	}
	else
	{
		player.setAttribute('width', video.width);
		player.setAttribute('height',video.height);
		this._max = false;
		button.innerHTML = "Max";
		video.checkAllMax();
	}
}

video.addButton = function()
{
	var players = document.getElementsByName('embeddedPlayer');
	
	for each (var player in players){
		var div = player.parentNode;

		if(div != null)
		{
			var button = document.createElement('button');
			button.setAttribute('value', 'Max');
			button.setAttribute("class","button");
			button.innerHTML = "Max";
			button.addEventListener('click',  function (evt) {video.max(evt);}, false);
			player.setAttribute("style", "border:1px solid darkgray;");
			div.appendChild(button);
		}
	}
}

video.init = function()
{
	this.addButton();
	this.css();
}

com = {
	button: null
};

com.css = function()
{
	var css = ".button2 { "+
	"background:-moz-linear-gradient(top, #000, #333);"+
	"background:-webkit-linear-gradient(top, #000, #333);"+
	"background:-o-linear-gradient(top, #000, #333);"+
	"background:-ms-linear-gradient(top, #000, #333);"+
	"background:linear-gradient(top, #000, #333);"+
	"color:grey;"+
	"border:1px solid darkgrey;"+
	"border-radius:2px 2px 2px 2px;"+
	"margin-left:60px;"+
	"padding:0px 10px 0px 10px;"+
	"position:relative;"+
	"top:-1px;}"+
	".button2:hover{color:white;}";
	var style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = css;
	document.body.appendChild(style);
}

com.loadAll = function(evt)
{
	var length = $(".comments_pagination.pagination.pagination_top").children().length;
	var src = $(".comments_pagination.pagination.pagination_top").children()[length-2];
	var num = src.innerHTML;
	
	$(".comments_pagination.pagination.pagination_top").remove();
		
	for(var i = 1; i<=num; i++ )
	{
		var div = document.createElement("div");
		div.id = "comments_list" + i;
		
		$("#comments_wrapper").append(div);
		var load = src.href.replace(/page=\d+/g,'page='+i);
		$("#comments_list" + i).load(load + " #comments_list");
	}
}

com.addButton = function()
{
	button = document.createElement('button');
	button.innerHTML = 'Lade Alle Kommentare';
	button.setAttribute("class","button2");
	button.addEventListener('click',  function (evt) {com.loadAll(evt);this.button.enabled="false"}, false);
	
	$("#comments").append(button);
}

com.init = function()
{
	this.addButton();
	this.css();
}

com.init();
video.init();
