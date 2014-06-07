// ==UserScript==
// @name          TitanTv Simplification
// @namespace     http://www.titantv.com/
// @description	  Simplify Titantv
// @include       http://www.titantv.com/*
// ==/UserScript==


if (document.getElementById("ctl00_GenericControl1_ctl00_LV_LogoffBtn") != null) {

var z = document.getElementById("topBar").parentNode;
z.removeChild(document.getElementById("ctl00_abot_bb"));
z.removeChild(document.getElementById("menumargin"));
z.removeChild(document.getElementById("ctl00_atop_bt"));
z.removeChild(document.getElementById("topBar"));


/* UNCOMMENT TO REMOVE DATE / LINEUP OPTIONS */
//z = document.getElementById("ctl00_Main_TVL_ctl00_NavUP").parentNode; z.removeChild(document.getElementById("ctl00_Main_TVL_ctl00_NavUP"));


z = document.getElementsByClassName("gC gAd")[0];
while(z != null) {
z = z.parentNode;
z.parentNode.removeChild(z);
z = document.getElementsByClassName("gC gAd")[0];
}

z = document.getElementById("mainTable");
z.style.width = "100%";
z = document.getElementById("footerTable");
z.style.width = "100%";

GM_addStyle(
'.gridHeaderCellRight { width: 30px; }' +
'.marginSet6 { margin: 0 0; }'
)

/* UNCOMMENT TO HIDE CALLSIGN NAMES COLUMN FROM VIEW */
//GM_addStyle( '.gridHeaderCellLeft { display:none; width: 0px; }' + '.gridCallSignCell { display:none; width: 0px; }' )

}