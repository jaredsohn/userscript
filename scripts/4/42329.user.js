// ==UserScript==
// @name           Facebook Fishwrangler - Smart Auto Tournament Caster
// @namespace      Wr3cktangle
// @description    Auto fishes in tournaments
// @include        http://apps.facebook.com/fishwrangler/cast
// ==/UserScript==

var inputs = document.getElementsByTagName("input");
var timervalue = -1;

if(inputs)
{
   //loop through and find the fish timer hidden input box and get it's value
   for(i = 0; i < inputs.length; i++)
   {
      if(inputs[i].id.indexOf("tourny_timer_hidden") != -1)
      {
         timervalue = inputs[i].value;         
         break;
      }
   }
   
}

inputs = null;

//recast or go home
if(timervalue > 0)
{
   //calculate timeoutvalue in milliseconds
   //timervalue is in seconds, so convert that, and add on [3,5) seconds randomly 
   //the random time is to help keep it less obvious mostly.
   timeoutvalue = (parseInt(timervalue) + Math.round(Math.random() * 2) + 3) * 1000;
   
   //alert("refresh in " + timeoutvalue );
   setTimeout(function() {document.location = 'http://apps.facebook.com/fishwrangler/cast';} , timeoutvalue);
}
else
{
   document.location = 'http://apps.facebook.com/fishwrangler/'
}
