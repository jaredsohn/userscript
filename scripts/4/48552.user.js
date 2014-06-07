// ==UserScript==
// @name           dAmnMyMessages!
// @namespace      da.feanathiel.damnmymessages
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

/**
 * Note that this is an temporary fix. This fix uses plain
 * html as data and therefore it will generate ~3MB bandwidth
 * every 24 hours (6kb per page, refreshing every 5 minutes).
 */

var script = document.createElement( 'script' );
script.appendChild( document.createTextNode( ( <r> <![CDATA[

	if( ! window.Feanathiel )
		Feanathiel = {};
		
	if( ! window.Feanathiel.instances )
		Feanathiel.instances = {};
	
	Feanathiel.dAmnMyMessages = function( )
	{
		this.enable( );
	}
	
	Feanathiel.Cookies = {
		get : function( name )
		{
			var cookies = document.cookie.split( /; / );
		
			for( var i = 0; i < cookies.length; i++ )
			{
				var d = cookies[ i ].split( /=/ );

				if( d[ 0 ] == name )
					return unescape( d[ 1 ] );
			}
			return null;
		},
		
		set : function( name, value )
		{
			var date = new Date();
			date.setTime( date.getTime( ) + 365 * 24 * 60 * 60 * 1000 ); // A year

			document.cookie = name + "=" + escape( value ) + "; expires=" +  date.toGMTString( ) + "; path=/; domain=deviantart.com";
		},
		
		remove : function( name )
		{
			if( Feanathiel.Cookies.get( name ) )
				document.cookie = name + "=; path=/; domain=deviantart.com; expires=Thu, 01-Jan-70 00:00:01 GMT";
		}
	}
	
	Feanathiel.dAmnMyMessages.prototype = {
		initialize : function( )
		{
			/* Default Configuration */
	
			this.url = 'http://chat.deviantart.com/chat/feanathiel'; // Some page without much content, this one is about 6k for each load
			this.interval = 1000 * 60 * 5; // 5 Minutes interval for each refresh
			this.element = '#rockdock-message-count'; // Element that contains the actual information that needs refreshing
			
			/* Cookie Configuration */
		
			var interval = Feanathiel.Cookies.get( 'Feanathiel.dAmnMyMessages.interval' );
			if( interval != null )
			{
				interval = parseInt( interval );
		
				if( ! isNaN( interval ) && interval >= 300000 ) // 5 Minutes
					this.interval = interval;
			}
			
			/* To check if isn't bugging... */

			if( this.interval < 1000 * 60 * 5 )
				this.interval = 1000 * 60 * 5;
		},
	
		update : function( target )
		{
			// dA uses jQuery, so why don't we take advantage of it..?
			
			if( typeof( $j ) == 'undefined' ) // if it's loaded that is...
				return;

			if( target == undefined )
				target = this;
			
			var element = target.element;
			var requestUrl = target.url;
			
			$j.ajax({
				url: requestUrl,
				dataType: 'text', // We don't need to execute html/js here, so 'text' will be enough for what we need
				success: function( data )
				{
					var html = $j( data ).find( element ).html( );
					$j( element ).html( html );		
				}
			});
		},
		
		enable : function( )
		{
			this.disable( );
			
			this.initialize( );
			
			// Start
			this.timer = setInterval( this.update, this.interval, this );
		},
		
		disable : function( )
		{
			if( this.timer != undefined )
				clearInterval( this.timer );
		},
		
		configure : function( interval )
		{
			var interval = window.prompt( "Welcome to dAmnMyMessages.\n\nYou've chosen to change the update interval.\nPlease enter the new interval in minutes. (min. 5)" );
			if( interval != null )
			{
				interval = parseInt( interval );
		
				if( ! isNaN( interval ) && interval >= 5 ) // 5 Minutes
				{
					this.disable( ); // To be really sure its off
					Feanathiel.Cookies.set( 'Feanathiel.dAmnMyMessages.interval', 1000 * 60 * interval );
					this.enable( );
				}
				else
					alert( "The value you've entered is incorrect." );
			}
		}
	};

	Feanathiel.instances.damnmymessages = new Feanathiel.dAmnMyMessages( );

]]> </r> ).toString( ) ) );
document.getElementsByTagName( 'head' )[ 0 ].appendChild( script );