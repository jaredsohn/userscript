// ==UserScript==
// @name        Tumblr - Show dates on dashboard.
// @namespace   http://userscripts.org/scripts/show/158319
// @description Show post dates on dashboard.
// @include     http://www.tumblr.com/dashboard
// @include     http://www.tumblr.com/blog/*
// @include     http://www.tumblr.com/tagged/*
// @include     http://www.tumblr.com/likes
// @include     https://www.tumblr.com/likes
// @include     http://www.tumblr.com/liked/by/*
// @include     http://www.tumblr.com/dashboard/*
// @version     2.4
// @grant       none
// ==/UserScript==
var source = 'window.month_array = [\'nihil\',\'January\',\'February\',\'March\',\'April\',\'May\',\'June\',\'July\',\'August\',\'September\',\'October\',\'November\',\'December\'];'+"\n"+
             'var d = new Date();'+"\n"+
             'window.last_oi = d.getMonth() + 1;'+"\n"+
             'window.last_b = d.getDate();'+"\n"+
             'window.last_y = d.getFullYear();'+"\n"+
             'window.parse_weekday_context = function(rday){'+"\n"+
             '	var day_array = [\'Sun\', \'Mon\', \'Tue\', \'Wed\', \'Thur\', \'Fri\', \'Sat\'];'+"\n"+
             '	var d = new Date();'+"\n"+
             '	var oi = 1; //mo'+"\n"+
             '	var di = d.getDay();'+"\n"+
             '	var y = window.last_y;'+"\n"+
             '	var b = window.last_b; //day of mo'+"\n"+
             '	if(rday.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/) != null){'+"\n"+
             '		while(oi < window.month_array.length){'+"\n"+
             '			if(rday.match((window.month_array[oi] + \'\').substring(0, 3)) == null){ //month'+"\n"+
             '				oi++;'+"\n"+
             '			}else{'+"\n"+
             '				break;'+"\n"+
             '			}'+"\n"+
             '		}'+"\n"+
             '	}else{'+"\n"+
             '		oi = window.last_oi;'+"\n"+
             '	}'+"\n"+
             '	if(rday.match(/\\d{4},/) != null){ //not this year'+"\n"+
             '		y = parseInt((rday + \'\').match(/(\\d{4}),/)[1]);'+"\n"+
             '	}'+"\n"+
             '	var diy = new Date(window.last_y, window.last_oi - 1, window.last_b).getDay();'+"\n"+
             '	if(rday.match(/(Sun|Mon|Tue|Wed|Thu|Fri|Sat)/) != null){ //day of week'+"\n"+
             '		var ds = rday.match(/(Sun|Mon|Tue|Wed|Thu|Fri|Sat)/)[0];'+"\n"+
             '		di = (ds == "Sun")? 0 : (ds == "Mon")? 1 : (ds == "Tue")? 2 : (ds == "Wed")? 3 : (ds == "Thu")? 4 : (ds == "Fri")? 5 : (ds == "Sat")? 6 : diy;'+"\n"+
             '		if(di!=diy){'+"\n"+
             '			b = b - (diy - ((di>diy)? di - 7: di));			'+"\n"+
             '			if(b < 1){'+"\n"+
             '				oi--;'+"\n"+
             '				if(oi < 1){'+"\n"+
             '					oi = 12;'+"\n"+
             '					y--;'+"\n"+
             '				}'+"\n"+
             '				b = new Date(y, oi, 0).getDate();'+"\n"+
             '			}'+"\n"+
             '			di=diy;'+"\n"+
             '		}'+"\n"+
             '	}'+"\n"+
             '	if(rday.match(/\\d{1,2}[thndrs]{2},?/i) != null) b = parseInt(rday.match(/(\\d{1,2})[thndrs]{2},?/i)[1]);'+"\n"+
             '	window.last_b = b;'+"\n"+
             '	window.last_y = y;'+"\n"+
             '	window.last_oi = oi;'+"\n"+
             '	di = new Date(y, oi - 1, b, 0, 0, 0, 0).getDay();'+"\n"+
             ''+"\n"+
             '	return window.month_array[oi] + " " + b + ", " + y + " (" + day_array[di] + " " + rday.match(/\\d{1,2}:\\d{2}[ap]m/) + ")";'+"\n"+
             '}'+"\n"+
             'window.visible_permalinks = function(t){'+"\n"+
             '	if((document.location + \'\').split(\'/\')[5] != \'queue\'){'+"\n"+
             '		jQuery(\'.post_permalink\').each(function(){'+"\n"+
             '			if(!jQuery(this).hasClass(\'visible_pl\')){'+"\n"+
             '				jQuery(this).addClass(\'visible_pl\');'+"\n"+
             '				var t = jQuery(this).attr(\'title\');'+"\n"+
             '				var d = (t.match(/(Sun|Mon|Tue|Wed|Thu|Fri|Sat|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/) == null)? \' - Today \' : \' - \';'+"\n"+
             '				var tt = window.parse_weekday_context(t);'+"\n"+
             '				jQuery(this).parent().find(\'.post_info a:eq(0)\').after(\'\' + d + tt);'+"\n"+
             '			}'+"\n"+
             '		});'+"\n"+
             '	}else{'+"\n"+
             '		var d = new Date();'+"\n"+
             '		var day = d.getDay();'+"\n"+
             '		var oi = d.getMonth() + 1;'+"\n"+
             '		var y = d.getFullYear();'+"\n"+
             '		var b = d.getDate();'+"\n"+
             '		jQuery(\'div.post_avatar\').each(function(i){'+"\n"+
             '			if(jQuery(this).find(\'div.publish_on_day:eq(0)\').html() != null){'+"\n"+
             '				var ds = jQuery(this).find(\'div.publish_on_day:eq(0)\').html();'+"\n"+
             '				var di = (ds == "Sun")? 0 : (ds == "Mon")? 1 : (ds == "Tue")? 2 : (ds == "Wed")? 3 : (ds == "Thu")? 4 : (ds == "Fri")? 5 : (ds == "Sat")? 6 : -1;'+"\n"+
             '				if(di > day || di == 0 && day == 6){'+"\n"+
             '					b++;'+"\n"+
             '					day = (day < 6)? day + 1 : 0;'+"\n"+
             '				}'+"\n"+
             '				if(b > new Date(y, oi, 0).getDate()){'+"\n"+
             '					oi++;'+"\n"+
             '					b = 1;'+"\n"+
             '					if(oi > 12){'+"\n"+
             '						oi = 1;'+"\n"+
             '						y++;'+"\n"+
             '					}'+"\n"+
             '				}'+"\n"+
             '				if(!jQuery(this).hasClass(\'visible_pl\') || t){'+"\n"+
             '					var tt = (di != -1)?'+"\n"+
             '						window.parse_weekday_context("View post - " + window.month_array[oi] + " " + b + "rd, " + y + ", " + jQuery(this).find(\'div.publish_on_time:eq(0)\').html()) :'+"\n"+
             '						window.parse_weekday_context("View post - " + ds.replace(/\\s{2,}/g, \'\') + "rd, " + y + ", " + jQuery(this).find(\'div.publish_on_time:eq(0)\').html());'+"\n"+
             '					if(!t || typeof jQuery(this).parent().parent().find(\'span.date_custom:eq(0)\') == undefined){'+"\n"+
             '						jQuery(this).parent().parent().find(\'.post_info a:eq(0)\').after('+"\n"+
             '							\' - \' + \'<span class="date_custom">\'+tt+\'</span>\');'+"\n"+
             '					}else{'+"\n"+
             '						if(jQuery(this).parent().parent().find(\'span.date_custom:eq(0)\').html()!=tt)'+"\n"+
             '							jQuery(this).parent().parent().find(\'span.date_custom:eq(0)\').html(tt);'+"\n"+
             '					}'+"\n"+
             '					jQuery(this).addClass(\'visible_pl\');'+"\n"+
             '				}'+"\n"+
             '			}'+"\n"+
             '		});'+"\n"+
             '	}'+"\n"+
             '}'+"\n"+
             'var addCSS = jQuery(\'<style></style>\');'+"\n"+
             'jQuery(addCSS).attr(\'type\',"text/css");'+"\n"+
             'jQuery(addCSS).html(\'.post_full .post_info_fence.has_follow_button {max-width: 500px !important;}\'+'+"\n"+
             '					\'.post_source {margin-top: 20px !important;\');'+"\n"+
             'jQuery(\'head:eq(0)\').append(addCSS);'+"\n"+
             'if((document.location+\'\').match(/\\/queue$/)==null){'+"\n"+
             '	window.visible_permalinks(false);'+"\n"+
             '}else{'+"\n"+
             '	jQuery(window).load(function(){'+"\n"+
             '		window.visible_permalinks(false);'+"\n"+
             '	});'+"\n"+
             '}'+"\n"+
             'if(typeof window.after_auto_paginate===\'function\'){'+"\n"+
             '	window.after_auto_paginate = (function(){'+"\n"+
             '		var cached_function = window.after_auto_paginate;'+"\n"+
             '		return function(){'+"\n"+
             '			cached_function.apply(this, arguments);'+"\n"+
             '			window.visible_permalinks(false);'+"\n"+
             '		};'+"\n"+
             '	}());'+"\n"+
             '}else{'+"\n"+
             '	window.after_auto_paginate = function(){'+"\n"+
             '		window.visible_permalinks(false);'+"\n"+
             '	}'+"\n"+
             '}'+"\n"+
             'if(typeof Tumblr.PostQueue!="undefined"){'+"\n"+
             '	Tumblr.PostQueue.prototype.updatePublishOnTimes = (function(){'+"\n"+
             '		var cached_function = Tumblr.PostQueue.prototype.updatePublishOnTimes;'+"\n"+
             '		return function(){'+"\n"+
             '			cached_function.apply(this, arguments);'+"\n"+
             '			window.visible_permalinks(true);'+"\n"+
             '		};'+"\n"+
             '	}());'+"\n"+
             '}';

var script = document.createElement('script');
script.setAttribute("type", "application/javascript");
var addthis = document.createTextNode(source);
script.appendChild(addthis);
document.body.appendChild(script);