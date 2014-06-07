// ==UserScript==
// @name        Tyrant Fansite
// @namespace   SwataScripts
// @name        Tyrant Fansite - Raids
// @description Propagates info from Profile to Raids page
// @include     http://tyrant.40in.net/*/raids.php*
// @include     http://tyrant.40in.net/*/profile.php*
// @version     2
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// ==/UserScript==

if (window.top != window.self)  //-- Don't run on frames or iframes
    return;

GM_addStyle('\
.sw_eye {\
    background-color: #FFF;\
    border-radius: 10px 0;\
    height: 15px;\
    position: absolute;\
    right: 15px;\
    top: 2px;\
    transform: rotate(45deg);\
    width: 15px;\
}\
\
.sw_eye_lense {\
    background-color: #FFF;\
    border: 3px solid #444;\
    border-radius: 7px;\
    height: 5px;\
    left: 2px;\
    position: absolute;\
    top: 2px;\
    width: 5px;\
}\
\
.sw_do_not_watch .sw_eye_lense::after {\
    background-color: #F00;\
    content: " ";\
    height: 25px;\
    left: 2px;\
    position: absolute;\
    top: -10px;\
    width: 2px;\
}\
\
.sw_do_not_watch .sw_eye_lense::before {\
    background-color: #F00;\
    content: " ";\
    height: 2px;\
    left: -10px;\
    position: absolute;\
    top: 2px;\
    width: 25px;\
}\
\
');

function addEye(container, id) {
    var $eye = $('<div>')
        .addClass('sw_eye')
        .toggleClass('sw_do_not_watch', !shouldWatch(id))
        .append($('<span>')
            .addClass('sw_eye_lense'))
        .appendTo(container)
        .click(function () {
            $eye.toggleClass('sw_do_not_watch');
            GM_setValue('raid_watch_' + id, !$eye.hasClass('sw_do_not_watch'));
            return false;
        });
}

function shouldWatch(id) {
    return GM_getValue('raid_watch_' + id) !== false;
}

// own profile page
if (document.URL.indexOf('/profile.php')>0 && $('.my').length>0) {
	$('a[href*="raid.php"]').each(function(idx, element) {
		var id = twoDigitNumber(element.href.split('=')[1]);
        var $element = $(element);
		var $p = $element.find('.uip');
		var progress = $p.text();
		var progressClass = $p.attr('class');
		GM_setValue('raid_progress_' + id, progress);
		GM_setValue('raid_progress_class_' + id, progressClass);
		addEye($element.find('.rs'), id);
	});
}

if (document.URL.indexOf('/raids.php')>0) {
	$('.rinfo').each(function(idx, element) {
		var $element = $(element);
		var $img = $element.find('img');
		var src = $img.attr('src');
		var id = src.substr(src.indexOf('_') + 1, 2);
		var progress = GM_getValue('raid_progress_' + id);
		var progressClass = GM_getValue('raid_progress_class_' + id);
		if (!progress || !progressClass)
			return;

		if (!shouldWatch(id))
			$element.css('opacity', .5);
			
	    var $progress = $('<div></div>').addClass(progressClass).text(progress);
		$element.append($progress);
	});
}

function twoDigitNumber(num) {
	var str = "0"+num;
	return str.substr(str.length-2);
}