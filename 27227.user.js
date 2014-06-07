// ==UserScript==
// @name          Better Orkut By Swarnava/Heaven GOD
// @author        Swarnava/Heaven GOD
// @namespace     System
// @license       GPL: http://www.gnu.org/copyleft/gpl.html
// @copyright	  Heaven GOD & Azeem
// @version       5.2.17
// @description   Its A Orkut Quote For Html Disable Community..also work on html enable....
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
// @attribution http://userscripts.org/users/z33m (http://userscripts.org/scripts/show/33882)
// ==/UserScript==
script_version = '5.2.17';
userscripts_id = 27227;

/*
 * @Start Text to Link
*/

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

            document.open();
            document.write("<html><body><pre id=\"text-to-link-userscript\">" + nodeValue + "</pre></body></html>");
            document.close();
            break;
    }
};

main();

}

/*
 * @End Text to Link
*/

// Start Virtual Keyboard

/* ********************************************************************
 * HTML Virtual Keyboard Interface User Javascript - v1.30
 *   Copyright (c) 2009 - GreyWyvern
 *
 *  - Licenced for free distribution under the BSDL
 *          http://www.opensource.org/licenses/bsd-license.php
 * ********************************************************************
*/

window.addEventListener('load', function() {
  function VKI_buildKeyboardInputsUserScript() {
    var self = this;

    this.VKI_version = "2.20.63";
    this.VKI_showVersion = true;
    this.VKI_target = this.VKI_visible = false;
    this.VKI_shift = this.VKI_shiftlock = false;
    this.VKI_altgr = this.VKI_altgrlock = false;
    this.VKI_dead = false;
    this.VKI_deadkeysOn = false;
    this.VKI_kt = "US Int'l";  // Default keyboard layout
    this.VKI_clearPasswords = false;  // Clear password fields on focus
    this.VKI_imageURI = "keyboard.png";
    this.VKI_clickless = 0;  // 0 = disabled, > 0 = delay in ms
    this.VKI_keyCenter = 3;

    this.VKI_isIE = /*@cc_on!@*/false;
    this.VKI_isIE6 = /*@if(@_jscript_version == 5.6)!@end@*/false;
    this.VKI_isIElt8 = /*@if(@_jscript_version < 5.8)!@end@*/false;
    this.VKI_isMoz = (navigator.product == "Gecko");
    this.VKI_isWebKit = RegExp("KHTML").test(navigator.userAgent);


    /* ***** Create keyboards ************************************** */
    this.VKI_layout = {};

this.VKI_layout.Albanian = [ // Albanian Standard Keyboard
  [["\\", "|"], ["1", "!", "~"], ["2", '"', "\u02C7"], ["3", "#", "^"], ["4", "$", "\u02D8"], ["5", "%", "\u00B0"], ["6", "^", "\u02DB"], ["7", "&", "`"], ["8", "*", "\u02D9"], ["9", "(", "\u00B4"], ["0", ")", "\u02DD"], ["-", "_", "\u00A8"], ["=", "+", "\u00B8"], ["Bksp", "Bksp"]],
  [["Tab", "Tab"], ["q", "Q", "\\"], ["w", "W", "|"], ["e", "E"], ["r", "R"], ["t", "T"], ["z", "Z"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00E7", "\u00C7", "\u00F7"], ["@", "'", "\u00D7"], ["Enter", "Enter"]],
  [["Caps", "Caps"], ["a", "A"], ["s", "S", "\u0111"], ["d", "D", "\u0110"], ["f", "F", "["], ["g", "G", "]"], ["h", "H"], ["j", "J"], ["k", "K", "\u0142"], ["l", "L", "\u0141"], ["\u00EB", "\u00CB", "$"], ["[", "{", "\u00DF"], ["]", "}", "\u00A4"]],
  [["Shift", "Shift"], ["<", ">"], ["y", "Y"], ["x", "X"], ["c", "C"], ["v", "V", "@"], ["b", "B", "{"], ["n", "N", "}"], ["m", "M", "\u00A7"], [",", ";", "<"], [".", ":", ">"], ["/", "?"], ["Shift", "Shift"]],
  [["Alt", "Alt"], [" ", " ", " ", " "], ["AltGr", "AltGr"]]
];

    this.VKI_layout.Arabic = [ // Arabic Keyboard
      [["\u0630", "\u0651 "], ["1", "!", "\u00a1", "\u00b9"], ["2", "@", "\u00b2"], ["3", "#", "\u00b3"], ["4", "$", "\u00a4", "\u00a3"], ["5", "%", "\u20ac"], ["6", "^", "\u00bc"], ["7", "&", "\u00bd"], ["8", "*", "\u00be"], ["9", "(", "\u2018"], ["0", ")", "\u2019"], ["-", "_", "\u00a5"], ["=", "+", "\u00d7", "\u00f7"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0636", "\u064e"], ["\u0635", "\u064b"], ["\u062b", "\u064f"], ["\u0642", "\u064c"], ["\u0641", "\u0644"], ["\u063a", "\u0625"], ["\u0639", "\u2018"], ["\u0647", "\u00f7"], ["\u062e", "\u00d7"], ["\u062d", "\u061b"], ["\u062c", "\u003c"], ["\u062f", "\u003e"], ["\u005c", "\u007c"]],
      [["Caps", "Caps"], ["\u0634", "\u0650"], ["\u0633", "\u064d"], ["\u064a", "\u005d"], ["\u0628", "\u005b"], ["\u0644", "\u0644"], ["\u0627", "\u0623"], ["\u062a", "\u0640"], ["\u0646", "\u060c"], ["\u0645", "\u002f"], ["\u0643", "\u003a"], ["\u0637", "\u0022"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u0626", "\u007e"], ["\u0621", "\u0652"], ["\u0624", "\u007d"], ["\u0631", "\u007b"], ["\u0644", "\u0644"], ["\u0649", "\u0622"], ["\u0629", "\u2019"], ["\u0648", "\u002c"], ["\u0632", "\u002e"], ["\u0638", "\u061f"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["Alt", "Alt"]]
    ];

    this.VKI_layout["Armenian Eastern"] = [ // Armenian Eastern Standard Keyboard
  [["\u055D", "\u055C"], [":", "1"], ["\u0571", "\u0541"], ["\u0575", "\u0545"], ["\u055B", "3"], [",", "4"], ["-", "9"], [".", "\u0587"], ["\u00ab", "("], ["\u00BB", ")"], ["\u0585", "\u0555"], ["\u057C", "\u054C"], ["\u056A", "\u053A"], ["Bksp", "Bksp"]],
  [["Tab", "Tab"], ["\u056D", "\u053D"], ["\u0582", "\u0552"], ["\u0567", "\u0537"], ["\u0580", "\u0550"], ["\u057F", "\u054F"], ["\u0565", "\u0535"], ["\u0568", "\u0538"], ["\u056B", "\u053B"], ["\u0578", "\u0548"], ["\u057A", "\u054A"], ["\u0579", "\u0549"], ["\u057B", "\u054B"], ["'", "\u055E"]],
  [["Caps", "Caps"], ["\u0561", "\u0531"], ["\u057D", "\u054D"], ["\u0564", "\u0534"], ["\u0586", "\u0556"], ["\u0584", "\u0554"], ["\u0570", "\u0540"], ["\u0573", "\u0543"], ["\u056F", "\u053F"], ["\u056C", "\u053C"], ["\u0569", "\u0539"], ["\u0583", "\u0553"], ["Enter", "Enter"]],
  [["Shift", "Shift"], ["\u0566", "\u0536"], ["\u0581", "\u0551"], ["\u0563", "\u0533"], ["\u057E", "\u054E"], ["\u0562", "\u0532"], ["\u0576", "\u0546"], ["\u0574", "\u0544"], ["\u0577", "\u0547"], ["\u0572", "\u0542"], ["\u056E", "\u053E"], ["Shift", "Shift"]],
  [["Alt", "Alt"], [" ", " "], ["Alt", "Alt"]]
];

    this.VKI_layout["Armenian Western"] = [ // Armenian Western Standard Keyboard
  [["\u055D", "\u055C"], [":", "1"], ["\u0571", "\u0541"], ["\u0575", "\u0545"], ["\u055B", "3"], [",", "4"], ["-", "9"], [".", "\u0587"], ["\u00AB", "("], ["\u00BB", ")"], ["\u0585", "\u0555"], ["\u057C", "\u054C"], ["\u056A", "\u053A"], ["Bksp", "Bksp"]],
  [["Tab", "Tab"], ["\u056D", "\u053D"], ["\u057E", "\u054E"], ["\u0567", "\u0537"], ["\u0580", "\u0550"], ["\u0564", "\u0534"], ["\u0565", "\u0535"], ["\u0568", "\u0538"], ["\u056B", "\u053B"], ["\u0578", "\u0548"], ["\u0562", "\u0532"], ["\u0579", "\u0549"], ["\u057B", "\u054B"], ["'", "\u055E"]],
  [["Caps", "Caps"], ["\u0561", "\u0531"], ["\u057D", "\u054D"], ["\u057F", "\u054F"], ["\u0586", "\u0556"], ["\u056F", "\u053F"], ["\u0570", "\u0540"], ["\u0573", "\u0543"], ["\u0584", "\u0554"], ["\u056C", "\u053C"], ["\u0569", "\u0539"], ["\u0583", "\u0553"], ["Enter", "Enter"]],
  [["Shift", "Shift"], ["\u0566", "\u0536"], ["\u0581", "\u0551"], ["\u0563", "\u0533"], ["\u0582", "\u0552"], ["\u057A", "\u054A"], ["\u0576", "\u0546"], ["\u0574", "\u0544"], ["\u0577", "\u0547"], ["\u0572", "\u0542"], ["\u056E", "\u053E"], ["Shift", "Shift"]],
  [["Alt", "Alt"], [" ", " "], ["Alt", "Alt"]]
];

    this.VKI_layout.Belarusian = [ // Belarusian Standard Keyboard
      [["\u0451", "\u0401"], ["1", "!"], ["2", '"'], ["3", "\u2116"], ["4", ";"], ["5", "%"], ["6", ":"], ["7", "?"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0439", "\u0419"], ["\u0446", "\u0426"], ["\u0443", "\u0423"], ["\u043a", "\u041a"], ["\u0435", "\u0415"], ["\u043d", "\u041d"], ["\u0433", "\u0413"], ["\u0448", "\u0428"], ["\u045e", "\u040e"], ["\u0437", "\u0417"], ["\u0445", "\u0425"], ["'", "'"], ["\\", "/"]],
      [["Caps", "Caps"], ["\u0444", "\u0424"], ["\u044b", "\u042b"], ["\u0432", "\u0412"], ["\u0430", "\u0410"], ["\u043f", "\u041f"], ["\u0440", "\u0420"], ["\u043e", "\u041e"], ["\u043b", "\u041b"], ["\u0434", "\u0414"], ["\u0436", "\u0416"], ["\u044d", "\u042d"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["/", "|"], ["\u044f", "\u042f"], ["\u0447", "\u0427"], ["\u0441", "\u0421"], ["\u043c", "\u041c"], ["\u0456", "\u0406"], ["\u0442", "\u0422"], ["\u044c", "\u042c"], ["\u0431", "\u0411"], ["\u044e", "\u042e"], [".", ","], ["Shift", "Shift"]],
      [[" ", " "]]
    ];

    this.VKI_layout.Belgian = [ // Belgian Standard Keyboard
      [["\u00b2", "\u00b3"], ["&", "1", "|"], ["\u00e9", "2", "@"], ['"', "3", "#"], ["'", "4"], ["(", "5"], ["\u00a7", "6", "^"], ["\u00e8", "7"], ["!", "8"], ["\u00e7", "9", "{"], ["\u00e0", "0", "}"], [")", "\u00b0"], ["-", "_"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["a", "A"], ["z", "Z"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u005e", "\u00a8", "["], ["$", "*", "]"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["q", "Q"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["m", "M"], ["\u00f9", "%", "\u00b4"], ["\u03bc", "\u00a3", "`"]],
      [["Shift", "Shift"], ["<", ">", "\\"], ["w", "W"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], [",", "?"], [";", "."], [":", "/"], ["=", "+", "~"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ];

    this.VKI_layout.Bengali = [ // Bengali Standard Keyboard
      [[""], ["1", "", "\u09E7"], ["2", "", "\u09E8"], ["3", "\u09CD\u09B0", "\u09E9"], ["4", "\u09B0\u09CD", "\u09EA"], ["5", "\u099C\u09CD\u09B0", "\u09EB"], ["6", "\u09A4\u09CD\u09B7", "\u09EC"], ["7", "\u0995\u09CD\u09B0", "\u09ED"], ["8", "\u09B6\u09CD\u09B0", "\u09EE"], ["9", "(", "\u09EF"], ["0", ")", "\u09E6"], ["-", "\u0983"], ["\u09C3", "\u098B", "\u09E2", "\u09E0"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u09CC", "\u0994", "\u09D7"], ["\u09C8", "\u0990"], ["\u09BE", "\u0986"], ["\u09C0", "\u0988", "\u09E3", "\u09E1"], ["\u09C2", "\u098A"], ["\u09AC", "\u09AD"], ["\u09B9", "\u0999"], ["\u0997", "\u0998"], ["\u09A6", "\u09A7"], ["\u099C", "\u099D"], ["\u09A1", "\u09A2", "\u09DC", "\u09DD"], ["\u09BC", "\u099E"]],
      [["Caps", "Caps"], ["\u09CB", "\u0993", "\u09F4", "\u09F5"], ["\u09C7", "\u098F", "\u09F6", "\u09F7"], ["\u09CD", "\u0985", "\u09F8", "\u09F9"], ["\u09BF", "\u0987", "\u09E2", "\u098C"], ["\u09C1", "\u0989"], ["\u09AA", "\u09AB"], ["\u09B0", "", "\u09F0", "\u09F1"], ["\u0995", "\u0996"], ["\u09A4", "\u09A5"], ["\u099A", "\u099B"], ["\u099F", "\u09A0"], ["Enter", "Enter"]],
      [["Shift", "Shift"], [""], ["\u0982", "\u0981", "\u09FA"], ["\u09AE", "\u09A3"], ["\u09A8"], ["\u09AC"], ["\u09B2"], ["\u09B8", "\u09B6"], [",", "\u09B7"], [".", "{"], ["\u09AF", "\u09DF"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ];

    this.VKI_layout['Bulgarian Ph'] = [ // Bulgarian Phonetic Keyboard
      [["\u0447", "\u0427"], ["1", "!"], ["2", "@"], ["3", "#"], ["4", "$"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u044F", "\u042F"], ["\u0432", "\u0412"], ["\u0435", "\u0415"], ["\u0440", "\u0420"], ["\u0442", "\u0422"], ["\u044A", "\u042A"], ["\u0443", "\u0423"], ["\u0438", "\u0418"], ["\u043E", "\u041E"], ["\u043F", "\u041F"], ["\u0448", "\u0428"], ["\u0449", "\u0429"], ["\u044E", "\u042E"]],
      [["Caps", "Caps"], ["\u0430", "\u0410"], ["\u0441", "\u0421"], ["\u0434", "\u0414"], ["\u0444", "\u0424"], ["\u0433", "\u0413"], ["\u0445", "\u0425"], ["\u0439", "\u0419"], ["\u043A", "\u041A"], ["\u043B", "\u041B"], [";", ":"], ["'", '"'], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u0437", "\u0417"], ["\u044C", "\u042C"], ["\u0446", "\u0426"], ["\u0436", "\u0416"], ["\u0431", "\u0411"], ["\u043D", "\u041D"], ["\u043C", "\u041C"], [",", "<"], [".", ">"], ["/", "?"], ["Shift", "Shift"]],
      [[" ", " "]]
    ];

    this.VKI_layout.Burmese = [ // Burmese Keyboard
      [["\u1039`", "~"], ["\u1041", "\u100D"], ["\u1042", "\u100E"], ["\u1043", "\u100B"], ["\u1044", "\u1000\u103B\u1015\u103A"], ["\u1045", "%"], ["\u1046", "\u002F"], ["\u1047", "\u101B"], ["\u1048", "\u1002"], ["\u1049", "("], ["\u1040", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u1006", "\u1029"], ["\u1010", "\u1040"], ["\u1014", "\u103F"], ["\u1019", "\u1023"], ["\u1021", "\u1024"], ["\u1015", "\u104C"], ["\u1000", "\u1009"], ["\u1004", "\u104D"], ["\u101E", "\u1025"], ["\u1005", "\u100F"], ["\u101F", "\u1027"], ["\u2018", "\u2019"], ["\u104F", "\u100B\u1039\u100C"]],
      [["Caps", "Caps"], ["\u200B\u1031", "\u1017"], ["\u200B\u103B", "\u200B\u103E"], ["\u200B\u102D", "\u200B\u102E"], ["\u200B\u103A","\u1004\u103A\u1039\u200B"], ["\u200B\u102B", "\u200B\u103D"], ["\u200B\u1037", "\u200B\u1036"], ["\u200B\u103C", "\u200B\u1032"], ["\u200B\u102F", "\u200B\u102F"], ["\u200B\u1030", "\u200B\u1030"], ["\u200B\u1038", "\u200B\u102B\u103A"], ["\u1012", "\u1013"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u1016", "\u1007"], ["\u1011", "\u100C"], ["\u1001", "\u1003"], ["\u101C", "\u1020"], ["\u1018", "\u1026"], ["\u100A", "\u1008"], ["\u200B\u102C", "\u102A"], ["\u101A", "\u101B"], ["\u002E", "\u101B"], ["\u104B", "\u104A"], ["Shift", "Shift"]],
      [[" ", " "]]
    ];

    this.VKI_layout.Czech = [ // Czech Keyboard
     [[";", "\u00b0", "`", "~"], ["+", "1", "!"], ["\u011B", "2", "@"], ["\u0161", "3", "#"], ["\u010D", "4", "$"], ["\u0159", "5", "%"], ["\u017E", "6", "^"], ["\u00FD", "7", "&"], ["\u00E1", "8", "*"], ["\u00ED", "9", "("], ["\u00E9", "0", ")"], ["=", "%", "-", "_"], ["\u00B4", "\u02c7", "=", "+"], ["Bksp", "Bksp"]],
     [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20AC"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00FA", "/", "[", "{"], [")", "(", "]", "}"], ["Enter", "Enter"]],
     [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u016F", '"', ";", ":"], ["\u00A7", "!", "\u00a4", "^"], ["\u00A8", "'", "\\", "|"]],
     [["Shift", "Shift"], ["\\", "|", "", "\u02dd"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", "?", "<", "\u00d7"], [".", ":", ">", "\u00f7"], ["-", "_", "/", "?"], ["Shift", "Shift"]],
     [[" ", " ", " ", " "], ["Alt", "Alt"]]
    ];

    this.VKI_layout.Croatian = [ // Croatian Standard Keyboard
  [["\u00B8", "\u00A8"], ["1", "!", "~"], ["2", '"', "\u02C7"], ["3", "#", "^"], ["4", "$", "\u02D8"], ["5", "%", "\u00B0"], ["6", "&", "\u02DB"], ["7", "/", "`"], ["8", "(", "\u02D9"], ["9", ")", "\u00B4"], ["0", "=", "\u02DD"], ["'", "?", "\u00A8"], ["+", "*", "\u00B8"], ["Bksp", "Bksp"]],
  [["Tab", "Tab"], ["q", "Q", "\\"], ["w", "W", "|"], ["e", "E", "\u20AC"], ["r", "R"], ["t", "T"], ["z", "Z"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u0161", "\u0160", "\u00F7"], ["\u0111", "\u0110", "\u00D7"], ["Enter", "Enter"]],
  [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F", "["], ["g", "G", "]"], ["h", "H"], ["j", "J"], ["k", "K", "\u0142"], ["l", "L", "\u0141"], ["\u010D", "\u010C"], ["\u0107", "\u0106", "\u00DF"], ["\u017E", "\u017D", "\u00A4"]],
  [["Shift", "Shift"], ["<", ">"], ["y", "Y"], ["x", "X"], ["c", "C"], ["v", "V", "@"], ["b", "B", "{"], ["n", "N", "}"], ["m", "M", "\u00A7"], [",", ";", "<"], [".", ":", ">"], ["-", "_"], ["Shift", "Shift"]],
  [["Alt", "Alt"], [" ", " ", " ", " "], ["AltGr", "AltGr"]]
];

    this.VKI_layout.Danish = [ // Danish Standard Keyboard
      [["\u00bd", "\u00a7"], ["1", "!"], ["2", '"', "@"], ["3", "#", "\u00a3"], ["4", "\u00a4", "$"], ["5", "%", "\u20ac"], ["6", "&"], ["7", "/", "{"], ["8", "(", "["], ["9", ")", "]"], ["0", "=", "}"], ["+", "?"], ["\u00b4", "`", "|"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00e5", "\u00c5"], ["\u00a8", "^", "~"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00e6", "\u00c6"], ["\u00f8", "\u00d8"], ["'", "*"]],
      [["Shift", "Shift"], ["<", ">", "\\"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M", "\u03bc", "\u039c"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ];

    this.VKI_layout.Dutch = [ // Dutch Standard Keyboard
      [["@", "\u00a7", "\u00ac"], ["1", "!", "\u00b9"], ["2", '"', "\u00b2"], ["3", "#", "\u00b3"], ["4", "$", "\u00bc"], ["5", "%", "\u00bd"], ["6", "&", "\u00be"], ["7", "_", "\u00a3"], ["8", "(", "{"], ["9", ")", "}"], ["0", "'"], ["/", "?", "\\"], ["\u00b0", "~", "\u00b8"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20ac"], ["r", "R", "\u00b6"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00a8", "^"], ["*", "|"], ["<", ">"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S", "\u00df"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["+", "\u00b1"], ["\u00b4", "\u0060"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["]", "[", "\u00a6"], ["z", "Z", "\u00ab"], ["x", "X", "\u00bb"], ["c", "C", "\u00a2"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M", "\u00b5"], [",", ";"], [".", ":", "\u00b7"], ["-", "="], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ];

    this.VKI_layout.Dvorak = [ // Dvorak Keyboard
      [["`", "~"], ["1", "!"], ["2", "@"], ["3", "#"], ["4", "$"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["[", "{"], ["]", "}"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"],["'", '"'], [",", "<"], [".", ">"], ["p", "P"], ["y", "Y"], ["f", "F"], ["g", "G"], ["c", "C"], ["r", "R"], ["l", "L"], ["/", "?"], ["=", "+"], ["\\", "|"]],
      [["Caps", "Caps"], ["a", "A"], ["o", "O"], ["e", "E"], ["u", "U"], ["i", "I"], ["d", "D"], ["h", "H"], ["t", "T"], ["n", "N"], ["s", "S"], ["-", "_"], ["Enter", "Enter"]],
      [["Shift", "Shift"], [";", ":"], ["q", "Q"], ["j", "J"], ["k", "K"], ["x", "X"], ["b", "B"], ["m", "M"], ["w", "W"], ["v", "V"], ["z", "Z"], ["Shift", "Shift"]],
      [[" ", " "]]
    ];

    this.VKI_layout.Estonian = [ // Estonian Standard Keyboard
  [["\u02C7", "~"], ["1", "!"], ["2", '"', "@", "@"], ["3", "#", "\u00A3", "\u00A3"], ["4", "\u00A4", "$", "$"], ["5", "%", "\u20AC"], ["6", "&"], ["7", "/", "{", "{"], ["8", "(", "[", "["], ["9", ")", "]", "]"], ["0", "=", "}", "}"], ["+", "?", "\\", "\\"], ["\u00B4", "`"], ["Bksp", "Bksp"]],
  [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20AC"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00FC", "\u00DC"], ["\u00F5", "\u00D5", "\u00A7", "\u00A7"], ["Enter", "Enter"]],
  [["Caps", "Caps"], ["a", "A"], ["s", "S", "\u0161", "\u0160"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00F6", "\u00D6"], ["\u00E4", "\u00C4", "^", "^"], ["'", "*", "\u00BD", "\u00BD"]],
  [["Shift", "Shift"], ["<", ">", "|", "|"], ["z", "Z", "\u017E", "\u017D"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]],
  [["Alt", "Alt"], [" ", " ", " ", " "], ["AltGr", "AltGr"]]
];

    this.VKI_layout.Farsi = [ // Farsi Keyboard
      [["\u067e", "\u0651 "], ["1", "!", "\u00a1", "\u00b9"], ["2", "@", "\u00b2"], ["3", "#", "\u00b3"], ["4", "$", "\u00a4", "\u00a3"], ["5", "%", "\u20ac"], ["6", "^", "\u00bc"], ["7", "&", "\u00bd"], ["8", "*", "\u00be"], ["9", "(", "\u2018"], ["0", ")", "\u2019"], ["-", "_", "\u00a5"], ["=", "+", "\u00d7", "\u00f7"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0636", "\u064e"], ["\u0635", "\u064b"], ["\u062b", "\u064f"], ["\u0642", "\u064c"], ["\u0641", "\u0644"], ["\u063a", "\u0625"], ["\u0639", "\u2018"], ["\u0647", "\u00f7"], ["\u062e", "\u00d7"], ["\u062d", "\u061b"], ["\u062c", "\u003c"], ["\u0686", "\u003e"], ["\u0698", "\u007c"]],
      [["Caps", "Caps"], ["\u0634", "\u0650"], ["\u0633", "\u064d"], ["\u064a", "\u005d"], ["\u0628", "\u005b"], ["\u0644", "\u0644"], ["\u0627", "\u0623"], ["\u062a", "\u0640"], ["\u0646", "\u060c"], ["\u0645", "\u005c"], ["\u06af", "\u003a"], ["\u0643", "\u0022"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u0626", "\u007e"], ["\u0621", "\u0652"], ["\u0632", "\u007d"], ["\u0631", "\u007b"], ["\u0630", "\u0644"], ["\u062f", "\u0622"], ["\u0626", "\u0621"], ["\u0648", "\u002c"], [".", "\u002e"], ["/", "\u061f"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["Alt", "Alt"]]
    ];

    this.VKI_layout.Finnish = [ // Finnish Standard Keyboard
  [["\u00A7", "\u00BD"], ["1", "!"], ["2", '"', "@"], ["3", "#", "\u00A3"], ["4", "\u00A4", "$"], ["5", "%", "\u20AC"], ["6", "&"], ["7", "/", "{"], ["8", "(", "["], ["9", ")", "]"], ["0", "=", "}"], ["+", "?", "\\"], ["\u00B4", "`"], ["Bksp", "Bksp"]],
  [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20AC"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00E5", "\u00C5"], ["\u00A8", "^", "~"], ["Enter", "Enter"]],
  [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00F6", "\u00D6"], ["\u00E4", "\u00C4"], ["'", "*"]],
  [["Shift", "Shift"], ["<", ">", "|"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M", "\u00B5"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]],
  [["Alt", "Alt"], [" ", " ", " ", " "], ["AltGr", "AltGr"]]
];

    this.VKI_layout.French = [ // French Standard Keyboard
      [["\u00b2", "\u00b3"], ["&", "1"], ["\u00e9", "2", "~"], ['"', "3", "#"], ["'", "4", "{"], ["(", "5", "["], ["-", "6", "|"], ["\u00e8", "7", "\u0060"], ["_", "8", "\\"], ["\u00e7", "9", "\u005e"], ["\u00e0", "0", "\u0040"], [")", "\u00b0", "]"], ["=", "+", "}"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["a", "A"], ["z", "Z"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["^", "\u00a8"], ["$", "\u00a3", "\u00a4"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["q", "Q"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["m", "M"], ["\u00f9", "%"], ["*", "\u03bc"]],
      [["Shift", "Shift"], ["<", ">"], ["w", "W"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], [",", "?"], [";", "."], [":", "/"], ["!", "\u00a7"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ];

    this.VKI_layout.German = [ // German Standard Keyboard
      [["\u005e", "\u00b0"], ["1", "!"], ["2", '"', "\u00b2"], ["3", "\u00a7", "\u00b3"], ["4", "$"], ["5", "%"], ["6", "&"], ["7", "/", "{"], ["8", "(", "["], ["9", ")", "]"], ["0", "=", "}"], ["\u00df", "?", "\\"], ["\u00b4", "\u0060"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q", "\u0040"], ["w", "W"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["z", "Z"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00fc", "\u00dc"], ["+", "*", "~"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00f6", "\u00d6"], ["\u00e4", "\u00c4"], ["#", "'"]],
      [["Shift", "Shift"], ["<", ">", "\u00a6"], ["y", "Y"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M", "\u00b5"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ];

    this.VKI_layout.Greek = [ // Greek Standard Keyboard
      [["`", "~"], ["1", "!"], ["2", "@", "\u00b2"], ["3", "#", "\u00b3"], ["4", "$", "\u00a3"], ["5", "%", "\u00a7"], ["6", "^", "\u00b6"], ["7", "&"], ["8", "*", "\u00a4"], ["9", "(", "\u00a6"], ["0", ")", "\u00ba"], ["-", "_", "\u00b1"], ["=", "+", "\u00bd"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], [";", ":"], ["\u03c2", "^"], ["\u03b5", "\u0395"], ["\u03c1", "\u03a1"], ["\u03c4", "\u03a4"], ["\u03c5", "\u03a5"], ["\u03b8", "\u0398"], ["\u03b9", "\u0399"], ["\u03bf", "\u039f"], ["\u03c0", "\u03a0"], ["[", "{", "\u201c"], ["]", "}", "\u201d"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["\u03b1", "\u0391"], ["\u03c3", "\u03a3"], ["\u03b4", "\u0394"], ["\u03c6", "\u03a6"], ["\u03b3", "\u0393"], ["\u03b7", "\u0397"], ["\u03be", "\u039e"], ["\u03ba", "\u039a"], ["\u03bb", "\u039b"], ["\u0384", "\u00a8", "\u0385"], ["'", '"'], ["\\", "|", "\u00ac"]],
      [["Shift", "Shift"], ["<", ">"], ["\u03b6", "\u0396"], ["\u03c7", "\u03a7"], ["\u03c8", "\u03a8"], ["\u03c9", "\u03a9"], ["\u03b2", "\u0392"], ["\u03bd", "\u039d"], ["\u03bc", "\u039c"], [",", "<"], [".", ">"], ["/", "?"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ];

    this.VKI_layout.Gujarati = [ // Gujarati Standard Keyboard
  [[""], ["1", "\u0A8D", "\u0AE7"], ["2", "\u0AC5", "\u0AE8"], ["3", "\u0ACD\u0AB0", "\u0AE9"], ["4", "\u0AB0\u0ACD", "\u0AEA"], ["5", "\u0A9C\u0ACD\u0A9E", "\u0AEB"], ["6", "\u0AA4\u0ACD\u0AB0", "\u0AEC"], ["7", "\u0A95\u0ACD\u0AB7", "\u0AED"], ["8", "\u0AB6\u0ACD\u0AB0", "\u0AEE"], ["9", "(", "\u0AEF"], ["0", ")", "\u0AE6"], ["-", "\u0A83"], ["\u0AC3", "\u0A8B", "\u0AC4", "\u0AE0"], ["Bksp", "Bksp"]],
  [["Tab", "Tab"], ["\u0ACC", "\u0A94"], ["\u0AC8", "\u0A90"], ["\u0ABE", "\u0A86"], ["\u0AC0", "\u0A88"], ["\u0AC2", "\u0A8A"], ["\u0AAC", "\u0AAD"], ["\u0AB9", "\u0A99"], ["\u0A97", "\u0A98"], ["\u0AA6", "\u0AA7"], ["\u0A9C", "\u0A9D"], ["\u0AA1", "\u0AA2"], ["\u0ABC", "\u0A9E"], ["\u0AC9", "\u0A91"]],
  [["Caps", "Caps"], ["\u0ACB", "\u0A93"], ["\u0AC7", "\u0A8F"], ["\u0ACD", "\u0A85"], ["\u0ABF", "\u0A87"], ["\u0AC1", "\u0A89"], ["\u0AAA", "\u0AAB"], ["\u0AB0"], ["\u0A95", "\u0A96"], ["\u0AA4", "\u0AA5"], ["\u0A9A", "\u0A9B"], ["\u0A9F", "\u0AA0"], ["Enter", "Enter"]],
  [["Shift", "Shift"], [""], ["\u0A82", "\u0A81", "", "\u0AD0"], ["\u0AAE", "\u0AA3"], ["\u0AA8"], ["\u0AB5"], ["\u0AB2", "\u0AB3"], ["\u0AB8", "\u0AB6"], [",", "\u0AB7"], [".", "\u0964", "\u0965", "\u0ABD"], ["\u0AAF"], ["Shift", "Shift"]],
  [["Alt", "Alt"], [" ", " ", " ", " "], ["AltGr", "AltGr"]]
];

    this.VKI_layout.Hebrew = [ // Hebrew Standard Keyboard
      [["~", "`"], ["1", "!"], ["2", "@"], ["3", "#"], ["4" , "$", "\u20aa"], ["5" , "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", ")"], ["0", "("], ["-", "_"], ["=", "+"], ["\\", "|"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["/", "Q"], ["'", "W"], ["\u05e7", "E", "\u20ac"], ["\u05e8", "R"], ["\u05d0", "T"], ["\u05d8", "Y"], ["\u05d5", "U", "\u05f0"], ["\u05df", "I"], ["\u05dd", "O"], ["\u05e4", "P"], ["]", "}"], ["[", "{"]],
      [["Caps", "Caps"], ["\u05e9", "A"], ["\u05d3", "S"], ["\u05d2", "D"], ["\u05db", "F"], ["\u05e2", "G"], ["\u05d9", "H", "\u05f2"], ["\u05d7", "J", "\u05f1"], ["\u05dc", "K"], ["\u05da", "L"], ["\u05e3", ":"], ["," , '"'], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\u05d6", "Z"], ["\u05e1", "X"], ["\u05d1", "C"], ["\u05d4", "V"], ["\u05e0", "B"], ["\u05de", "N"], ["\u05e6", "M"], ["\u05ea", ">"], ["\u05e5", "<"], [".", "?"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ];

    this.VKI_layout.Hindi = [ // Hindi Traditional Keyboard
      [["\u200d", "\u200c", "`", "~"], ["1", "\u090D", "\u0967", "!"], ["2", "\u0945", "\u0968", "@"], ["3", "\u094D\u0930", "\u0969", "#"], ["4", "\u0930\u094D", "\u096A", "$"], ["5", "\u091C\u094D\u091E", "\u096B", "%"], ["6", "\u0924\u094D\u0930", "\u096C", "^"], ["7", "\u0915\u094D\u0937", "\u096D", "&"], ["8", "\u0936\u094D\u0930", "\u096E", "*"], ["9", "(", "\u096F", "("], ["0", ")", "\u0966", ")"], ["-", "\u0903", "-", "_"], ["\u0943", "\u090B", "=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u094C", "\u0914"], ["\u0948", "\u0910"], ["\u093E", "\u0906"], ["\u0940", "\u0908"], ["\u0942", "\u090A"], ["\u092C", "\u092D"], ["\u0939", "\u0919"], ["\u0917", "\u0918"], ["\u0926", "\u0927"], ["\u091C", "\u091D"], ["\u0921", "\u0922", "[", "{"], ["\u093C", "\u091E", "]", "}"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["\u094B", "\u0913"], ["\u0947", "\u090F"], ["\u094D", "\u0905"], ["\u093F", "\u0907"], ["\u0941", "\u0909"], ["\u092A", "\u092B"], ["\u0930", "\u0931"], ["\u0915", "\u0916"], ["\u0924", "\u0925"], ["\u091A", "\u091B", ";", ":"], ["\u091F", "\u0920", "'", '"'], ["\u0949", "\u0911", "\\", "|"]],
      [["Shift", "Shift"], [""], ["\u0902", "\u0901", "", "\u0950"], ["\u092E", "\u0923"], ["\u0928"], ["\u0935"], ["\u0932", "\u0933"], ["\u0938", "\u0936"], [",", "\u0937", ",", "<"], [".", "\u0964", ".", ">"], ["\u092F", "\u095F", "/", "?"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ];

    this.VKI_layout.Hungarian = [ // Hungarian Standard Keyboard
      [["0", "\u00a7"], ["1", "'", "\u007e"], ["2", '"', "\u02c7"], ["3", "+", "\u02c6"], ["4", "!", "\u02d8"], ["5", "%", "\u00b0"], ["6", "/", "\u02db"], ["7", "=", "\u0060"], ["8", "(", "\u02d9"], ["9", ")", "\u00b4"], ["\u00f6", "\u00d6", "\u02dd"], ["\u00fc", "\u00dc", "\u00a8"], ["\u00f3", "\u00d3", "\u00b8"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q", "\u005c"], ["w", "W", "\u007c"], ["e", "E", "\u00c4"], ["r", "R"], ["t", "T"], ["z", "Z"], ["u", "U", "\u20ac"], ["i", "I", "\u00cd"], ["o", "O"], ["p", "P"], ["\u0151", "\u0150", "\u00f7"], ["\u00fa", "\u00da", "\u00d7"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["a", "A", "\u00e4"], ["s", "S","\u0111"], ["d", "D","\u0110"], ["f", "F","\u005b"], ["g", "G","\u005d"], ["h", "H"], ["j", "J","\u00ed"], ["k", "K","\u0141"], ["l", "L","\u0142"], ["\u00e9", "\u00c9","\u0024"], ["\u00e1", "\u00c1","\u00df"], ["\u0171", "\u0170","\u00a4"]],
      [["Shift", "Shift"], ["\u00ed", "\u00cd","\u003c"], ["y", "Y","\u003e"], ["x", "X","\u0023"], ["c", "C","\u0026"], ["v", "V","\u0040"], ["b", "B","\u007b"], ["n", "N","\u007d"], ["m", "M","\u003c"], [",", "?","\u003b"], [".", ":","\u003e"], ["-", "_","\u002a"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ];

    this.VKI_layout.Italian = [ // Italian Standard Keyboard
      [["\u005c", "\u007c"], ["1", "!"], ["2", '"'], ["3", "\u00a3"], ["4", "$", "\u20ac"], ["5", "%"], ["6", "&"], ["7", "/"], ["8", "("], ["9", ")"], ["0", "="], ["'", "?"], ["\u00ec", "\u005e"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00e8", "\u00e9", "[", "{"], ["+", "*", "]", "}"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00f2", "\u00e7", "@"], ["\u00e0", "\u00b0", "#"], ["\u00f9", "\u00a7"]],
      [["Shift", "Shift"], ["<", ">"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ];

    this.VKI_layout.Kazakh = [ // Kazakh Standard Keyboard
      [["(", ")"], ['"', "!"], ["\u04d9", "\u04d8"], ["\u0456", "\u0406"], ["\u04a3", "\u04a2"], ["\u0493", "\u0492"], [",", ";"], [".", ":"], ["\u04af", "\u04ae"], ["\u04b1", "\u04b0"], ["\u049b", "\u049a"], ["\u04e9", "\u04e8"], ["\u04bb", "\u04ba"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0439", "\u0419"], ["\u0446", "\u0426"], ["\u0443", "\u0423"], ["\u043A", "\u041A"], ["\u0435", "\u0415"], ["\u043D", "\u041D"], ["\u0433", "\u0413"], ["\u0448", "\u0428"], ["\u0449", "\u0429"], ["\u0437", "\u0417"], ["\u0445", "\u0425"], ["\u044A", "\u042A"], ["\\", "/"]],
      [["Caps", "Caps"], ["\u0444", "\u0424"], ["\u044B", "\u042B"], ["\u0432", "\u0412"], ["\u0430", "\u0410"], ["\u043F", "\u041F"], ["\u0440", "\u0420"], ["\u043E", "\u041E"], ["\u043B", "\u041B"], ["\u0434", "\u0414"], ["\u0436", "\u0416"], ["\u044D", "\u042D"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["\\", "|"], ["\u044F", "\u042F"], ["\u0447", "\u0427"], ["\u0441", "\u0421"], ["\u043C", "\u041C"], ["\u0438", "\u0418"], ["\u0442", "\u0422"], ["\u044C", "\u042C"], ["\u0431", "\u0411"], ["\u044E", "\u042E"], ["\u2116", "?"], ["Shift", "Shift"]],
      [[" ", " "]]
    ];

    this.VKI_layout.Lithuanian = [ // Lithuanian Standard Keyboard
      [["`", "~"], ["\u0105", "\u0104"], ["\u010D", "\u010C"], ["\u0119", "\u0118"], ["\u0117", "\u0116"], ["\u012F", "\u012E"], ["\u0161", "\u0160"], ["\u0173", "\u0172"], ["\u016B", "\u016A"], ["\u201E", "("], ["\u201C", ")"], ["-", "_"], ["\u017E", "\u017D"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["[", "{"], ["]", "}"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], [";", ":"], ["'", '"'], ["\\", "|"]],
      [["Shift", "Shift"], ["\u2013", "\u20AC"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", "<"], [".", ">"], ["/", "?"], ["Shift", "Shift"]],
      [[" ", " "]]
    ];

    this.VKI_layout.Marathi = [ // Marathi Standard Keyboard
  [[" ", "", "`", "~"], ["\u0967", "\u090D", "1", "!"], ["\u0968", "\u0945", "2", "@"], ["\u0969", "\u094D\u0930", "3", "#"], ["\u096A", "\u0930\u094D", "4", "$"], ["\u096B", "\u091C\u094D\u091E", "5", "%"], ["\u096C", "\u0924\u094D\u0930", "6", "^"], ["\u096D", "\u0915\u094D\u0937", "7", "&"], ["\u096E", "\u0936\u094D\u0930", "8", "*"], ["\u096F", "(", "9", "("], ["\u0966", ")", "0", ")"], ["-", "\u0903", "-", "_"], ["\u0943", "\u090B", "=", "+"], ["Bksp", "Bksp"]],
  [["Tab", "Tab"], ["\u094C", "\u0914"], ["\u0948", "\u0910"], ["\u093E", "\u0906"], ["\u0940", "\u0908"], ["\u0942", "\u090A"], ["\u092C", "\u092D"], ["\u0939", "\u0919"], ["\u0917", "\u0918"], ["\u0926", "\u0927"], ["\u091C", "\u091D"], ["\u0921", "\u0922", "[", "{"], ["\u093C", "\u091E", "]", "}"], ["Enter", "Enter"]],
  [["Caps", "Caps"], ["\u094B", "\u0913"], ["\u0947", "\u090F"], ["\u094D", "\u0905"], ["\u093F", "\u0907"], ["\u0941", "\u0909"], ["\u092A", "\u092B"], ["\u0930", "\u0931"], ["\u0915", "\u0916"], ["\u0924", "\u0925"], ["\u091A", "\u091B", ";", ":"], ["\u091F", "\u0920", "'", '"'], ["\u0949", "\u0911", "\\", "|"]],
  [["Shift", "Shift"], [""], ["\u0902", "\u0901", "", "\u0950"], ["\u092E", "\u0923"], ["\u0928"], ["\u0935"], ["\u0932", "\u0933"], ["\u0938", "\u0936"], [",", "\u0937", ",", "<"], [".", "\u0964", ".", ">"], ["\u092F", "\u095F", "/", "?"], ["Shift", "Shift"]],
  [["Alt", "Alt"], [" ", " ", " ", " "], ["AltGr", "AltGr"]]
];

    this.VKI_layout.Norwegian = [ // Norwegian Standard Keyboard
      [["|", "\u00a7"], ["1", "!"], ["2", '"', "@"], ["3", "#", "\u00a3"], ["4", "\u00a4", "$"], ["5", "%"], ["6", "&"], ["7", "/", "{"], ["8", "(", "["], ["9", ")", "]"], ["0", "=", "}"], ["+", "?"], ["\\", "`", "\u00b4"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00e5", "\u00c5"], ["\u00a8", "^", "~"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00f8", "\u00d8"], ["\u00e6", "\u00c6"], ["'", "*"]],
      [["Shift", "Shift"], ["<", ">"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M", "\u03bc", "\u039c"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ];

    this.VKI_layout.Numpad = [ // Number pad
      [["$"], ["\u00a3"], ["\u20ac"], ["\u00a5"], ["/"], ["^"], ["Bksp", "Bksp"]],
      [["."], ["7"], ["8"], ["9"], ["*"], ["<"], ["("], ["["]],
      [["="], ["4"], ["5"], ["6"], ["-"], [">"], [")"], ["]"]],
      [["0"], ["1"], ["2"], ["3"], ["+"], ["Enter", "Enter"]],
      [[" "]]
    ];
    this.VKI_layout.Numpad.DDK = true;

    this.VKI_layout.Pinyin = [ // Pinyin Keyboard
      [["`", "~", "\u4e93", "\u301C"], ["1", "!", "\uFF62"], ["2", "@", "\uFF63"], ["3", "#", "\u301D"], ["4", "$", "\u301E"], ["5", "%", "\u301F"], ["6", "^", "\u3008"], ["7", "&", "\u3009"], ["8", "*", "\u302F"], ["9", "(", "\u300A"], ["0", ")", "\u300B"], ["-", "_", "\u300E"], ["=", "+", "\u300F"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q", "\u0101", "\u0100"], ["w", "W", "\u00E1", "\u00C1"], ["e", "E", "\u01CE", "\u01CD"], ["r", "R", "\u00E0", "\u00C0"], ["t", "T", "\u0113", "\u0112"], ["y", "Y", "\u00E9", "\u00C9"], ["u", "U", "\u011B", "\u011A"], ["i", "I", "\u00E8", "\u00C8"], ["o", "O", "\u012B", "\u012A"], ["p", "P", "\u00ED", "\u00CD"], ["[", "{", "\u01D0", "\u01CF"], ["]", "}", "\u00EC", "\u00CC"], ["\\", "|", "\u3020"]],
      [["Caps", "Caps"], ["a", "A", "\u014D", "\u014C"], ["s", "S", "\u00F3", "\u00D3"], ["d", "D", "\u01D2", "\u01D1"], ["f", "F", "\u00F2", "\u00D2"], ["g", "G", "\u00fc", "\u00dc"], ["h", "H", "\u016B", "\u016A"], ["j", "J", "\u00FA", "\u00DA"], ["k", "K", "\u01D4", "\u01D3"], ["l", "L", "\u00F9", "\u00D9"], [";", ":"], ["'", '"'], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["z", "Z", "\u01D6", "\u01D5"], ["x", "X", "\u01D8", "\u01D7"], ["c", "C", "\u01DA", "\u01D9"], ["v", "V", "\u01DC", "\u01DB"], ["b", "B"], ["n", "N"], ["m", "M"], [",", "<", "\u3001"], [".", ">", "\u3002"], ["/", "?"], ["Shift", "Shift"]],
      [["AltLk", "AltLk"], [" ", " ", " ", " "], ["Alt", "Alt"]]
    ];

    this.VKI_layout["Polish Prog"] = [ // Polish Programmers Keyboard
      [["`", "~"], ["1", "!"], ["2", "@"], ["3", "#"], ["4", "$"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u0119", "\u0118"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O", "\u00f3", "\u00d3"], ["p", "P"], ["[", "{"], ["]", "}"], ["\\", "|"]],
      [["Caps", "Caps"], ["a", "A", "\u0105", "\u0104"], ["s", "S", "\u015b", "\u015a"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L", "\u0142", "\u0141"], [";", ":"], ["'", '"'], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["z", "Z", "\u017c", "\u017b"], ["x", "X", "\u017a", "\u0179"], ["c", "C", "\u0107", "\u0106"], ["v", "V"], ["b", "B"], ["n", "N", "\u0144", "\u0143"], ["m", "M"], [",", "<"], [".", ">"], ["/", "?"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["Alt", "Alt"]]
    ];

    this.VKI_layout["Portuguese Br"] = [ // Portuguese (Brazil) Standard Keyboard
      [["'", '"'], ["1", "!", "\u00b9"], ["2", "@", "\u00b2"], ["3", "#", "\u00b3"], ["4", "$", "\u00a3"], ["5", "%", "\u00a2"], ["6", "\u00a8", "\u00ac"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+", "\u00a7"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q", "/"], ["w", "W", "?"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00b4", "`"], ["[", "{", "\u00aa"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00e7", "\u00c7"], ["~", "^"], ["]", "}", "\u00ba"], ["/", "?"]],
      [["Shift", "Shift"], ["\\", "|"], ["z", "Z"], ["x", "X"], ["c", "C", "\u20a2"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", "<"], [".", ">"], [":", ":"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ];

    this.VKI_layout["Portuguese Pt"] = [ // Portuguese (Portugal) Standard Keyboard
      [["\\", "|"], ["1", "!"], ["2", '"', "@"], ["3", "#", "\u00a3"], ["4", "$", "\u00a7"], ["5", "%"], ["6", "&"], ["7", "/", "{"], ["8", "(", "["], ["9", ")", "]"], ["0", "=", "}"], ["'", "?"], ["\u00ab", "\u00bb"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["+", "*", "\u00a8"], ["\u00b4", "`"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00e7", "\u00c7"], ["\u00ba", "\u00aa"], ["~", "^"]],
      [["Shift", "Shift"], ["<", ">", "\\"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ];

    this.VKI_layout.Romanian = [ // Romanian Standard Keyboard
     [["\u201E", "\u201D", "\u0060", "~"], ["1", "!","~"], ["2", "\u0040", "\u02C7"], ["3", "#","\u005E"], ["4", "$", "\u02D8"], ["5", "%", "\u00B0"], ["6", "\u005E", "\u02DB"], ["7", "&", "\u0060"], ["8", "*", "\u02D9"], ["9", "(", "\u00B4"], ["0", ")", "\u02DD"], ["-", "_", "\u00A8"], ["=", "+", "\u00B8", "\u00B1"], ["Bksp", "Bksp"]],
     [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20AC"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P", "\u00A7"], ["\u0103", "\u0102", "[", "{"], ["\u00EE", "\u00CE", "]","}"], ["\u00E2", "\u00C2", "\\", "|"]],
     [["Caps", "Caps"], ["a", "A"], ["s", "S", "\u00df"], ["d", "D", "\u00f0", "\u00D0"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L", "\u0142", "\u0141"], [(this.VKI_isIElt8) ? "\u015F" : "\u0219", (this.VKI_isIElt8) ? "\u015E" : "\u0218", ";", ":"], [(this.VKI_isIElt8) ? "\u0163" : "\u021B", (this.VKI_isIElt8) ? "\u0162" : "\u021A", "\'", "\""], ["Enter", "Enter"]],
     [["Shift", "Shift"], ["\\", "|"], ["z", "Z"], ["x", "X"], ["c", "C", "\u00A9"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", ";", "<", "\u00AB"], [".", ":", ">", "\u00BB"], ["/", "?"], ["Shift", "Shift"]],
     [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ];

    this.VKI_layout.Russian = [ // Russian Standard Keyboard
      [["\u0451", "\u0401"], ["1", "!"], ["2", '"'], ["3", "\u2116"], ["4", ";"], ["5", "%"], ["6", ":"], ["7", "?"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0439", "\u0419"], ["\u0446", "\u0426"], ["\u0443", "\u0423"], ["\u043A", "\u041A"], ["\u0435", "\u0415"], ["\u043D", "\u041D"], ["\u0433", "\u0413"], ["\u0448", "\u0428"], ["\u0449", "\u0429"], ["\u0437", "\u0417"], ["\u0445", "\u0425"], ["\u044A", "\u042A"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["\u0444", "\u0424"], ["\u044B", "\u042B"], ["\u0432", "\u0412"], ["\u0430", "\u0410"], ["\u043F", "\u041F"], ["\u0440", "\u0420"], ["\u043E", "\u041E"], ["\u043B", "\u041B"], ["\u0434", "\u0414"], ["\u0436", "\u0416"], ["\u044D", "\u042D"], ["\\", "/"]],
      [["Shift", "Shift"], ["/", "|"], ["\u044F", "\u042F"], ["\u0447", "\u0427"], ["\u0441", "\u0421"], ["\u043C", "\u041C"], ["\u0438", "\u0418"], ["\u0442", "\u0422"], ["\u044C", "\u042C"], ["\u0431", "\u0411"], ["\u044E", "\u042E"], [".", ","], ["Shift", "Shift"]],
      [[" ", " "]]
    ];

    this.VKI_layout.SerbianCyr = [ // Serbian Cyrillic Standard Keyboard
      [["`", "~"], ["1", "!"], ["2", '"'], ["3", "#"], ["4", "$"], ["5", "%"], ["6", "&"], ["7", "/"], ["8", "("], ["9", ")"], ["0", "="], ["'", "?"], ["+", "*"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["\u0459", "\u0409"], ["\u045a", "\u040a"], ["\u0435", "\u0415", "\u20ac"], ["\u0440", "\u0420"], ["\u0442", "\u0422"], ["\u0437", "\u0417"], ["\u0443", "\u0423"], ["\u0438", "\u0418"], ["\u043e", "\u041e"], ["\u043f", "\u041f"], ["\u0448", "\u0428"], ["\u0452", "\u0402"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["\u0430", "\u0410"], ["\u0441", "\u0421"], ["\u0434", "\u0414"], ["\u0444", "\u0424"], ["\u0433", "\u0413"], ["\u0445", "\u0425"], ["\u0458", "\u0408"], ["\u043a", "\u041a"], ["\u043b", "\u041b"], ["\u0447", "\u0427"], ["\u045b", "\u040b"], ["\u0436", "\u0416"]],
      [["Shift", "Shift"], ["<", ">"], ["\u0455", "\u0405"], ["\u045f", "\u040f"], ["\u0446", "\u0426"], ["\u0432", "\u0412"], ["\u0431", "\u0411"], ["\u043d", "\u041d"], ["\u043c", "\u041c"], [",", ";", "<"], [".", ":", ">"], ["-", "_", "\u00a9"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ];

    this.VKI_layout.SerbianLat = [ // Serbian Latin Standard Keyboard
      [["\u201a", "~"], ["1", "!", "~"], ["2", '"', "\u02c7"], ["3", "#", "^"], ["4", "$", "\u02d8"], ["5", "%", "\u00b0"], ["6", "&", "\u02db"], ["7", "/", "`"], ["8", "(", "\u02d9"], ["9", ")", "\u00b4"], ["0", "=", "\u02dd"], ["'", "?", "\u00a8"], ["+", "*", "\u00b8"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q", "\\"], ["w", "W","|"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["z", "Z"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u0161", "\u0160", "\u00f7"], ["\u0111", "\u0110", "\u00d7"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F", "["], ["g", "G", "]"], ["h", "H"], ["j", "J"], ["k", "K", "\u0142"], ["l", "L", "\u0141"], ["\u010d", "\u010c"], ["\u0107", "\u0106", "\u00df"], ["\u017e", "\u017d", "\u00a4"]],
      [["Shift", "Shift"], ["<", ">"], ["y", "Y"], ["x", "X"], ["c", "C"], ["v", "V", "@"], ["b", "B", "{",], ["n", "N", "}"], ["m", "M", "\u00a7"], [",", ";", "<"], [".", ":", ">"], ["-", "_", "\u00a9"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ];

    this.VKI_layout.Slovak = [ // Slovak Keyboard
     [[";", "\u00b0"], ["+", "1", "~"], ["\u013E", "2", "\u02C7"], ["\u0161", "3", "\u005E"], ["\u010D", "4", "\u02D8"], ["\u0165", "5", "\u00B0"], ["\u017E", "6", "\u02DB"], ["\u00FD", "7", "\u0060"], ["\u00E1", "8", "\u02D9"], ["\u00ED", "9", "\u00B4"], ["\u00E9", "0", "\u02DD"], ["=", "%", "\u00A8"], ["\u00B4", "\u02c7", "\u00B8"], ["Bksp", "Bksp"]],
     [["Tab", "Tab"], ["q", "Q","\u005C"], ["w", "W","\u007C"], ["e", "E", "\u20AC"], ["r", "R"], ["t", "T"], ["z", "Z"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P","\u0027"], ["\u00FA", "/", "\u00F7"], ["\u00E4", "(", "\u00D7"], ["Enter", "Enter"]],
     [["Caps", "Caps"], ["a", "A"], ["s", "S","\u0111"], ["d", "D","\u0110"], ["f", "F","\u005B"], ["g", "G","\u005D"], ["h", "H"], ["j", "J"], ["k", "K","\u0142"], ["l", "L","\u0141"], ["\u00F4", '"', "\u0024"], ["\u00A7", "!", "\u00DF",], ["\u0148", ")","\u00A4"]],
     [["Shift", "Shift"], ["&", "*", "\u003C"], ["y", "Y","\u003E"], ["x", "X","\u0023"], ["c", "C","\u0026"], ["v", "V","\u0040"], ["b", "B","\u007B"], ["n", "N","\u007D"], ["m", "M"], [",", "?", "<"], [".", ":", ">"], ["-", "_", "\u002A", ], ["Shift", "Shift"]],
     [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ];

    this.VKI_layout.Slovenian = [ // Slovenian Standard Keyboard
      [["\u00a8", "\u00a8", "\u00b8"], ["1", "!", "~"], ["2", '"', "\u02c7"], ["3", "#", "^"], ["4", "$", "\u02d8"], ["5", "%", "\u00b0"], ["6", "&", "\u02db"], ["7", "/", "\u0060"], ["8", "(", "\u00B7"], ["9", ")", "\u00b4"], ["0", "=", "\u2033"], ["'", "?", "\u00a8"], ["+", "*", "\u00b8"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q", "\\"], ["w", "W","|"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["z", "Z"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u0161", "\u0160", "\u00f7"], ["\u0111", "\u0110", "\u00d7"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F", "["], ["g", "G", "]"], ["h", "H"], ["j", "J"], ["k", "K", "\u0142"], ["l", "L", "\u0141"], ["\u010D", "\u010C"], ["\u0107", "\u0106", "\u00df"], ["\u017E", "\u017D", "\u00a4"]],
      [["Shift", "Shift"], ["<", ">"], ["y", "Y"], ["x", "X"], ["c", "C"], ["v", "V", "@"], ["b", "B", "{",], ["n", "N", "}"], ["m", "M", "\u00a7"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ];

    this.VKI_layout["Spanish Es"] = [ // Spanish (Spain) Standard Keyboard
      [["\u00ba", "\u00aa", "\\"], ["1", "!", "|"], ["2", '"', "@"], ["3", "'", "#"], ["4", "$", "~"], ["5", "%", "\u20ac"], ["6", "&","\u00ac"], ["7", "/"], ["8", "("], ["9", ")"], ["0", "="], ["'", "?"], ["\u00a1", "\u00bf"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u0060", "^", "["], ["\u002b", "\u002a", "]"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00f1", "\u00d1"], ["\u00b4", "\u00a8", "{"], ["\u00e7", "\u00c7", "}"]],
      [["Shift", "Shift"], ["<", ">"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ];

    this.VKI_layout.Swedish = [ // Swedish Standard Keyboard
      [["\u00a7", "\u00bd"], ["1", "!"], ["2", '"', "@"], ["3", "#", "\u00a3"], ["4", "\u00a4", "$"], ["5", "%", "\u20ac"], ["6", "&"], ["7", "/", "{"], ["8", "(", "["], ["9", ")", "]"], ["0", "=", "}"], ["+", "?", "\\"], ["\u00b4", "`"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00e5", "\u00c5"], ["\u00a8", "^", "~"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00f6", "\u00d6"], ["\u00e4", "\u00c4"], ["'", "*"]],
      [["Shift", "Shift"], ["<", ">", "|"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M", "\u03bc", "\u039c"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ];

this.VKI_layout.Tamil = [ // Tamil Standard Keyboard
  [["\u0BCA", "\u0B92"], ["1", "", "\u0BE7"], ["2", "", "\u0BE8"], ["3", "", "\u0BE9"], ["4", "", "\u0BEA"], ["5", "", "\u0BEB"], ["6", "\u0BA4\u0BCD\u0BB0", "\u0BEC"], ["7", "\u0B95\u0BCD\u0BB7", "\u0BED"], ["8", "\u0BB7\u0BCD\u0BB0", "\u0BEE"], ["9", "", "\u0BEF"], ["0", "", "\u0BF0"], ["-", "\u0B83", "\u0BF1"], [" ", "", "\u0BF2"], ["Bksp", "Bksp"]],
  [["Tab", "Tab"], ["\u0BCC", "\u0B94"], ["\u0BC8", "\u0B90"], ["\u0BBE", "\u0B86"], ["\u0BC0", "\u0B88"], ["\u0BC2", "\u0B8A"], ["\u0BAA", "\u0BAA"], ["\u0BB9", "\u0B99"], ["\u0B95", "\u0B95"], ["\u0BA4", "\u0BA4"], ["\u0B9C", "\u0B9A"], ["\u0B9F", "\u0B9F"], ["\u0B9E"], ["Enter", "Enter"]],
  [["Caps", "Caps"], ["\u0BCB", "\u0B93"], ["\u0BC7", "\u0B8F"], ["\u0BCD", "\u0B85"], ["\u0BBF", "\u0B87"], ["\u0BC1", "\u0B89"], ["\u0BAA", "\u0BAA"], ["\u0BB0", "\u0BB1"], ["\u0B95", "\u0B95"], ["\u0BA4", "\u0BA4"], ["\u0B9A", "\u0B9A"], ["\u0B9F", "\u0B9F"], [""]],
  [["Shift", "Shift"], ["\u0BC6", "\u0B8E"], [""], ["\u0BAE", "\u0BA3"], ["\u0BA8", "\u0BA9"], ["\u0BB5", "\u0BB4"], ["\u0BB2", "\u0BB3"], ["\u0BB8", "\u0BB7"], [",", "\u0BB7"], [".", "\u0BB8\u0BCD\u0BB0\u0BC0"], ["\u0BAF", "\u0BAF"], ["Shift", "Shift"]],
  [["Alt", "Alt"], [" ", " ", " ", " "], ["AltGr", "AltGr"]]
];

    this.VKI_layout["Turkish-F"] = [ // Turkish F Keyboard Layout
      [['+', "*", "\u00ac"], ["1", "!", "\u00b9", "\u00a1"], ["2", '"', "\u00b2"], ["3", "^", "#", "\u00b3"], ["4", "$", "\u00bc", "\u00a4"], ["5", "%", "\u00bd"], ["6", "&", "\u00be"], ["7", "'", "{"], ["8", "(", '['], ["9", ")", ']'], ["0", "=", "}"], ["/", "?", "\\", "\u00bf"], ["-", "_", "|"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["f", "F", "@"], ["g", "G"], ["\u011f", "\u011e"], ["\u0131", "\u0049", "\u00b6", "\u00ae"], ["o", "O"], ["d", "D", "\u00a5"], ["r", "R"], ["n", "N"], ["h", "H", "\u00f8", "\u00d8"], ["p", "P", "\u00a3"], ["q", "Q", "\u00a8"], ["w", "W", "~"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["u", "U", "\u00e6", "\u00c6"], ["i", "\u0130", "\u00df", "\u00a7"], ["e", "E", "\u20ac"], ["a", "A", " ", "\u00aa"], ["\u00fc", "\u00dc"], ["t", "T"], ["k", "K"], ["m", "M"], ["l", "L"], ["y", "Y", "\u00b4"], ["\u015f", "\u015e"], ["x", "X", "`"]],
      [["Shift", "Shift"], ["<", ">", "|", "\u00a6"], ["j", "J", "\u00ab", "<"], ["\u00f6", "\u00d6", "\u00bb", ">"], ["v", "V", "\u00a2", "\u00a9"], ["c", "C"], ["\u00e7", "\u00c7"], ["z", "Z"], ["s", "S", "\u00b5", "\u00ba"], ["b", "B", "\u00d7"], [".", ":", "\u00f7"], [",", ";", "-"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "],  ["AltGr", "AltGr"]]
    ];

    this.VKI_layout["Turkish-Q"] = [ // Turkish Q Keyboard Layout
      [['"', "\u00e9", "<"], ["1", "!", ">"], ["2", "'", "\u00a3"], ["3", "^", "#"], ["4", "+", "$"], ["5", "%", "\u00bd"], ["6", "&"], ["7", "/", "{"], ["8", "(", '['], ["9", ")", ']'], ["0", "=", "}"], ["*", "?", "\\"], ["-", "_", "|"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q", "@"], ["w", "W"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["\u0131", "\u0049", "\u0069", "\u0130"], ["o", "O"], ["p", "P"], ["\u011f", "\u011e", "\u00a8"], ["\u00fc", "\u00dc", "~"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["a", "A", "\u00e6", "\u00c6"], ["s", "S", "\u00df"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u015f", "\u015e", "\u00b4"], ["\u0069", "\u0130"], [",", ";", "`"]],
      [["Shift", "Shift"], ["<", ">", "|"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], ["\u00f6", "\u00d6"], ["\u00e7", "\u00c7"], [".", ":"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "],  ["AltGr", "AltGr"]]
    ];

    this.VKI_layout.UK = [ // UK Standard Keyboard
      [["`", "\u00ac", "\u00a6"], ["1", "!"], ["2", '"'], ["3", "\u00a3"], ["4", "$", "\u20ac"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u00e9", "\u00c9"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U", "\u00fa", "\u00da"], ["i", "I", "\u00ed", "\u00cd"], ["o", "O", "\u00f3", "\u00d3"], ["p", "P"], ["[", "{"], ["]", "}"], ["Enter", "Enter"]],
      [["Caps", "Caps"], ["a", "A", "\u00e1", "\u00c1"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], [";", ":"], ["'", "@"], ["#", "~"]],
      [["Shift", "Shift"], ["\\", "|"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", "<"], [".", ">"], ["/", "?"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
    ];

    this.VKI_layout.US = [ // US Standard Keyboard
      [["`", "~"], ["1", "!"], ["2", "@"], ["3", "#"], ["4", "$"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["[", "{"], ["]", "}"], ["\\", "|"]],
      [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], [";", ":"], ["'", '"'], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", "<"], [".", ">"], ["/", "?"], ["Shift", "Shift"]],
      [[" ", " "]]
    ];

    this.VKI_layout["US Int'l"] = [ // US International Keyboard
      [["`", "~"], ["1", "!", "\u00a1", "\u00b9"], ["2", "@", "\u00b2"], ["3", "#", "\u00b3"], ["4", "$", "\u00a4", "\u00a3"], ["5", "%", "\u20ac"], ["6", "^", "\u00bc"], ["7", "&", "\u00bd"], ["8", "*", "\u00be"], ["9", "(", "\u2018"], ["0", ")", "\u2019"], ["-", "_", "\u00a5"], ["=", "+", "\u00d7", "\u00f7"], ["Bksp", "Bksp"]],
      [["Tab", "Tab"], ["q", "Q", "\u00e4", "\u00c4"], ["w", "W", "\u00e5", "\u00c5"], ["e", "E", "\u00e9", "\u00c9"], ["r", "R", "\u00ae"], ["t", "T", "\u00fe", "\u00de"], ["y", "Y", "\u00fc", "\u00dc"], ["u", "U", "\u00fa", "\u00da"], ["i", "I", "\u00ed", "\u00cd"], ["o", "O", "\u00f3", "\u00d3"], ["p", "P", "\u00f6", "\u00d6"], ["[", "{", "\u00ab"], ["]", "}", "\u00bb"], ["\\", "|", "\u00ac", "\u00a6"]],
      [["Caps", "Caps"], ["a", "A", "\u00e1", "\u00c1"], ["s", "S", "\u00df", "\u00a7"], ["d", "D", "\u00f0", "\u00d0"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L", "\u00f8", "\u00d8"], [";", ":", "\u00b6", "\u00b0"], ["'", '"', "\u00b4", "\u00a8"], ["Enter", "Enter"]],
      [["Shift", "Shift"], ["z", "Z", "\u00e6", "\u00c6"], ["x", "X"], ["c", "C", "\u00a9", "\u00a2"], ["v", "V"], ["b", "B"], ["n", "N", "\u00f1", "\u00d1"], ["m", "M", "\u00b5"], [",", "<", "\u00e7", "\u00c7"], [".", ">"], ["/", "?", "\u00bf"], ["Shift", "Shift"]],
      [[" ", " ", " ", " "], ["Alt", "Alt"]]
    ];

    this.VKI_layout.Vietnamese = [ // Vietnamese Standard Keyboard
  [["`", "~", "`", "~"], ["\u0103", "\u0102", "1", "!"], ["\u00E2", "\u00C2", "2", "@"], ["\u00EA", "\u00CA", "3", "#"], ["\u00F4", "\u00D4", "4", "$"], ["\u0300", "\u0300", "5", "%"], ["\u0309", "\u0309", "6", "^"], ["\u0303", "\u0303", "7", "&"], ["\u0301", "\u0301", "8", "*"], ["\u0323", "\u0323", "9", "("], ["\u0111", "\u0110", "0", ")"], ["-", "_", "-", "_"], ["\u20AB", "+", "=", "+"], ["Bksp", "Bksp"]],
  [["Tab", "Tab"], ["q", "Q", "q", "Q"], ["w", "W", "w", "W"], ["e", "E", "e", "E"], ["r", "R", "r", "R"], ["t", "T", "t", "T"], ["y", "Y", "y", "Y"], ["u", "U", "u", "U"], ["i", "I", "i", "I"], ["o", "O", "o", "O"], ["p", "P", "p", "P"], ["\u01B0", "\u01AF", "[", "{"], ["\u01A1", "\u01A0", "]", "}"], ["Enter", "Enter"]],
  [["Caps", "Caps"], ["a", "A", "a", "A"], ["s", "S", "s", "S"], ["d", "D", "d", "D"], ["f", "F", "f", "F"], ["g", "G", "g", "G"], ["h", "H", "h", "H"], ["j", "J", "j", "J"], ["k", "K", "k", "K"], ["l", "L", "l", "L"], [";", ":", ";", ":"], ["'", '"', "'", '"'], ["\\", "|", "\\", "|"]],
  [["Shift", "Shift"], ["z", "Z", "z", "Z"], ["x", "X", "x", "X"], ["c", "C", "c", "C"], ["v", "V", "v", "V"], ["b", "B", "b", "B"], ["n", "N", "n", "N"], ["m", "M", "m", "M"], [",", "<", ",", "<"], [".", ">", ".", ">"], ["/", "?", "/", "?"], ["Shift", "Shift"]],
  [["Alt", "Alt"], [" ", " ", " ", " "], ["AltGr", "AltGr"]]
];

    /* ***** Define Dead Keys ************************************** */
    this.VKI_deadkey = {};

    this.VKI_deadkey['"'] = this.VKI_deadkey['\u00a8'] = [ // Umlaut / Diaeresis / Greek Dialytika
      ["a", "\u00e4"], ["e", "\u00eb"], ["i", "\u00ef"], ["o", "\u00f6"], ["u", "\u00fc"], ["y", "\u00ff"], ["\u03b9", "\u03ca"], ["\u03c5", "\u03cb"], ["\u016B", "\u01D6"], ["\u00FA", "\u01D8"], ["\u01D4", "\u01DA"], ["\u00F9", "\u01DC"],
      ["A", "\u00c4"], ["E", "\u00cb"], ["I", "\u00cf"], ["O", "\u00d6"], ["U", "\u00dc"], ["Y", "\u0178"], ["\u0399", "\u03aa"], ["\u03a5", "\u03ab"], ["\u016A", "\u01D5"], ["\u00DA", "\u01D7"], ["\u01D3", "\u01D9"], ["\u00D9", "\u01DB"]
    ];
    this.VKI_deadkey['~'] = [ // Tilde / Stroke
      ["a", "\u00e3"], ["l", "\u0142"], ["n", "\u00f1"], ["o", "\u00f5"],
      ["A", "\u00c3"], ["L", "\u0141"], ["N", "\u00d1"], ["O", "\u00d5"]
    ];
    this.VKI_deadkey['^'] = [ // Circumflex
      ["a", "\u00e2"], ["e", "\u00ea"], ["i", "\u00ee"], ["o", "\u00f4"], ["u", "\u00fb"], ["w", "\u0175"], ["y", "\u0177"],
      ["A", "\u00c2"], ["E", "\u00ca"], ["I", "\u00ce"], ["O", "\u00d4"], ["U", "\u00db"], ["W", "\u0174"], ["Y", "\u0176"]
    ];
    this.VKI_deadkey['\u02c7'] = [ // Baltic caron
      ["c", "\u010D"], ["d", "\u010f"], ["e", "\u011b"], ["s", "\u0161"], ["l", "\u013e"], ["n", "\u0148"], ["r", "\u0159"], ["t", "\u0165"], ["u", "\u01d4"], ["z", "\u017E"], ["\u00fc", "\u01da"],
      ["C", "\u010C"], ["D", "\u010e"], ["E", "\u011a"], ["S", "\u0160"], ["L", "\u013d"], ["N", "\u0147"], ["R", "\u0158"], ["T", "\u0164"], ["U", "\u01d3"], ["Z", "\u017D"], ["\u00dc", "\u01d9"]
    ];
    this.VKI_deadkey['\u02d8'] = [ // Romanian and Turkish breve
      ["a", "\u0103"], ["g", "\u011f"],
      ["A", "\u0102"], ["G", "\u011e"]
    ];
    this.VKI_deadkey['-'] = this.VKI_deadkey['\u00af'] = [ // Macron
      ["a", "\u0101"], ["e", "\u0113"], ["i", "\u012b"], ["o", "\u014d"], ["u", "\u016B"], ["y", "\u0233"], ["\u00fc", "\u01d6"],
      ["A", "\u0100"], ["E", "\u0112"], ["I", "\u012a"], ["O", "\u014c"], ["U", "\u016A"], ["Y", "\u0232"], ["\u00dc", "\u01d5"]
    ];
    this.VKI_deadkey['`'] = [ // Grave
      ["a", "\u00e0"], ["e", "\u00e8"], ["i", "\u00ec"], ["o", "\u00f2"], ["u", "\u00f9"], ["\u00fc", "\u01dc"],
      ["A", "\u00c0"], ["E", "\u00c8"], ["I", "\u00cc"], ["O", "\u00d2"], ["U", "\u00d9"], ["\u00dc", "\u01db"]
    ];
    this.VKI_deadkey["'"] = this.VKI_deadkey['\u00b4'] = this.VKI_deadkey['\u0384'] = [ // Acute / Greek Tonos
      ["a", "\u00e1"], ["e", "\u00e9"], ["i", "\u00ed"], ["o", "\u00f3"], ["u", "\u00fa"], ["y", "\u00fd"], ["\u03b1", "\u03ac"], ["\u03b5", "\u03ad"], ["\u03b7", "\u03ae"], ["\u03b9", "\u03af"], ["\u03bf", "\u03cc"], ["\u03c5", "\u03cd"], ["\u03c9", "\u03ce"], ["\u00fc", "\u01d8"],
      ["A", "\u00c1"], ["E", "\u00c9"], ["I", "\u00cd"], ["O", "\u00d3"], ["U", "\u00da"], ["Y", "\u00dd"], ["\u0391", "\u0386"], ["\u0395", "\u0388"], ["\u0397", "\u0389"], ["\u0399", "\u038a"], ["\u039f", "\u038c"], ["\u03a5", "\u038e"], ["\u03a9", "\u038f"], ["\u00dc", "\u01d7"]
    ];
    this.VKI_deadkey['\u02dd'] = [ // Hungarian Double Acute Accent
      ["o", "\u0151"], ["u", "\u0171"],
      ["O", "\u0150"], ["U", "\u0170"]
    ];
    this.VKI_deadkey['\u0385'] = [ // Greek Dialytika + Tonos
      ["\u03b9", "\u0390"], ["\u03c5", "\u03b0"]
    ];
    this.VKI_deadkey['\u00b0'] = this.VKI_deadkey['\u00ba'] = [ // Ring
      ["a", "\u00e5"], ["u", "\u016f"],
      ["A", "\u00c5"], ["U", "\u016e"]
    ];
    this.VKI_deadkey['\u02DB'] = [ // Ogonek
      ["a", "\u0106"], ["e", "\u0119"], ["i", "\u012f"], ["o", "\u01eb"], ["u", "\u0173"], ["y", "\u0177"],
      ["A", "\u0105"], ["E", "\u0118"], ["I", "\u012e"], ["O", "\u01ea"], ["U", "\u0172"], ["Y", "\u0176"]
    ];
    this.VKI_deadkey['\u02D9'] = [ // Dot-above
      ["c", "\u010B"], ["e", "\u0117"], ["g", "\u0121"], ["z", "\u017C"],
      ["C", "\u010A"], ["E", "\u0116"], ["G", "\u0120"], ["Z", "\u017B"]
    ];
    this.VKI_deadkey['\u00B8'] = this.VKI_deadkey['\u201a'] = [ // Cedilla
      ["c", "\u00e7"], ["s", "\u015F"],
      ["C", "\u00c7"], ["S", "\u015E"]
    ];
    this.VKI_deadkey[','] = [ // Comma
      ["s", (this.VKI_isIElt8) ? "\u015F" : "\u0219"], ["t", (this.VKI_isIElt8) ? "\u0163" : "\u021B"],
      ["S", (this.VKI_isIElt8) ? "\u015E" : "\u0218"], ["T", (this.VKI_isIElt8) ? "\u0162" : "\u021A"]
    ];


    /* ***** Define Symbols **************************************** */
    this.VKI_symbol = {
      '\u200c': "ZW\nNJ", '\u200d': "ZW\nJ"
    };



    /* ****************************************************************
     * Attach the keyboard to an element
     *
     */
    this.VKI_attachKeyboardUserScript = function(elem) {
      if (elem.VKI_attached) return false;
      elem.addEventListener('dblclick', function() { self.VKI_show(this); }, false);
      elem.VKI_attachedUserScript = true;
      if (this.VKI_isIE) {
        elem.onclick = elem.onselect = elem.onkeyup = function(e) {
          if ((e || event).type != "keyup" || !this.readOnly)
            this.range = document.selection.createRange();
        };
      }
    };


    /* ***** Find tagged input & textarea elements ***************** */
    var inputElems = [
      document.getElementsByTagName('input'),
      document.getElementsByTagName('textarea')
    ];
    for (var x = 0, elem; elem = inputElems[x++];)
      for (var y = 0, ex; ex = elem[y++];)
        if (ex.nodeName == "TEXTAREA" || ex.type == "text" || ex.type == "password")
          this.VKI_attachKeyboardUserScript(ex);

    document.documentElement.addEventListener('dblclick', (function(self) { return function(e) {
      e = e || event;
      if ((e.target.nodeName == "TEXTAREA" || e.target.type == "text" || e.target.type == "password") && !e.target.VKI_attachedUserScript) {
        self.VKI_attachKeyboardUserScript(e.target);
        self.VKI_show(e.target);
      }
    }})(this), false);


    /* ***** Build the keyboard interface ************************** */
    this.VKI_keyboard = document.createElement('table');
    this.VKI_keyboard.id = "keyboardInputMasterUserScript";
    this.VKI_keyboard.dir = "ltr";
    this.VKI_keyboard.cellSpacing = this.VKI_keyboard.border = "0";

    var thead = document.createElement('thead');
      var tr = document.createElement('tr');
        var th = document.createElement('th');
          var kblist = document.createElement('select');
            for (ktype in this.VKI_layout) {
              if (typeof this.VKI_layout[ktype] == "object") {
                var opt = document.createElement('option');
                    opt.value = ktype;
                    opt.appendChild(document.createTextNode(ktype));
                  kblist.appendChild(opt);
              }
            }
            if (kblist.options.length) {
                kblist.value = this.VKI_kt;
                kblist.addEventListener('change', function() {
                  self.VKI_kt = this.value;
                  self.VKI_buildKeys();
                  self.VKI_position();
                }, false);
              th.appendChild(kblist);
            }

            var label = document.createElement('label');
              var checkbox = document.createElement('input');
                  checkbox.type = "checkbox";
                  checkbox.title = "Dead keys: " + ((this.VKI_deadkeysOn) ? "On" : "Off");
                  checkbox.defaultChecked = this.VKI_deadkeysOn;
                  checkbox.addEventListener('click', function() {
                    self.VKI_deadkeysOn = this.checked;
                    this.title = "Dead keys: " + ((this.checked) ? "On" : "Off");
                    self.VKI_modify("");
                    return true;
                  }, false);
                label.appendChild(this.VKI_deadkeysElem = checkbox);
                  checkbox.checked = this.VKI_deadkeysOn;
            th.appendChild(label);
          tr.appendChild(th);

        var td = document.createElement('td');
          var clearer = document.createElement('span');
              clearer.id = "keyboardInputClear";
              clearer.appendChild(document.createTextNode("Clear"));
              clearer.title = "Clear this input";
              clearer.addEventListener('mousedown', function() { this.className = "pressed"; }, false);
              clearer.addEventListener('mouseup', function() { this.className = ""; }, false);
              clearer.addEventListener('click', function() {
                self.VKI_target.value = "";
                self.VKI_target.focus();
                return false;
              }, false);
            td.appendChild(clearer);

          var closer = document.createElement('span');
              closer.id = "keyboardInputClose";
              closer.appendChild(document.createTextNode('X'));
              closer.title = "Close this window";
              closer.addEventListener('mousedown', function() { this.className = "pressed"; }, false);
              closer.addEventListener('mouseup', function() { this.className = ""; }, false);
              closer.addEventListener('click', function() { self.VKI_close(); }, false);
            td.appendChild(closer);

          tr.appendChild(td);
        thead.appendChild(tr);
    this.VKI_keyboard.appendChild(thead);

    var tbody = document.createElement('tbody');
      var tr = document.createElement('tr');
        var td = document.createElement('td');
            td.colSpan = "2";
          var div = document.createElement('div');
              div.id = "keyboardInputLayout";
            td.appendChild(div);
          if (this.VKI_showVersion) {
            var div = document.createElement('div');
              var ver = document.createElement('var');
                  ver.appendChild(document.createTextNode("v" + this.VKI_version));
                div.appendChild(ver);
              td.appendChild(div);
          }
          tr.appendChild(td);
        tbody.appendChild(tr);
    this.VKI_keyboard.appendChild(tbody);

    if (this.VKI_isIE6) {
      this.VKI_iframe = document.createElement('iframe');
      this.VKI_iframe.style.position = "absolute";
      this.VKI_iframe.style.border = "0px none";
      this.VKI_iframe.style.filter = "mask()";
      this.VKI_iframe.style.zIndex = "999999";
      this.VKI_iframe.src = this.VKI_imageURI;
    }


    /* ****************************************************************
     * Build or rebuild the keyboard keys
     *
     */
    this.VKI_buildKeys = function() {
      this.VKI_shift = this.VKI_shiftlock = this.VKI_altgr = this.VKI_altgrlock = this.VKI_dead = false;
      this.VKI_deadkeysOn = (this.VKI_layout[this.VKI_kt].DDK) ? false : this.VKI_keyboard.getElementsByTagName('label')[0].getElementsByTagName('input')[0].checked;

      var container = this.VKI_keyboard.tBodies[0].getElementsByTagName('div')[0];
      while (container.firstChild) container.removeChild(container.firstChild);

      for (var x = 0, hasDeadKey = false, lyt; lyt = this.VKI_layout[this.VKI_kt][x++];) {
        var table = document.createElement('table');
            table.cellSpacing = table.border = "0";
        if (lyt.length <= this.VKI_keyCenter) table.className = "keyboardInputCenter";
          var tbody = document.createElement('tbody');
            var tr = document.createElement('tr');
            for (var y = 0, lkey; lkey = lyt[y++];) {
              var td = document.createElement('td');
                if (this.VKI_symbol[lkey[0]]) {
                  var span = document.createElement('span');
                      span.className = lkey[0];
                      span.appendChild(document.createTextNode(this.VKI_symbol[lkey[0]]));
                    td.appendChild(span);
                } else td.appendChild(document.createTextNode(lkey[0] || "\xa0"));

                var className = [];
                if (this.VKI_deadkeysOn)
                  for (key in this.VKI_deadkey)
                    if (key === lkey[0]) { className.push("alive"); break; }
                if (lyt.length > this.VKI_keyCenter && y == lyt.length) className.push("last");
                if (lkey[0] == " ") className.push("space");
                  td.className = className.join(" ");

                  td.VKI_clickless = 0;
                  if (!td.click) {
                    td.click = function() {
                      var evt = this.ownerDocument.createEvent('MouseEvents');
                      evt.initMouseEvent('click', true, true, this.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                      this.dispatchEvent(evt);
                    };
                  }
                  td.addEventListener('mouseover', function() {
                    if (self.VKI_clickless) {
                      var _self = this;
                      clearTimeout(this.VKI_clickless);
                      this.VKI_clickless = setTimeout(function() { _self.click(); }, self.VKI_clickless);
                    }
                    if ((this.firstChild.nodeValue || this.firstChild.className) != "\xa0") this.className += " hover";
                  }, false);
                  td.addEventListener('mouseout', function() {
                    if (self.VKI_clickless) clearTimeout(this.VKI_clickless);
                    this.className = this.className.replace(/ ?(hover|pressed)/g, "");
                  }, false);
                  td.addEventListener('mousedown', function() {
                    if (self.VKI_clickless) clearTimeout(this.VKI_clickless);
                    if ((this.firstChild.nodeValue || this.firstChild.className) != "\xa0") this.className += " pressed";
                  }, false);
                  td.addEventListener('mouseup', function() {
                    if (self.VKI_clickless) clearTimeout(this.VKI_clickless);
                    this.className = this.className.replace(/ ?pressed/g, "");
                  }, false);
                  td.addEventListener('dblclick', function() { return false; }, false);

                switch (lkey[1]) {
                  case "Caps": case "Shift":
                  case "Alt": case "AltGr": case "AltLk":
                    td.addEventListener('click', (function(type) { return function() { self.VKI_modify(type); return false; }})(lkey[1]), false);
                    break;
                  case "Tab":
                    td.addEventListener('click', function() { self.VKI_insert("\t"); return false; }, false);
                    break;
                  case "Bksp":
                    td.addEventListener('click', function() {
                      self.VKI_target.focus();
                      if (self.VKI_target.setSelectionRange) {
                        if (self.VKI_target.readOnly && self.VKI_isWebKit) {
                          var rng = [self.VKI_target.selStart || 0, self.VKI_target.selEnd || 0];
                        } else var rng = [self.VKI_target.selectionStart, self.VKI_target.selectionEnd];
                        if (rng[0] < rng[1]) rng[0]++;
                        self.VKI_target.value = self.VKI_target.value.substr(0, rng[0] - 1) + self.VKI_target.value.substr(rng[1]);
                        self.VKI_target.setSelectionRange(rng[0] - 1, rng[0] - 1);
                        if (self.VKI_target.readOnly && self.VKI_isWebKit) {
                          var range = window.getSelection().getRangeAt(0);
                          self.VKI_target.selStart = range.startOffset;
                          self.VKI_target.selEnd = range.endOffset;
                        }
                      } else if (self.VKI_target.createTextRange) {
                        try {
                          self.VKI_target.range.select();
                        } catch(e) { self.VKI_target.range = document.selection.createRange(); }
                        if (!self.VKI_target.range.text.length) self.VKI_target.range.moveStart('character', -1);
                        self.VKI_target.range.text = "";
                      } else self.VKI_target.value = self.VKI_target.value.substr(0, self.VKI_target.value.length - 1);
                      if (self.VKI_shift) self.VKI_modify("Shift");
                      if (self.VKI_altgr) self.VKI_modify("AltGr");
                      self.VKI_target.focus();
                      return true;
                    }, false);
                    break;
                  case "Enter":
                    td.addEventListener('click', function() {
                      if (self.VKI_target.nodeName != "TEXTAREA") {
                        self.VKI_close();
                        this.className = this.className.replace(/ ?(hover|pressed)/g, "");
                      } else self.VKI_insert("\n");
                      return true;
                    }, false);
                    break;
                  default:
                    td.addEventListener('click', function() {
                      var character = this.firstChild.nodeValue || this.firstChild.className;
                      if (self.VKI_deadkeysOn && self.VKI_dead) {
                        if (self.VKI_dead != character) {
                          for (key in self.VKI_deadkey) {
                            if (key == self.VKI_dead) {
                              if (character != " ") {
                                for (var z = 0, rezzed = false, dk; dk = self.VKI_deadkey[key][z++];) {
                                  if (dk[0] == character) {
                                    self.VKI_insert(dk[1]);
                                    rezzed = true;
                                    break;
                                  }
                                }
                              } else {
                                self.VKI_insert(self.VKI_dead);
                                rezzed = true;
                              } break;
                            }
                          }
                        } else rezzed = true;
                      } self.VKI_dead = false;

                      if (!rezzed && character != "\xa0") {
                        if (self.VKI_deadkeysOn) {
                          for (key in self.VKI_deadkey) {
                            if (key == character) {
                              self.VKI_dead = key;
                              this.className += " dead";
                              if (self.VKI_shift) self.VKI_modify("Shift");
                              if (self.VKI_altgr) self.VKI_modify("AltGr");
                              break;
                            }
                          }
                          if (!self.VKI_dead) self.VKI_insert(character);
                        } else self.VKI_insert(character);
                      }

                      self.VKI_modify("");
                      return false;
                    }, false);

                }
                tr.appendChild(td);
              tbody.appendChild(tr);
            table.appendChild(tbody);

            for (var z = 0; z < 4; z++)
              if (this.VKI_deadkey[lkey[z] = lkey[z] || "\xa0"]) hasDeadKey = true;
        }
        container.appendChild(table);
      }
      this.VKI_deadkeysElem.style.display = (!this.VKI_layout[this.VKI_kt].DDK && hasDeadKey) ? "inline" : "none";
    };

    this.VKI_buildKeys();
    VKI_disableSelection(this.VKI_keyboard);


    /* ****************************************************************
     * Controls modifier keys
     *
     */
    this.VKI_modify = function(type) {
      switch (type) {
        case "Alt":
        case "AltGr": this.VKI_altgr = !this.VKI_altgr; break;
        case "AltLk": this.VKI_altgrlock = !this.VKI_altgrlock; break;
        case "Caps": this.VKI_shiftlock = !this.VKI_shiftlock; break;
        case "Shift": this.VKI_shift = !this.VKI_shift; break;
      } var vchar = 0;
      if (!this.VKI_shift != !this.VKI_shiftlock) vchar += 1;
      if (!this.VKI_altgr != !this.VKI_altgrlock) vchar += 2;

      var tables = this.VKI_keyboard.getElementsByTagName('table');
      for (var x = 0; x < tables.length; x++) {
        var tds = tables[x].getElementsByTagName('td');
        for (var y = 0; y < tds.length; y++) {
          var className = [], lkey = this.VKI_layout[this.VKI_kt][x][y];

          if (tds[y].className.indexOf('hover') > -1) className.push("hover");

          switch (lkey[1]) {
            case "Alt":
            case "AltGr":
              if (this.VKI_altgr) className.push("dead");
              break;
            case "AltLk":
              if (this.VKI_altgrlock) className.push("dead");
              break;
            case "Shift":
              if (this.VKI_shift) className.push("dead");
              break;
            case "Caps":
              if (this.VKI_shiftlock) className.push("dead");
              break;
            case "Tab": case "Enter": case "Bksp": break;
            default:
              if (type) {
                tds[y].removeChild(tds[y].firstChild);
                if (this.VKI_symbol[lkey[vchar]]) {
                  var span = document.createElement('span');
                      span.className = lkey[vchar];
                      span.appendChild(document.createTextNode(this.VKI_symbol[lkey[vchar]]));
                    tds[y].appendChild(span);
                } else tds[y].appendChild(document.createTextNode(lkey[vchar]));
              }
              if (this.VKI_deadkeysOn) {
                var character = tds[y].firstChild.nodeValue || tds[y].firstChild.className;
                if (this.VKI_dead) {
                  if (character == this.VKI_dead) className.push("dead");
                  for (var z = 0; z < this.VKI_deadkey[this.VKI_dead].length; z++) {
                    if (character == this.VKI_deadkey[this.VKI_dead][z][0]) {
                      className.push("target");
                      break;
                    }
                  }
                }
                for (key in this.VKI_deadkey)
                  if (key === character) { className.push("alive"); break; }
              }
          }

          if (y == tds.length - 1 && tds.length > this.VKI_keyCenter) className.push("last");
          if (lkey[0] == " ") className.push("space");
          tds[y].className = className.join(" ");
        }
      }
    };


    /* ****************************************************************
     * Insert text at the cursor
     *
     */
    this.VKI_insert = function(text) {
      this.VKI_target.focus();
      if (this.VKI_target.maxLength) this.VKI_target.maxlength = this.VKI_target.maxLength;
      if (typeof this.VKI_target.maxlength == "undefined" ||
          this.VKI_target.maxlength < 0 ||
          this.VKI_target.value.length < this.VKI_target.maxlength) {
        if (this.VKI_target.setSelectionRange) {
          if (this.VKI_target.readOnly && this.VKI_isWebKit) {
            var rng = [this.VKI_target.selStart || 0, this.VKI_target.selEnd || 0];
          } else var rng = [this.VKI_target.selectionStart, this.VKI_target.selectionEnd];
          this.VKI_target.value = this.VKI_target.value.substr(0, rng[0]) + text + this.VKI_target.value.substr(rng[1]);
          if (text == "\n" && window.opera) rng[0]++;
          this.VKI_target.setSelectionRange(rng[0] + text.length, rng[0] + text.length);
          if (this.VKI_target.readOnly && this.VKI_isWebKit) {
            var range = window.getSelection().getRangeAt(0);
            this.VKI_target.selStart = range.startOffset;
            this.VKI_target.selEnd = range.endOffset;
          }
        } else if (this.VKI_target.createTextRange) {
          try {
            this.VKI_target.range.select();
          } catch(e) { this.VKI_target.range = document.selection.createRange(); }
          this.VKI_target.range.text = text;
          this.VKI_target.range.collapse(true);
          this.VKI_target.range.select();
        } else this.VKI_target.value += text;
        if (this.VKI_shift) this.VKI_modify("Shift");
        if (this.VKI_altgr) this.VKI_modify("AltGr");
        this.VKI_target.focus();
      } else if (this.VKI_target.createTextRange && this.VKI_target.range)
        this.VKI_target.range.select();
    };


    /* ****************************************************************
     * Show the keyboard interface
     *
     */
    this.VKI_show = function(elem) {
      if (this.VKI_target = elem) {
        if (this.VKI_visible != elem) {
          if (this.VKI_isIE) {
            if (!this.VKI_target.range) {
              this.VKI_target.range = this.VKI_target.createTextRange();
              this.VKI_target.range.moveStart('character', this.VKI_target.value.length);
            } this.VKI_target.range.select();
          }
          try { this.VKI_keyboard.parentNode.removeChild(this.VKI_keyboard); } catch (e) {}
          if (this.VKI_clearPasswords && this.VKI_target.type == "password") this.VKI_target.value = "";

          var elem = this.VKI_target;
          this.VKI_target.keyboardPosition = "absolute";
          do {
            if (VKI_getStyle(elem, "position") == "fixed") {
              this.VKI_target.keyboardPosition = "fixed";
              break;
            }
          } while (elem = elem.offsetParent);

          if (this.VKI_isIE6) document.body.appendChild(this.VKI_iframe);
          document.body.appendChild(this.VKI_keyboard);
          this.VKI_keyboard.style.top = this.VKI_keyboard.style.right = this.VKI_keyboard.style.bottom = this.VKI_keyboard.style.left = "auto";
          this.VKI_keyboard.style.position = this.VKI_target.keyboardPosition;

          this.VKI_visible = this.VKI_target;
          this.VKI_position();
          this.VKI_target.focus();
        } else this.VKI_close();
      }
    };


    /* ****************************************************************
     * Position the keyboard
     *
     */
    this.VKI_position = function() {
      if (self.VKI_visible) {
        var inputElemPos = VKI_findPos(self.VKI_target);
        self.VKI_keyboard.style.top = inputElemPos[1] - ((self.VKI_target.keyboardPosition == "fixed" && !self.VKI_isIE && !self.VKI_isMoz) ? VKI_scrollDist()[1] : 0) + self.VKI_target.offsetHeight + 3 + "px";
        self.VKI_keyboard.style.left = Math.min(VKI_innerDimensions()[0] - self.VKI_keyboard.offsetWidth - 15, inputElemPos[0]) + "px";
        if (self.VKI_isIE6) {
          self.VKI_iframe.style.width = self.VKI_keyboard.offsetWidth + "px";
          self.VKI_iframe.style.height = self.VKI_keyboard.offsetHeight + "px";
          self.VKI_iframe.style.top = self.VKI_keyboard.style.top;
          self.VKI_iframe.style.left = self.VKI_keyboard.style.left;
        }
      }
    };


    if (window.addEventListener) {
      window.addEventListener('resize', this.VKI_position, false);
    } else if (window.attachEvent)
      window.attachEvent('onresize', this.VKI_position);


    /* ****************************************************************
     * Close the keyboard interface
     *
     */
    this.VKI_close = function() {
      if (this.VKI_visible) {
        try {
          this.VKI_keyboard.parentNode.removeChild(this.VKI_keyboard);
          if (this.VKI_isIE6) this.VKI_iframe.parentNode.removeChild(this.VKI_iframe);
        } catch (e) {}
        this.VKI_target.focus();
        this.VKI_target = this.VKI_visible = false;
      }
    };
  };

  function VKI_findPos(obj) {
    var curleft = curtop = 0;
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
    return [curleft, curtop];
  }

  function VKI_innerDimensions() {
    if (self.innerHeight) {
      return [self.innerWidth, self.innerHeight];
    } else if (document.documentElement && document.documentElement.clientHeight) {
      return [document.documentElement.clientWidth, document.documentElement.clientHeight];
    } else if (document.body)
      return [document.body.clientWidth, document.body.clientHeight];
    return [0, 0];
  }

  function VKI_scrollDist() {
    var html = document.getElementsByTagName('html')[0];
    if (html.scrollTop && document.documentElement.scrollTop) {
      return [html.scrollLeft, html.scrollTop];
    } else if (html.scrollTop || document.documentElement.scrollTop)
      return [html.scrollLeft + document.documentElement.scrollLeft, html.scrollTop + document.documentElement.scrollTop];
    return [0, 0];
  }

  function VKI_getStyle(obj, styleProp) {
    if (obj.currentStyle) {
      var y = obj.currentStyle[styleProp];
    } else if (window.getComputedStyle)
      var y = window.getComputedStyle(obj, null)[styleProp];
    return y;
  }

  function VKI_disableSelection(elem) {
    elem.onselectstart = function() { return false; };
    elem.unselectable = "on";
    elem.style.MozUserSelect = "none";
    elem.style.cursor = "default";
    if (window.opera) elem.onmousedown = function() { return false; };
  }


  var VKI_link = document.createElement('link');
      VKI_link.setAttribute('rel', "stylesheet");
      VKI_link.setAttribute('type', "text/css");
      VKI_link.setAttribute('href', "data:text/css,#keyboardInputMasterUserScript {\
  position:absolute;\
  border-top:2px solid #eeeeee;\
  border-right:2px solid #6e6e6e;\
  border-bottom:2px solid #6e6e6e;\
  border-left:2px solid #eeeeee;\
  color:#000000;\
  background-color:#dddddd;\
  text-align:left;\
  z-index:1000000;\
  width:auto;\
  margin:0px;\
  font:normal 11px Arial,sans-serif;\
  line-height:1;\
}\
#keyboardInputMasterUserScript * {\
  color:#000000;\
  background:transparent;\
  font:normal 11px Arial,sans-serif;\
  margin:0px;\
  padding:0px;\
  border:0px none;\
  outline:0px;\
  vertical-align:baseline;\
}\
\
#keyboardInputMasterUserScript thead tr th {\
  text-align:left;\
  padding:2px 5px 2px 4px;\
  background-color:inherit;\
}\
#keyboardInputMasterUserScript thead tr th select {\
  margin-right:5px;\
  border:1px inset #888888;\
  background-color:#f6f6f6;\
}\
#keyboardInputMasterUserScript thead tr th label input {\
  width:12px;\
  height:12px;\
  margin-right:5px;\
  vertical-align:middle;\
}\
#keyboardInputMasterUserScript thead tr td {\
  text-align:right;\
  vertical-align:middle;\
  padding:2px 4px 2px 5px;\
}\
#keyboardInputMasterUserScript thead tr td span {\
  padding:2px 4px;\
  font-weight:bold;\
  border-top:1px solid #e5e5e5;\
  border-right:1px solid #5d5d5d;\
  border-bottom:1px solid #5d5d5d;\
  border-left:1px solid #e5e5e5;\
  background-color:#cccccc;\
  cursor:pointer;\
}\
\
#keyboardInputMasterUserScript tbody tr td {\
  text-align:left;\
  padding:0px 4px 3px 4px;\
}\
#keyboardInputMasterUserScript tbody tr td div {\
  text-align:center;\
  position:relative;\
  height:0px;\
}\
#keyboardInputMasterUserScript tbody tr td div#keyboardInputLayout {\
  height:auto;\
}\
#keyboardInputMasterUserScript tbody tr td div#keyboardInputLayout table {\
  height:20px;\
  white-space:nowrap;\
  width:100%;\
  border-collapse:separate;\
  border-spacing:0px;\
}\
#keyboardInputMasterUserScript tbody tr td div#keyboardInputLayout table.keyboardInputCenter {\
  width:auto;\
  margin:0px auto;\
}\
#keyboardInputMasterUserScript tbody tr td div#keyboardInputLayout table tbody tr td {\
  vertical-align:middle;\
  padding:0px 5px;\
  white-space:pre;\
  font-family:'Lucida Console',monospace;\
  border-top:1px solid #e5e5e5;\
  border-right:1px solid #5d5d5d;\
  border-bottom:1px solid #5d5d5d;\
  border-left:1px solid #e5e5e5;\
  background-color:#eeeeee;\
  cursor:default;\
  min-width:0.75em;\
}\
#keyboardInputMasterUserScript tbody tr td div#keyboardInputLayout table tbody tr td.last {\
  width:99%;\
}\
#keyboardInputMasterUserScript tbody tr td div#keyboardInputLayout table tbody tr td.space {\
  padding:0px 45px;\
}\
#keyboardInputMasterUserScript tbody tr td div#keyboardInputLayout table tbody tr td.alive {\
  background-color:#ccccdd;\
}\
#keyboardInputMasterUserScript tbody tr td div#keyboardInputLayout table tbody tr td.target {\
  background-color:#ddddcc;\
}\
#keyboardInputMasterUserScript tbody tr td div#keyboardInputLayout table tbody tr td.hover {\
  border-top:1px solid #d5d5d5;\
  border-right:1px solid #555555;\
  border-bottom:1px solid #555555;\
  border-left:1px solid #d5d5d5;\
  background-color:#cccccc;\
}\
#keyboardInputMasterUserScript thead tr td span.pressed,\
#keyboardInputMasterUserScript tbody tr td div#keyboardInputLayout table tbody tr td.pressed,\
#keyboardInputMasterUserScript tbody tr td div#keyboardInputLayout table tbody tr td.dead {\
  border-top:1px solid #555555;\
  border-right:1px solid #d5d5d5;\
  border-bottom:1px solid #d5d5d5;\
  border-left:1px solid #555555;\
  background-color:#cccccc;\
}\
\
#keyboardInputMasterUserScript tbody tr td div#keyboardInputLayout table tbody tr td span {\
  display:block;\
  text-align:center;\
  font-size:0.6em;\
}\
\
#keyboardInputMasterUserScript tbody tr td div var {\
  position:absolute;\
  bottom:0px;\
  right:0px;\
  font-weight:bold;\
  font-style:italic;\
  color:#444444;\
}");

  var VKI_head = VKI_title = 0;
  try {
    if (VKI_head = document.getElementsByTagName('head')[0]) {
      VKI_head.appendChild(VKI_link);
    } else if (VKI_title = document.getElementByTagName('title')[0])
      VKI_title.parentNode.insertBefore(VKI_link, VKI_title);
  } catch(e) {}

  if (VKI_head || VKI_title) VKI_buildKeyboardInputsUserScript();
}, false);

// End Virtual Keyboard

// Start Messenger

 (function() {
     try {
		var rightbox = document.getElementById("rbox");
		if(!rightbox)
			return;
		var scriptcontainer = document.createElement("script");
		scriptcontainer.innerHTML = 'function toggletalk(){ var talkspan = document.getElementById("talkspan");var talkframe = talkspan.getElementsByTagName("span");if(typeof(talkframe[0]) == "object"){var olChild = talkspan.removeChild(talkframe[0]);document.getElementById("toggler").innerHTML=\'Show Messenger\';}else{var talkiframe = document.createElement("span");talkiframe.setAttribute("id","iframecontainer");talkiframe.innerHTML="<iframe src=\'http://gmodules.com/ig/ifr?url=http://swarnava.007gb.com/messenger.xml&synd=open&w=270&h=451&title=Google+Talk&border=%23ffffff%7C3px%2C1px+solid+%23999999\' width=\'100%\' 	height=\'451px\' frameborder=\'0\' id=\'gult\'></iframe>";talkspan.appendChild(talkiframe);document.getElementById("toggler").innerHTML=\'Hide Messenger\';}}';
rightbox.appendChild(scriptcontainer);
rightbox.innerHTML = '<table cellspacing="0" cellpadding="0" border="0" class="module"><tr><td class="topl_g"><b>&nbsp;&nbsp;<a href="javascript:void(0);" onclick="toggletalk();" id=\'toggler\'>Show Messenger</a></b></td><td class="topr"></td></tr><tr><td class="boxmid" align="center"><span id="talkspan"></span></td><td class="boxmidr"></td></tr><tr><td class="botl"></td><td class="botr"></td></tr></table>' + rightbox.innerHTML;
     } catch (e) {
         GM_log( 'Messenger inside Orkut exception: ' + e );
		 alert(e);
		}
    
})();

// End Messenger

// Start Community Manager

    // Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

    // Check if jQuery's loaded
    function GM_wait() 
    {
        if(typeof unsafeWindow.jQuery == 'undefined') 
		{ 
			window.setTimeout(GM_wait,100); 
		}
        else 
        { 
            $ = unsafeWindow.jQuery; 
			initMassModeration(); 
        }
    }

    GM_wait();	

	
function initMassModeration()
{
    var SIG="";
    var POST="";
    var uidIndex=0;cmmIndex=0,actionIndex=0;
    var	spamUserIds;
    var modActionValues=new Array('ban+doDeletePosts','boot+doDeletePosts','ban','doDeletePosts','boot', 'report_topics', 'report_topics+ban');
    var modActionLabels=new Array('Ban & delete posts','Remove & delete posts','Ban members','Delete posts','Remove members', 'Report spam', 'Report spam and ban');
    var modActionStatus=new Array('Banning and deleting post(s)...','Removing and deleting post(s)...','Banning member(s)...','Deleting post(s)...','Removing member(s)...', 'Reporting spam...', 'Reporting spam and banning member(s)');
    var ajaxBusyIcon = document.createElement('img');
    ajaxBusyIcon.setAttribute("src","data:image/gif;base64,R0lGODlhEAAQAPQAAP///7Vnzfz6/MWI19q15rZqzr991PLm9uXK7bt00dat49Kj4Pbu+ODB6u3c\
88mR2s2a3QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05F\
VFNDQVBFMi4wAwEAAAAh/h1CdWlsdCB3aXRoIEdJRiBNb3ZpZSBHZWFyIDQuMAAh/hVNYWRlIGJ5\
IEFqYXhMb2FkLmluZm8AIfkECQoAAAAsAAAAABAAEAAABVAgII5kaZ6lMBRsISqEYKqtmBTGkRo1\
gPAG2YiAW40EPAJphVCREIUBiYWijqwpLIBJWviiJGLwukiSkDiEqDUmHXiJNWsgPBMU8nkdxe+P\
QgAh+QQJCgAAACwAAAAAEAAQAAAFaCAgikfSjGgqGsXgqKhAJEV9wMDB1sUCCIyUgGVoFBIMwcAg\
QBEKTMCA8GNRR4MCQrTltlA1mCA8qjVVZFG2K+givqNnlDCoFq6ioY9BaxDPI0EACzxQNzAHPAkE\
gDAOWQY4Kg0JhyMhACH5BAkKAAAALAAAAAAQABAAAAVgICCOI/OQKNoUSCoKxFAUCS2khzHvM4EK\
OkPLMUu0SISC4QZILpgk2bF5AAgQvtHMBdhqCy6BV0RA3A5ZAKIwSAkWhSwwjkLUCo5rEErm7QxV\
PzV3AwR8JGsNXCkPDIshACH5BAkKAAAALAAAAAAQABAAAAVSICCOZGmegCCUAjEUxUCog0MeBqwX\
xmuLgpwBIULkYD8AgbcCvpAjRYI4ekJRWIBju22idgsSIqEg6cKjYIFghg1VRqYZctwZDqVw6ynz\
Zv+AIQAh+QQJCgAAACwAAAAAEAAQAAAFYCAgjmRpnqhADEUxEMLJGG1dGMe5GEiM0IbYKAcQigQ0\
AiDnKCwYpkYhYUgAWFOYCIFtNaS1AWJESLQGAKq5YWIsCo4lgHAzFmPEI7An+A3sIgc0NjdQJipY\
L4AojI0kIQAh+QQJCgAAACwAAAAAEAAQAAAFXyAgjmRpnqhIFMVACKZANADCssZBIkmRCLCaoWAI\
Pm6FBUkwJIgYjR5LN7INSCwHwYktdIMqgoNFGhQQpMMt0WCoiGDAAvkQMYkIGLCXQI8OQzdoCC8x\
BGYFXCmLjCYhADsAAAAAAAAAAAA=");
	ajaxBusyIcon.id = 'mmBusyIcon';
    var communityIds = new Array();
    var communityIdsStr="";

    getSigAndPost();
    
    function getSigAndPost()
    {	
		$.get("Scrapbook", function(data)
		{
	    		if(!data.indexOf('textPanel') > -1)
    			{
    				SIG=data.match(/signature. value="(.+)"/i)[1];
    				POST=data.match(/name="POST_TOKEN" value="([^"]+)/i)[1];
    			}
    			else
    			{
    				getSigAndPost();
    			}	  
		});
    }
    

    function startModeration(statusMsg,spamUserIds,currentActionList)
    {

		communityIdsStr = GM_getValue("SavedModCmmList", null );
		if(communityIdsStr == null || communityIdsStr == "")
		{
			alert("The community list is empty. \nPlease add a list of communities to include by clicking on the 'Settings' button.");
			return;
		}

		communityIds=communityIdsStr.split(",");

		uidIndex=0;
		cmmIndex=0;
		actionIndex=0;
		$('#statusMsg').css('display','block');
		$('#statusMsgBody').parent().css({'display':'block', 'border': '#D3BE96 1px solid', 'background-color': '#FCF0D8'});
		messageNode = document.createTextNode(statusMsg);	
		$('#statusMsgBody').append(messageNode)		
		.append(ajaxBusyIcon);		
		actionIndex=0;
		performModerationAction(currentActionList,spamUserIds);

    }
    
    function performModerationAction(actionList,spamUserIds)
    {	
		send_data="POST_TOKEN="+encodeURIComponent(POST)+"&signature="+encodeURIComponent(SIG)+"&Action."+actionList[actionIndex];
		
		GM_xmlhttpRequest(
		{
			method: 'POST',
			url: 'http://'+document.domain+'/CommMemberManage?cmm='+communityIds[cmmIndex]+'&uid='+spamUserIds[uidIndex],
			headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type' : 'application/x-www-form-urlencoded'},
			data: send_data,
			onload: function(rd) 
			{
				//rd.responseText
				cmmIndex++;
				if( cmmIndex < communityIds.length )
				{
					performModerationAction(actionList,spamUserIds);
				}
				else
				if(uidIndex < spamUserIds.length-1)
				{
					uidIndex++;	
					cmmIndex=0;
					performModerationAction(actionList,spamUserIds);
				}
				else
				if( actionIndex < actionList.length-1)
				{
					actionIndex++;
					uidIndex=0;	
					cmmIndex=0;
					performModerationAction(actionList,spamUserIds);						
				}
				else //Current actions finished! Remove the busy icon and refresh the display.
				{							
					var areaToRefresh = '.displaytable'; //item to Refresh in community topics page.
					if( /CommMemberManage/.test(document.location.href) ) 
					{
						areaToRefresh = '.listitem h3:first'; //item to Refresh in member-manage page.
					}							
					
					$.get(document.location, function(data)
					{
						$(data).find(areaToRefresh).each( function()
						{
							$(document).contents().find(areaToRefresh).html($(this).html() );	
							$('#mmBusyIcon').remove();
							$('#statusMsgBody').append(document.createTextNode("Done!"));		
							$('#statusMsgBody').append(document.createElement("br"));											
						});				
					});
							
				}
			},
			onerror: function (XMLHttpRequest, textStatus, errorThrown) 
			{
				$('#mmBusyIcon').remove();
				$('#statusMsgBody').append(document.createTextNode("There was an error, please try again later!"));		
				$('#statusMsgBody').append(document.createElement("br"));
			}						
			
			
		});			
		
	}
    
    if( /CommTopics/.test(document.location.href) ) //For community topics page.
    {      
		var i=0    

		if( $('.icnmanage').length == 0 ) //if no no manage previlage is there, return
			return;
    
    	spamUserIds=new Array();
    	  	
    	var actionSelect= createModerationDropDown();
    	
    	var k=0;
		$(actionSelect)[0].addEventListener('change', function()
    	{ 	   
			$("#mboxfull :checkbox ").each( function()
			{
				if (this.checked ==  true)
				{
					spamUserIds[k] = $(this).parent().parent().html().match(/uid=([^"]+)/i)[1];
					k++;
				}
			});

			if (k > 0 )
    		{
				 
				if(confirm("Are you sure you want to "+$("#modSelect option:selected").text()+"?") )
				{
					var currentActionList = $('#modSelect').val().split("+");
					statusMsg = modActionStatus[ $('#modSelect')[0].selectedIndex - 1 ];
	    			startModeration(statusMsg,spamUserIds,currentActionList);
				}
    		}
    		else
    		{
    			alert("No topic selected!");		
    		}
			
			$('#modSelect')[0].selectedIndex=0;
			
    	}, false);

		//Add the select menu and the settings button at the top of forum		
		document.getElementsByName("topicsForm")[0].childNodes[6].appendChild(actionSelect);
		document.getElementsByName("topicsForm")[0].childNodes[6].appendChild(moderationSettingsButton());        	
    }
    else //for member manage page
    if( /CommMemberManage/.test(document.location.href) ) 
    {
    
    	var userId=document.location.href.split("=")[2];
    	var actionSelect= createModerationDropDown();
		$(actionSelect)[0].addEventListener('change', function()    	
    	{ 	
			if(confirm("Are you sure you want to "+$("#modSelect option:selected").text()+"?") )
			{
				spamUserIds= new Array(userId);
				var currentActionList = $('#modSelect').val().split("+");
				statusMsg = modActionStatus[ $('#modSelect')[0].selectedIndex - 1 ];
	    		startModeration(statusMsg,spamUserIds,currentActionList);
			}
			$('#modSelect')[0].selectedIndex=0;			
    	}, false);

		$('.para').append(actionSelect);        
		$('.para').append(moderationSettingsButton());        		
    }
	else
    if( /CommSpamFolder/.test(document.location.href) ) 
    {
  		var i=0    

		if( $('.icnmanage').length == 0 ) //if no no manage previlage is there, return
			return;
    
    	spamUserIds=new Array();
    	  	
    	var actionSelect= createModerationDropDown();
    	
    	var k=0;
		$(actionSelect)[0].addEventListener('change', function()
    	{ 	   
			$("#mboxfull :checkbox ").each( function()
			{
				if (this.checked ==  true)
				{
					spamUserIds[k] = $(this).parent().parent().html().match(/uid=([^"]+)/i)[1];
					k++;

				}
			});

			if (k > 0 )
    		{
				 
				if(confirm("Are you sure you want to "+$("#modSelect option:selected").text()+"?") )
				{
					var currentActionList = $('#modSelect').val().split("+");
					statusMsg = modActionStatus[ $('#modSelect')[0].selectedIndex - 1 ];
	    			startModeration(statusMsg,spamUserIds,currentActionList);
				}
    		}
    		else
    		{
    			alert("No topic selected!");		
    		}
			
			$('#modSelect')[0].selectedIndex=0;
			
    	}, false);

		//Add the select menu and the settings button at the top of forum		
		document.getElementsByName("spamFolderForm")[0].childNodes[6].appendChild(actionSelect);
		document.getElementsByName("spamFolderForm")[0].childNodes[6].appendChild(moderationSettingsButton());   
  
    }
	
	
	function createModerationDropDown()
	{
		var modDropDown = document.createElement('select');
    	modDropDown.value='Moderation action:';
    	modDropDown.id='modSelect';
    	var modDisOption=new Option("Mass-Moderation Action...");
    	modDisOption.disabled="disabled";
    	modDisOption.selected="selected";
    	modDropDown.options.add(modDisOption);
    
    	for(i=0;i<modActionValues.length;i++)
    	{
    		var modOption=new Option(modActionLabels[i]);
    		modOption.value=modActionValues[i];
    		modDropDown.options.add(modOption);
    	}    
		return modDropDown;
	}	
	
	
}




	function moderationSettingsButton() //Returns a moderation settings button :)
	{
		//Create the moderation settings button
		modSettingsButton=document.createElement('input');
		modSettingsButton.type='button';
		modSettingsButton.value='Settings';

		//create span for settings panel
		mySpan=document.createElement('span');
		mySpan.id='settingsSpan';

		//Create the script settings-page to accept list of communities.	
		modSettingsButton.addEventListener('click', function()	
		{	
			document.body.appendChild(mySpan);
			mySpan.setAttribute("style", "position:fixed; width:100%; height: 100%; z-index: 1; left: 0; top: 0; background-color: #D9E6F7; opacity:.75; display:none;");			
			
			var myDiv = document.createElement('div');
			myDiv.id = 'settingsDiv';
			myDiv.setAttribute("style","position:absolute; width:750px; height: 500px; z-index: 2; background-color: #dae; border:2px solid #0ad; text-align:center; display:none;");
			document.body.appendChild(myDiv);
			myDiv.innerHTML="<h3>Orkut Mass Community Manager Settings</h3>\
			<div style='padding-left:100px; height:430px;'>\
				<div style='float:left;'> <h4>Your Communities:</h4> <select id='allCmmList' style='width: 220px; height:360px;' multiple></select></div>\
				<div style='float:left; margin-top:180px;'> <input type='button' id='addCmm' value='Add >>'> <br/> <input type='button' id='removeCmm' value='<< Remove'></div>\
				<div style='float:left;'> <h4> Selected Communities:</h4> <select id='cmmList' style='width: 220px; height:360px;' multiple></select></div><br/>\
			</div>\
			<div style='text-align:center;'><input type='button' value='Cancel' onclick='javascript:$(\"#settingsSpan\").remove(); $(\"#settingsDiv\").remove();'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' id='SaveCmmList' value='Save and Exit'></div>\
			";


			$.get('http://'+document.domain+'/Communities', function(data){
				$(data).find('#subPage0 a').each( function()
				{
					var elOption = document.createElement('option');
					$( elOption).val( $(this).attr('href').split('=')[1] ); //Only take the community id as value.										
					$( elOption).text( $(this).text() );					
					$('#allCmmList').append(elOption);
				});				
			});
			
			communityIdsStr = GM_getValue("SavedModCmmList", null );
			communityNamesStr = GM_getValue("SavedModCmmNames", null );


			
			var i=0;
			
			if(communityIdsStr!= null && communityIdsStr != "")
			{		
				//Add list of existing communities to the select list
				communityIds=communityIdsStr.split(",");

				if(communityNamesStr == null )
				{
					GM_setValue("SavedModCmmNames", communityIds.join("|||") ); //Save the existing community ids as names.
					communityNames = communityIds;
				}
				else
				{
					communityNames = communityNamesStr.split("|||");
				}				
				
				$(communityIds).each( function()
				{
					var elOptNew = document.createElement('option');
					$(elOptNew).val( this );					
					$(elOptNew).text( communityNames[i++] );					
					$('#cmmList').append(elOptNew);			
				});
			}

			//Add Selected community ID for mass moderation
			$('#addCmm').bind('click',function()
			{
			
				if( $('#allCmmList option:selected').length == 0 )
				{
					alert("Please select one or more communities from the list");
				}
				else
				{
					$('#allCmmList option:selected').each( function () {					
						$('#cmmList').append( $(this).clone() );					
					});
				
				}
				
			});


			$('#removeCmm').bind('click',function removeOptionSelected()
			{
				$('#cmmList option:selected').remove();
			});

			
			document.getElementById('SaveCmmList').addEventListener('click',function removeOptionSelected()
			{
				var cmmList = new Array();			
				var cmmNames = new Array();			
				$('#cmmList option').each( function()
				{	
					//Commenting out below line because 
					//Jquery val() function is broken for FF 3.5
				//	cmmList.push( $(this).val() );			
					cmmList.push( $(this)[0].value );
					cmmNames.push( $(this).text());			
				});						
				//Save list of communities with our greasemonkey.
				GM_setValue("SavedModCmmList", cmmList.join() );
				GM_setValue("SavedModCmmNames", cmmNames.join("|||") );
				$("#settingsSpan").remove(); 
				$("#settingsDiv").remove();

			},false);
			
			$('#settingsDiv').css('top', parseInt( ($(window).height() - $('#settingsDiv').height() ) / 2) );
			$('#settingsDiv').css('left', parseInt( ($(window).width() - $('#settingsDiv').width() ) / 2) );
			$('#settingsSpan').show();
			$('#settingsDiv').show();				
			

		}, false);
		
		return modSettingsButton;	
	}

// End Community Manager


// Add Remover

var css = "#rhs_ads{display: none !important;}#top_ads{display: none !important;}";
if (typeof GM_addStyle != "undefined") {
GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
addStyle(css);
} else {
var heads = document.getElementsByTagName("head");
if (heads.length > 0) {
var node = document.createElement("style");
node.type = "text/css";
node.appendChild(document.createTextNode(css));
heads[0].appendChild(node);
}
}

// Add Remover

// Better Orkut

(function(){var _jQuery=window.jQuery,_$=window.$;var jQuery=window.jQuery=window.$=function(selector,context){return new jQuery.fn.init(selector,context)};var quickExpr=/^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/,isSimple=/^.[^:#\[\.]*$/,undefined;jQuery.fn=jQuery.prototype={init:function(selector,context){selector=selector||document;if(selector.nodeType){this[0]=selector;this.length=1;return this}if(typeof selector=="string"){var match=quickExpr.exec(selector);if(match&&(match[1]||!context)){if(match[1])selector=jQuery.clean([match[1]],context);else{var elem=document.getElementById(match[3]);if(elem){if(elem.id!=match[3])return jQuery().find(selector);return jQuery(elem)}selector=[]}}else return jQuery(context).find(selector)}else if(jQuery.isFunction(selector))return jQuery(document)[jQuery.fn.ready?"ready":"load"](selector);return this.setArray(jQuery.makeArray(selector))},jquery:"1.2.6",size:function(){return this.length},length:0,get:function(num){return num==undefined?jQuery.makeArray(this):this[num]},pushStack:function(elems){var ret=jQuery(elems);ret.prevObject=this;return ret},setArray:function(elems){this.length=0;Array.prototype.push.apply(this,elems);return this},each:function(callback,args){return jQuery.each(this,callback,args)},index:function(elem){var ret=-1;return jQuery.inArray(elem&&elem.jquery?elem[0]:elem,this)},attr:function(name,value,type){var options=name;if(name.constructor==String)if(value===undefined)return this[0]&&jQuery[type||"attr"](this[0],name);else{options={};options[name]=value}return this.each(function(i){for(name in options)jQuery.attr(type?this.style:this,name,jQuery.prop(this,options[name],type,i,name))})},css:function(key,value){if((key=='width'||key=='height')&&parseFloat(value)<0)value=undefined;return this.attr(key,value,"curCSS")},text:function(text){if(typeof text!="object"&&text!=null)return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(text));var ret="";jQuery.each(text||this,function(){jQuery.each(this.childNodes,function(){if(this.nodeType!=8)ret+=this.nodeType!=1?this.nodeValue:jQuery.fn.text([this])})});return ret},wrapAll:function(html){if(this[0])jQuery(html,this[0].ownerDocument).clone().insertBefore(this[0]).map(function(){var elem=this;while(elem.firstChild)elem=elem.firstChild;return elem}).append(this);return this},wrapInner:function(html){return this.each(function(){jQuery(this).contents().wrapAll(html)})},wrap:function(html){return this.each(function(){jQuery(this).wrapAll(html)})},append:function(){return this.domManip(arguments,true,false,function(elem){if(this.nodeType==1)this.appendChild(elem)})},prepend:function(){return this.domManip(arguments,true,true,function(elem){if(this.nodeType==1)this.insertBefore(elem,this.firstChild)})},before:function(){return this.domManip(arguments,false,false,function(elem){this.parentNode.insertBefore(elem,this)})},after:function(){return this.domManip(arguments,false,true,function(elem){this.parentNode.insertBefore(elem,this.nextSibling)})},end:function(){return this.prevObject||jQuery([])},find:function(selector){var elems=jQuery.map(this,function(elem){return jQuery.find(selector,elem)});return this.pushStack(/[^+>] [^+>]/.test(selector)||selector.indexOf("..")>-1?jQuery.unique(elems):elems)},clone:function(events){var ret=this.map(function(){if(jQuery.browser.msie&&!jQuery.isXMLDoc(this)){var clone=this.cloneNode(true),container=document.createElement("div");container.appendChild(clone);return jQuery.clean([container.innerHTML])[0]}else return this.cloneNode(true)});var clone=ret.find("*").andSelf().each(function(){if(this[expando]!=undefined)this[expando]=null});if(events===true)this.find("*").andSelf().each(function(i){if(this.nodeType==3)return;var events=jQuery.data(this,"events");for(var type in events)for(var handler in events[type])jQuery.event.add(clone[i],type,events[type][handler],events[type][handler].data)});return ret},filter:function(selector){return this.pushStack(jQuery.isFunction(selector)&&jQuery.grep(this,function(elem,i){return selector.call(elem,i)})||jQuery.multiFilter(selector,this))},not:function(selector){if(selector.constructor==String)if(isSimple.test(selector))return this.pushStack(jQuery.multiFilter(selector,this,true));else selector=jQuery.multiFilter(selector,this);var isArrayLike=selector.length&&selector[selector.length-1]!==undefined&&!selector.nodeType;return this.filter(function(){return isArrayLike?jQuery.inArray(this,selector)<0:this!=selector})},add:function(selector){return this.pushStack(jQuery.unique(jQuery.merge(this.get(),typeof selector=='string'?jQuery(selector):jQuery.makeArray(selector))))},is:function(selector){return!!selector&&jQuery.multiFilter(selector,this).length>0},hasClass:function(selector){return this.is("."+selector)},val:function(value){if(value==undefined){if(this.length){var elem=this[0];if(jQuery.nodeName(elem,"select")){var index=elem.selectedIndex,values=[],options=elem.options,one=elem.type=="select-one";if(index<0)return null;for(var i=one?index:0,max=one?index+1:options.length;i<max;i++){var option=options[i];if(option.selected){value=jQuery.browser.msie&&!option.attributes.value.specified?option.text:option.value;if(one)return value;values.push(value)}}return values}else return(this[0].value||"").replace(/\r/g,"")}return undefined}if(value.constructor==Number)value+='';return this.each(function(){if(this.nodeType!=1)return;if(value.constructor==Array&&/radio|checkbox/.test(this.type))this.checked=(jQuery.inArray(this.value,value)>=0||jQuery.inArray(this.name,value)>=0);else if(jQuery.nodeName(this,"select")){var values=jQuery.makeArray(value);jQuery("option",this).each(function(){this.selected=(jQuery.inArray(this.value,values)>=0||jQuery.inArray(this.text,values)>=0)});if(!values.length)this.selectedIndex=-1}else this.value=value})},html:function(value){return value==undefined?(this[0]?this[0].innerHTML:null):this.empty().append(value)},replaceWith:function(value){return this.after(value).remove()},eq:function(i){return this.slice(i,i+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments))},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem)}))},andSelf:function(){return this.add(this.prevObject)},data:function(key,value){var parts=key.split(".");parts[1]=parts[1]?"."+parts[1]:"";if(value===undefined){var data=this.triggerHandler("getData"+parts[1]+"!",[parts[0]]);if(data===undefined&&this.length)data=jQuery.data(this[0],key);return data===undefined&&parts[1]?this.data(parts[0]):data}else return this.trigger("setData"+parts[1]+"!",[parts[0],value]).each(function(){jQuery.data(this,key,value)})},removeData:function(key){return this.each(function(){jQuery.removeData(this,key)})},domManip:function(args,table,reverse,callback){var clone=this.length>1,elems;return this.each(function(){if(!elems){elems=jQuery.clean(args,this.ownerDocument);if(reverse)elems.reverse()}var obj=this;if(table&&jQuery.nodeName(this,"table")&&jQuery.nodeName(elems[0],"tr"))obj=this.getElementsByTagName("tbody")[0]||this.appendChild(this.ownerDocument.createElement("tbody"));var scripts=jQuery([]);jQuery.each(elems,function(){var elem=clone?jQuery(this).clone(true)[0]:this;if(jQuery.nodeName(elem,"script"))scripts=scripts.add(elem);else{if(elem.nodeType==1)scripts=scripts.add(jQuery("script",elem).remove());callback.call(obj,elem)}});scripts.each(evalScript)})}};jQuery.fn.init.prototype=jQuery.fn;function evalScript(i,elem){if(elem.src)jQuery.ajax({url:elem.src,async:false,dataType:"script"});else jQuery.globalEval(elem.text||elem.textContent||elem.innerHTML||"");if(elem.parentNode)elem.parentNode.removeChild(elem)}function now(){return+new Date}jQuery.extend=jQuery.fn.extend=function(){var target=arguments[0]||{},i=1,length=arguments.length,deep=false,options;if(target.constructor==Boolean){deep=target;target=arguments[1]||{};i=2}if(typeof target!="object"&&typeof target!="function")target={};if(length==i){target=this;--i}for(;i<length;i++)if((options=arguments[i])!=null)for(var name in options){var src=target[name],copy=options[name];if(target===copy)continue;if(deep&&copy&&typeof copy=="object"&&!copy.nodeType)target[name]=jQuery.extend(deep,src||(copy.length!=null?[]:{}),copy);else if(copy!==undefined)target[name]=copy}return target};var expando="jQuery"+now(),uuid=0,windowData={},exclude=/z-?index|font-?weight|opacity|zoom|line-?height/i,defaultView=document.defaultView||{};jQuery.extend({noConflict:function(deep){window.$=_$;if(deep)window.jQuery=_jQuery;return jQuery},isFunction:function(fn){return!!fn&&typeof fn!="string"&&!fn.nodeName&&fn.constructor!=Array&&/^[\s[]?function/.test(fn+"")},isXMLDoc:function(elem){return elem.documentElement&&!elem.body||elem.tagName&&elem.ownerDocument&&!elem.ownerDocument.body},globalEval:function(data){data=jQuery.trim(data);if(data){var head=document.getElementsByTagName("head")[0]||document.documentElement,script=document.createElement("script");script.type="text/javascript";if(jQuery.browser.msie)script.text=data;else script.appendChild(document.createTextNode(data));head.insertBefore(script,head.firstChild);head.removeChild(script)}},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()==name.toUpperCase()},cache:{},data:function(elem,name,data){elem=elem==window?windowData:elem;var id=elem[expando];if(!id)id=elem[expando]=++uuid;if(name&&!jQuery.cache[id])jQuery.cache[id]={};if(data!==undefined)jQuery.cache[id][name]=data;return name?jQuery.cache[id][name]:id},removeData:function(elem,name){elem=elem==window?windowData:elem;var id=elem[expando];if(name){if(jQuery.cache[id]){delete jQuery.cache[id][name];name="";for(name in jQuery.cache[id])break;if(!name)jQuery.removeData(elem)}}else{try{delete elem[expando]}catch(e){if(elem.removeAttribute)elem.removeAttribute(expando)}delete jQuery.cache[id]}},each:function(object,callback,args){var name,i=0,length=object.length;if(args){if(length==undefined){for(name in object)if(callback.apply(object[name],args)===false)break}else for(;i<length;)if(callback.apply(object[i++],args)===false)break}else{if(length==undefined){for(name in object)if(callback.call(object[name],name,object[name])===false)break}else for(var value=object[0];i<length&&callback.call(value,i,value)!==false;value=object[++i]){}}return object},prop:function(elem,value,type,i,name){if(jQuery.isFunction(value))value=value.call(elem,i);return value&&value.constructor==Number&&type=="curCSS"&&!exclude.test(name)?value+"px":value},className:{add:function(elem,classNames){jQuery.each((classNames||"").split(/\s+/),function(i,className){if(elem.nodeType==1&&!jQuery.className.has(elem.className,className))elem.className+=(elem.className?" ":"")+className})},remove:function(elem,classNames){if(elem.nodeType==1)elem.className=classNames!=undefined?jQuery.grep(elem.className.split(/\s+/),function(className){return!jQuery.className.has(classNames,className)}).join(" "):""},has:function(elem,className){return jQuery.inArray(className,(elem.className||elem).toString().split(/\s+/))>-1}},swap:function(elem,options,callback){var old={};for(var name in options){old[name]=elem.style[name];elem.style[name]=options[name]}callback.call(elem);for(var name in options)elem.style[name]=old[name]},css:function(elem,name,force){if(name=="width"||name=="height"){var val,props={position:"absolute",visibility:"hidden",display:"block"},which=name=="width"?["Left","Right"]:["Top","Bottom"];function getWH(){val=name=="width"?elem.offsetWidth:elem.offsetHeight;var padding=0,border=0;jQuery.each(which,function(){padding+=parseFloat(jQuery.curCSS(elem,"padding"+this,true))||0;border+=parseFloat(jQuery.curCSS(elem,"border"+this+"Width",true))||0});val-=Math.round(padding+border)}if(jQuery(elem).is(":visible"))getWH();else jQuery.swap(elem,props,getWH);return Math.max(0,val)}return jQuery.curCSS(elem,name,force)},curCSS:function(elem,name,force){var ret,style=elem.style;function color(elem){if(!jQuery.browser.safari)return false;var ret=defaultView.getComputedStyle(elem,null);return!ret||ret.getPropertyValue("color")==""}if(name=="opacity"&&jQuery.browser.msie){ret=jQuery.attr(style,"opacity");return ret==""?"1":ret}if(jQuery.browser.opera&&name=="display"){var save=style.outline;style.outline="0 solid black";style.outline=save}if(name.match(/float/i))name=styleFloat;if(!force&&style&&style[name])ret=style[name];else if(defaultView.getComputedStyle){if(name.match(/float/i))name="float";name=name.replace(/([A-Z])/g,"-$1").toLowerCase();var computedStyle=defaultView.getComputedStyle(elem,null);if(computedStyle&&!color(elem))ret=computedStyle.getPropertyValue(name);else{var swap=[],stack=[],a=elem,i=0;for(;a&&color(a);a=a.parentNode)stack.unshift(a);for(;i<stack.length;i++)if(color(stack[i])){swap[i]=stack[i].style.display;stack[i].style.display="block"}ret=name=="display"&&swap[stack.length-1]!=null?"none":(computedStyle&&computedStyle.getPropertyValue(name))||"";for(i=0;i<swap.length;i++)if(swap[i]!=null)stack[i].style.display=swap[i]}if(name=="opacity"&&ret=="")ret="1"}else if(elem.currentStyle){var camelCase=name.replace(/\-(\w)/g,function(all,letter){return letter.toUpperCase()});ret=elem.currentStyle[name]||elem.currentStyle[camelCase];if(!/^\d+(px)?$/i.test(ret)&&/^\d/.test(ret)){var left=style.left,rsLeft=elem.runtimeStyle.left;elem.runtimeStyle.left=elem.currentStyle.left;style.left=ret||0;ret=style.pixelLeft+"px";style.left=left;elem.runtimeStyle.left=rsLeft}}return ret},clean:function(elems,context){var ret=[];context=context||document;if(typeof context.createElement=='undefined')context=context.ownerDocument||context[0]&&context[0].ownerDocument||document;jQuery.each(elems,function(i,elem){if(!elem)return;if(elem.constructor==Number)elem+='';if(typeof elem=="string"){elem=elem.replace(/(<(\w+)[^>]*?)\/>/g,function(all,front,tag){return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?all:front+"></"+tag+">"});var tags=jQuery.trim(elem).toLowerCase(),div=context.createElement("div");var wrap=!tags.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!tags.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||tags.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!tags.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!tags.indexOf("<td")||!tags.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!tags.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||jQuery.browser.msie&&[1,"div<div>","</div>"]||[0,"",""];div.innerHTML=wrap[1]+elem+wrap[2];while(wrap[0]--)div=div.lastChild;if(jQuery.browser.msie){var tbody=!tags.indexOf("<table")&&tags.indexOf("<tbody")<0?div.firstChild&&div.firstChild.childNodes:wrap[1]=="<table>"&&tags.indexOf("<tbody")<0?div.childNodes:[];for(var j=tbody.length-1;j>=0;--j)if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length)tbody[j].parentNode.removeChild(tbody[j]);if(/^\s/.test(elem))div.insertBefore(context.createTextNode(elem.match(/^\s*/)[0]),div.firstChild)}elem=jQuery.makeArray(div.childNodes)}if(elem.length===0&&(!jQuery.nodeName(elem,"form")&&!jQuery.nodeName(elem,"select")))return;if(elem[0]==undefined||jQuery.nodeName(elem,"form")||elem.options)ret.push(elem);else ret=jQuery.merge(ret,elem)});return ret},attr:function(elem,name,value){if(!elem||elem.nodeType==3||elem.nodeType==8)return undefined;var notxml=!jQuery.isXMLDoc(elem),set=value!==undefined,msie=jQuery.browser.msie;name=notxml&&jQuery.props[name]||name;if(elem.tagName){var special=/href|src|style/.test(name);if(name=="selected"&&jQuery.browser.safari)elem.parentNode.selectedIndex;if(name in elem&&notxml&&!special){if(set){if(name=="type"&&jQuery.nodeName(elem,"input")&&elem.parentNode)throw"type property can't be changed";elem[name]=value}if(jQuery.nodeName(elem,"form")&&elem.getAttributeNode(name))return elem.getAttributeNode(name).nodeValue;return elem[name]}if(msie&&notxml&&name=="style")return jQuery.attr(elem.style,"cssText",value);if(set)elem.setAttribute(name,""+value);var attr=msie&&notxml&&special?elem.getAttribute(name,2):elem.getAttribute(name);return attr===null?undefined:attr}if(msie&&name=="opacity"){if(set){elem.zoom=1;elem.filter=(elem.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(value)+''=="NaN"?"":"alpha(opacity="+value*100+")")}return elem.filter&&elem.filter.indexOf("opacity=")>=0?(parseFloat(elem.filter.match(/opacity=([^)]*)/)[1])/100)+'':""}name=name.replace(/-([a-z])/ig,function(all,letter){return letter.toUpperCase()});if(set)elem[name]=value;return elem[name]},trim:function(text){return(text||"").replace(/^\s+|\s+$/g,"")},makeArray:function(array){var ret=[];if(array!=null){var i=array.length;if(i==null||array.split||array.setInterval||array.call)ret[0]=array;else while(i)ret[--i]=array[i]}return ret},inArray:function(elem,array){for(var i=0,length=array.length;i<length;i++)if(array[i]===elem)return i;return-1},merge:function(first,second){var i=0,elem,pos=first.length;if(jQuery.browser.msie){while(elem=second[i++])if(elem.nodeType!=8)first[pos++]=elem}else while(elem=second[i++])first[pos++]=elem;return first},unique:function(array){var ret=[],done={};try{for(var i=0,length=array.length;i<length;i++){var id=jQuery.data(array[i]);if(!done[id]){done[id]=true;ret.push(array[i])}}}catch(e){ret=array}return ret},grep:function(elems,callback,inv){var ret=[];for(var i=0,length=elems.length;i<length;i++)if(!inv!=!callback(elems[i],i))ret.push(elems[i]);return ret},map:function(elems,callback){var ret=[];for(var i=0,length=elems.length;i<length;i++){var value=callback(elems[i],i);if(value!=null)ret[ret.length]=value}return ret.concat.apply([],ret)}});var userAgent=navigator.userAgent.toLowerCase();jQuery.browser={version:(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:/msie/.test(userAgent)&&!/opera/.test(userAgent),mozilla:/mozilla/.test(userAgent)&&!/(compatible|webkit)/.test(userAgent)};var styleFloat=jQuery.browser.msie?"styleFloat":"cssFloat";jQuery.extend({boxModel:!jQuery.browser.msie||document.compatMode=="CSS1Compat",props:{"for":"htmlFor","class":"className","float":styleFloat,cssFloat:styleFloat,styleFloat:styleFloat,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing"}});jQuery.each({parent:function(elem){return elem.parentNode},parents:function(elem){return jQuery.dir(elem,"parentNode")},next:function(elem){return jQuery.nth(elem,2,"nextSibling")},prev:function(elem){return jQuery.nth(elem,2,"previousSibling")},nextAll:function(elem){return jQuery.dir(elem,"nextSibling")},prevAll:function(elem){return jQuery.dir(elem,"previousSibling")},siblings:function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem)},children:function(elem){return jQuery.sibling(elem.firstChild)},contents:function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes)}},function(name,fn){jQuery.fn[name]=function(selector){var ret=jQuery.map(this,fn);if(selector&&typeof selector=="string")ret=jQuery.multiFilter(selector,ret);return this.pushStack(jQuery.unique(ret))}});jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(){var args=arguments;return this.each(function(){for(var i=0,length=args.length;i<length;i++)jQuery(args[i])[original](this)})}});jQuery.each({removeAttr:function(name){jQuery.attr(this,name,"");if(this.nodeType==1)this.removeAttribute(name)},addClass:function(classNames){jQuery.className.add(this,classNames)},removeClass:function(classNames){jQuery.className.remove(this,classNames)},toggleClass:function(classNames){jQuery.className[jQuery.className.has(this,classNames)?"remove":"add"](this,classNames)},remove:function(selector){if(!selector||jQuery.filter(selector,[this]).r.length){jQuery("*",this).add(this).each(function(){jQuery.event.remove(this);jQuery.removeData(this)});if(this.parentNode)this.parentNode.removeChild(this)}},empty:function(){jQuery(">*",this).remove();while(this.firstChild)this.removeChild(this.firstChild)}},function(name,fn){jQuery.fn[name]=function(){return this.each(fn,arguments)}});jQuery.each(["Height","Width"],function(i,name){var type=name.toLowerCase();jQuery.fn[type]=function(size){return this[0]==window?jQuery.browser.opera&&document.body["client"+name]||jQuery.browser.safari&&window["inner"+name]||document.compatMode=="CSS1Compat"&&document.documentElement["client"+name]||document.body["client"+name]:this[0]==document?Math.max(Math.max(document.body["scroll"+name],document.documentElement["scroll"+name]),Math.max(document.body["offset"+name],document.documentElement["offset"+name])):size==undefined?(this.length?jQuery.css(this[0],type):null):this.css(type,size.constructor==String?size:size+"px")}});function num(elem,prop){return elem[0]&&parseInt(jQuery.curCSS(elem[0],prop,true),10)||0}var chars=jQuery.browser.safari&&parseInt(jQuery.browser.version)<417?"(?:[\\w*_-]|\\\\.)":"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)",quickChild=new RegExp("^>\\s*("+chars+"+)"),quickID=new RegExp("^("+chars+"+)(#)("+chars+"+)"),quickClass=new RegExp("^([#.]?)("+chars+"*)");jQuery.extend({expr:{"":function(a,i,m){return m[2]=="*"||jQuery.nodeName(a,m[2])},"#":function(a,i,m){return a.getAttribute("id")==m[2]},":":{lt:function(a,i,m){return i<m[3]-0},gt:function(a,i,m){return i>m[3]-0},nth:function(a,i,m){return m[3]-0==i},eq:function(a,i,m){return m[3]-0==i},first:function(a,i){return i==0},last:function(a,i,m,r){return i==r.length-1},even:function(a,i){return i%2==0},odd:function(a,i){return i%2},"first-child":function(a){return a.parentNode.getElementsByTagName("*")[0]==a},"last-child":function(a){return jQuery.nth(a.parentNode.lastChild,1,"previousSibling")==a},"only-child":function(a){return!jQuery.nth(a.parentNode.lastChild,2,"previousSibling")},parent:function(a){return a.firstChild},empty:function(a){return!a.firstChild},contains:function(a,i,m){return(a.textContent||a.innerText||jQuery(a).text()||"").indexOf(m[3])>=0},visible:function(a){return"hidden"!=a.type&&jQuery.css(a,"display")!="none"&&jQuery.css(a,"visibility")!="hidden"},hidden:function(a){return"hidden"==a.type||jQuery.css(a,"display")=="none"||jQuery.css(a,"visibility")=="hidden"},enabled:function(a){return!a.disabled},disabled:function(a){return a.disabled},checked:function(a){return a.checked},selected:function(a){return a.selected||jQuery.attr(a,"selected")},text:function(a){return"text"==a.type},radio:function(a){return"radio"==a.type},checkbox:function(a){return"checkbox"==a.type},file:function(a){return"file"==a.type},password:function(a){return"password"==a.type},submit:function(a){return"submit"==a.type},image:function(a){return"image"==a.type},reset:function(a){return"reset"==a.type},button:function(a){return"button"==a.type||jQuery.nodeName(a,"button")},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},has:function(a,i,m){return jQuery.find(m[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},animated:function(a){return jQuery.grep(jQuery.timers,function(fn){return a==fn.elem}).length}}},parse:[/^(\[) *@?([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/,/^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/,new RegExp("^([:.#]*)("+chars+"+)")],multiFilter:function(expr,elems,not){var old,cur=[];while(expr&&expr!=old){old=expr;var f=jQuery.filter(expr,elems,not);expr=f.t.replace(/^\s*,\s*/,"");cur=not?elems=f.r:jQuery.merge(cur,f.r)}return cur},find:function(t,context){if(typeof t!="string")return[t];if(context&&context.nodeType!=1&&context.nodeType!=9)return[];context=context||document;var ret=[context],done=[],last,nodeName;while(t&&last!=t){var r=[];last=t;t=jQuery.trim(t);var foundToken=false,re=quickChild,m=re.exec(t);if(m){nodeName=m[1].toUpperCase();for(var i=0;ret[i];i++)for(var c=ret[i].firstChild;c;c=c.nextSibling)if(c.nodeType==1&&(nodeName=="*"||c.nodeName.toUpperCase()==nodeName))r.push(c);ret=r;t=t.replace(re,"");if(t.indexOf(" ")==0)continue;foundToken=true}else{re=/^([>+~])\s*(\w*)/i;if((m=re.exec(t))!=null){r=[];var merge={};nodeName=m[2].toUpperCase();m=m[1];for(var j=0,rl=ret.length;j<rl;j++){var n=m=="~"||m=="+"?ret[j].nextSibling:ret[j].firstChild;for(;n;n=n.nextSibling)if(n.nodeType==1){var id=jQuery.data(n);if(m=="~"&&merge[id])break;if(!nodeName||n.nodeName.toUpperCase()==nodeName){if(m=="~")merge[id]=true;r.push(n)}if(m=="+")break}}ret=r;t=jQuery.trim(t.replace(re,""));foundToken=true}}if(t&&!foundToken){if(!t.indexOf(",")){if(context==ret[0])ret.shift();done=jQuery.merge(done,ret);r=ret=[context];t=" "+t.substr(1,t.length)}else{var re2=quickID;var m=re2.exec(t);if(m){m=[0,m[2],m[3],m[1]]}else{re2=quickClass;m=re2.exec(t)}m[2]=m[2].replace(/\\/g,"");var elem=ret[ret.length-1];if(m[1]=="#"&&elem&&elem.getElementById&&!jQuery.isXMLDoc(elem)){var oid=elem.getElementById(m[2]);if((jQuery.browser.msie||jQuery.browser.opera)&&oid&&typeof oid.id=="string"&&oid.id!=m[2])oid=jQuery('[@id="'+m[2]+'"]',elem)[0];ret=r=oid&&(!m[3]||jQuery.nodeName(oid,m[3]))?[oid]:[]}else{for(var i=0;ret[i];i++){var tag=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];if(tag=="*"&&ret[i].nodeName.toLowerCase()=="object")tag="param";r=jQuery.merge(r,ret[i].getElementsByTagName(tag))}if(m[1]==".")r=jQuery.classFilter(r,m[2]);if(m[1]=="#"){var tmp=[];for(var i=0;r[i];i++)if(r[i].getAttribute("id")==m[2]){tmp=[r[i]];break}r=tmp}ret=r}t=t.replace(re2,"")}}if(t){var val=jQuery.filter(t,r);ret=r=val.r;t=jQuery.trim(val.t)}}if(t)ret=[];if(ret&&context==ret[0])ret.shift();done=jQuery.merge(done,ret);return done},classFilter:function(r,m,not){m=" "+m+" ";var tmp=[];for(var i=0;r[i];i++){var pass=(" "+r[i].className+" ").indexOf(m)>=0;if(!not&&pass||not&&!pass)tmp.push(r[i])}return tmp},filter:function(t,r,not){var last;while(t&&t!=last){last=t;var p=jQuery.parse,m;for(var i=0;p[i];i++){m=p[i].exec(t);if(m){t=t.substring(m[0].length);m[2]=m[2].replace(/\\/g,"");break}}if(!m)break;if(m[1]==":"&&m[2]=="not")r=isSimple.test(m[3])?jQuery.filter(m[3],r,true).r:jQuery(r).not(m[3]);else if(m[1]==".")r=jQuery.classFilter(r,m[2],not);else if(m[1]=="["){var tmp=[],type=m[3];for(var i=0,rl=r.length;i<rl;i++){var a=r[i],z=a[jQuery.props[m[2]]||m[2]];if(z==null||/href|src|selected/.test(m[2]))z=jQuery.attr(a,m[2])||'';if((type==""&&!!z||type=="="&&z==m[5]||type=="!="&&z!=m[5]||type=="^="&&z&&!z.indexOf(m[5])||type=="$="&&z.substr(z.length-m[5].length)==m[5]||(type=="*="||type=="~=")&&z.indexOf(m[5])>=0)^not)tmp.push(a)}r=tmp}else if(m[1]==":"&&m[2]=="nth-child"){var merge={},tmp=[],test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(m[3]=="even"&&"2n"||m[3]=="odd"&&"2n+1"||!/\D/.test(m[3])&&"0n+"+m[3]||m[3]),first=(test[1]+(test[2]||1))-0,last=test[3]-0;for(var i=0,rl=r.length;i<rl;i++){var node=r[i],parentNode=node.parentNode,id=jQuery.data(parentNode);if(!merge[id]){var c=1;for(var n=parentNode.firstChild;n;n=n.nextSibling)if(n.nodeType==1)n.nodeIndex=c++;merge[id]=true}var add=false;if(first==0){if(node.nodeIndex==last)add=true}else if((node.nodeIndex-last)%first==0&&(node.nodeIndex-last)/first>=0)add=true;if(add^not)tmp.push(node)}r=tmp}else{var fn=jQuery.expr[m[1]];if(typeof fn=="object")fn=fn[m[2]];if(typeof fn=="string")fn=eval("false||function(a,i){return "+fn+";}");r=jQuery.grep(r,function(elem,i){return fn(elem,i,m,r)},not)}}return{r:r,t:t}},dir:function(elem,dir){var matched=[],cur=elem[dir];while(cur&&cur!=document){if(cur.nodeType==1)matched.push(cur);cur=cur[dir]}return matched},nth:function(cur,result,dir,elem){result=result||1;var num=0;for(;cur;cur=cur[dir])if(cur.nodeType==1&&++num==result)break;return cur},sibling:function(n,elem){var r=[];for(;n;n=n.nextSibling){if(n.nodeType==1&&n!=elem)r.push(n)}return r}});jQuery.event={add:function(elem,types,handler,data){if(elem.nodeType==3||elem.nodeType==8)return;if(jQuery.browser.msie&&elem.setInterval)elem=window;if(!handler.guid)handler.guid=this.guid++;if(data!=undefined){var fn=handler;handler=this.proxy(fn,function(){return fn.apply(this,arguments)});handler.data=data}var events=jQuery.data(elem,"events")||jQuery.data(elem,"events",{}),handle=jQuery.data(elem,"handle")||jQuery.data(elem,"handle",function(){if(typeof jQuery!="undefined"&&!jQuery.event.triggered)return jQuery.event.handle.apply(arguments.callee.elem,arguments)});handle.elem=elem;jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");type=parts[0];handler.type=parts[1];var handlers=events[type];if(!handlers){handlers=events[type]={};if(!jQuery.event.special[type]||jQuery.event.special[type].setup.call(elem)===false){if(elem.addEventListener)elem.addEventListener(type,handle,false);else if(elem.attachEvent)elem.attachEvent("on"+type,handle)}}handlers[handler.guid]=handler;jQuery.event.global[type]=true});elem=null},guid:1,global:{},remove:function(elem,types,handler){if(elem.nodeType==3||elem.nodeType==8)return;var events=jQuery.data(elem,"events"),ret,index;if(events){if(types==undefined||(typeof types=="string"&&types.charAt(0)=="."))for(var type in events)this.remove(elem,type+(types||""));else{if(types.type){handler=types.handler;types=types.type}jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");type=parts[0];if(events[type]){if(handler)delete events[type][handler.guid];else for(handler in events[type])if(!parts[1]||events[type][handler].type==parts[1])delete events[type][handler];for(ret in events[type])break;if(!ret){if(!jQuery.event.special[type]||jQuery.event.special[type].teardown.call(elem)===false){if(elem.removeEventListener)elem.removeEventListener(type,jQuery.data(elem,"handle"),false);else if(elem.detachEvent)elem.detachEvent("on"+type,jQuery.data(elem,"handle"))}ret=null;delete events[type]}}})}for(ret in events)break;if(!ret){var handle=jQuery.data(elem,"handle");if(handle)handle.elem=null;jQuery.removeData(elem,"events");jQuery.removeData(elem,"handle")}}},trigger:function(type,data,elem,donative,extra){data=jQuery.makeArray(data);if(type.indexOf("!")>=0){type=type.slice(0,-1);var exclusive=true}if(!elem){if(this.global[type])jQuery("*").add([window,document]).trigger(type,data)}else{if(elem.nodeType==3||elem.nodeType==8)return undefined;var val,ret,fn=jQuery.isFunction(elem[type]||null),event=!data[0]||!data[0].preventDefault;if(event){data.unshift({type:type,target:elem,preventDefault:function(){},stopPropagation:function(){},timeStamp:now()});data[0][expando]=true}data[0].type=type;if(exclusive)data[0].exclusive=true;var handle=jQuery.data(elem,"handle");if(handle)val=handle.apply(elem,data);if((!fn||(jQuery.nodeName(elem,'a')&&type=="click"))&&elem["on"+type]&&elem["on"+type].apply(elem,data)===false)val=false;if(event)data.shift();if(extra&&jQuery.isFunction(extra)){ret=extra.apply(elem,val==null?data:data.concat(val));if(ret!==undefined)val=ret}if(fn&&donative!==false&&val!==false&&!(jQuery.nodeName(elem,'a')&&type=="click")){this.triggered=true;try{elem[type]()}catch(e){}}this.triggered=false}return val},handle:function(event){var val,ret,namespace,all,handlers;event=arguments[0]=jQuery.event.fix(event||window.event);namespace=event.type.split(".");event.type=namespace[0];namespace=namespace[1];all=!namespace&&!event.exclusive;handlers=(jQuery.data(this,"events")||{})[event.type];for(var j in handlers){var handler=handlers[j];if(all||handler.type==namespace){event.handler=handler;event.data=handler.data;ret=handler.apply(this,arguments);if(val!==false)val=ret;if(ret===false){event.preventDefault();event.stopPropagation()}}}return val},fix:function(event){if(event[expando]==true)return event;var originalEvent=event;event={originalEvent:originalEvent};var props="altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view wheelDelta which".split(" ");for(var i=props.length;i;i--)event[props[i]]=originalEvent[props[i]];event[expando]=true;event.preventDefault=function(){if(originalEvent.preventDefault)originalEvent.preventDefault();originalEvent.returnValue=false};event.stopPropagation=function(){if(originalEvent.stopPropagation)originalEvent.stopPropagation();originalEvent.cancelBubble=true};event.timeStamp=event.timeStamp||now();if(!event.target)event.target=event.srcElement||document;if(event.target.nodeType==3)event.target=event.target.parentNode;if(!event.relatedTarget&&event.fromElement)event.relatedTarget=event.fromElement==event.target?event.toElement:event.fromElement;if(event.pageX==null&&event.clientX!=null){var doc=document.documentElement,body=document.body;event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc.clientLeft||0);event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc.clientTop||0)}if(!event.which&&((event.charCode||event.charCode===0)?event.charCode:event.keyCode))event.which=event.charCode||event.keyCode;if(!event.metaKey&&event.ctrlKey)event.metaKey=event.ctrlKey;if(!event.which&&event.button)event.which=(event.button&1?1:(event.button&2?3:(event.button&4?2:0)));return event},proxy:function(fn,proxy){proxy.guid=fn.guid=fn.guid||proxy.guid||this.guid++;return proxy},special:{ready:{setup:function(){bindReady();return},teardown:function(){return}},mouseenter:{setup:function(){if(jQuery.browser.msie)return false;jQuery(this).bind("mouseover",jQuery.event.special.mouseenter.handler);return true},teardown:function(){if(jQuery.browser.msie)return false;jQuery(this).unbind("mouseover",jQuery.event.special.mouseenter.handler);return true},handler:function(event){if(withinElement(event,this))return true;event.type="mouseenter";return jQuery.event.handle.apply(this,arguments)}},mouseleave:{setup:function(){if(jQuery.browser.msie)return false;jQuery(this).bind("mouseout",jQuery.event.special.mouseleave.handler);return true},teardown:function(){if(jQuery.browser.msie)return false;jQuery(this).unbind("mouseout",jQuery.event.special.mouseleave.handler);return true},handler:function(event){if(withinElement(event,this))return true;event.type="mouseleave";return jQuery.event.handle.apply(this,arguments)}}}};jQuery.fn.extend({bind:function(type,data,fn){return type=="unload"?this.one(type,data,fn):this.each(function(){jQuery.event.add(this,type,fn||data,fn&&data)})},one:function(type,data,fn){var one=jQuery.event.proxy(fn||data,function(event){jQuery(this).unbind(event,one);return(fn||data).apply(this,arguments)});return this.each(function(){jQuery.event.add(this,type,one,fn&&data)})},unbind:function(type,fn){return this.each(function(){jQuery.event.remove(this,type,fn)})},trigger:function(type,data,fn){return this.each(function(){jQuery.event.trigger(type,data,this,true,fn)})},triggerHandler:function(type,data,fn){return this[0]&&jQuery.event.trigger(type,data,this[0],false,fn)},toggle:function(fn){var args=arguments,i=1;while(i<args.length)jQuery.event.proxy(fn,args[i++]);return this.click(jQuery.event.proxy(fn,function(event){this.lastToggle=(this.lastToggle||0)%i;event.preventDefault();return args[this.lastToggle++].apply(this,arguments)||false}))},hover:function(fnOver,fnOut){return this.bind('mouseenter',fnOver).bind('mouseleave',fnOut)},ready:function(fn){bindReady();if(jQuery.isReady)fn.call(document,jQuery);else jQuery.readyList.push(function(){return fn.call(this,jQuery)});return this}});jQuery.extend({isReady:false,readyList:[],ready:function(){if(!jQuery.isReady){jQuery.isReady=true;if(jQuery.readyList){jQuery.each(jQuery.readyList,function(){this.call(document)});jQuery.readyList=null}jQuery(document).triggerHandler("ready")}}});var readyBound=false;function bindReady(){if(readyBound)return;readyBound=true;if(document.addEventListener&&!jQuery.browser.opera)document.addEventListener("DOMContentLoaded",jQuery.ready,false);if(jQuery.browser.msie&&window==top)(function(){if(jQuery.isReady)return;try{document.documentElement.doScroll("left")}catch(error){setTimeout(arguments.callee,0);return}jQuery.ready()})();if(jQuery.browser.opera)document.addEventListener("DOMContentLoaded",function(){if(jQuery.isReady)return;for(var i=0;i<document.styleSheets.length;i++)if(document.styleSheets[i].disabled){setTimeout(arguments.callee,0);return}jQuery.ready()},false);if(jQuery.browser.safari){var numStyles;(function(){if(jQuery.isReady)return;if(document.readyState!="loaded"&&document.readyState!="complete"){setTimeout(arguments.callee,0);return}if(numStyles===undefined)numStyles=jQuery("style, link[rel=stylesheet]").length;if(document.styleSheets.length!=numStyles){setTimeout(arguments.callee,0);return}jQuery.ready()})()}jQuery.event.add(window,"load",jQuery.ready)}jQuery.each(("blur,focus,load,resize,scroll,unload,click,dblclick,"+"mousedown,mouseup,mousemove,mouseover,mouseout,change,select,"+"submit,keydown,keypress,keyup,error").split(","),function(i,name){jQuery.fn[name]=function(fn){return fn?this.bind(name,fn):this.trigger(name)}});var withinElement=function(event,elem){var parent=event.relatedTarget;while(parent&&parent!=elem)try{parent=parent.parentNode}catch(error){parent=elem}return parent==elem};jQuery(window).bind("unload",function(){jQuery("*").add(document).unbind()});jQuery.fn.extend({_load:jQuery.fn.load,load:function(url,params,callback){if(typeof url!='string')return this._load(url);var off=url.indexOf(" ");if(off>=0){var selector=url.slice(off,url.length);url=url.slice(0,off)}callback=callback||function(){};var type="GET";if(params)if(jQuery.isFunction(params)){callback=params;params=null}else{params=jQuery.param(params);type="POST"}var self=this;jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(res,status){if(status=="success"||status=="notmodified")self.html(selector?jQuery("<div/>").append(res.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(selector):res.responseText);self.each(callback,[res.responseText,status,res])}});return this},serialize:function(){return jQuery.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return jQuery.nodeName(this,"form")?jQuery.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password/i.test(this.type))}).map(function(i,elem){var val=jQuery(this).val();return val==null?null:val.constructor==Array?jQuery.map(val,function(val,i){return{name:elem.name,value:val}}):{name:elem.name,value:val}}).get()}});jQuery.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f)}});var jsc=now();jQuery.extend({get:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data=null}return jQuery.ajax({type:"GET",url:url,data:data,success:callback,dataType:type})},getScript:function(url,callback){return jQuery.get(url,null,callback,"script")},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json")},post:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data={}}return jQuery.ajax({type:"POST",url:url,data:data,success:callback,dataType:type})},ajaxSetup:function(settings){jQuery.extend(jQuery.ajaxSettings,settings)},ajaxSettings:{url:location.href,global:true,type:"GET",timeout:0,contentType:"application/x-www-form-urlencoded",processData:true,async:true,data:null,username:null,password:null,accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(s){s=jQuery.extend(true,s,jQuery.extend(true,{},jQuery.ajaxSettings,s));var jsonp,jsre=/=\?(&|$)/g,status,data,type=s.type.toUpperCase();if(s.data&&s.processData&&typeof s.data!="string")s.data=jQuery.param(s.data);if(s.dataType=="jsonp"){if(type=="GET"){if(!s.url.match(jsre))s.url+=(s.url.match(/\?/)?"&":"?")+(s.jsonp||"callback")+"=?"}else if(!s.data||!s.data.match(jsre))s.data=(s.data?s.data+"&":"")+(s.jsonp||"callback")+"=?";s.dataType="json"}if(s.dataType=="json"&&(s.data&&s.data.match(jsre)||s.url.match(jsre))){jsonp="jsonp"+jsc++;if(s.data)s.data=(s.data+"").replace(jsre,"="+jsonp+"$1");s.url=s.url.replace(jsre,"="+jsonp+"$1");s.dataType="script";window[jsonp]=function(tmp){data=tmp;success();complete();window[jsonp]=undefined;try{delete window[jsonp]}catch(e){}if(head)head.removeChild(script)}}if(s.dataType=="script"&&s.cache==null)s.cache=false;if(s.cache===false&&type=="GET"){var ts=now();var ret=s.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+ts+"$2");s.url=ret+((ret==s.url)?(s.url.match(/\?/)?"&":"?")+"_="+ts:"")}if(s.data&&type=="GET"){s.url+=(s.url.match(/\?/)?"&":"?")+s.data;s.data=null}if(s.global&&!jQuery.active++)jQuery.event.trigger("ajaxStart");var remote=/^(?:\w+:)?\/\/([^\/?#]+)/;if(s.dataType=="script"&&type=="GET"&&remote.test(s.url)&&remote.exec(s.url)[1]!=location.host){var head=document.getElementsByTagName("head")[0];var script=document.createElement("script");script.src=s.url;if(s.scriptCharset)script.charset=s.scriptCharset;if(!jsonp){var done=false;script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){done=true;success();complete();head.removeChild(script)}}}head.appendChild(script);return undefined}var requestDone=false;var xhr=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();if(s.username)xhr.open(type,s.url,s.async,s.username,s.password);else xhr.open(type,s.url,s.async);try{if(s.data)xhr.setRequestHeader("Content-Type",s.contentType);if(s.ifModified)xhr.setRequestHeader("If-Modified-Since",jQuery.lastModified[s.url]||"Thu, 01 Jan 1970 00:00:00 GMT");xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");xhr.setRequestHeader("Accept",s.dataType&&s.accepts[s.dataType]?s.accepts[s.dataType]+", */*":s.accepts._default)}catch(e){}if(s.beforeSend&&s.beforeSend(xhr,s)===false){s.global&&jQuery.active--;xhr.abort();return false}if(s.global)jQuery.event.trigger("ajaxSend",[xhr,s]);var onreadystatechange=function(isTimeout){if(!requestDone&&xhr&&(xhr.readyState==4||isTimeout=="timeout")){requestDone=true;if(ival){clearInterval(ival);ival=null}status=isTimeout=="timeout"&&"timeout"||!jQuery.httpSuccess(xhr)&&"error"||s.ifModified&&jQuery.httpNotModified(xhr,s.url)&&"notmodified"||"success";if(status=="success"){try{data=jQuery.httpData(xhr,s.dataType,s.dataFilter)}catch(e){status="parsererror"}}if(status=="success"){var modRes;try{modRes=xhr.getResponseHeader("Last-Modified")}catch(e){}if(s.ifModified&&modRes)jQuery.lastModified[s.url]=modRes;if(!jsonp)success()}else jQuery.handleError(s,xhr,status);complete();if(s.async)xhr=null}};if(s.async){var ival=setInterval(onreadystatechange,13);if(s.timeout>0)setTimeout(function(){if(xhr){xhr.abort();if(!requestDone)onreadystatechange("timeout")}},s.timeout)}try{xhr.send(s.data)}catch(e){jQuery.handleError(s,xhr,null,e)}if(!s.async)onreadystatechange();function success(){if(s.success)s.success(data,status);if(s.global)jQuery.event.trigger("ajaxSuccess",[xhr,s])}function complete(){if(s.complete)s.complete(xhr,status);if(s.global)jQuery.event.trigger("ajaxComplete",[xhr,s]);if(s.global&&!--jQuery.active)jQuery.event.trigger("ajaxStop")}return xhr},handleError:function(s,xhr,status,e){if(s.error)s.error(xhr,status,e);if(s.global)jQuery.event.trigger("ajaxError",[xhr,s,e])},active:0,httpSuccess:function(xhr){try{return!xhr.status&&location.protocol=="file:"||(xhr.status>=200&&xhr.status<300)||xhr.status==304||xhr.status==1223||jQuery.browser.safari&&xhr.status==undefined}catch(e){}return false},httpNotModified:function(xhr,url){try{var xhrRes=xhr.getResponseHeader("Last-Modified");return xhr.status==304||xhrRes==jQuery.lastModified[url]||jQuery.browser.safari&&xhr.status==undefined}catch(e){}return false},httpData:function(xhr,type,filter){var ct=xhr.getResponseHeader("content-type"),xml=type=="xml"||!type&&ct&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;if(xml&&data.documentElement.tagName=="parsererror")throw"parsererror";if(filter)data=filter(data,type);if(type=="script")jQuery.globalEval(data);if(type=="json")data=eval("("+data+")");return data},param:function(a){var s=[];if(a.constructor==Array||a.jquery)jQuery.each(a,function(){s.push(encodeURIComponent(this.name)+"="+encodeURIComponent(this.value))});else for(var j in a)if(a[j]&&a[j].constructor==Array)jQuery.each(a[j],function(){s.push(encodeURIComponent(j)+"="+encodeURIComponent(this))});else s.push(encodeURIComponent(j)+"="+encodeURIComponent(jQuery.isFunction(a[j])?a[j]():a[j]));return s.join("&").replace(/%20/g,"+")}});jQuery.fn.extend({show:function(speed,callback){return speed?this.animate({height:"show",width:"show",opacity:"show"},speed,callback):this.filter(":hidden").each(function(){this.style.display=this.oldblock||"";if(jQuery.css(this,"display")=="none"){var elem=jQuery("<"+this.tagName+" />").appendTo("body");this.style.display=elem.css("display");if(this.style.display=="none")this.style.display="block";elem.remove()}}).end()},hide:function(speed,callback){return speed?this.animate({height:"hide",width:"hide",opacity:"hide"},speed,callback):this.filter(":visible").each(function(){this.oldblock=this.oldblock||jQuery.css(this,"display");this.style.display="none"}).end()},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2){return jQuery.isFunction(fn)&&jQuery.isFunction(fn2)?this._toggle.apply(this,arguments):fn?this.animate({height:"toggle",width:"toggle",opacity:"toggle"},fn,fn2):this.each(function(){jQuery(this)[jQuery(this).is(":hidden")?"show":"hide"]()})},slideDown:function(speed,callback){return this.animate({height:"show"},speed,callback)},slideUp:function(speed,callback){return this.animate({height:"hide"},speed,callback)},slideToggle:function(speed,callback){return this.animate({height:"toggle"},speed,callback)},fadeIn:function(speed,callback){return this.animate({opacity:"show"},speed,callback)},fadeOut:function(speed,callback){return this.animate({opacity:"hide"},speed,callback)},fadeTo:function(speed,to,callback){return this.animate({opacity:to},speed,callback)},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);return this[optall.queue===false?"each":"queue"](function(){if(this.nodeType!=1)return false;var opt=jQuery.extend({},optall),p,hidden=jQuery(this).is(":hidden"),self=this;for(p in prop){if(prop[p]=="hide"&&hidden||prop[p]=="show"&&!hidden)return opt.complete.call(this);if(p=="height"||p=="width"){opt.display=jQuery.css(this,"display");opt.overflow=this.style.overflow}}if(opt.overflow!=null)this.style.overflow="hidden";opt.curAnim=jQuery.extend({},prop);jQuery.each(prop,function(name,val){var e=new jQuery.fx(self,opt,name);if(/toggle|show|hide/.test(val))e[val=="toggle"?hidden?"show":"hide":val](prop);else{var parts=val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),start=e.cur(true)||0;if(parts){var end=parseFloat(parts[2]),unit=parts[3]||"px";if(unit!="px"){self.style[name]=(end||1)+unit;start=((end||1)/e.cur(true))*start;self.style[name]=start+unit}if(parts[1])end=((parts[1]=="-="?-1:1)*end)+start;e.custom(start,end,unit)}else e.custom(start,val,"")}});return true})},queue:function(type,fn){if(jQuery.isFunction(type)||(type&&type.constructor==Array)){fn=type;type="fx"}if(!type||(typeof type=="string"&&!fn))return queue(this[0],type);return this.each(function(){if(fn.constructor==Array)queue(this,type,fn);else{queue(this,type).push(fn);if(queue(this,type).length==1)fn.call(this)}})},stop:function(clearQueue,gotoEnd){var timers=jQuery.timers;if(clearQueue)this.queue([]);this.each(function(){for(var i=timers.length-1;i>=0;i--)if(timers[i].elem==this){if(gotoEnd)timers[i](true);timers.splice(i,1)}});if(!gotoEnd)this.dequeue();return this}});var queue=function(elem,type,array){if(elem){type=type||"fx";var q=jQuery.data(elem,type+"queue");if(!q||array)q=jQuery.data(elem,type+"queue",jQuery.makeArray(array))}return q};jQuery.fn.dequeue=function(type){type=type||"fx";return this.each(function(){var q=queue(this,type);q.shift();if(q.length)q[0].call(this)})};jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&speed.constructor==Object?speed:{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&easing.constructor!=Function&&easing};opt.duration=(opt.duration&&opt.duration.constructor==Number?opt.duration:jQuery.fx.speeds[opt.duration])||jQuery.fx.speeds.def;opt.old=opt.complete;opt.complete=function(){if(opt.queue!==false)jQuery(this).dequeue();if(jQuery.isFunction(opt.old))opt.old.call(this)};return opt},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff*p},swing:function(p,n,firstNum,diff){return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum}},timers:[],timerId:null,fx:function(elem,options,prop){this.options=options;this.elem=elem;this.prop=prop;if(!options.orig)options.orig={}}});jQuery.fx.prototype={update:function(){if(this.options.step)this.options.step.call(this.elem,this.now,this);(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);if(this.prop=="height"||this.prop=="width")this.elem.style.display="block"},cur:function(force){if(this.elem[this.prop]!=null&&this.elem.style[this.prop]==null)return this.elem[this.prop];var r=parseFloat(jQuery.css(this.elem,this.prop,force));return r&&r>-10000?r:parseFloat(jQuery.curCSS(this.elem,this.prop))||0},custom:function(from,to,unit){this.startTime=now();this.start=from;this.end=to;this.unit=unit||this.unit||"px";this.now=this.start;this.pos=this.state=0;this.update();var self=this;function t(gotoEnd){return self.step(gotoEnd)}t.elem=this.elem;jQuery.timers.push(t);if(jQuery.timerId==null){jQuery.timerId=setInterval(function(){var timers=jQuery.timers;for(var i=0;i<timers.length;i++)if(!timers[i]())timers.splice(i--,1);if(!timers.length){clearInterval(jQuery.timerId);jQuery.timerId=null}},13)}},show:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.show=true;this.custom(0,this.cur());if(this.prop=="width"||this.prop=="height")this.elem.style[this.prop]="1px";jQuery(this.elem).show()},hide:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(gotoEnd){var t=now();if(gotoEnd||t>this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var done=true;for(var i in this.options.curAnim)if(this.options.curAnim[i]!==true)done=false;if(done){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(jQuery.css(this.elem,"display")=="none")this.elem.style.display="block"}if(this.options.hide)this.elem.style.display="none";if(this.options.hide||this.options.show)for(var p in this.options.curAnim)jQuery.attr(this.elem.style,p,this.options.orig[p])}if(done)this.options.complete.call(this.elem);return false}else{var n=t-this.startTime;this.state=n/this.options.duration;this.pos=jQuery.easing[this.options.easing||(jQuery.easing.swing?"swing":"linear")](this.state,n,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};jQuery.extend(jQuery.fx,{speeds:{slow:600,fast:200,def:400},step:{scrollLeft:function(fx){fx.elem.scrollLeft=fx.now},scrollTop:function(fx){fx.elem.scrollTop=fx.now},opacity:function(fx){jQuery.attr(fx.elem.style,"opacity",fx.now)},_default:function(fx){fx.elem.style[fx.prop]=fx.now+fx.unit}}});jQuery.fn.offset=function(){var left=0,top=0,elem=this[0],results;if(elem)with(jQuery.browser){var parent=elem.parentNode,offsetChild=elem,offsetParent=elem.offsetParent,doc=elem.ownerDocument,safari2=safari&&parseInt(version)<522&&!/adobeair/i.test(userAgent),css=jQuery.curCSS,fixed=css(elem,"position")=="fixed";if(elem.getBoundingClientRect){var box=elem.getBoundingClientRect();add(box.left+Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),box.top+Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));add(-doc.documentElement.clientLeft,-doc.documentElement.clientTop)}else{add(elem.offsetLeft,elem.offsetTop);while(offsetParent){add(offsetParent.offsetLeft,offsetParent.offsetTop);if(mozilla&&!/^t(able|d|h)$/i.test(offsetParent.tagName)||safari&&!safari2)border(offsetParent);if(!fixed&&css(offsetParent,"position")=="fixed")fixed=true;offsetChild=/^body$/i.test(offsetParent.tagName)?offsetChild:offsetParent;offsetParent=offsetParent.offsetParent}while(parent&&parent.tagName&&!/^body|html$/i.test(parent.tagName)){if(!/^inline|table.*$/i.test(css(parent,"display")))add(-parent.scrollLeft,-parent.scrollTop);if(mozilla&&css(parent,"overflow")!="visible")border(parent);parent=parent.parentNode}if((safari2&&(fixed||css(offsetChild,"position")=="absolute"))||(mozilla&&css(offsetChild,"position")!="absolute"))add(-doc.body.offsetLeft,-doc.body.offsetTop);if(fixed)add(Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),Math.max(doc.documentElement.scrollTop,doc.body.scrollTop))}results={top:top,left:left}}function border(elem){add(jQuery.curCSS(elem,"borderLeftWidth",true),jQuery.curCSS(elem,"borderTopWidth",true))}function add(l,t){left+=parseInt(l,10)||0;top+=parseInt(t,10)||0}return results};jQuery.fn.extend({position:function(){var left=0,top=0,results;if(this[0]){var offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=/^body|html$/i.test(offsetParent[0].tagName)?{top:0,left:0}:offsetParent.offset();offset.top-=num(this,'marginTop');offset.left-=num(this,'marginLeft');parentOffset.top+=num(offsetParent,'borderTopWidth');parentOffset.left+=num(offsetParent,'borderLeftWidth');results={top:offset.top-parentOffset.top,left:offset.left-parentOffset.left}}return results},offsetParent:function(){var offsetParent=this[0].offsetParent;while(offsetParent&&(!/^body|html$/i.test(offsetParent.tagName)&&jQuery.css(offsetParent,'position')=='static'))offsetParent=offsetParent.offsetParent;return jQuery(offsetParent)}});jQuery.each(['Left','Top'],function(i,name){var method='scroll'+name;jQuery.fn[method]=function(val){if(!this[0])return;return val!=undefined?this.each(function(){this==window||this==document?window.scrollTo(!i?val:jQuery(window).scrollLeft(),i?val:jQuery(window).scrollTop()):this[method]=val}):this[0]==window||this[0]==document?self[i?'pageYOffset':'pageXOffset']||jQuery.boxModel&&document.documentElement[method]||document.body[method]:this[0][method]}});jQuery.each(["Height","Width"],function(i,name){var tl=i?"Left":"Top",br=i?"Right":"Bottom";jQuery.fn["inner"+name]=function(){return this[name.toLowerCase()]()+num(this,"padding"+tl)+num(this,"padding"+br)};jQuery.fn["outer"+name]=function(margin){return this["inner"+name]()+num(this,"border"+tl+"Width")+num(this,"border"+br+"Width")+(margin?num(this,"margin"+tl)+num(this,"margin"+br):0)}})})();
// json2 2008-09-01 (http://www.json.org/json2.js)
if(!this.JSON){JSON={}}(function(){function f(n){return n<10?'0'+n:n}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z'};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapeable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapeable.lastIndex=0;return escapeable.test(string)?'"'+string.replace(escapeable,function(a){var c=meta[a];if(typeof c==='string'){return c}return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key)}if(typeof rep==='function'){value=rep.call(holder,key,value)}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null'}gap+=indent;partial=[];if(typeof value.length==='number'&&!value.propertyIsEnumerable('length')){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null'}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' '}}else if(typeof space==='string'){indent=space}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value})}}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j}throw new SyntaxError('JSON.parse');}}})();
// hoverIntent r5 2007.03.27 (http://cherne.net/brian/resources/jquery.hoverIntent.html)
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);


String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}

function isEmpty(o) {
    var i, v;
    if (typeof(o) === 'object') {
        for (i in o) {
            v = o[i];
            if (v !== undefined && typeof(v) !== 'function') {
                return false;
            }
        }
    }
    return true;
}

function getArgs(url, arg_key) {
	var arg_strings, args = {}, i, key, val;
       
	if(arg_key) {
		return url.match(new RegExp(arg_key+'=([0-9]+)'))[1];
	}
	
	arg_strings = url.split('?')[1];
	if(!arg_strings)
		return args;
	else
		arg_strings = arg_strings.split('&');
	for(i in arg_strings) {
		[key, val] = arg_strings[i].split('=');
		args[key] = val;
	}
	return args;
}

function getPageSkinCSS() {
	var skin_css;
	$('head style').each(function() {
		if($(this).text().match(/@import url\("([^"]*)"\)/g)) {
			skin_css = RegExp.lastParen;
			return false;
		}
	});
	return skin_css;
}

function changeCSS(old_css, new_css) {
	$('head style').each(function() {
		$(this).text($(this).text().replace('@import url("'+old_css+'");', '@import url("'+new_css+'");'));
	});
}

function makeOrkutButton(text, id) {
	id = (typeof id == 'undefined')?(''):('id="'+id+'"');
	return '<span class="grabtn"><a class="btn" '+id+' href="javascript:;">'+text+'</a></span><span class="btnboxr"><img height="1" width="5" alt="" src="http://img1.orkut.com/img/b.gif/></span>';
}

function makeOrkutModule(id) {
	return '<table id="'+id+'" class="module" cellspacing="0" cellpadding="0"> <tr><td class="topl_g"/><td class="topr_g"/></tr> <tr><td class="boxmidlrg"/><td class="boxmidr"/></tr> <tr><td class="botl"/><td class="botr"/></tr> </table>';
}

function getObjectValue(name) {
	return JSON.parse(GM_getValue(name, '{}'));
}

function setObjectValue(name, value) {
	GM_setValue(name, JSON.stringify(value));
}

function jsonFormDefaultValues(json_form) {
	var vals = {}, key;
	for(key in json_form) {
		vals[key] = json_form[key]['value'];
	}
	return vals;
}

function jsonFormToHtml(json_form, vals) {
	var code = '', key;
	for(key in json_form) {
		code += '<div class="form-item">';
		if(json_form[key]['type'] == 'checkbox') {
			code += '<input id="bo-'+key+'" name="'+key+'" type="checkbox" '+(vals[key]?'checked="checked"':'')+'/>';
			code += '<label class="form-item-label" for="bo-'+key+'">'+json_form[key]['label']+'</label>';
		}
		else if(json_form[key]['type'] == 'text') {
			code += '<label class="form-item-label" for="bo-'+key+'">'+json_form[key]['label']+'</label>';
			code += '<input id="bo-'+key+'" name="'+key+'" type="text" value="'+vals[key]+'"/>';
		}
		else if(json_form[key]['type'] == 'textarea') {
			code += '<p class="form-item-label" style="float:left;margin-right:3px;">'+json_form[key]['label']+'</p>';
			code += '<textarea name="'+key+'">'+vals[key]+'</textarea>';
		}
		else if(json_form[key]['type'] == 'div') {
			code += '<div id="'+json_form[key]['id']+'"></div>';
		}
		code += '</div>';
		if(typeof json_form[key]['no_divi'] == 'undefined')
			code += '<div class="form-item-divi"></div>';
	}
	return code;
}

function lastPageLinks(page) {
	$('.displaytable a[href^=/Main#CommMsgs]').each(function(i) {
		var count;
		if(page == 'Community')
			count = $('.displaytable tr:eq('+(i+1)+') td:eq(2)').text();
		else
			count = $('.displaytable .ac:even:eq('+i+')').text();
		if(count < 11)
			return;
		$(this).before('<a style="float:right;font-size:85%" href="'+this.href+'&na=2&nst='+(count-9)+'">(last)</a>');
	});
}

function forumLinks(page) {
	if(page == 'Communities') {
		$('.displaytable a').each(function() {
			var comm_id = getArgs(this.href, 'cmm');
			$(this).before('<a style="float:right;font-size:85%" href="/Main#CommTopics?cmm='+comm_id+'">(forum)</a>');
		});
	}
	else if(page == 'Home') {
		$('tbody:has(.topl_g h2:contains("my communities")) .boxmid .boxgrid .thumbbox').each(function(i) {
			var comm_id = getArgs($(this).find('.thumb a').attr('href'), 'cmm');
			$(this).append('<a style="padding:2 2 2 2;float:right;font-size:85%" href="/Main#CommTopics?cmm='+comm_id+'">(forum)</a>');
		});
	}
}

function widenTopicsTable() {
	$('.displaytable th:lt(5)').each(function(i) {
		var widths = ['3%', '45%', '20%', '10%', '12%'];
		$(this).attr('width', widths[i]);
	});
    $('.displaytable td').css('overflow', 'hidden')
}

function qreplyAndQuote(comm_id, thread_id, quote_template) {
	$('.parabtns:last')
	.prepend('<div id="bo-qreply" style="padding:5px"><textarea id="bo-qreply-txtbox" rows="10" style="width:100%"></textarea></div>')
	.find('div:first')
	.hide()
	.append(makeOrkutButton('post', 'bo-post-link'))
	.after(makeOrkutButton('quick reply', 'bo-qreply-link'));
	
	$('#bo-qreply-link').click(function() {
		$('#bo-qreply').slideToggle('slow');
	});
	
	$('#bo-post-link').click(function() {
		var body = encodeURIComponent($('#bo-qreply-txtbox').val()),
			frm = $('form').get(1);
			frm.action = '/CommMsgPost?cmm=' + comm_id + '&tid=' + thread_id + '&bodyText=' + body + '&Action.submit';
			frm.submit();
	});

	$('.listitem .rfdte')
	.append(makeOrkutButton('quote'))
	.find('a:last')
	.click(function() {
		var i, templ, j, line,
			qt = '',
			cont = $(this).parent().parent().parent(),
			qt_arr = cont.find('.para').html().split('<br>');
		for(i in qt_arr) { // Message Filters
			qt_arr[i] = qt_arr[i].replace(/<a\s+.*href=(?:'|")([^'"]*)(?:'|").*>(?:http|ftp|https):\/\/[\w\-_]+(?:\.[\w\-_]+)+(?:[\w\-\.,@?^=%&amp;:\/~\+#]*)<\/a>/ig, '*link*')
						.replace(/(<([^>]+)>)/ig, '')
						.replace(/^\s*|\s*$/g, '');
		}
		templ = quote_template;
		templ = templ.split('\n');
		for(i in templ) { // Apply quote to template
			templ[i] = templ[i].replace(/\[username\]/i, cont.find('h3:first a').text());
			templ[i] = templ[i].replace(/\[time\]/i, cont.find('.rfdte').contents()[0].nodeValue.trim());
			line = '';
			if(templ[i].match(/\[quote\]/i)) {
				for(j in qt_arr)
				line += templ[i].replace(/\[quote\]/i, qt_arr[j]) + '\n';
			}
			else
				line = templ[i] + '\n';
			qt += line;
		}
		$('#bo-qreply-txtbox').val($('#bo-qreply-txtbox').val() + qt);
		$('.parabtns:last').find('div:first').show('slow');
	});
}

function linkTruncate() {
	$('.listitem .para a').each(function(i) {
		var txt = $(this).text();
		if(txt.length > 50 && txt.match(/(?:http|ftp|https):\/\/[\w\-_]+(?:\.[\w\-_]+)+(?:[\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])/)) {
			txt = txt.slice(0, 47) + '...';
			$(this).text(txt);
		}
	});
}

function manageSkin(uid, user) {
	var css_skin = GM_getValue('user_skin_'+user),
		current_skin = getPageSkinCSS();
	
	if(uid) {
		if(uid != user) {
			if(css_skin && (css_skin != current_skin))
				changeCSS(current_skin, css_skin);
		}
	}
	else {
		if(current_skin != css_skin)
			GM_setValue('user_skin_'+user, current_skin);
	}
}

function updateCommunityInfo(comm_id, user) {
	var info = getObjectValue('comm_info_'+user),
		comm_name = $('.username a').text(),
		comm_image = $('.userimg img').attr('src'),
		users_comm_list = getObjectValue('comm_list_'+user);
	
	if(!info[comm_id])
		info[comm_id] = {name:'', image:'', visits:0};
	info[comm_id].visits++;
	if(info[comm_id].name != comm_name)
		info[comm_id].name = comm_name;
	if(info[comm_id].image != comm_image)
		info[comm_id].image = comm_image;
	setObjectValue('comm_info_'+user, info)
}

function myCommunitiesBox(user) {
	var info = getObjectValue('comm_info_'+user),
		list = [],
		comm_id;
	for(comm_id in info)
		list.push([comm_id, info[comm_id].visits]);
	list.sort(function(a, b){return b[1]-a[1]});
	$('tbody:has(.topl_g h2:contains("my communities")) .boxmid .boxgrid .thumbbox:lt('+list.length+')').each(function(i) {
		$(this).find('.thumb a').attr('href', '/Main#Community?cmm='+list[i][0]);
		$(this).find('.thumb img').attr({src:info[list[i][0]]['image'], title:info[list[i][0]]['name']}).css({width:'90%', height:'90%'});
		$(this).find('.uname a').attr('href', '/Main#Community?cmm='+list[i][0]).text(info[list[i][0]]['name']+' ['+info[list[i][0]]['visits']+']');
	});
}

function settingsEditor(json_form, settings, page_url, user) {
	$('.intabs')
	.append('<li><span class="ltab"></span><a href="javascript:;">Better Orkut</a></li>')
	.find('a:last')
	.click(function() {
		$('.intabs .sel')
		.html('<span class="ltab"></span><a href="'+page_url+'">'+$('.intabs .sel').text()+'</a>')
		.removeClass('sel');

		$('.intabs li:last')
		.html('<span class="ltab"></span>'+$('.intabs li:last a').text())
		.addClass('sel');

		$('#settingscontainer')
		.empty()
		.append(jsonFormToHtml(json_form, settings))
		.append(makeOrkutButton('Save Settings', 'bo-save-button'))
		.append('<div style="color:red;text-align:center" id="bo-notif"></div>')
		.find('div:last').hide();

		$('#bo-clear-stats')
		.css({'text-align':'right'})
		.append(makeOrkutButton('Clear Stats'))
		.find('a')
		.click(function() {
			if(window.confirm("Are you sure you want to Clear Community Stats?")) {
				setObjectValue('comm_info_'+user, {});
				$('#bo-notif')
				.html('<b>All Community informations have been cleared!!</b>')
				.show().stop().fadeTo(0, 1).fadeOut(5000);
			}
		});

		$('.form-item').addClass('listdark');
		$('.form-item-divi').addClass('listdivi');
		$('.form-item-label').css({'margin':'3px', 'font-weight':'bold'});
		$('#settingscontainer textarea').attr({cols:'50', rows:'5'});
		$('.parabtns').hide();
		$('.listdivi:last').hide().prev().hide();

		$('#bo-save-button').click(function() {
			var values = {};
			$('#settingscontainer :input').each(function () {
				if($(this).attr('type') == 'checkbox')
					values[$(this).attr('name')] = this.checked;
				else
					values[$(this).attr('name')] = $(this).val();
			});
			setObjectValue('settings_'+user, values);
			$('#bo-notif')
			.html('<b>Your Settings have been saved succesfully!!</b>')
			.show().stop().fadeTo(0, 1).fadeOut(5000);
		})
	});
}

function jumpToLast() {
	var count = $('.boxmidlrg b:odd:first').text(), url;
	url = window.location.href.replace('na=4', 'na=2');
	url += '&nst=' + (count-9);
	window.location.href = url;
}

function checkUpdates(user) {
	var time = parseInt(new Date().getTime().toString().substring(0, 10));
	if( (time - GM_getValue('last_update_checked_'+user, 0)) < 24*60*60 )
		return;
	GM_xmlhttpRequest({
		method:'GET',
		url:'http://pipes.yahoo.com/pipes/pipe.run?_id=BG6w1dOa3RG6cqbJBR50VA&_render=json&userscript_id='+userscripts_id,
		headers:{'User-Agent':'Mozilla/5.0', 'Accept':'text/xml'},
		onload:function(response) {
			var feed = JSON.parse(response.responseText);

			if(feed.value.items[0].content == script_version)
				return;

			$('body')
			.append('<div id="bo-update" style="position:fixed;top:0px;right:0px;width:150px;background-color:#FCFDDE;border:1px solid #DDDDDD;"></p><a style="font-weight:bold" target="_blank" href="http://userscripts.org/scripts/show/'+userscripts_id+'">Better Orkut '+feed.value.items[0].content+' Available</a></p><p><a href="javascript:;">close</a></p></div>');
			$('#bo-update a:last').click(function() {
				GM_setValue('last_update_checked_'+user, time);
				$('#bo-update').hide();
			});
		}
	});
}

function adBlock() {
	$('tbody:has(.topl_g h2:contains("advertisement"))').parent().hide();
}

function makeScrapBox(user) {
	$('body')
	.append('<div id="bo-scrap-box-overlay" style="z-index:100001;text-align:left;color:white;opacity:0.7;position:fixed;top:0px;left:0px;width:100%;height:100%;background:black;"><b>click anywhere to close</b></div>'+makeOrkutModule('bo-scrap-box'));
	
	$('#bo-scrap-box-overlay').click(function() {
		$('#bo-scrap-box').remove();
		$(this).remove();
	});
	
	$('#bo-scrap-box').css({
		'z-index':100002,
		'position':'fixed',
		'width':'30%',
		'top':'35%',
		'left':'35%'
	})
	
	$('#bo-scrap-box .topl_g').append('<h2>Send Scrap</h2>');
	$('#bo-scrap-box .boxmidlrg').append('<p style="margin:5px;"><textarea style="width:100%"></textarea></p><p style="display:none;margin:5px;"><span style="color:red"></span>Enter the text that you see in the image below<br/><img/><br/><input id="bo-captcha" value=""/></p>'+makeOrkutButton('post scrap', 'bo-scrap-button'));
	$('#bo-scrap-box .boxmidlrg textarea').focus();
	$('#bo-scrap-button').click(function() {
		var post_token = $('#lowBandwidthForm input[name=POST_TOKEN]').val(),
			signature  = $('#lowBandwidthForm input[name=signature]').val(),
			scrap_text = $('#bo-scrap-box .boxmidlrg textarea').val(),
			data = 'POST_TOKEN='+encodeURIComponent(post_token)+'&scrapText='+encodeURIComponent(scrap_text)+'&toUserId='+encodeURIComponent(user)+'&signature='+encodeURIComponent(signature)+'&Action.submit',
			url  = 'http://'+window.location.hostname+'/Scrapbook?uid='+user;
		
		if($('#bo-captcha').val() != '')
			data += '&cs='+encodeURIComponent($('#bo-captcha').val());
		$('#bo-scrap-button').hide().after('<span>Posting Scrap..</span>');
		
		GM_xmlhttpRequest({
			method:'POST',
			url:url,
			headers:{'User-Agent':'Mozilla/5.0', 'Accept':'text/html', 'Content-type':'application/x-www-form-urlencoded'},
			data:data,
			onload:function(response) {
				var msg = '', captcha_img;
				if(response.responseText.indexOf('captcha') == 0) {
					captcha_img = response.responseText.match(/(\/CaptchaImage\?xid=[0-9]+)/)[1];
					if(response.responseText.indexOf('formerror') >= 0) {
						$('#bo-scrap-box .boxmidlrg p:odd:first span').html('The text you entered did not match the text shown<br/>');
					}
					$('#bo-captcha').val('');
					$('#bo-scrap-box .boxmidlrg p:first').hide();
					$('#bo-scrap-box .boxmidlrg p:odd:first').show().find('img').attr('src', captcha_img);
					$('#bo-scrap-button').text('confirm').show().next().remove();
					return;
				}
				else if(response.responseText == 'ok\n')
					msg = '<b>Success!</b> Your message was successfully sent. <a href="/Main#Scrapbook?uid='+user+'">Scrapbook</a>';
				else
					msg = '<b>Sorry!</b> Your message could not be sent this time.';
				$('#bo-scrap-box .boxmidlrg').html('<p style="padding:5px;margin:5px;background:#FCFDDE;border:1px solid #DDDDDD">'+msg+'</p>'+makeOrkutButton('close', 'bo-scrap-close'));
				$('#bo-scrap-close').click(function() {$('#bo-scrap-box-overlay').remove();$('#bo-scrap-box').remove();});
			}
		});
		
	});
}

function scrapBox() {
	$('body').append('<a id="bo-scrap-trigger" style="z-index:100000;border:1px solid #DDDDDD;padding:5px 5px 5px 18px;background:#FCFDDE url(http://img1.orkut.com/img/castro/p_scrap.gif) no-repeat scroll left center;position:absolute;display:none" href="javascript:;"></a>');
	$('#bo-scrap-trigger').click(function() {
		makeScrapBox($(this).attr('title'));
	});
	$('a[href^=/Main#Profile]')
	.each(function() {
		var image = $(this).find('img');
		if(image.length == 0)
			$(this).data('name', $(this).text());
		else {
			$(this).data('name', image.attr('title'));
			image.attr('title', '');
		}
	})
	.hoverIntent({
		interval:250,
		over:function(e) {
			var name = $(this).data('name');
			if(!name)
				return;
			$('#bo-scrap-trigger')
			.data('name', name)
			.text(name)
			.attr('title', getArgs(this.href, 'uid'))
			.stop()
			.css({'opacity':1, 'top':e.pageY+10, 'left':e.pageX+10})
			.show()
			.fadeOut(5000);
		},
		out:function(){}
	});
}

function main() {
	var page_url = window.location.href,
		page = page_url.match(/\/([a-zA-z]+)(\?|$)/)[1],
		args = getArgs(page_url),
		user = getArgs($('.menu a[href^=/Main#Profile]').attr('href'), 'uid'),
		settings_form = {
			mycomm_box     : {type:'checkbox', value:true, label:'Enable Better My Communities', no_divi:true},
			clear_stats    : {type:'div', id:'bo-clear-stats'},
			check_updates  : {type:'checkbox', value:true, label:'Automatically check for script updates'},
			easy_link      : {type:'checkbox', value:true, label:'Show last page and forum topic shortcut links'},
			qreply         : {type:'checkbox', value:true, label:'Enable Quick Reply & Quote in forums'},
			url_trunc      : {type:'checkbox', value:true, label:'Truncate long URL in forums posts'},
			quote_template : {type:'textarea', value:'[i][gray][b][username][/b] said on [b][time][/b]:\n[quote]\n[/gray][/i]', label:'Quote template'},
			lastpage_jump  : {type:'checkbox', value:true, label:'Jump to last page on reply in forums'},
			skin_switch    : {type:'checkbox', value:true, label:'Switch skin in other profiles'},
			scrap_box      : {type:'checkbox', value:true, label:'Show Quick Scrap Dialog Box'},
			ad_block       : {type:'checkbox', value:false, label:'Block Ads in Home page'}
		},
		settings;
	settings = getObjectValue('settings_'+user);
	if(isEmpty(settings)) {
		settings = jsonFormDefaultValues(settings_form);
		setObjectValue('settings_'+user, settings);
	}

	if(args['na'] && !args['nst'] && settings.lastpage_jump)
		jumpToLast();
	
	if(settings.scrap_box)
		scrapBox();
	if(settings.skin_switch) {
		manageSkin(args['uid'], user);
	}
	if(args['cmm']) {
		updateCommunityInfo(args['cmm'], user);
	}
	if(page.match('Settings')) {
		settingsEditor(settings_form, settings, page_url, user);
	}
	if(page == 'Home') {
		if(settings.check_updates)
			checkUpdates(user);
		if(settings.mycomm_box)
			myCommunitiesBox(user);
		if(settings.easy_link)
			forumLinks(page);
		if(settings.ad_block)
			adBlock();
	}
	if(page == 'Community') {
		if(settings.easy_link)
			lastPageLinks(page);
	}
	if(page == 'CommTopics') {
		if(settings.easy_link)
			lastPageLinks(page);
		widenTopicsTable();
	}
	if(page == 'CommMsgs') {
		if(settings.url_trunc)
			linkTruncate();
		if(settings.qreply)
			qreplyAndQuote(args['cmm'], args['tid'], settings.quote_template);
	}
	if(page == 'Communities') {
		if(settings.easy_link)
			forumLinks(page);
	}
}

main();

// Better Orkut

/*
 * @Start Orkut Context Menu
*/

(function() {
    
    //### SETTINGS
   
    //whether to show profile picture or not
    var showPicture = true;
    var preloadPic = true;
	var domainName = document.URL.split('/')[2];
    
    //tasks to do on profile. ?uid=16319692112664226660 will be append to the url later
	
    var myTasks = Array(
	Array("Profile",
		  "http://img4.orkut.com/img/castro/p_profile.gif",
		  "http://" + domainName + "/Main#Profile?"),
	Array("Scrapbook",
	      "http://img1.orkut.com/img/castro/p_scrap.gif",
	      "http://" + domainName + "/Main#Scrapbook?"),
	Array("Album",
	      "http://img4.orkut.com/img/castro/p_camera.gif",
	      "http://" + domainName + "/Main#AlbumList?"),
	Array("Videos",
		  "http://img3.orkut.com/img/castro/p_video.gif",
		  "http://" + domainName + "/Main#FavoriteVideos?"),
	Array("View Testimonials",
		  "http://img4.orkut.com/img/castro/p_pen.gif",
		  "http://" + domainName + "/Main#ProfileT?"),
	Array("Events",
		  "http://static4.orkut.com/img/castro/events_ico.png",
		  "http://" + domainName + "/Main#Events?"),
	Array("View Friends",
	      "http://img2.orkut.com/img/castro/p_viewfriends.gif",
	      "http://" + domainName + "/Main#FriendsList?"),
	Array("Mutual Friends",
		  "http://img2.orkut.com/img/castro/p_viewfriends.gif",
		  "http://" + domainName + "/Main#MutualFriendsList?"),
	Array("Communities",
		  "http://img1.orkut.com/img/castro/i_comment.png",
		  "http://" + domainName + "/Main#ProfileC?"),
	Array("Write Testimonials",
		  "http://img4.orkut.com/img/castro/p_pen.gif",
		  "http://" + domainName + "/Main#TestimonialWrite?"),
	Array("Ask Friends",
		  "http://img3.orkut.com/img/mobius/i_icon_small_ask.gif",
		  "http://" + domainName + "/Main#Agent?application=mobius&"),
	Array("Updates",
		  "http://static1.orkut.com/img/castro/i_updates.png",
		  "http://" + domainName + "/Main#Notifications?"),
	Array("Send Message",
	      "http://img2.orkut.com/img/castro/p_letter.gif",
	      "http://" + domainName + "/Main#Compose?"),
	Array("Send Teaser",
	      "http://img1.orkut.com/img/castro/p_teaser.gif",
	      "http://" + domainName + "/Main#MsgsTeaser?"),
	Array("Report Abuse",
	      "http://img2.orkut.com/img/castro/p_flagprofile.gif",
	      "http://" + domainName + "/Main#FlagProfile?"),
	Array("Photo Of Him/Her",
	      "http://static4.orkut.com/img/castro/i_phototag.gif",
	      "http://" + domainName + "/Main#PhotoTag?"),
	Array("Scrap All Friends",
	      "http://static4.orkut.com/img/castro/p_app.gif",
	      "http://" + domainName + "/Main#AppInfo?appId=364639177670&"),
	Array("Meri Slambook",
	      "http://static4.orkut.com/img/castro/p_app.gif",
	      "http://" + domainName + "/Main#AppInfo?appId=505516740623&")
	);
    // SETTINGS ###
    
    
    function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.setAttribute("type","text/css");
	style.innerHTML = css;
	head.appendChild(style);
    }
    addGlobalStyle('div#divProfileTasks { position: absolute; background-color: #F43009; border: 2px solid #A1BBE4; padding: 5px; }');
    //styling function copied from http://diveintogreasemonkey.org/patterns/add-css.html
    
    
    try{
	
	//hide the context menu if something else is clicked
	document.body.addEventListener('click', function(event){
	    var myDiv = document.getElementById('divProfileTasks');
	    if( myDiv )
		myDiv.style.display = "none";
	},true);
	
	//regexp for getting the uid from an url
	var uidRegexp = new RegExp("uid=(\\d+)");
	
	//paths to profile pictures by uid
	var imagens = new Array();
	var preloaderPic = new Array();
	
	//searching through all links
	var anchors = document.getElementsByTagName("a");
	for( i=0; i<anchors.length; i++ ){
	    var href = anchors[i].getAttribute("href");
	    if( href == null || uidRegexp.exec(anchors[i].getAttribute("href")) == null )
		continue; //skip not linked anchors
	    
	    //if( href.match(/^(Profile)|(FriendsNet)/) ){
		if(href.match(/Profile/) && !href.match(/FlagProfile/)) {
		//if it is a profile link
		
		//if pictures are used look for it inside of the link
		// and store the path for its medium-sized image
		if( showPicture == true ){
		    var hasImg = anchors[i].getElementsByTagName("img");
		    if( hasImg.length && hasImg[0].getAttribute("src").match("small") ){
			var uid = uidRegexp.exec(anchors[i].getAttribute("href"));
			uid = uid[1];
			imagens[uid] = hasImg[0].getAttribute("src").replace(/small/,"medium");
			//if preloading is enable we create an element for caching the image
			if( preloadPic == true ){
			    preloaderPic[uid] = document.createElement("img");
			    preloaderPic[uid].src = imagens[uid];
			}
		    }
		}
		
		//add the contextMenu function
		anchors[i].addEventListener('contextmenu', function(event) {
		    //get the uid from the url
		    var uid = uidRegexp.exec(this.href)[1];
		    
		    if( document.getElementById("divProfileTasks") ){
			
				//if the div already exists we just change the links
				var myDiv = document.getElementById("divProfileTasks");
				
				for(i=0;i<myTasks.length;i++){
				    var myTask = document.getElementById("myProfileTask"+i);
				    myTask.href = myTasks[i][2] + "uid=" + uid;
				}
				//also change the profile picture
				if( showPicture == true ){
				    var myProfilePicture = document.getElementById("myProfilePicture");
				    myProfilePicture.style.display = "none";
				    if( imagens[uid] )
					myProfilePicture.src = imagens[uid];
				}
		    }else{
			//if it does not exist yet we create it
			var myDiv = document.createElement("div");
			myDiv.setAttribute("id", "divProfileTasks");
			myDiv.setAttribute("class", "module");
			
			//set the profile picture
			if( showPicture == true ){
			    var myPicDiv = document.createElement("div");
			    myPicDiv.style.textAlign = "center";
			    
			    var myPicture = document.createElement("img");	
			    myPicture.id = "myProfilePicture";
			    myPicture.addEventListener("load",function(event){ this.style.display="block"; }, true);
			    if( imagens[uid] )
				myPicture.src = imagens[uid];
			    myPicture.style.display = "none";
			    myPicture.style.margin = "auto auto";
			    
			    myPicDiv.appendChild(myPicture);
			    myDiv.appendChild(myPicDiv);
			}
			
			//add the task buttons
			for(i=0;i<myTasks.length;i++){
			    var myTask = document.createElement("a");
			    myTask.setAttribute("id", "myProfileTask" + i);
				myTask.setAttribute("href", myTasks[i][2] + "uid=" + uid);
				myTask.setAttribute("class", "userbutton");
				myTask.setAttribute("style", "text-align: left;");
				
			    var myTaskImg = document.createElement("img");
			    myTaskImg.alt = myTasks[i][0];
			    myTaskImg.src = myTasks[i][1];
			    //myTaskImg.addEventListener('mouseover',function(event){ this.src = this.src.replace(/nc_/,"oc_"); },true);
			    //myTaskImg.addEventListener('mouseout',function(event){ this.src = this.src.replace(/oc_/,"nc_"); },true);
			    myTaskImg.border = 0;
			    myTask.appendChild(myTaskImg);
				myTask.appendChild(document.createTextNode(myTasks[i][0]));
			    myDiv.appendChild(myTask);
			    //myDiv.appendChild(document.createElement("br"));
			}
			
			//append the div to the body but does not show it yet, we gotta position it first!
			myDiv.style.display = "none";
			document.body.appendChild(myDiv);
		    }
		    
		    var divProfileTasks = document.getElementById("divProfileTasks");
		    
		    //this positioning algorithm is weird i know. send me something better please :)
		    var scrollTop = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
		    var scrollLeft = document.body.scrollLeft ? document.body.scrollLeft : document.documentElement.scrollLeft;
		    var divLeft = event.clientX + scrollLeft;
		    if( divLeft + 200 > screen.availWidth ){ divLeft = screen.availWidth - 200; }
		    divProfileTasks.style.left = divLeft ;
		    //var divTop = event.clientY + scrollTop;
		    //if( divTop + 200 > screen.availHeight + scrollTop ){ divTop = screen.availHeight - 200; }
		    //divProfileTasks.style.top = divTop ;
		    divProfileTasks.style.top = event.clientY + scrollTop;
		    
		    //now that the div is more or less positioned lets show it
		    divProfileTasks.style.display = "block";
		    
		    //force the stopping of the contextMenu event
		    event.stopPropagation();
		    event.preventDefault();
		    
		}, true); //end the function and close the addEventListener method
		
	    } //if it is a Profile link
	    
	}// for each anchor
	
    }catch(e){
		/*debug any mistake
		  *
		  * Commented as of 29th September.
		  */
		//alert("orkutProfileTasks error: " + e);
    }// try
    
})();

/*
 * @End Orkut Context Menu
*/

// Start Orkut Tools

(function() {
var css = "div#container\n{ padding: 32px 0px 0px 0px !important; }\n\n\ndiv#header {\nposition: fixed !important;\ntop: 0px !important;\nright: 0 !important;\nleft: 0 !important;\nz-index:100;\n\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

// End Orkut Tools