// ==UserScript==
// @name           Keep-Tube: Display file-sizes
// @namespace      http://www.n-regen.bplaced.de
// @include        http://keep-tube.com/?url=*
// @description    Displays the sizes of the downloadable files below the download-links on keep-tube.com
// ==/UserScript==

function urldecode (str) {
    // Decodes URL-encoded string
    //
    // version: 908.1617
    // discuss at: http://phpjs.org/functions/urldecode
    // +   original by: Philip Peterson
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: AJ
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +      input by: travc
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Lars Fischer
    // +      input by: Ratheous
    // +   improved by: Orlando
    // %        note 1: info on what encoding functions to use from: http://xkr.us/articles/javascript/encode-compare/
    // *     example 1: urldecode('Kevin+van+Zonneveld%21');
    // *     returns 1: 'Kevin van Zonneveld!'
    // *     example 2: urldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');
    // *     returns 2: 'http://kevin.vanzonneveld.net/'
    // *     example 3: urldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');
    // *     returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'

    var hash_map = {}, ret = str.toString(), unicodeStr='', hexEscStr='';

    var replacer = function (search, replace, str) {
        var tmp_arr = [];
        tmp_arr = str.split(search);
        return tmp_arr.join(replace);
    };

    // The hash_map is identical to the one in urlencode.
    hash_map["'"]   = '%27';
    hash_map['(']   = '%28';
    hash_map[')']   = '%29';
    hash_map['*']   = '%2A';
    hash_map['~']   = '%7E';
    hash_map['!']   = '%21';
    hash_map['%20'] = '+';
    hash_map['\u00DC'] = '%DC';
    hash_map['\u00FC'] = '%FC';
    hash_map['\u00C4'] = '%D4';
    hash_map['\u00E4'] = '%E4';
    hash_map['\u00D6'] = '%D6';
    hash_map['\u00F6'] = '%F6';
    hash_map['\u00DF'] = '%DF';
    hash_map['\u20AC'] = '%80';
    hash_map['\u0081'] = '%81';
    hash_map['\u201A'] = '%82';
    hash_map['\u0192'] = '%83';
    hash_map['\u201E'] = '%84';
    hash_map['\u2026'] = '%85';
    hash_map['\u2020'] = '%86';
    hash_map['\u2021'] = '%87';
    hash_map['\u02C6'] = '%88';
    hash_map['\u2030'] = '%89';
    hash_map['\u0160'] = '%8A';
    hash_map['\u2039'] = '%8B';
    hash_map['\u0152'] = '%8C';
    hash_map['\u008D'] = '%8D';
    hash_map['\u017D'] = '%8E';
    hash_map['\u008F'] = '%8F';
    hash_map['\u0090'] = '%90';
    hash_map['\u2018'] = '%91';
    hash_map['\u2019'] = '%92';
    hash_map['\u201C'] = '%93';
    hash_map['\u201D'] = '%94';
    hash_map['\u2022'] = '%95';
    hash_map['\u2013'] = '%96';
    hash_map['\u2014'] = '%97';
    hash_map['\u02DC'] = '%98';
    hash_map['\u2122'] = '%99';
    hash_map['\u0161'] = '%9A';
    hash_map['\u203A'] = '%9B';
    hash_map['\u0153'] = '%9C';
    hash_map['\u009D'] = '%9D';
    hash_map['\u017E'] = '%9E';
    hash_map['\u0178'] = '%9F';
    hash_map['\u00C6'] = '%C3%86';
    hash_map['\u00D8'] = '%C3%98';
    hash_map['\u00C5'] = '%C3%85';

    for (unicodeStr in hash_map) {
        hexEscStr = hash_map[unicodeStr]; // Switch order when decoding
        ret = replacer(hexEscStr, unicodeStr, ret); // Custom replace. No regexing
    }

    // End with decodeURIComponent, which most resembles PHP's encoding functions
    ret = decodeURIComponent(ret);

    return ret;
}

function urlencode (str) {
    // URL-encodes string
    //
    // version: 908.2210
    // discuss at: http://phpjs.org/functions/urlencode
    // +   original by: Philip Peterson
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: AJ
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: travc
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Lars Fischer
    // +      input by: Ratheous
    // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: This reflects PHP 5.3/6.0+ behavior
    // *     example 1: urlencode('Kevin van Zonneveld!');
    // *     returns 1: 'Kevin+van+Zonneveld%21'
    // *     example 2: urlencode('http://kevin.vanzonneveld.net/');
    // *     returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
    // *     example 3: urlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
    // *     returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'
    var hexStr = function (dec) {
        return '%' + dec.toString(16).toUpperCase();
    };

    var ret = '',
            unreserved = /[\w.-]/; // A-Za-z0-9_.- // Tilde is not here for historical reasons; to preserve it, use rawurlencode instead
    str = (str+'').toString();

    for (var i = 0, dl = str.length; i < dl; i++) {
        var ch = str.charAt(i);
        if (unreserved.test(ch)) {
            ret += ch;
        }
        else {
            var code = str.charCodeAt(i);
            // Reserved assumed to be in UTF-8, as in PHP
            if (code === 32) {
                ret += '+'; // %20 in rawurlencode
            }
            else if (code < 128) { // 1 byte
                ret += hexStr(code);
            }
            else if (code >= 128 && code < 2048) { // 2 bytes
                ret += hexStr((code >> 6) | 0xC0);
                ret += hexStr((code & 0x3F) | 0x80);
            }
            else if (code >= 2048 && code < 65536) { // 3 bytes
                ret += hexStr((code >> 12) | 0xE0);
                ret += hexStr(((code >> 6) & 0x3F) | 0x80);
                ret += hexStr((code & 0x3F) | 0x80);
            }
            else if (code >= 65536) { // 4 bytes
                ret += hexStr((code >> 18) | 0xF0);
                ret += hexStr(((code >> 12) & 0x3F) | 0x80);
                ret += hexStr(((code >> 6) & 0x3F) | 0x80);
                ret += hexStr((code & 0x3F) | 0x80);
            }
        }
    }
    return ret;
}

function round(x, n) {
  if (n < 1 || n > 14) return false;
  var e = Math.pow(10, n);
  var k = (Math.round(x * e) / e).toString();
  if (k.indexOf('.') == -1) k += '.';
  k += e.toString().substring(1);
  return k.substring(0, k.indexOf('.') + n+1);
}

function filesize2string (FileSize)
{
    if (FileSize < 1024) //Bytes (0-1023)
    {
        return FileSize+' B';
    }
    if ((FileSize >= 1024) && (FileSize < 1048576)) //KiloBytes (1024-1048575)
    {
        return round(FileSize / 1024, 2)+' KB';
    }
    if ((FileSize >= 1048576) && (FileSize < 1073741824)) //MegaBytes (1048576-1073741823)
    {
        return round(FileSize / 1048576, 2)+' MB';
    }
    if ((FileSize >= 1073741824) && (FileSize < 1099511627776)) //GigaBytes (1073741824-1099511627775)
    {
        return round(FileSize / 1073741824, 2)+' GB';
    }
    if (FileSize >= 1099511627776) //TeraBytes (ab 1099511627776)
    {
        return round(FileSize / 1099511627776, 2)+' TB';
    }
}

var tds = document.getElementsByTagName("td");
var zaehler = 1;
for (var tdnum in tds)
{
    if (tds[tdnum].className == "dl_links")
    {
        tds[tdnum].id = "dltd"+zaehler;
        zaehler = zaehler+1;
        dlurl = tds[tdnum].getElementsByTagName("a")[0].href;
        var params = "check=Prüfen&url="+urlencode(dlurl);
        GM_xmlhttpRequest({
            method: 'POST',
            url: 'http://www.livewatch.de/de/tools/checkheader',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Content-length': params.length,
                'Connection': 'close',
            },
            data: params,
            onload: function(responseDetails) {
                videourl = urldecode(/Location<.td>\s*?.*?70%.*?>(.+?)<.td>/.exec(responseDetails.responseText)[1].replace(/&amp;/g, "&"));
                var secparams = "check=Prüfen&url="+urlencode(videourl);
                GM_xmlhttpRequest({
                    method: 'POST',
                    url: 'http://www.livewatch.de/de/tools/checkheader',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded',
                        'Content-length': secparams.length,
                        'Connection': 'close',
                    },
                    data: secparams,
                    onload: function(responseDetails) {
                        size = /Content-Length<.td>\s*?.*?70%.*?>(.+?)<.td>/.exec(responseDetails.responseText)[1];
                        for (i=1;i<=5;i=i+1)
                        {
                            if (document.getElementById("dltd"+i) != null)
                            {
                                document.getElementById("dltd"+i).innerHTML = document.getElementById("dltd"+i).innerHTML + filesize2string(size);
                                document.getElementById("dltd"+i).id = "ddltd"+i;
                                break;
                            } else {
                                continue;
                            }
                        }
                    }
                });
            }
        });
    }
}