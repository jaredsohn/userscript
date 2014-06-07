// ==UserScript==
// @name           CHEX System Administrator Enhancements
// @namespace      http://userscripts.org/users/83810
// @include        http://chex.omnisocialpc.mzinga.com/app/*
// @include        http://chextest.omnisocialpc.mzinga.com/app/*
// @description    Makes various modifications to the CHEX Admin User Interface
// @grant          none
// @version        1.03
// @updateURL      http://userscripts.org/scripts/source/89701.user.js
// ==/UserScript==

// update log
// version 1.02: 
//added courseEnrollments.do to the list of pages that swap First and Last Name fields
// version 1.03:
//added accessGroups.do to the list of pages that swap First and Last Name fields
// for next revision I may just have it check for "/app/userSearch/criteria/" within the pathname

// FUNCTIONS SECTION (DO NOT DELETE)
// The XPath function provides a way to pinpoint an HTML tag on a given page. To generate these XPATHs,
// I use FireBug with the FirePath extension that allows you to right click on a node and identify the location, e.g. "html/body/div/table[2]/tbody/tr/td"

var XPath = function (path) {
    return document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
};


//------------------------------------------------------


//Add duplicate buttons at the top of the page to prevent the need for scrolling to the bottom of the page

//Add "Add Student" button to the top of Manager Assignments page. Useful when someone has many people on his/her list and admin would have to scroll to the bottom of the list to access the existing button.
if (window.location.pathname == "/app/servlet/navigation") {
screenSubTitle=XPath("html/body/div/table[2]/tbody/tr/td");
	if (screenSubTitle) {
		if ((screenSubTitle.className=="screensubtitle") && (screenSubTitle.innerHTML=="Assigned Students")) {
			screenSubTitle.innerHTML = "Assigned Students<br>";
			var mytd = screenSubTitle;
			var button = document.createElement("button");
				button.style.cursor = "pointer";
				button.innerHTML="Add Student";
				button.setAttribute('title','Add');
				button.setAttribute('id','AddButton2');
	
				button.setAttribute('onClick','document.NewMenteeForm.submit();');
			mytd.appendChild(button);
		}
	}
}
//------------------------------------------------------


//Add "Refresh" button to the top of Actuate reports pages (useful if there are many reports listed and scrolling would be necessary to click existing button)
if (window.location.pathname == "/app/servlet/navigation") {
	screenTitle = XPath("html/body/div/table[1]/tbody/tr/td[1]");
	if (screenTitle ) {
			if ((screenTitle.className=="screentitle") && ((screenTitle.innerHTML=="My LMS Reports") || (screenTitle.innerHTML=="Run and Save Reports") || (screenTitle.innerHTML=="Click and Go Reports")||(screenTitle.innerHTML=="Completed Reports"))) {
			screenTitle.innerHTML = screenTitle.innerHTML + "  ";
			var mytd = screenTitle ;
			var button = document.createElement("button");
				button.style.cursor = "pointer";
				button.innerHTML="Refresh";
				button.setAttribute('title','Refresh');
				button.setAttribute('id','RefreshButton');
				button.setAttribute('onClick','refresh();');
			mytd.appendChild(button);
		}
	}
}
//------------------------------------------------------


//Swap the Last and First name fields on the user search page
if ((window.location.pathname == "/app/servlet/navigation") ||
   (window.location.pathname == "/app/userSearch/criteria/newManagerAssignment.do") ||
   (window.location.pathname == "/app/userSearch/criteria/managerSearch.do") || 
   (window.location.pathname == "/app/userSearch/criteria/userAccounts.do") ||
   (window.location.pathname == "/app/userSearch/criteria/accessGroups.do") ||
   (window.location.pathname == "/app/userSearch/criteria/roster/courseEnrollments.do") ||
   (window.location.pathname == "/app/userSearch/criteria/roster/programEnrollments.do")) {

	var firstSearchBox = XPath(".//*[@id='criteria']/div/div[1]/div[1]");
	var firstSearchBoxVal = XPath(".//*[@id='criteria']/div/div[1]/div[1]/input").value; //storing these so I can put them back
	var secondSearchBox = XPath(".//*[@id='criteria']/div/div[1]/div[2]");
	var secondSearchBoxVal = XPath(".//*[@id='criteria']/div/div[1]/div[2]/input").value; //storing these so I can put them back
	if(firstSearchBox) {
	    firstSearchBox.innerHTML='<span><b>Last Name:</b></span>\n<input class="os-field-textbox" type="text" value="'+secondSearchBoxVal+'" name="lastName"/>';};
	
	if(secondSearchBox) {
	 secondSearchBox.innerHTML='<span><b>First Name:</b></span>\n<input class="os-field-textbox" type="text" value="'+firstSearchBoxVal+'" name="firstName"/>';};
	
	document.criteria.lastName.focus();

};
console.log(window.location.pathname);
//------------------------------------------------------


// Make the eLearning URL 200 characters wide instead of 40 characters
// to make it easier to access the contents of this field (e.g. when you 
// need to send someone the URL that goes directly to the content
if  (window.location.pathname == "/app/courseinformation.ctl") {
	var URLBox = document.getElementsByName('courseURL');
	if (URLBox[0]) {
		URLBox[0].setAttribute('size','200');};
	var URLBox = document.getElementsByName('relaunchURL');
	if (URLBox[0]) {
		URLBox[0].setAttribute('size','200');};
};
//------------------------------------------------------


//Set the True False Question Value to 1 by default (if it is currently set to zero).
//This has been a pitfall, forgetting to change the question value from 0 to 1 on a True/False Question. So this code switches it automatically to 1
if (window.location.pathname=="/app/adaptassess/adapt_question_tf.jsp") {
	trueFalseQuestionValue = XPath("html/body/div/form/table[3]/tbody/tr[1]/td[2]/input[1]");
	if  ((trueFalseQuestionValue.value == 0) && (trueFalseQuestionValue.name == "n_question_value")) {trueFalseQuestionValue.value = 1}
}
//------------------------------------------------------


//Change the default assessment Question type to General instead of ADAPTIVE since I have never used Adaptive testing, and it is confusing 
//to have Adaptive as the category of test questions simply because I forgot to change it to General.
QuestionOptions = document.evaluate("html/body/div/form[2]/table[2]/tbody/tr/td[2]/select/option", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = QuestionOptions.snapshotLength - 1; i >= 0; i--) {
	if  (QuestionOptions.snapshotItem(i).innerHTML == "General") {
		QuestionOptions.snapshotItem(i).setAttribute('selected','');
		} else {
		QuestionOptions.snapshotItem(i).removeAttribute('selected'); }
}
//------------------------------------------------------
