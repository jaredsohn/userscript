// ==UserScript==
// @name			reddit block /r/all
// @namespace       		reddit
// @description 		block from accessing reddit /r/all (avoid procrastinating
// @version			1.00
// @editor			xtrimsky
// @include			http://reddit.com/*
// @include			http://*.reddit.com/*
// @include			https://reddit.com/*
// @include			https://*.reddit.com/*
// ==/UserScript==

if(window.location.pathname === '/r/all/'){
    alert('blocked!');
    window.location = '/';
}
jQuery('.flat-list').eq(0).children('li').eq(1).remove();
jQuery('.flat-list').eq(0).children('li').eq(2).remove();