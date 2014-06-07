/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

// ==UserScript==
// @name           Captain KDice
// @namespace      kdice
// @description    This adds a new checkbox to kdice to let you end the turns automatically. No more need to watch the others play when you have your position secured.
// @include        http://kdice.com/*
// @include        http://www.kdice.com/*
// @require        http://o.aolcdn.com/dojo/1.4/dojo/dojo.xd.js
// @version        1.0.2
// ==/UserScript==

kcpt = {}
kcpt.init = function() {
	var el = dojo.query(".iogc-LoginPanel-nameHeading")
	if(window.location.href.indexOf("#")!= 17  && window.location.href.indexOf("#")!= 21|| !el[0]) {
		return
	}
	kcpt.player = el[0].innerHTML
	var table = dojo.query(".iogc-Controls td[align$=left]")[0]
	var div = document.createElement("div")
	div.id= "boxContainer"
	table.appendChild(div)
	kcpt.insertHTML()
}
kcpt.autoBox = function() {return dojo.byId("autoMode")}
kcpt.alertBox = function() {return dojo.byId("alertMode")}

kcpt.insertHTML = function() {
	var div = dojo.byId("boxContainer")
	div.innerHTML = kcpt.checkboxesHTML
	dojo.connect(kcpt.autoBox(), "onchange", null, kcpt.checkboxSelect)
	dojo.connect(kcpt.alertBox(), "onchange", null, kcpt.alertCheckboxSelect)
}
kcpt.checkboxSelect = function() {
	var box = kcpt.autoBox()
	if(box.checked) {
		kcpt.location = window.location.href
		dojo.byId('alertPanel').style.display= "inline"
		kcpt.loop = window.setInterval(
			function() {
				if(window.location.href != kcpt.location) {
					kcpt.abortAutoMode()
				}
				var alertBox = kcpt.alertBox()
				kcpt.getCurrentLogs().forEach(function(node) {
					node.className="tagged"
					var content = node.innerHTML
					if(content.indexOf("'s turn") != -1) {
						kcpt.currentPlayer = node.getElementsByTagName("span")[0].innerHTML
					}
					if(content.indexOf(kcpt.player+" finishes") != -1) {
						kcpt.abortAutoMode()
						return
					}
					
					// Check if player has lagged out
					if(content.indexOf(kcpt.player+" sits out") != -1) {
						window.setTimeout(function() { // be sure to wait.. so the player doesn't get to sit in after the game has just finished
							var playerStatus = dojo.query(".iogc-LoginPanel-playerRow div[class~='gwt-Label']")
							var gameStatus = dojo.query(".iogc-GameWindow-status")
							var gameLocation = dojo.query(".iogc-LoginPanel-playerRow div[class~='gwt-Hyperlink'] a")
							if(playerStatus[0] && playerStatus[0].innerHTML.indexOf("(playing)") != -1) {
								if(gameStatus[0] && gameStatus[0].innerHTML.indexOf("game running") != -1) {
									var btn = dojo.query(".iogc-GameWindow-sitDownButton")
									if(btn[0]) {
										var btnStyle = btn[0].getAttribute('style')
										if(btnStyle.indexOf('none') != -1) {
											if(gameLocation[0] && gameLocation[0].innerHTML == window.location.href.replace("http://kdice.com/#","")) {
												var evt = document.createEvent("MouseEvents");
												evt.initMouseEvent("click", true, true, window,
												0, 0, 0, 0, 0, false, false, false, false, 0, null);
												btn[0].dispatchEvent(evt);
											}
										}
									}
								}
							}
						}, 2000) 
					}
					
					if(alertBox.checked) {
						if(content.indexOf(kcpt.player) != -1 && (content.indexOf("defeated") != -1 
								|| content.indexOf("defended") != -1))
						{
							if(kcpt.currentPlayer)
								var text = kcpt.currentPlayer+" attacked you !";
							else
								var text = kcpt.currentPlayer+"Someone attacked you !";
							var check = confirm(text +"\n Continue auto ending turns?");
							if(!check) {
								kcpt.abortAutoMode()
							}
							kcpt.getCurrentLogs().forEach(function(node) {
								node.className="tagged"
								if(node.innerHTML.indexOf(kcpt.player + " finishes") != -1) {
									kcpt.abortAutoMode()
								}
							})
							return // break the loop also
						}
					}
				})
				// The Auto 'End Turn' check
				var button = dojo.query(".iogc-Controls .iogc-NewButton-blue")[0];
				

				if(button) {
					var btnStyle = button.getAttribute('style')
					if(btnStyle.indexOf('none') == -1) {
						var evt = document.createEvent("MouseEvents");
						evt.initMouseEvent("click", true, true, window,
						0, 0, 0, 0, 0, false, false, false, false, 0, null);
						button.dispatchEvent(evt);
					}
				}
			}, 1500)
	
	} else {
		kcpt.abortAutoMode()
	}
}

kcpt.abortAutoMode = function() {
	window.clearInterval(kcpt.loop)
	kcpt.insertHTML()
}
kcpt.alertCheckboxSelect = function() {
	var box  = kcpt.alertBox() 
	if(box && box.checked) {
		kcpt.tagAllRows()
	}
}

kcpt.getCurrentLogs = function() {
	return dojo.query(".iogc-MessagePanel-messages tr:not([class='tagged'])")
}
kcpt.tagAllRows = function() {
	dojo.query(".iogc-MessagePanel-messages tr:not([class='tagged'])").forEach(function(node) {node.className="tagged"})
}
kcpt.checkboxesHTML = "<input type='checkbox' id='autoMode'/>" +
"Auto End Turn &nbsp;&nbsp;" +
"<span style='font-style:italic; display:none' id='alertPanel'>" +
"<input type='checkbox' id='alertMode'/>" +
"Alert when attacked</span>"

dojo.connect(window,"onload", function(){window.setTimeout(kcpt.init, 1500)})
