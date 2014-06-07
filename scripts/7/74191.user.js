var scr_version = <><![CDATA[
// ==UserScript==
// @name           Banden-Shoutbox auf jeder Seite
// @author         Peter L aus B (http://berlin.pennergame.de/change_please/3471184/)
// @namespace      peter_l_aus_b[shoutbox]
// @description    Die Banden-Shoutbox stets aktuell auf jeder Seite anzeigen.
// @version        0.1.11
// @version        0.1.8 Der BBCode-Editor (http://userscripts.org/scripts/show/70462) sollte jetzt bei allen geladen werden.
// @version        0.1.5 Seite frei wählbar
// @version        0.1.4 Shoutbox rechts oder links (Idee von Master_DS)
// @version        0.1.2 Problem mit Zitaten behoben. (Danke für den Hinweis, Deets!)
// @version        0.0.9 Idee stammt von Basti1012 (http://userscripts.org/scripts/show/59712)
// @include        http://*.pennergame.de/*
// @include        http://*.clodogame.fr/*
// @include        http://*.menelgame.pl/*
// @include        http://*.dossergame.co.uk/*
// @include        http://*.mendigogame.es/*
// @include        http://*.serserionline.com/*
// @include        http://*.bumrise.com/*
// @exclude        */change_please*
// ==/UserScript==
]]></>.toString().match(/@version\s+([.\d]+)/)[1];

var PADDING       = 2;

var LOADING       = "Shoutbox wird geladen";
var POST_NEW      = "Etwas in die Shoutbox schreiben.";

var CFG_TEXT      = "Einstellungen bearbeiten";
var LEFT_TEXT     = "Shoutbox links:";
var RIGHT_TEXT    = "Shoutbox rechts:";
var WIDTH_TEXT    = "Shoutbox-Breite:";
var RELOAD_TEXT   = "Reload-Interval:";
var SAVE_CFG_TEXT = "speichern";
var ABORT_TEXT    = "abbrechen";
var SELECT_PAGE_TITLE = "Seite auswählen";

var ADD_MESSAGE_IMG = "data:image/png;base64," +
		"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0" +
		"U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAL/SURBVHjaYvz//z8DJQAggJgYKAQAAcRS" +
		"O/vkfg4uXsM3n39zf/nxh+kf0EH/GP4z/AUy/gFd9xeI//2D8KH4PwPj39+/v3188/jGnTsAAcQi" +
		"Ksgvm+6vxvfz939GDnZmFNMZ0dmMEPr7zz/M33/+lYrs+PkDIAAAQQC+/wLq8vwi+vz+AaW/5wDj" +
		"7PoA9fn/AOHt/gDj7v4A5PD+AOfx/gDq8/8A7PX/APv9AADk7foAkrTnAO/1+QINFR0jAojp68+/" +
		"jOysTAzSknwMu86+Yvjw5TeDOB8jAyvQMWzMjAxsLCDMwCDAycjw9tMvhlVHXjIICPExCAuwg90E" +
		"EEBM3378ATtRSYKHQUacj2HHmVcM7z//ZhDhYQJrZAMaxM/ByPDuM0jzKwYRYT4GJWkeBkZo5AEE" +
		"ENPXH38hoQlUqCTFwyAqyMWw8sBjsAaQRl4gfgtkd2zzZrjx3g+shpMFETYAAcT09TvEBYzA0Pnz" +
		"+w8DB8s/BjlpAYatp14xPHnzA4w3nnjF8Pv/HwYZEU2G6Xt1wC6DhSxAALF8+/mXAeSaX7/+MLx8" +
		"95lBVpyXgY2NlWHmvkCGa3v+Mvz694fh198/DFKCygyaEuYMn398ZWjcKM+wJOkOA8N/RgaAAAIa" +
		"8Oc/MG4ZX70FahblZeDkYGUAmfjn3y8GV+14YDr4B4z7v+C08ezjYwZdGWuGL7++M/hOF2GQYNr9" +
		"HyCAWL6+e/rg568/8hoynIw8nEyMjEx/GUDJ88efX2DND9/eZvgNdMWff7+B0fib4dPPzwwGsrYM" +
		"X35/Yzh135YBIIBYfn15/dC5YIcgOy83Nws7MyMLMDSZgNEnKfuD5Q/Q6eJ8ckDNf8GGPf/4iEGI" +
		"R4Lh3OOjDCfv3PnNer3lOEAAMeLKTEEzlP7++PULGAa/wK5RFtFmslByYzjz6BjD3lu7LgGDzOxZ" +
		"2/+fAAHESGxu1Glhem0i5yRy4Nbes7/+MVgBNf8CiQMEENEGKNUxvv77j1nk+7+/rK/a/v+BiQME" +
		"GABpyFaEsBGxCgAAAABJRU5ErkJggg==";

var CONFIG_IMG = "data:image/png;base64," +
		"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJ" +
		"TUUH2AISFR8vzg+qygAAAzFJREFUOI19kWtMk3cYxU/7dq+9EIZtoYxWIGIolYjGoFWJE50FJRhE" +
		"xRjvwYr3sk4kGx+WxZmYMCAo7mIwmTHRSFw6O8sSRbsRb2AM2Gi03vBSG8GurazSe//PvkxjOtz5" +
		"dD48v3Oe5AgwjgoLC3me57fl5ObWa9TZ6dFYLPRq5GUPEWuyWq0uACgvL5dzHKcUJMM6nW555bKq" +
		"X9avX8d5PF54PB4wloBYLEEoGCC73b41Ly+vePHiirqBgb4hQVLz7i8a9nXoZxUjGAzBZrMhJzcH" +
		"sWg0mmAspFQoJrxwu8MrqlemAR9h4cIFte8CampquALd1OjSJeVCxhgYY7h95y4uXbxgslgsHf/e" +
		"8AaDYVAikaS1tHScdjhu7BMBgFar1Y6Ojlqn5E0WPnvuQopMCiLCxzIes2XDzWm1tccDgUDEYDAM" +
		"hsNhvq6urgBAAAAEpaWlq1pbD5+JRILw+b3o7++HSqWCCHGsTDmP1EnTsfdry6mijXtnhMNh3mQy" +
		"zXwLA4BQJBKlZ2VlQipNgdN5H7cGB+ff6OmpEF75FlJIIOQmQr9p+9rQ2JgsGQYAbmho6CbHcTVy" +
		"hSKjt/eP37q6upodTucjfUS1JBbO0lyNpEIglsFn/140/55v/58AjTc9ysrKMt56s0Yj76nd8CYx" +
		"MkK/f1pCjiNGCl36knbNzT86Lvy+vlIo9Fd3GoNx9wvyNZjJrs6kw59NIeo7RPeOVdOeudO2fRD+" +
		"Rpm69umP7Yx8Pvq7qZF+yFR6VmRnl5jmZQ1Hz24hcpygh2fqqb6keMt/4LZP5Gav5RSR30/R75rp" +
		"rEYRq1SrpwOAcc4cnW2HmujyQaL73fT43H5qWDRv0Tu4NVW8cdR6msjvp0R7G13LVbINKtWa9wt2" +
		"6Sfd8h5bSnTzKJHrOt0518aMRUUaNAAZrgONcfL7iR1qp7v5KjKnK5qSPzTq9aqfqtNY/HwjDXdW" +
		"0V87JWSerT3JlQCVVZ/vXk3d3XB2ttIJT6ipxfv6YHLAgNs9ppGp5fGRPv3rJy78+pAnz5uJywV7" +
		"gAmzlOJeKSfI7A4K6n8OBK3/t9LmGfm2hJAViBOyik6H48E/QvRv2eJE4yUAAAAASUVORK5CYII=";

var SELECT_PAGE_IMG = "data:image/png;base64," +
		"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJ" +
		"TUUH2QweBB0CmriPBgAAAcVJREFUOI2Vkc1OE1EUx3+9M3SSAoWmI7E2uGmCstM2NnbhhnfAlcaF" +
		"ny9h4kbdGOMTGPAV1ASWmLgwLABZdNNNNzbUpG1CsR2de46LmZYpoOJJbnLvuff/dU8KYHv7y7O5" +
		"XG6F/6hep7NVrd586gL4vr9SKFy6dV6wiDDlumkgIvhbtdtt6vU6AKqwsHCBpaUr0QEw51WN3iu5" +
		"XA4RQeP+Px1kMhkWFy8Diuoxwaj+SKAaAURkvAfFWiGVSqExyZkESWC/36fZbI5uODr6QalUOtvB" +
		"SCkiUD58fE/1RpVarRb3BZGIfBTCJMHWWoIgYDAYjJVfvHxOo9GIQImF6LEDBawVut0OO7t77O7t" +
		"sL//dezs9ZtX3L1zj0q5jIjGiMQYR5lFIpuqSrLCMGRt/S0bmxtxjJNjVCZ++yQBgOd5FIvFUwLx" +
		"J8p4tp7nkc1m8fM+h/1DgiBgfm6ex4+eUChcTBAkxqhEDqanZ6iUK1y/VkZVWX+3Rvv7AQ/vP2B2" +
		"NhuLRDEnHMipCNF++eoyt1dXSaenEsqT8VyAg1br83A4nAl//nJFrGNt6FhRk/fz5lurhTGIMUZS" +
		"xojruKHjOLbX7X0C+A3rkjPA5lq3uQAAAABJRU5ErkJggg==";

var LEFT           = GM_getValue("LEFT", "left");
var WIDTH          = parseInt(GM_getValue("WIDTH", "220")) || 220;
var RELOAD_TIMEOUT = parseInt(GM_getValue("RELOAD_TIMEOUT", "30")) || 30;

if(LEFT !== "left" && LEFT !== "right") { LEFT = "left"; }
if(WIDTH < 50) { WIDTH = 50; }
if(RELOAD_TIMEOUT < 5) { RELOAD_TIMEOUT = 5; }

function init() {
	unsafeWindow.isTranscluded = true;
	
	var writing = false;
	var wrap    = document.getElementById("wrap");
	var content = document.getElementById("content");
	var tabnav  = document.getElementById("tabnav");

	var shoutbox = content.appendChild(document.createElement("div"));
	shoutbox.appendChild(document.createElement("strong")).appendChild(document.createTextNode(LOADING));
	shoutbox.setAttribute("id", "plab-shoutbox");
	shoutbox.style.position = "absolute";
	shoutbox.style.width = WIDTH-2*PADDING + "px";
	shoutbox.style.top = "0";
	
	var contentLeft = wrap.offsetLeft + content.offsetLeft;
	if(contentLeft < WIDTH) {
		content.style[LEFT] = tabnav.style[LEFT] = WIDTH-contentLeft + "px";
		contentLeft = WIDTH;
	}
	shoutbox.style[LEFT] = PADDING-contentLeft + "px";
	
	var style = document.createElement("style");
	style.setAttribute("type", "text/css");
	style.appendChild(document.createTextNode(
		"#plab-shoutbox * { "+
			"max-width: " + (WIDTH-4*PADDING) + "px !important; "+
		"} "+
		"#plab-shoutbox .user_quote { "+
			"width: inherit; "+
		"} "
	));
	document.getElementsByTagName("head")[0].appendChild(style);
	
	var pagesNum = document.createTextNode("1");

	var iframe = document.createElement("iframe");
	iframe.style.width = iframe.style.height = "400px";
	iframe.style.display = "none";
	iframe.setAttribute("src", "http://" + window.location.host + "///////gang/");
	iframe.addEventListener("load", function(ev) {
		ev.preventDefault();
		if(writing) {
			return;
		}
		
		var reloadTimeout;
		function addReloadTimeout() {
			writing = false;
			iframe.contentWindow.setTimeout(function() {
				iframe.contentWindow.location.reload();
			}, RELOAD_TIMEOUT * 1000);
		}
		addReloadTimeout();
		
		var tieritemA = iframe.contentWindow.document.getElementsByClassName("tieritemA");
		if(!tieritemA && !tieritemA.length) {
			return; // passiert bei HTTP 500 und evtl. auch bei leeren Shoutboxen
		}
		tieritemA = tieritemA[0];
		
		var firstTr = tieritemA.getElementsByTagName("hr")[3].parentNode.parentNode;
		var toDelete = [];
		var pres = tieritemA.getElementsByTagName("tr");
		var form1, shoutboxHeadline;
		for(var i = 0; i < pres.length; ++i) {
			var tr = pres[i];
			if(tr.parentNode.parentNode != tieritemA) {
				continue;
			}
			toDelete.push(tr);
			
			if(tr == firstTr) {
				shoutboxHeadline = pres[i+1]; // "Shoutbox:"
				toDelete.push(pres[pres.length-2]); // "Nachricht verfassen:"
				form1 = pres[pres.length-1]; // #form1
				firstTr = pres[i+2]; // erster Eintrag der Shoutbox
				break;
			}
		}
		toDelete.push(form1);
		
		shoutboxHeadline = shoutboxHeadline.getElementsByTagName("strong")[0];
		var hlLink = document.createElement("a");
		
		var addMessageSpan = hlLink.appendChild(document.createElement("span"));
		var addMessageImg = addMessageSpan.appendChild(document.createElement("img"));
		addMessageImg.setAttribute("src", ADD_MESSAGE_IMG);
		addMessageImg.style.verticalAlign = "middle";
		addMessageSpan.style.textDecoration = "none";
		hlLink.appendChild(document.createTextNode("\xA0"));
		
		var pagesDiv, configDiv, pages;
		shoutboxHeadline.parentNode.replaceChild(hlLink, shoutboxHeadline);
		hlLink.appendChild(shoutboxHeadline);
		hlLink.setAttribute("href", "#");
		hlLink.setAttribute("title", POST_NEW);
		hlLink.addEventListener("click", function(ev) {
			ev.preventDefault();
			writing = true;
			iframe.contentWindow.clearTimeout(reloadTimeout);
			
			configDiv.style.display = "none";
			pagesDiv.style.display = "none";
			hlLink.parentNode.replaceChild(form1, hlLink);
			
			return false;
		}, false);
		iframe.contentWindow.document.getElementById("f_text").style.width = "95%";
		
		pagesDiv = hlLink.parentNode.insertBefore(document.createElement("div"), hlLink.parentNode.firstChild);
		pagesDiv.style.cssFloat = "right";
		pagesDiv.style.paddingRight = 2*PADDING + "px";
		var pagesA =  pagesDiv.appendChild(document.createElement("a"));
		var pagesImg = pagesA.appendChild(document.createElement("img"));
		pagesDiv.appendChild(document.createTextNode("\xA0"))
		pagesDiv.appendChild(pagesNum);
		pagesImg.setAttribute("src", SELECT_PAGE_IMG);
		pagesImg.style.verticalAlign = "middle";
		pagesA.setAttribute("href", "#");
		pagesA.setAttribute("title", SELECT_PAGE_TITLE);
		pagesA.addEventListener("click", function(ev) {
			ev.preventDefault();
			writing = true;
			iframe.contentWindow.clearTimeout(reloadTimeout);
			
			var pagesTable = tieritemA.cloneNode(false);
			pagesTable.appendChild(document.createElement("tr")).appendChild(document.createElement("th")).appendChild(document.createTextNode(SELECT_PAGE_TITLE));
			
			var ps = pagesTable.appendChild(document.createElement("tr")).appendChild(document.createElement("td")).appendChild(pages.cloneNode(true)).getElementsByTagName("a");
			for(var i = 0; i < ps.length; ++i) {
				var href = ps[i].getAttribute("href");
				ps[i].setAttribute("href", "#");
				ps[i].addEventListener("click", (function(href, page) {
					return function(ev) {
						ev.preventDefault();
						
						var newPagesNum = document.createTextNode(page);
						pagesNum.parentNode.replaceChild(newPagesNum, pagesNum);
						pagesNum = newPagesNum;
						
						iframe.contentWindow.location = href + "?transcluded";
						pagesTable.parentNode.replaceChild(tieritemA, pagesTable);
						addReloadTimeout();
						return false;
					};
				})(href, href.match(/\/(\d+)\/$/)[1]), false);
			}
			
			var input = pagesTable.appendChild(document.createElement("tr")).appendChild(document.createElement("td")).appendChild(document.createElement("input"));
			input.setAttribute("type", "button");
			input.setAttribute("value", ABORT_TEXT);
			input.addEventListener("click", function(ev) {
				ev.preventDefault();
				pagesTable.parentNode.replaceChild(tieritemA, pagesTable);
				addReloadTimeout();
				return false;
			}, false);
			
			tieritemA.parentNode.replaceChild(pagesTable, tieritemA);
			return false;
		}, false);
		
		configDiv = hlLink.parentNode.insertBefore(document.createElement("div"), hlLink.parentNode.firstChild);
		configDiv.style.cssFloat = "right";
		configDiv.style.paddingRight = PADDING + "px";
		var configA =  configDiv.appendChild(document.createElement("a"));
		var configImg = configA.appendChild(document.createElement("img"));
		configImg.setAttribute("src", CONFIG_IMG);
		configImg.style.verticalAlign = "middle";
		configA.setAttribute("href", "#");
		configA.setAttribute("title", CFG_TEXT);
		configA.addEventListener("click", function(ev) {
			ev.preventDefault();
			writing = true;
			iframe.contentWindow.clearTimeout(reloadTimeout);
			
			var cfgForm = document.createElement("form");
			var cfgTable = cfgForm.appendChild(tieritemA.cloneNode(false));
			var tr = cfgTable.appendChild(document.createElement("tr"));
			var td = tr.appendChild(document.createElement("th"));
			td.setAttribute("colspan", "2");
			td.appendChild(configImg.cloneNode(true));
			td.appendChild(document.createTextNode("\xA0"));
			td.appendChild(document.createTextNode(CFG_TEXT));
			
			tr = cfgTable.appendChild(document.createElement("tr"));
			tr.appendChild(document.createElement("td")).appendChild(document.createTextNode(LEFT_TEXT));
			var input = tr.appendChild(document.createElement("td")).appendChild(document.createElement("input"));
			input.setAttribute("type", "radio");
			input.setAttribute("name", "LEFT");
			input.setAttribute("class", "PLAB-CFG-LEFT");
			input.setAttribute("value", "left");
			if(LEFT == "left") {
				input.setAttribute("checked", "checked");
			}
			
			tr = cfgTable.appendChild(document.createElement("tr"));
			tr.appendChild(document.createElement("td")).appendChild(document.createTextNode(RIGHT_TEXT));
			input = tr.appendChild(document.createElement("td")).appendChild(document.createElement("input"));
			input.setAttribute("type", "radio");
			input.setAttribute("name", "LEFT");
			input.setAttribute("class", "PLAB-CFG-LEFT");
			input.setAttribute("value", "right");
			if(LEFT == "right") {
				input.setAttribute("checked", "checked");
			}
			
			tr = cfgTable.appendChild(document.createElement("tr"));
			tr.appendChild(document.createElement("td")).appendChild(document.createTextNode(WIDTH_TEXT));
			td = tr.appendChild(document.createElement("td"));
			input = td.appendChild(document.createElement("input"));
			input.setAttribute("type", "text");
			input.setAttribute("name", "WIDTH");
			input.setAttribute("class", "PLAB-CFG-WIDTH");
			input.setAttribute("size", "3");
			input.setAttribute("value", WIDTH.toString());
			td.appendChild(document.createTextNode("\xA0px"));
			
			tr = cfgTable.appendChild(document.createElement("tr"));
			tr.appendChild(document.createElement("td")).appendChild(document.createTextNode(RELOAD_TEXT));
			td = tr.appendChild(document.createElement("td"));
			input = td.appendChild(document.createElement("input"));
			input.setAttribute("type", "text");
			input.setAttribute("name", "RELOAD_TIMEOUT");
			input.setAttribute("class", "PLAB-CFG-RELOAD_TIMEOUT");
			input.setAttribute("size", "3");
			input.setAttribute("value", RELOAD_TIMEOUT.toString());
			td.appendChild(document.createTextNode("\xA0sec"));
			
			td = cfgTable.appendChild(document.createElement("tr")).appendChild(document.createElement("th"));
			td.setAttribute("colspan", "2");
			input = td.appendChild(document.createElement("input"));
			input.setAttribute("type", "submit");
			input.setAttribute("value", SAVE_CFG_TEXT);
			
			td.appendChild(document.createTextNode("\xA0"));
			input = td.appendChild(document.createElement("input"));
			input.setAttribute("type", "button");
			input.setAttribute("value", ABORT_TEXT);
			input.addEventListener("click", function(ev) {
				ev.preventDefault();
				
				cfgForm.parentNode.replaceChild(tieritemA, cfgForm);
				
				addReloadTimeout();
				return false;
			}, false);
			
			cfgForm.addEventListener("submit", function(ev) {
				ev.preventDefault();
				
				var el = cfgForm.getElementsByClassName("PLAB-CFG-LEFT");
				for(var i = 0; i < el.length; ++i) {
					if(el[i].checked) {
						LEFT = el[i].value;
						break;
					}
				}
				
				WIDTH = parseInt(cfgForm.getElementsByClassName("PLAB-CFG-WIDTH")[0].value);
				RELOAD_TIMEOUT = parseInt(cfgForm.getElementsByClassName("PLAB-CFG-RELOAD_TIMEOUT")[0].value);
				
				GM_setValue("LEFT", LEFT);
				GM_setValue("WIDTH", WIDTH);
				GM_setValue("RELOAD_TIMEOUT", RELOAD_TIMEOUT);
				
				cfgForm.parentNode.replaceChild(tieritemA, cfgForm);
				window.location.reload();
				return false;
			}, false);
			
			tieritemA.parentNode.replaceChild(cfgForm, tieritemA);
			return false;
		}, false);
		
		var del;
		while(del = toDelete.pop()) {
			del.parentNode.removeChild(del);
		}
		
		pres = tieritemA.getElementsByTagName("p");
		for(var i = 0; i < pres.length; ++i) {
			var p = pres[i];
			if(p.parentNode.parentNode != firstTr) {
				continue;
			}
			toDelete.push(p);
		}
		pages = toDelete.pop();
		pages.parentNode.removeChild(pages);
		while(del = toDelete.pop()) {
			del.parentNode.removeChild(del);
		}
		
		pres = tieritemA.getElementsByTagName("tr");
		for(var i = 0; i < pres.length; ++i) {
			var tr = pres[i];
			if(tr.parentNode.parentNode != tieritemA) {
				continue;
			}
			var c;
			for(c = tr.firstChild; c; c = c.nextSibling) {
				if(c.nodeType == 1) {
					break;
				}
			}
			if(!c) {
				toDelete.push(tr);
			}
		}
		while(del = toDelete.pop()) {
			del.parentNode.removeChild(del);
		}
		
		tieritemA.style.width = WIDTH-PADDING + "px";
		shoutbox.replaceChild(tieritemA, shoutbox.firstChild);
		
		return false;
	}, false);
	document.body.appendChild(iframe);
}

if(!unsafeWindow.top.isTranscluded) {
	init();
}






// name          easy userscript updater snippet
// author        Thomas Duerr
// version       1.0.1
// date          2009-03-27

var userscriptUpdater = function(){
    var css = "div.greasemonkey_updater { font-size: 12px; background: #FFC; padding: 10px 15px; border-width: 1px 0; border-style: solid; border-color: #F90; margin: 0 0 30px; } " +
              "div.greasemonkey_updater h1 { font-size: 16px !important; margin: 0 0 5px 0; font-weight: bold; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide { float: right; text-align: right; width: 125px; font-size: 11px; font-weight: normal; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide a { color: #F00; } " +
              "div.greasemonkey_updater p { margin: 0 0 15px 0; font-size: 12px !important; line-height: 140%; color: #000; }";

    var config      = {
        checkInterval: 5*24*60*60,                                // default check interval: check once a day [in seconds]
        injectInto:    document.getElementsByTagName("body")[0],  // default dom-node for the updater-message to be inserted
        updaterCss:    css                                        // default styles of updater message
    };
    var lastCheck   = GM_getValue("lastCheck", 0);
    var lastVersion = GM_getValue("lastVersion", 0);
    var currentTime = Math.round(new Date().getTime()/1000);
    var meta        = {
        name:       /@name\s+(.*)[\r\n]/,
        version:    /@version\s+([.\d]+)(?:\s+.*)?[\r\n]/,
        change:     /@change\s+(.*)[\r\n]/,
        depricated: /@depricated\s+(.*)[\r\n]/
    };
    var updater;

    // check remote userscript for version
    var checkRemoteUserscript = function(){
        GM_xmlhttpRequest({
            method:  "GET",
            url:     "http://userscripts.org/scripts/source/" + config.scriptId + ".meta.js",
            headers: {"User-agent": "Mozilla/4.0 (compatible) Greasemonkey", "Accept": "text/plain"},
            onload:  function(resp) {
                GM_setValue("lastCheck", currentTime);
                for(m in meta){
                    meta[m] = meta[m].exec(resp.responseText);
                    meta[m] = meta[m] ? meta[m][1] : null;
                }
                if(isNewer(meta.version, config.currentVersion) && isNewer(meta.version, lastVersion)) {
                    GM_addStyle(config.updaterCss);
                    updater = build();
                }
            }
        });
    };

    // compare versions based on versioning scheme: major.minor[.bugfix]
    var isNewer = function(o, p){
        /(\d+)\.(\d+)(?:\.(\d+))?\|(\d+)\.(\d+)(?:\.(\d+))?/.exec(o + "|" + p);
        with(RegExp){
            if(parseInt($4 || "0") < parseInt($1 || "0")) return true;
            if(parseInt($5 || "0") < parseInt($2 || "0")) return true;
            if(parseInt($6 || "0") < parseInt($3 || "0")) return true;
        }
        return false;
    };

    // skip current update until next
    var skipUpdate = function(ev){
        ev.preventDefault();
        GM_setValue("lastVersion", meta.version);
        config.injectInto.removeChild(updater);
    };

    // initialization
    var initialize = function(options){

        // merge options into config
        for(prop in options){if(options[prop]){config[prop] = options[prop];}}

        // already checked for an update today?
        if(currentTime > (lastCheck + config.checkInterval)){
            checkRemoteUserscript();
        }
    };

    // build updater message and inject it into DOM
    var build = function(){
        var updater = document.createElement("div");
            updater.className = "greasemonkey_updater";
        var hide = document.createElement("div");
            hide.className = "greasemonkey_updater_link_to_hide";
        if(meta.depricated == null){
            var a_hide = document.createElement("a");
                a_hide.href = "";
                a_hide.addEventListener("click", skipUpdate, false);
            var a_span = document.createElement("span");
                a_span.appendChild(document.createTextNode("Skip until next Update!"));
            a_hide.appendChild(a_span);
            hide.appendChild(a_hide);
        }
        var h1 = document.createElement("h1");
            h1.appendChild(hide);
            h1.appendChild(document.createTextNode(meta.depricated == null ? "Greasemonkey UserScript Update Notification!" : "Depricated Greasemonkey UserScript!"));
        updater.appendChild(h1);
        var p = document.createElement("p");
        if(meta.depricated == null){
            var text = "There is an update available for <a href=\"http://userscripts.org/scripts/show/" + config.scriptId + "\">" + meta.name + "</a>.<br>";
                text += meta.change ? "<br>" + meta.change + "<br><br>" : "";
                text += "You are currently running version <b>" + config.currentVersion + "</b>, the newest version on userscripts.org is <b>" + meta.version + "</b>!<br><a href=\"http://userscripts.org/scripts/source/" + config.scriptId + ".user.js\">Update to Version " + meta.version + "</a>";
        } else {
            var text = "The userscript <a href=\"http://userscripts.org/scripts/show/" + config.scriptId + "\">" + meta.name + "</a> is now depricated.<br>";
                text += meta.depricated && meta.depricated != "true" ? "<br>" + meta.depricated + "<br><br>" : "";
                text += "Please remove your script! Thanks for using it.";
        }
        p.innerHTML = text;
        updater.appendChild(p);
        var first = config.injectInto && config.injectInto.firstChild;
        (first ? config.injectInto.insertBefore(updater, first) : config.injectInto.appendChild(updater));
        return updater;
    };

    return { init: initialize };
}();

// initialize updater
userscriptUpdater.init({
    scriptId:       "74191", // insert id of your userscript from userscripts.org!
    currentVersion: scr_version
});
