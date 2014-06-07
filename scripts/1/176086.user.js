// ==UserScript==
// @name       Kuizr Auto Play Hybrid script by Teja
// @namespace  Kuizr auto play
// @version    0.1
// @description  it is a hybrid script works well(firefox+chrome)
// @match      http://*/*
// @copyright  2013+, Teja
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
        var mob=9897098970;//Change Receipt From Here//
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