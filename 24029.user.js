/*
 ==RevisionHistory==
Version 0.3.2
Released 2008-08-05
   * Moved call to del API to make prompt no so annoying

 
 Version 0.3.1
Released 2008-08-04
   * Update to logic that determines if the user is on the Bookmarks page
 
 Version 0.3.0
Released 2008-08-03
   * Fixes for Del v2 website and FF3
   * Update to use Delicious API instead of simulating page AJAX calls (requires second login into delicious)

 Version 0.2.1:
 Released: 2008-03-20
    * Bug fix to allow Delete/Share functionality for Search results

 Version 0.2:
 Released: 2008-03-19.
    *  Removed the Exit button and moved the functionality to the Cancel
    * Added the ability to change the delay using a dropdown
    * Added a button to backup the bookmarks
 
 Version 0.1:
 Released: 2008-03-16.
 Initial release.
 ==/RevisionHistory==

 
 ==========================================================================
 POSSIBLE ENHANCEMENTS
 
  - Remove current filtered tag from displayed bookmarks
  - Replace current tag with a new tag
  - RegExp replacement for different elements see Greg Hill's ReMark script
 
 ==========================================================================
*/
// ==UserScript==
// @name           delicious_management
// @namespace      delicious_management
// @description    Bulk Bookmark Management Tools for Del.icio.us v0.3.2
// @include        http://*.del.icio.us/*
// @include        http://del.icio.us/*
// @include        http://delicious.com/*
// @author         Brian Gregory <grease_monkey@marbledwithfat.com>
// @license        This software is licensed under the Creative Commons : Attribution-Share Alike 3.0 Unported <http://creativecommons.org/licenses/by-sa/3.0/>
// @credit         GUI Based on a SU2Bookmarks script by Nathan Blume(thlayli.detrave.net) & Code Parts Based on original script by Greg Hill( http://blogfresh.blogspot.com/2006/08/blogger-migration-for-delicious-and.html)
// @version        0.3.2
// ==/UserScript==
//

// --------------------------------------------------------------------------------------------------------------------------------
// Make an xmlhttpRequest call to the del.icio.us links for you page



function get(url, cb) {
  GM_log(url);

  GM_xmlhttpRequest({
    method: "GET",
     url: url,
     onload: function(xhr) { cb(xhr.responseText); }
  });
  }

function postAJAX(url, data, cb) {
  GM_xmlhttpRequest({
    method: "POST",
    url: url,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(xhr) { cb(xhr.responseText); }
  });
}



//Setup the variables
var pagetitleContent = document.getElementById('pagetitleContent');

var GM_deldelay='delay'; 
var l=new Array(); var a=document.links;
var count=0;
var d_status = document.createElement('div')
var div_status = d_status;
var state = '';

var delDelay = GM_getValue(GM_deldelay, 5000);
//GM_setValue(deldelDelay, 500);

var cur_user = '';
if (unsafeWindow.document.getElementById('signedInAs')) 
	cur_user = unsafeWindow.document.getElementById('signedInAs').text;

var elms = getElementsByClassName('current', 'a', pagetitleContent);

if(elms.length && elms[0].innerHTML == 'Bookmarks') {
	// Add links to certain del.icio.us pages
		// Do a get latest post from the API to store the user id and password
//		get('https://api.del.icio.us/v1/posts/get?', noResp);

		var div_toolbar = document.createElement('div');
		div_toolbar.innerHTML = '|&nbsp;' +
							    '<a href="javascript:void(0);" id="shareDisplayed"><b>Share Displayed</b></a> &nbsp; | &nbsp;' +
								'<a href="javascript:void(0);" id="deleteDisplayed"><b>Delete Displayed</b></a>&nbsp; | &nbsp;' +
								'';
		pagetitleContent.appendChild(div_toolbar);
		pagetitleContent.appendChild(div_status);
		unsafeWindow.document.getElementById('shareDisplayed').onclick = shareDisplayed;
		unsafeWindow.document.getElementById('deleteDisplayed').onclick = deleteDisplayed;
}


// Update the status information
function showStatus(msg) {
	div_status.innerHTML = msg; 
} // End function showStatus


// Main function to find links to Share and then share them
function shareDisplayed() { 
	l.length = 0;
	showStatus('Sharing');
	for (var i=0; i<a.length; i++) 
//		if(a[i].className.search("action shareconfirm")==0) 
		if(a[i].className.search("taggedlink")==0) 
			l.push(a[i]); 
	showStatus( 'Found ' + l.length + ' to share.'); 
	
	if(l.length > 0)
		showModal('Are you sure you want to share ' + l.length + ' items?', 'SHARE');	
}

// Recursivly call function to step through items to share.  Recusion is used to delDelay script processing to avoid Yahoo DoS 
function doShareDel(){ 
	// Do a double-check to ensure we are still sharing.  The state could have changed
	if(state == 'SHARE') {
		showStatus('Sharing ' + (count+ 1) + ' of ' + l.length + ' : ' + l[count].href );
		get('https://api.del.icio.us/v1/posts/add?url=' + escape(l[count].href) + '&shared=yes',shareComplete);
		
		count++; 
		 if (count<l.length) 
			setTimeout(doShareDel, delDelay);
		else {
			setTimeout(refreshPage, delDelay/2);
			finishedOperation('Finished sharing ' + count + ' items.  Refreshing page in ' + (delDelay/2000) + ' seconds..');
		}
	}
 } 
 
 function noResp(resp) {
 
 }
 
 function shareComplete(resp) {
	if(resp.search('done') < 0) 
		alert('There was an error processing the request. \n\n' + resp);
 }

// Main function to find links to DELETE and then delete them
function deleteDisplayed() {
	l.length = 0;
	for (var i=0; i<a.length; i++) 
//		if(a[i].className.search("action shareconfirm")==0) 
		if(a[i].className.search("taggedlink")==0) 
			l.push(a[i]); 
	showStatus( 'Found ' + l.length + ' to delete.');
	if(l.length > 0)
		showModal('Are you sure you want to delete ' + l.length + ' items?', 'DELETE');
}

// Act on the found links by issue AJAX calls to delete them and then refresh the page
function doPopDel(){ 
	// Do a double-check to ensure we are still deleting.  The state could have changed
	if(state == 'DELETE') {
		// Get link information
		showStatus('Deleting ' + (count+ 1) + ' of ' + l.length + ' : ' + l[count].href );
		get('https://api.del.icio.us/v1/posts/delete?url=' + escape(l[count].href), shareComplete);
		
		// Call the next deletion
		count++; 
		if(count<l.length) 
			setTimeout(doPopDel, delDelay);
		else {
			// Completed deletion.  Now refresh the page
			setTimeout(refreshPage, delDelay/2);
			finishedOperation('Finished deleting ' + count + ' items.  Refreshing page in ' + (delDelay/2000) + ' seconds..' );
		}
	}
}

//Simple function to refresh the current page
function refreshPage() {
	unsafeWindow.location.reload();
}




//-------------------------------------------------------------------------------------------------------------------------------------------------------------

// Show a dialog indicating the current action and ask the user for input
function showModal(msg, curr_state){
		get('https://api.del.icio.us/v1/posts/get?', noResp);

	state = curr_state;
	
	// Margin, top, left, width and height center the iframe horizontally and vertically:
	var css = 'position:fixed; z-index:9999; border:1px solid black; ' +
	          'top:25%; left:12.5%; width:75%; height:50%;';

	//create cover div
	//Cover div creates the "lightbox effect"
	cd = document.createElement('div');	
	cd.style.background = 'White';	
	cd.style.MozOpacity = '0.75';
	cd.style.position = 'absolute';	cd.style.top = '0';	cd.style.left = '0'; cd.style.width = window.screen.availWidth + 'px';
	cd.style.height = window.innerHeight + window.scrollMaxY + 'px';
	cd.style.zIndex='9999999';

	//create modal div
	md = document.createElement('div');	
	md.style.MozOpacity = '1';
	md.style.background = 'White';	
	md.style.padding = '5px';
	md.style.border = '2px solid';	md.style.position = 'fixed'; md.style.top = '25%';
	md.style.left = '25%';	md.style.width = '600px';	md.style.height = '250px'; md.style.overflow = 'none';
	md.style.zIndex='99999999';


	//fill modal div
	md.innerHTML = '<div style="top:10px;left:80%;position:absolute"><a href="#" id="close_cp" ' +
	' title="Cancel/Close CP">[X - Close]</a></div><div style="margin:3px 0 10px 5px;float:none;width:97%;">' + 
	' <h2 style="font-size: 24px;" id="exp_main">' +
	'<a href="http://delmgt.marbledwithfat.com" target="_blank" ' +
	' title="Visit the script homepage for feedback and updates.">Del.icio.us Bulk Management</a></h2></div>';

	md.innerHTML += '<div style="top:25%;width:95%;position:absolute;vertical-align: center;horizontal-align: center">' +
	'<center><div id="st_curr">' + msg + '</div>'+
	'<BR><BR><input type="button" name="btstart" value="OK" id="btstart">'+
	'&nbsp;&nbsp;<input type="button" name="btcancel" value="Cancel" id="btcancel" >'+
	'<BR><BR>delay ' + 
	'<SELECT id="selDelay"> </SELECT>' + ' seconds ' +
	'</center></div>';
		
	md.innerHTML +=
	'<div style="bottom:10px;left:0%;position:absolute">' + 
	'Copyright 2008 Brian Gregory (<a href="http://delmgt.marbledwithfat.com" target=\'_blank\'>delmgt.marbledwithfat.com</a>)'+
//	'<form method="post" action="https://secure.del.icio.us/settings/' + cur_user + '/bookmarks/export"> <input type="hidden" name="showtags" id="showtags" checked="checked" />' +
//	'<input type="hidden" name="showextended" id="showextended" checked="checked" /></td> <input type="submit" name="export" value="backup bookmarks" id="expbms" /></form>' +
	'</div><hr /><hr />';
	
	div_status = unsafeWindow.document.getElementById('st_curr');
	
//document.getByElementID('doc3').appendChild(cd);
		
	//document.body.appendChild(cd);
	document.body.insertBefore(cd,document.body.firstChild);
	document.body.appendChild(md);
	loadHandler();
}

// Hide the dialog and clean up
function hideModal(){
	document.body.removeChild(cd);
	document.body.removeChild(md);
	div_status = d_status;
}

// The start button was clicked
// Let's get to work
function BtnClick_btstart_Handler(){
	//Function to be called on Start Button Click
	document.getElementById('btstart').disabled = true;

	// Save the settings to GM variables
	saveSettings();
	
	div_status = unsafeWindow.document.getElementById('st_curr');
	
	switch(state)
	{
	case 'SHARE':
		if(l.length > 0) {
			count=0; 
			doShareDel();
		}		
	break;
	case 'DELETE':
		if(l.length > 0) {
			count=0; 
			doPopDel(); 
		}
	break;

	default:
		alert('State unknown - ' + state);
	} // End switch
	
	// hideModal();
}

// The cancel button was clicked
// STOP!!!
// Reset the state
function BtnClick_btcancel_Handler(){
	//Function to be called on Cancel Button Click
//	div_status = unsafeWindow.document.getElementById('st_curr');
	
	var old_state = state;
	state = '';
	var operation = '';
	
	switch(old_state)
	{
	case 'SHARE':
		operation = 'Shared';
	break;

	case 'DELETE':
		operation = 'Deleted';
	break;

	default:
	} // End switch	
	
	div_status = d_status;	
	showStatus('Cancelled operation : ' + operation + ' ' + count + ' items');
	hideModal();
}

// The exit button was clicked
// I am outta here
function BtnClick_btexit_Handler(){
	//Function to be called on Cancel Button Click
	state = '';
	saveSettings();
	hideModal();
}

// Handle the load
// Setup the button events and initial state
function loadHandler(){
	//Function to be called on document load
	document.getElementById('btcancel').disabled = false;

	if (cur_user == '')
		unsafeWindow.document.getElementById('expbms').disabled = true;
	
	//Add onclick functions
	unsafeWindow.document.getElementById('btstart').onclick = BtnClick_btstart_Handler;
	unsafeWindow.document.getElementById('btcancel').onclick = BtnClick_btcancel_Handler;
	unsafeWindow.document.getElementById('close_cp').onclick = BtnClick_btexit_Handler;
	
	var selDelay = unsafeWindow.document.getElementById('selDelay');
	
	for(i=0;i<10;i++) 
		selDelay.options[i] = new Option(i+1,i+1);
	selDelay.selectedIndex = (delDelay/1000) - 1;
}


// We are done.  Set the buttons accordingly
function finishedOperation(sMsg) {
	state = '';
	div_status = d_status;
	showStatus(sMsg);	
	hideModal();
}


// Save the settings to GM variables
function saveSettings() {
	// Save the delay
	var selDelay = unsafeWindow.document.getElementById('selDelay');
	delDelay = (selDelay.options[selDelay.selectedIndex].value*1000);
	GM_setValue(GM_deldelay, delDelay);
}

function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|\\\\s)" + className + "(\\\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i];
		if(testClass.test(current.className)){
			returnElements.push(current);
		}
	}
	return returnElements;
} // End getElementsByClassName