// ==UserScript==
// @name			HackerForeverOptimizer
// @namespace		http://www.hackerforever.com
// @description		Optimizes the HackerForever.com Interface
// @info			Optimizes the HackerForever.com Interface
// @author			boreas
// @version			0.6.9alpha
// @icon			http://www.hackerforever.com/favicon.ico
// @downloadURL		https://userscripts.org/scripts/source/171559.user.js
// @updateURL		https://userscripts.org/scripts/source/171559.meta.js
// @include			http://www.hackerforever.com/*
// @include			http://adf.ly/OxOvZ
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_deleteValue
// @grant			unsafeWindow
// ==/UserScript==


/* In the following script, some js-functions from the website 
 * http://www.hackerforever.com/ are used. Check the website if 
 * you want to know their exact functionality. 
 */

/* What Google Chrome needs in Javascript: 
 * - functions must be declared and defined BEFORE 
 *   (and that means in an earlier line of code) you 
 *   call them
 * - ALL variables used in a function must be declared 
 *   in the first line of the function's body
 * - EVERY if, for, while, etc. block MUST have a pair 
 *   of {}, even if only one line of code follows
 */



//########################################################
//####### clean up rubbish from earlier versions #########
//########################################################

GM_deleteValue("hideNoobTool"); 
GM_deleteValue("restoreSoftwareListWidth"); 

//########################################################
//########## declaring global config variables ###########
//########################################################

var reorderMainMenu = true; 
var rememberJobSelection = true; 
var selectedJob = 1; 
var restoreShopWidth = true; 
var hideUnneededSoftware = true; 
var reorderSoftwareList = true; 
var showNeededEP = true; 
var showCustomLogButtons = true; 
var shortenAdProcess = true; 
var optimizeTimers = true; 
var alarmSoundSrc = "http://sms-enhancer.googlecode.com/svn-history/r2/trunk/res/raw/new_sms.ogg"; 
//var alarmSoundSrc = "http://www.hackerforever.com/sounds/email.mp3"; 
var playAlarmSound = 3; 


//########################################################
//### declaring variable copies for the page variables ###
//########################################################

var padlength = function () {}; 
var serverdate = new Date(); 
var montharray = []; 
var scount = -1; 
var pcount = -1; 
var jcount = -1; 
var mcount = -1; 
var dcount = -1; 
var acount = -1; 


//########################################################
//################## helper functions ####################
//########################################################


// toggles the css property 'display' of the node with the id between 'none' and 'block'
function toggleDisplay(id) {
	var elm = document.getElementById(id); 
	if (elm != null) {
		if (elm.style.display == "none") {
			elm.style.display = "block"; 
		} else {
			elm.style.display = "none"; 
		}
	}
}

// toggles the checked attribute of the supplied checkbox element node
function toggleCheckbox(src) {
	if (src != null) {
		GM_setValue(src.id, src.checked); 
	}
}

// special timer checkbox toggle function which additionally disables/enables the sound features
function toggleTimerCheckbox(src) {
	var bool, i; 
	if (src != null) {
		bool = src.checked; 
		GM_setValue(src.id, bool); 
		document.getElementById('alarmSoundSrc').disabled = !bool; 
		for (i = 1; i <= 6; i++) {
			document.getElementById('playAlarmSound' + i).disabled = !bool; 
		}
	}
}

// read the supplied textfield element node's value
function readTextfield(src) {
	if (src != null) {
		GM_setValue(src.id, src.value); 
	}
}

// read the checked state of the six sound checkboxes
function readSoundCheckboxes() {
	var tempPlayAlarmSound = 0, i, box; 
	for (i = 1; i <= 6; i++) {
		box = document.getElementById('playAlarmSound' + i); 
		if (box != null) {
			if (box.checked) {
				tempPlayAlarmSound += Math.pow(2, i-1); 
			}
		}
	}
	GM_setValue('playAlarmSound', tempPlayAlarmSound); 
}


// new displaytime function (replaces the original from the webpage)
function displaytime() {
	var dateString, timeString, elm; 
	dateString = montharray[serverdate.getMonth()] + " " + padlength(serverdate.getDate()) + ", " + serverdate.getFullYear(); 
	timeString = padlength(serverdate.getHours()) + ":" + padlength(serverdate.getMinutes()) + ":" + padlength(serverdate.getSeconds()); 
	elm = document.getElementById("servertime"); 
	if (elm.childNodes.length == 0)
		elm.appendChild(document.createTextNode("")); 
	elm = elm.firstChild; 
	elm.textContent = dateString + " " + timeString; 
	serverdate.setSeconds(serverdate.getSeconds()+1); 
}

// new HackCounters function (replaces the original from the webpage)
function HackCounters() {

	var countdown, soundPlayable; 

	countdown = document.getElementById("scount");
	if (countdown == null) {
		return; 
	}
	soundPlayable = document.getElementById('alarmSound').networkState != 3; 
	if(scount > 0) {
		countdown.style.color = "red"; 
		countdown.firstChild.textContent = Seconds2Time(scount); 
		scount--;
		if (scount == 0 && ((((playAlarmSound%32)%16)%8)%4)%2 >= 1 && soundPlayable) {
			setTimeout(function () { document.getElementById('alarmSound').play(); }, 1000); 
		}
	} else {
		countdown.style.color = "lime"; 
		countdown.firstChild.textContent = "0"; 
	}

	countdown = document.getElementById("pcount");
	if(pcount > 0) {
		countdown.style.color = "red"; 
		countdown.firstChild.textContent = Seconds2Time(pcount); 
		pcount--;
		if (pcount == 0 && (((playAlarmSound%32)%16)%8)%4 >= 2 && soundPlayable) {
			setTimeout(function () { document.getElementById('alarmSound').play(); }, 1000); 
		}
	} else {
		countdown.style.color = "lime"; 
		countdown.firstChild.textContent = "0"; 
	}

	countdown = document.getElementById("jcount");
	if(jcount > 0) {
		countdown.style.color = "red"; 
		countdown.firstChild.textContent = Seconds2Time(jcount); 
		jcount--;
		if (jcount == 0 && ((playAlarmSound%32)%16)%8 >= 4 && soundPlayable) {
			setTimeout(function () { document.getElementById('alarmSound').play(); }, 1000); 
		}
	} else {
		countdown.style.color = "lime"; 
		countdown.firstChild.textContent = "0"; 
	}

	countdown = document.getElementById("mcount");
	if(mcount > 0) {
		countdown.style.color = "red"; 
		countdown.firstChild.textContent = Seconds2Time(mcount); 
		mcount--;
		if (mcount == 0 && (playAlarmSound%32)%16 >= 8 && soundPlayable) {
			setTimeout(function () { document.getElementById('alarmSound').play(); }, 1000); 
		}
	} else {
		countdown.style.color = "lime"; 
		countdown.firstChild.textContent = "0"; 
	}

	countdown = document.getElementById("dcount");
	if(dcount > 0) {
		countdown.style.color = "red"; 
		countdown.firstChild.textContent = Seconds2Time(dcount); 
		dcount--;
		if (dcount == 0 && playAlarmSound%32 >= 16 && soundPlayable) {
			setTimeout(function () { document.getElementById('alarmSound').play(); }, 1000); 
		}
	} else {
		countdown.style.color = "lime"; 
		countdown.firstChild.textContent = "0"; 
	}

	countdown = document.getElementById("acount");
	if(acount > 0) {
		countdown.style.color = "red"; 
		countdown.firstChild.textContent = Seconds2Time(acount); 
		acount--;
		if (acount == 0 && playAlarmSound >= 32 && soundPlayable) {
			setTimeout(function () { document.getElementById('alarmSound').play(); }, 1000); 
		}
	} else {
		countdown.style.color = "lime"; 
		countdown.firstChild.textContent = "0"; 
	}
}

// new Seconds2Time function (replaces the original from the webpage)
function Seconds2Time(seconds, showdays) {

	var numdays, numhours, numminutes, numseconds, returntime, empty, printNext; 

	numdays = Math.floor(seconds / 86400.0);
	seconds = seconds % 86400; 
	numhours = Math.floor(seconds / 3600.0);
	seconds = seconds % 3600; 
	numminutes = Math.floor(seconds / 60.0);
	numseconds = seconds % 60;

	returntime = "";

	empty = true; 
	printNext = showdays == 1 && numdays > 0; 
	if (printNext) {
		returntime += numdays + "d:";
		empty = false; 
	}

	printNext = printNext || numhours > 0; 
	if (printNext) {
		if (empty)
			returntime += numhours + "h:";
		else
			returntime += padlength(numhours) + "h:";
		empty = false; 
	}

	printNext = printNext || numminutes > 0; 
	if (printNext) {
		if (empty)
			returntime += numminutes + "m:";
		else
			returntime += padlength(numminutes) + "m:";
		empty = false; 
	}

	printNext = printNext || numseconds > 0; 
	if (printNext) {
		if (empty)
			returntime += numseconds + "s";
		else
			returntime += padlength(numseconds) + "s";
	} else {
		returntime = "0"; 
	}
	
	return returntime;
}


// new helper function for killing all previously set intervals
function killIntervals(limit) {
    limit=limit || 1000; // could be 100 or 100000 - your call
    var np, n = setInterval(function(){}, 100000); // not meant to ever run
    np = Math.max(0, n-limit);
    while (n > np) {
        clearInterval(n--);
    }
}


//########################################################
//########## helper class for DOM manipulation ###########
//########################################################


function DOMwiz(rootElm) {


	// root always points to the document fragment node
	this.root = null; 

	// parent is the node, to which new nodes are appended to
	this.parent = null; 

	// current is the node, on which attributes are set
	this.current = null; 

	// any error encountered by the object's functions will be documented here
	this.errorMsg = ""; 

	// named escape sequences to be substituted by their corresponding unicode caracter
	this.namedEscapes = {
	//	"name": 		[unicode number], 
		"quot": 		34, 
		"amp": 			38, 
		"apos": 		39, 
		"lt": 			60, 
		"gt": 			62, 
		"nbsp": 		160, 
		"iexcl": 		161, 
		"cent": 		162, 
		"pound": 		163, 
		"curren": 		164, 
		"yen": 			165, 
		"brvbar": 		166, 
		"sect": 		167, 
		"uml": 			168, 
		"copy": 		169, 
		"ordf": 		170, 
		"laquo": 		171, 
		"not": 			172, 
		"shy": 			173, 
		"reg": 			174, 
		"macr": 		175, 
		"deg": 			176, 
		"plusmn": 		177, 
		"sup2": 		178, 
		"sup3": 		179, 
		"acute": 		180, 
		"micro": 		181, 
		"para": 		182, 
		"middot": 		183, 
		"cedil": 		184, 
		"sup1": 		185, 
		"ordm": 		186, 
		"raquo": 		187, 
		"frac14": 		188, 
		"frac12": 		189, 
		"frac34": 		190, 
		"iquest": 		191, 
		"Agrave": 		192, 
		"Aacute": 		193, 
		"Acirc": 		194, 
		"Atilde": 		195, 
		"Auml": 		196, 
		"Aring": 		197, 
		"AElig": 		198, 
		"Ccedil": 		199, 
		"Egrave": 		200, 
		"Eacute": 		201, 
		"Ecirc": 		202, 
		"Euml": 		203, 
		"Igrave": 		204, 
		"Iacute": 		205, 
		"Icirc": 		206, 
		"Iuml": 		207, 
		"ETH": 			208, 
		"Ntilde": 		209, 
		"Ograve": 		210, 
		"Oacute": 		211, 
		"Ocirc": 		212, 
		"Otilde": 		213, 
		"Ouml": 		214, 
		"times": 		215, 
		"Oslash": 		216, 
		"Ugrave": 		217, 
		"Uacute": 		218, 
		"Ucirc": 		219, 
		"Uuml": 		220, 
		"Yacute": 		221, 
		"THORN": 		222, 
		"szlig": 		223, 
		"agrave": 		224, 
		"aacute": 		225, 
		"acirc": 		226, 
		"atilde": 		227, 
		"auml": 		228, 
		"aring": 		229, 
		"aelig": 		230, 
		"ccedil": 		231, 
		"egrave": 		232, 
		"eacute": 		233, 
		"ecirc": 		234, 
		"euml": 		235, 
		"igrave": 		236, 
		"iacute": 		237, 
		"icirc": 		238, 
		"iuml": 		239, 
		"eth": 			240, 
		"ntilde": 		241, 
		"ograve": 		242, 
		"oacute": 		243, 
		"ocirc": 		244, 
		"otilde": 		245, 
		"ouml": 		246, 
		"divide": 		247, 
		"oslash": 		248, 
		"ugrave": 		249, 
		"uacute": 		250, 
		"ucirc": 		251, 
		"uuml": 		252, 
		"yacute": 		253, 
		"thorn": 		254, 
		"yuml": 		255, 
		"OElig": 		338, 
		"oelig": 		339, 
		"Scaron": 		352, 
		"scaron": 		353, 
		"Yuml": 		376, 
		"fnof": 		402, 
		"circ": 		710, 
		"tilde": 		732, 
		"Alpha": 		913, 
		"Beta": 		914, 
		"Gamma": 		915, 
		"Delta": 		916, 
		"Epsilon": 		917, 
		"Zeta": 		918, 
		"Eta": 			919, 
		"Theta": 		920, 
		"Iota": 		921, 
		"Kappa": 		922, 
		"Lambda": 		923, 
		"Mu": 			924, 
		"Nu": 			925, 
		"Xi": 			926, 
		"Omicron": 		927, 
		"Pi": 			928, 
		"Rho": 			929, 
		"Sigma": 		931, 
		"Tau": 			932, 
		"Upsilon": 		933, 
		"Phi": 			934, 
		"Chi": 			935, 
		"Psi": 			936, 
		"Omega": 		937, 
		"alpha": 		945, 
		"beta": 		946, 
		"gamma": 		947, 
		"delta": 		948, 
		"epsilon": 		949, 
		"zeta": 		950, 
		"eta": 			951, 
		"theta": 		952, 
		"iota": 		953, 
		"kappa": 		954, 
		"lambda": 		955, 
		"mu": 			956, 
		"nu": 			957, 
		"xi": 			958, 
		"omicron": 		959, 
		"pi": 			960, 
		"rho": 			961, 
		"sigmaf": 		962, 
		"sigma": 		963, 
		"tau": 			964, 
		"upsilon": 		965, 
		"phi": 			966, 
		"chi": 			967, 
		"psi": 			968, 
		"omega": 		969, 
		"thetasym": 	977, 
		"upsih": 		978, 
		"piv": 			982, 
		"ensp": 		8194, 
		"emsp": 		8195, 
		"thinsp": 		8201, 
		"zwnj": 		8204, 
		"zwj": 			8205, 
		"lrm": 			8206, 
		"rlm": 			8207, 
		"ndash": 		8211, 
		"mdash": 		8212, 
		"lsquo": 		8216, 
		"rsquo": 		8217, 
		"sbquo": 		8218, 
		"ldquo": 		8220, 
		"rdquo": 		8221, 
		"bdquo": 		8222, 
		"dagger": 		8224, 
		"Dagger": 		8225, 
		"bull": 		8226, 
		"hellip": 		8230, 
		"permil": 		8240, 
		"prime": 		8242, 
		"Prime": 		8243, 
		"lsaquo": 		8249, 
		"rsaquo": 		8250, 
		"oline": 		8254, 
		"frasl": 		8260, 
		"euro": 		8364, 
		"image": 		8465, 
		"weierp": 		8472, 
		"real": 		8476, 
		"trade": 		8482, 
		"alefsym": 		8501, 
		"larr": 		8592, 
		"uarr": 		8593, 
		"rarr": 		8594, 
		"darr": 		8595, 
		"harr": 		8596, 
		"crarr": 		8629, 
		"lArr": 		8656, 
		"uArr": 		8657, 
		"rArr": 		8658, 
		"dArr": 		8659, 
		"hArr": 		8660, 
		"forall": 		8704, 
		"part": 		8706, 
		"exist": 		8707, 
		"empty": 		8709, 
		"nabla": 		8711, 
		"isin": 		8712, 
		"notin": 		8713, 
		"ni": 			8715, 
		"prod": 		8719, 
		"sum": 			8721, 
		"minus": 		8722, 
		"lowast": 		8727, 
		"radic": 		8730, 
		"prop": 		8733, 
		"infin": 		8734, 
		"ang": 			8736, 
		"and": 			8743, 
		"or": 			8744, 
		"cap": 			8745, 
		"cup": 			8746, 
		"int": 			8747, 
		"there4": 		8756, 
		"sim": 			8764, 
		"cong": 		8773, 
		"asymp": 		8776, 
		"ne": 			8800, 
		"equiv": 		8801, 
		"le": 			8804, 
		"ge": 			8805, 
		"sub": 			8834, 
		"sup": 			8835, 
		"nsub": 		8836, 
		"sube": 		8838, 
		"supe": 		8839, 
		"oplus": 		8853, 
		"otimes": 		8855, 
		"perp": 		8869, 
		"sdot": 		8901, 
		"vellip": 		8942, 
		"lceil": 		8968, 
		"rceil": 		8969, 
		"lfloor": 		8970, 
		"rfloor": 		8971, 
		"lang": 		9001, 
		"rang": 		9002, 
		"loz": 			9674, 
		"spades": 		9824, 
		"clubs": 		9827, 
		"hearts": 		9829, 
		"diams": 		9830 
	}; 


	// initialize the object: 
	this._construct = function (rootElm) {

		var i; 

		// ensure the use of the 'new' operator
		if ( ! (this instanceof DOMwiz) ) {
			return new DOMwiz(rootElm); 
		}

		this.root = document.createDocumentFragment(); 
		if (rootElm != undefined) {
			this.root.appendChild(rootElm); 
		}

		this.parent = this.root; 
		for (i = 0; i < this.root.childNodes.length; i++) {
			if (this.root.childNodes[i].nodeType == 1) {
				this.parent = this.root.childNodes[i]; 
				break; 
			}
		}

		if (this.parent.hasChildNodes()) {
			this.current = this.parent.firstChild; 
		} else {
			this.current = this.parent; 
		}

	}

	this._construct(rootElm); 



	/* object methods: every method returns this object so 
	 * you can concatenate many commands with dots
	 */

	/* this function moves the cursor one step up in the objects DOM
	 */
	this.up = function () {
		if (this.parent.nodeType != 11) {
			if (this.current != this.parent) {
				this.current = this.parent; 
			}
			this.parent = this.parent.parentNode; 
		} else {
			this.errorMsg += "up() reports: document fragment root node reached; \n"; 
		}
		return this; 
	}

	/* this function moves the cursor one step down in the objects DOM
	 */
	this.down = function () {
		var onlyTxt, i; 
		if (this.parent.hasChildNodes()) {
			if (this.current == this.parent) {
				onlyTxt = true; 
				for (i = 0; i < this.parent.childNodes.length; i++) {
					if (this.parent.childNodes[i].nodeType == 1) {
						this.parent = this.parent.childNodes[i]; 
						onlyTxt = false; 
						break; 
					}
					if (onlyTxt) {
						this.errorMsg += "down() reports: parent only has text child nodes which cannot be parent; \n"; 
					}
				}
			} else {
				if (this.current.nodeType == 1) {
					this.parent = this.current; 
				} else {
					this.errorMsg += "down() reports: current is a text node and cannot be parent; \n"; 
				}
			}
			if (this.parent.hasChildNodes()) {
				this.current = this.parent.firstChild; 
			} else {
				this.current = this.parent; 
			}
		} else {
			this.errorMsg += "down() reports: parent doesn't have any child nodes; \n"; 
		}
		return this; 
	}

	/* this function moves the cursor one step forward 
	 * on the same level in the objects DOM
	 */
	this.next = function () {
		if (this.current.nextSibling != null) {
			this.current = this.current.nextSibling; 
		} else {
			this.errorMsg += "next() reports: current is last child; \n"; 
		}
		return this; 
	}

	/* this function moves the cursor one step backwards 
	 * on the same level in the objects DOM
	 */
	this.previous = function () {
		if (this.current.previousSibling != null) {
			this.current = this.current.previousSibling; 
		} else {
			this.errorMsg += "previous() reports: current is first child; \n"; 
		}
		return this; 
	}

	/* this function creates a new element with the desired 
	 * tagName and (optional) position
	 * @param tagName: String element tag name
	 * @param position: optional position, negative means before current, 
	 * 		positive means after current, Zero means replace current, 
	 * 		undefined means append to parent as lastChild
	 */
	this.createElement = function (tagName, position) {
		if (tagName != undefined && tagName != '') {
			if (position != undefined && typeof position == "number") {
				this.insertElement(document.createElement(tagName), position); 
			} else {
				this.insertElement(document.createElement(tagName)); 
			}
		} else {
			this.errorMsg += "createElement() reports: cannot create element without proper tag name; \n"; 
		}
		return this; 
	}

	/* this function sets a new Attribute node on the current node
	 * @param att: String attribute type
	 * @param value: attribute value, can be anything but 
	 * 		will be converted to String
	 */
	this.setAttribute = function (att, value) {
		if (att != undefined && att != '' && value != undefined && this.current.nodeType != 3) {
			this.current.setAttribute(att, value); 
		} else {
			if (att == undefined || value == undefined) {
				this.errorMsg += "setAttribute() reports: please supply attribute type and value; \n"; 
			} if (att == '') {
				this.errorMsg += "setAttribute() reports: attribute type is empty string, command ignored; \n"; 
			} if (this.current.nodeType == 3) {
				this.errorMsg += "setAttribute() reports: current is text node and cannot have attributes; \n"; 
			}
		}
		return this; 
	}

	/* this function creates a new text node with the desired 
	 * text and (optional) position
	 * @param text: String text
	 * @param position: optional position, negative means before current, 
	 * 		positive means after current, Zero means replace current, 
	 * 		undefined means append to parent as lastChild
	 */
	this.createText = function (text, position) {
		if (text != undefined) {
			text = this.escapeSeq(text); 
			if (position != undefined && typeof position == "number") {
				this.insertElement(document.createTextNode(text), position); 
			} else {
				this.insertElement(document.createTextNode(text)); 
			}
		} else {
			this.errorMsg += "createText() reports: cannot create text node without text; \n"; 
		}
		return this; 
	}

	/* this function inserts an existing node object at the 
	 * desired (optional) position
	 * @param elm: NodeObject to be inserted
	 * @param position: optional position, negative means before current, 
	 * 		positive means after current, Zero means replace current, 
	 * 		undefined means append to parent as lastChild
	 */
	this.insertElement = function (elm, position) {
		if (elm != undefined && elm != null && this.parent.nodeType != 3) {
			if (position != undefined && typeof position == "number" && this.current != this.parent) {
				if (position < 0) {
					this.parent.insertBefore(elm, this.current); 
				} else {
					if (position > 0) {
						if (this.current.nextSibling != null) {
							this.parent.insertBefore(elm, this.current.nextSibling); 
						} else {
							this.parent.appendChild(elm); 
						}
					} else {
						this.parent.replaceChild(elm, this.current); 
					}
				}
			} else {
				this.parent.appendChild(elm); 
			}
			this.current = elm; 
		} else {
			if (elm == undefined || elm == null) {
				this.errorMsg += "insertElement() reports: please supply valid element object; \n"; 
			} if (this.parent.nodeType == 3) {
				this.errorMsg += "insertElement() reports: parent is text node and cannot have children; \n"; 
			}
		}
		return this; 
	}

	/* this function appends the objects DOM tree to the 
	 * supplied parent node in the document
	 * @param parent: NodeObject to append the DOM tree to
	 */
	this.appendTo = function (parent) {
		if (parent != undefined && parent != null && parent.nodeType != 3) {
			parent.appendChild(this.root.cloneNode()); 
		} else {
			if (parent == undefined || parent == null) {
				this.errorMsg += "appendTo() reports: please supply valid parent object; \n"; 
			} if (parent.nodeType == 3) {
				this.errorMsg += "appendTo() reports: parent is text node and cannot have children; \n"; 
			}
		}
		return this; 
	}

	/* this function inserts the objects DOM tree before the 
	 * supplied node in the document
	 * @param nextSibling: NodeObject before which to insert the DOM tree
	 */
	this.insertBefore = function (nextSibling) {
		if (nextSibling != undefined && nextSibling != null && nextSibling.parentNode != null) {
			nextSibling.parentNode.insertBefore(this.root.cloneNode(), nextSibling); 
		} else {
			if (nextSibling == undefined || nextSibling == null) {
				this.errorMsg += "insertBefore() reports: please supply valid nextSibling object; \n"; 
			} if (nextSibling.parentNode == null) {
				this.errorMsg += "insertBefore() reports: nextSibling is not part of a DOM tree and cannot have a previousSibling; \n"; 
			}
		}
		return this; 
	}

	/* this function inserts the objects DOM tree after the 
	 * supplied node in the document
	 * @param previousSibling: NodeObject after which to insert the DOM tree
	 */
	this.insertAfter = function (previousSibling) {
		if (previousSibling != undefined && previousSibling != null && previousSibling.parentNode != null) {
			if (previousSibling.nextSibling == null) {
				previousSibling.parentNode.appendChild(this.root.cloneNode()); 
			} else {
				previousSibling.parentNode.insertBefore(this.root.cloneNode(), previousSibling.nextSibling); 
			}
		} else {
			if (previousSibling == undefined || previousSibling == null) {
				this.errorMsg += "insertAfter() reports: please supply valid previousSibling object; \n"; 
			} if (previousSibling.parentNode == null) {
				this.errorMsg += "insertAfter() reports: previousSibling is not part of a DOM tree and cannot have a nextSibling; \n"; 
			}
		}
		return this; 
	}

	/* this function replaces the supplied node with the objects DOM tree
	 * @param beReplaced: NodeObject to be replaced by the DOM tree
	 */
	this.replace = function (beReplaced) {
		if (beReplaced != undefined && beReplaced != null && beReplaced.parentNode != null) {
			beReplaced.parentNode.replaceChild(this.root.cloneNode(), beReplaced); 
		} else {
			if (beReplaced == undefined || beReplaced == null) {
				this.errorMsg += "replace() reports: please supply valid object to replace; \n"; 
			} if (beReplaced.parentNode == null) {
				this.errorMsg += "replace() reports: beReplaced is not part of a DOM tree and cannot be replaced; \n"; 
			}
		}
		return this; 
	}

	/* this function alerts the current state of this object: 
	 * the parent nodeName and the current nodeName
	 */
	this.status = function () {
		var isElm, state; 
		isElm = (this.current.nodeName.indexOf("#") == -1); 
		state = "<" + this.parent.nodeName.toLowerCase() + ">\n"; 
		if (this.current == this.parent) {
			state += "\tcurrent = parent\n"; 
		} else {
			if (isElm) {
				state += "\t<" + this.current.nodeName.toLowerCase() + ">...</" + this.current.nodeName.toLowerCase() + ">\n"; 
			} else {
				state += "\t" + this.current.nodeName.toLowerCase() + "\n"; 
			}
		}
		state += "</" + this.parent.nodeName.toLowerCase() + ">"; 
		alert(state); 
		return this; 
	}

	/* this function alerts the object's current errorMsg
	 */
	this.printError = function () {
		var err = ""; 
		if (this.errorMsg == "") {
			err = "No errors occurred. "
		} else {
			err = this.errorMsg; 
		}
		alert(err); 
		return this; 
	}

	/* this function does not return this object, it should not 
	 * be called from the outside; it should be used as a 
	 * private function. it replaces html escape sequences 
	 * with the corresponding unicode character
	 */
	this.escapeSeq = /* private */ function (text) {
		var search, sequence, char; 
		search = /&(#?[A-Za-z0-9]+);/g; 
		sequence = null; 
		while ( (sequence = search.exec(text)) != null) {
			char = ""; 
			if (sequence[1].charAt(0) == "#") {
				if (sequence[1].charAt(1) == "x") {
					char = String.fromCharCode(parseInt(sequence[1].substr(2), 16)); 
				} else {
					char = String.fromCharCode(parseInt(sequence[1].substr(1))); 
				}
			} else {
				if (this.namedEscapes[sequence[1]] == undefined) {
					char = sequence[1]; 
				} else {
					char = String.fromCharCode(this.namedEscapes[sequence[1]]); 
				}
			}
			text = text.replace(sequence[0], char); 
		}
		return text; 
	}

}



//########################################################
//############### main script functions ##################
//########################################################

// load all global variables saved by greasemonkey
function getVariables() {
	// load saved values for global variables, keep the default if not previously saved
	reorderMainMenu = GM_getValue('reorderMainMenu', reorderMainMenu); 
	rememberJobSelection = GM_getValue('rememberJobSelection', rememberJobSelection); 
	selectedJob = GM_getValue('selectedJob', selectedJob); 
	restoreShopWidth = GM_getValue('restoreShopWidth', restoreShopWidth); 
	hideUnneededSoftware = GM_getValue('hideUnneededSoftware', hideUnneededSoftware); 
	reorderSoftwareList = GM_getValue('reorderSoftwareList', reorderSoftwareList); 
	showNeededEP = GM_getValue('showNeededEP', showNeededEP); 
	showCustomLogButtons = GM_getValue('showCustomLogButtons', showCustomLogButtons); 
	shortenAdProcess = GM_getValue('shortenAdProcess', shortenAdProcess); 
	optimizeTimers = GM_getValue('optimizeTimers', optimizeTimers); 
	alarmSoundSrc = GM_getValue('alarmSoundSrc', alarmSoundSrc); 
	playAlarmSound = GM_getValue('playAlarmSound', playAlarmSound); 
}

/*
// save all global variables with greasemonkey
function setVariables() {
	// save current values of global variables
	GM_setValue('reorderMainMenu', reorderMainMenu); 
	GM_setValue('rememberJobSelection', rememberJobSelection); 
	GM_getValue('restoreShopWidth', restoreShopWidth); 
	GM_setValue('hideUnneededSoftware', hideUnneededSoftware); 
	GM_getValue('reorderSoftwareList', reorderSoftwareList); 
	GM_getValue('showNeededEP', showNeededEP); 
	GM_getValue('showCustomLogButtons', showCustomLogButtons); 
	GM_setValue('shortenAdProcess', shortenAdProcess); 
	GM_setValue('optimizeTimers', optimizeTimers); 
	GM_setValue('alarmSoundSrc', alarmSoundSrc); 
	GM_setValue('playAlarmSound', playAlarmSound); 
}
*/

// building the config button and menu for this script
function mainMenu() {

	var div, insBefore, mimeType, i; 

	// search for position of config icon
	div = document.getElementById('headerright').previousElementSibling; 
	if (div == null) {
		return -1; 
	}
	insBefore = div.getElementsByTagName('a')[1].nextSibling; 
	// determine the mime type of the alarm sound
	mimeType = ""; 
	switch (alarmSoundSrc.substr(-3).toLowerCase()) {
	case "wav": 
		mimeType = "audio/wave"; 
		break; 
	case "ogg": 
		mimeType = "audio/ogg"; 
		break; 
	case "mp3": 
		mimeType = "audio/mp3"; 
		break; 
	}

	// create config icon, sound embed and config menu
	new DOMwiz().createElement('span').setAttribute('style', "position: absolute; margin-left: 7px; ").down()
		.createElement('a').setAttribute('id', "configLink").setAttribute('href', "javascript:void(0); ").down()
			.createElement('img').setAttribute('src', "http://wiki.greasespot.net/favicon.ico").setAttribute('alt', "HFOptimizerConfig").setAttribute('height', "24").setAttribute('style', "border: 0px; vertical-align: top; ")
		.up().createElement('audio').setAttribute('id', "alarmSound").setAttribute('preload', "auto").down()
			.createElement('source').setAttribute('src', alarmSoundSrc).setAttribute('type', mimeType)
		.up().createElement('div').setAttribute('id', "configDiv").setAttribute('style', "display: none; position: absolute; left: 20px; top: 20px; border: 1px solid #2A5100; border-radius: 5px; background-color: #000000; padding: 5px; width: 450px; ").down()
			.createElement('form').down()
				.createElement('table').down()
					.createElement('caption').down()
						.createText("HackerForeverOptimizer Configuration")
					.up().createElement('tbody').down()
						.createElement('tr').down()
							.createElement('td').down()
								.createElement('input').setAttribute('id', "reorderMainMenu").setAttribute('name', "reorderMainMenu").setAttribute('type', "checkbox").setAttribute('value', "reorderMainMenu").setAttribute((reorderMainMenu)?'checked':'', "")
							.up().createElement('td').down()
								.createElement('label').setAttribute('for', "reorderMainMenu").down()
									.createText("Establish a more convenient order for the main menu. ")
								.up()
							.up()
						.up().createElement('tr').down()
							.createElement('td').down()
								.createElement('input').setAttribute('id', "rememberJobSelection").setAttribute('name', "rememberJobSelection").setAttribute('type', "checkbox").setAttribute('value', "rememberJobSelection").setAttribute((rememberJobSelection)?'checked':'', "")
							.up().createElement('td').down()
								.createElement('label').setAttribute('for', "rememberJobSelection").down()
									.createText("Remember your Small Hack job selection for your next login. ")
								.up()
							.up()
						.up().createElement('tr').down()
							.createElement('td').down()
								.createElement('input').setAttribute('id', "restoreShopWidth").setAttribute('name', "restoreShopWidth").setAttribute('type', "checkbox").setAttribute('value', "restoreShopWidth").setAttribute((restoreShopWidth)?'checked':'', "")
							.up().createElement('td').down()
								.createElement('label').setAttribute('for', "restoreShopWidth").down()
									.createText("Move the shopping cart and file transfers above the software and hardware lists to restore full width. ")
								.up()
							.up()
						.up().createElement('tr').down()
							.createElement('td').down()
								.createElement('input').setAttribute('id', "hideUnneededSoftware").setAttribute('name', "hideUnneededSoftware").setAttribute('type', "checkbox").setAttribute('value', "hideUnneededSoftware").setAttribute((hideUnneededSoftware)?'checked':'', "")
							.up().createElement('td').down()
								.createElement('label').setAttribute('for', "hideUnneededSoftware").down()
									.createText("Hide unneeded software from the Software list. ")
								.up()
							.up()
						.up().createElement('tr').down()
							.createElement('td').down()
								.createElement('input').setAttribute('id', "reorderSoftwareList").setAttribute('name', "reorderSoftwareList").setAttribute('type', "checkbox").setAttribute('value', "reorderSoftwareList").setAttribute((reorderSoftwareList)?'checked':'', "")
							.up().createElement('td').down()
								.createElement('label').setAttribute('for', "reorderSoftwareList").down()
									.createText("Establish a more convenient order for the Software list. ")
								.up()
							.up()
						.up().createElement('tr').down()
							.createElement('td').down()
								.createElement('input').setAttribute('id', "showNeededEP").setAttribute('name', "showNeededEP").setAttribute('type', "checkbox").setAttribute('value', "showNeededEP").setAttribute((showNeededEP)?'checked':'', "")
							.up().createElement('td').down()
								.createElement('label').setAttribute('for', "showNeededEP").down()
									.createText("Show the needed EP for reaching the next level when hovering over current EP. ")
								.up()
							.up()
						.up().createElement('tr').down()
							.createElement('td').down()
								.createElement('input').setAttribute('id', "showCustomLogButtons").setAttribute('name', "showCustomLogButtons").setAttribute('type', "checkbox").setAttribute('value', "showCustomLogButtons").setAttribute((showCustomLogButtons)?'checked':'', "")
							.up().createElement('td').down()
								.createElement('label').setAttribute('for', "showCustomLogButtons").down()
									.createText("Show custom buttons for the four log types next to the cooldown timers. ")
								.up()
							.up()
						.up().createElement('tr').down()
							.createElement('td').down()
								.createElement('input').setAttribute('id', "shortenAdProcess").setAttribute('name', "shortenAdProcess").setAttribute('type', "checkbox").setAttribute('value', "shortenAdProcess").setAttribute((shortenAdProcess)?'checked':'', "")
							.up().createElement('td').down()
								.createElement('label').setAttribute('for', "shortenAdProcess").down()
									.createText("Immediately redirect to the captcha page if you are sent to adf.ly. ")
								.up()
							.up()
						.up().createElement('tr').down()
							.createElement('td').down()
								.createElement('input').setAttribute('id', "optimizeTimers").setAttribute('name', "optimizeTimers").setAttribute('type', "checkbox").setAttribute('value', "optimizeTimers").setAttribute((optimizeTimers)?'checked':'', "")
							.up().createElement('td').down()
								.createElement('label').setAttribute('for', "optimizeTimers").down()
									.createText("Optimize cooldown timers and clock. ")
								.up()
							.up()
						.up().createElement('tr').down()
							.createElement('td').setAttribute('colspan', "2").down()
								.createText("Alarm sound source: ")
								.createElement('input').setAttribute('id', "alarmSoundSrc").setAttribute('name', "alarmSoundSrc").setAttribute('type', "text").setAttribute('style', "width: 300px; ").setAttribute('value', alarmSoundSrc).setAttribute((optimizeTimers)?'':'disabled', "")
							.up()
						.up().createElement('tr').down()
							.createElement('td').setAttribute('colspan', "2").down()
								.createText("Play alarm sound for the following cooldowns: ")
							.up()
						.up().createElement('tr').down()
							.createElement('td')
							.createElement('td').down()
								.createElement('input').setAttribute('id', "playAlarmSound1").setAttribute('name', "playAlarmSound1").setAttribute('type', "checkbox").setAttribute('value', "1").setAttribute((((((playAlarmSound%32)%16)%8)%4)%2 >= 1)?'checked':'', "").setAttribute((optimizeTimers)?'':'disabled', "")
								.createElement('label').setAttribute('for', "playAlarmSound1").down()
									.createText(" SRV | ")
								.up()
								.createElement('input').setAttribute('id', "playAlarmSound2").setAttribute('name', "playAlarmSound2").setAttribute('type', "checkbox").setAttribute('value', "2").setAttribute(((((playAlarmSound%32)%16)%8)%4 >= 2)?'checked':'', "").setAttribute((optimizeTimers)?'':'disabled', "")
								.createElement('label').setAttribute('for', "playAlarmSound2").down()
									.createText(" PC | ")
								.up()
								.createElement('input').setAttribute('id', "playAlarmSound3").setAttribute('name', "playAlarmSound3").setAttribute('type', "checkbox").setAttribute('value', "4").setAttribute((((playAlarmSound%32)%16)%8 >= 4)?'checked':'', "").setAttribute((optimizeTimers)?'':'disabled', "")
								.createElement('label').setAttribute('for', "playAlarmSound3").down()
									.createText(" JOB | ")
								.up()
								.createElement('input').setAttribute('id', "playAlarmSound4").setAttribute('name', "playAlarmSound4").setAttribute('type', "checkbox").setAttribute('value', "8").setAttribute(((playAlarmSound%32)%16 >= 8)?'checked':'', "").setAttribute((optimizeTimers)?'':'disabled', "")
								.createElement('label').setAttribute('for', "playAlarmSound4").down()
									.createText(" CTR | ")
								.up()
								.createElement('input').setAttribute('id', "playAlarmSound5").setAttribute('name', "playAlarmSound5").setAttribute('type', "checkbox").setAttribute('value', "16").setAttribute((playAlarmSound%32 >= 16)?'checked':'', "").setAttribute((optimizeTimers)?'':'disabled', "")
								.createElement('label').setAttribute('for', "playAlarmSound5").down()
									.createText(" D/L | ")
								.up()
								.createElement('input').setAttribute('id', "playAlarmSound6").setAttribute('name', "playAlarmSound6").setAttribute('type', "checkbox").setAttribute('value', "32").setAttribute((playAlarmSound >= 32)?'checked':'', "").setAttribute((optimizeTimers)?'':'disabled', "")
								.createElement('label').setAttribute('for', "playAlarmSound6").down()
									.createText(" A/V")
								.up()
							.up()
						.up().createElement('tr').down()
							.createElement('td').setAttribute('colspan', "2").down()
								.createElement('input').setAttribute('type', "button").setAttribute('value', "Refresh page").setAttribute('onclick', "window.location.reload(); ")
								.createElement('input').setAttribute('id', "closeConfig").setAttribute('type', "button").setAttribute('value', "Close config").setAttribute('style', "float: right; ")
	.insertBefore(insBefore); 

	// set event listeners
	document.getElementById('configLink').addEventListener("click", function () { toggleDisplay("configDiv"); }, false); 
	document.getElementById('closeConfig').addEventListener("click", function () { toggleDisplay("configDiv"); }, false); 

	document.getElementById('reorderMainMenu').addEventListener("click", function () { toggleCheckbox(this); }, false); 
	document.getElementById('rememberJobSelection').addEventListener("click", function () { toggleCheckbox(this); }, false); 
	document.getElementById('restoreShopWidth').addEventListener("click", function () { toggleCheckbox(this); }, false); 
	document.getElementById('hideUnneededSoftware').addEventListener("click", function () { toggleCheckbox(this); }, false); 
	document.getElementById('reorderSoftwareList').addEventListener("click", function () { toggleCheckbox(this); }, false); 
	document.getElementById('showNeededEP').addEventListener("click", function () { toggleCheckbox(this); }, false); 
	document.getElementById('showCustomLogButtons').addEventListener("click", function () { toggleCheckbox(this); }, false); 
	document.getElementById('shortenAdProcess').addEventListener("click", function () { toggleCheckbox(this); }, false); 
	document.getElementById('optimizeTimers').addEventListener("click", function () { toggleTimerCheckbox(this); }, false); 
	document.getElementById('alarmSoundSrc').addEventListener("change", function () { readTextfield(this); }, false); 
	for (i = 1; i <= 6; i++) {
		document.getElementById('playAlarmSound' + i).addEventListener("click", readSoundCheckboxes, false); 
	}

}

// insert the needed EP to next level onmouseover the current EP
function applyNeededEP() {
	var elm, level, ep; 
	elm = document.getElementById('headerright').getElementsByTagName('a')[1]; 
	if (elm != null) {
		level = parseInt(elm.nextElementSibling.nextSibling.textContent.replace(": ", "").replace(" | ", "")); 
		if (level < 120) {
			ep = parseInt(elm.nextSibling.textContent.replace(": ", "").replace(" | ", "")); 
			new DOMwiz()
				.createText(":")
				.createElement('span')
					.setAttribute('style', "display: inline-block; ")
					.setAttribute('onmouseenter', "this.style.width = this.scrollWidth+\"px\"; this.childNodes[1].textContent = \"" + (Math.round(20*(Math.pow(1.09998, level))-1)-ep) + "\"; ")
					.setAttribute('onmouseleave', "this.childNodes[1].textContent = \"" + ep + "\"; ")
				.down()
						.createText("&nbsp;")
						.createText("" + ep)
						.createText("&nbsp;")
					.up()
				.createText("| ")
			.replace(elm.nextSibling); 
		}
	}
}

function applyOptimizedTimers() {
	if (document.getElementById('jcount') != null) {
		new DOMwiz().createElement('br').replace(document.getElementById('jcount').nextSibling); 
	}

	// read the required variables and functions from the page
	padlength = unsafeWindow.padlength; 
	serverdate = unsafeWindow.serverdate; 
	montharray = unsafeWindow.montharray; 
	scount = unsafeWindow.scount; 
	pcount = unsafeWindow.pcount; 
	jcount = unsafeWindow.jcount; 
	mcount = unsafeWindow.mcount; 
	dcount = unsafeWindow.dcount; 
	acount = unsafeWindow.acount; 
}

// create the custom log buttons
function applyCustomLogButtons() {
	var elm = document.getElementById('scount'); 
	if (elm != null) {
		if (optimizeTimers) {
			elm = elm.previousElementSibling; 
		} else {
			elm = document.getElementById('acount').nextElementSibling.nextElementSibling; 
		}
		new DOMwiz().createElement('form').setAttribute('name', "log_form").setAttribute('method', "POST").setAttribute('action', "index.php").down()
			.createElement('input').setAttribute('type', "hidden").setAttribute('name', "h").setAttribute('value', "readlog")
			.createElement('input').setAttribute('type', "hidden").setAttribute('name', "log").setAttribute('value', "system")
			.createElement('input').setAttribute('type', "submit").setAttribute('value', "system.log").setAttribute('style', "float: left; font-size: 7pt; margin: 3px; width: 72px; ")
		.insertBefore(elm)
			.previous().createElement('input', 0).setAttribute('type', "hidden").setAttribute('name', "log").setAttribute('value', "server")
			.next().createElement('input', 0).setAttribute('type', "submit").setAttribute('value', "server.log").setAttribute('style', "float: left; font-size: 7pt; margin: 3px; width: 72px; ")
		.insertBefore(elm)
			.previous().createElement('input', 0).setAttribute('type', "hidden").setAttribute('name', "log").setAttribute('value', "hack")
			.next().createElement('input', 0).setAttribute('type', "submit").setAttribute('value', "hack.log").setAttribute('style', "float: left; clear: left; font-size: 7pt; margin: 3px; width: 72px; ")
		.insertBefore(elm)
			.previous().createElement('input', 0).setAttribute('type', "hidden").setAttribute('name', "log").setAttribute('value', "transfer")
			.next().createElement('input', 0).setAttribute('type', "submit").setAttribute('value', "transfer.log").setAttribute('style', "float: left; font-size: 7pt; margin: 3px; width: 72px; ")
		.insertBefore(elm); 
	}
}

// reorder the main menu
function applyReorderMainMenu() {
	var menuDiv = document.getElementsByTagName('body')[0].firstElementChild.children[2].firstElementChild; 
	if (menuDiv.getElementsByTagName('table').length > 2) { // logged in
		new DOMwiz()
			.insertElement(menuDiv.children[6])
			.insertElement(menuDiv.children[6])
			.insertElement(menuDiv.children[6])
			.insertElement(menuDiv.children[6])
			.insertElement(menuDiv.children[4])
			.insertElement(menuDiv.children[4])
		.insertBefore(menuDiv.children[2]); 
	}
}

function applyJobSelection() {
	var form, inputs, i; 
	//find the correct formular
	form = document.getElementsByTagName('body')[0].firstElementChild.children[2].children[1].children[2].children[2]; 

	if (form != null) { // if we are ready for another job
		inputs = form.parentNode.getElementsByTagName("input"); 
		for (i = 1; i < inputs.length-2; i++) {
			if (i == selectedJob) { // this should be your previous selected job
				inputs[i].checked = true; 
			}
			inputs[i].addEventListener("click", function () { GM_setValue('selectedJob', this.value); }, false); 
		}
	}
}

function applyShopWidth(div) {
	var secondDiv, dom; 
	div.removeAttribute("class"); 
	secondDiv = div.nextElementSibling; 
	dom = new DOMwiz(); 
	while (secondDiv.children.length > 0) {
		dom.insertElement(secondDiv.children[0]); 
	}
	secondDiv.parentNode.removeChild(secondDiv); 
	dom.createElement('br').createElement('br').createElement('br').insertBefore(div.firstElementChild); 
}

function applyReorderSoftwareList(tbody) {
	var trs = tbody.getElementsByTagName("tr"); 
	// when you insert a row into the DOMwiz it is removed from the trs-Array, quite nasty to count...
	new DOMwiz().createElement('tbody').down()
		.insertElement(trs[0]).down().down().down().createText("Single Use software: System tools", 0).up().up().up()
		.insertElement(trs[6]) // firewall 1.0
		.insertElement(trs[6]) // firewall 2.0
		.insertElement(trs[7]) // firewall 3.0
		.insertElement(trs[6]) // firewall server
		.insertElement(trs[10]) // SSVS
		.insertElement(trs[7]) // security pack 1.0
		.insertElement(trs[7]) // security pack 2.0
		.insertElement(trs[7]) // security pack 3.0
		.insertElement(trs[7]) // security pack 4.0
		.insertElement(trs[3]) // hard disk defragger
		.insertElement(trs[11]).down().down().down().createText("Single Use software: Hacking tools", 0).up().up().up()
		.insertElement(trs[11]) // n00b tool
		.insertElement(trs[11]) // CD
		.insertElement(trs[20]) // BFPC
		.insertElement(trs[11]) // software leecher
		.insertElement(trs[11]) // money steal trojan
		.insertElement(trs[11]) // inbox crusher
		.insertElement(trs[11]) // message stealer
		.insertElement(trs[11]) // bank.log stealer
		.insertElement(trs[11]) // hack.log stealer
		.insertElement(trs[11]) // system.log stealer
		.insertElement(trs[11]) // transfer.log stealer
		.insertElement(trs[11]) // server.log stealer
		.insertElement(trs[11]) // remote HDD destroyer
		.insertElement(trs[11]) // gateway destroyer
		.insertElement(trs[11]) // server software stealer
		.insertElement(trs[11]) // server revenue stealer
		.insertElement(trs[11]) // server health destroyer
		.insertElement(trs[4]).down().down().down().createText("Permanent system software", 0).up().up().up()
		.insertElement(trs[0]) // email client
		.insertElement(trs[0]) // log
		.insertElement(trs[0]) // server sniffer 1.0
		.insertElement(trs[0]) // server sniffer 2.0
		.insertElement(trs[6]) // OSes
		.insertElement(trs[6]) // win ME
		.insertElement(trs[6]) // win XP
		.insertElement(trs[6]) // mac OS X
		.insertElement(trs[6]) // win 8
		.insertElement(trs[6]) // slackware
		.insertElement(trs[6]) // server software
		.insertElement(trs[6]) // care pack
		.insertElement(trs[6]) // ftp
		.insertElement(trs[6]) // spam
		.insertElement(trs[6]) // phishing
		.insertElement(trs[6]) // porn
		.insertElement(trs[6]) // file sharing
		.insertElement(trs[6]) // cloaker
		.insertElement(trs[1]) // gateways
		.insertElement(trs[1]) // tiny
		.insertElement(trs[1]) // small
		.insertElement(trs[1]) // medium
		.insertElement(trs[1]) // large
	.replace(tbody); 
}

function applyHideUnneededSoftware(tbody, level) {
	var lastTR, currentTR, toolLvl, toolName; 
	lastTR = null; 
	currentTR = tbody.firstElementChild; 
	do {
		if (currentTR.getElementsByTagName("div")[0] != null) {
			toolLvl = currentTR.children[1].children[2].firstChild.textContent.replace("[level ", ""); 
			toolLvl = parseInt(toolLvl.substring(0, toolLvl.indexOf("]"))); 
			toolName = currentTR.children[1].firstElementChild.firstChild.textContent; 
			if (toolLvl > level) {
				tbody.removeChild(currentTR); 
			}
			if (toolName.indexOf("Firewall") == 0) {
				if ( (toolLvl == 20 && level >= 50) || (toolLvl == 50 && level >= 75)) {
					tbody.removeChild(currentTR); 
				}
			}
			if (toolName.indexOf("Security Pack") == 0) {
				if ( (toolLvl == 25 && level >= 45) || (toolLvl == 45 && level >= 75) || (toolLvl == 75 && level >= 100) ) {
					tbody.removeChild(currentTR); 
				}
			}
			if (toolName.indexOf("Server Sniffer") == 0) {
				if ( toolLvl == 20 && level >= 75 ) {
					tbody.removeChild(currentTR); 
				}
			}
			if ( (toolName.indexOf("Windows ME") == 0 && level >= 15) 
					|| (toolName.indexOf("Windows XP") == 0 && level >= 50) 
					|| (toolName.indexOf("Mac OS X") == 0 && level >= 70) 
					|| (toolName.indexOf("Windows 8") == 0 && level >= 95) ) {
				tbody.removeChild(currentTR); 
			}
			if ( toolName.indexOf("n00b Tool") == 0 && level >= 50 ) {
				tbody.removeChild(currentTR); 
			}
		}

		if (lastTR == null) {
			if (currentTR.parentNode == null) {
				currentTR = tbody.firstElementChild; 
			} else {
				lastTR = currentTR; 
				currentTR = lastTR.nextElementSibling; 
			}
		} else {
			if (currentTR.parentNode == null) {
				currentTR = lastTR.nextElementSibling; 
			} else {
				lastTR = currentTR; 
				currentTR = lastTR.nextElementSibling; 
			}
		}
	} while (currentTR != null); 
}

// applying configured changes to the site
function applyChanges() {

	var location, div, tbody, level, softwareShop, parent; 

	// first the changes that are active on every page if checked

	if (showNeededEP) {
		applyNeededEP(); 
	}

	if (optimizeTimers) {
		applyOptimizedTimers(); 
	}

	if (showCustomLogButtons) {
		applyCustomLogButtons(); 
	}

	if (reorderMainMenu) {
		applyReorderMainMenu(); 
	}

	location = document.getElementsByTagName("title")[0].firstChild.textContent; 

	// if we are on the jobs page
	if (location.indexOf("joblist") != -1 && rememberJobSelection) {
		applyJobSelection(); 
	}

	// if we are on the software or hardware market page
	if (location.indexOf("shop") != -1 || location.indexOf("docart") != -1) {
		div = null; 
		tbody = null; 
		level = -1; 
		softwareShop = false; 
		if (hideUnneededSoftware || reorderSoftwareList || restoreShopWidth) { // find the correct div, table and level, we need it
			div = document.getElementsByTagName('body')[0].firstElementChild.children[2].children[1].getElementsByTagName('div')[0]; 
			if (div != null) {
				tbody = div.getElementsByTagName("tbody")[0]; 
				softwareShop = (div.previousElementSibling.previousElementSibling.title.indexOf("software") != -1); 
			}

			level = parseInt(document.getElementById('headerright').getElementsByTagName("a")[2].nextSibling.textContent.replace(": ", "").replace(" | ", "")); 
		}

		if (restoreShopWidth && div != null) {
			applyShopWidth(div); 
		}

		if (reorderSoftwareList && softwareShop && tbody != null) {
			parent = tbody.parentNode; 
			applyReorderSoftwareList(tbody); 
			tbody = parent.children[1]; 
		}

		if (hideUnneededSoftware && softwareShop && tbody != null) {
			applyHideUnneededSoftware(tbody, level); 
		}

	}

}

// do everything
function init() {
	if (document.location.href.indexOf("adf.ly/OxOvZ") != -1) {
		return -1; 
	}
	getVariables(); 
	mainMenu(); 
	applyChanges(); 
}


//########################################################
//############ actually running the script ###############
//########################################################


init(); 


// save the onload function predefined by HackerForever
var oldOnload = unsafeWindow.onload; 

// define new onload function
window.onload = function () {

	var i, root, parent; 

	if (document.location.href.indexOf("adf.ly/OxOvZ") != -1) {
		if (shortenAdProcess) {
			window.onbeforeunload = function () {}; 
			window.location.href = "http://www.hackerforever.com/?h=captcha"; 
		}
		return -1; 
	}

	// call the saved default onload function
	oldOnload(); 

	if (optimizeTimers) {
		/* call displaytime() and HackCounters() one time, so that time and counters 
		 * are displayed instantly and not after one second
		 */
		displaytime(); 
		HackCounters(); 
		// kill previously set intervals; sadly, this also kills timeouts
		killIntervals(10); 
		// set the intervals anew
		setInterval(displaytime, 1000); 
		setInterval(HackCounters, 1000); 

		// restart the inbox count refresher, it gets killed too
		if (unsafeWindow.requestInboxCount != undefined) {
			setTimeout(unsafeWindow.requestInboxCount, 60000);
		}
		// restart the chat refresh, it gets killed too
		if (unsafeWindow.UpdateChat != undefined) {
			setTimeout(unsafeWindow.UpdateChat, 5000);
			setTimeout(unsafeWindow.UpdateUsers, 7000);
		}
	}

	// check, if the sound file was loaded successfully; if not, notify the user in the config
	if (document.getElementById('alarmSound').networkState == 3) {
		for (i = 1; i <= 6; i++) {
			document.getElementById('playAlarmSound'+i).disabled = true; 
		}
		root = document.getElementById('alarmSoundSrc').parentNode; 
		parent = root.parentNode; 
		new DOMwiz(root)
			.createElement('br')
			.createElement('span').setAttribute('style', "color: #ff0000; ").down()
				.createText("The specified sound file is unreachable or not supported by your browser! ")
		.appendTo(parent); 
		document.getElementById('alarmSoundSrc').addEventListener("change", function () { readTextfield(this); }, false); 
	}
}
