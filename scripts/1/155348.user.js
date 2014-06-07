// ==UserScript==
// @name        C&C:TA Range Movable
// @namespace   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description Shows attack range.
// @version     1.0.0 Testing
// @author      Waiti83
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// ==/UserScript==
(function () {
    var RangeMain = function () {
        try {
            function createRange() {
                console.log('Range loaded');
                qx.Class.define("Range", {
                    extend: qx.ui.window.Window,
                    construct: function () {
                        this.base(arguments);
                        this.setWidth(128);
                        this.setHeight(96);
                        this.setContentPadding(0);
                        this.setShowMinimize(true);
                        this.setShowMaximize(false);
                        this.setShowClose(false);
                        this.setResizable(false);
                        this.setAllowMaximize(false);
                        this.setAllowMinimize(false);
                        this.setAllowClose(false);
                        this.setShowStatusbar(false);
                        this.setDecorator(null);                        
                        var title = this.getChildControl("title");
                        title.setTextAlign("center");
                        title.setTextColor("#000");
                        title.setRich(true);
                        title.setDecorator("tabview-chat-pane");
                        var captionBar = this.getChildControl("captionbar");
                        captionBar.setDecorator(null);
                        captionBar.remove(this.getChildControl("icon"));
                        //captionBar.remove(this.getChildControl("minimize-button"));
                        captionBar.remove(this.getChildControl("restore-button"));
                        captionBar.remove(this.getChildControl("maximize-button"));
                        captionBar.remove(this.getChildControl("close-button"));
                        captionBar.setLayout(new qx.ui.layout.Grow());
                       
                        var pane = this.getChildControl("pane");
                        pane.setDecorator(null);
                        pane.setLayout(new qx.ui.layout.Grow());
                        this.setLayout(new qx.ui.layout.Canvas());
                      
                        var st = '<canvas id="range" style="border:1px solid;position: absolute; top: 0px; left: 0px;" height="96" width="128"></canvas>';
                        var l = new qx.ui.basic.Label().set({
                            value: st,
                            rich: true
                        });
                        this.add(l);  
                        if (PerforceChangelist >= 382917) {
                            phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this.displayRange);
                        } else {
                            webfrontend.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this.displayRange);
                        }
                        this.addListener("move", function (e) {
                            this.displayRange();
                        });
                        this.displayRange();
                        
                    },
                    members: {
                        needle: null,                        
                        ec: null,
                        ctx: null,
                        halfsize: 25,
                        displayRange: function () {
                            try {                                                              
                                if (this.ctx != null) {   
                                        var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity(); 
                                        var faction = currentCity.get_CityFaction();
                                        var winpos = this.getLayoutProperties();
                                        var ctx = this.ctx; 
                                        var cityCoordX = currentCity.get_PosX();
                                        var cityCoordY = currentCity.get_PosY();
                                        var region = ClientLib.Vis.VisMain.GetInstance().get_Region();
                                        var zoom = region.get_ZoomFactor();
                                        var targetCoordX = winpos.left + 34;
                                        var targetCoordY = winpos.top +  61;
                                        var gridW = region.get_GridWidth();
                                        var gridH = region.get_GridHeight();
                                        var viewCoordX = (region.get_PosX() + targetCoordX / zoom - zoom * gridW / 2) / gridW;
                                        var viewCoordY = (region.get_PosY() + targetCoordY / zoom - zoom * gridH / 2) / gridH;
                                        var dx = viewCoordX - cityCoordX;
                                        var dy = cityCoordY - viewCoordY;
                                        var distance = Math.sqrt(dx * dx + dy * dy);
                                        var dtext = Math.round(10 * distance) / 10;
                                        var t = qx.lang.String.pad(currentCity.get_Name(),7,"")+"<br>"+dtext;
                                        this.setCaption(t);
var img = new Image();
img.src = 'http://compi-doc.de/cob/scripts/range/range1.png';
document.body.appendChild( img );
                                        
//                                        ctx.clearRect(0, 0, 50, 50);
//                                        ctx.save();
//                                        ctx.globalAlpha = 0.5;
//                                        ctx.fillStyle = '#000';
//                                        ctx.fillRect(0, 0, 50, 50); // Mittelpunkt
//                                        ctx.globalAlpha = 1.0;
                     
//                                        ctx.translate(25, 25);
//                                        ctx.rotate(dy > 0 ? Math.asin(dx / distance) : -Math.asin(dx / distance) + Math.PI); 
//                                        ctx.beginPath();			
//                                        ctx.moveTo(0, 20);			
//                                        ctx.lineTo(17, -15);
//                                        ctx.lineTo(-17, -15);
//                                        ctx.closePath();
//                                        ctx.moveTo(0, 0);			
//                                        ctx.lineTo(10, -22);
//                                        ctx.lineTo(-10, -22);
//                                        ctx.closePath();            
                                        
//                                        ctx.lineWidth =4.0;                                    
//                                        ctx.fillStyle = faction == ClientLib.Base.EFactionType.GDIFaction ? "#00a" : "#a00"; 
//                                        ctx.strokeStyle = "#000";
                                    
//                                        ctx.fill();
//                                        ctx.stroke();
//                                        ctx.restore();
                                        //console.log(faction);
                                                                        
                                } else {                                    
                                    this.ec = document.getElementById("range");
                                    if (this.ec != null){
                                        this.ctx = this.ec.getContext('2d');
                                        console.log("Range ok");                                                                                                          
                                    } 
                                } 
                            } catch (e) {
                                console.log("displayRange", e);
                            }
                        }
                    }
                });
                var win = new Range();
                win.moveTo(140, 30);
                win.open();               
            }
        } catch (e) {
            console.log('createRange: ', e);
        }
        function RangeCheckLoaded() {
            try {
                if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
                    window.setTimeout(createRange, 5000);
                    
                } else {
                    window.setTimeout(RangeCheckLoaded, 1000);
                }
            } catch (e) {
                console.log('RangeCheckLoaded: ', e);
            }
        }
        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(RangeCheckLoaded, 5000);
        }
    }
    try {
        var RangeScript = document.createElement('script');
        RangeScript.innerHTML = "(" + RangeMain.toString() + ')();';
        RangeScript.type = 'text/javascript';
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName('head')[0].appendChild(RangeScript);
        }
    } catch (e) {
        console.log('Range: init error: ', e);
    }
})();