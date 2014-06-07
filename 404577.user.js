// ==UserScript==
// @name        Dpreview Recent comments - link directly to unread
// @namespace   http://userscripts.org/users/lorriman
// @match       http://www.dpreview.com/members/*/forums/recent
// @match       http://www.dpreview.com/forums/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     .2

// ==/UserScript==



function debug(s,label)
{ 	
    label = label || '';
    if(label){
        label=label+': ';
    }
    console.debug('Exif 2014 - '+label+s);
    return s;
}

function debugb(s,label){
    
    label = label || '';
    if(label){
        label='<div>'+label+': '+'</div>';
    }
    $('body').prepend(label+'<pre>'+s+'</pre>');
}

debug('loaded');

$('table.forumThreads tr.thread td.date a').each(function(index,el){
   $e=$(el);
    href=$e.attr('href');
	href=href.replace('redirect-last-post','redirect-unread');
    $e.attr('href',href);
    
});


$('table.threadsList tr.thread a.date').each(function(index,el){
   $e=$(el);
    href=$e.attr('href');
    href=href.replace('redirect-last-post','redirect-unread');
    $e.attr('href',href);
    
});