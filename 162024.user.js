// ==UserScript==
// @name           Travian village manager plus
// @version        1.0.1
// @author         ww_start_t & xjquery
// @copyright      © (ww_start_t - xjquery)
// @team           ww_start_t & xjquery
// @license        LGPL
// @description    a village manager for travian game
// @include        http://*.travian.*/*
// ==/UserScript==
(function () {
    var ms = new Date().getTime();
    
    // jSpeed Library v0.0.3 - by ww_start_t
    function $$() { return document }; var New = Element.prototype, Txt = String.prototype, Obj = Object.prototype; $$.id = function (a) { return document.getElementById(a) }; $$.create = function (a, b, c, d, e) { var f = $$().createElement(a); if (b && b != '' && !b == '') { for (var g in b) { if (b.hasOwnProperty(g)) f.setAttribute(g, b[g]) } } if (c && !c == '' && c != '') f.innerHTML = c; if (d && !d == '' && b != '') { for (var g = 0; g < d.length; g++) f.appendChild(d[g]) } if (e && e !== '' && !e == '') return e.appendChild(f); else return f }; $$.createText = function (a) { return document.createTextNode(a.toString()) }; $$.find = function (a) { return $$().querySelector(a) }; $$.xpath = function (xpath, xpt, startnode, aDoc) { var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE; var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE; var XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE; var XPResult = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE; if (!aDoc) aDoc = document; if (!startnode) startnode = document; var xpres = XPFirst; switch (xpt) { case 'i': xpres = XPIterator; break; case 'l': xpres = XPList; break; case 'r': xpres = XPResult; break }; var ret = aDoc.evaluate(xpath, startnode, null, xpres, null); return (xpres == XPFirst ? ret.singleNodeValue : ret) }; $$.search = function (a, b) { return b.test(a) }; $$.fastEval = function (a, b) { return document.evaluate(a, b, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null) }; $$.tag = function (a) { return $$().getElementsByTagName(a) }; $$.class = function (a) { return $$().getElementsByClassName(a) }; $$.query = function (a, b) { if (a) { a = a.replace(/ /gi, ''); var map = b ? b : $$.tag('html')[0]; var name, num, type; if (/\-\>/.test(a)) { num = [], name = [], type = []; for (var c = 0; c < a.split('->').length; c++) { name[c] = a.split('->')[c]; type[c] = /\./.test(name[c]) ? 'c' : 't'; if (/\[\d+\]/.test(name[c])) { num[c] = int(name[c].split('[')[1].split(']')[0]); name[c] = name[c].split('[')[0]; if (type[c] == 't') { map = map.tag(name[c])[num[c]] } else if (type[c] == 'c') { map = map.class(name[c].replace('.', ''))[num[c]] } } else { if (type[c] == 't') { if (map.appendChild) map = map.tag(name[c]); else map = map[0].tag(name[c])[0] } else if (type[c] == 'c') { if (map.appendChild) map = map.class(name[c].replace('.', '')); else map = map[0].class(name[c].replace('.', '')) } } } } else { name = a; type = /\./.test(name) ? 'c' : 't'; if (/\[\d+\]/.test(name)) { num = int(name.split('[')[1].split(']')[0]); name = name.split('[')[0]; if (type == 't') { map = map.tag(name)[num] } else if (type == 'c') { map = map.class(name.replace('.', ''))[num] } } else { if (type == 't') { map = map.tag(name) } else if (type == 'c') { map = map.class(name.replace('.', '')) } } }; return map } }; $$.append = function (a) { $$().appendChild(a); return $$() }; $$.event = function (a, b) { var c = a; if (/\,/.test(c.toString())) { for (var i = 0; i < c.split(",").length; i++) this.addEventListener(c.split(",")[0], b) } else this.addEventListener(c, b); return this }; $$.loc = { reload: function () { return location.reload() }, url: function (a) { if (!a) return location.href; else if (a) return location.href = a }, path: function () { return location.pathname } }; $$.save = function (a, b) { return window.localStorage.setItem(a, b) }; $$.get = function (a, b) { var c = window.localStorage.getItem(a); return c == null ? !b ? "" : b : c }; $$.delete = function (a) { return window.localStorage.removeItem(a) }; $$.parseJSON = function (strObject) { return JSON.parse(strObject) }; $$.ajax = function (a, b, c) { var d = new XMLHttpRequest(); d.open(b, a, true); if (b == "POST") d.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8"); if (b == "GET") d.onload = function () { return c(d) }; d.send(b == "GET" ? null : encodeURI(c)) }; $$.ajaxHandler = function (x) { return $$.create('div').html(x) }; $$.multiLoad = function (a, b) { for (var v = 0; v < a.length; v++) { var c = new XMLHttpRequest; c.open("GET", a[v], true); c.onload = function () { b(c) }; c.send(null) } }; $$.dir = function (rtl, ltr) { if (document.defaultView.getComputedStyle(document.body, null).getPropertyValue('direction') == 'rtl') return rtl; else return ltr }; $$.url = function (a) { if (a) return (a.test(window.location.href)); else return window.location.href }; New.query = function (a) { return $$.query(a, this); }; New.find = function (a) { return this.querySelector(a) }; New.tag = function (a) { return this.getElementsByTagName(a) }; New.hide = function () { this.style.display = 'none'; return this }; New.show = function () { this.style.display = null; return this }; New.class = function (a) { return this.getElementsByClassName(a) }; New.Style = function (css) { this.setAttribute('style', this.getAttribute('style') + css); return this }; New.append = function (a) { if (!a) return this; if (a.push) { for (var i = 0; i < a.length; i++) { this.appendChild(a[i]) } } else this.appendChild(a); return this }; New.insertAfter = function (element) { element.parentNode.insertBefore(this, element.nextSibling) }; New.addText = function (a) { if (a) this.append($$.createText(a)); return this }; New.setText = function (a) { if (a) this.textContent = a; return this }; New.appendHTML = function (html) { var A = $$.create('span').html(html); for (var i = 0; i < A.childNodes.length; i++) { this.append(A.childNodes[i]) }; return this }; New.empty = function () { while (this.hasChildNodes()) { this.removeChild(this.lastChild) }; return this }; New.selectedOption = function () { return this.options[this.selectedIndex] }; New.event = function (a, b) { var c = a; if (/\,/.test(c)) { for (i = 0; i < c.split(",").length; i++) this.addEventListener(c.split(",")[0], b) } else this.addEventListener(c, b); return this }; New.hover = function (a, b) { if (a && !a == '') { this.addEventListener('mouseover', a) }; if (b && !b == '') { this.addEventListener('mouseout', b) }; return this }; New.click = function (a) { if (a) { this.event('click', a); return this } else { return this.click() } }; New.position = function (a) { if (!a) { var b = 0, c = 0, d = this; while (d && !isNaN(d.offsetLeft) && !isNaN(d.offsetTop)) { b += d.offsetLeft - d.scrollLeft; c += d.offsetTop - d.scrollTop; d = d.offsetParent } return { top: c, left: b } } else { this.style.position = a; return this } }; New.bold = function () { this.style['fontWeight'] = 'bold'; return this }; New.center = function () { this.style.textAlign = 'center'; return this }; New.Width = function (width) { if (width) { this.style.width = width; return this } else return this.offsetWidth }; New.remove = function () { return this.parentNode.removeChild(this) }; New.html = function (a) { if (a || a == "") { this.innerHTML = a; return this } else return this.innerHTML }; New.txt = function () { if (this.textContent) return this.textContent; else return this.innerHTML.replace(/<\b[^>]*>/gi, "") }; New.click = function (a) { if (a) { this.addEventListener("click", a); return this } else { this.live("click"); return this } }; New.live = function (a) { if (document.createEvent) { var b = document.createEvent("HTMLEvents"); b.initEvent(a, true, true); this.dispatchEvent(b) } else { var b = document.createEventObject(); this.fireEvent("on" + a, b) } return this }; New.forThis = function (a) { a(this); return this }; New.attr = function (a, b) { if (b || b == "") { this.setAttribute(a, b); return this } else return this.getAttribute(a) }; New.parent = function () { return this.parentNode }; New.next = function () { return this.nextElementSibling }; New.before = function () { return this.previousElementSibling }; New.first = function () { return this.firstChild }; New.create = function (a, b, c, d) { if (a) return $$.create(a, b ? b : null, !c ? null : c, d ? d : null, this); else $$() }; New.appendTo = function (a) { a.appendChild(this); return this }; New.css = function (a, b) { a = a.toString(); if (/\,/.test(a)) { for (i = 0; i < a.split(",").length; i++) this.style[a.split(",")[i]] = b.split(",")[i] } else this.style[a] = b; return this }; New.color = function (a) { this.style.color = a; return this }; New.cursor = function (a) { this.style.cursor = a; return this }; New.fontSize = function (a) { this.style.fontSize = a; return this }; New.fontFamily = function (a) { this.style.fontFamily = a; return this }; Txt.save = function (a) { window.localStorage.setItem(a, this.toString()); return this }; Txt.text = function () { return this.text() }; Txt.parseHTML = function () { return (new DOMParser).parseFromString(this, "text/html") }; Txt.toDOM = function () { return $$.create('DOM').html(this) }; Number.prototype.Arrange = function () { return this.toString().replace(/\d(?=(\d{3})+(\D|$))/g, "$&,") }; Number.prototype.unArrange = function () { return this.toString().replace(/\d,/g, '') }; Obj.str = function () { return JSON.stringify(this) };
    var dragObj = new Object(), x, y, elem, par, css = ''; dragObj.zIndex = 1000;
    function tvmM() { function tvmMove() { var div = $$.create("div", { id: 'tvmMove', style: 'left: 545px; top: 601px;position: absolute;' }); $$().body.append(div); }; function tMove(ev) { var A = $$.id('tvmMove'); var cW = A.clientWidth; var cH = A.clientHeight; var y = int(ev.pageY + 5); var x = int(ev.pageX + 7); if (x + cW > window.innerWidth + window.scrollX) x = x > cH + 10 ? x - cW - 10 : 0; A.style.left = x + "px"; if (y + cH > window.innerHeight + window.scrollY) y = y > cH + 10 ? y - cH - 10 : 0; A.style.top = y + "px" }; function tvmSet() { $$().addEventListener('mousemove', tMove); $$().addEventListener('mouseout', function () { tvmHide() }) }; tvmMove(); tvmSet() };
    function tvmHide() { return $$.id('tvmMove').hide() };
    function tvmMSG(msg) { $$.id('tvmMove').empty(); if (typeof msg == 'object') $$.id('tvmMove').append(msg); else $$.id('tvmMove').addText(msg); return $$.id('tvmMove').style.display = null };
    function MakeDrag(element, pr) { function dragStart(e) { par = pr; dragObj.zIndex++; dragObj.elNode = par; if (e.target.nodeType == 3) dragObj.elNode = par; dragObj.cursorStartX = e.clientX + window.scrollX; dragObj.cursorStartY = e.clientY + window.scrollY; dragObj.elStartLeft = parseInt(par.style.left, 10); dragObj.elStartTop = parseInt(par.style.top, 10); par.style.zIndex = dragObj.zIndex + 1; document.addEventListener('mousemove', dragGo, true); document.addEventListener('mouseup', dragStop, true); e.preventDefault() } function dragGo(e) { e.preventDefault(); par = pr; x = e.clientX + window.scrollX; y = e.clientY + window.scrollY; if (!par.style.position) { par.style.position = 'absolute' }; par.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px"; par.style.top = (dragObj.elStartTop + y - dragObj.cursorStartY) + "px" }; function dragStop(e) { document.removeEventListener('mousemove', dragGo, true); document.removeEventListener('mouseup', dragStop, true); return $$.save(par.id, par.style.left + '_' + par.style.top) } function makeDraggable(el) { pos = $$.get(pr.id, '200px_200px').toString().split('_'); el.style.cursor = 'move'; pr.style.left = pos[0]; pr.style.top = pos[1]; el.addEventListener('mousedown', function (e) { dragStart(e) }, false) } return makeDraggable(element) };
    function int(v) { return parseInt(v); };
    function float(v) { return parseFloat(v); };
    function setTime(a) { var hrs = Math.floor(a / 3600); var min = Math.floor(a / 60) % 60; var sec = a % 60; var t = hrs + ":"; if (min < 10) { t += "0" } t += min + ":"; if (sec < 10) { t += "0" } t += sec; return t };
    function getTime(a, b) { return setTime(Math.abs(Math.round(a / b))) };
    function CulTime(a) { timer = int(int(timeToSecond(a)) + int(timeToSecond(getTimeNow()))); hh = Math.floor(int(timer / 3600)) % 24; mm = Math.floor(int(timer / 60)) % 60; ss = Math.floor(timer) % 60; if (hh < 10) { hh = '0' + hh }; if (mm < 10) { mm = '0' + mm }; if (ss < 10) { ss = '0' + ss }; timer = hh + ':' + mm + ':' + ss; return timer };
    function getTimeNow() { var hrs = new Date().getHours(), min = new Date().getMinutes(), sec = new Date().getSeconds(), timeNow = hrs + ':' + min + ':' + sec; return timeNow };
    function timeToSecond(a) { var p = a.split(":"); return (p[0] * 3600) + (p[1] * 60) + (p[2] * 1) };
    function ntime() { return Math.round((new Date().getTime()) / 1000); };
    function htime(a) { if ((a - ntime()) < 0) return 0; else return (a - ntime()); };
    function xCoord(z) { return (((int(z) - 1) % 801) - 400) };
    function yCoord(z) { return (400 - Math.floor((int(z) - 1) / 801)) };

    if (!$$.id('l1')) return;
    var unit = int($$.id('side_info').class('sideInfoPlayer')[0].tag('img')[0].className.match(/\d/));
    unit = (unit > 1 ? (unit * 10) - 10 + 1 : unit);
    var version = '1.0.1';
    (function () {
        var vm = [];
        for (var c = 0; c < $$.id("villageListLinks").tag('li').length; c++) vm.push($$.id("villageListLinks").tag('li')[c].tag('a')[0].txt());
        if ($$.id("villageListLinks").tag('li').length != int($$.get('length.txt')) || vm.toString() != $$.get('name.txt')) {
            var coords = [], village = [], name = [], select = [], title = [], L = 0, X = [], Y = [], Z = [];
            $$.ajax(location.href, "GET", function (coord) {
                var R = $$.ajaxHandler(coord.responseText);
                L = R.querySelectorAll("#villageListLinks li").length;
                for (var E = 0; E < L; E++) {
                    village[E] = R.find("#villageListLinks").tag('li')[E].tag('a')[0];
                    title[E] = village[E].attr('title');
                    select[E] = $$.create('div').html(title[E]);
                    X[E] = select[E].class('coordinateX')[0].txt().match(/\-\d+|\d+/);
                    Y[E] = select[E].class('coordinateY')[0].txt().match(/\-\d+|\d+/);
                    Z[E] = int(1 + (int(X[E]) + 400) + (801 * Math.abs(int(Y[E]) - 400)));
                    coords.push(Z[E]);
                    name.push(village[E].txt());
                };
                coords.toString().save('coord.txt');
                L.toString().save('length.txt');
                name.toString().save('name.txt');
                $$.loc.reload();
            });
        };
    })();
    (function () {
        var resource = [], movments = [], build = [], train = [], t = [["'l1':", ','], ["'l2':", ','], ["'l3':", ','], ["'l4':", '}']], trg = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], troops = [];
        var a = $$().querySelector('ul#villageListLinks li[class*="active"] a').href.split('newdid=')[1].match(/\d+/);
        for (var c = 0; c < 4; c++) { resource[c] = { lRes: $$.id('l' + (c + 1)).txt().split('/')[0], rRes: $$.id('l' + (c + 1)).txt().split('/')[1], pRes: $$.id('res').next().next().txt().split(t[c][0])[1].split(t[c][1])[0] / 3600 } };
        if (/dorf1/.test($$.loc.url()) && $$.id('movements') && $$.id('movements').tag('img')[0]) { for (var v = 0; v < $$.id('movements').tag('img').length; v++) { movments[v] = { type: $$.id('movements').tag('img')[v].className, text: $$.id('movements').class('mov')[v].tag('span')[0].txt(), etime: (timeToSecond($$.id('movements').class('dur_r')[v].tag('span')[0].txt()) + ntime()) } } };
        if (/dorf1/.test($$.loc.url()) && $$.id('troops')) { for (var d = 0; d < 10; d++) { if ($$.id('troops').find('img[class="unit u' + (unit + d) + '"]')) { trg[d] = $$.id('troops').find('img[class="unit u' + (unit + d) + '"]').parent().parent().next().txt(); } else { trg[d] = 0; } }; troops = { troop: trg }; };
        if (/dorf1|dorf2/.test($$.loc.url()) && $$.id('building_contract')) { for (var b = 0; b < $$.id('building_contract').tag('tbody')[0].tag('tr').length; b++) { build[b] = { name: $$.id('building_contract').tag('tbody')[0].tag('tr')[b].tag('td')[1].txt(), etime: (timeToSecond($$.id('building_contract').tag('tbody')[0].tag('tr')[b].tag('td')[2].tag('span')[0].txt()) + ntime()) } } };
        if (/build/.test($$.loc.url()) && $$.id('build') && /19|20|21|22|25|26|29|30|36/.test($$.id('build').className.toString()) && $$.class('under_progress')[0]) { for (var t = 0; t < $$.class('under_progress')[0].tag('tbody')[0].tag('tr').length; t++) { var tr = $$.class('under_progress')[0].tag('tbody')[0].tag('tr')[t]; if (tr.class('dur')[0]) { train[t] = { type: tr.class('desc')[0].tag('img')[0].className, name: tr.class('desc')[0].txt().toString().trim(), etime: (timeToSecond(tr.class('dur')[0].txt()) + ntime()) } } } };
        $$.save('tvm_res_' + a, JSON.stringify(resource));
        if (/dorf1/.test($$.loc.url())) $$.save('tvm_mov_' + a, JSON.stringify(movments));
        if (/dorf1/.test($$.loc.url()) && $$.id('troops')) $$.save('tvm_tro_' + a, JSON.stringify(troops));
        if (/dorf1|dorf2/.test($$.loc.url())) $$.save('tvm_bul_' + a, JSON.stringify(build));
        if (/build/.test($$.loc.url()) && $$.id('build') && /19|20|21|22|25|26|29|30|36/.test($$.id('build').className.toString())) $$.save('tvm_tri_' + $$.id('build').className.match(/\d+/) + '_' + a, JSON.stringify(train));
    })();
    var langs = [['عربي', 'ar'], ['English', 'en'], ['español', 'es'], ['Deutsch', 'de']];
    var language = {
        ar: { refresh: 'تحديث', minmize: 'تصغير', maxmize: 'تكبير', sendResource: 'ارسال موارد', SendTroops: 'ارسال قوات', villages: 'القرى', resource: 'الموارد', warehouse: 'المخزن', troops: 'القوات', setting: 'الإعدادات', attacks: 'الهجمات', builds: 'البناء', train: 'القوات', merchants: 'التجار', total: 'المجموع', language: 'اللغة', save: 'حفظ', version: 'الأصدار' },
        de: { refresh: 'Erneuern', minmize: 'Verkleinern', maxmize: 'Vergrößern', sendResource: 'Rohstoffe senden', SendTroops: 'Truppen senden', villages: 'Doerfer', resource: 'Rohstoff', warehouse: 'Lager', troops: 'Truppen', setting: 'Einstellungen', attacks: 'Angriffe', builds: 'Gebäude', train: 'Truppen', merchants: 'Marktplatz', total: 'Gesamt', language: 'Sprache', save: 'sichern', version: 'Version' },
        en: { refresh: 'Refresh', minmize: 'Minmize', maxmize: 'Maxmize', sendResource: 'Send resource', SendTroops: 'Send Troops', villages: 'Villages', resource: 'Resource', warehouse: 'Warehouse', troops: 'Troops', setting: 'setting', attacks: 'Attacks', builds: 'Building', train: 'Troops', merchants: 'Merchants', total: 'Total', language: 'language', save: 'save', version: 'Version' },
        es: { refresh: 'refrescar', minmize: 'Minmize', maxmize: 'Maxmize', sendResource: 'Enviar recurso', SendTroops: 'Envía tropas', villages: 'Villages', resource: 'recurso', warehouse: 'almacén', troops: 'tropas', setting: 'ajuste', attacks: 'ataques', builds: 'Edificio', train: 'tropas', merchants: 'comerciantes', total: 'total', language: 'idioma', save: 'ahorrar', version: 'versión' }
    };
    function detect() {
        if ($$.get('tvmlanguage')) return $$.get('tvmlanguage');
        else if (language[navigator.language]) return navigator.language;
        else return 'en';
    };
    function lng() {
        if (language[detect()]) return language[detect()];
        else return language['en'];
    };
    function hideTaps(a) {
        var t = $$.id('vmanager');
        for (var i = 0; i < t.class('tvmtbl').length; i++) {
            t.class('tvmtbl')[i].hide().attr('name', '');
            t.class('tvmtap')[i].css('top', '0px');
            t.class('tvmtap')[i].style.backgroundColor = 'rgba(255, 255, 255, 0.80)';
        }
        t.class('tvmtbl')[a].show().attr('name', 'active');
        t.class('tvmtap')[a].css('top', '1px');
        t.class('tvmtap')[a].style.backgroundColor = 'rgba(255, 255, 255, 0.90)';
        $$.save('tvmtap', a);
    };
    function resourceUpdater() {
        var r = [], l = [], p = [], c = [], a = [], b = [], resource = [], v = [], tr = [0, 0, 0, 0], pR = [];
        for (var i = 0; i < int($$.get('length.txt')) ; i++) {
            a[i] = $$.class('tvmtbl')[1].tag('tbody')[0].tag('tr')[i];
            b[i] = $$.class('tvmtbl')[2].tag('tbody')[0].tag('tr')[i];
            v[i] = a[i].tag('a')[0].attr('href').split('newdid=')[1].match(/\d+/);
            r[i] = [], l[i] = [], p[i] = [], c[i] = [];
            for (var t = 0; t < 4; t++) {
                r[i][t] = a[i].tag('td')[(t + 1)].attr('r');
                l[i][t] = a[i].tag('td')[(t + 1)].attr('l');
                p[i][t] = a[i].tag('td')[(t + 1)].attr('p');
                c[i][t] = a[i].tag('td')[(t + 1)].attr('c');
                if (float(c[i][t]) + float(p[i][t]) < r[i][t]) {
                    resource[t] = {
                        lRes: float(c[i][t]) + float(p[i][t]),
                        rRes: r[i][t],
                        pRes: p[i][t]
                    };
                } else {
                    resource[t] = {
                        lRes: c[i][t],
                        rRes: r[i][t],
                        pRes: p[i][t]
                    };
                };
                tr[t] = int(tr[t] + int(resource[t].lRes));
                a[i].tag('td')[(t + 1)].setText(int(resource[t].lRes).Arrange()).attr('l', resource[t].lRes).attr('c', resource[t].lRes);
                pR[i] = Math.round(Math.round(resource[t].lRes) / resource[t].rRes * 100);
                b[i].tag('td')[((t < 3 ? t : 4) + 1)].setText((isNaN(pR[i]) ? '0%' : pR[i] + '%'));
                $$.class('tvmlastrow')[0].tag('td')[(t + 1)].setText(tr[t].Arrange());
            };
            $$.save('tvm_res_' + v[i], JSON.stringify(resource));
        };
        return window.setTimeout(resourceUpdater, 1000);
    };
    function jResource(v) { if ($$.get('tvm_res_' + v) && /\b/.test($$.get('tvm_res_' + v).toString())) { return JSON.parse($$.get('tvm_res_' + v)); } else { var resource = []; for (var t = 0; t < 4; t++) resource[t] = { lRes: 0, rRes: 0, pRes: 0 }; return JSON.parse(JSON.stringify(resource)); }; };
    function jMovements(v) { if ($$.get('tvm_mov_' + v) && /\b/.test($$.get('tvm_mov_' + v).toString())) { return JSON.parse($$.get('tvm_mov_' + v)); } else { return null; }; };
    function jBuilding(v) { if ($$.get('tvm_bul_' + v) && /\b/.test($$.get('tvm_bul_' + v).toString())) { return JSON.parse($$.get('tvm_bul_' + v)) } else { return null } };
    function etime() { for (var e = 0; e < $$.class('tvmetime').length; e++) { if (timeToSecond($$.class('tvmetime')[e].txt()) > 0) $$.class('tvmetime')[e].setText(setTime(timeToSecond($$.class('tvmetime')[e].txt()) - 1)) }; for (var c = 0; c < $$.class('tvmctime').length; c++) if (timeToSecond($$.class('tvmctime')[c].txt()) > 0) $$.class('tvmctime')[c].setText(setTime(int(timeToSecond($$.class('tvmctime')[c].txt()) - 1))); return window.setTimeout(etime, 1000) };
    function jAtk(v) { var table = $$.create('table').append($$.create('tbody')); for (var s = 0; s < jMovements(v).length; s++) { table.firstChild.append($$.create('tr').append([$$.create('td').append($$.create('img', { src: 'img/x.gif', class: jMovements(v)[s].type })), $$.create('td').addText(jMovements(v)[s].text), $$.create('td', { class: 'tvmetime' }).addText(setTime(htime(jMovements(v)[s].etime))), $$.create('td').addText(CulTime(setTime(htime(jMovements(v)[s].etime))))])) }; return table };
    function jBld(v) { var tbl = $$.create('table').append($$.create('tbody')); for (var s = 0; s < jBuilding(v).length; s++) { tbl.firstChild.append($$.create('tr').append([$$.create('td').addText(jBuilding(v)[s].name), $$.create('td', { class: 'tvmetime' }).addText(setTime(htime(jBuilding(v)[s].etime))), $$.create('td').addText(CulTime(setTime(htime(jBuilding(v)[s].etime))))])) }; return tbl };
    function trainimg(v) { var a = ['19', '20', '21', '25', '26', '29', '30', '36'], x; x = $$.create('td').center(); for (var i = 0; i < a.length; i++) { if (/\b/.test($$.get('tvm_tri_' + a[i] + '_' + v).toString())) { x.append($$.create('a', { href: 'build.php?newdid=' + v + '&gid=' + a[i], v: v, g: a[i] }).append($$.create('img', { src: 'img/x.gif', class: 'gebIcon g' + a[i] + 'Icon' })).hover(function () { return tvmMSG(traintable(this.attr('v'), this.attr('g'))) }, tvmHide)) } }; if (x.hasChildNodes()) return x; else return x.addText('-') };
    function traintable(v, g) { var t = [], e = [], tx; if (/\b/.test($$.get('tvm_tri_' + g + '_' + v).toString())) { tx = JSON.parse($$.get('tvm_tri_' + g + '_' + v)); t = $$.create('table').append($$.create('tbody')); for (var c = 0; c < tx.length; c++) { e[c] = tx[c]; t.firstChild.append($$.create('tr').append([$$.create('td').append($$.create('img', { src: 'img/x.gif', class: e[c].type })), $$.create('td').addText(e[c].name), $$.create('td', { class: 'tvmetime' }).addText(setTime(htime(e[c].etime))), $$.create('td').addText(CulTime(setTime(htime(e[c].etime))))])) }; return t } };
    function jTroops(v) { if ($$.get('tvm_tro_' + v) && /\b/.test($$.get('tvm_tro_' + v).toString())) return JSON.parse($$.get('tvm_tro_' + v)); else return { troop: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] } };
    function dialog(a) {
        if (a) {
            if ($$.class('tvmwindow')[0]) $$.class('tvmwindow')[0].remove();
            var dv = $$.create('div', { class: 'tvmwindow', style: 'position:absolute;top:200px;left:200px;', id: 'tvmqsr' }).append($$.create('div', { class: 'dragObj', id: 'tvmqsrd' })).append(a);
            $$().body.append(dv);
            return MakeDrag($$.id('tvmqsrd'), $$.id('tvmqsr'));
        };
        return;
    };
    function scan() {
        $$.class('tvmajax')[0].show().textContent = '0%';
        $$.class('tvmajax')[1].show();
        $$().body.style.cursor = 'wait';
        var url = [], resource = [], lRes = [], rRes = [], pRes = [], movments = [], build = [], troops = [], get = [], act = [], mt = 0.5, pB = 0;
        var trg, troops = [];
        var pA = $$.id('villageListLinks').tag('li').length;
        for (var i = 0; i < pA; i++) {
            url[i] = $$.id('villageListLinks').tag('li')[i].tag('a')[0].href.split('newdid=')[1].match(/\d+/);
            $$.ajax('dorf1.php?newdid=' + url[i], "GET", function (village) {
                get[i] = $$.ajaxHandler(village.responseText);
                act[i] = get[i].find('ul#villageListLinks li[class*="active"] a').href.split('newdid=')[1].match(/\d+/);
                resource[i] = [];
                for (var c = 0; c < 4; c++) {
                    resource[i][c] = {
                        lRes: get[i].find('#l' + (c + 1)).txt().split('/')[0],
                        rRes: get[i].find('#l' + (c + 1)).txt().split('/')[1],
                        pRes: get[i].find('#production').class('num')[c].txt().match(/-\d+|\d+/) / 3600
                    };
                };
                var trg = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (var d = 0; d < 10; d++) {
                    if (get[i].find('#troops img[class="unit u' + (unit + d) + '"]')) {
                        trg[d] = int(get[i].find('#troops img[class="unit u' + (unit + d) + '"]').parent().parent().next().txt());
                    } else {
                        trg[d] = int(0);
                    };
                };
                troops[i] = { troop: trg };
                movments[i] = [];
                if (get[i].find('#movements') && get[i].find('#movements').tag('img')[0]) {
                    for (var v = 0; v < get[i].find('#movements').tag('img').length; v++) {
                        movments[i][v] = {
                            type: get[i].find('#movements').tag('img')[v].className,
                            text: get[i].find('#movements').class('mov')[v].tag('span')[0].txt(),
                            etime: (timeToSecond(get[i].find('#movements').class('dur_r')[v].tag('span')[0].txt()) + ntime())
                        };
                    };
                };
                build[i] = [];
                if (get[i].find('#building_contract')) {
                    for (var b = 0; b < get[i].find('#building_contract tbody').tag('tr').length; b++) {
                        build[i][b] = {
                            name: get[i].find('#building_contract tbody').tag('tr')[b].tag('td')[1].txt(),
                            etime: (timeToSecond(get[i].find('#building_contract tbody').tag('tr')[b].tag('td')[2].tag('span')[0].txt()) + ntime())
                        };
                    };
                };
                $$.save('tvm_res_' + act[i], JSON.stringify(resource[i]));
                $$.save('tvm_mov_' + act[i], JSON.stringify(movments[i]));
                $$.save('tvm_bul_' + act[i], JSON.stringify(build[i]));
                $$.save('tvm_tro_' + act[i], JSON.stringify(troops[i]));
            });
            var gid = [19, 20, 21, 22, 25, 26, 29, 30, 36];
            for (var gi = 0; gi < gid.length; gi++) {
                $$.ajax('build.php?newdid=' + url[i] + (int(gid[gi]) == (25 || 26) ? '&s=1' : '') + '&gid=' + gid[gi], "GET", function (tr) {
                    var gt = $$.ajaxHandler(tr.responseText);
                    var train = new Array();
                    var ids = gt.find('ul#villageListLinks li[class*="active"] a').href.split('newdid=')[1].match(/\d+/);
                    if (gt.class('under_progress')[0]) {
                        for (var t = 0; t < gt.class('under_progress')[0].tag('tbody')[0].tag('tr').length; t++) {
                            var tr = gt.class('under_progress')[0].tag('tbody')[0].tag('tr')[t];
                            if (tr.class('dur')[0]) {
                                train[t] = {
                                    type: tr.class('desc')[0].tag('img')[0].className,
                                    name: tr.class('desc')[0].txt().toString().trim(),
                                    etime: (timeToSecond(tr.class('dur')[0].txt()) + ntime())
                                }
                            };
                        };
                    };
                    if (gt.find('#build') && gt.find('#build').className)
                        $$.save('tvm_tri_' + gt.find('#build').className.match(/\d+/) + '_' + ids, JSON.stringify(train));
                });
            };
            mt = (mt + 1) / 1.15;
            pB++;
            $$.class('tvmajax')[0].textContent = Math.round(pB / pA * 100) + '%';
        };
        return window.setTimeout(function () { return $$.loc.reload(); }, int(mt * 1000));
    };
    var icons = {
        refresh: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKtSURBVDjLlZJvaNV1FMY/vz/3zrt77xjs7s7mVZNS3HAuFIWwXpRWexEYDANFKQpfyagE8Q8iUfinKHwTFL0wzBcWMWjpCxWJJQ6hHGOSNtzcTYmma7ipu97tfs85X1+s1DcmHnjgcB54zsNzTnDkzPge79ms3gpmhhqIGaqGmkfUHoKi4lGz3/ZuXLgSIDbvO9pXZnM8QX34/dDS//pYzXIAXcOHERNEBWeCU4czoTFTIFedpy6V48TVn9jSsgvntOohAQ/AhuZ3H7v5+JVOvuz7BCdreSCgBsDRs6P3hw21SZLZv+gdP0Hx1gAiijhlTrpASe5wu/pb4DMAQvlXAGD9C3miwDN/3ii/jneRiVKsbmxjzdw2Xl3QxuJcE00Nzcyum2btV68NAcRODfOeOILOc6NEUcjp4R6qqaa+Kk//jT6Gx67gKo5CzVxEhMGi0tVx8lmAUNXwQBwFtD+fJw7h77uX6L/Rx7HLP1KZCjn0xnccebOTcmkaK0ckJzfx8oFVqfsOvEEcwvHef4giePvpj8jMiggCuHmnwtDIXUSNFDk+eGUnW4b6+HlHTxkgdGJ470lE8PryembFAQvyKeprkuSySeqySX648DmLCxn2t39MGISkq+IHVxCbCTEKA073jwEwOFIim4JEmGDfqe1MTE5weaQEwKddHfx+/Tyt74sXJ1dDEZnJIIQ1rTniCBY+lWZ2bZqD3buZsttECeWdr19i0xcvUmKCDe3rWLFsGa4iJ2cy8J4l8zKM3CzzTEOK4vVJdh17i9psDa2LWlBTlixqRr1iXhksDvPLmZ5eFT0abD106aw4fa6ilnaiOFFUDKdGIvsNUWoCEeXiwB9IRRCnhDSOlaf+XFc8fK0b7/3/Yvm2lu6l7zVdeBQfPu7/K9NutavIwKP4e594fYOHzxflAAAAAElFTkSuQmCC'
        , minmize: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAMCAYAAACwXJejAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3QIIBxwq5YNc0AAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAApUlEQVQYlX2QwQnCQBRE34oVqEGTqAetQhBswhZiUWkhduFFsAZP5pCL6SA7HtZdNwHzYWAZZt/AGEkAXK5r94iuPNcGYBqbp8MRWSHbcXvcgz/pfRUg6xRdLyTpq5FQoEj/Q4EyFvKUYZ0pqlwAabJkv92AtajreNYvmrZ1JL8FKFCcXGV5ro2Jx0wXCbssCxQPCCEfXM3mNO2bX0NvG6eiyjX0PhlqgLX99ntQAAAAAElFTkSuQmCC'
        , maxmize: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAMCAYAAACwXJejAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3QIIBxwy9u/EhgAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAAkklEQVQYlX2OwQ2CUBBEhx9KEOQrIYq0QOLFLmxBirIFKUOvQhGWQXY8yMddomwyh5m8vCxIQudy23K+Oahr2pybNEPT5tS7M8Dao9rt4ZPUgM4CJUjiUBTwq2QCnVFTxnx+CYJIl1N9BGUARHDvnrieX5H56WsiSDGzgThCEP6HgmXRNFm4YAqWuSnW5dH3+HVvXKlwQ2kOm6AAAAAASUVORK5CYII%3D'
        , setting: 'data:image/png;base64,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%3D'
        , build: 'data:image/gif;base64,R0lGODlhCgAQALMIACQQB3d0lM+EGH8zDtXT5MC/0kxMV4+Mr////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAgALAAAAAAKABAAAAQxEMmJxKDTAlzHxhrXGSJSBKR4ptSBHEbREkY9F/B97OlB4LucD8iT/II5CdI2qTEpEQA7'
        , ajax: 'data:image/gif;base64,R0lGODlhEAAQAPYAAP///wAAANTU1JSUlGBgYEBAQERERG5ubqKiotzc3KSkpCQkJCgoKDAwMDY2Nj4+Pmpqarq6uhwcHHJycuzs7O7u7sLCwoqKilBQUF5eXr6+vtDQ0Do6OhYWFoyMjKqqqlxcXHx8fOLi4oaGhg4ODmhoaJycnGZmZra2tkZGRgoKCrCwsJaWlhgYGAYGBujo6PT09Hh4eISEhPb29oKCgqioqPr6+vz8/MDAwMrKyvj4+NbW1q6urvDw8NLS0uTk5N7e3s7OzsbGxry8vODg4NjY2PLy8tra2np6erS0tLKyskxMTFJSUlpaWmJiYkJCQjw8PMTExHZ2djIyMurq6ioqKo6OjlhYWCwsLB4eHqCgoE5OThISEoiIiGRkZDQ0NMjIyMzMzObm5ri4uH5+fpKSkp6enlZWVpCQkEpKSkhISCIiIqamphAQEAwMDKysrAQEBJqamiYmJhQUFDg4OHR0dC4uLggICHBwcCAgIFRUVGxsbICAgAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAHjYAAgoOEhYUbIykthoUIHCQqLoI2OjeFCgsdJSsvgjcwPTaDAgYSHoY2FBSWAAMLE4wAPT89ggQMEbEzQD+CBQ0UsQA7RYIGDhWxN0E+ggcPFrEUQjuCCAYXsT5DRIIJEBgfhjsrFkaDERkgJhswMwk4CDzdhBohJwcxNB4sPAmMIlCwkOGhRo5gwhIGAgAh+QQJCgAAACwAAAAAEAAQAAAHjIAAgoOEhYU7A1dYDFtdG4YAPBhVC1ktXCRfJoVKT1NIERRUSl4qXIRHBFCbhTKFCgYjkII3g0hLUbMAOjaCBEw9ukZGgidNxLMUFYIXTkGzOmLLAEkQCLNUQMEAPxdSGoYvAkS9gjkyNEkJOjovRWAb04NBJlYsWh9KQ2FUkFQ5SWqsEJIAhq6DAAIBACH5BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhQkKE2kGXiwChgBDB0sGDw4NDGpshTheZ2hRFRVDUmsMCIMiZE48hmgtUBuCYxBmkAAQbV2CLBM+t0puaoIySDC3VC4tgh40M7eFNRdH0IRgZUO3NjqDFB9mv4U6Pc+DRzUfQVQ3NzAULxU2hUBDKENCQTtAL9yGRgkbcvggEq9atUAAIfkECQoAAAAsAAAAABAAEAAAB4+AAIKDhIWFPygeEE4hbEeGADkXBycZZ1tqTkqFQSNIbBtGPUJdD088g1QmMjiGZl9MO4I5ViiQAEgMA4JKLAm3EWtXgmxmOrcUElWCb2zHkFQdcoIWPGK3Sm1LgkcoPrdOKiOCRmA4IpBwDUGDL2A5IjCCN/QAcYUURQIJIlQ9MzZu6aAgRgwFGAFvKRwUCAAh+QQJCgAAACwAAAAAEAAQAAAHjIAAgoOEhYUUYW9lHiYRP4YACStxZRc0SBMyFoVEPAoWQDMzAgolEBqDRjg8O4ZKIBNAgkBjG5AAZVtsgj44VLdCanWCYUI3txUPS7xBx5AVDgazAjC3Q3ZeghUJv5B1cgOCNmI/1YUeWSkCgzNUFDODKydzCwqFNkYwOoIubnQIt244MzDC1q2DggIBACH5BAkKAAAALAAAAAAQABAAAAeJgACCg4SFhTBAOSgrEUEUhgBUQThjSh8IcQo+hRUbYEdUNjoiGlZWQYM2QD4vhkI0ZWKCPQmtkG9SEYJURDOQAD4HaLuyv0ZeB4IVj8ZNJ4IwRje/QkxkgjYz05BdamyDN9uFJg9OR4YEK1RUYzFTT0qGdnduXC1Zchg8kEEjaQsMzpTZ8avgoEAAIfkECQoAAAAsAAAAABAAEAAAB4iAAIKDhIWFNz0/Oz47IjCGADpURAkCQUI4USKFNhUvFTMANxU7KElAhDA9OoZHH0oVgjczrJBRZkGyNpCCRCw8vIUzHmXBhDM0HoIGLsCQAjEmgjIqXrxaBxGCGw5cF4Y8TnybglprLXhjFBUWVnpeOIUIT3lydg4PantDz2UZDwYOIEhgzFggACH5BAkKAAAALAAAAAAQABAAAAeLgACCg4SFhjc6RhUVRjaGgzYzRhRiREQ9hSaGOhRFOxSDQQ0uj1RBPjOCIypOjwAJFkSCSyQrrhRDOYILXFSuNkpjggwtvo86H7YAZ1korkRaEYJlC3WuESxBggJLWHGGFhcIxgBvUHQyUT1GQWwhFxuFKyBPakxNXgceYY9HCDEZTlxA8cOVwUGBAAA7AAAAAAAAAAAA'
    };

    css += "\
       div.villageManager {background-color: transparent; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; padding: 5px;}\
       div.drgObj {height: 110%; background-color: rgba(50, 50, 50, 0.5); width: 100%; position: absolute; left: 0px; top: -7px; z-index: -1; border-radius: 5px; border: 1px solid black;} \
       table#tblManager {border-collapse: collapse; border-radius: 0px 0px 5px 5px; background-color: rgba(255, 255, 255, 0.90); border-left: 1px solid black; border: 1px solid;}\
       table#tblManager td {padding: 1px 2px; background-color: transparent; border-radius: 5px 5px 5px 5px;}\
       .tvmlastrow {border-top-width: 1px; border-top-style: solid; border-top-color: gray;}\
       table#tblManager td a {padding:0px 1px}\
       div.tvmtap {position: relative; top: 0px;background-color: rgba(255, 255, 255, 0.80); padding-left:1px; cursor:pointer; float:" + $$.dir('right', 'left') + "; text-align: center; border-radius: " + $$.dir('5px 0px', '0px 5px') + " 0px 0px; border: 1px solid rgb(0, 0, 0); border-bottom: 0px solid white;}\
       #tvmMove {color: rgb(65, 62, 62); z-index: 10500; background-color: gold; padding: 1px; border: 1px solid gray;}\
       #tvmMove table {background-color:transparent;border-collapse: collapse;}\
       #tvmms {position: absolute; " + $$.dir('left', 'right') + ": 43px; top: 4px; color: white; direction: ltr;}\
       #tvmMove table td {border: 1px solid silver;color: black;padding: 2px;}\
       #vmanager * {-webkit-user-select: none;}\
       #vmanager * a, #vmanager * a img, div.tvmtap span {cursor: pointer;}\
       font.tvmajax,img.tvmajax {position: absolute; top: 25px; " + $$.dir('right', 'left') + ": 10px; opacity: 0.8;}\
       ";
    $$.create('style', { type: 'text/css' }, null, [$$.createText(css.replace(/\}/, "}\n"))]).appendTo($$.tag('head')[0]);

    var tableManager = $$.create('table', { id: 'tblManager', style: 'display:none;', class: 'tvmtbl', name: 'active', value: 'village' }, null, [
        $$.create('thead').append($$.create('tr').append([
            $$.create('td').addText(lng().villages),
            $$.create('td').center().addText(lng().attacks),
            $$.create('td').center().addText(lng().builds),
            $$.create('td').center().addText(lng().troops)
        ])),
        $$.create('tbody').forThis(function (u) {
            var names = [], hrefs = [], id = [], z = $$.get('coord.txt').toString().split(','), builds = [], attacks = [], b = [], q = [], tt = [];
            for (var i = 0; i < $$.id('villageListLinks').tag('li').length; i++) {
                names[i] = $$.id('villageListLinks').tag('li')[i].tag('a')[0].txt();
                hrefs[i] = $$.id('villageListLinks').tag('li')[i].tag('a')[0].attr("href");
                id[i] = hrefs[i].split('did=')[1].match(/\d+/);
                builds[i] = jBuilding(id[i]);
                if (builds[i] == null) b[i] = $$.create('td').center().addText('-'); else {
                    b[i] = $$.create('td').center().append($$.create('a', { href: 'dorf1.php?newdid=' + id[i] + '', v: id[i] }).append($$.create('img', { src: icons.build })));
                    b[i].firstChild.hover(function () { tvmMSG(jBld(int(this.attr('v')))); }, tvmHide)
                };
                attacks[i] = jMovements(id[i]);
                if (attacks[i] == null) q[i] = $$.create('td').center().addText('-'); else {
                    q[i] = $$.create('td').center();
                    for (var e = 0; e < attacks[i].length; e++) {
                        q[i].append($$.create('span').append($$.create('a', { href: 'dorf1.php?newdid=' + id[i] + '', v: id[i] }).append($$.create('img', { src: 'img/x.gif', class: attacks[i][e].type }))).hover(function () { tvmMSG(jAtk(int(this.firstChild.attr('v')))); }, tvmHide));
                    };
                };
                u.append(
                    $$.create('tr').append([
                        $$.create('td', { style: 'text-align:' + $$.dir("left", "right") + ';' }).append([
                            $$.create('a', { href: hrefs[i], style: 'float: ' + $$.dir("right", "left") + ';' }).addText(names[i]),
                            $$.create('span').append([
                            $$.create('a', { href: 'build.php?id=39&tt=2&z=' + z[i] }).append($$.create('img', { src: 'img/x.gif', class: 'def1' })),
                            $$.create('a', { href: 'build.php?z=' + z[i] + '&gid=17&t=5' }).append($$.create('img', { src: 'img/x.gif', class: 'carry' }))
                            ])]),
                        q[i],
                        b[i],
                        trainimg(id[i])
                    ])
                );
            };
        })
    ]);

    tvmM();
    var settingTbl = $$.create('table', { id: 'tblManager', style: 'display:none;', class: 'tvmtbl' }, null, [
        $$.create('tbody').append([
            $$.create('tr').append([
                $$.create('td', null, null, [$$.createText(lng().language)]),
                $$.create('td', null, null, [
                    $$.create('select', { id: 'tvmlang' }).forThis(function (w) {
                        for (var x = 0; x < langs.length; x++) {
                            w.append($$.create('option', { value: langs[x][1] }).addText(langs[x][0]))
                        };
                    })
                ])
            ])
        ]),
        $$.create('tfoot').append([
            $$.create('tr').append([
                $$.create('td', { colspan: '2', style: 'text-align:center' }, null, [
                    $$.create('font', { style: 'color:gray;margin-top: 8px;font-size: 11px;float:' + $$.dir("right", "left") + ';' }).addText(lng().version + ': ' + version),
                    $$.create('input', { type: 'button', value: lng().save }).event('click', function () { $$.id('tvmlang').selectedOption().value.save('tvmlanguage'); return $$.loc.reload(); })
                ])
            ])
        ])
    ]);
    var resourceTable = $$.create('table', { id: 'tblManager', style: 'display:none;', class: 'tvmtbl' }, null, [
        $$.create('thead').append($$.create('tr').forThis(function (tr) {
            tr.append($$.create('td').center().addText(lng().villages))
            for (var r = 0; r < 4; r++) tr.append($$.create('td').center().append($$.create('img', { src: 'img/x.gif', class: 'r' + (r + 1) })));
        })),
        $$.create('tbody').forThis(function (tbody) {
            var v, r, i, c, u, h, p;
            var tr = [0, 0, 0, 0];
            for (i = 0; i < $$.get('length.txt') ; i++) {
                v = int($$.id('villageListLinks').tag('li')[i].tag('a')[0].attr("href").split('newdid=')[1].match(/\d+/));
                r = jResource(v);
                u = $$.id('villageListLinks').tag('li')[i].tag('a')[0];
                h = u.attr('href'), u = u.txt();
                tbody.append($$.create('tr').append($$.create('td').center().append($$.create('a', { href: h, style: 'float: ' + $$.dir("right", "left") + ';' }).addText(u))).forThis(function (x) {
                    for (c = 0; c < 4; c++) {
                        tr[c] = int(tr[c] + r[c].lRes);
                        x.append($$.create('td', { l: r[c].lRes, r: r[c].rRes, p: r[c].pRes, c: r[c].lRes }).addText(int(r[c].lRes).Arrange()).center());
                    };
                }));
            };
            tbody.append($$.create('tr', { class: 'tvmlastrow' }).append($$.create('td').addText(lng().total + ':')).forThis(function (s) {
                for (p = 0; p < 4; p++) s.append($$.create('td').center().addText(tr[p].Arrange()));
            }));
        }),
    ]);
    var warehouseTable = $$.create('table', { id: 'tblManager', style: 'display:none;', class: 'tvmtbl' }, null, [
        $$.create('thead').append($$.create('tr').forThis(function (a) {
            a.append($$.create('td').center().addText(lng().villages))
            var img = ['r1', 'r2', 'r3', 'clock', 'r4', 'clock'];
            for (var r = 0; r < 6; r++) a.append($$.create('td').center().append($$.create('img', { src: 'img/x.gif', class: img[r] })));
        })),
        $$.create('tbody').forThis(function (a) {
            var v, r, i, c, j, e, z, pR;
            for (i = 0; i < $$.get('length.txt') ; i++) {
                v = int($$.id('villageListLinks').tag('li')[i].tag('a')[0].attr("href").split('did=')[1].match(/\d+/));
                r = jResource(v);
                a.append($$.create('tr').append($$.create('td').center().append($$.id('villageListLinks').tag('li')[i].tag('a')[0].cloneNode(true)).firstChild.css('float', $$.dir("right", "left")).parent()).forThis(function (x) {
                    j = new Object();
                    for (c = 0; c < 4; c++) j[c] = $$.create('td', { l: r[c].lRes, r: r[c].rRes, p: r[c].pRes }).addText(isNaN(pR) ? '0%' : pR + '%');
                    for (c = 0; c < 4; c++) pR = Math.round((r[c].lRes / r[c].rRes) * 100);
                    if (r[0].rRes != 0) {
                        j.tA = $$.create('td', { class: 'tvmctime' }).addText(setTime(Math.min(timeToSecond(getTime(int(r[0].lRes - r[0].rRes), r[0].pRes)), timeToSecond(getTime(int(r[1].lRes - r[1].rRes), r[1].pRes)), timeToSecond(getTime(int(r[2].lRes - r[2].rRes), r[2].pRes)))));
                        j.tB = $$.create('td', { class: 'tvmctime' }).addText(getTime(int(r[3].lRes - r[3].rRes), r[3].pRes));
                    } else {
                        j.tA = $$.create('td', { class: 'tvmctime' }).addText('0:00:00');
                        j.tB = $$.create('td', { class: 'tvmctime' }).addText('0:00:00');
                    };
                    e = [j[0], j[1], j[2], j.tA, j[3], j.tB];
                    for (z = 0; z < 6; z++) x.append(e[z]);
                }))
            };
        })
    ]);
    var troopsTable = $$.create('table', { id: 'tblManager', style: 'display:none;', class: 'tvmtbl' }, null, [
        $$.create('thead').append($$.create('tr').append($$.create('td').addText(lng().villages)).forThis(function (a) {
            for (var i = 0; i < 10; i++) {
                a.append($$.create('td').center().append($$.create('img', { src: 'img/x.gif', class: 'unit u' + (unit + i) })));
            };
        })),
        $$.create('tbody').forThis(function (b) {
            var y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (var i = 0; i < $$.get('length.txt') ; i++) {
                var ids = $$.id('villageListLinks').tag('li')[i].tag('a')[0].href.split('newdid=')[1].match(/\d+/);
                b.append($$.create('tr').append($$.create('td').append($$.id('villageListLinks').tag('li')[i].tag('a')[0].cloneNode(true)).firstChild.css('float', $$.dir("right", "left")).parent()).forThis(function (t) {
                    for (var c = 0; c < 10; c++) {
                        t.append($$.create('td').center().addText(jTroops(ids).troop[c].toString()));
                        y[c] = (int(jTroops(ids).troop[c]) + int(y[c]));
                    };
                }));
            };
            b.append($$.create('tr', { class: 'tvmlastrow' }).append($$.create('td').addText(lng().total + ':')).forThis(function (x) {
                for (var c = 0; c < 10; c++)
                    x.append($$.create('td').center().addText(y[c] > 0 ? y[c].toString() : '0'));
            }));
        })
    ]);
    $$.create('div', { id: 'vmanager', class: 'villageManager', style: 'position:absolute;left:200px;top:200px;z-index:1000;width:200px;' }, null, [
        $$.create('div', { class: 'drgObj' }),
        $$.create('img', { src: icons.refresh, style: 'cursor: pointer; position: absolute; ' + $$.dir('left', 'right') + ': 19px;' }).event('click', scan),
        $$.create('img', { src: icons.minmize, style: 'cursor: pointer; position: absolute; ' + $$.dir('left', 'right') + ': 7px; top: 7px;', class: 'minmize' }).event('click', function () { if (this.className == 'minmize') { this.className = 'maxmize'; this.src = icons.maxmize; for (var i = 0; i < 5; i++) $$.class('tvmtbl')[i].hide(); } else { this.className = 'minmize'; this.src = icons.minmize; $$.id('vmanager').find('table[name="active"]').show(); }; }),
        $$.create('span', { id: 'tvmms' }),
        $$.create('font', { size: '1.5', class: 'tvmajax', style: $$.dir('right', 'left') + ': 27px;' }),
        $$.create('img', { src: icons.ajax, class: 'tvmajax', style: 'display: none;' }),
        $$.create('div', { class: 'tvmtap', value: '0' }, null, [$$.create('span').addText(lng().villages)]),
        $$.create('div', { class: 'tvmtap', value: '1' }, null, [$$.create('span').addText(lng().resource)]),
        $$.create('div', { class: 'tvmtap', value: '2' }, null, [$$.create('span').addText(lng().warehouse)]),
        $$.create('div', { class: 'tvmtap', value: '3' }, null, [$$.create('span').addText(lng().troops)]),
        $$.create('div', { class: 'tvmtap', value: '4' }, null, [$$.create('span').addText(lng().setting)]),
        tableManager,
        resourceTable,
        warehouseTable,
        troopsTable,
        settingTbl
    ]).appendTo($$().body);
    etime();
    $$.id('tvmlang').find('option[value="' + detect() + '"]').attr('selected', 'selected');
    var width = [], total = 0, tt = /\d/.test($$.get('tvmtap')) ? int($$.get('tvmtap')) : int(0);
    for (var t = 0; t < 5; t++) {
        width[t] = int($$.class('tvmtap')[t].tag('span')[0].offsetWidth + 2);
        total = int(total + width[t]);
        $$.class('tvmtap')[t].attr('style', 'width:' + width[t] + 'px;' + (t == tt ? ' top: 1px; background-color: rgba(255, 255, 255, 0.90)' : '')).event('click', function () { if ($$.class('drgObj')[0].next().next().className != 'maxmize') hideTaps(this.attr('value')); });
    };
    $$.class('tvmtbl')[tt].show();
    $$.id('vmanager').style.width = $$.dir(160, 115) + total + 'px';
    MakeDrag($$.class('drgObj')[0], $$.id('vmanager'));
    resourceUpdater();
    $$.id('tvmms').addText('+' + (new Date().getTime() - ms) + 'ms');
})();