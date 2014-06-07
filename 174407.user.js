// ==UserScript==
// @name        Laaptu Fridaylatest.blogspot.com
// @namespace   Laaptu AuTo QuIZeR By Fridaylatest.blogspot.com
// @description Just Login To Your Laaptu Account...... That's it nothing to do More>>>
// @include     http://n.laaptu.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1.0
// @grant       none
// @author      //****ridaylatest.blogspot.com*****//
// ==/UserScript==
$(function(){
    var path = window.location.pathname;
    var link = "http://n.laaptu.com/";
    var url = window.location.href;
    
    pattern=/^http:\/\/n.laaptu.com\/mathquiz/g;
    if(url.search(pattern)==0){
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
        }
    }
    pattern=/^http:\/\/n.laaptu.com\/quiz/g;
    
    if(url.search(pattern)==0)
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
            if(ele[i].clientWidth=="0" && ele[i].clientHeight!="40" && ele[i].innerHTML=="Math Quiz"){
                alert("Congratulations...!!! Your Today's Laaptu Quiz is Over..!!");
                
        }
    }
    /***********Redirect page*******************/
    var pattern=/^http:\/\/n.laaptu.com\/invitefriends/g;
    if(url.search(pattern)==0){
        window.location.href=url.replace("invitefriends","mathquiz");
    }
    /******************End Redirect page****************************/
    /*********************Script End********************************/
    
});