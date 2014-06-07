// ==UserScript==
// @name           Wassr Read Shortcut
// @namespace      http://www.ohaco.jp/
// @include        http://wassr.jp/*
// ==/UserScript==

var $j = unsafeWindow.$j;
var shortcut = unsafeWindow.shortcut;

var nextMessage = 'j';
var prevMessage = 'k';
var userPage = 'u';
var addIine  = 'i';
var myPage   = 'm';
var resOpen  = 'o';
var hitokoto = 'h';

var index = -1;
var messages = $j('div.OneMsg');
var scrollSpeed = 20;
var scrollPadding = 40;
var getPosition = true;
var userScroll = true;
var timer;
var background = 'url(http://wassr.jp/b3/img/bg-hitokoto.png) top repeat-x';

function init() {
	if(!userScroll) {
		messages.css('background', background);
	}

	var positionTop = $j('body').scrollTop() || document.documentElement.scrollTop;

	messages.each(function() {
		if((positionTop + scrollPadding) <= $j(this).offset().top) {
			index = messages.index(this) -1;
			return false;
		}
	});

	userScroll = true;
}

function msgScroll(elem){
	getPosition = false;
	userScroll = false;
	clearTimeout(timer);
	elem.css('background', '#efe');

	$j('html,body').animate({ scrollTop: (elem.offset().top - scrollPadding) }, scrollSpeed, '', function(f) {
		if($j('p.message a', elem).get(0)) {
			$j('p.message a:eq(0)', elem).focus();
		} else {
			var anchor = $j('a:eq(0)', elem);
			anchor.focus();
			anchor.blur();
		}
	});

	timer = setTimeout(function() {
		getPosition = true;
	}, 1000);
}

$j(window).scroll(function() {
	if(getPosition) {
		init();
	}
});

// 次のヒトコトへ
shortcut.add(nextMessage, function() {
	if(index < (messages.length - 1)) {
		index++;
		var elem = messages.eq(index);
		messages.eq(index - 1).css('background', background);
		msgScroll(elem);
	}
},{
	'disable_in_input': true
});

// 前のヒトコトへ
shortcut.add(prevMessage, function() {
	if(0 < index) {
		if(!userScroll) {
			index--;
		}
		var elem = messages.eq(index);
		messages.eq(index + 1).css('background', background);
		msgScroll(elem);
	} else {
		index = -1;
		$j('div.OneMsg:eq(0)').css('background', background);
		$j('html,body').animate({ scrollTop: $j('#Contents').position().top }, scrollSpeed);
	}
},{
	'disable_in_input': true
});

// フォーカスが当たっているヒトコトのユーザーページへ
shortcut.add(userPage, function() {
	var userPage = $j('div.OneMsg:eq(' + index + ') .MsgSide a').attr('href');
	if(typeof(userPage) != 'undefined') {
		location.href = userPage;
	}
},{
	'disable_in_input': true
});

// イイネを付ける
shortcut.add(addIine, function() {
	var elem = $j('.favorite_form, .channel_message_favorite', 'div.OneMsg:eq(' + index + ')');
	$j.post(elem.attr('action'), {}, function (data, textstatus) {
		elem.html( data );
	});
	return false;
},{
	'disable_in_input': true
});

// レスを開く
shortcut.add(resOpen, function() {
	var elem = $j('div.OneMsg:eq(' + index + ') .taggedlink');
	var status_rid = $j(elem).attr('id').replace('OneStatus', '');
	unsafeWindow.Wassr.toggle_response_ajax(status_rid);
	return false;
},{
	'disable_in_input': true
});

// 自分のページへ
shortcut.add(myPage, function() {
	location.href = 'http://wassr.jp/my/';
},{
	'disable_in_input': true
});

// ヒトコト投稿フォームへ
shortcut.add(hitokoto, function() {
	if(typeof($j('#HeadBox').position()) != 'undefined') {
		$j('html,body').animate({ scrollTop: $j('#HeadBox').position().top }, scrollSpeed);
		$j('#MessageText').focus();
	}
},{
	'disable_in_input': true
});

// AutoPagerize 対応
if (window.AutoPagerize && window.AutoPagerize.addFilter){
	window.AutoPagerize.addFilter(function(){
		unsafeWindow.Wassr.init();
		unsafeWindow.ThickBox.init('hr.autopagerize_page_separator:last ~ #EntryMessages div.OneMsg a.thickbox');
		messages = $j('div.OneMsg');
	});
}

init();
