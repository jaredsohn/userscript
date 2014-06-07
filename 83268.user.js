// ==UserScript==
// @name           Blogger HTML Encode Button
// @namespace      com.lyhdev.blogger.util.htmlEncoder
// @description    Provide [HTML Encode] button for blogger post editor.
// @include        http*://www.blogger.com/post-*.g?*
// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @require        http://labs.0xab.cd/jquery/fieldselection/0.2.3-test/jquery-fieldselection.pack.js
// ==/UserScript==

function addButton() {
   $("#submitButtons").append($("<div dir=\"ltr\" class=\"cssButtonSize-small cssButtonSide-right\"><div class=\"cssButtonColor-blue\"><a href=\"#\" class=\"cssButton\" id=\"encodeButton\"><div class=\"cssButtonOuter\"><div class=\"cssButtonMiddle\"><div class=\"cssButtonInner\">HTML Encode</div></div></div></a></div></div>"));
   $("#encodeButton").click(encode);
}

function encode() {
   var editBox = $("#postingHtmlBox");
   if (typeof(editBox) != "undefined") {
      var selectedText = editBox.getSelection();
      if (selectedText.text != "") {
         editBox.replaceSelection(escapeHTML(selectedText.text));
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
