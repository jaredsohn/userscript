// ==UserScript==
// @name          Two minute warnings
// @namespace     http://jeffpalm.com/twominutewarnings
// @description   Sets notifications for certain times during sports games
// @include       *scoreboard*
// ==/UserScript==

/*
 * Copyright 2007 Jeffrey Palm.
 */

// --------------------------------------------------
// Misc
// --------------------------------------------------

var PREFIX = "*twominutewarnings*.";

var COLOR_RED   = "#770000";
var COLOR_GREEN = "#007700";

var TIMEOUT_SECS = 5000;

var ids = [];


function setValue(key,val) {
  return GM_setValue(PREFIX + key,val);
}

function getValue(key,defaultValue) {
  if (!defaultValue) defaultValue = '';
  var res = GM_getValue(PREFIX + key);
  if (!res) res = defaultValue;
  return res;
}

function $n(tag,on) {
	var e = document.createElement(tag);
	if (on) on.appendChild(e);
  if (arguments.length > 2) setId(e,arguments[2]);
	return e;
}

function $t(text,on) {
	var e = document.createTextNode(text);
	if (on) on.appendChild(e);
	return e;
}

function $(id) {
  if (typeof id == "string") {
    var el = document.getElementById(id);
    return el;
  }
  return id;
}

function setId(el,id) {
  el.id = id;
}

function getLableId(id) {
  return id + "_label";
}

function getMinutesId(id) {
  return id + "_minutes";
}

function getSecondsId(id) {
  return id + "_seconds";
}

function getTimeId(id) {
  return id  + "-st";
}

function setLabel(id,time) {
  var n = $(getLableId(id));
  n.style.color = COLOR_GREEN;
  n.innerHTML = time;
}

function unsetLabel(id) {
  var n = $(getLableId(id));
  n.style.color = COLOR_RED;
  n.innerHTML = "Unset";
  setValue(getMinutesId(id),'');
  setValue(getSecondsId(id),'');
  $(getMinutesId(id)).value = '';
  $(getSecondsId(id)).value = '';
}

function space(node) {
  $t(" ",node);
}

function getHomeTeamName(id) {
  return getTeamName(id,"h");
}

function getAwayTeamName(id) {
  return getTeamName(id,"a");
}

function getTeamName(id,prefix) {
  var span = $(id + "-" + prefix + "tr");
  var a = span.previousSibling.previousSibling;
  return a.innerHTML;
}

function createMessage(id,time) {
  return getHomeTeamName(id) + " vs. " + getAwayTeamName(id) + " @ " + time;
}

function error(e) {
  alert(e);
  return false;
}

function checkValidNumber(n,name) {
  if (!n || n == "") {
    return error("You must input a value for '" + name + "'");
  }
  var v = 0;
  try {
    v = parseInt(n);
  } catch (e) {
    return error("Invalid number for '" + name + "' " + n);
  }
  if (v < 0) {
    return error(name + " " + v + " must be >= 0");
  }
  if (v > 60) {
    return error(name + " " + v + " must be <= 60");
  }
  return true;
}

function sendMessage(id,time) {
  var txt = createMessage(id,time);
  var url = "http://jeffpalm.com/twominutewarnings/send_message.php";
  url += "?contact=" + escape(getValue("contact"));
  url += "&msg=" + escape(txt);
  GM_xmlhttpRequest({
    method:"GET",
        url: url,
        headers:{
        "User-Agent": "monkeyagent",
          "Accept":"text/html,text/monkey,text/xml,text/plain",
          },
        onload: function(details) {
        // nothing
      }
    });
}

function noteDone(id,time) {
  alert("Already done! " + createMessage(id,time));
}

/** 
 * @param useCurrent is 'true' to use the current stored email before asking.
 */
function ensureContact(useCurrent) {
  var email = useCurrent ? getValue("contact") : null;
  while (!email) {
    email = prompt("Please enter an email address (e.g. foo@bar.com).  By doing so you agree not to use this script maliciously or for any other reason than the intended reason.");
  }
  setValue("contact",email);
  return email;
}


// --------------------------------------------------
// Main
// --------------------------------------------------

function checkLabels() {
  for (var i=0; i<ids.length; i++) {
    var id = ids[i];
    var minutesStr = getValue(getMinutesId(id));
    var secondsStr = getValue(getSecondsId(id));
    if (!minutesStr) continue;
    if (!secondsStr) continue;
    var minutes = parseInt(minutesStr);
    var seconds = parseInt(secondsStr);
    var total = 60*minutes + seconds;
    var time = $(getTimeId(id)).innerHTML;
    if (!time) continue;
    if (res = time.match(/(\d+):(\d+)/)) {
      var minutesNow = parseInt(res[1]);
      var secondsNow = parseInt(res[2]);
      var extra = 0;
      if (time.match(/.*1st.*/)) {
        extra = 45;
      } else if (time.match(/.*2nd.*/)) {
        extra = 30;
      } else if (time.match(/.*3rd.*/)) {
        extra = 15;
      }
      var totalNow = 60*minutesNow + secondsNow + 60*extra;
      if (totalNow<total) {
        sendMessage(id,time);
        unsetLabel(id);
      }
    } else if (time.match(/.*Final.*/)) {
      noteDone(id,time);
      unsetLabel(id);
    }
  }
}

function setIntervals() {
  setInterval(checkLabels,TIMEOUT_SECS);
}

function setLabels() {
  if (!ids || ids.length == 0) return;
  for (var i=0; i<ids.length; i++) {
    var id = ids[i];
    var minutes = getValue(getMinutesId(id));
    var seconds = getValue(getSecondsId(id));
    if (!minutes || !seconds) continue;
    $(getMinutesId(id)).value = minutes;
    $(getSecondsId(id)).value = seconds;
    setTimeString(id,minutes,seconds);
  }
}

function setTimeString(id,minutes,seconds) {
  var minutesStr = minutes;
  var secondsStr = seconds;
  if (!secondsStr) {
    secondsStr = "00";
  } else if (secondsStr.length<2) {
    secondsStr = "0" + secondsStr;
  }
  setLabel(id, minutesStr + ":" + secondsStr);
}

function newSetFunction(id) {
  var _id = id;
  return function() {
    var minutes = $(getMinutesId(_id)).value;
    var seconds = $(getSecondsId(_id)).value;
    if (!checkValidNumber(minutes,"minutes")) return;
    if (!checkValidNumber(seconds,"seconds")) return;
    if (!minutes && !seconds) {
      alert("You have to set at one of 'minutes' or 'seconds'");
      return;
    }
    // Make sure we have someone to notify
    var email = ensureContact(true);
    setValue(getMinutesId(_id),minutes);
    setValue(getSecondsId(_id),seconds);
    setTimeString(_id,minutes,seconds);
  }
}

function newUnsetFunction(id) {
  var _id = id;
  return function() {
    unsetLabel(_id);
  }
}

function addInputs() {
  var ns = document.getElementsByTagName("div");
  for (var i=0; i<ns.length; i++) {

    var n = ns[i];

    if (!n.className || n.className != "gameNote") continue;

    var id = n.id.replace(/-.*/,"");
    ids.push(id);

    var minutesInput = $n("input",n,getMinutesId(id));
    minutesInput.type = "text";
    minutesInput.size = 2;

    $t(" : ",n);

    var secondsInput = $n("input",n,getSecondsId(id));
    secondsInput.type = "text";
    secondsInput.size = 2;

    space(n);

    var setInput = $n("input",n);
    setInput.type = "submit";
    setInput.value = "Set";
    setInput.addEventListener('click', newSetFunction(id), true);

    var unsetInput = $n("input",n);
    unsetInput.type = "submit";
    unsetInput.value = "Unset";
    unsetInput.addEventListener('click', newUnsetFunction(id), true);

    space(n);
    
    var label = $n("span",n,getLableId(id));
    label.style.color = COLOR_RED;
    label.innerHTML = "Unset";
  }
}

function main() {
  GM_registerMenuCommand("Set contact for 2MWs", ensureContact);
  addInputs();
  setLabels();
  setIntervals();
}

main();
