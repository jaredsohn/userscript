// ==UserScript==
// @name Tiberium Alliances Map Annotations
// @description Mark map with annotations, use at your own risk.
// @namespace map_annotation
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 1.0
// @author unicode
// ==/UserScript==
(function () {
  var MapAnnotation_main = function () {
	var self = this;
	var mapan_init = false;
      var contextMenu_init = false;
      var messages_init = false;
      
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
          console.log("created annot "+e);
          updateMap();
          annotWindow.close();
      }
      function OnCreateAnnotationError(e) {
          console.log("error creating annotation: ", e);
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
                $.ajax({
                    type: "GET",
                    url: "http://timebattle.net/CNCWebService.asmx/CreateAnnotation?world="+data.get_Server().get_WorldId()+"&alliance="+data.get_Alliance().get_Id()+"&player="+data.get_Player().get_Id()+"&message='"+encodeURIComponent(winText.getValue())+"'&x="+wX+"&y="+wY+"&format=json",
                    contentType: "application/json; charset=utf-8",
                    dataType: "jsonp",
                    success: OnCreateAnnotationSuccess,
                    error: OnCreateAnnotationError
    			});
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
          if(e.isRightPressed()) {
              var x = e.getScreenLeft();
              var y = e.getScreenTop();
              
              menuX = ScreenPosToCoordsX(x);
              menuY = ScreenPosToCoordsY(y);
          }
      }
      function addMarker(coordsX, coordsY, message) {
          var x = ScreenPosFromCoordsX(coordsX);
          var y = ScreenPosFromCoordsY(coordsY);
          
          var label = new qx.ui.basic.Label().set({
              width: 200,
              value: message,
              textColor: "black"
          });
          //label.setUserBounds(x, y, 200, 200);
          
          // create the composite
          var composite = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({
              decorator: new qx.ui.decoration.Single(1, "solid", "black").set({
                  backgroundColor: "#CDD9DF"
              }),
              width: 200,
              height: 100
          });
          
          composite.add(label);
          
          var d = app.getDesktop();
          d.addAfter(composite, app.getBackgroundArea(), {
              left: x,
              top: y
          });
          annotList.push({element:composite, x:coordsX, y:coordsY});
      }
      
      function OnReadAnnotationsSuccess(e) {
          try {
              var i;
              //console.log(e);
              for(i=0;i<annotList.length;i++) {
                  app.getDesktop().remove(annotList[i].element);
              }
              annotList = [];
              var annots = e.d;
              for(i=0;i<annots.length;i++) {
                  var an = annots[i];
                  console.log(an.x, an.y, an.message);
                  addMarker(parseInt(an.x, 10), parseInt(an.y, 10), an.message);
              }
              messages_init = true;
          } catch(e2) {
              console.log("read annotation: ", e2);
          }
      }
      function OnReadAnnotationsError(e) {
          console.log("error reading annotations: ", e);
      }
      
      function updateMap() {
          try {
              var data = ClientLib.Data.MainData.GetInstance();
              if(data.get_Alliance().get_Id()!=0) {
                  
                  $.ajax({
                      cache: false,
                      type: "GET",
                      url: "http://timebattle.net/CNCWebService.asmx/ReadAnnotations?world="+data.get_Server().get_WorldId()+"&alliance="+data.get_Alliance().get_Id()+"&format=json",
                      contentType: "application/json; charset=utf-8",
                      dataType: "jsonp",
                      success: OnReadAnnotationsSuccess,
                      error: OnReadAnnotationsError
                  });
              }
          } catch(e2) {
              console.log("updateMap: ", e2);
          }
      }
      
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
                                    annotList[i].element.setDomLeft(ScreenPosFromCoordsX(annotList[i].x));
                                    annotList[i].element.setDomTop(ScreenPosFromCoordsY(annotList[i].y));
                                }
                                //if(composite!=null) {
                                //	composite.setDomLeft(ScreenPosFromCoordsX(678));
                                //	composite.setDomTop(ScreenPosFromCoordsY(598));
                                //}
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
                    updateMap();
                    
                    //addMarker(678, 598, "Some text");
                    
                }
			}
		} catch (e) {
            console.log("MapAnnotation_updateAnnots: ", e);
        }
	}
    function mainLoop() {
		updateAnnots();
        window.setTimeout(mainLoop, contextMenu_init?(messages_init?10000:2000):1000);
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
      /*
      var loadJQuery = function () {
        var jquery = document.createElement("script");
        jquery.src = "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
        jquery.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
          document.getElementsByTagName("head")[0].appendChild(jquery);
        }
      };
      var startScript = function () {
        var MapAnnotation = document.createElement("script");
        MapAnnotation.innerHTML = "(" + MapAnnotation_main.toString() + ")();";
        MapAnnotation.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
          document.getElementsByTagName("head")[0].appendChild(MapAnnotation);
        }
      };
      var warningMessage = 'WARNING! The map annotation script requires an unsecure connection to my server, and the information sent to my server is not secure. By using this script, you agree that I hold no liability for any damage, loss, or theft resulting from the script.\\nActivate script?';
      
    var warning = document.createElement("script");
      warning.innerHTML = "(function(){if(confirm('"+warningMessage+"')) ("+loadJQuery.toString()+")();("+startScript.toString()+")();})();";
      //warning.innerHTML = "(function(){if(confirm('aa')) startScript();})();";
    warning.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) {
      document.getElementsByTagName("head")[0].appendChild(warning);
    }
    */
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
})();
