// ==UserScript==
// @name           HotmailShowCCBCC
// @namespace      http://googatrix.googlepages.com
// @include        *.mail.live.com/*
// ==/UserScript==

if( document.getElementById( "Cc" ) && document.getElementById( "Bcc" ) && document.getElementById( "showCcBcc" ) )
{
	// show the CC and BCC boxes
	document.getElementById( "Cc" ).style.display = "block";
	document.getElementById( "Bcc" ).style.display = "block";
	// hide the "Show CC and BCC" link
	document.getElementById( "showCcBcc" ).style.display = "none";
	// populate BCC value
	//document.getElementById( "AutoCompleteBcc$InputBox" ).value = "your.email@goes.here";
}
