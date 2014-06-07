// ==UserScript==
// @name           Add Link
// @description    Insert links for embedded objects.
// @include        *
// ==/UserScript==

/*	Home:      http://userscripts.org/scripts/show/7119
 *	ChangeLog: http://add-link-userscript.blogspot.com
 */

/*	URI - GENERIC
 */
const OFFICIAL_SCHEME = "(aaas|aaa|acap|afs|cap|cid|crid|data|dav|dict|dns|dtn|fax|file|ftp|gopher|go|h323|https|http|iax2|icap|imap|im|info|ipp|iris\\.beep|iris\\.lwz|iris\\.xpcs|iris\\.xpc|iris|ldap|mailserver|mailto|mid|modem|msrps|msrp|mtqp|mupdate|news|nfs|nntp|opaquelocktoken|pack|pop|pres|prospero|rtsp|service|shttp|sips|sip|snmp|soap\\.beeps|soap\\.beep|tag|telnet|tel|tftp|thismessage|tip|tn3270|tv|urn|vemmi|wais|xmlrpc\\.beeps|xmlrpc\\.beep|xmpp|z39\\.50r|z39\\.50s)";
const UNOFFICIAL_SCHEME = "(about|addbook|afp|aim|applescript|bcp|bk|btspp|callto|castanet|cdv|chrome|chttp|cvs|daytime|device|doi|ed2k|eid|enp|feed|finger|fish|freenet|gg|gizmoproject|gsiftp|gsm-sms|h324|hdl|hnews|httpsy|iioploc|ilu|IOR|ircs|irc|itms|jar|javascript|jdbc|klik|kn|lastfm|ldaps|lifn|livescript|lrq|magnet|mailbox|man|md5|mms|mocha|moz-abmdbdirectory|msnim|myim|notes|nsfw|oai|pcast|phone|php|pop3|printer|psyc|pyimp|rdar|res|rsync|rvp|rwhois|rx|sdp|secondlife|sftp|skype|smb|sms|snews|soap\\.udp|soldat|ssh|steam|SubEthaEdit|svn\\+ssh|svn|t120|tann|tcp|telephone|txmt|uddi|unreal|ut2004|uuid|videotex|view-source|wcap|webcal|whodp|whois\\+\\+|whois|wpn|wtai|xeerkat|xfire|ymsgr)";
const SCHEME = "(" + OFFICIAL_SCHEME + "|" + UNOFFICIAL_SCHEME + "):";
const IP_LITERAL = "(\\[((([a-f\\d]{1,4}:){6}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(::([a-f\\d]{1,4}:){5}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(([a-f\\d]{1,4})?::([a-f\\d]{1,4}:){4}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|((([a-f\\d]{1,4}:)?[a-f\\d]{1,4})?::([a-f\\d]{1,4}:){3}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(((([a-f\\d]{1,4}:){1,2})?[a-f\\d]{1,4})?::([a-f\\d]{1,4}:){2}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(((([a-f\\d]{1,4}:){1,3})?[a-f\\d]{1,4})?::([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(((([a-f\\d]{1,4}:){1,4})?[a-f\\d]{1,4})?::([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(((([a-f\\d]{1,4}:){1,5})?[a-f\\d]{1,4})?::[a-f\\d]{1,4})|(((([a-f\\d]{1,4}:){1,6})?[a-f\\d]{1,4})?::))\\])";
const IPV4ADDRESS = "((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5]))";
const IP = "(" + IPV4ADDRESS + "|" + IP_LITERAL + ")";
const HIER_PART = "(((\\/\\/)?((([\\w-.~!$'()*+,;=:]|%[a-f\\d]{2})*@)?(" + IP + "|([\\w-.~!$'()*+,;=]|%[a-f\\d]{2})*)(:\\d+)?))([\\w-.~!$'()*+,;=:@/]|%[a-f\\d]{2})*)";
const QUERY_FRAGMENT = "(\\?([\\w-.~!$'()*+,;=:@/?]|%[a-f\\d]{2})*)?(#([\\w-.~!$'()*+,;=:@/?]|%[a-f\\d]{2})*)?";

/*	URI - NO SCHEME, SPECIFIC REG-NAME AND TOP-LEVEL DOMAIN
 */
const AUTHORITY = "([a-z\\d]([\\w-.~!$*+,=:]|%[a-f\\d]{2})*@)?";
const REG_NAME = "([a-z\\d]([\\w-~!$*+,=@]|%[a-f\\d]{2})+\\.)+";
const TLD = "(ac|ad|aero|ae|af|ag|ai|al|am|an|ao|aq|arpa|ar|asia|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|biz|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|cat|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|coop|com|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|info|int|in|io|iq|ir|is|it|je|jm|jobs|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mobi|mo|mp|mq|mr|ms|mt|museum|mu|mv|mw|mx|my|mz|name|na|nc|net|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pro|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tp|travel|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xn--0zwm56d|xn--11b5bs3a9aj6g|xn--80akhbyknj4f|xn--9t4b11yi5a|xn--deba0ad|xn--g6w251d|xn--hgbk6aj7f53bba|xn--hlcj6aya9esc7a|xn--jxalpdlp|xn--kgbechtv|xn--zckzah|ye|yt|yu|za|zm|zw)";
const PATH = "([;/]([\\w-.~!$'()*+,;=:@/]|%[a-f\\d]{2})*)?";

/*	PATH AND FILE
 */
const RELPATH = "([\\w-.~!$*+,;=:@/]|%[a-f\\d]{2})*";
const PATH2 = "(\\/+" + RELPATH + ")";
const FILE = "[\\w-]+\\.(aac|asf|asp|avi|c|cpp|css|eps|gif|gz|htm|html|java|jpeg|jpg|js|jsp|m3u|mkv|mov|mp3|mp4|mpa|mpeg|mpg|pdf|pgp|php|pl|png|ps|qt|rar|svg|swf|tar|tar\.gz|tif|wmv|xhtml|xml|zip)\\b";

/*	URI REGULAR EXPRESSION (removed `&' from the regular expression)
 */
var uriRegExp = new RegExp("(" + SCHEME + HIER_PART + "|" + AUTHORITY + "(" + IP + "|(" + REG_NAME + TLD + "\\b))(:\\d+)?" + PATH + "|" + PATH2 + "?" + FILE + ")" + QUERY_FRAGMENT, "i");
var fileRegExp = new RegExp(FILE + "$", "i");

const TAGS =
{
	"embed": "src",
	"object": "data"
};

function main()
{
	var elements = document.evaluate(".//embed[@src and not(parent::object)] | .//object[@data or child::embed]", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (!elements || elements.snapshotLength == 0) return;
	appendStyle(
		".addlink-table {" +
			"border: 0 !important;" +
			"border-collapse: separate !important;" +
			"margin: 0 auto !important;" +
			"width: 0 !important;" +
		"}" +
		".addlink-table td {" +
			"border: 0 !important;" +
			"margin: 0 2.5px 0 2.5px !important;" +
			"padding: 0 2.5px 0 2.5px !important;" +
		"}");
	for (var i = 0; i < elements.snapshotLength; i++)
	{
		var element = elements.snapshotItem(i);
		var embObj = element;

		var idHideShow = "addlink-object-hideShow" + i;
		var idScale = "addlink-object-scale" + i;
		element.setAttribute("id", idHideShow);
		element.setAttribute("style", "position: relative;");

		if (element.tagName.toLowerCase() == "object")
		{
			var embeds = document.evaluate("./embed", element, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (embeds && embeds.snapshotLength > 0)
			{
				var embed = embeds.snapshotItem(0);
				embed.setAttribute("id", idScale);
				embed.setAttribute("style", "position: relative;");
				embObj = embed;
			}
			else idScale = idHideShow;
		}
		else idScale = idHideShow;

		var divInnner = "<table class=\"addlink-table\" align=center border=0 cellspacing=5 cellpadding=0><tbody><tr style=\"text-align: left !important; vertical-align: baseline !important;\">";
		var outerHTML = getOuterHTML(element);
		var linkObj = {};
		var matches = null;
		var fromIndex = 0;
		divInnner += "<td>";
		while (matches = outerHTML.substring(fromIndex).match(uriRegExp))
		{
			var m = matches[0];
			var index = outerHTML.indexOf(m, fromIndex);

			if (!linkObj[m])
			{
				linkObj[m] = true;
				divInnner += "<a href=\"" + m + "\">";
				divInnner += m.match(/([^/]+\/?)$/)[0].replace(/\/$/, "");
				divInnner += "</a><br/>";
			}

			fromIndex = index + m.length;
		}
		divInnner += "</td>";

		var hasInnerObj = idScale != idHideShow;
		var hasWidthOrHeight = embObj.width > 0 || embObj.height > 0;
		if (hasInnerObj) hasWidthOrHeight = hasWidthOrHeight || element.width > 0 || element.height > 0;

		var funcScale = null;
		if (hasWidthOrHeight)
		{
			funcScale = "(function(){var select=document.addlinkForm" + i + ".addlinkSelect;var index=select.selectedIndex;var scale=select.options[index].text;var embObj=document.getElementById('" + idScale + "');embObj.width=" + (embObj.width > 0 && embObj.width < 800 ? embObj.width : 480) + "*scale;embObj.height=" + (embObj.height > 0 && embObj.height < 600 ? embObj.height : 360) + "*scale;";
			if (hasInnerObj) funcScale += "embObj=document.getElementById('" + idHideShow + "');embObj.width=" + (element.width > 0 && element.width < 800 ? element.width : 480) + "*scale;embObj.height=" + (element.height > 0 && element.height < 600 ? element.height : 360) + "*scale;";
			funcScale += "}());";
		}
		var funcHide = "(function(){document.getElementById('addlink-show" + i + "').setAttribute('style','');document.getElementById('addlink-hide" + i + "').setAttribute('style','display:none!important;');document.getElementById('" + idHideShow + "').setAttribute('style','display:none!important;');}());"
		var funcShow = "(function(){document.getElementById('addlink-hide" + i + "').setAttribute('style','');document.getElementById('addlink-show" + i + "').setAttribute('style','display:none!important;');document.getElementById('" + idHideShow + "').setAttribute('style','');}());";

		if (hasWidthOrHeight) divInnner +=
			"<td><!--label for=\"addlink-scale"+i+"\">Scale:</label-->"+
			"<form id=\"addlink-scale"+i+"\" name=\"addlinkForm"+i+"\" title=\"Scale\">"+
			"<select name=\"addlinkSelect\" onclick=\"" + funcScale + funcShow + "\">"+
			"<option value=\"0.1\">0.1</option>"+
			"<option value=\"0.2\">0.2</option>"+
			"<option value=\"0.4\">0.4</option>"+
			"<option value=\"0.6\">0.6</option>"+
			"<option value=\"0.8\">0.8</option>"+
			"<option value=\"1.0\" selected=\"selected\">1.0</option>"+
			"<option value=\"1.2\">1.2</option>"+
			"<option value=\"1.4\">1.4</option>"+
			"<option value=\"1.6\">1.6</option>"+
			"<option value=\"1.8\">1.8</option>"+
			"<option value=\"2.0\">2.0</option>"+
			"</select>"+
			"</form></td>"; // SCALE
		divInnner += "<td><a id=\"addlink-hide" + i + "\" href=\"javascript:" + funcHide + "\">Hide</a>"; // HIDE
		divInnner += "<a id=\"addlink-show" + i + "\" href=\"javascript:" + funcShow + "\" style=\"display: none !important;\">Show</a></td>"; // SHOW

		var div = document.createElement("div");
		div.setAttribute("style", "display: block !important; overflow: hidden !important; padding: 5px !important; position: relative;");
		div.innerHTML = divInnner;
		element.parentNode.insertBefore(div, element.nextSibling);

		eval(funcShow);
	}
}

function getOuterHTML(node)
{
	if (node.nodeType != 1) return ""; // element-node
	var outerHTML = "<" + node.nodeName;
	for (var i in node.attributes)
	{
		var item = node.attributes.item(i);
		outerHTML += " " + item.nodeName + "=\"" + item.nodeValue + "\"";
	}
	if (node.childNodes.length == 0) outerHTML += "/>";
	else outerHTML += ">" + node.innerHTML + "</" + node.nodeName + ">";
	return outerHTML;
}

function appendStyle(css)
{
	var head = document.getElementsByTagName("head")[0];
	if (!head) return;
	var style = document.createElement("style");
	style.setAttribute("rel", "stylesheet");
	style.setAttribute("type", "text/css");
	style.innerHTML = css;
	head.appendChild(style);
}

main();