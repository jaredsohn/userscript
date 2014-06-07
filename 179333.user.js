// ==UserScript==
// @name        Restore old Google top menu bar
// @include     https://www.google.*
// @include     https://maps.google.*
// @include     https://play.google.*
// @include     https://news.google.*
// @version     1.01
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

var googlePlusName = $('[href*="https://plus.google.com/"]:first').text();

var style = ''
+'.google_bar {color:#fff; background-color: #2D2D2D; position:absolute; top:0; left:0; width:100%; height:40px;}'
+'.google_bar a, .google_bar a:visited {color:#bbb; padding:8px; text-decoration:none; font-weight:bold; line-height:24px; position:relative; top:8px;}'
+'.google_bar a:hover {color: #fff;}';

var divGoogleBar = '<div class="google_bar">'
+'<a href="https://plus.google.com/">'+googlePlusName+'</a>'
+'<a href="https://www.google.com">Web</a>'
+'<a href="https://www.google.com/imghp">Images</a>'
+'<a href="https://maps.google.com">Maps</a>'
+'<a href="https://play.google.com">Play</a>'
+'<a href="https://www.youtube.com">YouTube</a>'
+'<a href="https://www.google.com/news">News</a>'
+'<a href="https://mail.google.com">Gmail</a>'
+'<a href="https://drive.google.com">Drive</a>'
+'<a href="https://www.google.com/calendar">Calendar</a>'
+'<a href="https://translate.google.com">Translate</a>'
+'<a href="https://www.google.com/shopping">Shopping</a>'
+'</div>';

if(!$('li.gbt').length) { //if there isn't a top menu bar
    $('head').append('<style>'+style+'</style>');
    if($('div:first').attr('id')=='cst') { //images page
        $('#main, #mngb').css('position','relative');
        $('#main, #mngb').css('top','40px');    
    } else {
        $('div:first').css('position','relative');
        $('div:first').css('top','40px');    
    }
    $('body').append(divGoogleBar);
}
