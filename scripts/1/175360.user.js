// ==UserScript==
// @name        Filter Twitter Stream
// @namespace   filtertwitterstream
// @description A simple filter for twitter. Adds a filter box next to search, saves filtered keywords in a cookie and has options to filter out replies and hashtags.
// @include     https://twitter.com/*
// @include     http://twitter.com/*
// @author      drunkfoo   
// @version     2.1
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==


$(function() {
//Html CSS
var basiccss =".clearboth{clear:both;}#filter-twitter-keyword-box ul{margin-bottom:10px;}#filter-twitter-keyword-box a{color:#1E80E8;}#filter-twitter-keyword-box{display:none; background-color:#FFFFFF; -moz-border-radius: 8px;border-radius: 8px;}#filter-twitter-keywordlist a{display:block; float:right;padding-right:5px;}.topbar{border:none!important; box-shadow:none!important;}.js-topbar{border:none!important;}.bird-topbar-etched{display:none!important;}#filter-twitter-box{font-size:12px;position:relative;top:8px;width:130px;float: right;z-index: 9999;}#filter-twitter-input:focus{background-color:#FFF;}#filter-twitter-input {font-size:12px;width:100px;color:#707070; background-color: #D7D7D7;-webkit-border-radius: 25px; -moz-border-radius: 25px; border-radius: 25px;}#twitter-filter-btn{width:20px;position:relative;top:-22px;right:-100px;font-size:10px; border-left:0px solid #999999;cursor: pointer;}";
var switchcss ='.onoffswitch { position: relative; width: 56px; -webkit-user-select:none; -moz-user-select:none; -ms-user-select: none; } .onoffswitch-checkbox { display: none; } .onoffswitch-label { display: block; overflow: hidden; cursor: pointer; border: 2px solid #C7C7C7; border-radius: 8px;} .onoffswitch-inner { width: 200%; margin-left: -100%; -moz-transition: margin 0.3s ease-in 0s; -webkit-transition: margin 0.3s ease-in 0s; -o-transition: margin 0.3s ease-in 0s; transition: margin 0.3s ease-in 0s; } .onoffswitch-inner:before, .onoffswitch-inner:after { float: left; width: 50%; height: 20px; padding: 0; line-height: 20px; font-size: 10px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; } .onoffswitch-inner:before { content: "ON"; padding-left: 5px; background-color: #EEEEEE; color: #757575; } .onoffswitch-inner:after { content: "OFF"; padding-right: 5px; background-color: #EEEEEE; color: #999999; text-align: right; } .onoffswitch-switch { width: 5px; margin: 7.5px; background: #A1A1A1; border: 2px solid #C7C7C7; border-radius: 8px; position: absolute; top: 0; bottom: 0; right: 32px; -moz-transition: all 0.3s ease-in 0s; -webkit-transition: all 0.3s ease-in 0s; -o-transition: all 0.3s ease-in 0s; transition: all 0.3s ease-in 0s; } .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner { margin-left: 0; } .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch { right: 0px; background-color: #1E80E8; } ';
var extracss='.r-ftb{float:right; margin-right:8px;} .l-ftb{width:55px;  float:left;  text-align:right;} .l-ftb label{ color:#888; font-size:12px !important;}';
var switchhtml='<div><div class="l-ftb"><label for="filterSwitch">Filter</label></div><div class="r-ftb"><div class="onoffswitch"><input type="checkbox"name="onoffswitch"class="onoffswitch-checkbox"id="filterSwitch"checked><label class="onoffswitch-label"for="filterSwitch"><div class="onoffswitch-inner"></div><div class="onoffswitch-switch"></div></label></div></div><div class="clearboth"></div></div>';
var switchhtml2='<div><div class="l-ftb"><label for="repliesSwitch">Replies</label></div><div class="r-ftb"><div class="onoffswitch"><input type="checkbox"name="onoffswitch"class="onoffswitch-checkbox"id="repliesSwitch"><label class="onoffswitch-label"for="repliesSwitch"><div class="onoffswitch-inner"></div><div class="onoffswitch-switch"></div></label></div></div><div class="clearboth"></div></div>';
var switchhtml3='<div><div class="l-ftb"><label for="hashtagSwitch">Hashtags</label></div><div class="r-ftb"><div class="onoffswitch"><input type="checkbox"name="onoffswitch"class="onoffswitch-checkbox"id="hashtagSwitch"><label class="onoffswitch-label"for="hashtagSwitch"><div class="onoffswitch-inner"></div><div class="onoffswitch-switch"></div></label></div></div><div class="clearboth"></div></div>';

$( '<style type="text/css">'+ basiccss + switchcss + extracss +'</style><div id="filter-twitter-box" class=""><input id="filter-twitter-input" type="text" data-provide="typeahead" value="" placeholder="Filter" /><div id="twitter-filter-btn" class="" title="Add Word">+</div><div id="filter-twitter-keyword-box"><ul id="filter-twitter-keywordlist"></ul>'+ switchhtml + switchhtml2 + switchhtml3+'</div>' ).appendTo( ".container" );


var cookieDays = 99999;
var filterKeywordArray = [];
var filterTimer;


//interval
function filterTimerStop() { 
  clearInterval(filterTimer);
}
function filterTimerStart() { 
  filterTimer = setInterval(filterTweets, 100);
}



//refresh ahhh - show box
function showKeywordList() {
	

	var html = "";
	$.each(filterKeywordArray, function (index, filterKeyword) {
		html += '<li><span>' + filterKeyword + '</span><a class="filter-twitter-keywordlist-item" data-id="'+index+'" href="#">X</a></li>';

	});
	$("#filter-twitter-keywordlist").html(html);

	$("#filter-twitter-keyword-box").show();
	
	//extra check just in case
	var filterKeywordCookie = JSON.parse(readCookie('filtertwitterstream'));
	if (filterKeywordCookie != null) {
		filterKeywordArray = filterKeywordCookie;

	}
	
}

 $('#filter-twitter-input').change(function () {

 	//future stuff maybe, drunk
 }).blur(function () {
 	
   //future stuff maybe
 }).focus(function () {
 showKeywordList();
	
 	this.value = "";
 });

//hide keyword box 
$(document).mouseup(function (e)
{
    var keyworddropdown = $("#filter-twitter-box");

    if (!keyworddropdown.is(e.target) && keyworddropdown.has(e.target).length === 0) 
    {
       $("#filter-twitter-keyword-box").hide();
    }
}); 

//switches check
//
var filterSwitchSettings = JSON.parse(readCookie('filtertwitterstream_onoff'));

function loadSettings() {
//var filterOn =false;
	if (filterSwitchSettings == null || filterSwitchSettings.length == 0) {
		filterSwitchSettings = {
			"filter" : "on",
			"replies" : "off",
			"hashtags" : "off"
		};
		createCookie('filtertwitterstream_onoff', JSON.stringify(filterSwitchSettings), cookieDays);
		filterTimerStart();
	} else {

		
		
		if (filterSwitchSettings.replies == "on") {
			$('#repliesSwitch').attr('checked', true);
			filterSwitchSettings.filter = "on";
		} else {
			$('#repliesSwitch').attr('checked', false);
		}
		
		if (filterSwitchSettings.hashtags == "on") {
			$('#hashtagSwitch').attr('checked', true);
			filterSwitchSettings.filter = "on";
		} else {
			$('#hashtagSwitch').attr('checked', false);
		}
		
	    if (filterSwitchSettings.filter == "on") {
			$('#filterSwitch').attr('checked', true);
			filterTimerStart();
			
		} else {
			$('#filterSwitch').attr('checked', false);
			filterTimerStop();
		}
		
		
		

	}
//load keywords
	var filterKeywordCookie = JSON.parse(readCookie('filtertwitterstream'));
	if (filterKeywordCookie != null) {
		filterKeywordArray = filterKeywordCookie;

	}
	

}

loadSettings();


	
////// switches
$('#filterSwitch').click(function () {
	
	if ($(this).is(':checked')) {
	filterSwitchSettings.filter = "on";
	createCookie('filtertwitterstream_onoff', JSON.stringify(filterSwitchSettings), cookieDays);
	filterTimerStart();
	} else {  
	$('#repliesSwitch').attr('checked',false);
	$('#hashtagSwitch').attr('checked',false);
	filterSwitchSettings.filter = "off";
	filterSwitchSettings.replies = "off";
	filterSwitchSettings.hashtags = "off";
	createCookie('filtertwitterstream_onoff', JSON.stringify(filterSwitchSettings), cookieDays);
	
		filterTimerStop();
		
	}
filterTweetsReset();
});
$('#repliesSwitch').click(function () {
	if ($(this).is(':checked')) {

		$('#filterSwitch').attr('checked', true);
		filterSwitchSettings.filter = "on";
		filterSwitchSettings.replies = "on";
		createCookie('filtertwitterstream_onoff', JSON.stringify(filterSwitchSettings), cookieDays);
		filterTimerStart();
	} else {
		filterSwitchSettings.filter = "off";
		filterSwitchSettings.replies = "off";
		createCookie('filtertwitterstream_onoff', JSON.stringify(filterSwitchSettings), cookieDays);

	}

	filterTweetsReset();

});
$('#hashtagSwitch').click(function () {
	if ($(this).is(':checked')) {

		$('#filterSwitch').attr('checked', true);
		filterSwitchSettings.filter = "on";
		filterSwitchSettings.hashtags = "on";
		createCookie('filtertwitterstream_onoff', JSON.stringify(filterSwitchSettings), cookieDays);
		filterTimerStart();
	} else {
		filterSwitchSettings.filter = "off";
		filterSwitchSettings.hashtags = "off";
		createCookie('filtertwitterstream_onoff', JSON.stringify(filterSwitchSettings), cookieDays);

	}

	filterTweetsReset();

});



  //remove keywords
$(document).on('click', '.filter-twitter-keywordlist-item', function(event) {
event.preventDefault();
   var item = $(this).data('id');
  filterKeywordArray.splice( item ,1);
  createCookie('filtertwitterstream', JSON.stringify(filterKeywordArray), cookieDays);
  showKeywordList();
  filterTweetsReset();
});


 //add keywords
$('#filter-twitter-input').keypress(function(e) {
    if(e.which == 13) {
       addKeyword();
    }
});
$('#twitter-filter-btn').click(function () {
		addKeyword();
});

function addKeyword() {
	var keyword = $.trim($('#filter-twitter-input').val()).toLowerCase();

	if (keyword == null || keyword == "") {

		return;
	}

	var filterKeywordCookie = JSON.parse(readCookie('filtertwitterstream'));
	if (filterKeywordCookie != null) {
		filterKeywordArray = filterKeywordCookie;

	}

	if ($.inArray(keyword, filterKeywordArray) == -1) {
		filterKeywordArray.push(keyword);
	}

	createCookie('filtertwitterstream', JSON.stringify(filterKeywordArray), cookieDays);

	showKeywordList();
	$('#filter-twitter-input').val("");
	lastCheck = 0; // reset
}


var lastCheck = 0;
//Where the magic happens
function filterTweets() {
	if (filterSwitchSettings.filter === "off") {

		filterTimerStop();
		return;
	}

	var tweetTexts = $(".tweet-text:visible");
	
	var len = tweetTexts.length;
	if(len === lastCheck){
	return;
	}else{
	lastCheck = len;
	}
	for (var i = 0; i < len; i++) {
		
		var $tweet = tweetTexts.eq(i);

	    var tweettext = $tweet.text().toLowerCase();
		var headertext = $tweet.prev().children(".account-group").text().toLowerCase();

		if (filterSwitchSettings.replies === "on") {
			var hasReplyText = tweettext.indexOf('@') > -1;
			if (hasReplyText) {
				$tweet.parent().parent().hide();
				
				continue;
			}
		}
		if (filterSwitchSettings.hashtags === "on") {
			var hasHashtagText = tweettext.indexOf('#') > -1;
			if (hasHashtagText) {
				$tweet.parent().parent().hide();
				
				continue;
			}

		}
		if (filterKeywordArray.length !== 0) {
			for (var j = 0, ln = filterKeywordArray.length; j < ln; j++) {
				
				var filterKeyword = filterKeywordArray[j];
				
				var hasKeywordText = tweettext.indexOf(filterKeyword) > -1;
				var hasKeywordHeader = headertext.indexOf(filterKeyword) > -1;
				
				if (hasKeywordText || hasKeywordHeader) {

					$tweet.parent().parent().hide();
					
					break;

				}

			} //for
			
		}
		
	} //for
	
}
function filterTweetsReset() {

	var tweetTexts = $(".tweet-text:hidden");
	for (var i = 0, length = tweetTexts.length; i < length; i++) {

		var $tweet = tweetTexts.eq(i);
		$tweet.parent().parent().show();
	}
lastCheck = 0; // reset
}
//cookie stuff
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

});