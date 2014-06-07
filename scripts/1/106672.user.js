// ==UserScript==
// @name			xrel copy rlsname
// @namespace		xrel
// @version			1.2.3
// @source 			http://userscripts.org/scripts/show/106672
// @include			http://www.xrel.to/*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @date 			2013-07-01
// ==/UserScript==

// ---------- xrel copy rlsname Script --------------------------------------------------------------------------------
//
$("head").append("<style type=\"text/css\" charset=\"utf-8\">"
    +".google{"
        +"cursor:pointer;"
        +"width:11px;"
        +"height:12px !important;"
        +"color:#000;"
        +"background:#59cbef;"
        +"background:#59cbef -moz-linear-gradient(top,#ADE5F7,#59CBEF);"
        +"background:#59cbef #ddd -webkit-linear-gradient(top,#ADE5F7,#59CBEF);"
        +"background:#59cbef #ddd -o-linear-gradient(top,#ADE5F7,#59CBEF);"
        +"position:absolute;"
        +"margin-top:-1px;"
        +"margin-left:-1px;"
        +"margin-bottom:-2px;"
        +"display:inline-block"
        +"font-family:monospace;"
        +"font-size:13px;"
        +"padding:2px 0 0 2px;"
        +"line-height:12px;"
        +"border:1px solid #089DCB"
    +"}"
    +".showrls{"
        +"padding:0px 2px;"
        +"width:688px;"
        +"border:0px;"
        +"font-size:11px;"
        +"background:none;"
        +"text-shadow:0px 0px 1px #eee;"
        +"margin-top:2px;"
        +"position:absolute;"
        +"margin-left:16px;"
        +"height:11px"
    +"}"
    +".shdiv{"
        +"background:#ddd;"
        +"background:#ddd -moz-linear-gradient(top,#eee,#ccc);"
        +"background:#ddd -webkit-linear-gradient(top,#eee,#ccc);"
        +"background:#ddd -o-linear-gradient(top,#eee,#ccc);"
        +"height:16px;"
        +"margin:0 0 -1px -120px;"
        +"width:708px;"
        +"display:none;"
        +"border:1px solid #bbb;"
        +"height:14px"
    +"}"
    +".clickme{"
        +"display:inline-block;"
        +"color:#000;"
        +"background:#bede78;"
        +"background:-moz-linear-gradient(top,#DFF1B6,#BEDE78);"
        +"background:#ddd -webkit-linear-gradient(top,#DFF1B6,#BEDE78);"
        +"background:#ddd -o-linear-gradient(top,#DFF1B6,#BEDE78);"
        +"cursor:pointer;"
        +"padding:0 0 1px 3px !important;"
        +"width:7px;"
        +"line-height:12px;"
        +"height:9px !important;"
        +"border:1px solid #87A93E;"
        +"font-family:monospace;"
        +"font-size:8px"
    +"}"
+"</style>");

$('.nfo_title').attr({title: 'click to mark rlsname'});
$('.nfo_title').click(function() {var shortSelector = $('.nfo_title .sub').selectText();});
$('.release_title').prepend('<span class="clickme" title="click to show rlsname">R</span>');
$('.release_title_p2p').prepend('<span class="clickme" title="click to show rlsname">R</span>');
$('.clickme').click(function() {var y = $(this).attr('id');$('#b'+y).slideToggle(0);});

$('.release_title').mouseover(function()
{
	var uid = new Date().getTime();
	if ($(this).attr("active") == undefined)
    {
		$(this).find('.clickme').attr('id', uid);
		var b = $(this).find('.truncd').attr('id');
		if (b == undefined)
        {
			b = $(this).find('.sub_link span').html();
            var a = $('#'+b).attr("title");
            $(this).append(
                '<div id="b'+uid+'" class="shdiv">'
                    +'<span class="google" onclick="window.open(\'http://www.google.de/search?q=&quot;'+b+'&quot;\');" title="click to search with google">G</span>'
                    +'<input id="a'+uid+'" class="showrls" onmouseover="select(this.value);" value="'+b+'" />'
                +'</div>'
            );
            $(this).attr("active", true);
		}
        else
        {
			var a = $('#'+b).attr("title");
            if(a == '')
            {
                a = $(this).find('.sub_link span').html();
            }
            $(this).append(
                '<div id="b'+uid+'" class="shdiv">'
                    +'<span id="b'+uid+'" class="google" title="click to search with google" onclick="window.open(\'http://www.google.de/search?q=&quot;'+a+'&quot;\');">G</span>'
                    +'<input id="a'+uid+'" class="showrls" onmouseover="select(this.value);" value="'+a+'" />'
                +'</div>'
            );
            $(this).attr("active", true);
		}
	}
});

$('.release_title_p2p').mouseover(function()
{
	var uid = new Date().getTime();
	if ($(this).attr("active") == undefined)
    {
		$(this).find('.clickme').attr('id', uid);
		var b = $(this).find('.truncd').attr('id');
		if (b == undefined)
        {
			b = $(this).find('.sub_link span').html();
            var a = $('#'+b).attr("title");
            $(this).append(
                '<div id="b'+uid+'" class="shdiv">'
                    +'<span class="google" onclick="window.open(\'http://www.google.de/search?q=&quot;'+b+'&quot;\');" title="click to search with google">G</span>'
                    +'<input id="a'+uid+'" class="showrls" onmouseover="select(this.value);" value="'+b+'" />'
                +'</div>'
            );$(this).attr("active", true);
		}
        else
        {
			var a = $('#'+b).attr("title");
            var a = $('#'+b).attr("title");
            if(a == '')
            {
                a = $(this).find('.sub_link span').html();
            }
            $(this).append(
                '<div id="b'+uid+'" class="shdiv">'
                    +'<span id="b'+uid+'" class="google" title="click to search with google" onclick="window.open(\'http://www.google.de/search?q=&quot;'+a+'&quot;\');">G</span>'
                    +'<input id="a'+uid+'" class="showrls" onmouseover="select(this.value);" value="'+a+'" />'
                +'</div>'
            );
            $(this).attr("active", true);
		}
	}
});
//
// ---------- xrel copy rlsname Script --------------------------------------------------------------------------------

// ---------- userscript updater --------------------------------------------------------------------------------------
//
var userscriptUpdater = function(){

    var css = "div.greasemonkey_updater { font-size: 12px; background: #FFC; padding: 10px 15px; border-width: 1px 0; border-style: solid; border-color: #F90; margin: 0 0 30px; } " +
              "div.greasemonkey_updater h1 { font-size: 16px !important; margin: 0 0 5px 0; font-weight: bold; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide { float: right; text-align: right; width: 125px; font-size: 11px; font-weight: normal; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide a { color: #F00; } " +
              "div.greasemonkey_updater p { margin: 0 0 15px 0; font-size: 12px !important; line-height: 140%; color: #000; }";

    var config      = {
        checkInterval: 86400,                                    // default check interval: check once a week [in seconds]
                                                                  // Please don't set 'checkInterval' to more than once a day to limit unnecessary server load on userscripts.org
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
    scriptId:       "106672", // insert id of your userscript from userscripts.org!
    currentVersion: "1.2.3"        // insert current version number based on versioning scheme: major.minor[.bugfix]
});
//
// ---------- userscript updater --------------------------------------------------------------------------------------