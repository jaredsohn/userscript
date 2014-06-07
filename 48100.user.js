// ==UserScript==
// @name           Zvraceny.cz Downloader
// @namespace      http://synopsi.com/
// @include        http://www.zvraceny.cz/video/*
// @created by     ehmo (synopsi.com)
// ==/UserScript==

function insertAfter( referenceNode, newNode )
{
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

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
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};


var download_image = "<img src='data:image/gif;base64,R0lGODlhMAAuAFUAACH5BAAAAAAALAAAAAAwAC4Ahf///1CWAGGlDsber2SoGYi7T3SgRLq7tpTCYmmnJdboxousZ2GlAObm5VqbDOvr6sXFw2WQM7nXm16gDabLgXmxQN7e3UyPAF2eAFWbAOTu2UB0AKHJdVqcFFiVAEeFANjW11KbD0+FAHq0NFSTCr7Yp0yIC1KMBQAAAPP57kiECury4WipApvGb9DfxWSpAHGuHl+jDqq1nUyNE06UAPX48XKsMp3IbPT38W6rL0eCC2CeILDTj+np6HayJ5i6fAb+QIBwSCwaj8ikcslsOp/QqHRKrVqv1tWA10J4v+CwuMUbrKSKVqWSa7vf8Hh73VJAV632JMTv+/+AfBNtLWdOPAQEeyEVXIGBOVw5IRkTiTxPFRMTGSE5Qzydj3w7dgAKlJUTFU+boqxDk6MhJUR8GZU7Tj00uHw5KUMrO6MIRAN9uDQ9Tby+fC3Hj8BDKcTJy829onwDRC2BpkIVfsrMTM7cITuGACmyfZigf+baz32wQqj4RPvlGdnQbQMkTwgPUu1SkPsH8NySdOGIkPM2BBy9egLv+aEmJEW0IcgA4WpoT50fY0eGBRoZ8OHAR7WMLLyI0aXGP+yKHFzJ0qHzEoijPg3xJ7JnyVkhPr4bNZJkRpNJByDAl4dUmZmpav582ecjAHh+Yi69ZfTpn5gALP4RN7Npy603C+70oytWsrI2TXodG68aQ6d5cQYTsmJmQQAl/r5NAtTP4VMKBncE69YnYxq9IipRS1ZrkgYdMgMqlYRzZxodGjRpEAHzqDpFSoC9izmCaiYNEFyggXTHGqwiMV9AcHtJAwgRNmBumkxkZ5YXLkSAUPynBRnJN0Tfzr27d+4bIsiwYJnx9QXZN6hfz769+wgLxldHZwGC/fv48+vXT35KjwYWBCjggAQWaEEDDZSHxYIMNujggxBGiEUQADs%3D' border='0' alt='Download .flv' />";

var nodes = document.evaluate("//div[@id='hlavni']/div[1]/div[1]/a[2]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
//alert(nodes.snapshotItem(0).innerHTML);

var video = document.evaluate("//div[@id='hlavni']/div[1]/p[1]/embed[1]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var flashvars = video.snapshotItem(0).attributes[2].value;
//alert(video.snapshotItem(0).attributes[2].value);

buildedQ = 'http://www.zvraceny.cz/video.php?' + parseUri(flashvars).query + '&' + parseUri(flashvars).protocol;

var download_link = document.createElement("a");
download_link.href = buildedQ;
download_link.innerHTML = download_image;

var div_r = nodes.snapshotItem(0);
insertAfter(div_r,download_link);