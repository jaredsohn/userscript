// ==UserScript==
// @name        CC Tiberium Alliances Ultimate Pack
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
                - Available Loot
                - Combat Simulator
*/
// @version     3.4.0
// @updateURL   http://userscripts.org/scripts/source/154670.meta.js
// @downloadURL http://userscripts.org/scripts/source/154670.user.js
// @grant       none
// ==/UserScript==

// type: /chelp in any text box and hit <enter> for a list of commands

/***********************************************************************************
API Infernal Wrapper (1st)
***********************************************************************************/
(function () {
  var CCTAWrapper_main = function () {
    try {
    gni = function(o, idx){
        var i = 0;
        for (k in o){
            if (i++ == idx) return k;
            //i++;
        }
        return '';
    }
    gbi = function(n, o, idx)   {/*_log(n);_logp(o);*/var i=0;for(k in o){i++;if(i==idx) return o[k];}}
    sbi = function(n, o, idx, v){/*_log(n);_logp(o);*/var i=0;for(k in o){i++;if(i==idx) o[k]=v;}}
    _log = function(){
        if(typeof console != 'undefined') console.log(arguments);
	    else if(window.opera) opera.postError(arguments);
	    else GM_log(arguments);
	}
	hmm = []
	_show = function(o){var ks=[];var i=0; for (k in o)ks[i++]=k;return ks;}
	_logp = function(o){_log(_show(o));}
    _log('have fun :)')
    wrapper = {
       _val_or_def: function(val, def) {
            if(typeof val != 'undefined') return val;
            return def;
        },
        _prop_name: function(prop_map) {return prop_map[this.versions[this.version]];},
        _prop_index: function(prop_map) {return prop_map[this.versions[this.version]+1];},
		versions: {'384441': 0, '378171': 2},
        version: null,//'368132',
        init_wrap: function(wrap) {
            try {
                var fn = wrap[0]
                var to_name = wrap[1]
                var tp_name = wrap[2]
                var sp_map = wrap[3]
                if(wrap.length == 5) var opt_so_name = wrap[4];
                var so_name = this._val_or_def(opt_so_name, to_name)
                var sp_index = sp_map[this._index]
                //_log('testing'+to_name+'.'+tp_name+'='+sp_name+':'+sp_index+':'+sp_map[this._name])//
                var sp_name, eval_str;
                switch (fn){
                    case 0:
                        sp_name = gni(eval(so_name), sp_index)
                        eval_str = to_name+"."+tp_name+" = "+so_name+"."+sp_name;
                        break;
                    case 1: 
                        sp_name = gni(eval(so_name+'.prototype'), sp_index)
                        eval_str = to_name+".prototype."+tp_name+" = "+so_name+".prototype."+sp_name;
                        break;
                    case 2:
                        sp_name = gni(eval("(new "+so_name+")"), sp_index)
                        eval_str = to_name+".prototype."+tp_name+" = function(){return this."+sp_name+";}"
                        break;
                    case 3:
                        sp_name = gni(eval("(new "+so_name+")"), sp_index)
                        eval_str = to_name+".prototype."+tp_name+" = function(value){this."+sp_name+"=value;}"
                        break;
                    case 6:
                        //[3, 'ClientLib.Vis.Battleground.Battleground', 'set_CurrentReplay', ['EERHCU', 55, 'GHHUDD', 57]],
                        //[6, 'webfrontend.Util.getDateTimeString', 'phe.cnc.Util.getDateTimeString', ['',0,'',0]]
                        //3 ClientLib.Vis.Battleground.Battleground.prototype.set_CurrentReplay = function(value){this.KEHWTC=value;}
                        //fn  so_name                                 sp_index evel_str
                        //3   ClientLib.Vis.Battleground.Battleground 55       ClientLib.Vis.Battleground.Battleground.prototype.set_CurrentReplay = function(value){this.KEHWTC=value;}
                        sp_name = gni(eval("(new "+so_name+")"), sp_index)
                        eval_str = to_name+".prototype."+tp_name+" = function(value){this."+sp_name+"=value;}"
                        break;
                }
                console.log(fn, so_name, sp_index, eval_str);
                eval(eval_str)
            } catch(e) {
                _log(e)
            }
        },
        wraps: [
            [0, 'System', 'EventHandler', ['VTJBRR', 577/*556*/, 'AFADHT', 543]],
			[1, 'System.EventHandler', '$ctor', ['UTJPOT', 1, 'UOZTQY', 1]],
			[1, 'ClientLib.Vis.ViewModeChange', '$ctor', ['UTJPOT', 1, 'UOZTQY', 1]],
            [0, 'SharedLib', 'Combat', ['ESVYJP', 511/*'CJLCVL', 519*/, 'NOOXEE', 503]],
            [0, 'SharedLib.Combat', 'CbtSetup', ['IOMJTL', 571/*'HIWRPX', 550*/, 'IIFAVI', 537], 'SharedLib'],
            [0, 'SharedLib.Combat', 'CbtSimulation', ['KSEAHB', 574/*'HGWILL', 553*/, 'UYGNWU', 540], 'SharedLib'],
			[2, 'ClientLib.Vis.Battleground.Battleground', 'get_Entities', ['ECZKLY', 32, 'XRJAVF', 34]],
			[1, 'SharedLib.Combat.CbtSimulation', 'DoStep', ['AXYNEQ', 26, 'JTYQVH', 26]],//IOMJTL.AXYNEQ //KSEAHB.prototype.YWLWQI==[574][26]
			[2, 'SharedLib.Combat.CbtSimulation', 'get_iCombatStep', ['ZMGJIP', 13,  'BMCNPQ', 13]],
            [0, 'SharedLib.Combat', 'CbtEntity', ['OPOFMB', 579/*558*/, 'IIAZTQ', 545], 'SharedLib'],
			[2, 'SharedLib.Combat.CbtEntity', 'get_eAlignment', ['ZBXTZH', 16, 'FOKJZX', 16]],
			[2, 'SharedLib.Combat.CbtEntity', 'get_iHitpoints', ['UWDOOG', 25, 'VDCHUJ', 24]],
			[2, 'SharedLib.Combat.CbtEntity', 'get_iHitpointsCurrent', ['WNQZQQ', 26, 'JZXSYD', 25]],
			[2, 'SharedLib.Combat.CbtEntity', 'get_MDCTypeId', ['ASVHDS', 13, 'CMMKDD', 13]],
			[2, 'SharedLib.Combat.CbtEntity', 'get_iLevel', ['NEYIYY', 41, 'XQMCPN', 40]],
			[0, 'ClientLib.Base.Util', 'GetUnitLevelData', ['KOPLTH', 38, 'LSTKZJ', 38]],
            [0, 'ClientLib.Data', 'World', ['UHPQFY', 114/*238*/, 'CVSXEK', 231], 'SharedLib'],
			[2, 'ClientLib.Data.World', 'getSectors', ['VDXWEY', 8, 'QNJSYU', 8]],
			[2, 'ClientLib.Data.CityUnits', 'get_FullRawRepairTimeForUnitGroupTypes', ['FQQDKU', 7, 'OPJJET', 7]],
			[1, 'ClientLib.Data.CityUnits', 'get_OffenseUnits', ['WXNKGM', 69, 'AYJNMO', 69]],
			[1, 'ClientLib.Data.CityUnits', 'get_DefenseUnits', ['HUDWHK', 70, 'IBJHND', 70]],
            [0, 'ClientLib.Data', 'CityRepair', ['BOIFDD', 361/*323*/, 'FQDPEX', 312], 'SharedLib'], //getWrapperNamespaceApi("$I.323", false);
			[1, 'ClientLib.Data.CityRepair', 'CanRepair', ['ZUSBPX', 53, 'AUFSAM', 53]],//$I.XFTHBD.prototype.APHJKC
			[1, 'ClientLib.Data.CityRepair', 'UpdateCachedFullRepairAllCost', ['NGLRIP', 64, 'VRKPYE', 64]],
			[1, 'ClientLib.Data.CityRepair', 'ConvertRepairCost', ['ZXZXBO', 55, 'AEITZO', 55]],
			[1, 'ClientLib.Data.CityPreArmyUnits', 'RefreshData', ['VDORYX', 20, 'DJQZII', 20]],
			[2, 'ClientLib.Data.City', 'getResourceLayout', ['UFYRPZ', 52, 'WPDEHJ', 52]],
			[2, 'ClientLib.Data.CityBuildings', 'get_Buildings', ['ELYFUE', 2, 'ZJTMHA', 2]],
			[2, 'ClientLib.Data.CityEntity', 'get_UnitLevelRequirements', ['NEKRGQ', 2, 'TCMROL', 2]],
			[1, 'ClientLib.Data.CityEntity', 'get_UnitLevelRepairCost', ['get_UnitLevelRequirements', 72, 'get_UnitLevelRequirements', 72]],
			[3, 'ClientLib.Data.Combat', 'set_Version', ['VAQFXB', 1, 'DOGGGJ', 1]],
			[3, 'ClientLib.Data.Combat', 'set_StartStep', ['RBWZKP', 3, 'BHPWTD', 3]],
			[3, 'ClientLib.Data.Combat', 'set_Attacker', ['URXNIW', 4, 'DSQFIO', 4]],
			[3, 'ClientLib.Data.Combat', 'set_Defender', ['PURJES', 5, 'UXMGLT', 5]],
			[3, 'ClientLib.Data.Combat', 'set_Blocker', ['SYHMUJ', 6, 'NLGWSU', 6]],
			[3, 'ClientLib.Data.Combat', 'set_Buildings', ['BMURJF', 7, 'HCYUZW', 7]],
			[3, 'ClientLib.Data.Combat', 'set_Supports', ['EAUKRT', 8, 'IERKJL', 8]],
			[3, 'ClientLib.Data.Combat', 'set_Debug', ['RHRTPD', 38, 'SYFSMI', 38]],
			[1, 'ClientLib.Data.Combat', 'setNPCNames', ['OHTDDF', 46, 'DXEQJR', 46]],
            [0, 'ClientLib.Vis.Battleground', 'BattlegroundEntity', ['IIYEQI', 578/*557*/, 'MGYGBY', 544], 'System'],
			[2, 'ClientLib.Vis.Battleground.BattlegroundEntity', 'get_Entity', ['IAHZWW', 26, 'USSQQS', 25]],
			[2, 'ClientLib.Vis.Battleground.BattlegroundEntity', 'get_UnitType', ['JMHYKA', 2, 'HXPPNL', 1]],
			[2, 'ClientLib.Vis.Battleground.Battleground', 'get_Simulation', ['EZXMKS', 29, 'RSJUWY', 31]],
			[3, 'ClientLib.Vis.Battleground.Battleground', 'set_CurrentReplay', ['EERHCU', 55, 'GHHUDD', 57]],
			[1, 'ClientLib.Vis.Battleground.Battleground', 'setCombatData', ['JPSIEV', 172, 'WXLNME', 174]],
			[2, 'ClientLib.Res.ResMain', 'get_Gamedata', ['SSBIUH', 1, 'FCSRFI', 1]]
			//[6, 'webfrontend.Util.getDateTimeString', 'phe.cnc.Util.getDateTimeString', ['',0,'',0]]
        ],

        init: function() {
            try{
                this._name = this.versions[this.version]
                this._index = this._name + 1
                console.log(arguments.callee.name, this._name, this._index);
                System = $I
                SharedLib = $I

                var j = 0;
                for (var i in this.wraps) {
                  console.log(j++);
                  this.init_wrap(this.wraps[i]);
                }

              }catch(e){
                _log(e)
            }
        }
    }  
      function createCCTAWrapper() {
        console.log('CCTAWrapper loaded');
        _log('wrapper loading'+PerforceChangelist);
        wrapper.version = '' + PerforceChangelist;
        wrapper.init()
        _log('wrapper loaded')
        _log(hmm)
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

/************************************************************
* C&C:TA CNCOpt Link Button
*************************************************************/
(function () {
// ==UserScript==
// @version       1.7.5
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
// @contributor   jerbri (http://userscripts.org/users/507954)
// ==/UserScript==
/* 

2013-03-03: Special thanks to jerbri for fixing this up so it worked again!
2012-11-25: Special thanks to PythEch for fixing this up so it worked again!

*/
var scity = null;
var tcity = null;
var tbase = null;
try {
  unsafeWindow.__cncopt_version = "1.7.5";
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

// ==UserScript==
// @name        MaelstromTools Dev
// @namespace   MaelstromTools
// @description Just a set of statistics & summaries about repair time and base resources. Mainly for internal use, but you are free to test and comment it.
// @version     0.1.2.8 pre
// @author      Maelstrom, HuffyLuf, KRS_L and Krisan
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// ==/UserScript==
//var offense_units = own_city.get_CityArmyFormationsManager().GetFormationByTargetBaseId(current_city.get_Id()).get_ArmyUnits().l;
//System.Int64 GetForumIdByType (ClientLib.Data.Forum.EForumType eForumType)
//static ClientLib.Data.Forum.EForumType NormalForum
//System.Collections.Generic.List$1 get_ForumsAlliance ()
//System.Void CreateThread (System.Int64 forumId ,System.String threadTitle ,System.String threadPost ,System.Boolean autoSubscribe)
//System.Void CreatePost (System.Int64 forumId ,System.Int64 threadId ,System.String postMessage)
//System.Void StartGetForumThreadData (System.Int64 forumId ,System.Int32 skip ,System.Int32 take)
//System.Void OnForumThreadDataReceived (System.Object context ,System.Object result)
//System.Void add_ThreadsFetched (ClientLib.Data.ForumThreadsFetched value)
//System.Void MarkThreadsAsRead (System.Int64 forumId ,System.Int64[] threadIds)
//
//var score = ClientLib.Base.PointOfInterestTypes.GetScoreByLevel(lvl);
//var scoreNext = ClientLib.Base.PointOfInterestTypes.GetNextScore(score);
//var resBonus = ClientLib.Base.PointOfInterestTypes.GetBonusByType(ClientLib.Base.EPOIType.TiberiumBonus, score);
//var unitBonus = ClientLib.Base.PointOfInterestTypes.GetBonusByType(ClientLib.Base.EPOIType.InfanteryBonus, score);
//console.log("POI lvl" + lvl + "gives " + score + "points, next lvl at " + scoreNext + " points. Resource bonus: " + resBonus + " Unit bonus: " + unitBonus + "%");
/*
 ClientLib.Data.Player
 get_ResearchPoints
 GetCreditsCount
 GetCreditsGrowth
ClientLib.Data.PlayerResearch get_PlayerResearch ()
ClientLib.Data.PlayerResearchItem GetResearchItemFomMdbId (System.Int32 _mdbId)
ClientLib.Data.PlayerResearchItem.System.Object get_NextLevelInfo_Obj ()

var cw=ClientLib.Data.MainData.GetInstance().get_Player().get_Faction();
var cj=ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(ClientLib.Base.ETechName.Research_BaseFound,cw);
var cd=cr.GetResearchItemFomMdbId(cj);
 */
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
              this.Data["Reset to default"] = ["Auf Standard zurücksetzen", "Definições padrão", "Réinitialiser", "Sıfırla"][l];
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
Available Loot + Summary
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

/*******************************************
Combat Simulator
*******************************************/
(function(){
	var injectFunction = function() 
	{
		function createClasses()
		{
			//This is the setup for a class. 
			/*qx.Class.define("EXAMPLE", 
			{
				type: "singleton",
				extend: qx.core.Object,
            
				construct: function()
				{
				},
				
				destruct: function()
				{
				},
				
				members: 
				{
				}
			});*/
			
			qx.Class.define("Simulator", 
			{
				type: "singleton",
				extend: qx.core.Object,
            
				construct: function()
				{
					//setup buttons
					try 
					{						
						armyBar = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_ATTACKSETUP);
						
						//Simulator Button//
						simBtn = new qx.ui.form.Button("Simulate");
						simBtn.set
						({
							alignY: "middle", 
							width: 60,
							height: 28,
							toolTipText: "Opens Simulation Screen.",
							appearance: "button-text-small"
						});
						simBtn.addListener("click", this.__openSimulatorWindow, this);
						
						armyBar.add(simBtn,{
							left: null,
							right: 58,
							bottom: 119
						});
						
						//Simulator Options Button//
						optionBtn = new qx.ui.form.Button("Options");
						optionBtn.set
						({
							alignY: "middle", 
							width: 60,
							height: 28,
							toolTipText: "Opens Simulator Options",
							appearance: "button-text-small"
						});
						optionBtn.addListener("click", this.__openOptionWindow, this);
						
						armyBar.add(optionBtn,{
							left: null,
							right: 58,
							bottom: 43
						});
						
						//Simulator Stats Button//
						statBtn = new qx.ui.form.Button("Stats");
						statBtn.set
						({
							alignY: "middle", 
							width: 60,
							height: 28,
							toolTipText: "Opens Simulator Stats Window",
							appearance: "button-text-small"
						});
						statBtn.addListener("click", this.__openStatWindow, this);
						
						armyBar.add(statBtn,{
							left: null,
							right: 58,
							bottom: 81
						});
						
						//Simulator Layout Button//
						layoutBtn = new qx.ui.form.Button("Layout");
						layoutBtn.set
						({
							alignY: "middle", 
							width: 60,
							height: 28,
							toolTipText: "Save/Load/Delete Unit Formations for current city",
							appearance: "button-text-small"
						});
						layoutBtn.addListener("click", this.__openLayoutWindow, this);
						//layoutBtn.setEnabled(false);
						armyBar.add(layoutBtn,{
							left: null,
							right: 58,
							bottom: 5
						});
						
						//Simulator Unlock Combat Button//	
						unlockCmtBtn = new qx.ui.form.Button("Unlock");
						unlockCmtBtn.set
						({
							alignY: "middle",
							width: 50,
							height: 50,
							toolTipText: "Unlock Combat Button",
							appearance: "button-text-small"
						});
						unlockCmtBtn.setOpacity(0.7);
						armyBar.add(unlockCmtBtn,{
							left: null,
							right: 7,
							bottom: 5
						});
						unlockCmtBtn.addListener("click", this.timeoutCmtBtn, this);
						
						//Simulator Unlock Repair Time Button//
						unlockRTBtn = new qx.ui.form.Button("Unlock");
						unlockRTBtn.set
						({
							alignY: "middle",
							width: 50,
							height: 50,
							toolTipText: "Unlock Repair Button",
							appearance: "button-text-small"
						});
						unlockRTBtn.setOpacity(0.7);
						
						armyBar.add(unlockRTBtn,{
							left: null,
							right: 7,
							bottom: 97
						});
						unlockRTBtn.addListener("click", this.timeoutRTBtn, this);
						
						playArea = qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.OVL_PLAYAREA);
						//Formation Buttons//
						shiftUpBtn = new qx.ui.form.Button("↑");
						shiftUpBtn.set
						({
							alignY: "middle",
							width: 30,
							height: 20,
							toolTipText: "Shifts units one space up",
							appearance: "button-text-small"
						});
						playArea.add(shiftUpBtn,{
							left: null,
							right: 70,
							bottom: 110
						});
						shiftUpBtn.addListener("click", function(){this.shiftFormation("u");}, this);
						shiftUpBtn.hide();
						
						shiftDownBtn = new qx.ui.form.Button("↓");
						shiftDownBtn.set
						({
							alignY: "middle",
							width: 30,
							height: 20,
							toolTipText: "Shifts units one space down",
							appearance: "button-text-small"
						});
						
						playArea.add(shiftDownBtn,{
							left: null,
							right: 70,
							bottom: 70
						});
						shiftDownBtn.addListener("click", function(){this.shiftFormation("d");}, this);
						shiftDownBtn.hide();
						
						shiftLeftBtn = new qx.ui.form.Button("←");
						shiftLeftBtn.set
						({
							alignY: "middle",
							width: 30,
							height: 20,
							toolTipText: "Shifts units one space left",
							appearance: "button-text-small"
						});
						playArea.add(shiftLeftBtn,{
							left: null,
							right: 90,
							bottom: 90
						});
						shiftLeftBtn.addListener("click", function(){this.shiftFormation("l");}, this);
						shiftLeftBtn.hide();
						
						shiftRightBtn = new qx.ui.form.Button("→");
						shiftRightBtn.set
						({
							alignY: "middle",
							width: 30,
							height: 20,
							toolTipText: "Shifts units one space right",
							appearance: "button-text-small"
						});
						playArea.add(shiftRightBtn,{
							left: null,
							right: 50,
							bottom: 90
						});
						shiftRightBtn.addListener("click", function(){this.shiftFormation("r");}, this);
						shiftRightBtn.hide();
						
						mirrorBtn = new qx.ui.form.Button("M");
						mirrorBtn.set
						({
							alignY: "middle",
							width: 35,
							height: 35,
							toolTipText: "Mirrors current army formation layout",
							appearance: "button-text-small"
						});
						
						playArea.add(mirrorBtn,{
							left: null,
							right: 6,
							bottom: 160
						});
						mirrorBtn.addListener("click", function(){this.mirrorFormation();}, this);
						mirrorBtn.hide();
						
						//disableAllUnitsBtn = new qx.ui.form.Button("", "webfrontend/ui/common/icn_res_power.png");
						disableAllUnitsBtn = new qx.ui.form.Button("", "FactionUI/icons/icon_disable_unit.png");
						disableAllUnitsBtn.set
						({
							center: true,
							show: "icon",
							alignY: "middle",
							width: 35,
							height: 35,
							toolTipText: "Enables/Disables all units",
							appearance: "button-text-small"
						});
						playArea.add(disableAllUnitsBtn,{
							left: null,
							right: 6,
							bottom: 120
						});
						disableAllUnitsBtn.addListener("click", function(){this.shiftFormation("n");}, this);
						disableAllUnitsBtn.getChildControl("icon").set({ width : 20, height : 20, scale : true });
						disableAllUnitsBtn.hide();
						
						armyUndoBtn = new qx.ui.form.Button("", "FactionUI/icons/icon_refresh_funds.png");
						armyUndoBtn.set
						({
							center: true,
							show: "icon",
							alignY: "middle",
							width: 35,
							height: 35,
							toolTipText: "Undo's formation to previous saved formation. Save formations by hitting the Update or Simulate button.",
							appearance: "button-text-small"
						});
						
						playArea.add(armyUndoBtn,{
							left: null,
							right: 6,
							bottom: 200
						});
						armyUndoBtn.addListener("click", function(){this.undoCurrentFormation();}, this);
						armyUndoBtn.setEnabled(false);
						armyUndoBtn.hide();
						
						quickSaveBtn = new qx.ui.form.Button("QS");
						quickSaveBtn.set
						({
							alignY: "middle",
							width: 35,
							height: 35,
							toolTipText: "Saves the current layout without having to open the Formation Saver window. Does not make persistent.",
							appearance: "button-text-small"
						});
						
						playArea.add(quickSaveBtn,{
							left: null,
							right: 6,
							bottom: 240
						});
						quickSaveBtn.addListener("click", function(){Simulator.LayoutWindow.getInstance().saveNewLayout(true)}, this);
						quickSaveBtn.hide();
												
						//Simulator Back Button//
						replayBar = qx.core.Init.getApplication().getReportReplayOverlay();
						var backBtn = new qx.ui.form.Button("Back");
						backBtn.set
						({
							width: 50,
							height: 24,
							appearance: "button-text-small",
							toolTipText: "Return to Combat Setup"
						});
						backBtn.addListener("click", this.backToCombatSetup, this);
						replayBar.add(backBtn, {
							top: 37,
							left: 255
						});
						
						var replayStatBtn = new qx.ui.form.Button("Stats");
						replayStatBtn.set
						({
							width: 50,
							height: 24,
							appearance: "button-text-small",
							toolTipText: "Return to Combat Setup"
						});
						replayStatBtn.addListener("click", this.__openStatWindow, this);
						replayBar.add(replayStatBtn, {
							top: 7,
							left: 255
						});
						
						this.isSimButtonDisabled = false;
						this.isSimulation = false;
						this.armyTempFormations = new Array();
						this.armyTempIdx = 0;
						this.repairOneBtns = new Array();
					}
					catch(e)
					{
						console.log("Error setting up Simulator Constructor: " );
						console.log(e.toString());
					}
				},
				
				destruct: function()
				{
				},
				
				members: 
				{
					armyBar: null,
					playArea: null,
					replayBar: null,
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
					backBtn: null,
					isSimButtonDisabled: null,
					disableAllUnitsBtn: null,
					armyTempFormations: null,
					armyTempIdx: null,
					armyUndoBtn: null,
					isSimulation: null,
					quickSaveBtn: null,
					
					/**
					 * This method initiates the visual simulation with no stats produced. If the player
					 * wants stats produced, then they should do it through the stats window.
					 */
					__openSimulatorWindow: function()
					{
						var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
						if (city != null)
						{
							var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
							
							this.isSimulation = true;
							this.saveTempFormation();
							
							localStorage.ta_sim_last_city = city.get_Id();
							
							ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
							ClientLib.API.Battleground.GetInstance().SimulateBattle();
							var app = qx.core.Init.getApplication();
							var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
							
							app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, city.get_Id(), 0, 0);
							
							
							var autoSim = localStorage['autoSimulate'];
							
							if (typeof autoSim != 'undefined')
							{
								if (autoSim == "yes")
								{
									var speed = localStorage['simulateSpeed'];
									setTimeout(function() {
										battleground.RestartReplay();
										battleground.set_ReplaySpeed(parseInt(speed));
									}, 1000)
								}
							}
							
							if ( this.isSimButtonDisabled == false)
							{
								simBtn.setEnabled(false);
								var simTimer = 10000;
								this.disableSimulateButtonTimer(simTimer);
								
								if (typeof simStatBtn != "undefined")
								{
									simStatBtn.setEnabled(false);
									var simStatTimer = 10000;
									Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(simStatTimer);
								}
							}
							
							setTimeout(function() {
								var battleDuration = battleground.get_BattleDuration();
								battleDuration = Simulator.StatWindow.getInstance().formatBattleDurationTime(battleDuration);
								Simulator.StatWindow.getInstance().__labelMiscBattleDuration.setValue(battleDuration);
							}, 1000);
							
							if (simReplayBtn.getEnabled() == false)
							{
								simReplayBtn.setEnabled(true);
							}
						}	
					},
					
					__openOptionWindow: function()
					{
						try
						{
							if (Simulator.OptionWindow.getInstance().isVisible())
							{
								console.log("Closing Option Window");
								Simulator.OptionWindow.getInstance().close();
							}
							else
							{
								console.log("Opening Option Window");
								Simulator.OptionWindow.getInstance().open();
							}
						}
						catch(e)
						{
							console.log("Error Opening or Closing Option Window");
							console.log(e.toString());
						}
					},
					
					__openStatWindow: function()
					{
						try
						{
							if (Simulator.StatWindow.getInstance().isVisible())
							{
								console.log("Closing Stat Window");
								Simulator.StatWindow.getInstance().close();
							}
							else
							{
								console.log("Opening Stat Window");
								Simulator.StatWindow.getInstance().open();
                                Simulator.StatWindow.getInstance().calcResources();
							}
						}
						catch(e)
						{
							console.log("Error Opening or Closing Stat Window");
							console.log(e.toString());
						}
					},
					
					__openLayoutWindow: function()
					{
						try
						{
							if (Simulator.LayoutWindow.getInstance().isVisible())
							{
								console.log("Closing Layout Window");
								Simulator.LayoutWindow.getInstance().close();
							}
							else
							{
								console.log("Opening LayoutWindow");
								Simulator.LayoutWindow.getInstance().updateLayoutList();
								Simulator.LayoutWindow.getInstance().layoutTextBox.setValue("");
								Simulator.LayoutWindow.getInstance().persistentCheck.setValue(false);
								Simulator.LayoutWindow.getInstance().open();
							}
						}
						catch(e)
						{
							console.log("Error Opening or Closing Layout Window");
							console.log(e.toString());
						}
					},
					
					__openToolsWindow: function()
					{
						//Might need to be implemented later on.
					},
					
					attachNetEvent: function()
					{
						console.log("Need to assign correct function!");
					},
					
					formatNumbersCompact: function()
					{
						console.log("Need to assign correct function!");
					},
					
					GetUnitMaxHealth: function()
					{
						console.log("Need to assign correct function!");
						return -1;                
					},
					
					saveTempFormation: function()
					{
						try
						{
							if (this.armyTempFormations.length != 0)
							{
								var currForm = this.getCityPreArmyUnits().get_ArmyUnits().l;
								
								for (var i = 0; i < currForm.length; i++)
								{
									var lastForm = this.armyTempFormations[this.armyTempIdx][i];
									if ( (currForm[i].get_CoordX() != lastForm.x) || (currForm[i].get_CoordY() != lastForm.y))
									{
										break;
									}
									else if ((i + 1) == currForm.length )
									{
										return;
									}
								}
							}
							
							var formation = new Array();
							var unitList = this.getCityPreArmyUnits().get_ArmyUnits().l;
							
							for (var i = 0; i < unitList.length; i++)
							{
								var unit = unitList[i];
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
								armyUndoBtn.setEnabled(true);
						}
						catch(e)
						{
							console.log("Error Saving Temp Formation");
							console.log(e.toString());
						}
					},
					
					undoCurrentFormation: function()
					{
						try
						{
							this.restoreFormation(this.armyTempFormations[(this.armyTempIdx - 1)]);
							
							//get rid of last element now that we have undone it.
							this.armyTempFormations.splice(this.armyTempIdx, 1);
							this.armyTempIdx--;
							
							if (this.armyTempFormations.length == 1)
								armyUndoBtn.setEnabled(false);
						}
						catch(e)
						{
							console.log("Error undoing formation");
							console.log(e.toString());
						}
					},
					
					/*
					 * Mirrors across the X Axis (4 is axis on grid 0-9)
					 */
					mirrorFormation: function()
					{
						try
						{
							var units = this.getCityPreArmyUnits();
							var unitsList = this.getCityPreArmyUnits().get_ArmyUnits().l;
							var mirror = new Array();
							
							for (var i = 0; i < unitsList.length; i++)
							{
								var unit = unitsList[i];
								var armyUnit = {};
								
								//do the mirroring
								var x = unit.get_CoordX();
								var distanceX = x - 4; //from center (4)
								if (distanceX < 0)
								{
									x = (x - distanceX) + (-1 * distanceX);
								}
								else if (distanceX > 0)
								{
									x = (x - distanceX) - distanceX;
								}
								
								armyUnit.x = x;
								armyUnit.y = unit.get_CoordY();
								armyUnit.id = unit.get_Id();
								armyUnit.enabled = unit.get_Enabled();
								
								mirror.push(armyUnit);
							}
							
							this.restoreFormation(mirror);
						}
						catch(e)
						{
							console.log("Error Mirroring Formation");
							console.log(e);
						}
					},
					
					/**
					 * Code from one of the previous authors of an older simulator version. If anyone knows the true author please let me know.
					 */
					shiftFormation: function(direction)
					{
						try
						{							
							console.log("Shifting Unit Formation");
							var v_shift = 0;
							var h_shift = 0;
							
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
							for (var i = 0;	(i < units.length); i++) 
							{
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
								armyUnit.x = x;
								armyUnit.y = y;
								armyUnit.id = unit.get_Id();
								
								//For enabling/disabling all units
								if (direction == "n")
								{
									if (typeof localStorage['allUnitsDisabled'] != 'undefined')
									{
										if (localStorage['allUnitsDisabled'] == "yes")
										{
											armyUnit.enabled = unit.set_Enabled(false);
										}
										else
										{
											armyUnit.enabled = unit.set_Enabled(true);
										}
									}
									else
									{
										armyUnit.enabled = unit.set_Enabled(false);
									}
								}
								armyUnit.enabled = unit.get_Enabled();
								newLayout.push(armyUnit);
							}
							//Change disable button to opposite 
							if (direction == "n")
							{
								if (localStorage['allUnitsDisabled'] == "yes")
									localStorage['allUnitsDisabled'] = "no";
								else
									localStorage['allUnitsDisabled'] = "yes";
							}
							this.restoreFormation(newLayout);
						}
						catch(e)
						{
							console.log("Error Shifting Units");
							console.log(e.toString());
						}
					},
					
					restoreFormation: function(layout)
					{
						try
						{
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
						}
						catch(e)
						{
							console.log("Error Restoring Formation");
							console.log(e.toString());
						}
					},
					
					getCityPreArmyUnits: function()
					{
						var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
						var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
						var formationManager = ownCity.get_CityArmyFormationsManager();
						ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
						
						return formationManager.GetFormationByTargetBaseId(formationManager.get_CurrentTargetBaseId());
					},
					
					timeoutCmtBtn: function()
					{
						armyBar.remove(unlockCmtBtn);
						setTimeout(function() {
							armyBar.add(unlockCmtBtn,{
								left: null,
								right: 7,
								bottom: 5
							});
						}, 2000);
					},
					
					timeoutRTBtn: function()
					{
						armyBar.remove(unlockRTBtn);
						setTimeout(function() {
							armyBar.add(unlockRTBtn,{
								left: null,
								right: 7,
								bottom: 97
							});
						}, 2000);
					},
					
					backToCombatSetup: function()
					{
						var app = qx.core.Init.getApplication();
						var player_cities = ClientLib.Data.MainData.GetInstance().get_Cities();
						var current_city = player_cities.get_CurrentCity();
						try 
						{
							//This brings the player back to viewing the enemies defense setup PlayArea
							app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatSetupDefense, localStorage.ta_sim_last_city, 0, 0);
						} 
						catch (e) 
						{
							console.log("Error closing Simulation Window");
							console.log(e.toString());
						}	
					},
					
					disableSimulateButtonTimer: function(timer)
					{
						try
						{
							if ( timer >= 1000)
							{
								this.isSimButtonDisabled =true;
								simBtn.setLabel(Math.floor(timer/1000));
								timer -= 1000;
								setTimeout(function () {
									Simulator.getInstance().disableSimulateButtonTimer(timer);
								}, 1000)
							}
							else
							{
								setTimeout(function () {
									simBtn.setEnabled(true);
									if (Simulator.OptionWindow.getInstance()._buttonSizeCB.getValue())
										simBtn.setLabel("Simulate");
									else
										simBtn.setLabel("S");	
								}, timer)
								this.isSimButtonDisabled = false;
							}
						}
						catch(e)
						{
							console.log("Error disabling simulator button");
							console.log(e.toString());
						}
					}
				}
			});
			
			qx.Class.define("Simulator.StatWindow", 
			{
				type: "singleton",
				extend:	qx.ui.window.Window,
				construct: function()
				{
					this.base(arguments);
					this.setLayout(new qx.ui.layout.VBox());
					
					this.set({
						width: 220,
						caption: "Simulator Stats",
						padding: 2,
						allowMaximize: false,
						showMaximize: false,
						allowMinimize: false,
						showMinimize: false,
						
					});
					
					this.setResizable(false, true, false, true);
					if (typeof localStorage['statWindowPosLeft'] != 'undefined')
					{
						var left = parseInt(localStorage['statWindowPosLeft']);
						var top = parseInt(localStorage['statWindowPosTop']);
						this.moveTo(left, top);
					}
					else
					{
						this.moveTo(125,30);
					}

					//Enemy Health Section//
					var enemyHealthHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({ decorator: "pane-light-opaque"});
					var enemyHealthTitle = new qx.ui.basic.Label("Ussun Saglik Durumu").set({ alignX: "center", alignY: "top", font: "font_size_14_bold"});
					enemyHealthHeader.add(enemyHealthTitle);
					this.add(enemyHealthHeader);
					
					var enemyHealth = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
					enemyHealth.setThemedFont("bold");
					var enemyHealthBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ width: 70, padding: 5, decorator: "pane-light-opaque"});
					var eHLabelOverall = new qx.ui.basic.Label("Toplam:");
					var eHLabelBase = new qx.ui.basic.Label("Us:");
					var eHLabelDefense = new qx.ui.basic.Label("Defans:");
					var eHLabelCY = new qx.ui.basic.Label("Santiye:");
					var eHLabelDF = new qx.ui.basic.Label("Tesis:");
					enemyHealthBox.add(eHLabelOverall);
					enemyHealthBox.add(eHLabelBase);
					enemyHealthBox.add(eHLabelDefense);
					enemyHealthBox.add(eHLabelCY);
					enemyHealthBox.add(eHLabelDF);
					enemyHealth.add(enemyHealthBox);
					
					this.__labelEnemyOverallHealth = new Array();
					this.__labelEnemyBaseHealth = new Array();
					this.__labelEnemyDefenseHealth = new Array();
					this.__labelEnemyCYHealth = new Array();
					this.__labelEnemyDFHealth = new Array();
					
					var enemyHealthValues = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ alignX: "center", width: 90, padding: 5, decorator: "pane-light-opaque"});
					this.__labelEnemyOverallHealth = new qx.ui.basic.Label("-").set({ alignX: "right"});
					this.__labelEnemyBaseHealth = new qx.ui.basic.Label("-").set({ alignX: "right"});
					this.__labelEnemyDefenseHealth = new qx.ui.basic.Label("-").set({ alignX: "right"});
					this.__labelEnemyCYHealth = new qx.ui.basic.Label("-").set({ alignX: "right"});
					this.__labelEnemyDFHealth = new qx.ui.basic.Label("-").set({ alignX: "right"});
					enemyHealthValues.add(this.__labelEnemyOverallHealth);
					enemyHealthValues.add(this.__labelEnemyBaseHealth);
					enemyHealthValues.add(this.__labelEnemyDefenseHealth);
					enemyHealthValues.add(this.__labelEnemyCYHealth);
					enemyHealthValues.add(this.__labelEnemyDFHealth);
					enemyHealth.add(enemyHealthValues, { flex: 1 });
					this.add(enemyHealth);
					
					//Player Repair Section//
					var playerRepairHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({ decorator: "pane-light-opaque"});
					var playerRepairTitle = new qx.ui.basic.Label("Onarım Suresi").set({ alignX: "center", alignY: "top", font: "font_size_14_bold"});
					playerRepairHeader.add(playerRepairTitle);
					this.add(playerRepairHeader);
					
					var playerRepair = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
					playerRepair.setThemedFont("bold");
					var playerRepairBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ width: 70, padding: 5, decorator: "pane-light-opaque"});
					var pRLabelStorage = new qx.ui.basic.Label("Depodaki Tamir:");
					var pRLabelOverall = new qx.ui.basic.Label("Toplam:");
					var pRLabelInf = new qx.ui.basic.Label("Kisla:");
					var pRLabelVehi = new qx.ui.basic.Label("Fabrika:");
					var pRLabelAir = new qx.ui.basic.Label("Havaalani:");
					playerRepairBox.add(pRLabelStorage);
					playerRepairBox.add(pRLabelOverall);
					playerRepairBox.add(pRLabelInf);
					playerRepairBox.add(pRLabelVehi);
					playerRepairBox.add(pRLabelAir);
					playerRepair.add(playerRepairBox);
					
					var playerRepairValues = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ alignX: "center", width: 90, padding: 5, decorator: "pane-light-opaque"});
					this.__labelRepairStorage = new qx.ui.basic.Label("-").set({ alignX: "right"});
					this.__labelRepairOverall = new qx.ui.basic.Label("-").set({ alignX: "right"});
					this.__labelRepairInf = new qx.ui.basic.Label("-").set({ alignX: "right"});
					this.__labelRepairVehi = new qx.ui.basic.Label("-").set({ alignX: "right"});
					this.__labelRepairAir = new qx.ui.basic.Label("-").set({ alignX: "right"});
					playerRepairValues.add(this.__labelRepairStorage);
					playerRepairValues.add(this.__labelRepairOverall);
					playerRepairValues.add(this.__labelRepairInf);
					playerRepairValues.add(this.__labelRepairVehi);
					playerRepairValues.add(this.__labelRepairAir);
					playerRepair.add(playerRepairValues, { flex: 1 });
					this.add(playerRepair);
					
					//MISC Section//
					var miscHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({ decorator: "pane-light-opaque"});
					var miscTitle = new qx.ui.basic.Label("Misc").set({ alignX: "center", alignY: "top", font: "font_size_14_bold"});
					miscHeader.add(miscTitle);
					this.add(miscHeader);
					
					var misc = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
					misc.setThemedFont("bold");
					var miscBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ width: 70, padding: 5, decorator: "pane-light-opaque"});
					var miscOutcome = new qx.ui.basic.Label("Sonuc:");
					var miscBattleDuration = new qx.ui.basic.Label("Sure:");
					miscBox.add(miscOutcome);
					miscBox.add(miscBattleDuration);
					misc.add(miscBox);
					
					this.__labelMiscOutcome = new Array();
					this.__labelMiscBattleDuration = new Array();
					
					var miscValues = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ alignX: "center", width: 90, padding: 5, decorator: "pane-light-opaque"});
					this.__labelMiscOutcome = new qx.ui.basic.Atom("Unknown", null).set({ allowGrowX: false, alignX: "right"});
					this.__labelMiscBattleDuration = new qx.ui.basic.Label("0:00").set({ alignX: "right"});
					miscValues.add(this.__labelMiscOutcome);
					miscValues.add(this.__labelMiscBattleDuration);
					misc.add(miscValues, { flex: 1 });
					this.add(misc);	
					
					//Battle Loot Section//
					var battleLootHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({ decorator: "pane-light-opaque"});
					var battleLootTitle = new qx.ui.basic.Label("Kaynak Istatistikleri").set({ alignX: "center", alignY: "top", font: "font_size_14_bold"});
					battleLootHeader.add(battleLootTitle);
					this.add(battleLootHeader);
					
					
					var battleLoot = new qx.ui.container.Composite(new qx.ui.layout.HBox(2));
					battleLoot.setThemedFont("bold");
					var battleLootBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ width: 70, padding: 5, decorator: "pane-light-opaque"});
					var battleLootTib = new qx.ui.basic.Atom(null, "webfrontend/ui/common/icn_res_tiberium.png");
					var battleLootCry = new qx.ui.basic.Atom(null, "webfrontend/ui/common/icn_res_chrystal.png");
					var battleLootCred = new qx.ui.basic.Atom(null, "webfrontend/ui/common/icn_res_dollar.png");
					var battleLootRP = new qx.ui.basic.Atom(null, "webfrontend/ui/common/icn_res_research_mission.png");
					//var battleLootTotal = new qx.ui.basic.Atom(null, "webfrontend/ui/icons/icon_item.png");
					var battleLootTotal = new qx.ui.basic.Atom(null, "webfrontend/ui/common/icn_build_slots.png");
					battleLootTib.setToolTipText("Tiberyum");
					battleLootCry.setToolTipText("Kristal");
					battleLootCred.setToolTipText("Kredi");
					battleLootRP.setToolTipText("Arastirma Puani");
					battleLootTotal.setToolTipText("Toplam");
					battleLootTib.getChildControl("icon").set({ width : 23, height : 23, scale : true }); 
					battleLootCry.getChildControl("icon").set({ width : 23, height : 23, scale : true }); 
					battleLootCred.getChildControl("icon").set({ width : 23, height : 23, scale : true }); 
					battleLootRP.getChildControl("icon").set({ width : 23, height : 23, scale : true }); 
					battleLootTotal.getChildControl("icon").set({ width : 23, height : 23, scale : true }); 
					battleLootBox.add(battleLootTib);
					battleLootBox.add(battleLootCry);
					battleLootBox.add(battleLootCred);
					battleLootBox.add(battleLootRP);
					battleLootBox.add(battleLootTotal);
					battleLoot.add(battleLootBox);
					
					this.__labelBattleLootTotal = new Array();
					this.__labelBattleLootTib = new Array();
					this.__labelBattleLootCry = new Array();
					this.__labelBattleLootCred = new Array();
					this.__labelBattleLootRP = new Array();
					
					var battleLootValues = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ alignX: "center", width: 90, padding: 5, decorator: "pane-light-opaque"});
					this.__labelBattleLootTib = new qx.ui.basic.Label("-").set({ alignX: "right", padding: 3});
					this.__labelBattleLootCry = new qx.ui.basic.Label("-").set({ alignX: "right", padding: 3});
					this.__labelBattleLootCred = new qx.ui.basic.Label("-").set({ alignX: "right", padding: 3});
					this.__labelBattleLootRP = new qx.ui.basic.Label("-").set({ alignX: "right", padding: 3});
					this.__labelBattleLootTotal = new qx.ui.basic.Label("-").set({ alignX: "right", padding: 3});
					battleLootValues.add(this.__labelBattleLootTib);
					battleLootValues.add(this.__labelBattleLootCry);
					battleLootValues.add(this.__labelBattleLootCred);
					battleLootValues.add(this.__labelBattleLootRP);
					battleLootValues.add(this.__labelBattleLootTotal);
					battleLoot.add(battleLootValues, { flex: 1 });
					this.add(battleLoot);
					
					//Simulate Button//
					var simButton = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({ padding: 5, decorator: "pane-light-opaque"});
					this.add(simButton);
					
					simStatBtn = new qx.ui.form.Button("Yenile").set({allowGrowX: false});
					simStatBtn.setToolTipText("Updates Simulation Stats");
					simStatBtn.addListener("click", this.simulateStats, this);
					
					simReplayBtn = new qx.ui.form.Button("Oynat").set({allowGrowX: false});
					simReplayBtn.setToolTipText("Shows Replay of last simulation");
					simReplayBtn.addListener("click", this.doSimReplay, this);
					
					simReplayBtn.setEnabled(false);
					
					simButton.add(simStatBtn, {width: "50%"});
					simButton.add(simReplayBtn, {width: "50%"});
					
					//Add Header Events//
					enemyHealthHeader.addListener("click", function()
					{
						if (enemyHealth.isVisible())
							enemyHealth.exclude();
						else
							enemyHealth.show();
					}, this);
					
					playerRepairHeader.addListener("click", function()
					{
						if (playerRepair.isVisible())
							playerRepair.exclude();
						else
							playerRepair.show();
					}, this);
					
					miscHeader.addListener("click", function()
					{
						if (misc.isVisible())
							misc.exclude();
						else
							misc.show();
					}, this);
					
					battleLootHeader.addListener("click", function()
					{
						if (battleLoot.isVisible())
							battleLoot.exclude();
						else
							battleLoot.show();
					}, this);
					
					if (typeof localStorage['hideHealth'] != 'undefined')
					{
						if (localStorage['hideHealth'] == "yes")
							enemyHealth.exclude();
					}
					
					if (typeof localStorage['hideRepair'] != 'undefined')
					{
						if (localStorage['hideRepair'] == "yes")
							playerRepair.exclude();
					}
					
					if (typeof localStorage['hideMisc'] != 'undefined')
					{
						if (localStorage['hideMisc'] == "yes")
							misc.exclude();
					}
					
					if (typeof localStorage['hideLoot'] != 'undefined')
					{
						if (localStorage['hideLoot'] == "yes")
							battleLoot.exclude();
					}
					
					this.isSimStatButtonDisabled = false;
					
					Simulator.getInstance().attachNetEvent(ClientLib.API.Battleground.GetInstance(), "OnSimulateBattleFinished", ClientLib.API.OnSimulateBattleFinished, this, this.__OnSimulateBattleFinished);					
				},
				
				destruct: function()
				{
				},
				
				members: 
				{
					simStatBtn: null,
					simReplayBtn: null,
					__labelEnemyOverallHealth: null,
					__labelEnemyBaseHealth: null,
					__labelEnemyDefenseHealth: null,
					__labelEnemyCYHealth: null,
					__labelEnemyDFHealth: null,
					__labelRepairOverall: null,
					__labelRepairInf: null,
					__labelRepairVehi: null,
					__labelRepairAir: null,
					__labelBattleLootTotal: null,
					__labelBattleLootTib: null,
					__labelBattleLootCry: null,
					__labelBattleLootCred: null,
					__labelBattleLootRP: null,
					__labelMiscOutcome: null,
					__labelMiscBattleDuration: null,
					isSimStatButtonDisabled: null,
					__labelRepairStorage: null,
					
					simulateStats: function()
					{
						console.log("Simulating Stats");
						var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
						if (city != null)
						{			
							Simulator.getInstance().isSimulation = true;						
							Simulator.getInstance().saveTempFormation();
							localStorage.ta_sim_last_city = city.get_Id();
							var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
							ownCity.get_CityArmyFormationsManager().set_CurrentTargetBaseId(city.get_Id());
							ClientLib.API.Battleground.GetInstance().SimulateBattle();
							var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
							
							//Disable Simulate Button
							if ( this.isSimStatButtonDisabled == false )
							{
								simStatBtn.setEnabled(false);
								var simStatTimer = 10000;
								var simStatTimeout = this.disableSimulateStatButtonTimer(simStatTimer);
								
								simBtn.setEnabled(false);
								var simTimer = 10000;
								Simulator.getInstance().disableSimulateButtonTimer(simTimer);
							}
							
							setTimeout(function() {
								var battleDuration = battleground.get_BattleDuration();
								battleDuration = Simulator.StatWindow.getInstance().formatBattleDurationTime(battleDuration);
								Simulator.StatWindow.getInstance().__labelMiscBattleDuration.setValue(battleDuration);
							}, 1000);
							
							if (simReplayBtn.getEnabled() == false)
								simReplayBtn.setEnabled(true);
						}
					},
					
					doSimReplay: function()
					{
						try
						{
							Simulator.getInstance().isSimulation = true;
							var battleground = ClientLib.Vis.VisMain.GetInstance().get_Battleground();
							var app = qx.core.Init.getApplication();
							app.getPlayArea().setView(ClientLib.Data.PlayerAreaViewMode.pavmCombatReplay, localStorage.ta_sim_last_city, 0, 0);
							
							var autoSim = localStorage['autoSimulate'];
							
							if (typeof autoSim != 'undefined')
							{
								if (autoSim == "yes")
								{
									var speed = localStorage['simulateSpeed'];
									setTimeout(function() {
										battleground.RestartReplay();
										battleground.set_ReplaySpeed(parseInt(speed));
									}, 1000)
								}
							}
						}
						catch(e)
						{
							console.log("Error attempting to show Simulation Replay");
							console.log(e.toString());
						}
					},
					
					__OnSimulateBattleFinished: function(data) 
					{
						this.getSimulationInfo(data);
					},
					
					formatBattleDurationTime: function(time)
					{
						var seconds = time / 1000;
						var minutes = seconds / 60;
						minutes = Math.round(minutes - 0.5);
						seconds = Math.round((seconds - 0.5) - (minutes * 60));
						
						if( seconds < 10)
						{
							seconds = "0" + seconds;
						}
						return minutes + ":" + seconds;
					},
					
					calculateRepairCosts: function(id, level, sHealth, eHealth, mHealth)
					{
						repairCosts = {"RT": 0, "C": 0};
						var dmgRatio = 1;
						if (sHealth != eHealth)
						{
							if (eHealth > 0)
							{
								dmgRatio = ((sHealth - eHealth) / 16) / mHealth;
							}
							else
							{
								dmgRatio = (sHealth / 16) / mHealth;
							}
							//var currOwnCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
							var costs = ClientLib.API.Util.GetUnitRepairCosts(level, id, dmgRatio);

							for (var idx = 0; idx < costs.length; idx++)
							{
								var uCosts = costs[idx];
								var cType = parseInt(uCosts.Type);
								switch (cType) 
								{
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
					
					getSimulationInfo: function(data)
					{
						console.log("Getting Player Unit Damage");
						try
						{
							var crystals = 0, infCry = 0, vehiCry = 0, airCry = 0;
							var allSH = 0, allEH = 0, allMH = 0, allHP = 0;	
							var baseSH = 0, baseEH = 0, baseMH = 0, baseHP = 0;
							var defSH = 0, defEH = 0, defMH = 0, defHP = 0;
							var infSH = 0, infEH = 0, infMH = 0, infHP = 0;
							var vehiSH = 0, vehiEH = 0, vehiMH = 0, vehiHP = 0;
							var airSH = 0, airEH = 0, airMH = 0, airHP = 0;
							var infRT = 0, vehiRT = 0, airRT = 0;
							var cySH = 0, cyEH = 0, cyMH = 0, cyHP = 0;
							var dfSH = 0, dfEH = 0, dfMH = 0, dfHP = 0;
							var costs = {};
							var entities = []; //for calculating loot 
							var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
							var defBonus = city.get_AllianceDefenseBonus();
							for (var idx = 0; idx < data.length; idx++)
							{
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
								switch(pType)
								{
									case ClientLib.Base.EPlacementType.Defense: 
										allMH += mHealth;
										allEH += eHealth;
										defMH += mHealth;
										defEH += eHealth;
										break;
									case ClientLib.Base.EPlacementType.Offense:
										switch(mType)
										{
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
										switch(uMDBID)
										{
											case 151:
											case 112:
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
							if (allOffHP == 0)
							{
								 this.__labelMiscOutcome.setLabel("Mutlak Yenilgi");
								 this.__labelMiscOutcome.setIcon("FactionUI/icons/icon_reports_total_defeat.png");
								 this.__labelMiscOutcome.setTextColor("red");
							}
							else if (cyEH == 0)
							{	
								this.__labelMiscOutcome.setLabel("Mutlak Zafer");
								this.__labelMiscOutcome.setIcon("FactionUI/icons/icon_reports_total_victory.png");
								this.__labelMiscOutcome.setTextColor("darkgreen");
							}
							else
							{
								this.__labelMiscOutcome.setLabel("Zafer");
								this.__labelMiscOutcome.setIcon("FactionUI/icons/icon_reports_victory.png");
								this.__labelMiscOutcome.setTextColor("darkgreen");
							}

							this.__labelEnemyOverallHealth.setValue(allHP.toFixed(2));
							this.setEHLabelColor(this.__labelEnemyOverallHealth, allHP.toFixed(2));
							
							this.__labelEnemyDefenseHealth.setValue(defHP.toFixed(2));
							this.setEHLabelColor(this.__labelEnemyDefenseHealth, defHP.toFixed(2));
							
							this.__labelEnemyBaseHealth.setValue(baseHP.toFixed(2));
							this.setEHLabelColor(this.__labelEnemyBaseHealth, baseHP.toFixed(2));
							
							this.__labelEnemyCYHealth.setValue(cyHP.toFixed(2));
							this.setEHLabelColor(this.__labelEnemyCYHealth, cyHP.toFixed(2));
							
							this.__labelEnemyDFHealth.setValue(dfHP.toFixed(2));
							this.setEHLabelColor(this.__labelEnemyDFHealth, dfHP.toFixed(2));
							
							var getRTSelection = localStorage['getRTSelection'];
							
							if (typeof localStorage['getDivider'] != 'undefined')
								var divider = " " + localStorage['getDivider'] + " ";	
							else
								var divider = " | "; //default
							
							
							if (typeof getRTSelection != 'undefined')
							{
								if (getRTSelection == "crt")
								{
									this.__labelRepairOverall.setValue(crystals + divider + allOffRT);
									this.__labelRepairInf.setValue(infCry + divider + infRT);
									this.__labelRepairVehi.setValue(vehiCry + divider + vehiRT);
									this.__labelRepairAir.setValue(airCry + divider + airRT);
								}
								else if (getRTSelection == "hprt")
								{
									this.__labelRepairOverall.setValue(allOffHP.toFixed(2) + divider + allOffRT);
									this.__labelRepairInf.setValue(infHP.toFixed(2) + divider + infRT);	
									this.__labelRepairVehi.setValue(vehiHP.toFixed(2) + divider + vehiRT);
									this.__labelRepairAir.setValue(airHP.toFixed(2) + divider + airRT);
									
								}
								else
								{
									this.__labelRepairOverall.setValue(allOffRT);
									this.__labelRepairInf.setValue(infRT);
									this.__labelRepairVehi.setValue(vehiRT);
									this.__labelRepairAir.setValue(airRT);	
								}	
							}
							else //default
							{
								this.__labelRepairOverall.setValue(allOffRT);
								this.__labelRepairInf.setValue(infRT);
								this.__labelRepairVehi.setValue(vehiRT);
								this.__labelRepairAir.setValue(airRT);
							}
							
							this.setRTLabelColor(this.__labelRepairOverall, allOffHP.toFixed(2));
							this.setRTLabelColor(this.__labelRepairInf, infHP.toFixed(2));
							this.setRTLabelColor(this.__labelRepairVehi, vehiHP.toFixed(2));
							this.setRTLabelColor(this.__labelRepairAir, airHP.toFixed(2));
							
							if (infRT === allOffRT && infHP < 100)
								this.__labelRepairInf.setTextColor("black");
							else if (vehiRT === allOffRT && vehiHP < 100)
								this.__labelRepairVehi.setTextColor("black");
							else if (airRT === allOffRT && airHP < 100)
								this.__labelRepairAir.setTextColor("black");
							
							var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();

							var currRTStorage = Math.max(ownCity.GetResourceCount(8), ownCity.GetResourceCount(9), ownCity.GetResourceCount(10));
							this.__labelRepairStorage.setValue(phe.cnc.Util.getTimespanString(ClientLib.Data.MainData.GetInstance().get_Time().GetTimeSpan(currRTStorage)));
							
							if (currRTStorage > allOffRTInSeconds)
								this.__labelRepairStorage.setTextColor("darkgreen");
							else
								this.__labelRepairStorage.setTextColor("red");
                            
							//Calculates the possible resources gained from simulation
							this.calcResources(entities);
						}
						catch(e)
						{
							console.log("Error Getting Player Unit Damage");
							console.log(e.toString());
						}
					},
					
                    /**
                     * All credit for the main layout of this function goes to KRS_L. Thanks to Topper42 and Deyhak for talking about it in the forums!
                     */
					calcResources: function(entities)
					{
						try
						{
                            //So we can splice and reduce the amount of time looping later on
                            buildingEnts = entities;
                            defEnts = entities;
                            
							var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();
                            
                            //Pretty sure we just need the EResourceType
                            var lootArray = {1: 0, 2: 0, 3: 0, 6: 0}; //1: Tib, 2: Cry, 3: Gold(credits) 6: RP
							var lootArray2 = {1: 0, 2: 0, 3: 0, 6: 0}; 
							var mod = -1;
							var isFirstHarvester = false;
                            //Based on forums we need to cycle through the grid 
                            //Info needed is the building or structure information and the defensive units information
                            //Structure data can be retrieved by using get_City() and Defense data by get_DefenseSetup()
                            //See ClientLib.js.txt if you have it or can find it. These functions are under Type:ClientLib.Vis.VisMain
                            
                            //Let's do X coords as our outer loop there should be 0-8 or 9 slots.
                            for (var x = 0; x < 9; x++)
                            {
								
                                //Inner loop will be Y should be 8 slots or 0-7
                                for (var y = 0; y < 8; y++)
                                {
                                	var width =  ClientLib.Vis.VisMain.GetInstance().get_City().get_GridWidth();
                                	var height =  ClientLib.Vis.VisMain.GetInstance().get_City().get_GridHeight();
                                
                                	//Per the forums we should multiply x by the width and y by the height
                                    //Well GetObjectFromPosition doesn't work which is in the ClientLib.js.txt, but KRS_L has found the new function
                               		var cityEntity =  ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition(x * width, y * height);
                                    
                                    //Ok we have the city object or at least we hope we do. 
                                    //Forums says this can return empty fields so we need to check for that
                                    if (cityEntity != null && cityEntity.get_CityEntity() !== null)
                                    {
                                        //Now loop through the entities from the simulation until we find a match
                                        if (typeof entities != 'undefined')
                                        {
                                            for (var idx = 0; idx < buildingEnts.length; idx++)
                                            {
                                                var entity = buildingEnts[idx];
                                                var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(entity.t);

                                                //We've got a match!
                                                if (unit.dn == cityEntity.get_BuildingName())
                                                {         	
													mHealth = Simulator.getInstance().GetUnitMaxHealth(entity.l, unit);
													mod = ((entity.sh  - entity.h) / 16) / mHealth;
													if (unit.dn == "Harvester") 
													{
														var mod2 = cityEntity.get_BuildingDetails().get_HitpointsPercent();
														if (Math.round(mod2 * 100) != Math.round(mod * 100))
														{
															mod = mod2;
														}
													}
                                                    var isSpliced = buildingEnts.splice(idx, 1);
                                                    break;
                                                }
                                                
                                            }
                                        } 
                                        
                                        var buildingDetails = cityEntity.get_BuildingDetails();
										
										if (mod == -1)
										{
											mod = buildingDetails.get_HitpointsPercent();
											if (cityEntity.get_BuildingName() == "Harvester") 
											{
												var mod2 = cityEntity.get_BuildingDetails().get_HitpointsPercent();
												if (Math.round(mod2 * 100) != Math.round(mod * 100))
												{
													mod = mod2;
												}
											}
										}
                                            
							
                                        var reqs = buildingDetails.get_UnitLevelRepairRequirements();
										
										for (var idx2 = 0; idx2 < reqs.length; idx2++)
										{
											var type = reqs[idx2].Type;
											var count = reqs[idx2].Count;
											lootArray[type] += Math.round((mod * count) - 0.5); //Rounding otherwise floating numbers
										}
                                        
                                        //reset mod
                                        mod = -1;
                                    }
								}
							}
                            
							for (var x = 0; x < 9; x++)
                            {
								
                                //Inner loop will be Y should be 8 slots or 0-7
								for (var y = 8; y < 16; y++)
								{
									var width =  ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().get_GridWidth();
									var height =  ClientLib.Vis.VisMain.GetInstance().get_DefenseSetup().get_GridHeight(); 
									if (y == 8)
									{
										width += 1;
										height += 1;
									}
                                    //Now do the same for defense units
                                    var defEntity = ClientLib.Vis.VisMain.GetInstance().GetObjectFromPosition(x * width, y * height);
                                    if (defEntity !== null && defEntity.get_CityEntity() !== null && defEntity.get_VisObjectType() != ClientLib.Vis.VisObject.EObjectType.CityBuildingType) 
                                    {
                                        if (typeof entities != 'undefined')
                                        {
                                            for (var idx = 0; idx < defEnts.length; idx++)
                                            {
                                                var entity = defEnts[idx];
                                                var unit = ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(entity.t);
                                                
                                                //Got a match!
                                                if (unit.dn == defEntity.get_UnitName())
                                                {
                                                    mHealth = Simulator.getInstance().GetUnitMaxHealth(entity.l, unit);
													mod = ((entity.sh  - entity.h) / 16) / mHealth;
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
										
										for (var idx2 = 0; idx2 < reqs.length; idx2++)
										{
											var type = reqs[idx2].Type;
											var count = reqs[idx2].Count;
											lootArray[type] += Math.round((mod * count) - 0.5); //Rounding otherwise floating numbers
										}
                                        
                                        mod = -1;
                                    }
                                }
                            }
							
                            if (typeof entities == 'undefined')
                            {
                                var totalLoot = lootArray[1] + lootArray[2] + lootArray[3] + lootArray[6];
                            	this.__labelBattleLootTotal.setValue(Simulator.getInstance().formatNumbersCompact(totalLoot));
								this.__labelBattleLootTib.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[1]));
								this.__labelBattleLootCry.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[2]));
								this.__labelBattleLootCred.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[3]));
								this.__labelBattleLootRP.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[6]));
                            }
                            else
                            {
                                var totalLoot = lootArray[1] + lootArray[2] + lootArray[3] + lootArray[6];
								
								//If one has a "|", then they all have it.
								if (typeof localStorage['getDivider'] != 'undefined')
									var divider = localStorage['getDivider'];
								else
									var divider = "|";

                                var idxOf = this.__labelBattleLootTotal.getValue().indexOf(divider);
                                if ( idxOf != -1 )
                                {
                                    var subString = this.__labelBattleLootTotal.getValue().substring(idxOf - 1);
                                    this.__labelBattleLootTotal.setValue(Simulator.getInstance().formatNumbersCompact(totalLoot) + " " + subString);
									
									var subString = this.__labelBattleLootTib.getValue().substring(this.__labelBattleLootTib.getValue().indexOf(divider) - 1);
									this.__labelBattleLootTib.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[1]) + " " + subString);
									
									var subString = this.__labelBattleLootCry.getValue().substring(this.__labelBattleLootCry.getValue().indexOf(divider) - 1);
									this.__labelBattleLootCry.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[2]) + " " + subString);
									
									var subString = this.__labelBattleLootCred.getValue().substring(this.__labelBattleLootCred.getValue().indexOf(divider) - 1);
									this.__labelBattleLootCred.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[3]) + " " + subString);
									
                                    var subString = this.__labelBattleLootRP.getValue().substring(this.__labelBattleLootRP.getValue().indexOf(divider) - 1);
									this.__labelBattleLootRP.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[6]) + " " + subString);
                                }
                                else
                                {
                                    this.__labelBattleLootTotal.setValue(Simulator.getInstance().formatNumbersCompact(totalLoot) + " " + divider + " " + this.__labelBattleLootTotal.getValue());
									this.__labelBattleLootTib.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[1]) + " " + divider + " " + this.__labelBattleLootTib.getValue());
									this.__labelBattleLootCry.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[2]) + " " + divider + " " + this.__labelBattleLootCry.getValue());
									this.__labelBattleLootCred.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[3]) + " " + divider + " " + this.__labelBattleLootCred.getValue());
									this.__labelBattleLootRP.setValue(Simulator.getInstance().formatNumbersCompact(lootArray[6]) + " " + divider + " " + this.__labelBattleLootRP.getValue());
                                }
                            }
						}
						catch(e)
						{
							console.log("Error Calculating Resources");
							console.log(e);
						}
							
					},
					
					setRTLabelColor: function(label, number)
					{
						if (number < 25)
							label.setTextColor("red");
						else if (number < 75)
							label.setTextColor("orangered");
						else
							label.setTextColor("darkgreen");
					},
					
					setEHLabelColor: function(label, number)
					{
						if (number < 25)
							label.setTextColor("darkgreen");
						else if (number < 75)
							label.setTextColor("orangered");
						else
							label.setTextColor("red");
					},
					
					disableSimulateStatButtonTimer: function(timer)
					{
						try
						{
							if ( timer >= 1000)
							{
								this.isSimStatButtonDisabled = true;
								simStatBtn.setLabel(Math.floor(timer/1000));
								timer -= 1000;
								setTimeout(function () {
									Simulator.StatWindow.getInstance().disableSimulateStatButtonTimer(timer);
								}, 1000)
							}
							else
							{
								setTimeout(function () {
									simStatBtn.setEnabled(true);
									simStatBtn.setLabel("Update");
								}, timer)
								this.isSimStatButtonDisabled = false;
							}
						}
						catch(e)
						{
							console.log("Error disabling simulator button");
							console.log(e.toString());
						}
					}
				}
			});
			
			qx.Class.define("Simulator.OptionWindow", 
			{
				type: "singleton",
				extend:	qx.ui.window.Window,
				
				construct: function()
				{
					this.base(arguments);
					this.setLayout(new qx.ui.layout.VBox(5));
					this.addListener("resize", function(){
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
					tabView.set({height: 295, width: 295});
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
					if (typeof localStorage['isBtnRight'] != 'undefined')
					{
						if (localStorage['isBtnRight'] == "yes")
							this._buttonLocCB.setValue(true);
						else
							this._buttonLocCB.setValue(false);
					}

					if (typeof localStorage['isBtnNorm'] != 'undefined')
					{
						if (localStorage['isBtnNorm'] == "yes")
							this._buttonSizeCB.setValue(true);
						else
							this._buttonSizeCB.setValue(false);
							
						//Need to do this
						this.setButtonSize();
					}
					
					
					
					this._disableRTBtnCB = new qx.ui.form.CheckBox("Disable Repair Button");
					this._disableRTBtnCB.addListener("changeValue", this._onDisableRTBtnChange, this);
					if (typeof localStorage['isRTBtnDisabled'] != 'undefined')
					{
						if (localStorage['isRTBtnDisabled'] == "yes")
							this._disableRTBtnCB.setValue(true);
						else
							this._disableRTBtnCB.setValue(false);
					}
					
					this._disableCmtBtnCB = new qx.ui.form.CheckBox("Disable Combat Button");
					this._disableCmtBtnCB.addListener("changeValue", this._onDisableCmtBtnChange, this);
					if (typeof localStorage['isCmtBtnDisabled'] != 'undefined')
					{
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
					
					var simulatorHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
					simulatorHeader.setThemedFont("bold");
					var simulatorTitle = new qx.ui.basic.Label("Simulator:");
					simulatorHeader.add(simulatorTitle);
					genPage.add(simulatorHeader);
					
					var simulatorBox = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
					this._autoSimulateCB = new qx.ui.form.CheckBox("Auto Start Simulation");
					
					if (typeof localStorage['autoSimulate'] != 'undefined')
					{
						if (localStorage['autoSimulate'] == "yes")
							this._autoSimulateCB.setValue(true);
					}
					
					var simulatorBox2 = new qx.ui.container.Composite(new qx.ui.layout.Grid(5)).set({marginLeft: 20});
					var simSpeedOpt1 = new qx.ui.form.RadioButton("x1");
					var simSpeedOpt2 = new qx.ui.form.RadioButton("x2");
					var simSpeedOpt4 = new qx.ui.form.RadioButton("x4");
					this._simSpeedGroup = new qx.ui.form.RadioGroup(simSpeedOpt1, simSpeedOpt2, simSpeedOpt4);
					this._simSpeedGroup.addListener("changeSelection", this._onSimSpeedChange, this);
					this._autoSimulateCB.addListener("changeValue", this._onAutoSimulateChange, this);
					if (typeof localStorage['simulateSpeed'] != 'undefined')
					{
						var options = this._simSpeedGroup.getSelectables(false);
						
						if (localStorage['simulateSpeed'] == "2")
							options[1].setValue(true);
						else if (localStorage['simulateSpeed'] == "4")
							options[2].setValue(true);
						else
							options[0].setValue(true);
					}
					if (this._autoSimulateCB.getValue() == false) { this._simSpeedGroup.setEnabled(false); }
					
					simulatorBox2.add(simSpeedOpt1, {row:0, column: 0});
					simulatorBox2.add(simSpeedOpt2, {row:0, column: 1});
					simulatorBox2.add(simSpeedOpt4, {row:0, column: 2});
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
					if (typeof localStorage['autoOpenStat'] != 'undefined')
					{
						if (localStorage['autoOpenStat'] == "yes")
							this._autoOpenCB.setValue(true);
						else	
							this._autoOpenCB.setValue(false);
					}
					
					statWindowBox.add(this._autoOpenCB);
					statsPage.add(statWindowBox);
					
					var repairSecHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
					repairSecHeader.setThemedFont("bold");
					var repairSecTitle = new qx.ui.basic.Label("Repair Time Display:");
					repairSecHeader.add(repairSecTitle);
					statsPage.add(repairSecHeader);
					
					var repairSecBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
					var repairDisplayOpt1 = new qx.ui.form.RadioButton("C/RT");
					var repairDisplayOpt2 = new qx.ui.form.RadioButton("HP/RT");
					var repairDisplayOpt3 = new qx.ui.form.RadioButton("RT Only");
					this._repairSecGroup = new qx.ui.form.RadioGroup(repairDisplayOpt1, repairDisplayOpt2, repairDisplayOpt3);
					this._repairSecGroup.addListener("changeSelection", this._onRepairSelectionChange, this);
					if (typeof localStorage['getRTSelection'] != 'undefined')
					{
						var options = this._repairSecGroup.getSelectables(false);

						if (localStorage['getRTSelection'] == "hprt")
							options[1].setValue(true);
						else if (localStorage['getRTSelection'] == "rt")
							options[2].setValue(true);
						else
							options[0].setValue(true);
					}
					repairSecBox.add(repairDisplayOpt1);
					repairSecBox.add(repairDisplayOpt2);
					repairSecBox.add(repairDisplayOpt3);
					statsPage.add(repairSecBox);
					
					var dividerHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
					dividerHeader.setThemedFont("bold");
					var dividerTitle = new qx.ui.basic.Label("Divider:");
					dividerHeader.add(dividerTitle);
					statsPage.add(dividerHeader);
					
					var dividerBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
					var dividerOpt1 = new qx.ui.form.RadioButton("|");
					var dividerOpt2 = new qx.ui.form.RadioButton("/");
					this._dividerGroup = new qx.ui.form.RadioGroup(dividerOpt1, dividerOpt2);
					this._dividerGroup.addListener("changeSelection", this._onDividerChange, this);
					if (typeof localStorage['getDivider'] != 'undefined')
					{
						var options = this._dividerGroup.getSelectables(false);

						if (localStorage['getDivider'] == "/")
							options[1].setValue(true);
						else
							options[0].setValue(true);
					}
					dividerBox.add(dividerOpt1);
					dividerBox.add(dividerOpt2);
					statsPage.add(dividerBox);
					
					var hideSecHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
					hideSecHeader.setThemedFont("bold");
					var hideSecTitle = new qx.ui.basic.Label("Hide Sections (on Startup):");
					hideSecHeader.add(hideSecTitle);
					statsPage.add(hideSecHeader);
					
					var hideSecBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
					this._hideHealthCB = new qx.ui.form.CheckBox("Health");
					this._hideRepairCB = new qx.ui.form.CheckBox("Repair");
					this._hideMiscCB = new qx.ui.form.CheckBox("Misc");
					this._hideLootCB = new qx.ui.form.CheckBox("Loot");
					this._hideHealthCB.addListener("changeValue", this._onHideEHChange, this);
					this._hideRepairCB.addListener("changeValue", this._onHideRTChange, this);
					this._hideMiscCB.addListener("changeValue", this._onHideMiscChange, this);
					this._hideLootCB.addListener("changeValue", this._onHideLootChange, this);
					if (typeof localStorage['hideHealth'] != 'undefined')
					{
						if (localStorage['hideHealth'] == "yes")
							this._hideHealthCB.setValue(true);
						else	
							this._hideHealthCB.setValue(false);
					}
					if (typeof localStorage['hideRepair'] != 'undefined')
					{
						if (localStorage['hideRepair'] == "yes")
							this._hideRepairCB.setValue(true);
						else	
							this._hideRepairCB.setValue(false);
					}
					if (typeof localStorage['hideMisc'] != 'undefined')
					{
						if (localStorage['hideMisc'] == "yes")
							this._hideMiscCB.setValue(true);
						else	
							this._hideMiscCB.setValue(false);
					}
					if (typeof localStorage['hideLoot'] != 'undefined')
					{
						if (localStorage['hideLoot'] == "yes")
							this._hideLootCB.setValue(true);
						else	
							this._hideLootCB.setValue(false);
					}
					hideSecBox.add(this._hideHealthCB);
					hideSecBox.add(this._hideRepairCB);
					hideSecBox.add(this._hideMiscCB);
					hideSecBox.add(this._hideLootCB);
					statsPage.add(hideSecBox);
					
					var statPosHeader = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({marginTop: 10});
					//statPosHeader.setThemedFont("bold");
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
				
				destruct: function()
				{
				},
				
				members:
				{	
					_buttonSizeCB: null,
					_buttonLocCB: null,
					_disableRTBtnCB: null,
					_disableCmtBtnCB: null,
					_autoOpenCB: null,
					_autoSimulateCB: null,
					_simSpeedGroup: null,
					_repairSecGroup: null,
					_dividerGroup: null,
					_hideHealthCB: null,
					_hideRepairCB: null,
					_hideMiscCB: null,
					_hideLootCB: null,
					
					_onButtonSizeChange: function()
					{
						try
						{
							value = this._buttonSizeCB.getValue();
							
							if (value == true)
								localStorage['isBtnNorm'] = "yes";
							else	
								localStorage['isBtnNorm'] = "no";
								
							this.setButtonSize();	
						}
						catch(e)
						{
							console.log("Error Button Size Change: " + e.toString());
						}
					},
					
					_onButtonLocChange: function()
					{
						try
						{
							value = this._buttonLocCB.getValue();
								
							if (value == true)
								localStorage['isBtnRight'] = "yes";
							else	
								localStorage['isBtnRight'] = "no";
								
							this.setButtonLoc();	
						}
						catch(e)
						{
							console.log("Error Button Location Change: " + e.toString());
						}
					},
					
					_onDisableRTBtnChange: function()
					{
						try
						{
							value = this._disableRTBtnCB.getValue();
								
							if (value == true)
								localStorage['isRTBtnDisabled'] = "yes";
							else						
								localStorage['isRTBtnDisabled'] = "no";
								
							this.setRTBtn(value);	
						}
						catch(e)
						{
							console.log("Error Disable RT Button Change: " + e.toString());
						}
					},
					
					_onDisableCmtBtnChange: function()
					{
						try
						{
							value = this._disableCmtBtnCB.getValue();
								
							if (value == true)
								localStorage['isCmtBtnDisabled'] = "yes";
							else	
								localStorage['isCmtBtnDisabled'] = "no";
								
							this.setCmtBtn(value);	
						}
						catch(e)
						{
							console.log("Error Disable Cmt Button Change: " + e.toString());
						}
					},
					
					_onRepairSelectionChange: function(selection)
					{
						try
						{
							var option = selection.getData()[0];
							var label = option.getLabel();
							
							if (label == "C/RT")
								localStorage['getRTSelection'] = "crt";
							else if (label == "HP/RT")
								localStorage['getRTSelection'] = "hprt";
							else
								localStorage['getRTSelection'] = "rt";
						} 
						catch(e)
						{
							console.log("Error Repair Section Selection Change: " + e.toString());
						}
					},
					
					_onAutoOpenStatsChange: function()
					{
						try
						{
							var value = this._autoOpenCB.getValue();

							if (value == false)
								localStorage['autoOpenStat'] = "no";
							else
								localStorage['autoOpenStat'] = "yes";
						}
						catch(e)
						{
							console.log("Error Auto Open Stats Change: " + e.toString());
						}
					},
					
					_onAutoSimulateChange: function()
					{
						try
						{
							var value = this._autoSimulateCB.getValue();
							if (value == false)
							{
								this._simSpeedGroup.setEnabled(false);
								localStorage['autoSimulate'] = "no";
							}
							else
							{
								this._simSpeedGroup.setEnabled(true);
								localStorage['autoSimulate'] = "yes";
							}
						}
						catch(e)
						{
							console.log("Error Auto Simulate Change: " + e.toString());
						}
					},
					
					_onSimSpeedChange: function(selection)
					{
						try
						{
							var option = selection.getData()[0];
							var label = option.getLabel();
							
							if (label == "x1")
								localStorage['simulateSpeed'] = "1";
							else if (label == "x2")
								localStorage['simulateSpeed'] = "2";
							else
								localStorage['simulateSpeed'] = "4";
						}
						catch(e)
						{
							console.log("Error Sim Speed Change: " + e.toString());
						}
					},
					
					_onDividerChange: function(selection)
					{
						try
						{
							var option = selection.getData()[0];
							var label = option.getLabel();
						
							if (label == "/")
								localStorage['getDivider'] = "/";
							else
								localStorage['getDivider'] = "|";
							
							//Go ahead and recalculate loot so there is no issues
							Simulator.StatWindow.getInstance().calcResources();
						}
						catch(e)
						{
							console.log("Error Divider Change: " + e.toString());
						}
					},
					
					_onHideEHChange: function()
					{
						try
						{
							value = this._hideHealthCB.getValue();
								
							if (value == true)
								localStorage['hideHealth'] = "yes";
							else	
								localStorage['hideHealth'] = "no";
									
						}
						catch(e)
						{
							console.log("Error Hide Enemy Base Health Change: " + e.toString());
						}
					},
					
					_onHideRTChange: function()
					{
						try
						{
							value = this._hideRepairCB.getValue();
								
							if (value == true)
								localStorage['hideRepair'] = "yes";
							else	
								localStorage['hideRepair'] = "no";
									
						}
						catch(e)
						{
							console.log("Error Hide Repair Times Change: " + e.toString());
						}
					},
					
					_onHideMiscChange: function()
					{
						try
						{
							value = this._hideMiscCB.getValue();
								
							if (value == true)
								localStorage['hideMisc'] = "yes";
							else	
								localStorage['hideMisc'] = "no";
									
						}
						catch(e)
						{
							console.log("Error Hide Misc Change: " + e.toString());
						}
					},
					
					_onHideLootChange: function()
					{
						try
						{
							value = this._hideLootCB.getValue();
								
							if (value == true)
								localStorage['hideLoot'] = "yes";
							else	
								localStorage['hideLoot'] = "no";
									
						}
						catch(e)
						{
							console.log("Error Hide Loot Change: " + e.toString());
						}
					},
					
					_onSetStatWindowPositionChange: function()
					{
						try
						{
							var props = Simulator.StatWindow.getInstance().getLayoutProperties();
							localStorage['statWindowPosLeft'] = props["left"];
							localStorage['statWindowPosTop'] = props["top"];
						}
						catch(e)
						{
							console.log("Error Stat Window Position Change: " + e.toString());
						}
					},
					
					setRTBtn: function(value)
					{
						if (value == true)
							unlockRTBtn.hide();
						else
							unlockRTBtn.show();
					},
					
					setCmtBtn: function(value)
					{
						if (value == true)
							unlockCmtBtn.hide();
						else
							unlockCmtBtn.show();
					},
					
					setButtonLoc: function()
					{
						try
						{
							value = this._buttonLocCB.getValue();
							size = this._buttonSizeCB.getValue();

							if (value == true) //Right
							{
								var pLeft = null;
								if (size == true) //Right Normal
									var pRight = 58;
								else //Right Small
									var pRight = 70;
								
								armyBar.add(simBtn,{left: pLeft, right: pRight, bottom: 119});
								armyBar.add(statBtn,{left: pLeft, right: pRight, bottom: 81});
								armyBar.add(optionBtn,{left: pLeft, right: pRight, bottom: 43});
								armyBar.add(layoutBtn,{left: pLeft, right: pRight, bottom: 5});	

								playArea.add(shiftUpBtn,{left: pLeft, right: 70, bottom: 110});
								playArea.add(shiftDownBtn,{left: pLeft, right: 70, bottom: 70});
								playArea.add(shiftLeftBtn,{left: pLeft, right: 90, bottom: 90});
								playArea.add(shiftRightBtn,{left: pLeft, right: 50, bottom: 90});
								playArea.add(disableAllUnitsBtn,{left: pLeft, right: 6, bottom: 120});
								playArea.add(mirrorBtn,{left: pLeft, right: 6, bottom: 160});
								playArea.add(armyUndoBtn,{left: pLeft, right: 6, bottom: 200});	
								playArea.add(quickSaveBtn, {left: pLeft, right: 6, bottom: 240});
							}
							else //Left
							{
								var pRight = null;
								if (size == true) //Left Normal
									var pLeft = 13;
								else	
									var pLeft = 83;
									
								armyBar.add(simBtn,{left: pLeft, right: pRight, bottom: 120});
								armyBar.add(statBtn,{left: pLeft, right: pRight, bottom: 82});
								armyBar.add(optionBtn,{left: pLeft, right: pRight, bottom: 44});
								armyBar.add(layoutBtn,{left: pLeft, right: pRight, bottom: 6});
								
								playArea.add(shiftUpBtn,{left: 80, right: pRight, bottom: 110});
								playArea.add(shiftDownBtn,{left: 80, right: pRight, bottom: 70});
								playArea.add(shiftLeftBtn,{left: 60, right: pRight, bottom: 90});
								playArea.add(shiftRightBtn,{left: 100, right: pRight, bottom: 90});
								playArea.add(disableAllUnitsBtn,{left: 6, right: pRight, bottom: 120});
								playArea.add(mirrorBtn,{left: 6, right: pRight, bottom: 160});
								playArea.add(armyUndoBtn,{left: 6, right: pRight, bottom: 200});
								playArea.add(quickSaveBtn, {left: 6, right: pRight, bottom: 240});
							}
						}
						catch(e)
						{
							console.log("Error Setting Button Location: " + e.toString());
						}
					},
					
					setButtonSize: function()
					{
						try
						{
							value = this._buttonSizeCB.getValue();
							
							if (value == true)
							{
								simBtn.setLabel("Simulate");
								simBtn.setWidth(60);
								
								statBtn.setLabel("Stats");
								statBtn.setWidth(60);
								
								optionBtn.setLabel("Options");
								optionBtn.setWidth(60);
								
								layoutBtn.setLabel("Layouts");
								layoutBtn.setWidth(60);
							}
							else
							{
								simBtn.setLabel("S");
								simBtn.setWidth(30);
								
								statBtn.setLabel("I");
								statBtn.setWidth(30);
								
								optionBtn.setLabel("O");
								optionBtn.setWidth(30);
								
								layoutBtn.setLabel("L");
								layoutBtn.setWidth(30);
							}
							
							this.setButtonLoc();							
						}
						catch(e)
						{
							console.log("Error Setting Button Size: " + e.toString());
						}
					}
				}
			});
			
			qx.Class.define("Simulator.LayoutWindow", 
			{
				type: "singleton",
				extend: webfrontend.gui.CustomWindow,
				
				construct: function()
				{
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
					
					var layoutListHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox(5)).set({ decorator: "pane-light-opaque"});
					var layoutListTitle = new qx.ui.basic.Label("Formation Saver").set({ alignX: "center", alignY: "top", font: "font_size_14_bold"});
					layoutListHeader.add(layoutListTitle);
					this.add(layoutListHeader);
					
					this.layoutList = new qx.ui.form.List();
					this.layoutList.set(
					{
							selectionMode : "one",
							height: 100,
							width: 150,
							margin: 5
					});
					this.add(this.layoutList);
					
					var listButtonBox = new qx.ui.container.Composite();
					var listButtonLayout = new qx.ui.layout.HBox(5, "center");
					listButtonBox.setLayout(listButtonLayout);
					var loadButton = new qx.ui.form.Button("Yukle");
					var deleteButton = new qx.ui.form.Button("Sil");
					loadButton.set({ height: 15, width: 70, alignX: "center" });
					loadButton.addListener("click", this.loadLayout, this);
					deleteButton.set({ height: 15, width: 70, alignX: "center" });
					deleteButton.addListener("click", this.deleteLayout, this);
					listButtonBox.add(loadButton);
					listButtonBox.add(deleteButton);
					this.add(listButtonBox);
					
					var saveLayoutBox = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({spacing: 10})).set({marginTop: 20, marginLeft: 5});
					this.layoutTextBox = new qx.ui.form.TextField("").set({width: 75, maxLength: 15});
					var saveButton = new qx.ui.form.Button("Kaydet");
					saveButton.set({ height: 10, width: 70, alignX: "center" });
					saveButton.addListener("click", this.saveNewLayout, this);
					saveLayoutBox.add(this.layoutTextBox);
					saveLayoutBox.add(saveButton);
					this.add(saveLayoutBox);
					
					var checkBox = new qx.ui.container.Composite(new qx.ui.layout.HBox().set({spacing: 10})).set({marginTop: 10, marginLeft: 5});
					this.persistentCheck = new qx.ui.form.CheckBox("Kalıcı Yap");
					this.persistentCheck.setTextColor("white");
					this.persistentCheck.setFont("bold");
					this.persistentCheck.setToolTipText("If checked, formation will be saved and can be used by this city in any other city");
					checkBox.add(this.persistentCheck);
					this.add(checkBox);
					
					var noticeBox = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({marginTop: 5, marginLeft: 5});
					var noticeText = new qx.ui.basic.Label("").set({ alignX: "center", alignY: "top"});
					noticeText.setValue("<p align=\'justify\'><b>If formation does not change on load, try moving one unit first, then try again.</b></p>"); 
					noticeText.set({rich: true, wrap: true, width: 165, textColor: "white"});
					noticeBox.add(noticeText);
					this.add(noticeBox);
					
					var clearAllLayoutsBox = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({alignX: "center", marginTop: 5, marginLeft: 5, allowGrowX: false});
					var clearAllLayoutsBtn = new qx.ui.form.Button("Tumunu Temizle").set({alignX: "center", width: 70});
					clearAllLayoutsBtn.addListener("click", this.clearAllLayouts, this);
					clearAllLayoutsBox.add(clearAllLayoutsBtn);
					this.add(clearAllLayoutsBox);
					
					this.layoutsArray = new Array();				
				},
				
				destruct: function()
				{
				},
				
				members:
				{
					layoutList: null,
					layoutTextBox: null,
					layoutsArray: null,
					persistentCheck: null,
					
					saveNewLayout: function(isQS)
					{		
						try
						{
						
							console.log("Saving Layout");
							//if (this.layoutTextBox.getValue() == "" && typeof isQS == 'undefined')
							//{
							//	alert("Need to apply a name to the layout");
							//	return;
							//}
							
							if ((typeof isQS != 'undefined' && isQS == true) || this.layoutTextBox.getValue() == "")
							{
								var date = new Date();
								var day = date.getDate();
								var month = date.getMonth() + 1;
								var hour = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours();
								var minute = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
								var second = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds();
								var label = month + "/" + day + "@" + hour + ":" + minute + ":" + second;
							}
							else
							{
								var label = this.layoutTextBox.getValue();
							}
							
							var cityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
							var ownCityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
							var model = ownCityID + "." + cityID + "." + label;
							
							var children = this.layoutList.getChildren();
							//Check for same layout name if so do NOT save
							for (var item = 0; item < children.length; item++)
							{
								thisItem = children[item].getModel();
								if (thisItem == model)
								{
									alert("Save Failed: Duplicate Name");
									return;
								}
							}
							var units = Simulator.getInstance().getCityPreArmyUnits().get_ArmyUnits().l;
							units = this.prepareLayout(units);
							
							var layoutInformation = {};
							if (this.persistentCheck.getValue() == true)
							{
								layoutInformation = { id: model, label: label, formation: units, pers: "yes", };
							}
							else
							{
								layoutInformation = { id: model, label: label, formation: units, pers: "no", };
							}	
							this.layoutsArray.push(layoutInformation);
							this.layoutList.add(new qx.ui.form.ListItem(layoutInformation.label, null, layoutInformation.id));
							this.layoutTextBox.setValue("");
							quickSaveBtn.setLabel("✔");
							(function(quickSaveBtn) {
								setTimeout(function()
								{
									quickSaveBtn.setLabel("QS");
								}, 2000);
							}(quickSaveBtn));
							this.updateStorage();
						}
						catch(e)
						{
							console.log("Error Saving Layout");
							console.log(e);
						}
					},
					
					loadLayout: function()
					{
						try
						{
							console.log("Loading Layout");
							var ownCityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();

							var layout = this.layoutList.getSelection()[0].getModel();
							for( var item in this.layoutsArray)
							{
								var thisLayout = this.layoutsArray[item].id;	
								
								if (thisLayout == layout)
								{
									Simulator.getInstance().restoreFormation(this.layoutsArray[item].formation);
									break;
								}
							}
						}
						catch(e)
						{
							console.log("Error Loading Layout");
							console.log(e);
						}
					},
					
					deleteLayout: function()
					{				
						try
						{
							console.log("Deleting Layout");
							//Remove from our array too
							var rUSure = confirm('Are you sure you want to delete this layout?');
							if(!rUSure)
							{
								return;
							}
							for (var item in this.layoutsArray)
							{
								if (this.layoutsArray[item].id == this.layoutList.getSelection()[0].getModel())
								{
									var isRemoved = this.layoutsArray.splice(item, 1);
									this.updateStorage();
								}
							}
							
							//The update will remove all and repopulate so no need to delete individual ones.
							this.updateLayoutList();
						}
						catch(e)
						{
							console.log("Error Deleting Layout");
							console.log(e);
						}
					},
					
					updateStorage: function()
					{
						try
						{
							console.log("Updating Storage");
							localStorage['savedFormations'] = JSON.stringify(this.layoutsArray);
						}
						catch(e)
						{
							console.log("Error updating localStorage");
							console.log(e);
						}
					},
					
					updateLayoutList: function()
					{
						try
						{
							console.log("Updating Layout List");
							var savedLayouts = localStorage['savedFormations'];
							if (typeof savedLayouts != 'undefined')
							{
								this.layoutsArray = JSON.parse(savedLayouts);
							}
							this.layoutList.removeAll(); //Clear List
							var cityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCityId();
							var ownCityID = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCityId();
							var model = ownCityID + "." + cityID;
							
							for (var item in this.layoutsArray)
							{
								var itemLabel = this.layoutsArray[item].label;
								var itemModel = model + "." + itemLabel;
								var pers = this.layoutsArray[item].pers;
								var match = this.layoutsArray[item].id.match(ownCityID.toString());

								if (itemModel == this.layoutsArray[item].id || ((typeof pers != 'undefined' && pers == "yes") && match != null))//Match!
								{
									this.layoutList.add(new qx.ui.form.ListItem(itemLabel, null, this.layoutsArray[item].id));
								}
							}
						}
						catch(e)
						{
							console.log("Error Updating Layout List");
							console.log(e);
						}
					},
					
					//Function from C&C Tiberium Alliances Combat Simulator script. Works well and does exactly what I need! 
					//For authors see: http://userscripts.org/scripts/show/145717
					prepareLayout: function (units) 
					{
						try
						{
							console.log("Preparing Layout for Saving");
							saved_units = [];
							for (var i = 0; i < units.length; i++) 
							{
								var unit = units[i];
								var armyUnit = {};
								armyUnit.x = unit.get_CoordX();
								armyUnit.y = unit.get_CoordY();
								armyUnit.id = unit.get_Id();
								armyUnit.enabled = unit.get_Enabled();
								saved_units.push(armyUnit);
							}
							return saved_units;
						}
						catch(e)
						{
							console.log("Error Preparing Unit Layout");
							console.log(e);
						}
					},
					
					clearAllLayouts: function()
					{
						try
						{
							console.log("Clearing All Layouts");
							var rUSure = confirm("Clicking OK will delete all of your saved layouts from every base!");
							
							if (rUSure)
							{
								localStorage.removeItem('savedFormations');
								this.layoutsArray = new Array();
								alert("All saved layouts have been deleted.");
								
								this.updateLayoutList();
							}
							else
							{
								alert("No layouts were deleted.");
							}
						}
						catch(e)
						{
							console.log("Error Clearing All Layouts");
							console.log(e);
						}
					}
				}
			});
		}
		
		function onViewChanged(oldMode, newMode)
		{
			setTimeout(function() 
			{
				try
				{
					console.log("View Changed");
					Simulator.OptionWindow.getInstance().close();
					Simulator.LayoutWindow.getInstance().close();
					if (newMode != ClientLib.Vis.Mode.CombatSetup && newMode != ClientLib.Vis.Mode.Battleground)
					{
						Simulator.StatWindow.getInstance().close();
						//Also reset temp formation array
						Simulator.getInstance().armyTempFormations = new Array();
						Simulator.getInstance().armyTempIdx = 0;
						armyUndoBtn.setEnabled(false);
						Simulator.getInstance().isSimulation = false;
					}
					else if (newMode == ClientLib.Vis.Mode.CombatSetup)
					{						
						var autoStatOpen = localStorage['autoOpenStat'];
						if (typeof autoStatOpen != 'undefined')
						{
							if (autoStatOpen == "yes")
							{
								//Why not auto-open the Stat window? Sounds like a good idea
								Simulator.StatWindow.getInstance().open();
							}
						}
						else
						{
							Simulator.StatWindow.getInstance().open();
						}
						
						if (Simulator.getInstance().isSimulation == false)
							setTimeout(function() { Simulator.StatWindow.getInstance().calcResources(); }, 2000);
						else
							Simulator.getInstance().isSimulation = false;
						
						if (oldMode != ClientLib.Vis.Mode.Battleground)
							Simulator.getInstance().saveTempFormation(); //Save the very first formation upon entering base.
					}
					
					if (ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity() != null)
					{
						var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity().get_Name();
						var ownCity = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity().get_Name();
						//Don't want shift formation buttons showing up during combat or in own player's cities
						if (newMode == ClientLib.Vis.Mode.Battleground || city == ownCity)
						{
							shiftUpBtn.hide();
							shiftDownBtn.hide();
							shiftLeftBtn.hide();
							shiftRightBtn.hide();
							disableAllUnitsBtn.hide();
							mirrorBtn.hide();
							armyUndoBtn.hide();
							quickSaveBtn.hide();
						}
						else if (city != ownCity) 
						{
							shiftUpBtn.show();
							shiftDownBtn.show();
							shiftLeftBtn.show();
							shiftRightBtn.show();
							disableAllUnitsBtn.show();
							mirrorBtn.show();
							armyUndoBtn.show();
							quickSaveBtn.show();
						}
					}
				}
				catch(e)
				{
					console.log("Error closing windows or hiding buttons on view change");
					console.log(e.toString());
				}
			}, 500);
		}
		
		function waitForGame() 
		{
			try 
			{
				if (typeof qx != 'undefined' && typeof qx.core != 'undfined' && typeof qx.core.Init != 'undefined') 
				{
					var app = qx.core.Init.getApplication();
					if (app.initDone == true) 
					{
						try
						{
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
								for (var key in ClientLib.Base.Util)
								{
									var strFunction = ClientLib.Base.Util[key].toString();
									if ( strFunction.indexOf("*=1.1") > -1 || strFunction.indexOf("*= 1.1") > -1)
									{
										Simulator.getInstance().GetUnitMaxHealth = ClientLib.Base.Util[key];
										break;
									}
								}
							else
								Simulator.getInstance().GetUnitMaxHealth = ClientLib.API.Util.GetUnitMaxHealth;    
								
							//Thanks to KRS_L for this next section solving the repair calculations until the new patch is on every server
							if (PerforceChangelist >= 392583) {
                            var u = "" + ClientLib.Data.Cities.prototype.get_CurrentCity;
                            for (var a in ClientLib.Data.Cities.prototype) if (ClientLib.Data.Cities.prototype.hasOwnProperty(a) && "function" == typeof ClientLib.Data.Cities.prototype[a]) {
                                var l = "" + ClientLib.Data.Cities.prototype[a];
                                if (l.indexOf(u) > -1 && 6 == a.length) {
                                    u = a;
                                    break
                                }
                            }
                            var c = "" + ClientLib.Data.Cities.prototype.get_CurrentOwnCity;
                            for (var h in ClientLib.Data.Cities.prototype) if (ClientLib.Data.Cities.prototype.hasOwnProperty(h) && "function" == typeof ClientLib.Data.Cities.prototype[h]) {
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
							Simulator.getInstance().attachNetEvent(ClientLib.Vis.VisMain.GetInstance(), "ViewModeChange", ClientLib.Vis.ViewModeChange, this , onViewChanged);
						}
						catch(e)
						{
							console.log("Simulator initialization error:");
							console.log(e);
						}
					} 
					else
						window.setTimeout(waitForGame, 1000);
				} 
				else 
				{
					window.setTimeout(waitForGame, 1000);
				}
			} 
			catch (e) 
			{
				if (typeof console != 'undefined') console.log(e);
				else if (window.opera) opera.postError(e);
				else GM_log(e);
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


/************************************
* Koordinat Yapıştırma Eklentisi
************************************/
// ==UserScript==
// @name        C&C:Tiberium Alliances Coords Button
// @namespace   CNCTACoordsButton
// @description Copy & Paste selected base's coords to chat message
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     1.0.1
// ==/UserScript==
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
                  var button = new qx.ui.form.Button("Koordinat Ver");
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