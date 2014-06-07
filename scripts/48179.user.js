// ==UserScript==
// @name           Stack Overflow - Drag and Drop Tags to Ignored/Interesting lists
// @namespace      http://sam.haslers.info/stackoverflow/
// @description    Drag and Drop Tags to add them to the Ignored/Interesting lists
// @include        http://stackoverflow.com/
// @include        http://serverfault.com/
// @include        http://stackoverflow.com/questions
// @include        http://serverfault.com/questions
// @include        http://stackoverflow.com/questions/
// @include        http://serverfault.com/questions/
// @include        http://stackoverflow.com/questions?*
// @include        http://serverfault.com/questions?*
// ==/UserScript==

// Check if jQuery's loaded
var checker=setInterval(function(){
if(typeof (jQuery = unsafeWindow.jQuery) != "undefined") {
    clearInterval(checker);
    letsJQuery();
 }
},100);

const TAG_URL = "http:\/\/" + document.domain + "\/questions\/tagged\/(.*)$";

// All your GM code must be inside this function
function letsJQuery() {
	jQuery("#ignoredTag, #interestingTag").mouseover(function(){
		if (this.value.match(TAG_URL)) {
			this.value = RegExp.$1;
			jQuery(this).parent().parent().find("input[type='button']").click();
		}
	});

}