// ==UserScript==
// @name          No Track Gmail
// @namespace     fr.kergoz-panik.watilin
// @version       0.1
// @description   Stops Gmail from tracking your links
// @author        Watilin
// @copyright     2013+, Watilin
// @license       Creative Commons by-nc-sa
//
// @match         https://mail.google.com/mail/*
// @noframes
// @run-at        document-start
//
// @grant         GM_addStyle
// ==/UserScript==

////////////////////////////////////////////////////////////////////////
//                                                                    //
//  /!\ WARNING /!\                                                   //
//                                                                    //
//  This is an experimental script. Functionality is NOT guaranteed,  //
//  and I encourage you to give me a maximum of suggestions and       //
//  feedback.                                                         //
//  Thank you ;)                                                      //
//                                                                    //
////////////////////////////////////////////////////////////////////////

const DEBUG = true;
var C;
if (DEBUG) {
   C = console;
} else {
   C = { log: function( ){} };
}

/* This function adds a mask between a given link and the pointer; the
   mask also steals the focus from the link.
   By activating the link whether by clicking onto it or by hitting
   Enter, the mask is activated instead and opens the new page without
   unnecessary redirecting.
 */
function maskLink( $link ){
   var $mask = document.createElement("span");
   $mask.className = "watilin-mask";
   $mask.tabIndex = 0; // makes the mask able to receive focus
   $link.tabIndex = -1; // removes the link from the focus chain
   $mask.addEventListener("click", function( e ){
      e.preventDefault();
      e.stopPropagation();
      open($link.href, "_blank");
   }, false);
   $mask.addEventListener("keydown", function( e ){
      if (13 == e.which) {
         e.preventDefault();
         e.stopPropagation();
         open($link.href, "_blank");
      }
   }, false);
   $link.parentNode.style.position = "relative";
   $link.parentNode.insertBefore($mask, $link);
   $mask.style.width = $link.offsetWidth + "px";
   $mask.style.height = $link.offsetHeight + "px";
   
   $mask.setAttribute("data-href", $link.href);
   return $mask;
}

function shadowLinks( ){
   document.addEventListener("mouseover", function( e ){
      var $target = e.target;
      if ("A" == $target.tagName &&
            "_blank" == $target.getAttribute("target")) {
         maskLink($target);
      }
   }, false);
   document.addEventListener("focus", function( e ){
      var $target = e.target;
      C.log($target, e.relatedTarget);
      if ("A" == $target.tagName &&
            "_blank" == $target.getAttribute("target")) {
         maskLink($target).focus();
      }
   }, true); // Here I’m using the capture phase, as the “focus” event
             // doesn’t bubble.
}

function onGmailLoad( ){
   GM_addStyle(
      "span.watilin-mask {\
         position: absolute;\
         cursor: pointer;\
      }"
   );
   shadowLinks();
}

function poll( $loading, callback ){
   if ("none" == $loading.style.display) {
      C.log("callback done!");
      callback();
   } else {
      C.log("deferring callback…");
      setTimeout(function( ){
         poll($loading, callback);
      }, 700);
   }
}

function handleDocumentLoad( ){
   var $loading = document.getElementById("loading");
   if ($loading) {
      C.log("element #loading found, registering polling callback");
      poll($loading, onGmailLoad);
   } else {
      C.log("element #loading not found, what to do now?");
      // ?
   }
}

if (window === top) {
   if ("complete" == document.readyState) {
      handleDocumentLoad();
   } else {
      document.addEventListener("DOMContentLoaded", handleDocumentLoad,
         false);
   }
}