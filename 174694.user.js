// ==UserScript==
// @name        kuizr Auto Play By Sumanth
// @namespace   kuizr Auto Play By Sumanth
// @description kuizr Auto Play By Sumanth(Firefox+Chrome)
// @include     *kuizr.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1.1

// @author      //**********hackercracker007.tk*********//
// ==/UserScript==
$(function(){
    var path = window.location.pathname;
    var url = window.location.href;
    var ele = document.getElementsByClassName('option'); 
    var sub = document.getElementsByClassName('sbm bdr3');
    var l = document.getElementsByClassName('bdr6 correctans');
    var m = document.getElementsByClassName('bdr6 wrongans');
    var r = document.getElementById('quizMenu');
    var n = document.getElementById('btnNext');
    var s = document.getElementById('btnSubmit');
    var c = document.getElementsByClassName('chtif');
    var p = document.getElementsByClassName('r-inp');
    /*****************Message Data*********************/
    function mess(){
        var rand =Math.floor(Math.random() * (12 - 3 + 1)) +3;
        var text = "";
        var char = "abcdefghijklmnopqrstuvwxyz";
        for( var i=0; i < rand; i++ )
            text += char.charAt(Math.floor(Math.random() * char.length));
        return text;
    }
    var mess=mess();
    /****************Message Data End*****************/
    pattern=/^http:\/\/www.kuizr.com\/firstquiz/g;
    if(url.search(pattern)==0)
    {
        if(n.style.display=="none" && s.style.display!="none"){
            
            //Increase The SetTimeout Limit If You Get This ("You have not selected any option")Dailogue Meanwhile Playing Quiz //Slow Error Can Cause This Error//
            setTimeout(function(){sub[0].click();} , 550); 
        }else{
            r.click();
        }
        for (var i = 0; i < ele.length; i++){
            if(ele[i].clientHeight=="40"&& ele[i].textContent==" D " ){
                ele[i].click();
            }
            if(ele[i].clientHeight=="40"&& ele[i].textContent==" C " ){
                ele[i].click();
            }
            if(ele[i].clientHeight=="40"&& ele[i].textContent==" B " ){
                ele[i].click();
            }
            if(ele[i].clientHeight=="40"&& ele[i].textContent==" A " ){
                ele[i].click();
            }
        }
    }
    pattern=/^http:\/\/www.kuizr.com\/quiz/g;
    if(url.search(pattern)==0)
    {
        for (var i = 0; i < ele.length; i++)
        {
            if(ele[i].clientHeight=="40"&& ele[i].textContent==" D " ){
                ele[i].click();
            }
            if(ele[i].clientHeight=="40"&& ele[i].textContent==" C " ){
                ele[i].click();
            }
            if(ele[i].clientHeight=="40"&& ele[i].textContent==" B " ){
                ele[i].click();
            }
            if(ele[i].clientHeight=="40"&& ele[i].textContent==" A " ){
                ele[i].click();
            }
        }
        setTimeout(function(){sub[0].click();} , 550); 
        if(c[0].value=="CLICK HERE TO INVITE FRIENDS"){
            document.getElementById('sendSMSMenu').click();
        }
    }
    /***********Redirect page*******************/ 
    pattern=/^http:\/\/www.kuizr.com\/quizInter/g;
    if(url.search(pattern)==0){
        if(sub[0].defaultValue=="GO TO NEXT QUESTION"){
            sub[0].click();
        }
    }
    var pattern=/^http:\/\/www.kuizr.com\/dashBoard/g;
    if(url.search(pattern)==0){
        window.location.href=url.replace("dashBoard","quiz");
    }
    /******************End Redirect page****************************/
    //******************SMS START****************//
    pattern=/^http:\/\/www.kuizr.com\/main/g;
    if(url.search(pattern)==0)
    {
        var alert_script  = document.createElement("script");
        alert_script.setAttribute("type", "text/javascript");
        alert_script.innerHTML = "function alert(m) {}";
        document.body.appendChild(alert_script);
        var mob=9849098490;//Change Receipt From Here//
        p[0].value=mob;
        p[1].value=mess;
        sub[0].click();
    }
    pattern=/^http:\/\/www.kuizr.com\/sendConfirm/g;
    if(url.search(pattern)==0)
    {
        if(document.getElementsByTagName('span')[0].innerHTML.match("Congrats!! Your account has got 0.02 paise more..Get going"))
        {
            document.getElementById('sendSMSMenu').click();
        }else{
            document.getElementById('logoutMenu').click();
        }
    }
});