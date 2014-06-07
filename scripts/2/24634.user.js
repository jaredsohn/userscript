// ==UserScript==
// @name          Myspace Developer Text Area
// @description	  Increases developer text area
// @include		  http://developer.myspace.com/*
// ==/UserScript==




try
{
	document.getElementById('ctl00_MainContentPlaceHolder_panelHome_tbRawText').style.height = "800px";
}
catch(err)
{}

try
{
	document.getElementById('ctl00_MainContentPlaceHolder_panelProfile_tbRawText').style.height = "800px";
}
catch(err)
{}


try
{
	document.getElementById('ctl00_MainContentPlaceHolder_panelCanvas_tbRawText').style.height = "800px";
}
catch(err)
{}


