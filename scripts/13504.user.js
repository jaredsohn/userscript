// ==UserScript==
// @name           Focus password field on MySpace login page
// @namespace      http://umn.edu/~hick0088/
// @description    Put the cursor in the password field on the MySpace login screen (or the e-mail field if nothing's been filled in).
// @include        http://*.myspace.com/*
// @include        http://myspace.com/*
//
// June 16, 2008: Got rid of the concept of searching for specific IDs since
//   they seem to change too often.  Try searching for input fields matching
//   the substring 'Email_Textbox' or 'Password_Textbox' instead.
// May 22, 2008: changed prefix from
//   'ctl00_ctl00_Main_cpMain_SplashDisplay_ctl00_' to
//   'ctl00_ctl00_Main_cpMain_SplashDisplay_ctl01_'
// April 12, 2008: changed prefix from 'ctl00_Main_SplashDisplay_ctl00_' to
//     'ctl00_ctl00_Main_cpMain_SplashDisplay_ctl00_'
// ==/UserScript==

(function() {
    var emailString = 'Email_Textbox';
    var passwordString = 'Password_Textbox';
    var idfield;
    var pwfield;
    var inputNodeList = document.getElementsByTagName('input');
    for (var idx = 0; idx < inputNodeList.length; idx++) {
        if (inputNodeList[idx].id.match (emailString) != null) {
            idfield = inputNodeList[idx];
        } else if (inputNodeList[idx].id.match (passwordString) != null) {
            pwfield = inputNodeList[idx];
        }
    }
    if (idfield != null) {
        if (pwfield != null) {
            if (idfield.value == "") {
                // focus the "E-Mail:" field if it's blank.
                idfield.focus();
            } else {
                pwfield.focus();
            }
        } else {
            /* got idfield but not pwfield, so we'll just focus the first one */
            idfield.focus();
        }
    }
})();