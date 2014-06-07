// CMBChina Cellphone Bank
// version 0.3 BETA!
// 2012-03-08
// Copyright (c) 2012, sevenever
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
// @namespace     http://www.sevenever.com/greasemonkeyscripts
// @description   Allow you to login to cmbchina(sucks) cellphone bank html edition
// @include       https://mobile.cmbchina.com/*
// @version       0.3
// ==/UserScript==
if ( window.location.pathname.toLowerCase().indexOf("/mobilehtml/login/login") == 0 ) {
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
window.DoLogin = function() {
    var submitControl = window.submitControl;
    var loginByPID = BSGetRadioValueByName("LoginMode"); 
    submitControl.clearFields();
    submitControl.setCommand("CMD_DOLOGIN");
    if(window.location.pathname.toLowerCase().indexOf("/mobilehtml/login/logina.aspx") == 0 ) {
        submitControl.addFieldByNameValue("AccountNoA", BSGetElementValue("AccountNoA"));
        submitControl.addFieldByElementId("PwdA", "ExtraPwdA");
    } else if(window.location.pathname.toLowerCase().indexOf("/mobilehtml/login/loginc.aspx") == 0 ) {
        submitControl.addFieldByElementId("PwdC", "ExtraPwdC");
        submitControl.addFieldByNameValue("LoginMode", loginByPID);
        if(loginByPID == "0")
        {
            submitControl.addFieldByNameValue("IDTypeC",BSGetElementValue("IDTypeC"));
            submitControl.addFieldByNameValue("IDNoC",BSGetElementValue("IDNoC"));
        }else
        {
            submitControl.addFieldByNameValue("CreditCardNo",BSGetElementValue("CreditCardNo"));
        }
    } else if(window.location.pathname.toLowerCase().indexOf("/mobilehtml/login/logind.aspx") == 0 ) {
        submitControl.addFieldByElementId("NBUser", "Pwd", "ExtraPwd");
    }
    submitControl.addFieldByNameValue("RememberFlag",BSGetElementValue("cbRemember"));
    submitControl.addFieldByNameValue("UserAgent", "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16");
    submitControl.addFieldByNameValue("screenW", 320+"");
    submitControl.addFieldByNameValue("screenH", 480+"");
    submitControl.addFieldByNameValue("OS", "iPhone");
    submitControl.submit();
};

window.DoLoginCTypeChange = function()  {
    if(window.location.pathname.toLowerCase().indexOf("/mobilehtml/login/loginc.aspx") == 0 ) {
        var loginByPID = BSGetRadioValueByName("LoginMode");
        var LgByPidInput = document.getElementById("LgByPidInput");
        var LgByCreditCardNoInput = document.getElementById("LgByCreditCardNoInput");
        if (loginByPID == "1") {
            LgByPidInput.style.display = "none";
            LgByCreditCardNoInput.style.display = "block";
            BSGetElement("lbRemTypeName").innerHTML = "记住卡号";
        }
        else {
            LgByPidInput.style.display = "block";
            LgByCreditCardNoInput.style.display = "none";
            BSGetElement("lbRemTypeName").innerHTML = "记住证件号码";
        }
    }
};

window.ErrCallBack = function() {
    var errMsg;
    if(window.location.pathname.toLowerCase().indexOf("/mobilehtml/login/loginc.aspx") == 0 ) {
        var loginByPID = "1";
        var LgByPidInput = document.getElementById("LgByPidInput");
        var LgByCreditCardNoInput = document.getElementById("LgByCreditCardNoInput");
        if (loginByPID == "1") {
            LgByPidInput.style.display = "none";
            LgByCreditCardNoInput.style.display = "block";
            BSGetElement("lbRemTypeName").innerHTML = "记住卡号";
        } else {
            LgByPidInput.style.display = "block";
            LgByCreditCardNoInput.style.display = "none";
            BSGetElement("lbRemTypeName").innerHTML = "记住证件号码";
        }
    }
    if (typeof errMsg != "undefined")
    {
        alert(errMsg);
    }
};

var scriptCode = '                                                                                                                                                                                         \n \
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n \
window.DoLogin = function() {                                                                                                                                                                                  \n \
    var submitControl = window.submitControl;                                                                                                                                                            \n \
    var loginByPID = BSGetRadioValueByName("LoginMode");                                                                                                                                                       \n \
    submitControl.clearFields();                                                                                                                                                                               \n \
    submitControl.setCommand("CMD_DOLOGIN");                                                                                                                                                                   \n \
    if(window.location.pathname.toLowerCase().indexOf("/mobilehtml/login/logina.aspx") == 0 ) {                                                                                                                \n \
        submitControl.addFieldByNameValue("AccountNoA", BSGetElementValue("AccountNoA"));                                                                                                                      \n \
        submitControl.addFieldByElementId("PwdA", "ExtraPwdA");                                                                                                                                                \n \
    } else if(window.location.pathname.toLowerCase().indexOf("/mobilehtml/login/loginc.aspx") == 0 ) {                                                                                                         \n \
        submitControl.addFieldByElementId("PwdC", "ExtraPwdC");                                                                                                                                                \n \
        submitControl.addFieldByNameValue("LoginMode", loginByPID);                                                                                                                                            \n \
        if(loginByPID == "0")                                                                                                                                                                                  \n \
        {                                                                                                                                                                                                      \n \
            submitControl.addFieldByNameValue("IDTypeC",BSGetElementValue("IDTypeC"));                                                                                                                         \n \
            submitControl.addFieldByNameValue("IDNoC",BSGetElementValue("IDNoC"));                                                                                                                             \n \
        }else                                                                                                                                                                                                  \n \
        {                                                                                                                                                                                                      \n \
            submitControl.addFieldByNameValue("CreditCardNo",BSGetElementValue("CreditCardNo"));                                                                                                               \n \
        }                                                                                                                                                                                                      \n \
    } else if(window.location.pathname.toLowerCase().indexOf("/mobilehtml/login/logind.aspx") == 0 ) {                                                                                                         \n \
        submitControl.addFieldByElementId("NBUser", "Pwd", "ExtraPwd");                                                                                                                                        \n \
    }                                                                                                                                                                                                          \n \
    submitControl.addFieldByNameValue("RememberFlag",BSGetElementValue("cbRemember"));                                                                                                                         \n \
    submitControl.addFieldByNameValue("UserAgent", "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16");           \n \
    submitControl.addFieldByNameValue("screenW", 320+"");                                                                                                                                                      \n \
    submitControl.addFieldByNameValue("screenH", 480+"");                                                                                                                                                      \n \
    submitControl.addFieldByNameValue("OS", "iPhone");                                                                                                                                                         \n \
    submitControl.submit();                                                                                                                                                                                    \n \
};                                                                                                                                                                                                             \n \
                                                                                                                                                                                                               \n \
window.DoLoginCTypeChange = function()  {                                                                                                                                                                      \n \
    if(window.location.pathname.toLowerCase().indexOf("/mobilehtml/login/loginc.aspx") == 0 ) {                                                                                                                \n \
        var loginByPID = BSGetRadioValueByName("LoginMode");                                                                                                                                                   \n \
        var LgByPidInput = document.getElementById("LgByPidInput");                                                                                                                                            \n \
        var LgByCreditCardNoInput = document.getElementById("LgByCreditCardNoInput");                                                                                                                          \n \
        if (loginByPID == "1") {                                                                                                                                                                               \n \
            LgByPidInput.style.display = "none";                                                                                                                                                               \n \
            LgByCreditCardNoInput.style.display = "block";                                                                                                                                                     \n \
            BSGetElement("lbRemTypeName").innerHTML = "记住卡号";                                                                                                                                                  \n \
        }                                                                                                                                                                                                      \n \
        else {                                                                                                                                                                                                 \n \
            LgByPidInput.style.display = "block";                                                                                                                                                              \n \
            LgByCreditCardNoInput.style.display = "none";                                                                                                                                                      \n \
            BSGetElement("lbRemTypeName").innerHTML = "记住证件号码";                                                                                                                                                \n \
        }                                                                                                                                                                                                      \n \
    }                                                                                                                                                                                                          \n \
};                                                                                                                                                                                                             \n \
                                                                                                                                                                                                               \n \
window.ErrCallBack = function() {                                                                                                                                                                              \n \
    var errMsg;                                                                                                                                                                                                \n \
    if(window.location.pathname.toLowerCase().indexOf("/mobilehtml/login/loginc.aspx") == 0 ) {                                                                                                                \n \
        var loginByPID = "1";                                                                                                                                                                                  \n \
        var LgByPidInput = document.getElementById("LgByPidInput");                                                                                                                                            \n \
        var LgByCreditCardNoInput = document.getElementById("LgByCreditCardNoInput");                                                                                                                          \n \
        if (loginByPID == "1") {                                                                                                                                                                               \n \
            LgByPidInput.style.display = "none";                                                                                                                                                               \n \
            LgByCreditCardNoInput.style.display = "block";                                                                                                                                                     \n \
            BSGetElement("lbRemTypeName").innerHTML = "记住卡号";                                                                                                                                                  \n \
        } else {                                                                                                                                                                                               \n \
            LgByPidInput.style.display = "block";                                                                                                                                                              \n \
            LgByCreditCardNoInput.style.display = "none";                                                                                                                                                      \n \
            BSGetElement("lbRemTypeName").innerHTML = "记住证件号码";                                                                                                                                                \n \
        }                                                                                                                                                                                                      \n \
    }                                                                                                                                                                                                          \n \
    if (typeof errMsg != "undefined")                                                                                                                                                                          \n \
    {                                                                                                                                                                                                          \n \
        alert(errMsg);                                                                                                                                                                                         \n \
    }                                                                                                                                                                                                          \n \
};                                                                                                                                                                                                             \n \
';
var script = document.createElement('script');
script.type = "text/javascript";
script.innerHTML = scriptCode;
document.body.appendChild(script);
}
