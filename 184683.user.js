// ==UserScript==
// @name          smk's clean links clinicalkey
// @namespace     fr.kergoz-panic.watilin
// @description   Direct non-javascript download links for clinicalkey.com (login required)
// @version       3.1
//
// @include       https://www-clinicalkey-com.ezproxy.lib.*
// @match         *://www.clinicalkey.com/*
//
// @run-at        document-start
// @grant         none
//
// @downloadURL   https://userscripts.org/scripts/source/184683.user.js
// @updateURL     https://userscripts.org/scripts/source/184683.meta.js
// ==/UserScript==

// polyfill for stupid browsers
if (!Array.forEach) {
   Array.forEach = function forEach( iterable, callback ){
      Array.prototype.forEach.call(iterable, callback);
   };
}

var views = {};
function getView( type ){
   if (type in views) return views[type];

   var view = controller.getView(type);
   views[type] = view;
   return view;
}

var controller;
var stores = {};
function getStore( type ){
   if (type in stores) return stores[type];

   if (!controller) {
      controller = window.gh.getController("BrowseCtrl");
   }

   var store = controller.getView(type).getBrowserResults().store;
   stores[type] = store;
   return store;
}

var app;
function getDownloadLink( type, id ){
   if (!app) app = window.app;

   var record = getStore(type).findRecord("eid", id);
   var cipId = record.get(app.CIP.EID);
   var pdfId = record.get(app.CIP.PDF_EID);
   return app.ctx + "content/player/stream/" + cipId +
      "?fileName=" + encodeURIComponent(pdfId);
}

function rewriteOrAddDownloadLinks( node ){
   Array.forEach(node.querySelectorAll("div.main.ct_book"),
      function( div ){
         var link = div.querySelector(
            "a.ico_pdf_results"
         );
         if (link) {
            var matches = decodeURIComponent(link.href).match(
               /downloadSearchPdf\('(\w+)',\s*'([\w.-]+)'\)/
            );
            if (!matches) return;

            var dlType = matches[1];
            var dlId = matches[2];
            link.href = getDownloadLink(dlType, dlId);
         } else {
            link = document.createElement("a");
            link.className = "ico_pdf_results";
            var eid = div.querySelector("span.title a").href
               .match(/([\w.-]+)\/$/)[1];
            try {
               link.href = getDownloadLink("bookChapter", eid);
            } catch (e) {
               console.error(e);
               return;
            }
            div.appendChild(link);
         }
      });
}

// removes tracking functions
function nop( ){}
Object.defineProperty(window, "ntptAddPair",  { value: nop });
Object.defineProperty(window, "ntptEventTag", { value: nop });

// looks up for the closest common parent of all pdf links
(function waitAndTry( ){
   var resultsBody =
      document.getElementById("bookChaptersBrowserResults-body");
   if (!resultsBody) {
      setTimeout(waitAndTry, 700);
      return;
   }

   // perdiodically replaces all new pdf links
   setInterval(function( ){
      rewriteOrAddDownloadLinks(resultsBody);
   }, 700);
}());
