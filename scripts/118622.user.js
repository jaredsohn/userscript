// ==UserScript==
// @name		Super Imgur
// @namespace	http://imgur.com
// @description	A script to make imgur browsing better.  Embeds imgur images in comments directly into the page, as well as youtube videos. Also fixes UTF-8 image titles being interpreted at UTF-16 bug.
// @include	http://imgur.com/*
// @version	0.4
// ==/UserScript==

// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};

/**
*
*  URL encode / decode (note: I only used the decode code -Will)
*  http://www.webtoolkit.info/
*
**/

var charReplaceTable = [0x20AC, 0x81, 0x201A, 0x192, 0x201E, 0x2026, 0x2020, 0x2021, 0x2C6, 0x2030, 0x160, 0x2039, 0x152, 0x8D, 0x17D, 0x8F, 0x90, 0x2018, 0x2019, 0x201C, 0x201D, 0x2022, 0x2013, 0x2014, 0x2DC, 0x2122, 0x161, 0x203A, 0x153, 0x9D, 0x17E, 0x178];

var Url = {
    
	// public method for url decoding
	decode : function (string) {
		return this._utf8_decode(unescape(string));
	},

    _charCodeAt : function(s,i) {
        var ch = s.charCodeAt(i);
        if (ch > 128) {
            for (var k = 0; k < charReplaceTable.length; k++)
                if (ch == charReplaceTable[k])
                    return k + 128;
        }
        return ch;
    },

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while ( i < utftext.length ) {

			c = this._charCodeAt(utftext,i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = this._charCodeAt(utftext,i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = this._charCodeAt(utftext,i+1);
				c3 = this._charCodeAt(utftext,i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}
}

// superimgur code

//fix the title
var titleNode = document.getElementById('content');
if (titleNode != null) {
    titleNode = titleNode.getElementsByTagName("h2");
    if (titleNode != null && titleNode.length > 0) {
        titleNode = titleNode[0];
        titleNode.innerText = Url.decode(titleNode.innerText);
    }
}

//embed the images/videos
var commentNode = document.getElementById('captions');
if (commentNode != null) {
var links = commentNode.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        try {
            if (links[i].parentNode.parentNode.className.indexOf("usertext") == -1)
                continue;
            
            var href = links[i].href;
            if (href == null || href =="")
                continue;

            var parsedUrl = parseUri(href);
            if (parsedUrl.host.indexOf("youtube.com") > -1) {
                var videoId;
                if (parsedUrl.directory.indexOf('/v/') == 0)
                    videoId = parsedUrl.directory.substring(3);
                else if (parsedUrl.directory.indexOf('/embed/') == 0)
                    videoId = parsedUrl.directory.substring(7);
                else
                    videoId = parsedUrl.query.match(/v=([^#\&\?]+)/)[1];
                doYouTubeLink(links[i],videoId);
            } else if (parsedUrl.host.indexOf("youtu.be") > -1) {
                doYouTubeLink(links[i],parsedUrl.directory);
            }
            else if (parsedUrl.host.indexOf("imgur.com") > -1 && parsedUrl.directory.indexOf("/user/") == -1 && parsedUrl.directory.indexOf("/a/") == -1 && parsedUrl.directory.indexOf("#") == -1) {
                if (parsedUrl.file == "" && parsedUrl.directory.substr(0,"/gallery/".length) == "/gallery/")
                    href = "http://imgur.com/" + parsedUrl.directory.substring("/gallery/".length) + ".jpg";
                else if (parsedUrl.file == "")
                    href = "http://imgur.com/" + parsedUrl.directory.match(/\/(\w+)$/)[1] + ".jpg";
                doImgurLink(links[i],href);
            }
            else if (parsedUrl.file.match(/(\.gif$)|(\.jpg$)|(\.jpeg$)|(\.png$)/i)) {
                doImgurLink(links[i],href);
            }

        }
        catch (e) {}
    }
}



function doYouTubeLink(anchor, videoId) {
    var parent = anchor.parentNode;
    var embedNode = document.createElement("iframe");
    embedNode.class = "youtube-player";
    embedNode.type = "text/html";
    embedNode.width = "560";
    embedNode.height = "315";
    embedNode.frameBorder = "0";
    embedNode.style.marginTop = "10px";
    embedNode.style.marginBottom = "10px";
    embedNode.src = "http://www.youtube.com/embed/" + videoId;
    parent.appendChild(embedNode);
}

function doImgurLink(anchor, href) {
    var imgNode = document.createElement("img");
    imgNode.src = href;
    imgNode.style.maxWidth = "560px";
    imgNode.style.marginTop = "10px";
    imgNode.style.marginBottom = "10px";
    anchor.innerHTML = "";
    anchor.appendChild(imgNode);

    anchor.parentNode.style.overflow = "hidden";
}
