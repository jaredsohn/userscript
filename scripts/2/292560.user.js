// ==UserScript==
// @name          USO Spam Hunter
// @namespace     fr.kergoz-panic.watilin
// @version       1.4
// @description   Reports and hides spam on Userscripts.org.
//
// @match         *://userscripts.org/forums/*
// @match         *://userscripts.org/topics/*
// @noframes
//
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_deleteValue
//
// @author        Watilin
// @copyright     2014+, Watilin
// @license       CC 4.0 BY-NC-SA, http://creativecommons.org/licenses/by-nc-sa/4.0/
//
// @homepage      http://kergoz-panic.fr/watilin/userscripts/uso-spam-hunter/
// @icon          http://kergoz-panic.fr/watilin/userscripts/uso-spam-hunter/spamfist.png
// @downloadURL   https://userscripts.org/scripts/source/292560.user.js
// @updateURL     https://userscripts.org/scripts/source/292560.meta.js
// ==/UserScript==

/* DISCLAIMER
 * This script makes intensive use of Harmony (ECMAScript 6) features.
 * Firefox is the only browser that honors progress. If you're using
 * Google Chrome, please uninstall it and repent.
 */

/* Table of Contents
 * Use Ctrl+F with a label and a leading "@" (e.g. "@STO")
 *    [UTI] Utilities
 *    [PRE] Preferences management
 *    [STO] Storage Stuff
 *    [STY] Styling
 *    [REA] Real Business
 */

/* TODO List
 *  3. Do something with empty topics
 *
 *  4. Add a Oops feature to abort reporting and un-hide genuine topics
 *
 *  5. Handle pages where there are too few legit topics
 *
 *  7. When the first post of a spam topic has been removed, but someone
 *     replied, this person has actually the topic's first post, so my
 *     script will treat her as the spammer. This needs to be fixed.
 *
 *  8. Not hide topics having more than one post, except if all other
 *     posts are from known spammers.
 *
 * 10. Add a Good-Ham button to whitelist reliable authors
 *
 * 11. Hook both “SPAM or NOT SPAM” buttons
 *
 * 12. (changed) Organize storage after age and add the ability to
 *     delete data by time periods
 *
 * 13. Handle concurrent script executions
 */

/* DONE List
 *  1. Automatically report all of a member's topics when this member
 *     gets marked as a spammer
 *
 *  2. Run multiple spam reportings in queue rather than simultaneously
 *
 *  6. Also hook the SPAM button from within the topic's page
 *
 *  9. Reduce by half the script's network usage by using the
 *     authenticity token and sending spam reports directly from the
 *     forum page.
 */

(function( ){ if (window !== top) return;

// [@UTI] Utilities ////////////////////////////////////////////////////

Array.prototype.dichotomicCompare = function( value, offset = 0 ){
   var l = this.length;
   switch (l) {
   case 0: return offset;
   case 1: return offset + (value > this[0]);
   default:
      var k = Math.ceil(l / 2);
      var p = this[k];
      if (value === p) {
         return offset + k;
      }
      if (value < p) {
         return this.slice(0, k).dichotomicCompare(value, offset);
      }
      return this.slice(k).dichotomicCompare(value, offset + k);
   }
}

Array.prototype.orderedInsert = function( value ){
   var index = this.dichotomicCompare(value);
   this.splice(index, 0, value);
   return this;
};

// FIXME this can be improved by altering `dichotomicCompare`
Array.prototype.uniqueOrderedInsert = function( value ){
   if (this.indexOf(value) > -1) return this;
   return this.orderedInsert(value);
};

Number.prototype.decimal = function decimal( digits ){
   var weight = Math.pow(10, digits);
   var n = Math.round(this * weight);
   var zeros = !(n % 100) + !(n % 10);
   return n / weight +
      (zeros ? "." + new Array(zeros + 1).join("0") : "");
};

// [@PRE] Preferences Management ///////////////////////////////////////



// [@STO] Storage Stuff ////////////////////////////////////////////////

// I don't need `postIds` anymore so I have to free its space
GM_deleteValue("postIds");

// uses GM storage to recall already reported spams
var authorIds = JSON.parse(GM_getValue("authorIds", "[]"));
var topicIds = JSON.parse(GM_getValue("topicIds", "[]"));

console.group("USO Spam Hunter statistics");
console.info("Spam authors list:", authorIds.length);
console.info("Spam topics list:", topicIds.length);
console.groupEnd();

function storeBack( ){
   // TODO 13: handle changes from concurrent pages before comitting

   var t0 = performance.now();

   // stores back data
   var authorsJson = JSON.stringify(authorIds);
   var t1 = performance.now();

   GM_setValue("authorIds", authorsJson);
   var t2 = performance.now();

   var topicsJson = JSON.stringify(topicIds);
   var t3 = performance.now();

   GM_setValue("topicIds", topicsJson);
   var t4 = performance.now();

   console.log("===storeBack profiled===\n" +
      "[authors list]\n" +
      "\tstringify:   " + (t1 - t0).decimal(2) + "ms\n" +
      "\tGM_setValue: " + (t2 - t1).decimal(2) + "ms\n" +
      "[topics list]\n" +
      "\tstringify:   " + (t3 - t2).decimal(2) + "ms\n" +
      "\tGM_setValue: " + (t4 - t3).decimal(2) + "ms\n");
}

// [@STY] Styling //////////////////////////////////////////////////////

function addStyle( style ){
   var $style = document.createElement("style");
   // this `replace`s helps live-editing the styles
   $style.textContent = style
      .replace(/\s+/g, " ")
      .replace(/[\{;\}]/g, "$&\n");
   document.head.appendChild($style);
}

function styleForumsPage( ){
   addStyle("tr.watilin-spam {\
      background: #fa9;\
   }\
   tr.watilin-spam td:first-child {\
      border-left: solid medium #f43;\
   }\
   tr.watilin-spam td {\
      border-bottom: solid thin #f76;\
   }\
   tr.watilin-spam td.ca.inv {\
      background: #fcb;\
      border-bottom: solid thin #fa9;\
   }\
   tr.watilin-spam.watilin-loading {\
      /* animation: moving-background 1s infinite linear;\
      background: repeating-linear-gradient(-45deg, #ddd 0, #eee 1px, #eee 15px, #ddd 16px, #ddd 29px);\
      background-size: 41px; */\
   }\
   /* @keyframes moving-background {\
      from { background-position: 0 0; }\
        to { background-position: 41px 0; }\
   } */\
   tr.watilin-spam.watilin-hidden {\
      transition: opacity 700ms;\
      opacity: 0;\
   }\
   a.watilin-report-button {\
      float: right;\
      display: inline-block;\
      width: 1.5em;\
      height: 1.5em;\
      line-height: 1.5em;\
      text-align: center;\
      font-weight: bold;\
      text-decoration: none;\
      font-size: 85%;\
      text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.25);\
      color: white;\
      background: linear-gradient(#999, #777);\
      border-bottom: solid thin #666;\
   }\
   a.watilin-report-button:hover {\
      background: linear-gradient(#777, #444);\
      border-bottom: solid thin #333;\
   }\
   tr.watilin-ambiguous {\
      background: #fd7;\
   }");

   // opacity 0 implies hiding the element
   document.body.addEventListener("transitionend", event => {
      var $target = event.target;
      if ("opacity" === event.propertyName) {
         $target.style.display = "none";
      }
   });
}

function styleTopicsPage( ){
   addStyle("td.author form[action='/spam'] input[type=submit] {\
      height: 1.5em;\
      line-height: 1.5em;\
      text-align: center;\
      text-transform: lowercase;\
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);\
      color: white;\
      background: linear-gradient(#999, #777);\
      border: none;\
      border-bottom: solid thin #666;\
   }\
   td.author form[action='/spam'] input[type=submit]:enabled {\
      cursor: pointer;\
   }\
   td.author form[action='/spam'] input[type=submit]:enabled:hover {\
      background: linear-gradient(#777, #444);\
      border-bottom: solid thin #333;\
   }\
   td.author form[action='/spam'] input.watilin-loading {\
      cursor: progress;\
      animation: dark-stripes 1s infinite linear;\
      background: linear-gradient(\
            rgba(0, 0, 0, 0),\
            rgba(0, 0, 0, 0.4)),\
         repeating-linear-gradient(-45deg,\
            #888 0,\
            #aaa 1px, #aaa 11px,\
            #888 12px, #888 23px);\
      background-size: 33px;\
   }\
   @keyframes dark-stripes {\
      from { background-position: 0 0; }\
        to { background-position: 33px 0; }\
   }\
   tr.watilin-spam-post {\
      background: linear-gradient(90deg, #fcb 50%, white 100%) no-repeat;\
      background-size: 200% auto;\
      animation: background-ribbon 700ms ease-in 0s 1;\
   }\
   @keyframes background-ribbon {\
      from { background-size: 0% auto; }\
        to { background-size: 200% auto; }\
   }\
   tr.watilin-spam-post td.author {\
      background: #fa9 !important;\
      border-color: #e10 !important;\
   }\
   tr.watilin-spam-post td.body {\
      border-color: #f98 !important;\
      background: none !important;\
   }");
}

// [@REA] Real Business ////////////////////////////////////////////////

var reportSpam = (function( ){
   var queue = [];
   var busy = false;

   function doReportSpam( postId, callbacks ){
      callbacks = callbacks || {};

      // sets a default error handling function
      var onerror = callbacks.onerror || function( xhr ){
         console.error("Ajax fail: readyState", xhr.readyState,
            "status", xhr.status,
            "statusText", xhr.statusText);
      };

      // notifies the beginning of the request
      if (callbacks.onloadstart) callbacks.onloadstart(this);

      // prepares an Ajax request mimicking the Spam report form
      var xhr = new XMLHttpRequest();

      xhr.onload = function( ){
         if (200 === this.status) {
            if (callbacks.onsuccess) callbacks.onsuccess(this);
         } else {
            onerror(this);
         }

         var nextCall = queue.shift();
         if (nextCall) {
            doReportSpam(nextCall.postId, nextCall.callbacks);
         } else {
            busy = false;
            storeBack();
         }
      };
      xhr.onerror = function( ){
         onerror(this);
      };

      xhr.open("post", "/spam");
      xhr.setRequestHeader("Content-Type",
         "application/x-www-form-urlencoded");
      xhr.send("authenticity_token=" +
         encodeURIComponent(unsafeWindow.auth_token) +
         "&target_id=" + postId +
         "&target_type=Post&spam=true&commit=SPAM");
   }

   return function queueReportSpam( postId, callbacks ){
      if (busy) {
         queue.push({ postId: postId, callbacks: callbacks });
      } else {
         busy = true;
         window.addEventListener("beforeunload", function( ){
            if (busy) storeBack();
         });
         doReportSpam(postId, callbacks);
      }
   };
}());

switch (location.pathname.match(/\w+/)[0]) {
case "forums": {
   styleForumsPage();

   var rows = Array.slice(
      document.querySelectorAll("table.wide tbody tr:not(:first-child)"));
   var RESULTS_PER_PAGE = rows.length; // in prevision of TODO 5

   // in prevision of TODO 8 (function name to be refined)
   function checkRow( $tr ){
      var replyCount = parseInt($tr.querySelector("td.replies").textContent);
      var pUrl;
      var pid;
      switch (replyCount) {
         case 0: {
            pUrl = $tr.querySelector("a.lastpost").href;
            pid = pUrl.match(/#posts-(\d+)/)[1] | 0;
            break;
         }
         case 1: {
            var lastPostAuthorId = $tr.querySelector("td.ra a.author")
               .href.match(/\/users\/(\d+)/)[1] | 0;
            if (lastPostAuthorId === aid ||
                  authorIds.indexOf(lastPostAuthorId) >= 0) {
               pUrl = $tr.querySelector("a.lastpost").href;
               pid = pUrl.match(/#posts-(\d+)/)[1] | 0;
            }
            break;
         }
         default: {
            pid = null;
            // this case will require an iframe
         }
      }
   }

   var topicsByAuthors = {};

   // iterates over each row of the topics table.
   rows.forEach($tr => {
      var $titleCell = $tr.querySelector("td.c2");

      var tid = $titleCell.querySelector("a.entry-title")
         .href.match(/\/topics\/(\d+)/)[1] | 0;
      var aid = $titleCell.querySelector("a.author")
         .href.match(/\/users\/(\d+)/)[1] | 0;
      var pid = $tr.querySelector("a.lastpost")
         .href.match(/#posts-(\d+)/)[1] | 0;

      if (!(aid in topicsByAuthors)) topicsByAuthors[aid] = [];
      topicsByAuthors[aid].push({ "$tr": $tr, "tid": tid, "pid": pid });

      // Simplest case: the topic's already been reported.
      if (topicIds.indexOf(tid) >= 0) {
         $tr.classList.add("watilin-spam");
         $tr.classList.add("watilin-hidden");
      } else {
         // If the author's been marked as a spammer,
         // I still need to report the topic.
         if (authorIds.indexOf(aid) >= 0) {
            $tr.classList.add("watilin-spam");
            console.log("reporting post", pid);
            reportSpam(pid, {
               onloadstart: xhr => $tr.classList.add("watilin-loading"),
               onsuccess: xhr => {
                  topicIds.uniqueOrderedInsert(tid);
                  $tr.classList.add("watilin-hidden");
               }
            });
         } else {
            // Neither the topic nor the author have been marked,
            // so adds a report button.
            $titleCell.insertBefore(function( ){
               var $button = document.createElement("a");
               $button.className = "watilin-report-button";
               $button.href = "#";
               $button.textContent = "!";
               $button.title = "Report Spam";
               $button.onclick = event => {
                  event.preventDefault();

                  authorIds.uniqueOrderedInsert(aid);
                  $tr.classList.add("watilin-spam");
                  reportSpam(pid, {
                     onloadstart: xhr => $tr.classList.add("watilin-loading"),
                     onsuccess: xhr => {
                        topicIds.uniqueOrderedInsert(tid);
                        $tr.classList.add("watilin-hidden");
                     }
                  });

                  // reports all topics by the same author
                  topicsByAuthors[aid].forEach(item => {
                     var {
                        $tr: $otherTr,
                        tid: otherTid,
                        pid: otherPid
                     } = item;
                     var $otherButton = $otherTr
                        .querySelector("a.watilin-report-button");
                     $otherButton.parentNode.removeChild($otherButton);
                     $otherTr.classList.add("watilin-spam");
                     reportSpam(pid, {
                        onloadstart: xhr =>
                           $otherTr.classList.add("watilin-loading"),
                        onsuccess: xhr => {
                           topicIds.uniqueOrderedInsert(otherTid);
                           $otherTr.classList.add("watilin-hidden");
                        }
                     });
                  });
               };
               return $button;
            }(), $titleCell.firstChild);
         }
      }
   });

   break;
} // end of case "forums"

case "topics": {

   styleTopicsPage();

   Array.forEach(document.querySelectorAll("td.author"),
      $td => {
         var $form = $td.querySelector("form[action='/spam']");
         var $submit = $form.querySelector("input[type=submit]");
         $submit.title = "Flag this post as spam and its author as a spammer?";

         $form.addEventListener("submit", event => {
            event.preventDefault();
            $submit.disabled = true;

            // serializes the form and prepares sending
            var data = Array.map(
               $form.querySelectorAll("[name]"),
               $control => encodeURIComponent($control.name) + "=" +
                     encodeURIComponent($control.value)
            ).join("&");
            var xhr = new XMLHttpRequest();
            xhr.onerror = function( ){
               $submit.value = "x_x";
               $submit.title = "Something went wrong, please try again later.";
            };
            xhr.onload = function( ){
               // visually confirms success
               $submit.value = "Ok!"
               $submit.title = "This post has been flagged as spam.";
               $submit.classList.remove("watilin-loading");
               var $tr = $form.parentNode.parentNode;
               $tr.classList.add("watilin-spam-post");

               var $author = $td.querySelector("a[user_id]");
               var aid = $author.getAttribute("user_id") | 0;
               authorIds.uniqueOrderedInsert(aid);
               storeBack();
            };

            // adds “in-progress” styling then sends the request
            $submit.classList.add("watilin-loading");
            $submit.style.width = getComputedStyle($submit).width;
            $submit.value = "…";
            $submit.title = "Loading…";
            xhr.open("post", "/spam");
            xhr.setRequestHeader("Content-Type",
               "application/x-www-form-urlencoded");
            xhr.send(data);
         });
      });

   break;
} // end of case "topics"

}

}());
