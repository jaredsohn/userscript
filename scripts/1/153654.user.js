// ==UserScript==
// @name           Youtube Enlarger
// @description    Makes the new YouTube from December 2012 to an awesome center aligned YouTube instead!
// @include        http://*.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        https://*.youtube.com/watch*
// @include        https://youtube.com/watch*
// @version        1.0
// ==/UserScript==
 
var script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.textContent += [
        function resizePlayer() {
        videoDiv = document.getElementById('watch7-player');
        videoDiv.setAttribute('style', 'width: 1280px !important; height: 750px !important;');
                videoDiv2 = document.getElementById('watch7-video');
        videoDiv2.setAttribute('style', 'left:0px !important; width: 1280px !important; height: 750px !important;');
        leftDiv = document.getElementById('guide');
        leftDiv.setAttribute('style', 'display: none !important;');
                videoCont = document.getElementById('watch7-video-container');
        videoCont.setAttribute('style', 'background-color: #2b2b2b !important;padding-top:0px !important;');
                Content = document.getElementById('watch7-main');
        Content.setAttribute('style', 'width:1280px !important; left:0px !important;');
                Content2 = document.getElementById('watch7-content');
        Content2.setAttribute('style', 'width:1095px !important; left:0px !important;');
               
               
               
                document.body.className = document.body.className.replace('site-left-align','site-center-align');
        }
       
       
].join('\n');
script.textContent += "resizePlayer();\n";
var body = document.getElementsByTagName('body')[0];
body.appendChild(script);
