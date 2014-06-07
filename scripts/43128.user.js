// ==UserScript==
// @name           AdditionalLogButton
// @namespace      madd.in
// @include        http://*.geocaching.com/seek/log.aspx?*
// Version: 1.0b modified by Skarek 2010-01-17 - Thank you skarek :-)
// ==/UserScript==



if(document.getElementById('ctl00_ContentBody_LogBookPanel1_ddLogType')){
    var header = document.getElementById('ctl00_ContentBody_lbHeading').parentNode;
    header.innerHTML += '<input type="submit" id="ctl00_ContentBody_LogBookPanel1_LogButton" onclick=\'javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("ctl00$ContentBody$LogBookPanel1$LogButton", "", true, "", "", false, false))\' value="Submit log entry" name="ctl00$ContentBody$LogBookPanel1$LogButton"/>';
}