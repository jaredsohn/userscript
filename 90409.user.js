// ==UserScript==
// @name           Khanwars global map by Viacheslav Nefedov
// @namespace      http://www.nefedov.net
// @description    Big global map for Khanwars 3.0
// @include        http*://*utopiakingdoms.com*
// @include        http*://*khanwars.com*
// @include        http*://*guerrakhan.com*
// @include        http*://*lesseigneurs.fr*
// @include        http*://*khanwars.com.pt*
// @include        http*://*khanwars.es*
// @include        http*://*khanwars.cl*
// @include        http*://*deche.vn*
// @include        http*://*khanwars.ro*
// @include        http*://*khanwars.pl*
// @include        http*://*hansavaslari.com*
// @include        http*://*khanwars.it*
// @include        http*://*zarenkriege.de*
// @include        http*://*hanovete.com*
// @include        http*://*khanratnik.com*
// @include        http*://*draugas.lt*
// @include        http*://*khanwars.nl*
// @include        http*://*khanwars.no*
// @include        http*://*khanwars.se*
// @include        http*://*pravyteli.com*
// @include        http*://*khanwars.hu*
// @include        http*://*khanwars.ae*
// @include        http*://*khanwars.jp*
// @include        http*://*khanwars.ir*
// @include        http*://*lordwars.co.il*
// @include        http*://*pravyteli.com*
// @version        0.3
// ==/UserScript==

var img = new Array();
var ctx;

// Main block
if (document.baseURI.indexOf('map.php')>-1) {
	mainFunction();

        var UKMode = false;
        var HealThreshold = 200;
        var ScavengeThreshold = 10;

        document.addEventListener("DOMNodeInserted", TrapMapUpdate, true);
}

/*****************************************************************************/
//                 Ned start. Wide global map  

function mainFunction() {
  
	var InsertionPoint = document.getElementsByClassName("largeMapFrame")[0];
	var Ned_showBigMapButton = document.createElement('center');
	Ned_showBigMapButton.innerHTML = "<input type='button' value='Show big map' />";
	Ned_showBigMapButton.addEventListener('click', Ned_showBigMap, true);
	InsertionPoint.parentNode.insertBefore(Ned_showBigMapButton, InsertionPoint.nextSibling);  
  
	var pageBody = document.getElementById("pageBody");
	if (pageBody) {
		pageBody.style.height = "1110px";
	}

	var Ned_GlobalMap = document.createElement('canvas');
	Ned_GlobalMap.id = 'canvas';
	Ned_GlobalMap.height = '1015';
	Ned_GlobalMap.width = '1015';
	Ned_GlobalMap.style.left = '50px';
	Ned_GlobalMap.style.top = '100px';  
	Ned_GlobalMap.style.position = 'absolute';  
	Ned_GlobalMap.style.display = 'block';
	Ned_GlobalMap.style.zIndex = '2000';  
  
	var i,j;  
	ctx = Ned_GlobalMap.getContext('2d');
  
	ctx.fillStyle = "#005000";
	ctx.fillRect (0, 0, 1000, 1000);
 
	for (j = 0; j<7; j++)
		for (i = 0; i<4; i++) {
			img[i*7+j] = new Image();
			img[i*7+j].src = "map_gd.php?x=" + (i*60+(i==0?1:0)) + "&y=" + (j*36+(j==0?1:0)); 
		}
  
	pageBody.appendChild(Ned_GlobalMap);
	unsafeWindow.toggleBlock('canvas');
	
	Ned_GlobalMap.addEventListener("click", Ned_MapClicked, true);  
}

function Ned_MapClicked(e) {
	var x,y;

	if (!e) var e = window.event;
	x = e.pageX;
	y = e.pageY;
	
	var elem = e.target;
	var offsetX = 0;
	var offsetY = 0;
	
    while (elem)
    {
        offsetX += elem.offsetLeft;
        offsetY += elem.offsetTop;
        elem = elem.offsetParent;
    }
	
	x = Math.floor((x-offsetX)/5);
	y = Math.floor((y-offsetY)/5);  
  
	unsafeWindow.toggleBlock('canvas');
	unsafeWindow.search_map(x,y);
}

function Ned_showBigMap(event) {
	var i,j;  
	
	for (j = 0; j<7; j++)
		for (i = 0; i<4; i++) {
			if (img[i*7+j].complete) ctx.drawImage(img[i*7+j], i*301, j*181);
		}	
		
	var selectedX, selectedY;
	if (! UKMode) {
		var selectedX = unsafeWindow._xMap, selectedY = unsafeWindow._yMap;
	} else {
		var selectedX = unsafeWindow.x, selectedY = unsafeWindow.y;
	}  
	
	ctx.lineWidth   = 2;
	ctx.strokeStyle = '#fff';
	ctx.strokeRect(Math.floor(selectedX/15)*15*5,Math.floor(selectedY/9)*9*5,77,47);

	unsafeWindow.toggleBlock('canvas');
}

/*****************************************************************************/
//                 Ned start. Show resources and troops on standard map  
//                          Idea and some code has taken from 
//               Utopia Kingdoms/Khan Wars Interface Tools by Bagatelle

function TrapMapUpdate(Event) {
  var PatLeft = /left: (\d+)px/i;
  var PatTop = /top: (\d+)px/i;
  var Now = new Date();
  var ID = Event.relatedNode.getAttribute("id");
  if (ID == "now_map" || ID == "new_map" || ID == "old_map") {
    function DisplayPlayerMessage2(Event) {
      // no idea why this is necessary...
      var TempNode = Event.target;
      while (! TempNode.hasAttribute("GM_X") && TempNode.parentNode) {
        TempNode = TempNode.parentNode;
      }
      unsafeWindow.displayPlayerMessage(
        0, "", TempNode.getAttribute("GM_X"), TempNode.getAttribute("GM_Y")
      );
    }
    if (! UKMode) {
      var BaseX = unsafeWindow._xMap, BaseY = unsafeWindow._yMap;
    } else {
      var BaseX = unsafeWindow.x, BaseY = unsafeWindow.y;
    }

    var CurrX, CurrY, NewNode;
    var FocusCoords = /\?setx=(\d+)&sety=(\d+)$/i.exec(window.location);
    FocusCoords ?
      FocusCoords = [FocusCoords[1], FocusCoords[2]] : FocusCoords = [0, 0];
    var Map = Event.relatedNode;
    var Nodes = document.evaluate(
      "descendant-or-self::div[@id='" + ID + "']/descendant::div[contains(@class,'mapBlock')]",
      Map, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
    );
    var Present = [];
    for (var N = 0; N < Nodes.snapshotLength; N++) {
      if (Nodes.snapshotItem(N).hasAttribute("title")) {
        CurrX = Number(PatLeft.exec(Nodes.snapshotItem(N).getAttribute("style"))[1]) / 50;
        CurrY = Number(PatTop.exec(Nodes.snapshotItem(N).getAttribute("style"))[1]) / 50;
        Nodes.snapshotItem(N).setAttribute("GM_X", CurrX + BaseX);
        Nodes.snapshotItem(N).setAttribute("GM_Y", CurrY + BaseY);
        Present[[CurrX, CurrY].toSource()] = null;
      }
    }

    var InsertionPoint = Map.getElementsByClassName("wrapper")[0];
    if (! InsertionPoint) return 0;
    for (var X = 0; X < 8; X++) {
      for (var Y = 0; Y < 8; Y++) {
        if (! ([X, Y].toSource() in Present)) {
          NewNode = document.createElement("div");
          NewNode.setAttribute("class", "mapBlock");
          NewNode.setAttribute(
            "style",
            "left: " + String(X * 50) + "px; top: " + String(Y * 50) + "px;"
          );
          NewNode.setAttribute("GM_X", X + BaseX);
          NewNode.setAttribute("GM_Y", Y + BaseY);
          InsertionPoint.insertBefore(NewNode, InsertionPoint.lastChild);
        }
      }
    }
    
    var PatGold = /res_ico_gold.gif.+?>\s*(\d+)\s*/i;
    var PatIron = /res_ico_iron.gif.+?>\s*(\d+)\s*/i;
    var PatWood = /res_ico_wood.gif.+?>\s*(\d+)\s*/i;
    var PatFood = /res_ico_food.gif.+?>\s*(\d+)\s*/i;
    var PatPop = /ico_pop.gif.+?>\s*(\d+)\s*/i;
    var PatCoords = /header=\[.+?\((\d+):(\d+)\)\]/i;
    var PatCastleCoords = /^\s*header=\[\s*.*?([^>]*?)\s*\((\d+):(\d+)\)/i;
    var PatCapital = new RegExp(
      "img" + (UKMode ? "_ut" : "") + "/revolution/icon_crown\\.gif", "i"
    );
    var PatPlayer = new RegExp(
      "img" + (UKMode ? "_ut" : "") + "/revolution/overview/player\\.gif' /> " +
        "(.+?)\\s*<",
      "i"
    );
    var PatLevel = /exp\.gif.+?>\s*\d+\s*\((\d+)\)\s*<br\/>/i;
    var PatClan = new RegExp(
      "img" + (UKMode ? "_ut" : "") + "/revolution/overview/clan\\.gif'\/> " +
        "(.+?)\s*<",
      "i"
    );
    var PatLogo = /<img src='clanLogos.+?\/>/i;
    var RelativeX, RelativeY;
    // if square has nodes, calculate relative/global coords
    // init empty grid
    var MapData = [], GlobalX1, GlobalY1;
    for (var X = 0; X < 8; X++) {
      MapData[X] = new Array(8);
      for (var Y = 0; Y < 8; Y++) {
        MapData[X][Y] = [String(BaseX + X), String(BaseY + Y)];
      }
    }
    if (Nodes.snapshotLength > 0) { // grid has cities
      for (var N = 0; N < Nodes.snapshotLength; N++) {
        var TempText = Nodes.snapshotItem(N).getAttribute("title");
        if (TempText) {
          var Player = PatPlayer.exec(TempText);
          TempText = TempText.replace(PatLogo, "");
		  TempText = TempText.replace(/,/gi,'');
          var Coords = PatCoords.exec(TempText);
          Coords = [Coords[1], Coords[2]];
          RelativeX =
            Number(Nodes.snapshotItem(N).getAttribute("GM_X")) - BaseX;
          RelativeY =
            Number(Nodes.snapshotItem(N).getAttribute("GM_Y")) - BaseY;
          var Gold = PatGold.exec(TempText)[1];
          var Iron = PatIron.exec(TempText)[1];
          var Wood = PatWood.exec(TempText)[1];
          var Food = PatFood.exec(TempText)[1];
          var Scavenge =
            Number(Gold) + Number(Iron)	+ Number(Wood) + Number(Food);
          var Pop = PatPop.exec(TempText);
          Pop ? Pop = Number(Pop[1]) : Pop = 0;

          var Colour = "white";
          if (Scavenge > 0 || Pop >= HealThreshold) {
			if (Pop >= HealThreshold) {
				Colour = "yellow";
			} else
            if (Scavenge >= ScavengeThreshold) {
				Colour = "lightgreen";
            } else {
              if (Scavenge > 0) Colour = "blue";
            }
            var Labelled = document.evaluate(
              "descendant::*[@GM_JunkAttr]",
              Nodes.snapshotItem(N), null, XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;
            if (! Labelled && (Scavenge > 0 || Pop >= HealThreshold)) { //Ned
              Nodes.snapshotItem(N).innerHTML +=
                "<span GM_JunkAttr='1' style='color: " + Colour + "; font-family: sans-serif;'><b>" +
                (Scavenge > 0 ?  "€" +(Scavenge > 1000 ? String(Math.floor(Scavenge / 1000)) + 'K' : String(Scavenge)) + "<br />" :"") +
				(Pop > HealThreshold ? String(Pop) + "Ω" : "") + //Ned
                "</b></span>";
              TempText = TempText.replace(
                PatFood,
                function () {
                  return arguments[0] + " (Total Res: " + String(Scavenge) + ")";
                }
              );
            }
          }

          Nodes.snapshotItem(N).setAttribute("title", TempText);
          if (Player) {
            // screengrabbing: X, Y, Player, Level, Castle Name, Capital, Clan,
            // Last Activity, Now
            var Match = PatCastleCoords.exec(TempText).slice(1)
            MapData[RelativeX][RelativeY] = [
              Match[1], Match[2], Player[1],
              PatLevel.exec(TempText)[1], Match[0],
              Number((PatCapital.test(TempText))),
              (PatClan.exec(TempText) ? PatClan.exec(TempText)[1] : ""),
              LastActivity ? LastActivityMS.getTime() : null, Now.getTime()
            ];
          }
        }
      }
    }

    // highlight target square
    Nodes = document.evaluate(
      "descendant::div[@class='wrapper']/div[@GM_X='" + FocusCoords[0] + "'][@GM_Y='" +
        FocusCoords[1] + "']",
      Map, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
    ).singleNodeValue;
    if (Nodes) {
      Nodes.style.border = "solid"; Nodes.style.borderWidth = "2px";
      Nodes.style.bordercolor = "red";
    }
    // add clickability to "empty" squares, for sending camps/scavenge
    Nodes = document.evaluate(
      "//div[@id='" + ID + "']/div[@class='wrapper']/div[not(@onclick)]",
      document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
    );
    for (var N = 0; N < Nodes.snapshotLength; N++) {
      Nodes.snapshotItem(N).setAttribute(
        "style",
        Nodes.snapshotItem(N).getAttribute("style") + "; cursor: pointer;"
      );
      Nodes.snapshotItem(N).
        addEventListener("click", DisplayPlayerMessage2, true);
    }
    Nodes = document.evaluate(
      "//div[@id='" + ID + "']/div[@class='wrapper']/div",
      document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
    );  
  }
}