// ==UserScript==
// @name        khanacademy_amara_video
// @namespace   https://www.khanacademy.org/math/
// @description khanacademy amara video
// @version     1
// @grant       none
// @include https://www.khanacademy.org/math/*
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @run-at document-end
// ==/UserScript==


setInterval (
    function () {
        if (    this.lastPathStr  !== location.pathname
            ||  this.lastQueryStr !== location.search
            ||  this.lastPathStr   === null
            ||  this.lastQueryStr  === null
        ) {
            this.lastPathStr  = location.pathname;
            this.lastQueryStr = location.search;
            replaceAmaraVideo();
        }
    }
    , 222
);

function  replaceAmaraVideo() {
    waitForKeyElements ("div.player-container",
    function(){

         var myp = document.getElementsByClassName("player-container")[0];
         var s = document.createElement('script');
          s.type = 'text/javascript';
          s.src = 'http://s3.amazonaws.com/s3.www.universalsubtitles.org/embed.js';
          s.innerHTML = '({"video_url": "http://www.youtube.com/watch?v=' + myp.firstChild.getAttribute('data-youtubeid') + '"})';
          document.body.appendChild(s);
            
            waitForKeyElements ("span.unisubs-widget",
            function(){

                    var v=document.getElementsByClassName("video-container")[0];
                     var n=document.body.children.length;
                    var l1=document.body.children[n-3];
                    var l2=document.body.children[n-2]
                    var l3=document.body.children[n-1]
                     v.innerHTML="";
                     v.appendChild(l1);
                    v.appendChild(l2);
                    v.appendChild(l3);
              }
            ,true);
	  }
    ,true);  
}
