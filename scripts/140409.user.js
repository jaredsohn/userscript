// ==UserScript==
// @name           Clarizen CSS
// @namespace      https://app.clarizen.com/Clarizen/Pages/*
// @description    Hide header elements and weekend columns to save space
// @include        https://app.clarizen.com/Clarizen/Pages/*
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

var myStyles = '';

// hide logo/search bar, start bar, time tracking tabs row, total reported hours & user changer row, and view selector/search bar
myStyles += '#header, #toolbar, #boxForm, .topHeaderPanel, .non-working-day, #ctl00_CPH1_MasterGridViewPredefinedToolbarContainer {display: none}';

// hide purple weekend cells
myStyles += '.non-working-day {display: none}';

//hide primary col headings for Sat, Sun, Total
myStyles +='#ctl00_CPH1_MasterGridView_grid_irows_HC16, #ctl00_CPH1_MasterGridView_grid_irows_HC17, #ctl00_CPH1_MasterGridView_grid_irows_HC18 {display: none}';

// hide secondary col headings for Sat, Sun, Total
myStyles += '.timesheet-totals:nth-child(6), .timesheet-totals:nth-child(7), .timesheet-totals:nth-child(8) {display: none}';

// hide Total column cells
myStyles += '#gridTable_ctl00_CPH1_MasterGridView_grid_irows .timesheet-totals {display: none}';

// adjust filler above scrollbar to Firefox scrollbar width
myStyles += '#ctl00_CPH1_MasterGridView_grid_irows_scrollerTd {min-width: 0; width: 14px !important;}';

// set table widths
myStyles += '#gridTableHeaders_ctl00_CPH1_MasterGridView_grid_irows, #gridTable_ctl00_CPH1_MasterGridView_grid_irows {width: 100% !important;}';

// set width on various column headings and cells
// ID (1st)
myStyles += 'td#ctl00_CPH1_MasterGridView_grid_irows_HC1 {width: 40px !important}';
myStyles += '#gridTable_ctl00_CPH1_MasterGridView_grid_irows tbody tr td:first-child {width: 40px !important}';
// Name (3rd)
// myStyles += 'td#ctl00_CPH1_MasterGridView_grid_irows_HC3 {width: 170px !important}';
// myStyles += '#gridTable_ctl00_CPH1_MasterGridView_grid_irows tbody tr td:nth-child(3) {width: 170px !important}';
// Due Date (5th)
myStyles += 'td#ctl00_CPH1_MasterGridView_grid_irows_HC5 {width: 50px !important}';
myStyles += '#gridTable_ctl00_CPH1_MasterGridView_grid_irows tbody tr td:nth-child(5) {width: 50px !important}';
// Phase (6th)
myStyles += 'td#ctl00_CPH1_MasterGridView_grid_irows_HC6 {width: 50px !important}';
myStyles += '#gridTable_ctl00_CPH1_MasterGridView_grid_irows tbody tr td:nth-child(6) {width: 50px !important}';
// Remaining Effort (7th)
myStyles += 'td#ctl00_CPH1_MasterGridView_grid_irows_HC7 {width: 60px !important}';
myStyles += '#gridTable_ctl00_CPH1_MasterGridView_grid_irows tbody tr td:nth-child(7) {width: 60px !important}';
// Work (8th)
myStyles += 'td#ctl00_CPH1_MasterGridView_grid_irows_HC8 {width: 30px !important}';
myStyles += '#gridTable_ctl00_CPH1_MasterGridView_grid_irows tbody tr td:nth-child(8) {width: 30px !important}';
// Git Repos (10th) 
myStyles += 'td#ctl00_CPH1_MasterGridView_grid_irows_HC10 {width: 60px !important}';
myStyles += '#gridTable_ctl00_CPH1_MasterGridView_grid_irows tbody tr td:nth-child(10) {width: 60px !important}';

// set width on weekday column headings and cells
myStyles += 'td#ctl00_CPH1_MasterGridView_grid_irows_HC11, #gridTable_ctl00_CPH1_MasterGridView_grid_irows tbody tr td:nth-child(11) {width: 40px !important}';
myStyles += 'td#ctl00_CPH1_MasterGridView_grid_irows_HC12, #gridTable_ctl00_CPH1_MasterGridView_grid_irows tbody tr td:nth-child(12) {width: 40px !important}';
myStyles += 'td#ctl00_CPH1_MasterGridView_grid_irows_HC13, #gridTable_ctl00_CPH1_MasterGridView_grid_irows tbody tr td:nth-child(13) {width: 40px !important}';
myStyles += 'td#ctl00_CPH1_MasterGridView_grid_irows_HC14, #gridTable_ctl00_CPH1_MasterGridView_grid_irows tbody tr td:nth-child(14) {width: 40px !important}';
myStyles += 'td#ctl00_CPH1_MasterGridView_grid_irows_HC15, #gridTable_ctl00_CPH1_MasterGridView_grid_irows tbody tr td:nth-child(15) {width: 40px !important}';

// set width: auto on column spans to let them flow to column width
myStyles += '#gridTableHeaders_ctl00_CPH1_MasterGridView_grid_irows tbody tr td span {width: auto !important}';
myStyles += '#gridTable_ctl00_CPH1_MasterGridView_grid_irows tbody tr td span {width: auto !important}';

addGlobalStyle(myStyles);

// update table height to fill page
jQuery('#ctl00_CPH1_TabSet_actionMinMax').trigger('click').trigger('click');