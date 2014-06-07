// ==UserScript==
// @name           Elven Blood Auto Quests
// @namespace      http://userscripts.org/users/75213
// @description    Alternately submits 1 of 2 quests on Elven Blood in random order after several seconds
// @source         http://userscripts.org/scripts/show/38792
// @identifier     http://userscripts.org/scripts/source/38792.user.js
// @version        1.1
// @date           2008-12-18
// @creator        Distant
// @include        http://*.facebook.com/elvenblood/quests.php
// @include        http://*.facebook.com/elvenblood/interstitial.php
// @include        http://*.facebook.com/common/error.html
// ==/UserScript==

/* ---------------------------------------------------------------------------------------
   PLEASE READ THIS FIRST :
    1. Original script by geist3 could be found here :
       [http://geist3.blogspot.com/2008/09/soup-and-elven-blood-hax.html] or
       [http://geekpagan.com/images/elven_blood_grinder.user.js]
    2. Posted on UserScripts.org as Elven Blood Grinder
       [http://userscripts.org/scripts/review/34836]
       by Sochai [http://userscripts.org/users/68463].
    3. Thanks to Grim [http://userscripts.org/users/74928] who submitted
       Elven Blood Grinder 0.2 [http://userscripts.org/scripts/review/38511]. Some codes
       below inspired by him.
    4. WARNING : YOU MIGHT GET SUSPENDED !!!
    5. Purpose of this script is to help you farm experiences / gold. You could alternate
       between two quests (ie. Celestial Phoenix & Forcefield, or Heal Spell and Thousand
       Angels). If you want to run just one quest, use same value for questA and questB.
    6. The script will not check if your Stamina = 0 or your Life = 0, so please make sure
       that you won't get killed or run out of stamina before you enable this script to
       run overnight. For example you're now in Ninth Circle (and haven't passed yet), and
       you choose to run this script to alternate quests between fighting Lucifer and
       the Beast --- you're in serious risk of getting killed, or even suspended.
    7. PLEASE EXAMINE ALL VALUES IN USER DEFINED VARIABLES SECTION BELOW. Pre-defined
       values may not give you the best result, ie. your level is below 60 and you only
       recover 4 stamina in 300 seconds. Or you already have Haste in your inventory,
       then you could set stamRecoveryTime to 240. So, once again : PLEASE EXAMINE ALL
       VALUES AND MODIFY THEM TO SUIT YOUR CHARACTER STATS.
    8. Ever heard of Bali Island ? It's located in Indonesia, my beloved home country.
       Indonesia has numerous dazzling and breath-taking places to visit, and Bali is just
       one of them.
    9. Hope you enjoy playing Elven Blood. For the sake of the game, I strongly suggest
       you complete all the quests first. I did, without any macro (thanks God this game
       is playable using Opera Mini). Now I'm bored and I don't know if there's any
       episode beyond Angelrealm Celesti. Even the Legends are bored too :)
   10. With minor modifications, this script will work for the rest of Blood Games. Simply
       change Included Pages from /elvenblood/ to /bloodlust/ or others (and don't forget
       about Facebok Common Error Page too)

   --------------------------------------------------------------------------------------- */

/* ---------------------User Defined Variables------------------ */
/* Please note that these values are based on my current stats   */
/* I'm on level 80+, so please, modify to suit your char !       */

   var stamRecoveryTime    = 240; // 300 seconds needed for Stamina to recover, 240 seconds if you bought Haste from Elder Tree for 25 blessings
   var stamRecoveryAmount  = 6;   // Amount of additional stamina in every stamina recovery cycle
   var stamPerQuest        = 10;  // Amount of stamina required to do quest. If your quests have different stamina requirements, please use highest number
   var questA              = 1;   // First Quest to run
   var questB              = 2;   // Second Quest to run
   var randDelay           = 10;  // Additional random seconds

/*--End of User Defined Variables. No need to edit below codes-- */

/* ---------------------Begin Error Handling------------------- */

// Connection Error
if (document.body.innerHTML.match(/Connection reset by peer/) || document.body.innerHTML.match(/Session Expired/) || document.body.innerHTML.match(/Transport error (#302) while retrieving data/) || document.getElementById('errorTryAgain')) document.location.reload();

// Facebook Common Error Page [http://www.facebook.com/common/error.html]
if (document.location.href=='http://www.facebook.com/common/error.html') document.location.href='http://apps.facebook.com/elvenblood/quests.php';

// Blood Interstitial Page [http://*.facebook.com/elvenblood/interstitial.php]
var href = window.location.href;
if(href.indexOf("interstitial") > 1){
//if it has, redirect to quests page
  window.location = href.replace("interstitial","quests");
  document.reload(1);
}

var runs=0;
var fc=0;
var ec=0;

/* Auto calculate how many seconds needed to wait between quests, and how many quests to do in 1 hour */
var stamRecoverPerHour     = ( 3600 / stamRecoveryTime ) * stamRecoveryAmount;
var questMaxAttemptPerHour = Math.floor((stamRecoverPerHour) / stamPerQuest);
var stamRequiredPerHour    = questMaxAttemptPerHour * stamPerQuest;

/* Calculate delay in seconds between quests (baseDelay), then add random seconds (randDelay) */
var baseDelay              = Math.floor((3600 / questMaxAttemptPerHour));
var timeToWait             = (baseDelay * 1000) + (Math.floor(Math.random()* randDelay + 1 ) * 1000 );
var timeLeft               = timeToWait;

/* Randomise which quest to run ?? */
var randNum = Math.floor(Math.random()* 2) + 1;
if (randNum > 1){
   var Quest = questA;
   }else{
   var Quest = questB;
}

//Start count down and show in title bar
window.setTimeout(function() { startCountDown() }, 1000);

//countdown
function startCountDown(){
  document.title = (timeToWait / 1000) + " seconds to do Quest " + Quest + " (Doing " + questMaxAttemptPerHour + " quests/hour, Stamina needed " + stamRequiredPerHour + "/hour, Stamina recovery " + stamRecoverPerHour + "/hour)";
  timeToWait = timeToWait - 1000;
  if(timeToWait > 0){
    window.setTimeout(function() { startCountDown() }, 1000);
  }else{
    pressButton();
  }
}

//look for the Nth button that says 'Do quest' and press it <input type="submit" value="Do quest" />
function pressButton(){
  runs++;
  document.title = "run:" + runs + ", form:" + fc + ", element:" + ec;
  //get all forms
  var arForms = document.getElementsByTagName("form");
  var nQuest =0; // nice touch by Grim
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
        if(nQuest==Quest){
            document.title = "run:" + runs + ", form:" + fc + ", element:" + ec;
            document.forms[fc].elements[ec].value="yar";
            document.forms[fc].submit();
            return(true);
        }//Press button
      }//Quest button
    }//inputs
  }//forms
}//function