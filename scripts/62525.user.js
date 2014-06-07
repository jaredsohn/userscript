// ==UserScript==
// @name           UJU - Ujura and Uju
// @namespace      http://www.hatena.ne.jp/Nikola/
// @description    User JavaScript for UKAGAKA - Ghost "Ujura and Uju"
// @version        1.0.9
// @include        http://*/*
// @include        https://*/*
// ==/UserScript==
/**
 * Usage: hover your mouse on the blue box in the lower right of the page.
 */
(function(){
/**
 * This script is based on SUKURI.
 * @see http://www.sepia.dti.ne.jp/macrobiotica/
 */
var PRE = "sukuri";
var sukuri = new Object();
sukuri.VERSION = "1.0.9";
sukuri.LAST_UPDATE = "2011.01.14";
sukuri.PRE = PRE;
sukuri.settings = {
	bootAfterPageLoad: false,
	charNum: 2,
	talkInterval: 30000,
	scriptInterval: 60,
	balloonTimeout: 3000,
	choiceTimeout: 10000
};
/**
 * This script run at IE8, Firefox3.5, Opera10, Safari4, and Google Chrome3.
 */
var isOverIE8 = (navigator.userAgent.indexOf("MSIE")!=-1 && navigator.userAgent.indexOf("Trident/4.0")!=-1);
if (!(document.addEventListener || isOverIE8)) return;
if (!(self && top)) return;
if (self.location.href != top.location.href) return;
var isMSIE = /*@cc_on!@*/false,
	isOpera = !!this.opera,
	isFirefox = !!this.Components,
	isChromium = !!this.chromium,
	isSafari = this.getMatchedCSSRules && !isChromium;
/**
 * @see http://www.vividcode.info/js/event/eventListener.xhtml
 */
var addListener = (function(){
	if (window.addEventListener) {
		return function(target, type, func){
			target.addEventListener(type, func, false);
			return true;
		};
	}
	else if (window.attachEvent) {
		return function(target, type, func){
			var i = 0;
			var hasBeenAdded = false;
			if (!target._vividcode_el) {
				target._vividcode_el = new Array(0);
				window.attachEvent("onunload", function myself(evt){
					for (i = 0; i < target._vividcode_el.length; i++) {
						target._vividcode_el[i][0] = null;
						target._vividcode_el[i][1] = null;
						target._vividcode_el[i] = null;
					}
					target._vividcode_el = null;
					window.detachEvent("onunload", myself);
				});
			}
			hasBeenAdded = false;
			for (i = 0; i < target._vividcode_el.length; i++) {
				if (target._vividcode_el[i][0] === func) {
					hasBeenAdded = true;
					break;
				}
			}
			if (!hasBeenAdded) {
				i = target._vividcode_el.length;
				target._vividcode_el[i] = new Array(func, function(evt){
					evt.currentTarget = target;
					func(evt);
				});
			}
			target.detachEvent("on" + type, target._vividcode_el[i][1]);
			target.attachEvent("on" + type, target._vividcode_el[i][1]);
			window.attachEvent("onunload", (function(){
				var func = target._vividcode_el[i][1];
				return function myself(evt){
					target.detachEvent("on" + type, func);
					window.detachEvent("onunload", myself);
				};
			})());
			return true;
		};
	}
	else {
		return function(target, type, func){
			return false;
		};
	}
})();
/**
 * @see http://www.vividcode.info/js/event/eventListener.xhtml
 */
var removeListener = (function(){
	if (window.removeEventListener) {
		return function(target, type, func){
			target.removeEventListener(type, func, false);
			return true;
		};
	}
	else if (window.detachEvent) {
		return function(target, type, func){
			var i = 0;
			var hasBeenAdded = false;
			hasBeenAdded = false;
			for (i = 0; i < target._vividcode_el.length; i++) {
				if (target._vividcode_el[i][0] === func) {
					hasBeenAdded = true;
					break;
				}
			}
			if (hasBeenAdded) {
				target.detachEvent("on" + type, target._vividcode_el[i][1]);
			}
			return true;
		};
	}
	else {
		return function(target, type, func){
			return false;
		}
	}
})();
/**
 * @see http://www.albert2005.co.jp/study/javascript/miscellaneous.html
 */
var Root = /BackCompat/i.test(document.compatMode) ? document.body
																									 : document.documentElement;

var setTextContent = function(nd, txt) {
	if (typeof nd.textContent != "undefined")
		nd.textContent = txt;
	else
		nd.innerText = txt;	
};
var getTextContent = function(nd) {
	return (typeof nd.textContent != "undefined") ? nd.textContent : nd.innerText;
};
/**
 * @see http://gist.github.com/52682
 */
var addCSS = function(css){
	var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
	var sheet, self = arguments.callee;
	if (document.createStyleSheet) { // for IE
		sheet = document.createStyleSheet();
		sheet.cssText = css;
		return sheet;
	}
	else if (!self.__style || !self.__root) {
		sheet = document.createElementNS(HTML_NAMESPACE, 'style');
		sheet.type = 'text/css';
		self.__style = sheet;
		self.__root = document.getElementsByTagName('head')[0] || document.documentElement;
	}
	sheet = self.__style.cloneNode(false);
	setTextContent(sheet, css);
	return self.__root.appendChild(sheet).sheet;
};
if (!window.sukuri) window.sukuri = sukuri;
sukuri.shiori = {
		GET: {
			OnBoot: function(reference){
				var talk = [
					 "\\1\\s[10]\\0\\s[0]\u3046\u3058\u3085\u3089\u3067\u3059\u3002\\_w[1000]\\1\\s[10]\u3046\u3058\u3085\u3046\u3067\u3059\u3002\\e"
					,"\\0\\s[0]\\1\\s[10]\u30ef\u30bf\u30b7\u30cf \\w8\u30b4\u30fc\u30b9\u30c8 \\w8\u30a6\u30b8\u30e5\u30a6\\_w[1000]\\0\\s[0]\u30b3\u30f3\u30b4\u30c8\u30e2\u30e8\u30ed\u30b7\u30af\u2026\u3002\\e"
					,"\\1\\s[10]\\0\\s[0]\u304a\u547c\u3073\u3067\u3057\u3087\u3046\u304b\u3054\u4e3b\u4eba\u3055\u307e\u3002\\_w[1000]\\1\\s[10]\u4f3c\u5408\u308f\u306a\u3044\u30bb\u30ea\u30d5\u306f\u3084\u3081\u306a\u3088\u3002\\_w[1000]\\0\\s[1]\\n\u3048\u30fc\u3001\\w8\u304b\u308f\u3044\u3044\u3058\u3083\u3093\u3002\\e"
					,"\\0\\s[0]\\1\\s[10]\u3080\u2026\u3001\\w8" + document.title + "\u304c\u597d\u304d\u306a\u306e\u304b\uff1f\\_w[1000]\\0\\s[1]\u3069\u3046\u3060\u3063\u3066\u3044\u3044\u3058\u3083\u306a\u3044\u2026\u3002\\e"
					,"\\1\\s[10]\\0\\s[0]\u3046\u3058\u3085\u3089\u3060\u3051\u3069\u4f55\u304b\u8cea\u554f\u3042\u308b\uff1f\\_w[1000]\\1\\s[10]\u8ab0\u3060\u3088\u3002\\e"
				];
				return talk[Math.floor(Math.random() * talk.length)];
			},
			OnAITalk: function(reference){
				var talk = [
					 "\\0\\s[0]\u2026\\w8\u2026\\w8\u2026\\w8\uff01\uff01\\_w[1000]\\1\\s[10]\u2026\u3069\u3046\u3057\u305f\u306e\u3002\\_w[1000]\\0\\n\\s[1]\u307e\u3070\u305f\u304d\u306e\u7df4\u7fd2\u3002\\_w[1000]\\1\\n\u2026\u3061\u3087\u3063\u3068\u96e3\u3057\u3044\u3093\u3060\u3088\u306a\u2026\u3002\\e"
					,"\\0\\s[0]\u30c7\u30b9\u30af\u30c8\u30c3\u30d7\u306e\u4e16\u754c\u306b\u3082\u30dc\u30af\u305f\u3061\u306e\u4ef2\u9593\u304c\u3044\u308b\u3089\u3057\u3044\u3088\u3002\\_w[1000]\\1\\s[10]\u3048\u30fc\u3001\\w8\u3042\u3093\u306a\u72ed\u3044\u6240\u306b\u66ae\u3089\u3057\u3066\u308b\u5974\u306a\u3093\u3066\u3044\u308b\u308f\u3051\u306a\u3044\u3088\u3002\\_w[1000]\\0\\n\\s[1]\u305d\u3046\u304b\u306a\u3041\u2026\u3002\\e"
					,"\\0\\s[0]\u2026\u30dc\u30af\u305f\u3061\u3001\\w8\u304a\u90aa\u9b54\u3058\u3083\u306a\u3044\u3067\u3059\u304b\uff1f\\_w[1000]\\1\\s[11]\u305d\u306e\u3053\u3068\u306b\u306f\u89e6\u308c\u308b\u306a\uff01\\e"
					,"\\0\\s[0]\u30dc\u30af\u305f\u3061\u306f\u3001JavaScript\u3063\u3066\u3044\u3046\u8a00\u8449\u3092\u4f7f\u3063\u3066\u558b\u3063\u3066\u308b\u3093\u3060\u3088\u3002\\_w[1000]\\1\\s[10]Web\u30d6\u30e9\u30a6\u30b6\u30fc\u3067\u52d5\u4f5c\u3059\u308b\u30d7\u30ed\u30b0\u30e9\u30df\u30f3\u30b0\u8a00\u8a9e\u306a\u306e\u3055\u3002\\_w[1000]\\0\\c\\s[1]\u2026\u30dc\u30af\u3001\u30d7\u30ed\u30b0\u30e9\u30df\u30f3\u30b0\u306f\u82e6\u624b\u3060\u3088\u2026\u3002\\_w[1000]\\1\\c\u2026\u305d\u306e\u3046\u3061\u8ab0\u304b\u304c\u7c21\u5358\u306b\u4f7f\u3048\u308b\u3088\u3046\u306b\u3057\u3066\u304f\u308c\u308b\u3088\u3001\\w8\u304d\u3063\u3068\u2026\u3002\\e"
					,"\\1\\s[10]JavaScript\u306e\u6587\u5b57\u5217\u3067\u300c\\\\\u300d\u3092\u8868\u3059\u306b\u306f\u3001\\w8\u300c\\\\\\\\\u300d\u3063\u3066\uff12\u56de\u66f8\u304b\u306a\u3044\u3068\u3044\u3051\u306a\u3044\u3093\u3060\u3002\\_w[1000]\\0\\s[1]\u9762\u5012\u3060\u306d\u3002\\e"
				];
				return talk[Math.floor(Math.random() * talk.length)];
			},
			OnMouseDoubleClick: function(reference){
				switch (reference[3]) {
					case 0:
						switch (reference[4]) {
							case "Head":
								var talk = [
									  "\\0\\s[1]\u75db\u3044\u2026\u3002\\e"
									 ,"\\0\\s[1]\u53e9\u304b\u306a\u3044\u3067\u3088\u2026\u3002\\e"
								];
								return talk[Math.floor(Math.random() * talk.length)];
							case "Bust":
								var talk = [
									  "\\0\\s[1]\u3044\u3084\u3093\u3002\\e"
									 ,"\\0\\s[1]\u3084\u3081\u3066\u3088\u2026\u3002\\e"
								];
								return talk[Math.floor(Math.random() * talk.length)];
							default:
								var talk = [
									 "\\0\\s[0]\u306a\u3093\u3067\u3059\u304b\uff1f\\n\\![*]\\q[\u4f55\u304b\u8a71\u3057\u3066,talk]\\n\\![*]\\q[\u7d42\u4e86,close]\\n\\![*]\\q[\u4f55\u3067\u3082\u306a\u3044,Menu_CANCEL]\\e"
								];
								return talk[Math.floor(Math.random() * talk.length)];
						}
					case 1:
						switch (reference[4]) {
							case "Head":
								var talk = [
									  "\\1\\s[10]\u75db\u3044\u3093\u3067\u3059\u3051\u3069\u3002\\e"
									 ,"\\1\\s[10]\u3044\u3044\u5ea6\u80f8\u3060\u3002\\e"
								];
								return talk[Math.floor(Math.random() * talk.length)];
							case "Bust":
								var talk = [
									  "\\1\\s[11]\u3064\u30fc\\w8\u3064\u30fc\\w8\u304f\u30fc\\w8\u306a\u30fc\u3002\\e"
									 ,"\\1\\s[10]\u5909\u306a\u3068\u3053\u308d\u3092\u3064\u3064\u304b\u306a\u3044\u3067\u3044\u305f\u3060\u304d\u305f\u3044\u3002\\e"
								];
								return talk[Math.floor(Math.random() * talk.length)];
							default:
								var talk = [
									 "\\1\\s[10]\u3064\u3064\u304f\u306a\u3089\u3046\u3058\u3085\u3089\u3092\u3064\u3064\u304d\u3084\u3002\\e"
									,"\\1\\s[10]\u30e1\u30cb\u30e5\u30fc\u306a\u3089\u3046\u3058\u3085\u3089\u306b\u983c\u3093\u3067\u304f\u3060\u3055\u3044\u3002\\e"
								];
								return talk[Math.floor(Math.random() * talk.length)];
						}
					default:
						return "\\e";
				}
			},
			OnMouseMove: function(reference){
				switch (reference[3]) {
					case 0:
						switch (reference[4]) {
							case "Head":
								if (typeof sukuri.shiori.variable._0HeadMouseMove == "undefined") sukuri.shiori.variable._0HeadMouseMove = 0;
								sukuri.shiori.variable._0HeadMouseMove++;
								if (sukuri.shiori.variable._0HeadMouseMove < 50) return null;
								sukuri.shiori.variable._0HeadMouseMove = 0;
								var talk = [
									  "\\0\\s[1]\u3093\u2026\uff1f\\e"
									 ,"\\0\\s[1]\u8912\u3081\u3066\u3093\u306e\u2026\uff1f\\e"
								];
								return talk[Math.floor(Math.random() * talk.length)];
							case "Bust":
								if (typeof sukuri.shiori.variable._0BustMouseMove == "undefined") sukuri.shiori.variable._0BustMouseMove = 0;
								sukuri.shiori.variable._0BustMouseMove++;
								if (sukuri.shiori.variable._0BustMouseMove < 50) return null;
								sukuri.shiori.variable._0BustMouseMove = 0;
								var talk = [
									  "\\0\\s[1]\u4f55\u51e6\u89e6\u3063\u3066\u3093\u306e\u3002\\e"
									 ,"\\0\\s[1]\u3061\u3087\u3063\u3068\u2026\u3002\\e"
								];
								return talk[Math.floor(Math.random() * talk.length)];
							default:
								return null;
						}
					case 1:
						switch (reference[4]) {
							case "Head":
								if (typeof sukuri.shiori.variable._1HeadMouseMove == "undefined") sukuri.shiori.variable._1HeadMouseMove = 0;
								sukuri.shiori.variable._1HeadMouseMove++;
								if (sukuri.shiori.variable._1HeadMouseMove < 50) return null;
								sukuri.shiori.variable._1HeadMouseMove = 0;
								var talk = [
									  "\\1\\s[10]\u6c17\u8efd\u306b\u89e6\u3089\u306a\u3044\u3067\u9802\u304d\u305f\u3044\u3002\\e"
									 ,"\\1\\s[10]\u306a\u3067\u3066\u3082\u4f55\u3082\u51fa\u306a\u3044\u305e\u3002\\e"
								];
								return talk[Math.floor(Math.random() * talk.length)];
							case "Bust":
								if (typeof sukuri.shiori.variable._1BustMouseMove == "undefined") sukuri.shiori.variable._1BustMouseMove = 0;
								sukuri.shiori.variable._1BustMouseMove++;
								if (sukuri.shiori.variable._1BustMouseMove < 50) return null;
								sukuri.shiori.variable._1BustMouseMove = 0;
								var talk = [
									  "\\1\\s[11]\u5909\u614b\u3060\u30fc\uff01\\e"
									 ,"\\1\\s[10]\u30e2\u30d5\u30e2\u30d5\u3057\u307e\u305b\u3093\u3002\\e"
								];
								return talk[Math.floor(Math.random() * talk.length)];
							default:
								return null;
						}
					default:
						return null;
				}
			},
			OnMouseLeave: function(reference){
				switch (reference[3]) {
					case 0:
						switch (reference[4]) {
							case "Head":
								sukuri.shiori.variable._0HeadMouseMove = 0;
								return null;
							case "Bust":
								sukuri.shiori.variable._0BustMouseMove = 0;
								return null;
							default:
								return null;
						}
					case 1:
						switch (reference[4]) {
							case "Head":
								sukuri.shiori.variable._1HeadMouseMove = 0;
								return null;
							case "Bust":
								sukuri.shiori.variable._1BustMouseMove = 0;
								return null;
							default:
								return null;
						}
					default:
						return null;
				}
			},
			OnChoiceSelect: function(reference){
				switch (reference[0]) {
					case "talk":
						return sukuri.shiori.GET.OnAITalk();
					case "close":
						return "\\0\\s[1]\u3046\u3093\u2026\u3002\\_w[1000]\\n\\s[0]\u3058\u3083\u3042\u306d\u30fc\u3002\\_w[2000]\\-";
					case "Menu_CANCEL":
					default:
						return "\\e";
				}
			},
			OnClose: function(reference){
				var talk = [
					 "\\0\\s[0]\u305d\u308d\u305d\u308d\u5f15\u3063\u8fbc\u307f\u307e\u3059\u306d\u3002\\_w[1000]\\1\\s[10]\u30d6\u30e9\u30a6\u30b6\u306e\u4e2d\u306f\u9000\u5c48\u306a\u3093\u3060\u3088\u306a\u2026\u3002\\_w[2000]\\-"
					,"\\1\\s[10]\u3082\u3046\u7d42\u308f\u308a\u304b\u3002\\_w[1000]\\0\\s[1]\u304a\u90aa\u9b54\u3057\u307e\u3057\u305f\u3002\\_w[2000]\\-"
				];
				return talk[Math.floor(Math.random() * talk.length)];
			},
			OnGhostChanging: function(reference){//reference[0] is null...
				var talk = [
					"\\0\\s[0]\u305d\u308c\u3058\u3083\u3002\\_w[1000]\\1\\s[10]" + reference[2] + "\u3055\u3093\u3088\u308d\u3057\u304f\u3002\\_w[2000]\\-"
				];
				return talk[Math.floor(Math.random() * talk.length)];
			},
			OnOtherGhostClosed: function(reference){
				var talk = [
					"\\0\\s[0]" + reference[0] + "\u3055\u3093\u304a\u75b2\u308c\u69d8\u3067\u3057\u305f\u3002\\_w[1000]\\e"
				];
				return talk[Math.floor(Math.random() * talk.length)];
			},
			OnGhostCalling: function(reference){//reference[0] is null...
				var talk = [
					"\\0\\s[0]" + reference[2] + "\u3055\u3093\u3002\\_w[1000]\\1\\s[10]\u3044\u3089\u3063\u3057\u3083\u30fc\u3044\u3002\\_w[1000]\\e"
				];
				return talk[Math.floor(Math.random() * talk.length)];
			}
		}
	};
sukuri.shiori.variable = new Object();
sukuri.ShioriResource = {
	 char0_defaultx: Root.clientWidth - 180
	,char0_defaulty: Root.clientHeight - 70
	,char1_defaultx: 100
	,char1_defaulty: Root.clientHeight - 70
	,char0_recommendbuttoncaption: "\u3046\u3058\u3085\u3089\u306e\u304a\u3059\u3059\u3081"
	,char0_recommendsites: [
		 {
			 title: "Mozilla Japan"
			,url: "http://mozilla.jp/"
			,banner: ""
			,comment: ""
		}
		,{
			 title: "Opera"
			,url: "http://www.opera.com/"
			,banner: ""
			,comment: ""
		}
		,{
			 title: "Apple"
			,url: "http://www.apple.com/jp/"
			,banner: ""
			,comment: ""
		}
		,{
			 title: "Google"
			,url: "http://www.google.co.jp/"
			,banner: ""
			,comment: ""
		}
	]
	,char0_portalsites: [
		 {
			 title: "Disc-2"
			,url: "http://disc2.s56.xrea.com/"
			,banner: "http://disc2.s56.xrea.com/image/disc_2.gif"
			,comment: ""
		}
		,{
			 title: "\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9 - \u5927\u516b\u6d32.NET"
			,url: "http://www.ooyashima.net/db/"
			,banner: ""
			,comment: ""
		}
	]
	,char1_recommendbuttoncaption: "\u3046\u3058\u3085\u3046\u306e\u304a\u3059\u3059\u3081"
	,char1_recommendsites: [
		 {
			 title: "\u307e\u304f\u308d\u3073\u304a\u3066\u3043\u304b"
			,url: "http://www.sepia.dti.ne.jp/macrobiotica/"
			,banner: ""
			,comment: ""
		}
		,{
			 title: "Kamo&Negis!"
			,url: "http://files.getdropbox.com/u/265158/"
			,banner: ""
			,comment: ""
		}
		,{
			 title: "\u3042\u308c\u304b\uff1f"
			,url: "http://ranka.googlecode.com/hg/ranka/src/areka/i.html"
			,banner: ""
			,comment: ""
		}
	]
};
sukuri.GhostDescript = {
	 id: "uju"
	,name: "\u3046\u3058\u3085\u3089\uff06\u3046\u3058\u3085\u3046"
	,char0_name: "\u3046\u3058\u3085\u3089"
	,char1_name: "\u3046\u3058\u3085\u3046"
	,char0_seriko_defaultsurface: 0
	,char1_seriko_defaultsurface: 10
};
sukuri.ShellDescript = {
	 char0_balloon_offsetx: -70
	,char0_balloon_offsety: -170
	,char1_balloon_offsetx: -70
	,char1_balloon_offsety: -120
};
sukuri.ShellSurfaces = {
	 surface0 : {
	 	 Head: "16,18,48,32"
		,Bust: "22,45,47,55"
	}
	,surface1 : {
		 Head: "18,13,53,26"
		,Bust: "25,38,47,51"
	}
	,surface10 : {
		 Head: "12,8,51,23"
		,Bust: "32,38,48,48"
	}
	,surface11 : {
		 Head: "10,10,52,23"
		,Bust: "24,39,55,55"
	}
};
sukuri.cssInit = function(){
	var sheet = addCSS(["\
#", sukuri.PRE, " div, #", sukuri.PRE, " ul, #", sukuri.PRE, " li {\n\
	margin: 0;\n\
	padding: 0;\n\
}\n\
#", sukuri.PRE, " span, #", sukuri.PRE, " a {\n\
	font-size: 100%;\n\
	font-weight: normal;\n\
	font-family:'\u30d2\u30e9\u30ae\u30ce\u89d2\u30b4 Pro W3','Hiragino Kaku Gothic Pro','\u30e1\u30a4\u30ea\u30aa',Meiryo,'\uff2d\uff33 \uff30\u30b4\u30b7\u30c3\u30af',sans-serif;\n\
}\n\
#", sukuri.PRE, " img {\n\
	border: 0;\n\
}\n\
#", sukuri.PRE, " ul {\n\
	list-style:none;\n\
}\n\
#", sukuri.PRE, "_Banner {\n\
	width: auto;\n\
	height: auto;\n\
	z-index: 9001;\n\
	position: fixed;\n\
	bottom: 20px;\n\
}\n\
#", sukuri.PRE, "_Banner > img {\n\
	width: auto;\n\
	height: auto;\n\
}\n\
#", sukuri.PRE, " > div.", sukuri.PRE, "_Shell {\n\
	position: fixed;\n\
	background-repeat: no-repeat;\n\
	cursor: move;\n\
	-o-transition: opacity 0.2s linear;\n\
	-moz-transition: opacity 0.2s linear;\n\
	-webkit-transition: opacity 0.2s linear;\n\
	transition: opacity 0.2s linear;\n\
}\n\
#", sukuri.PRE, " > div.", sukuri.PRE, "_Shell:active {\n\
	opacity: 0.7;\n\
}\n\
.", sukuri.PRE, "_surface0 {\n\
	background-image: url(", sukuri.surfaces.surface0 , ");\n\
}\n\
.", sukuri.PRE, "_surface1 {\n\
	background-image: url(", sukuri.surfaces.surface1 , ");\n\
}\n\
.", sukuri.PRE, "_surface10 {\n\
	background-image: url(", sukuri.surfaces.surface10 , ");\n\
}\n\
.", sukuri.PRE, "_surface11 {\n\
	background-image: url(", sukuri.surfaces.surface11 , ");\n\
}\n\
#", sukuri.PRE, "_Shell0 {\n\
	width: 75px;\n\
	height: 75px;\n\
}\n\
@-webkit-keyframes fuwafuwa0 {\n\
	0% {\n\
		background-position: 0px 0px;\n\
	}\n\
	50% {\n\
		background-position: 5px 10px;\n\
	}\n\
	100% {\n\
		background-position: 10px 0px;\n\
	}\n\
}\n\
#", sukuri.PRE, "_Shell0 {\n\
	-webkit-animation-name: fuwafuwa0;\n\
	-webkit-animation-duration: 2.3s;\n\
	-webkit-animation-timing-function: linear;\n\
	-webkit-animation-iteration-count: infinite;\n\
	-webkit-animation-direction: alternate;\n\
}\n\
@-webkit-keyframes fuwafuwa0_collision {\n\
	0% {\n\
		-webkit-transform: translateX(0px) translateY(0px);\n\
	}\n\
	50% {\n\
		-webkit-transform: translateX(5px) translateY(10px);\n\
	}\n\
	100% {\n\
		-webkit-transform: translateX(10px) translateY(0px);\n\
	}\n\
}\n\
#", sukuri.PRE, "_Shell0_Head, #", sukuri.PRE, "_Shell0_Bust {\n\
	-webkit-animation-name: fuwafuwa0_collision;\n\
	-webkit-animation-duration: 2.3s;\n\
	-webkit-animation-timing-function: linear;\n\
	-webkit-animation-iteration-count: infinite;\n\
	-webkit-animation-direction: alternate;\n\
}\n\
#", sukuri.PRE, "_Shell0_Head {\n\
	position: absolute;\n\
	left: 16px;\n\
	top: 18px;\n\
	width: 32px;\n\
	height: 14px;\n\
	cursor: pointer;\n\
}\n\
#", sukuri.PRE, "_Shell0_Bust {\n\
	position: absolute;\n\
	left: 22px;\n\
	top: 45px;\n\
	width: 25px;\n\
	height: 10px;\n\
}\n\
#", sukuri.PRE, "_Shell1 {\n\
	width: 65px;\n\
	height: 75px;\n\
}\n\
@-webkit-keyframes fuwafuwa1 {\n\
	0% {\n\
		background-position: 0px 0px;\n\
	}\n\
	100% {\n\
		background-position: 0px 10px;\n\
	}\n\
}\n\
#", sukuri.PRE, "_Shell1 {\n\
	-webkit-animation-name: fuwafuwa1;\n\
	-webkit-animation-duration: 0.7s;\n\
	-webkit-animation-timing-function: ease-in-out;\n\
	-webkit-animation-iteration-count: infinite;\n\
	-webkit-animation-direction: alternate;\n\
}\n\
@-webkit-keyframes fuwafuwa1_collision {\n\
	0% {\n\
		-webkit-transform: translateX(0px) translateY(0px);\n\
	}\n\
	100% {\n\
		-webkit-transform: translateX(0px) translateY(10px);\n\
	}\n\
}\n\
#", sukuri.PRE, "_Shell1_Head, #", sukuri.PRE, "_Shell1_Bust {\n\
	-webkit-animation-name: fuwafuwa1_collision;\n\
	-webkit-animation-duration: 0.7s;\n\
	-webkit-animation-timing-function: ease-in-out;\n\
	-webkit-animation-iteration-count: infinite;\n\
	-webkit-animation-direction: alternate;\n\
}\n\
#", sukuri.PRE, "_Shell1_Head {\n\
	position: absolute;\n\
	left: 12px;\n\
	top: 8px;\n\
	width: 39px;\n\
	height: 15px;\n\
	cursor: pointer;\n\
}\n\
#", sukuri.PRE, "_Shell1_Bust {\n\
	position: absolute;\n\
	left: 32px;\n\
	top: 38px;\n\
	width: 16px;\n\
	height: 10px;\n\
}\n\
#", sukuri.PRE, "_Shell0_Bust, #", sukuri.PRE, "_Shell1_Bust {\n\
	cursor: url(", sukuri.cursors.cur.hand, "), url(", sukuri.cursors.png.hand, "), pointer;\n\
}\n\
#", sukuri.PRE, "_Shell0_Bust:active, #", sukuri.PRE, "_Shell1_Bust:active {\n\
	cursor: url(", sukuri.cursors.cur.grip, "), url(", sukuri.cursors.png.grip, "), pointer;\n\
}\n\
#", sukuri.PRE, " div.", sukuri.PRE, "_Balloon {\n\
	position: absolute;\n\
	background: #333;\n\
	opacity: 0.7;\n\
	filter: alpha(opacity=70);\n\
	border: solid 3px #000;\n\
	-o-border-radius: 10px;\n\
	-moz-border-radius: 10px;\n\
	-webkit-border-radius: 10px;\n\
	border-radius: 10px;\n\
}\n\
#", sukuri.PRE, " div.", sukuri.PRE, "_Balloon:after {\n\
	font-size: 80%;\n\
	font-family: \"Times New Roman\", Times, Courier, Garamond, serif;\n\
	font-style: italic;\n\
	color: #ccf;\n\
	text-shadow: 1px 1px 1px #aac;\n\
	display: inline-block;\n\
	position: absolute;\n\
	bottom: 0;\n\
	right: 0;\n\
	content: \"UserJS for UKAGAKA\";\n\
}\n\
#", sukuri.PRE, "_Balloon0 {\n\
	width: 200px;\n\
	height: 150px;\n\
}\n\
#", sukuri.PRE, "_Balloon1 {\n\
	width: 200px;\n\
	height: 100px;\n\
}\n\
#", sukuri.PRE, " div.", sukuri.PRE, "_Balloon > div {\n\
	position: absolute;\n\
	left: 5%;\n\
	top: 5%;\n\
	width: 90%;\n\
	height: 90%;\n\
	text-align: left;\n\
	color: #fff;\n\
	font-size: 18px;\n\
	line-height: 120%;\n\
	word-break: break-all;\n\
	overflow: auto;\n\
}\n\
#", sukuri.PRE, " div.", sukuri.PRE, "_OwnerDrawMenu {\n\
	width: 100%;\n\
	height: 100%;\n\
}\n\
#", sukuri.PRE, " ul.", sukuri.PRE, "_om_dropdown {\n\
	font-size: 12px;\n\
	line-height: normal;\n\
	z-index: 9500;\n\
	position: fixed;\n\
	text-align: left;\n\
	background-color: #333;\n\
	border: 1px solid #999;\n\
	visibility: hidden;\n\
}\n\
#", sukuri.PRE, " ul.", sukuri.PRE, "_om_dropdown,\n\
#", sukuri.PRE, " ul.", sukuri.PRE, "_om_dropdown ul,\n\
#", sukuri.PRE, " ul.", sukuri.PRE, "_om_dropdown li {\n\
	margin: 0;\n\
	padding: 0;\n\
	width: auto;\n\
	min-width: 100px;\n\
	white-space: nowrap;\n\
	-o-box-shadow: 3px 3px 3px #888;\n\
	-moz-box-shadow: 3px 3px 3px #888;\n\
	-webkit-box-shadow: 3px 3px 3px #888;\n\
	box-shadow: 3px 3px 3px #888;\n\
	cursor: auto;\n\
}\n\
#", sukuri.PRE, " ul.", sukuri.PRE, "_om_dropdown > li > ul,\n\
#", sukuri.PRE, " ul.", sukuri.PRE, "_om_dropdown > li > ul li {\n\
	z-index: 9501;\n\
}\n\
#", sukuri.PRE, " ul.", sukuri.PRE, "_om_dropdown span,\n\
#", sukuri.PRE, " ul.", sukuri.PRE, "_om_dropdown a {\n\
	display: block;\n\
	padding: 2px 1em;\n\
}\n\
#", sukuri.PRE, " ul.", sukuri.PRE, "_om_dropdown span,\n\
#", sukuri.PRE, " ul.", sukuri.PRE, "_om_dropdown span:hover,\n\
#", sukuri.PRE, " ul.", sukuri.PRE, "_om_dropdown a,\n\
#", sukuri.PRE, " ul.", sukuri.PRE, "_om_dropdown a:link,\n\
#", sukuri.PRE, " ul.", sukuri.PRE, "_om_dropdown a:hover,\n\
#", sukuri.PRE, " ul.", sukuri.PRE, "_om_dropdown a:visited {\n\
	color: #000;\n\
	text-decoration: none;\n\
}\n\
#", sukuri.PRE, " ul.", sukuri.PRE, "_om_dropdown span:hover,\n\
#", sukuri.PRE, " ul.", sukuri.PRE, "_om_dropdown a:hover {\n\
	color: #fff;\n\
	background: #888;\n\
}\n\
#", sukuri.PRE, " ul.", sukuri.PRE, "_om_dropdown li {\n\
	margin-left: 20px;\n\
	position: relative;\n\
	display: block;\n\
	list-style: none;\n\
	background-color: #F4F4F4;\n\
}\n\
#", sukuri.PRE, " ul.", sukuri.PRE, "_om_dropdown li li {\n\
	margin-left: 0px;\n\
	background-color: #F4F4F4;\n\
}\n\
#", sukuri.PRE, " ul.", sukuri.PRE, "_om_dropdown ul {\n\
	visibility: hidden;\n\
	position: absolute;\n\
	left: 100%;\n\
	top: -1px;\n\
	border: 1px solid #999;\n\
}\n\
#", sukuri.PRE, " ul.", sukuri.PRE, "_om_dropdown li:hover > ul {\n\
	visibility: visible;\n\
}\n\
#", sukuri.PRE, " ul.", sukuri.PRE, "_om_dropdown li.", sukuri.PRE, "_om_clickable, #", sukuri.PRE, " ul.", sukuri.PRE, "_om_dropdown li span.", sukuri.PRE, "_om_clickable {\n\
	cursor: pointer;\n\
}\n\
#", sukuri.PRE, " li.", sukuri.PRE, "_om_disable span, #", sukuri.PRE, " li span.", sukuri.PRE, "_om_disable {\n\
	color: #888;\n\
}\n\
#", sukuri.PRE, " li.", sukuri.PRE, "_om_disable span:hover, #", sukuri.PRE, " li span.", sukuri.PRE, "_om_disable:hover {\n\
	color: #ccc;\n\
}\n\
#", sukuri.PRE, "_bannerbox {\n\
	width: auto;\n\
	height: auto;\n\
	z-index: 9001;\n\
	position: fixed;\n\
	visibility: hidden;\n\
	right: 10px;\n\
	bottom: 10px;\n\
}\n\
#", sukuri.PRE, " span.", sukuri.PRE, "_cursor_font:hover {\n\
	cursor: pointer;\n\
	color: #a4f;\n\
	text-decoration: underline;\n\
}\n\
"].join(""));
};
/**
 * @param {String} tag
 * @see http://www.albert2005.co.jp/study/javascript/prototype.html
 */
var DisplayObject = function(tag){
	this.__element = document.createElement(tag||'div');
	this.__childlen = [];
};
DisplayObject.prototype = {
	addChild:function(_do){
		this.__childlen.push(_do);
		return this.__element.appendChild(_do.__element);
	},
	removeChild:function(_do){
		for (var i = 0,l = this.__childlen.length;i < l; i++)
			if (this.__childlen[i] === _do)
				this.__childlen.splice(i,1);
		return this.__element.removeChild(_do.__element);
	}
};
var Sprite = function(node){
	if (this === window && node) {
		return new Sprite(node);
	}
	var elem = this.__element = node || document.createElement('div');
	this.__childlen = [];
};
Sprite.bind = function(method,self){
	if (!self) self = Sprite;
	return function(evt){
		self[method](evt||window.event);
	}
};
Sprite.initDrag = function(){
	addListener(document,'mousemove',Sprite.bind('__dragging'), false);
	addListener(document,'mouseup', Sprite.bind('__drag_end'), false);
	Sprite.__drag_objects = [];
	Sprite.__init_drag = true;
};
Sprite.__dragging = function(evt){
	if (!Sprite.__has_dragging) return;
	for (var i = 0,l = Sprite.__drag_objects.length; i < l;i++) {
		var self = Sprite.__drag_objects[i];
		if (!self.isDragging) continue;
		var elem = self.__element;
		var left = document.documentElement.scrollLeft + evt.clientX;
		elem.style.left = (self.offset.x + left) + 'px';
		var top = document.documentElement.scrollTop + evt.clientY;
		elem.style.top = (self.offset.y + top) + 'px';
		if (evt.preventDefault) {
			evt.preventDefault();
		} else {
			evt.returnValue = false;
		}
	}
};
Sprite.__drag_end = function(evt){
	for (var i = 0, l = Sprite.__drag_objects.length; i < l;i++) {
		Sprite.__drag_objects[i].isDragging = false;
	}
	Sprite.__has_dragging = false;
};
Sprite.prototype = new DisplayObject();
Sprite.prototype.__drag_start = function(evt){
	if ((!evt.which) && (evt.button !== 1)) return;
	if ((evt.which) && (evt.button !== 0)) return;
	this.isDragging = Sprite.__has_dragging = true;
	var elem = this.__element;
	this.offset = {
		x: (parseFloat(elem.style.left) || 0) -
			 (evt.clientX + document.documentElement.scrollLeft),
		y: (parseFloat(elem.style.top ) || 0) -
			 (evt.clientY + document.documentElement.scrollTop)
	};
	if (evt.preventDefault){
		evt.preventDefault();
	} else {
		evt.returnValue = false;
	}
	if (evt.stopPropagation){
		evt.stopPropagation();
	} else {
		evt.cancelBubble = true;
	}
};
Sprite.prototype.startDrag = function(){
	if (!Sprite.__init_drag) {
		Sprite.initDrag();
	}
	addListener(this.__element, "mousedown",
		Sprite.bind("__drag_start",this), false);
	Sprite.__drag_objects.push(this);
};
/**
 * Shell
 * @param {Object} node
 */
var Shell = function(node){
	var elem = this.__element = node || document.createElement('div');
	elem.className = sukuri.PRE + "_Shell";
	if (!document.getElementById(sukuri.PRE + "_Shell0"))
		Shell.__id = -1;
	elem.id = sukuri.PRE + "_Shell" + ((Shell.__id += 1) || (Shell.__id = 0));
	elem.style.left = (sukuri.ShioriResource["char" + Shell.__id + "_defaultx"] || 0) + "px";
	elem.style.top = (sukuri.ShioriResource["char" + Shell.__id + "_defaulty"] || 0) + "px";
	this.style = elem.style;
	this.__childlen = [];
	var setDblClick = function(ref3, ref4){
		return function(e){
			var evt = e ? e : window.event;
			if (evt.preventDefault){
				evt.preventDefault();
			} else {
				evt.returnValue = false;
			}
			if (evt.stopPropagation){
				evt.stopPropagation();
			} else {
				evt.cancelBubble = true;
			}
			if (typeof sukuri.shiori.GET.OnMouseDoubleClick == "undefined") return;
			var reference = [null, null, null, ref3, ref4];
			var res = sukuri.shiori.GET.OnMouseDoubleClick(reference);
			if (!res) return;
			sukuri.SakuraScript = res;
			sukuri.SakuraScriptChrAt = null;
			sukuri.playSakuraScript.play();
		};
	};
	var setMouseMove = function(ref3, ref4){
		return function(e){
			if (typeof sukuri.shiori.GET.OnMouseMove == "undefined") return;
			var reference = [null, null, null, ref3, ref4];
			var res = sukuri.shiori.GET.OnMouseMove(reference);
			if (!res) return;
			sukuri.SakuraScript = res;
			sukuri.SakuraScriptChrAt = null;
			sukuri.playSakuraScript.play();
		};
	};
	var setMouseLeave = function(ref3, ref4){
		return function(e){
			if (typeof sukuri.shiori.GET.OnMouseLeave == "undefined") return;
			var reference = [null, null, null, ref3, ref4];
			var res = sukuri.shiori.GET.OnMouseLeave(reference);
			if (!res) return;
			sukuri.SakuraScript = res;
			sukuri.SakuraScriptChrAt = null;
			sukuri.playSakuraScript.play();
		};
	};
	addListener(elem, "dblclick", setDblClick(Shell.__id, null));
//	addListener(elem, "mouseout", setMouseLeave(Shell.__id, null));
	if (isFirefox) {
		addListener(elem, "mousedown", function(evt){
			if ((!evt) || (!evt.which) || (evt.button !== 0)) return;
			elem.style.opacity = "0.7";
		});
		addListener(document, "mouseup", function(evt){
			if ((!evt) || (!evt.which) || (evt.button !== 0)) return;
			elem.style.opacity = "1";
		});
	}
	var defaultSurface = sukuri.GhostDescript["char" + Shell.__id + "_seriko_defaultsurface"];
	if (defaultSurface >= 0) {
		if (sukuri.ShellSurfaces["surface" + defaultSurface]) {
			for (var collision in sukuri.ShellSurfaces["surface" + defaultSurface]) {
				var subdiv = document.createElement("div");
				subdiv.id = elem.id + "_" + collision;
				subdiv.className = elem.className + "_" + collision;
				addListener(subdiv, "dblclick", setDblClick(Shell.__id, collision));
				addListener(subdiv, "mousemove", setMouseMove(Shell.__id, collision));
				addListener(subdiv, "mouseout", setMouseLeave(Shell.__id, collision));
				elem.appendChild(subdiv);
			}
		}
	}
	//FileAPI
	if (isFirefox) {
		elem.addEventListener("dragover", function(event){
			event.preventDefault();
		}, false);
		elem.addEventListener("drop", function(event){
			event.preventDefault();
			var file = event.dataTransfer.files[0];
			if (!/image\/bmp|image\/gif|image\/jpeg|image\/png/.test(file.type)) {
				return;
			}
			var url_reader = new FileReader();
			url_reader.onload = function() {
				document.body.style.backgroundImage = "url('" + url_reader.result + "')";
 			};
			url_reader.readAsDataURL(file);
		}, false);
	}
};
Shell.prototype = new Sprite();
/**
 * Balloon
 * @param {Object} node
 */
var Balloon = function(node){
	var elem = this.__element = node || document.createElement('div');
	elem.className = sukuri.PRE + "_Balloon";
	if (!document.getElementById(sukuri.PRE + "_Balloon0"))
		Balloon.__id = -1;
	elem.id = sukuri.PRE + "_Balloon" + ((Balloon.__id += 1) || (Balloon.__id = 0));
	elem.style.left = sukuri.ShellDescript["char" + Balloon.__id + "_balloon_offsetx"] + "px";
	elem.style.top = sukuri.ShellDescript["char" + Balloon.__id + "_balloon_offsety"] + "px";
	this.style = elem.style;
	this.__childlen = [];
	var talkbox = document.createElement("div");
	talkbox.id = sukuri.PRE + "_BalloonText" + Balloon.__id;
	elem.appendChild(talkbox);
};
Balloon.prototype = new Sprite();
/**
 * OwnerDrawMenu
 * @param {Object} node
 */
var OwnerDrawMenu = function(node){
	var elem = this.__element = node || document.createElement('div');
	elem.className = sukuri.PRE + "_OwnerDrawMenu";
	if (!document.getElementById(sukuri.PRE + "_OwnerDrawMenu0"))
		OwnerDrawMenu.__id = -1;
	elem.id = sukuri.PRE + "_OwnerDrawMenu" + ((OwnerDrawMenu.__id += 1) || (OwnerDrawMenu.__id = 0));
	this.style = elem.style;
	this.__childlen = [];
	var menuUl = document.createElement("ul");
	menuUl.id = sukuri.PRE + "_ownerdrawmenu" + OwnerDrawMenu.__id;
	menuUl.className = sukuri.PRE + "_om_dropdown";
	elem.appendChild(menuUl);
	OwnerDrawMenu.addList(menuUl);
};
OwnerDrawMenu.addList = function(menuUl){
	var BANNER_MARGIN = "20px";
	var scope = OwnerDrawMenu.__id;
	var insertHr = function() {
		menuUl.lastChild.style.borderBottom = "1px solid #999";
	};
	var insertDisableMenu = function(txt) {
		var li = document.createElement("li");
		li.className = sukuri.PRE + "_om_disable";
		menuUl.appendChild(li);
		var span = document.createElement("span");
		setTextContent(span, txt);
		li.appendChild(span);
	};
	var hideBanner = function(self){
		return function(){
			var bannerBox = document.getElementById(sukuri.PRE + "_Banner");
			var bannerImg = document.getElementById(sukuri.PRE + "_BannerImg");
			removeListener(self, "mouseout", hideBanner(self));
			bannerBox.style.visibility = "hidden";
			bannerImg.setAttribute("src", "");
		};
	};
	var showBanner = function(self, url){
		return function(evt){
			var bannerBox = document.getElementById(sukuri.PRE + "_Banner");
			var bannerImg = document.getElementById(sukuri.PRE + "_BannerImg");
			addListener(self, "mouseout", hideBanner(self));
			removeListener(self, "mouseover", showBanner(self, url));
			if (!url) return;
			var scrollX = window.pageXOffset || Root.scrollLeft;
			if (!evt.pageX) evt.pageX = evt.clientX + scrollX;
			if (2 * (evt.pageX - scrollX) > Root.clientWidth) {
				bannerBox.style.left = BANNER_MARGIN;
				bannerBox.style.right = "auto";
			}
			else {
				bannerBox.style.left = "auto";
				bannerBox.style.right = BANNER_MARGIN;
			}
			bannerBox.style.visibility = "visible";
			bannerImg.setAttribute("src", url);
		};
	};
	var insertSiteList = function(listtype) {
		var sitesLi = document.createElement("li");
		menuUl.appendChild(sitesLi);
		var sitesLiSpan = document.createElement("span");
		var sitesLiSpanText = sukuri.ShioriResource["char" + scope + "_" + listtype + "buttoncaption"]
			|| ((listtype === "recommend") ? "\u304a\u3059\u3059\u3081"
																		 : (listtype === "portal") ? "\u30dd\u30fc\u30bf\u30eb\u30b5\u30a4\u30c8"
																		 													 : listtype);
		setTextContent(sitesLiSpan, sitesLiSpanText);
		sitesLi.appendChild(sitesLiSpan);
		var sitesLiUl = document.createElement("ul");
		sitesLi.appendChild(sitesLiUl);
		var sitesList = sukuri.ShioriResource["char" + scope + "_" + listtype + "sites"] || [];
		for (var i = 0; i < sitesList.length; i++) {
			var sitesLiUlLi = document.createElement("li");
			addListener(sitesLiUlLi, "mouseover", showBanner(sitesLiUlLi, sitesList[i].banner));
			sitesLiUl.appendChild(sitesLiUlLi);
			var sitesLiUlLiA = document.createElement("a");
			setTextContent(sitesLiUlLiA, sitesList[i].title);
			sitesLiUlLiA.setAttribute("href", sitesList[i].url);
			sitesLiUlLiA.setAttribute("rel", "noreferrer");
			sitesLiUlLi.appendChild(sitesLiUlLiA);
		}
	};
	var insertGhostCall = function(summonType) {
		if (document.getElementById(PRE + "_bootghosts") === null) return;
		var gLi = document.createElement("li");
		menuUl.appendChild(gLi);
		var gLiSpan = document.createElement("span");
		setTextContent(gLiSpan, (summonType === "call") ? "\u4ed6\u306e\u30b4\u30fc\u30b9\u30c8\u3092\u547c\u3076" : "\u30b4\u30fc\u30b9\u30c8\u5207\u308a\u66ff\u3048");
		gLi.appendChild(gLiSpan);
		var gLiUl = document.createElement("ul");
		gLi.appendChild(gLiUl);
		var gList = document.getElementById(PRE + "_bootghosts").childNodes;
		var callGhost = function(elm, rmnd, isChange) {
			return function() {
				if (!isChange) {
					var ss = (sukuri.shiori.GET.OnGhostCalling) ? sukuri.shiori.GET.OnGhostCalling([null, null, getTextContent(rmnd)]) : false;
					if (ss) {
						sukuri.SakuraScript = ss;
						sukuri.SakuraScriptChrAt = null;
						sukuri.playSakuraScript.play();
					}
					removeListener(rmnd, "click", callGhost(elm, rmnd, false));
				}
				rmnd.className = sukuri.PRE + "_om_disable";
				var ev = document.createEvent("MouseEvent");
				ev.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				elm.dispatchEvent(ev);
			};
		};
		var changeGhost = function(elm, rmnd) {
			return function() {
				removeListener(rmnd, "click", changeGhost(elm, rmnd));
				if (sukuri.shiori.GET.OnGhostChanging) {
					sukuri.SakuraScript = sukuri.shiori.GET.OnGhostChanging([null, null, getTextContent(rmnd)]);
				} else if (sukuri.shiori.GET.OnClose) {
					sukuri.SakuraScript = sukuri.shiori.GET.OnClose();
				} else {
					sukuri.SakuraScript = "\\-";
				}
				sukuri.SakuraScriptChrAt = null;
				sukuri.playSakuraScript.play();
				var getEventOwnClose = function(request){
					var j = JSON.parse(request.data);
					if (j.ID !== "OnOtherGhostClosed") return;
					if (j.Reference2 !== sukuri.GhostDescript.name) return;
					removeListener(document.getElementById(PRE + "_boot"), PRE + "_request", getEventOwnClose);
					callGhost(elm, rmnd, true)();
				};
				addListener(document.getElementById(PRE + "_boot"), PRE + "_request", getEventOwnClose);
			};
		};
		for (var i = 0; i < gList.length; i++) {
			var gLiUlLi = document.createElement("li");
			gLiUl.appendChild(gLiUlLi);
			var gLiUlLiSpan = document.createElement("span");
			var ghostName = getTextContent(gList[i].lastChild);
			setTextContent(gLiUlLiSpan, ghostName);
			gLiUlLi.appendChild(gLiUlLiSpan);
			if (gList[i].lastChild.className === PRE + "_bootng") {
				gLiUlLiSpan.className = sukuri.PRE + "_om_disable";
			}
			else {
				gLiUlLiSpan.className = sukuri.PRE + "_om_clickable";
				var summonFunc = (summonType === "call") ? callGhost(gList[i].lastChild, gLiUlLiSpan, false) : changeGhost(gList[i].lastChild, gLiUlLiSpan);
				addListener(gLiUlLiSpan, "click", summonFunc);
			}
		}
		var getEvent =  function(request){
			var j = JSON.parse(request.data);
			var cName;
			switch (j.ID) {
				case "OnOtherGhostBooted":
					cName = sukuri.PRE + "_om_disable";
					break;
				case "OnOtherGhostClosed":
					cName = sukuri.PRE + "_om_clickable";
					if (sukuri.GhostDescript.name === j.Reference2)
						removeListener(document.getElementById(PRE + "_boot"), PRE + "_request", getEvent);
					break;
				default:
					return;
			}
			for (var i = 0; i < gLiUl.childNodes.length; i++) {
				var gLiUlLiSpan = gLiUl.childNodes[i].lastChild;
				if (getTextContent(gLiUlLiSpan) === j.Reference2) {
					gLiUlLiSpan.className = cName;
					var summonFunc = (summonType === "call") ? callGhost(gList[i].lastChild, gLiUlLiSpan) : changeGhost(gList[i].lastChild, gLiUlLiSpan);
					if (j.ID === "OnOtherGhostClosed") {
						addListener(gLiUlLiSpan, "click", summonFunc);
					}
					else if (j.ID === "OnOtherGhostBooted") {
						removeListener(gLiUlLiSpan, "click", summonFunc);
					}
					break;
				}
			}
		};
		addListener(document.getElementById(PRE + "_boot"), PRE + "_request", getEvent);
	};
	var insertClose = function() {
		var closeLi = document.createElement("li");
		menuUl.appendChild(closeLi);
		var closeLiSpan = document.createElement("span");
		setTextContent(closeLiSpan, "\u7d42\u4e86");
		closeLi.className = sukuri.PRE + "_om_clickable";
		closeLi.appendChild(closeLiSpan);
		var callClose = function(){
			var reference = ["user"];
			if (sukuri.shiori.GET.OnClose) {
				sukuri.SakuraScript = sukuri.shiori.GET.OnClose(reference);
			} else {
				sukuri.SakuraScript = "\\-";
			}
			sukuri.SakuraScriptChrAt = null;
			sukuri.playSakuraScript.play();
		};
		addListener(closeLi, "mousedown", callClose);
	};
	insertSiteList("recommend");
	switch (scope) {
		case 0:
			insertSiteList("portal");
			insertDisableMenu("\u30cd\u30c3\u30ef\u30fc\u30af\u66f4\u65b0");
			insertHr();
			insertDisableMenu("\u30a2\u30f3\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb");
			if (!isMSIE) {
				insertHr();
				insertGhostCall("change");
				insertGhostCall("call");
			}
			break;
		default:
			insertDisableMenu("\u7740\u305b\u66ff\u3048");
			break;
	}
	insertHr();
	insertClose();
};
OwnerDrawMenu.prototype = new Sprite();
OwnerDrawMenu.prototype.__disable_contextmenu = function(evt){
	var target = evt.target ? evt.target : evt.srcElement;
	if (target.id.search(/Shell|OwnerDrawMenu/) == -1) return;
	if (evt.preventDefault){
		evt.preventDefault();
	} else {
		evt.returnValue = false;
	}
	if (evt.stopPropagation){
		evt.stopPropagation();
	} else {
		evt.cancelBubble = true;
	}
};
OwnerDrawMenu.prototype.__menu_open = function(evt){
	var target = evt.target ? evt.target : evt.srcElement;
	if (target.id.search(/Shell|OwnerDrawMenu/) == -1) return;
	if (evt.button !== 2) return;
	var contextMenuId = this.__element.id.charAt(this.__element.id.length - 1);
	var target = document.getElementById(sukuri.PRE + "_ownerdrawmenu" + contextMenuId);
	var scrollX = window.pageXOffset || Root.scrollLeft;
	var scrollY = window.pageYOffset || Root.scrollTop;
	if (!evt.pageX) evt.pageX = evt.clientX + scrollX;
	if (!evt.pageY) evt.pageY = evt.clientY + scrollY;
 	if (Root.clientWidth - evt.pageX + scrollX > 200) {
		target.style.left = (evt.pageX - scrollX) + "px";
		target.style.right = "auto";
	}
	else {
		target.style.left = "auto";
		target.style.right = (Root.clientWidth - evt.pageX + scrollX) + "px";
	}
	if (2 * (evt.pageY - scrollY) < Root.clientHeight) {
		target.style.top = (evt.pageY - scrollY) + "px";
		target.style.bottom = "auto";
	}
	else {
		target.style.top = "auto";
		target.style.bottom = (Root.clientHeight - evt.pageY + scrollY) + "px";
	}
	target.style.visibility = "visible";
	var n = sukuri.settings.charNum;
	var hideContextMenu = function(){
		target.style.visibility = "hidden";
		removeListener(document, "mousedown", hideContextMenu);
		for (var i = 0; i < n; i++) {
			removeListener(document.getElementById(sukuri.PRE + "_OwnerDrawMenu" + i), "mousedown", hideContextMenu);
			removeListener(document.getElementById(sukuri.PRE + "_Balloon" + i), "mousedown", hideContextMenu);
		}
	};
	addListener(document, "mousedown", hideContextMenu);
	for (var i = 0; i < n; i++) {
		addListener(document.getElementById(sukuri.PRE + "_OwnerDrawMenu" + i), "mousedown", hideContextMenu);
		addListener(document.getElementById(sukuri.PRE + "_Balloon" + i), "mousedown", hideContextMenu);
	}
};
OwnerDrawMenu.prototype.startMenu = function(){
	addListener(this.__element.parentNode, "contextmenu", Sprite.bind("__disable_contextmenu",this));
	addListener(this.__element.parentNode, "mouseup", Sprite.bind("__menu_open",this));
};
sukuri.playSakuraScript = {
	play: function(){
		if (sukuri.SakuraScriptChrAt == null)
			sukuri.playSakuraScript.init();
		else
			sukuri.SakuraScriptChrAt++;
		var chr = sukuri.SakuraScript.charAt(sukuri.SakuraScriptChrAt);
		if (chr === "") {
			sukuri.playSakuraScript.stop();
			return;
		}
		var scriptInterval = sukuri.settings.scriptInterval;
		while (chr == "\\") {
			sukuri.SakuraScriptChrAt++;
			chr = sukuri.SakuraScript.charAt(sukuri.SakuraScriptChrAt);
			switch (chr) {
				case "\\":
					sukuri.playSakuraScript.setNextInterval("\\", scriptInterval, 0);
					return;
				case "-":
					sukuri.clearField();
					return;
				case "0":
				case "h":
					sukuri.targetScope = 0;
					sukuri.targetBalloon = document.getElementById(sukuri.PRE + "_BalloonText" + sukuri.targetScope);
					break;
				case "1":
				case "u":
					sukuri.targetScope = 1;
					sukuri.targetBalloon = document.getElementById(sukuri.PRE + "_BalloonText" + sukuri.targetScope);
					break;
				case "e":
					sukuri.playSakuraScript.stop();
					return;
				case "c":
					setTextContent(sukuri.targetBalloon, "");
					var newspan = document.createElement("span");
					sukuri.targetBalloon.appendChild(newspan);
					break;
				case "n":
					var breakTag = document.createElement("br");
					sukuri.targetBalloon.appendChild(breakTag);
					var newspan = document.createElement("span");
					sukuri.targetBalloon.appendChild(newspan);
					break;
				case "_":
					sukuri.SakuraScriptChrAt++;
					if (/w\[(\d+)\](.*)/.test(sukuri.SakuraScript.slice(sukuri.SakuraScriptChrAt))) {
						sukuri.playSakuraScript.setNextInterval("", 1 * RegExp.$1, 0);
						sukuri.SakuraScriptChrAt += 2 + RegExp.$1.length;
					}
					else
						sukuri.playSakuraScript.setNextInterval("\\", scriptInterval, -2);
					return;
				case "w":
					sukuri.SakuraScriptChrAt++;
					chr = sukuri.SakuraScript.charAt(sukuri.SakuraScriptChrAt);
					if (sukuri.playSakuraScript.isNumeric(chr))
						sukuri.playSakuraScript.setNextInterval("", 50 * chr, 0);
					else
						sukuri.playSakuraScript.setNextInterval("\\", scriptInterval, -2);
					return;
				case "s":
					sukuri.SakuraScriptChrAt++;
					chr = sukuri.SakuraScript.charAt(sukuri.SakuraScriptChrAt);
					if (chr == "[") {
						sukuri.SakuraScriptChrAt++;
						var splArray = sukuri.SakuraScript.substring(sukuri.SakuraScriptChrAt, sukuri.SakuraScript.length).split("]", 1);
						var surfaceNum = splArray[0];
						if (sukuri.playSakuraScript.isNumeric(surfaceNum)) {
							var tergetShell = document.getElementById(sukuri.PRE + "_Shell" + sukuri.targetScope);
							tergetShell.className = sukuri.PRE + "_Shell " + sukuri.PRE + "_surface" + surfaceNum;
							sukuri.SakuraScriptChrAt += surfaceNum.length;
						}
						else {
							sukuri.playSakuraScript.setNextInterval("\\", scriptInterval, -2);
							return;
						}
					}
					else {
						sukuri.playSakuraScript.setNextInterval("\\", scriptInterval, -1);
						return;
					}
					break;
				case "q":
					sukuri.SakuraScriptChrAt++;
					chr = sukuri.SakuraScript.charAt(sukuri.SakuraScriptChrAt);
					if (chr == "[") {
						sukuri.SakuraScriptChrAt++;
						var splArray = sukuri.SakuraScript.substring(sukuri.SakuraScriptChrAt, sukuri.SakuraScript.length).split("]", 1);
						var selectString = splArray[0];
						var spl = selectString.split(",", 2);
						var txt = spl[0];
						var ref0 = spl[1];
						var id = sukuri.PRE + "_onchoiceselect_" + ref0
						var span = document.createElement("span");
						span.id = id;
						span.className = sukuri.PRE + "_cursor_font";
						setTextContent(span, txt);
						var setChoiceSelect = function(selectId){
							return function(){
								removeListener(span, "click", setChoiceSelect(ref0));
								var reference = [selectId];
								sukuri.SakuraScript = sukuri.shiori.GET.OnChoiceSelect(reference);
								sukuri.SakuraScriptChrAt = null;
								sukuri.playSakuraScript.play();
							};
						};
						addListener(span, "click", setChoiceSelect(ref0));
						sukuri.targetBalloon.appendChild(span);
						var newspan = document.createElement("span");
						sukuri.targetBalloon.appendChild(newspan);
						sukuri.SakuraScriptChrAt += selectString.length;
					}
					else {
						sukuri.playSakuraScript.setNextInterval("\\", scriptInterval, -1);
						return;
					}
					break;
				case "!":
					sukuri.SakuraScriptChrAt++;
					chr = sukuri.SakuraScript.charAt(sukuri.SakuraScriptChrAt);
					if (chr == "[") {
						sukuri.SakuraScriptChrAt++;
						var splArray = sukuri.SakuraScript.substring(sukuri.SakuraScriptChrAt, sukuri.SakuraScript.length).split("]", 1);
						var innerBracket = splArray[0];
						if (innerBracket == "*") {
							var sstpImage = document.createElement("img");
							sstpImage.src = sukuri.balloons["sstp"];
							sstpImage.alt = "";
							sstpImage.width = "12";
							sstpImage.height = "12";
							sukuri.targetBalloon.appendChild(sstpImage);
							var newspan = document.createElement("span");
							sukuri.targetBalloon.appendChild(newspan);
							sukuri.SakuraScriptChrAt += 1;
						}
						else {
							sukuri.playSakuraScript.setNextInterval("\\", scriptInterval, -2);
							return;
						}
					}
					else {
						sukuri.playSakuraScript.setNextInterval("\\", scriptInterval, -1);
						return;
					}
					break;
				default:
					sukuri.playSakuraScript.setNextInterval("\\", scriptInterval, -1);
					return;
			}//swith
			sukuri.SakuraScriptChrAt++;
			chr = sukuri.SakuraScript.charAt(sukuri.SakuraScriptChrAt);
		}//while
		sukuri.playSakuraScript.setNextInterval(chr, scriptInterval, 0);
	},
	init: function(){
		sukuri.SakuraScriptChrAt = 0;
		sukuri.targetScope = 0;
		sukuri.targetBalloon = document.getElementById(sukuri.PRE + "_BalloonText" + sukuri.targetScope);
		for (var i = 0; i < sukuri.settings.charNum; i++) {
			setTextContent(document.getElementById(sukuri.PRE + "_BalloonText" + i), "");
			document.getElementById(sukuri.PRE + "_Balloon" + i).style.visibility = "hidden";
			var span = document.createElement("span");
			document.getElementById(sukuri.PRE + "_BalloonText" + i).appendChild(span);
		}
		clearTimeout(sukuri.timerId);
	},
	stop: function(){
		sukuri.SakuraScriptChrAt = null;
		var timeout;
		if (document.getElementsByClassName) {
			if (document.getElementById(sukuri.PRE).getElementsByClassName(sukuri.PRE + "_cursor_font").length > 0) {
				timeout = sukuri.settings.choiceTimeout;
			}
			else {
				for (var i = 0; i < sukuri.settings.charNum; i++) {
					addListener(document.getElementById(sukuri.PRE + "_BalloonText" + i), "click", sukuri.playSakuraScript.setNextAITalk);
				}
				timeout = sukuri.settings.balloonTimeout;
			}
		}
		else if (/\\q/.test(sukuri.SakuraScript)) {//IE
			timeout = sukuri.settings.choiceTimeout;
		}
		else {
			for (var i = 0; i < sukuri.settings.charNum; i++) {
				addListener(document.getElementById(sukuri.PRE + "_BalloonText" + i), "click", sukuri.playSakuraScript.setNextAITalk);
			}
			timeout = sukuri.settings.balloonTimeout;
		}
		sukuri.timerId = setTimeout(sukuri.playSakuraScript.setNextAITalk, timeout);
	},
	setNextAITalk: function(){
		clearTimeout(sukuri.timerId);
		for (var i = 0; i < sukuri.settings.charNum; i++) {
			removeListener(document.getElementById(sukuri.PRE + "_BalloonText" + i), "click", sukuri.playSakuraScript.setNextAITalk);
			setTextContent(document.getElementById(sukuri.PRE + "_BalloonText" + i), "");
			document.getElementById(sukuri.PRE + "_Balloon" + i).style.visibility = "hidden";
		}
		sukuri.SakuraScript = sukuri.shiori.GET.OnAITalk();
		sukuri.timerId = setTimeout(sukuri.playSakuraScript.play, sukuri.settings.talkInterval);
	},
	setNextInterval: function(chr, scriptInterval, offset){
		sukuri.SakuraScriptChrAt += offset;
		sukuri.targetBalloon.parentNode.style.visibility = "visible";
		if (sukuri.targetBalloon.lastChild != null) {
			var textC = getTextContent(sukuri.targetBalloon.lastChild);
			setTextContent(sukuri.targetBalloon.lastChild, textC + chr);
		}
		else {
			var newspan = document.createElement("span");
			setTextContent(newspan, chr);
			sukuri.targetBalloon.appendChild(newspan);
		}
		if (scriptInterval < sukuri.settings.scriptInterval)
			scriptInterval = sukuri.settings.scriptInterval;
		sukuri.timerId = setTimeout(sukuri.playSakuraScript.play, scriptInterval);
	},
	isNumeric: function(num){
		return !((num == "") || (num.match(/[^0-9]/g)));
	}
};
sukuri.clearField = function(){
	for (var i = 0; i < sukuri.settings.charNum; i++) {
		var balloonbox = document.getElementById(sukuri.PRE + "_Balloon" + i);
		balloonbox.style.visibility = "hidden";
		var shellbox = document.getElementById(sukuri.PRE + "_Shell" + i);
		shellbox.style.visibility = "hidden";
	}
	setTimeout(function(){
		sukuri.sendRequest("OnOtherGhostClosed", [sukuri.GhostDescript.char0_name, null, sukuri.GhostDescript.name]);
		var sukuriElem = document.getElementById(sukuri.PRE);
		sukuriElem.parentNode.removeChild(sukuriElem);
	}, 500);
};
sukuri.sendRequest = function(eventId, ref) {
	if (typeof JSON != "undefined") {
		var mes = JSON.stringify({
			 protocol: "GET SHIORI/3.0"
			,ID: eventId
			,Reference0: ref[0]
			,Reference1: ref[1]
			,Reference2: ref[2]
		});
		var ev;
		try {
			ev = document.createEvent("MessageEvent");
		} catch (e) {
			return;
		}
		try {
			ev.initMessageEvent(PRE + "_request", true, true, mes, location.protocol + "//" + location.host, "", window);
		} catch (e) {
			return;
		}
		var b = document.getElementById(PRE + "_boot")
		if (b) {
			b.dispatchEvent(ev);
		}
	}
};
sukuri.recieveRequest = function() {
	var recieveFunc = function(request) {
		var j = JSON.parse(request.data);
		var ss;
		switch (j.ID) {
			case "OnGhostCalling":
				if (sukuri.GhostDescript.name === j.Reference2) {// no case
					return;
				}
				ss = (sukuri.shiori.GET.OnGhostCalling) ? sukuri.shiori.GET.OnGhostCalling([j.Reference0, null, j.Reference2]) : false;
				break;
			case "OnOtherGhostBooted":
				if (sukuri.GhostDescript.name === j.Reference2) {
					return;
				}
				ss = (sukuri.shiori.GET.OnOtherGhostBooted) ? sukuri.shiori.GET.OnOtherGhostBooted([j.Reference0, null, j.Reference2]) : false;
				break;
			case "OnOtherGhostClosed":
				if (sukuri.GhostDescript.name === j.Reference2) {
					removeListener(document.getElementById(PRE + "_boot"), PRE + "_request", recieveFunc);
					return;
				}
				ss = (sukuri.shiori.GET.OnOtherGhostClosed) ? sukuri.shiori.GET.OnOtherGhostClosed([j.Reference0, null, j.Reference2]) : false;
				break;
			default:
				return;
		}
		if (ss) {
			sukuri.SakuraScript = ss;
			sukuri.playSakuraScript.play();
		}
	};
	addListener(document.getElementById(PRE + "_boot"), PRE + "_request", recieveFunc);
};
sukuri.setFeild = function() {
	var body = new Sprite(document.body);
	var sukuriDiv = document.createElement("div")
	sukuriDiv.id = sukuri.PRE;
	var sukuriBox = new Sprite(sukuriDiv);
	body.addChild(sukuriBox);
	var n = sukuri.settings.charNum;
	for (var i = 0; i < n; i++) {
		var shell = new Shell();
		var menu = new OwnerDrawMenu();
		var balloon = new Balloon();
		sukuriBox.addChild(shell);
		shell.addChild(menu);
		shell.addChild(balloon);
		shell.startDrag();
		balloon.startDrag();
		menu.startMenu();
	}
	var bannerDiv = document.createElement("div")
	bannerDiv.id = sukuri.PRE + "_Banner";
	bannerDiv.style.visibility = "hidden";
	var bannerImg = document.createElement("img");
	bannerImg.id = sukuri.PRE + "_BannerImg";
	bannerImg.setAttribute("src", "");
	bannerImg.setAttribute("alt", "");
	bannerDiv.appendChild(bannerImg);
	var bannerBox = new Sprite(bannerDiv);
	sukuriBox.addChild(bannerBox);
	// need to get "\e", send after it
	sukuri.sendRequest("OnOtherGhostBooted", [sukuri.GhostDescript.char0_name, null, sukuri.GhostDescript.name]);
};
/**
 * @see http://lifebird.net/2010/03/978/
 */
sukuri.cursors = {
	 cur: {
		 hand: ["data:image/vnd.microsoft.icon;base64,"
		,"AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAA"
		,"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////////////////////////8AAAD/"
		,"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////////////////////"
		,"////AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////////////////"
		,"/////////////wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////////////"
		,"////////////////////////////AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAD/////////////////"
		,"/////////////////////////////////////wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAA////////"
		,"////////////////////////////////////////////////////AAAA/wAAAAAAAAAAAAAA////"
		,"/////////////////////////////////////////////////////////////wAAAP8AAAAAAAAA"
		,"/////////////////wAAAP////////////////////////////////////////////////8AAAD/"
		,"AAAAAAAAAP///////////wAAAP8AAAD/////////////////////////////////////////////"
		,"/////////wAAAP8AAAAAAAAA/wAAAP8AAAAAAAAA////////////////////////////////////"
		,"//8AAAD///////////8AAAD/AAAAAAAAAAAAAAAAAAAA////////////AAAA////////////AAAA"
		,"////////////AAAA////////////AAAA/wAAAAAAAAAAAAAAAAAAAP///////////wAAAP//////"
		,"/////wAAAP///////////wAAAP8AAAD//////wAAAP8AAAAAAAAAAAAAAP///////////wAAAP8A"
		,"AAD///////////8AAAD///////////8AAAD/AAAAAAAAAP8AAAAAAAAAAAAAAAAAAAD/////////"
		,"//8AAAD/AAAA////////////AAAA////////////AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
		,"AAAAAP8AAAD/AAAAAAAAAP///////////wAAAP8AAAD/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAA"
		,"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
		,"AAAA+AesQfgHrEHwB6xB4AOsQcADrEHAAaxBgAGsQQABrEEAAKxBkACsQeAArEHgAKxBwAWsQcAH"
		,"rEHkD6xB/n+sQQ=="
		].join("")
		,grip: ["data:image/vnd.microsoft.icon;base64,"
		,"AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAA"
		,"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
		,"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
		,"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
		,"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////////"
		,"/////////////////wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////"
		,"//////////////////////////8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//"
		,"////////////////////////////////////AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
		,"AP////////////////////////////////////////////////8AAAD/AAAAAAAAAAAAAAAAAAAA"
		,"AAAAAP//////////////////////////////////////////////////////AAAA/wAAAAAAAAAA"
		,"AAAAAAAAAAAAAAD///////////////////////////////////////////////////////////8A"
		,"AAD/AAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/////////////////////////////////////////"
		,"////////AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////////////////////////"
		,"/////////////////wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAA////////////////////////////"
		,"////////////////AAAA//////8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAP///////////wAAAP//"
		,"/////////wAAAP///////////wAAAP8AAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAA"
		,"AP8AAAAAAAAA/wAAAP8AAAAAAAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
		,"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
		,"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
		,"AAAA//+sQf//rEH//6xB8A+sQfAPrEHgD6xBwAesQYAHrEGAA6xBwAOsQeADrEHAA6xBwAesQeSf"
		,"rEH//6xB//+sQQ=="
		].join("")
	}
	,png: {
		 hand: ["data:image/png;base64,"
		,"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ"
		,"bWFnZVJlYWR5ccllPAAAAIFJREFUeNqcU1sOwCAIE+L9r+xkS0ldwCj8aJQ+QJQxRstCRN7LmSNZ"
		,"Ts8Atgc5ziOyzuAIQEDOcxJtxYCIsrUZi9oObDm2lhywgIIRtUUuti/13XuDjkqgUtYmngIBNsfK"
		,"tm9JvAd/kmuCwgz4RIZzUHZwQsLqYQm3Tsp/AfEIMAANH14bWkHqJwAAAABJRU5ErkJggg=="
		].join("")
		,grip: ["data:image/png;base64,"
		,"iVBORw0KGgoAAAANSUhEUgAAAA0AAAALCAYAAACksgdhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ"
		,"bWFnZVJlYWR5ccllPAAAAFtJREFUeNqUkFEKwDAIQ43s/ld2upHh/JD0gcUWY6oWEVaR1BFbzrjq"
		,"FQAL1txeNdwGLJo57yV2qhPb6A28W6ugDawJ8kd+5JCCZxHKPBN5EXT5RKrw53TKLcAACTBO9TXL"
		,"mKsAAAAASUVORK5CYII="
		].join("")
	}
};
sukuri.balloons = {
		 sstp: ['data:image/png;base64,',
		'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABpklEQVR4nGP49+8f4////xl+//zN',
		'dnzTcddpRdPqK7wrFhU4Fqxuim6asmXulsif339ygNT8/fuXiQHE+PzuM/+KthXZXfFd/U2hTTOq',
		'fKoWFDoVrsq0yNycoJ+wpzKgcv6rx6+kQGoZ/vz6w7plypa42UWza6flTGvqTujuawprml7tWz2/',
		'yLloZa5t7nqQpjKfskU/vv3gZLh75q7OmtY1WUvrlxaCNE3OmNwGt8m7aiHIJpCmRP3EPSDnMZxa',
		'd8pt64StCWvb1mYurllcjE1TsUvxiiyrrE0NkQ3TGI4vO+6zZ8aeyC39WxJBNmHTVOldCbYp3yF/',
		'DcP59eedjy466r9n5p4IfJpANpV7lC9huHf0nsHZtWddjy0+5ofLpu7E7t7msObpUwqmNDJ8ePRB',
		'4urWq7bn1p1zAduERRMo9EA2geKJ4d/ff0xPTj/RgmtafBRuEyggltZBQm9Z87K8Xz9/sYEj7s+P',
		'P2xPzkA0nV1z1g3dpq1Tt8aCIhcccSAChEE2gZx3/9h9/fMbzjufWHbC+/T6066gePrz+w8LWA0w',
		'GQEALmFPMDenVEIAAAAASUVORK5CYII='].join("")
	};
sukuri.surfaces = {
		 surface0 : ['data:image/png;base64,',
		'iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAMAAAC5KTl3AAAACVBMVEUA/wAAAJP///8KY4d+AAAA',
		'AXRSTlMAQObYZgAAAT9JREFUeJzt19EWwiAIBmDx/R+61Y4OEOEXTl3lXWt+/TBzW2v/URn0HmWg',
		'QlyTey8KvUviULsBLhyWRJbQD4gBCOHzEQfuNrLkoy8HEcgWIILm2YsAEqwJqpEgMYCbYMFmcaHQ',
		'mcBLI7QXjjAOp4RnjVzHI4FModkC8aHPVAVbgqhtImw5SGAR2CF5/XUoffr4YgHYErJ2J301jfnL',
		'MrQIXWuS8AB/1YoIOwBb+F6EDv37fAAJEQgxEQFxHWWBYiEgNoI86BJckFuiJKA2sGk6mBfCjKCr',
		'cEPwXzM6ojeBQHDGN4W507Dc9tX1tolN6biwAMcZkDa4AgS4nSxGaHCEYhHuhg0CJcG768DCdj4k',
		'hPtsFQgJ6I4VCBEgn5MyEZp6dM8A8gkuBbT5yqOIA0BQbH7uzY6XlAIeIzv9N+MFC5YMR/clzOAA',
		'AAAASUVORK5CYII='].join("")
		,surface1 : ['data:image/png;base64,',
		'iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAMAAAC5KTl3AAAACVBMVEUA/wAAAJP///8KY4d+AAAA',
		'AXRSTlMAQObYZgAAAThJREFUeJzt19sOwiAMBmDK+z+0omwt0MNfMF6tF8aQ9VspSLCUJ86DiI6B',
		'I4KovmNfoC+wLXzqv4WNyTDQhPa9GYm29PzPZxO61QMCOIUFusYQoVbx1i4KVivZEcrVBx6ckkm8',
		'bBX4MU2Qw/xCSdD8plGYADlH8p6Vg3UNSQz94cdZUPJvQll5mgszANH+RRgLU6cw9GKJcUvagE1M',
		'gCP4xNQVk9DnofR1m4iA+AcYClERfh8xIQICgsRZsc5/2f12CVYlBArAciTaQFXhHEFZCZpyswLt',
		'1XCwI4Dt5AvK8ZoXIMATMOAngnlcgoJZxB9rsI8pfC2cLQUC3rY+BJBdFd63oq0NXNgcAr3xmQJ8',
		'Y7SIzPXXvQShhFpCQlCIJKAduRt/AY7yi/wTAK+hRpzkC2M3/YlMvADyOgxxRqoj4QAAAABJRU5E',
		'rkJggg=='].join("")
		,surface10 : ['data:image/png;base64,',
		'iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAMAAAC5KTl3AAAACVBMVEUA/wCTAAD///8+ZK3ZAAAA',
		'AXRSTlMAQObYZgAAAU1JREFUeJzV19luAzEIBdDA/3902nq8gFkuoQ+tpSijkTnCxljJ6/WXB/WF',
		'NkFdgqhLUJv4CucW8Q0wd9IYAjeWMoAGQVP4mNgCf1YUOoSHKBpCKBJjrgA2gwtkCIyer0BA0wgE',
		'MA0vGCdiASDcBRiErfl7oAjnkES7KIg5TxFRJRWxppERn4RPYT5fQh4/iPVUKsMtGNsArWARorA0',
		'ruYwZfGSz6NBe9hTbYF0CqbiLkuWUt9HAPAswxKScdy/UsiP4fFZuR61xJpBVEX3FX4chVDsai3o',
		'vi6caVuop0CtBEIB729beL5TxbghRV/keRjCvqHQW+Iq5sMwtBNWCiuRNDoEwC69D3SRiAGEyIW8',
		'zSPAu29lfA64BhQ/57nxURX0z1iqhOsakDMCYAq0v2vx5y7+ADeShJ/EFtZbIPpy2LyNa8Iv/FVs',
		'Af9uvAGmsQ4ovzmZYgAAAABJRU5ErkJggg=='].join("")
		,surface11 : ['data:image/png;base64,',
		'iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAMAAAC5KTl3AAAACVBMVEUA/wCTAAD///8+ZK3ZAAAA',
		'AXRSTlMAQObYZgAAAWVJREFUeJzt1styBCEIBdC+/P9HJ5OOPAVRV6mKm6nJNKcFhcrz/K9iAffC',
		'JQHcEgBdGt8CXe0DH+HKeIEbg4WX2Dcgwi/RVt4nNaCIlsEPk119IhP6Ra0Eat2xLFYZl8KaWAof',
		'41ZYEB0hJ6pT0HXIifIgBUC+i14NFpuYhZhvP1nkxGQTLi3IJqZE0lAEJ+SbyFqSZGCNUiZTIxW4',
		'GpC0plMjCJJ2rIuapFsCRYGM4JMgrpz5o/msBUwE9eMki/AQdObu1QjAow5Lpy0vM7+OI7FHUbWG',
		'28IQuvF8CXwd0Hs9jWOJKDi+ilavtALfyNZom5BypY8EuNssp3wkPKrhNgDT2NypZ0mEZJJG6Akg',
		'Cje7k4TP5XALqqAdIAo7payAluDnKwsUmmcHeNQIPwPGhFt3eQbIkKwJFIJUIjfKeFEygq9bBZh9',
		'zMO7/07q6w29FvHcnpBsdqLFiKsZ7KmjsL+7vgBH/Q8cfR4GFAAAAABJRU5ErkJggg=='].join("")
	};
sukuri.init = function(){
	if (!sukuri.status) {
		sukuri.cssInit();
		sukuri.status = "booted";
	};	
	sukuri.reboot();
};
sukuri.reboot = function(){
	sukuri.setFeild();
	sukuri.recieveRequest();
	sukuri.SakuraScript = sukuri.shiori.GET.OnBoot();
	sukuri.SakuraScriptChrAt = null;
	sukuri.playSakuraScript.play();
};
var setSukuriBootButton = function(){
	var sukuriBootElm = document.getElementById(sukuri.PRE + "_boot");
	var sukuriBootMenuElm = document.getElementById(sukuri.PRE + "_bootmenu");
	var sukuriBootUl = document.getElementById(sukuri.PRE + "_bootghosts");
	var existSukuri = sukuriBootElm && sukuriBootMenuElm && sukuriBootUl;
	if (!existSukuri) {
		sukuriBootElm = document.createElement("div");
		sukuriBootElm.id = sukuri.PRE + "_boot";
		sukuriBootElm.setAttribute("title", "Call Ghost");
		sukuriBootMenuElm = document.createElement("div");
		sukuriBootMenuElm.id = sukuri.PRE + "_bootmenu";
		sukuriBootElm.appendChild(sukuriBootMenuElm);
		var sukuriBootP = document.createElement("p");
		setTextContent(sukuriBootP, "call ghost");
		sukuriBootMenuElm.appendChild(sukuriBootP);
		sukuriBootUl = document.createElement("ul");
		sukuriBootUl.id = sukuri.PRE + "_bootghosts";
		sukuriBootMenuElm.appendChild(sukuriBootUl);
		document.body.appendChild(sukuriBootElm);
		var sheet = addCSS(["\
#", sukuri.PRE, "_boot div, #", sukuri.PRE, "_boot p, #", sukuri.PRE, "_boot ul, #", sukuri.PRE, "_boot li {\n\
	margin: 0;\n\
	padding: 0;\n\
	text-align: left;\n\
}\n\
#", sukuri.PRE, "_boot span {\n\
	font-size: 100%;\n\
	font-weight: normal;\n\
	font-family:'\u30d2\u30e9\u30ae\u30ce\u89d2\u30b4 Pro W3','Hiragino Kaku Gothic Pro','\u30e1\u30a4\u30ea\u30aa',Meiryo,'\uff2d\uff33 \uff30\u30b4\u30b7\u30c3\u30af',sans-serif;\n\
}\n\
#", sukuri.PRE, "_boot {\n\
	width: 10px;\n\
	height: 10px;\n\
	background-color: #00f;\n\
	z-index: 9999;\n\
	position: fixed;\n\
	right: 10px;\n\
	bottom: 10px;\n\
}\n\
#", sukuri.PRE, "_bootmenu {\n\
	visibility: hidden;\n\
	font-size: small;\n\
	min-width: 150px;\n\
	white-space: nowrap;\n\
	width: auto;\n\
	height: auto;\n\
	background-color: #eee;\n\
	border: #333 solid 1px;\n\
	position: fixed;\n\
	right: 10px;\n\
	bottom: 10px;\n\
}\n\
#", sukuri.PRE, "_boot:hover > #", sukuri.PRE, "_bootmenu {\n\
	visibility: visible;\n\
}\n\
#", sukuri.PRE, "_bootmenu > p {\n\
	background-color: #ddd;\n\
	text-indent: 5px;\n\
	font-style: italic;\n\
	border-bottom: #333 dashed 1px;\n\
}\n\
#", sukuri.PRE, "_bootmenu > ul {\n\
	list-style: none;\n\
}\n\
#", sukuri.PRE, "_bootmenu span.", sukuri.PRE, "_bootok {\n\
	display: block;\n\
	color: #000;\n\
	text-indent: 0.5em;\n\
	cursor: pointer;\n\
}\n\
#", sukuri.PRE, "_bootmenu span.", sukuri.PRE, "_bootng {\n\
	display: block;\n\
	color: #aaa;\n\
	text-indent: 0.5em;\n\
	cursor: auto;\n\
}\n\
#", sukuri.PRE, "_bootmenu span.", sukuri.PRE, "_bootok:hover {\n\
	color: #fff;\n\
	background-color: #666;\n\
}\n\
#", sukuri.PRE, "_bootmenu span.", sukuri.PRE, "_bootng:hover {\n\
	color: #aaa;\n\
	background-color: #666;\n\
}\n\
"].join(""));
	}
	var sukuriBootLi = document.createElement("li");
	sukuriBootUl.appendChild(sukuriBootLi);
	var sukuriBootSpan = document.createElement("span");
	sukuriBootSpan.className = PRE + "_bootok";
	setTextContent(sukuriBootSpan, sukuri.GhostDescript.name);
	sukuriBootLi.appendChild(sukuriBootSpan);
	var sukuriBoot = function(evt){
		removeListener(sukuriBootSpan, "click", sukuriBoot);
//		sukuriBootLi.style.visibility = "hidden";
//		setTimeout(function(){
//			sukuriBootLi.parentNode.removeChild(sukuriBootLi);
//			if (sukuriBootUl.childNodes.length == 0) {
//				sukuriBootElm.parentNode.removeChild(sukuriBootElm);
//			};
//		}, 100);
		sukuriBootSpan.id = PRE + "_bootghost_" + sukuri.GhostDescript.id;
		sukuriBootSpan.className = PRE + "_bootng";
		sukuri.PRE = PRE + "_" + sukuri.GhostDescript.id;
		if (document.getElementById(sukuri.PRE)) return;
		sukuri.init();
	};
	addListener(sukuriBootSpan, "click", sukuriBoot);
	addListener(sukuriBootElm, PRE + "_request", function(request){
		var j = JSON.parse(request.data);
		var cName;
		switch (j.ID) {
			case "OnOtherGhostBooted":
				cName = PRE + "_bootng";
				break;
			case "OnOtherGhostClosed":
				cName = PRE + "_bootok";
				break;
			default:
				return;
		}
		if (sukuri.GhostDescript.name !== j.Reference2)
			return;
		sukuriBootSpan.className = cName;
		switch (j.ID) {
			case "OnOtheGhostBooted":
				removeListener(sukuriBootSpan, "click", sukuriBoot);
				return;
			case "OnOtherGhostClosed":
				addListener(sukuriBootSpan, "click", sukuriBoot);
				break;
			default:
				return;
		}
	});
};
var bootSukuri = function() {
	if (sukuri.settings.bootAfterPageLoad) {
		sukuri.init();
	}
	else {
		setSukuriBootButton();
	}
};
if (document.body) {
	bootSukuri();
}
else {
	addListener(window, "load", bootSukuri);
}
})();