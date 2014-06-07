// ==UserScript==
// @name        CC Tiberium Alliances Ultimate Pack (RD Custom)
// @namespace   https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
/* @description Packing all more used script for C&C Tiberium Alliance Web Game.
                Pack list : 
                - Infernal Wrapper (API needed)
                - Chat Helper Enhanced
                - Tiberium Zoomer (KOMMANDO)
                - Tiberium Coords 500:500
                - Maelstorm Tools
                - Formation Saver
                - Combat Simulator
		- CnCOpt
		- MT Basescanner
		- Transfer All
		- Loot 2.0
                - C&C:TA Compass Movable
                - Tiberium Alliances Map

*/
// @version     1.3.0
// @updateURL   http://userscripts.org/scripts/source/161678.meta.js
// @downloadURL http://userscripts.org/scripts/source/161678.user.js
// @grant       none
// ==/UserScript==

// type: /chelp in any text box and hit <enter> for a list of commands

/***********************************************************************************
API Infernal Wrapper (1st)
***********************************************************************************/

(function () {
    var CCTAWrapper_main = function () {
        try {
            _log = function () {
                if (typeof console != 'undefined') console.log(arguments);
                else if (window.opera) opera.postError(arguments);
                else GM_log(arguments);
            }

            function createCCTAWrapper() {
                console.log('CCTAWrapper loaded');
                _log('wrapper loading' + PerforceChangelist);
				System = $I;
                SharedLib = $I;
                var strFunction = null;

                // SharedLib.Combat.CbtSimulation.prototype.DoStep
                for (var x in $I) {
                    for (var key in $I[x].prototype) {
                        if ($I[x].prototype[key] !== null) {
                            strFunction = $I[x].prototype[key].toString();
                            if (typeof $I[x].prototype[key] === 'function' & strFunction.indexOf("().l;var b;for (var d = 0 ; d < c.length ; d++){b = c[d];if((b.") > -1) {
                                $I[x].prototype.DoStep = $I[x].prototype[key];
                                console.log("SharedLib.Combat.CbtSimulation.prototype.DoStep = $I." + x + ".prototype." + key);
                                break;
                            }
                        }
                    }
                }

                // ClientLib.Data.CityRepair.prototype.CanRepair
                for (var key in ClientLib.Data.CityRepair.prototype) {
                    if (ClientLib.Data.CityRepair.prototype[key] !== null) {
                        strFunction = ClientLib.Data.CityRepair.prototype[key].toString();
                        if (typeof ClientLib.Data.CityRepair.prototype[key] === 'function' & strFunction.indexOf("DamagedEntity") > -1 & strFunction.indexOf("DefenseSetup") > -1) {
                            ClientLib.Data.CityRepair.prototype.CanRepair = ClientLib.Data.CityRepair.prototype[key];
                            console.log("ClientLib.Data.CityRepair.prototype.CanRepair = ClientLib.Data.CityRepair.prototype." + key);
                            break;
                        }
                    }
                }

                // ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost
                for (var key in ClientLib.Data.CityRepair.prototype) {
                    if (ClientLib.Data.CityRepair.prototype[key] !== null) {
                        strFunction = ClientLib.Data.CityRepair.prototype[key].toString();
                        if (typeof ClientLib.Data.CityRepair.prototype[key] === 'function' & strFunction.indexOf("Type==7") > -1 & strFunction.indexOf("var a=0;if") > -1) {
                            ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost = ClientLib.Data.CityRepair.prototype[key];
                            console.log("ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost = ClientLib.Data.CityRepair.prototype." + key);
                            break;
                        }
                    }
                }

                // ClientLib.Data.CityUnits.prototype.get_OffenseUnits
                strFunction = ClientLib.Data.CityUnits.prototype.HasUnitMdbId.toString();
                var searchString = "for (var b in {d:this.";
                var startPos = strFunction.indexOf(searchString) + searchString.length;
                var fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "var $createHelper;return this." + fn_name + ";"
                var fn = Function('', strFunction);
                ClientLib.Data.CityUnits.prototype.get_OffenseUnits = fn;
                console.log("ClientLib.Data.CityUnits.prototype.get_OffenseUnits = function(){var $createHelper;return this." + fn_name + ";}");

                // ClientLib.Data.CityUnits.prototype.get_DefenseUnits
                strFunction = ClientLib.Data.CityUnits.prototype.HasUnitMdbId.toString();
                searchString = "for (var c in {d:this.";
                startPos = strFunction.indexOf(searchString) + searchString.length;
                fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "var $createHelper;return this." + fn_name + ";"
                fn = Function('', strFunction);
                ClientLib.Data.CityUnits.prototype.get_DefenseUnits = fn;
                console.log("ClientLib.Data.CityUnits.prototype.get_DefenseUnits = function(){var $createHelper;return this." + fn_name + ";}");

                // ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation
                strFunction = ClientLib.Vis.Battleground.Battleground.prototype.StartBattle.toString();
                searchString = "=0;for(var a=0; (a<9); a++){this.";
                startPos = strFunction.indexOf(searchString) + searchString.length;
                fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "return this." + fn_name + ";"
                fn = Function('', strFunction);
                ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation = fn;
                console.log("ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation = function(){return this." + fn_name + ";}");

                // GetNerfBoostModifier
                if (typeof ClientLib.Vis.Battleground.Battleground.prototype.GetNerfAndBoostModifier == 'undefined') ClientLib.Vis.Battleground.Battleground.prototype.GetNerfAndBoostModifier = ClientLib.Base.Util.GetNerfAndBoostModifier;

                _log('wrapper loaded');
            }
        } catch (e) {
            console.log("createCCTAWrapper: ", e);
        }

        function CCTAWrapper_checkIfLoaded() {
            try {
                if (typeof qx !== 'undefined') {
                    createCCTAWrapper();
                } else {
                    window.setTimeout(CCTAWrapper_checkIfLoaded, 1000);
                }
            } catch (e) {
                CCTAWrapper_IsInstalled = false;
                console.log("CCTAWrapper_checkIfLoaded: ", e);
            }
        }

        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(CCTAWrapper_checkIfLoaded, 1000);
        }
    }

    try {
        var CCTAWrapper = document.createElement("script");
        CCTAWrapper.innerHTML = "var CCTAWrapper_IsInstalled = true; (" + CCTAWrapper_main.toString() + ")();";
        CCTAWrapper.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(CCTAWrapper);
        }
    } catch (e) {
        console.log("CCTAWrapper: init error: ", e);
    }
})();

/***********************************************************************************
Chat Helper Enhanced
***********************************************************************************/

(function () {
	var CNCTAChatHelper_main = function () {
		try {
			// Caret functions from: http://userscripts.org/scripts/show/151099
			function createChatHelper() {
				window.__ChatHelper_ch_debug = false;
				window.__ChatHelper_suppressBrowserAltKeys = true;
				window.__ChatHelper_version = "3.0.0";
				window.__ChatHelper_fullname = "C&C: Tiberium Alliances Chat Helper Enhanced";
				console.log(window.__ChatHelper_fullname + ' v' + window.__ChatHelper_version + ': loading.');
				
				function getCaretPos(obj) {
					obj.focus();
					
					if (obj.selectionStart)
						return obj.selectionStart; //Gecko
					else if (document.selection) //IE
					{
						var sel = document.selection.createRange();
						var clone = sel.duplicate();
						sel.collapse(true);
						clone.moveToElementText(obj);
						clone.setEndPoint('EndToEnd', sel);
						return clone.text.length;
					}
					
					return 0;
				}
				
				function moveCaret(inputObject, pos) {
					if (inputObject.selectionStart) {
						inputObject.setSelectionRange(pos, pos);
						inputObject.focus();
					}
				}
				
				function getCursorWordPos(inputField) {
					var pos = getCaretPos(inputField);
					var inText = inputField.value;
					var lc = inText.charAt(pos - 1);
					if (lc.match(/\w/) !== null) {
						var sPos = pos;
						var ePos = pos;
						var t = inputField.value;
						while (sPos >= 0 && t.charAt(sPos - 1).match(/\w/) !== null) {
							sPos--;
						}
						while (ePos <= t.length && t.charAt(ePos).match(/\w/) !== null) {
							ePos++;
						}
						//inputField.setSelectionRange(sPos,ePos);
						return [sPos, ePos];
					}
				}
				
				function tagWith(tag, inputField) {
					var eTag = tag.replace('[', '[/');
					var tagLen = tag.length;
					var eTagLen = eTag.length;
					if (inputField !== null) {
						var pos = getCaretPos(inputField);
						var inText = inputField.value;
						if (inputField.type === 'textarea')
							var st = inputField.scrollTop;
						if (inputField.selectionStart !== inputField.selectionEnd) {
							var a = inText.slice(0, inputField.selectionStart);
							var b = inText.slice(inputField.selectionStart, inputField.selectionEnd);
							var c = inText.slice(inputField.selectionEnd, inText.length);
							inputField.value = a + tag + b + eTag + c;
							moveCaret(inputField, pos + tagLen + eTagLen + b.length);
						} else if ((inText === "" || inText.charAt(pos - 1) === " ") && (inText.charAt(pos) !== '[')) {
							inputField.value = inText.substr(0, pos) + tag + eTag + inText.substr(pos, inText.length);
							moveCaret(inputField, pos + tagLen);
						} else if (inText.slice(pos - 1, pos).match(/\w/) !== null) {
							var arr = getCursorWordPos(inputField);
							var s = arr[0];
							var e = arr[1];
							inputField.value = inText.slice(0, s) + tag + inText.slice(s, e) + eTag + inText.slice(e, inText.length);
							moveCaret(inputField, e + tagLen + eTagLen);
						}
						if (inputField.type === 'textarea')
							inputField.scrollTop = st;
					}
				}
				
				function showHelp() {
					alert("Type /chelp in any text box to show this message.\n\nEnter key in chat:\tsearches your chat string for Urls and Coords and wraps them before submission.\n\nAlt + 1\t:\tsearches for Urls and Coords in a message or forum post and tags accordingly. Cursor is moved to the beginning.\nAlt + 2\t:\tManual URL insertion popup window\nAlt + 0\t:\tclears all tags\n\nWord wraps: tags a selected word -or- tags the word where the cursor is (if chat is empty or you hit <space> empty tags are inserted).\nAttempts to preserve cursor and scroll position.\n|\tAlt + P or Alt + 3\t:\tplayer tags\n|\tAlt + A or Alt + 4\t:\talliance tags\n|\tAlt + B\t\t\t:\tbold tags\n|\tAlt + I\t\t\t:\titalic tags\n|\tAlt + U\t\t\t:\tunderline tags\n|\tAlt + T\t\t\t:\tstrikethrough tags\n|\tAlt + X\t\t\t:\tPaste last coords hovered with mouse\n");
				}
				
				var isWhisp = false;
				var contacts = [];
				
				if (!localStorage.myContacts) {
					console.log("Chat Helper: No contacts saved");
					//localStorage.myContacts = [];
				} else {
					contacts = localStorage.myContacts.split(',');
					//console.log("Contacts: " + contacts);
				}
				
				function saveContact(fr) {
					//console.log("Number of contacts: "+contacts.length);
					contacts.push(fr);
					console.log(fr + " added to contacts list.");
					localStorage.myContacts = contacts.join(',');
				}
				
				function caseInsensitiveSort(a, b) {
					a = a.toLowerCase();
					b = b.toLowerCase();
					if (a > b)
						return 1;
					if (a < b)
						return -1;
					return 0;
				}
				
				function listContacts() {
					if (contacts.length > 0) {
						var a = contacts.sort(caseInsensitiveSort);
						//console.log(contacts);
						alert(contacts.length + " Contacts:\n\n" + a.join("\n") + "\n")
					} else {
						var p = prompt("Your contacts list is empty.\n\nWould you like to add a contact?\n", "");
						if (p) {
							saveContact(p);
						}
					}
				}
				
				function deleteContact(fr) {
					if (fr === "all") {
						localStorage.myContacts = "";
						contacts = new Array();
						console.log("All contacts deleted");
					} else {
						var ind = contacts.indexOf(fr);
						if (ind > -1) {
							contacts.splice(ind, 1);
							localStorage.myContacts = contacts.join(',');
						}
						console.log(fr + " deleted from contacts list.");
					}
				}
				var timer;
				function keyUpTimer(kEv){
					kEv = kEv || window.event;
					if (kEv.target.type === "text" && kEv.target.value != '') {
						var inputField = kEv.target;
						var inText = inputField.value;
						var len = inText.length;
						var sub;
						var kc = kEv.keyCode;
						if (len >= 10 && inText.match(/^(\/whisper)/) != null) {
							isWhisp = true;
						}
						if (isWhisp && len >= 10 && !kEv.altGraphKey && !kEv.ctrlKey && !kEv.altKey && kc > 47 && kc < 91) {
							//console.log(kEv.keyCode);
							sub = inText.substr(9);
							if (!sub.match(/\s/)) {
								//console.log("2:"+inText.substr(9));
								for (var i = 0; i < contacts.length; i++) {
									var slen = sub.length;
									if (contacts[i][slen - 1] === sub[slen - 1] && contacts[i].substr(0, slen) == sub) {
										inputField.value = "/whisper " + contacts[i] + " ";
										inputField.setSelectionRange(10 + slen - 1, 10 + contacts[i].length, "forward");
									}
								}
							} else {
								isWhisp = false;
							}
						} else {
							isWhisp = false;
						}
					}
				}
				
				document.onkeyup = function (kEv) {
					clearTimeout(timer);
					timer = setTimeout(function () {
						keyUpTimer(kEv);
					}, 100);
				}
				
				var _sub;
				function delayedConfirm(){
					if (confirm("Add " + _sub + " to your contacts list?\n\nYou can see a list of your contacts by typing /list")) {
						saveContact(_sub);
						//continue without return false to allow whisper message to go through
					}
				}
				
				document.onkeydown = function (kEv) {
					kEv = kEv || window.event;
					
					/* Tab key
					if (kEv.keyCode == 9){
						var input = qx.core.Init.getApplication().getChat().getChatWidget().getEditable(); // Input
						kEv.preventDefault();
						kEv.stopPropagation();
					}
					*/
					if (!kEv.shiftKey && kEv.keyCode === 13 && (kEv.target.type === "text" || kEv.target.type === "textarea")) {
						var inputField = kEv.target;
						var inText = inputField.value;
						var add = inText.match(/^(\/add)/);
						var del = inText.match(/^(\/del)/);
						var showContacts = inText.match(/^((\/contacts)|(\/list))/);
						var sub;
						var cf;
						//add contact dialog
						if (inText.match(/^(\/whisper)/) != null || add != null) {
							if (add != null) {
								sub = inText.substr(5);
							} else {
								sub = inText.substr(9);
							}
							if (sub.match(/^(\w*)\s/)) {
								//if space after player name (is a whisper or a typo)
								var arr = sub.match(/^(\w*)/);
								sub = arr[0].replace(/\s$/, "");
								if (contacts.indexOf(sub) == -1) {
									//not in contacts list
									_sub = sub;
									setTimeout(delayedConfirm,1000);
								}
							} else if (contacts.indexOf(sub) == -1) {
								//not in contacts, promt to add, clear input
								inputField.focus();
								inputField.value = "";
								if (confirm("Add " + sub + " to your contacts list?\n\nYou can see a list of your contacts by typing /list")) {
									saveContact(sub);
									return false;
								}
							} else if (sub && contacts.indexOf(sub) > -1) {
								//not a whisper, reject duplicate contact
								alert(sub + " is already in your contacts list.");
							}
						}
						//remove contact(s)
						if (del) {
							sub = inText.substr(5);
							inputField.value = "";
							if ((contacts.indexOf(sub) > -1 || sub == "all") && confirm("Really delete " + sub + " from your contacts?\n\n Type \"/del all\" to delete all of your contacts")) {
								deleteContact(sub);
							} else {
								alert(sub + " is not in your contacts list.");
							}
							return false;
						}
						// show contacts list
						if (showContacts) {
							inputField.value = "";
							listContacts();
							return false;
							
						}
						// /chelp dialog
						if (inText.length === 6 && inText.match(/^(\/chelp)/) != null) {
							inputField.value = "";
							showHelp();
							return false;
						}
						
						if (inputField !== null && inputField.type === "text") {
							if (window.__ChatHelper_ch_debug)
								console.log("Chat Helper: onEnter auto-tagging");
							//this code is from Bruce Doan: http://userscripts.org/scripts/show/151965
							inText = inText.replace(/(\[coords\])*([0-9]{3})[:|.]([0-9]{3})([:|.]\w+)?(\[\/coords\])*/gi, function () {
									var result = new Array();
									result.push('[coords]');
									result.push(arguments[2]);
									result.push(':');
									result.push(arguments[3]);
									if (arguments[4] !== undefined) {
										result.push(arguments[4].replace('.', ':'));
									}
									result.push('[/coords]');
									return result.join('');
								});
							// auto url
							inText = inText.replace(/(\[url\])*(https?:\/\/)([\da-z\.-]+)(\.[a-z]{2,6})([\/\w\.\-\=\?\&\%\|#]*)*\/?(\[\/url\])*/gi, function () {
									var result = new Array();
									result.push('[url]');
									result.push(arguments[2]); // http[s]://
									result.push(arguments[3]); // domain
									result.push(arguments[4]); // ext
									result.push(arguments[5]); // query string
									result.push('[/url]');
									return result.join('');
									
								});
							// shorthand for player
							inText = inText.replace(/\[p\]([a-z0-9_\-\s]+)\[\/p\]/gi, '[player]$1[/player]');
							// shorthand for alliance
							inText = inText.replace(/\[a\]([a-z0-9_\-\s]+)\[\/a\]/gi, '[alliance]$1[/alliance]');
							if (inText !== "" || inText !== inputField.value) {
								inputField.value = inText;
							}
						}
					}
					
					if (kEv.altKey && !kEv.shiftKey && !kEv.altGraphKey && !kEv.ctrlKey && kEv.target != null && (kEv.target.type === "textarea" || kEv.target.type === "text")) {
						var inputField = kEv.target;
						var inText = inputField.value;
						// Alt key, not Ctrl or AltGr
						if (kEv.altKey && !kEv.altGraphKey && !kEv.ctrlKey) {
							var cc = kEv.charCode;
							var kc = kEv.keyCode;
							if (window.__ChatHelper_ch_debug) {
								console.log(cc);
								console.log(kc);
							}
							/* Alt+1 for auto Coordinates/Urls in message body */
							if (inputField.type === "textarea" && (cc === 49 || kc === 49)) {
								var pos = getCaretPos(inputField);
								if (window.__ChatHelper_ch_debug)
									console.log("Chat Helper: attempting Alt+1 message auto-tag");
								if (inputField != null) {
									var st = inputField.scrollTop;
									inText = inText.replace(/(\[coords\])*([0-9]{3})[:|.]([0-9]{3})([:|.]\w+)?(\[\/coords\])*/gi, function () {
											var result = new Array();
											result.push('[coords]');
											result.push(arguments[2]);
											result.push(':');
											result.push(arguments[3]);
											if (arguments[4] !== undefined) {
												result.push(arguments[4].replace('.', ':'));
											}
											result.push('[/coords]');
											return result.join('');
										});
									// auto url
									inText = inText.replace(/(\[url\])*(https?:\/\/)([\da-z\.-]+)(\.[a-z]{2,6})([\/\w\.\-\=\?\&\%\|#]*)*\/?(\[\/url\])*/gi, function () {
											var result = new Array();
											result.push('[url]');
											result.push(arguments[2]); // http[s]://
											result.push(arguments[3]); // domain
											result.push(arguments[4]); // ext
											result.push(arguments[5]); // query string
											result.push('[/url]');
											return result.join('');
											
										});
									inText = inText.replace(/\[a\]([a-z0-9_\-\s]+)\[\/a\]/gi, '[alliance]$1[/alliance]');
									inText = inText.replace(/\[p\]([a-z0-9_\-\s]+)\[\/p\]/gi, '[player]$1[/player]');
									if (inText !== "" || inText !== inputField.value) {
										inputField.value = inText;
										inputField.scrollTop = st;
										moveCaret(inputField, 0);
									}
								}
							}
							/* Alt+2 for URLs fallback */
							if (cc === 50 || kc === 50) {
								if (inputField !== null) {
									var url = prompt("Website (Syntax: google.com or www.google.com)", "");
									if (url !== null) {
										inputField.value += '[url]' + url + '[/url]';
									}
								}
							}
							/* Alt+3 or Alt+p for players */
							if ((cc === 112 || kc === 80) || (cc === 51 || kc === 51)) {
								tagWith('[player]', inputField);
								if (window.__ChatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+4 or Alt+a for alliances */
							if ((cc === 97 || kc === 65) || (cc === 52 || kc === 52)) {
								tagWith('[alliance]', inputField);
								if (window.__ChatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+0 to clear tags */
							if (cc === 48 || kc === 48) {
								if (inputField.type === 'textarea')
									var st = inputField.scrollTop;
								if (inputField !== null) {
									inText = inText.replace(/\[\/?coords\]/gi, '');
									inText = inText.replace(/\[\/?url\]/gi, '');
									inText = inText.replace(/\[\/?player\]/gi, '');
									inText = inText.replace(/\[\/?alliance\]/gi, '');
									inText = inText.replace(/\[\/?b\]/gi, '');
									inText = inText.replace(/\[\/?i\]/gi, '');
									inText = inText.replace(/\[\/?u\]/gi, '');
									inText = inText.replace(/\[\/?s\]/gi, '');
									inputField.value = inText;
								}
								if (inputField.type === 'textarea')
									inputField.scrollTop = st;
							}
							/* Alt+b for bold */
							if (cc === 98 || kc === 66) {
								tagWith('[b]', inputField);
								if (window.__ChatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+i for italics */
							if (cc === 105 || kc === 73) {
								tagWith('[i]', inputField);
								if (window.__ChatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+u for underline */
							if (cc === 117 || kc === 85) {
								tagWith('[u]', inputField);
								if (window.__ChatHelper_suppressBrowserAltKeys)
									return false;
							}
							/* Alt+T for strikethrough (CHANGED for compatibility, initial Alt+S) )*/
							if (cc === 116 || kc === 84) {
								tagWith('[s]', inputField);
								if (window.__ChatHelper_suppressBrowserAltKeys)
									return false;
							}
						}
					}
				}
			}
		} catch (err) {
			console.log("createChatHelper: ", err);
		}
		
		function CNCTAChatHelper_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined') {
					createChatHelper();
				} else {
					window.setTimeout(CNCTAChatHelper_checkIfLoaded, 1000);
				}
			} catch (err) {
				console.log("CNCTAChatHelper_checkIfLoaded: ", err);
			}
		}
		window.setTimeout(CNCTAChatHelper_checkIfLoaded, 1000);
	};
	try {
		var CNCTAChatHelper = document.createElement("script");
		CNCTAChatHelper.innerHTML = "(" + CNCTAChatHelper_main.toString() + ")();";
		CNCTAChatHelper.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(CNCTAChatHelper);
	} catch (err) {
		console.log("CNCTAChatHelper: init error: ", err);
	}
})();

/***********************************************************************************
CCTA Zoom (KOMMANDO)
***********************************************************************************/

(function (){
  var tazoom_main = function() {
    function initialize() {
      console.log("Zoom Loaded");
      
      var zoomMin = 2.0;	// Larger number means able to zoom in closer.
      var zoomMax = 0.1;	// Smaller number means able to zoom out further.
      var zoomInc = 0.08;	// Larger number for faster zooming, Smaller number for slower zooming.
      
      webfrontend.gui.BackgroundArea.prototype.onHotKeyPress = function(be) {
        if(!this.active || be.getTarget() != this.mapContainer)
          return;
        var bh = be.getKeyIdentifier();
        var bf = ClientLib.Vis.VisMain.GetInstance();
        switch(bh) {
          case "+":
            var bg = bf.get_Region().get_ZoomFactor() + zoomInc;
            bf.get_Region().set_ZoomFactor(Math.min(zoomMin, Math.max(zoomMax, bg)));
            break;
          case "-":
            var bg = bf.get_Region().get_ZoomFactor() - zoomInc;
            bf.get_Region().set_ZoomFactor(Math.min(zoomMin, Math.max(zoomMax, bg)));
            break;
        }
        this.closeCityInfo();
        this.closeCityList();
      }

      var backgroundArea = qx.core.Init.getApplication().getBackgroundArea();
      qx.bom.Element.removeListener(backgroundArea.mapContainer, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
      qx.bom.Element.removeListener(backgroundArea.mapBlocker, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
      webfrontend.gui.BackgroundArea.prototype._onMouseWheel = function(e) {
        if(this.activeSceneView == null)
          return;
        var bz = e.getWheelDelta();
        var by = this.activeSceneView.get_ZoomFactor();
        by += bz > 0 ? -zoomInc : zoomInc;
        by = Math.min(zoomMin, Math.max(zoomMax, by));
        this.activeSceneView.set_ZoomFactor(by);
        e.stop();
      }
      qx.bom.Element.addListener(backgroundArea.mapContainer, "mousewheel", backgroundArea._onMouseWheel, backgroundArea);
      qx.bom.Element.addListener(backgroundArea.mapBlocker, "mousewheel", backgroundArea._onMouseWheel, backgroundArea); 
    }
 
    function tazoom_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined') {
          a = qx.core.Init.getApplication(); // application
          mb = qx.core.Init.getApplication().getMenuBar();
          if (a && mb) {
            initialize();
          } else
            window.setTimeout(tazoom_checkIfLoaded, 1000);
        } else {
          window.setTimeout(tazoom_checkIfLoaded, 1000);
        }
      } catch (e) {
        if (typeof console != 'undefined') console.log(e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
    }
    
    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(tazoom_checkIfLoaded, 1000);
    }
  }

  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var tazoomScript = document.createElement("script");
  tazoomScript.innerHTML = "(" + tazoom_main.toString() + ")();";
  tazoomScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(tazoomScript);
  }
})();

/***********************************************************************************
CCTA Coords 500:500
***********************************************************************************/
function Ini() {
	m = "CnC: Tiberium Alliances COORDS has been loaded";
	if (typeof console != 'undefined') console.log(m);
	else if (window.opera) opera.postError(m);
	else GM_log(m);
};

(function () {
	var TACoordsMain = function () {
			var IsDEBUG = false;
			function log(m) {
				if (IsDEBUG) {
					if (typeof console != 'undefined') console.log(m);
					else if (window.opera) opera.postError(m);
					else GM_log(m);
				}
			};
			log("IsDEBUG = true");
			function createInstance() {
				var MrHIDE = {};
				qx.Class.define("MrHIDE.main", {
					type: "singleton",
					extend: qx.core.Object,
					members: {
						Coords: "First, just move mouse cursor over some map coordinates numbers ex. 0:0",
						initialize: function () {
							window.addEventListener("keyup", this.onKey, false);
							window.addEventListener("mouseover", this.onMouseOver, false);
						},
						GetCaretPosition: function (ctrl) {
							var CaretPos = 0; // IE Support
							if (document.selection) {
								ctrl.focus();
								var Sel = document.selection.createRange();
								Sel.moveStart('character', -ctrl.value.length);
								CaretPos = Sel.text.length;
							}
							// Firefox support
							else if (ctrl.selectionStart || ctrl.selectionStart == '0') CaretPos = ctrl.selectionStart;
							return (CaretPos);
						},
						SetCaretPosition: function (ctrl, pos) {
							if (ctrl.setSelectionRange) {
								ctrl.focus();
								ctrl.setSelectionRange(pos, pos);
							} else if (ctrl.createTextRange) {
								var range = ctrl.createTextRange();
								range.collapse(true);
								range.moveEnd('character', pos);
								range.moveStart('character', pos);
								range.select();
							}
						},
						onKey: function (ev) {
							var s = String.fromCharCode(ev.keyCode);
							var MRH = window.MrHIDE.main.getInstance();

							// ALT+
							if (ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.shiftKey) {
								// log("Alt+" + s);

								switch (s) {
								case "Z":
									// coords by popup window
									var inputField = document.querySelector('input:focus, textarea:focus');
									if (inputField != null) {
										this.Coords = prompt("Place coordinates. Ex. 800:800", "");
										if (Coords != null) {
											var position = MRH.GetCaretPosition(inputField);
											var txt = inputField.value;
											var insert = "[coords]" + this.Coords + "[/coords]";
											inputField.value = txt.substring(0, position) + insert + txt.substring(position, txt.length);
											MRH.SetCaretPosition(inputField, position + insert.length);
										}
									}
									break;
								case "X":
									// coords by moving mouse OVER map coordinates
									var inputField = document.querySelector('input:focus, textarea:focus');
									if (inputField != null) {
										if (this.Coords != null) {
											var position = MRH.GetCaretPosition(inputField);
											var txt = inputField.value;
											var insert = "[coords]" + this.Coords + "[/coords]";
											inputField.value = txt.substring(0, position) + insert + txt.substring(position, txt.length);
											MRH.SetCaretPosition(inputField, position + insert.length);
										}
									}
									break;
								case "S":
									// coords by inserting [coords][/coords]
									var inputField = document.querySelector('input:focus, textarea:focus');
									if (inputField != null) {
										var position = MRH.GetCaretPosition(inputField);
										var txt = inputField.value;
										var insert = "[coords][/coords]";
										inputField.value = txt.substring(0, position) + insert + txt.substring(position, txt.length);
										MRH.SetCaretPosition(inputField, position + ("[coords]").length);
									}
									break;
								default:
									// Other letters
									log("Other letter (" + s + ")");
								}
							}
						},
						onMouseOver: function (ev) {					
							var tag = ev.target.tagName;
							if (tag == "B" || tag == "DIV" || tag == "A") {
								var s = ev.target.textContent;
								var semicolon = s.indexOf(":");
								if (semicolon > 0) {
									var n1 = s.substring(0, semicolon);
									var n2 = s.substring(semicolon + 1, s.lenght);
									if (isFinite(n1) && isFinite(n2)) {
                                                                                if(s.length==5 && s[0]=="0") return;
										Coords = s;
										ClientLib.Vis.VisMain.GetInstance().PlayUISound('sounds/CollectTiberium');
									}
								}
							}
						},
					} // members
				});
			}

			// Loading
			function TACoords_checkIfLoaded() {
				try {
					if (typeof qx != 'undefined') {
						ap = qx.core.Init.getApplication();
						mb = qx.core.Init.getApplication().getMenuBar();
						if (ap && mb) {
							createInstance();
							window.MrHIDE.main.getInstance().initialize();
						} else window.setTimeout(TACoords_checkIfLoaded, 1000);
					} else {
						window.setTimeout(TACoords_checkIfLoaded, 1000);
					}
				} catch (e) {
					if (typeof console != 'undefined') console.log(e);
					else if (window.opera) opera.postError(e);
					else GM_log(e);
				}
			}
			if (/commandandconquer\.com/i.test(document.domain)) {
				window.setTimeout(TACoords_checkIfLoaded, 1000);
			}
		}
		// Injecting
	if (window.location.pathname != ("/login/auth")) {
		var TACScript = document.createElement("script");
		TACScript.innerHTML = "(" + TACoordsMain.toString() + ")();";
		TACScript.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(TACScript);
		}
	}
})();Ini();

/*****************************************
Maelstorm Tools
*****************************************/

(function () {
  var MaelstromTools_main = function () {
    try {
      function CCTAWrapperIsInstalled() {
        return (typeof (CCTAWrapper_IsInstalled) != 'undefined' && CCTAWrapper_IsInstalled);
      }

      function createMaelstromTools() {
        console.log('MaelstromTools loaded');

        qx.Class.define("MaelstromTools.Language", {
          type: "singleton",
          extend: qx.core.Object,
          construct: function (language) {
            this.Languages = ['de', 'pt', 'fr', 'tr']; // en is default, not needed in here!
            if (language != null) {
              this.MyLanguage = language;
            }
          },
          members: {
            MyLanguage: "en",
            Languages: null,
            Data: null,

            loadData: function (language) {
              var l = this.Languages.indexOf(language);

              if (l < 0) {
                this.Data = null;
                return;
              }

              this.Data = new Object();
              this.Data["Collect all packages"] = ["Alle Pakete einsammeln", "Recolher todos os pacotes", "Récupérez tous les paquets", "Tüm paketleri topla"][l];
              this.Data["Overall production"] = ["Produktionsübersicht", "Produção global", "La production globale", "Genel üretim"][l];
              this.Data["Army overview"] = ["Truppenübersicht", "Vista Geral de Exército", "Armée aperçu", "Ordu önizlemesi"][l];
              this.Data["Base resources"] = ["Basis Ressourcen", "Recursos base", "ressources de base", "Üs önizlemesi"][l];
              this.Data["Main menu"] = ["Hauptmenü", "Menu Principal", "menu principal", "Ana menü"][l];
              this.Data["Repair all units"] = ["Alle Einheiten reparieren", "Reparar todas as unidades", "Réparer toutes les unités", "Tüm üniteleri onar"][l];
              this.Data["Repair all defense buildings"] = ["Alle Verteidigungsgebäude reparieren", "Reparar todos os edifícios de defesa", "Réparer tous les bâtiments de défense", "Tüm savunma binalarini onar"][l];
              this.Data["Repair all buildings"] = ["Alle Gebäurde reparieren", "Reparar todos os edifícios", "Réparer tous les bâtiments", "Tüm binalari onar"][l];
              this.Data["Base status overview"] = ["Basisübersicht", "Estado geral da base", "aperçu de l'état de base", "Üs durumu önizlemesi"][l];
              this.Data["Upgrade priority overview"] = ["Upgrade Übersicht", "Prioridade de upgrades", "aperçu des priorités de mise à niveau", "Yükseltme önceligi önizlemesi"][l];
              this.Data["MaelstromTools Preferences"] = ["MaelstromTools Einstellungen", "Preferências de MaelstromTools", "Préférences MaelstromTools", "MaelstromTools Ayarlari"][l];
              this.Data["Options"] = ["Einstellungen", "Opções", "Options", "Seçenekler"][l];
              this.Data["Target out of range, no resource calculation possible"] = ["Ziel nicht in Reichweite, kann die plünderbaren Ressourcen nicht berechnen", "Alvo fora do alcance, não é possivel calcular os recursos", "Cible hors de portée, pas de calcul de ressources possible",
			  "Hedef menzil disinda, kaynak hesaplamasi olanaksiz"][l];
              this.Data["Lootable resources"] = ["Plünderbare Ressourcen", "Recursos roubáveis", "Ressources à piller", "Yagmalanabilir kaynaklar"][l];
              this.Data["per CP"] = ["pro KP", "por PC", "par PC", "KP basina"][l];
              this.Data["2nd run"] = ["2. Angriff", "2º ataque", "2° attaque", "2. saldiri"][l];
              this.Data["3rd run"] = ["3. Angriff", "3º ataque", "3° attaque", "3. saldiri"][l];
              this.Data["Calculating resources..."] = ["Berechne plünderbare Ressourcen...", "A calcular recursos...", "calcul de ressources ...", "Kaynaklar hesaplaniyor..."][l];
              this.Data["Next MCV"] = ["MBF", "MCV", "VCM"][l];
              this.Data["Show time to next MCV"] = ["Zeige Zeit bis zum nächsten MBF", "Mostrar tempo restante até ao próximo MCV", "Afficher l'heure pour le prochain VCM ", "Sirdaki MCV için gereken süreyi göster"][l];
              this.Data["Show lootable resources (restart required)"] = ["Zeige plünderbare Ressourcen (Neustart nötig)", "Mostrar recursos roubáveis (é necessário reiniciar)", "Afficher les ressources fouiller (redémarrage nécessaire)", "Yagmalanabilir kaynaklari göster (yeniden baslatma gerekli)"][l];
              this.Data["Use dedicated Main Menu (restart required)"] = ["Verwende extra Hauptmenü (Neustart nötig)", "Usar botão para o Menu Principal (é necessário reiniciar)", "Utiliser dédiée du menu principal (redémarrage nécessaire)", "Ana menü tusunu kullan (yeniden baslatma gerekli)"][l];
              this.Data["Autocollect packages"] = ["Sammle Pakete automatisch", "Auto recolher pacotes", "paquets autocollecté", "Paketleri otomatik topla"][l];
              this.Data["Autorepair units"] = ["Repariere Einheiten automatisch", "Auto reparar o exército", "unités autoréparé", "Üniteleri otomatik onar"][l];
              this.Data["Autorepair defense (higher prio than buildings)"] = ["Repariere Verteidigung automatisch (höhere Prio als Gebäude)", "Auto reparar defesa (maior prioridade do que os edifícios)", "réparation automatique la défense (priorité plus élevé que les bâtiments) ", "Savunmayi otomatik onar (binalardan daha yüksek öncelikli olarak)"][l];
              this.Data["Autorepair buildings"] = ["Repariere Gebäude automatisch", "Auto reparar edifícios", "bâtiments autoréparé", "Binalari otomatik onar"][l];
              this.Data["Automatic interval in minutes"] = ["Auto-Intervall in Minuten", "Intervalo de tempo automático (em minutos)", "intervalle automatique en quelques minutes", "Otomatik toplama araligi (dk)"][l];
              this.Data["Apply changes"] = ["Speichern", "Confirmar", "Appliquer changements", "Uygula"][l];
              this.Data["Discard changes"] = ["Abbrechen", "Cancelar", "Annuler changements", "Iptal"][l];
              this.Data["Reset to default"] = ["Auf Standard zurücksetzen", "Definições padrão", "Réinitialiser", "Sifirla"][l];
              this.Data["Continuous"] = ["Kontinuierlich", "Contínua", "continue", "Sürekli"][l];
              this.Data["Bonus"] = ["Pakete", "Bónus", "Bonus", "Bonus"][l];
              this.Data["POI"] = ["POI", "POI", "POI", "POI"][l];
              this.Data["Total / h"] = ["Gesamt / h", "Total / h", "Total / h", "Toplam / sa."][l];
              this.Data["Repaircharges"] = ["Reparaturzeiten", "Custo de reparação", "frais de réparation", "Onarim maliyeti"][l];
              this.Data["Repairtime"] = ["Max. verfügbar", "Tempo de reparação", "Temps de réparation", "Onarim süresi"][l];
              this.Data["Attacks"] = ["Angriffe", "Ataques", "Attaques", "Saldirilar"][l];
              this.Data[MaelstromTools.Statics.Infantry] = ["Infanterie", "Infantaria", "Infanterie", "Piyade"][l];
              this.Data[MaelstromTools.Statics.Vehicle] = ["Fahrzeuge", "Veículos", "Vehicule", "Motorlu B."][l];
              this.Data[MaelstromTools.Statics.Aircraft] = ["Flugzeuge", "Aeronaves", "Aviation", "Hava A."][l];
              this.Data[MaelstromTools.Statics.Tiberium] = ["Tiberium", "Tibério", "Tiberium", "Tiberium"][l];
              this.Data[MaelstromTools.Statics.Crystal] = ["Kristalle", "Cristal", "Cristal", "Kristal"][l];
              this.Data[MaelstromTools.Statics.Power] = ["Strom", "Potência", "Energie", "Güç"][l];
              this.Data[MaelstromTools.Statics.Dollar] = ["Credits", "Créditos", "Crédit", "Kredi"][l];
              this.Data[MaelstromTools.Statics.Research] = ["Forschung", "Investigação", "Recherche", "Arastirma"][l];
              this.Data["Base"] = ["Basis", "Base", "Base", "Üs"][l];
              this.Data["Defense"] = ["Verteidigung", "Defesa", "Défense", "Savunma"][l];
              this.Data["Army"] = ["Armee", "Exército", "Armée", "Ordu"][l];
              this.Data["Level"] = ["Stufe", "Nível", "Niveau", "Seviye"][l];
              this.Data["Buildings"] = ["Gebäude", "Edifícios", "Bâtiments", "Binalar"][l];
              this.Data["Health"] = ["Leben", "Vida", "Santé", "Saglik"][l];
              this.Data["Units"] = ["Einheiten", "Unidades", "Unités", "Üniteler"][l];
              this.Data["Hide Mission Tracker"] = ["Missionsfenster ausblenden", "Esconder janela das Missões", "Cacher la fenêtre de mission", "Görev Izleyicisini Gizle"][l];
              this.Data["none"] = ["keine", "nenhum", "aucun", "hiçbiri"][l];
              this.Data["Cooldown"] = ["Cooldown", "Relocalização", "Recharge", "Cooldown"][l];
              this.Data["Protection"] = ["Geschützt bis", "Protecção", "Protection", "Koruma"][l];
              this.Data["Available weapon"] = ["Verfügbare Artillerie", "Apoio disponível", "arme disponible", "Mevcut silah"][l];
              this.Data["Calibrated on"] = ["Kalibriert auf", "Calibrado em", "Calibré sur ", "Kalibreli"][l];
              this.Data["Total resources"] = ["Gesamt", "Total de recursos", "Ressources totales", "Toplam kaynaklar"][l];
              this.Data["Max. storage"] = ["Max. Kapazität", "Armazenamento Máx.", "Max. de stockage", "Maks. Depo"][l];
              this.Data["Storage full!"] = ["Lager voll!", "Armazenamento cheio!", "Stockage plein", "Depo dolu!"][l];
              this.Data["Storage"] = ["Lagerstand", "Armazenamento", "Stockage", "Depo"][l];
              this.Data["display only top buildings"] = ["Nur Top-Gebäude anzeigen", "Mostrar apenas melhores edifícios", "afficher uniquement les bâtiments principaux", "yalnizca en iyi binalari göster"][l];
              this.Data["display only affordable buildings"] = ["Nur einsetzbare Gebäude anzeigen", "Mostrar apenas edíficios acessíveis", "afficher uniquement les bâtiments abordables", "yalnizca satin alinabilir binalari göster"][l];
              this.Data["City"] = ["Stadt", "Base", "Base", "Sehir"][l];
              this.Data["Type (coord)"] = ["Typ (Koord.)", "Escrever (coord)", "Type (coord)", "Tip (koord.)"][l];
              this.Data["to Level"] = ["Auf Stufe", "para nível", "à Niveau ", "Seviye için"][l];
              this.Data["Gain/h"] = ["Zuwachs/h", "Melhoria/h", "Gain / h", "Kazanç / sa."][l];
              this.Data["Factor"] = ["Faktor", "Factor", "Facteur", "Faktör"][l];
              this.Data["Tib/gain"] = ["Tib./Zuwachs", "Tib/melhoria", "Tib / gain", "Tib/Kazanç"][l];
              this.Data["Pow/gain"] = ["Strom/Zuwachs", "Potencia/melhoria", "Puissance / Gain", "Güç/Kazanç"][l];
              this.Data["ETA"] = ["Verfügbar in", "Tempo restante", "Temps restant", "Kalan Zaman"][l];
              this.Data["Upgrade"] = ["Aufrüsten", "Upgrade", "Upgrade", "Yükselt"][l];
              this.Data["Powerplant"] = ["Kratfwerk", "Central de Energia", "Centrale", "Güç Santrali"][l];
              this.Data["Refinery"] = ["Raffinerie", "Refinaria", "Raffinerie", "Rafineri"][l];
              this.Data["Harvester"] = ["Sammler", "Harvester", "Collecteur", "Biçerdöver"][l];
              this.Data["Silo"] = ["Silo", "Silo", "Silo", "Silo"][l];
              this.Data["Accumulator"] = ["Akkumulator", "Acumulador", "Accumulateur", "Akümülatör"][l];
              this.Data["Calibrate support"] = ["Artillerie kalibrieren", "Calibrar apoio", "Calibrer soutien", "Takviyeyi kalibre et"][l];
              this.Data["Access"] = ["Öffne", "Aceder", "Accès ", "Aç"][l];
              this.Data["Focus on"] = ["Zentriere auf", "Concentrar em", "Centré sur", "Odaklan"][l];
              this.Data["Possible attacks from this base (available CP)"] = ["Mögliche Angriffe (verfügbare KP)", "Possible attacks from this base (available CP)","Possible attacks from this base (available CP)", "Bu üsten yapilmasi mümkün olan saldirilar (mevcut KP)"][l];
              //this.Data[""] = [""][l];
            },
            get: function (ident) {
              return this.gt(ident);
            },
            gt: function (ident) {
              if (!this.Data || !this.Data[ident]) {
                /*if(!parseInt(ident.substr(0, 1), 10) && ident != "0") {
                  console.log("missing language data: " + ident);
                }*/
                return ident;
              }
              return this.Data[ident];
            }
          }
        }),

        // define Base
        qx.Class.define("MaelstromTools.Base", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            /* Desktop */
            timerInterval: 1500,
            mainTimerInterval: 5000,
            lootStatusInfoInterval: null,
            images: null,
            mWindows: null,
            mainMenuWindow: null,

            itemsOnDesktop: null,
            itemsOnDesktopCount: null,
            itemsInMainMenu: null,
            itemsInMainMenuCount: null,
            buttonCollectAllResources: null,
            buttonRepairAllUnits: null,
            buttonRepairAllBuildings: null,

            lootWidget: null,

            initialize: function () {
              try {
                //console.log(qx.locale.Manager.getInstance().getLocale());
                Lang.loadData(qx.locale.Manager.getInstance().getLocale());
                //console.log("Client version: " + MaelstromTools.Wrapper.GetClientVersion());
                this.itemsOnDesktopCount = new Array();
                this.itemsOnDesktop = new Object();
                this.itemsInMainMenuCount = new Array();
                this.itemsInMainMenu = new Object();

                var fileManager = ClientLib.File.FileManager.GetInstance();
                //ui/icons/icon_mainui_defense_button
                //ui/icons/icon_mainui_base_button
                //ui/icons/icon_army_points
                //icon_def_army_points
                var factionText = ClientLib.Base.Util.GetFactionGuiPatchText();
                this.createNewImage(MaelstromTools.Statics.Tiberium, "ui/common/icn_res_tiberium.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Crystal, "ui/common/icn_res_chrystal.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Power, "ui/common/icn_res_power.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Dollar, "ui/common/icn_res_dollar.png", fileManager);
                this.createNewImage(MaelstromTools.Statics.Research, "ui/common/icn_res_research.png", fileManager);
                this.createNewImage("Sum", "ui/common/icn_build_slots.png", fileManager);
                this.createNewImage("AccessBase", "ui/" + factionText + "/icons/icon_mainui_enterbase.png", fileManager);
                this.createNewImage("FocusBase", "ui/" + factionText + "/icons/icon_mainui_focusbase.png", fileManager);
                this.createNewImage("Packages", "ui/" + factionText + "/icons/icon_collect_packages.png", fileManager);
                this.createNewImage("RepairAllUnits", "ui/" + factionText + "/icons/icon_army_points.png", fileManager);
                this.createNewImage("RepairAllBuildings", "ui/" + factionText + "/icons/icn_build_slots.png", fileManager);
                this.createNewImage("ResourceOverviewMenu", "ui/common/icn_res_chrystal.png", fileManager);
                this.createNewImage("ProductionMenu", "ui/" + factionText + "/icons/icn_build_slots.png", fileManager);
                this.createNewImage("RepairTimeMenu", "ui/" + factionText + "/icons/icon_repair_all_button.png", fileManager);
                this.createNewImage("Crosshair", "ui/icons/icon_support_tnk_white.png", fileManager);
                this.createNewImage("UpgradeBuilding", "ui/" + factionText + "/icons/icon_building_detail_upgrade.png", fileManager);

                this.createNewWindow("MainMenu", "R", 125, 140, 120, 100, "B");
                this.createNewWindow("Production", "L", 120, 60, 340, 140);
                this.createNewWindow("RepairTime", "L", 120, 60, 340, 140);
                this.createNewWindow("ResourceOverview", "L", 120, 60, 340, 140);
                this.createNewWindow("BaseStatusOverview", "L", 120, 60, 340, 140);
                this.createNewWindow("Preferences", "L", 120, 60, 440, 140);
                this.createNewWindow("UpgradePriority", "L", 120, 60, 870, 400);

                if (!this.mainMenuWindow) {
                  this.mainMenuWindow = new qx.ui.popup.Popup(new qx.ui.layout.Canvas()).set({
                    //backgroundColor: "#303030",
                    padding: 5,
                    paddingRight: 0
                  });
                  if (MT_Preferences.Settings.useDedicatedMainMenu) {
                    this.mainMenuWindow.setPlaceMethod("mouse");
                    this.mainMenuWindow.setPosition("top-left");
                  } else {
                    this.mainMenuWindow.setPlaceMethod("widget");
                    this.mainMenuWindow.setPosition("bottom-right");
                    this.mainMenuWindow.setAutoHide(false);
                    this.mainMenuWindow.setBackgroundColor("transparent");
                    this.mainMenuWindow.setShadow(null);
                    this.mainMenuWindow.setDecorator(new qx.ui.decoration.Background());
                  }
                }

                var desktopPositionModifier = 0;

                this.buttonCollectAllResources = this.createDesktopButton(Lang.gt("Collect all packages"), "Packages", true, this.desktopPosition(desktopPositionModifier));
                this.buttonCollectAllResources.addListener("execute", this.collectAllPackages, this);

                var openProductionWindowButton = this.createDesktopButton(Lang.gt("Overall production"), "ProductionMenu", false, this.desktopPosition(desktopPositionModifier));
                openProductionWindowButton.addListener("execute", function () {
                  window.MaelstromTools.Production.getInstance().openWindow("Production", Lang.gt("Overall production"));
                }, this);

                var openResourceOverviewWindowButton = this.createDesktopButton(Lang.gt("Base resources"), "ResourceOverviewMenu", false, this.desktopPosition(desktopPositionModifier));
                openResourceOverviewWindowButton.addListener("execute", function () {
                  window.MaelstromTools.ResourceOverview.getInstance().openWindow("ResourceOverview", Lang.gt("Base resources"));
                }, this);

                desktopPositionModifier++;
                var openMainMenuButton = this.createDesktopButton(Lang.gt("Main menu"), "ProductionMenu", false, this.desktopPosition(desktopPositionModifier));
                openMainMenuButton.addListener("click", function (e) {
                  this.mainMenuWindow.placeToMouse(e);
                  this.mainMenuWindow.show();
                }, this);

                this.buttonRepairAllUnits = this.createDesktopButton(Lang.gt("Repair all units"), "RepairAllUnits", true, this.desktopPosition(desktopPositionModifier));
                this.buttonRepairAllUnits.addListener("execute", this.repairAllUnits, this);

                this.buttonRepairAllBuildings = this.createDesktopButton(Lang.gt("Repair all buildings"), "RepairAllBuildings", true, this.desktopPosition(desktopPositionModifier));
                this.buttonRepairAllBuildings.addListener("execute", this.repairAllBuildings, this);

                var openRepairTimeWindowButton = this.createDesktopButton(Lang.gt("Army overview"), "RepairTimeMenu", false, this.desktopPosition(desktopPositionModifier));
                openRepairTimeWindowButton.addListener("execute", function () {
                  window.MaelstromTools.RepairTime.getInstance().openWindow("RepairTime", Lang.gt("Army overview"));
                }, this);

                var openBaseStatusOverview = this.createDesktopButton(Lang.gt("Base status overview"), "Crosshair", false, this.desktopPosition(desktopPositionModifier));
                openBaseStatusOverview.addListener("execute", function () {
                  window.MaelstromTools.BaseStatus.getInstance().openWindow("BaseStatusOverview", Lang.gt("Base status overview"));
                }, this);

                desktopPositionModifier++;
                var openHuffyUpgradeOverview = this.createDesktopButton(Lang.gt("Upgrade priority overview"), "UpgradeBuilding", false, this.desktopPosition(desktopPositionModifier));
                openHuffyUpgradeOverview.addListener("execute", function () {
                  window.HuffyTools.UpgradePriorityGUI.getInstance().openWindow("UpgradePriority", Lang.gt("Upgrade priority overview"));
                }, this);

                desktopPositionModifier++;
                var preferencesButton = new qx.ui.form.Button(Lang.gt("Options")).set({
                  appearance: "button-text-small",
                  width: 100,
                  minWidth: 100,
                  maxWidth: 100
                });
                preferencesButton.setUserData("desktopPosition", this.desktopPosition(desktopPositionModifier));
                preferencesButton.addListener("execute", function () {
                  window.MaelstromTools.Preferences.getInstance().openWindow("Preferences", Lang.gt("MaelstromTools Preferences"), true);
                }, this);

                if (MT_Preferences.Settings.useDedicatedMainMenu) {
                  this.addToDesktop("MainMenu", openMainMenuButton);
                }
                this.addToMainMenu("ResourceOverviewMenu", openResourceOverviewWindowButton);
                this.addToMainMenu("ProductionMenu", openProductionWindowButton);
                this.addToMainMenu("BaseStatusMenu", openBaseStatusOverview);
                this.addToMainMenu("RepairTimeMenu", openRepairTimeWindowButton);
                this.addToMainMenu("UpgradeBuilding", openHuffyUpgradeOverview);

                this.addToMainMenu("PreferencesMenu", preferencesButton);

                if (!MT_Preferences.Settings.useDedicatedMainMenu) {
                  this.mainMenuWindow.show();
                  var target = qx.core.Init.getApplication().getOptionsBar(); //getServerBar(); //qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_APPOINTMENTS);
                  this.mainMenuWindow.placeToWidget(target, true);
                }

                webfrontend.gui.chat.ChatWidget.recvbufsize = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.CHATHISTORYLENGTH, 64);
                this.runSecondlyTimer();
                this.runMainTimer();
                this.runAutoCollectTimer();
              } catch (e) {
                console.log("MaelstromTools.initialize: ", e);
              }
            },

            desktopPosition: function (modifier) {
              if (!modifier) modifier = 0;
              return modifier;
            },

            createDesktopButton: function (title, imageName, isNotification, desktopPosition) {
              try {
                if (!isNotification) {
                  isNotification = false;
                }
                if (!desktopPosition) {
                  desktopPosition = this.desktopPosition();
                }
                var desktopButton = new qx.ui.form.Button(null, this.images[imageName]).set({
                  toolTipText: title,
                  width: 50,
                  height: 40,
                  maxWidth: 50,
                  maxHeight: 40,
                  appearance: (isNotification ? "button-standard-nod" : "button-playarea-mode-frame"), //"button-standard-"+factionText), button-playarea-mode-red-frame
                  center: true
                });

                desktopButton.setUserData("isNotification", isNotification);
                desktopButton.setUserData("desktopPosition", desktopPosition);
                return desktopButton;
              } catch (e) {
                console.log("MaelstromTools.createDesktopButton: ", e);
              }
            },

            createNewImage: function (name, path, fileManager) {
              try {
                if (!this.images) {
                  this.images = new Object();
                }
                if (!fileManager) {
                  return;
                }

                this.images[name] = fileManager.GetPhysicalPath(path);
              } catch (e) {
                console.log("MaelstromTools.createNewImage: ", e);
              }
            },

            createNewWindow: function (name, align, x, y, w, h, alignV) {
              try {
                if (!this.mWindows) {
                  this.mWindows = new Object();
                }
                this.mWindows[name] = new Object();
                this.mWindows[name]["Align"] = align;
                this.mWindows[name]["AlignV"] = alignV;
                this.mWindows[name]["x"] = x;
                this.mWindows[name]["y"] = y;
                this.mWindows[name]["w"] = w;
                this.mWindows[name]["h"] = h;
              } catch (e) {
                console.log("MaelstromTools.createNewWindow: ", e);
              }
            },

            addToMainMenu: function (name, button) {
              try {
                /*if(!this.useDedicatedMainMenu) {
                  return;
                }*/
                if (this.itemsInMainMenu[name] != null) {
                  return;
                }
                var desktopPosition = button.getUserData("desktopPosition");
                var isNotification = button.getUserData("isNotification");
                if (!desktopPosition) {
                  desktopPosition = this.desktopPosition();
                }
                if (!isNotification) {
                  isNotification = false;
                }

                if (isNotification && MT_Preferences.Settings.useDedicatedMainMenu) {
                  this.addToDesktop(name, button);
                } else {
                  if (!this.itemsInMainMenuCount[desktopPosition]) {
                    this.itemsInMainMenuCount[desktopPosition] = 0;
                  }
                  this.mainMenuWindow.add(button, {
                    right: 5 + (52 * this.itemsInMainMenuCount[desktopPosition]),
                    top: 0 + (42 * (desktopPosition)) //bottom: 0 - (42 * (desktopPosition - 1))
                  });

                  this.itemsInMainMenu[name] = button;
                  this.itemsInMainMenuCount[desktopPosition]++;
                }
              } catch (e) {
                console.log("MaelstromTools.addToMainMenu: ", e);
              }
            },

            removeFromMainMenu: function (name, rearrange) {
              try {
                if (rearrange == null) {
                  rearrange = true;
                }
                if (this.itemsOnDesktop[name] != null) {
                  var isNotification = this.itemsOnDesktop[name].getUserData("isNotification");
                  if (!isNotification) {
                    isNotification = false;
                  }
                  if (isNotification && MT_Preferences.Settings.useDedicatedMainMenu) {
                    this.removeFromDesktop(name, rearrange);
                  }
                } else if (this.itemsInMainMenu[name] != null) {
                  var desktopPosition = this.itemsInMainMenu[name].getUserData("desktopPosition");
                  var isNotification = this.itemsInMainMenu[name].getUserData("isNotification");
                  if (!desktopPosition) {
                    desktopPosition = this.desktopPosition();
                  }
                  if (!isNotification) {
                    isNotification = false;
                  }

                  this.mainMenuWindow.remove(this.itemsInMainMenu[name]);
                  this.itemsInMainMenu[name] = null;
                  this.itemsInMainMenuCount[desktopPosition]--;

                  if (rearrange && this.itemsInMainMenu[desktopPosition] > 1) {
                    var tmpItems = new Object();
                    // remove notifications 
                    for (var itemName in this.itemsOnDesktop) {
                      if (this.itemsInMainMenu[itemName] == null) {
                        continue;
                      }
                      if (!isNotification) {
                        continue;
                      }
                      tmpItems[itemName] = this.itemsInMainMenu[itemName];
                      this.removeFromMainMenu(itemName, false);
                    }
                    // rearrange notifications
                    for (var itemName2 in tmpItems) {
                      var tmp = tmpItems[itemName2];
                      if (tmp == null) {
                        continue;
                      }
                      this.addToMainMenu(itemName2, tmp);
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.removeFromDesktop: ", e);
              }
            },

            addToDesktop: function (name, button) {
              try {
                if (this.itemsOnDesktop[name] != null) {
                  return;
                }
                var desktopPosition = button.getUserData("desktopPosition");
                if (!desktopPosition) {
                  desktopPosition = this.desktopPosition();
                }

                if (!this.itemsOnDesktopCount[desktopPosition]) {
                  this.itemsOnDesktopCount[desktopPosition] = 0;
                }

                var app = qx.core.Init.getApplication();
                //var navBar = app.getNavigationBar();

                // console.log("add to Desktop at pos: " + this.itemsOnDesktopCount);
                app.getDesktop().add(button, {
                  //right: navBar.getBounds().width + (52 * this.itemsOnDesktopCount[desktopPosition]),
                  //top: 42 * (desktopPosition - 1)
                  right: 5 + (52 * this.itemsOnDesktopCount[desktopPosition]),
                  //top: this.initialAppointmentBarHeight + 125 + (42 * (desktopPosition - 1))
                  bottom: 140 - (42 * (desktopPosition - 1))
                });

                this.itemsOnDesktop[name] = button;
                this.itemsOnDesktopCount[desktopPosition]++;
              } catch (e) {
                console.log("MaelstromTools.addToDesktop: ", e);
              }
            },

            removeFromDesktop: function (name, rearrange) {
              try {
                if (rearrange == null) {
                  rearrange = true;
                }
                var app = qx.core.Init.getApplication();

                if (this.itemsOnDesktop[name] != null) {
                  var desktopPosition = this.itemsOnDesktop[name].getUserData("desktopPosition");
                  var isNotification = this.itemsOnDesktop[name].getUserData("isNotification");
                  if (!desktopPosition) {
                    desktopPosition = this.desktopPosition();
                  }
                  if (!isNotification) {
                    isNotification = false;
                  }

                  app.getDesktop().remove(this.itemsOnDesktop[name]);
                  this.itemsOnDesktop[name] = null;
                  this.itemsOnDesktopCount[desktopPosition]--;

                  if (rearrange && this.itemsOnDesktopCount[desktopPosition] > 1) {
                    var tmpItems = new Object();
                    // remove notifications 
                    for (var itemName in this.itemsOnDesktop) {
                      if (this.itemsOnDesktop[itemName] == null) {
                        continue;
                      }
                      if (!this.itemsOnDesktop[itemName].getUserData("isNotification")) {
                        continue;
                      }
                      tmpItems[itemName] = this.itemsOnDesktop[itemName];
                      this.removeFromDesktop(itemName, false);
                    }
                    // rearrange notifications
                    for (var itemName2 in tmpItems) {
                      var tmp = tmpItems[itemName2];
                      if (tmp == null) {
                        continue;
                      }
                      this.addToMainMenu(itemName2, tmp);
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.removeFromDesktop: ", e);
              }
            },

            runSecondlyTimer: function () {
              try {
                this.calculateCostsForNextMCV();

                var self = this;
                window.setTimeout(function () {
                  self.runSecondlyTimer();
                }, 1000);
              } catch (e) {
                console.log("MaelstromTools.runSecondlyTimer: ", e);
              }
            },

            runMainTimer: function () {
              try {
                this.checkForPackages();
                if (CCTAWrapperIsInstalled()) {
                  this.checkRepairAllUnits();
                  this.checkRepairAllBuildings();
                }

                if (MT_Preferences.Settings.autoHideMissionTracker) {
                  var missionTracker = typeof (qx.core.Init.getApplication().getMissionsBar) === 'function' ? qx.core.Init.getApplication().getMissionsBar() : qx.core.Init.getApplication().getMissionTracker(); //fix for PerforceChangelist>=376877
                  if (missionTracker.isVisible()) {
                    missionTracker.hide();
                  }
                  if (typeof (qx.core.Init.getApplication().getMissionsBar) === 'function') {
                    if (qx.core.Init.getApplication().getMissionsBar().getSizeHint().height != 0) {
                      qx.core.Init.getApplication().getMissionsBar().getSizeHint().height = 0;
                      qx.core.Init.getApplication().triggerDesktopResize();
                    }
                  }
                } else {
                  var missionTracker = typeof (qx.core.Init.getApplication().getMissionsBar) === 'function' ? qx.core.Init.getApplication().getMissionsBar() : qx.core.Init.getApplication().getMissionTracker(); //fix for PerforceChangelist>=376877
                  if (!missionTracker.isVisible()) {
                    missionTracker.show();
                    if (typeof (qx.core.Init.getApplication().getMissionsBar) === 'function') {
                      qx.core.Init.getApplication().getMissionsBar().initHeight();
                      qx.core.Init.getApplication().triggerDesktopResize();
                    }
                  }
                }
                var self = this;
                window.setTimeout(function () {
                  self.runMainTimer();
                }, this.mainTimerInterval);
              } catch (e) {
                console.log("MaelstromTools.runMainTimer: ", e);
              }
            },

            runAutoCollectTimer: function () {
              try {
                // console.log("autocollect " + MT_Preferences.Settings.AutoCollectTimer);
                if (!CCTAWrapperIsInstalled()) return; // run timer only then wrapper is running
                if (this.checkForPackages() && MT_Preferences.Settings.autoCollectPackages) {
                  this.collectAllPackages();
                }
                if (this.checkRepairAllUnits() && MT_Preferences.Settings.autoRepairUnits) {
                  this.repairAllUnits();
                }
                if (this.checkRepairAllBuildings() && MT_Preferences.Settings.autoRepairBuildings) {
                  this.repairAllBuildings();
                }

                var self = this;
                window.setTimeout(function () {
                  self.runAutoCollectTimer();
                }, MT_Preferences.Settings.AutoCollectTimer * 60000);
              } catch (e) {
                console.log("MaelstromTools.runMainTimer: ", e);
              }
            },

            openWindow: function (windowObj, windowName, skipMoveWindow) {
              try {
                if (!windowObj.isVisible()) {
                  if (windowName == "MainMenu") {
                    windowObj.show();
                  } else {
                    if (!skipMoveWindow) {
                      this.moveWindow(windowObj, windowName);
                    }
                    windowObj.open();
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.openWindow: ", e);
              }
            },

            moveWindow: function (windowObj, windowName) {
              try {
                var x = this.mWindows[windowName]["x"];
                var y = this.mWindows[windowName]["y"];
                if (this.mWindows[windowName]["Align"] == "R") {
                  x = qx.bom.Viewport.getWidth(window) - this.mWindows[windowName]["x"];
                }
                if (this.mWindows[windowName]["AlignV"] == "B") {
                  y = qx.bom.Viewport.getHeight(window) - this.mWindows[windowName]["y"] - windowObj.height;
                }
                windowObj.moveTo(x, y);
                if (windowName != "MainMenu") {
                  windowObj.setHeight(this.mWindows[windowName]["h"]);
                  windowObj.setWidth(this.mWindows[windowName]["w"]);
                }
              } catch (e) {
                console.log("MaelstromTools.moveWindow: ", e);
              }
            },

            checkForPackages: function () {
              try {
                MT_Cache.updateCityCache();
                if (MT_Cache.CityCount <= 1) {
                  return false;
                }

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (ncity.get_CityBuildingsData().get_HasCollectableBuildings()) {
                    this.addToMainMenu("CollectAllResources", this.buttonCollectAllResources);
                    return true;
                  }
                }
                this.removeFromMainMenu("CollectAllResources");
                return false;
              } catch (e) {
                console.log("MaelstromTools.checkForPackages: ", e);
                return false;
              }
            },

            collectAllPackages: function () {
              try {
                MT_Cache.updateCityCache();
                if (MT_Cache.CityCount <= 1) {
                  return;
                }
                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (ncity.get_CityBuildingsData().get_HasCollectableBuildings()) {
                    ncity.CollectAllResources();
                  }
                }
                this.removeFromMainMenu("CollectAllResources");
              } catch (e) {
                console.log("MaelstromTools.collectAllPackages: ", e);
              }
            },

            checkRepairAll: function (visMode, buttonName, button) {
              try {
                MT_Cache.updateCityCache();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (MaelstromTools.Wrapper.CanRepairAll(ncity, visMode)) {
                    this.addToMainMenu(buttonName, button);
                    return true;
                  }
                }

                this.removeFromMainMenu(buttonName);
                return false;
              } catch (e) {
                console.log("MaelstromTools.checkRepairAll: ", e);
                return false;
              }
            },

            checkRepairAllUnits: function () {
              return this.checkRepairAll(ClientLib.Vis.Mode.ArmySetup, "RepairAllUnits", this.buttonRepairAllUnits);
            },
            checkRepairAllBuildings: function () {
              return this.checkRepairAll(ClientLib.Vis.Mode.City, "RepairAllBuildings", this.buttonRepairAllBuildings);
            },

            repairAll: function (visMode, buttonName) {
              try {
                MT_Cache.updateCityCache();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (MaelstromTools.Wrapper.CanRepairAll(ncity, visMode)) {
                    MaelstromTools.Wrapper.RepairAll(ncity, visMode);
                  }

                }
                this.removeFromMainMenu(buttonName);
              } catch (e) {
                console.log("MaelstromTools.repairAll: ", e);
              }
            },

            //ClientLib.Data.City.prototype.get_CityRepairData
            //ClientLib.Data.CityRepair.prototype.CanRepairAll
            //ClientLib.Data.CityRepair.prototype.RepairAll
            repairAllUnits: function () {
              try {
                this.repairAll(ClientLib.Vis.Mode.ArmySetup, "RepairAllUnits");
              } catch (e) {
                console.log("MaelstromTools.repairAllUnits: ", e);
              }
            },
            repairAllBuildings: function () {
              try {
                this.repairAll(ClientLib.Vis.Mode.City, "RepairAllBuildings");
              } catch (e) {
                console.log("MaelstromTools.repairAllBuildings: ", e);
              }
            },

            updateLoot: function (ident, visCity, widget) {
              try {
                clearInterval(this.lootStatusInfoInterval);
                if (!MT_Preferences.Settings.showLoot) {
                  if (this.lootWidget[ident]) {
                    this.lootWidget[ident].removeAll();
                  }
                  return;
                }

                var baseLoadState = MT_Cache.updateLoot(visCity);
                if (baseLoadState == -2) { // base already cached and base not changed
                  return;
                }

                if (!this.lootWidget) {
                  this.lootWidget = new Object();
                }
                if (!this.lootWidget[ident]) {
                  this.lootWidget[ident] = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                  this.lootWidget[ident].setTextColor("white");
                  widget.add(this.lootWidget[ident]);
                }
                var lootWidget = this.lootWidget[ident];

                var rowIdx = 1;
                var colIdx = 1;
                lootWidget.removeAll();
                switch (baseLoadState) {
                  case -1:
                    {
                      MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, "Target out of range, no resource calculation possible", null, null, 'bold', null);
                      break;
                    }
                  case 1:
                    {
                      var Resources = MT_Cache.SelectedBaseResources;
                      this.createResourceLabels(lootWidget, ++rowIdx, "Possible attacks from this base (available CP)", Resources, - 1);
                      this.createResourceLabels(lootWidget, ++rowIdx, "Lootable resources", Resources, 1);
                      this.createResourceLabels(lootWidget, ++rowIdx, "per CP", Resources, 1 * Resources.CPNeeded);
                      this.createResourceLabels(lootWidget, ++rowIdx, "2nd run", Resources, 2 * Resources.CPNeeded);
                      this.createResourceLabels(lootWidget, ++rowIdx, "3rd run", Resources, 3 * Resources.CPNeeded);
                      break;
                    }
                  default:
                    {
                      MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, "Calculating resources...", null, null, 'bold', null);
                      this.lootStatusInfoInterval = setInterval(function () {
                        MaelstromTools.Base.getInstance().updateLoot(ident, visCity, widget);
                      }, 100)
                      break;
                    }
                }
              } catch (e) {
                console.log("MaelstromTools.updateLoot: ", e);
              }
            },

            createResourceLabels: function (lootWidget, rowIdx, Label, Resources, Modifier) {
              var colIdx = 1;
              var font = (Modifier > 1 ? null : 'bold');

              if (Modifier == -1 && Resources.CPNeeded > 0) {
                Label = Lang.gt(Label) + ": " + Math.floor(ClientLib.Data.MainData.GetInstance().get_Player().GetCommandPointCount() / Resources.CPNeeded);
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, Label, null, 'left', font, null, 9);
                return;
              }
              colIdx = 1;
              if (Modifier > 0) {
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, Lang.gt(Label) + ":", null, null, font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Research));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Research] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Tiberium));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Tiberium] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Crystal));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Crystal] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage(MaelstromTools.Statics.Dollar));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources[MaelstromTools.Statics.Dollar] / Modifier), 50, 'right', font);
                MaelstromTools.Util.addImage(lootWidget, rowIdx, colIdx++, MaelstromTools.Util.getImage("Sum"));
                MaelstromTools.Util.addLabel(lootWidget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Resources["Total"] / Modifier), 50, 'right', font);
              }
            },

            mcvPopup: null,
            mcvPopupX : 0,
            mcvPopupY : 0,
            mcvTimerLabel: null,
            calculateCostsForNextMCV: function () {
              try {
                if (!MT_Preferences.Settings.showCostsForNextMCV) {
                  if (this.mcvPopup) {
                    this.mcvPopup.close();
                  }
                  return;
                }
                var player = ClientLib.Data.MainData.GetInstance().get_Player();
                var cw = player.get_Faction();
                var cj = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, cw);
                var cr = player.get_PlayerResearch();
                var cd = cr.GetResearchItemFomMdbId(cj);
                if (cd == null) {
                  if (this.mcvPopup) {
                    this.mcvPopup.close();
                  }
                  return;
                }

                if (!this.mcvPopup) {
                  this.mcvPopup = new qx.ui.window.Window("").set({
                    contentPadding : 0,
                    showMinimize : false,
                    showMaximize : false,
                    showClose : false,
                    resizable : false
                  });
                  this.mcvPopup.setLayout(new qx.ui.layout.VBox());
                  this.mcvPopup.addListener("move", function (e) {
                    var base = MaelstromTools.Base.getInstance();
                    var size = qx.core.Init.getApplication().getRoot().getBounds();
                    var value = size.width - e.getData().left;
                    base.mcvPopupX = value < 0 ? 150 : value;
                    value = size.height - e.getData().top;
                    base.mcvPopupY = value < 0 ? 70 : value;
                    MaelstromTools.LocalStorage.set("mcvPopup", {
                      x : base.mcvPopupX,
                      y : base.mcvPopupY
                    });
                  });
                  var font = qx.bom.Font.fromString('bold').set({
                    size: 20
                  });

                  this.mcvTimerLabel = new qx.ui.basic.Label().set({
                    font: font,
                    textColor: 'red',
                    width: 155,
                    textAlign: 'center',
                    marginBottom : 5
                  });
                  this.mcvPopup.add(this.mcvTimerLabel);
                  var serverBar = qx.core.Init.getApplication().getServerBar().getBounds();
                  var pos = MaelstromTools.LocalStorage.get("mcvPopup", {
                      x : serverBar.width + 150,
                      y : 70
                    });
                  this.mcvPopupX = pos.x;
                  this.mcvPopupY = pos.y;
                  this.mcvPopup.open();
                }
                var size = qx.core.Init.getApplication().getRoot().getBounds();
                this.mcvPopup.moveTo(size.width - this.mcvPopupX, size.height - this.mcvPopupY);

                var nextLevelInfo = cd.get_NextLevelInfo_Obj();
                var resourcesNeeded = new Array();
                for (var i in nextLevelInfo.rr) {
                  if (nextLevelInfo.rr[i].t > 0) {
                    resourcesNeeded[nextLevelInfo.rr[i].t] = nextLevelInfo.rr[i].c;
                  }
                }
                //var researchNeeded = resourcesNeeded[ClientLib.Base.EResourceType.ResearchPoints];
                //var currentResearchPoints = player.get_ResearchPoints();

                var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];
                var creditsResourceData = player.get_Credits();
                var creditGrowthPerHour = (creditsResourceData.Delta + creditsResourceData.ExtraBonusDelta) * ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                var creditTimeLeftInHours = (creditsNeeded - player.GetCreditsCount()) / creditGrowthPerHour;

                if (creditGrowthPerHour == 0 || creditTimeLeftInHours <= 0) {
                  if (this.mcvPopup) {
                    this.mcvPopup.close();
                  }
                  return;
                }

                this.mcvPopup.setCaption(Lang.gt("Next MCV") + " ($ " + MaelstromTools.Wrapper.FormatNumbersCompact(creditsNeeded) + ")");
                this.mcvTimerLabel.setValue(MaelstromTools.Wrapper.FormatTimespan(creditTimeLeftInHours * 60 * 60));

                if (!this.mcvPopup.isVisible()) {
                  this.mcvPopup.open();
                }
              } catch (e) {
                console.log("calculateCostsForNextMCV", e);
              }
            }
          }
        });

        // define Preferences
        qx.Class.define("MaelstromTools.Preferences", {
          type: "singleton",
          extend: qx.core.Object,

          statics: {
            USEDEDICATEDMAINMENU: "useDedicatedMainMenu",
            AUTOCOLLECTPACKAGES: "autoCollectPackages",
            AUTOREPAIRUNITS: "autoRepairUnits",
            AUTOREPAIRBUILDINGS: "autoRepairBuildings",
            AUTOHIDEMISSIONTRACKER: "autoHideMissionTracker",
            AUTOCOLLECTTIMER: "AutoCollectTimer",
            SHOWLOOT: "showLoot",
            SHOWCOSTSFORNEXTMCV: "showCostsForNextMCV",
            CHATHISTORYLENGTH: "ChatHistoryLength"
          },

          members: {
            Window: null,
            Widget: null,
            Settings: null,
            FormElements: null,

            readOptions: function () {
              try {
                if (!this.Settings) {
                  this.Settings = new Object();
                }

                /*
                if(MaelstromTools.LocalStorage.get("useDedicatedMainMenu") == null) {
                  if(qx.bom.Viewport.getWidth(window) > 1800) {
                    this.Settings["useDedicatedMainMenu"] = false;
                  }
                } else {
                  this.Settings["useDedicatedMainMenu"] = (MaelstromTools.LocalStorage.get("useDedicatedMainMenu", 1) == 1);
                }*/
                this.Settings[MaelstromTools.Preferences.USEDEDICATEDMAINMENU] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.USEDEDICATEDMAINMENU, 1) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOCOLLECTPACKAGES] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTPACKAGES, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOREPAIRUNITS, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOREPAIRBUILDINGS, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOCOLLECTTIMER] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTTIMER, 60);
                this.Settings[MaelstromTools.Preferences.SHOWLOOT] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.SHOWLOOT, 1) == 1);
                this.Settings[MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV, 1) == 1);
                this.Settings[MaelstromTools.Preferences.CHATHISTORYLENGTH] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.CHATHISTORYLENGTH, 64);

                if (!CCTAWrapperIsInstalled()) {
                  this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] = false;
                  this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] = false;
                  //this.Settings[MaelstromTools.Preferences.SHOWLOOT] = false;
                }
                //console.log(this.Settings);

              } catch (e) {
                console.log("MaelstromTools.Preferences.readOptions: ", e);
              }
            },

            openWindow: function (WindowName, WindowTitle) {
              try {
                if (!this.Window) {
                  //this.Window = new qx.ui.window.Window(WindowTitle).set({
                  this.Window = new webfrontend.gui.OverlayWindow().set({
                    autoHide: false,
                    title: WindowTitle,
                    minHeight: 350

                    //resizable: false,
                    //showMaximize:false,
                    //showMinimize:false,
                    //allowMaximize:false,
                    //allowMinimize:false,
                    //showStatusbar: false
                  });
                  this.Window.clientArea.setPadding(10);
                  this.Window.clientArea.setLayout(new qx.ui.layout.VBox(3));

                  this.Widget = new qx.ui.container.Composite(new qx.ui.layout.Grid().set({
                    spacingX: 5,
                    spacingY: 5
                  }));

                  //this.Widget.setTextColor("white");

                  this.Window.clientArea.add(this.Widget);
                }

                if (this.Window.isVisible()) {
                  this.Window.close();
                } else {
                  MT_Base.openWindow(this.Window, WindowName);
                  this.setWidgetLabels();
                }
              } catch (e) {
                console.log("MaelstromTools.Preferences.openWindow: ", e);
              }
            },

            addFormElement: function (name, element) {
              this.FormElements[name] = element;
            },

            setWidgetLabels: function () {
              try {
                this.readOptions();

                this.FormElements = new Object();
                this.Widget.removeAll();
                var rowIdx = 1;
                var colIdx = 1;

                var chkAutoHideMissionTracker = new qx.ui.form.CheckBox(Lang.gt("Hide Mission Tracker")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER] == 1
                });
                var chkUseDedicatedMainMenu = new qx.ui.form.CheckBox(Lang.gt("Use dedicated Main Menu (restart required)")).set({
                  value: this.Settings[MaelstromTools.Preferences.USEDEDICATEDMAINMENU] == 1
                });
                var chkShowLoot = new qx.ui.form.CheckBox(Lang.gt("Show lootable resources (restart required)")).set({
                  value: this.Settings[MaelstromTools.Preferences.SHOWLOOT] == 1/*,
                  enabled: CCTAWrapperIsInstalled()*/
                });
                var chkCostsNextMCV = new qx.ui.form.CheckBox(Lang.gt("Show time to next MCV")).set({
                  value: this.Settings[MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV] == 1
                });
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoHideMissionTracker, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkUseDedicatedMainMenu, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkShowLoot, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkCostsNextMCV, 2);

                var chkAutoCollectPackages = new qx.ui.form.CheckBox(Lang.gt("Autocollect packages")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOCOLLECTPACKAGES] == 1
                });
                var chkAutoRepairUnits = new qx.ui.form.CheckBox(Lang.gt("Autorepair units")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] == 1,
                  enabled: CCTAWrapperIsInstalled()
                });
                var chkAutoRepairBuildings = new qx.ui.form.CheckBox(Lang.gt("Autorepair buildings")).set({
                  value: this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] == 1,
                  enabled: CCTAWrapperIsInstalled()
                });

                var spinnerChatHistoryLength = new qx.ui.form.Spinner().set({
                  minimum: 64,
                  maximum: 512,
                  value: this.Settings[MaelstromTools.Preferences.CHATHISTORYLENGTH]
                });

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, Lang.gt("Chat history length") + " (" + spinnerChatHistoryLength.getMinimum() + " - " + spinnerChatHistoryLength.getMaximum() + ")");
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx + 1, spinnerChatHistoryLength);

                var spinnerAutoCollectTimer = new qx.ui.form.Spinner().set({
                  minimum: 5,
                  maximum: 60 * 6,
                  value: this.Settings[MaelstromTools.Preferences.AUTOCOLLECTTIMER]
                });

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, Lang.gt("Automatic interval in minutes") + " (" + spinnerAutoCollectTimer.getMinimum() + " - " + spinnerAutoCollectTimer.getMaximum() + ")");
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx + 1, spinnerAutoCollectTimer);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoCollectPackages, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoRepairUnits, 2);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, chkAutoRepairBuildings, 2);

                var applyButton = new qx.ui.form.Button(Lang.gt("Apply changes")).set({
                  appearance: "button-detailview-small",
                  width: 120,
                  minWidth: 120,
                  maxWidth: 120
                });
                applyButton.addListener("execute", this.applyChanges, this);

                var cancelButton = new qx.ui.form.Button(Lang.gt("Discard changes")).set({
                  appearance: "button-detailview-small",
                  width: 120,
                  minWidth: 120,
                  maxWidth: 120
                });
                cancelButton.addListener("execute", function () {
                  this.Window.close();
                }, this);

                var resetButton = new qx.ui.form.Button(Lang.gt("Reset to default")).set({
                  appearance: "button-detailview-small",
                  width: 120,
                  minWidth: 120,
                  maxWidth: 120
                });
                resetButton.addListener("execute", this.resetToDefault, this);

                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, resetButton);
                colIdx = 1;
                MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, cancelButton);
                MaelstromTools.Util.addElement(this.Widget, rowIdx++, colIdx, applyButton);

                this.addFormElement(MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER, chkAutoHideMissionTracker);
                this.addFormElement(MaelstromTools.Preferences.USEDEDICATEDMAINMENU, chkUseDedicatedMainMenu);
                this.addFormElement(MaelstromTools.Preferences.SHOWLOOT, chkShowLoot);
                this.addFormElement(MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV, chkCostsNextMCV);
                this.addFormElement(MaelstromTools.Preferences.AUTOCOLLECTPACKAGES, chkAutoCollectPackages);
                this.addFormElement(MaelstromTools.Preferences.AUTOREPAIRUNITS, chkAutoRepairUnits);
                this.addFormElement(MaelstromTools.Preferences.AUTOREPAIRBUILDINGS, chkAutoRepairBuildings);
                this.addFormElement(MaelstromTools.Preferences.AUTOCOLLECTTIMER, spinnerAutoCollectTimer);
                this.addFormElement(MaelstromTools.Preferences.CHATHISTORYLENGTH, spinnerChatHistoryLength);
              } catch (e) {
                console.log("MaelstromTools.Preferences.setWidgetLabels: ", e);
              }
            },

            applyChanges: function () {
              try {
                var autoRunNeeded = false;
                for (var idx in this.FormElements) {
                  var element = this.FormElements[idx];
                  if (idx == MaelstromTools.Preferences.AUTOCOLLECTTIMER) {
                    autoRunNeeded = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTTIMER, 0) != element.getValue());
                  }
                  if (idx == MaelstromTools.Preferences.CHATHISTORYLENGTH) {
                    webfrontend.gui.chat.ChatWidget.recvbufsize = element.getValue();
                  }
                  MaelstromTools.LocalStorage.set(idx, element.getValue());
                }
                this.readOptions();
                if (autoRunNeeded) {
                  MT_Base.runAutoCollectTimer();
                }
                this.Window.close();
              } catch (e) {
                console.log("MaelstromTools.Preferences.applyChanges: ", e);
              }
            },

            resetToDefault: function () {
              try {
                MaelstromTools.LocalStorage.clearAll();
                this.setWidgetLabels();
              } catch (e) {
                console.log("MaelstromTools.Preferences.resetToDefault: ", e);
              }
            }
          }
        });

        // define DefaultObject
        qx.Class.define("MaelstromTools.DefaultObject", {
          type: "abstract",
          extend: qx.core.Object,
          members: {
            Window: null,
            Widget: null,
            Cache: {}, //k null
            IsTimerEnabled: true,

            calc: function () {
              try {
                if (this.Window.isVisible()) {
                  this.updateCache();
                  this.setWidgetLabels();
                  if (this.IsTimerEnabled) {
                    var self = this;
                    window.setTimeout(function () {
                      self.calc();
                    }, MT_Base.timerInterval);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.DefaultObject.calc: ", e);
              }
            },

            openWindow: function (WindowName, WindowTitle) {
              try {
                if (!this.Window) {
                  this.Window = new qx.ui.window.Window(WindowTitle).set({
                    resizable: false,
                    showMaximize: false,
                    showMinimize: false,
                    allowMaximize: false,
                    allowMinimize: false,
                    showStatusbar: false
                  });
                  this.Window.setPadding(10);
                  this.Window.setLayout(new qx.ui.layout.VBox(3));

                  this.Widget = new qx.ui.container.Composite(new qx.ui.layout.Grid());
                  this.Widget.setTextColor("white");

                  this.Window.add(this.Widget);
                }

                if (this.Window.isVisible()) {
                  this.Window.close();
                } else {
                  MT_Base.openWindow(this.Window, WindowName);
                  this.calc();
                }
              } catch (e) {
                console.log("MaelstromTools.DefaultObject.openWindow: ", e);
              }
            }
          }
        });

        // define Production
        qx.Class.define("MaelstromTools.Production", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            updateCache: function (onlyForCity) {
              try {
                MT_Cache.updateCityCache();
                var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                //this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  if (onlyForCity != null && onlyForCity != cname) {
                    continue;
                  }
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (typeof (this.Cache[cname]) !== 'object') this.Cache[cname] = {};
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Tiberium]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Tiberium] = {}; // all have to be checked, 
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Crystal]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Crystal] = {}; // this.Cache[cname] can be created inside different namespaces
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Power]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Power] = {}; // like the RepairTime etc... without those objs
                  if (typeof (this.Cache[cname][MaelstromTools.Statics.Dollar]) !== 'object') this.Cache[cname][MaelstromTools.Statics.Dollar] = {};

                  this.Cache[cname]["ProductionStopped"] = ncity.get_IsGhostMode();
                  this.Cache[cname]["PackagesStopped"] = (ncity.get_hasCooldown() || ncity.get_IsGhostMode());
                  this.Cache[cname][MaelstromTools.Statics.Tiberium]["Delta"] = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false); // (production.d[ClientLib.Base.EResourceType.Tiberium]['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Tiberium]["ExtraBonusDelta"] = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium); //(production.d[ClientLib.Base.EResourceType.Tiberium]['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Tiberium]["POI"] = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium);
                  this.Cache[cname][MaelstromTools.Statics.Crystal]["Delta"] = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false); //(production.d[ClientLib.Base.EResourceType.Crystal]['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Crystal]["ExtraBonusDelta"] = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal); //(production.d[ClientLib.Base.EResourceType.Crystal]['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Crystal]["POI"] = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal);
                  this.Cache[cname][MaelstromTools.Statics.Power]["Delta"] = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false); //(production.d[ClientLib.Base.EResourceType.Power]['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Power]["ExtraBonusDelta"] = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power); // (production.d[ClientLib.Base.EResourceType.Power]['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Power]["POI"] = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
                  this.Cache[cname][MaelstromTools.Statics.Dollar]["Delta"] = ClientLib.Base.Resource.GetResourceGrowPerHour(ncity.get_CityCreditsProduction(), false); // (ncity.get_CityCreditsProduction()['Delta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Dollar]["ExtraBonusDelta"] = ClientLib.Base.Resource.GetResourceBonusGrowPerHour(ncity.get_CityCreditsProduction(), false); // (ncity.get_CityCreditsProduction()['ExtraBonusDelta'] * serverTime.get_StepsPerHour());
                  this.Cache[cname][MaelstromTools.Statics.Dollar]["POI"] = 0;
                  this.Cache[cname]["BaseLevel"] = MaelstromTools.Wrapper.GetBaseLevel(ncity);
                  if (onlyForCity != null && onlyForCity == cname) return this.Cache[cname];
                }
              } catch (e) {
                console.log("MaelstromTools.Production.updateCache: ", e);
              }
            },

            createProductionLabels2: function (rowIdx, colIdx, cityName, resourceType) {
              try {
                if (cityName == "-Total-") {
                  var Totals = Object();
                  Totals["Delta"] = 0;
                  Totals["ExtraBonusDelta"] = 0;
                  Totals["POI"] = 0;
                  Totals["Total"] = 0;

                  for (var cname in this.Cache) {
                    Totals["Delta"] += this.Cache[cname][resourceType]['Delta'];
                    Totals["ExtraBonusDelta"] += this.Cache[cname][resourceType]['ExtraBonusDelta'];
                    Totals["POI"] += this.Cache[cname][resourceType]['POI'];
                  }
                  Totals["Total"] = Totals['Delta'] + Totals['ExtraBonusDelta'] + Totals['POI'];

                  rowIdx++;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['Delta']), 80, 'right', 'bold');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['ExtraBonusDelta']), 80, 'right', 'bold');
                  if (resourceType != MaelstromTools.Statics.Dollar) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['POI']), 80, 'right', 'bold');
                  } else {
                    rowIdx++;
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(Totals['Total']), 80, 'right', 'bold');
                } else if (cityName == "-Labels-") {
                  MaelstromTools.Util.addImage(this.Widget, rowIdx++, colIdx, MaelstromTools.Util.getImage(resourceType));
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Continuous", 100, 'left');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Bonus", 100, 'left');
                  if (resourceType != MaelstromTools.Statics.Dollar) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "POI", 100, 'left');
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Total / BaseLevel", 100, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, "Total / h", 100, 'left');
                } else {
                  var cityCache = this.Cache[cityName];
                  if (rowIdx > 2) {
                    rowIdx++;
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['Delta']), 80, 'right', null, ((cityCache["ProductionStopped"] || cityCache[resourceType]['Delta'] == 0) ? "red" : "white"));
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['ExtraBonusDelta']), 80, 'right', null, ((cityCache["PackagesStopped"] || cityCache[resourceType]['ExtraBonusDelta'] == 0) ? "red" : "white"));
                  if (resourceType != MaelstromTools.Statics.Dollar) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['POI']), 80, 'right', null, (cityCache[resourceType]['POI'] == 0 ? "red" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact((cityCache[resourceType]['Delta'] + cityCache[resourceType]['ExtraBonusDelta'] + cityCache[resourceType]['POI']) / cityCache["BaseLevel"]), 80, 'right');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[resourceType]['Delta'] + cityCache[resourceType]['ExtraBonusDelta'] + cityCache[resourceType]['POI']), 80, 'right', 'bold');
                }
                return rowIdx;
              } catch (e) {
                console.log("MaelstromTools.Production.createProductionLabels2: ", e);
              }
            },

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();

                var rowIdx = 1;
                var colIdx = 1;

                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Tiberium);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Crystal);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Power);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Labels-", MaelstromTools.Statics.Dollar);

                colIdx++;
                for (var cityName in this.Cache) {
                  rowIdx = 1;
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx, cityName, 80, 'right');

                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Tiberium);
                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Crystal);
                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Power);
                  rowIdx = this.createProductionLabels2(rowIdx, colIdx, cityName, MaelstromTools.Statics.Dollar);

                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                }

                rowIdx = 1;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Total / h", 80, 'right', 'bold');

                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Tiberium);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Crystal);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Power);
                rowIdx = this.createProductionLabels2(rowIdx, colIdx, "-Total-", MaelstromTools.Statics.Dollar);
              } catch (e) {
                console.log("MaelstromTools.Production.setWidgetLabels: ", e);
              }
            }
          }
        });

        // define RepairTime
        qx.Class.define("MaelstromTools.RepairTime", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {

            updateCache: function () {
              try {
                MT_Cache.updateCityCache();
                this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  var RepLargest = '';

                  this.Cache[cname] = Object();
                  this.Cache[cname]["RepairTime"] = Object();
                  this.Cache[cname]["Repaircharge"] = Object();
                  this.Cache[cname]["Repaircharge"]["Smallest"] = 999999999;
                  this.Cache[cname]["RepairTime"]["Largest"] = 0;

                  this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry] = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
                  this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle] = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
                  this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft] = ncity.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
                  this.Cache[cname]["RepairTime"]["Maximum"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.RepairChargeInf);
                  this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Infantry] = ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);
                  this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Vehicle] = ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                  this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Aircraft] = ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);

                  if (this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Infantry] < this.Cache[cname]["Repaircharge"]["Smallest"]) {
                    this.Cache[cname]["Repaircharge"]["Smallest"] = this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Infantry];
                  }
                  if (this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Vehicle] < this.Cache[cname]["Repaircharge"]["Smallest"]) {
                    this.Cache[cname]["Repaircharge"]["Smallest"] = this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Vehicle];
                  }
                  if (this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Aircraft] < this.Cache[cname]["Repaircharge"]["Smallest"]) {
                    this.Cache[cname]["Repaircharge"]["Smallest"] = this.Cache[cname]["Repaircharge"][MaelstromTools.Statics.Aircraft];
                  }

                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry]
                    RepLargest = "Infantry"
                  }
                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle]
                    RepLargest = "Vehicle"
                  }
                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft]
                    RepLargest = "Aircraft"
                  }

                  //PossibleAttacks and MaxAttacks fixes
                  var offHealth = ncity.GetOffenseConditionInPercent();
                  if (RepLargest !== '') {
                    this.Cache[cname]["RepairTime"]["LargestDiv"] = this.Cache[cname]["RepairTime"][RepLargest]
                    var i = Math.ceil(this.Cache[cname]["Repaircharge"].Smallest / this.Cache[cname]["RepairTime"].LargestDiv); //fix
                    var j = this.Cache[cname]["Repaircharge"].Smallest / this.Cache[cname]["RepairTime"].LargestDiv;
                    if (offHealth !== 100) { i--; i += '*';} // Decrease number of attacks by 1 when unit unhealthy. Additional visual info: asterisk when units aren't healthy
                    this.Cache[cname]["RepairTime"]["PossibleAttacks"] = i;
                    var k = this.Cache[cname]["RepairTime"].Maximum / this.Cache[cname]["RepairTime"].LargestDiv;
                    this.Cache[cname]["RepairTime"]["MaxAttacks"] = Math.ceil(k); //fix
                  } else {
                    this.Cache[cname]["RepairTime"]["LargestDiv"] = 0;
                    this.Cache[cname]["RepairTime"]["PossibleAttacks"] = 0;
                    this.Cache[cname]["RepairTime"]["MaxAttacks"] = 0;
                  }

                  var unitsData = ncity.get_CityUnitsData();
                  this.Cache[cname]["Base"] = Object();
                  this.Cache[cname]["Base"]["Level"] = MaelstromTools.Wrapper.GetBaseLevel(ncity);
                  this.Cache[cname]["Base"]["UnitLimit"] = ncity.GetBuildingSlotLimit(); //ncity.GetNumBuildings();
                  this.Cache[cname]["Base"]["TotalHeadCount"] = ncity.GetBuildingSlotCount();
                  this.Cache[cname]["Base"]["FreeHeadCount"] = this.Cache[cname]["Base"]["UnitLimit"] - this.Cache[cname]["Base"]["TotalHeadCount"];
                  this.Cache[cname]["Base"]["HealthInPercent"] = ncity.GetBuildingsConditionInPercent();

                  this.Cache[cname]["Offense"] = Object();
                  this.Cache[cname]["Offense"]["Level"] = (Math.floor(ncity.get_LvlOffense() * 100) / 100).toFixed(2);
                  this.Cache[cname]["Offense"]["UnitLimit"] = unitsData.get_UnitLimitOffense();
                  this.Cache[cname]["Offense"]["TotalHeadCount"] = unitsData.get_TotalOffenseHeadCount();
                  this.Cache[cname]["Offense"]["FreeHeadCount"] = unitsData.get_FreeOffenseHeadCount();
                  this.Cache[cname]["Offense"]["HealthInPercent"] = offHealth > 0 ? offHealth : 0;

                  this.Cache[cname]["Defense"] = Object();
                  this.Cache[cname]["Defense"]["Level"] = (Math.floor(ncity.get_LvlDefense() * 100) / 100).toFixed(2);
                  this.Cache[cname]["Defense"]["UnitLimit"] = unitsData.get_UnitLimitDefense();
                  this.Cache[cname]["Defense"]["TotalHeadCount"] = unitsData.get_TotalDefenseHeadCount();
                  this.Cache[cname]["Defense"]["FreeHeadCount"] = unitsData.get_FreeDefenseHeadCount();
                  this.Cache[cname]["Defense"]["HealthInPercent"] = ncity.GetDefenseConditionInPercent() > 0 ? ncity.GetDefenseConditionInPercent() : 0;

                  //console.log(ncity.get_CityUnitsData().get_UnitLimitOffense() + " / " + ncity.get_CityUnitsData().get_TotalOffenseHeadCount() + " = " + ncity.get_CityUnitsData().get_FreeOffenseHeadCount());
                  //console.log(ncity.get_CityUnitsData().get_UnitLimitDefense() + " / " + ncity.get_CityUnitsData().get_TotalDefenseHeadCount() + " = " + ncity.get_CityUnitsData().get_FreeDefenseHeadCount());
                }
              } catch (e) {
                console.log("MaelstromTools.RepairTime.updateCache: ", e);
              }
            },

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();
                var rowIdx = 1;

                rowIdx = this.createOverviewLabels(rowIdx);
                rowIdx = this.createRepairchargeLabels(rowIdx);
              } catch (e) {
                console.log("MaelstromTools.RepairTime.setWidgetLabels: ", e);
              }
            },

            createRepairchargeLabels: function (rowIdx) {
              try {
                var colIdx = 2;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx++, colIdx++, "Repaircharges", null, 'left', null, null, 3);
                colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Statics.Infantry, 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Statics.Vehicle, 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Statics.Aircraft, 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Repairtime", 80, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Attacks", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Next at", 80, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Max+1 at", 80, 'right');

                rowIdx++;
                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  if (cityCache.Offense.UnitLimit == 0) {
                    continue;
                  }
                  colIdx = 1;
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 80, 'left');

                  // Skip bases with no armies
                  if (cityCache.Offense.UnitLimit > 0) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.RepairTime.Infantry), 60, 'right', null, (cityCache.RepairTime.Infantry == cityCache.RepairTime.LargestDiv ? "yellow" : "white"));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.RepairTime.Vehicle), 60, 'right', null, (cityCache.RepairTime.Vehicle == cityCache.RepairTime.LargestDiv ? "yellow" : "white"));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.RepairTime.Aircraft), 60, 'right', null, (cityCache.RepairTime.Aircraft == cityCache.RepairTime.LargestDiv ? "yellow" : "white"));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(cityCache.Repaircharge.Smallest), 80, 'right');
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.RepairTime.PossibleAttacks + " / " + cityCache.RepairTime.MaxAttacks, 60, 'right', null, (cityCache.Offense.HealthInPercent !== 100 ? 'red' : null)); // mark red when unhealthy
                    var i = cityCache.RepairTime.LargestDiv * cityCache.RepairTime.PossibleAttacks;
                    var j = cityCache.RepairTime.LargestDiv * cityCache.RepairTime.MaxAttacks;
                    (i>0) ? MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(i), 80, 'right', null, (i > cityCache.RepairTime.Maximum ? "yellow" : "white")) : colIdx++; /// yellow if more than Maximum RT
                    (j>0) ? MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatTimespan(j), 80, 'right') : colIdx++;
                  } else {
                    colIdx += 7;
                  }

                  colIdx += 4;
                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName, PerforceChangelist >= 376877 ? ClientLib.Data.PlayerAreaViewMode.pavmPlayerOffense : webfrontend.gui.PlayArea.PlayArea.modes.EMode_PlayerOffense));
                  rowIdx += 2;
                }

                return rowIdx;
              } catch (e) {
                console.log("MaelstromTools.RepairTime.createRepairchargeLabels: ", e);
              }
            },

            createOverviewLabels: function (rowIdx) {
              try {
                var colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Base", 60, 'right');
                colIdx += 3;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Defense", 60, 'right');
                colIdx += 3;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx, "Army", 60, 'right');

                rowIdx++;
                colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Level", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Buildings", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Health", 60, 'right');

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Level", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Buildings", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Health", 60, 'right');

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Level", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Units", 60, 'right');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Health", 60, 'right');

                rowIdx++;
                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  colIdx = 1;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 80, 'left');

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Base.Level, 60, 'right');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Base.TotalHeadCount + " / " + cityCache.Base.UnitLimit, 60, 'right', null, (cityCache.Base.FreeHeadCount >= 1 ? "red" : "white"));
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Base.HealthInPercent + "%", 60, 'right', null, (cityCache.Base.HealthInPercent < 25 ? "red" : (cityCache.Base.HealthInPercent < 100 ? "yellow" : "white")));

                  if (cityCache.Defense.UnitLimit > 0) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Defense.Level, 60, 'right');
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Defense.TotalHeadCount + " / " + cityCache.Defense.UnitLimit, 60, 'right', null, (cityCache.Defense.FreeHeadCount >= 5 ? "red" : (cityCache.Defense.FreeHeadCount >= 3 ? "yellow" : "white")));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Defense.HealthInPercent + "%", 60, 'right', null, (cityCache.Defense.HealthInPercent < 25 ? "red" : (cityCache.Defense.HealthInPercent < 100 ? "yellow" : "white")));
                  } else {
                    colIdx += 3;
                  }

                  // Skip bases with no armies
                  if (cityCache.Offense.UnitLimit > 0) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Offense.Level, 60, 'right');
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Offense.TotalHeadCount + " / " + cityCache.Offense.UnitLimit, 60, 'right', null, (cityCache.Offense.FreeHeadCount >= 10 ? "red" : (cityCache.Offense.FreeHeadCount >= 5 ? "yellow" : "white")));
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.Offense.HealthInPercent + "%", 60, 'right', null, (cityCache.Offense.HealthInPercent < 25 ? "red" : (cityCache.Offense.HealthInPercent < 100 ? "yellow" : "white")));
                  } else {
                    colIdx += 3;
                  }

                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  rowIdx += 2;
                }
                return rowIdx;
              } catch (e) {
                console.log("MaelstromTools.RepairTime.createOverviewLabels: ", e);
              }
            }

          }
        });

        // define ResourceOverview
        qx.Class.define("MaelstromTools.ResourceOverview", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            Table: null,
            Model: null,

            updateCache: function () {
              try {
                MT_Cache.updateCityCache();
                this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  var mtime = ClientLib.Data.MainData.GetInstance().get_Time();

                  this.Cache[cname] = Object();
                  this.Cache[cname][MaelstromTools.Statics.Tiberium] = ncity.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
                  this.Cache[cname][MaelstromTools.Statics.Tiberium + "Max"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium);
                  this.Cache[cname][MaelstromTools.Statics.Tiberium + "Full"] = mtime.GetJSStepTime(ncity.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Tiberium));
                  this.Cache[cname][MaelstromTools.Statics.Crystal] = ncity.GetResourceCount(ClientLib.Base.EResourceType.Crystal);
                  this.Cache[cname][MaelstromTools.Statics.Crystal + "Max"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal);
                  this.Cache[cname][MaelstromTools.Statics.Crystal + "Full"] = mtime.GetJSStepTime(ncity.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Crystal));
                  this.Cache[cname][MaelstromTools.Statics.Power] = ncity.GetResourceCount(ClientLib.Base.EResourceType.Power);
                  this.Cache[cname][MaelstromTools.Statics.Power + "Max"] = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power);
                  this.Cache[cname][MaelstromTools.Statics.Power + "Full"] = mtime.GetJSStepTime(ncity.GetResourceStorageFullStep(ClientLib.Base.EResourceType.Power));
                }

              } catch (e) {
                console.log("MaelstromTools.ResourceOverview.updateCache: ", e);
              }
            },

            setWidgetLabelsTable: function () {
              try {
                if (!this.Table) {
                  this.Widget.setLayout(new qx.ui.layout.HBox());

                  this.Model = new qx.ui.table.model.Simple();
                  this.Model.setColumns(["City", "Tib. Storage", "Tiberium", "Full", "Crystal", "Full", "Power", "Storage", "Full"]);
                  this.Table = new qx.ui.table.Table(this.Model);
                  this.Widget.add(this.Table, {
                    flex: 1
                  });
                }

                var Totals = Object();
                Totals[MaelstromTools.Statics.Tiberium] = 0;
                Totals[MaelstromTools.Statics.Crystal] = 0;
                Totals[MaelstromTools.Statics.Power] = 0;
                Totals[MaelstromTools.Statics.Tiberium + "Max"] = 0;
                Totals[MaelstromTools.Statics.Power + "Max"] = 0;

                var rowData = [];

                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];

                  Totals[MaelstromTools.Statics.Tiberium] += cityCache[MaelstromTools.Statics.Tiberium];
                  Totals[MaelstromTools.Statics.Crystal] += cityCache[MaelstromTools.Statics.Crystal];
                  Totals[MaelstromTools.Statics.Power] += cityCache[MaelstromTools.Statics.Power];
                  Totals[MaelstromTools.Statics.Tiberium + "Max"] += cityCache[MaelstromTools.Statics.Tiberium + 'Max'];
                  Totals[MaelstromTools.Statics.Power + "Max"] += cityCache[MaelstromTools.Statics.Power + 'Max'];

                  rowData.push([
                    cityName,
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium + 'Max']),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium]),
                    MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Tiberium + 'Full']),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Crystal]),
                    MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Crystal + 'Full']),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power]),
                    MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power + 'Max']),
                    MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Power + 'Full'])
                    ]);
                }
                rowData.push([
                  'Total resources',
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium + 'Max']),
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium]),
                  '',
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Crystal]),
                  '',
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power]),
                  MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power + 'Max']),
                  ''
                  ]);

                this.Model.setData(rowData);
              } catch (e) {
                console.log("MaelstromTools.ResourceOverview.setWidgetLabels: ", e);
              }
            },

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();

                var first = true;
                var rowIdx = 2;
                var Totals = Object();
                var colIdx = 1;
                Totals[MaelstromTools.Statics.Tiberium] = 0;
                Totals[MaelstromTools.Statics.Crystal] = 0;
                Totals[MaelstromTools.Statics.Power] = 0;
                Totals[MaelstromTools.Statics.Tiberium + "Max"] = 0;
                Totals[MaelstromTools.Statics.Power + "Max"] = 0;

                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  Totals[MaelstromTools.Statics.Tiberium] += cityCache[MaelstromTools.Statics.Tiberium];
                  Totals[MaelstromTools.Statics.Crystal] += cityCache[MaelstromTools.Statics.Crystal];
                  Totals[MaelstromTools.Statics.Power] += cityCache[MaelstromTools.Statics.Power];
                  Totals[MaelstromTools.Statics.Tiberium + "Max"] += cityCache[MaelstromTools.Statics.Tiberium + 'Max'];
                  Totals[MaelstromTools.Statics.Power + "Max"] += cityCache[MaelstromTools.Statics.Power + 'Max'];

                  colIdx = 1;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 100, 'left');
                  if (first) {
                    MaelstromTools.Util.addLabel(this.Widget, 1, colIdx, 'Max. (Res)', 75, 'right');
                   // MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, '|',15,'center');

                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium + 'Max']), 75, 'right');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, '|',15,'right');
                  if (first) {
                  	MaelstromTools.Util.addLabel(this.Widget, 1 , colIdx, 'Current Tib', 90, 'right');
                  //  MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Tiberium));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium]), 90, 'right', null, (cityCache[MaelstromTools.Statics.Tiberium] >= cityCache[MaelstromTools.Statics.Tiberium + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Tiberium] >= (0.75 * cityCache[MaelstromTools.Statics.Tiberium + 'Max']) ? "yellow" : "white")));


                  if (first) {
                  	MaelstromTools.Util.addLabel(this.Widget, 1 , colIdx, 'Tib Full on...', 125, 'right');
	               // MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, '|',15,'center');
                   // MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Crystal),null,'center');
                  }

                  if (cityCache[MaelstromTools.Statics.Tiberium] < cityCache[MaelstromTools.Statics.Tiberium + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Tiberium + 'Full']), 125, 'right', null, (cityCache[MaelstromTools.Statics.Tiberium] >= (0.75 * cityCache[MaelstromTools.Statics.Tiberium + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 125, 'right', null, "red");
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, '|',15,'right');

                  if (first) {
                  	MaelstromTools.Util.addLabel(this.Widget, 1 , colIdx, 'Current Crystal', 90, 'right');

                  	// MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Crystal),null,'center');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Crystal]), 90, 'right', null, (cityCache[MaelstromTools.Statics.Crystal] >= cityCache[MaelstromTools.Statics.Crystal + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Crystal] >= (0.75 * cityCache[MaelstromTools.Statics.Crystal + 'Max']) ? "yellow" : "white")));

                  if (first) {
                  	MaelstromTools.Util.addLabel(this.Widget, 1 , colIdx, 'Crystal Full on...', 125, 'right');

                   // MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Crystal),null,'center');
                  }

                  if (cityCache[MaelstromTools.Statics.Crystal] < cityCache[MaelstromTools.Statics.Crystal + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Crystal + 'Full']), 125, 'right', null, (cityCache[MaelstromTools.Statics.Crystal] >= (0.75 * cityCache[MaelstromTools.Statics.Crystal + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 125, 'right', null, "red");
                  }
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, '|',15,'center');


                  if (first) {
                    MaelstromTools.Util.addLabel(this.Widget, 1, colIdx, 'Max. (Power)', 90, 'right');
                  // MaelstromTools.Util.addLabel(this.Widget, 1, colIdx, 'Storage', 80, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power + 'Max']), 90, 'right');

                  if (first) {
                  	MaelstromTools.Util.addLabel(this.Widget, 1 , colIdx, 'Current Power', 90, 'right');
                  // MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Power));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power]), 90, 'right', null, (cityCache[MaelstromTools.Statics.Power] >= cityCache[MaelstromTools.Statics.Power + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Power] >= (0.75 * cityCache[MaelstromTools.Statics.Power + 'Max']) ? "yellow" : "white")));

                  if (first) {
                  	MaelstromTools.Util.addLabel(this.Widget, 1 , colIdx, 'Power Full on...', 125, 'right');
                  // MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Power));
                  }

                  if (cityCache[MaelstromTools.Statics.Power] < cityCache[MaelstromTools.Statics.Power + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Power + 'Full']), 125, 'right', null, (cityCache[MaelstromTools.Statics.Power] >= (0.75 * cityCache[MaelstromTools.Statics.Power + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 125, 'right', null, "red");
                  }


                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  rowIdx++;
                  first = false;
                }

                colIdx = 1;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Total resources", 100, 'left', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium + 'Max']), 75, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, '|',15,'right');

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium]), 90, 'right', 'bold');
                //MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, '|',15,'center');

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Tiberium] / Totals[MaelstromTools.Statics.Tiberium + 'Max'] * 100) + '%', 125, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, '|',15,'right');

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Crystal]), 90, 'right', 'bold');

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Crystal] / Totals[MaelstromTools.Statics.Tiberium + 'Max'] * 100) + '%', 125, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, '|',15,'center');

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power + 'Max']), 90, 'right', 'bold');

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power]), 90, 'right', 'bold');

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Power] / Totals[MaelstromTools.Statics.Power + 'Max'] * 100) + '%', 125, 'right', 'bold');
              } catch (e) {
                console.log("MaelstromTools.ResourceOverview.setWidgetLabels: ", e);
              }
            }
          }
        });

        // define BaseStatus
        qx.Class.define("MaelstromTools.BaseStatus", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            CityMenuButtons: null,

            //City.SetDedicatedSupport
            //City.RecallDedicatedSupport
            //City.get_SupportDedicatedBaseId
            //System.String get_SupportDedicatedBaseName ()
            updateCache: function () {
              try {
                MT_Cache.updateCityCache();
                this.Cache = Object();

                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  var player = ClientLib.Data.MainData.GetInstance().get_Player();
                  var supportData = ncity.get_SupportData();
                  //System.String get_PlayerName ()
                  this.Cache[cname] = Object();
                  // Movement lock
                  this.Cache[cname]["HasCooldown"] = ncity.get_hasCooldown();
                  this.Cache[cname]["CooldownEnd"] = Math.max(ncity.get_MoveCooldownEndStep(), ncity.get_MoveRestictionEndStep());
                  this.Cache[cname]["MoveCooldownEnd"] = ncity.get_MoveCooldownEndStep();
                  this.Cache[cname]["MoveLockdownEnd"] = ncity.get_MoveRestictionEndStep();
                  this.Cache[cname]["IsProtected"] = ncity.get_isProtected();
                  this.Cache[cname]["ProtectionEnd"] = ncity.get_ProtectionEndStep();
                  this.Cache[cname]["IsProtected"] = ncity.get_ProtectionEndStep();
                  this.Cache[cname]["IsAlerted"] = ncity.get_isAlerted();

                  // Supportweapon
                  if (supportData == null) {
                    this.Cache[cname]["HasSupportWeapon"] = false;
                  } else {
                    this.Cache[cname]["HasSupportWeapon"] = true;
                    if (ncity.get_SupportDedicatedBaseId() > 0) {
                      this.Cache[cname]["SupportedCityId"] = ncity.get_SupportDedicatedBaseId();
                      this.Cache[cname]["SupportedCityName"] = ncity.get_SupportDedicatedBaseName();
                      var coordId = ncity.get_SupportDedicatedBaseCoordId();
                      this.Cache[cname]["SupportedCityX"] = (coordId & 0xffff);
                      this.Cache[cname]["SupportedCityY"] = ((coordId >> 0x10) & 0xffff);
                      /*
                      var cityX = ncity.get_PosX();
                      var cityY = ncity.get_PosY();
                      
                      var mainData = ClientLib.Data.MainData.GetInstance();
                      var visRegion = ClientLib.Vis.VisMain.GetInstance().get_Region();

                      var gridW = visRegion.get_GridWidth();
                      var gridH = visRegion.get_GridHeight();
                      //console.log(cname);
                      //console.log("x: " + cityX + " y: " + cityY);

                      var worldObj = visRegion.GetObjectFromPosition((this.Cache[cname]["SupportedCityX"]*gridW), (this.Cache[cname]["SupportedCityY"]*gridH));
                      
                      //ClientLib.Vis.Region.RegionCity
                      if (worldObj == null) {
                        this.Cache[cname]["SupportTime"] = "";
                      } else {
                        console.log(cname);
                        //console.log(worldObj.CalibrationSupportDuration());
                        var weaponState = worldObj.get_SupportWeaponStatus();
                        
                        //console.log(this.calcDuration(ncity, worldObj));
                        var cities = ClientLib.Data.MainData.GetInstance().get_Cities();
                        cities.set_CurrentOwnCityId(ncity.get_Id());
                        var status = worldObj.get_SupportWeaponStatus();
                        var server = mainData.get_Server();
                        //console.log(worldObj.CalculateSupportCalibrationEndStep(worldObj.get_SupportData(), worldObj.get_SupportWeapon()));
                        console.log(status);
                        console.log(currStep);
                        this.Cache[cname]["SupportTime"] = mainData.get_Time().GetTimespanString(worldObj.CalculateSupportCalibrationEndStep(worldObj.get_SupportData(), worldObj.get_SupportWeapon()), currStep);
                        //status.Status&ClientLib.Vis.Region.ESupportWeaponStatus.Calibrating)==ClientLib.Vis.Region.ESupportWeaponStatus.Calibrating
                        var currStep = ClientLib.Data.MainData.GetInstance().get_Time().GetServerStep();
                        //this.Cache[cname]["SupportTime"] = webfrontend.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(Math.max(0, status.CalibrationEndStep) - currStep), false);
                        //this.Cache[cname]["SupportTime"] = ClientLib.Data.MainData.GetInstance().get_Time().GetTimespanString(weaponState.CalibrationEndStep, currStep);
                        //this.Cache[cname]["SupportTime"] = webfrontend.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(Math.max(0, worldObj.CalculateSupportCalibrationEndStep(worldObj.get_SupportData(), worldObj.get_SupportWeapon()) - currStep)), false);
                      //console.log(this.Cache[cname]["SupportTime"]);
                      }
                       */
                    } else { // prevent reference to undefined property ReferenceError
                      this.Cache[cname]["SupportedCityId"] = null;
                      this.Cache[cname]["SupportedCityName"] = null;
                      this.Cache[cname]["SupportedCityX"] = null;
                      this.Cache[cname]["SupportedCityY"] = null;
                    }
                    this.Cache[cname]["SupportRange"] = MaelstromTools.Wrapper.GetSupportWeaponRange(ncity.get_SupportWeapon());
                    var techName = ClientLib.Base.Tech.GetTechNameFromTechId(supportData.get_Type(), player.get_Faction());
                    this.Cache[cname]["SupportName"] = ClientLib.Base.Tech.GetProductionBuildingNameFromFaction(techName, player.get_Faction());
                    this.Cache[cname]["SupportLevel"] = supportData.get_Level();
                    //this.Cache[cname]["SupportBuilding"] = ncity.get_CityBuildingsData().GetUniqueBuildingByTechName(techName);
                    //console.log(this.Cache[cname]["SupportBuilding"]);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.BaseStatus.updateCache: ", e);
              }
            },
            /*
            calcDuration: function(currOwnCity, regionCity) {
              var targetCity = MaelstromTools.Wrapper.GetCity(regionCity.get_Id());
              
              var supportBase=regionCity.get_SupportData();
              if(supportBase == null)
              {
                return -1;
              }
              var weapon=regionCity.get_SupportWeapon();
              if(weapon == null)
              {
                return -1;
              }
              if(currOwnCity.get_Id() == regionCity.get_Id())
              {
                if(supportBase.get_Magnitude() == 0) {
                  return -1;
                }
                return 0;
              }
              var dx=(currOwnCity.get_X() - targetCity.get_PosX());
              var dy=(currOwnCity.get_Y() - targetCity.get_PosY());
              var distance=((dx * dx) + (dy * dy));
              return Math.floor((weapon.pt + (weapon.tpf * Math.floor((Math.sqrt(distance) + 0.5)))));
            },*/

            setWidgetLabels: function () {
              try {
                this.Widget.removeAll();
                var rowIdx = 1;
                var colIdx = 2;

                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Cooldown", 85, 'left');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Protection", 85, 'left');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Available weapon", 140, 'left');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Calibrated on", 140, 'left');

                //colIdx++;
                var rowIdxRecall = rowIdx;
                var colIdxRecall = 0;
                var supportWeaponCount = 0;

                rowIdx++;
                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  colIdx = 1;

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityName, 100, 'left', null, (cityCache.IsAlerted ? 'red' : null));

                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetStepTime(cityCache.CooldownEnd), 70, 'right');
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetStepTime(cityCache.ProtectionEnd), 70, 'right');

                  if (!cityCache.HasSupportWeapon) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "none", 140, 'left');
                    colIdx += 2;
                  } else {
                    supportWeaponCount++;
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.SupportName + " (" + cityCache.SupportLevel + ")", 140, 'left');

                    if (cityCache.SupportedCityId > 0) {
                      MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, cityCache.SupportedCityName, 140, 'left');
                      colIdxRecall = colIdx;
                      MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, this.getRecallButton(cityName));
                    } else {
                      colIdx += 2;
                    }
                  }

                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getFocusBaseButton(cityName));

                  rowIdx++;
                }

                if (supportWeaponCount > 0 && colIdxRecall > 0) {
                  MaelstromTools.Util.addElement(this.Widget, rowIdxRecall, colIdxRecall, this.getRecallAllButton());
                }
              } catch (e) {
                console.log("MaelstromTools.BaseStatus.setWidgetLabels: ", e);
              }
            },

            getRecallAllButton: function () {
              var button = new qx.ui.form.Button("Recall all").set({
                appearance: "button-text-small",
                toolTipText: "Recall all support weapons",
                width: 100,
                height: 20
              });
              button.addListener("execute", function (e) {
                MaelstromTools.Util.recallAllSupport();
              }, this);
              return button;
            },

            getRecallButton: function (cityName) {
              var button = new qx.ui.form.Button("Recall").set({
                appearance: "button-text-small",
                toolTipText: "Recall support to " + cityName,
                width: 100,
                height: 20
              });
              button.addListener("execute", function (e) {
                MaelstromTools.Util.recallSupport(cityName);
              }, this);
              return button;
            }
            /*
            getCalibrateAllOnSelectedBaseButton: function() {
              var button = new qx.ui.form.Button("Calibrate all weapons on selected base").set({
                appearance: "button-text-small",
                toolTipText: "Calibrate all weapons",
                width: 100,
                height: 20
              });
              button.addListener("execute", function(e){
                Util.calibrateWholeSupport(ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId());
              }, this);
              return button;
            }*/


          }
        });

        // define Statics
        qx.Class.define("MaelstromTools.Statics", {
          type: "static",
          statics: {
            Tiberium: 'Tiberium',
            Crystal: 'Crystal',
            Power: 'Power',
            Dollar: 'Dollar',
            Research: 'Research',
            Vehicle: "Vehicle",
            Aircraft: "Aircraft",
            Infantry: "Infantry",

            LootTypeName: function (ltype) {
              switch (ltype) {
                case ClientLib.Base.EResourceType.Tiberium:
                  return MaelstromTools.Statics.Tiberium;
                  break;
                case ClientLib.Base.EResourceType.Crystal:
                  return MaelstromTools.Statics.Crystal;
                  break;
                case ClientLib.Base.EResourceType.Power:
                  return MaelstromTools.Statics.Power;
                  break;
                case ClientLib.Base.EResourceType.Gold:
                  return MaelstromTools.Statics.Dollar;
                  break;
                default:
                  return "";
                  break;
              }
            }
          }
        });

        // define Util
        //ClientLib.Data.Cities.prototype.GetCityByCoord
        //ClientLib.Data.City.prototype.get_HasIncommingAttack
        qx.Class.define("MaelstromTools.Util", {
          type: "static",
          statics: {
            ArrayUnique: function (array) {
              var o = {};
              var l = array.length;
              r = [];
              for (var i = 0; i < l; i++) o[array[i]] = array[i];
              for (var i in o) r.push(o[i]);
              return r;
            },

            ArraySize: function (array) {
              var size = 0;
              for (var key in array)
              if (array.hasOwnProperty(key)) size++;
              return size;
            },

            addLabel: function (widget, rowIdx, colIdx, value, width, textAlign, font, color, colSpan) {
              try {
                var label = new qx.ui.basic.Label().set({
                  value: Lang.gt(value)
                });
                if (width) {
                  label.setWidth(width);
                }
                if (textAlign) {
                  label.setTextAlign(textAlign);
                }
                if (color) {
                  label.setTextColor(color);
                }
                if (font) {
                  label.setFont(font);
                }
                if (!colSpan || colSpan == 0) {
                  colSpan = 1;
                }

                widget.add(label, {
                  row: rowIdx,
                  column: colIdx,
                  colSpan: colSpan
                });
              } catch (e) {
                console.log("MaelstromTools.Util.addLabel: ", e);
              }
            },

            addElement: function (widget, rowIdx, colIdx, element, colSpan) {
              try {
                if (!colSpan || colSpan == 0) {
                  colSpan = 1;
                }
                widget.add(element, {
                  row: rowIdx,
                  column: colIdx,
                  colSpan: colSpan
                });
              } catch (e) {
                console.log("MaelstromTools.Util.addElement: ", e);
              }
            },

            addImage: function (widget, rowIdx, colIdx, image) {
              try {
                widget.add(image, {
                  row: rowIdx,
                  column: colIdx
                });
              } catch (e) {
                console.log("MaelstromTools.Util.addImage: ", e);
              }
            },

            getImage: function (name) {
              var image = new qx.ui.basic.Image(MT_Base.images[name]);
              image.setScale(true);
              image.setWidth(20);
              image.setHeight(20);
              return image;
            },

            getAccessBaseButton: function (cityName, viewMode) {
              try {
                var cityButton = new qx.ui.form.Button(null, MT_Base.images["AccessBase"]).set({
                  appearance: "button-detailview-small",
                  toolTipText: Lang.gt("Access") + " " + cityName,
                  width: 20,
                  height: 20,
                  marginLeft: 5
                });
                cityButton.setUserData("cityId", MT_Cache.Cities[cityName].ID);
                cityButton.setUserData("viewMode", viewMode);
                cityButton.addListener("execute", function (e) {
                  MaelstromTools.Util.accessBase(e.getTarget().getUserData("cityId"), e.getTarget().getUserData("viewMode"));
                }, this);
                return cityButton;
              } catch (e) {
                console.log("MaelstromTools.Util.getAccessBaseButton: ", e);
              }
            },

            getFocusBaseButton: function (cityName) {
              try {
                var cityButton = new qx.ui.form.Button(null, MT_Base.images["FocusBase"]).set({
                  appearance: "button-detailview-small",
                  toolTipText: Lang.gt("Focus on") + " " + cityName,
                  width: 20,
                  height: 20,
                  marginLeft: 5
                });
                cityButton.setUserData("cityId", MT_Cache.Cities[cityName].ID);
                cityButton.addListener("execute", function (e) {
                  MaelstromTools.Util.focusBase(e.getTarget().getUserData("cityId"));
                }, this);
                return cityButton;
              } catch (e) {
                console.log("MaelstromTools.Util.getFocusBaseButton: ", e);
              }
            },

            accessBase: function (cityId, viewMode) {
              try {
                if (cityId > 0) {
                  var ncity = MaelstromTools.Wrapper.GetCity(cityId);

                  if (ncity != null && !ncity.get_IsGhostMode()) {
                    if (viewMode) {
                      webfrontend.gui.UtilView.openVisModeInMainWindow(viewMode, cityId, false);
                    } else {
                      webfrontend.gui.UtilView.openCityInMainWindow(cityId);
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.Util.accessBase: ", e);
              }
            },
            focusBase: function (cityId) {
              try {
                if (cityId > 0) {
                  var ncity = MaelstromTools.Wrapper.GetCity(cityId);

                  if (ncity != null && !ncity.get_IsGhostMode()) {
                    webfrontend.gui.UtilView.centerCityOnRegionViewWindow(cityId);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.Util.focusBase: ", e);
              }
            },

            recallSupport: function (cityName) {
              try {
                var ncity = MT_Cache.Cities[cityName]["Object"];
                ncity.RecallDedicatedSupport();
              } catch (e) {
                console.log("MaelstromTools.Util.recallSupport: ", e);
              }
            },

            recallAllSupport: function () {
              try {
                MT_Cache.updateCityCache();
                for (var cityName in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cityName]["Object"];
                  ncity.RecallDedicatedSupport();
                }
              } catch (e) {
                console.log("MaelstromTools.Util.recallAllSupport: ", e);
              }
            },

            checkIfSupportIsAllowed: function (selectedBase) {
              try {
                if (selectedBase.get_VisObjectType() != ClientLib.Vis.VisObject.EObjectType.RegionCityType) {
                  return false;
                }
                if (selectedBase.get_Type() != ClientLib.Vis.Region.RegionCity.ERegionCityType.Own && selectedBase.get_Type() != ClientLib.Vis.Region.RegionCity.ERegionCityType.Alliance) {
                  return false;
                }
                return true;
              } catch (e) {
                console.log("MaelstromTools.Util.checkIfSupportIsAllowed: ", e);
                return false;
              }
            },

            calibrateWholeSupportOnSelectedBase: function () {
              if (this.checkIfSupportIsAllowed(MT_Cache.SelectedBaseForMenu)) {
                this.calibrateWholeSupport(MT_Cache.SelectedBaseForMenu);
              }
            },

            calibrateWholeSupport: function (targetRegionCity) {
              try {
                MT_Cache.updateCityCache();
                for (var cityName in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cityName]["Object"];
                  //var targetCity = MaelstromTools.Wrapper.GetCity(targetCityId);
                  var weapon = ncity.get_SupportWeapon();

                  //console.log("checking support weapon for " + ncity.get_Name() + " calibrating on " + targetRegionCity.get_Name());

                  if (targetRegionCity != null && weapon != null) {
                    //console.log("city at " + ncity.get_X() + " / " + ncity.get_Y());
                    //console.log("targetRegionCity at " + targetRegionCity.get_RawX() + " / " + targetRegionCity.get_RawY());
                    //var distance = ClientLib.Base.Util.CalculateDistance(ncity.get_X(), ncity.get_Y(), targetRegionCity.get_RawX(), targetRegionCity.get_RawY());
                    var dx = (ncity.get_X() - targetRegionCity.get_RawX());
                    var dy = (ncity.get_Y() - targetRegionCity.get_RawY());
                    var distance = ((dx * dx) + (dy * dy));
                    var range = MaelstromTools.Wrapper.GetSupportWeaponRange(weapon);
                    //console.log("distance is " + distance);
                    //console.log("range isy " + range*range);
                    if (distance <= (range * range)) {
                      ncity.SetDedicatedSupport(targetRegionCity.get_Id());
                    }
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.Util.calibrateWholeSupport: ", e);
              }
            },

            // visCity : ClientLib.Vis.Region.RegionObject
            getResources: function (visCity) { // to verifier against PerforceChangelist>=376877
              try {
                var loot = new Object();
                if (visCity.get_X() < 0 || visCity.get_Y() < 0) {
                  loot["LoadState"] = 0;
                  return loot;
                }
                var currentOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

                var distance = ClientLib.Base.Util.CalculateDistance(currentOwnCity.get_X(), currentOwnCity.get_Y(), visCity.get_RawX(), visCity.get_RawY());
                var maxAttackDistance = ClientLib.Data.MainData.GetInstance().get_Server().get_MaxAttackDistance();
                if (distance > maxAttackDistance) {
                  loot["LoadState"] = -1;
                  return loot;
                }

                var ncity = MaelstromTools.Wrapper.GetCity(visCity.get_Id());
                /* ClientLib.Data.CityBuildings */
                //var cityBuildings = ncity.get_CityBuildingsData();
                //var cityUnits = ncity.get_CityUnitsData();

                //var buildings = MaelstromTools.Wrapper.GetBuildings(cityBuildings);
                var buildings = ncity.get_Buildings().d;
                //var defenseUnits = MaelstromTools.Wrapper.GetDefenseUnits(cityUnits);
                var defenseUnits = MaelstromTools.Wrapper.GetDefenseUnits();

                /*for(var u in buildings) {
              console.log(buildings[u].get_MdbBuildingId());
              console.log("----------------");
            }*/

                var buildingLoot = MaelstromTools.Util.getResourcesPart(buildings);
                //var buildingLoot2 = MaelstromTools.Util.getResourcesPart(this.collectBuildings(ncity));

                var unitLoot = MaelstromTools.Util.getResourcesPart(defenseUnits);

                loot[MaelstromTools.Statics.Tiberium] = buildingLoot[ClientLib.Base.EResourceType.Tiberium] + unitLoot[ClientLib.Base.EResourceType.Tiberium];
                loot[MaelstromTools.Statics.Crystal] = buildingLoot[ClientLib.Base.EResourceType.Crystal] + unitLoot[ClientLib.Base.EResourceType.Crystal];
                loot[MaelstromTools.Statics.Dollar] = buildingLoot[ClientLib.Base.EResourceType.Gold] + unitLoot[ClientLib.Base.EResourceType.Gold];
                loot[MaelstromTools.Statics.Research] = buildingLoot[ClientLib.Base.EResourceType.ResearchPoints] + unitLoot[ClientLib.Base.EResourceType.ResearchPoints];
                loot["Factor"] = loot[MaelstromTools.Statics.Tiberium] + loot[MaelstromTools.Statics.Crystal] + loot[MaelstromTools.Statics.Dollar] + loot[MaelstromTools.Statics.Research];
                loot["CPNeeded"] = currentOwnCity.CalculateAttackCommandPointCostToCoord(ncity.get_X(), ncity.get_Y());
                loot["LoadState"] = (loot["Factor"] > 0 ? 1 : 0);
                loot["Total"] = loot[MaelstromTools.Statics.Research] + loot[MaelstromTools.Statics.Tiberium] + loot[MaelstromTools.Statics.Crystal] + loot[MaelstromTools.Statics.Dollar]

                /*console.log("Building loot");
                console.log( buildingLoot[ClientLib.Base.EResourceType.Tiberium] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.Tiberium]);
                console.log( buildingLoot[ClientLib.Base.EResourceType.Crystal] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.Crystal]);
                console.log( buildingLoot[ClientLib.Base.EResourceType.Gold] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.Gold]);
                console.log( buildingLoot[ClientLib.Base.EResourceType.ResearchPoints] + " vs " +  buildingLoot2[ClientLib.Base.EResourceType.ResearchPoints]);
                console.log("-------------");*/
                return loot;
              } catch (e) {
                console.log("MaelstromTools.Util.getResources", e);
              }
            },
            /*
            collectBuildings: function(ncity) {
              var cityBuildings = ncity.get_CityBuildingsData();
              var buildings = new Array();
              var count = 0;
              // ncity.GetNumBuildings()
              for(var i = 0; i < 100000; i++) {
                var building = cityBuildings.GetBuildingByMDBId(i);
                if(!building) {
                  continue;
                }
                
                //console.log(building.get_TechName() + " - " + ncity.get_CityFaction() + " - " + ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(building.get_TechName(), ncity.get_CityFaction()) + " at lvl " + building.get_CurrentLevel());
                buildings.push(building);
              //buildings[count++] = building;
              }
              return buildings; //MaelstromTools.Util.ArrayUnique(buildings);
            },*/

            getResourcesPart: function (cityEntities) {
              try {
                var loot = [0, 0, 0, 0, 0, 0, 0, 0];
                if (cityEntities == null) {
                  return loot;
                }

                var objcityEntities = [];
                if (PerforceChangelist >= 376877) { //new
                  for (var o in cityEntities) objcityEntities.push(cityEntities[o]);
                } else { //old
                  for (var i = 0; i < cityEntities.length; i++) objcityEntities.push(cityEntities[i]);
                }

                for (var i = 0; i < objcityEntities.length; i++) {
                  var cityEntity = objcityEntities[i];
                  var unitLevelRequirements = MaelstromTools.Wrapper.GetUnitLevelRequirements(cityEntity);

                  for (var x = 0; x < unitLevelRequirements.length; x++) {
                    loot[unitLevelRequirements[x].Type] += unitLevelRequirements[x].Count * cityEntity.get_HitpointsPercent();
                    if (cityEntity.get_HitpointsPercent() < 1.0) {
                      // destroyed

                    }
                  }
                }

                return loot;
              } catch (e) {
                console.log("MaelstromTools.Util.getResourcesPart", e);
              }
            }

            /*
            findBuildings: function(city) {
              for (var k in city) {
                if ((typeof(city[k]) == "object") && city[k] && city[k] && 0 in city[k]) {
                  if ((typeof(city[k][0]) == "object")  && city[k][0] && "BuildingDBId" in city[k][0]) {
                    return city[k];
                  }
                }
              }
              return [];
            }*/
          }
        });

        // define Wrapper
        qx.Class.define("MaelstromTools.Wrapper", {
          type: "static",
          statics: {
            GetStepTime: function (step, defaultString) {
              if (!defaultString) {
                defaultString = "";
              }
              var endTime = ClientLib.Data.MainData.GetInstance().get_Time().GetTimespanString(step, ClientLib.Data.MainData.GetInstance().get_Time().GetServerStep());
              if (endTime == "00:00") {
                return defaultString;
              }
              return endTime;
            },

            FormatNumbersCompact: function (value) {
              if (PerforceChangelist >= 387751) { //new
                return phe.cnc.gui.util.Numbers.formatNumbersCompact(value);
              } else { //old
                return webfrontend.gui.Util.formatNumbersCompact(value);
              }
            },

            GetDateTimeString: function (value) {
                return phe.cnc.Util.getDateTimeString(value);
            },

            FormatTimespan: function (value) {
              return ClientLib.Vis.VisMain.FormatTimespan(value);
            },

            GetSupportWeaponRange: function (weapon) {
              return weapon.r;
            },

            GetCity: function (cityId) {
              return ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(cityId);
            },

            RepairAll: function (ncity, visMode) {
              var oldMode = ClientLib.Vis.VisMain.GetInstance().get_Mode();
              ClientLib.Vis.VisMain.GetInstance().set_Mode(visMode);
              ncity.RepairAll();
              ClientLib.Vis.VisMain.GetInstance().set_Mode(oldMode);
            },

            CanRepairAll: function (ncity, viewMode) {
              try {
                /*var oldMode = ClientLib.Vis.VisMain.GetInstance().get_Mode();
                ClientLib.Vis.VisMain.GetInstance().set_Mode(visMode);
                var retVal = ncity.CanRepairAll();
                ClientLib.Vis.VisMain.GetInstance().set_Mode(oldMode);
                return retVal;*/

                var repairData = ncity.get_CityRepairData();
                var myRepair = repairData.CanRepair(0, viewMode);
                repairData.UpdateCachedFullRepairAllCost(viewMode);
                return ((myRepair != null) && (!ncity.get_IsLocked() || (viewMode != ClientLib.Vis.Mode.ArmySetup)));

                return false;
              } catch (e) {
                console.log("MaelstromTools.Wrapper.CanRepairAll: ", e);
                return false;
              }
            },
            /*GetBuildings: function (cityBuildings) {
              if (PerforceChangelist >= 376877) { //new
                return (cityBuildings.get_Buildings() != null ? cityBuildings.get_Buildings().d : null);
              } else { //old
                return (cityBuildings.get_Buildings() != null ? cityBuildings.get_Buildings().l : null);
              }
            },*/
            //GetDefenseUnits: function (cityUnits) {
            GetDefenseUnits: function () {
              /*if (PerforceChangelist >= 376877) { //new
                return (cityUnits.get_DefenseUnits() != null ? cityUnits.get_DefenseUnits().d : null);
              } else { //old
                return (cityUnits.get_DefenseUnits() != null ? cityUnits.get_DefenseUnits().l : null);
              }*/
              var defenseObjects = [];
              for (var x = 0; x < 9; x++) {
                for (var y = 0; y < 8; y++) {
                  var defenseObject = ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().GetDefenseObjectFromPosition((x * ClientLib.Vis.VisMain.GetInstance().get_City().get_GridWidth()),(y * ClientLib.Vis.VisMain.GetInstance().get_City().get_GridHeight()));
                  if (defenseObject !== null && defenseObject.get_CityEntity() !== null) {
                    defenseObjects.push(defenseObject.get_UnitDetails());
                  }
                }
              }
              return defenseObjects;
            },
            GetUnitLevelRequirements: function (cityEntity) {
              if (PerforceChangelist >= 376877) { //new
                return (cityEntity.get_UnitLevelRepairRequirements() != null ? cityEntity.get_UnitLevelRepairRequirements() : null);
              } else { //old
                return (cityEntity.get_UnitLevelRequirements() != null ? cityEntity.get_UnitLevelRequirements() : null);
              }
            },

            GetBaseLevel: function (ncity) {
              return (Math.floor(ncity.get_LvlBase() * 100) / 100).toFixed(2);
            }
            /*,
            
            GetPointsByLevelWithThresholds: function (_levelThresholds,_levelFactors,_iLevel) {
              var result=0;
              var lastLevel=_iLevel;
              if(_levelThresholds.length != _levelFactors.length) {
                return 0;
              }
              for (var i=(_levelThresholds.length - 1); (i >= 0); i--) {
                var threshold=(_levelThresholds[i] - 1);
                if(lastLevel >= threshold) {
                  result += ((lastLevel - threshold) * _levelFactors[i]);
                  lastLevel=threshold;
                }
              }
              return result;
            },
            GetArmyPoints: function(_iLevel) {
              var server = ClientLib.Data.MainData.GetInstance().get_Server();
              var m_iArmyPointsPerLevelThresholds = server.get_ArmyPointsPerLevelThresholds();
              var m_fArmyPointsPerLevel = server.get_ArmyPointsPerLevel();
              _iLevel += 4;
              var armyPoints = MaelstromTools.Wrapper.GetPointsByLevelWithThresholds(m_iArmyPointsPerLevelThresholds, m_fArmyPointsPerLevel, _iLevel);
              return Math.min(armyPoints, server.get_MaxArmyPoints());
            },
            
            GetBuilding: function(ncity, techName) {
              return ncity.get_CityBuildingsData().GetUniqueBuildingByTechName(techName)
            },
            
            GetCommandCenter: function(ncity) {
              //var techName = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Command_Center, ClientLib.Data.MainData.GetInstance().get_Player().get_Faction());

              return MaelstromTools.Wrapper.GetBuilding(ncity, ClientLib.Base.ETechName.Command_Center);
            // conyard return this.GetBuildingCondition$0(ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction$0(0, ClientLib.Data.MainData.GetInstance$9().get_Player$2().get_Faction$2()));
            // ClientLib.Data.City.prototype.GetOffenseConditionInPercent=ClientLib.Data.City.prototype.GetOffenseConditionInPercent$0;
            }*/
          }
        });

        // define LocalStorage
        qx.Class.define("MaelstromTools.LocalStorage", {
          type: "static",
          statics: {
            isSupported: function () {
              return typeof (Storage) !== "undefined";
            },
            set: function (key, value) {
              try {
                if (MaelstromTools.LocalStorage.isSupported()) {
                  localStorage["CCTA_MaelstromTools_" + key] = JSON.stringify(value);
                }
              } catch (e) {
                console.log("MaelstromTools.LocalStorage.set: ", e);
              }
            },
            get: function (key, defaultValueIfNotSet) {
              try {
                if (MaelstromTools.LocalStorage.isSupported()) {
                  if (localStorage["CCTA_MaelstromTools_" + key] != null && localStorage["CCTA_MaelstromTools_" + key] != 'undefined') {
                    return JSON.parse(localStorage["CCTA_MaelstromTools_" + key]);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.LocalStorage.get: ", e);
              }
              return defaultValueIfNotSet;
            },
            clearAll: function () {
              try {
                if (!MaelstromTools.LocalStorage.isSupported()) {
                  return;
                }
                for (var key in localStorage) {
                  if (key.indexOf("CCTA_MaelstromTools_") == 0) {
                    localStorage.removeItem(key);
                  }
                }
              } catch (e) {
                console.log("MaelstromTools.LocalStorage.clearAll: ", e);
              }
            }
          }
        });

        // define Cache
        qx.Class.define("MaelstromTools.Cache", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            CityCount: 0,
            Cities: null,
            SelectedBaseForMenu: null,
            SelectedBaseResources: null,
            SelectedBaseForLoot: null,

            updateCityCache: function () {
              try {
                this.CityCount = 0;
                this.Cities = Object();

                var cities = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities();
                for (var cindex in cities.d) {
                  this.CityCount++;
                  var ncity = MaelstromTools.Wrapper.GetCity(cindex);
                  var ncityName = ncity.get_Name();
                  this.Cities[ncityName] = Object();
                  this.Cities[ncityName]["ID"] = cindex;
                  this.Cities[ncityName]["Object"] = ncity;
                }
              } catch (e) {
                console.log("MaelstromTools.Cache.updateCityCache: ", e);
              }
            },

            updateLoot: function (visCity) {
              var cityId = visCity.get_Id();

              if (this.SelectedBaseForLoot != null && cityId == this.SelectedBaseForLoot.get_Id() && this.SelectedBaseResources != null && this.SelectedBaseResources["LoadState"] > 0) {
                return -2;
              }
              this.SelectedBaseForLoot = visCity;
              this.SelectedBaseResources = MaelstromTools.Util.getResources(visCity);
              return this.SelectedBaseResources["LoadState"];
            }
          }
        });

        // define HuffyTools.ImageRender
        qx.Class.define("HuffyTools.ImageRender", {
          extend: qx.ui.table.cellrenderer.AbstractImage,
          construct: function (width, height) {
            this.base(arguments);
            if (width) {
              this.__imageWidth = width;
            }
            if (height) {
              this.__imageHeight = height;
            }
            this.__am = qx.util.AliasManager.getInstance();
          },
          members: {
            __am: null,
            __imageHeight: 16,
            __imageWidth: 16,
            // overridden
            _identifyImage: function (cellInfo) {
              var imageHints = {
                imageWidth: this.__imageWidth,
                imageHeight: this.__imageHeight
              };
              if (cellInfo.value == "") {
                imageHints.url = null;
              } else {
                imageHints.url = this.__am.resolve(cellInfo.value);
              }
              imageHints.tooltip = cellInfo.tooltip;
              return imageHints;
            }
          },
          destruct: function () {
            this.__am = null;
          }
        });

        // define HuffyTools.ReplaceRender
        qx.Class.define("HuffyTools.ReplaceRender", {
          extend: qx.ui.table.cellrenderer.Default,
          properties: {
            replaceFunction: {
              check: "Function",
              nullable: true,
              init: null
            }
          },
          members: {
            // overridden
            _getContentHtml: function (cellInfo) {
              var value = cellInfo.value;
              var replaceFunc = this.getReplaceFunction();
              // use function
              if (replaceFunc) {
                cellInfo.value = replaceFunc(value);
              }
              return qx.bom.String.escape(this._formatValue(cellInfo));
            }
          }
        });

        qx.Class.define("HuffyTools.CityCheckBox", {
          extend: qx.ui.form.CheckBox,
          members: {
            HT_CityID: null
          }
        });

        // define HuffyTools.UpgradePriorityGUI
        qx.Class.define("HuffyTools.UpgradePriorityGUI", {
          type: "singleton",
          extend: MaelstromTools.DefaultObject,
          members: {
            HT_TabView: null,
            HT_Options: null,
            HT_ShowOnlyTopBuildings: null,
            HT_ShowOnlyAffordableBuildings: null,
            HT_CityBuildings: null,
            HT_Pages: null,
            HT_Tables: null,
            HT_Models: null,
            HT_SelectedResourceType: null,
            BuildingList: null,
            upgradeInProgress: null,
            init: function () {
              /*
              Done:
              - Added cost per gain to the lists
              - Added building coordinates to the lists
              - Only display the top affordable and not affordable building
              - Persistent filter by city, top and affordable per resource type
              - Reload onTabChange for speed optimization
              - Estimated time until upgrade is affordable
              
              ToDo:
              - let the user decide to sort by colums he like i.e. timefactor or cost/gain and save it in the configuration
              - integrate buttons to transfer resources ?

               */
              try {
                this.HT_SelectedResourceType = -1;
                this.IsTimerEnabled = false;
                this.upgradeInProgress = false;

                this.HT_TabView = new qx.ui.tabview.TabView();
                this.HT_TabView.set({
                  contentPadding: 0,
                  appearance: "tabview",
                  margin: 5,
                  barPosition: 'left'
                });
                this.Widget = new qx.ui.tabview.Page("UpgradePriority");
                this.Widget.setPadding(0);
                this.Widget.setMargin(0);
                this.Widget.setBackgroundColor("#BEC8CF");
                this.Widget.setLayout(new qx.ui.layout.VBox(2));
                //this.Widget.add(this.HT_Options);
                this.Widget.add(this.HT_TabView, {
                  flex: 1
                });
                this.Window.setPadding(0);
                this.Window.set({
                  resizable: true
                });

                this.Window.removeAll();
                this.Window.add(this.Widget);

                this.BuildingList = new Array;
                this.HT_Models = new Array;
                this.HT_Tables = new Array;
                this.HT_Pages = new Array;

                this.createTabPage(ClientLib.Base.EResourceType.Tiberium);
                this.createTable(ClientLib.Base.EResourceType.Tiberium);
                this.HT_Tables[ClientLib.Base.EResourceType.Tiberium].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Tiberium)
                }, this);


                this.createTabPage(ClientLib.Base.EResourceType.Crystal);
                this.createTable(ClientLib.Base.EResourceType.Crystal);
                this.HT_Tables[ClientLib.Base.EResourceType.Crystal].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Crystal)
                }, this);

                this.createTabPage(ClientLib.Base.EResourceType.Power);
                this.createTable(ClientLib.Base.EResourceType.Power);
                this.HT_Tables[ClientLib.Base.EResourceType.Power].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Power)
                }, this);

                this.createTabPage(ClientLib.Base.EResourceType.Gold);
                this.createTable(ClientLib.Base.EResourceType.Gold);
                this.HT_Tables[ClientLib.Base.EResourceType.Gold].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Gold)
                }, this);


                MT_Cache.updateCityCache();
                this.HT_Options = new Array();
                this.HT_ShowOnlyTopBuildings = new Array();
                this.HT_ShowOnlyAffordableBuildings = new Array();
                this.HT_CityBuildings = new Array();
                for (var mPage in this.HT_Pages) {
                  this.createOptions(mPage);
                  this.HT_Pages[mPage].add(this.HT_Options[mPage]);
                  this.HT_Pages[mPage].add(this.HT_Tables[mPage], {
                    flex: 1
                  });
                  this.HT_TabView.add(this.HT_Pages[mPage]);
                }

                // Zeigen wir Dollars an !
                this.HT_TabView.setSelection([this.HT_TabView.getChildren()[2]]);
                this.HT_SelectedResourceType = ClientLib.Base.EResourceType.Gold;
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.init: ", e)
              }
            },
            createOptions: function (eType) {
              var oBox = new qx.ui.layout.Flow();
              var oOptions = new qx.ui.container.Composite(oBox);
              oOptions.setMargin(5);
              this.HT_ShowOnlyTopBuildings[eType] = new qx.ui.form.CheckBox(Lang.gt("display only top buildings"));
              this.HT_ShowOnlyTopBuildings[eType].setMargin(5);
              this.HT_ShowOnlyTopBuildings[eType].setValue(MaelstromTools.LocalStorage.get("UGL_TOPBUILDINGS_" + eType, true));
              this.HT_ShowOnlyTopBuildings[eType].addListener("execute", this.CBChanged, this);
              oOptions.add(this.HT_ShowOnlyTopBuildings[eType], {
                left: 10,
                top: 10
              });
              this.HT_ShowOnlyAffordableBuildings[eType] = new qx.ui.form.CheckBox(Lang.gt("display only affordable buildings"));
              this.HT_ShowOnlyAffordableBuildings[eType].setMargin(5);
              this.HT_ShowOnlyAffordableBuildings[eType].setValue(MaelstromTools.LocalStorage.get("UGL_AFFORDABLE_" + eType, true));
              this.HT_ShowOnlyAffordableBuildings[eType].addListener("execute", this.CBChanged, this);
              oOptions.add(this.HT_ShowOnlyAffordableBuildings[eType], {
                left: 10,
                top: 10,
                lineBreak: true
              });
              this.HT_CityBuildings[eType] = new Array();
              for (var cname in MT_Cache.Cities) {
                var oCity = MT_Cache.Cities[cname].Object;
                var oCityBuildings = new HuffyTools.CityCheckBox(cname);
                oCityBuildings.HT_CityID = oCity.get_Id();
                oCityBuildings.setMargin(5);
                oCityBuildings.setValue(MaelstromTools.LocalStorage.get("UGL_CITYFILTER_" + eType + "_" + oCity.get_Id(), true));
                oCityBuildings.addListener("execute", this.CBChanged, this);
                oOptions.add(oCityBuildings, {
                  left: 10,
                  top: 10
                });
                this.HT_CityBuildings[eType][cname] = oCityBuildings;
              }
              this.HT_Options[eType] = oOptions;
            },
            createTable: function (eType) {
              try {
                this.HT_Models[eType] = new qx.ui.table.model.Simple();
                this.HT_Models[eType].setColumns(["ID", Lang.gt("City"), Lang.gt("Type (coord)"), Lang.gt("to Level"), Lang.gt("Gain/h"), Lang.gt("Factor"), Lang.gt("Tiberium"), Lang.gt("Power"), Lang.gt("Tib/gain"), Lang.gt("Pow/gain"), Lang.gt("ETA"), Lang.gt("Upgrade"), "State"]);
                this.HT_Tables[eType] = new qx.ui.table.Table(this.HT_Models[eType]);
                this.HT_Tables[eType].setColumnVisibilityButtonVisible(false);
                this.HT_Tables[eType].setColumnWidth(0, 0);
                this.HT_Tables[eType].setColumnWidth(1, 90);
                this.HT_Tables[eType].setColumnWidth(2, 120);
                this.HT_Tables[eType].setColumnWidth(3, 55);
                this.HT_Tables[eType].setColumnWidth(4, 70);
                this.HT_Tables[eType].setColumnWidth(5, 60);
                this.HT_Tables[eType].setColumnWidth(6, 70);
                this.HT_Tables[eType].setColumnWidth(7, 70);
                this.HT_Tables[eType].setColumnWidth(8, 70);
                this.HT_Tables[eType].setColumnWidth(9, 70);
                this.HT_Tables[eType].setColumnWidth(10, 70);
                this.HT_Tables[eType].setColumnWidth(11, 40);
                this.HT_Tables[eType].setColumnWidth(12, 0);
                var tcm = this.HT_Tables[eType].getTableColumnModel();
                tcm.setColumnVisible(0, false);
                tcm.setColumnVisible(12, false);
                tcm.setDataCellRenderer(4, new qx.ui.table.cellrenderer.Number().set({
                  numberFormat: new qx.util.format.NumberFormat().set({
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                  })
                }));
                tcm.setDataCellRenderer(5, new qx.ui.table.cellrenderer.Number().set({
                  numberFormat: new qx.util.format.NumberFormat().set({
                    maximumFractionDigits: 5,
                    minimumFractionDigits: 5
                  })
                }));
                tcm.setDataCellRenderer(6, new HuffyTools.ReplaceRender().set({
                  ReplaceFunction: this.formatTiberiumAndPower
                }));
                tcm.setDataCellRenderer(7, new HuffyTools.ReplaceRender().set({
                  ReplaceFunction: this.formatTiberiumAndPower
                }));
                tcm.setDataCellRenderer(11, new HuffyTools.ImageRender(40, 20));
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.createTable: ", e)
              }
            },
            createTabPage: function (resource_type) {
              try {
                var sName = MaelstromTools.Statics.LootTypeName(resource_type);
                var oRes = new qx.ui.tabview.Page(Lang.gt(sName), MT_Base.images[sName]);
                oRes.setLayout(new qx.ui.layout.VBox(2));
                oRes.setPadding(5);
                var btnTab = oRes.getChildControl("button");
                btnTab.resetWidth();
                btnTab.resetHeight();
                btnTab.set({
                  show: "icon",
                  margin: 0,
                  padding: 0,
                  toolTipText: sName
                });
                btnTab.addListener("execute", this.TabChanged, [this, resource_type]);
                this.HT_Pages[resource_type] = oRes;
                return oRes;
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.createTabPage: ", e)
              }
            },

            TabChanged: function (e) {
              try {
                this[0].HT_SelectedResourceType = this[1];
                this[0].UpgradeCompleted(null, null);
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.TabChanged: ", e)
              }
            },

            upgradeBuilding: function (e, eResourceType) {
              if (this.upgradeInProgress == true) {
                console.log("upgradeBuilding:", "upgrade in progress !");
                return;
              }
              try {
                if (e.getColumn() == 11) {
                  var buildingID = this.HT_Models[eResourceType].getValue(0, e.getRow());
                  var iState = parseInt(this.HT_Models[eResourceType].getValue(12, e.getRow()));
                  if (iState != 1) {
                    return;
                  }
                  if (buildingID in this.BuildingList) {
                    this.upgradeInProgress = true;
                    if (PerforceChangelist >= 382917) { //new
                      ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", this.BuildingList[buildingID], phe.cnc.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.UpgradeCompleted), null, true);
                    } else { //old
                      ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", this.BuildingList[buildingID], webfrontend.Util.createEventDelegate(ClientLib.Net.CommandResult, this, this.UpgradeCompleted), null, true);
                    }
                  }
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.upgradeBuilding: ", e)
              }
            },
            UpgradeCompleted: function (context, result) {
              this.calc();
              this.upgradeInProgress = false;
            },
            CBChanged: function (e) {
              this.UpgradeCompleted(null, null);
            },
            formatTiberiumAndPower: function (oValue) {
              if (PerforceChangelist >= 387751) { //new
                return phe.cnc.gui.util.Numbers.formatNumbersCompact(oValue);
              } else { //old
                return webfrontend.gui.Util.formatNumbersCompact(oValue);
              }
            },
            updateCache: function () {
              try {
                if (!this.HT_TabView) {
                  this.init();
                }
                var eType = this.HT_SelectedResourceType;
                var bTop = this.HT_ShowOnlyTopBuildings[eType].getValue();
                MaelstromTools.LocalStorage.set("UGL_TOPBUILDINGS_" + eType, bTop);
                var bAffordable = this.HT_ShowOnlyAffordableBuildings[eType].getValue();
                MaelstromTools.LocalStorage.set("UGL_AFFORDABLE_" + eType, bAffordable);
                var oCityFilter = new Array();
                for (var cname in this.HT_CityBuildings[eType]) {
                  var oCityBuildings = this.HT_CityBuildings[eType][cname];
                  var bFilterBuilding = oCityBuildings.getValue();
                  MaelstromTools.LocalStorage.set("UGL_CITYFILTER_" + eType + "_" + oCityBuildings.HT_CityID, bFilterBuilding);
                  oCityFilter[cname] = bFilterBuilding;
                }
                window.HuffyTools.UpgradePriority.getInstance().collectData(bTop, bAffordable, oCityFilter, eType);
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.updateCache: ", e)
              }
            },
            setWidgetLabels: function () {
              try {
                var HuffyCalc = window.HuffyTools.UpgradePriority.getInstance();
                var UpgradeList = HuffyCalc.Cache;

                for (var eResourceType in UpgradeList) {
                  //var eResourceType = MaelstromTools.Statics.LootTypeName(eResourceName);
                  var rowData = [];

                  this.HT_Models[eResourceType].setData([]);

                  for (var mCity in UpgradeList[eResourceType]) {
                    for (var mBuilding in UpgradeList[eResourceType][mCity]) {
                      var UpItem = UpgradeList[eResourceType][mCity][mBuilding];
                      if (typeof (UpItem.Type) == "undefined") {
                        continue;
                      }
                      if (!(mBuilding in this.BuildingList)) {
                        this.BuildingList[UpItem.ID] = UpItem.Building;
                      }
                      var iTiberiumCosts = 0;
                      if (ClientLib.Base.EResourceType.Tiberium in UpItem.Costs) {
                        iTiberiumCosts = UpItem.Costs[ClientLib.Base.EResourceType.Tiberium];
                      }
                      var iTiberiumPerGain = 0;
                      if (ClientLib.Base.EResourceType.Tiberium in UpItem.Costs) {
                        iTiberiumPerGain = UpItem.Costs[ClientLib.Base.EResourceType.Tiberium] / UpItem.GainPerHour;
                      }
                      var iPowerCosts = 0;
                      if (ClientLib.Base.EResourceType.Power in UpItem.Costs) {
                        iPowerCosts = UpItem.Costs[ClientLib.Base.EResourceType.Power];
                      }
                      var iPowerPerGain = 0;
                      if (ClientLib.Base.EResourceType.Power in UpItem.Costs) {
                        iPowerPerGain = UpItem.Costs[ClientLib.Base.EResourceType.Power] / UpItem.GainPerHour;
                      }
                      var img = MT_Base.images["UpgradeBuilding"];
                      if (UpItem.Affordable == false) {
                        img = "";
                      }
                      var sType = UpItem.Type;
                      sType = sType + "(" + UpItem.PosX + ":" + UpItem.PosY + ")";
                      var iETA = 0;
                      if (UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Tiberium] > 0) {
                        iETA = UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Tiberium];
                      }
                      if (UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Power] > iETA) {
                        iETA = UpItem.TimeTillUpgradable[ClientLib.Base.EResourceType.Power];
                      }
                      var sETA = "";
                      if (iETA > 0) {
                        sETA = ClientLib.Vis.VisMain.FormatTimespan(iETA);
                      }
                      var iState = 0;
                      if (UpItem.Affordable == true) {
                        iState = 1;
                      } else if (UpItem.AffordableByTransfer == true) {
                        iState = 2;
                      } else {
                        iState = 3;
                      }
                      rowData.push([UpItem.ID, mCity, sType, UpItem.Level, UpItem.GainPerHour, UpItem.Ticks, iTiberiumCosts, iPowerCosts, iTiberiumPerGain, iPowerPerGain, sETA, img, iState]);
                    }
                  }
                  this.HT_Models[eResourceType].setData(rowData);
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.setWidgetLabels: ", e)
              }
            }
          }
        });

        // define HuffyTools.UpgradePriority
        qx.Class.define("HuffyTools.UpgradePriority", {
          type: "singleton",
          extend: qx.core.Object,
          members: {
            list_units: null,
            list_buildings: null,

            comparePrio: function (elem1, elem2) {
              if (elem1.Ticks < elem2.Ticks) return -1;
              if (elem1.Ticks > elem2.Ticks) return 1;
              return 0;
            },
            getPrioList: function (city, arTechtypes, eModPackageSize, eModProduction, bOnlyTopBuildings, bOnlyAffordableBuildings) {
              try {
                var RSI = window.MaelstromTools.ResourceOverview.getInstance();
                RSI.updateCache();
                var TotalTiberium = 0;

                for (var cityName in this.Cache) {
                  var cityCache = this.Cache[cityName];
                  var i = cityCache[MaelstromTools.Statics.Tiberium];
                  if (typeof (i) !== 'undefined') {
                    TotalTiberium += i;
                    //but never goes here during test.... // to optimize - to do
                  }
                }
                var resAll = new Array();
                var prod = MaelstromTools.Production.getInstance().updateCache(city.get_Name());
                //var buildings = MaelstromTools.Wrapper.GetBuildings(city.get_CityBuildingsData());
                var buildings = city.get_Buildings().d;

                // 376877 & old fixes 
                var objbuildings = [];
                if (PerforceChangelist >= 376877) { //new
                  for (var o in buildings) objbuildings.push(buildings[o]);
                } else { //old
                  for (var i = 0; i < buildings.length; i++) objbuildings.push(buildings[i]);
                }


                for (var i = 0; i < objbuildings.length; i++) {
                  var city_building = objbuildings[i];

                  // TODO: check for destroyed building

                  var iTechType = city_building.get_TechName();
                  var bSkip = true;
                  for (var iTypeKey in arTechtypes) {
                    if (arTechtypes[iTypeKey] == iTechType) {
                      bSkip = false;
                      break;
                    }
                  }
                  if (bSkip == true) {
                    continue;
                  }
                  var city_buildingdetailview = city.GetBuildingDetailViewInfo(city_building);
                  if (city_buildingdetailview == null) {
                    continue;
                  }
                  var bindex = city_building.get_Id();
                  var resbuilding = new Array();
                  resbuilding["ID"] = bindex;
                  resbuilding["Type"] = this.TechTypeName(parseInt(iTechType, 10));
                  resbuilding["PosX"] = city_building.get_CoordX();
                  resbuilding["PosY"] = city_building.get_CoordY();

                  resbuilding["Building"] = {
                    cityid: city.get_Id(),
                    posX: resbuilding["PosX"],
                    posY: resbuilding["PosY"],
                    isPaid: true
                  };

                  resbuilding["GainPerHour"] = 0;
                  resbuilding["Level"] = city_building.get_CurrentLevel() + 1;
                  for (var ModifierType in city_buildingdetailview.OwnProdModifiers.d) {
                    switch (parseInt(ModifierType, 10)) {
                      case eModPackageSize:
                        {
                          var ModOj = city_buildingdetailview.OwnProdModifiers.d[city_building.get_MainModifierTypeId()];
                          var Mod = (ModOj.TotalValue + ModOj.NewLvlDelta) / ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                          resbuilding["GainPerHour"] += (city_buildingdetailview.OwnProdModifiers.d[ModifierType].NewLvlDelta / Mod);
                          break;
                        }
                      case eModProduction:
                        {
                          resbuilding["GainPerHour"] += city_buildingdetailview.OwnProdModifiers.d[ModifierType].NewLvlDelta;
                          break;
                        }
                    }
                  }
                  // Nutzen ins VerhÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¤ltnis zu den Kosten setzten
                  var TechLevelData = ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(city_building.get_CurrentLevel() + 1, city_building.get_TechGameData_Obj());
                  var RatioPerCostType = new Object();
                  var sRatio = "";
                  var sCosts = "";
                  var lTicks = 0;
                  var bHasPower = true;
                  var bHasTiberium = true;
                  var bAffordableByTransfer = true;
                  var oCosts = new Array();
                  var oTimes = new Array();
                  for (var costtype in TechLevelData) {
                    if (typeof (TechLevelData[costtype]) == "function") {
                      continue;
                    }
                    if (TechLevelData[costtype].Type == "0") {
                      continue;
                    }

                    oCosts[TechLevelData[costtype].Type] = TechLevelData[costtype].Count;
                    if (parseInt(TechLevelData[costtype].Count) <= 0) {
                      continue;
                    }
                    RatioPerCostType[costtype] = TechLevelData[costtype].Count / resbuilding["GainPerHour"];
                    if (sCosts.length > 0) {
                      sCosts = sCosts + ", ";
                    }
                    sCosts = sCosts + MaelstromTools.Wrapper.FormatNumbersCompact(TechLevelData[costtype].Count) + " " + MaelstromTools.Statics.LootTypeName(TechLevelData[costtype].Type);
                    if (sRatio.length > 0) {
                      sRatio = sRatio + ", ";
                    }
                    // Upgrade affordable ?
                    if (city.GetResourceCount(TechLevelData[costtype].Type) < TechLevelData[costtype].Count) {
                      switch (TechLevelData[costtype].Type) {
                        case ClientLib.Base.EResourceType.Tiberium:
                          {
                            bHasTiberium = false;
                            if (TotalTiberium < TechLevelData[costtype].Count) {
                              bAffordableByTransfer = false;
                            }
                          }
                          break;
                        case ClientLib.Base.EResourceType.Power:
                          {
                            bHasPower = false;
                          }
                          break;
                      }
                    }
                    sRatio = sRatio + MaelstromTools.Wrapper.FormatNumbersCompact(RatioPerCostType[costtype]);

                    var techlevelData = MaelstromTools.Statics.LootTypeName(TechLevelData[costtype].Type);

                    var dCityProduction = prod[techlevelData].Delta + prod[techlevelData].ExtraBonusDelta + prod[techlevelData].POI;
                    if (dCityProduction > 0) {
                      if (lTicks < (3600 * RatioPerCostType[costtype] / dCityProduction)) {
                        lTicks = (3600 * RatioPerCostType[costtype] / dCityProduction);
                      }
                    }
                    oTimes[TechLevelData[costtype].Type] = 0;
                    if (oCosts[TechLevelData[costtype].Type] > city.GetResourceCount(TechLevelData[costtype].Type)) {
                      oTimes[TechLevelData[costtype].Type] = (3600 * (oCosts[TechLevelData[costtype].Type] - city.GetResourceCount(TechLevelData[costtype].Type))) / dCityProduction;
                    }
                  }
                  resbuilding["Ticks"] = lTicks;
                  resbuilding["Time"] = ClientLib.Vis.VisMain.FormatTimespan(lTicks);
                  resbuilding["Costtext"] = sCosts;
                  resbuilding["Costs"] = oCosts;
                  resbuilding["TimeTillUpgradable"] = oTimes;
                  resbuilding["Ratio"] = sRatio;
                  resbuilding["Affordable"] = bHasTiberium && bHasPower;
                  resbuilding["AffordableByTransfer"] = bHasPower && bAffordableByTransfer;
                  if (resbuilding["GainPerHour"] > 0 && (bOnlyAffordableBuildings == false || resbuilding["Affordable"] == true)) {
                    resAll[bindex] = resbuilding;
                  }
                }


                resAll = resAll.sort(this.comparePrio);
                if (!bOnlyTopBuildings) {
                  return resAll;
                }
                var res2 = new Array();
                if (MaelstromTools.Util.ArraySize(resAll) > 0) {
                  var iTopNotAffordable = -1;
                  var iTopAffordable = -1;
                  var iNextNotAffordable = -1;
                  var iLastIndex = -1;
                  for (var iNewIndex in resAll) {
                    if (resAll[iNewIndex].Affordable == true) {
                      if (iTopAffordable == -1) {
                        iTopAffordable = iNewIndex;
                        iNextNotAffordable = iLastIndex;
                      }
                    } else {
                      if (iTopNotAffordable == -1) {
                        iTopNotAffordable = iNewIndex;
                      }
                    }
                    iLastIndex = iNewIndex;
                  }
                  if (iTopAffordable == -1) {
                    iNextNotAffordable = iLastIndex;
                  }
                  var iIndex = 0;
                  if (iTopNotAffordable != -1) {
                    res2[iIndex++] = resAll[iTopNotAffordable];
                  }
                  if (iNextNotAffordable != -1) {
                    res2[iIndex++] = resAll[iNextNotAffordable];
                  }
                  if (iTopAffordable != -1) {
                    res2[iIndex++] = resAll[iTopAffordable];
                  }
                }
                res2 = res2.sort(this.comparePrio);
                return res2;
              } catch (e) {
                console.log("HuffyTools.getPrioList: ", e)
              }
            },
            TechTypeName: function (iTechType) {
              switch (iTechType) {
                case ClientLib.Base.ETechName.PowerPlant:
                  {
                    return Lang.gt("Powerplant");
                    break;
                  }
                case ClientLib.Base.ETechName.Refinery:
                  {
                    return Lang.gt("Refinery");
                    break;
                  }
                case ClientLib.Base.ETechName.Harvester_Crystal:
                  {
                    return Lang.gt("Harvester");
                    break;
                  }
                case ClientLib.Base.ETechName.Harvester:
                  {
                    return Lang.gt("Harvester");
                    break;
                  }
                case ClientLib.Base.ETechName.Silo:
                  {
                    return Lang.gt("Silo");
                    break;
                  }
                case ClientLib.Base.ETechName.Accumulator:
                  {
                    return Lang.gt("Accumulator");
                    break;
                  }
              }
              return "?";
            },
            collectData: function (bOnlyTopBuildings, bOnlyAffordableBuildings, oCityFilter, eSelectedResourceType) {
              try {
                MT_Cache.updateCityCache();
                this.Cache = new Object();
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Tiberium) {
                  this.Cache[ClientLib.Base.EResourceType.Tiberium] = new Object();
                }
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Crystal) {
                  this.Cache[ClientLib.Base.EResourceType.Crystal] = new Object();
                }
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Power) {
                  this.Cache[ClientLib.Base.EResourceType.Power] = new Object();
                }
                if (eSelectedResourceType == ClientLib.Base.EResourceType.Gold) {
                  this.Cache[ClientLib.Base.EResourceType.Gold] = new Object();
                }
                for (var cname in MT_Cache.Cities) {
                  var city = MT_Cache.Cities[cname].Object;
                  if (oCityFilter[cname] == false) {
                    continue;
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Tiberium) {
                    this.Cache[ClientLib.Base.EResourceType.Tiberium][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Harvester, ClientLib.Base.ETechName.Silo], ClientLib.Base.EModifierType.TiberiumPackageSize, ClientLib.Base.EModifierType.TiberiumProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Crystal) {
                    this.Cache[ClientLib.Base.EResourceType.Crystal][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Harvester, ClientLib.Base.ETechName.Silo], ClientLib.Base.EModifierType.CrystalPackageSize, ClientLib.Base.EModifierType.CrystalProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Power) {
                    this.Cache[ClientLib.Base.EResourceType.Power][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.PowerPlant, ClientLib.Base.ETechName.Accumulator], ClientLib.Base.EModifierType.PowerPackageSize, ClientLib.Base.EModifierType.PowerProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                  if (eSelectedResourceType == ClientLib.Base.EResourceType.Gold) {
                    this.Cache[ClientLib.Base.EResourceType.Gold][cname] = this.getPrioList(city, [ClientLib.Base.ETechName.Refinery, ClientLib.Base.ETechName.PowerPlant], ClientLib.Base.EModifierType.CreditsPackageSize, ClientLib.Base.EModifierType.CreditsProduction, bOnlyTopBuildings, bOnlyAffordableBuildings);
                  }
                }
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.collectData: ", e)
              }
            }
          }
        });

        var __MTCity_initialized = false; //k undeclared

        var Lang = window.MaelstromTools.Language.getInstance();
        var MT_Cache = window.MaelstromTools.Cache.getInstance();
        var MT_Base = window.MaelstromTools.Base.getInstance();
        var MT_Preferences = window.MaelstromTools.Preferences.getInstance();
        MT_Preferences.readOptions();

        if (!webfrontend.gui.region.RegionCityMenu.prototype.__MTCity_showMenu) {
          webfrontend.gui.region.RegionCityMenu.prototype.__MTCity_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
        }
        webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selectedVisObject) {

          MT_Cache.SelectedBaseForMenu = selectedVisObject;
          var baseStatusOverview = window.MaelstromTools.BaseStatus.getInstance();

          if (__MTCity_initialized == false) {
            //console.log(selectedBase.get_Name());
            __MTCity_initialized = true;
            baseStatusOverview.CityMenuButtons = new Array();
            for (var i in this) {
              try {
                if (this[i] && this[i].basename == "Composite") {
                  var button = new qx.ui.form.Button(Lang.gt("Calibrate support"));
                  button.addListener("execute", function (e) {
                    MaelstromTools.Util.calibrateWholeSupportOnSelectedBase();
                  }, this);

                  this[i].add(button);
                  baseStatusOverview.CityMenuButtons.push(button)
                }
              } catch (e) {
                console.log("webfrontend.gui.region.RegionCityMenu.prototype.showMenu: ", e);
              }
            }
          }

          var isAllowed = MaelstromTools.Util.checkIfSupportIsAllowed(MT_Cache.SelectedBaseForMenu);

          for (var x = 0; x < baseStatusOverview.CityMenuButtons.length; ++x) {
            baseStatusOverview.CityMenuButtons[x].setVisibility(isAllowed ? 'visible' : 'excluded');
          }
          this.__MTCity_showMenu(selectedVisObject);
        }

        if (MT_Preferences.Settings.showLoot) {
          // Wrap onCitiesChange method
          if (!webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__MTCity_NPCCamp) {
            webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__MTCity_NPCCamp = webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange;
          }
          webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange = function () {
            MT_Base.updateLoot(1, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionNPCCampStatusInfo.getInstance());
            return this.__MTCity_NPCCamp();
          };

          if (!webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__MTCity_NPCBase) {
            webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__MTCity_NPCBase = webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange;
          }
          webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange = function () {
            MT_Base.updateLoot(2, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance());
            //MT_Base.updateLoot(2, ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(), webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance());
            return this.__MTCity_NPCBase();
          };

          if (!webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__MTCity_City) {
            webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__MTCity_City = webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange;
          }
          webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange = function () {
            MT_Base.updateLoot(3, ClientLib.Vis.VisMain.GetInstance().get_SelectedObject(), webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance());
            //MT_Base.updateLoot(3, ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity(), webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance());
            return this.__MTCity_City();
          };
        }

      }
    } catch (e) {
      console.log("createMaelstromTools: ", e);
    }

    function MaelstromTools_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
          createMaelstromTools();
          window.MaelstromTools.Base.getInstance().initialize();
        } else {
          window.setTimeout(MaelstromTools_checkIfLoaded, 1000);
        }
      } catch (e) {
        console.log("MaelstromTools_checkIfLoaded: ", e);
      }
    }

    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(MaelstromTools_checkIfLoaded, 1000);
    }
  }

  try {
    var MaelstromScript = document.createElement("script");
    MaelstromScript.innerHTML = "(" + MaelstromTools_main.toString() + ")();";
    MaelstromScript.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) {
      document.getElementsByTagName("head")[0].appendChild(MaelstromScript);
    }
  } catch (e) {
    console.log("MaelstromTools: init error: ", e);
  }
})();



/***********************************************
Formation Saver
***********************************************/
(function (){
  var tafs_main = function() {
    var windowSaver;
      
    function initialize() {
      console.log("Formation Saver Loaded");

      qx.Class.define("webfrontend.gui.PlayArea.FormationSaver", {
        extend: qx.ui.container.Composite,

        construct:function() {
          qx.ui.container.Composite.call(this);
          this.setLayout(new qx.ui.layout.Canvas());
          this.add(this.init());
        },

        statics: {
          SaverCollapsedHeight: 32,
          SaverExpandedHeight: 245,
        },

        properties: {
          expanded: {init: true, apply: "expand"},
        },

        members: {
          buttonResize: null,
          containerContence: null,
          containerSaves: null,
          containerMain: null,
          buttonSave: null,

          init: function() {          
            var Y = 6;
            this.buttonResize = new webfrontend.ui.SoundButton(null, "FactionUI/icons/icon_tracker_minimise.png").set({width: 20, height: 20, appearance: "button-notif-cat", center: true, allowGrowX: false});
            this.buttonResize.addListener("click",function(e) {
              this.setExpanded(!this.getExpanded());
            }, this);
            var ba = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({alignY:"middle"})).set({margin:Y,marginRight:Y+3});
            ba.add(this.buttonResize);
            var labelTitle = new qx.ui.basic.Label("<b>Saver</b>");
            labelTitle.set({marginLeft: 4, rich: true});
            labelTitle.setTextColor("#FFFFFF");
            ba.add(labelTitle);
            this.containerContence = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({alignX:"center"})).set({allowGrowX:true,marginTop:0,marginBottom:5});

            containerSaves = new qx.ui.container.Composite(new qx.ui.layout.Grid(10, 2)).set({allowGrowX: true , marginLeft: 0, marginBottom: 5});
            this.containerContence.add(containerSaves);

            buttonSave = new qx.ui.form.Button("Save");
            buttonSave.set({width: 50, appearance: "button-text-small", toolTipText: "Save attack formation", allowGrowX:false});
            buttonSave.addListener("click", this.save, this); 
            this.containerContence.add(buttonSave);

            this.containerMain=new qx.ui.container.Composite(new qx.ui.layout.VBox().set({alignX:"right"})).set({maxHeight:webfrontend.gui.PlayArea.FormationSaver.SaverExpandedHeight,width:75,minHeight:32,allowShrinkY:true,decorator:new qx.ui.decoration.VBox().set({baseImage:"webfrontend/ui/common/bgr_mission_tracker.png"})});
            this.containerMain.add(ba);
            this.containerMain.add(this.containerContence,{flex:1});

            return this.containerMain;
          },

          expand: function(bs) {
            if(!bs) {
              this.buttonResize.setIcon("FactionUI/icons/icon_tracker_maximise.png");
              this.containerMain.setMaxHeight(webfrontend.gui.PlayArea.FormationSaver.SaverCollapsedHeight);
            } else {
              this.buttonResize.setIcon("FactionUI/icons/icon_tracker_minimise.png");
              this.containerMain.setMaxHeight(webfrontend.gui.PlayArea.FormationSaver.SaverExpandedHeight);
            }
          },

          update: function() {
            containerSaves.removeAll();

            var playerCities = ClientLib.Data.MainData.GetInstance().get_Cities(); 
            var currentOwnCity = playerCities.get_CurrentOwnCity();
            var cityID = playerCities.get_CurrentCity().get_Id();
            var ownCityID = currentOwnCity.get_Id();

            var formations = this.loadFormations();
            if(!formations) {
              return;
            }
            if(!formations[cityID]) {
              return;
            }
            if(!formations[cityID][ownCityID]) {
              return;
            }

            var i = 0;
            for(var id in formations[cityID][ownCityID]) {
              if(id != 0) {
                i++;
                var formation = formations[cityID][ownCityID][id];
                var date = new Date(Number(formation.t));
                var toolTipText = "<div><span style='float: left'><b>" + formation.n + "</b></span><span style='float: right'>&nbsp;&nbsp;&nbsp;&nbsp;" + date.getHours() + ":" + (date.getMinutes() <= 9 ? "0" : "") + date.getMinutes() + " " + date.getDate() + "/" + (date.getMonth() + 1) + "</span></div><div style='clear: both;'></div>";
                if(formation.cy != null) {
                  toolTipText += formation.cy + "% Construction Yard</br>" + formation.df + "% Defense Facility</br>" + formation.ts + "% Troop Strength</br>" + this.formatSecondsAsTime(formation.r) + " Repair Time";
                }

                var labelLoad = new qx.ui.basic.Label(formation.n);
                labelLoad.set({width: 40, allowGrowX: false, toolTipText: toolTipText});
                labelLoad.setTextColor("#FFFFFF");
                labelLoad.addListener("click", this.clickLoad(formation), this);
                labelLoad.addListener("mouseover", this.mouseover(labelLoad, "#BBBBBB"), this);
                labelLoad.addListener("mouseout", this.mouseout(labelLoad, "#FFFFFF"), this);
                containerSaves.add(labelLoad, {row: i, column: 1});

                var labelDelete = new qx.ui.basic.Label("<b>X</b>");
                labelDelete.set({width: 10, allowGrowX:false, rich: true, toolTipText: "Delete " + formation.n});
                labelDelete.setTextColor("#881717");
                labelDelete.addListener("click", this.clickDeleteF(cityID, ownCityID, id), this);
                labelDelete.addListener("mouseover", this.mouseover(labelDelete, "#550909"), this);
                labelDelete.addListener("mouseout", this.mouseover(labelDelete, "#881717"), this);
                containerSaves.add(labelDelete, {row: i, column: 2});
              }
            }
          },

          mouseover: function(label, color) {
            return function() {
              label.setTextColor(color);
            }
          },

          mouseout: function(label, color) {
            return function() {
              label.setTextColor(color);
            }
          },

          save: function() {
            try {
              var playerCities = ClientLib.Data.MainData.GetInstance().get_Cities(); 
              var currentOwnCity = playerCities.get_CurrentOwnCity();
              var cityID = playerCities.get_CurrentCity().get_Id();
              var ownCityID = currentOwnCity.get_Id();
 
              var newFormation = new Object();
              newFormation.t = new Date().getTime().toString();
              newFormation.n = "";
              newFormation.l = new Array();

              var formation = currentOwnCity.get_CityArmyFormationsManager().GetFormationByTargetBaseId(cityID);
              var armyUnits = formation.get_ArmyUnits();
              if(armyUnits == null) {
                console.log("tafs Error: You must move a unit befor saving!");
                return;
              }
              armyUnits = armyUnits.l;
              for(var i in armyUnits)
              {
                var unit = armyUnits[i];
                newFormation.l[i] = new Object();
                newFormation.l[i].x = unit.get_CoordX();
                newFormation.l[i].y = unit.get_CoordY();
                newFormation.l[i].e = unit.get_Enabled();
              }

              var formations = this.loadFormations();
              if(!formations) {
                formations = new Object();
              }
              if(!formations[cityID]) {
                formations[cityID] = new Object();
              }
              if(!formations[cityID][ownCityID]) {
                formations[cityID][ownCityID] = new Array();
                formations[cityID][ownCityID][0] = 0;
              }
              formations[cityID][ownCityID][0]++;
              newFormation.n = "Save " + formations[cityID][ownCityID][0];
              
              formations[cityID][ownCityID].push(newFormation);
              this.saveFormations(formations);

              windowSaver.update();
            } catch(e) {
              console.log(e);
            }
          },

          clickLoad: function(newFormation) {
            return function() {
              this.load(newFormation);
            }
          },

          load: function(newFormation) {
            try {
              var playerCities = ClientLib.Data.MainData.GetInstance().get_Cities();
              var currentOwnCity = playerCities.get_CurrentOwnCity();
              var cityID = playerCities.get_CurrentCity().get_Id();
              
              var formation = currentOwnCity.get_CityArmyFormationsManager().GetFormationByTargetBaseId(cityID);
              var armyUnits = formation.get_ArmyUnits();
              if(armyUnits == null) {
                console.log("tafs Error: You must move a unit befor loading!");
                return;
              }
              armyUnits = armyUnits.l;

              for(var i in newFormation.l)
              {
                var unitData = newFormation.l[i];
                armyUnits[i].MoveBattleUnit(unitData.x, unitData.y);
                if(unitData.e != null) {
                  if(armyUnits[i].set_Enabled_Original) {
                    armyUnits[i].set_Enabled_Original(unitData.e);
                  } else {
                    armyUnits[i].set_Enabled(unitData.e);
                  }
                }
              }

              //formation.set_CurrentTargetBaseId(cityID);
            } catch(e) {
              console.log(e);
            }
          },

          clickDeleteF: function(cityID, ownCityID, id) {
            return function() {
              this.deleteF(cityID, ownCityID, id);
            }
          },

          deleteF: function(cityID, ownCityID, id) {
            var formations = this.loadFormations();
            if(!formations || !formations[cityID] || !formations[cityID][ownCityID])
              return;

            formations[cityID][ownCityID].splice(id, 1);
            if(formations[cityID][ownCityID].length <= 1) {
              delete formations[cityID][ownCityID];
            }
            var i
            for(i in formations[cityID]) {
              if(formations[cityID].hasOwnProperty(i)) {
                break;
              }
            }
            if(!i)
              delete formations[cityID];

            this.saveFormations(formations);

            windowSaver.update();
          },

          saveFormations: function(formations) {
            var data = JSON.stringify(formations);
            localStorage.formations = data;
          },

          loadFormations: function() {
            var formations = localStorage.formations;
            return formations && JSON.parse(formations);
          },
          
          formatSecondsAsTime: function(secs, format) {
            var hr = Math.floor(secs / 3600);
            var min = Math.floor((secs - (hr * 3600)) / 60);
            var sec = Math.floor(secs - (hr * 3600) - (min * 60));

            if(hr < 10) {
              hr = "0" + hr;
            }
            if(min < 10) {
              min = "0" + min;
            }
            if(sec < 10) {
              sec = "0" + sec;
            }
            
            return hr + ':' + min + ':' + sec;
          },
        }
      })
      
      windowSaver = new webfrontend.gui.PlayArea.FormationSaver();
      windowSaver.hide();
      qx.core.Init.getApplication().getPlayArea().add(windowSaver, {top: 55, right: -2});
      
      if(!ClientLib.Data.MainData.GetInstance().get_Cities().__tafs__set_CurrentOwnCityId) {
        ClientLib.Data.MainData.GetInstance().get_Cities().__tafs__set_CurrentOwnCityId = ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentOwnCityId;
      }
      ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentOwnCityId = function(a) {
        this.__tafs__set_CurrentOwnCityId(a); 
        updateView();
      }
      
      if(!ClientLib.Data.MainData.GetInstance().get_Cities().__tafs__set_CurrentCityId) {
        ClientLib.Data.MainData.GetInstance().get_Cities().__tafs__set_CurrentCityId = ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId;
      }
      ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId = function(a) {
        this.__tafs__set_CurrentCityId(a); 
        updateView();
      }
      
      function updateView() {
        if (PerforceChangelist >= 376877) {
          switch(qx.core.Init.getApplication().getPlayArea().getViewMode()) {
            case ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense:
            case ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupBase:
              windowSaver.update();
              windowSaver.show();
              break;
            default:
              windowSaver.hide();
          }          
        } else {
          switch(qx.core.Init.getApplication().getPlayArea().getViewMode()) {
            case webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupDefense:
            case webfrontend.gui.PlayArea.PlayArea.modes.EMode_CombatSetupBase:
              windowSaver.update();
              windowSaver.show();
              break;
            default:
              windowSaver.hide();
          }
        }
      }
    }

    function tafs_checkIfLoaded() {
      try {
        if (typeof qx != 'undefined') {
          a = qx.core.Init.getApplication(); // application
          mb = qx.core.Init.getApplication().getMenuBar();
          if (a && mb) {
            initialize();
          } else
            window.setTimeout(tafs_checkIfLoaded, 1000);
        } else {
          window.setTimeout(tafs_checkIfLoaded, 1000);
        }
      } catch (e) {
        if (typeof console != 'undefined') console.log(e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
    }
    
    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(tafs_checkIfLoaded, 1000);
    }
  }

  // injecting, because there seem to be problems when creating game interface with unsafeWindow
  var tafsScript = document.createElement("script");
  tafsScript.innerHTML = "(" + tafs_main.toString() + ")();";
  tafsScript.type = "text/javascript";
  if (/commandandconquer\.com/i.test(document.domain)) {
    document.getElementsByTagName("head")[0].appendChild(tafsScript);
  }
})();

/*******************************************
Combat Simulator
*******************************************/
// ==UserScript==
// @name            nWo - Tiberium Alliances Combat Simulator
// @description     Combat Simulator used to plan and strategize attack before going into battle.
// @author          Eistee
// @version         13.05.01
// @namespace       http*://*.alliances.commandandconquer.com/*
// @include         http*://*.alliances.commandandconquer.com/*
// @updateURL       https://userscripts.org/scripts/source/165888.meta.js
// @downloadURL     https://userscripts.org/scripts/source/165888.user.js
// @grant           none
// ==/UserScript==
/**
 *  Although I am the author of this script, I want to also give credit to other authors who's methods and ideas are or might appear in this script.
 *  Credits: Topper42, Eferz98, KRS_L, PythEch, MrHIDEn, Panavia2, Deyhak, CodeEcho, Matthias Fuchs, Enceladus, TheLuminary, Da Xue, Quor, WildKatana, Peluski17, Elda1990, TheStriker, JDuarteDJ, null
 */
(function () {
    var injectFunction = function () {
        function createClasses() {
            qx.Class.define("Simulator", {
                type: "singleton",
                extend: qx.core.Object,

                construct: function () {
                    try {
                        this.armyBar = qx.core.Init.getApplication().getArmySetupAttackBar();
                        this.playArea = qx.core.Init.getApplication().getMainOverlay();
                        this.replayBar = qx.core.Init.getApplication().getReportReplayOverlay();
                        this.isSimButtonDisabled = false;
                        this.armyTempFormations = [];
                        this.armyTempIdx = 0;
                        this.isSimulation = false;
                        this.hideArmyTooltips();

                        /**
                         *   Setup Images
                         */

                        var img = {
                            Arrows: {
                                Up: "webfrontend/theme/arrows/up.png",
                                Down: "webfrontend/theme/arrows/down.png",
                                Left: "webfrontend/theme/arrows/left.png",
                                Right: "webfrontend/theme/arrows/right.png"
                            },
                            Flip: {
                                H: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOvgAADr4B6kKxwAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAACo0lEQVQ4T2PABkJq+rjmH7nUdPrV119nXn/9s+7S/R1NCzc4rTx1a8ay41c7WuYsl5WRkWGEKicM4honSux7+Pb42Tdf/4LwwacfP7Wv3pOz8sydVavO3lk5f9cx15jCGhaocsJgys7jAUeffXiGZODn1lW7Claeub16xelb64C4Ma+lnx+qHD/wySpjXnnqeifQq79RDFy5qxBq4PqVp25Ombxmhw4QQHXhAdH1fWL77r++DDToD04Dz9xeteDAuajc1gn4ve0UkciU3zvT4vTrb79ghmEzEOTtNefvL8pomyrExsYG1Y0FxNT18my4dH8KKGYJGLgeGDkrJqzeoR9ZWMMM1Y4Jercctjr46N1NZMNwGQhy5YpTN/PzWvu5oNpRgUdGGdOc/WfST736guJdPAauX3HiekfH4vXyUCNQQVhtn8D2W8+2nEGKDEIGgrw9a+cxeyUlJdRE7pldxZjcOlXj6LOPj9ENw2cgkL9m2dHL2TGljZxQoyAgrKaHdfmZWxVA734jxUAQXnXm9tS6yXMlTG2doKYBQWrrZIHNVx4sBWrG8C4I4zNw5enbi+ftPuGSVNGMiO2edXstjz3/9BabYSBMwMC1y09cr2pbvFEIbJh/RinrlI1744CRAc9q6BifgSC8+tzdpT1rdmuAE3l80yTZ/UglCzZMyECQ+MID58NiyprYGGbuO5t1/MWn99gMgmFCBoLwytO3Wir6ZggzLDpycQJyyYINH3r66WP7mj25wPDCZ+DsSRv2WTAsPHCmChgh7068/PwTGz4OlFtz+npX7/p9LstP3WwA4hZseMXp2w3Td56wYyho6lSdsfNY6YzdJydM330CBYPEQHIVnROVIzMLOIvb+oVq+meIVPVOQ8EgsYqeqUJJpfWcAKWymA2EsiGlAAAAAElFTkSuQmCC",
                                V: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOvgAADr4B6kKxwAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAClklEQVQ4T2MgB/iVd7CH1/SI9G3YF7D4+JUlR59/+nH61dff8w6cnQBVgh+EN01hjGqZxpY9eYlI39YjNvMOni888Ojd0aNP3z8+8/rr77Nvvv498+brn/n7T0+HasEOIlpnMIc1TBIJq+vX3HjtSd/ma4/WnHj59TtQM9gQZAwycO7ekzOhWhHAo6CRKaymh6d69krVWfvOpO19+O700WcfYS75g24QDGMYCPQWS1TzFKmktmkmO26/XLHv3sujwHD5CVSM0xBkDDcwqLJLcMHxa/FLT17rOPz04/PTb779wqaBEIYbOHv/2ZxjLz6/BglgU0gshhu44MDZaUABigwDYbCB+07NZJi29WDFvrsvLu+78/waDnwdixgmBpoxbduhMgav6ETZyNxSm+j8creoPPJwdH4FkC6z9o1NlWaYsnGf0ZpzdyeuOnt3GSUYZMZUoFkMk7ceDV555s6KFadvrQPi9eRioBmrpu44EcLQvHijweJDFzJWnrrRu/LM7VVASbIMBupdPWX78TAGt8Bw1oSsfL6qCbMUp2855Lvk+LXGFaduTgcpACpci64RF4YbCALe3t6MLi4uTC6BEZwhqXnC3Us3ms7acSxi+YlrLaDwgRqO1SAYRjEQGYAMB2JmN08v9vCMAuGWafPVFu4/E7H8+NWaVWduz11x+vYakgyEAaChDEBXM3r5+rOGJmVwlzZ1Svav2m656NDFghWnbk0FGrAEaBAoSMBhTtBAdAByuZOrO4t7eDxfWlWz7IztR70WHDiXA3T1jFVn76wE4hVTtx8PhionDoBc7eDgwODq4ckcFJPEHp9TJNA0e5n6tPU77ZcfvZLaNnupClQpeQDkaktLS2Y3Hz9Ov8h4XltnV3YAMTRvewY5T1wAAAAASUVORK5CYII="
                            },
                            DisableUnit: "FactionUI/icons/icon_disable_unit.png",
                            Undo: "FactionUI/icons/icon_refresh_funds.png"
                        };

                         /**
                         *   Setup Buttons
                         */

                        //Simulation Button//
                        this.simBtn = new qx.ui.form.Button("Simulate").set({toolTipText: "Opens Simulation Screen.", width: 60, height: 28, alignY: "middle", appearance: "button-text-small"});
                        this.simBtn.addListener("click", function () { this.__openSimulatorWindow(); }, this);
                        this.armyBar.add(this.simBtn, {left: null, right: 58, bottom: 119});

                        //Simulator Stats Button//
                        this.statBtn = new qx.ui.form.Button("Stats").set({toolTipText: "Opens Simulator Stats Window", width: 60, height: 28, alignY: "middle", appearance: "button-text-small"});
                        this.statBtn.addListener("click", function () { this.__openStatWindow(); }, this);
                        this.armyBar.add(this.statBtn, {left: null, right: 58, bottom: 81});

                        //Simulator Options Button//
                        this.optionBtn = new qx.ui.form.Button("Options").set({toolTipText: "Opens Simulator Options", width: 60, height: 28, alignY: "middle", appearance: "button-text-small"});
                        this.optionBtn.addListener("click", function () { this.__openOptionWindow(); }, this);
                        this.armyBar.add(this.optionBtn, {left: null, right: 58, bottom: 43});

                        //Simulator Layout Button//
                        this.layoutBtn = new qx.ui.form.Button("Layout").set({toolTipText: "Save/Load/Delete Unit Formations for current city", width: 60, height: 28, alignY: "middle", appearance: "button-text-small"});
                        this.layoutBtn.addListener("click", function () { this.__openLayoutWindow(); }, this);
                        this.armyBar.add(this.layoutBtn, {left: null, right: 58, bottom: 6});

                        //Simulator Unlock Combat Button//
                        this.unlockCmtBtn = new qx.ui.form.Button("Unlock").set({toolTipText: "Unlock Combat Button", width: 50, height: 50, opacity: 0.7, alignY: "middle", appearance: "button-text-small"});
                        this.unlockCmtBtn.addListener("click", function () { this.timeoutCmtBtn(); }, this);
                        this.armyBar.add(this.unlockCmtBtn, {left: null, right: 7, bottom: 5});

                        //Simulator Unlock Repair Time Button//
                        this.unlockRTBtn = new qx.ui.form.Button("Unlock").set({toolTipText: "Unlock Repair Button", width: 50, height: 50, opacity: 0.7, alignY: "middle", appearance: "button-text-small"});
                        this.unlockRTBtn.addListener("click", function () { this.timeoutRTBtn(); }, this);
                        this.armyBar.add(this.unlockRTBtn, {left: null, right: 7, bottom: 97});

                        //Formation Shift Buttons//
                        this.shiftUpBtn = new qx.ui.form.Button("", img.Arrows.Up).set({toolTipText: "Shifts units one space up", width: 30, height: 20, alignY: "middle", appearance: "button-text-small", gap: 0, iconPosition: "top", show: "icon"});
                        this.shiftUpBtn.addListener("click", function () { this.shiftFormation("u", 0); }, this);
                        this.shiftUpBtn.hide();
                        this.playArea.add(this.shiftUpBtn, {left: null, right: 75, bottom: 113});

                        this.shiftDownBtn = new qx.ui.form.Button("", img.Arrows.Down).set({toolTipText: "Shifts units one space down", width: 30, height: 20, alignY: "middle", appearance: "button-text-small", gap: 0, iconPosition: "top", show: "icon"});
                        this.shiftDownBtn.addListener("click", function () { this.shiftFormation("d", 0); }, this);
                        this.shiftDownBtn.hide();
                        this.playArea.add(this.shiftDownBtn, {left: null, right: 75, bottom: 73});

                        this.shiftLeftBtn = new qx.ui.form.Button("", img.Arrows.Left).set({toolTipText: "Shifts units one space left", width: 30, height: 20, alignY: "middle", appearance: "button-text-small", gap: 0, iconPosition: "top", show: "icon"});
                        this.shiftLeftBtn.addListener("click", function () { this.shiftFormation("l", 0); }, this);
                        this.shiftLeftBtn.hide();
                        this.playArea.add(this.shiftLeftBtn, {left: null, right: 95, bottom: 93});

                        this.shiftRightBtn = new qx.ui.form.Button("", img.Arrows.Right).set({toolTipText: "Shifts units one space right", width: 30, height: 20, alignY: "middle", appearance: "button-text-small", gap: 0, iconPosition: "top", show: "icon"});
                        this.shiftRightBtn.addListener("click", function () { this.shiftFormation("r", 0); }, this);
                        this.shiftRightBtn.hide();
                        this.playArea.add(this.shiftRightBtn, {left: null, right: 55, bottom: 93});

                        for (var i = 0; i < ClientLib.Base.Util.get_ArmyMaxSlotCountY(); i++) {
                            var shiftLeftBtn = new qx.ui.form.Button(i+1, img.Arrows.Left).set({toolTipText: "Shifts units one space left", width: 30, maxHeight: 25, alignY: "middle", show: "icon", iconPosition: "top"});
                            shiftLeftBtn.addListener("click", function (e) { this.shiftFormation("l", parseInt(e.getTarget().getLabel(), 10)); }, this);
                            var shiftRightBtn = new qx.ui.form.Button(i+1, img.Arrows.Right).set({toolTipText: "Shifts units one space right", width: 30, maxHeight: 25, alignY: "middle", show: "icon", iconPosition: "top"});
                            shiftRightBtn.addListener("click", function (e) { this.shiftFormation("r", parseInt(e.getTarget().getLabel(), 10)); }, this);

                            var cntWave = this.armyBar.getChildren()[1].getChildren()[(i+4)];
                            cntWave.removeAll();
                            cntWave.setLayout(new qx.ui.layout.HBox());
                            cntWave.add(new qx.ui.core.Spacer(), {flex: 1});
                            cntWave.add(shiftLeftBtn);
                            cntWave.add(shiftRightBtn);
                            cntWave.add(new qx.ui.core.Spacer(), {flex: 1});
                        }

                        //Formation Mirror Buttons//
                        this.mirrorBtnH = new qx.ui.form.Button("", img.Flip.H).set({toolTipText: "Mirrors current army formation layout", show: "icon", width: 35, height: 35, center: true, alignY: "middle", appearance: "button-text-small"});
                        this.mirrorBtnH.getChildControl("icon").set({width: 20, height: 20, scale: true});
                        this.mirrorBtnH.addListener("click", function () { this.mirrorFormation("h"); }, this);
                        this.mirrorBtnH.hide();
                        this.playArea.add(this.mirrorBtnH, {left: null, right: 6, bottom: 160});

                        this.mirrorBtnV = new qx.ui.form.Button("", img.Flip.V).set({toolTipText: "Mirrors current army formation layout", show: "icon", width: 35, height: 35, center: true, alignY: "middle", appearance: "button-text-small"});
                        this.mirrorBtnV.getChildControl("icon").set({width: 20, height: 20, scale: true});
                        this.mirrorBtnV.addListener("click", function () { this.mirrorFormation("v"); }, this);
                        this.mirrorBtnV.hide();
                        this.playArea.add(this.mirrorBtnV, {left: null, right: 46, bottom: 160});

                        //Disable all Units Button//
                        this.disableAllUnitsBtn = new qx.ui.form.Button("", img.DisableUnit).set({toolTipText: "Enables/Disables all units", show: "icon", width: 35, height: 35, center: true, alignY: "middle", appearance: "button-text-small"});
                        this.disableAllUnitsBtn.getChildControl("icon").set({width: 20, height: 20, scale: true});
                        this.disableAllUnitsBtn.addListener("click", function () { this.shiftFormation("n", 0); }, this);
                        this.disableAllUnitsBtn.hide();
                        this.playArea.add(this.disableAllUnitsBtn, {left: null, right: 6, bottom: 120});

                        //Undo Button//
                        this.armyUndoBtn = new qx.ui.form.Button("", img.Undo).set({toolTipText: "Undo's formation to previous saved formation. Save formations by hitting the Update or Simulate button.", show: "icon", width: 35, height: 35, center: true, alignY: "middle", appearance: "button-text-small"});
                        this.armyUndoBtn.getChildControl("icon").set({width: 20, height: 20, scale: true});
                        this.armyUndoBtn.addListener("click", function () { this.undoCurrentFormation(); }, this);
                        this.armyUndoBtn.setEnabled(false);
                        this.armyUndoBtn.hide();
                        this.playArea.add(this.armyUndoBtn, {left: null, right: 6, bottom: 200});

                        //Quick Save Button//
                        this.quickSaveBtn = new qx.ui.form.Button("QS").set({toolTipText: "Saves the current layout without having to open the Formation Saver window. Does not make persistent.", width: 35, height: 35, alignY: "middle", appearance: "button-text-small"});
                        this.quickSaveBtn.addListener("click", function () { Simulator.LayoutWindow.getInstance().saveNewLayout(true); }, this);
                        this.quickSaveBtn.hide();
                        this.playArea.add(this.quickSaveBtn, {left: null, right: 6, bottom: 240});

                        //Simulator Back Button//
                        this.backBtn = new qx.ui.form.Button("Back").set({toolTipText: "Return to Combat Setup", width: 50, height: 24, appearance: "button-text-small"});
                        this.backBtn.addListener("click", function () { this.backToCombatSetup(); }, this);
                        this.replayBar.add(this.backBtn, {top: 37, left: 255});

                        this.replayStatBtn = new qx.ui.form.Button("Stats").set({toolTipText: "Return to Combat Setup", width: 50, height: 24, appearance: "button-text-small"});
                        this.replayStatBtn.addListener("click", function () { this.__openStatWindow(); }, this);
                        this.replayBar.add(this.replayStatBtn, {top: 7, left: 255});

                    } catch (e) {
                        console.log("Error setting up Simulator Constructor: ");
                        console.log(e.toString());
                    }
                },

                destruct: function () {},

                members: {
                    armyBar: null,
                    playArea: null,
                    replayBar: null,
                    isSimButtonDisabled: null,
                    armyTempFormations: null,
                    armyTempIdx: null,
                    isSimulation: null,
                    simBtn: null,
                    optionBtn: null,
                    statBtn: null,
                    layoutBtn: null,
                    unlockCmtBtn: null,
                    unlockRTBtn: null,
                    shiftUpBtn: null,
                    shiftDownBtn: null,
                    shiftLeftBtn: null,
                    shiftRightBtn: null,
                    disableAllUnitsBtn: null,
                    armyUndoBtn: null,
                    quickSaveBtn: null,
                    backBtn: null,
                    replayStatBtn: null,

                    __openSimulatorWindow: function () {
                        /**
                        * This method initiates the visual simulation with no stats produced. If the player
                        * wants stats produced, then they should do it through the stats window.
                        */

                        var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                        if (city != null) {
                            var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

                            this.isSimulation = true;
                            this.saveTempFormation();

                            localStorage.ta_sim_last_city = city.get_Id();

                            ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
                            ClientLib.API.Battleground.GetInstance().SimulateBattle();
                            var app = qx.core.Init.getApplication();

                            app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, city.get_Id(), 0, 0);

                            var autoSim = localStorage['autoSimulate'];

                            if (typeof autoSim != 'undefined') {
                                if (autoSim == "yes") {
                                    var speed = localStorage['simulateSpeed'];
                                    setTimeout(function () {
                                        var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
                                        battleground.RestartReplay();
                                        battleground.set_ReplaySpeed(parseInt(speed));
                                    }, 1000)
                                }
                            }

                            if (this.isSimButtonDisabled == false) {
                                this.simBtn.setEnabled(false);
                                var simTimer = 10000;
                                this.disableSimulateButtonTimer(simTimer);

                                if (typeof Simulator.StatWindow.getInstance().simStatBtn != "undefined") {
                                    Simulator.StatWindow.getInstance().simStatBtn.setEnabled(false);
                                    var simStatTimer = 10000;
                                    Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(simStatTimer);
                                }
                            }

                            setTimeout(function () {
                                var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
                                var battleDuration = battleground.get_BattleDuration();
                                battleDuration = Simulator.StatWindow.getInstance().formatBattleDurationTime(battleDuration);
                                Simulator.StatWindow.getInstance().__labelMiscBattleDuration[Simulator.StatWindow.getInstance().__span].setValue(battleDuration);
                            }, 1000);

                            if (Simulator.StatWindow.getInstance().simReplayBtn.getEnabled() == false) {
                                Simulator.StatWindow.getInstance().simReplayBtn.setEnabled(true);
                            }
                        }
                    },

                    __openOptionWindow: function () {
                        try {
                            if (Simulator.OptionWindow.getInstance().isVisible()) {
                                console.log("Closing Option Window");
                                Simulator.OptionWindow.getInstance().close();
                            } else {
                                console.log("Opening Option Window");
                                Simulator.OptionWindow.getInstance().open();
                            }
                        } catch (e) {
                            console.log("Error Opening or Closing Option Window");
                            console.log(e.toString());
                        }
                    },

                    __openStatWindow: function () {
                        try {
                            if (Simulator.StatWindow.getInstance().isVisible()) {
                                console.log("Closing Stat Window");
                                Simulator.StatWindow.getInstance().close();
                            } else {
                                console.log("Opening Stat Window");
                                Simulator.StatWindow.getInstance().open();
                                Simulator.StatWindow.getInstance().calcResources();
                            }
                        } catch (e) {
                            console.log("Error Opening or Closing Stat Window");
                            console.log(e.toString());
                        }
                    },

                    __openLayoutWindow: function () {
                        try {
                            if (Simulator.LayoutWindow.getInstance().isVisible()) {
                                console.log("Closing Layout Window");
                                Simulator.LayoutWindow.getInstance().close();
                            } else {
                                console.log("Opening LayoutWindow");
                                Simulator.LayoutWindow.getInstance().updateLayoutList();
                                Simulator.LayoutWindow.getInstance().layoutTextBox.setValue("");
                                Simulator.LayoutWindow.getInstance().persistentCheck.setValue(false);
                                Simulator.LayoutWindow.getInstance().open();
                            }
                        } catch (e) {
                            console.log("Error Opening or Closing Layout Window");
                            console.log(e.toString());
                        }
                    },

                    __openToolsWindow: function () {
                        //Might need to be implemented later on.
                    },

                    attachNetEvent: function () {
                        console.log("Need to assign correct function!");
                    },

                    formatNumbersCompact: function () {
                        console.log("Need to assign correct function!");
                    },

                    GetUnitMaxHealth: function () {
                        console.log("Need to assign correct function!");
                        return -1;
                    },

                    saveTempFormation: function () {
                        try {
                            var units = this.getCityPreArmyUnits().get_ArmyUnits().l;
                            if (this.armyTempFormations.length != 0) {
                                for (var i = 0; i < units.length; i++) {
                                    var lastForm = this.armyTempFormations[this.armyTempIdx][i];
                                    if ((units[i].get_CoordX() != lastForm.x) || (units[i].get_CoordY() != lastForm.y)) {
                                        break;
                                    } else if ((i + 1) == units.length) {
                                        return;
                                    }
                                }
                            }

                            var formation = new Array();

                            for (var i = 0; i < units.length; i++) {
                                var unit = units[i];
                                var unitInfo = {};
                                unitInfo.x = unit.get_CoordX();
                                unitInfo.y = unit.get_CoordY();
                                unitInfo.id = unit.get_Id();
                                unitInfo.enabled = unit.get_Enabled();

                                formation.push(unitInfo);
                            }

                            this.armyTempFormations.push(formation);
                            this.armyTempIdx = this.armyTempFormations.length - 1;
                            if (this.armyTempFormations.length > 1)
                                this.armyUndoBtn.setEnabled(true);
                        } catch (e) {
                            console.log("Error Saving Temp Formation");
                            console.log(e.toString());
                        }
                    },

                    undoCurrentFormation: function () {
                        try {
                            this.restoreFormation(this.armyTempFormations[(this.armyTempIdx - 1)]);

                            //get rid of last element now that we have undone it.
                            this.armyTempFormations.splice(this.armyTempIdx, 1);
                            this.armyTempIdx--;

                            if (this.armyTempFormations.length == 1)
                                this.armyUndoBtn.setEnabled(false);
                        } catch (e) {
                            console.log("Error undoing formation");
                            console.log(e.toString());
                        }
                    },

                    /*
                     * Mirrors across the X/Y Axis
                     */
                    mirrorFormation: function (direction) {
                        try {
                            console.log("Shifting Unit Formation");

                            var units = this.getCityPreArmyUnits().get_ArmyUnits().l;

                            var newLayout = [];
                            for (var i = 0; i < units.length; i++) {
                                var unit = units[i],
                                    armyUnit = {},
                                    x = unit.get_CoordX(),
                                    y = unit.get_CoordY();
                                if (direction == "h")
                                    x = Math.abs(x - 8);
                                if (direction == "v")
                                    y = Math.abs(y - 3);
                                armyUnit.x = x;
                                armyUnit.y = y;
                                armyUnit.id = unit.get_Id();
                                armyUnit.enabled = unit.get_Enabled();
                                newLayout.push(armyUnit);
                            }
                            this.restoreFormation(newLayout);
                        } catch (e) {
                            console.log("Error Mirroring Formation");
                            console.log(e.toString());
                        }
                    },

                    /*
                     * Code from one of the previous authors of an older simulator version. If anyone knows the true author please let me know.
                     */
                    shiftFormation: function (direction, sel) {
                        try {
                            console.log("Shifting Unit Formation: direction:"+ direction +", sel:"+ sel);
                            var v_shift = 0;
                            var h_shift = 0;
                            var select = sel;

                            //Determines shift direction
                            if (direction == "u") var v_shift = -1;
                            if (direction == "d") var v_shift = 1;
                            if (direction == "l") var h_shift = -1;
                            if (direction == "r") var h_shift = 1;
                            //No need to continue
                            if (v_shift == 0 && h_shift == 0 && direction != "n")
                                return;

                            var units = this.getCityPreArmyUnits().get_ArmyUnits().l;

                            var newLayout = [];
                            for (var i = 0; i < units.length; i++) {
                                var unit = units[i];
                                var armyUnit = {};
                                var x = unit.get_CoordX() + h_shift;
                                switch (x) {
                                case 9:
                                    x = 0;
                                    break;
                                case -1:
                                    x = 8;
                                    break;
                                }
                                var y = unit.get_CoordY() + v_shift;
                                switch (y) {
                                case 4:
                                    y = 0;
                                    break;
                                case -1:
                                    y = 3;
                                    break;
                                }
                                if (select != 0 && (unit.get_CoordX() != (select - 1)) && (direction == "u" || direction == "d")) {
                                    armyUnit.y = unit.get_CoordY();
                                } else {
                                    armyUnit.y = y;
                                }
                                if (select != 0 && (unit.get_CoordY() != (select - 1)) && (direction == "l" || direction == "r")) {
                                    armyUnit.x = unit.get_CoordX();
                                } else {
                                    armyUnit.x = x;
                                }
                                armyUnit.id = unit.get_Id();

                                //For enabling/disabling all units
                                if (direction == "n") {
                                    if (typeof localStorage['allUnitsDisabled'] != 'undefined') {
                                        if (localStorage['allUnitsDisabled'] == "yes") {
                                            armyUnit.enabled = unit.set_Enabled(false);
                                        } else {
                                            armyUnit.enabled = unit.set_Enabled(true);
                                        }
                                    } else {
                                        armyUnit.enabled = unit.set_Enabled(false);
                                    }
                                }
                                armyUnit.enabled = unit.get_Enabled();
                                newLayout.push(armyUnit);
                            }
                            //Change disable button to opposite
                            if (direction == "n") {
                                if (localStorage['allUnitsDisabled'] == "yes")
                                    localStorage['allUnitsDisabled'] = "no";
                                else
                                    localStorage['allUnitsDisabled'] = "yes";
                            }
                            this.restoreFormation(newLayout);
                        } catch (e) {
                            console.log("Error Shifting Units");
                            console.log(e.toString());
                        }
                    },

                    restoreFormation: function (layout) {
                        try {
                            var sUnits = layout;

                            var units = this.getCityPreArmyUnits();
                            var units_list = units.get_ArmyUnits().l;

                            for (var idx = 0; idx < sUnits.length; idx++)
                            {
                                var saved_unit = sUnits[idx];
                                var uid = saved_unit.id;
                                for (var i = 0; i < units_list.length; i++)
                                {
                                    if (units_list[i].get_Id() === uid)
                                    {
                                        units_list[i].MoveBattleUnit(saved_unit.x, saved_unit.y);
                                        if (saved_unit.enabled === undefined)
                                            units_list[i].set_Enabled(true);
                                        else
                                            units_list[i].set_Enabled(saved_unit.enabled);
                                    }
                                }
                            }
                            units.UpdateFormation(true);
                        } catch (e) {
                            console.log("Error Restoring Formation");
                            console.log(e.toString());
                        }
                    },

                    getCityPreArmyUnits: function () {
                        var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                        var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                        var formationManager = ownCity.get_CityArmyFormationsManager();
                        ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());

                        return formationManager.GetFormationByTargetBaseId(formationManager.get_CurrentTargetBaseId());
                    },

                    timeoutCmtBtn: function () {
                        this.armyBar.remove(this.unlockCmtBtn);
                        setTimeout(function () {
                            Simulator.getInstance().armyBar.add(Simulator.getInstance().unlockCmtBtn, {
                                left: null,
                                right: 7,
                                bottom: 5
                            });
                        }, 2000);
                    },

                    timeoutRTBtn: function () {
                        this.armyBar.remove(this.unlockRTBtn);
                        setTimeout(function () {
                            Simulator.getInstance().armyBar.add(Simulator.getInstance().unlockRTBtn, {
                                left: null,
                                right: 7,
                                bottom: 97
                            });
                        }, 2000);
                    },

                    backToCombatSetup: function () {
                        var app = qx.core.Init.getApplication();
                        var player_cities = ClientLib.Data.MainData.GetInstance().get_Cities();
                        var current_city = player_cities.get_CurrentCity();
                        try {
                            //This brings the player back to viewing the enemies defense setup PlayArea
                            app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, localStorage.ta_sim_last_city, 0, 0);
                        } catch (e) {
                            console.log("Error closing Simulation Window");
                            console.log(e.toString());
                        }
                    },

                    disableSimulateButtonTimer: function (timer) {
                        try {
                            if (timer >= 1000) {
                                this.isSimButtonDisabled = true;
                                this.simBtn.setLabel(Math.floor(timer / 1000));
                                timer -= 1000;
                                setTimeout(function () {
                                    Simulator.getInstance().disableSimulateButtonTimer(timer);
                                }, 1000)
                            } else {
                                setTimeout(function () {
                                    Simulator.getInstance().simBtn.setEnabled(true);
                                    if (Simulator.OptionWindow.getInstance()._buttonSizeCB.getValue())
                                        Simulator.getInstance().simBtn.setLabel("Simulate");
                                    else
                                        Simulator.getInstance().simBtn.setLabel("S");
                                }, timer)
                                this.isSimButtonDisabled = false;
                            }
                        } catch (e) {
                            console.log("Error disabling simulator button");
                            console.log(e.toString());
                        }
                    },

                    hideArmyTooltips: function () {
                        try {
                            if (typeof localStorage["ArmyUnitTooltipDisabled"] == "undefined") localStorage["ArmyUnitTooltipDisabled"] = "yes";
                            for (var i in ClientLib.Vis.BaseView.BaseView.prototype) {
                                if (typeof ClientLib.Vis.BaseView.BaseView.prototype[i] === "function") {
                                    var j = ClientLib.Vis.BaseView.BaseView.prototype[i].toString();
                                    var k = ClientLib.Vis.BaseView.BaseView.prototype.ShowToolTip.toString();
                                    if (j.indexOf(k) > -1) {
                                        Function("", "ClientLib.Vis.BaseView.BaseView.prototype.ShowToolTip_Original = ClientLib.Vis.BaseView.BaseView.prototype." + i)();
                                        Function("", "ClientLib.Vis.BaseView.BaseView.prototype."+ i +" = function (a) { if(ClientLib.Vis.VisMain.GetInstance().get_Mode()==7 && localStorage['ArmyUnitTooltipDisabled']=='yes') { return; } else { this.ShowToolTip_Original(a); } };")();
                                        break;
                                    }
                                }
                            }
                            qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility_Original = qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility;
                            qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility = function (k) {
                                if (localStorage["ArmyUnitTooltipDisabled"] == "yes") {
                                    qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility_Original(false);
                                } else {
                                    qx.core.Init.getApplication().getArmyUnitTooltipOverlay().setVisibility_Original(k);
                                }
                            };
                        } catch (e) {
                            console.log("Error hideArmyUnitTooltips()");
                            console.log(e.toString());
                        }
                    }
                }
            });

            qx.Class.define("Simulator.StatWindow", {
                type: "singleton",
                extend: qx.ui.window.Window,
                construct: function () {
                    this.base(arguments);

                    this.set({
                        layout: new qx.ui.layout.VBox().set({
                            spacing: 0
                        }),
                        caption: "Simulator Stats",
//                        width: 310,
                        padding: 0,
                        allowMaximize: false,
                        showMaximize: false,
                        allowMinimize: false,
                        showMinimize: false,
                        resizable: true
                    });

                    if (typeof localStorage['statWindowPosLeft'] != 'undefined') {
                        var left = parseInt(localStorage['statWindowPosLeft']);
                        var top = parseInt(localStorage['statWindowPosTop']);
                        this.moveTo(left, top);
                    } else {
                        this.moveTo(124, 31);
                    }
                    var qxApp = qx.core.Init.getApplication();

                    /**
                     *   Setup Images
                     */

                    var img = {
                        Enemy: {
                            All: "FactionUI/icons/icon_arsnl_show_all.png",
                            Base: "FactionUI/icons/icon_arsnl_base_buildings.png",
                            Defense: "FactionUI/icons/icon_def_army_points.png"
                        },
                        Defense: {
                            Infantry: "FactionUI/icons/icon_arsnl_def_squad.png",
                            Vehicle: "FactionUI/icons/icon_arsnl_def_vehicle.png",
                            Building: "FactionUI/icons/icon_arsnl_def_building.png"
                        },
                        Offense: {
                            Infantry: "FactionUI/icons/icon_arsnl_off_squad.png",
                            Vehicle: "FactionUI/icons/icon_arsnl_off_vehicle.png",
                            Aircraft: "FactionUI/icons/icon_arsnl_off_plane.png"
                        },
                        Repair: {
                            Storage: "webfrontend/ui/icons/icn_repair_points.png",
                            Overall: "webfrontend/ui/icons/icn_repair_off_points.png",
                            Infantry: "webfrontend/ui/icons/icon_res_repair_inf.png",
                            Vehicle: "webfrontend/ui/icons/icon_res_repair_tnk.png",
                            Aircraft: "webfrontend/ui/icons/icon_res_repair_air.png"
                        },
                        Loot: {
                            Tiberium: "webfrontend/ui/common/icn_res_tiberium.png",
                            Crystal: "webfrontend/ui/common/icn_res_chrystal.png",
                            Credits: "webfrontend/ui/common/icn_res_dollar.png",
                            RP: "webfrontend/ui/common/icn_res_research_mission.png",
                            Total: "FactionUI/icons/icon_transfer_resource.png"
                        }
                    };

                    /**
                     *   Setup Stats Window
                     */

                    //MISC Section//
                    var misc = new qx.ui.container.Composite(new qx.ui.layout.HBox(5).set({spacing: 0})).set({decorator: "pane-light-plain", allowGrowX: true, marginLeft: 0, marginRight: 0});
                    var miscBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(2)).set({width: 29, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0});

                    var miscOutcome = new qx.ui.basic.Label("O").set({toolTipText: "Outcome", alignX: "right", alignY: "middle"});
                    var miscBattleDuration = new qx.ui.basic.Label("D").set({toolTipText: "Duration", alignX: "right", alignY: "middle"});

                    miscBox.add(miscOutcome);
                    miscBox.add(miscBattleDuration);

                    misc.add(miscBox);

                    for (var i = 0; i < 4; i++) {
                        this.__labelMisc[i] = new qx.ui.container.Composite(new qx.ui.layout.VBox(2)).set({width: 70, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0, decorator: "pane-light-opaque"});

                        this.__labelMiscOutcome[i] = new qx.ui.basic.Atom("-", null).set({alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        this.__labelMiscOutcome[i].getChildControl("icon").set({width: 18, height: 18, scale: true});
                        this.__labelMisc[i].add(this.__labelMiscOutcome[i]);

                        this.__labelMiscBattleDuration[i] = new qx.ui.basic.Label("-:--").set({alignX: "center", alignY: "middle"});
                        this.__labelMisc[i].add(this.__labelMiscBattleDuration[i]);

                        misc.add(this.__labelMisc[i], {flex: 1});
                    }

                    this.__labelMisc[0].addListener("click", function () { this.selectSimulateSpan(0); }, this);
                    this.__labelMisc[1].addListener("click", function () { this.selectSimulateSpan(1); }, this);
                    this.__labelMisc[2].addListener("click", function () { this.selectSimulateSpan(2); }, this);
                    this.__labelMisc[3].addListener("click", function () { this.selectSimulateSpan(3); }, this);
                    this.__labelMisc[0].addListener("dblclick", function () { this.loadSpanFormation(0); }, this);
                    this.__labelMisc[1].addListener("dblclick", function () { this.loadSpanFormation(1); }, this);
                    this.__labelMisc[2].addListener("dblclick", function () { this.loadSpanFormation(2); }, this);
                    this.__labelMisc[3].addListener("dblclick", function () { this.loadSpanFormation(3); }, this);

                    this.add(misc);

                    //Enemy Health Section//
                    var enemyHealthHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({decorator: "pane-light-opaque"});

                    var enemyHealthTitle = new qx.ui.basic.Label(qxApp.tr("tnf:combat target")).set({alignX: "center", font: "font_size_13_bold"});
                    enemyHealthHeader.add(enemyHealthTitle);

                    this.add(enemyHealthHeader);

                    var enemyHealth = new qx.ui.container.Composite(new qx.ui.layout.HBox(5).set({spacing: 0})).set({decorator: "pane-light-plain", allowGrowX: true, marginLeft: 0, marginRight: 0});
                    var enemyHealthBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({width: 29, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0});

                    var eHLabelOverall = new qx.ui.basic.Atom(null, img.Enemy.All).set({toolTipText: qxApp.tr("tnf:total"), toolTipIcon: img.Enemy.All, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});
                    var eHLabelBase = new qx.ui.basic.Atom(null, img.Enemy.Base).set({toolTipText: qxApp.tr("tnf:base"), toolTipIcon: img.Enemy.Base, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});
                    var eHLabelDefense = new qx.ui.basic.Atom(null, img.Enemy.Defense).set({toolTipText: qxApp.tr("tnf:defense"), toolTipIcon: img.Enemy.Defense, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});
                    var eHLabelCY = new qx.ui.basic.Label("CY").set({toolTipText: GAMEDATA.Tech[1].dn, alignX: "right", alignY: "middle"});
                    var eHLabelDF = new qx.ui.basic.Label("DF").set({toolTipText: GAMEDATA.Tech[42].dn, alignX: "right", alignY: "middle"});

                    eHLabelOverall.getChildControl("icon").set({width: 18, height: 18, scale: true});
                    eHLabelBase.getChildControl("icon").set({width: 18, height: 18, scale: true});
                    eHLabelDefense.getChildControl("icon").set({width: 18, height: 18, scale: true});

                    enemyHealthBox.add(eHLabelOverall);
                    enemyHealthBox.add(eHLabelBase);
                    enemyHealthBox.add(eHLabelDefense);
                    enemyHealthBox.add(eHLabelCY);
                    enemyHealthBox.add(eHLabelDF);

                    enemyHealth.add(enemyHealthBox);

                    for (var i = 0; i < 4; i++) {
                        this.__labelEnemy[i] = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({width: 70, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0, decorator: "pane-light-opaque"});

                        this.__labelEnemyOverallHealth[i] = new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"});
                        this.__labelEnemyBaseHealth[i] = new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"});
                        this.__labelEnemyDefenseHealth[i] = new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"});
                        this.__labelEnemyCYHealth[i] = new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"});
                        this.__labelEnemyDFHealth[i] = new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"});

                        this.__labelEnemy[i].add(this.__labelEnemyOverallHealth[i]);
                        this.__labelEnemy[i].add(this.__labelEnemyBaseHealth[i]);
                        this.__labelEnemy[i].add(this.__labelEnemyDefenseHealth[i]);
                        this.__labelEnemy[i].add(this.__labelEnemyCYHealth[i]);
                        this.__labelEnemy[i].add(this.__labelEnemyDFHealth[i]);

                        enemyHealth.add(this.__labelEnemy[i], {flex: 1});
                    }

                    this.__labelEnemy[0].addListener("click", function () { this.selectSimulateSpan(0); }, this);
                    this.__labelEnemy[1].addListener("click", function () { this.selectSimulateSpan(1); }, this);
                    this.__labelEnemy[2].addListener("click", function () { this.selectSimulateSpan(2); }, this);
                    this.__labelEnemy[3].addListener("click", function () { this.selectSimulateSpan(3); }, this);
                    this.__labelEnemy[0].addListener("dblclick", function () { this.loadSpanFormation(0); }, this);
                    this.__labelEnemy[1].addListener("dblclick", function () { this.loadSpanFormation(1); }, this);
                    this.__labelEnemy[2].addListener("dblclick", function () { this.loadSpanFormation(2); }, this);
                    this.__labelEnemy[3].addListener("dblclick", function () { this.loadSpanFormation(3); }, this);

                    this.add(enemyHealth);

                    //Player Repair Section//
                    var playerRepairHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({decorator: "pane-light-opaque"});
                    var playerRepairTitle = new qx.ui.basic.Label(qxApp.tr("tnf:own repair cost")).set({alignX: "center", alignY: "top", font: "font_size_13_bold"});
                    playerRepairHeader.add(playerRepairTitle);
                    this.add(playerRepairHeader);

                    var playerRepair = new qx.ui.container.Composite(new qx.ui.layout.HBox(5).set({spacing: 0})).set({decorator: "pane-light-plain", allowGrowX: true, marginLeft: 0, marginRight: 0});
                    var playerRepairBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({width: 29, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0});

                    var pRLabelStorage = new qx.ui.basic.Atom(null, img.Repair.Storage).set({toolTipText: qxApp.tr("tnf:offense repair time"), toolTipIcon: img.Repair.Storage, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});
                    var pRLabelOverall = new qx.ui.basic.Atom(null, img.Repair.Overall).set({toolTipText: qxApp.tr("tnf:repair points"), toolTipIcon: img.Repair.Overall, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});
                    var pRLabelInf = new qx.ui.basic.Atom(null, img.Repair.Infantry).set({toolTipText: qxApp.tr("tnf:infantry repair title"), toolTipIcon: img.Repair.Infantry, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});
                    var pRLabelVehi = new qx.ui.basic.Atom(null, img.Repair.Vehicle).set({toolTipText: qxApp.tr("tnf:vehicle repair title"), toolTipIcon: img.Repair.Vehicle, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});
                    var pRLabelAir = new qx.ui.basic.Atom(null, img.Repair.Aircraft).set({toolTipText: qxApp.tr("tnf:aircraft repair title"), toolTipIcon: img.Repair.Aircraft, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});

                    pRLabelStorage.getChildControl("icon").set({width: 18, height: 18, scale: true});
                    pRLabelOverall.getChildControl("icon").set({width: 18, height: 18, scale: true});
                    pRLabelInf.getChildControl("icon").set({width: 18, height: 18, scale: true});
                    pRLabelVehi.getChildControl("icon").set({width: 18, height: 18, scale: true});
                    pRLabelAir.getChildControl("icon").set({width: 18, height: 18, scale: true});

                    playerRepairBox.add(pRLabelStorage);
                    playerRepairBox.add(pRLabelOverall);
                    playerRepairBox.add(pRLabelInf);
                    playerRepairBox.add(pRLabelVehi);
                    playerRepairBox.add(pRLabelAir);

                    playerRepair.add(playerRepairBox);

                    for (var i = 0; i < 4; i++) {
                        this.__labelRepair[i] = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({width: 70, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0, decorator: "pane-light-opaque"});
                        this.__labelRepairStorage[i] = new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"});
                        this.__labelRepairOverall[i] = new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"});
                        this.__labelRepairInf[i] = new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"});
                        this.__labelRepairVehi[i] = new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"});
                        this.__labelRepairAir[i] = new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"});

                        this.__labelRepair[i].add(this.__labelRepairStorage[i]);
                        this.__labelRepair[i].add(this.__labelRepairOverall[i]);
                        this.__labelRepair[i].add(this.__labelRepairInf[i]);
                        this.__labelRepair[i].add(this.__labelRepairVehi[i]);
                        this.__labelRepair[i].add(this.__labelRepairAir[i]);

                        playerRepair.add(this.__labelRepair[i], {
                            flex: 1
                        });
                    }

                    this.__labelRepair[0].addListener("click", function () { this.selectSimulateSpan(0); }, this);
                    this.__labelRepair[1].addListener("click", function () { this.selectSimulateSpan(1); }, this);
                    this.__labelRepair[2].addListener("click", function () { this.selectSimulateSpan(2); }, this);
                    this.__labelRepair[3].addListener("click", function () { this.selectSimulateSpan(3); }, this);
                    this.__labelRepair[0].addListener("dblclick", function () { this.loadSpanFormation(0); }, this);
                    this.__labelRepair[1].addListener("dblclick", function () { this.loadSpanFormation(1); }, this);
                    this.__labelRepair[2].addListener("dblclick", function () { this.loadSpanFormation(2); }, this);
                    this.__labelRepair[3].addListener("dblclick", function () { this.loadSpanFormation(3); }, this);

                    this.add(playerRepair);

                    //Battle Loot Section//
                    var battleLootHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({decorator: "pane-light-opaque"});
                    var battleLootTitle = new qx.ui.basic.Label(qxApp.tr("tnf:lootable resources:")).set({alignX: "center", alignY: "top", font: "font_size_13_bold"});
                    battleLootHeader.add(battleLootTitle);
                    this.add(battleLootHeader);

                    var battleLoot = new qx.ui.container.Composite(new qx.ui.layout.HBox(5).set({spacing: 0})).set({decorator: "pane-light-plain", allowGrowX: true, marginLeft: 0, marginRight: 0});
                    var battleLootBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({width: 29, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0});

                    var battleLootTib = new qx.ui.basic.Atom(null, img.Loot.Tiberium).set({toolTipText: qxApp.tr("tnf:tiberium"), toolTipIcon: img.Loot.Tiberium, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});
                    var battleLootCry = new qx.ui.basic.Atom(null, img.Loot.Crystal).set({toolTipText: qxApp.tr("tnf:crystals"), toolTipIcon: img.Loot.Crystal, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});
                    var battleLootCred = new qx.ui.basic.Atom(null, img.Loot.Credits).set({toolTipText: qxApp.tr("tnf:credits"), toolTipIcon: img.Loot.Credits, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});
                    var battleLootRP = new qx.ui.basic.Atom(null, img.Loot.RP).set({toolTipText: qxApp.tr("tnf:research points"), toolTipIcon: img.Loot.RP, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});
                    var battleLootTotal = new qx.ui.basic.Atom(null, img.Loot.Total).set({toolTipText: qxApp.tr("tnf:total") + " " + qxApp.tr("tnf:loot"), toolTipIcon: img.Loot.Total, alignX: "right", alignY: "middle", gap: 0, iconPosition: "top"});

                    battleLootTib.getChildControl("icon").set({width: 18, height: 18, scale: true});
                    battleLootCry.getChildControl("icon").set({width: 18, height: 18, scale: true});
                    battleLootCred.getChildControl("icon").set({width: 18, height: 18, scale: true});
                    battleLootRP.getChildControl("icon").set({width: 18, height: 18, scale: true});
                    battleLootTotal.getChildControl("icon").set({width: 18, height: 18, scale: true});

                    battleLootBox.add(battleLootTib);
                    battleLootBox.add(battleLootCry);
                    battleLootBox.add(battleLootCred);
                    battleLootBox.add(battleLootRP);
                    battleLootBox.add(battleLootTotal);

                    battleLoot.add(battleLootBox);

                    for (var i = 0; i < 4; i++) {
                        this.__labelBattleLoot[i] = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({width: 70, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0, decorator: "pane-light-opaque"});

                        this.__labelBattleLootTib[i] = new qx.ui.basic.Label("-").set({alignX: "right"});
                        this.__labelBattleLootCry[i] = new qx.ui.basic.Label("-").set({alignX: "right"});
                        this.__labelBattleLootCred[i] = new qx.ui.basic.Label("-").set({alignX: "right"});
                        this.__labelBattleLootRP[i] = new qx.ui.basic.Label("-").set({alignX: "right"});
                        this.__labelBattleLootTotal[i] = new qx.ui.basic.Label("-").set({alignX: "right"});

                        this.__labelBattleLoot[i].add(this.__labelBattleLootTib[i]);
                        this.__labelBattleLoot[i].add(this.__labelBattleLootCry[i]);
                        this.__labelBattleLoot[i].add(this.__labelBattleLootCred[i]);
                        this.__labelBattleLoot[i].add(this.__labelBattleLootRP[i]);
                        this.__labelBattleLoot[i].add(this.__labelBattleLootTotal[i]);

                        battleLoot.add(this.__labelBattleLoot[i], {
                            flex: 1
                        });
                    }

                    this.__labelBattleLoot[0].addListener("click", function () { this.selectSimulateSpan(0); }, this);
                    this.__labelBattleLoot[1].addListener("click", function () { this.selectSimulateSpan(1); }, this);
                    this.__labelBattleLoot[2].addListener("click", function () { this.selectSimulateSpan(2); }, this);
                    this.__labelBattleLoot[3].addListener("click", function () { this.selectSimulateSpan(3); }, this);
                    this.__labelBattleLoot[0].addListener("dblclick", function () { this.loadSpanFormation(0); }, this);
                    this.__labelBattleLoot[1].addListener("dblclick", function () { this.loadSpanFormation(1); }, this);
                    this.__labelBattleLoot[2].addListener("dblclick", function () { this.loadSpanFormation(2); }, this);
                    this.__labelBattleLoot[3].addListener("dblclick", function () { this.loadSpanFormation(3); }, this);

                    this.add(battleLoot);

                    this.selectSimulateSpan(0);

                    //Simulate Button//
                    var simButton = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({padding: 5, decorator: "pane-light-opaque"});
                    this.add(simButton);

                    this.simStatBtn = new qx.ui.form.Button(qxApp.tr("tnf:update")).set({allowGrowX: false});
                    this.simStatBtn.setToolTipText("Updates Simulation Stats");
                    this.simStatBtn.addListener("click", this.simulateStats, this);

                    this.simReplayBtn = new qx.ui.form.Button(qxApp.tr("tnf:show combat")).set({allowGrowX: false});
                    this.simReplayBtn.setToolTipText(qxApp.tr("tnf:show battle replay"));
                    this.simReplayBtn.addListener("click", this.doSimReplay, this);

                    this.simReplayBtn.setEnabled(false);

                    simButton.add(this.simStatBtn, {width: "50%"});
                    simButton.add(this.simReplayBtn, {width: "50%"});

                    //Add Header Events//
                    enemyHealthHeader.addListener("click", function () {
                        if (enemyHealth.isVisible())
                            enemyHealth.exclude();
                        else
                            enemyHealth.show();
                    }, this);

                    playerRepairHeader.addListener("click", function () {
                        if (playerRepair.isVisible())
                            playerRepair.exclude();
                        else
                            playerRepair.show();
                    }, this);

                    battleLootHeader.addListener("click", function () {
                        if (battleLoot.isVisible())
                            battleLoot.exclude();
                        else
                            battleLoot.show();
                    }, this);

                    if (typeof localStorage['hideHealth'] != 'undefined') {
                        if (localStorage['hideHealth'] == "yes")
                            enemyHealth.exclude();
                    }

                    if (typeof localStorage['hideRepair'] != 'undefined') {
                        if (localStorage['hideRepair'] == "yes")
                            playerRepair.exclude();
                    }

                    if (typeof localStorage['hideLoot'] != 'undefined') {
                        if (localStorage['hideLoot'] == "yes")
                            battleLoot.exclude();
                    }

                    this.isSimStatButtonDisabled = false;

                    Simulator.getInstance().attachNetEvent(ClientLib.API.Battleground.GetInstance(), "OnSimulateBattleFinished", ClientLib.API.OnSimulateBattleFinished, this, this.__OnSimulateBattleFinished);
                },

                destruct: function () {},

                members: {
                    simStatBtn: null,
                    simReplayBtn: null,
                    armySpanFormations: [],
                    __span: 0,
                    __labelMisc: [],
                    __labelMiscOutcome: [],
                    __labelMiscBattleDuration: [],
                    __labelEnemy: [],
                    __labelEnemyOverallHealth: [],
                    __labelEnemyBaseHealth: [],
                    __labelEnemyDefenseHealth: [],
                    __labelEnemyCYHealth: [],
                    __labelEnemyDFHealth: [],
                    __labelRepair: [],
                    __labelRepairStorage: [],
                    __labelRepairOverall: [],
                    __labelRepairInf: [],
                    __labelRepairVehi: [],
                    __labelRepairAir: [],
                    __labelBattleLoot: [],
                    __labelBattleLootTotal: [],
                    __labelBattleLootTib: [],
                    __labelBattleLootCry: [],
                    __labelBattleLootCred: [],
                    __labelBattleLootRP: [],
                    isSimStatButtonDisabled: null,

                    simulateStats: function () {
                        console.log("Simulating Stats");
                        var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                        if (city != null) {
                            Simulator.getInstance().isSimulation = true;
                            Simulator.getInstance().saveTempFormation();
                            localStorage.ta_sim_last_city = city.get_Id();
                            var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                            ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
                            ClientLib.API.Battleground.GetInstance().SimulateBattle();

                            //Disable Simulate Button
                            if (this.isSimStatButtonDisabled == false) {
                                this.simStatBtn.setEnabled(false);
                                var simStatTimer = 10000;
                                var simStatTimeout = this.disableSimulateStatButtonTimer(simStatTimer);

                                Simulator.getInstance().simBtn.setEnabled(false);
                                var simTimer = 10000;
                                Simulator.getInstance().disableSimulateButtonTimer(simTimer);
                            }

                            setTimeout(function () {
                                var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
                                var battleDuration = battleground.get_BattleDuration();
                                battleDuration = Simulator.StatWindow.getInstance().formatBattleDurationTime(battleDuration);
                                Simulator.StatWindow.getInstance().__labelMiscBattleDuration[Simulator.StatWindow.getInstance().__span].setValue(battleDuration);
                            }, 1000);

                            if (this.simReplayBtn.getEnabled() == false)
                                this.simReplayBtn.setEnabled(true);
                        }
                    },

                    doSimReplay: function () {
                        try {
                            Simulator.getInstance().isSimulation = true;
                            var app = qx.core.Init.getApplication();
                            app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, localStorage.ta_sim_last_city, 0, 0);

                            var autoSim = localStorage['autoSimulate'];

                            if (typeof autoSim != 'undefined') {
                                if (autoSim == "yes") {
                                    var speed = localStorage['simulateSpeed'];
                                    setTimeout(function () {
                                        var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
                                        battleground.RestartReplay();
                                        battleground.set_ReplaySpeed(parseInt(speed));
                                    }, 1000)
                                }
                            }
                        } catch (e) {
                            console.log("Error attempting to show Simulation Replay");
                            console.log(e.toString());
                        }
                    },

                    __OnSimulateBattleFinished: function (data) {
                        this.getSimulationInfo(data);
                    },

                    formatBattleDurationTime: function (time) {
                        var seconds = time / 1000;
                        var minutes = seconds / 60;
                        minutes = Math.round(minutes - 0.5);
                        seconds = Math.round((seconds - 0.5) - (minutes * 60));

                        if (seconds < 10) {
                            seconds = "0" + seconds;
                        }
                        return minutes + ":" + seconds;
                    },

                    calculateRepairCosts: function (id, level, sHealth, eHealth, mHealth) {
                        repairCosts = {
                            "RT": 0,
                            "C": 0
                        };
                        var dmgRatio = 1;
                        if (sHealth != eHealth) {
                            if (eHealth > 0) {
                                dmgRatio = ((sHealth - eHealth) / 16) / mHealth;
                            } else {
                                dmgRatio = (sHealth / 16) / mHealth;
                            }
                            //var currOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                            var costs = ClientLib.API.Util.GetUnitRepairCosts(level, id, dmgRatio);

                            for (var idx = 0; idx < costs.length; idx++) {
                                var uCosts = costs[idx];
                                var cType = parseInt(uCosts.Type);
                                switch (cType) {
                                case ClientLib.Base.EResourceType.Crystal:
                                    repairCosts["C"] += uCosts.Count;
                                    break;
                                case ClientLib.Base.EResourceType.RepairChargeBase:
                                case ClientLib.Base.EResourceType.RepairChargeInf:
                                case ClientLib.Base.EResourceType.RepairChargeVeh:
                                case ClientLib.Base.EResourceType.RepairChargeAir:
                                    repairCosts["RT"] += uCosts.Count;
                                    break;
                                }
                            }
                        }
                        return repairCosts;
                    },

                    getSimulationInfo: function (data) {
                        console.log("Getting Player Unit Damage");
                        try {
                            var crystals = 0,
                                infCry = 0,
                                vehiCry = 0,
                                airCry = 0;
                            var allSH = 0,
                                allEH = 0,
                                allMH = 0,
                                allHP = 0;
                            var baseSH = 0,
                                baseEH = 0,
                                baseMH = 0,
                                baseHP = 0;
                            var defSH = 0,
                                defEH = 0,
                                defMH = 0,
                                defHP = 0;
                            var infSH = 0,
                                infEH = 0,
                                infMH = 0,
                                infHP = 0;
                            var vehiSH = 0,
                                vehiEH = 0,
                                vehiMH = 0,
                                vehiHP = 0;
                            var airSH = 0,
                                airEH = 0,
                                airMH = 0,
                                airHP = 0;
                            var infRT = 0,
                                vehiRT = 0,
                                airRT = 0;
                            var cySH = 0,
                                cyEH = 0,
                                cyMH = 0,
                                cyHP = 0;
                            var dfSH = 0,
                                dfEH = 0,
                                dfMH = 0,
                                dfHP = 0;
                            var costs = {};
                            var entities = []; //for calculating loot
                            var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                            var defBonus = city.get_AllianceDefenseBonus();
                            for (var idx = 0; idx < data.length; idx++) {
                                var unitData = data[idx].Value;
                                var uMDBID = unitData.t;
                                var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(uMDBID);
                                var level = unitData.l;
                                var sHealth = unitData.sh;
                                var eHealth = unitData.h;
                                var mHealth = Simulator.getInstance().GetUnitMaxHealth(level, unit, false);

                                //for factoring in Player's durability boost from POI's
                                /*if (city != null && unit.pt != ClientLib.Base.EPlacementType.Offense)
                            {
                                var cityType = city.get_CityFaction();
                                switch(cityType)
                            {
                                case ClientLib.Base.EFactionType.GDIFaction:
                                case ClientLib.Base.EFactionType.NODFaction:
                                //var mod = ClientLib.Vis.VisMain.GetInstance().get_Battleground().GetNerfAndBoostModifier(level, defBonus);
                                var mod = ClientLib.Base.Util.GetNerfAndBoostModifier(level, defBonus);
                                break;
                                }
                                }*/

                                var pType = unit.pt;
                                var mType = unit.mt;
                                entities.push(unitData);
                                switch (pType) {
                                case ClientLib.Base.EPlacementType.Defense:
                                    allMH += mHealth;
                                    allEH += eHealth;
                                    defMH += mHealth;
                                    defEH += eHealth;
                                    break;
                                case ClientLib.Base.EPlacementType.Offense:
                                    switch (mType) {
                                    case ClientLib.Base.EUnitMovementType.Feet:
                                        infMH += mHealth;
                                        //infSH += sHealth;
                                        infEH += eHealth;
                                        costs = this.calculateRepairCosts(uMDBID, level, sHealth, eHealth, mHealth);
                                        infRT += costs["RT"];
                                        infCry += costs["C"];
                                        crystals += costs["C"];
                                        break;
                                    case ClientLib.Base.EUnitMovementType.Wheel:
                                    case ClientLib.Base.EUnitMovementType.Track:
                                        vehiMH += mHealth;
                                        //vehiSH += sHealth;
                                        vehiEH += eHealth;
                                        costs = this.calculateRepairCosts(uMDBID, level, sHealth, eHealth, mHealth);
                                        vehiRT += costs["RT"];
                                        vehiCry += costs["C"];
                                        crystals += costs["C"];
                                        break;
                                    case ClientLib.Base.EUnitMovementType.Air:
                                    case ClientLib.Base.EUnitMovementType.Air2:
                                        airMH += mHealth;
                                        //airSH += sHealth;
                                        airEH += eHealth;
                                        costs = this.calculateRepairCosts(uMDBID, level, sHealth, eHealth, mHealth);
                                        airRT += costs["RT"];
                                        airCry += costs["C"];
                                        crystals += costs["C"];
                                        break;
                                    }
                                    break;
                                case ClientLib.Base.EPlacementType.Structure:
                                    allMH += mHealth;
                                    allEH += eHealth;
                                    baseMH += mHealth;
                                    baseEH += eHealth;
                                    switch (uMDBID) {
                                    case 151:
                                    case 112:
                                    case 233:
                                    case 177: //Construction Yard
                                        cySH = sHealth;
                                        cyMH = mHealth;
                                        cyEH = eHealth;
                                        break;
                                    case 158:
                                    case 131:
                                    case 195: //Defense Facility
                                        dfMH = mHealth;
                                        dfEH = eHealth;
                                        break;
                                    }
                                    break;
                                }
                            }

                            crystals = Simulator.getInstance().formatNumbersCompact(crystals);
                            infCry = Simulator.getInstance().formatNumbersCompact(infCry);
                            vehiCry = Simulator.getInstance().formatNumbersCompact(vehiCry);
                            airCry = Simulator.getInstance().formatNumbersCompact(airCry);

                            var allOffRTInSeconds = Math.max(infRT, vehiRT, airRT);
                            var allOffRT = phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(Math.max(infRT, vehiRT, airRT)));
                            infRT = phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(infRT));
                            vehiRT = phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(vehiRT));
                            airRT = phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(airRT));
                            allHP = (allMH == 0) ? 100 : (allEH / (allMH * 16)) * 100;
                            baseHP = (baseMH == 0) ? 100 : (baseEH / (baseMH * 16)) * 100;
                            defHP = (defMH == 0) ? 100 : (defEH / (defMH * 16)) * 100;
                            cyHP = (cyMH == 0) ? 100 : (cyEH / (cyMH * 16)) * 100;
                            dfHP = (dfMH == 0) ? 100 : (dfEH / (dfMH * 16)) * 100;

                            infHP = (infMH == 0) ? 100 : (infEH / (infMH * 16)) * 100;
                            vehiHP = (vehiMH == 0) ? 100 : (vehiEH / (vehiMH * 16)) * 100;
                            airHP = (airMH == 0) ? 100 : (airEH / (airMH * 16)) * 100;

                            var allOffHP = ((infEH + vehiEH + airEH) / ((infMH + vehiMH + airMH) * 16)) * 100;

                            //Set MISC and Base Health Labels
                            var qxApp = qx.core.Init.getApplication();
                            if (allOffHP == 0) {
                                this.__labelMiscOutcome[this.__span].resetLabel();
                                this.__labelMiscOutcome[this.__span].setToolTipText(qxApp.tr("tnf:total defeat"));
                                this.__labelMiscOutcome[this.__span].setIcon("FactionUI/icons/icon_reports_total_defeat.png");
                            } else if (cyEH == 0) {
                                this.__labelMiscOutcome[this.__span].resetLabel();
                                this.__labelMiscOutcome[this.__span].setToolTipText(qxApp.tr("tnf:total victory"));
                                this.__labelMiscOutcome[this.__span].setIcon("FactionUI/icons/icon_reports_total_victory.png");
                            } else {
                                this.__labelMiscOutcome[this.__span].resetLabel();
                                this.__labelMiscOutcome[this.__span].setToolTipText(qxApp.tr("tnf:victory"));
                                this.__labelMiscOutcome[this.__span].setIcon("FactionUI/icons/icon_reports_victory.png");
                            }

                            this.__labelEnemyOverallHealth[this.__span].setValue(allHP.toFixed(2) + ' %');
                            this.setEHLabelColor(this.__labelEnemyOverallHealth[this.__span], allHP.toFixed(2));

                            this.__labelEnemyDefenseHealth[this.__span].setValue(defHP.toFixed(2) + ' %');
                            this.setEHLabelColor(this.__labelEnemyDefenseHealth[this.__span], defHP.toFixed(2));

                            this.__labelEnemyBaseHealth[this.__span].setValue(baseHP.toFixed(2) + ' %');
                            this.setEHLabelColor(this.__labelEnemyBaseHealth[this.__span], baseHP.toFixed(2));

                            this.__labelEnemyCYHealth[this.__span].setValue(cyHP.toFixed(2) + ' %');
                            this.setEHLabelColor(this.__labelEnemyCYHealth[this.__span], cyHP.toFixed(2));

                            this.__labelEnemyDFHealth[this.__span].setValue(dfHP.toFixed(2) + ' %');
                            this.setEHLabelColor(this.__labelEnemyDFHealth[this.__span], dfHP.toFixed(2));

                            var getRTSelection = localStorage['getRTSelection'];

                            var qxApp = qx.core.Init.getApplication();
                            if (typeof getRTSelection != 'undefined') {
                                if (getRTSelection == "rt") {
                                    this.__labelRepairOverall[this.__span].setValue(allOffRT);
                                    this.__labelRepairOverall[this.__span].setToolTipText(qxApp.tr("tnf:crystals") + ": " + crystals + "</br>HP: " + allOffHP.toFixed(2) + "%");
                                    this.__labelRepairInf[this.__span].setValue(infRT);
                                    this.__labelRepairInf[this.__span].setToolTipText(qxApp.tr("tnf:crystals") + ": " + infCry + "</br>HP: " + infHP.toFixed(2) + "%");
                                    this.__labelRepairVehi[this.__span].setValue(vehiRT);
                                    this.__labelRepairVehi[this.__span].setToolTipText(qxApp.tr("tnf:crystals") + ": " + vehiCry + "</br>HP: " + vehiHP.toFixed(2) + "%");
                                    this.__labelRepairAir[this.__span].setValue(airRT);
                                    this.__labelRepairAir[this.__span].setToolTipText(qxApp.tr("tnf:crystals") + ": " + airCry + "</br>HP: " + airHP.toFixed(2) + "%");
                                } else if (getRTSelection == "cry") {
                                    this.__labelRepairOverall[this.__span].setValue(crystals);
                                    this.__labelRepairOverall[this.__span].setToolTipText("RT: " + allOffRT + "</br>HP: " + allOffHP.toFixed(2) + "%");
                                    this.__labelRepairInf[this.__span].setValue(infCry);
                                    this.__labelRepairInf[this.__span].setToolTipText("RT: " + infRT + "</br>HP: " + infHP.toFixed(2) + "%");
                                    this.__labelRepairVehi[this.__span].setValue(vehiCry);
                                    this.__labelRepairVehi[this.__span].setToolTipText("RT: " + vehiRT + "</br>HP: " + vehiHP.toFixed(2) + "%");
                                    this.__labelRepairAir[this.__span].setValue(airCry);
                                    this.__labelRepairAir[this.__span].setToolTipText("RT: " + airRT + "</br>HP: " + airHP.toFixed(2) + "%");
                                } else if (getRTSelection == "hp") {
                                    this.__labelRepairOverall[this.__span].setValue(allOffHP.toFixed(2) + " %");
                                    this.__labelRepairOverall[this.__span].setToolTipText("RT: " + allOffRT + "</br>" + qxApp.tr("tnf:crystals") + ": " + crystals);
                                    this.__labelRepairInf[this.__span].setValue(infHP.toFixed(2) + " %");
                                    this.__labelRepairInf[this.__span].setToolTipText("RT: " + infRT + "</br>" + qxApp.tr("tnf:crystals") + ": " + infCry);
                                    this.__labelRepairVehi[this.__span].setValue(vehiHP.toFixed(2) + " %");
                                    this.__labelRepairVehi[this.__span].setToolTipText("RT: " + vehiRT + "</br>" + qxApp.tr("tnf:crystals") + ": " + vehiCry);
                                    this.__labelRepairAir[this.__span].setValue(airHP.toFixed(2) + " %");
                                    this.__labelRepairAir[this.__span].setToolTipText("RT: " + airRT + "</br>" + qxApp.tr("tnf:crystals") + ": " + airCry);
                                } else {
                                    this.__labelRepairOverall[this.__span].setValue(allOffRT);
                                    this.__labelRepairOverall[this.__span].setToolTipText(qxApp.tr("tnf:crystals") + ": " + crystals + "</br>HP: " + allOffHP.toFixed(2) + "%");
                                    this.__labelRepairInf[this.__span].setValue(infRT);
                                    this.__labelRepairInf[this.__span].setToolTipText(qxApp.tr("tnf:crystals") + ": " + infCry + "</br>HP: " + infHP.toFixed(2) + "%");
                                    this.__labelRepairVehi[this.__span].setValue(vehiRT);
                                    this.__labelRepairVehi[this.__span].setToolTipText(qxApp.tr("tnf:crystals") + ": " + vehiCry + "</br>HP: " + vehiHP.toFixed(2) + "%");
                                    this.__labelRepairAir[this.__span].setValue(airRT);
                                    this.__labelRepairAir[this.__span].setToolTipText(qxApp.tr("tnf:crystals") + ": " + airCry + "</br>HP: " + airHP.toFixed(2) + "%");
                                }
                            } else //default
                            {
                                this.__labelRepairOverall[this.__span].setValue(allOffRT);
                                this.__labelRepairOverall[this.__span].setToolTipText(qxApp.tr("tnf:crystals") + ": " + crystals + "</br>HP: " + allOffHP.toFixed(2) + "%");
                                this.__labelRepairInf[this.__span].setValue(infRT);
                                this.__labelRepairInf[this.__span].setToolTipText(qxApp.tr("tnf:crystals") + ": " + infCry + "</br>HP: " + infHP.toFixed(2) + "%");
                                this.__labelRepairVehi[this.__span].setValue(vehiRT);
                                this.__labelRepairVehi[this.__span].setToolTipText(qxApp.tr("tnf:crystals") + ": " + vehiCry + "</br>HP: " + vehiHP.toFixed(2) + "%");
                                this.__labelRepairAir[this.__span].setValue(airRT);
                                this.__labelRepairAir[this.__span].setToolTipText(qxApp.tr("tnf:crystals") + ": " + airCry + "</br>HP: " + airHP.toFixed(2) + "%");
                            }

                            this.setRTLabelColor(this.__labelRepairOverall[this.__span], allOffHP.toFixed(2));
                            this.setRTLabelColor(this.__labelRepairInf[this.__span], infHP.toFixed(2));
                            this.setRTLabelColor(this.__labelRepairVehi[this.__span], vehiHP.toFixed(2));
                            this.setRTLabelColor(this.__labelRepairAir[this.__span], airHP.toFixed(2));

                            if (infRT === allOffRT && infHP < 100)
                                this.__labelRepairInf[this.__span].setTextColor("black");
                            else if (vehiRT === allOffRT && vehiHP < 100)
                                this.__labelRepairVehi[this.__span].setTextColor("black");
                            else if (airRT === allOffRT && airHP < 100)
                                this.__labelRepairAir[this.__span].setTextColor("black");

                            var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

                            var currRTStorage = Math.max(ownCity.GetResourceCount(8), ownCity.GetResourceCount(9), ownCity.GetResourceCount(10));
                            this.__labelRepairStorage[this.__span].setValue(phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(currRTStorage)));

                            if (currRTStorage > allOffRTInSeconds)
                                this.__labelRepairStorage[this.__span].setTextColor("darkgreen");
                            else
                                this.__labelRepairStorage[this.__span].setTextColor("red");

                            //Calculates the possible resources gained from simulation
                            this.calcResources(entities);

                            this.saveSpanFormation(this.__span);
                        } catch (e) {
                            console.log("Error Getting Player Unit Damage");
                            console.log(e.toString());
                        }
                    },

                    /**
                     * All credit for the main layout of this function goes to KRS_L. Thanks to Topper42 and Deyhak for talking about it in the forums!
                     */
                    calcResources: function (entities) {
                        try {
                            //So we can splice and reduce the amount of time looping later on
                            buildingEnts = entities;
                            defEnts = entities;

                            var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();

                            //Pretty sure we just need the EResourceType
                            var lootArray = {
                                1: 0,
                                2: 0,
                                3: 0,
                                6: 0
                            }; //1: Tib, 2: Cry, 3: Gold(credits) 6: RP
                            var lootArray2 = {
                                1: 0,
                                2: 0,
                                3: 0,
                                6: 0
                            };
                            var mod = -1;
                            var isFirstHarvester = false;
                            //Based on forums we need to cycle through the grid
                            //Info needed is the building or structure information and the defensive units information
                            //Structure data can be retrieved by using get_City() and Defense data by get_DefenseSetup()
                            //See ClientLib.js.txt if you have it or can find it. These functions are under Type:ClientLib.Vis.VisMain

                            //Let's do X coords as our outer loop there should be 0-8 or 9 slots.
                            for (var x = 0; x < 9; x++) {

                                //Inner loop will be Y should be 8 slots or 0-7
                                for (var y = 0; y < 8; y++) {
                                    var width = ClientLib.Vis.VisMain.GetInstance().get_City().get_GridWidth();
                                    var height = ClientLib.Vis.VisMain.GetInstance().get_City().get_GridHeight();

                                    //Per the forums we should multiply x by the width and y by the height
                                    //Well GetObjectFromPosition doesn't work which is in the ClientLib.js.txt, but KRS_L has found the new function
                                    var cityEntity = ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition(x * width, y * height);

                                    //Ok we have the city object or at least we hope we do.
                                    //Forums says this can return empty fields so we need to check for that
                                    if (cityEntity !== null && typeof cityEntity.get_BuildingName == 'function') {
                                        try {
                                            //Now loop through the entities from the simulation until we find a match
                                            if (typeof entities != 'undefined') {
                                                for (var idx = 0; idx < buildingEnts.length; idx++) {
                                                    var entity = buildingEnts[idx];
                                                    var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(entity.t);

                                                    //We've got a match!
                                                    if (unit.dn == cityEntity.get_BuildingName()) {
                                                        mHealth = Simulator.getInstance().GetUnitMaxHealth(entity.l, unit);
                                                        mod = ((entity.sh - entity.h) / 16) / mHealth;
                                                        if (unit.dn == "Harvester") {
                                                            var mod2 = cityEntity.get_BuildingDetails().get_HitpointsPercent();
                                                            if (Math.round(mod2 * 100) != Math.round(mod * 100)) {
                                                                mod = mod2;
                                                            }
                                                        }
                                                        var isSpliced = buildingEnts.splice(idx, 1);
                                                        break;
                                                    }
                                                }
                                            }
                                        } catch (e) {

                                            console.log("Error Calculating Resources 2");
                                            console.log(e);
                                            console.log(e.name + " " + e.message);
                                        }
                                        try {
                                            var buildingDetails = cityEntity.get_BuildingDetails();

                                            if (mod == -1) {
                                                mod = buildingDetails.get_HitpointsPercent();
                                                if (cityEntity.get_BuildingName() == "Harvester") {
                                                    var mod2 = cityEntity.get_BuildingDetails().get_HitpointsPercent();
                                                    if (Math.round(mod2 * 100) != Math.round(mod * 100)) {
                                                        mod = mod2;
                                                    }
                                                }
                                            }
                                        } catch (e) {
                                            console.log("Error Calculating Resources 3");
                                            console.log(e);
                                            console.log(e.name + " " + e.message);
                                        }

                                        var reqs = buildingDetails.get_UnitLevelRepairRequirements();

                                        for (var idx2 = 0; idx2 < reqs.length; idx2++) {
                                            var type = reqs[idx2].Type;
                                            var count = reqs[idx2].Count;
                                            lootArray[type] += Math.round((mod * count) - 0.5); //Rounding otherwise floating numbers
                                        }

                                        //reset mod
                                        mod = -1;
                                    }
                                }
                            }

                            for (var x = 0; x < 9; x++) {

                                //Inner loop will be Y should be 8 slots or 0-7
                                for (var y = 8; y < 16; y++) {
                                    try {
                                        var width = ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().get_GridWidth();
                                        var height = ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().get_GridHeight();
                                        if (y == 8) {
                                            width += 1;
                                            height += 1;
                                        }
                                        //Now do the same for defense units
                                        var defEntity = ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition(x * width, y * height);
                                        if (defEntity !== null && defEntity.get_VisObjectType() != ClientLib.Vis.VisObject.EObjectType.CityBuildingType && typeof defEntity.get_UnitDetails == 'function') {
                                            if (typeof entities != 'undefined') {
                                                for (var idx = 0; idx < defEnts.length; idx++) {
                                                    var entity = defEnts[idx];
                                                    var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(entity.t);

                                                    //Got a match!
                                                    if (unit.dn == defEntity.get_UnitName()) {
                                                        mHealth = Simulator.getInstance().GetUnitMaxHealth(entity.l, unit);
                                                        mod = ((entity.sh - entity.h) / 16) / mHealth;
                                                        //mod = defEntity.get_UnitDetails().get_HitpointsPercent();
                                                        var isSpliced = defEnts.splice(idx, 1);
                                                        break;
                                                    }
                                                }
                                            }

                                            var unitDetails = defEntity.get_UnitDetails();

                                            if (mod == -1)
                                                mod = unitDetails.get_HitpointsPercent();

                                            var reqs = unitDetails.get_UnitLevelRepairRequirements();

                                            for (var idx2 = 0; idx2 < reqs.length; idx2++) {
                                                var type = reqs[idx2].Type;
                                                var count = reqs[idx2].Count;
                                                lootArray[type] += Math.round((mod * count) - 0.5); //Rounding otherwise floating numbers
                                            }

                                            mod = -1;
                                        }
                                    } catch (e) {
                                        console.log("Error Calculating Resources 4");
                                        console.log(e);
                                        console.log(e.name + " " + e.message);
                                    }
                                }
                            }

                            var totalLoot = lootArray[1] + lootArray[2] + lootArray[3] + lootArray[6];
                            if (typeof entities == 'undefined') {
                                for (i = 0; i < 4; i++) {
                                    this.__labelBattleLootTotal[i].setValue(Simulator.getInstance().formatNumbersCompact(totalLoot));
                                    this.__labelBattleLootTotal[i].setToolTipText("");
                                    this.__labelBattleLootTib[i].setValue(Simulator.getInstance().formatNumbersCompact(lootArray[1]));
                                    this.__labelBattleLootTib[i].setToolTipText("");
                                    this.__labelBattleLootCry[i].setValue(Simulator.getInstance().formatNumbersCompact(lootArray[2]));
                                    this.__labelBattleLootCry[i].setToolTipText("");
                                    this.__labelBattleLootCred[i].setValue(Simulator.getInstance().formatNumbersCompact(lootArray[3]));
                                    this.__labelBattleLootCred[i].setToolTipText("");
                                    this.__labelBattleLootRP[i].setValue(Simulator.getInstance().formatNumbersCompact(lootArray[6]));
                                    this.__labelBattleLootRP[i].setToolTipText("");
                                }
                            } else {
                                this.__labelBattleLootTotal[this.__span].setToolTipText("Base: " + this.__labelBattleLootTotal[this.__span].getValue());
                                this.__labelBattleLootTotal[this.__span].setValue(Simulator.getInstance().formatNumbersCompact(totalLoot));
                                this.__labelBattleLootTib[this.__span].setToolTipText("Base: " + this.__labelBattleLootTib[this.__span].getValue());
                                this.__labelBattleLootTib[this.__span].setValue(Simulator.getInstance().formatNumbersCompact(lootArray[1]));
                                this.__labelBattleLootCry[this.__span].setToolTipText("Base: " + this.__labelBattleLootCry[this.__span].getValue());
                                this.__labelBattleLootCry[this.__span].setValue(Simulator.getInstance().formatNumbersCompact(lootArray[2]));
                                this.__labelBattleLootCred[this.__span].setToolTipText("Base: " + this.__labelBattleLootCred[this.__span].getValue());
                                this.__labelBattleLootCred[this.__span].setValue(Simulator.getInstance().formatNumbersCompact(lootArray[3]));
                                this.__labelBattleLootRP[this.__span].setToolTipText("Base: " + this.__labelBattleLootRP[this.__span].getValue());
                                this.__labelBattleLootRP[this.__span].setValue(Simulator.getInstance().formatNumbersCompact(lootArray[6]));
                            }
                        } catch (e) {
                            console.log("Error Calculating Resources");
                            console.log(e);
                            console.log(e.name + " " + e.message);
                        }

                    },

                    setRTLabelColor: function (label, number) {
                        if (number < 25)
                            label.setTextColor("red");
                        else if (number < 75)
                            label.setTextColor("orangered");
                        else
                            label.setTextColor("darkgreen");
                    },

                    setEHLabelColor: function (label, number) {
                        if (number < 25)
                            label.setTextColor("darkgreen");
                        else if (number < 75)
                            label.setTextColor("orangered");
                        else
                            label.setTextColor("red");
                    },

                    disableSimulateStatButtonTimer: function (timer) {
                        try {
                            if (timer >= 1000) {
                                this.isSimStatButtonDisabled = true;
                                this.simStatBtn.setLabel(Math.floor(timer / 1000));
                                timer -= 1000;
                                setTimeout(function () {
                                    Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(timer);
                                }, 1000)
                            } else {
                                setTimeout(function () {
                                    Simulator.StatWindow.getInstance().simStatBtn.setEnabled(true);
                                    Simulator.StatWindow.getInstance().simStatBtn.setLabel("Update");
                                }, timer)
                                this.isSimStatButtonDisabled = false;
                            }
                        } catch (e) {
                            console.log("Error disabling simulator button");
                            console.log(e.toString());
                        }
                    },

                    selectSimulateSpan: function (span) {
                        this.__span = span;
                        for (var i = 0; i < 4; i++) {
                            if (i == this.__span) {
                                var j = "pane-light-opaque";
                                var k = 1;
                            } else {
                                var j = "pane-light-plain";
                                var k = 0.6;
                            }
                            this.__labelMisc[i].set({
                                decorator: j,
                                opacity: k
                            });
                            this.__labelEnemy[i].set({
                                decorator: j,
                                opacity: k
                            });
                            this.__labelRepair[i].set({
                                decorator: j,
                                opacity: k
                            });
                            this.__labelBattleLoot[i].set({
                                decorator: j,
                                opacity: k
                            });
                        }
                    },

                    loadSpanFormation: function (stat) {
                        try {
                            Simulator.getInstance().restoreFormation(this.armySpanFormations[stat]);
                        } catch (e) {
                            console.log("Error loading Stat Formation");
                            console.log(e.toString());
                        }
                    },

                    saveSpanFormation: function (stat) {
                        try {
                            var formation = [];
                            var unitList = Simulator.getInstance().getCityPreArmyUnits().get_ArmyUnits().l;

                            for (var i = 0; i < unitList.length; i++) {
                                var unit = unitList[i];
                                var unitInfo = {};
                                unitInfo.x = unit.get_CoordX();
                                unitInfo.y = unit.get_CoordY();
                                unitInfo.id = unit.get_Id();
                                unitInfo.enabled = unit.get_Enabled();

                                formation.push(unitInfo);
                            }
                            this.armySpanFormations[stat] = formation;
                        } catch (e) {
                            console.log("Error Saving Stat Formation");
                            console.log(e.toString());
                        }
                    }
                }
            });

            qx.Class.define("Simulator.OptionWindow", {
                type: "singleton",
                extend: qx.ui.window.Window,

                construct: function () {
                    this.base(arguments);
                    this.setLayout(new qx.ui.layout.VBox(5));
                    this.addListener("resize", function () {
                        this.center();
                    }, this);

                    this.set({
                        caption: "Simulator Options",
                        width: 300,
                        height: 300,
                        allowMaximize: false,
                        showMaximize: false,
                        allowMinimize: false,
                        showMinimize: false
                    });
                    var tabView = new qx.ui.tabview.TabView();
                    tabView.set({
                        height: 295,
                        width: 295
                    });
                    var genPage = new qx.ui.tabview.Page("General");
                    genLayout = new qx.ui.layout.VBox(5);
                    genPage.setLayout(genLayout);

                    //Add General Page Items
                    var buttonsHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                    buttonsHeader.setThemedFont("bold");
                    var buttonsTitle = new qx.ui.basic.Label("Buttons:");
                    buttonsHeader.add(buttonsTitle);
                    genPage.add(buttonsHeader);

                    var buttonsBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
                    this._buttonLocCB = new qx.ui.form.CheckBox("Right Side");
                    this._buttonSizeCB = new qx.ui.form.CheckBox("Normal Size");
                    this._buttonLocCB.addListener("changeValue", this._onButtonLocChange, this);
                    this._buttonSizeCB.addListener("changeValue", this._onButtonSizeChange, this);
                    if (typeof localStorage['isBtnRight'] != 'undefined') {
                        if (localStorage['isBtnRight'] == "yes")
                            this._buttonLocCB.setValue(true);
                        else
                            this._buttonLocCB.setValue(false);
                    }

                    if (typeof localStorage['isBtnNorm'] != 'undefined') {
                        if (localStorage['isBtnNorm'] == "yes")
                            this._buttonSizeCB.setValue(true);
                        else
                            this._buttonSizeCB.setValue(false);

                        //Need to do this
                        this.setButtonSize();
                    }

                    this._disableRTBtnCB = new qx.ui.form.CheckBox("Disable Repair Button");
                    this._disableRTBtnCB.addListener("changeValue", this._onDisableRTBtnChange, this);
                    if (typeof localStorage['isRTBtnDisabled'] != 'undefined') {
                        if (localStorage['isRTBtnDisabled'] == "yes")
                            this._disableRTBtnCB.setValue(true);
                        else
                            this._disableRTBtnCB.setValue(false);
                    }

                    this._disableCmtBtnCB = new qx.ui.form.CheckBox("Disable Combat Button");
                    this._disableCmtBtnCB.addListener("changeValue", this._onDisableCmtBtnChange, this);
                    if (typeof localStorage['isCmtBtnDisabled'] != 'undefined') {
                        if (localStorage['isCmtBtnDisabled'] == "yes")
                            this._disableCmtBtnCB.setValue(true);
                        else
                            this._disableCmtBtnCB.setValue(false);
                    }

                    buttonsBox.add(this._buttonSizeCB);
                    buttonsBox.add(this._buttonLocCB);
                    buttonsBox.add(this._disableRTBtnCB);
                    buttonsBox.add(this._disableCmtBtnCB);
                    genPage.add(buttonsBox);

                    var simulatorHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({
                        marginTop: 10
                    });
                    simulatorHeader.setThemedFont("bold");
                    var simulatorTitle = new qx.ui.basic.Label("Simulator:");
                    simulatorHeader.add(simulatorTitle);
                    genPage.add(simulatorHeader);

                    var simulatorBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
                    this._autoSimulateCB = new qx.ui.form.CheckBox("Auto Start Simulation");

                    if (typeof localStorage['autoSimulate'] != 'undefined') {
                        if (localStorage['autoSimulate'] == "yes")
                            this._autoSimulateCB.setValue(true);
                    }

                    var simulatorBox2 = new qx.ui.container.Composite(new qx.ui.layout.Grid(5)).set({
                        marginLeft: 20
                    });
                    var simSpeedOpt1 = new qx.ui.form.RadioButton("x1");
                    var simSpeedOpt2 = new qx.ui.form.RadioButton("x2");
                    var simSpeedOpt4 = new qx.ui.form.RadioButton("x4");
                    this._simSpeedGroup = new qx.ui.form.RadioGroup(simSpeedOpt1, simSpeedOpt2, simSpeedOpt4);
                    this._simSpeedGroup.addListener("changeSelection", this._onSimSpeedChange, this);
                    this._autoSimulateCB.addListener("changeValue", this._onAutoSimulateChange, this);
                    if (typeof localStorage['simulateSpeed'] != 'undefined') {
                        var options = this._simSpeedGroup.getSelectables(false);

                        if (localStorage['simulateSpeed'] == "2")
                            options[1].setValue(true);
                        else if (localStorage['simulateSpeed'] == "4")
                            options[2].setValue(true);
                        else
                            options[0].setValue(true);
                    }
                    if (this._autoSimulateCB.getValue() == false) {
                        this._simSpeedGroup.setEnabled(false);
                    }

                    simulatorBox2.add(simSpeedOpt1, {row: 0, column: 0});
                    simulatorBox2.add(simSpeedOpt2, {row: 0, column: 1});
                    simulatorBox2.add(simSpeedOpt4, {row: 0, column: 2});
                    simulatorBox.add(this._autoSimulateCB);
                    simulatorBox.add(simulatorBox2);
                    genPage.add(simulatorBox);

                    var statsPage = new qx.ui.tabview.Page("Stats");
                    statsLayout = new qx.ui.layout.VBox(5);
                    statsPage.setLayout(statsLayout);

                    var statWindowHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                    statWindowHeader.setThemedFont("bold");
                    var statWindowTitle = new qx.ui.basic.Label("Stat Window:");
                    statWindowHeader.add(statWindowTitle);
                    statsPage.add(statWindowHeader);

                    var statWindowBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
                    this._autoOpenCB = new qx.ui.form.CheckBox("Auto Open");
                    this._autoOpenCB.addListener("changeValue", this._onAutoOpenStatsChange, this);
                    if (typeof localStorage['autoOpenStat'] != 'undefined') {
                        if (localStorage['autoOpenStat'] == "yes")
                            this._autoOpenCB.setValue(true);
                        else
                            this._autoOpenCB.setValue(false);
                    }

                    statWindowBox.add(this._autoOpenCB);
                    statsPage.add(statWindowBox);


                    var repairSecHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({
                        marginTop: 10
                    });
                    repairSecHeader.setThemedFont("bold");
                    var repairSecTitle = new qx.ui.basic.Label("Repair Time Display:");
                    repairSecHeader.add(repairSecTitle);
                    statsPage.add(repairSecHeader);

                    var repairSecBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                    var repairDisplayOpt1 = new qx.ui.form.RadioButton("RT");
                    var repairDisplayOpt2 = new qx.ui.form.RadioButton("C");
                    var repairDisplayOpt3 = new qx.ui.form.RadioButton("HP");
                    this._repairSecGroup = new qx.ui.form.RadioGroup(repairDisplayOpt1, repairDisplayOpt2, repairDisplayOpt3);
                    this._repairSecGroup.addListener("changeSelection", this._onRepairSelectionChange, this);
                    if (typeof localStorage['getRTSelection'] != 'undefined') {
                        var options = this._repairSecGroup.getSelectables(false);

                        if (localStorage['getRTSelection'] == "rt")
                            options[0].setValue(true);
                        else if (localStorage['getRTSelection'] == "hp")
                            options[1].setValue(true);
                        else if (localStorage['getRTSelection'] == "cry")
                            options[2].setValue(true);
                        else
                            options[0].setValue(true);
                    }
                    repairSecBox.add(repairDisplayOpt1);
                    repairSecBox.add(repairDisplayOpt2);
                    repairSecBox.add(repairDisplayOpt3);
                    statsPage.add(repairSecBox);

                    var hideSecHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
                    hideSecHeader.setThemedFont("bold");
                    var hideSecTitle = new qx.ui.basic.Label("Hide Sections (on Startup):");
                    hideSecHeader.add(hideSecTitle);
                    statsPage.add(hideSecHeader);

                    var hideSecBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
                    this._hideHealthCB = new qx.ui.form.CheckBox("Health");
                    this._hideRepairCB = new qx.ui.form.CheckBox("Repair");
                    this._hideLootCB = new qx.ui.form.CheckBox("Loot");
                    this._hideHealthCB.addListener("changeValue", this._onHideEHChange, this);
                    this._hideRepairCB.addListener("changeValue", this._onHideRTChange, this);
                    this._hideLootCB.addListener("changeValue", this._onHideLootChange, this);
                    if (typeof localStorage['hideHealth'] != 'undefined') {
                        if (localStorage['hideHealth'] == "yes")
                            this._hideHealthCB.setValue(true);
                        else
                            this._hideHealthCB.setValue(false);
                    }
                    if (typeof localStorage['hideRepair'] != 'undefined') {
                        if (localStorage['hideRepair'] == "yes")
                            this._hideRepairCB.setValue(true);
                        else
                            this._hideRepairCB.setValue(false);
                    }
                    if (typeof localStorage['hideLoot'] != 'undefined') {
                        if (localStorage['hideLoot'] == "yes")
                            this._hideLootCB.setValue(true);
                        else
                            this._hideLootCB.setValue(false);
                    }
                    hideSecBox.add(this._hideHealthCB);
                    hideSecBox.add(this._hideRepairCB);
                    hideSecBox.add(this._hideLootCB);
                    statsPage.add(hideSecBox);

                    this._ArmyUnitTooltip = new qx.ui.form.CheckBox("Army Unit Tooltip");
                    this._ArmyUnitTooltip.addListener("changeValue", this._onArmyUnitTooltipChange, this);
                    if (typeof localStorage['ArmyUnitTooltipDisabled'] != 'undefined') {
                        if (localStorage['ArmyUnitTooltipDisabled'] == "yes")
                            this._ArmyUnitTooltip.setValue(true);
                        else
                            this._ArmyUnitTooltip.setValue(false);
                    }

                    statsPage.add(this._ArmyUnitTooltip);

                    var statPosHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
                    var statPosTitle = new qx.ui.basic.Label("Set Stat Window Position:").set({alignY: "middle"});
                    statPosTitle.setFont("bold");
                    var statPosBtn = new qx.ui.form.Button("Set").set({allowGrowX: false, allowGrowY: false, height: 20});
                    statPosBtn.addListener("click", this._onSetStatWindowPositionChange, this);
                    statPosHeader.add(statPosTitle);
                    statPosHeader.add(statPosBtn);
                    statsPage.add(statPosHeader);

                    tabView.add(genPage);
                    tabView.add(statsPage);
                    this.add(tabView);
                },

                destruct: function () {},

                members: {
                    _buttonSizeCB: null,
                    _buttonLocCB: null,
                    _disableRTBtnCB: null,
                    _disableCmtBtnCB: null,
                    _autoOpenCB: null,
                    _autoSimulateCB: null,
                    _simSpeedGroup: null,
                    _repairSecGroup: null,
                    _hideHealthCB: null,
                    _hideRepairCB: null,
                    _hideMiscCB: null,
                    _hideLootCB: null,
                    _ArmyUnitTooltip: null,

                    _onButtonSizeChange: function () {
                        try {
                            var value = this._buttonSizeCB.getValue();

                            if (value == true)
                                localStorage['isBtnNorm'] = "yes";
                            else
                                localStorage['isBtnNorm'] = "no";

                            this.setButtonSize();
                        } catch (e) {
                            console.log("Error Button Size Change: " + e.toString());
                        }
                    },

                    _onButtonLocChange: function () {
                        try {
                            var value = this._buttonLocCB.getValue();

                            if (value == true)
                                localStorage['isBtnRight'] = "yes";
                            else
                                localStorage['isBtnRight'] = "no";

                            this.setButtonLoc();
                        } catch (e) {
                            console.log("Error Button Location Change: " + e.toString());
                        }
                    },

                    _onDisableRTBtnChange: function () {
                        try {
                            var value = this._disableRTBtnCB.getValue();

                            if (value == true)
                                localStorage['isRTBtnDisabled'] = "yes";
                            else
                                localStorage['isRTBtnDisabled'] = "no";

                            this.setRTBtn(value);
                        } catch (e) {
                            console.log("Error Disable RT Button Change: " + e.toString());
                        }
                    },

                    _onDisableCmtBtnChange: function () {
                        try {
                            var value = this._disableCmtBtnCB.getValue();

                            if (value == true)
                                localStorage['isCmtBtnDisabled'] = "yes";
                            else
                                localStorage['isCmtBtnDisabled'] = "no";

                            this.setCmtBtn(value);
                        } catch (e) {
                            console.log("Error Disable Cmt Button Change: " + e.toString());
                        }
                    },

                    _onRepairSelectionChange: function (selection) {
                        try {
                            var option = selection.getData()[0];
                            var label = option.getLabel();

                            if (label == "RT")
                                localStorage['getRTSelection'] = "rt";
                            else if (label == "HP")
                                localStorage['getRTSelection'] = "hp";
                            else if (label == "C")
                                localStorage['getRTSelection'] = "cry";
                            else
                                localStorage['getRTSelection'] = "rt";
                        } catch (e) {
                            console.log("Error Repair Section Selection Change: " + e.toString());
                        }
                    },

                    _onAutoOpenStatsChange: function () {
                        try {
                            var value = this._autoOpenCB.getValue();

                            if (value == false)
                                localStorage['autoOpenStat'] = "no";
                            else
                                localStorage['autoOpenStat'] = "yes";
                        } catch (e) {
                            console.log("Error Auto Open Stats Change: " + e.toString());
                        }
                    },

                    _onArmyUnitTooltipChange: function () {
                        try {
                            var value = this._ArmyUnitTooltip.getValue();

                            if (value == false)
                                localStorage['ArmyUnitTooltipDisabled'] = "no";
                            else
                                localStorage['ArmyUnitTooltipDisabled'] = "yes";
                        } catch (e) {
                            console.log("Error Army Unit Tooltip Change: " + e.toString());
                        }
                    },

                    _onAutoSimulateChange: function () {
                        try {
                            var value = this._autoSimulateCB.getValue();
                            if (value == false) {
                                this._simSpeedGroup.setEnabled(false);
                                localStorage['autoSimulate'] = "no";
                            } else {
                                this._simSpeedGroup.setEnabled(true);
                                localStorage['autoSimulate'] = "yes";
                            }
                        } catch (e) {
                            console.log("Error Auto Simulate Change: " + e.toString());
                        }
                    },

                    _onSimSpeedChange: function (selection) {
                        try {
                            var option = selection.getData()[0];
                            var label = option.getLabel();

                            if (label == "x1")
                                localStorage['simulateSpeed'] = "1";
                            else if (label == "x2")
                                localStorage['simulateSpeed'] = "2";
                            else
                                localStorage['simulateSpeed'] = "4";
                        } catch (e) {
                            console.log("Error Sim Speed Change: " + e.toString());
                        }
                    },

                    _onHideEHChange: function () {
                        try {
                            var value = this._hideHealthCB.getValue();

                            if (value == true)
                                localStorage['hideHealth'] = "yes";
                            else
                                localStorage['hideHealth'] = "no";

                        } catch (e) {
                            console.log("Error Hide Enemy Base Health Change: " + e.toString());
                        }
                    },

                    _onHideRTChange: function () {
                        try {
                            var value = this._hideRepairCB.getValue();

                            if (value == true)
                                localStorage['hideRepair'] = "yes";
                            else
                                localStorage['hideRepair'] = "no";

                        } catch (e) {
                            console.log("Error Hide Repair Times Change: " + e.toString());
                        }
                    },

                    _onHideLootChange: function () {
                        try {
                            var value = this._hideLootCB.getValue();

                            if (value == true)
                                localStorage['hideLoot'] = "yes";
                            else
                                localStorage['hideLoot'] = "no";

                        } catch (e) {
                            console.log("Error Hide Loot Change: " + e.toString());
                        }
                    },

                    _onSetStatWindowPositionChange: function () {
                        try {
                            var props = Simulator.StatWindow.getInstance().getLayoutProperties();
                            localStorage['statWindowPosLeft'] = props["left"];
                            localStorage['statWindowPosTop'] = props["top"];
                        } catch (e) {
                            console.log("Error Stat Window Position Change: " + e.toString());
                        }
                    },

                    setRTBtn: function (value) {
                        if (value == true)
                            Simulator.getInstance().unlockRTBtn.hide();
                        else
                            Simulator.getInstance().unlockRTBtn.show();
                    },

                    setCmtBtn: function (value) {
                        if (value == true)
                            Simulator.getInstance().unlockCmtBtn.hide();
                        else
                            Simulator.getInstance().unlockCmtBtn.show();
                    },

                    setButtonLoc: function () {
                        try {
                            var value = this._buttonLocCB.getValue();
                            var size = this._buttonSizeCB.getValue();

                            if (value == true) //Right
                            {
                                var pLeft = null;
                                if (size == true) //Right Normal
                                    var pRight = 70;
                                else //Right Small
                                    var pRight = 70;

                                Simulator.getInstance().armyBar.add(Simulator.getInstance().simBtn, {left: pLeft, right: pRight, bottom: 119});
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().statBtn, {left: pLeft, right: pRight, bottom: 81});
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().optionBtn, {left: pLeft, right: pRight, bottom: 43});
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().layoutBtn, {left: pLeft, right: pRight, bottom: 5});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftUpBtn, {left: pLeft, right: 75, bottom: 113});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftDownBtn, {left: pLeft, right: 75, bottom: 73});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftLeftBtn, {left: pLeft, right: 95, bottom: 93});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftRightBtn, {left: pLeft, right: 55, bottom: 93});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().disableAllUnitsBtn, {left: pLeft, right: 6, bottom: 120});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnH, {left: pLeft, right: 6, bottom: 160});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnV, {left: pLeft, right: 46, bottom: 160});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().armyUndoBtn, {left: pLeft, right: 6, bottom: 200});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().quickSaveBtn, {left: pLeft, right: 6, bottom: 240});
                            } else {
                                var pRight = null;
                                if (size == true) //Left Normal
                                    var pLeft = 87;
                                else
                                    var pLeft = 87;

                                Simulator.getInstance().armyBar.add(Simulator.getInstance().simBtn, {left: pLeft, right: pRight, bottom: 120});
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().statBtn, {left: pLeft, right: pRight, bottom: 82});
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().optionBtn, {left: pLeft, right: pRight, bottom: 44});
                                Simulator.getInstance().armyBar.add(Simulator.getInstance().layoutBtn, {left: pLeft, right: pRight, bottom: 6});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftUpBtn, {left: 80, right: pRight, bottom: 113});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftDownBtn, {left: 80, right: pRight, bottom: 73});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftLeftBtn, {left: 60, right: pRight, bottom: 93});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().shiftRightBtn, {left: 100, right: pRight, bottom: 93});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().disableAllUnitsBtn, {left: 6, right: pRight, bottom: 120});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnH, {left: 6, right: pRight, bottom: 160});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().mirrorBtnV, {left: 46, right: pRight, bottom: 160});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().armyUndoBtn, {left: 6, right: pRight, bottom: 200});
                                Simulator.getInstance().playArea.add(Simulator.getInstance().quickSaveBtn, {left: 6, right: pRight, bottom: 240});
                            }
                        } catch (e) {
                            console.log("Error Setting Button Location: " + e.toString());
                        }
                    },

                    setButtonSize: function () {
                        try {
                            value = this._buttonSizeCB.getValue();

                            if (value == true) {
                                Simulator.getInstance().simBtn.setLabel("Simulate");
                                Simulator.getInstance().simBtn.setWidth(60);

                                Simulator.getInstance().statBtn.setLabel("Stats");
                                Simulator.getInstance().statBtn.setWidth(60);

                                Simulator.getInstance().optionBtn.setLabel("Options");
                                Simulator.getInstance().optionBtn.setWidth(60);

                                Simulator.getInstance().layoutBtn.setLabel("Layout");
                                Simulator.getInstance().layoutBtn.setWidth(60);
                            } else {
                                Simulator.getInstance().simBtn.setLabel("S");
                                Simulator.getInstance().simBtn.setWidth(30);

                                Simulator.getInstance().statBtn.setLabel("I");
                                Simulator.getInstance().statBtn.setWidth(30);

                                Simulator.getInstance().optionBtn.setLabel("O");
                                Simulator.getInstance().optionBtn.setWidth(30);

                                Simulator.getInstance().layoutBtn.setLabel("L");
                                Simulator.getInstance().layoutBtn.setWidth(30);
                            }

                            this.setButtonLoc();
                        } catch (e) {
                            console.log("Error Setting Button Size: " + e.toString());
                        }
                    }
                }
            });

            qx.Class.define("Simulator.LayoutWindow", {
                type: "singleton",
                extend: webfrontend.gui.CustomWindow,

                construct: function () {
                    this.base(arguments);
                    this.setLayout(new qx.ui.layout.VBox());

                    this.set({
                        width: 200,
                        caption: "Simulator Layouts",
                        padding: 2,
                        allowMaximize: false,
                        showMaximize: false,
                        allowMinimize: false,
                        showMinimize: false
                    });

                    var layoutListHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({
                        decorator: "pane-light-opaque"
                    });
                    var layoutListTitle = new qx.ui.basic.Label("Formation Saver").set({alignX: "center", alignY: "top", font: "font_size_14_bold"});
                    layoutListHeader.add(layoutListTitle);
                    this.add(layoutListHeader);

                    this.layoutList = new qx.ui.form.List();
                    this.layoutList.set({selectionMode: "one", height: 100, width: 150, margin: 5});
                    this.add(this.layoutList);

                    var listButtonBox = new qx.ui.container.Composite();
                    var listButtonLayout = new qx.ui.layout.HBox(5, "center");
                    listButtonBox.setLayout(listButtonLayout);
                    var loadButton = new qx.ui.form.Button("Load");
                    var deleteButton = new qx.ui.form.Button("Delete");
                    loadButton.set({height: 15, width: 70, alignX: "center"});
                    loadButton.addListener("click", this.loadLayout, this);
                    deleteButton.set({height: 15, width: 70, alignX: "center"});
                    deleteButton.addListener("click", this.deleteLayout, this);
                    listButtonBox.add(loadButton);
                    listButtonBox.add(deleteButton);
                    this.add(listButtonBox);

                    var saveLayoutBox = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({spacing: 10})).set({marginTop: 20, marginLeft: 5});
                    this.layoutTextBox = new qx.ui.form.TextField("").set({width: 75, maxLength: 15});
                    var saveButton = new qx.ui.form.Button("Save");
                    saveButton.set({height: 10, width: 70, alignX: "center"});
                    saveButton.addListener("click", this.saveNewLayout, this);
                    saveLayoutBox.add(this.layoutTextBox);
                    saveLayoutBox.add(saveButton);
                    this.add(saveLayoutBox);

                    var checkBox = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({spacing: 10})).set({marginTop: 10, marginLeft: 5});
                    this.persistentCheck = new qx.ui.form.CheckBox("Make Persistent");
                    this.persistentCheck.setTextColor("white");
                    this.persistentCheck.setFont("bold");
                    this.persistentCheck.setToolTipText("If checked, formation will be saved and can be used by this city in any other city");
                    checkBox.add(this.persistentCheck);
                    this.add(checkBox);

                    var noticeBox = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({marginTop: 5, marginLeft: 5});
                    var noticeText = new qx.ui.basic.Label("").set({alignX: "center", alignY: "top"});
                    noticeText.setValue("<p align=\'justify\'><b>If formation does not change on load, try moving one unit first, then try again.</b></p>");
                    noticeText.set({rich: true, wrap: true, width: 165, textColor: "white"});
                    noticeBox.add(noticeText);
                    this.add(noticeBox);

                    var clearAllLayoutsBox = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({alignX: "center", marginTop: 5, marginLeft: 5, allowGrowX: false});
                    var clearAllLayoutsBtn = new qx.ui.form.Button("Clear All").set({alignX: "center", width: 70});
                    clearAllLayoutsBtn.addListener("click", this.clearAllLayouts, this);
                    clearAllLayoutsBox.add(clearAllLayoutsBtn);
                    this.add(clearAllLayoutsBox);

                    this.layoutsArray = [];
                },

                destruct: function () {},

                members: {
                    layoutList: null,
                    layoutTextBox: null,
                    layoutsArray: null,
                    persistentCheck: null,

                    saveNewLayout: function (isQS) {
                        try {
                            console.log("Saving Layout");

                            if ((typeof isQS != 'undefined' && isQS == true) || this.layoutTextBox.getValue() == "") {
                                var date = new Date();
                                var day = date.getDate();
                                var month = date.getMonth() + 1;
                                var hour = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours();
                                var minute = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
                                var second = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds();
                                var label = month + "/" + day + "@" + hour + ":" + minute + ":" + second;
                            } else {
                                var label = this.layoutTextBox.getValue();
                            }

                            var cityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                            var ownCityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
                            var model = ownCityID + "." + cityID + "." + label;

                            var children = this.layoutList.getChildren();
                            //Check for same layout name if so do NOT save
                            for (var item = 0; item < children.length; item++) {
                                thisItem = children[item].getModel();
                                if (thisItem == model) {
                                    alert("Save Failed: Duplicate Name");
                                    return;
                                }
                            }
                            var units = Simulator.getInstance().getCityPreArmyUnits().get_ArmyUnits().l;
                            units = this.prepareLayout(units);

                            var layoutInformation = {};
                            if (this.persistentCheck.getValue() == true) {
                                layoutInformation = {
                                    id: model,
                                    label: label,
                                    formation: units,
                                    pers: "yes",
                                };
                            } else {
                                layoutInformation = {
                                    id: model,
                                    label: label,
                                    formation: units,
                                    pers: "no",
                                };
                            }
                            this.layoutsArray.push(layoutInformation);
                            this.layoutList.add(new qx.ui.form.ListItem(layoutInformation.label, null, layoutInformation.id));
                            this.layoutTextBox.setValue("");
                            Simulator.getInstance().quickSaveBtn.setLabel("âœ”");
                            setTimeout(function () { Simulator.getInstance().quickSaveBtn.setLabel("QS"); }, 2000);
                            this.updateStorage();
                        } catch (e) {
                            console.log("Error Saving Layout");
                            console.log(e);
                        }
                    },

                    loadLayout: function () {
                        try {
                            console.log("Loading Layout");
                            var ownCityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();

                            var layout = this.layoutList.getSelection()[0].getModel();
                            for (var item in this.layoutsArray) {
                                var thisLayout = this.layoutsArray[item].id;

                                if (thisLayout == layout) {
                                    Simulator.getInstance().restoreFormation(this.layoutsArray[item].formation);
                                    break;
                                }
                            }
                        } catch (e) {
                            console.log("Error Loading Layout");
                            console.log(e);
                        }
                    },

                    deleteLayout: function () {
                        try {
                            console.log("Deleting Layout");
                            //Remove from our array too
                            var rUSure = confirm('Are you sure you want to delete this layout?');
                            if (!rUSure) {
                                return;
                            }
                            for (var item in this.layoutsArray) {
                                if (this.layoutsArray[item].id == this.layoutList.getSelection()[0].getModel()) {
                                    var isRemoved = this.layoutsArray.splice(item, 1);
                                    this.updateStorage();
                                }
                            }

                            //The update will remove all and repopulate so no need to delete individual ones.
                            this.updateLayoutList();
                        } catch (e) {
                            console.log("Error Deleting Layout");
                            console.log(e);
                        }
                    },

                    updateStorage: function () {
                        try {
                            console.log("Updating Storage");
                            localStorage['savedFormations'] = JSON.stringify(this.layoutsArray);
                        } catch (e) {
                            console.log("Error updating localStorage");
                            console.log(e);
                        }
                    },

                    updateLayoutList: function () {
                        try {
                            console.log("Updating Layout List");
                            var savedLayouts = localStorage['savedFormations'];
                            if (typeof savedLayouts != 'undefined') {
                                this.layoutsArray = JSON.parse(savedLayouts);
                            }
                            this.layoutList.removeAll(); //Clear List
                            var cityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                            var ownCityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
                            var model = ownCityID + "." + cityID;

                            for (var item in this.layoutsArray) {
                                var itemLabel = this.layoutsArray[item].label;
                                var itemModel = model + "." + itemLabel;
                                var pers = this.layoutsArray[item].pers;
                                var match = this.layoutsArray[item].id.match(ownCityID.toString());

                                if (itemModel == this.layoutsArray[item].id || ((typeof pers != 'undefined' && pers == "yes") && match != null)) //Match!
                                {
                                    this.layoutList.add(new qx.ui.form.ListItem(itemLabel, null, this.layoutsArray[item].id));
                                }
                            }
                        } catch (e) {
                            console.log("Error Updating Layout List");
                            console.log(e);
                        }
                    },

                    //Function from C&C Tiberium Alliances Combat Simulator script. Works well and does exactly what I need!
                    //For authors see: http://userscripts.org/scripts/show/145717
                    prepareLayout: function (units) {
                        try {
                            console.log("Preparing Layout for Saving");
                            saved_units = [];
                            for (var i = 0; i < units.length; i++) {
                                var unit = units[i];
                                var armyUnit = {};
                                armyUnit.x = unit.get_CoordX();
                                armyUnit.y = unit.get_CoordY();
                                armyUnit.id = unit.get_Id();
                                armyUnit.enabled = unit.get_Enabled();
                                saved_units.push(armyUnit);
                            }
                            return saved_units;
                        } catch (e) {
                            console.log("Error Preparing Unit Layout");
                            console.log(e);
                        }
                    },

                    clearAllLayouts: function () {
                        try {
                            console.log("Clearing All Layouts");
                            var rUSure = confirm("Clicking OK will delete all of your saved layouts from every base!");

                            if (rUSure) {
                                localStorage.removeItem('savedFormations');
                                this.layoutsArray = [];
                                alert("All saved layouts have been deleted.");

                                this.updateLayoutList();
                            } else {
                                alert("No layouts were deleted.");
                            }
                        } catch (e) {
                            console.log("Error Clearing All Layouts");
                            console.log(e);
                        }
                    }
                }
            });
        }

        function onViewChanged(oldMode, newMode) {
            setTimeout(function () {
                try {
                    console.log("View Changed");
                    Simulator.OptionWindow.getInstance().close();
                    Simulator.LayoutWindow.getInstance().close();
                    if (newMode != ClientLib.Vis.Mode.CombatSetup && newMode != ClientLib.Vis.Mode.Battleground) {
                        Simulator.StatWindow.getInstance().close();
                        //Also reset temp formation array
                        Simulator.getInstance().armyTempFormations = [];
                        Simulator.getInstance().armyTempIdx = 0;
                        Simulator.getInstance().armyUndoBtn.setEnabled(false);
                        Simulator.getInstance().isSimulation = false;
                    } else if (newMode == ClientLib.Vis.Mode.CombatSetup) {
                        var autoStatOpen = localStorage['autoOpenStat'];
                        if (typeof autoStatOpen != 'undefined') {
                            if (autoStatOpen == "yes") {
                                //Why not auto-open the Stat window? Sounds like a good idea
                                Simulator.StatWindow.getInstance().open();
                            }
                        } else {
                            Simulator.StatWindow.getInstance().open();
                        }

                        if (Simulator.getInstance().isSimulation == false)
                            setTimeout(function () {
                                Simulator.StatWindow.getInstance().calcResources();
                            }, 2000);
                        else
                            Simulator.getInstance().isSimulation = false;

                        if (oldMode != ClientLib.Vis.Mode.Battleground)
                            Simulator.getInstance().saveTempFormation(); //Save the very first formation upon entering base.
                    }

                    if (ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity() != null) {
                        var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Name();
                        var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Name();
                        //Don't want shift formation buttons showing up during combat or in own player's cities
                        if (newMode == ClientLib.Vis.Mode.Battleground || city == ownCity) {
                            Simulator.getInstance().shiftUpBtn.hide();
                            Simulator.getInstance().shiftDownBtn.hide();
                            Simulator.getInstance().shiftLeftBtn.hide();
                            Simulator.getInstance().shiftRightBtn.hide();
                            Simulator.getInstance().disableAllUnitsBtn.hide();
                            Simulator.getInstance().mirrorBtnH.hide();
                            Simulator.getInstance().mirrorBtnV.hide();
                            Simulator.getInstance().armyUndoBtn.hide();
                            Simulator.getInstance().quickSaveBtn.hide();
                        } else if (city != ownCity) {
                            Simulator.getInstance().shiftUpBtn.show();
                            Simulator.getInstance().shiftDownBtn.show();
                            Simulator.getInstance().shiftLeftBtn.show();
                            Simulator.getInstance().shiftRightBtn.show();
                            Simulator.getInstance().disableAllUnitsBtn.show();
                            Simulator.getInstance().mirrorBtnH.show();
                            Simulator.getInstance().mirrorBtnV.show();
                            Simulator.getInstance().armyUndoBtn.show();
                            Simulator.getInstance().quickSaveBtn.show();
                        }
                    }
                } catch (e) {
                    console.log("Error closing windows or hiding buttons on view change");
                    console.log(e.toString());
                }
            }, 500);
        }

        function waitForGame() {
            try {
                if (typeof qx != 'undefined' && typeof qx.core != 'undfined' && typeof qx.core.Init != 'undefined') {
                    var app = qx.core.Init.getApplication();
                    if (app.initDone == true) {
                        try {
                            console.log("Tiberium Alliances Combat Simulator: Loading");
                            createClasses();

                            console.log("Creating phe.cnc function wraps");

                            //Current Server patch (World 52 - US East Coast) uses phe
                            if (typeof phe.cnc.Util.attachNetEvent == 'undefined')
                                Simulator.getInstance().attachNetEvent = webfrontend.gui.Util.attachNetEvent;
                            else
                                Simulator.getInstance().attachNetEvent = phe.cnc.Util.attachNetEvent;

                            //Current Server patch (World 52 - US East Coast) uses webfrontend
                            if (typeof phe.cnc.gui.util == 'undefined')
                                Simulator.getInstance().formatNumbersCompact = webfrontend.gui.Util.formatNumbersCompact;
                            else
                                Simulator.getInstance().formatNumbersCompact = phe.cnc.gui.util.Numbers.formatNumbersCompact;

                            // Strange Hacks - provided by Topper42
                            // don't try this at home ;)
                            if (typeof ClientLib.API.Util.GetUnitMaxHealth == 'undefined')
                                for (var key in ClientLib.Base.Util) {
                                    var strFunction = ClientLib.Base.Util[key].toString();
                                    if (strFunction.indexOf("*=1.1") > -1 || strFunction.indexOf("*= 1.1") > -1) {
                                        Simulator.getInstance().GetUnitMaxHealth = ClientLib.Base.Util[key];
                                        break;
                                    }
                            } else
                                Simulator.getInstance().GetUnitMaxHealth = ClientLib.API.Util.GetUnitMaxHealth;

                            //Thanks to KRS_L for this next section solving the repair calculations until the new patch is on every server
                            if (PerforceChangelist >= 392583) {
                                var u = "" + ClientLib.Data.Cities.prototype.get_CurrentCity;
                                for (var a in ClientLib.Data.Cities.prototype)
                                    if (ClientLib.Data.Cities.prototype.hasOwnProperty(a) && "function" == typeof ClientLib.Data.Cities.prototype[a]) {
                                        var l = "" + ClientLib.Data.Cities.prototype[a];
                                        if (l.indexOf(u) > -1 && 6 == a.length) {
                                            u = a;
                                            break
                                        }
                                    }
                                var c = "" + ClientLib.Data.Cities.prototype.get_CurrentOwnCity;
                                for (var h in ClientLib.Data.Cities.prototype)
                                    if (ClientLib.Data.Cities.prototype.hasOwnProperty(h) && "function" == typeof ClientLib.Data.Cities.prototype[h]) {
                                        var p = "" + ClientLib.Data.Cities.prototype[h];
                                        if (p.indexOf(c) > -1 && 6 == h.length) {
                                            c = h;
                                            break
                                        }
                                    }
                                var s = "" + ClientLib.API.Util.GetUnitRepairCosts;
                                s = s.replace(u, c);
                                var d = s.substring(s.indexOf("{") + 1, s.lastIndexOf("}")),
                                    v = Function("a,b,c", d);
                                ClientLib.API.Util.GetUnitRepairCosts = v
                            }

                            Simulator.getInstance();
                            Simulator.StatWindow.getInstance();
                            Simulator.OptionWindow.getInstance();
                            Simulator.LayoutWindow.getInstance();
                            Simulator.getInstance().attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, onViewChanged);
                            console.log("Tiberium Alliances Combat Simulator: Loaded");
                        } catch (e) {
                            console.log("Simulator initialization error:");
                            console.log(e);
                        }
                    } else
                        window.setTimeout(waitForGame, 1000);
                } else {
                    window.setTimeout(waitForGame, 1000);
                }
            } catch (e) {
                if (typeof console != 'undefined')
                    console.log(e);
                else if (window.opera)
                    opera.postError(e);
                else
                    GM_log(e);
            }
        };
        window.setTimeout(waitForGame, 1000);
    }

    var script = document.createElement("script");
    var txt = injectFunction.toString();
    script.innerHTML = "(" + txt + ")();";
    script.type = "text/javascript";

    document.getElementsByTagName("head")[0].appendChild(script);
})();

/***********************************************************************************
CNCOpt
***********************************************************************************/
// ==UserScript==
// @version       1.7.4
// @updateURL     https://userscripts.org/scripts/source/131289.meta.js
// @downloadURL   https://userscripts.org/scripts/source/131289.user.js
// @name          C&C:TA CNCOpt Link Button
// @namespace     http://cncopt.com/
// @icon          http://cncopt.com/favicon.ico
// @description   Creates a "CNCOpt" button when selecting a base in Command & Conquer: Tiberium Alliances. The share button takes you to http://cncopt.com/ and fills in the selected base information so you can analyze or share the base.
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include       http*://*.cncopt.com/*
// @include       http*://cncopt.com/*
// @grant         GM_log
// @grant         GM_setValue
// @grant         GM_getValue
// @grant         GM_registerMenuCommand
// @grant         GM_xmlhttpRequest
// @grant         GM_updatingEnabled
// @grant         unsafeWindow
// @contributor   PythEch (http://http://userscripts.org/users/220246)
// ==/UserScript==
/* 

Special thanks to PythEch for fixing this up so it worked again!

*/
var scity = null;
var tcity = null;
var tbase = null;
try {
  unsafeWindow.__cncopt_version = "1.7.4";
  (function () {
    var cncopt_main = function () {

      var defense_unit_map = {
        /* GDI Defense Units */"GDI_Wall": "w",
        "GDI_Cannon": "c",
        "GDI_Antitank Barrier": "t",
        "GDI_Barbwire": "b",
        "GDI_Turret": "m",
        "GDI_Flak": "f",
        "GDI_Art Inf": "r",
        "GDI_Art Air": "e",
        "GDI_Art Tank": "a",
        "GDI_Def_APC Guardian": "g",
        "GDI_Def_Missile Squad": "q",
        "GDI_Def_Pitbull": "p",
        "GDI_Def_Predator": "d",
        "GDI_Def_Sniper": "s",
        "GDI_Def_Zone Trooper": "z",
        /* Nod Defense Units */"NOD_Def_Antitank Barrier": "t",
        "NOD_Def_Art Air": "e",
        "NOD_Def_Art Inf": "r",
        "NOD_Def_Art Tank": "a",
        "NOD_Def_Attack Bike": "p",
        "NOD_Def_Barbwire": "b",
        "NOD_Def_Black Hand": "z",
        "NOD_Def_Cannon": "c",
        "NOD_Def_Confessor": "s",
        "NOD_Def_Flak": "f",
        "NOD_Def_MG Nest": "m",
        "NOD_Def_Militant Rocket Soldiers": "q",
        "NOD_Def_Reckoner": "g",
        "NOD_Def_Scorpion Tank": "d",
        "NOD_Def_Wall": "w",

        /* Forgotten Defense Units */"FOR_Wall": "w",
        "FOR_Barbwire_VS_Inf": "b",
        "FOR_Barrier_VS_Veh": "t",
        "FOR_Inf_VS_Inf": "g",
        "FOR_Inf_VS_Veh": "r",
        "FOR_Inf_VS_Air": "q",
        "FOR_Sniper": "n",
        "FOR_Mammoth": "y",
        "FOR_Veh_VS_Inf": "o",
        "FOR_Veh_VS_Veh": "s",
        "FOR_Veh_VS_Air": "u",
        "FOR_Turret_VS_Inf": "m",
        "FOR_Turret_VS_Inf_ranged": "a",
        "FOR_Turret_VS_Veh": "v",
        "FOR_Turret_VS_Veh_ranged": "d",
        "FOR_Turret_VS_Air": "f",
        "FOR_Turret_VS_Air_ranged": "e",
        "": ""
      };

      var offense_unit_map = {
        /* GDI Offense Units */"GDI_APC Guardian": "g",
        "GDI_Commando": "c",
        "GDI_Firehawk": "f",
        "GDI_Juggernaut": "j",
        "GDI_Kodiak": "k",
        "GDI_Mammoth": "m",
        "GDI_Missile Squad": "q",
        "GDI_Orca": "o",
        "GDI_Paladin": "a",
        "GDI_Pitbull": "p",
        "GDI_Predator": "d",
        "GDI_Riflemen": "r",
        "GDI_Sniper Team": "s",
        "GDI_Zone Trooper": "z",

        /* Nod Offense Units */"NOD_Attack Bike": "b",
        "NOD_Avatar": "a",
        "NOD_Black Hand": "z",
        "NOD_Cobra": "r",
        "NOD_Commando": "c",
        "NOD_Confessor": "s",
        "NOD_Militant Rocket Soldiers": "q",
        "NOD_Militants": "m",
        "NOD_Reckoner": "k",
        "NOD_Salamander": "l",
        "NOD_Scorpion Tank": "o",
        "NOD_Specter Artilery": "p",
        "NOD_Venom": "v",
        "NOD_Vertigo": "t",
        "": ""
      };


      function findTechLayout(city) {
        for (var k in city) {
          //console.log(typeof(city[k]), "1.city[", k, "]", city[k])
          if ((typeof (city[k]) == "object") && city[k] && 0 in city[k] && 8 in city[k]) {
            if ((typeof (city[k][0]) == "object") && city[k][0] && city[k][0] && 0 in city[k][0] && 15 in city[k][0]) {
              if ((typeof (city[k][0][0]) == "object") && city[k][0][0] && "BuildingIndex" in city[k][0][0]) {
                return city[k];
              }
            }
          }
        }
        return null;
      }

      function findBuildings(city) {
        var cityBuildings = city.get_CityBuildingsData();
        for (var k in cityBuildings) {
          if (PerforceChangelist >= 376877) {
            if ((typeof (cityBuildings[k]) === "object") && cityBuildings[k] && "d" in cityBuildings[k] && "c" in cityBuildings[k] && cityBuildings[k].c > 0) {
              return cityBuildings[k].d;
            }
          } else {
            if ((typeof (cityBuildings[k]) === "object") && cityBuildings[k] && "l" in cityBuildings[k]) {
              return cityBuildings[k].l;
            }
          }
        }
      }

      function isOffenseUnit(unit) {
        return (unit.get_UnitGameData_Obj().n in offense_unit_map);
      }

      function isDefenseUnit(unit) {
        return (unit.get_UnitGameData_Obj().n in defense_unit_map);
      }

      function getUnitArrays(city) {
        var ret = [];
        for (var k in city) {
          if ((typeof (city[k]) == "object") && city[k]) {
            for (var k2 in city[k]) {
              if (PerforceChangelist >= 376877) {
                if ((typeof (city[k][k2]) == "object") && city[k][k2] && "d" in city[k][k2]) {
                  var lst = city[k][k2].d;
                  if ((typeof (lst) == "object") && lst) {
                    for (var i in lst) {
                      if (typeof (lst[i]) == "object" && lst[i] && "get_CurrentLevel" in lst[i]) {
                        ret.push(lst);
                      }
                    }
                  }
                }
              } else {
                if ((typeof (city[k][k2]) == "object") && city[k][k2] && "l" in city[k][k2]) {
                  var lst = city[k][k2].l;
                  if ((typeof (lst) == "object") && lst) {
                    for (var i in lst) {
                      if (typeof (lst[i]) == "object" && lst[i] && "get_CurrentLevel" in lst[i]) {
                        ret.push(lst);
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return ret;
      }

      function getDefenseUnits(city) {
        var arr = getUnitArrays(city);
        for (var i = 0; i < arr.length; ++i) {
          for (var j in arr[i]) {
            if (isDefenseUnit(arr[i][j])) {
              return arr[i];
            }
          }
        }
        return [];
      }

      function getOffenseUnits(city) {
        var arr = getUnitArrays(city);
        for (var i = 0; i < arr.length; ++i) {
          for (var j in arr[i]) {
            if (isOffenseUnit(arr[i][j])) {
              return arr[i];
            }
          }
        }
        return [];
      }


      function cncopt_create() {
        console.log("CNCOpt Link Button v" + window.__cncopt_version + " loaded");
        var cncopt = {
          selected_base: null,
          keymap: {
            /* GDI Buildings */"GDI_Accumulator": "a",
            "GDI_Refinery": "r",
            "GDI_Trade Center": "u",
            "GDI_Silo": "s",
            "GDI_Power Plant": "p",
            "GDI_Construction Yard": "y",
            "GDI_Airport": "d",
            "GDI_Barracks": "b",
            "GDI_Factory": "f",
            "GDI_Defense HQ": "q",
            "GDI_Defense Facility": "w",
            "GDI_Command Center": "e",
            "GDI_Support_Art": "z",
            "GDI_Support_Air": "x",
            "GDI_Support_Ion": "i",
            /* Forgotten Buildings */"FOR_Silo": "s",
            "FOR_Refinery": "r",
            "FOR_Tiberium Booster": "b",
            "FOR_Crystal Booster": "v",
            "FOR_Trade Center": "u",
            "FOR_Defense Facility": "w",
            "FOR_Construction Yard": "y",
            "FOR_Harvester_Tiberium": "h",
            "FOR_Defense HQ": "q",
            "FOR_Harvester_Crystal": "n",
            /* Nod Buildings */"NOD_Refinery": "r",
            "NOD_Power Plant": "p",
            "NOD_Harvester": "h",
            "NOD_Construction Yard": "y",
            "NOD_Airport": "d",
            "NOD_Trade Center": "u",
            "NOD_Defense HQ": "q",
            "NOD_Barracks": "b",
            "NOD_Silo": "s",
            "NOD_Factory": "f",
            "NOD_Harvester_Crystal": "n",
            "NOD_Command Post": "e",
            "NOD_Support_Art": "z",
            "NOD_Support_Ion": "i",
            "NOD_Accumulator": "a",
            "NOD_Support_Air": "x",
            "NOD_Defense Facility": "w",
            //"NOD_Tech Lab": "",
            //"NOD_Recruitment Hub": "X",
            //"NOD_Temple of Nod": "X",

            /* GDI Defense Units */"GDI_Wall": "w",
            "GDI_Cannon": "c",
            "GDI_Antitank Barrier": "t",
            "GDI_Barbwire": "b",
            "GDI_Turret": "m",
            "GDI_Flak": "f",
            "GDI_Art Inf": "r",
            "GDI_Art Air": "e",
            "GDI_Art Tank": "a",
            "GDI_Def_APC Guardian": "g",
            "GDI_Def_Missile Squad": "q",
            "GDI_Def_Pitbull": "p",
            "GDI_Def_Predator": "d",
            "GDI_Def_Sniper": "s",
            "GDI_Def_Zone Trooper": "z",
            /* Nod Defense Units */"NOD_Def_Antitank Barrier": "t",
            "NOD_Def_Art Air": "e",
            "NOD_Def_Art Inf": "r",
            "NOD_Def_Art Tank": "a",
            "NOD_Def_Attack Bike": "p",
            "NOD_Def_Barbwire": "b",
            "NOD_Def_Black Hand": "z",
            "NOD_Def_Cannon": "c",
            "NOD_Def_Confessor": "s",
            "NOD_Def_Flak": "f",
            "NOD_Def_MG Nest": "m",
            "NOD_Def_Militant Rocket Soldiers": "q",
            "NOD_Def_Reckoner": "g",
            "NOD_Def_Scorpion Tank": "d",
            "NOD_Def_Wall": "w",

            /* Forgotten Defense Units */"FOR_Wall": "w",
            "FOR_Barbwire_VS_Inf": "b",
            "FOR_Barrier_VS_Veh": "t",
            "FOR_Inf_VS_Inf": "g",
            "FOR_Inf_VS_Veh": "r",
            "FOR_Inf_VS_Air": "q",
            "FOR_Sniper": "n",
            "FOR_Mammoth": "y",
            "FOR_Veh_VS_Inf": "o",
            "FOR_Veh_VS_Veh": "s",
            "FOR_Veh_VS_Air": "u",
            "FOR_Turret_VS_Inf": "m",
            "FOR_Turret_VS_Inf_ranged": "a",
            "FOR_Turret_VS_Veh": "v",
            "FOR_Turret_VS_Veh_ranged": "d",
            "FOR_Turret_VS_Air": "f",
            "FOR_Turret_VS_Air_ranged": "e",

            /* GDI Offense Units */"GDI_APC Guardian": "g",
            "GDI_Commando": "c",
            "GDI_Firehawk": "f",
            "GDI_Juggernaut": "j",
            "GDI_Kodiak": "k",
            "GDI_Mammoth": "m",
            "GDI_Missile Squad": "q",
            "GDI_Orca": "o",
            "GDI_Paladin": "a",
            "GDI_Pitbull": "p",
            "GDI_Predator": "d",
            "GDI_Riflemen": "r",
            "GDI_Sniper Team": "s",
            "GDI_Zone Trooper": "z",

            /* Nod Offense Units */"NOD_Attack Bike": "b",
            "NOD_Avatar": "a",
            "NOD_Black Hand": "z",
            "NOD_Cobra": "r",
            "NOD_Commando": "c",
            "NOD_Confessor": "s",
            "NOD_Militant Rocket Soldiers": "q",
            "NOD_Militants": "m",
            "NOD_Reckoner": "k",
            "NOD_Salamander": "l",
            "NOD_Scorpion Tank": "o",
            "NOD_Specter Artilery": "p",
            "NOD_Venom": "v",
            "NOD_Vertigo": "t",

            "<last>": "."
          },
          make_sharelink: function () {
            try {
              var selected_base = cncopt.selected_base;
              var city_id = selected_base.get_Id();
              var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);
              var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
              var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
              tbase = selected_base;
              tcity = city;
              scity = own_city;
              //console.log("Target City: ", city);
              //console.log("Own City: ", own_city);
              var link = "http://cncopt.com/?map=";
              link += "3|"; /* link version */
              switch (city.get_CityFaction()) {
                case 1:
                  /* GDI */
                  link += "G|";
                  break;
                case 2:
                  /* NOD */
                  link += "N|";
                  break;
                case 3:
                  /* FOR faction - unseen, but in GAMEDATA */
                case 4:
                  /* Forgotten Bases */
                case 5:
                  /* Forgotten Camps */
                case 6:
                  /* Forgotten Outposts */
                  link += "F|";
                  break;
                default:
                  console.log("cncopt: Unknown faction: " + city.get_CityFaction());
                  link += "E|";
                  break;
              }
              switch (own_city.get_CityFaction()) {
                case 1:
                  /* GDI */
                  link += "G|";
                  break;
                case 2:
                  /* NOD */
                  link += "N|";
                  break;
                case 3:
                  /* FOR faction - unseen, but in GAMEDATA */
                case 4:
                  /* Forgotten Bases */
                case 5:
                  /* Forgotten Camps */
                case 6:
                  /* Forgotten Outposts */
                  link += "F|";
                  break;
                default:
                  console.log("cncopt: Unknown faction: " + own_city.get_CityFaction());
                  link += "E|";
                  break;
              }
              link += city.get_Name() + "|";
              defense_units = []
              for (var i = 0; i < 20; ++i) {
                var col = [];
                for (var j = 0; j < 9; ++j) {
                  col.push(null);
                }
                defense_units.push(col)
              }
              var defense_unit_list = getDefenseUnits(city);
              if (PerforceChangelist >= 376877) {
                for (var i in defense_unit_list) {
                  var unit = defense_unit_list[i];
                  defense_units[unit.get_CoordX()][unit.get_CoordY() + 8] = unit;
                }
              } else {
                for (var i = 0; i < defense_unit_list.length; ++i) {
                  var unit = defense_unit_list[i];
                  defense_units[unit.get_CoordX()][unit.get_CoordY() + 8] = unit;
                }
              }

              offense_units = []
              for (var i = 0; i < 20; ++i) {
                var col = [];
                for (var j = 0; j < 9; ++j) {
                  col.push(null);
                }
                offense_units.push(col)
              }

              var offense_unit_list = getOffenseUnits(own_city);
              if (PerforceChangelist >= 376877) {
                for (var i in offense_unit_list) {
                  var unit = offense_unit_list[i];
                  offense_units[unit.get_CoordX()][unit.get_CoordY() + 16] = unit;
                }
              } else {
                for (var i = 0; i < offense_unit_list.length; ++i) {
                  var unit = offense_unit_list[i];
                  offense_units[unit.get_CoordX()][unit.get_CoordY() + 16] = unit;
                }
              }

              var techLayout = findTechLayout(city);
              var buildings = findBuildings(city);
              for (var i = 0; i < 20; ++i) {
                row = [];
                for (var j = 0; j < 9; ++j) {
                  var spot = i > 16 ? null : techLayout[j][i];
                  var level = 0;
                  var building = null;
                  if (spot && spot.BuildingIndex >= 0) {
                    building = buildings[spot.BuildingIndex];
                    level = building.get_CurrentLevel();
                  }
                  var defense_unit = defense_units[j][i];
                  if (defense_unit) {
                    level = defense_unit.get_CurrentLevel();
                  }
                  var offense_unit = offense_units[j][i];
                  if (offense_unit) {
                    level = offense_unit.get_CurrentLevel();
                  }
                  if (level > 1) {
                    link += level;
                  }

                  switch (i > 16 ? 0 : city.GetResourceType(j, i)) {
                    case 0:
                      if (building) {
                        var techId = building.get_MdbBuildingId();
                        if (GAMEDATA.Tech[techId].n in cncopt.keymap) {
                          link += cncopt.keymap[GAMEDATA.Tech[techId].n];
                        } else {
                          console.log("cncopt [5]: Unhandled building: " + techId, building);
                          link += ".";
                        }
                      } else if (defense_unit) {
                        if (defense_unit.get_UnitGameData_Obj().n in cncopt.keymap) {
                          link += cncopt.keymap[defense_unit.get_UnitGameData_Obj().n];
                        } else {
                          console.log("cncopt [5]: Unhandled unit: " + defense_unit.get_UnitGameData_Obj().n);
                          link += ".";
                        }
                      } else if (offense_unit) {
                        if (offense_unit.get_UnitGameData_Obj().n in cncopt.keymap) {
                          link += cncopt.keymap[offense_unit.get_UnitGameData_Obj().n];
                        } else {
                          console.log("cncopt [5]: Unhandled unit: " + offense_unit.get_UnitGameData_Obj().n);
                          link += ".";
                        }
                      } else {
                        link += ".";
                      }
                      break;
                    case 1:
                      /* Crystal */
                      if (spot.BuildingIndex < 0) link += "c";
                      else link += "n";
                      break;
                    case 2:
                      /* Tiberium */
                      if (spot.BuildingIndex < 0) link += "t";
                      else link += "h";
                      break;
                    case 4:
                      /* Woods */
                      link += "j";
                      break;
                    case 5:
                      /* Scrub */
                      link += "h";
                      break;
                    case 6:
                      /* Oil */
                      link += "l";
                      break;
                    case 7:
                      /* Swamp */
                      link += "k";
                      break;
                    default:
                      console.log("cncopt [4]: Unhandled resource type: " + city.GetResourceType(j, i));
                      link += ".";
                      break;
                  }
                }
              }
              /* Tack on our alliance bonuses */
              if (alliance && scity.get_AllianceId() == tcity.get_AllianceId()) {
                link += "|" + alliance.get_POITiberiumBonus();
                link += "|" + alliance.get_POICrystalBonus();
                link += "|" + alliance.get_POIPowerBonus();
                link += "|" + alliance.get_POIInfantryBonus();
                link += "|" + alliance.get_POIVehicleBonus();
                link += "|" + alliance.get_POIAirBonus();
                link += "|" + alliance.get_POIDefenseBonus();
              }

              //console.log(link);
              window.open(link, "_blank");
            } catch (e) {
              console.log("cncopt [1]: ", e);
            }
          }
        };
        if (!webfrontend.gui.region.RegionCityMenu.prototype.__cncopt_real_showMenu) {
          webfrontend.gui.region.RegionCityMenu.prototype.__cncopt_real_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
        }

        var check_ct = 0;
        var check_timer = null;
        var button_enabled = 123456;
        /* Wrap showMenu so we can inject our Sharelink at the end of menus and
         * sync Base object to our cncopt.selected_base variable  */
        webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selected_base) {
          try {
            var self = this;
            //console.log(selected_base);
            cncopt.selected_base = selected_base;
            if (this.__cncopt_initialized != 1) {
              this.__cncopt_initialized = 1;
              this.__cncopt_links = [];
              for (var i in this) {
                try {
                  if (this[i] && this[i].basename == "Composite") {
                    var link = new qx.ui.form.Button("CNCOpt", "http://cncopt.com/favicon.ico");
                    link.addListener("execute", function () {
                      var bt = qx.core.Init.getApplication();
                      bt.getBackgroundArea().closeCityInfo();
                      cncopt.make_sharelink();
                    });
                    this[i].add(link);
                    this.__cncopt_links.push(link)
                  }
                } catch (e) {
                  console.log("cncopt [2]: ", e);
                }
              }
            }
            var tf = false;
            switch (selected_base.get_VisObjectType()) {
              case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                switch (selected_base.get_Type()) {
                  case ClientLib.Vis.Region.RegionCity.ERegionCityType.Own:
                    tf = true;
                    break;
                  case ClientLib.Vis.Region.RegionCity.ERegionCityType.Alliance:
                  case ClientLib.Vis.Region.RegionCity.ERegionCityType.Enemy:
                    tf = true;
                    break;
                }
                break;
              case ClientLib.Vis.VisObject.EObjectType.RegionGhostCity:
                tf = false;
                console.log("cncopt: Ghost City selected.. ignoring because we don't know what to do here");
                break;
              case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                tf = true;
                break;
              case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                tf = true;
                break;
            }

            var orig_tf = tf;

            function check_if_button_should_be_enabled() {
              try {
                tf = orig_tf;
                var selected_base = cncopt.selected_base;
                var still_loading = false;
                if (check_timer != null) {
                  clearTimeout(check_timer);
                }

                /* When a city is selected, the data for the city is loaded in the background.. once the 
                 * data arrives, this method is called again with these fields set, but until it does
                 * we can't actually generate the link.. so this section of the code grays out the button
                 * until the data is ready, then it'll light up. */
                if (selected_base && selected_base.get_Id) {
                  var city_id = selected_base.get_Id();
                  var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);
                  //if (!city || !city.m_CityUnits || !city.m_CityUnits.m_DefenseUnits) {
                  //console.log("City", city);
                  //console.log("get_OwnerId", city.get_OwnerId());
                  if (!city || city.get_OwnerId() == 0) {
                    still_loading = true;
                    tf = false;
                  }
                } else {
                  tf = false;
                }
                if (tf != button_enabled) {
                  button_enabled = tf;
                  for (var i = 0; i < self.__cncopt_links.length; ++i) {
                    self.__cncopt_links[i].setEnabled(tf);
                  }
                }
                if (!still_loading) {
                  check_ct = 0;
                } else {
                  if (check_ct > 0) {
                    check_ct--;
                    check_timer = setTimeout(check_if_button_should_be_enabled, 100);
                  } else {
                    check_timer = null;
                  }
                }
              } catch (e) {
                console.log("cncopt [3]: ", e);
                tf = false;
              }
            }

            check_ct = 50;
            check_if_button_should_be_enabled();
          } catch (e) {
            console.log("cncopt [3]: ", e);
          }
          this.__cncopt_real_showMenu(selected_base);
        }
      }


      /* Nice load check (ripped from AmpliDude's LoU Tweak script) */
      function cnc_check_if_loaded() {
        try {
          if (typeof qx != 'undefined') {
            a = qx.core.Init.getApplication(); // application
            if (a) {
              cncopt_create();
            } else {
              window.setTimeout(cnc_check_if_loaded, 1000);
            }
          } else {
            window.setTimeout(cnc_check_if_loaded, 1000);
          }
        } catch (e) {
          if (typeof console != 'undefined') console.log(e);
          else if (window.opera) opera.postError(e);
          else GM_log(e);
        }
      }
      if (/commandandconquer\.com/i.test(document.domain)) window.setTimeout(cnc_check_if_loaded, 1000);
    }

    // injecting because we can't seem to hook into the game interface via unsafeWindow 
    //   (Ripped from AmpliDude's LoU Tweak script)
    var script_block = document.createElement("script");
    txt = cncopt_main.toString();
    script_block.innerHTML = "(" + txt + ")();";
    script_block.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) document.getElementsByTagName("head")[0].appendChild(script_block);
  })();
} catch (e) {
  GM_log(e);
}

/***********************************************************************************
BaseScanner
***********************************************************************************/

// ==UserScript==
// @name        Maelstrom ADDON Basescanner
// @namespace   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description Maelstrom ADDON Basescanner
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     1.7.1
// @author      BlinDManX
// @grant       none
// @copyright   2012+, Claus Neumann
// @license     CC BY-NC-ND 3.0 - http://creativecommons.org/licenses/by-nc-nd/3.0/
// @updateURL   https://userscripts.org/scripts/source/145168.meta.js
// @downloadURL https://userscripts.org/scripts/source/145168.user.js
// ==/UserScript==
(function(){var b=function(){var j=["__msbs_version","1.7.1","Maelstrom_Basescanner ","log","debug","Maelstrom_Basescanner initalisiert","FileManager","File","getInstance","Language","MaelstromTools","Cache","Base","getLocale","Manager","locale","indexOf","Languages","Point","Data","Position","BaseScanner Overview","Basescanner Übersicht","Visão geral do scanner de base","Aperçu du scanner de base","Scan","Scannen","Esquadrinhar","Balayer","Location","Lage","localização","Emplacement","Player","Spieler","Jogador","Joueur","Bases","Basen","Camp,Outpost","Lager,Vorposten","Camp,posto avançado","Camp,avant-poste","Camp","Lager","Outpost","Vorposten","posto avançado","avant-poste","BaseScanner Layout","Layout da Base de Dados de Scanner","Mise scanner de base","Show Layouts","Layouts anzeigen","Mostrar Layouts","Voir Layouts","Building state","Gebäudezustand","construção do Estado","construction de l\x27État","Defense state","Verteidigungszustand","de Defesa do Estado","défense de l\x27Etat","CP","KP","CP Limit","KP begrenzen","CP limitar","CP limiter","min Level","min. Level","nível mínimo","niveau minimum","clear Cache","Cache leeren","limpar cache","vider le cache","BaseScanner","ui/icons/icon_item.png","createNewImage","Emptypixels","ui/menues/main_menu/misc_empty_pixel.png","L","createNewWindow","BaseScannerLayout","gt","version","desktopPosition","createDesktopButton","execute","openWindow","BaseScannerGUI","HuffyTools","addListener","addToMainMenu","HuffyTools.BaseScannerGUI","singleton","DefaultObject","src","stats","http://goo.gl/DrJ2x","img","createElement","ZE","setPadding","Window","set","removeAll","add","close","ZS","pavmCombatSetupDefense","PlayerAreaViewMode","HuffyTools.BaseScannerGUI.FC: ","ZL","model","table","ui","ID","LoadState","City","Level","Statics","Crystalfields","Tiberiumfields","Def.HP/Off.HP","Sum Tib+Cry+Cre","(Tib+Cry+Cre)/CP","CY","DF","setColumns","YY","get_Player","MainData","ZN","setColumnVisibilityButtonVisible","setColumnWidth","getTableColumnModel","getColumnCount","MS_Basescanner_Column_","get","LocalStorage","setColumnVisible","Crystal","images","headerrenderer","setHeaderCellRenderer","Tiberium","FA","setDataCellRenderer","cellDblclick","HuffyTools.BaseScannerGUI.FI: ","getRow","length",":","split","VisMain","Vis","getApplication","Init","core","closeCityInfo","getBackgroundArea","setView","getPlayArea","HuffyTools.BaseScannerGUI FB error: ","setLabel","ZG","ZH","format","util","setGroupingUsed","setMaximumFractionDigits","abs","floor","k","M","G","T","HuffyTools.BaseScannerGUI.updateCache: ","setData","HuffyTools.BaseScannerGUI.setWidgetLabels: ","layout","container","ZC","form","setHeight","setMargin","updateCityCache","Cities","MS_Basescanner_LastCityID","get_Id","Object","setSelection","changeSelection","white","basic","ZQ","setWidth","MS_Basescanner_Cplimiter","","MS_Basescanner_minLevel","1","ZY","ZK","setTextColor","MS_Basescanner_Show0","setValue","changeValue","MS_Basescanner_Show1","MS_Basescanner_Show2","MS_Basescanner_Show3","solid","blue","decoration","ZV","red","ZU","green","ZX","center","YZ","ZZ","ZJ","7 "," 5 ","6 "," 6 ","5 "," 7 ","ZD","Get Layouts","setEnabled","ZB","setLayout","Loader","gui","ZR","getColumnName","isColumnVisible","index","click","getData","ZO","+","ZI","addAfter","-","remove","right","setAlignX","ZF","HuffyTools.BaseScannerGUI.createOptions: ","get_Cities","get_CurrentOwnCity","\x3Ca href=\x22https://sites.google.com/site/blindmanxdonate\x22 target=\x22_blank\x22\x3ESupport Development of BlinDManX Addons\x3C/a\x3E","ZP","getModel","getSelection","get_PosX","get_PosY","set_CurrentCityId","ZT","prototype","WorldObjectCity","WorldSector","$ctor","ClientLib.Data.WorldSector.WorldObjectCity","getLevel","Error - ClientLib.Data.WorldSector.WorldObjectCity.Level undefined","error","getID","Error - ClientLib.Data.WorldSector.WorldObjectCity.ID undefined","WorldObjectNPCBase","ClientLib.Data.WorldSector.WorldObjectNPCBase","Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.Level undefined","Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.ID undefined","WorldObjectNPCCamp","ClientLib.Data.WorldSector.WorldObjectNPCCamp","Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.Level undefined","getCampType","Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.CampType undefined","Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.ID undefined","Pause","window.HuffyTools.BaseScannerGUI.getInstance().FJ()","setTimeout","window.HuffyTools.BaseScannerGUI.getInstance().FG()","/","getValue","Select","get_World","Scanning from: ","get_Name","get_MaxAttackDistance","get_Server","sqrt","Type","function","push","ZM","sortByColumn","name","DR01D","Maelstrom_Basescanner FJ error: ","data null: ","data[i] null: ","get_IsGhostMode","get_CityUnitsData","d","get_Buildings","get_DefenseUnits","get_OffenseUnits","EResourceType","Gold","ResearchPoints","ZA","get_Health","get_MdbUnitId","get_CoordY","HPRecord"," finish","countlastidchecked"," on "," removed (GetBuildingsConditionInPercent == 0)","splice"," removed (IsGhostMode)","lastid"," removed (found no data)","isVisible","MaelstromTools_Basescanner getResources","define","Class","HuffyTools.BaseScannerLayout","BaseScannerLayout.FC: ","ZW","HuffyTools.BaseScannerLayout.FC: ","HuffyTools.BaseScannerLayout.updateCache: ","HuffyTools.BaseScannerLayout.setWidgetLabels: ","ZE null: ","\x3Ctable border=\x222\x22 cellspacing=\x220\x22 cellpadding=\x220\x22\x3E"," - ","\x3Ctr\x3E\x3Ctd colspan=\x229\x22\x3E\x3Cfont color=\x22#FFF\x22\x3E","\x3C/font\x3E\x3C/td\x3E\x3C/tr\x3E","\x3Ctr\x3E","\x3Cimg width=\x2214\x22 height=\x2214\x22 src=\x22","\x22\x3E","\x3Ctd\x3E","\x3C/td\x3E","\x3C/tr\x3E","\x3C/table\x3E","#303030","cid","clickid ","setReturnValue","Wrapper","Count","get_HitpointsPercent","MaelstromTools_Basescanner getResourcesPart","replace","match","warn","Error - ","not found","undefined","MaelstromTools_Basescanner_checkIfLoaded: ","domain","test"];window[j[0]]=j[1];console[j[3]](j[2]+window[j[0]]);function h(){qx[j[4]]=true;console[j[3]](j[5]);var m=null;var l=null;var k=null;var r=null;var q=0;var p=0;r=ClientLib[j[7]][j[6]].GetInstance();m=window[j[10]][j[9]][j[8]]();l=window[j[10]][j[11]][j[8]]();k=window[j[10]][j[12]][j[8]]();var o=m[j[17]][j[16]](qx[j[15]][j[14]][j[8]]()[j[13]]());if(o>=0){m[j[19]][j[18]]=[j[20],j[20],j[20]][o];m[j[19]][j[21]]=[j[22],j[23],j[24]][o];m[j[19]][j[25]]=[j[26],j[27],j[28]][o];m[j[19]][j[29]]=[j[30],j[31],j[32]][o];m[j[19]][j[33]]=[j[34],j[35],j[36]][o];m[j[19]][j[37]]=[j[38],j[37],j[37]][o];m[j[19]][j[39]]=[j[40],j[41],j[42]][o];m[j[19]][j[43]]=[j[44],j[43],j[43]][o];m[j[19]][j[45]]=[j[46],j[47],j[48]][o];m[j[19]][j[49]]=[j[49],j[50],j[51]][o];m[j[19]][j[52]]=[j[53],j[54],j[55]][o];m[j[19]][j[56]]=[j[57],j[58],j[59]][o];m[j[19]][j[60]]=[j[61],j[62],j[63]][o];m[j[19]][j[64]]=[j[65],j[64],j[64]][o];m[j[19]][j[66]]=[j[67],j[68],j[69]][o];m[j[19]][j[70]]=[j[71],j[72],j[73]][o];m[j[19]][j[74]]=[j[75],j[76],j[77]][o];}k[j[80]](j[78],j[79],r);k[j[80]](j[81],j[82],r);k[j[84]](j[78],j[83],120,60,820,400);k[j[84]](j[85],j[83],120,460,820,350);var n=k[j[89]](m[j[86]](j[21])+j[87]+window[j[0]],j[78],false,k[j[88]](2));n[j[94]](j[90],function(){window[j[93]][j[92]][j[8]]()[j[91]](j[78],m[j[86]](j[21]));},this);k[j[95]](j[78],n);qx[j[332]][j[331]](j[96],{type:j[97],extend:MaelstromTools[j[98]],construct:function(){this[j[100]][j[99]]=j[101];},members:{stats:document[j[103]](j[102]),ZA:0,ZB:null,ZC:null,ZD:null,ZE:null,ZF:null,ZG:null,ZH:false,ZI:true,ZJ:null,ZK:null,ZL:null,ZM:null,ZN:null,ZO:null,ZP:null,ZQ:null,ZS:null,ZR:[],ZT:true,ZU:null,ZV:null,ZX:null,ZY:null,ZZ:[],YZ:null,YY:null,FC:function(){try{this.FI();this.FH();this.FD();if(this[j[104]]==null){this[j[104]]=[];}this[j[106]][j[105]](0);this[j[106]][j[107]]({resizable:true});this[j[106]][j[108]]();this[j[106]][j[109]](this.ZF);this[j[106]][j[109]](this.ZN);this[j[106]][j[109]](this.ZP);this[j[106]][j[94]](j[110],window[j[93]][j[92]][j[8]]().FN,this);this[j[111]]=ClientLib[j[19]][j[113]][j[112]];}catch(s){console[j[3]](j[114],s);}},FI:function(){try{this[j[115]]=new qx[j[118]][j[117]][j[116]].Simple();this[j[115]][j[131]]([j[119],j[120],m[j[86]](j[121]),m[j[86]](j[29]),m[j[86]](j[122]),m[j[86]](MaelstromTools[j[123]].Tiberium),m[j[86]](MaelstromTools[j[123]].Crystal),m[j[86]](MaelstromTools[j[123]].Dollar),m[j[86]](MaelstromTools[j[123]].Research),j[124],j[125],m[j[86]](j[56]),m[j[86]](j[60]),m[j[86]](j[64]),j[126],j[127],j[128],j[129],j[130]]);this[j[132]]=ClientLib[j[19]][j[134]].GetInstance()[j[133]]();this[j[135]]=new qx[j[118]][j[117]].Table(this.ZL);this[j[135]][j[136]](false);this[j[135]][j[137]](0,0);this[j[135]][j[137]](1,0);this[j[135]][j[137]](2,120);this[j[135]][j[137]](3,60);this[j[135]][j[137]](4,50);this[j[135]][j[137]](5,60);this[j[135]][j[137]](6,60);this[j[135]][j[137]](7,60);this[j[135]][j[137]](8,60);this[j[135]][j[137]](9,30);this[j[135]][j[137]](10,30);this[j[135]][j[137]](11,50);this[j[135]][j[137]](12,50);this[j[135]][j[137]](13,30);this[j[135]][j[137]](14,60);this[j[135]][j[137]](15,60);this[j[135]][j[137]](16,60);this[j[135]][j[137]](17,50);this[j[135]][j[137]](18,50);var u=0;var t=this[j[135]][j[138]]();for(u=0;u<this[j[115]][j[139]]();u++){if(u==0||u==1||u==11||u==12){t[j[143]](u,MaelstromTools[j[142]][j[141]](j[140]+u,false));}else{t[j[143]](u,MaelstromTools[j[142]][j[141]](j[140]+u,true));}}t[j[143]](1,false);t[j[147]](9,new qx[j[118]][j[117]][j[146]].Icon(k[j[145]][MaelstromTools[j[123]][j[144]]]),j[124]);t[j[147]](10,new qx[j[118]][j[117]][j[146]].Icon(k[j[145]][MaelstromTools[j[123]][j[148]]],j[125]));t[j[150]](5,new HuffyTools.ReplaceRender()[j[107]]({ReplaceFunction:this[j[149]]}));t[j[150]](6,new HuffyTools.ReplaceRender()[j[107]]({ReplaceFunction:this[j[149]]}));t[j[150]](7,new HuffyTools.ReplaceRender()[j[107]]({ReplaceFunction:this[j[149]]}));t[j[150]](8,new HuffyTools.ReplaceRender()[j[107]]({ReplaceFunction:this[j[149]]}));t[j[150]](15,new HuffyTools.ReplaceRender()[j[107]]({ReplaceFunction:this[j[149]]}));t[j[150]](16,new HuffyTools.ReplaceRender()[j[107]]({ReplaceFunction:this[j[149]]}));this[j[135]][j[94]](j[151],function(v){window[j[93]][j[92]][j[8]]().FB(v);},this);}catch(s){console[j[3]](j[152],s);}},FB:function(w){try{var v=this[j[104]][w[j[153]]()][0];var u=this[j[104]][w[j[153]]()][3];if(u!=null&&u[j[156]](j[155])[j[154]]==2){var t=parseInt(u[j[156]](j[155])[0]);var y=parseInt(u[j[156]](j[155])[1]);ClientLib[j[158]][j[157]].GetInstance().CenterGridPosition(t,y);}if(v){var x=qx[j[161]][j[160]][j[159]]();x[j[163]]()[j[162]]();x[j[165]]()[j[164]](this.ZS,v,0,0);}}catch(s){console[j[3]](j[166],s);}},FN:function(s){this[j[168]][j[167]](m[j[86]](j[25]));this[j[169]]=false;},CBChanged:function(s){this[j[169]]=false;},FA:function(t){var s=new qx[j[171]][j[170]].NumberFormat();s[j[172]](true);s[j[173]](3);if(!isNaN(t)){if(Math[j[174]](t)<100000){t=s[j[170]](Math[j[175]](t));}else{if(Math[j[174]](t)>=100000&&Math[j[174]](t)<1000000){t=s[j[170]](Math[j[175]](t/100)/10)+j[176];}else{if(Math[j[174]](t)>=1000000&&Math[j[174]](t)<10000000){t=s[j[170]](Math[j[175]](t/1000)/1000)+j[177];}else{if(Math[j[174]](t)>=10000000&&Math[j[174]](t)<100000000){t=s[j[170]](Math[j[175]](t/10000)/100)+j[177];}else{if(Math[j[174]](t)>=100000000&&Math[j[174]](t)<1000000000){t=s[j[170]](Math[j[175]](t/100000)/10)+j[177];}else{if(Math[j[174]](t)>=1000000000&&Math[j[174]](t)<10000000000){t=s[j[170]](Math[j[175]](t/1000000)/1000)+j[178];}else{if(Math[j[174]](t)>=10000000000&&Math[j[174]](t)<100000000000){t=s[j[170]](Math[j[175]](t/10000000)/100)+j[178];}else{if(Math[j[174]](t)>=100000000000&&Math[j[174]](t)<1000000000000){t=s[j[170]](Math[j[175]](t/100000000)/10)+j[178];}else{if(Math[j[174]](t)>=1000000000000&&Math[j[174]](t)<10000000000000){t=s[j[170]](Math[j[175]](t/1000000000)/1000)+j[179];}else{if(Math[j[174]](t)>=10000000000000&&Math[j[174]](t)<100000000000000){t=s[j[170]](Math[j[175]](t/10000000000)/100)+j[179];}else{if(Math[j[174]](t)>=100000000000000&&Math[j[174]](t)<1000000000000000){t=s[j[170]](Math[j[175]](t/100000000000)/10)+j[179];}else{if(Math[j[174]](t)>=1000000000000000){t=s[j[170]](Math[j[175]](t/1000000000000))+j[179];}}}}}}}}}}}}}return t.toString();},updateCache:function(){try{}catch(s){console[j[3]](j[180],s);}},setWidgetLabels:function(){try{if(!this[j[115]]){this.FC();}this[j[115]][j[181]](this.ZE);}catch(s){console[j[3]](j[182],s);}},FH:function(){try{var C=new qx[j[118]][j[183]].Flow();var A=new qx[j[118]][j[184]].Composite(C);this[j[185]]=new qx[j[118]][j[186]].SelectBox();this[j[185]][j[187]](25);this[j[185]][j[188]](5);l[j[189]]();l=window[j[10]][j[11]][j[8]]();var y;for(y in l[j[190]]){var x=new qx[j[118]][j[186]].ListItem(y,null,l[j[190]][y].Object);this[j[185]][j[109]](x);if(MaelstromTools[j[142]][j[141]](j[191])==l[j[190]][y][j[193]][j[192]]()){this[j[185]][j[194]]([x]);}}this[j[185]][j[94]](j[195],function(G){this[j[104]]=[];this.FP(0,1,200);this[j[169]]=false;this[j[168]][j[167]](m[j[86]](j[25]));},this);A[j[109]](this.ZC);var F=new qx[j[118]][j[197]].Label()[j[107]]({value:m[j[86]](j[66]),textColor:j[196],margin:5});A[j[109]](F);this[j[198]]=new qx[j[118]][j[186]].SelectBox();this[j[198]][j[199]](50);this[j[198]][j[187]](25);this[j[198]][j[188]](5);var v=MaelstromTools[j[142]][j[141]](j[200],25);for(var s=11;s<41;s+=1){x=new qx[j[118]][j[186]].ListItem(j[201]+s,null,s);this[j[198]][j[109]](x);if(v==s){this[j[198]][j[194]]([x]);}}this[j[198]][j[94]](j[195],function(G){this[j[104]]=[];this.FP(0,1,200);this[j[169]]=false;this[j[168]][j[167]](m[j[86]](j[25]));},this);A[j[109]](this.ZQ);var D=new qx[j[118]][j[197]].Label()[j[107]]({value:m[j[86]](j[70]),textColor:j[196],margin:5});A[j[109]](D);var B=MaelstromTools[j[142]][j[141]](j[202],j[203]);this[j[204]]=new qx[j[118]][j[186]].TextField(B)[j[107]]({width:50});A[j[109]](this.ZY);this[j[205]]=[];this[j[205]][0]=new qx[j[118]][j[186]].CheckBox(m[j[86]](j[33]));this[j[205]][0][j[188]](5);this[j[205]][0][j[206]](j[196]);this[j[205]][0][j[208]](MaelstromTools[j[142]][j[141]](j[207],false));this[j[205]][0][j[94]](j[209],function(G){this[j[104]]=[];this.FP(0,1,200);this[j[169]]=false;this[j[168]][j[167]](m[j[86]](j[25]));},this);A[j[109]](this[j[205]][0]);this[j[205]][1]=new qx[j[118]][j[186]].CheckBox(m[j[86]](j[37]));this[j[205]][1][j[188]](5);this[j[205]][1][j[206]](j[196]);this[j[205]][1][j[208]](MaelstromTools[j[142]][j[141]](j[210],false));this[j[205]][1][j[94]](j[209],function(G){this[j[104]]=[];this.FP(0,1,200);this[j[169]]=false;this[j[168]][j[167]](m[j[86]](j[25]));},this);A[j[109]](this[j[205]][1]);this[j[205]][2]=new qx[j[118]][j[186]].CheckBox(m[j[86]](j[45]));this[j[205]][2][j[188]](5);this[j[205]][2][j[206]](j[196]);this[j[205]][2][j[208]](MaelstromTools[j[142]][j[141]](j[211],false));this[j[205]][2][j[94]](j[209],function(G){this[j[104]]=[];this.FP(0,1,200);this[j[169]]=false;this[j[168]][j[167]](m[j[86]](j[25]));},this);A[j[109]](this[j[205]][2]);this[j[205]][3]=new qx[j[118]][j[186]].CheckBox(m[j[86]](j[43]));this[j[205]][3][j[188]](5);this[j[205]][3][j[206]](j[196]);this[j[205]][3][j[208]](MaelstromTools[j[142]][j[141]](j[212],true));this[j[205]][3][j[94]](j[209],function(G){this[j[104]]=[];this.FP(0,1,200);this[j[169]]=false;this[j[168]][j[167]](m[j[86]](j[25]));},this);A[j[109]](this[j[205]][3],{lineBreak:true});this[j[168]]=new qx[j[118]][j[186]].Button(m[j[86]](j[25]))[j[107]]({width:100,minWidth:100,maxWidth:100,height:25,margin:5});this[j[168]][j[94]](j[90],function(){this.FE();},this);A[j[109]](this.ZG);var z=new qx[j[118]][j[215]].Single(2,j[213],j[214]);this[j[216]]=new qx[j[118]][j[184]].Composite(new qx[j[118]][j[183]].Basic())[j[107]]({decorator:z,backgroundColor:j[217],allowGrowX:false,height:20,width:200});this[j[218]]=new qx[j[118]][j[161]].Widget()[j[107]]({decorator:null,backgroundColor:j[219],width:0});this[j[216]][j[109]](this.ZU);this[j[220]]=new qx[j[118]][j[197]].Label(j[201])[j[107]]({decorator:null,textAlign:j[221],width:200});this[j[216]][j[109]](this.ZX,{left:0,top:-3});A[j[109]](this.ZV);this[j[222]]=new qx[j[118]][j[186]].Button(m[j[86]](j[74]))[j[107]]({minWidth:100,height:25,margin:5});this[j[222]][j[94]](j[90],function(){this[j[223]]=[];},this);A[j[109]](this.YZ,{lineBreak:true});this[j[224]]=new qx[j[118]][j[186]].SelectBox();this[j[224]][j[199]](150);this[j[224]][j[187]](25);this[j[224]][j[188]](5);var x=new qx[j[118]][j[186]].ListItem(j[225]+m[j[86]](MaelstromTools[j[123]].Tiberium)+j[226]+m[j[86]](MaelstromTools[j[123]].Crystal),null,7);this[j[224]][j[109]](x);x=new qx[j[118]][j[186]].ListItem(j[227]+m[j[86]](MaelstromTools[j[123]].Tiberium)+j[228]+m[j[86]](MaelstromTools[j[123]].Crystal),null,6);this[j[224]][j[109]](x);x=new qx[j[118]][j[186]].ListItem(j[229]+m[j[86]](MaelstromTools[j[123]].Tiberium)+j[230]+m[j[86]](MaelstromTools[j[123]].Crystal),null,5);this[j[224]][j[109]](x);A[j[109]](this.ZJ);this[j[231]]=new qx[j[118]][j[186]].Button(m[j[86]](j[232]))[j[107]]({width:120,minWidth:120,maxWidth:120,height:25,margin:5});this[j[231]][j[94]](j[90],function(){var G=window[j[93]][j[85]][j[8]]();if(G[j[106]]!=null){G[j[106]][j[110]]();G.FO();}G[j[91]](j[85],m[j[86]](j[49]));},this);this[j[231]][j[233]](false);A[j[109]](this.ZD);this[j[234]]=new qx[j[118]][j[184]].Composite();this[j[234]][j[235]](new qx[j[118]][j[183]].Flow());this[j[234]][j[199]](750);var w=webfrontend[j[237]][j[183]][j[236]][j[8]]();var u=2;for(u=2;u<this[j[115]][j[139]]();u++){var t=u-2;this[j[238]][t]=new qx[j[118]][j[186]].CheckBox(this[j[115]][j[239]](u));this[j[238]][t][j[208]](this[j[135]][j[138]]()[j[240]](u));this[j[238]][t][j[206]](j[196]);this[j[238]][t][j[241]]=u;this[j[238]][t][j[117]]=this[j[135]];this[j[238]][t][j[94]](j[209],function(G){console[j[3]](j[242],G,G[j[243]](),this[j[241]]);var H=this[j[117]][j[138]]();H[j[143]](this[j[241]],G[j[243]]());MaelstromTools[j[142]][j[107]](j[140]+this[j[241]],G[j[243]]());});this[j[234]][j[109]](this[j[238]][t]);}this[j[244]]=new qx[j[118]][j[186]].Button(j[245])[j[107]]({margin:5});this[j[244]][j[94]](j[90],function(){if(this[j[246]]){A[j[247]](this.ZB,this.ZO);this[j[244]][j[167]](j[248]);}else{A[j[249]](this.ZB);this[j[244]][j[167]](j[245]);}this[j[246]]=!this[j[246]];},this);this[j[244]][j[251]](j[250]);A[j[109]](this.ZO,{lineBreak:true});this[j[252]]=A;}catch(E){console[j[3]](j[253],E);}},FD:function(){var s=ClientLib[j[19]][j[134]].GetInstance()[j[254]]();var v=s[j[255]]();var u=j[256];var t=new qx[j[118]][j[197]].Label()[j[107]]({value:u,rich:true,width:800});this[j[257]]=t;},FE:function(){var w=this[j[185]][j[259]]()[0][j[258]]();ClientLib[j[158]][j[157]].GetInstance().CenterGridPosition(w[j[260]](),w[j[261]]());ClientLib[j[158]][j[157]].GetInstance().Update();ClientLib[j[158]][j[157]].GetInstance().ViewUpdate();ClientLib[j[19]][j[134]].GetInstance()[j[254]]()[j[262]](w[j[192]]());if(this[j[263]]){var v=ClientLib[j[19]][j[266]][j[265]][j[264]];var u=f(v[j[267]],/this\.(.{6})=\(?\(?g>>8\)?\&.*d\+=f;this\.(.{6})=\(/,j[268],2);if(u!=null&&u[1][j[154]]==6){v[j[269]]=function(){return this[u[1]];};}else{console[j[271]](j[270]);}if(u!=null&&u[2][j[154]]==6){v[j[272]]=function(){return this[u[2]];};}else{console[j[271]](j[273]);}v=ClientLib[j[19]][j[266]][j[274]][j[264]];var t=f(v[j[267]],/100\){0,1};this\.(.{6})=Math.floor.*d\+=f;this\.(.{6})=\(/,j[275],2);if(t!=null&&t[1][j[154]]==6){v[j[269]]=function(){return this[t[1]];};}else{console[j[271]](j[276]);}if(t!=null&&t[2][j[154]]==6){v[j[272]]=function(){return this[t[2]];};}else{console[j[271]](j[277]);}v=ClientLib[j[19]][j[266]][j[278]][j[264]];var s=f(v[j[267]],/100\){0,1};this\.(.{6})=Math.floor.*this\.(.{6})=\(*g\>\>(22|0x16)\)*\&7.*=-1;\}this\.(.{6})=\(/,j[279],4);if(s!=null&&s[1][j[154]]==6){v[j[269]]=function(){return this[s[1]];};}else{console[j[271]](j[280]);}if(s!=null&&s[2][j[154]]==6){v[j[281]]=function(){return this[s[2]];};}else{console[j[271]](j[282]);}if(s!=null&&s[4][j[154]]==6){v[j[272]]=function(){return this[s[4]];};}else{console[j[271]](j[283]);}this[j[263]]=false;}if(this[j[104]]==null){this[j[169]]=false;this[j[168]][j[167]](j[284]);this[j[231]][j[233]](false);window[j[286]](j[285],1000);return;}var x=0;for(i=0;i<this[j[104]][j[154]];i++){if(this[j[104]][i][1]==-1){x++;}}if(!this[j[169]]){this[j[168]][j[167]](j[284]);this[j[231]][j[233]](false);if(x>0){this[j[169]]=true;window[j[286]](j[287],1000);return;}else{this[j[169]]=false;window[j[286]](j[285],1000);}}else{this[j[169]]=false;this[j[168]][j[167]](m[j[86]](j[25]));}},FP:function(s,u,t){if(this[j[218]]!=null&&this[j[220]]!=null){this[j[218]][j[199]](parseInt(s/u*t,10));this[j[220]][j[208]](s+j[288]+u);}},FJ:function(){try{this[j[104]]=[];var w=this[j[185]][j[259]]()[0][j[258]]();MaelstromTools[j[142]][j[107]](j[191],w[j[192]]());var x=this[j[198]][j[259]]()[0][j[258]]();MaelstromTools[j[142]][j[107]](j[200],x);MaelstromTools[j[142]][j[107]](j[202],this[j[204]][j[289]]());var v=this[j[205]][0][j[289]]();var u=this[j[205]][1][j[289]]();var t=this[j[205]][2][j[289]]();var N=this[j[205]][3][j[289]]();var M=parseInt(this[j[204]][j[289]](),10);console[j[3]](j[290],v,u,t,N,M);MaelstromTools[j[142]][j[107]](j[207],v);MaelstromTools[j[142]][j[107]](j[210],u);MaelstromTools[j[142]][j[107]](j[211],t);MaelstromTools[j[142]][j[107]](j[212],N);var P=w[j[260]]();var s=w[j[261]]();var L=0;var J=0;var H=ClientLib[j[19]][j[134]].GetInstance()[j[291]]();console[j[3]](j[292]+w[j[293]]());var F=true;var D=true;var B=true;var z=ClientLib[j[19]][j[134]].GetInstance()[j[295]]()[j[294]]();for(J=s-Math[j[175]](z+1);J<=s+Math[j[175]](z+1);J++){for(L=P-Math[j[175]](z+1);L<=P+Math[j[175]](z+1);L++){var y=Math[j[174]](P-L);var K=Math[j[174]](s-J);var I=Math[j[296]]((y*y)+(K*K));if(I<=z){var G=H.GetObjectFromPosition(L,J);var E={};if(G){if(G[j[297]]==1&&F){}if(G[j[297]]==2&&D){}if(G[j[297]]==3&&B){}if(G[j[297]]==3){if(M<=parseInt(G[j[269]](),10)){}}var C=w.CalculateAttackCommandPointCostToCoord(L,J);if(C<=x&&typeof G[j[269]]==j[298]){if(M<=parseInt(G[j[269]](),10)){var A=this.FL(G[j[272]]());if(G[j[297]]==1&&v){if(A!=null){this[j[104]][j[299]](A);}else{this[j[104]][j[299]]([G[j[272]](),-1,m[j[86]](j[33]),L+j[155]+J,G[j[269]](),0,0,0,0,0,0,0,0,C,0,0,0]);}}if(G[j[297]]==2&&u){if(A!=null){this[j[104]][j[299]](A);}else{this[j[104]][j[299]]([G[j[272]](),-1,m[j[86]](j[37]),L+j[155]+J,G[j[269]](),0,0,0,0,0,0,0,0,C,0,0,0]);}}if(G[j[297]]==3&&(t||N)){if(A!=null){if(G[j[281]]()==2&&N){this[j[104]][j[299]](A);}if(G[j[281]]()==3&&t){this[j[104]][j[299]](A);}}else{if(G[j[281]]()==2&&N){this[j[104]][j[299]]([G[j[272]](),-1,m[j[86]](j[43]),L+j[155]+J,G[j[269]](),0,0,0,0,0,0,0,0,C,0,0,0]);}if(G[j[281]]()==3&&t){this[j[104]][j[299]]([G[j[272]](),-1,m[j[86]](j[45]),L+j[155]+J,G[j[269]](),0,0,0,0,0,0,0,0,C,0,0,0]);}}}}}}}}}this[j[169]]=true;this[j[300]]={};this.FP(0,this[j[104]][j[154]],200);this[j[115]][j[301]](4,false);if(this[j[132]][j[302]]!=j[303]){window[j[286]](j[287],50);}}catch(O){console[j[3]](j[304],O);}},FG:function(){try{var F=false;var E=0;var C=10;var H=0;var A=150;while(!F){var y=null;var u=0;var t=0;if(this[j[104]]==null){console[j[3]](j[305]);this[j[169]]=false;break;}for(H=0;H<this[j[104]][j[154]];H++){if(this[j[104]][H][1]==-1){break;}}if(H==this[j[104]][j[154]]){this[j[169]]=false;}this.FP(H,this[j[104]][j[154]],200);if(this[j[104]][H]==null){console[j[3]](j[306]);this[j[169]]=false;this[j[168]][j[167]](m[j[86]](j[25]));this[j[231]][j[233]](true);break;}posData=this[j[104]][H][3];if(posData!=null&&posData[j[156]](j[155])[j[154]]==2){posX=parseInt(posData[j[156]](j[155])[0]);posY=parseInt(posData[j[156]](j[155])[1]);t=this[j[104]][H][0];ClientLib[j[19]][j[134]].GetInstance()[j[254]]()[j[262]](t);y=ClientLib[j[19]][j[134]].GetInstance()[j[254]]().GetCity(t);if(y!=null){if(!y[j[307]]()){var S=y[j[308]]();if(S!=null){var G=this[j[185]][j[259]]()[0][j[258]]();var Q=y[j[310]]()[j[309]];var O=S[j[311]]()[j[309]];var D=G[j[308]]()[j[312]]()[j[309]];if(Q!=null){var B=d(Q);var z=d(O);this[j[104]][H][2]=y[j[293]]();this[j[104]][H][5]=B[ClientLib[j[12]][j[313]][j[148]]]+z[ClientLib[j[12]][j[313]][j[148]]];this[j[104]][H][6]=B[ClientLib[j[12]][j[313]][j[144]]]+z[ClientLib[j[12]][j[313]][j[144]]];this[j[104]][H][7]=B[ClientLib[j[12]][j[313]][j[314]]]+z[ClientLib[j[12]][j[313]][j[314]]];this[j[104]][H][8]=B[ClientLib[j[12]][j[313]][j[315]]]+z[ClientLib[j[12]][j[313]][j[315]]];if(y.GetBuildingsConditionInPercent()!=0){this[j[316]]=0;if(this[j[104]][H][5]!=0){var w=0;var v=0;var N=0;var P=0;var M=0;this[j[300]][t]=new Array(9);for(N=0;N<9;N++){this[j[300]][t][N]=new Array(8);}for(P=0;P<9;P++){for(M=0;M<8;M++){switch(y.GetResourceType(P,M)){case 1:this[j[300]][t][P][M]=1;w++;break;case 2:this[j[300]][t][P][M]=2;v++;break;default:break;}}}this[j[104]][H][9]=w;this[j[104]][H][10]=v;this[j[104]][H][11]=y.GetBuildingsConditionInPercent();this[j[104]][H][12]=y.GetDefenseConditionInPercent();try{var s=D;var R=0;var K=0;for(var J in s){R+=s[J][j[317]]();}s=O;for(var J in s){K+=s[J][j[317]]();}s=Q;for(var J in s){var t=s[J][j[318]]();if(t==158||t==131||t==195){this[j[104]][H][18]=8-s[J][j[319]]();}if(t==112||t==151||t==177){this[j[104]][H][17]=8-s[J][j[319]]();}}}catch(I){console[j[3]](j[320],I);}this[j[104]][H][14]=(K/R);this[j[104]][H][15]=this[j[104]][H][5]+this[j[104]][H][6]+this[j[104]][H][7];this[j[104]][H][16]=this[j[104]][H][15]/this[j[104]][H][13];this[j[104]][H][1]=0;F=true;console[j[3]](y[j[293]](),j[321]);this[j[316]]=0;this[j[322]]=0;this.FK(this[j[104]][H]);}}else{if(this[j[316]]>250){console[j[3]](this[j[104]][H][2],j[323],posX,posY,j[324]);this[j[104]][j[325]](H,1);this[j[316]]=0;this[j[322]]=0;break;}this[j[316]]++;}}}}else{console[j[3]](this[j[104]][H][2],j[323],posX,posY,j[326]);this[j[104]][j[325]](H,1);break;}}}E++;if(E>=C){F=true;break;}}if(this[j[327]]!=H){this[j[327]]=H;this[j[322]]=0;this[j[316]]=0;}else{if(this[j[322]]>16){console[j[3]](this[j[104]][H][2],j[323],posX,posY,j[328]);this[j[104]][j[325]](H,1);this[j[322]]=0;}else{if(this[j[322]]>10){A=500;}else{if(this[j[322]]>4){A=250;}}}this[j[322]]++;}if(this[j[169]]&&window[j[93]][j[92]][j[8]]()[j[106]][j[329]]()){window[j[286]](j[287],A);}else{this[j[168]][j[167]](m[j[86]](j[25]));this[j[169]]=false;}}catch(L){console[j[3]](j[330],L);}},FK:function(s){this[j[223]][j[299]](s);},FL:function(t){for(var s=0;s<this[j[223]][j[154]];s++){if(this[j[223]][s][0]==t){return this[j[223]][s];}}return null;}}});qx[j[332]][j[331]](j[333],{type:j[97],extend:MaelstromTools[j[98]],members:{ZW:null,ZZ:null,ZY:null,ZX:null,FC:function(){try{console[j[3]](j[334]);this[j[335]]=[];this[j[106]][j[105]](0);this[j[106]][j[107]]({resizable:false});this[j[106]][j[108]]();this[j[106]][j[235]](new qx[j[118]][j[183]].Flow()[j[107]]({spacingX:3,spacingY:3}));this[j[223]]=new qx[j[118]][j[184]].Scroll()[j[107]]({width:800,height:350});this[j[204]]=new qx[j[118]][j[184]].Composite();this[j[204]][j[235]](new qx[j[118]][j[183]].Flow()[j[107]]({spacingX:3,spacingY:3}));this[j[106]][j[109]](this.ZZ);this[j[223]][j[109]](this.ZY);this.FO();}catch(s){console[j[3]](j[336],s);}},updateCache:function(){try{}catch(s){console[j[3]](j[337],s);}},setWidgetLabels:function(){try{if(this[j[335]]==null){this.FC();}}catch(s){console[j[3]](j[338],s);}},FO:function(){var F=window[j[93]][j[92]][j[8]]()[j[300]];var D=window[j[93]][j[92]][j[8]]()[j[104]];this[j[220]]=[];var B=window[j[93]][j[92]][j[8]]()[j[224]][j[259]]()[0][j[258]]();var z=null;if(D==null){console[j[3]](j[339]);return;}this[j[335]]=[];var u;var t;var y;var x;var w;for(u in F){for(t=0;t<D[j[154]];t++){if(D[t][0]==u){z=D[t];}}if(z==null){continue;}if(B>4&&B<8){if(B!=z[10]){continue;}}else{continue;}posData=z[3];if(posData!=null&&posData[j[156]](j[155])[j[154]]==2){posX=parseInt(posData[j[156]](j[155])[0]);posY=parseInt(posData[j[156]](j[155])[1]);}var s=j[340];var E=z[2]+j[341]+z[3];s=s+j[342]+E+j[343];for(x=0;x<8;x++){s=s+j[344];for(y=0;y<9;y++){var C=j[201];var A=F[u][y][x];switch(A==undefined?0:A){case 2:C=j[345]+k[j[145]][MaelstromTools[j[123]][j[148]]]+j[346];break;case 1:C=j[345]+k[j[145]][MaelstromTools[j[123]][j[144]]]+j[346];break;default:C=j[345]+k[j[145]][j[81]]+j[346];break;}s=s+j[347]+C+j[348];}s=s+j[349];}s=s+j[350];var v=new qx[j[118]][j[197]].Label()[j[107]]({backgroundColor:j[351],value:s,rich:true});v[j[352]]=u;this[j[220]][j[299]](u);v[j[94]](j[242],function(G){console[j[3]](j[353],this[j[352]]);var H=qx[j[161]][j[160]][j[159]]();H[j[163]]()[j[162]]();H[j[165]]()[j[164]](this.ZS,this[j[352]],0,0);});v[j[354]]=u;this[j[335]][j[299]](v);this[j[204]][j[108]]();for(w=0;w<this[j[335]][j[154]];w++){this[j[204]][j[109]](this[j[335]][w]);}}}}});}function d(p){try{var l=[0,0,0,0,0,0,0,0];if(p==null){return l;}for(var q in p){var n=p[q];var o=MaelstromTools[j[355]].GetUnitLevelRequirements(n);for(var k=0;k<o[j[154]];k++){l[o[k][j[297]]]+=o[k][j[356]]*n[j[357]]();if(n[j[357]]()<1){}}}return l;}catch(m){console[j[3]](j[358],m);}}function e(m){var l;for(l in m){if(typeof(m[l])==j[298]){var k=m[l].toString();console[j[3]](l,k);}}}function f(q,o,n,k){var m=[];var p=q.toString();var l=p[j[359]](/\s/gim,j[201]);m=l[j[360]](o);var r;for(r=1;r<(k+1);r++){if(m!=null&&m[r][j[154]]==6){console[j[3]](n,r,m[r]);}else{if(m!=null&&m[r][j[154]]>0){console[j[361]](n,r,m[r]);}else{console[j[271]](j[362],n,r,j[363]);console[j[361]](n,l);}}}return m;}function g(){try{if(typeof qx!=j[364]&&typeof MaelstromTools!=j[364]){h();}else{window[j[286]](g,1000);}}catch(k){console[j[3]](j[365],k);}}if(/commandandconquer\.com/i[j[367]](document[j[366]])){window[j[286]](g,10000);}};try{var a=document.createElement("script");a.innerHTML="("+b.toString()+")();";a.type="text/javascript";if(/commandandconquer\.com/i.test(document.domain)){document.getElementsByTagName("head")[0].appendChild(a);}}catch(c){console.log("MaelstromTools_Basescanner: init error: ",c);}})();

/***********************************************************************************
Transfer all resources
***********************************************************************************/

// ==UserScript==
// @name Tiberium Alliances Transfer All Resources
// @description Integrates a transfer all feature into the transfer window.
// @namespace transfer_all
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 1.2
// @author KRS_L
// ==/UserScript==
(function () {
  var TransferAll_main = function () {
    var chkbxConfirm = null;
    var resTypeToggle = null;

    function createTransferAll() {
      try {
        console.log('TransferAll loaded');
        chkbxConfirm = new qx.ui.form.CheckBox("");
        resTypeToggle = webfrontend.gui.trade.TradeOverlay.getInstance().getLayoutChildren()[13].getLayoutChildren()[1].getLayout()._getLayoutChildren()[1].getLayoutChildren()[2];
        var btnTransferAll=new webfrontend.ui.SoundButton("Transfer All").set({width:80,enabled:false});

        chkbxConfirm.addListener("changeValue", function () {
          btnTransferAll.setEnabled(chkbxConfirm.getValue());
          if (chkbxConfirm.getValue()) performAction('costCalculation');
        }, this);

        resTypeToggle.addListener("changeValue", function () {
          chkbxConfirm.setValue(false);
        }, this);

        btnTransferAll.addListener("click", function () {
          performAction('transfer');
        }, this);

        webfrontend.gui.trade.TradeOverlay.getInstance().getLayoutChildren()[13].getLayoutChildren()[1].getLayout()._getLayoutChildren()[3].add(btnTransferAll,{right:2,top:100});
        webfrontend.gui.trade.TradeOverlay.getInstance().getLayoutChildren()[13].getLayoutChildren()[1].getLayout()._getLayoutChildren()[3].add(chkbxConfirm,{right:68,top:104});
      } catch (e) {
        console.log("createTransferAll: ", e);
      }
    }

    function performAction(action) {
      try {
        var cities = ClientLib.Data.MainData.GetInstance().get_Cities();
        var ownCity = cities.get_CurrentOwnCity();
        var isTiberium = resTypeToggle.getValue();
        var costLabel = webfrontend.gui.trade.TradeOverlay.getInstance().getLayoutChildren()[13].getLayoutChildren()[1].getLayout()._getLayoutChildren()[3].getLayoutChildren()[1].getLayoutChildren()[1].getLayoutChildren()[2];
        var resType = ClientLib.Base.EResourceType.Crystal;
		var transferCost = 0;
        var resAmount;
        if (isTiberium) resType = ClientLib.Base.EResourceType.Tiberium;

        for (var city in cities.get_AllCities().d) {
          if (city == ownCity.get_Id()) continue;
          resAmount = Math.floor(cities.get_AllCities().d[city].GetResourceCount(resType));
          if (action == 'transfer') ownCity.SelfTrade(city, resType, resAmount);
          if (action == 'costCalculation') transferCost += cities.get_AllCities().d[city].CalculateTradeCostToCoord(ownCity.get_PosX(), ownCity.get_PosY(), resAmount);
        }
        if (action == 'transfer') chkbxConfirm.setValue(false);
        if (action == 'costCalculation') costLabel.setValue(webfrontend.gui.Util.formatNumbersCompactAfterMillion(transferCost));
		if (transferCost > ClientLib.Data.MainData.GetInstance().get_Player().GetCreditsCount()) costLabel.setTextColor("red");
      } catch (e) {
        console.log("performAction: ", e);
      }
    }

    function TransferAll_checkIfLoaded() {
      try {
        if (typeof qx !== 'undefined') {
          if (ClientLib.Data.MainData.GetInstance().get_Player().get_Faction() !== null) {
            createTransferAll();
          } else {
            window.setTimeout(TransferAll_checkIfLoaded, 1000);
          }
        } else {
          window.setTimeout(TransferAll_checkIfLoaded, 1000);
        }
      } catch (e) {
        console.log("TransferAll_checkIfLoaded: ", e);
      }
    }

    if (/commandandconquer\.com/i.test(document.domain)) {
      window.setTimeout(TransferAll_checkIfLoaded, 1000);
    }
  }

  try {
    var TransferAll = document.createElement("script");
    TransferAll.innerHTML = "(" + TransferAll_main.toString() + ")();";
    TransferAll.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) {
      document.getElementsByTagName("head")[0].appendChild(TransferAll);
    }
  } catch (e) {
    console.log("TransferAll: init error: ", e);
  }
})();


/***********************************************************************************
Loot 2.0
***********************************************************************************/


// ==UserScript==
// @name          CnC: Tiberium Alliances Available Loot Summary + Info Ver 2.0
// @description   CROSS SERVERS Loot & troops & bases & distance info.
// @downloadURL   https://userscripts.org/scripts/source/160800.user.js
// @updateURL     https://userscripts.org/scripts/source/160800.meta.js
// @author        MrHIDEn based on Yaeger & Panavia code. Totaly recoded.
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @namespace     MHTools.Loot
// @grant         none
// @version       2.0.0
// ==/UserScript==

 

(function () {
  var MHLootMain = function () {    
    function MHToolsLootCreate() {        
      //console.log('MHToolsLootCreate');
      // Classes
      //=======================================================      
      //Extending webfrontend.gui.options.OptionsPage with new ManagementOptionsPage
      function OptionsPage() {
        try {
          qx.Class.define("MHTools.OptionsPage", {
            type: 'singleton',
            extend: webfrontend.gui.options.OptionsPage,
            construct: function() {
              console.log('Create MHTools.OptionsPage at Loot+Info');
              this.base(arguments);
              this.setLabel('MHTools');
              
              this.extendOptionsWindow();
              
              //Add Content
              var container = this.getContentContainer(); 
              this.tabView = new qx.ui.tabview.TabView();
              container.add(this.tabView);//, {left:40, top:40});
              
              this.removeButtons();
              this.addPageAbout();
              console.log('MHTools: OptionsPage loaded.'); 
            },
            statics: {
              VERSION: '1.0.0',
              AUTHOR: 'MrHIDEn',
              CLASS: 'OptionsPage'
            },
            members: {
              pageCreated: null,
              tabView: null,
              getTabView: function() {
                return this.tabView;
              },
              addPage: function(name) {
                var c = this.tabView.getChildren();
                this.tabView.remove(c[c.length-1]);//remove PageAbout
                var page = new qx.ui.tabview.Page(name);
                page.set({height:220});
                this.tabView.add(page);
                this.addPageAbout();
                return page;
              },
              addPageAbout: function() {
                var page = new qx.ui.tabview.Page("About");
                page.set({height:220});
                this.tabView.add(page);
                page.setLayout(new qx.ui.layout.VBox());
                page.add(new qx.ui.basic.Label("<b>MHTools</b>").set({rich: true}));//, textColor: red
                page.add(new qx.ui.basic.Label("Created: <span style='color:blue'>2012</span>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("Author: <span style='color:blue'><b>MrHIDEn</b></span>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("Email: <a href='mailto:mrhiden@outlook.com'>mrhiden@outlook.com</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("Public: <a href='https://userscripts.org/users/471241'>userscripts.org - MrHIDEn</a></br> ").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<b>Scripts:</b>").set({rich: true,marginTop:5}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/137978'>Aviable Loot +Info</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/135806'>Shortcuts +Coords</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<b>Shorten Scripts:</b>").set({rich: true,marginTop:5}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/136743'>Coords 500:500</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/145657'>Pure Loot summary</a>").set({rich: true,marginLeft:10}));
                page.add(new qx.ui.basic.Label("<a href='https://userscripts.org/scripts/show/137955'>Login x9 + Logout</a>").set({rich: true,marginLeft:10}));
              },
              removeButtons: function() {
                this.getChildren()[2].removeAll();
              },
              getContentContainer: function() {
                  if(!this.contentCnt) {
                      this.contentCnt = this.getChildren()[0].getChildren()[0];
                  }
                  return this.contentCnt;
              },
              extendOptionsWindow: function() {
                var self = this;
                if(!webfrontend.gui.options.OptionsWidget.prototype.baseShow) {
                  webfrontend.gui.options.OptionsWidget.prototype.baseShow = webfrontend.gui.options.OptionsWidget.prototype.show;
                }
                webfrontend.gui.options.OptionsWidget.prototype.show = function() {
                  try {
                    var tabView = this.clientArea.getChildren()[0];
                    tabView.add(self);
                    webfrontend.gui.options.OptionsWidget.prototype.show = webfrontend.gui.options.OptionsWidget.prototype.baseShow;
                    self.pageCreated = true;
                    this.show();
                  } catch (e) {            
                    console.warn("MHTools.OptionsPage.extendOptionsWindow: ", e);
                  }
                };
              }
            }
          });
        } catch (e) {
          console.warn("qx.Class.define(MHTools.OptionsPage: ", e);      
        }
      }
      //=======================================================  
      try {
        qx.Class.define("MHTools.Loot", {
          type: 'singleton',
          extend: qx.core.Object,
          construct: function() {         
            //console.log('Create MHTools.Loot');
            this.stats.src = 'http://goo.gl/IDap9';//2.0.x
            //this.base(arguments);
            for(var k in this.resPaths) {
              this.resImages.push(new qx.ui.basic.Image("webfrontend/ui/common/"+this.resPaths[k]).set({Scale:true,Width:16,Height:16}));
            }
            for(var k in this.troopPaths) {
              this.troopImages.push(new qx.ui.basic.Image("https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/"+this.troopPaths[k]).set({Scale:true,Width:16,Height:16}));
            }
            // reload bases stored in browser
            //this.lootList.reloadList();
            
            for(k in ClientLib.Vis.VisObject.EObjectType) this.LObjectType[ClientLib.Vis.VisObject.EObjectType[k]] = k;
            
            // window
            this.Self = this;
            var backColor = '#eef';
            var region = ClientLib.Vis.VisMain.GetInstance().get_Region();
            var viewW = region.get_ViewWidth();
            this.win = (new qx.ui.window.Window("Loot 2.0"));
            this.win.set({
              width:350,
              //showMinimize:false,
              showMaximize:false,
              showClose:false,
              //appearance:'navigator',
              contentPadding: 6,
              allowClose:false,
              //allowMinimize:false,
              resizable:false,                  
              toolTipText: "MrHIDEn tool - Loot 2.0"
            });
            //http://demo.qooxdoo.org/2.0.2/apiviewer/#qx.ui.mobile.core.Widget~dblclick!event
            //mouseover
            //qx.event.Timer.once(fun,obj,time)
            this.win.addListener("minimize",function(e) {
              if(this.extMinimized) {
                this.extMinimized = false;
                this.extPrint();
              }
              else {
                this.extMinimized = true;                
                this.win.removeAll();
              }
              this.win.restore();//trick
            },this);
            this.win.moveTo(viewW-10-this.win.getWidth(),35);
            var winLayout = new qx.ui.layout.Grid(5,5);
            this.win.setLayout(winLayout);
            this.win.setTextColor('yellow');            
            //this.win.open();
            
            //this.extTimer = new qx.event.Timer.once(this.extOnTimer,this,500);
            //this.extTimer.setEnabled(false);
            //this.extTimer.stop();
            this.extTimer = new qx.event.Timer(1000);
            this.extTimer.addListener("interval",this.extOnTimer,this);
            
            // extend
            console.log('extendObjectMenu');
            //this.extendObjectMenu();
            
            //this.extendOwnBase();   
            //this.extendAllianceBase();
            //this.extendPlayerBase();
            //this.extendForgottenCamp();
            //this.extendForgottenBase();
            //this.extendOptionsWindow();
            //this.extendPOI();
            //this.extendHUB();
            //this.extendHUBServer();
            //this.extendRUIN();
            this.extendSelectionChange();
            //options
            this.addLootPage();
            //bypass
            this.loadBypass();
            //rdy
            console.log('MHTools: Loot+Info loaded.'); 
          },
          statics : {
            VERSION: '2.0.0',
            AUTHOR: 'MrHIDEn',
            CLASS: 'Loot',
            DATA: this.Data
          },
          properties: {
          },
          members : {
            Self: null,
            win: null,
            //extStoreName: 'MHToolsLootWin',
            extItems: [],
            extMinimized: false,
            extTimer: null,
            extAdd: function(l,p) {
              this.extItems.push(l,p);
            },
            extPrint: function(k) {            
              this.win.removeAll();
              if(!this.extMinimized) {
                for(var i=0;i<this.extItems.length;i+=2) {
                  this.win.add(this.extItems[i],this.extItems[i+1]);
                }
              }
              this.win.open();
            },
            extOnTimer: function() {
              //console.log('extOnTimer');
              this.onSelectionChange('Timer');
              this.extPrint();
            },
            // setttings
            settings: {
              showLoot:                {v:true,  d:true,  l:'Shows Loot resources info'},
              showTroops:              {v:false, d:false, l:'Shows overall Hitpoints for Troops'},
              showTroopsExtra:         {v:false, d:false, l:'Shows Troops Hitpoints for Vehicles/Aircrafts/Infantry'},
              showInfo:                {v:true,  d:true,  l:'Shows HP/HC/DF/CY info'},
              showColumnCondition:     {v:false, d:false, l:'Shows your progress against DF/CY'},
              showRepairTime:          {v:true,  d:true,  l:'Shows Repair Times info for Enemy Base/Camp/Outpost'},
              showAllyRepairTimeInfo:  {v:true,  d:true,  l:'Shows Ally/Your Repair Times info'},
              showLevels:              {v:true,  d:true,  l:'Shows Levels of Base/Defence/Offence info'},
              showColumnLetter:        {v:false, d:false, l:'Shows columns letters for DF/CY position Ex A-1 or E-4. If \'false\' shows only 1 or 4'},
              showDistance:            {v:true,  d:true,  l:'Shows distance from selected base to the selected object'}
              //,showMeasure:             {v:true,  d:true,  l:'Shows distance from locked object to the selected object'}
            },
            // pictures
            stats: document.createElement('img'),
            resPaths: [
              "icn_res_research_mission.png",
              "icn_res_tiberium.png",
              "icn_res_chrystal.png",
              "icn_res_dollar.png"
            ],
            resImages: [],
            troopPaths: [
              "d8d4e71d9de051135a7f5baf1f799d77.png",//inf
              "af8d7527e441e1721ee8953d73287e9e.png",//veh
              "5f889719f06aad76f06d51863f8eb524.png",//stu
              "6962b667bd797fc2e9e74267e1b3e7c3.png" //air
            ],
            troopImages: [],
            
            // store v2 - compact
            lootList: {
              list: {
                l: [],
                max: 50,//na
                idx: 0,//na
              },
              storeName: 'MHToolsLootList2',
              getIndex: function() {//in use
                var res = -1;
                try {
                  var l = this.list.l;
                  var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                  for(i=0;i<this.list.max;i++) {
                    if(typeof(l[i])=='undefined') continue;
                    if(l[i]===null) continue;
                    if(l[i].id == id) {
                      res = i;
                      break;
                    }
                  }
                } catch (e) {
                  console.warn("save: ", e);
                }
                return res;
              },
              reloadList: function() {//in use
                var S = ClientLib.Base.LocalStorage;
                var l = null;
                // JSON - disabled
                //if (S.get_IsSupported()) l = S.GetItem(this.storeName);
                if(l!==null) this.list = l;
                //console.log('MHTools: LootList reloaded/created');
              },
              save: function(d) {//in use
                try {
                  var l = this.list.l;
                  var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                  var c = {id:id, Data:d};
                  var S = ClientLib.Base.LocalStorage;
                  for(var i=0;i<this.list.max;i++) {
                    if(typeof(l[i])=='undefined') continue;
                    if(l[i]===null) continue;
                    if(l[i].id == id) 
                    {
                      // found
                      l[i] = c;
                      // JSON - disabled
                      //if (S.get_IsSupported()) S.SetItem(this.storeName, this.list);
                      // done
                      return;
                    }
                  }
                  // new
                  l[this.list.idx] = c;
                  if(++this.list.idx >= this.list.max) this.list.idx = 0;
                  // JSON - disabled
                  //if (S.get_IsSupported()) S.SetItem(this.storeName, this.list);   
                } catch (e) {
                  console.warn("save: ", e);
                }
              },
              load: function() {//in use
                try {
                  var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                  var i = this.getIndex();
                  if(i>=0) return this.list.l[i];
                  return {id:id,Data:{}};     
                } catch (e) {
                  console.warn("load: ", e);
                }
              },
              store: function(k, d) {//in use
                try {
                  var mem = this.load().Data;
                  mem[k] = d;
                  this.save(mem);        
                } catch (e) {
                  console.warn("store: ", e);
                }
              },
              restore: function(k) {//?? not in use
                //console.log('this.lootList.restore');
                try {
                  var mem = this.load().Data;
                  if(typeof(mem[k])=='undefined') return 'undefined';
                  return mem[k];    
                } catch (e) {
                  console.warn("restore: ", e);
                }
              }              
            },  
            
            // bases
            Data: {},
            // display containers
            lootWindowPlayer: null,
            lootWindowBase: null,
            lootWindowCamp: null,
            lootWindowOwn: null,
            lootWindowAlly: null,
            lootWindowPOI: null,
            lootWindowRUIN: null,
            lootWindowHUBServer: null,
            //waiting: [1,'','.','..','...','...?'],          
            waiting: [1,'>-','->','--','-<','<-','??'],          
            Display: {
              troopsArray: [],
              lootArray: [],
              iconArrays: [],
              infoArrays: [],
              twoLineInfoArrays: [],
              distanceArray: []
            },
            LObjectType: [],
            // HELPERS
            kMG: function(v) {
              var t = [ '', 'k', 'M', 'G', 'T', 'P' ];
              var i = 0;
              while (v > 1000 && i < t.length) {
                v = (v / 1000).toFixed(1);
                i++;
              }
              return v.toString().replace('.',',') + t[i];
            },
            numberFormat: function(val,fixed) {
              return val.toFixed(fixed).replace('.',',');
            },
            hms: function(s) {
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              s = s.toFixed(0);
              r += (s<10?"0"+s.toString():s.toString());
              return r;
            },
            dhms: function(s) {
              var d = Math.floor(s/86400); s%=86400;
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (d<1?"":d.toString() + ":");
              r += (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              s = s.toFixed(0);
              r += (s<10?"0"+s.toString():s.toString());
              return r;
            },
            dhms2: function(s) {
              var d = Math.floor(s/86400); s%=86400;
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (d<1?"":d.toString() + "d ");//  3:01:23:45
              r += (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              s = s.toFixed(0);
              r += (s<10?"0"+s.toString():s.toString()) + "";
              return r;
            },
            hmsRT: function(city, type) {
              var nextLevelFlag = false;
              var s = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(type, nextLevelFlag);
              var h = Math.floor(s/3600); s%=3600;
              var m = Math.floor(s/60); s%=60;
              var r = (h<10?"0"+h.toString():h.toString()) + ":";
              r += (m<10?"0"+m.toString():m.toString()) + ":";
              r += (s<10?"0"+s.toString():s.toString());
              return r;
            },
            // BYPASS
            getBypass: function(c,d) {
              try {
                function getKeys(obj, d) {
                  for (var k in obj) {
                    var o = obj[k];
                    if (o === null) continue;
                    if (typeof(o.c) == 'undefined') continue;//count
                    if (o.c === 0) continue;//empty
                    if (typeof(o.d) == 'undefined') continue;//data {}
                    var ks = Object.keys(o.d);
                    if (ks.length != o.c) continue;
                    var u = o.d[ks[0]];
                    if(typeof(u) != 'object') continue;                  
                    if(typeof(u.get_UnitLevelRepairRequirements) != 'function') continue;
                    if(typeof(u.GetUnitGroupType) ==  'undefined') {
                      // buildings
                      d.Keys.Buildings = k;
                      //c.GetNumBuildings.toString()==return this.XUQAIB.YYZSYN().c; //YYZSYN()==return this.GBZDQJ; //==this.XUQAIB.GBZDQJ.c
                    } else {
                      // units 3-attack
                      if(u.GetUnitGroupType()) {
                        d.Keys.Offences = k;
                      } else {
                        // units 0-defend
                        d.Keys.Defences = k;
                      }
                    }
                  }
                  if(typeof(d.Keys.Buildings)!='undefined') {
                    ClientLib.Data.City.prototype.kBuildings = d.Keys.Buildings;
                    ClientLib.Data.City.prototype.get_Buildings = function(){return this.get_CityBuildingsData()[this.kBuildings];};
                  }
                  if(typeof(d.Keys.Offences)!='undefined') {
                    ClientLib.Data.City.prototype.kOffenseUnits = d.Keys.Offences;
                    ClientLib.Data.City.prototype.get_OffenseUnits = function(){return this.get_CityUnitsData()[this.kOffenseUnits];};
                  }
                  if(typeof(d.Keys.Defences)!='undefined') {
                    ClientLib.Data.City.prototype.kDefenseUnits = d.Keys.Defences;
                    ClientLib.Data.City.prototype.get_DefenseUnits = function(){return this.get_CityUnitsData()[this.kDefenseUnits];};
                  }
                }
                if(typeof(d.Keys)=='undefined') d.Keys={};
                getKeys(c.get_CityBuildingsData(), d);
                getKeys(c.get_CityUnitsData(), d);
                var cnt=Object.keys(d.Keys).length;
                if(cnt==3) {
                  console.log('MHTools.Loot Helpers are ready:');
                  console.log(d.Keys);
                  delete d.Keys;
                  this.getBypass = function(){return true;};
                  return true;
                }
                else console.log('#Keys(!=3): ',cnt);
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
              }
              //return d.Bypass.Rdy;
              return false;
            },
            loadBypass: function(self) {
              try {                
                if(typeof(self)=='undefined') self = this;
                var ac=ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
                if(Object.keys(ac).length<1) {
                  window.setTimeout(self.loadBypass, 5000, self); // check again
                  return;
                }
                for(k in ac) if(self.getBypass(ac[k],self.Data)) break;
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
              }
            },
            getData: function(city) {
              try {   
                var l = {};  
                if(!this.getBypass(city,this.Data)) return l;
                
                l.Buildings = city.get_Buildings();
                l.Defences = city.get_DefenseUnits();
                l.Offences = city.get_OffenseUnits();
                
                l.rdy = true;              
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
              }               
              return l;
            },
            loadBase: function() {
                try {
                  if (typeof(this.Data.lastSelectedBaseId)=='undefined') this.Data.lastSelectedBaseId = -1;//, Bypass: {}};
                  
                  var d = this.Data;         
                              
                  d.selectedBaseId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                  d.selectedOwnBaseId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
                  
                  if (d.lastSelectedBaseId !== d.selectedBaseId) d.loaded = false;
                  d.lastSelectedBaseId = d.selectedBaseId;  
                  
                  d.IsOwnBase = d.selectedBaseId === d.selectedOwnBaseId;
                              
                  d.cc = ClientLib.Data.MainData.GetInstance().get_Cities();
                  
                  //d.ec = d.cc.GetCity(d.selectedBaseId);// this is very nice function
                  d.ec = d.cc.get_CurrentCity();
                  if(d.ec === null) return false;
                  if(d.ec.get_CityBuildingsData() === null) return false;         
                  if(d.ec.get_CityUnitsData() === null) return false;         
                  
                  d.oc = d.cc.get_CurrentOwnCity();            
                  if(d.oc === null) return false;
                  if(d.oc.get_CityBuildingsData() === null) return false;
                  if(d.oc.get_CityUnitsData() === null) return false;
                  
                  d.ol = this.getData(d.oc);
                  d.el = this.getData(d.ec);// Buildings Defence Offence               
                  if(typeof(d.ol)=='undefined') return false;
                  if(typeof(d.el)=='undefined') return false;

                  if(d.el.Buildings.c === 0) return false;
                  if(d.ol.Buildings.c === 0) return false;
                  
                  d.loaded = true;
                  return true;
              } catch (e) {
                console.warn("MHTools.Loot.",arguments.callee.name,': ', e);
                console.dir("MHTools.Loot.Data: ",this.Data);
                return false;
              }
            },
            getImportants: function(list) {         
              list.Support = {Condition: '-',Row: '-',Column: '-'};
              list.CY = {Condition: '-',Row: '-',Column: '-'};
              list.DF = {Condition: '-',Row: '-',Column: '-'};
              if(!this.settings.showInfo.v) return;
              for (var j in list.Buildings.d) {
                var building = list.Buildings.d[j];
                var mod = building.get_HitpointsPercent();
                var id = building.get_MdbUnitId();
                if(id >= 200 && id <= 205) {
                  list.Support.Condition = 100*mod;
                  list.Support.Row = 8-parseInt(building.get_CoordY());
                  list.Support.Column = building.get_CoordX();
                } 
                else {
                  switch (id) {
                    case 112: // CONSTRUCTION YARD
                    case 151:
                    case 177:
                      list.CY.Condition = 100*mod;
                      list.CY.Row = 8-parseInt(building.get_CoordY());
                      list.CY.Column = building.get_CoordX();
                      break;
                    case 158: // DEFENSE FACILITY
                    case 131:
                    case 195:
                      list.DF.Condition = 100*mod;
                      list.DF.Row = 8-parseInt(building.get_CoordY());
                      list.DF.Column = building.get_CoordX();
                      break;
                    default:
                      break;
                  }
                }
              }
            },
            getLoots: function (ul,r) { 
              if(typeof(r)=='undefined') r={}; 
              //console.log('r',r);
              var t={1:'T',2:'C',3:'G',6:'RP',7:'RCB',8:'RCA',9:'RCI',10:'RCV'};//translate, ClientLib.Base.EResourceType.XXX
              for (var j in ul.d) {
                var u = ul.d[j];// unit/building
                //here are key infos about units ranges and behavior and more 
                //console.log(u.get_UnitGameData_Obj().n,u.get_UnitGameData_Obj());// unit/building
                var p = u.get_HitpointsPercent();// 0-1 , 1 means 100%               
                var cl = u.get_UnitLevelRepairRequirements();// EA API Resources/Repair Costs                
                for (var i in cl) {
                  var c = cl[i];//Requirement/Cost
                  if(typeof(c)!='object') continue;                
                  var k = (typeof(t[c.Type])=='undefined')?c.Type:t[c.Type];//translate if possible
                  if(typeof(r[k])=='undefined') r[k] = 0;//add branch
                  r[k] += p * c.Count;                 
                }
              }
              return r;
            },
            calcResources: function () {
              try {          
                if (!this.settings.showLoot.v) return;

                if (!this.Data.loaded) return;
                
                this.Display.lootArray = [];            
                
                var el = this.Data.el;
                var ec = this.Data.ec;
                
                var loots = {RP:0, T:0, C:0, G:0};//for getLoots
                
                this.getLoots(el.Buildings,loots);
                this.getLoots(el.Defences,loots);
                
                if(el.Offences.c>0) {
                  var off = this.getLoots(el.Offences);                  
                  //console.log('Offences: ',off);
                }
                
                this.Display.lootArray[0] = loots.RP;
                this.Display.lootArray[1] = loots.T;
                this.Display.lootArray[2] = loots.C;
                this.Display.lootArray[3] = loots.G;
                            
                this.lootList.store('lootArray',this.Display.lootArray);
              } catch (e) {
                console.warn("MHTools.Loot.calcResources: ", e);
                console.dir("MHTools.Loot.~.Data:",this.Data);
              }
            },
            calcTroops: function () {
              try {
                if (!this.settings.showTroops.v) return;            

                if (!this.Data.loaded) return;            
                
                var troops = [0, 0, 0, 0, 0]; 
                
                var el = this.Data.el; 
                  
                // enemy defence units
                for (var j in el.Defences.d) {
                  var unit = el.Defences.d[j];
                  var h = unit.get_Health();//EA API
                  troops[0] += h;
                  if (this.settings.showTroopsExtra.v) {
                    switch (unit.get_UnitGameData_Obj().mt) {//keyTroop // TODO check .mt
                      case ClientLib.Base.EUnitMovementType.Feet:
                        troops[1] += h;
                        break;
                      case ClientLib.Base.EUnitMovementType.Track:
                      case ClientLib.Base.EUnitMovementType.Wheel:
                        troops[2] += h;
                        break;
                      case ClientLib.Base.EUnitMovementType.Structure:
                        troops[3] += h;
                        break;
                      case ClientLib.Base.EUnitMovementType.Air:
                      case ClientLib.Base.EUnitMovementType.Air2:
                        troops[4] += h;
                        break;
                    }
                  }
                }
                this.Display.troopsArray = troops;
                this.lootList.store('troopsArray',this.Display.troopsArray);
              } catch (e) {
                console.warn("MHTools.Loot.calcTroops: ", e);
                console.dir("MHTools.Loot.~.Data:",this.Data);
              }
            },
            calcInfo: function () { 
              this.Display.infoArrays = [];
              this.Display.twoLineInfoArrays = [];
              
              if (!this.Data.loaded) return;
              
              var hp;
              var t;         
              
              //var cc = this.Data.cc;
              var oc = this.Data.oc;
              var ec = this.Data.ec; 
              
              var ol = this.Data.ol;
              var el = this.Data.el; 
              
              if(this.settings.showInfo.v) { 
                try {                   
                  var ohp=0, dhp=0;
                  for (var k in ol.Offences.d) ohp += ol.Offences.d[k].get_Health();//own of units
                  for (var k in el.Defences.d) dhp += el.Defences.d[k].get_Health();//ene df units
                                  
                  // find CY & DF row/line
                  this.getImportants(el);
                  
                  hp = {};
                  hp.name = '<b>Info</b> (HP,HC - D/O ratio. Row.)';
                  hp.lbs = ['HP:','HC:','DF:','CY:'];
                  t = [];
                  t.push(this.numberFormat(dhp/ohp, 2));
                  t.push(this.numberFormat(ec.get_TotalDefenseHeadCount()/oc.get_TotalOffenseHeadCount(), 2));
                  var abc = "ABCDEFGHI";//abc[column]
                  if(this.settings.showColumnLetter.v) {
                    if(el.DF !== undefined) {t.push(abc[el.DF.Column]+ '-' + el.DF.Row);} else { t.push('??');}  
                    if(el.CY !== undefined) {t.push(abc[el.CY.Column]+ '-' + el.CY.Row);} else { t.push('??');}  
                  } else {
                    if(el.DF !== undefined) {t.push(el.DF.Row);} else { t.push('??');}  
                    if(el.CY !== undefined) {t.push(el.CY.Row);} else { t.push('??');}   
                  }                
                  hp.val = t;
                  this.Display.infoArrays.push(hp);
                  // store
                  this.lootList.store('infoArrays',this.Display.infoArrays);                           
                } catch (e) {
                  console.log("MHTools.Loot.calcInfo 1: ", e);
                }
              }            
              if(this.settings.showColumnCondition.v) { 
                try {   
                  var bl = el.Buildings.d;
                  var dl = el.Defences.d;
                  
                  for(var k in bl) {
                    var b = bl[k];
                    if(b.get_TechName() == ClientLib.Base.ETechName.Defense_Facility) df = b;
                    if(b.get_TechName() == ClientLib.Base.ETechName.Construction_Yard) cy = b;
                  }

                  var tb;
                  var tbhp;
                  var cnt;
                  var mi;
                  var ma;
                  var dc;
                  
                  // CY
                  tb = cy;
                  cnt = 0;
                  tbhp = 0;
                  dc = 1;
                  mi = tb.get_CoordX() - dc;
                  ma = tb.get_CoordX() + dc;
                  // scan
                  for(var k in bl) {
                    var o = bl[k];  
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  for(var k in dl) {
                    var o = dl[k];  
                    //if(o.get_CoordX() == tb.get_CoordX()) {
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  tbhp = 100 * tbhp / cnt;
                  var cyhp = tbhp;

                  // DF
                  tb = df;
                  cnt = 0;
                  tbhp = 0;
                  dc = 1;
                  mi = tb.get_CoordX() - dc;
                  ma = tb.get_CoordX() + dc;
                  for(var k in bl) {
                    var o = bl[k];  
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  for(var k in dl) {
                    var o = dl[k];  
                    if(o.get_CoordX() >= mi && o.get_CoordX() <= ma) {
                      if(o.get_CoordY() >= tb.get_CoordY()) {
                        cnt++;
                        tbhp += o.get_HitpointsPercent();
                      }
                    }
                  }
                  tbhp = 100 * tbhp / cnt;
                  var dfhp = tbhp;               
                  
                  hp = {};
                  hp.name = '<b>CY & DF column HP [%]</b>';
                  hp.lbs = ['CY:','DF:'];
                  t = [];
                  t.push(this.numberFormat(cyhp, 0));
                  t.push(this.numberFormat(dfhp, 0));        
                  hp.val = t;
                  this.Display.infoArrays.push(hp);
                  //this.Display.twoLineInfoArrays.push(hp);
                  // store
                  this.lootList.store('infoArrays',this.Display.infoArrays);                       
                } catch (e) {
                  console.log("MHTools.Loot.calcInfo 2: ", e);
                }
              }
              if(this.settings.showRepairTime.v) { 
                try {                 
                  var a = oc.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);//false // RT Defense
                  var v = oc.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);//false // RT Defense
                  var i = oc.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);//false // RT Defense
                  var m = Math.max(a,v,i);
                  
                  var aa = oc.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);
                  var av = oc.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                  var ai = oc.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);                
                  var am = Math.min(aa,av,ai);
                  
                  var ohp=0;
                  ohp = oc.GetOffenseConditionInPercent();
                  
                  var ool = this.numberFormat(oc.get_LvlOffense(), 1);
                  
                  hp = {};
                  hp.name = '<b>Repair time (Your offence)</b>';
                  hp.lbs = ['Maximum:','Available:','Health:','Level:'];
                  t = [];
                  t.push(this.hms(m)); 
                  t.push(this.hms(am));
                  t.push(ohp);
                  t.push(ool);                 
                  hp.val = t;
                  //this.Display.infoArrays.push(hp);
                  this.Display.twoLineInfoArrays.push(hp);              
                  // store
                  this.lootList.store('twoLineInfoArrays',this.Display.twoLineInfoArrays);                       
                } catch (e) {
                  console.log("MHTools.Loot.calcInfo 3: ", e);
                }
              }
            },
            calcFriendlyInfo: function() {
              this.Display.twoLineInfoArrays = [];
              if(!this.settings.showLevels.v && !this.settings.showAllyRepairTimeInfo.v) return;
                          
              try { 
                if (!this.Data.loaded) return;            
                
                var hp;
                var t;
                
                //var cc = this.Data.cc;
                var oc = this.Data.oc;
                var ec = this.Data.ec;
                
                var ol = this.Data.ol;
                var el = this.Data.el;            
                
                var IsOwn = this.Data.IsOwnBase;                
                
                
                if(this.settings.showLevels.v) { 
                  var sd = ec.get_SupportData();
                  var sn;
                  var sl;
                  if(sd !== null) {
                    sl = sd.get_Level();
                    sn = ec.get_SupportWeapon().dn; 
                  }
                
                  hp = {};
                  hp.name = '<b>Levels</b>';
                  hp.lbs = ['Base:','Defence:','Offence:','Support:'];
                  t = [];
                  if(el.Buildings.c>0) t.push(this.numberFormat(ec.get_LvlBase(), 1)); else t.push('--');  
                  if(el.Defences.c>0) t.push(this.numberFormat(ec.get_LvlDefense(), 1)); else t.push('--');  
                  if(el.Offences.c>0) t.push(this.numberFormat(ec.get_LvlOffense(), 1)); else t.push('--'); 
                  if(sd !== null) t.push(this.numberFormat(sl, 1)); else t.push('--'); 
                  hp.val = t;
                  this.Display.twoLineInfoArrays.push(hp);
                }
              
                if(this.settings.showAllyRepairTimeInfo.v) {
                  
                  var a = ec.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);//false // RT Defense
                  var v = ec.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);//false // RT Defense
                  var i = ec.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);//false // RT Defense
                  var m = Math.max(a,v,i);
                  
                  var aa = ec.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir);
                  var av = ec.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh);
                  var ai = ec.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf);                
                  var am = Math.min(aa,av,ai);
                  
                  var ofl;              
                  var ohp=0;
                  if(el.Offences.c>0) {
                    //my
                    //for (var k in el.Offences.d) ohp += el.Offences.d[k].get_HitpointsPercent();//get_Health();//Health - hitpoints
                    //ohp = 100.0 * ohp / el.Offences.c;
                    //console.log('Health',ohp,ec.GetOffenseConditionInPercent());
                    //ohp = this.numberFormat(ohp, 0);
                    //ea
                    ohp = ec.GetOffenseConditionInPercent();
                    //ohp = ec.GetOffenseConditionInPercent();//GetOffenseConditionInPercent ()
                    ofl = this.numberFormat(ec.get_LvlOffense(), 1);
                    //console.log('ec',ec,'ec.get_LvlOffense()',ec.get_LvlOffense());
                  } else {
                    ohp = '---';
                    ofl = '---';
                  }
                  
                  hp = {};
                  hp.name = IsOwn?'<b>Repair time (Your offence)</b>':'<b>Repair time (Ally offence)</b>';
                  hp.lbs = ['Maximum:','Available:','Health:','Level:'];
                  t = [];
                  t.push(this.hms(m)); 
                  //t.push('---');
                  t.push(this.hms(am));
                  t.push(ohp); 
                  t.push(ofl);       
                  hp.val = t;
                  this.Display.twoLineInfoArrays.push(hp);
                } 
                //this.Display.twoLineInfoArrays = twoLineInfoArrays;
                this.lootList.store('twoLineInfoArrays',this.Display.twoLineInfoArrays); 
              } catch (e) {
                console.warn("MHTools.Loot.calcFriendlyInfo: ", e);
              }
            },
            calcDistance: function () {
              this.Display.distanceArray = [];
              
              var hp;
              
              if(!this.settings.showDistance.v) return;
              //console.log('calcDistance');              
              try {                
                var visObject = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
                if (visObject != null) {// && visObject.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionCityType)
                  var t = visObject.get_VisObjectType();
                  //this.LObjectType

                  var oc = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                  switch (t) {    
                    /* RegionCityType
                    RegionSuperWeaponType
                    RegionTerrainType
                    RegionMoveTarget
                    RegionFreeSlotType
                    RegionNPCBase
                    RegionNPCCamp
                    RegionPointOfInterest
                    RegionRuin
                    RegionGhostCity
                    RegionNewPlayerSpot
                    RegionHub  */               
                    case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                    case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
                    case ClientLib.Vis.VisObject.EObjectType.RegionRuin: 
                    case ClientLib.Vis.VisObject.EObjectType.RegionHubControl:
                    case ClientLib.Vis.VisObject.EObjectType.RegionHubCenter: 
                      //var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                      //var pixelX = visObject.get_X();
                      //var pixelY = visObject.get_Y();
                      var ser = ClientLib.Data.MainData.GetInstance().get_Server();
                      var selX = visObject.get_RawX();
                      var selY = visObject.get_RawY();
                      var ocX = oc.get_X();
                      var ocY = oc.get_Y();          
                      var cenX = ser.get_ContinentWidth() / 2;
                      var cenY = ser.get_ContinentHeight() / 2; 
                        
                      //target is locet by button
                      if(typeof(this.Data.Lock)=='undefined') {
                        this.Data.Lock={X:ocX,Y:ocY};//{X:0,Y:0};
                      }
                      var locX = this.Data.Lock.X;                    
                      var locY = this.Data.Lock.Y; 

                      if(typeof(this.Data.Selected)=='undefined') {
                        this.Data.Selected={};
                      }
                      this.Data.Selected={X:selX,Y:selY};

                      var dis = ClientLib.Base.Util.CalculateDistance(ocX, ocY, selX, selY).toString();
                      var cen = ClientLib.Base.Util.CalculateDistance(cenX, cenY, selX, selY);
                      var loc = ClientLib.Base.Util.CalculateDistance(locX, locY, selX, selY);
                      var cdt = oc.GetCityMoveCooldownTime(selX,selY);//cool down time
                      var stp = dis / 20;//steps
                      this.Data.Distance = dis;
                      this.Data.MeasureDistance = loc;
                      
                      //console.dir(this.Data);
                      //console.log('Distance:',dis,'EMT:',this.dhms2(cdt),'Steps:',stp);
                      //console.log('Distance:',dis,'Distance.toString:',dis.toString());
                      
                      var hp = {};
                      hp.name = '<b>Movement</b>';
                      hp.lbs = ['Distance:','EMT:','Steps:','To center:'];
                      var t = [];
                      t.push(dis);
                      t.push(this.dhms2(cdt));
                      t.push(stp);       
                      t.push(cen);       
                      hp.val = t;
                      this.Display.distanceArray.push(hp);
//NOTE
//ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition
//ClientLib.Data.WorldSector.WorldObject GetObjectFromPosition (System.Int32 x ,System.Int32 y)
//ClientLib.Vis.City.CityObject GetObjectFromPosition (System.Single x ,System.Single y)
//ClientLib.Vis.Region.RegionObject GetObjectFromPosition (System.Single x ,System.Single y)
//ClientLib.Vis.VisObject GetObjectFromPosition (System.Single x ,System.Single y)
//ClientLib.Data.Hub GetObjectFromPosition (System.Int32 x ,System.Int32 y)
                      break;
                    default:
                      break;
                  } 
                }
                
                //DISABLED this.lootList.store('distanceArray',this.Display.distanceArray);               
              } catch (e) {
                console.warn("MHTools.Loot.calcDistance: ", e);
              }
            },
            
            onSelectionChange: function(last,curr) {
              //return;
              //console.log('onSelectionChange, curr:',curr);
              //onSelectionChange, curr: undefined //timer
              //onSelectionChange, curr: null //empty space
              //onSelectionChange, curr: XXX //object
              try {
                //
                //TODO I rather move this to calcDistance and call it from extended widgets.
                //              
                this.extItems = [];
                this.win.removeAll();
                this.win.close(); 
                
                //ClientLib.Vis.SelectionChange
                //console.clear();
                var visObject = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
                if (visObject != null) {
                  var t = visObject.get_VisObjectType();
                  //console.log('Vis Object Type:',t,', ',this.LObjectType[t]);
                  console.log('Object type: ',this.LObjectType[t]);
                  //window.MHTools.visObject = visObject;
                  window.visObject = visObject;
                  this.Data.visObject = visObject;
                  this.extTimer.start();
                  /* NOTE             
                  UnknownType
                  CityBuildingType
                  CityResourceFieldType
                  CityWallType
                  RegionCityType
                  RegionSuperWeaponType
                  RegionTerrainType
                  BattlegroundUnit
                  ArmyUnitType
                  ArmyDismissArea
                  DefenseUnitType
                  DefenseTerrainFieldType
                  RegionMoveTarget
                  RegionFreeSlotType
                  RegionNPCBase
                  RegionNPCCamp
                  RegionPointOfInterest
                  RegionRuin
                  RegionGhostCity
                  RegionNewPlayerSpot
                  DefenseTerrainFieldAdditionalSlosType
                  DefenseOffScreenUnit
                  WorldObject
                  WorldMapMarker
                  RegionHub
                   */
                  switch (t) {  
                    /* NOTE
                    RegionCityType
                    RegionSuperWeaponType
                    RegionTerrainType
                    RegionMoveTarget
                    RegionFreeSlotType
                    RegionNPCBase
                    RegionNPCCamp
                    RegionPointOfInterest
                    RegionRuin
                    RegionGhostCity
                    RegionNewPlayerSpot
                    RegionHub  */    
/*
                      
*/                  
                    // Own bases, ally base
                    case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                      //this.extTimer.setEnabled(true);
                      //this.extTimer.start();
                      var oc = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                      var aid = oc.get_AllianceId();
                      var sid = visObject.get_AllianceId();
                      
                      this.calcDistance();
                      
                      // TODO
                      //add 'Timer'
                      
                      if(aid == sid) {
                        // Own, Ally
                        //clear                  
                        //self.Display.distanceArray = [];
                        if(this.loadBase()) {           
                          this.calcFriendlyInfo();
                          this.addFriendlyLabel();
                        } else {
                          this.addLoadingLabel();
                        }
                      }
                      else {
                        // Enemy
                        if (this.loadBase()) {  
                          this.calcResources();
                          this.calcTroops();
                          this.calcInfo(); 
                          this.addResourcesLabel();
                        } else {           
                          if(this.restoreDisplay()) {
                            this.addResourcesLabel();
                          } else {          
                            this.addLoadingLabel();
                          }      
                        }
                      }
                      break;
                    // CAMP OUTPOST BASE
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                    case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                      //this.extTimer.start();
                      this.calcDistance();
                      if (this.loadBase()) {
                        this.calcResources();
                        this.calcTroops();
                        this.calcInfo();
                        this.addResourcesLabel();
                      } else {          
                        if(this.restoreDisplay()) {
                          this.addResourcesLabel();
                        } else {        
                          this.addLoadingLabel();
                        }
                      }
                      break;
                    case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
                    case ClientLib.Vis.VisObject.EObjectType.RegionRuin:
                    case ClientLib.Vis.VisObject.EObjectType.RegionHubControl:
                    case ClientLib.Vis.VisObject.EObjectType.RegionHubCenter:
                      //this.extTimer.start();
                      this.extTimer.stop();
                      //clear
                      this.Display.lootArray = [];
                      this.Display.troopsArray = [];
                      this.Display.infoArrays = [];
                      this.Display.twoLineInfoArrays = [];
                      //visObject.get_RawX()
                      this.calcDistance();
                      this.addResourcesLabel();
                      break;
                    // TEST    
                    // case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
                      // console.log('Vis Object Type:',t,', ',this.LObjectType[t],visObject);
                      // console.log(visObject.get_BuildingName());
                      // window.visObject = visObject;                    
                      // break;
                    // // TEST
                    // case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
                      // console.log('Vis Object Type:',t,', ',this.LObjectType[t],visObject);
                      // console.log(visObject.get_BuildingName());
                      // window.visObject = visObject;
                      // break;
                    default:
                      this.extTimer.stop();
                      console.log('DEFAULT, Vis Object Type:',t,', ',this.LObjectType[t]);
                      //this.extTimer.setEnabled(false);
                      this.win.close();
                      break;
                  }
                }
                else {                
                  this.extTimer.stop();
                }
              } catch (e) {
                console.warn('MHTools.Loot.onSelectionChange: ', e);
              }
            },
            extendSelectionChange: function() {
              phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
            },
            restoreDisplay: function() {
              //var idx = this.getIndex();  
              var idx = this.lootList.getIndex();  
              if(idx > -1) { 
                var d = this.lootList.list.l[idx].Data;            
                var da = this.Display.distanceArray;
                this.Display={};
                for(var k in d) this.Display[k] = d[k];
                this.Display.distanceArray = da;
                return true;
              }
              return false;
            },
            // DISPLAY data
            addLoadingLabel: function(widget) {
              //console.log('addLoadingLabel');
              try {
                this.extItems = [];
                //widget.removeAll();
                var r=0, c=0;
                var a;
                      
                // DISTANCE
                //console.log('DISTANCE');
                a = this.Display.distanceArray;
                if(typeof(a)!='undefined' && a.length>0) { 
                  for(var i in this.Display.distanceArray) {              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 230, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6}); 
                    this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 230, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.distanceArray[i].lbs) {
                      //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;
                  }
                }
                
                // AWAITING
                //console.log('AWAITING');
                // a = this.Data.Distance;
                // if(typeof(a)!='undefined' && a<=10) {
                  c=0;
                  var w = this.waiting[this.waiting[0]];
                  if(++this.waiting[0] >= this.waiting.length) this.waiting[0]=1;
                  //if (this.settings.showLoot.v) widget.add(new qx.ui.basic.Label('<b>Lootable Resources</b>').set({width: 230, rich: true, allowGrowX: true}), {row: r++,column: c, colSpan: 6});
                  //widget.add(new qx.ui.basic.Label('Transmission ' + w).set({rich: true}), {row: r++,column: c, colSpan: 6});//, allowGrowX: true, colSpan: 6
                  this.extAdd(new qx.ui.basic.Label('Transmission ' + w).set({rich: true}), {row: r++,column: c, colSpan: 6});//, allowGrowX: true, colSpan: 6
                // } else {
                  // c=0;
                  // widget.add(new qx.ui.basic.Label('<span style="color:yellow">Base is out of range.</span>').set({width: 230, rich: true, allowGrowX: true}), {row: r++,column: c, colSpan: 6});//, allowGrowX: true
                // } 
                
                this.extPrint();
              } catch (e) {
                console.warn('MHTools.Loot.addLoadingLabel: ', e);
              }
            }, 
            addResourcesLabel: function(widget) {
              //console.log('addResourcesLabel');
              try {
                this.extItems = [];
                //widget.removeAll();
                var r=0, c=0;                
                var hp;
                var a;                
                
                // DISTANCE
                a = this.Display.distanceArray;
                if(typeof(a)!='undefined' && a.length>0) { 
                  for(var i in this.Display.distanceArray) {              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6}); 
                    this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.distanceArray[i].lbs) {
                      //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;
                  }
                }
                
                // LOOT
                if (this.settings.showLoot.v) {
                  a = this.Display.lootArray;
                  if(typeof(a)!='undefined' && a.length>0) {
                    hp = {};
                    hp.name = '<b>Lootable Resources</b>';
                    hp.img = this.resImages;
                    t = [];  
                    t.push(this.Display.lootArray[0]);//Research 6  
                    t.push(this.Display.lootArray[1]);//Tiberium 1
                    t.push(this.Display.lootArray[2]);//Crystal 2
                    t.push(this.Display.lootArray[3]);//Credits 3           
                    hp.val = t;
                    //iconArrays.push(hp);  //store !!
                    
                    // draw icon's info              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                    this.extAdd(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                    //console.log('A) i',i);   
                    for(var j in hp.val) {
                      //console.log('B) i',i,'j',j);
                      //widget.add(hp.img[j], {row: r, column: c++}); 
                      this.extAdd(hp.img[j], {row: r, column: c++}); 
                      //widget.add(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                      this.extAdd(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                    }
                    r++;
                  }
                }
                
                // TROOP
                if (this.settings.showTroops.v) { //to do  
                  a = this.Display.troopsArray;
                  if(typeof(a)!='undefined' && a.length>0) {   
                    hp = {};
                    hp.name = '<b>Troop Strength</b>';
                    hp.img = this.troopImages;
                    t = [];
                    t.push(this.Display.troopsArray[0]);
                    if (this.settings.showTroopsExtra.v) {
                      t.push(this.Display.troopsArray[1]);//inf
                      t.push(this.Display.troopsArray[2]);//veh
                      t.push(this.Display.troopsArray[3]);//stu
                      //t.push(this.Display.troopsArray[4]);//air
                    }              
                    hp.val = t;
                    // draw icon's info                            
                    c=0;
                    //widget.add(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});  
                    this.extAdd(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});  
                    //widget.add(new qx.ui.basic.Label(this.kMG(hp.val[0])).set({textAlign:'left'}), {row: r, column: c++});  
                    this.extAdd(new qx.ui.basic.Label(this.kMG(hp.val[0])).set({textAlign:'left'}), {row: r, column: c++});  
                    //console.log('A) i',i);
                    c=2;
                    for(var j=1;j<hp.val.length;j++) {
                      //console.log('B) i',i,'j',j);
                      //widget.add(hp.img[j-1], {row: r,column: c++}); 
                      this.extAdd(hp.img[j-1], {row: r,column: c++}); 
                      //widget.add(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                      this.extAdd(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                    }
                    r++;
                  }
                }
                
                // INFO
                a = this.Display.infoArrays;
                if(typeof(a)!='undefined' && a.length>0) { 
                  for(var i in this.Display.infoArrays) {              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(this.Display.infoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    this.extAdd(new qx.ui.basic.Label(this.Display.infoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.infoArrays[i].lbs) {
                      //widget.add(new qx.ui.basic.Label(this.Display.infoArrays[i].lbs[j]+' '+this.Display.infoArrays[i].val[j]), {row: r, column: c});
                      this.extAdd(new qx.ui.basic.Label(this.Display.infoArrays[i].lbs[j]+' '+this.Display.infoArrays[i].val[j]), {row: r, column: c});
                      c+=2;
                    }
                    r++;
                  }
                } 
                
                // 2 lines INFO
                a = this.Display.twoLineInfoArrays;
                if(typeof(a)!='undefined' && a.length>0) {       
                  for(var i in this.Display.twoLineInfoArrays) {              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                    this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                    c=1;
                    for(var j in this.Display.twoLineInfoArrays[i].lbs) {
                      //widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                      this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                      //widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                      this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;                
                  }
                }
                
                this.extPrint();
                
              } catch (e) {
                console.warn('MHTools.Loot.addResourcesLabel(): ', e);
              }
            },       
            addFriendlyLabel: function(widget) {
              //console.log('addFriendlyLabel');
              try {              
                this.extItems = [];
                //widget.removeAll();
                var a;
                var r=0, c=0;
                
                // DISTANCE
                a = this.Display.distanceArray;
                if(typeof(a)!='undefined' && a.length>0) {    
                  for(var i in this.Display.distanceArray) {              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.distanceArray[i].lbs) {
                      //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      //widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      this.extAdd(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;
                  }
                }
                
                
                // 2 lines INFO
                a = this.Display.twoLineInfoArrays;
                if(typeof(a)!='undefined' && a.length>0) {  
                  c=0;
                  for(var i in this.Display.twoLineInfoArrays) {              
                    c=0;
                    //widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.twoLineInfoArrays[i].lbs) {
                      //widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                      this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                      //widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                      this.extAdd(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;                
                  }
                }
                
                this.extPrint();

              } catch (e) {
                console.warn('MHTools.Loot.addFriendlyLabel: ', e);
              }
            },
            // EXTEND UI
            /* NOTE
            RegionCityMenu
            RegionCityFoundInfo
            RegionGhostStatusInfo
            RegionCityStatusInfo
            RegionNPCBaseStatusInfo
            RegionHubStatusInfo
            RegionPointOfInterestStatusInfo
            RegionCityStatusInfoEnemy
            RegionCityList
            RegionCityInfo
            RegionNewPlayerSpotStatusInfo
            RegionRuinStatusInfo
            RegionCityStatusInfoOwn
            RegionCitySupportInfo
            RegionCityStatusInfoAlliance
            RegionCityMoveInfo
            RegionNPCCampStatusInfo
            */ 
            extendObjectMenu: function() {            
              console.info('extendObjectMenu');
              return;
              var self = this;
              if (!webfrontend.gui.region.RegionCityMenu.prototype.__mhloot_showExtMenu) {
                webfrontend.gui.region.RegionCityMenu.prototype.__mhloot_showExtMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
              }
              webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selected_base) {
                //console.info("webfrontend.gui.region.RegionCityMenu.prototype.showMenu");
                try {
                  // var self2 = this;
                  //console.info('self',self);//self MHTools.Loot[undefined] 
                  //console.info('this',this);//this webfrontend.gui.region.RegionCityMenu[4151-0]
                  if (this.__initialized != 1) { 
                    this.__initialized = 1;   
                    this.__mhlootPositions = [];             
                    for (var i in this) {
                      try {
                        if (this[i] && this[i].basename == "Composite") {
                          //console.log(''+i,this[i].basename);
                          var lockPosition = new qx.ui.form.Button("Measure", "http://i.imgur.com/anoOvzu.png?1");
                          lockPosition.addListener("execute", function () {
                            //console.log('lockPosition.execute:');    
                            var visObject = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
                            if (visObject != null)// && visObject.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionCityType)
                            {
                              if(typeof(visObject.get_RawX)!='undefined') {
                                //console.log('visObject:',visObject);
                                var selX = visObject.get_RawX();
                                var selY = visObject.get_RawY();
                                if(typeof(self.Data.Lock)!=='undefined') self.Data.Lock = {};
                                self.Data.Lock = {X:selX, Y:selY};
                                console.log('Lock:',self.Data.Lock);
                              }
                            }
                          });
                          if(self.settings.showMeasure.v) {
                            this[i].add(lockPosition);
                          }                          
                          this.__mhlootPositions.push(lockPosition); 
                        }
                      } catch (e) {
                        console.log("lockPosition [2]: ", e);
                      }
                    }   
                  }
                } catch (e) {
                  console.warn("MHTool.Loot.RegionCityMenu: ", e);
                }              
                this.__mhloot_showExtMenu(selected_base);// run base function
              }
            }, 
            extendForgottenCamp: function() {// CAMP - Forgotten
              var self = this;          
              if (!webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__mhloot_showLootNPCCamp) {
                webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.__mhloot_showLootNPCCamp = webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionNPCCampStatusInfo.prototype.onCitiesChange = function () {
                //console.log('RegionNPCCampStatusInfo:');
                try {
                  if (!self.lootWindowCamp) {
//TODO does it have , allowGrowX: true property?
                    self.lootWindowCamp = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowCamp.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionNPCCampStatusInfo.getInstance();
                    widget.add(self.lootWindowCamp);
                  }                 
                  self.calcDistance();
                  if (self.loadBase()) {
                    self.calcResources();
                    self.calcTroops();
                    self.calcInfo();
                    self.addResourcesLabel(self.lootWindowCamp);
                  } else {          
                    if(self.restoreDisplay()) {
                      self.addResourcesLabel(self.lootWindowCamp);
                    } else {        
                      self.addLoadingLabel(self.lootWindowCamp);
                    }
                  }
                } catch (e) {
                  console.warn("MHTool.Loot.RegionNPCCampStatusInfo: ", e);
                }
                this.__mhloot_showLootNPCCamp();
              }
            },
            extendForgottenBase: function() {// BASE - Forgotten
              var self = this;  
              if (!webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__mhloot_showLootNPCBase) {
                webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.__mhloot_showLootNPCBase = webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionNPCBaseStatusInfo.prototype.onCitiesChange = function () {
                //console.log('RegionNPCBaseStatusInfo:');
                try {
                  if (!self.lootWindowBase) {
                    self.lootWindowBase = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowBase.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionNPCBaseStatusInfo.getInstance();
                    widget.add(self.lootWindowBase);
                  }      
                  self.calcDistance();
                  if (self.loadBase()) {
                    self.calcResources();
                    self.calcTroops();
                    self.calcInfo();
                    self.addResourcesLabel(self.lootWindowBase);
                  } else {           
                    if(self.restoreDisplay()) {
                      self.addResourcesLabel(self.lootWindowBase);
                    } else {           
                      self.addLoadingLabel(self.lootWindowBase);
                    }
                  }
                } catch (e) {
                  console.warn("MHTool.Loot.RegionNPCBaseStatusInfo: ", e);
                }
                this.__mhloot_showLootNPCBase();
              }
            },
            // OPTIONS
            optionsTab: null,
            optionsPage: null,
            btnApply: null,
            optionsStoreName: 'MHToolLootOptions',
            addLootPage: function() {            
              //console.log('addLootPage');
              try {
                if(!MHTools.OptionsPage) OptionsPage();
                
                if(!this.optionsTab) {
                  //Create Tab
                  this.optionsTab = MHTools.OptionsPage.getInstance();
                }
                this.optionsPage = this.optionsTab.addPage("Loot");
                this.optionsPage.setLayout(new qx.ui.layout.VBox());
                // ...
                this.optionsPage.add(new qx.ui.basic.Label("<b>Options:</b></br>").set({rich: true}));//, textColor: red
                var i = 0;
                for(var k in this.settings) {
                  this.settings[k].cb = new qx.ui.form.CheckBox(this.settings[k].l).set({
                    value: this.settings[k].v,
                    paddingLeft: 10
                  });
                  this.settings[k].cb.addListener("execute", this.optionsChanged, this);
                  this.optionsPage.add(this.settings[k].cb);//, {row:1+i++, column:3});
                }
                //typeGet
                //this.optionsPage.add(new qx.ui.basic.Label("<b>Obf:"+this.typeGet()+"</b>").set({rich: true}));//, textColor: red
                //  container.add(new qx.ui.core.Spacer(50));
                this.loadOptions();
                this.addButtons();               
              } catch (e) {
                console.warn("MHTool.Loot.addLootPage: ", e);
              }           
            },
            addButtons: function() {
              try {
                this.btnApply = new qx.ui.form.Button("Apply");
                this.btnApply.set({ width:150, height:30, toolTipText: "Apply changes.", allowGrowX:false, enabled:false});//, marginTop:20});
                
                var c = new qx.ui.container.Composite(new qx.ui.layout.HBox(0,'right'));
                c.setMarginTop(20);
                c.add(this.btnApply);
                this.optionsPage.add(c);
                
                this.btnApply.addListener("execute", this.applyOptions, this); 
                this.btnApply.setEnabled(false);
              } catch (e) {
                console.warn("MHTool.Loot.addButtons: ", e);
              }
            },
            optionsChanged: function() {
              var c = false;
              for(var k in this.settings) {
                c = c || (this.settings[k].v != this.settings[k].cb.getValue());
              }
              this.btnApply.setEnabled(c);
            },
            applyOptions: function(e) {
              //console.log("applyOptions e:",e);
              this.saveOptions();
              this.btnApply.setEnabled(false); 
            },
            saveOptions: function() {   
              var c = {};
              var i = 0;
              for(var k in this.settings) {
                c[k] = this.settings[k].cb.getValue();
                this.settings[k].v = c[k];
              }
              var S = ClientLib.Base.LocalStorage;
              if (S.get_IsSupported()) S.SetItem(this.optionsStoreName, c);
            },
            loadOptions: function() {
              try {
                var c = {};            
                var S = ClientLib.Base.LocalStorage;
                if (S.get_IsSupported()) c = S.GetItem(this.optionsStoreName);
                //console.log('loadOptions c:',c);
                if(c===null) c = {};
                var i = 0;              
                for(var k in this.settings) {
                  if(typeof(c[k])!='undefined') {
                    this.settings[k].cb.setValue(c[k]);
                    this.settings[k].v = c[k];
                  } else {
                    this.settings[k].cb.setValue(this.settings[k].d);
                    this.settings[k].v = this.settings[k].d;
                  }
                }             
                //console.log('loadOptions settings:',this.settings);
              } catch (e) {
                  console.warn("MHTool.Loot.loadOptions: ", e);
              }
            }
          }//members
        });      
      } catch (e) {
        console.warn("qx.Class.define(MHTools.Loot: ", e);      
      }
      //======================================================= 
      // START
      MHTools.Loot.getInstance();
    }//function MHToolsLootCreate
    //=======================================================   
    function LoadExtension() {
      try {
        if (typeof(qx) != 'undefined') {
          //if (qx.core.Init.getApplication().getMenuBar() !== null) {
          if (!!qx.core.Init.getApplication().getMenuBar()) {
            MHToolsLootCreate();
            return; // done
          } 
        }
      } catch (e) {
        if (typeof(console) != 'undefined') console.log('LoadExtension:',e);
        else if (window.opera) opera.postError(e);
        else GM_log(e);
      }
      window.setTimeout(LoadExtension, 1000); // force it
    }
    LoadExtension();
  }
  //=======================================================
  function Inject() {
    var script = document.createElement('script');
    txt = MHLootMain.toString();
    script.innerHTML = '(' + txt + ')();';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  Inject();
})();



/********************************************************************
C&C:TA Compass Movable
********************************************************************/

(function () {
    var CompassMain = function () {
        try {
            function createCompass() {
                console.log('Compass loaded');
                qx.Class.define("Compass", {
                    extend: qx.ui.window.Window,
                    construct: function () {
                        this.base(arguments);
                        this.setWidth(54);
                        this.setHeight(90);
                        this.setContentPadding(0);
                        this.setShowMinimize(false);
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
                        title.setTextColor("#FFF");
                        title.setRich(true);
                        title.setDecorator("tabview-chat-pane");
                        var captionBar = this.getChildControl("captionbar");
                        captionBar.setDecorator(null);
                        captionBar.remove(this.getChildControl("icon"));
                        captionBar.remove(this.getChildControl("minimize-button"));
                        captionBar.remove(this.getChildControl("restore-button"));
                        captionBar.remove(this.getChildControl("maximize-button"));
                        captionBar.remove(this.getChildControl("close-button"));
                        captionBar.setLayout(new qx.ui.layout.Grow());
                       
                        var pane = this.getChildControl("pane");
                        pane.setDecorator(null);
                        pane.setLayout(new qx.ui.layout.Grow());
                        this.setLayout(new qx.ui.layout.Canvas());
                      
                        var st = '<canvas id="compass" style="border:1px solid;position: absolute; top: 0px; left: 0px;" height="50" width="50"></canvas>';
                        var l = new qx.ui.basic.Label().set({
                            value: st,
                            rich: true
                        });
                        this.add(l);  
                        if (PerforceChangelist >= 382917) {
                            phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this.displayCompass);
                        } else {
                            webfrontend.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this.displayCompass);
                        }
                        this.addListener("move", function (e) {
                            this.displayCompass();
                        });
                        this.displayCompass();
                        
                    },
                    members: {
                        needle: null,                        
                        ec: null,
                        ctx: null,
                        halfsize: 25,
                        displayCompass: function () {
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
                                        
                                        
                                        ctx.clearRect(0, 0, 50, 50);
                                        ctx.save();
                                        ctx.globalAlpha = 0.5;
                                        ctx.fillStyle = '#000';
                                        ctx.fillRect(0, 0, 50, 50); // Mittelpunkt
                                        ctx.globalAlpha = 1.0;
                     
                                        ctx.translate(25, 25);
                                        ctx.rotate(dy > 0 ? Math.asin(dx / distance) : -Math.asin(dx / distance) + Math.PI); 
                                        ctx.beginPath();			
                                        ctx.moveTo(0, 20);			
                                        ctx.lineTo(17, -15);
                                        ctx.lineTo(-17, -15);
                                        ctx.closePath();
                                        ctx.moveTo(0, 0);			
                                        ctx.lineTo(10, -22);
                                        ctx.lineTo(-10, -22);
                                        ctx.closePath();            
                                        
                                        ctx.lineWidth =4.0;                                    
                                        ctx.fillStyle = faction == ClientLib.Base.EFactionType.GDIFaction ? "#00a" : "#a00"; 
                                        ctx.strokeStyle = "#000";
                                    
                                        ctx.fill();
                                        ctx.stroke();
                                        ctx.restore();
                                        //console.log(faction);
                                                                        
                                } else {                                    
                                    this.ec = document.getElementById("compass");
                                    if (this.ec != null){
                                        this.ctx = this.ec.getContext('2d');
                                        console.log("Compass ok");                                                                                                          
                                    } 
                                } 
                            } catch (e) {
                                console.log("displayCompass", e);
                            }
                        }
                    }
                });
                var win = new Compass();
                win.moveTo(140, 30);
                win.open();               
            }
        } catch (e) {
            console.log('createCompass: ', e);
        }
        function CompassCheckLoaded() {
            try {
                if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
                    window.setTimeout(createCompass, 5000);
                    
                } else {
                    window.setTimeout(CompassCheckLoaded, 1000);
                }
            } catch (e) {
                console.log('CompassCheckLoaded: ', e);
            }
        }
        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(CompassCheckLoaded, 5000);
        }
    }
    try {
        var CompassScript = document.createElement('script');
        CompassScript.innerHTML = "(" + CompassMain.toString() + ')();';
        CompassScript.type = 'text/javascript';
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName('head')[0].appendChild(CompassScript);
        }
    } catch (e) {
        console.log('Compass: init error: ', e);
    }
})();


/**************************************************************
Tiberium Alliances Map
**************************************************************/

// ==UserScript==
// @name           Tiberium Alliances Map
// @description    Shows you the region map
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        1.1
// @author         Nolana Kane
// @require        http://sizzlemctwizzle.com/updater.php?id=147476
// ==/UserScript==

(function() {
    var TAMap_mainFunction = function() {
        function createMapTweak() {
            var TAMap = {};
            qx.Class.define("TAMap.main", {
                type : "singleton",
                extend : qx.core.Object,
                members : {
                    buttonMap : null,
                    mapBox : null,
                    mapWidget : null,
                    scroll : null,
                    mapCanvas : null,
                    settingsWnd: null,
                    poiSelect : null,
                    allianceSelect : null,
					obfSectorName : null,
					obfAllianceName : null,
					obfPOIType : null,
					poiobj : {},
                    colorFields: {},
                    visOptions: { colors: { cityColor: "green", // type = 1
                        baseColor: "navy", // type = 2
                        campColor: "midnightblue", // type=3,CampType=2
                        outpostColor: "royalblue", // type=3,CampType=3
                        poiColor: "orange", // type = 4, POIType != 0
                        tunnelColor: "forestgreen", // type = 4, POIType = 0
                        enemyBaseColor: "red",
                        allianceTerrainColor: "teal",
                        ownBaseColor: "lime",
                        highlightColor: "white"
					}
                    },
                    // Types: 1 = city
                    // 2 = Forgotten Base{Id, Level}
                    // 3 = Camp, Outpost {Id, CampType: 3 = Outpost, 2 = Camp}
                    // 4 = POI, Tunnel Exit {Id, Level, OwnerAllianceId, OwnerAllianceName, POIType:
                    // 6 = Aircraft (Off Air)
                    // 7 = Resonator (Def), 0 = Tunnel!
                    //     ...
                    //
                    zoomFactor : 3,
                    initialize : function() {
                        if (localStorage) {
                            var vo = localStorage["TAMap.visOptions"];
                            if (vo != null) {
                                this.visOptions = JSON.parse(vo);
							}
						}
                        // this.add_ViewModeChange = (new ClientLib.Vis.ViewModeChange).$ctor(this, this.onViewChange);
                        console.log("Adding button");
                        this.buttonMap = new qx.ui.form.Button("Map");
                        this.buttonMap.set({
                            width : 80,
                            appearance : "button-bar-center",
                            toolTipText : ""
						});
                        this.buttonMap.addListener("click", this.showMap, this);
                        var mainBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_MENU);
                        mainBar.getChildren()[1].addAt(this.buttonMap, 8, {
                            top : 0,
                            right : 0
						});
                        console.log("Map Button added");
						
                        // The Map window
                        this.mapBox = new qx.ui.window.Window("Map");
                        this.mapBox.setPadding(10);
                        this.mapBox.setLayout(new qx.ui.layout.Grow());
                        // this.mapBox.setLayout(new qx.ui.layout.VBox());
                        this.mapBox.setShowMaximize(false);
                        this.mapBox.setShowMinimize(false);
                        this.mapBox.moveTo(113, 13);
                        this.mapBox.setHeight(500);
                        this.mapBox.setWidth(500);
                        this.mapBox.setMinWidth(10);
                        this.mapBox.setMinHeight(10);
                        this.mapWidget = new qx.html.Element("canvas", null, {
                            id : "map",
                            width : 3000,
                            height : 3000
						});
						
                        this.mapWidget.addListener("appear", function() {
                            console.log("appeared:" + this.mapWidget.getDomElement());
                            var canvas = this.mapWidget.getDomElement();
                            if (this.mapCanvas == null) {
                                this.mapCanvas = canvas;
                                var _thisMap = this;
                                canvas.addEventListener("click", function(evt) {
                                    console.log("coords:" + evt.clientX + ":" + evt.clientY);
                                    console.log("offsets:" + canvas.offsetTop + "," + canvas.offsetLeft);
                                    // get canvas position
                                    var obj = canvas;
                                    var top = 0;
                                    var left = 0;
                                    while (obj && obj.tagName != 'BODY') {
                                        top += obj.offsetTop;
                                        left += obj.offsetLeft;
                                        obj = obj.offsetParent;
									}
									
                                    // return relative mouse position
                                    var mouseX = evt.clientX - left + window.pageXOffset + _thisMap.scroll.getScrollX();
                                    var mouseY = evt.clientY - top + window.pageYOffset + _thisMap.scroll.getScrollY();
                                    console.log("M:" + mouseX + "," + mouseY);
                                    var vm = ClientLib.Vis.VisMain.GetInstance();
                                    vm.CenterGridPosition(mouseX / _thisMap.zoomFactor, mouseY / _thisMap.zoomFactor);
                                    _thisMap.updateMap();
                                    setTimeout(function() {
                                        _thisMap.updateMap();
									}, 1000);
								}, false);
							}
                            this.updateMap();
						}, this);
						
                        this.scroll = new qx.ui.container.Scroll().set({
                            width : 500,
                            height : 500
						});
                        this.scroll.setMinWidth(10);
                        this.scroll.setMinHeight(10);
                        _thisMap = this;
						
                        this.mapBox.add(this.scroll);
						
                        var p = new qx.ui.core.Widget();
                        p.setMinHeight(3000);
                        p.setMinWidth(3000);
                        p.setHeight(3000);
                        p.setWidth(3000);
                        this.scroll.add(p);
                        p.getContentElement().add(this.mapWidget);
						
                        // select box for alliances
                        var selectBox = new qx.ui.form.SelectBox();
                        selectBox.addListener("changeSelection", function(e) {
                            if (e != null && e.getData() && e.getData().length > 0) {
                                this.visOptions.alliance = e.getData()[0].getModel(); // alliance ID or -1 for all
                                console.log("Alliance selected"+e.getData()[0]);
                                this.saveOptions();
                                this.updateMap();
							}
						}, this);
                        this.allianceSelect = selectBox;
                        // this.mapBox.add(selectBox);
                        //
                        // Select box for POI Type
                        //
                        selectBox = new qx.ui.form.SelectBox();
						
                        var currentSelection = this.visOptions.poi||-1;
                        var makePoiItem = function(model, name) {
                            var item = new qx.ui.form.ListItem(name, null, model);
                            selectBox.add(item);
                            if (currentSelection == model) {
                                selectBox.setSelection([item]);
							}
						}
                        makePoiItem(-1, "<< None >>");
						makePoiItem(ClientLib.Base.EPOIType.TiberiumBonus,"Tiberium");
						makePoiItem(ClientLib.Base.EPOIType.CrystalBonus,"Crystal");
						makePoiItem(ClientLib.Base.EPOIType.PowerBonus,"Reactor (Power Bonus)");
						makePoiItem(ClientLib.Base.EPOIType.InfanteryBonus,"Tungsten (Infantry)");
						makePoiItem(ClientLib.Base.EPOIType.VehicleBonus,"Uranium (Vehicles)");
                        makePoiItem(ClientLib.Base.EPOIType.AirBonus,"Aircraft GNT (Aircraft)");
                        makePoiItem(ClientLib.Base.EPOIType.DefenseBonus,"Resonator (Defense)");
                        
                        selectBox.addListener("changeSelection", function(e) {
                            if (e != null && e.getData() && e.getData().length > 0) {
                                this.visOptions.poi = e.getData()[0].getModel(); // POI ID or -1 for all
                                console.log("POI selected "+this.visOptions.poi);
                                this.saveOptions();
                                this.updateMap();
							}
						}, this);
                        this.poiSelect = selectBox;
						
                        var bt = new qx.ui.form.Button("Settings");
                        bt.set({
                            height: 26,
							appearance : "button-text-small",
                            toolTipText : "Set filters for the map"
						});
                        bt.addListener("click", function() {this.settingsWnd.open()}, this);
                        this.mapBox.getChildControl("captionbar").add(bt,{row:0,column:2}); // hack hack hack
                        //
                        // Settings dialog
                        //
                        this.settingsWnd = new qx.ui.window.Window("Map Settings");
                        this.settingsWnd.setPadding(10);
                        //this.mapBox.setLayout(new qx.ui.layout.Grow());
                        var layout = new qx.ui.layout.Grid();
                        layout.setSpacing(5);
                        layout.setColumnAlign(1,"left", "center");
                        layout.setColumnAlign(0,"left", "bottom");
                        this.settingsWnd.setLayout(layout);
                        this.settingsWnd.setShowMaximize(false);
                        this.settingsWnd.setShowMinimize(false);
                        this.settingsWnd.moveTo(300, 13);
                        this.settingsWnd.setHeight(550);
                        this.settingsWnd.setWidth(300);
                        this.settingsWnd.setMinWidth(10);
                        this.settingsWnd.setMinHeight(10);
						
                        var makeLbl = function(name) {
                            var lbl =  new qx.ui.basic.Label(name);
                            lbl.setTextColor("white");
                            return lbl;
						}
                        var _thisMap = this;
						
                        var makeTxt = function(option) {
                            var value = _thisMap.visOptions.colors[option];
                            var txtField = new qx.ui.form.TextField(value);
                            txtField.setTextColor("white");
                            _thisMap.colorFields[option] = txtField;
                            return txtField;
						}
						
                        this.settingsWnd.add(makeLbl("- Highlight -"), {row:0, column:0});
                        this.settingsWnd.add(makeLbl("Alliance:"), {row:1,column:0});
                        this.settingsWnd.add(this.allianceSelect, {row:1, column:1});
                        this.settingsWnd.add(makeLbl("POIs:"), {row:2, column:0});
                        this.settingsWnd.add(this.poiSelect, {row:2, column:1});
						
                        bt = makeLbl("- Colors -");
                        bt.set({
							value: '<a href="http://www.w3schools.com/html/html_colornames.asp" target="_blank">- Colors -</a>',
							rich : true,
							selectable: true
						});
                        this.settingsWnd.add(bt, {row:10, column:0});
                        // bt.addListener("click", function() { window.open("http://www.w3schools.com/html/html_colornames.asp") });
						
						
                        this.settingsWnd.add(makeLbl("Alliance Terrain:"), {row:11, column:0});
                        this.settingsWnd.add(makeTxt("allianceTerrainColor"), {row:11, column:1});
						
                        this.settingsWnd.add(makeLbl("Base:"), {row:12, column:0});
                        this.settingsWnd.add(makeTxt("baseColor"), {row:12, column:1});
						
                        this.settingsWnd.add(makeLbl("Camp:"), {row:13, column:0});
                        this.settingsWnd.add(makeTxt("campColor"), {row:13, column:1});
						
                        this.settingsWnd.add(makeLbl("City:"), {row:14, column:0});
                        this.settingsWnd.add(makeTxt("cityColor"), {row:14, column:1});
						
                        this.settingsWnd.add(makeLbl("Enemy:"), {row:15, column:0});
                        this.settingsWnd.add(makeTxt("enemyBaseColor"), {row:15, column:1});
						
                        this.settingsWnd.add(makeLbl("Outpost:"), {row:16, column:0});
                        this.settingsWnd.add(makeTxt("outpostColor"), {row:16, column:1});
						
                        this.settingsWnd.add(makeLbl("Own City:"), {row:17, column:0});
                        this.settingsWnd.add(makeTxt("ownBaseColor"), {row:17, column:1});
						
                        this.settingsWnd.add(makeLbl("POI:"), {row:18, column:0});
                        this.settingsWnd.add(makeTxt("poiColor"), {row:18, column:1});
						
                        this.settingsWnd.add(makeLbl("Tunnel:"), {row:19, column:0});
                        this.settingsWnd.add(makeTxt("tunnelColor"), {row:19, column:1});
						
                        var changeColor = new qx.ui.form.Button("Change");
                        changeColor.set({
                            appearance : "button-text-small",
                            toolTipText : "Save changes to colors"
						});
                        this.settingsWnd.add(changeColor, {row:20, column:0});
                        changeColor.addListener("click", function() {
                            for (var option in this.visOptions.colors) {
                                if (this.colorFields[option]) {
                                    this.visOptions.colors[option] = this.colorFields[option].getValue();
								}
							}
                            this.saveOptions();
                            this.updateMap();
						}, this);
						
                        this.settingsWnd.addListener("appear", function() {
                            this.updateFilter();
						}, this);
						
					},
                    getSectors: function(w) {    // work around  obfuscated variable names
						if (this.obfSectorName == null) {
							// auto-detect sector name
							Outer:			 
							for (i in w) {			 
								if (w[i].d) {
									var maybeSector = w[i].d;
									for (j in maybeSector) {
										if (maybeSector[j].ConvertToWorldX) {
											this.obfSectorName = i;
											console.log("Sector field:" + i);
											break Outer;
										}
										break;
									}
								}
							}
						}
						if (this.obfSectorName != null)
						return w[this.obfSectorName].d;
						else
						console.log("getSectors failed");
					},
                    getAlliances: function(s) {// work around  obfuscated variable names. s == current sector
						if (this.obfAllianceName == null) {
							// find alliance list dynamically
							Outer:
							for (i in s) {
								if (s[i].d) {
									var maybeAlliance = s[i].d;
									for (j in maybeAlliance) {
										if (maybeAlliance[j].Name && !('Alliance' in maybeAlliance[j])) {
											this.obfAllianceName = i;
											console.log("Alliance field:" + i);
											break Outer;
										}
										break;
									}
								}
							}
						}
						if (this.obfAllianceName == null) {
							console.log("No alliances yet");
							return null;
						} else
						return s[this.obfAllianceName].d;
					},
					getPOIType: function(obj) {
						this.poiobj = obj;
						var obfss = [];
						if (this.obfPOIType == null)
						{
							for(var obfs in obj)
							{
								obfss.push(obfs);
								console.log("POIType: " + obfs);
							}
							this.obfPOIType = obfss[3];
						}
						
						return this.obfPOIType;
					},	
					isEnemy : function(enemies, alliance, sector) {
						if (alliance == null)
						return false;
						var enemy = enemies.l.filter(function(ele) {
							return ele.OtherAllianceId == alliance.Id;
						});
						return enemy.length > 0;
					},
					listAllAlliances : function() {
						var alliances = [];
						var w = ClientLib.Data.MainData.GetInstance().get_World();
						var sectors = this.getSectors(w);
						for (var i in sectors) {  // m_sectors
							var s = sectors[i];
							//var all = this.getAlliances(s);
							var all = ClientLib.Data.MainData.GetInstance().get_Alliance();
							for(var j in all) {  // m_alliances
								var a = all[j];
								alliances.push({id: a.Id, name: a.Name});
							}
						}
						alliances.sort(function(s1,s2) {
							var name1 = s1.name.toLowerCase();
							var name2 = s2.name.toLowerCase();
							if (name1 < name2) return -1;
							if (name1 > name2) return 1;
							return 0;
						});
						var allianceMap = {};
						alliances.forEach(function(it) {
							allianceMap[it.id] = it;
						});
						return allianceMap;
					},
					updateFilter : function() {
						var md = ClientLib.Data.MainData.GetInstance();
						//var enemies = md.get_Alliance().GetAllianceRelationshipsByType(webfrontend.gui.alliance.DiplomacyPage.ERelationTypeEnemy, true);
						this.allianceSelect.removeAll();
						
						var alliances;// = this.listAllAlliances();  // quite expensive operation
						var selected = new qx.ui.form.ListItem("<< None >>", null, -1);
						this.allianceSelect.add(selected);
						for (i in alliances) {
							var a = alliances[i];
							//enemies.l.forEach(function(it) {
							var tempItem = new qx.ui.form.ListItem(a.name, null, a.id);
							if (a.id == this.visOptions.alliance) {
								selected = tempItem;
							}
							this.allianceSelect.add(tempItem);
						}
						this.allianceSelect.setSelection([selected]);
						
					},
					updateMap : function() {
						// this.updateFilter(); - we assume that visOptions has all the visualisation options
						var canvas = this.mapCanvas;
						console.log("Canvas:" + canvas);
						var ctx = canvas.getContext('2d');
						var sc = this.zoomFactor;
						var md = ClientLib.Data.MainData.GetInstance();
						var enemies = md.get_Alliance().GetAllianceRelationshipsByType(webfrontend.gui.alliance.DiplomacyPage.ERelationTypeEnemy, true);
						var w = md.get_World();
						var vm = ClientLib.Vis.VisMain.GetInstance();
						ctx.clearRect(0, 0, canvas.width, canvas.height);
						ctx.fillStyle = "rgb(200,0,0)";
						var cx = 0;
						var cy = 0;
						var POIType=0;
						var hilitePois = [];
						var sectors = this.getSectors(w);
						for (var i in sectors) {// m_Sectors = RBJXOL
							var s = sectors[i];
							// console.log("Painting sector:" + s.m_Id);
							for (var x = 0; x < 32; x++) {
								for (var y = 0; y < 32; y++) {
									cx = s.ConvertToWorldX(x);
									cy = s.ConvertToWorldY(y);
									var obj = w.GetObjectFromPosition(cx, cy);
									if (obj != null) {
										// ctx.fillStyle = colors[obj.Type];
										switch (obj.Type) {
											case 1:  // player city
											var player = s.GetPlayerId(obj);
											var alliance = s.GetAlliance(player.Alliance);
											if (alliance != null && this.visOptions.alliance == alliance.Id) {
												ctx.fillStyle = this.visOptions.colors.highlightColor;
												ctx.fillRect(cx * sc, cy * sc, sc, sc);
												} else if (this.isEnemy(enemies, alliance, s)) {
												// console.log("Enemy found" + obj);
												ctx.fillStyle = this.visOptions.colors.enemyBaseColor;
												ctx.fillRect(cx * sc, cy * sc, sc, sc);
												} else {
												if (obj.PlayerId && s.GetPlayerId(obj).Id == md.get_Player().id) {
													ctx.fillStyle = this.visOptions.colors.ownBaseColor;
													} else {
													ctx.fillStyle = this.visOptions.colors.cityColor;
												}
												ctx.fillRect(cx * sc, cy * sc, sc, sc);
											}
											break;
											case 2: // forgotten camp
											ctx.fillStyle = this.visOptions.colors.baseColor;
											ctx.fillRect(cx * sc, cy * sc, sc, sc);
											break;
											case 3: // Camp/Outpost
											ctx.fillStyle = (obj.CampType == 2) ? this.visOptions.colors.campColor : this.visOptions.colors.outpostColor;
											ctx.fillRect(cx * sc, cy * sc, sc, sc);
											break;
											
											case 4: // POI or tunnel
											
											if (POIType==0) POIType = this.getPOIType(obj);
											
											
											if (obj[POIType] == 0) {
												ctx.fillStyle = this.visOptions.colors.tunnelColor;
												} else {
												ctx.fillStyle = this.visOptions.colors.poiColor;
												
												
												if (this.visOptions.poi >=-1 && this.visOptions.poi == obj[POIType]+1) // for some reasons, the constants in ClientLib are off by 1
												hilitePois.push([cx,cy]);
											}
											
											ctx.fillRect(cx * sc, cy * sc, sc, sc);
											
											break;
										}
										} else {
										var terr = w.GetTerritoryTypeByCoordinates(cx, cy);
										switch (terr) {
											case ClientLib.Data.ETerritoryType.Alliance: {
												ctx.fillStyle = this.visOptions.colors.allianceTerrainColor;
												ctx.fillRect(cx * sc, cy * sc, sc, sc);
												break;
											}
											case ClientLib.Data.ETerritoryType.Enemy: {
												if (w.GetOwner(cx, cy) != 1610612736) {
													ctx.fillStyle = "rgba(80,10,10,0.5)";
													ctx.fillRect(cx * sc, cy * sc, sc, sc);
												}
												break;
											}
											case ClientLib.Data.ETerritoryType.Neutral: {
												//ctx.fillStyle = "rgb(210,210,210)";
												//ctx.fillRect(cx,cy,1,1);
												break;
												
											}
										}
									}
								}
							}
						}
						// paint home bases
						var ownCities = md.get_Cities().get_AllCities().d;
						for (var i in ownCities) {
							var city = ownCities[i];
							var x = city.get_PosX() * sc;
							var y = city.get_PosY() * sc;
							ctx.fillStyle = null;
							ctx.strokeStyle = "rgba(255,255,255,0.7)";
							ctx.beginPath();
							ctx.arc(x+sc/2,y+sc/2,sc,0*Math.PI,2*Math.PI);
							ctx.stroke();
							ctx.beginPath();
							ctx.strokeStyle = "rgba(255,255,255,0.3)";
							ctx.arc(x+sc/2,y+sc/2,sc*20,0*Math.PI,2*Math.PI);
							ctx.stroke();
						}
						ctx.strokeStyle = "rgb(255,255,255)";
						// paint hilited pois
						hilitePois.forEach(function(poi) {
							ctx.strokeRect(poi[0] * sc - 2, poi[1] * sc - 2, sc+4, sc+4);
						});
						
						// m_Region == get_Region()
						var topX = Math.floor(vm.get_Region().get_PosX() / vm.get_Region().get_GridWidth());
						var topY = Math.floor(vm.get_Region().get_PosY() / vm.get_Region().get_GridHeight());
						var width = vm.get_Region().get_ViewWidth() / vm.get_Region().get_ZoomFactor() / vm.get_Region().get_GridWidth();
						var height = vm.get_Region().get_ViewHeight() / vm.get_Region().get_ZoomFactor() / vm.get_Region().get_GridHeight();
						ctx.strokeStyle = "rgb(200,200,200)";
						ctx.lineWidth = 1;
						console.log("Selection:" + topX + "," + topY + "w:" + width + "," + height);
						ctx.strokeRect(topX * sc, topY * sc, width * sc, height * sc);
						if (topX * sc < this.scroll.getScrollX() || topX * sc > this.scroll.getScrollX() + this.scroll.getWidth()) {
							this.scroll.scrollToX(Math.max(0, topX * sc - 100));
						}
						if (topY * sc < this.scroll.getScrollY() || topY * sc > this.scroll.getScrollY() + this.scroll.getHeight()) {
							this.scroll.scrollToY(Math.max(0, topY * sc - 100));
						}
					},
					getMousePos : function(canvas, evt) {
						// get canvas position
						var obj = canvas;
						var top = 0;
						var left = 0;
						while (obj && obj.tagName != 'BODY') {
							top += obj.offsetTop;
							left += obj.offsetLeft;
							obj = obj.offsetParent;
						}
						
						// return relative mouse position
						var mouseX = evt.clientX - left + window.pageXOffset;
						var mouseY = evt.clientY - top + window.pageYOffset;
						return {
							x : mouseX,
							y : mouseY
						};
					},
					saveOptions : function() {
						if (localStorage) {
							localStorage["TAMap.visOptions"] = JSON.stringify(this.visOptions);
						}
					},
					showMap : function() {
						console.log("Show map");
						this.mapBox.open();
						var debugOutput = "";
						var mainData = ClientLib.Data.MainData.GetInstance();
						var player_cities = mainData.get_Cities();
						var current_city = player_cities.get_CurrentOwnCity();
					}
				}
			});
		}
		
		function TAMap_checkIfLoaded() {
			try {
				if ( typeof qx != 'undefined') {
					var a = qx.core.Init.getApplication();
					// application
					var mb = qx.core.Init.getApplication().getMenuBar();
					if (a && mb) {
						createMapTweak();
						window.TAMap.main.getInstance().initialize();
					} else
					window.setTimeout(TAMap_checkIfLoaded, 1000);
					} else {
					window.setTimeout(TAMap_checkIfLoaded, 1000);
				}
				} catch (e) {
				if ( typeof console != 'undefined')
				console.log(e);
				else if (window.opera)
				opera.postError(e);
				else
				GM_log(e);
			}
		}
		
		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(TAMap_checkIfLoaded, 1000);
		}
	}
	// injecting, because there seem to be problems when creating game interface with unsafeWindow
	var TAMapScript = document.createElement("script");
	var txt = TAMap_mainFunction.toString();
	TAMapScript.innerHTML = "(" + txt + ")();";
	TAMapScript.type = "text/javascript";
	if (/commandandconquer\.com/i.test(document.domain)) {
		document.getElementsByTagName("head")[0].appendChild(TAMapScript);
	}
	
})();																						

/***********************************************************************************
Tiberium Alliances Info Sticker
***********************************************************************************/

// ==UserScript==
// @name       Tiberium Alliances Info Sticker
// @namespace  TAInfoSticker
// @version    1.11.1
// @description  Based on Maelstrom Dev Tools. Modified MCV timer, repair time label, resource labels.
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @author unicode
// ==/UserScript==
(function () {
    var InfoSticker_main = function () {
        try {
            function createInfoSticker() {
                console.log('InfoSticker loaded');
                // define Base
                qx.Class.define("InfoSticker.Base", {
                    type: "singleton",
                    extend: qx.core.Object,
                    members: {
                        /* Desktop */
                        dataTimerInterval: 1000,
                        positionInterval: 500,
                        tibIcon: null,
                        cryIcon: null,
                        powIcon: null,
                        creditIcon: null,
                        repairIcon: null,
                        hasStorage: false,

                        initialize: function () {
                            try {
                                this.hasStorage = 'localStorage' in window && window['localStorage'] !== null;
                            } catch (se) {}
                            try {
                                var fileManager = ClientLib.File.FileManager.GetInstance();
                                this.tibIcon = fileManager.GetPhysicalPath("ui/common/icn_res_tiberium.png");
                                this.cryIcon = fileManager.GetPhysicalPath("ui/common/icn_res_chrystal.png");
                                this.powIcon = fileManager.GetPhysicalPath("ui/common/icn_res_power.png");
                                this.creditIcon = fileManager.GetPhysicalPath("ui/common/icn_res_dollar.png");
								this.repairIcon = fileManager.GetPhysicalPath("ui/icons/icn_repair_off_points.png");
                                
								if (typeof phe.cnc.Util.attachNetEvent == 'undefined')
									this.attachEvent = webfrontend.gui.Util.attachNetEvent;
								else
									this.attachEvent = phe.cnc.Util.attachNetEvent;
                                
                                this.runMainTimer();
                            } catch (e) {
                                console.log("InfoSticker.initialize: ", e.toString());
                            }
                        },
                        runMainTimer: function () {
                            try {
                                var self = this;
                                this.calculateInfoData();
                                window.setTimeout(function () {
                                    self.runMainTimer();
                                }, this.dataTimerInterval);
                            } catch (e) {
                                console.log("InfoSticker.runMainTimer: ", e.toString());
                            }
                        },
                        runPositionTimer: function () {
                            try {
                                var self = this;
                                this.repositionSticker();
                                window.setTimeout(function () {
                                    self.runPositionTimer();
                                }, this.positionInterval);
                            } catch (e) {
                                console.log("InfoSticker.runPositionTimer: ", e.toString());
                            }
                        },
                        infoSticker: null,
                        mcvPopup: null,
                        mcvTimerLabel: null,
                        mcvInfoLabel: null,
                        mcvPane: null,
                        
                        repairPopup: null,
                        repairTimerLabel: null,

                        resourcePane: null,
                        resourceHidden: false,
                        resourceTitleLabel: null,
                        resourceHideButton: null,
                        resourceLabel1: null,
                        resourceLabel2: null,
                        resourceLabel3: null,

                        resourceLabel1per: null,
                        resourceLabel2per: null,
                        resourceLabel3per: null,

                        productionTitleLabel: null,
                        productionLabelPower: null,
                        productionLabelCredit: null,

                        repairInfoLabel: null,

                        lastButton: null,

                        top_image: null,
                        bot_image: null,

                        toFlipH: [],

                        pinButton: null,
                        pinned: false,

                        pinTop: 130,
                        pinButtonDecoration: null,
                        pinPane: null,

                        pinIconFix: false,
                        
                        lockButton: null,
                        locked: false,

                        lockButtonDecoration: null,
                        lockPane: null,

                        lockIconFix: false,
                        
                        mcvHide: false,
                        repairHide: false,
                        resourceHide: false,
                        productionHide: false,
                        stickerBackground: null,
                        
                        mcvPane: null,
                        
                        pinLockPos: 0,
                        
                        attachEvent: function() {},
                        
                        isNull: function(e) {
                            return typeof e == "undefined" || e == null;
                        },
                        
                        getApp: function() {
                            return qx.core.Init.getApplication();
                        },
                        
                        getBaseListBar: function() {
                            var app = this.getApp();
                            var b;
                            if(!this.isNull(app)) {
                                b = app.getBaseNavigationBar();
                                if(!this.isNull(b)) {
                                    if(b.getChildren().length > 0) {
                                        b = b.getChildren()[0];
                                        if(b.getChildren().length > 0) {
                                            b = b.getChildren()[0];
                                            return b;
                                        }
                                    }
                                }
                            }
                            return null;
                        },
                        
                        repositionSticker: function () {
                            try {
                            	var i;
                                
                                if (this.infoSticker && !this.mcvInfoLabel.isDisposed() && !this.mcvPopup.isDisposed()) {
                                    var dele;

                                    try {
                                        if (this.top_image != null) {
                                            dele = this.top_image.getContentElement().getDomElement();
                                            if (dele != null) {
                                                dele.style["-moz-transform"] = "scaleY(-1)";
                                                dele.style["-o-transform"] = "scaleY(-1)";
                                                dele.style["-webkit-transform"] = "scaleY(-1)";
                                                dele.style.transform = "scaleY(-1)";
                                                dele.style.filter = "FlipV";
                                                dele.style["-ms-filter"] = "FlipV";
                                                this.top_image = null;
                                            }
                                        }
                                        for (i = this.toFlipH.length - 1; i >= 0; i--) {
                                            var e = this.toFlipH[i];
                                            if(e.isDisposed()) this.toFlipH.splice(i, 1);
                                            else {
                                                dele = e.getDecoratorElement().getDomElement();
                                                if (dele != null) {
                                                    dele.style["-moz-transform"] = "scaleX(-1)";
                                                    dele.style["-o-transform"] = "scaleX(-1)";
                                                    dele.style["-webkit-transform"] = "scaleX(-1)";
                                                    dele.style.transform = "scaleX(-1)";
                                                    dele.style.filter = "FlipH";
                                                    dele.style["-ms-filter"] = "FlipH";
                                                    this.toFlipH.splice(i, 1);
                                                }
                                            }
                                        }
                                    } catch (e2) {
                                        console.log("Error flipping images.", e2.toString());
                                    }
                                    var baseListBar = this.getBaseListBar();
                                    if(baseListBar!=null) {
                                        var baseCont = baseListBar.getChildren();
                                        for (i = 0; i < baseCont.length; i++) {
                                            var baseButton = baseCont[i];
                                            if(typeof baseButton.getBaseId === 'function') {
                                                if(baseButton.getBaseId() == ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Id()
                                                    && baseButton.getBounds() != null && baseButton.getBounds().top!=null) {
                                            //var baseButtonDecorator = baseButton.getDecorator();
                                            //if (baseButton!=this.mcvPopup && baseButtonDecorator != null && typeof baseButtonDecorator === "string" && baseButton.getBounds() != null && baseButton.getBounds().top!=null) {
                                                //if (baseButtonDecorator.indexOf("focused") >= 0 || baseButtonDecorator.indexOf("pressed") >= 0) {
                                                    if(this.locked) {
                                                        if(!this.pinned) {
                                                            if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                                                baseListBar.remove(this.mcvPopup);
                                                            }
                                                            this.pinLockPos = baseListBar.indexOf(baseButton)+1;
                                                            baseListBar.addAt(this.mcvPopup, this.pinLockPos);
                                                        } else if(baseListBar.indexOf(this.mcvPopup)<0) {
                                                            baseListBar.addAt(this.mcvPopup, Math.max(0, Math.min(this.pinLockPos, baseCont.length)));
                                                        }
                                                    } else {
                                                        if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                                            baseListBar.remove(this.mcvPopup);
                                                        }
                                                        if (!this.pinned) {
                                                            var top = baseButton.getBounds().top;
                                                            var infoTop;
                                                            try {
                                                                var stickerHeight = this.infoSticker.getContentElement().getDomElement().style.height;
                                                                stickerHeight = stickerHeight.substring(0, stickerHeight.indexOf("px"));
                                                                infoTop = Math.min(130 + top, Math.max(660, window.innerHeight) - parseInt(stickerHeight, 10) - 130);
                                                            } catch (heighterror) {
                                                                infoTop = 130 + top;
                                                            }
                                                            if(this.infoSticker.getContentElement().getDomElement()!=null)
                                                                this.infoSticker.setDomTop(infoTop);
                                                            
                                                            this.pinTop = infoTop;
                                                        }
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    
                                }
                            } catch (ex) {
                                console.log("InfoSticker.repositionSticker: ", ex.toString());
                            }
                        },
                        toLock: function (e) {
                            try {
                                this.locked = !this.locked;
                                if(!this.locked) {
                                    this.infoSticker.show();
                                    this.stickerBackground.add(this.mcvPopup);
                                }
                                else this.infoSticker.hide();
                                this.lockButton.setIcon(this.locked ? "FactionUI/icons/icn_thread_locked_active.png" : "FactionUI/icons/icn_thread_locked_inactive.png");
                                this.updateLockButtonDecoration();
                                if (this.hasStorage) {
                                    if (this.locked) {
                                        localStorage["infoSticker-locked"] = "true";
                                        if(this.pinned) localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                    } else {
                                        localStorage["infoSticker-locked"] = "false";
                                    }
                                }
                                if(this.locked && this.pinned) {
                                    this.menuUpButton.setEnabled(true);
                                    this.menuDownButton.setEnabled(true);
                                } else {
                                    this.menuUpButton.setEnabled(false);
                                    this.menuDownButton.setEnabled(false);
                                }
                                this.repositionSticker();
                            } catch(e) {
                                console.log("InfoSticker.toLock: ", e.toString());
                            }
                        },
                        updateLockButtonDecoration: function () {
                            var light = "#CDD9DF";
                            var mid = "#9CA4A8";
                            var dark = "#8C9499";
                            this.lockPane.setDecorator(null);
                            this.lockButtonDecoration = new qx.ui.decoration.Background();
                            this.lockButtonDecoration.setBackgroundColor(this.locked ? dark : light);
                            this.lockPane.setDecorator(this.lockButtonDecoration);
                        },
                        toPin: function (e) {
                            try {
                                this.pinned = !this.pinned;
                                this.pinButton.setIcon(this.pinned ? "FactionUI/icons/icn_thread_pin_active.png" : "FactionUI/icons/icn_thread_pin_inactive.png");
                                this.updatePinButtonDecoration();
                                if (this.hasStorage) {
                                    if (this.pinned) {
                                        localStorage["infoSticker-pinned"] = "true";
                                        localStorage["infoSticker-top"] = this.pinTop.toString();
                                        if(this.locked) {
                                            localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                        }
                                    } else {
                                        localStorage["infoSticker-pinned"] = "false";
                                    }
                                }
                                if(this.locked && this.pinned) {
                                    this.menuUpButton.setEnabled(true);
                                    this.menuDownButton.setEnabled(true);
                                } else {
                                    this.menuUpButton.setEnabled(false);
                                    this.menuDownButton.setEnabled(false);
                                }
                            } catch(e) {
                                console.log("InfoSticker.toPin: ", e.toString());
                            }
                        },
                        updatePinButtonDecoration: function () {
                            var light = "#CDD9DF";
                            var mid = "#9CA4A8";
                            var dark = "#8C9499";
                            this.pinPane.setDecorator(null);
                            this.pinButtonDecoration = new qx.ui.decoration.Background().set({
                                //innerOpacity: 0.5
                            });
                            //this.pinButtonDecoration.setInnerColor(this.pinned ? mid : light);
                            //this.pinButtonDecoration.setOuterColor(this.pinned ? light : mid);
                            this.pinButtonDecoration.setBackgroundColor(this.pinned ? dark : light);
                            this.pinPane.setDecorator(this.pinButtonDecoration);
                        },
                        hideResource: function () {
                            try {
                                //if(this.resourceHidden) 
                                if (this.resourcePane.isVisible()) {
                                    //this.resourcePane.hide();
                                    this.resourcePane.exclude();
                                    this.resourceHideButton.setLabel("+");
                                } else {
                                    this.resourcePane.show();
                                    this.resourceHideButton.setLabel("-");
                                }
                            } catch(e) {
                                console.log("InfoSticker.hideResource: ", e.toString());
                            }
                        },
                        lastPane: null,
                        createSection: function (parent, titleLabel, visible, visibilityStorageName) {
							try {
								var pane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
									padding: [5, 0, 5, 5],
									width: 124,
									decorator: new qx.ui.decoration.Background().set({
										backgroundImage: "decoration/pane_messaging_item/messaging_items_pane.png",
										backgroundRepeat: "scale",
									}),
									alignX: "right"
								});
								
								var labelStyle = {
									font: qx.bom.Font.fromString('bold').set({
										size: 12
									}),
									textColor: '#595969'
								};
								titleLabel.set(labelStyle);
								
								var hidePane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
									width: 124,
                                    alignX: "right"
								});
								
								var hideButton = new qx.ui.form.Button("-").set({
									//decorator: new qx.ui.decoration.Single(1, "solid", "black"),
									maxWidth: 15,
									maxHeight: 10,
									//textColor: "black"
								});
                                var self = this;
								//resourceHideButton.addListener("execute", this.hideResource, this);
								hideButton.addListener("execute", function () {
									if (hidePane.isVisible()) {
										hidePane.exclude();
										hideButton.setLabel("+");
									} else {
										hidePane.show();
										hideButton.setLabel("-");
									}
									if(self.hasStorage)
										localStorage["infoSticker-"+visibilityStorageName] = !hidePane.isVisible();
								});

								var titleBar = new qx.ui.container.Composite(new qx.ui.layout.HBox(0));
								titleBar.add(hideButton);
								titleBar.add(titleLabel);
								pane.add(titleBar);
								pane.add(hidePane);
								
                                if(!visible) hidePane.exclude();
                                
								this.toFlipH.push(pane);

                                this.lastPane = pane;
								parent.add(pane);
								
								return hidePane;
							} catch(e) {
								console.log("InfoSticker.createSection: ", e.toString());
								throw e;
							}
                        },
						createHBox: function (ele1, ele2, ele3) {
							var cnt;
							cnt = new qx.ui.container.Composite();
							cnt.setLayout(new qx.ui.layout.HBox(0));
							if (ele1 != null) {
								cnt.add(ele1);
								ele1.setAlignY("middle");
							}
							if (ele2 != null) {
								cnt.add(ele2);
								ele2.setAlignY("bottom");
							}
							if (ele3 != null) {
								cnt.add(ele3);
								ele3.setAlignY("bottom");
							}

							return cnt;
						},
                        
                        formatCompactTime: function (time) {
                            var comps = time.split(":");
                            
                            var i = 0;
                            var value = Math.round(parseInt(comps[i], 10)).toString();
                            var len = comps.length;
                            while(value==0) {
                                value = Math.round(parseInt(comps[++i], 10)).toString();
                                len--;
                            }
                            var unit;
                            switch(len) {
                                case 1: unit = "s"; break;
                                case 2: unit = "m"; break;
                                case 3: unit = "h"; break;
                                case 4: unit = "d"; break;
                            }
                            return value+unit;
                        },
                        createImage: function(icon) {
                            var image = new qx.ui.basic.Image(icon);
                            image.setScale(true);
                            image.setWidth(20);
                            image.setHeight(20);
                            return image;
                        },

                        createMCVPane: function() {
                            try {
                                this.mcvInfoLabel = new qx.ui.basic.Label();
                                this.mcvTimerLabel = new qx.ui.basic.Label().set({
                                    font: qx.bom.Font.fromString('bold').set({
                                            size: 18
                                        }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 114,
                                    textAlign: 'center'
                                });
                                this.mcvTimerCreditProdLabel = new qx.ui.basic.Label().set({
                                    font: qx.bom.Font.fromString('normal').set({
                                        size: 12
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 114,
                                    textAlign: 'center',
                                    marginTop: 4,
                                    marginBottom: -4
                                });
                                var app = qx.core.Init.getApplication();
                                var b3 = app.getBaseNavigationBar().getChildren()[0].getChildren()[0];
                                
                                
                                var pane = this.createSection(b3, this.mcvInfoLabel, !this.mcvHide, "mcvHide");
                                pane.add(this.mcvTimerLabel);
                                pane.add(this.mcvTimerCreditProdLabel);
                                this.mcvPane = this.lastPane;
                                this.lastPane.setMarginLeft(7);
                                
                            } catch(e) {
                                console.log("InfoSticker.createMCVPopup", e.toString());
                            }
                        },
                        moveStickerUp: function() {
                            try {
                                var baseListBar = this.getBaseListBar();
                                this.pinLockPos=Math.max(0, this.pinLockPos-1);
                                if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                    baseListBar.remove(this.mcvPopup);
                                }
                                if (this.hasStorage) {
                                    localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                }
                            } catch(e) {
                                console.log("InfoSticker.moveStickerUp", e.toString());
                            }
                        },
                        moveStickerDown: function() {
                            try {
                                var baseListBar = this.getBaseListBar();
                                this.pinLockPos=Math.min(baseListBar.getChildren().length, this.pinLockPos+1);
                                if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                    baseListBar.remove(this.mcvPopup);
                                }
                                if (this.hasStorage) {
                                    localStorage["infoSticker-pinLock"] = this.pinLockPos.toString();
                                }
                            } catch(e) {
                                console.log("InfoSticker.moveStickerDown", e.toString());
                            }
                        },
                        menuUpButton: null,
                        menuDownButton: null,
                        createMCVPopup: function() {
                            try {
                                var self = this;
                                this.mcvPopup = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({
                                    spacing: 3})).set({
                                    paddingLeft: 5,
                                    width: 105,
                                    decorator: new qx.ui.decoration.Background()
                                });
                                
                                var menu = new qx.ui.menu.Menu();
                                var menuPinButton = new qx.ui.menu.Button("Pin", "FactionUI/icons/icn_thread_pin_inactive.png");
                                menuPinButton.addListener("execute", this.toPin, this);
                                menu.add(menuPinButton);
                                var menuLockButton = new qx.ui.menu.Button("Lock", "FactionUI/icons/icn_thread_locked_inactive.png");
                                menuLockButton.addListener("execute", this.toLock, this);
                                menu.add(menuLockButton);
                                var fileManager = ClientLib.File.FileManager.GetInstance();
                                this.menuUpButton = new qx.ui.menu.Button("Move up", fileManager.GetPhysicalPath("ui/icons/icon_tracker_arrow_up.png"));
                                //ui/icons/icon_tracker_arrow_up.png ui/gdi/icons/cht_opt_arrow_down.png
                                this.menuUpButton.addListener("execute", this.moveStickerUp, this);
                                menu.add(this.menuUpButton);
                                this.menuDownButton = new qx.ui.menu.Button("Move down", fileManager.GetPhysicalPath("ui/icons/icon_tracker_arrow_down.png"));
                                this.menuDownButton.addListener("execute", this.moveStickerDown, this);
                                menu.add(this.menuDownButton);
                                this.mcvPopup.setContextMenu(menu);
                                if(!this.locked) {
                                    this.stickerBackground.add(this.mcvPopup);
                                }
    
    ////////////////////////////----------------------------------------------------------
                                this.pinButton = new webfrontend.ui.SoundButton().set({
                                    decorator: "button-forum-light",
                                    icon: this.pinned ? "FactionUI/icons/icn_thread_pin_active.png" : "FactionUI/icons/icn_thread_pin_inactive.png",
                                    iconPosition: "top",
                                    show: "icon",
                                    cursor: "pointer",
                                    height: 23,
                                    width: 50,
                                    //maxHeight: 25,
                                    maxWidth: 33,
                                    maxHeight: 19,
                                    alignX: "center"
                                });
                                this.pinButton.addListener("execute", this.toPin, this);
                                
                                this.pinPane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                    //width: 50,
                                    maxWidth: 37,
                                });
                                
                                this.updatePinButtonDecoration();
                                
                                this.pinPane.setDecorator(this.pinButtonDecoration);
                                this.pinPane.add(this.pinButton);
                                //this.mcvPopup.add(this.pinPane);
                                //this.toFlipH.push(this.pinPane);
                                
                                var icon = this.pinButton.getChildControl("icon");
                                icon.setWidth(15);
                                icon.setHeight(15);
                                icon.setScale(true);
    ////////////////////////////----------------------------------------------------------
                                this.lockButton = new webfrontend.ui.SoundButton().set({
                                    decorator: "button-forum-light",
                                    icon: this.pinned ? "FactionUI/icons/icn_thread_locked_active.png" : "FactionUI/icons/icn_thread_locked_inactive.png",
                                    iconPosition: "top",
                                    show: "icon",
                                    cursor: "pointer",
                                    height: 23,
                                    width: 50,
                                    //maxHeight: 25,
                                    maxWidth: 33,
                                    maxHeight: 19,
                                    alignX: "center"
                                });
                                this.lockButton.addListener("execute", this.toLock, this);
                                
                                this.lockPane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                    //width: 50,
                                    maxWidth: 37,
                                });
                                
                                this.updateLockButtonDecoration();
                                
                                this.lockPane.setDecorator(this.lockButtonDecoration);
                                this.lockPane.add(this.lockButton);
                                //this.mcvPopup.add(this.pinPane);
                                //this.toFlipH.push(this.pinPane);
                                
                                icon = this.lockButton.getChildControl("icon");
                                icon.setWidth(15);
                                icon.setHeight(15);
                                icon.setScale(true);
    ////////////////////////////----------------------------------------------------------
                                this.resourceTitleLabel = new qx.ui.basic.Label();
                                this.resourceTitleLabel.setValue("Base");
                                var resStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                            size: 14
                                        }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 65,
                                    marginLeft: -10,
                                    textAlign: 'right'
                                };
                                
                                this.resourceLabel1 = new qx.ui.basic.Label().set(resStyle);
                                this.resourceLabel2 = new qx.ui.basic.Label().set(resStyle);
                                this.resourceLabel3 = new qx.ui.basic.Label().set(resStyle);
                                
                                var perStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 9
                                    }),
                                    textColor: '#282828',
                                    height: 18,
                                    width: 33,
                                    textAlign: 'right'
                                };
                                this.resourceLabel1per = new qx.ui.basic.Label().set(perStyle);
                                this.resourceLabel2per = new qx.ui.basic.Label().set(perStyle);
                                this.resourceLabel3per = new qx.ui.basic.Label().set(perStyle);
                                
                                
                                var pane3 = this.createSection(this.mcvPopup, this.resourceTitleLabel, !this.resourceHide, "resourceHide");
                                
                                
                                this.repairTimerLabel = new qx.ui.basic.Label().set({
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 16
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 85,
                                    marginLeft: 0,
                                    textAlign: 'center'
                                });
                                pane3.add(this.createHBox(this.createImage(this.repairIcon), this.repairTimerLabel));
                                
                                pane3.add(this.createHBox(this.createImage(this.tibIcon), this.resourceLabel1, this.resourceLabel1per));
                                pane3.add(this.createHBox(this.createImage(this.cryIcon), this.resourceLabel2, this.resourceLabel2per));
                                pane3.add(this.createHBox(this.createImage(this.powIcon), this.resourceLabel3, this.resourceLabel3per));
                                
                                var mcvC = this.mcvPopup.getChildren();
                                mcvC[mcvC.length-1].getChildren()[0].add(this.pinPane);
                                mcvC[mcvC.length-1].getChildren()[0].add(this.lockPane);
    ////////////////////////////----------------------------------------------------------
    
                                this.productionTitleLabel = new qx.ui.basic.Label();
                                this.productionTitleLabel.setValue("Productions");
                                
                                var productionStyle = {
                                    font: qx.bom.Font.fromString('bold').set({
                                        size: 13
                                    }),
                                    textColor: '#282828',
                                    height: 20,
                                    width: 60,
                                    textAlign: 'right',
                                    marginTop: 2,
                                    marginBottom: -2
                                };
                                this.productionLabelPower = new qx.ui.basic.Label().set(productionStyle);
                                this.productionLabelCredit = new qx.ui.basic.Label().set(productionStyle);
                                
                                var pane4 = this.createSection(this.mcvPopup, this.productionTitleLabel, !this.productionHide, "productionHide");
                                pane4.add(this.createHBox(this.createImage(this.powIcon), this.productionLabelPower));
                                pane4.add(this.createHBox(this.createImage(this.creditIcon), this.productionLabelCredit));
    ////////////////////////////----------------------------------------------------------
                            } catch(e) {
                                console.log("InfoSticker: createMCVPopup", e.toString());
                            }
                        },
                        currentCityChange: function() {
                            this.calculateInfoData();
                            this.repositionSticker();
                        },
                        disposeRecover: function() {
                            
                            try {
                                if(this.mcvPane.isDisposed()) {
                                    this.createMCVPane();
                                }
                                
                                if(this.mcvPopup.isDisposed()) {
                                    this.createMCVPopup();
                                    
                                    this.repositionSticker();
                                }
                                this.waitingRecovery = false;
                            } catch(e) {
                                console.log("InfoSticker: disposeRecover", e.toString());
                            }
                            
                        },
                        waitingRecovery: false,
                        citiesChange: function() {
                            try {
                                var self = this;
                                var baseListBar = this.getBaseListBar();
                                this.disposeRecover();
                                
                                if(baseListBar.indexOf(this.mcvPopup)>=0) {
                                    baseListBar.remove(this.mcvPopup);
                                    this.mcvPopup.dispose();
                                }
                                
                                if(baseListBar.indexOf(this.mcvPane)>=0) {
                                    baseListBar.remove(this.mcvPane);
                                    this.mcvPane.dispose();
                                }
                                if(!this.waitingRecovery) {
                                    this.waitingRecovery = true;
                                    window.setTimeout(function () {
                                        self.disposeRecover();
                                    }, 10);
                                }
                            } catch(e) {
                                console.log("InfoSticker: citiesChange", e.toString());
                            }
                        },
                        calculateInfoData: function () {
                            try {
                                var self = this;
                                var player = ClientLib.Data.MainData.GetInstance().get_Player();
                                var cw = player.get_Faction();
                                var cj = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound, cw);
                                var cr = player.get_PlayerResearch();
                                var cd = cr.GetResearchItemFomMdbId(cj);
                                
                                var app = qx.core.Init.getApplication();
                                var b3 = app.getBaseNavigationBar().getChildren()[0].getChildren()[0];
                                if(b3.getChildren().length==0) return;
                                if (!this.infoSticker) {
                                    this.infoSticker = new qx.ui.container.Composite(new qx.ui.layout.VBox().set({
                                        alignX: "right"
                                    })).set({
                                        width: 105,
                                    });

                                    var top = 130;
                                    if (this.hasStorage) {
                                        var l = localStorage["infoSticker-locked"] == "true";
                                        if (l != null) {
                                            this.locked = l;
                                            var pl = localStorage["infoSticker-pinLock"];
                                            if(pl!=null) {
                                                try {
                                                	this.pinLockPos = parseInt(pl, 10);
                                                } catch(etm) {}
                                            }
                                        }
                                        
                                        var p = localStorage["infoSticker-pinned"];
                                        var t = localStorage["infoSticker-top"];
                                        if (p != null && t != null) {
                                            var tn;
                                            try {
                                                this.pinned = p == "true";
                                                if (this.pinned) {
                                                    tn = parseInt(t, 10);
                                                    top = tn;
                                                }
                                            } catch (etn) {}
                                        }
                                        this.mcvHide = localStorage["infoSticker-mcvHide"] == "true";
                                        this.repairHide = localStorage["infoSticker-repairHide"] == "true";
                                        this.resourceHide = localStorage["infoSticker-resourceHide"] == "true";
                                        this.productionHide = localStorage["infoSticker-productionHide"] == "true";
                                    }
                                    
                                    
                                    app.getDesktop().add(this.infoSticker, {
                                        right: 124,
                                        top: top
                                    });
                                    if(this.locked) {
                                        this.infoSticker.hide();
                                    }

                                    this.stickerBackground = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
                                        //paddingLeft: 5,
                                        width: 105,
                                        decorator: new qx.ui.decoration.Background().set({
                                            backgroundImage: "webfrontend/ui/common/bgr_region_world_select_scaler.png",
                                            backgroundRepeat: "scale",
                                        })
                                    });
                                    
                                    this.createMCVPane();
                                    this.createMCVPopup();
									
                                    if(this.locked && this.pinned) {
                                        this.menuUpButton.setEnabled(true);
                                        this.menuDownButton.setEnabled(true);
                                    } else {
                                        this.menuUpButton.setEnabled(false);
                                        this.menuDownButton.setEnabled(false);
                                    }
                                    
                                    this.top_image = new qx.ui.basic.Image("webfrontend/ui/common/bgr_region_world_select_end.png");
                                    this.infoSticker.add(this.top_image);

                                    this.infoSticker.add(this.stickerBackground);
                                    //this.infoSticker.add(this.mcvPopup);

                                    this.bot_image = new qx.ui.basic.Image("webfrontend/ui/common/bgr_region_world_select_end.png");
                                    this.infoSticker.add(this.bot_image);

                                    this.runPositionTimer();

                                    try {
                                        this.attachEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "CurrentOwnChange", ClientLib.Data.CurrentOwnCityChange, this, this.currentCityChange);
                                        this.attachEvent(ClientLib.Data.MainData.GetInstance().get_Cities(), "Change", ClientLib.Data.CitiesChange, this, this.citiesChange);
                                    } catch(eventError) {
                                        console.log("InfoSticker.EventAttach:", eventError);
                                        console.log("The script will continue to run, but with slower response speed.");
                                    }
                                }
                                this.disposeRecover();
                                
                                if (cd == null) {
                                    if (this.mcvPopup) {
                                        //this.mcvInfoLabel.setValue("MCV ($???)");
                                        this.mcvInfoLabel.setValue("MCV<br>$???");
                                        this.mcvTimerLabel.setValue("Loading");
                                    }
                                } else {
                                    var nextLevelInfo = cd.get_NextLevelInfo_Obj();
                                    var resourcesNeeded = [];
                                    for (var i in nextLevelInfo.rr) {
                                        if (nextLevelInfo.rr[i].t > 0) {
                                            resourcesNeeded[nextLevelInfo.rr[i].t] = nextLevelInfo.rr[i].c;
                                        }
                                    }
                                    //var researchNeeded = resourcesNeeded[ClientLib.Base.EResourceType.ResearchPoints];
                                    //var currentResearchPoints = player.get_ResearchPoints();
                                    var creditsNeeded = resourcesNeeded[ClientLib.Base.EResourceType.Gold];
                                    var creditsResourceData = player.get_Credits();
                                    var creditGrowthPerHour = (creditsResourceData.Delta + creditsResourceData.ExtraBonusDelta) * ClientLib.Data.MainData.GetInstance().get_Time().get_StepsPerHour();
                                    var creditTimeLeftInHours = (creditsNeeded - player.GetCreditsCount()) / creditGrowthPerHour;
                                    this.mcvInfoLabel.setValue("MCV ($ " + this.formatNumbersCompact(creditsNeeded) + ")");
                                    //this.mcvInfoLabel.setValue("MCV<br>$" + this.formatNumbersCompact(creditsNeeded));
                                    this.mcvTimerCreditProdLabel.setValue("at " + this.formatNumbersCompact(creditGrowthPerHour) + "/h");
                                    if (creditTimeLeftInHours <= 0) {
                                        this.mcvTimerLabel.setValue("Ready");
                                    } else if (creditGrowthPerHour == 0) {
                                        this.mcvTimerLabel.setValue("Never");
                                    } else {
                                        if(creditTimeLeftInHours >= 24 * 100) {
                                            this.mcvTimerLabel.setValue("> 99 days");
                                        } else {
                                            this.mcvTimerLabel.setValue(this.FormatTimespan(creditTimeLeftInHours * 60 * 60));
                                        }
                                    }
                                }

                                var ncity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                                if (ncity == null) {
                                    if (this.mcvPopup) {
                                        this.repairTimerLabel.setValue("Select a base");

                                        this.resourceLabel1.setValue("N/A");
                                        this.resourceLabel2.setValue("N/A");
                                        this.resourceLabel3.setValue("N/A");
                                    }
                                } else {

                                    var rt = Math.min(ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf),
                                    ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh),
                                    ncity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir));
                                    if (ncity.get_CityUnitsData().get_UnitLimitOffense() == 0) {
                                        this.repairTimerLabel.setValue("No army");
                                    } else {
                                        this.repairTimerLabel.setValue(this.FormatTimespan(rt));
                                    }

                                    var tib = ncity.GetResourceCount(ClientLib.Base.EResourceType.Tiberium);
                                    var tibMax = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium);
                                    var tibRatio = tib / tibMax;
                                    this.resourceLabel1.setTextColor(this.formatNumberColor(tib, tibMax));
                                    this.resourceLabel1.setValue(this.formatNumbersCompact(tib));
                                    this.resourceLabel1per.setValue(this.formatPercent(tibRatio));

                                    var cry = ncity.GetResourceCount(ClientLib.Base.EResourceType.Crystal);
                                    var cryMax = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal);
                                    var cryRatio = cry / cryMax;
                                    this.resourceLabel2.setTextColor(this.formatNumberColor(cry, cryMax));
                                    this.resourceLabel2.setValue(this.formatNumbersCompact(cry));
                                    this.resourceLabel2per.setValue(this.formatPercent(cryRatio));

                                    var power = ncity.GetResourceCount(ClientLib.Base.EResourceType.Power);
                                    var powerMax = ncity.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power);
                                    var powerRatio = power / powerMax;
                                    this.resourceLabel3.setTextColor(this.formatNumberColor(power, powerMax));
                                    this.resourceLabel3.setValue(this.formatNumbersCompact(power));
                                    this.resourceLabel3per.setValue(this.formatPercent(powerRatio));

                                    var powerCont = ncity.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false);
                                    var powerBonus = ncity.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power);
                                    var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                                    var powerAlly = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
                                    var powerProd = powerCont + powerBonus + powerAlly;

                                    var creditCont = ClientLib.Base.Resource.GetResourceGrowPerHour(ncity.get_CityCreditsProduction(), false);
                                    var creditBonus = ClientLib.Base.Resource.GetResourceBonusGrowPerHour(ncity.get_CityCreditsProduction(), false);
                                    var creditProd = creditCont + creditBonus;

                                    this.productionLabelPower.setValue(this.formatNumbersCompact(powerProd) + "/h");
                                    this.productionLabelCredit.setValue(this.formatNumbersCompact(creditProd) + "/h");
                                }
                            } catch (e) {
                                console.log("InfoSticker.calculateInfoData", e.toString());
                            }
                        },
                        formatPercent: function (value) {
                            return value > 999 / 100 ? ">999%" : this.formatNumbersCompact(value * 100, 0) + "%";
                            //return this.formatNumbersCompact(value*100, 0) + "%";
                        },
                        formatNumberColor: function (value, max) {
                            var ratio = value / max;

                            var color;
                            var black = [40, 180, 40];
                            var yellow = [181, 181, 0];
                            var red = [187, 43, 43];

                            if (ratio < 0.5) color = black;
                            else if (ratio < 0.75) color = this.interpolateColor(black, yellow, (ratio - 0.5) / 0.25);
                            else if (ratio < 1) color = this.interpolateColor(yellow, red, (ratio - 0.75) / 0.25);
                            else color = red;

                            //console.log(qx.util.ColorUtil.rgbToHexString(color));
                            return qx.util.ColorUtil.rgbToHexString(color);
                        },
                        interpolateColor: function (color1, color2, s) {
                            //console.log("interp "+s+ " " + color1[1]+" " +color2[1]+" " +(color1[1]+s*(color2[1]-color1[1])));
                            return [Math.floor(color1[0] + s * (color2[0] - color1[0])),
                            Math.floor(color1[1] + s * (color2[1] - color1[1])),
                            Math.floor(color1[2] + s * (color2[2] - color1[2]))];
                        },
                        formatNumbersCompact: function (value, decimals) {
                            if (decimals == undefined) decimals = 2;
                            var valueStr;
                            var unit = "";
                            if (value < 1000) valueStr = value.toString();
                            else if (value < 1000 * 1000) {
                                valueStr = (value / 1000).toString();
                                unit = "k";
                            } else if (value < 1000 * 1000 * 1000) {
                                valueStr = (value / 1000000).toString();
                                unit = "M";
                            } else {
                                valueStr = (value / 1000000000).toString();
                                unit = "G";
                            }
                            if (valueStr.indexOf(".") >= 0) {
                                var whole = valueStr.substring(0, valueStr.indexOf("."));
                                if (decimals === 0) {
                                    valueStr = whole;
                                } else {
                                    var fraction = valueStr.substring(valueStr.indexOf(".") + 1);
                                    if (fraction.length > decimals) fraction = fraction.substring(0, decimals);
                                    valueStr = whole + "." + fraction;
                                }
                            }

                            valueStr = valueStr + unit;
                            return valueStr;
                        },
                        FormatTimespan: function (value) {
                            var i;
                            var t = ClientLib.Vis.VisMain.FormatTimespan(value);
                            var colonCount = 0;
                            for (i = 0; i < t.length; i++) {
                                if (t.charAt(i) == ':') colonCount++;
                            }
                            var r = "";
                            for (i = 0; i < t.length; i++) {
                                if (t.charAt(i) == ':') {
                                    if (colonCount > 2) {
                                        r += "d ";
                                    } else {
                                        r += t.charAt(i);
                                    }
                                    colonCount--;
                                } else {
                                    r += t.charAt(i);
                                }
                            }
                            return r;
                        }
                    }
                });
            }
        } catch (e) {
            console.log("InfoSticker: createInfoSticker: ", e.toString());
        }

        function InfoSticker_checkIfLoaded() {
            try {
                if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
                    createInfoSticker();
                    window.InfoSticker.Base.getInstance().initialize();
                } else {
                    window.setTimeout(InfoSticker_checkIfLoaded, 1000);
                }
            } catch (e) {
                console.log("InfoSticker_checkIfLoaded: ", e.toString());
            }
        }
        if (/commandandconquer\.com/i.test(document.domain)) {
            window.setTimeout(InfoSticker_checkIfLoaded, 1000);
        }
    }
    try {
        var InfoStickerScript = document.createElement("script");
        InfoStickerScript.innerHTML = "(" + InfoSticker_main.toString() + ")();";
        InfoStickerScript.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) {
            document.getElementsByTagName("head")[0].appendChild(InfoStickerScript);
        }
    } catch (e) {
        console.log("InfoSticker: init error: ", e.toString());
    }
})();
