// ==UserScript==
// @name        Better Youtube
// @namespace   Better Youtube
// @description Better Youtube
// @grant       none
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @version     1.0.4
// ==/UserScript==


      //setTimeout(function(){alert("Hello")},3000);
      //setTimeout(initApplication(),3000);



checkLoad();
function checkLoad()
{
    if (document.readyState == "complete"){
     	initApplication();
    } 
    else{
        setTimeout(checkLoad, 100)
        //alert("fail");
    }
}




function initApplication(){
    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    
    function size360(){
        var playerapi = document.getElementById("player-api");
        playerapi.setAttribute("style","margin: 0 auto !important; width: 640px !important; height: 390px !important;");
        var playerq = document.getElementById("movie_player");
        playerq.setPlaybackQuality("medium");
    }
    function size480(){
        var playerapi = document.getElementById("player-api");
        playerapi.setAttribute("style","margin: 0 auto !important; width: 854px !important; height: 510px !important;");
        var playerq = document.getElementById("movie_player");
        playerq.setPlaybackQuality("large");
    }
    function size720(){
        var playerapi = document.getElementById("player-api");
        playerapi.setAttribute("style","margin: 0 auto !important; width: 1280px !important; height: 750px !important;");
        var playerq = document.getElementById("movie_player");
        playerq.setPlaybackQuality("hd720");
    }
    function sizecont(){
        var playerapi = document.getElementById("player-api");
        playerapi.setAttribute("style","margin: 0 auto !important; width: 1003px !important; height: 590px !important;");
        var playerq = document.getElementById("movie_player");
        playerq.setPlaybackQuality("hd720");
    }
     
    if(document.getElementById("yt-masthead")){
        var header = document.getElementById("yt-masthead");
        if (header != null)
        {
            header.setAttribute("style","max-width: 1003px; margin: 0 auto !important;");
        }
    }
    
    
    
    if(document.getElementById("page")){
        var className=document.getElementById("page").getAttribute("class");
        if (className=="  watch   clearfix"){ 
            
            var guide = document.getElementById("guide");
            guide.setAttribute("style","display:none !important");
            
            var page = document.getElementById("page");
            page.setAttribute("style","max-width: 1300px !important; margin: 0 auto !important;");
            
            var player = document.getElementById("player");
            player.setAttribute("style","max-width: 1300px !important; margin: 0 auto !important; padding-left: 0 !important;");
            
            
            var BY_controll1 = document.createElement("div");
            BY_controll1.innerHTML = '<div id="BY_controll"><div id="s360">360p</div><div id="s480">480p</div><div id="s720">720p</div><div id="scont">content size</div></div>';
            insertAfter(player, BY_controll1);
                    
            var BY_controll = document.getElementById("BY_controll");
            BY_controll.setAttribute("style","margin: 0 auto !important; width: 700px !important;padding-top: 5px;overflow:hidden;");
            
            var s360 = document.getElementById("s360");
            s360.setAttribute("style","width: 40px !important;height: 17px !important;margin: 0 5px;float: left;padding-top: 5px;text-align: center;border: 2px solid rgba(0,0,0,0.5); cursor:pointer");
            
            var s480 = document.getElementById("s480");
            s480.setAttribute("style","width: 40px !important;height: 17px !important;margin: 0 5px;float: left;padding-top: 5px;text-align: center;border: 2px solid rgba(0,0,0,0.5); cursor:pointer");
            
            var s720 = document.getElementById("s720");
            s720.setAttribute("style","width: 40px !important;height: 17px !important;margin: 0 5px;float: left;padding-top: 5px;text-align: center;border: 2px solid rgba(0,0,0,0.5); cursor:pointer");
            
            var scont = document.getElementById("scont");
            scont.setAttribute("style","width: 100px !important;height: 17px !important;margin: 0 5px;float: left;padding-top: 5px;text-align: center;border: 2px solid rgba(0,0,0,0.5); cursor:pointer");
            
            var watch7sidebar = document.getElementById("watch7-sidebar");
            watch7sidebar.setAttribute("style","margin-top: 0 !important;");
            
            var watch7maincontainer = document.getElementById("watch7-main-container");
            watch7maincontainer.setAttribute("style","margin: 0 auto !important; padding-left: 0 !important;max-width: 1003px;");
            setTimeout(function() {
                var playerapi = document.getElementById("player-api");
                    playerapi.setAttribute("style","margin: 0 auto !important; width: 1003px !important; height: 590px !important;");
                setTimeout(function() {
                    var playerq = document.getElementById("movie_player");
                    playerq.setPlaybackQuality("hd720");
                },1500);
            },300);
            
            
            var s360 = document.getElementById("s360");
            s360.onclick = size360;
            
            var s480 = document.getElementById("s480");
            s480.onclick = size480;
            
            var s720 = document.getElementById("s720");
            s720.onclick = size720;
            
            var scont = document.getElementById("scont");
            scont.onclick = sizecont;
        }
        else if (className=="  channel clearfix"){
            var page = document.getElementById("page");
            page.setAttribute("style","max-width: 1300px; margin: 0 auto !important;"); 
        }
        else{
            var page = document.getElementById("page");
            page.setAttribute("style","max-width: 1003px; margin: 0 auto !important;"); 
        }
    }
    
    
    
    
    if(document.getElementById("baseDiv")){
        var baseDiv = document.getElementById("baseDiv");
        baseDiv.setAttribute("style","max-width: 1003px; margin: 0 auto !important;");
    }
    if(document.getElementById("masthead-subnav")){
        var masthead_subnav = document.getElementById("masthead-subnav");
        masthead_subnav.setAttribute("style","max-width: 1003px; margin: 0 auto !important;");
    }
    if(document.getElementById("footer-hh")){
        var footer = document.getElementById("footer-hh");
        footer.setAttribute("style","max-width: 650px; margin: 0 auto !important;");
    }
    if(document.getElementById("footer")){
        var footer = document.getElementById("footer");
        footer.setAttribute("style","max-width: 650px; margin: 0 auto !important;");
    }
}    