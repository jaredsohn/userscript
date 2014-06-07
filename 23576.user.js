// ==UserScript==
// @name          delicious network info
// @namespace     http://thomd.net/userscript
// @description   adds number of users from your network and number of your fans to header links  
// @include       http://del.icio.us/*
// @include       http://*.del.icio.us/*
// @include       http://delicious.com/*
// @include       http://*.delicious.com/*
// @author        Thomas Duerr
// @version       0.5
// @date          2010-09-29
// @change        fixed xpath for parsing of user due to changed html structure.
// ==/UserScript==


// xpath helper
function $x(p, context){
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

// objectKeys2array-helper
function $o2a(o){
	var a = [];
	for(e in o){
		a.push(e);
	}
	return a;
}



// get username
var user = $x("id('globalnav')//li/strong/a")[0].textContent;

if(user != null){

	// Check if there is a 'Network'-link. Only then insert network-infos
	var altMessageLinks = $x("id('alt_message')/*");
	if(altMessageLinks.length > 0){
		for(am = 0; am < altMessageLinks.length; am ++){
			if(altMessageLinks[am].textContent.match(/^Network/) != null){

				// network json-feed
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://feeds.delicious.com/v2/json/networkmembers/'+user+'?callback=updateNetwork',
					onload: function(responseDetails){
						eval(responseDetails.responseText);
					}
				});

				// fans json-feed
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://feeds.delicious.com/v2/json/networkfans/'+user+'?callback=addFans',
					onload: function(responseDetails){
						eval(responseDetails.responseText);
					}
				});

				break;
			}
		}
	}
}


var updateNetwork = function(network){
	$x("id('alt_message')/a[2]")[0].textContent += " (" + $o2a(network).length + ")";
}


var addFans = function(fans){
	
	var fansLink = document.createElement("a");
	fansLink.setAttribute("href", "/network/" + user);
	fansLink.appendChild(document.createTextNode("Fans (" + $o2a(fans).length + ")"));

	var pipe = document.createElement("em");
	pipe.appendChild(document.createTextNode(" | "));
	
	var linkList = $x("id('alt_message')")[0];
	linkList.insertBefore(pipe, $x("id('alt_message')/*[4]")[0])
	linkList.insertBefore(fansLink, $x("id('alt_message')/*[5]")[0])
}





//
// ChangeLog
// 2008-03-06 - 0.1   - created
// 2008-08-01 - 0.2   - support for new delicious-relaunch
// 2009-03-28 - 0.3   - userscript updater added
// 2010-01-26 - 0.4   - changed html-structure needs other xpath for parsing username
// 2010-05-11 - 0.4.1 - changed url for script-updater-check and increased check interval to limit unnecessary server load on userscripts.org
// 2010-09-29 - 0.5   - fixed xpath for parsing of user due to changed html structure.





//
// ---------- userscript updater --------------------------------------------------------------------------------------
//
var userscriptUpdater = function(){

    var css = "div.greasemonkey_updater { font-size: 12px; background: #FFC; padding: 10px 15px; border-width: 1px 0; border-style: solid; border-color: #F90; margin: 0 0 30px; } " +
              "div.greasemonkey_updater h1 { font-size: 16px !important; margin: 0 0 5px 0; font-weight: bold; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide { float: right; text-align: right; width: 125px; font-size: 11px; font-weight: normal; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide a { color: #F00; } " +
              "div.greasemonkey_updater p { margin: 0 0 15px 0; font-size: 12px !important; line-height: 140%; color: #000; }";

    var config      = {
        checkInterval: 604800,                                    // default check interval: check once a day [in seconds]
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
    scriptId:       "23576",
    currentVersion: "0.5",
    injectInto:     document.getElementById("pagetitle")
});
