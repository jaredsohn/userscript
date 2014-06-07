// ==UserScript==
// @name       MotionPortal Ticket - Russell Tucker
// @namespace  https://motionportal.motionpoint.com
// @version    0.1
// @description  MotionPortal Ticket - Russell Tucker
// @match      https://motionportal.motionpoint.com/issue_*
// @copyright  2012+, You
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#ctl00_Body_cntrl_rgTracking_GridData { height: auto; }');
addGlobalStyle('#form1 { padding: 1%; }');
addGlobalStyle('#form1 #issue_control_fv1_notesLayer_itPanel { height: 400px; }');
addGlobalStyle('#form1 div[style*="width"]:not(.rcbScroll):not([style*="width:600px;"]), [class^="IssueNote"] {   width: auto !important; }');
addGlobalStyle('#form1 table[style*="width"], #form1 table[width] { width: 100% !important; }');
addGlobalStyle('@media (min-width: 1000px){\
#issue_control_fv1 table:nth-of-type(3) > tbody > tr:nth-of-type(-n+2) { float: left; width: 49.5%; }\
#issue_control_fv1 table:nth-of-type(3) > tbody > tr:nth-of-type(1) > td { display: block; }\
#issue_control_fv1 table:nth-of-type(3) > tbody > tr:nth-of-type(2) > td:nth-child(odd) { float: left; width: 49% !important; }\
#issue_control_fv1 table:nth-of-type(3) > tbody > tr:nth-of-type(2), #issue_control_fv1 table:nth-of-type(3) > tbody > tr:nth-of-type(2) > td:last-child { float: right; }\
}');
