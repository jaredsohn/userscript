// ==UserScript==
// @name           hide plus elements from gmail
// @namespace      jamespgilbert
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/mail/*
// ==/UserScript==
setInterval(doStuff, 100);

function doStuff()
{
	if(document.getElementById("gbgs1"))
	{
		// gbgs1 - notification
		document.getElementById("gbgs1").style.display="none";
		//gbgs3 - share button
		document.getElementById("gbgs3").style.display="none";
	}
}