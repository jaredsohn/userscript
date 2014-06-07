// ==UserScript==
// @name       dlEHtrAuto
// @namespace  http://downloadEHTorrentsAuto/
// @version    0.1
// @description  When you click the arrow icon what_you_know, it will click the download link if download link has only one, and alert when it has more than one choice.
// @match      http://g.e-hentai.org/gallerytorrents.php*
// @match      http://exhentai.org/gallerytorrents.php*
// @require    http://code.jquery.com/jquery-1.8.1.min.js
// @copyright  2014, JMNSY
// ==/UserScript==
$().ready(function(){
    if($("form").length > 2){
        alert("Do this first please!");
    }
    else{
        $("a").get(0).click();
    }
});