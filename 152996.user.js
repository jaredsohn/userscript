// ==UserScript==
// @name       Youtube repeat
// @namespace  http://santhosh.cc/
// @version    0.1
// @description  Youtube repeat
// @match      http://www.youtube.com/*
// @match https://www.youtube.com/*
// @copyright  2012+, Santhosh Kumar Balakrishnan
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require http://osric.com/chris/iaccess/js/shortcut.js
// @require http://malsup.github.com/jquery.blockUI.js
// ==/UserScript==
var isR = 0;
var iVar = 0;
shortcut.add("Shift+r",function() {
    if(isR == 0)
    {
        iVar = setInterval(stateChanged,1000);
        $.growlUI('Repeat ON', ''); 
    }
    else
    {
        clearInterval(iVar);
        $.growlUI('Repeat OFF', ''); 
    }
    isR = 1 - isR;
    
});
function stateChanged()
{
	if(movie_player.getPlayerState()==0)
    {
        movie_player.seekTo(0,true);
        movie_player.pauseVideo();
        movie_player.playVideo();
    }
}