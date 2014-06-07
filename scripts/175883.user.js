
// ==UserScript==
// @name           Laaptu by Sreeram
// @namespace      ethicalhavoc
// @description    Laptu
// @include        http://userscripts.org/topics/kuizr
// ==/UserScript==

$(function(){
    var path = window.location.pathname;
    var url = window.location.href;
    var ele = document.getElementsByTagName('a');
    /************************Quiz Class Begin***********************/
    
    if(url.match("quiz")){
        {
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
                    window.location.href="http://adv.li/thka";
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