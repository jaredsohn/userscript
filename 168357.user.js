// ==UserScript==
// @name        Ultoo AutoPlay
// @namespace   Abhishek Kumbhani
// @description Ultoo autoplay.. Enter Answers Manually for the First Time only..
// @include     http://*ultoo.*

// @grant       none
// @version     1.1
// ==/UserScript==

var loc=window.location.href;
var host=window.location.hostname;
var zx="?zxcoiesesscd=";
host="http://"+host;

function str() {
    var set="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var txt='';
    for(i=0;i<10;i++){
        txt+=set.charAt(Math.floor(Math.random() * set.length));
    }
    return txt;
}

if(loc.match("mywallet.php")) {
    window.location.href=host+"/home.php"+zx;
}

if(loc.match("home.php")) {
    var ad=document.getElementById("adFloaterHome");
    if(ad!=null){
        ad.style.display="none";
    }
    var mob='9804452350';
    var box=str();
    var a = document.forms[0].elements;
    for(i=0;i<a.length;i++) {
        if(a[i].type=="text" && a[i].style.display!="none") {
            a[i].value=mob;
        }
        if(a[i].tagName.toUpperCase()=="TEXTAREA" && a[i].style.display!="none") {
            a[i].value=box;
        }
    }
    document.forms[0].submit();
    var rp=document.getElementsByClassName("rupies_paisa_panel")[0].innerHTML
    if(rp!=sessionStorage.rp) {
        //setTimeout("window.location.href=\""+host+"/home.php"+zx+"\";",250);
    }
    sessionStorage.rp=rp;
}

if(loc.match("msgSent.php")) {
    a=document.getElementById("successfullyMsg").innerHTML;
    if(a.match("SMS Sent successfully...")) {
        window.location.href=host+"/home.php"+zx;
    }
    else if(a.match("You have reached the Overall sms limit for the day")) {
        window.location.href=host+"/sentSms.php"+zx;
    }
        else {
            window.location.href=host+"/poll.php"+zx;
        }
}

if(loc.match("poll.php")) {
    document.forms[0].OptionId[0].click();
    document.forms[0].submit();
    //setTimeout("window.location.href=\""+host+"/poll.php"+zx+"\";",1000);
}

if(loc.match("PollResult.php")){
    window.location.href=host+"/poll.php"+zx;
}

if(loc.match("PollCompletion.php")) {
    window.location.href=host+"/PollCompleted.php"+zx;
}

if(loc.match("PollCompleted.php")) {
    var ms=document.getElementsByClassName("success_full_msg")[0].innerHTML;
    if(ms.match("No earnings will be credited for this submission")) {
        window.location.href=host+"/AnswereIt.php"+zx;
    }
    else {
        document.forms[0].PollUserName.value="Abhishek Kumbhani";
        document.forms[0].PollUserQuestion.value="Question"+Math.floor(Math.random()*1000000);
        document.getElementById("OptionId1").value="a"+Math.floor(100*Math.random());
        document.getElementById("OptionId2").value="b"+Math.floor(100*Math.random());    
        document.getElementById("OptionId3").value="c"+Math.floor(100*Math.random());
        document.getElementById("OptionId4").value="d"+Math.floor(100*Math.random());
        document.forms[0].submit();
		//setTimeout("window.location.href=\""+host+"/AnswereIt.php"+zx+"\";",250);
    }
}

if(loc.match("QuestionSaved.php")) {
    window.location.href=host+"/AnswereIt.php"+zx;
}


if(loc.match("AnswereIt.php")) {
    document.getElementById("AILight").style.display="none";
    var q=document.getElementsByClassName("qutinsubfont")[0].textContent;
    var error=document.getElementsByClassName("txtColor");
    var ans=localStorage.getItem(q);
    if(ans!=null && error.length!=1){
        a=document.forms[0].elements;
        for(i=0;i<a.length;i++) {
            if(a[i].type=="text" && a[i].style.height!="0px") {
                a[i].value=ans;
            }
            
        }
        document.forms[0].submit();
		//setTimeout("window.location.href=\""+host+"/AnswereIt.php"+zx+"\";",600);
    }
    else {
        document.forms[0].onsubmit=function(){
            a=document.forms[0].elements;
            for(i=0;i<a.length;i++) {
                if(a[i].type=="text" && a[i].style.height!="0px") {
                    ans=a[i].value;
                }
                
            }
            localStorage.setItem(q,ans);
			//setTimeout("window.location.href=\""+host+"/AnswereIt.php"+zx+"\";",600);
        };
    }
}


if(loc.match("AnswereItGraph.php")) {
    window.location.href=host+"/AnswereIt.php"+zx;
}


if(loc.match("AICompletion.php")) {
    window.location.href=host+"/home.php"+zx;
}

if(loc.match("SessExpire.php")) {
	window.location.href=host+"/logout.php?Logout=1";
}

if(loc.match("relogin.php")) {
	window.location.href=host+"/login.php";
}

if(loc.match("sentSms.php")) {
    var boxes=document.getElementById("NoOfBoxes");
    if(boxes!=null && boxes.value==5) {
        var opt=document.paging_form.NoOfMessages.options[3];
        opt.value="200";
        opt.text="200";
        opt.selected=true;
        document.paging_form.submit();
    }
    else if(document.getElementsByTagName("font").length==1) {
        //window.location.href=host+"/logout.php?Logout=1";  //Not Loging out for some reason!!Logout Manually
    }
    else {
        document.sent_messages_form.checkboxAll.checked=true;
        CheckBoxCheckUnCheck(document.sent_messages_form.checkboxAll,'checkbox');
        document.sent_messages_form.DeleteAll.onclick="javascript: return true;";
        document.sent_messages_form.DeleteAll.click();
    }
}     