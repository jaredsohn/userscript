// ==UserScript==
// @name           Elven blood grinder 0.2
// @namespace      elven
// @description    After a timed period presses a button on elven blood facebook
// @include        http://apps.new.facebook.com/elvenblood/quests.php
// ==/UserScript==

// By Sochai October 2008


// Updated by Grim December 2008
/////////////////////////////////////////////////////
var baseDelay=300; // wait for 300 seconds         //
var randDelay=30;  // plus a random 1->30 seconds  //
var quest=2;       // then do the second quest     //
/////////////////////////////////////////////////////


var runs = 0;
var fc=0;
var ec=0;

//check if the intersitial advert page has appeared (http://apps.new.facebook.com/elvenblood/interstitial.php)
var href = window.location.href;
if(href.indexOf("interstitial") > 1){
  //if it has, redirect to quests page
  window.location = href.replace("interstitial","quests");
  document.reload(1);  
}

// calculate wait time
var timeToWait = baseDelay*1000 + (Math.floor(Math.random()*randDelay + 1 ) * 1000 );
var timeLeft = timeToWait;

//Start count down and show in title bar
window.setTimeout(function() { startCountDown() }, 1000);

//countdown
function startCountDown(){
  document.title = "Quest in " + (timeToWait / 1000) + " seconds";
  timeToWait = timeToWait - 1000;
  if(timeToWait > 0){
    window.setTimeout(function() { startCountDown() }, 1000);
  }else{
    pressButton();
  }
}

//look for the first button to say 'Do quest' and press it <input type="submit" value="Do quest" />
function pressButton(){
  runs++;
  document.title = "run:" + runs + ", form:" + fc + ", element:" + ec;
  //get all forms
  var arForms = document.getElementsByTagName("form");
  var nQuest =0;
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
        nQuest+=1;
        if(nQuest==quest){
            document.title = "run:" + runs + ", form:" + fc + ", element:" + ec;
            document.forms[fc].elements[ec].value="yar";
            document.forms[fc].submit();
            return(true);
        }//Press button
      }//Quest button
    }//inputs
  }//forms
}//function
