// ==UserScript==
// @name        ypox-Script By Sachin - sac4temp
// @namespace   ypox AuTo QuIZeR By Sac
// @description Just Login To YouR ypox Account ...... That's it nothing to do More .. It will give max money i.e. 3.5 paisa for every quiz question... >>>
// @include     *ypox.*
// @include     *ypox.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1.1
// @grant       none
// @author      //******$@<******Sachin******//
// ==/UserScript==

// I am very thankful to ***** SUMANTH SARIPALLI ***** because I have take help from the script : ypox script ALL 3 Quiz + SMS sender by Sumanth  
// ypox script ALL 3 Quiz + SMS sender by Sumanth  (  http://userscripts.org/scripts/show/174686  )

$(function () {
    var path = window.location.pathname;
    var url = window.location.href;
    var a = document.getElementsByTagName('a');
    var b = document.getElementsByTagName('b');
    var h = document.getElementsByTagName('h3');
 
    /*********** first create cookies *******************/
    var ypox_changeorder_bySac = readCookie("ypox_changeorder_bySac");
    if (ypox_changeorder_bySac == null) {
        createCookie("ypox_changeorder_bySac", "a2d", 1);
        ypox_changeorder_bySac = "a2d";
    }
    var ypox_changeorder_flag = readCookie("ypox_changeorder_flag");
    if (ypox_changeorder_flag == null) {
        createCookie("ypox_changeorder_flag", "0", 1);
    }
    /*********** End first create cookies *******************/

/*
    pattern=/^http:\/\/i.ypox.com\/firstquiz/g;
    if(url.search(pattern)==0)
    {
        for (var i = 0; i < a.length; i++)
        {
            if(b[i].textContent=="Awesome!! You have successfully answered all the 25 questions of Quiz 1"){
                for (var i = 0; i < a.length; i++)
                {
                    if(a[i].href.match(/secondquiz.action/g)){
                        a[i].click();
                    }
                }
            }
        }
    }
   
    pattern=/^http:\/\/i.ypox.com\/secondquiz/g;
    if(url.search(pattern)==0)
    {
        for (var i = 0; i < a.length; i++)
        {
            if(b[i].textContent=="Awesome!! You have successfully answered all the 25 questions of Quiz 2"){
                for (var i = 0; i < a.length; i++)
                {
                    if(a[i].href.match(/imgquiz.action/g)){
                        a[i].click();
                    }
                }
            }
        }
    }
*/

    /***********Redirect page*******************/
        /*********** first redirect to quiz page *******************/
    var pattern = /^http:\/\/i.ypox.com\/dashBoard/g;
    if (url.search(pattern) == 0) {
        window.location.href = url.replace("dashBoard", "quiz");
        //window.location.href = "http://i.ypox.com/firstquiz.action";
    }

    pattern=/^http:\/\/i.ypox.com\/quizCap/g;
    if(url.search(pattern)==0)
    {
        window.location.href=url.replace("quizCap","quiz");
    }

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

        /*********** End first redirect to quiz page *******************/

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
    }

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
        var mob = "7382255803";//Change Receipt From Here//
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
    


//****************** SMS ENDS *********************************//



/*
    if (document.getElementsByClassName('bdr6 correctans1').style.display == "block") {
        if (url.match("firstquiz")) {
            //window.location.href = url.replace("firstquiz", "secondquiz");
            window.location.href = "http://i.ypox.com/secondquiz.action";
        }
        else if (url.match("secondquiz")) {
            window.location.href = "http://i.ypox.com/imgquiz.action";
            //window.location.href = url.replace("secondquiz", "imgquiz");
        }
        else {
            alert("all quiz completed..!");
        }
    }
*/

    /******************End Redirect page****************************/

    /*********** for all quiz page*******************/
    if (url.match("quiz")) {

        //var ele = document.getElementsByTagName('a');
        var ele = document.getElementsByClassName('option');

        if (ypox_changeorder_bySac == "a2d") {
            for (var i = 0; i < ele.length; i++) {
                ele[i].click();
            }
        }
        else {
            for (var i = ele.length - 1; i >= 0; i--) {
                ele[i].click();
            }
        }
        if (document.getElementById("btnNext").style.display == "block") {
            if (ypox_changeorder_flag == "1") {
                //alert('go forward');
                createCookie("ypox_changeorder_flag", "0", 1);
                document.getElementById("btnNext").click();
            }
            else if (ypox_changeorder_flag == "0") {
                createCookie("ypox_changeorder_flag", "1", 1);
                if (ypox_changeorder_bySac == "a2d") {
                    createCookie("ypox_changeorder_bySac", "d2a", 1);
                }
                else if (ypox_changeorder_bySac == "d2a") {
                    createCookie("ypox_changeorder_bySac", "a2d", 1);
                }
                //alert('goback');
                history.go(-1); return false;
                //document.getElementById("btnNext").click();
            }
        }
        else {
            document.getElementById("btnSubmit").click();
        }
        
        /*
        //bdr6 correctans1
        //if ()
        if(document.getElementsByClassName('bdr6 correctans1')[0].style.display=="block")
    	{
    	   alert("quiz 1 completed..!");
            for (var i = 0; i < a.length; i++)
            {
                if(b[i].textContent=="Awesome!! You have successfully answered all the 25 questions of Quiz 1"){
                    for (var i = 0; i < a.length; i++)
                    {
                        if(a[i].href.match(/secondquiz.action/g)){
                            a[i].click();
                        }
                    }
                }
                if(b[i].textContent=="Awesome!! You have successfully answered all the 25 questions of Quiz 2"){
                    for (var i = 0; i < a.length; i++)
                    {
                        if(a[i].href.match(/imgquiz.action/g)){
                            a[i].click();
                        }
                    }
                }
            }
        	//closeQuizEarnDiv();
            //document.getElementById("quizMenu").click();
            //alert("quiz 1 completed..!");
        }
        */
    }
    /******************End for all quiz page****************************/


    /*********************Script End********************************/
});

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

