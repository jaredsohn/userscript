// ==UserScript==
// @description This script fixes TD Bank's Login Screen to work with 1Password
// @match https://onlinebanking.tdbank.com/login.asp*
// @name 1Password/TD Bank login screen compatibility fix.
// ==/UserScript==
document.getElementsByName('user')[0].setAttribute('type', 'text');
