// ==UserScript==
// @name       Automatic Authen Script FOR IT KMITL
// @namespace  http://www.ishare.in.th
// @version    0.3
// @description  Automatic Login script FOR ITKMITL
// @match      https://portal.it.kmitl.ac.th/*
// @match      http://judge.it.kmitl.ac.th/login
// @match      https://judge.it.kmitl.ac.th/login
// @match      http://judge.it.kmitl.ac.th/course/select
// @match      https://judge.it.kmitl.ac.th/course/select
// @copyright  2012+, MIX THE WIZARD(mix5003)
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

if(document.location.href=='https://portal.it.kmitl.ac.th/login?noauto'){
    document.cookie="notauto=1;domain=portal.it.kmitl.ac.th";
    document.cookie="notauto=1;domain=judge.it.kmitl.ac.th";
    document.location.href="https://portal.it.kmitl.ac.th/logout";
}

if(document.forms[0]!=null){
    document.forms[0].onsubmit = function() {
        if(GM_getValue("ITKMITL_Username","")==""){
            GM_setValue("ITKMITL_Username",document.getElementById('username').value);
            GM_setValue("ITKMITL_Password",document.getElementById('password').value);
        }
        document.cookie="notauto=0;domain=portal.it.kmitl.ac.th";
        document.cookie="notauto=0;domain=judge.it.kmitl.ac.th";
        return true;
    }
 }

if(document.location.href=='http://judge.it.kmitl.ac.th/course/select' ||document.location.href=='https://judge.it.kmitl.ac.th/course/select'){
   document.forms[0].submit()
}

if((document.location.href=='http://judge.it.kmitl.ac.th/login' ||document.location.href=='https://judge.it.kmitl.ac.th/login' || document.location.href=='https://portal.it.kmitl.ac.th/login' ) && 
   document.cookie.indexOf('notauto=1')==-1 && document.getElementById('username')!=null){
    //alert(GM_getValue("ITKMITL_Username","")+" "+GM_getValue("ITKMITL_Password",""));
    
    if(document.body.innerHTML.indexOf("Invalid username or password.") >-1){
        GM_setValue("ITKMITL_Username","");
        GM_setValue("ITKMITL_Password","");
    }   
    
    if(document.body.innerHTML.indexOf("You are already logged in.")==-1){
        if(GM_getValue("ITKMITL_Username","")!=""){
            document.getElementById('username').value = GM_getValue("ITKMITL_Username","");
            document.getElementById('password').value = GM_getValue("ITKMITL_Password","");
            //console.log("Submit");
            
            document.forms[0].submit();
        }
    }
}