// ==UserScript==
// @name          No dedicated page for Moodle resources
// @namespace     http://henrik.nyh.se
// @description   In the course management system Moodle, attached resources (typically PDFs) are served inside a frameset. If your system is configured to open these outside the browser, you end up at a pretty much blank page every time you open a resource. This script jumps back to the previous page after the file download has (hopefully) been started. If you want to open a resource that should go in a frameset, simply open it into a new tab.
// @include       */resource/view.php?id=*
// ==/UserScript==

setTimeout("history.back()", 1000);
