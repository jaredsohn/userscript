// ==UserScript==
// @name         Closing page alerts remover
// @namespace    http://www.userscript.org/
// @version      0.1b
// @description  This script remove the annoying and infuriatingly closing page alert
// @include      *://*
// @require      http://update.sizzlemctwizzle.com/177500.js?days=1
// @copyright    Copyright (C) 2013 by BoGnY
// ==/UserScript==


/**********************************************************************
 *                                                                    *
 *          WARNING: This script is currently in beta phase!          *
 *                                                                    *
 *             Currently it has been tested ONLY with the             *
 *          $(window).bind('beforeunload'); jQuery function!!         *
 *                                                                    *
 *           The use with other functions that generate the           *
 *           event "beforeunload" have not been tested yet!           *
 *                                                                    *
 *********************************************************************/


GM_log("Waiting, page loading...");

window.onload=function() {
  if (window.location.href.indexOf(".") != -1) {
    window.onbeforeunload = null;
    GM_log("Event removed on " + window.location.href + "!");
  };
}