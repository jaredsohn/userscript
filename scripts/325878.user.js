// ==UserScript==
// @name        CnC Tiberium Alliances Ultimate Pack - Chillchef edition ;)
// @namespace   https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
/* @description Packing all more used script for C&C Tiberium Alliance Web Game.
                Pack list : 
                - Infernal Wrapper (API needed) version 0.390737.5
                - Chat Helper Enhanced
                - Tiberium Zoomer (KOMMANDO)
                - Tiberium Coords 500:500
                - Maelstorm Tools version 0.1.3.2
                - Formation Saver
                - MHTools Tiberium Alliances Available Loot Summary + Info 1.8.3
                - WarChiefs - Tiberium Alliances Combat Simulator 13.09.26
				- WarChiefs - Tiberium Alliances Sector HUD 13.09.11
				- C&C:TA CNCOpt Link Button 1.7.6
				- CNCTACoordsButton 1.0.1
				- C&C:TA Compass 1.0.1
				- Maelstrom ADDON Basescanner version 1.8.4
				- Sprache in Zeile 1118 direkt auf "de" gesetzt
// @version     3.4.0.2
// @updateURL   http://userscripts.org/scripts/source/325878.meta.js
// @downloadURL http://userscripts.org/scripts/source/325878.user.js
// @icon        http://eaassets-a.akamaihd.net/cncalliancesweb/static/2.1/theme/cca-home-redux-theme/images/global/logo.png
// ==/UserScript==

// type: /chelp in any text box and hit <enter> for a list of commands

/***********************************************************************************************************************************************
*                                                API Infernal Wrapper version 0.390737.5
***********************************************************************************************************************************************/
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
                var strFunction;
                
                // SharedLib.Combat.CbtSimulation.prototype.DoStep
                for (var x in $I) {
                    for (var key in $I[x].prototype) {
                        if ($I[x].prototype.hasOwnProperty(key) && typeof($I[x].prototype[key]) === 'function') {  // reduced iterations from 20K to 12K
                            strFunction = $I[x].prototype[key].toString();
                            if (strFunction.indexOf("().l;var b;for (var d = 0 ; d < c.length ; d++){b = c[d];if((b.") > -1) {
                                $I[x].prototype.DoStep = $I[x].prototype[key];
                                console.log("SharedLib.Combat.CbtSimulation.prototype.DoStep = $I." + x + ".prototype." + key);
                                break;
                            }
                        }
                    }
                }

                // ClientLib.Data.CityRepair.prototype.CanRepair
                for (var key in ClientLib.Data.CityRepair.prototype) {
                    if (typeof ClientLib.Data.CityRepair.prototype[key] === 'function') {
                        strFunction = ClientLib.Data.CityRepair.prototype[key].toString();
                        if (strFunction.indexOf("DefenseSetup") > -1 && strFunction.indexOf("DamagedEntity") > -1) {  // order important to reduce iterations
                            ClientLib.Data.CityRepair.prototype.CanRepair = ClientLib.Data.CityRepair.prototype[key];
                            console.log("ClientLib.Data.CityRepair.prototype.CanRepair = ClientLib.Data.CityRepair.prototype." + key);
                            break;
                        }
                    }
                }

                // ClientLib.Data.CityRepair.prototype.UpdateCachedFullRepairAllCost
                for (var key in ClientLib.Data.CityRepair.prototype) {
                    if (typeof ClientLib.Data.CityRepair.prototype[key] === 'function') {
                        strFunction = ClientLib.Data.CityRepair.prototype[key].toString();
                        if (strFunction.indexOf("Type==7") > -1 && strFunction.indexOf("var a=0;if") > -1) {  // order important to reduce iterations
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
                strFunction = "var $createHelper;return this." + fn_name + ";";
                var fn = Function('', strFunction);
                ClientLib.Data.CityUnits.prototype.get_OffenseUnits = fn;
                console.log("ClientLib.Data.CityUnits.prototype.get_OffenseUnits = function(){var $createHelper;return this." + fn_name + ";}");

                // ClientLib.Data.CityUnits.prototype.get_DefenseUnits
                strFunction = ClientLib.Data.CityUnits.prototype.HasUnitMdbId.toString();
                searchString = "for (var c in {d:this.";
                startPos = strFunction.indexOf(searchString) + searchString.length;
                fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "var $createHelper;return this." + fn_name + ";";
                fn = Function('', strFunction);
                ClientLib.Data.CityUnits.prototype.get_DefenseUnits = fn;
                console.log("ClientLib.Data.CityUnits.prototype.get_DefenseUnits = function(){var $createHelper;return this." + fn_name + ";}");

                // ClientLib.Vis.Battleground.Battleground.prototype.get_Simulation
                strFunction = ClientLib.Vis.Battleground.Battleground.prototype.StartBattle.toString();
                searchString = "=0;for(var a=0; (a<9); a++){this.";
                startPos = strFunction.indexOf(searchString) + searchString.length;
                fn_name = strFunction.slice(startPos, startPos + 6);
                strFunction = "return this." + fn_name + ";";
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

/*******************************************************************************************************************************************************************
*                                                                Chat Helper Enhanced
*******************************************************************************************************************************************************************/

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


/******************************************************************************************************************************
*
*
*
***********************************************************************************************************************************/


/***********************************************************************************************************************************************
*                                                    CCTA Zoom (KOMMANDO)
***********************************************************************************************************************************************/

(function (){
  var tazoom_main = function() {
    function initialize() {
      console.log("Zoom Loaded");
      
      var zoomMin = 2.0;	// Larger number means able to zoom in closer.
      var zoomMax = 0.2;	// Smaller number means able to zoom out further.
      var zoomInc = 0.1;	// Larger number for faster zooming, Smaller number for slower zooming.
      
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


/******************************************************************************************************************************************************************
* name        C&C:TA Compass
*description Creates compass poiting to the currently selected base (compass points from itself).
*version     1.0.1
*author      Caine
*******************************************************************************************************************************************************************/
(function () {
var CompassMain = function () {
try {
function createCompass() {
console.log('Compass loaded');
qx.Class.define('Compass', {
	type: 'singleton',
	extend: qx.core.Object,
	members: {
	needle: null,
	ctx: null,
	background: null,
	size: 50,
initialize: function () {
try {
this.background = new Image();
this.background.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABaCAYAAAAFOiBkAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACnNJREFUeNrsXV1sHFcVPnf+9sdrp3Ucp60QogHRSFFbVdCkrSKhSCBICVASGqdVSVIKUop45Y1H3pEQDzwArdKfUNM2pGkShERDgdQlrQQEKSUgNwgJUWo7tde7O7vzdznnzL27d9drtyDh2Os7yXh25s7cmfvdc77zMzN3xCN7dwBNjYV3wJjcg1/7dvLpLx2GLE0gyyQkSb4EELjMACT+FgL/43qaQSYzcF0X1x0sklQEvDeuUx2AS9riOA7XQfVxWZbwOtXDSyyXWZpXz/sCr9O+tI9Dx+A/R7i4T8Ln9nyPzwW0n+PyMWkS4zYB+VUAnteHQjHg48+cfBLOnXvO0YUfu/U2s+2C9wc79Z08/ePwt76DPe5AHKeIvEx2fuoBqC9W815BAYnjGHsZexKlxg8CiFotxpZ6K8scSLBcotT4fsCSlaUtcP0iS1aK27GvscwDV2TQaCUsEQ4en6QSuw1PgP89T0tTzF1JdZGUkHSRpHm+DzJNIaELQungc6cpS5aH0kqSnOH2JEEp8jw8Fs+d5hLpuR40Qx/8Qgn2fOYAhJH8bdJo7B7fWsFrrMKlS9MaCpYiQap04JFvcCUKGPmJ+/Zhw5sQRS1uLF1co9HAk2RQKATcqDAMoVQq4XqB1aYVxQyelsZWK8Yyn4HEpvGFOk6GdQDUGnjhWI+LDXI9F/dtIUgCz48qIYBBTKIQG4wreM5UqQk1ClhBPAQnBg/LCVZEC+vx8RwBNOp1blmAINKUxC0gBggCl8Fz3AIrSmV4CF7+2VMXEJjdBIxTvAn+ePFCR59OT34PDxYaGHnnzr0QIghXfvIj+Pf58wOpJlvvvx8+OjGBHVuG11/9+Q8RmMcJGBlL+NMfXutWJeqKO+7ei1LShL8efxKiM2dh+8Iio58tM+uytvz1Wf4/J6GZ0vitZ6dnFspQUNnM8y/AP1Citj14EO7dc+DY1CtPUBWP058/v9kNjLxj5+egVqvC1RPPQHTqJdiyWIOmENzAdAVg+gEiV6nne4HR1kT0LPXsytxOba414NqJn8I0rn94/364Z89jxy5OnWmDo4F5++7dX4BqdR7ePvEshJOTUJl9F2ZRMUOZNzKRHXDaS9mRGLmGJEYD4goFBnSWnsjLSvinWHeh9tRxmI4i2H7kMdh1795jr//mLFX1Ta7vX//8u1ysVuFvKCn1Z56G4bkZaCDh1Ylge4BJTel5P2BWARkh/ndghnAuI/Evjo7B8JFH4SMH9iPnDMMvz76Y13d1+i1JTP7a0SNw27vXoIUmr4EFIc4t1VATkBS6Acl6LvZ6SQz0UaUuNVIzlZFdIvtWpt9oGa+Mj8Lu409AUBiG8tBIrkrkfwhVe4K2lADRwIR9gPmg5AuryDPLccxywOjOZclKU3XhLvtEURzlwLDrnuWF1eosLGBLF3Guoa40ZIdPElYfuYRj5BoDRvRTJSGYTD21jVSpgj5QhCsZbbh5C8ToRLp+Af2sVEkMbqCZG+WX8obJbn2VGm3ZfRHyOgKyEkCih1scYZhtMw4SneumjiYHNtBWSWAw5qjAq1wZyV1xnIsGxyznx8AaBQb6qJIJjOYYzTOg/BxqlVQt8SgGiZXE1HG5iMua4pmmanCyAsdcb0CWI+R+HOOpMt3pSZeFEzlVKCy8FANDDlAIkIU5qGKLq8gvZK47HCMVxyw112sWGNGtSh7zjuBtZVyPBPGLyLMht4xjnBdxoCmEo4BB4k2zXDEKlRsYzdTQ034SI9eJxIhlJEarUFGpFUlPyjkl9IxdBQwllSjZQ9MNpSLvWFFqFPXxWZYz02sJmH5m2wQrUKBonqkqVSKnVCrP1KNUg+Pm5Pte2GxzTH0FjlnvEkOgDCkBGFbHxTFapEByzknFSkIliFCkavMQYovrSCA1FRK0OUb2kO864Rg9kw+jOSZRO7m4U8BNv5lVidUpM6ySUAJY3rS5zS++ErN+nu96lRjXkJiykpqyogxtmYiAFTCIWiHPdm3GAm3jBzkk0Nyi1Wke5y2jw+Ch56uxsCGBDQlsSGBDAhsS2JDAhgQ2JLAhgQ0JNkhIQJ4ePdtC05DvaTFirokMYN7vDuRa45h+ZtvtwzFDKiTQB7b9GH0/l831YpWJiEx13XDw2hwjl95XWusSo821yTEFBUikPd8tozkGiEWpkPOtRyYqU+YaopBbLBWBZLLDJ713H7WPKNcYMp27kzmfZAotvp+keIdDAZOI1IHCkBxPZp2WbfYdKOJqRRFvywBiCcfINW6uxVKOaYcEIg8ky+pW7QLkPSyN1rAfo3t9JhjZsOZa97KrXBePfjjqHu1GNtcG+yqJgY4IbWhzLXJznarclEfS4ujHRpuNtjSkRuPTdW6VVIzcLmt3spGPyTnGlBjZoZzK8Ejbzpc2kB+zoNuBWISt1OSYXGLqcZ6PqffkYwZVlZIe4s2PF8qPyTpZq8bCHNRUPmaQyZdMdUxqhDu5Kh+TCwy2M0209y/5gWGdjykp6dChwSCb65IR+lCWgTMNjtCxUsZPEtF0Y6nIB220fAzRh+/noHie24mVHJW1mg+beawEncfNBjmDR1Iz0jZK+YshQvl0nuu4/Oi6dvCaysEb5JxvqmIlcvAKysFjNaIsnspmevQsv75hVEEHTyqEA8PBG8S7BGVFGRWVRaAXOji4VCkYtkq+l+dhhrzufMxGuK9E6jSnVIlf9NAYSJnyqyxsrmt5Pqam8jHhMvkY83nf9XIn0pSYsvZjdIpifFQlwTvZTI9el0kVSiIOQShxoHSEmYfJgVk/967N269S5VoyxTuZQULKt+V73cQzWSftAO3X5UZGxtr8UoaN87TDDHEMvfgFRtohwjCg2Qh5ZXZhlu9E6icdQuNph9TM5K2DDJ6jMniOoUqu8bRDWT3x0FRPO8zO16CCSI2Vi0ujawhKeeWyG/22yij1cQzpWBd+jOgOIsFQN7DRtY2ubXRto2sbXdvo2kbXNrq20bWNrm10baNrG13b6NpG1za6ttG1ja5tdG2jaxtd2+jaRtc2urbRtY2ubXRto+vVi65pxNMoinR8ACX2hLtfFh3U4d5KHEUrkREpvwIZ+Pkr6V6xWII4iuGWffvgHR4gcA7d4gwibFlzQAcIpON8GjIXLfJ7o2PwoQe+jBs9Hh329ItP58C8eeFkcteuL3q3PngQpuMYFief4yElqeVOH3O9nOQsAUasrsT810NKqlETCxOHYNvEwxDg+tSrL18+9ez3b9eW2X/jd6flnbs+C9seehiuYtPCk6dgbLHGUjNQg5CqbaQ+1yplqBya4EFIfc+H30+duYxFO8CIE7neSxd/Ie+65/Ow/eij8BZKy8ypl2DroA5bi6AMPXSIh60NkEqmXvnxZad40w6zbnM8X3HpjXM80PHHDx+FK0kCfxnggY5ZUoIAps6/0CUpt3/yvhyMDT40dnV8a2VT36Gx9fD7X/nq183B1CUNpp6m8UANpk7HE7gOXs/ZM89Xk0ZjU5/B1LtV6fgPvmtuL0RR3FrpuwQF6j3zuwTFD/5dgkL5+n+X4Ne/mrxRN7bnuwQOgP0uwbLTfwQYAIY7xh+Wjkp8AAAAAElFTkSuQmCC'
this.needle = new Image();
this.needle.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsSAAALEgHS3X78AAAG6ElEQVRogd2aXYxdVRXHf+ucc8/QoU6mHWyfNEPVjpYQjSJJB4PEUH3R+kaAQHhQjFJCKCEMOv3I1DTFFBI0ITUmfVKjLz5YTYwfD5Bg+yAhIU0glI+hEm2GMjPF1jsz52v7sNe++9zpnTvn3DkIYSU795x11l57/dfea+119rlijOGjQMEHbUBTFNXvUnsGpX5HWV9kFQ0ApP4g/w+qAcQAAukiJPMgERWdfK3+XukvJmAyiMegtcWPV5Hqz0gyD1degWCIdYCEQA4cVIseK/F6kECxAps/p0DqUX0gEloQQUwfIAHW4E8D31feL4DX9VnRQ7HXPwANmLVM1XYYzIi2w9X6DEbvR/oNsR6/HbgHb+E9yitUplF6P4C4ZXOwdN+L1yg1DSTEev87wK1477tZulWfGRqelSaBCDbAtwMHSjy3tFwuPaAyOQ1uSk0CcboeBcbxaVbwBuf67NGmx29KkUu3nwceKPEF+LO2svf3qWzelA1Nx8gRYBjI8DEwpQ3lZcAmlW2MmgDiAnmvtvJmcAJ4SduJEt+U5BtJxxsF4gI8pju1RsAc8ERJ9pjyIrrTcUwDgb9RIK7/PuAmuuuonwD/xBoeAW8rz1GuffY1YctGOrvZGMfHANhl8gLwjN7neIDP6LPyUprCZ7mBZ2WjQAAex+4LWUnfISDR61u0obxDpbEz7fvDVTpr06BAXAU7Cdxf4gtwCvgT3uvH8LES6rNTdBv9XWC36hzIpkGBuMw0g/dsBLTxHs+BO4CvYGfkDvwSO6SyEX4mXToeqAQeBIh7NbwbX806+hk21QowggeFXo/os5dU1pGrlu9W3bXfk+oCEawHR4Bp5bmBZ4GnSryHgBvwwX6D8pzHn9I+5XfmadWdUTNe6gJx8o8Au+jONEeBd/X6s8D+Hv336zNU9qhe2wwowS6y9x7RGrOWbXWEtZ4qdiEdI43ynwNOlvT9CNiKL1VcabJVnzl9J7VvAMYgEaxc2E97Vp1kKttXA4iASWH53weQaMQeeXTW8mH9LYCvAfdaQ4iA32mLlHevyhSr+kZgMoJ4hOV/HcSk1FldUu3I1IQgOe3Z22mf+ysSGzDO0F+pcYGO/Cw2UxlgGfiSKnkRGFKZ54HbVKYAfol9Fc5AQkwiDO/cw/D1f+uMvQ5VmBEDSE66ELA0O4O0AOPqqQV82iyA+xREogb/HHhF2wnlJSpzH35WjqiuCEyBtGBpdoZ0IbAg1nd2BSBil0/7rfsx2eQq7zwJvKbX2/CZLAbOA8dLsseVF+v9tPZBdTxZGjPHZJO03/pelw2DAzE23SYXt5MuPK6zATZ4zwJPl4QfA3YAqd7/GLiAD/YLykNldmgfR0+rzhAMSAvShSmSi1r+mL4Bsw4QCTAZXH55CmRcA9z1eQJY0vubgR8oyhZwBvg11vstbbHyzui90T43q44lfCkT2LFknMsvT9lh+6fjPsFuApCC9uxNtM/9HYljMO4QIQfexL/ibgNG8YcMc8Alujc7t5mOYgtFJ3sJeAf/graDzmmMCCZJGN55C8PXv9CxqR4QBJMaFs/8HpPu1dho/GBtHcrBhEjrFFt2fxtpuVOZq2gtIPaw+fLZb7EydwqJUr85dcnLql/nrX7nn+VTFbdcTPdvORykwGQthrbv5WM3/oE1DsJ7ADECYkje2cKlf5whiCYwpfJagvJBc/m8qt53gLX6m1yze4cKhIAie5XRL+8m3rbYsbFEa6c1CUfZPHEComU7G8ZmweRdIZ1fQaJPgJku6Xgdm3mqluECPAx8Rm9zTHaU1tjbxNcNYTJTmvACsmuQcBRY7KWsBxBF2hqbpTX2U89X55k8ILlYIBzT/ik2Cx0CfkvfbyAdcjILwG86OkwxRGvLSTZ9MrDTstYEy1XO6pe1hK7gNkAQ0n5zhfZrX0XiZ7VMCYG/AN9QYGsGZHlclcmwh3df1xkJiT9+GyNfeA7MEFc7JO8FAvruI2JAsu5GYmels4MLNsBnSvc5/gR+rVYu/2cszwgSQnJxmmQekMQC7bKh75eliiQ2t2fv3YkEe/CvqMeB03qdVgDhWqp9TmPLk0CdtYel83dig7Jyuq9a/Womm9/Kf148jYQT+IOCP2Jfkvp+i1trfGwReR3wTatTAkz2KiNfnCQeW+iVoXpRxXdjsTv48vl9wARIastrCjWgCXI5NwUmWD7/IPHYkc7Y61m4/oy4UuWNG/nvudME12yGYpA9oyoZCIRi+QrX7pxk+FNn+5UmjirMiNjktDJ3F+HwIsgbEA7wR4NalBEOb2Vl7i42jZ+tEioVYwTBZEMMcLqxAbKnMxKtUCH2qgL50FOdJfJB/AmlspfrAPlQT91H5v9a/wMJbneLG5+XVwAAAABJRU5ErkJggg==';
var ec = document.createElement('canvas');
document.body.appendChild(ec);
ec.width = 70;
ec.height = 90;
ec.style.position = 'absolute';
ec.style.top = '-1px';//35px
ec.style.right = '160px';//ec.style.left = '140px';
ec.style.zIndex = 999999;


this.ctx = ec.getContext('2d');
phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this.displayCompass);
} catch (e) {
console.log("Compass.initialize: ", e);}
},

displayCompass: function () {
try {
var currentCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
var	cityCoordX = currentCity.get_PosX();
var	cityCoordY = currentCity.get_PosY();
var region = ClientLib.Vis.VisMain.GetInstance().get_Region();
var zoom = region.get_ZoomFactor();
var targetCoordX = region.get_ViewWidth() / 2;
var targetCoordY = region.get_ViewHeight() / 2;
var gridW = region.get_GridWidth();
var gridH = region.get_GridHeight();
var viewCoordX = (region.get_PosX() + targetCoordX / zoom - zoom * gridW / 2) / gridW;
var viewCoordY = (region.get_PosY() + targetCoordY / zoom - zoom * gridH / 2) / gridH;
var dx = viewCoordX - cityCoordX;
var dy = cityCoordY - viewCoordY;
var distance = Math.sqrt(dx * dx + dy * dy);
var ctx = this.ctx;
ctx.clearRect(0, 0, 70, 90);
ctx.save();
ctx.globalAlpha = 0.8;
ctx.font = '18px Tahoma';
ctx.fillStyle = '#FCDE7E';
ctx.translate(35, 35);
ctx.drawImage(this.background, -35, -35);
var dtext = Math.round(10 * distance) / 10;
ctx.fillText(dtext, -dtext.toString().length * 9 / 2, 40);
ctx.rotate(dy > 0 ? Math.asin(dx / distance) + Math.PI : -Math.asin(dx / distance));
ctx.drawImage(this.needle, - this.size / 2, - this.size / 2);
ctx.restore();
} catch (e) {
console.log("displayCompass", e);
}
},

 
}
});
}
} catch (e) {
console.log('createCompass: ', e);
}
function CompassCheckLoaded() {
try {
if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
createCompass();
window.Compass.getInstance().initialize();
} else {
window.setTimeout(CompassCheckLoaded, 1000);
}
} catch (e) {
console.log('CompassCheckLoaded: ', e);
}
}
if (/commandandconquer\.com/i.test(document.domain)) {
window.setTimeout(CompassCheckLoaded, 1000);
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
/*******************************************************************************************************************************
*                                                     CCTA Coords 500:500
*********************************************************************************************************************************/
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

/*************************************************************************************************************************************************
*                                                        Maelstorm Tools version     0.1.3.2
***************************************************************************************************************************************************/

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
              this.Data["Repair all defense buildings"] = ["Alle Verteidigungsgebäude reparieren", "Reparar todos os edifícios de defesa", "Réparer tous les bâtiments de défense", "Tüm savunma binalarını onar"][l];
              this.Data["Repair all buildings"] = ["Alle Gebäurde reparieren", "Reparar todos os edifícios", "Réparer tous les bâtiments", "Tüm binaları onar"][l];
              this.Data["Base status overview"] = ["Basisübersicht", "Estado geral da base", "aperçu de l'état de base", "Üs durumu önizlemesi"][l];
              this.Data["Upgrade priority overview"] = ["Upgrade Übersicht", "Prioridade de upgrades", "aperçu des priorités de mise à niveau", "Yükseltme önceliği önizlemesi"][l];
              this.Data["MaelstromTools Preferences"] = ["MaelstromTools Einstellungen", "Preferências de MaelstromTools", "Préférences MaelstromTools", "MaelstromTools Ayarları"][l];
              this.Data["Options"] = ["Einstellungen", "Opções", "Options", "Seçenekler"][l];
              this.Data["Target out of range, no resource calculation possible"] = ["Ziel nicht in Reichweite, kann die plünderbaren Ressourcen nicht berechnen", "Alvo fora do alcance, não é possivel calcular os recursos", "Cible hors de portée, pas de calcul de ressources possible",
			  "Hedef menzil dışında, kaynak hesaplaması olanaksız"][l];
              this.Data["Lootable resources"] = ["Plünderbare Ressourcen", "Recursos roubáveis", "Ressources à piller", "Yağmalanabilir kaynaklar"][l];
              this.Data["per CP"] = ["pro KP", "por PC", "par PC", "KP başına"][l];
              this.Data["2nd run"] = ["2. Angriff", "2º ataque", "2° attaque", "2. saldırı"][l];
              this.Data["3rd run"] = ["3. Angriff", "3º ataque", "3° attaque", "3. saldırı"][l];
              this.Data["Calculating resources..."] = ["Berechne plünderbare Ressourcen...", "A calcular recursos...", "calcul de ressources ...", "Kaynaklar hesaplanıyor..."][l];
              this.Data["Next MCV"] = ["MBF", "MCV", "VCM"][l];
              this.Data["Show time to next MCV"] = ["Zeige Zeit bis zum nächsten MBF", "Mostrar tempo restante até ao próximo MCV", "Afficher l'heure pour le prochain VCM ", "Sırdaki MCV için gereken süreyi göster"][l];
              this.Data["Show lootable resources (restart required)"] = ["Zeige plünderbare Ressourcen (Neustart nötig)", "Mostrar recursos roubáveis (é necessário reiniciar)", "Afficher les ressources fouiller (redémarrage nécessaire)", "Yağmalanabilir kaynakları göster (yeniden başlatma gerekli)"][l];
              this.Data["Use dedicated Main Menu (restart required)"] = ["Verwende extra Hauptmenü (Neustart nötig)", "Usar botão para o Menu Principal (é necessário reiniciar)", "Utiliser dédiée du menu principal (redémarrage nécessaire)", "Ana menü tuşunu kullan (yeniden başlatma gerekli)"][l];
              this.Data["Autocollect packages"] = ["Sammle Pakete automatisch", "Auto recolher pacotes", "paquets autocollecté", "Paketleri otomatik topla"][l];
              this.Data["Autorepair units"] = ["Repariere Einheiten automatisch", "Auto reparar o exército", "unités autoréparé", "Üniteleri otomatik onar"][l];
              this.Data["Autorepair defense (higher prio than buildings)"] = ["Repariere Verteidigung automatisch (höhere Prio als Gebäude)", "Auto reparar defesa (maior prioridade do que os edifícios)", "réparation automatique la défense (priorité plus élevé que les bâtiments) ", "Savunmayı otomatik onar (binalardan daha yüksek öncelikli olarak)"][l];
              this.Data["Autorepair buildings"] = ["Repariere Gebäude automatisch", "Auto reparar edifícios", "bâtiments autoréparé", "Binaları otomatik onar"][l];
              this.Data["Automatic interval in minutes"] = ["Auto-Intervall in Minuten", "Intervalo de tempo automático (em minutos)", "intervalle automatique en quelques minutes", "Otomatik toplama aralığı (dk)"][l];
              this.Data["Apply changes"] = ["Speichern", "Confirmar", "Appliquer changements", "Uygula"][l];
              this.Data["Discard changes"] = ["Abbrechen", "Cancelar", "Annuler changements", "İptal"][l];
              this.Data["Reset to default"] = ["Zurücksetzen", "Definições padrão", "Réinitialiser", "Sıfırla"][l];
              this.Data["Continuous"] = ["Kontinuierlich", "Contínua", "continue", "Sürekli"][l];
              this.Data["Bonus"] = ["Pakete", "Bónus", "Bonus", "Bonus"][l];
              this.Data["POI"] = ["POI", "POI", "POI", "POI"][l];
              this.Data["Total / h"] = ["Gesamt / h", "Total / h", "Total / h", "Toplam / sa."][l];
              this.Data["Repaircharges"] = ["Reparaturzeiten", "Custo de reparação", "frais de réparation", "Onarım maliyeti"][l];
              this.Data["Repairtime"] = ["Max. verfügbar", "Tempo de reparação", "Temps de réparation", "Onarım süresi"][l];
              this.Data["Attacks"] = ["Angriffe", "Ataques", "Attaques", "Saldırılar"][l];
              this.Data[MaelstromTools.Statics.Infantry] = ["Infanterie", "Infantaria", "Infanterie", "Piyade"][l];
              this.Data[MaelstromTools.Statics.Vehicle] = ["Fahrzeuge", "Veículos", "Vehicule", "Motorlu B."][l];
              this.Data[MaelstromTools.Statics.Aircraft] = ["Flugzeuge", "Aeronaves", "Aviation", "Hava A."][l];
              this.Data[MaelstromTools.Statics.Tiberium] = ["Tiberium", "Tibério", "Tiberium", "Tiberium"][l];
              this.Data[MaelstromTools.Statics.Crystal] = ["Kristalle", "Cristal", "Cristal", "Kristal"][l];
              this.Data[MaelstromTools.Statics.Power] = ["Strom", "Potência", "Energie", "Güç"][l];
              this.Data[MaelstromTools.Statics.Dollar] = ["Credits", "Créditos", "Crédit", "Kredi"][l];
              this.Data[MaelstromTools.Statics.Research] = ["Forschung", "Investigação", "Recherche", "Araştırma"][l];
              this.Data["Base"] = ["Basis", "Base", "Base", "Üs"][l];
              this.Data["Defense"] = ["Verteidigung", "Defesa", "Défense", "Savunma"][l];
              this.Data["Army"] = ["Armee", "Exército", "Armée", "Ordu"][l];
              this.Data["Level"] = ["Stufe", "Nível", "Niveau", "Seviye"][l];
              this.Data["Buildings"] = ["Gebäude", "Edifícios", "Bâtiments", "Binalar"][l];
              this.Data["Health"] = ["Leben", "Vida", "Santé", "Sağlık"][l];
              this.Data["Units"] = ["Einheiten", "Unidades", "Unités", "Üniteler"][l];
              this.Data["Hide Mission Tracker"] = ["Missionsfenster ausblenden", "Esconder janela das Missões", "Cacher la fenêtre de mission", "Görev İzleyicisini Gizle"][l];
              this.Data["none"] = ["keine", "nenhum", "aucun", "hiçbiri"][l];
              this.Data["Cooldown"] = ["Cooldown", "Relocalização", "Recharge", "Cooldown"][l];
              this.Data["Protection"] = ["Geschützt bis", "Protecção", "Protection", "Koruma"][l];
              this.Data["Available weapon"] = ["Verfügbare Artillerie", "Apoio disponível", "arme disponible", "Mevcut silah"][l];
              this.Data["Calibrated on"] = ["Kalibriert auf", "Calibrado em", "Calibré sur ", "Kalibreli"][l];
              this.Data["Total resources"] = ["Gesamt", "Total de recursos", "Ressources totales", "Toplam kaynaklar"][l];
              this.Data["Max. storage"] = ["Max. Kapazität", "Armazenamento Máx.", "Max. de stockage", "Maks. Depo"][l];
              this.Data["Storage full!"] = ["Lager voll!", "Armazenamento cheio!", "Stockage plein", "Depo dolu!"][l];
              this.Data["Storage"] = ["Lagerstand", "Armazenamento", "Stockage", "Depo"][l];
              this.Data["display only top buildings"] = ["Nur Top-Gebäude anzeigen", "Mostrar apenas melhores edifícios", "afficher uniquement les bâtiments principaux", "yalnızca en iyi binaları göster"][l];
              this.Data["display only affordable buildings"] = ["Nur einsetzbare Gebäude anzeigen", "Mostrar apenas edíficios acessíveis", "afficher uniquement les bâtiments abordables", "yalnızca satın alınabilir binaları göster"][l];
              this.Data["City"] = ["Stadt", "Base", "Base", "Şehir"][l];
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
              this.Data["Possible attacks from this base (available CP)"] = ["Mögliche Angriffe (verfügbare KP)", "Possible attacks from this base (available CP)","Possible attacks from this base (available CP)", "Bu üsten yapılması mümkün olan saldırılar (mevcut KP)"][l];
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
            timerInterval: 3000,//
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
                Lang.loadData("de"); // Lang.loadData(qx.locale.Manager.getInstance().getLocale());
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
                  appearance: (isNotification ? "button-playarea-mode-frame" : "button-playarea-mode-frame"), //"button-standard-"+factionText), button-playarea-mode-red-frame
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
                  right: 5 + (52 * this.itemsOnDesktopCount[desktopPosition]),//5 + (...
                  //top: this.initialAppointmentBarHeight + 125 + (42 * (desktopPosition - 1))
                  bottom: 134 - (42 * (desktopPosition - 1))//140 - (...
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

                var missionTracker = typeof (qx.core.Init.getApplication().getMissionsBar) === 'function' ? qx.core.Init.getApplication().getMissionsBar() : qx.core.Init.getApplication().getMissionTracker(); //fix for PerforceChangelist>=376877
                if (MT_Preferences.Settings.autoHideMissionTracker) {
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
                //console.log("runAutoCollectTimer ", MT_Preferences.Settings.AutoCollectTimer);
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
                for (var cname in MT_Cache.Cities) {
                  var ncity = MT_Cache.Cities[cname].Object;
                  if (ncity.get_CityBuildingsData().get_HasCollectableBuildings()) {
                    if (MT_Cache.CityCount <= 1) {
                      var buildings = ncity.get_Buildings().d;
                      for (var x in buildings) {
                        var building = buildings[x];
                        if (building.get_ProducesPackages() && building.get_ReadyToCollect()) {
                          ClientLib.Net.CommunicationManager.GetInstance().SendCommand("CollectResource",{cityid:ncity.get_Id(), posX:building.get_CoordX(),posY:building.get_CoordY()}, null, null, true);
                        }
                      }
                    } else {
                      ncity.CollectAllResources();
                    }
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
                      }, 100);
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
					width: 135,
					maxWidth: 135,
                    showMinimize : false,
                    showMaximize : false,
					allowMaximize: false,
                    showClose : true,
                    resizable : false
                  });
                  this.mcvPopup.setLayout(new qx.ui.layout.VBox());
                  this.mcvPopup.addListener("move", function (e) {
                    var base = MaelstromTools.Base.getInstance();
                    var size = qx.core.Init.getApplication().getRoot().getBounds();
                    var value = size.width - e.getData().left;
                    base.mcvPopupX = value < 0 ? 120 : value;
                    value = size.height - e.getData().top;
                    base.mcvPopupY = value < 0 ? 70 : value; //70
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
                    width: 135,
                    textAlign: 'center',
                    marginBottom : 5
                  });
                  this.mcvPopup.add(this.mcvTimerLabel);
                  var serverBar = qx.core.Init.getApplication().getServerBar().getBounds();
				  var size = qx.core.Init.getApplication().getRoot().getBounds();
                  var pos = MaelstromTools.LocalStorage.get("mcvPopup", {
                      x : serverBar.width + 138,
                      y : size.height - 100//70
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
                this.Settings[MaelstromTools.Preferences.AUTOCOLLECTPACKAGES] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTPACKAGES, 1) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOREPAIRUNITS] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOREPAIRUNITS, 1) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOREPAIRBUILDINGS] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOREPAIRBUILDINGS, 1) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOHIDEMISSIONTRACKER, 0) == 1);
                this.Settings[MaelstromTools.Preferences.AUTOCOLLECTTIMER] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.AUTOCOLLECTTIMER, 20);
                this.Settings[MaelstromTools.Preferences.SHOWLOOT] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.SHOWLOOT, 1) == 1);
                this.Settings[MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV] = (MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.SHOWCOSTSFORNEXTMCV, 1) == 1);
                this.Settings[MaelstromTools.Preferences.CHATHISTORYLENGTH] = MaelstromTools.LocalStorage.get(MaelstromTools.Preferences.CHATHISTORYLENGTH, 128);

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
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Infantry];
                    RepLargest = "Infantry";
                  }
                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Vehicle];
                    RepLargest = "Vehicle";
                  }
                  if (this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft] > this.Cache[cname]["RepairTime"]["Largest"]) {
                    this.Cache[cname]["RepairTime"]["Largest"] = this.Cache[cname]["RepairTime"][MaelstromTools.Statics.Aircraft];
                    RepLargest = "Aircraft";
                  }

                  //PossibleAttacks and MaxAttacks fixes
                  var offHealth = ncity.GetOffenseConditionInPercent();
                  if (RepLargest !== '') {
                    this.Cache[cname]["RepairTime"]["LargestDiv"] = this.Cache[cname]["RepairTime"][RepLargest];
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
/*
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

            */
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
                    MaelstromTools.Util.addLabel(this.Widget, 1, colIdx, 'Max. storage', 80, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium + 'Max']), 80, 'right');

                  if (first) {
                    MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Tiberium));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Tiberium]), 60, 'right', null, (cityCache[MaelstromTools.Statics.Tiberium] >= cityCache[MaelstromTools.Statics.Tiberium + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Tiberium] >= (0.75 * cityCache[MaelstromTools.Statics.Tiberium + 'Max']) ? "yellow" : "white")));

                  if (cityCache[MaelstromTools.Statics.Tiberium] < cityCache[MaelstromTools.Statics.Tiberium + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Tiberium + 'Full']), 100, 'right', null, (cityCache[MaelstromTools.Statics.Tiberium] >= (0.75 * cityCache[MaelstromTools.Statics.Tiberium + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 100, 'right', null, "red");
                  }
                  if (first) {
                    MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Crystal));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Crystal]), 60, 'right', null, (cityCache[MaelstromTools.Statics.Crystal] >= cityCache[MaelstromTools.Statics.Crystal + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Crystal] >= (0.75 * cityCache[MaelstromTools.Statics.Crystal + 'Max']) ? "yellow" : "white")));

                  if (cityCache[MaelstromTools.Statics.Crystal] < cityCache[MaelstromTools.Statics.Crystal + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Crystal + 'Full']), 100, 'right', null, (cityCache[MaelstromTools.Statics.Crystal] >= (0.75 * cityCache[MaelstromTools.Statics.Crystal + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 100, 'right', null, "red");
                  }

                  if (first) {
                    MaelstromTools.Util.addImage(this.Widget, 1, colIdx, MaelstromTools.Util.getImage(MaelstromTools.Statics.Power));
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power]), 60, 'right', null, (cityCache[MaelstromTools.Statics.Power] >= cityCache[MaelstromTools.Statics.Power + 'Max'] ? "red" : (cityCache[MaelstromTools.Statics.Power] >= (0.75 * cityCache[MaelstromTools.Statics.Power + 'Max']) ? "yellow" : "white")));

                  if (first) {
                    MaelstromTools.Util.addLabel(this.Widget, 1, colIdx, 'Storage', 80, 'left');
                  }
                  MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(cityCache[MaelstromTools.Statics.Power + 'Max']), 80, 'right');

                  if (cityCache[MaelstromTools.Statics.Power] < cityCache[MaelstromTools.Statics.Power + 'Max']) {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.GetDateTimeString(cityCache[MaelstromTools.Statics.Power + 'Full']), 100, 'right', null, (cityCache[MaelstromTools.Statics.Power] >= (0.75 * cityCache[MaelstromTools.Statics.Power + 'Max']) ? "yellow" : "white"));
                  } else {
                    MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Storage full!", 100, 'right', null, "red");
                  }


                  MaelstromTools.Util.addElement(this.Widget, rowIdx, colIdx++, MaelstromTools.Util.getAccessBaseButton(cityName));
                  rowIdx++;
                  first = false;
                }

                colIdx = 1;
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, "Total resources", 100, 'left', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium + 'Max']), 80, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Tiberium]), 60, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Tiberium] / Totals[MaelstromTools.Statics.Tiberium + 'Max'] * 100) + '%', 100, 'center', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Crystal]), 60, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Crystal] / Totals[MaelstromTools.Statics.Tiberium + 'Max'] * 100) + '%', 100, 'center', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power]), 60, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, MaelstromTools.Wrapper.FormatNumbersCompact(Totals[MaelstromTools.Statics.Power + 'Max']), 80, 'right', 'bold');
                MaelstromTools.Util.addLabel(this.Widget, rowIdx, colIdx++, Math.round(Totals[MaelstromTools.Statics.Power] / Totals[MaelstromTools.Statics.Power + 'Max'] * 100) + '%', 100, 'center', 'bold');
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
                var cityUnits = ncity.get_CityUnitsData();

                //var buildings = MaelstromTools.Wrapper.GetBuildings(cityBuildings);
                var buildings = ncity.get_Buildings().d;
                var defenseUnits = MaelstromTools.Wrapper.GetDefenseUnits(cityUnits);
                //var defenseUnits = MaelstromTools.Wrapper.GetDefenseUnits();

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
                loot["Total"] = loot[MaelstromTools.Statics.Research] + loot[MaelstromTools.Statics.Tiberium] + loot[MaelstromTools.Statics.Crystal] + loot[MaelstromTools.Statics.Dollar];

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
            GetDefenseUnits: function (cityUnits) {
            //GetDefenseUnits: function () {
              if (PerforceChangelist >= 392583) { //endgame patch
                return (cityUnits.get_DefenseUnits() != null ? cityUnits.get_DefenseUnits().d : null);
              } else { //old
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
              }
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
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Tiberium);
                }, this);


                this.createTabPage(ClientLib.Base.EResourceType.Crystal);
                this.createTable(ClientLib.Base.EResourceType.Crystal);
                this.HT_Tables[ClientLib.Base.EResourceType.Crystal].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Crystal);
                }, this);

                this.createTabPage(ClientLib.Base.EResourceType.Power);
                this.createTable(ClientLib.Base.EResourceType.Power);
                this.HT_Tables[ClientLib.Base.EResourceType.Power].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Power);
                }, this);

                this.createTabPage(ClientLib.Base.EResourceType.Gold);
                this.createTable(ClientLib.Base.EResourceType.Gold);
                this.HT_Tables[ClientLib.Base.EResourceType.Gold].addListener("cellClick", function (e) {
                  this.upgradeBuilding(e, ClientLib.Base.EResourceType.Gold);
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
                console.log("HuffyTools.UpgradePriority.init: ", e);
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
                console.log("HuffyTools.UpgradePriority.createTable: ", e);
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
                console.log("HuffyTools.UpgradePriority.createTabPage: ", e);
              }
            },

            TabChanged: function (e) {
              try {
                this[0].HT_SelectedResourceType = this[1];
                this[0].UpgradeCompleted(null, null);
              } catch (e) {
                console.log("HuffyTools.UpgradePriority.TabChanged: ", e);
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
                console.log("HuffyTools.UpgradePriority.upgradeBuilding: ", e);
              }
            },
            UpgradeCompleted: function (context, result) {
              var self = this;
              window.setTimeout(function () {
                self.calc();
              }, 1000);
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
                console.log("HuffyTools.UpgradePriority.updateCache: ", e);
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
                console.log("HuffyTools.UpgradePriority.setWidgetLabels: ", e);
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
                console.log("HuffyTools.getPrioList: ", e);
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
                console.log("HuffyTools.UpgradePriority.collectData: ", e);
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

            for (var k in this) {
              try {
                if (this.hasOwnProperty(k)) {
                  if (this[k] && this[k].basename == "Composite") {
                    var button = new qx.ui.form.Button(Lang.gt("Calibrate support"));
                    button.addListener("execute", function (e) {
                      MaelstromTools.Util.calibrateWholeSupportOnSelectedBase();
                    }, this);

                    this[k].add(button);
                    baseStatusOverview.CityMenuButtons.push(button);
                  }
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
        };

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
  };

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

/****************************************************************************************************************************************+**************************
*2013-03-03: Special thanks to jerbri for fixing this up so it worked again!
*2012-11-25: Special thanks to PythEch for fixing this up so it worked again!
*Creates a "CNCOpt" button when selecting a base in Command & Conquer: Tiberium Alliances. The share button takes you to http://cncopt.com/ and fills in the selected base information so you can analyze or share the base.
*version       1.7.6
****************************************************************************************************************************************************************************************/var scity = null;
var tcity = null;
var tbase = null;
try {
  unsafeWindow.__cncopt_version = "1.7.6";
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
              var server = ClientLib.Data.MainData.GetInstance().get_Server();
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
                          /* update: falls Gegnerbasis eine Spielerbasis ist, wird der link entsprechend 
                          der gegnerischen Fraktion veraendert  | ShadoWx1337 */
                          if ((city.get_CityFaction() < 3) || (city.get_CityFaction() > 6)) {
                                  switch (city.get_CityFaction()) {
                                        case 1:
                                          /* GDI */
                                          link += "G|";
                                          break;
                                        case 2:
                                          /* NOD */
                                          link += "N|";
                                          break;
                                        default:
                                          console.log("cncopt: Unknown faction: " + own_city.get_CityFaction());
                                          link += "E|";
                                          break;
                                  }
                          }
                          else
                                link += "N|";
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

              var offense_unit_list = getOffenseUnits(city);
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
              if (server.get_TechLevelUpgradeFactorBonusAmount() != 1.20) {
                  link += "|newEconomy";
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

/*****************************************************************************************************************************************
 *                       License: CC-BY-NC-SA 3.0 WarChiefs - Tiberium Alliances Sector HUD Version: 13.09.11
 ****************************************************************************************************************************************/
(function () {
	var injectFunction = function () {
		function createClasses() {
			qx.Class.define("SectorHUD", {
				type: "singleton",
				extend: qx.core.Object,
				construct: function () {
					this.SectorText = new qx.ui.basic.Label("").set({
						textColor : "#FFFFFF",
						font : "font_size_11"
					});
					var HUD = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
						decorator : new qx.ui.decoration.Background().set({
							backgroundRepeat : "no-repeat",
							backgroundImage : "webfrontend/ui/menues/notifications/bgr_ticker_container.png",
							backgroundPositionX : "center"
						}),
						padding : 2,
						opacity: 0.8
					});
					HUD.add(this.SectorText);
					HUD.addListener("click", function (e) {
						if (e.getButton() == "left") this.paste_Coords();
						if (e.getButton() == "right") this.jump_Coords();
					}, this);
					qx.core.Init.getApplication().getDesktop().add(HUD, {left: 128, top: 0});
					phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance().get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this._update);
				},
				destruct: function () {},
				members: {
					SectorText: null,
					get_SectorText: function (i) {
						var qxApp = qx.core.Init.getApplication();
						switch (i) {
						case 0:
							return qxApp.tr("tnf:south abbr");
						case 1:
							return qxApp.tr("tnf:southwest abbr");
						case 2:
							return qxApp.tr("tnf:west abbr");
						case 3:
							return qxApp.tr("tnf:northwest abbr");
						case 4:
							return qxApp.tr("tnf:north abbr");
						case 5:
							return qxApp.tr("tnf:northeast abbr");
						case 6:
							return qxApp.tr("tnf:east abbr");
						case 7:
							return qxApp.tr("tnf:southeast abbr");
						}
					},
					get_SectorNo: function (x, y) {
						var WorldX2 = Math.floor(ClientLib.Data.MainData.GetInstance().get_Server().get_WorldWidth() / 2);
						var WorldY2 = Math.floor(ClientLib.Data.MainData.GetInstance().get_Server().get_WorldHeight() / 2);
						var SectorCount = ClientLib.Data.MainData.GetInstance().get_Server().get_SectorCount();
						var WorldCX = (WorldX2 - x);
						var WorldCY = (y - WorldY2);
						var WorldCa = ((Math.atan2(WorldCX, WorldCY) * SectorCount) / 6.2831853071795862);
						WorldCa += (SectorCount + 0.5);
						return (Math.floor(WorldCa) % SectorCount);
					},
					get_Coords: function () {
						var Region = ClientLib.Vis.VisMain.GetInstance().get_Region();
						var GridWidth = Region.get_GridWidth();
						var GridHeight = Region.get_GridHeight();
						var RegionPosX = Region.get_PosX();
						var RegionPosY = Region.get_PosY();
						var ViewWidth = Region.get_ViewWidth();
						var ViewHeight = Region.get_ViewHeight();
						var ZoomFactor = Region.get_ZoomFactor();
						var ViewCoordX = Math.floor((RegionPosX + ViewWidth / 2 / ZoomFactor) / GridWidth - 0.5);
						var ViewCoordY = Math.floor((RegionPosY + ViewHeight / 2 / ZoomFactor) / GridHeight - 0.5);
						return {X: ViewCoordX, Y: ViewCoordY};
					},
					paste_Coords: function(){
						var Coords = this.get_Coords();
						var input = qx.core.Init.getApplication().getChat().getChatWidget().getEditable();
						var inputDOM = input.getContentElement().getDomElement();
						var text = [];
						text.push(inputDOM.value.substring(0, inputDOM.selectionStart));
						text.push("[coords]" + Coords.X + ':' + Coords.Y + "[/coords]");
						text.push(inputDOM.value.substring(inputDOM.selectionEnd, inputDOM.value.length));
						input.setValue(text.join(' '));
					},
					jump_Coords: function(){
						var coords = prompt("Jump to Coords:");
						if (coords) {
							var xy = coords.replace(/(\[coords\])?([#])?(\d{1,4})\D(\d{1,4})(\D\w+)?(\[\/coords\])?/gi, function () {
								if (arguments.length >= 5) {
									ClientLib.Vis.VisMain.GetInstance().get_Region().CenterGridPosition(parseInt(arguments[3], 10), parseInt(arguments[4], 10));
								}
							});
						}
					},
					_update: function () {
						var Coords = this.get_Coords();
						this.SectorText.setValue(Coords.X + ":" + Coords.Y + " [" + this.get_SectorText(this.get_SectorNo(Coords.X, Coords.Y)) + "]");
					}
				}
			});
		}
		function waitForGame() {
			try {
				if (typeof qx !== "undefined" && typeof qx.core !== "undefined" && typeof qx.core.Init !== "undefined" && typeof ClientLib !== "undefined" && typeof phe !== "undefined") {
					var app = qx.core.Init.getApplication();
					if (app.initDone == true) {
						try {
							console.log("WarChiefs - Sector HUD: Loading");
							createClasses();
							SectorHUD.getInstance();
							console.log("WarChiefs - Sector HUD: Loaded");
						} catch (e) {
							console.log("WarChiefs - Sector HUD: initialization error:");
							console.log(e);
						}
					} else
						window.setTimeout(waitForGame, 1000);
				} else {
					window.setTimeout(waitForGame, 1000);
				}
			} catch (e) {
				console.log(e);
			}
		}
		window.setTimeout(waitForGame, 1000);
	};
	var script = document.createElement("script");
	var txt = injectFunction.toString();
	script.innerHTML = "(" + txt + ")();";
	script.type = "text/javascript";
	document.getElementsByTagName("head")[0].appendChild(script);
})();

/********************************************************************************************
                                              Formation Saver
***********************************************************************************************/
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
            buttonSave.set({width: 50, appearance: "button-text-small", toolTipText: "Speichern der Angriffsformation", allowGrowX:false});
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
Available Loot + Summary, version 1.8.3
*******************************************/
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
            console.log('Create MHTools.Loot');
            this.stats.src = 'http://goo.gl/m9I3B';//1.8.0
            //this.base(arguments);
            for(var k in this.resPaths) {
              this.resImages.push(new qx.ui.basic.Image("webfrontend/ui/common/"+this.resPaths[k]).set({Scale:true,Width:16,Height:16}));
            }
            for(var k in this.troopPaths) {
              this.troopImages.push(new qx.ui.basic.Image("https://eaassets-a.akamaihd.net/cncalliancesgame/cdn/data/"+this.troopPaths[k]).set({Scale:true,Width:16,Height:16}));
            }
            //this.reloadList();
            this.lootList.reloadList();
            //console.log(this.lootList);
            // extend
            this.extendOwnBase();   
            this.extendAllianceBase();
            this.extendForgottenCamp();
            this.extendForgottenBase();
            this.extendPlayerBase();
            //this.extendOptionsWindow();
            this.extendPOI();
            this.extendHUB();
            this.extendHUBServer();
            this.extendRUIN();
            this.extendSelectionChange();
            this.addLootPage();
            //bypass
            this.loadBypass();
            //rdy
            console.log('MHTools: Loot+Info loaded.'); 
          },
          statics : {
            VERSION: '1.8.3',
            AUTHOR: 'MrHIDEn',
            CLASS: 'Loot',
            DATA: this.Data
          },
          properties: {
          },
          members : {
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
            //UNDERCONSTRUCTION
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
                var l;
                if (S.get_IsSupported()) l = S.GetItem(this.storeName);
                if(l!==null) this.list = l;
                console.log('MHTools: LootList reloaded/created');
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
                      // JSON
                      if (S.get_IsSupported()) S.SetItem(this.storeName, this.list);
                      // done
                      return;
                    }
                  }
                  // new
                  l[this.list.idx] = c;
                  if(++this.list.idx >= this.list.max) this.list.idx = 0;
                  // JSON
                  if (S.get_IsSupported()) S.SetItem(this.storeName, this.list);   
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
                console.log('this.lootList.restore');
                try {
                  var mem = this.load().Data;
                  if(typeof(mem[k])=='undefined') return 'undefined';
                  return mem[k];    
                } catch (e) {
                  console.warn("restore: ", e);
                }
              }              
            },
            // store   
            /*         
            // list: [],
            // listStoreName: 'MHToolsLootList',
            // reloadList: function() {
              // var S = ClientLib.Base.LocalStorage;
              // var l;
              // if (S.get_IsSupported()) l = S.GetItem(this.listStoreName);
              // if(l!==null) this.list = l;
              // this.list.max = 50;
              // this.list.idx = 0;
              // for(var i=0;i<this.list.max;i++) {
                // this.list.idx = i;
                // if(typeof(this.list[i])=='undefined') break;
              // }
              // console.log('MHTools: LootList reloaded/created');
            // },
            // getIndex: function() {
              // var l = this.list;
              // var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
              // //console.log('getIndex id=',id);
              // for(i=0;i<this.list.max;i++) {
                // if(typeof(l[i])=='undefined') continue;
                // if(l[i]===null) continue;
                // if(l[i].id == id) return i;
              // }
              // return -1;
            // },
            // save: function(d) {
            // //TODO some problems with refreshing
              // try {
                // var l = this.list;
                // var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                // var c = {id:id, Data:d};
                // var S = ClientLib.Base.LocalStorage;
                // for(var i=0;i<l.max;i++) {
                  // if(typeof(l[i])=='undefined') continue;
                  // if(l[i]===null) continue;
                  // if(l[i].id == id) 
                  // {
                    // // found
                    // l[i] = c;
                    // // JSON
                    // if (S.get_IsSupported()) S.SetItem(this.listStoreName, l);
                    // // done
                    // return;
                  // }
                // }
                // // new
                // l[l.idx] = c;
                // if(++l.idx >= l.max) l.idx = 0;
                // // JSON
                // if (S.get_IsSupported()) S.SetItem(this.listStoreName, l);   
              // } catch (e) {
                // console.warn("save: ", e);
              // }
            // },
            // load: function() {
              // try {
                // var l = this.list;
                // var id = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
                // for(var i=0;i<l.max;i++) {
                  // if(typeof(l[i])=='undefined') continue;
                  // if(l[i]===null) continue;
                  // if(l[i].id == id) return l[i];
                // }
                // return {id:id,Data:{}};     
              // } catch (e) {
                // console.warn("load: ", e);
              // }
            // },
            // store: function(k, d) {
              // try {
                // var mem = this.load().Data;
                // mem[k] = d;
                // this.save(mem);        
              // } catch (e) {
                // console.warn("store: ", e);
              // }
            // },
            // restore: function(k) {//?? not in use
              // try {
                // var mem = this.load().Data;
                // if(typeof(mem[k])=='undefined') return 'undefined';
                // return mem[k];    
              // } catch (e) {
                // console.warn("restore: ", e);
              // }
            // },
            */
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
                    //ClientLib.Data.CityBuildings.prototype.kBuildings = d.Keys.Buildings;
                    //ClientLib.Data.CityBuildings.prototype.get_Buildings = function(){return this[this.kBuildings];};
                    ClientLib.Data.City.prototype.kBuildings = d.Keys.Buildings;
                    ClientLib.Data.City.prototype.get_Buildings = function(){return this.get_CityBuildingsData()[this.kBuildings];};
                  }
                  if(typeof(d.Keys.Offences)!='undefined') {
                    //ClientLib.Data.CityUnits.prototype.kOffenseUnits = d.Keys.Offences;
                    //ClientLib.Data.CityUnits.prototype.get_OffenseUnits = function(){return this[this.kOffenseUnits];};
                    ClientLib.Data.City.prototype.kOffenseUnits = d.Keys.Offences;
                    ClientLib.Data.City.prototype.get_OffenseUnits = function(){return this.get_CityUnitsData()[this.kOffenseUnits];};
                  }
                  if(typeof(d.Keys.Defences)!='undefined') {
                    //ClientLib.Data.CityUnits.prototype.kDefenseUnits = d.Keys.Defences;
                    //ClientLib.Data.CityUnits.prototype.get_DefenseUnits = function(){return this[this.kDefenseUnits];};
                    ClientLib.Data.City.prototype.kDefenseUnits = d.Keys.Defences;
                    ClientLib.Data.City.prototype.get_DefenseUnits = function(){return this.get_CityUnitsData()[this.kDefenseUnits];};
                  }
                }
                if(typeof(d.Keys)=='undefined') d.Keys={};
                getKeys(c.get_CityBuildingsData(), d);
                getKeys(c.get_CityUnitsData(), d);
                var cnt=Object.keys(d.Keys).length;
                if(cnt==3) {
                  //console.log('MHTools.Loot Helpers are ready');
                  //console.log('MHTools.Loot Helpers are ready:',d.Keys.Buildings,d.Keys.Defences,d.Keys.Offences);
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
                  
                  //TEST
                  //console.log('loadBase.el:',d.el);
                  //console.log('loadBase.ol:',d.ol);
                  
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
                  var current_hp = unit.get_Health();//EA API
                  troops[0] += current_hp;
                  if (this.settings.showTroopsExtra.v) {
                    switch (unit.get_UnitGameData_Obj().mt) {//keyTroop // TODO check .mt
                      case ClientLib.Base.EUnitMovementType.Feet:
                        troops[1] += current_hp;
                        break;
                      case ClientLib.Base.EUnitMovementType.Track:
                      case ClientLib.Base.EUnitMovementType.Wheel:
                        troops[2] += current_hp;
                        break;
                      case ClientLib.Base.EUnitMovementType.Structure:
                        troops[3] += current_hp;
                        break;
                      case ClientLib.Base.EUnitMovementType.Air:
                      case ClientLib.Base.EUnitMovementType.Air2:
                        troops[4] += current_hp;
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
                  //CHECK
                  //my
                  //for (var k in ol.Offences.d) ohp += ol.Offences.d[k].get_HitpointsPercent();//0-1 means 0-100%
                  //ohp = 100.0 * ohp / ol.Offences.c;
                  //console.log('Health',ohp,oc.GetOffenseConditionInPercent());
                  //ohp = this.numberFormat(ohp, 0);
                  //ea
                  ohp = oc.GetOffenseConditionInPercent();
                  
                  var ool = this.numberFormat(oc.get_LvlOffense(), 1);
                  //console.log('oc',oc,'oc.get_LvlOffense()',oc.get_LvlOffense());
                  
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
              
              if(!this.settings.showDistance.v) return;
              //console.log('calcDistance');              
              try {                
                var visObject = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
                if (visObject != null)// && visObject.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.RegionCityType)
                {
                  //if (this.Data === null) this.Data = {};
                  var t = visObject.get_VisObjectType();
                  
                  var LObjectType = [];
                  for(k in ClientLib.Vis.VisObject.EObjectType) 
                    LObjectType[ClientLib.Vis.VisObject.EObjectType[k]] = k;
                  //console.log('Vis Object Type:',t,', ',LObjectType[t]);                  

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
                      //var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                      //var pixelX = visObject.get_X();
                      //var pixelY = visObject.get_Y();
                      var ser = ClientLib.Data.MainData.GetInstance().get_Server();
                      var ecX = visObject.get_RawX();
                      var ecY = visObject.get_RawY();
                      var ocX = oc.get_X();
                      var ocY = oc.get_Y();          
                      var cenX = ser.get_ContinentWidth() / 2;
                      var cenY = ser.get_ContinentHeight() / 2;                      

                      var dis = ClientLib.Base.Util.CalculateDistance(ocX, ocY, ecX, ecY);
                      var cen = ClientLib.Base.Util.CalculateDistance(cenX, cenY, ecX, ecY);
                      var cdt = oc.GetCityMoveCooldownTime(ecX,ecY);//cool down time
                      var stp = dis / 20;//steps
                      this.Data.Distance = dis;
                      //console.log('Distance:',dis,'EMT:',this.dhms2(cdt),'Steps:',stp);
                      hp = {};
                      hp.name = '<b>Movement</b>';
                      hp.lbs = ['Distance:','EMT:','Steps:','To center:'];
                      t = [];
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
              try {
                //
                //TODO I rather move this to calcDistance and call it from extended widgets.
                //
                
                //ClientLib.Vis.SelectionChange
                //console.clear();
                //console.log('onSelectionChange, curr:',curr);
                var visObject = ClientLib.Vis.VisMain.GetInstance().get_SelectedObject();
                if (visObject != null) {
                  var t = visObject.get_VisObjectType();
                  //ClientLib.Vis.VisObject.EObjectType
                  var LObjectType = [];
                  for(k in ClientLib.Vis.VisObject.EObjectType) 
                    LObjectType[ClientLib.Vis.VisObject.EObjectType[k]] = k;
                  console.log('Vis Object Type:',t,', ',LObjectType[t]);
                  //window.MHTools.visObject = visObject;
                  this.Data.visObject = visObject;
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
                    // case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                    // case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                    // case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                    // case ClientLib.Vis.VisObject.EObjectType.RegionPointOfInterest:
                    // case ClientLib.Vis.VisObject.EObjectType.RegionRuin:
                      // this.calcDistance();
                      // break;
                    // TEST
                    case ClientLib.Vis.VisObject.EObjectType.RegionHub:
                      //console.log('Vis Object Type:',t,', ',LObjectType[t],visObject);
                      //console.log(visObject.get_BuildingName());
                      //window.visObject = visObject;                    
                      break;                      
                    // // TEST
                    // case ClientLib.Vis.VisObject.EObjectType.DefenseUnitType:
                      // console.log('Vis Object Type:',t,', ',LObjectType[t],visObject);
                      // console.log(visObject.get_BuildingName());
                      // window.visObject = visObject;                    
                      // break;
                    // // TEST
                    // case ClientLib.Vis.VisObject.EObjectType.CityBuildingType:
                      // console.log('Vis Object Type:',t,', ',LObjectType[t],visObject);
                      // console.log(visObject.get_BuildingName());
                      // window.visObject = visObject;
                      // break;
                    default:
                      break;
                  }
                }
              } catch (e) {
                console.warn('MHTools.Loot.onSelectionChange: ', e);
              }
            },
            extendSelectionChange: function() {
              return;//disabled
              //webfrontend.Util.attachNetEvent(/*instance of object which calls the event*/, /*name of the event*/, /*type of the event*/, /*context object*/, /*callback function*/);
              webfrontend.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "SelectionChange", ClientLib.Vis.SelectionChange, this, this.onSelectionChange);
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
                widget.removeAll();
                var r=0, c=0;
                var a;
                      
                // DISTANCE
                //console.log('DISTANCE');
                a = this.Display.distanceArray;
                if(typeof(a)!='undefined' && a.length>0) { 
                  for(var i in this.Display.distanceArray) {              
                    c=0;
                    widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 230, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.distanceArray[i].lbs) {
                      widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
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
                  widget.add(new qx.ui.basic.Label('Transmission ' + w).set({rich: true}), {row: r++,column: c, colSpan: 6});//, allowGrowX: true, colSpan: 6
                // } else {
                  // c=0;
                  // widget.add(new qx.ui.basic.Label('<span style="color:yellow">Base is out of range.</span>').set({width: 230, rich: true, allowGrowX: true}), {row: r++,column: c, colSpan: 6});//, allowGrowX: true
                // } 
              } catch (e) {
                console.warn('MHTools.Loot.addLoadingLabel: ', e);
              }
            }, 
            addResourcesLabel: function(widget) {
              //console.log('addResourcesLabel');
              try {
                widget.removeAll();
                var r=0, c=0;                
                var hp;
                var a;                
                
                // DISTANCE
                a = this.Display.distanceArray;
                if(typeof(a)!='undefined' && a.length>0) { 
                  for(var i in this.Display.distanceArray) {              
                    c=0;
                    widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true, allowGrowX: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.distanceArray[i].lbs) {
                      widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
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
                    widget.add(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                    //console.log('A) i',i);   
                    for(var j in hp.val) {
                      //console.log('B) i',i,'j',j);
                      widget.add(hp.img[j], {row: r, column: c++}); 
                      widget.add(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
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
                    widget.add(new qx.ui.basic.Label(hp.name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});  
                    widget.add(new qx.ui.basic.Label(this.kMG(hp.val[0])).set({textAlign:'left'}), {row: r, column: c++});  
                    //console.log('A) i',i);
                    c=2;
                    for(var j=1;j<hp.val.length;j++) {
                      //console.log('B) i',i,'j',j);
                      widget.add(hp.img[j-1], {row: r,column: c++}); 
                      widget.add(new qx.ui.basic.Label(this.kMG(hp.val[j])).set({textAlign:'left'}), {row: r, column: c++});
                    }
                    r++;
                  }
                }
                
                // INFO
                a = this.Display.infoArrays;
                if(typeof(a)!='undefined' && a.length>0) { 
                  for(var i in this.Display.infoArrays) {              
                    c=0;
                    widget.add(new qx.ui.basic.Label(this.Display.infoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.infoArrays[i].lbs) {
                      widget.add(new qx.ui.basic.Label(this.Display.infoArrays[i].lbs[j]+' '+this.Display.infoArrays[i].val[j]), {row: r, column: c});
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
                    widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6});    
                    c=1;
                    for(var j in this.Display.twoLineInfoArrays[i].lbs) {
                      widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                      widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;                
                  }
                }
                
              } catch (e) {
                console.warn('MHTools.Loot.addResourcesLabel(): ', e);
              }
            },       
            addFriendlyLabel: function(widget) {
              //console.log('addFriendlyLabel');
              try {              
                widget.removeAll();
                var a;
                var r=0, c=0;
                
                // DISTANCE
                a = this.Display.distanceArray;
                if(typeof(a)!='undefined' && a.length>0) {    
                  for(var i in this.Display.distanceArray) {              
                    c=0;
                    widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.distanceArray[i].lbs) {
                      widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].lbs[j]), {row: r, column: c});                     
                      widget.add(new qx.ui.basic.Label(this.Display.distanceArray[i].val[j]), {row: r+1, column: c});
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
                    widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].name).set({width: 200, rich: true}), { row: r++, column: c, colSpan: 6}); 
                    c=1;
                    for(var j in this.Display.twoLineInfoArrays[i].lbs) {
                      widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].lbs[j]), {row: r, column: c});                     
                      widget.add(new qx.ui.basic.Label(this.Display.twoLineInfoArrays[i].val[j]), {row: r+1, column: c});
                      c+=2;
                    }
                    r+=2;                
                  }
                }

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
            extendOwnBase: function() {// BASE - Own
              var self = this;
              if (!webfrontend.gui.region.RegionCityStatusInfoOwn.prototype.__mhloot_showLootOwnBase) {
                webfrontend.gui.region.RegionCityStatusInfoOwn.prototype.__mhloot_showLootOwnBase = webfrontend.gui.region.RegionCityStatusInfoOwn.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionCityStatusInfoOwn.prototype.onCitiesChange = function () {
                try {            
                  if (!self.lootWindowOwn) {
                    self.lootWindowOwn = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowOwn.setTextColor('yellow');//yellow white            

                    var w = webfrontend.gui.region.RegionCityStatusInfoOwn.getInstance();              
                    w.add(self.lootWindowOwn);
                  }
                  //clear                  
                  self.Display.distanceArray = [];
                  if(self.loadBase()) {           
                    self.calcFriendlyInfo();
                    self.addFriendlyLabel(self.lootWindowOwn);
                  } else {
                    self.addLoadingLabel(self.lootWindowOwn);
                  }
                } catch (e) {
                  console.warn("MHTool.Loot.RegionCityStatusInfoOwn: ", e);
                }              
                this.__mhloot_showLootOwnBase();// run base function
              }
            },
            extendAllianceBase: function() {// BASE - Alliance
              var self = this;
              if (!webfrontend.gui.region.RegionCityStatusInfoAlliance.prototype.__mhloot_showLootAllianceBase) {
                webfrontend.gui.region.RegionCityStatusInfoAlliance.prototype.__mhloot_showLootAllianceBase = webfrontend.gui.region.RegionCityStatusInfoAlliance.prototype.onCitiesChange;
              }// ^inject
              webfrontend.gui.region.RegionCityStatusInfoAlliance.prototype.onCitiesChange = function () {
                //console.log('RegionCityStatusInfoAlliance:');
                try {  
        //todo wrap in function        
                  if (!self.lootWindowAlly) {
                    self.lootWindowAlly = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowAlly.setTextColor('yellow');//yellow             

                    var w = webfrontend.gui.region.RegionCityStatusInfoAlliance.getInstance();              
                    w.add(self.lootWindowAlly);
                  }           
                  self.calcDistance();
                  if(self.loadBase()) {           
                    self.calcFriendlyInfo();
                    self.calcDistance();
                    self.addFriendlyLabel(self.lootWindowAlly);
                  } else {
                    self.addLoadingLabel(self.lootWindowAlly);
                  }
                } catch (e) {
                  console.warn("MHTools.Loot.RegionCityStatusInfoAlliance: ", e);
                }              
                this.__mhloot_showLootAllianceBase();
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
            extendPlayerBase: function() {// BASE - PvP
              var self = this; 
              if (!webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__mhloot_showLootPlayerBase) {
                webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.__mhloot_showLootPlayerBase = webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionCityStatusInfoEnemy.prototype.onCitiesChange = function () {
                //console.log('RegionCityStatusInfoEnemy:');
                try {
                  if (!self.lootWindowPlayer) {
                    self.lootWindowPlayer = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowPlayer.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionCityStatusInfoEnemy.getInstance();
                    widget.add(self.lootWindowPlayer);
                  }
                  self.calcDistance();
                  if (self.loadBase()) {  
                    self.calcResources();
                    self.calcTroops();
                    self.calcInfo(); 
                    self.addResourcesLabel(self.lootWindowPlayer);
                  } else {           
                    if(self.restoreDisplay()) {
                      self.addResourcesLabel(self.lootWindowPlayer);
                    } else {          
                      self.addLoadingLabel(self.lootWindowPlayer);
                    }      
                  }
                } catch (e) {
                  console.warn("MHTool.Loot.RegionCityStatusInfoEnemy: ", e);
                }

                this.__mhloot_showLootPlayerBase();
              }
            },            
            extendPOI: function() {// POI
              var self = this; 
              if (!webfrontend.gui.region.RegionPointOfInterestStatusInfo.prototype.__mhloot_showLootPOI) {
                webfrontend.gui.region.RegionPointOfInterestStatusInfo.prototype.__mhloot_showLootPOI = webfrontend.gui.region.RegionPointOfInterestStatusInfo.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionPointOfInterestStatusInfo.prototype.onCitiesChange = function () {
                //console.log('RegionPointOfInterestStatusInfo:');
                try {
                  if (!self.lootWindowPOI) {
                    self.lootWindowPOI = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowPOI.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionPointOfInterestStatusInfo.getInstance();
                    widget.add(self.lootWindowPOI);
                  }
                  //clear
                  self.Display.lootArray = [];
                  self.Display.troopsArray = [];
                  self.Display.infoArrays = [];
                  self.Display.twoLineInfoArrays = [];
                  self.calcDistance();
                  self.addResourcesLabel(self.lootWindowPOI);
                } catch (e) {
                  console.warn("MHTool.Loot.RegionPointOfInterestStatusInfo: ", e);
                }
                this.__mhloot_showLootPOI();
              }
            },
            extendHUB: function() {// HUB
              var self = this; 
              if (!webfrontend.gui.region.RegionHubStatusInfo.prototype.__mhloot_showLootHUB) {
                webfrontend.gui.region.RegionHubStatusInfo.prototype.__mhloot_showLootHUB = webfrontend.gui.region.RegionHubStatusInfo.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionHubStatusInfo.prototype.onCitiesChange = function () {
                console.log('RegionHubStatusInfo:');
                try {
                  if (!self.lootWindowHUB) {
                    self.lootWindowHUB = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowHUB.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionHubStatusInfo.getInstance();
                    widget.add(self.lootWindowHUB);
                  }
                  //clear
                  self.Display.lootArray = [];
                  self.Display.troopsArray = [];
                  self.Display.infoArrays = [];
                  self.Display.twoLineInfoArrays = [];
                  self.calcDistance();
                  self.addResourcesLabel(self.lootWindowHUB);
                } catch (e) {
                  console.warn("MHTool.Loot.RegionHubStatusInfo: ", e);
                }
                this.__mhloot_showLootHUB();
              }
            },
            extendHUBServer: function() {
              var self = this; 
              if (!webfrontend.gui.region.RegionHubServerStatusInfo.prototype.__mhloot_showLootHUB) {
                webfrontend.gui.region.RegionHubServerStatusInfo.prototype.__mhloot_showLootHUB = webfrontend.gui.region.RegionHubServerStatusInfo.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionHubServerStatusInfo.prototype.onCitiesChange = function () {
                console.log('RegionHubServerStatusInfo:');
                try {
                  if (!self.lootWindowHUBServer) {
                    self.lootWindowHUBServer = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowHUBServer.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionHubServerStatusInfo.getInstance();
                    widget.add(self.lootWindowHUBServer);
                  }
                  //clear
                  self.Display.lootArray = [];
                  self.Display.troopsArray = [];
                  self.Display.infoArrays = [];
                  self.Display.twoLineInfoArrays = [];
                  self.calcDistance();
                  self.addResourcesLabel(self.lootWindowHUBServer);
                } catch (e) {
                  console.warn("MHTool.Loot.RegionHubStatusInfo: ", e);
                }
                this.__mhloot_showLootHUB();
              }
            },
            extendRUIN: function() {// RUIN
              var self = this; 
              if (!webfrontend.gui.region.RegionRuinStatusInfo.prototype.__mhloot_showLootRUIN) {
                webfrontend.gui.region.RegionRuinStatusInfo.prototype.__mhloot_showLootRUIN = webfrontend.gui.region.RegionRuinStatusInfo.prototype.onCitiesChange;
              }
              webfrontend.gui.region.RegionRuinStatusInfo.prototype.onCitiesChange = function () {
                //console.log('RegionRuinStatusInfo:');
                try {
                  if (!self.lootWindowRUIN) {
                    self.lootWindowRUIN = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 5));
                    self.lootWindowRUIN.setTextColor('white');

                    var widget = webfrontend.gui.region.RegionRuinStatusInfo.getInstance();
                    widget.add(self.lootWindowRUIN);
                  }
                  //clear
                  self.Display.lootArray = [];
                  self.Display.troopsArray = [];
                  self.Display.infoArrays = [];
                  self.Display.twoLineInfoArrays = [];
                  self.calcDistance();
                  self.addResourcesLabel(self.lootWindowRUIN);
                } catch (e) {
                  console.warn("MHTool.Loot.RegionRuinStatusInfo: ", e);
                }
                this.__mhloot_showLootRUIN();
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

/********************************************************************************
* name        C&C:Tiberium Alliances Coords Button
* namespace   CNCTACoordsButton 1.0.1
* description Copy & Paste selected base's coords to chat message
* version     1.0.1
***********************************************************************************/
(function () {
  var CNCTACoordsButton_main = function () {
    try {
      function createCoordsButton() {
        console.log('C&C:Tiberium Alliances Coords Button loaded.');

        /*
        $a = qx.core.Init.getApplication(); // Application
        $c = $a.getChat(); // ChatWindow
        $w = $c.getChatWidget(); // ChatWidget
        $i = $cw.getEditable(); // Input
        $d = $i.getContentElement().getDomElement(); // Input DOM Element
        */

        var coordsButton = {
          selectedBase: null,
          pasteCoords: function(){
            var $i = qx.core.Init.getApplication().getChat().getChatWidget().getEditable(); // Input
            var $d = $i.getContentElement().getDomElement(); // Input DOM Element

            var result = new Array();
            result.push($d.value.substring(0,$d.selectionStart)); // start

            result.push('[coords]' + coordsButton.selectedBase.get_RawX() + ':' + coordsButton.selectedBase.get_RawY() + '[/coords]');

            result.push($d.value.substring($d.selectionEnd, $d.value.length)); // end

            $i.setValue(result.join(' '));
          }
        };

        if (!webfrontend.gui.region.RegionCityMenu.prototype.__coordsButton_showMenu) {
          webfrontend.gui.region.RegionCityMenu.prototype.__coordsButton_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
        
          webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selectedVisObject) {
            coordsButton.selectedBase = selectedVisObject;
            if (this.__coordsButton_initialized != 1) {
              this.__coordsButton_initialized = 1;
              for(i in this) {
                if(this[i] && this[i].basename == "Composite") {
                  var button = new qx.ui.form.Button("Koordinaten -> ");
                  button.addListener("execute", function () {
                    coordsButton.pasteCoords();
                  });             
                  this[i].add(button);
                }
              }
            }
            this.__coordsButton_showMenu(selectedVisObject);
          }
        }
      }    
    } catch (e) {
      console.log("createCoordsButton: ", e);
    }

    function CNCTACoordsButton_checkIfLoaded() {
      try {
        if (typeof qx !== 'undefined') {
          createCoordsButton();
        } else {
          window.setTimeout(CNCTACoordsButton_checkIfLoaded, 1000);
        }
      } catch (e) {
        console.log("CNCTACoordsButton_checkIfLoaded: ", e);
      }
    }
  window.setTimeout(CNCTACoordsButton_checkIfLoaded, 1000);
  };
  try {
    var CNCTACoordsButton = document.createElement("script");
    CNCTACoordsButton.innerHTML = "(" + CNCTACoordsButton_main.toString() + ")();";
    CNCTACoordsButton.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(CNCTACoordsButton);
  } catch (e) {
    console.log("CNCTACoordsButton: init error: ", e);
  }
})();

/*******************************************
Combat Simulator
*******************************************/
//(function(){
//	var injectFunction = function() 
//	{
//		function createClasses()
//		{
//			//This is the setup for a class. 
//			/*qx.Class.define("EXAMPLE", 
//			{
//				type: "singleton",
//				extend: qx.core.Object,
//            
//				construct: function()
//				{
//				},
//				
//				destruct: function()
//				{
//				},
//				
//				members: 
//				{
//				}
//			});*/
//			
//			qx.Class.define("Simulator", 
//			{
//				type: "singleton",
//				extend: qx.core.Object,
//            
//				construct: function()
//				{
//					//setup buttons
//					try 
//					{						
//						armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
//						//Simulator Button//
//						simBtn = new qx.ui.form.Button("Simulieren");
//						simBtn.set
//						({
//							alignY: "middle", 
//							width: 60,
//							height: 28,
//							toolTipText: "Öffnet Simulator",
//							appearance: "button-text-small"
//						});
//						simBtn.addListener("click", this.__openSimulatorWindow, this);
//						
//						armyBar.add(simBtn,{
//							left: null,
//							right: 58,
//							bottom: 119
//						});
//						
//						//Simulator Options Button//
//						optionBtn = new qx.ui.form.Button("Optionen");
//						optionBtn.set
//						({
//							alignY: "middle", 
//							width: 60,
//							height: 28,
//							toolTipText: "Simulator Optionen",
//							appearance: "button-text-small"
//						});
//						optionBtn.addListener("click", this.__openOptionWindow, this);
//						
//						armyBar.add(optionBtn,{
//							left: null,
//							right: 58,
//							bottom: 43
//						});
//						
//						//Simulator Stats Button//
//						statBtn = new qx.ui.form.Button("Werte");
//						statBtn.set
//						({
//							alignY: "middle", 
//							width: 60,
//							height: 28,
//							toolTipText: "Öffnet Simulator Ergebnisse",
//							appearance: "button-text-small"
//						});
//						statBtn.addListener("click", this.__openStatWindow, this);
//						
//						armyBar.add(statBtn,{
//							left: null,
//							right: 58,
//							bottom: 81
//						});
//						
//						//Simulator Save Button//
//						saveBtn = new qx.ui.form.Button("Layout");
//						saveBtn.set
//						({
//							alignY: "middle", 
//							width: 60,
//							height: 28,
//							toolTipText: "Speichert die aktuelle Formation für diese Basis",
//							appearance: "button-text-small"
//						});
//						//saveBtn.addListener("click", this.__openSaveWindow, this);
//						saveBtn.setEnabled(false);
//						armyBar.add(saveBtn,{
//							left: null,
//							right: 58,
//							bottom: 5
//						});
//						
//						//Simulator Unlock Combat Button//	
//						unlockCmtBtn = new qx.ui.form.Button("Unlock");
//						unlockCmtBtn.set
//						({
//							alignY: "middle",
//							width: 50,
//							height: 50,
//							toolTipText: "Entperre Angriffs-Button",
//							appearance: "button-text-small"
//						});
//						unlockCmtBtn.setOpacity(0.7);
//						armyBar.add(unlockCmtBtn,{
//							left: null,
//							right: 7,
//							bottom: 5
//						});
//						unlockCmtBtn.addListener("click", this.timeoutCmtBtn, this);
//						
//						//Simulator Unlock Repair Time Button//
//						unlockRTBtn = new qx.ui.form.Button("Unlock");
//						unlockRTBtn.set
//						({
//							alignY: "middle",
//							width: 50,
//							height: 50,
//							toolTipText: "Entsperre Reparieren-Button",
//							appearance: "button-text-small"
//						});
//						unlockRTBtn.setOpacity(0.7);
//						
//						armyBar.add(unlockRTBtn,{
//							left: null,
//							right: 7,
//							bottom: 97
//						});
//						unlockRTBtn.addListener("click", this.timeoutRTBtn, this);
//						
//						playArea = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.OVL_PLAYAREA);
//						//Formation Buttons//
//						shiftUpBtn = new qx.ui.form.Button("↑");
//						shiftUpBtn.set
//						({
//							alignY: "middle",
//							width: 30,
//							height: 20,
//							toolTipText: "Verschiebt Einheiten eine Reihe nach OBEN",
//							appearance: "button-text-small"
//						});
//						playArea.add(shiftUpBtn,{
//							left: null,
//							right: 70,
//							bottom: 110
//						});
//						shiftUpBtn.addListener("click", function(){this.shiftFormation("u");}, this);
//						shiftUpBtn.hide();
//						
//						shiftDownBtn = new qx.ui.form.Button("↓");
//						shiftDownBtn.set
//						({
//							alignY: "middle",
//							width: 30,
//							height: 20,
//							toolTipText: "Verschiebt Einheiten eine Reihe nach UNTEN",
//							appearance: "button-text-small"
//						});
//						playArea.add(shiftDownBtn,{
//							left: null,
//							right: 70,
//							bottom: 70
//						});
//						shiftDownBtn.addListener("click", function(){this.shiftFormation("d");}, this);
//						shiftDownBtn.hide();
//						
//						shiftLeftBtn = new qx.ui.form.Button("←");
//						shiftLeftBtn.set
//						({
//							alignY: "middle",
//							width: 30,
//							height: 20,
//							toolTipText: "Verschiebt Einheiten eine Reihe nach LINKS",
//							appearance: "button-text-small"
//						});
//						playArea.add(shiftLeftBtn,{
//							left: null,
//							right: 90,
//							bottom: 90
//						});
//						shiftLeftBtn.addListener("click", function(){this.shiftFormation("l");}, this);
//						shiftLeftBtn.hide();
//						
//						shiftRightBtn = new qx.ui.form.Button("→");
//						shiftRightBtn.set
//						({
//							alignY: "middle",
//							width: 30,
//							height: 20,
//							toolTipText: "Verschiebt Einheiten eine Reihe nach RECHTS",
//							appearance: "button-text-small"
//						});
//						playArea.add(shiftRightBtn,{
//							left: null,
//							right: 50,
//							bottom: 90
//						});
//						shiftRightBtn.addListener("click", function(){this.shiftFormation("r");}, this);
//						shiftRightBtn.hide();
//						
//						disableAllUnitsBtn = new qx.ui.form.Button("", "webfrontend/ui/common/icn_res_power.png");
//						disableAllUnitsBtn.set
//						({
//							alignY: "middle",
//							width: 45,
//							height: 45,
//							toolTipText: "Aktiviert/Deaktiviert alle Einheiten",
//							appearance: "button-text-small"
//						});
//						playArea.add(disableAllUnitsBtn,{
//							left: null,
//							right: 6,
//							bottom: 130
//						});
//						disableAllUnitsBtn.addListener("click", function(){this.shiftFormation("n");}, this);
//						disableAllUnitsBtn.getChildControl("icon").set({ width : 30, height : 30, scale : true });
//						disableAllUnitsBtn.hide();
//						
//						//Simulator Back Button//
//						replayBar = qx.core.Init.getApplication().getReportReplayOverlay();
//						var backBtn = new qx.ui.form.Button("Zurück");
//						backBtn.set
//						({
//							width: 60,
//							height: 24,
//							appearance: "button-text-small",
//							toolTipText: "Zurück zur Kampfplanung"
//						});
//						backBtn.addListener("click", this.backToCombatSetup, this);
//						replayBar.add(backBtn, {
//							top: 37,
//							left: 255
//						});
//						
//						this.isSimButtonDisabled = false;
//					}
//					catch(e)
//					{
//						console.log("Error setting up Simulator Constructor: " );
//						console.log(e.toString());
//					}
//				},
//				
//				destruct: function()
//				{
//				},
//				
//				members: 
//				{
//					armyBar: null,
//					playArea: null,
//					replayBar: null,
//					simBtn: null,
//					optionBtn: null,
//					statBtn: null,
//					saveBtn: null,
//					unlockCmtBtn: null,
//					unlockRTBtn: null,
//					shiftUpBtn: null,
//					shiftDownBtn: null,
//					shiftLeftBtn: null,
//					shiftRightBtn: null,
//					backBtn: null,
//					isSimButtonDisabled: null,
//					disableAllUnitsBtn: null,
//					
//					/**
//					 * This method initiates the visual simulation with no stats produced. If the player
//					 * wants stats produced, then they should do it through the stats window.
//					 */
//					__openSimulatorWindow: function()
//					{
//						var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
//						localStorage.ta_sim_last_city = city.get_Id();
//						if (city != null)
//						{
//							var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
//							ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
//							ClientLib.API.Battleground.GetInstance().SimulateBattle();
//							var app = qx.core.Init.getApplication();
//							app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, city.get_Id(), 0, 0);
//							var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
//							
//							//Disable Simulate Button
//							if ( this.isSimButtonDisabled == false)
//							{
//								var simTimer = 5000;
//								this.disableSimulateButtonTimer(simTimer);
//								
//								if (typeof simStatBtn != "undefined")
//								{
//									simStatBtn.setEnabled(false);
//									var simStatTimer = 5000;
//									Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(simStatTimer);
//								}
//							}
//							
//							/*simBtn.setEnabled(false);
//							var timer = 10000;
//							this.disableSimulateButtonTimer(timer);
//							
//							if (typeof simStatBtn != "undefined")
//							{
//								simStatBtn.setEnabled(false);
//								var simStatTimer = 10000;
//								Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(simStatTimer);
//							}*/
//							
//							setTimeout(function() {
//								var battleDuration = battleground.get_BattleDuration();
//								battleDuration = Simulator.StatWindow.getInstance().formatBattleDurationTime(battleDuration);
//								Simulator.StatWindow.getInstance().__labelMiscBattleDuration.setValue(battleDuration);
//							}, 1000);
//						}	
//					},
//					
//					__openOptionWindow: function()
//					{
//						try
//						{
//							if (Simulator.OptionWindow.getInstance().isVisible())
//							{
//								console.log("Closing Option Window");
//								Simulator.OptionWindow.getInstance().close();
//							}
//							else
//							{
//								console.log("Opening Option Window");
//								Simulator.OptionWindow.getInstance().open();
//							}
//						}
//						catch(e)
//						{
//							console.log("Error Opening or Closing Option Window");
//							console.log(e.toString());
//						}
//					},
//					
//					__openStatWindow: function()
//					{
//						try
//						{
//							if (Simulator.StatWindow.getInstance().isVisible())
//							{
//								console.log("Closing Stat Window");
//								Simulator.StatWindow.getInstance().close();
//							}
//							else
//							{
//								console.log("Opening Stat Window");
//								Simulator.StatWindow.getInstance().open();
//								Simulator.StatWindow.getInstance().calculateTotalBaseResources();
//							}
//						}
//						catch(e)
//						{
//							console.log("Error Opening or Closing Stat Window");
//							console.log(e.toString());
//						}
//					},
//					
//					attachNetEvent: function()
//					{
//						console.log("Need to assign correct function!");
//					},
//					
//					formatNumbersCompact: function()
//					{
//						console.log("Need to assign correct function!");
//					},
//					
//					GetUnitMaxHealth: function()
//					{
//						console.log("Need to assign correct function!");
//						return -1;                
//					},
//					
//					shiftFormation: function(direction)
//					{
//						try
//						{
//							console.log("Shifting Unit Formation");
//							var v_shift = 0;
//							var h_shift = 0;
//							
//							//Determines shift direction 
//							if (direction == "u") var v_shift = -1;
//							if (direction == "d") var v_shift = 1;
//							if (direction == "l") var h_shift = -1;
//							if (direction == "r") var h_shift = 1;
//
//							//No need to continue
//							if (v_shift == 0 && h_shift == 0 && direction != "n")
//								return;
//								
//							var units = this.getCityPreArmyUnits().get_ArmyUnits().l;
//							
//							var newLayout = [];
//							for (var i = 0;	(i < units.length); i++) 
//							{
//								var unit = units[i];
//								var armyUnit = {};
//								var x = unit.get_CoordX() + h_shift;
//								switch (x) {
//									case 9:
//									x = 0;
//									break;
//									case -1:
//									x = 8;
//									break;
//								}
//								var y = unit.get_CoordY() + v_shift;
//								switch (y) {
//									case 4:
//									y = 0;
//									break;
//									case -1:
//									y = 3;
//									break;
//								}
//								armyUnit.x = x;
//								armyUnit.y = y;
//								armyUnit.id = unit.get_Id();
//								
//								//For enabling/disabling all units
//								if (direction == "n")
//								{
//									if (typeof localStorage['allUnitsDisabled'] != 'undefined')
//									{
//										if (localStorage['allUnitsDisabled'] == "yes")
//										{
//											armyUnit.enabled = unit.set_Enabled(false);
//										}
//										else
//										{
//											armyUnit.enabled = unit.set_Enabled(true);
//										}
//									}
//									else
//									{
//										armyUnit.enabled = unit.set_Enabled(false);
//									}
//								}
//								armyUnit.enabled = unit.get_Enabled();
//								newLayout.push(armyUnit);
//							}
//							//Change disable button to opposite 
//							if (direction == "n")
//							{
//								if (localStorage['allUnitsDisabled'] == "yes")
//									localStorage['allUnitsDisabled'] = "no";
//								else
//									localStorage['allUnitsDisabled'] = "yes";
//							}
//							this.restoreFormation(newLayout);
//						}
//						catch(e)
//						{
//							console.log("Error Shifting Units");
//							console.log(e.toString());
//						}
//					},
//					
//					restoreFormation: function(layout)
//					{
//						try
//						{
//							var sUnits = layout;
//							var units = this.getCityPreArmyUnits();
//							var units_list = units.get_ArmyUnits().l;
//							for (var idx = 0; idx < sUnits.length; idx++) 
//							{
//								var saved_unit = sUnits[idx];
//								var uid = saved_unit.id;
//								for (var i = 0; i < units_list.length; i++) 
//								{
//									if (units_list[i].get_Id() === uid) 
//									{
//										units_list[i].MoveBattleUnit(saved_unit.x, saved_unit.y);
//										if (saved_unit.enabled === undefined) 
//											units_list[i].set_Enabled(true);
//										else 
//											units_list[i].set_Enabled(saved_unit.enabled);
//									}
//								}
//							}
//							units.UpdateFormation(true);
//						}
//						catch(e)
//						{
//							console.log("Error Restoring Formation");
//							console.log(e.toString());
//						}
//					},
//					
//					getCityPreArmyUnits: function()
//					{
//						var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
//						var formationManager = ownCity.get_CityArmyFormationsManager();
//						return formationManager.GetFormationByTargetBaseId(formationManager.get_CurrentTargetBaseId());
//					},
//					
//					timeoutCmtBtn: function()
//					{
//						armyBar.remove(unlockCmtBtn);
//						setTimeout(function() {
//							armyBar.add(unlockCmtBtn,{
//								left: null,
//								right: 7,
//								bottom: 5
//							});
//						}, 2000);
//					},
//					
//					timeoutRTBtn: function()
//					{
//						armyBar.remove(unlockRTBtn);
//						setTimeout(function() {
//							armyBar.add(unlockRTBtn,{
//								left: null,
//								right: 7,
//								bottom: 97
//							});
//						}, 2000);
//					},
//					
//					backToCombatSetup: function()
//					{
//						var app = qx.core.Init.getApplication();
//						var player_cities = ClientLib.Data.MainData.GetInstance().get_Cities();
//						var current_city = player_cities.get_CurrentCity();
//						try 
//						{
//							//This brings the player back to viewing the enemies defense setup PlayArea
//							app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, localStorage.ta_sim_last_city, 0, 0);
//						} 
//						catch (e) 
//						{
//							console.log("Error closing Simulation Window");
//							console.log(e.toString());
//						}	
//					},
//					
//					disableSimulateButtonTimer: function(timer)
//					{
//						try
//						{
//							if ( timer >= 1000)
//							{
//								this.isSimButtonDisabled =true;
//								simBtn.setLabel(Math.floor(timer/1000));
//								timer -= 1000;
//								setTimeout(function () {
//									Simulator.getInstance().disableSimulateButtonTimer(timer);
//								}, 1000)
//							}
//							else
//							{
//								setTimeout(function () {
//									simBtn.setEnabled(true);
//									if (Simulator.OptionWindow.getInstance().sizeBtn_Normal.getValue())
//										simBtn.setLabel("Simulieren");
//									else
//										simBtn.setLabel("S");	
//								}, timer)
//								this.isSimButtonDisabled = false;
//							}
//						}
//						catch(e)
//						{
//							console.log("Error disabling simulator button");
//							console.log(e.toString());
//						}
//					}
//				}
//			});
//			
//			qx.Class.define("Simulator.StatWindow", 
//			{
//				type: "singleton",
//				//extend: webfrontend.gui.CustomWindow,
//				extend:	qx.ui.window.Window,
//				construct: function()
//				{
//					this.base(arguments);
//					this.setLayout(new qx.ui.layout.VBox());
//					
//					this.set({
//						width: 200,
//						caption: "Simulations Ergebnisse",
//						padding: 2,
//						allowMaximize: false,
//						showMaximize: false,
//						allowMinimize: false,
//						showMinimize: false,
//						
//					});
//					
//					this.setResizable(false, true, false, true);
//					this.moveTo(125,30);
//					//Enemy Health Section//
//					var enemyHealthHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({ decorator: "pane-light-opaque"});
//					var enemyHealthTitle = new qx.ui.basic.Label("Zielbasis Gesundheit").set({ alignX: "center", alignY: "top", font: "font_size_14_bold"});
//					enemyHealthHeader.add(enemyHealthTitle);
//					this.add(enemyHealthHeader);
//					
//					var enemyHealth = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
//					enemyHealth.setThemedFont("bold");
//					var enemyHealthBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(6)).set({ width: 100, padding: 5, decorator: "pane-light-opaque"});
//					var eHLabelOverall = new qx.ui.basic.Label("Gesamt:");
//					var eHLabelBase = new qx.ui.basic.Label("Basis:");
//					var eHLabelDefense = new qx.ui.basic.Label("Verteidigung:");
//					var eHLabelCY = new qx.ui.basic.Label("Bauhof:");
//					var eHLabelFrei = new qx.ui.basic.Label("Verteidigungs-");
//					var eHLabelDF = new qx.ui.basic.Label("Einrichtung:");
//					enemyHealthBox.add(eHLabelOverall);
//					enemyHealthBox.add(eHLabelBase);
//					enemyHealthBox.add(eHLabelDefense);
//					enemyHealthBox.add(eHLabelCY);
//					enemyHealthBox.add(eHLabelFrei);
//					enemyHealthBox.add(eHLabelDF);
//					enemyHealth.add(enemyHealthBox);
//					
//					this.__labelEnemyOverallHealth = new Array();
//					this.__labelEnemyBaseHealth = new Array();
//					this.__labelEnemyDefenseHealth = new Array();
//					this.__labelEnemyCYHealth = new Array();
//					this.__labelEnemyFrei = new Array();
//					this.__labelEnemyDFHealth = new Array();
//					
//					var enemyHealthValues = new qx.ui.container.Composite(new qx.ui.layout.VBox(6)).set({ alignX: "center", width: 70, padding: 5, decorator: "pane-light-opaque"});
//					this.__labelEnemyOverallHealth = new qx.ui.basic.Label("-").set({ alignX: "right"});
//					this.__labelEnemyBaseHealth = new qx.ui.basic.Label("-").set({ alignX: "right"});
//					this.__labelEnemyDefenseHealth = new qx.ui.basic.Label("-").set({ alignX: "right"});
//					this.__labelEnemyCYHealth = new qx.ui.basic.Label("-").set({ alignX: "right"});
//					this.__labelEnemyFrei = new qx.ui.basic.Label("").set({ alignX: "right"});
//					this.__labelEnemyDFHealth = new qx.ui.basic.Label("-").set({ alignX: "right"});
//					enemyHealthValues.add(this.__labelEnemyOverallHealth);
//					enemyHealthValues.add(this.__labelEnemyBaseHealth);
//					enemyHealthValues.add(this.__labelEnemyDefenseHealth);
//					enemyHealthValues.add(this.__labelEnemyCYHealth);
//					enemyHealthValues.add(this.__labelEnemyFrei);
//					enemyHealthValues.add(this.__labelEnemyDFHealth);
//					enemyHealth.add(enemyHealthValues, { flex: 1 });
//					this.add(enemyHealth);
//					
//					//Player Repair Section//
//					var playerRepairHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({ decorator: "pane-light-opaque"});
//					var playerRepairTitle = new qx.ui.basic.Label("Reparatur Zeiten").set({ alignX: "center", alignY: "top", font: "font_size_14_bold"});
//					playerRepairHeader.add(playerRepairTitle);
//					this.add(playerRepairHeader);
//					
//					var playerRepair = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
//					playerRepair.setThemedFont("bold");
//					var playerRepairBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ width: 70, padding: 5, decorator: "pane-light-opaque"});
//					var pRLabelOverall = new qx.ui.basic.Label("Gesamt:");
//					var pRLabelInf = new qx.ui.basic.Label("Infantrie:");
//					var pRLabelVehi = new qx.ui.basic.Label("Fahzeuge:");
//					var pRLabelAir = new qx.ui.basic.Label("Flugzeuge:");
//					playerRepairBox.add(pRLabelOverall);
//					playerRepairBox.add(pRLabelInf);
//					playerRepairBox.add(pRLabelVehi);
//					playerRepairBox.add(pRLabelAir);
//					playerRepair.add(playerRepairBox);
//					
//					this.__labelRepairOverall = new Array();
//					this.__labelRepairInf = new Array();
//					this.__labelRepairVehi = new Array();
//					this.__labelRepairAir = new Array();
//					
//					var playerRepairValues = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ alignX: "center", width: 70, padding: 5, decorator: "pane-light-opaque"});
//					this.__labelRepairOverall = new qx.ui.basic.Label("-").set({ alignX: "right"});
//					this.__labelRepairInf = new qx.ui.basic.Label("-").set({ alignX: "right"});
//					this.__labelRepairVehi = new qx.ui.basic.Label("-").set({ alignX: "right"});
//					this.__labelRepairAir = new qx.ui.basic.Label("-").set({ alignX: "right"});
//					playerRepairValues.add(this.__labelRepairOverall);
//					playerRepairValues.add(this.__labelRepairInf);
//					playerRepairValues.add(this.__labelRepairVehi);
//					playerRepairValues.add(this.__labelRepairAir);
//					playerRepair.add(playerRepairValues, { flex: 1 });
//					this.add(playerRepair);
//					
//					//MISC Section//
//					var miscHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({ decorator: "pane-light-opaque"});
//					var miscTitle = new qx.ui.basic.Label("Verschiedenes").set({ alignX: "center", alignY: "top", font: "font_size_14_bold"});
//					miscHeader.add(miscTitle);
//					this.add(miscHeader);
//					
//					var misc = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
//					misc.setThemedFont("bold");
//					var miscBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ width: 70, padding: 5, decorator: "pane-light-opaque"});
//					var miscOutcome = new qx.ui.basic.Label("Ergebnis:");
//					var miscBattleDuration = new qx.ui.basic.Label("Dauer:");
//					miscBox.add(miscOutcome);
//					miscBox.add(miscBattleDuration);
//					misc.add(miscBox);
//					
//					this.__labelMiscOutcome = new Array();
//					this.__labelMiscBattleDuration = new Array();
//					
//					var miscValues = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ alignX: "center", width: 70, padding: 5, decorator: "pane-light-opaque"});
//					this.__labelMiscOutcome = new qx.ui.basic.Atom("Unbekannt", null).set({ allowGrowX: false, alignX: "right"});
//					this.__labelMiscBattleDuration = new qx.ui.basic.Label("0:00").set({ alignX: "right"});
//					miscValues.add(this.__labelMiscOutcome);
//					miscValues.add(this.__labelMiscBattleDuration);
//					misc.add(miscValues, { flex: 1 });
//					this.add(misc);	
//
//					//Battle Loot Section//
//					//TODO: Eventually want to calculate loot from simulation too
//					var battleLootHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({ decorator: "pane-light-opaque"});
//					var battleLootTitle = new qx.ui.basic.Label("Schlepp Heim").set({ alignX: "center", alignY: "top", font: "font_size_14_bold"});
//					battleLootHeader.add(battleLootTitle);
//					this.add(battleLootHeader);
//					
//					
//					var battleLoot = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
//					battleLoot.setThemedFont("bold");
//					var battleLootBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ width: 70, padding: 5, decorator: "pane-light-opaque"});
//					var battleLootTib = new qx.ui.basic.Atom(null, "webfrontend/ui/common/icn_res_tiberium.png");
//					var battleLootCry = new qx.ui.basic.Atom(null, "webfrontend/ui/common/icn_res_chrystal.png");
//					var battleLootCred = new qx.ui.basic.Atom(null, "webfrontend/ui/common/icn_res_dollar.png");
//					var battleLootRP = new qx.ui.basic.Atom(null, "webfrontend/ui/common/icn_res_research_mission.png");
//					//var battleLootTotal = new qx.ui.basic.Atom(null, "webfrontend/ui/icons/icon_item.png");
//					var battleLootTotal = new qx.ui.basic.Atom(null, "webfrontend/ui/common/icn_build_slots.png");
//					battleLootTib.setToolTipText("Tiberium");
//					battleLootCry.setToolTipText("Kristall");
//					battleLootCred.setToolTipText("Geld");
//					battleLootRP.setToolTipText("Forschungspunkte");
//					battleLootTotal.setToolTipText("Totale Beute");
//					battleLootTib.getChildControl("icon").set({ width : 23, height : 23, scale : true }); 
//					battleLootCry.getChildControl("icon").set({ width : 23, height : 23, scale : true }); 
//					battleLootCred.getChildControl("icon").set({ width : 23, height : 23, scale : true }); 
//					battleLootRP.getChildControl("icon").set({ width : 23, height : 23, scale : true }); 
//					battleLootTotal.getChildControl("icon").set({ width : 23, height : 23, scale : true }); 
//					battleLootBox.add(battleLootTib);
//					battleLootBox.add(battleLootCry);
//					battleLootBox.add(battleLootCred);
//					battleLootBox.add(battleLootRP);
//					battleLootBox.add(battleLootTotal);
//					battleLoot.add(battleLootBox);
//					
//					this.__labelBattleLootTotal = new Array();
//					this.__labelBattleLootTib = new Array();
//					this.__labelBattleLootCry = new Array();
//					this.__labelBattleLootCred = new Array();
//					this.__labelBattleLootRP = new Array();
//					
//					var battleLootValues = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ alignX: "center", width: 70, padding: 5, decorator: "pane-light-opaque"});
//					this.__labelBattleLootTib = new qx.ui.basic.Label("-").set({ alignX: "right", padding: 3});
//					this.__labelBattleLootCry = new qx.ui.basic.Label("-").set({ alignX: "right", padding: 3});
//					this.__labelBattleLootCred = new qx.ui.basic.Label("-").set({ alignX: "right", padding: 3});
//					this.__labelBattleLootRP = new qx.ui.basic.Label("-").set({ alignX: "right", padding: 3});
//					this.__labelBattleLootTotal = new qx.ui.basic.Label("-").set({ alignX: "right", padding: 3});
//					battleLootValues.add(this.__labelBattleLootTib);
//					battleLootValues.add(this.__labelBattleLootCry);
//					battleLootValues.add(this.__labelBattleLootCred);
//					battleLootValues.add(this.__labelBattleLootRP);
//					battleLootValues.add(this.__labelBattleLootTotal);
//					battleLoot.add(battleLootValues, { flex: 1 });
//					this.add(battleLoot);
//					
//					//Simulate Button//
//					var simButton = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ padding: 5, decorator: "pane-light-opaque"});
//					this.add(simButton);
//					
//					simStatBtn = new qx.ui.form.Button("Aktualisieren");
//					simStatBtn.setToolTipText("Aktualisiert Sim-Statistik");
//					simStatBtn.addListener("click", this.simulateStats, this);
//					simButton.add(simStatBtn);
//					
//					this.isSimStatButtonDisabled = false;
//					
//					Simulator.getInstance().attachNetEvent(ClientLib.API.Battleground.GetInstance(), "OnSimulateBattleFinished", ClientLib.API.OnSimulateBattleFinished, this, this.__OnSimulateBattleFinished);					
//				},
//				
//				destruct: function()
//				{
//				},
//				
//				members: 
//				{
//					simStatBtn: null,
//					__labelEnemyOverallHealth: null,
//					__labelEnemyBaseHealth: null,
//					__labelEnemyDefenseHealth: null,
//					__labelEnemyCYHealth: null,
//					__labelEnemyDFHealth: null,
//					__labelRepairOverall: null,
//					__labelRepairInf: null,
//					__labelRepairVehi: null,
//					__labelRepairAir: null,
//					__labelBattleLootTotal: null,
//					__labelBattleLootTib: null,
//					__labelBattleLootCry: null,
//					__labelBattleLootCred: null,
//					__labelBattleLootRP: null,
//					__labelMiscOutcome: null,
//					__labelMiscBattleDuration: null,
//					isSimStatButtonDisabled: null,
//					
//					simulateStats: function()
//					{
//						console.log("Simulating Stats");
//						var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
//						if (city != null)
//						{
//							var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
//							ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
//							ClientLib.API.Battleground.GetInstance().SimulateBattle();
//							var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
//							
//							//Disable Simulate Button
//							if ( this.isSimStatButtonDisabled == false )
//							{
//								simStatBtn.setEnabled(false);
//								var simStatTimer = 7000;
//								var simStatTimeout = this.disableSimulateStatButtonTimer(simStatTimer);
//								
//								//simBtn.setEnabled(false);
//								var simTimer = 7000;
//								Simulator.getInstance().disableSimulateButtonTimer(simTimer);
//							}
//							
//							setTimeout(function() {
//								var battleDuration = battleground.get_BattleDuration();
//								battleDuration = Simulator.StatWindow.getInstance().formatBattleDurationTime(battleDuration);
//								Simulator.StatWindow.getInstance().__labelMiscBattleDuration.setValue(battleDuration);
//							}, 1000);
//						}
//					},
//					
//					__OnSimulateBattleFinished: function(data) 
//					{
//						this.getBaseHealth(data);   
//						this.getPlayerUnitDamage(data);   
//					},
//					
//					formatBattleDurationTime: function(time)
//					{
//						var seconds = time / 1000;
//						var minutes = seconds / 60;
//						minutes = Math.round(minutes - 0.5);
//						seconds = Math.round((seconds - 0.5) - (minutes * 60));
//						
//						if( seconds < 10)
//						{
//							seconds = "0" + seconds;
//						}
//						return minutes + ":" + seconds;
//					},
//					
//					getPlayerUnitDamage: function(data)
//					{
//						console.log("Getting Player Unit Damage");
//						try
//						{
//							var crystals = 0;
//							var infCry = 0;
//							var vehiCry = 0;
//							var airCry = 0;
//							var infRT = 0;
//							var vehiRT = 0;
//							var airRT = 0;
//							var infMH = 0;
//							var vehiMH = 0;
//							var airMH = 0;
//							var infEH = 0;
//							var vehiEH = 0;
//							var airEH = 0;
//							
//							for (var i = 0; i < data.length; i++)
//							{
//								var unitData = data[i].Value;
//								var unitMDBID = unitData.t;
//								var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unitMDBID);
//								var oUnit = false;
//								switch(unit.pt)
//								{
//										case ClientLib.Base.EPlacementType.Defense: 
//											oUnit = false;
//											break;
//										case ClientLib.Base.EPlacementType.Structure: 
//											oUnit = false;
//											break;
//										case ClientLib.Base.EPlacementType.Offense: 
//											oUnit = true;
//											break;     
//								}
//								if ( oUnit == false ) {continue;}
//								var endHealth = unitData.h;
//								var level = unitData.l;
//								var maxHealth = Simulator.getInstance().GetUnitMaxHealth(level, unit) * 16;
//							   
//								var damageRatio = 1;
//								if (endHealth >= 0)
//								{
//									if (maxHealth != -1)
//									{
//										damageRatio = (maxHealth - endHealth) / maxHealth;
//										var repairCosts = ClientLib.API.Util.GetUnitRepairCosts(level, unitMDBID, damageRatio);
//										if (repairCosts == null){continue;}
//										for (var j = 0; j < repairCosts.length; j++)
//										{
//											
//											var c = repairCosts[j];
//											var type = parseInt(c.Type);
//											switch (type)
//											{
//												case ClientLib.Base.EResourceType.Crystal:
//													crystals += c.Count;
//													switch(unit.mt) //movement type
//													{
//														case ClientLib.Base.EUnitMovementType.Feet:
//															infCry += c.Count;
//															break;
//														case ClientLib.Base.EUnitMovementType.Wheel:
//														case ClientLib.Base.EUnitMovementType.Track:
//															vehiCry += c.Count;
//															break
//														case ClientLib.Base.EUnitMovementType.Air:
//														case ClientLib.Base.EUnitMovementType.Air2:
//															airCry += c.Count;
//															break;
//													}
//													break;
//												case ClientLib.Base.EResourceType.RepairChargeBase:
//													break;
//												case ClientLib.Base.EResourceType.RepairChargeInf:
//													infMH += maxHealth;
//													infEH += endHealth;
//													infRT += c.Count;
//													break;
//												case ClientLib.Base.EResourceType.RepairChargeVeh:
//													vehiRT += c.Count;
//													vehiMH += maxHealth;
//													vehiEH += endHealth;
//													break;
//												case ClientLib.Base.EResourceType.RepairChargeAir:
//													airRT += c.Count;
//													airMH += maxHealth;
//													airEH += endHealth;
//													break;
//											}
//										}                                 
//									}
//								}
//							}
//							
//							var showRTOnly = localStorage['showRTOnly'];
//							if (typeof showRTOnly != 'undefined')
//							{
//								if ( showRTOnly == "yes")
//								{
//									this.__labelRepairOverall.setValue(phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(Math.max(infRT,vehiRT,airRT))));
//									this.__labelRepairOverall.setTextColor("blue");
//									this.__labelRepairInf.setValue(phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(infRT)));
//									this.__labelRepairVehi.setValue(phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(vehiRT)));
//									this.__labelRepairAir.setValue(phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(airRT)));
//								}
//								else
//								{
//									this.__labelRepairOverall.setValue(Simulator.getInstance().formatNumbersCompact(crystals) + " / " + phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(Math.max(infRT,vehiRT,airRT))));
//									this.__labelRepairOverall.setTextColor("blue");
//									this.__labelRepairInf.setValue(Simulator.getInstance().formatNumbersCompact(infCry) + " / " + phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(infRT)));
//									this.__labelRepairVehi.setValue(Simulator.getInstance().formatNumbersCompact(vehiCry) + " / " + phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(vehiRT)));
//									this.__labelRepairAir.setValue(Simulator.getInstance().formatNumbersCompact(airCry) + " / " + phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(airRT)));
//								}
//							}
//							else
//							{
//								this.__labelRepairOverall.setValue(Simulator.getInstance().formatNumbersCompact(crystals) + " / " + phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(Math.max(infRT,vehiRT,airRT))));
//								this.__labelRepairOverall.setTextColor("blue");
//								this.__labelRepairInf.setValue(Simulator.getInstance().formatNumbersCompact(infCry) + " / " + phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(infRT)));
//								this.__labelRepairVehi.setValue(Simulator.getInstance().formatNumbersCompact(vehiCry) + " / " + phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(vehiRT)));
//								this.__labelRepairAir.setValue(Simulator.getInstance().formatNumbersCompact(airCry) + " / " + phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(airRT)));
//							}
//						}
//						catch(e)
//						{
//							console.log("Error Getting Player Unit Damage");
//							console.log(e.toString());
//						}
//					},
//					
//					getBaseHealth: function(data)
//					{
//						console.log("Getting Base Health");
//						try
//						{
//							var overallMH = 0;
//							var overallEH = 0;
//							var defenseMH = 0;
//							var defenseEH = 0;
//							var buildingMH = 0;
//							var buildingEH = 0;
//							var offenseMH = 0;
//							var offenseEH = 0;
//							var cyMH = 0;
//							var cyEH = 0;
//							var dfMH = 0;
//							var dfEH = 0;
//							
//							for (var i = 0; i < data.length; i++)
//							{
//								var combatId = data[i].Key;
//								var unitData = data[i].Value;
//								
//								var unitMDBID = unitData.t;
//								var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unitMDBID);
//								var unitLevel = unitData.l;
//								//var unitStartHealth = unitData.sh;
//								var unitMaxHealth = Simulator.getInstance().GetUnitMaxHealth(unitLevel, unit) * 16;
//								var unitEndHealth = unitData.h;
//								
//								switch(unit.pt) 
//								{
//									case ClientLib.Base.EPlacementType.Defense: 
//										overallMH += unitMaxHealth;
//										overallEH += unitEndHealth;
//										defenseMH += unitMaxHealth;
//										defenseEH += unitEndHealth;
//										break;
//									case ClientLib.Base.EPlacementType.Structure:
//										overallMH += unitMaxHealth;
//										overallEH += unitEndHealth;
//										buildingMH += unitMaxHealth;
//										buildingEH += unitEndHealth;
//										switch(unitMDBID)
//										{
//											case 151:
//											case 112:
//											case 177: //Construction Yard
//												cyMH = unitMaxHealth;
//												cyEH = unitEndHealth;
//												break;
//											case 158:
//											case 131:
//											case 195: //Defense Facility
//												dfMH = unitMaxHealth;
//												dfEH = unitEndHealth;
//												break;
//										}
//										break;
//									case ClientLib.Base.EPlacementType.Offense:
//										offenseMH += unitMaxHealth;
//										offenseEH += unitEndHealth;
//										break;
//								}
//								
//								var overallHP = (overallEH / overallMH) * 100;
//								var defenseHP = (defenseEH / defenseMH) * 100;
//								var buildingHP = (buildingEH / buildingMH) * 100;
//								var cyHP = (cyEH / cyMH) * 100;
//								var dfHP = (dfEH / dfMH)  * 100;
//								
//								if (offenseEH == 0)
//								{
//									 this.__labelMiscOutcome.setLabel("Alles Futsch");
//									 this.__labelMiscOutcome.setIcon("FactionUI/icons/icon_reports_total_defeat.png");
//									 this.__labelMiscOutcome.setTextColor("red");
//								}
//								else if (cyEH == 0)
//								{	
//									this.__labelMiscOutcome.setLabel("Endsieg");
//									this.__labelMiscOutcome.setIcon("FactionUI/icons/icon_reports_total_victory.png");
//									this.__labelMiscOutcome.setTextColor("darkgreen");
//								}
//								else
//								{
//									this.__labelMiscOutcome.setLabel("Gewonnen");
//									this.__labelMiscOutcome.setIcon("FactionUI/icons/icon_reports_victory.png");
//									this.__labelMiscOutcome.setTextColor("darkgreen");
//								}
//							}
//							this.__labelEnemyOverallHealth.setValue(overallHP.toFixed(2));
//							this.setLabelColor(this.__labelEnemyOverallHealth, overallHP.toFixed(2));
//							
//							this.__labelEnemyDefenseHealth.setValue(defenseHP.toFixed(2));
//							this.setLabelColor(this.__labelEnemyDefenseHealth, defenseHP.toFixed(2));
//							
//							this.__labelEnemyBaseHealth.setValue(buildingHP.toFixed(2));
//							this.setLabelColor(this.__labelEnemyBaseHealth, buildingHP.toFixed(2));
//							
//							this.__labelEnemyCYHealth.setValue(cyHP.toFixed(2));
//							this.setLabelColor(this.__labelEnemyCYHealth, cyHP.toFixed(2));
//							
//							this.__labelEnemyDFHealth.setValue(dfHP.toFixed(2));
//							this.setLabelColor(this.__labelEnemyDFHealth, dfHP.toFixed(2));
//						}
//						catch(e)
//						{
//							console.log("Error Getting Base Health");
//							console.log(e.toString());
//						}
//					},
//					
//					setLabelColor: function(label, number)
//					{
//						if (number < 25)
//							label.setTextColor("darkgreen");
//						else if (number < 75)
//							label.setTextColor("darkorange");
//						else
//							label.setTextColor("red");
//					},
//					
//					disableSimulateStatButtonTimer: function(timer)
//					{
//						try
//						{
//							if ( timer >= 1000)
//							{
//								this.isSimStatButtonDisabled = true;
//								simStatBtn.setLabel(Math.floor(timer/1000));
//								timer -= 1000;
//								setTimeout(function () {
//									//Simulator.StatWindow.GetInstance().disableSimulateButtonTimer(timer);
//									Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(timer);
//								}, 1000)
//							}
//							else
//							{
//								setTimeout(function () {
//									simStatBtn.setEnabled(true);
//									simStatBtn.setLabel("Aktualisieren");
//									console.log("Sim Buttons Reset!");
//								}, timer)
//								this.isSimStatButtonDisabled = false;
//							}
//						}
//						catch(e)
//						{
//							console.log("Error disabling simulator button");
//							console.log(e.toString());
//						}
//					},
//					
//					calculateTotalBaseResources: function()
//					{
//						var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
//						var data = [];
//						data[0] = city.get_CityUnitsData();
//						data[1] = city.get_CityBuildingsData();
//						var buildings = [], offenses = [], defenses =[];
//					   
//						//MrHIDEn Obfuscation Resist Code - simply amazing
//						for (var d in data)
//						{
//							for (var k in data[d]) {
//										var o = data[d][k];
//										if (o === null) continue;
//										if (typeof(o.c) == 'undefined') continue;//count
//										if (o.c === 0) continue;//empty
//										if (typeof(o.d) == 'undefined') continue;//data {}
//										var ks = Object.keys(o.d);
//										if (ks.length != o.c) continue;
//										var u = o.d[ks[0]];
//										if(typeof(u) != 'object') continue;                  
//										if(typeof(u.get_UnitLevelRepairRequirements) != 'function') continue;
//										if(typeof(u.GetUnitGroupType) ==  'undefined') {
//										  // buildings
//										  buildings.push(k);
//										} else {
//										  // units 3-attack
//										  if(u.GetUnitGroupType()) {
//											offenses.push(k);
//										  } else {
//											// units 0-defend
//											defenses.push(k);
//										  }
//										}
//									  }
//						}
//						ClientLib.Data.City.prototype.get_DefenseUnits = 0;
//						if(typeof(defenses)!='undefined') 
//						{
//							ClientLib.Data.City.prototype.kDefenseUnits = defenses;
//							ClientLib.Data.City.prototype.get_DefenseUnits = function(){return this.get_CityUnitsData()[this.kDefenseUnits];};
//						}
//						ClientLib.Data.City.prototype.get_Buildings = 0;
//						if(typeof(buildings)!='undefined') 
//						{
//							ClientLib.Data.City.prototype.kBuildings = buildings;
//							ClientLib.Data.City.prototype.get_Buildings = function(){return this.get_CityBuildingsData()[this.kBuildings];};
//						}
//						
//						var loots = {RP:0, T:0, C:0, G:0};
//							
//						if (ClientLib.Data.City.prototype.get_DefenseUnits != 0) 
//						{
//							var dUnits = city.get_DefenseUnits();
//							this.getLoot(dUnits, loots);
//						}
//						
//						if (ClientLib.Data.City.prototype.get_Buildings != 0) 
//						{
//							var bUnits = city.get_Buildings();
//							this.getLoot(bUnits, loots);
//						}
//						
//						//Update Stat Window
//						var totalLoot = loots['T'] + loots['C'] + loots['G'] + loots['RP'];		
//						this.__labelBattleLootTotal.setValue(Simulator.getInstance().formatNumbersCompact(totalLoot));
//						this.__labelBattleLootTib.setValue(Simulator.getInstance().formatNumbersCompact(loots['T']));
//						this.__labelBattleLootCry.setValue(Simulator.getInstance().formatNumbersCompact(loots['C']));
//						this.__labelBattleLootCred.setValue(Simulator.getInstance().formatNumbersCompact(loots['G']));
//						this.__labelBattleLootRP.setValue(Simulator.getInstance().formatNumbersCompact(loots['RP']));
//					},
//					
//					getLoot: function(entities, lootArray)
//					{
//						//More MrHIDEn goodies - thank you Sir
//						var rType ={1:'T',2:'C',3:'G',6:'RP',7:'RCB',8:'RCA',9:'RCI',10:'RCV'};
//						try
//						{
//							for (i in entities.d)
//							{  
//								var entity = entities.d[i];// unit/building
//								var hp = entity.get_HitpointsPercent();// 0-1 , 1 means 100%               
//								var repairReqs = entity.get_UnitLevelRepairRequirements();// EA API Resources/Repair Costs                
//								for (var j in repairReqs) {
//									var costs = repairReqs[j];//Requirement/Cost
//									if(typeof(costs)!='object') continue;                
//									var lootType = (typeof(rType[costs.Type])=='undefined')?costs.Type:rType[costs.Type];//translate if possible
//									if(typeof(lootArray[lootType])=='undefined') lootArray[lootType] = 0;//add branch
//									lootArray[lootType] += hp * costs.Count;
//								} 
//							}
//							
//							return lootArray;
//						}
//						catch(e) 
//						{ 
//							console.log("Error occurred getting loot");
//							console.log(e.toString()); 
//						}
//					}
//				}
//			});
//			
//			qx.Class.define("Simulator.OptionWindow", 
//			{
//				type: "singleton",
//				extend: webfrontend.gui.CustomWindow,
//				
//				construct: function()
//				{
//					this.base(arguments);
//					this.setLayout(new qx.ui.layout.Grid(5,5));
//					//this.setColumnWidth(0,100);
//					
//					this.set({
//						width: 300,
//						caption: "Simulator Optionen",
//						padding: 2,
//						allowMaximize: false,
//						showMaximize: false,
//						allowMinimize: false,
//						showMinimize: false,
//						textColor: "white"
//					});
//					
//					this.getLayout().setColumnMinWidth(0, 100);
//					this.getLayout().setSpacingY(10);
//					
//					//Get Local Storage
//					var isRTDisabled = localStorage['isRTBtnDisabled'];
//					var isCmtDisabled = localStorage['isCmtBtnDisabled'];
//					var isButtonRight = localStorage['isBtnRight'];
//					var isButtonNormal = localStorage['isBtnNorm'];
//					var autoOpenStat = localStorage['autoOpenStat'];
//					var showRTOnly = localStorage['showRTOnly'];
//					
//					//Move Buttons Option//
//					this.moveBtnLabel = new qx.ui.basic.Label("Buttons Ausrichtung:").set({font: "font_size_14_bold"});
//					
//					this.moveBtn_Right = new qx.ui.form.RadioButton("rechts");
//					this.moveBtn_Right.addListener("click", this.moveBtns, this);
//					
//					this.moveBtn_Left = new qx.ui.form.RadioButton("links");
//					this.moveBtn_Left.addListener("click", this.moveBtns, this);
//					
//					//Check Button Info
//					if (typeof isButtonRight != 'undefined')
//					{
//						if (isButtonRight == "no")
//						{
//							this.moveBtn_Left.setValue(true);
//							this.moveBtn_Right.setValue(false);
//							//this.moveBtns();
//						}
//						else
//						{
//							this.moveBtn_Right.setValue(true);
//							this.moveBtn_Left.setValue(false);
//						}
//					}
//					else
//					{
//						this.moveBtn_Right.setValue(true); //default
//						this.moveBtn_Left.setValue(false);
//					}
//					
//					this.moveBtn_Group = new qx.ui.form.RadioGroup();
//					this.moveBtn_Group.add(this.moveBtn_Left, this.moveBtn_Right);
//					
//					this.add(this.moveBtnLabel, {row:0, column:0, colSpan: 2});
//					this.add(this.moveBtn_Left, {row:1, column:0});
//					this.add(this.moveBtn_Right, {row:1, column:1});
//					
//					//Buttons Size Option
//					this.sizeBtnLabel = new qx.ui.basic.Label("Buttons Größe:").set({font: "font_size_14_bold"});
//					
//					this.sizeBtn_Normal = new qx.ui.form.RadioButton("normal");
//					this.sizeBtn_Normal.addListener("click", this.resizeBtns, this);
//					this.sizeBtn_Normal.setValue(true);
//					
//					this.sizeBtn_Small = new qx.ui.form.RadioButton("klein");
//					this.sizeBtn_Small.addListener("click", this.resizeBtns, this);
//					
//					//Check Button Info
//					if (typeof isButtonNormal != 'undefined')
//					{
//						if (isButtonNormal == "no")
//						{
//							this.sizeBtn_Small.setValue(true);
//							this.sizeBtn_Normal.setValue(false);
//							
//						}
//						else
//						{
//							this.sizeBtn_Normal.setValue(true);
//							this.sizeBtn_Small.setValue(false);
//						}
//					}
//					else
//					{
//						this.sizeBtn_Normal.setValue(true); //default
//						this.sizeBtn_Small.setValue(false);
//					}
//					
//					this.sizeBtn_Group = new qx.ui.form.RadioGroup();
//					this.sizeBtn_Group.add(this.sizeBtn_Normal, this.sizeBtn_Small);
//					
//					this.add(this.sizeBtnLabel, {row:2, column:0, colSpan: 2});
//					this.add(this.sizeBtn_Small, {row:3, column:0});
//					this.add(this.sizeBtn_Normal, {row:3, column:1});
//					
//					//Disable Combat Unlock Button
//					this.disableCmtBtnLabel = new qx.ui.basic.Label("Disable Combat Unlock:").set({font: "font_size_14_bold"});
//					
//					this.disableCmtBtn_Yes = new qx.ui.form.RadioButton("Yes");
//					this.disableCmtBtn_Yes.addListener("click", this.disableCmtBtn, this);
//					
//					this.disableCmtBtn_No = new qx.ui.form.RadioButton("No");
//					this.disableCmtBtn_No.addListener("click", this.disableCmtBtn, this);
//					
//					if(typeof isCmtDisabled != 'undefined')
//					{
//						if (isCmtDisabled == "yes")
//						{
//							this.disableCmtBtn_Yes.setValue(true);
//							this.disableCmtBtn_No.setValue(false);
//							
//						}
//						else
//						{
//							this.disableCmtBtn_No.setValue(true);
//							this.disableCmtBtn_Yes.setValue(false);
//						}
//					}
//					else
//					{
//						this.disableCmtBtn_No.setValue(true);
//						this.disableCmtBtn_Yes.setValue(false);
//					}
//					
//					this.disableCmtBtn_Group = new qx.ui.form.RadioGroup();
//					this.disableCmtBtn_Group.add(this.disableCmtBtn_Yes, this.disableCmtBtn_No);
//					
//					this.add(this.disableCmtBtnLabel, {row:4, column:0, colSpan: 2, columnWidth: 180});
//					this.add(this.disableCmtBtn_Yes, {row:5, column:0});
//					this.add(this.disableCmtBtn_No, {row:5, column:1});
//					
//					//Disable Repair Unlock Button
//					this.disableRTBtnLabel = new qx.ui.basic.Label("Disable Repair Unlock:").set({font: "font_size_14_bold"});
//					
//					this.disableRTBtn_Yes = new qx.ui.form.RadioButton("Yes");
//					this.disableRTBtn_Yes.addListener("click", this.disableRTBtn, this);
//					
//					this.disableRTBtn_No = new qx.ui.form.RadioButton("No");
//					this.disableRTBtn_No.addListener("click", this.disableRTBtn, this);
//					
//					if(typeof isRTDisabled != 'undefined')
//					{
//						if (isRTDisabled == "yes")
//						{
//							this.disableRTBtn_Yes.setValue(true);
//							this.disableRTBtn_No.setValue(false);
//							
//						}
//						else
//						{
//							this.disableRTBtn_No.setValue(true);
//							this.disableRTBtn_Yes.setValue(false);
//						}
//					}
//					else
//					{
//						this.disableRTBtn_No.setValue(true);
//						this.disableRTBtn_Yes.setValue(false);
//					}
//					
//					this.disableRTBtn_Group = new qx.ui.form.RadioGroup();
//					this.disableRTBtn_Group.add(this.disableRTBtn_Yes, this.disableRTBtn_No);
//					
//					this.add(this.disableRTBtnLabel, {row:6, column:0, colSpan: 2});
//					this.add(this.disableRTBtn_Yes, {row:7, column:0});
//					this.add(this.disableRTBtn_No, {row:7, column:1});
//					
//					//Auto Stat Window Open//
//					this.autoStatLabel = new qx.ui.basic.Label("Stat Window Auto Open:").set({font: "font_size_14_bold"});
//					
//					this.autoStat_Yes = new qx.ui.form.RadioButton("Yes");
//					this.autoStat_Yes.addListener("click", this.setAutoStatWindow, this);
//					
//					this.autoStat_No = new qx.ui.form.RadioButton("No");
//					this.autoStat_No.addListener("click", this.setAutoStatWindow, this);
//					
//					if(typeof autoOpenStat != 'undefined')
//					{
//						if (autoOpenStat == "yes")
//						{
//							this.autoStat_Yes.setValue(true);
//							this.autoStat_No.setValue(false);
//							
//						}
//						else
//						{
//							this.autoStat_No.setValue(true);
//							this.autoStat_Yes.setValue(false);
//						}
//					}
//					else
//					{
//						this.autoStat_Yes.setValue(true);
//						this.autoStat_No.setValue(false);
//					}
//					
//					this.autoStat_Group = new qx.ui.form.RadioGroup();
//					this.autoStat_Group.add(this.autoStat_Yes, this.autoStat_No);
//					
//					this.add(this.autoStatLabel, {row:8, column:0, colSpan: 2});
//					this.add(this.autoStat_Yes, {row:9, column:0});
//					this.add(this.autoStat_No, {row:9, column:1});
//					
//					//Show RT Only in Stat Window// aka Hide Crystals
//					this.showRTOnlyLabel = new qx.ui.basic.Label("Show RT Only:").set({font: "font_size_14_bold"});
//					
//					this.showRTOnly_Yes = new qx.ui.form.RadioButton("Yes");
//					this.showRTOnly_Yes.addListener("click", this.showRTOnly, this);
//					
//					this.showRTOnly_No = new qx.ui.form.RadioButton("No");
//					this.showRTOnly_No.addListener("click", this.showRTOnly, this);
//					
//					if(typeof showRTOnly != 'undefined')
//					{
//						if (showRTOnly == "yes")
//						{
//							this.showRTOnly_Yes.setValue(true);
//							this.showRTOnly_No.setValue(false);
//							
//						}
//						else
//						{
//							this.showRTOnly_No.setValue(true);
//							this.showRTOnly_Yes.setValue(false);
//						}
//					}
//					else
//					{
//						this.showRTOnly_Yes.setValue(false);
//						this.showRTOnly_No.setValue(true); //default
//					}
//					
//					this.showRTOnly_Group = new qx.ui.form.RadioGroup();
//					this.showRTOnly_Group.add(this.showRTOnly_Yes, this.showRTOnly_No);
//					
//					this.add(this.showRTOnlyLabel, {row:10, column:0, colSpan: 2});
//					this.add(this.showRTOnly_Yes, {row:11, column:0});
//					this.add(this.showRTOnly_No, {row:11, column:1});
//					
//					this.disableCmtBtn();
//					this.disableRTBtn();
//					this.resizeBtns();
//					this.setAutoStatWindow();
//					this.showRTOnly();
//				},
//				
//				destruct: function()
//				{
//				},
//				
//				members: 
//				{
//					moveBtns: function()
//					{
//						try 
//						{
//							if (this.moveBtn_Left.getValue())
//							{
//								console.log("Moving simulator buttons to the left");
//								
//								if (this.sizeBtn_Normal.getValue())
//								{
//									armyBar.add(simBtn,{
//										left: 13,
//										right: null,
//										bottom: 120
//									});
//									
//									armyBar.add(statBtn,{
//										left: 13,
//										right: null,
//										bottom: 82
//									});
//									
//									armyBar.add(optionBtn,{
//										left: 13,
//										right: null,
//										bottom: 44
//									});
//									armyBar.add(saveBtn,{
//										left: 13,
//										right: null,
//										bottom: 6
//									});
//									localStorage['isBtnNorm'] = "yes";
//								}
//								else
//								{
//									armyBar.add(simBtn,{
//										left: 83,
//										right: null,
//										bottom: 120
//									});
//									
//									armyBar.add(statBtn,{
//										left: 83,
//										right: null,
//										bottom: 82
//									});
//									
//									armyBar.add(optionBtn,{
//										left: 83,
//										right: null,
//										bottom: 44
//									});
//									armyBar.add(saveBtn,{
//										left: 83,
//										right: null,
//										bottom: 6
//									});
//									localStorage['isBtnNorm'] = "no";
//								}
//								playArea.add(shiftUpBtn,{
//									left: 80,
//									right: null,
//									bottom: 110
//								});
//								playArea.add(shiftDownBtn,{
//									left: 80,
//									right: null,
//									bottom: 70
//								});
//								playArea.add(shiftLeftBtn,{
//									left: 60,
//									right: null,
//									bottom: 90
//								});
//								playArea.add(shiftRightBtn,{
//									left: 100,
//									right: null,
//									bottom: 90
//								});
//								playArea.add(disableAllUnitsBtn,{
//									left: 70,
//									right: null,
//									bottom: 140
//								});
//								localStorage['isBtnRight'] = "no";
//							}
//							else
//							{
//								console.log("Moving simulator buttons to the right");
//								if (this.sizeBtn_Normal.getValue())
//								{
//									armyBar.add(simBtn,{
//										left: null,
//										right: 58,
//										bottom: 119
//									});
//									
//									armyBar.add(statBtn,{
//										left: null,
//										right: 58,
//										bottom: 81
//									});
//									
//									armyBar.add(optionBtn,{
//										left: null,
//										right: 58,
//										bottom: 43
//									});
//									armyBar.add(saveBtn,{
//										left: null,
//										right: 58,
//										bottom: 5
//									});
//									localStorage['isBtnNorm'] = "yes";
//								}
//								else
//								{
//									armyBar.add(simBtn,{
//										left: null,
//										right: 70,
//										bottom: 119
//									});
//									
//									armyBar.add(statBtn,{
//										left: null,
//										right: 70,
//										bottom: 81
//									});
//									
//									armyBar.add(optionBtn,{
//										left: null,
//										right: 70,
//										bottom: 43
//									});
//									armyBar.add(saveBtn,{
//										left: null,
//										right: 70,
//										bottom: 5
//									});
//									localStorage['isBtnNorm'] = "no";
//								}
//								playArea.add(shiftUpBtn,{
//									left: null,
//									right: 70,
//									bottom: 110
//								});
//								playArea.add(shiftDownBtn,{
//									left: null,
//									right: 70,
//									bottom: 70
//								});
//								playArea.add(shiftLeftBtn,{
//									left: null,
//									right: 90,
//									bottom: 90
//								});
//								playArea.add(shiftRightBtn,{
//									left: null,
//									right: 50,
//									bottom: 90
//								});
//								playArea.add(disableAllUnitsBtn,{
//									left: null,
//									right: 6,
//									bottom: 130
//								});
//								localStorage['isBtnRight'] = "yes";
//							}
//						}
//						catch(e)
//						{
//							console.log("Error Moving Buttons");
//							console.log(e.toString());
//						}
//					},
//					
//					resizeBtns: function()
//					{
//						try
//						{
//							if (this.sizeBtn_Normal.getValue())
//							{
//							console.log("Buttons Normal");
//								localStorage['isBtnNorm'] = "yes";
//								simBtn.setLabel("Simulation");
//								simBtn.setWidth(70);
//								
//								statBtn.setLabel("Ergebnisse");
//								statBtn.setWidth(70);
//								
//								optionBtn.setLabel("Optionen");
//								optionBtn.setWidth(70);
//								
//								saveBtn.setLabel("Layout");
//								saveBtn.setWidth(70);
//								
//								this.moveBtns();
//							}
//							else
//							{
//							console.log("Buttons Small");
//								localStorage['isBtnNorm'] = "no";
//								simBtn.setLabel("Sim");
//								simBtn.setWidth(40);
//								
//								statBtn.setLabel("Erg");
//								statBtn.setWidth(40);
//								
//								optionBtn.setLabel("Opt");
//								optionBtn.setWidth(40);
//								
//								saveBtn.setLabel("Lay");
//								saveBtn.setWidth(40);
//								
//								this.moveBtns();
//							}
//						}
//						catch(e)
//						{
//							console.log("Error resizing buttons");
//							console.log(e.toString());
//						}
//					},
//					
//					disableCmtBtn: function()
//					{
//						try
//						{
//							if (this.disableCmtBtn_Yes.getValue())
//							{
//								console.log("Disabling Combat Unlock Button");
//								unlockCmtBtn.hide();
//								localStorage['isCmtBtnDisabled'] = "yes";
//							}
//							else
//							{
//								console.log("Enabling Combat Unlock Button");
//								unlockCmtBtn.show();
//								localStorage['isCmtBtnDisabled'] = "no";
//							}
//						}
//						catch(e)
//						{
//							console.log("Error Enabling or Disabling Combat Unlock Button");
//							console.log(e.toString());
//						}
//					},
//					
//					disableRTBtn: function()
//					{
//						try
//						{								
//							if (this.disableRTBtn_Yes.getValue())
//							{
//								console.log("Disabling Repair Unlock Button");
//								unlockRTBtn.hide();
//								localStorage['isRTBtnDisabled'] = "yes";
//							}
//							else
//							{
//								console.log("Enabling Repair Unlock Button");
//								unlockRTBtn.show();
//								localStorage['isRTBtnDisabled'] = "no";
//							}
//						}
//						catch(e)
//						{
//							console.log("Error Enabling or Disabling Repair Unlock Button");
//							console.log(e.toString());
//						}
//					},
//					
//					setAutoStatWindow: function()
//					{
//						try
//						{								
//							if (this.autoStat_Yes.getValue())
//							{
//								console.log("Stat Window will open automatically");
//								localStorage['autoOpenStat'] = "yes";
//							}
//							else
//							{
//								console.log("Stat Window will not open automatically");
//								localStorage['autoOpenStat'] = "no";
//							}
//						}
//						catch(e)
//						{
//							console.log("Error setting Auto Stat Open");
//							console.log(e.toString());
//						}
//					},
//					
//					showRTOnly: function()
//					{
//						try
//						{								
//							if (this.showRTOnly_Yes.getValue())
//							{
//								console.log("Stat Window set to show RT Only");
//								localStorage['showRTOnly'] = "yes";
//							}
//							else
//							{
//								console.log("Stat Window set to show both RT and Crystals");
//								localStorage['showRTOnly'] = "no";
//							}
//						}
//						catch(e)
//						{
//							console.log("Error setting Auto Stat Open");
//							console.log(e.toString());
//						}
//					}
//				}
//			});
//		}
//		
//		function onViewChanged(oldMode, newMode)
//		{
//			try
//			{
//				console.log("View Changed");
//				if (Simulator.StatWindow.getInstance().isVisible() && newMode != ClientLib.Vis.Mode.CombatSetup )
//				{
//					Simulator.StatWindow.getInstance().close();
//				}
//				else if (!Simulator.StatWindow.getInstance().isVisible() && newMode == ClientLib.Vis.Mode.CombatSetup)
//				{
//					var autoStatOpen = localStorage['autoOpenStat'];
//					if (typeof autoStatOpen != 'undefined')
//					{
//						if (autoStatOpen == "yes")
//						{
//							//Why not auto-open the Stat window? Sounds like a good idea
//							Simulator.StatWindow.getInstance().open();
//							setTimeout(function() { Simulator.StatWindow.getInstance().calculateTotalBaseResources(); }, 2000);
//						}
//						
//					}
//					else
//					{
//						Simulator.StatWindow.getInstance().open();
//						setTimeout(function() { Simulator.StatWindow.getInstance().calculateTotalBaseResources(); }, 2000);
//					}
//				}
//				
//				
//				if (Simulator.OptionWindow.getInstance().isVisible())
//				{
//					Simulator.OptionWindow.getInstance().close();
//				}
//				
//				if ( ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity() != null)
//				{
//					var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Name();
//					var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Name();
//
//					//Don't want shift formation buttons showing up during combat or in own player's cities
//					if (newMode == ClientLib.Vis.Mode.Battleground || city == ownCity)
//					{
//						shiftUpBtn.hide();
//						shiftDownBtn.hide();
//						shiftLeftBtn.hide();
//						shiftRightBtn.hide();
//						disableAllUnitsBtn.hide();
//					}
//					else if (city != ownCity) 
//					{
//						shiftUpBtn.show();
//						shiftDownBtn.show();
//						shiftLeftBtn.show();
//						shiftRightBtn.show();
//						disableAllUnitsBtn.show();
//					}
//				}
//			}
//			catch(e)
//			{
//				console.log("Error closing windows or hiding buttons on view change");
//				console.log(e.toString());
//			}
//		}
//		function waitForGame() 
//		{
//			try 
//			{
//				if (typeof qx != 'undefined' && typeof qx.core != 'undfined' && typeof qx.core.Init != 'undefined') 
//				{
//					var app = qx.core.Init.getApplication();
//					if (app.initDone == true) 
//					{
//						try
//						{
//							createClasses();
//							
//							console.log("Creating phe.cnc function wraps");
//							
//							//Current Server patch (World 52 - US East Coast) uses phe
//							if (typeof phe.cnc.Util.attachNetEvent == 'undefined')
//								Simulator.getInstance().attachNetEvent = webfrontend.gui.Util.attachNetEvent;
//							else
//								Simulator.getInstance().attachNetEvent = phe.cnc.Util.attachNetEvent;
//                        
//							//Current Server patch (World 52 - US East Coast) uses webfrontend
//							if (typeof phe.cnc.gui.util == 'undefined')
//								Simulator.getInstance().formatNumbersCompact = webfrontend.gui.Util.formatNumbersCompact;    
//							else
//								Simulator.getInstance().formatNumbersCompact = phe.cnc.gui.util.Numbers.formatNumbersCompact;   
//							
//							// Strange Hacks
//							// don't try this at home ;)
//							if (typeof ClientLib.API.Util.GetUnitMaxHealth == 'undefined')
//								for (var key in ClientLib.Base.Util)
//								{
//									var strFunction = ClientLib.Base.Util[key].toString();
//									if ((strFunction.indexOf("function (a,b,c)") == 0 || strFunction.indexOf("function (a,b)") == 0) &&
//										 strFunction.indexOf("*=1.1") > -1)
//									{
//											Simulator.getInstance().GetUnitMaxHealth = ClientLib.Base.Util[key];
//											break;
//									}
//								}
//							else
//								Simulator.getInstance().GetUnitMaxHealth = ClientLib.API.Util.GetUnitMaxHealth;    
//								
//							Simulator.getInstance();
//							Simulator.StatWindow.getInstance();
//							Simulator.OptionWindow.getInstance();
//							Simulator.getInstance().attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this , onViewChanged);
//						}
//						catch(e)
//						{
//							console.log("Simulator initialization error:");
//							console.log(e);
//						}
//					} 
//					else
//						window.setTimeout(waitForGame, 1000);
//				} 
//				else 
//				{
//					window.setTimeout(waitForGame, 1000);
//				}
//			} 
//			catch (e) 
//			{
//				if (typeof console != 'undefined') console.log(e);
//				else if (window.opera) opera.postError(e);
//				else GM_log(e);
//			}
//		};
//		window.setTimeout(waitForGame, 1000);
//	}
//	
//	var script = document.createElement("script");
//    var txt = injectFunction.toString();
//	script.innerHTML = "(" + txt + ")();";
//	script.type = "text/javascript";
//    
//    document.getElementsByTagName("head")[0].appendChild(script);
//})();

(function () {
    var injectFunction = function () {
        function createClasses() {
            qx.Class.define("Simulator", {
                type: "singleton",
                extend: qx.core.Object,
                construct: function () {
                    try {
                        var qxApp = qx.core.Init.getApplication();
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

                        var i, img = {
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
                        this.simBtn = new qx.ui.form.Button(qxApp.tr("Simulate")).set({toolTipText: qxApp.tr("Opens Simulation Screen."), width: 60, height: 28, alignY: "middle", appearance: "button-text-small"});
                        this.simBtn.addListener("click", function () { this.__openSimulatorWindow(); }, this);
                        this.armyBar.add(this.simBtn, {left: null, right: 58, bottom: 119});

                        //Simulator Stats Button//
                        this.statBtn = new qx.ui.form.Button(qxApp.tr("Stats")).set({toolTipText: qxApp.tr("Opens Simulator Stats Window."), width: 60, height: 28, alignY: "middle", appearance: "button-text-small"});
                        this.statBtn.addListener("click", function () { this.__openStatWindow(); }, this);
                        this.armyBar.add(this.statBtn, {left: null, right: 58, bottom: 81});

                        //Simulator Options Button//
                        this.optionBtn = new qx.ui.form.Button(qxApp.tr("Options")).set({toolTipText: qxApp.tr("Opens Simulator Options."), width: 60, height: 28, alignY: "middle", appearance: "button-text-small"});
                        this.optionBtn.addListener("click", function () { this.__openOptionWindow(); }, this);
                        this.armyBar.add(this.optionBtn, {left: null, right: 58, bottom: 43});

                        //Simulator Layout Button//
                        this.layoutBtn = new qx.ui.form.Button(qxApp.tr("Layout")).set({toolTipText: qxApp.tr("Save/Load/Delete Unit Formations for current city."), width: 60, height: 28, alignY: "middle", appearance: "button-text-small"});
                        this.layoutBtn.addListener("click", function () { this.__openLayoutWindow(); }, this);
                        this.armyBar.add(this.layoutBtn, {left: null, right: 58, bottom: 6});

                        //Simulator Unlock Combat Button//
                        this.unlockCmtBtn = new qx.ui.form.Button(qxApp.tr("Unlock")).set({toolTipText: qxApp.tr("Unlock Combat Button."), width: 44, height: 44, opacity: 0.4, padding : 0, alignY: "middle", appearance: "button-text-small"});
                        this.unlockCmtBtn.addListener("click", function () { this.timeoutCmtBtn(); }, this);
                        this.armyBar.add(this.unlockCmtBtn, {left: null, right: 10, bottom: 8});

                        //Simulator Unlock Repair Time Button//
                        this.unlockRTBtn = new qx.ui.form.Button(qxApp.tr("Unlock")).set({toolTipText: qxApp.tr("Unlock Repair Button."), width: 44, height: 44, opacity: 0.4, padding : 0, alignY: "middle", appearance: "button-text-small"});
                        this.unlockRTBtn.addListener("click", function () { this.timeoutRTBtn(); }, this);
                        this.armyBar.add(this.unlockRTBtn, {left: null, right: 10, bottom: 100});

                        //Formation Shift Buttons//
                        this.shiftUpBtn = new qx.ui.form.Button("", img.Arrows.Up).set({toolTipText: qxApp.tr("Shifts units one space up."), width: 30, height: 20, alignY: "middle", appearance: "button-text-small", gap: 0, iconPosition: "top", show: "icon"});
                        this.shiftUpBtn.addListener("click", function () { this.shiftFormation("u"); }, this);
                        this.shiftUpBtn.hide();
                        this.playArea.add(this.shiftUpBtn, {left: null, right: 75, bottom: 113});

                        this.shiftDownBtn = new qx.ui.form.Button("", img.Arrows.Down).set({toolTipText: qxApp.tr("Shifts units one space down."), width: 30, height: 20, alignY: "middle", appearance: "button-text-small", gap: 0, iconPosition: "top", show: "icon"});
                        this.shiftDownBtn.addListener("click", function () { this.shiftFormation("d"); }, this);
                        this.shiftDownBtn.hide();
                        this.playArea.add(this.shiftDownBtn, {left: null, right: 75, bottom: 73});

                        this.shiftLeftBtn = new qx.ui.form.Button("", img.Arrows.Left).set({toolTipText: qxApp.tr("Shifts units one space left."), width: 30, height: 20, alignY: "middle", appearance: "button-text-small", gap: 0, iconPosition: "top", show: "icon"});
                        this.shiftLeftBtn.addListener("click", function () { this.shiftFormation("l"); }, this);
                        this.shiftLeftBtn.hide();
                        this.playArea.add(this.shiftLeftBtn, {left: null, right: 95, bottom: 93});

                        this.shiftRightBtn = new qx.ui.form.Button("", img.Arrows.Right).set({toolTipText: qxApp.tr("Shifts units one space right."), width: 30, height: 20, alignY: "middle", appearance: "button-text-small", gap: 0, iconPosition: "top", show: "icon"});
                        this.shiftRightBtn.addListener("click", function () { this.shiftFormation("r"); }, this);
                        this.shiftRightBtn.hide();
                        this.playArea.add(this.shiftRightBtn, {left: null, right: 55, bottom: 93});

                        for (i = 0; i < ClientLib.Base.Util.get_ArmyMaxSlotCountY(); i++) {
                            var btnMirrorH = new qx.ui.form.Button(i, img.Flip.H).set({toolTipText: qxApp.tr("Mirrors units horizontally."), width: 19, maxHeight: 25, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints"});
                            btnMirrorH.addListener("click", function (e) { this.mirrorFormation("h", parseInt(e.getTarget().getLabel(), 10)); }, this);
                            btnMirrorH.getChildControl("icon").set({width: 16, height: 16, scale: true});
                            var shiftLeftBtn = new qx.ui.form.Button(i, img.Arrows.Left).set({toolTipText: qxApp.tr("Shifts units one space left."), width: 20, maxHeight: 25, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints"});
                            shiftLeftBtn.addListener("click", function (e) { this.shiftFormation("l", parseInt(e.getTarget().getLabel(), 10)); }, this);
                            var shiftRightBtn = new qx.ui.form.Button(i, img.Arrows.Right).set({toolTipText: qxApp.tr("Shifts units one space right."), width: 20, maxHeight: 25, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints"});
                            shiftRightBtn.addListener("click", function (e) { this.shiftFormation("r", parseInt(e.getTarget().getLabel(), 10)); }, this);

                            var cntWave = this.armyBar.getMainContainer().getChildren()[(i+4)];
                            cntWave.removeAll();
                            cntWave.setLayout(new qx.ui.layout.HBox());
                            cntWave.add(btnMirrorH);
                            cntWave.add(new qx.ui.core.Spacer(), {flex: 1});
                            cntWave.add(shiftLeftBtn);
                            cntWave.add(shiftRightBtn);
                        }
                        var formation = this.armyBar.getMainContainer().getChildren()[1].getChildren()[0];
                        var btnHBox = new qx.ui.container.Composite(new qx.ui.layout.HBox());
                        var btnHBoxouter = new qx.ui.container.Composite(new qx.ui.layout.HBox());
                        btnHBoxouter.add(new qx.ui.core.Spacer(), {flex: 1});
                        btnHBoxouter.add(btnHBox);
                        btnHBoxouter.add(new qx.ui.core.Spacer(), {flex: 1});
                        this.armyBar.add(btnHBoxouter, { left : 16, top : 7, right : 0});
                        formation.bind("changeWidth", btnHBox, "width");

                        for (i = 0; i < ClientLib.Base.Util.get_ArmyMaxSlotCountX(); i++) {
                            var btnMirrorV = new qx.ui.form.Button(i, img.Flip.V).set({toolTipText: qxApp.tr("Mirrors units vertically."), width: 25, maxHeight: 19, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints", opacity: 0.3});
                            btnMirrorV.addListener("click", function (e) { this.mirrorFormation("v", parseInt(e.getTarget().getLabel(), 10)); }, this);
                            btnMirrorV.addListener("mouseover", function (e) { e.getTarget().set({opacity: 1.0}); }, this);
                            btnMirrorV.addListener("mouseout", function (e) { e.getTarget().set({opacity: 0.3}); }, this);
                            btnMirrorV.getChildControl("icon").set({width: 14, height: 14, scale: true});
                            var btnShiftUp = new qx.ui.form.Button(i, img.Arrows.Up).set({toolTipText: qxApp.tr("Shifts units one space up."), width: 25, maxHeight: 19, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints", opacity: 0.3});
                            btnShiftUp.addListener("click", function (e) { this.shiftFormation("u", parseInt(e.getTarget().getLabel(), 10)); }, this);
                            btnShiftUp.addListener("mouseover", function (e) { e.getTarget().set({opacity: 1.0}); }, this);
                            btnShiftUp.addListener("mouseout", function (e) { e.getTarget().set({opacity: 0.3}); }, this);
                            var btnShiftDown = new qx.ui.form.Button(i, img.Arrows.Down).set({toolTipText: qxApp.tr("Shifts units one space down."), width: 25, maxHeight: 19, alignY: "middle", show: "icon", iconPosition: "top", appearance: "button-addpoints", opacity: 0.3});
                            btnShiftDown.addListener("click", function (e) { this.shiftFormation("d", parseInt(e.getTarget().getLabel(), 10)); }, this);
                            btnShiftDown.addListener("mouseover", function (e) { e.getTarget().set({opacity: 1.0}); }, this);
                            btnShiftDown.addListener("mouseout", function (e) { e.getTarget().set({opacity: 0.3}); }, this);
                            btnHBox.add(new qx.ui.core.Spacer(), {flex: 1});
                            btnHBox.add(btnMirrorV);
                            btnHBox.add(new qx.ui.core.Spacer().set({ width: 2 }));
                            btnHBox.add(btnShiftUp);
                            btnHBox.add(btnShiftDown);
                            btnHBox.add(new qx.ui.core.Spacer(), {flex: 1});
                        }

                        //Formation Mirror Buttons//
                        this.mirrorBtnH = new qx.ui.form.Button("", img.Flip.H).set({toolTipText: qxApp.tr("Mirrors units horizontally."), show: "icon", width: 35, height: 35, center: true, alignY: "middle", appearance: "button-text-small"});
                        this.mirrorBtnH.getChildControl("icon").set({width: 20, height: 20, scale: true});
                        this.mirrorBtnH.addListener("click", function () { this.mirrorFormation("h"); }, this);
                        this.mirrorBtnH.hide();
                        this.playArea.add(this.mirrorBtnH, {left: null, right: 6, bottom: 160});

                        this.mirrorBtnV = new qx.ui.form.Button("", img.Flip.V).set({toolTipText: qxApp.tr("Mirrors units vertically."), show: "icon", width: 35, height: 35, center: true, alignY: "middle", appearance: "button-text-small"});
                        this.mirrorBtnV.getChildControl("icon").set({width: 20, height: 20, scale: true});
                        this.mirrorBtnV.addListener("click", function () { this.mirrorFormation("v"); }, this);
                        this.mirrorBtnV.hide();
                        this.playArea.add(this.mirrorBtnV, {left: null, right: 46, bottom: 160});

                        //Disable all Units Button//
                        this.disableAllUnitsBtn = new qx.ui.form.Button("", img.DisableUnit).set({toolTipText: qxApp.tr("Enables/Disables all units."), show: "icon", width: 35, height: 35, center: true, alignY: "middle", appearance: "button-text-small"});
                        this.disableAllUnitsBtn.getChildControl("icon").set({width: 20, height: 20, scale: true});
                        this.disableAllUnitsBtn.addListener("click", function () { this.shiftFormation("n"); }, this);
                        this.disableAllUnitsBtn.hide();
                        this.playArea.add(this.disableAllUnitsBtn, {left: null, right: 6, bottom: 120});

                        //Undo Button//
                        this.armyUndoBtn = new qx.ui.form.Button("", img.Undo).set({toolTipText: qxApp.tr("Undo's formation to previous saved formation.<br>Save formations by hitting<br>the Update or Simulate button."), show: "icon", width: 35, height: 35, center: true, alignY: "middle", appearance: "button-text-small"});
                        this.armyUndoBtn.getChildControl("icon").set({width: 20, height: 20, scale: true});
                        this.armyUndoBtn.addListener("click", function () { this.undoCurrentFormation(); }, this);
                        this.armyUndoBtn.setEnabled(false);
                        this.armyUndoBtn.hide();
                        this.playArea.add(this.armyUndoBtn, {left: null, right: 6, bottom: 200});

                        //Quick Save Button//
                        this.quickSaveBtn = new qx.ui.form.Button(qxApp.tr("QS")).set({toolTipText: qxApp.tr("Saves the current layout<br>without having to open<br>the Formation Saver window.<br>Does not make persistent."), width: 35, height: 35, alignY: "middle", appearance: "button-text-small"});
                        this.quickSaveBtn.addListener("click", function () { Simulator.LayoutWindow.getInstance().saveNewLayout(true); }, this);
                        this.quickSaveBtn.hide();
                        this.playArea.add(this.quickSaveBtn, {left: null, right: 6, bottom: 240});

                        //Simulator Back Button//
                        this.backBtn = new qx.ui.form.Button(qxApp.tr("Back")).set({toolTipText: qxApp.tr("Return to Combat Setup."), width: 50, height: 24, appearance: "button-text-small"});
                        this.backBtn.addListener("click", function () { this.backToCombatSetup(); }, this);
                        this.replayBar.add(this.backBtn, {top: 37, left: 255});

                        this.replayStatBtn = new qx.ui.form.Button(qxApp.tr("Stats")).set({toolTipText: qxApp.tr("Opens Simulator Stats Window."), width: 50, height: 24, appearance: "button-text-small"});
                        this.replayStatBtn.addListener("click", function () { this.__openStatWindow(); }, this);
                        this.replayBar.add(this.replayStatBtn, {top: 7, left: 255});

                        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this._onViewChanged);
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
                    _onViewChanged: function (oldMode, newMode) {
                        try {
                            if (newMode != ClientLib.Vis.Mode.CombatSetup && newMode != ClientLib.Vis.Mode.Battleground) {
                                Simulator.getInstance().armyTempFormations = [];
                                Simulator.getInstance().armyTempIdx = 0;
                                Simulator.getInstance().armyUndoBtn.setEnabled(false);
                                Simulator.getInstance().isSimulation = false;
                                localStorage['allUnitsDisabled'] = "no";
                            } else if (newMode == ClientLib.Vis.Mode.CombatSetup && oldMode != ClientLib.Vis.Mode.Battleground) {
                                Simulator.getInstance().saveTempFormation();
                            }

                            var cityId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Id();
                            var ownCityId = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Id();
                            if (ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity() !== null) {
                                if (newMode == ClientLib.Vis.Mode.Battleground || cityId == ownCityId) {
                                    Simulator.getInstance().shiftUpBtn.hide();
                                    Simulator.getInstance().shiftDownBtn.hide();
                                    Simulator.getInstance().shiftLeftBtn.hide();
                                    Simulator.getInstance().shiftRightBtn.hide();
                                    Simulator.getInstance().disableAllUnitsBtn.hide();
                                    Simulator.getInstance().mirrorBtnH.hide();
                                    Simulator.getInstance().mirrorBtnV.hide();
                                    Simulator.getInstance().armyUndoBtn.hide();
                                    Simulator.getInstance().quickSaveBtn.hide();
                                } else if (cityId != ownCityId) {
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
                    },
                    __openSimulatorWindow: function () {
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

                            if (autoSim !== undefined) {
                                if (autoSim == "yes") {
                                    var speed = localStorage['simulateSpeed'];
                                    setTimeout(function () {
                                        var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
                                        battleground.RestartReplay();
                                        battleground.set_ReplaySpeed(parseInt(speed, 10));
                                    }, 1000);
                                }
                            }

                            if (this.isSimButtonDisabled == false) {
                                this.disableSimulateButtonTimer(10000);
                                if (typeof Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer === "function") {
                                    Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(10000);
                                }
                            }

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
                    mirrorFormation: function (direction, sel) {
                        try {
                            console.log("Shifting Unit Formation");

                            var units = this.getCityPreArmyUnits().get_ArmyUnits().l;

                            var newLayout = [];
                            for (var i = 0; i < units.length; i++) {
                                var unit = units[i],
                                    armyUnit = {},
                                    x = unit.get_CoordX(),
                                    y = unit.get_CoordY();
                                if (direction == "h") x = Math.abs(x - 8);
                                if (direction == "v") y = Math.abs(y - 3);
                                if (sel !== undefined && unit.get_CoordY() != sel && direction == "h") armyUnit.x = unit.get_CoordX();
                                else armyUnit.x = x;
                                if (sel !== undefined && unit.get_CoordX() != sel && direction == "v") armyUnit.y = unit.get_CoordY();
                                else armyUnit.y = y;
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
                    shiftFormation: function (direction, sel) {
                        try {
                            var v_shift = 0;
                            var h_shift = 0;

                            if (direction == "u") var v_shift = -1;
                            if (direction == "d") var v_shift = 1;
                            if (direction == "l") var h_shift = -1;
                            if (direction == "r") var h_shift = 1;

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
                                if (sel !== undefined && unit.get_CoordY() != sel && (direction == "l" || direction == "r")) armyUnit.x = unit.get_CoordX();
                                else armyUnit.x = x;
                                if (sel !== undefined && unit.get_CoordX() != sel && (direction == "u" || direction == "d")) armyUnit.y = unit.get_CoordY();
                                else armyUnit.y = y;
                                armyUnit.id = unit.get_Id();

                                if (direction == "n") {
                                    if (localStorage['allUnitsDisabled'] !== undefined) {
                                        if (localStorage['allUnitsDisabled'] == "yes") {
                                            armyUnit.enabled = unit.set_Enabled(true);
                                        } else {
                                            armyUnit.enabled = unit.set_Enabled(false);
                                        }
                                    } else {
                                        armyUnit.enabled = unit.set_Enabled(false);
                                    }
                                }
                                armyUnit.enabled = unit.get_Enabled();
                                newLayout.push(armyUnit);
                            }
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
                        formationManager.set_CurrentTargetBaseId(city.get_Id());
                        return formationManager.GetFormationByTargetBaseId(formationManager.get_CurrentTargetBaseId());
                    },
                    timeoutCmtBtn: function () {
                        this.unlockCmtBtn.exclude();
                        setTimeout(function () {
                            Simulator.getInstance().unlockCmtBtn.show();
                        }, 3000);
                    },
                    timeoutRTBtn: function () {
                        this.unlockRTBtn.exclude();
                        setTimeout(function () {
                            Simulator.getInstance().unlockRTBtn.show();
                        }, 3000);
                    },
                    backToCombatSetup: function () {
                        try {
                            var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                            if (city != null) {
                                var app = qx.core.Init.getApplication();
                                app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, city.get_Id(), 0, 0);
                            }
                        } catch (e) {
                            console.log("Error closing Simulation Window");
                            console.log(e.toString());
                        }
                    },
                    disableSimulateButtonTimer: function (timer) {
                        try {
                            if (timer >= 100) {
                                this.isSimButtonDisabled = true;
                                this.simBtn.setEnabled(false);
                                this.simBtn.setLabel(Math.floor(timer / 100));
                                timer -= 100;
                                setTimeout(function () {
                                    Simulator.getInstance().disableSimulateButtonTimer(timer);
                                }, 100);
                            } else {
                                setTimeout(function () {
                                    var qxApp = qx.core.Init.getApplication();
                                    Simulator.getInstance().simBtn.setEnabled(true);
                                    if (Simulator.OptionWindow.getInstance()._buttonSizeCB.getValue())
                                        Simulator.getInstance().simBtn.setLabel(qxApp.tr("Sim"));
                                    else
                                        Simulator.getInstance().simBtn.setLabel(qxApp.tr("Sim"));
                                }, timer);
                                this.isSimButtonDisabled = false;
                            }
                        } catch (e) {
                            console.log("Error disabling simulator button");
                            console.log(e.toString());
                        }
                    },
                    hideArmyTooltips: function () {
                        try {
                            if (localStorage["ArmyUnitTooltipDisabled"] === undefined) localStorage["ArmyUnitTooltipDisabled"] = "yes";
                            var Baseview = ClientLib.Vis.BaseView.BaseView.prototype;
                            for (var i in Baseview) {
                                if (typeof Baseview[i] === "function" && Baseview[i] === Baseview.ShowToolTip) {
                                    Baseview.ShowToolTip2 = Baseview[i];
                                    Baseview[i] = function (a) {
                                        if (ClientLib.Vis.VisMain.GetInstance().get_Mode() == ClientLib.Vis.Mode.CombatSetup && localStorage['ArmyUnitTooltipDisabled'] == 'yes') return;
                                        else this.ShowToolTip2(a);
                                    };
                                    break;
                                }
                            }
                            var ArmyUnitTooltipOverlay = qx.core.Init.getApplication().getArmyUnitTooltipOverlay();
                            ArmyUnitTooltipOverlay.setVisibility2 = ArmyUnitTooltipOverlay.setVisibility;
                            ArmyUnitTooltipOverlay.setVisibility = function (a) {
                                if (localStorage["ArmyUnitTooltipDisabled"] == "yes") this.setVisibility2(false);
                                else this.setVisibility2(a);
                            };
                        } catch (e) {
                            console.log("Error hideArmyTooltips()");
                            console.log(e.toString());
                        }
                    }
                }
            });
            qx.Class.define("Simulator.StatWindow", {
                type: "singleton",
                extend: qx.ui.window.Window,
                construct: function () {
                    try {
                        var qxApp = qx.core.Init.getApplication();
                        this.base(arguments);

                        this.set({
                            layout: new qx.ui.layout.VBox().set({
                                spacing: 0
                            }),
                            caption: qxApp.tr("Simulator") + " - " + qxApp.tr("Stats"),
                            icon: "FactionUI/icons/icon_res_plinfo_command_points.png",
                            contentPadding: 5,
                            contentPaddingTop: 0,
                            allowMaximize: false,
                            showMaximize: false,
                            allowMinimize: false,
                            showMinimize: false,
                            resizable: true,
                            resizableTop: false,
                            resizableBottom: false
                        });
                        this.getChildControl("icon").set({ width : 18, height : 18, scale : true, alignY : "middle" });

                        if (localStorage['statWindowPosLeft'] !== undefined) {
                            var left = parseInt(localStorage['statWindowPosLeft'], 10);
                            var top = parseInt(localStorage['statWindowPosTop'], 10);
                            this.moveTo(left, top);
                        } else {
                            this.moveTo(124, 31);
                        }

                        if (localStorage['simViews'] !== undefined) {
                            this.simViews = parseInt(localStorage['simViews'], 10);
                        } else {
                            this.simViews = 3;
                        }

                        this.isSimStatButtonDisabled = false;

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

                        //Battle Section//
                        this.Battle = new qx.ui.container.Composite(new qx.ui.layout.HBox(-3)).set({decorator: "pane-light-plain", allowGrowX: true, marginLeft: 0, marginRight: 0});
                        var BattleLables = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({width: 29, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0});

                        var BattleOutcome = new qx.ui.basic.Label("O").set({toolTipText: qxApp.tr("tnf:combat report"), alignX: "center", alignY: "middle"});
                        var BattleDuration = new qx.ui.basic.Label("D").set({toolTipText: qxApp.tr("tnf:combat timer npc: %1", ""), alignX: "center", alignY: "middle"});
                        var BattleOwnCity = new qx.ui.basic.Label("B").set({toolTipText: qxApp.tr("tnf:base"), alignX: "center", alignY: "middle"});

                        BattleLables.add(BattleOutcome);
                        BattleLables.add(BattleDuration);
                        BattleLables.add(BattleOwnCity);
                        this.Battle.add(BattleLables);
                        this.add(this.Battle);

                        //Enemy Health Section//
                        var EnemyHealthHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({decorator: "pane-light-opaque"});
                        EnemyHealthHeader.add(new qx.ui.basic.Label(qxApp.tr("tnf:combat target")).set({alignX: "center", alignY: "middle", paddingBottom: 5, font: "font_size_13_bold"}));
                        this.add(EnemyHealthHeader);

                        this.EnemyHealth = new qx.ui.container.Composite(new qx.ui.layout.HBox(0)).set({decorator: "pane-light-plain", allowGrowX: true, marginLeft: 0, marginRight: 0});
                        var EnemyHealthLabels = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({width: 29, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0});

                        var EnemyHealthLabelOverall = new qx.ui.basic.Atom(null, img.Enemy.All).set({toolTipText: qxApp.tr("tnf:total"), toolTipIcon: img.Enemy.All, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var EnemyHealthLabelBase = new qx.ui.basic.Atom(null, img.Enemy.Base).set({toolTipText: qxApp.tr("tnf:base"), toolTipIcon: img.Enemy.Base, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var EnemyHealthLabelDefense = new qx.ui.basic.Atom(null, img.Enemy.Defense).set({toolTipText: qxApp.tr("tnf:defense"), toolTipIcon: img.Enemy.Defense, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var EnemyHealthLabelCY = new qx.ui.basic.Label("CY").set({toolTipText: GAMEDATA.Tech[1].dn, alignX: "center", alignY: "middle"});
                        var EnemyHealthLabelDF = new qx.ui.basic.Label("DF").set({toolTipText: GAMEDATA.Tech[42].dn, alignX: "center", alignY: "middle"});
                        var EnemyHealthLabelCC = new qx.ui.basic.Label("CC").set({toolTipText: GAMEDATA.Tech[24].dn, alignX: "center", alignY: "middle"});

                        EnemyHealthLabelOverall.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        EnemyHealthLabelBase.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        EnemyHealthLabelDefense.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});

                        EnemyHealthLabels.add(EnemyHealthLabelOverall);
                        EnemyHealthLabels.add(EnemyHealthLabelBase);
                        EnemyHealthLabels.add(EnemyHealthLabelDefense);
                        EnemyHealthLabels.add(EnemyHealthLabelCY);
                        EnemyHealthLabels.add(EnemyHealthLabelDF);
                        EnemyHealthLabels.add(EnemyHealthLabelCC);
                        this.EnemyHealth.add(EnemyHealthLabels);
                        this.add(this.EnemyHealth);

                        //Repair Section//
                        var RepairHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({decorator: "pane-light-opaque"});
                        RepairHeader.add(new qx.ui.basic.Label(qxApp.tr("tnf:own repair cost")).set({alignX: "center", alignY: "middle", paddingBottom: 5, font: "font_size_13_bold"}));
                        this.add(RepairHeader);

                        this.Repair = new qx.ui.container.Composite(new qx.ui.layout.HBox(-3)).set({decorator: "pane-light-plain", allowGrowX: true, marginLeft: 0, marginRight: 0});
                        var RepairLabels = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({width: 29, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0});

                        var pRLabelStorage = new qx.ui.basic.Atom(null, img.Repair.Storage).set({toolTipText: qxApp.tr("tnf:offense repair time"), toolTipIcon: img.Repair.Storage, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var pRLabelOverall = new qx.ui.basic.Atom(null, img.Repair.Overall).set({toolTipText: qxApp.tr("tnf:repair points"), toolTipIcon: img.Repair.Overall, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var pRLabelInf = new qx.ui.basic.Atom(null, img.Repair.Infantry).set({toolTipText: qxApp.tr("tnf:infantry repair title"), toolTipIcon: img.Repair.Infantry, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var pRLabelVehi = new qx.ui.basic.Atom(null, img.Repair.Vehicle).set({toolTipText: qxApp.tr("tnf:vehicle repair title"), toolTipIcon: img.Repair.Vehicle, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var pRLabelAir = new qx.ui.basic.Atom(null, img.Repair.Aircraft).set({toolTipText: qxApp.tr("tnf:aircraft repair title"), toolTipIcon: img.Repair.Aircraft, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});

                        pRLabelStorage.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        pRLabelOverall.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        pRLabelInf.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        pRLabelVehi.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        pRLabelAir.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});

                        RepairLabels.add(pRLabelStorage);
                        RepairLabels.add(pRLabelOverall);
                        RepairLabels.add(pRLabelInf);
                        RepairLabels.add(pRLabelVehi);
                        RepairLabels.add(pRLabelAir);
                        this.Repair.add(RepairLabels);
                        this.add(this.Repair);

                        //Loot Section//
                        var LootHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({decorator: "pane-light-opaque"});
                        LootHeader.add(new qx.ui.basic.Label(qxApp.tr("tnf:lootable resources:")).set({alignX: "center", alignY: "middle", paddingBottom: 5, font: "font_size_13_bold"}));
                        this.add(LootHeader);

                        this.Loot = new qx.ui.container.Composite(new qx.ui.layout.HBox(-3)).set({decorator: "pane-light-plain", allowGrowX: true, marginLeft: 0, marginRight: 0});
                        var LootLabels = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({width: 29, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0});

                        var LootLabelTib = new qx.ui.basic.Atom(null, img.Loot.Tiberium).set({toolTipText: qxApp.tr("tnf:tiberium"), toolTipIcon: img.Loot.Tiberium, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var LootLabelCry = new qx.ui.basic.Atom(null, img.Loot.Crystal).set({toolTipText: qxApp.tr("tnf:crystals"), toolTipIcon: img.Loot.Crystal, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var LootLabelCred = new qx.ui.basic.Atom(null, img.Loot.Credits).set({toolTipText: qxApp.tr("tnf:credits"), toolTipIcon: img.Loot.Credits, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var LootLabelRP = new qx.ui.basic.Atom(null, img.Loot.RP).set({toolTipText: qxApp.tr("tnf:research points"), toolTipIcon: img.Loot.RP, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});
                        var LootLabelTotal = new qx.ui.basic.Atom(null, img.Loot.Total).set({toolTipText: qxApp.tr("tnf:total") + " " + qxApp.tr("tnf:loot"), toolTipIcon: img.Loot.Total, alignX: "center", alignY: "middle", gap: 0, iconPosition: "top"});

                        LootLabelTib.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        LootLabelCry.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        LootLabelCred.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        LootLabelRP.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});
                        LootLabelTotal.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});

                        LootLabels.add(LootLabelTib);
                        LootLabels.add(LootLabelCry);
                        LootLabels.add(LootLabelCred);
                        LootLabels.add(LootLabelRP);
                        LootLabels.add(LootLabelTotal);
                        this.Loot.add(LootLabels);
                        this.add(this.Loot);

                        //Simulate Button//
                        var simButton = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({decorator: "pane-light-opaque", allowGrowX: true, marginLeft: 0, marginRight: 0, padding: 5});
                        this.add(simButton);

                        this.simStatBtn = new qx.ui.form.Button(qxApp.tr("tnf:update")).set({allowGrowX: false});
                        this.simStatBtn.setToolTipText(qxApp.tr("Updates Simulation Stats."));
                        this.simStatBtn.addListener("click", this.simulateStats, this);

                        this.simReplayBtn = new qx.ui.form.Button(qxApp.tr("tnf:show combat")).set({allowGrowX: false});
                        this.simReplayBtn.setToolTipText(qxApp.tr("tnf:show battle replay"));
                        this.simReplayBtn.addListener("click", this.doSimReplay, this);

                        this.simReplayBtn.setEnabled(false);

                        simButton.add(this.simStatBtn, {width: "50%"});
                        simButton.add(this.simReplayBtn, {width: "50%"});

                        //Add Header Events//
                        EnemyHealthHeader.addListener("click", function () {
                            if (this.EnemyHealth.isVisible()) this.EnemyHealth.exclude();
                            else this.EnemyHealth.show();
                        }, this);

                        RepairHeader.addListener("click", function () {
                            if (this.Repair.isVisible()) this.Repair.exclude();
                            else this.Repair.show();
                        }, this);

                        LootHeader.addListener("click", function () {
                            if (this.Loot.isVisible()) this.Loot.exclude();
                            else this.Loot.show();
                        }, this);

                        //Hide Sections
                        if (localStorage['hideHealth'] !== undefined) {
                            if (localStorage['hideHealth'] == "yes") this.EnemyHealth.exclude();
                        }

                        if (localStorage['hideRepair'] !== undefined) {
                            if (localStorage['hideRepair'] == "yes") this.Repair.exclude();
                        }

                        if (localStorage['hideLoot'] !== undefined) {
                            if (localStorage['hideLoot'] == "yes") this.Loot.exclude();
                        }

                        /**
                         *   Setup Simulation Storage
                         */
                        for (var i = 0; i < this.simViews; i++) {
                            this.sim[i] = new this.Simulation(i);
                            this.sim[i].Select(this.simSelected);
                            this.Battle.add(this.sim[i].Label.Battle.container, { flex : 1 });
                            this.EnemyHealth.add(this.sim[i].Label.EnemyHealth.container, { flex : 1 });
                            this.Repair.add(this.sim[i].Label.Repair.container, { flex : 1 });
                            this.Loot.add(this.sim[i].Label.Loot.container, { flex : 1 });
                        }


                        //Events
                        phe.cnc.Util.attachNetEvent(ClientLib.API.Battleground.GetInstance(), "OnSimulateBattleFinished", ClientLib.API.OnSimulateBattleFinished, this, this.__OnSimulateBattleFinished);
                        phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, this._onViewChanged);
                        phe.cnc.base.Timer.getInstance().addListener("uiTick", this._onTick, this);
                    } catch (e) {
                        console.log("Error setting up Simulator.StatWindow Constructor: ");
                        console.log(e.toString());
                    }
                },
                destruct: function () {},
                members: {
                    Battle: null,
                    EnemyHealth: null,
                    Repair: null,
                    Loot: null,
                    simStatBtn: null,
                    simReplayBtn: null,
                    isSimStatButtonDisabled: null,
                    simSelected: 0,
                    simViews: 3,
                    sim: [],
                    Simulation: function (instance) {
                        try {
                            var simulated = false;
                            this.TargetCity = null;
                            this.OwnCity = null;
                            var Formation = null;
                            this.Result = null;
                            this.Label = {
                                Battle: {
                                    container: new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({width: 65, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0, decorator: "pane-light-opaque"}),
                                    Outcome:   new qx.ui.basic.Atom("-", null).set({alignX: "center", alignY: "middle", gap: 0, iconPosition: "top", show: "label"}),
                                    Duration:  new qx.ui.basic.Label("-:--").set({alignX: "center", alignY: "middle"}),
                                    OwnCity:   new qx.ui.basic.Label("-").set({alignX: "center", alignY: "middle"})
                                },
                                EnemyHealth: {
                                    container: new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({width: 65, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0, decorator: "pane-light-opaque"}),
                                    Overall:   new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                    Base:      new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                    Defense:   new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                    CY:        new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                    DF:        new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                    CC:        new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"})
                                },
                                Repair: {
                                    container: new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({width: 65, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0, decorator: "pane-light-opaque"}),
                                    Storage:   new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                    Overall:   new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle", rich: true}),
                                    Inf:       new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                    Vehi:      new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                    Air:       new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"})
                                },
                                Loot: {
                                    container: new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({width: 65, padding: 5, allowGrowX: true, marginLeft: 0, marginRight: 0, decorator: "pane-light-opaque"}),
                                    Tib:       new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                    Cry:       new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                    Cred:      new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                    RP:        new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"}),
                                    Overall:   new qx.ui.basic.Label("-").set({alignX: "right", alignY: "middle"})
                                }
                            };
                            var _StatsUnit = function () {
                                    this.StartHealth = 0;
                                    this.EndHealth = 0;
                                    this.MaxHealth = 0;
                                    this.Tib = 0;
                                    this.Cry = 0;
                                    this.RT = 0;
                                    this.getHP = function () {
                                        if (this.EndHealth == 0 && this.StartHealth == 0) return 0;
                                        else if (this.MaxHealth == 0) return 100;
                                        else return (this.EndHealth / this.MaxHealth) * 100;
                                    };
                                    this.getHPrel = function () {
                                        if (this.StartHealth == 0) return 0;
                                        else if (this.MaxHealth == 0) return -100;
                                        else return ((this.StartHealth - this.EndHealth) / this.MaxHealth) * -100;
                                    };
                            };
                            var _StatsLoot = function () {
                                    this.Base = 0;
                                    this.Battle = 0;
                            };
                            this.Stats = {
                                Battle: {
                                    Outcome:   0,
                                    Duration:  0,
                                    OwnCity:  ""
                                },
                                EnemyHealth: {
                                    Overall:   new _StatsUnit(),
                                    Base:      new _StatsUnit(),
                                    Defense:   new _StatsUnit(),
                                    CY:        new _StatsUnit(),
                                    DF:        new _StatsUnit(),
                                    CC:        new _StatsUnit()
                                },
                                Repair: {
                                    Storage:   0,
                                    Overall:   new _StatsUnit(),
                                    Inf:       new _StatsUnit(),
                                    Vehi:      new _StatsUnit(),
                                    Air:       new _StatsUnit()
                                },
                                Loot: {
                                    Tib:       new _StatsLoot(),
                                    Cry:       new _StatsLoot(),
                                    Cred:      new _StatsLoot(),
                                    RP:        new _StatsLoot(),
                                    Overall:   new _StatsLoot()
                                }
                            };
                            this.getLootFromCurrentCity = function () {
                                try {
                                    this.Stats.Loot.Tib.Base = 0;
                                    this.Stats.Loot.Cry.Base = 0;
                                    this.Stats.Loot.Cred.Base = 0;
                                    this.Stats.Loot.RP.Base = 0;
                                    this.Stats.Loot.Overall.Base = 0;
                                    var loot = ClientLib.API.Battleground.GetInstance().GetLootFromCurrentCity();
                                    for (var i = 0; i < loot.length; i++) {
                                        this.Stats.Loot.Overall.Base += loot[i].Count;
                                        switch (parseInt(loot[i].Type, 10)) {
                                        case ClientLib.Base.EResourceType.Tiberium:
                                            this.Stats.Loot.Tib.Base += loot[i].Count;
                                            break;
                                        case ClientLib.Base.EResourceType.Crystal:
                                            this.Stats.Loot.Cry.Base += loot[i].Count;
                                            break;
                                        case ClientLib.Base.EResourceType.Gold:
                                            this.Stats.Loot.Cred.Base += loot[i].Count;
                                            break;
                                        case ClientLib.Base.EResourceType.ResearchPoints:
                                            this.Stats.Loot.RP.Base += loot[i].Count;
                                            break;
                                        }
                                    }
                                } catch (e) {
                                    console.log("Error Getting Loot from Current City");
                                    console.log(e.toString());
                                }
                            };
                            this.setSimulation = function (data) {
                                simulated = true;
                                this.OwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                                this.Stats.Battle.OwnCity = this.OwnCity.get_Name();
                                this.saveFormation();
                                this.Result = [];
                                for (var i = 0; i < data.length; i++) this.Result.push(data[i].Value);
                            };
                            this.UpdateLabels = function () {
                                var qxApp = qx.core.Init.getApplication();
                                var formatTime = function (time) {
                                    return phe.cnc.Util.getTimespanString(time);
                                };
                                var setRTLabelColor = function (label, number) {
                                    if (number < 25) label.setTextColor("red");
                                    else if (number < 75) label.setTextColor("orangered");
                                    else label.setTextColor("darkgreen");
                                };
                                var setEHLabelColor = function (label, number) {
                                    if (number < 25) label.setTextColor("darkgreen");
                                    else if (number < 75) label.setTextColor("orangered");
                                    else label.setTextColor("red");
                                };

                                if (simulated) {
                                    //Battle.Outcome
                                    switch (this.Stats.Battle.Outcome) {
                                    case 1:
                                        this.Label.Battle.Outcome.resetLabel();
                                        this.Label.Battle.Outcome.set({ show: "icon" });
                                        this.Label.Battle.Outcome.setIcon("FactionUI/icons/icon_reports_total_defeat.png");
                                        this.Label.Battle.Outcome.setToolTipIcon("FactionUI/icons/icon_reports_total_defeat.png");
                                        this.Label.Battle.Outcome.setToolTipText(qxApp.tr("tnf:total defeat"));
                                        break;
                                    case 2:
                                        this.Label.Battle.Outcome.resetLabel();
                                        this.Label.Battle.Outcome.set({ show: "icon" });
                                        this.Label.Battle.Outcome.setIcon("FactionUI/icons/icon_reports_victory.png");
                                        this.Label.Battle.Outcome.setToolTipIcon("FactionUI/icons/icon_reports_victory.png");
                                        this.Label.Battle.Outcome.setToolTipText(qxApp.tr("tnf:victory"));
                                        break;
                                    case 3:
                                        this.Label.Battle.Outcome.resetLabel();
                                        this.Label.Battle.Outcome.set({ show: "icon" });
                                        this.Label.Battle.Outcome.setIcon("FactionUI/icons/icon_reports_total_victory.png");
                                        this.Label.Battle.Outcome.setToolTipIcon("FactionUI/icons/icon_reports_total_victory.png");
                                        this.Label.Battle.Outcome.setToolTipText(qxApp.tr("tnf:total victory"));
                                        break;
                                    }
                                    //Battle.Duration
                                    this.Label.Battle.Duration.setValue(formatTime(this.Stats.Battle.Duration/1000));
                                    //Battle.OwnCity
                                    if (this.OwnCity != null) this.Stats.Battle.OwnCity = this.OwnCity.get_Name();
                                    this.Label.Battle.OwnCity.setValue(this.Stats.Battle.OwnCity);

                                    switch (localStorage['getEHSelection']) {
                                    case "hp rel":
                                        //EnemyHealth.Overall
                                        this.Label.EnemyHealth.Overall.setValue(this.Stats.EnemyHealth.Overall.getHPrel().toFixed(2) + "%");
                                        this.Label.EnemyHealth.Overall.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.Overall.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Overall.Tib) + "<br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Overall.Cry));
                                        //EnemyHealth.Base
                                        this.Label.EnemyHealth.Base.setValue(this.Stats.EnemyHealth.Base.getHPrel().toFixed(2) + "%");
                                        this.Label.EnemyHealth.Base.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.Base.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Base.Tib));
                                        //EnemyHealth.Defense
                                        this.Label.EnemyHealth.Defense.setValue(this.Stats.EnemyHealth.Defense.getHPrel().toFixed(2) + "%");
                                        this.Label.EnemyHealth.Defense.setToolTipText(qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Defense.Tib) + "<br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Defense.Cry));
                                        //EnemyHealth.CY
                                        this.Label.EnemyHealth.CY.setValue(this.Stats.EnemyHealth.CY.getHPrel().toFixed(2) + "%");
                                        this.Label.EnemyHealth.CY.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.CY.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.CY.Tib));
                                        //EnemyHealth.DF
                                        this.Label.EnemyHealth.DF.setValue(this.Stats.EnemyHealth.DF.getHPrel().toFixed(2) + "%");
                                        this.Label.EnemyHealth.DF.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.DF.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.DF.Tib));
                                        //EnemyHealth.CC
                                        this.Label.EnemyHealth.CC.setValue(this.Stats.EnemyHealth.CC.getHPrel().toFixed(2) + "%");
                                        this.Label.EnemyHealth.CC.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.CC.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.CC.Tib));
                                        break;
                                    default: //"hp"
                                        //EnemyHealth.Overall
                                        this.Label.EnemyHealth.Overall.setValue(this.Stats.EnemyHealth.Overall.getHP().toFixed(2) + "%");
                                        this.Label.EnemyHealth.Overall.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.Overall.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Overall.Tib) + "<br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Overall.Cry));
                                        //EnemyHealth.Base
                                        this.Label.EnemyHealth.Base.setValue(this.Stats.EnemyHealth.Base.getHP().toFixed(2) + "%");
                                        this.Label.EnemyHealth.Base.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.Base.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Base.Tib));
                                        //EnemyHealth.Defense
                                        this.Label.EnemyHealth.Defense.setValue(this.Stats.EnemyHealth.Defense.getHP().toFixed(2) + "%");
                                        this.Label.EnemyHealth.Defense.setToolTipText(qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Defense.Tib) + "<br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.Defense.Cry));
                                        //EnemyHealth.CY
                                        this.Label.EnemyHealth.CY.setValue(this.Stats.EnemyHealth.CY.getHP().toFixed(2) + "%");
                                        this.Label.EnemyHealth.CY.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.CY.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.CY.Tib));
                                        //EnemyHealth.DF
                                        this.Label.EnemyHealth.DF.setValue(this.Stats.EnemyHealth.DF.getHP().toFixed(2) + "%");
                                        this.Label.EnemyHealth.DF.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.DF.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.DF.Tib));
                                        //EnemyHealth.CC
                                        this.Label.EnemyHealth.CC.setValue(this.Stats.EnemyHealth.CC.getHP().toFixed(2) + "%");
                                        this.Label.EnemyHealth.CC.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.EnemyHealth.CC.RT) + "<br>" + qxApp.tr("tnf:tiberium") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.EnemyHealth.CC.Tib));
                                        break;
                                    }
                                    //EnemyHealth.Overall
                                    setEHLabelColor(this.Label.EnemyHealth.Overall, this.Stats.EnemyHealth.Overall.getHP());
                                    //EnemyHealth.Base
                                    setEHLabelColor(this.Label.EnemyHealth.Base, this.Stats.EnemyHealth.Base.getHP());
                                    //EnemyHealth.Defense
                                    setEHLabelColor(this.Label.EnemyHealth.Defense, this.Stats.EnemyHealth.Defense.getHP());
                                    //EnemyHealth.CY
                                    setEHLabelColor(this.Label.EnemyHealth.CY, this.Stats.EnemyHealth.CY.getHP());
                                    //EnemyHealth.DF
                                    setEHLabelColor(this.Label.EnemyHealth.DF, this.Stats.EnemyHealth.DF.getHP());
                                    //EnemyHealth.CC
                                    setEHLabelColor(this.Label.EnemyHealth.CC, this.Stats.EnemyHealth.CC.getHP());

                                    //Repair.Storage
                                    if (this.OwnCity != null) this.Stats.Repair.Storage = Math.min(this.OwnCity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeInf), this.OwnCity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeVeh), this.OwnCity.GetResourceCount(ClientLib.Base.EResourceType.RepairChargeAir));
                                    this.Label.Repair.Storage.setValue(phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(this.Stats.Repair.Storage)));
                                    this.Label.Repair.Storage.setTextColor(this.Stats.Repair.Storage > this.Stats.Repair.Overall.RT ? "darkgreen" : "red");
                                    //Repair
                                    switch (localStorage['getRTSelection']) {
                                    case "cry":
                                        //Repair.Overall
                                        this.Label.Repair.Overall.setValue("<span style=\"text-shadow: 0 0 3pt;\">" + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry) + "</span>");
                                        this.Label.Repair.Overall.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Overall.RT) + "</br>" + qxApp.tr("tnf:health") + ": " + this.Stats.Repair.Overall.getHP().toFixed(2) + "%");
                                        //Repair.Inf
                                        this.Label.Repair.Inf.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Inf.Cry));
                                        this.Label.Repair.Inf.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Inf.RT) + "</br>" + qxApp.tr("tnf:health") + ": " + this.Stats.Repair.Inf.getHP().toFixed(2) + "%");
                                        //Repair.Vehi
                                        this.Label.Repair.Vehi.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Vehi.Cry));
                                        this.Label.Repair.Vehi.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Vehi.RT) + "</br>" + qxApp.tr("tnf:health") + ": " + this.Stats.Repair.Vehi.getHP().toFixed(2) + "%");
                                        //Repair.Air
                                        this.Label.Repair.Air.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Air.Cry));
                                        this.Label.Repair.Air.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Air.RT) + "</br>" + qxApp.tr("tnf:health") + ": " + this.Stats.Repair.Air.getHP().toFixed(2) + "%");
                                        break;
                                    case "hp":
                                        //Repair.Overall
                                        this.Label.Repair.Overall.setValue("<span style=\"text-shadow: 0 0 3pt;\">" + this.Stats.Repair.Overall.getHP().toFixed(2) + "%</span>");
                                        this.Label.Repair.Overall.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Overall.RT) + "</br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry));
                                        //Repair.Inf
                                        this.Label.Repair.Inf.setValue(this.Stats.Repair.Inf.getHP().toFixed(2) + "%");
                                        this.Label.Repair.Inf.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Inf.RT) + "</br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Inf.Cry));
                                        //Repair.Vehi
                                        this.Label.Repair.Vehi.setValue(this.Stats.Repair.Vehi.getHP().toFixed(2) + "%");
                                        this.Label.Repair.Vehi.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Vehi.RT) + "</br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Vehi.Cry));
                                        //Repair.Air
                                        this.Label.Repair.Air.setValue(this.Stats.Repair.Air.getHP().toFixed(2) + "%");
                                        this.Label.Repair.Air.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Air.RT) + "</br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Air.Cry));
                                        break;
                                    case "hp rel":
                                        //Repair.Overall
                                        this.Label.Repair.Overall.setValue("<span style=\"text-shadow: 0 0 3pt;\">" + this.Stats.Repair.Overall.getHPrel().toFixed(2) + "%</span>");
                                        this.Label.Repair.Overall.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Overall.RT) + "</br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry));
                                        //Repair.Inf
                                        this.Label.Repair.Inf.setValue(this.Stats.Repair.Inf.getHPrel().toFixed(2) + "%");
                                        this.Label.Repair.Inf.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Inf.RT) + "</br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Inf.Cry));
                                        //Repair.Vehi
                                        this.Label.Repair.Vehi.setValue(this.Stats.Repair.Vehi.getHPrel().toFixed(2) + "%");
                                        this.Label.Repair.Vehi.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Vehi.RT) + "</br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Vehi.Cry));
                                        //Repair.Air
                                        this.Label.Repair.Air.setValue(this.Stats.Repair.Air.getHPrel().toFixed(2) + "%");
                                        this.Label.Repair.Air.setToolTipText(qxApp.tr("tnf:repair points") + ": " + formatTime(this.Stats.Repair.Air.RT) + "</br>" + qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Air.Cry));
                                        break;
                                    default: //"rt"
                                        //Repair.Overall
                                        this.Label.Repair.Overall.setValue("<span style=\"text-shadow: 0 0 3pt;\">" + formatTime(this.Stats.Repair.Overall.RT) + "</span>");
                                        this.Label.Repair.Overall.setToolTipText(qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Overall.Cry) + "</br>" + qxApp.tr("tnf:health") + ": " + this.Stats.Repair.Overall.getHP().toFixed(2) + "%");
                                        //Repair.Inf
                                        this.Label.Repair.Inf.setValue(formatTime(this.Stats.Repair.Inf.RT));
                                        this.Label.Repair.Inf.setToolTipText(qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Inf.Cry) + "</br>" + qxApp.tr("tnf:health") + ": " + this.Stats.Repair.Inf.getHP().toFixed(2) + "%");
                                        //Repair.Vehi
                                        this.Label.Repair.Vehi.setValue(formatTime(this.Stats.Repair.Vehi.RT));
                                        this.Label.Repair.Vehi.setToolTipText(qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Vehi.Cry) + "</br>" + qxApp.tr("tnf:health") + ": " + this.Stats.Repair.Vehi.getHP().toFixed(2) + "%");
                                        //Repair.Air
                                        this.Label.Repair.Air.setValue(formatTime(this.Stats.Repair.Air.RT));
                                        this.Label.Repair.Air.setToolTipText(qxApp.tr("tnf:crystals") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Repair.Air.Cry) + "</br>" + qxApp.tr("tnf:health") + ": " + this.Stats.Repair.Air.getHP().toFixed(2) + "%");
                                        break;
                                    }

                                    //Repair.Overall
                                    setRTLabelColor(this.Label.Repair.Overall, this.Stats.Repair.Overall.getHP());
                                    //Repair.Inf
                                    setRTLabelColor(this.Label.Repair.Inf, this.Stats.Repair.Inf.getHP());
                                    if (this.Stats.Repair.Inf.RT === this.Stats.Repair.Overall.RT && this.Stats.Repair.Inf.getHP() < 100) this.Label.Repair.Inf.setTextColor("black");
                                    //Repair.Vehi
                                    setRTLabelColor(this.Label.Repair.Vehi, this.Stats.Repair.Vehi.getHP());
                                    if (this.Stats.Repair.Vehi.RT === this.Stats.Repair.Overall.RT && this.Stats.Repair.Vehi.getHP() < 100) this.Label.Repair.Vehi.setTextColor("black");
                                    //Repair.Air
                                    setRTLabelColor(this.Label.Repair.Air, this.Stats.Repair.Air.getHP());
                                    if (this.Stats.Repair.Air.RT === this.Stats.Repair.Overall.RT && this.Stats.Repair.Air.getHP() < 100) this.Label.Repair.Air.setTextColor("black");

                                    //Loot.Tib
                                    this.Label.Loot.Tib.setToolTipText((this.Stats.Loot.Tib.Battle / this.Stats.Loot.Tib.Base * 100).toFixed(2) + "%<br>" + qxApp.tr("tnf:base") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Tib.Base));
                                    this.Label.Loot.Tib.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Tib.Battle));
                                    //Loot.Cry
                                    this.Label.Loot.Cry.setToolTipText((this.Stats.Loot.Cry.Battle / this.Stats.Loot.Cry.Base * 100).toFixed(2) + "%<br>" + qxApp.tr("tnf:base") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cry.Base));
                                    this.Label.Loot.Cry.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cry.Battle));
                                    //Loot.Cred
                                    this.Label.Loot.Cred.setToolTipText((this.Stats.Loot.Cred.Battle / this.Stats.Loot.Cred.Base * 100).toFixed(2) + "%<br>" + qxApp.tr("tnf:base") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cred.Base));
                                    this.Label.Loot.Cred.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cred.Battle));
                                    //Loot.RP
                                    this.Label.Loot.RP.setToolTipText((this.Stats.Loot.RP.Battle / this.Stats.Loot.RP.Base * 100).toFixed(2) + "%<br>" + qxApp.tr("tnf:base") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.RP.Base));
                                    this.Label.Loot.RP.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.RP.Battle));
                                    //Loot.Overall
                                    this.Label.Loot.Overall.setToolTipText((this.Stats.Loot.Overall.Battle / this.Stats.Loot.Overall.Base * 100).toFixed(2) + "%<br>" + qxApp.tr("tnf:base") + ": " + phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Overall.Base));
                                    this.Label.Loot.Overall.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Overall.Battle));
                                } else {
                                    if (this.Stats.Loot.Tib.Base > 0 || this.Stats.Loot.Cry.Base > 0 || this.Stats.Loot.Cred.Base > 0 || this.Stats.Loot.RP.Base > 0 || this.Stats.Loot.Overall.Base > 0) {
                                        //Loot.Tib
                                        this.Label.Loot.Tib.resetToolTipText();
                                        this.Label.Loot.Tib.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Tib.Base));
                                        //Loot.Cry
                                        this.Label.Loot.Cry.resetToolTipText();
                                        this.Label.Loot.Cry.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cry.Base));
                                        //Loot.Cred
                                        this.Label.Loot.Cred.resetToolTipText();
                                        this.Label.Loot.Cred.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Cred.Base));
                                        //Loot.RP
                                        this.Label.Loot.RP.resetToolTipText();
                                        this.Label.Loot.RP.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.RP.Base));
                                        //Loot.Overall
                                        this.Label.Loot.Overall.resetToolTipText();
                                        this.Label.Loot.Overall.setValue(phe.cnc.gui.util.Numbers.formatNumbersCompact(this.Stats.Loot.Overall.Base));
                                    }
                                }
                            };
                            this.ResetStats = function () {
                                this.Stats.Battle.Outcome = 0;
                                this.Stats.Battle.Duration = 0;
                                this.Stats.Battle.OwnCity = "";
                                this.Stats.EnemyHealth.Overall = new _StatsUnit();
                                this.Stats.EnemyHealth.Base = new _StatsUnit();
                                this.Stats.EnemyHealth.Defense = new _StatsUnit();
                                this.Stats.EnemyHealth.CY = new _StatsUnit();
                                this.Stats.EnemyHealth.DF = new _StatsUnit();
                                this.Stats.EnemyHealth.CC = new _StatsUnit();
                                this.Stats.Repair.Storage = 0;
                                this.Stats.Repair.Overall = new _StatsUnit();
                                this.Stats.Repair.Inf = new _StatsUnit();
                                this.Stats.Repair.Vehi = new _StatsUnit();
                                this.Stats.Repair.Air = new _StatsUnit();
                                this.Stats.Loot.Tib.Battle = 0;
                                this.Stats.Loot.Cry.Battle = 0;
                                this.Stats.Loot.Cred.Battle = 0;
                                this.Stats.Loot.RP.Battle = 0;
                                this.Stats.Loot.Overall.Battle = 0;
                            };
                            this.ResetLabels = function () {
                                this.Label.Battle.Outcome.resetIcon();
                                this.Label.Battle.Outcome.resetToolTipIcon();
                                this.Label.Battle.Outcome.resetToolTipText();
                                this.Label.Battle.Outcome.setShow("label");
                                this.Label.Battle.Outcome.setLabel("-");
                                this.Label.Battle.Duration.setValue("-:--");
                                this.Label.Battle.OwnCity.setValue("-");
                                this.Label.EnemyHealth.Overall.setValue("-");
                                this.Label.EnemyHealth.Overall.resetToolTipText();
                                this.Label.EnemyHealth.Overall.resetTextColor();
                                this.Label.EnemyHealth.Base.setValue("-");
                                this.Label.EnemyHealth.Base.resetToolTipText();
                                this.Label.EnemyHealth.Base.resetTextColor();
                                this.Label.EnemyHealth.Defense.setValue("-");
                                this.Label.EnemyHealth.Defense.resetToolTipText();
                                this.Label.EnemyHealth.Defense.resetTextColor();
                                this.Label.EnemyHealth.CY.setValue("-");
                                this.Label.EnemyHealth.CY.resetToolTipText();
                                this.Label.EnemyHealth.CY.resetTextColor();
                                this.Label.EnemyHealth.DF.setValue("-");
                                this.Label.EnemyHealth.DF.resetToolTipText();
                                this.Label.EnemyHealth.DF.resetTextColor();
                                this.Label.EnemyHealth.CC.setValue("-");
                                this.Label.EnemyHealth.CC.resetToolTipText();
                                this.Label.EnemyHealth.CC.resetTextColor();
                                this.Label.Repair.Storage.setValue("-");
                                this.Label.Repair.Storage.resetToolTipText();
                                this.Label.Repair.Storage.resetTextColor();
                                this.Label.Repair.Overall.setValue("-");
                                this.Label.Repair.Overall.resetToolTipText();
                                this.Label.Repair.Overall.resetTextColor();
                                this.Label.Repair.Inf.setValue("-");
                                this.Label.Repair.Inf.resetToolTipText();
                                this.Label.Repair.Inf.resetTextColor();
                                this.Label.Repair.Vehi.setValue("-");
                                this.Label.Repair.Vehi.resetToolTipText();
                                this.Label.Repair.Vehi.resetTextColor();
                                this.Label.Repair.Air.setValue("-");
                                this.Label.Repair.Air.resetToolTipText();
                                this.Label.Repair.Air.resetTextColor();
                                this.Label.Loot.Tib.setValue("-");
                                this.Label.Loot.Tib.resetToolTipText();
                                this.Label.Loot.Tib.resetTextColor();
                                this.Label.Loot.Cry.setValue("-");
                                this.Label.Loot.Cry.resetToolTipText();
                                this.Label.Loot.Cry.resetTextColor();
                                this.Label.Loot.Cred.setValue("-");
                                this.Label.Loot.Cred.resetToolTipText();
                                this.Label.Loot.Cred.resetTextColor();
                                this.Label.Loot.RP.setValue("-");
                                this.Label.Loot.RP.resetToolTipText();
                                this.Label.Loot.RP.resetTextColor();
                                this.Label.Loot.Overall.setValue("-");
                                this.Label.Loot.Overall.resetToolTipText();
                                this.Label.Loot.Overall.resetTextColor();
                            };
                            this.Reset = function () {
                                var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                                if (this.TargetCity === null || ownCity.get_CityArmyFormationsManager().get_CurrentTargetBaseId() != this.TargetCity.get_Id()) {
                                    simulated = false;
                                    this.OwnCity = null;
                                    this.TargetCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                                    ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(this.TargetCity.get_Id());
                                    this.ResetStats();
                                    this.ResetLabels();
//                                    this.getLootFromCurrentCity();
                                }
                            };
                            this.Select = function (selected) {
                                if (selected == instance) {
                                    var j = "pane-light-opaque";
                                    var k = 1;
                                } else {
                                    var j = "pane-light-plain";
                                    var k = 0.6;
                                }
                                this.Label.Battle.container.set({ decorator: j, opacity: k });
                                this.Label.EnemyHealth.container.set({ decorator: j, opacity: k });
                                this.Label.Repair.container.set({ decorator: j, opacity: k });
                                this.Label.Loot.container.set({ decorator: j, opacity: k });
                            };
                            this.saveFormation = function () {
                                try {
                                    Formation = [];
                                    var unitList = Simulator.getInstance().getCityPreArmyUnits().get_ArmyUnits().l;

                                    for (var i = 0; i < unitList.length; i++) {
                                        var unit = unitList[i];
                                        var unitInfo = {};
                                        unitInfo.x = unit.get_CoordX();
                                        unitInfo.y = unit.get_CoordY();
                                        unitInfo.id = unit.get_Id();
                                        unitInfo.enabled = unit.get_Enabled();

                                        Formation.push(unitInfo);
                                    }
                                } catch (e) {
                                    console.log("Error Saving Stat Formation");
                                    console.log(e.toString());
                                }
                            };
                            this.loadFormation = function () {
                                try {
                                    var cities = ClientLib.Data.MainData.GetInstance().get_Cities();
                                    cities.set_CurrentOwnCityId(this.OwnCity.get_Id());
                                    Simulator.getInstance().restoreFormation(Formation);
                                } catch (e) {
                                    console.log("Error loading Stat Formation");
                                    console.log(e.toString());
                                }
                            };

                            // Setup icons
                            this.Label.Battle.Outcome.getChildControl("icon").set({width: 18, height: 18, scale: true, alignY : "middle"});

                            // Setup containers
                            this.Label.Battle.container.add(this.Label.Battle.Outcome);
                            this.Label.Battle.container.add(this.Label.Battle.Duration);
                            this.Label.Battle.container.add(this.Label.Battle.OwnCity);
                            this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.Overall);
                            this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.Base);
                            this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.Defense);
                            this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.CY);
                            this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.DF);
                            this.Label.EnemyHealth.container.add(this.Label.EnemyHealth.CC);
                            this.Label.Repair.container.add(this.Label.Repair.Storage);
                            this.Label.Repair.container.add(this.Label.Repair.Overall);
                            this.Label.Repair.container.add(this.Label.Repair.Inf);
                            this.Label.Repair.container.add(this.Label.Repair.Vehi);
                            this.Label.Repair.container.add(this.Label.Repair.Air);
                            this.Label.Loot.container.add(this.Label.Loot.Tib);
                            this.Label.Loot.container.add(this.Label.Loot.Cry);
                            this.Label.Loot.container.add(this.Label.Loot.Cred);
                            this.Label.Loot.container.add(this.Label.Loot.RP);
                            this.Label.Loot.container.add(this.Label.Loot.Overall);

                            // Setup Events
                            this.Label.Battle.container.addListener("click", function () { Simulator.StatWindow.getInstance().simSelected = instance; for (var i = 0; i < Simulator.StatWindow.getInstance().sim.length; i++) { Simulator.StatWindow.getInstance().sim[i].Select(instance); } }, this);
                            this.Label.EnemyHealth.container.addListener("click", function () { Simulator.StatWindow.getInstance().simSelected = instance; for (var i = 0; i < Simulator.StatWindow.getInstance().sim.length; i++) { Simulator.StatWindow.getInstance().sim[i].Select(instance); } }, this);
                            this.Label.Repair.container.addListener("click", function () { Simulator.StatWindow.getInstance().simSelected = instance; for (var i = 0; i < Simulator.StatWindow.getInstance().sim.length; i++) { Simulator.StatWindow.getInstance().sim[i].Select(instance); } }, this);
                            this.Label.Loot.container.addListener("click", function () { Simulator.StatWindow.getInstance().simSelected = instance; for (var i = 0; i < Simulator.StatWindow.getInstance().sim.length; i++) { Simulator.StatWindow.getInstance().sim[i].Select(instance); } }, this);
                            this.Label.Battle.container.addListener("dblclick", function () { this.loadFormation(); }, this);
                            this.Label.EnemyHealth.container.addListener("dblclick", function () { this.loadFormation(); }, this);
                            this.Label.Repair.container.addListener("dblclick", function () { this.loadFormation(); }, this);
                            this.Label.Loot.container.addListener("dblclick", function () { this.loadFormation(); }, this);
                            this.Label.EnemyHealth.container.addListener("contextmenu", function () {
                                if (localStorage['getEHSelection'] == "hp rel") localStorage['getEHSelection'] = "hp";
                                else localStorage['getEHSelection'] = "hp rel";
                            }, this);
                            this.Label.Repair.container.addListener("contextmenu", function () {
                                if (localStorage['getRTSelection'] == "cry") localStorage['getRTSelection'] = "rt";
                                else if (localStorage['getRTSelection'] == "hp") localStorage['getRTSelection'] = "hp rel";
                                else if (localStorage['getRTSelection'] == "hp rel") localStorage['getRTSelection'] = "cry";
                                else localStorage['getRTSelection'] = "hp";
                            }, this);
                        } catch (e) {
                            console.log("Error init Simulation");
                            console.log(e.toString());
                        }
                    },
                    simulateStats: function () {
                        var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                        if (city != null) {
                            ClientLib.Vis.VisMain.GetInstance().get_Battleground().Reset();
                            Simulator.getInstance().isSimulation = true;
                            Simulator.getInstance().saveTempFormation();
                            localStorage['ta_sim_last_city'] = city.get_Id();
                            var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                            ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
                            ClientLib.API.Battleground.GetInstance().SimulateBattle();
                        }
                    },
                    doSimReplay: function () {
                        try {
                            Simulator.getInstance().isSimulation = true;
                            var app = qx.core.Init.getApplication();
                            app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, localStorage['ta_sim_last_city'], 0, 0);

                            if (localStorage['autoSimulate'] !== undefined) {
                                if (localStorage['autoSimulate'] == "yes") {
                                    var speed = localStorage['simulateSpeed'];
                                    setTimeout(function () {
                                        var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
                                        battleground.RestartReplay();
                                        battleground.set_ReplaySpeed(parseInt(speed, 10));
                                    }, 1000);
                                }
                            }
                        } catch (e) {
                            console.log("Error attempting to show Simulation Replay");
                            console.log(e.toString());
                        }
                    },
                    calculateRepairCosts: function (id, level, sHealth, eHealth, mHealth) {
                        var repairCosts = { RT: 0, Cry: 0, Tib: 0 };
                        var dmgRatio = 1;
                        if (sHealth != eHealth) {
                            dmgRatio = (sHealth - eHealth) / mHealth;
                            var costs = ClientLib.API.Util.GetUnitRepairCosts(level, id, dmgRatio);

                            for (var idx = 0; idx < costs.length; idx++) {
                                var uCosts = costs[idx];
                                var cType = parseInt(uCosts.Type, 10);
                                switch (cType) {
                                case ClientLib.Base.EResourceType.Tiberium:
                                    repairCosts.Tib += uCosts.Count;
                                    break;
                                case ClientLib.Base.EResourceType.Crystal:
                                    repairCosts.Cry += uCosts.Count;
                                    break;
                                case ClientLib.Base.EResourceType.RepairChargeBase:
                                case ClientLib.Base.EResourceType.RepairChargeInf:
                                case ClientLib.Base.EResourceType.RepairChargeVeh:
                                case ClientLib.Base.EResourceType.RepairChargeAir:
                                    repairCosts.RT += uCosts.Count;
                                    break;
                                }
                            }

                            // Fix Repairtime for Forgotten
                            switch (ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_CityFaction()) {
                            case ClientLib.Base.EFactionType.GDIFaction:
                            case ClientLib.Base.EFactionType.NODFaction:
                                break;
                            default:
                                repairCosts.RT = dmgRatio * 3600;
                                break;
                            }

                        }
                        return repairCosts;
                    },
                    _onTick: function () {
                        for (var i = 0; i < this.sim.length; i++) this.sim[i].UpdateLabels();
                    },
                    _onViewChanged: function (oldMode, newMode) {
                        if (newMode == ClientLib.Vis.Mode.CombatSetup && oldMode != ClientLib.Vis.Mode.Battleground) {
                            this.getLootFromCurrentCity();
                            // Auto open StatWindow
                            if (localStorage['autoOpenStat'] !== undefined && localStorage['autoOpenStat'] == "yes") this.open();
                            else {
                                this.open();
                                localStorage['autoOpenStat'] = "yes"; // Default
                            }
                        } else if (newMode != ClientLib.Vis.Mode.CombatSetup && newMode != ClientLib.Vis.Mode.Battleground) {
                            this.close();
                        }
                    },
                    __OnSimulateBattleFinished: function (data) {
                        //Disable Simulate Button
                        if (this.isSimStatButtonDisabled == false) {
                            this.disableSimulateStatButtonTimer(10000);
                            if (typeof Simulator.getInstance().disableSimulateButtonTimer === "function") {
                                Simulator.getInstance().disableSimulateButtonTimer(10000);
                            }
                        }
                        if (this.simReplayBtn.getEnabled() == false) this.simReplayBtn.setEnabled(true);

                        this.sim[this.simSelected].setSimulation(data);
                        this.calcHealth(this.sim[this.simSelected]);
                        this.calcLoot(this.sim[this.simSelected]);
                        this.getBattleDuration(this.sim[this.simSelected]);
                    },
                    calcHealth: function (sim) {
                        try {
                            sim.ResetStats();
                            var costs = {};
                            var targetunits = [];
                            var ownunits = [];
                            for (var i = 0; i < sim.Result.length; i++) {
                                var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(sim.Result[i].t);
                                switch (unit.pt) {
                                case ClientLib.Base.EPlacementType.Structure:
                                case ClientLib.Base.EPlacementType.Defense:
                                    targetunits.push(sim.Result[i]);
                                    break;
                                case ClientLib.Base.EPlacementType.Offense:
                                    ownunits.push(sim.Result[i]);
                                    break;
                                }
                            }
                            ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(sim.TargetCity.get_Id());
                            for (var i = 0; i < targetunits.length; i++) {
                                var unitData = targetunits[i];
                                var unitMDBID = unitData.t;
                                var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unitMDBID);
                                var unitLevel = unitData.l;
                                var unitStartHealth = Math.floor(unitData.sh);
                                var unitEndHealth = Math.floor(unitData.h);
                                var unitMaxHealth = Math.floor((ClientLib.API.Util.GetUnitMaxHealthByLevel(unitLevel, unit, false)) * 16);
                                var unitPlacementType = unit.pt; // ClientLib.Base.EPlacementType
                                var unitMovementType = unit.mt; // ClientLib.Base.EUnitMovementType
                                switch (sim.TargetCity.get_CityFaction()) {
                                case ClientLib.Base.EFactionType.GDIFaction:
                                case ClientLib.Base.EFactionType.NODFaction:
                                    unitMaxHealth = Math.floor((ClientLib.API.Util.GetUnitMaxHealthByLevel(unitLevel, unit, true)) * 16);
                                    break;
                                }
                                costs = this.calculateRepairCosts(unitMDBID, unitLevel, unitStartHealth, unitEndHealth, unitMaxHealth);

                                switch (unitPlacementType) {
                                case ClientLib.Base.EPlacementType.Structure:
                                    sim.Stats.EnemyHealth.Overall.StartHealth += unitStartHealth;
                                    sim.Stats.EnemyHealth.Overall.EndHealth += unitEndHealth;
                                    sim.Stats.EnemyHealth.Overall.MaxHealth += unitMaxHealth;
                                    sim.Stats.EnemyHealth.Overall.RT += costs.RT;
                                    sim.Stats.EnemyHealth.Overall.Tib += costs.Tib;
                                    sim.Stats.EnemyHealth.Overall.Cry += costs.Cry;
                                    sim.Stats.EnemyHealth.Base.StartHealth += unitStartHealth;
                                    sim.Stats.EnemyHealth.Base.EndHealth += unitEndHealth;
                                    sim.Stats.EnemyHealth.Base.MaxHealth += unitMaxHealth;
                                    sim.Stats.EnemyHealth.Base.RT += costs.RT;
                                    sim.Stats.EnemyHealth.Base.Tib += costs.Tib;
                                    sim.Stats.EnemyHealth.Base.Cry += costs.Cry;
                                    switch (unitMDBID) {
                                    case 112: // GDI_Construction Yard
                                    case 151: // NOD_Construction Yard
                                    case 177: // FOR_Construction Yard
                                    case 233: // FOR_Fortress_BASE_Construction Yard
                                        sim.Stats.EnemyHealth.CY.StartHealth += unitStartHealth;
                                        sim.Stats.EnemyHealth.CY.EndHealth += unitEndHealth;
                                        sim.Stats.EnemyHealth.CY.MaxHealth += unitMaxHealth;
                                        sim.Stats.EnemyHealth.CY.RT += costs.RT;
                                        sim.Stats.EnemyHealth.CY.Tib += costs.Tib;
                                        sim.Stats.EnemyHealth.CY.Cry += costs.Cry;
                                        break;
                                    case 131: // GDI_Defense Facility
                                    case 158: // NOD_Defense Facility
                                    case 195: // FOR_Defense Facility
                                        sim.Stats.EnemyHealth.DF.StartHealth += unitStartHealth;
                                        sim.Stats.EnemyHealth.DF.EndHealth += unitEndHealth;
                                        sim.Stats.EnemyHealth.DF.MaxHealth += unitMaxHealth;
                                        sim.Stats.EnemyHealth.DF.RT += costs.RT;
                                        sim.Stats.EnemyHealth.DF.Tib += costs.Tib;
                                        sim.Stats.EnemyHealth.DF.Cry += costs.Cry;
                                        break;
                                    case 111: // GDI_Command Center
                                    case 159: // NOD_Command Post
                                        sim.Stats.EnemyHealth.CC.StartHealth += unitStartHealth;
                                        sim.Stats.EnemyHealth.CC.EndHealth += unitEndHealth;
                                        sim.Stats.EnemyHealth.CC.MaxHealth += unitMaxHealth;
                                        sim.Stats.EnemyHealth.CC.RT += costs.RT;
                                        sim.Stats.EnemyHealth.CC.Tib += costs.Tib;
                                        sim.Stats.EnemyHealth.CC.Cry += costs.Cry;
                                        break;
                                    }
                                    break;
                                case ClientLib.Base.EPlacementType.Defense:
                                    sim.Stats.EnemyHealth.Overall.StartHealth += unitStartHealth;
                                    sim.Stats.EnemyHealth.Overall.EndHealth += unitEndHealth;
                                    sim.Stats.EnemyHealth.Overall.MaxHealth += unitMaxHealth;
                                    sim.Stats.EnemyHealth.Overall.Tib += costs.Tib;
                                    sim.Stats.EnemyHealth.Overall.Cry += costs.Cry;
                                    sim.Stats.EnemyHealth.Defense.StartHealth += unitStartHealth;
                                    sim.Stats.EnemyHealth.Defense.EndHealth += unitEndHealth;
                                    sim.Stats.EnemyHealth.Defense.MaxHealth += unitMaxHealth;
                                    sim.Stats.EnemyHealth.Defense.Tib += costs.Tib;
                                    sim.Stats.EnemyHealth.Defense.Cry += costs.Cry;
                                    break;
                                }
                            }
                            ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(sim.OwnCity.get_Id());
                            for (var i = 0; i < ownunits.length; i++) {
                                var unitData = ownunits[i];
                                var unitMDBID = unitData.t;
                                var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unitMDBID);
                                var unitLevel = unitData.l;
                                var unitStartHealth = Math.floor(unitData.sh);
                                var unitEndHealth = Math.floor(unitData.h);
                                var unitMaxHealth = Math.floor((ClientLib.API.Util.GetUnitMaxHealthByLevel(unitLevel, unit, false)) * 16);
                                var unitPlacementType = unit.pt; // ClientLib.Base.EPlacementType
                                var unitMovementType = unit.mt; // ClientLib.Base.EUnitMovementType
                                costs = this.calculateRepairCosts(unitMDBID, unitLevel, unitStartHealth, unitEndHealth, unitMaxHealth);

                                switch (unitPlacementType) {
                                case ClientLib.Base.EPlacementType.Offense:
                                    sim.Stats.Repair.Overall.StartHealth += unitStartHealth;
                                    sim.Stats.Repair.Overall.EndHealth += unitEndHealth;
                                    sim.Stats.Repair.Overall.MaxHealth += unitMaxHealth;
                                    sim.Stats.Repair.Overall.Tib += costs.Tib;
                                    sim.Stats.Repair.Overall.Cry += costs.Cry;
                                    switch (unitMovementType) {
                                    case ClientLib.Base.EUnitMovementType.Feet:
                                        sim.Stats.Repair.Inf.StartHealth += unitStartHealth;
                                        sim.Stats.Repair.Inf.EndHealth += unitEndHealth;
                                        sim.Stats.Repair.Inf.MaxHealth += unitMaxHealth;
                                        sim.Stats.Repair.Inf.RT += costs.RT;
                                        sim.Stats.Repair.Inf.Tib += costs.Tib;
                                        sim.Stats.Repair.Inf.Cry += costs.Cry;
                                        break;
                                    case ClientLib.Base.EUnitMovementType.Wheel:
                                    case ClientLib.Base.EUnitMovementType.Track:
                                        sim.Stats.Repair.Vehi.StartHealth += unitStartHealth;
                                        sim.Stats.Repair.Vehi.EndHealth += unitEndHealth;
                                        sim.Stats.Repair.Vehi.MaxHealth += unitMaxHealth;
                                        sim.Stats.Repair.Vehi.RT += costs.RT;
                                        sim.Stats.Repair.Vehi.Tib += costs.Tib;
                                        sim.Stats.Repair.Vehi.Cry += costs.Cry;
                                        break;
                                    case ClientLib.Base.EUnitMovementType.Air:
                                    case ClientLib.Base.EUnitMovementType.Air2:
                                        sim.Stats.Repair.Air.StartHealth += unitStartHealth;
                                        sim.Stats.Repair.Air.EndHealth += unitEndHealth;
                                        sim.Stats.Repair.Air.MaxHealth += unitMaxHealth;
                                        sim.Stats.Repair.Air.RT += costs.RT;
                                        sim.Stats.Repair.Air.Tib += costs.Tib;
                                        sim.Stats.Repair.Air.Cry += costs.Cry;
                                        break;
                                    }
                                    break;
                                }
                            }
                            ClientLib.Data.MainData.GetInstance().get_Cities().set_CurrentCityId(sim.TargetCity.get_Id());

                            //Set Repair Overall RT
                            sim.Stats.Repair.Overall.RT = Math.max(sim.Stats.Repair.Inf.RT, sim.Stats.Repair.Vehi.RT, sim.Stats.Repair.Air.RT);

                            //Set Battle Outcome
                            if (sim.Stats.Repair.Overall.EndHealth === 0)  sim.Stats.Battle.Outcome = 1;
                            else if (sim.Stats.EnemyHealth.CY.EndHealth === 0) sim.Stats.Battle.Outcome = 3;
                            else sim.Stats.Battle.Outcome = 2;
                        } catch (e) {
                            console.log("Error Getting Player Unit Damage");
                            console.log(e.toString());
                        }
                    },
                    calcLoot: function (sim) {
                        try {
                            var Ents = (sim.Result);
                            var lootArray = { 1: 0, 2: 0, 3: 0, 6: 0 };
                            var i, x, y, unit, Entity , mod = -1, unitMaxHealth = 0;
                            for (y = 0; y < 16; y++) {
                                for (x = 8; x >= 0; x--) {
                                    if (y < 8) {
                                        var width = ClientLib.Vis.VisMain.GetInstance().get_City().get_GridWidth();
                                        var height = ClientLib.Vis.VisMain.GetInstance().get_City().get_GridHeight();
                                    } else {
                                        var width = ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().get_GridWidth();
                                        var height = ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().get_GridHeight();
                                    }
                                    Entity = ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition(((x * width) + (width / 2)), ((y * height) + (height / 2)));
                                    if (Entity !== null) {
                                        for (i = 0; i < Ents.length; i++) {
                                            unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(Ents[i].t);
                                            switch (sim.TargetCity.get_CityFaction()) {
                                            case ClientLib.Base.EFactionType.GDIFaction:
                                            case ClientLib.Base.EFactionType.NODFaction:
                                                unitMaxHealth = Math.floor((ClientLib.API.Util.GetUnitMaxHealthByLevel(Ents[i].l, unit, true)) * 16);
                                                break;
                                            default:
                                                unitMaxHealth = Math.floor((ClientLib.API.Util.GetUnitMaxHealthByLevel(Ents[i].l, unit, false)) * 16);
                                                break;
                                            }
                                            mod = (Ents[i].sh - Ents[i].h) / unitMaxHealth;
                                            if (Entity.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.CityBuildingType && Ents[i].t == Entity.get_BuildingDetails().get_MdbUnitId() && Ents[i].l == Entity.get_BuildingLevel()) {
                                                var reqs = Entity.get_BuildingDetails().get_UnitLevelRepairRequirements();
                                                for (i = 0; i < reqs.length; i++) lootArray[reqs[i].Type] += Math.floor(mod * reqs[i].Count);
                                                Ents.splice(i, 1);
                                                break;
                                            }
                                            if (Entity.get_VisObjectType() == ClientLib.Vis.VisObject.EObjectType.DefenseUnitType && Ents[i].t == Entity.get_UnitDetails().get_MdbUnitId() && Ents[i].l == Entity.get_UnitLevel()) {
                                                var reqs = Entity.get_UnitDetails().get_UnitLevelRepairRequirements();
                                                for (i = 0; i < reqs.length; i++) lootArray[reqs[i].Type] += Math.floor(mod * reqs[i].Count);
                                                Ents.splice(i, 1);
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            var totalLoot = lootArray[1] + lootArray[2] + lootArray[3] + lootArray[6];
                            if (sim.Stats.Battle.Outcome === 3) {
                                sim.Stats.Loot.Overall.Battle = sim.Stats.Loot.Overall.Base;
                                sim.Stats.Loot.Tib.Battle = sim.Stats.Loot.Tib.Base;
                                sim.Stats.Loot.Cry.Battle = sim.Stats.Loot.Cry.Base;
                                sim.Stats.Loot.Cred.Battle = sim.Stats.Loot.Cred.Base;
                                sim.Stats.Loot.RP.Battle = sim.Stats.Loot.RP.Base;
                            } else {
                                sim.Stats.Loot.Overall.Battle = totalLoot;
                                sim.Stats.Loot.Tib.Battle = lootArray[1];
                                sim.Stats.Loot.Cry.Battle = lootArray[2];
                                sim.Stats.Loot.Cred.Battle = lootArray[3];
                                sim.Stats.Loot.RP.Battle = lootArray[6];
                            }
                        } catch (e) {
                            console.log("Error Calculating Resources");
                            console.log(e);
                            console.log(e.name + " " + e.message);
                        }

                    },
                    getBattleDuration: function (sim) {
                        var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
                        if (battleground.get_Simulation() !== null) sim.Stats.Battle.Duration = battleground.get_Replay().m_CombatSteps * battleground.get_TimePerStep();
                        else setTimeout(function () {
                            Simulator.StatWindow.getInstance().getBattleDuration(sim);
                        }, 10);
                    },
                    getLootFromCurrentCity: function () {
                        try {
                            var lootArray = { 1: 0, 2: 0, 3: 0, 6: 0 };
                            var loot = ClientLib.API.Battleground.GetInstance().GetLootFromCurrentCity();
                            if (loot !== null && loot.length > 0) {
                                for (var i = 0; i < loot.length; i++) lootArray[parseInt(loot[i].Type, 10)] += loot[i].Count;
                                for (var i = 0; i < this.sim.length; i++) {
                                    this.sim[i].Reset();
                                    this.sim[i].Stats.Loot.Overall.Base = lootArray[1] + lootArray[2] + lootArray[3] + lootArray[6];
                                    this.sim[i].Stats.Loot.Tib.Base = lootArray[1];
                                    this.sim[i].Stats.Loot.Cry.Base = lootArray[2];
                                    this.sim[i].Stats.Loot.Cred.Base = lootArray[3];
                                    this.sim[i].Stats.Loot.RP.Base = lootArray[6];
                                }
                            } else {
                                setTimeout(function () {
                                    Simulator.StatWindow.getInstance().getLootFromCurrentCity();
                                }, 100);
                            }
                        } catch (e) {
                            console.log("Error Getting Loot from Current City");
                            console.log(e.toString());
                        }
                    },
                    disableSimulateStatButtonTimer: function (timer) {
                        try {
                            if (timer >= 1000) {
                                this.isSimStatButtonDisabled = true;
                                this.simStatBtn.setEnabled(false);
                                this.simStatBtn.setLabel(Math.floor(timer / 1000));
                                timer -= 1000;
                                setTimeout(function () {
                                    Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(timer);
                                }, 1000);
                            } else {
                                setTimeout(function () {
                                    Simulator.StatWindow.getInstance().simStatBtn.setEnabled(true);
                                    Simulator.StatWindow.getInstance().simStatBtn.setLabel("Update");
                                }, timer);
                                this.isSimStatButtonDisabled = false;
                            }
                        } catch (e) {
                            console.log("Error disabling simulator button");
                            console.log(e.toString());
                        }
                    }
                }
            });
            qx.Class.define("Simulator.OptionWindow", {
                type: "singleton",
                extend: qx.ui.window.Window,

                construct: function () {
                    var qxApp = qx.core.Init.getApplication();
                    this.base(arguments);
                    this.setLayout(new qx.ui.layout.VBox(5));
                    this.addListener("resize", function () {
                        this.center();
                    }, this);

                    this.set({
                        caption: qxApp.tr("Simulator") + " - " + qxApp.tr("tnf:options"),
                        allowMaximize: false,
                        showMaximize: false,
                        allowMinimize: false,
                        showMinimize: false
                    });
                    var tabView = new qx.ui.tabview.TabView();
                    var genPage = new qx.ui.tabview.Page(qxApp.tr("tnf:general"));
                    genLayout = new qx.ui.layout.VBox(5);
                    genPage.setLayout(genLayout);

                    //Add General Page Items
                    var buttonsHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                    buttonsHeader.setThemedFont("bold");
                    var buttonsTitle = new qx.ui.basic.Label(qxApp.tr("Buttons:"));
                    buttonsHeader.add(buttonsTitle);
                    genPage.add(buttonsHeader);

                    var buttonsBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
                    this._buttonLocCB = new qx.ui.form.CheckBox(qxApp.tr("Right Side"));
                    this._buttonSizeCB = new qx.ui.form.CheckBox(qxApp.tr("Normal Size"));
                    this._buttonLocCB.addListener("changeValue", this._onButtonLocChange, this);
                    this._buttonSizeCB.addListener("changeValue", this._onButtonSizeChange, this);
                    if (localStorage['isBtnRight'] !== undefined) {
                        if (localStorage['isBtnRight'] == "yes")
                            this._buttonLocCB.setValue(true);
                        else
                            this._buttonLocCB.setValue(false);
                    }

                    if (localStorage['isBtnNorm'] !== undefined) {
                        if (localStorage['isBtnNorm'] == "yes")
                            this._buttonSizeCB.setValue(true);
                        else
                            this._buttonSizeCB.setValue(false);

                        //Need to do this
                        this.setButtonSize();
                    }

                    this._disableRTBtnCB = new qx.ui.form.CheckBox(qxApp.tr("Disable Repair Button"));
                    this._disableRTBtnCB.addListener("changeValue", this._onDisableRTBtnChange, this);
                    if (localStorage['isRTBtnDisabled'] !== undefined && localStorage['isRTBtnDisabled'] == "no") this._disableRTBtnCB.setValue(false);
                    else this._disableRTBtnCB.setValue(true);

                    this._disableCmtBtnCB = new qx.ui.form.CheckBox(qxApp.tr("Disable Combat Button"));
                    this._disableCmtBtnCB.addListener("changeValue", this._onDisableCmtBtnChange, this);
                    if (localStorage['isCmtBtnDisabled'] !== undefined && localStorage['isCmtBtnDisabled'] == "no") this._disableCmtBtnCB.setValue(false);
                    else this._disableCmtBtnCB.setValue(true);

                    this._ArmyUnitTooltip = new qx.ui.form.CheckBox(qxApp.tr("Disable Army Unit Tooltip"));
                    this._ArmyUnitTooltip.addListener("changeValue", this._onArmyUnitTooltipChange, this);
                    if (localStorage['ArmyUnitTooltipDisabled'] !== undefined) {
                        if (localStorage['ArmyUnitTooltipDisabled'] == "yes")
                            this._ArmyUnitTooltip.setValue(true);
                        else
                            this._ArmyUnitTooltip.setValue(false);
                    }

                    buttonsBox.add(this._buttonSizeCB);
                    buttonsBox.add(this._buttonLocCB);
                    buttonsBox.add(this._disableRTBtnCB);
                    buttonsBox.add(this._disableCmtBtnCB);
                    buttonsBox.add(this._ArmyUnitTooltip);
                    genPage.add(buttonsBox);



                    var simulatorHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({
                        marginTop: 10
                    });
                    simulatorHeader.setThemedFont("bold");
                    var simulatorTitle = new qx.ui.basic.Label(qxApp.tr("Simulator") + ":");
                    simulatorHeader.add(simulatorTitle);
                    genPage.add(simulatorHeader);

                    var simulatorBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
                    this._autoSimulateCB = new qx.ui.form.CheckBox(qxApp.tr("Auto Start Simulation"));

                    if (localStorage['autoSimulate'] !== undefined) {
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
                    if (localStorage['simulateSpeed'] !== undefined) {
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

                    var statsPage = new qx.ui.tabview.Page(qxApp.tr("Stats"));
                    statsLayout = new qx.ui.layout.VBox(5);
                    statsPage.setLayout(statsLayout);

                    var statWindowHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                    statWindowHeader.setThemedFont("bold");
                    var statWindowTitle = new qx.ui.basic.Label(qxApp.tr("Stats Window:"));
                    statWindowHeader.add(statWindowTitle);
                    statsPage.add(statWindowHeader);

                    var statWindowBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
                    this._autoOpenCB = new qx.ui.form.CheckBox(qxApp.tr("Auto Open"));
                    this._autoOpenCB.addListener("changeValue", this._onAutoOpenStatsChange, this);
                    if (localStorage['autoOpenStat'] !== undefined) {
                        if (localStorage['autoOpenStat'] == "yes")
                            this._autoOpenCB.setValue(true);
                        else
                            this._autoOpenCB.setValue(false);
                    }

                    statWindowBox.add(this._autoOpenCB);
                    statsPage.add(statWindowBox);

                    var EnemyHealthSecHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({
                        marginTop: 10
                    });
                    EnemyHealthSecHeader.setThemedFont("bold");
                    var EnemyHealthSecTitle = new qx.ui.basic.Label(qxApp.tr("tnf:combat target"));
                    EnemyHealthSecHeader.add(EnemyHealthSecTitle);
                    statsPage.add(EnemyHealthSecHeader);

                    var EnemyHealthSecBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                    var EnemyHealthDisplayOpt1 = new qx.ui.form.RadioButton("HP abs");
                    var EnemyHealthDisplayOpt2 = new qx.ui.form.RadioButton("HP rel");
                    this._EnemyHealthSecGroup = new qx.ui.form.RadioGroup(EnemyHealthDisplayOpt1, EnemyHealthDisplayOpt2);
                    this._EnemyHealthSecGroup.addListener("changeSelection", this._onEnemyHealthSelectionChange, this);
                    if (localStorage['getEHSelection'] !== undefined) {
                        var options = this._EnemyHealthSecGroup.getSelectables(false);

                        if (localStorage['getEHSelection'] == "hp")
                            options[0].setValue(true);
                        else if (localStorage['getEHSelection'] == "hp rel")
                            options[1].setValue(true);
                        else
                            options[0].setValue(true);
                    }
                    EnemyHealthSecBox.add(EnemyHealthDisplayOpt1);
                    EnemyHealthSecBox.add(EnemyHealthDisplayOpt2);
                    statsPage.add(EnemyHealthSecBox);

                    var repairSecHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({
                        marginTop: 10
                    });
                    repairSecHeader.setThemedFont("bold");
                    var repairSecTitle = new qx.ui.basic.Label(qxApp.tr("tnf:own repair cost"));
                    repairSecHeader.add(repairSecTitle);
                    statsPage.add(repairSecHeader);

                    var repairSecBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
                    var repairDisplayOpt1 = new qx.ui.form.RadioButton("RT");
                    var repairDisplayOpt2 = new qx.ui.form.RadioButton("C");
                    var repairDisplayOpt3 = new qx.ui.form.RadioButton("HP abs");
                    var repairDisplayOpt4 = new qx.ui.form.RadioButton("HP rel");
                    this._repairSecGroup = new qx.ui.form.RadioGroup(repairDisplayOpt1, repairDisplayOpt2, repairDisplayOpt3, repairDisplayOpt4);
                    this._repairSecGroup.addListener("changeSelection", this._onRepairSelectionChange, this);
                    if (localStorage['getRTSelection'] !== undefined) {
                        var options = this._repairSecGroup.getSelectables(false);

                        if (localStorage['getRTSelection'] == "rt")
                            options[0].setValue(true);
                        else if (localStorage['getRTSelection'] == "cry")
                            options[1].setValue(true);
                        else if (localStorage['getRTSelection'] == "hp")
                            options[2].setValue(true);
                        else if (localStorage['getRTSelection'] == "hp rel")
                            options[3].setValue(true);
                        else
                            options[0].setValue(true);
                    }
                    repairSecBox.add(repairDisplayOpt1);
                    repairSecBox.add(repairDisplayOpt2);
                    repairSecBox.add(repairDisplayOpt3);
                    repairSecBox.add(repairDisplayOpt4);
                    statsPage.add(repairSecBox);

                    var simViewsHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
                    simViewsHeader.setThemedFont("bold");
                    var simViewsTitle = new qx.ui.basic.Label(qxApp.tr("Simulations shown"));
                    simViewsHeader.add(simViewsTitle);
                    statsPage.add(simViewsHeader);

                    var simViewsBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
                    this._simViews = new qx.ui.form.Spinner().set({ minimum: 2 });
                    if (localStorage['simViews'] !== undefined) {
                        if (!isNaN(parseInt(localStorage['simViews'], 10))) this._simViews.setValue(parseInt(localStorage['simViews'], 10));
                        else this._simViews.setValue(Simulator.StatWindow.getInstance().simViews);
                    }
                    this._simViews.addListener("changeValue", this._onSimViewsChanged, this);
                    simViewsBox.add(this._simViews);
                    statsPage.add(simViewsBox);

                    var hideSecHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
                    hideSecHeader.setThemedFont("bold");
                    var hideSecTitle = new qx.ui.basic.Label(qxApp.tr("Hide Sections (on Startup):"));
                    hideSecHeader.add(hideSecTitle);
                    statsPage.add(hideSecHeader);

                    var hideSecBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
                    this._hideHealthCB = new qx.ui.form.CheckBox(qxApp.tr("Health"));
                    this._hideRepairCB = new qx.ui.form.CheckBox(qxApp.tr("Repair"));
                    this._hideLootCB = new qx.ui.form.CheckBox(qxApp.tr("Loot"));
                    this._hideHealthCB.addListener("changeValue", this._onHideEHChange, this);
                    this._hideRepairCB.addListener("changeValue", this._onHideRTChange, this);
                    this._hideLootCB.addListener("changeValue", this._onHideLootChange, this);
                    if (localStorage['hideHealth'] !== undefined) {
                        if (localStorage['hideHealth'] == "yes")
                            this._hideHealthCB.setValue(true);
                        else
                            this._hideHealthCB.setValue(false);
                    }
                    if (localStorage['hideRepair'] !== undefined) {
                        if (localStorage['hideRepair'] == "yes")
                            this._hideRepairCB.setValue(true);
                        else
                            this._hideRepairCB.setValue(false);
                    }
                    if (localStorage['hideLoot'] !== undefined) {
                        if (localStorage['hideLoot'] == "yes")
                            this._hideLootCB.setValue(true);
                        else
                            this._hideLootCB.setValue(false);
                    }
                    hideSecBox.add(this._hideHealthCB);
                    hideSecBox.add(this._hideRepairCB);
                    hideSecBox.add(this._hideLootCB);
                    statsPage.add(hideSecBox);

                    var statPosHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
                    var statPosTitle = new qx.ui.basic.Label(qxApp.tr("Set Stat Window Position:")).set({alignY: "middle"});
                    statPosTitle.setFont("bold");
                    var statPosBtn = new qx.ui.form.Button(qxApp.tr("Set")).set({allowGrowX: false, allowGrowY: false, height: 20});
                    statPosBtn.addListener("click", this._onSetStatWindowPositionChange, this);
                    statPosHeader.add(statPosTitle);
                    statPosHeader.add(statPosBtn);
                    statsPage.add(statPosHeader);

                    tabView.add(genPage);
                    tabView.add(statsPage);
                    this.add(tabView);
                    phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, function () { this.close(); });
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
                    _EnemyHealthSecGroup: null,
                    _simViews: null,
                    _hideHealthCB: null,
                    _hideRepairCB: null,
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

                    _onEnemyHealthSelectionChange: function (selection) {
                        try {
                            var option = selection.getData()[0];
                            var label = option.getLabel();

                            if (label == "HP abs")
                                localStorage['getEHSelection'] = "hp";
                            else if (label == "HP rel")
                                localStorage['getEHSelection'] = "hp rel";
                            else
                                localStorage['getEHSelection'] = "hp";
                        } catch (e) {
                            console.log("Error Enemy Health Section Selection Change: " + e.toString());
                        }
                    },

                    _onRepairSelectionChange: function (selection) {
                        try {
                            var option = selection.getData()[0];
                            var label = option.getLabel();

                            if (label == "RT")
                                localStorage['getRTSelection'] = "rt";
                            else if (label == "HP abs")
                                localStorage['getRTSelection'] = "hp";
                            else if (label == "HP rel")
                                localStorage['getRTSelection'] = "hp rel";
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

                    _onSimViewsChanged: function () {
                        try {
                            var value = parseInt(this._simViews.getValue(), 10);
                            if (!isNaN(value)) {
                                if (value > 0) {
                                    localStorage['simViews'] = value.toString();
                                    Simulator.StatWindow.getInstance().simViews = value;

                                    // Remove Simulations from Stats Window
                                    for (var i = (Simulator.StatWindow.getInstance().sim.length-1); i >= 0; i--) {
                                        if (i > (value-1)) {
                                            Simulator.StatWindow.getInstance().Battle.remove(Simulator.StatWindow.getInstance().sim[i].Label.Battle.container);
                                            Simulator.StatWindow.getInstance().EnemyHealth.remove(Simulator.StatWindow.getInstance().sim[i].Label.EnemyHealth.container);
                                            Simulator.StatWindow.getInstance().Repair.remove(Simulator.StatWindow.getInstance().sim[i].Label.Repair.container);
                                            Simulator.StatWindow.getInstance().Loot.remove(Simulator.StatWindow.getInstance().sim[i].Label.Loot.container);
                                            Simulator.StatWindow.getInstance().sim.pop();
                                        }
                                    }

                                    // Create and add Simulations to Stats Window
                                    for (var i = 0; i < value; i++) {
                                        if (i == Simulator.StatWindow.getInstance().sim.length) {
                                            Simulator.StatWindow.getInstance().sim.push(new (Simulator.StatWindow.getInstance()).Simulation(i));
                                            Simulator.StatWindow.getInstance().Battle.add(Simulator.StatWindow.getInstance().sim[i].Label.Battle.container, { flex : 1 });
                                            Simulator.StatWindow.getInstance().EnemyHealth.add(Simulator.StatWindow.getInstance().sim[i].Label.EnemyHealth.container, { flex : 1 });
                                            Simulator.StatWindow.getInstance().Repair.add(Simulator.StatWindow.getInstance().sim[i].Label.Repair.container, { flex : 1 });
                                            Simulator.StatWindow.getInstance().Loot.add(Simulator.StatWindow.getInstance().sim[i].Label.Loot.container, { flex : 1 });
                                            Simulator.StatWindow.getInstance().sim[i].Select(Simulator.StatWindow.getInstance().simSelected);
                                        }
                                    }

                                    if ((value-1) < Simulator.StatWindow.getInstance().simSelected) {
                                        Simulator.StatWindow.getInstance().simSelected = 0;
                                        for (var i = 0; i < Simulator.StatWindow.getInstance().sim.length; i++) {
                                            Simulator.StatWindow.getInstance().sim[i].Select(0);
                                        }
                                    }
                                }
                            }
                        } catch (e) {
                            console.log("Error Simulation Views Change: " + e.toString());
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
                            Simulator.getInstance().unlockRTBtn.show();
                        else
                            Simulator.getInstance().unlockRTBtn.hide();
                    },

                    setCmtBtn: function (value) {
                        if (value == true)
                            Simulator.getInstance().unlockCmtBtn.show();
                        else
                            Simulator.getInstance().unlockCmtBtn.hide();
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
                            var qxApp = qx.core.Init.getApplication();
                            value = this._buttonSizeCB.getValue();

                            if (value == true) {
                                Simulator.getInstance().simBtn.setLabel(qxApp.tr("Simulate"));
                                Simulator.getInstance().simBtn.setWidth(60);

                                Simulator.getInstance().statBtn.setLabel(qxApp.tr("Stats"));
                                Simulator.getInstance().statBtn.setWidth(60);

                                Simulator.getInstance().optionBtn.setLabel(qxApp.tr("Options"));
                                Simulator.getInstance().optionBtn.setWidth(60);

                                Simulator.getInstance().layoutBtn.setLabel(qxApp.tr("Layout"));
                                Simulator.getInstance().layoutBtn.setWidth(60);
                            } else {
                                Simulator.getInstance().simBtn.setLabel(qxApp.tr("S"));
                                Simulator.getInstance().simBtn.setWidth(30);

                                Simulator.getInstance().statBtn.setLabel(qxApp.tr("I"));
                                Simulator.getInstance().statBtn.setWidth(30);

                                Simulator.getInstance().optionBtn.setLabel(qxApp.tr("O"));
                                Simulator.getInstance().optionBtn.setWidth(30);

                                Simulator.getInstance().layoutBtn.setLabel(qxApp.tr("L"));
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
                    var qxApp = qx.core.Init.getApplication();
                    this.base(arguments);
                    this.setLayout(new qx.ui.layout.VBox());

                    this.set({
                        width: 200,
                        caption: qxApp.tr("Simulator") + " - " + qxApp.tr("Layouts"),
                        padding: 2,
                        allowMaximize: false,
                        showMaximize: false,
                        allowMinimize: false,
                        showMinimize: false
                    });

                    var layoutListHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({
                        decorator: "pane-light-opaque"
                    });
                    var layoutListTitle = new qx.ui.basic.Label(qxApp.tr("Formation Saver")).set({alignX: "center", alignY: "top", font: "font_size_14_bold"});
                    layoutListHeader.add(layoutListTitle);
                    this.add(layoutListHeader);

                    this.layoutList = new qx.ui.form.List();
                    this.layoutList.set({selectionMode: "one", height: 100, width: 150, margin: 5});
                    this.add(this.layoutList);

                    var listButtonBox = new qx.ui.container.Composite();
                    var listButtonLayout = new qx.ui.layout.HBox(5, "center");
                    listButtonBox.setLayout(listButtonLayout);
                    var loadButton = new qx.ui.form.Button(qxApp.tr("Load"));
                    var deleteButton = new qx.ui.form.Button(qxApp.tr("Delete"));
                    loadButton.set({height: 15, width: 70, alignX: "center"});
                    loadButton.addListener("click", this.loadLayout, this);
                    deleteButton.set({height: 15, width: 70, alignX: "center"});
                    deleteButton.addListener("click", this.deleteLayout, this);
                    listButtonBox.add(loadButton);
                    listButtonBox.add(deleteButton);
                    this.add(listButtonBox);

                    var saveLayoutBox = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({spacing: 10})).set({marginTop: 20, marginLeft: 5});
                    this.layoutTextBox = new qx.ui.form.TextField("").set({width: 75, maxLength: 15});
                    var saveButton = new qx.ui.form.Button(qxApp.tr("Save"));
                    saveButton.set({height: 10, width: 70, alignX: "center"});
                    saveButton.addListener("click", this.saveNewLayout, this);
                    saveLayoutBox.add(this.layoutTextBox);
                    saveLayoutBox.add(saveButton);
                    this.add(saveLayoutBox);

                    var checkBox = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({spacing: 10})).set({marginTop: 10, marginLeft: 5});
                    this.persistentCheck = new qx.ui.form.CheckBox(qxApp.tr("Make Persistent"));
                    this.persistentCheck.setTextColor("white");
                    this.persistentCheck.setFont("bold");
                    this.persistentCheck.setToolTipText(qxApp.tr("If checked, formation will be saved and can be used by this city in any other city."));
                    checkBox.add(this.persistentCheck);
                    this.add(checkBox);

                    var clearAllLayoutsBox = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({alignX: "center", marginTop: 5, marginLeft: 5, allowGrowX: false});
                    var clearAllLayoutsBtn = new qx.ui.form.Button(qxApp.tr("Clear All")).set({alignX: "center", width: 70});
                    clearAllLayoutsBtn.addListener("click", this.clearAllLayouts, this);
                    clearAllLayoutsBox.add(clearAllLayoutsBtn);
                    this.add(clearAllLayoutsBox);

                    this.layoutsArray = [];
                    phe.cnc.Util.attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this, function () { this.close(); });
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

                            if ((isQS !== undefined && isQS == true) || this.layoutTextBox.getValue() == "") {
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
                                    pers: "yes"
                                };
                            } else {
                                layoutInformation = {
                                    id: model,
                                    label: label,
                                    formation: units,
                                    pers: "no"
                                };
                            }
                            this.layoutsArray.push(layoutInformation);
                            this.layoutList.add(new qx.ui.form.ListItem(layoutInformation.label, null, layoutInformation.id));
                            this.layoutTextBox.setValue("");
                            Simulator.getInstance().quickSaveBtn.setLabel("✔");
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
                            if (savedLayouts !== undefined) {
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

                                if (itemModel == this.layoutsArray[item].id || ((pers !== undefined && pers == "yes") && match != null)) //Match!
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
        function translation() {
            var localeManager = qx.locale.Manager.getInstance();

            // Default language is english (en)
            // Available Languages are: ar,ce,cs,da,de,en,es,fi,fr,hu,id,it,nb,nl,pl,pt,ro,ru,sk,sv,ta,tr,uk
            // You can send me translations so i can include them in the Script.

            // German (incomplete)
            localeManager.addTranslation("de", {
                "Simulator": "Simulator",
                "S": "S",
                "Simulate": "Simulate",
                "Opens Simulation Screen.": "Startet die Simulation",
                "I": "I",
                "Stats": "Statistik",
                "Opens Simulator Stats Window.": "Öffnet das Statistikfenster.",
                "O": "O",
                "Options": "Options",
                "Opens Simulator Options.": "Öffnet das Optionsfenster.",
                "L": "L",
                "Layout": "Layout",
                "Save/Load/Delete Unit Formations for current city.": "Speichern/Laden/Löschen von Formationen für den aktuellen Gegner",
                "Unlock": "Unlock",
                "Unlock Combat Button.": "Entsperrt die Angriffsschaltfläche.",
                "Unlock Repair Button.": "Entsperrt die Reparaturschaltfläche.",
                "Shifts units one space up.": "Verschiebt Einheiten einen Platz nach oben.",
                "Shifts units one space down.": "Verschiebt die Einheiten einen Platz nach unten.",
                "Shifts units one space left.": "Verschiebt die Einheiten einen Platz nach links.",
                "Shifts units one space right.": "Verschiebt die Einheiten einen Platz nach rechts.",
                "Mirrors units horizontally.": "Spiegelt die Einheiten horizontal.",
                "Mirrors units vertically.": "Spiegelt die Einheiten vertikal.",
                "Enables/Disables all units.": "Alle Einheiten de-/aktivieren.",
                "Undo's formation to previous saved formation.<br>Save formations by hitting<br>the Update or Simulate button.": "Setzt die Formation auf die vorher gespeicherte zurück.<br>Formationen werden gespeichert,<br>wenn man auf Simulieren oder Aktualisieren drückt.",
                "QS": "QS",
                "Saves the current layout<br>without having to open<br>the Formation Saver window.<br>Does not make persistent.": "Speichert die aktuelle Formation,<br>ohne das das Formationsfenster<br>geöffnet werden muss.",
                "Back": "zurück",
                "Return to Combat Setup.": "Zurück zum Angriffsbildschirm.",
                "Updates Simulation Stats.": "Aktualisiert die Statistik.",
                "Buttons:": "Schaltflächen:",
                "Right Side": "Rechte Seite",
                "Normal Size": "Normale Größe",
                "Disable Repair Button": "Sperre Reparatur-Schaltfläche",
                "Disable Combat Button": "Sperre Angriffs-Schaltfläche",
                "Disable Army Unit Tooltip": "Deaktiviere Einheiten Tooltips",
                "Auto Start Simulation": "Simulation automatisch starten",
                "Stats Window:": "Statistik Fenster:",
                "Auto Open": "Automatisch öffnen",
                "Simulations shown": "Anzuzeigende Simulationen",
                "Hide Sections (on Startup):": "Verstecke Bereich (beim starten):",
                "Health": "Health",
                "Repair": "Repair",
                "Loot": "Loot",
                "Set Stat Window Position:": "Setze die Statistikfenster Position:",
                "Set": "setzen",
                "Layouts": "Layouts",
                "Formation Saver": "Formationen speichern",
                "Load": "Laden",
                "Delete": "Löschen",
                "Save": "Speichern",
                "Make Persistent": "Dauerhaft",
                "If checked, formation will be saved and can be used by this city in any other city.": "Wenn angewählt kann die Formation für andere Gegner verwendet werden.",
                "Clear All": "Lösche alle"
            });
        }
        function waitForGame() {
            try {
                if (typeof qx !== "undefined" && typeof qx.core !== "undefined" && typeof qx.core.Init !== "undefined" && typeof ClientLib !== "undefined" && typeof phe !== "undefined") {
                    var app = qx.core.Init.getApplication();
                    if (app.initDone == true) {
                        try {
                            console.log("WarChiefs - Tiberium Alliances Combat Simulator: Loading");
                            translation();
                            createClasses();
                            Simulator.getInstance();
                            Simulator.StatWindow.getInstance();
                            Simulator.OptionWindow.getInstance();
                            Simulator.LayoutWindow.getInstance();
                            console.log("WarChiefs - Tiberium Alliances Combat Simulator: Loaded");
                        } catch (e) {
                            console.log("WarChiefs - Tiberium Alliances Combat Simulator: initialization error:");
                            console.log(e);
                        }
                    } else
                        window.setTimeout(waitForGame, 1000);
                } else {
                    window.setTimeout(waitForGame, 1000);
                }
            } catch (e) {
                console.log(e);
            }
        }
        window.setTimeout(waitForGame, 1000);
    };
    var script = document.createElement("script");
    var txt = injectFunction.toString();
    script.innerHTML = "(" + txt + ")();";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
})();

/******************************************************************************************************
                                                          Maelstrom ADDON Basescanner
														  version 1.8.4
                                                          BlinDManX
********************************************************************************************************/

 (function() {
        var b = function() {
            var e = ["__msbs_version", "1.8.4", "Addons.BaseScannerGUI", "singleton", "Window", "window", "ui", "base", "Addons.BaseScannerGUI ", "info", "T", "getInstance", "Language", "setWidth", "setHeight", "setContentPadding", "setShowMinimize", "setShowMaximize", "setShowClose", "setResizable", "setAllowMaximize", "setAllowMinimize", "setAllowClose", "setShowStatusbar", "setDecorator", "setPadding", "layout", "setLayout", "src", "stats", "http://goo.gl/DrJ2x", "ZE", "removeAll", "add", "setData", "ZL", "Addons.BaseScannerGUI.construct: ", "debug", "img", "createElement", "setCaption", "isVisible", "close", "updateCityCache", "Cache", "MaelstromTools", "ZC", "Cities", "form", "Basescanner_LastCityID", "getserver", "LocalStorage", "get_Id", "Object", "setSelection", "open", "moveTo", "MaelstromTools.DefaultObject.openWindow: ", "log", "model", "table", "ID", "LoadState", "City", "get", "Location", "Level", "Tiberium", "Crystal", "Dollar", "Research", "Crystalfields", "Tiberiumfields", "Building state", "Defense state", "CP", "Def.HP/Off.HP", "Sum Tib+Cry+Cre", "(Tib+Cry+Cre)/CP", "CY", "DF", "base set up at", "setColumns", "YY", "get_Player", "MainData", "Data", "ZN", "setColumnVisibilityButtonVisible", "setColumnWidth", "Basescanner_ColWidth_2", "Basescanner_ColWidth_3", "Basescanner_ColWidth_4", "Basescanner_ColWidth_5", "Basescanner_ColWidth_6", "Basescanner_ColWidth_7", "Basescanner_ColWidth_8", "Basescanner_ColWidth_9", "Basescanner_ColWidth_10", "Basescanner_ColWidth_11", "Basescanner_ColWidth_12", "Basescanner_ColWidth_13", "Basescanner_ColWidth_14", "Basescanner_ColWidth_15", "Basescanner_ColWidth_16", "Basescanner_ColWidth_17", "Basescanner_ColWidth_18", "Basescanner_ColWidth_19", "getTableColumnModel", "getColumnCount", "Basescanner_Column_", "setColumnVisible", "Statics", "images", "headerrenderer", "setHeaderCellRenderer", "FA", "set", "cellrenderer", "setDataCellRenderer", "cellDblclick", "BaseScannerGUI", "addListener", "widthChanged", "col", "getData", "newWidth", "Basescanner_ColWidth_", "setserver", "Addons.BaseScannerGUI.FI: ", "getRow", "length", ":", "split", "VisMain", "Vis", "getValue", "ZK", "getApplication", "Init", "core", "closeCityInfo", "getBackgroundArea", "pavmCombatSetupDefense", "PlayerAreaViewMode", "setView", "getPlayArea", "get_CurrentOwnCity", "get_Cities", "set_CurrentTargetBaseId", "get_CityArmyFormationsManager", "Addons.BaseScannerGUI FB error: ", "Scan", "setLabel", "ZG", "ZH", "format", "util", "setGroupingUsed", "setMaximumFractionDigits", "abs", "floor", "k", "M", "G", "container", "setMargin", "changeSelection", "CP Limit", "white", "basic", "ZQ", "Basescanner_Cplimiter", "", "min Level", "Basescanner_minLevel", "1", "ZY", "Player", "setTextColor", "Basescanner_Show0", "setValue", "changeValue", "Bases", "Basescanner_Show1", "Outpost", "Basescanner_Show2", "Camp", "Basescanner_Show3", "execute", "solid", "blue", "decoration", "ZV", "red", "ZU", "green", "ZX", "center", "YZ", "clear Cache", "ZZ", "Only center on World", "ZJ", "7 ", " 5 ", "6 ", " 6 ", "5 ", " 7 ", "ZD", "Get Layouts", "BaseScannerLayout", "Addons", "BaseScanner Layout", "openWindow", "setEnabled", "ZB", "Loader", "gui", "ZR", "getColumnName", "isColumnVisible", "index", "ZO", "+", "ZI", "addAfter", "-", "remove", "right", "setAlignX", "ZF", "Addons.BaseScannerGUI.createOptions: ", "\x3Ca href=\x22https://sites.google.com/site/blindmanxdonate\x22 target=\x22_blank\x22\x3ESupport Development of BlinDManX Addons\x3C/a\x3E", "ZP", "getModel", "getSelection", "get_PosX", "get_PosY", "set_CurrentCityId", "ZT", "prototype", "WorldObjectCity", "WorldSector", "$ctor", "ClientLib.Data.WorldSector.WorldObjectCity", "getLevel", "Error - ClientLib.Data.WorldSector.WorldObjectCity.Level undefined", "error", "getID", "Error - ClientLib.Data.WorldSector.WorldObjectCity.ID undefined", "WorldObjectNPCBase", "ClientLib.Data.WorldSector.WorldObjectNPCBase", "Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.Level undefined", "Error - ClientLib.Data.WorldSector.WorldObjectNPCBase.ID undefined", "WorldObjectNPCCamp", "ClientLib.Data.WorldSector.WorldObjectNPCCamp", "Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.Level undefined", "getCampType", "Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.CampType undefined", "Error - ClientLib.Data.WorldSector.WorldObjectNPCCamp.ID undefined", "Pause", "window.Addons.BaseScannerGUI.getInstance().FJ()", "setTimeout", "window.Addons.BaseScannerGUI.getInstance().FG()", "/", "ZM", "get_World", "Scanning from: ", "get_Name", "get_MaxAttackDistance", "get_Server", "sqrt", "Type", "function", "push", "sortByColumn", "name", "DR01D", "Maelstrom_Basescanner FJ error: ", "data null: ", "warn", "data[i] null: ", "get_PlayerId", "get_AllianceId", "get_IsGhostMode", "get_CityUnitsData", "d", "get_Buildings", "get_DefenseUnits", "get_OffenseUnits", "EResourceType", "Base", "Gold", "ResearchPoints", "ZA", "get_Health", "get_MdbUnitId", "get_CoordY", "HPRecord", " finish", "countlastidchecked", " on ", " removed (GetBuildingsConditionInPercent == 0)", "splice", " removed (IsGhostMode)", "lastid", " removed (found no data)", "MaelstromTools_Basescanner getResources", "ZS", "define", "Class", "Addons.BaseScannerLayout", "Addons.BaseScannerLayout ", "ZW", "Addons.BaseScannerLayout.construct: ", "Addons.BaseScannerLayout.openWindow: ", "ZE null: ", "\x3Ctable border=\x222\x22 cellspacing=\x220\x22 cellpadding=\x220\x22\x3E", " - ", "\x3Ctr\x3E\x3Ctd colspan=\x229\x22\x3E\x3Cfont color=\x22#FFF\x22\x3E", "\x3C/font\x3E\x3C/td\x3E\x3C/tr\x3E", "\x3Ctr\x3E", "\x3Cimg width=\x2214\x22 height=\x2214\x22 src=\x22", "\x22\x3E", "Emptypixels", "\x3Ctd\x3E", "\x3C/td\x3E", "\x3C/tr\x3E", "\x3C/table\x3E", "#303030", "cid", "click", "setReturnValue", "Addons.LocalStorage", "static", "undefined", "isSupported", "stringify", "Addons.LocalStorage.setglobal: ", "isdefined", "parse", "Addons.LocalStorage.getglobal: ", "object", "LocalStorage data from server not null, but not object", "LocalStorage data from server not null, but parsererror", "Addons.LocalStorage.setserver: ", "isdefineddata", "Addons.LocalStorage.getserver: ", "Addons.Language", "main", "hasOwnProperty", "Translate Added ", "Addons.Language.addtranslateobj main not define", "getLocale", "Manager", "locale", "_", "Addons.Language.get ", " not translate for locale ", "qx.ui.table.cellrenderer.Replace", "Default", "Function", "value", "getReplaceMap", "getReplaceFunction", "escape", "String", "bom", "Maelstrom_Basescanner initalisiert", "Point", "Position", "addtranslateobj", "BaseScanner Overview", "Basescanner Übersicht", "Visão geral do scanner de base", "Aperçu du scanner de base", "Scannen", "Esquadrinhar", "Balayer", "Lage", "localização", "Emplacement", "Spieler", "Jogador", "Joueur", "Camp,Outpost", "Lager,Vorposten", "Camp,posto avançado", "Camp,avant-poste", "Lager", "Vorposten", "posto avançado", "avant-poste", "Layout da Base de Dados de Scanner", "Mise scanner de base", "Show Layouts", "Layouts anzeigen", "Mostrar Layouts", "Voir Layouts", "Gebäudezustand", "construção do Estado", "construction de l\x27État", "Verteidigungszustand", "de Defesa do Estado", "défense de l\x27Etat", "KP", "KP begrenzen", "CP limitar", "CP limiter", "min. Level", "nível mínimo", "niveau minimum", "Cache leeren", "limpar cache", "vider le cache", "Nur auf Welt zentrieren", "Único centro no Mundial", "Seul centre sur World", "Basis errichtbar", "base de configurar a", "mis en place à la base", "Infantry", "Infanterie", "Infantaria", "Vehicle", "Fahrzeuge", "Veículos", "Vehicule", "Aircraft", "Flugzeuge", "Aeronaves", "Aviation", "Tibério", "Kristalle", "Cristal", "Power", "Strom", "Potência", "Energie", "Credits", "Créditos", "Crédit", "Forschung", "Investigação", "Recherche", "-----", "--", "FileManager", "File", "BaseScanner", "ui/icons/icon_item.png", "createNewImage", "ui/menues/main_menu/misc_empty_pixel.png", "version ", "desktopPosition", "createDesktopButton", " version ", "addToMainMenu", "AddonMainMenu", "Basescanner", "ALT+B", "Wrapper", "Count", "get_HitpointsPercent", "MaelstromTools_Basescanner getResourcesPart", "replace", "match", "Error - ", "not found", "MaelstromTools_Basescanner_checkIfLoaded: ", "domain", "test"];
            window[e[0]] = e[1];
            function j() {
                qx[e[312]][e[311]](e[2], {type: e[3],extend: qx[e[6]][e[5]][e[4]],construct: function() {
                        try {
                            this[e[7]](arguments);
                            console[e[9]](e[8] + window[e[0]]);
                            this[e[10]] = Addons[e[12]][e[11]]();
                            this[e[13]](820);
                            this[e[14]](400);
                            this[e[15]](10);
                            this[e[16]](true);
                            this[e[17]](true);
                            this[e[18]](true);
                            this[e[19]](true);
                            this[e[20]](true);
                            this[e[21]](true);
                            this[e[22]](true);
                            this[e[23]](false);
                            this[e[24]](null);
                            this[e[25]](5);
                            this[e[27]](new qx[e[6]][e[26]].VBox(3));
                            this[e[29]][e[28]] = e[30];
                            this.FI();
                            this.FH();
                            this.FD();
                            if (this[e[31]] == null) {
                                this[e[31]] = [];
                            }
                            this[e[25]](0);
                            this[e[32]]();
                            this[e[33]](this.ZF);
                            this[e[33]](this.ZN);
                            this[e[33]](this.ZP);
                            this[e[35]][e[34]](this.ZE);
                        } catch (t) {
                            console[e[37]](e[36], t);
                        }
                    },members: {stats: document[e[39]](e[38]),T: null,ZA: 0,ZB: null,ZC: null,ZD: null,ZE: null,ZF: null,ZG: null,ZH: false,ZI: true,ZJ: null,ZK: null,ZL: null,ZM: null,ZN: null,ZO: null,ZP: null,ZQ: null,ZR: [],ZT: true,ZU: null,ZV: null,ZX: null,ZY: null,ZZ: [],ZS: {},YZ: null,YY: null,openWindow: function(w) {
                            try {
                                this[e[40]](w);
                                if (this[e[41]]()) {
                                    this[e[42]]();
                                } else {
                                    q[e[43]]();
                                    q = window[e[45]][e[44]][e[11]]();
                                    var v;
                                    this[e[46]][e[32]]();
                                    for (v in q[e[47]]) {
                                        var u = new qx[e[6]][e[48]].ListItem(v, null, q[e[47]][v].Object);
                                        this[e[46]][e[33]](u);
                                        if (Addons[e[51]][e[50]](e[49]) == q[e[47]][v][e[53]][e[52]]()) {
                                            this[e[46]][e[54]]([u]);
                                        }
                                    }
                                    this[e[55]]();
                                    this[e[56]](100, 100);
                                }
                            } catch (t) {
                                console[e[58]](e[57], t);
                            }
                        },FI: function() {
                            try {
                                this[e[35]] = new qx[e[6]][e[60]][e[59]].Simple();
                                this[e[35]][e[82]]([e[61], e[62], this[e[10]][e[64]](e[63]), this[e[10]][e[64]](e[65]), this[e[10]][e[64]](e[66]), this[e[10]][e[64]](e[67]), this[e[10]][e[64]](e[68]), this[e[10]][e[64]](e[69]), this[e[10]][e[64]](e[70]), e[71], e[72], this[e[10]][e[64]](e[73]), this[e[10]][e[64]](e[74]), this[e[10]][e[64]](e[75]), e[76], e[77], e[78], e[79], e[80], this[e[10]][e[64]](e[81])]);
                                this[e[83]] = ClientLib[e[86]][e[85]].GetInstance()[e[84]]();
                                this[e[87]] = new qx[e[6]][e[60]].Table(this.ZL);
                                this[e[87]][e[88]](false);
                                this[e[87]][e[89]](0, 0);
                                this[e[87]][e[89]](1, 0);
                                this[e[87]][e[89]](2, Addons[e[51]][e[50]](e[90], 120));
                                this[e[87]][e[89]](3, Addons[e[51]][e[50]](e[91], 60));
                                this[e[87]][e[89]](4, Addons[e[51]][e[50]](e[92], 50));
                                this[e[87]][e[89]](5, Addons[e[51]][e[50]](e[93], 60));
                                this[e[87]][e[89]](6, Addons[e[51]][e[50]](e[94], 60));
                                this[e[87]][e[89]](7, Addons[e[51]][e[50]](e[95], 60));
                                this[e[87]][e[89]](8, Addons[e[51]][e[50]](e[96], 60));
                                this[e[87]][e[89]](9, Addons[e[51]][e[50]](e[97], 30));
                                this[e[87]][e[89]](10, Addons[e[51]][e[50]](e[98], 30));
                                this[e[87]][e[89]](11, Addons[e[51]][e[50]](e[99], 50));
                                this[e[87]][e[89]](12, Addons[e[51]][e[50]](e[100], 50));
                                this[e[87]][e[89]](13, Addons[e[51]][e[50]](e[101], 30));
                                this[e[87]][e[89]](14, Addons[e[51]][e[50]](e[102], 60));
                                this[e[87]][e[89]](15, Addons[e[51]][e[50]](e[103], 60));
                                this[e[87]][e[89]](16, Addons[e[51]][e[50]](e[104], 60));
                                this[e[87]][e[89]](17, Addons[e[51]][e[50]](e[105], 50));
                                this[e[87]][e[89]](18, Addons[e[51]][e[50]](e[106], 50));
                                this[e[87]][e[89]](19, Addons[e[51]][e[50]](e[107], 40));
                                var u = 0;
                                var t = this[e[87]][e[108]]();
                                for (u = 0; u < this[e[35]][e[109]](); u++) {
                                    if (u == 0 || u == 1 || u == 11 || u == 12) {
                                        t[e[111]](u, Addons[e[51]][e[50]](e[110] + u, false));
                                    } else {
                                        t[e[111]](u, Addons[e[51]][e[50]](e[110] + u, true));
                                    }
                                }
                                t[e[111]](1, false);
                                t[e[115]](9, new qx[e[6]][e[60]][e[114]].Icon(p[e[113]][MaelstromTools[e[112]][e[68]]]), e[71]);
                                t[e[115]](10, new qx[e[6]][e[60]][e[114]].Icon(p[e[113]][MaelstromTools[e[112]][e[67]]], e[72]));
                                t[e[119]](5, new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction: this[e[116]]}));
                                t[e[119]](6, new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction: this[e[116]]}));
                                t[e[119]](7, new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction: this[e[116]]}));
                                t[e[119]](8, new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction: this[e[116]]}));
                                t[e[119]](15, new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction: this[e[116]]}));
                                t[e[119]](16, new qx[e[6]][e[60]][e[118]].Replace()[e[117]]({ReplaceFunction: this[e[116]]}));
                                t[e[119]](19, new qx[e[6]][e[60]][e[118]].Boolean());
                                this[e[87]][e[122]](e[120], function(w) {
                                    Addons[e[121]][e[11]]().FB(w);
                                }, this);
                                t[e[122]](e[123], function(y) {
                                    var x = y[e[125]]()[e[124]];
                                    var w = y[e[125]]()[e[126]];
                                    Addons[e[51]][e[128]](e[127] + x, w);
                                }, t);
                            } catch (v) {
                                console[e[37]](e[129], v);
                            }
                        },FB: function(y) {
                            try {
                                var A = this[e[31]][y[e[130]]()][0];
                                var z = this[e[31]][y[e[130]]()][3];
                                if (z != null && z[e[133]](e[132])[e[131]] == 2) {
                                    var x = parseInt(z[e[133]](e[132])[0]);
                                    var w = parseInt(z[e[133]](e[132])[1]);
                                    ClientLib[e[135]][e[134]].GetInstance().CenterGridPosition(x, w);
                                }
                                if (A && !(this[e[137]][4][e[136]]())) {
                                    var u = qx[e[140]][e[139]][e[138]]();
                                    u[e[142]]()[e[141]]();
                                    u[e[146]]()[e[145]](ClientLib[e[86]][e[144]][e[143]], A, 0, 0);
                                }
                                var t = ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[147]]();
                                if (t != null) {
                                    t[e[150]]()[e[149]](A);
                                }
                            } catch (v) {
                                console[e[37]](e[151], v);
                            }
                        },FN: function(t) {
                            this[e[154]][e[153]](this[e[10]][e[64]](e[152]));
                            this[e[155]] = false;
                        },CBChanged: function(t) {
                            this[e[155]] = false;
                        },FA: function(t) {
                            var u = new qx[e[157]][e[156]].NumberFormat();
                            u[e[158]](true);
                            u[e[159]](3);
                            if (!isNaN(t)) {
                                if (Math[e[160]](t) < 100000) {
                                    t = u[e[156]](Math[e[161]](t));
                                } else {
                                    if (Math[e[160]](t) >= 100000 && Math[e[160]](t) < 1000000) {
                                        t = u[e[156]](Math[e[161]](t / 100) / 10) + e[162];
                                    } else {
                                        if (Math[e[160]](t) >= 1000000 && Math[e[160]](t) < 10000000) {
                                            t = u[e[156]](Math[e[161]](t / 1000) / 1000) + e[163];
                                        } else {
                                            if (Math[e[160]](t) >= 10000000 && Math[e[160]](t) < 100000000) {
                                                t = u[e[156]](Math[e[161]](t / 10000) / 100) + e[163];
                                            } else {
                                                if (Math[e[160]](t) >= 100000000 && Math[e[160]](t) < 1000000000) {
                                                    t = u[e[156]](Math[e[161]](t / 100000) / 10) + e[163];
                                                } else {
                                                    if (Math[e[160]](t) >= 1000000000 && Math[e[160]](t) < 10000000000) {
                                                        t = u[e[156]](Math[e[161]](t / 1000000) / 1000) + e[164];
                                                    } else {
                                                        if (Math[e[160]](t) >= 10000000000 && Math[e[160]](t) < 100000000000) {
                                                            t = u[e[156]](Math[e[161]](t / 10000000) / 100) + e[164];
                                                        } else {
                                                            if (Math[e[160]](t) >= 100000000000 && Math[e[160]](t) < 1000000000000) {
                                                                t = u[e[156]](Math[e[161]](t / 100000000) / 10) + e[164];
                                                            } else {
                                                                if (Math[e[160]](t) >= 1000000000000 && Math[e[160]](t) < 10000000000000) {
                                                                    t = u[e[156]](Math[e[161]](t / 1000000000) / 1000) + e[10];
                                                                } else {
                                                                    if (Math[e[160]](t) >= 10000000000000 && Math[e[160]](t) < 100000000000000) {
                                                                        t = u[e[156]](Math[e[161]](t / 10000000000) / 100) + e[10];
                                                                    } else {
                                                                        if (Math[e[160]](t) >= 100000000000000 && Math[e[160]](t) < 1000000000000000) {
                                                                            t = u[e[156]](Math[e[161]](t / 100000000000) / 10) + e[10];
                                                                        } else {
                                                                            if (Math[e[160]](t) >= 1000000000000000) {
                                                                                t = u[e[156]](Math[e[161]](t / 1000000000000)) + e[10];
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            return t.toString();
                        },FH: function() {
                            try {
                                var D = new qx[e[6]][e[26]].Flow();
                                var C = new qx[e[6]][e[165]].Composite(D);
                                this[e[46]] = new qx[e[6]][e[48]].SelectBox();
                                this[e[46]][e[14]](25);
                                this[e[46]][e[166]](5);
                                q[e[43]]();
                                q = window[e[45]][e[44]][e[11]]();
                                var G;
                                for (G in q[e[47]]) {
                                    var F = new qx[e[6]][e[48]].ListItem(G, null, q[e[47]][G].Object);
                                    this[e[46]][e[33]](F);
                                    if (Addons[e[51]][e[50]](e[49]) == q[e[47]][G][e[53]][e[52]]()) {
                                        this[e[46]][e[54]]([F]);
                                    }
                                }
                                this[e[46]][e[122]](e[167], function(H) {
                                    this.FP(0, 1, 200);
                                    this[e[155]] = false;
                                    this[e[154]][e[153]](this[e[10]][e[64]](e[152]));
                                }, this);
                                C[e[33]](this.ZC);
                                var B = new qx[e[6]][e[170]].Label()[e[117]]({value: this[e[10]][e[64]](e[168]),textColor: e[169],margin: 5});
                                C[e[33]](B);
                                this[e[171]] = new qx[e[6]][e[48]].SelectBox();
                                this[e[171]][e[13]](50);
                                this[e[171]][e[14]](25);
                                this[e[171]][e[166]](5);
                                var z = Addons[e[51]][e[50]](e[172], 25);
                                for (var x = 11; x < 41; x += 1) {
                                    F = new qx[e[6]][e[48]].ListItem(e[173] + x, null, x);
                                    this[e[171]][e[33]](F);
                                    if (z == x) {
                                        this[e[171]][e[54]]([F]);
                                    }
                                }
                                this[e[171]][e[122]](e[167], function(H) {
                                    this[e[31]] = [];
                                    this.FP(0, 1, 200);
                                    this[e[155]] = false;
                                    this[e[154]][e[153]](this[e[10]][e[64]](e[152]));
                                }, this);
                                C[e[33]](this.ZQ);
                                var v = new qx[e[6]][e[170]].Label()[e[117]]({value: this[e[10]][e[64]](e[174]),textColor: e[169],margin: 5});
                                C[e[33]](v);
                                var u = Addons[e[51]][e[50]](e[175], e[176]);
                                this[e[177]] = new qx[e[6]][e[48]].TextField(u)[e[117]]({width: 50});
                                C[e[33]](this.ZY);
                                this[e[137]] = [];
                                this[e[137]][0] = new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[178]));
                                this[e[137]][0][e[166]](5);
                                this[e[137]][0][e[179]](e[169]);
                                this[e[137]][0][e[181]](Addons[e[51]][e[50]](e[180], false));
                                this[e[137]][0][e[122]](e[182], function(H) {
                                    this[e[31]] = [];
                                    this.FP(0, 1, 200);
                                    this[e[155]] = false;
                                    this[e[154]][e[153]](this[e[10]][e[64]](e[152]));
                                }, this);
                                C[e[33]](this[e[137]][0]);
                                this[e[137]][1] = new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[183]));
                                this[e[137]][1][e[166]](5);
                                this[e[137]][1][e[179]](e[169]);
                                this[e[137]][1][e[181]](Addons[e[51]][e[50]](e[184], false));
                                this[e[137]][1][e[122]](e[182], function(H) {
                                    this[e[31]] = [];
                                    this.FP(0, 1, 200);
                                    this[e[155]] = false;
                                    this[e[154]][e[153]](this[e[10]][e[64]](e[152]));
                                }, this);
                                C[e[33]](this[e[137]][1]);
                                this[e[137]][2] = new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[185]));
                                this[e[137]][2][e[166]](5);
                                this[e[137]][2][e[179]](e[169]);
                                this[e[137]][2][e[181]](Addons[e[51]][e[50]](e[186], false));
                                this[e[137]][2][e[122]](e[182], function(H) {
                                    this[e[31]] = [];
                                    this.FP(0, 1, 200);
                                    this[e[155]] = false;
                                    this[e[154]][e[153]](this[e[10]][e[64]](e[152]));
                                }, this);
                                C[e[33]](this[e[137]][2]);
                                this[e[137]][3] = new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[187]));
                                this[e[137]][3][e[166]](5);
                                this[e[137]][3][e[179]](e[169]);
                                this[e[137]][3][e[181]](Addons[e[51]][e[50]](e[188], true));
                                this[e[137]][3][e[122]](e[182], function(H) {
                                    this[e[31]] = [];
                                    this.FP(0, 1, 200);
                                    this[e[155]] = false;
                                    this[e[154]][e[153]](this[e[10]][e[64]](e[152]));
                                }, this);
                                C[e[33]](this[e[137]][3], {lineBreak: true});
                                this[e[154]] = new qx[e[6]][e[48]].Button(this[e[10]][e[64]](e[152]))[e[117]]({width: 100,minWidth: 100,maxWidth: 100,height: 25,margin: 5});
                                this[e[154]][e[122]](e[189], function() {
                                    this.FE();
                                }, this);
                                C[e[33]](this.ZG);
                                var t = new qx[e[6]][e[192]].Single(2, e[190], e[191]);
                                this[e[193]] = new qx[e[6]][e[165]].Composite(new qx[e[6]][e[26]].Basic())[e[117]]({decorator: t,backgroundColor: e[194],allowGrowX: false,height: 20,width: 200});
                                this[e[195]] = new qx[e[6]][e[140]].Widget()[e[117]]({decorator: null,backgroundColor: e[196],width: 0});
                                this[e[193]][e[33]](this.ZU);
                                this[e[197]] = new qx[e[6]][e[170]].Label(e[173])[e[117]]({decorator: null,textAlign: e[198],width: 200});
                                this[e[193]][e[33]](this.ZX, {left: 0,top: -3});
                                C[e[33]](this.ZV);
                                this[e[199]] = new qx[e[6]][e[48]].Button(this[e[10]][e[64]](e[200]))[e[117]]({minWidth: 100,height: 25,margin: 5});
                                this[e[199]][e[122]](e[189], function() {
                                    this[e[201]] = [];
                                }, this);
                                C[e[33]](this.YZ);
                                this[e[137]][4] = new qx[e[6]][e[48]].CheckBox(this[e[10]][e[64]](e[202]));
                                this[e[137]][4][e[166]](5);
                                this[e[137]][4][e[179]](e[169]);
                                C[e[33]](this[e[137]][4], {lineBreak: true});
                                this[e[203]] = new qx[e[6]][e[48]].SelectBox();
                                this[e[203]][e[13]](150);
                                this[e[203]][e[14]](25);
                                this[e[203]][e[166]](5);
                                var F = new qx[e[6]][e[48]].ListItem(e[204] + this[e[10]][e[64]](MaelstromTools[e[112]].Tiberium) + e[205] + this[e[10]][e[64]](MaelstromTools[e[112]].Crystal), null, 7);
                                this[e[203]][e[33]](F);
                                F = new qx[e[6]][e[48]].ListItem(e[206] + this[e[10]][e[64]](MaelstromTools[e[112]].Tiberium) + e[207] + this[e[10]][e[64]](MaelstromTools[e[112]].Crystal), null, 6);
                                this[e[203]][e[33]](F);
                                F = new qx[e[6]][e[48]].ListItem(e[208] + this[e[10]][e[64]](MaelstromTools[e[112]].Tiberium) + e[209] + this[e[10]][e[64]](MaelstromTools[e[112]].Crystal), null, 5);
                                this[e[203]][e[33]](F);
                                C[e[33]](this.ZJ);
                                this[e[210]] = new qx[e[6]][e[48]].Button(this[e[10]][e[64]](e[211]))[e[117]]({width: 120,minWidth: 120,maxWidth: 120,height: 25,margin: 5});
                                this[e[210]][e[122]](e[189], function() {
                                    var H = window[e[213]][e[212]][e[11]]();
                                    H[e[215]](this[e[10]][e[64]](e[214]));
                                }, this);
                                this[e[210]][e[216]](false);
                                C[e[33]](this.ZD);
                                this[e[217]] = new qx[e[6]][e[165]].Composite();
                                this[e[217]][e[27]](new qx[e[6]][e[26]].Flow());
                                this[e[217]][e[13]](750);
                                var A = webfrontend[e[219]][e[26]][e[218]][e[11]]();
                                var y = 2;
                                for (y = 2; y < this[e[35]][e[109]](); y++) {
                                    var w = y - 2;
                                    this[e[220]][w] = new qx[e[6]][e[48]].CheckBox(this[e[35]][e[221]](y));
                                    this[e[220]][w][e[181]](this[e[87]][e[108]]()[e[222]](y));
                                    this[e[220]][w][e[179]](e[169]);
                                    this[e[220]][w][e[223]] = y;
                                    this[e[220]][w][e[60]] = this[e[87]];
                                    this[e[220]][w][e[122]](e[182], function(H) {
                                        var I = this[e[60]][e[108]]();
                                        I[e[111]](this[e[223]], H[e[125]]());
                                        Addons[e[51]][e[128]](e[110] + this[e[223]], H[e[125]]());
                                    });
                                    this[e[217]][e[33]](this[e[220]][w]);
                                }
                                this[e[224]] = new qx[e[6]][e[48]].Button(e[225])[e[117]]({margin: 5});
                                this[e[224]][e[122]](e[189], function() {
                                    if (this[e[226]]) {
                                        C[e[227]](this.ZB, this.ZO);
                                        this[e[224]][e[153]](e[228]);
                                    } else {
                                        C[e[229]](this.ZB);
                                        this[e[224]][e[153]](e[225]);
                                    }
                                    this[e[226]] = !this[e[226]];
                                }, this);
                                this[e[224]][e[231]](e[230]);
                                C[e[33]](this.ZO, {lineBreak: true});
                                this[e[232]] = C;
                            } catch (E) {
                                console[e[37]](e[233], E);
                            }
                        },FD: function() {
                            var v = ClientLib[e[86]][e[85]].GetInstance()[e[148]]();
                            var t = v[e[147]]();
                            var u = e[234];
                            var w = new qx[e[6]][e[170]].Label()[e[117]]({value: u,rich: true,width: 800});
                            this[e[235]] = w;
                        },FE: function() {
                            var u = this[e[46]][e[237]]()[0][e[236]]();
                            ClientLib[e[135]][e[134]].GetInstance().CenterGridPosition(u[e[238]](), u[e[239]]());
                            ClientLib[e[135]][e[134]].GetInstance().Update();
                            ClientLib[e[135]][e[134]].GetInstance().ViewUpdate();
                            ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[240]](u[e[52]]());
                            if (this[e[241]]) {
                                var t = ClientLib[e[86]][e[244]][e[243]][e[242]];
                                var y = g(t[e[245]], /this\.(.{6})=\(?\(?g>>8\)?\&.*d\+=f;this\.(.{6})=\(/, e[246], 2);
                                if (y != null && y[1][e[131]] == 6) {
                                    t[e[247]] = function() {
                                        return this[y[1]];
                                    };
                                } else {
                                    console[e[249]](e[248]);
                                }
                                if (y != null && y[2][e[131]] == 6) {
                                    t[e[250]] = function() {
                                        return this[y[2]];
                                    };
                                } else {
                                    console[e[249]](e[251]);
                                }
                                t = ClientLib[e[86]][e[244]][e[252]][e[242]];
                                var x = g(t[e[245]], /100\){0,1};this\.(.{6})=Math.floor.*d\+=f;this\.(.{6})=\(/, e[253], 2);
                                if (x != null && x[1][e[131]] == 6) {
                                    t[e[247]] = function() {
                                        return this[x[1]];
                                    };
                                } else {
                                    console[e[249]](e[254]);
                                }
                                if (x != null && x[2][e[131]] == 6) {
                                    t[e[250]] = function() {
                                        return this[x[2]];
                                    };
                                } else {
                                    console[e[249]](e[255]);
                                }
                                t = ClientLib[e[86]][e[244]][e[256]][e[242]];
                                var w = g(t[e[245]], /100\){0,1};this\.(.{6})=Math.floor.*this\.(.{6})=\(*g\>\>(22|0x16)\)*\&.*=-1;\}this\.(.{6})=\(/, e[257], 4);
                                if (w != null && w[1][e[131]] == 6) {
                                    t[e[247]] = function() {
                                        return this[w[1]];
                                    };
                                } else {
                                    console[e[249]](e[258]);
                                }
                                if (w != null && w[2][e[131]] == 6) {
                                    t[e[259]] = function() {
                                        return this[w[2]];
                                    };
                                } else {
                                    console[e[249]](e[260]);
                                }
                                if (w != null && w[4][e[131]] == 6) {
                                    t[e[250]] = function() {
                                        return this[w[4]];
                                    };
                                } else {
                                    console[e[249]](e[261]);
                                }
                                this[e[241]] = false;
                            }
                            if (this[e[31]] == null) {
                                this[e[155]] = false;
                                this[e[154]][e[153]](e[262]);
                                this[e[210]][e[216]](false);
                                window[e[264]](e[263], 1000);
                                return;
                            }
                            var v = 0;
                            for (i = 0; i < this[e[31]][e[131]]; i++) {
                                if (this[e[31]][i][1] == -1) {
                                    v++;
                                }
                            }
                            if (!this[e[155]]) {
                                this[e[154]][e[153]](e[262]);
                                this[e[210]][e[216]](false);
                                if (v > 0) {
                                    this[e[155]] = true;
                                    window[e[264]](e[265], 1000);
                                    return;
                                } else {
                                    this[e[155]] = false;
                                    window[e[264]](e[263], 1000);
                                }
                            } else {
                                this[e[155]] = false;
                                this[e[154]][e[153]](this[e[10]][e[64]](e[152]));
                            }
                        },FP: function(v, u, t) {
                            if (this[e[195]] != null && this[e[197]] != null) {
                                this[e[195]][e[13]](parseInt(v / u * t, 10));
                                this[e[197]][e[181]](v + e[266] + u);
                            }
                        },FJ: function() {
                            try {
                                this[e[267]] = {};
                                this[e[31]] = [];
                                var N = this[e[46]][e[237]]()[0][e[236]]();
                                Addons[e[51]][e[128]](e[49], N[e[52]]());
                                var G = this[e[171]][e[237]]()[0][e[236]]();
                                Addons[e[51]][e[128]](e[172], G);
                                Addons[e[51]][e[128]](e[175], this[e[177]][e[136]]());
                                var M = this[e[137]][0][e[136]]();
                                var L = this[e[137]][1][e[136]]();
                                var K = this[e[137]][2][e[136]]();
                                var J = this[e[137]][3][e[136]]();
                                var I = parseInt(this[e[177]][e[136]](), 10);
                                Addons[e[51]][e[128]](e[180], M);
                                Addons[e[51]][e[128]](e[184], L);
                                Addons[e[51]][e[128]](e[186], K);
                                Addons[e[51]][e[128]](e[188], J);
                                var F = N[e[238]]();
                                var E = N[e[239]]();
                                var H = 0;
                                var C = 0;
                                var B = ClientLib[e[86]][e[85]].GetInstance()[e[268]]();
                                console[e[9]](e[269] + N[e[270]]());
                                var A = true;
                                var y = true;
                                var w = true;
                                var u = ClientLib[e[86]][e[85]].GetInstance()[e[272]]()[e[271]]();
                                for (C = E - Math[e[161]](u + 1); C <= E + Math[e[161]](u + 1); C++) {
                                    for (H = F - Math[e[161]](u + 1); H <= F + Math[e[161]](u + 1); H++) {
                                        var t = Math[e[160]](F - H);
                                        var R = Math[e[160]](E - C);
                                        var Q = Math[e[273]]((t * t) + (R * R));
                                        if (Q <= u) {
                                            var P = B.GetObjectFromPosition(H, C);
                                            var z = {};
                                            if (P) {
                                                if (P[e[274]] == 1 && A) {
                                                }
                                                if (P[e[274]] == 2 && y) {
                                                }
                                                if (P[e[274]] == 3 && w) {
                                                }
                                                if (P[e[274]] == 3) {
                                                    if (I <= parseInt(P[e[247]](), 10)) {
                                                    }
                                                }
                                                var x = N.CalculateAttackCommandPointCostToCoord(H, C);
                                                if (x <= G && typeof P[e[247]] == e[275]) {
                                                    if (I <= parseInt(P[e[247]](), 10)) {
                                                        var v = this.FL(P[e[250]](), 0);
                                                        var D = this.FL(P[e[250]](), 1);
                                                        if (D != null) {
                                                            this[e[267]][P[e[250]]()] = D;
                                                        }
                                                        if (P[e[274]] == 1 && M) {
                                                            if (v != null) {
                                                                this[e[31]][e[276]](v);
                                                            } else {
                                                                this[e[31]][e[276]]([P[e[250]](), -1, this[e[10]][e[64]](e[178]), H + e[132] + C, P[e[247]](), 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, 0, 0]);
                                                            }
                                                        }
                                                        if (P[e[274]] == 2 && L) {
                                                            if (v != null) {
                                                                this[e[31]][e[276]](v);
                                                            } else {
                                                                this[e[31]][e[276]]([P[e[250]](), -1, this[e[10]][e[64]](e[183]), H + e[132] + C, P[e[247]](), 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, 0, 0]);
                                                            }
                                                        }
                                                        if (P[e[274]] == 3 && (K || J)) {
                                                            if (v != null) {
                                                                if (P[e[259]]() == 2 && J) {
                                                                    this[e[31]][e[276]](v);
                                                                }
                                                                if (P[e[259]]() == 3 && K) {
                                                                    this[e[31]][e[276]](v);
                                                                }
                                                            } else {
                                                                if (P[e[259]]() == 2 && J) {
                                                                    this[e[31]][e[276]]([P[e[250]](), -1, this[e[10]][e[64]](e[187]), H + e[132] + C, P[e[247]](), 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, 0, 0]);
                                                                }
                                                                if (P[e[259]]() == 3 && K) {
                                                                    this[e[31]][e[276]]([P[e[250]](), -1, this[e[10]][e[64]](e[185]), H + e[132] + C, P[e[247]](), 0, 0, 0, 0, 0, 0, 0, 0, x, 0, 0, 0, 0]);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                this[e[155]] = true;
                                this[e[35]][e[34]](this.ZE);
                                this.FP(0, this[e[31]][e[131]], 200);
                                this[e[35]][e[277]](4, false);
                                if (this[e[83]][e[278]] != e[279]) {
                                    window[e[264]](e[265], 50);
                                }
                            } catch (O) {
                                console[e[37]](e[280], O);
                            }
                        },FG: function() {
                            try {
                                var u = false;
                                var t = 0;
                                var X = 10;
                                var y = 0;
                                var R = 150;
                                while (!u) {
                                    var Q = null;
                                    var O = 0;
                                    var M = 0;
                                    if (this[e[31]] == null) {
                                        console[e[282]](e[281]);
                                        this[e[155]] = false;
                                        break;
                                    }
                                    for (y = 0; y < this[e[31]][e[131]]; y++) {
                                        if (this[e[31]][y][1] == -1) {
                                            break;
                                        }
                                    }
                                    if (y == this[e[31]][e[131]]) {
                                        this[e[155]] = false;
                                    }
                                    this.FP(y, this[e[31]][e[131]], 200);
                                    if (this[e[31]][y] == null) {
                                        console[e[282]](e[283]);
                                        this[e[155]] = false;
                                        this[e[154]][e[153]](this[e[10]][e[64]](e[152]));
                                        this[e[210]][e[216]](true);
                                        break;
                                    }
                                    posData = this[e[31]][y][3];
                                    if (posData != null && posData[e[133]](e[132])[e[131]] == 2) {
                                        posX = parseInt(posData[e[133]](e[132])[0]);
                                        posY = parseInt(posData[e[133]](e[132])[1]);
                                        var K = ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[147]]();
                                        var v = ClientLib[e[86]][e[85]].GetInstance()[e[268]]();
                                        var I = v.CheckFoundBase(posX, posY, K[e[284]](), K[e[285]]());
                                        this[e[31]][y][19] = (I == 0) ? true : false;
                                        M = this[e[31]][y][0];
                                        ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[240]](M);
                                        Q = ClientLib[e[86]][e[85]].GetInstance()[e[148]]().GetCity(M);
                                        if (Q != null) {
                                            if (!Q[e[286]]()) {
                                                var E = Q[e[287]]();
                                                if (E != null) {
                                                    var T = this[e[46]][e[237]]()[0][e[236]]();
                                                    var C = Q[e[289]]()[e[288]];
                                                    var z = E[e[290]]()[e[288]];
                                                    var w = T[e[287]]()[e[291]]()[e[288]];
                                                    if (C != null) {
                                                        var P = d(C);
                                                        var L = d(z);
                                                        this[e[31]][y][2] = Q[e[270]]();
                                                        this[e[31]][y][5] = P[ClientLib[e[293]][e[292]][e[67]]] + L[ClientLib[e[293]][e[292]][e[67]]];
                                                        this[e[31]][y][6] = P[ClientLib[e[293]][e[292]][e[68]]] + L[ClientLib[e[293]][e[292]][e[68]]];
                                                        this[e[31]][y][7] = P[ClientLib[e[293]][e[292]][e[294]]] + L[ClientLib[e[293]][e[292]][e[294]]];
                                                        this[e[31]][y][8] = P[ClientLib[e[293]][e[292]][e[295]]] + L[ClientLib[e[293]][e[292]][e[295]]];
                                                        if (Q.GetBuildingsConditionInPercent() != 0) {
                                                            this[e[296]] = 0;
                                                            if (this[e[31]][y][5] != 0) {
                                                                var S = 0;
                                                                var J = 0;
                                                                var B = 0;
                                                                var H = 0;
                                                                var G = 0;
                                                                this[e[267]][M] = new Array(9);
                                                                for (B = 0; B < 9; B++) {
                                                                    this[e[267]][M][B] = new Array(8);
                                                                }
                                                                for (H = 0; H < 9; H++) {
                                                                    for (G = 0; G < 8; G++) {
                                                                        switch (Q.GetResourceType(H, G)) {
                                                                            case 1:
                                                                                this[e[267]][M][H][G] = 1;
                                                                                S++;
                                                                                break;
                                                                            case 2:
                                                                                this[e[267]][M][H][G] = 2;
                                                                                J++;
                                                                                break;
                                                                            default:
                                                                                break;
                                                                        }
                                                                    }
                                                                }
                                                                this[e[31]][y][9] = S;
                                                                this[e[31]][y][10] = J;
                                                                this[e[31]][y][11] = Q.GetBuildingsConditionInPercent();
                                                                this[e[31]][y][12] = Q.GetDefenseConditionInPercent();
                                                                try {
                                                                    var F = w;
                                                                    var D = 0;
                                                                    var A = 0;
                                                                    for (var V in F) {
                                                                        D += F[V][e[297]]();
                                                                    }
                                                                    F = z;
                                                                    for (var V in F) {
                                                                        A += F[V][e[297]]();
                                                                    }
                                                                    F = C;
                                                                    for (var V in F) {
                                                                        var U = F[V][e[298]]();
                                                                        if (U == 158 || U == 131 || U == 195) {
                                                                            this[e[31]][y][18] = 8 - F[V][e[299]]();
                                                                        }
                                                                        if (U == 112 || U == 151 || U == 177) {
                                                                            this[e[31]][y][17] = 8 - F[V][e[299]]();
                                                                        }
                                                                    }
                                                                } catch (N) {
                                                                    console[e[37]](e[300], N);
                                                                }
                                                                this[e[31]][y][14] = (A / D);
                                                                this[e[31]][y][15] = this[e[31]][y][5] + this[e[31]][y][6] + this[e[31]][y][7];
                                                                this[e[31]][y][16] = this[e[31]][y][15] / this[e[31]][y][13];
                                                                this[e[31]][y][1] = 0;
                                                                u = true;
                                                                console[e[9]](Q[e[270]](), e[301]);
                                                                this[e[296]] = 0;
                                                                this[e[302]] = 0;
                                                                this.FK(this[e[31]][y], this[e[267]][M], M);
                                                                this[e[35]][e[34]](this.ZE);
                                                            }
                                                        } else {
                                                            if (this[e[296]] > 250) {
                                                                console[e[9]](this[e[31]][y][2], e[303], posX, posY, e[304]);
                                                                this[e[31]][e[305]](y, 1);
                                                                this[e[296]] = 0;
                                                                this[e[302]] = 0;
                                                                break;
                                                            }
                                                            this[e[296]]++;
                                                        }
                                                    }
                                                }
                                            } else {
                                                console[e[9]](this[e[31]][y][2], e[303], posX, posY, e[306]);
                                                this[e[31]][e[305]](y, 1);
                                                break;
                                            }
                                        }
                                    }
                                    t++;
                                    if (t >= X) {
                                        u = true;
                                        break;
                                    }
                                }
                                if (this[e[307]] != y) {
                                    this[e[307]] = y;
                                    this[e[302]] = 0;
                                    this[e[296]] = 0;
                                } else {
                                    if (this[e[302]] > 16) {
                                        console[e[9]](this[e[31]][y][2], e[303], posX, posY, e[308]);
                                        this[e[31]][e[305]](y, 1);
                                        this[e[302]] = 0;
                                    } else {
                                        if (this[e[302]] > 10) {
                                            R = 500;
                                        } else {
                                            if (this[e[302]] > 4) {
                                                R = 250;
                                            }
                                        }
                                    }
                                    this[e[302]]++;
                                }
                                if (this[e[155]] && Addons[e[121]][e[11]]()[e[41]]()) {
                                    window[e[264]](e[265], R);
                                } else {
                                    this[e[154]][e[153]](this[e[10]][e[64]](e[152]));
                                    this[e[155]] = false;
                                }
                            } catch (W) {
                                console[e[37]](e[309], W);
                            }
                        },FK: function(v, u, t) {
                            this[e[201]][e[276]](v);
                            this[e[310]][t] = u;
                        },FL: function(u, v) {
                            if (v == 0) {
                                for (var t = 0; t < this[e[201]][e[131]]; t++) {
                                    if (this[e[201]][t][0] == u) {
                                        return this[e[201]][t];
                                    }
                                }
                            } else {
                                if (this[e[310]][u]) {
                                    return this[e[310]][u];
                                }
                            }
                            return null;
                        }}});
                qx[e[312]][e[311]](e[313], {type: e[3],extend: qx[e[6]][e[5]][e[4]],construct: function() {
                        try {
                            this[e[7]](arguments);
                            console[e[9]](e[314] + window[e[0]]);
                            this[e[13]](820);
                            this[e[14]](400);
                            this[e[15]](10);
                            this[e[16]](false);
                            this[e[17]](true);
                            this[e[18]](true);
                            this[e[19]](true);
                            this[e[20]](true);
                            this[e[21]](false);
                            this[e[22]](true);
                            this[e[23]](false);
                            this[e[24]](null);
                            this[e[25]](10);
                            this[e[27]](new qx[e[6]][e[26]].Grow());
                            this[e[315]] = [];
                            this[e[32]]();
                            this[e[201]] = new qx[e[6]][e[165]].Scroll();
                            this[e[177]] = new qx[e[6]][e[165]].Composite(new qx[e[6]][e[26]].Flow());
                            this[e[33]](this.ZZ, {flex: 3});
                            this[e[201]][e[33]](this.ZY);
                        } catch (t) {
                            console[e[37]](e[316], t);
                        }
                    },members: {ZW: null,ZZ: null,ZY: null,ZX: null,openWindow: function(u) {
                            try {
                                this[e[40]](u);
                                if (this[e[41]]()) {
                                    this[e[42]]();
                                } else {
                                    this[e[55]]();
                                    this[e[56]](100, 100);
                                    this.FO();
                                }
                            } catch (t) {
                                console[e[58]](e[317], t);
                            }
                        },FO: function() {
                            var H = window[e[213]][e[121]][e[11]]()[e[267]];
                            var F = window[e[213]][e[121]][e[11]]()[e[31]];
                            this[e[197]] = [];
                            var D = window[e[213]][e[121]][e[11]]()[e[203]][e[237]]()[0][e[236]]();
                            var B = null;
                            if (F == null) {
                                console[e[9]](e[318]);
                                return;
                            }
                            this[e[315]] = [];
                            var w;
                            var u;
                            var z;
                            var y;
                            var I;
                            for (w in H) {
                                for (u = 0; u < F[e[131]]; u++) {
                                    if (F[u][0] == w) {
                                        B = F[u];
                                    }
                                }
                                if (B == null) {
                                    continue;
                                }
                                if (D > 4 && D < 8) {
                                    if (D != B[10]) {
                                        continue;
                                    }
                                } else {
                                    continue;
                                }
                                posData = B[3];
                                if (posData != null && posData[e[133]](e[132])[e[131]] == 2) {
                                    posX = parseInt(posData[e[133]](e[132])[0]);
                                    posY = parseInt(posData[e[133]](e[132])[1]);
                                }
                                var t = e[319];
                                var G = B[2] + e[320] + B[3];
                                t = t + e[321] + G + e[322];
                                for (y = 0; y < 8; y++) {
                                    t = t + e[323];
                                    for (z = 0; z < 9; z++) {
                                        var E = e[173];
                                        var C = H[w][z][y];
                                        switch (C == undefined ? 0 : C) {
                                            case 2:
                                                E = e[324] + p[e[113]][MaelstromTools[e[112]][e[67]]] + e[325];
                                                break;
                                            case 1:
                                                E = e[324] + p[e[113]][MaelstromTools[e[112]][e[68]]] + e[325];
                                                break;
                                            default:
                                                E = e[324] + p[e[113]][e[326]] + e[325];
                                                break;
                                        }
                                        t = t + e[327] + E + e[328];
                                    }
                                    t = t + e[329];
                                }
                                t = t + e[330];
                                var v = new qx[e[6]][e[170]].Label()[e[117]]({backgroundColor: e[331],value: t,rich: true});
                                v[e[332]] = w;
                                this[e[197]][e[276]](w);
                                v[e[122]](e[333], function(L) {
                                    var K = qx[e[140]][e[139]][e[138]]();
                                    K[e[142]]()[e[141]]();
                                    K[e[146]]()[e[145]](ClientLib[e[86]][e[144]][e[143]], this[e[332]], 0, 0);
                                    var J = ClientLib[e[86]][e[85]].GetInstance()[e[148]]()[e[147]]();
                                    if (J != null) {
                                        J[e[150]]()[e[149]](this[e[332]]);
                                    }
                                });
                                v[e[334]] = w;
                                this[e[315]][e[276]](v);
                            }
                            this[e[177]][e[32]]();
                            var A = 0;
                            var x = 0;
                            for (I = 0; I < this[e[315]][e[131]]; I++) {
                                this[e[177]][e[33]](this[e[315]][I], {row: A,column: x});
                                x++;
                                if (x > 4) {
                                    x = 0;
                                    A++;
                                }
                            }
                        }}});
                qx[e[312]][e[311]](e[335], {type: e[336],extend: qx[e[140]][e[53]],statics: {isSupported: function() {
                            return typeof (localStorage) !== e[337];
                        },isdefined: function(t) {
                            return (localStorage[t] !== e[337] && localStorage[t] != null);
                        },isdefineddata: function(u, t) {
                            return (u[t] !== e[337] && u[t] != null);
                        },setglobal: function(v, t) {
                            try {
                                if (Addons[e[51]][e[338]]()) {
                                    localStorage[v] = JSON[e[339]](t);
                                }
                            } catch (u) {
                                console[e[37]](e[340], u);
                            }
                        },getglobal: function(v, u) {
                            try {
                                if (Addons[e[51]][e[338]]()) {
                                    if (Addons[e[51]][e[341]](v)) {
                                        return JSON[e[342]](localStorage[v]);
                                    }
                                }
                            } catch (t) {
                                console[e[58]](e[343], t);
                            }
                            return u;
                        },setserver: function(w, t) {
                            try {
                                if (Addons[e[51]][e[338]]()) {
                                    var v = ClientLib[e[86]][e[85]].GetInstance()[e[272]]()[e[270]]();
                                    var x;
                                    if (Addons[e[51]][e[341]](v)) {
                                        try {
                                            x = JSON[e[342]](localStorage[v]);
                                            if (!(typeof x === e[344])) {
                                                x = {};
                                                console[e[37]](e[345]);
                                            }
                                        } catch (u) {
                                            console[e[37]](e[346], u);
                                            x = {};
                                        }
                                    } else {
                                        x = {};
                                    }
                                    x[w] = t;
                                    localStorage[v] = JSON[e[339]](x);
                                }
                            } catch (u) {
                                console[e[37]](e[347], u);
                            }
                        },getserver: function(w, v) {
                            try {
                                if (Addons[e[51]][e[338]]()) {
                                    var u = ClientLib[e[86]][e[85]].GetInstance()[e[272]]()[e[270]]();
                                    if (Addons[e[51]][e[341]](u)) {
                                        var x = JSON[e[342]](localStorage[u]);
                                        if (Addons[e[51]][e[348]](x, w)) {
                                            return x[w];
                                        }
                                    }
                                }
                            } catch (t) {
                                console[e[58]](e[349], t);
                            }
                            return v;
                        }}});
                if (typeof Addons[e[12]] === e[337]) {
                    qx[e[312]][e[311]](e[350], {type: e[3],extend: qx[e[140]][e[53]],members: {d: {},debug: false,addtranslateobj: function(t) {
                                if (t[e[352]](e[351])) {
                                    this[e[288]][t[e[351]].toString()] = t;
                                    if (this[e[37]]) {
                                        console[e[58]](e[353], t[e[351]].toString());
                                    }
                                    delete t[e[351]];
                                } else {
                                    console[e[37]](e[354]);
                                }
                            },get: function(v) {
                                var u = qx[e[357]][e[356]][e[11]]()[e[355]]();
                                var t = u[e[133]](e[358])[0];
                                if (this[e[288]][e[352]](v)) {
                                    if (this[e[288]][v][e[352]](t)) {
                                        return this[e[288]][v][t];
                                    }
                                }
                                if (this[e[37]]) {
                                    console[e[37]](e[359], v, e[360], t);
                                }
                                return v;
                            }}});
                }
                qx[e[312]][e[311]](e[361], {extend: qx[e[6]][e[60]][e[118]][e[362]],properties: {replaceMap: {check: e[53],nullable: true,init: null},replaceFunction: {check: e[363],nullable: true,init: null}},members: {_getContentHtml: function(w) {
                            var x = w[e[364]];
                            var v = this[e[365]]();
                            var u = this[e[366]]();
                            var t;
                            if (v) {
                                t = v[x];
                                if (typeof t != e[337]) {
                                    w[e[364]] = t;
                                    return qx[e[369]][e[368]][e[367]](this._formatValue(w));
                                }
                            }
                            if (u) {
                                w[e[364]] = u(x);
                            }
                            return qx[e[369]][e[368]][e[367]](this._formatValue(w));
                        },addReversedReplaceMap: function() {
                            var t = this[e[365]]();
                            for (var v in t) {
                                var u = t[v];
                                t[u] = v;
                            }
                            return true;
                        }}});
                console[e[9]](e[370]);
                var s = Addons[e[12]][e[11]]();
                s[e[37]] = false;
                s[e[373]]({main: e[371],de: e[372],pt: e[372],fr: e[372]});
                s[e[373]]({main: e[374],de: e[375],pt: e[376],fr: e[377]});
                s[e[373]]({main: e[152],de: e[378],pt: e[379],fr: e[380]});
                s[e[373]]({main: e[65],de: e[381],pt: e[382],fr: e[383]});
                s[e[373]]({main: e[178],de: e[384],pt: e[385],fr: e[386]});
                s[e[373]]({main: e[183],de: e[183],pt: e[183],fr: e[183]});
                s[e[373]]({main: e[387],de: e[388],pt: e[389],fr: e[390]});
                s[e[373]]({main: e[187],de: e[391],pt: e[187],fr: e[187]});
                s[e[373]]({main: e[185],de: e[392],pt: e[393],fr: e[394]});
                s[e[373]]({main: e[214],de: e[214],pt: e[395],fr: e[396]});
                s[e[373]]({main: e[397],de: e[398],pt: e[399],fr: e[400]});
                s[e[373]]({main: e[73],de: e[401],pt: e[402],fr: e[403]});
                s[e[373]]({main: e[74],de: e[404],pt: e[405],fr: e[406]});
                s[e[373]]({main: e[75],de: e[407],pt: e[75],fr: e[75]});
                s[e[373]]({main: e[168],de: e[408],pt: e[409],fr: e[410]});
                s[e[373]]({main: e[174],de: e[411],pt: e[412],fr: e[413]});
                s[e[373]]({main: e[200],de: e[414],pt: e[415],fr: e[416]});
                s[e[373]]({main: e[202],de: e[417],pt: e[418],fr: e[419]});
                s[e[373]]({main: e[81],de: e[420],pt: e[421],fr: e[422]});
                s[e[373]]({main: e[423],de: e[424],pt: e[425],fr: e[424]});
                s[e[373]]({main: e[426],de: e[427],pt: e[428],fr: e[429]});
                s[e[373]]({main: e[430],de: e[431],pt: e[432],fr: e[433]});
                s[e[373]]({main: e[67],de: e[67],pt: e[434],fr: e[67]});
                s[e[373]]({main: e[68],de: e[435],pt: e[436],fr: e[436]});
                s[e[373]]({main: e[437],de: e[438],pt: e[439],fr: e[440]});
                s[e[373]]({main: e[69],de: e[441],pt: e[442],fr: e[443]});
                s[e[373]]({main: e[70],de: e[444],pt: e[445],fr: e[446]});
                s[e[373]]({main: e[447],de: e[448],pt: e[448],fr: e[448]});
                var r = null;
                var q = null;
                var p = null;
                var o = null;
                var n = 0;
                var m = 0;
                o = ClientLib[e[450]][e[449]].GetInstance();
                r = window[e[45]][e[12]][e[11]]();
                q = window[e[45]][e[44]][e[11]]();
                p = window[e[45]][e[293]][e[11]]();
                p[e[453]](e[451], e[452], o);
                p[e[453]](e[326], e[454], o);
                var l = p[e[457]](s[e[64]](e[374]) + e[455] + window[e[0]], e[451], false, p[e[456]](2));
                l[e[122]](e[189], function() {
                    Addons[e[121]][e[11]]()[e[215]](s[e[64]](e[374]) + e[458] + window[e[0]]);
                }, this);
                Addons[e[121]][e[11]]()[e[122]](e[42], Addons[e[121]][e[11]]().FN, Addons[e[121]][e[11]]());
                p[e[459]](e[451], l);
                if (typeof Addons[e[460]] !== e[337]) {
                    var k = Addons[e[460]][e[11]]();
                    k.AddMainMenu(e[461], function() {
                        Addons[e[121]][e[11]]()[e[215]](s[e[64]](e[374]) + e[458] + window[e[0]]);
                    }, e[462]);
                }
            }
            function d(o) {
                try {
                    var q = [0, 0, 0, 0, 0, 0, 0, 0];
                    if (o == null) {
                        return q;
                    }
                    for (var l in o) {
                        var n = o[l];
                        var m = MaelstromTools[e[463]].GetUnitLevelRequirements(n);
                        for (var k = 0; k < m[e[131]]; k++) {
                            q[m[k][e[274]]] += m[k][e[464]] * n[e[465]]();
                            if (n[e[465]]() < 1) {
                            }
                        }
                    }
                    return q;
                } catch (p) {
                    console[e[37]](e[466], p);
                }
            }
            function f(k) {
                var m;
                for (m in k) {
                    if (typeof (k[m]) == e[275]) {
                        var l = k[m].toString();
                        console[e[37]](m, l);
                    }
                }
            }
            function g(k, r, q, m) {
                var p = [];
                var o = k.toString();
                var n = o[e[467]](/\s/gim, e[173]);
                p = n[e[468]](r);
                var l;
                for (l = 1; l < (m + 1); l++) {
                    if (p != null && p[l][e[131]] == 6) {
                        console[e[37]](q, l, p[l]);
                    } else {
                        if (p != null && p[l][e[131]] > 0) {
                            console[e[282]](q, l, p[l]);
                        } else {
                            console[e[249]](e[469], q, l, e[470]);
                            console[e[282]](q, n);
                        }
                    }
                }
                return p;
            }
            function h() {
                try {
                    if (typeof qx != e[337] && typeof MaelstromTools != e[337]) {
                        j();
                    } else {
                        window[e[264]](h, 1000);
                    }
                } catch (k) {
                    console[e[37]](e[471], k);
                }
            }
            if (/commandandconquer\.com/i[e[473]](document[e[472]])) {
                window[e[264]](h, 10000);
            }
        };
        try {
            var a = document.createElement("script");
            a.innerHTML = "(" + b.toString() + ")();";
            a.type = "text/javascript";
            if (/commandandconquer\.com/i.test(document.domain)) {
                document.getElementsByTagName("head")[0].appendChild(a);
            }
        } catch (c) {
            console.debug("MaelstromTools_Basescanner: init error: ", c);
        }
    })();

/*****************************************************************************************************************************************
 *                  
 *
 ****************************************************************************************************************************************/
