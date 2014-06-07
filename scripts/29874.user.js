// ==UserScript==
// @name			cleanerGAProfileSwitching
// @author			Erik Vold (erikvvold@gmail.com)
// @datecreated		July 9th 2008
// @lastupdated		March 17th 2009
// @namespace		cleanerGAProfileSwitching
// @include			https://www.google.com/analytics/reporting/*
// @include			https://www.google.com/analytics/settings/profile_summary*
// @include			https://adwords.google.com/analytics/reporting/*
// @include			https://adwords.google.com/analytics/settings/profile_summary*
// @version			1.1.1
// @description		Allows you to switch google analytics profiles, while retaining the report page which you were viewing.
// ==/UserScript==


var cleanerGAProfileSwitching = {};

// this function will open a given url (based on tab option selected).
cleanerGAProfileSwitching.openURL = function( newURL ){
	var openInNewTab = false;
	
	// should the new client be brought up in a new tab?
	if( document.getElementById('openClientInNewTab').checked ){
		openInNewTab = true;
	}
	
	// check if the new client page should open in a new tab.
	if( !openInNewTab ){
		// redirect
		//window.location.href = newURL;
		window.location.replace( newURL );
	}
	else{
		// open new tab or window
		//window.open( newURL );
		GM_openInTab( newURL );

		cleanerGAProfileSwitching.newSelectBox.selectedIndex = cleanerGAProfileSwitching.newSelectBox.oldSelectedIndex;				
	}
}

// this function will open a given url (based on tab option selected).
cleanerGAProfileSwitching.updateURL = function( startURL, urlAtrRegExp, urlAtrName, urlAtrValue ){
  var newURL = startURL;
  var newString = urlAtrName + "=" + urlAtrValue;
  
  // if the url variable already exists.
  if( newURL.match( urlAtrRegExp ) ){
  	newURL = startURL.replace( urlAtrRegExp, newString );	
  }
  // else if the url variable does not already exist.
  else{
  	// create the url variable.
  	newURL += "&" + newString;
  }
  
  return newURL;
}

// this function takes the current url string, and updates the profile id url variable.
cleanerGAProfileSwitching.updateURLProfileID = function( oldURL, newProfileID ){
	if( oldURL.match( /(&|\?|\/)id=\d+/ ) ){
		// if we can find the url.id variable then replace it's value.
		newURL = oldURL.replace( /(&|\?|\/)id=\d+/, "$1id=" + newProfileID );
	}
	else if( !window.location.href.match( /\?/ ) ){
		// if we cannot find the url.id variable and we cannot find the begining of the query string, then create a query string with the url.id variable.
		newURL = oldURL + "?id=" + newProfileID;
	}
	else{
		// if we cannot find the url.id variable, but we could find the begining of the query string, then add the url.id variable to the query string.
		newURL = oldURL + "&id=" + newProfileID;
	}
	
	return newURL;
}

// this function takes the current url string, and updates the date range
// assumption: query string exists already
cleanerGAProfileSwitching.updateURLDateRange = function( startURL ){
	var newURL = "";
	var startdate = "";
	var enddate = "";
	var urlstartdate = "";
	var urlenddate = "";
	var urlVarName = "pdr";
	var dateReplaceRegExp = /pdr=(\d{8})-(\d{8})/;
	
  //START: calculate date range  
  //check to see if the JS date tool has been activated; it uses that date if it has and the date from the url otherwise
  try{
  	var changeddate1 = document.getElementById('f_primaryBegin').value;
  	var changeddate2 = document.getElementById('f_primaryEnd').value;
  }
  catch(e){
  	return startURL;
  }

	// if the HTML elements selected above do not return any information, then our job is done, so stop.
  if( !changeddate1 || !changeddate2 ){
  	return startURL;
  }
    
  // clean the values retrieved and save the resulting dates
	startdate = cleanerGAProfileSwitching.helpers.date_to_string(changeddate1);
	enddate = cleanerGAProfileSwitching.helpers.date_to_string(changeddate2);
  //END: calculate date range
  
  // update the url
  newURL = cleanerGAProfileSwitching.updateURL( startURL, dateReplaceRegExp, urlVarName, startdate+"-"+enddate );

	return newURL;
}

// this function takes the current url string, and updates the tab selected
// assumption: query string exists already
cleanerGAProfileSwitching.updateTabSelected = function( startURL ){
	var newURL = "";
	var numberOfTabsUsedMax = 3;
	var selectTab = -1;
	var urlVarName = "tab";
	var tabRegExp = /tab=\d/;
	
	try{		
		for( var i = 0; i < numberOfTabsUsedMax; i++ ){
			var tab = document.getElementById( urlVarName + '_' + i );
			
			if( tab.className == "current" ){
				selectTab = i;
				
				break;
			}
		}
	}
	catch(e){
		return startURL;
	}
	
	if( selectTab < 0 ){
		return startURL;
	}
  
  // update the url
  newURL = cleanerGAProfileSwitching.updateURL( startURL, tabRegExp, urlVarName, selectTab );
	
	return newURL;
}

// this function takes a url string, and updates the number of table rows selected
// assumption: query string exists already
cleanerGAProfileSwitching.updateNumOfTableRowsSelected = function( startURL ){
	var newURL = "";
	var urlVarName = "trows";
	var rowsRegExp = /trows=\d+/;
	var tableEle = "";
	var numberOfRows = 10;
	
	try{
		/* METHOD 1
		tableEle = document.getElementById('f_table_data');
		
		numberOfRows = tableEle.getElementsByTagName('tbody').length;
		*/
		
		// METHOD 2
		// alert(unsafeWindow.table.le);
		numberOfRows = unsafeWindow.table.le;
		//
	}
	catch(e){
		return startURL;
	}
	
  // update the url
  newURL = cleanerGAProfileSwitching.updateURL( startURL, rowsRegExp, urlVarName, numberOfRows );
	
	return newURL;
}

// this function takes a url string, and updates the 'Grpah by' mode selected
// assumption: query string exists already
cleanerGAProfileSwitching.updateGraphByModeSelected = function( startURL ){
	var newURL = "";
	var graphByModeSelected = "";
	var urlVarName = "gdfmt";
	var gfRegExg = /gdfmt=\w*/;
	
	try{
		var dayOption = document.getElementById('gdf_nth_day');
		var weekOption = document.getElementById('gdf_nth_week');
		var monthOption = document.getElementById('gdf_nth_month');
		
		if( monthOption.className == "selected" ){
			graphByModeSelected = "nth_month";
		}
		else if( weekOption.className == "selected" ){
			graphByModeSelected = "nth_week";
		}
		else{
			graphByModeSelected = "nth_day";
		}
	}
	catch(e){
		return startURL;
	}
	
	if( graphByModeSelected == "" ){
		return startURL;
	}
	
  // update the url
  newURL = cleanerGAProfileSwitching.updateURL( startURL, gfRegExg, urlVarName, graphByModeSelected );
	
	return newURL;
}

// this function takes a url string, and updates the 'View' mode selected
// assumption: query string exists already
cleanerGAProfileSwitching.updateViewModeSelected = function( startURL ){
	var newURL = startURL;
	var urlVarName = "view";
	var viewRegExg = /view=\w*/;
	var viewSelected = 0;
	
	try{
	  viewSelected = unsafeWindow.tabView.a.ViewSelected;
	  
	  if( viewSelected != 0 && !viewSelected ){
	    return startURL;
	  }
	}
	catch(e){
	  // can't find this value? then skip this setting.
	  return startURL;
	}
	
  // update the url
  newURL = cleanerGAProfileSwitching.updateURL( startURL, viewRegExg, urlVarName, viewSelected );
	
	return newURL;
}

// this function takes a url string, and updates the 'Segment by' option selected
// assumption: query string exists already
cleanerGAProfileSwitching.updateSegmentByOptionSelected = function( startURL ){
	var newURL = startURL;
	var urlVarName = "segkey";
	var segkeyRegExg = /segkey=\w*/;
	
	// get segment by value
	try{
	  // get the current segkey value
		var segKey = unsafeWindow.propertyManager.Ff.segkey;
		
		if( !segKey ){
		 return startURL;
		}
	}
	catch(e){
	  // can't find this value? then skip this setting, b/c it's the default
		return startURL;
	}
	
  // update the url
  newURL = cleanerGAProfileSwitching.updateURL( startURL, segkeyRegExg, urlVarName, segKey );
	
	// done
	return newURL;
}

// this function is used when the profile drop down select box is used.
cleanerGAProfileSwitching.newOnChangeFunction = function(){
	var oldURL = window.location.href;
	var newURL = "";
	var resetRegExp = /reset=\d+/;
	
	// Update the profile id in the url string.
	newURL = cleanerGAProfileSwitching.updateURLProfileID( oldURL, cleanerGAProfileSwitching.newSelectBox.options[ cleanerGAProfileSwitching.newSelectBox.selectedIndex ].value );

	// Update the date range in the url string.
	newURL = cleanerGAProfileSwitching.updateURLDateRange( newURL );
	
	// Update the tab selected in the url string.
	newURL = cleanerGAProfileSwitching.updateTabSelected( newURL );
	
	// Update the number of table rows used.
	newURL = cleanerGAProfileSwitching.updateNumOfTableRowsSelected( newURL );
	
	// Update the 'graph by' mode selected.
	newURL = cleanerGAProfileSwitching.updateGraphByModeSelected( newURL );
	
	// Update the 'view' mode selected.
	newURL = cleanerGAProfileSwitching.updateViewModeSelected( newURL );
	
	// Update the 'segment by' option sleected.
	newURL = cleanerGAProfileSwitching.updateSegmentByOptionSelected( newURL );
	
	// if the url reset variable dne, then add it
	if( !newURL.match( resetRegExp ) ){
		// add the reset var to the url
		newURL += "&reset=1";
	}

	// open the new url string according to the users' tab preference
	cleanerGAProfileSwitching.openURL( newURL );

	// done
	return false;
}

// this function is used to start the greasemonkey script, think of it as the main function
cleanerGAProfileSwitching.loadingFunction = function(){
	try{
		if( !document.getElementById('profile') ){
			return false;
		}

		// START: Build the open tab checkbox
		cleanerGAProfileSwitching.openClientInNewTab = document.createElement('input');
		cleanerGAProfileSwitching.openClientInNewTab.setAttribute('type',"checkbox");
		cleanerGAProfileSwitching.openClientInNewTab.setAttribute('id',"openClientInNewTab");
		cleanerGAProfileSwitching.openClientInNewTab.setAttribute('name',"openClientInNewTab");
		// END: Build the open tab checkbox


		// START: Build the open tab text
		cleanerGAProfileSwitching.newTabText = document.createElement('span');
		var tempClassName = "";
		try {
			tempClassName = document.getElementById('settings_link').className;
		}
		catch(e){
			tempClassName = "";
		}
		cleanerGAProfileSwitching.newTabText.innerHTML = "<label for='openClientInNewTab' class='"+tempClassName+"'>Open in a new tab?</label>";
		// END: Build the open tab text


		cleanerGAProfileSwitching.selectBox = document.getElementById('profile');
		cleanerGAProfileSwitching.selectBoxParent = cleanerGAProfileSwitching.selectBox.parentNode;


		// START: Build the new select box (part 1)
		cleanerGAProfileSwitching.newSelectBox = document.createElement('select');

		// add options
		for(var i = 0; i < cleanerGAProfileSwitching.selectBox.options.length; i++){
			cleanerGAProfileSwitching.newSelectBox.options[i] = new Option( cleanerGAProfileSwitching.selectBox.options[i].text, cleanerGAProfileSwitching.selectBox.options[i].value );
		}

		// add onChange Listener
		cleanerGAProfileSwitching.newSelectBox.addEventListener("change", cleanerGAProfileSwitching.newOnChangeFunction, true);
		// END: Build the new select box (part 1)

//

		// save selectedIndex
		cleanerGAProfileSwitching.newSelectBox.selectedIndex = cleanerGAProfileSwitching.selectBox.selectedIndex;
		cleanerGAProfileSwitching.newSelectBox.oldSelectedIndex = cleanerGAProfileSwitching.selectBox.selectedIndex;

		// remove old select box
		cleanerGAProfileSwitching.selectBoxParent.removeChild( document.getElementById('profile') );

		// START: Build the new select box (part 2)
		// add id and name attributes to the new select box
		cleanerGAProfileSwitching.newSelectBox.setAttribute("id","profile");
		cleanerGAProfileSwitching.newSelectBox.setAttribute("name","id");
		// END: Build the new select box (part 2)


		// add the new select box and checkbox to the screen
		cleanerGAProfileSwitching.selectBoxParent.appendChild( cleanerGAProfileSwitching.newSelectBox );
		cleanerGAProfileSwitching.selectBoxParent.appendChild( cleanerGAProfileSwitching.openClientInNewTab );
		cleanerGAProfileSwitching.selectBoxParent.appendChild( cleanerGAProfileSwitching.newTabText );
	
		return true;
	}
	catch(e){
		// debugging 
		//alert('error');
		
		return false;
	}
}


/************************
 * START: HELPER FUNCTIONS
 ***********************/
cleanerGAProfileSwitching.helpers = {};
 
// this function converts mm/dd/yyyy to yyyymmdd
cleanerGAProfileSwitching.helpers.date_to_string = function(datum){  
    var re = new RegExp(/(\d{2})\/(\d{2})\/(\d{4})/);
    
    var vals = re.exec(datum);
    
    return (vals[3] + vals[1] + vals[2] );
}

/************************
 * END: HELPER FUNCTIONS
 ***********************/


// start the code above.
cleanerGAProfileSwitching.loadingFunction();