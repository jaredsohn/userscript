// ==UserScript==
// @name       		LoU Cleaner
// @namespace  		maxim
// @version    		0.6
// @description  	Добавляет пару кнопок
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// ==/UserScript==

(function () {
    var main = function () {
        
        var createTweak = function () {
            
            lcDebug('createTweak');
            
            qx.Class.define("clTweak.Main", {
                type:"singleton",
                extend:qx.core.Object,
                members:{
                    initialize:function () {
                        
                        var app = qx.core.Init.getApplication();
                        var cInfoView = app.getCityInfoView();
                        var bQc = cInfoView.buildingQueue;
                        var bQh = bQc.header;
                        
                        var clearCenterBtn = new qx.ui.form.Button(".");
                        clearCenterBtn.set({width:17, appearance:"button-text-small", toolTipText:"Уничтожить ресурсы в центре."});
                        clearCenterBtn.addListener("execute", this.clearCenter, this);
                        bQh.add(clearCenterBtn, {left:70, top:33});
                        
                        var clearAllBtn = new qx.ui.form.Button("..");
                        clearAllBtn.set({width:17, appearance:"button-text-small", toolTipText:"Уничтожить все ресурсы кроме озер."});
                        clearAllBtn.addListener("execute", this.clearAll, this);
                        bQh.add(clearAllBtn, {left:90, top:33});							
                        
                        
                    },
                    
                    clearCenter:function () {
                        
                        var activeCity = webfrontend.data.City.getInstance();
                        var app = qx.core.Init.getApplication();
                        var cm = webfrontend.net.CommandManager.getInstance();
                        
                        bqmax = webfrontend.data.Player.getInstance().getMaxBuildQueueSize();
                        bqcur = webfrontend.data.City.getInstance().buildQueue;
                        bqcur = (bqcur != null) ? bqcur.length : 0;
                        freeSlots = bqmax - bqcur;
                        if (freeSlots == 0) return;
                        
                        for (var _c in app.visMain.cells){
                            
                            _cell = app.visMain.cells[_c].entities;
                            
                            for (var d in _cell) {
                                
                                cityRes = _cell[d];
                                if (cityRes.basename != "CityResField"){
                                    continue;
                                }
                                
                                var x = cityRes.drawNode.getX();
                                var y = cityRes.drawNode.getY();
                                
                                if(x < 850 || x > 1920)
                                    continue;
                                if(y < 480 || y > 1190)
                                    continue;
                                
                                //если пришли сюда, значит рес в центре и его надо убивать :-)
                                
                                cm.sendCommand("UpgradeBuilding", {cityid:activeCity.getId(), buildingid:cityRes.getId(), buildingType:webfrontend.vis.Util.getBuildingIdByVisResId(cityRes.getResType()), isPaid:true}, this, function(){})
                                
                                freeSlots--;
                                if (freeSlots == 0) return;
                                
                            }
                        }
                    },
                    
					clearAll:function() {
                        var activeCity = webfrontend.data.City.getInstance();
                        var app = qx.core.Init.getApplication();
                        var cm = webfrontend.net.CommandManager.getInstance();
                        
                        bqmax = webfrontend.data.Player.getInstance().getMaxBuildQueueSize();
                        bqcur = webfrontend.data.City.getInstance().buildQueue;
                        bqcur = (bqcur != null) ? bqcur.length : 0;
                        freeSlots = bqmax - bqcur;
                        if (freeSlots == 0) return;
                        
                        for (var _c in app.visMain.cells){
                            
                            _cell = app.visMain.cells[_c].entities;
                            
                            for (var d in _cell) {
                                
                                cityRes = _cell[d];
                                if (cityRes.basename != "CityResField"){
                                    continue;
                                }
								
								// озера не трогаем
								if(cityRes.getResType() == 3)
									continue;
                                
                                cm.sendCommand("UpgradeBuilding", {cityid:activeCity.getId(), buildingid:cityRes.getId(), buildingType:cityRes.getResType()+27, isPaid:true}, this, function(){})
                                
                                freeSlots--;
                                if (freeSlots == 0) return;
                                
                            }
                        }
					}
                }
            });
            
        };
        
        function lcDebug(e) {
            if (window.console && typeof console.log == "function") {
                console.log(e);
            }
        }
        
        
        function initialize()
        {
            if (!startup.initialized) {
                startup.initialized = true;
                
                try{
                    createTweak();
                    clTweak.Main.getInstance().initialize();
                }
                catch(e){
                    console.log(e);
                }
            }
        }		
        
        function initTools() {
            initialize();
        }		
        
        var startup = function () {
            if (typeof window.qx == 'undefined') {
                window.setTimeout(startup, 2000);
            } else {
                window.setTimeout(initTools, 3000);
            }
        };
        
        window.setTimeout(startup, 2000);
    };
    
    function lcDebug(e) {
        if (window.console && typeof console.log == "function") {
            console.log(e);
        }
    }
    
    function inject() {
        lcDebug('Внедряем LoU Cleaner script');
        var script = document.createElement("script");
        txt = main.toString();
        if (window.opera != undefined) txt = txt.replace(/</g, "&lt;");
        script.innerHTML = "(" + txt + ")();";
        script.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    
    if (/lordofultima\.com/i.test(document.domain)) inject();
    
})();


/*


bqmax = webfrontend.data.Player.getInstance().getMaxBuildQueueSize();
bqcur = webfrontend.data.City.getInstance().buildQueue;
bqcur = (bqcur != null) ? bqcur.length : 0;
freeSlots = bqmax - bqcur;
if (freeSlots == 0) return;

_action = "UpgradeBuilding";

this.sendCommandBuffer.push({a:_action, p:{cityid: _cid, buildingid: _buildingId, buildingType: _buildingType, isPaid: !_minister}});

"cityid":28835861,"buildingid":2313,"buildingType":28,"isPaid":true

!!!!!!!!!!!!!!!!!!!!!!!! ВОТ ТАК НАДО !!!!!!!!!!!!!!!
webfrontend.net.CommandManager.getInstance().sendCommand("UpgradeBuilding", {cityid:28835861, buildingid:2313, buildingType:28, isPaid:true}, this, function(){})

*/