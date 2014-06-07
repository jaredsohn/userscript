// ==UserScript==
// @name        7waysms
// @namespace   7waysms Auto Polls & sms by Siby Reloaded//*****itsourtech.blogspot.com*****//
// @description 7waysms Auto Polls & sms by Siby Reloaded//*****itsourtech.blogspot.com*****//
// @include     http://*7waysms.*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       Public
// @version     1.1
// @copyright   //*****itsourtech.blogspot.com*****//
// @author      //*****Siby*****//
// ==/UserScript==

/********************Globals*******************/

loc=window.location.href;
host=window.location.hostname;
zx="?zxcoiesesscd=";

/********************Functions*******************/

function str() {
    var set="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var txt='';
    for(i=0;i<10;i++){
        txt+=set.charAt(Math.floor(Math.random() * set.length));
    }
    return txt;
}

function num() {
    var get="0312";
    var tt='';
    
    tt+=get.charAt(Math.floor(Math.random() * get.length));
    
    return tt;
}

function $(selector){
    if(selector.charAt(0)=="#"){
        return document.getElementById(selector.substr(1));
    }
    else if(selector.charAt(0)=="."){
        return document.getElementsByClassName(selector.substr(1));
    }
    else{
        return document.getElementsByTagName(selector);
    }
}

function remove(element) {
    if (element!=null) {
        element.parentNode.removeChild(element);
    }
}

function hereDoc(f) {
  return f.toString().
      replace(/^[^\/]+\/\*!?/, '').
      replace(/\*\/[^\/]+$/, '');
}




/************************sms*************************/
if(loc.match("7way_sms_sendv161.php")) {
    remove($("#adFloaterHome"));
    remove($("#SMSLight"));
    var mobile_no='9526983541';
    var box=str();
    var a = document.forms[0].elements;
    for(i=0;i<a.length;i++) {
        if(a[i].type=="text" && a[i].name=="mobile_no") {
            a[i].value=mobile_no;
        }
        if(a[i].tagName.toUpperCase()=="TEXTAREA" && a[i].style.display!="none") {
            a[i].value=box;
        }
    }
 if(document.forms[0].response_field_single_char){
        document.forms[0].response_field_single_char.value=prompt("Enter Captcha");
        document.forms[0].submit();
    }
    else{
        document.forms[0].submit();
    }
}
if(loc.match("send_sms_earning.php")){
    window.location.href="7way_sms_sendv161.php";}
if(loc.match("limit_reached.php")){
    window.location.href="maths_quizv161.php";}
/**********************poll1***********************************/
if(loc.match("maths_quizv161.php")) {
    remove($("#adFloaterPoll"));
    var x=num();
    document.forms[0].answer[x].click();
    if(document.forms[0].response_field_single_char){
        document.forms[0].response_field_single_char.value=prompt("Enter Captcha");
        document.forms[0].submit.click()
    }
    else{
        document.forms[0].submit.click()
    }
}


if(loc.match("math_quiz_ansv161.php")){
    window.location.href="maths_quizv161.php"
		if(sessionStorage.getItem("play_order")==0){
			redirect("PollCompleted.php");
    }
    
}
if(loc.match("math_quiz_res_viba.php")){
    window.location.href="maths_quizv161.php"
		if(sessionStorage.getItem("play_order")==0){
			redirect("PollCompleted.php");
    }
    
}
if(loc.match("math_quiz_ansv161.php")){
    window.location.href="maths_quizv161.php"
		if(sessionStorage.getItem("play_order")==0){
			redirect("PollCompleted.php");
    }
    
}
/************************Poll2************************/

if(loc.match("maths_quiz_vibav161.php")) {
    remove($("#adFloaterPoll"));
    var y=num();
    document.forms[0].answer[y].click();
    if(document.forms[0].response_field_single_char){
        document.forms[0].response_field_single_char.value=prompt("Enter Captcha");
        document.forms[0].submit.click();
    }
    else{
       document.forms[0].submit.click()
    }
}

if(loc.match("math_quiz_ans_vibav161.php")){
    window.location.href="maths_quiz_vibav161.php"
		if(sessionStorage.getItem("play_order")==0){
			redirect("PollCompleted.php");
    }
    
}



/*********************Redirect Pages******************/

if(loc.match("home.php")) {
    window.location.href="7way_sms_sendv161.php";  
}
/************/
if(window.location.href==("http://www.7waysms.com/index.php")) 
  window.location.href="http://www.faasty.com/login.php?refererCode=18255E&flag=";  
/**********************End of Script********************/