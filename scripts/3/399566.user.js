// ==UserScript==
// @name       MotionPortal Home - Russell Tucker
// @namespace  https://motionportal.motionpoint.com
// @version    0.1
// @description  MotionPortal Home - Russell Tucker
// @match      https://motionportal.motionpoint.com/*
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

addGlobalStyle('#ctl00_Body_cntrl_rgMyIssues_GridData, #ctl00_Body_cntrl_rgTracking_GridData { height: auto !important; max-height: 540px; overflow-y: auto !important; }');
addGlobalStyle('.RadGrid_Custom .rgRow td, .RadGrid_Custom .rgAltRow td, .RadGrid_Custom .rgEditRow td, .RadGrid_Custom .rgFooter td { border-color: #f2f2f2 !important; border-top: 0 !important; }');
addGlobalStyle('.RadGrid_Custom .rgActiveRow, .RadGrid_Custom .rgHoveredRow { background-image: none !important; }');
addGlobalStyle('.RadGrid_Custom .rgRow { transition: all 0.2s ease; }');
addGlobalStyle(':focus { outline: none; }');