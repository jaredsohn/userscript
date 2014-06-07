// ==UserScript==
// @name       说吧自动骚扰脚本0.2
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      https://www.10086china.com/*
// @copyright  2012+, You
//自动骚扰
// ==/UserScript==
window.onload=function()
{
    
    setInterval(function()
                {
                    var autosaorao=document.getElementById('callbtn');
                    autosaorao.click();
                },60000);
    
    setInterval(function()
                {
                    var guaduan=document.getElementById('hangup');
                    guaduan.click();
                },60000);
    
}// JavaScript Document
