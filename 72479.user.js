var scr_version = <><![CDATA[
// ==UserScript==
// @name           Write 'em all!
// @author         Peter L aus B (http://berlin.pennergame.de/change_please/3471184/)
// @namespace      peter_l_aus_b[2]
// @description    Mehreren Pennern auf einmal schreiben.
// @version        0.1.7
// @version        0.1.5 Typo. (Danke für den Hinweis, RoseMadder!)
// @version        0.1.4 Knopf auf allen /messages/*-Seiten. (Wunsch von TrickyWarrior :-)
// @version        0.1.3 Falsches Continue. (Danke für den Hinweis, TrickyWarrior!)
// @version        0.1.1 Spam-Schutz beachten (Danke für den Hinweis, PENNERHACK!)
// @include        http://*.pennergame.de/messages/*
// @include        http://*.clodogame.fr/messages/*
// @include        http://*.menelgame.pl/messages/*
// @include        http://*.dossergame.co.uk/messages/*
// @include        http://*.mendigogame.es/messages/*
// @include        http://*.serserionline.com/messages/*
// @include        http://*.bumrise.com/messages/*
// ==/UserScript==
]]></>.toString().match(/@version\s+([.\d]+)/)[1];

var WRITE_MESSAGE_PATH = "/messages/write/"
var WRITE_EM_ALL_SEARCH = "?writeEmAll";

function mkSentFun(li, iframe) {
	return function(ev) {
		ev.preventDefault();
		
		var status = iframe.contentWindow.location.toString().match(/\?status=(.+)$/);
		if(!status) {
			return false;
		}
		iframe.src = "about:blank";
		
		var span = li.appendChild(document.createElement("span"));
		span.style.fontStyle = "italic";
		span.appendChild(document.createTextNode(" (" + status[1] + ")"));
		
		return false;
	};
}

function mkSendFun(receivers, player, form, i) {
	return function() {
		receivers.value = player;
		form.setAttribute("target", "iframe--" + i);
		form.submit();
	};
}

function init() {
	if(!document.querySelectorAll) {
		alert("Dein Browser ist veraltet.\nDas Script \"Write 'em all!\" funktioniert erst ab Firefox 3.5!");
		return;
	}
	
	var li4 = document.querySelector(".submenu li.active").parentNode.appendChild(document.createElement("li"));
	var a = li4.appendChild(document.createElement("a"));
	a.setAttribute("class", "btn4");
	a.appendChild(document.createTextNode("Write 'em All!"));
	
	if(/^\/messages\/write\//.test(window.location.pathname)) {
		a.setAttribute("href", "#");
		a.addEventListener("click", writeEmAll, false);
	} else {
		a.setAttribute("href", "http://" + window.location.host + WRITE_MESSAGE_PATH + WRITE_EM_ALL_SEARCH);
	}
	
	if(window.location.pathname === WRITE_MESSAGE_PATH && window.location.search === WRITE_EM_ALL_SEARCH) {
		var click = document.createEvent("MouseEvents");
		click.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		a.dispatchEvent(click);
	}
	
	return false;
	
	function writeEmAll(ev) {
		ev.preventDefault();
		
		li4.style.display = "none";
		
		var form = document.getElementById("form1");
		var action = form.getAttribute("action");
		form.setAttribute("action", "#");
		
		var receivers = document.getElementById("f_toname");
		receivers.setAttribute("readonly", "readonly");
		receivers.style.fontStyle = "italic";
		receivers.setAttribute("type", "hidden");
		
		var textArea = receivers.parentNode.insertBefore(document.createElement("textarea"), receivers);
		textArea.setAttribute("cols", "20");
		textArea.setAttribute("rows", "5");
		
		if(receivers.value) {
			textArea.appendChild(document.createTextNode(receivers.value + "\n"));
			receivers.value = "<Write 'em All-Modus>";
		} else {
			receivers.setAttribute("value", "<Write 'em All-Modus>");
		}
		
		form.addEventListener("submit", submit, false);
		return false;
		
		function submit(ev) {
			ev.preventDefault();
			form.setAttribute("action", action);
			form.removeEventListener("submit", submit, false);
			
			var values = textArea.value.split("\n");
			var submit = form.querySelector("input[type=submit]");
			submit.style.display = "none";
			
			var ul = document.createElement("ul");
			textArea.parentNode.replaceChild(ul, textArea);
			
			var sendFuns = [];
			
			for(var i = 0; i < values.length;) {
				var player = values[i].trim();
				if(!player) {
					values.splice(i,1);
					continue;
				}
				++i;
				
				var li = ul.appendChild(document.createElement("li"));
				li.appendChild(document.createTextNode(player));
				
				var iframe = document.createElement("iframe");
				iframe.style.height = "400px";
				iframe.style.width = "400px";
				iframe.style.display = "none";
				iframe.setAttribute("src", "about:blank");
				iframe.setAttribute("id", "iframe--" + i);
				iframe.setAttribute("name", "iframe--" + i);
				iframe.addEventListener("load", mkSentFun(li, iframe), false);
				
				document.querySelector("body").appendChild(iframe);
				
				sendFuns.push(mkSendFun(receivers, player, form, i));
			}
			
			var sendTimeout = sendFuns.length < 10 ? 1100 : 12500;
			function sendThem() {
				var sendFun = sendFuns.shift();
				if(!sendFun) {
					return;
				}
				sendFun();
				
				window.setTimeout(sendThem, sendTimeout);
			}
			sendThem();
			
			return false;
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
        version:    /@version\s+([.\d]+)[\r\n]/,
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
    scriptId:       "72479", // insert id of your userscript from userscripts.org!
    currentVersion: scr_version
});
