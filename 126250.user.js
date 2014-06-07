// ==UserScript==
// @name           LouZoom
// @description    See your all of your Lord of Ultima city in one click
// @namespace      louzoom
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.0.0.3
// ==/UserScript==

// version 1: re-centre when clicking between cities, or world / region view
// version 1.0.0.1: Firefox support for DOMElement.innerText
// version 1.0.0.2: dragging updates co-ordinates while "Zoom Preferences" window is open (not in Firefox though)
// version 1.0.0.3: cleaned up the api

(function (){

    var script = function(){
    
        louZoom = {
            initialised : false,

            init : function(){
                louZoom.initialised = true;
                
                // set current camera centre
                var louApp = qx.core.Init.getApplication();
                louZoom.zoomInX = louApp.cameraPos.x; louZoom.zoomInY = louApp.cameraPos.y;
                
                // set preferred zoom centre + magnification
                var prefs = louZoom.getPreferences();
                louZoom.magnification = prefs.magnification; 
                louZoom.zoomOutX = prefs.zoomOutX; louZoom.zoomOutY = prefs.zoomOutY;
                
                // clicking on the TH focus button starts zoom
                louZoom.tipText = "Zoom out";
                louZoom.refreshTipText();
                louApp.cityBar.showButton.addListener("mousedown", louZoom.onEyeClick);
                
                // these listeners reset the cameraPos to the preferred co-ords
                louApp.cityBar.showButton.addListener("execute", louZoom.onEyeExecute);
                louApp.selectorBar.cityButton.addListener("execute", louZoom.onViewChange);
                louApp.cityBar.citiesSelect.addListener("OnSelectedCityIdChanged", louZoom.onCityChange);
            },
            
            ////////////////////////////////////////////
            // initial variables, getters and setters //
            ////////////////////////////////////////////
            
            magnification: 0, zoomInX: 0, zoomInY: 0, zoomOutX: 0, zoomOutY: 0,

            setZoomOutX: function(x){louZoom.zoomOutX = x; louZoom.util.serialise(); louZoom.centreCamera(); },

            setZoomOutY: function(y){louZoom.zoomOutY = y; louZoom.util.serialise(); louZoom.centreCamera(); },
                        
            getZoomOutX : function(){return louZoom.zoomOutX;},
            
            getZoomOutY : function(){return louZoom.zoomOutY;},
                        
            setPreferredMagnification : function(m){ louZoom.magnification = m;},
            
            getPreferredMagnification : function(){ return louZoom.magnification; },

            getCurrentMagnification : function(){
                var s;            
                if (qx.core.Environment.get("engine.name") == "gecko"){     //Firefox support
                    s = qx.core.Init.getApplication().visMain.scene.domRoot.style.MozTransform;            //returns String "scale(x)"
                    s = s.replace("scale(", "");
                    s = s.replace(")","");
                    return Number(s);
                } else {
                    s = qx.core.Init.getApplication().visMain.scene.domRoot.style["zoom"];
                }
                s = Number(s)
                if(s == 0) s = 1;           //Zoom may not be initialised
                return s;
            },
            
            setCurrentMagnification : function(zoom){            
                if (qx.core.Environment.get("engine.name") == "gecko") {
                    qx.core.Init.getApplication().visMain.scene.domRoot.style.MozTransform = "scale(" + zoom + ")";
                } else 
                    qx.core.Init.getApplication().visMain.scene.domRoot.style["zoom"] = zoom;          
            },
            
            tipText : "Not initialised",

            refreshTipText : function(){ qx.core.Init.getApplication().cityBar.showCityTooltip.setLabel(louZoom.tipText); },
            
            ///////////////////////////
            // listeners and methods //
            ///////////////////////////

            onEyeClick : function(e){
                if(e.getModifiers() == 0 && e.isLeftPressed()){		//left click, no meta keys such as CTRL
                    louZoom.toggleZoom();               
                } else if( (e.getModifiers() != 0 && e.isLeftPressed()) || e.isRightPressed() ) {
                    louZoom.preferencesWindow.show();
                }
            },
            
            onEyeExecute : function(){ louZoom.refreshTipText(); louZoom.centreCamera(); },

            onViewChange : function(){            
                if(qx.core.Init.getApplication().visMain.getMapMode() == "c"){
                    louZoom.centreCamera();
                }
            },

            toggleZoom : function(){
                var zoom;
                if (louZoom.getCurrentMagnification() == 1){                    
                    zoom = louZoom.getPreferredMagnification();
                    louZoom.tipText = "Zoom in";
                } else {
                    zoom = 1;
                    louZoom.tipText = "Zoom out";
                }                
                louZoom.setCurrentMagnification(zoom);
                qx.core.Init.getApplication().worldView.hide()
            },
                        
            centreCamera : function(){
                var louApp = qx.core.Init.getApplication();            
                if (louZoom.getCurrentMagnification() == 1){
                    if( (louApp.cameraPos.x != louZoom.zoomInX) || (louApp.cameraPos.y != louZoom.zoomInY) )
                        louApp.setCameraPos(louZoom.zoomInX, louZoom.zoomInY);
                } else {
                    if( (louApp.cameraPos.x != louZoom.zoomOutX) || (louApp.cameraPos.y != louZoom.zoomOutY) )
                        louApp.setCameraPos(louZoom.zoomOutX, louZoom.zoomOutY);                
                }
                if(louApp.worldView.isHidden()) louApp.worldView.show();
            },
            
            onCityChange : function(){
                // when a new city is selected there is some lag while the new city information is retrieved from the server
                var oldCityText;
                var louApp = qx.core.Init.getApplication();

                if (qx.core.Environment.get("engine.name") == "gecko"){     //Firefox
                    oldCityText = louApp.scene.domRoot.textContent;
                } else {
                    oldCityText = louApp.scene.domRoot.innerText;
                }
                oldCityText = oldCityText.replace(/:[0-9][0-9]/g,""); //innerText includes buildtime
                
                var checkCityUpdate = function(){
                    // check if the server has responded
                    if(!louZoom.util.isCityUpdated()){
                        window.setTimeout(checkCityUpdate, 100);
                    } else {
                    // check if the client has updated the dom
                        var newCityText;
                        if (qx.core.Environment.get("engine.name") == "gecko"){     //Firefox
                            newCityText = louApp.scene.domRoot.textContent;
                        } else {
                            newCityText = louApp.scene.domRoot.innerText;
                        }
                        newCityText = newCityText.replace(/:[0-9][0-9]/g,""); //innerText includes buildtime
                        if (newCityText != oldCityText){
                            louZoom.centreCamera();
                        } else {
                            window.setTimeout(checkCityUpdate, 100);                        
                        }
                    }
                }
                if(louApp.visMain.getMapMode() == "c"){
                        louApp.worldView.hide();
                        checkCityUpdate();
                }
            },

            
            ////////////////////////////////////////
            // get preferences from local storage //
            ////////////////////////////////////////

            getPreferences : function(){
                var prefs = louZoom.getStoredPreferences();
                if(prefs == null) prefs = louZoom.getDefaultPreferences();
                return prefs
            },

            getStoredPreferences : function(){
                var prefs = localStorage.getItem("louzoomPreferences");
                prefs = JSON.parse(prefs);
                if(prefs == null) return null;
                
                if(!prefs.hasOwnProperty("magnification")){     // support for louZoom scripts before v0.7
                    var newCookie = new Object();
                    newCookie.magnification = Number(prefs[0]);
                    newCookie.zoomOutX = Number(prefs[1]);
                    newCookie.zoomOutY = Number(prefs[2]);
                    prefs = newCookie;
                    localStorage.setItem("louzoomPreferences", JSON.stringify(prefs));  // update cookie to new format
                }
                
                return prefs;
            },
            
            getDefaultPreferences : function(){
                var louApp = qx.core.Init.getApplication();
                var defaults = {magnification:0.3};
                if (qx.core.Environment.get("engine.name") == "gecko"){     //Firefox support
                    defaults.zoomOutX = (louApp.worldView.getBounds().width / defaults.magnification) / 2;
                    defaults.zoomOutY = (louApp.worldView.getBounds().height / defaults.magnification) / 2;
                } else {
                    defaults.zoomOutX = louApp.worldView.getBounds().width / 2;
                    defaults.zoomOutY = louApp.worldView.getBounds().height / 2;
                }
                localStorage.setItem("louzoomPreferences", JSON.stringify(defaults));  // locally store default preferences
                return defaults;
            },

            ////////////////////////
            // preferences window //
            ////////////////////////
                        
            preferencesWindow : {
            
                __pW : null,
                                    
                init : function(){
                    var louApp = qx.core.Init.getApplication();

                    var prefsWindow = new qx.ui.window.Window();
                    prefsWindow.set({
                        caption:"Zoom Preferences",
                        showMinimize:false,
                        showMaximize:false,
                        allowMaximize:false,
                        resizable:false,
                        width:210,
                        height:180,
                        layout:new qx.ui.layout.Basic()
                    });	
	
                    prefsWindow.add(new qx.ui.basic.Label("Magnification:"), {left:32, top:14});
                    prefsWindow.add(new qx.ui.basic.Label("Camera Position"), {left:10, top:48});
                    prefsWindow.add(new qx.ui.basic.Label("X:"), {left:10, top:70});
                    prefsWindow.add(new qx.ui.basic.Label("Y:"), {left:100, top:70});

                    var filterOnlyNumbers = /[0-9\n.]/;

                    var zoomField = new qx.ui.form.TextField().set({
                        value: "" + louZoom.getPreferredMagnification(),
                        width:65,
                        filter:filterOnlyNumbers
                    });
                    zoomField.addListener("changeValue", function(e){
                        louZoom.setPreferredMagnification(zoomField.getValue());
                        louZoom.setCurrentMagnification(zoomField.getValue());
                    });
                    prefsWindow.add(zoomField, {left:114, top:10});

                    var cameraXField = new qx.ui.form.TextField().set({
                        value:"" + louZoom.zoomOutX,
                        width:65,
                        filter:filterOnlyNumbers
                    });
                    cameraXField.addListener("changeValue", function(e){
                        louZoom.setZoomOutX(cameraXField.getValue());
                    });
                    prefsWindow.add(cameraXField, {left:24, top:66});

                    var cameraYField = new qx.ui.form.TextField().set({
                        value:"" + louZoom.zoomOutY,
                        width:65,
                        filter:filterOnlyNumbers
                    });
                    cameraYField.addListener("changeValue", function(e){
                        louZoom.setZoomOutY(cameraYField.getValue());
                    });
                    prefsWindow.add(cameraYField, {left:114, top:66});

                    var prefsWindowOKButton = new qx.ui.form.Button("OK");
                    prefsWindowOKButton.addListener("click", function(e){
                        prefsWindow.close();
                    });
                    prefsWindow.add(prefsWindowOKButton, {left:140, top:100});

                    prefsWindow.addListener( "close", function(e){ louZoom.util.serialise(); });

                    // allow arrow key mvmt in dialog box without moving city view                                                
                    prefsWindow.addListener("changeVisibility", function(e){                    
                        if(e.getData() == "visible"){
                            louApp.allowHotKey = false;
                        } else if(e.getData() == "hidden"){
                            louApp.allowHotKey = true;                            
                        }
                    });
                    
                    prefsWindow.dragX = 0; prefsWindow.dragY = 0;
                    prefsWindow.xField = cameraXField; 
                    prefsWindow.yField = cameraYField; 
                    // when prefsWindow is open, dragging updates coords                                        
                    var mouseListener = function(e){                    
                        if(this.isVisible()){
                            var louApp = qx.core.Init.getApplication();                        
                            if(e.getType() == "mousedown"){
                                this.dragX = louApp.cameraPos.x;
                                this.dragY = louApp.cameraPos.y;
                            } else if(e.getType() == "mouseup"){
                                var endX = louApp.cameraPos.x;
                                var endY = louApp.cameraPos.y;                            
                                if( (this.dragX != endX) || (this.dragY != endY) ){
                                    this.xField.setValue(endX.toString());
                                    this.yField.setValue(endY.toString());
                                }
                                this.dragX = 0; this.dragY = 0;
                            }
                        }
                    }                    
                    louApp.worldView.addListener("mousedown", mouseListener, prefsWindow);
                    louApp.worldView.addListener("mouseup", mouseListener, prefsWindow);

                    louApp.getRoot().add(prefsWindow, {left:500, top:200});
                    louZoom.preferencesWindow.__pW = prefsWindow;                                        
                    louZoom.preferencesWindow.__pW.show();
                },
            
                show : function(){
                    if(louZoom.preferencesWindow.__pW != null){
                        louZoom.preferencesWindow.__pW.show();
                    } else {
                        louZoom.preferencesWindow.init();
                    }
                },
                
                hide : function(){
                    if(louZoom.preferencesWindow.__pW != null){
                        louZoom.preferencesWindow.__pW.hide();
                    }
                }                

            },

            /////////////////////////////////////
            // initialising and updating tools //
            /////////////////////////////////////
            
            util : {
            
                serialise : function(){
                    var prefs = {magnification:louZoom.getPreferredMagnification(), zoomOutX:louZoom.zoomOutX, zoomOutY:louZoom.zoomOutY};
                    localStorage.setItem("louzoomPreferences", JSON.stringify(prefs));
                },
                
                isCityUpdated : function(){
                    var selectedCity = qx.core.Init.getApplication().cityBar.citiesSelect.getSelectedCityId();
                    var servedCity = webfrontend.net.UpdateManager.getInstance().reciever.CITY.obj.getId();                    
                    return selectedCity == servedCity ? true : false;
                },
                        
                isAppReady : function(){
                    if( typeof qx != 'undefined') {
                        var a = qx.core.Init.getApplication();
                        var c = a.cityInfoView;
                        var ch = a.chat;
                        var wdst = webfrontend.data.ServerTime.getInstance().refTime;
                        if(a && c && ch && wdst) 
                            return true;
                    }
                    return false;
                },

                checkAppReady : function(){
                    if(louZoom.util.isAppReady()){
                        louZoom.init();
                    } else window.setTimeout(louZoom.util.checkAppReady, 1000);
                }
            }
        }
        
        ////////////////////////
        // script entry point //
        ////////////////////////

        louZoom.util.checkAppReady();
        
        //////////////////////
        // script ends here //
        //////////////////////

    }
    
    var inject = {
    
        // injecting Script
        injectScript:function(){
            var injectScriptElement = document.createElement("script");
            var txt = script.toString();
            injectScriptElement.innerHTML = "(" + txt + ")();";
            injectScriptElement.type = "text/javascript";
            injectScriptElement.id = "louzoom";
            document.getElementsByTagName("head")[0].appendChild(injectScriptElement);
        },

        isDocumentReady:function(){
            if(/lordofultima\.com/i.test(document.domain)){
                return true;
            } else return false;
        },

        // loops until document has loaded
        checkDocumentReady:function(){
            if(this.isDocumentReady()){
                this.injectScript();
            } else window.setTimeout(this.checkDocumentReady, 1000);
        }
    }
    
    //GreaseMonkey entry point
    inject.checkDocumentReady();


})();
