// Copyright (C) John Mark Vandenberg - jayvdb@gmail.com
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Google Books Accessible", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Books Scrape Text
// @description   Adds a "Copy" button on "Full View" book to copy text to clipboard.
//                The config option 'signed.applets.codebase_principal_support' must
//                be set to true; see http://www.krikkit.net/howto_javascript_copy_clipboard.html
// @include       http://books.google.com*/books?*pg=*
// ==/UserScript==
 
function copy_clip (meintext) {
   // Copyright (C) krikkit - krikkit@gmx.net
   // http://www.krikkit.net/howto_javascript_copy_clipboard.html
   if (window.clipboardData) 
   {
      // the IE-manier
      window.clipboardData.setData("Text", meintext);
 
      // waarschijnlijk niet de beste manier om Moz/NS te detecteren;
      // het is mij echter onbekend vanaf welke versie dit precies werkt:
   }
   else if (unsafeWindow.netscape) 
   { 
      // dit is belangrijk maar staat nergens duidelijk vermeld:
      // you have to sign the code to enable this, or see notes below 
      unsafeWindow.netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
 
      // maak een interface naar het clipboard
      var clip = Components.classes['@mozilla.org/widget/clipboard;1']
                 .createInstance(Components.interfaces.nsIClipboard);
      if (!clip) return;
 
      // maak een transferable
      var trans = Components.classes['@mozilla.org/widget/transferable;1']
                  .createInstance(Components.interfaces.nsITransferable);
 
      if (!trans) return;
 
      // specificeer wat voor soort data we op willen halen; text in dit geval
      trans.addDataFlavor('text/unicode');
 
      // om de data uit de transferable te halen hebben we 2 nieuwe objecten 
      // nodig om het in op te slaan
      var str = new Object();
      var len = new Object();
 
      var str = Components.classes["@mozilla.org/supports-string;1"]
                   .createInstance(Components.interfaces.nsISupportsString);
 
      var copytext=meintext;
 
      str.data=copytext;
 
      trans.setTransferData("text/unicode",str,copytext.length*2);
 
      var clipid=Components.interfaces.nsIClipboard;
 
      if (!clip) return false;
 
      clip.setData(trans,null,clipid.kGlobalClipboard);
   }
   else {
      return false;
   }
 
   return true;
}
// ====
 
 
function getTextContainer () {
   var container_table = document.getElementById('container');
 
   var node = container_table.firstChild.childNodes[3].childNodes[1].firstChild;
 
   node.id = 'text_container';
   return node;
}
 
function GetAccessibleHTML () {
   var text_container = getTextContainer ();
   return text_container.innerHTML;
}
 
var extract_pagetext_re = /"Content":"(.*)","Flags":[0-9]*}/;
function CopyText () {
   var text;
   var page_number = document.getElementById ('jtp').value;
 
   if (output_mode == 'html_text') {
      text = GetAccessibleHTML();
   }
   else { //if (output_mode == 'images') {
      if (!unsafeWindow['copytext_page' + page_number]) {
         var jstext_url = location.href.replace(/#.*/,'')
                                       .replace(/(pg|output)=[^&]*/,'') 
                          + '&pg=PA' + page_number 
                          + '&jscmd=click2&output=text';
 
         GM_xmlhttpRequest({
            method: 'GET',
            url: jstext_url,
            onload: function(responseDetails) {
               if (responseDetails.status != 200) return;
 
               if (!extract_pagetext_re.exec(responseDetails.responseText) ) return;
 
               var text = RegExp.$1;
	       text = text.replace(/\\"/,'"').replace(/\\n/,'\n');
 
               unsafeWindow['copytext_page' + page_number] = text;
               CopyText();
            }
         });
	 return;
      }
 
      text = unsafeWindow['copytext_page' + page_number];
   }
 
   // format it as either text, lines (formatted) or leave it as html
   var method = document.getElementById ('copytext_method').value;
   if (method != 'html')
      text = text.replace('<br>', '\n', 'g').replace(/<[\/]*p>/g, '');
 
   if (method == 'text')
      text = text.replace('\n', ' ', 'g');
 
   if ( copy_clip ( text ) ) {
      var button;
      if (this && this.type && this.type == 'BUTTON')
          button = this
      else
          button = document.getElementById ('copytext');
 
      button.innerHTML = "Copied";
      button.disabled = true;
      window.setTimeout(RestoreCopyTextButton, 2000);
   }
   return false;
}
 
function RestoreCopyTextButton() {
   var button = document.getElementById('copytext');
 
   if (!button) return;
   button.disabled = false;
}
 
function ResetCopyTextButton() {
   var button = document.getElementById('copytext');
 
   if (!button) return;
 
   button.innerHTML = 'Copy';
   button.disabled = false;
}
 
function AddCopyAction () {
   var pagecontrol = document.getElementById('pagecontrol');
   var jtp_form = document.getElementById('jtp_form');
   var arrows = pagecontrol.getElementsByTagName('A');
 
   if (!jtp_form) return; // probably not full view
 
   var toolbar = document.getElementById('toolbar');
   toolbar.parentNode.setAttribute('width', '20%');
   toolbar.parentNode.previousSibling.setAttribute('width', '25%');
 
   var regularview = document.getElementById('regular_view');
   // shorten from "Exit from fullscreen" to "Exit"
   regularview.firstChild.lastChild.firstChild.nodeValue = 'Exit';
 
   var dropzone = regularview.parentNode.parentNode; // = TR
 
   var copy_td = document.createElement('TD');
   copy_td.id = 'copy_td';
 
   // add new TD before the 'regular view' TD
   // that is hidden until in fullscreen mode
   dropzone.insertBefore( copy_td, regularview.parentNode );
 
   var node = document.createElement('BUTTON');
   node.id = 'copytext';
   node.innerHTML = 'Copy';
   node.addEventListener('click', CopyText, 'false');
 
   copy_td.appendChild ( node );
 
   var list = document.createElement('SELECT');
   list.id = 'copytext_method';
   list.innerHTML = '<OPTION value="html">HTML</OPTION>'
                  + '<OPTION value="formatted" SELECTED>Lines</OPTION>'
                  + '<OPTION value="text">Text</OPTION>';
 
   copy_td.appendChild ( list );
 
   // when the user changes pages, the Copy button needs to be reset
   jtp_form.addEventListener('submit', ResetCopyTextButton, 'false');
 
   arrows[0].addEventListener('click', ResetCopyTextButton, 'false');
   arrows[1].addEventListener('click', ResetCopyTextButton, 'false');
}
 
var output_param = /output=([^&]*)/;
 
var output_mode = 'images';
if (output_param.exec ( location.href ) )
   output_mode = RegExp.$1;
 
AddCopyAction ();
 
if (GM_registerMenuCommand) {
   GM_registerMenuCommand('Copy text to clipboard', CopyText);
}

