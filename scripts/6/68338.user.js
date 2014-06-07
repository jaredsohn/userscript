scr_meta=<><![CDATA[
// ==UserScript==
// @name           Neobux Server Time
// @description    Displays both your local time and the Neobux's server time in the corner of your page
// @include        http://www.neobux.com/*
// @include        https://www.neobux.com/*
// @exclude        http://www.neobux.com/v/*
// @exclude        https://www.neobux.com/v/*
// @exclude        http://www.neobux.com/refstat/*
// @exclude        https://www.neobux.com/refstat/*
// @attriubtion    kwah
// @version        2.3.2
// @updateNote      v2.3.2 = Fixed time from being 1hour too fast / slow
// ==/UserScript==
]]></>.toString();


/*
CHANGELOG:
-- 18/09/2009 v2.3.2:
* Fixed the bug that was causing the calculated server time to intermittently be 1hr too fast / slow

-- 17/09-2009 v2.3.1:
* Fixed the menu text so that it says 'Neobux Server Time' in the options
* Added two more excludes
* Script now shows time difference next to server time

-- 11/09/2009 v2.3.0:
* Fixed a couple of pretty important bugs (the hour would sometimes go >24 for example)
* Added an autoupdater
* You can edit how often the script checks for updates via the menu [Tools\Greasemonkey\User Script Commands]
* The script will now calculate the minute difference much more reliably now
* Added the ability to manually define the time difference that you 
* Other things too but I don't remember them all right now..

-- 07/09/2009:
* Added multiple alerts to make it very obvious that the user must visit the 'view advertisments' page after installation..
*/

//Turn console logging on/off
var debug = false;
if(!debug){ function GM_log(){} }



// Check whether this is the first use of the script
// If so, set some variables 
if(GM_getValue("FirstUse",1)==1){
  GM_setValue("FirstUse",0);
  GM_setValue("SetupComplete",0);
  GM_setValue("AutoDetectTimeOffset",true);
  GM_setValue("updateFrequency",120);

  alert("Welcome and enjoy your use of this greasemonkey script =]\n\nIf the script does not work as expected, please contact 'kwah' at UserScripts.org or at Neobux.");
  var AllowRefresh = confirm("In order for the script to function correctly, you must first visit your 'view advertisements' link.\n\nView Now?");
    if(AllowRefresh){
      location.href = 'http://www.neobux.com/?u=v';
    }
}

  var LocalDateTime = new Date();
  var localTime = GetLocalTime();

// Check whether current page is the "View Advertisements" page
  var CurrentUrl = document.location.href;
  var RegExp_AdPage = /^http[s]?:\/\/www\.neobux\.com\/\?u\=v/;
  var IsMatch = RegExp_AdPage.test(CurrentUrl);
  // If it is, Set the Time Offset
  if(IsMatch) { SetTimeOffset() }


  if(GM_getValue("SetupComplete",0)==1){
    var serverTime = GetServerTime();
  } else {
    var serverTime = 'You must "View Advertisements" for this to show correctly.';
  }

  
var locationToInsert = document.evaluate('//td[@id="mnbl"]',
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null).snapshotItem(0);

GM_log('Local: ' + localTime + ' Server: ' + serverTime);
  var Container = document.createElement('span');
  Container.setAttribute('style','text-align: right; font-family: courier new, verdana; margin-top: 0px;');

  
var tmpText = 'Local time: ' + localTime + ' . Server time: ' + serverTime;
tmpText = document.createTextNode(tmpText);
Container.appendChild(tmpText);
locationToInsert.appendChild(Container);


/*******************************************
*************** FUNCTIONS ******************
*******************************************/
 
// Get and return the local time and format it correctly
function GetLocalTime() {

  var localHours = LocalDateTime.getHours()
  var localMinutes = LocalDateTime.getMinutes();
  var localSeconds = LocalDateTime.getSeconds();

  if (localHours < 10){
    localHours = "0" + localHours;
  }
  if (localMinutes < 10){
    localMinutes = "0" + localMinutes;
  }
  if (localSeconds < 10){
    localSeconds = "0" + localSeconds;
  }

  return localHours + ":" + localMinutes; //+ ":" + localSeconds;
  
}

// Calculate and return the server time formatted correctly
function GetServerTime() {

  var serverOffset;
  var TimeOffset = parseFloat(GM_getValue('serverOffset',0));

  GM_log('TimeOffset = '+TimeOffset);
  
  // Convert the time offset into hours & minutes.
  // TODO: Include seconds for the sake of completeness perhaps? 
  if (TimeOffset < 0){
  // If the offset is negative, must round 'up' 
    GM_log('TimeOffset < 0');
    TimeOffset_Hour = Math.ceil(TimeOffset);

  } else if (TimeOffset > 0){
    GM_log('TimeOffset > 0');
    TimeOffset_Hour = Math.floor(TimeOffset);  
  }
  // Calculating minutes ::
  // eg, offset of 0.5hours = 0.5*60 = 30minutes
  
    GM_log('TimeOffset - TimeOffset_Hour = '+parseFloat(TimeOffset - TimeOffset_Hour));
    TimeOffset_Minute = Math.round((TimeOffset - TimeOffset_Hour) * 60);  
  
 GM_log('TimeOffset_Hour = '+TimeOffset_Hour);
 GM_log('TimeOffset_Minute = '+TimeOffset_Minute);

  var currentTime = new Date();

  // Check that the adjustment to the timezone hasn't caused time to be negative
  var localHours = LocalDateTime.getHours();
  var localMinutes = LocalDateTime.getMinutes();
  var localSeconds = LocalDateTime.getSeconds()
  var serverSeconds = localSeconds;
  
// Validate that the manipulated hour is >=0 and <24
  var serverHours = (localHours + TimeOffset_Hour)%24;
  if (serverHours < 0){ serverHours = serverHours + 24; }

  
  // Add offset to minutes
  var serverMinutes = (localMinutes + TimeOffset_Minute);
  // If offset has caused minutes to be >=60 or <0 then adjust the hour accordingly
  if (serverMinutes >= 60) { serverHours = serverHours + 1; } 
  else if (serverMinutes < 0) { serverHours = serverHours - 1; }
  
  // Get minutes into the range 0 <= serverMinutes < 60 to get valid minute value
  serverMinutes = serverMinutes%60;
  if (serverMinutes < 0){ serverMinutes = serverMinutes + 60; }
  
  GM_log('serverHours = '+serverHours);
  GM_log('serverMinutes = '+serverMinutes);
  
    // Add leading zeros to the digits
  if (serverHours < 10){ var serverHours = "0" + serverHours; }
  if (serverMinutes < 10){ var serverMinutes = "0" + serverMinutes; }
  if (serverSeconds < 10){ var serverSeconds = "0" + serverSeconds; }
  
  GM_log('serverHours = '+serverHours);
  GM_log('serverMinutes = '+serverMinutes);
  GM_log('serverSeconds = '+serverSeconds);
  
  if(TimeOffset>0) { var timeDiff_text = '+'+Math.round(TimeOffset*100)/100; }
  else if(TimeOffset==0) { var timeDiff_text = '+-'+TimeOffset; }
  else { var timeDiff_text = Math.round(TimeOffset*100)/100; }
  
  // Return the time in the format HH:MM(:SS optional)
  return serverHours + ":" + serverMinutes + " (" + timeDiff_text + "hrs)"; // + ":" + serverSeconds;
}

// Calculate and return the size of the time difference/offset
function GetTimeOffset() {

  // Hunt for the current server time
  var locationOfTime = document.evaluate('  //b[contains(.,"The current server time is:")]',
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);

  // var String = 'The current server time is: 2009/06/07 20:46';
  var String = locationOfTime.innerHTML;

  // Get rid of the unnecessary stuff at the beginning
  var dateTimeString = String.split(": ")[1]; // eg: 2009/06/07 20:05
  GM_log('dateTimeString = '+dateTimeString);

  dateTimeString = dateTimeString.split(" ");
  GM_log('dateTimeString = '+dateTimeString);

    var date = dateTimeString[0].split("/");
  GM_log('date [yyyy,mm,dd] = '+date);
    var year = date[0];
    var month = date[1];
    var day = date[2];

    var time = dateTimeString[1].split(":");
  GM_log('time [hh,mm] = '+time);
    var hour = time[0];
    var minute = time[1];

  GM_log('day/month/year hour:minute = '+day+'/'+month+'/'+year+' '+hour+':'+minute+'\n');

  var ServerDateTime = new Date();
  ServerDateTime.setFullYear(year,(month-1),day);
  ServerDateTime.setHours(hour,minute);

  GM_log('ServerDateTime = '+ServerDateTime+'\n');

  var ServerTime = ServerDateTime.getTime();
  var LocalTime = LocalDateTime.getTime();
  var one_hour = 1000*60*60;

  var Difference = (ServerTime - LocalTime)/(one_hour);
  Difference = Math.floor(Difference*1000)/1000;
  GM_log('Difference = '+Difference);

return Difference;

}

// Check whether the page being loaded is the 'View Advertisements' page
// If it is, call GetTimeOffset() to calculate & store the offset amount [if autodetecting the offset is enabled]
function SetTimeOffset() {
  var serverOffset;
  
  if(IsMatch && GM_getValue("AutoDetectTimeOffset",true)){
    serverOffset = parseFloat(GetTimeOffset());
    GM_log('serverOffset = '+serverOffset);
    GM_setValue('serverOffset',String(serverOffset));
 
    if(GM_getValue("SetupComplete",0)==0){
      GM_setValue("SetupComplete",1);
        if(GM_getValue("SetupComplete",0)==1){
          alert("Congratulations, the script should now be setup correctly. \n\nIf the script does not work after visiting your 'view advertisements' link, please contact 'kwah' at UserScripts.org or at Neobux.");
        } else {
          alert("There was a problem setting this script up. Please try refreshing this page.\n\nIf the script still does not work, please contact 'kwah' at UserScripts.org or at Neobux.");
        }
    }
  }
}

// Function called from the Menu to enable manually setting the time difference
function EnableManualTimeDiff() {
  var TimeOffset = parseFloat(GM_getValue('serverOffset',0));
  var TimeDiff_Manual = prompt('Manually enter your time difference:',TimeOffset);
    GM_log("TimeDiff_Manual = "+TimeDiff_Manual);
    TimeDiff_Manual = parseFloat(TimeDiff_Manual);
    GM_log("TimeDiff_Manual = "+TimeDiff_Manual);

  try {
    if(TimeDiff_Manual > -24 && TimeDiff_Manual < 24){
      GM_setValue('serverOffset',String(TimeDiff_Manual));
      GM_setValue("AutoDetectTimeOffset",false);
      
      var AllowRefresh = confirm("Settings applied sucessfully. The page must be reloaded for changes to take effect.\n\nReload Now?");
      if(AllowRefresh){
        location.reload(true);
      }
    }
  } catch(err) {
    GM_log("Error = "+err);
    GM_log("TimeDiff_Manual = "+TimeDiff_Manual);
    alert("An error occured! Time difference settings may not have been updated correctly. Please retry then report this error.\n\nNOTE: Offset must be >-24 and <24 hours.");
  }
}


// Add menu commands
  GM_registerMenuCommand("Neobux Server Time: Manually Set Time Difference", EnableManualTimeDiff);
  GM_registerMenuCommand("Neobux Server Time: Auto-Detect Time Difference", EnableAutoTimeDiff);
  GM_registerMenuCommand("Neobux Server Time: Edit Update Frequency", editUpdateFrequency);
  
  
//*********************
// ** UPDATER CODE **
//*********************

// Grab the update frequency for use in the updater script
var updateFrequency = GM_getValue("updateFrequency",180);

AnotherAutoUpdater = {
// Config values, change these to match your script
 id: '51040', // Script id on Userscripts.org
// days: 2, // Days to wait between update checks
 days: 1000*60*updateFrequency,
 
// Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1],
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
      onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion = /\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname = /\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      GM_log('this.xversion == '+this.xversion);
      this.xversion = parseFloat(this.xversion[1]);
      GM_log('this.xversion == '+this.xversion);
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
      GM_setValue('updated_'+this.id, 'off');
      return false;
    }
    
    if(this.xupdateNote=/\/\/\s*@updateNote\s+(.*)\s*\n/i.exec(xpr.responseText)) {
      this.xupdateNote = this.xupdateNote[1];
      GM_log('this.xupdateNote == '+this.xupdateNote);
      this.updateNotice = this.xupdateNote;
    } else {
      this.updateNotice = '';
    } 
    
    
    
    // otherVerIsNewerVersion(currentVer,otherVer) ?
    var hasBeenUpdated = otherVerIsNewerVersion(this.version,this.xversion);
    GM_log('hasBeenUpdated = '+hasBeenUpdated);
    
    if (hasBeenUpdated) {
      GM_log('Newer version available');
      if (confirm('A new version of the '+this.xname+' user script is available.\n\nCurrent version: '+this.version+'\nAvailable version: '+this.xversion+'\n\nNotes about the Available version:\n'+this.updateNotice+'\n\nDo you wish to update to v'+this.xversion+'?')) {
        GM_log('New version being downloaded.');
        GM_setValue('updated_'+this.id, this.time+'');
        top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
      } else {
        GM_log('New version declined');
        if(confirm('Do you want to turn off auto updating for this script?')) {
          GM_log('AutoUpdates turned off');
          GM_setValue('updated_'+this.id, 'off');
          GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); 
          AnotherAutoUpdater.call(true);});
          alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
        } 
        GM_setValue('updated_'+this.id, this.time+'');
      }
    } else {
      GM_log('New version NOT available');
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated_'+this.id, this.time+'');
    }
  },
  
 check: function() {
    if (GM_getValue('updated_'+this.id, 0) == 0) GM_setValue('updated_'+this.id, this.time+'');
    
    if ( (GM_getValue('updated_'+this.id, 0) != 'off') && (+this.time > (+GM_getValue('updated_'+this.id, 0) + (this.days))) ) {
        this.call();
    } else if (GM_getValue('updated_'+this.id, 0) == 'off') {
        GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    }
        GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.check(true);});
  }

};

if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();

var currentVer;
var otherVer;


// CUSTOM FUNCTION -- Compares two version numbers
// Returns true if current version < 'other' version
function otherVerIsNewerVersion(currentVer_input,otherVer_input) {

GM_log('currentVer_input = '+currentVer_input);
GM_log('otherVer_input = '+otherVer_input);


var otherVerIsNewer;

currentVer = currentVer_input.toString().split('.');
if(currentVer[0]) { current_MajVer = currentVer[0]; } else { current_MajVer = 0; } 
if(currentVer[1]) { current_MinVer = currentVer[1]; } else { current_MinVer = 0; }
if(currentVer[2]) { current_BugVer = currentVer[2]; } else { current_BugVer = 0; }

otherVer = otherVer_input.toString().split('.');
if(otherVer[0]) { other_MajVer = otherVer[0]; } else { other_MajVer = 0; } 
if(otherVer[1]) { other_MinVer = otherVer[1]; } else { other_MinVer = 0; }
if(otherVer[2]) { other_BugVer = otherVer[2]; } else { other_BugVer = 0; }

GM_log('current_MajVer,current_MinVer,current_BugVer = '+current_MajVer+','+current_MinVer+','+current_BugVer);
GM_log('other_MajVer,other_MinVer,other_BugVer = '+other_MajVer+','+other_MinVer+','+other_BugVer);

  if(current_MajVer < other_MajVer) {
    otherVerIsNewer = true;
    GM_log('Reason: current_MajVer < other_MajVer');
  } else if(current_MajVer == other_MajVer) {
    if((current_MinVer < other_MinVer)) {
      otherVerIsNewer = true;
      GM_log('Reason: current_MajVer == other_MajVer');
    } else if((current_MinVer == other_MinVer) && (current_BugVer < other_BugVer)) {
      otherVerIsNewer = true;
      GM_log('Reason: (current_MinVer == other_MinVer) && (current_BugVer < other_BugVer)');
    } else {
      otherVerIsNewer = false;
      GM_log('Reason: current_MinVer == other_MinVer');
    }
  } else {
    otherVerIsNewer = false;
    GM_log('Reason: current_MajVer > other_MajVer');
  }
  
  GM_log('otherVerIsNewerVersion(currentVer_input,otherVer_input) = '+otherVerIsNewer);
  return otherVerIsNewer;
  
}


//******************
//**MENU FUNCTIONS**
//******************
// Function called from the Menu to edit how often the script checks for updates
function editUpdateFrequency() {
  var updateFrequency = parseFloat(GM_getValue('updateFrequency',10));
  
  var updateFrequency_Input = prompt('Please enter how often you would like to check for updates (minutes).',updateFrequency);
      GM_log("updateFrequency_Input = "+updateFrequency_Input);
    updateFrequency = parseFloat(updateFrequency_Input);
      GM_log("updateFrequency = "+updateFrequency);

  try {
    if(updateFrequency>=0 && updateFrequency<1440){
      GM_setValue('updateFrequency',String(updateFrequency));
      GM_setValue("AutoDetectTimeOffset",false);
      
      alert("Settings applied sucessfully. Neobux Server Time will now check for updates every "+updateFrequency+" minutes.");
    }
  } catch(err) {
    GM_log("Error = "+err);
    GM_log("updateFrequency = "+updateFrequency);
    alert("An error occured! Please retry then report this error. \n\nNOTE: minimum = 0minutes, maximum = 1440 (24hrs), 1.5mins = 90seconds.");
  }
}

// Function called from the Menu to enable automatically detecting the time difference
function EnableAutoTimeDiff() {
    var answer = confirm("Are you sure that you want to automatically detect the Server Time?");
  if (answer) {
    GM_setValue("AutoDetectTimeOffset",true);
    var AllowRefresh = confirm("For the script to be able to detect the time difference, you must view your \"View Advertisements\" page.\n\nView Now?");
    if(AllowRefresh){
      location.href = 'http://www.neobux.com/?u=v';
    }
  }
}