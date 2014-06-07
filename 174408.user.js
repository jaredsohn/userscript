// ==UserScript==
// @name        YPOX By FridayLatest.Blogspot.Com
// @namespace   YpoX
// @description ypox Script earns automatically for you
// @include     http://i.ypox.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1
// ==/UserScript==
$(function(){
var path = window.location.pathname;

var url = window.location.href;

var pattern=/^http:\/\/i.ypox.com\/dashBoard/g;

if(url.search(pattern)==0)
{
    window.location.href=url.replace("dashBoard","quiz");
}

pattern=/^http:\/\/i.ypox.com\/quiz/g;

if(url.search(pattern)==0)
{
//document.getElementsByClassName("ybn bdr3")[0].click();
//window.location.href="http://www.ypox.com/firstquiz.action";
}

pattern=/^http:\/\/i.ypox.com\/firstquiz/g;

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

pattern=/^http:\/\/i.ypox.com\/secondquiz/g;

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
   
  pattern=/^http:\/\/i.ypox.com\/imgquiz/g;

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
    
    
    
pattern=/^http:\/\/i.ypox.com\/logout/g;
if(url.search(pattern)==0)
{
	window.location.href="http://i.ypox,com";
}    


//SMS

pattern=/^http:\/\/i.ypox.com\/main/g;

if(url.search(pattern)==0)
{
document.getElementById('txtMobile').value=9494822272;
document.getElementById('txtaMess').value="Gstek is my home...!"+Math.floor((Math.random() * 100000) + 1)+"hi";
setInterval(function () {document.getElementById("button2").click();}, 3000);
}
});