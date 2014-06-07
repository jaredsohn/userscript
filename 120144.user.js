//
// NoCrap Google Search Bar
// Author: Julien Lamarre
//
// ==UserScript==
// @name 		NoCrap Google Search Bar
// @description	Google search without the crap.
// @namespace	Julien Lamarre
// @icon 		http://img442.imageshack.us/img442/456/icon3k.png
// @version		3
// @run-at 		document-end

// @include	http://google.tld/
// @include https://google.tld/
// @include http://www.google.tld/
// @include https://www.google.tld/

// @include https://encrypted.google.tld/*

// @include http://google.tld/#*
// @include https://google.tld/#*
// @include http://www.google.tld/#*
// @include https://www.google.tld/#*

// @include http://google.tld/search*
// @include https://google.tld/search*
// @include http://www.google.tld/search*
// @include https://www.google.tld/search*

// @include http://google.tld/webhp*
// @include https://google.tld/webhp*
// @include http://www.google.tld/webhp*
// @include https://www.google.tld/webhp*

// @include http://google.tld/imghp*
// @include https://google.tld/imghp*
// @include http://www.google.tld/imghp*
// @include https://www.google.tld/imghp*

// @include http://google.tld/videohp*
// @include https://google.tld/videohp*
// @include http://www.google.tld/videohp*
// @include https://www.google.tld/videohp*
// @include http://video.google.tld/*
// @include https://video.google.tld/*

// @include http://google.tld/nwshp*
// @include https://google.tld/nwshp*
// @include http://www.google.tld/nwshp*
// @include https://www.google.tld/nwshp*
// @include http://news.google.tld/*
// @include https://news.google.tld/*

// @include http://www.google.tld/blogsearch*
// @include https://www.google.tld/blogsearch*
// @include http://google.tld/blogsearch*
// @include https://google.tld/blogsearch*

// ==/UserScript==

//=============================
// Load jQuery
//=============================
var myJquery;

var script = document.createElement('script');
script.src = '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

script.addEventListener('load', function(){ 
  myJquery = unsafeWindow['jQuery'];
  myJquery.noConflict();
  
  main();
  
}, false);

//=============================
// HTML to Dom Node
//=============================
function htmlToDomNode(html) {
  var container = document.createElement('div');
  container.innerHTML = html;
  return container.firstChild;
}

//=============================
// Set user config
//=============================
unsafeWindow.setUserConfig = function(name, value)
{
	if(name == "lang" && value == "---")
	{
		value = "";
	}
	
	setTimeout(function(){GM_setValue(name, value);}, 0);
}
//=============================
// Get user config
//=============================
unsafeWindow.getUserConfig = function(name)
{
	var value = GM_getValue(name);
	
	//=============================
	// Default value, if not already set
	//=============================
	if(typeof value == "undefined")
	{
		if(name == "enableDoubleQuotes")
		{
			value = "on";
		}
		else if(name == "numberResults")
		{
			value = "100";
		}
		else if(name == "safeSearch")
		{
			value = "off";
		}
		else if(name == "searchType" || name == "period" || name == "lang" || name == "format")
		{
			value = "";
		}
		else if(name == "enableDoubleQuotesDisplay" || name == "numberResultsDisplay" || name == "safeSearchDisplay" || name == "searchTypeDisplay" || name == "periodDisplay" || name == "langDisplay" || name == "formatDisplay")
		{
			value = true;
		}
		else if(name == "fixbar")
		{
			value = false;
		}
	}
	return value;
}

//=============================
// Get a parameter from the querystring
//=============================
function getQueryVariable(variable) 
{
	variable = variable.toLowerCase();
	
	// check in anchor part first
	var query = self.document.location.hash.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) 
	{
		var pair = vars[i].split("=");
		if (pair[0].toLowerCase() == variable) 
		{
			return pair[1];
		}
	} 
	
	// then in querystring
	query = window.location.search.substring(1);
	vars = query.split("&");
	for (var i=0;i<vars.length;i++) 
	{
		var pair = vars[i].split("=");
		if (pair[0].toLowerCase() == variable) 
		{
			return pair[1];
		}
	}
}

//=============================
// Does a term contain some Google specific code?
//=============================
function isTermContainsSpecialGoogleCode(term) 
{
	return term.charAt(0) == "+" 		|| 
	       term.charAt(0) == "-" 		||
	       term.charAt(0) == "~" 		||
	       term.charAt(0) == '"' 		||
	       term == "|"					||
	       term.toUpperCase() == "OR" 	||
	       term.toUpperCase() == "AND" 	||
	       term.indexOf(":") != -1 		||
	       term.indexOf("..") != -1 	||
	       term.indexOf("*") != -1;
}

//=============================
// Add double quotes around terms of the specified search string
//=============================
function addDoubleQuotes(searchString) 
{
	var tokens = new Array();

	var inQuotes = false;
	var inTerm = false;
	var buff = "";

	// split terms
	for(var i = 0; i < searchString.length; i++)
	{
	    var oneChar = searchString.charAt(i);
		if(oneChar == '"')
		{
			if(inQuotes)
			{
				inQuotes = false;
				buff = buff + oneChar;
				tokens.push(buff);
				buff = "";
				continue;
			}
			else
			{
				if(i == (searchString.length -1))
				{
					continue;
				}
				buff = buff + oneChar;
				inQuotes = true;
				inTerm = false;
				continue;
			}
		}
		else if(oneChar == ' ')
		{
			if(!inQuotes)
			{
				if(inTerm)
				{
	  			inTerm = false;
	  			tokens.push(buff);
	  			buff = "";
	  			continue;
				}
			continue;
			}
		}
		else if(!inQuotes)
		{
			inTerm = true;
		}

		buff = buff + oneChar;
	}
	
	// the remaining is a term
	if(buff.length > 0)
	{
		if(inQuotes && buff.length > 1)
		{
			// close missing closing quote
			buff += '"';
			tokens.push(buff);
		}
		else if(inTerm)
		{
			tokens.push(buff);
		}
	}

	// Create the final search string
	var searchStringFinal = '';
	for(var i = 0; i < tokens.length; i++)
	{
		var term = tokens[i];
		
		// if it's a special google search, we do not touch it
		if(isTermContainsSpecialGoogleCode(term))
		{
			searchStringFinal += term + ' ';
		}
		// otherwise we add double quotes around it
		else
		{
			searchStringFinal += '"' + term + '" ';
		}
	}
	searchStringFinal = searchStringFinal.trim();
	
	return searchStringFinal;
};

//=============================
// Remove all double quotes
//=============================
function removeDoubleQuotes(searchString) 
{
	var searchStringFinal = searchString.replace(/"/g, "");
	return searchStringFinal;
}

//=============================
// Validate if all terms of the search string are in double quotes
//=============================
function allTermsAreInDoubleQuotes(searchString)
{
	// quick check
	if(!searchString || searchString.length < 2 || searchString.charAt(0) !== '"' || searchString.charAt(searchString.length - 1) !== '"')
	{
		return false;
	}

	var inDoubleQuotes = false;
	for(var i = 0; i < searchString.length; i++)
	{
		var oneChar = searchString.charAt(i);
		if(oneChar == '"')
		{
			if(inDoubleQuotes)
			{
				inDoubleQuotes = false;
			}
			else
			{
				inDoubleQuotes = true;
			}
			continue;
		}
		else if(oneChar != ' ')
		{
			if(!inDoubleQuotes)
			{
				return false;
			}
		}
	}
	
	return true;
}

//=============================
// Set default values on the dropdown fields
// from user saved config, if any
//=============================
function setFieldsValuesFromSavedValues()
{
	myJquery('#myEnableDoubleQuotesSelect option[value="' + unsafeWindow.getUserConfig('enableDoubleQuotes') + '"]').attr('selected', 'selected');
	myJquery('#myNumberResultsSelect option[value="' + unsafeWindow.getUserConfig('numberResults') + '"]').attr('selected', 'selected');
	myJquery('#mySafeSearchSelect option[value="' + unsafeWindow.getUserConfig('safeSearch') + '"]').attr('selected', 'selected');
	myJquery('#mySearchTypeSelect option[value="' + unsafeWindow.getUserConfig('searchType') + '"]').attr('selected', 'selected');
	myJquery('#myPeriod option[value="' + unsafeWindow.getUserConfig('period') + '"]').attr('selected', 'selected');
	myJquery('#myLang option[value="' + unsafeWindow.getUserConfig('lang') + '"]').attr('selected', 'selected');
	myJquery('#myFormat option[value="' + unsafeWindow.getUserConfig('format') + '"]').attr('selected', 'selected');
}

//=============================
// Show/hide dropdowns from saved values
//=============================
unsafeWindow.showHideFieldsFromSavedValues = function ()
{
	if(unsafeWindow.getUserConfig('enableDoubleQuotesDisplay'))
	{
		myJquery("#myEnableDoubleQuotesSelect").css("display", "inline");
	}
	else
	{
		myJquery("#myEnableDoubleQuotesSelect").css("display", "none");
	}

	if(unsafeWindow.getUserConfig('numberResultsDisplay'))
	{
		myJquery("#myNumberResultsSelect").css("display", "inline");
	}
	else
	{
		myJquery("#myNumberResultsSelect").css("display", "none");
	}
	
	if(unsafeWindow.getUserConfig('safeSearchDisplay'))
	{
		myJquery("#mySafeSearchSelect").css("display", "inline");
	}
	else
	{
		myJquery("#mySafeSearchSelect").css("display", "none");
	}
	
	if(unsafeWindow.getUserConfig('searchTypeDisplay'))
	{
		myJquery("#mySearchTypeSelect").css("display", "inline");
	}
	else
	{
		myJquery("#mySearchTypeSelect").css("display", "none");
	}
	
	if(unsafeWindow.getUserConfig('periodDisplay'))
	{
		myJquery("#myPeriod").css("display", "inline");
	}
	else
	{
		myJquery("#myPeriod").css("display", "none");
	}
	
	if(unsafeWindow.getUserConfig('langDisplay'))
	{
		myJquery("#myLang").css("display", "inline");
	}
	else
	{
		myJquery("#myLang").css("display", "none");
	}
	
	if(unsafeWindow.getUserConfig('formatDisplay'))
	{
		myJquery("#myFormat").css("display", "inline");
	}
	else
	{
		myJquery("#myFormat").css("display", "none");
	}
}

//=============================
// Populate custom fields from current url parameters
//=============================
function populateFields()
{
	//=============================
	// search string
	//=============================
	var qsInQuery = getQueryVariable("q");
	if(qsInQuery)
	{
		qsInQuery = qsInQuery.replace(/\+/g, " ");
		qsInQuery = decodeURIComponent(qsInQuery);
		myJquery("#mySearchField").val(qsInQuery);
	}
	
	//=============================
	// search type
	//=============================
	var searchTypeParam = getQueryVariable('tbm');
	
	// from the tbm parameter
	var searchTypeFound = false;
	if(typeof searchTypeParam != "undefined")
	{
		// videos
		if(searchTypeParam == "vid")
		{
			searchTypeFound = true;
			myJquery('#mySearchTypeSelect option[value="videos"]').attr('selected', 'selected');
			myJquery('#mySearchTypeSelect').css('background-color', '#FFF189');
		}
		// images
		else if(searchTypeParam == "isch")
		{
			searchTypeFound = true;
			myJquery('#mySearchTypeSelect option[value="images"]').attr('selected', 'selected');
			myJquery('#mySearchTypeSelect').css('background-color', '#FFF189');
		}
		// news
		else if(searchTypeParam == "nws")
		{
			searchTypeFound = true;
			myJquery('#mySearchTypeSelect option[value="news"]').attr('selected', 'selected');
			myJquery('#mySearchTypeSelect').css('background-color', '#FFF189');
		}
		// blogs
		else if(searchTypeParam == "blg")
		{
			searchTypeFound = true;
			myJquery('#mySearchTypeSelect option[value="blogs"]').attr('selected', 'selected');
			myJquery('#mySearchTypeSelect').css('background-color', '#FFF189');
		}
	}
	
	// from the url path
	if(!searchTypeFound)
	{
		// videos
		if(window.location.pathname.toLowerCase().indexOf("/videohp") == 0 || window.location.hostname.toLowerCase().indexOf("video.") == 0)
		{
			myJquery('#mySearchTypeSelect option[value="videos"]').attr('selected', 'selected');
			myJquery('#mySearchTypeSelect').css('background-color', '#FFF189');
		}
		// images
		else if(window.location.pathname.toLowerCase().indexOf("/imghp") == 0)
		{
			myJquery('#mySearchTypeSelect option[value="images"]').attr('selected', 'selected');
			myJquery('#mySearchTypeSelect').css('background-color', '#FFF189');
		}
		// news
		else if(window.location.pathname.toLowerCase().indexOf("/nwshp") == 0 || window.location.hostname.toLowerCase().indexOf("news.") == 0)
		{
			myJquery('#mySearchTypeSelect option[value="news"]').attr('selected', 'selected');
			myJquery('#mySearchTypeSelect').css('background-color', '#FFF189');
		}
		// blogs
		else if(window.location.pathname.toLowerCase().indexOf("/blogsearch") == 0)
		{
			myJquery('#mySearchTypeSelect option[value="blogs"]').attr('selected', 'selected');
			myJquery('#mySearchTypeSelect').css('background-color', '#FFF189');
		}
	}
	
	//=============================
	// add double quotes:
	// if all terms of the search string are in double quotes, we assume the "add double quotes" feature was on
	//=============================
	if(qsInQuery)
	{
		if(allTermsAreInDoubleQuotes(qsInQuery))
		{
			myJquery('#myEnableDoubleQuotesSelect option[value="on"]').attr('selected', 'selected');
		}
		else
		{
			myJquery('#myEnableDoubleQuotesSelect option[value="off"]').attr('selected', 'selected');	
		}
	}
	
	//=============================
	// number results per page
	//=============================
	var numParam = getQueryVariable('num');
	if(numParam)
	{
		myJquery('#myNumberResultsSelect option[value="' + numParam + '"]').attr('selected', 'selected');
	}
	
	//=============================
	// safe search
	//=============================
	var safeParam = getQueryVariable('safe');
	if(safeParam)
	{
		if(safeParam == "off")
		{
			myJquery('#mySafeSearchSelect option[value="off"]').attr('selected', 'selected');
		}
		else if(safeParam == "active")
		{
			myJquery('#mySafeSearchSelect option[value="active"]').attr('selected', 'selected');
		}
	}
	//=============================
	// query done but without "safe" param => moderate search
	//=============================
	else if(qsInQuery)
	{
		myJquery('#mySafeSearchSelect option[value="moderate"]').attr('selected', 'selected');
	}

	//=============================
	// time period
	//=============================
	var periodUrlParam = getQueryVariable('tbs');
	if(periodUrlParam && periodUrlParam.indexOf("qdr:") == 0)
	{
		var periodVal = periodUrlParam.substring(4, periodUrlParam.length);
		myJquery('#myPeriod option[value="' + periodVal + '"]').attr('selected', 'selected');
		
		if(periodVal != "")
		{
			myJquery('#myPeriod').css('background-color', '#FFF189');
		}
	}
	
	//=============================
	// lang
	//=============================
	var langUrlParam = getQueryVariable('lr');
	if(langUrlParam)
	{
		myJquery('#myLang option[value="' + langUrlParam + '"]').attr('selected', 'selected');
		myJquery('#myLang').css('background-color', '#FFF189');
	}
	
	//=============================
	// format
	//=============================
	var formatUrlParam = getQueryVariable('as_filetype');
	if(formatUrlParam)
	{
		myJquery('#myFormat option[value="' + formatUrlParam + '"]').attr('selected', 'selected');
		myJquery('#myFormat').css('background-color', '#FFF189');
	}
}

function search()
{
	var qs = myJquery("#mySearchField").val();
	if(qs.trim() == "")
	{
		return;
	}

    updateMySearchFormFields();
    myJquery("#mySearchForm").submit();
}

function updateMySearchFormFields()
{
	//=============================
	// search string
	//=============================
	var qs = myJquery("#mySearchField").val();

    var $mySearchForm = myJquery("#mySearchForm");
    if(typeof $mySearchForm[0].updated != 'undefined') 
    {
        return;
    }
    $mySearchForm[0].updated = true;

    myJquery('<input/>', {type:'hidden', name:'hl', value:'en'}).appendTo($mySearchForm);
    myJquery('<input/>', {type:'hidden', name:'btnG', value:'Search'}).appendTo($mySearchForm);
    myJquery('<input/>', {type:'hidden', name:'gbv', value:'1'}).appendTo($mySearchForm);

	// disable auto complete + google instant
	//
	// UPDATE: no need to disable that here. The "instant" process won't trigger
	// using the NoCrap search field anyway. And when hidding NoCrap, now instant will be enable,
	// if set as is, in the user Google preferences.
	//
	// UPDATE 2: It is actually required to be able to display more than 10 results!
	myJquery('<input/>', {type:'hidden', name:'complete', value:'0'}).appendTo($mySearchForm);

	//=============================
	// specific search type?
	//=============================
	var searchType = myJquery('#mySearchTypeSelect').val();
	var searchTypeVal = "";
	if(searchType == "videos")
	{
		searchTypeVal = 'vid';
	}
	else if(searchType == "images")
	{
		searchTypeVal = 'isch';
	}
	else if(searchType == "news")
	{
		searchTypeVal = 'nws';
	}
	else if(searchType == "blogs")
	{
		searchTypeVal = 'blg';
	}

	if(searchTypeVal != "")
	{
	    myJquery('<input/>', {type:'hidden', name:'tbm', value:searchTypeVal}).appendTo($mySearchForm);
	}
	
	//=============================
	// Add double quotes?
	//=============================
	var enableDoubleQuotes = myJquery('#myEnableDoubleQuotesSelect').val();
	if(enableDoubleQuotes == "on")
	{
		qs = addDoubleQuotes(qs);
	}

	//=============================
	// format and add search string
	//=============================
	myJquery("#mySearchField").val(qs);
	//url += '&q=' + encodeURIComponent(qs);
	
	//=============================
	// num results per page
	//=============================
	var numResults = myJquery("#myNumberResultsSelect").val();
	myJquery('<input/>', {type:'hidden', name:'num', value:numResults}).appendTo($mySearchForm);

	
	//=============================
	// safe search
	//=============================
	var safe = myJquery("#mySafeSearchSelect").val();
	var safeVal = "";
	if(safe == "off")
	{
		safeVal = 'off';
	}
	else if(safe == "active")
	{
	    safeVal = 'active';
	}
	else
	{
		// "moderate" is the default when the safe parameter is not set
	}
	if(safeVal != "")
	{
	    myJquery('<input/>', {type:'hidden', name:'safe', value:safeVal}).appendTo($mySearchForm);
	}
	
	//=============================
	// period
	//=============================
	var period = myJquery("#myPeriod").val();
	if(period != "")
	{
		myJquery('<input/>', {type:'hidden', name:'tbs', value:'qdr:' + period}).appendTo($mySearchForm);
	}
    
	//=============================
	// language
	//=============================
	var lang = myJquery("#myLang").val();
	if(lang != "" && lang != "---")
	{
		myJquery('<input/>', {type:'hidden', name:'lr', value:lang}).appendTo($mySearchForm);
	}
	
	//=============================
	// format
	//=============================
	var format = myJquery("#myFormat").val();
	if(format != "")
	{
		myJquery('<input/>', {type:'hidden', name:'as_filetype', value:format}).appendTo($mySearchForm);
	}
	
	//=============================
	// disable personalized web search
	// Note: some say it must be at the very end
	//=============================
	myJquery('<input/>', {type:'hidden', name:'pws', value:'0'}).appendTo($mySearchForm);
}

//=============================
// Center config div
//=============================
function centerConfig()
{
    myJquery('#myConfig').css("top", ((myJquery(window).height() - myJquery('#myConfig').outerHeight()) / 2) + myJquery(window).scrollTop() + "px");
    myJquery('#myConfig').css("left", ((myJquery(window).width() - myJquery('#myConfig').outerWidth()) / 2) + myJquery(window).scrollLeft() + "px");
}

//=============================
// Init Config window
//=============================
function initConfig()
{
	//=============================
	// Populate config with saved values, if any
	//=============================
	myJquery('#myConfigEnableDoubleQuotesValue option[value="' + unsafeWindow.getUserConfig('enableDoubleQuotes') + '"]').attr('selected', 'selected');
	if(unsafeWindow.getUserConfig('enableDoubleQuotesDisplay'))
	{
		myJquery('#myEnableDoubleQuotesDisplay').attr('checked','checked');
	}
	
	myJquery('#myConfigNumberResultsValue option[value="' + unsafeWindow.getUserConfig('numberResults') + '"]').attr('selected', 'selected');
	if(unsafeWindow.getUserConfig('numberResultsDisplay'))
	{
		myJquery('#myConfigNumberResultsDisplay').attr('checked','checked');
	}

	myJquery('#myConfigSafeSearchValue option[value="' + unsafeWindow.getUserConfig('safeSearch') + '"]').attr('selected', 'selected');
	if(unsafeWindow.getUserConfig('safeSearchDisplay'))
	{
		myJquery('#myConfigSafeSearchDisplay').attr('checked','checked');
	}
	
	myJquery('#myConfigSearchTypeValue option[value="' + unsafeWindow.getUserConfig('searchType') + '"]').attr('selected', 'selected');
	if(unsafeWindow.getUserConfig('searchTypeDisplay'))
	{
		myJquery('#myConfigSearchTypeDisplay').attr('checked','checked');
	}
	
	myJquery('#myConfigPeriodValue option[value="' + unsafeWindow.getUserConfig('period') + '"]').attr('selected', 'selected');
	if(unsafeWindow.getUserConfig('periodDisplay'))
	{
		myJquery('#myConfigPeriodDisplay').attr('checked','checked');
	}
	
	myJquery('#myConfigLangValue option[value="' + unsafeWindow.getUserConfig('lang') + '"]').attr('selected', 'selected');
	if(unsafeWindow.getUserConfig('langDisplay'))
	{
		myJquery('#myConfigLangDisplay').attr('checked','checked');
	}

	myJquery('#myConfigFormatValue option[value="' + unsafeWindow.getUserConfig('format') + '"]').attr('selected', 'selected');
	if(unsafeWindow.getUserConfig('formatDisplay'))
	{
		myJquery('#myConfigFormatDisplay').attr('checked','checked');
	}
	
	if(unsafeWindow.getUserConfig('fixbar'))
	{
		myJquery('#fixbar').attr('checked','checked');
	}
	
	//=============================
	// "Open config div" link
	//=============================
	myJquery('#myConfigLink').click(function()
	{
	    centerConfig();
	
	
		//=============================
		// Backup current values, in case user close the config
		// window without saving
		//=============================
		oldEnableDoubleQuotes = myJquery('#myConfigEnableDoubleQuotesValue').val();
		oldConfigNumberResults = myJquery('#myConfigNumberResultsValue').val();
		oldConfigSafeSearch = myJquery('#myConfigSafeSearchValue').val();
		oldConfigSearchType = myJquery('#myConfigSearchTypeValue').val();
		oldConfigPeriod = myJquery('#myConfigPeriodValue').val();
		oldConfigLang = myJquery('#myConfigLangValue').val();
		oldConfigFormat = myJquery('#myConfigFormatValue').val();
		oldFixbar = myJquery('#fixbar').is(':checked');
		
		oldEnableDoubleQuotesDisplay = myJquery('#myEnableDoubleQuotesDisplay').is(':checked');
		oldNumberResultsDisplay = myJquery('#myConfigNumberResultsDisplay').is(':checked');
		oldConfigSafeSearchDisplay = myJquery('#myConfigSafeSearchDisplay').is(':checked');
		oldConfigSearchTypeDisplay = myJquery('#myConfigSearchTypeDisplay').is(':checked');
		oldConfigPeriodDisplay = myJquery('#myConfigPeriodDisplay').is(':checked');
		oldConfigLangDisplay = myJquery('#myConfigLangDisplay').is(':checked');
		oldConfigFormatDisplay = myJquery('#myConfigFormatDisplay').is(':checked');
		
		myJquery("#myConfig").css("display", "block");
		return false;
	});
	
	//=============================
	// "Close config div" link
	//=============================
	myJquery('#myConfigRemoveLink').click(function()
	{
		//=============================
		// Back to the old values
		//
		// calling unsafeWindow.getUserConfig() here doesn't work
		// http://wiki.greasespot.net/Greasemonkey_access_violation
		//=============================
		myJquery('#myConfigEnableDoubleQuotesValue option[value="' + oldEnableDoubleQuotes + '"]').attr('selected', 'selected');
		myJquery('#myConfigNumberResultsValue option[value="' + oldConfigNumberResults + '"]').attr('selected', 'selected');
		myJquery('#myConfigSafeSearchValue option[value="' + oldConfigSafeSearch + '"]').attr('selected', 'selected');
		myJquery('#myConfigSearchTypeValue option[value="' + oldConfigSearchType + '"]').attr('selected', 'selected');
		myJquery('#myConfigPeriodValue option[value="' + oldConfigPeriod + '"]').attr('selected', 'selected');
		myJquery('#myConfigLangValue option[value="' + oldConfigLang + '"]').attr('selected', 'selected');
		myJquery('#myConfigFormatValue option[value="' + oldConfigFormat + '"]').attr('selected', 'selected');
		
		if(oldFixbar)
		{
			myJquery('#fixbar').attr('checked','checked');
		}
		else
		{
		    myJquery('#fixbar').removeAttr('checked');
		}
		
		if(oldEnableDoubleQuotesDisplay)
		{
			myJquery('#myEnableDoubleQuotesDisplay').attr('checked','checked');
		}
		else
		{
			myJquery('#myEnableDoubleQuotesDisplay').removeAttr('checked');
		}
		
		if(oldNumberResultsDisplay)
		{
			myJquery('#myConfigNumberResultsDisplay').attr('checked','checked');
		}
		else
		{
			myJquery('#myConfigNumberResultsDisplay').removeAttr('checked');
		}
		
		if(oldConfigSafeSearchDisplay)
		{
			myJquery('#myConfigSafeSearchDisplay').attr('checked','checked');
		}
		else
		{
			myJquery('#myConfigSafeSearchDisplay').removeAttr('checked');
		}
		
		if(oldConfigSearchTypeDisplay)
		{
			myJquery('#myConfigSearchTypeDisplay').attr('checked','checked');
		}
		else
		{
			myJquery('#myConfigSearchTypeDisplay').removeAttr('checked');
		}
		
		if(oldConfigPeriodDisplay)
		{
			myJquery('#myConfigPeriodDisplay').attr('checked','checked');
		}
		else
		{
			myJquery('#myConfigPeriodDisplay').removeAttr('checked');
		}
		
		if(oldConfigLangDisplay)
		{
			myJquery('#myConfigLangDisplay').attr('checked','checked');
		}
		else
		{
			myJquery('#myConfigLangDisplay').removeAttr('checked');
		}
		
		if(oldConfigFormatDisplay)
		{
			myJquery('#myConfigFormatDisplay').attr('checked','checked');
		}
		else
		{
			myJquery('#myConfigFormatDisplay').removeAttr('checked');
		}
		
		myJquery("#myConfig").css("display", "none");
		return false;
	});
	
	//=============================
	// "Save" button
	//=============================
	myJquery('#myConfigSaveBtn').click(function()
	{
		var val = myJquery("#myConfigEnableDoubleQuotesValue").val();
		unsafeWindow.setUserConfig('enableDoubleQuotes', val);
		myJquery('#myEnableDoubleQuotesSelect option[value="' + val + '"]').attr('selected', 'selected');
		
		val = myJquery('#myEnableDoubleQuotesDisplay').is(':checked');
		unsafeWindow.setUserConfig('enableDoubleQuotesDisplay', val);
		
		if(val)
		{
			myJquery("#myEnableDoubleQuotesSelect").css("display", "inline");
		}
		else
		{
			myJquery("#myEnableDoubleQuotesSelect").css("display", "none");
		}
	
	
		var val = myJquery("#myConfigNumberResultsValue").val();
		unsafeWindow.setUserConfig('numberResults', val);
		myJquery('#myNumberResultsSelect option[value="' + val + '"]').attr('selected', 'selected');
		
		val = myJquery('#myConfigNumberResultsDisplay').is(':checked');
		unsafeWindow.setUserConfig('numberResultsDisplay', val);
		
		if(val)
		{
			myJquery("#myNumberResultsSelect").css("display", "inline");
		}
		else
		{
			myJquery("#myNumberResultsSelect").css("display", "none");
		}

		val = myJquery("#myConfigSafeSearchValue").val();
		unsafeWindow.setUserConfig('safeSearch', val);
		myJquery('#mySafeSearchSelect option[value="' + val + '"]').attr('selected', 'selected');
		
		val = myJquery('#myConfigSafeSearchDisplay').is(':checked');
		unsafeWindow.setUserConfig('safeSearchDisplay', val);
		
		if(val)
		{
			myJquery("#mySafeSearchSelect").css("display", "inline");
		}
		else
		{
			myJquery("#mySafeSearchSelect").css("display", "none");
		}
		
		val = myJquery("#myConfigSearchTypeValue").val();
		unsafeWindow.setUserConfig('searchType', val);
		myJquery('#mySearchTypeSelect option[value="' + val + '"]').attr('selected', 'selected');
		
		val = myJquery('#myConfigSearchTypeDisplay').is(':checked');
		unsafeWindow.setUserConfig('searchTypeDisplay', val);
		
		if(val)
		{
			myJquery("#mySearchTypeSelect").css("display", "inline");
		}
		else
		{
			myJquery("#mySearchTypeSelect").css("display", "none");
		}

		val = myJquery("#myConfigPeriodValue").val();
		unsafeWindow.setUserConfig('period', val);
		myJquery('#myPeriod option[value="' + val + '"]').attr('selected', 'selected');
		
		val = myJquery('#myConfigPeriodDisplay').is(':checked');
		unsafeWindow.setUserConfig('periodDisplay', val);
		
		if(val)
		{
			myJquery("#myPeriod").css("display", "inline");
		}
		else
		{
			myJquery("#myPeriod").css("display", "none");
		}
		
		val = myJquery("#myConfigLangValue").val();
		unsafeWindow.setUserConfig('lang', val);
		myJquery('#myLang option[value="' + val + '"]').attr('selected', 'selected');
		
		val = myJquery('#myConfigLangDisplay').is(':checked');
		unsafeWindow.setUserConfig('langDisplay', val);
		
		if(val)
		{
			myJquery("#myLang").css("display", "inline");
		}
		else
		{
			myJquery("#myLang").css("display", "none");
		}
		
		val = myJquery("#myConfigFormatValue").val();
		unsafeWindow.setUserConfig('format', val);
		myJquery('#myFormat option[value="' + val + '"]').attr('selected', 'selected');
		
		val = myJquery('#myConfigFormatDisplay').is(':checked');
		unsafeWindow.setUserConfig('formatDisplay', val);

		if(val)
		{
			myJquery("#myFormat").css("display", "inline");
		}
		else
		{
			myJquery("#myFormat").css("display", "none");
		}
		
		val = myJquery('#fixbar').is(':checked');
		unsafeWindow.setUserConfig('fixbar', val);
		if(val)
		{
		    myJquery("#myWrapper").css("position", "fixed");
		}
		else
		{
		    myJquery("#myWrapper").css("position", "absolute");
		}
		
		myJquery("#myConfig").css("display", "none");
		return false;
	});

}

//=============================
// Hide NoCrap
//=============================
function hideNoCrap()
{
	var gSearchField = myJquery('input[name=q]');
	
	//=============================
	// copy text from nocrap to original text field
	//=============================
	gSearchField.val(myJquery("#mySearchField").val());
	
	myJquery("#myWrapper").remove();
	
	//=============================
	// remove focus handler
	//=============================
	gSearchField.off('focus.myFocusHandler');
	
	//=============================
	// Give focus back to original input
	//=============================
	gSearchField.focus();
    var len = gSearchField.val().length * 2;
    try
    {
    	gSearchField[0].setSelectionRange(len, len);
    }
    catch(err)
    {
    	// too bad
    }
	
	//=============================
	// Re-enable "Live preview"
	//=============================
	GM_addStyle(".vspii{display:block !important;}");
	GM_addStyle(".vspib{display:block !important;}");
	
	//=============================
	// Re-enable Google buttons
	//=============================
	myJquery('input[name="btnK"], button[name="btnK"]').removeAttr("disabled");
	myJquery('input[name="btnI"], button[name="btnI"]').removeAttr("disabled");	
	myJquery('input[name="btnG"], button[name="btnG"]').removeAttr("disabled");
	
	//=============================
	// Make the black menu "showable" again
	//=============================
	myJquery("#gbz").removeClass("gMenuAjusted");
	
	//=============================
	// Enable the iframes back
	//=============================
	myJquery("iframe").removeClass("iframeAjusted");
}

//=============================
// Focus on NoCrap search field
//=============================
unsafeWindow.focusOnNoCrapSearchField = function()
{
	var searchField = myJquery("#mySearchField");
	
	// in case user began typing while the page was loading... 
	if(searchField.val() == "")
	{
		searchField.val(myJquery('input[name=q]').val());
	}
	
	searchField.focus();
	
	// break the interface when searching from the url bar directly
	// ex: http://www.google.com/search?ie=UTF-8&oe=UTF-8&sourceid=navclient&gfns=1&q=aaa+bbb
	//myJquery('input[name=q]').val("");
	
    var len = searchField.val().length * 2;
    try
    {
    	searchField[0].setSelectionRange(len, len);
    }
    catch(err)
    {
    	// too bad
    } 
}

//=============================
// "enable double quotes" options HTML
//=============================
function getEnableDoubleQuotesOptionsHtml()
{
	return '<option value="on">"on"</option><option value="off">"off"</option>';
}

//=============================
// "Number results" options HTML
//=============================
function getNumberResultsOptionsHtml()
{
	return '<option value="10">10</option><option value="20">20</option><option value="30">30</option><option value="40">40</option><option value="50">50</option><option value="100">100</option>';
}

//=============================
// "Safe search" options HTML
//=============================
function getSafeSearchOptionsHtml()
{
	return '<option value="active">safe</option><option value="moderate">moderate</option><option value="off">off</option>';
}

//=============================
// "Search type" options HTML
//=============================
function getSearchTypeOptionsHtml()
{
	return '<option value="">everything</option><option value="images">Images</option><option value="videos">Videos</option><option value="news">News</option><option value="blogs">Blogs</option>';
}

//=============================
// "Period" options HTML
//=============================
function getPeriodOptionsHtml()
{
	return '<option value="">anytime</option><option value="d">Past 24 hours</option><option value="w">Past week</option><option value="m">Past month</option><option value="y">Past year</option>';
}

//=============================
// "Lang" options HTML
//=============================
function getLangOptionsHtml()
{
	return '<option value="" selected>any language</option><option value="lang_en">English</option><option value="lang_fr">French</option><option value="---">--------</option><option value="lang_af">Afrikaans</option><option value="lang_ar">Arabic</option><option value="lang_hy">Armenian</option><option value="lang_be">Belarusian</option><option value="lang_bg">Bulgarian</option><option value="lang_ca">Catalan</option><option value="lang_zh-CN">Chinese&nbsp;(Simplified)</option><option value="lang_zh-TW">Chinese&nbsp;(Traditional)</option><option value="lang_hr">Croatian</option><option value="lang_cs">Czech</option><option value="lang_da">Danish</option><option value="lang_nl">Dutch</option><option value="lang_eo">Esperanto</option><option value="lang_et">Estonian</option><option value="lang_tl">Filipino</option><option value="lang_fi">Finnish</option><option value="lang_de">German</option><option value="lang_el">Greek</option><option value="lang_iw">Hebrew</option><option value="lang_hi">Hindi</option><option value="lang_hu">Hungarian</option><option value="lang_is">Icelandic</option><option value="lang_id">Indonesian</option><option value="lang_it">Italian</option><option value="lang_ja">Japanese</option><option value="lang_ko">Korean</option><option value="lang_lv">Latvian</option><option value="lang_lt">Lithuanian</option><option value="lang_no">Norwegian</option><option value="lang_fa">Persian</option><option value="lang_pl">Polish</option><option value="lang_pt">Portuguese</option><option value="lang_ro">Romanian</option><option value="lang_ru">Russian</option><option value="lang_sr">Serbian</option><option value="lang_sk">Slovak</option><option value="lang_sl">Slovenian</option><option value="lang_es">Spanish</option><option value="lang_sw">Swahili</option><option value="lang_sv">Swedish</option><option value="lang_th">Thai</option><option value="lang_tr">Turkish</option><option value="lang_uk">Ukrainian</option><option value="lang_vi">Vietnamese</option>';
}

//=============================
// "Format" options HTML
//=============================
function getFormatOptionsHtml()
{
	return '<option value="" selected>any format</option><option value="pdf">Adobe Acrobat PDF (.pdf)</option><option value="mp3">MP3 Audio (.mp3)</option><option value="ps">Adobe Postscript (.ps)</option><option value="dwf">Autodesk DWF (.dwf)</option><option value="kml">Google Earth KML (.kml)</option><option value="kmz">Google Earth KMZ (.kmz)</option><option value="xls">Microsoft Excel (.xls)</option><option value="ppt">Microsoft Powerpoint (.ppt)</option><option value="doc">Microsoft Word (.doc)</option><option value="rtf">Rich Text Format (.rtf)</option><option value="swf">Shockwave Flash (.swf)</option>';
}

//=============================
// Add NoCrap HTML
//=============================
function addNoCrapHtml()
{
	var html = '';
	html += '<div id="myWrapper">';
	html += 	'<div id="myConfigLinkWrap"><a href="#" id="myConfigLink" title="">[Config]</a></div>';
	html += 	'<div id="myRemove"><a href="#" id="myRemoveLink" title="Hide the NoCrap bar (double-click on the bar works too!)">[X]</a></div>';
	html += 	'<div id="myInnerDiv">';
	html += 		'<form autocomplete="on" id="mySearchForm" method="GET" action="/search">';
	html += 		    '<input type="text" id="mySearchField" name="q" autocomplete="on" />&nbsp;&nbsp;<input type="submit" id="mySearchBut" value="search" />';
	html += 		'</form>';
	html += 		'<div id="myOptions">';
	html += 			'<select id="myEnableDoubleQuotesSelect">' + getEnableDoubleQuotesOptionsHtml() + '</select>';
	html += 			'<select id="myNumberResultsSelect">' + getNumberResultsOptionsHtml() + '</select>';
	html += 			'<select id="mySafeSearchSelect">' + getSafeSearchOptionsHtml() + '</select>';
	html += 			'<select id="mySearchTypeSelect">' + getSearchTypeOptionsHtml() + '</select>';
	html += 			'<select id="myPeriod">' + getPeriodOptionsHtml() + '</select>';
	html += 			'<select id="myLang">' + getLangOptionsHtml() + '</select>';
	html += 			'<select id="myFormat">' + getFormatOptionsHtml() + '</select>';
	html += 		'</div>';
	html += 	'</div>';
	html += '</div>';
	
	// config div
	html += '<div id="myConfig" style="display:none;">';
	html += 	'<div id="myConfigRemove"><a href="#" id="myConfigRemoveLink">[X]</a></div>';
	html += 	'<div id="myConfigTitle">NoCrap Google Search Bar - Configuration</div>';
	html += 	'<hr />';
	
	html += 	'<table cellspacing="0" cellpadding="0">';
	html += 		'<tr id="header">';
	html += 			'<td>';
	html += 				'Display';
	html += 			'</td>';
	html += 			'<td>';
	html += 				'Config';
	html += 			'</td>';
	html += 			'<td>';
	html += 				'Default';
	html += 			'</td>';
	html += 		'</tr>';
	
	// Enable double quotes
	html += 		'<tr>';
	html += 			'<td>';
	html += 				'<input type="checkbox" id="myEnableDoubleQuotesDisplay" />';
	html += 			'</td>';
	html += 			'<td>';
	html += 				'<label for="myEnableDoubleQuotesDisplay">Add double quotes</label>';
	html += 			'</td>';
	html += 			'<td>';
	html += 				'<select id="myConfigEnableDoubleQuotesValue">' + getEnableDoubleQuotesOptionsHtml() + '</select>';
	html += 			'</td>';
	html += 		'</tr>';	
	
	// Number results
	html += 		'<tr>';
	html += 			'<td>';
	html += 				'<input type="checkbox" id="myConfigNumberResultsDisplay" />';
	html += 			'</td>';
	html += 			'<td>';
	html += 				'<label for="myConfigNumberResultsDisplay">Number results</label>';
	html += 			'</td>';
	html += 			'<td>';
	html += 				'<select id="myConfigNumberResultsValue">' + getNumberResultsOptionsHtml() + '</select>';
	html += 			'</td>';
	html += 		'</tr>';
	
	// Safe Search
	html += 		'<tr>';
	html += 			'<td>';
	html += 				'<input type="checkbox" id="myConfigSafeSearchDisplay" />';
	html += 			'</td>';
	html += 			'<td>';
	html += 				'<label for="myConfigSafeSearchDisplay">Safe Search</label>';
	html += 			'</td>';
	html += 			'<td>';
	html += 				'<select id="myConfigSafeSearchValue">' + getSafeSearchOptionsHtml() + '</select>';
	html += 			'</td>';
	html += 		'</tr>';
	
	// Search type
	html += 		'<tr>';
	html += 			'<td>';
	html += 				'<input type="checkbox" id="myConfigSearchTypeDisplay" />';
	html += 			'</td>';
	html += 			'<td>';
	html += 				'<label for="myConfigSearchTypeDisplay">Search type</label>';
	html += 			'</td>';
	html += 			'<td>';
	html += 				'<select id="myConfigSearchTypeValue">' + getSearchTypeOptionsHtml() + '</select>';
	html += 			'</td>';
	html += 		'</tr>';
	
	// Period
	html += 		'<tr>';
	html += 			'<td>';
	html += 				'<input type="checkbox" id="myConfigPeriodDisplay" />';
	html += 			'</td>';
	html += 			'<td>';
	html += 				'<label for="myConfigPeriodDisplay">Date</label>';
	html += 			'</td>';
	html += 			'<td>';
	html += 				'<select id="myConfigPeriodValue">' + getPeriodOptionsHtml() + '</select>';
	html += 			'</td>';
	html += 		'</tr>';
	
	// Lang
	html += 		'<tr>';
	html += 			'<td>';
	html += 				'<input type="checkbox" id="myConfigLangDisplay" />';
	html += 			'</td>';
	html += 			'<td>';
	html += 				'<label for="myConfigLangDisplay">Language</label>';
	html += 			'</td>';
	html += 			'<td>';
	html += 				'<select id="myConfigLangValue">' + getLangOptionsHtml() + '</select>';
	html += 			'</td>';
	html += 		'</tr>';
	
	// Format
	html += 		'<tr>';
	html += 			'<td>';
	html += 				'<input type="checkbox" id="myConfigFormatDisplay" />';
	html += 			'</td>';
	html += 			'<td>';
	html += 				'<label for="myConfigFormatDisplay">Format</label>';
	html += 			'</td>';
	html += 			'<td>';
	html += 				'<select id="myConfigFormatValue">' + getFormatOptionsHtml() + '</select>';
	html += 			'</td>';
	html += 		'</tr>';
	
	html += 	'</table>';
	
	html += 	'<div id="otherConfigDiv">';
	html += 	    '<div id="otherConfigTitle">Other config</div>';
	html += 	    '<input type="checkbox" id="fixbar" /><label for="fixbar">Fix NoCrap at the top</label>';
	html += 	'</div>';
	
	html += 	'<div id="myConfigHomeDiv"><a href="http://userscripts.org/scripts/show/120144">NoCrap on userscripts.org</a></div>';
	html += 	'<div id="myConfigSaveBtnDiv"><input type="button" id="myConfigSaveBtn" value="Save" /></div>';
	
	html += '</div>';
	
	myJquery("body").prepend(html);
	//document.body.appendChild(htmlToDomNode(html));
}

//=============================
// Add custom style
//=============================
function addCustomStyle()
{
	var mystyle = "";
	
	//=============================
	// NoCrap bar
	//=============================
	mystyle += "#myWrapper {position:absolute;left:0px;top:0px;width:100%;height:101px;font-family:arial,sans-serif;color:#565656;background-color:#F5F5F5;border-bottom:solid 1px #E5E5E5;z-index:4000;}";
	mystyle += "#myInnerDiv {margin-top:22px;width:680px;margin:22px auto 0px auto;}";

	mystyle += "#mySearchField {padding:4px;width:500px;font-size:20px;color:#444444;border:solid 1px #D9D9D9;font-family:arial,sans-serif;}";
	mystyle += "#mySearchBut{padding:2px 14px;font-size:20px;color:#565656;font-family:arial,sans-serif;}";

	mystyle += "#myRemove{position:absolute;top:2px;right:6px;}";
	mystyle += "#myRemoveLink{color:#B7B7B7;text-decoration:none;font-family:verdana;}";
	mystyle += "#myRemoveLink:hover{color:#800000;}";
	
	mystyle += "#myConfigLinkWrap{position:absolute;top:2px;right:30px;}";
	mystyle += "#myConfigLink{color:#B7B7B7;text-decoration:none;font-family:verdana;}";
	mystyle += "#myConfigLink:hover{color:#007F0E;}";

	mystyle += "#myOptions{margin-top:4px;text-align:left;}";
	mystyle += "#myOptions select{display:none;font-size:10px;border:solid 1px #C0C0C0;margin-right:10px;background-color:#FFFFFF;}";

	
	//=============================
	// Remove the arrows that show the "live preview" sections
	//=============================
	mystyle += ".vspii{display:none !important}";
	mystyle += ".vspib{display:none !important}";
	
	//=============================
	// Bring back the "Cached" links
	//=============================
	mystyle += ".vshid {display: inline !important; margin-left:7px !important;}";

	//=============================
	// Config div
	//=============================
	mystyle += "#myConfig{position:absolute;left:100px;top:100px;height:340px;width:400px;padding:20px;background-color:#F5F5F5;z-index:5000;-moz-box-shadow:0px 0px 10px #000; -webkit-box-shadow:0px 0px 10px #000; box-shadow:0px 0px 10px #000;}";
	mystyle += "#myConfig a{color:#565656;}";
	mystyle += "#myConfigRemove{position:absolute;top:4px;right:6px;}";
	mystyle += "#myConfigRemoveLink{text-decoration:none;font-family:verdana;}";
	mystyle += "#myConfigRemoveLink:hover{color:#800000;}";
	mystyle += "#myConfigTitle{font-size:16px;font-weight:bold;color:#000000;}";
	mystyle += "#myConfig table td{padding:2px 10px;}";
	mystyle += "#myConfig table tr#header td{font-weight:bold;padding:10px 10px;text-decoration:underline;}";
	mystyle += "#myConfig table select{font-size:10px;border:solid 1px #C0C0C0;margin-right:10px;background-color:#FFFFFF;}";
	mystyle += "#myConfigSaveBtnDiv {position:absolute;bottom:10px;right:10px;}";
	mystyle += "#myConfigHomeDiv {position:absolute;bottom:10px;left:10px;}";
	mystyle += "#myConfigHomeDiv a {padding:2px 6px;text-decoration:underline;color:#005D00;}";
	mystyle += "#myConfigHomeDiv a:hover {color:#000000;}";
	mystyle += "#myConfigSaveBtn{padding:2px 14px;font-size:14px;font-family:arial,sans-serif;}";
	mystyle += "#otherConfigDiv{margin-left:10px;margin-top:20px;}";
	mystyle += "#otherConfigTitle{font-weight:bold;text-decoration:underline;margin-bottom:6px;}";
	
	GM_addStyle(mystyle);	
}
// no need to wait for JQuery: add custom style right now..
addCustomStyle();

//=============================
//Main function, called when jquery is loaded
//=============================
function main() 
{
	//=============================
	// Make the left/black menu hidden by default, if it exists
	//=============================
	GM_addStyle(".gMenuAjusted{display:none !important;}");
	myJquery("#gbz").addClass("gMenuAjusted");

	//=============================
	// Disable some Google buttons
	//=============================
	myJquery('input[name="btnK"], button[name="btnK"]').attr("disabled", "disabled");
	myJquery('input[name="btnI"], button[name="btnI"]').attr("disabled", "disabled");
	myJquery('input[name="btnG"], button[name="btnG"]').attr("disabled", "disabled");
	
	//=============================
	// NoCrap bar HTML
	//=============================
	addNoCrapHtml();
	
	//=============================
	// On form submission
	//=============================
    myJquery('#mySearchForm').submit(function (evt) 
    {
    	var qs = myJquery("#mySearchField").val();
    	if(qs.trim() == "")
    	{
            evt.preventDefault();
            return false;
    	}

        updateMySearchFormFields();
    });
	
	//=============================
	// Fix Nocrap at the top?
	//=============================
	if(unsafeWindow.getUserConfig('fixbar'))
	{
		myJquery("#myWrapper").css("position", "fixed");
	}
	else
	{
	    myJquery("#myWrapper").css("position", "absolute");
	}
	
	myJquery("#myNumberResultsSelect, #mySafeSearchSelect, #mySearchTypeSelect, #myPeriod, #myLang, #myFormat").change(function()
	{
		setTimeout(search, 0);
	});
	
	//=============================
	// Chnage "add double quotes" to "off" => we try to remove the
	// double-quotes and then we launch the search
	//=============================
	myJquery("#myEnableDoubleQuotesSelect").change(function()
	{
		if(myJquery(this).val() == "off")
		{
			myJquery("#mySearchField").val(removeDoubleQuotes(myJquery("#mySearchField").val()));
		}
		search();
	});

	//=============================
	// Set default values
	//=============================
	setFieldsValuesFromSavedValues();
	
	//=============================
	// Populate inputs from current url info
	//=============================
	populateFields();
	
	//=============================
	// Show/hide dropdowns
	//=============================
	unsafeWindow.showHideFieldsFromSavedValues();
	
	//=============================
	// Manage focus
	//=============================
	myJquery('input[name=q]').on('focus.myFocusHandler', function(event)
	{
		unsafeWindow.focusOnNoCrapSearchField();
	});

	myJquery(document).ready(function() 
	{
		//=============================
		// We disable the iframes that may battle to get
		// the focus.
		//=============================
		GM_addStyle(".iframeAjusted{display:none !important;}");
		myJquery("iframe").addClass("iframeAjusted");
		
		unsafeWindow.focusOnNoCrapSearchField();
	});

	//=============================
	// "Remove NoCrap bar" options
	//=============================
	
	// using the [X] link
	myJquery('#myRemoveLink').click(function()
	{
		hideNoCrap();
		return false;
	});
	// we do not remove it on double-click on the inputs!
	myJquery('#myWrapper input').dblclick(function(event)
	{
		event.isPropagationStopped();
		return false;
	});
	// double-clicking on the rest of the div hide NoCrap
	myJquery('#myWrapper').dblclick(function()
	{
		hideNoCrap();
	});

	//=============================
	// Check for modifications on the hash part of the url and repopulate
	// NoCrap with the new info, if it has changed.
	//
	// We also use the "pageshow" event so the fields are
	// synced with the page when the back/forward buttons are used.
	//=============================
	myJquery(window).bind('hashchange pageshow', function() 
	{
		populateFields();
		myJquery("#mySearchField").focus();
	});
	
	//=============================
	// Prevent Google to change the links on mousedown
	// @author Rob W
	// @see http://webapps.stackexchange.com/questions/22291/turning-off-google-search-results-indirection
	//=============================
	Object.defineProperty(unsafeWindow, "rwt", {value: function() { return !0 } });
	
	initConfig();
}

