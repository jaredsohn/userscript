// ==UserScript==
// @name        Tz auto-magnet
// @namespace   a
// @include     http://torrentz.eu/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant       GM_xmlhttpRequest
// ==/UserScript==

jQuery('.download dt:not(:first) a').each(function(){
    var url = $(this).attr('href');
    var $this = $(this);
    GM_xmlhttpRequest ( {
        method:      "GET",
        url:         url,
        onload:      function (response) {
            var magnet = response.responseText.match(/(magnet:[=:\?a-zA-Z0-9\-\._\/]+)/)[0];
            $this.parents('dl').children('dd').append('<a href="'+magnet+'"><img src="https://publichd.se/images/magnet.ico" alt="magnet"></a>');
        }
    } );
});
