// ==UserScript==
// @name            FB Message ExpandIt
// @namespace       Expand FB Messages
// @description     Lucifers FB Message Expandit It will let you peek at facebook messages without them knowing you have seen or read them.
// @version         1.1.4
// @date            2013-02-14
// @copyright       2010-2013 Lucifers Scripts (screepts.com) 
// @match           *://*.facebook.com/*
// @include         *://*.facebook.com/*
// @icon            http://mwscripts.screepts.netdna-cdn.com/images/lucifersicon.jpg
// @updateURL http://userscripts.org/scripts/source/159132.meta.js
// ==/UserScript==
//////////////////////////////////////////////////////////////////////////////////////////////
//          This code was brought to you by todays letters kids 666                         //
//                http://screepts.com muahahahaha                                           //
//                      if you love it share it!!!                                          //
//          {Don't be evil & remove my header, love it, leave it & share it...}             //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
// Copyright(C) 2011 Luke Hardiman, luke@hardiman.co.nz			                   		    //
// This work is licensed under a															//
// Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.   		    //
// http://creativecommons.org/licenses/by-nc-sa/3.0/deed.en_US								//
//////////////////////////////////////////////////////////////////////////////////////////////
(function(){       
var _0xcd9a = ["\x77\x65\x62\x4D\x65\x73\x73\x65\x6E\x67\x65\x72\x52\x65\x63\x65\x6E\x74\x4D\x65\x73\x73\x61\x67\x65\x73", "\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64", "\x6C\x69", "\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61\x6D\x65", "\x6C\x65\x6E\x67\x74\x68", "\x67\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65", "\x72\x6F\x6C\x65", "\x6C\x69\x73\x74\x69\x74\x65\x6D", "\x63\x6C\x61\x73\x73\x4E\x61\x6D\x65", "\x74\x65\x73\x74", "\x70\x75\x73\x68", "\x20\x65\x78\x70\x61\x6E\x64\x69\x74", "\x66\x73\x6D", "\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x43\x6C\x61\x73\x73\x4E\x61\x6D\x65", "\x69\x64", "\x72\x61\x6E\x64\x6F\x6D", "\x66\x6C\x6F\x6F\x72", "\x65\x78\x70\x61\x6E\x64\x5F\x69\x74\x5F", "\x5F", "\x61", "\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74", "\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C", "\x3C\x6C\x61\x62\x65\x6C\x20\x63\x6C\x61\x73\x73\x20\x3D\x22\x75\x69\x42\x75\x74\x74\x6F\x6E\x20\x75\x69\x42\x75\x74\x74\x6F\x6E\x4F\x76\x65\x72\x6C\x61\x79\x22\x20\x74\x69\x74\x6C\x65\x3D\x22\x45\x78\x70\x61\x6E\x64\x20\x69\x74\x20\x62\x79\x20\x6C\x75\x63\x69\x66\x65\x72\x73\x20\x53\x63\x72\x69\x70\x74\x73\x2C\x20\x70\x65\x65\x6B\x20\x61\x74\x20\x6D\x65\x73\x73\x61\x67\x65\x73\x20\x77\x69\x74\x68\x6F\x75\x74\x20\x62\x65\x65\x6E\x20\x73\x65\x65\x6E\x22\x3E\x3C\x75\x3E\x45\x78\x70\x61\x6E\x64\x20\x49\x74\x21\x3C\x2F\x75\x3E\x3C\x62\x3E\x2B\x3C\x2F\x62\x3E\x3C\x2F\x6C\x61\x62\x65\x6C\x3E", "\x68\x72\x65\x66", "\x23", "\x6F\x6E\x63\x6C\x69\x63\x6B", "", "\x64\x69\x73\x70\x6C\x61\x79", "\x73\x74\x79\x6C\x65", "\x6E\x6F\x6E\x65", "\x6E\x65\x78\x74\x53\x69\x62\x6C\x69\x6E\x67", "\x69\x6E\x73\x65\x72\x74\x42\x65\x66\x6F\x72\x65", "\x70\x61\x72\x65\x6E\x74\x4E\x6F\x64\x65", "\x44\x4F\x4D\x43\x6F\x6E\x74\x65\x6E\x74\x4C\x6F\x61\x64\x65\x64", "\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72", "\x44\x4F\x4D\x4E\x6F\x64\x65\x49\x6E\x73\x65\x72\x74\x65\x64"];
var expandIt = function () {
    if(document[_0xcd9a[1]](_0xcd9a[0]) === null) {
        return;
    };

    function _0x10ebx2(_0x10ebx3) {
        var _0x10ebx4 = [],
            _0x10ebx5 = document[_0xcd9a[3]](_0xcd9a[2]),
            _0x10ebx6;
        for(_0x10ebx6 = 0; _0x10ebx6 < _0x10ebx5[_0xcd9a[4]]; _0x10ebx6 += 1) {
            if(_0x10ebx5[_0x10ebx6][_0xcd9a[5]](_0x10ebx3)) {
                if(_0x10ebx5[_0x10ebx6][_0xcd9a[5]](_0xcd9a[6]) === _0xcd9a[7]) {
                    if(!/expandit/ [_0xcd9a[9]](_0x10ebx5[_0x10ebx6][_0xcd9a[8]])) {
                        _0x10ebx4[_0xcd9a[10]](_0x10ebx5[_0x10ebx6]);
                    };
                };
            };
        };
        return _0x10ebx4;
    };
    var _0x10ebx7 = _0x10ebx2(_0xcd9a[6]),
        _0x10ebx6, _0x10ebx8, _0x10ebx9, _0x10ebxa, _0x10ebxb, _0x10ebxc;
    for(var _0x10ebx6 = 0, _0x10ebx8 = _0x10ebx7[_0xcd9a[4]]; _0x10ebx6 < _0x10ebx8; _0x10ebx6++) {
        _0x10ebx9 = _0x10ebx7[_0x10ebx6];
        if(_0x10ebx9[_0xcd9a[8]]) {
            _0x10ebx9[_0xcd9a[8]] = _0x10ebx9[_0xcd9a[8]] + _0xcd9a[11];
            try {
                _0x10ebxb = _0x10ebx9[_0xcd9a[13]](_0xcd9a[12])[0];
                if(!/expand/ [_0xcd9a[9]](_0x10ebxb[_0xcd9a[14]])) {
                    _0x10ebxa = Math[_0xcd9a[16]]((Math[_0xcd9a[15]]() * 9999) + 1);
                    _0x10ebxb[_0xcd9a[14]] = _0xcd9a[17] + _0x10ebx6 + _0xcd9a[18] + _0x10ebxa;
                    _0x10ebxc = document[_0xcd9a[20]](_0xcd9a[19]);
                    _0x10ebxc[_0xcd9a[21]] = _0xcd9a[22];
                    _0x10ebxc[_0xcd9a[23]] = _0xcd9a[24];
                    _0x10ebxc[_0xcd9a[14]] = _0xcd9a[17] + _0x10ebx6 + _0xcd9a[18] + _0x10ebxa;
                    _0x10ebxc[_0xcd9a[25]] = function () {
                        document[_0xcd9a[1]](this[_0xcd9a[14]])[_0xcd9a[8]] = _0xcd9a[26];
                        this[_0xcd9a[28]][_0xcd9a[27]] = _0xcd9a[29];
                        return true;
                    };
                    _0x10ebxb[_0xcd9a[32]][_0xcd9a[32]][_0xcd9a[32]][_0xcd9a[32]][_0xcd9a[32]][_0xcd9a[32]][_0xcd9a[31]](_0x10ebxc, _0x10ebxb[_0xcd9a[30]]);
                };
            } catch(e) {};
        };
    };
};
document[_0xcd9a[34]](_0xcd9a[33], expandIt, false);
document[_0xcd9a[34]](_0xcd9a[35], expandIt, false);
})();