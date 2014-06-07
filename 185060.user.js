// ==UserScript==
// @name        Dobrochan Thread Update Checker
// @namespace   dc_update_checker
// @description Notifies you of new posts.
// @include     *dobrochan.*/res/*
// @homepage    https://github.com/Unknowny/dobroscript
// @updateURL   https://github.com/Unknowny/dobroscript/raw/master/Dobrochan Thread Update Checker.user.js
// @downloadURL https://github.com/Unknowny/dobroscript/raw/master/Dobrochan Thread Update Checker.user.js
// @version     1.0.1
// ==/UserScript==

var d = document,
	$notice = crNotice(),
	board = location.pathname.match(/[a-z]+/)[0],
	lastID = $('.post:last').attr('id').substr(5);

function crNotice() {
	var $div = $('<div></div>');
	$div.addClass('reply');
	$div.css({
		'top':'25px',
		'right':'25px',
		'position':'fixed',
		'cursor':'pointer',
		'padding':'4px',
		'box-shadow':'2px 2px #999',
		'display':'none'
	});
	$div.on('click', function(){location.reload();});
	Hanabira.LC_ru ? $div.text('Новые посты. Обновить страницу.') : $div.text('New posts. Reload page.');
	return $div;
}

function favicBlink() {
	d.title='*'+d.title;
	$(d).one('focus', function(){d.title=d.title.substr(1);});
}

function notify() {
	$notice.fadeIn();
	favicBlink()
}

function check() {
	$.get('/api/thread/'+board+'/'+location.pathname.match(/\d+/)[0]+'/new.json?last_post='+lastID, function(resp){
		resp.posts ? notify() : setTimeout(check, 20000);
	});
}

$(d.body).append($notice);
setTimeout(check, 20000);