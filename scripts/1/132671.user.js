// ==UserScript==
// @name           5PG Raid Tools
// @namespace      SReject@Kong
// @description    Spammer and Loader for Kongregrate's Legacy of a Thousand Suns
// @author         SReject
// @version        2.0
// @date           2012/09/18
// @include        http://www.kongregate.com/games/5thPlanetGames/legacy-of-a-thousand-suns*
// ==/UserScript==

if (document.top === document.self  && /^(?:https?:\/\/)?(www\.)?kongregate\.com\/games\/5thPlanetGames\/legacy-of-a-thousand-suns\/?(?:$|#|\?)/i.test(document.location.href)) {
	var d = document, t, style, code;
	d.addEventListener("rt:GMXHR", function (param) {
		param = param.data;
		param.callback = function (evnt, resp) {
			this.onload = null;
			this.onerror = null;
			this.ontimeout = null;
			this.event = evnt;
			this.status = resp.status;
			this.responseText = resp.responseText;
			var c = document.createEvent("MessageEvent");
			c.initMessageEvent(this.eventName, false, false, this, document.location.protocol + "//" + document.location.hostname, 1, unsafeWindow, null);
			document.dispatchEvent(c);
		};
		param.onload = param.callback.bind(param, "load");
		param.onerror = param.callback.bind(param, "error");
		param.ontimeout = param.callback.bind(param, "timeout");
		setTimeout(function (a) { GM_xmlhttpRequest(a); }, 0, param);
	});
    t = Math.random() * 999999999;


    style = d.createElement("link");
    style.rel = "stylesheet";
    style.type = "text/css";
    style.href = "http://getkonge.org/userscripts/raidtools.css?nocache=" + t;
    d.head.appendChild(style);

    code = d.createElement("script");
    code.src = "http://getkonge.org/userscripts/raidtools.js?nocache=" + t;
    d.head.appendChild(code);
}