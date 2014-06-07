// ==UserScript==
// @run-at		document-start
// @nocompat
// @name		AGO Module: Empire View Production
// @description	AntiGameOrigin Module: Show how much resources will be produced until self defined Date in Empire View
// @version		1.2.0
// @author		Eleria
// @include		http://*.ogame.*/game/index.php?*page=empire*
// @grant		GM_log
// @grant		GM_getResourceURL
// ==/UserScript==

( function() {
	var isGM											= ( typeof GM_getResourceURL === 'function' );
	var Data;
	
	window.addEventListener( 'ago_modules', dispatchMessages, false );
	
	function dispatchMessages( e ) {
		var result, mode, type, data;

		try												{ result = JSON.parse( e.detail || '{}' ); }
		catch( e )										{ result = {}; }
		
		mode											= result.mode || '';
		type											= result.type || '';

		if ( mode === 'Init' ) {
			Data										= result.data;
			Init();
		}
		else if ( mode === 'Page' ) {
			if ( type === 'Ready' )				{ Ready(); }
		}
	}
	
	
	
	function Init() {
		var styleNode, register;
		
		// Inser CSS styles
		styleNode										= document.createElement( 'style' );
		styleNode.media									= 'screen';
		styleNode.type									= 'text/css';
		styleNode.textContent							= Styles();
		document.head.appendChild( styleNode );
		
		// Register module to enable sending messages and submitting complete data objects
		register										= {													// 0 off   1 on
			modeMovement								: 0,												// Submit complete data object with all values ( not available yet )
			modeGalaxy									: 0,												// Submit complete data object with all values ( not available yet )
			modeMessages								: 0,												// Submit complete data object with all values ( not available yet )
			modeEvents									: 0,												// Submit complete data object with all values
			modePhalanx									: 0,												// Submit complete data object with all values
			modeTimer									: 0,												// Timer each second
		};

		// register.Option										= {}											// Display / store own option settings in AGO menu
	
		message( 'Init', 'Register', register );
	}
	

	// Called from jQuery.ready()
	// OGame finished all dynamic changes on the page
	// AGO does update the display here ( changing buttons, showing time or other values .... )
	function Ready() {
		var mainNode, tableNode, rowNode, cellNode, textNode, inputNode;
		
		//log('AGO_Module - Ready ' + Data.page );
		
		var ressNode = document.getElementById( 'planet0' ).childNodes[ 4 ];
		var actualMetal = +(ressNode.childNodes[ 0 ].innerHTML.replace( /\./g, '' )) || 0;
		var actualCrystal = +(ressNode.childNodes[ 1 ].innerHTML.replace( /\./g, '' )) || 0;
		var actualDeuterium = +(ressNode.childNodes[ 2 ].innerHTML.replace( /\./g, '' )) || 0;
		
		var prodNode = document.getElementById( 'planet0' ).childNodes[ 10 ];
		var prodMetal = +((/.*>(\d+)<\/td>.*>(\d+)<\/td>.*>(\d+)<\/td>.*/.exec( prodNode.childNodes[ 0 ].title.replace( /\./g, '' ) ))[ 1 ]) || 0;
		var prodCrystal = +((/.*>(\d+)<\/td>.*>(\d+)<\/td>.*>(\d+)<\/td>.*/.exec( prodNode.childNodes[ 1 ].title.replace( /\./g, '' ) ))[ 1 ]) || 0;
		var prodDeuterium = +((/.*>(\d+)<\/td>.*>(\d+)<\/td>.*>(\d+)<\/td>.*/.exec( prodNode.childNodes[ 2 ].title.replace( /\./g, '' ) ))[ 1 ]) || 0;
		
		var actualDate = new Date(Data.Acc.timestamp * 1000);
		actualDate.setMilliseconds(0);
		
		mainNode = document.createElement( 'div' );
		document.getElementsByTagName( 'body' )[ 0 ].appendChild( mainNode );
		mainNode.id = 'empireViewModulProduction';
		
		tableNode = document.createElement( 'table' );
		mainNode.appendChild( tableNode );
		
		rowNode = document.createElement( 'tr' );
		tableNode.appendChild( rowNode );
			cellNode = document.createElement( 'th' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( formatDate(actualDate) );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'th' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( 'metal' );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'th' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( 'crystal' );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'th' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( 'deuterium' );
				cellNode.appendChild( textNode );
					
		rowNode = document.createElement( 'tr' );
		tableNode.appendChild( rowNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( 'available' );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( formatNumber(actualMetal) );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( formatNumber(actualCrystal) );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( formatNumber(actualDeuterium) );
				cellNode.appendChild( textNode );
		
		rowNode = document.createElement( 'tr' );
		tableNode.appendChild( rowNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( 'production (hour)' );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( formatNumber(prodMetal) );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( formatNumber(prodCrystal) );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( formatNumber(prodDeuterium) );
				cellNode.appendChild( textNode );
		
		rowNode = document.createElement( 'tr' );
		tableNode.appendChild( rowNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( 'production (day)' );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( formatNumber(prodMetal * 24) );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( formatNumber(prodCrystal * 24) );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( formatNumber(prodDeuterium * 24) );
				cellNode.appendChild( textNode );
				
		rowNode = document.createElement( 'tr' );
		tableNode.appendChild( rowNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( 'production (week)' );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( formatNumber(prodMetal * 24 * 7) );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( formatNumber(prodCrystal * 24 * 7) );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( formatNumber(prodDeuterium * 24 * 7) );
				cellNode.appendChild( textNode );

		
		rowNode = document.createElement( 'tr' );
		tableNode.appendChild( rowNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( 'production (month)' );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( formatNumber(prodMetal * 24 * 30) );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( formatNumber(prodCrystal * 24 * 30) );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( formatNumber(prodDeuterium * 24 * 30) );
				cellNode.appendChild( textNode );
		
		rowNode = document.createElement( 'tr' );
		tableNode.appendChild( rowNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( 'production (year)' );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( formatNumber(prodMetal * 24 * 365) );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( formatNumber(prodCrystal * 24 * 365) );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( formatNumber(prodDeuterium * 24 * 365) );
				cellNode.appendChild( textNode );
		
		tableNode = document.createElement( 'table' );
		mainNode.appendChild( tableNode );
		tableNode.style.marginTop = '20px';
		
		rowNode = document.createElement( 'tr' );
		tableNode.appendChild( rowNode );
			cellNode = document.createElement( 'th' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( 'day' );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'th' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( 'month' );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'th' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( 'year' );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'th' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( 'hour' );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'th' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( 'minute' );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'th' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( 'second' );
				cellNode.appendChild( textNode );
		
		rowNode = document.createElement( 'tr' );
		tableNode.appendChild( rowNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				inputNode = document.createElement( 'input' );
				cellNode.appendChild( inputNode );
				inputNode.type = 'text';
				inputNode.value = actualDate.getDate();
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				inputNode = document.createElement( 'input' );
				cellNode.appendChild( inputNode );
				inputNode.type = 'text';
				inputNode.value = (actualDate.getMonth()+1);
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				inputNode = document.createElement( 'input' );
				cellNode.appendChild( inputNode );
				inputNode.type = 'text';
				inputNode.value = actualDate.getFullYear();
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				inputNode = document.createElement( 'input' );
				cellNode.appendChild( inputNode );
				inputNode.type = 'text';
				inputNode.value = actualDate.getHours();
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				inputNode = document.createElement( 'input' );
				cellNode.appendChild( inputNode );
				inputNode.type = 'text';
				inputNode.value = actualDate.getMinutes();
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				inputNode = document.createElement( 'input' );
				cellNode.appendChild( inputNode );
				inputNode.type = 'text';
				inputNode.value = actualDate.getSeconds();
		
		rowNode = document.createElement( 'tr' );
		tableNode.appendChild( rowNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				inputNode = document.createElement( 'input' );
				cellNode.appendChild( inputNode );
				inputNode.type = 'button';
				inputNode.value = 'reset';
				inputNode.onclick = function(){ 
					var messageNode = document.getElementById( 'empireViewModulProductionMessage' );
					if ( messageNode ) {
						document.getElementsByTagName( 'body' )[0].removeChild( messageNode );
					}
				
					var targetDate = actualDate;
					var diffSeconds = Math.ceil((targetDate.getTime() - actualDate.getTime()) / 1000);
					var addMetal = Math.ceil( prodMetal / 3600 * diffSeconds );
					var addCrystal = Math.ceil( prodCrystal / 3600 * diffSeconds );
					var addDeuterium = Math.ceil( prodDeuterium / 3600 * diffSeconds );
					var targetMetal = actualMetal + addMetal;
					var targetCrystal = actualCrystal + addCrystal;
					var targetDeuterium = actualDeuterium + addDeuterium;
					
					mainNode.childNodes[ 2 ].childNodes[ 0 ].firstChild.innerHTML = formatDate(targetDate);
					mainNode.childNodes[ 1 ].childNodes[ 1 ].childNodes[ 0 ].firstChild.value = targetDate.getDate();
					mainNode.childNodes[ 1 ].childNodes[ 1 ].childNodes[ 1 ].firstChild.value = targetDate.getMonth();
					mainNode.childNodes[ 1 ].childNodes[ 1 ].childNodes[ 2 ].firstChild.value = targetDate.getFullYear();
					mainNode.childNodes[ 1 ].childNodes[ 1 ].childNodes[ 3 ].firstChild.value = targetDate.getHours();
					mainNode.childNodes[ 1 ].childNodes[ 1 ].childNodes[ 4 ].firstChild.value = targetDate.getMinutes();
					mainNode.childNodes[ 1 ].childNodes[ 1 ].childNodes[ 5 ].firstChild.value = targetDate.getSeconds();
					mainNode.childNodes[ 2 ].childNodes[ 1 ].childNodes[ 1 ].innerHTML = formatNumber(addMetal);
					mainNode.childNodes[ 2 ].childNodes[ 1 ].childNodes[ 2 ].innerHTML = formatNumber(addCrystal);
					mainNode.childNodes[ 2 ].childNodes[ 1 ].childNodes[ 3 ].innerHTML = formatNumber(addDeuterium);
					mainNode.childNodes[ 2 ].childNodes[ 2 ].childNodes[ 1 ].innerHTML = formatNumber(targetMetal);
					mainNode.childNodes[ 2 ].childNodes[ 2 ].childNodes[ 2 ].innerHTML = formatNumber(targetCrystal);
					mainNode.childNodes[ 2 ].childNodes[ 2 ].childNodes[ 3 ].innerHTML = formatNumber(targetDeuterium);
				};
			cellNode.colSpan = '3';
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				inputNode = document.createElement( 'input' );
				cellNode.appendChild( inputNode );
				inputNode.type = 'button';
				inputNode.value = 'calculate';
				inputNode.onclick = function(){ 
					var messageNode = document.getElementById( 'empireViewModulProductionMessage' );
					if ( messageNode ) {
						document.getElementsByTagName( 'body' )[0].removeChild( messageNode );
					}
				
					var targetDate = new Date( 
							+mainNode.childNodes[ 1 ].childNodes[ 1 ].childNodes[ 2 ].firstChild.value || 0,
							(+mainNode.childNodes[ 1 ].childNodes[ 1 ].childNodes[ 1 ].firstChild.value || 1)-1,
							+mainNode.childNodes[ 1 ].childNodes[ 1 ].childNodes[ 0 ].firstChild.value || 0,
							+mainNode.childNodes[ 1 ].childNodes[ 1 ].childNodes[ 3 ].firstChild.value || 0,
							+mainNode.childNodes[ 1 ].childNodes[ 1 ].childNodes[ 4 ].firstChild.value || 0,
							+mainNode.childNodes[ 1 ].childNodes[ 1 ].childNodes[ 5 ].firstChild.value || 0,
							0
						);
					if ( targetDate >= actualDate ) {
						var diffSeconds = Math.ceil((targetDate.getTime() - actualDate.getTime()) / 1000);
						var addMetal = Math.ceil( prodMetal / 3600 * diffSeconds );
						var addCrystal = Math.ceil( prodCrystal / 3600 * diffSeconds );
						var addDeuterium = Math.ceil( prodDeuterium / 3600 * diffSeconds );
						var targetMetal = actualMetal + addMetal;
						var targetCrystal = actualCrystal + addCrystal;
						var targetDeuterium = actualDeuterium + addDeuterium;
						
						mainNode.childNodes[ 2 ].childNodes[ 0 ].firstChild.innerHTML = formatDate(targetDate);
						mainNode.childNodes[ 2 ].childNodes[ 1 ].childNodes[ 1 ].innerHTML = formatNumber(addMetal);
						mainNode.childNodes[ 2 ].childNodes[ 1 ].childNodes[ 2 ].innerHTML = formatNumber(addCrystal);
						mainNode.childNodes[ 2 ].childNodes[ 1 ].childNodes[ 3 ].innerHTML = formatNumber(addDeuterium);
						mainNode.childNodes[ 2 ].childNodes[ 2 ].childNodes[ 1 ].innerHTML = formatNumber(targetMetal);
						mainNode.childNodes[ 2 ].childNodes[ 2 ].childNodes[ 2 ].innerHTML = formatNumber(targetCrystal);
						mainNode.childNodes[ 2 ].childNodes[ 2 ].childNodes[ 3 ].innerHTML = formatNumber(targetDeuterium);
					} else {
						messageNode = document.createElement( 'div' );
						messageNode.id = 'empireViewModulProductionMessage';
						textNode = document.createTextNode( 'Target date have to be after/equal actual date!' );
						messageNode.appendChild( textNode );
						document.getElementsByTagName( 'body' )[0].insertBefore( messageNode, mainNode );
					}
				};
			cellNode.colSpan = '3';
		
		tableNode = document.createElement( 'table' );
		mainNode.appendChild( tableNode );
		tableNode.style.marginTop = '20px';
		
		rowNode = document.createElement( 'tr' );
		tableNode.appendChild( rowNode );
			cellNode = document.createElement( 'th' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( formatDate(actualDate) );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'th' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( 'metal' );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'th' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( 'crystal' );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'th' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( 'deuterium' );
				cellNode.appendChild( textNode );
		
		rowNode = document.createElement( 'tr' );
		tableNode.appendChild( rowNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( 'additional' );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( '0' );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( '0' );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( '0' );
				cellNode.appendChild( textNode );
		
		rowNode = document.createElement( 'tr' );
		tableNode.appendChild( rowNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( 'available' );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( formatNumber(actualMetal) );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( formatNumber(actualCrystal) );
				cellNode.appendChild( textNode );
			cellNode = document.createElement( 'td' );
			rowNode.appendChild( cellNode );
				textNode = document.createTextNode( formatNumber(actualDeuterium) );
				cellNode.appendChild( textNode );
	}
	
	function formatNumber(value) {
		var parts = /([+-]*)([\d]+)([\.,\d]*)/.exec((value) ? value.toString() : '');
		value = parts[2].split('').reverse().join('').match(/.{1,3}/g).join('.').split('').reverse().join('');
		return parts[1] + value + parts[3];
	}
	
	function formatDate(value) {
		return (value.getDate() < 10 ? '0' + value.getDate() : value.getDate())
			+ '.' + ((value.getMonth()+1) < 10 ? '0' + (value.getMonth()+1) : (value.getMonth()+1))
			+ '.' + value.getFullYear()
			+ ' ' + (value.getHours() < 10 ? '0' + value.getHours() : value.getHours())
			+ ':' + (value.getMinutes() < 10 ? '0' + value.getMinutes() : value.getMinutes())
			+ ':' + (value.getSeconds() < 10 ? '0' + value.getSeconds() : value.getSeconds());
	}
	
	// Use native CSS Syntax !
	function Styles() {
		var style;
		var page;

		style = function(){/*
		
			#mainWrapper {
				padding-bottom: 20px;
			}
			
			#empireViewModulProductionMessage {
				margin: 0 auto 20px auto;
				font-size: 1.4em;
				color: orange;
				font-weight: bold;
				width: 600px;
				text-align: center;
			}
				
			#empireViewModulProduction {
				width: 600px;
				margin: 0 auto 50px auto;
				border: 1px solid white;
			}
			
			#empireViewModulProduction table {
				width: 100%;
			}
			
			#empireViewModulProduction table tr > * {
				padding: 1px 3px;
			}
			
			#empireViewModulProduction table:not(:nth-of-type(2)) th:not(:first-of-type) {
				font-size: 1.2em;
				font-weight: bold;
			}
			
			#empireViewModulProduction table:not(:nth-of-type(2)) td:first-of-type {
				font-weight: bold;
			}
			
			#empireViewModulProduction table:not(:nth-of-type(2)) td:not(:first-of-type) {
				text-align: right;
			}
			
			#empireViewModulProduction table:nth-of-type(2) th {
				font-size: 1.2em;
				font-weight: bold;
			}
			
			#empireViewModulProduction table:nth-of-type(2) td {
				text-align: center;
			}
			
			#empireViewModulProduction table:nth-of-type(2) input[type="text"] {
				width: 80%;
			}
			
			#empireViewModulProduction table:nth-of-type(2) input[type="button"] {
				width: 80%;
				  background-color: #B3C3CB;
				  border-color: #668599 #668599 #D3D9DE;
				  border-image: none;
				  border-radius: 3px 3px 3px 3px;
				  border-style: solid;
				  border-width: 1px;
				  box-shadow: 0 1px 3px 0 #454F54;
				  color: #000000;
				  font-size: 12px;
				  height: 25px;
				  line-height: 25px;
				  padding: 2px 5px;
			}

		*/}.toString().slice(14,-3);
		
		return style;
	}
	
	
	
	function message( mode, type, data ) {
		
		window.dispatchEvent( new CustomEvent( 'ago_modules_send', { detail:  JSON.stringify( { mode: mode || '', type: type || '', data: data || '' } ) } ) );
	}
	
	
	function log( text ) {
		
		if ( isGM )										{ GM_log( text ); }
		else if ( 'console' in window )					{ window.console.log( text ); }
	}
	
	
	
}() );