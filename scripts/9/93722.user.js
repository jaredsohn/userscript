// ==UserScript==
// @name           SO Show Today's Reputation
// @namespace      SO_TODAY_REP
// @description    Shows today's reputation score and time till new session begins.
// @include        http://stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://superuser.com/*
// @include        http://meta.stackoverflow.com/*
// ==/UserScript==

(function(){
	function GM_wait() {
		if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; GM_letsJQuery(); }
	}
	GM_wait();

	function GM_letsJQuery() {
		$(function() {
			var logout_link = $("#topbar a[href^='/users/logout']:first");

			if(logout_link.length) {
				$("#topbar").css('max-width', '1000px');
				var link = $("#topbar a[href^='/users/recent/']:first");
				var today = new Date();
				var UTCtoday = today.getUTCFullYear() + '-' + GM_fixNumber(today.getUTCMonth()+1) + '-' + GM_fixNumber(today.getUTCDate());
				var url = (link.attr('href').match(/^[^?]+/))[0] + '?StartDate=' + UTCtoday + '&EndDate=' + UTCtoday;
				
				$('<span></span>').load(url + " div#tabs a[href^='/users/recent/'][href*='tab=reputation']:first span.bounty-indicator-tab:first" , function() {
				    console.log(this);
					var today_rep = $(this).text();
					$(this).remove();
					
					if(!today_rep) today_rep = 0;
					
					var today_rep_int = parseInt(today_rep, 10);
					
					var separator = logout_link.parent().prev().find('span:last');
					separator.clone().insertBefore(separator);
					
					var rep_score = $('<span class="reputation-score"></span>').text(' ' + today_rep).insertBefore(separator);
					
					var time_score = $('<span class="badgecount"></span>').insertBefore(separator);
					
					if(today_rep_int >= 200) {
						rep_score.css('color', '#BB0000');
						time_score.css('color', '#BB8888');
					}
					
					var timer = function() {
						var now = new Date();
						var nextSess = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 0, 0-now.getTimezoneOffset(), 0);
						
						if(nextSess.getTime() <= now.getTime()) {
							nextSess.setDate(nextSess.getDate()+1);
						}

						var diff = parseInt((nextSess.getTime() - now.getTime()) / 1000, 10);
						
						var hours = parseInt((diff / 3600) % 24, 10);
						var minutes = parseInt((diff % 3600) / 60, 10);
						var seconds = diff % 60;
						
						var settext = GM_fixNumber(hours) + ':' + GM_fixNumber(minutes) + '.' + GM_fixNumber(seconds);
						
						time_score.text(' - ' + settext + ' ');
					};
					
					timer();
					
					setInterval(timer, 1000);
				});
			}
		});
	}
	
	function GM_fixNumber(num) {
		if(num < 10) return '0' + num;
		return num;
	}
})();