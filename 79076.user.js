// ==UserScript==
// @name         StackOverflow Fanatic
// @namespace    stackoverflowFanatic
// @include      http://stackoverflow.com/*
// @include      https://stackoverflow.com/*
// @match        http://stackoverflow.com/*
// @match        https://stackoverflow.com/*
// @datecreated  2010-06-13
// @lastupdated  2010-06-13
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

(function(d){
  var usrStats = d.getElementById('hlinks-user');
  if (!usrStats) return;

  var today = new Date((new Date()).toString());
  var lastday = new Date(GM_getValue("lastDay", today.toString()));
  var oneday = 86400000;
  var datediff = (today - lastday);
  function getDayCount() {return GM_getValue("dayCount", 1);}

  // reset lastday and dayCount
  if (oneday < datediff) {
    GM_deleteValue('dayCount');
  }
  // add a day
  else if (today.getDate() != lastday.getDate()) {
    GM_setValue("dayCount", getDayCount() + 1);
  }

  // reset lastday
  GM_setValue("lastDay", today.toString());

  var dayCount = getDayCount();
  dayCount += (dayCount == 1) ? " day" : " days";

  var newSpan = d.createElement('span');
  newSpan.setAttribute("title", "consecutively visited " + dayCount );
  newSpan.setAttribute("style", "font-weight: bold; font-size: 90%; color: #444");
  newSpan.innerHTML = dayCount;

  usrStats.insertBefore(newSpan, usrStats.lastChild.previousSibling);
})(document);
