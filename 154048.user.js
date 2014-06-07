// ==UserScript==
// @name           Comma Separated Tags
// @namespace      Kamille
// @description    Be able to click reblog from your notes
// @include        http://www.tumblr.com/new/*
// @include        http://www.tumblr.com/reblog/*
// @include        http://www.tumblr.com/edit/*
// @grant          none
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// ==/UserScript==
var $j = jQuery.noConflict();
function set_comma_tags() {
	var initialTagSection = document.getElementById("set_tags").innerHTML;
	
	var additionalTagSection = "<br/><textarea style=\"width:190px;height:70px;font-size:10px;\" id=\"commaTags\" value=\"hello\"></textarea><br/><a href=\""+
		"javascript:var tagsFoo = document.getElementById('commaTags').value;"+
		"var tagsArr = tagsFoo.split(',');" +
		"for (var i=0;i<tagsArr.length;i++){ insert_tag(tagsArr[i]);}" +
        "tag_editor_update_form();" +        
		"\" style=\"color: #666;font-size: 10px;\">Add tags</a><br/>";
	document.getElementById("set_tags").innerHTML = initialTagSection + additionalTagSection;
	
}
set_comma_tags();