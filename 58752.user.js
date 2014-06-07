// ==UserScript==
// @name           Timeflux Expander
// @namespace      http://henrik.synth.no
// @include        https://timeflux.heroku.com/users/*/time_entries*
// ==/UserScript==


var version = 200910050900;
var evt;
function letsFilter() {
  evt = clickEvent();
   
   var newdiv = document.createElement('div');
   newdiv.innerHTML = '<input type=button value="0.0" onclick="javascript:autoWeek(\'0.0\')";><input type=button value="7.5" onclick="javascript:autoWeek(\'7.5\')";><input type=button value="8.0" onclick="javascript:autoWeek(\'8.0\')";><input type=button value="Save All" onclick="javascript:autoSave()";>';
   document.getElementById("week_total").appendChild(newdiv);

   embedFunction(autoWeek);
   embedFunction(autoSave);
   embedFunction(getDays);
   embedFunction(clickEvent);
   
   openLinks();
}

function getDays() {
    return new Array("Monday","Tuesday","Wednesday","Thursday","Friday");
}

function openLinks() {
  var days = getDays();
  for(var i=0; i<days.length; i++) {
    var entries = document.getElementById(days[i] + "_time_entries");
    if (!entries) {
      document.getElementById(days[i] + "_new_time_entry_link").dispatchEvent(evt);
    } else {
      var atag = entries.getElementsByTagName('a')[1];
      if (atag) {
        atag.dispatchEvent(evt) 
      }
    }
  }
}

function embedFunction(s) {
  document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

function clickEvent() {
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);
  return evt;
}    

function autoSave() {
  var evt = clickEvent();  
  var days = getDays();
  for(var i=0; i<days.length; i++) {
    var entries = document.getElementById(days[i] + "_time_entries"); 
    var actions = entries.getElementsByClassName("time_entry_actions")[0];
    var input = actions.getElementsByTagName("input")[0].dispatchEvent(evt);
  }
}

function autoWeek(hours) {
  var days = getDays();
  for(var i=0; i<days.length; i++) {
    var entries = document.getElementById(days[i] + "_time_entries"); 
    entries.getElementsByTagName("input")[0].value = hours;
  }
}

window.onload = letsFilter();