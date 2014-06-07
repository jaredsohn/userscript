// ==UserScript==
// @name           Reload Every
// @namespace      ALL
// @description    reloads every user set amount of minutes, on every page you visit.  will hold off on reloading while typing, or active on a page, will check if there is a page available to reload.
// @include        http://*
// @include        https://*
// ==/UserScript==

var minutes="10"    // edit this variable only

//============


var xmlhttp=false;
try
{
   xmlhttp = new XMLHttpRequest();
} 
catch (e) 
{
   xmlhttp=false;
};


function refreshpage()
{
 xmlhttp.open("HEAD", window.location.href,true);
 xmlhttp.onreadystatechange=function() {
  if (xmlhttp.readyState==4) {
   if (xmlhttp.status==200) window.location.reload()
    else if (xmlhttp.status==404) time = setTimeout(function() { refreshpage() },1000*60*(minutes*.5));
     else {time = setTimeout(function() { refreshpage() },1000*60*(minutes*.5)); alert("The URL Status is 

"+xmlhttp.status+"reload script will try again in "+minutes+" minutes")}
  }
 }
 xmlhttp.send(null)
};

var time = setTimeout(function() { refreshpage() },1000*60*minutes);
var timecount = 0;
var intervalID = window.setInterval(function() { timecount++; }, 1000*60);
function reset()
{
   if(timecount >= (minutes*.5))
   {
      clearTimeout(time);
      time = setTimeout(function() { refreshpage() },1000*60*(minutes*.5));
   };
};
document.addEventListener("click", function(){ reset(); }, false);
document.addEventListener("keyup", function(){ reset(); }, false);
if (minutes<2)
{
alert('You have the time of reloading set to less than 2 minutes.  this is not recommended, please set it to at least 2 

minutes');
minutes = 2;
};