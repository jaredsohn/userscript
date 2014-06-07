// ==UserScript==
// @name               Tekenen op kaart
// @version             8.4-1.0.0
// @description       Maakt tekenen op kaart en minimap mogelijk
// @namespace      Dei 2012
// @author              Landor Caeyran (DSKORRIDOR)
// @developer         SakeB   
// @include            http://nl*.tribalwars.nl/game.php*screen=map*
// @include            http://nl*.tribalwars.nl/game.php*screen=settings*
// ==/UserScript==



(function() {
  var win = typeof(unsafeWindow) != "undefined" ? unsafeWindow : window;
  var msg = "";
  var ownPid;
  var DSKORRIDOR_VERSION = "8.4-1.0.0";
  var DSKORRIDOR_TECHNICAL_VERSION = DSKORRIDOR_VERSION.split("-")[1].split(".")[0];
  var DSKORRIDOR_SCRIPT_VERSION    = DSKORRIDOR_VERSION.split("-")[1].split(".")[1];
  var DSKORRIDOR_BUGFIX_VERSION    = DSKORRIDOR_VERSION.split("-")[1].split(".")[2];
  
  var TEXTS = {
    nl: {
      gui: {
        title: "Tekenen op kaart",
        settings: {
          titles: { misc: "Aan/uit (schakelen)", KorridorAssist: "Coords invoeren(tekenen)" },
          misc: {
            useKorridor: "tekenen op kaart in schakelen?",
            useMap: "Tekenen op kaart tonen?",
            useMiniMap: "Tekenen op Minimap tonen?",
          },
        },
        Korridors: {
          Id: "Id",
          FontColor: "Kleur</br>Text",
          LineColor: "Kleur</br>Lijn",
          LineWidth: "Kaart</br>Lijn dikte",
          MiniMapLineWidth: "Minimap</br>Lijn dikte",
          Font: "Kaart</br>Schrift",
          MiniMapFont: "Minmap</br>Schrift",
          Coords: "Coördinaten",
          Aktiv: "Actief",
        },
       Korridor: "Korridor",
        variantName: "Naam",
        enterName: "Naam invoeren.",
        nameExists: "Deze naam bestaat al!",
        delVariant: "Variante verwijderen",
        addVariant: "Variatie toevoegen",
        confirmDeleteVariant: "Variatie echt verwijderen?",
        confirm_delAll: "Echt de data van deze wereld verwijderen?",
        allDataDeleted: "Alle data verwijderd!",
        savebutton: "Opslaan",
        importbutton: "Data importeren",
        exportbutton: "Data exporteren",
        deletebutton: "Data verwijderen",
        
        startimport: "Importeren",
        importTitle: "Import",
        exportTitle: "Export",
        exportGroups: { title: "Welke Data exporteren?", 
                        settings: "Instellingen", 
                        variants: "Tekeningen",
                      },
        unknowVersion: "Onbekende versie",
        wrongFormat: "verkeerde Format",
        importDone: "De Data is geimporteert",
        incompleteExp: "De data is niet voledig (sorry)",
        wrongworld: "Deze data is voor een andere Server",
        unsupportedVersion: "De data voor deze versie wordt niet ondersteund",
        close: "Sluiten",
        settingsSaved: "Tekenen op kaart-Instellingen opgeslagen!",
        forumThread: "http://www.colorpicker.com/",
      },
      regex: {
        settings: /Instellingen/,
      },
    },
	};
 var lib = new LCDSLib("lcxdskorridor",false,false);   
  if( lib.game_data ) {
    var res = lib.game_data.version.match(/\d+ (\d+)\.(\d+)/);
    if( res && res[1] < 7) 
      return;
  };
  if( typeof(TEXTS[lib.lang]) == "undefined" ) {
    alert( "Tekenen op kaart:\nLanguage not supported!" );
    return;
  };
 
  var isUV = !isNaN(parseInt(lib.params.t,10));
  
  var VariantEdit = function(parent,fields,fieldWidth,varKey) {
    var THIS = this;
    this.insertHeadCol = function(obj) {
      cell = row.appendChild(ce("th"));
      if( obj.img ) {
        var img = cell.appendChild(ce("img"));
        img.src = obj.img;
        img.alt = obj.title;
        img.title = obj.title;
        cell.style.textAlign = "center";
      }
      else
        cell.innerHTML = obj.title;
    }
    this.insertRow = function(variant) {
      var name = "";
      if( !variant ) {
        var title = TEXTS[lib.lang].gui.enterName;
        for(;;) {
          name = prompt(title);
          if( name === null )
            return;
          if( name.length > 0 ) {
            for( var i = 1; i < tab.rows.length; i++ ) {
              if( tab.rows[i].cells[1].lastChild.value == name ) {
                title = TEXTS[lib.lang].gui.nameExists;
                break;
              }
            }
            if( i == tab.rows.length )
              break;
          }
          else
            title = TEXTS[lib.lang].gui.enterName;
        }
      }
      else
        name = variant.name;
      row = tab.insertRow(-1);
      if( variant )
        row.id = "dskorridor_"+varKey+"_"+(row.rowIndex-1);
      row.style.whiteSpace = "nowrap";

     
      cell = row.insertCell(-1);
      a = cell.appendChild(ce("a"));
      a.innerHTML = "X";
      a.style.color = "#FF0000";
      a.href = "javascript:;";
      a.title = TEXTS[lib.lang].gui.delVariant;
      a.addEventListener("click", THIS.deleteVariant, false); 
      
      cell = row.insertCell(-1);
      input = cell.appendChild(ce("input"));
      input.type = "text";
      input.style.width = "60px";
      input.value = name;
      input.addEventListener("change", function(e) {
          if( this.value.length == 0 ) {
            alert( TEXTS[lib.lang].gui.enterName );
            return false;
          }
          var tab = getByTagName(this,"table","parentNode");
          var row = getByTagName(this,"tr","parentNode");
          for( var i = 1; i < tab.rows.length; i++ ) {
            if( row.rowIndex != i && this.value == tab.rows[i].cells[0].lastChild.value ) {
              alert( TEXTS[lib.lang].gui.nameExists );
            }
          }        
        }, false );
      if( !variant )
        input.focus();            
      for( j = 0; j < fields.length; j++ ) {
        cell = row.insertCell(-1);
        cell.style.width = fieldWidth;
        switch (fields[j].FieldType) {
          case "Checkbox":
            input = ce("input");
            input.type = "checkbox";
            input.name = fields[j].key;
            input.value =   fields[j].key;
            input.checked = variant ? variant[fields[j].key] : fields[j].newVal;          
            win.aaaa = input;
            cell.appendChild(input);
            input.addEventListener("change",function(e){ 
              var idx = this.parentNode.cellIndex-1;
            },false);     
            input.style.width = fields[j].SetWidth ? fields[j].FieldWitdh : fieldWidth;
            break;
          default:
            input = ce("input");
            input.type = "text";
            input.name = fields[j].key;
            input.value = variant ? variant[fields[j].key] : fields[j].newVal;
            cell.appendChild(input);
            input.addEventListener("change",function(e){ 
              var idx = this.parentNode.cellIndex-1;
            },false);     
            input.style.width = fields[j].SetWidth ? fields[j].FieldWitdh : fieldWidth;
            break;
        };     
      } 
    }
    this.deleteVariant = function(e) {
      var row = getByTagName(e.target,"tr","parentNode");
      if( row.id != "" ) {
        var idx = row.id.split("_");
        idx = parseInt(idx[idx.length-1],10);
        Settings[varKey].assigns = Settings[varKey].assigns.replace(new RegExp(";\\d+,"+Settings[varKey].variants[idx].id+";"),";");
      }
      row.parentNode.removeChild(row);
      Settings[varKey].variants.splice(idx,1);
    }
    this.save = function() {
      var nextId = 1;       
      for( var i = 0; i < Settings[varKey].variants.length; i++ ) {
        if( Settings[varKey].variants[i].id >= nextId )
          nextId = Settings[varKey].variants[i].id + 1;
      }
      for( var i = 1; i < tab.rows.length; i++ ) {
        if( i-1 == Settings[varKey].variants.length )
          Settings[varKey].variants.push( {id: nextId++ } );
        Settings[varKey].variants[i-1].name = tab.rows[i].cells[1].lastChild.value;
        for( var j = 0; j < fields.length; j++ ) {
          switch (tab.rows[i].cells[j+2].firstChild.type) {
            case "checkbox":
              Settings[varKey].variants[i-1][fields[j].key] = tab.rows[i].cells[j+2].firstChild.checked;
              break;
            default:       
              Settings[varKey].variants[i-1][fields[j].key] = tab.rows[i].cells[j+2].firstChild.value;
              break;
		  };  
	    };
      }
      lib.storage.setValue(varKey+ownPid,Settings[varKey]);
    }
    
    var tab = parent.appendChild(ce("table"));
    tab.className = "vis";
    var row = tab.insertRow(-1);
    row.style.whiteSpace = "nowrap";
    cell = row.appendChild(ce("th"));
    cell.innerHTML = "X";
    cell.style.color = "#FF0000";
    cell = row.appendChild(ce("th"));
    cell.innerHTML = TEXTS[lib.lang].gui.variantName;
    for( var i = 0; i < fields.length; i++ )
      this.insertHeadCol(fields[i]);
    var input; 
    for( i = 0;  i < Settings[varKey].variants.length; i++ )
      this.insertRow(Settings[varKey].variants[i]);
    var a = parent.appendChild(ce("a"));
    a.href = "javascript:;";
    a.innerHTML = "&raquo; " + TEXTS[lib.lang].gui.addVariant;
    a.addEventListener("click", function(e) { THIS.insertRow(); }, false );
  }

  
  var Korridor = {
    MiniMapMopX : 0,
    MiniMapMopY : 0,
    MapMopX : 0,
    MapMopY : 0,
    doIt : function () {
      Korridor.MiniMapInit();
      Korridor.MapInit();
    },
    MapInit : function () {
      if( lib.params.screen == "map") {
        if( Settings.settings.misc.useMap && Settings.settings.misc.useKorridor )
          setInterval(function() { Korridor.MapWatch(); }, 1000);
      };
    },
    MiniMapInit : function () {
      if( lib.params.screen == "map") {
        if( Settings.settings.misc.useMiniMap && Settings.settings.misc.useKorridor ) {
          setInterval(function() { Korridor.MiniMapWatch(); },1000);
        }
      };
    },
    MapWatch : function() {
      var x = win.TWMap.map.pos[0];
      var y = win.TWMap.map.pos[1];
      if( !win.TWMap.scrolling && (Korridor.MapMopX != x || Korridor.MapMopY != y) ) {
        Korridor.MapMopX = x;
        Korridor.MapMopY = y;
        Korridor.MapUpdateOverlays();
      };
    },
    MiniMapWatch : function () {
      var x = win.TWMap.minimap.pos[0];
      var y = win.TWMap.minimap.pos[1];
      if( !win.TWMap.scrolling && (Korridor.MiniMapMopX != x || Korridor.MiniMapMopY != y) ) {
        Korridor.MiniMapMopX = x;
        Korridor.MiniMapMopY = y;
        Korridor.MiniMapUpdateOverlays();
      };
    },
    MapUpdateOverlays : function() { 
      for( var key in win.TWMap.map._visibleSectors ) {
        var sector = win.TWMap.map._visibleSectors[key];

        var el = $("DSKorridor_map_canvas_"+key);
        if( ! el ) {
          var canvas = ce("canvas");
          canvas.style.position = "absolute";
          canvas.width = "265";
          canvas.height = "190";
          canvas.style.zIndex = 100;
          canvas.className = "DSKorridor_map_canvas";
          canvas.id = "DSKorridor_map_canvas_"+key;
          Korridor.MapCreateTopokorridorOverlay(canvas,sector);
          sector.appendElement(canvas);
        }
      };  
    },
    MiniMapUpdateOverlays : function () {
      for( var key in win.TWMap.minimap._visibleSectors ) {
        var sector = win.TWMap.minimap._visibleSectors[key];
        var el = $("DsKorridor_minimap_canvas_"+key);
        if( ! el ) {
          var canvas = ce("canvas");
          canvas.style.position = "absolute";
          canvas.width = "250";
          canvas.height = "250";
          canvas.style.zIndex = 100;
          canvas.className = "DsKorridor_minimap_canvas";
          canvas.id = "DsKorridor_minimap_canvas_"+key;
          Korridor.MiniMapCreateTopokorridorOverlay(canvas,sector);
          sector.appendElement(canvas);
        }
      };  
    },
    MapCreateTopokorridorOverlay : function(canvas,sector) {
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.save();
      var x = 0 - sector.x * 53 + 26.5;
      var y = 0 - sector.y * 38 + 15;      
      for(var Z1 = 0;  Z1 < Settings.KorridorAssist.variants.length; Z1 ++) {
		ctx.restore();
		ctx.lineWidth = Settings.KorridorAssist.variants[Z1].LineWidth;
		ctx.strokeStyle = Settings.KorridorAssist.variants[Z1].LineColor;
		ctx.fillStyle = Settings.KorridorAssist.variants[Z1].FontColor
		ctx.font = Settings.KorridorAssist.variants[Z1].Font;
		ctx.beginPath();
		if (Settings.KorridorAssist.variants[Z1].Aktiv) {		
		  var CoordsArray = Settings.KorridorAssist.variants[Z1].Coords.split(',');;
		  ctx.moveTo(x+CoordsArray[0]*53,y+CoordsArray[1]*38);
		  ctx.fillText(Settings.KorridorAssist.variants[Z1].name, x+CoordsArray[0]*53, y+CoordsArray[1]*38);
		  for( var j = 0; j < CoordsArray.length; j += 2) {
			ctx.lineTo(x+CoordsArray[j]*53, y+CoordsArray[j+1]*38);
			ctx.fillText(Settings.KorridorAssist.variants[Z1].name, x+CoordsArray[j]*53, y+CoordsArray[j+1]*38);
			var XAfter = CoordsArray[j+2];
			var YAfter = CoordsArray[j+3];
			var XDifferenz = XAfter - CoordsArray[j];
			var YDifferenz = YAfter - CoordsArray[j+1];
			var XFaktor = 0;
			var XNewPoint = 0;
			if (!isNaN(XDifferenz)) {
			  XFaktor = XDifferenz / 2;
			  XNewPoint = parseInt(CoordsArray[j], 10) + XFaktor;
			};
			if (XDifferenz == 0 ) {
			  XNewPoint = parseInt(CoordsArray[j], 10);
			};

			var YFaktor = 0;
			var YNewPoint = 0;
			if (!isNaN(YDifferenz)) {
			  YFaktor = YDifferenz / 2;
			  YNewPoint = parseInt(CoordsArray[j+1], 10) + YFaktor;
			};
			if (YDifferenz == 0 ) {
			  YNewPoint = parseInt(CoordsArray[j+1], 10);
			};
			if (XNewPoint !=0 || YNewPoint != 0) {
			  ctx.fillText(Settings.KorridorAssist.variants[Z1].name, x+XNewPoint*53, y+YNewPoint*38);
			};
		  };
		  ctx.closePath();
		  ctx.stroke();
		};
      };
    },
    MiniMapCreateTopokorridorOverlay : function(canvas,sector) {
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.save();
      var x = 0 - sector.x * 5 + 0.5;
      var y = 0 - sector.y * 5 + 0.5;      
      for(var Z1 = 0;  Z1 < Settings.KorridorAssist.variants.length; Z1 ++) {
		ctx.restore();
		ctx.lineWidth = Settings.KorridorAssist.variants[Z1].MiniMapLineWidth;
		ctx.strokeStyle = Settings.KorridorAssist.variants[Z1].LineColor;
		ctx.fillStyle = Settings.KorridorAssist.variants[Z1].FontColor
		ctx.font = Settings.KorridorAssist.variants[Z1].MiniMapFont;
		ctx.beginPath();
		
		if (Settings.KorridorAssist.variants[Z1].Aktiv) {	
		  var CoordsArray = Settings.KorridorAssist.variants[Z1].Coords.split(',');;
		  ctx.moveTo(x+CoordsArray[0]*5,y+CoordsArray[1]*5);
          ctx.fillText(Settings.KorridorAssist.variants[Z1].name, x+CoordsArray[0]*5, y+CoordsArray[1]*5);
		  for( var j = 0; j < CoordsArray.length; j += 2) {
            ctx.lineTo(x+CoordsArray[j]*5, y+CoordsArray[j+1]*5);
            ctx.fillText(Settings.KorridorAssist.variants[Z1].name, x+CoordsArray[j]*5, y+CoordsArray[j+1]*5);
            var XAfter = CoordsArray[j+2];
            var YAfter = CoordsArray[j+3];
            var XDifferenz = XAfter - CoordsArray[j];
            var YDifferenz = YAfter - CoordsArray[j+1];
            var XFaktor = 0;
            var XNewPoint = 0;
            if (!isNaN(XDifferenz)) {
              XFaktor = XDifferenz / 2;
              XNewPoint = parseInt(CoordsArray[j], 10) + XFaktor;
            };
            if (XDifferenz == 0 ) {
              XNewPoint = parseInt(CoordsArray[j], 10);
            };

            var YFaktor = 0;
            var YNewPoint = 0;
            if (!isNaN(YDifferenz)) {
              YFaktor = YDifferenz / 2;
              YNewPoint = parseInt(CoordsArray[j+1], 10) + YFaktor;
            };
            if (YDifferenz == 0 ) {
              YNewPoint = parseInt(CoordsArray[j+1], 10);
            };
            if (XNewPoint !=0 || YNewPoint != 0) {
              ctx.fillText(Settings.KorridorAssist.variants[Z1].name, x+XNewPoint*5, y+YNewPoint*5);
            };
  		  };
          ctx.closePath();
          ctx.stroke();
        };
      };
    }
  };   
  var Settings = {
    settings: {},
    defSettings : {
      "misc": {
        confirmQueue: true,
        useKorridor: true,
        useMap: true,
        useMiniMap: true,
      },
    },
    impExpPopup : null,
    exportPopup : null,
    exportGroups : { settings: "flSort\\d+|showFl\\d+|coordlist\\d+|exportGroups\\d+|settings\\d+|kataOrder\\d+|checkedUnits\\d+|drillqueueMode\\d+|dst\\d+|farmsort\\d+|groupsOnTopo\\d+|otherOvl\\d+|ownOvl\\d+|redirTarget\\d+|reportorder\\d+|smallQueue\\d+|unitSelect\\d+|unitSum\\d+|useeq\\d+|vilgrp\\d+|villageorder\\d+|bbcode\\d+|topo\\d+|mapopts\\d+|unitFilter\\d+|sounds", variants: "KorridorAssist\\d+", },
    KorridorAssist: { variants:[], assigns: "" },
    variantEdit : { KorridorAssist: null},
    doIt : function() {
      Settings.settings = lib.storage.getValue("settings"+ownPid,Settings.defSettings);
      Settings.KorridorAssist = lib.storage.getValue("KorridorAssist"+ownPid, Settings.KorridorAssist);
      
      if( lib.params.screen == "settings" && lib.params.mode == "settings" ) {
        var val = Settings.settings.misc.confirmQueue;
        var chk = document.getElementsByName("confirm_queue")[0];
        if( chk )
          Settings.settings.misc.confirmQueue = chk.checked;
        if( val != Settings.settings.misc.confirmQueue )
          lib.storage.setValue("settings"+ownPid,Settings.settings);
        Settings.showSettings();
      }
    },
    showSettings : function() {
      var e = document.getElementsByTagName("h3");
      for( var i = 0; i < e.length; e++ ) {
        if( TEXTS[lib.lang].regex.settings.test(e[i].innerHTML) ) {
          e = e[i].parentNode;
          break;
        }
      }
      var p = e.appendChild(ce("p"));
      e = p.appendChild(ce("form"));
      e.name="DSKorridorSettingsFrm";
      e.action = "javascript:;";
      e = e.appendChild(ce("table"));
      e.style.border = "1px solid rgb(222, 211, 185)";
      e.className = "vis";
      e.style.width = "100%";
      var row = e.insertRow(e.rows.length);
      var cell = row.appendChild(ce("th"));
      var a = cell.appendChild(ce("a"));
      a.href = TEXTS[lib.lang].gui.forumThread;;
      a.textContent = TEXTS[lib.lang].gui.title + " " + DSKORRIDOR_VERSION;
      a.target = "_blank";
      cell.colSpan = 2;

      row = e.insertRow(e.rows.length);
      var tabsCell = row.insertCell(0);

      row = e.insertRow(e.rows.length);
      var divCell = row.insertCell(0);
      divCell.style.verticalAlign = "top";

      for( var key in TEXTS[lib.lang].gui.settings.titles ) {
        var span = tabsCell.appendChild(ce("span"));
        span.style.paddingRight = "20px";
        var a = span.appendChild(ce("a"));
        a.href = "javascript:;";
        a.id = "dskorridor_"+key;
        a.innerHTML = TEXTS[lib.lang].gui.settings.titles[key];
        a.addEventListener("click", Settings.showTab, false);
        var tab = divCell.appendChild(ce("table"));
        tab.id = "dskorridor_"+key+"_tab";
        tab.className="vis";
        tab.style.width = "100%";
        tab.style.display = "none";
        Settings["create_"+key+"Form"]();
      }

      row = e.insertRow(e.rows.length);
      cell = row.insertCell(0);
      cell.colSpan = 5;
      var input = cell.appendChild(ce("input"));
      input.type = "button";
      input.value = TEXTS[lib.lang].gui.savebutton;
      input.name = "dskorridor_save";
      input.addEventListener("click", Settings.save, false);
      input = cell.appendChild(ce("input"));
      input.type = "button";
      input.value = TEXTS[lib.lang].gui.exportbutton;
      input.name = "dskorridor_export";
      input.addEventListener("click", function() { Settings.exportPopup.show(); }, false);

      input = cell.appendChild(ce("input"));
      input.type = "button";
      input.value = TEXTS[lib.lang].gui.importbutton;
      input.name = "dskorridor_import";
      input.addEventListener("click", function() { Settings.showImpExpForm(true) }, false);
      input = cell.appendChild(ce("input"));
      input.type = "button";
      input.value = TEXTS[lib.lang].gui.deletebutton;
      input.name = "dskorridor_delete";
      input.addEventListener("click", function() { clearAllInfos(); }, false);
      
      
      Settings.impExpPopup = new lib.Popup("impexp_popup","",true,600,400);
      html = '<table style="width:600px; height:400px;">';
      html += '<tr height="100%"><td><textarea onclick="this.select()" id="dskorridor_impexp_report" style="width:595px; height:100%;"></textarea></td></tr>';
      html += '<tr><td id="dskorridor_impexp_desc"></td></tr>';
      html += '<tr id="dskorridor_impbtn_row"><td style="text-align:center"><input id="dskorridor_import_btn" type="button" value="'+TEXTS[lib.lang].gui.startimport+'"/></td></tr>';
      html += '</table>';
      Settings.impExpPopup.content.innerHTML = html;
      $("dskorridor_import_btn").addEventListener("click", Settings.importData, false);

      tab = p.appendChild(document.createElement("table"));
      row = tab.insertRow(-1);

      lib.fireEvent($("dskorridor_"+lib.storage.getValue("settingsTab"+ownPid,"misc")),"click");
      
      Settings.exportPopup = new lib.Popup("exportGroups",TEXTS[lib.lang].gui.exportGroups.title,true,400,300);
      var tab = Settings.exportPopup.content.appendChild(ce("table"));
      var exportGroups = lib.storage.getValue("exportGroups"+ownPid,"settings,variants");
      for( var key in Settings.exportGroups ) {
        row = tab.insertRow(-1);
        cell = row.insertCell(-1);
        input = cell.appendChild(ce("input"));
        input.type = "checkbox";
        input.value = key;
        input.checked = exportGroups.indexOf(key+",")>-1;
        cell.appendChild(document.createTextNode(TEXTS[lib.lang].gui.exportGroups[key]));
      }
      row = tab.insertRow(-1);
      cell = row.insertCell(-1);
      input = cell.appendChild(ce("input"));
      input.type = "button";
      input.value = TEXTS[lib.lang].gui.exportbutton;
      input.addEventListener("click",Settings.exportData,false);
    },
    create_miscForm : function() {
      var tab = $("dskorridor_misc_tab");
      if (tab) {
        Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"misc","useKorridor");
        Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"misc","useMap");
        Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"misc","useMiniMap");
      };
    },
    create_KorridorAssistForm : function() {
      var tab = $("dskorridor_KorridorAssist_tab");
      if (tab) {      
        var fields = [];
        fields.push( { title: TEXTS[lib.lang].gui.Korridors.Aktiv,             key: "Aktiv",            newVal: "checked",      SetWidth: false, FieldWitdh: "0"    , FieldType: "Checkbox" } ); 
        fields.push( { title: TEXTS[lib.lang].gui.Korridors.LineColor,         key: "LineColor",        newVal: "black",        SetWidth: false, FieldWitdh: "0"    , FieldType: "Input" } ); 
        fields.push( { title: TEXTS[lib.lang].gui.Korridors.FontColor,         key: "FontColor",        newVal: "#FAF5F7",        SetWidth: false, FieldWitdh: "0"    , FieldType: "Input" } ); 
        fields.push( { title: TEXTS[lib.lang].gui.Korridors.LineWidth,         key: "LineWidth",        newVal: 2,              SetWidth: false, FieldWitdh: "0"    , FieldType: "Input" } );
        fields.push( { title: TEXTS[lib.lang].gui.Korridors.MiniMapLineWidth,  key: "MiniMapLineWidth", newVal: 2,              SetWidth: false, FieldWitdh: "0"    , FieldType: "Input" } );
        fields.push( { title: TEXTS[lib.lang].gui.Korridors.Font,              key: "Font",             newVal: "20px 'arial'", SetWidth: false, FieldWitdh: "0"    , FieldType: "Input" } );
        fields.push( { title: TEXTS[lib.lang].gui.Korridors.MiniMapFont,       key: "MiniMapFont",      newVal: "13px 'arial'", SetWidth: false, FieldWitdh: "0"    , FieldType: "Input" } );
        fields.push( { title: TEXTS[lib.lang].gui.Korridors.Coords,            key: "Coords",           newVal: "0,0 ,",          SetWidth: true,  FieldWitdh: "550px", FieldType: "Input" } );

        Settings.variantEdit.KorridorAssist = new VariantEdit(tab,fields,"40px","KorridorAssist");     
      };
    },
    insertCheckBox : function(parent,grp,key) {
      var input = parent.appendChild(ce("input"));
      input.type = "checkbox";
      input.id = "dskorridor_"+grp+key;
      input.checked = Settings.settings[grp][key];
      parent.appendChild(document.createTextNode(TEXTS[lib.lang].gui.settings[grp][key]));
    },
    showTab : function() {
      var tab = this.parentNode.parentNode.parentNode.parentNode;
      var curTab = tab.getElementsByClassName("selected")[0];
      if( curTab )
        curTab = curTab.firstChild;
      if( !curTab || this.id != curTab.id ) {
        if( curTab ) {
          curTab.parentNode.className = "";
          $(curTab.id+"_tab").style.display = "none";
        }
        this.parentNode.className = "selected";
        $(this.id+"_tab").style.display = "";
        lib.storage.setValue("settingsTab"+ownPid,this.id.substr(11));
      }
    },
    showImpExpForm : function(isImport) {
      Settings.impExpPopup.setTitle(TEXTS[lib.lang].gui.title + " - " + (isImport ? TEXTS[lib.lang].gui.importTitle : TEXTS[lib.lang].gui.exportTitle));
      $("dskorridor_impexp_report").innerHTML = "";
      $("dskorridor_impbtn_row").style.display = isImport ? "" : "none";
      Settings.impExpPopup.show();
    },
    exportData : function() {
      var str = "LcKorridorExp\n"+DSKORRIDOR_VERSION+"\n"+lib.server+"\n";
      var inputs = Settings.exportPopup.content.getElementsByTagName("input");
      var re = "";
      var groups = "";
      for( var i = 0;  i < inputs.length - 1; i++ ) {
        if( inputs[i].checked ) {
          if( re.length > 0 )
            re+= "|";
          re += Settings.exportGroups[inputs[i].value];
          groups += inputs[i].value+",";
        }
      }
      lib.storage.setValue("exportGroups"+ownPid,groups);
      Settings.exportPopup.hide();
      var vals = lib.storage.listValues("^"+re+"$");
      for(var i = 0; i < vals.length; i++ )
        str += vals[i]+":"+lib.storage.getString(vals[i])+"\n";
      str += "LcKorridorExp";
      var div = $("dskorridor_impexp_div");
      Settings.showImpExpForm(false);
      $("dskorridor_impexp_report").value = str;
    },
    importData : function() {
      var lines = $("dskorridor_impexp_report").value.replace(/\r\n/g,"\n").replace(/\n\r/g,"\n").split("\n");
      if( lines[0] == "LcKorridorExp" ) {
        var partA = lines[1].split('-');
        if (typeof partA[1] != 'undefined') {
          var DSKORRIDOR_TECHNICAL_VERSIONImport = parseInt(partA[1].split(".")[0],10);
        } else {
          var DSKORRIDOR_TECHNICAL_VERSIONImport = 0;
        };
        if( DSKORRIDOR_TECHNICAL_VERSIONImport == 1) {
          if( lines[2] == lib.server ) {
            if( lines[lines.length-1] != "LcKorridorExp" )
              alert(TEXTS[lib.lang].gui.incompleteExp);
            for( var i = 2; i < lines.length; i++ ) {
              var parts = lines[i].split(":");
              if( parts.length > 1 ) {
                var name = parts[0];
                parts = parts.splice( 1 );
                var value = parts.join(":");
                lib.storage.setString(name,value);
              }
            }
            lib.storage.setValue("version"+ownPid,"");
            alert( TEXTS[lib.lang].gui.importDone );          
            var dsfmImpExpDiv = $("lcxdskorridor_impexp_popup");
            if (dsfmImpExpDiv) {
              dsfmImpExpDiv.style.display="none"; 
            };
            var dsfmShadowDiv = $("dskorridor_shadow_div")
            if (dsfmShadowDiv) {
              dsfmShadowDiv.style.display="none";
            };
          }
          else
            alert(TEXTS[lib.lang].gui.wrongworld);
        }
        else
          alert( TEXTS[lib.lang].gui.unsupportedVersion );
      }
      else {
        alert( TEXTS[lib.lang].gui.wrongFormat );
      }
    },
    save : function() {
      Settings.saveSettings();
      Settings.variantEdit.KorridorAssist.save();
      alert( TEXTS[lib.lang].gui.settingsSaved );
    },
    saveSettings : function() {
      for( var grp in Settings.settings ) {
          for( var key in Settings.settings[grp] ) {
            var input = $("dskorridor_"+grp+key);
            if( !input ) {
              if( !(grp == "storage" && key == "colors") )
                delete Settings.settings[grp][key];
            }
            else {
              if( input.type == "checkbox" )
                Settings.settings[grp][key] = input.checked;
              else {
                Settings.settings[grp][key] = parseInt(input.value, 10);
                if( isNaN(Settings.settings[grp][key]) )
                  Settings.settings[grp][key] = 0;
              }
            }
          }
      }
      lib.storage.setValue("settings"+ownPid,Settings.settings);
    },
  };
  
  if( lib.game_data ) {
    ownPid = parseInt(lib.game_data.player.id,10);
  }
  if( isUV )
    ownPid = parseInt(lib.params.t,10);



  function clearAllInfos() {
    if( confirm( TEXTS[lib.lang].gui.confirm_delAll ) ) {
      lib.storage.clear();
      alert( TEXTS[lib.lang].gui.allDataDeleted );
    }
  }
  run();
  function run() {
    Settings.doIt();  
    Korridor.doIt();       
  };
  function $(id) {
    return document.getElementById(id);
  };
  function ce(name) {
    return document.createElement(name);
  };
  function getByTagName(node,nodeName,what,count) {
    if( typeof count == "undefined" )
      count = 1;
    nodeName = nodeName.toUpperCase();
    node = node[what];
    if( what == "firstChild" )
      what = "nextSibling";
    else if( what == "lastChild" )
      what = "previousSibling";
    while( node && node.nodeName.toUpperCase() != nodeName )
      node = node[what];
    if( count == 1 )
      return node;
    else
      return getByTagName(node,nodeName,what,count-1);
  }  
  function LCDSLib(prefix,forceGM,useIdx) {
    var lib = this;
    this.prefix = prefix;
    this.Debug = function() {
      this.log = function(msg) {
        if( typeof(GM_log) != "undefined" )
          GM_log(msg);
        else if( typeof(opera) != "undefined" )
          opera.postError(msg);
         else if( typeof(console) != "undefined" )
           console.log(msg);
      };
    };
    this.StorageHandler = function(forceGM,useIdx) {
      var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1;
      var win = gm ? unsafeWindow : window;
      var ls = false;
      var intGetValue;
      var intSetValue;
      var prefix = lib.prefix;
      try {ls = typeof(win.localStorage) != "undefined";} catch(e) {lib.log(e.message);}
      var setIdx = function(key,inIdx) {
        if( typeof(inIdx) == "undefined" )
          inIdx = true;
        if( useIdx && inIdx ) {
          var idx = intGetValue("idx",";");
          if( !new RegExp(";"+key+";").test(idx) )
            intSetValue("idx",idx+key+";",false);
        }
      }
      var delIdx = function(key) {
        if( useIdx ) {
          var idx = intGetValue("idx",";");
          idx = idx.replace(new RegExp(";"+key+";","g"), ";");
          intSetValue("idx",idx,false);
        }
      }
      var idxListValues = function(re) {
          var allkeys = intGetValue("idx",";").split(";");
          var serverKeys = [];
          if( typeof(re) != "undefined" )
            var reKey = new RegExp(re);
          for( var i = 1; i < allkeys.length-1; i++ ) {
            if( reKey ) {
              res = res[1].match(reKey);
              if( res )
                serverKeys.push(res);
            }
            else
              serverKeys.push(res[1]);
          }
          return serverKeys;
      };
            if( forceGM && gm || !ls) {
        if( gm ) {
          prefix = prefix + "_" + document.location.host.split('.')[0];
          intSetValue = function(key,value,inIdx) {
            setIdx(key,inIdx);
            GM_setValue(prefix+"_"+key,value);
          };
          intGetValue = function(key,defaultValue) {
            return GM_getValue(prefix+"_" + key, defaultValue);
          }
          this.deleteValue = function(key) {
            delIdx(key);
            GM_deleteValue(prefix+"_"+key);
          }
          if( this.useIdx )
            this.listValues = idxListValues;
          else
            this.listValues = function(re) {
              var allkeys = GM_listValues();
              var serverKeys = [];
              var rePrefix = new RegExp("^"+prefix+"_(.*)$");
              if( typeof(re) != "undefined" )
                var reKey = new RegExp(re);
              for( var i = 0; i < allkeys.length; i++ ) {
                var res = allkeys[i].match(rePrefix);
                if( res ) {
                  if( reKey ) {
                    res = res[1].match(reKey);
                    if( res )
                      serverKeys.push(res);
                  }
                  else
                    serverKeys.push(res[1]);
                }
              }
              return serverKeys;
            }
        }
        else {
          alert( "Geen mogelijkheden gevonden!");
          end;
        }
      }
      else if( ls ) {
        intSetValue = function(key,value,inIdx) {
          if( useIdx )
            setIdx(key,inIdx);
          localStorage.setItem(prefix+"_"+key, value );
        };
        intGetValue = function(key,defaultValue) {
          var value = localStorage.getItem(prefix+"_"+key);
          if( value )
            return value;
          else
            return defaultValue;
        };
        this.deleteValue = function(key) {
          delIdx(key);
          localStorage.removeItem(prefix+"_"+key);
        }
        if( this.useIdx )
          this.listValues = idxListValues;
        else
          this.listValues = function(re) {
            if( this.useIdx ) {
              return idxListValues(intGetValue("idx","").split(";"));
            }
            else {
              var keys = [];
              var rePrefix = new RegExp("^"+prefix+"_(.*)$");
              if( typeof(re) != "undefined")
                var reKey = new RegExp(re);
              for( var i = 0; i < win.localStorage.length; i++ ) {
                var res = localStorage.key(i).match(rePrefix);
                if( res ) {
                  if( reKey ) {
                    res = res[1].match(reKey);
                    if( res )
                      keys.push(res);
                  }
                  else
                    keys.push(res[1]);
                }
              }
              return keys;
            }
          }
      }
      else {
        alert( "Geen mogelijkheden gevonden!");
        end;
      }
      this.clear = function(re) {
        var keys = this.listValues(re);
        for( var i = 0; i < keys.length; i++ )
          this.deleteValue(keys[i]);
      }
      this.setValue = function(key,value) {
        switch( typeof(value) ) {
          case "object":
          case "function":
            intSetValue(key,"j"+JSON.stringify(value));
            break;
          case "number":
            intSetValue(key,"n"+value);
            break;
          case "boolean":
            intSetValue(key,"b" + (value ? 1 : 0));
            break;
          case "string":
            intSetValue(key,"s" + value );
            break;
          case "undefined":
            intSetValue(key,"u");
            break;
        }
      }
      this.getValue = function(key,defaultValue) {
        var str = intGetValue(key);
        if( typeof(str) != "undefined" ) {
          switch( str[0] ) {
            case "j":
              try {
                return JSON.parse(str.substring(1));
              }
              catch(e) {
                alert( key + ": " + TEXTS[lib.lang].gui.valueError );
                return defaultValue;
              }
            case "n":
              return parseFloat(str.substring(1));
            case "b":
              return str[1] == "1";
            case "s":
              return str.substring(1);
            default:
              this.deleteValue(key);
          }
        }
        return defaultValue;
      }
      this.getString = function(key) {
        return intGetValue(key);
      }
      this.setString = function(key,value) {
        intSetValue(key,value);
      }
    }
    this.parseParams = function(url) {
      url = url.replace( location.hash, "");
      url = url.substring(url.indexOf("?")+1);
      url = url.replace( /&amp;/g, "&" );
      var hash = url.indexOf("#");
      if( hash > -1 )
        url = url.substring(0,hash-1);
      url = url.split("&");
      var params = { get: function(name,def) { if(typeof(this[name]) == "undefined") return def; else return this[name]; }, };
      for( var i = 0; i < url.length; i++ ) {
        var param = url[i].split("=");
        params[param[0]] = param[1];
      }
      return params;
    }
    this.getGameData = function() {
      var game_data;
      if(typeof(unsafeWindow) != 'undefined' && navigator.userAgent.indexOf("Firefox")>-1) {
        game_data = unsafeWindow.game_data;
      }
      if(!game_data) {
        var script = ce("script");
        script.type = "application/javascript";
        script.textContent = 	"var input=document.createElement('input');" +
                    "input.type='hidden';" +
                    "input.value=JSON.stringify(game_data);"  +
                    "input.id='game_data';" +
                    "document.body.appendChild(input);";
        document.body.appendChild(script);
        var input = $("game_data");
        if( input )
          eval("game_data=" + input.value + ";");
        document.body.removeChild(script);
      }
      if( game_data )
        game_data.link_base = game_data.link_base.replace(/&amp;/g,"&");
      return game_data;
    }
    this.Popup = function(id,title,close,width,height) {
      var THIS = this;
      id = lib.prefix+"_"+id;
      this.div = $(id);
      this.shadowDiv = $("dskorridor_shadow_div");
      if( this.shadowDiv === null ) {
        this.shadowDiv = document.body.appendChild(ce("div"));
        this.shadowDiv.id = "dskorridor_shadow_div";
        this.shadowDiv.style.position = "fixed";
        this.shadowDiv.style.left = "0px";
        this.shadowDiv.style.top = "0px";
        this.shadowDiv.style.backgroundColor = "rgba(0,0,0,0.7)";
        this.shadowDiv.style.zIndex = 999;
        this.shadowDiv.style.display = "none";
      }
      this.prevShadowDisplay = this.shadowDiv.style.display;
      if( this.div === null ) {
        this.div = document.body.appendChild(ce("div"));
        this.div.id = id;
        this.div.style.position = "absolute";
        this.div.style.zIndex = 1000;
        this.div.style.display = "none";
      }
      this.div.innerHTML = "";
      var tab = this.div.appendChild(ce("table"));
      tab.className = "popup_content";
      tab.style.border = "2px solid #804000";
      var row = tab.insertRow(0);
      var cell = row.appendChild(ce("th"));
      if( close ) {
        var titleTab = cell.appendChild(ce("table"));
        titleTab.style.width = "100%";
        row = titleTab.insertRow(0);
        this.titleCell = row.insertCell(0);
        this.titleCell.appendChild(document.createTextNode(title));
        cell = row.insertCell(1);
        cell.style.textAlign = "right";
        var a = cell.appendChild(ce("a"));
        a.id = id+"_close";
        a.href = "javascript:;";
        a.appendChild(document.createTextNode(TEXTS[lib.lang].gui.close));
        a.addEventListener("click", function() { THIS.hide(); }, false);
      }
      else {
        this.titleCell = cell;
        cell.appendChild(document.createTextNode(title));
      }
      this.content = tab.insertRow(1).insertCell(0);
      this.resize = function() {
        THIS.shadowDiv.style.width = self.innerWidth + "px";
        THIS.shadowDiv.style.height =  self.innerHeight + "px";
      }
      this.center = function() {
        THIS.div.style.left = Math.round(Math.max(0,self.pageXOffset + (self.innerWidth-THIS.div.offsetWidth)/2)) +"px";
        THIS.div.style.top = Math.round(Math.max(0,self.pageYOffset + (self.innerHeight-THIS.div.offsetHeight)/2)) + "px";
      }
      this.show = function() {
        var show = arguments.length == 0 || arguments[0] == true;
        THIS.shadowDiv.style.display = show ? "block" : this.prevShadowDisplay;
        THIS.div.style.display = show ? "block" : "none";
        if( show ) {
          window.addEventListener("resize", THIS.resize, false);
          THIS.resize();
          THIS.center();
        }
        else {
          window.removeEventListener("resize", this.resize, false);
        }
      }
      this.hide = function() {
        THIS.show(false);
      }
      this.setSize = function(width,height) {
        var display = THIS.div.style.display;
        THIS.div.style.display = "block";
        if( typeof(width) == "undefined" )
          width = tab.offsetWidth;
        if( typeof(height) == "undefined" )
          height = tab.offsetHeight;
        THIS.div.style.display = display;
        THIS.div.style.width = width + "px";
        THIS.div.style.height = height + "px";
        THIS.content.parentNode.parentNode.parentNode.style.width = Math.max(0,width - 8) +"px";
        THIS.content.parentNode.parentNode.parentNode.style.height = Math.max(0,height - 50) + "px";
        THIS.center();
      }
      this.setSize(width,height);
      this.setTitle = function(title) {
        THIS.titleCell.innerHTML = "";
        THIS.titleCell.appendChild(document.createTextNode(title));
      }
    }
    this.fireEvent = function(node,evt) {
      if( node.nodeName.toUpperCase() == "INPUT" && node.type.toUpperCase() == "CHECKBOX" )
        node.checked = !node.checked;
      var evObj = document.createEvent('HTMLEvents');
      evObj.initEvent( evt, true, true );
      var ok = node.dispatchEvent(evObj);
      if( ok && node.nodeName == "A" && node.href != "" ) {
        location.href = node.href;
       }
    }
    this.debug = new this.Debug();
    this.storage = new this.StorageHandler(forceGM,useIdx);
    this.params = this.parseParams(location.href);
    this.server = document.location.host.split('.')[0];
    this.hasPA = false;
    var res = this.server.match(/^([a-z]{2})s?(\d+)/);
    if( res ) {
      this.lang = res[1];
      this.world = parseInt(res[2], 10);
    }
    else {
      this.lang = "nl";
      this.world = -1;
    }
    if( this.params.screen ) {
     this.game_data = this.getGameData();
     if( this.game_data)
      this.hasPA = this.game_data.player.premium;
    }
  };
})();
