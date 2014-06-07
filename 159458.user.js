// ==UserScript==
// @name           FurAffinity Post Prechecker / Hider 2.0
// @namespace      http://www.furaffinity.net/user/shywolf42
// @description    Hides the deleted submission/journal entries
// @include        http://www.furaffinity.net/msg/submissions*
// @include        http://www.furaffinity.net/msg/others*
// @include        http://www.furaffinity.net/favorites*
// ==/UserScript==


// Version 2
// loosely based on FurAffinity Deleted Post Hider Version 1.4 by Xijque


/*
Journals and submissions containing at least one of the specified keywords (or rather Character-sequences) 
will be pre-checked for easier removal and optionally hidden, unless they contain a keyword in the whitelist.

This means a filter for "EF" will check/hide all journals or submissions containing this string case insensitively.
I.e. "EF Meme" will be checked as well as "I'll put more effort into stuff"
But with the whitelist you can keep the journals saying "EF video" by adding "video" to the whitelist.

Hidden Journals and submissions are still checked, so they will be deleted when you click the "remove selected" button.

All entries will be compared case insensitive
*/

var keywords_journal_whitelist = new Array();
var keywords_journal = new Array("raffle", "commission", "sketch", "stream", 
   "live", "closed", "slot", "sale", "auction", "free art");


var keywords_submission_whitelist = new Array("sketch", "doodle", "dump", "result", "pinup", "comm", "donat", "request");
var keywords_submission = new Array("stream");

// set to "true" (without quotation marks) to hide journal entries rather than just checking them. 
// Otherwise set to "false" (without quotation marks)
var hide = false;

/*
set to "true" (without quotation marks) to hide deleted favorites in the favorite entries even if 
hiding journals and submissions is set to false.
*/
var hideDeletedFavs = false;


var paths=[],cache=[],checks=[],exec,elem;
if (exec=(/(submissions|others|favorites)/i).exec(window.location+"")) {
   switch (exec[1].toLowerCase()) {
      case 'submissions':
         var submissionTitles, curSubmission;
         submissionTitles = document.evaluate('id(\'messages-form\')//b/span',
           document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

         for (var i=0;i<submissionTitles.snapshotLength;i++) {
          var curSubmission = submissionTitles.snapshotItem(i);
          var title = curSubmission.title;
          
          if (shouldBePrechecked(title, keywords_submission, keywords_submission_whitelist)){
           var checkbox = document.evaluate('./ancestor::b', curSubmission, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
           checkChecks(checkbox.snapshotItem(0));
          }
         }
         break;

      case 'favorites':
        if (!hideDeletedFavs)
          break;

        var favorites = document.evaluate("//span[text()='Submission has been deleted']/following::small/a[text()=' by the owner.']/ancestor::b",
          document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        for (var i = favorites.snapshotLength - 1; i >= 0; i--) {
            favorites.snapshotItem(i).style.display="none";
        };
        break;
      case 'others':

        // Preselect deleted Messages
        var journalTitles = document.evaluate(
          "//strong[text()='Comment']/following::strong[text()='Journal']/ancestor::li | " +
          "//span[text()='Removed']/following::small[text()='by the user']/ancestor::li | " +
          "//li[text()='The favorite has been removed by the user.'] | " +
          "//strong[text()='Journal has been deleted']/following::strong[text()='the poster']/ancestor::li"
          , document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        for (var i = journalTitles.snapshotLength - 1; i >= 0; i--) {
          var curJournal = journalTitles.snapshotItem(i);
          checkChecks(curJournal);
        }

        // Preselect Journals based on filters
        journalTitles = document.evaluate("id('messages-journals')/ul/li/a[1]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        for (var i = journalTitles.snapshotLength - 1; i >= 0; i--) {
          var curJournal = journalTitles.snapshotItem(i);
          var title = curJournal.text;

          if (shouldBePrechecked(title, keywords_journal, keywords_journal_whitelist)){
           var checkbox = document.evaluate('./ancestor::li', curJournal, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
           checkChecks(checkbox.snapshotItem(0));
          }
        };
        break;
   }
}

function checkChecks(elem) {
   if (hide){
    elem.style.display='none';
   }

   var checkbox = document.evaluate(".//input[@type='checkbox']", elem, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
   checkbox.checked=true;

}

/*
title: Title of the submission / journal
blacklist: array of textsegments for preselection
whitelist: array of textsegments for no preselection despite a match of "title" and "matches"

returns: true if the item should be preselected based, otherwise false.
*/
function shouldBePrechecked(title, blacklist, whitelist){
   title = title.toLowerCase();

   for (var i = blacklist.length - 1; i >= 0; i--) {
      if (title.match(blacklist[i].toLowerCase())){
         
         //on whitelist?
         for (var j = whitelist.length - 1; j >= 0; j--) {
            if (title.match(whitelist[j].toLowerCase())){
               return false;
            }
         }
         return true;
      }
   }
}