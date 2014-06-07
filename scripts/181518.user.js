// ==UserScript==
// @name           OSCongesHighlightToday
// @namespace      cc.in2p3.fr
// @description    Highlights today's column in OS Conges planning
// @include        https://agate.cnrs.fr/planning_riche/*
// @license        CeCILL http://www.cecill.info/index.en.html
// @contributor    Foudil BRÉTEL
// @updateURL      https://userscripts.org/scripts/source/181518.user.js
// @version        0.3
// ==/UserScript==

const OSCONGES_BORDER_STYLE = "medium navy solid";

function zeroPad(n){return n<10 ? '0'+n : ''+n;}

// get date components
let now = new Date();
let currentMonthStr = now.getFullYear()+"-"+zeroPad(now.getMonth()+1);
let currentMonthStrAltFmt = now.getFullYear()+"-"+(now.getMonth()+1);
let currentDayStr = zeroPad(now.getDate());

// check current month displayed
let planningAllData = document.getElementById("planning_content_data");
if (!planningAllData) exit;

let planningCols = planningAllData.getElementsByClassName("div_planning_colonne");
let currentMonthFound = false, currentMonthAltFmtFound = false;
for (let i=0, len=planningCols.length ; i<len; ++i) {
  let month = planningCols[i].getAttribute("data-mois");
  if (currentMonthStr === month)
    currentMonthFound = true;
  if (currentMonthStrAltFmt === month)
    currentMonthAltFmtFound = true;
}
if (!currentMonthFound && !currentMonthStrAltFmt) exit;
if (currentMonthAltFmtFound)
  currentMonthStr = currentMonthStrAltFmt;

// highlight today header
let days = document.querySelectorAll(
  '#planning_header div[data-mois="'+currentMonthStr+
  '"] .li_jour'
);
for (let i=0, len=days.length; i<len; ++i) {
  let day = days[i];
  if (currentDayStr === day.getAttribute("data-jours")) {
    day.style.borderLeft =
    day.style.borderRight =
    day.style.borderTop =
    OSCONGES_BORDER_STYLE;
  }
}

// highlight today cells
days = document.querySelectorAll(
  '#planning_content_data div[data-mois="'+currentMonthStr+
  '"] .li_jour'
);
let lastDay;
for (let i=0, len=days.length; i<len; ++i) {
  let day = days[i];
  if (currentDayStr === day.getAttribute("data-jours")) {
    day.style.borderLeft =
    day.style.borderRight =
    OSCONGES_BORDER_STYLE;
    lastDay = day;
  }
}
if (lastDay) lastDay.style.borderBottom = OSCONGES_BORDER_STYLE;
