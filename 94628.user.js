// ==UserScript==
// @name           Auto populate references
// @description    A script to populate references
// @author         dudley
// @include        https://*.do
// @version        1.1
// ==/UserScript==

var populate = "populateReferenceFields = function() {" +
"	document.getElementById('firstReferenceFirstName').value = 'refOne';"+
"	document.getElementById('firstReferenceLastName').value = 'refOneLast';"+
"	document.getElementById('firstReferenceAddressLine1').value = '123 referenceOne';"+
"	document.getElementById('firstReferenceCity').value = 'referenceOne';"+
"	document.getElementById('firstReferenceState').value = 'IA';"+
"	document.getElementById('firstReferenceZipCode').value = '12345';"+
"	document.getElementById('firstReferencePhoneAreaCode').value = '111';"+
"	document.getElementById('firstReferencePhoneTrunk').value = '111';"+
"	document.getElementById('firstReferencePhoneNumber').value = '1112';"+
"	document.getElementById('firstReferenceRelationship').options[1].selected = true;"+

"	document.getElementById('secondReferenceFirstName').value = 'refTwo';"+
"	document.getElementById('secondReferenceLastName').value = 'refTwoLast';"+
"	document.getElementById('secondReferenceAddressLine1').value = '123 referenceTwo';"+
"	document.getElementById('secondReferenceCity').value = 'referenceOne';"+
"	document.getElementById('secondReferenceState').value = 'IA';"+
"	document.getElementById('secondReferenceZipCode').value = '12345';"+
"	document.getElementById('secondReferencePhoneAreaCode').value = '222';"+
"	document.getElementById('secondReferencePhoneTrunk').value = '222';"+
"	document.getElementById('secondReferencePhoneNumber').value = '2222';"+
"	document.getElementById('secondReferenceRelationship').options[1].selected = true;"+

"  if (document.getElementById('thirdReferenceFirstName') != null) {"+
"	document.getElementById('thirdReferenceFirstName').value = 'refThree';"+
"	document.getElementById('thirdReferenceLastName').value = 'refThreeLast';"+
"	document.getElementById('thirdReferenceAddressLine1').value = '123 referenceThree';"+
"	document.getElementById('thirdReferenceCity').value = 'referenceThree';"+
"	document.getElementById('thirdReferenceState').value = 'IA';"+
"	document.getElementById('thirdReferenceZipCode').value = '12345';"+
"	document.getElementById('thirdReferencePhoneAreaCode').value = '333';"+
"	document.getElementById('thirdReferencePhoneTrunk').value = '333';"+
"	document.getElementById('thirdReferencePhoneNumber').value = '3333';"+
"	document.getElementById('thirdReferenceRelationship').options[1].selected = true;"+
"  }" +
"}";

addPopulateReferences = function() {
  var body = document.getElementsByTagName('body')[0];
  var populateReferences = document.createElement('a');
  populateReferences.setAttribute('href','javascript:populateReferenceFields();');
  populateReferences.setAttribute('style','position: fixed;top: 10px;left: 10px;border:1px solid black;font-weight:bold;background-color:red;color:white;padding:5px;text-decoration:none;');
  populateReferences.innerHTML = "Populate References";
  body.appendChild(populateReferences );	
}

addJavascriptFunctionToPage = function() {
  var head = document.getElementsByTagName('head')[0];
  var javascript = document.createElement('script');
  javascript.innerHTML = populate;
  head.appendChild(javascript);
}

var pageTitle = document.title;

if (pageTitle.indexOf('References') != -1) {
	addPopulateReferences();
	addJavascriptFunctionToPage();
}