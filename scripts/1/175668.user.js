// ==UserScript==
// @name        Kuizr Quiz + SMS Sender
// @author      JAYKISHEN KHEMANI
// @namespace   Auto kuizr
// @description Kuizr Script by Gagan
// @include     *kuizr.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     2.1
// @grant       none
// ==/UserScript==
$(function(){
    var path = window.location.pathname;
    var url = window.location.href;
    var b = document.getElementsByTagName('b');
    var ele = document.getElementsByClassName('option'); 
    var sub = document.getElementsByClassName('sbm bdr3');
    var l = document.getElementsByClassName('bdr6 correctans');
    var c = document.getElementsByClassName('chtif');
    var r = document.getElementById('quizMenu');
    
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
        for (var i = 0; i < sub.length; i++){
            if(sub[i].clientHeight=="30" && sub[i].defaultValue=="submit" ){
                sub[i].click();
            }
            if(l[0].style.display=="block"){
                r.click();
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
        for (var i = 0; i < sub.length; i++){
            if(sub[i].clientHeight=="30" && sub[i].defaultValue=="submit"){
                sub[i].click();
            }
        }
        if(c[0].defaultValue=="CLICK HERE TO INVITE FRIENDS"){
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
    /********************Signup Helper*****************************/
    ////Replace it with your Kuizr Referal link////
    var ref = "http://www.kuizr.com/entry.action?rid=o8+PlWYiqTjOCcLqcsUV/yZI+TY6PWfwmcS7yz2lt7U=";
    var pattern=/^http:\/\/www.kuizr.com\/entry/g;
    if(url.search(pattern)==0){
        if(window.location!=ref){
            window.location.href=ref;
        }
        for (var i = 0; i < b.length; i++){
            if(b[i].textContent.match("Invalid verification code. Try again.")){
                alert("Wrong Captcha Entered During Sign Up... Try Again..!!")
            }
        }
    }
    if(window.location==ref){
        var d =Math.floor(Math.random() * (9 - 1 + 1)) +1;
        var date ="0"+d+"/";
        document.getElementById('tfUserName').value=mess;
        document.getElementById('tfUserID').value=mess+d+"@gmail.com";
        document.getElementById('date1').value=date+date+"198"+d;
        document.getElementById('checkaccept').click();
        setTimeout(function(){document.forms[0].tfMobileNum.value=prompt("Mobile Number")},10000);
        //document.forms[0].textcode.value=prompt("Captcha");
    }
    //******************SMS START****************//
    pattern=/^http:\/\/www.kuizr.com\/main/g;
    if(url.search(pattern)==0)
    {
        var alert_script  = document.createElement("script");
        alert_script.setAttribute("type", "text/javascript");
        alert_script.innerHTML = "function alert(m) {}";
        document.body.appendChild(alert_script);
        var mob=9548940342;//You Can Change RECEIPT
        document.getElementsByClassName('r-inp')[0].value=mob;
        document.getElementsByClassName('r-inp')[1].value=mess;
        sub[0].click();
    }
    //***************SMS END***********************//
    pattern=/^http:\/\/www.kuizr.com\/sendConfirm/g;
    if(url.search(pattern)==0)
    {
        if(document.getElementsByTagName('span')[0].innerHTML.match("Congrats!! Your account has got 0.02 paise more..Get going"))
        {
            document.getElementById('sendSMSMenu').click();
        }else{
            if (confirm("Your Today Quiz && Sms Quota Over..!! Wanna Logout??")){
                document.getElementById('logoutMenu').click();
                 window.location.href="http://g.laaptu.com/login1.action?rid=m50CxnJCjBWUYLBnWKk8kX4wnOnS8xrj ";
            }
        }
    }
});