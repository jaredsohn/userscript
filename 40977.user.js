// ==UserScript==
// @name           Online Banking no-timeout
// @namespace      http://www.palswim.net/misc/scripts
// @description    A timer-reset routine so your online banking session doesn't time out
// @include        *.bankofamerica.com/*
// @include        *.chase.com/*
// @include        *.fidelity.com/*
// @include        *.wamu.com/*
// @include        *.ibsnetaccess.com/*
// @include        *.mbnanetaccess.com/
// @include        *.schwab.com/*
// @include        *.accountonline.com/*
// @include        *.yodlee.com/*
// @include        *.ed.gov/*
// ==/UserScript==


function ResetTimer(){
	if( !unsafeWindow ){ return; }

	if( unsafeWindow.callToServerResetTimer )
		ResetTimerBofA()
	else if( unsafeWindow.SessionRefresh )
		ResetTimerChase();
	else if( unsafeWindow.restartTime && unsafeWindow.RenewSessionService )
		ResetTimerYodlee();
	else if( unsafeWindow.rePopulateDashboard )
		var trash = 0; // Yodlee frame - Do Nothing
	else if( unsafeWindow.env_HelpHost )
		ResetTimerRefresh( 600 ); // Fidelity
	else if( unsafeWindow.sessionTimeoutRenew )
		ResetTimerWaMu();
	else if( unsafeWindow.oTimer )
		ResetTimerDOE();
	else if( unsafeWindow.windowopen )
		ResetTimerRefresh( 400 ); // FIA Card Services
	else if( unsafeWindow.ckfrMenuDefaultWidth )
		ResetTimerRefresh( 400 ); // MNBA Billpay
	else if( unsafeWindow.CheckRestrictedStock )
		ResetTimerRefresh( 600 ); // Charles Schwab
	else // Any other site
		setTimeout( ResetTimerRefresh, 60000, 600 );
		// Delay the timer so it doesn't interfere with simple redirection pages
}

function DoNothing(){ return true; }

window.addEventListener( "load", function(e){ ResetTimer(); }, false);

// Bank of America keepalive
function ResetTimerBofA()
{
	clearTimeout( unsafeWindow.timerID );
	clearTimeout( unsafeWindow.timerWarnID );
	unsafeWindow.callToServerResetTimer();
	setTimeout( ResetTimerBofA, 400000 );
	clearTimeout( unsafeWindow.timerID );
	clearTimeout( unsafeWindow.timerWarnID );
}

// Chase Bank keepalive
function ResetTimerChase()
{
	// Redirect the warning function to the refresh function
	unsafeWindow.sessionWarningWindow = new Object();
	unsafeWindow.sessionWarningWindow.close = DoNothing;
	unsafeWindow.sessionWarningWindow.focus = DoNothing;
	unsafeWindow.FireWarning = unsafeWindow.SessionRefresh;
	unsafeWindow.SessionRefresh();
}

// Keepalive by just refreshing the page
function ResetTimerRefresh( sTimeout )
{
	var msTimeout = sTimeout * 1000;
	var req = new Object();
	req.method = "GET";
	req.url = window.location.href;
	GM_xmlhttpRequest( req );
	setTimeout( ResetTimerRefresh, msTimeout, sTimeout );
}

// Washington Mutual keepalive
function ResetTimerWaMu()
{
	unsafeWindow.sessionWillExpire = WamuTest;
	unsafeWindow.initSessionTimer();
}

function WamuTest()
{
	// Call unsafeWindow.sessionTimeoutRenew with arguments
	GM_log( "Callee: " + arguments.callee );
	if( arguments.callee )
		GM_log( "Caller: " + arguments.callee.caller );
	GM_log( "Arguments: " + arguments.length );
//	unsafeWindow.sessionTimeoutRenew.call( arguments );
}

function ResetTimerYodlee()
{
	unsafeWindow.renewSession();
	var rTime = ( unsafeWindow.WARN_PERIOD - 1 )*1000*60;
	setTimeout( ResetTimerYodlee, rTime );
}

function ResetTimerDOE()
{
	unsafeWindow.clearInterval( unsafeWindow.oTimer );
	setTimeout( ResetTimerRefresh, 500000, 500 );
}
