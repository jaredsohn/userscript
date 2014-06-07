//
// Keeps you from getting kicked out of the Bank of American Fork login by moving you back to the account page after 8 minutes. NOTE: this could very well interfere with your banking session and may mess up transactions you are trying to perform. Please use caution and don't install this script if you don't know what you are doing. By changing the URL below in the script to the accounts page for your bank account you can probably use this script for any bank account controlled by Netteller.
// Note that the use of this script intentionally circumvents a security measure used by the website.
//
// Author: Dan Henage
// Date: July 15, 2009
//
// ==UserScript==
// @name          Bank of American Fork - no timeout
// @namespace     http://www.henage.net/dan/
// @description  Keeps you from getting kicked out of the Bank of American Fork login by moving you back to the account page after 8 minutes. Please use caution and don't install this script if you don't know what you are doing..
// @include       https://www.netteller.com/bankaf/*
// ==/UserScript==


window.setTimeout(function() { window.location.href = 'https://www.netteller.com/bankaf/hbMain.cfm' }, 480000);




