// ==UserScript==
// @name        Strims.pl - StyleSwitcher
// @namespace   http://userscripts.org/users/520005
// @description Jeżeli strim posiada styl - światło jest zapalone, jeżeli go nie posiada - światło gaśnie.
// @include     *strims.pl*
// @version     1
// ==/UserScript==
function is_styled(){
    var css = $("#strim_style").attr("title");
   
    if( css != undefined )
        return true;
        
    return false;
}
function main(){
    if( !is_styled() ){
        $("link").last().after('<link id="night_style" title="styl_nocny" type="text/css" href="http://strims.pl/media/css/index_night_4_1_5.css" rel="stylesheet" />');
    }
}
main();