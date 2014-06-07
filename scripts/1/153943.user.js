// ==UserScript==
// @name          Myspace Music Unstopper 
// @namespace     http://a32.virtualnezahorie.sk
// @version       0.2
// @description   Removes the "are you still listening popup, and resumes music" 
// @match         http://*.myspace.com/music/*
// @copyright     2012+, SkrabakL
// @twitter       SkrabakL
// @facebook      SkrabakL
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==
function checkForIT(a)
{
    
    if( jQuery('.stillListening.cover.dialog')[0] != undefined )
        //if( jQuery('.pauseCirclePlayerIcon27')[0] == undefined )
    {
        jQuery('.stillListening.cover.dialog .stillListening button').click();
        if( jQuery('.stillListening.cover.dialog')[0] != undefined )
        {
            jQuery('.stillListening.cover.dialog').removeClass('dialog').removeClass('stillListening');
        }

        jQuery('li.togglePlay button').click();
                   
        setTimeout(function(){ checkForIT(false); }, 500);
        
        if( a == false ) 
            console.log('unpaused, overlay hidden');
        //else
            //alert('unpaused, overlay hidden');
    }
    else{
        setTimeout(function(){ checkForIT(false); }, 500);
        
        if( a == false )
            console.log('no overlay');
        //else
            //alert('no overlay');
        
    }
}
jQuery(document).ready(function(){
    checkForIT(true);
    jQuery('li.togglePlay button').click();
});
