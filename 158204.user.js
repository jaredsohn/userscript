// ==UserScript==
// @name        LCL - No Virtual Keyboard
// @namespace   org.bouil
// @description Remove virtual keyboard and add a classic input text field for the password on LCL website https://particuliers.secure.lcl.fr/outil/UAUT
// @include     https://*.secure.lcl.fr/*
// @version     0.9.3
// @require  https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant    GM_info
// ==/UserScript==
/**** START of MD5 by http://www.webtoolkit.info/  - License CC BY http://creativecommons.org/licenses/by/2.0/uk/ */
/**
 *
 *  MD5 (Message-Digest Algorithm)
 *  http://www.webtoolkit.info/
 *
 **/
function MD5(string) {

    function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function F(x, y, z) {
        return (x & y) | ((~x) & z);
    }

    function G(x, y, z) {
        return (x & z) | (y & (~z));
    }

    function H(x, y, z) {
        return (x ^ y ^ z);
    }

    function I(x, y, z) {
        return (y ^ (x | (~z)));
    }

    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    function WordToHex(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9 , S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

    string = Utf8Encode(string);

    x = ConvertToWordArray(string);

    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;

    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }

    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

    return temp.toLowerCase();
}

/**** END of MD5 from http://www.webtoolkit.info/  - License CC BY http://creativecommons.org/licenses/by/2.0/uk/ */

var debug = false;

var start = function (jQuery) {
    
    if (debug){
        console.log('jQuery is installed with no conflicts! The version is: ' + $.fn.jquery);
    }

    var scriptNumber = "158204";
    var scriptHome = "http://userscripts.org/scripts/show/" + scriptNumber;


    var metaData = function(str) {
      if ("undefined" !== typeof(GM_info))
        return GM_info.script[str];
      else
        return GM_getMetadata(str);
    }


    var number2Grilleposition;

    var get_number = function (imageDataBase64) {
        var md5ToNumber = new Object();
        // firefox
        md5ToNumber["e9e07e8e6894dd42ddda9fbf2ecd3a00"] = 0;
        md5ToNumber["6285ac842f6d42f97ea8325f9b081c07"] = 1;
        md5ToNumber["0298b2abec5f6a6d122fdf047bfa1041"] = 2;
        md5ToNumber["f4393edd45e72e3e4c222e60e6dc3191"] = 3;
        md5ToNumber["e30c2870441ac2fdf4be23b88109c7f6"] = 4;
        md5ToNumber["8421aa6a9a2ab9552dab04c97e9cf522"] = 5;
        md5ToNumber["b224cbab312d84ededa5f86660121dbd"] = 6;
        md5ToNumber["52c287d112beddf5de5fd71a02cb3092"] = 7;
        md5ToNumber["a6e26601494735643ab28f3bff3cb4ac"] = 8;
        md5ToNumber["e83d0058887db2a78327f44640605b7c"] = 9;

        // chrome
        md5ToNumber["bc2048fc38912eee2f86f7afe833148d"] = 0;
        md5ToNumber["0feee6afd2647c04c1b8b9c5e666604c"] = 1;
        md5ToNumber["4ff57cb01c9db0c2254f8e5b824f6519"] = 2;
        md5ToNumber["3e457d68ef50b1012a0e2153bca6dfe9"] = 3;
        md5ToNumber["aa8f0a6e46dfa27b1048ff1a8d88cbbb"] = 4;
        md5ToNumber["5a75fc01ad25284cbf894010d45d1fe6"] = 5;
        md5ToNumber["49c7a0f8838efbd5b99e702f225a4d0e"] = 6;
        md5ToNumber["66e2c15e2768d7b3d06ff512b69be33a"] = 7;
        md5ToNumber["0c1a80f6ee9539c2ed32526679294209"] = 8;
        md5ToNumber["c9d94cc2e98c773625bed0d98949c63e"] = 9;

        var imageMd5 = MD5(imageDataBase64);
        var number = md5ToNumber[imageMd5];
        return number;
    };

    /**
     * Taken from http://userscripts.org/scripts/show/126488 - FreeMobile TinyAuth
     */
    var convert_color = function convert_color(image_data) {
        for (var x = 0; x < image_data.width; x++) {
            for (var y = 0; y < image_data.height; y++) {
                var i = x * 4 + y * 4 * image_data.width;
                if (image_data.data[i] > 200) {
                    image_data.data[i] = 255;
                    image_data.data[i + 1] = 255;
                    image_data.data[i + 2] = 255;
                    image_data.data[i + 3] = 255;
                } else {
                    image_data.data[i] = 0;
                    image_data.data[i + 1] = 0;
                    image_data.data[i + 2] = 0;
                    image_data.data[i + 3] = 255;
                }
            }
        }
    };

    var findEdges = function (image_data) {

        var result = new Object();
        result.minWhiteFoundX = image_data.width;
        result.minWhiteFoundY = image_data.height;
        result.maxWhiteFoundX = 0;
        result.maxWhiteFoundY = 0;

        for (var x = 0; x < image_data.width; x++) {
            for (var y = 0; y < image_data.height; y++) {
                var i = x * 4 + y * 4 * image_data.width;

                if ((image_data.data[i] == 255)) {
                    result.minWhiteFoundX = Math.min(x, result.minWhiteFoundX);
                    result.minWhiteFoundY = Math.min(y, result.minWhiteFoundY);
                    result.maxWhiteFoundX = Math.max(x, result.maxWhiteFoundX);
                    result.maxWhiteFoundY = Math.max(y, result.maxWhiteFoundY);
                }
            }
        }
        return result;
    }

    var decodeLCL = function ($grilleImg) {

        if (debug){
            console.log("Decode Grille");
        }

        var canvas, canvas2, ctx, ctx2, imageData;
        var debugCanvas, debugCtx;

        var imageClip = 2;
        var initialGutter = imageClip + 0;
        var xGutterSize = (2 * imageClip) + 7;
        var yGutterSize = (2 * imageClip) + 6;
        var numberSize = 29 - (2 * imageClip);

        number2Grilleposition = new Object();

        var cols = 5;
        var rows = 2;
        for (x = 1; x <= cols; x++) {
            for (y = 1; y <= rows; y++) {
                canvas = document.createElement("canvas");
                canvas.setAttribute("width", numberSize);
                canvas.setAttribute("height", numberSize);
                canvas.setAttribute("style", "display: inline; border: 1px solid red;");
                ctx = canvas.getContext('2d');

                ctx.fillStyle = "rgb(0,0,0)";
                ctx.fillRect(0, 0, numberSize, numberSize);

                var sx = initialGutter + ((x - 1) * xGutterSize) + (numberSize * (x - 1));
                var sy = initialGutter + ((y - 1) * yGutterSize) + (numberSize * (y - 1));

                ctx.drawImage($grilleImg.get()[0], sx, sy, numberSize, numberSize, 0, 0, numberSize, numberSize);
                imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                convert_color(imageData);
                ctx.putImageData(imageData, 0, 0);
                var edges = findEdges(imageData);

                // draw a new canvas
                canvas2 = document.createElement("canvas");
                var edgesWidth = edges.maxWhiteFoundX - edges.minWhiteFoundX + 1;
                var edgesHeight = edges.maxWhiteFoundY - edges.minWhiteFoundY + 1;
                canvas2.setAttribute("width", edgesWidth);
                canvas2.setAttribute("height", edgesHeight);
                canvas2.setAttribute("style", "display: inline; border: 1px solid red;");
                ctx2 = canvas2.getContext('2d');
                ctx2.fillStyle = "rgb(0,0,0)";
                ctx2.fillRect(0, 0, edges.imgW, edges.imgH);
                ctx2.drawImage($grilleImg.get()[0], sx + edges.minWhiteFoundX, sy + edges.minWhiteFoundY, edgesWidth,
                               edgesHeight, 0, 0, edgesWidth, edgesHeight);
                imageData = ctx2.getImageData(0, 0, canvas.width, canvas.height);
                convert_color(imageData);
                ctx2.putImageData(imageData, 0, 0);

                var imageDataBase64 = canvas2.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/, "");
                var number = get_number(imageDataBase64);

                var positionGrille = (((x - 1) * rows) + y);

                if (debug) {
                    var br = document.createElement("br");
                    jQuery("body").append(br);
                    jQuery("body").append(canvas);
                    jQuery("body").append(canvas2);
                    $numberElement = jQuery(document.createElement("span")).attr("style",
                                                                                 "border-bottom: 1px solid red;").text(" row=" +
                                                                                                                           y +
                                                                                                                           ";col=" +
                                                                                                                           x +
                                                                                                                           ";img=" +
                                                                                                                           positionGrille +
                                                                                                                           " = " +
                                                                                                                           MD5(imageDataBase64) +
                                                                                                                           " = " +
                                                                                                                           number);
                    jQuery("body").append($numberElement)
                    jQuery("body").append(br);
                }

                if (number != -1) {
                    number2Grilleposition[number] = positionGrille;
                }

                if (number < -1 || number > 9) {
                    alert("Décodage de la grille échoué " + number);
                    throw new Error("Décodage échoué.");
                }

            }
        }

        for(var i = 0 ; i < 10 ; i++){
            if (number2Grilleposition[i] == undefined){
                alert("Grille non decodee pour le chiffre " + i);
                break;
            }
        }

        if (debug) {
            console.log(number2Grilleposition);
        }
    };

    /**
     * Called when user click on the link to log in
     */
    var typePassword = function () {

        // input ou mettrele numéro
        $encodedPasswordField = jQuery("input#postClavier");
        $encodedPasswordField2 = jQuery("input#CodeId");

        if (!number2Grilleposition) {
            alert("Grille non decodee");
            return;
        }
        var password = jQuery("#gm_password").val();
        var encodedPassword = "";
        for (s = 0; s < password.length; s++) {
            var grilleChar = number2Grilleposition[password[s]];
            if (grilleChar < 10) {
                encodedPassword += "0" + grilleChar;
            } else {
                encodedPassword += grilleChar;
            }
        }
        $encodedPasswordField.val(encodedPassword);
        $encodedPasswordField2.val(password);

    };

    /**
     * Add some CSS
     */
    var addCustomCss = function () {
        var style = document.createElement("style");
        style.setAttribute("type", "text/css");
        style.innerHTML = "<!-- ";
        //    style.innerHTML += bootstrapCss;
        style.innerHTML += " -->";
        document.head.appendChild(style);

    };

    var customizeUi = function () {
        "use strict";
        var $top = jQuery("body");
        var $fieldset = jQuery("form#formNoSend fieldset").first();
        if ($fieldset.length == 0) {
            $fieldset = jQuery("div#clavierVirtuel fieldset form").first();
        }

        // add a new input password

        var $fieldLabel = jQuery(document.createElement("div")).addClass("fieldLabel");
        var $label = jQuery(document.createElement("label")).attr("for", "gm_password").text("Code d'acces");
        var $span = jQuery(document.createElement("span")).addClass("inputNumCompte");
        var $gmPassword = jQuery(document.createElement("input")).attr("type", "password").attr("id",
                                                                                                "gm_password").attr("name",
                                                                                                                    "gm_password");
        $span.append($gmPassword);
        $fieldLabel.append($label);
        $fieldLabel.append($span);
        $fieldset.append($fieldLabel);

        // bind events

        $gmPassword.bind("change", typePassword);
        $gmPassword.bind("keyup", typePassword);

        // add some info about this script

        var $baseline = jQuery(document.createElement("div")).attr("style",
                                                                   "clear: both; background-color: lightgray;%; text-align: center; padding: 1em;");
        var $p = jQuery(document.createElement("h3")).text("LCL - No Virtual Keyboard");
        $p.append($a);
        $baseline.append($p);
        $baseline.append(jQuery(document.createElement("p")).addClass("muted").text("Version " + metaData("version")));
        var $a = jQuery(document.createElement("a")).attr("href", scriptHome).attr("style",
                                                                                   "font-size: 100%;").text(scriptHome);
        $baseline.append(jQuery(document.createElement("p")).append($a));

        jQuery(".blocDroite").append($baseline);

        if (!debug) {
            jQuery("form#formNoSend fieldset").last().hide();
            jQuery("form#formNoSend fieldset").last().prev().hide();
            jQuery("div#clavierVirtuel fieldset").last().hide();
            jQuery("div#clavierVirtuel fieldset").last().prev().hide();
        }
    };

    var $imgGrille = jQuery("#idImageClavier");

    if ($imgGrille.length == 0) {
        if (debug){
            console.log("Aucune grille d'identification trouvee")
        }
        $("#home_accesclient").click(function(){setTimeout(function(){start(jQuery)}, 2000)});
        return;
    }

    setTimeout(function () {
        decodeLCL($imgGrille);
        customizeUi();
    }, 1000);


};

/*
http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome/12751531#12751531
 */

var add_jQuery = function(callbackFn, jqVersion) {
    var jqVersion   = jqVersion || "1";
    var D           = document;
    var targ        = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    var scriptNode  = D.createElement ('script');
    scriptNode.src  = 'https://ajax.googleapis.com/ajax/libs/jquery/'
                    + jqVersion
                    + '/jquery.min.js'
                    ;
    scriptNode.addEventListener ("load", function () {
        var scriptNode          = D.createElement ("script");
        scriptNode.textContent  =
            'var gm_jQuery  = jQuery.noConflict (true);\n'
            + '(' + callbackFn.toString () + ')(gm_jQuery);'
        ;
        targ.appendChild (scriptNode);
    }, false);
    targ.appendChild (scriptNode);
};

if (typeof jQuery === "function") {
    if (debug){
        console.log ("Running with local copy of jQuery!");
    }
    start(jQuery);
}
else {
    if (debug){
        console.log ("Fetching jQuery from some 3rd-party server.");
    }
    add_jQuery (start, "1");
}

