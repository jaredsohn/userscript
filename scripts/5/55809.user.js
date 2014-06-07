// ==UserScript==
// @name           langChecker
// @namespace      http://d.hatena.ne.jp/jimo1001/
// @include        http://*
// @include        https://*
// @version        0.1
// ==/UserScript==
(function() {
	var API_URL = "http://www.google.com/uds/GlangDetect?callback=getCallback&q=[text]&key=internal&v=1.0";
	var LANG_NAME = {
		"af":"Afrikaans",
		"sq":"Albanian",
		"am":"Amharic",
		"ar":"Arabic",
		"hy":"Armenian",
		"az":"Azerbaijani",
		"eu":"Basque",
		"be":"Belarusian",
		"bn":"Bengali",
		"bh":"Bihari",
		"bg":"Bulgarian",
		"my":"Burmese",
		"ca":"Catalan",
		"chr":"Cherokee",
		"zh":"Chinese",
		"zh-CN":"Chinesesimplified",
		"zh-TW":"Chinese_traditional",
		"hr":"Croatian",
		"cs":"Czech",
		"da":"Danish",
		"dv":"Dhivehi",
		"nl":"Dutch",
		"en":"English",
		"eo":"Esperanto",
		"et":"Estonian",
		"tl":"Filipino",
		"fi":"Finnish",
		"fr":"French",
		"gl":"Galician",
		"ka":"Georgian",
		"de":"German",
		"el":"Greek",
		"gn":"Guarani",
		"gu":"Gujarati",
		"iw":"Hebrew",
		"hi":"106hindi",
		"hu":"Hungarian",
		"is":"Icelandic",
		"id":"Indonesian",
		"iu":"Inuktitut",
		"it":"Italian",
		"ja":"Japanese",
		"kn":"Kannada",
		"kk":"Kazakh",
		"km":"Khmer",
		"ko":"Korean",
		"ku":"Kurdish",
		"ky":"Kyrgyz",
		"lo":"Laothian",
		"lv":"Latvian",
		"lt":"Lithuanian",
		"mk":"Macedonian",
		"ms":"Malay",
		"ml":"Malayalam",
		"mt":"Maltese",
		"mr":"Marathi",
		"mn":"Mongolian",
		"ne":"Nepali",
		"no":"Norwegian",
		"or":"Oriya",
		"ps":"Pashto",
		"fa":"Persian",
		"pl":"Polish",
		"pt-PT":"Portuguese",
		"pa":"Punjabi",
		"ro":"Romanian",
		"ru":"Russian",
		"sa":"Sanskrit",
		"sr":"Serbian",
		"sd":"Sindhi",
		"si":"Sinhalese",
		"sk":"Slovak",
		"sl":"Slovenian",
		"es":"107spanish",
		"sw":"Swahili",
		"sv":"Swedish",
		"tg":"Tajik",
		"ta":"Tamil",
		"tl":"Tagalog",
		"te":"Telugu",
		"th":"Thai",
		"bo":"Tibetan",
		"tr":"Turkish",
		"uk":"Ukrainian",
		"ur":"Urdu",
		"uz":"Uzbek",
		"ug":"Uighur",
		"vi":"Vietnamese",
		"":"Unknown"
	};
	var STYLE = 'p.langChecker { position:fixed; z-index:999999; word-break:break-all; width:auto; height:15px; color:green; background-color:#FFF; fount-size:90%;}';
	GM_addStyle(STYLE);
	var ELEMENT;
	var checkLanguage = function(text, x, y) {
		var url = API_URL.replace("[text]",escape(text));
		var req = {
			method: 'get',
			url: url,
			onload: function(res) {
				return popup(eval(res.responseText), x, y);
			}
		};
		GM_xmlhttpRequest(req);
	};
	var getCallback = function(r) {
		var l = LANG_NAME[r.responseData.language]
		return (r.responseData.confidence < 0.3)?"たぶん"+l:l;
	};
	var popup = function(lang, x, y) {
		if(!ELEMENT) init();
		ELEMENT.setAttribute("style", "left:"+x+"px;top:"+(y+10)+"px;");
		ELEMENT.innerHTML = lang;
	};
	var init = function() {
		ELEMENT = document.createElement("p");
		ELEMENT.setAttribute("class", "langChecker");
		document.body.appendChild(ELEMENT);
		return;
	};
	window.addEventListener("mouseup", function(e) {
		var t = window.getSelection().toString();
		if(!t)
			return ELEMENT.style.display = "none";
		var x = e.clientX, y = e.clientY;
		checkLanguage(t, x, y);
	}, false);
})();

