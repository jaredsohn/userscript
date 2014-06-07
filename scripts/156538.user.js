// ==UserScript==
// @name BBAW Roll call
// @description Generates the roll call data from current values and inputs it into the texte area.
// @namespace      http*://*.alliances.commandandconquer.com/*
// @include        http*://*.alliances.commandandconquer.com/*
// @version 2.0.2
// @author Sadoij
// @grant none
// @updateURL   https://userscripts.org/scripts/source/156538.meta.js
// @downloadURL https://userscripts.org/scripts/source/156538.user.js
// ==/UserScript==
(function () {
    var injectFunction = function () {

        function log(value) {
            if (typeof console != "undefined") {
                console.log("BBAW Roll call " + value);
            }
            else if (window.opera) {
                opera.postError("BBAW Roll call " + value);
            }
            else {
                GM_log("BBAW Roll call " + value);
            }
        }

        function setup() {
            
            log("starting setup");

            var maelstrom = MaelstromTools.Base.getInstance();
            
            var rollCallButton = new qx.ui.form.Button("Roll Call").set({
                  appearance: "button-text-small",
                  width: 100,
                  minWidth: 100,
                  maxWidth: 100
                });
//                preferencesButton.setUserData("desktopPosition", this.desktopPosition(desktopPositionModifier));
                rollCallButton.addListener("execute", function () {
                    
                    var textAreas = window.document.querySelector("textarea");
                    var done = false;
                    
                    for(var item in textAreas)
                    {
                        var widget = qx.ui.core.Widget.getWidgetByElement(textAreas[item]);
                        
                        if(trySetValue(widget))
                        {
                            done = true;
                        	break;
                        }
                    }
                    
                    if(!done){
                        frontend.gui.MessageBox.messageBox({ title: "BBAW Roll Call"
                                                            , text: "Hey there, you clicked on the Roll Call button but<br />" +
                                                            		"you were not replying to the Roll Call??<br /><br />" +
                                                            		"What's the point of click on this button if you're not<br />" + 
                                                            		"replying to the Roll Call??<br /><br />" + 
                                                            		"Now, this is how it works: <br/><ol><li>Go to the Roll Call thread</li><li>Hit reply</li><li>Then click on the Roll Call button AGAIN!</li><li>Enjoy</li></ol>", buttons: 1, textRich: true})
                    }
                    
                }, this);
            
            
            MaelstromTools.Base.getInstance().addToMainMenu("RollCallButton", rollCallButton);
        }

        function trySetValue(textArea) {
 
            try {
                
                var widget = textArea;
                var i = 0;
                
                while (widget != null && widget != undefined && widget.$$user_dataThread == undefined) {
                    widget = widget.$$parent;
                    
                    i++;
                    if (i > 15) {
                        widget = null;
                    }
                }
                
                if (widget != null && widget != undefined && widget.$$user_dataThread) {
                    
                    if (/roll call/i.test(widget.$$user_dataThread.Title)) {
                        textArea.setValue(textArea.getValue() + generatePostContent());
                        return true;
                    }
                }
                
                return false;
            }
            catch (e) {
                log(e);
            };
        };
        function format(value) {
            return (Math.floor(value * 100) / 100).toFixed(2);
        }
        function generatePostContent() {
            var values = [];

            var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
            var cityArray = new Array();

            for (var cityName in cities) {
                cityArray.push(cities[cityName]);
            }
            
            cityArray.sort(function(i1, i2){
                return i2.get_LvlOffense() - i1.get_LvlOffense();
            });
            
            var index = 0;
            for (var city in cityArray) {
                if(index >= 5){
                    break;
                }
                values.push(format(cityArray[city].get_LvlOffense()) + " / [coords]" + cityArray[city].get_PosX() + ":" + cityArray[city].get_PosY() + ":" + cityArray[city].get_Name() + "[/coords]");
                index++;
            }
            
            return "o / base\r\n" + values.join('\r\n');
        }

        function waitForGame() {
            try {
                if (typeof qx != 'undefined' && typeof qx.core != 'undfined' && typeof qx.core.Init != 'undefined') {
                    var app = qx.core.Init.getApplication();
                    if (app.initDone == true && window.MaelstromTools) {
                        try {
                            setup();
                        }
                        catch (e) {
                            console.log("BBAW Roll call init error:");
                            console.log(e);
                        }
                    }
                    else {
                        window.setTimeout(waitForGame, 1000);
                    }
                }
                else {
                    window.setTimeout(waitForGame, 1000);
                }
            }
            catch (e) {
                if (typeof console != 'undefined') console.log(e);
                else if (window.opera) opera.postError(e);
                else GM_log(e);
            }
        };

        window.setTimeout(waitForGame, 1000);
    };

    var script = document.createElement("script");
    var txt = injectFunction.toString();
    script.innerHTML = "(" + txt + ")();";
    script.type = "text/javascript";

    document.getElementsByTagName("head")[0].appendChild(script);
})();