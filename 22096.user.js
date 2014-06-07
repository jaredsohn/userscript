// ==UserScript==
// @name           JobMine Tweak v1.03
// @namespace      http://www.ryanhildebrandt.com/resources
// @description    improves navigation when jobmine is initially loaded
// @include        https://jobmine.ccol.uwaterloo.ca/servlets/iclientservlet/SS/?cmd=start&*
// @exclude      https://jobmine.ccol.uwaterloo.ca/servlets/iclientservlet/SS/?cmd=login*
// ==/UserScript==

/*
Script History

v1.00 - Created by Ryan Hildebrandt.  Navigated to main page of JobMine
v1.01 - Modified by Lukas Matthews. (~01/05/2006) Frame thingy on top removed/commented out (JobMine didn't allow the links to be followed anymore.)
v1.02 - Modified by Lukas Matthews (04/28/2007).  Updated to reflect changes to JobMine URL
v1.03 - Modified by Ryan Hildebrandt (01/27/2008) Updated to reflect changes to JobMine URL structure
*/

var home_page;
//var profile_page, documents_page, jobsearch_page, shortlist_page, apps_page, interviews_page, rankings_page, workrptevals_page; // Commented out in v1.1

home_page='https://jobmine.ccol.uwaterloo.ca/servlets/iclientservlet/SS/?ICType=Script&ICScriptProgramName=WEBLIB_MENU.ISCRIPT3.FieldFormula.IScript_DrillDown&navc=5962&target=main0&RL=&menugroup=QQQJobMine&menuname=UW_CO_STUDENTS&barname=USE&Level=3&target=main0';
home_page='https://jobmine.ccol.uwaterloo.ca/servlets/iclientservlet/SS/?ICType=Script&ICScriptProgramName=WEBLIB_MENU.ISCRIPT3.FieldFormula.IScript_DrillDown&navc=5427&target=main0&RL=&menugroup=QQQJobMine&menuname=UW_CO_STUDENTS&barname=USE&Level=3&target=main0';
/*  Commented out in v1.1
profile_page='https://jobmine.uwaterloo.ca/servlets/iclientservlet/PSCECS/?ICType=Panel&Menu=UW_CO_STUDENTS&Market=GBL&PanelGroupName=UW_CO_STUDENT&RL=&target=main0&navc=8634';
documents_page='https://jobmine.uwaterloo.ca/servlets/iclientservlet/PSCECS/?ICType=Panel&Menu=UW_CO_STUDENTS&Market=GBL&PanelGroupName=UW_CO_STUDDOCS&RL=&target=main0&navc=8634';
jobsearch_page='https://jobmine.uwaterloo.ca/servlets/iclientservlet/PSCECS/?ICType=Panel&Menu=UW_CO_STUDENTS&Market=GBL&PanelGroupName=UW_CO_JOBSRCH&RL=&target=main0&navc=8634';
shortlist_page='https://jobmine.uwaterloo.ca/servlets/iclientservlet/PSCECS/?ICType=Panel&Menu=UW_CO_STUDENTS&Market=GBL&PanelGroupName=UW_CO_JOB_SLIST&RL=&target=main0&navc=8634';
apps_page='https://jobmine.uwaterloo.ca/servlets/iclientservlet/PSCECS/?ICType=Panel&Menu=UW_CO_STUDENTS&Market=GBL&PanelGroupName=UW_CO_APP_SUMMARY&RL=&target=main0&navc=8634';
interviews_page='https://jobmine.uwaterloo.ca/servlets/iclientservlet/PSCECS/?ICType=Panel&Menu=UW_CO_STUDENTS&Market=GBL&PanelGroupName=UW_CO_STU_INTVS&RL=&target=main0&navc=8634';
rankings_page='https://jobmine.uwaterloo.ca/servlets/iclientservlet/PSCECS/?ICType=Panel&Menu=UW_CO_STUDENTS&Market=GBL&PanelGroupName=UW_CO_STU_RNK2&RL=&target=main0&navc=8634';
workrptevals_page='https://jobmine.uwaterloo.ca/servlets/iclientservlet/PSCECS/?ICType=Panel&Menu=UW_CO_STUDENTS&Market=GBL&PanelGroupName=UW_CO_WORKRPRT&RL=&target=main0&navc=8634';
*/

var Frames;

//Navigate to the 'job search' page in jobmine when you log in
Frames=window.parent.frames;

if (GM_getValue("variable"))
{
	Frames[1].location=home_page;
}
GM_setValue("variable", 3);


// Commented out in v1.1
/*Add the navigation bar to the top of the screen in jobmine
var frames, thisframe;

frames=document.evaluate('//frame[@title]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i=0; i<frames.snapshotLength; i++)
{
	thisframe=frames.snapshotItem(i);
	if (thisframe.name=='header')
	{
		thisframe.src='http://ryan.tron09.com/sandbox/jobmine_tweak.htm';
		thisframe.scrolling="yes";
	}
}*/
