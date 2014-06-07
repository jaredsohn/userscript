// ==UserScript==
// @name           TW BBCode Toolbar
// @namespace      www.the-west.ro
// @description    the-west BBCode Toolbar - Under Development
// @include         http://*.the-west.*
// @include         http://zz1w1.tw.innogames.net/game.php*
// @exclude         http://www.the-west.*
// @exclude         http://forum.the-west.*
// @author          xawy (based on http://userscripts.org/users/132860)
// ==/UserScript==


String.prototype.parseQueryString = function() {
    var vars = this.split(/[&;]/), res = [];
    for (var z in vars) {
        var val = vars[z];
        var v = val.split(/=/);
        res[v[0]] = v[1];
    }
    return res;
};

var $ = unsafeWindow.$;
var loc = location.pathname;

function BBCode(textarea) { this.textarea = textarea; }

BBCode.prototype.getText = function() {
    this.textarea.focus();
    if (typeof document.selection != 'undefined') {
        var range = document.selection.createRange();
        return range.text;
    }
    else if (typeof this.textarea.selectionStart != 'undefined') {
        var start = this.textarea.selectionStart;
        var end = this.textarea.selectionEnd;
        return this.textarea.value.substring(start, end);
    }
    return null;
};

BBCode.prototype.insertText = function(startTag, text, endTag) {
    this.textarea.focus();
    if (typeof document.selection != 'undefined') {
        var range = document.selection.createRange();
        range.text = startTag + text + endTag;
        range = document.selection.createRange();

        if (insText.length == 0) { range.move('character', -endTag.length); }
        else { range.moveStart('character', startTag.length + text.length + endTag.length); }

        range.select();
    }
    else if (typeof this.textarea.selectionStart != 'undefined') {
        var start = this.textarea.selectionStart;
        var end = this.textarea.selectionEnd;
        this.textarea.value = this.textarea.value.substr(0, start) + startTag + text + endTag + this.textarea.value.substr(end);
        var pos;

        if (text.length == 0) { pos = start + startTag.length; }
        else { pos = start + startTag.length + text.length + endTag.length; }

        this.textarea.selectionStart = pos;
        this.textarea.selectionEnd = pos;
    }
};

BBCode.prototype.addCodeTag = function(tagName) {
    this.insertText('[' + tagName + ']', this.getText(), '[/' + tagName + ']');
};

BBCode.prototype.addExtendedCodeTag = function(description, tagName) {
    var input = prompt(description);
    var text = this.getText();
    text = (text.length == 0 ? prompt('Enter content for \'' + tagName + '\' BBCode tag.', '') : text);
    this.insertText('[' + tagName + '=' + input + ']', text, '[/' + tagName + ']');
};

BBCode.prototype.addColorCodeTag = function(myColor) {
    var text = this.getText();
    this.insertText('[color=' + myColor + ']', text, '[/color]');
};

BBCode.prototype.addCallbackCodeTag = function(tagName, callbackFunction) {
    var text = callbackFunction();
    this.insertText('[' + tagName + '=' + text + ']', this.getText(), '[/' + tagName + ']');
};

var supportedbbcodes = ['b', 'i', 'u', 'del', 'player', 'town', 'fort', 'quote', 'url', 'img', 'color', 'size'];
var bbcodesstyle = { 'b': '0px 50%', 'i': '-20px 50%', 'u': '-40px 50%', 'del': '-60px 50%', 'player': '-80px 50%', 'town': '-100px 50%', 'fort': '-120px 50%', 'quote': '-140px 50%', 'url': '-160px 50%', 'img': '-180px 50%', 'color': '-200px 50%', 'size': '-220px 50%' };
var bbcclass = 'forum_bb_code_image';

bbcbar = function(bbs, BBCobject) {
    var div = document.createElement('div');
    div.id = 'divBBCodeToolbar';
    div.style.display = 'inline';
    var that = BBCobject;
    
    for (var i in bbs) {
        var img = document.createElement('img');
        img.id = 'img_bb_' + bbs[i];
        img.src = 'images/transparent.png';
        img.alt = bbs[i];
        img.style.backgroundPosition = bbcodesstyle[bbs[i]];
        img.className = bbcclass;

        switch (bbs[i]) {
            case 'url':
                img.addEventListener('click', function() { that.addExtendedCodeTag('Url:', this.alt); }, false);
                break;
            case 'color':
                img.addEventListener('click', function() { showMyColors(that); }, false);
//                img.addEventListener('click', function() { that.addColorCodeTag(this.alt); }, false);
                break;
            case 'size':
                img.addEventListener('click', function() { that.addExtendedCodeTag('Size:', this.alt); }, false);
                break;
            default:
                img.addEventListener('click', function() { that.addCodeTag(this.alt); }, false);
                break;
        }
        div.appendChild(img);
    }
    return div;
};

function showMyColors(bbobj) {
    var myColors = new Array('000000', '000080', '00008B', '0000CD', '0000FF', '006400', '008000', '008080', '008B8B', '00BFFF', '00CED1', '00FA9A', '00FF00', '00FF7F', '00FFFF', '00FFFF', '191970', '1E90FF', '20B2AA', '228B22', '2E8B57', '2F4F4F', '32CD32', '3CB371', '40E0D0', '4169E1', '4682B4', '483D8B', '48D1CC', '4B0082', '556B2F', '5F9EA0', '6495ED', '66CDAA', '696969', '6A5ACD', '6B8E23', '708090', '778899', '7B68EE', '7CFC00', '7FFF00', '7FFFD4', '800000', '800080', '808000', '808080', '87CEEB', '87CEFA', '8A2BE2', '8B0000', '8B008B', '8B4513', '8FBC8F', '90EE90', '9370D8', '9400D3', '98FB98', '9932CC', '9ACD32', 'A0522D', 'A52A2A', 'A9A9A9', 'ADD8E6', 'ADFF2F', 'AFEEEE', 'B0C4DE', 'B0E0E6', 'B22222', 'B8860B', 'BA55D3', 'BC8F8F', 'BDB76B', 'C0C0C0', 'C71585', 'CD5C5C', 'CD853F', 'D2691E', 'D2B48C', 'D3D3D3', 'D87093', 'D8BFD8', 'DA70D6', 'DAA520', 'DC143C', 'DCDCDC', 'DDA0DD', 'DEB887', 'E0FFFF', 'E6E6FA', 'E9967A', 'EE82EE', 'EEE8AA', 'F08080', 'F0E68C', 'F0F8FF', 'F0FFF0', 'F0FFFF', 'F4A460', 'F5DEB3', 'F5F5DC', 'F5F5F5', 'F5FFFA', 'F8F8FF', 'FA8072', 'FAEBD7', 'FAF0E6', 'FAFAD2', 'FDF5E6', 'FF0000', 'FF00FF', 'FF00FF', 'FF1493', 'FF4500', 'FF6347', 'FF69B4', 'FF7F50', 'FF8C00', 'FFA07A', 'FFA500', 'FFB6C1', 'FFC0CB', 'FFD700', 'FFDAB9', 'FFDEAD', 'FFE4B5', 'FFE4C4', 'FFE4E1', 'FFEBCD', 'FFEFD5', 'FFF0F5', 'FFF5EE', 'FFF8DC', 'FFFACD', 'FFFAF0', 'FFFAFA', 'FFFF00', 'FFFFE0', 'FFFFF0', 'FFFFFF');
    var row = 0, col = 0, rows = 10, cols = 14;

    if (document.getElementById('tableBBColors').getElementsByTagName('tr').length == 0) {

        for (row = 0; row < rows; row++) {
            var r = document.getElementById('tableBBColors').insertRow(parseInt(row));

            for (col = 0; col < cols; col++) {
                var c = r.insertCell(parseInt(col));

                var index = cols * parseInt(row) + parseInt(col);
                if (index < myColors.length) {
                    var div = document.createElement('div');
                    div.style.backgroundColor = '#' + myColors[index];
                    div.style.height = '12px';
                    div.style.width = '12px';
                    div.addEventListener('click', function() { selectColor(bbobj, rgbConvert(this.style.backgroundColor)); }, false);

                    c.appendChild(div);
                }
            }
        }
    }

    toggle('divBBColors');
}

function selectColor(bbobj, MyColor) {
    var that = bbobj;
    toggle('divBBColors');
    that.addColorCodeTag(MyColor);
}

function toggle(obj) {
    var el = document.getElementById(obj);
    el.style.display = (el.style.display != 'none' ? 'none' : '');
}

function rgbConvert(str) {
    str = str.replace(/rgb\(|\)/g, "").split(",");
    str[0] = parseInt(str[0], 10).toString(16).toLowerCase();
    str[1] = parseInt(str[1], 10).toString(16).toLowerCase();
    str[2] = parseInt(str[2], 10).toString(16).toLowerCase();
    str[0] = (str[0].length == 1) ? '0' + str[0] : str[0];
    str[1] = (str[1].length == 1) ? '0' + str[1] : str[1];
    str[2] = (str[2].length == 1) ? '0' + str[2] : str[2];
    return ('#' + str.join("")).toUpperCase();
}

var bbdiv = document.createElement('div');
bbdiv.id = 'divBBColors';
bbdiv.style.display = 'none';
bbdiv.style.cssFloat = 'right';
bbdiv.style.position = 'absolute';

var bbtable = document.createElement('table');
bbtable.id = 'tableBBColors';
bbtable.style.border = 'solid 2px #3B240B';
bbtable.style.backgroundImage = 'url(../images/border/table/bright.png)';

bbdiv.appendChild(bbtable);

if (loc == "/game.php") {
    function addBBToMessageWindow(div2) {
        if (!document.getElementById('window_messages')) return;
        var div = document.getElementById('window_messages_content').wrappedJSObject;
        var table = div.getElementById('write_table');
        var tr2 = table.childNodes[1].childNodes[4];
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.colspan = '2';
        var BB = new BBCode(tr2.getElementById('text'));
        var bbbar = bbcbar(supportedbbcodes, BB);
        td.appendChild(bbbar);
        tr.appendChild(td);

        table.childNodes[1].insertBefore(tr, tr2);
    }

    function addBBToMessageReplyWindow() {
        if (!document.getElementById('window_messages')) return;
        var div = document.getElementById('window_messages_content').wrappedJSObject;
        var table = div.getElementById('tab_messages').getElementById('read_table');
        var app = table.getElementById('answer_field_row');
        var bef = table.getElementById('message_id');
        var BB = new BBCode(bef.nextSibling.nextSibling);
        var bbbar = bbcbar(supportedbbcodes, BB);
        app.insertBefore(bbbar, bef);
    }

    var o_show = unsafeWindow.AjaxWindow.setJSHTML;
    var f = function(div, content) {
        if (!div) return;
        var ret = o_show(div, content);
        addBBToMessageWindow(div);
        return (ret);
    };
    for (var o in o_show) {
        f[o] = o_show[o];
    }
    unsafeWindow.AjaxWindow.setJSHTML = f;

    var o_show2 = unsafeWindow.Messages.show_message;
    var f2 = function(id, page) {
        var ret = o_show2(id, page);
        window.setTimeout(addBBToMessageReplyWindow, 1000);
        return (ret);
    };
    for (var o in o_show) {
        f2[o] = o_show2[o];
    }
    unsafeWindow.Messages.show_message = f2;
}
else
    if (loc == "/forum.php") {
    (function() {
        var l = location.search.parseQueryString();
        unsafeWindow.l = l;
        if (l.mode != 'new_thread' && l.answer != '1')
            return;

        GM_addStyle('.forum_bb_code_image { background-image:url(../images/bbcodes.png); width: 20px; height:20px; margin:1px 1px; cursor: pointer;}');

        var tx = document.getElementsByName('message')[0].wrappedJSObject;
        var BB = new BBCode(tx);
        var bef = tx.parentNode.parentNode;
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.setAttribute('nowrap', 'nowrap');
        td.colSpan = '2';
        td.align = 'right';
        var div = document.createElement('div');
        div.style.border = '1px solid #302215';
        div.appendChild(bbcbar(supportedbbcodes, BB));
        td.appendChild(div);
        td.appendChild(bbdiv);
        tr.appendChild(td);
        bef.parentNode.insertBefore(tr, bef);
    })();
}