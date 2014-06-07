// ==UserScript==
// @name			Google Finance live gain updater
// @author			Tom McCaffery
// @description		Updates all cells in the portfolio view to reflect live changes to prices. Also places day's gain in title bar for quick reference.
// @license         Creative Commons Attribution License
// @version			1.1
// @released        2009-06-30
// @updated			2009-07-02
// @include			http://www.google.*/finance/portfolio*view*
// @include			http://google.*/finance/portfolio*view*
// @compatible      Greasemonkey
// ==/UserScript==

/* 
 * This file is a Greasemonkey user script. To install it, you need 
 * the Firefox plugin "Greasemonkey" (URL: http://greasemonkey.mozdev.org/)
 * After you installed the extension, restart Firefox and revisit 
 * this script. Now you will see a new menu item "Install User Script"
 * in your tools menu.
 * 
 * To uninstall this script, go to your "Tools" menu and select 
 * "Manage User Scripts", then select this script from the list
 * and click uninstall :-)
 *
 * Creative Commons Attribution License (--> or Public Domain)
 * http://creativecommons.org/licenses/by/2.5/
*/

/*
 * Changelog
 *
 * 1.1 (2009-07-02)
 * 	Added:
 * 		- Non-www domain to @include list
 * 		- License and installation instructions
 *
 * 	Changed:
 *		- Disable script on non-performance portfolios
 *
 * 	Fixed:
 *		- Reporting of stocks with $0 purchase price as "Infinity%" gain
 *		- Reporting of stocks with no shares as "NaN%" gain
 *
 * 	Known Issues:
 *		- If your language isn't English, you will have to change the two
 *		  strings below to match the appropriate labels. I need to implement these
 *		  two features without reading localized labels.
 *		- For that matter, this script isn't internationalized at all (created for US
 * 		  version) but I have no experience with that. Maybe for a future version...
 *
 * 1.0 (2009-06-30)
 * 		- Initial release
 */

(function() {
	var UPDATE_INTERVAL = 3000;

	/* LANGUAGE-SPECIFIC STRINGS
	 * Change these to your language if it isn't English.
	 * TODO: Change the code so it doesn't rely on language-specific labels
	 */
	var STRING_PERFORMANCE = 'Performance';
	var STRING_CASH = 'Cash';
	
	// columns to read initially
	var COLUMNS_READ_INIT = {
		pcol_quantity: {},
		pcol_costbasis: {},
		pcol_mktvalue: {},
		pcol_gainloss: {},
		pcol_todays_gain: {}
	};

	// columns to read each iteration	
	var COLUMNS_READ = {
		pcol_lastprice: {}
	};
	
	// columns to write each iteration
	var COLUMNS_WRITE = {
		pcol_mktvalue: {
			bParens: false,
			bCurrency: true,
			bPercent: false,
			nPrecision: 2
		},
		pcol_gainloss: {
			bParens: true,
			bCurrency: true,
			bPercent: false,
			nPrecision: 2
		},
		pcol_gainlossp: {
			bParens: false,
			bCurrency: false,
			bPercent: true,
			nPrecision: 2
		},
		pcol_todays_gain: {
			bParens: true,
			bCurrency: true,
			bPercent: false,
			nPrecision: 2
		},
		pcol_tr_rate_all: {
			bParens: false,
			bCurrency: false,
			bPercent: true,
			nPrecision: 2
		}
	}
	
	// <span> elements for each stock
	var valueSpans = new Array();
	// <span> elements for cash row
	var cashSpans = new Object();
	// <span> elements for totals row
	var totalsSpans = new Object();
	
	// initial data array for stock rows
	var initialDataRows = new Array();
	// initial data for cash row
	var initialDataCash = new Object();
	// initial data for totals row
	var initialDataTotals = new Object();
	
	if ( isPerformanceView() ) {
		init();
	}
	
	function isPerformanceView() {
		var viewLinksDiv = document.getElementById( 'view-links' );
		var linkCollection = viewLinksDiv.getElementsByTagName( 'a' );
		
		for( var i in linkCollection ) {
			var link = linkCollection[i];
			if ( link.innerHTML == STRING_PERFORMANCE ) {
				return link.getAttribute('class').match( /active\-view/ );
			}
		}
		
		return false;
	}
	
	function init() {
		// get portfolio table
		var table = document.getElementById( 'pview_t' );
			
		// collect all rows for stocks
		var rowCollection = table.getElementsByTagName( 'tr' );
		for ( var i = 1; i < rowCollection.length; i ++ ) {
			var row = rowCollection[i];
			var cells = row.getElementsByTagName( 'td' );
			var name = '';
				
			var data = new Object();
			var spans = new Object();
			
			// loop through all cells in this row
			for( var j = 1; j < cells.length; j++ ) {
				var skipRow = false;
				var cell = cells[j];
				var colName = cell.className;
				
				// name of row
				if ( j == 1 ) {
					name = cell.innerHTML;
				}
				
				// see if we need the data from this cell
				if ( colIsInteresting( colName ) )  {
					var spanCollection = cell.getElementsByTagName( 'span' );
					
					if ( spanCollection.length > 0 ) {						
						// store reference to this span
						var span = spanCollection[0].wrappedJSObject;
						var value = read( span );
						
						// discard if this is a stock with no shares owned
						if ( colName == 'pcol_quantity' && value == 0 ) {
							skipRow = true;
							break;
						} else {
							// store reference to this span
							spans[colName] = span;
							// store numeric data from this span
							if ( COLUMNS_READ_INIT[colName] ) {
								data[colName] = read( span );
							}
						}
					}
				}
				
			}
			
			if ( skipRow ) {
				continue;
			}
			
			if ( name != STRING_CASH ) {
				// deal with regular stock row
				if ( i < rowCollection.length - 1 ) {
					valueSpans.push( spans );
					initialDataRows.push( data );
				} else { // deal with totals row
					totalsSpans = spans;
					initialDataTotals = data;
				}
			} else { // deal with cash row
				cashSpans = spans;
				initialDataCash = data;
			}
		}
	
		update();
		setInterval( update, UPDATE_INTERVAL );
	}
	
	function colIsInteresting( sColName ) {
		// is this a column we're interested in?
		return ( COLUMNS_READ_INIT[sColName] || COLUMNS_READ[sColName] || COLUMNS_WRITE[sColName] );
	}
	
	function read( span ) {
		return cleanValue( span.innerHTML );
	}
	
	function writeSpan( span, value ) {
		if ( span ) {
			span.innerHTML = value;
		}
	}
	
	function cleanValue( value ) {
		// find out if it's negative
		var multiplier = 1;
		if ( value.search( /\(/ ) != -1 )  {
			multiplier = -1;
		}
		
		value = value.replace(/\(/, '' );
		value = value.replace(/\)/, '' );
		value = value.replace(/\%/, '' );
		value = value.replace(/\,/, '' );
		value = value.replace(/\$/, '' );
		value = value * multiplier;
		
		return value;
	}
	
	function formatValue( nValue, bParens, bCurrency, bPercent, nPrecision ) {
		// convert to number
		nValue = Number( nValue );
		
		// display percentages as whole numbers
		if ( bPercent ) {
			nValue = nValue * 100;
		}
		
		// convert to string
		var sValue;
		if ( bParens ) {
			sValue = Math.abs( nValue );
		} else {
			sValue = nValue;
		}
		
		// round precision
		sValue = sValue.toFixed( nPrecision );
		
		// add commas
		sValue = addCommas( sValue );
		
		// add percent sign
		if ( bPercent ) {
			sValue = sValue + '%';
		}
		
		// add dollar sign
		if ( bCurrency ) {
			sValue = '$' + sValue;
		}
		
		// add parentheses to negative numbers
		if ( bParens && nValue < 0 ) {
			sValue = '(' + sValue + ')';
		}
		
		return sValue;
	}
	
	function addCommas( nStr ) {
		nStr += '';
		x = nStr.split( '.' );
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while ( rgx.test( x1 ) ) {
			x1 = x1.replace( rgx, '$1' + ',' + '$2' );
		}
		
		return x1 + x2;
	}
	
	function update() {
		// initialize totals
		var totals = new Object();
		for( var colName in COLUMNS_WRITE ) {
			totals[colName] = 0;
		}
	
		// loop through the rows to read/set new values
		for( var i = 0; i < valueSpans.length; i++ ) {
			var spans = valueSpans[i];
			var initialData = initialDataRows[i];
			var currentData = new Object();
			
			// read each column we're interested in
			for( var colName in COLUMNS_READ ) {
				currentData[colName] = read( spans[colName] );
			}
			
			// calculate new market value
			var mktvalue = currentData.pcol_lastprice * initialData.pcol_quantity;
			currentData.pcol_mktvalue = mktvalue;
			totals.pcol_mktvalue += mktvalue;
			
			// calculate gain/loss
			var difference = currentData.pcol_mktvalue - initialData.pcol_mktvalue;
			currentData.pcol_gainloss = difference + initialData.pcol_gainloss;
			totals.pcol_gainloss += currentData.pcol_gainloss;
			
			// calculate gain/loss percentage
			if ( initialData.pcol_costbasis > 0 ) {
				currentData.pcol_gainlossp = currentData.pcol_gainloss / initialData.pcol_costbasis;
			} else {
				currentData.pcol_gainlossp = 0;
			}
			currentData.pcol_tr_rate_all = currentData.pcol_gainlossp; // it seems overall return is same as gain/loss?
			
			// calculate today's gain
			currentData.pcol_todays_gain = difference + initialData.pcol_todays_gain;
			totals.pcol_todays_gain += currentData.pcol_todays_gain;
			
			// write each column back to page
			for( var colName in COLUMNS_WRITE ) {
				var value = currentData[colName];
				var span =  spans[colName];
				
				if ( span ) {
					writeSpan(
						span,
						formatValue(
							value,
							COLUMNS_WRITE[colName].bParens,
							false,
							COLUMNS_WRITE[colName].bPercent,
							COLUMNS_WRITE[colName].nPrecision
						)
					);
					
					// set class to use gain/loss colors
					span.className = value < 0 ? 'chr' : 'chg';
				}
			}
		}
		
		// add cash to total
		totals.pcol_mktvalue += initialDataCash.pcol_mktvalue;
		
		// calculate total gain %
		if ( initialDataTotals.pcol_costbasis > 0 ) {
			totals.pcol_gainlossp = totals.pcol_gainloss / initialDataTotals.pcol_costbasis;
		} else {
			totals.pcol_gainlossp = 0;
		}
		totals.pcol_tr_rate_all = totals.pcol_gainlossp;
		
		// write totals row
		for( var colName in COLUMNS_WRITE ) {
			if ( totals[colName] && totalsSpans[colName] ) {
				var span = totalsSpans[colName];
				var value = totals[colName];
			
				writeSpan(
					span,
					formatValue(
						value,
						COLUMNS_WRITE[colName].bParens,
						COLUMNS_WRITE[colName].bCurrency,
						COLUMNS_WRITE[colName].bPercent,
						COLUMNS_WRITE[colName].nPrecision
					)
				);

				// set class to use gain/loss colors
				if ( value >= 0 && span.className != 'chg' ) {
					span.className = 'chg';
				} else if ( value < 0  && span.className != 'chr' ) {
					span.className = 'chr';
				}
			}
		}
		
		// set title to today's gain
		document.title = formatValue( totals.pcol_todays_gain, false, true, false, 2 );
	}
})();