// ==UserScript==
// @name            Worse Than Failure Captcha Removal
// @version     	1.1
// @author          Tom McCaffery
// @description     Deletes the ending of any comment message which has a sentence starting with "captcha:"
// @include         http://worsethanfailure.com/Comments/*
// @include         http://www.worsethanfailure.com/Comments/*
// ==/UserScript==

/*
 * This file is a Greasemonkey user script. To install it, you need
 * the Firefox plugin "Greasemonkey" (URL: http://greasemonkey.mozdev.org/)
 * After you installed the extension, restart Firefox and revisit
 * this script. Now you will see a new menu item "Install User Script"
 * in your tools menu.
 *
 * To uninstall this script, go to your "Tools" menu and select
 * "Manage User Scripts", then select this script from the list
 * and click uninstall :-)
 *
	Version History
	 -1.1 Updated domain and script name to reflect site's name change (you can uninstall the existing script if you have 1.0)
	 -1.0 Initial release
*/


function getElementsByClass(searchClass,node,tag) {
  var classElements = new Array();
  if (node == null)
	node = document;
  if (tag == null)
	tag = '*';
  var els = node.getElementsByTagName(tag);
  var elsLen = els.length;
  var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
  for (i = 0, j = 0; i < elsLen; i++) {
	if (pattern.test(els[i].className) ) {
	  classElements[j] = els[i];
	  j++;
	}
  }
  return classElements;
}

// find statements about captchas, and plain delete them. They're useless.
var commentBodies = getElementsByClass('CommentBody', null, 'div');
for (var key in commentBodies) {
	var div = commentBodies[key];
	var text = div.innerHTML;
	var captchaPos = text.search(/captcha:/ig);
	if (captchaPos > -1) {
		var bracketPos = text.substr(captchaPos).search(/\</);
		if (bracketPos > -1) {
			text = text.substr(0, captchaPos) + text.substr(captchaPos + bracketPos);
		} else {
			text = text.replace(/captcha:.*/ig, '');
		}

		div.innerHTML = text;
	}
}