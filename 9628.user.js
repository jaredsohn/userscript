// ==UserScript==
// @name            remove onFocus="this.blur()"
// @namespace       http://foo.bar/
// @description     Removes onFocus="this.blur()"
// @include         *
// ==/UserScript==

// remove onFocus workaround Firefox bug 240722
// version 0.0.1
// Sun,  3 Jun 2007 04:46:09 +0000
// Copyright (c) 2007, Miernik <public@miernik.name>
// Released under the GPL license version 2 or any later version
// http://www.gnu.org/copyleft/gpl.html
//
// This script is a workaround this Firefox bug:
// https://bugzilla.mozilla.org/show_bug.cgi?id=240722
// If any HTML element has an attibute onFocus="this.blur()
// it is impossible to navigate past that element with Tab
// For example links like this:
// <a href="http://foo.bar/" onFocus="this.blur()">link</a>
//
// This script works around that by removing that attribute.
// Currently it is not very clever, because it removes any onfocus
// attribute regardless of value. That is sufficient for me, if you need
// more fingrained fix, you have to modify this script yourself.
// In the variable 'tagnames' is a list of element types this script
// touches, you probably can add some more if you encounter this problem
// on any other attributes then listed.


(function()
{
	var tagnames = ['a','textarea'];
	for ( var i=0; i<tagnames.length; i++ )
	{
		var allElements = document.getElementsByTagName(tagnames[i]);
		var num = allElements.length;

//		alert("There are " + num + " " + tagnames[i] + " elements in this document");

		for ( var j=0; j<num; j++ )
		{
			var objP = allElements.item(j);
			var removeAttr = objP.removeAttribute('onfocus');
		}
	}
})();
