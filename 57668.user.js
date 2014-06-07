// --------------------------------------------------------------------------------
// Copyright (C) 2009  Alin Andrei (webupd8(at)gmail(dot)com || http://webupd8.blogspot.com)
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Blogger Insert Read More Button
// @namespace       http://webupd8.blogspot.com
// @description     Blogger - Insert A Read More Button For The Old Editor
// @include        http*://www.blogger.com/post-*.g?*
// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// ==/UserScript==
//
// 0.2 @ 2009/09/13 # Initial Release
//
// Some work is based on http://www.blogger.com/common/js/2296960907-richedit-bundle.js and http://userscripts.org/scripts/show/42696
// Tested on Firefox 3.5.3 and Greasemonkey 0.8.2
//
// --------------------------------------------------------------------------------

function addButton() {

   $("#postButtons").append($("<div dir=\"ltr\" class=\"cssButtonSize-small cssButtonSide-left\"><div class=\"cssButtonColor-blue\"><a href=\"#\" class=\"cssButton\" id=\"moreButton\"><div class=\"cssButtonOuter\"><div class=\"cssButtonMiddle\"><div class=\"cssButtonInner\">Insert 'More'</div></div></div></a></div></div>"));

   $("#moreButton").click(morebutton);
}

function morebutton() {

   var editBox = $("#textarea")[0];
   if (typeof(editBox) != "undefined") {
         editBox.value = 
		         editBox.value.substring(0, editBox.selectionStart)
		+ "<!-- more -->"
                + editBox.value.substring(editBox.selectionEnd)
                  
	}
}

addButton();
