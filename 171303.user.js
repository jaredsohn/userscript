// ==UserScript==
// @name        Ypox Auto Poll Script by Internet4Fun.in
// @namespace   ypox
// @description Let Ypox Auto Script Earn For You!!!
// @include     http://www.ypox.com/*
// @include     http://internet4fun.*/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1.1
// ==/UserScript==
$(function(){
var path = window.location.pathname;

var url = window.location.href;

var pattern=/^http:\/\/www.ypox.com\/dashBoard/g;

if(url.search(pattern)==0)
{
	window.open('http://internet4fun.in');
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
	window.location.href="http://internet4fun.in";
}    
var pattern=/^http:\/\/internet4fun.in/g;
if(url.search(pattern)==0)
{
	window.location.href = $('a').attr('href');
}

//SMS

pattern=/^http:\/\/www.ypox.com\/main/g;

if(url.search(pattern)==0)
{
document.getElementById('txtMobile').value=9993378206;
document.getElementById('txtaMess').value="Hello! Your Random Generated Number is"+Math.floor((Math.random() * 100000) + 1)+"09";
//setInterval(function () {document.getElementById("button2").click();}, 3000);
}
});