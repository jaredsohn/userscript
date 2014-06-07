// ==UserScript==
// @name          Meme
// @namespace     tes
// @description   tes
// @include       http://turbocashsurfin.com/*
// @include       http://turbocashsurfin.com/Surf_Ads.php*
// @include       http://turbocashsurfin.com/Surfer.php*
// @version       0.0.11
// @author        Yuda
// ==/UserScript==

var seconds=5;
var flag=false;

$(document).ready(function(){
if (!flag)
Visibility.every(1000, tick);



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
