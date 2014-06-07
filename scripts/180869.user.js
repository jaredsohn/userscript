// ==UserScript==
// @name        Download Nuget Package
// @namespace   NuGet
// @description Download the nuget package directly
// @include     https://www.nuget.org/packages/*
// @include     http://www.nuget.org/packages/*
// @version     1
// @grant       none
// ==/UserScript==

(function(w,$){

  $(function(){  
    var pkg = $('.nuget-badge p code').text().match(/Install-Package (\w+(?:\.\w+)*)/)[1],
        ver = $('.page-heading h2').text();
    $('<li>',{
      html: $('<a>',{
        'href': 'https://www.nuget.org/api/v2/package/' + pkg + '/' + ver,
        'text': 'Download nupkg'
      })
    }).appendTo('#sideColumn nav ul');
  });

})(unsafeWindow,unsafeWindow.jQuery);