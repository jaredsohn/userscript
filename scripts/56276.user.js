// ==UserScript==
// @name           RapidShare & HotFile dl manager
// @description    Click on free button and redirect your download when the time pass (RS & HotFile)
// @namespace      LocalHost
// @include        http://rapidshare.com/files/*
// @include        http://*.rapidshare.com/files/*
// @include        http://hotfile.com/dl/*
// ==/UserScript==

var sleepTime,i;
var waitError={
"3":5,  //minutes to wait if the ip is already downloading (in minutes)
"4":2,  //No free slots for country (in minutes)
"5":2,  //No free slots for free users (in minutes)
"-1":4}; //Unknown error (in minutes)

window.addEventListener('load', function()
{
var host=new Array()
host.push("rapidshare.com");
host.push("hotfile.com");
var index=arraySearch(host, document.location.hostname);
eval('_' + index + '()');

}, false);

function _0()
{
var message,execute=true,f;
var freeB=firstXPathResult('//input[@value="Free user"]');
if(freeB){
freeB.click();
} else { 
f=function(){clearInterval(i);document.location=document.location};
var _ErrorArray=messages=new Array;
var messages=new Array;
_ErrorArray.push("Advanced download settingsDownload");messages.push("Ticket ready");
_ErrorArray.push("seconds remaining");messages.push("DL waiting, ready in: ~");
_ErrorArray.push("Or try again in");messages.push("Limitations, retry in: ");
_ErrorArray.push("Your IP");messages.push("Already Downloading, wait: ");
_ErrorArray.push("no available slots for free users");messages.push("Lack of Slots, retry in: ");
_ErrorArray.push("Currently a lot of users");messages.push("Lack of Slots, retry in: ");
try
{
if(!document.querySelector) error=firstXPathResult("/html/body/center/div[2]/div/p[2]").textContent
else error=document.querySelector("div .klappbox>*:nth-child(2)").textContent;
}catch(e){
document.title='File does not Exist';
return
}
var code=arraySearch(_ErrorArray, error);
switch (code)
{
case 0:
document.title=messages[code];
document.location=$('dl').childNodes[0].action;
clearInterval(i);
execute=false;
break;

case 1:
var zeit=$('zeit');
if (zeit) sleepTime=parseInt(zeit.innerHTML, 10);
sleepTime=sleepTime?sleepTime:0;
f=function(){clearInterval(i);_0()};
break;

case 2:
var ind=error.indexOf('in about ');
sleepTime=parseInt(error.substr(ind+8))*60;
if(sleepTime>0x78) sleepTime-=0x3C; //if minutes are > 2 then subtract 1 minutes from the time.(it is always end faster than it say)
break;

case 3:
case 4:
case 5:
default:
sleepTime=waitError[String(code)]*60;
}
if(execute){
mes=(code>-1)?messages[code]:"Unknown Error: ";
setTimeout(f, sleepTime*1000);
setI(function(){document.title=mes + fixT(sleepTime);--sleepTime}, 1);
}
}
}

function _1() //hotfile.com
{
var freeB=firstXPathResult('//input[@class="disabled" and @type="button"]');
if (freeB){
GM_addStyle('input.disabled {text-decoration: none}');
}else{
var freeB=firstXPathResult('//input[@onclick="starttimer();"]');
};
if(freeB){
//Henry 'Pi' James o Idea
firstXPathResult('//input[@name="tm"]').value='1245072880'; 
firstXPathResult('//input[@name="tmhash"]').value='e5b845119f0055c5d8554ee5f2ffc7b2d5ef86d7';
firstXPathResult('//input[@name="wait"]').value='30';
firstXPathResult('//input[@name="waithash"]').value='3bf07c5d83f2e652ff22eeaee00a6f08d4d2409a';
$('f', true).submit();
} else {
document.location=(firstXPathResult('//a[contains(@href,"/get/")]').href);
}
}

function arraySearch(array, value)
{
for (var i=0;i<array.length;i++) if(value.indexOf(array[i])>-1) return i;
return -1;
}

function fixT(secc)
{
if(secc<0) return;
var h,m,s,hstr='',mstr='',str;
h=parseInt(secc/3600);
m=parseInt((secc % 3600) / 60);
s=secc % 60;
if (h!=0) hstr=h+':';
if (m!=0 || h!=0) mstr=m + ':';
if (m<10 && h!=0) mstr='0'+mstr;
if (s<10 && (m!=0 || h!=0)) s='0'+s; 
return hstr + mstr + s;
}

function setI(func, secconds)
{
i=setInterval(func, secconds*1000);
}

function $(id, name)
{
name = typeof(name) != 'undefined' ? name : false;
if (!name){
return document.getElementById(id);
} else { return document.getElementsByName(id)[0] };
}

function firstXPathResult(xpath, against)
{
against = (typeof against == 'undefined')?document:against;
return document.evaluate(xpath, against, null, 9, null).singleNodeValue;
}