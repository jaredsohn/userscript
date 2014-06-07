// ==UserScript==
// @name        faasty Script By compad on 11-9-13
// @namespace  
// @include     http://www.faasty.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     1.65.7.3
// ==/UserScript==
$(function()
{

var url=window.location.href;

var pattern=/^http:\/\/www.faasty.com\/vote.php/g;

if(url.search(pattern)==0)
{
	document.getElementById('OptionId_4').checked=true;
	document.form1.submit();
}

pattern=/^http:\/\/www.faasty.com\/voteResult.php/g;
if(url.search(pattern)==0)
{
    	var tt = Math.floor((Math.random() * 2000) + 1);
        setTimeout("window.location.href = 'http://www.faasty.com/vote.php?qxci=NA==&zxcoiesesscd=';",tt);
}

pattern=/^http:\/\/www.faasty.com\/voteCompletion.php/g;
if(url.search(pattern)==0)
{
        setTimeout("window.location.href = 'http://www.adarshspatel.in';",200);
}


});