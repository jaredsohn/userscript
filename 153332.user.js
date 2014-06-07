// ==UserScript==
// @name       di.se cleanup by JesAde
// @namespace  http://use.i.E.your.homepage/
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @version    0.2
// @description  Cleans up di.se
// @match      http://*.di.se*
// @copyright  2012+, JesAde
// ==/UserScript==
function updateJTicker(){
    var d = new Date().getTime();
    var tags = jtickerTags.replace(/%%milli%%/g, d);
    $("div#JTickers").html(tags);
    setTimeout(updateJTicker, 60 * 1000);
}
var jtickerTags = "<img src='http://trader.di.se/borsklocka/stockholm2.png?rnd=%%milli%%' /><img src='http://trader.di.se/borsklocka/dowjones2.png?rnd=%%milli%%' />";
var $aside = $("form div.container div.threecols div.maincol div.aside");
$aside.prepend("<div id='JTickers' class='figure' style='background-color:#A7100C;padding: 10px; height:120px;overflow:hidden;'></div>");
updateJTicker();
$("form div.container div.fourthcol").remove();
    
fs = document.getElementsByTagName("FrameSet");
if(fs[0]){
	fs[0].setAttribute('rows', '0,0,*');
}
