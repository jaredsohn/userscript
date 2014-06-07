// ==UserScript==
// @name           Change colors of dpreview.com 
// @namespace      http://www.sebfoto.de
// @description    Changes the foreground and background color plus the line height to make is easier on the eyes
// @include        http://www.dpreview.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js
// @version       1.0
// ==/UserScript==
(function() {
    // foreground color
    var fgcolor = '#111111';
    // background color
    var bgcolor = '#eeeeee';
    // line height
    var lh = '150%';
    $('#mainContent').css( 'background', bgcolor );
    $('body').css( { 'color': fgcolor, 'line-height': lh });
    $('body').css( { 'background-color': '#fff', 'background-image': 'none' });
    
    $('.scoring').css('color', '#fff');
    $('.propertyValue').css('color', '#fff');
    $('head').append( "<style type=\"text/css\">th { color: white; } a { color: #000000; } </style>" );
    function studioCompareBG() {
        jQuery(".masterContainer").css({ 'backgroundColor': 'white'});
            
    }
    window.setTimeout( studioCompareBG, 3000 );
    
})();