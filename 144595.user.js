// ==UserScript==
// @name           CnC: THC Support functions
// @author         Ogty Welt 10
// @namespace      The Clash
// @description    Based on "Tiberium Alliances COORDS 500:500" and "Tiberium Alliances Shortcuts"
// @description    Strg+Y - insert [coords]x:y[/coords], just klick on an object on the map
// @description    Strg+Q - insert [coords] [/coords] at cursor possition
// @description    Alt+I  - insert Base stats at curser possition
// @description    Alt+K  - insert Base Off-values at curser possition
// @description    Various support functions
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        0.6
// ==/UserScript==

//********************************************************************************************************************
(function () {
  var TARdKMain = function () {
//**Helpers***********************************************************************************************************
    function findBuildings(c){for(var k in c){if((typeof(c[k])=="object")&&c[k] && c[k]&&0 in c[k]){if((typeof(c[k][0])=="object")&&c[k][0]&&"BuildingDBId" in c[k][0]){return c[k];}}}return [];}
    function getBuildingNameAndLevelById(c,id,lb){var bd=findBuildings(c);if(lb==true)var l="\r\n";else l="";for(var b in bd){try{if(bd[b].DetailViewInfo.TechId == id){return GAMEDATA.Tech[id].dn + ": " + bd[b].DetailViewInfo.TechLevel + l;}}catch(e){}}try{return GAMEDATA.Tech[id].dn + ": --"+l;}catch(e){return "Unknown Building ID"+l;}}
//********************************************************************************************************************
    function createInstance() {
      var RdKsf = {};
      qx.Class.define("RdKsf.main", {
        type: "singleton",extend: qx.core.Object,
        members: {
          Coords: "",
          initialize: function(){console.log("RdK Support functions loaded");window.addEventListener("keyup", this.onKey, false);window.addEventListener("mouseover", this.onMouseOver, false);},
          hms: function(s){var h=Math.floor(s/3600);s%=3600;var m=Math.floor(s/60);s%=60;var r=(h<10?"0"+h.toString():h.toString())+":";r+=(m<10?"0"+m.toString():m.toString())+":";r+=(s<10?"0"+s.toString():s.toString());return r;},
          GetCaretPosition: function(ctrl){var CaretPos=0;if (document.selection) {ctrl.focus();var Sel = document.selection.createRange();Sel.moveStart('character', -ctrl.value.length);CaretPos = Sel.text.length;}else if (ctrl.selectionStart || ctrl.selectionStart == '0') CaretPos = ctrl.selectionStart;return (CaretPos);},
          SetCaretPosition: function (ctrl, pos) {if (ctrl.setSelectionRange) {ctrl.focus();ctrl.setSelectionRange(pos, pos);} else if (ctrl.createTextRange) {var range = ctrl.createTextRange();range.collapse(true);range.moveEnd('character', pos);range.moveStart('character', pos);range.select();}},
          onKey: function (ev) {
            var inputField = document.querySelector('input:focus, textarea:focus');
            if(inputField == null) return;
            var s = String.fromCharCode(ev.keyCode);
            var RdKsf = window.RdKsf.main.getInstance();
            if ( !ev.altKey && !ev.altGraphKey && ev.ctrlKey && !ev.shiftKey) { // Strg+
              switch (s) {
                case "Y": // coords by moving mouse OVER map coordinates
                  if(this.Coords == "" || this.Coords == null){
                      try { // try fetching coords from map
                          var cc = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                          this.Coords = cc.get_PosX() + ":" + cc.get_PosY();
                      }catch (ex){this.Coords="";}
                  }
                  if (this.Coords != "" && this.Coords != null) {
                    var position = RdKsf.GetCaretPosition(inputField);
                    var txt = inputField.value;
                    var insert = "[coords]" + this.Coords + "[/coords]";
                    inputField.value = txt.substring(0, position) + insert + txt.substring(position, txt.length);
                    RdKsf.SetCaretPosition(inputField, position + insert.length);
                    this.Coords = "";
                  }
                  break;
                case "Q": // inserting [coords][/coords]
                  var inputField = document.querySelector('input:focus, textarea:focus');
                  if (inputField != null) {
                    var position = RdKsf.GetCaretPosition(inputField);
                    var txt = inputField.value;
                    var insert = "[coords][/coords]";
                    inputField.value = txt.substring(0, position) + insert + txt.substring(position, txt.length);
                    RdKsf.SetCaretPosition(inputField, position + ("[coords]").length);
                  }
                  break;                                     
                default:break;
              }
            }
            if ( ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey) { // Alt+
              switch (s) {
                case "K": // Offwerte
                  var txt = "OffWerte: ", sep = "";
                  var apcl = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;//all player cities list
                  for (var key in apcl) {
                    var c = apcl[key];
                    try {
                      if (c.get_LvlOffense() == 0) continue;
                      txt += sep + "[coords]" + c.get_PosX() + ":" + c.get_PosY() + ":" + c.get_Name() + "[/coords] = " + c.get_LvlOffense().toFixed(2).toString(); 
                      sep = ", ";
                    } catch (ex) {}
                  }
                  var position = RdKsf.GetCaretPosition(inputField), inp = inputField.value;
                  inputField.value = inp.substring(0, position) + txt + inp.substring(position, inp.length);
                  RdKsf.SetCaretPosition(inputField, position + txt.length);                                        
                  break;
                case "I":// Base Info
                  var txt = "", apcl = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                  for (var key in apcl) {
                    var c = apcl[key];
                    switch (c.get_CityFaction()) { // playerfaction/defencecenter id
                      case 1: var f="Globale Defensiv Initiative",dcid=40,ccid=24;break;
                      case 2: var f="Bruderschaft von Nod",       dcid=41,ccid=30;break;
                      default:var f="Unknown",                    dcid=0, ccid=0; break;
                    }
                    // get defencecenter + level
                    try {
                      var mrt = "",slvl = "";
                      if(c.get_LvlOffense() > 0) {
                        var a = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
                        var v = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
                        var i = c.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
                        mrt = "MaxRepTime: " + RdKsf.hms(Math.max(a,v,i)) + "\r\n";
                      }
                      var sd = c.get_SupportData();
                      if(sd !== null) {slvl = "Support: " +  c.get_SupportWeapon().dn + " - " + + sd.get_Level().toString() + ", kalibriert: " + c.get_SupportDedicatedBaseName() + "\r\n";}
                      if(c.get_LvlDefense() < c.get_LvlOffense()){var btype = "OffBase", oblds = "[b]",oblde="[/b]",dblds="",dblde="";}
                      else {
                        if(c.get_LvlDefense() > c.get_LvlOffense()){var btype = "DefBase", oblds = "",oblde="",dblds="[b]",dblde="[/b]";}
                        else{var btype = "Nicht bestimmbar", oblds = "",oblde="",dblds="",dblde=""}
                      }
                      txt += "[u][b][coords]" + c.get_PosX() + ":" + c.get_PosY() + ":" + c.get_Name() + "[/coords] | " + btype + "[/b][/u]\r\n";
                      txt += "Basisstufe: " + c.get_LvlBase().toFixed(2).toString() + "\r\n";
                      txt += getBuildingNameAndLevelById(c,ccid,true)+ "Offensivstufe: " + oblds + c.get_LvlOffense().toFixed(2).toString() + oblde + "\r\n";
                      txt += getBuildingNameAndLevelById(c,dcid,true)+ "Defensivstufe: " + dblds + c.get_LvlDefense().toFixed(2).toString() + dblde + "\r\n";
                      txt += mrt + slvl + "\r\n"    
                    } catch (ex) {}
                  }                                        
                  inputField.value = "[b][spieler]" + c.get_PlayerName() + "[/spieler] | " + f + "[/b]\r\n\r\n" + txt;
                  RdKsf.SetCaretPosition(inputField, position + txt.length);
                  break;
                default:break;
              }
            }
          },
          onMouseOver: function (ev) {					
            var tag = ev.target.tagName;
            if (tag == "B" || tag == "DIV" || tag == "A") {
              var s = ev.target.textContent;
              var semicolon = s.indexOf(":");
              if (semicolon > 0) {
                var n1 = s.substring(0, semicolon);
                var n2 = s.substring(semicolon + 1, s.lenght);
                if (isFinite(n1) && isFinite(n2)) {
                  if(s.length==5 && s[0]=="0") return;Coords = s;
                  ClientLib.Vis.VisMain.GetInstance().PlayUISound('sounds/CollectTiberium');
                }
              }
            }
          }
        } 
      });
    }
    //********************************************************************************************************************
    function TARdK_checkIfLoaded() {// Loading
      try {
        if (typeof qx != 'undefined') {
          ap = qx.core.Init.getApplication();mb = qx.core.Init.getApplication().getMenuBar();
          if (ap && mb) {createInstance();window.RdKsf.main.getInstance().initialize();}else window.setTimeout(TARdK_checkIfLoaded, 1000);
        } 
        else {window.setTimeout(TARdK_checkIfLoaded, 1000);}
      } catch (e) {if (typeof console != 'undefined') console.log(e);else if (window.opera) opera.postError(e);else GM_log(e);}
    }
    if (/commandandconquer\.com/i.test(document.domain)){window.setTimeout(TARdK_checkIfLoaded, 1000);}
  };
  if (window.location.pathname != ("/login/auth")) {// Injecting
    var TACScript = document.createElement("script");TACScript.innerHTML = "(" + TARdKMain.toString() + ")();";TACScript.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) {document.getElementsByTagName("head")[0].appendChild(TACScript);}
  }
})();