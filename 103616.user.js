// Make the details box bigger on Google Tasks
// version 1.0
// 2011-05-26
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Bigger Gtasks Details Window
// @include https://mail.google.com/tasks/*
// ==/UserScript==

window.setTimeout(function() { runThis() }, 1000);

function runThis()
{
	var iframes = document.getElementsByTagName('iframe');
	for (var i = 0; i < iframes.length; i++)
	{
	  var innerDoc = iframes[i].contentDocument || iframes[i].contentWindow.document;
	  var tbs = innerDoc.getElementsByTagName('textarea');
 	  for (var j = 0; j < tbs.length; j++)
	  {
	     if (tbs[j].rows == 5)
	     	tbs[j].rows = 30;
	  }
	}
}
