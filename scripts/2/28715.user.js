// ==UserScript==
// @name          Gmail Air Skin 2 (with ads-block)
// @namespace     http://www.amio.cn/
// @description	  Gmail Air Skin 2 with ads-block.
// @version       2.5.4
// @date          2010-05-22
// @creator       amio
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://*.mail.google.com/*
// @include       https://*.mail.google.com/*
// ==/UserScript==


(function() {

var gapCSS = "\
\
/* ======================== Global ======================== */\
\
/* all, Contacts */\
body.cP, #ContactManager *,\
/* Side Column & All Nav Button & Settings content & button */\
.pp *, .pX *, .v *, .goog-imageless-button-content\
/* for win,mac,linux */\
{ font-family: verdana, geneva, kalimati, sans-serif !important }\
\
/* Header */\
.aC { height: 100px; overflow: hidden }\
\
/* Setting page LANUGAGE SELECT height fix */\
.v9 select { height: 23px !important }\
\
/* input or textarea border */\
.nr { border-color: #AAA !important }\
.nr:focus { border-color: #73A6FF !important }\
\
/* Footer */\
div.l2 { font-family: verdana, geneva, kalimati, sans-serif !important }\
div.mn { display: none !important } /*google ad*/\
\
/* ======================== Side Column : NAV ======================== */\
\
/* Compose & Contacts */\
.pz .k { margin: -4px 0 !important }\
.pz .k .qk { padding: 0 !important }\
.pz .k .qk span { display: block; line-height: 22px; margin-right: 5px; text-decoration: none !important; padding: 1px 30px; }\
.pz.pX .k .qk span { padding: 0 30px; border: 1px solid #C3D9FF; -moz-border-radius: 5px }\
.pz.pX .k .qk span:hover { background-color: #E0ECFF }\
\
/* .LrBjie: SideNav Block (Include Tags Nav) */\
.n3 { padding: 0 !important }\
.n3 .qj.pk, .n3 .qi.pk { left: 0 !important }/* current nav bg (normal & trash) */\
\
/* .LrBjie: SideMainNav Block */\
.nM .LrBjie .TO { margin-bottom: 2px } /* every nav item */\
.nM .LrBjie .TN { padding: 0 !important; position: relative }\
.nM .LrBjie .TN > img { position: absolute; top: 3px; right: 3px }\
.nM .LrBjie .TN > div { display: none !important }\
.nM .LrBjie .TN > .nU { display: block; padding: 0 !important; margin: 0 !important }\
.nM .LrBjie .TN > .nU a { display: block; line-height: 20px; padding: 1px 0 1px 30px; text-decoration: none !important; -moz-border-radius: 4px 0 0 4px }\
\
/* :not(.nZ):not(.ol): Except Current(Normal) & Current(Trash); .NQ: hover */\
.nM .LrBjie .TO:not(.nZ):not(.ol) a { padding: 0 0 0 7px; border: 1px solid #C3D9FF; border-right: 5px !important; margin-left: 23px }\
.nM .LrBjie .TO:not(.nZ):not(.ol).NQ a { background-color: #E0ECFF }\
/* for Trash & Spam */\
.nM .LrBjie .TO:not(.nZ):not(.ol) a[title=\"Trash\"],\
.nM .LrBjie .TO:not(.nZ):not(.ol) a[title=\"Spam\"] { padding: 0 0 0 7px; border: 1px solid #CCC; border-right: 0; margin-left: 23px }\
.nM .LrBjie .TO:not(.nZ):not(.ol).NQ a[title=\"Trash\"],\
.nM .LrBjie .TO:not(.nZ):not(.ol).NQ a[title=\"Spam\"] { background-color: #EEE }\
\
/* Label Navs */\
.zw a { text-decoration: none !important }\
.zw .nL { padding-top: 2px !important }\
\
.CM { display: none } /* remove nav split line */\
\
/* ======================== Side Column : ELSE ======================== */\
\
/* Labels: displayed */\
.oo > .nM > .n3 > div.CM + div { margin: 10px 4px 0 0; -moz-border-radius: 5px 5px 0 0; border-bottom-width: 0 }\
.oo > .n6 { margin-right: 4px }\
.n8 { display: none }\
\
/* Labels: Pop button */\
.n4 { position: relative !important; left: 0 !important; text-align: center !important }\
.n4:hover { background-color: #D5E6FF !important }\
.n4 > span { padding-right: 6px !important; text-decoration: none !important }\
\
/* Labels: PopUp */\
.CI { left: 7px !important }\
\
/* Labels: Down Arrow ( For WinXP ) */\
.pM { position: relative; top: -1px }\
.p8 { position: relative; top: -1px }\
\
/* remove invite box */\
div.pY { display: none !important }\
/* remove chat box\
div.s { display: none !important } */\
\
/* ======================== Thread List ======================== */\
\
/* List Header & Footer */\
.D * { font-family: verdana, geneva, kalimati, sans-serif !important }\
/* text link highlight */\
.D span[role=\"link\"]:hover, .AP:hover { color: red !important; text-decoration: underline !important }\
\
/* Thread LIST */\
table.F * { font-family: verdana, geneva, kalimati, sans-serif !important }\
/* All Conversation Item */\
tr.zA>td { padding: 0 5px 0 1px !important; line-height: 24px !important }\
tr.zA>td>div { height: 24px !important }\
/* blank thread tr */\
tr.zs { height: 25px !important }\
\
/* unread */\
tr.zE:hover { background-color: #E1ECFF !important; background-image: none !important }\
/* read */\
tr.yO:hover { background-color: #D4E4FF !important; background-image: none !important }\
/* checked */\
tr.x7 { background-color: #FFC !important; }\
tr.x7:hover { background-color: #FFE699 !important; background-image: none !important }\
\
/* smaller right side date td */\
col.xX { width: 75px !important; padding-left: 0 !important }\
\
/* label [ar,as > at > au > av] */\
div.ar { padding-top: 3px !important; height: 17px !important }\
div.au { padding: 1px !important }\
div.av { padding: 0 2px !important; font-size: 12px !important; line-height: 14px !important }\
\
/* ======================== Conversation ======================== */\
\
/* remove ads */\
.u5, .u8 { display: none !important }\
\
/* Quick Link button ( Print All, New Window, etc ) position */\
table.iY > tr > td:first-child + td > div { width: auto !important }\
table.iY > tr > td:first-child + td + td > div { width: 0 !important; position: relative !important }\
table.iY > tr > td:first-child + td + td > div > div { position: absolute !important; right: 0 !important; top: 0 !important }\
\
/* Quick Link button ( Print All, New Window, etc ) style */\
table.iY div.hj { width: auto !important; font-family: verdana, geneva, kalimati, sans-serif !important }\
table.iY div.hj div.hk { display: inline !important; padding-right: 10px !important }\
table.iY div.hj div.hk span img { display: none !important }\
table.iY div.hj div.hk span {\
	padding: 0px 6px 1px 6px !important;\
	border: 1px solid #C3D9FF !important;\
	border-top-width: 0 !important;\
	-moz-border-radius: 0 0 4px 4px !important;\
}\
table.iY div.hj div.hk span u { text-decoration: none !important }\
table.iY div.hj div.hk span:hover { background-color: #C3D9FF !important }\
\
/* Mail Title and Labels */\
div.if h1.ha { font-size: 20px !important; line-height: 26px !important; font-family: Georgia, serif !important; margin-top: 24px !important; position: relative !important }\
div.if h1.ha span.hP { padding: 0 !important }\
div.if h1.ha span:first-child + span { position: absolute !important; top: -22px !important; left: 1px !important }\
div.if h1.ha table * { font-size: 12px !important; line-height: 15px !important }\
\
/* Reply Box resize */\
div[class=\"ip iq\"] { margin-right: 13px !important }\
textarea.ir { width: 100% !important }\
\
/* show details fix (blue frame right-side) */\
table[class=\"T1HY1 nH iY\"] { width: 100% !important }\
\
/* font family */\
.gE *,\
.gB div, .gB span { font-family: verdana, geneva, kalimati, sans-serif !important }\
\
/* ======================== ELSE ======================== */\
\
.goog-menuitem * { white-space: nowrap !important }\
.goog-tristatemenuitem-highlight, .goog-menuitem-highlight { background-color: #E0ECFF !important }\
\
}\
	";
	// ======================== Insert  CSS
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(gapCSS);
	} else if (typeof addStyle != "undefined") {
		addStyle(gapCSS);
	} else {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(gapCSS));
			heads[0].appendChild(node);
		}
	}
})();