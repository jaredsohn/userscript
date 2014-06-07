// ==UserScript==
// @name          inaktif gri
// @include       http://uni*.ogame.*/*
// ==/UserScript==

var RAIDABLE = 5000;

var RAIDABLE_COLOR = "#ffffff";
var INACTIVE_COLOR = "#444444";

var ALLIANCE = "METTRE LE NOM D'UNE ALLIANCE";
var ALLIANCE_COLOR = "#cc33cc";

function fgEvalnode(path,document,node) {
   var ret = document.evaluate(path,node,null,
         XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   return ret;
}

function fgEval(path,document) {
   return fgEvalnode(path,document,document);
}

function fg_isGalaxyUrl(href) {
   return href.search(/page=galaxy/i) > -1;
}

function fg_set_colors(document) {
   if (!fg_isGalaxyUrl(document.location.href)) {
      return;
   }
   var planetRowPath = "/html/body/div[3]/center/center/table/tbody/tr";
   var playerNamePath = "th[6]/a/span[@class='normal']";
   var playerIncativeNamePath = "th[6]/a/span[@class='inactive']|th[6]/a/span[@class='longinactive']";
   var playerPositionPath = "th[6]/font[@color='yellow']";
   var alliancePath = "th[7]/a";
   var backgroundPath = "th";
   var planetRowsObj = fgEval(planetRowPath ,document);
   for (var i = 0; i < planetRowsObj.snapshotLength; i++) {
      var planetRow = planetRowsObj.snapshotItem(i);
      var newColor = null;
      
      var allianceObj = fgEvalnode(alliancePath, document, planetRow);
      if (allianceObj.snapshotLength > 0) {
         var allianceElem = allianceObj.snapshotItem(0);
         if (allianceElem.innerHTML.match(ALLIANCE)) {
            newColor = ALLIANCE_COLOR;
         }
      }
      if (newColor == null) {
         var playersObj = fgEvalnode(playerIncativeNamePath, document, planetRow);
         if (playersObj.snapshotLength > 0) {      
            newColor = INACTIVE_COLOR;
         }
      }      
      if (newColor == null) {
         var playersObj = fgEvalnode(playerNamePath, document, planetRow);
         if (playersObj.snapshotLength > 0) {      
            var playerPositionObj = fgEvalnode(playerPositionPath, document, planetRow);
            if (playerPositionObj.snapshotLength > 0) {
               var playerPositionElem = playerPositionObj.snapshotItem(0);
               if (playerPositionElem.innerHTML.substring(1) >= RAIDABLE) {
                  newColor = RAIDABLE_COLOR;
               }
            }
         }
      }
      
      if (newColor != null) {
      var cellsObj = fgEvalnode(backgroundPath, document, planetRow);
         for (var j = 0; j < cellsObj.snapshotLength; j++) {
            cell = cellsObj.snapshotItem(j);

            cell.style.backgroundColor = newColor;            
         }
      }
   }
}
//fg_set_colors(document);

window.addEventListener(
    'load',
    function() { fg_set_colors(document); },
    true);