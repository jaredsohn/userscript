// ==UserScript==
// @name           Megaupload Helper
// @description    Removes everything except for the captcha box and starts download when timer reaches zero.
// @include        http://*.megaupload.com/*
// @include	   http://megaupload.com/*
// ==/UserScript==
// Version 20090426

(function(){

loc=document.location.href;

// remove everything except for the captcha box
if ((loc.match(/^http:\/\/(www\.)?megaupload\.com\/(?:[a-z]+\/)?\?d=[0-9A-Z]+$/)) && !document.getElementById('downloadlink') ||
    (loc.match(/^http:\/\/(www\.)?megaupload\.com\/(?:[a-z]+\/)?$/) && document.getElementById('imgstr'))){
    if (!document.forms[0]) return;
    fonts=document.getElementsByTagName('font');
    desc=fonts[0];
    for (var i=0;desc.innerHTML!="Filename:"&&i<fonts.length;desc=fonts[i++]);
    desc=desc.parentNode.parentNode.parentNode.parentNode;
    div=document.getElementById('captchaform');
    if (!div) div=document.forms[document.forms.length-1];
    div=div.parentNode.parentNode;
    div.insertBefore(desc,div.firstChild.nextSibling.nextSibling);
    while (document.body.hasChildNodes())
	document.body.removeChild(document.body.firstChild);
    div.removeAttribute('style');
    document.body.appendChild(div);
    document.getElementsByTagName('a')[0].href="javascript:document.getElementById('captchaform').submit()";
    disableCss();
    document.getElementById('captchafield').focus();
    return;
}

// get rid of everything except for the countdown timer
if (loc.match(/^http:\/\/(www\.)?megaupload.com\/(?:[a-z]+\/)?/) && document.getElementById('downloadlink')){
    time=document.body.innerHTML.match(/count=([0-9]+)/)[1];
    fonts=document.getElementsByTagName('font');
    desc=fonts[0];
    for (var i=0;desc.innerHTML!="Filename:"&&i<fonts.length;desc=fonts[i++]);
    desc=desc.parentNode.parentNode.parentNode.parentNode;
    button=document.getElementById('downloadlink');
    button.removeAttribute('style');
    countdown=document.getElementById('countdown');
    document.body.innerHTML="<div id='downloadcounter'></div>";
    disableCss();
    document.body.appendChild(countdown);
    document.body.appendChild(desc);
    document.body.appendChild(button);

    //comment out this line to remove automatic downloads
    setTimeout(clickDownload,(time*1+3)*1000);
    }

    function clickDownload(){
	document.location.href=document.getElementById("downloadlink").firstChild.href;
    }

    function disableCss(){
	for (i=0;i<document.styleSheets.length;i++)
	    document.styleSheets[i].disabled=true;
    }

})();
