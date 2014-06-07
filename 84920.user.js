// ==UserScript==
// @name           pgBBCodeEnhancer
// @version        1.5.9.1662
// @namespace      pennergame
// @author         _der_, MajorTom123
// @description    Extend pgs bb code by tables & co.
// @include        http://*pennergame.de/*
// @include        http://*dossergame.co.uk/*
// @include        http://*clodogame.fr/*
// @include        http://*menelgame.pl/*
// @include        http://*mendigogame.es/*
// @include        http://*bumrise.com/*
// @include        http://*serserionline.com/*
// ==/UserScript==

window.setTimeout(function() { BBCode.run(); BBCodeEditor.createEditor(); }, 100);

// ########### init ##############

function init() {
    BaseLib.init();
    UrlHandler.init();
    BBCode.init();
    BBCodeEditor.init();
}
    
// ########### BB Code Utils ##############

var BBCode = new Object();
var BBCodeEditor = new Object();

BBCode.init = function () {

    BBCode.tags = [ // sort this by length!!!
        { bbtag: 'comment', htmltag: 'div', htmlx: ' style="display: none"' },
        { bbtag: 'comment', htmltag: 'form' },
        { bbtag: 'table' },
        { bbtag: 'tbody' },
        { bbtag: 'span' },
        { bbtag: 'pic', htmltag: 'img' },
        { bbtag: 'div' },
        { bbtag: 'th' },
        { bbtag: 'tr' },
        { bbtag: 'td' },
        { bbtag: 'br' },
        { bbtag: 'ul' },
        { bbtag: 'ol' },
        { bbtag: 'li' },
        { bbtag: 'b', htmltag: 'strong' },
        { bbtag: 'b' },
        { bbtag: 'a' },
        { bbtag: 'p' }
        ];

    BBCode.isParent = function(elem, parent) {
        var p = elem.parentNode;
        return p ? (p == parent || BBCode.isParent(p. parent)) : false;
    };
    
    BBCode.findElements = function() {
        var ret = new Array()
        var t = document.getElementsByTagName('p');

        if (!t) return ret;

        for (var i=0; i<t.length; i++) {
            var e = t[i];
            var c = e.getElementsByTagName('p');

            if (!c || (c && c.length)) continue; // find direct parent!

            for (var j=0; j<BBCode.tags.length; j++) {
                if (e.innerHTML.search(BaseLib.escapeForRegExp('\[' + BBCode.tags[j].bbtag)) != -1) {
                    ret.push(e);
                    break;
                }
            }
        }

        return ret;
    };

    BBCode.removeScripts = function(text) {
        text = text.replace(/onmouse/g, 'notallowed');
        text = text.replace(/onkey/g, 'notallowed');
        text = text.replace(/onload/g, 'notallowed');
        text = text.replace(/onunload/g, 'notallowed');
        text = text.replace(/out=/g, 'notallowed=');
        text = text.replace(/over=/g, 'notallowed=');
        return text;
    };
    
    BBCode.decodeTags = function(table) {
        var lt = "&lt;";
        var gt = "&gt;";
        var t = table.textContent.replace(/</g, lt).replace(/>/g, gt);
        for (var j=0; j<BBCode.tags.length; j++) {
            t = BBCode.replaceTag(t, BBCode.tags[j], "[", "]" ,"<", ">", false);
        }
        table.innerHTML = BBCode.removeScripts(t);
    };

    BBCode.encodeTags = function(text) {
        var t = text;
        for (var j=0; j<BBCode.tags.length; j++) {
            t = BBCode.replaceTag(t, BBCode.tags[j], "<", ">", "[", "]", true);
        }
        t = t.replace(/\t/g,' ');
        t = t.replace(/\s\s/g,' ');
        t = t.replace(/\)/g, '&#041;'); // avoid bb code smilies :(
        return t;
    };

    BBCode.replaceTag = function(text, elem, t1, t12, t2, t22, encode) {
        if (elem.htmltag == undefined) elem.htmltag = elem.bbtag;
        if (elem.htmlx == undefined) elem.htmlx = '';

        var find = encode ? elem.htmltag + elem.htmlx : elem.bbtag;
        var rep =  encode ? elem.bbtag : elem.htmltag + elem.htmlx;
        
        var s = text.split(t1 + find);
        var f = t1 + "/" + find + t12;
        var v = t2 + "/" + rep + t22;
        var re = new RegExp(BaseLib.escapeForRegExp(f), 'g');

        for (var i=1; i<s.length; i++) {
            var e = s[i];
            e = e.replace(t12, t22); // once for end of start tag
            e = e.replace(re, v);
            s[i] = e;
        }
        var j = t2 + rep + ' ';
        return s.join(j);
    };
    
    BBCode.run = function() {
        var t = BBCode.findElements();
        for (var i=0; i<t.length; i++) {
            BBCode.decodeTags(t[i]);
        }
    };

    BBCode.createButtons = function() {
        var ts = document.getElementsByTagName('textarea');
        if (!ts || !ts.length) return;
        for (var i=0; i<ts.length; i++) {
            BBCode.createButton(ts[i]);
        }
    };

    BBCode.getHint = function() {
        var hint = '[comment][b]\n';
        hint += 'Wenn dieser Text seltsam aussieht, dann musst du folgendes tun:\n';
        hint += ' installiere dir [url=https://addons.mozilla.org/de/firefox/addon/748/]Greasemonkey[/url] wenn du Firefox nutzt\n';
        hint += ' oder [url=https://chrome.google.com/extensions/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo]Tampermonkey[/url] wenn du Chrome nutzt.\n';
        hint += 'Dann hole dir dieses [url=' + UrlHandler.bbcodeUserscriptUrl + ']Userscript[/url] und [u]alles[/u] wird gut! ;)\n';
        hint += '[/b][/comment]';
        return hint;
    };

    BBCode.createButton = function(textfield) {
        var t = textfield;
        var input = document.createElement('input');
        var hint = BBCode.getHint();
        var addTags = function (tag1, tag2, onetime){
            if (document.selection){
                t.focus();
                var sel=document.selection.createRange();
                sel.text=tag1+sel.text+tag2;
            } else{
                var len=t.value.length;
                var start=t.selectionStart;
                var end=t.selectionEnd;
                var scrollTop=t.scrollTop;
                var scrollLeft=t.scrollLeft;
                var sel=t.value.substring(start, end);
                var rep=tag1 + sel + tag2;
                t.value=t.value.substring(0, start) + rep + t.value.substring(end, len);
                t.scrollTop=scrollTop;
                t.scrollLeft=scrollLeft;
            }
            if (t.value.search(BaseLib.escapeForRegExp(hint.split("\n")[1])) == -1) {
                t.value = hint + t.value;
            }
        };

        input.addEventListener('click', function() { addTags('[table][tr][td]','[/td][/tr][/table]', hint) }, true);
        input.setAttribute('type', 'button');
        input.setAttribute('value', 'table');
        input.setAttribute('id', 'b_Tabelle');
        
        var p = t.parentNode;
        var b = p.getElementsByTagName('input');
        if (!b || !b.length || b[0].name == "Submit" ) {
            p.insertBefore(document.createElement('br'), t.nextSibling);
            p.insertBefore(input, t.nextSibling);
        } else {
            p.insertBefore(input, b[0]);
        }
    };
}
// ########### BB Code Editor ##############

BBCodeEditor.init = function () {

    BBCodeEditor.createEditor = function() {
        var ta = document.getElementsByTagName('textarea');
        for (var i = 0; i < ta.length; i++) {
            BBCodeEditor.createForTextarea(ta[i]);
        }
    };

    BBCodeEditor.createForTextarea = function(ta) {
        // remove old BB Code editor buttons
        var elems = BaseLib.getChildsByTagName('input', ta.parentNode);
        for (var i = 0; i < elems.length; i++) {
            if (elems[i].getAttribute('type') == 'button' && elems[i].getAttribute('id').substr(0, 2) == 'b_') {
                elems[i].parentNode.removeChild(elems[i]);
            }
        }

        elems = BaseLib.getChildsByTagName('br', ta.parentNode);
        for (var i = 0; i < elems.length; i++) {
            elems[i].parentNode.removeChild(elems[i]);
        }

        elems = BaseLib.getChildsByTagName('a', ta.parentNode);
        for (var i = 0; i < elems.length; i++) {
            if (elems[i].getAttribute('href').search('/help/bbcode') != -1) {
                elems[i].parentNode.insertBefore(document.createElement('br'), elems[i].nextSibling);
            }
        }

        // create a big table
        var t = document.createElement('table');
        t.setAttribute('style', 'width: 100%;');
        ta.parentNode.insertBefore(t, ta.nextSibling);

        // insert textarea into the table
        var tr = document.createElement('tr');
        t.appendChild(tr);
        var td = document.createElement('td');
        tr.appendChild(td);
        ta.parentNode.removeChild(ta);
        td.appendChild(ta);
        ta.removeAttribute('cols');
        ta.style.width = '95%';

        // create BB Code Editor
        tr = document.createElement('tr');
        t.appendChild(tr);
        td = document.createElement('td');
        tr.appendChild(td);
        BBCodeEditor.createEditorForTextarea(ta, td);
    };

    // BB Editor stuff
    BBCodeEditor.createEditorForTextarea = function(ta, parent) {
        var d = document.createElement('div');
        parent.appendChild(d);
        d.setAttribute('style', 'border: 1px solid black; text-align: center; width: 100%;');

        var switchDiv = document.createElement('div');
        var controlsDiv = document.createElement('div');

        d.appendChild(switchDiv);
        switchDiv.innerHTML = 'BB Code Editor';

        d.appendChild(controlsDiv);

        // fill the editor with life ;-)
        var createButton = function(colspan, text, style, fn) {
            var td = document.createElement('td');
            td.setAttribute('colspan', colspan);
            td.setAttribute('style', 'width: '+(colspan*25)+'px;');
            var b = document.createElement('input');
            b.setAttribute('type', 'button');
            b.setAttribute('value', text);
            if (!style) style = '';
            b.setAttribute('style', style + 'width: 100%; text-align: center;');
            b.addEventListener('click', fn, true);
            td.appendChild(b);
            return td;
        };
        var createColorButton = function(c) {
            return createButton(1, ' ', 'background-color: '+c+';', function() { BBCodeEditor.insertDualTag(ta, '[color='+c+']', '[/color]'); });
        };

        var ctr = document.createElement('center');
        var t = document.createElement('table');
        //t.setAttribute('style', 'width: 100%;');
        controlsDiv.appendChild(ctr);
        ctr.appendChild(t);

        var tr = document.createElement('tr');
        t.appendChild(tr);
        tr.appendChild(createButton(1, 'b', 'font-weight: bold;', function() { BBCodeEditor.insertDualTag(ta, '[b]', '[/b]'); }));
        tr.appendChild(createButton(1, 'i', 'font-style: italic;', function() { BBCodeEditor.insertDualTag(ta, '[i]', '[/b]'); }));
        tr.appendChild(createButton(1, 'u', 'text-decoration: underline;', function() { BBCodeEditor.insertDualTag(ta, '[u]', '[/b]'); }));
        tr.appendChild(createColorButton('red'));
        tr.appendChild(createColorButton('green'));
        tr.appendChild(createColorButton('yellow'));
        tr.appendChild(createColorButton('blue'));
        tr.appendChild(createColorButton('orange'));
        tr.appendChild(createColorButton('#00ff00'));
        tr.appendChild(createColorButton('brown'));
        tr.appendChild(createColorButton('cyan'));
        tr.appendChild(createColorButton('magenta'));

        var tr = document.createElement('tr');
        t.appendChild(tr);
        tr.appendChild(createButton(3, 'Klein', '', function() { BBCodeEditor.insertDualTag(ta, '[small]', '[/small]'); }));
        tr.appendChild(createButton(3, 'Gross', '', function() { BBCodeEditor.insertDualTag(ta, '[big]', '[/big]'); }));
        tr.appendChild(createButton(3, 'Zitat', '', function() { BBCodeEditor.insertDualTag(ta, '[quote]', '[/quote]'); }));
        tr.appendChild(createButton(3, 'Laufschrift', '', function() { BBCodeEditor.insertDualTag(ta, '[marquee]', '[/marquee]'); }));

        var tr = document.createElement('tr');
        t.appendChild(tr);
        tr.appendChild(createButton(3, 'Zentrieren', '', function() { BBCodeEditor.insertDualTag(ta, '[center]', '[/center]'); }));
        tr.appendChild(createButton(3, 'Bild', '', function() { BBCodeEditor.insertImageInteractive(ta); }));
        tr.appendChild(createButton(3, 'Liste (*)', '', function() { BBCodeEditor.insertListTag(ta, '[list]', '[/list]', '[*]', '', false); }));
        tr.appendChild(createButton(3, 'Liste (123)', '', function() { BBCodeEditor.insertListTag(ta, '[ol]', '[/ol]', '[li]', '[/li]', true); }));

        var tr = document.createElement('tr');
        t.appendChild(tr);
        tr.appendChild(createButton(3, 'Link', '', function() { BBCodeEditor.insertLinkInteractive(ta); }));
        tr.appendChild(createButton(3, 'Tabelle', '', function() { BBCodeEditor.insertDualTag(ta, '[table][tr][td]','[/td][/tr][/table]', null, true); }));

        tr = document.createElement('tr');
        t.appendChild(tr);
        var td = document.createElement('td');
        td.innerHTML = '&nbsp;';
        tr.appendChild(td);
    };

    // general stuff
    BBCodeEditor.insertHint = function(elem) {
        var hint = BBCode.getHint();
        if (elem.value.search(BaseLib.escapeForRegExp(hint.split("\n")[1])) == -1) {
            elem.value = hint + elem.value;
        }
    };

    BBCodeEditor.insertImageInteractive = function(elem) {
        var url = prompt('Bild-Url eingeben:', 'http://'); 
        if (url) {
            BBCodeEditor.insertSingleTag(elem, '[img]'+url+'[/img]');
        }
    };

    BBCodeEditor.insertLinkInteractive = function(elem) {
        var url = prompt('URL eingeben:', 'http://');
        if (url) {
            BBCodeEditor.insertDualTag(elem, '[url]', '[/url]', url);
        }
    };

    BBCodeEditor.insertSingleTag = function(elem, tag, isAdvanced) {
        if (typeof elem.selectionStart != 'undefined' && elem.selectionStart != undefined) {
            var p = elem.selectionStart;
            var t1 = elem.value.substr(0, p);
            var t2 = elem.value.substr(p);
            elem.value = t1 + tag + t2;
        } else {
            elem.value += tag;
        }

        if (isAdvanced) {
            BBCodeEditor.insertHint(elem);
        }
    };

    BBCodeEditor.insertDualTag = function (elem, tag1, tag2, attrib, isAdvanced){
        if (document.selection){
            elem.focus();
            var sel = document.selection.createRange();
            if (attrib) {
                if(sel.text == '') {
                    sel.text = tag1+attrib+tag2;
                } else {
                    sel.text = tag1.replace(/]$/, '='+attrib+']')+sel.text+tag2;
                }
            } else {
                sel.text = tag1+sel.text+tag2;
            }
        } else {
            var len = elem.value.length;
            var start = elem.selectionStart;
            var end = elem.selectionEnd;
            var scrollTop = elem.scrollTop;
            var scrollLeft = elem.scrollLeft;
            var sel = elem.value.substring(start, end);
            var rep;
            if (attrib) {
                if (sel == '') {
                    rep = tag1+attrib+tag2;
                } else {
                    rep = tag1.replace(/]$/, '='+attrib+']')+sel+tag2;
                }
            } else {
                rep = tag1 + sel + tag2;
            }
            elem.value = elem.value.substring(0, start) + rep + elem.value.substring(end, len);
            elem.scrollTop = scrollTop;
            elem.scrollLeft = scrollLeft;
        }

        if (isAdvanced) {
            BBCodeEditor.insertHint(elem);
        }
    };

    BBCodeEditor.insertListTag = function(elem, tagOuter1, tagOuter2, tagInner1, tagInner2, isAdvanced) {
        if (document.selection) {
            elem.focus();
            var sel = document.selection.createRange();
            var list = sel.text.split('\n');
            for(i = 0; i < list.length; i++){
                list[i] = tagInner1 + list[i] + tagInner2;
            }
            sel.text = tagOuter1 + '\n' + list.join("\n") + '\n' + tagOuter2;
        } else{
            var len = elem.value.length;
            var start = elem.selectionStart;
            var end = elem.selectionEnd;
            var i;
            var scrollTop = elem.scrollTop;
            var scrollLeft = elem.scrollLeft;
            var sel = elem.value.substring(start, end);
            var list = sel.split('\n');
            for(i = 0; i < list.length; i++){
                list[i] = tagInner1 + list[i] + tagInner2;
            }
            var rep = tagOuter1 + '\n' + list.join("\n") + '\n' + tagOuter2;
            elem.value = elem.value.substring(0, start) + rep + elem.value.substring(end, len);
            elem.scrollTop = scrollTop;
            elem.scrollLeft = scrollLeft;
        }

        if (isAdvanced) {
            BBCodeEditor.insertHint(elem);
        }
    };


};

var BaseLib = new Object();
BaseLib.init = function() {

        BaseLib.escapeForRegExp = function(str) {
        if (typeof str == "string") {
            var re = new RegExp( '(\\' + [ '/', '.', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\' ].join('|\\') + ')', 'g');
            return str.replace(re, '\\$1');
        }
        return str;
    };

    BaseLib.getChildsByTagName = function(tag, elem) {
        if (elem == undefined) elem = document;

        tag = tag.toLowerCase()
        var ret = [];
        var childs = elem.childNodes;

        for (var i=0; i<childs.length; i++) {
            if (childs[i].tagName &&
                childs[i].tagName.toLowerCase() == tag) {
                ret.push(childs[i]);
            }
        }

        return ret;
    };

};

var UrlHandler = new Object();
UrlHandler.init = function () {
    UrlHandler.bbcodeUserscriptUrl = 'http://userscripts.org/scripts/show/84920';
};


// ######## run init ########## 
init();
