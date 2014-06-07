// ==UserScript==
// @name           ghosty auto
// @namespace      kiyoshii
// @description    (:
// @include        http://apps.facebook.com/ghost-trappers/*
// @credit         Wr3cktangle
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
    timeoutvalue = (minutes * 60 + seconds + Math.round((Math.random() * 30)) + 3) * 1000;
  
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