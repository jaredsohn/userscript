// 2014
// Manuel Hiebel
// Released under the MIT/X11 license
// http://www.opensource.org/licenses/mit-license.php
//
// ==UserScript==
// @name          Mageia bugscript
// @namespace http://freeshell.de/~manu67/mageia/
// @description   Add button to help bug triagers
// @include https://bugs.mageia.org/show_bug.cgi?id=*
// @include https://bugs.mageia.org/process_bug.cgi
// @icon http://freeshell.de/~manu67/mageia/favicon.png
// @version 0.9.0
// Thanks to Andre Klapper, Matěj Cepl for their script (RHEL or Maemo/Meego)
// ==/UserScript==
var getXString = "Thanks for the bug report.  We have reviewed the information you have provided above, and there is some additional information we require that will be helpful in our diagnosis of this issue.\n\n"+
"Please attach your X server config file (/etc/X11/xorg.conf) and X server log file (/var/log/Xorg.*.log) to the bug report as individual uncompressed file attachments using the bugzilla file attachment link below.\n\n"+
"Could you please also try to run without any /etc/X11/xorg.conf whatsoever and let X11 autodetect your display and video card? Attach to this bug /var/log/Xorg.0.log from this attempt as well, please.\n\n"+
"We will review this issue again once you've had a chance to attach this information.\n\n"+
"Thanks in advance.";

var getGDBString = "Check ALL FIXME\n"+
"1) enable the 'core release debug'\n"+
"2) install the following packages: FIXME-debug\n"+
"3) run the following command from a terminal:\n"+
"  gdb -q FIXME 2>&1 | tee debug.txt\n"+
"4) then type 'run'\n"+
"(if it ask for missing packages, install them)\n"+
"5) when it segfaults, type 'bt'\n"+ 
"6) attach the file debug.txt to this bug\n";

var DuplicateString = "Thanks for the bug report.\nThis particular issue has already been reported in our bug tracking system, but please feel free to report any further bugs you find.\n"+
"In general it is welcome to search for existing reports first to avoid filing duplicates.";

var getLogsDrakxinstallerString = "Thanks for the bug report.\n"+
"Could you provide the file /root/drakx/report.bug.xz as an attachment ?\n"+
"If you don't have the file, you can switch to console 2 (by pressing 'Ctrl-Alt-F2') during installation, put a floppy in floppy drive or plug a USB key/stick and type: 'bug' then press Enter. It will put report.bug on the floppy/key.";

var noResponseString = "Since there are insufficient details provided in this report for us to investigate the issue further, and we have not received feedback to the information we have requested above, we will assume the problem was not reproducible, or has been fixed in one of the updates we have released for the reporter's distribution.\n\n"+
"Users who have experienced this problem are encouraged to upgrade to the latest update of their distribution, and if this issue turns out to still be reproducible in the latest update, please reopen this bug with additional information.\n\n"+
"Closing as OLD.";

var sentUpstreamString = "Hi, thanks for reporting this bug."; // \n"+
//"We found that this bug has been already registered in the upstream database \n\nand believe that it is more appropriate to let it be resolved upstream.";

var NEEDINFOReminder = "Reporter, could you please reply to the previous question? If you don't reply within two weeks from now, I will have to close this bug as OLD. Thank you."; //Please reply to the question above within two weeks from now, to avoid this bug being closed as OLD. Thank you.

var getEOL ="Hi, thanks for reporting this bug.\n"+
"We are sorry, but we no longer maintains this version of Mageia. Please upgrade to the latest version and reopen this bug against that version if this bug exists there.\n"+
"As a result we are setting this bug to CLOSED:WONTFIX";

var triagedString = "Hi, thanks for reporting this bug.\nAssigned to the package maintainer.\n\n(Please set the status to 'assigned' if you are working on it)";

var committersString = "Hi, thanks for reporting this bug.\nAs there is no maintainer for this package I added the committers in CC.\n\n(Please set the status to 'assigned' if you are working on it)";

var getQAvalidatedString = "\nFIXME Suggested Advisory:\n-------------\nThis update addresses the folloving CVE:\n- CVE\nUpdated PACKAGE fix...\n\n-------------\n\nSRPM: \n\nCould sysadmin please push from FIXME core/updates_testing to core/updates\n\nThankyou!";

var getQAAdvisory ="Advisory:\n========================\n\n\n\n========================\n\nUpdated packages in\n========================\n\n\n\nfrom   src.rpm";

/* Bugzilla functions. */


/** Generic function to add new button to the page.
 * Actually copies new button from the old one (in order to have the same
 * look-and-feel, etc.
 * @param originalLocation object with the button to be copied from
 * @param newId string with the id of the new button; has to be unique in
                whole page
 * @param newLabel string with the label which will be shown to user
 * @param handlerFunc function used as handler when the button is clicked on
 * @param doSubmit bool optional whether the button should submit whole page
 *              (default true)
 *
 * @return none
 */
function addNewButton(originalLocation,newId,newLabel,handlerFunc,doSubmit) {
	if (doSubmit === null) { // missing optional argument
		doSubmit = true;
	}
    var newButton = originalButton.cloneNode(true);
    if (!doSubmit) {
    	newButton.setAttribute("type","button");
    }
    newButton.id=newId;
    newButton.setAttribute("value",newLabel);
    newButton.addEventListener('click',handlerFunc,true);
    var textNode = document.createTextNode("\u00A0");
    originalLocation.parentNode.insertBefore(textNode,originalLocation);
    originalLocation.parentNode.insertBefore(newButton,textNode);
}

/** Add text to the comment.
 * @param string2BAdded string to be added to the comment box
 *
 * @return none
 */
function addTextToComment(string2BAdded) {
	var commentTextarea = document.getElementById("comment");	
	// don't remove the current content of the comment box,
	// just behave accordingly
	if (commentTextarea.value.length > 0) {
		commentTextarea.value += "\n\n";
	}
	commentTextarea.value += string2BAdded;
}

/** Add Keyword function
 */
function addKeyword(str) {
	var keyword = document.getElementById('keywords');
	if (keyword.value == '') {
		keyword.value = str;
	}else{
		keyword.value = keyword.value + ", " + str;
	}
}

/** Select option with given label on the <SELECT> element with given id.
 *
 * For set the resolution and status
 * take from bugzilla_modification_f.user.js
 */
function pickElement(list,testFce) {
	var tempPickElement = {};
	for (var i=0; i<list.length; i++) {
		tempPickElement = list[i];
		if (testFce(tempPickElement)) {
			return tempPickElement;
		}
	}
	return {};
}
function selectOption(id,label) {
	var selectElement = document.getElementById(id);
	var values = selectElement.options;
	var option = pickElement(values,
		function(x){
			x.normalize();
			return (x.text==label);
		});
	option.selected = true;

	var intEvent = document.createEvent("HTMLEvents");
	intEvent.initEvent("change", true, true);
	selectElement.dispatchEvent(intEvent);
}

/* Helper functions to emulate a mouse click, e.g. on "Mark as duplicate" link.
 * Yes, this is damn ugly, but JS onclick / addEventListener is still a mystery to me
 */
function mouseEvent(par, type) {
  var evt = par.ownerDocument.createEvent('MouseEvents');
  evt.initMouseEvent(type, true, true, par.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
  return par.dispatchEvent(evt);
}
function emulateClick(par) {
  return mouseEvent(par, 'click');
}
function emulateClickLink(target) {
  var result = emulateClick(target);
  if(target.tagName=="A" && result) window.location.href = target.href;
}


/* Get maintainer/commiters function
 * TODO add the posibility to search several rpms in one transaction
 * TODO change the api from GET to POST
 */
function getApi(comm) {
var comm = comm ;
var assigned = document.getElementById('assigned_to');
//wrong search if there is no string 
//at the moment we can't search more than one rpm so need to go to the api
var namerpm = /^$|\ |\(|\[|\]|\)|\,/;  
//get the version on the bug
var version = document.getElementById('version'); 
//begin


	if (document.getElementById('cf_rpmpkg').value.match(namerpm)) //check the name
	{
		emulateClickLink(document.getElementById("bz_assignee_edit_action"));
	       	assigned.value = "I need an SRPM !"; 
	}


	else { //get the maintainer
	//var api = "http://maintdb.mageia.org/" + document.getElementById('cf_rpmpkg').value ;
	var api = "http://freeshell.de/~manu67/mageia/commits.cgi?pkg="+document.getElementById('cf_rpmpkg').value+"&co="+ comm+"&ver="+version.value ;
	// var api = "http://sophie.zarb.org/maintainers/"+ document.getElementById('cf_rpmpkg').value+ "/Mageia?json=1" ;
	
	window.setTimeout(function() {
			GM_xmlhttpRequest({
				      method: "GET",
				      url: api,
					onload: function(response) {
	//console.log('valu rpm '+ response.responseText.value);
					    obj = JSON.parse(response.responseText);
					    //{"assign":"toto","svn":"http://","cc":"bob, alice","rpm":"firefox"}

if (comm.match(/3/))
	{
//		window.open(response.responseText,'_blank');
		GM_openInTab(obj.svn);
		}
else
{

if (response.responseText.match(/; /))
{ emulateClickLink(document.getElementById("cc_edit_area_showhide"));
document.getElementById('newcc').value = obj.cc;
//assigned.value = "bugsquad@mageia.org"; 
addKeyword("Triaged");
}
else if (response.responseText.match(/BUG/))
{	alert ("There is a bug, keep the url and ping the maintainer of this script aka Manuel.\nThanks"); }
//
else { 
	emulateClickLink(document.getElementById("bz_assignee_edit_action"));
	assigned.value = obj.assign;
	document.getElementById('newcc').value = obj.cc;
	addKeyword("Triaged");
	} 
								}//else if comm 3
							}//onload
					});//gm_xml
			}, 0);//setTimeout
	} //end else
}

/* Function for button
 */

/* Add EOL bugs.
 */
function addClosingEOL(evt) {
	addTextToComment(getEOL);
	selectOption("bug_status", "RESOLVED");
	selectOption("resolution", "WONTFIX");
}

/* No response on NEEDINFO
 */
function addnoResponseNEEDINFO(evt) {
	addTextToComment(noResponseString);
	selectOption("bug_status", "RESOLVED");
	selectOption("resolution", "OLD");
}

/* Add duplicate bug
 */
function addDuplicate(evt) {
	addTextToComment(DuplicateString);
	selectOption("bug_status", "RESOLVED");
	selectOption("resolution", "DUPLICATE"); 
}

/* Add request for /etc/X11/xorg.conf and /var/log/Xorg.0.log to the comment
 */
function addGetXLogsBlahHandler(evt) {
	addTextToComment(getXString);
	addKeyword("NEEDINFO");
}

/* Add request for gdb strace with help
 */
function addGetGDBstrace(evt) {
	addTextToComment(getGDBString);
	addKeyword("NEEDINFO");
}

/* Add request for report.bug from installer
 */
function addGetLogsDrakxinstaller(evt) {
	addTextToComment(getLogsDrakxinstallerString);
	addKeyword("NEEDINFO");
}

/* Add reminder to NEEDINFO threatening INSUFFICIENT_DATA 
 */
function addNEEDINFOReminder(evt) {
        if ( document.getElementById('keywords').value.match('NEEDINFO') )
	{
		addTextToComment(NEEDINFOReminder);
	}
	else {
		addKeyword("NEEDINFO");
	}
}
/* Added upstream
 */
function addUpstream(evt) {
	//addTextToComment(sentUpstreamString);
	addKeyword("UPSTREAM");
}
/* Add keyword Patch 
 */
function addPatchKW(evt) {
	addKeyword("PATCH"); 
}

/* Add comment that the bug has been triaged a
 */
function addTriaged(evt) {
	addTextToComment(triagedString);
	addKeyword("Triaged");
}
/* Add commiter in comment
 */
function addCommiters(evt) {
	addTextToComment(committersString); 
}

/* get maintainer and commiters
 */
function addcommiter(evt) {
	getApi("1");
}
function addmaint(evt) {
	getApi("0");
}
/* tab svn log list maintainer 
 */
function listcommiters(evt) {
	getApi("3");
}

/* Add QAvalidated bug
 */
function addQAvalidated(evt) {
	if ( document.getElementById('assigned_to').value.match('qa-bugs@ml.mageia.org'))
	{
		addKeyword("validated_update");
		addTextToComment(getQAvalidatedString);
		selectOption("rep_platform", "All");
	}
	else
	{
		addTextToComment(getQAAdvisory);
		document.getElementById('assigned_to').value = "qa-bugs@ml.mageia.org";
	}
}

/* Add Fake submit button
 */
function addSubmit(evt) {
}

// Vygeneruj seznam <input> elementů ve stránce
var IBList = [];
var IBRawList = document.getElementsByTagName("input");
for (var i=0;i<IBRawList.length;i++) {
    if ((IBRawList[i].hasAttribute("type")) &&
    	(IBRawList[i].getAttribute("type")=="submit")) {
		IBList = IBList.concat(IBRawList[i]);
    }
}

var originalButton = IBList[1]; // source button to be copied from

var newBRElement = document.createElement("BR");
var textCommentBox = document.getElementById("comment");
var parElement = textCommentBox.parentNode;
parElement.insertBefore(newBRElement,textCommentBox);

// Add "Please add /etc/X11/... " to the textform
addNewButton(newBRElement,"addgetlogstext","X",
	     addGetXLogsBlahHandler,false);
//add help with gdb
addNewButton(newBRElement,"addgetlogstext","GDB",
	     addGetGDBstrace,false);
// Drakx debug
addNewButton(newBRElement,"Drakx -installer","Installer",
	     addGetLogsDrakxinstaller,false);
// Add a upstream
addNewButton(newBRElement,"addupstream","UPSTREAM",
	     addUpstream,false);
// Add a "don't laugh at NEEDINFO" reminder
addNewButton(newBRElement,"addNEEDINFOReminder","NEEDINFO",
	     addNEEDINFOReminder,false);
// Add Patch keyword
addNewButton(newBRElement,"patchkw","PATCH",
	     addPatchKW,false);
// Add triaged
addNewButton(newBRElement,"triaged","Triaged",
	     addTriaged,false);
//Add commiters
addNewButton(newBRElement,"commiters","Committers",
	     addCommiters,false);
//Add Assigned field
addNewButton(newBRElement,"getmaintainer","maintdb",
	     addmaint,false);
//Add Assigned field
addNewButton(newBRElement,"getcommiters","svn",
	     addcommiter,false);
//Open a new tab to the svn log for the package
addNewButton(newBRElement,"listcommiters","lsvn",
		             listcommiters,false);
// for qa bugs
addNewButton(newBRElement,"addQAvalidated","QA",
	     addQAvalidated,false);

	     
newBRElement.style.fontSize = "100%";
newBRElement.style.clear = "all";
newBRElement.style.marginBottom = "0.1ex";

newBRElementBottom = document.createElement("BR");
if (textCommentBox.parentNode.lastChild == textCommentBox) {
	parElement.insertBefore(newBRElementBottom,textCommentBox);
}else{
	parElement.insertBefore(newBRElementBottom,textCommentBox.nextSibling);
}

newBRElementMiddle = document.createElement("BR");
parElement.insertBefore(newBRElementMiddle,newBRElementBottom);

newBRElementMiddle.style.fontSize = "%";
newBRElementMiddle.style.clear = "all";
newBRElementMiddle.style.marginBottom = "0.1ex";

//fake submit
addNewButton(newBRElementBottom,"addfakesubmit","Save",
            addSubmit,true);
// Add EOF disable for now
addNewButton(newBRElementBottom,"addcloseeol","Close EOL",
	     addClosingEOL,false);
// Add a no response closing string true= auto submit the page
addNewButton(newBRElementBottom,"addnoresponse","No Response",
	     addnoResponseNEEDINFO,false);
// for duplicate bugs
addNewButton(newBRElementBottom,"addDuplicate","Duplicate",
	     addDuplicate,false);

	     
newBRElementBottom.style.fontSize = "100%";
newBRElementBottom.style.clear = "all";
newBRElementBottom.style.marginBottom = "0.1ex";
