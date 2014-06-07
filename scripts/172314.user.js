// ==UserScript==
// @name        YPOX TURBO SPEED BY Tricksmore
// @namespace   YpoX All in one
// @description Ypox Script earns automatically for you by Tricksmore
// @include     http://www.ypox.com/*
// @include     
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1
// ==/UserScript==
$(function(){
var path = window.location.pathname;

var url = window.location.href;

var pattern=/^http:\/\/www.ypox.com\/dashBoard/g;

if(url.search(pattern)==0)
{
	window.open('http://dailynewtricks.blogspot.com/');
    window.location.href=url.replace("dashBoard","quiz");
}

pattern=/^http:\/\/www.ypox.com\/quiz/g;

if(url.search(pattern)==0)
{
//document.getElementsByClassName("ybn bdr3")[0].click();
//window.location.href="http://www.ypox.com/firstquiz.action";
}

pattern=/^http:\/\/www.ypox.com\/firstquiz/g;

if(url.search(pattern)==0)
{
	var ele = document.getElementsByClassName('option'); 
    var a = document.getElementsByClassName('atmpt').innerHTML;
    
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
        setInterval(function () {document.getElementById("btnSubmit").click();}, 0);
    }
a = document.getElementsByClassName('atmpt')[0].innerHTML;

/*    if(a.match("Attempt 2"))
    {
alert("attempt 2");
//    history.back();
    }*/
        if(document.getElementsByClassName('bdr6 correctans1').style.display=="block")
	{
        alert("quiz 1 completed..!");
    }
}

pattern=/^http:\/\/www.ypox.com\/secondquiz/g;

if(url.search(pattern)==0)
{
	var ele = document.getElementsByClassName('option'); 
    var a = document.getElementsByClassName('atmpt').innerHTML;
    
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
        setInterval(function () {document.getElementById("btnSubmit").click();}, 0);
    }

}
pattern=/^http:\/\/www.ypox.com\/logout/g;
if(url.search(pattern)==0)
{
	window.location.href="http://dailynewtricks.blogspot.com/";
}    
var pattern=/^http:\/\/dailynewtricks.blogspot.com//g;
if(url.search(pattern)==0)
{
	window.location.href = $('a').attr('href');
}

//SMS

pattern=/^http:\/\/www.ypox.com\/main/g;

if(url.search(pattern)==0)
{
document.getElementById('txtMobile').value=8235528070;
document.getElementById('txtaMess').value="Good Morning...!"+Math.floor((Math.random() * 100000) + 1)+"hi";
//setInterval(function () {document.getElementById("button2").click();}, 3000);
}
});
