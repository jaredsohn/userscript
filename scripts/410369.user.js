// ==UserScript==
// @name      MyShows.ru search links helper v1.0
// @description This adds some links to popular search engines to help find new episodes
// @namespace MyShows.ru search links helper
// @include   http://myshows.ru/profile/*
// @grant       none
// @version   1.1

// ==/UserScript==

$(document).ready(function() 
{
    var links = [
    'http://torrentz.eu/anyA?f=%s',
    'http://notabenoid.com/search?t=%s',
    'http://rutracker.org/forum/tracker.php?nm=%s',
    'http://newstudio.tv/tracker.php?nm=%s',
    'http://nnm-club.me/forum/tracker.php?nm=%s',
    'http://rutor.org/search/%s',
    'http://kinozal.tv/browse.php?s=%s',
    'http://brb.to/search.aspx?search=%s',
    'http://tree.tv/search/index?usersearch=%s',
    'http://bigcinema.tv/search/topics?q=%s',
    'http://yandex.ua/yandsearch?&text=%s',
    'https://www.google.com.ua/#q=%s'
];
	var serial_name = new Array();
    //alert(serial_name);
    ll = links.length;
   
    $("div.bserial > h4 > a").each(function( i ) {
    serial_name.push($( this ).text().replace(/ /g, '%20'));
    });

    $("div.bserial > h4").each(function( i ) {
    for (var j=0;j < ll; j++)
         {   
             var url =  links[j];
             var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
			 var domain = matches && matches[1];
          $(this).append(' '+' | '+' ' + '<a href='+links[j]+' target="_blank"'+'><img src=http://favicon.yandex.net/favicon/'+domain+' width="16" height="16"></a>');
             
         }
    }); 
    
    $("div.bserial > h4").each(function( i ) {
        var replaced = $( this ).html().replace(/%s/g, serial_name[i]);
        $( this ).html(replaced);
    }); 

});