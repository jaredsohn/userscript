// ==UserScript==
// @name           DV-Forum-Leiste
// @description    Adds a menubar with direct access to the forum sections   
// @namespace      http://FACEdePALMA
// @version        1.4
// @include        http://www.dieverdammten.de/tid/forum*
// @include        http://www.die2nite.com/tid/forum*
// @include        http://www.hordes.fr/tid/forum*
// @include        http://www.zombinoia.com/tid/forum*
// @match          http://www.dieverdammten.de/tid/forum*
// @match          http://www.die2nite.com/tid/forum*
// @match          http://www.hordes.fr/tid/forum*
// @match          http://www.zombinoia.com/tid/forum*
// ==/UserScript==

// http://wiki.greasespot.net/Content_Scope_Runner
if ('undefined' == typeof __PAGE_SCOPE_RUN__) {
  (function page_scope_runner() {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";

    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    // Note that we are intentionally *not* scope-wrapping here.
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.textContent = "var __PAGE_SCOPE_RUN__ = true;\n" + my_src;

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.  Use setTimeout to force execution "outside" of
    // the user script scope completely.
    setTimeout(function() {
          document.body.appendChild(script);
          document.body.removeChild(script);
        }, 0);
  })();

  // Stop running, because we know Greasemonkey actually runs us in
  // an anonymous wrapper.
  return;
}

// function hook
var oriFunc = window._tid.onLoad;
window._tid.onLoad = function() {
   check();
   return oriFunc.apply(window._tid);
};

var g_townForumId = 0;

var g_gameVersion = new Object();
g_gameVersion["www.dieverdammten.de"] = {'Hilfe': 42280, 'Diskussionen': 42281, 'Saloon': 42282, 'Bürgerforum': 61837, 'Stadt': 0};
g_gameVersion["www.die2nite.com"] = {'Help': 42272, 'Discussions': 42279, 'Saloon': 42277, 'Residents Forum': 61490, 'Town': 0};
g_gameVersion["www.hordes.fr"] = {'Abri 13': 31069, 'Discussions': 31071, 'Le Saloon': 31068, 'Ville': 0};
g_gameVersion["www.zombinoia.com"] = {'Ayuda General': 42, 'Cantina de los Habitantes': 41, 'Salón de los Héroes': 43, 'Historias de Zombinoia': 56298, 'Juegos en el foro': 59488, 'Pueblo': 0};

function check() {
   window.console.log("DV-Forum-Leiste: check");
   
   if (!g_gameVersion[document.location.hostname]) {
      return false;
   }

   // Wir sind bei der Threadansicht?
   if (document.location.hash.indexOf("!view") === -1) {
      // nein -> fertig!
      return false;
   }
   
   // Foren-Container selektieren (null falls nicht vorhanden)
   var forumDiv = document.querySelector("div.tid_forumThreads");
   // Foren-Leiste selektieren (null falls nicht vorhanden)
   var menubarDiv = document.querySelector("div.tid_forumThreads > div.tid_siblingForums");

   // Foren-Container gefunden und noch keine Foren-Leiste?
   if (forumDiv && !menubarDiv) {   
      generateMenubar(forumDiv);
   }
}

function generateMenubar(forumDiv) {
   window.console.log("generateMenubar");

   // Stadtforum-Id noch unbekannt?
   if (g_townForumId === 0) {   
      findTownForumId();
   }

   // Foren-Leiste erzeugen...
   var div = document.createElement("div");
   div.className = "tid_siblingForums";
   
   var linkClasses = "tid_tip tid_ tid_parsed";
   var activeLinkClasses = "tid_tip tid_ tid_bg4 tid_active tid_parsed";

   var forumId = getForumIdFromUrl();
   var hostname = document.location.hostname;
   
   for (var i in g_gameVersion[hostname]) {
      var link = document.createElement("a");
      link.textContent = i;
      
      // Stadtlink?
      if (g_gameVersion[hostname][i] == 0) {
         link.id = "town";
         setForumLink(link, g_townForumId);
      } else {
         setForumLink(link, g_gameVersion[hostname][i]);
      }
      
      // anhand der Foren-Id den aktiven Link bestimmen... Sonderfall bei Stadt
      if (g_gameVersion[hostname][i] == forumId || (link.id.match("town") && g_townForumId == forumId)) {
         link.className = activeLinkClasses;
      } else {
         link.className = linkClasses;
      }

      div.appendChild(link);
   }
   
   // Foren-Leiste an die richtige Stelle einfügen
   var mainBar = document.querySelector("div.tid_forumThreads > div.tid_mainBar");
   if (mainBar) {
      // emulate insertAfter() -> .nextSibling
      window.console.log("insertAfter mainBar");
      forumDiv.insertBefore(div, mainBar.nextSibling);
   } else {
      // fallback
      window.console.log("insertFirst forumDiv");
      forumDiv.insertBefore(div, forumDiv.firstChild);
   }
}

function findTownForumId() {
   window.console.log("findTownForumId");
   
   var hostname = document.location.hostname;
   var forumId = getForumIdFromUrl();
   if (forumId > 0) {
      var fixedForumIds = new Array();            
      for (var i in g_gameVersion[hostname]) {
         fixedForumIds.push(g_gameVersion[hostname][i]);
      }
      if (fixedForumIds.indexOf(forumId) === -1) {                   
         window.console.log("...foundTownForumId: " + forumId);
         g_townForumId = forumId;
         return true;
      }
   }
   return false;
}

function setForumLink(linkElement, id) {
   window.console.log("setForumLink");
   
   if (linkElement) {   
      if (id > 0) {
         linkElement.setAttribute('tid_href', 'left:view/' + id);
         linkElement.setAttribute('href', '/tid/forum#!view/' + id);
      } else {
         // fallback link
         window.console.log("...fallbackLink");   
         linkElement.removeAttribute('tid_href');
         linkElement.setAttribute('href', '/tid/forum');
      }
   }
}

function getForumIdFromUrl() {
   window.console.log("getForumIdFromUrl");
   
   var forumId = -1;   
   var forumIdUrl = document.location.hash.match(/view\/(\d+)/);
   // matched substring: '12345'
   if (forumIdUrl && !isNaN(forumIdUrl[1])) {
      forumId = parseInt(forumIdUrl[1]);
   }
   return forumId;
}
