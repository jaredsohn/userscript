// ==UserScript==
// @name           MH-SmartAutoHunter
// @namespace      Wr3cktangle
// @description    A smart autohunter for the Mousehunt Facebook App
// @include        http://apps.facebook.com/mousehunt/*
// @include        http://apps.new.facebook.com/mousehunt/*
// @exclude        http://apps.facebook.com/mousehunt/travel*
// @exclude        http://apps.facebook.com/mousehunt/inventory*
// @exclude        http://apps.facebook.com/mousehunt/hunt*
// @exclude        http://apps.facebook.com/mousehunt/news*
// @exclude        http://apps.facebook.com/mousehunt/boards*
// @exclude        http://apps.facebook.com/mousehunt/update*
// @exclude        http://apps.facebook.com/mousehunt/organizeparty*
// @exclude        http://apps.new.facebook.com/mousehunt/travel*
// @exclude        http://apps.new.facebook.com/mousehunt/inventory*
// @exclude        http://apps.new.facebook.com/mousehunt/hunt*
// @exclude        http://apps.new.facebook.com/mousehunt/news*
// @exclude        http://apps.new.facebook.com/mousehunt/boards*
// @exclude        http://apps.new.facebook.com/mousehunt/update*
// @exclude        http://apps.new.facebook.com/mousehunt/organizeparty*
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

if(timervalue >= 0)
{
   //calculate timeoutvalue in milliseconds
   //timervalue is in seconds, so convert that, and add on [3,33) seconds randomly 
   //the random time is to help keep it less obvious mostly.
   timeoutvalue = (parseInt(timervalue) + Math.round(Math.random() * 10) + 3) * 1000;
   
   //alert("refresh in " + timeoutvalue );
   setTimeout(function() {document.location = 'http://apps.facebook.com/mousehunt/soundthehorn.php';} , timeoutvalue);


}
else
{
   //calculate timeoutvalue in milliseconds
   //timervalue is in seconds, so convert that, and add on [3,33) seconds randomly 
   //the random time is to help keep it less obvious mostly.
   ttv = (24435 + Math.round(Math.random() * 100) + 30) * 1121;
   
   //alert("refresh in " + timeoutvalue );
   setTimeout(function() {document.location = 'http://apps.facebook.com/mousehunt/';} , ttv);
}

