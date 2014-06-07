// ==UserScript==
// @name          Goread.io send by gmail
// @description   Add a send by email action link after go to page icon
// @version       1
// @author        Martín Gaitán
// @include       http://www.goread.io/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==



function attach(){
    $('.story-date').append('<a class="gmail" href="#"><i class="icon-envelope"></i></a>');
}



$(document).on('click', 'a.gmail', function () {
    
        var $link = $(this).parent().prev('.story-title').children('a');
        var $title = encodeURIComponent($link.text());
        var $url = $link.attr('href');
        var $body = $(this).parents('div[id^="storydiv"]').children('.story-content').text();
        
        var a = encodeURIComponent($url) +
            escape('\x0A' + '\x0A') + encodeURIComponent($body);
        
        var u = 'http://mail.google.com/mail/?view=cm&ui=2&tf=0&fs=1&su=' +
                $title + '&body=' + a;
        if (u.length >= 2048) {
            u = 'http://mail.google.com/mail/?view=cm&ui=2&tf=0&fs=1&su=' +
                     $title  + '&body=' + encodeURIComponent($url);
        }
          window.open(u, 'gmail',
            'height=540,width=640');
          return false;
    });


$('#refresh').on('click', attach);
attach();

