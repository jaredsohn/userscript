// ==UserScript==
// @name        usoCheckup - Automatic Script Updater
// @copyright   Copyright (C) 2009+, tHE gREASEmONKEYS (http://userscripts.org)
// @license     http://usocheckup.googlecode.com/svn/trunk/license.txt
// @version     1.0.192
// @changelog   http://code.google.com/p/usocheckup/source/list
// @metadata    http://usocheckup.googlecode.com/svn/trunk/src/metadata.php
// ==/UserScript==

(function() {
  var usoCheckup = {
    lastRequest: 0,
    get backoff() { return parseInt(GM_getValue("usoCheckup:backoff", 0)); },
    set backoff(value) { Math.floor((GM_setValue("usoCheckup:backoff", value))); },
    get age() { return parseInt(GM_getValue("usoCheckup:age", 1)); },
    set age(value) { GM_setValue("usoCheckup:age", Math.floor(value)); },
    get newVersion() { return parseInt(GM_getValue("usoCheckup:newVersion", 0)); },
    set newVersion(value) { GM_setValue("usoCheckup:newVersion", parseInt(value)); },
    get calculate() { return function(max, min) {
      var hours = Math.round(Math.exp(this.backoff) * (1 / (Math.exp(4) / 24))) * min;
      max *= 24;
     if (706 < hours)
       hours = Math.round(hours / 730) * 730;
     else if (150 < hours)
        hours = Math.round(hours / 168) * 168;
      else if (20 < hours)
        hours = Math.round(hours / 24) * 24;
      if (hours >= max)
        return max;
      return hours;
    }},
    get check() { return function() {
      if (this.enabled && (Math.floor((new Date().getTime())/1000) - this.age >= interval)) {
        if (window.location.hostname.match(/userscripts\.org/i)
            && (window.location.pathname.match(/\/scripts\/.+\/29910$/i)
                || window.location.pathname.match(/\/scripts\/version\/29910\/.*$/i)
                    || window.location.pathname.match(/\/scripts\/diff\/29910\/.*$/i)
                        || window.document.evaluate("//h1[@class='title']/a[contains(@href, '/scripts/show/29910')]",
                            window.document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue))
          return;
        this.request();
      }
    }},
    get enabled() { return GM_getValue("usoCheckup:enabled", true); },
    set enabled(value) { GM_setValue("usoCheckup:enabled", value ? true : false); },
    get maxage() { return Math.ceil(Math.abs(GM_getValue("usoCheckup:maxage", 3))); },
    set maxage(value) {
      if (typeof value != "number" || value < 1)
        value = 3;
      GM_setValue("usoCheckup:maxage", Math.ceil(value));
    },
    get minage() { return Math.ceil(Math.abs(GM_getValue("usoCheckup:minage", 1))); },
    set minage(value) {
      if (typeof value != "number" || value < 1 || Math.ceil(value) > (this.maxage * 24))
        value = 1;
      GM_setValue("usoCheckup:minage", Math.ceil(value));
    },
    get updateUrl() { return {
      "default": "show",
      "install": "http://userscripts.org/scripts/source/29910.user.js",
      "show": "http://userscripts.org/scripts/show/29910/",
      "topic": ""
    }},
    get openUrl() { return function(url) { GM_openInTab(url); }},
    string: {
      "lang": "en",
      "updateAvailable": "An update is available.",
      "updateUnavailable": "No update available.",
      "updateMismatched": "WARNING: Metadata does not match!",
      "updateUnlisted": "WARNING: Script is not listed!",
      "queryWidget": "Check for an update.",
      "toggleWidget": "Toggle automatic update.",
      "updaterOff": "Automatic update is disabled.",
      "updaterOn": "Automatic update is enabled.",
      "showConfirm": "Show the script homepage?",
      "installConfirm": "Install the script?",
      "topicConfirm": "View the script topic?",
      "closeMessage": "Close this message?",
      "closeAllMessages": "Close all messages?"
    },
    get updaterMeta() { return {"name":"usoCheckup - Automatic Script Updater","id":"usoCheckup","copyright":"Copyright (C) 2009+, tHE gREASEmONKEYS (http:\/\/userscripts.org)","version":"192","license":"http:\/\/usocheckup.googlecode.com\/svn\/trunk\/license.txt","metadata":"http:\/\/usocheckup.googlecode.com\/svn\/trunk\/src\/metadata.php","changelog":"http:\/\/code.google.com\/p\/usocheckup\/source\/list","contributor":["Jesse Andrews (http:\/\/userscripts.org\/users\/2)","Johan Sundstr\u00f6m (http:\/\/userscripts.org\/users\/326)","n5zhkyln (http:\/\/userscripts.org\/users\/16486)","Photodeus (http:\/\/userscripts.org\/users\/16828)","JoeSimmons (http:\/\/userscripts.org\/users\/23652)","sizzlemctwizzle (http:\/\/userscripts.org\/users\/27715)","Marti Martz (http:\/\/userscripts.org\/users\/37004)","lucideer (http:\/\/userscripts.org\/users\/56750)","Buzzy (http:\/\/userscripts.org\/users\/57340)","Tim Smart (http:\/\/userscripts.org\/users\/63868)","IzzySoft (http:\/\/userscripts.org\/users\/89585)","Basique (http:\/\/userscripts.org\/users\/104342)"]}; },
    get localMeta() { return {"name":"Facebook URL Cleaner","version":"8","date":"2010-10-07","description":"Cleans Facebook URLs that don't actually take you to a new page.","namespace":"http:\/\/www.theworldofstuff.com\/greasemonkey\/","copyright":"Copyright 2008-2010 Jordon Kalilich (http:\/\/www.theworldofstuff.com\/)","license":"GNU GPL version 3 or later; http:\/\/www.gnu.org\/copyleft\/gpl.html","require":"http:\/\/usocheckup.dune.net\/29910.js?maxage=3","include":"http*:\/\/*.facebook.com\/*","uso":{"script":"29910","version":"258441","timestamp":"Thu, 07 Oct 2010 13:32:57 +0000","installs":"1174491","reviews":"11","rating":"4.64","discussions":"48","fans":"154","hash":"b8a9dfcece6a616ef191346ae21c030ef803e214"}}; },
    get parseMeta() { return function(metadataBlock) {
      metadataBlock = metadataBlock.toString();
      var headers = {};
      var line, name, prefix, header, key, value;
        var lines = metadataBlock.split(/[\r\n]+/).filter(/\/\/ @/);
        for each (line in lines) {
          if (typeof line != "string") continue;
          [, name, value] = line.match(/\/\/ @(\S*)\s*(.*)/);
          switch (name) {
            case "licence":
              name = "license";
              break;
          }
          [key, prefix] = name.split(/:/).reverse();
          if (prefix) {
            if (!headers[prefix])
              headers[prefix] = new Object;
            header = headers[prefix];
          }
          else
            header = headers;
          if (header[key]) {
            if (!(header[key] instanceof Array))
              header[key] = new Array(header[key]);
            header[key].push(value);
          }
          else
            header[key] = value;
        }
        if (headers["license"])
          headers["licence"] = headers["license"];
      return headers;
    }},
    get request() { return function(force) {
      var currentRequest;
      this.age = currentRequest = Math.floor((new Date().getTime())/1000 );

      if (currentRequest - this.lastRequest > 15 * 60) {
        GM_xmlhttpRequest({
          method: "GET",
          url: "https://userscripts.org/scripts/source/29910.meta.js",
          onload: function(xhr) {
            if (xhr.status == 200) {
              var details = {};
              details.remoteMeta = usoCheckup.parseMeta(xhr.responseText);
            
              if (typeof details.remoteMeta["uso"] != "undefined") {
                if (parseInt(details.remoteMeta["uso"]["version"]) > parseInt(usoCheckup.localMeta["uso"]["version"])
                    && parseInt(usoCheckup.localMeta["uso"]["version"]) >= usoCheckup.newVersion) {
                  usoCheckup.backoff = 1;
                  usoCheckup.newVersion = details.remoteMeta["uso"]["version"];
                }
                else if (!force)
                  usoCheckup.backoff += 1;

                if (details.remoteMeta["name"] != usoCheckup.localMeta["name"]
                    || details.remoteMeta["namespace"] != usoCheckup.localMeta["namespace"]) {
                  usoCheckup.enabled = false;
                  details.mismatched = true;
                }
                details.unlisted = (typeof details.remoteMeta["uso"]["unlisted"] != "undefined") ? true: false;
                details.forced = (force) ? true: false;
                usoCheckup.widget["alert"](details);
              }
              else {
                usoCheckup.backoff += 1;
                GM_log(['',
                    'WARNING: 502 Bad gateway',
                    'Invalid meta.js',
                  ].join("\n"));
              }
            }
            else
              usoCheckup.enabled = false;
          }
        });
        this.lastRequest = Math.ceil((new Date().getTime())/1000);
      }
    }},
    widget: {
      "alert": function (details) {
        if (parseInt(details.remoteMeta["uso"]["version"]) > parseInt(usoCheckup.localMeta["uso"]["version"])) {
          if (confirm([
            usoCheckup.localMeta["name"],
            "",
            usoCheckup.string["updateAvailable"],
            ((usoCheckup.updateUrl["default"] == "install") && !details.mismatched && !details.unlisted)
              ? usoCheckup.string["installConfirm"]
              : usoCheckup.string["showConfirm"]
          ].join("\n"))) {
            if (details.mismatched || details.unlisted)
              usoCheckup.openUrl(usoCheckup.updateUrl["show"]);
            else
              usoCheckup.openUrl(usoCheckup.updateUrl[usoCheckup.updateUrl["default"]]);
            }
        }
        else if (details.forced)
          alert([
            usoCheckup.localMeta["name"],
            "",
            usoCheckup.string["updateUnavailable"]
          ].join("\n"));
      }
    }
  };


  var interval = usoCheckup.calculate(usoCheckup.maxage, usoCheckup.minage) * 60 * 60;

  var frameless = false;
  try {
    frameless = (window == window.top);
  }
  catch (e) {}

  if (frameless)
    if (typeof GM_openInTab == "function")
      usoCheckup.check();

})();
