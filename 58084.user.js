// ==UserScript==
// @name           Smooth SAS Pre-release
// @namespace      http://userscripts.org/users/53853
// @description    Some fixes for the KVCC Student Access System
// @include        https://www.kvcc.me.edu/sas/*
// ==/UserScript==

//some useful functions
function addGlobalStyle(css){
	var head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	var style = document.createElement('style');
	style.type = 'text/css';
	head.appendChild(style);
	try{
		style.appendChild(document.createTextNode(css));
		style.innerHTML = css;
	}catch(e) {
	}
}


function loadXML(xmlString) {
  try {
    xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async="false";
    xmlDoc.loadXML(xmlString);
    return xmlDoc;
  }
  catch(e) {
    parser=new DOMParser();
    xmlDoc=parser.parseFromString(xmlString,"text/xml");
    return xmlDoc;
  }
}

unsafeWindow.validateForm = function(form) {
	name = document.getElementById('name').value.split(" ");
	document.getElementById('fname').value = name[0];
	document.getElementById('lname').value = name[1];

}

//set global style params

addGlobalStyle('body { background: #FFFFFF ! important; font-family: Arial; }');
addGlobalStyle('#logo { font-weight: bold; letter-spacing: 8px; text-align: center; width: 400px; }');
addGlobalStyle('@media print{ .print { display: block; } .other { display: none; } }');

//set some global vars

logoHTML = "<div id='logo' class='other'><img src='http://rbmyr8.freehostia.com/files/smooth.jpg'><br>Student Access System</div>";
msg = "";

//get current page

currentPage = window.location.href.split("/");
currentPage = currentPage[currentPage.length - 1].split("#");
currentPage = currentPage[0];

//Login Page

if(currentPage == "") {
document.location.href = "http://www.kvcc.me.edu/sas/logon.aspx";
}

if(currentPage == "Logoff.aspx") {
	document.body.innerHTML = "For security reasons, Firefox does not allow Javascript to close windows. To fully log out, please restart Firefox.";
}

if(currentPage == "Timeoutmain.aspx" || currentPage == "TimeoutMain.aspx") {
	document.location.href="http://www.kvcc.me.edu/sas/top.htm";
}

if(currentPage == "top.htm") {
	addGlobalStyle("#loginlink { text-decoration: none; }");
	addGlobalStyle("#loginlink:hover { text-decoration: line-through; }");
	document.body.innerHTML = "Your session has expired. Please <a id='loginlink' target='_self' href='logon.aspx'>Log In</a>.";
}

if(currentPage == "PINChanged.aspx") {
	document.body.innerHTML = "Your password has been changed. Please click <a href='https://www.kvcc.me.edu/sas/logon.aspx'>here</a> to log in using your new password.";
	document.title = "Password Changed";
}

if(currentPage == "logon.aspx") {


key1 = document.getElementById("__EVENTVALIDATION").value;
key2 = document.getElementById("__VIEWSTATE").value;

bodyHTML = "<div id='container'>" +
logoHTML +
"<form name='FrmLogon' action='logon.aspx' method='post' onsubmit=validateForm(this)>" +
"<input type='hidden' name='__EVENTTARGET' value=''>" +
"<input type='hidden' name='__EVENTARGS' value=''>" +
"<input type='hidden' name='__VIEWSTATE' value='" + key2 + "'>" +
"<input type='hidden' name='__EVENTVALIDATION' value='" + key1 + "'>" +
"<div id='loginform'><div id='input'>Name: <input id='name'><br>" +
"<input type='hidden' id='fname' name='FirstName' value=''>" +
"<input type='hidden' id='lname' name='LastName' value=''>" +
"Password: &nbsp;&nbsp;<input name='PIN' type='password'></div><br>" +
"<input type='submit' name='submit' value='Go!'></div>" +
"</form>" +
"<div id='links'>" +
"<a href='https://www.kvcc.me.edu/sas/NewPIN.aspx'>Register</a>" +
"<a href='https://www.kvcc.me.edu/sas/PINLookup.aspx'>Forgot Password</a>" +
"<a href='https://www.kvcc.me.edu/sas/Help/Index.aspx'>Help</a>" +
"</div></div>";

document.title = "Smooth SAS Login";
document.body.innerHTML = bodyHTML;

addGlobalStyle('#container { width: 400px; height: 400px; position: absolute; top: 50%; left: 50%; margin-left: -200px; margin-top: -200px; text-align: center; }');
addGlobalStyle('#input { width: 315px; text-align: right; line-height: 200%; }');
addGlobalStyle('#loginform { width: 400px; }');
addGlobalStyle('#links { width: 400px; }');
addGlobalStyle('#links a { margin: 12px; text-decoration: none }');
addGlobalStyle('#links a:hover { text-decoration: line-through }');
addGlobalStyle('h1 { margin: 0px; padding: 0px; }');

}
if(currentPage == "MenuMain.aspx?thanks") {
	msg = "<br><br><br><div id='welcome'>Your feedback was recieved. Thanks!</div>";
	currentPage="menumain.aspx";
}

//Main Menu
if(currentPage.toLowerCase() == "menumain.aspx") {

links = '<?xml version="1.0"?>\
<links>\
  <class_info>\
    <link>\
      <name>Grade Report</name>\
      <url>https://www.kvcc.me.edu/sas/Grades/GradesPrint.aspx</url>\
    </link>\
    <link>\
      <name>Unofficial Transcript</name>\
      <url>https://www.kvcc.me.edu/sas/Grades/UTranscriptPrint.aspx</url>\
    </link>\
    <link>\
      <name>Room Schedule</name>\
      <url>https://www.kvcc.me.edu/Website/Frames/WebSiteData/AcademicInformation/RoomSchedules/RoomSchedules.aspx</url>\
    </link>\
    <link>\
      <name>Schedule (By Semester)</name>\
      <url>https://www.kvcc.me.edu/sas/Schedule.aspx</url>\
    </link>\
    <link>\
      <name>Cancellations</name>\
      <url>https://www.kvcc.me.edu/Website/Frames/WebSiteData/StudentResources/Cancellations/Cancellations.aspx</url>\
    </link>\
    '+/* Include this when Text Blasting signup is fixed
	<link>\
      <name>Text Message Alerts</name>\
      <url>https://www.kvcc.me.edu/sas/TextSignUp.aspx</url>\
    </link>\*/
    '<link>\
      <name>Course Evaluation</name>\
      <url>https://www.kvcc.me.edu/sas/EvalLst.aspx</url>\
    </link>\
  </class_info>\
  <student_info>\
    <link>\
      <name>Unofficial Student Overview Report</name>\
      <url>https://www.kvcc.me.edu/sas/sor.aspx</url>\
    </link>\
    <link>\
      <name>Update My Information</name>\
      <url>https://www.kvcc.me.edu/sas/UpdateStudentInformation.aspx</url>\
    </link>\
	<link>\
      <name>Library Barcode and Student ID</name>\
      <url>https://www.kvcc.me.edu/sas/SASBarLookup.aspx</url>\
    </link>\
  </student_info>\
  <assistance>\
    <link>\
      <name>Campus Map</name>\
      <url>https://www.kvcc.me.edu/Website/Frames/WebSiteData/ProspectiveStudents/VisitingKVTC/campus.aspx</url>\
    </link>\
    <link>\
      <name>Faculty and Staff Directory</name>\
      <url>https://www.kvcc.me.edu/Website/Frames/WebSiteData/AcademicInformation/FacultyStaffDirectory/FacultyStaffDirectory.aspx</url>\
    </link>\
    <link>\
      <name>Tutoring</name>\
      <url>https://www.kvcc.me.edu/sas/Tutor/TutorMain.aspx</url>\
    </link>\
    <link>\
      <name>Job Postings</name>\
      <url>https://www.kvcc.me.edu/sas/jobpostings/jobpostings.aspx</url>\
    </link>\
  </assistance>\
  <financial>\
    <link>\
      <name>Cashier\'s Office</name>\
      <url>https://www.kvcc.me.edu/sas/BillHistory.aspx</url>\
    </link>\
	<link>\
      <name>Financial Aid Folder</name>\
      <url>https://www.kvcc.me.edu/sas/Fa/Fa.aspx</url>\
    </link>\
  </financial>\
  <new_semester>\
	<link>\
      <name>My Advisor</name>\
      <url>https://www.kvcc.me.edu/sas/advisorlookupssn.aspx</url>\
    </link>\
	<link>\
      <name>New Student Orientation</name>\
      <url>https://www.kvcc.me.edu/sas/Registration/NSOReg.aspx</url>\
    </link>\
	<link>\
      <name>Registration</name>\
      <url>https://www.kvcc.me.edu/sas/Registration/regstart.aspx</url>\
    </link>\
	<link>\
      <name>Textbooks</name>\
      <url>https://www.kvcc.me.edu/sas/TextBookRes.aspx</url>\
    </link>\
	<link>\
      <name>Parking Sticker</name>\
      <url>https://www.kvcc.me.edu/sas/StudentParking.aspx</url>\
    </link>\
	<link>\
      <name>Immunization Records</name>\
      <url>https://www.kvcc.me.edu/sas/Immunization.aspx</url>\
    </link>\
  </new_semester>\
  <misc>\
    <link>\
      <name>Carpool Application</name>\
      <url>https://www.kvcc.me.edu/sas/carpool.aspx</url>\
    </link>\
    <link>\
      <name>Service Learning Opportunities</name>\
      <url>https://www.kvcc.me.edu/sas/ServiceLearning/SLSites.aspx</url>\
    </link>\
    <link>\
      <name>Printing Count</name>\
      <url>https://www.kvcc.me.edu/sas/PrintReport.aspx</url>\
    </link>\
    <link>\
      <name>Student Forms</name>\
      <url>https://www.kvcc.me.edu/Website/Frames/Departments/advising/advising/forms.aspx</url>\
    </link>\
  </misc>\
  <SAS>\
    <link>\
      <name>Change Password</name>\
      <url>https://www.kvcc.me.edu/sas/PINChange.aspx</url>\
    </link>\
    <link>\
      <name>Smooth SAS Feedback</name>\
      <url>https://www.kvcc.me.edu/sas/Feedback/Feedback.aspx</url>\
    </link>\
  </SAS>\
</links>';

bodyHTML = logoHTML;
xmlMenu = loadXML(links);
rootMenu = xmlMenu.getElementsByTagName("links")[0];
categories = new Array();
categories[0] = new Array("Class Info", "class_info");
categories[1] = new Array("Student Info", "student_info");
categories[2] = new Array("Assistance", "assistance");
categories[3] = new Array("Financial", "financial");
categories[4] = new Array("New Semester", "new_semester");
categories[5] = new Array("Other", "misc");
categories[6] = new Array("Smooth SAS", "SAS");
// maybe add quarantined email: <a class='general' href='https://scm.kvcc.me.edu:5250/spin/SelfAdmin/Report.csp' style='color: red;'>Quarantined Email</a>
menuHTML = "<div id='linkbar' class='other'><a class='general' href='http://mail.kvcc.me.edu/exchange'>Email</a><a class='general' href='https://www.kvcc.me.edu/sas/Help/Index.aspx'>Help</a><a class='general' href='https://www.kvcc.me.edu/sas/Logoff.aspx'>Log Out</a></div>";
menuHTML += "<div id='menu' class='other'><ul id='nav'>";

for(c=0;c<categories.length;c++) {
	categoryName = categories[c][0];
	categoryId = categories[c][1];
	catLinks = rootMenu.getElementsByTagName(categoryId)[0].getElementsByTagName("link");
	menuHTML += "<li><a class='no' href='#'>" + categoryName + "</a><ul>";
	for(l=0;l<catLinks.length;l++) {
		linkName = catLinks[l].children[0].textContent;
		linkUrl = catLinks[l].children[1].textContent;
		menuHTML += "<li class='links'><a class='link' href='javascript:loadPage(\"" + escape(linkName) + "\", \"" + linkUrl + "\")'>" + linkName + "</a></li>";
	}
	menuHTML += "</ul></li>";
}
menuHTML += "</ul></div>";

bodyHTML += menuHTML;
bodyHTML += "<div id='note' class='other'></div>";
bodyHTML += "<div id='content' class='print'></div>"

if(msg == "") {
	msg = "<br><br><br><div id='welcome'>Welcome to the (organized) Student Access System.<br>Please select a link from the menu above.</div>";
}

addGlobalStyle('#linkbar { position: absolute; top: 10; right: 20; }');
addGlobalStyle('a.general { padding: 5px; font-size: 10pt; text-decoration: none; color: #0000ff; }');
addGlobalStyle('a.general:hover { text-decoration: line-through; }');
addGlobalStyle('#menu { border-top: 1px solid black; border-bottom: 1px solid black; height: 20px; background: #ccc }');
addGlobalStyle('#nav li { float: left; padding-right: 15px; }');
addGlobalStyle('#nav a.no { display: block; text-decoration: none; color: blue; }');
addGlobalStyle('#nav, #nav ul { padding: 0; margin: 0; list-style: none; position: absolute; }');
addGlobalStyle('#nav a.link { display: block; width: 10em; text-decoration: none; border-bottom: 1px solid black; }');
addGlobalStyle('#nav li.links { float: left; }');
addGlobalStyle('#nav li ul { position: absolute; border-left: 1px solid black; width: 10em; left: -999em; }');
addGlobalStyle('#nav li:hover ul, #nav li.sfhover ul { left: auto; background: #ccc; }');
addGlobalStyle('#content { clear: left; top: 150px; line-height: 1.2; font-size: 12px; z-index: -1; position: absolute; }');
addGlobalStyle('#welcome { font-size: 32px; color: #ccc; }');

unsafeWindow.loadPage = function(name, url, params) {
	params = params?params:'';
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.setRequestHeader("Content-length", params.length);
	xmlhttp.setRequestHeader("Connection", "close");
	xmlhttp.onreadystatechange=function() {
		if(xmlhttp.readyState==4) { setPage(name, xmlhttp.responseText); }
	};
	xmlhttp.send(params);
}

setPage = function(name, content) {
document.getElementById("note").innerHTML = "";

content = content.replace(/\.\.\//g, "");
content = content.replace(/rules="all"/g, "rules=\"\"");

if(name == "Grade Report") {
	document.getElementById("note").innerHTML = "For best printing results, go to File->Page Setup, and check \"Print Background.\"";
}

if(name == "Unofficial Transcript") {
	document.getElementById("note").innerHTML = "For best printing results, go to File->Page Setup, and check \"Print Background.\"";
}

if(name == "Room Schedule") {
	content = content.split("</Div>")[1];
	content = content.split("</span>")[0];
	content = content.replace(/(<td>|<\/td>|<\/tr>|<\/table>)/g, "");
	content = content.replace(/<table><tr><td width = 10%>/g, "<br>");
	content = content.replace(/href=/g, "class='general' href=\https://www.kvcc.me.edu/Website/Frames/WebSiteData/AcademicInformation/RoomSchedules/");
	content = "<h1>Room Schedules by Week</h1>" + content;
}

if(name == "Schedule (By Semester)") {
	unsafeWindow.viewSchedule = function() {
		year = document.getElementById("dropYear").value;
		term = document.getElementById("dropTerm").value;
		viewState = document.getElementById("__VIEWSTATE").value;
		val = document.getElementById("__EVENTVALIDATION").value;
		unsafeWindow.loadPage("Set Schedule", "https://www.kvcc.me.edu/sas/Schedule.aspx", "__VIEWSTATE=" + viewState + "&__EVENTVALIDATION=" + val + "&dropYear=" + year + "&dropTerm=" + term + "&Submit=Submit");
	}

	content = content.split("</font>");
	codes = content[3].split("<div>");
	viewState = codes[1].split("</div")[0];
	eventVal = codes[2].split("</div>")[0];
	yearSelector = content[4].split("<font")[0];
	yearSelector = yearSelector.replace("height:44px;", "");
	yearSelector = yearSelector.replace("--Select--", "Select Year");
	termSelector = content[5].split("<P")[0];
	termSelector = termSelector.replace("--Select--", "Select Term");
	submitButton = "<input type='button' onclick='viewSchedule();' value='View Schedule'>";
	content = "<h1>Schedule By Semester</h1>" + yearSelector + termSelector + viewState + eventVal + submitButton;
	document.getElementById("note").innerHTML = "This schedule is subject to change. Courses marked with a \"W\" are waitlisted.";
}

if(name == "Set Schedule") {
	content = content.split("</font>");
	content = "<h1>Schedule By Semester</h1>" + content[6];
	document.getElementById("note").innerHTML = "This schedule is subject to change. Courses marked with a \"W\" are waitlisted.";
}

if(name == "Cancellations") {
	content = content.split("<div class=\"mainContent\">")[1];
	content = content.split("<BR>")[0] + "</p>";
	content = content.replace(/\salign="center"/g, "");
	content = content.replace(/&nbsp;/, "");
	document.getElementById("note").innerHTML = "Unfortunately, the Sign-up page for text message alerts is down. I will update this section with a link when it is fixed."
}

if(name == "Course Evaluation") {
	content = "";
	document.getElementById("note").innerHTML = "I'm not even sure what this page is, but it's not working right now. When KVCC gets it fixed, I'll fix this section."
}

if(name == "Update My Information") {
	content = content.split("<br>&nbsp;<br>");
	content = content[0] + content[1];
	content = content.replace("<br>(YYYY-MM-DD)","");
	content = content.replace("legel","legal");
}

if(name == "Immunization Records") {
	content = content.replace(/\salign="center"/g, "");
	content = content.replace(/NotRecorded/g, "No Record");
}

if(name == "Smooth SAS Feedback") {
	content = "<form action='http://www.emailmeform.com/fid.php?formid=411885' method='post' enctype='multipart/form-data' accept-charset='UTF-8'><table>";
	content += "<tr><td colspan='5'>Accessibility:</td></tr><tr>";
	content += "<td style='text-align: center'><input type='radio' name='FieldData0' value='1'>1</td>";
	content += "<td style='text-align: center'><input type='radio' name='FieldData0' value='2'>2</td>";
	content += "<td style='text-align: center'><input type='radio' name='FieldData0' value='3'>3</td>";
	content += "<td style='text-align: center'><input type='radio' name='FieldData0' value='4'>4</td>";
	content += "<td style='text-align: center'><input type='radio' name='FieldData0' value='5'>5</td>";
	content += "</tr>";
	content += "<tr><td colspan='5'>Design:</td></tr><tr>";
	content += "<td style='text-align: center'><input type='radio' name='FieldData1' value='1'>1</td>";
	content += "<td style='text-align: center'><input type='radio' name='FieldData1' value='2'>2</td>";
	content += "<td style='text-align: center'><input type='radio' name='FieldData1' value='3'>3</td>";
	content += "<td style='text-align: center'><input type='radio' name='FieldData1' value='4'>4</td>";
	content += "<td style='text-align: center'><input type='radio' name='FieldData1' value='5'>5</td>";
	content += "</tr>";
	content += "<tr><td colspan='5'>Organization:</td></tr><tr>";
	content += "<td style='text-align: center'><input type='radio' name='FieldData2' value='1'>1</td>";
	content += "<td style='text-align: center'><input type='radio' name='FieldData2' value='2'>2</td>";
	content += "<td style='text-align: center'><input type='radio' name='FieldData2' value='3'>3</td>";
	content += "<td style='text-align: center'><input type='radio' name='FieldData2' value='4'>4</td>";
	content += "<td style='text-align: center'><input type='radio' name='FieldData2' value='5'>5</td>";
	content += "<tr><td colspan='5'>Comments:</td></tr><tr><td colspan='5'>";
	content += "<textarea name='FieldData3' rows='6'></textarea>";
	content += "</tr></td>";
	content += "</table>";
	content += "<input type='submit' value='Send Feedback' name='Submit'>";
	content += "<input type='reset' value='Clear'>";
	content += "</form>";
	document.getElementById("note").innerHTML = "Please rate Smooth SAS based on the categories below. Keep in mind we're still in beta! Any feedback is welcome.";
}

document.getElementById("content").innerHTML = content;
	
}


sfHover = function() {
	var sfEls = document.getElementById("nav").getElementsByTagName("LI");
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onmouseover=function() {
			this.className+=" sfhover";
		}
		sfEls[i].onmouseout=function() {
			this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
		}
	}
}

if (window.attachEvent) window.attachEvent("onload", sfHover);

document.title = "Smooth SAS Main Menu";
document.body.innerHTML = bodyHTML;
document.getElementById("content").innerHTML = msg;


}