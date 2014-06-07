// ==UserScript==
// @name           Facebook - Fishwrangler Boat Trainer
// @namespace      Wr3cktangle
// @description    Sails between the first two islands to level up your boat.
// @include        http://apps.facebook.com/fishwrangler/map-travel/*
// @versions       2.0b - Changed several variable names to hopefully be more compatible (In response to problem with autofish script discovered by 3ace.)
// @versions       2.0  - Partial rewrite. I no longer use the timer field, and instead parse out the time from the "arriving at ... in ... minutes/seconds" message
//                        Added error/success message at the bottom.
// @versions       1.1b - Fixed (i hope) operation precedence bug. Still not quite tested.
// @versions       1.1  - Updated to use actual timer. Haven't actually tested to see if it works. Let me know if it doesn't.
// @versions       1.0  - Never released. Did work.
// ==/UserScript==

var anchortags = document.getElementsByTagName("a");
var locationIndex = -1;
var island = "unknown"
var timervalue = -1;

var textLocation = document.body.innerHTML.search(/Arriving at [A-Za-z ]+ in [0-9]{1,2}.[0-9]{1,2} minutes./);
var textLocation2 = document.body.innerHTML.search(/Arriving at [A-Za-z ]+ in [0-9]{1,2} seconds./);


if(textLocation != -1)
{
  //magic number: +50, pulled from my butt, just wanted to get the full message
  timeAndExtra = document.body.innerHTML.substring(textLocation + "Arriving at ".length, textLocation + "Arriving at ".length  + 50);
  time = parseFloat(timeAndExtra.substring(timeAndExtra.indexOf("in ") + "in ".length, timeAndExtra.indexOf(" minutes")));
  timervalue = Math.ceil(time * 60.0);
  //alert(time + " " + timervalue);
}
else if(textLocation2 != -1)
{
  //magic number: +50, pulled from my butt, just wanted to get the full message
  timeAndExtra = document.body.innerHTML.substring(textLocation + "Arriving at ".length, textLocation + "Arriving at ".length  + 50);
  timervalue = parseInt(timeAndExtra.substring(timeAndExtra.indexOf("in ") + "in ".length, timeAndExtra.indexOf(" seconds")));
  //alert(time + " " + timervalue);  
}


for(var i = 0; i < anchortags.length; i++)
{   
   if(anchortags[i].href.indexOf("map") != -1)
   {
      imagetags = anchortags[i].getElementsByTagName("img");
      if(imagetags.length == 1 && imagetags[0].title.indexOf("Island:") != -1)
      {
         //parse out location name from image tag
         //probably easier ways to do it, this was just the first I thought of and went with it
         //doesn't take much time, but it's gonna fail hardcore if they change the title attribute
         //for this image
         island = imagetags[0].title.substr("Island: ".length, imagetags[0].title.length - "Island: ".length);
         
         locationIndex = (island == "Fishertonville") ? 1 : 0;        
         
         imagetags = null;      
         break;
      }
   }   
}

anchortags = null;

if(timervalue >= 0 && locationIndex > -1)
{
   //calculate timeoutvalue in milliseconds
   //timervalue is in seconds, so convert that, and add on [3,33) seconds randomly 
   //the random time is to help keep it less obvious mostly.
   timeoutseconds = Math.round((timervalue + (Math.random() * 30) + 3));
   timeoutvalue = timeoutseconds * 1000;
   
   //the locations are in a 1-based array for the game (1 = WaterPort, 2 = Fishertonville)
   //i've been treating it as a 0-based array (0 = WaterPort, 1 = Fishertonville)
   //so flip the number between 0 and 1 (if 0, make 1; if 1, make 0) and convert to 1-based system
   nextLocation = (locationIndex^1) + 1;
   setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/map-travel/' + nextLocation;} , timeoutvalue);
   
   refreshTime = new Date();
   refreshTime.setTime(refreshTime.getTime() + timeoutvalue);
   
   document.body.innerHTML = document.body.innerHTML + "<br /><br />Fishwrangler Boat Trainer - Next refresh at " + refreshTime.toLocaleString() + "<br /><br /><br />"
}
else
{
   document.body.innerHTML = document.body.innerHTML + "<br /><br />Fishwrangler Boat Trainer - Could not determine enough to auto-travel. textLocation:" + textLocation + " textLocation2:" + textLocation2 + " timervalue:" + timervalue + " locationIndex:" + locationIndex + " location:" + location + "<br /><br /><br />"
}
