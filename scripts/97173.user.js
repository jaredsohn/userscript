// ==UserScript==
// @name           library_elf_summary
// @namespace      *
// @description    Places Summary from Library Elf on bottom of all Library Pages
// @include        https://www.more.lib.wi.us/*
// @include        http://www.more.lib.wi.us/*
// ==/UserScript==

// This works for MORE (WI) library site, should be easy to modify for any site

// Replace <LIBRARY_ELF_KEY> with the html daily file from Library Elf
//
// To find Key, go to libraryelf.com -> My Acount
// Find the HTML button under Delivery Method
url="http://feed.libraryelf.com/HTML/<LIBRARY_ELF_KEY>.htm";

var libTitles=new Array();
var libUsers=new Array();
var libStatus=new Array();
var libNum = 0;

// Get Library Elf page
GM_xmlhttpRequest({
  method: 'GET',
  url: url,
  onload: function(responseDetails) {
    var doc = document.implementation.createDocument('', '', null), html = document.createElement('html');
    html.innerHTML = responseDetails.responseText;
    doc.appendChild(html);
    getSummary(doc);
  },
  onerror: function(responseDetails) {
    alert("ERROR Reading Library Elf Site");
  }
});

function getSummary(doc) {
  // Get the Summary Table
  var summaryTable = doc.getElementById("LibItemsOut_PatronCheckGrid");

  // Add it to the bottom
  footer = document.getElementById("footer");

  var addTable = document.createElement('table');
  addTable.border = 1;
  addTable.innerHTML = summaryTable.innerHTML;
  footer.parentNode.insertBefore(addTable, footer.nextSibling);
  // Create link back to Library Elf
  var leLink = document.createElement('p');
  leLink.innerHTML = "<A href=\"" + url + "\" target=\"_blank\">Library Elf</A>"
  footer.parentNode.insertBefore(leLink, footer.nextSibling);

  var titleA = document.getElementsByClassName("bibInfoData");
  if (titleA != null) {
    getLibraryElfTitles(doc);
    var labelA = document.getElementsByClassName("bibInfoLabel");
    for (var i = 0; i < titleA.length; ++i) {
      var labelIT = labelA[i].innerHTML;
      label = labelIT.toString();
      if (label.match("Title")) {
      var titleIT = titleA[i].innerHTML;
      var title = titleIT.toString();

      for (var ii = 0; ii < libNum; ++ii) {
        var libTitle = libTitles[ii].toString();
        title = title.replace(/<.*?>/g,"");
        libTitle = libTitle.replace("/"," ");
        title = title.replace("/"," ");
        libTitle = libTitle.replace("["," ");
        title = title.replace("["," ");
        libTitle = libTitle.replace("]"," ");
        title = title.replace("]"," ");
        libTitle = libTitle.replace("("," ");
        title = title.replace("("," ");
        libTitle = libTitle.replace(")"," ");
        title = title.replace(")"," ");
        libTitle = libTitle.replace("&amp;","&");
        title = title.replace("&amp;","&");


        libTitle = libTitle.replace("/"," ");
        title = title.replace("/"," ");
        libTitle = libTitle.replace("["," ");
        title = title.replace("["," ");
        libTitle = libTitle.replace("]"," ");
        title = title.replace("]"," ");
        libTitle = libTitle.replace("|"," ");
        title = title.replace("|"," ");

        libTitle = libTitle.replace("/"," ");
        title = title.replace("/"," ");
        libTitle = libTitle.replace("["," ");
        title = title.replace("["," ");
        libTitle = libTitle.replace("]"," ");
        title = title.replace("]"," ");
        libTitle = libTitle.replace("|"," ");
        title = title.replace("|"," ");

        libTitle = libTitle.replace(/ $/,"");
        title = title.replace(/ $/,"");

        if (title.match(libTitle) || libTitle.match(title)) {
          var holds = document.createElement('table');
          holds.border = 1;
          holds.innerHTML = "<TR><TD>" + libStatus[ii] + " (" + libUsers[ii] + ")</TD></TR>";
          titleA[i].parentNode.insertBefore(holds, titleA[i].nextSibling);
        }
      }
    }
    }
  }

  var titleC = document.getElementsByClassName("briefcitTitle");
  if (titleC != null) {
    if (libNum == 0) { getLibraryElfTitles(doc); }
    for (var i = 0; i < titleC.length; ++i) {
      var titleIT = titleC[i].innerHTML;
      var title = titleIT.toString();
      title = title.replace(/<.*?>/g,"");
      for (var ii = 0; ii < libNum; ++ii) {
        var libTitle = libTitles[ii].toString();
        libTitle = libTitle.replace("/"," ");
        title = title.replace("/"," ");
        libTitle = libTitle.replace("["," ");
        title = title.replace("["," ");
        libTitle = libTitle.replace("]"," ");
        title = title.replace("]"," ");
        libTitle = libTitle.replace("&amp;","&");
        title = title.replace("&amp;","&");


        libTitle = libTitle.replace("/"," ");
        title = title.replace("/"," ");
        libTitle = libTitle.replace("["," ");
        title = title.replace("["," ");
        libTitle = libTitle.replace("]"," ");
        title = title.replace("]"," ");
        libTitle = libTitle.replace("|"," ");
        title = title.replace("|"," ");

        libTitle = libTitle.replace("/"," ");
        title = title.replace("/"," ");
        libTitle = libTitle.replace("["," ");
        title = title.replace("["," ");
        libTitle = libTitle.replace("]"," ");
        title = title.replace("]"," ");
        libTitle = libTitle.replace("|"," ");
        title = title.replace("|"," ");

        libTitle = libTitle.replace(/ $/,"");
        title = title.replace(/ $/,"");

        title = title.replace(/^[\s]+/,"");

        if (title.match(libTitle) || libTitle.match(title)) {
          var holds = document.createElement('table');
          holds.border = 1;
          holds.innerHTML = "<TR><TD>" + libStatus[ii] + " (" + libUsers[ii] + ")</TD></TR>";
          titleC[i].parentNode.insertBefore(holds, titleC[i].nextSibling.nextSibling);
        }
      }
    }
  }
}

function getLibraryElfTitles(doc) {
  for (time=0; time < 2; ++time) {
    if (time==0) allLibItems = doc.getElementsByClassName('trItem');
    if (time==1) allLibItems = doc.getElementsByClassName('trItemAlt');
    if (time==2) allLibItems = doc.getElementsByClassName('trItem highlight');
    if (time==3) allLibItems = doc.getElementsByClassName('trItemAlt highlight');

    for (var i=0; i < allLibItems.length; ++i) {
      row = allLibItems[i].innerHTML;
      allRowItems = allLibItems[i].getElementsByTagName('td');
      var titleCell = allRowItems[2];
      var userCell = allRowItems[1];
      var statusCell = allRowItems[3];
      var libItem = titleCell.innerHTML;
      var libItemUser = userCell.innerHTML;
      var libItemStatus = statusCell.innerHTML;
      if (libItemStatus == null) { libItemStatus = "CHECKED OUT"; }
      if (! libItem.match(/^([0-5]?\d?\d?\d?\d|6[0-4]\d\d\d|65[0-4]\d\d|655[0-2]\d|6553[0-5])$/)) {
        libTitles[libNum] = libItem;
        libUsers[libNum] = libItemUser;
        libStatus[libNum] = libItemStatus;
        ++libNum;
      }
    }
  }
}
