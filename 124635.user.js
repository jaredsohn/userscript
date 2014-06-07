// ==UserScript==
// by Pi31415926
// @name           reddit.com - SpamQueueTool
// @version        0.3
// @namespace      Pi
// @description    Pi31415926's auto-refreshing spam queue, with new spam indicator
// @include        http://www.reddit.com/*
// @include        https://www.reddit.com/*
// ==/UserScript==

function SpamQueueTool() {
 // configuration section //
 var config_notifications_enable=false;
 var config_autorefresh_enable=true;
 var config_redditbar_hider_enable=true;
 var spanstyle="font-size: 10px; color: crimson; font-weight: normal; font-variant: normal; padding-left: 10px;"; // sets the look of the 'auto refresh' message
 var timerlength=180000; // in thousandths of a second - 1000 = 1 second, 300000 = 5 mins - to keep the load on Reddit down, do not set this below 1 min (60000)
 // end configuration section //

 // begin inbuilt functions
 AutoRefreshDisable = function() { // handle click of disable button
  clearTimeout(timerhandle);
  document.getElementById('refreshtimer').innerHTML = 'Auto-refresh DISABLED. <span style="cursor: pointer;" onclick="location.reload();return false;" title="Turn on auto-refresh">[enable]</span>';
 }
 MaxEnable = function() { // handle click of max button
  var appendstring = "";
  if (thisURL.indexOf("?") != -1 ) { // are there other params already on the URL?
   appendstring = "&";
  } else {
  appendstring = "?";
  }
  appendstring += "limit=100";
  location.replace(thisURL + appendstring);
 }
 BarToggle = function(state) { // handle click of bar button
  if (state) { // show bar
   $('#sr-header-area').css({'display': ''});
   var barbuttonHTML='<span onclick="BarToggle(0);return false;" title="Hide bar">|_|</span>';
  } else { // hide bar
   $('#sr-header-area').css({'display': 'none'});
   var barbuttonHTML='<span onclick="BarToggle(1);return false;" title="Show bar">|+|</span>';   
  }
  document.getElementById('barbutton').innerHTML = barbuttonHTML;
 }
 // end inbuilt functions

 // begin spam queue monitor
 // get contents of spam queue
 var request = "http://www.reddit.com/r/mod/about/spam.json";
 spamhttp = new XMLHttpRequest();
 spamhttp.open('GET', request, true);
 spamhttp.onreadystatechange = function () {
  var done = 4, ok = 200;
  if (spamhttp.readyState == done && spamhttp.status == ok) {
   var spamqueue = JSON.parse(spamhttp.responseText);
   var firstentry = spamqueue.data.children[0]; // get first entry in array
   var firstentrytimestamp = firstentry.data.created; // get timestamp of first entry

   // read logged timestamp from store
   var key='loggedtimestamp';
   var loggedtimestamp=(localStorage.getItem(key));
   var showalert=false;
   var updatestore=false;
   var outstring = '';
   if (loggedtimestamp) {
    // compare logged timestamp with current timestamp
    if (loggedtimestamp < firstentrytimestamp) { // is less than - new spam has arrived - show alert without updating store
     if (config_notifications_enable) { alert('New spam has arrived.'); }
     showalert=true;
    } else if (loggedtimestamp > firstentrytimestamp) { // is greater than - a post was approved - update store without showing an alert
     if (config_notifications_enable) { alert('A post was approved.'); }
     updatestore=true;
    }
   } else { // no previous entry
    updatestore=true;
   }

   // auto-clear the alert if the user visits the spam queue
   var thisURL=location.href; // get current URL
   if (thisURL.indexOf("/about/spam") != -1 ) { // is this URL the spam queue?
    updatestore=true;
   }

   // write to store if needed
   if (updatestore) {
    localStorage.setItem(key,firstentrytimestamp);
   }

   // build output
   if (showalert) {
    outstring = 'title="new spam found!" style="background-color: #FF8A5E; font-weight: bold; padding: 0px 5px 0px 5px;"';
   } else {
    outstring = 'title="no new spam"';
   }
   outstring='<span class="separator">|</span><a href="http://www.reddit.com/r/mod/about/spam" '+outstring+'>@</a>';

   $('#modmail').after(outstring); // update page

  }
 };
 spamhttp.send(null);
 // end spam queue monitor

 // begin auto-refresh feature
 if (config_autorefresh_enable) {
  var thisURL=location.href; // get current URL
  if (thisURL.indexOf("/about/spam") != -1 ) { // is this URL the spam queue?

   // create a place in the page to write to
   $('#header-bottom-left').find('span.redditname').append('<span ID="refreshtimer" style="' + spanstyle + '"></span>');

   if (config_redditbar_hider_enable) {
    // create a space for the bar show/hide button, then hide bar by default
    $('#header-bottom-right').prepend('<span ID="barbutton" class="separator" style="cursor: pointer;"></span>&nbsp;');
    if (thisURL.indexOf("/mod/") != -1) { // default to hidden in /r/mod/
     BarToggle(0);
    } else { // default to visible in a single reddit (this is to preserve compatibility with subreddit-specific CSS)
     BarToggle(1);
    }  
   }

   // get current time
   var now = new Date();
   var thishour = now.getHours();
   var thismin = now.getMinutes();
   thismin = ((thismin < 10) ? "0" : "") + thismin;
   thishour = ((thishour < 10) ? "0" : "") + thishour;
   var outputtime = thishour + ":" + thismin;
   var extrastring = "";

   // add disable button
   extrastring = ' <span style="cursor: pointer;" onclick="AutoRefreshDisable();return false;" title="Turn off auto-refresh">[disable]</span>';

   // add max button
   if (thisURL.indexOf("limit=100") == -1 ) { // is this new queue already maxed?
    extrastring += ' <span style="cursor: pointer;" onclick="MaxEnable();return false;" title="Show 100 items">[max]</span>';
   }

   // write message to page, and set the timer
   document.getElementById('refreshtimer').innerHTML = "Auto-refresh in " + (timerlength/1000) + " sec; last at " + outputtime + "." + extrastring;
   timerhandle = setTimeout("location.reload()", timerlength); // refresh page after x millisecs  

  }
 }
 // end auto-refresh feature

 }

 // inject script into page
 var loader = document.createElement("script");
 loader.textContent = "$(" + SpamQueueTool.toString() + ")";
 document.body.appendChild(loader);