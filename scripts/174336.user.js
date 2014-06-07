// ==UserScript==
// @name        Kuizr By SiD @TricksAdda
// @namespace   Kuizr By SiD @TricksAdda
// @description Kuizr Script By SiD
// @include     http://www.kuizr.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     2.0
// ==/UserScript==
$(function(){
    var path = window.location.pathname;
    
    var url = window.location.href;
    
    var pattern=/^http:\/\/www.kuizr.com\/dashBoard/g;
    
    if(url.search(pattern)==0)
    {
        window.location.href=url.replace("dashBoard","quiz");
    }
    
    pattern=/^http:\/\/www.kuizr.com\/quizInter/g;
    if(url.search(pattern)==0)
    {
        if(document.getElementsByClassName("sbm bdr3")[0].defaultValue=="GO TO NEXT QUESTION"){
            document.getElementsByClassName('sbm bdr3')[0].click();
        }
    }
    
    pattern=/^http:\/\/www.kuizr.com\/firstquiz/g;
    if(url.search(pattern)==0)
    {
        
        var ele = document.getElementsByClassName('option'); 
        
        for (var i = 0; i < ele.length; i++)
        {
            ele[i].click();
        }
        if(document.getElementsByClassName("sbm bdr3")[0].defaultValue=="CLICK HERE TO CONTINUE"){
            document.getElementsByClassName('sbm bdr3')[0].click();
        }
        if(document.getElementById("btnSubmit").style.display=="block")
        {
            document.getElementsByClassName('sbm bdr3')[0].click();
        }
        else
        {
            document.getElementById('quizMenu').click();
        }
        var b=document.getElementsByTagName('b')[0].innerHTML;
        if(b.match("Awesome!! You have successfully answered all the 25 questions of Quiz 1")) {
            document.getElementsByTagName("a")[12].click();
        }
        
    }
    
    pattern=/^http:\/\/www.kuizr.com\/secondquiz/g;
    
    if(url.search(pattern)==0)
    {
        var ele = document.getElementsByClassName('option'); 
        for (var i = 0; i < ele.length; i++)
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
    pattern=/^http:\/\/www.kuizr.com\/quiz/g;
    if(url.search(pattern)==0)
    {
        
        var ele = document.getElementsByClassName('option'); 
        
        for (var i = 0; i < ele.length; i++)
        {
            ele[i].click();
        }
        if(document.getElementsByClassName("sbm bdr3")[0].defaultValue=="CLICK HERE TO CONTINUE"){
            document.getElementsByClassName('sbm bdr3')[0].click();
        }
        if(document.getElementById("btnSubmit").style.display=="block")
        {
            document.getElementsByClassName('sbm bdr3')[0].click();
        }
        else
        {
            //document.getElementById('quizMenu').click();
            //document.forms[0].submit();
        }
    }
    pattern=/^http:\/\/www.kuizr.com\/logout/g;
    if(url.search(pattern)==0)
    {
        window.location.href="http://www.kuizr.com";
    }    
    /***********descision page*******************/ 
    /*  
    pattern=/^http:\/\/www.kuizr.com\/firstquiz/g;
    
    if(url.search(pattern)==0)
    {
        var b=document.getElementsByTagName('b')[0].innerHTML;
        if(b.match("Awesome!! You have successfully answered all the 25 questions of Quiz 1")) {
            document.getElementsByTagName("a")[12].click();
        }
        else if(b.match("Awesome!! You have successfully answered all the 25 questions of Quiz 2")) {
            document.getElementsByTagName("a")[13].click();
        } 
            else if(b.match("Awesome!! You have successfully answered all the 25 questions of Quiz 3")) {
                document.getElementsByTagName("a")[13].click();
            } 
            }
    pattern=/^http:\/\/www.kuizr.com\/secondquiz/g;
    
    if(url.search(pattern)==0)
    {
        var b=document.getElementsByTagName('b')[0].innerHTML;
        if(b.match("Awesome!! You have successfully answered all the 25 questions of Quiz 1")) {
            document.getElementsByTagName("a")[12].click();
        } 
        if(b.match("Awesome!! You have successfully answered all the 25 questions of Quiz 2")) {
            document.getElementsByTagName("a")[13].click();
        } 
        if(b.match("Awesome!! You have successfully answered all the 25 questions of Quiz 3")) {
            document.getElementsByTagName("a")[13].click();
        } 
    }
    pattern=/^http:\/\/www.kuizr.com\/imgquiz/g;
    
    if(url.search(pattern)==0)
    {
        var b=document.getElementsByTagName('b')[0].innerHTML;
        if(b.match("Awesome!! You have successfully answered all the 25 questions of Quiz 1")) {
            document.getElementsByTagName("a")[12].click();
        } 
        if(b.match("Awesome!! You have successfully answered all the 25 questions of Quiz 2")) {
            document.getElementsByTagName("a")[13].click();
        } 
        if(b.match("Awesome!! You have successfully answered all the 25 questions of Quiz 3")) {
            document.getElementsByTagName("a")[13].click();
        } 
    }
   */ 
    /******************End Descision page****************************/
    
    //SMS
    pattern=/^http:\/\/www.kuizr.com\/main/g;
    if(url.search(pattern)==0)
    {
        document.getElementsByClassName('r-inp')[0].value=9097999999;
        document.getElementsByClassName('r-inp')[1].value=" "+Math.floor((Math.random() * 100000) + 1)+"";
        //document.forms[0].submit();
        document.getElementsByClassName('sbm bdr3')[0].click();
        //setInterval(function () {document.getElementById("button2").click();}, 1000);
        
    }
    pattern=/^http:\/\/www.kuizr.com\/sendConfirm/g;
    //var html="document.getElementsByTagName('h1')[0].innerHTML";
    
    if(document.getElementsByTagName('h1')[0].innerHTML==("Message has been sent successfully"));
    {
        document.getElementsByClassName('orbut bdr4')[0].click();
    }
});