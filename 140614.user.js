// ==UserScript==
// @name       5sing改造 for Chrome
// @version    1.0
// @namespace      http://userscripts.org/scripts/show/140614
// @description  5sing enable download
// @include http://yc.5sing.com/*.html*
// @include http://fc.5sing.com/*.html*
// @include http://bz.5sing.com/*.html*
// @match http://yc.5sing.com/*.html*
// @match http://fc.5sing.com/*.html*
// @match http://bz.5sing.com/*.html*
// @domain yc.5sing.com
// @domain fc.5sing.com
// @domain bz.5sing.com
// @copyright  2012, XpAhH
// ==/UserScript==
$=parent.$;
var a=$.get(location).complete(function(){
    var s=a.responseText;
    var f=/http:\/\/.+?\.mp3/.exec(s);
    $(".rt1_a3").find("a").attr("href",f);
    $("#play").html('<audio autoplay="true" src="'+f+'" contextmenu="false" controls loop></audio>');
});