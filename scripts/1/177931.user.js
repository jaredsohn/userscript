// ==UserScript==
// @name        Paisafy Auto Polls By Sachin//*****hackersachin.blogspot.com*****//
// @namespace   Paisafy Auto Polls By Sachin...!!!//*****hackersachin.blogspot.com*****//
// @description Paisafy Auto Polls !!!!!!!!//*****hackersachin.blogspot.com*****//
// @include     http://*paisafy.*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       Public
// @version     1.1
// @copyright   //*****hackersachin.blogspot.com*****//
// @author      //*****Sachin*****//
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




/************************Poll*************************/

if(loc.match("poll.php")) {
    remove($("#adFloaterPoll"));
    document.forms[0].OptionId[0].click();
    if(document.forms[0].response_field_single_char){
        document.forms[0].response_field_single_char.value=prompt("Enter Captcha");
        document.forms[0].submit();
    }
    else{
        document.forms[0].submit();
    }
}


if(loc.match("PollResult.php")){
    window.location.href="poll.php"
		if(sessionStorage.getItem("play_order")==0){
			redirect("PollCompleted.php");
    }
    
}



/*********************Redirect Pages******************/

if(loc.match("mywallet.php")) {
    window.location.href="poll.php";  
}

/**********************End of Script********************/