// ==UserScript==
// @name           Youtube Tools
// @namespace      Image
// @description    Some tools for Youtube
// @include        *youtube.com/watch?*
// @version        1.3.2
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js
// ==/UserScript==

maxButton =
{
	player: $("#player-api"),
	layer: $("<div>"),

	headline: $("#page"),
	button: $("#search-btn"),
	
	height: 85,
	width: 73.33,
	left: 13.33,

	_max: false
}

maxButton.max = function(evt)
{
	var video = $("#movie_player");
	video.css("position", "absolute")
				.css("zIndex", "1000")
				.css("minHeight", this.height+"%")
				.css("minWidth", this.width+"%")
				.css("left", this.left+"%")
				.css("top", "60px");

	this.button.html("<span>Exit</span>")
				.css("z-index", "1001");
				
	video.detach();
	$("body").prepend(video);	

	
	this.layer.css("display", "block");
	
	this._max = true;
}

maxButton.norm = function(evt)
{
	var video = $("#movie_player");
	video.css("position", "relative")
				.css("z-index", "")
				.css("minHeight", "")
				.css("minWidth","")
				.css("left", "")
				.css("top", "");
	
	this.button.html("<span>Watch</span>")
				.css("z-index", "0")
				.css("float", "clear");
		
	video.detach();
	this.player.append(video);
	
	this._max = false;
	this.layer.css("display", "none");
}

maxButton.toggle = function(evt)
{
	if(!this._max)
		this.max(evt);
	else
		this.norm(evt);
}

maxButton.add = function()
{
	this.button = this.button.clone();
	
	this.button.attr("id", "watchButton")
				.html("Watch")
				.bind('click',  function (evt) {maxButton.toggle(evt);})
				.css("width", "60px")
				.css("height", "24px")
				.css("position", "absolute");

	
	var other = this.headline.first().next().first().next();
	other.css("top", "38px");
	
	this.headline.prepend(this.button);
	
	this.layer.attr("id", "shadow")
				.css("position", "absolute")
				.css("top", "0")
				.css("left", "0")
				.css("width", "100%")
				.css("height", "100%")
				.css("zIndex", "999")
				.css("backgroundColor", "black")
				.css("opacity", "0.9")
				.css("display", "none")
	$("body").append(this.layer);
}

maxButton.css = function()
{
	var cssString = ".guide-module-toggle-icon { "+
	"top: 0;"+
	"left:140px;}";
	
	var css = $("<style>");
	css.attr("type", "text/css")
		.html(cssString);
	$("body").append(css);
}

maxButton.init = function()
{
	if(this.player == null)
		this.player= $("#player-api-legacy")
	
	this.add();
	this.css();
}

searchTab =
{
	search: $("#search-btn")
}

searchTab.add = function(){
	var search = this.search;
	search.attr("onclick", "document.getElementById('masthead-search').target=\"\";"+search.attr("onclick"));

	var button = search.clone(false);
	button.html("Tab")
			.css("padding", "0 4px 0 4px")
			.bind('click',  function (evt) {$(this).parent().attr("target", "_blank");});

	$("#masthead-search").prepend(button);
}

searchTab.init = function()
{
	if(this.search != null)
		this.add();
}

	
$(document).ready(function (){
	searchTab.init();
	maxButton.init();
	
	var logo = $("#logo-container");
	if(logo != null)
		logo.attr("href","/feed/subscriptions");
		
	yt_settings.init();
});

yt_settings = {
	keep_big : false,
	check_keep_big : $("<input>").prop("type","checkbox").prop("name","keep_big").prop("checked",false)
}

yt_settings.init = function(){
	this.keep_big = GM_getValue("keep_big");

	this.add();
	this.check();
}

yt_settings.check = function(){
	if(this.keep_big){
		this.check_keep_big.prop("checked",this.keep_big);
		maxButton.max();
	}
}

yt_settings.add = function(){
	this.check_keep_big.prop("title", "Save watching in big mode.");

	this.check_keep_big.change(function (evt) {
											GM_setValue("keep_big", this.checked);
											$(this).keep_big = this.checked;
											if(this.checked){
												maxButton.max();
											}else{
												maxButton.norm();
											}
										});
							
	var box = $("<div>").append(this.check_keep_big);
	
	box.css("borderRadius", "0 2px 2px 0").
		css("borderStyle", "solid").
		css("borderWidth", "1px 1px 1px 0").
		css("height", "20px").
		css("left", "59px").
		css("padding", "2px 2px 0 2px").
		css("position", "absolute").
		css("width", "20px").
		css("z-index", "1001");
		
		box.addClass("yt-uix-button-default yt-uix-button");
							
	maxButton.button.after(box);
}