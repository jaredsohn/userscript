// ==UserScript==
// @name        AMS member Check
// @namespace   MemberCheck
// @include     http://www.erepublik.com/en/citizen/profile/*
// @include     http://www.erepublik.com/en/economy/donate-items/*
// @include     http://www.erepublik.com/en/economy/donate-money/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     0.2
// ==/UserScript==
$(document).ready(function () {
	var profileid=parent.document.location.pathname.toString().split('/').pop();
	var checklist=['677252','837381','1545114','1562524','1588204','1623360','1661642','1731391','1731405','1778946','1787758','1787858','1793635','1793757','1806233','1806806','1813562','1819979','1826047','1826096','1840359','1901862','1915270','1915317','1976756','2123695','2240292','2555428','2832742','2839034','2841586','2899461','3197830','3214130','4485114','4570602','4633793','4712098','4970997','5106855','5139351','5277310','5960097'];
	if (profileid!=null && checklist.indexOf(profileid)!=-1) {
		$('#content .citizen_profile_header.auth h2:first').append('<span style="float:right; position:absolute; display:inline; margin-top:4px; margin-left:5px;"><img src="http://www.erepublik.com/images/modules/_icons/small_mpp.png"></span>');
	}
})