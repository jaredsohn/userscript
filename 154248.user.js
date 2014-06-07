// ==UserScript==
// @name           BerrkeSY Personal AD-Site Hack SCRIPT
// @namespace      http://www.berrke.com
// @description    Cracks AD.FLY, LNX.lx, LINKBUXKS and more
// @version        0.0.1
// @author         BerrkeSY
// @license        2012 BerrkeSY
// @grant          none
// @updateURL      http://update.berrke.com/script/
// @include        http://ad.fly/*
// @include        http://*.linkbucks.com
// @include        https://www.youtube.com/watch?*
// @include        http://*.c.youtube.com/videoplayback?*
// ==/UserScript==

(function() {
 "use strict";

 function inject(str)
 {
  var elem = document.createElement("script");

  elem.setAttribute("type", "application/javascript");
  elem.textContent = "(function() {\"use strict\"; (" + str + ")();})();";

  document.body.appendChild(elem);
 }

 if (document.location.href == "https://userscripts.org/scripts/source/62634.meta.js")
 {
  inject(function() {
   window.parent.postMessage(document.documentElement.textContent, "*");
  });

  return;
 }

 function formatSize(bytes)
 {
  if (bytes < 1048576)
   return (bytes / 1024).toFixed(1) + " KiB";
  else
   return (bytes / 1048576).toFixed(1) + " MiB";
 }

 document.addEventListener("ytd-update-link", function(event) {
  if (window.chrome)
  {
   var xhr = new XMLHttpRequest();
   var data = JSON.parse(event.data);
   var set = false;

   xhr.open("HEAD", data.href, true);
   xhr.onreadystatechange = function(e) {
    if (xhr.readyState >= 2)
    {
     if (!set)
     {
      set = true;

      var length = xhr.getResponseHeader("Content-length");
      var target = document.getElementById(data.target);
      target.setAttribute("title", target.getAttribute("title") + ", " + formatSize(Number(length)));
     }

     xhr.abort();
    }
   };
   xhr.send(null);
  }
 }, false);

 function script()
 {
 alert("done");
 {
 function notifyUpdate()
 {
  self.menu.appendChild(createUpdate());
 }
 return self;
})();
// Update - Check Userscripts.org for updates
var Update = (function() {
 self = {
  check: check,
 };
 // check() - Query Userscripts.org for changes to the script's version
 // number. If there is, inform the Interface module.
 function check()
 {
  delete localStorage["ytd-update-version"];
  delete localStorage["ytd-last-update"];
  window.addEventListener("message", function(event) {
   var remoteVersion = /^\/\/ @version\s+(.+)$/m.exec(event.data)[1];
   if (remoteVersion)
   {
    localStorage["ytd-last-update"] = Date.now();
    localStorage["ytd-update-version"] = remoteVersion;
    if (remoteVersion != version)
     Interface.notifyUpdate();
   }
  }, false);
  var iframe = document.createElement("iframe");
  iframe.setAttribute("src", "https://userscripts.org/scripts/source/62634.meta.js");
  iframe.setAttribute("style", "position: absolute; left: -1px; top: -1px; width: 1px; height: 1px; opacity: 0;");
  document.body.appendChild(iframe);
 }
 return self;
})();
function main()
{
 if (localStorage.getItem("ytd-check-updates") === null)
  localStorage["ytd-check-updates"] = true;
 if (localStorage.getItem("ytd-prefer-webm") === null)
  localStorage["ytd-prefer-webm"] = false;
 if (localStorage.getItem("ytd-restrict") === null)
  localStorage["ytd-restrict"] = true;
 if (localStorage.getItem("ytd-get-sizes") === null)
  localStorage["ytd-get-sizes"] = false;
 if (localStorage.getItem("ytd-title-format") === null)
  localStorage["ytd-title-format"] = "${title}";
 VideoInfo.init();
 Interface.init();
 Interface.update(StreamMap.getStreams());
 if ((String(localStorage["ytd-check-updates"]) == "true"))
  if (localStorage["ytd-current-version"] != version ||
   !localStorage["ytd-last-update"] ||
   Number(localStorage["ytd-last-update"]) < Date.now() - 2 * 24 * 60 * 60 * 1000)
   Update.check();
  else if (localStorage["ytd-update-version"] && localStorage["ytd-update-version"] != version)
   Interface.notifyUpdate();
 localStorage["ytd-current-version"] = version;
}
  main();
 }
 inject(script);
})();