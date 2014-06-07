// Google Analytics Advanced Date Selection
// version 0.4 BETA!
// 2009-01-30
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
// @name           GA Advanced Date Selection
// @namespace      tysonkirksey.com
// @description    Provides one-click access to year-over-year reports in Google Analytics
// @license	   GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        http://www.google.com/analytics/*
// @include        https://www.google.com/analytics/*
// @include        https://adwords.google.com/analytics/*
// ==/UserScript==

var main, logo, button1, button2, button3, new_date_select, mm, dd, yyyy, compare, logo2;
main = document.getElementById('f_dateInputFlash');
compare = document.getElementById('f_submitOptions');

if (main) {
    //var logo = document.createElement("div");
		var logo2 = document.createElement("span");		
		
		//logo2.innerHTML = "<strong> Compare to Last Year </strong> <input type='checkbox' id='gm_yoy'>";
		//logo2.innerHTML = "<input type='button' id='gm_yoy' value='YOY'>";
		logo2.innerHTML = "<select style='font-size: 11px;' id='gm_select_date'><option id='cancel_gm_date'>No Comparison<option id='gm_custom_date' value='Custom Date'>Custom Date<option id='gm_yoy'>This Date Last Year</select>";

    //insert new HTML
		//main.parentNode.insertBefore(logo, main);
		compare.parentNode.insertBefore(logo2, compare);
		
		//add event handlers	
		var gm_reg_btn=document.getElementById("gm_custom_date");
		//gm_reg_btn.addEventListener("click", CompareLastYear, true);
		gm_reg_btn.addEventListener("click", CustomDates, true);
		
		var gm_cancel_btn=document.getElementById("cancel_gm_date");
		gm_cancel_btn.addEventListener("click", CancelDates, true);
		
		var gm_reg_btn=document.getElementById("gm_yoy");
		//gm_reg_btn.addEventListener("click", CompareLastYear, true);
		gm_reg_btn.addEventListener("click", CompareLastYear, true);
	
	  var tester = document.getElementById("f_comparisonEnabledCheckbox");
		tester.parentNode.style.display = "none";		
		
		//if already comparing dates, set select box accordingly
		if(window.location.href.indexOf("cdr") > 0)
		  document.getElementById("gm_select_date").selectedIndex = 1;
		else if(window.location.href.indexOf("lmn") > 0)
		  document.getElementById("gm_select_date").selectedIndex = 2;
}


function CancelDates()
{
	document.getElementById("f_comparisonEnabledCheckbox").checked = false;	
	unsafeWindow.dateInputView.setCompareOption();
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
	
	if(cur_start.indexOf('2011') > -1)
	  compare_start = compare_start.replace("2011","2010");
        else if(cur_start.indexOf('2010') > -1)
	  compare_start = compare_start.replace("2010","2009");
        else if(cur_start.indexOf('2009') > -1)
	  compare_start = compare_start.replace("2009","2008");
	else if(cur_start.indexOf('2008') > -1)
	  compare_start = compare_start.replace("2008","2007");
	else if(cur_start.indexOf('2007') > -1)
	  compare_start = compare_start.replace("2007","2006");
		
	if(cur_end.indexOf('2011') > -1)
	  compare_end = compare_end.replace("2011","2010");
        else if(cur_end.indexOf('2010') > -1)
	  compare_end = compare_end.replace("2010","2009");
	else if(cur_end.indexOf('2009') > -1)
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