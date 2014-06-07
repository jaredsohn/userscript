// ==UserScript==
// @name           Way2Sms Earning Trick By sumanth
// @namespace      Way2Sms Earning Trick By Sumanth
// @description    Way2Sms Auto Quiz Trick By Sumanth 
// @include     *.way2sms.*
// @include     *.way2sms.com/*
// @include     htt*://accounts.google.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1.0
// @author      hackercracker007
// ==/UserScript==
/***************Do Not Call For Path/url/Location Redirects It Might Cause Not Working Of This Script******************/

var url = window.location.href;
var host = window.location.hostname;
var path = window.location.pathname;
var a = document.getElementsByTagName('a');
var i = document.getElementsByTagName('i');
var l = document.getElementsByTagName('li');
var h = document.getElementsByTagName('h3');
var r = document.getElementsByClassName('reds');
var s = document.getElementsByClassName('ei');
/*******************Quiz Class Begin***********************/
if(path.match("quizwelcome")){
    for (var z = 0; z < a.length; z++){
        if(a[z].textContent=="START HERE"){
            a[z].click();
        }    
    }
}
if(path.match("quizMian")){
    setTimeout(function() {
        for (var y = 0; y < l.length; y++){
            if(l[y].clientHeight=="25"&& l[y].className==""){
                l[y].click();
            }    
        }
        for (var u = 0; u < a.length; u++){
            if(a[u].clientHeight=="41"&& a[u].textContent=="Submit"){
                a[u].click();
            }    
        }
    }, 1300);//Increase SetTimeout If Quiz Stuck//
}
if(path.match("quizInt")){
    for (var y = 0; y < l.length; y++){
        if(l[y].clientHeight=="25"&& l[y].className==""){
            l[y].click();
        }    
    }
    for (var u = 0; u < a.length; u++){
        if(a[u].clientHeight=="41"&& a[u].textContent=="Submit"){
            a[u].click();
        }    
    }
}
if(path.match("quizResult")){
    for (var v = 0; v < a.length; v++){
        if(a[v].clientHeight=="41"&& a[v].textContent=="Next Question"){
            a[v].click();
        }    
    }
}
if(path.match("quizSuccess")){
    alert("It Seems Your Today Quiz is Over..!!");
}
/**************************Quiz End**************************/