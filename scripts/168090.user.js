// ==UserScript==
// @name Wanikani reading indicator
// @namespace thenn42.eu/userscripts
// @description Changes Reading for Yomikata
// @include    http://www.wanikani.com/review/*
// @run-at document-end
// @require		http://code.jquery.com/jquery-1.9.1.min.js
// ==/UserScript==
var Reading;

Reading = function() {
  if ($("#question").children("strong").text() === "Reading") {
    return $("#question").children("strong").text("読み方");
  }
};

Reading();

$("#question").bind("DOMNodeInserted", Reading);
