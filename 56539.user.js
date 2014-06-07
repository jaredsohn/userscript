// ==UserScript==
// @name		UserScript.org Update Script by Source or File
// @author		Erik Vold
// @datecreated	2009-08-27
// @lastupdated	2009-08-27
// @namespace	userscriptsOrgUpdateScriptBySrcOrFile
// @include		http://userscripts.org/scripts/upload/*
// @version		0.1
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description	Allows you to update a userscript on userscripts.org by pasting the source or by uploading a file.
// ==/UserScript==

var userscriptsOrgUpdateScriptBySrcOrFile = function() {
	var token = document.evaluate("//input[@name='authenticity_token']", document, null, 9, null).singleNodeValue;
	if ( !token ) {
		return false;
	}
	token = token.value;
	if( !document.location.href.match( /[^\?#]*\/\d+([\?#].*)?$/i ) ) {
		return false;
	}
	var scriptID = (document.location.href.match( /scripts\/[^\/\d]+\/\d+/i )+"").match( /\d+/i );
	var newH3 = document.createElement( "h3" );
	newH3.innerHTML = "Upload Source ";
	var newForm = document.createElement( "form" );
	newForm.setAttribute( "method", "post" );
	newForm.setAttribute( "action", "/scripts/edit_src/"+scriptID );
	newForm.innerHTML = '<input type="hidden" value="' + token + '" id="authenticity_token2ID" name="authenticity_token"/>' +
	'<textarea style="width: 98%; height: 300px;" name="src" id="script_src" rows="50" cols="40"></textarea><br/>' +
	'<p><input type="submit" value="Upload" name="commit"/> or <a href="/scripts/show/' + scriptID + '">cancel</a></p>';

	var contentArea = document.evaluate("//div[@id='content']/div[@class='admin_section']", document, null, 9, null).singleNodeValue;
	contentArea.appendChild( newH3 );
	contentArea.appendChild( newForm );
};

userscriptsOrgUpdateScriptBySrcOrFile();