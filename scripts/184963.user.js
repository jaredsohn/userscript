    // ==UserScript==
// @name Tiberium Alliances Map Annotations
// @description Mark map with annotations, use at your own risk.
// @namespace devenv
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 1.6
// @grant unsafeWindow
// @grant GM_xmlhttpRequest
// @author devenv
// ==/UserScript==

unsafeWindow.ANNOT_ALLIANCE = "EnMT"

unsafeWindow.annot_colors = {"Leader": "#FF6F6F", "Commander-in-Chief": "#FF6F6F", "Second Commander": "#FFC2C2", "Officer": "#B4BAFF", "Veteran": "#B4FFCD", "Member": "#FAFFB4", "Trial": "#CCCCCC"};

function onKey(ev) {
    var s = String.fromCharCode(ev.keyCode);
    if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey) {
        switch (s) {
            case "Z":
                unsafeWindow.annot_enabled = unsafeWindow.annot_enabled ? false : true;
                unsafeWindow.refreshAnnots();
                break;
        }
    }
}
unsafeWindow.addEventListener("keyup", onKey, false);

unsafeWindow.annot_enabled = true;

function saveAnnot(annot_object) {
    setTimeout(function() {
        GM_xmlhttpRequest({
            method: "GET",
            synchronous: true,
            url: "http://ta-annotator.herokuapp.com/annotations/create/" + annot_object.world + "/" + annot_object.alliance + "/" + annot_object.role + "/" + annot_object.player + "/" + annot_object.x + "/" + annot_object.y + "/" + annot_object.text,
            onload: function() {
                readAnnot(annot_object.world, annot_object.alliance);
            }
        });
    }, 0);
}

function readAnnot(world, alliance) {
    setTimeout(function() {
        GM_xmlhttpRequest({
            method: "GET",
            synchronous: true,
            url: "http://ta-annotator.herokuapp.com/annotations/get/" + world + "/" + alliance,
            onload: function(response) {
                unsafeWindow.OnReadAnnotationsSuccess(JSON.parse(response.responseText));
            }
        });
    }, 0);
}

function removeAnnot(annot_object, world, alliance, role, player) {
    if(confirm("Are you sure?")) {
        setTimeout(function() {
            GM_xmlhttpRequest({
                method: "GET",
                synchronous: true,
                url: "http://ta-annotator.herokuapp.com/annotations/delete/" + world + "/" + alliance + "/" + role + "/" + player + "/" + annot_object.id,
                onload: function(response) {
                    readAnnot(annot_object.world, annot_object.alliance);
                }
            });
        }, 0);
    }
}

unsafeWindow.saveAnnot = saveAnnot;
unsafeWindow.readAnnot = readAnnot;
unsafeWindow.removeAnnot = removeAnnot;

unsafeWindow.annot_updating = false;

function looping() {
	if(unsafeWindow.annot_updating) {
        unsafeWindow.annot_updateMap();
    }
    setTimeout(looping, 10000);
}
setTimeout(looping, 10000);


MapAnnotation_main = function () {
    var self = this;
    var mapan_init = false;
    var contextMenu_init = false;
    var messages_init = false;
    
    var vShift = 0;
    var hShift = -50;
    
    var menu;
    
    var gridWidth;
    var gridHeight;
    
    var app;
    
    var annotList = [];
    
    function ScreenPosFromCoordsX(coordX) {
        var screenX = ClientLib.Vis.VisMain.GetInstance().ScreenPosFromWorldPosX(coordX*gridWidth + gridWidth/2);
        return screenX;
    }
    
    function ScreenPosFromCoordsY(coordY) {
        var screenY = ClientLib.Vis.VisMain.GetInstance().ScreenPosFromWorldPosY(coordY*gridHeight + gridHeight/2);
        return screenY;
    }
    function ScreenPosToCoordsX(screenX) {
        var coordX = Math.round((ClientLib.Vis.VisMain.GetInstance().WorldPosFromScreenPosX(screenX) - gridWidth/2)/gridWidth);
        return coordX;
    }
    
    function ScreenPosToCoordsY(screenY) {
        var coordY = Math.floor((ClientLib.Vis.VisMain.GetInstance().WorldPosFromScreenPosY(screenY) - gridHeight/2)/gridHeight);
        return coordY;
    }
    
    var composite = null;
    
    var menuX, menuY;
    var annotWindow = null;
    var winCoords;
    var winText;
    var wX, wY;
    
    function OnCreateAnnotationSuccess(e) {
        annotWindow.close();
    }
    
    function toAnnot() {
        //console.log(menuX, menuY);
        if(annotWindow==null) {
            annotWindow = new qx.ui.window.Window("Create annotation").set({
                contentPadding : 0,
                showMinimize : false,
                showMaximize : false,
                showClose : true,
                resizable : true,
                width: 300,
                height: 300
            });
            annotWindow.setLayout(new qx.ui.layout.VBox().set({
                alignX: "center"
            }));
            winCoords = new qx.ui.basic.Label().set({
                textAlign: "center",
                textColor: "white"
            });
            winCoords.setValue(menuX+":"+menuY);
            annotWindow.add(winCoords);
            winText = new qx.ui.form.TextArea().set({
                margin: 5,
                width: 220,
                height: 220,
            });
            annotWindow.add(winText);
            var sendAnnotButton = new qx.ui.form.Button("Create").set({});
            annotWindow.add(sendAnnotButton);
            
            sendAnnotButton.addListener("execute", function() {
                var data = ClientLib.Data.MainData.GetInstance();
                annot_object = {world: data.get_Server().get_WorldId(), alliance: (window.ANNOT_ALLIANCE ? window.ANNOT_ALLIANCE : data.get_Alliance().get_Id()), role: data.get_Alliance().get_CurrentMemberRoleInfo().Name, player: data.get_Player().get_Name(), text: encodeURIComponent(winText.getValue()), x: wX, y: wY};
                window.saveAnnot(annot_object);
                annotWindow.close();
            });
        } else {
            winText.setValue("");
        }
        winCoords.setValue(menuX+":"+menuY);
        wX = menuX;
        wY = menuY;
        annotWindow.open();
        annotWindow.center();
    }
    
    function setMenuLocation(e) {
        var x = e.getScreenLeft();
        var y = e.getScreenTop();
        
        menuX = ScreenPosToCoordsX(x);
        menuY = ScreenPosToCoordsY(y);
    }
    function addMarker(annotation) {
        var x = ScreenPosFromCoordsX(parseInt(annotation.x, 10));
        var y = ScreenPosFromCoordsY(parseInt(annotation.y, 10));
        
        var label = new qx.ui.basic.Label().set({
            minWidth: 100,
            value: annotation.player,
            textColor: "black",
            textAlign: "center"

        });
        var label2 = new qx.ui.basic.Label().set({
            minWidth: 100,
            value: annotation.text,
            textColor: "black",
            textAlign: "center"
            
        });
        label.setAllowStretchX(true);
        label.setAllowStretchY(true);
        label2.setAllowStretchX(true);
        label2.setAllowStretchY(true);

        //label.setUserBounds(x, y, 200, 200);
        
        // create the composite
        var composite = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({
            decorator: new qx.ui.decoration.Single(1, "solid", "black").set({
              backgroundColor: (window.annot_colors[annotation.role] ? window.annot_colors[annotation.role]: window.annot_colors["Trial"])
            }),
            minWidth: 100,
            zIndex: 0,
            padding: 4
        });
        
        composite.setAllowStretchX(true);
        composite.setAllowStretchY(true);
        
        
        composite.add(label);
        composite.add(label2);
        var data = ClientLib.Data.MainData.GetInstance();
        window.annot_world = data.get_Server().get_WorldId();
        window.annot_alliance = (window.ANNOT_ALLIANCE ? window.ANNOT_ALLIANCE : data.get_Alliance().get_Id());
        window.annot_player = data.get_Player().get_Name();
        composite.addListener("mouseup", function() { window.removeAnnot(annotation, window.annot_world, window.annot_alliance, data.get_Alliance().get_CurrentMemberRoleInfo().Name, window.annot_player); });
        
        var d = app.getDesktop();
        if(window.annot_enabled) {
            d.addAfter(composite, app.getBackgroundArea(), {
                left: x + hShift,
                top: y + vShift
            });
            annotation.element = composite;
        }
    }
    
    function removeAnnots(toRemove) {
        try {
            var i;
            for(i = 0; i < toRemove.length; i++) {
                if(toRemove[i].element) {
                    app.getDesktop().remove(toRemove[i].element);
                }
            }
        } catch(e2) {
            console.log("remove annotation: ", e2);
        }
    }
    
    function refreshAnnots() {
        OnReadAnnotationsSuccess(annotList);
    }
    window.refreshAnnots = refreshAnnots;
    
    
    function OnReadAnnotationsSuccess(annotations) {
        try {
            newAnnotList = [];
            toRemove = [];
            result = [];
            for(i = 0; i < annotations.length; i++) {
				newAnnot = true;
                for(j = 0; j < annotList.length; j++) {
                    if(annotList[j].id == annotations[i].id) {
                        newAnnot = false;
                    }
                }
                if(newAnnot) {
                    newAnnotList.push(annotations[i]);
                    result.push(annotations[i]);
                }
            }
            for(i = 0; i < annotList.length; i++) {
                remove = true;
                for(j = 0; j < annotations.length; j++) {
                    if(annotList[i].id == annotations[j].id) {
                        remove = false;
                    }
                }
                if(remove) {
                    toRemove.push(annotList[i]);
                } else {
                    result.push(annotList[i]);
                }
            }
			removeAnnots(toRemove);
            annotList = result;
            for(i = 0; i < newAnnotList.length; i++) {
                var an = newAnnotList[i];
                addMarker(an);
            }
            messages_init = true;
        } catch(e2) {
            console.log("read annotation: ", e2);
        }
    }
    
    window.OnReadAnnotationsSuccess = OnReadAnnotationsSuccess;
        
    function updateMap() {
        try {
            var data = ClientLib.Data.MainData.GetInstance();
            window.annot_world = data.get_Server().get_WorldId();
            window.annot_alliance = (window.ANNOT_ALLIANCE ? window.ANNOT_ALLIANCE : data.get_Alliance().get_Id());
            if(data.get_Alliance().get_Id() != 0) {
                window.readAnnot(data.get_Server().get_WorldId(), (window.ANNOT_ALLIANCE ? window.ANNOT_ALLIANCE : data.get_Alliance().get_Id()));
            }
        } catch(e2) {
            console.log("updateMap: ", e2);
        }
    }
    window.annot_updateMap = updateMap;
    
    function updateAnnots() {
        try {
            var coords = [678, 598];
            app = qx.core.Init.getApplication();
            
            var view = ClientLib.Vis.VisMain.GetInstance();
            if(view!=null) {
                if(!mapan_init) {
                    try {
                        gridWidth = ClientLib.Vis.VisMain.GetInstance().get_Region().get_GridWidth();
                        gridHeight = ClientLib.Vis.VisMain.GetInstance().get_Region().get_GridHeight();
                        
                        var callback = {
                            _posChange: function() {
                                try {
                                    var coordX = 0;
                                    var coordY = 0;
                                    
                                    //var screenX = ClientLib.Vis.VisMain.GetInstance().ScreenPosFromWorldPosX(coordX*gridWidth + gridWidth/2);
                                    //var screenY = ClientLib.Vis.VisMain.GetInstance().ScreenPosFromWorldPosY(coordY*gridHeight + gridHeight/2);
                                    //var uiBounds = qx.core.Init.getApplication().getUIBounds();
                                    /*
                                if (screenX < uiBounds.left)
                                {
                                }
                                else if(screenX > uiBounds.right)
                                {
                                }
                                else if(screenY < uiBounds.top)
                                {
                                }
                                else if (screenY > uiBounds.bottom) 
                                {
                                }
                                */
                                    
                                    var i;
                                    for(i=0;i<annotList.length;i++) {
                                        if(annotList[i].element) {
                                        	annotList[i].element.setDomLeft(ScreenPosFromCoordsX(annotList[i].x) + hShift);
                                        	annotList[i].element.setDomTop(ScreenPosFromCoordsY(annotList[i].y) + vShift);
                                        }
                                    }
                                    //if(composite!=null) {
                                    //  composite.setDomLeft(ScreenPosFromCoordsX(678));
                                    //  composite.setDomTop(ScreenPosFromCoordsY(598));
                                    //}
                                } catch(e1) {
                                    console.log("position change: ", e1);
                                }

                              }
                          };
                          phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, callback, callback._posChange);
                          mapan_init = true;
                      } catch(e1) {
                          console.log("attach position change: ", e1);
                      }
                  } else if(!contextMenu_init) {
                      try {
                          app.getBackgroundArea().addListener("mouseup", setMenuLocation);
                          
                          var hasMenu = app.getBackgroundArea().getContextMenu() != null;
                          if(hasMenu) menu = app.getBackgroundArea().getContextMenu();
                          else {
                              menu = new qx.ui.menu.Menu();
                          }
                          var annotButton = new qx.ui.menu.Button("Annotate");
                          annotButton.addListener("execute", toAnnot);
                          menu.add(annotButton);
                          
                          if(!hasMenu) app.getBackgroundArea().setContextMenu(menu);
                          
                          //d.setContextMenu(menu);
                          contextMenu_init = true;
                          
                      } catch(e2) {
                          console.log("context menu: ", e2);
                      }
                  } else if(!messages_init) {
                      window.annot_updating = true;
                      
                      //addMarker(678, 598, "Some text");
                      
                  }
                      }
          } catch (e) {
              console.log("MapAnnotation_updateAnnots: ", e);
          }
      }
    function mainLoop() {
        updateAnnots();
        window.setTimeout(mainLoop, contextMenu_init ? (messages_init ? 10000 : 2000) : 5000);
    }
    
    function createMapAnnotation() {
        try {
            console.log('MapAnnotation loaded');
            
            mainLoop();
        } catch (e) {
            console.log("createMapAnnotation: ", e);
        }
    }
    
    function MapAnnotation_checkIfLoaded() {
        try {
            if (typeof ClientLib!=='undefined' && qx.core.Init.getApplication().initDone == true && typeof qx !== 'undefined') {
                createMapAnnotation();
            } else {
                window.setTimeout(MapAnnotation_checkIfLoaded, 1000);
            }
        } catch (e) {
            console.log("MapAnnotation_checkIfLoaded: ", e);
        }
    }
    
    if (/commandandconquer\.com/i.test(document.domain)) {
        window.setTimeout(MapAnnotation_checkIfLoaded, 1000);
    }
}

try {
      var jquery = document.createElement("script");
      jquery.src = "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
      jquery.type = "text/javascript";
      if (/commandandconquer\.com/i.test(document.domain)) {
          document.getElementsByTagName("head")[0].appendChild(jquery);
      }
      var MapAnnotation = document.createElement("script");
      MapAnnotation.innerHTML = "(" + MapAnnotation_main.toString() + ")();";
      MapAnnotation.type = "text/javascript";
      if (/commandandconquer\.com/i.test(document.domain)) {
          document.getElementsByTagName("head")[0].appendChild(MapAnnotation);
      }
  } catch (e) {
      console.log("MapAnnotation: init error: ", e);
  }
