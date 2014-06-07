// ==UserScript==
// @name           Google Calendar Show All
// @namespace      http://www.arthaey.com/
// @description    Removes scrollbars and displays entire schedule.
// @include        http*://www.google.com/calendar/*
// @author         Arthaey Angosii <arthaey@gmail.com>
// @version        1.3
// ==/UserScript==

// Google-defined element IDs and CSS class names, subject to change without notice
var PRINT_ICON_ID = "mtpPrintLk";
var CALENDAR_ID = "scrolltimedeventswk";
var TOOLBAR_CLASS = "goog-inline-block";

window.addEventListener("load", function() {

   GM_addStyle(
      "#showAll {" +
      "   cursor: pointer;" +
      "   padding-right: 4px;" +
      "   position: relative;" +
      "   top: 2px;" +
      "}"
   );
   addShowAllButton();

   var SHOW_ALL_ADDED = false;

   function addShowAllButton() {
      if (SHOW_ALL_ADDED) return;

      var printLink = document.getElementById(PRINT_ICON_ID);
      var calendarDiv = document.getElementById(CALENDAR_ID);

      // try again later; window onload doesn't seem good enough?
      if (!printLink || !calendarDiv) {
         window.setTimeout(addShowAllButton, 1000);
      }

      var showLink = createShowLink(
         "Show All", "showAll", showAll,
         "Show everything, from midnight to midnight"
      );

      var showDiv = document.createElement('div');
      showDiv.className = TOOLBAR_CLASS;
      showDiv.appendChild(showLink);
      printLink.parentNode.insertBefore(showDiv, printLink);

      SHOW_ALL_ADDED = true;
   }

}, true);

function showAll() {
   var calendarDiv = document.getElementById(CALENDAR_ID);
   calendarDiv.style.height = "";
}

function createShowLink(text, id, fnct, title) {
   var link = document.createElement('img');
   link.alt = text;
   link.src = "data:image/gif,GIF89a%0D%00%0D%00%F1%03%00%00%00%CCaa%DF%C8%C8%F4%FF%FF%FF!%F9%04%01%0A%00%03%00%2C%00%00%00%00%0D%00%0D%00%00%02'%9C-%20%C7%08%BF%9AyT%DA%96N%1Cj%24%60%04%400)%D5%D7Q_8%96K%86%1C%DDES%CF%85nR%A2%0F%05%00%3B";

   link.addEventListener("click", fnct, true);
   link.id = id;
   if (title)
      link.title = title;

   return link;
}
