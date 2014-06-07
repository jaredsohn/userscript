// ==UserScript==
// @name           aauto-kotnet
// @namespace      http://sites.google.com/site/chumerin/
// @description    Auto-login into netlogin.kuleuven.be
// @include        https://netlogin.kuleuven.be/*
// @include        http://netlogin.kuleuven.be/*
// @copyright      Nikolay Chumerin
// ==/UserScript== 

function setUserPass() {
    var user = pass = "";
    while ((user == "") || (pass == "")) {
        alert("Please enter nonempty user and password");
        user = prompt("User ID");
        pass = prompt("Password");
    }
    GM_setValue("user", user);
    GM_setValue("pass", pass);
};

GM_registerMenuCommand("auto-kotnet - set UserID and password", setUserPass);

var user = GM_getValue("user", "");
var pass = GM_getValue("pass", "");

if (document.getElementsByName("wayf").length > 0) {
    document.getElementsByName("submit")[0].click();
};

if (document.getElementsByName("netlogin").length > 0) {
    var netloginForm = document.getElementsByName("netlogin")[0];
    netloginForm.elements[2].value = user;
    netloginForm.elements[3].value = pass;
    netloginForm.elements[4].click();
};