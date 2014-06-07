scr_meta=<><![CDATA[
// ==UserScript==
// @name           Neobux Golden Graph Enhancements
// @namespace      http://userscripts.org/users/kwah
// @description    Enhances the features of the Neobux graphs that golden members can view

// @include        http://www.neobux.com/c/rl/?ss3=2
// @include	   http://www.neobux.com/c/rl/?ss3=1
// @include	   http://www.neobux.com/c/rs/
// @include        http://www.neobux.com/c/
// @include        http://www.neobux.com/refstat/?refu=*
// @include        https://www.neobux.com/refstat/?refu=*
// @include        http://www.neobux.com/?u=c&s=r*
// @include        https://www.neobux.com/?u=c&s=r*
// @exclude       http://www.neobux.com/?u=c&s=rs*
// @exclude       https://www.neobux.com/?u=c&s=rs*

// @version        2.0.2

// @updateNote     v2.0.2 - Works with the different length graphs

// ==/UserScript==
]]></>.toString();


// Turn console logging on/off
var debug = false;
if(!debug) { function GM_log() {} }

if(GM_getValue("FirstUse",1)==1) {
  GM_setValue("Time_Period_1",4); 
  GM_setValue("Time_Period_2",7);
  GM_setValue("Time_Period_3",10);
  GM_setValue("autoDetectSliderSettings",true);
  GM_setValue("updateFrequency",120);
  GM_setValue("FirstUse",0);

  alert("Welcome and enjoy your use of this greasemonkey script =] \nIt is now completely setup and ready to use.\n\nNOTE: Changes to your slider bar settings may require you to reopen your graph.");

}

var referralGraphLength;
referralGraphLength = 10;
GM_log('referralGraphLength = '+referralGraphLength);

if(document.location.href.indexOf('neobux.com/refstat/?refu=')) {

  var autoDetectSliderSettings = GM_getValue("autoDetectSliderSettings",true);

  var timePeriod1 = GM_getValue("Time_Period_1",4); 
  var timePeriod2 = GM_getValue("Time_Period_2",7);
  var timePeriod3 = GM_getValue("Time_Period_3",10);
  GM_log('timePeriod1 = '+timePeriod1);
  GM_log('timePeriod2 = '+timePeriod2);
  GM_log('timePeriod3 = '+timePeriod3);
  
// Grab flashflashVars of the graph
  var Rental_Stats = document.getElementById('ch2Div');
  var flashVars = Rental_Stats.childNodes[0].getAttribute('flashvars');
  // GM_log('flashVars = '+flashVars);
  
// Extract click data
  var regex = /value\='[0-9]+/g;
  var clicks = flashVars.match(regex);
  for(i=0; i<clicks.length; i++) { clicks[i] = parseInt(clicks[i].replace(/value\='/,"")); }
  
  GM_log('clicks = '+clicks);
  GM_log('clicks.length = '+clicks.length);

// If click data is present, continue
  if(clicks.length == (2*referralGraphLength)) {
  // Seperate actual clicks from clicks that have been credited.
    var actualClicks = new Array();
    var creditedClicks = new Array();
    
    for (i=0; i<referralGraphLength; i++) { actualClicks.push(Number(clicks[i])); }
    for (i=referralGraphLength; i<(2*referralGraphLength); i++) {
      creditedClicks.push(Number(clicks[i]));
    }

    actualClicks.reverse();
    creditedClicks.reverse();
    
    GM_log('actualClicks = '+actualClicks);
    GM_log('creditedClicks = '+creditedClicks);
    
    
  // Sum up total clicks for each time timePeriod
    var totalClicks_Period1 = 0;
    var totalClicks_Period2 = 0;
    var totalClicks_Period3 = 0;
    var value;
        
    for(a=0; a<actualClicks.length; a++) {
      value = actualClicks[a];
      // GM_log('value = '+value);
      // GM_log('typeof(value) = '+typeof(value));
      if(a < timePeriod1) { totalClicks_Period1 += Number(value); }
      if(a < timePeriod2) { totalClicks_Period2 += Number(value); }
      if(a < timePeriod3) { totalClicks_Period3 += Number(value); }
      // GM_log('totalClicks_Period1 = '+totalClicks_Period1);
      // GM_log('totalClicks_Period2 = '+totalClicks_Period2);
      // GM_log('totalClicks_Period3 = '+totalClicks_Period3);
    }
    GM_log('totalClicks_Period1 = '+totalClicks_Period1);
    GM_log('totalClicks_Period2 = '+totalClicks_Period2);
    GM_log('totalClicks_Period3 = '+totalClicks_Period3);
    
// Calculate the average number of clicks per day for each time timePeriod
    averageClicks_Period1 = Math.round((totalClicks_Period1/timePeriod1)*100)/100;
    averageClicks_Period2 = Math.round((totalClicks_Period2/timePeriod2)*100)/100;
    averageClicks_Period3 = Math.round((totalClicks_Period3/timePeriod3)*100)/100;
    
// Set the colours that are going to be used for text
    var Colours = new Array();
    Colours[0] = '#00BB00'; // 'Good' average (Green) / ROW colour = #66FF66
    Colours[1] = '#FF9900'; // 'Medium' average (Yellow) /  ROW colour = #FFDD00
    Colours[2] = '#FF3333'; // 'Low' average (Red) / ROW colour = #FF8888
    Colours[3] = '#000000'; // Default colour (Black)
    
    
    GM_log('document.location.href = '+document.location.href);
    GM_log('top.document.location.href = '+top.document.location.href);
    GM_log('autoDetectSliderSettings = '+autoDetectSliderSettings);
    
// Fetch the limits from outside the frame if the graph frame hasn't been opened directly
    if((document.location.href !== top.document.location.href) && (autoDetectSliderSettings)) {
    GM_log('Referral graph has not been opened directly');
      // Fortunately, the settings are also stored somewhere on the page that is accessible
      var Slider_innerHTML = top.document.getElementById('dateSlider');
      var MoreHTML = Slider_innerHTML.childNodes[0].innerHTML
      GM_log('MoreHTML = '+MoreHTML);
      
      // Narrow down to exactly where they are stored:
      var RegExp_Narrowing = /toFixed\(1\)\=\=\[[0-9]\.[0-9],[0-9]\.[0-9]\]/;
      var x = MoreHTML.match(RegExp_Narrowing); // outputs "toFixed(1)==[1.8,2.2)" (minus the quotes) where 1.8 and 2.2 are your limits
      GM_log('x = '+x);
      
      // Fetch the actual limits
      var RegExp_Limits = /[0-9]\.[0-9]/g;
      var Limits = x[0].match(RegExp_Limits);
      
      // Store the Upper and Lower limits accordingly (in the code above, the limits appear in order)
      GM_setValue('LowerLimit',Limits[0]);
      GM_setValue('UpperLimit',Limits[1]);
    } else {
      GM_log('Referral graph has been opened directly');
    }
    
    var Upper_Limit = GM_getValue('UpperLimit',2.2);
    var Lower_Limit = GM_getValue('LowerLimit',1.8);

      GM_log('LowerLimit = '+Lower_Limit);
      GM_log('UpperLimit = '+Upper_Limit);
    
    // Set the colours that each time period will be displayed in. 

    if(averageClicks_Period1 < Lower_Limit) { 
      Period1_Colour = Colours[2]; 
    } else if(averageClicks_Period1 >= Upper_Limit) {
      Period1_Colour = Colours[0]; 
    } else if(Lower_Limit <= averageClicks_Period1 && averageClicks_Period1 < Upper_Limit) { 
      Period1_Colour = Colours[1]; 
    } else {
      Period1_Colour = Colours[3]; 
    }

    if(averageClicks_Period2 < Lower_Limit) {
      Period2_Colour = Colours[2]; 
    } else if(averageClicks_Period2 >= Upper_Limit) {
      Period2_Colour = Colours[0]; 
    } else if(Lower_Limit <= averageClicks_Period2 && averageClicks_Period2 < Upper_Limit) {
      Period2_Colour = Colours[1]; 
    } else {
      Period2_Colour = Colours[3]; 
    }

    if(averageClicks_Period3 < Lower_Limit) {
      Period3_Colour = Colours[2]; 
    } else if(averageClicks_Period3 >= Upper_Limit) {
      Period3_Colour = Colours[0]; 
    } else if(Lower_Limit <= averageClicks_Period3 && averageClicks_Period3 < Upper_Limit) {
      Period3_Colour = Colours[1]; 
    } else {
      Period3_Colour = Colours[3]; 
    }


    GM_log('Period1_Colour = '+Period1_Colour);
    GM_log('Period2_Colour = '+Period2_Colour);
    GM_log('Period3_Colour = '+Period3_Colour);

    // Create the HTML for each time period and set the colouring.

    var HTML_Period1 = timePeriod1 + 'days: [<b style="color:'+Period1_Colour+'">'+totalClicks_Period1+'/'+averageClicks_Period1.toFixed(2)+'</b>]';
    var HTML_Period2 = timePeriod2 + 'days: [<b style="color:'+Period2_Colour+'">'+totalClicks_Period2+'/'+averageClicks_Period2.toFixed(2)+'</b>]';
    var HTML_Period3 = timePeriod3 + 'days: [<b style="color:'+Period3_Colour+'">'+totalClicks_Period3+'/'+averageClicks_Period3.toFixed(2)+'</b>]';

    GM_log('HTML_Period1 = '+HTML_Period1);
    GM_log('HTML_Period2 = '+HTML_Period2);
    GM_log('HTML_Period3 = '+HTML_Period3);
    
    // Concatenate it all together with some extra text to format it nicely

    Rental_Stats.innerHTML = Rental_Stats.innerHTML+"<span style='font-family:Verdana; font-size:8pt; margin-top:4px;'><br>Clicks - "+ HTML_Period3+" - "+HTML_Period2+" - "+HTML_Period1+"</span>";

    GM_log('Rental_Stats.innerHTML = '+Rental_Stats.innerHTML);
  }  

}

  
//*********************
// ** UPDATER CODE **
//*********************

  GM_registerMenuCommand("Neobux Golden Graph Enhancements: Edit Update Frequency", editUpdateFrequency);  

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
          GM_registerMenuCommand("Auto Update "+this.name, function() {GM_setValue('updated_'+this.id, new Date().getTime()+''); 
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
        GM_registerMenuCommand("Enable "+this.name+" updates", function() {GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    }
        GM_registerMenuCommand("Check "+this.name+" for updates", function() {GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.check(true);});
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
    if(updateFrequency>=0 && updateFrequency<1440) {
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