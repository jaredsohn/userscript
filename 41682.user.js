// ==UserScript==
// @name           Neptun DE Additions
// @namespace      http://neptun.unideb.hu
// @description    Neptun Debreceni Egyetem Additions - fejlesztés alatt, ezért NE használd! (ha mégis megteszed, tiéd a felelősség)
// @include        https://www*.neptun.unideb.hu/*
// ==/UserScript==

function clickOkOnLoginSurvey () {
	var surveyReqLabel = document.getElementById('userctrlmodalOpinionConfirmation_ConfirmOpinion_Label1');//kérdőív label
	if (surveyReqLabel.value != "") {
		var noBtn = document.getElementById('userctrlmodalOpinionConfirmation_ConfirmOpinion_btnNo');//nem gomb
		noBtn.click();
	}
}

function enableAutoCompleteOnLogin () {
	document.getElementById('Form1').setAttribute('autocomplete','on');
}

if (document.location.href.indexOf('main.aspx') != -1) {
	clickOkOnLoginSurvey();
}	
else
if (document.location.href.indexOf('login.aspx') != -1) {
	enableAutoCompleteOnLogin();
}
