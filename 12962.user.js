// ==UserScript==
// @name           link titler
// @description    fetch linked page and show the title in tooltip.
// @include        *
// @exclude        http://google.com/*
// @exclude        http://*.google.com/*
// @exclude        http://yahoo.com/*
// @exclude        http://*.yahoo.com/*
// @exclude        http://altavista.com/*
// @exclude        http://*.altavista.com/*
// ==/UserScript==

var replacements, regex, key;
replacements = {
'&gt;': '>',
'&lt;': '<',
'&quot;': '"',
'&apos;': "'",
'&amp;': '&',
'&nbsp;': '&#160;',
'&iexcl;': '&#161;',
'&curren;': '&#164;',
'&cent;': '&#162;',
'&pound;': '&#163;',
'&yen;': '&#165;',
'&brvbar;': '&#166;',
'&sect;': '&#167;',
'&uml;': '&#168;',
'&copy;': '&#169;',
'&ordf;': '&#170;',
'&laquo;': '&#171;',
'&not;': '&#172;',
'&shy;': '&#173;',
'&reg;': '&#174;',
'&trade;': '&#8482;',
'&macr;': '&#175;',
'&deg;': '&#176;',
'&plusmn;': '&#177;',
'&sup2;': '&#178;',
'&sup3;': '&#179;',
'&acute;': '&#180;',
'&micro;': '&#181;',
'&para;': '&#182;',
'&middot;': '&#183;',
'&cedil;': '&#184;',
'&sup1;': '&#185;',
'&ordm;': '&#186;',
'&raquo;': '&#187;',
'&frac14;': '&#188;',
'&frac12;': '&#189;',
'&frac34;': '&#190;',
'&iquest;': '&#191;',
'&times;': '&#215;',
'&divide;': '&#247;',
'&Agrave;': '&#192;',
'&Aacute;': '&#193;',
'&Acirc;': '&#194;',
'&Atilde;': '&#195;',
'&Auml;': '&#196;',
'&Aring;': '&#197;',
'&AElig;': '&#198;',
'&Ccedil;': '&#199;',
'&Egrave;': '&#200;',
'&Eacute;': '&#201;',
'&Ecirc;': '&#202;',
'&Euml;': '&#203;',
'&Igrave;': '&#204;',
'&Iacute;': '&#205;',
'&Icirc;': '&#206;',
'&Iuml;': '&#207;',
'&ETH;': '&#208;',
'&Ntilde;': '&#209;',
'&Ograve;': '&#210;',
'&Oacute;': '&#211;',
'&Ocirc;': '&#212;',
'&Otilde;': '&#213;',
'&Ouml;': '&#214;',
'&Oslash;': '&#216;',
'&Ugrave;': '&#217;',
'&Uacute;': '&#218;',
'&Ucirc;': '&#219;',
'&Uuml;': '&#220;',
'&Yacute;': '&#221;',
'&THORN;': '&#222;',
'&szlig;': '&#223;',
'&agrave;': '&#224;',
'&aacute;': '&#225;',
'&acirc;': '&#226;',
'&atilde;': '&#227;',
'&auml;': '&#228;',
'&aring;': '&#229;',
'&aelig;': '&#230;',
'&ccedil;': '&#231;',
'&egrave;': '&#232;',
'&eacute;': '&#233;',
'&ecirc;': '&#234;',
'&euml;': '&#235;',
'&igrave;': '&#236;',
'&iacute;': '&#237;',
'&icirc;': '&#238;',
'&iuml;': '&#239;',
'&eth;': '&#240;',
'&ntilde;': '&#241;',
'&ograve;': '&#242;',
'&oacute;': '&#243;',
'&ocirc;': '&#244;',
'&otilde;': '&#245;',
'&ouml;': '&#246;',
'&oslash;': '&#248;',
'&ugrave;': '&#249;',
'&uacute;': '&#250;',
'&ucirc;': '&#251;',
'&uuml;': '&#252;',
'&yacute;': '&#253;',
'&thorn;': '&#254;',
'&yuml;': '&#255;',
'&OElig;': '&#338;',
'&oelig;': '&#339;',
'&Scaron;': '&#352;',
'&scaron;': '&#353;',
'&Yuml;': '&#376;',
'&circ;': '&#710;',
'&tilde;': '&#732;',
'&ensp;': '&#8194;',
'&emsp;': '&#8195;',
'&thinsp;': '&#8201;',
'&zwnj;': '&#8204;',
'&zwj;': '&#8205;',
'&lrm;': '&#8206;',
'&rlm;': '&#8207;',
'&ndash;': '&#8211;',
'&mdash;': '&#8212;',
'&lsquo;': '&#8216;',
'&rsquo;': '&#8217;',
'&sbquo;': '&#8218;',
'&ldquo;': '&#8220;',
'&rdquo;': '&#8221;',
'&bdquo;': '&#8222;',
'&dagger;': '&#8224;',
'&Dagger;': '&#8225;',
'&hellip;': '&#8230;',
'&permil;': '&#8240;',
'&lsaquo;': '&#8249;',
'&rsaquo;': '&#8250;',
'&euro;': '&#8364;' 
};

regex = {};
for (key in replacements) {
    regex[key] = new RegExp(key, 'g');
}

var allLinks = document.evaluate('//a[@href]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
var thisSite = window.location.host;
var thisDomain = thisSite.match(/((\w+\.\w+)(\.\w\w)?)$/)[1];

for (var i = 0; i < allLinks.snapshotLength; i++){
    var thisLink = allLinks.snapshotItem(i);
    if (thisLink.href.search(thisDomain) < 0
         && thisLink.href.search(/^http:/) >= 0
         //&& (!thisLink.href.search(/\?/) || thisLink.href.search(/amazon|youtube/))
       )
    {
       setTitle(thisLink, thisLink.href);
    }
}

function setTitle(elem, url) {
    var old_title = elem.getAttribute('title');
    elem.setAttribute('title', 'Please wait ...');
    GM_xmlhttpRequest({
        method:'GET',
        url: url,
        headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey'},
        onerror:function(responseDetails) {
            elem.setAttribute('title', 'An error occured: ' + responseDetails.status + ': ' + responseDetails.status_text);
        },
        onload:function(responseDetails) {
            var dest_title;
            var myText = responseDetails.responseText.replace(/[\n\r\f]/g, ' ');
            if (myText.search(/<\s*title\s*>.*<\s*\/title/i) >= 0)
            {
               dest_title = myText.match(/<\s*title\s*>(.*)<\s*\/title/i)[1];
               if (dest_title == null || dest_title == '')
               {
                   dest_title = 'Empty title';
               }
               else
               {
                   if (old_title != null && old_title.search(/\S+/) >= 0)
                   {
                       dest_title = dest_title + ' : ' + old_title;
                   }
                   for (key in replacements) {
                       dest_title = dest_title.replace(regex[key], replacements[key]);
                   }
                   while (dest_title.match(/&#(\d+);/))
                   {
                      var thisChar =  RegExp.$1;
                      var coded = new RegExp("&#"+thisChar+";", 'g');
                      var uncoded = String.fromCharCode(thisChar);
                      dest_title = dest_title.replace(coded, uncoded);
                   } 
                   while (dest_title.match(/&#x([\da-f]+);/i))
                   {
                      var thisChar =  RegExp.$1;
                      var coded = new RegExp("&#x"+thisChar+";", 'g');
                      var uncoded = String.fromCharCode(parseInt(thisChar, 16));
                      dest_title = dest_title.replace(coded, uncoded);
                   } 
               }
               elem.setAttribute('title', dest_title);
           }
           else
           {
               elem.setAttribute('title', 'No title tags');
           }
        }
    });
}
