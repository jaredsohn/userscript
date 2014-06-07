// ==UserScript==
// @name        WorkeyStatus
// @namespace   com.genwyse.workey
// @include     https://*/workey?*
// @version     1
// ==/UserScript==

var menu_frame = window.frames[0];
if (menu_frame != undefined) {
  menu_frame.addEventListener('load', setTitle, false); 
}

function setTitle () {
  var doc = menu_frame.document;
  if (doc != null) {
    var span = doc.getElementById('statusUser');
    if (span != null) {
      var bold_content = span.getElementsByTagName("b")[0];
      document.title = document.title + " - " + bold_content.innerHTML;
    }
  }
}
