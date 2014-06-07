// ==UserScript==
// @name           Post Link
// @namespace      My Prizee
// @include        http://www.prizee.com/forum/index.php?/topic/*
// ==/UserScript==
$ = unsafeWindow.jQuery;
$('.posted_info').each(function(){$(this).html("<a href='#"+$(this).parent().parent().parent().attr('id')+"'>#</a>"+$(this).html());});