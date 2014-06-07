// ==UserScript==
// @name       Remove HobbyKing auto play daily video
// @namespace  http://mtrl.co.uk/
// @updateURL   https://gist.github.com/mtrl/7369221/raw/hobbyking-userscript-hide-daily-video.js
// @version    1.0.3
// @description Removes the annoying autoplay daily video from the home page of HobbyKing.com
// @match      http://hobbyking.com/hobbyking/store/index.asp
// @match	   http://www.hobbyking.com/hobbyking/store/index.asp
// ==/UserScript==

$(function(){
    $('#daily').remove();
});