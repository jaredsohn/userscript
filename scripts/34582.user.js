// ==UserScript==
// @name                Rapidshare Helper
// @description Removes absolutely everything except for the captcha box from rapidshare.de and rapidshare.com pages, starts download automatically when timer runs out.
// @include       http://rapidshare.com/*
// @include       http://rapidshare.de/*
// @include       http://*.rapidshare.com/*
// @include       http://*.rapidshare.de/*
// ==/UserScript==
// Version 20080829

(function (){

timer=0;

// click on the "free" button
if (free=document.getElementById('ff')) {
    free.submit();
    return
}
else if ((free=document.getElementsByName('dl.start'))&&free[1]) {
    free[1].click();
    return;
}

//download page
if (document.location.href.match(/^http:\/\/([a-z0-9]+\.)?rapidshare\.((com)|(de))\//))
{
    slowimage=false;
    //no timer (whee!)
    if (document.getElementsByName("dl")[0]) {
        dlform=document.getElementsByName("dl");
        dldiv=document.createElement('div');
        dldiv.appendChild(dlform[0]);
        timer=0;
    }
    //with timer
    else if (document.getElementById("dl")&&!document.body.innerHTML.match(/innerHTML = unescape/)) {
	code=document.body.innerHTML.match(/var tt = .<(?:.|\n)+ = tt;/m);
	if (!code || !code[0])
	    code=document.body.innerHTML.match(/document.getElementById\("dl"\)\.innerHTML = .<h2(?:.|\n)+<\/form>.;/m);
	else
	    slowimage=true;
	if (!code || !code[0]) return;
	eval(code[0]);
	dldiv=document.getElementById("dl");
        timer=document.body.innerHTML.match(/var c ?= ?([0-9]+);/);
        if (!timer || !timer[1])
            { GM_log("can't determine timer value"); return;}
        timer=timer[1]*1;
    }
    //rapidshare.de timer and unescape code
    else if (document.body.innerHTML.match("innerHTML = unescape")) {
        code=document.body.innerHTML.match(/innerHTML = unescape\(\'(.+?)\'\)\}/);
        if (!code || !code[1]) {
            GM_log("cannot find javascript unescape code");
            return;
        }
        dldiv=document.createElement('div');
        dldiv.innerHTML=unescape(code[1]);
        timer=document.body.innerHTML.match(/<script>var c ?= ?([0-9]+);/);
        if (!timer || !timer[1])
            { GM_log("can't determine timer value"); return;}
        timer=timer[1]*1;
    }
    //non-escaped javascript code
    else if (document.body.innerHTML.match(/'<form name="dl"'/)) {
        code=document.body.innerHTML.match(/'<form name="dl"(?:.|\n)*?<\/form>'/m);
        if (!code || !code[0]) {
            GM_log("cannot find download form code");
            return;
        }
        dldiv=document.createElement('div');
        dldiv.innerHTML=eval(code[0]);
        timer=document.body.innerHTML.match(/<script>var c ?= ?([0-9]+);/);
        if (!timer || !timer[1])
            { GM_log("can't determine timer value"); return;}
        timer=timer[1]*1;
    }
    else return;

requested=document.body.innerHTML.match(/<p>You have requested (the file )?((<font )|(<b>)).+?<\/p>/);
if (!requested || !requested[0]) {
    if ((p_snapshot=document.evaluate('//p[@class="downloadlink"]',document,null,7,null)).snapshotLength)
	requested=p_snapshot.snapshotItem(0).innerHTML;
    else
	requested="unknown";
}
else
    requested=requested[0];

html="<center><font color='#ffffff'><font size='+5'><div id='countdowntimer'>"+timer+"</div></font><br>"+requested+"<br>"+'\n'+dldiv.innerHTML +
    //create dynamic link for download managers
    "<br><p onclick='a=document.getElementById(\"dlmlink\"); c=document.forms[0].accesscode; if (!c) c=document.forms[0].captcha; a.href=document.forms[0].action+\"?\"+(c?((document.forms[0].accesscode?\"accesscode=\":\"captcha=\")+c.value):\"\")+(document.forms[0].actionstring?(\"&actionstring=\"+document.forms[0].actionstring.value):(\"\")); a.innerHTML=a.href; void(0);'>Create download manager link</p><br><a id='dlmlink' href='javascript:void(0);'></a>"
+ "</font></center>";
document.body.innerHTML=html;

document.body.style.background='#000000';
box=document.getElementsByName('accesscode');
if (!box[0]) box=document.getElementsByName('captcha');
if (box&&box[0]) {
    if (slowimage==true){
	warning=document.createElement('div');
	warning.innerHTML='wait for captcha image';
	warning.id='waitwarning';
	document.getElementsByTagName('img')[0].parentNode.appendChild(warning);
    }
    box[0].focus();
    box[0].scrollIntoView();
}
if (timer>1)
    setTimeout(countdown,1000);
//comment out this line if you do not want download to start immediately when there is no timer
else startDownload();
}

function countdown()
{
    timerdiv=document.getElementById('countdowntimer');
    timerdiv.innerHTML=timer;
    if (timer==0) {
	startDownload();
	return;
    }
    timer--;
    setTimeout(countdown,1000);
}

function startDownload() {
    box=document.getElementsByName('accesscode');
    if (!box || !box[0])
	box=document.getElementsByName('captcha');
    if (box&&box[0]&&box[0].value==''&&slowimage==true) {
	captchaimage=document.getElementsByTagName('img')[0];
	captchaimage.src=captchaimage.src;
	document.getElementById('waitwarning').innerHTML='';
	alert('Captcha ready!');
	return;
    }
    if (!document.getElementById('dlmlink').href.match(/^javascript/)) {
	alert('Download link ready!');
	return;
    }
    else if (!box[0] || (box && box[0] && box[0].value!='')) {
	document.forms[0].submit();
	return;
    }
}

})();
