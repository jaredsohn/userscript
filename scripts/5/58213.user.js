// ==UserScript==
// @name           Facebook - Ghost Trappers Smart Autohunt
// @namespace      Wr3cktangle
// @description    A smart autohunt script for the Ghost Trppers Facebook App
// @include        http://apps.facebook.com/ghost-trappers/*
// @versions       1.3 Updated code to find and parse out code value. GT switched to a d=XXX value. Hopefully script is now more resilient.
// @versions       1.2 Updated code to find and parse out c value (it's not always 3 numbers, d'oh) 
// @versions       1.1 Added handling for stopping refreshes when a captcha is detected. Changed error writing, misc comments.
// @versions       1.0 Initial Release
// @issues         Does not stop attempting to refresh when you run out of whiskey.
// ==/UserScript==

if(document.getElementById("captcha_session") != null)
{
  document.body.innerHTML = document.body.innerHTML + "<br /><br />Ghost Trappers Smart Autohunt detected a captcha. Stopping refresh.<br /><br /><br />";
}
else
{
  //find where the timer call is made and where the c=XXX value is specified
  timerlocation = document.body.innerHTML.search(/topstarttimer\([0-9]{1,2},[0-9]{1,2}\)/);
  linklocation = document.body.innerHTML.search(/hunt.php\?[a-zA-z]+=[0-9]+/);

  if(timerlocation != -1 && linklocation != -1)
  {
    //Parse out timer values in minutes and seconds
    //magic number: +8 includes all numbers and right parentheses guaranteed (i hope)
    call = document.body.innerHTML.substring(timerlocation + "topstarttimer(".length, timerlocation + "topstarttimer(".length + 8);
    minutes = parseInt(call.substring(0, call.indexOf(',')));
    seconds = parseInt(call.substring(call.indexOf(',') + 1, call.indexOf(')')));
    
    //add 3-33 seconds onto refresh timer randomly (i hope)
    timeoutvalue = (minutes * 60 + seconds + Math.round((Math.random() * 5)) + 1) * 1000;
  
    //Parse out c=XXX value
    link = document.body.innerHTML.substring(linklocation + "hunt.php?".length, linklocation + "hunt.php?".length + 15);
    link = link.substring(0,link.indexOf("\"") - 1);    

    //alert(timeoutvalue + "; " + link);
    setTimeout(function() {document.location = 'http://apps.facebook.com/ghost-trappers/hunt.php?' + link;} , timeoutvalue);
  }
  else
  {
    document.body.innerHTML = document.body.innerHTML + "<br /><br />Ghost Trappers Smart Autohunt could not parse either the time or the link. Stopping refreshes. <br /><br /><br />";
  }
}
