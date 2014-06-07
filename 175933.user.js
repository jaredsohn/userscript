// ==UserScript==
// @name           Facebook Requests responder
// @description    answer all requests on a facebook page
// @include        https://www.facebook.com/*
// @include 	   http://www.facebook.com/*
// @match          https://www.facebook.com/*
// @match 	   http://www.facebook.com/*
// @author         https://userscripts.org/users/67181
// @version        1.7.4
// @updateURL      https://userscripts.org/scripts/source/114567.meta.js
// @downloadURL    https://userscripts.org/scripts/source/114567.user.js
// @grant          none
// ==/UserScript==

(function(){

evt = document.createEvent("MouseEvents");
evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

function clickLink(el) {
	var e = document.createEvent('MouseEvents');
	e.initEvent('click',true,true); 
	el.dispatchEvent(e);
return false;
}

// Group requests on the right side of the facebook page  
function parseGroupRequests(){

var divs = document.getElementsByClassName('firstItem uiButtonGroupItem buttonItem');

  for(var i=0;i<divs.length;i++){

     if (divs[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id == 'pagelet_group_requests_summary')
 	 {
  	 clickLink(divs[i].firstChild) 
  	 }
  }
return false;
}

// Group requests one the summary page
function parseGroupRequestsSummary(){

var divs = document.getElementsByClassName('uiButton uiButtonConfirm');

 for(var i=0;i<divs.length;i++){

 if (divs[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id == 'Group_member_request_pagelet')
 	 {
  	 clickLink(divs[i].firstChild) 
  	 }
  }
return false;
}

function checkPage(){

var result = false

if ((SummaryIdObj = document.getElementById('pagelet_group_requests_summary'))||(SummaryIdObj = document.getElementById('pagelet_group_requests')))
{
 if (SummaryIdObj.hasChildNodes())
   result = true;
}

requestResponderObj.style.display = result ? 'inline':'none';
return false;
}

//  Create new link element
var newLink = document.createElement("a");

newLink.style.color = '#3B5998';
newLink.style.fontWeight = 'normal';
newLink.style.fontSize = '90%';
newLink.style.paddingLeft = '5px';
newLink.style.paddingTop = '20px';
newLink.style.display = 'none';

var newtext=document.createTextNode("confirm all requests");
newLink.addEventListener("click", function () { parseGroupRequests(); parseGroupRequestsSummary(); return false;}, false);

newLink.appendChild(newtext);

// append new <br> element to head Nav
var newBr = document.createElement("br");
document.getElementById("headNav").appendChild(newBr);

// append link to the head Nav
requestResponderObj = document.getElementById("headNav").appendChild(newLink);

setInterval(function() { checkPage(); return false;}, 5800);

})();
