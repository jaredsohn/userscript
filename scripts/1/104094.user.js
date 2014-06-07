// ==UserScript==
// @namespace     http://userscripts.org/users/korra
// @name          Minitroopers Manager 0.1
// @description   Autofighter for minitroopers.fr accounts.

// @include         *.minitroopers.fr/hq*
// @include         *.minitroopers.fr/b/opp*
// @include         *.minitroopers.fr/b/view/*
// @include         *.minitroopers.fr/b/fview/*

// @exclude  *korra88.minitroopers.fr*

// ==/UserScript==

// Change value of the @exclude option so the script doesen't work on some Troopers

// Variables -----------------------------------------------------------------

var nemico='snipernoob';      // Default enemy
var page = " ";               // Actual page
var autobattle = true;        // Autobattle yes/no
var skipbattle = true;        // Auto-SkipBattle yes/no
var url=window.location.href; // Actual URL
var troopers = [] ;           // Array of managed accounts TODO

// Page reading --------------------------------------------------------------

if(url.indexOf(".minitroopers.fr/b/opp")>=0)
  {	
    // Choose enemy page
    page= 'enemy';
    // window.alert('Debug: Choose an enemy page');
    
  } else if (url.indexOf('.minitroopers.fr/b/view/')>=0)
  {
    // Battle page - Random battle
    page= 'battle';
    // window.alert('Debug: Battle page');
    
  } else if (url.indexOf('.minitroopers.fr/b/fview/')>=0)
  {
    // Battle page - Friend battle
    page= 'battle';
    // window.alert('Debug: Friend Battle page');
    
  } else if (url.indexOf('.minitroopers.fr/hq')>=0)
  {
    // Headquartiers page
    page= 'hq';
    / /window.alert('Debug: HQ page');
    
  }


// Function -----------------------------------------------------------------

// Function to wait until page has loaded___________ not used
function checkLoad()
{
     if (window.onLoad)
     {
          return true;
     } else {
          setTimeout('checkLoad();', 250)
          // window.alert('ritardo di 0,25 secondi');
     }
}

// Function to check if actual account is a managed one - TODO

function checkTroop()
{

}



// Script body --------------------------------------------------------------

// Chose enemy page _____________________

if (autobattle)
  {

   if (page == 'enemy') 
    {
      // window.onload = fight; // not needed
      document.forms['friends'].friend.value = nemico; // put Deafult enemy in form
      // window.alert('Debug: '+document.forms['friends'].friend.value);
      document.forms['friends'].submit();
    }
  }

// Battle page __________________________

if (skipbattle)
  {  
    if(page=='battle')
      {
        // checkLoad();
        var newURL = window.location.protocol +'//' + window.location.host + '/hq';
        // window.alert('Debug: redirect to '+newURL);
        window.location = newURL;
      }
  }

// HQ page ______________________________

if (page == 'hq')
  {
    
        
  }

