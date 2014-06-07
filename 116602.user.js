// ==UserScript==
// @name           Battlelog Autojoin
// @namespace      TurtleHax
// @version        r2 Beta
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

var CurID;
var CurName;
var MaxPlayers;

//	Compatibility

if (typeof unsafeWindow == 'undefined' || unsafeWindow == window) // I'm sorry this is so hacky, but it's required for Chrome. I got most of this snipped from https://gist.github.com/1143845
{
	unsafeWindow = (function() {
		var el = document.createElement('p');
		el.setAttribute('onclick', 'return window;');
		return el.onclick();
	}())
}

//	Utility Functions

function stripHTML( HTML ) {
	return HTML.replace('<', '&lt;').replace( '>', '&gt;' );
}

function changeStatus( State ) {
	var Status = document.getElementsByClassName('gamemanager-launchstate-gameready')[0];
	Status.innerHTML = State;
}

function joinServer() {
	stopAutoJoin();
	unsafeWindow.joinflow.joinServerByUrl( '/bf3/servers/show/'+CurID+'/', null, function(){} );
}

function retrieveServerData( Obj ) {
	if ( !Obj ) { return; }

	CurID = Obj.guid;
	CurName = Obj.name;
	MaxPlayers = Obj.maxPlayers;

	if ( !CurID || !CurName || !MaxPlayers ) {
		alert('ERROR Retrieving server info!');
		return;
	}
}

//	Auto Joiner

function checkPlayerCount()
{
	if ( !IsRunning ) { return; }
	if ( this.readyState !== 4 || this.status !== 200 ) { return; }
	
	var Parsed = JSON.parse( this.responseText );
	var curPlayers = Parsed.players + Parsed.queued;
	
	if ( curPlayers >= MaxPlayers ) {
		Joining = false;
		setTimeout( requestInfo, Delay );
		return;
	}
	if ( Joining ) {
		Joining = false;
		joinServer();
	}
	else {
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

var OldFunc = unsafeWindow.joinflow._joinServer

unsafeWindow.joinflow._joinServer = function(server, friendPersonaId)
{
	console.log( 'joinflow._joinServer request! ( '+server+', '+friendPersonaId+')' )
	retrieveServerData( server );
	OldFunc(server, friendPersonaId)
	console.log( server )
}

//	UI & Toggle

function startAutoJoin() {
	IsRunning = true;

	requestInfo();
	
	document.getElementById('autojoin').checked = true;
	changeStatus( StatusInfo.replace( '%SERVER%', stripHTML( CurName ) ) );
}

function stopAutoJoin() {
	IsRunning = false;
	Joining = false;

	document.getElementById('autojoin').checked = false;
}

function toggleAutoJoin() {
	if ( IsRunning ) {
		stopAutoJoin();
		changeStatus( 'Stopped Autojoin!' );
	}
	else {
		startAutoJoin();
	}
}


function debug() {
alert( 'Name: ' + CurName + '\nGUID: ' + CurID + '\nMax Players: '+ MaxPlayers );
}
GM_registerMenuCommand( 'Debug Script', debug )
//	Be advised, Messy code starts here :c

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