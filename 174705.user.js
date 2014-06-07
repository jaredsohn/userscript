// ==UserScript==
// @name        Hf Shortcuts
// @author        ShadowCloud
// @namespace   HF
// @include     http://www.hackforums.net*
// @version     1
// ==/UserScript==

//global check for Shift
var isShift = false;
document.onkeyup=function(e) {
    if(e.which == 16) 
        isShift=false;
}

//Bind for shift + 1
document.onkeydown=function(e){
        if(e.which == 16) 
            isShift=true;
        if(e.which == 49 && isShift == true) {
            //You can change the URL here
            window.location.href = "http://www.hackforums.net/usercp.php";
            isShift=false;
         return false;
    }
    //Bind for shift + 2
    if(e.which == 50 && isShift == true) {
            //You can change the URL here :Default your threads
            window.location.href = "http://www.hackforums.net/forumdisplay.php?fid=134";
            isShift=false;
         return false;
    }
    //Bind for shift + 3
    if(e.which == 51 && isShift == true) {
            //You can change the URL here :Default your posts
            window.location.href = "http://www.hackforums.net/forumdisplay.php?fid=162";
            isShift=false;
         return false;
    }    
    
    //Bind for shift + 4
    if(e.which == 52 && isShift == true) {
            //You can change the URL here :Default New Posts
            window.location.href = "http://www.hackforums.net/forumdisplay.php?fid=52";
            isShift=false;
         return false;
    }

    //Bind for shift + 5
    if(e.which == 53 && isShift == true) {
            //You can change the URL here :Private messages
            window.location.href = "http://www.hackforums.net/private.php?action=tracking";
            isShift=false;
         return false;
    }    
    
}