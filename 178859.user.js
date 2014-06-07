// ==UserScript==
// @name       Se7enSins Change Pages With Arrow Key
// @namespace  http://tcorley.me
// @version    0.3
// @description  Lets you go to teh next and previous page using arrow keys
// @match      http://www.se7ensins.com/*
// @copyright  2012+, Fire30
// ==/UserScript==


document.onkeydown = checkKey;

function checkKey(e) {

    if(window.location.href.indexOf('threads') != -1)
    {
    	e = e || window.event;
		//right arrow key
    	if (e.keyCode == '39') {
        	var pageIndex = window.location.href.indexOf("page-");
        	if(pageIndex != -1)
        	{
                var pageNum = window.location.href.split('page-')[1].split('#')[0];                           
            	window.location.href = window.location.href.substring(0,pageIndex) + 'page-' + (++pageNum);
        	}
        	else
        	{
            	window.location.href = window.location.href + 'page-2';
        	}
    	}
        //left arrow key
    	else if (e.keyCode == '37') {
        	var pageIndex = window.location.href.indexOf("page-");
        	if(pageIndex != -1)
        	{
            	var pageNum = window.location.href.split('page-')[1].split('#')[0];     
            	window.location.href = window.location.href.substring(0,pageIndex) + 'page-' + (--pageNum);
        	}
    	}
	}
}
