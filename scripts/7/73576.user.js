var scr_version = <><![CDATA[
// ==UserScript==
// @name           Bandennachricht
// @author         Peter L aus B (http://berlin.pennergame.de/change_please/3471184/)
// @namespace      peter_l_aus_b[bn]
// @version        0.1.6
// @include        http://*.pennergame.de/gang/memberlist/*
// @include        http://*.clodogame.fr/gang/memberlist/*
// @include        http://*.menelgame.pl/gang/memberlist/*
// @include        http://*.dossergame.co.uk/gang/memberlist/*
// @include        http://*.mendigogame.es/gang/memberlist/*
// @include        http://*.serserionline.com/gang/memberlist/*
// @include        http://*.bumrise.com/gang/memberlist/*
// @include        http://*.pennergame.de/profil/bande:*/*
// @include        http://*.clodogame.fr/profil/bande:*/*
// @include        http://*.menelgame.pl/profil/bande:*/*
// @include        http://*.dossergame.co.uk/profil/bande:*/*
// @include        http://*.mendigogame.es/profil/bande:*/*
// @include        http://*.serserionline.com/profil/bande:*/*
// @include        http://*.bumrise.com/profil/bande:*/*
// ==/UserScript==
]]></>.toString().match(/@version\s+([.\d]+)/)[1];

var THROBBER_IMG = {
	WAITING:  "http://i41.tinypic.com/6ymflx.png",
	SENDING:  "http://i40.tinypic.com/2iqd8va.png",
	IGNORED:  "http://i41.tinypic.com/2chq0qq.png",
	UNKNOWN:  "http://i42.tinypic.com/2r5yruc.png",
	
	success:  "http://i43.tinypic.com/33kstuv.png",
	notfound: "http://i40.tinypic.com/20tghdv.png",
	banned:   "http://i43.tinypic.com/qs09rc.png"
};

var THROBBER_TEXT = {
	WAITING:  "Sending is delayed not to be regarded as a spammer.",
	SENDING:  "Message is being send.",
	IGNORED:  "Not sending as player was de-selected from receivers.",
	UNKNOWN:  "Status unknown! Was redirected to: ",
	
	success:  "Message successfully sent!",
	notfound: "Receiver was not found! (Account deleted?)",
	banned:   "You are temporarily banned from sending messages! (Half an hour.)"
}

var iframe, checkboxes, form, action, receiver, sendFuns, sendTimeout;

function mkSentFun(target, throbber) {
	return function(ev) {
		ev.preventDefault();
		
		var lc = target.contentWindow.location.toString();
		if(lc == "about:blank") {
			return false;
		}
		
		throbber.setAttribute("src", THROBBER_IMG.UNKNOWN);
		throbber.setAttribute("title", THROBBER_TEXT.UNKNOWN + lc);
		
		var status = lc.match(/\?status=(.+)$/);
		if(!status) {
			return false;
		}
		status = status[1];
		target.src = "about:blank";
		
		if(THROBBER_TEXT[status]) {
			throbber.setAttribute("src", THROBBER_IMG[status]);
			throbber.setAttribute("title", THROBBER_TEXT[status]);
		}
		
		return false;
	}
}

function mkSendFun(target, throbber, player) {
	return function() {
		throbber.setAttribute("src", THROBBER_IMG.SENDING);
		throbber.setAttribute("title", THROBBER_TEXT.SENDING);
		
		receiver.value = player;
		form.setAttribute("target", target.getAttribute("id"));
		form.submit();
	};
}

function sendThem() {
	var sendFun = sendFuns.shift();
	if(!sendFun) {
		return;
	}
	sendFun();
	
	window.setTimeout(sendThem, sendTimeout);
}

function onSubmit(ev) {
	ev.preventDefault();
	form.setAttribute("action", action);
	
	sendFuns = [];
	for(var i = 0; i < checkboxes.length; ++i) {
		var checkbox = checkboxes[i];
		var player = checkbox.parentNode.getElementsByTagName("a")[0].getAttribute("href").match(/\/(id:\d+)\//)[1];
		
		var throbber = document.createElement("img");
		throbber.setAttribute("height", "16");
		throbber.setAttribute("width", "16");
		checkbox.parentNode.replaceChild(throbber, checkbox)
		
		if(!checkbox.checked) {
			throbber.setAttribute("src", THROBBER_IMG.IGNORED);
			throbber.setAttribute("title", THROBBER_TEXT.IGNORED);
			continue;
		}
		throbber.setAttribute("src", THROBBER_IMG.WAITING);
		throbber.setAttribute("title", THROBBER_TEXT.WAITING);
		
		var target = document.createElement("iframe");
		target.style.height = "400px";
		target.style.width = "400px";
		target.style.display = "none";
		target.setAttribute("src", "about:blank");
		target.setAttribute("id", "iframe--" + i);
		target.setAttribute("name", "iframe--" + i);
		target.addEventListener("load", mkSentFun(target, throbber), false);
		document.getElementsByTagName("body")[0].appendChild(target);
		
		sendFuns.push(mkSendFun(target, throbber, player));
	}
	
	sendTimeout = sendFuns.length < 10 ? 1100 : 12500;
	sendThem();
	
	return false;
}

function iframeOnload() {
	form = iframe.contentWindow.document.getElementById("form1");
	receiver = iframe.contentWindow.document.getElementById("f_toname");
	if(!form || !receiver) {
		return;
	}
	action = form.getAttribute("action");
	form.setAttribute("action", "#");
	var table = document.getElementsByClassName("tieritemA")[0];
	var tds = table.getElementsByTagName("tr")[0].getElementsByTagName("td");
	var colspan = 0;
	for(var i = 0; i < tds.length; ++i) {
		colspan += parseInt(tds[i].getAttribute("colspan") || "1");
	}
	
	var td = table.appendChild(document.createElement("tr")).appendChild(document.createElement("td"));
	td.setAttribute("colspan", colspan.toString());
	td.appendChild(document.createElement("br"));
	
	td = table.appendChild(document.createElement("tr")).appendChild(document.createElement("td"));
	td.setAttribute("colspan", colspan.toString());
	td.appendChild(form);
	
	receiver.value = "";
	var receiverTr = receiver.parentNode.parentNode;
	form.appendChild(receiver);
	receiver.setAttribute("type", "hidden");
	receiverTr.parentNode.removeChild(receiverTr);
	
	form.addEventListener("submit", onSubmit, false);
}

function init() {
	if(!document.getElementsByClassName) {
		alert("Dein Browser ist veraltet.\nDas Script \"Bandennachricht\" funktioniert erst ab Firefox 3.0!");
		return;
	}
	
	iframe = document.createElement("iframe");
	iframe.style.height = "400px";
	iframe.style.width = "400px";
	iframe.style.display = "none";
	iframe.setAttribute("src", "http://" + window.location.host + "/messages/write/");
	iframe.addEventListener("load", iframeOnload, false);
	document.getElementsByTagName("body")[0].appendChild(iframe);
	
	var members;
	if(document.getElementById("pgmemberlist-table")) {
		// Members
		members = document.getElementById("pgmemberlist-table").getElementsByClassName("pg-list-name");
	} else {
		// Bandenprofil
		var as;
		if(typeof(document.querySelector) === "function") {
			as = document.querySelectorAll(".tieritemA a[href^='/profil/id:'][href$='/']");
		} else {
			as = document.getElementsByClassName("tieritemA")[0].getElementsByTagName("a");
		}
		
		var firstLine = false;
		for(var i = 0; i < as.length; ++i) {
			if(/\/profil\/id:\d+\/$/.test(as[i].getAttribute("href"))) {
				firstLine = as[i].parentNode;
				while(firstLine && !/TR/i.test(firstLine.tagName)) {
					firstLine = firstLine.parentNode;
				}
				break;
			}
		}
		
		members = [false];
		while(firstLine) {
			var member = firstLine.getElementsByTagName("td");
			if(!member || !member[1]) {
				break;
			}
			member = member[1].getElementsByTagName("a");
			if(!member || !member[0] || !/\/profil\/id:\d+\/$/.test(member[0].getAttribute("href"))) {
				break;
			}
			members.push(member[0].parentNode);
			do {
				firstLine = firstLine.nextSibling;
			} while(firstLine && !/TR/i.test(firstLine.tagName || ""));
		}
	}
	checkboxes = [];
	for(var i = 1; i < members.length; ++i) {
		var memberTab = members[i];
		memberTab.insertBefore(document.createTextNode("\xA0"), memberTab.firstChild);
		var checkbox = memberTab.insertBefore(document.createElement("input"), memberTab.firstChild);
		checkboxes.push(checkbox);
		checkbox.setAttribute("type", "checkbox");
		checkbox.setAttribute("checked", "checked");
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
    scriptId:       "73576", // insert id of your userscript from userscripts.org!
    currentVersion: scr_version
});
