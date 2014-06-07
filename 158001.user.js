// ==UserScript==
// @name          BNP Paribas - No Virtual Keyboard
// @namespace     org.bouil
// @description   Remove virtual keyboard and add a classic input text field for the password on BNP Paribas website https://www.secure.bnpparibas.net
// @include       https://www.secure.bnpparibas.net/banque/portail/particulier/HomeConnexion*
// @include       http://localhost:5789/tests/bnp/Tous%20les%20produits%20et%20services%20de%20votre%20banque%20en%20France.html
// @version       1.4.0
// @updateURL     http://userscripts.org/scripts/source/158001.user.js
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @resource      bootstrapcss https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css
// @grant         GM_addStyle
// @grant         GM_info
// @grant         GM_getResourceText
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

var scriptName= GM_info.script.name
var version = GM_info.script.version;
var debug = false;

var md5ToNumber = new Object();
// firefox
md5ToNumber["f3543cedaee50789fc8ce978ce402399"] = -1;
md5ToNumber["23c03b703a8a817b1a314c9fb80cb7fa"] = 0;
md5ToNumber["744f74197d3a9526c04259bd058f278f"] = 1;
md5ToNumber["527a26b94f74de72e4b630313e518d59"] = 2;
md5ToNumber["4b37641fbeebe7d0cb7d6a9725ec07b0"] = 3;
md5ToNumber["ae9f29c4db8f33224f525242c45db607"] = 4;
md5ToNumber["ae9f29c4db8f33224f525242c45db607"] = 4;
md5ToNumber["b9268ee64a09cfb95f756c1850959b1f"] = 5;
md5ToNumber["4f521ab60c7dccb31a4df734cc1a01ba"] = 6;
md5ToNumber["5bb3a6c80cbf9aa379ca2b64b6e379b7"] = 7;
md5ToNumber["9fa178bbb2c86711f7f6a537e235ef2d"] = 8;
md5ToNumber["390f9e42e02fe5e91f2384ab25b24f4b"] = 9;

// chrome
md5ToNumber["83a3102b20ac27ecfb56f58cc81db2b3"] = -1;
md5ToNumber["0e5e939030233b16142d780f851e1d17"] = 0;
md5ToNumber["aceef4b573b173f1a8ba71832b4cbd03"] = 1;
md5ToNumber["4295a72207c26072623486a0fc730e9f"] = 2;
md5ToNumber["9f69717913d583231d7edd7f35b546cd"] = 3;
md5ToNumber["edefdb0e05735bd295d31c9521108e7b"] = 4;
md5ToNumber["2e4d57f80e298758f2bf717c22c9b7e7"] = 5;
md5ToNumber["4f47364e582099205efad7b6465af962"] = 6;
md5ToNumber["5b1c2ce646ea54c438cf23c21732ae17"] = 7;
md5ToNumber["a37439d81d6545237656aa096faa80d4"] = 8;
md5ToNumber["4dbad727dec54840449bdf9fd38c2fa6"] = 9;

var number2GridPosition;

function _(elt) {
    return document.createElement(elt);
};

function getNumberFromImgMd5(imageDataBase64) {

    var imageMd5 = MD5(imageDataBase64);
    var number = md5ToNumber[imageMd5];
    return number;
};

/**
 * Taken from http://userscripts.org/scripts/show/126488 - FreeMobile TinyAuth
 */
function convertColor(image_data) {
    for (var x = 0; x < image_data.width; x++) {
        for (var y = 0; y < image_data.height; y++) {
            var i = x * 4 + y * 4 * image_data.width;
            var luma = Math.floor(image_data.data[i] * 299 / 1000 + image_data.data[i + 1] * 587 / 1000 +
                                      image_data.data[i + 2] * 114 / 1000);

            image_data.data[i] = luma;
            image_data.data[i + 1] = luma;
            image_data.data[i + 2] = luma;
            image_data.data[i + 3] = 255;
            if (image_data.data[i] > 200 || image_data.data[i + 3] == 0) {
                image_data.data[i] = 255;
                image_data.data[i + 1] = 255;
                image_data.data[i + 2] = 255;
                image_data.data[i + 3] = 0;
            }
        }
    }
};

function decodeGrid(gridImgSrc) {
    var canvas, ctx, imageData;
    var img = new Image();
    img.src = gridImgSrc;

    number2GridPosition = new Object();

    for (y = 1; y <= 5; y++) {
        for (x = 1; x <= 5; x++) {
            canvas = _("canvas");
            canvas.setAttribute("width", 26);
            canvas.setAttribute("height", 26);
            canvas.setAttribute("style", "display: inline; border: 1px solid red;");
            ctx = canvas.getContext('2d');

            ctx.fillStyle = "rgb(255,255,100)";
            ctx.fillRect(0, 0, 26, 26);
            // chaque case chiffre fait 26px*26px sans la bordure de 1px

            ctx.drawImage(img, x + (26 * (x - 1)), y + (26 * (y - 1)), 26, 26, 0, 0, 26, 26);
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            convertColor(imageData);
            ctx.putImageData(imageData, 0, 0);
            var imageDataBase64 = canvas.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/, "");
            var number = getNumberFromImgMd5(imageDataBase64);
            var gridPosition = (((y - 1) * 5) + x);

            if (debug) {
                var br = _("br");
                $("body").append(br);
                $("body").append(canvas);
                $numberElement =
                    $(_("span")).attr("style", "border-bottom: 1px solid red;").text(" row=" + y + ";col=" + x +
                        ";imgNumber=" + gridPosition +
                        ";md5=" +
                        MD5(imageDataBase64) + " = " +
                        number);
                $("body").append($numberElement)
                $("body").append(br);
            }

            if (number != -1) {
                number2GridPosition[number] = gridPosition;
            }

            if (number < -1 || number > 9) {
                alert("Décodage de la grille échoué " + number);
                throw new Error("Décodage échoué.");
            }

        }
    }

    if (debug) {
        console.log("Number -> Grille =");
        console.log(number2GridPosition);
    }

    for(n=0;n<10;n++){
        if (typeof number2GridPosition[n] == "undefined"){
            alert("Grille non decodee pour le chiffre " + n + ". Essayez de mettre a jour le script ou refraichir la page.");
            break;
        }
    }

    return number2GridPosition;
};

/**
 * Called when user click on the link to log in
 */
function submitGrid($grid) {

    if (!number2GridPosition) {
        alert("Grille non decodee");
        return;
    }

    var password = $("#gm_password").val();
    var $targetPasswordField = $("form[name=logincanalnetbis]").find("input[name=ch5temp]");
    var $targetPasswordStarField = $("form[name=logincanalnetbis]").find("input[name=ch2]");
    for (s = 0; s < password.length; s++) {
        var grilleChar = number2GridPosition[password[s]];
        if (grilleChar < 10) {
            grilleChar = "0" + grilleChar;
        }
        if (debug){
            console.log(grilleChar);
        }
        $targetPasswordField.val($targetPasswordField.val() + grilleChar);
        $targetPasswordStarField.val($targetPasswordStarField.val() + "*");

    }

    if (!debug) {
        var $formToSubmit = $("form[name=logincanalnet]");
        var $passwordToSubmit = $formToSubmit.find("input[name=ch5]");
        $passwordToSubmit.val($targetPasswordField.val());
        $formToSubmit.submit();
    } else {
        console.log("Debug mode: no submit");
    }
};

function addLoginInput($form) {
    // add a new login input

    var $divControlGroupLogin = $(_("div")).addClass("control-group");
    var $labelLogin = $(_("label")).addClass("control-label").attr("for", "ch1").text("Identifiant");
    $divControlGroupLogin.append($labelLogin);
    var $divControlLoginInput = $(_("div")).addClass("controls");

    var $login = $form.find("input[name=ch1]").attr("placeholder", "identifiant");
    $newInputLogin = $login.clone();
    $login.attr("name", "oldCh1");

    // remove the old login input
    var $tableLogin = $form.find(":last-child");
    $tableLogin.hide();

    $newInputLogin.appendTo($divControlLoginInput);

    $divControlGroupLogin.append($divControlLoginInput);

    $form.append($divControlGroupLogin);
    // put caret in login input
    $newInputLogin.focus();
}

function addPasswordInput($form) {
    // add a password input

    var $divControlGroupPassword = $(_("div")).addClass("control-group");
    var $labelPassword = $(_("label")).addClass("control-label").attr("for", "gm_password").text("Mot de passe");
    $divControlGroupPassword.append($labelPassword);
    var $divControlPasswordInput = $(_("div")).addClass("controls");
    var $newInputPassword = $(_("input")).attr("type", "password").attr("name", "gm_password").attr("id",
                                                                                                    "gm_password").attr("autocomplete",
                                                                                                                        "On").attr("maxlength",
                                                                                                                                   "6").attr("placeholder",
                                                                                                                                             "mot de passe");
    $newInputPassword.appendTo($divControlPasswordInput);
    $divControlGroupPassword.append($divControlPasswordInput);
    $form.append($divControlGroupPassword);
}

function addSubmitButton($form, $grid) {
    // add a submit link "button"
    var $divControlGroupSubmit = $(_("div")).addClass("control-group");
    var $divControlButtonInput = $(_("div")).addClass("controls");
    var $newInputButton = $(_("a")).addClass("btn").addClass("btn-primary").text("Acceder aux comptes");
    $newInputButton.appendTo($divControlButtonInput);
    $divControlGroupSubmit.append($divControlButtonInput);
    $form.append($divControlGroupSubmit);
    // bind events
    $newInputButton.bind("click", function () {
        submitGrid($grid);
    });
}

function addScriptInfos($form) {
    // add some info about this script
    var $baseline = $(_("div")).addClass("hero-unit");
    var $p = $(_("h3")).text(scriptName);
    $baseline.append($p);
    $baseline.append($(_("p")).addClass("muted").text("Version " + version));
    $baseline.append($(_("p")));

    $form.append($baseline);
}

function customizeUi($form, $grid) {
    GM_addStyle(GM_getResourceText("bootstrapcss"));

    $form.addClass("form-horizontal");

    addLoginInput($form);

    addPasswordInput($form);

    addSubmitButton($form, $grid);

    addScriptInfos($form);

    if (!debug) {
        $("table.identification div.rubrique").hide();
    }
}

function main() {
    var $form = $("form[name=logincanalnet]");
    var $grid = $("#secret-nbr-keyboard");

    if (!$grid || ($grid.length == 0)) {
        alert("Aucune grille d'identification trouvee")
        return;
    }

    if (debug) {
        console.log("Grid is");
        console.log($grid);
        console.log($grid.get()[0]);
    }

    gridImgSrc = $grid.css('background-image').replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
    if (debug){
        console.log("Grid image = " + gridImgSrc);
    }

    $('<img/>').attr('src', gridImgSrc).load(function() {
        $(this).remove(); // prevent memory leaks
        decodeGrid(gridImgSrc);
        customizeUi($form, $grid);
    });

};

main();
