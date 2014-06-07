// ==UserScript==
// @name			CopyEntryId
// @description	    fix for entry id copy bug in Opera
// @author		    dreamscape
// @version		    0.1
// @include		    http://www.eksisozluk.com/*
// @include		    http://eksisozluk.com/*
// @include		    http://sozluk.sourtimes.org/*
// @include		    http://sourtimes.org/*
// @include		    http://www.sourtimes.org/*
// @include		    http://84.44.114.44/*
// ==/UserScript==

if ( location.hostname.indexOf( 'sozluk.sourtimes.org' ) !== -1 || location.hostname.indexOf( 'eksisozluk.com' ) !== -1 )
	window.opera.defineMagicFunction( 'copyid', function copyid ( realFunc, thisRef, id, f )
	{
		var c = G( 'cidtxt' );
		var u = "http://sozluk.sourtimes.org/show.asp?id=" + id;
		var s = '#' + id;
		var p = s + ' numaralı entry\'nin adresi';
		if ( !c )
		{
			prompt( p, u );
			return;
		}
		if ( document.selection && navigator.userAgent.toLowerCase().indexOf( "opera" ) == -1 )
		{
			c.innerText = u;
			var ct = c.createTextRange();
			ct.execCommand( "Copy" );
		}
		else
			prompt( p, u );
	} );