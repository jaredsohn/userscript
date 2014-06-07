// ==UserScript==
// @name          Ogame
// @namespace     fr.kergoz-panic.watilin
// @version       1.3
// @description   UI enhancing script focused on user efficiency and minimum HTTP traffic.
//
// @match         http://*.ogame.gameforge.com/game/index.php?*
// @exclude       *?*page=empire*
//
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_getResourceText
// @grant         GM_getResourceURL
//
// @resource      style       http://kergoz-panic.fr/watilin/userscripts/ogame/ogame.css?v=1.3
// @resource      sprite      http://kergoz-panic.fr/watilin/userscripts/ogame/sprite.png?v=1.3
// @resource      guide       http://kergoz-panic.fr/watilin/userscripts/ogame/guide.html?v=1.3
//
// @homepage      http://kergoz-panic.fr/watilin/userscripts/ogame/
// @icon          http://kergoz-panic.fr/watilin/userscripts/ogame/icon.png
// @downloadURL   https://userscripts.org/scripts/source/181549.user.js
// @updateURL     https://userscripts.org/scripts/source/181549.meta.js
//
// @author        Watilin
// @copyright     2013+, Watilin
// @license       Creative Commons 3.0 BY-NC-SA
// ==/UserScript==

"use strict";

/* Sections: (use Ctrl+F)
   Informations            [INF]
   Style                   [STY]
   Browser Patches         [BRO]
   Utilities               [UTI]
   Planets Summary         [PLA]
   Side Menu               [SID]
   Clock improvements      [CLO]
   Keyboard Navigation     [KEY]
   Multifocus              [MUL]
   Guide                   [GUI]
   Preferences Managment   [PRE]
   Miscellaneous           [MIS]
*/

// [@INF] Informations /////////////////////////////////////////////////

/*
  ================== Compatibility warning ==========================

   This script is currently being developed or tested with:
      * Firefox 25 with Greasemonkey 1.12
   Its functioning is not guaranteed with other software.

   Currently DOES NOT work entirely with Chrome, but I'm working on.


   Features I SHOULD NOT use: (note for myself)
      * `let` (Mozilla specific)
      * Harmony arrow functions (too recent)
      * `const` (“not on standards track” as they say)
      * lambda functions (doesn't work on standardly configured Chrome,
         and there's no polyfill for that)

  ===================== Version notes ===============================

   * 1.3: november, 26th. 2013
      - Removed animation on the darkmatter picture
      - Replaced lambda functions with classic ones (compatibility)
      - Improved recycling links, they now work on distant systems too
      - Replaced DOM detection intervals with MutationObservers
      - Removed planet numbers, they'll be put back when keyboard
         navigation is ready
   * 1.2: november, 4th 2013
      - Removed Mozilla-specific syntax
      - Refactored code
      - Added strict mode
   * 1.1: november, 3rd 2013
      - Fixed side menu misplaced icons

  ====================== TODO list ==================================

   * Refresh resources of each planet upon login
   * Real-time sort of the planet list with different choices
   * Create an interface to manage user preferences
   * Add configurable hotkeys to user preferences (TODO-b)
   * Implement keyboard navigation (TODO-d)

  ================ Ideas for future versions ========================

   * Commander related features:
      - messages sorted by sections even without the commander
      - spy reports accessible from the galaxy view even without the CO
      - with the CO, don't make buildings appear buildable while
         ressources aren't sufficient
   * Network traffic saving:
      - one-click attack on galaxy view (don't need to go through the 3
         fleet pages)
      - target saving to use in the fleet page (don't need to start from
         the galaxy view, neither spend deuterium navigating through
         systems when you already know where your target is)
      - multifocus: related to keyboard navigation, avoid unnecessary
         steps (thus page loads) when navigating from page A, planet A
         to page B, planet B
*/

// [@STY] Style ////////////////////////////////////////////////////////

(function( ){
   // I don't use GM_addStyle so the styles are accessible from the page
   // and easily editable
   var $link = document.createElement("link");
   $link.rel = "stylesheet";
   $link.href = GM_getResourceURL("style");
   document.head.appendChild($link);

   // adding the sprite resource's path
   var dynamicStyle = "span.menu_icon div.watilin-menuImage {\
      background-image: url('" + GM_getResourceURL("sprite") + "');\
   }";

   // adding the page's background-image. Since it's delivered via CDN,
   // its path may change. Retrieving it from the body guarantees it's
   // already cached.
   dynamicStyle += "#watilin-guide {\
      background-image: " +
         getComputedStyle(document.body).backgroundImage + ";\
   }";

   var $style = document.createElement("style");
   $style.textContent = dynamicStyle
      .replace(/\s+/g, " ")
      .replace(/[{};]/g, "$&\n");
   document.head.appendChild($style);
}());

// [@BRO] Browser Patches //////////////////////////////////////////////

// Array generic methods (assuming all these methods exist on instances)
["forEach", "map", "reduce", "reduceRight", "every", "some", "filter"]
   .forEach(function( method ){
      if (!Array[method]) {
         Array[method] = function( context ){
            var args = Array.prototype.slice.call(arguments, 1);
            return Array.prototype[method].apply(context, args);
         };
      }
   });

// a handful shortcut for substring checking
if (!String.prototype.contains) {
   String.prototype.contains = function( sub, index ){
      return this.indexOf(sub, index) >= 0;
   };
}

// [@UTI] Utilities ////////////////////////////////////////////////////

/** adds leading zeros if the number is too small */
Number.prototype.pad = function pad( digits ){
   var s = this.toString(10);
   var diff = digits - s.length;
   for (var i = 0; i < diff; i++) s = "0" + s;
   return s;
};

/** reverses the string (e.g. "abc" becomes "cba") */
String.prototype.reverse = function( ){
   return Array.reduce(this, function( acc, c ){ return c + acc; });
};

/** displays point-separated thousands and truncates the decimal part */
Number.prototype.dot1000 = function dot1000( ){
   return Math.round(this).toString(10).reverse()
      .replace(/\d{3}(?=\d)/g, "$&.").reverse();
};

/** gives the elapsed time between the given date and now,
   omitting too small units */
Date.prototype.elapsed = function elapsed( ){
   var durations = {
           "an": 31536000000,
         "mois": 2592000000,
      "semaine": 604800000,
         "jour": 86400000,
        "heure": 3600000,
       "minute": 60000,
      "seconde": 1000
   };
   var diff = Math.abs(Date.now() - this.getTime());
   for (var name in durations) {
      var duration = durations[name];
      if (diff >= duration) {
         var unit = Math.floor(diff / duration);
         return unit + " " + name +
            (unit > 1 && !/s$/.test(name) ? "s" : "");
      }
   }
   return "moins d’une seconde";
}

var jQuery = unsafeWindow.jQuery;
var page = location.search.match(/page=(\w+)/)[1];
function $( selector ){ return document.querySelector(selector); }
function $$( selector ){ return document.querySelectorAll(selector); }

// [@PLA] Planets Summary //////////////////////////////////////////////

(function( ){
   var tooltipsCache = {};

   var $template = (function( ){
      var $template = document.createElement("section");
      $template.className = "watilin-tooltip";

      var $planetName = document.createElement("h2");
      $planetName.className = "watilin-planet-name";
      $template.appendChild($planetName);

      var $list = document.createElement("dl");
      $template.appendChild($list);

      var $p = document.createElement("p");
      $template.appendChild($p);
      $p.appendChild(document.createTextNode("Mis à jour il y a "));
      $p.appendChild(document.createElement("time"));

      var $mTitle = document.createElement("dt");
      var $mData = document.createElement("dd");
      var $mAvailable = document.createElement("span");
      var $mMax = document.createElement("span");
      var $mProduction = document.createElement("span");
      $list.appendChild($mTitle);
      $list.appendChild($mData);
      $mTitle.appendChild(document.createTextNode("Métal"));
      $mAvailable.className = "watilin-metal-actual";
      $mData.appendChild($mAvailable);
      $mData.appendChild(document.createTextNode(" / "));
      $mMax.className = "watilin-metal-max";
      $mData.appendChild($mMax);
      $mData.appendChild(document.createTextNode(" ("));
      $mProduction.className = "watilin-metal-production";
      $mData.appendChild($mProduction);
      $mData.appendChild(document.createTextNode(")"));

      var $cTitle = document.createElement("dt");
      var $cData = document.createElement("dd");
      var $cAvailable = document.createElement("span");
      var $cMax = document.createElement("span");
      var $cProduction = document.createElement("span");
      $list.appendChild($cTitle);
      $list.appendChild($cData);
      $cTitle.appendChild(document.createTextNode("Cristal"));
      $cAvailable.className = "watilin-crystal-actual";
      $cData.appendChild($cAvailable);
      $cData.appendChild(document.createTextNode(" / "));
      $cMax.className = "watilin-crystal-max";
      $cData.appendChild($cMax);
      $cData.appendChild(document.createTextNode(" ("));
      $cProduction.className = "watilin-crystal-production";
      $cData.appendChild($cProduction);
      $cData.appendChild(document.createTextNode(")"));

      var $dTitle = document.createElement("dt");
      var $dData = document.createElement("dd");
      var $dAvailable = document.createElement("span");
      var $dMax = document.createElement("span");
      var $dProduction = document.createElement("span");
      $list.appendChild($dTitle);
      $list.appendChild($dData);
      $dTitle.appendChild(document.createTextNode("Deutérium"));
      $dAvailable.className = "watilin-deuterium-actual";
      $dData.appendChild($dAvailable);
      $dData.appendChild(document.createTextNode(" / "));
      $dMax.className = "watilin-deuterium-max";
      $dData.appendChild($dMax);
      $dData.appendChild(document.createTextNode(" ("));
      $dProduction.className = "watilin-deuterium-production";
      $dData.appendChild($dProduction);
      $dData.appendChild(document.createTextNode(")"));

      return $template;
   }());

   function getPlanetTooltip( planetId, planetName ){
      if (planetId in tooltipsCache)
         return tooltipsCache[planetId];

      var $tooltip;

      var infos = JSON.parse(GM_getValue("planetsData", "{}"));
      if (!(planetId in infos)) {
         $tooltip = document.createElement("section");
         $tooltip.className = "watilin-tooltip";
         var $p = document.createElement("p");
         $p.appendChild(document.createTextNode(
            "(données manquantes)"));
         $tooltip.appendChild($p);
      } else {
         var planetData = infos[planetId];
         $tooltip = $template.cloneNode(true);
         $tooltip.querySelector("h2.watilin-planet-name").textContent =
            planetName;

         var updaters = {};

         ["metal", "crystal", "deuterium"].forEach(function( resource ){
            const resourceData = planetData[resource];
            const actual = resourceData.actual;
            const max = resourceData.max;
            const prod = resourceData.production;
            const prodPerMilli = prod / 1000;

            var $actual = $tooltip.querySelector(
               "span.watilin-" + resource + "-actual");
            var $prod = $tooltip.querySelector(
               "span.watilin-" + resource + "-production");
            $prod.textContent = "+" + (prod * 3600).dot1000();
            $prod.classList.add("undermark");

            $tooltip.querySelector("span.watilin-" + resource + "-max")
               .textContent = max.dot1000();

            var current;
            if (actual < max) {
               current = Math.min(max, actual + prodPerMilli *
                  (Date.now() - parseInt(planetData.lastUpdated)));
            } else {
               current = actual;
               $actual.classList.add("overmark");
            }
            $actual.textContent = current.dot1000();

            updaters[resource] = function( ){
               if (current < max) {
                  current = Math.min(max, actual + prodPerMilli *
                     (Date.now() -
                        parseInt(planetData.lastUpdated)));
                  $actual.textContent = current.dot1000();
               } else {
                  $actual.classList.add("overmark");
               }
            };
         });

         var $time = $tooltip.querySelector("time");
         $time.textContent = new Date(planetData.lastUpdated).elapsed();
         setInterval(function( ){
            updaters.metal();
            updaters.crystal();
            updaters.deuterium();
            $time.textContent = new Date(planetData.lastUpdated)
               .elapsed();
         }, 1000);

      }

      document.body.appendChild($tooltip);
      tooltipsCache[planetId] = $tooltip;
      return $tooltip;
   };

   Array.forEach($$("#planetList a.planetlink"), function( $ ){
      var planetId = $.href.match(/cp=(\d+)/)[1];
      var planetName = $.querySelector("span.planet-name")
            .textContent;
      $.addEventListener("mouseenter", function( event ){
         var $tooltip = getPlanetTooltip(planetId, planetName);
         var style = $tooltip.style;
         style.display = "block";
         style.left = event.pageX - 40 + "px";
         style.top = event.pageY + 15 + "px";
      });
      $.addEventListener("mouseleave", function( ){
         tooltipsCache[planetId].style.display = "none";
      });
   });

}());

// updates stored data with page info
(function( ){
   var names = ["metal", "crystal", "deuterium"];
   var planetId = $("meta[name='ogame-planet-id']").content;
   var infos = JSON.parse(GM_getValue("planetsData", "{}"));
   if (!(planetId in infos)) {
      infos[planetId] = { metal: {}, crystal: {}, deuterium: {} };
   }
   var actualResources = JSON.parse(unsafeWindow.initAjaxResourcebox
      .toString().match(/reloadResources\(((?:.|\s)*)\)/)[1]);

   names.forEach(function( name ){
      var to = infos[planetId][name];
      var from = actualResources[name].resources;
      ["actual", "max", "production"].forEach(function( prop ){
         to[prop] = from[prop];
      });
   });
   infos[planetId].lastUpdated = Date.now();

   GM_setValue("planetsData", JSON.stringify(infos));
}());

// [@SID] Side Menu ////////////////////////////////////////////////////

// determines whether the object of the day has been purchased
(function( ){
   var highlightImportExport = false;

   var now = new Date();
   var todayString = now.getFullYear() + "-" +
         (now.getMonth() + 1).pad(2) + "-" + now.getDate().pad(2);
   var last = GM_getValue("lastImportExport", "0000-00-00");
   if (last < todayString) highlightImportExport = true;
   else GM_setValue("lastImportExport", todayString);

   if ("traderOverview" === page) {
      var observer = new MutationObserver(function( mutations ){
         if (!location.hash.contains("page=traderImportExport")) return;
         mutations.forEach(function( mutation ){
            Array.forEach(mutation.addedNodes, function( $node ){
               if (Node.ELEMENT_NODE !== $node.nodeType) return;
               if ("div_traderImportExport" !== $node.id) return;
               if ($node.querySelector("p.got_item_text")) {
                  highlightImportExport = false;
                  GM_setValue("lastImportExport", todayString);
               }
            });
         });
      });
      observer.observe(document.querySelector("#inhalt"),
         { childList: true });
   }

   // replaces the merchant link
   var $a = $("a.trader");
   $a.href =
"/game/index.php?page=traderOverview#animation=true&page=\
traderImportExport";
   $a.title = "Import / export";

   var $div = $a.querySelector("div.menuImage");
   $div.classList.add("watilin-menuImage");
   $div.classList.remove("traderOverview");
   $div.classList.add("watilin-importexport");
   if (highlightImportExport) $div.classList.add("active");
}());

// adds a direct link to messages
(function( ){
   var $li = document.createElement("li");

   var $spanMenuIcon = document.createElement("span");
   $spanMenuIcon.className = "menu_icon";

   var $div = document.createElement("div");
   $div.classList.add("menuImage");
   $div.classList.add("watilin-menuImage");
   $div.classList.add("watilin-messages");

   var $a = document.createElement("a");
   $a.classList.add("watilin-messages");
   $a.target = "_self";
   $a.href = "/game/index.php?page=messages";
   $a.classList.add("menubutton");

   if ("messages" === page) {
      $div.classList.add("highlighted");
      $a.classList.add("selected");
   }

   var $spanTextLabel = document.createElement("span");
   $spanTextLabel.className = "textlabel";

   $spanMenuIcon.appendChild($div);
   $spanTextLabel.appendChild(document.createTextNode("Messages"));
   $a.appendChild($spanTextLabel);
   $li.appendChild($spanMenuIcon);
   $li.appendChild($a);

   document.getElementById("menuTable").appendChild($li);
}());

// [@CLO] Clock improvements ///////////////////////////////////////////

(function( ){
   var $clock = document.querySelector("li.OGameClock");
   $clock.title = "Options de l’horloge…";

   var $clockOptions = document.createElement("section");
   $clockOptions.id = "watilin-clock-options";
   document.body.appendChild($clockOptions);

   var $h2 = document.createElement("h2");
   $h2.textContent = "Options de l’horloge";
   $clockOptions.appendChild($h2);

   // alarm section
   var $alarmSection = document.createElement("section");
   $clockOptions.appendChild($alarmSection);

   var $h3 = document.createElement("h3");
   $h3.textContent = "Alarme";
   $alarmSection.appendChild($h3);

   var $timeSelectP = document.createElement("p");
   $alarmSection.appendChild($timeSelectP);

   var d = new Date();

   var $hours = document.createElement("input");
   $hours.type = "number";
   $hours.size = 2;
   $hours.min  = 0;
   $hours.max  = 23;
   $hours.step = 1;
   $hours.value = d.getHours();
   $timeSelectP.appendChild($hours);

   $timeSelectP.appendChild(document.createTextNode(":"));

   var $minutes = document.createElement("input");
   $minutes.type = "number";
   $minutes.size = 2;
   $minutes.min  = 0;
   $minutes.max  = 59;
   $minutes.step = 1;
   $minutes.value = d.getMinutes();
   $timeSelectP.appendChild($minutes);

   // binds click events
   function toggle( ){
      if (!$clockOptions.style.display) {
         $clockOptions.style.display = "block";
      } else {
         $clockOptions.style.display = "";
      }
   }
   // $clock.addEventListener("click", toggle); // not ready yet
   $h2.addEventListener("click", toggle);
}());

// [@KEY] Keyboard Navigation //////////////////////////////////////////

// command keys are based on the french version
// TODO: configurable command keys (TODO-b)
var CommandKeys = {
   "Alliance": "A",
   "Boutique": "B",
   "Chantier spatial": "C",
   "Défense": "D",
   "Empire": "E",
   "Flotte": "F",
   "Galaxie": "G",
   "Recherche": "H",
   "Installations": "I",
   "Messages": "M",
   "Marchand": "N",
   "Mess des officiers": "O",
   "Ressources": "R",
   "Vue d`ensemble": "V"
};
var MissionKeys = {
   15: "X", // eXpédition
   7: "C", // Coloniser
   8: "R", // Recycler
   3: "T", // Transporter
   4: "S", // Stationner
   6: "E", // Espionner
   5: "D", // Défendre
   1: "A", // Attaquer
   2: "G", // attaque Groupée
   9: "U" // détrUire
};

(function( ){
   var fleetPage = page.match(/^fleet(\d)/);
   if (fleetPage && fleetPage[1] > 1) {

      // shortcuts for missions
      if (3 === fleetPage[1])
         Array.forEach($$("#missions a"), function( $ ){
            $.accessKey = MissionKeys[$.id.match(/\d+/)[0]]
         });

   } else { // every pages except fleet sending pages

      var hooks = {};
      Array.forEach($$("#menuTable a.menubutton"), function( $a ){
         var $label = $a.querySelector("span.textlabel");
         var text = $label.textContent;
         var key = CommandKeys[text];
         if (text in CommandKeys) {
            hooks[key] = [$a];
            var $tip = $a.parentNode.querySelector("a.tooltipRight");
            if ($tip)
               hooks[key].push($tip);

            $a.accessKey = key;
            $label.innerHTML = text.replace(new RegExp(key, "i"),
               "<span class=watilin-accesskey>$&</span>");
         }
      });

      var $planetList = document.getElementById("planetList");
      // planet numerotation is disabled until key navigation
      // becomes functional
      // $planetList.classList.add("watilin-planetKeys");
      Array.forEach($planetList.querySelectorAll("div.smallplanet"),
         function( $planet, i ){ hooks[i + 1] = $planet; });

      document.addEventListener("keydown", function( event ){
         if (event.ctrlKey || event.altKey || event.metaKey) return;
         if (/INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;

         var key = String.fromCharCode(event.which);
         if (!(key in hooks)) return;

         event.preventDefault();


          // TODO hotkeys mangement (TODO-d)
      });
   }
}());

// use arrow keys on messages page
if ("messages" === page) {
   document.addEventListener("keydown", function( event ){
      if (/input|textarea|select/i.test(event.target.tagName)) return;

      var which = event.which;
      if (which < 37 || which > 40) return;

      var $showmessage = $("div.showmessage");
      if ($showmessage) {

         if (37 === which) {
            event.preventDefault();
            jQuery($showmessage.querySelector(
               "span.icon_rewind")).click();
         } else if (39 === which) {
            event.preventDefault();
            jQuery($showmessage.querySelector(
               "span.icon_fastforward")).click();
         }

      } else {

         if (38 != which && 40 != which) return;
         event.preventDefault();

         var messages = Array.map($$("td.subject a.overlay"),
            function( $a ){ return $a });
         var index = messages.indexOf(document.activeElement);
         var length = messages.length;
         if (index >= 0) {
            messages[(index + length + which - 39) % length].focus();
         } else {
            messages[40 === which ? 0 : length - 1].focus();
         }
      }
   });
}

// [@MUL] Multifocus ///////////////////////////////////////////////////

// nothing yet

// [@GUI] Guide ////////////////////////////////////////////////////////

(function( ){
   var $guide = document.createElement("section");
   $guide.id = "watilin-guide";
   $guide.innerHTML = GM_getResourceText("guide");

   var $button = document.createElement("a");
   $button.id = "watilin-guide-button";
   $button.href = "#";
   $button.textContent = "Guideuuh";
   $button.addEventListener("click", function( event ){
      event.preventDefault();
      if ($guide.style.display) $guide.style.display = "";
      else $guide.style.display = "block";
   });

   $("#box").appendChild($button);
   document.body.appendChild($guide);
}());

// [@PRE] Preferences Managment ////////////////////////////////////////

var Prefs = JSON.parse(GM_getValue("prefs", "{}"));
function getPref( pref ){ return Prefs[pref]; }

// [@MIS] Miscellaneous ////////////////////////////////////////////////

// removes the top bar
document.body.classList.remove("no-commander");

// scrolls to bottom on the fleet sending page
if ("fleet" === page && getPref("scrollFleet")) window.scrollTo(0, 1000);

// modifies the page title
(function( ){
   var planetName = $("meta[name='ogame-planet-name']").content;
   var planetType = $("meta[name='ogame-planet-type']").content;
   var suffix = planetName +
      (planetType != "planet" ? " (" + planetType + ")" : "") +
      " – " + document.title;
   var $alertBox = $("#message_alert_box_default") ||
      $("#message_alert_box");

   function updateTitle( n ){
      document.title = (n ? "(" + n + ") " : "") + suffix;
   }

   // sets the new title right now
   updateTitle(parseInt($alertBox.querySelector("span").textContent));

   // observes message count changes
   var observer = new MutationObserver(function( mutations ){
      console.group("mutation batch");

      var count = 0;
      mutations.forEach(function( mutation ){
         console.debug(mutation);
         if (!mutation.addedNodes.length) return;
         count = parseInt(mutation.addedNodes[0].textContent);
      });
      updateTitle(count);

      console.groupEnd();
   });
   observer.observe($alertBox, {
      childList: true,
      subtree: true // watch modifications of the <span>'s text
   });
}());

// prevents page scrolling when a dialog box opens
if ("scrollToTopOfDialog" in unsafeWindow) {
   unsafeWindow.scrollToTopOfDialog = function( ){ return undefined; };
} else {
   Object.defineProperty(unsafeWindow, "scrollToTopOfDialog", {
      get: function(){ return function( ){ return undefined; }; },
      set: function(){ return undefined; }
   });
}

// activates recycling links in the Galaxy view
(function( ){
   if ("galaxy" === page) {
      var observer = new MutationObserver(function( mutations ){
         mutations.forEach(function( mutation ){
            Array.forEach(mutation.addedNodes, function( $node ){
               // as jQuery's `.html` method is used, the added DOM
               // contains textNodes and script tags. I don't want them.
               if (Node.ELEMENT_NODE !== $node.nodeType) return;
               if ("SCRIPT" === $node.nodeName) return;

               var $$debris =
                  $node.querySelectorAll("div[id^='debris']");
               Array.forEach($$debris, function( $div ){
                  var $span = $div.querySelector("#pos-debris");
                  var $a = $div.querySelector("a[href='#']");
                  $a.removeAttribute("onclick");
                  $a.href =
                     "/game/index.php?page=fleet1&type=2&mission=8&" +
                     $span.textContent.replace(
                        /\[(\d):(\d{1,3}):(\d{1,2})\]/,
                        "galaxy=$1&system=$2&position=$3"
                     );
               });
            });
         });
      });
      observer.observe($("#galaxyContent"), { childList: true });
   }
}());

// removes animation on the darkmatter picture
(function( $darkmatterBox ){
   $darkmatterBox.classList.remove("dark_highlight_tablet");

   var $div = document.createElement("div");
   $div.className = "resourceIcon darkmatter";
   $darkmatterBox.appendChild($div);

   $darkmatterBox
      .querySelector("a")
      .replaceChild($div, $darkmatterBox.querySelector("img"));
}($("#darkmatter_box")));
