// ==UserScript==
// @name           Job Ticket 1
// @namespace      http://printing.arc.losrios.edu/DSF/Admin/*
// @description    Alerts on Instructor's Names, Alerts on delivery instruct & changes CSS upon request, Changes due the date, Puts order #, Due date and Department on the name of the file when job ticket is printed
// @include        http://printing.arc.losrios.edu/DSF/Admin/*
// @exclude     http://printing.arc.losrios.edu/DSF/Admin/ProductionView.aspx
// @exclude     http://printing.arc.losrios.edu/DSF/Admin/AdminHome.aspx
// @exclude     http://printing.arc.losrios.edu/DSF/Admin/OrderView.aspx
// @version        1.1.18
// ==/UserScript==



//**************Alerts all Due Dates EXEPT **selected ones** 
(function l() {
var stt=document.getElementById("ctl00_ctl00_C_M_lblDueDateTime").innerHTML;
var patt=/February 12/g;
var result=patt.test(stt);
 if (result !==true)
      {
//	alert("This Job is NOT Due on " +patt);
      }
})();

//Put Fake Due date
	fkdt="FD"+"	 Tuesday  August 27 8:00am	" + "FD";
	stt=document.getElementById("ctl00_ctl00_C_M_lblDueDateTime");
	stt.innerHTML=  fkdt;			//Putting two back slashes in at the very beginning of this line will stop the script from running
	stt=document.getElementById("ctl00_ctl00_C_M_lblDueDateTime").innerHTML;
		if (stt == fkdt)
		{
		alert("----Fake Due Date!----");
		}

//Puts Order #, Due date and Department name on the tab heading and on the name of the file when job ticket is printed to M.P.
a=document.getElementsByTagName("Input")[0];
var ordersubstitute = a.innerHTML= document.getElementById("ctl00_ctl00_C_M_lblOrderNumberValue").innerHTML;
var order = document.getElementsByTagName("input")[0].childNodes[0];

b=document.getElementsByTagName("td")[1];
var jobsubstitute = b.innerHTML= document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl00_lblJob").innerHTML;
var job = document.getElementsByTagName("td")[1].childNodes[0];
var f = job.length;
var jobfront = (f,0,6);
var jobback = job.splitText(jobfront);
var messedup = job.innerHTML= ( jobfront.nodeValue + jobback.nodeValue);
var jobb = document.getElementsByTagName("td")[1].childNodes[0];
var f = jobb.length;
var stay = f -2;
var jobmiddle = jobb.splitText(stay);

c=document.getElementsByTagName("input")[1];
var duesubstitute = c.innerHTML= document.getElementById("ctl00_ctl00_C_M_lblDueDateTime").innerHTML;
var due = document.getElementsByTagName("input")[1].childNodes[0];

d=document.getElementsByTagName("input")[2];
var departmentsubstitute = d.innerHTML= document.getElementById("ctl00_ctl00_C_M_lblCompanyNameValue").innerHTML;
var department = document.getElementsByTagName("input")[2].childNodes[0];

e=document.getElementsByTagName("title")[0];
var order = e.innerHTML= ( order.nodeValue + " - " + jobmiddle.nodeValue + " _ " + due.nodeValue + " _ " + department.nodeValue);

//***************Alerts only if all text in the name box matches
(function o() {
var stt=document.getElementById("ctl00_ctl00_C_M_lblCustomerNameValue").innerHTML;
 if (stt =="Bill Simpson") {
alert("These jobs almost always fail in the RIP" + '\n' + "and usually they can be fixed by saving the job, (after the job flushes out) " + '\n' + "and then sending to the RIP again "); 
}
if (stt =="Don Reid") {
alert("Check if the job is real. Don could have placed a fake order"); 
}
if (stt =="Daniel Paulson") {
alert("----This job need extra editing----"); 
}
if (stt =="Arthur Lapierre") {
alert("----This job need extra editing----");
}
if (stt =="Dyne Eifertsen") {
alert("----This job need extra editing----");
}
if (stt =="andrey savchenko") {
alert("DO NOT PRINT!" + '\n' + "This is a fake Job! " + '\n' + "Mark this job Canseled!"); 
}
if (stt =="Cecilia Mayer") {
alert("In past some of the jobs she submited had bad files. The files rip with no error but all pages (exept for the first page)  come out blank. " + '\n' + "The best fix is to open the file in the browser and send to MP. Then select all atrubutes manually"); 
}
if (stt =="Chanin James-Hardwick") {
alert("Check paper size on the file before sending to MP!"); 
}
if (stt =="steven thompson") {
alert("Check paper size on the file before sending to MP!"); 
}
if (stt =="Judy Parks") {
alert("Check file for font problems after the job rips into PSM."); 
}
if (stt =="Michael Ridley") {
alert("Most of his files usually have to be printed from the Firefox Adobe plug-in"); 
}
if (stt =="Leslie O'Brien") {
alert("This Leslie said last August that her computer was stolen and she had to redo the sylabus and get an aproval form the dean before submitting this job to us." + '\n' + " AND THAT'S WHY WE NEED TO RUSH HER JOB" + '\n' + "If she is going to say same story next semester then you know that's not true"); 
}
})();

//***************Alerts on Stitch, NCR, Custom Drill, 2 Hole Punch
var str=document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl00_JobSummaryParts_JobSummaryPartData").innerHTML;

(function o() {
var patt=/Stitch Upper Left/g;
var result=patt.test(str);
 if (result==true){
alert("This job has the stitch option selected and won't staple because of it! " + '\n' + "To fix it wait until the job transfers to MP, " + '\n' + "then select the \"Left Slant\" option manually."); 
}
})();
 
(function o() {
var patt=/NCR/g;
var result=patt.test(str);
 if (result==true){
alert("This is an NCR job!!!" + '\n' + "When the job is going to get to the MP, " + '\n' + "change paper media to (Carbonless (80-105g/m2) copy 1)"); 
}
})();

(function o() {
var patt=/Custom Drill/g;
var result=patt.test(str);
 if (result==true){
alert("This job has Custom Drill selected!!!" + '\n' + "When the job finishes transfering to MP," + '\n' + "look on the job using Perivew feature " + '\n' + "and manually select hole punching type."); 
}
})();

 
(function o() {
var patt=/2 Holes across top/g;
var result=patt.test(str);
 if (result==true){
alert("Reminder:  This job will require the paper to be changed to Letter R on the copier for 2 hole punching"); 
}
})();

//*Dear Gentlepeople* note is deleted 
(function () {
var stt=document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData").innerHTML;
var patt1=/Dear Printshop Gentlepeople:/g;
var patt2=/Be advised that the attached submission for printing is in PDF format. As such it should not change format in electronic transmission./g;
var patt3=/If you have questions about the submission, please call me at 530/g;
var patt4=/758-6638. If not urgent you can also email me at jraycraft@comcast.net./g;
var patt5=/Please wrap order in plastic/g;
var patt6=/ cellophane./g;

var result=patt1.test(stt);

 if (result==true){
var stt2=stt.replace(patt1,""); 
var stt2=stt2.replace(patt2,""); 
var stt2=stt2.replace(patt3,""); 
var stt2=stt2.replace(patt4,"");
var stt2=stt2.replace(patt5,"");
var stt2=stt2.replace(patt6,"");
document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData").innerHTML=stt2;
}
})();

//*************Alerts if Delivery instruction is in the Spesial Instruction

var stt=document.getElementById("ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData").innerHTML;

(function () {
var patt=/eliver/g;
var result=patt.test(stt);
 if (result ==true){
var r=confirm("Delivery Instructions in the Special Instructions!!!" + '\n' + "Press Ok to put Special Instructions in the Delevery Instructions");
if (r==true)
  {
GM_addStyle((<><![CDATA[
@media print
{
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{margin-top:0px !important;margin-left:0px;width:411px !important;height:115px; !important;Padding-left:9px !important;z-index:10 !important;}
}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{position:absolute;top:-310px;left:60px;text-align:left;margin-right:260px;border:0px solid black;height:115px;width:398px;padding-left:4px;padding-top:2px; font-weight:bold;Font-size:15px;line-height:18px;}]
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]:after {content:"Please write your delivery instructions in the [ Intercampus Mail / Will-Call / Distribution ] section at the bottom of the shopping cart page by clicking the [ drop down window ] and selecting [ Other ].  Then write in your delivery instructions when the text box appears.  Please don't use the special instructions on the request for delivery instructions. If you write your delivery instructions in the proper place you will have a better chance of receiving your job where you had intended it to go. ";}
form[action^="ProductionJobTicket"] tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{position:absolute;left:65px;top:14px;width:717px;Height:36px;border:0px solid red;background-color:#CCDDF9;padding-top:15px;padding-left:5px;line-height:13px;Overflow:hidden;white-space:normal;}

#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}

]]></>).toString());
  }
}
})();

(function () {
var patt=/DELIVER/g;
var result=patt.test(stt);
 if (result ==true){
var r=confirm("Delivery Instructions in the Special Instructions!!!" + '\n' + "Press Ok to put Special Instructions in the Delevery Instructions");
if (r==true)
  {
GM_addStyle((<><![CDATA[
@media print
{
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{margin-top:0px !important;margin-left:0px;width:411px !important;height:115px; !important;Padding-left:9px !important;z-index:10 !important;}
}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{position:absolute;top:-310px;left:60px;text-align:left;margin-right:260px;border:0px solid black;height:115px;width:398px;padding-left:4px;padding-top:2px; font-weight:bold;Font-size:15px;line-height:18px;}]
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]:after {content:"Please write your delivery instructions in the [ Intercampus Mail / Will-Call / Distribution ] section at the bottom of the shopping cart page by clicking the [ drop down window ] and selecting [ Other ].  Then write in your delivery instructions when the text box appears.  Please don't use the special instructions on the request for delivery instructions. If you write your delivery instructions in the proper place you will have a better chance of receiving your job where you had intended it to go. ";}
form[action^="ProductionJobTicket"] tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{position:absolute;left:65px;top:14px;width:717px;Height:36px;border:0px solid red;background-color:#CCDDF9;padding-top:15px;padding-left:5px;line-height:13px;Overflow:hidden;white-space:normal;}

#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}

]]></>).toString());
  }
}
})();

(function () {
var patt=/pick/g;
var result=patt.test(stt);
 if (result==true){
var r=confirm("Delivery Instructions in the Special Instructions!!!" + '\n' + "Press Ok to put Special Instructions in the Delevery Instructions");
if (r==true)
  {
GM_addStyle((<><![CDATA[
@media print
{
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{margin-top:0px !important;margin-left:0px;width:411px !important;height:115px; !important;Padding-left:9px !important;z-index:10 !important;}
}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{position:absolute;top:-310px;left:60px;text-align:left;margin-right:260px;border:0px solid black;height:115px;width:398px;padding-left:4px;padding-top:2px; font-weight:bold;Font-size:15px;line-height:18px;}]
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]:after {content:"Please write your delivery instructions in the [ Intercampus Mail / Will-Call / Distribution ] section at the bottom of the shopping cart page by clicking the [ drop down window ] and selecting [ Other ].  Then write in your delivery instructions when the text box appears.  Please don't use the special instructions on the request for delivery instructions. If you write your delivery instructions in the proper place you will have a better chance of receiving your job where you had intended it to go. ";}
form[action^="ProductionJobTicket"] tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{position:absolute;left:65px;top:14px;width:717px;Height:36px;border:0px solid red;background-color:#CCDDF9;padding-top:15px;padding-left:5px;line-height:13px;Overflow:hidden;white-space:normal;}

#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}

]]></>).toString());
  }
}
})();

(function () {
var patt=/Pick/g;
var result=patt.test(stt);
 if (result==true){
var r=confirm("Delivery Instructions in the Special Instructions!!!" + '\n' + "Press Ok to put Special Instructions in the Delevery Instructions");
if (r==true)
  {
GM_addStyle((<><![CDATA[
@media print
{
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{margin-top:0px !important;margin-left:0px;width:411px !important;height:115px; !important;Padding-left:9px !important;z-index:10 !important;}
}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{position:absolute;top:-310px;left:60px;text-align:left;margin-right:260px;border:0px solid black;height:115px;width:398px;padding-left:4px;padding-top:2px; font-weight:bold;Font-size:15px;line-height:18px;}]
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]:after {content:"Please write your delivery instructions in the [ Intercampus Mail / Will-Call / Distribution ] section at the bottom of the shopping cart page by clicking the [ drop down window ] and selecting [ Other ].  Then write in your delivery instructions when the text box appears.  Please don't use the special instructions on the request for delivery instructions. If you write your delivery instructions in the proper place you will have a better chance of receiving your job where you had intended it to go. ";}
form[action^="ProductionJobTicket"] tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{position:absolute;left:65px;top:14px;width:717px;Height:36px;border:0px solid red;background-color:#CCDDF9;padding-top:15px;padding-left:5px;line-height:13px;Overflow:hidden;white-space:normal;}

#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}

]]></>).toString());
  }
}
})();

(function () {
var patt=/PICK/g;
var result=patt.test(stt);
 if (result==true){
var r=confirm("Delivery Instructions in the Special Instructions!!!" + '\n' + "Press Ok to put Special Instructions in the Delevery Instructions");
if (r==true)
  {
GM_addStyle((<><![CDATA[
@media print
{
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{margin-top:0px !important;margin-left:0px;width:411px !important;height:115px; !important;Padding-left:9px !important;z-index:10 !important;}
}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{position:absolute;top:-310px;left:60px;text-align:left;margin-right:260px;border:0px solid black;height:115px;width:398px;padding-left:4px;padding-top:2px; font-weight:bold;Font-size:15px;line-height:18px;}]
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]:after {content:"Please write your delivery instructions in the [ Intercampus Mail / Will-Call / Distribution ] section at the bottom of the shopping cart page by clicking the [ drop down window ] and selecting [ Other ].  Then write in your delivery instructions when the text box appears.  Please don't use the special instructions on the request for delivery instructions. If you write your delivery instructions in the proper place you will have a better chance of receiving your job where you had intended it to go. ";}
form[action^="ProductionJobTicket"] tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{position:absolute;left:65px;top:14px;width:717px;Height:36px;border:0px solid red;background-color:#CCDDF9;padding-top:15px;padding-left:5px;line-height:13px;Overflow:hidden;white-space:normal;}

#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}

]]></>).toString());
  }
}
})();

(function () {
var patt=/send/g;
var result=patt.test(stt);
 if (result==true){
var r=confirm("Delivery Instructions in the Special Instructions!!!" + '\n' + "Press Ok to put Special Instructions in the Delevery Instructions");
if (r==true)
  {
GM_addStyle((<><![CDATA[
@media print
{
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{margin-top:0px !important;margin-left:0px;width:411px !important;height:115px; !important;Padding-left:9px !important;z-index:10 !important;}
}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{position:absolute;top:-310px;left:60px;text-align:left;margin-right:260px;border:0px solid black;height:115px;width:398px;padding-left:4px;padding-top:2px; font-weight:bold;Font-size:15px;line-height:18px;}]
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]:after {content:"Please write your delivery instructions in the [ Intercampus Mail / Will-Call / Distribution ] section at the bottom of the shopping cart page by clicking the [ drop down window ] and selecting [ Other ].  Then write in your delivery instructions when the text box appears.  Please don't use the special instructions on the request for delivery instructions. If you write your delivery instructions in the proper place you will have a better chance of receiving your job where you had intended it to go. ";}
form[action^="ProductionJobTicket"] tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{position:absolute;left:65px;top:14px;width:717px;Height:36px;border:0px solid red;background-color:#CCDDF9;padding-top:15px;padding-left:5px;line-height:13px;Overflow:hidden;white-space:normal;}

#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}

]]></>).toString());
  }
}
})();

(function () {
var patt=/Send/g;
var result=patt.test(stt);
 if (result==true){
var r=confirm("Delivery Instructions in the Special Instructions!!!" + '\n' + "Press Ok to put Special Instructions in the Delevery Instructions");
if (r==true)
  {
GM_addStyle((<><![CDATA[
@media print
{
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{margin-top:0px !important;margin-left:0px;width:411px !important;height:115px; !important;Padding-left:9px !important;z-index:10 !important;}
}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{position:absolute;top:-310px;left:60px;text-align:left;margin-right:260px;border:0px solid black;height:115px;width:398px;padding-left:4px;padding-top:2px; font-weight:bold;Font-size:15px;line-height:18px;}]
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]:after {content:"Please write your delivery instructions in the [ Intercampus Mail / Will-Call / Distribution ] section at the bottom of the shopping cart page by clicking the [ drop down window ] and selecting [ Other ].  Then write in your delivery instructions when the text box appears.  Please don't use the special instructions on the request for delivery instructions. If you write your delivery instructions in the proper place you will have a better chance of receiving your job where you had intended it to go. ";}
form[action^="ProductionJobTicket"] tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{position:absolute;left:65px;top:14px;width:717px;Height:36px;border:0px solid red;background-color:#CCDDF9;padding-top:15px;padding-left:5px;line-height:13px;Overflow:hidden;white-space:normal;}

#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}

]]></>).toString());
  }
}
})();

(function () {
var patt=/SEND/g;
var result=patt.test(stt);
 if (result==true){
var r=confirm("Delivery Instructions in the Special Instructions!!!" + '\n' + "Press Ok to put Special Instructions in the Delevery Instructions");
if (r==true)
  {
GM_addStyle((<><![CDATA[
@media print
{
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{margin-top:0px !important;margin-left:0px;width:411px !important;height:115px; !important;Padding-left:9px !important;z-index:10 !important;}
}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{position:absolute;top:-310px;left:60px;text-align:left;margin-right:260px;border:0px solid black;height:115px;width:398px;padding-left:4px;padding-top:2px; font-weight:bold;Font-size:15px;line-height:18px;}]
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]:after {content:"Please write your delivery instructions in the [ Intercampus Mail / Will-Call / Distribution ] section at the bottom of the shopping cart page by clicking the [ drop down window ] and selecting [ Other ].  Then write in your delivery instructions when the text box appears.  Please don't use the special instructions on the request for delivery instructions. If you write your delivery instructions in the proper place you will have a better chance of receiving your job where you had intended it to go. ";}
form[action^="ProductionJobTicket"] tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{position:absolute;left:65px;top:14px;width:717px;Height:36px;border:0px solid red;background-color:#CCDDF9;padding-top:15px;padding-left:5px;line-height:13px;Overflow:hidden;white-space:normal;}

#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}

]]></>).toString());
  }
}
})();

(function () {
var patt=/sent/g;
var result=patt.test(stt);
 if (result==true){
var r=confirm("Delivery Instructions in the Special Instructions!!!" + '\n' + "Press Ok to put Special Instructions in the Delevery Instructions");
if (r==true)
  {
GM_addStyle((<><![CDATA[
@media print
{
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{margin-top:0px !important;margin-left:0px;width:411px !important;height:115px; !important;Padding-left:9px !important;z-index:10 !important;}
}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{position:absolute;top:-310px;left:60px;text-align:left;margin-right:260px;border:0px solid black;height:115px;width:398px;padding-left:4px;padding-top:2px; font-weight:bold;Font-size:15px;line-height:18px;}]
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]:after {content:"Please write your delivery instructions in the [ Intercampus Mail / Will-Call / Distribution ] section at the bottom of the shopping cart page by clicking the [ drop down window ] and selecting [ Other ].  Then write in your delivery instructions when the text box appears.  Please don't use the special instructions on the request for delivery instructions. If you write your delivery instructions in the proper place you will have a better chance of receiving your job where you had intended it to go. ";}
form[action^="ProductionJobTicket"] tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{position:absolute;left:65px;top:14px;width:717px;Height:36px;border:0px solid red;background-color:#CCDDF9;padding-top:15px;padding-left:5px;line-height:13px;Overflow:hidden;white-space:normal;}

#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}

]]></>).toString());
  }
}
})();

(function () {
var patt=/Sent/g;
var result=patt.test(stt);
 if (result==true){
var r=confirm("Delivery Instructions in the Special Instructions!!!" + '\n' + "Press Ok to put Special Instructions in the Delevery Instructions");
if (r==true)
  {
GM_addStyle((<><![CDATA[
@media print
{
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{margin-top:0px !important;margin-left:0px;width:411px !important;height:115px; !important;Padding-left:9px !important;z-index:10 !important;}
}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{position:absolute;top:-310px;left:60px;text-align:left;margin-right:260px;border:0px solid black;height:115px;width:398px;padding-left:4px;padding-top:2px; font-weight:bold;Font-size:15px;line-height:18px;}]
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]:after {content:"Please write your delivery instructions in the [ Intercampus Mail / Will-Call / Distribution ] section at the bottom of the shopping cart page by clicking the [ drop down window ] and selecting [ Other ].  Then write in your delivery instructions when the text box appears.  Please don't use the special instructions on the request for delivery instructions. If you write your delivery instructions in the proper place you will have a better chance of receiving your job where you had intended it to go. ";}
form[action^="ProductionJobTicket"] tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{position:absolute;left:65px;top:14px;width:717px;Height:36px;border:0px solid red;background-color:#CCDDF9;padding-top:15px;padding-left:5px;line-height:13px;Overflow:hidden;white-space:normal;}

#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}

]]></>).toString());
  }
}
})();

(function () {
var patt=/SENT/g;
var result=patt.test(stt);
 if (result==true){
var r=confirm("Delivery Instructions in the Special Instructions!!!" + '\n' + "Press Ok to put Special Instructions in the Delevery Instructions");
if (r==true)
  {
GM_addStyle((<><![CDATA[
@media print
{
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{margin-top:0px !important;margin-left:0px;width:411px !important;height:115px; !important;Padding-left:9px !important;z-index:10 !important;}
}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{position:absolute;top:-310px;left:60px;text-align:left;margin-right:260px;border:0px solid black;height:115px;width:398px;padding-left:4px;padding-top:2px; font-weight:bold;Font-size:15px;line-height:18px;}]
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]:after {content:"Please write your delivery instructions in the [ Intercampus Mail / Will-Call / Distribution ] section at the bottom of the shopping cart page by clicking the [ drop down window ] and selecting [ Other ].  Then write in your delivery instructions when the text box appears.  Please don't use the special instructions on the request for delivery instructions. If you write your delivery instructions in the proper place you will have a better chance of receiving your job where you had intended it to go. ";}
form[action^="ProductionJobTicket"] tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{position:absolute;left:65px;top:14px;width:717px;Height:36px;border:0px solid red;background-color:#CCDDF9;padding-top:15px;padding-left:5px;line-height:13px;Overflow:hidden;white-space:normal;}

#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}

]]></>).toString());
  }
}
})();

(function () {
var patt=/Will-Call/g;
var result=patt.test(stt);
 if (result==true){
var r=confirm("Delivery Instructions in the Special Instructions!!!" + '\n' + "Press Ok to put Special Instructions in the Delevery Instructions");
if (r==true)
  {
GM_addStyle((<><![CDATA[
@media print
{
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{margin-top:0px !important;margin-left:0px;width:411px !important;height:115px; !important;Padding-left:9px !important;z-index:10 !important;}
}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{position:absolute;top:-310px;left:60px;text-align:left;margin-right:260px;border:0px solid black;height:115px;width:398px;padding-left:4px;padding-top:2px; font-weight:bold;Font-size:15px;line-height:18px;}]
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]:after {content:"Please write your delivery instructions in the [ Intercampus Mail / Will-Call / Distribution ] section at the bottom of the shopping cart page by clicking the [ drop down window ] and selecting [ Other ].  Then write in your delivery instructions when the text box appears.  Please don't use the special instructions on the request for delivery instructions. If you write your delivery instructions in the proper place you will have a better chance of receiving your job where you had intended it to go. ";}
form[action^="ProductionJobTicket"] tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{position:absolute;left:65px;top:14px;width:717px;Height:36px;border:0px solid red;background-color:#CCDDF9;padding-top:15px;padding-left:5px;line-height:13px;Overflow:hidden;white-space:normal;}

#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}

]]></>).toString());
  }
}
})();

(function () {
var patt=/will-call/g;
var result=patt.test(stt);
 if (result==true){
var r=confirm("Delivery Instructions in the Special Instructions!!!" + '\n' + "Press Ok to put Special Instructions in the Delevery Instructions");
if (r==true)
  {
GM_addStyle((<><![CDATA[
@media print
{
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{margin-top:0px !important;margin-left:0px;width:411px !important;height:115px; !important;Padding-left:9px !important;z-index:10 !important;}
}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{position:absolute;top:-310px;left:60px;text-align:left;margin-right:260px;border:0px solid black;height:115px;width:398px;padding-left:4px;padding-top:2px; font-weight:bold;Font-size:15px;line-height:18px;}]
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]:after {content:"Please write your delivery instructions in the [ Intercampus Mail / Will-Call / Distribution ] section at the bottom of the shopping cart page by clicking the [ drop down window ] and selecting [ Other ].  Then write in your delivery instructions when the text box appears.  Please don't use the special instructions on the request for delivery instructions. If you write your delivery instructions in the proper place you will have a better chance of receiving your job where you had intended it to go. ";}
form[action^="ProductionJobTicket"] tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{position:absolute;left:65px;top:14px;width:717px;Height:36px;border:0px solid red;background-color:#CCDDF9;padding-top:15px;padding-left:5px;line-height:13px;Overflow:hidden;white-space:normal;}

#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}

]]></>).toString());
  }
}
})();

(function () {
var patt=/WILL-CALL/g;
var result=patt.test(stt);
 if (result==true){
var r=confirm("Delivery Instructions in the Special Instructions!!!" + '\n' + "Press Ok to put Special Instructions in the Delevery Instructions");
if (r==true)
  {
GM_addStyle((<><![CDATA[
@media print
{
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{margin-top:0px !important;margin-left:0px;width:411px !important;height:115px; !important;Padding-left:9px !important;z-index:10 !important;}
}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{position:absolute;top:-310px;left:60px;text-align:left;margin-right:260px;border:0px solid black;height:115px;width:398px;padding-left:4px;padding-top:2px; font-weight:bold;Font-size:15px;line-height:18px;}]
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]:after {content:"Please write your delivery instructions in the [ Intercampus Mail / Will-Call / Distribution ] section at the bottom of the shopping cart page by clicking the [ drop down window ] and selecting [ Other ].  Then write in your delivery instructions when the text box appears.  Please don't use the special instructions on the request for delivery instructions. If you write your delivery instructions in the proper place you will have a better chance of receiving your job where you had intended it to go. ";}
form[action^="ProductionJobTicket"] tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{position:absolute;left:65px;top:14px;width:717px;Height:36px;border:0px solid red;background-color:#CCDDF9;padding-top:15px;padding-left:5px;line-height:13px;Overflow:hidden;white-space:normal;}

#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}

]]></>).toString());
  }
}
})();

(function () {
var patt=/Ship/g;
var result=patt.test(stt);
 if (result==true){
var r=confirm("Delivery Instructions in the Special Instructions!!!" + '\n' + "Press Ok to put Special Instructions in the Delevery Instructions");
if (r==true)
  {
GM_addStyle((<><![CDATA[
@media print
{
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{margin-top:0px !important;margin-left:0px;width:411px !important;height:115px; !important;Padding-left:9px !important;z-index:10 !important;}
}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{position:absolute;top:-310px;left:60px;text-align:left;margin-right:260px;border:0px solid black;height:115px;width:398px;padding-left:4px;padding-top:2px; font-weight:bold;Font-size:15px;line-height:18px;}]
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]:after {content:"Please write your delivery instructions in the [ Intercampus Mail / Will-Call / Distribution ] section at the bottom of the shopping cart page by clicking the [ drop down window ] and selecting [ Other ].  Then write in your delivery instructions when the text box appears.  Please don't use the special instructions on the request for delivery instructions. If you write your delivery instructions in the proper place you will have a better chance of receiving your job where you had intended it to go. ";}
form[action^="ProductionJobTicket"] tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{position:absolute;left:65px;top:14px;width:717px;Height:36px;border:0px solid red;background-color:#CCDDF9;padding-top:15px;padding-left:5px;line-height:13px;Overflow:hidden;white-space:normal;}

#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}

]]></>).toString());
  }
}
})();

(function () {
var patt=/ship/g;
var result=patt.test(stt);
 if (result==true){
var r=confirm("Delivery Instructions in the Special Instructions!!!" + '\n' + "Press Ok to put Special Instructions in the Delevery Instructions");
if (r==true)
  {
GM_addStyle((<><![CDATA[
@media print
{
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{margin-top:0px !important;margin-left:0px;width:411px !important;height:115px; !important;Padding-left:9px !important;z-index:10 !important;}
}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{position:absolute;top:-310px;left:60px;text-align:left;margin-right:260px;border:0px solid black;height:115px;width:398px;padding-left:4px;padding-top:2px; font-weight:bold;Font-size:15px;line-height:18px;}]
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]:after {content:"Please write your delivery instructions in the [ Intercampus Mail / Will-Call / Distribution ] section at the bottom of the shopping cart page by clicking the [ drop down window ] and selecting [ Other ].  Then write in your delivery instructions when the text box appears.  Please don't use the special instructions on the request for delivery instructions. If you write your delivery instructions in the proper place you will have a better chance of receiving your job where you had intended it to go. ";}
form[action^="ProductionJobTicket"] tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{position:absolute;left:65px;top:14px;width:717px;Height:36px;border:0px solid red;background-color:#CCDDF9;padding-top:15px;padding-left:5px;line-height:13px;Overflow:hidden;white-space:normal;}

#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}

]]></>).toString());
  }
}
})();

(function () {
var patt=/SHIP/g;
var result=patt.test(stt);
 if (result==true){
var r=confirm("Delivery Instructions in the Special Instructions!!!" + '\n' + "Press Ok to put Special Instructions in the Delevery Instructions");
if (r==true)
  {
GM_addStyle((<><![CDATA[
@media print
{
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{margin-top:0px !important;margin-left:0px;width:411px !important;height:115px; !important;Padding-left:9px !important;z-index:10 !important;}
}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{position:absolute;top:-310px;left:60px;text-align:left;margin-right:260px;border:0px solid black;height:115px;width:398px;padding-left:4px;padding-top:2px; font-weight:bold;Font-size:15px;line-height:18px;}]
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]:after {content:"Please write your delivery instructions in the [ Intercampus Mail / Will-Call / Distribution ] section at the bottom of the shopping cart page by clicking the [ drop down window ] and selecting [ Other ].  Then write in your delivery instructions when the text box appears.  Please don't use the special instructions on the request for delivery instructions. If you write your delivery instructions in the proper place you will have a better chance of receiving your job where you had intended it to go. ";}
form[action^="ProductionJobTicket"] tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{position:absolute;left:65px;top:14px;width:717px;Height:36px;border:0px solid red;background-color:#CCDDF9;padding-top:15px;padding-left:5px;line-height:13px;Overflow:hidden;white-space:normal;}

#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}

]]></>).toString());
  }
}
})();

(function () {
var patt=/Nato/g;
var result=patt.test(stt);
 if (result==true){
var r=confirm("Delivery Instructions in the Special Instructions!!!" + '\n' + "Press Ok to put Special Instructions in the Delevery Instructions");
if (r==true)
  {
GM_addStyle((<><![CDATA[
@media print
{
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{margin-top:0px !important;margin-left:0px;width:411px !important;height:115px; !important;Padding-left:9px !important;z-index:10 !important;}
}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{position:absolute;top:-310px;left:60px;text-align:left;margin-right:260px;border:0px solid black;height:115px;width:398px;padding-left:4px;padding-top:2px; font-weight:bold;Font-size:15px;line-height:18px;}]
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]:after {content:"Please write your delivery instructions in the [ Intercampus Mail / Will-Call / Distribution ] section at the bottom of the shopping cart page by clicking the [ drop down window ] and selecting [ Other ].  Then write in your delivery instructions when the text box appears.  Please don't use the special instructions on the request for delivery instructions. If you write your delivery instructions in the proper place you will have a better chance of receiving your job where you had intended it to go. ";}
form[action^="ProductionJobTicket"] tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{position:absolute;left:65px;top:14px;width:717px;Height:36px;border:0px solid red;background-color:#CCDDF9;padding-top:15px;padding-left:5px;line-height:13px;Overflow:hidden;white-space:normal;}

#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}

]]></>).toString());
  }
}
})();

(function () {
var patt=/nato/g;
var result=patt.test(stt);
 if (result==true){
var r=confirm("Delivery Instructions in the Special Instructions!!!" + '\n' + "Press Ok to put Special Instructions in the Delevery Instructions");
if (r==true)
  {
GM_addStyle((<><![CDATA[
@media print
{
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{margin-top:0px !important;margin-left:0px;width:411px !important;height:115px; !important;Padding-left:9px !important;z-index:10 !important;}
}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{position:absolute;top:-310px;left:60px;text-align:left;margin-right:260px;border:0px solid black;height:115px;width:398px;padding-left:4px;padding-top:2px; font-weight:bold;Font-size:15px;line-height:18px;}]
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]:after {content:"Please write your delivery instructions in the [ Intercampus Mail / Will-Call / Distribution ] section at the bottom of the shopping cart page by clicking the [ drop down window ] and selecting [ Other ].  Then write in your delivery instructions when the text box appears.  Please don't use the special instructions on the request for delivery instructions. If you write your delivery instructions in the proper place you will have a better chance of receiving your job where you had intended it to go. ";}
form[action^="ProductionJobTicket"] tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{position:absolute;left:65px;top:14px;width:717px;Height:36px;border:0px solid red;background-color:#CCDDF9;padding-top:15px;padding-left:5px;line-height:13px;Overflow:hidden;white-space:normal;}

#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}

]]></>).toString());
  }
}
})();

(function () {
var patt=/NATO/g;
var result=patt.test(stt);
 if (result==true){
var r=confirm("Delivery Instructions in the Special Instructions!!!" + '\n' + "Press Ok to put Special Instructions in the Delevery Instructions");
if (r==true)
  {
GM_addStyle((<><![CDATA[
@media print
{
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{margin-top:0px !important;margin-left:0px;width:411px !important;height:115px; !important;Padding-left:9px !important;z-index:10 !important;}
}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{position:absolute;top:-310px;left:60px;text-align:left;margin-right:260px;border:0px solid black;height:115px;width:398px;padding-left:4px;padding-top:2px; font-weight:bold;Font-size:15px;line-height:18px;}]
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]:after {content:"Please write your delivery instructions in the [ Intercampus Mail / Will-Call / Distribution ] section at the bottom of the shopping cart page by clicking the [ drop down window ] and selecting [ Other ].  Then write in your delivery instructions when the text box appears.  Please don't use the special instructions on the request for delivery instructions. If you write your delivery instructions in the proper place you will have a better chance of receiving your job where you had intended it to go. ";}
form[action^="ProductionJobTicket"] tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{position:absolute;left:65px;top:14px;width:717px;Height:36px;border:0px solid red;background-color:#CCDDF9;padding-top:15px;padding-left:5px;line-height:13px;Overflow:hidden;white-space:normal;}

#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}

]]></>).toString());
  }
}
})();

(function () {
var patt=/deliever/g;
var result=patt.test(stt);
 if (result==true){
var r=confirm("Delivery Instructions in the Special Instructions!!!" + '\n' + "Press Ok to put Special Instructions in the Delevery Instructions");
if (r==true)
  {
GM_addStyle((<><![CDATA[
@media print
{
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{margin-top:0px !important;margin-left:0px;width:411px !important;height:115px; !important;Padding-left:9px !important;z-index:10 !important;}
}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{position:absolute;top:-310px;left:60px;text-align:left;margin-right:260px;border:0px solid black;height:115px;width:398px;padding-left:4px;padding-top:2px; font-weight:bold;Font-size:15px;line-height:18px;}]
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]:after {content:"Please write your delivery instructions in the [ Intercampus Mail / Will-Call / Distribution ] section at the bottom of the shopping cart page by clicking the [ drop down window ] and selecting [ Other ].  Then write in your delivery instructions when the text box appears.  Please don't use the special instructions on the request for delivery instructions. If you write your delivery instructions in the proper place you will have a better chance of receiving your job where you had intended it to go. ";}
form[action^="ProductionJobTicket"] tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{position:absolute;left:65px;top:14px;width:717px;Height:36px;border:0px solid red;background-color:#CCDDF9;padding-top:15px;padding-left:5px;line-height:13px;Overflow:hidden;white-space:normal;}

#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}

]]></>).toString());
  }
}
})();

(function () {
var patt=/Deliever/g;
var result=patt.test(stt);
 if (result==true){
var r=confirm("Delivery Instructions in the Special Instructions!!!" + '\n' + "Press Ok to put Special Instructions in the Delevery Instructions");
if (r==true)
  {
GM_addStyle((<><![CDATA[
@media print
{
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{margin-top:0px !important;margin-left:0px;width:411px !important;height:115px; !important;Padding-left:9px !important;z-index:10 !important;}
}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{position:absolute;top:-310px;left:60px;text-align:left;margin-right:260px;border:0px solid black;height:115px;width:398px;padding-left:4px;padding-top:2px; font-weight:bold;Font-size:15px;line-height:18px;}]
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]:after {content:"Please write your delivery instructions in the [ Intercampus Mail / Will-Call / Distribution ] section at the bottom of the shopping cart page by clicking the [ drop down window ] and selecting [ Other ].  Then write in your delivery instructions when the text box appears.  Please don't use the special instructions on the request for delivery instructions. If you write your delivery instructions in the proper place you will have a better chance of receiving your job where you had intended it to go. ";}
form[action^="ProductionJobTicket"] tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{position:absolute;left:65px;top:14px;width:717px;Height:36px;border:0px solid red;background-color:#CCDDF9;padding-top:15px;padding-left:5px;line-height:13px;Overflow:hidden;white-space:normal;}

#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}

]]></>).toString());
  }
}
})();

(function () {
var patt=/McClellan/g;
var result=patt.test(stt);
 if (result==true){
var r=confirm("Delivery Instructions in the Special Instructions!!!" + '\n' + "Press Ok to put Special Instructions in the Delevery Instructions");
if (r==true)
  {
GM_addStyle((<><![CDATA[
@media print
{
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{margin-top:0px !important;margin-left:0px;width:411px !important;height:115px; !important;Padding-left:9px !important;z-index:10 !important;}
}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{position:absolute;top:-310px;left:60px;text-align:left;margin-right:260px;border:0px solid black;height:115px;width:398px;padding-left:4px;padding-top:2px; font-weight:bold;Font-size:15px;line-height:18px;}]
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]:after {content:"Please write your delivery instructions in the [ Intercampus Mail / Will-Call / Distribution ] section at the bottom of the shopping cart page by clicking the [ drop down window ] and selecting [ Other ].  Then write in your delivery instructions when the text box appears.  Please don't use the special instructions on the request for delivery instructions. If you write your delivery instructions in the proper place you will have a better chance of receiving your job where you had intended it to go. ";}
form[action^="ProductionJobTicket"] tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{position:absolute;left:65px;top:14px;width:717px;Height:36px;border:0px solid red;background-color:#CCDDF9;padding-top:15px;padding-left:5px;line-height:13px;Overflow:hidden;white-space:normal;}

#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}

]]></>).toString());
  }
}
})();

(function () {
var patt=/Davis Hall/g;
var result=patt.test(stt);
 if (result==true){
var r=confirm("Delivery Instructions in the Special Instructions!!!" + '\n' + "Press Ok to put Special Instructions in the Delevery Instructions");
if (r==true)
  {
GM_addStyle((<><![CDATA[
@media print
{
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{margin-top:0px !important;margin-left:0px;width:411px !important;height:115px; !important;Padding-left:9px !important;z-index:10 !important;}
}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl01_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]{position:absolute;top:-310px;left:60px;text-align:left;margin-right:260px;border:0px solid black;height:115px;width:398px;padding-left:4px;padding-top:2px; font-weight:bold;Font-size:15px;line-height:18px;}]
#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_PrintOptionsRepeater_ctl02_JobSummaryParts_JobSummaryPartData tr td[valign="top"][class="left w448"]:after {content:"Please write your delivery instructions in the [ Intercampus Mail / Will-Call / Distribution ] section at the bottom of the shopping cart page by clicking the [ drop down window ] and selecting [ Other ].  Then write in your delivery instructions when the text box appears.  Please don't use the special instructions on the request for delivery instructions. If you write your delivery instructions in the proper place you will have a better chance of receiving your job where you had intended it to go. ";}
form[action^="ProductionJobTicket"] tr .bg-BuR-000100{background-color:#CCDDF9;border:0px #000000 solid;}

#ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FilesRow table tr td div table #ctl00_ctl00_C_M_JobSummary_Repeater_ctl00_JobSummary_JobList_ctl01_FileRepeater_ctl01_FileLinkButton{position:absolute;left:65px;top:14px;width:717px;Height:36px;border:0px solid red;background-color:#CCDDF9;padding-top:15px;padding-left:5px;line-height:13px;Overflow:hidden;white-space:normal;}

#ctl00_ctl00_C_M_lblCompanyNameValue{text-decoration:line-through;color:#A0A0A0;}
#ctl00_ctl00_C_M_lblDepartmentNameValue{text-decoration:line-through;color:#A0A0A0;}

]]></>).toString());
  }
}
})();