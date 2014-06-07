// ==UserScript==
// @name           jcms gt2
// @namespace      kiyo
// @description    gt w captcha
// @include        http://apps.facebook.com/ghost-trappers/*
// ==/UserScript==

function nextAvailableTime(zTimeoutvalue)
{
  //Determine the current date, add the timeoutvalue in milliseconds, and
  //return the formatted time.
  d = new Date();

  if(zTimeoutvalue >= 0)
  {
    d.setTime(d.getTime() + zTimeoutvalue);
  }

  minutes = d.getMinutes();
  seconds = d.getSeconds();

  if (minutes < 10)
  {minutes = "0" + minutes;}

  if (seconds < 10)
  {seconds = "0" + seconds;}

  return d.getHours() + ':' + minutes + ':' + seconds;
}



if(document.body.innerHTML.indexOf('captcha_entered_text') != -1)
{   document.title = "Captcha - Submitting in 30 mins"
var forms = document.getElementsByTagName('form');
var formid = forms[2].id
setTimeout(function() {document.getElementById(formid).submit();}, 5000); 
}
else if (document.body.innerHTML.indexOf('Success! The code has been entered correctly.') != -1)
{
setTimeout(function() {document.location = 'http://apps.facebook.com/ghost-trappers/index.php';}, 3000);
}
else
{ 
    if (document.getElementById('app51157989152_topminutesdiv') != null)
    {
    var minutesid = document.getElementById('app51157989152_topminutesdiv').innerHTML
    var secondsid = document.getElementById('app51157989152_topsecondsdiv').innerHTML
    } 
    else if (document.getElementById('app51157989152_topminutesdiv') == null)
    {
    var minutesid = '0'
    var secondsid = '0'
    } //find where the timer call is made and where the c=XXX value is specified
  linklocation = document.body.innerHTML.search(/hunt.php\?[a-zA-z]+=[0-9]+/);


  if(linklocation != -1)
  {
    //Parse out timer values in minutes and seconds
    //magic number: +8 includes all numbers and right parentheses guaranteed (i hope)
    
    minutes = parseInt(minutesid, 10);
    seconds = parseInt(secondsid, 10);
    //add 3-33 seconds onto refresh timer randomly (i hope)
    timeoutvalue = (minutes * 60 + seconds + Math.round((Math.random() * 5)) + 1) * 1000;
  
    //Parse out c=XXX value
    link = document.body.innerHTML.substring(linklocation + "hunt.php?".length, linklocation + "hunt.php?".length + 15);
    link = link.substring(0,link.indexOf("\"") - 1);    

    //alert(timeoutvalue + "; " + link);
    setTimeout(function() {document.location = 'http://apps.facebook.com/ghost-trappers/hunt.php?' + link;} , timeoutvalue);
    
    document.title = "Next hunt at: " + nextAvailableTime(timeoutvalue);
  }
  else
  {
    document.body.innerHTML = document.body.innerHTML + "<br /><br />Ghost Trappers Smart Autohunt could not parse either the time or the link. Stopping refreshes. <br /><br /><br />";
  setTimeout(function() {document.location = 'http://apps.facebook.com/ghost-trappers/index.php';}, 30000)
  }
}