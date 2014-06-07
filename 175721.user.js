// ==UserScript==
// @name        Laaptu-Script(40) By Sachin - sac4temp
// @namespace   Laaptu AuTo QuIZeR By Sac
// @description Just Login To YouR Laaptu Account ...... That's it nothing to do More .. It will give max money i.e. 3.5 paisa for every quiz question... >>>
// @include     *laaptu.*
// @include     *laaptu.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     2.1
// @grant       none
// @author      //******$@<******Sachin******//
// ==/UserScript==

// I am very thankful to MoonLight @ ethicalhavoc.net  because I have take help from the script : Laaptu By MoonLight @ ethicalhavoc.net
// Laaptu By MoonLight @ ethicalhavoc.net  (  http://userscripts.org/scripts/show/174421  )

$(function(){
    var path = window.location.pathname;
    var url = window.location.href;
    
    if(url.match("quiz")){
        {
            var ele = document.getElementsByTagName('a');
            var laaptu_changeorder_bySac = readCookie("laaptu_changeorder_bySac");
            if (laaptu_changeorder_bySac == null)
            {
                createCookie("laaptu_changeorder_bySac", "a2d", 1) ;
                laaptu_changeorder_bySac = "a2d";
            }

            if (laaptu_changeorder_bySac == "a2d")
            {
                for (var i = 0; i < ele.length; i++){
                    if(ele[i].style.display!="none" && ele[i].clientHeight=="40" && ele[i].clientLeft=="1" && ele[i].clientTop=="1" && ele[i].clientWidth=="301"){
                        ele[i].click();
                    }
                }
                for (var i = 0; i < ele.length; i++){
                    //alert("Width of div: " + $(ele[i]).width());
                    if(ele[i].style.display!="none" && ele[i].clientHeight=="26"  && ele[i].textContent=="Continue" ){
                        //alert("edited by Sachin");
                        var laaptu_changeorder_flag = readCookie("laaptu_changeorder_flag");
                        if (laaptu_changeorder_flag == null)
                        {
                            createCookie("laaptu_changeorder_flag", "0", 1) ;
                        }
                        else if (laaptu_changeorder_flag == "1")
                        {
                            createCookie("laaptu_changeorder_flag", "0", 1) ;
                            ele[i].click();
                        }
                        else if (laaptu_changeorder_flag == "0")
                        {
                            createCookie("laaptu_changeorder_flag", "1", 1) ;
                            //$.cookie("laaptu_changeorder_flag", "1", { expires: 1 });
                            var laaptu_changeorder_bySac = readCookie("laaptu_changeorder_bySac");
                            if (laaptu_changeorder_bySac == null)
                            {
                                createCookie("laaptu_changeorder_bySac", "a2d", 1) ;
                            }
                            else if (laaptu_changeorder_bySac == "a2d")
                            {
                                createCookie("laaptu_changeorder_bySac", "d2a", 1) ;
                            }
                            else if (laaptu_changeorder_bySac == "d2a")
                            {
                                createCookie("laaptu_changeorder_bySac", "a2d", 1) ;
                            }
                            history.go(-1); return;
                        }
                        //ele[i].click();
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
                    /* if(ele[i].clientWidth=="0" && ele[i].clientHeight!="40" && ele[i].innerHTML=="Math Quiz"){
                        alert("Congratulations...!!! Your Today's Laaptu Quiz is Over..!!");
                        window.location.href="http://www.laaptu.com/";
                    } */
                }
            }
            else
            {
                for (var i = ele.length - 1; i >=0 ; i--){
                    if(ele[i].style.display!="none" && ele[i].clientHeight=="40" && ele[i].clientLeft=="1" && ele[i].clientTop=="1" && ele[i].clientWidth=="301"){
                        ele[i].click();
                    }
                }
                for (var i = ele.length - 1; i >=0 ; i--){                    
                    //alert("Width of div: " + $(ele[i]).width());
                    if(ele[i].style.display!="none" && ele[i].clientHeight=="26"  && ele[i].textContent=="Continue" ){
                        //alert("edited by Sachin");
                        var laaptu_changeorder_flag = readCookie("laaptu_changeorder_flag");
                        if (laaptu_changeorder_flag == null)
                        {
                            createCookie("laaptu_changeorder_flag", "0", 1) ;
                        }
                        else if (laaptu_changeorder_flag == "1")
                        {
                            createCookie("laaptu_changeorder_flag", "0", 1) ;
                            ele[i].click();
                        }
                        else if (laaptu_changeorder_flag == "0")
                        {
                            createCookie("laaptu_changeorder_flag", "1", 1) ;
                            //$.cookie("laaptu_changeorder_flag", "1", { expires: 1 });
                            var laaptu_changeorder_bySac = readCookie("laaptu_changeorder_bySac");
                            if (laaptu_changeorder_bySac == null)
                            {
                                createCookie("laaptu_changeorder_bySac", "a2d", 1) ;
                            }
                            else if (laaptu_changeorder_bySac == "a2d")
                            {
                                createCookie("laaptu_changeorder_bySac", "d2a", 1) ;
                            }
                            else if (laaptu_changeorder_bySac == "d2a")
                            {
                                createCookie("laaptu_changeorder_bySac", "a2d", 1) ;
                            }
                            history.go(-1); return;
                        }
                        //ele[i].click();
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
                    /* if(ele[i].clientWidth=="0" && ele[i].clientHeight!="40" && ele[i].innerHTML=="Math Quiz"){
                        alert("Congratulations...!!! Your Today's Laaptu Quiz is Over..!!");
                        window.location.href="http://www.laaptu.com/";
                    } */
                }
            }
            
            //closeQuizEarnDiv();
        }
    }
    /***********Redirect page*******************/
	 
  
    if(url.match("invitefriends")){
        window.location.href=url.replace("invitefriends","mathquiz");
    }
	if(url.match("homepage")){
        window.location.href=url.replace("homepage","mathquiz");
    }
	if(url.match("lost")){
        window.location.href=url.replace("lost","login1");
    }
    /******************End Redirect page****************************/
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

function eraseCookie(name) {
    createCookie(name, "", -1);
}


