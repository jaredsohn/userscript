// ==UserScript==
// @name       Putlocker
// @version    1.0
// @description  Get files quicker
// @match      http://*.putlocker.com/file/*
// ==/UserScript==

window.addEventListener('load', function()
{
    // Block ads
    document.onclick = null;
    document.body.onclick = null;
    
    // "Continue as Free User" button
    var butt = document.getElementById('submitButton');
    
    // Screen 1
    if(butt)
    {
        // Click "Continue as Free User"
        butt.removeAttribute('disabled');
    	butt.click();
    }
   	
    // Screen 2
    else
    {
        // Click "Download File"
        document.onclick=play_video('play');
    }
});