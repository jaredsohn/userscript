// ==UserScript==
// @id             google_speed_reply
// @name           Google+ Speed Reply
// @version        1.0.5
// @namespace      http://zespia.twbbs.org
// @author         SkyArrow
// @description    Google+ Speed Reply
// @include        https://plus.google.com/*
// @exclude        https://plus.google.com/ripples/*
// ==/UserScript==

var speedreply = function(){
	var addReply = function(){
		var mother = $(this).parentsUntil('div[id^="update"]'),
			iframe = mother.find('iframe').contents().find('body'),
			oid = $(this).prev().attr('oid'),
			name = $(this).prev().text(),
			html = '<input class="g-ci sr_input" type="button" data-sbxm="1" tabindex="-1" data-token-entity="@'+oid+'" oid="'+oid+'" value="+'+name+'"> ';
		
		if (iframe.length > 0){
			if (iframe.text() == ''){
				iframe.html(html);
			} else {
				iframe.html(iframe.html() + html);
			}
		} else {
			mother.find('.LB').click();
			setTimeout(function(){
				var iframe = mother.find('iframe').contents().find('body');
				iframe.html(html);
			}, 200);
		}
	}

	var timeout;
	var timer = function(){
		$('div[id^="update"]').find('a[oid]').each(function(){
			if (!$(this).hasClass('sr_added') && $(this).children().length == 0){
				$(this).after('<a class="speedreply">+</a>').addClass('sr_added');
			}
		});
		timeout = setTimeout(timer, 2500);
	}

	timeout = setTimeout(timer, 2500);
	$('body').on('click', '.speedreply', addReply);
}

// Load jQuery
var jq = document.createElement('script');
jq.src = '//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
jq.addEventListener('load', function(){
	var script = document.createElement('script');
	script.textContent = '(' + speedreply.toString() + ')();';
	document.body.appendChild(script);
}, false);
document.body.appendChild(jq);

// CSS
GM_addStyle('.speedreply{background:#f5f5f5;border:1px solid #d2d2d2;border-radius:2px;font-weight:normal;font-size:12px;padding:0 2px;color:#aaa;margin:0 5px;}.speedreply:hover{border:1px solid #bce;color:#3366cc;text-decoration:none;}.eE .speedreply{margin-right:0;}.sr_input{white-space:nowrap;background:#eeeeee;border:1px solid #dddddd;border-radius:2px;display:inline-block;font:13px/1.4 Arial,sans-serif;margin:0 1px;padding:0 1px;vertical-align:baseline;color:#3366cc;}');
