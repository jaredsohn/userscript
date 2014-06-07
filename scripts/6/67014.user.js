// ==UserScript==
// @name           beefriends
// @namespace      http://www.hatena.ne.jp/Nikola/
// @description    User JavaScript for UKAGAKA - Ghost "beefriends"
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
	charNum: 1,
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
				var talk;
				switch ((new Date()).getHours()) {
					case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11:
						talk = [
							 "\\0\\s[0]おはようございます。\\_w[1000]\\n\\s[5]今日もいい日になりますように。\\_w[1000]\\e"
							,"\\0\\s[5]おはようございます。\\_w[1000]\\n\\s[1]今日も素敵な朝ですね。\\_w[1000]\\e"
						];
						break;
					case 12: case 13:
						talk = [
							 "\\0\\s[0]こんにちは。\\_w[1000]\\n\\s[5]もうお昼ですね。\\_w[1000]\\e"
							,"\\0\\s[0]こんにちは。\\_w[1000]\\n\\s[5]お昼休みですか？\\_w[1000]\\e"
						];
						break;
					case 14: case 15: case 16: case 17:
						talk = [
							 "\\0\\s[5]こんにちは。\\_w[1000]\\n\\s[6]お邪魔致します。\\_w[1000]\\e"
							,"\\0\\s[0]お呼びですか？\\_w[1000]\\n\\s[5]ご一緒させて頂きますね。\\_w[1000]\\e"
						];
						break;
					case 18: case 19: case 20: case 21:
						talk = [
							 "\\0\\s[0]こんばんは。\\_w[1000]\\n\\s[5]夜はなんだかウキウキしますね。\\_w[1000]\\n\\s[1]なんでだろう……。\\_w[1000]\\e"
							,"\\0\\s[0]こんばんは。\\_w[1000]\\n\\s[6]星が降りそうな、\\_w[500]素敵な夜ですね……。\\_w[1000]\\e"
							,"\\0\\s[0]こんばんは。\\_w[1000]\\n\\s[5]今日はどんな一日でしたか？\\_w[1000]\\e"
							,"\\0\\s[2]あ…、\\_w[500]\\s[5]こんばんは。\\_w[1000]\\n\\s[0]もしお疲れでなかったら、\\_w[500]\\_w[1000]\\nおやすみになるまでご一緒していいですか？\\_w[1000]\\e"
						];
						break;
					default:
						talk = [
							 "\\0\\s[6]……静かな夜ですね。\\_w[1000]\\n\\s[0]大地の精霊達も、\\_w[500]この時間は眠っているみたいです。\\_w[1000]\\n\\s[5]起こさないように、\\_w[500]小声でお喋りしましょうね？\\_w[1000]\\e"
							,"\\0\\s[2]あ…、\\_w[500]\\s[5]こんばんは。\\_w[1000]\\n\\s[0]眠れないんですか？\\_w[1000]\\n\\s[5]よろしければ、\\_w[500]ご一緒にお話しませんか？\\_w[1000]\\e"
						];
						break;
				}
				return talk[Math.floor(Math.random() * talk.length)];
			},
			OnAITalk: function(reference){
				var talk = [
					 "\\0\\s[0]風の強い日って、\\_w[500]\\nうなるような音が聞こえますよね。\\_w[1000]\\n\\s[3]私、あれ、すごく怖いんです……。\\_w[1000]\\e"
					,"\\0\\s[1]台風の日って、\\_w[500]\\n外に出たくなります……。\\_w[1000]\\e"
					,"\\0\\s[6]風船をいくつ持てば、\\_w[500]\\n空を飛べるんでしょう……。\\_w[1000]\\e"
					,"\\0\\s[4]怖い話を聞いた日は、\\_w[500]\\nなかなか眠れません……。\\_w[1000]\\n\\s[3]怖い話、\\_w[500]しないでくださいね？\\_w[1000]\\e"
					,"\\0\\s[5]私、\\_w[500]木登り得意なんですよ？\\_w[1000]\\n\\s[4]降りるのが苦手なだけなんです……。\\_w[1000]\\e"
					,"\\0\\s[7]いつか私、\\_w[500]\\n絶対に壊れないシャボン玉を作るんです！\\_w[1000]\\e"
					,"\\0\\s[3]私、\\_w[500]カラスになつかれるんです。\\_w[1000]\\n\\s[4]怖いんですけど……。\\_w[1000]\\e"
					,"\\0\\s[3]流れ星って、\\_w[500]見たことないんです。\\_w[1000]\\n\\s[5]お願いしたいこと、\\_w[500]\\nたくさんあるんですけどね。\\_w[1000]\\e"
					,"\\0\\s[5]水たまりを踏んで歩くのが好きです！\\_w[1000]\\e"
					,"\\0\\s[3]猫って、\\_w[500]ちょっと怖いです……。\\_w[1000]\\n\\s[4]みんな可愛いっていうんですけど……。\\_w[1000]\\e"
					,"\\0\\s[4]同じものがたくさんあると、\\_w[500]\\n大切にしなくなりますね……。\\_w[1000]\\e"
					,"\\0\\s[4]人の笑顔を見るのは好きですけど、\\_w[500]\\n笑われるのは嫌いです……。\\_w[1000]\\e"
					,"\\0\\s[3]私と同じくらいの大きさの、\\_w[500]\\n卵の殻が落ちていたんですけど……。\\_w[1000]\\n\\s[4]な、\\_w[500]何が入っていたんでしょう……。\\_w[1000]\\e"
					,"\\0\\s[5]毎日、\\_w[500]寝るのが\\nもったいないって思います。\\_w[1000]\\e"
					,"\\0\\s[5]霞って、\\_w[500]おいしいですよね。\\_w[1000]\\e"
					,"\\0\\s[2]どこまでが地球で、\\_w[500]\\nどこまでが宇宙なんでしょう……？\\_w[1000]\\e"
					,"\\0\\s[2]お日さまとお月さまって、\\_w[500]\\n同じくらいの大きさだと、\\_w[500]\\nずっと思ってました……。\\_w[1000]\\e"
					,"\\0\\s[1]消しゴムを最後まで使い切るのが夢です……。\\_w[1000]\\e"
				];
				return talk[Math.floor(Math.random() * talk.length)];
			},
			OnMouseDoubleClick: function(reference){
				switch (reference[3]) {
					case 0:
						switch (reference[4]) {
							case "Head":
								var talk = [
									  "\\0\\s[4]痛い……。\\e"
									 ,"\\0\\s[3]私、何か気に障ることしました……？\\e"
									 ,"\\0\\s[3]……？？\\_w[500]\\n\\s[4]ごめんなさい……。\\e"
								];
								return talk[Math.floor(Math.random() * talk.length)];
							case "Bust":
								var talk = [
									  "\\0\\s[3]なにするんですか…。\\_w[1000]\\e"
									 ,"\\0\\s[4]やめてください…。\\_w[1000]\\e"
								];
								return talk[Math.floor(Math.random() * talk.length)];
							default:
								var talk = [
									 "\\0\\s[0]なんですか？\\n\\![*]\\q[何か話して,talk]\\n\\![*]\\q[終了,close]\\n\\![*]\\q[何でもない,Menu_CANCEL]\\e"
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
									  "\\0\\s[1]えへ。\\e"
									 ,"\\0\\s[1]……ありがとうございます。\\e"
									 ,"\\0\\s[1]私、\\_w[500]もっとこうしていたい……。\\e"
									 ,"\\0\\s[5]わ、私、褒められるようなことしました？\\e"
									 ,"\\0\\s[5]べ、別に落ち込んでなんかいませんよ？\\e"
									 ,"\\0\\s[6]ん……。\\e"
								];
								return talk[Math.floor(Math.random() * talk.length)];
							case "Bust":
								if (typeof sukuri.shiori.variable._0BustMouseMove == "undefined") sukuri.shiori.variable._0BustMouseMove = 0;
								sukuri.shiori.variable._0BustMouseMove++;
								if (sukuri.shiori.variable._0BustMouseMove < 50) return null;
								sukuri.shiori.variable._0BustMouseMove = 0;
								var talk = [
									  "\\0\\s[9]……何かお探しですか？\\e"
									 ,"\\0\\s[2]ど、どうかしましたか？\\e"
									 ,"\\0\\s[1]何するんですか、もう…。\\e"
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
					default:
						return null;
				}
			},
			OnChoiceSelect: function(reference){
				switch (reference[0]) {
					case "talk":
						return sukuri.shiori.GET.OnAITalk();
					case "close":
						return sukuri.shiori.GET.OnClose();
					case "Menu_CANCEL":
					default:
						return "\\e";
				}
			},
			OnClose: function(reference){
				var talk;
				switch ((new Date()).getHours()) {
					case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11:
						talk = [
							 "\\0\\s[5]お疲れ様です。\\_w[2000]\\-"
							,"\\0\\s[5]またお会いしましょうね。\\_w[2000]\\-"
							,"\\0\\s[6]今日も素敵な一日になるといいですね。\\_w[1000]\\n\\s[5]それでは、\\_w[500]また。\\_w[2000]\\-"
						];
						break;
					case 12: case 13: case 14: case 15: case 16: case 17:
						talk = [
							 "\\0\\s[0]それでは、\\_w[500]失礼します。\\_w[2000]\\-"
							,"\\0\\s[5]また呼んで下さいね。\\_w[2000]\\-"
							,"\\0\\s[5]またご一緒させて下さいね。\\_w[1000]\\n\\s[6]お邪魔いたしました。\\_w[2000]\\-"
						];
						break;
					default:
						talk = [
							 "\\0\\s[6]おやすみなさい。\\_w[1000]\\n\\s[5]よい夢を。\\_w[2000]\\-"
							,"\\0\\s[0]私もそろそろ休ませて頂きますね。\\_w[1000]\\n\\s[5]おやすみなさい。\\_w[2000]\\-"
							,"\\0\\s[2]もうこんな時間。\\_w[1000]\\n\\s[6]お付き合い下さってありがとうございます。\\_w[1000]\\n\\s[5]では。\\_w[2000]\\-"
							,"\\0\\s[5]お疲れ様でした。\\_w[1000]\\n\\s[6]素敵な夢が訪れますように。\\_w[2000]\\-"
						];
						break;
				}
				return talk[Math.floor(Math.random() * talk.length)];
			},
			OnGhostChanging: function(reference){//reference[0] is null...
				var talk = [
					"\\0\\s[0]" + reference[2] + "さんと交代しますね。\\_w[1000]\\n\\s[5]それでは、また。\\_w[2000]\\-"
				];
				return talk[Math.floor(Math.random() * talk.length)];
			},
			OnOtherGhostClosed: function(reference){
				var talk = [
					"\\0\\s[5]また一緒にお話しましょうね。\\_w[1000]\\n" + reference[0] + "さん。\\_w[1000]\\e"
				];
				return talk[Math.floor(Math.random() * talk.length)];
			},
			OnGhostCalling: function(reference){//reference[0] is null...
				var talk = [
					"\\0\\s[0]" + reference[2] + "さんをお呼びします。\\_w[1000]\\e"
				];
				return talk[Math.floor(Math.random() * talk.length)];
			}
		}
	};
sukuri.shiori.variable = new Object();
sukuri.ShioriResource = {
	 char0_defaultx: Root.clientWidth - 170
	,char0_defaulty: Root.clientHeight - 270
	,char0_recommendbuttoncaption: "びーの日記"
	,char0_recommendsites: [
		 {
			 title: "bee (beefriends) on Twitter"
			,url: "http://twitter.com/beefriends"
			,banner: "http://a0.twimg.com/a/1263516095/images/twitter_logo_header.png"
			,comment: ""
		}
		,{
			 title: "beefriends - はてなハイク"
			,url: "http://h.hatena.ne.jp/beefriends/"
			,banner: "http://h.hatena.ne.jp/images/haiku_logo.gif"
			,comment: ""
		}
		,{
			 title: "bee - FriendFeed"
			,url: "http://friendfeed.com/beefriends"
			,banner: "http://friendfeed.com/static/images/nano-logo.png?v=5ff0"
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
	]
};
sukuri.GhostDescript = {
	 id: "bee"
	,name: "びーふれんず"
	,char0_name: "びー"
	,char0_seriko_defaultsurface: 0
};
sukuri.ShellDescript = {
	 char0_balloon_offsetx: -220
	,char0_balloon_offsety: 20
};
sukuri.ShellSurfaces = {
	 surface0 : {
	 	 Head: "51,2,106,35"
		,Bust: "60,105,95,140"
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
	font-family:'ヒラギノ角ゴ Pro W3','Hiragino Kaku Gothic Pro','メイリオ',Meiryo,'ＭＳ Ｐゴシック',sans-serif;\n\
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
.", sukuri.PRE, "_surface0, .", sukuri.PRE, "_surface2, .", sukuri.PRE, "_surface5, .", sukuri.PRE, "_surface6, .", sukuri.PRE, "_surface7, .", sukuri.PRE, "_surface8, .", sukuri.PRE, "_surface9 {\n\
	background-image: url(", sukuri.surfaces.surface000 , ");\n\
}\n\
.", sukuri.PRE, "_surface1 {\n\
	background-image: url(", sukuri.surfaces.surface001 , ");\n\
}\n\
.", sukuri.PRE, "_surface3, .", sukuri.PRE, "_surface4 {\n\
	background-image: url(", sukuri.surfaces.surface003 , ");\n\
}\n\
.", sukuri.PRE, "_surface2:after {\n\
	content: '';\n\
	display: block;\n\
	position: absolute;\n\
	left: 70px;\n\
	top: 80px;\n\
	width: 15px;\n\
	height: 10px;\n\
	background-image: url(", sukuri.surfaces.element002 , ");\n\
	background-repeat: no-repeat;\n\
}\n\
.", sukuri.PRE, "_surface4:after {\n\
	content: '';\n\
	display: block;\n\
	position: absolute;\n\
	left: 50px;\n\
	top: 60px;\n\
	width: 50px;\n\
	height: 20px;\n\
	background-image: url(", sukuri.surfaces.surface102 , ");\n\
	background-repeat: no-repeat;\n\
}\n\
.", sukuri.PRE, "_surface5:after {\n\
	content: '';\n\
	display: block;\n\
	position: absolute;\n\
	left: 50px;\n\
	top: 60px;\n\
	width: 50px;\n\
	height: 20px;\n\
	background-image: url(", sukuri.surfaces.element005 , ");\n\
	background-repeat: no-repeat;\n\
}\n\
.", sukuri.PRE, "_surface6:after {\n\
	content: '';\n\
	display: block;\n\
	position: absolute;\n\
	left: 50px;\n\
	top: 60px;\n\
	width: 50px;\n\
	height: 20px;\n\
	background-image: url(", sukuri.surfaces.surface100 , ");\n\
	background-repeat: no-repeat;\n\
}\n\
.", sukuri.PRE, "_surface7:after {\n\
	content: '';\n\
	display: block;\n\
	position: absolute;\n\
	left: 50px;\n\
	top: 50px;\n\
	width: 50px;\n\
	height: 40px;\n\
	background-image: url(", sukuri.surfaces.element007 , ");\n\
	background-repeat: no-repeat;\n\
}\n\
.", sukuri.PRE, "_surface8:after {\n\
	content: '';\n\
	display: block;\n\
	position: absolute;\n\
	left: 50px;\n\
	top: 50px;\n\
	width: 50px;\n\
	height: 40px;\n\
	background-image: url(", sukuri.surfaces.element008 , ");\n\
	background-repeat: no-repeat;\n\
}\n\
.", sukuri.PRE, "_surface9:after {\n\
	content: '';\n\
	display: block;\n\
	position: absolute;\n\
	left: 50px;\n\
	top: 50px;\n\
	width: 50px;\n\
	height: 40px;\n\
	background-image: url(", sukuri.surfaces.element009 , ");\n\
	background-repeat: no-repeat;\n\
}\n\
#", sukuri.PRE, "_Shell0 {\n\
	width: 155px;\n\
	height: 250px;\n\
}\n\
#", sukuri.PRE, "_Shell0_Head {\n\
	position: absolute;\n\
	left: 51px;\n\
	top: 2px;\n\
	width: 55px;\n\
	height: 32px;\n\
	cursor: pointer;\n\
}\n\
#", sukuri.PRE, "_Shell0_Bust {\n\
	position: absolute;\n\
	left: 60px;\n\
	top: 105px;\n\
	width: 35px;\n\
	height: 35px;\n\
	cursor: url(", sukuri.cursors.cur.hand, "), url(", sukuri.cursors.png.hand, "), pointer;\n\
}\n\
#", sukuri.PRE, "_Shell0_Bust:active {\n\
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
			|| ((listtype === "recommend") ? "おすすめ"
																		 : (listtype === "portal") ? "ポータルサイト"
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
		setTextContent(gLiSpan, (summonType === "call") ? "他のゴーストを呼ぶ" : "ゴースト切り替え");
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
		setTextContent(closeLiSpan, "終了");
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
			insertDisableMenu("ネッワーク更新");
			insertHr();
			insertDisableMenu("アンインストール");
			if (!isMSIE) {
				insertHr();
				insertGhostCall("change");
				insertGhostCall("call");
			}
			break;
		default:
			insertDisableMenu("着せ替え");
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
		 surface000: ["data:image/png;base64,"
		,"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"
		,"hwAAAABJRU5ErkJggg=="].join("")
		,surface001: ["data:image/png;base64,"
		,"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"
		,"RU5ErkJggg=="].join("")
		,surface003: ["data:image/png;base64,"
		,"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"].join("")
		,surface100: ["data:image/png;base64,"
		,"iVBORw0KGgoAAAANSUhEUgAAADIAAAAUCAMAAAD4FJ6oAAACE1BMVEV7YkpcQFBKJ13989n989r9"
		,"9N799eH++Of++uz+++7+/O/++u3++uv++ur+9+X99d5IJVU3Bkh6YElTNVdwV3799N/++ez//fT/"
		,"/fb+/PT+/PH+/PD++OhEIk5FIkx2XEs8EE/WycT++u////r//vn+/PX//vf//vj//ff/+/H99eCT"
		,"foo5C0p6YUt3XUtJJlr++equoLmtn7pdQ3RcQnNcQnRPMGb///utoLquobv//fX99NxAGk5bP07E"
		,"tK3++etNLGNIJl8/FlZXOm1VN2tSNGg6DVJKKGGYh6k6DFNSNGlXOmxMLGNNLVpqT01EIU3Mwso7"
		,"DlKlla/Mw83NxM6ombFJJ19EIFubiqqbiqtEIFxJJ2CnmbPNxM/MxNOsmqVhRU5GJFKfj62Oe53U"
		,"zNPUzNTUzNfUzNWOe5yfj6zn4+RjSFxQMVr+/PPo4+JWOWBxWHT+/PJTNWF1W0uUgJVZPWd0WUtV"
		,"N0/VzM9jSHFGI1DZ0tdbQG5sUkxyV0xgRWDc1diIdJVlSk1aPk5sUm3e19msn7ZqUE9oTU5iR1B8"
		,"ZYHf2du7r8BsUld6YExiR1Ggj6bo4uBvVF9pTk18Y0x4X05NLlz39Ov28upOL1V+ZE15X1WAZ3t4"
		,"Yop2XoCBZ1BeQ097Ykt+ZU1QMlCvnp+OeY1rUVV/Zk5KKVJmS1eMdoa/tcRDHlR1W0+AZ09tUltS"
		,"M1mqh+E1AAABiklEQVR4nGNgYGBYtHLVammiwJq169ZvYFjIsGjxklDidEhXL122fAUDw6zZc+YS"
		,"qQMI5s1fwDBl6rTpxOuQnjFzCkNf/4SJJGipnjSZoaOzq5sELT29DAzNdS2tJGhpawcGcV19Awla"
		,"GpuAWhiqqknQUlML0lJeQYKWSj+QluISErSUloG0MBRgykgVFhZKSWHRUgTWwZDDjSYuqaKsrKwC"
		,"BOqquagSefkQLYlaHEnJcOGUVEllcxhQVklLh8tkZKpkZUO0+DNbB3gFBgUHh4SEhIaFRyB0AEFk"
		,"VHRMbEhIcHBQoGucRnwCRIutHTOzvYOjk7OLq5mbu4c5KvBw9zTzcvF2cvRRERf19YNo0dNnZmYx"
		,"MDQyNjE1M8cGzExNjS0srQysmW3kIVrkFRSZmZlZlSSUIUBFVRIMVNXU1VVUlEFhoayhqcXCzKyt"
		,"owvRwiAswgwComLiEpKS6GEL5HNzy4iCVcjKQXUwMDIxQwALKxs7BycXBHByc/BwcPDy8vGzQKUF"
		,"BIWAqgH1mpZ8YZLmQQAAAABJRU5ErkJggg=="].join("")
		,surface102: ["data:image/png;base64,"
		,"iVBORw0KGgoAAAANSUhEUgAAADIAAAAUCAIAAABAqPnNAAAElklEQVR4nMWWi09bVRjA+wf4N5gl"
		,"GueMURwYI5rFZIxXn3SwAgX6gpbHoK6spaXAipLC2gqDjPcYMHmPwZSwMVkGKJoZGSB2loeUrTIe"
		,"LY8CbaGvi1/ba4uMp6vx5peTk3u+832/nnt67sWImaEuchLwbCxFIZD2dQ8iNv0rkse9fqz4s6+H"
		,"86lECYeYSqaSfaMwYibW5UQ6Teq8WdtS+c2rOwFTyvGcxKKjx0+MqQpFX6WERVxhE0JPkTEOp3i8"
		,"iBYh4YiFTJlXnP41gjhJLocUd5aIyWLhhDQC/r2YTYPu/3UCTOtawvsRoITJpOOYQWF1RU0Lmmfu"
		,"4dHHo+XSBimvTJJSci27FrGt/Uce13LqJBdL8tMryqWNo49/hUfJDaclEfCYRDyBGUTKSsidmZiC"
		,"uPridlaIoDir3G58jlhX0PmW5Y66e94V6qjrcXZWHa11xW7UQFFaAI/ySTjsK0z0GQKPgrtITlWr"
		,"Jjb0C7Rz6faNCQemP9E5tlXog2Vn/X1vOUEq25YWgRKbs4h5ATEv2g1qKGrRq0g+sSI61rHlQYt+"
		,"jv7H0/H+roH+b+9trSgt+t+tRg2aBeZsTKp+HijL+9pbWqVf1o8MfLc+P2xaGgMVu2EaSkBfO/1j"
		,"960WEZ2GcR1agW+Q4Ll+Hpk7P94/p+pTXC6SC8pkGVXSS+Vws1ZeO9jVIWQUeEtLQJN+f/dOzdW6"
		,"tAuSPG6pXFhzVXhDISjRjPUCjMAkVCviI+LoT0PYdxgPmps5+AyzaX17x2Uzm4pEpWQ/jre0yL7s"
		,"4pyb7vxWm21p3QhwiOIHzW3Bb0ajWnwqVs4vzIyXVSlaYHj7pWv2xXLPnT6vOFm3lnrae3W6NXdy"
		,"ixXVAkoL2rgUEcb98slkXVGIqrT6DRiDuJ1Odjuinll8eH/4hqJtr0pwfKz/zdqhp0lFQQuk0mo9"
		,"Wu7VAmae6woyqj1aVbKGick53ZoBxgxbll1a0+rFhz0jlbJdWoZtxAy/FgX6HrYQmxGxbeyx3/Nb"
		,"IdXqqsGTH9ledmtpdJOTcx6tL7jXQWvJqaU3mn75QXW38VFpfjNQVtCikNyCUVZoJuRVDv2mHFI6"
		,"nBw21v1xiCqHVMqhpzu1IMnk1HxTRU+lvNWVv6Giq72pV62Zh9LqZ9p/aMGLEQpPTc8xceLYID41"
		,"OB3vn5gQn+0iipgedIpGPM0OOUkLOEGtlrUd5oRSLbsdcCIm5CS9ubLryeDIk8Fhki8n5F1mDFng"
		,"Tg6FAJxfAhObOTKqBmmPFj8uu6tzEOcTH4nluSfsAuvDCn6LVpHfehQhNxAf+jbD/7XzRB826QM2"
		,"3o+9X34q4XLYh0mPeod3rBY2jeSftN8EF7HU9KbK7mM57QS06Fg+PUZ4cJULn6WhWrxIHPljzsHR"
		,"8fFZUdHcS3F57g3u3NSGlzBuI5uw5Z2Y0f+Es900GYhnOAyG6OBCAKqVm5IUHsg9RIuVRYlKiyXw"
		,"ZmdmjvlNgZ4aZYU1oZ+yGIxDVsujlRyefGgoiymmRKaSycnV8kbnx8XqHsB9yzJiWUIsOmcLaB1s"
		,"vrAb1bEk3nly8lFW6y8asya3vNJ3OAAAAABJRU5ErkJggg=="].join("")
		,element002: ["data:image/png;base64,"
		,"iVBORw0KGgoAAAANSUhEUgAAAA8AAAAKCAMAAABcxfTLAAAA51BMVEVbQS1VPDJUOjNSNFbj1bzj"
		,"1Lzk1r3l1r7It69CH0yCbGF4YnRaQGVaP01VOFVUN1pbP2B2XXyxnqTk1b3i0rtcPmtPLmFmS3NY"
		,"PUNnTThgRzJeQW2Hb4rm17/n2MDk1LyxnJ+mkZnUw7Tn2cGnkpxRMV9iRWNXPEbo2sLr3sbs38fs"
		,"4Mjv48q6qKmumqJdQW/j1sLp28Pezrf27NL57tX579W8q65vVXv78tjx59GVf5Tcz8P68Nb06tDw"
		,"5Mv989nXyMCPeJDBsbLPv7qahZj98tjz6NKQepGPeZD99eD99N799Nv989rhofdDAAAAeklEQVR4"
		,"nGPw9PT0AgJve3sfH3t7ewZ7VICV7+bs7uGExHdwdHJ2AXNdGYxNTE3NzC0sraxtTIxt7Rg0NLW0"
		,"tHV09fQNtA1l2Y0YpGVk5WTlFRSVZJVVVNXUGXj5+AUEhYRFRMXEJSSlGBgYGBmZmFlY2djYOTi5"
		,"uHkA1rAcEedUlWYAAAAASUVORK5CYII="].join("")
		,element005: ["data:image/png;base64,"
		,"iVBORw0KGgoAAAANSUhEUgAAADIAAAAUCAMAAAD4FJ6oAAAB71BMVEV7YkpcQFBKJ13989n989r9"
		,"9N799eH++Of++uz+++7+/O/++u3++uv++ur+9+X99d5IJVU3Bkh6YElTNVdwV3799N/++ez//fT/"
		,"/fb+/PT+/PH+/PD++OhEIk5FIkx2XEs8EE/WycT++u////r//vn+/PX//vf//vj//ff/+/H99eCT"
		,"foo5C0p6YUt3XUtJJlr++er//fX//fj///v99NxAGk5bP07EtK3++ev//vb+/PL+/PNNLVpqT01E"
		,"IU2smqVhRU5GJFLn4+RjSFxQMVqYh6WYh6fo4+JWOWBxWHRUNmnMw81qUn5TNWF1W0uUgJXe2NpB"
		,"GljDucdIJV5RM2dZPWd0WUtVN0/VzM/e19lAGVdmTXqIc5c+FlZjSHFGI1DZ0tfy7udeQ3M6ClFN"
		,"LWO8sMFeRHQ8EFSVg6JbQG5sUkxyV0xgRWDc1dji3N1+aY9PMGVDHVpEH1uHc5fSytKIdJVlSk1a"
		,"Pk5sUm2sn7ZqUE9oTU5iR1B8ZYHf2du7r8BsUld6YExiR1Ggj6bo4uBvVF9pTk18Y0x4X05NLlz3"
		,"9Ov28upOL1V+ZE15X1WAZ3t4Yop2XoCBZ1BeQ097Ykt+ZU1QMlCvnp+ombGOeY1rUVV/Zk5KKVJm"
		,"S1eMdoa/tcRDHlR1W0+AZ09tUltSM1mXJTJ7AAABxklEQVR4nGNgYGCYOnfefGmiwIKFixYvYZjC"
		,"MHXa9BnE6ZBOmDlr9hwGht6+/glE6gCCiZMmM7R3dHYRr0O6u6edobGpuYUELQmtbQzVNbV1JGip"
		,"b2BgKM+uiCRBS2UVMIizc3IhvLz8gsKooqLiElRFJcVFRVGFBfl5YF5pGVALQ3wCiJ2YlJySCqTT"
		,"0jNQtWSkpwHJ1JTkpEQgnZkF0hIeAWRGRkVDlcTEomqJjYEyoqOAPoizBWnx85eWDggMgqsJDkHW"
		,"ERIMZwYFBkiHhoG0MHhKS3t5I6nykZaWsrKykpKCcuDA20vaF6yDwYVb2hXFLZIqysrKKkCgrmqN"
		,"IuHm7gHR4qjFIYmiQ9kYBpRVkDVZqTg5Q7TYMZsYSFrBxK3VETpQNVmpa9g7QLSYmTMzWxhaSlpZ"
		,"WUuqomoAa1IGuk9KykpVRVzUxhaiRU+fmZnFwNBIRQVDOVwX0GOGBibMpvIQLfIKiszMzKxKEsoQ"
		,"oKIqCQaqaurqQGNAYaGsoanFwsysraML0cIgLMIMAqJi4hKSkpCwRQAgn5tbRhSsQlYOqoOBkYkZ"
		,"AlhY2dg5OLkggJObg4eDg5eXj58FKi0gKARUDQALCpWfOwevNQAAAABJRU5ErkJggg=="].join("")
		,element007: ["data:image/png;base64,"
		,"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"
		,"RK5CYII="].join("")
		,element008: ["data:image/png;base64,"
		,"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"
		,"AABJRU5ErkJggg=="].join("")
		,element009: ["data:image/png;base64,"
		,"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"
		,"wQAAAABJRU5ErkJggg=="].join("")
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
	font-family:'ヒラギノ角ゴ Pro W3','Hiragino Kaku Gothic Pro','メイリオ',Meiryo,'ＭＳ Ｐゴシック',sans-serif;\n\
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