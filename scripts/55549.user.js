// ==UserScript==
// @name		UserScript.org Add New Script by Source or File
// @author		Erik Vold
// @datecreated	2009-07-30
// @lastupdated	2013-07-13
// @namespace	userscriptsOrgAddNewScriptSrcOrFile
// @include		http://userscripts.org/scripts/new
// @version		0.1.1
// @homepageURL http://userscripts.org/scripts/show/55549
// @description	Allows you to add a userscript on userscripts.org by pasting the source or by uploading a file.
// ==/UserScript==

var token = document.getElementsByName("authenticity_token")[0].value;

if (token) {
	var newFormString = '<br/><br/><h3>New script by pasting</h3><form method="post" enctype="multipart/form-data" action="/scripts/create">' +
	'<div style="margin: 0pt; padding: 0pt;"><input type="hidden" value="' +
	token +
	'" id="authenticity_token2ID" name="authenticity_token"/></div>' +
	'<input type="hidden" value="true" name="form"/>' +
	'<label>Source</label><br/>' +
	'<textarea style="width: 98%;" rows="20" name="script[src]" id="script_src" cols="40"></textarea><br/>' +
	'<input type="submit" value="Upload" name="commit"/>' +
	'</form>';

	document.getElementById("content").innerHTML += newFormString;
}