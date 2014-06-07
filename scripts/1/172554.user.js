

    // ==UserScript==
    // @name        randomizuj posty
    // @namespace   kuragen.gov
    // @include     http://www.karachan.org/*
    // @include     http://karachan.org/*
    // @require     http://code.jquery.com/jquery-2.0.2.min.js
    // @version     1
    // ==/UserScript==
     
    $(document).ready(function() {
     
      var posty = new Array();
      var obrazki = new Array();
      var sadol = 0;
     
      $('blockquote').each(function(){
         posty[sadol] = $(this).html();
         sadol++;    
      });
      sadol = 0;
      $('img.thumb').each(function(){
         obrazki[sadol] = $(this).attr('src');
         sadol++;
      });  
     
      var cipuszka = posty.length -1;
      var pisiorek = obrazki.length -1;
     
      $('blockquote').each(function(){
        var azuszmata = Math.round(Math.random()*cipuszka);
        $(this).html(posty[azuszmata]);
        delete posty[azuszmata];
        cipuszka--;
      });
     
      $('img.thumb').each(function(){
        var mioboge = Math.round(Math.random()*pisiorek);
        $(this).attr('src', obrazki[mioboge]);
        $(this).removeattr('width');$(this).removeattr('height');
        delete obrazki[mioboge];
        pisiorek--;
      });  
     
    });

