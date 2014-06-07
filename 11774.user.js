// ==UserScript==
// @name           Gmail Label Hider (pref-based)
// @namespace      http://www.arthaey.com
// @description    Hide certain Gmail labels
// @include        http://gmail.google.com/*
// @include        https://gmail.google.com/*
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @version        1.3
//
// Based on Ben Hengst's Gmail Label Hider v0.02
// License: http://creativecommons.org/licenses/GPL/2.0/
//
// HOW TO USE:
//
// Right-click on the Greasemonkey monkey-face to access the "User Script
// Commands" menu. Select the "Set list of Gmail labels to hide" menu item.
//
// At the prompt, type in the list of Gmail labels you want to hide, separated
// by the "|" (pipe) character.
//
// KNOWN BUGS:
//
// - Sometimes the labels don't hide themselves when you open a message. I
//   haven't yet investigated why this is happening.
//
// CHANGELOG:
//
// v1.3 - made label names case-insenstive ("drafts" and "Drafts" are the same)
// v1.2 - added ability to hide non-label things like Starred, Drafts, etc.
// v1.1 - added "Show All" and "Hide Some" toggle links
// v1.0 - initial release
//
// ==/UserScript==

(function () {

   var TOGGLE_ID = "NavBar_Labels_ToggleLink";

   function setLabelList() {
       var hideList = GM_getValue('hideList', null);
       var list = prompt("List of labels to hide, separated by '|'", hideList);
       if (list && list != hideList) {
           GM_setValue('hideList', list);
           window.location.reload(false);
       }
   }

   function hideLabels() {
       var hideList = GM_getValue('hideList', null);
       if (!hideList) return;

       var hideLabels = hideList.split('|');
       var allDivs = document.evaluate(
          "//div[@class='lk cs'] | //div[@class='nl']",
          document,
          null,
          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
          null);

       for (var i = 0; i < allDivs.snapshotLength; i++) {
          var thisDiv = allDivs.snapshotItem(i);

          for (var j = 0; j < hideLabels.length; j++) {
             var regex = new RegExp("^" + hideLabels[j], "i");

             if (thisDiv.textContent.match(regex)) {
                thisDiv.style.display = "none";
                break;
             }
          }
       }

       toggleLink();
   }

   function showLabels() {
       var allDivs = document.evaluate(
          "//div[@class='lk cs'] | //div[@class='nl']",
          document,
          null,
          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
          null);

       for (var i = 0; i < allDivs.snapshotLength; i++) {
          var thisDiv = allDivs.snapshotItem(i);
          thisDiv.style.display = "block";
       }

       toggleLink();
   }

   function addLink() {
       var editLabelsDiv = document.getElementById("prf_l");
       if (!editLabelsDiv) return;

       var link = document.createElement("div");
       link.id = TOGGLE_ID;
       link.className = "lk cs";
       link.style.textAlign = "right";
       toggleLink(link);
       editLabelsDiv.parentNode.insertBefore(link, editLabelsDiv);
   }

   function toggleLink(linkObj) {
       var link = linkObj;
       if (!link) link = document.getElementById(TOGGLE_ID);
       if (!link) return;

       if (link.innerHTML.match(/Hide/)) {
           link.innerHTML = "Show All";
           link.removeEventListener('click', hideLabels, true);
           link.addEventListener('click', showLabels, true);
       }
       else {
           link.innerHTML = "Hide Some";
           link.removeEventListener('click', showLabels, true);
           link.addEventListener('click', hideLabels, true);
       }
   }

   window.addEventListener('load', function() {
       GM_registerMenuCommand("Set list of Gmail labels to hide", setLabelList);
       addLink();
       hideLabels();
   }, true);

})();
