// ==UserScript==
// @name        Ypox
// @namespace   ypox4in1 Fully Auto By Heavenboy
// @description ypox 4in1 Quiz&Sms (No Need To click Manually On Any Quiz,No Pop UP/alert During Sms + Auto Logout After Complition)
// @include     *ypox.com/*
// @include     http://i.ypox.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     2.0
// @grant      none
// @author     /*********Heavenboy**********//
// ==/UserScript==
$(function(){
    var path = window.location.pathname;
    var url = window.location.href;
    var a = document.getElementsByTagName('a');
    var b=document.getElementsByTagName('b');
    var h = document.getElementsByTagName('h3');
    
    pattern=/^http:\/\/i.ypox.com\/quiz/g;
    
    if(url.search(pattern)==0)
    {
        for (var i = 0; i < a.length; i++)
        {
            if(a[i].clientHeight=="31" && a[i].innerHTML=="Play Quiz 1"){
                a[i].click();
            }
        }
        for (var i = 0; i < b.length; i++)
        {
            if(b[i].textContent=="Great !!! You have answered all the 75 questions for today. Come back tomorrow for new set of questions."){
                //alert('Great..!!! Quiz Already Completed..!!');
                document.getElementById('sendSMSMenu').click();
            }
        }
    }
    pattern=/^http:\/\/i.ypox.com\/firstquiz/g;
    if(url.search(pattern)==0)
    {
        var ele = document.getElementsByClassName('option'); 
        
        for (var i = 0; i < ele.length; i++)
        {
            ele[i].click();
        }
        for (var i = 0; i < a.length; i++){
            if(a[i].clientHeight=="51" && a[i].outerText=="Move to Quiz 2.") {
                a[i].click();
            }
        }
        if(document.getElementById("btnNext").style.display=="block")
        {
            document.getElementById("btnNext").click();
        }
        else
        {
            document.getElementById("btnSubmit").click();
        }
    }
    pattern=/^http:\/\/i.ypox.com\/secondquiz/g;
    
    if(url.search(pattern)==0)
    {
        var ele = document.getElementsByClassName('option'); 
        for (var i = 0; i < ele.length; i++)
        {
            ele[i].click();
        }
        for (var i = 0; i < a.length; i++){
            if(a[i].clientHeight=="50" && a[i].outerText=="Move to Quiz 3(New).") {
                a[i].click();
            }
        }
        if(document.getElementById("btnNext").style.display=="block")
        {
            document.getElementById("btnNext").click();
        }
        else
        {
            document.getElementById("btnSubmit").click();
        }
        
    }
    pattern=/^http:\/\/i.ypox.com\/imgquiz/g;
    
    if(url.search(pattern)==0)
    {
        var logout = (a[10].href);
        var ele = document.getElementsByClassName('option'); 
        for (var i = 0; i < b.length; i++){
            if(b[i].textContent=="Great !!! You have answered all the 75 questions for today. Come back tomorrow for new set of questions."){
                document.getElementById('sendSMSMenu').click();
                //window.location.href=logout;
            }
        }   
        for (var i = 0; i < ele.length; i++){
            ele[i].click();
        }
        if(document.getElementById("btnNext").style.display=="block")
        {
            document.getElementById("btnNext").click();
        }
        else
        {
            document.getElementById("btnSubmit").click();
        }
    }
    /***********Redirect page*******************/
    pattern=/^http:\/\/i.ypox.com\/dashBoard/g;
    if(url.search(pattern)==0)
    {
        window.location.href=url.replace("dashBoard","quiz");
    }
    pattern=/^http:\/\/i.ypox.com\/logoutses/g;
    if(url.search(pattern)==0)
    {
        window.location.href=("http://i.ypox.com/content/login.html?");
    }
    /******************End Redirect page****************************/
    
    //******************SMS STARTS*********************************//
    pattern=/^http:\/\/i.ypox.com\/main/g;
    if(url.search(pattern)==0)
    {
        /************Error Alert/Pop-up Blocker During Sms******************/
        var alert_script  = document.createElement("script");
        alert_script.setAttribute("type", "text/javascript");
        alert_script.innerHTML = "function alert(m) {}";
        document.body.appendChild(alert_script);
        /******************Alert Control End******************/
        /*****************Random Sms TEXT*********************/
        function mess(){
            var rand =Math.floor(Math.random() * (7 - 1 + 1)) +1;
            var text = "";
            var char = "abcdefghijklmnopqrstuvwxyz.....,,,,,";
            for( var i=0; i < rand; i++ )
                text += char.charAt(Math.floor(Math.random() * char.length));
            return text;
        }
        var mess=mess();
        /**************Reandom Text End*******************/
        var t = document.getElementsByTagName('input');
        var s = document.getElementsByClassName('r-inp');
        var mob = "9934099340";//Change Receipt From Here//
        for (var i = 0; i < s.length; i++)
        {
            if(s[i].clientHeight="17" && s[i].clientHeight!="78" && s[i].clientWidth!="312" && s[i].cols!="15"){
                s[i].value=mob;
            }
            if(s[i].cols=="45"){
                s[i].value=mess;
            }
        }
        for (var i = 0; i < t.length; i++){
            if(t[i].value=="Send Now"){
                t[i].click();
            }
        }
    }
    pattern=/^http:\/\/i.ypox.com\/sendConfirm/g;
    if(url.search(pattern)==0)
    {
        for (var i = 0; i < h.length; i++){
            if(h[i].style.display!="none" && h[i].textContent=="Congrats!! Your account has got 0.02 paise for sending this sms"){
                document.getElementById('sendSMSMenu').click();            
            }else{
                //alert("Your Sms Quota Is Over Now...!!");
                document.getElementsByClassName('logbtn bdr3')[0].click();
            }
        }
    }
    pattern=/^http:\/\/i.ypox.com\/quizCap/g;
    if(url.search(pattern)==0)
    {
     document.getElementById('quizMenu').click();
    }
    
});
