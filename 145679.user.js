// ==UserScript==
// @name           WebSenseRedirect
// @namespace      rodrigolanes
// @description    Quando cai na pagina de bloqueado pelo Websense, tenta redirecionar conforme regras pre-definidas
// @include        http://*:15871/cgi-bin/block_message.cgi*
// grant           none
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
        } else if (domain.match(/picasaweb/)) {
            picasa2(url);
        } else if (domain.match(/youtube/)) {
            if (path.match(/embed/)) {
                rePath = new RegExp("([^/]+)/([^&?]+)", "i");
                matchPath = rePath.exec(path);
                if ((matchPath != null) && (matchPath.length == 3)) {
                    var idVideo = matchPath[2];
                    path = "watch?v=" + idVideo;
                }
                //TODO colocar a maneira correta de redirecionar a página quando o vídeo é embed.
                document.write(window.location + "<br>");
                document.write(url + "<br>");
                document.write(protocol + "://youtu.be./" + path);
            }
            else {
                window.parent.location = protocol + "://youtu.be./" + path;
            }
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

function picasa2(url) {
	var form = parent.document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", "http://picasawebutility.appspot.com/public");
	var hiddenField = document.createElement("input");
	hiddenField.setAttribute("type", "hidden");
	hiddenField.setAttribute("name", "url");
	hiddenField.setAttribute("value", url);
	form.appendChild(hiddenField);
	parent.document.body.appendChild(form);
	form.submit();
}