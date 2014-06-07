// ==UserScript==
// @name        miao
// @namespace   miao
// @description new miao user
// @include     https://*miao.in:8443*
// @version     1
// ==/UserScript==


/*
 {
 "contactName":"contactName",
 "email":"email",
 "userName":"userName",
 "password":"password",
 }
 */

var JSONdata;

function $(id) {
    return document.getElementById(id)
}

function disp_prompt() {
    var JSONdata = eval('(' + prompt("JSON", "") + ')');
    if (JSONdata) {
        console.log(JSONdata);
        
        $("subscription-domainInfo-domainName").value = JSONdata.domainName;
        $("contactInfoSection-contactInfo-contactName").value = JSONdata.contactName;
        $("contactInfoSection-contactInfo-email").value = JSONdata.email;
        $("accessToPanelSection-loginInfo-userName").value = JSONdata.userName;
        $("subscription-domainInfo-userName").value = JSONdata.userName;
        $("accessToPanelSection-loginInfo-password").value = JSONdata.password;
        $("accessToPanelSection-loginInfo-passwordConfirmation").value = JSONdata.password;
        $("subscription-domainInfo-password").value = JSONdata.password;
        $("subscription-domainInfo-passwordConfirmation").value = JSONdata.password;
    }
    else {
        console.log(JSONdata);
    }
}

document.onkeydown = keydown;
function keydown(e) {
    console.log(e.keyCode);
    if (e.keyCode == 38 && e.ctrlKey) {
        disp_prompt();
    }
}

