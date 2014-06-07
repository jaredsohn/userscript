// ==UserScript==
// @name           LoU BoS ZoomOnly ZoomFix
// @description    LoU BoS 1.6.0 - Zoom Slider Only - Firefox Zoom Fix
// @namespace      BoS
// @author         Urthadar, Ventrix, SoCalTiger, Powerchord, lord greggreg - Port @ r0land2000
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.6.0.3
// ==/UserScript==

// This script brings the LoU BoS Zoom Slider to the game only. All other parts of LoU BoS are deleted.
// 
// Zoom Slider Only is an idea from SoCalTiger.. but his script is based on LoU BoS version 1.5.4.. without the Firefox Zoom Fix.. and with unused parts of LoU BoS.
// 
// Have fun with it!
// 
// Credits:
// 
// Base Script: LoU BoS, Version 1.6.0, 2012-08-08, Urthadar
//    http://userscripts.org/scripts/show/84343
// Base Script Edits: Ventrix (found in Zoom Slider Only)
// Zoom Slider Only: Version 1.5.4, 2012-07-14, SoCalTiger
//    (remaining code from BoS, not needed for zoom only)
//    http://userscripts.org/scripts/show/138418
// Zoom Fix for Firefox: Powerchord/lord greggreg
//    http://userscripts.org/scripts/show/141946
// 
// Final Script: LoU BoS ZoomOnly ZoomFix, Version 1.6.0.3, 2012-08-30, r0land2000
//     http://userscripts.org/scripts/show/142519

// LoU-BoS-160-ZoomOnly-ZoomFix - Line 11

(function wholeBosScriptFunc(){

// LoU-BoS-160-ZoomOnly-ZoomFix - Line 13

var main = function bosMainFunc() {

// LoU-BoS-160-ZoomOnly-ZoomFix - Line 15

function bosStartIfQooxoodoIsAvailable() {
    if (typeof qx != 'undefined') {
		bosAddMissingQooxoodo();
		bosScript();		    
    } else {
		window.setTimeout(bosStartIfQooxoodoIsAvailable, 5000);    
    }
}

// LoU-BoS-160-ZoomOnly-ZoomFix - Line 24

function bosAddMissingQooxoodo() {
	// webfrontend.gui.SpinnerInt
	// qx.util.Json.parse
	// qx.util.Json.stringify
	// webfrontend.gui.RowRendererCustom
	// webfrontend.gui.MessageBox
	// webfrontend.gui.CellRendererHtmlCustom

	if (typeof qx.lang == 'undefined' || typeof qx.lang.Json == 'undefined') {
		qx.Class.define("qx.lang.Json", {
			type: "singleton",
			extend: qx.core.Object,
			statics: {
				parse: function(s) {
					return qx.util.Json.parse(s);
				},
				stringify: function(o) {
					return qx.util.Json.stringify(o);
				}
			}
		});
	}
	
	if (typeof webfrontend.ui == 'undefined' || typeof webfrontend.ui.SpinnerInt == 'undefined') {
		qx.Class.define("webfrontend.ui.SpinnerInt", {			
			extend: webfrontend.gui.SpinnerInt
		});		
	}
	
	if (typeof webfrontend.ui == 'undefined' || typeof webfrontend.ui.RowRendererCustom == 'undefined') {
		qx.Class.define("webfrontend.ui.RowRendererCustom", {			
			extend: webfrontend.gui.RowRendererCustom
		});		
	}

	if (typeof webfrontend.ui == 'undefined' || typeof webfrontend.ui.MessageBox == 'undefined') {
		qx.Class.define("webfrontend.ui.MessageBox", {			
			extend: webfrontend.gui.MessageBox,
			statics: {
				messageBox: function(o) {
					webfrontend.gui.MessageBox.messageBox(o);
				}
			}			
		});		
	}

	if (typeof webfrontend.ui == 'undefined' || typeof webfrontend.ui.CellRendererHtmlCustom == 'undefined') {
		qx.Class.define("webfrontend.ui.CellRendererHtmlCustom", {			
			extend: webfrontend.gui.CellRendererHtmlCustom
		});		
	}	
}

// LoU-BoS-160-ZoomOnly-ZoomFix - Line 78

window.setTimeout(bosStartIfQooxoodoIsAvailable, 5000);

// LoU-BoS-160-ZoomOnly-ZoomFix - Line 80

var bosScript = function() {

// LoU-BoS-160-ZoomOnly-ZoomFix - Line 82

qx.Class.define("bos.Const", {
	statics: {	
		DEBUG_VERSION: true,
	}
});

// LoU-BoS-160-ZoomOnly-ZoomFix - Line 2324

qx.Class.define("bos.Tweaks", {
	type: "singleton",
	extend: qx.core.Object,
	members: {
		gameStarted: function() {
			trace("In gameStarted");

// LoU-BoS-160-ZoomOnly-ZoomFix - Line 2331

			this.tweakErrorReporting();
			var res = webfrontend.res.Main.getInstance();		

// LoU-BoS-160-ZoomOnly-ZoomFix - Line 2334

			try {
							
// LoU-BoS-160-ZoomOnly-ZoomFix - Line 2469

				var zoomSlider = new qx.ui.form.Slider().set({
					minimum: 25,
					maximum: 200,
					singleStep: 5,
					pageStep: 1,
					value: 100,
					width: 200
				});
				zoomSlider.addListener("changeValue", function(e) {
					this.setZoom(zoomSlider.getValue() / 100.0);
				}, this);
				
				var btnZoomReset = new qx.ui.form.Button("R");
				btnZoomReset.addListener("execute", function(e) {
					this.setZoom(1);
					zoomSlider.setValue(100);
				}, this);
				
				var zoomBox = new qx.ui.container.Composite().set({
					width: 250,
					height: 28
				});
				zoomBox.setLayout(new qx.ui.layout.HBox(0));
				zoomBox.add(zoomSlider);
				zoomBox.add(btnZoomReset);
				
				qx.core.Init.getApplication().getDesktop().add(zoomBox, {
					  left: 400 + 300,
					  top: 70,
					  right: null
				});
						
			} catch (e) {
				bos.Utils.handleError(tr("error during BOS Tools menu creation: ") + e);
			}
			
// LoU-BoS-160-ZoomOnly-ZoomFix - Line 2525

			trace("after gameStarted");
			
		},

// LoU-BoS-160-ZoomOnly-ZoomFix - Line 2601

		setZoom: function(zoom) {
			//for region and world
			var visMain = ClientLib.Vis.VisMain.GetInstance();
			visMain.set_ZoomFactor(zoom);
			
			//for city view
			try {
				// if (qx.bom.client.Engine.GECKO) {
				// Powerchord's fix for zooming on firefox
				if (qx.core.Environment.get("engine.name") === "gecko") {
					a.visMain.scene.domRoot.style.MozTransform = "scale(" + zoom + ")";
					a.visMain.scene.domRoot.style["overflow"] = "hidden";
				} else {
					a.visMain.scene.domRoot.style["zoom"] = zoom;
				}
			} catch (ex) {
				//ignore any exception
			}
		},

// LoU-BoS-160-ZoomOnly-ZoomFix - Line 2622

		tweakErrorReporting: function() {
			if (bos.Const.DEBUG_VERSION) {
				//qx.event.GlobalError.setErrorHandler(null, this);
				//window.onerror = null;
				qx.event.GlobalError.setErrorHandler(handleError, this);
				//qx.event.GlobalError.setErrorHandler(null, this);
			}
		}

	}
});

// LoU-BoS-160-ZoomOnly-ZoomFix - Line 4532

//webfrontend.Application
var a;

var summaryWidget = null;

var reportsTweaked = false;

window.setTimeout(bosCheckIfLoaded, 1000);

// LoU-BoS-160-ZoomOnly-ZoomFix - Line 4541

function bosCheckIfLoaded() {
	if (/*qx.$$domReady == */true) {
		a = qx.core.Init.getApplication();
		if (a && a.chat && a.cityInfoView && a.title.reportButton) {
			bos.Tweaks.getInstance().gameStarted();
		} else {
			window.setTimeout(bosCheckIfLoaded, 1000);
		}
	} else {
		window.setTimeout(bosCheckIfLoaded, 1000);
	}
}

// LoU-BoS-160-ZoomOnly-ZoomFix - Line 12585

function handleError(dp) {
	try {	
		var dq = dp.toString();
		var cx = " ";
		if (dp.hasOwnProperty("fileName")) dq += cx + dp.fileName;
		if (dp.getUri != null) dq += cx + dp.getUri();
		if (dp.hasOwnProperty("lineNumber")) dq += cx + dp.lineNumber;
		if (dp.getLineNumber != null) dq += cx + dp.getLineNumber();
		if (dp.hasOwnProperty("stack")) dq += cx + dp.stack;

		dq = qx.util.Json.stringify(dq);

		var msg = "{error:" + dq + "}";
		
		if (console.log != undefined) {
			console.log(msg);
		} else {
			alert(msg);
		}
	} catch (e) {
		alert("Error in error handler " + e);
	}
}

// LoU-BoS-160-ZoomOnly-ZoomFix - Line 12997

function human_time(val) {
	if (val <= 0)
		return "00:00:00";

	var seconds = val % 60;
	var minutes = Math.floor(val / 60) % 60;
	var hours = Math.floor(val / 3600) % 24;
	var days = Math.floor(val / 86400);

	var str = sprintf("%02d:%02d:%02d", hours, minutes, seconds);

	if (days > 0)
		str = sprintf( "%dd %s", days, str);

	return str;
}

// LoU-BoS-160-ZoomOnly-ZoomFix - Line 13014

function debug(sMsg) {
	if (bos.Const.DEBUG_VERSION) {
		// if (window.JS_log != undefined)
		// 	window.JS_log(sMsg);
		// else
		alert(sMsg);
	}
}

// LoU-BoS-160-ZoomOnly-ZoomFix - Line 13025

function dumpObject(obj) {
	debug(qx.util.Json.stringify(obj));
}

// LoU-BoS-160-ZoomOnly-ZoomFix - Line 13029

function trace(sMsg) {
	//alert(sMsg);
}

// LoU-BoS-160-ZoomOnly-ZoomFix - Line 14958

//------------------------------------------------------------------------------------------------------------
//taken from http://userscripts.org/topics/41177
// @copyright      2009, 2010 James Campos
// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
if (typeof GM_deleteValue == 'undefined') {
	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	GM_deleteValue = function(name) {
		localStorage.removeItem(name);
	}

	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (!value)
				return defaultValue;
		var type = value[0];
		value = value.substring(1);
		switch (type) {
			case 'b':
					return value == 'true';
			case 'n':
					return Number(value);
			default:
					return value;
		}
	}

	GM_log = function(message) {
		console.log(message);
	}

	GM_registerMenuCommand = function(name, funk) {
	//todo
	}

	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	}
}

//---------------------- END OF INJECTED PART -----------------------------------
}
};

// LoU-BoS-160-ZoomOnly-ZoomFix - Line 15103

window.setTimeout(injectBoSScript, 100);

// LoU-BoS-160-ZoomOnly-ZoomFix - Line 15105

function injectBoSScript() {
	GM_log("Injecting LoU BoS script");

	var script = document.createElement("script");
	script.innerHTML = "(" + main.toString() + ")();";
	script.type = "text/javascript";
	document.getElementsByTagName("head")[0].appendChild(script);		
}
		
})();
