// ==UserScript==
// @name       gplus_top_button
// @namespace  gplus_top_button
// @version    v1.0
/* @reason
 * add a return to top button for Google+
 * @end
 */
// @match     https://plus.google.com/*
// @author    wonderfuly@gmail.com
// @thankto   wong2.cn
//
// ==/UserScript==

document.getElementsByClassName("c-zh-Wf")[0].style.marginRight = "30px";
document.body.innerHTML += '<img id="top_button" src="https://lh3.googleusercontent.com/-fjyMiaMHUrg/TiOYZPSrOPI/AAAAAAAAA_Y/48jyVHIGpmA/dropbox_arrow_up.gif" style="position: fixed; right: -1px; bottom: -1px; box-shadow: 0 0 17px gray; margin-bottom: 2px;">';

document.getElementById("top_button").addEventListener("click", function(){
     var tmp_body = document.body;
     var now_scrolltop = tmp_body.scrollTop;
     var interval = setInterval(function(){
         var tmp = tmp_body.scrollTop;
         if(tmp <= 0){
             clearInterval(interval);
         } else {
             tmp_body.scrollTop = tmp - 200;
          }
     }, 1);
}, false);
