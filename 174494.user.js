// ==UserScript==
// @name        Intel Historical Log
// @updateURL	https://userscripts.org/scripts/source/174494.user.js
// @description Show historical log from public/compact/public/faction
// @include     http://www.ingress.com/intel*
// @include     https://www.ingress.com/intel*
// @version     0.0.7
// @grant          none
// @copyright  2013, MyComputer@HK Resistance
// ==/UserScript==


function wrapper() {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

// PLUGIN START ////////////////////////////////////////////////////////
/* whatsnew
* 0.0.7 : bug fixes
* 0.0.6 : added time to search
*		  force fetch more data from intel (5x to default values)
*		  removed additional 1 day 30mins
*		  added input validation
* 0.0.5 : added https
* 0.0.4 : changed additional time from 30mins to 1day30mins
* 0.0.3 : added force refresh chat log
* 0.0.2 : uploaded to userscript.org
* 0.0.1 : initial release
*/ 

// use own namespace for plugin
window.plugin.intelhistory = function() {};


window.plugin.intelhistory.validateDateString = function(dateStringInput) {
     var dateRe = new RegExp("^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2})$");
     var matches = dateRe.exec(dateStringInput);
     if (!matches) return false;
     var composedDate = new Date(matches[1], (matches[2] - 1), matches[3],matches[4],matches[5],'00');
     return (
	  (composedDate.getMonth() == (matches[2] - 1)) &&
      (composedDate.getDate() == matches[3]) &&
      (composedDate.getFullYear() == matches[1]) &&
	  (composedDate.getHours() == matches[4]) &&
	  (composedDate.getMinutes() == matches[5])
	  );
};

/*window.plugin.intelhistory.convertStringtoTime = function(dateString) {
var ch_datestring = dateString;
ch_datestring=ch_datestring.split("-");
var newDate=ch_datestring[1]+"/"+ch_datestring[2]+"/"+ch_datestring[0];
return((new Date(newDate).getTime())); 
};*/

window.plugin.intelhistory.convertStringtoTimev2 = function(datetimeString) {
var datetimeArray = datetimeString.split(' ');
var sDate = datetimeArray[0].split('-');
var sTime = datetimeArray[1].split(':');
var newDate = new Date(sDate[0], sDate[1]-1, sDate[2], sTime[0], sTime[1], '00' );
//alert(newDate.getTime().toString());
return(newDate.getTime());
};

window.plugin.intelhistory.retriveHistory = function(dateStringInput) {
window.chat._public.oldestTimestamp = window.plugin.intelhistory.convertStringtoTimev2(dateStringInput);
window.chat._faction.oldestTimestamp = window.plugin.intelhistory.convertStringtoTimev2(dateStringInput);
//window.chat.request();
window.chat.needMoreMessages();
window.CHAT_PUBLIC_ITEMS = 1000;
window.CHAT_FACTION_ITEMS = 500;
alert('The chat date has been updated, log will be automatically loaded BEFORE the specific date and time. Press F5 to reset the log.');
};


var setup =  function() {
  var content = '<input id="dtHistory" placeholder="Type (YYYY-MM-DD hh:mm) to load historical log ..." type="text">';
  $('#sidebar').append(content);
  $('#toolbox').append('<a onclick=$("#dtHistory").focus() title="Find intel historical data">Intel Historical Log</a>');
  //$('#toolbox').append(' <a onclick="window.chat.request()" title="Refresh Log">Refresh Log</a>');
  $("#dtHistory").keypress(function(e) {
    if((e.keyCode ? e.keyCode : e.which) !== 13) return;
    var data = $(this).val();
	//window.plugin.intelhistory.retriveHistory(data);
	
	if (window.plugin.intelhistory.validateDateString(data))
	{
		window.plugin.intelhistory.retriveHistory(data);
	}
	else
		alert('Error input date format. Please try again.');
  });
}

// PLUGIN END //////////////////////////////////////////////////////////
if(window.iitcLoaded && typeof setup === 'function') {
  setup();
} else {
  if(window.bootPlugins)
    window.bootPlugins.push(setup);
  else
    window.bootPlugins = [setup];
}
} // wrapper end
// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);