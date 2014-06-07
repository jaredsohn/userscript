// ==UserScript==
// @name		GrEmB - Kafke Mix
// @version		1.7
// @namespace	http://nallar.me
// @run-at		document-start
// @description	Does many things, combines my script and Super Reddit Alt-text display into a single easy to use script. Licensed as LGPL/BSD license, with the added requirement that you must give some form of noticable credit to the original author.(your choice of the two, if you make a derived work), excluding ArbritaryEntity's Super Reddit Alt-Text display, which is modified and used with permission from the author.
// @author		nallar,ArbitraryEntity
// @credits		Super Reddit Alt-Text display by ArbritaryEntity is included in this script. Emote Manager was inspired by RogueDarkJedi's Easy Emotes and My Global Ponies,duh! Color scheme used for user familiarity reasons, you can set your own in the config.)
// @homepage	http://nallar.me/scripts
// @include		http://*/*
// @_include	https://*/*
// @exclude		http://www.redditmedia.com/*
// @match		http://*/*
// @_match		https://*/*
// @updateURL
// ==/UserScript==
var local_version = 1.7;

var ranPassFunction = false;
var mainStylesheet = "http://nallar.me/scripts/out4.min.css";
var passFunction = function () {
		if(ranPassFunction) {
			return;
		}
		ranPassFunction = true;
		var subs = ["twilightsparkle","mylittlewarhammer","ainbowdash","mylittledamon","mylittlekindle", "Octavia", "pinkiepie","mylittlewtf","mylittlenanners","mylittlechaos", "mylittlewelcomewagon", "Mylittlenosleep", "mylittleonions", "MLPdrawingschool", "mylittledaww", "Mylittlemusician", "Surprise", "mylittlelistentothis","Applejack", "mylittlecelestias","MLPLounge", "mylittlefortress", "mylittlebannertest", "roseluck", "MLHFIS", "falloutequestria", "mylittlelivestream", "mlas1animotes", "daylightemotes", "mylittlesquidward", "vinylscratch", "mylittlenopenopenope","TheBestPony","mylittleandysonic1","idliketobeatree","mylittlepony"];
		var isReddit = (/reddit\.com/i).test(window.location.host);

		var defaultConfs = {};

		defaultConfs['defaultEmoteContainer'] = true;
		defaultConfs['nsfwMLAS1Emotes'] = true;
		defaultConfs['defaultEmoteContainerMouseleave'] = false;
		defaultConfs['defaultEmoteContainerEverywhere'] = true;
		defaultConfs['defaultEmoteContainerOnTop'] = true;
		defaultConfs['searchbarSpike'] = true;
		defaultConfs['searchbarSpikeEverywhere'] = false;
		defaultConfs['emoteManagerEverywhere'] = true;
		defaultConfs['emoteManagerFixText'] = true;
		defaultConfs['emoteManagerRedditStyle'] = false;
		defaultConfs['emoteManagerWindowStyleType'] = true;
		defaultConfs['emoteManagerWindowStyle'] = 'border: 1px solid #E1B000; background-color: #FFFDCC;';
		defaultConfs['defaultEmoteContainerY'] = "19";
		defaultConfs['defaultEmoteContainerX'] = "10";
		defaultConfs['defaultEmoteContainerWidth'] = "170";
		defaultConfs['defaultEmoteContainerHeight'] = "375";
		defaultConfs['defaultEmoteContainerSide'] = false;
		defaultConfs['defaultEmoteContainerGlobal'] = true;
		defaultConfs['manySubCSS'] = true;
		defaultConfs['disableEmoteSpin'] = true;
		defaultConfs['displayUnknownEmotes'] = true;
		defaultConfs['rbText'] = false;
		defaultConfs['emoteText'] = false;
		defaultConfs['additionalSubreddits_'] = 'mylittlenanners,mylittlewtf';
		defaultConfs['revealAltText'] = true;
		defaultConfs['nsfwDefunctEmotes'] = false;
		defaultConfs['alwaysTrue'] = true;
		defaultConfs['csssstore'] = {};
		defaultConfs['emoteNames'] = ['u', 'all', 'user', 'sbf', 'crossfire'];
		defaultConfs['oldVersion'] = false;
		defaultConfs['displayReloadingNotice'] = false;
		defaultConfs['lastVersion'] = local_version;
		defaultConfs['wideReddit'] = false;
		defaultConfs['justReset'] = false;
                defaultConfs['tabs'] = [];
                defaultConfs['tabs_'] = [];
                defaultConfs['tab-1'] = [];
                for(var i = 0; i < 100; i++)
                {
                    defaultConfs['tab'+i] = [];
                }
		var debug = function (level, text) {
				if(103 < level) {
					console.log(text);
				}
			};
		var sTime = 0;

		var sSection = function () {
				sTime = (new Date()).getTime();
			};

		var endSection = function () {
				if(sTime != 0) {
					return((new Date()).getTime() - sTime);
				} else {
					debug(103, "no section started");
				}
			};

		var trim = function (str) {
				return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			};

		var unsupported = false;
		if(!GM_getValue || (GM_getValue.toString && GM_getValue.toString().indexOf("not supported") > -1)) {
			console.log("Unsupported browser :(");
			unsupported = true;
			undefined.crashMe();
		}
		GM_safeGetValue2 = function (name) {
			var ret = GM_getValue("confArray");
			if(ret) {
				ret = JSON.parse(ret);
			}
			if(ret == undefined || (ret['alwaysTrue'] !== true)) {
				console.log("Reset ret! :o");
				ret = defaultConfs;
				GM_setValue('confArray', JSON.stringify(ret));
			}
			return ret;
		};
		var confStore = undefined;
		GM_safeGetValue = function (name) {
			var temp;
			if(confStore === undefined) {
				temp = GM_safeGetValue2("confArray");
				confStore = temp;
			} else {
				temp = confStore;
			}

			return temp;
		};
		var getKeys = function (obj) {
				var keys = [];
				for(var key in obj) {
					keys.push(key);
					keys.push(obj[key]);
				}
				return keys;
			};
		injectStyle = function (css, id) {
			var style, head = document.getElementsByTagName('head')[0];
			if(!head) {
				return;
			}
			style = document.createElement('style');
			style.setAttribute('id', id);
			style.setAttribute('type', 'text/css');
			style.innerHTML = css;
			head.appendChild(style);
		};
		getConf = function (id) {
			if(defaultConfs[id] === undefined) {
				debug(103, "getConf(): Hmm... this id isn't in defaultConfs, something is wrong :( " + id);
			}
			var temp;
			temp = GM_safeGetValue("confArray");
			if(temp[id] === undefined) {
				setConf(id, defaultConfs[id]);
				temp[id] = defaultConfs[id];
			}
			return temp[id];
		};
		var getConfForm = function (id) {
				var temp;
				temp = getConf(id);
				if(temp !== false) {
					temp = "checked='yes'";
				} else {
					temp = "";
				}
				return temp;
			};
		var getConfForm2 = function (id) {
				var temp;
				temp = getConf(id);
				if(temp === false) {
					temp = "checked='yes'";
				} else {
					temp = "";
				}
				return temp;
			};
		var cloness = function (thiss) {
				var newObj = (thiss instanceof Array) ? [] : {};
				for(i in thiss) {
					if(i == 'clone') {
						continue;
					}
					if(thiss[i] && typeof thiss[i] == "object") {
						newObj[i] = cloness(thiss[i]);
					} else {
						newObj[i] = thiss[i];
					}
				}
				return newObj;
			};
		setConf = function (name, value, nosave) {
			if(nosave === undefined) {
				nosave = false;
			}
			var temp = GM_safeGetValue("confArray");
			temp[name] = value;
			confStore = temp;
			if(nosave === true) {
				return;
			}
			GM_setValue("confArray", JSON.stringify(temp));
		};
		var removeDefunctConfs = function () {
				var temp = GM_safeGetValue("confArray");
				for(var i in temp) {
					if(defaultConfs[i] === undefined) {
						delete temp[i];
					}
				}
				confStore = temp;
				return GM_setValue("confArray", JSON.stringify(temp));
			};
		var superBundlePrefs;

		function makeInput(id, type, dis, q) {
			if(defaultConfs[id] === undefined) {
				debug(103, "makeInput(): Hmm... this id isn't in defaultConfs, something is wrong :( " + id);
			}
			if(!q) {
				var q = '';
			}
			if(type == 'checkbox') {
				return '<span style=\'float: right !important;\'><input id="' + id + '" name="conf" value="' + id + '" type="checkbox" ' + getConfForm(id) + dis + '/></span>';
			}
			if(type == 'text') {
				return '<span style=\'float: right !important;\'><input id="' + id + '" style="height: 18px;" name="conf" value="' + getConf(id) + '" type="textarea" ' + dis + '"/></span>';
			}
			if(type == 'radio2') {
				return '<span style=\'float: right !important;\'>' + q + '<input id="' + id + '" name="conf" value="right" type="radio" ' + getConfForm2(id) + dis + '/></span>';
			}
			if(type == 'radio1') {
				return '<span style=\'float: right !important;\'>' + q + '<input id="' + id + '" name="conf" value="left" type="radio" ' + getConfForm(id) + dis + '/></span>';
			}
			debug(104, "Invalid type for makeInput: " + id + "\t" + type + "\t" + dis);
			return '';
		}

		function nrKeys(a) {
			var i = 0;
			for(key in a) {
				i++;
			}
			return i;
		}

		function compareAssociativeArrays(a, b, depth) {
			if(a == b) {
				return true;
			}
			if(nrKeys(a) != nrKeys(b)) {
				return false;
			}
			if(depth == undefined) {
				var depth = 0;
			} else if(depth > 3) {
				return true; //hopefully they actually are the same... :p
			}
			for(key in a) {
				if(typeof (a[key]) == "object" && typeof (b[key]) == "object") {
					if(!compareAssociativeArrays(a[key], b[key], depth + 1)) {
						return false;
					}
				} else if(a[key] != b[key]) {
					return false;
				}
			}
			return true;
		}
		var onChange = function () {
				var oconf = cloness(GM_safeGetValue("confArray"));
				var checked = new Array();
				for(var i in document.getElementById('settingsForm').elements) {
					i = +i;
					if(isNaN(i)) {
						continue;
					}
					if(document.getElementById('settingsForm').elements[i].checked != undefined && document.getElementById('settingsForm').elements[i].type == "checkbox") {
						setConf(document.getElementById('settingsForm').elements[i].id, document.getElementById('settingsForm').elements[i].checked, true);
					} else if(document.getElementById('settingsForm').elements[i].type.substr(0, 4) == "text") {
						setConf(document.getElementById('settingsForm').elements[i].id, document.getElementById('settingsForm').elements[i].value, true);
					} else if(document.getElementById('settingsForm').elements[i].type == "radio") {
						if(document.getElementById('settingsForm').elements[i].checked) {
							setConf(document.getElementById('settingsForm').elements[i].id, (document.getElementById('settingsForm').elements[i].value == "left"), true);
						}
					}
				}
				if(getConf("emoteManagerWindowStyleType")) {
					setConf("emoteManagerWindowStyle", defaultConfs["emoteManagerWindowStyle"], true);
				}
				var conf = GM_safeGetValue("confArray");
				if((conf['additionalSubreddits_'] != oconf['additionalSubreddits_']) || (conf['manySubCSS'] != oconf['manySubCSS']) || (conf['nsfwDefunctEmotes'] != oconf['nsfwDefunctEmotes']) || (conf['displayUnknownEmotes'] != oconf['displayUnknownEmotes'])) {
					emoteNames = defaultConfs['emoteNames'];
					setConf('emoteNames', emoteNames, true);
					setConf('csssstore', {}, true);
				}
                                if(conf['tabs_'] != oconf['tabs_'])
                                {
                                    for(var i =0; i < 100; i++)
                                        setConf('tab'+i);
                                    emoteNames = defaultConfs['emoteNames'];
					setConf('emoteNames', emoteNames, true);
                                    setConf('csssstore', {}, true);
                                }
				setConf('manySubCSS', getConf('manySubCSS')); //hack to force saving
				if(!compareAssociativeArrays(conf, oconf)) {
					setTimeout("window.location.replace('http://nallar.me/scripts/');", 50);
				}
			}
		addListenersAgain = function () {
			document.getElementById('settingsForm').addEventListener("blur", onChange);
		}
		if((/csscachereset=1/).test(window.location.href) || getConf("lastVersion") != local_version) {
			setConf("lastVersion", local_version, true);
			setConf('csssstore', {}, true);
			setConf('emoteNames', defaultConfs['emoteNames']);
			setConf('justReset',true);
			emoteNames = defaultConfs['emoteNames'];
			emoteNames_ = defaultConfs['emoteNames'];
			window.location.replace(window.location.href.replace(/csscachereset=1/g, ""));
		} else if((/allconfreset=1/).test(window.location.href)) {
			GM_deleteValue("confArray");
			window.location.replace(window.location.href.replace(/allconfreset=1/g, ""));
		}
		makeWindow = function () {
			var dis = '';
			var disE = '';
			var disG = '';
			var disS = '';
			if(unsupported) {
				dis = " disabled='disabled'";
				disE = dis;
				disG = dis;
			}
			if(!getConf("defaultEmoteContainer")) {
				disE = " disabled='disabled'";
			}
			if(!getConf("emoteManagerEverywhere")) {
				disG = " disabled='disabled'";
				disF = disG;
			}
			if(getConf("emoteManagerWindowStyleType")) {
				disS = " disabled='disabled'";
			}
			removeDefunctConfs();

                    superBundlePrefs.innerHTML = "<h3 style='font-size:110%'>GrEmB Configuration</h3><br /><form action='#' name='settingsForm' id='settingsForm'>" + 'Include Emote Window?' + makeInput('defaultEmoteContainer', 'checkbox', dis) + '<br />&nbsp;&nbsp;Display emote window everywhere instead of just reddit?' + makeInput('defaultEmoteContainerEverywhere', 'checkbox', disE) + '<br />&nbsp;&nbsp;Display emote window without needing to scroll on reddit?' + makeInput('defaultEmoteContainerOnTop', 'checkbox', disE) + '<br />&nbsp;&nbsp;Small emote toggler?{Just \'<<\')' + makeInput('emoteText', 'checkbox', disE) + '<br />&nbsp;&nbsp;Close the emote window when your mouse leaves it?' + makeInput('defaultEmoteContainerMouseleave', 'checkbox', disE) + '<br />&nbsp;&nbsp;Which side of the screen should the Emote Window be displayed on?' + makeInput('defaultEmoteContainerSide', 'radio2', disE, "Right:") + makeInput('defaultEmoteContainerSide', 'radio1', disE, "Left:") + '<br />&nbsp;&nbsp;Use Easy Emotes style emote window?' + makeInput('emoteManagerWindowStyleType', 'checkbox', disE) + '<br />&nbsp;&nbsp;&nbsp;&nbsp;What custom CSS style should be used?' + makeInput('emoteManagerWindowStyle', 'text', (disE || disS)) + '<br />&nbsp;&nbsp;Emote window vertical position in pixels(41 to line up for RES)' + makeInput("defaultEmoteContainerY", "text", disE) + '<br />&nbsp;&nbsp;Emote window width in pixels(130 is Easy Emotes default size)' + makeInput("defaultEmoteContainerWidth", "text", disE) + '<br />&nbsp;&nbsp;Emote window height in pixels(250 is Easy Emotes default size)' + makeInput("defaultEmoteContainerHeight", "text", disE) + '<br /><br />Reveal Alt-Text for emotes using <a href="http://userscripts.org/scripts/show/109869">ArbitraryEntity\'s Super Reddit Alt-Text Display</a>?' + makeInput("revealAltText", "checkbox", dis) + '<br />Wide reddit mode - messages/posts display across the full width' + makeInput('wideReddit', 'checkbox', dis) + '<br />Show pony emotes globally using Emote Manager?' + makeInput('emoteManagerEverywhere', 'checkbox', dis) + '<br />&nbsp;&nbsp;Don\'t convert emotes in textboxes. (Fixes edit/quote in forums, reddit edit)' + makeInput("emoteManagerFixText", "checkbox", disG) + '<br />&nbsp;&nbsp;Show emotes in the reddit style?(off to the left)' + makeInput("emoteManagerRedditStyle", "checkbox", disG) + '<br /><br />Make reddit searchbars spike' + makeInput('searchbarSpike', 'checkbox', dis) + '<br />&nbsp;&nbsp;Try to make all searchbars spike' + makeInput('searchbarSpikeEverywhere', 'checkbox', dis) + '<br /><br />Add all 34 subreddits listed in the features list to emote window?' + makeInput('manySubCSS', 'checkbox', dis) + '<br />&nbsp;&nbsp;Tabs: ' + makeInput('tabs_', 'text', dis) + '<br />&nbsp;&nbsp;To add more subreddits, add the names here.<br />&nbsp;&nbsp;Separate using commas!eg: sub1,sub2' + makeInput('additionalSubreddits_', 'text', dis) + '<br />&nbsp;&nbsp;Include <b>NSFW</b> r/futashy/defunct MLAS1 emotes.(You probably don\'t want to)' + makeInput('nsfwDefunctEmotes', 'checkbox', dis) + '<br />&nbsp;&nbsp;Try to find and replace unknown emotes with a message' + makeInput('displayUnknownEmotes', 'checkbox', dis) + '<br />&nbsp;&nbsp;Display notice on all sites while CSS cache is being reloaded' + makeInput('displayReloadingNotice', 'checkbox', dis) + '<br /><br /><b>Disable spinning/3D emotes?</b> (recommended unless you have a fast computer, FF/Chrome don\'t use 3D acceleration yet)' + makeInput('disableEmoteSpin', 'checkbox', dis) + '<br /><br />Enable rainbow text for moderators names and as a text coloring? (Needs Chrome 17 or newer, that\'s dev/canary)' + makeInput('rbText', 'checkbox', dis) + '<br /><input id="saveSubmit" name="conf" type="submit" value="save"' + dis + '/>' + "</form>";
			if(unsupported) {
				superBundlePrefs.innerHTML = "<span style='text-color: red; text-style: bold;'>For some reason we can't seem to save configuration data - did you remember to install TamperMonkey if you're using Chrome? Make sure you did, remove this script from your extensions, and install it again, making sure to click ok when it asks you if you want to install it with TamperMonkey.</span><br />" + superBundlePrefs.innerHTML;
			}
			setTimeout(addListenersAgain, 1000);
			document.getElementById('settingsForm').addEventListener("click", onChange);
			document.getElementById('settingsForm').addEventListener("change", onChange);
		}
		var addSBConf = function () {
				superBundlePrefs = document.getElementById("superBundleConfAnchor");
				if(superBundlePrefs) {
					var style = ".confPanel br {line-height: 10px;}.confPanel {border: 1px solid #E1B000; background-color: #FFFDCC; top: 18px; position: fixed;} .confPanel {min-height: 10%; max-height: 95%; overflow-y: scroll; width: 48%; height: auto; z-index: 0 !important; left: 10px !important;} #page {width: 48% !important; position: relative !important; float: right;}";
					injectStyle(style, "superBundleConf");
					superBundlePrefs.setAttribute("id", "superBundleConfPanel");
					superBundlePrefs.setAttribute("class", "confPanel");
					superBundlePrefs.setAttribute("style", "margin-left: 10px !important; margin-right: 10px !important; font-size: small !important; line-height: 20px;");
					makeWindow();
				}
			};
		if(window.top === window) {
			properOnLoadEvent(addSBConf);
		}
		var cssStore = '';
		var currentForm = false;
		var addCSS = function (rule) {
				cssStore += ("\r\n \r\n" + rule + "\r\n \r\n");
			}
		var cssElem = false;

		function showCSS() {
			/*if(GM_addStyle){
	GM_addStyle(cssStore);
	cssStore = "";
	return;
	}*/
			cssElement = document.createElement('style');
			cssElement.setAttribute('type', 'text/css');
			if(cssElement.styleSheet) {
				cssElement.styleSheet.cssText = cssStore;
			} else {
				cssElement.appendChild(document.createTextNode(cssStore));
			}
			cssStore = '';
			var head = document.getElementsByTagName("head")[0];
			if(!head) {
				debug(103, "Hey... this doc has no head? :s");
			}
			if(cssElem === false) {
				head.appendChild(cssElement);
				cssElem = cssElement;
			} else {
				head.insertBefore(cssElement, cssElem);
			}
		}

		function setCursor(node, pos) { //Thanks stack overflow! http://stackoverflow.com/questions/1865563/set-cursor-at-a-length-of-14-onfocus-of-a-textbox
			var node = (typeof node == "string" || node instanceof String) ? document.getElementById(node) : node;
			if(!node) {
				return false;
			} else if(node.createTextRange) {
				var textRange = node.createTextRange();
				textRange.collapse(true);
				textRange.moveEnd(pos);
				textRange.moveStart(pos);
				textRange.select();
				return true;
			} else if(node.setSelectionRange) {
				node.setSelectionRange(pos, pos);
				return true;
			}
			return false;
		}

		function getCursorPos() {
			var range = document.selection.createRange();
			var bookmark = range.getBookmark();
			return bookmark.charCodeAt(2) - 11;
		}

		function findNode(list, node) {
			for(var i = 0; i < list.length; i++) {
				if(list[i] == node) {
					return i;
				}
			}
			return -1;
		}

		function addEmote(event, id) {
			event.stopPropagation();
			event.preventDefault();
			if(currentForm.value !== undefined) {
				var emoteID, startPos, endPos, formLength;
				emoteID = event.target.getAttribute("emoteID");
				emoteID = (event.altKey || event.ctrlKey) ? ("r" + emoteID) : emoteID;
				if(!emoteID || emoteID == "r") {
					return;
				}
				startPos = currentForm.selectionStart;
				endPos = currentForm.selectionEnd;
				formLength = currentForm.value.length;

				if(startPos != endPos) {
					currentForm.value = currentForm.value.substring(0, startPos) + "[](/" + emoteID + " \"" + currentForm.value.substring(startPos, endPos) + "\")" + currentForm.value.substring(endPos);
				} else {
					currentForm.value = currentForm.value.substring(0, startPos) + "[](/" + emoteID + ")" + currentForm.value.substring(startPos);
				}
				currentForm.setSelectionRange(endPos + (currentForm.value.length - formLength), endPos + (currentForm.value.length - formLength));
			} else if(currentForm.innerText !== undefined) {
				var emoteID, startPos, endPos, formLength;
				emoteID = event.target.getAttribute("emoteID");
				emoteID = (event.altKey || event.ctrlKey) ? ("r" + emoteID) : emoteID;
				if(!emoteID || emoteID == "r") {
					return;
				}
				if(window.getSelection) {
					startPos = window.getSelection().anchorOffset;
					endPos = window.getSelection().focusOffset;
				} else {
					startPos = getCursorPos();
					endPos = startPos;
				}
				formLength = currentForm.innerText.length;

				if(startPos != endPos) {
					currentForm.innerText = currentForm.innerText.substring(0, startPos) + "[](/" + emoteID + " \"" + currentForm.innerText.substring(startPos, endPos) + "\")" + currentForm.innerText.substring(endPos);
				} else {
					currentForm.innerText = currentForm.innerText.substring(0, startPos) + "[](/" + emoteID + ")" + currentForm.innerText.substring(startPos);
				}
				setCursor(currentForm, endPos + (currentForm.innerText.length - formLength), endPos + (currentForm.innerText.length - formLength));
			}
			toggleEmoteWindow(id);
			currentForm.focus();
			return false;
		}
		var windowClasses = "GrEmBWindow GrEmBEmoteWindow";
		var closedWindowClasses = windowClasses + " closedWindow";
		var setUpTabs = false;
		openTab = function (evt) {
                        for(var i = 0; i < getConf('tabs').length; i++)
                        {        
                                if(evt.target.getAttribute('tabID') == i) 
                                document.getElementById("tab"+i).setAttribute("class", "GrEmBEmoteList");
                                else
                                document.getElementById("tab"+i).setAttribute("class", "GrEmBEmoteList closedTab");
                        }
                        
		}

		function updateCurrentForm() {
			if(!setUpTabs) {
				if(!document.getElementById("GrEmBtablist")) {
					debug(104, "Still no element? :S");
					return;
				}
				document.getElementById("GrEmBtablist").addEventListener("click", function (evt) {
					openTab(evt);
				}, false);
				setUpTabs = true;
			}
			if(document.activeElement == document.body) {
				return;
			}
			if(currentForm != document.activeElement || (window.frames[document.activeElement.name] && window.frames[document.activeElement.name].window && window.frames[document.activeElement.name].window.document && window.frames[document.activeElement.name].window.document.activeElement != currentForm)) {
				currentForm = document.activeElement;
				if(currentForm.tagName == "IFRAME") {
					if(document.activeElement.contentWindow || document.activeElement.contentDocument) {
						currentForm = document.activeElement.contentWindow.document.activeElement || document.activeElement.contentDocument.document.activeElement;
					} else {
						currentForm = window.frames[document.activeElement.name].window.document.activeElement;
					}
				}
			}

		}

		function toggleEmoteWindow(evt, id, f) {
			var emoteWindow = document.getElementById("GrEmBEmoteWindow" + id);
			if(id !== 0 && !id) {
				return;
			}
			if(!f) {
				var f = 0;
			}
			if(!emoteWindow) {
				return debug(103, "Could not find emote window with ID: GrEmBEmoteWindow" + id + "... :( Something broke, report this error.");
			}
			var log = "Window was: " + emoteWindow.getAttribute("class");
			if(f) {
				emoteWindow.setAttribute("class", closedWindowClasses);
			} else {
				emoteWindow.setAttribute("class", (emoteWindow.getAttribute("class") == windowClasses) ? closedWindowClasses : windowClasses);
			}
			evt.preventDefault();
			evt.stopPropagation();
			evt.cancelBubble = true;
		}

		function mouseEnter(_fn) {
			return function (_evt) {
				var relTarget = _evt.relatedTarget;
				if(this === relTarget || isAChildOf(this, relTarget)) {
					return;
				}
				_fn.call(this, _evt);
			}
		}

		function isAChildOf(_parent, _child) {
			if(_parent === _child) {
				return false;
			}
			var limit = 0;
			while(_child && _child !== _parent && limit < 10) {
				_child = _child.parentNode;
				limit++;
			}
			if(limit >= 10) {
				return false;
			}
			return _child === _parent;
		}

		function createEmoteWindow(id, side, x, y, z, w, h, emotes, name) { //Window ID,side,xPos,Ypos,zPos(Depth/zIndex),width,height,innerHTML for the emotes.
			if(window !== window.top) {
				debug(100, "Didn't render emote window in frame");
				return;
			}
			if(document.getElementById("GrEmBEmoteToggle" + id)) {
				return;
			}
			debug(100, "Making window with id,name,tid,side,z: " + id + "\t" + name + "\t" + "GrEmBEmoteToggle" + id + "\t" + side + "\t" + z);
			var windowToggler = document.createElement("div");
			windowToggler.setAttribute("id", "GrEmBEmoteToggle" + id);
			windowToggler.setAttribute("class", "GrEmBWindow");
			windowToggler.setAttribute("style", "color: black; z-index: " + z + "; position: fixed !important; top: " + y + "px; " + side + ": 10px;");
			var lt, rt;
			lt = '';
			rt = ''
			if(side === "right") {
				lt = "<b>&lt;&lt;</b>";
			} else {
				rt = "<b>&gt;&gt;</b>";
			}
			windowToggler.innerHTML = '<span class="GrEmBTitleText">' + lt + name + rt + '</span>';

			var emoteWindow = document.createElement("div");
			emoteWindow.setAttribute("id", "GrEmBEmoteWindow" + id);
			emoteWindow.setAttribute("class", closedWindowClasses + " closedTab");
			emoteWindow.setAttribute("style", "color: black; z-index: " + (z + 1) + "; position: fixed !important; top: " + y + "px; " + side + ": 10px; width: " + w + "px; height: " + h + "px; max-width: " + ((+w) + 30) + "px; max-height: " + ((+h) + 30) + "px;");
			lt = '';
			rt = '';
			if(side === "right") {
				rt = '<span style="float: left; cursor: pointer; font-weight: bold; text-decoration: underline overline;" class="GrEmBTitleText" id="closeEmoteWindow' + id + '">X</span>&nbsp;&nbsp; ';
			} else {
				rt = ' &nbsp;&nbsp;<span style="float: right; cursor: pointer; font-weight: bold; text-decoration: underline overline;" class="GrEmBTitleText" id="closeEmoteWindow' + id + '">X</span>';
			}
			emoteWindow.innerHTML = "<span style='float: " + side + ";'>" + 'Click to place</span>' + rt + emotes + '';

			document.body.appendChild(windowToggler);
			document.body.appendChild(emoteWindow);

			document.getElementById("GrEmBEmoteWindow" + id).addEventListener("click", function (evt) {
				return addEmote(evt, id);
			}, false);
			document.getElementById("closeEmoteWindow" + id).addEventListener("click", function (evt) {
				toggleEmoteWindow(evt, id, 1);
			}, false);
			if(getConf("defaultEmoteContainerMouseleave")) {
				var closeFunc = function (evt) {
						evt.stopPropagation();
						evt.cancelBubble = true;
						toggleEmoteWindow(evt, id, 1);
						if(currentForm) {
							currentForm.focus();
						}
						evt.preventDefault();
					}
				document.getElementById("GrEmBEmoteWindow" + id).addEventListener('mouseout', mouseEnter(closeFunc), false);
			}
			document.getElementById("GrEmBEmoteToggle" + id).addEventListener("mouseover", function (evt) {
				toggleEmoteWindow(evt, id);
			}, false);
			document.getElementById("GrEmBEmoteWindow" + id).addEventListener("mouseover", function (evt) {
				updateCurrentForm();
				return true;
			}, false);
		}

		function getDefaultEmoteHTML() {
			var lss = "font-size: 10pt; margin: 0; padding: 0; list-style: none !important;";
			var ls = lss + " display: inline-block !important; border: solid; border-width: 1px 1px 0 1px; margin: 0 0.15em 0 0;";
			var lsa = "padding: 0 0.15em;";
			var emotes = "";
                        var tabs = getConf('tabs');
                        if(tabs == null || tabs.length==0)
                        {
                            tabs = defaultConfs['tabs'];
                            setConf("tabs", tabs);
                        }
                    
                        //New Tab Loading
                        emotes = '<span id="GrEmBtablist"><ul class="GrEmBtabs" style="' + lss + '">';
                        for(var i=0; i<tabs.length; i++)
                        {
                            if(i == 0)
                                emotes += '<li style="' + ls + '" id="selected"><a style="' + lsa + '" href="#" tabID="'+i+'">'+tabs[i]+'</a></li>';
                            else
                                emotes += '<li style="' + ls + '"><a style="' + lsa + '" href="#" tabID="'+i+'">'+tabs[i]+'</a></li>';
                        }
                        emotes += '</ul></span>';

                    
                        for(var i = 0; i < tabs.length; i++)
                        {
                            if(i == 0)
                             emotes += "<div id='tab"+i+"' class='GrEmBEmoteList'>";
                            else
                             emotes += "<div id='tab"+i+"' class='GrEmBEmoteList closedTab'>";
                            
                            var loadedEmotes = getConf("tab"+i);
                            if(loadedEmotes != undefined)
                            {
                            for(var j = 0; j < loadedEmotes.length; j++)
                            {
                                emotes += "<tag style='cursor: pointer !important;'href='/"+loadedEmotes[j]+"' emoteID='"+loadedEmotes[j]+"' class='GrEmB_"+loadedEmotes[j]+"_'></tag>";
                            }
                            }
                            emotes += "</div>";
                        }

			return emotes;
		}

		var timeOutCounter = 60;
		var cssAr = getConf('csssstore');
		GM_registerMenuCommand('GrEmB - Clear CSS Cache', function () {
			setConf('csssstore', {});
                        setConf('tab-1');
                        for(var i = 0; i < 100; i++)
                        {
                            setConf('tab'+i);
                        }
			cssAr = {};
			window.location.reload();
		});
		GM_registerMenuCommand('GrEmB - Show debug window', function () {
			showDebugWindow();
		});
		GM_registerMenuCommand('GrEmB - Hide debug window', function () {
			hideDebugWindow();
		});
		var cssRun = true; //(/(?:www\.)?reddit\.com/i).test(window.location.href)||(document.getElementsByClassName("forceGrEmB")[0])||(/\[\]\(\/.*?\)/).test(document.body.innerHTML);
		var initRefresh = false;
		var doRefresh = false;
		if(getConf("displayUnknownEmotes")) {
			var emoteNames = getConf('emoteNames');
			if(!(emoteNames instanceof Array)) {
				emoteNames = defaultConfs['emoteNames'];
			}
		}
		var execAll = function (reg, string) {
				var match = null;
				var matches = new Array();
				while(match = reg.exec(string)) {
					matches.push(match[1]);
				}
				return matches;
			}
		var emoteNames_;
		unique = function (arr) {
			var o = {},
				i, l = arr.length,
				r = [];
			for(i = 0; i < l; i++) {
				o[arr[i]] = arr[i];
			}
			for(i in o) {
				r.push(o[i]);
			}
			return r;
		};
		var requiredStyles = 0;
		var loadedStyles = 0;
		var showDebugWindow = function () {
				if(document.getElementById("debugWindow")) {
					return;
				}
				var cssElem = document.createElement('div');
				cssElem.setAttribute('id', 'debugWindow');
				cssElem.setAttribute('style', 'd');
				var tmpp;
				cssElem.innerHTML = tmpp = "<a href=\"#\" id='debugWindowClose' style='text-decoration: underline; font-weight: bold;'>X</a><br />Debug info: <br /><textarea style=\"width: 98%;min-height:90%;max-height:95%\">" + ((JSON.stringify(GM_safeGetValue("confArray"))).replace(/\\n/g, "\n")) + "\n\n/**Emote Names:**/\n\n" + (JSON.stringify(emoteNames).replace(/\\n/g, "\n")) + "\n\n/**Emote Names_:**/\n\n" + "</textarea>";
				document.body.appendChild(cssElem);
				document.getElementById("debugWindowClose").addEventListener("click", hideDebugWindow);
			}
		var hideDebugWindow = function (evt) {
				var dbgWin = document.getElementById("debugWindow");
				if(dbgWin) {
					document.body.removeChild(dbgWin);
				}
				if(evt) {
					evt.cancelBubble = true;
					evt.stopPropagation();
					evt.preventDefault()
				}
			}
		var showNotice = getConf('justReset');
		if(showNotice){
			setConf('justReset', false);
		}
		var incLoadedStyles = function () {
				loadedStyles++;
				if(window.top === window && (getConf("displayReloadingNotice")||showNotice || window.location.host == "nallar.me")) {
					if(!document.getElementById("loadingNotice") && doRefresh) {
						var cssElem = document.createElement('div');
						cssElem.setAttribute('id', 'loadingNotice');
						document.body.appendChild(cssElem);
					}
					if(document.getElementById("loadingNotice") && doRefresh) {
						var ln = document.getElementById("loadingNotice");
						if(loadedStyles < requiredStyles) {
							ln.setAttribute('style', "");
							ln.innerHTML = "Reloading cached CSS - " + loadedStyles + "/" + requiredStyles;
						} else {
							ln.setAttribute('style', "visibility: hidden; display: none;");

						}
					}
					if(loadedStyles >= requiredStyles && doRefresh) {
						window.location.reload();
                                                doRefresh = false;
					}
				}
			}
		var doSave = 0;
    
    function eliminateDuplicates(arr) {
        var i,
            len=arr.length,
            out=[],
            obj={};
        
        for (i=0;i<len;i++) {
            obj[arr[i]]=0;
        }
        for (i in obj) {
            out.push(i);
        }
        return out;
    }
    
    function isPreloaded(subname)
    {
            //for(var i=0; i<subs.length; i++)
               //if(subs[i] == subname)
                   //return true;
        return false;
    }
    
    function isTab(subname)
    {
        var tablist = getConf('tabs');
        for(var i=0; i<tablist.length; i++)
            if(tablist[i] == subname)
                return true;
        return false;
    }
		var extractSubredditCSS = function (subname, doForce, urll, noParse, noLoad) {
				if(!cssRun && !doForce) {
					return;
				}
                                if(isPreloaded(subname) && !isTab(subname))
                                    return;
                                        
                                if(!isPreloaded(subname))
                                    requiredStyles++;
				var d = new Date();
				var cacheTime = cssAr[subname + "csstttt"];
				if(cacheTime === undefined) {
					cacheTime = 0;
				}
				if(!noParse) {
					var cacheData = cssAr[subname + "cssd"];
					if(cacheData === undefined) {
						cacheData = "";
					}
					addCSS(cacheData);
				} else if(!noLoad) {
					loadStyleSheet(urll);
				}
				if(!isPreloaded(subname) && ((!doRefresh && ((cacheTime + 28800000) > d.getTime()) && (cacheData || noParse)) || window.top != window)) {
					return incLoadedStyles();
				}
				if(subname != "MLPLounge" && !isPreloaded(subname)) {
					doRefresh = true;
				}
				if(!initRefresh && getConf("displayUnknownEmotes")) {
					initRefresh = true;
					emoteNames_ = emoteNames;
				}
				var tm = timeOutCounter;
				if(urll == undefined) {
					var urll = "http://reddit.com/r/" + subname + "/stylesheet.css?v=";
				} else {
					urll = urll + "?v=";
					tm = tm / 3;
				}
                                

				setTimeout(function () {
					GM_xmlhttpRequest({
						method: 'GET',
						url: urll + d.getTime(),
						headers: {
							'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey nallar.me/scripts/ GrEmB',
							'Accept': 'text/plain,text/html,text/css',
						},
						onload: function (res) {
							styles = false;
							if(!noParse) {
                                                            var tabNumber = -1;
                                                            var tablist = getConf('tabs');
                                                            for(var i=0; i<tablist.length; i++)
                                                                if(tablist[i] == subname)
                                                                    tabNumber = i;
                                                            var emoteCSS = res.responseText;//.replace(/\/\*(?:[^]+?)\*\//g, "");
                                                            var reg = /}a\[href\|?=\"\/([a-zA-Z0-9]*?)(?=(\"\]))/gi;
                                                            
                                                            emoteCSS = emoteCSS.replace(/}\r?\n?a/gi, "}a");
                                                            var matches = eliminateDuplicates(emoteCSS.match(reg));
                                                            if(tabNumber != -1 && tabNumber != null)
                                                            {   
                                                                if(matches == null)
                                                                    matches = [];
                                                                
                                                                var tab = getConf('tab'+tabNumber);
                                                                if(tab == null)
                                                                    tab = [];
                                                                for (i=0; i<matches.length; i++) {
                                                                    var matchEmote = matches[i];
                                                                    matchEmote = matchEmote.replace(/}a\[href\|?=\"\//g, "");
                                                                    
                                                                    //Check to ensure emote is not in other tabs
                                                                    var add = true;
                                                                    for (var tabLoop=0; tabLoop<=tabNumber; tabLoop++)
                                                                    {
                                                                       var tabTemp = getConf('tab'+tabLoop);
                                                                       if(tabTemp.indexOf(matchEmote) != -1)
                                                                           add = false;
                                                                    }
                                                                    if(add == true)
                                                                        tab.push(matchEmote);
                                                                }
                                                                setConf('tab'+tabNumber, tab);
                                                            }
                                                            //if(!isPreloaded(subname))
                                                            {
                                                            var tempText = res.responseText.replace(/\/\*(?:[^]+?)\*\//g, "");
								tempText = tempText.replace(/\s+/g, " ");
								tempText = tempText.replace(/a\[href[\^|]?\=['"]\/([a-zA-Z0-9_\-]+?)['"]\]/g,".GrEmB_$1_");
                                                            
								if(getConf("displayUnknownEmotes")) {
									emoteNames_ = emoteNames_.concat(execAll(/\.GrEmB_([0-9a-zA-Z]+)_/ig, tempText));
									emoteNames_ = unique(emoteNames_.concat(execAll(/a\[href[\*\^\|]?=['"]\/([^'"]+?)['"]/g, tempText)));
									setConf('emoteNames', emoteNames_, true);
									emoteNames = emoteNames_;
								}
                                                            }
							} else if(getConf("displayUnknownEmotes") ) {
								var tempText = res.responseText.replace(/\/\*(?:[^]+?)\*\//g, "");
								tempText = tempText.replace(/\s+/g, " ");
								emoteNames_ = emoteNames_.concat(execAll(/\.GrEmB_([0-9a-zA-Z]+)_/ig, tempText));
								emoteNames_ = unique(emoteNames_.concat(execAll(/a\[href[\*\^\|]?=['"]\/([^'"]+?)['"]/g, tempText)));
								setConf('emoteNames', emoteNames_, true);
								emoteNames = emoteNames_;
							}

							if(!noParse && !isPreloaded(subname)) {
								var styles = tempText.match(/a\[href[\*\^\|]?=['"]\/[^}]+}/g);
								if(styles == null){
									styles = tempText.match(/.GrEmB_[a-zA-Z0-9_\-]+?_[^}]+}/g);
								}else{
									styles = styles.concat(tempText.match(/.GrEmB_[a-zA-Z0-9_\-]+?_[^}]+}/g));
								}
							}
                                                        if(!isPreloaded(subname))
                                                        {
							var d1 = new Date();
							if(styles) {
								styles = styles.join(" ");
								styles = styles.replace(/\[href\=/g, "[href|=");
								cssAr[subname + "cssd"] = styles;
								addCSS(styles);
								showCSS();
							}
                                                
							console.log("ct < dt, got new for sn: " + subname + "\t" + cacheTime + "\t" + d.getTime());
							cssAr[subname + "csstttt"] = String((+d1.getTime()));
							if(doSave++ > 3 || loadedStyles >= (requiredStyles - 1)) {
								setConf('csssstore', cssAr);
                                                        }
                                                    return incLoadedStyles();
                                                }else
                                                {
                                                  return;
                                                }
                                                        
					
							
						}
					});
				}, tm);
                                if(!isPreloaded(subname))
                                    timeOutCounter += 2050;
			}
		debug(100, "adding CSS");

                //Load Tabs
                var tabs_ = getConf("tabs_");
                var tabArray = [];
                if(tabs_) {
				tabs_ = tabs_.split(",");
				for(var n in tabs_) {
					tabs_[n] = trim(tabs_[n]);
					//if(subs.indexOf(tabs_[n]) == -1) {
						tabArray.push(tabs_[n]);
					//}
				}
			}
                setConf("tabs", tabArray);
    
    
    
		sSection();
		if(cssRun) {
                        //if(getConf("manySubCSS"))
                            //extractSubredditCSS('manysubcss', false, mainStylesheet, true, true);
			var i = getConf("additionalSubreddits_");
                        
                        var j = getConf("tabs_");
                    
                        if(i)
                            i+=","+j;
                        else
                            i+=j;
                    
			if(i) {
				i = i.split(",");
				for(var n in i) {
					i[n] = trim(i[n]);
					//if(subs.indexOf(i[n]) == -1) {
						extractSubredditCSS(i[n]);
					//}
				}
			}
		}
		if(true) {
			if(cssRun || getConf("defaultEmoteContainerEverywhere")) {
				if(getConf('searchbarSpikeEverywhere') || (isReddit && getConf("searchbarSpike"))) {
					addCSS('#search input[type="text"] {background: url(http://thumbs.reddit.com/t5_2s8bl_4.png) top left no-repeat !important; padding: 13px 2px 13px 50px !important;height: 22px !important; width: 245px !important}');
				}
				if((/\/r\/MLPLounge/i).test(window.location.href)) {
					//extractSubredditCSS("MLPLounge");
					addCSS('code{font-family: monospace !important;} ');
					/*addCSS('pre code {font-family: "arial,sans-serif"}');*/
				}
				addCSS('.commentNavSortType{display: inline-block !important;} .md a{max-width: none !important; max-height: none !important;}.md{overflow-y: hidden !important; ' + (getConf("wideReddit") ? 'max-width: none !important;' : '') + '} #loadingNotice {text-align: center; font-size: 30px;width: 500px;top:50px; margin: 0 auto; position: fixed;border: 1px solid blue; background-color: white; margin-top: 36px; z-index: 9999999999;left: 75%;margin-left: -250px;}#debugWindow {top: 5%;width: 80%;height: 90%;margin: 0 auto; position: fixed;border: 1px solid blue; background-color: white; z-index: 9999999999;left: 10%;} .GrEmBWindow{height: auto !important; width: auto !important;' + getConf("emoteManagerWindowStyle") + "}\n\n"); //don't want a broken user-emote list breaking everything!
				addCSS('.closedWindow{visibility: hidden !important;}.closedTab{display: none !important;}.GrEmBEmoteList{overflow-y: scroll !important; overflow-x: hidden; height: ' + (getConf("defaultEmoteContainerHeight") - 22) + 'px; width: ' + (getConf("defaultEmoteContainerWidth") - 2) + 'px;} .GrEmBEmoteList a{cursor: pointer;} .GrEmB_unknownEmote{font-family: monospace; font-size: small !important;word-wrap: break-word !important; color:rgb(255,255,255) !important;cursor:text !important;background-color:rgb(105,105,120) !important;display:block;clear:none;float:left;width:50px;height:50px;}.GrEmB_largeUnknown{width:70px;height:70px;}.GrEmBTitleText{font-size: 12.5pt; font-style: bold;} .convertedEmote_{cursor: text !important;}');
			}
			addCSS('.SuperRedditAltTextDisplay_Text {color: gray !important; word-wrap: break-word !important;} .SuperRedditAltTextDisplay_Text a {color: gray !important; text-decoration:underline !important;}.GlobalEmoteAltTextDisplay_Text {color: gray; word-wrap: break-word; display:inline-block}.GlobalEmoteAltTextDisplay_Text a {color: gray; text-decoration:underline; display:inline-block}');
			if(cssRun) {
				if(getConf("nsfwDefunctEmotes")) {
					extractSubredditCSS('nsfwcss', false, 'http://nallar.me/scripts/nsfw.min.css', true);
				}
				if(isReddit) {
					addCSS("img a{-ms-interpolation-mode: nearest-neighbor; image-rendering: -moz-crisp-edges; image-rendering: -webkit-optimize-contrast; } a[href^='/'][href*='-blink!']{text-decoration:blink !important}a[href^='/'][href*='-comicsans!']{font-family:'Comic-Sans MS',cursive}a[href^='/'][href*='-impact!']{font-family:Impact,Charcoal,sans-serif}a[href^='/'][href*='-tahoma!']{font-family:Tahoma,Geneva,sans-serif}a:hover[href^='/'][href*='-r-'][href*='-d-'],a:hover[href^='/'][href$='-r'][href$='-d']{-moz-transform:rotate(0deg)scaleX(1);-o-transform:rotate(0deg)scaleX(1);-webkit-transform:rotate(0deg)scaleX(1);image-rendering:-moz-crisp-edges;}a[href^='/'][href*='-45'],a:hover[href^='/'][href*='-45'][href*='-r'][href*='-d']{-moz-transform:rotate(45deg)scaleX(1);-o-transform:rotate(45deg)scaleX(1);-webkit-transform:rotate(45deg)scaleX(1)}a[href^='/'][href*='-90'],a:hover[href^='/'][href*='-90'][href*='-r'][href*='-d']{-moz-transform:rotate(90deg)scaleX(1);-o-transform:rotate(90deg)scaleX(1);-webkit-transform:rotate(90deg)scaleX(1);image-rendering:-moz-crisp-edges;}a[href^='/'][href*='-135'],a:hover[href^='/'][href*='-135'][href*='-r'][href*='-d']{-moz-transform:rotate(135deg)scaleX(1);-o-transform:rotate(135deg)scaleX(1);-webkit-transform:rotate(135deg)scaleX(1);}a[href^='/'][href*='-180'],a:hover[href^='/'][href*='-180'][href*='-r'][href*='-d']{-moz-transform:rotate(180deg)scaleX(1);-o-transform:rotate(180deg)scaleX(1);-webkit-transform:rotate(180deg)scaleX(1);image-rendering:-moz-crisp-edges;}a[href^='/'][href*='-225'],a:hover[href^='/'][href*='-225'][href*='-r'][href*='-d']{-moz-transform:rotate(225deg)scaleX(1);-webkit-transform:rotate(225deg)scaleX(1);-o-transform:rotate(225deg)scaleX(1);}a[href^='/'][href*='-270'],a:hover[href^='/'][href*='-270'][href*='-r'][href*='-d']{-moz-transform:rotate(270deg)scaleX(1);-o-transform:rotate(270deg)scaleX(1);-webkit-transform:rotate(270deg)scaleX(1);image-rendering:-moz-crisp-edges;}a[href^='/'][href*='-315'],a:hover[href^='/'][href*='-315'][href*='-r'][href*='-d']{-moz-transform:rotate(315deg)scaleX(1);-o-transform:rotate(315deg)scaleX(1);-webkit-transform:rotate(315deg)scaleX(1);}a[href^='/'][href*='-r'],a:hover[href^='/'][href*='-d']{-moz-transform:rotate(0deg)scaleX(-1);-o-transform:rotate(0deg)scaleX(-1);-webkit-transform:rotate(0deg)scaleX(-1);image-rendering:-moz-crisp-edges;}a[href^='/'][href*='-45'][href*='-r'],a:hover[href^='/'][href*='-45'][href*='-d']{-moz-transform:rotate(45deg)scaleX(-1);-o-transform:rotate(45deg)scaleX(-1);-webkit-transform:rotate(45deg)scaleX(-1)}a[href^='/'][href*='-90'][href*='-r'],a:hover[href^='/'][href*='-90'][href*='-d']{-moz-transform:rotate(90deg)scaleX(-1);-o-transform:rotate(90deg)scaleX(-1);-webkit-transform:rotate(90deg)scaleX(-1);image-rendering:-moz-crisp-edges;}a[href^='/'][href*='-135'][href*='-r'],a:hover[href^='/'][href*='-135'][href*='-d']{-moz-transform:rotate(135deg)scaleX(-1);-webkit-transform:rotate(135deg)scaleX(-1);-o-transform:rotate(135deg)scaleX(-1);}a[href^='/'][href*='-180'][href*='-r'],a:hover[href^='/'][href*='-180'][href*='-d']{-moz-transform:rotate(180deg)scaleX(-1);-o-transform:rotate(180deg)scaleX(-1);-webkit-transform:rotate(180deg)scaleX(-1);image-rendering:-moz-crisp-edges;}a[href^='/'][href*='-225'][href*='-r'],a:hover[href^='/'][href*='-225'][href*='-d']{-moz-transform:rotate(225deg)scaleX(-1);-o-transform:rotate(225deg)scaleX(-1);-webkit-transform:rotate(225deg)scaleX(-1);}a[href^='/'][href*='-270'][href*='-r'],a:hover[href^='/'][href*='-270'][href*='-d']{-moz-transform:rotate(270deg)scaleX(-1);-o-transform:rotate(270deg)scaleX(-1);-webkit-transform:rotate(270deg)scaleX(-1);image-rendering:-moz-crisp-edges;}a[href^='/'][href*='-315'][href*='-r'],a:hover[href^='/'][href*='-315'][href*='-d']{-moz-transform:rotate(315deg)scaleX(-1);-o-transform:rotate(315deg)scaleX(-1);-webkit-transform:rotate(315deg)scaleX(-1);}a[href^='/'][href*='-225'][href*='-f'][href*='-r'],a:hover[href^='/'][href*='-225'][href*='-f'][href*='-d']{-moz-transform:rotate(45deg)scaleX(1);-webkit-transform:rotate(45deg)scaleX(1);-o-transform:rotate(45deg)scaleX(1)}a[href^='/'][href*='-270'][href*='-f'][href*='-r'],a:hover[href^='/'][href*='-270'][href*='-f'][href*='-d']{-moz-transform:rotate(90deg)scaleX(1);-webkit-transform:rotate(90deg)scaleX(1);-o-transform:rotate(90deg)scaleX(1);image-rendering:-moz-crisp-edges;}a[href^='/'][href*='-315'][href*='-f'][href*='-r'],a:hover[href^='/'][href*='-315'][href*='-f'][href*='-d']{-moz-transform:rotate(135deg)scaleX(1);-webkit-transform:rotate(135deg)scaleX(1);-o-transform:rotate(135deg)scaleX(1)}a[href^='/'][href*='-f'][href*='-r'],a:hover[href^='/'][href*='-f'][href*='-d']{-moz-transform:rotate(180deg)scaleX(1);-webkit-transform:rotate(180deg)scaleX(1);-o-transform:rotate(180deg)scaleX(1);image-rendering:-moz-crisp-edges;}a[href^='/'][href*='-45'][href*='-f'][href*='-r'],a:hover[href^='/'][href*='-45'][href*='-f'][href*='-d']{-moz-transform:rotate(225deg)scaleX(1);-webkit-transform:rotate(225deg)scaleX(1);-o-transform:rotate(225deg)scaleX(1)}a[href^='/'][href*='-90'][href*='-f'][href*='-r'],a:hover[href^='/'][href*='-90'][href*='-f'][href*='-d']{-moz-transform:rotate(270deg)scaleX(1);-webkit-transform:rotate(270deg)scaleX(1);-o-transform:rotate(270deg)scaleX(1);image-rendering:-moz-crisp-edges;}a[href^='/'][href*='-135'][href*='-f'][href*='-r'],a:hover[href^='/'][href*='-135'][href*='-f'][href*='-d']{-moz-transform:rotate(315deg)scaleX(1);-webkit-transform:rotate(315deg)scaleX(1);-o-transform:rotate(315deg)scaleX(1)}a[href^='/'][href*='-225'][href*='-f'],a:hover[href^='/'][href*='-225'][href*='-f'][href*='-r'][href*='-d']{-moz-transform:rotate(45deg)scaleX(-1);-webkit-transform:rotate(45deg)scaleX(-1);-o-transform:rotate(45deg)scaleX(-1)}a[href^='/'][href*='-270'][href*='-f'],a:hover[href^='/'][href*='-270'][href*='-f'][href*='-r'][href*='-d']{-moz-transform:rotate(90deg)scaleX(-1);-webkit-transform:rotate(90deg)scaleX(-1);-o-transform:rotate(90deg)scaleX(-1);image-rendering:-moz-crisp-edges;}a[href^='/'][href*='-315'][href*='-f'],a:hover[href^='/'][href*='-315'][href*='-f'][href*='-r'][href*='-d']{-moz-transform:rotate(135deg)scaleX(-1);-webkit-transform:rotate(135deg)scaleX(-1);-o-transform:rotate(135deg)scaleX(-1)}a[href^='/'][href*='-f'],a:hover[href^='/'][href*='-f'][href*='-r'][href*='-d']{-moz-transform:rotate(180deg)scaleX(-1);-o-transform:rotate(180deg)scaleX(-1);-webkit-transform:rotate(180deg)scaleX(-1);image-rendering:-moz-crisp-edges;}a[href^='/'][href*='-45'][href*='-f'],a:hover[href^='/'][href*='-45'][href*='-f'][href*='-r'][href*='-d']{-moz-transform:rotate(225deg)scaleX(-1);-o-transform:rotate(225deg)scaleX(-1);-webkit-transform:rotate(225deg)scaleX(-1)}a[href^='/'][href*='-90'][href*='-f'],a:hover[href^='/'][href*='-90'][href*='-f'][href*='-r'][href*='-d']{-moz-transform:rotate(270deg)scaleX(-1);-o-transform:rotate(270deg)scaleX(-1);-webkit-transform:rotate(270deg)scaleX(-1);image-rendering:-moz-crisp-edges;}a[href^='/'][href*='-135'][href*='-f'],a:hover[href^='/'][href*='-135'][href*='-f'][href*='-r'][href*='-d']{-moz-transform:rotate(315deg)scaleX(-1);-o-transform:rotate(315deg)scaleX(-1);-webkit-transform:rotate(315deg)scaleX(-1)}a:hover[href^='/'][href$='-rd']{-moz-transform:rotate(0deg)scaleX(1);-o-transform:rotate(0deg)scaleX(1);-webkit-transform:rotate(0deg)scaleX(1);image-rendering:-moz-crisp-edges;}a[href^='/'][href$='-90d'],a:hover[href^='/'][href$='-90rd']{-moz-transform:rotate(90deg)scaleX(1);-o-transform:rotate(90deg)scaleX(1);-webkit-transform:rotate(90deg)scaleX(1);image-rendering:-moz-crisp-edges;}a[href^='/'][href$='-180d'],a:hover[href^='/'][href$='-fd']{-moz-transform:rotate(180deg)scaleX(1);-o-transform:rotate(180deg)scaleX(1);-webkit-transform:rotate(180deg)scaleX(1);image-rendering:-moz-crisp-edges;}a[href^='/'][href$='-270d'],a:hover[href^='/'][href$='-270rd']{-moz-transform:rotate(270deg)scaleX(1);-o-transform:rotate(270deg)scaleX(1);-webkit-transform:rotate(270deg)scaleX(1);image-rendering:-moz-crisp-edges;}a[href^='/'][href$='-rd']{-moz-transform:rotate(0deg)scaleX(-1);-o-transform:rotate(0deg)scaleX(-1);-webkit-transform:rotate(0deg)scaleX(-1);image-rendering:-moz-crisp-edges;}a[href^='/'][href$='-90r'],a[href^='/'][href$='-90rd'],a:hover[href^='/'][href$='-90d']{-moz-transform:rotate(90deg)scaleX(-1);-o-transform:rotate(90deg)scaleX(-1);-webkit-transform:rotate(90deg)scaleX(-1);image-rendering:-moz-crisp-edges;}a[href^='/'][href$='-fd'],a:hover[href^='/'][href$='-180d']{-moz-transform:rotate(180deg)scaleX(-1);-o-transform:rotate(180deg)scaleX(-1);-webkit-transform:rotate(180deg)scaleX(-1);image-rendering:-moz-crisp-edges;}a[href^='/'][href$='-270r'],a[href^='/'][href$='-270rd'],a:hover[href^='/'][href$='-270d']{-moz-transform:rotate(270deg)scaleX(-1);-o-transform:rotate(270deg)scaleX(-1);-webkit-transform:rotate(270deg)scaleX(-1);image-rendering:-moz-crisp-edges;}a[href='/sp']{display:inline-block;padding-right:100%}");
				}

				if(!getConf("disableEmoteSpin")) {
					addCSS('a[href*=-spin-],  a[href$=-spin]{ -moz-transform-style: flat; -moz-animation: spin 2s infinite ease; -moz-transform: translateZ(-360px) rotateX(360deg); -webkit-transform-style: flat; -webkit-animation: spin 2s infinite ease; -webkit-transform: translateZ(-360px) rotateX(360deg);}a[href*=-ispin-], a[href$=-ispin] { -moz-transform-style: flat; -moz-animation: ispin 2s infinite linear; -moz-transform: translateZ(-360px) rotateX(360deg); -webkit-transform-style: flat; -webkit-animation: ispin 2s infinite linear; -webkit-transform: translateZ(-360px) rotateX(360deg);} a[href*=-yspin] {-moz-transform: translateZ(50px); -moz-transform-style: flat; -moz-animation: yspin 2s infinite linear; -webkit-transform: translateZ(50px); -webkit-transform-style: flat; -webkit-animation: yspin 2s infinite linear;} a[href*=-xspin] {-moz-transform-style: flat; -moz-transform: rotateX(0deg); -moz-animation: xspin 2s infinite ease; -webkit-transform: rotateX(0deg); -webkit-transform-style: flat; -webkit-animation: xspin 2s infinite ease;}a[href*=-rotate-], a[href$=-rotate] { -moz-transform-style: flat; -moz-animation: rotate 2s infinite ease; -moz-transform: translateZ(0px) rotateX(0deg); -webkit-transform-style: flat; -webkit-animation: rotate 2s infinite ease;}a[href*=-rrotate] { -moz-transform-style: flat; -moz-animation: rrotate 2s infinite ease; -moz-transform: translateZ(0px) rotateX(0deg); -webkit-transform-style: flat; -webkit-animation: rotater 2s infinite ease;}a[href*=-lrotate] { -moz-transform-style: flat; -moz-animation: lrotate 2s infinite linear; -moz-transform: translateZ(0px) rotateX(0deg); -webkit-transform-style: flat; -webkit-animation: rotatel 2s infinite linear;}a[href*=-lrrotate] { -moz-transform-style: flat; -moz-animation: lrrotate 2s infinite linear; -moz-transform: translateZ(0px) rotateX(0deg); -webkit-transform-style: flat; -webkit-animation: rotatelr 2s infinite linear;}@-moz-keyframes xspin { from { -moz-transform: rotateX(0deg);} to { -moz-transform: rotateX(360deg); } }@-webkit-keyframes spin { from { -webkit-transform: rotateY(0) translateZ(0px) rotateX(0deg);} to {-webkit-transform: rotateY(360deg) translateZ(100px) rotateX(360deg); } }@-webkit-keyframes ispin { from { -webkit-transform: rotateY(0) translateZ(0px) rotateX(0deg);} to { -webkit-transform: rotateY(360deg) translateZ(100px) rotateX(360deg); } }@-moz-keyframes spin { from { -moz-transform: rotateY(0) translateZ(0px) rotateX(0deg);} to {-moz-transform: rotateY(360deg) translateZ(100px) rotateX(360deg); } }@-webkit-keyframes xspin { from { -webkit-transform: rotateX(0deg);} to { -webkit-transform: rotateX(360deg); } }@-moz-keyframes ispin { from { -moz-transform: rotateY(0) translateZ(0px) rotateX(0deg);} to { -moz-transform: rotateY(360deg) translateZ(100px) rotateX(360deg); } }@-webkit-keyframes yspin { from { -webkit-transform: rotateY(0)} to { -webkit-transform: rotateY(360deg);} }@-moz-keyframes yspin { from { -moz-transform: rotateY(0)} to { -moz-transform: rotateY(360deg);} }@-moz-keyframes rotate { from { -moz-transform: rotate(0deg);} to {-moz-transform: rotate(360deg); } }@-moz-keyframes rrotate { from { -moz-transform: rotate(0deg);} to {-moz-transform: rotate(-360deg); } }@-moz-keyframes lrotate { from { -moz-transform: rotate(0deg);} to {-moz-transform: rotate(360deg); } }@-moz-keyframes lrrotate { from { -moz-transform: rotate(0deg);} to {-moz-transform: rotate(-360deg); } }@-webkit-keyframes rotate { from { -webkit-transform: rotate(0deg);} to {-webkit-transform: rotate(360deg); } }@-webkit-keyframes rotater { from { -webkit-transform: rotate(0deg);} to {-webkit-transform: rotate(-360deg); } }@-webkit-keyframes rotatel { from { -webkit-transform: rotate(0deg);} to {-webkit-transform: rotate(360deg); } }@-webkit-keyframes rotatelr { from { -webkit-transform: rotate(0deg);} to {-webkit-transform: rotate(-360deg); } }');
				}
				addCSS("a[href$='-i']{ -o-filter: invert(); -moz-filter: invert();-webkit-filter: hue-rotate(190deg) !important;} a[href*='-inp-'], a[href$='-inp']{ float: none !important; display: inline-block !important;}");

				addCSS('a[href="/sbf"], a[href="/rsbf"] {display: block; clear:none; float:left; background-image: url(http://i.imgur.com/baE1o.png); width: 80px; height: 66px;} a[href="/crossfire"], a[href="/rcrossfire"] {display: block; clear:none; float:left; background-image: url(http://i.imgur.com/RhMfk.png); width: 180px; height: 125px;} a[href="/rcrossfire"], a[href="/rsbf"] { -moz-transform: scaleX(-1); -webkit-transform: scaleX(-1); -o-transform: scaleX(-1); }');

				if(getConf("rbText")) {
					addCSS('.rainbowTextMod{-webkit-background-clip: text;color: white;-webkit-text-fill-color: transparent;background-color:#FFFFFF;background-image: -webkit-gradient(linear,left top,right top,from(#ea8711), to(#d96363));background-image: -webkit-linear-gradient(left,#ea8711,#d96363,#73a6df,#9085fb,#52ca79); background-image: -moz-linear-gradient(left,#ea8711,#d96363,#73a6df,#9085fb,#52ca79);background-image: -ms-linear-gradient(left,#ea8711,#d96363,#73a6df,#9085fb,#52ca79); background-image: -o-linear-gradient(left,#ea8711,#d96363,#73a6df,#9085fb,#52ca79);} a.author[href$="/nallar"],a[href$="-RB"],a[href$="-RB/"],a[href*="_rbtxt"],a.author[href$="/IllusionOf_Integrity"],a.author[href$="/RainbowCrah"],a.author[href$="/Chinch335"],a.author[href$="/Orschmann"],a.author[href$="/optimistic_outcome"],a.author[href$="/yagi_takeru"],a.author[href$="/The_velour_Fog"],a.author[href$="/cheesemoo"],a.author[href$="/Speedingturtle"],a.author[href$="/trypsonite"],a.author[href$="/andysonic2"],a.author[href$="Lebal"],a.author[href$="megadeus"],a.author[href$="RainbowCrash"],a.author[href$="/derram"],a.author[href$="/EvilHom3r"]{-moz-background-clip: text; -moz-text-fill-color: transparent; -webkit-background-clip: text;color: white;-webkit-text-fill-color: transparent;background-color:#FFFFFF;background-image: -webkit-gradient(linear,left top,right top,from(#ea8711), to(#d96363));background-image: -webkit-linear-gradient(left,#ea8711,#d96363,#73a6df,#9085fb,#52ca79);}a[href$="-RB"],a[href$="-RB/"]{cursor: none !important;} ');
				}
			}
		}

		showCSS();
		debug(100, "added CSS: " + endSection());

		function getTextNodesIn(node) { //thanks again, stack overflow! http://stackoverflow.com/questions/298750/how-do-i-select-text-nodes-with-jquery , second part of first answer.
			function getTextNodes(node) {
				if(node.nodeType == 3) {
					textNodeEmoteParser(node);
				} else {
					for(var i = 0, len = node.childNodes.length; i < len; ++i) {
						if(node.childNodes[i].tagName == "TEXTAREA") {
							continue;
						}
						getTextNodes(node.childNodes[i]);
					}
				}
			}

			getTextNodes(node);
		}
		var emoteMatchRegExp = /\[\]\(\/(r??(?:[_!a-zA-Z0-9\-]{0,40}?)(?:-f|-d|-rd|-rf|-90|-180|-270|-i)?)[ ]?(?:\"([^<>"\)\(\n]+?)\")?\)/i;

		function textNodeEmoteParser(text) {
			if(text.emotesConverted) {
				return;
			}
			text.emotesConverted = true;
			var v = emoteMatchRegExp.exec(text.nodeValue);
			if(!v) {
				return;
			}
			var pos = v['index'];
			v[1] = v[1].toLowerCase();
			if(!getConf("nsfwMLAS1Emotes")) {
				var t = v[1];
				if(t.search("-") != -1) {
					t = t.substr(0, t.search("-"));
				}
				if(t == "z11" || t == "horseporn" || (/(yy)[0-9][0-9]/).test(t)) {
					return;
				}
			}

			var beforeNode = text.splitText(pos);
			beforeNode.nodeValue = beforeNode.nodeValue.replace(/\[\]\(\/r??([_!a-zA-Z0-9\-]{0,41}?)[ ]?(?:\"([^"\)\(\n]+?)\")?\)/, "");
			var v2 = v[1].match(/r?(freakout|bounce|discorddance|twijoy)/);
			if(v2) {
				var url = '';
				switch(v2[1]) {
				case 'freakout':
					url = 'http://i.imgur.com/QYghO.gif';
					break;
				case 'bounce':
					url = 'http://i.imgur.com/3zylF.gif';
					break;
				case 'discorddance':
					url = 'http://i.imgur.com/1e5va.jpg';
					break;
				case 'twijoy':
					url = 'http://i.imgur.com/sRfjd.gif';
					break;
				default:
					getTextNodesIn(text.parentNode);
					return;
				}
				var emoteElement = document.createElement('img');
				if(!getConf("emoteManagerRedditStyle")) {
					emoteElement.setAttribute('style', 'display: inline-block !important; float: none !important;');
				} else {
					emoteElement.setAttribute('style', 'display: block !important; float: left !important;');
				}
				if(v[2]) {
					emoteElement.setAttribute('title', v[2])
				}
				emoteElement.setAttribute('src', url);
				beforeNode.parentNode.insertBefore(emoteElement, beforeNode);
			} else {
				var emoteElement = document.createElement('a');
				emoteElement.setAttribute('href', '/' + v[1])
				if(!getConf("emoteManagerRedditStyle")) {
					emoteElement.setAttribute('style', 'display: inline-block !important; float: none !important;');
				}
				if(v[2]) {
					emoteElement.setAttribute('title', v[2])
				}
				emoteElement.setAttribute('class', 'convertedEmote');
				beforeNode.parentNode.insertBefore(emoteElement, beforeNode);
				if(v[2] && getConf("revealAltText")) {
					expandConvertedEmotes(emoteElement);
				}
			}
			textNodeEmoteParser(beforeNode);
		}

		var goEmote = true;

		function convertDefaultGlobalEmotes(target) {
			if(!goEmote) {
				return;
			}
			if(!getConf("emoteManagerEverywhere")) {
				return;
			}
			if(target == null || isReddit || !(/\[\]\(\/.*?\)/).test(target.innerHTML)) {
				return;
			}
			debug(102, "Converting globally");
			goEmote = false;
			var style = "";
			if(!getConf("emoteManagerRedditStyle")) {
				style = ' style="display: inline-block !important; float: none !important;"';
			}
			getTextNodesIn(target);
			goEmote = true;
		}

		//PAST THIS POINT IS MOSTLY ArbitraryEntity's code!
		var linkRegex = new RegExp("\\b(?:(http(?:s?)\://)|(?:www\\d{0,3}[.])|(?:[a-z0-9.\-]+[.][a-z]{2,4}/))(?:\\S*)\\b", "i")

		function inBlacklist(theLink) {
				if(theLink.href.substr(-2, 2) == "/b") { // Don't expand the spoiler tags from r/gameofthrones
					return true;
				}
				if(theLink.href.substr(-2, 2) == "/s") { // Don't expand the spoiler tags from r/falloutequestria
					return true;
				}
				if(theLink.href.substr(-8, 8) == "/spoiler") { // Don't expand alt-text on spoiler tags from r/mylittlepony
					return true;
				}
				return false;
			}

		var goExpand = true;

		function expandConvertedEmotes(anchor, onReddit) {
			if(!goExpand || !getConf("revealAltText")) {
				return;
			}
			goExpand = false;
			var innerLinks = new Array(anchor);
			var j = 0;
			if(innerLinks[j].title && innerLinks[j].title != " " && !inBlacklist(innerLinks[j]) && innerLinks[j].className.indexOf("emoteTextExpanded") == -1) {
				var altText = innerLinks[j].title

				var theDiv = document.createElement("div")
				if(onReddit) {
					theDiv.setAttribute("class", "SuperRedditAltTextDisplay_Text");
				} else {
					theDiv.setAttribute("class", "GlobalEmoteAltTextDisplay_Text");
				}
				if((/(?:-inp-|-inp$)/).test(innerLinks[j].href)) {
					theDiv.setAttribute("style", "display: inline-block !important;");
				}
				while(altText) {
					linkResult = linkRegex.exec(altText)
					if(linkResult) {
						theDiv.appendChild(document.createTextNode(altText.substr(0, linkResult.index)))
						var newLinkElement = document.createElement("a")
						if(linkResult[1]) {
							newLinkElement.href = linkResult[0]
						} else {
							newLinkElement.href = "http://" + linkResult[0]
						}
						newLinkElement.appendChild(document.createTextNode(linkResult[0]))
						theDiv.appendChild(newLinkElement)
						altText = altText.substr(linkResult.index + linkResult[0].length)
					} else {
						theDiv.appendChild(document.createTextNode(altText))
						altText = ""
					}
				}

				var linkNextSibling = innerLinks[j].nextSibling
				innerLinks[j].parentNode.insertBefore(theDiv, linkNextSibling)
				innerLinks[j].setAttribute("class", innerLinks[j].className + " emoteTextExpanded");
			}
			goExpand = true;
		}

		// hasClass, stolen from the Reddit Enhancement Suite
		function hasClass(ele, cls) {
			if((typeof (ele) == 'undefined') || (ele == null) || ele.className === undefined) {
				//console.log(arguments.callee.caller);
				return false;
			}
			return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
		}

		//END ArbitraryEntity's code!
		function fixHomePageNSFW(target) {
			if(!isReddit) {
				return;
			}
			var elements = target.getElementsByClassName("over18");
			for(var el in elements) {
				var e = elements[el];
				if(!e.getElementsByClassName) {
					continue;
				}
				if(e.getElementsByClassName('subreddit')[0] && (/mylittlepony/).test(e.getElementsByClassName('subreddit')[0].innerHTML)) {
					e.getElementsByClassName('nsfw-stamp')[0].setAttribute('style', 'display: none !important;');
					if(e.getElementsByClassName('thumbnail')[0]) {
						e.getElementsByClassName('thumbnail')[0].setAttribute('style', 'background-image: url(\'http://i.imgur.com/t4HvY.png\'); background-size: 70px 50px; background-position: 0 0; height: 50px; background-repeat: no-repeat;');
					}
				};

			}
		}

		var stopExp = false;
		var goFind = true;
		var clickBlock = function (evt) {
				var anchor = evt.target;
				if(anchor && anchor.href && anchor.innerHTML == "") {
					var href = (/\/([a-zA-Z0-9]+)(-[^\/]+?)?$/).exec(anchor.href);
					if(href && (emoteNames.indexOf(href[1]) != -1 || hasClass(anchor, "convertedEmote"))) {
						evt.cancelBubble = true;
						evt.preventDefault();
						evt.stopPropagation();
					}
				}
			}
		var domInsertFunction = function (evt) {
				if(!goFind) {
					return;
				}
				goFind = false;
				if(evt.target.getElementsByTagName) {
					if(goEmote) {
						convertDefaultGlobalEmotes(evt.target);
					};
					var dispUn = getConf("displayUnknownEmotes");
					if((dispUn || getConf("revealAltText"))) {
						sSection();
						document.addEventListener("click", clickBlock, false);
						if(isReddit) {
							var msgs = evt.target.getElementsByClassName("md");
							if(msgs.length == 0 && (evt.target !== document.body)) {
								msgs = [];
								msgs[0] = evt.target;
							}
							var len;
							for(var j = 0, len = msgs.length; j < len; j++) {
								var elems = msgs[j].getElementsByTagName("A");
								for(var i in elems) {
									if(!elems[i] || !elems[i].href || (/(?:^|\s)convertedEmote(?:\s|$)/).test(elems[i].className)) {
										continue;
									}
									var hrefs = elems[i].href;
									elems[i].setAttribute("class", elems[i].className + " convertedEmote");
									var hrefss = (/https?:\/\/([^\/]+?)\/([a-zA-Z0-9_!]+)(-[^\/]+?)?$/).exec(hrefs);
									if(!hrefss) {
										continue;
									}
									var href = hrefss[2];
									if(hrefss[1] != window.location.host) {
										continue;
									}
									elems[i].setAttribute("class", elems[i].className + " convertedEmote_");
									var res = (/[0-9a-zA-Z_!]+?(?:-(.+?))?-pl_(.+)$/).exec(hrefs);
									if(res != null) {
										href = res[2];
										elems[i].href = "/" + href + ((res[1] == undefined) ? "" : ("-" + res[1]));
									}

									if(elems[i].clientWidth == 0 && elems[i].textContent == "" && getConf("displayUnknownEmotes") && !hasClass(elems[i], "GrEmB_unnknownEmote") && (emoteNames.indexOf(href) == -1)&&!doRefresh) {
										elems[i].innerHTML = "/" + href + ((hrefss[3] != undefined) ? hrefss[3] : "");
										elems[i].setAttribute("class", elems[i].className + " GrEmB_unknownEmote");
										if(href.length > 20) {
											elems[i].setAttribute("class", elems[i].className + " GrEmB_largeUnknown");
										}
										elems[i].href = "/" + href;
									} else if((/^[\-a-zA-Z0-9_][\-a-zA-Z0-9_]*$/).test(href)) {
										elems[i].setAttribute("class", elems[i].className + " GrEmB_" + href + "_");
									}
									if(elems[i].title) {
										expandConvertedEmotes(elems[i], true);
									}

								}
							}
						} else {
							var elems = evt.target.getElementsByClassName("convertedEmote");
							for(var i in elems) {
								if(!elems[i] || !elems[i].href || (/(?:^|\s)convertedEmote_(?:\s|$)/).test(elems[i].className)) {
									continue;
								}
								var hrefs = elems[i].href;
								var hrefss = RegExp(/https?:\/\/([^\/]+?)\/([a-zA-Z0-9_!]+)(?:-[^\/]+?)?$/).exec(hrefs);
								if(!hrefss) {
									continue;
								}
								var href = hrefss[2];
								if(hrefss[1] != window.location.host) {
									continue;
								}
								elems[i].setAttribute("class", elems[i].className + " convertedEmote_");
								if(elems[i].clientWidth == 0 && elems[i].textContent == "" && getConf("displayUnknownEmotes") && (emoteNames.indexOf(href) == -1)&&!doRefresh) {
									elems[i].innerHTML = "/" + href + ((hrefss[3] != undefined) ? hrefss[3] : "");
									elems[i].setAttribute("class", elems[i].className + " GrEmB_unknownEmote");
									if(href.length > 20) {
										elems[i].setAttribute("class", elems[i].className + " GrEmB_largeUnknown");
									}
								} else if((/^[\-a-zA-Z0-9_]+$/).test(href)) {
									elems[i].setAttribute("class", elems[i].className + " GrEmB_" + href + "_");
								}
							}
						}
						debug(100, "end find: " + endSection());
					}
				}
				goFind = true;
			};
		var ranInitial = false;
		initialEmotePass = function () {
			if(ranInitial) {
				return;
			}
			ranInitial = true;
			fixHomePageNSFW(document.body);
			domInsertFunction({
				target: document.body
			});
		};
		var createDefWindow = function () {
				if(getConf("defaultEmoteContainer") && (getConf("defaultEmoteContainerEverywhere") || isReddit)) {
					createEmoteWindow(0, getConf("defaultEmoteContainerSide") ? "left" : "right", getConf("defaultEmoteContainerX"), getConf("defaultEmoteContainerY"), (getConf("defaultEmoteContainerOnTop") || !isReddit) ? 99999 : 1, getConf("defaultEmoteContainerWidth"), getConf("defaultEmoteContainerHeight"), getDefaultEmoteHTML(), ((!getConf("emoteText")) ? "Emotes" : ""));
				}
			};
		properOnLoadEvent_(createDefWindow);
		properOnLoadEvent_(initialEmotePass);

		document.addEventListener('DOMNodeInserted', domInsertFunction);
		document.addEventListener('DOMNodeInsertedIntoDocument', domInsertFunction);
	};

function loadStyleSheet(filename) {
	var fileref = document.createElement("link");
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", filename);
	document.getElementsByTagName("head")[0].insertBefore(fileref, document.getElementsByTagName("head")[0].firstChild);
}
var addedMain = false;
properOnLoadEvent_(function () {
	if(addedMain) {
		return;
	}
	addedMain = true;
	loadStyleSheet(mainStylesheet + "?r=1")
});

function properOnLoadEvent(cb) {
	if(document.readyState === "complete" && document.getElementsByTagName("head")[0]) {
		cb();
	} else {
		document.addEventListener("DOMContentLoaded", function () {
			if((document.readyState === "complete") && document.getElementsByTagName("head")[0]) {
				cb();
			}
		}, false);
		document.addEventListener("readystatechange", function () {
			if((document.readyState === "complete") && document.getElementsByTagName("head")[0]) {
				cb();
			}
		}, false);
	}
}

function properOnLoadEvent_(cb) {
	if((document.readyState === "complete" || document.readyState === "interactive") && document.getElementsByTagName("head")[0]) {
		cb();
	} else {
		document.addEventListener("DOMContentLoaded", function () {
			if((document.readyState === "complete" || document.readyState === "interactive") && document.getElementsByTagName("head")[0]) {
				cb();
			}
		}, false);
		document.addEventListener("readystatechange", function () {
			if((document.readyState === "complete" || document.readyState === "interactive") && document.getElementsByTagName("head")[0]) {
				cb();
			}
		}, false);
	}
}

function properOnLoadEvent__(cb) {
	if(document.getElementsByTagName("head")[0]) {
		cb();
	} else {
		document.addEventListener("DOMContentLoaded", function () {
			if(document.getElementsByTagName("head")[0]) {
				cb();
			}
		}, false);
		document.addEventListener("readystatechange", function () {
			if(document.getElementsByTagName("head")[0]) {
				cb();
			}
		}, false);
	}
}

function fakeTimeout(callback) {
	if(window.top === window) {
		properOnLoadEvent__(callback);
		return;
	}
	properOnLoadEvent__(function(){
	document.head.addEventListener("timeoutEvent", function () {
		properOnLoadEvent__(callback);
	}, false);
	var ev = document.createEvent("HTMLEvents");
	ev.initEvent("timeoutEvent", true, false);
	document.head.dispatchEvent(ev);});
}
fakeTimeout(passFunction);