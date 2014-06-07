// ==UserScript==
// @name           wsredirect
// @namespace      http://dbb.9hells.org
// @description    Redireciona websense
// @include        http://*:15871/cgi-bin/*
// ==/UserScript==

var re = new RegExp("URL( bloqueada)?: ([^<]*)\.<", "i");
var m = re.exec(document.body.innerHTML);

if (m != null) {
    var url = RegExp.lastParen;
    re = new RegExp("([^:]*)://([^/]+)/(.*)", "i");
    m = re.exec(url);
    if ((m != null) && (m.length == 4)) {
        url = m[0];
        var protocol = m[1].toLowerCase();
        var domain = m[2].toLowerCase();
        var path = m[3];

        if (domain == "video.google.com") {
            window.parent.location = protocol + "://video.google.fr/" + path;
        } else if (domain.match(/dropbox/)) {
            window.parent.location = protocol + "://dl2.dropbox.com/" + path;
        } else if (domain.match(/flickr/)) {
            window.parent.location = protocol + "://www.flickr.mud.yahoo.com/" + path;
        } else if (domain.match(/addons/) || domain.match(/releases\.mozilla/)) {
            window.parent.location = protocol + "://pt-br.add-ons.mozilla.com/" + path;
        } else if (domain.match(/youtube/)) {
            youtube(path)
        } else if (domain.match(/tinyurl/)) {
            long_url(url);
        }
    }
}

function long_url(url) {
    GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.longurlplease.com/api/v1.1?q=" + escape(url),
		onload: function(responseDetails) {
            data = eval('(' + responseDetails.responseText + ')');
            window.parent.location = data[url];
		},
		onerror: function(responseDetails) {
			alert("Error fetching currency data for " + url);
		}
	});
}

function youtube(path) {
	path = path.replace('embed','v');
    re = new RegExp("v[/=](.{11})", "i");
    m = re.exec(path);
    if (m != null) window.parent.location = "http://youtu.be./watch?v=" + m[1]; 
}


function picasa(url) {
	var form = parent.document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", "http://picasawebutility.appspot.com/public");
	var hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("name", "userinput");
	hiddenField.setAttribute("value", url);
	form.appendChild(hiddenField);
	parent.document.body.appendChild(form);
	form.submit();
}