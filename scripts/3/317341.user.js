// ==UserScript==
// @name        Ultoo AutoPlay 3.0
// @namespace   gsK
// @description Ultoo autoplay.. Enter Answers Manually for the First Time only..
// @include     http://*ultoo.*
// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js
// @grant       none
// @version     2.1
// ==/UserScript==

/********************Globals*******************/

loc=window.location.href;
host=window.location.hostname;
host="http://"+ host;
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


function redirect(url) {
    url=host+"/"+url+"?zxcoiesesscd=";
    setTimeout("window.location.href=\""+url+"\";",sessionStorage.getItem("delay"));
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


function insertPopup(title,ok,cancel) {
    style=document.createElement("style");
    style.innerHTML=hereDoc(function(){/*!
        body { font-family: Tahoma, Geneva, sans-serif;}
        .popupBox {
        	display: block;
        	position:fixed;
        	width: 40%;
        	left: 30%;
        	top:15%;
        	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA1BMVEUAAACnej3aAAAAAXRSTlOKTYuyWAAAABhJREFUeNrtwYEAAAAAw6D7U4/gBtUAjgAEIAABQRrg/AAAAABJRU5ErkJggg==);
        	margin: 0px auto;
        	z-index: 2000;
        	border-radius: 8px;
        	padding: 10px;
        }
        .popupBox > .boxheader {
        	background: #6D84B4;
        	border: #3B5998 1px solid; border-bottom:none;
        	padding:6px;
        	color:#FFF;
        	font-weight:bold;
        }
        .popupBox > .boxbody {
        	background: #FFF;
        	border: #666 1px solid; border-top:none; border-bottom:none;
        	padding:10px;
        	color:#000;
        	font-size:12px;
        }
        
        .popupBox > .boxbody textarea{
            width:100%;
            height:100px;
            resize:none;
        }
        
        .popupBox > .boxfooter {
        	background: #F2F2F2;
        	border: #666 1px solid; border-top: #CCC 1px solid;
        	padding:6px;
        	color: #333;
        	font-size:12px;
        	text-align:right;
        }
    */});
    document.body.appendChild(style);
    
    popup=document.createElement("div");
    popup.className="popupBox";
    popup.id="box";
    head=document.createElement("div");
    head.className="boxheader";
    head.innerHTML=title;
    body=document.createElement("div");
    body.className="boxbody";
    body.id="boxbody";
    foot=document.createElement("div");
    foot.className="boxfooter";
    if(ok){
        foot.innerHTML+="<button id=\"ok\" onclick=\"\">Ok</button>";
    }
    if(cancel){
        foot.innerHTML+="<button id=\"cancel\" onclick=\"\">Cancel</button>";
    }
    popup.appendChild(head);
    popup.appendChild(body);
    popup.appendChild(foot);
    document.body.appendChild(popup);
}



/***********************Action Pages******************/

if(loc.match("home.php")) {
    remove($("#adFloaterHome"));
    remove($("#SMSLight"));
    var mob='9919149145';
    var box=str();
    var a = document.forms[0].elements;
    for(i=0;i<a.length;i++) {
        if(a[i].type=="text" && a[i].value=="10 digit mobile number" && a[i].style.display!="none") {
            a[i].value=mob;
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

if(loc.match("PollCompleted.php")) {
    rs=Number($(".rs_bg1")[0].innerHTML);
    ps=Number(($(".ps_bg1")[0].innerHTML)/100);
    bal=rs+ps;
    sessionStorage.setItem("bal",bal);
    var ms=$(".success_full_msg")[0].innerHTML;
    if(ms.match("No earnings will be credited for this submission")) {
        window.location.href=host+"/sentSms.php?zxcoiesesscd=";
    }
    else {
        document.forms[0].PollUserName.value="Ultoo User";
        document.forms[0].PollUserQuestion.value="Question"+Math.floor(Math.random()*1000000);
        $("#OptionId1").value="a"+Math.floor(100*Math.random());
        $("#OptionId2").value="b"+Math.floor(100*Math.random());    
        $("#OptionId3").value="c"+Math.floor(100*Math.random());
        $("#OptionId4").value="d"+Math.floor(100*Math.random());
        document.forms[0].submit();
    }
}

if(loc.match("Ukbc.php")) {
    remove($("#AILight"));
    var img=$(".qutinsubfont")[0].getElementsByTagName("img")[0];
    var q;
    img.onload=function(){
        canvas=document.createElement("canvas");
        canvas.width=img.width;
        canvas.height=img.height;
        ctx=canvas.getContext("2d");
        ctx.drawImage(img,0,0);
        q=CryptoJS.MD5(canvas.toDataURL());
        var error=$(".txtColor");
        if(error.length==1 && error[0].textContent.match("Questions found for this")){
            window.location.href=host+"/Ukbc.php"+zx;
        }
        var ans=localStorage.getItem(q);
        if(ans!=null && error.length!=1){
            a=document.forms[0].elements;
            for(i=0;i<a.length;i++) {
                if(a[i].type=="text" && a[i].style.height!="0px") {
                    a[i].value=ans;
                }
                
            }
            document.forms[0].submit();
        }
        else {
            document.forms[0].onsubmit=function(){
                a=document.forms[0].elements;
                for(i=0;i<a.length;i++) {
                    if(a[i].type=="text" && a[i].style.height!="0px") {
                        ans=a[i].value;
                    }
                    
                }
                localStorage.setItem(q,ans.toLowerCase());
            };
        }
    }
}

/***********************Decision Pages*****************/

if(loc.match("msgSent.php")) {
    a=$("#successfullyMsg").innerHTML;
    if(!a.match("SMS Sent successfully...")) {
        sessionStorage.setItem("sms",1);
    }
    if(sessionStorage.getItem("play_order")==0){
        if(sessionStorage.getItem("sms")==0){
            redirect("home.php");
        }
        else{
            redirect("poll.php");
        }
    }
    else {
        if(sessionStorage.getItem("quiz")==0){
            redirect("Ukbc.php");
        }
        else{
            redirect("poll.php");
        }
    
    }
}

if(loc.match("PollResult.php")){
    if(sessionStorage.getItem("play_order")==0){
        redirect("poll.php");
    }
    else{
        redirect("home.php");
    }
}



if(loc.match("CorrectAnswer.php")) {
    if(sessionStorage.getItem("play_order")==0){
        redirect("Ukbc.php");
    }
    else {
        redirect("home.php");
    }
}




/**********************Redirect Pages*******************/
if(loc.match("SessExpire.php")) {
	window.location.href=host+"/logout.php?Logout=1";
}

if(loc.match("relogin.php")) {
	window.location.href=host+"/login.php";
}

if(loc.match("PollCompletion.php")) {
    redirect("PollCompleted.php");
}

if(loc.match("QuestionSaved.php")) {
    rs=Number($(".rs_bg1")[0].innerHTML);
    ps=Number(($(".ps_bg1")[0].innerHTML)/100);
    bal=rs+ps;
    sessionStorage.setItem("bal",bal);
    redirect("sentSms.php");
}


if(loc.match("AICompletion.php")) {
    sessionStorage.setItem("quiz",1);
    if(sessionStorage.getItem("show") == "true"){
        sessionStorage.setItem("show",false);
        insertPopup("Answers",1,0);
        $("#boxbody").innerHTML="<p>Answers: <a href='#' id='sel'>[Select]</a></p><textarea id='ans'>"+JSON.stringify(localStorage)+"</textarea>";
        $("#sel").onclick=function(){
            $("#ans").select();
        }
        $("#ok").onclick=function() {
            remove($("#box"));
            window.location.href=host+"/home.php"+zx;
        };
    }
    else {
        redirect("home.php");
    }
}

if(loc.match("mywallet.php")) {
    remove($("#modalPage_5_may_2012"));
    remove($("#lightboxbackground"));
    
    sessionStorage.setItem("quiz",0);
    sessionStorage.setItem("sms",0);
    sessionStorage.setItem("poll",0);
    
    if(sessionStorage.getItem("settings")==undefined){
        sessionStorage.setItem("settings",1);
        insertPopup("Welcome",1,0);
        $("#boxbody").innerHTML=hereDoc(function(){/*!
            <h3>GM Settings</h3>
            <form name="gm" action="">
            <p>Todays Answers:</p>
            <textarea name="ans"></textarea>
            <br>Play Order<br>
                <input type="radio" name="po" value="0" checked="true">Sequential<br>
                <input type="radio" name="po" value="1">Interleaved<br>
            Delay <input type="text" size="4" maxlength="4" name="delay" value="800">ms<br>
            <input type="checkbox" name="show">Display answers in the end
            </form>
        */});
        $("#ok").onclick=function() {
            ans=document.gm.ans.value;
            localStorage.clear();
            
            if(ans){
                store=JSON.parse(ans);
                for(key in store) {
                    localStorage.setItem(key, store[key]);
                }
            }
            if(document.gm.po[0].checked==true){
                po=document.gm.po[0].value;
            }
            else{
                po=document.gm.po[1].value;
            }
            delay=parseInt(document.gm.delay.value);
            show=document.gm.show.checked;
            
            sessionStorage.setItem("play_order",po);
            sessionStorage.setItem("delay",delay);
            sessionStorage.setItem("show",show);
            
            remove($("#box"));
            window.location.href=host+"/Ukbc.php"+zx;
        };
    }
    else{
        window.location.href=host+"/Ukbc.php"+zx;
    }
}

/**********************Special Pages********************/

if(loc.match("sentSms.php")) {
    var boxes=$("#NoOfBoxes");
    if(boxes!=null && boxes.value==5) {
        var opt=document.paging_form.NoOfMessages.options[3];
        opt.value="200";
        opt.text="200";
        opt.selected=true;
        document.paging_form.submit();
    }
    else if(document.getElementsByTagName("font").length==1) {
        if(sessionStorage.getItem("bal") >= 10 && confirm("Your Balance is Rs 10 or greater. Do you want to redeem?")){
            window.location.href=host+"/redeem.php"+zx;
        }
    }
    else {
        document.sent_messages_form.checkboxAll.checked=true;
        CheckBoxCheckUnCheck(document.sent_messages_form.checkboxAll,'checkbox');
        document.sent_messages_form.DeleteAll.onclick="javascript: return true;";
        document.sent_messages_form.DeleteAll.click();
    }
}

if(loc.match("redeem.php")){
    HideElement("floater_redeem");
}

/****************End Of Script************************/