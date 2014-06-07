// ==UserScript==
// @name           CHEX System Administrator Autofill
// @namespace      http://userscripts.org/users/83810
// @include        http://chex.omnisocialpc.mzinga.com/app/*
// @include        http://chextest.omnisocialpc.mzinga.com/app/*
// @description    Does various types of autofill when using CHEX
// @grant       none
// ==/UserScript==

// FUNCTIONS SECTION (DO NOT DELETE)
// The XPath function provides a way to pinpoint an HTML tag on a given page. To generate these XPATHs,
// I use FireBug with the FirePath extension that allows you to right click on a node and identify the location, e.g. "html/body/div/table[2]/tbody/tr/td"
var XPath = function (path) {
    return document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
};

// Determine today's date, put it in a variable, and format it in the way CHEX formats dates
function dateToMDY(date)
{
    var m = date.getMonth()+1;
    var y = date.getFullYear();
    var d = date.getDate();
    return '' + (m<=9?'0'+m:m)  +'/'+ (d<=9?'0'+d:d) +'/'+ y;
}

//SET CATALOG START DATE TO TODAY FOR NEW COURSES
//Use today's date for defaults of Catalog Effective Date if no date currently exists and course is new (doesn't have a name)
if (window.location.pathname == "/app/courseinformation.ctl") {
	var todayDate=new Date();
	var MMDDYYYY_date_today = dateToMDY(todayDate);
	coursename=XPath(".//*[@id='objectName']");
	//If this course doesn't have a name, then we can assume it is new, and put a date in the catalog effective date
	if (!coursename.value) {
		catalogEffectiveDate = XPath('html/body/div[1]/form[3]/table[4]/tbody/tr[2]/td[2]/input[1]')
		if (catalogEffectiveDate.name == "catalogEffectiveDate") {
			catalogEffectiveDate.value = MMDDYYYY_date_today
		}
	}
}
//------------------------------------------------------


//SET ASSESSMENT ASSIGNMENT DATE TO TODAY FOR NEW COURSES
if (window.location.pathname == "/app/assignment.ctl") {
	var todayDate=new Date();
	var MMDDYYYY_date_today = dateToMDY(todayDate);
	startDate=XPath("html/body/div[1]/form[1]/table[1]/tbody/tr[6]/td[2]/input[1]");
	//If this assignment doesn't have a start date, use today's date as the start date by default
	if (startDate.name == "displayEffectiveDate") {
		if (!startDate.value) {startDate.value = MMDDYYYY_date_today}
	}


	//For a new Assessment Assignment, Set the assignment name to be the same as the assessment name by default
	assessmentName=XPath('/html/body/div[1]/form[1]/table[1]/tbody/tr[1]/td[2]');
	assignmentName=XPath('html/body/div[1]/form[1]/table[1]/tbody/tr[2]/td[2]/input');
		if (!assignmentName.value) {
			assignmentName.value = assessmentName.innerHTML;
		}
}
//------------------------------------------------------