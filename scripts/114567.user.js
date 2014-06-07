// ==UserScript==
// @name           Facebook Requests responder
// @description    answer all requests on a facebook page
// @include        https://*.facebook.com/*
// @include 	   http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @match 	   http://*.facebook.com/*
// @author         https://userscripts.org/users/67181
// @version        1.7.7
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

var pagelet_group_requests_summary;

if (pagelet_group_requests_summary = document.getElementById('pagelet_group_requests_summary'))
{
  var listElements = pagelet_group_requests_summary.getElementsByTagName('li');

  for(var i=0;i<listElements.length;i++){
  
    clickLink(listElements[i].firstChild.lastChild.firstChild.firstChild);
  }
}

return false;
}

// Group requests one the summary page
function parseGroupRequestsSummary(){

var pagelet_requests_queue;

if (pagelet_requests_queue = document.getElementById('pagelet_requests_queue'))
{
  var listElements = pagelet_requests_queue.firstChild.firstChild.childNodes;
  
   for(var i=0;i<listElements.length;i++){
     clickLink(listElements[i].firstChild.lastChild.firstChild.firstChild);
   }
}
return false;
}

function checkPage(){

var result = false

if ((SummaryIdObj = document.getElementById('pagelet_group_requests_summary'))||(SummaryIdObj = document.getElementById('pagelet_requests_queue')))
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
requestResponderObj = document.getElementById("blueBar").appendChild(newLink);

setInterval(function() { checkPage(); return false;}, 5800);

})();