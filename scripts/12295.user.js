// ==UserScript==
// @name           Skip Redirect
// @description    Skip diverse redirects.
// @include        *
// ==/UserScript==

// URI - GENERIC
const OFFICIAL_SCHEME = "(aaas|aaa|acap|afs|cap|cid|crid|data|dav|dict|dns|dtn|fax|file|ftp|gopher|go|h323|https|http|iax2|icap|imap|im|info|ipp|iris\\.beep|iris\\.lwz|iris\\.xpcs|iris\\.xpc|iris|ldap|mailserver|mailto|mid|modem|msrps|msrp|mtqp|mupdate|news|nfs|nntp|opaquelocktoken|pack|pop|pres|prospero|rtsp|service|shttp|sips|sip|snmp|soap\\.beeps|soap\\.beep|tag|telnet|tel|tftp|thismessage|tip|tn3270|tv|urn|vemmi|wais|xmlrpc\\.beeps|xmlrpc\\.beep|xmpp|z39\\.50r|z39\\.50s)";
const UNOFFICIAL_SCHEME = "(about|addbook|afp|aim|applescript|bcp|bk|btspp|callto|castanet|cdv|chrome|chttp|cvs|daytime|device|doi|ed2k|eid|enp|feed|finger|fish|freenet|gg|gizmoproject|gsiftp|gsm-sms|h324|hdl|hnews|httpsy|iioploc|ilu|IOR|ircs|irc|itms|jar|javascript|jdbc|klik|kn|lastfm|ldaps|lifn|livescript|lrq|magnet|mailbox|man|md5|mms|mocha|moz-abmdbdirectory|msnim|myim|notes|nsfw|oai|pcast|phone|php|pop3|printer|psyc|pyimp|rdar|res|rsync|rvp|rwhois|rx|sdp|secondlife|sftp|skype|smb|sms|snews|soap\\.udp|soldat|ssh|steam|SubEthaEdit|svn\\+ssh|svn|t120|tann|tcp|telephone|txmt|uddi|unreal|ut2004|uuid|videotex|view-source|wcap|webcal|whodp|whois\\+\\+|whois|wpn|wtai|xeerkat|xfire|ymsgr)";
const SCHEME = "(" + OFFICIAL_SCHEME + "|" + UNOFFICIAL_SCHEME + "):";
const IP_LITERAL = "(\\[((([a-f\\d]{1,4}:){6}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(::([a-f\\d]{1,4}:){5}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(([a-f\\d]{1,4})?::([a-f\\d]{1,4}:){4}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|((([a-f\\d]{1,4}:)?[a-f\\d]{1,4})?::([a-f\\d]{1,4}:){3}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(((([a-f\\d]{1,4}:){1,2})?[a-f\\d]{1,4})?::([a-f\\d]{1,4}:){2}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(((([a-f\\d]{1,4}:){1,3})?[a-f\\d]{1,4})?::([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(((([a-f\\d]{1,4}:){1,4})?[a-f\\d]{1,4})?::([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(((([a-f\\d]{1,4}:){1,5})?[a-f\\d]{1,4})?::[a-f\\d]{1,4})|(((([a-f\\d]{1,4}:){1,6})?[a-f\\d]{1,4})?::))\\])";
const IPV4ADDRESS = "((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5]))";
const IP = "(" + IPV4ADDRESS + "|" + IP_LITERAL + ")";
const HIER_PART = "(((\\/\\/)?((([\\w-.~!$&'()*+,;=:]|%[a-f\\d]{2})*@)?(" + IP + "|([\\w-.~!$&'()*+,;=]|%[a-f\\d]{2})*)(:\\d+)?))([\\w-.~!$&'()*+,;=:@/]|%[a-f\\d]{2})*)";
const QUERY_FRAGMENT = "([?]([\\w-.~!$'()*+,;=:@/?]|%[a-f\\d]{2})*([&]([\\w-.~!$&'()*+,;=:@/?]|%[a-f\\d]{2})*)?)?(#([\\w-.~!$&'()*+,;=:@/?]|%[a-f\\d]{2})*)?";
const URI1 = "(" + SCHEME + HIER_PART + QUERY_FRAGMENT + ")";

// URI - NO SCHEME, SPECIFIC REG-NAME AND TOP-LEVEL DOMAIN
const AUTHORITY = "([a-z\\d]([\\w-.~!$&*+,=:]|%[a-f\\d]{2})*@)?";
const REG_NAME = "([a-z\\d]([\\w-~!$&*+,=@]|%[a-f\\d]{2})+\\.)+";
const TLD = "(ac|ad|aero|ae|af|ag|ai|al|am|an|ao|aq|arpa|ar|asia|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|biz|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|cat|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|coop|com|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|info|int|in|io|iq|ir|is|it|je|jm|jobs|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mobi|mo|mp|mq|mr|ms|mt|museum|mu|mv|mw|mx|my|mz|name|na|nc|net|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pro|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tp|travel|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xn--0zwm56d|xn--11b5bs3a9aj6g|xn--80akhbyknj4f|xn--9t4b11yi5a|xn--deba0ad|xn--g6w251d|xn--hgbk6aj7f53bba|xn--hlcj6aya9esc7a|xn--jxalpdlp|xn--kgbechtv|xn--zckzah|ye|yt|yu|za|zm|zw)";
const PATH = "([;/]([\\w-.~!$&'()*+,;=:@/]|%[a-f\\d]{2})*)?";
const URI2 = "(" + AUTHORITY + "(" + IP + "|(" + REG_NAME + TLD + "\\b))(:\\d+)?" + PATH + QUERY_FRAGMENT + ")";

// URI REGULAR EXPRESSION
const uriRegExp = new RegExp(URI1 + "|" + URI2, "i");

// UNWANTED REGULAR EXPRESSION
const unwantedRegExp = new RegExp("^((" + SCHEME + "?\\/*)|(\\+[-.()\\d]{1,3}[-.()]*)|" + IPV4ADDRESS + ")$", "i"); // SCHEME-ONLY OR 1-3 DIGITS PHONENUMBER

// MAILTO REGULAR EXPRESSION
const MAILTO = "((([\\w-.~]|%[a-f\\d]{2})+@([\\w-.~,]|%[a-f\\d]{2})+)*([&?]([\\w-.~=@]|%[a-f\\d]{2})*)*)";
const mailtoRegExp = new RegExp("^" + MAILTO + "$", "i");

// SCHEME REGULAR EXPRESSION
const schemeRegExp = new RegExp("^" + SCHEME, "i");

const NAME = "skipredirect";
const DUMP = false;
const t0 = new Date().getTime();

function main()
{
	metaRefresh();
	frameRedirection();
	urlRedirection();
}

function metaRefresh()
{
	var metas = document.evaluate("./html/head/meta[translate(@http-equiv,'EFHRS','efhrs')='refresh']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (!metas || metas.snapshotLength <= 0) return;
	window.addEventListener("load", function(){window.stop();}, false); // STOP REFRESH
	var content = metas.snapshotItem(0).getAttribute("content");
	var spacer = content.match(/^[0-9]+\s*;\s*(url=)?/i);
	if (spacer) insertRedirect(content.substring(spacer[0].length));
}

function frameRedirection()
{
	var frames = document.evaluate(".//frame[@src]", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (!frames || frames.snapshotLength != 1) return;
	window.location.replace(frames.snapshotItem(0).src);
}

var urls = null;
function urlRedirection()
{
	appendStyle();
	var anchors = document.evaluate(".//a[contains(@href,'?') or contains(@href,'&')]", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (anchors && anchors.snapshotLength > 0) for (var i = 0; i < anchors.snapshotLength; i++)
	{
		urls = {};
		urls.obj = {};
		urls.count = 0;
		var anchor = anchors.snapshotItem(i);
		var href = anchor.getAttribute("href");

		var tmp = href.replace(/^[^?&=]+[?&=]/, "").replace(/\s+$/, "");
		var arr = tmp.split(/[?&=]/);
		for (var j = 0; j < arr.length; j++) skipRedirect(arr[j]);

		switch (urls.count)
		{
			case 0: continue;
			case 1:
				for (var uri in urls.obj)
				{
if (DUMP) dump("* uri=" + uri + "\n");
					anchor.setAttribute("href", uri);
				}
				break;

			default:
				if (!anchor.parentNode) continue;
				var span = document.createElement("span");
				span.setAttribute("class", "skip-redirect-userscript-span");
				var innerHTML = "<ul class=\"skip-redirect-userscript-ul\"><li><a href=\"" + href + "\">" + anchor.innerHTML + "</a><ul>";
				for (var uri in urls.obj)
				{
if (DUMP) dump("* uri=" + uri + "\n");
					innerHTML += "<li><a href=\"" + uri + "\"><nobr>" + uri + "</nobr></a></li>";
				}
				innerHTML += "</ul></li></ul>";
				span.innerHTML = innerHTML;
				anchor.parentNode.replaceChild(span, anchor);
		}
	}
}

function skipRedirect(value)
{
	if (!value) return;

	if (value.indexOf("%") > -1)
	{
		var arr = value.split(/[?&=]/);
		for (var i = 0; i < arr.length; i++)
		{
			if (arr[i].length < 4) continue;
			if (arr[i].indexOf("%") > -1)
			{
				var tmp = unescape(arr[i]);
				if (tmp == arr[i]) continue;
				arr[i] = tmp;
			}
			skipRedirect(arr[i]);
		}
	}
	else
	{
		var uri = value.replace(/\ /g, "%20").match(uriRegExp);
		if (!uri) return;
		uri = uri[0];
		if (uri.match(unwantedRegExp)) return;
		if (!uri.match(schemeRegExp))
		{
			if (uri.match(mailtoRegExp)) uri = "mailto:" + uri;
			else if (uri.match(telRegExp)) uri = "tel:" + uri;
			else uri = "http://" + uri;
		}
		urls.obj[uri] = true;
		urls.count++;
	}
}

function insertRedirect(uri)
{
	document.body.setAttribute("style",
		"margin: 0 !important;" +
		"padding: 0 !important;");
	var div = document.createElement("div");
	div.setAttribute("style",
		"background: white none repeat scroll 0% !important;" +
		"color: gray !important;" +
		"display: block !important;" +
		"font: normal normal normal 11px Arial,sans-serif !important;" +
		"margin: 0 !important;" +
		"padding: 5px !important;" +
		"position: fixed !important;" +
		"text-align: left !important;" +
		"width: 100% !important;" +
		"z-index: 10000 !important;");
	var a = document.createElement("a");
	a.setAttribute("href", uri);
	a.setAttribute("style",
		"background: white none repeat scroll 0% !important;" +
		"color: gray !important;" +
		"font: normal normal normal 11px Arial,sans-serif !important;");
	a.appendChild(document.createTextNode(uri));
	div.appendChild(document.createTextNode("Redirect to "));
	div.appendChild(a);
	document.body.insertBefore(div, document.body.firstChild);
}

function appendStyle()
{
	var head = document.getElementsByTagName("head")[0];
	if (!head) return;
	var style = document.createElement("style");
	style.rel = "stylesheet";
	style.type = "text/css";
	style.innerHTML =
		".skip-redirect-userscript-span {" +
			"margin: 0 !important;" +
			"padding: 0 !important;" +
			"vertical-align: text-bottom !important;" +
		"}" +
		".skip-redirect-userscript-ul {" +
			"display: table-row !important;" +
			"margin: 0 !important;" +
			"padding: 0 !important;" +
			"text-align: left !important;" +
		"}" +
		".skip-redirect-userscript-ul li {" +
			"list-style: none !important;" +
			"margin: 0 !important;" +
			"padding: 0 !important;" +
			"position: relative !important;" +
		"}" +
		".skip-redirect-userscript-ul li:hover ul {" +
			"display: block !important;" +
		"}" +
		".skip-redirect-userscript-ul ul {" +
			"background: white none repeat scroll 0% !important;" +
			"display: none !important;" +
			"margin: 0 !important;" +
			"border: 1px solid #eae8e3 !important;" +
			"padding: 0 5px !important;" +
			"position: absolute !important;" +
			"text-align: left !important;" +
			"z-index: 10000 !important;" +
		"}" +
		".skip-redirect-userscript-ul ul a {" +
			"color: gray !important;" +
			"font: normal normal normal 11px Arial,sans-serif !important;" +
			"margin: 0 !important;" +
			"padding: 0 !important;" +
			"text-decoration: none !important;" +
		"}";
	head.appendChild(style);
}

if (DUMP) dump("\n--- begin " + NAME + " (" + window.location.href + ") ---\n");
main();
if (DUMP) dump("--- " + NAME + " end (" + ((new Date().getTime() - t0) / 1000.0) + " sek) ---\n");