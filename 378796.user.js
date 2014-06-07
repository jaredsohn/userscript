(function () {
  "use strict";

// ==UserScript==
// @name          uso - Sticky Topics
// @namespace     http://userscripts.org/users/37004
// @description   Moves a formatted table from the main script homepage description area to the Forum Activity sidebar header
// @copyright     2014+, Marti Martz (http://userscripts.org/users/37004)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       Creative Commons; http://creativecommons.org/licenses/by-nc-nd/3.0/
// @version       1.0.9.1esr1
// @icon          https://www.gravatar.com/avatar/e615596ec6d7191ab628a1f0cec0006d?r=PG&s=48&default=identicon

// @include       /^https?://userscripts\.org(?::\d{1,5})?/scripts/show/?/

// @include       http://userscripts.org/scripts/show/*
// @include       https://userscripts.org/scripts/show/*

// @updateURL   http://userscripts.org:8080/scripts/source/378796.meta.js
// @installURL  http://userscripts.org:8080/scripts/source/378796.user.js
// @downloadURL http://userscripts.org:8080/scripts/source/378796.user.js

// @grant  none

// ==/UserScript==

  /**
   *
   */
  function pageCheck(aUrl, aCb, aAnchorNode, aQueue) {
    var req = new XMLHttpRequest();
    req.open('GET', aUrl);
    if (authenticated)
      req.setRequestHeader('Range', 'bytes=0-7168');
    else
      req.setRequestHeader('Range', 'bytes=0-3259');
    req.onreadystatechange = function () {
      if (this.readyState == this.DONE) {
        switch (this.status) {
          case 404:
            aAnchorNode.parentNode.parentNode.classList.add("hide");
            aQueue.shift();
            if (aQueue.length > 0)
              pageCheck(aQueue[0].pathname, pageProc, aQueue[0], aQueue);
            break;
          default:
            aCb(aUrl, aAnchorNode, this.responseText);
            aQueue.shift();
            if (aQueue.length > 0)
              pageCheck(aQueue[0].pathname, pageProc, aQueue[0], aQueue);
            break;
        }
      }
    };
    req.send();
  }

  /**
   *
   */
  function pageProc(aUrl, aAnchorNode, aResponseText) {
    var docfrag = document.createDocumentFragment();

    var nodeDiv = document.createElement("div");
    nodeDiv.innerHTML = aResponseText;

    docfrag.appendChild(nodeDiv);

    var subtitleNode = docfrag.querySelector(".subtitle");
    if (subtitleNode) {
      var textNode = subtitleNode.lastChild;
      var matches = textNode.textContent.match(/(\d+)\spost/i);
      if (matches) {
        var postCount = matches[1];

        var anchorNodeCount = aAnchorNode.parentNode.nextSibling.firstChild;
        if (anchorNodeCount) {
          if (anchorNodeCount.textContent == "\u00BB") {
            anchorNodeCount.textContent = matches[1] + "  " + anchorNodeCount.textContent;
            anchorNodeCount.classList.add("lastpost");
            anchorNodeCount.classList.add("postslast");
          }
          else
            anchorNodeCount.textContent = matches[1];
        }
        anchorNodeCount.parentNode.classList.add("count");
      }
    }

    var topic_title = docfrag.querySelector("#topic-title");
    if (topic_title) {
      var textContent = topic_title.textContent.trim();
      if (textContent.length > 30)
        textContent = textContent.substr(0, 27) + "...";

      aAnchorNode.textContent = textContent;
    }
  }

  /**
   *
   */
  function getCounts() {
    var queue = [];

    var stickytopicsNode = document.querySelector("#right #stickytopics");
    var topicsNode = document.querySelector("#right #topics");
    if (stickytopicsNode && topicsNode) {

      var stickytopicItems = stickytopicsNode.querySelectorAll("tr td:first-child a");
      var topicItems = topicsNode.querySelectorAll("tr td:first-child a");
      var found;

      for (var i = 0, stickytopicItem; stickytopicItem = stickytopicItems[i]; ++i) {
        found = false;

        for (var j = 0, topicItem; topicItem = topicItems[j]; ++j) {

          if (stickytopicItem.pathname == topicItem.pathname) {

            stickytopicItem.textContent = topicItem.textContent;

            var stickytopicItemCount = stickytopicItem.parentNode.nextSibling.firstChild;
            var topicItemCount = topicItem.parentNode.nextSibling.firstChild;

            if (stickytopicItemCount && topicItemCount) {
              var matches = topicItemCount.textContent.match(/^(\d+)\s*/);
              if (matches) {
                if (stickytopicItemCount.textContent == "\u00BB") {
                  stickytopicItemCount.textContent = matches[1] + "  " + stickytopicItemCount.textContent;
                  stickytopicItemCount.classList.add("lastpost");
                  stickytopicItemCount.classList.add("postslast");
                }
                else
                  stickytopicItemCount.textContent = matches[1];

                stickytopicItemCount.parentNode.classList.add("count");
                found = true;
              }
            }
            break;
          }

        }

        if (!found)
          queue.push(stickytopicItem);
      }

      if (queue.length > 0)
        pageCheck(queue[0].pathname, pageProc, queue[0], queue);
    }
  }

  /**
   *
   */
  function moveTable(aTable) {

    var UAC = document.querySelector("#header .alt_topbottom");

    /**
    * Add styling
    */
    var css = [
        (UAC ? '#activity, #topics { float: inherit !important; }' : ''),
        '#stickytopics { ' + (UAC ? 'font-size: 12px;' : 'font-size: 0.9em;') + ' }',
        (UAC ? '#stickytopics td, #stickytopics th { padding: 3px 5px; }' : ''),
        '#stickytopics td:last-child { text-align: right; }',
        '#stickytopics thead th { background: none repeat scroll 0 0 #333; color: #fff; }',
        '#stickytopics .postslast { padding: 0.125em 0.25em 0.125em 0.5em; }',
        '#stickytopics td.count { text-align: right; background-color: #eee; ' + (UAC ? 'padding-right: 8px !important; ' : '') + '}'


    ].join('');

    var nodeStyle = document.createElement("style");
    nodeStyle.type = "text/css";
    nodeStyle.textContent = css;

    document.head.appendChild(nodeStyle);

    /**
    * Symmetry with USO
    */
    tableNode.width = "100%";


    /**
    * Move the table
    */
    var nodeDiv = document.createElement("div");
    nodeDiv.id = "stickytopics";

    nodeDiv.appendChild(aTable);

    var topicsNode = document.getElementById("topics");
    var script_sidebarNode = document.getElementById("script_sidebar");
    if (script_sidebarNode && topicsNode)
      script_sidebarNode.insertBefore(nodeDiv, topicsNode);

    getCounts();
  }

  /**
   *
   */
  var authenticated = document.querySelector("body.loggedin");
  var abort;

  var full_descriptionNode = document.getElementById("full_description");
  if (full_descriptionNode) {

    var thNodes = full_descriptionNode.querySelectorAll("table tr > th:first-child");
    for (var i = 0, thNode; thNode = thNodes[i]; i++) {
      if (/^Sticky\sTopics\s?$/.test(thNode.textContent)) {
        var tableNode = thNode.parentNode.parentNode.parentNode;
        abort = false;

        var trNodes = tableNode.querySelectorAll("tbody tr");
        for (var j = 0, trNode; trNode = trNodes[j]; j++) {

          var tid = null;

          var tdNodes = trNode.querySelectorAll("td");
          if (tdNodes.length == 2) {
            for (var k = 0, tdNode; tdNode = tdNodes[k]; k++) {
              switch (k) {
                case 0:
                  var aNodes = tdNode.querySelectorAll("a");
                  if (aNodes.length == 1) {
                    var aNode = aNodes[0];

                    var matches = aNode.href.match(/^(?:https?:\/\/userscripts\.org(?::\d{1,5})?)\/topics\/(\d+)/i);
                    if (matches) {
                      tid = matches[1];
                      aNode.href = "/topics/" + tid + aNode.hash;

                      var textContent = aNode.textContent;
                      if (textContent.length > 30)
                        aNode.textContent = textContent.substr(0, 27) + "...";
                    }
                  }
                  else {
                    abort = true;
                  }
                  break;

                case 1:
                  var aNodes = tdNode.querySelectorAll("a");
                  if (aNodes.length > 0) {
                    if (aNodes.length == 1) {
                      aNode = aNodes[0];

                      aNode.href = "/topics/" + tid + "#posts-last";
                      aNode.textContent = "\u00BB";
                    }
                    else {
                      abort = true;
                    }
                  }
                  else
                    tdNode.textContent = "\u2013";
                  break;
              }
            }
          }
        }

        if (!abort)
          moveTable(tableNode);
      }
    }

  }
})();
