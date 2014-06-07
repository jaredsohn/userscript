// ==UserScript==
// @name          Me11e
// @namespace     tes1
// @description   tes2
// @include       http://turbocashsurfin.com/*
// @include       http://turbocashsurfin.com/Surf_Ads.php*
// @include       http://turbocashsurfin.com/Surfer.php*
// @include       http://turbocashsurfin.com/Surfer.php
// @version       0.0.112
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

        if (seconds>0)
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
