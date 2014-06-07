// ==UserScript==
// @name          Dark Google Calendar
// @namespace     http://userstyles.org
// @description	  Darkened up Google Calendar
// @author        riser2
// @homepage      https://userscripts.org/scripts/show/172906
// @include       https://www.google.com/calendar/*
// @include       https://accounts.google.com/*
// @version       1.4.6
// @run-at        document-end
// @copyright     2013+, riser2
// ==/UserScript==
(function() {
    var css = "";
	css += "\
.gbes, #gridcontainer, .tg-times-pri, .tg-times-sec, .trans-strip, .calList, .wk-allday, .ep-scg-guestcell, .ep-scg-guestheader,\
  .ep-gs-ta-cont .goog-inline-block:hover { background: none repeat scroll 0 0 transparent !important; }\
body, #calmaster, #calcontent, #vr-nav, #mainnav,\
.wk-allday .st-bg-next, .st-bg,\
  #gbq1, .gb_j, .tg-col, .tg-timedevents, .wk-weektop, .wk-dayname, .calListRow, .dpdiv, .dp-weekday,\
  .tg-time-pri, .tg-time-sec, .rrd-background, .calHeader, .chromeColor, .bb, .ep-scg-guestcell { background: #000000; }\
.ep-dp, .ep-sp { background: #000000 !important; }\
#gbx3 { background: #111111; }\
.wk-allday .st-bg-today, .wk-allday .st-bg-td-first, .wk-allday .st-bg-td-last,\
  .dpi-popup, .sng-title-bar, .st-dtitle-nonmonth, .st-dtitle, .tg-today, .wk-allday .st-bg-today,\
  .mv-event-container, .bubblemain, .gbmc { background: #222222; }\
.qab-container, .asf-c, .goog-menu, .goog-menu .goog-menu-vertical, .goog-imageless-button-disabled { background: #222222 !important; }\
.dp-weekend, .dp-weekendh { background: #333333; }\
.wk-full-mode .wk-today, .dp-weekend-selected, .dp-weekday-selected, #searchAddCalBox, #srreg #maininput, #searchAddCal,\
  textarea, input, .gbqfqwb, #rhstogglecell, .goog-imageless-button, .navbuttonouter, #gbgs3, #gbi1a.gbid, .gbto .gbts,\
  .goog-option-selected, .mv-daynames-table, .mv-container, .mv-event-container { background: #444444; }\
\
.rb-ni { color: #000000; }\
a.gb_r, .wk-tzlabel, .gbt, .date-top, .textbox-fill-input, .sng-title-bar, .goog-menuitem-content, .lk-button, .goog-menuheader, .mv-daynames-table, .bubble, a.lk,\
  .Yb, .gbmc, .goog-menuitem, .ep-dp-dt-th, .ep-dp-createdby, .ep-dp-radio, .ep-go-guests-can label, .ep-dp-rtc .ui-sch, .ep-sac, .ep-gl-oa-legend { color: #999999; }\
.asf-c, #gbd .gbmt { color: #999999 !important; }\
#gbgs3, .calListLabel, .calListLabel-sel, .goog-imageless-button-content, .goog-inline-block, .ep-recl-summary { color: #CCCCCC; }\
.tg-hourmarkers, .wk-dayname, .tg-times-pri, .tg-times-sec,\
  .dp-cell, #dp_0_cur.dp-sb-cur, .calHeader, #dp_0_cur, #searchAddCal, .gbqfif, .qab-container, .qab-container label,\
  text, textarea, input, label, .goog-option-selected .goog-menuitem-content, .goog-menuitem-highlight .goog-menuitem-content, .ep-scg-guestcell,\
  .st-dtitle-nonmonth, .st-dtitle, .U, #gbz .gbto .gbts, .ep-gp-ts, .ep-go-label, .ci, .ch, .ep-gp-ts .ui-ltsr-selected, .ep-gl-head { color: #CCCCCC !important; }\
.lk, a:link { color: rgb(70, 214, 219); }\
\
#gb#gb a.gb_r:hover, #gb#gb a.gb_r:focus, .goog-imageless-button:hover, .goog-imageless-button-pos:hover, .goog-imageless-button-content:hover,\
  .navbuttonouter:hover, .goog-imageless-button-outer-box .goog-inline-block:hover,\
  #mg-more:hover, #gbgs3:hover, .gbtsb:hover, .calHeader:hover, .monthtableHeader:hover, .dp-onhover { background: #666666; color: #FFFFFF !important; }\
\
.wbkt.wk-scrolltimedevents { background: #999999; }\
\
.calListLabelOuter-hvr { color: #000000; background: #999999; }\
.ep-ts .ui-dtsr-unselected { color: #999999 !important; background: #222222 !important; text-decoration: none !important;\
  border-color: #999999 !important; border-bottom: none !important; }\
.goog-menuitem-active .goog-menuitem-highlight, #gbd .gbmt:hover, li.gbmtc:hover, .goog-menuitem-hover,\
  .ep-ts .ui-dtsr-selected, .ep-ts .ui-dtsr-unselected:hover { color: #CCCCCC !important; background: #444444 !important; }\
.goog-menuitem-highlight, .goog-menuitem-hover { background-color: #444444 !important; border-style: solid !important; border-color: #666666 !important; }\
\
#topLeftNavigation, #searchNavigation { position: relative; float: left; }\
#topRightNavigation { position: relative; float: right; top: 0; right: 16px; }\
\
#calendars_my, #calendars_fav, .button-strip { margin: 0; }\
.calHeader, .goog-zippy-expanded .monthtableSpace { margin-left: 0; margin-right: 0; }\
#calcontent.eui-t #nav { margin-left: 4px; }\
#calcontent.eui-t #mainbody { margin-left: 155px; }\
.eui-t #gridcontainer { margin-right: 12px }\
// .goog-imageless-button-content { padding: 0 12px 0 12px; }\
// .goog-inline-block { padding: 0; }\
.goog-imageless-button-collapse-right { margin-right: 0; }\
#calcontent.eui-t #vr-nav { margin: 0; padding-top: 7px; }\
#vr-nav, #searchAddCalBox { margin: 0; border-bottom: 0; }\
.goog-zippy-expanded .monthtableBody { padding-left: 0; }\
.chip dl { padding: 2px; }\
\
table, .tg-times-pri, .tg-times-sec, .tg-col, .wk-scrolltimedevents, .textinput,\
  .st-bg-all, .wk-allday, .wk-allday .st-bg-next, .wk-allday, .st-bg-today, .wk-allday .st-bg-td-first, .wk-allday .st-bg-td-last, .wbkt .tg-timedevents,\
  .dp-today-selected, .gbqfqw, #searchAddCal, .goog-menu, .qab-container, .asf-c, .st-dtitle-nonmonth, .st-dtitle, .mv-event-container, \
  .bubble, .dp-onhover, .gbm, .gbto .gbts, .ep-ts .ui-dtsr-selected, .ep-ts .ui-dtsr-unselected, .ep-ts, .wk-border,\
  .ep-scg-header { border-color: #777777; }\
.asf-tf, .asf-c .dr-date, .tg-time-pri, .tg-time-sec, .ep-title .textinput, .text .dr-date, .ep-gs-ta,\
   .ep-drs, .ep-drs .text, .ep-title .textinput, .ep-dp .textinput,\
   .tpp-title .textinput, .tpp-dp .textinput, .tpp .drs .text, .fatc-w .textinput { border-color: #777777 !important; }\
.asf-tf:hover, .asf-c .dr-date:hover, .textinput:hover, .gbqfqw:hover, .ep-drs .text:hover { border-color: #CCCCCC !important; }\
.asf-tf:focus, .asf-c .dr-date:focus, .textinput:focus, .gbqfqw:focus, .gbqfqw:active, .ep-drs .text:focus { border-color: orange !important; }\
// #4787ED\
\
::-webkit-scrollbar-thumb, #mainnav, .ep-scg-guestheader { border: none !important; }\
#gbq, #mothertable, #vr-nav, .goog-menuseparator { border-top: 1px solid #777777 !important; }\
.calListRow, .tg-timedevents { border-bottom: 0; }\
.st-bg, .wk-dayname, .ep-scg-grid { border-left: 1px solid #777777; }\
.wk-dayname { border-top: 1px solid #777777; }\
.wk-allday .st-bg-lc { border-right: 1px solid #777777; }\
.st-bg-today { border-left: 1px solid #DDDDDD; }\
#gbx1, #gbx2, .wk-dummyth, .ep-scg-guestheader { border: 0 !important; background: none !important; }\
\
::-webkit-scrollbar { width: 16px; }\
::-webkit-scrollbar-track, ::-webkit-scrollbar-thumb, .ep-scg-guestheader { border-width: 0 !important; }\
.wk-dummyth { width: 15px !important; }\
#gbgsi, #gbgss, .trans-strip { width: 0; height: 0; }\
#gbu { right: 36px; }\
\
.tg-dualmarker, .tg-dualmarker60 { border-bottom: 1px dotted #333333; border-top: 1px solid #555555; }\
.tg-gutter { margin-right: 4px; }\
\
.navForward, .navBack, #mg-settings .goog-imageless-button-outer-box { background-image: url(\"https://ssl.gstatic.com/ui/v1/icons/mail/sprite_white2.png\") !important; }\
.navBack { background-position: -19px -23px !important; width: 26px !important; }\
.navForward { background-position: -36px -23px !important; width: 26px !important; }\
#mg-settings .goog-imageless-button-outer-box { background-position: 3px -23px !important; }\
\
.gb_ca .gb_aa { background-image: url(\"http://findicons.com/icon/download/492415/bell/72/png?id=511391\") !important; background-size: 32px; right: 2px; }\
";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();