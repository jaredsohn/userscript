// ==UserScript==
// @name           Pigskin Empire: Disable Waive Button
// @copyright      2011, GiantsFan23
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        10.23.11
// @description    Disables waive button on pro contract pages to prevent accidental clicking. Will add a link to enable button.
// @include        *
// ==/UserScript==


var b = document.getElementById("ctl00_CPH1_btnWaive").style.visibility = 'hidden';
