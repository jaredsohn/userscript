// HOMMK user script
// Copyright (c) 2011, Wolfgang Pretl
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select the script, and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Mekls Jactari Saison 3 Support
// @author        Wolfgang Pretl
// @namespace     http://www.mekl.at
// @description   

// @include       http://mmhk.jactari.info/fight*
// @include       http://mmhk.jactari.info/Kampf*
// @include       http://mmhk.jactari.info/combat*
// @include       http://mmhk.jactari.info/бой*

// @include       http://mmhk.jactari.info/artifacts*
// @include       http://mmhk.jactari.info/Artefakte*
// @include       http://mmhk.jactari.info/artéfacts*
// @include       http://mmhk.jactari.info/артефакты*

// @version       0.2.3
// @date          2011-09-28
// ==/UserScript==

// ---------- 22nd September 2011
// Version 0.1.1
// - "Moral High" set to 120% (game value) instead of 150% (official named value)
// - Fixed bug on setting/changing "saison-3" (may have caused fights with stats from saison 1)

// ---------- 26th September 2011
// Version 0.2.0
// - Support for Saison 3 Artefacts added
// - new "&mekl=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" addon for jactari link (needed for saison 3 artefacts)
// - 13 saison 3 artefacts added, need more data (please use "Mekls Jactari Damned" feature "Item Dump" to send me new artefacts!)
// - Implosion reduced by 10% for saison 3 servers

// ---------- 26th September 2011
// Version 0.2.1
// - 102/200 saison 3 artefacts, 98 missing, no set artefacts

// ---------- 27th September 2011
// Version 0.2.2
// - 153/200 saison 3 artefacts, 47 missing, no set artefacts

// ---------- 28th September 2011
// Version 0.2.3
// - changed to support new jactari version ("2011-09-20")
// - removed artefact injection

// protect from other scripts
(function() {

 if ( typeof console == 'undefined'){
 console = {};
 console.log = function(txt){};
 }

 // bookmarklet protection
 if (window.mmhk_jac_s3_loaded){
 return;
 }
 window.mmhk_jac_s3_loaded = true;

 // GLOBALS

 var DEBUG = 0;

 var version = '0.2.2'; // also, check meta-data field @version

 if (typeof unsafeWindow == 'undefined')
 unsafeWindow = window;
 if(typeof $ == 'undefined')
  $ = unsafeWindow.$;

 if (window.chrome && chrome.extension ){

	 console.log("running as chrome extension");
	 var url = chrome.extension.getURL("script.js") + '?time=' + (new Date()).getTime();
	 if (DEBUG) console.log( "injecting " + url );

	 // inject script
	 var script = document.createElement('script');
	 script.src = url;
	 document.getElementsByTagName('head')[0].appendChild(script);

	 return;
 } 

  var saison3 = false;

  function init()
  {
    // Permanent-Link neu fassen
    var edc = (window.encode_donnees_combat || unsafeWindow.encode_donnees_combat);
    window.encode_donnees_combat = function(d)
    {
      return edc(d) + ($("#saison").val() == 3 ? "&S3=y" : "") + "&mekl=" + encodeMeklUrl();
    }
    unsafeWindow.encode_donnees_combat = window.encode_donnees_combat;
    
    // Warnung anzeigen, wenn der Jactari Simulator upgedated wurde
    if($("#version").text().indexOf("1.5.0.116-11-MTR (2011-09-20)") < 0)
    {
      $("<div>Please check if Mekls MMHK Jactari Saison 3 addon is neccessary, as the Jactari Simulator has been updated</div>")
      .css("background-color", "red")
      .css("color", "white")
      .css("font-weight", "bold")
      .css("font-size", "15px")
      .css("padding", "5px")
      .appendTo( $("#version") )
      ;
    }
    
    $("#version").append("<span>with Mekls Saison 3 Support</span>");

    // Saison 3 im Suchstring übergeben?
    function s3selected()
    {
      return (window.location.search.indexOf("&S3=y") >= 0) ? true : false;
    }
    
    // Flag von URL übernehmen und Haken setzen
    saison3 = s3selected();
    if(saison3)
    {
      $("#saison").val("3").triggerHandler("change");
    }
  }

  $(document).ready(function() {
    init();
    addNewArtes();
    decodeMeklUrl();
    
    $("#saison").triggerHandler("change");
  });
  
  function encodeMeklUrl()
  {
    var _base64='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    
    var triplets = [];
    
    // Attacker Artefacts
    triplets[0] |= ($("#arte-0-attaquant").val() & 0xFFF) << 12;
    triplets[0] |= ($("#arte-1-attaquant").val() & 0xFFF) <<  0;
    triplets[1] |= ($("#arte-2-attaquant").val() & 0xFFF) << 12;
    triplets[1] |= ($("#arte-3-attaquant").val() & 0xFFF) <<  0;
    triplets[2] |= ($("#arte-4-attaquant").val() & 0xFFF) << 12;
    triplets[2] |= ($("#arte-5-attaquant").val() & 0xFFF) <<  0;
    triplets[3] |= ($("#arte-6-attaquant").val() & 0xFFF) << 12;
    triplets[3] |= ($("#arte-7-attaquant").val() & 0xFFF) <<  0;
    
    // Defender Artefacts
    triplets[4] |= ($("#arte-0-defenseur").val() & 0xFFF) << 12;
    triplets[4] |= ($("#arte-1-defenseur").val() & 0xFFF) <<  0;
    triplets[5] |= ($("#arte-2-defenseur").val() & 0xFFF) << 12;
    triplets[5] |= ($("#arte-3-defenseur").val() & 0xFFF) <<  0;
    triplets[6] |= ($("#arte-4-defenseur").val() & 0xFFF) << 12;
    triplets[6] |= ($("#arte-5-defenseur").val() & 0xFFF) <<  0;
    triplets[7] |= ($("#arte-6-defenseur").val() & 0xFFF) << 12;
    triplets[7] |= ($("#arte-7-defenseur").val() & 0xFFF) <<  0;
    
    // Codage base 64
    var code = '';
    for (var t = 0; t < 8; t++) {
      code += _base64.charAt((triplets[t] >> 18) & 63);
      code += _base64.charAt((triplets[t] >> 12) & 63);
      code += _base64.charAt((triplets[t] >> 6) & 63);
      code += _base64.charAt((triplets[t]) & 63);
    }
    
    return code;
  }
  
  function decodeMeklUrl()
  {
    var idx = document.location.search.indexOf("&mekl=");
    if(idx == -1) return;
    var code = document.location.search.slice(idx + 6 );
    
    console.log( "mekl code = " + code );
    
    var triplets = [];
    for (var c = 0; c < code.length; c++) {
        var i = Math.floor(c / 4);
        var d = (3 - (c % 4)) * 6;
        triplets[i] |= unsafeWindow._base64.indexOf(code.charAt(c)) << d
    }
    
    var att_arte = new Array(7);
    att_arte[0] = (triplets[0] >> 12) & 0xFFF;
    att_arte[1] = (triplets[0] >>  0) & 0xFFF;
    att_arte[2] = (triplets[1] >> 12) & 0xFFF;
    att_arte[3] = (triplets[1] >>  0) & 0xFFF;
    att_arte[4] = (triplets[2] >> 12) & 0xFFF;
    att_arte[5] = (triplets[2] >>  0) & 0xFFF;
    att_arte[6] = (triplets[3] >> 12) & 0xFFF;
    att_arte[7] = (triplets[3] >>  0) & 0xFFF;
    
    var def_arte = new Array(7);
    def_arte[0] = (triplets[4] >> 12) & 0xFFF;
    def_arte[1] = (triplets[4] >>  0) & 0xFFF;
    def_arte[2] = (triplets[5] >> 12) & 0xFFF;
    def_arte[3] = (triplets[5] >>  0) & 0xFFF;
    def_arte[4] = (triplets[6] >> 12) & 0xFFF;
    def_arte[5] = (triplets[6] >>  0) & 0xFFF;
    def_arte[6] = (triplets[7] >> 12) & 0xFFF;
    def_arte[7] = (triplets[7] >>  0) & 0xFFF;
    
    console.log( "Attacker = " + att_arte );
    console.log( "Defender = " + def_arte );
    
    for(var s in unsafeWindow._slots)
    {
      $("#arte-" + s + "-attaquant").val(att_arte[s]);
      $("#arte-" + s + "-defenseur").val(def_arte[s]);
    }
  }

  var newArtesAdded = false;
  var newArtes;
  
  function addNewArtes()
  {
    if(newArtes == undefined) newArtes = [];
  
    if(newArtesAdded == true) return;
    newArtesAdded = true;
    var count = 0;
    
    function addArte(a)
    {
      var found = false;
      for(var ai in unsafeWindow._artefacts)
      {
        var ja = unsafeWindow._artefacts[ai];
        
        if(ja.nom['tag'] == a.tagName)
        {
          ja.id = a.id;
          newArtes.push( ja );
          delete unsafeWindow._artefacts[ai];
          found = true;
          break;
        }
      }
    }
    // RUSTY_SYLVANER_CROWN
    addArte({"id":306,"nom":{"de":"Rostige Krone (Sylvaner), Stufe 1"},"tagName":"RUSTY_SYLVANER_CROWN","faction":6,"factionName":"SYLVAN","icone":0,"niv":1,"slot":0,"slotName":"HEAD","type":0,"typeName":"zoneLoot","effets":[{"id":64,"niv":1,"desc":"Steigert die Wirksamkeit von Beschwörungszaubern um 3%."}]});

    // DULL_SYLVANER_CROWN
    addArte({"id":307,"nom":{"de":"Matte Krone (Sylvaner), Stufe 2"},"tagName":"DULL_SYLVANER_CROWN","faction":6,"factionName":"SYLVAN","icone":0,"niv":2,"slot":0,"slotName":"HEAD","type":0,"typeName":"zoneLoot","effets":[{"id":72,"niv":1,"desc":"Steigert den Angriff aller Schützenabteilungen um 5 Punkte."},{"id":27,"niv":1,"desc":"Steigert den Holzertrag um 4%."}]});

    addArte({id:308,tagName:"DARK_SYLVANER_CROWN"});
    addArte({id:309,tagName:"SPARKLING_SYLVANER_CROWN"});

    // REFINED_SYLVANER_CROWN
    addArte({"id":310,"nom":{"de":"Edle Krone (Sylvaner), Stufe 5"},"tagName":"REFINED_SYLVANER_CROWN","faction":6,"factionName":"SYLVAN","icone":0,"niv":5,"slot":0,"slotName":"HEAD","type":0,"typeName":"zoneLoot","effets":[{"id":29,"niv":3,"desc":"Steigert den Quecksilberertrag um 12%."},{"id":34,"niv":2,"desc":"Steigert den Verkaufspreis für seltene Rohstoffe beim Kaufmann um 12%."}]});

    // RUSTY_SYLVANER_CLOAK
    addArte({"id":311,"nom":{"de":"Rostiger Mantel (Sylvaner), Stufe 1"},"tagName":"RUSTY_SYLVANER_CLOAK","faction":6,"factionName":"SYLVAN","icone":0,"niv":1,"slot":7,"slotName":"CAPE","type":0,"typeName":"zoneLoot","effets":[{"id":17,"niv":1,"desc":"Steigert die im Kampf für den Helden gewonnenen EP um 3%."}]});

    // DULL_SYLVANER_CLOAK
    addArte({"id":312,"nom":{"de":"Matter Mantel (Sylvaner), Stufe 2"},"tagName":"DULL_SYLVANER_CLOAK","faction":6,"factionName":"SYLVAN","icone":0,"niv":2,"slot":7,"slotName":"CAPE","type":0,"typeName":"zoneLoot","effets":[{"id":15,"niv":1,"desc":"Steigert die Verteidigung des Helden um 2 Punkte."},{"id":66,"niv":1,"desc":"Steigert die Wirksamkeit von Beschwörungszaubern der Stufe 1 um 9%."}]});

    // DARK_SYLVANER_CLOAK
    addArte({"id":313,"nom":{"de":"Dunkler Mantel (Sylvaner), Stufe 3"},"tagName":"DARK_SYLVANER_CLOAK","faction":6,"factionName":"SYLVAN","icone":0,"niv":3,"slot":7,"slotName":"CAPE","type":0,"typeName":"zoneLoot","effets":[{"id":6,"niv":3,"desc":"Steigert die tägliche Produktion von Einheiten der Rangstufe 6 um 1."}]});

    addArte({id:314, tagName:"SPARKLING_SYLVANER_CLOAK"});

    // REFINED_SYLVANER_CLOAK
    addArte({"id":315,"nom":{"de":"Edler Mantel (Sylvaner), Stufe 5"},"tagName":"REFINED_SYLVANER_CLOAK","faction":6,"factionName":"SYLVAN","icone":0,"niv":5,"slot":7,"slotName":"CAPE","type":0,"typeName":"zoneLoot","effets":[{"id":23,"niv":3,"desc":"Kundschafter erhalten 9 zusätzliche Stufen beim Ausspähen von Gebieten."},{"id":28,"niv":2,"desc":"Steigert den Erzertrag um 8%."}]});

    addArte({id:316, tagName:"RUSTY_SYLVANER_NECKLACE"});
    
    // DULL_SYLVANER_NECKLACE
    addArte({"id":317,"nom":{"en":"Matte Kette (Sylvaner), Stufe 2"},"tagName":"DULL_SYLVANER_NECKLACE","faction":6,"factionName":"SYLVAN","icone":0,"niv":2,"slot":1,"slotName":"NECKLACE","type":0,"typeName":"zoneLoot","effets":[{"id":17,"niv":2,"desc":"Steigert die im Kampf für den Helden gewonnenen EP um 6%."}]});

    // DARK_SYLVANER_NECKLACE
    addArte({"id":318,"nom":{"de":"Dunkle Kette (Sylvaner), Stufe 3"},"tagName":"DARK_SYLVANER_NECKLACE","faction":6,"factionName":"SYLVAN","icone":0,"niv":3,"slot":1,"slotName":"NECKLACE","type":0,"typeName":"zoneLoot","effets":[{"id":65,"niv":3,"desc":"Steigert die Wirksamkeit der Schäden von Beschwörungszaubern um 9%."}]});

    // SPARKLING_SYLVANER_NECKLACE
    addArte({"id":319,"nom":{"de":"Glänzende Kette (Sylvaner), Stufe 4"},"tagName":"SPARKLING_SYLVANER_NECKLACE","faction":6,"factionName":"SYLVAN","icone":0,"niv":4,"slot":1,"slotName":"NECKLACE","type":0,"typeName":"zoneLoot","effets":[{"id":17,"niv":3,"desc":"Steigert die im Kampf für den Helden gewonnenen EP um 9%."},{"id":15,"niv":1,"desc":"Steigert die Verteidigung des Helden um 2 Punkte."}]});

    // REFINED_SYLVANER_NECKLACE
    addArte({"id":320,"nom":{"en":"Refined sylvaner necklace lvl 5"},"tagName":"REFINED_SYLVANER_NECKLACE","faction":6,"factionName":"SYLVAN","icone":0,"niv":5,"slot":1,"slotName":"NECKLACE","type":0,"typeName":"zoneLoot","effets":[{"id":11,"niv":2,"desc":"Tier 5 units are recruited 6% faster"},{"id":13,"niv":3,"desc":"Hero attack increased by 6"}]});

    // RUSTY_SYLVANER_RING
    addArte({"id":321,"nom":{"en":"Rusty sylvaner ring lvl 1"},"tagName":"RUSTY_SYLVANER_RING","faction":6,"factionName":"SYLVAN","icone":0,"niv":1,"slot":2,"slotName":"RING","type":0,"typeName":"zoneLoot","effets":[{"id":42,"niv":1,"desc":"3% increase for area-of-effect destruction spell effects."}]});

    // DULL_SYLVANER_RING
    addArte({"id":322,"nom":{"de":"Matter Ring (Sylvaner), Stufe 2"},"tagName":"DULL_SYLVANER_RING","faction":6,"factionName":"SYLVAN","icone":0,"niv":2,"slot":2,"slotName":"RING","type":0,"typeName":"zoneLoot","effets":[{"id":74,"niv":2,"desc":"Steigert die Verteidigung aller Einheiten um 10 Punkte."}]});

    // DARK_SYLVANER_RING
    addArte({"id":323,"nom":{"de":"Dunkler Ring (Sylvaner), Stufe 3"},"tagName":"DARK_SYLVANER_RING","faction":6,"factionName":"SYLVAN","icone":0,"niv":3,"slot":2,"slotName":"RING","type":0,"typeName":"zoneLoot","effets":[{"id":17,"niv":3,"desc":"Steigert die im Kampf für den Helden gewonnenen EP um 9%."}]});

    addArte({id:324, tagName:"SPARKLING_SYLVANER_RING"});
    // REFINED_SYLVANER_RING
    addArte({"id":325,"nom":{"en":"Refined sylvaner ring lvl 5"},"tagName":"REFINED_SYLVANER_RING","faction":6,"factionName":"SYLVAN","icone":0,"niv":5,"slot":2,"slotName":"RING","type":0,"typeName":"zoneLoot","effets":[{"id":1,"niv":3,"desc":"Tier 1 units' daily income +6"},{"id":16,"niv":2,"desc":"Hero defense increased by 8%"}]});

    // RUSTY_SYLVANER_BOW
    addArte({"id":326,"nom":{"de":"Rostiger Bogen (Sylvaner), Stufe 1"},"tagName":"RUSTY_SYLVANER_BOW","faction":6,"factionName":"SYLVAN","icone":0,"niv":1,"slot":5,"slotName":"RIGHT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":1,"desc":"Steigert den Angriff des Helden um 2 Punkte."}]});

    // DULL_SYLVANER_BOW
    addArte({"id":327,"nom":{"de":"Matter Bogen (Sylvaner), Stufe 2"},"tagName":"DULL_SYLVANER_BOW","faction":6,"factionName":"SYLVAN","icone":0,"niv":2,"slot":5,"slotName":"RIGHT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":47,"niv":2,"desc":"Steigert die Wirksamkeit von Destruktivzaubern der Stufe 4 um 6%."}]});

    // DARK_SYLVANER_BOW
    addArte({"id":328,"nom":{"de":"Dunkler Bogen (Sylvaner), Stufe 3"},"tagName":"DARK_SYLVANER_BOW","faction":6,"factionName":"SYLVAN","icone":0,"niv":3,"slot":5,"slotName":"RIGHT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":3,"desc":"Steigert den Angriff des Helden um 6 Punkte."}]});

    // SPARKLING_SYLVANER_BOW
    addArte({"id":329,"nom":{"de":"Glänzender Bogen (Sylvaner), Stufe 4"},"tagName":"SPARKLING_SYLVANER_BOW","faction":6,"factionName":"SYLVAN","icone":0,"niv":4,"slot":5,"slotName":"RIGHT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":72,"niv":1,"desc":"Steigert den Angriff aller Schützenabteilungen um 5 Punkte."},{"id":13,"niv":3,"desc":"Steigert den Angriff des Helden um 6 Punkte."}]});

    // REFINED_SYLVANER_BOW
    addArte({"id":330,"nom":{"de":"Edler Bogen (Sylvaner), Stufe 5"},"tagName":"REFINED_SYLVANER_BOW","faction":6,"factionName":"SYLVAN","icone":0,"niv":5,"slot":5,"slotName":"RIGHT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":17,"niv":2,"desc":"Steigert die im Kampf für den Helden gewonnenen EP um 6%."},{"id":5,"niv":3,"desc":"Steigert die tägliche Produktion von Einheiten der Rangstufe 5 um 2."}]});

    // RUSTY_SYLVANER_GAUNTLETS
    addArte({"id":331,"nom":{"de":"Rostige Handschuhe (Sylvaner), Stufe 1"},"tagName":"RUSTY_SYLVANER_GAUNTLETS","faction":6,"factionName":"SYLVAN","icone":0,"niv":1,"slot":3,"slotName":"LEFT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":15,"niv":1,"desc":"Steigert die Verteidigung des Helden um 2 Punkte."}]});

    // DULL_SYLVANER_GAUNTLETS
    addArte({"id":332,"nom":{"de":"Matte Handschuhe (Sylvaner), Stufe 2"},"tagName":"DULL_SYLVANER_GAUNTLETS","faction":6,"factionName":"SYLVAN","icone":0,"niv":2,"slot":3,"slotName":"LEFT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":32,"niv":2,"desc":"Steigert den Edelsteinertrag um 8%."}]});

    // DARK_SYLVANER_GAUNTLETS
    addArte({"id":333,"nom":{"de":"Dunkle Handschuhe (Sylvaner), Stufe 3"},"tagName":"DARK_SYLVANER_GAUNTLETS","faction":6,"factionName":"SYLVAN","icone":0,"niv":3,"slot":3,"slotName":"LEFT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":15,"niv":3,"desc":"Steigert die Verteidigung des Helden um 6 Punkte."}]});

    addArte({id:334, tagName:"SPARKLING_SYLVANER_GAUNTLETS"});
    // REFINED_SYLVANER_GAUNTLETS
    addArte({"id":335,"nom":{"de":"Edle Handschuhe (Sylvaner), Stufe 5"},"tagName":"REFINED_SYLVANER_GAUNTLETS","faction":6,"factionName":"SYLVAN","icone":0,"niv":5,"slot":3,"slotName":"LEFT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":2,"desc":"Steigert den Angriff des Helden um 4 Punkte."},{"id":43,"niv":3,"desc":"Steigert die Wirksamkeit von gegen einzelne Einheiten gerichteten Destruktivzauber um 9%."}]});

    // RUSTY_SYLVANER_ARMOR
    addArte({"id":336,"nom":{"de":"Rostige Rüstung (Sylvaner), Stufe 1"},"tagName":"RUSTY_SYLVANER_ARMOR","faction":6,"factionName":"SYLVAN","icone":0,"niv":1,"slot":4,"slotName":"CHEST","type":0,"typeName":"zoneLoot","effets":[{"id":29,"niv":1,"desc":"Steigert den Quecksilberertrag um 4%."}]});

    // DULL_SYLVANER_ARMOR
    addArte({"id":337,"nom":{"de":"Matte Rüstung (Sylvaner), Stufe 2"},"tagName":"DULL_SYLVANER_ARMOR","faction":6,"factionName":"SYLVAN","icone":0,"niv":2,"slot":4,"slotName":"CHEST","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":2,"desc":"Steigert den Angriff des Helden um 4 Punkte."}]});

    addArte({id:338, tagName:"DARK_SYLVANER_ARMOR"});
    addArte({id:339, tagName:"SPARKLING_SYLVANER_ARMOR"});
    // REFINED_SYLVANER_ARMOR
    addArte({"id":340,"nom":{"de":"Edle Rüstung (Sylvaner), Stufe 5"},"tagName":"REFINED_SYLVANER_ARMOR","faction":6,"factionName":"SYLVAN","icone":0,"niv":5,"slot":4,"slotName":"CHEST","type":0,"typeName":"zoneLoot","effets":[{"id":16,"niv":3,"desc":"Steigert die Verteidigung des Helden um 12%."},{"id":15,"niv":2,"desc":"Steigert die Verteidigung des Helden um 4 Punkte."}]});

    // RUSTY_SYLVANER_BOOTS
    addArte({"id":341,"nom":{"de":"Rostige Stiefel (Sylvaner), Stufe 1"},"tagName":"RUSTY_SYLVANER_BOOTS","faction":6,"factionName":"SYLVAN","icone":0,"niv":1,"slot":6,"slotName":"FEET","type":0,"typeName":"zoneLoot","effets":[{"id":33,"niv":1,"desc":"Steigert den Verkaufspreis für gewöhnliche Rohstoffe beim Kaufmann um 6%."}]});

    // DULL_SYLVANER_BOOTS
    addArte({"id":342,"nom":{"en":"Dull sylvaner boots lvl 2"},"tagName":"DULL_SYLVANER_BOOTS","faction":6,"factionName":"SYLVAN","icone":0,"niv":2,"slot":6,"slotName":"FEET","type":0,"typeName":"zoneLoot","effets":[{"id":16,"niv":2,"desc":"Hero defense increased by 8%"}]});

    // DARK_SYLVANER_BOOTS
    addArte({"id":343,"nom":{"de":"Dunkle Stiefel (Sylvaner), Stufe 3"},"tagName":"DARK_SYLVANER_BOOTS","faction":6,"factionName":"SYLVAN","icone":0,"niv":3,"slot":6,"slotName":"FEET","type":0,"typeName":"zoneLoot","effets":[{"id":17,"niv":1,"desc":"Steigert die im Kampf für den Helden gewonnenen EP um 3%."},{"id":22,"niv":2,"desc":"Kundschafter erhalten 6 zusätzliche Stufen beim Ausspähen von Städten."}]});

    // SPARKLING_SYLVANER_BOOTS
    addArte({"id":344,"nom":{"de":"Glänzende Stiefel (Sylvaner), Stufe 4"},"tagName":"SPARKLING_SYLVANER_BOOTS","faction":6,"factionName":"SYLVAN","icone":0,"niv":4,"slot":6,"slotName":"FEET","type":0,"typeName":"zoneLoot","effets":[{"id":4,"niv":2,"desc":"Steigert die tägliche Produktion von Einheiten der Rangstufe 4 um 1."},{"id":13,"niv":2,"desc":"Steigert den Angriff des Helden um 4 Punkte."}]});

    // REFINED_SYLVANER_BOOTS
    addArte({"id":345,"nom":{"de":"Edle Stiefel (Sylvaner), Stufe 5"},"tagName":"REFINED_SYLVANER_BOOTS","faction":6,"factionName":"SYLVAN","icone":0,"niv":5,"slot":6,"slotName":"FEET","type":0,"typeName":"zoneLoot","effets":[{"id":4,"niv":3,"desc":"Steigert die tägliche Produktion von Einheiten der Rangstufe 4 um 2."},{"id":14,"niv":1,"desc":"Erhöht den Angriff des Helden um 2%."},{"id":64,"niv":1,"desc":"Steigert die Wirksamkeit von Beschwörungszaubern um 3%."}]});

    // RUSTY_GRIFFIN_HELMET
    addArte({"id":346,"nom":{"de":"Rostiger Greifenhelm, Stufe 1"},"tagName":"RUSTY_GRIFFIN_HELMET","faction":1,"factionName":"HAVEN","icone":0,"niv":1,"slot":0,"slotName":"HEAD","type":0,"typeName":"zoneLoot","effets":[{"id":71,"niv":1,"desc":"Steigert den Angriff aller Fußvolkabteilungen um 5 Punkte."}]});

    // DULL_GRIFFIN_HELMET
    addArte({"id":347,"nom":{"de":"Matter Greifenhelm, Stufe 2"},"tagName":"DULL_GRIFFIN_HELMET","faction":1,"factionName":"HAVEN","icone":0,"niv":2,"slot":0,"slotName":"HEAD","type":0,"typeName":"zoneLoot","effets":[{"id":1,"niv":2,"desc":"Steigert die tägliche Produktion von Einheiten der Rangstufe 1 um 4."}]});

    // DARK_GRIFFIN_HELMET
    addArte({"id":348,"nom":{"de":"Dunkler Greifenhelm, Stufe 3"},"tagName":"DARK_GRIFFIN_HELMET","faction":1,"factionName":"HAVEN","icone":0,"niv":3,"slot":0,"slotName":"HEAD","type":0,"typeName":"zoneLoot","effets":[{"id":21,"niv":1,"desc":"Kundschafter erhalten 3 zusätzliche Stufen beim Ausspähen von Truppen."},{"id":13,"niv":2,"desc":"Steigert den Angriff des Helden um 4 Punkte."}]});

    // SPARKLING_GRIFFIN_HELMET
    addArte({"id":349,"nom":{"de":"Glänzender Greifenhelm, Stufe 4"},"tagName":"SPARKLING_GRIFFIN_HELMET","faction":1,"factionName":"HAVEN","icone":0,"niv":4,"slot":0,"slotName":"HEAD","type":0,"typeName":"zoneLoot","effets":[{"id":71,"niv":3,"desc":"Steigert den Angriff aller Fußvolkabteilungen um 15 Punkte."},{"id":21,"niv":1,"desc":"Kundschafter erhalten 3 zusätzliche Stufen beim Ausspähen von Truppen."}]});

    addArte({id:350, tagName:"REFINED_GRIFFIN_HELMET"});
    addArte({id:351, tagName:"RUSTY_GRIFFIN_CLOAK"});
    // DULL_GRIFFIN_CLOAK
    addArte({"id":352,"nom":{"de":"Matter Greifenmantel, Stufe 2"},"tagName":"DULL_GRIFFIN_CLOAK","faction":1,"factionName":"HAVEN","icone":0,"niv":2,"slot":7,"slotName":"CAPE","type":0,"typeName":"zoneLoot","effets":[{"id":18,"niv":2,"desc":"Beschleunigt den Ausbau und die Verbesserung von Goldbergwerken um 10%."}]});

    // DARK_GRIFFIN_CLOAK
    addArte({"id":353,"nom":{"de":"Dunkler Greifenmantel, Stufe 3"},"tagName":"DARK_GRIFFIN_CLOAK","faction":1,"factionName":"HAVEN","icone":0,"niv":3,"slot":7,"slotName":"CAPE","type":0,"typeName":"zoneLoot","effets":[{"id":17,"niv":3,"desc":"Steigert die im Kampf für den Helden gewonnenen EP um 9%."}]});

    // SPARKLING_GRIFFIN_CLOAK
    addArte({"id":354,"nom":{"de":"Glänzender Greifenmantel, Stufe 4"},"tagName":"SPARKLING_GRIFFIN_CLOAK","faction":1,"factionName":"HAVEN","icone":0,"niv":4,"slot":7,"slotName":"CAPE","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":3,"desc":"Steigert den Angriff des Helden um 6 Punkte."},{"id":23,"niv":1,"desc":"Kundschafter erhalten 3 zusätzliche Stufen beim Ausspähen von Gebieten."}]});

    // REFINED_GRIFFIN_CLOAK
    addArte({"id":355,"nom":{"en":"Refined griffin cloak lvl 5"},"tagName":"REFINED_GRIFFIN_CLOAK","faction":1,"factionName":"HAVEN","icone":0,"niv":5,"slot":7,"slotName":"CAPE","type":0,"typeName":"zoneLoot","effets":[{"id":15,"niv":3,"desc":"Hero defense increased by 6"},{"id":17,"niv":2,"desc":"Hero XP gained in combat increased by 6%"}]});

    // RUSTY_GRIFFIN_NECKLACE
    addArte({"id":356,"nom":{"de":"Rostige Greifenkette, Stufe 1"},"tagName":"RUSTY_GRIFFIN_NECKLACE","faction":1,"factionName":"HAVEN","icone":0,"niv":1,"slot":1,"slotName":"NECKLACE","type":0,"typeName":"zoneLoot","effets":[{"id":18,"niv":1,"desc":"Beschleunigt den Ausbau und die Verbesserung von Goldbergwerken um 5%."}]});

    // DULL_GRIFFIN_NECKLACE
    addArte({"id":357,"nom":{"de":"Matte Greifenkette, Stufe 2"},"tagName":"DULL_GRIFFIN_NECKLACE","faction":1,"factionName":"HAVEN","icone":0,"niv":2,"slot":1,"slotName":"NECKLACE","type":0,"typeName":"zoneLoot","effets":[{"id":72,"niv":2,"desc":"Steigert den Angriff aller Schützenabteilungen um 10 Punkte."}]});

    // DARK_GRIFFIN_RING
    addArte({"id":363,"nom":{"de":"Dunkler Greifenring, Stufe 3"},"tagName":"DARK_GRIFFIN_RING","faction":1,"factionName":"HAVEN","icone":0,"niv":3,"slot":2,"slotName":"RING","type":0,"typeName":"zoneLoot","effets":[{"id":22,"niv":1,"desc":"Kundschafter erhalten 3 zusätzliche Stufen beim Ausspähen von Städten."},{"id":74,"niv":2,"desc":"Steigert die Verteidigung aller Einheiten um 10 Punkte."}]});

    // SPARKLING_GRIFFIN_RING
    addArte({"id":364,"nom":{"de":"Glänzender Greifenring, Stufe 4"},"tagName":"SPARKLING_GRIFFIN_RING","faction":1,"factionName":"HAVEN","icone":0,"niv":4,"slot":2,"slotName":"RING","type":0,"typeName":"zoneLoot","effets":[{"id":73,"niv":3,"desc":"Steigert den Angriff aller Reitereiabteilungen um 15 Punkte."},{"id":18,"niv":1,"desc":"Beschleunigt den Ausbau und die Verbesserung von Goldbergwerken um 5%."}]});

    // REFINED_GRIFFIN_RING
    addArte({"id":365,"nom":{"de":"Edler Greifenring, Stufe 5"},"tagName":"REFINED_GRIFFIN_RING","faction":1,"factionName":"HAVEN","icone":0,"niv":5,"slot":2,"slotName":"RING","type":0,"typeName":"zoneLoot","effets":[{"id":6,"niv":3,"desc":"Steigert die tägliche Produktion von Einheiten der Rangstufe 6 um 1."},{"id":26,"niv":2,"desc":"Steigert den Goldertrag um 8%."}]});

    // RUSTY_GRIFFIN_SWORD
    addArte({"id":366,"nom":{"de":"Rostiges Greifenschwert, Stufe 1"},"tagName":"RUSTY_GRIFFIN_SWORD","faction":1,"factionName":"HAVEN","icone":0,"niv":1,"slot":5,"slotName":"RIGHT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":1,"desc":"Steigert den Angriff des Helden um 2 Punkte."}]});

    // DULL_GRIFFIN_SWORD
    addArte({"id":367,"nom":{"de":"Mattes Greifenschwert, Stufe 2"},"tagName":"DULL_GRIFFIN_SWORD","faction":1,"factionName":"HAVEN","icone":0,"niv":2,"slot":5,"slotName":"RIGHT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":2,"desc":"Steigert den Angriff des Helden um 4 Punkte."}]});

    // DARK_GRIFFIN_SWORD
    addArte({"id":368,"nom":{"de":"Dunkles Greifenschwert, Stufe 3"},"tagName":"DARK_GRIFFIN_SWORD","faction":1,"factionName":"HAVEN","icone":0,"niv":3,"slot":5,"slotName":"RIGHT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":3,"desc":"Steigert den Angriff des Helden um 6 Punkte."}]});

    // SPARKLING_GRIFFIN_SWORD
    addArte({"id":369,"nom":{"de":"Glänzendes Greifenschwert, Stufe 4"},"tagName":"SPARKLING_GRIFFIN_SWORD","faction":1,"factionName":"HAVEN","icone":0,"niv":4,"slot":5,"slotName":"RIGHT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":3,"desc":"Steigert den Angriff des Helden um 6 Punkte."},{"id":16,"niv":1,"desc":"Steigert die Verteidigung des Helden um 4%."}]});

    // REFINED_GRIFFIN_SWORD
    addArte({"id":370,"nom":{"de":"Edles Greifenschwert, Stufe 5"},"tagName":"REFINED_GRIFFIN_SWORD","faction":1,"factionName":"HAVEN","icone":0,"niv":5,"slot":5,"slotName":"RIGHT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":1,"desc":"Steigert den Angriff des Helden um 2 Punkte."},{"id":20,"niv":2,"desc":"Beschleunigt den Ausbau und die Verbesserung von Bergwerken mit seltenen Rohstoffen um 10%."},{"id":26,"niv":2,"desc":"Steigert den Goldertrag um 8%."}]});

    // RUSTY_GRIFFIN_SHIELD
    addArte({"id":371,"nom":{"de":"Rostiger Greifenschild, Stufe 1"},"tagName":"RUSTY_GRIFFIN_SHIELD","faction":1,"factionName":"HAVEN","icone":0,"niv":1,"slot":3,"slotName":"LEFT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":27,"niv":1,"desc":"Steigert den Holzertrag um 4%."}]});

    // DULL_GRIFFIN_SHIELD
    addArte({"id":372,"nom":{"de":"Matter Greifenschild, Stufe 2"},"tagName":"DULL_GRIFFIN_SHIELD","faction":1,"factionName":"HAVEN","icone":0,"niv":2,"slot":3,"slotName":"LEFT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":71,"niv":1,"desc":"Steigert den Angriff aller Fußvolkabteilungen um 5 Punkte."},{"id":73,"niv":1,"desc":"Steigert den Angriff aller Reitereiabteilungen um 5 Punkte."}]});

    // DARK_GRIFFIN_SHIELD
    addArte({"id":373,"nom":{"de":"Dunkler Greifenschild, Stufe 3"},"tagName":"DARK_GRIFFIN_SHIELD","faction":1,"factionName":"HAVEN","icone":0,"niv":3,"slot":3,"slotName":"LEFT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":74,"niv":2,"desc":"Steigert die Verteidigung aller Einheiten um 10 Punkte."},{"id":17,"niv":1,"desc":"Steigert die im Kampf für den Helden gewonnenen EP um 3%."}]});

    // SPARKLING_GRIFFIN_SHIELD
    addArte({"id":374,"nom":{"de":"Glänzender Greifenschild, Stufe 4"},"tagName":"SPARKLING_GRIFFIN_SHIELD","faction":1,"factionName":"HAVEN","icone":0,"niv":4,"slot":3,"slotName":"LEFT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":17,"niv":3,"desc":"Steigert die im Kampf für den Helden gewonnenen EP um 9%."},{"id":15,"niv":1,"desc":"Steigert die Verteidigung des Helden um 2 Punkte."}]});

    // REFINED_GRIFFIN_SHIELD
    addArte({"id":375,"nom":{"de":"Edler Greifenschild, Stufe 5"},"tagName":"REFINED_GRIFFIN_SHIELD","faction":1,"factionName":"HAVEN","icone":0,"niv":5,"slot":3,"slotName":"LEFT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":74,"niv":3,"desc":"Steigert die Verteidigung aller Einheiten um 15 Punkte."},{"id":16,"niv":2,"desc":"Steigert die Verteidigung des Helden um 8%."}]});

    // DULL_GRIFFIN_ARMOR
    addArte({"id":377,"nom":{"de":"Matte Greifenrüstung, Stufe 2"},"tagName":"DULL_GRIFFIN_ARMOR","faction":1,"factionName":"HAVEN","icone":0,"niv":2,"slot":4,"slotName":"CHEST","type":0,"typeName":"zoneLoot","effets":[{"id":34,"niv":2,"desc":"Steigert den Verkaufspreis für seltene Rohstoffe beim Kaufmann um 12%."}]});

    // DARK_GRIFFIN_ARMOR
    addArte({"id":378,"nom":{"de":"Dunkle Greifenrüstung, Stufe 3"},"tagName":"DARK_GRIFFIN_ARMOR","faction":1,"factionName":"HAVEN","icone":0,"niv":3,"slot":4,"slotName":"CHEST","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":1,"desc":"Steigert den Angriff des Helden um 2 Punkte."},{"id":2,"niv":2,"desc":"Steigert die tägliche Produktion von Einheiten der Rangstufe 2 um 2."}]});

    // SPARKLING_GRIFFIN_ARMOR
    addArte({"id":379,"nom":{"de":"Glänzende Greifenrüstung, Stufe 4"},"tagName":"SPARKLING_GRIFFIN_ARMOR","faction":1,"factionName":"HAVEN","icone":0,"niv":4,"slot":4,"slotName":"CHEST","type":0,"typeName":"zoneLoot","effets":[{"id":17,"niv":3,"desc":"Steigert die im Kampf für den Helden gewonnenen EP um 9%."},{"id":26,"niv":1,"desc":"Steigert den Goldertrag um 4%."}]});

    // REFINED_GRIFFIN_ARMOR
    addArte({"id":380,"nom":{"de":"Edle Greifenrüstung, Stufe 5"},"tagName":"REFINED_GRIFFIN_ARMOR","faction":1,"factionName":"HAVEN","icone":0,"niv":5,"slot":4,"slotName":"CHEST","type":0,"typeName":"zoneLoot","effets":[{"id":34,"niv":3,"desc":"Steigert den Verkaufspreis für seltene Rohstoffe beim Kaufmann um 18%."},{"id":26,"niv":2,"desc":"Steigert den Goldertrag um 8%."}]});

    addArte({id:381, tagName:"RUSTY_GRIFFIN_BOOTS"});
    // DULL_GRIFFIN_BOOTS
    addArte({"id":382,"nom":{"de":"Matte Greifenstiefel, Stufe 2"},"tagName":"DULL_GRIFFIN_BOOTS","faction":1,"factionName":"HAVEN","icone":0,"niv":2,"slot":6,"slotName":"FEET","type":0,"typeName":"zoneLoot","effets":[{"id":23,"niv":2,"desc":"Kundschafter erhalten 6 zusätzliche Stufen beim Ausspähen von Gebieten."}]});

    // DARK_GRIFFIN_BOOTS
    addArte({"id":383,"nom":{"de":"Dunkle Greifenstiefel, Stufe 3"},"tagName":"DARK_GRIFFIN_BOOTS","faction":1,"factionName":"HAVEN","icone":0,"niv":3,"slot":6,"slotName":"FEET","type":0,"typeName":"zoneLoot","effets":[{"id":21,"niv":3,"desc":"Kundschafter erhalten 9 zusätzliche Stufen beim Ausspähen von Truppen."}]});

    // SPARKLING_GRIFFIN_BOOTS
    addArte({"id":384,"nom":{"en":"Glänzende Greifenstiefel, Stufe 4"},"tagName":"SPARKLING_GRIFFIN_BOOTS","faction":1,"factionName":"HAVEN","icone":0,"niv":4,"slot":6,"slotName":"FEET","type":0,"typeName":"zoneLoot","effets":[{"id":15,"niv":1,"desc":"Steigert die Verteidigung des Helden um 2 Punkte."},{"id":22,"niv":3,"desc":"Kundschafter erhalten 9 zusätzliche Stufen beim Ausspähen von Städten."}]});

    // REFINED_GRIFFIN_BOOTS
    addArte({"id":385,"nom":{"de":"Edle Greifenstiefel, Stufe 5"},"tagName":"REFINED_GRIFFIN_BOOTS","faction":1,"factionName":"HAVEN","icone":0,"niv":5,"slot":6,"slotName":"FEET","type":0,"typeName":"zoneLoot","effets":[{"id":32,"niv":1,"desc":"Steigert den Edelsteinertrag um 4%."},{"id":1,"niv":2,"desc":"Steigert die tägliche Produktion von Einheiten der Rangstufe 1 um 4."},{"id":57,"niv":2,"desc":"Steigert die Wirksamkeit von defensiven Lichtzaubern um 6%."}]});

    // RUSTY_BURNED_HELMET
    addArte({"id":386,"nom":{"de":"Rostiger Aschehelm, Stufe 1"},"tagName":"RUSTY_BURNED_HELMET","faction":2,"factionName":"INFERNO","icone":0,"niv":1,"slot":0,"slotName":"HEAD","type":0,"typeName":"zoneLoot","effets":[{"id":72,"niv":1,"desc":"Steigert den Angriff aller Schützenabteilungen um 5 Punkte."}]});

    // DULL_BURNED_HELMET
    addArte({"id":387,"nom":{"de":"Matter Aschehelm, Stufe 2"},"tagName":"DULL_BURNED_HELMET","faction":2,"factionName":"INFERNO","icone":0,"niv":2,"slot":0,"slotName":"HEAD","type":0,"typeName":"zoneLoot","effets":[{"id":72,"niv":2,"desc":"Steigert den Angriff aller Schützenabteilungen um 10 Punkte."}]});

    // DARK_BURNED_HELMET
    addArte({"id":388,"nom":{"de":"Dunkler Aschehelm, Stufe 3"},"tagName":"DARK_BURNED_HELMET","faction":2,"factionName":"INFERNO","icone":0,"niv":3,"slot":0,"slotName":"HEAD","type":0,"typeName":"zoneLoot","effets":[{"id":72,"niv":1,"desc":"Steigert den Angriff aller Schützenabteilungen um 5 Punkte."},{"id":1,"niv":2,"desc":"Steigert die tägliche Produktion von Einheiten der Rangstufe 1 um 4."}]});

    // SPARKLING_BURNED_HELMET
    addArte({"id":389,"nom":{"de":"Glänzender Aschehelm, Stufe 4"},"tagName":"SPARKLING_BURNED_HELMET","faction":2,"factionName":"INFERNO","icone":0,"niv":4,"slot":0,"slotName":"HEAD","type":0,"typeName":"zoneLoot","effets":[{"id":72,"niv":2,"desc":"Steigert den Angriff aller Schützenabteilungen um 10 Punkte."},{"id":13,"niv":1,"desc":"Steigert den Angriff des Helden um 2 Punkte."},{"id":31,"niv":1,"desc":"Steigert den Schwefelertrag um 4%."}]});

    // REFINED_BURNED_HELMET
    addArte({"id":390,"nom":{"de":"Edler Aschehelm, Stufe 5"},"tagName":"REFINED_BURNED_HELMET","faction":2,"factionName":"INFERNO","icone":0,"niv":5,"slot":0,"slotName":"HEAD","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":3,"desc":"Steigert den Angriff des Helden um 6 Punkte."},{"id":17,"niv":2,"desc":"Steigert die im Kampf für den Helden gewonnenen EP um 6%."}]});

    addArte({id:391, tagName:"RUSTY_BURNED_CLOAK"});
    // DULL_BURNED_CLOAK
    addArte({"id":392,"nom":{"de":"Matter Aschemantel, Stufe 2"},"tagName":"DULL_BURNED_CLOAK","faction":2,"factionName":"INFERNO","icone":0,"niv":2,"slot":7,"slotName":"CAPE","type":0,"typeName":"zoneLoot","effets":[{"id":17,"niv":2,"desc":"Steigert die im Kampf für den Helden gewonnenen EP um 6%."}]});

    // DARK_BURNED_CLOAK
    addArte({"id":393,"nom":{"de":"Dunkler Aschemantel, Stufe 3"},"tagName":"DARK_BURNED_CLOAK","faction":2,"factionName":"INFERNO","icone":0,"niv":3,"slot":7,"slotName":"CAPE","type":0,"typeName":"zoneLoot","effets":[{"id":17,"niv":2,"desc":"Steigert die im Kampf für den Helden gewonnenen EP um 6%."},{"id":71,"niv":1,"desc":"Steigert den Angriff aller Fußvolkabteilungen um 5 Punkte."}]});

    // SPARKLING_BURNED_CLOAK
    addArte({"id":394,"nom":{"de":"Glänzender Aschemantel, Stufe 4"},"tagName":"SPARKLING_BURNED_CLOAK","faction":2,"factionName":"INFERNO","icone":0,"niv":4,"slot":7,"slotName":"CAPE","type":0,"typeName":"zoneLoot","effets":[{"id":74,"niv":2,"desc":"Steigert die Verteidigung aller Einheiten um 10 Punkte."},{"id":71,"niv":2,"desc":"Steigert den Angriff aller Fußvolkabteilungen um 10 Punkte."}]});

    addArte({id:395, tagName:"REFINED_BURNED_CLOAK"});
    // RUSTY_BURNED_LOCKET
    addArte({"id":396,"nom":{"de":"Rostiges Aschemedaillon, Stufe 1"},"tagName":"RUSTY_BURNED_LOCKET","faction":2,"factionName":"INFERNO","icone":0,"niv":1,"slot":1,"slotName":"NECKLACE","type":0,"typeName":"zoneLoot","effets":[{"id":29,"niv":1,"desc":"Steigert den Quecksilberertrag um 4%."}]});

    // DULL_BURNED_LOCKET
    addArte({"id":397,"nom":{"de":"Mattes Aschemedaillon, Stufe 2"},"tagName":"DULL_BURNED_LOCKET","faction":2,"factionName":"INFERNO","icone":0,"niv":2,"slot":1,"slotName":"NECKLACE","type":0,"typeName":"zoneLoot","effets":[{"id":34,"niv":1,"desc":"Steigert den Verkaufspreis für seltene Rohstoffe beim Kaufmann um 6%."},{"id":24,"niv":1,"desc":"Vermindert die Anwerbungskosten von Helden in den Tavernen um 7%."}]});

    // DARK_BURNED_LOCKET
    addArte({"id":398,"nom":{"de":"Dunkles Aschemedaillon, Stufe 3"},"tagName":"DARK_BURNED_LOCKET","faction":2,"factionName":"INFERNO","icone":0,"niv":3,"slot":1,"slotName":"NECKLACE","type":0,"typeName":"zoneLoot","effets":[{"id":73,"niv":1,"desc":"Steigert den Angriff aller Reitereiabteilungen um 5 Punkte."},{"id":13,"niv":2,"desc":"Steigert den Angriff des Helden um 4 Punkte."}]});

    // SPARKLING_BURNED_LOCKET
    addArte({"id":399,"nom":{"de":"Glänzendes Aschemedaillon, Stufe 4"},"tagName":"SPARKLING_BURNED_LOCKET","faction":2,"factionName":"INFERNO","icone":0,"niv":4,"slot":1,"slotName":"NECKLACE","type":0,"typeName":"zoneLoot","effets":[{"id":73,"niv":2,"desc":"Steigert den Angriff aller Reitereiabteilungen um 10 Punkte."},{"id":13,"niv":1,"desc":"Steigert den Angriff des Helden um 2 Punkte."},{"id":26,"niv":1,"desc":"Steigert den Goldertrag um 4%."}]});

    addArte({id:400, tagName:"REFINED_BURNED_LOCKET"});
    // RUSTY_BURNED_RING
    addArte({"id":401,"nom":{"de":"Rostiger Aschering, Stufe 1"},"tagName":"RUSTY_BURNED_RING","faction":2,"factionName":"INFERNO","icone":0,"niv":1,"slot":2,"slotName":"RING","type":0,"typeName":"zoneLoot","effets":[{"id":42,"niv":1,"desc":"Steigert die Wirksamkeit destruktiver Flächenzauber um 3%."}]});

    // DULL_BURNED_RING
    addArte({"id":402,"nom":{"de":"Matter Aschering, Stufe 2"},"tagName":"DULL_BURNED_RING","faction":2,"factionName":"INFERNO","icone":0,"niv":2,"slot":2,"slotName":"RING","type":0,"typeName":"zoneLoot","effets":[{"id":43,"niv":1,"desc":"Steigert die Wirksamkeit von gegen einzelne Einheiten gerichteten Destruktivzauber um 3%."},{"id":21,"niv":1,"desc":"Kundschafter erhalten 3 zusätzliche Stufen beim Ausspähen von Truppen."}]});

    addArte({id:403, tagName:"DARK_BURNED_RING"});
    addArte({id:404, tagName:"SPARKLING_BURNED_RING"});
    // REFINED_BURNED_RING
    addArte({"id":405,"nom":{"de":"Edler Aschering, Stufe 5"},"tagName":"REFINED_BURNED_RING","faction":2,"factionName":"INFERNO","icone":0,"niv":5,"slot":2,"slotName":"RING","type":0,"typeName":"zoneLoot","effets":[{"id":49,"niv":3,"desc":"Steigert die Wirksamkeit von auf Helden gewirkten Dunkelzaubern um 9%."},{"id":24,"niv":2,"desc":"Vermindert die Anwerbungskosten von Helden in den Tavernen um 14%."}]});

    // RUSTY_BURNED_AXE
    addArte({"id":406,"nom":{"en":"Rostige Ascheaxt, Stufe 1"},"tagName":"RUSTY_BURNED_AXE","faction":2,"factionName":"INFERNO","icone":0,"niv":1,"slot":5,"slotName":"RIGHT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":1,"desc":"Steigert den Angriff des Helden um 2 Punkte."}]});

    // DULL_BURNED_AXE
    addArte({"id":407,"nom":{"en":"Dull burned axe lvl 2"},"tagName":"DULL_BURNED_AXE","faction":2,"factionName":"INFERNO","icone":0,"niv":2,"slot":5,"slotName":"RIGHT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":2,"desc":"Hero attack increased by 4"}]});

    // DARK_BURNED_AXE
    addArte({"id":408,"nom":{"de":"Dunkle Ascheaxt, Stufe 3"},"tagName":"DARK_BURNED_AXE","faction":2,"factionName":"INFERNO","icone":0,"niv":3,"slot":5,"slotName":"RIGHT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":3,"desc":"Steigert den Angriff des Helden um 6 Punkte."}]});

    // SPARKLING_BURNED_AXE
    addArte({"id":409,"nom":{"de":"Glänzende Ascheaxt, Stufe 4"},"tagName":"SPARKLING_BURNED_AXE","faction":2,"factionName":"INFERNO","icone":0,"niv":4,"slot":5,"slotName":"RIGHT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":2,"desc":"Steigert den Angriff des Helden um 4 Punkte."},{"id":49,"niv":2,"desc":"Steigert die Wirksamkeit von auf Helden gewirkten Dunkelzaubern um 6%."}]});

    // REFINED_BURNED_AXE
    addArte({"id":410,"nom":{"de":"Edle Ascheaxt, Stufe 5"},"tagName":"REFINED_BURNED_AXE","faction":2,"factionName":"INFERNO","icone":0,"niv":5,"slot":5,"slotName":"RIGHT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":3,"desc":"Steigert den Angriff des Helden um 6 Punkte."},{"id":74,"niv":2,"desc":"Steigert die Verteidigung aller Einheiten um 10 Punkte."}]});

    // RUSTY_BURNED_SKULL
    addArte({"id":411,"nom":{"de":"Rostiger Ascheschädel, Stufe 1"},"tagName":"RUSTY_BURNED_SKULL","faction":2,"factionName":"INFERNO","icone":0,"niv":1,"slot":3,"slotName":"LEFT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":52,"niv":1,"desc":"Steigert die Wirksamkeit von Dunkelzaubern der Stufe 1 um 9%."}]});

    addArte({id:412, tagName:"DULL_BURNED_SKULL"});
    addArte({id:413, tagName:"DARK_BURNED_SKULL"});
    // SPARKLING_BURNED_SKULL
    addArte({"id":414,"nom":{"de":"Glänzender Ascheschädel, Stufe 4"},"tagName":"SPARKLING_BURNED_SKULL","faction":2,"factionName":"INFERNO","icone":0,"niv":4,"slot":3,"slotName":"LEFT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":43,"niv":2,"desc":"Steigert die Wirksamkeit von gegen einzelne Einheiten gerichteten Destruktivzauber um 6%."},{"id":46,"niv":2,"desc":"Steigert die Wirksamkeit von Destruktivzaubern der Stufe 3 um 12%."}]});

    // REFINED_BURNED_SKULL
    addArte({"id":415,"nom":{"de":"Edler Ascheschädel, Stufe 5"},"tagName":"REFINED_BURNED_SKULL","faction":2,"factionName":"INFERNO","icone":0,"niv":5,"slot":3,"slotName":"LEFT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":48,"niv":3,"desc":"Steigert die Wirksamkeit von Destruktivzaubern der Stufe 5 um 6%."},{"id":56,"niv":1,"desc":"Steigert die Wirksamkeit von Dunkelzaubern der Stufe 5 um 2%."},{"id":17,"niv":1,"desc":"Steigert die im Kampf für den Helden gewonnenen EP um 3%."}]});

    // RUSTY_BURNED_ARMOR
    addArte({"id":416,"nom":{"de":"Rostige Ascherüstung, Stufe 1"},"tagName":"RUSTY_BURNED_ARMOR","faction":2,"factionName":"INFERNO","icone":0,"niv":1,"slot":4,"slotName":"CHEST","type":0,"typeName":"zoneLoot","effets":[{"id":71,"niv":1,"desc":"Steigert den Angriff aller Fußvolkabteilungen um 5 Punkte."}]});

    // DULL_BURNED_ARMOR
    addArte({"id":417,"nom":{"de":"Matte Ascherüstung, Stufe 2"},"tagName":"DULL_BURNED_ARMOR","faction":2,"factionName":"INFERNO","icone":0,"niv":2,"slot":4,"slotName":"CHEST","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":1,"desc":"Steigert den Angriff des Helden um 2 Punkte."},{"id":52,"niv":1,"desc":"Steigert die Wirksamkeit von Dunkelzaubern der Stufe 1 um 9%."}]});

    // DARK_BURNED_ARMOR
    addArte({"id":418,"nom":{"de":"Dunkle Ascherüstung, Stufe 3"},"tagName":"DARK_BURNED_ARMOR","faction":2,"factionName":"INFERNO","icone":0,"niv":3,"slot":4,"slotName":"CHEST","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":2,"desc":"Steigert den Angriff des Helden um 4 Punkte."},{"id":17,"niv":1,"desc":"Steigert die im Kampf für den Helden gewonnenen EP um 3%."}]});

    // SPARKLING_BURNED_ARMOR
    addArte({"id":419,"nom":{"de":"Glänzende Ascherüstung, Stufe 4"},"tagName":"SPARKLING_BURNED_ARMOR","faction":2,"factionName":"INFERNO","icone":0,"niv":4,"slot":4,"slotName":"CHEST","type":0,"typeName":"zoneLoot","effets":[{"id":74,"niv":2,"desc":"Steigert die Verteidigung aller Einheiten um 10 Punkte."},{"id":16,"niv":2,"desc":"Steigert die Verteidigung des Helden um 8%."}]});

    // REFINED_BURNED_ARMOR
    addArte({"id":420,"nom":{"de":"Edle Ascherüstung, Stufe 5"},"tagName":"REFINED_BURNED_ARMOR","faction":2,"factionName":"INFERNO","icone":0,"niv":5,"slot":4,"slotName":"CHEST","type":0,"typeName":"zoneLoot","effets":[{"id":21,"niv":3,"desc":"Kundschafter erhalten 9 zusätzliche Stufen beim Ausspähen von Truppen."},{"id":26,"niv":2,"desc":"Steigert den Goldertrag um 8%."}]});

    // RUSTY_BURNED_BOOTS
    addArte({"id":421,"nom":{"de":"Rostige Aschestiefel, Stufe 1"},"tagName":"RUSTY_BURNED_BOOTS","faction":2,"factionName":"INFERNO","icone":0,"niv":1,"slot":6,"slotName":"FEET","type":0,"typeName":"zoneLoot","effets":[{"id":17,"niv":1,"desc":"Steigert die im Kampf für den Helden gewonnenen EP um 3%."}]});

    // DULL_BURNED_BOOTS
    addArte({"id":422,"nom":{"de":"Matte Aschestiefel, Stufe 2"},"tagName":"DULL_BURNED_BOOTS","faction":2,"factionName":"INFERNO","icone":0,"niv":2,"slot":6,"slotName":"FEET","type":0,"typeName":"zoneLoot","effets":[{"id":20,"niv":2,"desc":"Beschleunigt den Ausbau und die Verbesserung von Bergwerken mit seltenen Rohstoffen um 10%."}]});

    addArte({id:423, tagName:"DARK_BURNED_BOOTS"});
    // SPARKLING_BURNED_BOOTS
    addArte({"id":424,"nom":{"de":"Glänzende Aschestiefel, Stufe 4"},"tagName":"SPARKLING_BURNED_BOOTS","faction":2,"factionName":"INFERNO","icone":0,"niv":4,"slot":6,"slotName":"FEET","type":0,"typeName":"zoneLoot","effets":[{"id":15,"niv":2,"desc":"Steigert die Verteidigung des Helden um 4 Punkte."},{"id":13,"niv":1,"desc":"Steigert den Angriff des Helden um 2 Punkte."},{"id":74,"niv":1,"desc":"Steigert die Verteidigung aller Einheiten um 5 Punkte."}]});

    // RUSTY_CHILLED_HELMET
    addArte({"id":426,"nom":{"de":"Rostiger kalter Helm, Stufe 1"},"tagName":"RUSTY_CHILLED_HELMET","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":1,"slot":0,"slotName":"HEAD","type":0,"typeName":"zoneLoot","effets":[{"id":17,"niv":1,"desc":"Steigert die im Kampf für den Helden gewonnenen EP um 3%."}]});

    addArte({id:427, tagName:"DULL_CHILLED_HELMET"});
    // DARK_CHILLED_HELMET
    addArte({"id":428,"nom":{"de":"Dunkler kalter Helm, Stufe 3"},"tagName":"DARK_CHILLED_HELMET","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":3,"slot":0,"slotName":"HEAD","type":0,"typeName":"zoneLoot","effets":[{"id":33,"niv":2,"desc":"Steigert den Verkaufspreis für gewöhnliche Rohstoffe beim Kaufmann um 12%."},{"id":21,"niv":1,"desc":"Kundschafter erhalten 3 zusätzliche Stufen beim Ausspähen von Truppen."}]});

    // SPARKLING_CHILLED_HELMET
    addArte({"id":429,"nom":{"de":"Glänzender kalter Helm, Stufe 4"},"tagName":"SPARKLING_CHILLED_HELMET","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":4,"slot":0,"slotName":"HEAD","type":0,"typeName":"zoneLoot","effets":[{"id":34,"niv":3,"desc":"Steigert den Verkaufspreis für seltene Rohstoffe beim Kaufmann um 18%."},{"id":24,"niv":1,"desc":"Vermindert die Anwerbungskosten von Helden in den Tavernen um 7%."}]});

    // REFINED_CHILLED_HELMET
    addArte({"id":430,"nom":{"de":"Edler kalter Helm, Stufe 5"},"tagName":"REFINED_CHILLED_HELMET","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":5,"slot":0,"slotName":"HEAD","type":0,"typeName":"zoneLoot","effets":[{"id":16,"niv":3,"desc":"Steigert die Verteidigung des Helden um 12%."},{"id":54,"niv":2,"desc":"Steigert die Wirksamkeit von Dunkelzaubern der Stufe 3 um 12%."}]});

    addArte({id:431, tagName:"RUSTY_CHILLED_CAPE"});
    // DULL_CHILLED_CAPE
    addArte({"id":432,"nom":{"de":"Matter kalter Umhang, Stufe 2"},"tagName":"DULL_CHILLED_CAPE","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":2,"slot":7,"slotName":"CAPE","type":0,"typeName":"zoneLoot","effets":[{"id":28,"niv":1,"desc":"Steigert den Erzertrag um 4%."},{"id":17,"niv":1,"desc":"Steigert die im Kampf für den Helden gewonnenen EP um 3%."}]});

    // DARK_CHILLED_CAPE
    addArte({"id":433,"nom":{"de":"Dunkler kalter Umhang, Stufe 3"},"tagName":"DARK_CHILLED_CAPE","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":3,"slot":7,"slotName":"CAPE","type":0,"typeName":"zoneLoot","effets":[{"id":29,"niv":2,"desc":"Steigert den Quecksilberertrag um 8%."},{"id":20,"niv":1,"desc":"Beschleunigt den Ausbau und die Verbesserung von Bergwerken mit seltenen Rohstoffen um 5%."}]});

    // SPARKLING_CHILLED_CAPE
    addArte({"id":434,"nom":{"de":"Glänzender kalter Umhang, Stufe 4"},"tagName":"SPARKLING_CHILLED_CAPE","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":4,"slot":7,"slotName":"CAPE","type":0,"typeName":"zoneLoot","effets":[{"id":18,"niv":3,"desc":"Beschleunigt den Ausbau und die Verbesserung von Goldbergwerken um 15%."},{"id":13,"niv":1,"desc":"Steigert den Angriff des Helden um 2 Punkte."}]});

    // REFINED_CHILLED_CAPE
    addArte({"id":435,"nom":{"de":"Edler kalter Umhang, Stufe 5"},"tagName":"REFINED_CHILLED_CAPE","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":5,"slot":7,"slotName":"CAPE","type":0,"typeName":"zoneLoot","effets":[{"id":71,"niv":3,"desc":"Steigert den Angriff aller Fußvolkabteilungen um 15 Punkte."},{"id":13,"niv":2,"desc":"Steigert den Angriff des Helden um 4 Punkte."}]});

    addArte({id:436, tagName:"RUSTY_CHILLED_NECKLACE"});
    addArte({id:437, tagName:"DULL_CHILLED_NECKLACE"});
    // DARK_CHILLED_NECKLACE
    addArte({"id":438,"nom":{"en":"Dark chilled necklace lvl 3"},"tagName":"DARK_CHILLED_NECKLACE","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":3,"slot":1,"slotName":"NECKLACE","type":0,"typeName":"zoneLoot","effets":[{"id":67,"niv":2,"desc":"12% increase to level 2 summoning spell effects"},{"id":74,"niv":1,"desc":"All units' defense increased by 5"}]});

    // SPARKLING_CHILLED_NECKLACE
    addArte({"id":439,"nom":{"de":"Glänzende kalte Kette, Stufe 4"},"tagName":"SPARKLING_CHILLED_NECKLACE","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":4,"slot":1,"slotName":"NECKLACE","type":0,"typeName":"zoneLoot","effets":[{"id":56,"niv":3,"desc":"Steigert die Wirksamkeit von Dunkelzaubern der Stufe 5 um 6%."},{"id":51,"niv":1,"desc":"Steigert die Wirksamkeit der Schäden von Dunkelzaubern um 3%."}]});

    // REFINED_CHILLED_NECKLACE
    addArte({"id":440,"nom":{"de":"Edle kalte Kette, Stufe 5"},"tagName":"REFINED_CHILLED_NECKLACE","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":5,"slot":1,"slotName":"NECKLACE","type":0,"typeName":"zoneLoot","effets":[{"id":16,"niv":2,"desc":"Steigert die Verteidigung des Helden um 8%."},{"id":15,"niv":2,"desc":"Steigert die Verteidigung des Helden um 4 Punkte."},{"id":74,"niv":1,"desc":"Steigert die Verteidigung aller Einheiten um 5 Punkte."}]});

    // RUSTY_CHILLED_RING
    addArte({"id":441,"nom":{"de":"Rostiger kalter Ring, Stufe 1"},"tagName":"RUSTY_CHILLED_RING","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":1,"slot":2,"slotName":"RING","type":0,"typeName":"zoneLoot","effets":[{"id":72,"niv":1,"desc":"Steigert den Angriff aller Schützenabteilungen um 5 Punkte."}]});

    // DULL_CHILLED_RING
    addArte({"id":442,"nom":{"de":"Matter kalter Ring, Stufe 2"},"tagName":"DULL_CHILLED_RING","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":2,"slot":2,"slotName":"RING","type":0,"typeName":"zoneLoot","effets":[{"id":71,"niv":2,"desc":"Steigert den Angriff aller Fußvolkabteilungen um 10 Punkte."}]});

    // DARK_CHILLED_RING
    addArte({"id":443,"nom":{"de":"Dunkler kalter Ring, Stufe 3"},"tagName":"DARK_CHILLED_RING","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":3,"slot":2,"slotName":"RING","type":0,"typeName":"zoneLoot","effets":[{"id":6,"niv":3,"desc":"Steigert die tägliche Produktion von Einheiten der Rangstufe 6 um 1."}]});

    addArte({id:444, tagName:"SPARKLING_CHILLED_RING"});
    // REFINED_CHILLED_RING
    addArte({"id":445,"nom":{"de":"Edler kalter Ring, Stufe 5"},"tagName":"REFINED_CHILLED_RING","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":5,"slot":2,"slotName":"RING","type":0,"typeName":"zoneLoot","effets":[{"id":15,"niv":3,"desc":"Steigert die Verteidigung des Helden um 6 Punkte."},{"id":16,"niv":2,"desc":"Steigert die Verteidigung des Helden um 8%."}]});

    // RUSTY_CHILLED_SCYTHE
    addArte({"id":446,"nom":{"de":"Rostige kalte Sense, Stufe 1"},"tagName":"RUSTY_CHILLED_SCYTHE","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":1,"slot":5,"slotName":"RIGHT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":1,"desc":"Steigert den Angriff des Helden um 2 Punkte."}]});

    addArte({id:447, tagName:"DULL_CHILLED_SCYTHE"});
    // DARK_CHILLED_SCYTHE
    addArte({"id":448,"nom":{"de":"Dunkle kalte Sense, Stufe 3"},"tagName":"DARK_CHILLED_SCYTHE","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":3,"slot":5,"slotName":"RIGHT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":2,"desc":"Steigert den Angriff des Helden um 4 Punkte."},{"id":53,"niv":1,"desc":"Steigert die Wirksamkeit von Dunkelzaubern der Stufe 2 um 6%."}]});

    // SPARKLING_CHILLED_SCYTHE
    addArte({"id":449,"nom":{"de":"Glänzende kalte Sense, Stufe 4"},"tagName":"SPARKLING_CHILLED_SCYTHE","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":4,"slot":5,"slotName":"RIGHT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":3,"desc":"Steigert den Angriff des Helden um 6 Punkte."},{"id":66,"niv":1,"desc":"Steigert die Wirksamkeit von Beschwörungszaubern der Stufe 1 um 9%."}]});

    // REFINED_CHILLED_SCYTHE
    addArte({"id":450,"nom":{"de":"Edle kalte Sense, Stufe 5"},"tagName":"REFINED_CHILLED_SCYTHE","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":4,"slot":5,"slotName":"RIGHT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":2,"desc":"Steigert den Angriff des Helden um 4 Punkte."},{"id":68,"niv":2,"desc":"Steigert die Wirksamkeit von Beschwörungszaubern der Stufe 3 um 12%."}]});

    // RUSTY_CHILLED_ARCANE_BOOK
    addArte({"id":451,"nom":{"de":"Rostiges kaltes Buch der Magie, Stufe 1"},"tagName":"RUSTY_CHILLED_ARCANE_BOOK","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":1,"slot":3,"slotName":"LEFT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":66,"niv":1,"desc":"Steigert die Wirksamkeit von Beschwörungszaubern der Stufe 1 um 9%."}]});

    // DULL_CHILLED_ARCANE_BOOK
    addArte({"id":452,"nom":{"de":"Mattes kaltes Buch der Magie, Stufe 2"},"tagName":"DULL_CHILLED_ARCANE_BOOK","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":2,"slot":3,"slotName":"LEFT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":68,"niv":2,"desc":"Steigert die Wirksamkeit von Beschwörungszaubern der Stufe 3 um 12%."}]});

    addArte({id:453, tagName:"DARK_CHILLED_ARCANE_BOOK"});
    // SPARKLING_CHILLED_ARCANE_BOOK
    addArte({"id":454,"nom":{"de":"Glänzendes kaltes Buch der Magie, Stufe 4"},"tagName":"SPARKLING_CHILLED_ARCANE_BOOK","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":4,"slot":3,"slotName":"LEFT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":70,"niv":3,"desc":"Steigert die Wirksamkeit von Beschwörungszaubern der Stufe 5 um 6%."},{"id":21,"niv":1,"desc":"Kundschafter erhalten 3 zusätzliche Stufen beim Ausspähen von Truppen."}]});

    // RUSTY_CHILLED_ARMOR
    addArte({"id":456,"nom":{"de":"Rostige kalte Rüstung, Stufe 1"},"tagName":"RUSTY_CHILLED_ARMOR","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":1,"slot":4,"slotName":"CHEST","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":1,"desc":"Steigert den Angriff des Helden um 2 Punkte."}]});

    // DULL_CHILLED_ARMOR
    addArte({"id":457,"nom":{"de":"Matte kalte Rüstung, Stufe 2"},"tagName":"DULL_CHILLED_ARMOR","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":2,"slot":4,"slotName":"CHEST","type":0,"typeName":"zoneLoot","effets":[{"id":14,"niv":1,"desc":"Erhöht den Angriff des Helden um 2%."},{"id":66,"niv":1,"desc":"Steigert die Wirksamkeit von Beschwörungszaubern der Stufe 1 um 9%."}]});

    addArte({id:458, tagName:"DARK_CHILLED_ARMOR"});
    addArte({id:459, tagName:"SPARKLING_CHILLED_ARMOR"});
    // REFINED_CHILLED_ARMOR
    addArte({"id":460,"nom":{"de":"Edle kalte Rüstung, Stufe 5"},"tagName":"REFINED_CHILLED_ARMOR","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":5,"slot":4,"slotName":"CHEST","type":0,"typeName":"zoneLoot","effets":[{"id":16,"niv":3,"desc":"Steigert die Verteidigung des Helden um 12%."},{"id":13,"niv":2,"desc":"Steigert den Angriff des Helden um 4 Punkte."}]});

    addArte({id:461, tagName:"RUSTY_CHILLED_BOOTS"});
    // DULL_CHILLED_BOOTS
    addArte({"id":462,"nom":{"de":"Matte kalte Stiefel, Stufe 2"},"tagName":"DULL_CHILLED_BOOTS","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":2,"slot":6,"slotName":"FEET","type":0,"typeName":"zoneLoot","effets":[{"id":30,"niv":2,"desc":"Steigert den Kristallertrag um 8%."}]});

    // DARK_CHILLED_BOOTS
    addArte({"id":463,"nom":{"de":"Dunkle kalte Stiefel, Stufe 3"},"tagName":"DARK_CHILLED_BOOTS","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":3,"slot":6,"slotName":"FEET","type":0,"typeName":"zoneLoot","effets":[{"id":22,"niv":2,"desc":"Kundschafter erhalten 6 zusätzliche Stufen beim Ausspähen von Städten."},{"id":24,"niv":1,"desc":"Vermindert die Anwerbungskosten von Helden in den Tavernen um 7%."}]});

    // SPARKLING_CHILLED_BOOTS
    addArte({"id":464,"nom":{"de":"Glänzende kalte Stiefel, Stufe 4"},"tagName":"SPARKLING_CHILLED_BOOTS","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":4,"slot":6,"slotName":"FEET","type":0,"typeName":"zoneLoot","effets":[{"id":34,"niv":3,"desc":"Steigert den Verkaufspreis für seltene Rohstoffe beim Kaufmann um 18%."},{"id":24,"niv":1,"desc":"Vermindert die Anwerbungskosten von Helden in den Tavernen um 7%."}]});

    // REFINED_CHILLED_BOOTS
    addArte({"id":465,"nom":{"de":"Edle kalte Stiefel, Stufe 5"},"tagName":"REFINED_CHILLED_BOOTS","faction":4,"factionName":"NECROPOLIS","icone":0,"niv":5,"slot":6,"slotName":"FEET","type":0,"typeName":"zoneLoot","effets":[{"id":16,"niv":3,"desc":"Steigert die Verteidigung des Helden um 12%."},{"id":74,"niv":2,"desc":"Steigert die Verteidigung aller Einheiten um 10 Punkte."}]});

    // RUSTY_HELMET_OF_KNOWLEDGE
    addArte({"id":466,"nom":{"de":"Rostiger Helm des Wissens, Stufe 1"},"tagName":"RUSTY_HELMET_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":1,"slot":0,"slotName":"HEAD","type":0,"typeName":"zoneLoot","effets":[{"id":66,"niv":1,"desc":"Steigert die Wirksamkeit von Beschwörungszaubern der Stufe 1 um 9%."}]});

    // DULL_HELMET_OF_KNOWLEDGE
    addArte({"id":467,"nom":{"de":"Matter Helm des Wissens, Stufe 2"},"tagName":"DULL_HELMET_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":2,"slot":0,"slotName":"HEAD","type":0,"typeName":"zoneLoot","effets":[{"id":37,"niv":1,"desc":"Steigert die Magie des Helden um 2 Punkte."},{"id":31,"niv":1,"desc":"Steigert den Schwefelertrag um 4%."}]});

    addArte({id:468, tagName:"DARK_HELMET_OF_KNOWLEDGE"});
    // SPARKLING_HELMET_OF_KNOWLEDGE
    addArte({"id":469,"nom":{"de":"Glänzender Helm des Wissens, Stufe 4"},"tagName":"SPARKLING_HELMET_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":4,"slot":0,"slotName":"HEAD","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":2,"desc":"Steigert den Angriff des Helden um 4 Punkte."},{"id":58,"niv":2,"desc":"Steigert die Wirksamkeit von offensiven Lichtzaubern um 6%."}]});

    // REFINED_HELMET_OF_KNOWLEDGE
    addArte({"id":470,"nom":{"de":"Edler Helm des Wissens, Stufe 5"},"tagName":"REFINED_HELMET_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":5,"slot":0,"slotName":"HEAD","type":0,"typeName":"zoneLoot","effets":[{"id":60,"niv":2,"desc":"Steigert die Wirksamkeit von Lichtzaubern der Stufe 2 um 12%."},{"id":26,"niv":2,"desc":"Steigert den Goldertrag um 8%."},{"id":71,"niv":1,"desc":"Steigert den Angriff aller Fußvolkabteilungen um 5 Punkte."}]});

    // RUSTY_SCARF_OF_KNOWLEDGE
    addArte({"id":471,"nom":{"de":"Rostiger Schal des Wissens, Stufe 1"},"tagName":"RUSTY_SCARF_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":1,"slot":7,"slotName":"CAPE","type":0,"typeName":"zoneLoot","effets":[{"id":68,"niv":1,"desc":"Steigert die Wirksamkeit von Beschwörungszaubern der Stufe 3 um 6%."}]});

    // DULL_SCARF_OF_KNOWLEDGE
    addArte({"id":472,"nom":{"de":"Matter Schal des Wissens, Stufe 2"},"tagName":"DULL_SCARF_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":2,"slot":7,"slotName":"CAPE","type":0,"typeName":"zoneLoot","effets":[{"id":1,"niv":2,"desc":"Steigert die tägliche Produktion von Einheiten der Rangstufe 1 um 4."}]});

    // DARK_SCARF_OF_KNOWLEDGE
    addArte({"id":473,"nom":{"de":"Dunkler Schal des Wissens, Stufe 3"},"tagName":"DARK_SCARF_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":3,"slot":7,"slotName":"CAPE","type":0,"typeName":"zoneLoot","effets":[{"id":17,"niv":2,"desc":"Steigert die im Kampf für den Helden gewonnenen EP um 6%."},{"id":15,"niv":1,"desc":"Steigert die Verteidigung des Helden um 2 Punkte."}]});

    addArte({id:474, tagName:"SPARKLING_SCARF_OF_KNOWLEDGE"});
    // REFINED_SCARF_OF_KNOWLEDGE
    addArte({"id":475,"nom":{"de":"Edler Schal des Wissens, Stufe 5"},"tagName":"REFINED_SCARF_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":5,"slot":7,"slotName":"CAPE","type":0,"typeName":"zoneLoot","effets":[{"id":32,"niv":3,"desc":"Steigert den Edelsteinertrag um 12%."},{"id":1,"niv":2,"desc":"Steigert die tägliche Produktion von Einheiten der Rangstufe 1 um 4."}]});

    // RUSTY_ANKH_OF_KNOWLEDGE
    addArte({"id":476,"nom":{"de":"Rostiges Anch des Wissens, Stufe 1"},"tagName":"RUSTY_ANKH_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":1,"slot":1,"slotName":"NECKLACE","type":0,"typeName":"zoneLoot","effets":[{"id":72,"niv":1,"desc":"Steigert den Angriff aller Schützenabteilungen um 5 Punkte."}]});

    // DULL_ANKH_OF_KNOWLEDGE
    addArte({"id":477,"nom":{"de":"Mattes Anch des Wissens, Stufe 2"},"tagName":"DULL_ANKH_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":2,"slot":1,"slotName":"NECKLACE","type":0,"typeName":"zoneLoot","effets":[{"id":72,"niv":2,"desc":"Steigert den Angriff aller Schützenabteilungen um 10 Punkte."}]});

    addArte({id:478, tagName:"DARK_ANKH_OF_KNOWLEDGE"});
    // SPARKLING_ANKH_OF_KNOWLEDGE
    addArte({"id":479,"nom":{"de":"Glänzendes Anch des Wissens, Stufe 4"},"tagName":"SPARKLING_ANKH_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":4,"slot":1,"slotName":"NECKLACE","type":0,"typeName":"zoneLoot","effets":[{"id":70,"niv":3,"desc":"Steigert die Wirksamkeit von Beschwörungszaubern der Stufe 5 um 6%."},{"id":64,"niv":1,"desc":"Steigert die Wirksamkeit von Beschwörungszaubern um 3%."}]});

    addArte({id:480, tagName:"REFINED_ANKH_OF_KNOWLEDGE"});
    // RUSTY_RING_OF_KNOWLEDGE
    addArte({"id":481,"nom":{"de":"Rostiger Ring des Wissens, Stufe 1"},"tagName":"RUSTY_RING_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":1,"slot":2,"slotName":"RING","type":0,"typeName":"zoneLoot","effets":[{"id":32,"niv":1,"desc":"Steigert den Edelsteinertrag um 4%."}]});

    // DULL_RING_OF_KNOWLEDGE
    addArte({"id":482,"nom":{"de":"Matter Ring des Wissens, Stufe 2"},"tagName":"DULL_RING_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":2,"slot":2,"slotName":"RING","type":0,"typeName":"zoneLoot","effets":[{"id":32,"niv":2,"desc":"Steigert den Edelsteinertrag um 8%."}]});

    // DARK_RING_OF_KNOWLEDGE
    addArte({"id":483,"nom":{"de":"Dunkler Ring des Wissens, Stufe 3"},"tagName":"DARK_RING_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":3,"slot":2,"slotName":"RING","type":0,"typeName":"zoneLoot","effets":[{"id":16,"niv":3,"desc":"Steigert die Verteidigung des Helden um 12%."}]});

    addArte({id:484, tagName:"SPARKLING_RING_OF_KNOWLEDGE"});
    // REFINED_RING_OF_KNOWLEDGE
    addArte({"id":485,"nom":{"de":"Edler Ring des Wissens, Stufe 5"},"tagName":"REFINED_RING_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":5,"slot":2,"slotName":"RING","type":0,"typeName":"zoneLoot","effets":[{"id":5,"niv":3,"desc":"Steigert die tägliche Produktion von Einheiten der Rangstufe 5 um 2."},{"id":15,"niv":2,"desc":"Steigert die Verteidigung des Helden um 4 Punkte."}]});

    // RUSTY_STAFF_OF_KNOWLEDGE
    addArte({"id":486,"nom":{"de":"Rostiger Stab des Wissens, Stufe 1"},"tagName":"RUSTY_STAFF_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":1,"slot":5,"slotName":"RIGHT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":17,"niv":1,"desc":"Steigert die im Kampf für den Helden gewonnenen EP um 3%."}]});

    addArte({id:487, tagName:"DULL_STAFF_OF_KNOWLEDGE"});
    // DARK_STAFF_OF_KNOWLEDGE
    addArte({"id":488,"nom":{"de":"Dunkler Stab des Wissens, Stufe 3"},"tagName":"DARK_STAFF_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":3,"slot":5,"slotName":"RIGHT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":57,"niv":2,"desc":"Steigert die Wirksamkeit von defensiven Lichtzaubern um 6%."},{"id":17,"niv":1,"desc":"Steigert die im Kampf für den Helden gewonnenen EP um 3%."}]});

    addArte({id:489, tagName:"SPARKLING_STAFF_OF_KNOWLEDGE"});
    // REFINED_STAFF_OF_KNOWLEDGE
    addArte({"id":490,"nom":{"de":"Edler Stab des Wissens, Stufe 5"},"tagName":"REFINED_STAFF_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":5,"slot":5,"slotName":"RIGHT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":69,"niv":2,"desc":"Steigert die Wirksamkeit von Beschwörungszaubern der Stufe 4 um 6%."},{"id":31,"niv":3,"desc":"Steigert den Schwefelertrag um 12%."}]});

    // RUSTY_LIBRAM_OF_KNOWLEDGE
    addArte({"id":491,"nom":{"de":"Rostiger Buchband des Wissens, Stufe 1"},"tagName":"RUSTY_LIBRAM_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":1,"slot":3,"slotName":"LEFT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":59,"niv":1,"desc":"Steigert die Wirksamkeit von Lichtzaubern der Stufe 1 um 9%."}]});

    addArte({id:492, tagName:"DULL_LIBRAM_OF_KNOWLEDGE"});
    // DARK_LIBRAM_OF_KNOWLEDGE
    addArte({"id":493,"nom":{"de":"Dunkler Buchband des Wissens, Stufe 3"},"tagName":"DARK_LIBRAM_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":3,"slot":3,"slotName":"LEFT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":64,"niv":3,"desc":"Steigert die Wirksamkeit von Beschwörungszaubern um 9%."}]});

    // SPARKLING_LIBRAM_OF_KNOWLEDGE
    addArte({"id":494,"nom":{"de":"Glänzender Buchband des Wissens, Stufe 4"},"tagName":"SPARKLING_LIBRAM_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":4,"slot":3,"slotName":"LEFT_HAND","type":0,"typeName":"zoneLoot","effets":[{"id":69,"niv":3,"desc":"Steigert die Wirksamkeit von Beschwörungszaubern der Stufe 4 um 9%."},{"id":17,"niv":1,"desc":"Steigert die im Kampf für den Helden gewonnenen EP um 3%."}]});

    addArte({id:495, tagName:"REFINED_LIBRAM_OF_KNOWLEDGE"});
    // RUSTY_HARNESS_OF_KNOWLEDGE
    addArte({"id":496,"nom":{"de":"Rostiger Harnisch des Wissens, Stufe 1"},"tagName":"RUSTY_HARNESS_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":1,"slot":4,"slotName":"CHEST","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":1,"desc":"Steigert den Angriff des Helden um 2 Punkte."}]});

    // DULL_HARNESS_OF_KNOWLEDGE
    addArte({"id":497,"nom":{"de":"Matter Harnisch des Wissens, Stufe 2"},"tagName":"DULL_HARNESS_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":2,"slot":4,"slotName":"CHEST","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":1,"desc":"Steigert den Angriff des Helden um 2 Punkte."},{"id":58,"niv":1,"desc":"Steigert die Wirksamkeit von offensiven Lichtzaubern um 3%."}]});

    // DARK_HARNESS_OF_KNOWLEDGE
    addArte({"id":498,"nom":{"de":"Dunkler Harnisch des Wissens, Stufe 3"},"tagName":"DARK_HARNESS_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":3,"slot":4,"slotName":"CHEST","type":0,"typeName":"zoneLoot","effets":[{"id":13,"niv":2,"desc":"Steigert den Angriff des Helden um 4 Punkte."},{"id":61,"niv":1,"desc":"Steigert die Wirksamkeit von Lichtzaubern der Stufe 3 um 6%."}]});

    // SPARKLING_HARNESS_OF_KNOWLEDGE
    addArte({"id":499,"nom":{"de":"Glänzender Harnisch des Wissens, Stufe 4"},"tagName":"SPARKLING_HARNESS_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":4,"slot":4,"slotName":"CHEST","type":0,"typeName":"zoneLoot","effets":[{"id":71,"niv":2,"desc":"Steigert den Angriff aller Fußvolkabteilungen um 10 Punkte."},{"id":16,"niv":2,"desc":"Steigert die Verteidigung des Helden um 8%."}]});

    // REFINED_HARNESS_OF_KNOWLEDGE
    addArte({"id":500,"nom":{"de":"Edler Harnisch des Wissens, Stufe 5"},"tagName":"REFINED_HARNESS_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":5,"slot":4,"slotName":"CHEST","type":0,"typeName":"zoneLoot","effets":[{"id":6,"niv":3,"desc":"Steigert die tägliche Produktion von Einheiten der Rangstufe 6 um 1."},{"id":13,"niv":2,"desc":"Steigert den Angriff des Helden um 4 Punkte."}]});

    // RUSTY_SLIPPER_OF_KNOWLEDGE
    addArte({"id":501,"nom":{"de":"Rostige Pantoffeln des Wissens, Stufe 1"},"tagName":"RUSTY_SLIPPER_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":1,"slot":6,"slotName":"FEET","type":0,"typeName":"zoneLoot","effets":[{"id":73,"niv":1,"desc":"Steigert den Angriff aller Reitereiabteilungen um 5 Punkte."}]});

    // DULL_SLIPPER_OF_KNOWLEDGE
    addArte({"id":502,"nom":{"de":"Matte Pantoffeln des Wissens, Stufe 2"},"tagName":"DULL_SLIPPER_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":2,"slot":6,"slotName":"FEET","type":0,"typeName":"zoneLoot","effets":[{"id":73,"niv":1,"desc":"Steigert den Angriff aller Reitereiabteilungen um 5 Punkte."},{"id":18,"niv":1,"desc":"Beschleunigt den Ausbau und die Verbesserung von Goldbergwerken um 5%."}]});

    addArte({id:503, tagName:"DARK_SLIPPER_OF_KNOWLEDGE"});
    // SPARKLING_SLIPPER_OF_KNOWLEDGE
    addArte({"id":504,"nom":{"de":"Glänzende Pantoffeln des Wissens, Stufe 4"},"tagName":"SPARKLING_SLIPPER_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":4,"slot":6,"slotName":"FEET","type":0,"typeName":"zoneLoot","effets":[{"id":24,"niv":3,"desc":"Vermindert die Anwerbungskosten von Helden in den Tavernen um 21%."},{"id":66,"niv":1,"desc":"Steigert die Wirksamkeit von Beschwörungszaubern der Stufe 1 um 9%."}]});

    // REFINED_SLIPPER_OF_KNOWLEDGE
    addArte({"id":505,"nom":{"de":"Edle Pantoffeln des Wissens, Stufe 5"},"tagName":"REFINED_SLIPPER_OF_KNOWLEDGE","faction":3,"factionName":"ACADEMY","icone":0,"niv":5,"slot":6,"slotName":"FEET","type":0,"typeName":"zoneLoot","effets":[{"id":26,"niv":3,"desc":"Steigert den Goldertrag um 12%."},{"id":15,"niv":2,"desc":"Steigert die Verteidigung des Helden um 4 Punkte."}]});

    for(var ai in newArtes)
    {
      var id = newArtes[ai].id;
      newArtes[ai].id = id;
      newArtes[ai].extern = true;
      unsafeWindow._artefacts[ id ] = newArtes[ai];
    }

    updateArtes("attaquant");
    updateArtes("defenseur");
  }
  
  function updateArtes(camp)
  {
    for(var s in unsafeWindow._slots)
      for(var a in unsafeWindow._artefacts)
        if(unsafeWindow._artefacts[a].slot == s && unsafeWindow._artefacts[a].extern == true)
          $("#arte-" + s + "-" + camp).find('option[text="' + unsafeWindow._artefacts[a].nom[unsafeWindow._langue] + '"]').val( unsafeWindow._artefacts[a].id )
  }

// protect from other scripts
})();
