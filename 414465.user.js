// ==UserScript==
// @name         autofill for CSU Internet entry
// @namespace    autoFillCSUInternet
// @include      http://61.137.86.87:8080/portalNat444/index.jsp
// @author       cqcn1991
// @description  Get rid of repetitive inputs of your CSU Internet Account.
// @grant        none
// ==/UserScript==

function autoFillCSU(){
    // your account and password     
    account = '011208100820';
    pw = '330243';
    
    // For browsers do not support greasemonkey and alike,
    // manually check for current url to use this script.    
    var url =document.URL;
    var urlChecker = 'portalNat444/index.jsp';
        
    if(url.indexOf(urlChecker) != -1){
        var myAccount = document.getElementById("account");
        var myPw = document.getElementById("userPassword");
        myAccount.value = account;
        myPw.value = pw;
    };
}

autoFillCSU();

