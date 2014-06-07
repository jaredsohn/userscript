// ==UserScript==
// @name        Travian Note+
// @description you can write infomation and save it.
// @include     http://*.travian*.*/*
// @version     1.1
// ==/UserScript==

about = {
version: '1.1',
scriptPage: 'http://userscripts.org/scripts/show/94775'
};

function GM_setValue(c_name, value, expiredays) {
    if (expiredays == "delete") { expiredays = -10; } else { expiredays = 123 * 321 * 444 };
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ";expires=" + (new Date((new Date()).getTime() + (expiredays))).toGMTString();
};

function GM_delete(name) { return GM_setValue(name, '', "delete"); };

function GM_getValue(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
};

function ID(id) { return document.getElementById(id) };

function Event(id, F) {
    return ID(id).addEventListener('click', F, false);
};
var img = 'data:image/gif;base64,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%3D';
var size = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMAgMAAAAWidUSAAAAAXNSR0IArs4c6QAAAAxQTFRFAAAA////cdAAdXxtY+NXkgAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAOUlEQVQI12NgYLBnAIJ3BxgYmHdtYGDge/WBgcF6NZBltw4o9no3UPLVG6DkKqA483sgj/8DiABiAO0ND57GNPlIAAAAAElFTkSuQmCC';
var css = '#TravianNote {' +
          'border-style: none solid;' +
          'border-color: black;' +
          'border-width: 1px;' +
          'background-image: url(http://www.travianskins.com/travian/img/msg/underline.gif);' +
          'height: 138px;' +
          'width: 257px;' +
          '}\n' +
          '#NoteHead {' +
          'margin: 0px 0px -2px;' +
          '}\n' +
          '.left {text-align: left;}\n' +
          '.right {text-align: right;}\n' +
          '.center {text-align: center;}\n';

// add style
document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css">' + css + '</style>';

function P(href) { return document.location.hostname.indexOf(href) != -1 };

if (P('.ae') || P('sy') || P('.eg') || P('.sa')) {
    var V = '10';
    var al = '20';
    var fA = '40';
    var rS = '40';
    var fB = '62';
    var dl = '64';
} else { var V = '25'; var al = '0'; var fA = '20'; var rS = '20'; var fB = '42'; var dl = '44'; };

if (ID('side_info')) {

    ID('side_info').innerHTML += '<br><div align="center">' +
'<div><img id="NoteHead" src="' + img + '"/></div>' +
'<textarea id="TravianNote" class="left" cols="31" rows="7">' + GM_getValue("TravianNote").split('_')[0] + '</textarea>' +
'<div style="border-right-style: solid; border-bottom-style: solid; width: 263px; border-left-style: solid; border-width: 1px"><br style="margin: 0px 0px -12.5px;">' +
'<span onclick="window.open(&quot;' + about.scriptPage + '&quot;, &quot;_blank&quot;);" style="position:absolute; left: ' + V + 'px; cursor: pointer;">v' + about.version + '</span>' +
'<input type="image" class="dynamic_img" src="img/x.gif" id="btn_save" name="save_note" />' +
'<img src="http://img713.imageshack.us/img713/6756/align.png" title="change text align" id="align" style="position:absolute; right:' + al + 'px; cursor: pointer;" />' +
'<span style="position:absolute; right:' + fA + 'px;">|</span>' +
'<img src="' + size + '" id="reSize" title="reSize font" style="margin: 5px; position:absolute; right:' + rS + 'px; cursor: pointer;" />' +
'<span style="position:absolute; right:' + fB + 'px;">|</span>' +
'<img src="img/x.gif" class="del" id="delete" title="delete all" style="margin: 5px; position:absolute; right:' + dl + 'px; cursor: pointer;" />' +
'<div style="font-size: 5px;">&nbsp;</div></div>' +
'</div>';

    // save the text
    document.getElementsByName('save_note')[0].addEventListener('click', function() { var Note = ID('TravianNote'); GM_setValue('TravianNote', ID('TravianNote').value + '_' + ID('TravianNote').getAttribute('class')); Note.innerHTML = Note.value; alert('saved'); }, true);

    // change text align to (left/center/right)
    ID('TravianNote').setAttribute('class', GM_getValue('TravianNote').split('_')[1]);
    Event('align', function() {
        if (ID('TravianNote').getAttribute('class') == 'undefined') { ID('TravianNote').setAttribute('class', 'left'); };
        if (ID('TravianNote').getAttribute('class') == 'left') { return ID('TravianNote').setAttribute('class', 'center'); } else
            if (ID('TravianNote').getAttribute('class') == 'center') { return ID('TravianNote').setAttribute('class', 'right'); } else
            if (ID('TravianNote').getAttribute('class') == 'right') { return ID('TravianNote').setAttribute('class', 'left'); };
        return GM_setValue('TravianNote', ID('TravianNote').value + '_' + ID('TravianNote').getAttribute('class'));
    });
    Event('align', function() {
        return GM_setValue('TravianNote', ID('TravianNote').value + '_' + ID('TravianNote').getAttribute('class'));
    });
    Event('reSize', function() {
        var ask = prompt('Enter new font size\n from 10 to 35', '');
        if (ask) {
            if (ask > 35) { alert('font is to big'); } else if (ask < 10) { alert('font is to small'); } else {
                ID('TravianNote').setAttribute('style', 'font-size: ' + ask + 'px;');
                GM_setValue('size', ID('TravianNote').getAttribute('style'));
            };
        };
    });
    ID('TravianNote').setAttribute('style', GM_getValue("size"));
    Event('delete', function() {
        var ask = confirm('are you sure you want to delete all saved data?');
        if (ask) {
            GM_delete('size'); GM_delete('TravianNote');
            location.reload();
        };
    });
};
