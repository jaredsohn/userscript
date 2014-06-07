// ==UserScript==
// @name Bungie Day is Coming!
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @match http://*.bungie.net/*
// @match https://*.bungie.net/*
// @description Script that adds Bungie Day-themed features to various parts of Bnet. This includes a countdown timer to Bungie, a notification if new News is posted
// ==/UserScript==
//prototype methods and other functions needed later
/*! jQuery v1.7.1 jquery.com | jquery.org/license */
function getCookie(name) {
	var results = document.cookie.match(name + '=(.*?)(;|$)');
	if (results) {
		return (unescape(results[1]));
	}
	else {
		return null;
	}
}
//do if in a thread, and Bungie Day is less than a week away
var today = new Date();
var weekFromBDay = new Date(today.getFullYear(), 6, 1);
if (location.pathname.toLowerCase() == '/forums/posts.aspx' && weekFromBDay <= today) {
	var h = [];
	var titlebars = $('.postbody > ul');
	var titles = $('.title')
	for (var i = 0; i < titlebars.length; i++) {
		if ($(titlebars[i]).css('background-color') == 'rgb(39, 40, 44)') {
			h.push('Newbie');
		}
		else if ($(titlebars[i]).css('background-color') == 'rgb(50, 58, 61)') {
			h.push('Middle School');
		}
		else if ($(titlebars[i]).css('background-color') == 'rgb(76, 76, 76)') {
			h.push('Old Skool');
		}
		else if ($(titlebars[i]).css('background-color') == 'rgb(16, 51, 73)') {
			h.push('Grizzled Ancient');
		}
		else {
			h.push((today.getDate() == 7 && today.getMonths() == 6) ?'BirthdayBoy' : 'Grizzled Ancient');
		}
	}
	for (var i = 0; i < titles.length; i++) {
		$(titles[i]).text(h[i]);
	}
	if (!localStorage.memberID) {
		//get memberID
		var usernameLinks = $('.login > a');
		for (var i = 0; i < usernameLinks.length; i++) {
			if ($(usernameLinks[i]).text() == getCookie('BungieDisplayName')) {
				localStorage.memberID = /memberid=\d{1,10}/i.exec(usernameLinks[i].href)[0].substr(9);
			}
		}
	}
	if (!localStorage.UID) {
		//get UID
		var c = $('.forumpost');
		for (var i = 0; i < c.length; i++) {
			if ($(c[i]).find('.author_header_links').length < 5) {
				localStorage.UID = /uid=\d{1,10}/i.exec($(c[i]).find('.author_header_links')[2].firstElementChild.href)[0].substr(4);
			}
		}
	}
}
/*
if bungie day, load and run surprise function; also, if not yet visited,
redirect to bungie.net/oneofseven; once visited, set localStorage
*/
var f = new Date();
if (f.getDate() == 7 && f.getMonth() == 6) {
	if (!localStorage.surpriseFunction) {
		var t = $.ajax({
				url: 'http://gm.bungie.co/ctjl96/surprise.php',
				dataType: 'json',
				/*
				wouldn't be an easter egg if I left it lying around in the source :)
				*/
				success: function (response) {
					localStorage.surpriseFunction = response.surprise;
					eval(response.surprise)();
				}
		});
	}
	else {
		eval(localStorage.surpriseFunction)();
	}
	if (location.pathname.toLowerCase() == '/oneofseven') {
		localStorage.visitedOneofSeven = '#MOAP SWAG YEAH #BUNGIENET 04 OR BUST BABY MYTHIX MASTER RACE #SWAG';
	}
	if (!localStorage.visitedOneofSeven) {
		if (confirm('It doesn\'t look like you\'ve visited the One of Seven page yet. Click ok to be automatically redirected.')) {
			window.location = '/oneofseven';
		}
	}
}
//construct countdown clock and other boring stuff w/ Date object, in forum index
if (/topics\.aspx/i.test(location.href)) {
	countdown = function () {
		var k = new Date();
		//is not bungie day
		if (!(k.getMonth() == 6 && k.getDay() == 7)) {
			var c = new Date(k.getFullYear(), 6, 7);
			if (c <= k) {
				c = new Date(k.getFullYear() + 1, 6, 7);
			}
			else if (c > k) {
				var daysLeft = Math.floor((c - k) / 86400000);
				var hoursLeft = Math.floor(((c- k) / 3600000) - (daysLeft * 24));
				var minsLeft = Math.floor((((c - k) / 60000) - ((daysLeft * 24 * 60) + (hoursLeft * 60))));
				var secsLeft = Math.floor((((c - k) / 1000) - ((daysLeft * 24 * 60 * 60) + (hoursLeft * 60 * 60) + (minsLeft * 60))));
			//hopefully lots of secsLeft, giggity
			}
			//jesus that was a pain in the ass
		}
		else {
			var daysLeft = 0;
			var hoursLeft = 0;
			var minsLeft = 0;
			var secsLeft = 0;
		}
		//actually change countdown values
		$('#days').text(daysLeft.toString());
		$('#dayUnit').text(daysLeft == 1 ? ' day' : ' days');
		$('#hours').text(hoursLeft.toString());
		$('#hoursUnit').text(hoursLeft == 1 ? ' hr' : ' hrs');
		$('#mins').text(minsLeft.toString());
		$('#minsUnit').text(minsLeft == 1 ? ' min' : ' mins');
		$('#secs').text(secsLeft.toString());
		$('#secsUnit').text(secsLeft == 1 ? ' sec' : ' secs');
	}
	
	//set up countdown clock, setInterval for updating
	$('.boxB').first().css('margin-top','0px');
	$('.boxB').first().before('<div class="boxB" style="width: 276px; margin-left: 5px;"><ul><li><h3 style="padding-left: 45px;padding-top: 5px;">BUNGIE DAY IS COMING!</h3></li></ul><table class="pinned_topic_grid"><tbody><tr class="odd countdown"><td style="padding-left: 20px; font-size: 15px; padding-top: 5px; padding-bottom: 5px; "><span id="days">0</span><span id="dayUnit"> days</span></td><td style="font-size: 15px; padding-top: 5px; padding-bottom: 5px; "><span id="hours">0</span><span id="hoursUnit"> hrs</span></td><td style="font-size: 15px; padding-top: 5px; padding-bottom: 5px; "><span id="mins">0</span><span id="minsUnit"> mins</span></td><td style="font-size: 15px; padding-top: 5px; padding-bottom: 5px; "><span id="secs">0</span><span id="secsUnit"> secs</span></td></tr></tbody></table></div>');
	setInterval(countdown, 1000, 'javascript');
}		

//create drawing canvas and do other stuff if in profile
//SO MANY DAMN WAYS TO REACH THE PROFILE
if (location.pathname.toLowerCase() == '/account/profile.aspx' && (!location.search || location.search.toLowerCase() == '?page=chapters' || location.search.toLowerCase() == ('?memberid=' + localStorage.memberID + '&page=chapters') || location.search.toLowerCase() == ('?memberid=' + localStorage.memberID) || location.search.toLowerCase() == ('?uid=' + localStorage.UID) || location.search.toLowerCase() == ('?uid=' + localStorage.UID + '&page=chapters'))) {
	$('.rtsLevel2').children().first().find('.rtsLast').removeClass('rtsLast');
	$('.rtsLevel2').children().first().append('<li class="rtsLI rtsLast"><a class="rtsLink lettersToBungie" style="cursor:pointer"><span class="rtsOut"><span class="rtsIn"><span class="rtsTxt">Letters to Bungie</span></span></span></a></li>');
	$('.content_matte').append('<div id="iframeCont" style="display:none"><iframe src="http://gm.bungie.co/ctjl96/canvas.php?user=' + getCookie('BungieDisplayName') +'" style="width: 850px;height: 500px;border: none;"></iframe></div>');
	//fixes some strange bug where the LtB tab appears twice. probably just me being really stupid
	$('.rtsLevel2 ul').first().find('li').length > 5 ? (function () { $('.lettersToBungie').hide(); $('.lettersToBungie').first().show(); })() : (function () { })();
	if (!(/\?page=chapters/i.test(location.search.toLowerCase()))) {
		$('.rtsLevel2 a').first().attr('href', null);
		$('.rtsLevel2 a').first().css('cursor','pointer');
		$('.rtsLevel2 a').first().click(function () { $('.rtsLevel2 .rtsSelected').removeClass('rtsSelected'); $('.content_matte').children().show(); $(this).addClass('rtsSelected'); });
	}
	else {
		$($('.rtsLevel2 a')[2]).attr('href', null);                                                                                                                                                                                                                                                                                                                                                                                                                  
		$($('.rtsLevel2 a')[2]).first().css('cursor','pointer');
		$($('.rtsLevel2 a')[2]).first().click(function () { $('.rtsLevel2 .rtsSelected').removeClass('rtsSelected'); $('.content_matte').children().show(); $(this).addClass('rtsSelected');});
	}
	$('.lettersToBungie').first().click(function () { $('.rtsLevel2 .rtsSelected').removeClass('rtsSelected'); $('.content_matte').children().hide(); $(this).addClass('rtsSelected'); $('#iframeCont').show();  });
}

//check for new news
function newNews() {
	var f = $.ajax({
			url: '/',
			dataType:'html',
			async: false
	});
	var latestNewsTitle = $(f.responseText).find('#ctl00_LatestNewsBlock1_DockableObject_C_LatestNewsBlock1_regularNewsRepeater_ctl01_newsTitleLink').text();
	if (localStorage.latestNewsTitle) {
		return localStorage.latestNewsTitle == latestNewsTitle ? false : true;
	}
	else {
		localStorage.latestNewsTitle = latestNewsTitle;
		return false;
	}
}