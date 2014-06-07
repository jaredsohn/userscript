// ==UserScript==
// @name           Battlelog Autojoin
// @namespace      TurtleHax
// @description    Adds an autojoin button to battlelog
// @include        http://battlelog.battlefield.com/bf3/*
// @include        battlelog.battlefield.com/bf3/*
// @match          http://battlelog.battlefield.com/bf3/*
// ==/UserScript==

var Delay = 1500; // Change this if you must!

var StatusInfo = 'You will join <span style="color: lime;">%SERVER%</span> when it is available.';
var Server = 'http://battlelog.battlefield.com/bf3/servers/getNumPlayersOnServer/';

var IsRunning = false;

var Joining;
var CurURL;
var CurID;

// Utility Functions

var Grease = (typeof unsafeWindow !== 'undefined' && unsafeWindow !== window);

function retrieveCurID() {
	return document.getElementById('serverguide-show-joinserver-form').getAttribute('guid');
}

function retrieveMaxPlayers() {
	return document.getElementById('selected-server-info').childNodes[1].textContent.match(/\/ (\d+) Players/)[1];
}

function retrieveServerURL() {
	return document.getElementById('serverguide-show-joinserver-form').getAttribute('action');
}

function retrieveServerName() {
	return document.getElementById('selected-server-name').textContent;
}

function stripHTML( HTML ) {
	return HTML.replace('<', '&lt;').replace( '>', '&gt;' );
}

function retrieveServerData() {
	CurURL = retrieveServerURL();
	CurID = retrieveCurID();
	
	if ( !CurID || !CurURL ) { alert('ERROR Retrieving server info!'); return false; }
	
	return true;
}

// Actions

function changeStatus( State ) {
	var Status = document.getElementsByClassName('gamemanager-launchstate-gameready')[0];
	Status.innerHTML = State;
}

function joinServer() {
	if ( Grease ) {
		unsafeWindow.joinflow.joinServerByUrl(CurURL, null, function(){} );
		alert('Server has a slot open!');
	}
	else {
		location.assign( 'javascript:joinflow.joinServerByUrl( "'+CurURL+'", null, function(){} );' ); // Chrome obviously doesn't like the unsafeWindow. (perhaps I should just do it like this for GM too?)
	}
	
	stopAutoJoin();
}

// Autojoiner

function checkPlayerCount()
{
	if ( !IsRunning ) { return; }
	if ( this.readyState !== 4 || this.status !== 200 ) { return; }
	
	var Parsed = JSON.parse( this.responseText );
	var curPlayers = Parsed.players + Parsed.queued;
	
	if ( curPlayers >= retrieveMaxPlayers() )
	{
		Joining = false;
		setTimeout( requestInfo, Delay );
		return;
	}
	if ( Joining )
	{
		Joining = false;
		joinServer();
	}
	else
	{
		Joining = true;
		requestInfo();
	}
}

function requestInfo()
{
	if ( !CurID ) { return; }
	if ( !IsRunning ) { return; }
	
	var Ajax = new XMLHttpRequest();

	Ajax.onreadystatechange = checkPlayerCount;

	Ajax.open( 'GET', Server+CurID+'/', true );
	Ajax.send();
}

// UI & Toggle

function startAutoJoin()
{
	if ( !retrieveServerData() ) { return; }
	
	IsRunning = true;
	
	requestInfo();
	
	document.getElementById('autojoin').checked = true;
	changeStatus( StatusInfo.replace( '%SERVER%', stripHTML( retrieveServerName() ) ) );
}

function stopAutoJoin()
{
	IsRunning = false;
	document.getElementById('autojoin').checked = false;
}

function toggleAutoJoin()
{
	if ( IsRunning )
	{
		stopAutoJoin();
		changeStatus( 'Stopped Autojoin!' );
	}
	else
	{
		startAutoJoin();
	}
}

// Messsy code starts here :c

function createAutoJoinUI()
{
	var Area = document.getElementsByClassName('gamemanager-launchstate')[0];
	if ( !Area ) { return; }
	if( document.getElementById('autojoin') ) { return; }
	
	// Create the UI
	var Button = document.createElement( 'div' );
	Button.setAttribute( 'class', 'comcenter-notification-title' );
	Button.innerHTML = '<input id="autojoin" type="checkbox"/><label for="autojoin">Auto Join When Slot Opens</label>';
	
	document.getElementsByClassName('gamemanager-currentstate')[0].insertBefore( Button, Area );
	
	// Verify it's in correctly, then add the callback.
	
	var Toggle = document.getElementById('autojoin');
	if ( !Toggle ) { alert('Error! Couldn\'t create Autojoin UI.'); return; }
	
	Toggle.checked = IsRunning;
	Toggle.addEventListener( 'click', toggleAutoJoin, false );
}

function AddListener() {
	document.getElementById('comcenter-gamecontrol').addEventListener( 'DOMNodeInserted', createAutoJoinUI, false );
}
window.addEventListener( 'load', AddListener, false );