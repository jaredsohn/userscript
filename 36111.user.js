// ==UserScript==
// @name           [CB] Dark Throne GOLD Recruiter
// @description    Dark Throne recruiter for gold (final) version (http://www.darkthrone.com/)
// @description    Updated to work with the HTML and JavaScript updates announced on Feb 7, 2009
// @include        http://www.darkthrone.com/recruiter/recruit/*
// @include        http://darkthrone.com/recruiter/recruit/*
// @author			CornelB
// @author			cornelb@gmail.com
// @version		1.4
// ==/UserScript==
var recruitImg = document.getElementById("recruit_image");
//var recruitImg = null;
if(recruitImg != null){
	recruitLink=recruitImg.parentNode;
	//window.document.title = "CornelB's AutoRecruiter | Running ... ";
	appendAbortButton();
	document.addEventListener('keydown', keyPressHandler, false); 
	window.setTimeout(function(){make_form()},Math.floor(Math.random() * (3300 - 2300 + 1)) + 2300);	
}
function make_form(){
	var f=document.createElement('form');
	f.style.display='none';
	recruitLink.parentNode.appendChild(f);
	f.method='POST';
	f.action=recruitLink.href;
	f.submit();
}
/*
function fireEvent(obj,evt){
	var fireOnThis = obj;
	if( document.createEvent ) {
	  var evObj = document.createEvent('MouseEvents');
	  evObj.initEvent( evt, true, false );
	  fireOnThis.dispatchEvent(evObj);
	} else if( document.createEventObject ) {
	  fireOnThis.fireEvent('on'+evt);
	}
}
*/
function keyPressHandler(event) {
	if(event.keyCode!=65) { // a
		return;
	}
	top.location='http://www.darkthrone.com/recruiter';
}
function appendAbortButton(){
	abortButton=document.createElement('button');
	abortButton.addEventListener(
		"click", function(){
				top.location='http://www.darkthrone.com/recruiter';
			}, false); 
	abortButton.appendChild(document.createTextNode("Abort Auto-Recruiting"));
	abortButton.appendChild(br());
	abortButton.appendChild(document.createTextNode("( or press [a] key )"));
	insertAfterRecruitLink(abortButton);
}
function insertAfterRecruitLink(elementToInsert){
	insertPoint=recruitLink.nextSibling;
	insertParent=recruitLink.parentNode;
	insertParent.insertBefore(br(),insertPoint);
	insertParent.insertBefore(br(),insertPoint);
	insertParent.insertBefore(elementToInsert,insertPoint);
}
function br(){
	return document.createElement('br');
}