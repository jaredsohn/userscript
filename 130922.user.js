// ==UserScript==
// @id             qlranksmappreviews@phob.net
// @name           QLRanks.com Map Previews
// @version        0.16
// @namespace      phob.net
// @author         wn
// @description    Show map previews when hovering over a map on QLRanks.com
// @include        http://qlranks.com/*
// @include        http://*.qlranks.com/*
// @grant          GM_addStyle
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/130922.meta.js
// ==/UserScript==


/**
 * Evaluate code in the page context.
 * Source: http://wiki.greasespot.net/Content_Script_Injection
 */
function contentEval(source) {
  // Check for function input.
  if ("function" == typeof(source)) {
    source = "(" + source + ")();";
  }

  // Create a script node holding this source code.
  var script = document.createElement("script");
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}


GM_addStyle("#qlrmp { display: none; position: absolute; top: -999px; left: -999px; border: 1px solid #ccc }"
          + "#qlrmp img { width: 112px; height: 84px }");


contentEval(function() {
var orderedMaps = [
    "aerowalk", "almostlost", "arenagate", "asylum", "basesiege",
    "battleforged", "beyondreality", "blackcathedral", "bloodrun",
    "bloodlust", "brimstoneabbey", "campgrounds", "cannedheat",
    "chemicalreaction", "cobaltstation", "coldwar", "concretepalace",
    "courtyard", "deepinside", "demonkeep", "devilish", "diesirae",
    "dismemberment", "distantscreams", "doubleimpact", "dreadfulplace",
    "dredwerkz", "duelingkeeps", "electrichead", "eviscerated", "evolution",
    "eyetoeye", "falloutbunker", "fatalinstinct", "finnegans", "focalpoint",
    "forgotten", "furiousheights", "gothicrage", "grimdungeons", "hearth",
    "hektik", "hellsgate", "hellsgateredux", "heroskeep", "hiddenfortress",
    "houseofdecay", "industrialaccident", "innersanctums", "intervention",
    "ironworks", "japanesecastles", "leviathan", "longestyard", "lostworld",
    "namelessplace", "overkill", "overlord", "phrantic", "powerstation",
    "provinggrounds", "purgatory", "quarantine", "realmofsteelrats", "rebound",
    "reflux", "retribution", "revolver", "sacellum", "scornforge",
    "seamsandbolts", "shiningforces", "siberia", "skyward", "solid",
    "somewhatdamaged", "sorrow", "spacectf", "spacechamber", "spidercrossings",
    "spillway", "stonekeep", "stronghold", "superspace", "terminalheights",
    "theatreofpain", "threestory", "thunderstruck", "tornado", "toxicity",
    "trinity", "troubledwaters", "verticalvengeance", "vortexportal",
    "wargrounds", "windowpain"
];


var $qlrmp
  , $qlrmpImg
  , mapURL = "http://www.quakelive.com/images/levelshots/md/{{map}}.jpg";


function hoverMap($el, map) {
  $el.css("cursor", "pointer");

  $el.bind("mouseenter", function() {
    $qlrmpImg.load(function() { $qlrmp.show(); }).attr("src", map);
  }).bind("mouseleave", function() {
    $qlrmp.hide();
  }).bind("mousemove", function(e) {
    if ($qlrmp.is(":visible")) {
      $qlrmp.css({left: e.pageX + 5 + "px", top: e.pageY + 5 + "px"});
    }
  });
}


$(document).ready(function() {
  $("body").append($("<div id='qlrmp'><img src='' /></div>"));

  $qlrmp = $("#qlrmp");
  $qlrmpImg = $qlrmp.find("img");

  // Handle alt-tabbing, etc.
  $(window).bind("blur", function() { $qlrmp.hide() });

  // Get all maps in a graph legend
  $("td.legendLabel").each(function() {
    var $this = $(this)
      , map = $.trim($this.text()).toLowerCase();

    if (0 <= $.inArray(map, orderedMaps)) {
      hoverMap($this.parent(), mapURL.replace("{{map}}", map));
    }
  });

  // Get all Map column maps
  $("th:contains('Map')").each(function() {
    var $parent = $(this).parent()
      , $table = $parent.closest("table")
      , n = $parent.children().index(this) + 1;

    $table.children("tr > td:nth-child(" + n + ")")
        .add($table.find("tbody tr > td:nth-child(" + n + ")")).each(function() {
      var $this = $(this)
        , $img = $this.find("img").first()
        , map;

      // Image or map name?
      if ($img.length) {
        map = $img.attr("src");
      }
      else {
        map = mapURL.replace("{{map}}", $.trim($this.text()).toLowerCase());
      }

      hoverMap($this, map);
    });
  });
});

}); // end of call to contentEval
