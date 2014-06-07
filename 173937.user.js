// ==UserScript==
// @name        Laaptu By Shahzad
// @namespace   Laaptu AuTo QuIZeR By shahzad/koltharkar
// @description Just Login To YouR Laaptu Account...... That's it nothing to do More>>>
// @include     *laaptu.*
// @include     *laaptu.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1.1
// @grant       none
// @author      //****Shahzad koltharkar*****//
// ==/UserScript==
$(function(){
    var path = window.location.pathname;
    var url = window.location.href;
    
    if(url.match("quiz")){
        {
            var ele = document.getElementsByTagName('a');
            for (var i = 0; i < ele.length; i++){
                if(ele[i].style.display!="none" && ele[i].clientHeight=="40" && ele[i].clientLeft=="1" && ele[i].clientTop=="1" && ele[i].clientWidth=="301"){
                    ele[i].click();
                }
                if(ele[i].style.display!="none" && ele[i].clientHeight=="26" && ele[i].clientLeft=="0" && ele[i].clientTop=="0" && ele[i].clientWidth=="181"){
                    ele[i].click();
                }
                if(ele[i].style.display!="none" && ele[i].clientHeight=="26" && ele[i].clientLeft=="0" && ele[i].clientTop=="0" && ele[i].clientWidth=="131"){
                    ele[i].click();
                }
                if(ele[i].clientWidth=="0" && ele[i].clientHeight!="40" && ele[i].innerHTML=="Fun Quiz"){
                    ele[i].click();
                }
                if(ele[i].clientWidth=="0" && ele[i].clientHeight!="40" && ele[i].innerHTML=="Math Quiz"){
                    alert("Congratulations...!!! Your Today's Laaptu Quiz is Over..!!");
                    window.location.href="http://www.kuizr.com/entry.action?rid=o1sACj8CrqWG9SV7r9uuy4aqO0wymjHhuRfv3GgDS5c=";
                }
            }
        }
    }
    /***********Redirect page*******************/
    if(url.match("invitefriends")){
        window.location.href=url.replace("invitefriends","mathquiz");
    }
    /******************End Redirect page****************************/
    /*********************Script End********************************/
    
});