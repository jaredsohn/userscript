// ==UserScript==
// @name        YPOX Auto Quiz script(Earning-deisre)
// @namespace   YPOX script by (earning-desire)
// @description ypox Script earns automatically for you, it plays all 3 quiz.
// @include     http://i.ypox.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1.0
// ==/UserScript==
//***** FOR MORE ONLINE EARNING TIPS AND TRICKS at (Earning-desire.blogspot.in)  *****//
$(function(){
var path = window.location.pathname;

var url = window.location.href;

var pattern=/^http:\/\/i.ypox.com\/dashBoard/g;

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
    alert("Happy ..!! Your Todays Ypox Work is done..! ");
    window.location.href="http://earning-desire.blogspot.in/";
}    


//SMS

pattern=/^http:\/\/i.ypox.com\/main/g;

if(url.search(pattern)==0)
{
    for(var k=0;k<50;k++)
    {
document.getElementById('txtMobile').value=8401613336; // you can change number(optional)
document.getElementById('txtaMess').value="I AM USING ypox by (earning-desire.blogspot.com)"+Math.floor((Math.random() * 100000) + 1)+"hi";
setInterval(function () {document.getElementById("button2").click();}, 3000);
    }
}
   
pattern=/^http:\/\/i.ypox.com\/sendConfirm/g;
if(url.search(pattern)==0)
{
	 alert("Happy ..!! Your Todays Ypox Work is done..! ");
    window.location.href="http://earning-desire.blogspot.com/";
} 
    
});