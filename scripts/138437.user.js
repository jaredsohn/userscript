// ==UserScript==
// @name           POI Manager (BETA)
// @description    View POI's Around you
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx* 
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        0.0.1
// @author         Panavia
// @require        http://sizzlemctwizzle.com/updater.php?id=
// ==/UserScript==

(function (){
  var tapoi_main = function() {
    var windowPOI;
      
    function initialize() {
      console.log("POI Manager Loaded");
      
      qx.Class.define("webfrontend.gui.POI.poi", {
        extend:webfrontend.gui.MenuOverlayWidget,
        
        construct:function(){
          webfrontend.gui.MenuOverlayWidget.call(this);
          this._title.setValue("Manage POI's");
          
          var bt=new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({paddingTop:10,width:704,maxWidth:704,decorator:new qx.ui.decoration.Background().set({backgroundRepeat:"scale",backgroundImage:"webfrontend/ui/menues/rankings/bgr_ranking_scaler.png"})});
          var br=new qx.ui.core.Widget().set({width:704,maxWidth:704,height:11,decorator:new qx.ui.decoration.Background().set({backgroundRepeat:"no-repeat", backgroundImage:"webfrontend/ui/menues/rankings/bgr_ranking_end.png"})});
          
          var cordX = new qx.ui.form.TextField().set({maxLength: 3, width: 50, marginLeft: 5, marginRight: 5});
	  cordX.setFilter(/[0-9]/);
          var labelCord = new qx.ui.basic.Label(":");
          var cordY = new qx.ui.form.TextField().set({maxLength: 3, width: 50, marginLeft: 5, marginRight: 5});
	  cordY.setFilter(/[0-9]/);
          
          var buttonRefresh = new qx.ui.form.Button("Refresh");
	  buttonRefresh.set({width: 100, marginLeft: 15, marginRight: 30, allowGrowY: false, toolTipText: "Refresh POI Data"});
          buttonRefresh.addListener("execute", this.refresh, this);
          
          var end = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({alignY: 'middle'})).set({paddingLeft: 15, paddingRight: 15, paddingTop: 3, width: 704, maxWidth: 704, paddingBottom: 8, decorator: new qx.ui.decoration.Background().set({backgroundRepeat: "scale", backgroundImage: "webfrontend/ui/menues/rankings/bgr_ranking_scaler.png"})});
	  end.add(buttonRefresh);
	  end.add(new qx.ui.core.Spacer(), {flex: 1});

          var bv=new qx.ui.container.Composite(new qx.ui.layout.VBox().set({alignX:'center'})).set({decorator:"pane-light-main",padding:8,paddingBottom:16});
          bv.add(bt,{flex:1});
          bv.add(end);
          bv.add(br);
          this._clientArea.add(bv, {left: 0, right: 0, top: 0, bottom: 0});
          
          tableModel = new qx.ui.table.model.Simple();
	  tableModel.setColumns(["Level", "Type", "Location", "Alliance", "Holder", "Assigned Holder", "Assigned By"]);
	  tableModel.setData([]);
          
	  var table = new webfrontend.gui.widgets.CustomTable(tableModel).set({});
	  table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.SINGLE_SELECTION);
	  table.setColumnVisibilityButtonVisible(false);
	  table.setStatusBarVisible(false);
	  table.addListener("cellClick", this.cellClick,this);
	  
          var tcm = table.getTableColumnModel();
          tcm.setDataCellRenderer(2, new qx.ui.table.cellrenderer.Html());
          tcm.setDataCellRenderer(3, new qx.ui.table.cellrenderer.Html());
          tcm.setDataCellRenderer(4, new qx.ui.table.cellrenderer.Html());
	  
          bt.add(table, {flex:1});
          bt.setPadding(10);
        },
        
        statics: {
          distCheckX: 275,
          distCheckY: 400,
          distMax: 100,
        },
        
        members: { 
          tableModel: null,
          
          refresh: function() {
            tableModel.setData([]);
            
            var data = [];
            var POIType = [null, "Tiberium", "Crystal", "Power", "Infantery", "Vehicle", "Air", "Defense"]
            
            var world = ClientLib.Data.MainData.GetInstance().get_World();
            var sectors = this.getSectors(world);
            for(var i in sectors) {
              var s = sectors[i];
              for(var x = 0; x < 32; x++) {
                for(var y = 0; y < 32; y++) {
                  var cx = s.ConvertToWorldX(x);
                  var cy = s.ConvertToWorldY(y);
                  var obj = world.GetObjectFromPosition(cx, cy);
                  if(obj != null) {
                    if(obj.Type == 4 && obj.POIType != 0) {
                      var holder = [];
                      var obj2 = this.getWorldObject(world, cx - 1, cy);
                      if(obj2 != null) holder.push(obj2);
                      obj2 = this.getWorldObject(world, cx - 1, cy - 1);
                      if(obj2 != null) holder.push(obj2);
                      obj2 = this.getWorldObject(world, cx - 1, cy + 1);
                      if(obj2 != null) holder.push(obj2);
                      obj2 = this.getWorldObject(world, cx, cy - 1);
                      if(obj2 != null) holder.push(obj2);
                      obj2 = this.getWorldObject(world, cx, cy + 1);
                      if(obj2 != null) holder.push(obj2);
                      obj2 = this.getWorldObject(world, cx + 1, cy);
                      if(obj2 != null) holder.push(obj2);
                      obj2 = this.getWorldObject(world, cx + 1, cy - 1);
                      if(obj2 != null) holder.push(obj2);
                      obj2 = this.getWorldObject(world, cx + 1, cy + 1);
                      if(obj2 != null) holder.push(obj2);
                      
                      var player = null;
                      var alliance = null;
                      if(holder.length > 0) {
                        player = world.GetWorldSectorByCoords(holder[0].x, holder[0].y).GetPlayer(holder[0].PlayerId);
                        alliance = world.GetWorldSectorByCoords(holder[0].x, holder[0].y).GetAlliance(player.Alliance);
                      }
                      
                      var linkAlliance = alliance != null ? qx.lang.String.format('<div style="cursor:pointer;color:%1">%2</div>', [webfrontend.theme.Color.colors["link-label-color"], alliance.Name]) : null;
                      var linkName = player != null ? qx.lang.String.format('<div style="cursor:pointer;color:%1">%2</div>', [webfrontend.theme.Color.colors["link-label-color"], player.Name]) : null;
                      var linkCoord = qx.lang.String.format('<div style="cursor:pointer;color:%1">%2</div>', [webfrontend.theme.Color.colors["link-label-color"], cx + ":" + cy]);
                      
                      var temp = [obj.Level, POIType[obj.POIType], linkCoord, linkAlliance, linkName];
                      temp.id = player != null ? player.Id : null;
                      temp.aid = alliance != null ? alliance.Id : null;
                      
                      data.push(temp)
                    }
                  }
                }
              }
            }
            
            tableModel.setData(data);
          },
          
          getWorldObject: function(world, x, y) {
            var obj = world.GetObjectFromPosition(x, y);
            
            if(obj != null && obj.Type == 1) {
              obj.x = x;
              obj.y = y;
              return obj;
            }
            
            return null;
          },
          
          getSectors: function(w) {
            if (w.KIH) {  // june version
              return w.KIH.d;
            } else if (w.RBJXOL) { // july
              return w.RBJXOL.d;
            } else if (w.IWEESP) { // closed beta 2 world
              return w.IWEESP.d;
            } else if (w.HYMYNV) { // July 11, 2012
              return w.HYMYNV.d;
            } else if (w.ONQEIH) { // July 19, 2012
              return w.ONQEIH.d;
            } else {
              console.log("POI Manager: invalid version.");
            }
          },
          
          cellClick: function(e) {
            var rowData = tableModel.getRowData(e.getRow());
            if(!rowData) return;
            var col = e.getColumn();
            switch(tableModel.getColumnId(col)) {
              case "Holder":
                if(rowData.hasOwnProperty("id") && rowData["id"] > 0)
                  webfrontend.gui.info.PlayerInfoWindow.getInstance().openWithPlayerId(rowData["id"]);
                break;
              case "Alliance":
                if(rowData.hasOwnProperty("aid") && rowData["aid"] > 0)
                  webfrontend.gui.info.AllianceInfoWindow.getInstance().openWithAllianceId(rowData["aid"]);
                break;
            }
          },
        },
      });
        
        
        
      windowPOI = new webfrontend.gui.POI.poi();
      
      var buttonMap = new qx.ui.form.Button("Manage POI's");
      buttonMap.set({
        width : 80,
        appearance : "button-bar-center",
        toolTipText : ""
      });
      buttonMap.addListener("click", showPOI, this);
      var mainBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_MENU);
      mainBar.getChildren()[1].addAt(buttonMap, 8, {
        top : 0,
        right : 0
      });
    }
    
    function showPOI() {
      windowPOI.open();
    }
 
    function tapoi_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined') {
          a = qx.core.Init.getApplication(); // application
          mb = qx.core.Init.getApplication().getMenuBar();
          if (a && mb) {
            initialize();
          } else
            window.setTimeout(tapoi_checkIfLoaded, 1000);
        } else {
          window.setTimeout(tapoi_checkIfLoaded, 1000);
        }
      } catch (e) {
        if (typeof console != 'undefined') console.log(e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
    }
    
    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(tapoi_checkIfLoaded, 1000);
    }
  }

  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var tapoiScript = document.createElement("script");
  tapoiScript.innerHTML = "(" + tapoi_main.toString() + ")();";
  tapoiScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(tapoiScript);
  }
})();