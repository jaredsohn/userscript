// ==UserScript==
// @name  Scrobbler for Xiami
// @namespace Chocoboboy
// @match http://www.xiami.com/song/play*
// ==/UserScript==


function Md5Crypt() {
    /*
    * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
    * Digest Algorithm, as defined in RFC 1321.
    * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
    * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
    * Distributed under the BSD License
    * See http://pajhome.org.uk/crypt/md5 for more info.
    */

    /*
    * Configurable variables. You may need to tweak these to be compatible with
    * the server-side, but the defaults work in most cases.
    */
    var hexcase = 0;   /* hex output format. 0 - lowercase; 1 - uppercase        */
    var b64pad = "";  /* base-64 pad character. "=" for strict RFC compliance   */

    /*
    * These are the functions you'll usually want to call
    * They take string arguments and return either hex or base-64 encoded strings
    */
    function hex_md5(s) { return rstr2hex(rstr_md5(str2rstr_utf8(s))); }
    function b64_md5(s) { return rstr2b64(rstr_md5(str2rstr_utf8(s))); }
    function any_md5(s, e) { return rstr2any(rstr_md5(str2rstr_utf8(s)), e); }
    function hex_hmac_md5(k, d)
    { return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
    function b64_hmac_md5(k, d)
    { return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
    function any_hmac_md5(k, d, e)
    { return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e); }

    /*
    * Perform a simple self-test to see if the VM is working
    */
    function md5_vm_test() {
        return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
    }

    /*
    * Calculate the MD5 of a raw string
    */
    function rstr_md5(s) {
        return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
    }

    /*
    * Calculate the HMAC-MD5, of a key and some data (raw strings)
    */
    function rstr_hmac_md5(key, data) {
        var bkey = rstr2binl(key);
        if (bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

        var ipad = Array(16), opad = Array(16);
        for (var i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }

        var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
        return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
    }

    /*
    * Convert a raw string to a hex string
    */
    function rstr2hex(input) {
        try { hexcase } catch (e) { hexcase = 0; }
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var output = "";
        var x;
        for (var i = 0; i < input.length; i++) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F)
           + hex_tab.charAt(x & 0x0F);
        }
        return output;
    }

    /*
    * Convert a raw string to a base-64 string
    */
    function rstr2b64(input) {
        try { b64pad } catch (e) { b64pad = ''; }
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var output = "";
        var len = input.length;
        for (var i = 0; i < len; i += 3) {
            var triplet = (input.charCodeAt(i) << 16)
                | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
                | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
            for (var j = 0; j < 4; j++) {
                if (i * 8 + j * 6 > input.length * 8) output += b64pad;
                else output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
            }
        }
        return output;
    }

    /*
    * Convert a raw string to an arbitrary string encoding
    */
    function rstr2any(input, encoding) {
        var divisor = encoding.length;
        var i, j, q, x, quotient;

        /* Convert to an array of 16-bit big-endian values, forming the dividend */
        var dividend = Array(Math.ceil(input.length / 2));
        for (i = 0; i < dividend.length; i++) {
            dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
        }

        /*
        * Repeatedly perform a long division. The binary array forms the dividend,
        * the length of the encoding is the divisor. Once computed, the quotient
        * forms the dividend for the next step. All remainders are stored for later
        * use.
        */
        var full_length = Math.ceil(input.length * 8 /
                                    (Math.log(encoding.length) / Math.log(2)));
        var remainders = Array(full_length);
        for (j = 0; j < full_length; j++) {
            quotient = Array();
            x = 0;
            for (i = 0; i < dividend.length; i++) {
                x = (x << 16) + dividend[i];
                q = Math.floor(x / divisor);
                x -= q * divisor;
                if (quotient.length > 0 || q > 0)
                    quotient[quotient.length] = q;
            }
            remainders[j] = x;
            dividend = quotient;
        }

        /* Convert the remainders to the output string */
        var output = "";
        for (i = remainders.length - 1; i >= 0; i--)
            output += encoding.charAt(remainders[i]);

        return output;
    }

    /*
    * Encode a string as utf-8.
    * For efficiency, this assumes the input is valid utf-16.
    */
    function str2rstr_utf8(input) {
        var output = "";
        var i = -1;
        var x, y;

        while (++i < input.length) {
            /* Decode utf-16 surrogate pairs */
            x = input.charCodeAt(i);
            y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
            if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                i++;
            }

            /* Encode output as utf-8 */
            if (x <= 0x7F)
                output += String.fromCharCode(x);
            else if (x <= 0x7FF)
                output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F),
                                    0x80 | (x & 0x3F));
            else if (x <= 0xFFFF)
                output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                    0x80 | ((x >>> 6) & 0x3F),
                                    0x80 | (x & 0x3F));
            else if (x <= 0x1FFFFF)
                output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                    0x80 | ((x >>> 12) & 0x3F),
                                    0x80 | ((x >>> 6) & 0x3F),
                                    0x80 | (x & 0x3F));
        }
        return output;
    }

    /*
    * Encode a string as utf-16
    */
    function str2rstr_utf16le(input) {
        var output = "";
        for (var i = 0; i < input.length; i++)
            output += String.fromCharCode(input.charCodeAt(i) & 0xFF,
                                  (input.charCodeAt(i) >>> 8) & 0xFF);
        return output;
    }

    function str2rstr_utf16be(input) {
        var output = "";
        for (var i = 0; i < input.length; i++)
            output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                                   input.charCodeAt(i) & 0xFF);
        return output;
    }

    /*
    * Convert a raw string to an array of little-endian words
    * Characters >255 have their high-byte silently ignored.
    */
    function rstr2binl(input) {
        var output = Array(input.length >> 2);
        for (var i = 0; i < output.length; i++)
            output[i] = 0;
        for (var i = 0; i < input.length * 8; i += 8)
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
        return output;
    }

    /*
    * Convert an array of little-endian words to a string
    */
    function binl2rstr(input) {
        var output = "";
        for (var i = 0; i < input.length * 32; i += 8)
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
        return output;
    }

    /*
    * Calculate the MD5 of an array of little-endian words, and a bit length.
    */
    function binl_md5(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;

        for (var i = 0; i < x.length; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;

            a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
            d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

            a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
            a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

            a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
            d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
            c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

            a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
            d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        return Array(a, b, c, d);
    }

    /*
    * These functions implement the four basic operations the algorithm uses.
    */
    function md5_cmn(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }
    function md5_ff(a, b, c, d, x, s, t) {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t) {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    /*
    * Add integers, wrapping at 2^32. This uses 16-bit operations internally
    * to work around bugs in some JS interpreters.
    */
    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    /*
    * Bitwise rotate a 32-bit number to the left.
    */
    function bit_rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }


    this.md5 = function (s) { return this.hex_md5(s); }
    this.hex_md5 = function (s) { return rstr2hex(rstr_md5(str2rstr_utf8(s))); }
    this.b64_md5 = function (s) { return rstr2b64(rstr_md5(str2rstr_utf8(s))); }
    this.any_md5 = function (s, e) { return rstr2any(rstr_md5(str2rstr_utf8(s)), e); }
    this.hex_hmac_md5 = function (k, d) { return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
    this.b64_hmac_md5 = function (k, d) { return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
    this.any_hmac_md5 = function (k, d, e) { return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e); }
}











/*
*
* Copyright (c) 2008-2010, Felix Bruns <felixbruns@web.de>
*
*/
function LastFM(options) {
    /* Set default values for required options. */
    var apiKey = options.apiKey || '';
    var apiSecret = options.apiSecret || '';
    var apiUrl = options.apiUrl || 'http://ws.audioscrobbler.com/2.0/';
    var cache = options.cache || undefined;
    var md5Crypt = new Md5Crypt();

    var md5 = function (s) {
        return md5Crypt.md5(s);
    }

    /* Set API key. */
    this.setApiKey = function (_apiKey) {
        apiKey = _apiKey;
    };

    /* Set API key. */
    this.setApiSecret = function (_apiSecret) {
        apiSecret = _apiSecret;
    };

    /* Set API URL. */
    this.setApiUrl = function (_apiUrl) {
        apiUrl = _apiUrl;
    };

    /* Set cache. */
    this.setCache = function (_cache) {
        cache = _cache;
    };

    /* Internal call (POST, GET). */
    var internalCall = function (params, callbacks, requestMethod) {
        /* Cross-domain POST request (doesn't return any data, always successful). */
        if (requestMethod == 'POST') {
            /* Create iframe element to post data. */
            var html = document.getElementsByTagName('html')[0];
            var iframe = document.createElement('iframe');
            var doc;

            /* Set iframe attributes. */
            iframe.width = 1;
            iframe.height = 1;
            iframe.style.border = 'none';
            iframe.onload = function () {
                /* Remove iframe element. */
                //html.removeChild(iframe);

                /* Call user callback. */
                if (typeof (callbacks.success) != 'undefined') {
                    callbacks.success();
                }
            };

            /* Append iframe. */
            html.appendChild(iframe);

            /* Get iframe document. */
            if (typeof (iframe.contentWindow) != 'undefined') {
                doc = iframe.contentWindow.document;
            }
            else if (typeof (iframe.contentDocument.document) != 'undefined') {
                doc = iframe.contentDocument.document.document;
            }
            else {
                doc = iframe.contentDocument.document;
            }

            /* Open iframe document and write a form. */
            doc.open();
            doc.clear();
            doc.write('<form method="post" action="' + apiUrl + '" id="form">');

            /* Write POST parameters as input fields. */
            for (var param in params) {
                doc.write('<input type="text" name="' + param + '" value="' + params[param] + '">');
            }

            /* Write automatic form submission code. */
            doc.write('</form>');
            doc.write('<script type="application/x-javascript">');
            doc.write('document.getElementById("form").submit();');
            doc.write('</script>');

            /* Close iframe document. */
            doc.close();
        }
        /* Cross-domain GET request (JSONP). */
        else {
            /* Get JSONP callback name. */
            var jsonp = 'jsonp' + new Date().getTime();

            /* Calculate cache hash. */
            var hash = auth.getApiSignature(params);

            /* Check cache. */
            if (typeof (cache) != 'undefined' && cache.contains(hash) && !cache.isExpired(hash)) {
                if (typeof (callbacks.success) != 'undefined') {
                    callbacks.success(cache.load(hash));
                }

                return;
            }

            /* Set callback name and response format. */
            params.callback = jsonp;
            params.format = 'json';

            /* Create JSONP callback function. */
            window[jsonp] = function (data) {
                /* Is a cache available?. */
                if (typeof (cache) != 'undefined') {
                    var expiration = cache.getExpirationTime(params);

                    if (expiration > 0) {
                        cache.store(hash, data, expiration);
                    }
                }

                /* Call user callback. */
                if (typeof (data.error) != 'undefined') {
                    if (typeof (callbacks.error) != 'undefined') {
                        callbacks.error(data.error, data.message);
                    }
                }
                else if (typeof (callbacks.success) != 'undefined') {
                    callbacks.success(data);
                }

                /* Garbage collect. */
                window[jsonp] = undefined;

                try {
                    delete window[jsonp];
                }
                catch (e) {
                    /* Nothing. */
                }

                /* Remove script element. */
                if (head) {
                    head.removeChild(script);
                }
            };

            /* Create script element to load JSON data. */
            var head = document.getElementsByTagName("head")[0];
            var script = document.createElement("script");

            /* Build parameter string. */
            var array = [];

            for (var param in params) {
                array.push(encodeURIComponent(param) + "=" + encodeURIComponent(params[param]));
            }

            /* Set script source. */
            script.src = apiUrl + '?' + array.join('&').replace(/%20/g, '+');

            /* Append script element. */
            head.appendChild(script);
        }
    };

    /* Normal method call. */
    var call = function (method, params, callbacks, requestMethod) {
        /* Set default values. */
        params = params || {};
        callbacks = callbacks || {};
        requestMethod = requestMethod || 'GET';

        /* Add parameters. */
        params.method = method;
        params.api_key = apiKey;

        /* Call method. */
        internalCall(params, callbacks, requestMethod);
    };

    /* Signed method call. */
    var signedCall = function (method, params, session, callbacks, requestMethod) {
        /* Set default values. */
        params = params || {};
        callbacks = callbacks || {};
        requestMethod = requestMethod || 'GET';

        /* Add parameters. */
        params.method = method;
        params.api_key = apiKey;

        /* Add session key. */
        if (session && typeof (session.key) != 'undefined') {
            params.sk = session.key;
        }

        /* Get API signature. */
        params.api_sig = auth.getApiSignature(params);

        /* Call method. */
        internalCall(params, callbacks, requestMethod);
    };

    /* Album methods. */
    this.album = {
        addTags: function (params, session, callbacks) {
            /* Build comma separated tags string. */
            if (typeof (params.tags) == 'object') {
                params.tags = params.tags.join(',');
            }

            signedCall('album.addTags', params, session, callbacks, 'POST');
        },

        getBuylinks: function (params, callbacks) {
            call('album.getBuylinks', params, callbacks);
        },

        getInfo: function (params, callbacks) {
            call('album.getInfo', params, callbacks);
        },

        getTags: function (params, session, callbacks) {
            signedCall('album.getTags', params, session, callbacks);
        },

        removeTag: function (params, session, callbacks) {
            signedCall('album.removeTag', params, session, callbacks, 'POST');
        },

        search: function (params, callbacks) {
            call('album.search', params, callbacks);
        },

        share: function (params, session, callbacks) {
            /* Build comma separated recipients string. */
            if (typeof (params.recipient) == 'object') {
                params.recipient = params.recipient.join(',');
            }

            signedCall('album.share', params, callbacks);
        }
    };

    /* Artist methods. */
    this.artist = {
        addTags: function (params, session, callbacks) {
            /* Build comma separated tags string. */
            if (typeof (params.tags) == 'object') {
                params.tags = params.tags.join(',');
            }

            signedCall('artist.addTags', params, session, callbacks, 'POST');
        },

        getEvents: function (params, callbacks) {
            call('artist.getEvents', params, callbacks);
        },

        getImages: function (params, callbacks) {
            call('artist.getImages', params, callbacks);
        },

        getInfo: function (params, callbacks) {
            call('artist.getInfo', params, callbacks);
        },

        getPastEvents: function (params, callbacks) {
            call('artist.getPastEvents', params, callbacks);
        },

        getPodcast: function (params, callbacks) {
            call('artist.getPodcast', params, callbacks);
        },

        getShouts: function (params, callbacks) {
            call('artist.getShouts', params, callbacks);
        },

        getSimilar: function (params, callbacks) {
            call('artist.getSimilar', params, callbacks);
        },

        getTags: function (params, session, callbacks) {
            signedCall('artist.getTags', params, session, callbacks);
        },

        getTopAlbums: function (params, callbacks) {
            call('artist.getTopAlbums', params, callbacks);
        },

        getTopFans: function (params, callbacks) {
            call('artist.getTopFans', params, callbacks);
        },

        getTopTags: function (params, callbacks) {
            call('artist.getTopTags', params, callbacks);
        },

        getTopTracks: function (params, callbacks) {
            call('artist.getTopTracks', params, callbacks);
        },

        removeTag: function (params, session, callbacks) {
            signedCall('artist.removeTag', params, session, callbacks, 'POST');
        },

        search: function (params, callbacks) {
            call('artist.search', params, callbacks);
        },

        share: function (params, session, callbacks) {
            /* Build comma separated recipients string. */
            if (typeof (params.recipient) == 'object') {
                params.recipient = params.recipient.join(',');
            }

            signedCall('artist.share', params, session, callbacks, 'POST');
        },

        shout: function (params, session, callbacks) {
            signedCall('artist.shout', params, session, callbacks, 'POST');
        }
    };

    /* Auth methods. */
    this.auth = {
        getMobileSession: function (params, callbacks) {
            /* Set new params object with authToken. */
            params = {
                username: params.username,
                authToken: md5(params.username + md5(params.password))
            };

            signedCall('auth.getMobileSession', params, null, callbacks);
        },

        getSession: function (params, callbacks) {
            signedCall('auth.getSession', params, null, callbacks);
        },

        getToken: function (callbacks) {
            signedCall('auth.getToken', null, null, callbacks);
        },

        /* Deprecated. Security hole was fixed. */
        getWebSession: function (callbacks) {
            /* Save API URL and set new one (needs to be done due to a cookie!). */
            var previuousApiUrl = apiUrl;

            apiUrl = 'http://ext.last.fm/2.0/';

            signedCall('auth.getWebSession', null, null, callbacks);

            /* Restore API URL. */
            apiUrl = previuousApiUrl;
        }
    };

    /* Event methods. */
    this.event = {
        attend: function (params, session, callbacks) {
            signedCall('event.attend', params, session, callbacks, 'POST');
        },

        getAttendees: function (params, session, callbacks) {
            call('event.getAttendees', params, callbacks);
        },

        getInfo: function (params, callbacks) {
            call('event.getInfo', params, callbacks);
        },

        getShouts: function (params, callbacks) {
            call('event.getShouts', params, callbacks);
        },

        share: function (params, session, callbacks) {
            /* Build comma separated recipients string. */
            if (typeof (params.recipient) == 'object') {
                params.recipient = params.recipient.join(',');
            }

            signedCall('event.share', params, session, callbacks, 'POST');
        },

        shout: function (params, session, callbacks) {
            signedCall('event.shout', params, session, callbacks, 'POST');
        }
    };

    /* Geo methods. */
    this.geo = {
        getEvents: function (params, callbacks) {
            call('geo.getEvents', params, callbacks);
        },

        getMetroArtistChart: function (params, callbacks) {
            call('geo.getMetroArtistChart', params, callbacks);
        },

        getMetroHypeArtistChart: function (params, callbacks) {
            call('geo.getMetroHypeArtistChart', params, callbacks);
        },

        getMetroHypeTrackChart: function (params, callbacks) {
            call('geo.getMetroHypeTrackChart', params, callbacks);
        },

        getMetroTrackChart: function (params, callbacks) {
            call('geo.getMetroTrackChart', params, callbacks);
        },

        getMetroUniqueArtistChart: function (params, callbacks) {
            call('geo.getMetroUniqueArtistChart', params, callbacks);
        },

        getMetroUniqueTrackChart: function (params, callbacks) {
            call('geo.getMetroUniqueTrackChart', params, callbacks);
        },

        getMetroWeeklyChartlist: function (params, callbacks) {
            call('geo.getMetroWeeklyChartlist', params, callbacks);
        },

        getTopArtists: function (params, callbacks) {
            call('geo.getTopArtists', params, callbacks);
        },

        getTopTracks: function (params, callbacks) {
            call('geo.getTopTracks', params, callbacks);
        }
    };

    /* Group methods. */
    this.group = {
        getMembers: function (params, callbacks) {
            call('group.getMembers', params, callbacks);
        },

        getWeeklyAlbumChart: function (params, callbacks) {
            call('group.getWeeklyAlbumChart', params, callbacks);
        },

        getWeeklyArtistChart: function (params, callbacks) {
            call('group.group.getWeeklyArtistChart', params, callbacks);
        },

        getWeeklyChartList: function (params, callbacks) {
            call('group.getWeeklyChartList', params, callbacks);
        },

        getWeeklyTrackChart: function (params, callbacks) {
            call('group.getWeeklyTrackChart', params, callbacks);
        }
    };

    /* Library methods. */
    this.library = {
        addAlbum: function (params, session, callbacks) {
            signedCall('library.addAlbum', params, session, callbacks, 'POST');
        },

        addArtist: function (params, session, callbacks) {
            signedCall('library.addArtist', params, session, callbacks, 'POST');
        },

        addTrack: function (params, session, callbacks) {
            signedCall('library.addTrack', params, session, callbacks, 'POST');
        },

        getAlbums: function (params, callbacks) {
            call('library.getAlbums', params, callbacks);
        },

        getArtists: function (params, callbacks) {
            call('library.getArtists', params, callbacks);
        },

        getTracks: function (params, callbacks) {
            call('library.getTracks', params, callbacks);
        }
    };

    /* Playlist methods. */
    this.playlist = {
        addTrack: function (params, session, callbacks) {
            signedCall('playlist.addTrack', params, session, callbacks, 'POST');
        },

        create: function (params, session, callbacks) {
            signedCall('playlist.create', params, session, callbacks, 'POST');
        },

        fetch: function (params, callbacks) {
            call('playlist.fetch', params, callbacks);
        }
    };

    /* Radio methods. */
    this.radio = {
        getPlaylist: function (params, session, callbacks) {
            signedCall('radio.getPlaylist', params, session, callbacks);
        },

        tune: function (params, session, callbacks) {
            signedCall('radio.tune', params, session, callbacks);
        }
    };

    /* Tag methods. */
    this.tag = {
        getSimilar: function (params, callbacks) {
            call('tag.getSimilar', params, callbacks);
        },

        getTopAlbums: function (params, callbacks) {
            call('tag.getTopAlbums', params, callbacks);
        },

        getTopArtists: function (params, callbacks) {
            call('tag.getTopArtists', params, callbacks);
        },

        getTopTags: function (callbacks) {
            call('tag.getTopTags', null, callbacks);
        },

        getTopTracks: function (params, callbacks) {
            call('tag.getTopTracks', params, callbacks);
        },

        getWeeklyArtistChart: function (params, callbacks) {
            call('tag.getWeeklyArtistChart', params, callbacks);
        },

        getWeeklyChartList: function (params, callbacks) {
            call('tag.getWeeklyChartList', params, callbacks);
        },

        search: function (params, callbacks) {
            call('tag.search', params, callbacks);
        }
    };

    /* Tasteometer method. */
    this.tasteometer = {
        compare: function (params, callbacks) {
            call('tasteometer.compare', params, callbacks);
        }
    };

    /* Track methods. */
    this.track = {
        addTags: function (params, session, callbacks) {
            signedCall('track.addTags', params, session, callbacks, 'POST');
        },

        ban: function (params, session, callbacks) {
            signedCall('track.ban', params, session, callbacks, 'POST');
        },

        getBuylinks: function (params, callbacks) {
            call('track.getBuylinks', params, callbacks);
        },

        getInfo: function (params, callbacks) {
            call('track.getInfo', params, callbacks);
        },

        getSimilar: function (params, callbacks) {
            call('track.getSimilar', params, callbacks);
        },

        getTags: function (params, session, callbacks) {
            signedCall('track.getTags', params, session, callbacks);
        },

        getTopFans: function (params, callbacks) {
            call('track.getTopFans', params, callbacks);
        },

        getTopTags: function (params, callbacks) {
            call('track.getTopTags', params, callbacks);
        },

        love: function (params, session, callbacks) {
            signedCall('track.love', params, session, callbacks, 'POST');
        },

        removeTag: function (params, session, callbacks) {
            signedCall('track.removeTag', params, session, callbacks, 'POST');
        },

        search: function (params, callbacks) {
            call('track.search', params, callbacks);
        },

        share: function (params, session, callbacks) {
            /* Build comma separated recipients string. */
            if (typeof (params.recipient) == 'object') {
                params.recipient = params.recipient.join(',');
            }

            signedCall('track.share', params, session, callbacks, 'POST');
        },

        updateNowPlaying: function (params, session, callbacks) {
            signedCall('track.updateNowPlaying', params, session, callbacks, 'POST');
        },

        scrobble: function (params, session, callbacks) {
            signedCall('track.scrobble', params, session, callbacks, 'POST');
        }
    };

    /* User methods. */
    this.user = {
        getArtistTracks: function (params, callbacks) {
            call('user.getArtistTracks', params, callbacks);
        },

        getEvents: function (params, callbacks) {
            call('user.getEvents', params, callbacks);
        },

        getFriends: function (params, callbacks) {
            call('user.getFriends', params, callbacks);
        },

        getInfo: function (params, callbacks) {
            call('user.getInfo', params, callbacks);
        },

        getLovedTracks: function (params, callbacks) {
            call('user.getLovedTracks', params, callbacks);
        },

        getNeighbours: function (params, callbacks) {
            call('user.getNeighbours', params, callbacks);
        },

        getPastEvents: function (params, callbacks) {
            call('user.getPastEvents', params, callbacks);
        },

        getPlaylists: function (params, callbacks) {
            call('user.getPlaylists', params, callbacks);
        },

        getRecentStations: function (params, session, callbacks) {
            signedCall('user.getRecentStations', params, session, callbacks);
        },

        getRecentTracks: function (params, callbacks) {
            call('user.getRecentTracks', params, callbacks);
        },

        getRecommendedArtists: function (params, session, callbacks) {
            signedCall('user.getRecommendedArtists', params, session, callbacks);
        },

        getRecommendedEvents: function (params, session, callbacks) {
            signedCall('user.getRecommendedEvents', params, session, callbacks);
        },

        getShouts: function (params, callbacks) {
            call('user.getShouts', params, callbacks);
        },

        getTopAlbums: function (params, callbacks) {
            call('user.getTopAlbums', params, callbacks);
        },

        getTopArtists: function (params, callbacks) {
            call('user.getTopArtists', params, callbacks);
        },

        getTopTags: function (params, callbacks) {
            call('user.getTopTags', params, callbacks);
        },

        getTopTracks: function (params, callbacks) {
            call('user.getTopTracks', params, callbacks);
        },

        getWeeklyAlbumChart: function (params, callbacks) {
            call('user.getWeeklyAlbumChart', params, callbacks);
        },

        getWeeklyArtistChart: function (params, callbacks) {
            call('user.getWeeklyArtistChart', params, callbacks);
        },

        getWeeklyChartList: function (params, callbacks) {
            call('user.getWeeklyChartList', params, callbacks);
        },

        getWeeklyTrackChart: function (params, callbacks) {
            call('user.getWeeklyTrackChart', params, callbacks);
        },

        shout: function (params, session, callbacks) {
            signedCall('user.shout', params, session, callbacks, 'POST');
        }
    };

    /* Venue methods. */
    this.venue = {
        getEvents: function (params, callbacks) {
            call('venue.getEvents', params, callbacks);
        },

        getPastEvents: function (params, callbacks) {
            call('venue.getPastEvents', params, callbacks);
        },

        search: function (params, callbacks) {
            call('venue.search', params, callbacks);
        }
    };

    /* Private auth methods. */
    var auth = {
        getApiSignature: function (params) {
            var keys = [];
            var string = '';

            for (var key in params) {
                keys.push(key);
            }

            keys.sort();

            for (var index in keys) {
                var key = keys[index];

                string += key + params[key];
            }

            string += apiSecret;

            /* Needs lastfm.api.md5.js. */
            return md5(string);
        }
    };
}


function Scrobbler() {
    var lastfm = new LastFM({
        apiKey: 'b8d20b4f40e652f813ad5807e9e8e8a0',
        apiSecret: '336cb632d905f25577cb75e446857d50'
    });

    var Storage = {
        save: function (key, value) {
            var v = JSON.stringify(value);
            if (localStorage) {
                localStorage.setItem(key, v);
            }
        },
        load: function (key) {
            if (localStorage) {
                return JSON.parse(localStorage.getItem(key));
            }
        },
        remove: function (key) {
            if (localStorage) {
                localStorage.removeItem(key);
            }
        }
    };

    var insertLastFmLogo = function () {
        var lastfmLogo = document.createElement("div");
        lastfmLogo.innerHTML = '<a href = "javascript:;"><img id="lastFmLogo" src="http://cdn.last.fm/flatness/favicon.2.ico" alt= "Last.fm" /></a>';
        lastfmLogo.style.float = 'left';
        lastfmLogo.style.margin = '8px 0px 0px 5px';
        $('#banner_action')[0].appendChild(lastfmLogo);

        var animestop = false;
        var logo = $('#lastFmLogo');

        var controller = {
            isActive: true,
            active: function () {
                logo.fadeTo('slow', 1);
                controller.isActive = true;
            },
            deactive: function () {
                logo.fadeTo('slow', .3);
                controller.isActive = false;
            },
            flash: function (show) {
                logo.fadeTo((show ? 150 : 300), (show ? 1 : .3), function () {
                    if (!animestop) {
                        controller.flash(!show);
                    }
                    else {
                        animestop = false;
                    }
                });
            },
            stop: function (active) {
                animestop = true;
                logo.stop();
                controller.isActive = active;
                (controller.isActive ? controller.active : controller.deactive)();
            },
            click: function (handler) {
                logo.click(handler);
            }
        }
        return controller;
    };

    var showLoginForm = function (callback) {
        var dialogHtml =
	        '<div><h3>Login into Last.fm</h3>' +
	        '<div class="dialog_content">' +
            '   <div><label>Username: <input type="text" id="lastfmusername" style="width:98%;height: 20px" value=""/></label></div>' +
            '   <div><label>Password: <input type="password" id="lastfmpassword" style="width:98%;height: 20px" value=""/></label></div>' +
            '   <div><input id="lastfmconfirm" type="button" value="Ok" style="width:100px"/></div>' +
	        '</div>' +
	        '<p class="close"><a href="javascript:;" title="" onclick="closedialog();">Close</a></p></div>';
        showDialog('');
        $('.dialog_main').html(dialogHtml);

        $('#lastfmconfirm').click(function () {
            callback({ username: $('#lastfmusername')[0].value, password: $('#lastfmpassword')[0].value });
            $('#lastfmpassword')[0].value = '';
            closedialog();
        });
    }

    var logo = insertLastFmLogo();
    var session = null;
    var state = {
        auth: false,
        active: true
    };
    logo.click(function () {
        if (logo.isActive) {
            logo.deactive();
            state.active = false;
            state.auth = false;
        } else {
            if (!state.auth) {
                showLoginForm(lastfmAuth);
            }
            else {
                logo.active();
            }
            state.active = true;
        }
    });

    var lastfmAuth = function (userparam) {
        logo.flash(false);
        lastfm.auth.getMobileSession(userparam, { success: function (ret) {
            session = ret.session;
            state.auth = true;
            Storage.save('LastFmUser', userparam);
            logo.stop(true);
        }, error: function () {
            alert('last.fm auth failed!');
            Storage.remove('LastFmUser');
            logo.stop(false);
        }
        });
    }

    var user = Storage.load("LastFmUser");
    if (user) {
        lastfmAuth(user);
    } else {
        logo.deactive();
    }

    var nowplaying = null;	
    var player_changeSong_org = player_changeSong;
	
	getAlbumName = function(obj, cb) {
		if(nowplaying.album) { cb(); return; }
		$.post('/song/relate-info', obj, function (data) {
            if (!data) {				
                cb();
                return;
            }
            else {
                try {
                    var re = /<a[^>]*title="(.*)"[^>]*href="\/album\/[^"]*"[^>]*>/g;
                    re.exec(data);
					nowplaying.album = RegExp.$1;                    
                }catch(e){				
				}
				finally{
                    cb();
                }
				
				//---- xiami official code ----
				$('#info_con').html(data);
				$("#iframe_adm").attr('src','/song/iframe-adm?'+1000*Math.random());
				
				if($('<div>'+data+'</div>').children('.con_items').size()==2)
					$("#info_end").attr('style','display:none');
				else
					$("#info_end").attr('style','display:block');
				
				infoBindClick();

				var $trendsd = $("#trendsd");
				var scrollTimer;
				$trendsd.find('li').hover(function(){
					$(this).addClass('current');
				},function(){
					$(this).removeClass('current');
				});
				$trendsd.hover(function(){
					clearInterval(scrollTimer);
				},function(){
					scrollTimer = setInterval(function(){
						scrollNews( $trendsd );
					}, 3500 );
				}).trigger("mouseleave");

				$('.arcon').find('li').hover(function(){
					$(this).addClass('current');
				},function(){
					$(this).removeClass('current');
				});
				//---- xiami official code ----
            }			
        });
	}
	
    player_changeSong = function (obj) {
        nowplaying = {
            track: obj.songName,
            artist: obj.artist,
            timestamp: Math.round(new Date().getTime() / 1000)
        };

        var updateNowPlaying = function () {
            if (state.active && state.auth) {
				var param = jQuery.extend({}, nowplaying);				
                lastfm.track.updateNowPlaying(param, session, function (ret) { });
            };
        }

        document.title = obj.songName + "\u2014\u2014\u867e\u5c0f\u7c73\u6253\u789f\u4e2d\u2026\u2026";
		getAlbumName(obj, function(){
			updateNowPlaying();
		});
    };

    var player_playRecord_org = player_playRecord;
	player_playRecord = function(obj){
		getAlbumName(obj, function(){
			if (state.active && state.auth && nowplaying.track == obj.songName) {
				var param = jQuery.extend({}, nowplaying);				
				lastfm.track.scrobble(param, session, function (ret) { });
			}        
		});
        player_playRecord_org(obj);
	}
}

//inject script to the background page;
var script = document.createElement('script');
var scriptText =
Md5Crypt +
LastFM +
Scrobbler +
'Scrobbler();';
script.appendChild(document.createTextNode(scriptText));
(document.body || document.head || document.documentElement).appendChild(script);
