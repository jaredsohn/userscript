// ==UserScript==
// @name           Jobmine Improved
// @namespace      http://jamie-wong.com
// @description    Makes jobmine better!
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @require        http://tablesorter.com/jquery.tablesorter.min.js
// @include        https://jobmine.ccol.uwaterloo.ca/servlets/iclientservlet/SS/?ICType=*
// @exclude        *IScript_ShowStuDocument*
// @exclude        *FieldFormula.IScript_ShowAllDocuments*
// @exclude        *TIMEOUT*
// @exclude        *GetMenuHeader*
// ==/UserScript==

// Add a CSS stylesheet
var style = document.createElement( "style" ); 
style.appendChild( document.createTextNode("@import 'http://jamie-wong.com/Jobmine-Improved/style.css';") );
document.getElementsByTagName( "body" ).item(0).appendChild( style );

// Break out of frames
if (top.location != location) {
	top.location.href = document.location.href ;
}

// Insert navigation header at the top
var header = 'Jobmine Improved: ';
header +=    '<a href="https://jobmine.ccol.uwaterloo.ca/servlets/iclientservlet/SS/?ICType=Panel&Menu=UW_CO_STUDENTS&Market=GBL&PanelGroupName=UW_CO_STUDENT&RL=&target=main0&navc=5170">Profile</a> | ';
header +=    '<a href="https://jobmine.ccol.uwaterloo.ca/servlets/iclientservlet/SS/?ICType=Panel&Menu=UW_CO_STUDENTS&Market=GBL&PanelGroupName=UW_CO_STUDDOCS&RL=&target=main0&navc=5170">Documents</a> | ';
header +=    '<a href="https://jobmine.ccol.uwaterloo.ca/servlets/iclientservlet/SS/?ICType=Panel&Menu=UW_CO_STUDENTS&Market=GBL&PanelGroupName=UW_CO_JOBSRCH&RL=&target=main0&navc=5170">Job Inquiry</a> | ';
header +=    '<a href="https://jobmine.ccol.uwaterloo.ca/servlets/iclientservlet/SS/?ICType=Panel&Menu=UW_CO_STUDENTS&Market=GBL&PanelGroupName=UW_CO_JOB_SLIST&RL=&target=main0&navc=5170">Job Short List</a> | ';
header +=    '<a href="https://jobmine.ccol.uwaterloo.ca/servlets/iclientservlet/SS/?ICType=Panel&Menu=UW_CO_STUDENTS&Market=GBL&PanelGroupName=UW_CO_APP_SUMMARY&RL=&target=main0&navc=5170">Applications</a> | ';
header +=    '<a href="https://jobmine.ccol.uwaterloo.ca/servlets/iclientservlet/SS/?ICType=Panel&Menu=UW_CO_STUDENTS&Market=GBL&PanelGroupName=UW_CO_STU_INTVS&RL=&target=main0&navc=5170">Interviews</a> | ';
header +=    '<a href="https://jobmine.ccol.uwaterloo.ca/servlets/iclientservlet/SS/?ICType=Panel&Menu=UW_CO_STUDENTS&Market=GBL&PanelGroupName=UW_CO_STU_RNK2&RL=&target=main0&navc=5170">Rankings</a> | ';
header +=    '<a href="https://jobmine.ccol.uwaterloo.ca/servlets/iclientservlet/SS/?ICType=Panel&Menu=UW_CO_STUDENTS&Market=GBL&PanelGroupName=UW_CO_WORKRPRT&RL=&target=main0&navc=5170">Work Report Evalutions</a> | ';
header +=    '<a href="javascript:saveWarning(\'main\',null,\'_top\',\'/servlets/iclientservlet/SS/?cmd=logout\')">Logout</a>';
$("body").prepend(header);

  	
// Check for Updates
GM_xmlhttpRequest({
	method: "GET",
	url: "http://jamie-wong.com/Jobmine-Improved/version.txt",
	onload: function(response) {
		// parseJSON is not available until jQuery 1.4.1, so eval is being used here
		var data = eval("(" + response.responseText + ")");

		var currentversion = 100; // Note that this is 100x the version number. v1.32 => currentversion = 132
		if (data.version != currentversion) {
			$("body").prepend(
				$(document.createElement("div")).css("background-color","red").append(
					$(document.createElement("a")).append(
						"Version " + (data.version/100) + " now available ( " + data.date + ")"
					).attr("href","http://userscripts.org/scripts/source/67574.user.js")
				).css("width","100%").css("text-align","center")
			);
		}
	}
});

// Get the page's title
if ($(".PAPAGETITLE").size()) {
    var title = $(".PAPAGETITLE")[0].innerHTML;
} else {
    var title = "";
}

// Grab the tables of interest
var tables = $("table table table.PSLEVEL1GRID");
if (tables.size()) {
	// Force tables to use more of the screen's width
	$("table").css("width","98%");
	tables.css("width","100%");

	// Get rid of existing, useless headers from pages
	$("table a.PTBREADCRUMB").parents("table").remove();
	$("form[name=main0] table:first").remove();
	$("td > img[src*=PT_PIXEL_ENG]").parent().remove();
	
	// Move the first row from each table of interest into <thead>
	// This is required for tablesorter to work properly
	tables.each(function() {
		$(this).prepend(
			$("<thead></thead>").append($(this).find("tr:first").remove())
		);	
	});

	// Style the tables to be sorted, apply the tablesorter
	tables.addClass("tablesorter");
	tables.tablesorter();

	// Add a line between each row
	tables.find("td, th").css("border-bottom","1px solid #999").css("width","auto");
}

// Set syntax highlighting colours for various statuses
if (title == "Application List") {
	tables.find("tr").find("td:first, th:first").remove();
	tables.find("tr:contains('Ranking')").find("td").css("background-color","#777");
	tables.find("tr:contains('Selected')").find("td").css("background-color","#cfc");
	tables.find("tr:contains('Scheduled')").find("td").css("background-color","#9f9");
	tables.find("tr:contains('Not Selected')").find("td").css("background-color","#faa");
	tables.find("tr:contains('Cancelled')").find("td").css("background-color","#f77");
	tables.find("tr:contains('Filled')").find("td").css("background-color","#977");
} else if (title == "Short List") {
	tables.find("tr:contains('Already Applied')").find("td").css("background-color","#9f9");
	tables.find("tr:contains('Not Posted')").find("td").css("background-color","#777");
} else if ($("body:contains('Group Interviews')").size()) {
	tables.find("tr:contains('Ranking')").find("td").css("background-color","#777");
	tables.find("tr:contains('Scheduled')").find("td").css("background-color","#9f9");
} else if (title == "Student Ranking Page") {
	tables.find("tr:contains('Offer')").find("td").css("background-color","#9f9");
	tables.find("tr:contains('Ranked')").find("td").css("background-color","#dfd");
	tables.find("tr:contains('Not Ranked')").find("td").css("background-color","#faa");
}
