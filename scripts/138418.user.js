// ==UserScript==
// @name           LoU BoS [Zoom Slider Only] [SoCalTiger]
// @description    Zoom Slider Only - This script removes all other code. This is for people who do not want all the functionality or find that BoS causes too much lag.
// @namespace      BoS
// @author         Urthadar, Edit by Ventrix, Zoom Slider Only by SoCalTiger
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.5.4 - 2012-07-12
// ==/UserScript==

(function wholeBosScriptFunc(){

var main = function bosMainFunc() {

function bosStartIfQooxoodoIsAvailable() {
	if (qx === undefined) {
		window.setTimeout(bosStartIfQooxoodoIsAvailable, 5000);
	} else {
		bosScript();		
	}
}

window.setTimeout(bosStartIfQooxoodoIsAvailable, 5000);

var bosScript = function() {

qx.Class.define("bos.Const", {
	statics: {	
		DEBUG_VERSION: true,
	
		//flood control
		MIN_SEND_COMMAND_INTERVAL: 500,
		
		//server peridically sends new data with new resource levels, updated city orders -> it causes summary to refresh but better not to refresh if very recently there was another refresh
		MIN_INTERVAL_BETWEEN_AUTO_REFRESHES: 5000,
		
		MAX_POPUPS: 10
	}
});

qx.Class.define("bos.Tweaks", {
	type: "singleton",
	extend: qx.core.Object,
	members: {
		gameStarted: function() {
			trace("In gameStarted");

			this.tweakErrorReporting();
			var res = webfrontend.res.Main.getInstance();		

			try {
							
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
			
			trace("after gameStarted");
			
		},

		setZoom: function(zoom) {
			//for region and world
			var visMain = ClientLib.Vis.VisMain.GetInstance();
			visMain.set_ZoomFactor(zoom);
			
			//for city view
			try {
				if (qx.bom.client.Engine.GECKO) {
					a.visMain.scene.domRoot.style.MozTransform = "scale(" + zoom + ")";
					a.visMain.scene.domRoot.style["overflow"] = "hidden";
				} else {
					a.visMain.scene.domRoot.style["zoom"] = zoom;
				}
			} catch (ex) {
				//ignore any exception
			}
		},

		tweakErrorReporting: function() {
			if (bos.Const.DEBUG_VERSION) {
				//qx.event.GlobalError.setErrorHandler(null, this);
				//window.onerror = null;
				qx.event.GlobalError.setErrorHandler(handleError, this);
				//qx.event.GlobalError.setErrorHandler(null, this);
			}
		}, 
		tweakReports: function() {

			if (reportsTweaked) {
				return;
			}

			trace("in tweakReports");
			//a.title.reportButton.removeListener(a.title.reportButton, reportsBtnListener);

			//webfrontend.gui.ReportListWidget
			var rep = a.title.report;
			if (rep == null) {
				debug("rep is NULL");
				return;
			}

			rep.selectAllBtn.set({
				width: 90
			});

			rep.deleteBtn.set({
				width: 90
			});

			var left = 110;
			var step = 35;
			var bottom = 7;


			var tcm = rep.headers.getTableColumnModel();
			var behavior = tcm.getBehavior();
			behavior.setWidth(2, 90);

			//webfrontend.gui.ReportPage
			var reportPage = a.getReportPage();
			var widgets = reportPage.getChildren();
			var container = widgets[widgets.length - 1];
			var btnExportThisReport = new qx.ui.form.Button("Export");
			btnExportThisReport.addListener("execute", function(event) {
					//XXX after maintaince search for "checkAttackersLeft: function(" and look below in private method, to get name of private field with id
					var id = reportPage.__AV;
					var counter = 1;
					bos.net.CommandManager.getInstance().sendCommand("GetReport", {
						id: id
					}, this, parseReport, counter);
					counter++;
			}, this);
			container.add(btnExportThisReport);
			
			var btnExportToCombatCalc = new qx.ui.form.Button(locale == "de" ? "Zum Kampfkalk hinzuf." : "To Combat calc");
			btnExportToCombatCalc.setToolTipText(locale == "de" ? "FÃ¼gt den Spionage Report zum Kampfkalkulator hinzu." : "Adds <b>scout</b> report to combat calculator");
			btnExportToCombatCalc.addListener("execute", function(event) {
					//XXX after maintaince search for "checkAttackersLeft: function(" and look below in private method, to get name of private field with id
					var id = reportPage.__AV;
					onCombatCalc();
					var combat = getCombatCalculatorWidget();
					combat.addDefendersFromReport = true;
					var counter = 1;
					bos.net.CommandManager.getInstance().sendCommand("GetReport", {
						id: id
					}, combat, combat.parseReport, counter);
					counter++;
			}, this);
			container.add(btnExportToCombatCalc);						
			
			trace("after tweakReports");

			reportsTweaked = true;
			
		}, 
		tweakChat: function() {		
			var cls = a.chat;
			if (cls.oldOnNewMessage != undefined) {
				//already applied
				return;
			}
			
			a.chat.tabView.addListener("changeSelection", this._onChatChangeTab, this);
			a.chat.tabView.setSelection([a.chat.tabView.getChildren()[1]]);
			
			this._onChatChangeTab();
			
			cls.oldOnNewMessage = cls._onNewMessage;			
					
		}, 
		_onChatChangeTab: function(event) {
			var chatId = a.chat.tabView.getSelection()[0].getUserData("ID");
			var ch = a.chat.chatLine;
			
			switch (chatId) {
				case 0:
					ch.setBackgroundColor("red");
					break;
				case 1:
					ch.setBackgroundColor("");
					break;
				case 99:
					ch.setBackgroundColor("");
					break;
			}
									
		}
	
	}
});


//webfrontend.Application
var a;

var summaryWidget = null;

var reportsTweaked = false;

window.setTimeout(bosCheckIfLoaded, 1000);

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

function debug(sMsg) {
	if (bos.Const.DEBUG_VERSION) {
/*
	if (window.JS_log != undefined)
		window.JS_log(sMsg);
	else
	*/
		alert(sMsg);
	}
}

function dumpObject(obj) {
	debug(qx.util.Json.stringify(obj));
}

function trace(sMsg) {
	//alert(sMsg);
}
				
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

window.setTimeout(injectBoSScript, 100);

function injectBoSScript() {
	GM_log("Injecting LoU BoS script");

	var script = document.createElement("script");
	script.innerHTML = "(" + main.toString() + ")();";
	script.type = "text/javascript";
	document.getElementsByTagName("head")[0].appendChild(script);		
}
		
})();
