// ==UserScript==
// @name           Text to Link
// @description    Change URIs and non-URIs written as text into links.
// @include        *
// ==/UserScript==

if (!document.getElementById("text-to-link-userscript"))
{

/*
 * URI - GENERIC
 */
var OFFICIAL_SCHEME = "(aaas|aaa|acap|afs|cap|cid|crid|data|dav|dict|dns|dtn|fax|file|ftp|gopher|go|h323|https|http|iax2|icap|imap|im|info|ipp|iris\\.beep|iris\\.lwz|iris\\.xpcs|iris\\.xpc|iris|ldap|mailserver|mailto|mid|modem|msrps|msrp|mtqp|mupdate|news|nfs|nntp|opaquelocktoken|pack|pop|pres|prospero|rtsp|service|shttp|sips|sip|snmp|soap\\.beeps|soap\\.beep|tag|telnet|tel|tftp|thismessage|tip|tn3270|tv|urn|vemmi|wais|xmlrpc\\.beeps|xmlrpc\\.beep|xmpp|z39\\.50r|z39\\.50s)";
var UNOFFICIAL_SCHEME = "(about|addbook|afp|aim|applescript|bcp|bk|btspp|callto|castanet|cdv|chrome|chttp|cvs|daytime|device|doi|ed2k|eid|enp|feed|finger|fish|freenet|gg|gizmoproject|gsiftp|gsm-sms|h324|hdl|hnews|httpsy|iioploc|ilu|IOR|ircs|irc|itms|jar|javascript|jdbc|klik|kn|lastfm|ldaps|lifn|livescript|lrq|magnet|mailbox|man|md5|mms|mocha|moz-abmdbdirectory|msnim|myim|notes|nsfw|oai|pcast|phone|php|pop3|printer|psyc|pyimp|rdar|res|rsync|rvp|rwhois|rx|sdp|secondlife|sftp|skype|smb|sms|snews|soap\\.udp|soldat|ssh|steam|SubEthaEdit|svn\\+ssh|svn|t120|tann|tcp|telephone|txmt|uddi|unreal|ut2004|uuid|videotex|view-source|wcap|webcal|whodp|whois\\+\\+|whois|wpn|wtai|xeerkat|xfire|ymsgr)";
var SCHEME = "(" + OFFICIAL_SCHEME + "|" + UNOFFICIAL_SCHEME + "):";
var IP_LITERAL = "(\\[((([a-f\\d]{1,4}:){6}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(::([a-f\\d]{1,4}:){5}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(([a-f\\d]{1,4})?::([a-f\\d]{1,4}:){4}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|((([a-f\\d]{1,4}:)?[a-f\\d]{1,4})?::([a-f\\d]{1,4}:){3}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(((([a-f\\d]{1,4}:){1,2})?[a-f\\d]{1,4})?::([a-f\\d]{1,4}:){2}([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(((([a-f\\d]{1,4}:){1,3})?[a-f\\d]{1,4})?::([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(((([a-f\\d]{1,4}:){1,4})?[a-f\\d]{1,4})?::([a-f\\d]{1,4}:[a-f\\d]{1,4})|((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])))|(((([a-f\\d]{1,4}:){1,5})?[a-f\\d]{1,4})?::[a-f\\d]{1,4})|(((([a-f\\d]{1,4}:){1,6})?[a-f\\d]{1,4})?::))\\])";
var IPV4ADDRESS = "((([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5]))";
var IP = "(" + IPV4ADDRESS + "|" + IP_LITERAL + ")";
var HIER_PART = "(((\\/\\/)?((([\\w-.~!$&'()*+,;=:]|%[a-f\\d]{2})*@)?(" + IP + "|([\\w-.~!$&'()*+,;=]|%[a-f\\d]{2})*)(:\\d+)?))([\\w-.~!$&'()*+,;=:@/]|%[a-f\\d]{2})*)";
var QUERY_FRAGMENT = "([&?]([\\w-.~!$&'()*+,;=:@/?]|%[a-f\\d]{2})*)?(#([\\w-.~!$&'()*+,;=:@/?]|%[a-f\\d]{2})*)?";
var URI1 = "(" + SCHEME + HIER_PART + QUERY_FRAGMENT + ")";

/*
 * URI - NO SCHEME, SPECIFIC REG-NAME AND TOP-LEVEL DOMAIN
 */
var AUTHORITY = "([a-z\\d]([\\w-.~!$&*+,=:]|%[a-f\\d]{2})*@)?";
var REG_NAME = "([a-z\\d]([\\w-~!$&*+,=@]|%[a-f\\d]{2})+\\.)+";
var TLD = "(ac|ad|aero|ae|af|ag|ai|al|am|an|ao|aq|arpa|ar|asia|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|biz|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|cat|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|coop|com|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|info|int|in|io|iq|ir|is|it|je|jm|jobs|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mobi|mo|mp|mq|mr|ms|mt|museum|mu|mv|mw|mx|my|mz|name|na|nc|net|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pro|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tp|travel|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xn--0zwm56d|xn--11b5bs3a9aj6g|xn--80akhbyknj4f|xn--9t4b11yi5a|xn--deba0ad|xn--g6w251d|xn--hgbk6aj7f53bba|xn--hlcj6aya9esc7a|xn--jxalpdlp|xn--kgbechtv|xn--zckzah|ye|yt|yu|za|zm|zw)";
var PATH = "([;/]([\\w-.~!$&'()*+,;=:@/]|%[a-f\\d]{2})*)?";
var URI2 = "(" + AUTHORITY + "(" + IP + "|(" + REG_NAME + TLD + "\\b))(:\\d+)?" + PATH + QUERY_FRAGMENT + ")";

/*
 * TELEPHONE
 */
var TEL = "((\\+[-.()\\d]*\\d[-.()\\d]*((;[a-z\\d-]+(=([\\w\\[\\]/:&+$-.!~*'()]|%[a-f\\d]{2})+)?)|(;ext=[-.()\\d]+)|(;isub=([\\w;/?:@&=+$,-.!~*'()]|%[a-f\\d]{2})+))*)|([a-f\\d*#-.()]*[a-f\\d*#][a-f\\d*#-.()]*((;[a-z\\d-]+(=(\\w[\\[\\]/:&+$-.!~*'()]|%[a-f\\d]{2})+)?)|(;ext=[-.()\\d]+)|(;isub=([\\w;/?:@&=+$,-.!~*'()]|%[a-f\\d]{2})+))*;phone-context=((([a-z\\d]|([a-z\\d][a-z\\d-]*[a-z\\d]\\.))*([a-z]|([a-z][a-z\\d-]*[a-z\\d]\\.?)))|(\\+[-.()\\d]*\\d[-.()\\d]*))((;[a-z\\d-]+(=([\\w\\[\\]/:&+$-.!~*'()]|%[a-f\\d]{2})+)?)|(;ext=[-.()\\d]+)|(;isub=([\\w;/?:@&=+$,-.!~*'()]|%[a-f\\d]{2})+))*))";
var telRegExp = new RegExp("^" + TEL + "$", "i");

/*
 * URI REGULAR EXPRESSION
 */
var uriRegExp = new RegExp(URI1 + "|" + URI2 + "|" + TEL, "i");

/*
 * UNWANTED REGULAR EXPRESSION
 */
var unwantedRegExp = new RegExp("^((" + SCHEME + "?(\\/*([-.~!$&'()*+,;=:\\d]{1,3})?))|(\\+[-.()\\d]{1,2}\\D[-.()\\d]{1,2}[-.()]*)|(\\[?(\\d+\\.){3}\\d+(\\/+\\d+)?\\]?))$", "i"); // SCHEME-ONLY WITH SOME SEPECIAL SYMBOLS OR SOME (SMALL) PHONENUMBER OR IP-ONLY WITH OPTIONAL DIGIT PATH

/*
 * MAILTO REGULAR EXPRESSION
 */
var MAILTO = "((([\\w-.~]|%[a-f\\d]{2})+@([\\w-.~,]|%[a-f\\d]{2})+)*([&?]([\\w-.~=@]|%[a-f\\d]{2})*)*)";
var mailtoRegExp = new RegExp("^" + MAILTO + "$", "i");

/*
 * SCHEME REGULAR EXPRESSION
 */
var schemeRegExp = new RegExp("^" + SCHEME, "i");

var removeUnwanted = function(text)
{
    if (/[\-~=_,;:!?.'()\[@$*&#+]/.test(text.charAt(text.length - 1)))
    {
        return removeUnwanted(text.substring(0, text.length - 1));
    }
    var index = text.search(/&lt;/); // <
    if (index > -1)
    {
        return removeUnwanted(text.substring(0, index));
    }
    return text;
};

// MAXIMUM LENGTH OF LEFT STRING
// "&amp;laquo;".length = 11
var MAX_LEFT_STR = 11;
var fixBalanced = function(text, leftStr)
{
    var index = -1;
    switch (leftStr.charAt(leftStr.length - 1))
    {
        case "`": index = text.indexOf("'"); break; // `  '
        case "'": index = text.indexOf("'"); break; // '  '
        case "(": index = text.indexOf(")"); break; // (  )
        case "[": index = text.indexOf("]"); break; // [  ]
    }
    if (index > -1)
    {
        return text.substring(0, index);
    }
    leftStr = leftStr.substring(leftStr.length - MAX_LEFT_STR);
    if (/&lt;$/.test(leftStr)) { index = text.indexOf("&gt;"); }                        // <  >
    else { if (/&amp;lt;$/.test(leftStr)) { index = text.indexOf("&amp;gt;"); }         // <  >
    else { if (/&amp;#60;$/.test(leftStr)) { index = text.indexOf("&amp;#62;"); }       // <  >
    else { if (/&amp;quot;$/.test(leftStr)) { index = text.indexOf("&amp;quot;"); }     // "  "
    else { if (/&amp;#34;$/.test(leftStr)) { index = text.indexOf("&amp;#34;"); }       // "  "
    else { if (/&amp;#96;$/.test(leftStr)) { index = text.indexOf("'"); }               // `  '
    else { if (/&amp;laquo;$/.test(leftStr)) { index = text.indexOf("&amp;raquo;"); }   // «  »
    else { if (/&amp;#171;$/.test(leftStr)) { index = text.indexOf("&amp;#187;"); }     // «  »
    }}}}}}}
    if (index > -1)
    {
        return text.substring(0, index);
    }
    return text;
};

var textToLink = function(nodeValue)
{
    var changesMade = false;
    nodeValue = nodeValue.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    var matches = null;
    var text = null;
    var index = null;
    var leftStr = null;
    var link = null;
    var anchor = null;
    var fromIndex = 0;
    while ((matches = nodeValue.substring(fromIndex).match(uriRegExp)) !== null)
    {
        text = matches[0];
        index = nodeValue.indexOf(text, fromIndex);
        leftStr = nodeValue.substring(0, index);
        text = fixBalanced(text, leftStr);
        text = removeUnwanted(text);
        fromIndex = index + text.length;
        if (/^([äåæöøü]|\.\w)/i.test(nodeValue.substring(fromIndex, fromIndex + 2)) || unwantedRegExp.test(text))
        {
            continue;
        }

        link = nodeValue.substring(index, index + text.length);
        if (!schemeRegExp.test(link))
        {
            if (mailtoRegExp.test(link)) { link = "mailto:" + link; }
            else { if (telRegExp.test(link)) { link = "tel:" + link; }
            else { link = "http://" + link; }
            }
        }

        anchor = "<a href=\"" + link + "\">" + text + "</a>";
        nodeValue = leftStr + anchor + nodeValue.substring(fromIndex);
        fromIndex = index + anchor.length;
        changesMade = true;
    }

    if (!changesMade)
    {
        return null;
    }
    else
    {
        return nodeValue;
    }
};

var main = function()
{
    document.normalize();
    var elements = null;
    var element = null;
    var nodeValue = null;
    switch (document.contentType)
    {
        case "text/html":
        case "application/xhtml+xml":
            elements = document.evaluate(".//text()[not(ancestor::a) and not(ancestor::button) and not(ancestor::label) and not(ancestor::legend) and not(ancestor::option) and not(ancestor::script) and not(ancestor::select) and not(ancestor::style) and not(ancestor::textarea) and not(ancestor::title)]", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            if (!elements || elements.snapshotLength === 0)
            {
                return;
            }

            var span = null;
            for (var i = 0; i < elements.snapshotLength; i++)
            {
                element = elements.snapshotItem(i);
                nodeValue = textToLink(element.nodeValue);
                if (!nodeValue)
                {
                    continue;
                }

                span = document.createElement("span");
                span.innerHTML = nodeValue;
                element.parentNode.replaceChild(span, element);
            }
            break;

        case "text/plain":
            elements = document.evaluate(".//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            if (!elements || elements.snapshotLength === 0)
            {
                return;
            }

            nodeValue = textToLink(elements.snapshotItem(0).nodeValue);
            if (!nodeValue)
            {
                return;
            }

            document.body.innerHTML = "<html><body><pre id=\"text-to-link-userscript\">" + nodeValue + "</pre></body></html>";
            break;
    }
};

main();

}