// ==UserScript==
// @name			Google Analytics Content Search Menu Command
// @author			Erik Vold
// @namespace		gaContentSearchMenuCmd
// @description		Quickly find details about a content page using this Greasemonkey menu command.
// @version			0.1
// @datecreated		2009-07-30
// @lastupdated		2009-07-30
// @include			*google.com/analytics/*
// ==/UserScript==


function runGMSearch( str ){
	if ( !str && unsafeWindow.ubiquityGMInput && unsafeWindow.ubiquityGMInput.length ) {
		var str = unsafeWindow.ubiquityGMInput;

		// reset for next execution
		unsafeWindow.ubiquityGMInput = "";
	}
	else if ( !str ) {
		var str = prompt("Search for content containing:");
	}

	var startdate = document.getElementById('f_primaryBegin');
	var enddate = document.getElementById('f_primaryEnd');
	var comp_start = document.getElementById('f_comparisonBegin');
	var comp_end = document.getElementById('f_comparisonEnd');
	var search_value = str;

	var strHref = window.location.href;
	var cur_start = startdate.value;
	var cur_end = enddate.value;
	var cur_comp_start = comp_start.value;
	var cur_comp_end = comp_end.value;

	cur_start = changeDateString(cur_start);
	cur_end = changeDateString(cur_end);

	var scid = getURLParam("scid")
	if(cur_start == ""){
		var date_range = getURLParam("pdr");
		var index1 = date_range.indexOf("-");
		cur_start = date_range.substring(0,index1);
		cur_end = date_range.substring(index1 + 1);
		//alert(cur_start + "-" + cur_end);
	}
	if(scid != " "){
		cur_end = cur_end + "&scid=" + scid;
	}

	cur_comp_start = changeDateString(cur_comp_start);
	cur_comp_end = changeDateString(cur_comp_end);

	var cur_id = getURLParam("id");

	window.location.href = "https://www.google.com/analytics/reporting/top_content?id=" + cur_id + "&pdr=" + cur_start + "-" + cur_end + "&cmp=average&q=" + search_value + "&qtyp=0&tst=0";

	return false;
}


function getURLParam(strParamName){
	var strReturn = "";
	var strHref = window.location.href;
	if ( strHref.indexOf("?") > -1 ){
		var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
		var aQueryString = strQueryString.split("&");
		for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
			if ( aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1 ) {
				var aParam = aQueryString[iParam].split("=");
				strReturn = aParam[1];
				break;
			}
		}
	}
	return unescape(strReturn);
}



function changeDateString(date){
	var month = date.substring(0,2);
	var day = date.substring(3,5);
	var year = date.substring(6,10);
	var new_date = year + month + day;

	return new_date;
}

GM_registerMenuCommand( "Content Search", runGMSearch, "", "", "c" );