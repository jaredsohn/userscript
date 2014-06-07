// ==UserScript==
// @name           Megaupload Helper
// @description    Removes everything except for the captcha box and starts download when timer reaches zero.
// @include        http://*.megaupload.com/*
// @include	   http://megaupload.com/*
// ==/UserScript==
// Version 20080831

(function(){

loc=document.location.href;

// remove everything except for the captcha box
if ((loc.match(/^http:\/\/(www\.)?megaupload\.com\/(?:[a-z]+\/)?\?d=[0-9A-Z]+$/)) ||
    (loc.match(/^http:\/\/(www\.)?megaupload\.com\/(?:[a-z]+\/)?$/) && document.getElementById('imgstr'))){
    if (!document.forms[0]) return;
    html=document.forms[0].parentNode.parentNode.innerHTML;
    document.body.innerHTML=html;
    disableCss();
    document.getElementById('imgstr').focus();
    return;
}

// get rid of everything except for the countdown timer
if (loc.match(/^http:\/\/(www\.)?megaupload.com\/(?:[a-z]+\/)?$/)){
    if (!document.body.innerHTML.match(/onclick="loadingdownload\(\);">/)) return;
    time=document.body.innerHTML.match(/[0-9]=([0-9]+)/)[1];
    descriptor_divs=document.getElementById('bluebg').getElementsByTagName('div');
    name=descriptor_divs[0].innerHTML;
    size=descriptor_divs[1].innerHTML;
    description=descriptor_divs[2].innerHTML;
    document.body.innerHTML='<div align="center"><div id="downloadhtml"></div><div id="dlbutton"></div><br><div>'+name+'<br>'+size+'<br>'+description+'</div><div id="dlcounter">xxx</div><div id="dlcounterimg"></div></div>';
    disableCss();

    //comment out this line to remove automatic downloads
    setTimeout(clickDownload,(time*1+3)*1000);
}

    function clickDownload(){
	document.location.href=document.getElementById("dlbutton").firstChild.href;
    }

    function disableCss(){
	for (i=0;i<document.styleSheets.length;i++)
	    document.styleSheets[i].disabled=true;
    }

})();
