// ==UserScript==
// @name        mute_richard
// @namespace   http://userscripts.org/users/471507
// @include     https://www.kickstarter.com/projects/hybratech/sound-band-finally-a-headset-without-speakers/comments*
// @version     1
// @grant       none
// ==/UserScript==
// 
$( document ).ready(function(){
    rich = $('a[href$="/856606942"].author') .parents('.comment-inner');
    $('.avatar', rich) .hide();
    $('p', rich) .hide();
    rich.css('cursor', 'pointer');
    rich.on('click', function () {
        $('.avatar', $(this)) .toggle();
        $('p', $(this)) .toggle();
    });
});
