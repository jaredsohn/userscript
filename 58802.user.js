// ==UserScript==
// @name			Delicious: Focus Tag Input Field On Clicking A Suggestion
// @author			Erik Vold
// @namespace		deliciousFocusTagFldOnClickOfSuggestion
// @include			http*://delicious.com/save
// @include			http*://delicious.com/save#*
// @include			http*://delicious.com/save?*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-08-29
// @lastupdated		2009-09-28
// @description		This userscript will automatically focus on the tag input field after you click on a suggested tag.
// ==/UserScript==

var deliciousFocusTagFldOnClickOfSuggestion ={};

deliciousFocusTagFldOnClickOfSuggestion.tagsFld = document.getElementById("tags");

deliciousFocusTagFldOnClickOfSuggestion.clickFunc = function() {
	deliciousFocusTagFldOnClickOfSuggestion.tagsFld.focus();
	return;
};

deliciousFocusTagFldOnClickOfSuggestion.setup = function(){
	var tags = document.getElementsByClassName('tag-list-tag');
	for(var i = 0; i < tags.length; i++){
		tags[i].addEventListener( "click", deliciousFocusTagFldOnClickOfSuggestion.clickFunc, false );
	}
	return;
};

deliciousFocusTagFldOnClickOfSuggestion.setup();
