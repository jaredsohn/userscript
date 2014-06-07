// ==UserScript==
// @name       Automatic Authen Script FOR KMITL
// @namespace  http://www.ishare.in.th
// @version    0.1
// @description  Automatic Login script FOR KMITL
// @match      http://161.246.231.3/*
// @copyright  2012+, MIX THE WIZARD(mix5003)
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

if(document.location.href=="http://161.246.231.3/auth/logout.html"){
    //console.log("Set not auto");
    document.cookie="notauto=1;domain=161.246.231.3;path=/";
}

if(document.forms[0]!=null){
    document.forms[0].onsubmit = function() {
        if(GM_getValue("KMITL_Username","")==""){
            GM_setValue("KMITL_Username",document.getElementById('user').value);
            GM_setValue("KMITL_Password",document.getElementById('password').value);
        }
        //console.log("Set auto");
        document.cookie="notauto=0;domain=161.246.231.3";
        return true;
    }
 }

if(document.cookie.indexOf('notauto=1')==-1 && document.getElementById('user')!=null){    
    if(document.body.innerHTML.indexOf("Authentication failed") >-1){
        GM_setValue("KMITL_Username","");
        GM_setValue("KMITL_Password","");
    }   
    
    if(document.body.innerHTML.indexOf("You are already logged in.")==-1){
        if(GM_getValue("KMITL_Username","")!=""){
            document.getElementById('user').value = GM_getValue("KMITL_Username","");
            document.getElementById('password').value = GM_getValue("KMITL_Password","");
            //console.log("Submit");
            document.forms[0].submit();
        }
    }
}