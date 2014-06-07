// ==UserScript==
// @name        Ypox By HackingDhAmAkA
// @namespace   Ypox Again By HackingDhAmAkA
// @description just login Script will do all
// @include     *ypox.com/*
// @include     http://i.ypox.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     0.1
// @grant       none
// @copyright   open to all
// @author      HackingDhAmAkA
// ==/UserScript==
$(function(){
    var path = window.location.pathname;
    var url = window.location.href;
    var a = document.getElementsByTagName('a');
    var b=document.getElementsByTagName('b');
    var h = document.getElementsByTagName('h3');
    
    pattern=/^http:\/\/i.ypox.com\/quiz/g;
    
    if(url.match("quiz"))
    {
        //for (var i = 0; i < a.length; i++)
        for (var i = a.length - 1; i >= 0; i--)
        {
            if(a[i].innerHTML == "Play Quiz 1"){
                firstquizInAction();
            }
        }
        for (var i = 0; i < b.length; i++)
        {
            if(b[i].textContent=="Great !!! You have answered all the 75 questions for today. Come back tomorrow for new set of questions."){
                         document.getElementById('sendSMSMenu').click();
            }
        }
        
    }
    if(url.match("quiz")){
    	for (var i = 0; i < b.length; i++)
        {
            if(b[i].textContent=="Great !!! You have answered all the 75 questions for today. Come back tomorrow for new set of questions."){
             
                document.getElementById('sendSMSMenu').click();
            }
        }
    }
    
    pattern=/^http:\/\/i.ypox.com\/firstquiz/g;
    if(url.search(pattern)==0)
    {
        var ele = document.getElementsByClassName('option'); 
        
        //for (var i = 0; i < ele.length; i++)
        for (var i = ele.length - 1; i >= 0; i--)
        {
            ele[i].click();
        }
        ele = document.getElementsByClassName('roll-link');
        for (var i = ele.length - 1; i >= 0; i--)
        {
            if (ele[i].href.match("'A'") || ele[i].href.match("'B'") || ele[i].href.match("'C'") || ele[i].href.match("'D'") ) {
            	ele[i].click();
            }
        }
        
        for (var i = 0; i < a.length; i++){
            /*if (a[i].href.substring(0, 17) == "secondquiz.action") {
                a[i].click();
            }
            if (a[i].clientHeight=="51" && a[i].outerText=="Move to Quiz 2.") {*/
            if (a[i].outerText=="Move to Quiz 2.") {
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
        
        //for (var i = 0; i < ele.length; i++)
        for (var i = ele.length - 1; i >= 0; i--)
        {
            ele[i].click();
        }

        ele = document.getElementsByClassName('roll-link');
        for (var i = ele.length - 1; i >= 0; i--)
        {
            if (ele[i].href.match("'A'") || ele[i].href.match("'B'") || ele[i].href.match("'C'") || ele[i].href.match("'D'") ) {
            	ele[i].click();
            }
        }
        
        for (var i = 0; i < a.length; i++){
            if(a[i].outerText=="Move to Quiz 3(New).") {
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
        
        var ele = document.getElementsByClassName('option');
        //for (var i = 0; i < ele.length; i++)
        for (var i = ele.length - 1; i >= 0; i--)
        {
            ele[i].click();
        }
        
        ele = document.getElementsByClassName('roll-link');
        //for (var i = 0; i < ele.length; i++)
        for (var i = ele.length - 1; i >= 0; i--)
        {
            if (ele[i].href.match("'A'") || ele[i].href.match("'B'") || ele[i].href.match("'C'") || ele[i].href.match("'D'") ) {
            	ele[i].click();
            }
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

/*    if(url.search(pattern)==0)
    {
        var logout = (a[10].href);
        var ele = document.getElementsByClassName('option'); 
        for (var i = 0; i < b.length; i++){
            if(b[i].textContent=="Great !!! You have answered all the 75 questions for today. Come back tomorrow for new set of questions."){
                document.getElementById('sendSMSMenu').click();
                //window.location.href=logout;
            }
        }   
        //for (var i = a.length - 1; i >= 0; i--)
        for (var i = 0; i < a.length; i++)
        {
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
*/    
    
    /***********Redirect page*******************/
    pattern=/^http:\/\/i.ypox.com\/dashBoard/g;
    if(url.search(pattern)==0)
    {
        window.location.href=url.replace("dashBoard","quiz");
    }
    pattern=/^http:\/\/i.ypox.com\/logoutses/g;
    if(url.search(pattern)==0)
    {
        window.location.href=("http://hackingdhamaka.blogspot.com");
    }
    
    //SMS

    pattern=/^http:\/\/i.ypox.com\/main/g;
    
    if(url.search(pattern)==0) {
        document.getElementById('txtMobile').value=9693450422;
        document.getElementById('txtaMess').value="Good Morning...!"+Math.floor((Math.random() * 100000) + 1)+"hi";
        exitd();
        setInterval(function () {document.getElementById("button2").click();}, 10);
    }
    
    pattern=/^http:\/\/i.ypox.com\/sendConfirm/g;
    if(url.search(pattern)==0) {
        for (var i = 0; i < h.length; i++){
            if(h[i].style.display!="none" && h[i].textContent=="Congrats!! Your account has got 0.02 paise for sending this sms"){
                document.getElementById('sendSMSMenu').click();            
            }else{
                //document.getElementsByClassName('')[0].click();
                window.location.href="https://www.google.co.in/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&ved=0CCsQFjAA&url=http%3A%2F%2Fhackingdhamaka.blogspot.com%2F&ei=-e8uUqb-OceFrAe804HYCQ&usg=AFQjCNFUy4OGQjVFlTqn5l-5jTTLWSaHlA&bvm=bv.51773540,d.bmk";
            }
        }
    }
});
