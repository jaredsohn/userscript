// ==UserScript==
// @name        Google Chrome Status Bar
// @namespace   Google Chrome Status Bar
// @license 	Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
// @include     *
// @version     1.0.1
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @grant       GM_getValue
// @grant       GM_setValue
// @run-at      document-end
// ==/UserScript==
function StatusBar(url, xpos){
    if( xpos <= ($(window).width() / 2)){
    	left = "50%";
    } else {
    	left = "0";
    }
    $('body').append( "<p id=\"Yi09l4M35v\" style=\"z-index:1000000;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;position:fixed;bottom:0;left:"+left+";width:50%;background:#d0d0d0;border-top:1px solid #000;margin:0;padding:3px;font-size:x-small;font-familt:Arial, Helvetica, sans-serif;font-size:12px;\" >" + url + "</p>" );
}
$('a')
.mouseover(function(e){
    StatusBar( $(this).attr('href'), e.pageX );    
})
.mouseout(function(){
    $('#Yi09l4M35v').remove();
});
$('a[onclick]')
.mouseover(function(e){
    StatusBar( $(this).attr('onclick'), e.pageX );   
})
.mouseout(function(){
    $('#Yi09l4M35v').remove();
});