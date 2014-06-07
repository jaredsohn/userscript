// ==UserScript==
// @name          Client Upgrade for DelphiMaster
// @namespace     http://roman.yankovsky.me
// @description   Image embedding, HTTPS-links and post references activation
// @version       2011.11.25
// @include       http://delphimaster.ru/cgi-bin/forum.pl*
// @include       http://*.delphimaster.ru/cgi-bin/forum.pl*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

(function() {

  if ($(location).attr('href').indexOf('id=', 0) >= 0)
    $('blockquote').html($('blockquote').html().replace(/<small>\[(\d+)\]<\/small>/mgi,
         "<small>[$1]</small><a id=\"post-link-$1\" name=\"$1\"></a>"));

  $('blockquote p').each(function() {
            $(this).html($(this).html().replace(/(https:\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?)/gi,
               "<a href=\"$1\" target=\"_blank\">$1</a>"));

            $(this).html($(this).html().replace(/>(https?:\/\/[\w\d\.\-\/\_\+\?\&]+?\.(png|jpg|gif|jpeg))</gi, "><br><img class=\"automated\" src=\"$1\"\/><"));

            $(this).html($(this).html().replace(/(\s|>|\;)\[(\d+)\](\s|<|\.|\,|\?|\!|\:|\;)/mgi,
               "$1<a class=\"local-post\" href=\"#$2\">[$2]</a>$3"));

        });

  if ($(location).attr('href').indexOf('p=', 0) >= 0)
    $('a.local-post').each(function() {     
              var postNum = parseInt($(this).attr('href').split('#')[1], 10);
              var pageNum = Math.ceil((postNum + 1)/ 20);

              $(this).attr('href', $(location).attr('href').replace(/p\=(\d+)/gi, 'p='+pageNum).split('#')[0] + $(this).attr('href'));

          });  

  $('p img.automated').load(function () {
           if ($(this).width() > 600)
             $(this).width(600);
       });

  if ($(location).attr('href').indexOf('#', 0) >= 0) 
          window.location.hash = '#' + $(location).attr('href').split('#')[1];

})();