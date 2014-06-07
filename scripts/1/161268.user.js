// ==UserScript==
// @name          Tiberium Aliances Navigator - Compass
// @namespace     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description   Creates compass poiting to the currently selected base (compass points from itself).
// @version       1.1.0 RUS
// @author        MrHIDEn based on Caine code. Extended | translation 777lexa777
// @grant         none
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// ==/UserScript==

(function () {
  var CompassMain = function () {
    try {
      function createNavigator() {
        //http://userscripts.org/scripts/show/159496
        qx.Class.define('MHTools.Navigator', {
          type: 'singleton',
          extend: qx.core.Object,
          statics : {
            VERSION: '1.1.0',
            AUTHOR: 'MrHIDEn',
            CLASS: 'Navigator'
          },
          construct: function() {
            try {
              try {
                this.stats.src = 'http://goo.gl/aeCxf';//1.0.0
                this.Self = this;
                var backColor = '#eef';
                var ser = ClientLib.Data.MainData.GetInstance().get_Server();         
                this.cenX = ser.get_ContinentWidth() / 2;
                this.cenY = ser.get_ContinentHeight() / 2;
                this.lockX = this.cenX;
                this.lockY = this.cenY;
                //this.Window = new webfrontend.gui.OverlayWindow().set({
                    // autoHide: false,
                    // title: WindowTitle,
                    // minHeight: 350

                    // //resizable: false,
                    // //showMaximize:false,
                    // //showMinimize:false,
                    // //allowMaximize:false,
                    // //allowMinimize:false,
                    // //showStatusbar: false
                  // });                  
                  // this.Window.clientArea.setPadding(10);
                  // this.Window.clientArea.setLayout(new qx.ui.layout.VBox(3));
                this.win = (new qx.ui.window.Window("Навигатор")).set({
                  width:120,
                  //showMinimize:false,
                  showMaximize:false,
                  showClose:false,
                  //appearance:'navigator',
                  contentPadding: 6,
                  allowClose:false,
                  //allowMinimize:false,
                  resizable:false,                  
                  toolTipText: "Навигатор | Перевёл - 777lexa777."
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
                this.win.moveTo(130,5);
                var winLayout = new qx.ui.layout.VBox();
                winLayout.setAlignX("center");
                this.win.setLayout(winLayout);
                
                
                // Compass 1 //////////////////////////////////////////////////////////////
                var hbox = new qx.ui.layout.HBox();
                hbox.setAlignX("center");
                var compass = (new qx.ui.embed.Canvas()).set({
                  width: 50,
                  height: 50,
                  canvasWidth: 50,
                  canvasHeight: 50,
                  toolTipText: "Pointing selected base."
                });
                compass.addListener("click",function(e) {
                  var cid  = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
                  webfrontend.gui.UtilView.centerCityOnRegionViewWindow(cid);
                },this);
                compass.set({
                  toolTipText: "Нажать для перехода."
                });
                var cnt1 = new qx.ui.container.Composite();
                cnt1.setLayout(hbox);
                cnt1.setThemedBackgroundColor(backColor);
                cnt1.add(compass);
                this.ctx1 = compass.getContext2d();
                // add
                this.extItems.push(cnt1);
                
                // Info //////////////////////////////////////////////////////////////
                var vbox = new qx.ui.layout.VBox();
                vbox.setAlignX("center");
                var cnt2 = new qx.ui.container.Composite();  
                cnt2.setLayout(vbox);                        
                cnt2.setThemedBackgroundColor(backColor);
                cnt2.setThemedFont("bold");
                this.disBase = new qx.ui.basic.Label('1.0');
                this.disBase.set({
                  toolTipText: "Расстояние от выбранного обьекта до центра экрана."
                });
                cnt2.add(new qx.ui.basic.Label("Текущая база:"));
                cnt2.add(this.disBase);
                // add
                this.extItems.push(cnt2);
                
                // Compass 2 //////////////////////////////////////////////////////////////
                var hbox2 = new qx.ui.layout.HBox();
                hbox2.setAlignX("center");
                var compass2 = (new qx.ui.embed.Canvas()).set({
                  width: 50,
                  height: 50,
                  canvasWidth: 50,
                  canvasHeight: 50,
                  toolTipText: "Pointing locked base. Click this to lock center of the map."
                });
                compass2.addListener("click",function(e) {
                  webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(this.lockX,this.lockY);
                },this);
                compass2.set({
                  toolTipText: "Нажать для перехода."
                });
                var cnt4 = new qx.ui.container.Composite();
                cnt4.setLayout(hbox2);
                cnt4.setThemedBackgroundColor(backColor);
                cnt4.add(compass2);
                this.ctx2 = compass2.getContext2d();
                // add
                this.extItems.push(cnt4);
                
                
                var vbox2 = new qx.ui.layout.VBox();
                vbox2.setAlignX("center");
                var cnt3 = new qx.ui.container.Composite();
                cnt3.setLayout(vbox2);
                cnt3.setThemedBackgroundColor('#eef');
                cnt3.setThemedFont("bold");

                this.coordLock = new qx.ui.basic.Label('X:Y');
                this.coordLock.set({
                  toolTipText: "Нажать для выбора центра карты."
                });
                this.coordLock.addListener("click",function(e) {                
                  var ser = ClientLib.Data.MainData.GetInstance().get_Server();         
                  this.lockX = ser.get_ContinentWidth() / 2;
                  this.lockY = ser.get_ContinentHeight() / 2;
                  this.coordLock.setValue(this.lockX.toString()+':'+this.lockY.toString());
                  this.displayCompass();
                },this);
                this.disLock = new qx.ui.basic.Label('3.0');
                this.disLock.set({
                  toolTipText: "Расстояние от заблокированного объекта до выбранного."
                });
                var btnLock = new qx.ui.form.Button("Блок");
                btnLock.set({
                  //width:50,
                  toolTipText: "Заблокировать позицию для выбранного обьекта."
                });
                btnLock.addListener("execute", function(e) {
                  this.lockX = this.selX;
                  this.lockY = this.selY;
                  this.coordLock.setValue(this.lockX.toString()+':'+this.lockY.toString());
                  this.displayCompass();
                }, this);
                cnt3.add(this.coordLock);
                cnt3.add(this.disLock);
                cnt3.add(btnLock);
                // add
                this.extItems.push(cnt3);
                
                for(var k in this.extItems) this.win.add(this.extItems[k]);
                
                this.win.open();
                //tst.navigator = this;
              } catch (e) {
                console.warn("win.initialize: ", e);
              }
             
              phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this.displayCompass);
              phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
            
              console.log('Navigator loaded');
            } catch (e) {
              console.warn("Compass.initialize: ", e);
            }
          },
          properties: {
            Property1: { init: 'P1', check: "String" }
          },
          members: {
            Self: null,
            stats: document.createElement('img'),
            win: null,
            extItems: [],
            extMinimized: false,
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
            onSelectionChange: function (l,c) {
              try {
                //console.log('onSelectionChange.c:',c);
                var visObject = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
                if (visObject != null) {
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
                    case ClientLib.Vis.VisObject.EObjectType.RegionHub:
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
                console.log("onSelectionChange", e);
              }
            },
            displayCompass: function () {
              try {
                var ctx1 = this.ctx1;  
                if(ctx1===null) return;
                var ctx2 = this.ctx2;  
                if(ctx2===null) return;
                var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                var cityCoordX = currentCity.get_PosX();
                var cityCoordY = currentCity.get_PosY();
                if(this.selX==-1 && this.selY==-1) {                
                  this.selX = currentCity.get_PosX();
                  this.selY = currentCity.get_PosY();
                  this.coordLock.setValue(this.lockX.toString()+':'+this.lockY.toString());
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
                //ctx1.drawImage(this.needle, -this.size / 2, -this.size / 2 - 0);   
                this.drawCompass(ctx1);
                ctx1.restore();              
                
                var dx2 = this.selX - this.lockX;
                var dy2 = this.lockY - this.selY;
                var distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                ctx2.clearRect(0, 0, 50, 50);                
                ctx2.save();                
                ctx2.translate(25, 25);
                ctx2.rotate(dy2 > 0 ? Math.asin(dx2 / distance2) + Math.PI : -Math.asin(dx2 / distance2));
                //ctx2.drawImage(this.needle, -this.size / 2, -this.size / 2 - 0);   
                this.drawCompass(ctx2);
                ctx2.restore();             
                
                this.disBase.setValue(distance.toFixed(1));
                var ltext = ClientLib.Base.Util.CalculateDistance(this.lockX, this.lockY, this.selX, this.selY);
                this.disLock.setValue(ltext.toString());              
                
                
              } catch (e) {
                console.warn("displayCompass", e);
              }
            },
            drawCompass: function(c) {
              c.clearRect(-100,-100,200,200);
              c.strokeStyle = 'black';
              c.beginPath();
              c.arc(0,0,20,0,Math.PI*2,true); // Outer circle
              c.stroke();

              //c.translate(25,25);
              //c.rotate(45 * Math.PI / 180);

              c.beginPath();
              c.moveTo(0, 0);
              c.lineTo(0, -20);  // Line
              c.closePath();
              c.stroke();

              c.beginPath();
              c.fillStyle = 'white';
              c.arc(0,0,4,0,Math.PI*2,true); // Inner dot
              c.fill();
              c.stroke();

              c.beginPath();
              c.fillStyle = 'aqua';
              c.arc(0,-20,4,0,Math.PI*2,true); // Outer dot
              c.fill();
              c.stroke();
            }
          }
        });
      }
    } catch (e) {
      console.log('createNavigator: ', e);
    }

    function CompassCheckLoaded() {
      try {
        if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
          createNavigator();
          //window.Navigator.getInstance();
          MHTools.Navigator.getInstance();
        } else {
          window.setTimeout(CompassCheckLoaded, 1000);
        }
      } catch (e) {
        console.log('CompassCheckLoaded: ', e);
      }
    }
    //if (/commandandconquer\.com/i.test(document.domain)) {
    window.setTimeout(CompassCheckLoaded, 1000);
    //}
  }
  try {
    var CompassScript = document.createElement('script');
    CompassScript.innerHTML = "(" + CompassMain.toString() + ')();';
    CompassScript.type = 'text/javascript';
    //if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName('head')[0].appendChild(CompassScript);
    //}
  } catch (e) {
    console.log('Compass: init error: ', e);
  }
})();
