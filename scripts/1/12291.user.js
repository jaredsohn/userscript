// ==UserScript==
// @name           Fix Web
// @include        *
// ==/UserScript==

const NAME = "fixweb";
const DUMP = false;
const t0 = new Date().getTime();

function main()
{
	onclick2link();
	show_embedded();
}

function onclick2link()
{
	var func = function() {
		var elements = document.evaluate(".//a[@onclick] | .//area[@onclick] | .//a[contains(@href, 'javascript:')] | .//button[@onclick] | .//div[@onclick] | .//input[@onclick and translate(@type,'BNOTU','bnotu')='button']", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (elements && elements.snapshotLength > 0) for (var i = 0; i < elements.snapshotLength; i++)
		{
			var element = elements.snapshotItem(i);
			var onclick = element.getAttribute("onclick");
			var href = element.getAttribute("href");
			href = getHref(href);

			if (onclick && !href) // @onclick and not(@href)
			{
				onclick = getHref(onclick);
				if (!onclick) continue;
				switch (element.tagName.toLowerCase())
				{
					case "a":
					case "area":
						element.setAttribute("href", onclick);
						element.setAttribute("onclick", "");
						break;

					case "button":
					case "div":
						var a = document.createElement("a");
						a.setAttribute("href", onclick);
						a.innerHTML = element.innerHTML;
						element.parentNode.replaceChild(a, element);
						break;

					case "input":
						var a = document.createElement("a");
						a.setAttribute("href", onclick);
						a.innerHTML = element.getAttribute("value");
						element.parentNode.replaceChild(a, element);
						break;
				}
if (DUMP) dump("onclick2link: " + element.tagName.toLowerCase() + ", " + onclick + "\n");
			}

			else // contains(@href, 'javascript:')
			{
				if (!href || !href.match(/^\s*javascript:/i)) continue;
				element.setAttribute("href", href);
if (DUMP) dump("onclick2link: " + element.tagName.toLowerCase() + ", " + href + "\n");
			}
		}
	};
	funcOnce(func);
}

// URI - GENERIC (removed javascript from OFFICIAL_SCHEME)
const OFFICIAL_SCHEME = "(aaas|aaa|acap|afs|cap|cid|crid|data|dav|dict|dns|dtn|fax|file|ftp|gopher|go|h323|https|http|iax2|icap|imap|im|info|ipp|iris\\.beep|iris\\.lwz|iris\\.xpcs|iris\\.xpc|iris|ldap|mailserver|mailto|mid|modem|msrps|msrp|mtqp|mupdate|news|nfs|nntp|opaquelocktoken|pack|pop|pres|prospero|rtsp|service|shttp|sips|sip|snmp|soap\\.beeps|soap\\.beep|tag|telnet|tel|tftp|thismessage|tip|tn3270|tv|urn|vemmi|wais|xmlrpc\\.beeps|xmlrpc\\.beep|xmpp|z39\\.50r|z39\\.50s)";
const UNOFFICIAL_SCHEME = "(about|addbook|afp|aim|applescript|bcp|bk|btspp|callto|castanet|cdv|chrome|chttp|cvs|daytime|device|doi|ed2k|eid|enp|feed|finger|fish|freenet|gg|gizmoproject|gsiftp|gsm-sms|h324|hdl|hnews|httpsy|iioploc|ilu|IOR|ircs|irc|itms|jar|jdbc|klik|kn|lastfm|ldaps|lifn|livescript|lrq|magnet|mailbox|man|md5|mms|mocha|moz-abmdbdirectory|msnim|myim|notes|nsfw|oai|pcast|phone|php|pop3|printer|psyc|pyimp|rdar|res|rsync|rvp|rwhois|rx|sdp|secondlife|sftp|skype|smb|sms|snews|soap\\.udp|soldat|ssh|steam|SubEthaEdit|svn\\+ssh|svn|t120|tann|tcp|telephone|txmt|uddi|unreal|ut2004|uuid|videotex|view-source|wcap|webcal|whodp|whois\\+\\+|whois|wpn|wtai|xeerkat|xfire|ymsgr)";
const SCHEME = "(" + OFFICIAL_SCHEME + "|" + UNOFFICIAL_SCHEME + "):";
const IP_LITERAL = "(\\[((([a-f\\d]{1,4}:){6}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(::([a-f\\d]{1,4}:){5}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(([a-f\\d]{1,4})?::([a-f\\d]{1,4}:){4}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|((([a-f\\d]{1,4}:)?[a-f\\d]{1,4})?::([a-f\\d]{1,4}:){3}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(((([a-f\\d]{1,4}:){1,2})?[a-f\\d]{1,4})?::([a-f\\d]{1,4}:){2}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(((([a-f\\d]{1,4}:){1,3})?[a-f\\d]{1,4})?::([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(((([a-f\\d]{1,4}:){1,4})?[a-f\\d]{1,4})?::([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(((([a-f\\d]{1,4}:){1,5})?[a-f\\d]{1,4})?::[a-f\\d]{1,4})|(((([a-f\\d]{1,4}:){1,6})?[a-f\\d]{1,4})?::))\\])";
const IPV4ADDRESS = "((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5]))";
const IP = "(" + IPV4ADDRESS + "|" + IP_LITERAL + ")";
const HIER_PART = "(((\\/\\/)?((([\\w-.~!$&'()*+,;=:]|%[a-f\\d]{2})*@)?(" + IP + "|([\\w-.~!$&'()*+,;=]|%[a-f\\d]{2})*)(:\\d+)?))([\\w-.~!$&'()*+,;=:@/]|%[a-f\\d]{2})*)";
const QUERY_FRAGMENT = "([&?]([\\w-.~!$&'()*+,;=:@/?]|%[a-f\\d]{2})*)?(#([\\w-.~!$&'()*+,;=:@/?]|%[a-f\\d]{2})*)?";
const URI1 = "(" + SCHEME + HIER_PART + QUERY_FRAGMENT + ")";

// URI - NO SCHEME, SPECIFIC REG-NAME AND TOP-LEVEL DOMAIN
const AUTHORITY = "([a-z\\d]([\\w-.~!$&*+,=:]|%[a-f\\d]{2})*@)?";
const REG_NAME = "([a-z\\d]([\\w-~!$&*+,=@]|%[a-f\\d]{2})+\\.)+";
const TLD = "(ac|ad|aero|ae|af|ag|ai|al|am|an|ao|aq|arpa|ar|asia|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|biz|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|cat|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|coop|com|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|info|int|in|io|iq|ir|is|it|je|jm|jobs|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mobi|mo|mp|mq|mr|ms|mt|museum|mu|mv|mw|mx|my|mz|name|na|nc|net|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pro|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tp|travel|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xn--0zwm56d|xn--11b5bs3a9aj6g|xn--80akhbyknj4f|xn--9t4b11yi5a|xn--deba0ad|xn--g6w251d|xn--hgbk6aj7f53bba|xn--hlcj6aya9esc7a|xn--jxalpdlp|xn--kgbechtv|xn--zckzah|ye|yt|yu|za|zm|zw)";
const PATH = "([;/]([\\w-.~!$&'()*+,;=:@/]|%[a-f\\d]{2})*)?";
const URI2 = "(" + AUTHORITY + "(" + IP + "|(" + REG_NAME + TLD + "\\b))(:\\d+)?" + PATH + QUERY_FRAGMENT + ")";

const RELPATH = "([\\w-.~!$&*+,;=:@/]|%[a-f\\d]{2})*";
const PATH2 = "\\/+" + RELPATH;
const FILE = "\\w+\\.(aac|asf|asp|avi|c|cpp|css|eps|gif|gz|htm|html|java|jpeg|jpg|js|jsp|m3u|mkv|mov|mp3|mp4|mpa|mpeg|mpg|pdf|pgp|php|pl|png|ps|qt|rar|svg|swf|tar|tar\.gz|tif|wmv|xhtml|xml|zip)\\b";

// URI REGULAR EXPRESSION
var uriRegExp = new RegExp(URI1 + "|" + URI2 + "|((" + PATH2 + "|(" + RELPATH + PATH2 + ")|" + FILE + ")" + QUERY_FRAGMENT + ")", "i");
var unwantedRegExp = new RegExp("^((" + SCHEME + "?\\/*)|" + IPV4ADDRESS + ")$", "i");

function getHref(value)
{
	if (!value) return null;
	var uri = value.match(uriRegExp);
	if (!uri) return null;
	uri = uri[0];
	uri = fixBalanced(uri, value.charAt(value.indexOf(uri) - 1));
	if (!uri.match(unwantedRegExp)) return uri;
	return null;
}

function fixBalanced(uri, character)
{
	var index = -1;
	switch (character)
	{
		case "(": index = uri.indexOf(")"); break; // (  )
		case "`": index = uri.indexOf("'"); break; // `  '
		case "'": index = uri.indexOf("'"); break; // '  '
	}
	if (index > -1) return uri.substring(0, index);
	return uri;
}

function show_embedded()
{
	var func = function(content, script) {
		if (content.match(SWFOBJECT_REGEXP)) show_swfobject(content, script);
		if (content.match(ADOBE_FLASH_REGEXP)) show_adobe_flash(content, script);
		if (content.match(UNOBTRUSIVE_FLASH_REGEXP)) show_unobtrusive_flash(content, script);
	};
	funcScript(func);	// Only use script-code from the script text-content (the `same origin policy' is sufficient)
//	funcScript(func, true);	// Also use script-code from the src-attribute if available (the `all access policy' is advisable)
}

const COMMENT              = "(((\\/\\/)|(\\/\\*))\\s*)?";
const VAR                  = "[\\w-][\\w\\d-]*";
const SWFOBJECT_NEW        = VAR + "\\s*=\\s*new\\s+SWFObject\\s*\\(\\s*";
const SWFOBJECT_WRITE      = "\\.write\\s*\\(\\s*";
const NAME_PAR             = "(\"[^\"]+\"|\'[^\']+\')";
//const VALUE_PAR            = "((" + NAME_PAR + "|\\d+|\\w[\\w-.]*(\\s*\\(\\s*\\)\\s*)?)(\\s*\\+\\s*)?)+";
const VALUE_PAR            = "((" + NAME_PAR + "|\\d+|\\w[\\w-.]*(\\s*\\(.*?\\)\\s*)?)(\\s*\\+\\s*)?)+";
const PARAMS               = "\\s*\\(\\s*" + NAME_PAR + "\\s*,\\s*" + VALUE_PAR + "\\s*\\)";
const ADDVARIABLE_FULL     = VAR + "\\.addVariable" + PARAMS;
const ADDPARAM_FULL        = VAR + "\\.addParam" + PARAMS;
const SWFOBJECT_NEW_FULL   = SWFOBJECT_NEW + "[^)]+\\)";
const SWFOBJECT_WRITE_FULL = VAR + SWFOBJECT_WRITE + "[^)]+\\)";
const SWFOBJECT_REGEXP     = new RegExp(COMMENT + "(" + SWFOBJECT_NEW_FULL + "|" + SWFOBJECT_WRITE_FULL + "|" + ADDVARIABLE_FULL + "|" + ADDPARAM_FULL + ")", "g");
var swfobjects = {};
var embedObj = {};
function show_swfobject(content, script)
{
	var commentRegExp = new RegExp("^" + COMMENT);
	var varRegExp = new RegExp("^" + VAR);
	var nameRegExp = new RegExp(NAME_PAR);
	var valueRegExp = new RegExp(VALUE_PAR);
	var newRegExp = new RegExp("^" + SWFOBJECT_NEW_FULL + "$");
	var writeRegExp = new RegExp("^"  + SWFOBJECT_WRITE_FULL + "$");
	var addVariableRegExp = new RegExp("^" + ADDVARIABLE_FULL + "$");
	var addParamRegExp = new RegExp("^" + ADDPARAM_FULL + "$");

	// Parse the current script-content.
	var matches = content.match(SWFOBJECT_REGEXP);
	if (!matches) return;

	var get_name = function(src) {
		var n = src.match(nameRegExp);
		if (!n) return null;
		return n[0].substring(1, n[0].length - 1);
	}

	var get_value = function(src) {
		var spacer = new RegExp(VAR + "\\.\\w+\\s*\\(\\s*" + NAME_PAR + "\\s*\\,\\s*");
		var v = src.replace(spacer, "").replace(/\s*\)$/, "");
		return getVariableValue(v, content);
	}

	for (var i = 0; i < matches.length; i++)
	{
		// Get the name of the SWFObject variable.
		var m = matches[i];
		if (m.charAt(0) == '/') continue;
		var spacer = m.match(commentRegExp)[0];
		m = m.substring(spacer.length);
		var name = m.match(varRegExp)[0];

		if (m.match(newRegExp)) // so = new SWFObject(...)
		{
if (DUMP) dump("* found swfobject...\n  + match=" + m + "\n");
			swfobjects[name] = {
				div:       null,
				embed:     document.createElement("embed"),
				flashvars: {}
			};

			// Get the parameters from the constructor-call.
			var ps = m.substring(m.indexOf('(') + 1, m.length - 1).replace(/^\s+/, "").replace(/\s+$/, "").split(/\s*\,\s*/);
			for (var j = 0; j < ps.length; j++) ps[j] = getVariableValue(ps[j], content);
			if (ps[0]) swfobjects[name].embed.setAttribute("src", ps[0]);
			if (ps[1])
			{
				if ($id(ps[1]))
				{
if (DUMP) dump("  + " + ps[1] + " exists!\n");
					return;
				}
				swfobjects[name].embed.setAttribute("id", ps[1]);
				swfobjects[name].embed.setAttribute("name", ps[1]);
			}
			if (ps[2]) swfobjects[name].embed.setAttribute("width", ps[2]);
			if (ps[3]) swfobjects[name].embed.setAttribute("height", ps[3]);
//			if (ps[4]) swfobjects[name].embed.setAttribute("version", ps[4]);
			if (ps[5]) swfobjects[name].embed.setAttribute("bgcolor", ps[5]);
			if (ps[6]) swfobjects[name].embed.setAttribute("quality", ps[6]);
		}

		else if (m.match(writeRegExp)) // so.write(...)
		{
			if (name == "document") continue;
			if (!swfobjects[name]) continue;
if (DUMP) dump("  + match=" + m + "\n");

			// Get the div element.
			var id = m.match(nameRegExp);
			if (!id) continue;
			id = id[0].substring(1, id[0].length - 1);
			if (embedObj[id]) continue;
			else embedObj[id] = true;
			swfobjects[name].div = $id(id);

			var elements = document.evaluate(".//embed", swfobjects[name].div, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (elements && elements.snapshotLength > 0) continue;

			// Show the embed-object.
			if (swfobjects[name].div && swfobjects[name].embed)
			{
				removeNoscript(script);
				removeNoscript(swfobjects[name].div);
				swfobjects[name].div.innerHTML = "";

				var flashvars = swfobjects[name].embed.getAttribute("flashvars");
				if (flashvars) flashvars = flashvars.replace(/&amp;/, '&');
				else flashvars = "";
				for (var n in swfobjects[name].flashvars)
				{
					if (flashvars != "") flashvars += "&";
					flashvars += n + "=" + swfobjects[name].flashvars[n];
				}
				if (flashvars != "") swfobjects[name].embed.setAttribute("flashvars", flashvars);
if (DUMP) dump("  + name=" + name + "\n");

				swfobjects[name].embed.setAttribute("type", "application/x-shockwave-flash");
				swfobjects[name].div.appendChild(swfobjects[name].embed);
				swfobjects[name].div.setAttribute("style", "display: inline !important; visibility: visible !important;");
				swfobjects[name] = null;
			}
		}

		else if (m.match(addVariableRegExp)) // so.addVariable(...)
		{
			if (!swfobjects[name]) continue;
			var n = get_name(m);
			if (!n || swfobjects[name].flashvars[n]) continue;
if (DUMP) dump("  + match=" + m + "\n");
			var v = get_value(m);
			swfobjects[name].flashvars[n] = v ? v : "";
		}

		else if (m.match(addParamRegExp)) // so.addParam(...)
		{
			if (!swfobjects[name]) continue;
			var n = get_name(m);
			if (!n || swfobjects[name].embed.getAttribute(n)) continue;
if (DUMP) dump("  + match=" + m + "\n");
			var v = get_value(m);
			swfobjects[name].embed.setAttribute(n, v ? v : "");
		}
	}
}

// IGNORE THESE ATTRIBUTES
const ignoreAttrs = /classid|codebase|onactivate|onafterupdate|onbeforedeactivate|onbeforeeditfocus|onbeforeupdate|onblur|oncellchange|onclick|ondblClick|ondeactivate|ondrag|ondragend|ondragenter|ondragleave|ondragover|ondrop|onfinish|onfocus|onhelp|onkeydown|onkeypress|onkeyup|onload|onlosecapture|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onpropertychange|onreadystatechange|onrowenter|onrowexit|onrowsdelete|onrowsinserted|onscroll|onstart|type/;

const ADOBE_FLASH_REGEXP = new RegExp(/AC_FL_RunContent\s*\([^\)]*/);
function show_adobe_flash(content, script)
{
	// Parse the current script-content.
	var matches = content.match(ADOBE_FLASH_REGEXP)[0].match(/"[^"]+"|'[^']+'|[\s,](\d+|true|false)[\s,)]/g);
	if (!matches) return;
if (DUMP) dump("* found adobe_flash...\n");

	var args = [];
	for (var i = 0; i < matches.length; i++) args[args.length] = matches[i].substring(1, matches[i].length - 1);

	// Sort the wheat from the chaff.
	var embedAttrs = {};
	var ext = ".swf";
	for (var i = 0; i < args.length; i += 2)
	{
		var name = args[i].toLowerCase();
		if (name.match(ignoreAttrs)) continue;

		switch (name)
		{
			case "src":

			case "movie":

				args[i+1] = (args[i+1].indexOf('?') != -1) ? args[i+1].replace(/\?/, ext+'?') : args[i+1] + ext;

				embedAttrs["src"] = args[i+1];

				break;
			default:

				embedAttrs[name] = args[i+1];
		}
	}


	if ($id(embedAttrs["id"]))
	{
if (DUMP) dump("  + " + embedAttrs["id"] + " exists!\n");
		return;
	}

	if (!embedAttrs["type"]) embedAttrs["type"] = "application/x-shockwave-flash";

if (DUMP) dump("  + name=" + name + "\n");
	// Create the embed object, show the embed-object and remove an existing noscript element.
	removeNoscript(script);
	removeNoscript(script.parentNode);
	var embed = document.createElement("embed");
	for (var name in embedAttrs) embed.setAttribute(name, embedAttrs[name]);
	script.parentNode.replaceChild(embed, script);
}

const UNOBTRUSIVE_FLASH_NEW         = VAR + "\\s*=\\s*{";
const UNOBTRUSIVE_FLASH_CREATE      = VAR + "\\.create\\s*\\(\\s*\\w+";
const UNOBTRUSIVE_FLASH_NEW_FULL    = UNOBTRUSIVE_FLASH_NEW + "[^}]+}";
const UNOBTRUSIVE_FLASH_CREATE_FULL = UNOBTRUSIVE_FLASH_CREATE + "[^)]+\\)";
const UNOBTRUSIVE_FLASH_REGEXP      = new RegExp(UNOBTRUSIVE_FLASH_NEW_FULL + "|" + UNOBTRUSIVE_FLASH_CREATE_FULL, "g");
var ufos = {};
function show_unobtrusive_flash(content, script)
{
	var newRegExp = new RegExp("^" + UNOBTRUSIVE_FLASH_NEW_FULL + "$");
	var createRegExp = new RegExp("^" + UNOBTRUSIVE_FLASH_CREATE_FULL + "$");

	// Parse the current script-content.
	var matches = content.match(UNOBTRUSIVE_FLASH_REGEXP);
	if (!matches) return;

	var get_name = function(src) {
		var n = src.match(/\w+/)[0].toLowerCase();
		if (n.match(ignoreAttrs)) return null;
		return n;
	}

	var get_value = function(src) {
		var v = src.substring(src.indexOf(':')).match(/"[^"]+"|'[^']+'|\d+|true|false/);
		return getVariableValue(v[0]);
	}

	for (var i = 0; i < matches.length; i++)
	{
		var m = matches[i];

		if (m.match(newRegExp)) // var FO = {...}
		{
			// Get the parameters from the constructor-call.
			var ps = m.match(/\w+\s*:\s*("[^"]+"|'[^']+'|\d+|true|false)/g);
			if (!ps) continue;
if (DUMP) dump("* found unobtrusive_flash...\n");

			var re = new RegExp(UNOBTRUSIVE_FLASH_NEW);
			var name = m.match(re)[0].match(/\w+/)[0];
			ufos[name] = {
				div:       null,
				embed:     document.createElement("embed")
			};

			// Sort the wheat from the chaff.
			for (var j = 0; j < ps.length; j++)
			{
				var n = get_name(ps[j]);
				if (!n) continue;
				var v = get_value(ps[j]);
				if (v) switch (n)
				{
					case "src":

					case "movie":

						ufos[name].embed.setAttribute("src", v);

						break;
					default:

						ufos[name].embed.setAttribute(n, v);
				}
			}


			if (ufos[name].embed.getAttribute("id")) return;

			// Ensure that required attributes have a value.
			if (!ufos[name].embed.getAttribute("height")) ufos[name].embed.setAttribute("height", "138");
			if (!ufos[name].embed.getAttribute("src")) ufos[name].embed.setAttribute("src", "ufo.swf");
			if (!ufos[name].embed.getAttribute("type")) ufos[name].embed.setAttribute("type", "application/x-shockwave-flash");
			if (!ufos[name].embed.getAttribute("width")) ufos[name].embed.setAttribute("width", "215");
		}

		if (m.match(createRegExp)) // UFO.create(FO, ...)
		{
			var name = m.match(/\(\s*\w+\,/)[0].match(/\w+/)[0];
			if (!ufos[name]) continue;

			// Get the div element.
			var id = m.match(/"[^"]+"|'[^']+'/)[0];
			id = id.substring(1, id.length - 1);
			ufos[name].div = $id(id);
			if (!ufos[name].div) continue;
			var objects = document.evaluate("./embed | ./object", ufos[name].div, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (objects && objects.snapshotLength > 0)
			{
if (DUMP) dump("  + " + id + " exists!\n");
				return;
			}

			// Show the embed-object.
			if (ufos[name].div && ufos[name].embed)
			{
if (DUMP) dump("  + name=" + name + "\n");
				removeNoscript(script);
				removeNoscript(ufos[name].div);
				ufos[name].div.innerHTML = "";
				ufos[name].div.appendChild(ufos[name].embed);
				ufos[name].div.setAttribute("style", "display: inline !important; visibility: visible !important;");
				ufos[name] = null;
			}
		}
	}
}

function removeNoscript(element)
{
	if (!element) return;

	try{
		var nss = element.nextSibling.nextSibling;
		if (nss.tagName.toLowerCase() == "noscript") nss.parentNode.removeChild(nss);
	}catch(e){}
	try{
		var ns = element.nextSibling;
		if (ns.tagName.toLowerCase() == "noscript") ns.parentNode.removeChild(ns);
	}catch(e){}
}

function $id(id, doc) {
	if (doc) return doc.getElementById(id);
	else return document.getElementById(id);
}

//var scriptBuffer = "";

function funcOnce(func)
{
	try{func();}catch(e){/*dump(NAME+"::funcOnce: "+e+"\n");*/}
}

function funcScript(func, fromSrc)
{
	var scripts = document.evaluate(".//script", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (!scripts) return;
	for(var i = 0; i < scripts.snapshotLength; i++)
	{
		var script = scripts.snapshotItem(i);
		var src = null;
		if (fromSrc) src = script.getAttribute("src");
		if (src)
		{
			var cbFunc = function(content) {
				if (content)
				{
//					scriptBuffer += content;
					try{func(content, script);}catch(e){/*dump(NAME+"::funcScript[src=true]: "+e+"\n");*/}
				}
			};
//			getResponse("GET", src, true, RESPONSE_TEXT, cbFunc);	// asynchronous
			cbFunc(getResponse("GET", src, false, RESPONSE_TEXT));	// synchronous
		}
		else if (script.textContent)
		{
//			scriptBuffer += script.textContent;
			try{func(script.textContent, script);}catch(e){/*dump(NAME+"::funcScript[src=false]: "+e+"\n");*/}
		}
	}
}

function getVariableValue(v, content)
{
	if (!v || v == "" || v == "\"\"") return null;
	if (v.match(/^(\d+|true|false)$/)) return v;
	if (v.match(/^("[^"]+"|'[^']+')$/)) return v.substring(1, v.length - 1);
	if (v.match(/^(new\s+)?\w+\s*\([^)]*\)$/))
	{
		var func = v.match(/\w+\s*\([^)]*\)$/)[0].match(/^\w+/)[0];
		var param = v.replace(/^(new\s+)?\w+\s*\(\s*/, "").replace(/\s*\)$/, "");
		switch (func)
		{
			case "Date": return new Date().getTime();
			case "encodeURIComponent": return encodeURIComponent(getVariableValue(param, content));
			case "encodeURI": return encodeURIComponent(getVariableValue(param, content));
		}
		return null;
	}
	switch (v)
	{
		case "location.href": return window.location.href;
		case "null": return null;
	}

	var vs = v.match(/(["']\s*\+\s*)?[^+]+\s*\+\s*["']|["']\s*\+\s*[^+]+(\s*\+\s*["'])?/g);
	if (vs)
	{
		for (var i = 0; i < vs.length; i++)
		{
			var tmp = vs[i].match(/[^"'+]+/)[0];
			tmp = getVariableValue(tmp, content);
			v = v.replace(vs[i], tmp ? tmp : "");
		}
		return v.replace(/^["']/, "").replace(/["']$/, "");
	}

	var re  = new RegExp("(((\\/\\/|\\/\\*)\\s*)?(var\\s+)?)?" + v + "\\s*[=:]\\s*(" + NAME_PAR + "|(.*\s*;\s*$)|(new\\s+)?\\w+\\s*\\([^)]*\\))", "g");	// multi line
//	var re2 = new RegExp("(((\\/\\/|\\/\\*)\\s*)?(var\\s+)?)?" + v + "\\s*[=:]\\s*(\".*?\"|'.*?')\s*;\s*$", "g");				// single line
	var removeRegExp = new RegExp("^(((\\/\\/|\\/\\*)\\s*)?(var\\s+)?)?" + v + "\\s*[=:]\\s*|\s*;\s*$", "g");

	var value = content.match(re);			// complex search
//	if (!value) value = scriptBuffer.match(re2);	// simple search (too slow)
	if (!value) return null;

	for (var i = 0; i < value.length; i++)
	{
		if (value[i].charAt(0) == '/') continue;
		var tmp = getVariableValue(value[i].replace(removeRegExp, ""), content);
		if (tmp) return tmp;
	}

	return null;
};

const RESPONSE_TEXT = 0;
const RESPONSE_XML = 1;
function getResponse(method, url, async, responseType, callbackFunction, params)
{
	try{
		var request = new XMLHttpRequest();
		url = generateUrl(url);
		var tmp = request.open(method, url, async);
		if (callbackFunction) request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200)
			{
				switch (responseType)
				{
					case RESPONSE_XML:
						if (request.responseXML) callbackFunction(request.responseXML);
						break;
					default:
						if(request.responseText) callbackFunction(request.responseText);
				}
			}
		};
		switch (method)
		{
			case "POST":
				if (!params) params = "";
				request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				request.setRequestHeader("Content-length", params.length);
				request.setRequestHeader("Connection", "close");
				request.send(params);
				break;
			default:
				request.send(null);
		}
		if (!async && request.readyState == 4 && request.status == 200) switch (responseType)
		{
			case RESPONSE_XML: return request.responseXML;
			default: return request.responseText;
		}
	}catch(e){/*dump(NAME+"::getResponse[url=" + url + "]: "+e+"\n");*/}
	return null;
}

function generateUrl(path)
{
	var url = null;
	if (path.match(/^https?:/i)) return path;
	var href = window.location.href;
	if (href.match(/^file:/i))
	{
		var index = href.lastIndexOf('/');
		url = href.substring(0, index);
	}
	else url = window.location.protocol + "//" + window.location.host;
	if (path[0] != "/") url += "/";
	return url + path;
}

if (DUMP) dump("\n--- begin " + NAME + " (" + window.location.href + ") ---\n");
main();
if (DUMP) dump("--- " + NAME + " end (" + ((new Date().getTime() - t0) / 1000.0) + " sek) ---\n");