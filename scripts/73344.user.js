var scr_version = <><![CDATA[
// ==UserScript==
// @name           Pennergame-Angriffs-Abbruch-Protector
// @author         Peter L aus B (http://berlin.pennergame.de/change_please/3471184/)
// @namespace      peter_l_aus_b[paap]
// @description    Dieses Script verhindert, dass man versehentlich auf "Angriff abbrechen" klickt.
// @include        http://*.pennergame.de/*
// @include        http://*.clodogame.fr/*
// @include        http://*.menelgame.pl/*
// @include        http://*.dossergame.co.uk/*
// @include        http://*.mendigogame.es/*
// @include        http://*.serserionline.com/*
// @include        http://*.bumrise.com/*
// @version        0.2.7
// ==/UserScript==
]]></>.toString().match(/@version\s+([.\d]+)/)[1];

var CANCELS = [
	"/fight/cancel/",           // ausgehender Kampf
	"/skill/cancel/",           // Skillen
	"/stock/armoury/sell/",     // Waffenverkauf
	"/stock/instruments/sell/", // Instrumentverkauf
	"/gang/admin/delsb/",       // Shoutbox löschen
	"/financial/reset/",        // Bilanzen zurücksetzen
	"/messages/delete_all/",    // alle Nachrichten löschen
	"/city/pet_store/buy/",     // Haustierkauf
	"/gang/admin/massmail/"     // Bandennachricht
];

function addAbort(form) {
	var submit = false;
	if(typeof(form.querySelector) === "function") {
		submit = form.querySelector("input[type=submit]");
	} else {
		var inputs = form.getElementsByTagName("input");
		for(var i = 0; i < inputs.length; ++i) {
			if(inputs[i].getAttribute("type") === "submit") {
				submit = inputs[i];
				break;
			}
		}
	}
	if(!submit) {
		return;
	}
	
	var action = form.getAttribute("action");
	form.setAttribute("action", "?");
	
	var div = document.createElement("div");
	div.appendChild(document.createTextNode(submit.getAttribute("value")));
	div.appendChild(document.createTextNode(": "));
	var i1 = div.appendChild(document.createElement("input"));
	div.appendChild(document.createTextNode(" "));
	var i2 = div.appendChild(document.createElement("input"));
	div.appendChild(document.createTextNode(" "));
	var i3 = div.appendChild(document.createElement("input"));
	i1.setAttribute("type", "checkbox");
	i2.setAttribute("type", "checkbox");
	i3.setAttribute("type", "checkbox");
	i2.style.display = "none";
	i3.style.display = "none";
	
	i1.addEventListener("click", function() {
		i1.setAttribute("readonly", "readonly");
		i2.style.display = "inline";
	}, false);
	i2.addEventListener("click", function() {
		i2.setAttribute("readonly", "readonly");
		i3.style.display = "inline";
	}, false);
	i3.addEventListener("click", function() {
		i3.setAttribute("readonly", "readonly");
		div.parentNode.replaceChild(submit, div);
		form.setAttribute("action", action);
	}, false);
	
	submit.parentNode.replaceChild(div, submit);
}

function init() {
	if(typeof(document.querySelectorAll) === "function") {
		var cancels = [];
		for(var c in CANCELS) {
			cancels.push("form[action$='" + CANCELS[c] + "']");
		}
		var forms = document.querySelectorAll(cancels.join(",\n"));
		for(var i = 0; i < forms.length; ++i) {
			addAbort(forms[i]);
		}
	} else {
		var cancels = new RegExp("(?:" + CANCELS.join("|").replace(/\//g, "\\/") + ")$");
		var forms = document.getElementsByTagName("form");
		for(var i = 0; i < forms.length; ++i) {
			if(cancels.test(forms[i].getAttribute("action"))) {
				addAbort(forms[i]);
			}
		}
	}
}

init();







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
                for(m in meta){meta[m] = (meta[m].exec(resp.responseText) ? meta[m].exec(resp.responseText)[1] : null);}
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
    scriptId:       "73344", // insert id of your userscript from userscripts.org!
    currentVersion: scr_version
});
