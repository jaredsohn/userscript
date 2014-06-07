// ==UserScript==
// @name       fantasy8 video downloader
// @namespace  http://xinix.co.id/
// @version    0.1
// @description  Youjizz video downloader
// @match      http://www.fantasy8.com/*
// @copyright  2012+, mecoolabiz
// @include http://code.jquery.com/jquery-1.10.1.min.js
// ==/UserScript==

var segments = location.pathname.split('/');
if (segments[1] == 'video') {
   	var $object = $('object');
    var file = jwplayer('mpl').config.file;
    
    var $top = $('body');
    $top.append('<div class="gm-downloader"><a href="' + file + '">Download</a><input type="text" value=\'wget -c "' + file + '" -O "' + $('title').html() + '.flv"\' /></div>');
    $top.append('<style> .gm-downloader { background-color: red; position: fixed; top: 0; left: 0; z-index: 1000; right: 0; } .gm-downloader * { display:block; margin: 5px; color: white; text-decoration:none; font-size: 15px; font-weight: bold } .gm-downloader input { background-color: black; border: 1px solid blue; width: 100%; box-sizing: border-box; margin: 5px 0; } </style>');    

}
