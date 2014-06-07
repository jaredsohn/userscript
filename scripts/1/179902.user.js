// ==UserScript==
// @name       faasty auto vote
// @namespace  faasty auto vote
// @version    0.1
// @include     http://*faasty.*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js

// @copyright   S...R.......D
// ==/UserScript==

loc=window.location.href;
host=window.location.hostname;
zx="?zxcoiesesscd=";

/********************Functions*******************/





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






/**********************vote***********************************/
if(loc.match("vote.php")) {
    remove($("#adFloaterPoll"));
    var x=Math.floor(0 + (1+3-0)*Math.random());
    document.forms[0].OptionId[x].click();
    if(document.forms[0].response_field_single_char){
        document.forms[0].response_field_single_char.value=prompt("Enter Captcha");
        document.forms[0].submit();
    }
    else{
        document.forms[0].submit();
    }
}


if(loc.match("voteResult.php")){
    window.location.href="vote.php";
		if(sessionStorage.getItem("play_order")==0){
			redirect("PollCompleted.php");
    }
    
}




/*********************Redirect Pages****************/
if(loc.match("mywallet.php")) {
    
    window.location.href="vote.php";  
}
if(loc.match("voteCompletion.php")) {
    window.location.href="logout.php";  
}

/**********************End of Script********************/