
// ==UserScript==
// @name           TaTaR WaR++
// @namespace      WaR++
// @description    TaTaR++
// @include        http://yazead.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js
// ==/UserScript==
var st = [225, 240, 315, 120, 900], rs = [], Ls = [], Ts, Tx, url;
function FindNext(elem) { do { elem = elem.nextSibling; } while (elem && elem.nodeType != 1); return elem; };
function FindBefore(elem) { do { elem = elem.previousSibling; } while (elem && elem.nodeType != 1); return elem; };
function str(path) { return document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0); };
function setTT() {
    $.get('build.php?id=33', function (x) {
        location.href = $(x).find('img.npc:eq(2)').parent().attr('href');
    });
};
var $S = function (s, ss) { return GM_setValue(s, ss); };
var $G = function (s) { return GM_getValue(s); };
var $D = function (s) { return GM_deleteValue(s); };
var $L = function (s) { return document.location.href.match(s); };
var $E = function (s) { return document.location.href.split('/')[2] == s; };
var $T = function (s, ss) { return setTimeout(s, ss); };
var _ = function (s) { return document.getElementById(s); };
$('#side_info').append('<br><br><div><button id="stra">بدأ الهجمات</button>: <span id="atk11">' + $G('this.attack') + '</span></div><div><button id="strt">تدريب جيش</button></div><div><button id="stpS">أيقاف</button></div>');
$('#stra').bind('click', function () { $S('this.attack', 'true'); location.href = 'v2v.php?id=5615'; });
$('#strt').bind('click', function () { if ($G('this.npc') == 'true' && !$L('bid=17&t')) { setTT(); } else { $S('this.attack', 'stop'); $S('this.npc', 'true'); $('#strt').click(); } });
$('#stpS').bind('click', function () { $D('this.attack'); $D('this.npc'); });

setTimeout(function () {
    if (($G('this.attack') == 'true') && !$L('id=5615')) { location.href = 'v2v.php?id=5615'; }else
        if (($G('this.attack') == 'true') && $L('id=5615')) { $S('this.attack', 'on'); $('#t3').next().click(); $('#coords input[name="c"]:eq(2)').attr('checked', 'true'); _('btn_ok').click(); };
    if ($G('this.attack') == 'on' && $L('v2v.php')) { $S('this.attack', '11'); _('btn_ok').click(); };

    if ($G('this.attack') == '11' && !$L('v2v.php')) { location.href = 'v2v.php?id=5615'; } else
        if ($G('this.attack') == '11' && $L('id=5615')) { $('#t3').next().click(); $('#coords input[name="c"]:eq(2)').attr('checked', 'true'); _('btn_ok').click(); } else
            if ($G('this.attack') == '11' && $L('v2v.php') && _('short_info')) { $S('this.attack', 'false'); _('btn_ok').click(); _('btn_ok').submit(); $('#btn_ok').click(); };
    /*
    if ($G('this.attack') == '22' && !$L('v2v.php')) { location.href = 'v2v.php?id=5615'; } else
    if ($G('this.attack') == '22' && $L('id=5615')) { _('t3').value = $('#t3').parent().find('a').html().match(/\d+/); $('#coords input[name="c"]:eq(2)').attr('checked', 'true'); _('btn_ok').click(); } else
    if ($G('this.attack') == '22' && $L('v2v.php') && _('short_info')) { $S('this.attack', '33'); _('btn_ok').click(); _('btn_ok').submit(); $('#btn_ok').click(); };

    if ($G('this.attack') == '33' && !$L('v2v.php')) { location.href = 'v2v.php?id=5615'; } else
    if ($G('this.attack') == '33' && $L('id=5615')) { _('t3').value = $('#t3').parent().find('a').html().match(/\d+/); $('#coords input[name="c"]:eq(2)').attr('checked', 'true'); _('btn_ok').click(); } else
    if ($G('this.attack') == '33' && $L('v2v.php') && _('short_info')) { $S('this.attack', 'false'); _('btn_ok').click(); _('btn_ok').submit(); $('#btn_ok').click(); };

    if ($G('this.attack') == '44' && !$L('v2v.php')) { location.href = 'v2v.php?id=5615'; } else
    if ($G('this.attack') == '44' && $L('id=5615')) { _('t3').value = $('#t3').parent().find('a').html().match(/\d+/); $('#coords input[name="c"]:eq(2)').attr('checked', 'true'); _('btn_ok').click(); } else
    if ($G('this.attack') == '44' && $L('v2v.php') && _('short_info')) { $S('this.attack', '55'); _('btn_ok').click(); _('btn_ok').submit(); $('#btn_ok').click(); };

    if ($G('this.attack') == '55' && !$L('v2v.php')) { location.href = 'v2v.php?id=5615'; } else
    if ($G('this.attack') == '55' && $L('id=5615')) { _('t3').value = $('#t3').parent().find('a').html().match(/\d+/); $('#coords input[name="c"]:eq(2)').attr('checked', 'true'); _('btn_ok').click(); } else
    if ($G('this.attack') == '55' && $L('v2v.php') && _('short_info')) { $S('this.attack', '66'); _('btn_ok').click(); _('btn_ok').submit(); $('#btn_ok').click(); };

    if ($G('this.attack') == '66' && !$L('v2v.php')) { location.href = 'v2v.php?id=5615'; } else
    if ($G('this.attack') == '66' && $L('id=5615')) { _('t3').value = $('#t3').parent().find('a').html().match(/\d+/); $('#coords input[name="c"]:eq(2)').attr('checked', 'true'); _('btn_ok').click(); } else
    if ($G('this.attack') == '66' && $L('v2v.php') && _('short_info')) { $S('this.attack', '77'); _('btn_ok').click(); _('btn_ok').submit(); $('#btn_ok').click(); };

    if ($G('this.attack') == '77' && !$L('v2v.php')) { location.href = 'v2v.php?id=5615'; } else
    if ($G('this.attack') == '77' && $L('id=5615')) { _('t3').value = $('#t3').parent().find('a').html().match(/\d+/); $('#coords input[name="c"]:eq(2)').attr('checked', 'true'); _('btn_ok').click(); } else
    if ($G('this.attack') == '77' && $L('v2v.php') && _('short_info')) { $S('this.attack', 'false'); _('btn_ok').click(); _('btn_ok').submit(); $('#btn_ok').click(); };
    */
    if ($G('this.attack') == 'false') { $S('this.attack', 'stop'); $S('this.npc', 'true'); $('#strt').click(); };
    if ($G('this.npc') == 'true' && !$L('bid=17&t')) { $('#strt').click(); } else
        if ($G('this.npc') == 'true' && $L('bid=17&t')) { $S('this.npc', 'on'); _('submitText').setAttribute('onclick', 'javascript:portionOut();'); _('submitButton').setAttribute('onclick', "_('_fm1').submit();return false;"); setTimeout(function () { $('#submitText').click(); }, 100); setTimeout(function () { $('#submitButton').click(); }, 200); };

    if ($G('this.npc') == 'on' && !$L(/php\b[^>]id=33/)) { location.href = 'build.php?id=33'; } else
        if ($G('this.npc') == 'on' && $L(/php\b[^>]id=33/)) { $S('this.npc', 'false'); $S('this.attack', 'true'); $('#_tf3').parent().next().find('a').click(); $('#btn_train').click(); };
}, 200);
/*
if (_('short_info') && $('.troop_details').html()) {
$('#btn_ok').parent().append('<div>' +
'<span>عدد الهجمات:</span> <input id="acx" type="text" value="1" size="5" /> ' +
'<span>الوقت بين كل هجمة:</span> <input id="tba" type="text" value="10" size="5" /></div>' +
'<div><button id="stra">بدأ الهجمات</button> |<span id="attx"> عدد الهجمات:<span id="ttx">0</span></span></div>');

$('#stra').bind('click', function () {
_('attx').style.display = 'block';
setAttackTime = ($('#tba').val() >= 1 ? $('#tba').val() : 100);
attackCount = ($('#acx').val() >= 1 ? $('#acx').val() : 1);
function xxxx() { return _('stra').click(); str('//input[@id="btn_ok"]').click(); _('ttx').innerHTML++; };
for (i = 0; i < attackCount; i++) { setTimeout(function () { str('//input[@id="btn_ok"]').click(); _('ttx').innerHTML++; xxxx(); }, setAttackTime); };

});

};*/