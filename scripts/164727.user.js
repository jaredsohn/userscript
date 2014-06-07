// ==UserScript==
// @name YTAlign
// @description	Allows users to set the alignment of Youtube videos
// @namespace	http://sapium.net
// @version 0.8.2
// @include *youtube.com/watch?*v=*
// @updateURL http://userscripts.org/scripts/source/164727.meta.js
// @downloadURL http://userscripts.org/scripts/source/164727.user.js
// @grant none
// ==/UserScript==

function onClickRightAlign(){
        var videoDiv = document.getElementById("watch7-container");
        
        if(videoDiv.getAttribute("style") == ""){
            videoDiv.setAttribute("style", "position: relative; left: -130px;");
        }else{
            videoDiv.setAttribute("style", "");    
        }           
    }

window.addEventListener("load", function(e) {
    function makeButton(){
        var alignButton = document.createElement('button');
        alignButton.setAttribute("role", "button");
        //alignButton.setAttribute("style", "float:right;margin-top:15px;margin-right:50px");
        alignButton.setAttribute("class", "yt-uix-button yt-uix-button-hh-default");
        alignButton.setAttribute("id", "YTAlign-button")
        alignButton.innerHTML = "<span style=\"font-size:180%\">&#8676;</span>";
    
        var target = document.getElementById("watch-context-container");
        target.parentNode.insertBefore(alignButton, target.nextSibling);
        document.getElementById("YTAlign-button").addEventListener('click', onClickRightAlign, false);
    }
    
    makeButton();
}, false);

//Add <button role="button" style="float:right;" class="yt-uix-button yt-uix-button-default"><span>Test Button</span></button>
//after div#content > div#watch-container > div#watch-headline-container > div#watch-headline > div#watch-headline-user-info > button#watch-mfu-button

//Change
/*
  .watch-headline, #watch-headline, #watch-video, #watch-main {
       margin: 0 auto;
  }
  
  to
  
  //Left align
  .watch-headline, #watch-headline, #watch-video, #watch-main {
      margin: 0;
  }
  
  //Right align
  .watch-headline, #watch-headline, #watch-video, #watch-main {
      margin: $page-width - 58px
  }
*/
