// Google Analytics Quick Content Search
// version 0.1 BETA!
// 2009-05-07
// Copyright (c) 2009, New Media Gateway
// Author: Tyson Kirksey, Consultant
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           GA Quick Content Search
// @namespace      tysonkirksey.com
// @description    Quickly find details about a content page using a search box
// @include        http://www.google.com/analytics/*
// @include        https://www.google.com/analytics/*
// ==/UserScript==

var main, logo, button1, button2, button3, new_date_select, mm, dd, yyyy, compare, logo2;
main = document.getElementById('custom_report_nav_item');

if (main) {
    var logo2 = document.createElement("div");	
		
		logo2.innerHTML = "<div class='menu-item' style='height: 30px;'><b><input type='textbox' size='25' id='gm_search_box' name='gm_search_box' style='height: 14px; float: left; font-style: italic; font-size: 90%; background: #EEE;' value='Search for Content' onclick='this.value=\"\";'><input id='gm_search_go' type='button' value='Find!' style='height: 20px; font-size: 90%;'></b></div>";
		
    //insert new HTML
		main.parentNode.insertBefore(logo2, main);
		
		//add event handlers	
		var gm_search_form=document.getElementById("gm_search_go");
		gm_search_form.addEventListener("click", runGMSearch, true);
		
		//add event handlers	
		var gm_search_box=document.getElementById("gm_search_box");
		gm_search_box.addEventListener("keydown", 
					function(event){if(event.keyCode == 13)runGMSearch();}, 
					true
		);
}

function runGMSearch()
{
	
	var startdate = document.getElementById('f_primaryBegin');
  var enddate = document.getElementById('f_primaryEnd');
	var comp_start = document.getElementById('f_comparisonBegin');
	var comp_end = document.getElementById('f_comparisonEnd');
	var search_value = document.getElementById('gm_search_box').value;
	
	var strHref = window.location.href;
    
  var cur_start = startdate.value;
  var cur_end = enddate.value;
	var cur_comp_start = comp_start.value;
	var cur_comp_end = comp_end.value;
	
	cur_start = changeDateString(cur_start);
  cur_end = changeDateString(cur_end);
	
	var scid = getURLParam("scid")
	
	if(cur_start == "")
	{
		 var date_range = getURLParam("pdr");
		 var index1 = date_range.indexOf("-");
		 cur_start = date_range.substring(0,index1);
		 cur_end = date_range.substring(index1 + 1);
		 //alert(cur_start + "-" + cur_end);
	}
	if(scid != " ")
	{
	   cur_end = cur_end + "&scid=" + scid;
	}
  
	cur_comp_start = changeDateString(cur_comp_start);
	cur_comp_end = changeDateString(cur_comp_end);
	
	var cur_id = getURLParam("id");
	
	window.location.href = "https://www.google.com/analytics/reporting/top_content?id=" + cur_id + "&pdr=" + cur_start + "-" + cur_end + "&cmp=average&q=" + search_value + "&qtyp=0&tst=0";
		
	/*
	if(strHref.indexOf('pdr') > 0)
  {
    var strHref2 = strHref.replace("pdr","lmn");
  	strHref2 = strHref2.replace("average","date_range");
  	strHref2 = strHref2.replace("cdr","xyz");
		//strHref2 = strHref2.replace("#","");
		var index1 = strHref2.indexOf("#");
		strHref2 = strHref2.substring(0,index1);
		
		var strHref3 = strHref2 + "&pdr=" + cur_start + "-" + cur_end + "&cdr=" + compare_start + "-" + compare_end;
    
		//reload page with new dates
    //window.location.href = strHref3;
		
		
		
		
		
		//https://www.google.com/analytics/reporting/top_content?id=16051147&pdr=20090406-20090506&cmp=average&rpt=content.TopContentReport&segkey=request_uri&q=pizza&qtyp=0&tst=0
	}
	*/
	
	return false;
}

function CancelDates()
{
	document.getElementById("f_comparisonEnabledCheckbox").checked = false;	
	unsafeWindow.dateInputView.setCompareOption();
}


function getURLParam(strParamName){
  var strReturn = "";
  var strHref = window.location.href;
  if ( strHref.indexOf("?") > -1 ){
    var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
    var aQueryString = strQueryString.split("&");
    for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
      if (
aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1 ){
        var aParam = aQueryString[iParam].split("=");
        strReturn = aParam[1];
        break;
      }
    }
  }
  return unescape(strReturn);
} 



function CustomDates()
{
	if(document.getElementById("f_comparisonEnabledCheckbox").checked == false)
	{
  	document.getElementById("f_comparisonEnabledCheckbox").checked = true;	
  	unsafeWindow.dateInputView.setCompareOption();
	}
}


function CompareLastYear()
{
  var startdate = document.getElementById('f_primaryBegin');
  var enddate = document.getElementById('f_primaryEnd');
	
	var strHref = window.location.href;
  
  //startdate.value = mm + '/01/' + yyyy;
  //enddate.value = mm + '/' + dd + '/' + yyyy;
  
  //var gm_date_form = document.getElementById("f_apply");
  //gm_date_form.disabled = false;
  
  var cur_start = startdate.value;
  var cur_end = enddate.value;
	var compare_start;
	var compare_end;
  
  cur_start = changeDateString(cur_start);
  cur_end = changeDateString(cur_end);
	
	compare_start = cur_start;
	compare_end = cur_end;
	
  if(cur_start.indexOf('2009') > -1)
	  compare_start = compare_start.replace("2009","2008");
	else if(cur_start.indexOf('2008') > -1)
	  compare_start = compare_start.replace("2008","2007");
	else if(cur_start.indexOf('2007') > -1)
	  compare_start = compare_start.replace("2007","2006");
		
	if(cur_end.indexOf('2009') > -1)
	  compare_end = compare_end.replace("2009","2008");
	else if(cur_end.indexOf('2008') > -1)
	  compare_end = compare_end.replace("2008","2007");
	else if(cur_end.indexOf('2007') > -1)
	  compare_end = compare_end.replace("2007","2006");
		
		
	if(strHref.indexOf('pdr') > 0)
  {
    var strHref2 = strHref.replace("pdr","lmn");
  	strHref2 = strHref2.replace("average","date_range");
  	strHref2 = strHref2.replace("cdr","xyz");
		//strHref2 = strHref2.replace("#","");
		var index1 = strHref2.indexOf("#");
		strHref2 = strHref2.substring(0,index1);
		
		var strHref3 = strHref2 + "&pdr=" + cur_start + "-" + cur_end + "&cdr=" + compare_start + "-" + compare_end;
    
		//reload page with new dates
    window.location.href = strHref3;
		
  }
  else
  {
		//add all variables to URL
		window.location.href = strHref + "&cmp=date_range&pdr=" + cur_start + "-" + cur_end + "&cdr=" + compare_start + "-" + compare_end;
  }
		
}

function GetDates()
{
  var today = new Date();
  dd = today.getDate();
  mm = today.getMonth()+1;//January is 0!
  yyyy = today.getFullYear();
  if(dd<10){dd='0'+dd}
  if(mm<10){mm='0'+mm}
}

function changeDateString(date)
{
  var month = date.substring(0,2);
	var day = date.substring(3,5);
	var year = date.substring(6,10);
	
	var new_date = year + month + day;
	
	return new_date;
}