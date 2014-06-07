// ==UserScript==
// @name          PluginsLib - mhNavigator - Tiberium Alliances
// @namespace     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description   Creates compass poiting to the currently selected base (compass points from itself).
// @version       1.35
// @author        MrHIDEn (in game PEEU) based on Caine code. Extended
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @grant         none
// @downloadURL   https://userscripts.org/scripts/source/159496.user.js
// @updateURL     https://userscripts.org/scripts/source/159496.meta.js
// ==/UserScript==
(function () {
function injectBody()
{
  //TODO for debug purpose only. remove if you do not need.
  var ccl=console.log;var cci=console.info;var ccw=console.warn;var ccd=console.dir; var ccc=console.clear;
  var disable=0;if(disable){var f=function(){};ccl=f;cci=f;ccw=f;ccd=f;ccc=f;}

  var pluginName = "mhNavigator";
  var created = false;
  function CreateClasses() {
    function classExist(name) {
      if(name===null || name===undefined) return;
      var sp = name.split('.');
      var w = window;
      for(var i=0;i<sp.length;i++) {
        w = w[sp[i]];
        if(w===undefined) {
          return false;
        }
      }
      return true;
    }
    if(!classExist('qx.html.Canvas')) {
      qx.Class.define("qx.html.Canvas",
      {
        extend : qx.html.Element,
        construct : function(styles, attributes)
        {
          this.base(arguments, "canvas", styles, attributes);
          this.__canvas = document.createElement("canvas");
        },
        members :
        {
          __canvas : null,
          _createDomElement : function() {
            return this.__canvas;
          },
          getCanvas : function() {
            return this.__canvas;
          },
          setWidth : function(width) {
            this.__canvas.width = width;
          },
          getWidth : function() {
            return this.__canvas.width;
          },
          setHeight : function(height) {
            this.__canvas.height = height;
          },
          getHeight : function() {
            return this.__canvas.height;
          },
          getContext2d : function() {
            return this.__canvas.getContext("2d");
          }
        },
        destruct : function() {
          this.__canvas = null;
        }
      });
      cci('qx.html.Canvas ADDED');
    }
    if(!classExist('qx.ui.embed.Canvas')) {
      qx.Class.define("qx.ui.embed.Canvas",
      {
        extend : qx.ui.core.Widget,
        construct : function(canvasWidth, canvasHeight)
        {
          this.base(arguments);
          this.__deferredDraw = new qx.util.DeferredCall(this.__redraw, this);
          this.addListener("resize", this._onResize, this);
          if (canvasWidth !== undefined) {
            this.setCanvasWidth(canvasWidth);
          }
          if (canvasHeight !== undefined) {
            this.setCanvasHeight(canvasHeight);
          }
        },
        events :
        {
          "redraw" : "qx.event.type.Data"
        },
        properties :
        {
          syncDimension :
          {
            check : "Boolean",
            init : false
          },
          canvasWidth :
          {
            check : "Integer",
            init : 300,
            apply : "_applyCanvasWidth"
          },
          canvasHeight :
          {
            check : "Integer",
            init : 150,
            apply : "_applyCanvasHeight"
          }
        },
        members :
        {
          __deferredDraw : null,
          _createContentElement : function() {
            return new qx.html.Canvas();
          },
          __redraw : function()
          {
            var canvas = this.getContentElement();
            var height = canvas.getHeight();
            var width = canvas.getWidth();
            var context = canvas.getContext2d();
            this._draw(width, height, context);
            this.fireNonBubblingEvent(
              "redraw",
              qx.event.type.Data,
              [{
                width: width,
                height: height,
                context: context
              }]
            );
          },
          _applyCanvasWidth : function(value, old)
          {
            this.getContentElement().setWidth(value);
            this.__deferredDraw.schedule();
          },
          _applyCanvasHeight : function(value, old)
          {
            this.getContentElement().setHeight(value);
            this.__deferredDraw.schedule();
          },
          update : function() {
            this.__deferredDraw.schedule();
          },
          _onResize : function(e)
          {
            var data = e.getData();

            if (this.getSyncDimension())
            {
              this.setCanvasHeight(data.height);
              this.setCanvasWidth(data.width);
            }
          },
          getContext2d : function() {
            return this.getContentElement().getContext2d();
          },
          _draw : function(width, height, context) {}
        },
        destruct : function() {
          this._disposeObjects("__deferredDraw");
        }
      });
      cci('qx.ui.embed.Canvas ADDED');
    }
    // MAIN BODY
    qx.Class.define("PluginsLib." + pluginName,
    {
      type: 'singleton',
      extend: qx.core.Object,
      statics : {
        NAME: 'Navigator',
        PLUGIN: 'mhNavigator',
        AUTHOR: 'MrHIDEn',
        VERSION: 1.35,
        REQUIRES: '',
        NEEDS: 'Menu',
        INFO: 'This script uses compas look like navigator.',
        WWW: 'http://userscripts.org/scripts/show/159496',
        ONPLUGIN: null,
        ONOPTIONS: null,
        SIZE: 0
      },
      construct: function() {
        try {
          this.stats.src = 'http://goo.gl/aeCxf';//1.0.0 1.1.0 1.2.0 1.3x
          this.Self = this;
          var backColor = '#eeeeff';          
          //var STATIC = PluginsLib[this.basename];
          var serv = ClientLib.Data.MainData.GetInstance().get_Server();
          this.cenX = serv.get_ContinentWidth() / 2;
          this.cenY = serv.get_ContinentHeight() / 2;
          var pos = this.loadFromStorage('lock', {x:this.cenX, y:this.cenY});
          this.lockX = pos.x;
          this.lockY = pos.y;
          this.posTimer = new qx.event.Timer();
          this.posTimer.addListener("interval",this.onPosTimer,this);
          //this.winName = "Navigator " + PluginsLib.mhNavigator.VERSION.toFixed(2);
          this.winName = "Navigator " + this.constructor.VERSION.toFixed(2);
          this.win = new qx.ui.window.Window(this.winName);
          this.win.set({
            width:120,
            //showMinimize:false,
            showMaximize:false,
            showClose:false,
            padding: 1,
            //contentPadding: 6,
            allowClose:false,
            //allowMinimize:false,
            resizable:false,
            toolTipText: "MrHIDEn tool - Navigator."
          });
          this.win.addListener("minimize",function(e) {
            if(this.extMinimized) {
              this.extMinimized = false;
              for(var k in this.extItems) this.win.add(this.extItems[k]);
            }
            else {
              this.extMinimized = true;
              this.win.removeAll();
            }
            this.win.restore();//trick
          },this);
          this.win.addListener("move", function(e) {
            var pos = {left:e.getData().left, top:e.getData().top};
            this.saveToStorage('winpos', pos);
          }, this);
          pos = this.loadFromStorage('winpos', {left:130, top:5});
          this.win.moveTo(pos.left, pos.top);
          var winLayout = new qx.ui.layout.VBox();
          winLayout.setAlignX("center");
          this.win.setLayout(winLayout);

          var winXYLayout = new qx.ui.layout.VBox();
          this.winXY = new qx.ui.window.Window("Go to x:y");
          this.winXY.set({
            width:170,
            height:50,
            showMinimize:false,
            showMaximize:false,
            showClose:true,
            //contentPadding: 6,
            padding: 1,
            resizable:false
            //layout:winXYLayout
          });
          this.winXY.setLayout(winXYLayout);
          this.winXY.setToolTipText('Proper values:<br>333 444<br>333:444<br>333;444<br>333,444<br>333.444<br>[coords]333:444[/coords]');
          var cntXY = new qx.ui.container.Composite(new qx.ui.layout.VBox());
          //cntXY.setThemedBackgroundColor(backColor);
          cntXY.setBackgroundColor(backColor);
          var lblXY = new qx.ui.basic.Label('Write X:Y and press [Enter]');
          this.txtXY = new qx.ui.form.TextField('');
          this.txtXY.set(
          {
            required    : true,
            placeholder : "Ex: 333:444"
          });
          this.txtXY.addListener("keydown", function(e) {
            if(e.getKeyIdentifier()=="Enter") {
              var txt = this.txtXY.getValue();
              if(txt.length>2) {
                  txt = txt.trim();
                  txt = txt.replace('[coords]','').replace('[/coords]','');
                  txt = txt.replace(' ',':');
                  txt = txt.replace(';',':');
                  txt = txt.replace(',',':');
                  txt = txt.replace('.',':');
                  var s = txt.split(':');
                  if(s.length==2) {
                    var x = s[0];
                    var y = s[1];
                    if(!isNaN(parseInt(x)) && !isNaN(parseInt(y))) {
                      x = parseInt(x);
                      y = parseInt(y);
                      webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(x,y);
                      this.txtXY.setValue('');
                      this.winXY.close();
                    }
                  }
                  return;
              }
              alert('Use:\nnumers and one of allowed separators \' :;,.\' \nor [coords]333:444[/coords]');
            }
          }, this);
          this.winXY.add(cntXY);
          cntXY.add(lblXY);
          cntXY.add(this.txtXY);


          // Compass 1 //////////////////////////////////////////////////////////////
          var canvas1 = new qx.ui.embed.Canvas();
          canvas1.set({
            width: 50,
            height: 50,
            canvasWidth: 50,
            canvasHeight: 50,
            toolTipText: "Pointing selected base."
          });
          canvas1.addListener("click",function(e) {
            var cid  = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
            webfrontend.gui.UtilView.centerCityOnRegionViewWindow(cid);
            this.displayCompass();
          },this);
          canvas1.set({
            toolTipText: "Click - go to."
          });
          var hboxNav1 = new qx.ui.layout.HBox();
          hboxNav1.setAlignX("center");
          var cntNav1 = new qx.ui.container.Composite();
          cntNav1.setLayout(hboxNav1);
          //cntNav1.setThemedBackgroundColor(backColor);
          cntNav1.setBackgroundColor(backColor);
          cntNav1.add(canvas1);
          this.ctx1 = canvas1.getContext2d();
          // add
          this.extItems.push(cntNav1);

          // Info //////////////////////////////////////////////////////////////
          var vboxInfo1 = new qx.ui.layout.VBox();
          vboxInfo1.setAlignX("center");
          var cntInfo1 = new qx.ui.container.Composite();
          cntInfo1.setLayout(vboxInfo1);
          //cntInfo1.setThemedBackgroundColor(backColor);
          cntInfo1.setBackgroundColor(backColor);
          cntInfo1.setThemedFont("bold");
          this.disBase = new qx.ui.basic.Label('0');
          this.disBase.set({
            toolTipText: "Distance from your current base to the center of view."
          });
          cntInfo1.add(new qx.ui.basic.Label("Current Base"));
          cntInfo1.add(this.disBase);
          // add
          this.extItems.push(cntInfo1);

          // Compass 2 //////////////////////////////////////////////////////////////
          var canvas2 = new qx.ui.embed.Canvas();
          canvas2.set({
            width: 50,
            height: 50,
            canvasWidth: 50,
            canvasHeight: 50,
            toolTipText: "Pointing locked base. Click this to lock center of the map."
          });
          canvas2.addListener("click",function(e) {
            webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(this.lockX,this.lockY);
          },this);
          canvas2.set({
            toolTipText: "Click - go to."
          });
          var hboxNav2 = new qx.ui.layout.HBox();
          hboxNav2.setAlignX("center");
          var cntNav2 = new qx.ui.container.Composite();
          cntNav2.setLayout(hboxNav2);
          //cntNav2.setThemedBackgroundColor(backColor);
          cntNav2.setBackgroundColor(backColor);
          cntNav2.add(canvas2);
          this.ctx2 = canvas2.getContext2d();
          // add
          this.extItems.push(cntNav2);


          var vboxInfo2 = new qx.ui.layout.VBox();
          vboxInfo2.setAlignX("center");
          var cntInfo2 = new qx.ui.container.Composite();
          cntInfo2.setLayout(vboxInfo2);
          //cntInfo2.setThemedBackgroundColor(backColor);
          cntInfo2.setBackgroundColor(backColor);
          cntInfo2.setThemedFont("bold");

          this.coordLock = new qx.ui.basic.Label(this.lockX.toString()+':'+this.lockY.toString());//('X:Y');
          //this.coordLock.setValue(this.lockX.toString()+':'+this.lockY.toString());
          this.coordLock.set({
            toolTipText: "Click - set center of map."
          });
          this.coordLock.addListener("click",function(e) {
            var serv = ClientLib.Data.MainData.GetInstance().get_Server();
            this.lockX = serv.get_ContinentWidth() / 2;
            this.lockY = serv.get_ContinentHeight() / 2;
            this.coordLock.setValue(this.lockX.toString()+':'+this.lockY.toString());
            this.saveToStorage('lock', {x:this.lockX,y:this.lockY});
            this.displayCompass();
          },this);
          this.disLock = new qx.ui.basic.Label('0');
          this.disLock.set({
            toolTipText: "Distance from locked object to the selected object."
          });
          var btnXY = new qx.ui.form.Button("X:Y");
          btnXY.set({
            width:50,
            toolTipText: "Go to position."
          });
          btnXY.addListener("execute", function(e) {
            var lp = this.win.getLayoutProperties();
            this.winXY.moveTo(lp.left, lp.top+150);
            this.winXY.open();
            this.txtXY.focus();
          }, this);
          var btnLock = new qx.ui.form.Button("Lock");
          btnLock.set({
            width:60,
            toolTipText: "Lock position of the selected object."
          });
          btnLock.addListener("execute", function(e) {
            this.lockX = this.selX;
            this.lockY = this.selY;
            this.coordLock.setValue(this.lockX.toString()+':'+this.lockY.toString());
            this.saveToStorage('lock', {x:this.lockX,y:this.lockY});
            this.displayCompass();
          }, this);
          cntInfo2.add(this.coordLock);
          cntInfo2.add(this.disLock);
          // add
          this.extItems.push(cntInfo2);

          var cntButtons = new qx.ui.container.Composite(new qx.ui.layout.HBox());
          //cntButtons.setThemedBackgroundColor(backColor);
          cntButtons.setBackgroundColor(backColor);
          cntButtons.add(btnXY);
          cntButtons.add(btnLock);
          // add
          this.extItems.push(cntButtons);

          for(var k in this.extItems) this.win.add(this.extItems[k]);

          this.win.open();

          phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this.onPositionChange);
          phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);

          //REGISTER PLUGIN
          //this.constructor.ONPLUGIN = function(){this.constructor.getInstance().open();};
          //this.constructor.ONOPTIONS = function(){this.constructor.getInstance().open();};//test
          PluginsLib.Menu.getInstance().RegisterPlugin(this);
          
          //READY
          console.info("Plugin '"+pluginName+"' LOADED");
        } catch (e) {
          console.error(this.classname,".construct: ", e);
        }
      },
      members: {
        Self: null,
        stats: document.createElement('img'),
        winName: '',
        win: null,
        extItems: [],
        extMinimized: false,
        winXY: null,
        txtXY: null,
        posTimer: null,
        disBase: null,
        disObj: null,
        coordLock: null,
        disLock: null,
        ctx1: null,
        ctx2: null,
        background: null,
        size: 50,
        LObjectType: [],
        selX: -1,
        selY: -1,
        lockX: 0,
        lockY: 0,
        cenX: 0,
        cenY: 0,
        selected: null,
        visObject: null,
        loadFromStorage: function(key,preval) {
          var S = ClientLib.Base.LocalStorage;
          if (S.get_IsSupported()) {
            var val = S.GetItem(this.classname+'.'+key);
            if(val!==null) {
              preval = val;
            }
          }
          return preval;
        },
        saveToStorage: function(key,val) {
          if(val!==null) {
            var S = ClientLib.Base.LocalStorage;
            if (S.get_IsSupported()) S.SetItem(this.classname+'.'+key, val);
          }
        },
        onPositionChange: function (e) {
          //console.log('onPositionChange');
          this.posTimer.restartWith(200);
        },
        onPosTimer: function (e) {
          //console.log('onPosTimer');
          this.posTimer.stop();
          this.displayCompass();
        },
        onSelectionChange: function (l,c) {
          //console.log('onSelectionChange.c:',c);
          try {
            var visObject = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
            if (visObject!==null) {
              var t = visObject.get_VisObjectType();
              switch (t) {
                /* NOTE
                RegionCityType
                RegionSuperWeaponType
                RegionTerrainType
                RegionMoveTarget
                RegionFreeSlotType
                RegionNPCBase
                RegionNPCCamp
                RegionPointOfInterest
                RegionRuin
                RegionGhostCity
                RegionNewPlayerSpot
                RegionHub  */
                case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
                case ClientLib.Vis.VisObject.EObjectType.RegionRuin:
                case ClientLib.Vis.VisObject.EObjectType.RegionHubControl:
                case ClientLib.Vis.VisObject.EObjectType.RegionHubCenter:
                  //this.calcDistance();
                  //console.log('visObject:',visObject);
                  //console.log('Vis Object Type:',t,', ',this.LObjectType[t]);
                  this.visObject = visObject;
                  this.selX = visObject.get_RawX();
                  this.selY = visObject.get_RawY();
                  this.selected = true;
                  this.displayCompass();
                  break;
                default:
                  break;
              }
            }
          } catch (e) {
            console.error(this.classname,".onSelectionChange", e);
          }
        },
        displayCompass: function () {
          //console.log('displayCompass:');
          try {
            if(this.ctx1===null) return;
            if(this.ctx2===null) return;
            var ctx1 = this.ctx1;
            var ctx2 = this.ctx2;
            var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
            var cityCoordX = currentCity.get_PosX();
            var cityCoordY = currentCity.get_PosY();
            if(this.selX==-1 && this.selY==-1) {
              this.selX = currentCity.get_PosX();
              this.selY = currentCity.get_PosY();
              //this.coordLock.setValue(this.lockX.toString()+':'+this.lockY.toString());
            }

            var region = ClientLib.Vis.VisMain.GetInstance().get_Region();
            var gridW = region.get_GridWidth();
            var gridH = region.get_GridHeight();
            var regionX = region.get_PosX();
            var regionY = region.get_PosY();
            var viewW = region.get_ViewWidth();
            var viewH = region.get_ViewHeight();
            var zoom = region.get_ZoomFactor();

            var viewCoordX = (regionX + viewW / 2 / zoom) / gridW - 0.5;
            var viewCoordY = (regionY + viewH / 2 / zoom) / gridH - 0.5;

            var dx = viewCoordX - cityCoordX;
            var dy = cityCoordY - viewCoordY;
            var distance = Math.sqrt(dx * dx + dy * dy);

            ctx1.clearRect(0, 0, 50, 50);
            ctx1.save();
            ctx1.translate(25, 25);
            ctx1.rotate(dy > 0 ? Math.asin(dx / distance) + Math.PI : -Math.asin(dx / distance));
            this.drawCompass(ctx1);
            ctx1.restore();

            var dx2 = this.selX - this.lockX;
            var dy2 = this.lockY - this.selY;
            var distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
            ctx2.clearRect(0, 0, 50, 50);
            ctx2.save();
            ctx2.translate(25, 25);
            ctx2.rotate(dy2 > 0 ? Math.asin(dx2 / distance2) + Math.PI : -Math.asin(dx2 / distance2));
            this.drawCompass(ctx2);
            ctx2.restore();

            this.disBase.setValue(distance.toFixed(1).toString());
            var ltext = ClientLib.Base.Util.CalculateDistance(this.lockX, this.lockY, this.selX, this.selY);
            this.disLock.setValue(ltext.toString());


          } catch (e) {
            console.error(this.classname,".displayCompass", e);
          }
        },
        drawCompass: function(c) {
          //console.log('drawCompass:');
          c.strokeStyle = 'black';
          c.beginPath();
          c.arc(0,0,20,0,Math.PI*2,true); // Outer circle
          c.stroke();

          c.strokeStyle = 'black';
          c.beginPath();
          c.moveTo(0, 0);
          c.lineTo(0, -20);  // Line
          c.closePath();
          c.stroke();

          c.beginPath();
          c.strokeStyle = 'black';
          c.fillStyle = 'white';
          c.arc(0,0,4,0,Math.PI*2,true); // Inner dot
          c.fill();
          c.stroke();

          c.beginPath();
          c.strokeStyle = 'black';
          c.fillStyle = 'aqua';
          c.arc(0,-20,4,0,Math.PI*2,true); // Outer dot
          c.fill();
          c.stroke();
        }
      }
    });
  }//CreateClasses()
  function WaitForGame() {
    try
    {
      if (typeof(qx) != 'undefined' && typeof(qx.core) != 'undefined' && typeof(qx.core.Init) != 'undefined')
      {
        var app = qx.core.Init.getApplication();
        if (app.initDone===true)
        {
          if(!created) CreateClasses();
          
          var plugin = PluginsLib[pluginName];
          var ready = true;
          if(plugin.REQUIRES.length > 0) {
            var req = plugin.REQUIRES.split(',');
            //check all requires
            for(var i in req) {
              //cci(req[i]);
              if(typeof(PluginsLib[req[i]])=='undefined') {
                console.log(pluginName,'.WaitForGame.REQUIRES ',req[i],typeof(PluginsLib[req[i]]));
                ready = false;
                break;//WAIT
              }
            }
          }
          if(ready) {
            plugin.getInstance();
            plugin.SIZE = scriptSize;
            console.info("Plugin '"+plugin.getInstance().basename+"' READY");
            return;//DONE
          }
        }
      }
    } catch (e) {
      console.error('PluginsLib.'+pluginName,'.WaitForGame: ', e);
    }
    window.setTimeout(WaitForGame, 2000);
  }
  window.setTimeout(WaitForGame, 2000);
}
function Inject() {
  var script = document.createElement('script');
  var txt = injectBody.toString();
  txt = txt.replace('{','{\r\n  var scriptSize='+(txt.length+22).toString()+';');
  script.innerHTML = '(' + txt + ')();';
  script.type = 'text/javascript';
  document.head.appendChild(script);
}
Inject();
})();