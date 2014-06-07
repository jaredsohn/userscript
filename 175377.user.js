// ==UserScript==
// @name        Laaptu By dsvr 100% Works 
// @namespace   Laaptu Auto Maths + Quiz Player
// @description Just Login To Your Laaptu Account And Click Maths Quiz And Fun Quiz
// @include     *laaptu.*
// @include     *laaptu.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1.2 Auto
// @grant       none
// @author      dsvr
// ==/UserScript==
$(function()
{var url = window.location.href;
    var ele = document.getElementsByTagName('a');
    /************************Quiz Class Begin***********************/
    
    if(url.match("quiz")){
        {
    var path = window.location.pathname;
            for (var i = 0; i < ele.length; i++){
                if(ele[i].style.display!="none" && ele[i].clientHeight=="40" && ele[i].clientLeft=="1" && ele[i].clientTop=="1" && ele[i].clientWidth=="301"){
                    ele[i].click();
                }
                if(ele[i].style.display!="none" && ele[i].clientHeight=="26" && ele[i].clientLeft=="0" && ele[i].clientTop=="0" && ele[i].clientWidth=="181"){
                    ele[i].click();
                    
                }/*
                if(ele[i].clientHeight=="26" && ele[i].clientLeft=="0" && ele[i].clientTop=="0" && ele[i].clientWidth=="136" && ele[i].textContent=="Continue"){
                    ele[i].click();
                }*/
                if(ele[i].style.display!="none" && ele[i].clientHeight=="26" && ele[i].clientLeft=="0" && ele[i].clientTop=="0" && ele[i].clientWidth=="131"){
                    ele[i].click();
                }
                if(ele[i].clientWidth=="0" && ele[i].clientHeight!="40" && ele[i].innerHTML=="Fun Quiz"){
                    ele[i].click();
                }
                if(ele[i].clientWidth=="0" && ele[i].clientHeight!="40" && ele[i].innerHTML=="Math Quiz"){
                    alert("Happy ..!! Your Today Maths Quiz And Fun Quiz Over ");
                    window.location.href="http://www.kuizr.com/entry.action?rid=o65RHsPQYhim0FR+h7P81ghzPuFHyWeOuRfv3GgDS5c=";
                }
            }
        }
    }
    if(path===("/mathquiz.action")){
        for (var i = 0; i < ele.length; i++){
            if(ele[i].clientHeight=="26" && ele[i].clientWidth=="136" && ele[i].textContent=="Continue"){
                document.getElementById('menuFact').click();
            }
        }
    }
    if(path===("/quiz.action")){
        for (var i = 0; i < ele.length; i++){
            if(ele[i].clientHeight=="26" && ele[i].clientWidth=="136" && ele[i].textContent=="Continue"){
                document.getElementById('menuQuiz').click();
            }
        }
    }
    /***********Redirect page*******************/
    if(url.match("homepage")){
        document.getElementById('menuFact').click();
    }
    if(path===("/lost.action")){
        window.location.href=url.replace("laaptu.com/lost.action?msgnew=","laaptu.com");
    }
    /******************End Redirect page****************************/
    /*********************Script End********************************/
    
});