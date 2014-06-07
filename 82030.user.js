// ==UserScript==
// @name           Travian - Antibot detection warning
// @version        1.1.2
// @namespace      http://userscripts.org/users/85337
// @description    Travian - Antibot detection warning
// @exclude        http://*.travian*.*/hilfe.php*
// @exclude        http://*.travian*.*/log*.php*
// @exclude        http://*.travian*.*/index.php*
// @exclude        http://*.travian*.*/anleitung.php*
// @exclude        http://*.travian*.*/impressum.php*
// @exclude        http://*.travian*.*/anmelden.php*
// @exclude        http://*.travian*.*/gutscheine.php*
// @exclude        http://*.travian*.*/spielregeln.php*
// @exclude        http://*.travian*.*/links.php*
// @exclude        http://*.travian*.*/geschichte.php*
// @exclude        http://*.travian*.*/tutorial.php*
// @exclude        http://*.travian*.*/manual.php*
// @exclude        http://*.travian*.*/ajax.php*
// @exclude        http://*.travian*.*/ad/*
// @exclude        http://*.travian*.*/chat/*
// @exclude        http://analytics.travian*.*/*
// @exclude        http://forum.travian*.*
// @exclude        http://board.travian*.*
// @exclude        http://shop.travian*.*
// @exclude        http://*.travian*.*/activate.php*
// @exclude        http://*.travian*.*/support.php*
// @exclude        http://help.travian*.*/*log
// @exclude        *.css
// @exclude        *.js
// @include        http://*.travian*.*/*.php*
// ==/UserScript==

var dom = {
	check: function(xpathExpression, contextNode) {
		return document.evaluate(xpathExpression, contextNode || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue != null;
	},

	first: function(xpathExpression, contextNode) {
		return document.evaluate(xpathExpression, contextNode || document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	},

	all: function(xpathExpression, contextNode) {
		var iterator = document.evaluate(xpathExpression, contextNode || document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
		var item, items = [];
		for (item = iterator.iterateNext(); item; item = iterator.iterateNext()) {
			items.push(item);
		}
		return items;
	},

	create: function(params) {
		var type = params.type;
		var attributes = params.attributes;
		var properties = params.properties;
		var events = params.events;
		var childs = params.childs;
		var node;
	
		node = document.createElement(type);
		if (attributes) {
			for (var attribute in attributes) {
				node.setAttribute(attribute, attributes[attribute]);
			}
		}
		if (properties) {
			for (var property in properties) {
				if (property in node) node[property] = properties[property];
			}
		}
		if (events) {
			for (var event in events) {
				node.addEventListener(event, events[event], false);
			}
		}
		if (childs) {
			var fragment = document.createDocumentFragment();
			for (var child in childs) {
				fragment.appendChild(dom.create(childs[child]));
			}
			node.appendChild(fragment);
		}
		return node;
	},

	addStyle: function(css) {
		var head, style;

		head = document.getElementsByTagName("head")[0];
		if (!head) {
			return;
		}
		style = dom.create({type: "style", attributes: {"type": "text/css"}, properties: {textContent: css}});
		head.appendChild(style);
	}
};

var translations = {
	messages: {},

	initLanguage: function() {
		switch (main.server.language) {
			case "sk":
			case "cz":
				translations.messages = {
					"Travian - Antibot detection warning": "Travian - Upozornenie na činnosť „antibota“",
					"Close window": "Zatvoriť okno",
					"Detected Travian \"antibot\".<br>Disable Travian Beyond and reload page<br>(or don't click on suspicious links and/or forms).": "Detekovaný pokus o odhalenie TB.<br>Zakážte skripty a obnovte stránku<br>(alebo neklikajte na podozrivé linky a/alebo formuláre)."
				};
				break;
		}
	}
};

var modules = {
	run: function(panels, tests, color) {
		var t, fn, data;

		if (typeof(tests) === "string") {
			tests = [tests];
		}

		for (t in tests) {
			fn = modules[tests[t]];
			if (!fn) {
				continue;
			}
			data = fn();
			if (main.antibot) {
				break;
			}
		}
	},

	checkLink: function() {
		var links = dom.all("//a[contains(@href, 'c=')]");

		var urls = {};
		for (var i = 0; i < links.length; i++) {
			if (!/[&?]c=[0-9a-f]{6,6}/.test(links[i].search)) {
				continue;
			}
			var url = links[i].href.replace(/[?&]c=[0-9a-f]{6,6}/, "");
			if (!urls[url]) {
				urls[url] = 1;
			} else {
				urls[url]++;
				if (urls[url] >= 3) {
					main.antibot = true;
					return;
				}
			}
		}
	},

	checkForm: function() {
		var x;

		var forms = dom.all("//form[@class]");
		if (forms.length < 1) {
			return false;
		}
		x = {};
		for (var i = 0; i < forms.length; i++) {
			var h = "";
			var form = forms[i];
			h += (form.className || "CLASS") + "-";
			h += (form.action || "ACTION") + "-";
			h += (form.method || "METHOD");
			if (!x[h]) {
				x[h] = 1;
			} else {
				x[h]++;
				main.antibot = true;
				return;
			}
		}
	}
};

var main = {
	antibot: false,
	server: {name: "", version: 0, language: "en"},
	style: "#@ {position: fixed;left: 10px;bottom: 10px;border: 2px solid black;-moz-border-radius: 6px;-webkit-border-radius: 6px;color: white;font-size: 0.75em;font-weight: bold;opacity: 0.75;z-index: 9999;} #@ > div {padding: 0.5em 1em;} #@ > div:first-child {-moz-border-radius-topleft: 4px;-moz-border-radius-topright: 4px;-webkit-border-top-right-radius: 4px;-webkit-border-top-left-radius: 4px;} #@ > div:last-child {-moz-border-radius-bottomleft: 4px;-moz-border-radius-bottomright: 4px;-webkit-border-bottom-right-radius: 4px;-webkit-border-bottom-left-radius: 4px;} #@ ul {margin: 0;padding-left: 1em;list-style-type: none;font-weight: normal;} #@ img {margin-left: 1em;float: right;cursor: pointer;}",

	run: function() {
		if (!main.getServerInfo()) {
			return false;
		}
		translations.initLanguage();
		var id = main.randomID(12);

		var panels = [];
		modules.run(panels, ["checkLink", "checkForm"], "#f80");
		if (main.antibot) {
			panels.unshift({type: "div", attributes: {style: "background-color: #f00;"}, childs: [{type: "blink", properties: {innerHTML: _("Detected Travian \"antibot\".<br>Disable Travian Beyond and reload page<br>(or don't click on suspicious links and/or forms).")}}]});
		}
		if (panels.length > 0) {
			panels.unshift({type: "div", attributes: {style: "background-color: #000; padding: 0.5em 0.5em;"}, childs: [
				{type: "span", properties: {textContent: _("Travian - Antibot detection warning")}},
				{type: "img", attributes: {width: 10, height: 10, title: _("Close window"), src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAG9JREFUGNONkMENwCAMA61Oxhos0GmYgzUYgAnYg//14yJAVKqlKE4cQWLJAKJzA9rc0zSUAMzZeBovHcSFA1FAcZEPX2drRUB3EbQBCNb6pZ+4JFXz+6C/vboc452CIy/HzPZ8IO2Lx8mBbj4MfwBkb9Ry7NE+SQAAAABJRU5ErkJggg=="}, events: {"click": function(){ var w = document.getElementById(id); if (w) { w.style.display = "none"; } }, }}
			]});

			var div = dom.create({type: "div", attributes: {id: id}, childs: panels});
			var body = document.getElementsByTagName("body");
			body[0].appendChild(div);
			dom.addStyle(main.style.replace(/@/g, id));
		}
	},

	getServerInfo: function() {
		var logo, re, m;

		if (dom.check("id('login_form')")) {
			return false;
		}

		if (!dom.check("id('header')") || !dom.check("id('side_navi')")) {
			return false;
		}
		main.server.version = 360;

		main.server.name = location.hostname.replace(".travian.", "");

		logo = dom.first("//a[@id='logo']");
		if (logo) {
			re = new RegExp("(?:\\w+\\.)?travian3?(?:\\.\\w+)?\\.(\\w+)$");
			m = re.exec(logo.hostname);
			if (m) {
				main.server.language = m[1];
			}
		}

		switch (main.server.language) {
			case "com":
				main.server.language = "en";
				break;
			case "net":
				main.server.language = "es";
				break;
		}

		return true;
	},

	randomID: function(length)
	{
		var chars = "_abcdefghijklmnopqrstuvwxyz";

		var str = "";
		for (var i = 0; i < length; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}
}

function _(msgid)
{
	var text = translations.messages[msgid];
	if (!text) {
		text = msgid;
	}
	return text;
}

main.run();
