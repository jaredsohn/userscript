// ==UserScript==
// @name       Virsual keyboard
// @namespace  http://styleshit.me/
// @version    0.1
// @match      http://cms.alibaba-inc.com/*
// @copyright  2012+, You
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// @require http://styleshit.me/demo/jQuery.keyboard/js/jquery.selection.js
// @require http://styleshit.me/demo/jQuery.keyboard/js/libs/jquery-1.6.4.min.js
// @require http://styleshit.me/demo/jQuery.keyboard/js/jquery.keyboard/jquery.keyboard.js
// ==/UserScript==

$(function(){
    $.get('http://styleshit.me/demo/jQuery.keyboard/css/main.css').success(function( cssText ){
        var os = navigator.platform.slice(0,3).toLowerCase();
        $('<style>').text(cssText).appendTo('head');
        $.get('http://styleshit.me/demo/jQuery.keyboard/js/jquery.keyboard/keyboards/'+ os +'.js?v='+ new Date().getTime()).success(function( ){
			$('body').keyboard({keyboard: os });
        });
    });
});
