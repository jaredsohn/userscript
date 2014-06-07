// ==UserScript==
// @name           Facebook - Mousehunt Smart Autohunter
// @namespace      Wr3cktangle
// @description    A smart autohunter for the Mousehunt Facebook App
// @include        http://apps.facebook.com/mousehunt/*
// ==/UserScript==

var inputs = document.getElementsByTagName("input");
var timervalue = -1;

if(inputs)
{
   //loop through and find the horn timer hidden input box and get it's value
   for(i = 0; i < inputs.length; i++)
   {
      if(inputs[i].id.indexOf("hornWaitValue") != -1)
      {
         timervalue = inputs[i].value;         
         break;
      }
   }
   
}

inputs = null;

if(timervalue > 0)
{
   //calculate timeoutvalue in milliseconds
   //timervalue is in seconds, so convert that, and add on [3,33) seconds randomly 
   //the random time is to help keep it less obvious mostly.
   timeoutvalue = (parseInt(timervalue) + Math.round(Math.random() * 30) + 3) * 1000;
   
   //alert("refresh in " + timeoutvalue );
   setTimeout(function() {document.location = 'http://apps.facebook.com/mousehunt/turn.php';} , timeoutvalue);
}
