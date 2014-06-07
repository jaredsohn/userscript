// ==UserScript==
// @name          cPanel Edit Fixes
// @namespace     http://www.bingbangboom.us/
// @description	  Makes the cPanel "Edit File" feature more functional and aesthetic.
// @include       */frontend/*/files/editit.html*
// ==/UserScript==

/* Revisions:
[v0.1] 2005.08.05
	+ Initial release
[v0.2] 2005.08.13
	+ Fixed textarea height bug on low resolutins
	+ Changed "File saved." close handler to apply to entire window
	+ Changed text area to focus after alert is closed
	- Replacing content too early (need to detect onload better)
[v0.3] 2005.12.03
	+ Replaced DOMParser w/innerHTML (more logical, faster, compatible)
	+ Removed bottom bar
	+ Added capability to change page path
	+ All paths update when file name is changed
	+ Keypress dismisses dialog
	+ Dialog centers correctly according to font size
	+ Added "Open" button to open specified path
	+ Ctrl+Alt+S now saves file
	- Invalid file names not detected
[v0.3.5] 2005.12.11
	+ Added true support for the tab key
[v0.3.6] 2006.07.29
	+ Safeguards to prevent accidential file overwriting (by entering but not
	  opening a different file path) or discarding changes on window close
*/

// create the CPanel object
var cPanel = {};
// get document references
cPanel.document = document;
cPanel.head = document.getElementsByTagName('head').item(0);
cPanel.body = document.getElementsByTagName('body').item(0);
// set the file properties
cPanel.file = {};
cPanel.file.content = document.getElementsByTagName('textarea').item(0).value.replace(/\n$/, '');
cPanel.file.path = cPanel.file.origPath = document.getElementsByTagName('input').item(0).value;
cPanel.file.name = cPanel.file.origName = document.getElementsByTagName('input').item(1).value;

// title updating function
cPanel.updatePaths = function () {
	// extract the updated path
	cPanel.file.path = document.getElementById('path').value.replace(/[^\/]+$/, '');
	cPanel.file.name = document.getElementById('path').value.replace(/[^\/]*\//g, '');
	
	// update document title
	document.title = cPanel.file.name + ' | cPanel Editor';
	// update hidden inputs
	document.getElementById('dir').value = cPanel.file.path;
	document.getElementById('filename').value = cPanel.file.name;	
}

// insert the new content
cPanel.head.innerHTML = '\
  <style type="text/css">\
html, body, #submissionForm, #content {width: 100%; height: 100%; margin: 0; padding: 0; font-family: Tahoma, sans-serif; }\
#content, #content tr, #content td { border: none; border-collapse: collapse; padding: 0; margin: 0;}\
#controls {font-size: 1em; margin:0; width: 100%; font-weight: normal; padding: 0.25em; border-bottom: 2px solid #b0b0a8; background: #e0e0d8}\
#path { width: 100%; } #button-save { font-weight: bold; }\
#editingCell { width: 3.75em; }\
#submitCell { width: 8em; text-align: center; }\
#submitCell input { width: 4em; overflow: hidden; margin: 0; }\
#pageCell { height: 100%; }\
#page {display: block; height: 100%; width: 100%; margin: 0; padding: 0 0 0 5px; border: none;}\
label { cursor: pointer; }\
#filename { width: 30em; }\
#submissionFrame { display: block; height: 0; width: 0; margin: 0; padding: 0; border: 0;}\
#alert-submitting, #alert-saved { vertical-align:middle;position:fixed;top:0;left:0;width:100%;height:100%;z-index:5;opacity:0.7;background:#333}\
#alert-submitting p, #alert-saved p {display:block;border:5px solid;text-align:center;font-size:4em;width:7em;padding:1em 0;margin:0 auto}\
#alert-submitting { cursor: wait; } #alert-submitting p { background: #ee0; border-color: #990; }\
#alert-saved { cursor: pointer; } #alert-saved p { background: #0e0; border-color: #090; }\
  </style>\
	';
cPanel.body.innerHTML = '\
  <form target="submissionFrame" method="post" action="savefile.html" id="submissionForm">\
   <table id="content">\
    <tr><td>\
	 <table id="controls"><tr>\
	  <td id="editingCell">Editing:</td>\
	  <td id="pathCell"><input type="text" id="path"></td>\
	  <td id="submitCell">\
	   <input type="button" value="Open" id="button-open">\
	   <input type="submit" value="Save" id="button-save" disabled="disabled">\
	  </td>\
	 </tr></table>\
	</td></tr>\
    <tr>\
	 <td id="pageCell" colspan="3">\
      <textarea name="page" id="page" wrap="virtual"></textarea>\
     </td>\
	</tr>\
   </table>\
   <input type="hidden" name="dir" id="dir">\
   <input type="hidden" name="file" id="filename">\
  </form>\
  <iframe name="submissionFrame" id="submissionFrame"></iframe>\
  <table id="alert-submitting"><tr><td><p>Submitting...</p></td></tr></table>\
  <table id="alert-saved"><tr><td><p>File saved.</p></td></tr></table>\
	';

// update page paths
document.getElementById('path').value = cPanel.file.path + '/' + cPanel.file.name;
document.getElementById('path').addEventListener('keyup', cPanel.updatePaths, true);
cPanel.updatePaths();
// re-insert the page content
document.getElementById('page').value = cPanel.file.content;
document.getElementById('page').focus();

// setup the alerts
cPanel.alert = {};
cPanel.alert.shadow = document.getElementById('shadow');
cPanel.alert.submitting = document.getElementById('alert-submitting');
cPanel.alert.saved = document.getElementById('alert-saved');
cPanel.alert.clickHandler = function (e) {
	// turn off the alert
	cPanel.alert.setMode(0);
	// focus the textarea
	cPanel.document.getElementById('page').focus();
	// prevent progogation
	e.preventDefault();
	e.stopPropagation();
};
cPanel.alert.setMode = function (flag) {
	switch (flag) {
		case 0:
			cPanel.alert.saved.style['display'] = cPanel.alert.submitting.style['display'] = 'none';
			// remove alert clickHandler
			cPanel.document.removeEventListener('click', cPanel.alert.clickHandler, true);
			cPanel.document.removeEventListener('keydown', cPanel.alert.clickHandler, true);
			break;
		case 1:
			cPanel.alert.submitting.style['display'] = 'table';
			cPanel.alert.saved.style['display'] = 'none';
			break;
		case 2:
			cPanel.alert.saved.style['display'] = 'table';
			cPanel.alert.submitting.style['display'] = 'none'
			// allow user to dismiss message
			cPanel.document.addEventListener('click', cPanel.alert.clickHandler, true);
			cPanel.document.addEventListener('keydown', cPanel.alert.clickHandler, true);
			break;
	}
}
// turn off all alerts
cPanel.alert.setMode(0);

// open handler
document.getElementById('button-open').addEventListener('click', function () {
		// check if changes have been made
		if (!document.getElementById('button-save').disabled &&
			!confirm('Changes have been made to the document. Are you sure you want to discard changes and open a new document?'))
			return;
		// open the new page
		window.location.href = window.location.href.replace(/\?dir=.*$/,
			'?dir=' + cPanel.file.path.replace(/\/$/, '') + '&file=' + cPanel.file.name);
	}, true);
// submission handlers
document.getElementById('submissionForm').addEventListener('submit', function (e) {
		// if a different url was entered, prevent accidential overwriting
		if (document.getElementById('path').value != cPanel.file.origPath + '/' + cPanel.file.origName &&
			!confirm('You are about to overwrite a different file than the one you have open. Proceed?')) {
			e.preventDefault();
			return;
		}
		// form was submitted
		cPanel.alert.setMode(1);
		// disable buttons
		document.getElementById('button-open').disabled = true;
		document.getElementById('button-save').disabled = true;
		document.getElementById('button-save').blur();
	}, true);
document.getElementById('submissionFrame').addEventListener('load', function () {
		// file was saved
		cPanel.alert.setMode(2);
		// update paths
		cPanel.file.name = document.getElementById('filename').value;
		cPanel.updatePaths();
		// enable open button
		document.getElementById('button-open').disabled = false;
	}, true);

// keydown handler
document.addEventListener('keydown', function (e) {
		// if save-keystroke is pressed, submit the form
		if (e.keyCode == 83 && e.altKey && e.ctrlKey) {
			// if save button is disabled, don't allow saving
			if (document.getElementById('button-save').disabled)
				return;
			// if a different url was entered, prevent accidential overwriting
			if (document.getElementById('path').value != cPanel.file.origPath + '/' + cPanel.file.origName &&
				!confirm('You are about to overwrite a different file than the one you have open. Proceed?')) {
				e.preventDefault();
				return;
			}
			// form was submitted
			cPanel.alert.setMode(1);
			// disable buttons
			document.getElementById('button-open').disabled = true;
			document.getElementById('button-save').disabled = true;
			document.getElementById('button-save').blur();
			document.getElementById('submissionForm').submit();
		}
	}, true);
// keypress handler
document.addEventListener('keypress', function (e) {
		// prevent tab behavior
		if (e.keyCode == 9) {
			var tab = String.fromCharCode(9);
			var page = document.getElementById('page');
			var selectionStart = page.selectionStart;
			var selectionEnd = page.selectionEnd;
			var scrollTop = page.scrollTop;
			page.value = page.value.substr(0, selectionStart)
				+ tab
				+ page.value.substr(selectionEnd);
			page.setSelectionRange(selectionStart + tab.length, selectionStart + tab.length);
			page.scrollTop = scrollTop;
			e.preventDefault();
			e.stopPropagation();
		}
	}, true);
// keyup handler
document.addEventListener('keyup', function (e) {
		// enable save button if content changed
		if (cPanel.file.content != document.getElementById('page').value)
			document.getElementById('button-save').disabled = false;
		// update content
		cPanel.file.content = document.getElementById('page').value;
	}, true);

// window unload handler
window.addEventListener('beforeunload', function (e) {
		// if the file was changed, prevent accidentially discarding changes
		if (!document.getElementById('button-save').disabled &&
			!confirm('By navigating away from the page, you will lose all changes you made to the document. Proceed?')) {
			e.preventDefault();
			return false;
		}
	}, false);

// stop the iframe handler from firing early
document.getElementById('submissionFrame').contentWindow.stop();

