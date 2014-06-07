// ==UserScript==
// @name          Google Calendar Dark Theme
// @namespace     http://userstyles.org
// @description	  Dark theme from GMail converted to GCalendar with white Calendar board
// @author        usrbowe
// @homepage      https://userscripts.org/scripts/show/*****
// @include       https://www.google.com/calendar/*
// @include       https://accounts.google.com/*
// @version       1.0.1
// @run-at        document-end
// @copyright     2013+, riser2 & usrbowe
// ==/UserScript==
(function() {
    var css = "";
	css += "\
body { background: #111111 !important; }\
.gb_ib { background: #111111 !important; }\
#gb#gb a.gb_e, #gb#gb a.gb_f, #gb#gb a.gb_q  { color: #ffffff !important;}\
#gb#gb a.gb_f {font-weight: bold;}\
.gb_p .gb_q { opacity: 1 !important; background-position: -393px -277px !important;}\
.gb_Da { background-position: -173px 0px; opacity: 1; }\
#mainnav { background: #111111 !important; }\
#vr-nav {border-bottom: 1px solid rgba(255, 255, 255, 0.2);}\
.dpdiv, .dpi-popup, .dp-weekendh, .dp-weekday, .dp-weekend, .calHeader, .calList, #rhstogglecell, .sng-title-bar, #vr-nav {background: #111111 !important;)}\
.dp-cell.dp-offmonth {color: #444 !important;}\
.dp-weekday-selected,  .dp-weekend-selected {background: #222;}\
.monthtableHeader:hover, .calHeader:hover {background-color: #222 !important;}\
#dp_0_cur.dp-sb-cur, .date-top, .dp-cell, .calHeader, .calListLabel-sel, .sng-title-bar, #mainlogo {  color: #fff !important;}\
.calListRow {border-bottom: 1px solid rgba(255, 255, 255, 0.3)}\
.calListLabelOuter-hvr {background: #222; color: #fff;}\
#rhstogglecell.rhstogglecell-open {border-right: 1px solid rgba(255, 255, 255, 0.3)}\
.goog-imageless-button {background: #333; color:#CCC;}\
.trans-strip {background: none !important;}\
.goog-imageless-button-disabled {color: #444 !important;}\
.navbuttonouter {background-color: transparent;background-image: -moz-linear-gradient(center top , rgba(68, 68, 68, 0.75), rgba(60, 60, 60, 0.75));}\
.navbuttonouter:hover {background: #393939 !important;}\
.calListImg-sel, .calListImg-hvr, .calListImg-opn {box-shadow: none !important;}\
.gbqfqw {border-width: 0px !important;}\
#calcontent.eui-s #mainbody {margin-left: 204px !important;}\
.new-onegpad #gb {border-bottom: 1px solid rgba(255, 255, 255, 0.2);}\
#calcontent.eui-s #topLeftNavigation {left: 204px !important;}\
.goog-imageless-button-hover {border: 1px solid #333333}\
#mg-settings .goog-imageless-button-outer-box { background: url('//ssl.gstatic.com/mail/sprites/general_white-2fe5e645306ac40f8f7d625f4404bddc.png') no-repeat scroll 0px -435px transparent !important; } \
.gb_fb {background-image: url('//ssl.gstatic.com/gb/images/v1_53a1fa6a.png') !important; color: #404040; background-position: -444px -107px !important;background-size: 536px 341px; padding: 5px 10px 7px 6px;    top: -5px;    left: -6px;} \
#mg-more .more-arrow {background: url('//ssl.gstatic.com/inputtools/images/ita_sprite_grey2.png') -621px -223px !important;} \
.goog-imageless-button-checked {border: 1px solid #fff !important;}\
.goog-imageless-button-collapse-right {margin-right: 0px !important;}\
.goog-imageless-button-hover {background: #3A3A3A;}\
.navbuttonouter:hover {border: 1px solid #333 !important;}\
.navForward {background: url('//ssl.gstatic.com/ui/v1/icons/mail/sprite_white2.png') no-repeat scroll -35px -22px transparent !important;}\
.navBack {background-image: url('//ssl.gstatic.com/ui/v1/icons/mail/sprite_white2.png'); background-repeat: no-repeat; background-position: -20px -21px;background-size: 110px 61px;}\
.navbutton {width: 27px !important;}\
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