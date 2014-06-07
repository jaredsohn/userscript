// ==UserScript==
// @name        goread.io tweet
// @namespace   goread
// @description Share links in twitter direclty from goread.io 
// @include     http://www.goread.io/*
// @version     1
// ==/UserScript==



function attach(){
    $('.story-date').append('<a class="twitter" href="#"><i class="icon-retweet"></i></a>');
}



$(document).on('click', 'a.twitter', function () {
    
        var $link = $(this).parent().prev('.story-title').children('a');
        var $title = $link.text();
        var $url = $link.attr('href');
        
    
        
        var a = "https://twitter.com/intent/tweet?url=" + encodeURIComponent($url) +
                "&text=" + encodeURIComponent($title); 

        var D = 550,
            A = 450,
            C = screen.height,
            B = screen.width,
            H = Math.round((B / 2) - (D / 2)),
            G = 0,
            F = document,
            E;
          if (C > A) {
            G = Math.round((C / 2) - (A / 2))
          }

          window.open(a, '',
            'left=' + H + ',top=' + G +
            ',width=' + D + ',height=' + A +
            ',personalbar=0,toolbar=0,scrollbars=1,resizable=1');
          return false;
    });


$('#refresh').on('click', attach);
attach();

