// ==UserScript==
// @name       JKAnime Prettify
// @namespace  GothSpace
// @version    0.2
// @description  Script para ajustar video y remover ads - actualizado 23/Abr/14 - Script to adjust video and remove ads
// @match      *jkanime.net/*/*/
// @copyright  gothike
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

function refreshElement(e)
{
    var parent = e.parent();
    e.remove();
    e.appendTo(parent);
}

function adjustJkAnime()
{
    //Remove right bar
    var moveboxr = $( "#moveboxr" );
    moveboxr.remove();
    
    // Do adjustments
    $(".video_actions").css("float","right");
    $("#sticboxl,.videobox,.player_conte").css("width","960");
    $(".player_conte").css("height","640");
    $("#myDIV,.publibox,.header_text").remove();
    $("div").each(function() {
        if($(this).css('z-index')=='50') {
                $(this).remove();
        }
	});
    $("#head_pb").remove();
    $("a").each(function(){
    	var s = $(this).attr("href");
        if(s.indexOf("ads") > -1){
        	$(this).remove();
        }
    });
}

window.onload = function() {
	setTimeout(adjustJkAnime, 10);
};