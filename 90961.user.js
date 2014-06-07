// ==UserScript==
// @name Fortbattle Player
// @namespace http://sourceforge.net/projects/twfbplayer/
// @description The fortbattle player displays the battle like the ingame flash player, but you can control the speed, skip rounds and see some statistics. Thanks to Gemini for hosting!  
// @include http://*.the-west.*/game.php*
// @grant none
// @version 2.0.3
// ==/UserScript==

/*
 Copyright (c) 2010 Daniel Raap

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

var fbp_script = document.createElement("script");
fbp_script.type = "text/javascript";
fbp_script.innerHTML = "(" + function(){
"use strict";

var dataDirectory = "http://superbia.at/fkplayer";
var playerFile = "FKPlayer.jar";

/**
 * FBP_Applet was meant to be a standalone class. But it must be
 * available in FortBattle, so it is contained in this closure.
 */
var FBP_Applet = {
	_appletClass : "de.outstare.fortbattleplayer.Applet",

	_createContainer : function (aDocument) {
		// remove existing
		this.close();
		var div, close;
		div = aDocument.createElement("div");
		div.setAttribute("id", "fbapplet-container");
		div.setAttribute("style",
						"position: absolute; top: 0px; left: 0px; width: 90%; height: 95%; z-index: 1111; text-align: right;");
		close = aDocument.createElement("a");
		close.setAttribute("href", "#");
		close.setAttribute("style", "background-color: #AA7733;");
		// close.addEventListener("click", this.close, true);
		// copy of close() as anonymous function
		close.setAttribute("onclick",
						"javascript:(function (){var div=document.getElementById('fbapplet-container');if(div){while(div.hasChildNodes()){div.removeChild(div.firstChild);}div.parentNode.removeChild(div);}})();void(0);");
		close.appendChild(aDocument.createTextNode("close X"));
		div.appendChild(close);
		return div;
	},

	addApplet : function (aDocument, data) {
		var container, applet;
		container = this._createContainer(aDocument);
		applet = aDocument.createElement("applet");
		applet.setAttribute("id", "fbapplet");
		// data-URL does not seem to work :(
		// applet.setAttribute("archive",
		applet.setAttribute("codebase", dataDirectory);
		applet.setAttribute("archive", playerFile);
		applet.setAttribute("code", this._appletClass);
		applet.setAttribute("width", "100%");
		applet.setAttribute("height", "95%");
		applet.setAttribute("alt",
				"Your browser has to support Java Applets!");
		this._addFBData(aDocument, applet, data);
		container.appendChild(applet);

		aDocument.getElementsByTagName("body")[0].appendChild(container);
	},

	_addFBData : function (aDocument, applet, data) {
		var javaArgs = aDocument.createElement("param");
		javaArgs.setAttribute("name", "fbdata");
		// TODO escaping special characters?
		javaArgs.setAttribute("value", data);
		applet.appendChild(javaArgs);
	},

	setAppletData : function (aDocument, data) {
		var applet = aDocument.getElementById("fbapplet-data");
		if (applet === null) {
			alert("the opened page is not correct!");
		} else {
			// applet.setAttribute("archive",
			applet.setAttribute("value", data);
			alert("added data");
		}
	},

	/**
	 * Show the fortbattle of the given data in the applet in a new
	 * window
	 */
	showBattle : function (data) {
		var windowContainer = jQuery("#windows");
		if(!windowContainer) {
			windowContainer = document;
		}
		this.addApplet(document, data);
	},

	close : function () {
		var div = document.getElementById("fbapplet-container");
		if (div) {
			while (div.hasChildNodes()) {
				div.removeChild(div.firstChild);
			}
			div.parentNode.removeChild(div);
		}
	}
};

// we overwrite this function, but the original is called first. So it is extended.
CemeteryWindow.showStatUpdateTable = (function () {
    "use strict";
    var original_showStatUpdateTable = CemeteryWindow.showStatUpdateTable;
    return function (data) {
        original_showStatUpdateTable(data); // call super
        // create closure that contains the data
        var showFBExport = function () {
            // since (at least) v2.04
            new west.gui.Dialog('Fortbattle Export','<textarea cols=60 rows=20>' + JSON.stringify(data.result) + '</textarea>')
            .setModal(true,true,{bg:"http://www.the-west.net/images/curtain_bg.png",opacity:0.7})
            .show();
// in v2.0
//            new tw2gui.dialog('Fortbattle Export','<textarea cols=60 rows=20>' + JSON.stringify(data.result) + '</textarea>')
//            .setModal(true,true,{bg:"http://www.the-west.net/images/curtain_bg.png",opacity:0.7})
//            .show();
// before v2.0
//            new MessageBox({
//                title: 'Fortbattle Export',
//                message: '<textarea cols=60 rows=20>' + JSON.stringify(data.result) + '</textarea>',
//                cancelOnOutsideClick: true
//            }).show();
        };

        var showFBApplet = function () {
            FBP_Applet.showBattle(JSON.stringify(data.result));
        };

        var addJSLink = function (linkText, onClickFunction) {
            // TODO parameter check
            var cemeteryFooter = jQuery("div.footer", CemeteryWindow.DOM);
            if (cemeteryFooter) {
                var separator = document.createTextNode(" - ");
                var exportLink = document.createElement("a");
                var exportText = document.createTextNode(linkText);
                exportLink.appendChild(exportText);
                exportLink.href = "#";
                exportLink.onclick = function () {
                    onClickFunction();
                    return false;
                };
                cemeteryFooter.append(separator);
                cemeteryFooter.append(exportLink);
            } else {
                window.alert('Failed to add FortBattlePlayer to report!');
            }
        };

        addJSLink("Show battle", showFBApplet);
        addJSLink("Export", showFBExport);
    };
}());

function registerWithWestAPI() {
	var key = "twfbplayer";
	var name = "Fortbattle Player";
	var minVersion = "1.23";
	var maxVersion = "2.01";
	var author = "Loom";
	var website = "http://sf.net/projects/twfbplayer/";
	// to call the West API we must do this out of the greasemonkey sandbox
	var RegisterScript = document.createElement("script");
	RegisterScript.type = "text/javascript";
	RegisterScript.text = "TheWestApi.register('" + key + "', '" + name
			+ "', '" + minVersion + "', '" + maxVersion + "', '" + author
			+ "', '" + website + "')";
	document.body.appendChild(RegisterScript);
}

//registerWithWestAPI();

}.toString() +")();";
document.body.appendChild(fbp_script);
