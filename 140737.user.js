// ==UserScript==
// @name        Monsterdivx Plugin
// @namespace   monsterdivx
// @include     *monsterdivx.com/*
// @include     *wupload.*/*
// @include     *bayfiles.com/*
// @include     *crocko.com/*
// @include     *rapidgator.net/*
// @include     *filefactory.com/*
// @include     *filebox.com/*
// @include     *cramit.in/*
// @include     *zalaa.com/*
// @include     *180upload.com/*
// @version     1.2
// ==/UserScript==

var loc = (location.href.match(/monsterdivx=true/i));
if (location.href.match(/^http:\/\/(www\.)?megaupload\.com/i) && loc) {
    addScript("mega");
} else if (location.href.match(/^http:\/\/(www\.)?hotfile\.com/i) && loc) {
    addScript("hotfile");
} else if (location.href.match(/^http:\/\/(www\.)?filesonic\.com/i) && loc) {
    addScript("fsonic");
} else if (location.href.match(/^http:\/\/(www\.)?bitshare\.com/i) && loc) {
    addScript("bitshare");
} else if (location.href.match(/^http:\/\/(www\.)?monsterdivx\.com/i)) {
    if (document.getElementById("player_frame_2")) {
        if (document.getElementById("player_frame_2").src.match(/getplugin/i)) {
            var al = document.getElementById("videoi").innerHTML.replace(/amp;/gi, '');
            document.getElementById("player_frame_2").src = "http://www.monsterdivx.com/wp-content/plugins/monsterdivx-player/scripts/source-iframe.php?" + al + "&ver=1.03";
        }
    }
}
var loc = (location.href.match(/id=/i) && location.href.match(/monsterdivx=true/i));
if (location.href.match(/^http:\/\/(www\.)?bitshare\.com/i) && loc) {
    xz("bitshare")
} else if (location.href.match(/^http:\/\/(www\.)?wupload\.com/i) && loc) {
    xz("wupload")
} else if (location.href.match(/^http:\/\/(www\.)?wupload\.de/i) && loc) {
    xz("wupload")
} else if (location.href.match(/^http:\/\/(www\.)?wupload\.mx/i) && loc) {
    xz("wupload")
} else if (location.href.match(/^http:\/\/(www\.)?wupload\.es/i) && loc) {
    xz("wupload")
} else if (location.href.match(/^http:\/\/(www\.)?wupload\.jp/i) && loc) {
    xz("wupload")
} else if (location.href.match(/^http:\/\/(www\.)?wupload\.it/i) && loc) {
    xz("wupload")
} else if (location.href.match(/^http:\/\/(www\.)?wupload\.fr/i) && loc) {
    xz("wupload")
} else if (location.href.match(/^http:\/\/(www\.)?bayfiles\.com/i) && loc) {
    xz("bayfiles")
} else if (location.href.match(/^http:\/\/(www\.)?crocko\.com/i)) {
    xz("crocko")
} else if (location.href.match(/^http:\/\/(www\.)?rapidgator\.net/i)) {
    xz("rapidgator")
} else if (location.href.match(/^http:\/\/(www\.)?filefactory\.com/i)) {
    xz("ffactory")
} else if (location.href.match(/^http:\/\/(www\.)?filebox\.com/i) && loc) {
    xz("filebox")
} else if (location.href.match(/^http:\/\/(www\.)?cramit\.in/i) && loc) {
    xz("cramit")
} else if (location.href.match(/^http:\/\/(www\.)?zalaa\.com/i) && loc) {
    xz("zalaa")
} else if (location.href.match(/^http:\/\/(www\.)?180upload\.com/i) && loc) {
    xz("180upload")
}

function xz(g) {
    var j = document.getElementsByTagName("script");
    for (var i = 0; i < j.length; i++) {
        src = j[i]["src"];
        if (src == "http://www.monsterdivx.com/wp-content/plugins/monsterdivx-player/js/hosts/" + g + ".js") {
            return
        }
    }
    var f = document.createElement("script");
    f.setAttribute("type", "text/javascript");
    f.setAttribute("src", "http://www.monsterdivx.com/wp-content/plugins/monsterdivx-player/js/hosts/" + g + ".js");
    var h = (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);
    if (h == null) {
        return
    }
    h.appendChild(f)
}

function addScript(id) {
	var s = document.createElement('script');
	s.setAttribute("type","text/javascript");
	s.setAttribute("src", "http://www.monsterdivx.com/wp-content/plugins/monsterdivx-player/js/hosts/"+id+".js");
	var head = (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]);
	if (head==null) {
		return;
	}
	head.appendChild(s);
}