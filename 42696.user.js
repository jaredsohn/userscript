// ==UserScript==
// @name           Blogger - HTML encode on post edit
// @namespace      com.bitkickers
// @namespace      http://bitkickers.blogspot.com/
// @include        http*://www.blogger.com/post-*.g?*
// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// ==/UserScript==

function addButton() {

   $("#postButtons").append($("<div dir=\"ltr\" class=\"cssButtonSize-small cssButtonSide-left\"><div class=\"cssButtonColor-blue\"><a href=\"#\" class=\"cssButton\" id=\"encodeButton\"><div class=\"cssButtonOuter\"><div class=\"cssButtonMiddle\"><div class=\"cssButtonInner\">HTML Encode Selection</div></div></div></a></div></div>"));

   $("#encodeButton").click(encode);
}

function encode() {

   var editBox = $("#textarea")[0];
   if (typeof(editBox) != "undefined") {
      var originalScrollHeight = editBox.scrollTop;
      var selectedText = editBox.value.substring(editBox.selectionStart, editBox.selectionEnd);
      if (selectedText != "") {
         editBox.value = 
                  editBox.value.substring(0, editBox.selectionStart)
		+ escapeHTML(selectedText)
                + editBox.value.substring(editBox.selectionEnd)
         editBox.scrollTop = originalScrollHeight;
      }
   }
}

function escapeHTML(str){
   var div = document.createElement('div');
   var text = document.createTextNode(str);
   div.appendChild(text);
   return div.innerHTML;
};

addButton();