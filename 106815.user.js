// ==UserScript==
// @name					Alliance Resource Table Sorter
// @namespace			http://userscripts.org/users/106815
// @author				salomone
// @description		Alliance Resource Table Sorter
// @include				http://s*.ikariam.*/*view=embassyHomeSecretaryMembers*
// @exclude				http://board.ikariam.*/*
// @exclude				http://s*.ikariam.*/*oldView=embassyHomeSecretaryMembers*
// @require				http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @require				http://autobahn.tablesorter.com/jquery.tablesorter.min.js
// @version				v.98.2
// @history				v.98.2	Release date: 2011.07.17
// @history				v.98.2	Fixed odd-even background coloring
// @history				v.98.2	Added sorting direction icons
// @history				v.98.2	Added repetitive table headers after every 20th line
// @history				v.98.2	Added exclude lines
// @history				v.98.1	Release date: 2011.07.14
// @history				v.98.1	Added namespace
// @history				v.98		Release date: 2011.07.14
// @history				v.98		Initial upload
// ==/UserScript==

/*
*******************************************************************************************
*** Third party codes:																																	***
*** jQuery (http://jquery.com/)																													***
*** Tablesorter jQuery plugin (http://tablesorter.com/docs/), written by Christian Bach ***
*******************************************************************************************
*/

GM_addStyle("table.tablesorter .odd { background-color: #FDF7DD; }");	
GM_addStyle("table.tablesorter .even { background-color: #FFEACF; }");
GM_addStyle("table.tablesorter .headerSortUp {	background-image: url(skin/layout/down-arrow.gif);	background-repeat: no-repeat;	}");
GM_addStyle("table.tablesorter .headerSortDown {	background-image: url(skin/layout/up-arrow.gif);	background-repeat: no-repeat; background-position: right center; }");
GM_addStyle("table.tablesorter .header {	background-repeat: no-repeat;	padding-left: 30px;	padding-top: 8px; height: auto; background-position: right center; background-color: #7E0D0B !important; }");

$(document).ready(function()	{ 	
	
	$.tablesorter.addParser({ 
		// set a unique id 
		id: 'thousandDelimiterIsComma', 
		is: function(s) { 
		    // return false so this parser is not auto detected 
		    return false; 
		}, 
		format: function(s) { 
		    // format your data for normalization 
		    return parseInt(s.replace(/,/g,'').replace(/\./g,'').replace(/' '/g,'')); 
		}, 
		// set type, either numeric or text 
		type: 'numeric' 
	});
	
	$.tablesorter.addWidget({
		// give the widget a id
		id: "repeatHeaders",
		// format is called when the on init and when a sorting has finished
		format: function(table) {
			// cache and collect all TH headers
			if( !this.headers ) {
				var h = this.headers;
				this.headers = $("thead > tr", table).clone();
			}
			
			// remove appended headers by classname.
			$("tr.repated-header", table).remove();
			
			// loop all tr elements and insert a copy of the "headers"
			for(var i = 0; i < table.tBodies[0].rows.length; i++) {
				// insert a copy of the table head every 10th row
				if( ((i % 20) == 0 ) && (i != 0 ) ) {
					$("tbody tr:eq(" + i + ")", table).before( this.headers.clone().addClass('repated-header') );
				}
			}
		}
	}); 
	
	var $contentTable = $('div.content > table');	
	var $contentTableHeaderElements = $('div.content > table > tbody > tr:first');
	$('div.content > table').prepend('<thead></thead>');
	$('div.content > table > thead').append( $contentTableHeaderElements );
	
	$('div.content > table > tbody > tr > td.city').removeClass('city').removeAttr('class');
	$('div.content > table > tbody > tr > td.wood').removeClass('wood').removeAttr('class');
	$('div.content > table > tbody > tr > td.wine').removeClass('wine').removeAttr('class');
	$('div.content > table > tbody > tr > td.marble').removeClass('marble').removeAttr('class');
	$('div.content > table > tbody > tr > td.glass').removeClass('glass').removeAttr('class');
	$('div.content > table > tbody > tr > td.sulfur').removeClass('sulfur').removeAttr('class');	
	
	$contentTable.addClass('tablesorter');
	
	$('div.content > table > tbody > tr.normal').removeClass('normal').addClass('odd');
	$('div.content > table > tbody > tr.alt').removeClass('alt').addClass('even');

	$contentTable.tablesorter({ 
		headers: {
			1: { sorter:'thousandDelimiterIsComma' },
			2: { sorter:'thousandDelimiterIsComma' }, 
			3: { sorter:'thousandDelimiterIsComma' }, 
			4: { sorter:'thousandDelimiterIsComma' }, 
			5: { sorter:'thousandDelimiterIsComma' }, 
			6: { sorter:'thousandDelimiterIsComma' }, 
		},
		widgets: ['zebra','repeatHeaders'] 
	}); 
} 
); 