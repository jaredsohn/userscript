// ==UserScript==
// @name        Donbaler Easy Avatar Viewer
// @namespace   http://userscripts.org/users/511053
// @description Donbaler Easy Avatar Viewer
// @include     http://donbaler.com/*
// @version     0.1
// ==/UserScript==
$('body').prepend('<div id="avatar-container" style="position:absolute;width:auto;height:auto;background-color: #d6d6d6;border: 2px solid #141414;-moz-border-radius: 5px;border-radius: 5px;-moz-box-shadow: 0 0 15px 5px #141414;box-shadow: 0 0 15px 5px #141414;z-index:9999999;display:none;"></div>');
var user_avatar;
$('.slimusergroup .slimuser').hover(function(e) {
    $(this).attr('title', '');
    user_avatar = $(this).find('img').attr('src').replace('thumbs3/', '');
    $(this).mousemove(function(e) {
        $('#avatar-container').css({
            'top':e.pageY+15+'px',
            'left':e.pageX+15+'px',
            'display':'inline-block',
        }).html('<img src="' + user_avatar + '" />');
    });
}, function() {
    user_avatar = "";
    $('#avatar-container').css('display', 'none');
});