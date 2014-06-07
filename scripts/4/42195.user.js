// ==UserScript==
// @name           Elven blood grinder updated
// @namespace      elvenblood
// @description    After a timed period presses a button on elven blood facebook, i did not create this script, i merely adjusted the timing, and added a delay for the intersitial redirect to sochai's script
// @include        http://apps.new.facebook.com/elvenblood/quests.php
// @include        http://apps.facebook.com/elvenblood/quests.php
// @include        http://apps.new.facebook.com/elvenblood/interstitial.php
// @include        http://apps.facebook.com/elvenblood/interstitial.php
// ==/UserScript==

var runs = 0;
var fc=0;
var ec=0;


//check if the intersitial advert page has appeared (http://apps.new.facebook.com/elvenblood/interstitial.php)
var delay = Math.floor(Math.random()*45 + 15)
var href = window.location.href;
if(href.indexOf("interstitial") > 1){
  //if it has, redirect to quests page after a delay of between 15 and 60 seconds
  setTimeout ( window.location = href.replace("interstitial","quests"), delay) ;
}


//wait 300 seconds plus a random amount between 0 and 60
var random=Math.floor(Math.random()*61)
var timeToWait = 300000 + (random * 1000)
var timeLeft = timeToWait;

//Start count down and show in title bar
window.setTimeout(function() { startCountDown() }, 1000);

//countdown
function startCountDown(){
  document.title = (timeToWait / 1000) + " seconds till auto-click";
  timeToWait = timeToWait - 1000;
  if(timeToWait > 0){
    window.setTimeout(function() { startCountDown() }, 1000);
  }else{
    pressButton();
  }
}

//look for the first button to say 'Do quest' and press it 
<input type="submit" value="Do quest" />
function pressButton(){
  runs++;
  document.title = "run:" + runs + ", form:" + fc + ", element:" + ec;
  //get all forms
  var arForms = document.getElementsByTagName("form");
  //loop through
  for (fc =0; fc < arForms.length; fc++) {
    document.title = "run:" + runs + ", form:" + fc + ", element:" + ec;
    //get all inputs
    var arInputs = document.forms[fc].elements;
    //loop through
    for (ec = 0; ec< arInputs.length; ec++) {
      document.title = "run:" + runs + ", form:" + fc + ", element:" + ec;
      //if value = Do quest
      if(document.forms[fc].elements[ec].value=="Do quest"){
        document.title = "run:" + runs + ", form:" + fc + ", element:" + ec;
      document.forms[fc].elements[ec].value="Questing";
        document.forms[fc].submit();
        return(true);
      }//Do Quest
    }//inputs
  }//forms
}//function