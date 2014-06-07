// ==UserScript==
// @name           immoM2Helper
// @author         WbW
// @license        Creative Commons: Namensnennung - Weitergabe unter gleichen Bedingungen 3.0 Deutschland (http://creativecommons.org/licenses/by-sa/3.0/de/)
// @namespace      WbW
// @include        http://*.immobilienscout24.de/*
// @description    Anzeigen des Preises pro m2 hinter dem Gesamtpreis.
// ==/UserScript==

var helper = function() 
{

	//add a console function
	var l = function (msg) 
	{
	    GM_log( "IH: "+msg );
	}
	
	var setValue = function (name, value) 
	{
		window.setTimeout( GM_setValue, 0, name, value );
		l("Stored "+name+" = "+value );
	};
	
	var getValue = function (name, def)
	{
		var v = GM_getValue( name );
		if ( !v )
			v = def;
		return v;
	};

	var unwrap = function (node)
	{
	  return (node && node.wrappedJSObject) ? node.wrappedJSObject : node;
	};

	var mod = function( w )
	{
	
		w = unwrap( w );
		var m2Val = 0;
		var preisVal = 0;
	
		var d = w.document;

		var xp = d.evaluate( 
			"//tbody[tr/td[contains(text(),'Wohnfläche')] and tr/td[contains(text(),'Kaufpreis:')]]"
			, d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );

		if ( xp ) 
		{
	
			var n = unwrap( xp.singleNodeValue );
			if ( n )
			{
				
				var m2 = d.evaluate( "tr/td[contains(text(),'Wohnfläche')]/following::td", n, null
					,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
				
				if ( m2 && m2.singleNodeValue )
				{
					var text = m2.singleNodeValue.innerHTML;
					text = text.replace(".","").replace(",",".");
					m2Val = parseFloat( text );
				}
					
				var preis = d.evaluate( "tr/td[contains(text(),'Kaufpreis:')]/following::td", n, null
					,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
				if ( preis && preis.singleNodeValue )
				{
					var pn = unwrap( preis.singleNodeValue );
					var text = pn.innerHTML.replace(".","").replace(",",".");
					preisVal = parseFloat( text );
					pn.innerHTML = pn.innerHTML + " (" + Math.floor(0.5 + preisVal/m2Val )+" €/m²)";
				}
			}
		}
	}
	
	//access to window object cross-browser
	var uW;
	if (typeof unsafeWindow === 'object'){
		uW = unsafeWindow;
	} else {
		uW = window;
	}
	mod( uW );

}

helper();
