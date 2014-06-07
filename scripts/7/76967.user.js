// ==UserScript==
// @name           free-share.ru autoclicker [crossbrowser-test]
// @namespace      auto-presser
// @require        http://userscripts.org/scripts/source/74144.user.js
// @include        http://free-share.ru/*
// @version        1.3
// @history        1.3 Должен работать на Опере, не забудьте включить javascript
// @history        1.2 Новый автоапдейтер, только для firefox
// @history        1.1 Обновил скрипт под новую каптчу.
// @history        1.0 Релиз с автоапдейтером (autoupdate only in firefox)
// ==/UserScript==
if(this.opera){document.addEventListener("DOMContentLoaded",function()
{var btn=document.getElementsByClassName('inp4')[0]
var tmr=document.getElementById("w")
var lnk=document.getElementsByClassName("w0")[0]
//var captc=document.getElementsByClassName("noscript-show")[0]
var captc=lnk.innerHTML.match(/\http:\/\/api.recaptcha.net[^\s\"]+[^\" >]*?/g) //backup plan
//var codbl=document.getElementById("recaptcha_response_field") //backup plan

if(captc){
 d0=document.createElement('div');
 d0.setAttribute("style","display:none");
 d0.innerHTML='0';
 setTimeout(function(){alert("Enter Captcha code and press Enter then enter shown code\nВведите Каптчу и нажмите Enter затем введите появившийся код\n")},500);
 btn.parentNode.insertBefore(d0,btn.nextSibling);
 //btn.parentNode.removeChild(btn); //backup plan
}
else if(tmr == null)
{
var searcher=lnk.innerHTML.match(/\http:\/\/f[^\s\"]+[^\" >]*?/g)
if (searcher == null)
 	{
	 btn.click()
	}
	 else
	{
	 window.location = searcher[0]
	}
}
else if(tmr.innerHTML >= tmr.innerHTML)
{
 d1=document.createElement('div');
 d1.setAttribute("style","display:none");
 d1.innerHTML='0';
 btn.parentNode.insertBefore(d1,btn.nextSibling);
var t=tmr.innerHTML + "600";
setTimeout(function(){btn.click()},t);
}},true)}
if(!this.opera){updt();}
var btn=document.getElementsByClassName('inp4')[0]
var tmr=document.getElementById("w")
var lnk=document.getElementsByClassName("w0")[0]
//var captc=document.getElementsByClassName("noscript-show")[0]
var captc=lnk.innerHTML.match(/\http:\/\/api.recaptcha.net[^\s\"]+[^\" >]*?/g) //backup plan
//var codbl=document.getElementById("recaptcha_response_field") //backup plan

if(captc){
 d0=document.createElement('div');
 d0.setAttribute("style","display:none");
 d0.innerHTML='0';
 setTimeout(function(){alert("Enter Captcha code and press Enter then enter shown code\nВведите Каптчу и нажмите Enter затем введите появившийся код\n")},500);
 btn.parentNode.insertBefore(d0,btn.nextSibling);
 //btn.parentNode.removeChild(btn); //backup plan
}
else if(tmr == null)
{
var searcher=lnk.innerHTML.match(/\http:\/\/f[^\s\"]+[^\" >]*?/g)
if (searcher == null)
 	{
	 btn.click()
	}
	 else
	{
	 window.location = searcher[0]
	}
}
else if(tmr.innerHTML >= tmr.innerHTML)
{
 d1=document.createElement('div');
 d1.setAttribute("style","display:none");
 d1.innerHTML='0';
 btn.parentNode.insertBefore(d1,btn.nextSibling);
var t=tmr.innerHTML + "600";
setTimeout(function(){btn.click()},t);
}

//-----------------------------------------------------------------------------
//	AutoUpdater
//-----------------------------------------------------------------------------
function updt()
{
   try {
      ScriptUpdater.forceCheck(76967);
   }
   catch(e) {
   }
   ;
}
function ntc()
{
  try {
	ScriptUpdater.forceNotice(76967);
       }
  catch(e) { };
}
GM_registerMenuCommand("Проверить скрипт на наличие обновлений", updt);
GM_registerMenuCommand("Показать историю обновлений скрипта", ntc);
//-----------------------------------------------------------------------------
//	End AutoUpdater
//-----------------------------------------------------------------------------