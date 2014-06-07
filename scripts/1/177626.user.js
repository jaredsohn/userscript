// ==UserScript==
// @author StaticControl
// @name WoWPRegress
// @version 1.5.3 (14.11.2013)
// @description Adds some useful information for game World of Warplanes user's page
// @include http://worldofwarplanes.ru/community/accounts/*/*
// ==/UserScript==

if (!/http:\/\/worldofwarplanes.ru\/community\/accounts\/*\/*/.test(window.location.href)) return;

setTimeout(start, 1000);

function start() {
    contentEval(main);
    function main() {
        if (document.getElementById('js-profile-name') === null) {
            return;
        } else {
            var current = document.getElementById('js-profile-name').textContent;
            var me = document.getElementsByClassName('b-auth-link js-visible-wnd b-visible-wnd')[0].childNodes[1].textContent;
            if (current !== me) {
                document.getElementById('js-profile-name').innerHTML += '<br/><span style="font-size: 14pt; line-height: 20pt;">( ' 
                        + ' Скилл: '
                        + ((parseInt(window.battles['total']['killed'].replace(/\s+/g,'')) + parseInt(window.battles['total']['total_assists'].replace(/\s+/g,'')) + parseInt(window.battles['total']['objects_destroyed'].replace(/\s+/g,'')) / 2) / parseInt(document.getElementsByClassName('b-speedometer-value')[0].textContent.replace(/\s+/g,''))
                        + parseFloat(document.getElementsByClassName('t-table-dotted')[0].childNodes[1].childNodes[2].childNodes[3].textContent.slice(document.getElementsByClassName('t-table-dotted')[0].childNodes[1].childNodes[2].childNodes[3].textContent.indexOf('(') + 1, document.getElementsByClassName('t-table-dotted')[0].childNodes[1].childNodes[2].childNodes[3].textContent.indexOf(')'))) / 200
                        + parseFloat(document.getElementsByClassName('t-table-dotted')[0].childNodes[1].childNodes[8].childNodes[3].textContent.slice(document.getElementsByClassName('t-table-dotted')[0].childNodes[1].childNodes[8].childNodes[3].textContent.indexOf('(') + 1, document.getElementsByClassName('t-table-dotted')[0].childNodes[1].childNodes[8].childNodes[3].textContent.indexOf(')'))) / 100
                        + parseInt(document.getElementsByClassName('t-table-dotted')[0].childNodes[1].childNodes[10].childNodes[3].textContent.replace(/\s+/g,'')) / 2500
                        + parseFloat(window.battles['average']['damage_dealt']) / 1000).toFixed(2)
                        + ' )</span>';
                return;
            }
        }
        var CSS = '#wowprWin { position: fixed; bottom: 10px; right: 10px; min-width: 170px; min-height: 50px; border: 1px solid #aaa; -webkit-box-shadow: 0 0 10px black; border-radius: 3px; background-color: rgba(0,0,0,0.6); z-index: 9999; color: #aaa; font-weight: bold; } .wowprHeader { text-align: center; font-weight: bold; padding: 5px; } .wowprHeader:hover { background-color: rgba(255,0,0,0.6); cursor: pointer; } #wowprShort { border-top: 1px solid #aaa; padding: 5px; text-align: center; } #wowprContent { border-top: 1px solid #aaa; } .wowprCloser { position: absolute; right: 0px; top: 0px; width: 22px; height: 22px; font: 24px/22px monospace; font-weight: bold; text-align: center; color: #aaa; } .wowprtable td { padding: 5px;} .wowprCloser:hover { color: red; cursor: default; }';
        var style = document.createElement('style');
        style.setAttribute("type", "text/css");
        var c = document.createTextNode(CSS);
        style.appendChild(c);
        document.body.appendChild(style);
        var wowprWin = document.createElement('div');
        wowprWin.id = 'wowprWin';
        var wowprHeader = document.createElement('div');
        wowprHeader.setAttribute('class', 'wowprHeader');
        wowprHeader.textContent = 'Статистика';
        wowprHeader.onclick = saveClick;
        wowprHeader.onmouseover = function() {
            this.textContent = 'Сохранить';
        };
        wowprHeader.onmouseout = function() {
            this.textContent = 'Статистика';
        };
        wowprWin.appendChild(wowprHeader);
        var wowprCloser = document.createElement('div');
        wowprCloser.className = 'wowprCloser';
        wowprCloser.innerHTML = '&#215;';
        wowprCloser.onclick = closeClick;
        wowprWin.appendChild(wowprCloser);
        var wowprShort = document.createElement('div');
        wowprShort.id = 'wowprShort';
        wowprShort.innerHTML = 'нет данных';
        wowprWin.appendChild(wowprShort);
        var wowprContent = document.createElement('div');
        wowprContent.id = 'wowprContent';
        wowprContent.innerHTML = '<div style=\"padding: 5px;\">Кликни на \"Статистика\" чтобы сохранить данные</div>';
        wowprWin.appendChild(wowprContent);
        document.body.appendChild(wowprWin);
        fillData();
        function closeClick() {
            var wowprWin = document.getElementById('wowprWin');
            wowprWin.hidden = true;
        }
        function saveClick() {
            if (!document.cookie) {
                alert('браузер не поддерживает cookie или данная функция выключена');
                return;
            }
            var data = parsePage();
            var today = new Date();
            var month = today.getMonth() + 1;
            if (month < 10)
                month = '0' + month;
            var date = today.getDate() + '.' + month + '.' + today.getFullYear();
            var exp = today;
            exp.setTime(exp.getTime() + (1000 * 86400 * 365));
            for (var key in data)
                setCookie(key, data[key], exp);
            setCookie('date', date, exp);
        }
        function parsePage() {
            return {
                btls: parseInt(document.getElementsByClassName('b-speedometer-value')[0].textContent.replace(/\s+/g,'')),
                wins: parseInt(document.getElementsByClassName('t-table-dotted')[2].childNodes[1].childNodes[2].childNodes[3].textContent.replace(/\s+/g,'')),
                planes: parseInt(window.battles['total']['killed'].replace(/\s+/g,'')),
                help: parseInt(window.battles['total']['total_assists'].replace(/\s+/g,'')),
                planeEff: parseFloat(document.getElementsByClassName('b-speedometer-weight')[0].textContent.replace(/\s+/g,'')),
                objects: parseInt(window.battles['total']['objects_destroyed'].replace(/\s+/g,'')),
                sturmEff: parseFloat(document.getElementsByClassName('b-speedometer-weight')[1].textContent.replace(/\s+/g,'')),
                effFlyhigher: ((parseInt(window.battles['total']['killed'].replace(/\s+/g,'')) + parseInt(window.battles['total']['total_assists'].replace(/\s+/g,'')) + parseInt(window.battles['total']['objects_destroyed'].replace(/\s+/g,'')) / 2) / parseInt(document.getElementsByClassName('b-speedometer-value')[0].textContent.replace(/\s+/g,''))
                        + parseFloat(document.getElementsByClassName('t-table-dotted')[2].childNodes[1].childNodes[2].childNodes[3].textContent.slice(document.getElementsByClassName('t-table-dotted')[2].childNodes[1].childNodes[2].childNodes[3].textContent.indexOf('(') + 1, document.getElementsByClassName('t-table-dotted')[2].childNodes[1].childNodes[2].childNodes[3].textContent.indexOf(')'))) / 200
                        + parseFloat(document.getElementsByClassName('t-table-dotted')[2].childNodes[1].childNodes[8].childNodes[3].textContent.slice(document.getElementsByClassName('t-table-dotted')[2].childNodes[1].childNodes[8].childNodes[3].textContent.indexOf('(') + 1, document.getElementsByClassName('t-table-dotted')[2].childNodes[1].childNodes[8].childNodes[3].textContent.indexOf(')'))) / 100
                        + parseInt(document.getElementsByClassName('t-table-dotted')[2].childNodes[1].childNodes[10].childNodes[3].textContent.replace(/\s+/g,'')) / 2500
                        + parseFloat(window.battles['average']['damage_dealt'].replace(/\s+/g,'')) / 1000).toFixed(2)
            };
        }
        function fillData() {
            if (!getCookie('date'))
                return;
            var wowprContent = document.getElementById('wowprContent');
            var wowprShort = document.getElementById('wowprShort');
            wowprShort.innerHTML = getCookie('date');
            var data = parsePage();
            var btls = data['btls'] - getCookie('btls');
            var wins = data['wins'] - getCookie('wins');
            var perWin = (btls) ? Math.round((wins * 100 / btls), 2) : 0;
            var planes = data['planes'] - getCookie('planes');
            var help = data['help'] - getCookie('help');
            var planeEff = (data['planeEff'] - getCookie('planeEff')).toFixed(2);
            var objects = data['objects'] - getCookie('objects');
            var sturmEff = (data['sturmEff'] - getCookie('sturmEff')).toFixed(2);
            var effFlyhigher = (data['effFlyhigher'] - getCookie('effFlyhigher')).toFixed(2);
            
            wowprContent.innerHTML = '<table class=\"wowprtable\">'
                    + '<tr><td>Боёв:</td><td>' + btls + '</td>' + '<td>Побед:</td><td>' + wins + ' (<span' + stylePer(perWin) + perWin + '%</span>)</td></tr>'
                    + '<tr><td>Сбито:</td><td>' + planes + '</td>' + '<td>Помощь:</td><td>' + help + '</td></tr>'
                    + '<tr><td>Объектов:</td><td>' + objects + '</td><td>Скилл:</td><td>' + data['effFlyhigher'] + ' (<span' + style(effFlyhigher) + effFlyhigher + '</span>)</td></tr>'
                    + '<tr><td>Ун./уб.:</td><td><span' + style(planeEff) + planeEff + '</span></td>' + '<td>Эф. шт.:</td><td><span' + style(sturmEff) + sturmEff + '</span></td></tr></table>';
            function style(val) {
                if (val == 0)
                    return '>';
                else if (val < 0)
                    return ' style=\"color: #F00;\">';
                else
                    return ' style=\"color: #0D0;\">+';
                return '>';
            }
            function stylePer(val) {
                if (val == 0)
                    return '>';
                else if (val < 50)
                    return ' style=\"color: #F00;\">';
                else
                    return ' style=\"color: #0D0;\">';
            }
        }
        function getCookie(name) {
            var cookie_name = name + "=";
            var cookie_length = document.cookie.length;
            var cookie_begin = 0;
            while (cookie_begin < cookie_length) {
                var value_begin = cookie_begin + cookie_name.length;
                if (document.cookie.substring(cookie_begin, value_begin) == cookie_name) {
                    var value_end = document.cookie.indexOf(";", value_begin);
                    if (value_end == -1) {
                        value_end = cookie_length;
                    }
                    return unescape(document.cookie.substring(value_begin, value_end));
                }
                cookie_begin = document.cookie.indexOf(" ", cookie_begin) + 1;
                if (cookie_begin == 0) {
                    break;
                }
            }
            return null;
        }
        function setCookie(name, value, expires) {
            if (!expires) {
                expires = new Date();
            }
            document.cookie = name + "=" + escape(value) + "; expires=" + expires.toGMTString() + "; path=/";
        }
    }
    function contentEval(source) {
        if ('function' == typeof source) {
            source = '(' + source + ')();'
        }
        var script = document.createElement('script');
        script.setAttribute("type", "application/javascript");
        script.textContent = source;
        document.body.appendChild(script);
        document.body.removeChild(script);
    }
}