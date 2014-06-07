// ==UserScript==
// @name			Automatically Add The 'word:WORD' Tag To Delicious Bookmarks For Dictionary.com
// @author			Erik Vold
// @namespace		deliciousAutoAddWordTagForDictionaryCom
// @include			http*://delicious.com/save
// @include			http*://delicious.com/save#*
// @include			http*://delicious.com/save?*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-08-31
// @lastupdated		2009-09-02
// @description		This userscript automatically adds the 'word:WORD' tag to delicious bookmarks for dictionary.com
// ==/UserScript==

var deliciousAutoAddWordTagForDictionaryCom = {};
deliciousAutoAddWordTagForDictionaryCom.setup = function() {
	var urlInput = document.getElementById( 'url' );
	if(!urlInput) return false;

	var tagsInput = document.getElementById( 'tags' );
	if(!tagsInput) return false;

	var domain = ( /^https?:\/\/([^\/]*)/i ).exec( urlInput.value );
	if(!domain) return false;
	else domain = domain[1];
	if( !(domain.match( "dictionary.com" ) || domain.match( "dictionary.reference.com" )) ) return false;

	var wordStr = ( /^https?:\/\/[^\?#]*browse\/\+?([^\?#\/]+)/i ).exec( urlInput.value );
	if(!wordStr ) return false;
	else wordStr = wordStr[1];

	// if the word string contains a space, then ignore it
	if( wordStr.match( /(\s|%20)/i ) ) {
		return false;
	}

	var newTag = "word:"+wordStr;
	if( tagsInput.value.match( "(^|\s)" + newTag + "(\s|$)" )  ) {
		return true;
	}
	else if ( tagsInput.value.length == 0 || tagsInput.value.match( / $/ ) ) {
		tagsInput.value += newTag+" ";
	}
	else {
		tagsInput.value += " "+newTag+" ";
	}

	var newTag = wordStr;
	if( tagsInput.value.match( "(^|\s)" + newTag + "(\s|$)" )  ) {
		return true;
	}
	else if ( tagsInput.value.length == 0 || tagsInput.value.match( / $/ ) ) {
		tagsInput.value += newTag+" ";
	}
	else {
		tagsInput.value += " "+newTag+" ";
	}
	return true;
};
deliciousAutoAddWordTagForDictionaryCom.setup();
