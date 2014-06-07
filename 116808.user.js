// ==UserScript==
// @name           Facebook blueBar New Color
// @namespace      Facebook
// @include        htt*://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @icon           http://tomtech.110mb.com/images/Facebook_black_logo.jpg
// @version        18
// @encoding       UTF-8
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://developers.facebook.com/*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://www.facebook.com/common/blank.html
// @exclude        htt*://*onnect.facebook.com/*
// @exclude        htt*://*acebook.com/connect*
// @exclude        htt*://*.facebook.com/plugins/*
// @exclude        htt*://*.facebook.com/l.php*
// @exclude        htt*://*.facebook.com/ai.php*
// @exclude        htt*://*.facebook.com/extern/*
// @exclude        htt*://*.facebook.com/pagelet/*
// @exclude        htt*://api.facebook.com/static/*
// @exclude        htt*://*.facebook.com/contact_importer/*
// @exclude        htt*://*.facebook.com/ajax/*
// ==/UserScript==




var startTime = +new(Date);
var protocol = (location.protocol === "https:" ? "https:" : "http:");

var Param = {
	version : 4,
	built : 100,
	lang : null,
	body : document.body,
	protocol : protocol,
	host : location.host,
	defaultSettings : {
		col : "303030",
		seccol : "202020",
		bordercol: "101010",
		opacity : "0.93"
	},
	canRun : (document.getElementById("blueBar") ? true : false),
	firstTime: false,
	iconurl: "data:image/png;base64,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",
	url : window.location.href,
	env : {}
};


var xPathSelector = function (b) {
	var o = this;
	var k = b;
	o.getSingleNodeValue = function () {
		try {
			return document.evaluate(k, document, null, 9, null).singleNodeValue
		} catch (q) {
			new ErrorHandler(q, "xPathSelector::getSingleNodeValue");
			return null
		}
	};
	o.getMultipleNodeValues = function () {
		try {
			return document.evaluate(k, document, null, 0, null)
		} catch (q) {
			new ErrorHandler(q, "xPathSelector::getMultipleNodeValues");
			return null
		}
	};
	o.numberValues = function () {
		try {
			return document.evaluate("count(" + k + ")", document, null, 0, null).numberValue
		} catch (q) {
			new ErrorHandler(q, "xPathSelector::numberValues");
			return -1
		}
	};
	o.toString = function () {
		return '[xPath Selector "' + k + '"]'
	}
};

var UserID = function UserID() {
	this.fromCookie = function () {
		try {
			var s = document.cookie.split("; ");
			for (i = 0; i < s.length; i++) {
				item = s[i].split("=");
				if (item[0] == "c_user") {
					return item[1]
				}
			}
			return 0
		} catch (exception) {}
		
		return null
	};
	this.parseEnv = function () {
		var scripts = (new xPathSelector("//script")).getMultipleNodeValues();
		while (script = scripts.iterateNext()) {
			if (/Env\s?=\s?\{.{10,}\};/.test(script.innerHTML)) {
				return script.innerHTML
			}
		}
	};
	this.fromEnvString = function () {
		if (!this.env) {
			return 0
		}
		return this.env.match(/user:\s?"?([0-9]+)"?,/)[1] || -1
	};
	this.fromEvalEnv = function () {
		if (!this.env) {
			return 0
		}
		try {
			eval(this.env);
			return Env.user || -1
		} catch (exception) {}
		
		return 0
	};
	this.env = this.parseEnv();
	this.getId = function () {
		if (userid = this.fromCookie()) {
			return {
				id : userid,
				from : "cookie"
			}
		}
		if (userid = this.fromEvalEnv()) {
			return {
				id : userid,
				from : "evalEnv"
			}
		}
		if (userid = this.fromEnvString()) {
			return {
				id : userid,
				from : "stringEnv"
			}
		}
		return {
			id : -1,
			from : ""
		}
	};
	this.getEnv = function () {
		if (!this.env) {
			return null
		}
		try {
			eval(this.env);
			return Env || null
		} catch (exception) {}
		
		return null
	}
};













var ErrorHandler = function(exception, from) {
    return;
    //Console.error(exception.constructor.name+(from?' from '+from:'')+' :\n'+exception.message);    
}

function Extend(q, o) {
	if (typeof o === "object") {
		var k;
		for (k in o) {
			if (o.hasOwnProperty(k)) {
				if (o[k] != null) {
					if (/Object/.test(o[k].constructor)) {
						if (k in q) {
							void(0)
						} else {
							q[k] = {}
							
						}
						Extend(q[k], o[k])
					} else {
						try {
							q[k] = o[k]
						} catch (b) {
							new ErrorHandler(b, "Extend()")
						}
					}
				}
			}
		}
	}
	return q
}


function setKey(o, k) {
	try {
		if (Param.env.isFirefox) {
			return GM_setValue(o, k)
		} else if (Param.env.isIE) {
			return window.localStorage["blueBar_" + o] = k
		} else {
			return window.localStorage.setItem("blueBar_" + o, k)
		}
	} catch (b) {
		Console.error("Fatal error: Can't store value " + o)
	}
}
function getKey(q, k) {
	var o;
	try {
		if (Param.env.isFirefox) {
			try {
				o = GM_getValue(q);
				if (typeof o == "undefined") {
					return k
				} else {
					return o
				}
			} catch (b) {
				new ErrorHandler(b, "getKey()")
			}	

		} else if (Param.env.isIE) {
			o = window.localStorage.getItem("blueBar_" + q)
			if (typeof o == "undefined") {
				return k
			} else {
				return o
			}
		} else {
			o = window.localStorage["blueBar_" + q];
			if (typeof o == "undefined") {
				return k
			} else {
				return o
			}
		}
	} catch (b) {
		//Console.error("Fatal error: Can't get stored value " + q);
		return k
	}
}


function initEnv() {
	if (Param.body) {
		Param.lang = (/fr_FR/.test(Param.body.className) ? "fr" : "en")
	}
	userAgent = navigator.userAgent.toLowerCase();
	isWindows = (/windows|win32/.test(this.userAgent));
	isMac = (/macintosh|mac os x/.test(this.userAgent));
	isLinux = (/linux/.test(this.userAgent));
	isGecko = /gecko/.test(this.userAgent);
	isWebkit = /webkit/.test(this.userAgent);
	isFirefox = this.isGecko && (/firefox/.test(this.userAgent));
	isOpera = /opera/.test(this.userAgent);
	isChrome = (/\bchrome\b/.test(this.userAgent));
	isSafari = /safari/.test(this.userAgent);
	isIE = /msie/.test(this.userAgent);
	isGM = (this["GM_registerMenuCommand"] ? true : false);
	Extend(Param.env, {
		userAgent : userAgent,
		isOpera : isOpera,
		isChrome : isChrome,
		isSafari : isSafari,
		isIE : isIE,
		isGecko : isGecko,
		isFirefox : isFirefox,
		isWindows : isWindows,
		isMac : isMac,
		isLinux : isLinux,
		isWebkit : isWebkit,
		isGM : isGM
	})
}

var EventMgr = {
	EVENTS : {
		mouseout : "mouseout",
		mousein : "mousein",
		mouseenter : "mouseenter",
		mouseleave : "mouseleave",
		mousemove : "mousemove",
		mouseover : "mouseover",
		mousedown : "mousedown",
		mouseup : "mouseup",
		readystatechange : "readystatechange",
		load : "load",
		change : "change",
		click : "click",
		keydown : "keydown",
		keyup : "keyup",
		DOMNodeInserted : "DOMNodeInserted",
		DOMAttrModified : "DOMAttrModified",
		DOMSubtreeModified : "DOMSubtreeModified",
		hashChanged : "hashchange",
		popState : "popstate"
	},
	addListener : function (o, b, q) {
		try {
			if ((o.addEventListener) && (this.EVENTS[b]) && (typeof q == "function")) {
				o.addEventListener(b, q, false)
			}
			return b
		} catch (k) {
			//new ErrorHandler(k, "EventMgr.addListener(" + q.toString() + ")");
			return false
		}
	},
	removeListener : function (o, b, q) {
		try {
			if ((o.addEventListener) && (this.EVENTS[b]) && (typeof q == "function")) {
				o.removeEventListener(b, q, false)
			}
			return b
		} catch (k) {
			//new ErrorHandler(k, "EventMgr.removeListener()");
			return false
		}
	}
};





function doSo(x) 
{
	if (document.getElementById(x).value.length == 6) {
		if (x == "color_1" && col != document.getElementById(x).value) {
			document.getElementById(x+"_show").style.backgroundColor = "#"+document.getElementById(x).value;
			col=document.getElementById(x).value;
			setKey(Profile.id+"_col", col);
			bluebar(true);
		}
		else if (x == "color_2" && seccol != document.getElementById(x).value) {
			document.getElementById(x+"_show").style.backgroundColor = "#"+document.getElementById(x).value;
			seccol=document.getElementById(x).value;
			setKey(Profile.id+"_seccol", seccol);
			bluebar(true);
		}
		else if (x == "color_3" && bordercol != document.getElementById(x).value) {
			document.getElementById(x+"_show").style.backgroundColor = "#"+document.getElementById(x).value;
			bordercol = document.getElementById(x).value;
			setKey(Profile.id+"_bordercol", bordercol);
			bluebar(true);
		}
		
	}
}




bluebar = function(do_check) {


	if (Param.canRun) {
		var st = "";

		if (do_check) {
			st = document.getElementById("colorise");
		}
		else {
			st = document.createElement("style");
			st.setAttribute("type","text/css");
			st.setAttribute("id","colorise");
		}

		if (!document.getElementById("colorise") || do_check) {
		
			//var st=document.createElement("style");st.setAttribute("type","text/css");st.setAttribute("id","colorise");
			// BG Color of the BlueBar
			st.innerHTML = '#blueBar{background-color:#'+col+';min-width:981px;width:100%;z-index:300}';
			// Bg color of the facebook logo
			st.innerHTML += '#pageLogo a{background-image:url('+Param.protocol+'://static.ak.fbcdn.net/rsrc.php/v1/yv/r/mTnxuar3oIS.png);background-repeat:no-repeat;background-position:0 -214px;background-color:#'+col+';display:block;height:31px;width:103px}';
			// BG Color on Hover Facebook logo
			st.innerHTML += '#pageLogo a:hover,#pageLogo a:focus,#pageLogo a:active{background-image:url('+Param.protocol+'://static.ak.fbcdn.net/rsrc.php/v1/yv/r/mTnxuar3oIS.png);background-repeat:no-repeat;background-position:0 -214px;background-color:#'+col+';outline:none}';
			// blueBar bottom border
			st.innerHTML += '.slim #blueBar{border-bottom:1px solid #'+bordercol+';box-shadow:0 0 2px rgba(0, 0, 0, .52);height:37px;position:relative}';
			// search Input side/bottom border color
			st.innerHTML += '.slimHeader #navSearch .uiTypeahead{background:none;border:solid 1px #'+bordercol+';border-top:solid 1px #'+col+';border-radius:2px}';
			// search input top border color
			st.innerHTML += '.slimHeader #navSearch .uiSearchInput{background:#fff;border-radius:1px;border-top:1px solid #'+bordercol+';height:20px;padding:0 0 1px}';
			// Profile picture side/bottom/top border color
			st.innerHTML += '.slimHeader #pageNav .headerTinymanPhoto{border:solid 1px #'+bordercol+';border-top:solid 1px #'+bordercol+';border-radius:2px;height:23px;margin:3px 5px 3px 3px;width:23px}';
			//st.innerHTML += '.slimHeader #pageNav a{color:#000000}';
			// On Hover bg color and text color
			st.innerHTML += '.slimHeader #pageNav .topNavLink:hover,.slimHeader #pageNav .topNavLink:focus,.slimHeader #pageNav .topNavLink:active,.slimHeader #pageNav .tinyman:hover a,.slimheader #pageNav .tinyman:focus a,.slimHeader #pageNav .tinyman:active a,.slimHeader #pageNav .topNavLink a:hover,.slimHeader #pageNav .topNavLink a:focus,.slimHeader #pageNav .topNavLink a:active{background-color:#'+seccol+';color:#FFF;height:31px}';
			// link text color 
			st.innerHTML += '.slimHeader #pageNav a{color:#FFFFFF}';
			// separateur color
			st.innerHTML += '.slimHeader #pageNav li.tinyman:after,.slimHeader #pageNav li.middleLink:after{background:#'+seccol+';content:" ";display:inline-block;float:right;margin-top:9px;width:1px;height:14px}';
			st.innerHTML += '.slimHeader #pageNav .topNavLink:hover:after{background:#'+seccol+'}';
			
			
			st.innerHTML += '.slimHeader #fbMessagesJewel a.jewelButton{background-image:url('+Param.iconurl+');background-repeat:no-repeat;background-position:-56px -72px}';
			st.innerHTML += '.slimHeader #fbMessagesJewel a.jewelButton:active,.slimHeader #fbMessagesJewel a.jewelButton:focus,.slimHeader #fbMessagesJewel a.jewelButton:hover{background-image:url('+Param.iconurl+');background-repeat:no-repeat;background-position:-31px -37px;background-color: #'+seccol+'}';
			st.innerHTML += '.slimHeader #fbMessagesJewel.hasNew a.jewelButton{background-image:url('+Param.iconurl+');background-repeat:no-repeat;background-position:-56px -37px}';
			st.innerHTML += '.slimHeader #fbMessagesJewel.openToggler a.jewelButton{background-image:url('+Param.iconurl+') !important;background-repeat:no-repeat !important;background-position:-31px -72px !important}';
			st.innerHTML += '.slimHeader #fbNotificationsJewel a.jewelButton{background-image:url('+Param.iconurl+');background-repeat:no-repeat;background-position:-25px -247px}';
			st.innerHTML += '.slimHeader #fbNotificationsJewel a.jewelButton:active,.slimHeader #fbNotificationsJewel a.jewelButton:focus,.slimHeader #fbNotificationsJewel a.jewelButton:hover{background-image:url('+Param.iconurl+');background-repeat:no-repeat;background-position:-31px -107px;background-color: #'+seccol+'}';
			st.innerHTML += '.slimHeader #fbNotificationsJewel.hasNew a.jewelButton{background-image:url('+Param.iconurl+');background-repeat:no-repeat;background-position:-56px -107px}';
			st.innerHTML += '.slimHeader #fbNotificationsJewel.openToggler a.jewelButton{background-image:url('+Param.iconurl+') !important;background-repeat:no-repeat !important;background-position:0 -247px !important}';
			st.innerHTML += '.slimHeader #fbRequestsJewel a.jewelButton{background-image:url('+Param.iconurl+');background-repeat:no-repeat;background-position:-31px -2px}';
			st.innerHTML += '.slimHeader #fbRequestsJewel a.jewelButton:active,.slimHeader #fbRequestsJewel a.jewelButton:focus,.slimHeader #fbRequestsJewel a.jewelButton:hover{background-image:url('+Param.iconurl+');background-repeat:no-repeat;background-position:-50px -247px;background-color: #'+seccol+'}';
			st.innerHTML += '.slimHeader #fbRequestsJewel.hasNew a.jewelButton{background-image:url('+Param.iconurl+');background-repeat:no-repeat;background-position:-75px -247px}';
			st.innerHTML += '.slimHeader #fbRequestsJewel.openToggler a.jewelButton{background-image:url('+Param.iconurl+') !important;background-repeat:no-repeat !important;background-position:-56px -2px !important}';
			st.innerHTML += '.slimHeader #pageLogo a,.slimHeader #pageLogo a:hover,.slimHeader #pageLogo a:focus,.slimHeader #pageLogo a:active{background-image:url('+Param.iconurl+');background-repeat:no-repeat;background-position:0 -214px;height:31px;margin-top:6px}';
			
			// Separateur dans le Menu
			st.innerHTML += '.slimHeader #pageNav .menuDivider{background:#ddd;font-size:0;height:1px;line-height:0;margin:6px 7px}';
			
			
			
			st.innerHTML += '.slimHeader #pageNav #navAccount ul a:hover,.slimHeader #pageNav #navAccount ul a:focus,.slimHeader #pageNav #navAccount ul a:active,.slimHeader #pageNav #navAccount .logoutButton:hover input,.slimHeader #pageNav #navAccount .logoutButton input:active,.slimHeader #pageNav #navAccount .logoutButton input:focus{background:#'+col+';border-bottom:solid 1px #'+bordercol+';border-top:solid 1px #'+bordercol+';color:#fff}';
			
			// Nav submenu Background color + text color
			st.innerHTML += '.slimHeader #pageNav #navAccount .navSubmenu:hover,.slimHeader #pageNav #navAccount .navSubmenu:focus,.slimHeader #pageNav #navAccount .navSubmenu:active{background:#'+col+';border-bottom:solid 1px #'+bordercol+';border-top:solid 1px #'+bordercol+';color:#fff}';
			
			
			//document.getElementById('navigation').style.opacity = "1";
		}
		
		if (!do_check) {
			document.body.appendChild(st);
			
			//document.getElementById("blueBar").setAttribute("style", "top:0px;position:fixed;-moz-box-shadow: 0px 0px 3px 2px #797979;z-index:100;");
			//document.getElementById("blueBar").setAttribute("style", "position:fixed;-moz-box-shadow: 0px 0px 3px 2px #797979;");
			document.getElementById('blueBar').style.opacity = opacity;
		}
			
		

		if (document.getElementById("SettingsPage_Content") && !document.getElementById("colors_id")) {
			//alert(document.getElementById('navItem_account').className);
			if (document.getElementById('navItem_account').className == "sideNavItem stat_elem open open selectedItem" || document.getElementById('navItem_account').className == "sideNavItem stat_elem open selectedItem open") {
				document.getElementById("SettingsPage_Content").childNodes.item(0).innerHTML += '<li class="fbSettingsListItem clearfix uiListItem uiListLight uiListVerticalItemBorder " id="colors_id"><BR><span class="fbSettingsListItemContent fcg"><center>Souscrivez à Groupon et vous pourrez changer la couleur de la barre facebook. <a href="http://www.skyhasnolimit.com/Groupon/index2.php">Cliquez ICI</a></center></span><a class="pvm phs fbSettingsListLink clearfix " href="/settings?tab=account&amp;section=colors" rel="async"><span class="pls fbSettingsListItemLabel"><strong> Facebook colors </strong></span><span class="fbSettingsListItemContent fcg"><input type="text" id="color_1" name="fvedv" size="6" maxlength="6" value="'+col+'"> <input readonly type="text" id="color_1_show" style="background-color: #'+col+'" size="2" maxlength="2" value=""> <br> <input type="text" id="color_2" name="color_2" size="6" maxlength="6" value="'+seccol+'"> <input readonly type="text" id="color_2_show" style="background-color: #'+seccol+'" size="2" maxlength="2" value=""> <br><input type="text" id="color_3" name="color_3" size="6" maxlength="6" value="'+bordercol+'"> <input readonly type="text" id="color_3_show" style="background-color: #'+bordercol+'" size="2" maxlength="2" value=""></span></a></li>';


				EventMgr.addListener(document.getElementById("color_1"), EventMgr.EVENTS.keyup, function () {
					doSo(this.id);
				})
				EventMgr.addListener(document.getElementById("color_2"), EventMgr.EVENTS.keyup, function () {
					doSo(this.id);
				})
				EventMgr.addListener(document.getElementById("color_3"), EventMgr.EVENTS.keyup, function () {
					doSo(this.id);
				})
			}
		}
	}
		
    setTimeout(function () {
        bluebar()
    }, 5000)

};


var col = Param.defaultSettings.col;
var seccol = Param.defaultSettings.seccol;
var bordercol = Param.defaultSettings.bordercol;
var opacity = Param.defaultSettings.opacity;


initEnv();


if (Param.env.isIE) {
	var name = "c_user";
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) user_id = c.substring(nameEQ.length,c.length);
    }
	if (user_id) {
		var Profile = {
			id : user_id
		}
	}
}

else {
	c_user = new(UserID);
	if (c_user.getId) {
		var Profile = c_user.getId()
	} else {
		var Profile = {
			id : c_user
		}
	}
}


	
if (Profile.id > 0) {
	if (getId = getKey(Profile.id+"_col")) { col = getId; }
	if (getId = getKey(Profile.id+"_seccol")) { seccol = getId; }
	if (getId = getKey(Profile.id+"_bordercol")) { bordercol = getId; }
	if (getId = getKey(Profile.id+"_opacity")) { opacity = getId; }
	bluebar(false);	
}
