// CMBChina Cellphone Bank
// version 0.2.1 BETA!
// 2012-03-04
// Copyright (c) 2011, sevenever
// Modified by EmiNarcissus 2012 adapt for Ninjakit/TamperMonkey/Greasemonkey under Safari/Chrome/Firefox
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "CMBChina Cellphone Bank", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CMBChina Cellphone Bank 
// @namespace     https://mobile.cmbchina.com
// @description   Allow you to login to cmbchina(sucks) cellphone bank html edition
// @include	https://mobile.cmbchina.com/MobileHtml/Login/LoginC.aspx
// @version       0.2.1
// ==/UserScript==

function myDoLogin() {
    var submitControl = unsafeWindow.submitControl;
    submitControl.clearFields();
    submitControl.setCommand("CMD_DOLOGIN");
    if (document.getElementById("IDTypeC") != null) {           // Credit Card
        submitControl.addFieldByElementId("IDTypeC", "IDNoC", "PwdC", "ExtraPwdC");
    }else if (document.getElementById("AccountNoA") != null) {  // 1 Ka Tong
        submitControl.addFieldByElementId("AccountNoA", "PwdA", "ExtraPwdA"); 
    } else if (document.getElementById("NBUser")) {             // 1 Wang Tong
        submitControl.addFieldByElementId("NBUser", "Pwd", "ExtraPwd", "RememberFlag");
    }
    submitControl.addFieldByNameValue("UserAgent", "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16");
    submitControl.addFieldByNameValue("screenW", 320+"");
    submitControl.addFieldByNameValue("screenH", 480+"");
    submitControl.addFieldByNameValue("OS", "iPhone");
    submitControl.submit();
}

document.getElementById('LoginBtn').onclick=myDoLogin;