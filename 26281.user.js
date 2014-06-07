// ==UserScript==
// @name User ignorence in Review33
// @namespace http://www.review33.com/ignore
// @description Ignore user reply in review33 thread
// @include http://www.review33.com/chat/forum_message.php*
// ==/UserScript==

var filter_usr = "\u4e86";
var frmtabs, frmtab, hdrtab, frmcell, usr, hdr;
var heading_prefix = "\<b\>\u8ac7\u5929\u8AAA\u5730 \u4e3b\u65e8";
var filter_msg = document.createElement("div");
var usr_found = false;


filter_msg.innerHTML = '<div> ' +
 ' <table width="100%" border="0" cellspacing="1" cellpadding="2" class="SmallFont"> ' +
 '   <tr bgcolor=#ffffcc><td width="100%">User ' + filter_usr + 
 ' has been filtered in this thread. ' +
 '   </td></tr></table></div>';

frmtabs = document.getElementsByTagName('table');
if (!frmtabs.length) { return; }

// Search for the user threah and remove it
for (var i = 0; i <= frmtabs.length; i++) {
  frmtab = frmtabs[i];
  if (!frmtab) {continue;}
  frmcell = frmtab.rows[0].cells[1];
  if (!frmcell) {continue;}

  usr = frmcell.innerHTML.substr(0,5);
  if ((usr.substr(0,1) == filter_usr) && (usr.substr(1,5) == "<br>")) {
    frmtab.parentNode.removeChild(frmtab);
    usr_found = true;
    i = i-1;
  }
}


// Add message on header if user is filtered in this page
if (usr_found) {
  for (var i = 0; i <= frmtabs.length; i++) {
    hdrtab = frmtabs[i];
    frmcell = hdrtab.rows[0].cells[0];

    hdr = frmcell.innerHTML.substr(0,10);
    if (hdr == heading_prefix) {
      i = frmtabs.length+1;
    }
  }
  hdrtab.parentNode.insertBefore(filter_msg, hdrtab.nextSibling);
}

//
// ChangeLog

//
// 30-Apr-2008 Created by Henry II
// 10-May-2008 Add user filter detection message
//
