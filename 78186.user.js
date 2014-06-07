// ==UserScript==
// @name ABGX.net NFO Reader
// @namespace [173166]-[ABGXnfoReader]-v1.0.0
// @description View NFO files on ABGX.net, and direct download of the NFO file
// @include http*://*.ABGX.net/*
// @include http*://ABGX.net/*
// @Website http://www.AyoobAli.com
// @UserScripts http://UserScripts.org/users/AyoobAli
// @license Free
// @version 1.0.0
// ==/UserScript==
    
    //======[Sittings]======\\
    //======[if you want to view the popup as Image, Change ViewMode to 'image']
    //======[if you want to view the popup as Text, Change ViewMode to ''text']
    var ViewMode = 'image';   //===['image' Or 'text']
    var NfoFontSize = '10';   //===[px] 
    var NFOtoDWN = '1';   //===[1 = Enable,, 2 = Disable] 
    //======[Sittings]======\\
    
    //===============[You don't have to change anything below this line]
    
    //===[This will Change all the URL's of the NFO pages to the download URL]===\\
    if (NFOtoDWN == '1'){
        var MyLinks = document.body;
        MyLinks.innerHTML = MyLinks.innerHTML.replace(/http:\/\/ludibria.com\/nfo.php/gi,'http:\/\/ludibria.com\/dwn.php');
        MyLinks.innerHTML = MyLinks.innerHTML.replace(/http:\/\/www.ludibria.com\/nfo.php/gi,'http:\/\/www.ludibria.com\/dwn.php');
    }

function fetch(e)
{ 
    var ReqURL = this.href;
    if (ViewMode == 'text') 
    {
        ReqURL = ReqURL.replace(/nfo.php/gi,'dwn.php');
    } else {
        ReqURL = ReqURL.replace(/dwn.php/gi,'nfo.php');
    }
	reset();
    show(popupWindow);
	var page = GM_xmlhttpRequest({url:ReqURL,method:'GET',onload: function(page) { retrieve(page); }});
	e.preventDefault();
}

function retrieve(page)
{
    
    var HTMLtext = page.responseText;


    if (ViewMode == 'text') 
    {
        var MyHTMLtext = '<pre>' + HTMLtext + '</pre>';
        
    } else {
        
        var SPtemp=HTMLtext.split("<img src=\"png.php?");
        var SPtext=SPtemp[1].split("\"");
        if (SPtext[0].trim() == '') {SPtext[0] = '';}
        var MyHTMLtext = "<img src=\"http://www.ludibria.com/png.php?" + SPtext[0] + "\">";
    }

    	if (MyHTMLtext)
	{
		hide(get('#Loading'));
		show(get('#ConText'));
        get('#ConText').innerHTML = '' + MyHTMLtext + '';
		center();
        
	}
	else get('#Loading').innerHTML = 'No Data found';
    
}

GM_addStyle('.ppwin {'
		+ 'display: none;'
		+ 'position: fixed;'
        + 'font-family: Terminal;'
        + 'font-size: ' + NfoFontSize + 'px;'
        + 'color: #000000;'
		+ 'background: white;'
		+ 'border: 1px black groove;'
		+ 'max-width: ' + parseInt(window.innerWidth-50) + 'px; }'

	+ ' .ppwin #ConText {'
		+ 'background-color: white;'
		+ 'overflow-y: scroll;'
        + 'font-family: Terminal;'
        + 'font-size: ' + NfoFontSize + 'px;'
        + 'color: #000000;'
		+ 'max-height: ' + parseInt(document.body.clientHeight-50) + 'px;'
		+ 'padding: 5px 5px 5px 5px; }'

	+ ' .ppwin #Titlebar { cursor: pointer; font-size: 9px; font-family: Terminal; text-align: right; background-color: #808080; color: #ffffff; }'	
	+ ' .ppwin #close { cursor: pointer; font-size: 9px; font-family: Terminal; color: #000000; }'
	+ ' .ppwin #close:hover { color: #333333 }'
);

function center()
{
    popupWindow.style.left = '0px';
	popupWindow.style.top = '0px';
}

function reset()
{
	get('#Loading').innerHTML = 'Loading...';
	get('#ConText').innerHTML = '';
	hide(get('#ConText'));
	show(get('#Loading'));
	center();
}

function get(exp) { return popupWindow.querySelector(exp); }
function show(element) { element.style.display = 'block'; }
function hide(element) { element.style.display = 'none'; }

var popupWindow = document.createElement('div');
popupWindow.className = 'ppwin';
popupWindow.innerHTML = '<div id="Titlebar"><a id="close">X</a>&nbsp;</div><div id="Loading"></div><div id="ConText"></div>';
document.body.appendChild(popupWindow);
reset();

var InfoType = '';
var InfoURL = '';
var MyTar = '';
var MyTar = document.evaluate('.//a[starts-with(@href,"http://www.ludibria.com/nfo.php?") or starts-with(@href,"http://www.ludibria.com/dwn.php?") or starts-with(@href,"http://ludibria.com/nfo.php?") or starts-with(@href,"http://ludibria.com/dwn.php?")]',document.body,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null), x;
while (x=MyTar.iterateNext()) {
	x.addEventListener('mouseover',fetch,false);
    
    //If you want to Auto hide the popup window just remove "//" from the beginning of the below line
   	//x.addEventListener('mouseout', function() { hide(popupWindow); }, false);
}

get('#close').addEventListener('click', function() { hide(popupWindow); }, false);
get('#Titlebar').addEventListener('click', function() { hide(popupWindow); }, false);
//document.addEventListener('click',function() { hide(popupWindow); },false);