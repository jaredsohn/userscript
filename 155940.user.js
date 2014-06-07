// ==UserScript==
// @name        Tumblr UnFollow All
// @namespace   http://userscripts.org/scripts/show/155940
// @description Adds a button to unfollow all the blogs at once.
// @include     http://www.tumblr.com/following
// @include     http://www.tumblr.com/following/*
// @version     2
// ==/UserScript==
var source = 'window.done=\'false\'; '+"\n"+
             'window.fullow = function(){'+"\n"+
             '	if(window.done == \'false\') {'+"\n"+
             '		var c = confirm(\'are you sure you want to unFollow all blogs\');'+"\n"+
             '		if(c != 1) return false;'+"\n"+
             '	}'+"\n"+
             '	if(window.done != \'true\'){'+"\n"+
             '		jQuery.ajax({'+"\n"+
             '			url: \'http://www.tumblr.com/following\','+"\n"+
             '			type: \'get\','+"\n"+
             '			success: function(x){'+"\n"+
             '				window.done = (x.match(/unfollow_button_[^"]+/g) != null) ? x.match(/unfollow_button_[^"]+/g) : \'true\';'+"\n"+
             '				for(i = 0; i < done.length; i++) {'+"\n"+
             '					Tumblr.unfollow({'+"\n"+
             '						tumblelog: window.done[i].replace(/^unfollow_button_/, \'\'),'+"\n"+
             '						source: \'FOLLOW_SOURCE_FOLLOWING_PAGE\''+"\n"+
             '					});;'+"\n"+
             '				}'+"\n"+
             '				window.fullow();'+"\n"+
             '			}'+"\n"+
             '		});'+"\n"+
             '	}else{'+"\n"+
             '		document.location = url + "?all_removed";'+"\n"+
             '	}'+"\n"+
             '}'+"\n"+
             'var un_row = jQuery(\'<div></div>\');'+"\n"+
             'jQuery(un_row).addClass(\'follower\'); '+"\n"+
             'jQuery(un_row).addClass(\'clearfix\'); '+"\n"+
             'if(jQuery(\'.follower\').last().hasClass(\'alt\')==false); '+"\n"+
             'jQuery(un_row).addClass(\'alt\'); '+"\n"+
             'var un_button = jQuery(\'<input/>\'); '+"\n"+
             'jQuery(un_button).addClass(\'chrome\'); '+"\n"+
             'jQuery(un_button).addClass(\'clear\'); '+"\n"+
             'jQuery(un_button).addClass(\'big\'); '+"\n"+
             'jQuery(un_button).addClass(\'unfollow_button\'); '+"\n"+
             'jQuery(un_button).attr({type:"button",value:"unFollow All"}); '+"\n"+
             'jQuery(un_button).bind(\'click\', window.fullow); '+"\n"+
             'jQuery(un_row).append(un_button); '+"\n"+
             'jQuery(\'#following\').append(un_row);';

var script = document.createElement('script');
script.setAttribute("type", "application/javascript");
var addthis = document.createTextNode(source);
script.appendChild(addthis);
document.body.appendChild(script);