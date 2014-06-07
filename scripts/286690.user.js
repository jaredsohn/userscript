// ==UserScript==
// @name           AutoLoginJ
// @namespace      http://diveintomark.org/projects/greasemonkey/
// @description    Automatically submit autofilled login forms
// @include        https://hosting.maplewood.com/ON/Private/Rehoboth/Staff/staff/Login/slogin.aspx
// @include        https://accounts.google.com/*
// @exclude        https://*.caft.*
// ==/UserScript==


// based on code by Jesse Ruderman
// and included here with his gracious permission
// http://www.squarefree.com/userscripts/code samplesautologinj.user.jsautologinj.user.js

function submitFirstPasswordForm() {
	if(document.getElementById('Email')){var Email=document.getElementById('Email').value;}else{var Email='';}
	if(document.getElementById('username')){var username=document.getElementById('username').value;}else{var username='';}

	//if (Email === NULL){var username=document.getElementById('username').value;}
//alert(username);
//alert(Email);
	//if (username==''){ //marks page
	//	var snapHidden = document.evaluate("//input[@type='text'][@name='username']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	//	for (var i = snapHidden.snapshotLength - 1; i >= 0; i--) {
	//	   var elmHidden = snapHidden.snapshotItem(i);
	//	   elmHidden.value = 'h.sikkema';
	//	}
	//	var snapHidden = document.evaluate("//input[@type='password'][@name='pwd']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	//	for (var i = snapHidden.snapshotLength - 1; i >= 0; i--) {
	//	   var elmHidden = snapHidden.snapshotItem(i);
	//	   elmHidden.value = 'science?12';
	//	}
	//}
	if (Email=='hsikkema@rehoboth.on.ca'){
		var snapHidden = document.evaluate("//input[@type='password'][@name='Passwd']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = snapHidden.snapshotLength - 1; i >= 0; i--) {
		   var elmHidden = snapHidden.snapshotItem(i);
		   elmHidden.value = 'science?12';
		}
	}else if (Email=='rcs-online.quiz@gmail.com'){
		var snapHidden = document.evaluate("//input[@type='password'][@name='Passwd']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = snapHidden.snapshotLength - 1; i >= 0; i--) {
		   var elmHidden = snapHidden.snapshotItem(i);
		   elmHidden.value = 'rcsonlinequiz';
		}
	}

//alert(username);
//alert(Email);
	if (username==''){ //marks page
		var snapHidden = document.evaluate("//input[@type='text'][@name='username']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = snapHidden.snapshotLength - 1; i >= 0; i--) {
		   var elmHidden = snapHidden.snapshotItem(i);
		   elmHidden.value = 'h.sikkema';
		}
		var snapHidden = document.evaluate("//input[@type='password'][@name='pwd']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = snapHidden.snapshotLength - 1; i >= 0; i--) {
		   var elmHidden = snapHidden.snapshotItem(i);
		   elmHidden.value = 'science?12';
		}
	}


	for (var elmForm, i=0; elmForm=document.forms[i]; ++i) {
	var numPasswordElements = 0;
	for (var j=0; elmFormElement=elmForm.elements[j]; ++j)
	if (elmFormElement.type == "password" &&
		elmFormElement.value &&
		elmFormElement.value.toLowerCase() != "password") {
	++numPasswordElements;
	}
	if (numPasswordElements != 1) { continue; }
	/*
	 * The obvious way to submit a login form is form.submit().
	 * However, this doesn't work with some forms, such as
	 * the Google AdWords login, because they do stuff
	 * in the onclick handler of the submit button. So we
	 * need to find the submit button and simulate a click.
	 */
	var elmSubmit = document.evaluate(".//input[@type='image']",elmForm, null, XPathResult.FIRST_ORDERED_NODE_TYPE,	null).singleNodeValue;
	if (!elmSubmit) {
		elmSubmit = document.evaluate(".//input[@type='submit']",elmForm, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	}
	if (!elmSubmit) {
		elmSubmit = document.evaluate(".//button[@type='submit']",elmForm, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	}
	if (!elmSubmit) { continue; }
	   /*
	* Give a visual indication that we're logins to web sitesauto-submitting the
	* form, then simulate a click on the submit button.
	*/
	   elmSubmit.focus();
	   //elmSubmit.style.MozOutline = "2px solid purple";
	   elmSubmit.click();
	}
}

window.addEventListener("load", function() {
	/*
	 * Using setTimeout to give Firefox's password manager a chance to autofill the form.
	 */
	setTimeout(submitFirstPasswordForm, 0);
}, false);