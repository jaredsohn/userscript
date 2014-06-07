// ==UserScript==
// @id          noCommentTimeHack
// @name        Soundcloud comment unhacker
// @version     1.1
// @namespace   https://www.facebook.com/CavelightGames
// @author      AnorZaken
// @description Moves soundcloud comments posted before the start of the track back to the beginning of the track where they belong
// @include     http://soundcloud.com/*
// @exclude     
// @run-at      document-start
// ==/UserScript==
(function () {
    function processTimeElement(x)    {
        if(x.className == "timestamped-comment")    {
            //This will narrow the selection even further than getElementsByClassName
        
            var styleLeft = x.style.left;
            var searchRE = new RegExp('-\\d+\\.\\d+','g');
            var replace = '0.0';
            //if I set it at 0.0 it might collide with an existing comment and become
            //unviewable (bu-hu-hu...) If you are not fine with this then set it to -0.1
            
            styleLeft = styleLeft.replace(searchRE, replace);
            x.style.left = styleLeft;
        }
    }
    function noCommentTimeHack() {
        //alert("test");
        var allTimeElements = document.getElementsByClassName("timestamped-comment");
        for(var i=0; i<allTimeElements.length; i++)  {
            processTimeElement(allTimeElements[i]);
        }
    }
    function noCommentTimeHack2(mutations) {
        setTimeout(noCommentTimeHack,5000);
        //I hope this fixes the problem with loading additional tracks on the dashboard ("Show All"-button)
    }
    window.addEventListener("DOMContentLoaded",noCommentTimeHack, false);
    window.addEventListener("load",noCommentTimeHack2, false);
})() ; 