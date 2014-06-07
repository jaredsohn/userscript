// ==UserScript==
// @name           Google Calendar Go To Date
// @namespace      tag:tilman.vogel@web.de,2008:userscripts
// @description    Allows to jump to a specific date by clicking on the date field
// @include        http://www.google.com/calendar/render*
// @include        https://www.google.com/calendar/render*
// ==/UserScript==

function gotoDate(evt){
  evt.preventDefault();
  
  var val = this.yyyymmdd.value;
  if (val.length <= 4) 
    // only four digits: need to add month
    val = val + "01";
  if (val.length <= 6) 
    // only six digits: need to add day
    val = val + "01";
  
  // pre 20080215 location.href="javascript:void(z.O(oa('"+val+"')))";
  //
  //location.href="javascript:void(X.Da(Sl('"+val+"')))";
  location.href = "javascript:void(tvGOTO('" + val + "'))";
}


function addDateInput(){
  if (this.getElementsByTagName('FORM').length > 0) 
    return;
  
  // pre 20080215 var current = window.getGlobalValue('Wa');
  // var current = window.getGlobalValue('Yv');
  
  var current = unsafeWindow[currentdatevariable];
  olddate = this.innerHTML;
  
  this.innerHTML = "\
<form style='margin:0px; display:inline;' action='' method='get'>\
<input title='specify date as day (20071231), month (200712) or year (2007)' \
 id='userscript-yyyymmdd' name='yyyymmdd' value='" + current + "' size=8 maxlength=8> \
</form>\
";
  
  this.firstChild.addEventListener('submit', gotoDate, false);
  
  var field = document.getElementById('userscript-yyyymmdd');
  field.addEventListener('blur', removeDateInput, false);
  field.select();
  field.focus();
}

function removeDateInput(){
  datefield.innerHTML = olddate;
}


// init()

if (unsafeWindow.console !== 'undefined') {
  GM_log = unsafeWindow.console.log;
}

// main()

var datefield = document.getElementById('dateunderlay');
var olddate;
var currentdatevariable;
var definedGOTO;

if (!datefield) {
  GM_log("didn't find datefield - fatal");
  return;
}

// try to "understand" google calendar
// this will probably fail in some future version of google calendar
for (var f in unsafeWindow) 
  if (typeof unsafeWindow[f] === 'function') {
    var fSrc = unsafeWindow[f].toString();
    
    // try to find "current date" variable
    if (fSrc.match('"day"') && !fSrc.match('undefined')) {
      var match = fSrc.match(/([a-zA-Z0-9_$]+) = [a-zA-Z0-9_$]+ = [a-zA-Z0-9_$]+/);
      if (match) {
        currentdatevariable = match[1];
        GM_log("currentdatevariable found in "+ f +"(): " + currentdatevariable);
      }
    }
    
    // try to find "go to month function" and transform it to generic "go to" function
    if (fSrc.match('"month"') && !fSrc.match('"week"')) {
      // rename it
      fSrc = fSrc.replace(/^function [^\(]*/, 'function tvGOTO');
      // remove mode switch
      fSrc = fSrc.replace(/.*"month".*/, '');
      GM_log("copied and modified "+f+"() to produce:\n" + fSrc);
      // define it using the location hack
      fSrc = "javascript:" + encodeURI(fSrc);
      //GM_log(fSrc);
      location.href = fSrc;
      definedGOTO = true;
    }
  }

if (!currentdatevariable) {
  GM_log("didn't find current date variable - fatal");
  return;
}

if (!definedGOTO) {
  GM_log("couldn't define GOTO function - fatal");
  return;
}

datefield.style.cursor = 'pointer';
datefield.addEventListener('click', addDateInput, false);
