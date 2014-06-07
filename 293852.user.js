// ==UserScript==
// @name        Local Time Display
// @namespace   http://bibilotik.org
// @description Display local times on hover on Btik times in table cells
// @include     http://bibliotik.org/*
// @version     3
// ==/UserScript==

// Use btik's jQuery - this line not needed for implementation in site header!
$ = unsafeWindow.jQuery;  

$('time').attr('title', function() {
        return new Date($(this).attr('datetime')).toLocaleString();
});
