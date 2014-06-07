// ==UserScript==
// @name           TreasuryDirect Password Enable
// @namespace      http://binq.org/greasemonkey/treasurydirect_password_enable
// @description    TreasuryDirect Password Enable v1.0: Enables the password field for TreasuryDirect
// @include        https://www.treasurydirect.gov/RS/BPDLogin?application=rs
// ==/UserScript==

var password_input = document.evaluate("//input[@name='password']", document, null, 0, null).iterateNext();
password_input.readOnly = false;
