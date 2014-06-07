// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://mp.wsq.qq.com/168609973/wall/5/screen/
// @copyright  2012+, You
// @require    http://code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==

setInterval( function(){
    var str = $('.content span').eq(0).html();
    var str1 = str.substring(str.length-5, str.length);
   
    if( ! ( str1 == "#偷吃网#" ) )
    {
         $('.content span').eq(0).html( str + "#偷吃网#" );
    }
    
}, 100);