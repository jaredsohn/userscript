// ProgressBook user script
// version 1.8
// 2010-02-09
// Copyright (c) 2010, John A. Dutton
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
//
//
// ==UserScript==
// @name           ProgressBook
// @namespace      http://shawhighstudents.org
// @description    Fix ProgressBook for high schools in Ohio, USA. Version: 1.8
// @include        https://pb.lnoca.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js 
// ==/UserScript==
	
// Constants defined for pages changed
var pbAssignmentDetailForm = /\/Teacher\/AssignmentDetailForm\.asp/i;
var pbAssignmentMarkForm = /\/Teacher\/AssignmentMarkForm\.asp/i;
var pbPeriodAttendance = /\/Teacher\/AttendanceByBlock\.aspx/i;
var pbLoginForm = /\/General\/LoginForm\.aspx/i;

// Once the document is loaded, figure out what page we're on
$(document).ready(function() {
	var strURL = window.location.href;

	if (strURL.match(pbAssignmentDetailForm)) 
		fixAssignmentDetailForm();
	else if (strURL.match(pbAssignmentMarkForm)) 
		fixAssignmentMarkForm();
	else if (strURL.match(pbPeriodAttendance)) 
		fixPeriodAttendance();
	else if (strURL.match(pbLoginForm)) 
		setLoginInformation();
		
        // Start the tool to keep the user logged in and avoid timeouts in the middle of grading
	startCheckAJAXToFire();	
});	
	
function fixAssignmentDetailForm()
{
	// Automatically post to Web
	$("#Checkbox5").attr("checked",true);
	
	// Set default point value
	$("#Text5").attr("value",2);
}

function fixAssignmentMarkForm()
{
  // Change the select box for excluding to a checkbox
  $("select[name^='ExcludeInd']").each( function(){
	var strChecked = "";
	if ($(this).attr("selectedIndex") == 1) strChecked = "checked ";
	$(this).replaceWith( $("<input " + strChecked + "type='checkbox'>").attr({
		name: $(this).attr("name"),
		value: '10'
	}));
  });

  // The following code changes the grading from one column to display in two columns
  $(".scroll").attr("style","");
  $(".scroll").attr("id","old_column");
  $("#old_column > table > tbody > tr > th:last-child").remove();
  $("#old_column > table > tbody > tr > td:last-child").each( function(){
    $(this).remove();
  });
  $("#old_column").parent().attr("width","50%");
  $("#old_column").parent().parent().append("<td id='new_column' width='50%'></td>");
  $("#new_column").append($("#old_column").parent().html());
  $("#new_column").attr("height", "100%");
  $("#new_column > div").attr("id","");
  $("#new_column > div").attr("style","height: 100%; vertical-align: top;");
  var objOldColumnRows = $("#old_column > table > tbody > tr");
  var objNewColumnRows = $("#new_column > div > table > tbody > tr");
  var intHalfway = ($(objOldColumnRows).length / 2);
  var i = 0;
  $(objOldColumnRows).each( function(){
    if ((i != $(objNewColumnRows).length - 1) && (i > intHalfway)) $(this).remove();
    i++;
  });
  i = 0;
  $(objNewColumnRows).each( function(){
    if ((i > 0) && (i <= intHalfway)) $(this).remove();
    i++;
  });
  
	// Create the Set to Missing button at the bottom
    $("<input name='SetToMissing' type='Button' value='Toggle Missing' id='SetToMissing'>").appendTo($("input[name='UpdateBtn']").parent().get(0));

	// Define the function to set all of the assignments to missing
    $("#SetToMissing").bind("click", function(){
		$("input[name='MissingInd']").each( function(){
			if (this.checked) this.checked = false;
			else this.checked = true;
		});
    });
    
    // Define the function to set all of the assignments to excluded
    $("#Button2").bind("click", function(){
		$("input[name^='ExcludeInd']").each( function(){
	  		this.checked = true;
	  	});    
	});
    
    // Make sure that all grades get saved when the user leaves the page
    $(window).unload( function(){
		postMarksWithAJAX();
    });

        // Since the save button is unnecessary, remove it
	$("input[name='SaveBtn']").remove();
	
	// Matches if this is an attendance page
	if ($("#Select4 option[selected]").text().match(/Attendance$/i)) {

        // Import attendance grades
    	$("<input name='ImportAttendance' type='Button' value='Import Attendance' id='ImportAttendance'>").appendTo($("input[name='UpdateBtn']").parent().get(0));
    	
        // Set attendance grades according to attendance code
    	$("#ImportAttendance").bind("click", function(){
	    	var arrAttendance = GM_getValue("PBPeriodAttendance").split(",");
			for (i = 0; i < arrAttendance.length; i++) {
				switch (arrAttendance[i]) {
					case "":
						$("input[name='MarkCB']").get(i).checked = true;
						$("input[name='MissingInd']").get(i).checked = false;
						$("input[name^='ExcludeInd']").get(i).checked = false;
						break;
					case "UNEX TARDY": case "UNEXCUSED":
						$("input[name='MarkCB']").get(i).checked = false;
						$("input[name='MissingInd']").get(i).checked = true;
						$("input[name^='ExcludeInd']").get(i).checked = false;
						break;
					default:
						$("input[name='MarkCB']").get(i).checked = false;
						$("input[name='MissingInd']").get(i).checked = false;
						$("input[name^='ExcludeInd']").get(i).checked = true;
				}
			}
			
    	});
	}

        // Work-around for bug encountered where ProgressBook ignores last form value sent by POST
	$("#Form1").append("<input type='hidden' name='Dummy' value='0'>");

        // Put the most important stuff front and center
	window.scrollBy(0,$("#old_column").position().top);
}

function postMarksWithAJAX()
{ 
        // Post assignment marks by AJAX
	$.ajax({
        type: "POST",
        url: "https://pb.lnoca.org/Teacher/AssignmentMarkFormAction.asp",
        data: $("#Form1").serialize().replace(/=Exclude/gi,"=10"),
        async: false
   	});
}

function postLoginWithAJAX()
{ 
    // Post saved login information by AJAX
    $.ajax({
        type: "POST",
        url: "https://pb.lnoca.org/General/LoginForm.aspx",
        data: GM_getValue("PBLoginInfo"),
        async: false
   	});
}

// Send grades every minute
function startCheckAJAXToFire()
{
    window.setTimeout(checkAJAXToFire, 60000);
}

function checkAJAXToFire()
{
    // If it's been 30 minutes, log in again
    if (GM_getValue("PBTime") == 30) {
        postLoginWithAJAX();
		GM_setValue("PBTime", 0);
    }
    if (window.location.href.match(/\/Teacher\/AssignmentMarkForm\.asp/i)) {
        postMarksWithAJAX();
    }
    GM_setValue("PBTime", GM_getValue("PBTime") + 1);
    window.setTimeout(checkAJAXToFire, 60000);
}

function fixPeriodAttendance()
{
        // Save the period attendance for use in assignment mark page
	$(window).unload( function(){
		var arrAttendance = new Array;
		$("td.centerCell:not(.hideClassAttendance) > select").each( function(){
			var intValue = $(this).attr("value");
			arrAttendance.push($(this).children("option[value=" + intValue + "]").text());
		});
		GM_setValue("PBPeriodAttendance", arrAttendance.join(","));
    });
}

function setLoginInformation()
{
	GM_setValue("PBTime", 0);
	
	$("#txtDistrict").val("ecle");

    $("#btnLogin").bind("click", function(){
		GM_setValue("PBLoginInfo", $("#LoginForm").serialize());
	});
}


