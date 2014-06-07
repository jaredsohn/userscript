// ==UserScript==
// @name           Modify SOGo Skin
// @author         Zarkon
// @version        1
// @description    Removes SOGo appointmentList from calendar etc.
// @include        *sogo.*/SOGo*Calendar*
// @namespace      tag:neuland
// ==/UserScript==

GM_addStyle("DIV#rightDragHandle, DIV#eventsListView, DIV#filterPanel { visibility:hidden; } DIV#rightDragHandle, DIV#calendarView {top: 1px !important; }");
GM_addStyle("UL#calendarList { height: 815px !important; } DIV#tasksListView {visibility:hidden; } DIV#schedulerTabs { height: 886px !important; }");
GM_addStyle("div#calendarHeader div.days { height: 210px; top: 20px; }");
GM_addStyle("div#daysView { top: 250px; }");
GM_addStyle("div#calendarHeader div.dayLabels { top: -15px; }" );

