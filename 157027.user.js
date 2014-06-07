// ==UserScript==
// @name        YouTube - Prettier Playlist
// @namespace   http://userscripts.org/users/SystemDisc
// @description Changes the location of the title of the playlist and makes the list of videos less obtrusive
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @include     https://*.youtube.com/watch*&list=*
// @include     http://*.youtube.com/watch*&list=*
// @grant       none
// @downloadURL	https://userscripts.org/scripts/source/157027.user.js
// @updateURL	https://userscripts.org/scripts/source/157027.meta.js
// @version     1.02
// ==/UserScript==

$ = jQuery.noConflict(true); //stop jQuery from breaking the page if it already uses a $ var

if($("#playlist").length < 1)
{
	return; // don't run the script if @include matches, but you're not actually in a playlist
}

$("#body-container").css("position","relative");
$("#body-container").css("top","35px");

$("#watch7-playlist-bar-toggle-button").css("display","inline-block"); // make sure playlist has toggle button enabled


if(unsafeWindow.scrolltoloaded == 1)
{
	$("#testb").css("left","47px"); // fix scroll-to-vid button if using that script
}

function setPlBar() {
    if(typeof $("#watch7-playlist-data .watch7-playlist-bar")[0] !== "undefined") {
        $("#watch7-playlist-data .watch7-playlist-bar").attr("id","watch7-playlist-bar");
        $("#watch7-playlist-data .watch7-playlist-bar").removeClass("watch7-playlist-bar");
        $("#watch7-playlist-bar").css("position","fixed");
        $("#watch7-playlist-bar").css("width","100%");
        $("#watch7-playlist-bar").css("height","34px");
        $("#watch7-playlist-bar").css("border-top","1px solid #2b2b2b");
        $("#watch7-playlist-bar").css("height","34px");
        $("#watch7-playlist-bar").css("z-index","3");
        $("#watch7-playlist-bar").css("top","0");
        $("#watch7-playlist-bar").css("left","0");
        $(".watch7-playlist-bar-left .title").css("margin-left","70px");
        $(".watch7-playlist-bar-right").css("position","fixed");
        $(".watch7-playlist-bar-right").css("right","0");
        $(".watch7-playlist-bar-left").css("width","100%");
        
        $("#watch7-playlist-tray-container").css("position","fixed");
        $("#watch7-playlist-tray-container").css("top","34px");
        $("#watch7-playlist-tray-container").css("right","0");
        $("#watch7-playlist-tray-container").css("left","auto");
        $("#watch7-playlist-tray-container").css("width","400px");
        $("#watch7-playlist-tray-container").css("margin-right","0");
        
        $("#content").css("top","50px");
        $("#content").css("position","relative");
        $("#watch7-main-container").css("position","relative");
        $("#watch7-main-container").css("top","-50px");
    }
}
setPlBar();

unsafeWindow.setInterval(setPlBar, 250);

unsafeWindow.prettyplaylistloaded = 1; // let similar scripts know this script is loaded
