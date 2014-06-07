// ==UserScript==
// @name          PluginsLib - mhUpgrade- Tiberium Alliances
// @description   Upgrade Buildings, Defence, Offence
// @namespace     http://userscripts.org/users/471241
// @author        MrHIDEn      (game:PEEU)        (origin: Topper42)
// @downloadURL   https://userscripts.org/scripts/source/167588.user.js
// @updateURL     https://userscripts.org/scripts/source/167588.meta.js
// @grant         none
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version       1.07
// ==/UserScript==
/*NOTE
//TODO
1 if user resize screen the window could disappear, add control.
1 first use base upgrade window on the right side.
1 windows positions should be remembered by right side 
1 remove ico from buttons
1 add new button "D-3" upgrade to default
*/
(function(){
var InjectBody = function()
{
  //TODO for debug purpose only. remove if you do not need.
  var ccl=console.log;var cci=console.info;var ccw=console.warn;var ccd=console.dir;var ccc=console.clear;var cce=console.error;
  var disable=0;if(disable){var f=function(){};ccl=f;cci=f;ccw=f;ccd=f;ccc=f;cce=f;}

  var pluginName = "mhUpgrade";
  var created = false;
  function CreateClasses() {
    //class PluginsLib.mhUpgrade
    qx.Class.define("PluginsLib." + pluginName,
    {
      type: "singleton",
      //extend: webfrontend.gui.CustomWindow,
      extend : qx.core.Object,
      statics: {
        NAME: 'Upgrade base,offence,defence',
        PLUGIN: 'MH Upgrade',//=Menu Name
        HINT: 'Open upgrade city window',
        ICON: "FactionUI/icons/icon_building_detail_upgrade.png",
        AUTHOR: 'MrHIDEn',
        VERSION: 1.07,
        REQUIRES: 'Menu,Util',
        NEEDS: '',
        INFO: 'Upgrade buildings, defense, offence',
        WWW: 'http://userscripts.org/scripts/show/167588',
        ONPLUGIN: null,
        ONOPTIONS: null,
        SIZE: 0
      },
      //class PluginsLib.mhUpgrade.construct
      construct: function () 
      {
        //GUI
        //this.base(arguments); 
        try
        {
          this.stats.src = '//goo.gl/AUpFZK';
          this.Self = this;
          var backColor = '#eeeeff';
          //TEST AREA
          function getDebug(pn) {
            //EX, var debug = (PluginsLib.Debug[pluginName].onFoo = {});
            //where onFoo is a particular entry which corresponds to debug ex debug.foo = 12 -> ...onFoo.foo = 12
            //or just, var debug = PluginsLib.Debug[pluginName];
            var debug = "PluginsLib.Debug." + pn;
            debug = debug.split('.');
            var o = window;
            for(var i=0; i<debug.length; i++) {
              if(typeof(o[debug[i]])=='object') o = o[debug[i]];
              else o = (o[debug[i]] = {});
            }
            return o;
          }          
          var debug = getDebug(pluginName);
          //ON SCREEN RESIZE
          var dsk = qx.core.Init.getApplication().getDesktop();
          dsk.addListener("resize", function(e) {
              try {
                var debug = (PluginsLib.Debug[pluginName].appResize = {});
                debug.self = this.winPlugin;
                console.warn(pluginName+" onResize");
                var pos = this.loadFromStorage('winpos', {top:200, right:130});
                var gb = this.winPlugin.getBounds();
                var w = (gb === null) ? this.winPlugin.getWidth() : gb.width;
              //ccl('getBounds',this.winPlugin.getBounds(),'getWidth',this.winPlugin.getWidth(),'w',w);
                this.winPlugin.moveTo(e.getData().width - w - pos.right, pos.top);
              } catch(ex){console.error(this.classname,"getDesktop.addListener resize",ex);}
            }, this);
          //PLUGIN WINDOW
          this.winPlugin = new qx.ui.window.Window();
          this.winPlugin.set({
            width: 200,
            caption: "Upgrade " + this.constructor.VERSION.toFixed(2) + " (MH)",
            padding: 1,
            resizable: 0,
            allowMaximize: false,
            showMaximize: false,
            allowMinimize: false,
            showMinimize: false,
            toolTipText: "MrHIDEn tool - Upgrade."
          });
          this.winPlugin.addListener("appear", this.__onShow, this);
          this.winPlugin.addListener("move", function(e) {
            try {
              var debug = (PluginsLib.Debug[pluginName].winPlugin = {});
              debug.self = this.winPlugin;
              var sw = ClientLib.Vis.VisMain.GetInstance().get_Region().get_ViewWidth();
              //var sh = ClientLib.Vis.VisMain.GetInstance().get_Region().get_ViewHeight();
              //var w = this.winPlugin.getWidth();
              //var h = this.winPlugin.getHeight();
              var gd = e.getData();
              var gb = this.winPlugin.getBounds();
              var w = (gb === null) ? this.winPlugin.getWidth() : gb.width;
            //ccl('getBounds',this.winPlugin.getBounds(),'getWidth',this.winPlugin.getWidth(),'w',w);
              var pos = {top:gd.top, right:sw - gd.left - w};//e.getData(). width height def.right=125
              this.saveToStorage('winpos', pos);
            } catch(ex){console.error(this.classname,"winPlugin.addListener move",ex);}
          }, this);          
          var sw = ClientLib.Vis.VisMain.GetInstance().get_Region().get_ViewWidth();
          var pos = this.loadFromStorage('winpos', {top:200, right:130});
          if(typeof(pos.right)!='undefined') {
            pos.right = 130;
            this.saveToStorage('winpos', pos);         
          }            
          this.winPlugin.moveTo(sw - pos.right - this.winPlugin.getWidth(), pos.top);
          this.winPlugin.setLayout(new qx.ui.layout.VBox(1));
          
          
          var dl = 30;

          // ALL
          var cntUpgradeAll = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque"});

          this.__lblTitleAll = new qx.ui.basic.Label("Upgrade all items:").set({ alignX: "left", font: "font_size_14_bold"});
          cntUpgradeAll.add(this.__lblTitleAll);

          var cntUpgradeAllHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));

          this.__spiNewLevelAll = new qx.ui.form.Spinner(1, dl, 99).set({
            editable:false,
            //pageStep:5,
            width:50
          });
          this.__spiNewLevelAll.addListener("keydown", function(e) {
            var k = e.getKeyIdentifier();
            var s = this.__spiNewLevelAll;
            var v = s.getValue();
            switch (true) {
              case ("0123456789".indexOf(k)>=0):
                v = v.toString();
                v = v[v.length-1]+k;
                s.setValue(v);
                break;
              case (k=="+"):
                if(v<99) s.setValue(++v);
                break;
              case (k=="-"):
                if(v>1) s.setValue(--v);
                break;
              default:
                break;
            }
          }, this);
          this.__spiNewLevelAll.addListener("mousewheel", function(e){
            var d = -e.getWheelDelta();
            var s = this.__spiNewLevelAll;
            var v = s.getValue();
            switch (true)
            {
              case d>0:
                s.setValue(v+1);
                break;
              case d<1:
                s.setValue(v-1);
                break;
            }
          }, this);
          this.__spiNewLevelAll.addListener("changeValue", function(e) {
            this.__updateCostAll();
          }, this);

          //this.__btnUpgradeAll = new qx.ui.form.Button("Upgrade", "FactionUI/icons/icon_building_detail_upgrade.png");
          this.__btnUpgradeAll = new qx.ui.form.Button("Up").set({rich:true, toolTipText:"Upgrade"});
          this.__btnUpgradeAll.addListener("execute", function(e){ this.__upgradeAll();}, this);
          this.__btnUpgradeAll_1 = new qx.ui.form.Button("<b>+1</b>").set({rich:true, toolTipText:"Upgrade +1"});
          this.__btnUpgradeAll_1.addListener("execute", function(e){ this.__upgradeAll(1);}, this);
          this.__btnUpgradeAll_10 = new qx.ui.form.Button("<b>+10</b>").set({rich:true, toolTipText:"Upgrade +10"});
          this.__btnUpgradeAll_10.addListener("execute", function(e){ this.__upgradeAll(10);}, this);
          this.__btnUpgradeAll_D = new qx.ui.form.Button("<b>D-3</b>").set({rich:true, toolTipText:"Upgrade to default level -3"});
          this.__btnUpgradeAll_D.addListener("execute", function(e){ this.__upgradeAll("D");}, this);

          cntUpgradeAllHBox.add(this.__spiNewLevelAll);
          cntUpgradeAllHBox.add(this.__btnUpgradeAll);
          cntUpgradeAllHBox.add(this.__btnUpgradeAll_1);
          cntUpgradeAllHBox.add(this.__btnUpgradeAll_10);
          cntUpgradeAllHBox.add(this.__btnUpgradeAll_D);
          cntUpgradeAll.add(cntUpgradeAllHBox);

          this.__lblInfoAll = new qx.ui.basic.Label("Cost: -").set({ alignX:"left", toolTipText:"<b>Click to Refresh</b><br>T:Tiberium C:Crystal P:Power", rich:true});
          this.__lblInfoAll.addListener("click", function(e){
            this.__updateCostAll();
          }, this);
          cntUpgradeAll.add(this.__lblInfoAll);

          this.winPlugin.add(cntUpgradeAll);

          // ONE
          var cntUpgradeOne = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque"});

          this.__lblTitleOne = new qx.ui.basic.Label("Upgrade current item:").set({ alignX: "left", font: "font_size_14_bold"});
          cntUpgradeOne.add(this.__lblTitleOne);

          this.__lblOneSelected = new qx.ui.basic.Label("Selected: -");
          cntUpgradeOne.add(this.__lblOneSelected);

          var cntUpgradeOneHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
          this.__spiNewLevelOne = new qx.ui.form.Spinner(1, dl, 99).set({
            editable: false,
            //pageStep:5,
            width: 50
          });
          this.__spiNewLevelOne.addListener("keydown", function(e) {
            var k = e.getKeyIdentifier();
            var s = this.__spiNewLevelOne;
            var v = s.getValue();
            switch (true) {
              case ("0123456789".indexOf(k)>=0):
                v = v.toString();
                v = v[v.length-1]+k;
                s.setValue(v);
                break;
              case (k=="+"):
                if(v<99) s.setValue(++v);
                break;
              case (k=="-"):
                if(v>1) s.setValue(--v);
                break;
              default:
                break;
            }
          }, this);
          this.__spiNewLevelOne.addListener("mousewheel", function(e){
            var d = -e.getWheelDelta();
            var s = this.__spiNewLevelOne;
            var v = s.getValue();
            switch (true)
            {
              case d>0:
                s.setValue(v+1);
                break;
              case d<1:
                s.setValue(v-1);
                break;
            }
          }, this);
          this.__spiNewLevelOne.addListener("changeValue", function(e) {
            //e.getData();
            this.__updateCostOne();
          }, this);
          //this.__btnUpgradeOne = new qx.ui.form.Button("Upgrade", "FactionUI/icons/icon_building_detail_upgrade.png");
          this.__btnUpgradeOne = new qx.ui.form.Button("Up").set({rich:true, toolTipText:"Upgrade"});
          this.__btnUpgradeOne.addListener("execute", function(e){ this.__upgradeOne();}, this);
          this.__btnUpgradeOne_1 = new qx.ui.form.Button("<b>+1</b>").set({rich:true, toolTipText:"Upgrade +1"});
          this.__btnUpgradeOne_1.addListener("execute", function(e){ this.__upgradeOne(1);}, this);
          this.__btnUpgradeOne_10 = new qx.ui.form.Button("<b>+10</b>").set({rich:true, toolTipText:"Upgrade +10"});
          this.__btnUpgradeOne_10.addListener("execute", function(e){ this.__upgradeOne(10);}, this);
          this.__btnUpgradeOne_D = new qx.ui.form.Button("<b>D-3</b>").set({rich:true, toolTipText:"Upgrade to default level -3"});
          this.__btnUpgradeOne_D.addListener("execute", function(e){ this.__upgradeOne("D");}, this);

          cntUpgradeOneHBox.add(this.__spiNewLevelOne);
          cntUpgradeOneHBox.add(this.__btnUpgradeOne);
          cntUpgradeOneHBox.add(this.__btnUpgradeOne_1);
          cntUpgradeOneHBox.add(this.__btnUpgradeOne_10);
          cntUpgradeOneHBox.add(this.__btnUpgradeOne_D);
          cntUpgradeOne.add(cntUpgradeOneHBox);

          this.__lblInfoOne = new qx.ui.basic.Label("Cost: -").set({ alignX:"left", toolTipText:"<b>Click to Refresh</b><br>T:Tiberium C:Crystal P:Power", rich:true});
          this.__lblInfoOne.addListener("click", function(e){
            this.__updateCostOne();
          }, this);
          cntUpgradeOne.add(this.__lblInfoOne);

          this.winPlugin.add(cntUpgradeOne);

          //events
          this.__extendSelectionChange();
          this.__extendViewModeChange();
          this.__extendCurrentOwnChange();

          this.LVisModes = PluginsLib.Util.denumerate(ClientLib.Vis.Mode);
          
          //DELEGATES FOR REGISTER PLUGIN
          this.constructor.ONPLUGIN = function(){this.constructor.getInstance().winPlugin.open();};//this.winPlugin.open();
          //this.constructor.ONOPTIONS = null;
        
          //READY
          console.info("Plugin '"+pluginName+"' LOADED");
        }
        catch (ex) {
          console.error(this.classname,'.construct: ', ex);
        }
      },
      //class PluginsLib.mhUpgrade.members
      members: {
        Self: null,
        stats: document.createElement('img'),
        winPlugin: null,
        winOptions: null,
        
        __viewMode: null,

        __lblTitleAll: null,
        __spiNewLevelAll: null,
        __btnUpgradeAll_1: null,
        __btnUpgradeAll_10: null,
        __btnUpgradeAll_D: null,
        __btnUpgradeAll: null,
        __lblInfoAll: null,
        __costAll: null,

        __lblTitleOne: null,
        __lblOneSelected: null,
        __spiNewLevelOne: null,
        __btnUpgradeOne_1: null,
        __btnUpgradeOne_10: null,
        __btnUpgradeOne_D: null,
        __btnUpgradeOne: null,
        __lblInfoOne: null,
        __costOne: null,
        LVisModes: [],

        __lastSelectedItem: null,        
        
        loadFromStorage: function(key,preval) {
          var S = ClientLib.Base.LocalStorage;
          if (S.get_IsSupported()) {
            var wid = ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
            var val = S.GetItem(wid+'.'+this.classname+'.'+key);
            if(val!==null) {
              preval = val;
            }
          }
          return preval;
        },
        saveToStorage: function(key,val) {
          if(val!==null) {
            var S = ClientLib.Base.LocalStorage;
            if (S.get_IsSupported()) {
              var wid = ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
              S.SetItem(wid+'.'+this.classname+'.'+key, val);
            }
          }
        },

        __updateCostAll: function()  {
          var newLevel = this.__spiNewLevelAll.getValue();
          var viewMode = qx.core.Init.getApplication().getPlayArea().getViewMode();
          //ccw('__updateCostAll.viewMode:',viewMode);
          switch (viewMode)  {
            case ClientLib.Vis.Mode.City:
              this.__lblTitleAll.setValue("Upgrade buildings:");
              this.__lblTitleOne.setValue("Upgrade current building:");
              this.__lblOneSelected.setValue("Selected building: -");
              break;
            case ClientLib.Vis.Mode.Region:
            case ClientLib.Vis.Mode.Battleground:
              this.__lblTitleAll.setValue("Upgrade units:");
              this.__lblTitleOne.setValue("Upgrade current unit:");
              this.__lblOneSelected.setValue("Selected unit: -");
              break;
            default:
              break;
          }
          switch (viewMode) {
            case ClientLib.Vis.Mode.City:
              this.__costAll = ClientLib.API.City.GetInstance().GetUpgradeCostsForAllBuildingsToLevel(newLevel);
              break;
            case ClientLib.Vis.Mode.Region:
              this.__costAll = ClientLib.API.Defense.GetInstance().GetUpgradeCostsForAllUnitsToLevel(newLevel);
              break;
            case ClientLib.Vis.Mode.Battleground:
              this.__costAll = ClientLib.API.Army.GetInstance().GetUpgradeCostsForAllUnitsToLevel(newLevel);
              break;
            default:
              break;
          }
          this.__lblInfoAll.setValue("Cost: " + this.formatedCost(this.__costAll) + "<br>Av. in: " + this.__aviableIn(this.__costAll));
        },
        __updateCostOne: function()  {
          var newLevel = this.__spiNewLevelOne.getValue();

          var viewMode = qx.core.Init.getApplication().getPlayArea().getViewMode();
          //ccw('__updateCostOne.viewMode:',viewMode);
          this.__lblInfoOne.setValue("Cost: ?");

          var obj = this.__lastSelectedItem;
          if(obj===null) obj = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
          if(obj===null) return;

          var type = obj.get_VisObjectType();//1-building 8-army
          switch(type)
          {
            case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
              this.__costOne = ClientLib.API.City.GetInstance().GetUpgradeCostsForBuildingToLevel(obj.get_BuildingDetails(), newLevel);
              break;
            case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
              this.__costOne = ClientLib.API.Defense.GetInstance().GetUpgradeCostsForUnitToLevel(obj.get_UnitDetails(), newLevel);
              break;
            case ClientLib.Vis.VisObject.EObjectType.ArmyUnitType:
              this.__costOne = ClientLib.API.Army.GetInstance().GetUpgradeCostsForUnitToLevel(obj.get_UnitDetails(), newLevel);
              break;
            default:
              break;
          }
          this.__lblInfoOne.setValue("Cost: " + this.formatedCost(this.__costOne) + "<br>Av. in: " + this.__aviableIn(this.__costOne));
        },
        __getDefaultLevel: function() { 
          try
          {
            var dl=30;
            var viewMode = qx.core.Init.getApplication().getPlayArea().getViewMode();
            switch (viewMode) {
              case ClientLib.Vis.Mode.City:
                dl = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_LvlBase().toFixed(0);
                break;
              case ClientLib.Vis.Mode.Region:
                dl = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_LvlDefense().toFixed(0);
                break;
              case ClientLib.Vis.Mode.Battleground:
                dl = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_LvlOffense().toFixed(0);
                break;
              default:
                break;
            }
            return Math.max(dl,1);
            
          } catch (ex) {
            console.error(this.classname,'.__getDefaultLevel: ', ex);
          }
        },
        __upgradeAll: function(up) {
          try
          {
            up = up || 0;
            var s = this.__spiNewLevelAll;
            //TODO potential error
            if(up=="D") s.setValue(this.__getDefaultLevel()-3);
            else if(up!==0) s.setValue(s.getValue() + up);
            var newLevel = s.getValue();

            var viewMode = qx.core.Init.getApplication().getPlayArea().getViewMode();
            //ccl('__upgradeAll.viewMode new:',viewMode,this.LVisModes[viewMode]);
            switch (viewMode)
            {
              case ClientLib.Vis.Mode.City:
                ClientLib.API.City.GetInstance().UpgradeAllBuildingsToLevel(newLevel);
                break;
              case ClientLib.Vis.Mode.Region:
                ClientLib.API.Defense.GetInstance().UpgradeAllUnitsToLevel(newLevel);
                break;
              case ClientLib.Vis.Mode.Battleground:
                ClientLib.API.Army.GetInstance().UpgradeAllUnitsToLevel(newLevel);
                break;
              default:
                break;
            }
            this.__updateCostAll();
            this.__updateCostOne();

          } catch (ex) {
            console.error(this.classname,'.__upgradeAll: ', ex);
          }
        },
        __upgradeOne: function(up) {
          try
          {
            up = up || 0;
            var s = this.__spiNewLevelOne;
            if(up=="D") s.setValue(this.__getDefaultLevel()-3);
            else if(up!==0) s.setValue(s.getValue() + up);
            var newLevel = s.getValue();

            var viewMode = qx.core.Init.getApplication().getPlayArea().getViewMode();
            //ccl('__upgradeOne.viewMode new:',viewMode,this.LVisModes[viewMode]);
            var obj = this.__lastSelectedItem;
            if(obj===null) return;

            var type = obj.get_VisObjectType();//camp 15
            switch(type) {
              case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
                ClientLib.API.City.GetInstance().UpgradeBuildingToLevel(obj.get_BuildingDetails(), newLevel);
                break;
              case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
                ClientLib.API.Defense.GetInstance().UpgradeUnitToLevel(obj.get_UnitDetails(), newLevel);
                break;
              case ClientLib.Vis.VisObject.EObjectType.ArmyUnitType:
                ClientLib.API.Army.GetInstance().UpgradeUnitToLevel(obj.get_UnitDetails(), newLevel);
                break;
              default:
                break;
            }
            this.__updateCostAll();
            this.__updateCostOne();
          } catch (ex) {
            console.error(this.classname,'._upgrade: ', ex);
          }
        },
        __onViewChanged: function(oldMode, newMode) {
          try
          {
            var viewMode = qx.core.Init.getApplication().getPlayArea().getViewMode();
            //ccw('__onViewChanged',' newMode:',newMode,' viewMode:',viewMode);
            if(viewMode!=this.__viewMode){
              // var dl=30;
              // this.__viewMode = viewMode;
              // switch (viewMode) {
                // case ClientLib.Vis.Mode.City:
                  // dl = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_LvlBase().toFixed(0);
                  // break;
                // case ClientLib.Vis.Mode.Region:
                  // dl = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_LvlDefense().toFixed(0);
                  // break;
                // case ClientLib.Vis.Mode.Battleground:
                  // dl = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_LvlOffense().toFixed(0);
                  // break;
                // default:
                  // break;
              // }
              // dl = Math.max(dl,1);
              var dl = this.__getDefaultLevel();
              this.__spiNewLevelAll.setValue(dl);
              this.__spiNewLevelOne.setValue(dl);
              this.__updateCostAll();
              this.__updateCostOne();
            }
          } catch (ex) {
            console.error(this.classname,'.__onViewChanged: ', ex);
          }
        },
        __onSelectionChange: function(oldObj, newObj) {
          //ccl('__onSelectionChange');
          try
          {
            this.__lastSelectedItem = newObj;
            var obj = newObj;
            if(obj===null) return;

            var name,level;
            var type = obj.get_VisObjectType();//camp 15
            switch(type)
            {
              case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
                name = obj.get_BuildingName();
                level = obj.get_BuildingLevel() + 1;
                this.__spiNewLevelOne.setValue(level);
                this.__lblOneSelected.setValue("Selected building: " + name + " Lv" + level);
                this.__lblTitleAll.setValue("Upgrade all buildings:");
                this.__costOne = ClientLib.API.City.GetInstance().GetUpgradeCostsForBuildingToLevel(obj.get_BuildingDetails(), level);
                break;
              case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
                name = obj.get_UnitName();
                level = obj.get_UnitLevel() + 1;
                this.__spiNewLevelOne.setValue(level);
                this.__lblOneSelected.setValue("Selected def unit: " + name + " Lv" + level);
                this.__lblTitleAll.setValue("Upgrade all units:");
                this.__costOne = ClientLib.API.Defense.GetInstance().GetUpgradeCostsForUnitToLevel(obj.get_UnitDetails(), level);
                break;
              case ClientLib.Vis.VisObject.EObjectType.ArmyUnitType:
                name = obj.get_UnitName();
                level = obj.get_UnitLevel() + 1;
                this.__spiNewLevelOne.setValue(level);
                this.__lblOneSelected.setValue("Selected off unit: " + name + " Lv" + level);
                this.__lblTitleAll.setValue("Upgrade all units:");
                this.__costOne = ClientLib.API.Army.GetInstance().GetUpgradeCostsForUnitToLevel(obj.get_UnitDetails(), level);
                break;
              default:
                break;
            }
            this.__lblInfoOne.setValue("Cost: " + this.formatedCost(this.__costOne) + "<br>Av. in: " + this.__aviableIn(this.__costOne));
            //this.__lblInfoAll.setValue("Cost: -");
          } catch (ex) {
            console.error(this.classname+".__onSelectionChange: ", ex);
          }
        },
        __onCityChanged: function (o, n) {
          //cci('__onCityChanged');
          var dl=30;
          var viewMode = qx.core.Init.getApplication().getPlayArea().getViewMode();
          switch (viewMode)
          {
            case ClientLib.Vis.Mode.City:
              dl = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_LvlBase().toFixed(0);
              break;
            case ClientLib.Vis.Mode.Region:
              dl = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_LvlDefense().toFixed(0);
              break;
            case ClientLib.Vis.Mode.Battleground:
              dl = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_LvlOffense().toFixed(0);
              break;
            default:
              break;
          }
          dl = Math.max(dl,1);
          this.__spiNewLevelAll.setValue(dl);
          this.__spiNewLevelOne.setValue(dl);
          this.__updateCostAll();
          this.__updateCostOne();
          //var c = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(n);
          //if (c != null && c.get_IsGhostMode()) webfrontend.gui.widgets.confirmationWidgets.GhostedConfirmationWidget.getInstance().showGhostedInformation(c);
        },
        __onShow: function(e) {
          //cci('__onShow');
          //TODO
          //if(this.moveTo) this.moveTo(100, 400);
          var dl=30;
          var viewMode = qx.core.Init.getApplication().getPlayArea().getViewMode();
          switch (viewMode)
          {
            case ClientLib.Vis.Mode.City:
              dl = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_LvlBase().toFixed(0);
              break;
            case ClientLib.Vis.Mode.Region:
              dl = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_LvlDefense().toFixed(0);
              break;
            case ClientLib.Vis.Mode.Battleground:
              dl = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_LvlOffense().toFixed(0);
              break;
            default:
              break;
          }
          dl = Math.max(dl,1);
          this.__spiNewLevelAll.setValue(dl);
          this.__spiNewLevelOne.setValue(dl);
          this.__updateCostAll();
          this.__updateCostOne();
          //TODO timer on
          //TODO updateS ?
          //this.__onViewChanged(0,qx.core.Init.getApplication().getPlayArea().getViewMode());
        },
        __extendSelectionChange: function() {
          phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.__onSelectionChange);
        },
        __extendViewModeChange: function() {
          phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this , this.__onViewChanged);
        },
        __extendCurrentOwnChange: function() {
          phe.cnc.Util.attachNetEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.__onCityChanged);
        },
        //TODO move them to static class .mhUtils or .Menu
        //NEW API for LOOTS
        getCost: function (d) {
          //ccl('getCost d',d);
          var r={};
          var t={1:'T',2:'C',3:'G',5:'P',6:'RP',7:'RCB',8:'RCA',9:'RCI',10:'RCV'};
          for (var i in d) {
            var c = d[i];//Requirement/Cost
            if(typeof(c)!='object') continue;
            var k = (typeof(t[c.Type])=='undefined')?c.Type:t[c.Type];//translate if possible
            if(typeof(r[k])=='undefined') r[k] = 0;//add branch
            r[k] += c.Count;
          }
          //ccl('getCost p',p);
          return r;
        },
        formatedCost: function (d,f) {
          f = f || {T:"0",C:"0",P:"0"};
          var r = this.getCost(d);
          var k;
          for(k in r) {
              f[k] = PluginsLib.Util.formatNumbersCompact(r[k],1);
          }
          var s='';
          for(k in f) s += k + ':' + f[k] +'  ';
          s.trimRight();
          return s;
        },
        __aviableIn: function(d)  {//needed
          //INFO returns time when resources will be available
          //TODO calculate cool down time as well
          var k;
          var need = this.getCost(d);

          var coc = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
          var ccp = coc.get_CityCreditsProduction();

          var res={T:0,C:0,G:0,P:0};//available
          res.T = coc.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
          res.C = coc.GetResourceCount(ClientLib.Base.EResourceType.Crystal);
          res.P = coc.GetResourceCount(ClientLib.Base.EResourceType.Power);
          res.G = coc.GetResourceCount(ClientLib.Base.EResourceType.Gold);

          var debt={T:0,C:0,G:0,P:0};//unavailable
          for(k in need) debt[k] = (need[k]<=res[k])?0:need[k]-res[k];

          var bon={T:0,C:0,G:0,P:0};//package bonus
          bon.T = coc.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium);
          bon.C = coc.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal);
          bon.P = coc.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power);
          bon.G = ClientLib.Base.Resource.GetResourceBonusGrowPerHour(ccp);

          var con={T:0,C:0,G:0,P:0};//continuous
          con.T = coc.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false);
          con.C = coc.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false);
          con.P = coc.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false);
          con.G = ClientLib.Base.Resource.GetResourceGrowPerHour(ccp, false);

          var poi={T:0,C:0,G:0,P:0};//alliance poi bonus
          var a = ClientLib.Data.MainData.GetInstance().get_Alliance();
          poi.T=a.get_POITiberiumBonus();
          poi.C=a.get_POICrystalBonus();
          poi.P=a.get_POIPowerBonus();

          var tot={T:0,C:0,G:0,P:0};//total incoming
          allystop=coc.get_IsGhostMode();//Production Stopped
          ownstop=coc.get_hasCooldown() || allystop;//Packages Stopped
          //TODO incorrect
          for(k in tot) tot[k] = con[k] + ((ownstop)?0:bon[k]) + ((allystop)?0:poi[k]);

          var time={T:0,C:0,G:0,P:0};//time need to get those resources [s]
          for(k in time) time[k] = debt[k] / tot[k] * 3600.0;

          var max = 0;
          for(k in time) max = (time[k]>max)?time[k]:max;

          return (max>0)?PluginsLib.Util.dhms(max,"d ") + " *estimated":"<b>NOW</b>";// 18'15:34:12 18d 15:34:12 18d15:34:12 18:15:34:12 estimated
        }
      }//members
    });//Class
    created = true;
  }//CreateClasses
  function WaitForGame() {
    //CreateClasses -> getInstance -> construct
    try
    {
      if(typeof(qx) != 'undefined' && typeof(qx.core) != 'undefined' && typeof(qx.core.Init) != 'undefined')
      {
        var app = qx.core.Init.getApplication();
        if(app.initDone===true)
        {
          if(!created) CreateClasses();
          
          var plugin;
          var registerPlugin = false;
          var ready = typeof(PluginsLib[pluginName]) != 'undefined';
          if(ready) {
            plugin = PluginsLib[pluginName];
            if(plugin.REQUIRES.length > 0) {
              var req = plugin.REQUIRES.split(',');
              //check all requires
              for(var i in req) {
                //cci(req[i]);
                if(typeof(PluginsLib[req[i]]) == 'undefined') {
                  ready = false;
                  console.warn("Plugin '" + pluginName + "' REQUIRES: '" + req[i] + "' Waiting...");
                  break;//WAIT
                }
                if(req[i] == "Menu") registerPlugin = true;
              }
            }
          }
          else {
            console.warn("Plugin '" + pluginName + "' UNDEFINED");
            if(typeof(PluginsLib) != 'undefined') console.dir(PluginsLib);
            else console.warn("Plugin 'PluginsLib' UNDEFINED");
          }
          if(ready) {
            plugin.SIZE = scriptSize;
            // START PLUGIN
            plugin.getInstance(); //needed? YES
            //REGISTER PLUGIN
            if(registerPlugin) PluginsLib.Menu.getInstance().RegisterPlugin(plugin.getInstance());
            console.info("Plugin '" + pluginName + "' READY");
            return;//DONE
          }
        }
      }
    }
    catch (ex) {
      console.error('PluginsLib.'+pluginName+'.WaitForGame: ', ex);
    }
    window.setTimeout(WaitForGame, 3000);
  }
  window.setTimeout(WaitForGame, 3000);
};
function Inject() {
  var script = document.createElement('script');
  var txt = InjectBody.toString();
  txt = txt.replace('{','{\r\n  var scriptSize='+(txt.length+22).toString()+';');
  script.innerHTML = '(' + txt + ')();';
  script.type = 'text/javascript';
  document.head.appendChild(script);
}
Inject();
})();
