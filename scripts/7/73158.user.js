// ==UserScript==
// @name           Facebook alerts
// @namespace      greasy
// @description    Used in conjunction with your own webserver and FormToEmail.php to send email on certain Facebook events
// @include        http://apps.facebook.com/fishwrangler/my
// @include        http://apps.new.facebook.com/fishwrangler/*
// @include        http://fb.fishwranglr.com/*
// @include        http://apps.facebook.com/fishwrangler/*
// @version 1.4    Update to fix FishWrangler treasure
// @version 1.3    Update to fix FishWrangler treasure
// @version 1.2    Update to fix FishWrangler treasure after Joe changed his end again
// @version 1.1    Update to fix FishWrangler treasure after Joe changed his end
// @version 1.0    Released into the wild for others to play with!
// @version 0.6    Add an alert test option
// @version 0.5    Fix up coding errors in 0.3 & 0.4
// @version 0.4    Minor changes
// @version 0.3    Re wrote code to make it more versatile and easier to customise
// @version 0.2    Added comments, modified email function
// @version 0.1    Initial build - FishWrangler Treasure Chest
// ==/UserScript==

// This Greasmonkey script will NOT work on it's own
// You MUST be loading the Facebook pages yourself or via another Greasmonkey script
// Facebook Alerts MUST be ordered before your other Facebook scripts in Greasmonkey
// You MUST have access to a webserver that can host and serve php
// The recommended method is to instal FormToEmail on your webserver
// FormToEmail.php can be downloaded from http://formtoemail.com/formtoemail_free_version.php
// You do NOT have to write your own html frontend to FormToEmail.php, this Greasmonkey script calls it directly
// If using FormToEmail you MUST update FormToEmail.php with your own email address


// Change yourURL to be the full path to your FormToEmail script
// e.g. var yourURL = "http://your.domain/FormToEmail.php";

var yourURL = "http://change.me/FormToEmail.php";

// Use this section to enable/disable the various alerts to suit your own needs

var FBtestEnable = false; // Should trigger a test alert on any included page
var FWtreasureChestEnable = true; // FishWrangler treasure chest

// Don't modify anything below here unless you know what you are doing

var emailData = "emailData not set";

var FBtest = document.evaluate("//head", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var FBtestData = "FBalert=FB Alert test";
var FWtreasureChest = (document.body.innerHTML.indexOf(">Select a Treasure!<") != -1);
var FWtreasureChestData = "FBalert=FishWrangler Treasure Detected!";

 if (FBtestEnable == true) {
  if (FBtest != false) {
   var emailData=FBtestData;
   sendEmail();
  } 
 }


 if (FWtreasureChestEnable == true) {
  if (FWtreasureChest != false) {
   var emailData=FWtreasureChestData;
   sendEmail();
  } 
 }

// End script....Functions below here

function sendEmail ()
{
  //===============================================================================
  //            - Send Facebook Alerts email -
  //===============================================================================
    GM_xmlhttpRequest({
      method: 'POST',
      url: yourURL,
      headers: {'Content-type':'application/x-www-form-urlencoded'},
      data: emailData,
      onload: function(response){
        console.log("Facebook Alerts email called. Status is: " + response.status + ", reponseText is " + response.responseText);     
      },
      onerror: function(){
        alert("error sending Facebook Alerts email")
      }
      });
}