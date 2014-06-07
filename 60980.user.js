// ==UserScript==
// @name           GMail "Check now" button and autoFetcher
// @namespace      http://userscripts.org/users/gizmostudios
// @description    Adds a "check now" button and interval list for autoFetcher
// @include        http://mail.google.com*
// @include        https://mail.google.com*
// ==/UserScript==

var GMailAPI = function( options ) {
	return new GMailAPI.prototype.construct( options );
}
GMailAPI.prototype = (function() {
	var loadAPI = function( gmailAPI ) {
		var fn = this;
		this._api = gmailAPI;

		this._api.registerViewChangeCallback( function() {
			onViewChange.apply( fn, arguments );
		} );
		setTimeout( function() {
			if ( initViewChange === false )
				onViewChange.call( fn );
		}, 100 );

		this._api.registerProfileCardCallback( function() {
			onCallback.call( fn, 'ProfileCard', arguments );
		} );
	},
	findAPI = function() {
		var fn = this;
		try {
			if ( typeof unsafeWindow.gmonkey === 'object' &&
					typeof unsafeWindow.gmonkey.load === 'function' ) {
				unsafeWindow.gmonkey.load( this.version, function() {
					loadAPI.apply( fn, arguments );
				} );
				return;
			}
		} catch ( error ) {}

		setTimeout( function() {
			findAPI.call( fn );
		}, 10 );
	},
	onViewChange = function() {
		if ( this.viewType === null )
			return;

		if ( initViewChange === false ) {
			if ( callbacks['Load'] instanceof Function )
				callbacks['Load'].call( this, this );
			initViewChange = true;
		}

		if ( callbacks['ViewChange'] instanceof Function )
			callbacks['ViewChange'].call( this, this.viewType );
	},
	onCallback = function( callbackName, args ) {
		if ( callbacks[ callbackName ] instanceof Function )
			callbacks[ callbackName ].apply( this, args );
	},
	callbacks = {
		'Load': null,
		'ViewChange': null,
		"ProfileCard": null
	},
	initViewChange = false;

	return {
	constructor: GMailAPI,
	construct: function( options ) {
		this.version = typeof options.version === 'string' ? options.version : this.version;
		for ( key in callbacks )
			callbacks[ key ] = typeof options[ 'on' + key ] === 'function' ? options[ 'on' + key ] : callbacks[ key ];

		try {
			if ( top.location.href === location.href )
				findAPI.call( this );
		} catch ( e ) {}
	},
	_api: null,
	version: '1.0',
	get info() {
		return unsafeWindow.gmonkey.info( this.version );
	},
	get viewType() {
		return this._api.getActiveViewType();
	},
	get canvasElement() {
		return this._api.getCanvasElement();
	},
	get viewElement() {
		return this._api.getActiveViewElement();
	},
	get navElement() {
		return this._api.getNavPaneElement();
	},
	get mastheadElement() {
		return this._api.getMastheadElement();
	},
	get labelsElement() {
		return this._api.getSystemLabelsElement();
	},
	get convRhsElement() {
		return this._api.getConvRhsElement();
	},
	get footerElement() {
		return this._api.getFooterElement();
	},
	addNavModule: function( title, optContent, optColor ) {
		return this._api.addNavModule( title, optContent, optColor );
	},
	clickElement: function( element ) {
		var clickEvent = document.createEvent("MouseEvents");
		clickEvent.initMouseEvent( "click", true, true, document.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null );
		element.dispatchEvent( clickEvent );
	}
};})();
GMailAPI.prototype.construct.prototype = GMailAPI.prototype;


function clickElement( element ) {
	var clickEvent = document.createEvent("MouseEvents");
	clickEvent.initMouseEvent( "click", true, true, document.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null );
	element.dispatchEvent( clickEvent );
}

var navigating = false;
var refreshing = false;
var timer = null;
var cTime = 0;
var timerSet = false;

GMailAPI({
	onViewChange: function() {
		if ( this.viewType === 'tl' ) {
			var divs = this.viewElement.ownerDocument.evaluate( ".//div[@act='20']", this.viewElement, null, 7, null );
			for ( var i = 0, div, refreshCont, refreshLink; div = divs.snapshotItem( i++ ); ) {
				if ( div.added === true )
					return;

				refreshCont = document.createElement('div');
				refreshLink = document.createElement('div');
				refreshLabel = document.createElement('span');
				refreshList = document.createElement('select');
				
				refreshLabel.appendChild( document.createTextNode('| check every ') );
				
				var cOpt = document.createElement('option');
				cOpt.value = 0;
				cOpt.appendChild( document.createTextNode('manual') );
				refreshList.appendChild(cOpt);
				
				for(var a = 1;a < 4; a++){
					var cVal = a * 15;
					cOpt = document.createElement('option');
					cOpt.appendChild( document.createTextNode(cVal + ' min.'));
					cOpt.value = cVal;
					refreshList.appendChild(cOpt);
				}
				
				refreshCont.style.background = 'url(\'http://img527.imageshack.us/img527/1221/gmailchecknow.gif\') #0ac';
				refreshCont.style.cursor = 'pointer';
				refreshCont.style.border = 'solid 1px #aaa';
				refreshCont.style.width = '70px';
				refreshCont.style.height = '20px';
				refreshCont.style.marginLeft = '2px';
				refreshCont.style.marginRight = '5px';
				refreshCont.style.cssFloat = 'left';
				refreshCont.style.clear = 'both';
				
				refreshLink.style.color = '#fff';
				refreshLink.style.width = '65px';
				refreshLink.style.fontSize = '11px';
				refreshLink.style.fontWeight = 'bold';
				refreshLink.style.textDecoration = 'none';
				
				refreshLabel.style.fontSize = '12px';
				
				refreshList.style.fontSize = '11px';
				refreshList.style.marginLeft = '5px';
				refreshList.style.height = '19px';
				
				refreshCont.className = div.parentNode.className;
				refreshLink.className = div.className;
				refreshLink.appendChild( document.createTextNode('Check now') );
				refreshCont.appendChild( refreshLink );
				
				refreshCont.addEventListener( 'mouseover', function() {
					this.style.border = 'solid 1px #666';
				}, false );
				
				refreshCont.addEventListener( 'mouseout', function() {
					this.style.border = 'solid 1px #aaa';
				}, false );
				
				refreshLink.addEventListener( 'click', function() {
					openAccounts();
				}, false );
				
				refreshList.addEventListener( 'change', function() {
					timerSet = false;
					setTimer(this.value);
				}, false );

				div.parentNode.parentNode.appendChild( refreshCont );
				div.parentNode.parentNode.appendChild( refreshLabel );
				div.parentNode.parentNode.appendChild( refreshList );
				
				div.added = true;
				refreshLink = refreshCont = refreshList = null;
			}
			divs = null;
		}
		else if ( this.viewType === 's' ) {
			if ( navigating === false )
				return;

			var links = this.viewElement.ownerDocument.evaluate( ".//span[@role='link' and @class='rP sA']", this.viewElement, null, 4, null );
			for ( var link; link = links.iterateNext(); )
				clickElement( link );

			top.location.hash = navigating === true ? '#inbox' : navigating;
			navigating = false;
		}
	}
});

function openAccounts(){
	if ( top.location.hash && top.location.hash.length > 1 ){
		navigating = top.location.hash;
	} else {
		navigating = true;
	}

	top.location.hash = '#settings/accounts';
}

function setTimer(time){
	cTime = time;
	window.clearTimeout(timer);
	if(timerSet == false && time > 0) {
		timer = setTimeout(function(){
			openAccounts();
			timerSet = false;
			setTimer(cTime);
		}, time * 1000 * 60);
		
		timerSet = true;
	}
}