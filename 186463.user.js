// ==UserScript==
// @name        Gyorsmenü
// @namespace   Gyorsmenü magyar nyelvű
// @description Gyorsmenü magyar nyelvű
// @downloadURL http://userscripts.org/scripts/show/186463
// @updateURL   http://userscripts.org/scripts/show/186463
// @include     http://*.grepolis.*
// @exclude     http://forum.*.grepolis.*
// @exclude     http://wiki.*.grepolis.*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @icon        http://i1.ytimg.com/i/65ymOw4xcJzr_IrmZTVo4Q/1.jpg?v=8aece1
// @version     0.01
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_listValues
// @grant       GM_xmlhttpRequest
// ==/UserScript==

var w, uw = w = unsafeWindow || window,
	$ = w.jQuery;

    $('<a href="javascript:MainWindowFactory.openMainWindow()"><div class="ui-draggable"><img id="BTN_SZEN" border="0" style="cursor:pointer; z-index:6; position:absolute; bottom:3px; left:50px; width:30px; height:30px; margin:1px; border:2px solid #ff0; border-radius:15px; box-shadow: 1px 1px 0 0 #000, 0 0 2px 2px #000;" src="http://wiki.hu.grepolis.com/images/f/f8/Main_50x50.png" /></div></a>').appendTo('body');
    $('<a href="javascript:TempleWindowFactory.openTempleWindow()"><div class="ui-draggable"><img id="BTN_TEMP" border="0" style="cursor:pointer; z-index:6; position:absolute; bottom:3px; left:85px; width:30px; height:30px; margin:1px; border:2px solid #ff0; border-radius:15px; box-shadow: 1px 1px 0 0 #000, 0 0 2px 2px #000;" src="http://wiki.hu.grepolis.com/images/d/d3/Temple_50x50.png" /></div></a>').appendTo('body');
    $('<a href="javascript:AcademyWindowFactory.openAcademyWindow()"><div class="ui-draggable"><img id="BTN_AKAD" border="0" style="cursor:pointer; z-index:6; position:absolute; bottom:3px; left:120px; width:30px; height:30px; margin:1px; border:2px solid #ff0; border-radius:15px; box-shadow: 1px 1px 0 0 #000, 0 0 2px 2px #000;" src="http://wiki.hu.grepolis.com/images/b/bb/Academy_50x50.png" /></div></a>').appendTo('body');
    $('<a href="javascript:MarketWindowFactory.openMarketWindow()"><div class="ui-draggable"><img id="BTN_PIAC" border="0" style="cursor:pointer; z-index:6; position:absolute; bottom:3px; left:155px; width:30px; height:30px; margin:1px; border:2px solid #ff0; border-radius:15px; box-shadow: 1px 1px 0 0 #000, 0 0 2px 2px #000;" src="http://wiki.hu.grepolis.com/images/d/dc/Market_50x50.png" /></div></a>').appendTo('body');
    $('<a href="javascript:PlaceWindowFactory.openPlaceWindow()"><div class="ui-draggable"><img id="BTN_AGOR" border="0" style="cursor:pointer; z-index:6; position:absolute; bottom:3px; left:190px; width:30px; height:30px; margin:1px; border:2px solid #ff0; border-radius:15px; box-shadow: 1px 1px 0 0 #000, 0 0 2px 2px #000;" src="http://wiki.hu.grepolis.com/images/a/a4/Ag%C3%B3ra.png" /></div></a>').appendTo('body');
    $('<a href="javascript:HideWindowFactory.openHideWindow()"><div class="ui-draggable"><img id="BTN_VERE" border="0" style="cursor:pointer; z-index:6; position:absolute; bottom:3px; left:225px; width:30px; height:30px; margin:1px; border:2px solid #ff0; border-radius:15px; box-shadow: 1px 1px 0 0 #000, 0 0 2px 2px #000;" src="http://wiki.hu.grepolis.com/images/5/5d/Hide_50x50.png" /></div></a>').appendTo('body');
    $('<a href="javascript:BarracksWindowFactory.openBarracksWindow()"><div class="ui-draggable"><img id="BTN_KASZ" border="0" style="cursor:pointer; z-index:6; position:absolute; bottom:3px; left:260px; width:30px; height:30px; margin:1px; border:2px solid #ff0; border-radius:15px; box-shadow: 1px 1px 0 0 #000, 0 0 2px 2px #000;" src="http://wiki.hu.grepolis.com/images/3/38/Barracks_50x50.png" /></div></a>').appendTo('body');
    $('<a href="javascript:DocksWindowFactory.openDocksWindow()"><div class="ui-draggable"><img id="BTN_KIKO" border="0" style="cursor:pointer; z-index:6; position:absolute; bottom:3px; left:295px; width:30px; height:30px; margin:1px; border:2px solid #ff0; border-radius:15px; box-shadow: 1px 1px 0 0 #000, 0 0 2px 2px #000;" src="http://wiki.hu.grepolis.com/images/e/ef/Docks_50x50.png" /></div></a>').appendTo('body');
    $('<a href="javascript:BuildingWindowFactory.open(\'storage\')"><div class="ui-draggable"><img id="BTN_RAKT" border="0" style="cursor:pointer; z-index:6; position:absolute; bottom:3px; left:330px; width:30px; height:30px; margin:1px; border:2px solid #ff0; border-radius:15px; box-shadow: 1px 1px 0 0 #000, 0 0 2px 2px #000;" src="http://wiki.hu.grepolis.com/images/1/1e/Storage_50x50.png" /></div></a>').appendTo('body');
    $('<a href="javascript:FarmTownOverviewWindowFactory.openFarmTownOverview()"><div class="ui-draggable" id="BTN_FALU" border="0" style="cursor:pointer; z-index:6; position:absolute; bottom:35px; left:173px; width:30px; height:30px; margin:1px; border:2px solid #f00; border-radius:15px; box-shadow: 1px 1px 0 0 #000, 0 0 2px 2px #000; background: #ccc url(http://hu.cdn.grepolis.com/images/game/premium_features/feature_icons_2.08.png) 0px 30px;" /></div></a>').appendTo('body');
    $('<a href="javascript:AttackPlannerWindowFactory.openAttackPlannerWindow()"><div class="ui-draggable" id="BTN_TAMT" border="0" style="cursor:pointer; z-index:6; position:absolute; bottom:35px; left:208px; width:30px; height:30px; margin:1px; border:2px solid #f00; border-radius:15px; box-shadow: 1px 1px 0 0 #000, 0 0 2px 2px #000; background: #ccc url(http://hu.cdn.grepolis.com/images/game/premium_features/feature_icons_2.08.png) 0px 90px;;" /></div></a>').appendTo('body');
    $("#BTN_SZEN").mousePopup(new uw.MousePopup("Szenátus")).click;
    $("#BTN_TEMP").mousePopup(new uw.MousePopup("Templom")).click;
    $("#BTN_AKAD").mousePopup(new uw.MousePopup("Akadémia")).click;
    $("#BTN_PIAC").mousePopup(new uw.MousePopup("Piactér")).click;
    $("#BTN_AGOR").mousePopup(new uw.MousePopup("Agóra")).click;
    $("#BTN_VERE").mousePopup(new uw.MousePopup("Verem")).click;
    $("#BTN_KASZ").mousePopup(new uw.MousePopup("Kaszárnya")).click;
    $("#BTN_KIKO").mousePopup(new uw.MousePopup("Kikötő")).click;
    $("#BTN_RAKT").mousePopup(new uw.MousePopup("Raktár")).click;
    $("#BTN_FALU").mousePopup(new uw.MousePopup("Falvak")).click;
    $("#BTN_TAMT").mousePopup(new uw.MousePopup("Támadástervező")).click;