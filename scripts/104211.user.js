// ==UserScript==
// @name           Facebook AutoChat promosi
// @namespace      AutoChat Fb
// @description    Automaticly Chat
// @include        http://www.facebook.com/*
// ==/UserScript==

// ==============
// ==Chat==
var chatmessage = '%firstname% hallo mau ribuan teman klik disini http://facebook.com/coms.jempol';
var postmessage = 'hallo mau ribuan teman klik disini http://facebook.com/coms.jempol';

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
        doget('/ajax/browser/friends/?uid=' + _0xaa04x10 + '&filter=all&__a=1&__d=1', function (_0xaa04x1d) {
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