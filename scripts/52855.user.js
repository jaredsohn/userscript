// ==UserScript==
// @name           Facebook - Fishwrangler Smart Autofish
// @namespace      Wr3cktangle
// @description    A smart autofisher for the Fishwrangler facebook app
// @versions       1.2c Added treasureChest variable and handling block. Currently, I do nothing, but others may want to personally.
// @versions       1.2b Changed variable "location" to "island" for better compatibility.
// @versions       1.2  Added safety check to Sans Culpra for fishing more than 15 times without a license.
// @versions       1.1  Stops autofishing in Magma Reef if it may be unsafe to, and if something needs repair.
// @versions       1.0  Initial Release
// @include        http://apps.facebook.com/fishwrangler/*
// @exclude        http://apps.facebook.com/fishwrangler/map-travel/*
// @exclude        http://apps.facebook.com/fishwrangler/cast
// @exclude        http://apps.facebook.com/fishwrangler/discussion-board
// ==/UserScript==


var inputs = document.getElementsByTagName("input");
var anchors = document.getElementsByTagName("a");
var timervalue = -1;
var ignoreSafety = false; //change to true to ignore safety checks (akin to v1.0 since it had no safety checks)
var safeToFish = (document.body.innerHTML.indexOf("NEEDS REPAIR!") == -1); //check if anything needs repair
var treasureChest = (document.body.innerHTML.indexOf("Select a Treasure!") != -1); //check if a captcha is detected

if(inputs)
{
   //loop through and find the fish timer hidden input box and get it's value
   for(i = 0; i < inputs.length; i++)
   {
      if(inputs[i].id.indexOf("timer_hidden") != -1)
      {
         timervalue = inputs[i].value;         
         break;
      }
   }
   
}

//figure out which Island we're fishing at. 
//If it's Magma Reef, look for the text "You can safely lava fish". 
//Note: You'll probably have to manually fish once at Magma Reef to get the party started.
//If it's Sans Culpra, look for the text "Scuba Diving License REQUIRED..." and abort if found
for(var i = 0; i < anchors.length; i++)
{   
   if(anchors[i].href.indexOf("map") != -1)
   {
      images = anchors[i].getElementsByTagName("img");
      if(images.length == 1 && images[0].title.indexOf("Island:") != -1)
      {
         //parse out location name from image tag
         //probably easier ways to do it, this was just the first I thought of and went with it
         //doesn't take much time, but it's gonna fail hardcore if they change the title attribute
         //for this image
         island = images[0].title.substr("Island: ".length, images[0].title.length - "Island: ".length);
                   
         if(island == "Magma Reef")
         {
           safeToFish &= (document.body.innerHTML.indexOf('You can safely lava fish') != -1);
         }
         else if(island == "Sans Culpra")
         {      
           safeToFish &= (document.body.innerHTML.indexOf('Scuba Diving License REQUIRED...') == -1);
         }
         
         images = null;      
         break;
      }
   }   
}

anchors = null;
inputs = null;

if(timervalue > 0 && (safeToFish || ignoreSafety))
{
   //calculate timeoutvalue in milliseconds
   //timervalue is in seconds, so convert that, and add on [3,33) seconds randomly 
   //the random time is to help keep it less obvious mostly.
   timeoutvalue = (parseInt(timervalue) + Math.round(Math.random() * 30) + 3) * 1000;
   
   //alert("refresh in " + timeoutvalue );
   setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/start';} , timeoutvalue);
}
else if(treasureChest)
{
   //handle captcha if desired.
   //possibilities:
   //1. refresh to main page every 5 minutes
   //setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/';}, 300000)
   //2. ???
   //3. Profit!
}

if(!safeToFish && !ignoreSafety)
{
   document.body.innerHTML = document.body.innerHTML + "<br />It was determined to be possibly unsafe to fish.<br /><br /><br />"
}