// ==UserScript==
// @name          Me11e1
// @namespace     tes11
// @description   tes21
// @include       http://turbocashsurfin.com/*
// @include       http://turbocashsurfin.com/Surf_Ads.php*
// @include       http://turbocashsurfin.com/Surfer.php*
// @include       http://turbocashsurfin.com/Surfer.php
// @version       0.0.1121
// @author        Yuda
// ==/UserScript==

var seconds=5;
var flag=false;

$(document).ready(function(){
if (!flag)
Visibility.every(100, tick);

function tick()
{
      display();

        if (seconds>15)
        {
         seconds--;
        }
        else
        {
          if (!flag){
          document.getElementById('more').style.visibility='visible';
          flag=true;
          }
        }
}
function display()
{
   $("#timer").html(seconds);
}
});
