// ==UserScript==
// @name           TESTLAZERSHIELD
// @namespace      TESTLAZERSHIELD
// @description    TEST
// @include        http://turntable.fm/*
// ==/UserScript==

var become_active = false;


var become_txt = $('<div>Waiting for DJ Slot</div>');
become_txt.css('position','fixed').css('bottom',0).css('left',0).css('z-index',9999).css('color','#fff');
$('body').append(become_txt);

var _oldhide = $.fn.hide;
$.fn.hide = function(speed, callback) {
    if ($(this).hasClass('become_dj')) {
      become_active = false;
    }
    return _oldhide.apply(this,arguments);
}


var _oldshow = $.fn.show;
$.fn.show = function(speed, callback) {
    if ($(this).hasClass('become_dj')) {
      become_active = true;
$('.become_dj').click();
become_txt.html('You should now be dj');
    }
    return _oldshow.apply(this,arguments);
}