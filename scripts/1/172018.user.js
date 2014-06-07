// ==UserScript==
// @name       Youjizz video downloader
// @namespace  http://xinix.co.id/
// @version    0.1
// @description  Youjizz video downloader
// @match      http://www.youjizz.com/*
// @copyright  2012+, mecoolabiz
// @include http://code.jquery.com/jquery-1.10.1.min.js
// ==/UserScript==

var segments = location.pathname.split('/');
if (segments[1] == 'videos' && segments[2] == 'embed') {
   	var $embed = $('embed');
    var vars = $embed.attr('flashvars').split('&');
    var oVars = {};
    for(var i in vars) {
        var v = vars[i].split('=');
     	oVars[v[0]] = decodeURIComponent(v[1]); 
    }
    
    var $top = window.top.$('body');
    $top.append('<div class="gm-downloader"><a href="' + oVars.file + '">Download</a><input type="text" value=\'wget -c "' + oVars.file + '" -O "' + window.top.$('title').html() + '.flv"\' /></div>');
    $top.append('<style> .gm-downloader { background-color: red; position: fixed; top: 0; left: 0; z-index: 1000; right: 0; } .gm-downloader * { display:block; margin: 5px; color: white; text-decoration:none; font-size: 15px; font-weight: bold } .gm-downloader input { background-color: black; border: 1px solid blue; width: 100%; box-sizing: border-box; margin: 5px 0; } </style>');    
}

