// ==UserScript==
// @name           GM-Developer
// @namespace      GMD
// @description    A collection of commands for developing GM extensions [UNFINISHED]
// @include        http://*
// ==/UserScript==
// @Author         Francis Stokes
// @Version        0.2


GM_registerMenuCommand('GM-D: Hide Images', HideImages);       
       
GM_registerMenuCommand('GM-D: Show Images', ShowImages);

GM_registerMenuCommand('GM-D: No. of x tags', ShowNoOfXTags);

GM_registerMenuCommand('GM-D: Outline Divs', DisplayDivOutlines);

GM_registerMenuCommand('GM-D: Hide Outlined Divs', HideDivOutlines);

GM_registerMenuCommand('GM-D: Validate HTML', ValidateHTML);

GM_registerMenuCommand('GM-D: Validate CSS', ValidateCSS);

GM_registerMenuCommand('GM-D: Display Cookie Info', DisplayCookie);



function HideImages(e)
{
	try
	{
		var allimg = document.getElementsByTagName('img');
		for (var i = 0; i < allimg.length; i++)
		{
			allimg[i].style.display = 'none';
		}
	}
	catch (ex) 
	{
		alert(ex);
	}
}

function ShowImages(e)
{
	try
	{
		var allimg = document.getElementsByTagName('img');
		for (var i = 0; i < allimg.length; i++)
		{
			allimg[i].style.display = 'block';
		}
	}
	catch (ex) 
	{
		alert(ex);
	}
}

function ShowNoOfXTags(e)
{
	var tagname = prompt('Tag Name...');
	var noofx = document.getElementsByTagName(tagname).length;
	alert('There are ' + noofx + ' ' + tagname + ' tags');
}

function DisplayDivOutlines(e)
{
	try 
	{
		var divs = document.getElementsByTagName('div');
		for (var i = 0; i < divs.length; i++)
		{
			divs[i].style.border = '1px solid black';
		}
	}
	catch (ex) 
	{
		alert(ex);
	}
}

function HideDivOutlines(e)
{
	try 
	{
		var divs = document.getElementsByTagName('div');
		for (var i = 0; i < divs.length; i++)
		{
			divs[i].style.border = '0px none black';
		}
	}
	catch (ex) 
	{
		alert(ex);
	}
} 

function ValidateHTML(e)
{
	GM_openInTab("http://validator.w3.org/check?uri=" + document.location.toString())
}

function ValidateCSS(e)
{
	GM_openInTab("http://jigsaw.w3.org/css-validator/validator?profile=css21&warning=0&uri=" + document.location.toString())
}

function DisplayCookie(e)
{
	alert("Cookie Information for " + document.location.toString() + ":\n\n" + document.cookie.toString());
}