// ==UserScript==
// @name        Travian Search Engine
// @namespace   http://userscripts.org/users/119605
// @description search engine for travian game v4.2^, finds crop + oases + farms
// @include     http*://*.travian.*/karte.php*
// @exclude     http*://*.travian.*/
// @version     1.0.1
// ==/UserScript==
var ms = new Date().getTime();

/* jSpeed Technique - Library v1.0.3 */

(function (a, b) { window.jSpeed = function (a, b) { if (a) return new $R(a, b ? b : null) }, window.$R = window.jSpeed; function is$(a) { if (a instanceof NodeList || a instanceof HTMLCollection) return true; else return false }; function $R(a, b) { if (a && typeof a == 'string' && !/\<\w+(\s+[^>]+|)\>/.test(a)) { if (window === this) return new window.$R(a, b != null ? b : document); this.e = b != null ? b : document; if (/\-\>/.test(a)) { a = a.replace(/(\s+|)\-\>(\s+|)/g, '->'); var n = [], u = [], i, l = a.split('->'), li = l.length; for (i = 0; i < li; i++) { n[i] = l[i]; this.e = is$(this.e) ? this.e[0] : this.e; if (this.e == undefined) return 'undefined'; if (/\[\D+|\w+\.|\w+\#/.test(n[i]) || (/\#/.test(n[i]) && (i != 0 || b != null))) { if (i == (li - 1)) this.e = this.e.querySelectorAll(n[i]); else this.e = this.e.querySelector(n[i]) } else if (/\#/.test(n[i]) && i == 0 && b == null) { this.e = document.getElementById(n[i].replace('#', '')) } else if (/\./.test(n[i])) { n[i] = n[i].replace('.', ''); if (/\[\d+\]/.test(n[i])) { u[i] = n[i].split('[')[1].split(']')[0]; n[i] = n[i].split('[')[0]; this.e = this.e.getElementsByClassName(n[i])[u[i]] } else this.e = this.e.getElementsByClassName(n[i]) } else { if (/\[\d+\]/.test(n[i])) { u[i] = n[i].split('[')[1].split(']')[0]; n[i] = n[i].split('[')[0]; this.e = this.e.getElementsByTagName(n[i])[u[i]] } else this.e = this.e.getElementsByTagName(n[i]) } } } else { var n = a, u; if (/\[\D+|\w+\.|\w+\#/.test(n) || (/\#/.test(n) && b != null)) { this.e = this.e.querySelectorAll(n) } else if (/\#/.test(n) && b == null) { this.e = document.getElementById(n.replace('#', '')) } else if (/\./.test(n)) { n = n.replace('.', ''); if (/\[\d+\]/.test(n)) { u = n.split('[')[1].split(']')[0]; n = n.split('[')[0]; this.e = this.e.getElementsByClassName(n)[u] } else this.e = this.e.getElementsByClassName(n) } else { if (/\[\d+\]/.test(n)) { u = n.split('[')[1].split(']')[0]; n = n.split('[')[0]; this.e = this.e.getElementsByTagName(n)[u] } else this.e = this.e.getElementsByTagName(n) } }; return this } else { if (window === this) return new window.$R(a, b != null ? b : document); this.e = a; return this } }; $R.prototype = { hide: function () { if (is$(this.e)) for (var i = 0; i < this.e.length; i++) this.e[i].style.display = 'none'; else this.e.style.display = 'none'; return this }, show: function () { if (is$(this.e)) for (var i = 0; i < this.e.length; i++) this.e[i].style.display = ''; else this.e.style.display = ''; return this }, val: function (newval) { if (newval) { if (is$(this.e)) for (var i = 0; i < this.e.length; i++) this.e[i].value = newval; else this.e.value = newval } else return (is$(this.e) ? this.e[0] : this.e).value; return this }, count: function () { return this.e.length }, item: function (a) { if (is$(this.e)) this.e = this.e[a]; else console.log('cannot find item:' + a); return this }, toggle: function () { if (is$(this.e)) for (var i = 0; i < this.e.length; i++) this.e[i].style.display = this.e[i].style.display != 'none' ? 'none' : ''; else this.e.style.display = this.e.style.display != 'none' ? 'none' : ''; return this }, size: function (height, width) { if (is$(this.e)) for (var i = 0; i < this.e.length; i++) { this.e[i].style.height = height + 'px'; this.e[i].style.width = width + 'px' } else { this.e.style.height = height + 'px'; this.e.style.width = width + 'px' }; return this }, append: function (s) { if (typeof s == 'string') { var i = 0, u = this.e; if (is$(u)) { for (; i < u.length; i++) { u[i].insertAdjacentHTML('beforeEnd', s) } } else u.insertAdjacentHTML('beforeEnd', s) } else if (typeof s == 'object') { if (is$(this.e)) { var i = 0, u = this.e, o = u.length; var e = document.createElement('div'); e.appendChild(s.e ? s.e : s); while (i < o) { u[i].insertAdjacentHTML('beforeEnd', e.innerHTML); i++ } } else this.e.appendChild(s) }; return this }, appendTo: function (a) { if (a) { var x = typeof a == 'string' ? $R(a) : a, r = this.e; var j = x.count ? x.count() : x.length; if (x.count) { x.append(this.e) } else { if (is$(x)) for (var i = 0; i < j; i++) x[i].insertAdjacentHTML('beforeEnd', this.e); else x.insertAdjacentHTML('beforeEnd', this.e) } }; return this }, empty: function () { var a = this.e, i = 0; if (is$(a)) { var u = a.length; while (i < u) { while (a[i].firstChild) a[i].removeChild(a[i].firstChild); i++ } } else while (a.firstChild) a.removeChild(a.firstChild); return this }, isEmpty: function () { var a = this.e, i = 0, result = false; if (is$(a)) { var u = a.length; while (i < u) { if (a[i].hasChildNodes()) { result = false; break } else result = true; i++ } } else if (a.hasChildNodes()) { result = false } else result = true; return result }, isExist: function () { if (this.e == undefined) return false; else return true }, remove: function () { if (is$(this.e)) for (var i = 0; i < this.e.length; i++) this.e[i].parentNode.removeChild(this.e[i]); else this.e.parentNode.removeChild(this.e); return }, replaceWith: function (s) { if (typeof s == 'object') { var a = (is$(s)) ? true : false; var e = this.e.parentNode; if (is$(this.e)) for (var i = 0; i < this.e.length; i++) this.e[i].parentNode.replaceChild(a == true ? s[i] : s, this.e[i]); else this.e.parentNode.replaceChild(s, this.e); return e }; return this }, parent: function () { this.e = (is$(this.e) ? this.e[0] : this.e).parentNode; return this }, next: function () { this.e = (is$(this.e) ? this.e[0] : this.e).nextElementSibling; return this }, prev: function () { this.e = (is$(this.e) ? this.e[0] : this.e).previousElementSibling; return this }, first: function () { this.e = (is$(this.e) ? this.e[0] : this.e).firstChild; return this }, find: function (a) { return window.$R(a, (is$(this.e) ? this.e[0] : this.e)) }, html: function (s) { if (s) { if (is$(this.e)) for (var i = 0; i < this.e.length; i++) this.e[i].innerHTML = s; else this.e.innerHTML = s } else return (is$(this.e) ? this.e[0] : this.e).innerHTML; return this }, txt: function (s) { if (s) { if (is$(this.e)) for (var i = 0; i < this.e.length; i++) this.e[i].textContent = s; else this.e.textContent = s } else return this.e.textContent; return this }, attr: function (s, t) { if (s) { if (s && t) { if (is$(this.e)) for (var i = 0; i < this.e.length; i++) this.e[i].setAttribute(s, t); else this.e.setAttribute(s, t) } else return (is$(this.e) ? this.e[0] : this.e).getAttribute(s) }; return this }, removeAttr: function (s) { if (s) { if (is$(this.e)) for (var i = 0; i < this.e.length; i++) this.e[i].removeAttribute(s); else this.e.removeAttribute(s) }; return this }, css: function (s, t) { if (s) { if (/\-/.test(s)) { var r = s.toLowerCase(); var i = [r.split("-")[0], r.split("-")[1].charAt(0).toUpperCase() + r.split("-")[1].slice(1)]; var x = i[0] + i[1]; if (t || t == '') if (is$(this.e)) for (var i = 0; i < this.e.length; i++) this.e[i].style[x] = t; else this.e.style[x] = t; else return (is$(this.e) ? this.e[0] : this.e).style[x]; return this } else { if (t || t == '') if (is$(this.e)) for (var i = 0; i < this.e.length; i++) this.e[i].style[s] = t; else this.e.style[s] = t; else return (is$(this.e) ? this.e[0] : this.e).style[s]; return this } }; return this }, get: function (a) { if ((is$(this.e) ? this.e[0] : this.e)[a]) return (is$(this.e) ? this.e[0] : this.e)[a]; else return null }, this: function (a) { if (is$(this.e)) for (var i = 0; i < this.e.length; i++) a(this.e[i]); else a(this.e) }, click: function (a) { if (a) { if (is$(this.e)) for (var i = 0; i < this.e.length; i++) this.e[i].onclick = a; else this.e.onclick = a } else { if (is$(this.e)) for (var i = 0; i < this.e.length; i++) this.e[i].click(); else this.e.click() }; return this }, on: function (a, b) { if (a && b) { var is = /\,/.test(a); if (is$(this.e)) for (var i = 0; i < this.e.length; i++) if (is) for (var c = 0; c < a.split(',').length; c++) this.e[i].addEventListener(a.split(',')[c], b); else this.e[i].addEventListener(a, b); else { if (is) for (var c = 0; c < a.split(',').length; c++) this.e.addEventListener(a.split(',')[c], b); else this.e.addEventListener(a, b) } }; return this }, hover: function (a, b) { if (a) if (is$(this.e)) for (var i = 0; i < this.e.length; i++) this.e[i].onmouseover = a; else this.e.onmouseover = a; if (b) if (is$(this.e)) for (var i = 0; i < this.e.length; i++) this.e[i].onmouseout = b; else this.e.onmouseout = b; return this } }; return new window.$R(a, b ? b : null) })(window);
(function () {
    if (location.pathname.indexOf('karte.php') === -1 || !document.getElementById('mapContainer')) return;
    var system = new Object({
        local: window.localStorage,
        detect: navigator.language || navigator.userLanguage,
        dir: function (a, b) {
            if (document.defaultView.getComputedStyle(document.body, null).getPropertyValue('direction') == 'rtl') return a; else return b;
        },
        language: {
            file: new Array(['ar', 'عربي'], ['en', 'English']),
            update: function (e) { system.local.setItem('tt_lang', e.options[e.selectedIndex].value); location.href = location.href; },
            //------
            ar: { search_for: 'بحث عن', crop: 'قرى قمحية', oases: 'واحات', show_oc: 'عرض واحات محتلة', farms: 'مزارع', pB: 'السكان بين', iA: 'تخطى القرى المتحالفه', zoom: 'البعد', search: 'بحث', nF: 'لم نتمكن من ايجاد القرى!', pName: 'اللاعب', vName: 'القرية', aName: 'التحالف', ppl: 'السكان', owner: 'المالك' },
            en: { search_for: 'search for', crop: 'crop', oases: 'oases', show_oc: 'Show occupied oases', farms: 'farms', pB: 'population betwen', iA: 'ignore villages that belong to alliance', zoom: 'zoom', search: 'search', nF: 'not found!', pName: 'Player', vName: 'Village', aName: 'Alliance', ppl: 'Population', owner: 'Owner' }
        },
        detectLanguage: function () {
            if (system.local.getItem('tt_lang') != null)
                return system.local.getItem('tt_lang');
            else if (this.language[system.detect])
                return system.detect;
            else
                return 'en';
        },
        lang: function () {
            return this.language[system.detectLanguage()];
        }
    });
    function request(url, load, c) {
        var x = new XMLHttpRequest();
        x.open("POST", url, true);
        if (c) x.get = c;
        x.onload = function () { return load(x); };
        x.send(null);
        return x;
    };
    function getType(t, n) {
        var e = t;
        if (n == 1) {
            e = e.replace(/\{a\.r\d\}/g, '').replace(/<\b[^>]*>/g, ' ');
            t = e.split('{a:r').length, g = '', p = '';
            for (var i = 1; i < t; i++) {
                if (i > 2) break;
                g = g + '<img src="img/x.gif" class="r' + e.split('{a:r')[i].split('}')[0] + '" />' + e.split('}')[i].match(/\d{2}%/);
            };
            if (e.split('{k.spieler}')[1] != undefined)
                p = e.split('{k.spieler}')[1].split('{')[0];
            return { oases: g, player: p };
        };
    };
    function Distance(mxy, dxy) {
        var dX = Math.min(Math.abs(dxy[0] - mxy[0]), Math.abs(801 - Math.abs(dxy[0] - mxy[0]))),
            dY = Math.min(Math.abs(dxy[1] - mxy[1]), Math.abs(801 - Math.abs(dxy[1] - mxy[1])));
        return Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2)).toString().match(/\d+\.\d{2}|\d+\.\d{1}|\d+/);
    };
    function int(v) {
        return parseInt(v);
    };
    function ttscan() {
        var e = $R('#ttxy'),
            x = int(e.find('input[0]').val()),
            y = int(e.find('input[1]').val()),
            z = int($R('#ttzoom').val());
        if ((!isNaN(x) && !isNaN(y)) &&
            ((!(x > 400) && !(x < -400)) && (!(y > 400) && !(y < -400))) &&
            (!(z > 4) && !(z < 1))
            ) {
            $R(document.body).css('cursor', 'wait');
            $R('#ttfinds').empty();
            return new request('ajax.php?cmd=mapPositionData&data[x]=' + x + '&data[y]=' + y + '&data[zoomLevel]=' + z + '&ajaxToken=' + ajaxToken, function (villages) {
                var get = eval('(' + villages.responseText + ')'), len = get.response.data.tiles.length, i = 0, vil = [], t = [], c = [], e = [], p = [], x = [], y = [], html = [], s = [];
                var img = ['<img src="img/x.gif" class="r1" />', '<img src="img/x.gif" class="r2" />', '<img src="img/x.gif" class="r3" />', '<img src="img/x.gif" class="r4" />'];
                s['1'] = img[3] + '-9 ' + img[2] + '-3 ' + img[1] + '-3 ' + img[0] + '-3';
                s['6'] = img[3] + '-15 ' + img[2] + '-1 ' + img[1] + '-1 ' + img[0] + '-1';
                s['7'] = img[3] + '-7 ' + img[2] + '-3 ' + img[1] + '-4 ' + img[0] + '-4';
                s['8'] = img[3] + '-7 ' + img[2] + '-4 ' + img[1] + '-4 ' + img[0] + '-3';
                s['9'] = img[3] + '-7 ' + img[2] + '-4 ' + img[1] + '-3 ' + img[0] + '-4';
                var av = $R('#sidebarBoxVillagelist -> a.active -> span[0]').txt().replace(/[^\d+\-\|]/g, '').split('|');
                var vx = av[0], vy = av[1];
                for (; i < len; i++) {
                    vil[i] = get.response.data.tiles[i];
                    if ($R('#ttst -> #ttofind -> input[type="radio"]').item(0).get('checked') == true) {
                        if (vil[i].c == '{k.fo}' || (vil[i].c == '{k.bt}' && $R('#ttofind -> input[5]').get('checked') == true)) {
                            t[i] = vil[i].t;
                            c[i] = $R('#ttofind'), e[i] = null;
                            if (/\{a\:r1\}/.test(t[i]) && c[i].find('input[1]').get('checked') == true) e[i] = getType(t[i], 1).oases;
                            else if (/\{a\:r2\}/.test(t[i]) && c[i].find('input[2]').get('checked') == true) e[i] = getType(t[i], 1).oases;
                            else if (/\{a\:r3\}/.test(t[i]) && c[i].find('input[3]').get('checked') == true) e[i] = getType(t[i], 1).oases;
                            else if (/\{a\:r4\}/.test(t[i]) && c[i].find('input[4]').get('checked') == true) e[i] = getType(t[i], 1).oases;
                            if (e[i] != null) {
                                x[i] = vil[i].x, y[i] = vil[i].y;
                                p[i] = vil[i].c == '{k.bt}' ? '' + system.lang().owner + ': <a href="spieler.php?uid=' + vil[i].u + '">' + getType(t[i], 1).player + '</a>' : '';
                                html[i] = '<tr><td>' + e[i] + '</td><td><a href="position_details.php?x=' + x[i] + '&y=' + y[i] + '">( ' + x[i] + ' | ' + y[i] + ' )</a> ' + p[i] + '</td><td> < ' + Distance([vx, vy], [x[i], y[i]]) + ' ></td></tr>';
                                $R('#ttfinds').append(html[i]);
                            };
                        };
                    } else if ($R('#ttst -> #ttcfind -> input[type="radio"]').item(0).get('checked') == true) {
                        if (/\{k\.f(1|6|7|8|9)\}/.test(vil[i].c)) {
                            t[i] = vil[i].c;
                            c[i] = $R('#ttcfind -> input[type="checkbox"]'), e[i] = null;
                            if (/\{k\.f6\}/.test(t[i]) && c[i].item(0).get('checked') == true) e[i] = s['6'];
                            else if (/\{k\.f1\}/.test(t[i]) && c[i].item(1).get('checked') == true) e[i] = s['1'];
                            else if (/\{k\.f(7|8|9)\}/.test(t[i]) && c[i].item(2).get('checked') == true) e[i] = s[t[i].match(/k\.f(.+?)/)[1]];
                            if (e[i] != null) {
                                x[i] = vil[i].x, y[i] = vil[i].y;
                                html[i] = '<tr><td>' + e[i] + '</td><td><a href="position_details.php?x=' + x[i] + '&y=' + y[i] + '">( ' + x[i] + ' | ' + y[i] + ' )</a></td><td> < ' + Distance([vx, vy], [x[i], y[i]]) + ' ></td></tr>';
                                $R('#ttfinds').append(html[i]);
                            };
                        };
                    } else if ($R('#ttst -> #ttffind -> input[type="radio"]').item(0).get('checked') == true) {
                        if (/\{k\.dt\}/.test(vil[i].c) && /\{k\.spieler\}/.test(vil[i].t)) {
                            t[i] = vil[i].t;
                            c[i] = $R('#ttffind -> input[type="checkbox"]'), e[i] = null;
                            vname = vil[i].c.split('}')[1];
                            vpop = int(t[i].split('{k.einwohner}')[1].split('<')[0]);
                            pname = t[i].split('{k.spieler}')[1].split('<')[0].replace(/\s+/g, '');
                            name = $R('#villageNameField').txt();
                            vally = t[i].split('{k.allianz}')[1].split('<')[0].replace(/\s+/g, '');
                            pop = $R('#ttffind');
                            ally = $R('#ttffind -> input[type="checkbox"]').get('checked');
                            if ((!(vpop <= pop.find('input[1]').val()) && !(vpop >= pop.find('input[2]').val())) && pname != name) {
                                if (vally != '' && ally == true); else {
                                    request('spieler.php?uid=' + vil[i].u, function (e) {
                                        var c = document.createElement('div'); c.innerHTML = e.responseText;
                                        var g = int($R(c).find('table#details -> tbody[0] -> tr[4] -> td[0]').txt());
                                        var vil = e.get;
                                        if ((int(vil.min) <= g && int(vil.max) >= g) || vil.u == '1') {
                                            if (vil.aname != '') vally = '<a href="allianz.php?aid=' + vil.a + '">' + vil.aname + '</a>';
                                            h = '' + system.lang().pName + ':<a href="spieler.php?uid=' + vil.u + '">' + vil.p + '</a>, ' + system.lang().vName + ':<a href="position_details.php?x=' + vil.x + '&y=' + vil.y + '">' + vil.vn + '</a>' + (vil.a ? ', ' + system.lang().aName + ': ' + vally : '') + ', ' + system.lang().ppl + ': ' + vil.vp + '';
                                            $R('#ttfinds').append('<tr><td colspan="2">' + h + '</td></tr>');
                                        };
                                    }, { a: vil[i].a, u: vil[i].u, p: pname, aname: vally, vn: vname, x: vil[i].x, y: vil[i].y, vp: vpop, min: pop.find('input[1]').val(), max: pop.find('input[2]').val() });
                                };
                            };
                        };
                        if (i == (len - 1))
                            setTimeout(function () {
                                if ($R('#ttfinds').isEmpty()) $R('#ttfinds').append('<tr><td colspan="2" style="text-align:center;"><font color="gray"><b><i>' + system.lang().nF + '</i></b></font></td></tr>');
                            }, 2000);
                    }
                };
                if ($R('#ttst -> #ttffind -> input[type="radio"]').item(0).get('checked') != true)
                    if ($R('#ttfinds').isEmpty()) $R('#ttfinds').append('<tr><td colspan="2" style="text-align:center;"><font color="gray"><b><i>' + system.lang().nF + '</i></b></font></td></tr>');
                $R(document.body).css('cursor', 'default');
            });
        } else {
            var a = '';
            if (isNaN(x) || isNaN(y) || (x > 400) || (x < -400) || (y > 400) || (y < -400)) a = a + 'Please set a valid coords';
            if (z > 4 || z < 1) a = a + '\nPlease set a valid zoom';
            confirm(a);
        };
    }
    var css = '\
#ttcropfinder {font-family: segoe ui; direction: ' + (system.detectLanguage() == 'ar' ? 'rtl' : 'ltr') + ';}\
#ttcontent {border: 1px solid silver; border-radius: 5px 5px 5px 5px; text-align: left;}\
#ttcontent legend {font-family:segoe ui; color: gray;}\
#ttms {color:gray;float:left;}\
select.tt_vil_sel {width: 65px;}\
#ttcropfinder * {text-align: ' + (system.detectLanguage() == 'ar' ? 'right' : 'left') + ';}\
';
    $R('head[0]').append('<style type="text/css">' + css + '</style>');
    var ajaxToken = document.body.getElementsByTagName('script')[0].textContent.split('\'')[1].split('\'')[0];
    var v = $R('#sidebarBoxVillagelist -> a.active -> span[0]').txt().replace(/[^\d+\-\|]/g, '').split('|');
    var x = v[0].split('|')[0], y = v[1].split('|')[1];
    var i = 0, li = document.querySelectorAll('#sidebarBoxVillagelist ul li'), se, x, y, xht = '<select class="tt_vil_sel">';
    while (i < li.length) {
        se = li[i];
        x = se.querySelector('span span').textContent.replace(/[^\d+\-]/g, '');
        y = se.querySelector('span span:nth-of-type(3)').textContent.replace(/[^\d+\-]/g, '');
        xht = xht + '<option value="' + x + ',' + y + '">' + se.querySelector('div').textContent + '</option>';
        i = i + 1;
    };
    xht = xht + '</select>';
    li = system.language.file.length, lng = '<select class="tt_lng_sel">';
    for (i = 0; i < li; i++) lng = lng + '<option value="' + system.language.file[i][0] + '">' + system.language.file[i][1] + '</option>';
    lng = lng + '</select>';
    $R('#content').append('\
    <div id="ttcropfinder">\
        <table cellspacing="1">\
            <thaed>\
                <tr>\
                    <td colspan="4" style="text-align:center;" id="ttst">\
                        <span id="ttms">?ms</span> '+ lng + '<br />\
                        <form><fieldset id="ttcontent"><legend>'+ system.lang().search_for + ':</legend><table cellspacing="0"><tbody>\
                            <tr id="ttcfind"><td><label><input type="radio" name="ttst" checked="checked" />'+ system.lang().crop + ': </label></td>\
                            <td><label><input type="checkbox" /><img src="img/x.gif" class="r4"/>15</label></td>\
                            <td><label><input type="checkbox" /><img src="img/x.gif" class="r4"/>9</label></td>\
                            <td colspan="3"><label><input type="checkbox" /><img src="img/x.gif" class="r4"/>7</label></td>\
                            </tr>\
                            <tr id="ttofind"><td><label><input type="radio" name="ttst" />' + system.lang().oases + ': </label></td>\
                            <td><label><input type="checkbox" /><img src="img/x.gif" class="r1"/></label></td>\
                            <td><label><input type="checkbox" /><img src="img/x.gif" class="r2"/></label></td>\
                            <td><label><input type="checkbox" /><img src="img/x.gif" class="r3"/></label></td>\
                            <td><label><input type="checkbox" /><img src="img/x.gif" class="r4"/></label></td>\
                            <td><label><input type="checkbox" />' + system.lang().show_oc + '</label></td></tr>\
                            <tr id="ttffind" style="font-size:11px;"><td><label><input type="radio" name="ttst" />' + system.lang().farms + ': </label></td>\
                            <td colspan="5">' + system.lang().pB + ': <input type="text" style="width:30px; height:12px;" value="0" /> & <input type="text" style="width:30px; height:12px;" value="100" />\
                            <label style="font-size:10px;"><input type="checkbox" checked="true" />' + system.lang().iA + '</label></td>\
                            </tr>\
                        </tbody></table></fieldset></form>\
                    </td>\
                </tr>\
            </thead>\
            <tbody>\
                <tr>\
                    <td id="ttxy">X: <input maxlength="4" type="text" size="5" value="' + x + '" /> | Y: <input maxlength="4" size="5" type="text" value="' + y + '" /> ' + xht + '</td>\
                    <td colspan="2">' + system.lang().zoom + ':<input id="ttzoom" maxlength="1" size="5" type="text" value="1" /> 1 - 4 <input style="float:' + (system.detectLanguage() == 'ar' ? 'left' : 'right') + ';" type="button" id="ttsearch" value="' + system.lang().search + '" /></td>\
                </tr>\
            </tbody>\
            <tbody id="ttfinds"></tbody>\
        </table>\
    </div>\
');
    $R('#ttsearch').click(ttscan);
    $R('.tt_lng_sel[0]').on('change', function () { return system.language.update(this); }).this(function (a) { a.querySelector('option[value="' + system.detectLanguage() + '"]').selected = 'selected'; });

    function keyCheck(a, b) {
        if (b != 1) if (/\D|\s+/.test(a.value)) a.value = a.value.replace(/\D|\s+/g, '');
        if (b == 1) {
            if (/\D|\s+/.test(a.value)) { a.value = a.value.match(/\-\d+|\d+|\-/); }
            if (a.value > 400 || a.value < -400) {
                if (a.value < 0) a.value = -400;
                else a.value = 400;
            };
        };
        if (b == 2) {
            if (int(a.value) < 1 || int(a.value) > 4) {
                if (int(a.value) < 1) a.value = 1;
                else a.value = 4;
            };
        };
        if (b == 3) {
            if (a.value == '') a.value = 1;
        };
        return;
    };
    function select(e, t) {
        if (t) {
            c = $R(e).val().split(',');
            return $R('#ttxy-> input[0]').val(c[0]).next().val(c[1]);
        } else {
            var i = e, c = i.options[i.selectedIndex];
            c = $R(i).item(c).val().split(','), x = c[0], y = c[1];
            $R('#ttxy-> input[0]').val(x).next().val(y);
        };
    };
    if ($R('.tt_vil_sel -> option').count() == 1)
        $R('.tt_vil_sel').on('keypress', function () { return select(this, true); }).
        first().on('click', function () { return select(this, true); });
    else $R('.tt_vil_sel').on('change', function () { return select(this); });

    $R('#ttffind -> input[type="text"]').on('keyup', function () { return keyCheck(this, 0) }).on('change', function () { return keyCheck(this, 0); });
    $R('#ttxy -> input').on('keyup', function () { return keyCheck(this, 1) }).on('change', function () { return keyCheck(this, 1); });
    $R('#ttzoom').on('keyup', function () { return keyCheck(this, 2) }).on('change', function () { return keyCheck(this, 2); }).on('blur', function () { return keyCheck(this, 3); });
    $R('#ttst -> #ttofind -> input[type="checkbox"]').attr('checked', 'checked').item(4).removeAttr('checked');
    $R('#ttst -> #ttcfind -> input[type="checkbox"]').attr('checked', 'checked');
    $R('#ttst -> input[type="radio"]').click(function () {
        $R(this).parent().parent().parent().parent().find('input[type="checkbox"],input[type="text"]').attr('disabled', 'disabled');
        $R(this).parent().parent().parent().find('input[type="checkbox"],input[type="text"]').removeAttr('disabled');
    });
    $R('#ttcontent -> input[type="radio"]').item(0).click();
    $R('#ttms').txt('Travian Search Engine: ' + ((new Date().getTime()) - ms) + 'ms');
})();