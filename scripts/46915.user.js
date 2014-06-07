//  Copyright (c) 2009, Ahmad al-As'ad
//
//  Revision History:
//  0.0.1     April 17, 2009 - initial beta version.
//
//  Mozilla Greasemonkey Script
//
// ==UserScript==

// @name           BloggerLoginFocus

// @namespace      http://www.ahmadism.com/

// @description    Brings focus to the Username (Email) field

// @include        https://www.blogger.com/start
// ==/UserScript==


if (!document.all) {
    var username = document.getElementById("Email");
    username.focus();
}
