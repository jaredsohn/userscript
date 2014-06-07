// ==UserScript==
// @name			Google Analytics Keyword Insights
// @author			Erik Vergobbi Vold (http://erikvold.com/)
// @contributor		Mike Belasco (http://www.seoverflow.com/)
// @copyright		2009+, Mike Belasco (http://www.seoverflow.com/)
// @homepage		http://www.seoverflow.com/
// @namespace		http://www.seoverflow.com/
// @datecreated		2009-08-15
// @lastupdated		2009-10-23
// @version			1.0.3
// @include			https://www.google.com/analytics/reporting/all_source_medium_base_detail?*
// @include			https://www.google.com/analytics/reporting/keywords?*
// @include			https://www.google.com/analytics/reporting/keyword_detail?*
// @include			https://www.google.com/analytics/reporting/search_engines?*
// @include			https://www.google.com/analytics/reporting/search_engine_detail?*
// @include			https://adwords.google.com/analytics/reporting/all_source_medium_base_detail?*
// @include			https://adwords.google.com/analytics/reporting/keywords?*
// @include			https://adwords.google.com/analytics/reporting/keyword_detail?*
// @include			https://adwords.google.com/analytics/reporting/search_engines?*
// @include			https://adwords.google.com/analytics/reporting/search_engine_detail?*
// @description		This userscript will help you perform Google Insights searches on keywords in Google Analytics reports.
// ==/UserScript==

var gaKeywordInsights = {};

// START: CONFIG
gaKeywordInsights.leftNavID = "gaKeywordGInsightsDiv";
gaKeywordInsights.columnTHID = "ginsights_chkbox_column";
gaKeywordInsights.searchBtnID = "keywordGInsightsBtnID";
gaKeywordInsights.keywordMax = 5;
// END: CONFIG

gaKeywordInsights.topChkbox = "";
gaKeywordInsights.chkboxAry = [];

gaKeywordInsights.addNodeInsertListener = function() {
	document.addEventListener( "DOMNodeInserted", gaKeywordInsights.doTasks, false );
	return true;
}
gaKeywordInsights.removeNodeInsertListener = function() {
	document.removeEventListener( "DOMNodeInserted", gaKeywordInsights.doTasks, false );
	return true;
}

gaKeywordInsights.doTasks = function() {
	try {
		gaKeywordInsights.addColumn();
	}
	catch( e ) {
		//alert(e.toString())
	}
	return;
}

gaKeywordInsights.keywordGInsightsDiv = "";

gaKeywordInsights.cleanKeywordGInsightsDiv = function(){
	var temp = document.getElementById( gaKeywordInsights.leftNavID );
	temp.parentNode.removeChild( temp );
}

// creates and inserts the widget for the left nav
gaKeywordInsights.createKeywordGInsightsDiv = function() {
	if( document.getElementById( gaKeywordInsights.searchBtnID ) ) {
		return false;
	}

	var leftNav = document.getElementById( "report_nav_div" );
	if( !leftNav ) {
		leftNav = document.getElementById('report_nav');
		if( !leftNav ) {
			return false;
		}
		leftNav = leftNav.parentNode;
	}
	var newKeywordGInsightsDiv = document.createElement("div");
	newKeywordGInsightsDiv.id = gaKeywordInsights.leftNavID;
	newKeywordGInsightsDiv.setAttribute( "class", "feature settings");

	var keywordDivInnerR1 = document.createElement("div");
	keywordDivInnerR1.className = "r1";
	var keywordDivInnerR2 = document.createElement("div");
	keywordDivInnerR2.className = "r2";
	keywordDivInnerR2.setAttribute( "style", "background-color:#FFFFFF;" );
	var keywordDivInnerR3 = document.createElement("div");
	keywordDivInnerR3.className = "r3";

	keywordDivInnerR2.appendChild( keywordDivInnerR3 );
	keywordDivInnerR1.appendChild( keywordDivInnerR2 );
	newKeywordGInsightsDiv.appendChild( keywordDivInnerR1 );

	keywordDivInnerR3.innerHTML = '<a title="Google Insights for Search" target="_blank" href="http://www.google.com/insights/search/"><img src="http://farm3.static.flickr.com/2501/3832413420_2de93db483.jpg" /></a>';

	var keyWordWidgetContentDiv = document.createElement( "div" );
	keywordDivInnerR3.appendChild( keyWordWidgetContentDiv );

	GM_addStyle( "#poweredBySEOverflowDIVID { font-size: 90%; white-space: nowrap; padding-top:0px; } #poweredBySEOverflowDIVID a { display: inline; }" );
	var poweredBySEOverflow = document.createElement( "div" );
	poweredBySEOverflow.id = "poweredBySEOverflowDIVID";
	poweredBySEOverflow.innerHTML = '<nobr>Brought to you by <a title="seOverflow: SEO Outsourcing Solutions" rev="vote-for" target="_blank" href="http://www.seoverflow.com/?utm_source=googleanalytics&utm_medium=script&utm_campaign=insights"><img title="seOverflow: SEO Outsourcing Solutions" alt="seOverflow" src="http://farm4.static.flickr.com/3497/3831912771_93ffaf99b3.jpg" /></a></nobr>';
	keywordDivInnerR3.appendChild( poweredBySEOverflow );

	leftNav.appendChild( newKeywordGInsightsDiv );

	// save ref to content div
	gaKeywordInsights.keywordGInsightsDiv = keyWordWidgetContentDiv;

	gaKeywordInsights.insertControls();

	GM_registerMenuCommand( "Check Top Keywords", gaKeywordInsights.checkTopKeywords, "", "", "" );
	GM_registerMenuCommand( "Uncheck Keywords", gaKeywordInsights.uncheckKeywords, "", "", "" );

	return true;
}

// inserts the instructions and go button
gaKeywordInsights.insertControls = function() {
	var newP = document.createElement( "p" );
	var newStrong = document.createElement( "strong" );
	newStrong.innerHTML = "Instructions:";
	newP.appendChild( newStrong );
	var newOL = document.createElement( "ul" );
	newP.appendChild( newOL );
	var newLI = document.createElement( "li" );
	newLI.innerHTML = "Check up to " + gaKeywordInsights.keywordMax + " keywords, then press the button below.";
	newOL.appendChild( newLI );
	newLI = document.createElement( "li" );
	var newButton = document.createElement( "input" );
	newButton.type = "button";
	newButton.id = gaKeywordInsights.searchBtnID;
	newButton.value = "Insights Search";
	newButton.addEventListener( "click", gaKeywordInsights.performSearch, false );
	newLI.appendChild( newButton );
	newOL.appendChild( newLI );

	gaKeywordInsights.keywordGInsightsDiv.appendChild( newP );
}

gaKeywordInsights.performSearch = function() {
	var keywordsAry = [];

	if ( document.getElementById( gaKeywordInsights.columnTHID ) ) {
		for (var i = 0; i < gaKeywordInsights.chkboxAry.length; i++) {
			if (keywordsAry.length > gaKeywordInsights.keywordMax) {
				break;
			}
			if (gaKeywordInsights.chkboxAry[i].checked) {
				keywordsAry[keywordsAry.length] = encodeURIComponent( document.getElementById("f_primary_segment" + i).title.replace( /\,/gi, "" ) );
			}
		}
	}
	else if( gaKeywordInsights.chkboxAry.length > 0 ) {
		gaKeywordInsights.chkboxAry = [];
	}

	if( keywordsAry.length == 0 ) {
		alert("You must select a keyword first.");
		return false;
	}

	var keywordsStr = keywordsAry.join( '%2C' );
	var dateStr = gaKeywordInsights.getDateRangeForInsights();
	GM_openInTab( 'http://www.google.com/insights/search/#q=' + keywordsStr + '&date=' + dateStr + '&cmpt=q' );
	return true;
}

gaKeywordInsights.topCheckBoxClick = function( e ){
	if(e.target.checked) {
		gaKeywordInsights.checkTopKeywords();
	}
	else {
		gaKeywordInsights.uncheckKeywords();
	}
}

// checks the top maximum amount of keywords
gaKeywordInsights.checkTopKeywords = function() {
	if ( document.getElementById( gaKeywordInsights.columnTHID ) ) {
		gaKeywordInsights.topChkbox.checked = true;
		var aryLen = gaKeywordInsights.chkboxAry.length;
		if( aryLen == 0 ) {
			return true;
		}
		var tempMax = gaKeywordInsights.keywordMax;
		if( tempMax > aryLen ) {
			tempMax = aryLen;
		}
		for (var i = aryLen-1; i >= tempMax; i--) {
			gaKeywordInsights.chkboxAry[i].checked = false;
			gaKeywordInsights.chkboxAry[i].disabled = true;
		}
		for (var i = 0; i < tempMax; i++) {
			gaKeywordInsights.chkboxAry[i].checked = true;
		}
	}
	else if( gaKeywordInsights.chkboxAry.length > 0 ) {
		gaKeywordInsights.chkboxAry = [];
	}
	return true;
}

// unchecks all keys
gaKeywordInsights.uncheckKeywords = function() {
	if ( document.getElementById( gaKeywordInsights.columnTHID ) ) {
		gaKeywordInsights.topChkbox.checked = false;
		var aryLen = gaKeywordInsights.chkboxAry.length;
		if( aryLen == 0 ) {
			return true;
		}
		for (var i = aryLen-1; i >= 0; i--) {
			gaKeywordInsights.chkboxAry[i].disabled = false;
			gaKeywordInsights.chkboxAry[i].checked = false;
		}
	}
	else if( gaKeywordInsights.chkboxAry.length > 0 ) {
		gaKeywordInsights.chkboxAry = [];
	}
	return true;
}

// extracts date range from GA and prepares the date range string for Google Insights
gaKeywordInsights.getDateRangeForInsights = function() {
	var href = window.location.href;
	var today = new Date();
	var changeddate1 = document.getElementById('f_primaryBegin').value;
	var changeddate2 = document.getElementById('f_primaryEnd').value;
	if( !changeddate1 || !changeddate2 ) {
		var hrefDateMatch = href.match( /pdr=(\d{8})-(\d{8})/i );
		changeddate1 = gaKeywordInsights.getDateFromValue2( hrefDateMatch[1] );
		changeddate2 = gaKeywordInsights.getDateFromValue2( hrefDateMatch[2] );
		//alert( "a." + changeddate1.toString() + " - " + changeddate2.toString() );
	}
	else {
		changeddate1 = gaKeywordInsights.getDateFromValue1( changeddate1 );
		changeddate2 = gaKeywordInsights.getDateFromValue1( changeddate2 );
		//alert( "b." + changeddate1.toString() + " - " + changeddate2.toString() );
	}

	var tempDiff1 = today - changeddate1;
	var tempDiff2 = today - changeddate2;
	// 604800000 = 1000*60*60*24*7		(7 Days in milliseconds)
	// 2592000000 = 1000*60*60*24*30	(30 Days in milliseconds)
	// 7776000000 = 1000*60*60*24*90	(90 Days in milliseconds)
	if( 604800000 - tempDiff1 > 0 ) {
		return "today 7-d";
	}
	else if( 2592000000 - tempDiff1 > 0 ) {
		return "today 1-m";
	}
	else if( 7776000000 - tempDiff1 > 0 /*&& 2592000000 - tempDiff2 > 0*/ ) {
		return "today 3-m";
	}

	var yearDiff = (changeddate2.getYear() - changeddate1.getYear())*1;
	var monthDiff = 0;
	if (changeddate2.getMonth() < changeddate1.getMonth()) {
		monthDiff = 12 - changeddate1.getMonth() + changeddate2.getMonth() ;
		yearDiff--;
	}
	else {
		monthDiff = changeddate2.getMonth() - changeddate1.getMonth();
	}
	var totalMonthDiff = monthDiff+1 + yearDiff*12;

	return (changeddate1.getMonth()+1) + "%2F" + changeddate1.getFullYear() + " " + totalMonthDiff + "m";
}

// extracts date range from page values
gaKeywordInsights.getDateFromValue1 = function(datum){
	var vals = /(\d{2})\/(\d{2})\/(\d{4})/.exec(datum);

	return new Date( vals[3]*1, (vals[1]*1)-1, vals[2]*1 );
}

// extracts date range from url
gaKeywordInsights.getDateFromValue2 = function(datum){
	var vals = /(\d{4})(\d{2})(\d{2})/.exec(datum);

	return new Date( vals[1]*1, (vals[2]*1)-1, vals[3]*1 );
}

// this is the click event func for the checkboxes
gaKeywordInsights.chkboxClick = function( event ) {
	var numOfChecked = 0;
	var numOfChecked2 = 0;
	for ( var i = 0; i < gaKeywordInsights.chkboxAry.length; i++ ) {
		if( numOfChecked < gaKeywordInsights.keywordMax ) {
			if( gaKeywordInsights.chkboxAry[ i ].checked ){
				numOfChecked++;
			}
		}
		else {
			break;
		}
	}

	if( numOfChecked > 0 ) {
		gaKeywordInsights.topChkbox.checked = true;
	}
	else {
		gaKeywordInsights.topChkbox.checked = false;
	}

	if (numOfChecked >= gaKeywordInsights.keywordMax) {
		for (var i = 0; i < gaKeywordInsights.chkboxAry.length; i++) {
			if (gaKeywordInsights.chkboxAry[i].checked) {
				if (numOfChecked2 < gaKeywordInsights.keywordMax) {
					numOfChecked2++;
				}
				else {
					gaKeywordInsights.chkboxAry[i].checked = false;
					gaKeywordInsights.chkboxAry[i].disabled = true;
				}
			}
			else {
				gaKeywordInsights.chkboxAry[i].disabled = true;
			}
		}
	}
	else {
		for (var i = 0; i < gaKeywordInsights.chkboxAry.length; i++) {
			gaKeywordInsights.chkboxAry[i].disabled = false;
		}
	}

	return false;
}

// checks if the current report is a of a dimension, and if that dimension is 'keyword'
gaKeywordInsights.isDimensionKeywords = function() {
	var dimensionText = document.evaluate("//div[@id='SegmentDropdown0_button']/b/b/b", document, null, 9, null).singleNodeValue;
	if( !dimensionText ) return false;

	var currentDimension = (dimensionText.innerHTML+"").replace( /^\s+/, '' ).replace( /\s+$/, '' ).toLowerCase();
	if (currentDimension != 'keyword') return false;

	return true;
}

// adds the new column new header and all
gaKeywordInsights.addColumn = function() {
	if( !gaKeywordInsights.isDimensionKeywords() ) return false;

	var keywordCol = document.getElementById( "f_key_column_0" );
	if( !keywordCol ) return false;

	var newCheckboxColumn = document.getElementById( gaKeywordInsights.columnTHID );
	if( newCheckboxColumn ) return false;

	newCheckboxColumn = document.createElement( "th" );
	newCheckboxColumn.className = "empty";
	newCheckboxColumn.id = gaKeywordInsights.columnTHID;
	gaKeywordInsights.topChkbox = document.createElement("input");
	gaKeywordInsights.topChkbox.type = "checkbox"
	gaKeywordInsights.topChkbox.addEventListener( "click", gaKeywordInsights.topCheckBoxClick, false );
	newCheckboxColumn.appendChild( gaKeywordInsights.topChkbox );

	var keywordColRow=keywordCol.parentNode;
	keywordColRow.insertBefore( newCheckboxColumn, keywordColRow.firstChild );
	var tblHeadRows=document.evaluate(".//tr/th[1]", keywordColRow.parentNode, null, 7, null);
	var tempTDorTHs, tempColSpan, rowCount=tblHeadRows.snapshotLength;
	for(var i=0;i<rowCount;i++){
		tempTDorTHs=tblHeadRows.snapshotItem(i);
		if(tempTDorTHs.id!=gaKeywordInsights.columnTHID){
			tempColSpan=tempTDorTHs.getAttribute("colspan");
			if(!tempColSpan && tempColSpan!=0 && tempColSpan!="0") tempColSpan=1;
			else tempColSpan=tempColSpan*1;
			tempColSpan+=1;
			tempTDorTHs.setAttribute("colspan",tempColSpan)
		}
	}

	// adding style to shrink column width
	GM_addStyle( "#Table td.ginsight-keyword-chkbox { width: 1%; }" );
	var newTD = "";
	var newChkBox = "";
	var tempTR = "";
	gaKeywordInsights.chkboxAry = [];

	var count = 0;
	var row = document.getElementById( "f_tbody_" + count );
	if( !row ) {
		var rows = document.evaluate("//div[@id='Table']/table[@id='f_table_data' or @id='f_table_graph']/*/tr", document, null, 7, null);
		//alert(rows.snapshotLength);
		var countTD = null;
		while( rowCount < rows.snapshotLength ) {
			row = rows.snapshotItem( rowCount );
			countTD = row.getElementsByTagName( "td" )[ 0 ];
			if( !countTD ) return false;

			//countTD = document.evaluate("//td[@class='count']", row, null, 9, null).singleNodeValue;
			//alert( countTD.innerHTML );
			newTD = document.createElement( "td" );
			newTD.setAttribute( "class", "ginsight-keyword-chkbox" );

			if( countTD.className == "count" ) {
			//if( countTD ) {
				newChkBox = document.createElement( "input" );
				newChkBox.type = "checkbox";
				newTD.appendChild( newChkBox );
				newChkBox.addEventListener( "click", gaKeywordInsights.chkboxClick, false );
				gaKeywordInsights.chkboxAry[ gaKeywordInsights.chkboxAry.length ] = newChkBox;
			}
			else {
				newTD.innerHTML = "&nbsp;";
			}
			countTD.width = "1";
			countTD.className = "count";
			row.insertBefore( newTD, row.firstChild );
			rowCount++;
		}
	}
	else{
		while( row ) {
			newTD = document.createElement( "td" );
			newTD.setAttribute( "class", "ginsight-keyword-chkbox" );
			newChkBox = document.createElement( "input" );
			newChkBox.type = "checkbox";
			newTD.appendChild( newChkBox );
			newChkBox.addEventListener( "click", gaKeywordInsights.chkboxClick, false );
			gaKeywordInsights.chkboxAry[ gaKeywordInsights.chkboxAry.length ] = newChkBox;
	
			tempTR = row.getElementsByTagName( "tr" )[0];
			tempTR.insertBefore( newTD, tempTR.firstChild );
	
			row = document.getElementById( "f_tbody_" + ++count );
		}
	}

	return true;
}

// setup
gaKeywordInsights.addNodeInsertListener();
gaKeywordInsights.createKeywordGInsightsDiv();