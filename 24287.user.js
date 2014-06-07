// ==UserScript==
// @name		Rapidshare Helper
// @description	Removes absolutely everything except for the captcha box from rapidshare.de and rapidshare.com pages, starts download automatically when timer runs out.
// @include       http://rapidshare.com/*
// @include       http://rapidshare.de/*
// @include       http://*.rapidshare.com/*
// @include       http://*.rapidshare.de/*
// ==/UserScript==
// Version 20080323

(function (){

timer=100;

// click on the "free" button
if (document.getElementsByName('dl.start')[1]) {
    document.getElementsByName('dl.start')[1].click();
    return;
}

//download page
if (document.location.href.match(/^http:\/\/([a-z0-9]+\.)?rapidshare\.((com)|(de))\//))
{

    //timer and unescape code
    if (document.body.innerHTML.match("innerHTML = unescape")) {
	code=document.body.innerHTML.match(/innerHTML = unescape\(\'(.+?)\'\)\}/);
	if (!code || !code[1])
	    {
		alert("can't find javascript unescape code");
		return;
	    }
	dldiv=document.createElement('div');
	dldiv.innerHTML=unescape(code[1]);
	timer=document.body.innerHTML.match(/<script>var c ?= ?([0-9]+);/);
	if (!timer || !timer[1])
	    { alert("can't determine timer value"); return;}
	timer=timer[1]*1;
    }
    //no timer (whee!)
    else if (document.getElementsByName("dl")[0]) {
	dlform=document.getElementsByName("dl");
	dldiv=document.createElement('div');
	dldiv.appendChild(dlform[0]);
	timer=0;
    }
    else return;

requested=document.body.innerHTML.match(/<p>You have requested (the file )?((<font )|(<b>)).+?<\/p>/);
if (!requested || !requested[0])
    requested="unknown";
else
    requested=requested[0];
html="<center><font color='#ffffff'><font size='+5'><div id='countdowntimer'>"+timer+"</div></font><br>"+requested+"<br>"+'\n'+dldiv.innerHTML+"</font></center>";
document.body.innerHTML=html;
document.body.style.background='#000000';
box=document.getElementsByName('accesscode');
if (!box[0]) box=document.getElementsByName('captcha');
if (box[0]) {
    box[0].focus();
    box[0].scrollIntoView();
}
if (timer>0)
    setTimeout(countdown,1000);
}

function countdown()
{
    timerdiv=document.getElementById('countdowntimer');
    timerdiv.innerHTML=timer;
    if (timer==0)
	{
	    box=document.getElementsByName('accesscode');
	    if (!box || !box[0])
		box=document.getElementsByName('captcha');
	    if (box && box[0] && box[0].value!='')
		{
		    document.forms[0].submit();
		    return;
		}
	}
    timer--;
    setTimeout(countdown,1000);
}

})();
