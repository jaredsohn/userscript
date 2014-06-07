// ==UserScript==
// @name 		User Interface Script (Big Release World)
// @namespace 	http://wofh.ru/
// @author      http://code.google.com/p/wofh-ui-user-js/people/list
// @version     1.4.1
// @include     http://w*.wofh.ru/*
// ==/UserScript==


String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
}

Date.prototype.format = function(str) {
    // yyyy.mm.dd hh:nn:ss
    return str.split('yyyy').join(this.getFullYear()).split('mm').join(LZ(this.getMonth() + 1)).split('dd').join(LZ(this.getDate())).split('hh').join(LZ(this.getHours())).split('nn').join(LZ(this.getMinutes())).split('ss').join(LZ(this.getSeconds()));
}

Date.prototype.formatTime = function() {
    // HH:MM:SS
    return LZ(this.getUTCHours() + (this.getUTCDate() - 1) * 24) + ":" + LZ(this.getUTCMinutes()) + ":" + LZ(this.getUTCSeconds());
}

Math.randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function _setValue(key, value) {
    window.localStorage.setItem(key + '_' + playerName + '_' + currentHost, value);
}

function _getValue(key, defaultValue) {
    var itm = window.localStorage.getItem(key + '_' + playerName + '_' + currentHost);
    return itm != null ? itm == 'false' ? false : itm : defaultValue;
}

function _serialize(obj) {
    return (obj.toSource) ? obj.toSource() : JSON.stringify(obj);
}

function _deserialize(str) {
    return eval('(' + str + ')');
}

// Отладка
var debug = true;

function _log(text) {
    if (!debug) return;
    console.log(text);
}

function $q(element) {
    if (arguments.length > 1) {
        for (var i = 0, elements = [], length = arguments.length; i < length; i++)
            elements.push($q(arguments[i]));
        return elements;
    }
    if (typeof element == 'string')
        element = document.getElementById(element);
    return element;
}

// одно expression --> в 1 или более элементов
function $x(expression, parent) {
    var results = [];
    var query = document.evaluate(expression, $q(parent) || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0, length = query.snapshotLength; i < length; i++)
        results.push(query.snapshotItem(i));
    return results;
}

// создание элемента
function $e(tag, content, attributes, style, parent) {

    var result = document.createElement(tag);
    if (content)
        result.innerHTML = content;

    if (attributes)
        for (var a in attributes)
            result.setAttribute(a, attributes[a]);

    if (style)
        for (var a in style)
            result.style[a] = style[a];

    if (parent) {
        parent = $q(parent) || document;
        parent.appendChild(result);
    }
    return result;
}

function $t(text) {
    return document.createTextNode(text);
}

function $n(element) {
    if (arguments.length > 1) {
        for (var i = 0, elements = [], length = arguments.length; i < length; i++)
            elements.push($n(arguments[i]));
        return elements;
    }
    if (typeof element == 'string')
        element = document.getElementsByName(element)[0];
    return element;
}

function LZ(n) {
    return (n > 9 ? n : '0' + n);
}

function isInt(x) {
    var y = parseInt(x);
    if (isNaN(y)) return false;
    return x == y && x.toString() == y.toString();
}

function _addStyle(css) {
    var NSURI = 'http://www.w3.org/1999/xhtml';
    var hashead = document.getElementsByTagName('head')[0];
    var parentel = hashead || document.documentElement;
    var newElement = document.createElementNS(NSURI, 'link');
    newElement.setAttributeNS(NSURI, 'rel', 'stylesheet');
    newElement.setAttributeNS(NSURI, 'type', 'text/css');
    newElement.setAttributeNS(NSURI, 'href', 'data:text/css,' + encodeURIComponent(css));
    if (hashead) {
        parentel.appendChild(newElement);
    } else {
        parentel.insertBefore(newElement, parentel.firstChild);
    }
}

function __addStyle(cssStyle) {
    try {
        GM_addStyle(cssStyle);
    } catch (e) {
        _addStyle(cssStyle);
    }
}

var isMinMenu = false;
var playerName = '';
var currentHost = '';

/* Идея.
 Есть несколько панелек с однотипным видом и поведением.
 Div-контейнер с заголовком и кнопкой, по щелчку по которой сворачивается/разворачивается контент
 Меняется текст заголовка и цвет фона заголовка
 Меняется контент
 Сохраняются положение (left, top) контейнера и видимость контента

 Описатель панели (Pane)
 {
 pane: { id: 'pane', left: '10px', top: '10px' },
 title: { id: 'panetitle', },
 button: { id: 'panebutton', image: '' },
 caption: { id: 'panecaption', text: '', bkcolor: '' },
 content: { id: 'panecontent', visible: false, text: '' }
 }/**/

/* массив используемых картинок
 0 - кнопка панелек
 1 - pause, png
 2 - play, png
 3 - del, png
 4 - city1, gif, желтый
 5 - красный
 6 - синий
 7 - зелёный
 8 - салатовый
 9 - белый
 10 - фиолетовый /**/

var imageList = [
    "data:image/gif;base64,R0lGODlhFAAUAHcAACH5BAEAAAAALAAAAAAUABQApwEAANDt/+X1//T7/+j2/8fq//X7/9zy/////+34/9Pu/8jq//r9/wI0jNvx/9Lu/0u48snq/8To/7/m/9vy/9zx/+35/6Hb/8Pp/+T1//v9/x9otMPo/z2e3k6w67Tj/8Ho//f8/0u58nC+8MXR5b7n/7zm/7Xk/8za62fB9yV1voPO+iFst/T6/8nr/zOO0UOq5zFiqZXN8wg/lPDz+LXg/H/L+brl/6rf/6nQ7iVcpwk8kqXd/3Wl1b/j+5au0mOIv4GgzT6i4Wqy5muz5keg3Uep5q/X9B9QnihWn3iVw5at0gtFmSlWoBZXpQtGmRZWpR9RnjNmrEep5bnZ89jr+a/O6iZ1vnWm1TmX2TKM0Lja8y6Fykaf3cvk96re/27G+7Xj/6vf/7Xi/5fX/y+Fyyp9xSyBx6Da/yp9xEyy7Uuz7Uq07+X2/8Tp/0Or6N3y/1/A9vH5/kaw7Eaw63XL/r/k+8Lo/8Ln/3bL/pbY/7jk/7nk/8Hn/77m//r+/1+/9h5ptB9ptZGz2MjZ7RxjsR9ptBxksHmVw8jZ7B5otZi43NPv/7/n/0+38Uq1727H+1C38TVxtjNssZGy2DZxtjt4uwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAj/AAEIHAhABASDECAQXDjwkaM4kPLUAQMoEhuGAumsScFjQYYQITIs4JFCzZyFMDys4DDAgMuXAzis8ACDoBEbNwjoJPBmp84bNqYM7DCCTAAKDpAKSeogaQA9IzoI7HLhwoIAWANkyYq1AJoLRQC8GIJDDJ8CaAtoQbtgQYE9OL4QeVFGxpgPJ0xgwCDhDAY3EiSYOPEhjAwuZmpMmNDIDwg8d1RI4ACiT4nFJWqkuWLHRVsXESIcMbShtCJBgUL7UMEix4MHChgpoGJpiwLYt3PnYFEIy4EKB+B4mWTlwG/gwI33OARAkoDnVaQsev48QxvqAioJdELJQgIgQSyITE9AvnyCQVAG6khkQM6A9y3ewzdASAdBJjFQaGCw/89+BgCiEMMTC80QxQ8IJKhggksgMQNGAOyQBCIk0EADCUo0sQOEBDXg4YcYBQQAOw==",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJjSURBVDjLpZNLbxJhFIb7A/wF/A5YunTDzuqmO+PdsDFx0dSVpJq4aIyQmUIU06a1gUqCJlXb1Ehb6QhiGgsdKFNAwAIOhWEcBobLUI5zPpgRLzsneRfz5bzPec93mQCAiXGdc4FJk0WTVdPUSNbRmunP+nHjGU3muy8lW+DjMR3ZTzMHiUMhziaF3b0U82InR0/76zaswdrfACPzWV+obI8fZjm+JoGs9EA9HRA1Wl0oVeoQ3mO5hc2sHWt1iA4wo5lNfZXbHRXwU7p9qMs9EDQ1O32yJitd2I3GZM/6EULMBIBzYWzsrJurUhcqP7rAi0OVxQ6U6h0DsrkV5m6v8DiOCQGWAPONxti6+eKDENxyJw3z5OwOXHclSBr8UrnvQPkjNHoRYA1/OWJwZoyKpgv3EZAgXYtCWwNsE0Ct0QOppcKJqMDi6msGvQiYih0kBNwsLEAAdryhAY5rbaJJ+zZcm2dJOvzvqqew4l0V0EsA+3GWALAAu+qRsbhQbcP5e0G4Sg8B+C+1erC49NwAWD98TjKi3IGGog47ksgs5E8UyFUUDfCeAHBj8WTSRREoj9cYweINZuhCqQaDAZAOGBeV5RUiNF+mWDJerz+ArU9JsLvfGptouuOr2oKhKCdIbeMkdKXLLeM40ZzRujufLHNX3OnhMeoXiXoVt6+9C8l8vUmSiE2VpMEx8PjQnC7WweHxyTPU+q+LNH6V57xR+7J/jYvEMlDgJbInOHMyL8BGKA5z1AI37Xzz91Uef0w3n+Vts0836EeuJYaadwuPnbTw0OFhZhwB+hKd+vdj+p/n/BMZPwxzcSL1lgAAAABJRU5ErkJggg==",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJfSURBVDjLpZNNbxJRFIb7A/wF/A5YunTDrpouujNxY8LGxEVTVyU11UVjCmEsUUyb1gYqEWuqtqmRWukUimksH6UMHwIW6FCYwWFgYBjKcc6FGam68ybvZuY87/m4544BwNiobiyCQZVJlVnV5FDm4TfDn/Gj4DVVxgdvBIvv4IwKHafp2MkpF40nuP2jJP1qL0dNeXkLxmDsFYMhfN0TKFujp1mGrQkgSl1QLvtEjZYMpQoPwaM4s7STtWKsZqIZGBGOJ7+L7Y4CeCS5B7zYBU5Vs9Mj30RJhv1wRHRtpdDESAywLywbM2twVZCh8lOGt+EKsHUZyvUOlPiObrKzG2TurbHYjgENTD76B4Vlj8II3noYgI3DCoHPam0iPMncOTi8IQpZNDAHv6Vo7BlLRVDLenN2j+h1iCVwodoGoaXARV2C5fV3NLJoMBmJnXA4rFqjS2DMWOTaKvyZaOJRCPwxDnIViRjJyiWsudc5ZInBcTRODLB8DcZAAs8dwPiMn/zLstKwii4sr7zUDcxfviboutiBhqTovWLgxBx9Bc6ct8jNpIt1cLjcegsmtz9DFUo16PeBgPkLiZQ7PvOJwAimyy1IlVrQ7fVh9zABVucHfYiG+56qxR8IM5wwmDJmQyGsgclSkyTIqNntz1aZO8704Bq1RXJsRK2bHwMiyw8C601FrwaXCTOnizzYXB5x2rH1e5FGV3neHbauejeZUCQDBVYgM8GeE3kOtgNRmHcsMVP293+v8uhjuvsib5l9vk09WVyhHU+d3IKd4h7bXPS0zUfdppL/fkz/85x/AR14FVfMwp4lAAAAAElFTkSuQmCC",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg==",

    "data:image/gif;base64,R0lGODlhAgACAPcAAP/YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAAgACAAAIBgABCAQQEAA7",
    "data:image/gif;base64,R0lGODlhAgACAPcAAP8A3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAAgACAAAIBgABCAQQEAA7",
    "data:image/gif;base64,R0lGODlhAgACAPcAAAAm/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAAgACAAAIBgABCAQQEAA7",
    "data:image/gif;base64,R0lGODlhAgACAPcAAAD/IQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAAgACAAAIBgABCAQQEAA7",
    "data:image/gif;base64,R0lGODlhAgACAPcAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAAgACAAAIBgABCAQQEAA7",
    "data:image/gif;base64,R0lGODlhAgACAPcAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAAgACAAAIBgABCAQQEAA7",
    "data:image/gif;base64,R0lGODlhAgACAPcAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAAgACAAAIBgABCAQQEAA7"
];
var unitSpeedHolder = eval('({0: 4, 1: 4, 2: 5, 3: 5, 4: 6, 5: 3, 6: 7, 7: 9, 8: 4, 9: 8, 10: 10, 11: 6, 12: 4, 13: 7, 14: 12, 15: 8, 16: 7, 17: 6, 18: 3, 19: 11, 20: 5, 21: 4, 22: 6, 23: 5, 24: 9, 25: 5, 26: 6, 27: 10, 28: 6, 29: 5, 30: 4, 31: 12, 32: 7, 33: 7, 34: 7, 35: 7, 36: 5, 37: 5, 38: 4, 39: 3, 40: 5, 41: 2, 42: 2, 43: 1, 44: 2, 45: 2, 46: 2, 47: 7, 48: 6, 49: 7, 50: 7, 51: 8, 52: 7, 53: 9, 54: 8, 55: 8, 56: 1, 57: 4, 58: 7, 59: 13, 60: 1, 61: 1, 62: 1, 63: 1, 64: 1, 65: 1, 66: 9, 67: 9, 68: 11, 69: 10, 70: 7, 71: 10, 72: 9, 73: 11, 74: 5, 75: 6, 76: 7, 77: 8, 78: 5, 79: 6, 80: 5, 81: 3, 82: 11, 83: 9, 84: 10, 85: 2, 86: 10, 87: 7, 88: 12, 89: 15, 90: 12, 91: 13, 92: 1, 93: 7, 94: 20, 95: 16, 96: 6, 97: 6, 98: 6, 99: 6})');
var buildInfoHolder = eval('({\
0: {1: {time:\'0:03:00\', cost:{2:25, 3:40}, price:0, effect:\'8\', spad:0.2}, 2: {time:\'0:07:55\', cost:{2:34, 3:52}, price:0, effect:\'17\', spad:0.4}, 3: {time:\'0:13:57\', cost:{2:45, 3:69}, price:0, effect:\'28\', spad:0.6}, 4: {time:\'0:20:53\', cost:{2:60, 3:89}, price:0, effect:\'39\', spad:0.8}, 5: {time:\'0:28:33\', cost:{2:75, 3:111}, price:0, effect:\'50\', spad:1.0}, 6: {time:\'0:36:51\', cost:{2:93, 3:135}, price:0, effect:\'62\', spad:1.2}, 7: {time:\'0:45:44\', cost:{2:112, 3:162}, price:0, effect:\'74\', spad:1.4}, 8: {time:\'0:55:08\', cost:{2:133, 3:191}, price:0, effect:\'87\', spad:1.6}, 9: {time:\'1:05:01\', cost:{2:155, 3:222}, price:0, effect:\'100\', spad:1.8}, 10: {time:\'1:15:21\', cost:{2:178, 3:254}, price:0, effect:\'113\', spad:2.0}, 11: {time:\'1:26:06\', cost:{2:202, 3:288}, price:0, effect:\'126\', spad:2.2}, 12: {time:\'1:37:16\', cost:{2:227, 3:323}, price:0, effect:\'139\', spad:2.4}, 13: {time:\'1:48:48\', cost:{2:254, 3:361}, price:0, effect:\'152\', spad:2.6}, 14: {time:\'2:00:41\', cost:{2:281, 3:399}, price:0, effect:\'166\', spad:2.8}, 15: {time:\'2:12:56\', cost:{2:310, 3:439}, price:0, effect:\'180\', spad:3.0}, 16: {time:\'2:25:30\', cost:{2:340, 3:481}, price:0, effect:\'194\', spad:3.2}, 17: {time:\'2:38:23\', cost:{2:370, 3:523, 6:10}, price:0, effect:\'208\', spad:3.4}, 18: {time:\'2:51:35\', cost:{2:401, 3:567, 6:60}, price:0, effect:\'222\', spad:3.6}, 19: {time:\'3:05:05\', cost:{2:434, 3:612, 6:112}, price:0, effect:\'236\', spad:3.8}, 20: {time:\'3:18:52\', cost:{2:467, 3:659, 6:165}, price:0, effect:\'250\', spad:4.0}}, \
1: {1: {time:\'0:04:12\', cost:{2:20, 3:70}, price:0, effect:\'100%\', spad:0.0}, 2: {time:\'0:11:52\', cost:{2:26, 3:82}, price:0, effect:\'119%\', spad:0.0}, 3: {time:\'0:21:49\', cost:{2:32, 3:95}, price:0, effect:\'143%\', spad:0.0}, 4: {time:\'0:33:36\', cost:{2:39, 3:109}, price:0, effect:\'172%\', spad:0.0}, 5: {time:\'0:46:57\', cost:{2:46, 3:123}, price:0, effect:\'205%\', spad:0.0}, 6: {time:\'1:01:43\', cost:{2:54, 3:138}, price:0, effect:\'242%\', spad:0.0}, 7: {time:\'1:17:47\', cost:{2:61, 3:153}, price:0, effect:\'282%\', spad:0.0}, 8: {time:\'1:35:02\', cost:{2:69, 3:169}, price:0, effect:\'324%\', spad:0.0}, 9: {time:\'1:53:23\', cost:{2:77, 3:185}, price:0, effect:\'370%\', spad:0.0}, 10: {time:\'2:12:48\', cost:{2:85, 3:201}, price:0, effect:\'418%\', spad:0.0}, 11: {time:\'2:33:13\', cost:{2:93, 3:217}, price:0, effect:\'469%\', spad:0.0}, 12: {time:\'2:54:35\', cost:{2:102, 3:234}, price:0, effect:\'521%\', spad:0.0}, 13: {time:\'3:16:51\', cost:{2:110, 3:251}, price:0, effect:\'577%\', spad:0.0}, 14: {time:\'3:40:00\', cost:{2:118, 3:267}, price:0, effect:\'634%\', spad:0.0}, 15: {time:\'4:03:59\', cost:{2:127, 3:285}, price:0, effect:\'693%\', spad:0.0}, 16: {time:\'4:28:48\', cost:{2:136, 3:302}, price:0, effect:\'755%\', spad:0.0}, 17: {time:\'4:54:23\', cost:{2:145, 3:320}, price:0, effect:\'818%\', spad:0.0}, 18: {time:\'5:20:44\', cost:{2:153, 3:337}, price:0, effect:\'883%\', spad:0.0}, 19: {time:\'5:47:50\', cost:{2:162, 3:355}, price:0, effect:\'950%\', spad:0.0}, 20: {time:\'6:15:39\', cost:{2:171, 3:373}, price:0, effect:\'1019%\', spad:0.0}}, \
2: {1: {time:\'0:04:47\', cost:{2:30, 3:55}, price:0, effect:\'38\', spad:0.0}, 2: {time:\'0:07:45\', cost:{2:34, 3:64}, price:0, effect:\'72\', spad:0.0}, 3: {time:\'0:11:22\', cost:{2:42, 3:79}, price:0, effect:\'125\', spad:0.0}, 4: {time:\'0:15:32\', cost:{2:52, 3:99}, price:0, effect:\'193\', spad:0.0}, 5: {time:\'0:20:07\', cost:{2:64, 3:123}, price:0, effect:\'277\', spad:0.0}, 6: {time:\'0:25:06\', cost:{2:78, 3:151}, price:0, effect:\'376\', spad:0.0}, 7: {time:\'0:30:26\', cost:{2:94, 3:183}, price:0, effect:\'488\', spad:0.0}, 8: {time:\'0:36:04\', cost:{2:112, 3:219}, price:0, effect:\'615\', spad:0.0}, 9: {time:\'0:42:00\', cost:{2:132, 3:259}, price:0, effect:\'754\', spad:0.0}, 10: {time:\'0:48:12\', cost:{2:154, 3:303}, price:0, effect:\'907\', spad:0.0}, 11: {time:\'0:54:40\', cost:{2:177, 3:350}, price:0, effect:\'1072\', spad:0.0}, 12: {time:\'1:01:21\', cost:{2:203, 3:401}, price:0, effect:\'1250\', spad:0.0}, 13: {time:\'1:08:16\', cost:{2:230, 3:455}, price:0, effect:\'1440\', spad:0.0}, 14: {time:\'1:15:25\', cost:{2:259, 3:513}, price:0, effect:\'1642\', spad:0.0}, 15: {time:\'1:22:45\', cost:{2:289, 3:574}, price:0, effect:\'1856\', spad:0.0}, 16: {time:\'1:30:18\', cost:{2:322, 3:639}, price:0, effect:\'2082\', spad:0.0}, 17: {time:\'1:38:02\', cost:{2:355, 3:706}, price:0, effect:\'2319\', spad:0.0}, 18: {time:\'1:45:57\', cost:{2:391, 3:778}, price:0, effect:\'2568\', spad:0.0}, 19: {time:\'1:54:03\', cost:{2:428, 3:852}, price:0, effect:\'2828\', spad:0.0}, 20: {time:\'2:02:19\', cost:{2:467, 3:929}, price:0, effect:\'3100\', spad:0.0}}, \
3: {1: {time:\'0:38:59\', cost:{2:30, 3:70}, price:0, effect:\'2\', spad:0.0}, 2: {time:\'0:49:58\', cost:{2:42, 3:89}, price:0, effect:\'3\', spad:0.0}, 3: {time:\'1:01:50\', cost:{2:57, 3:111}, price:0, effect:\'4\', spad:0.0}, 4: {time:\'1:14:19\', cost:{2:72, 3:134}, price:0, effect:\'5\', spad:0.0}, 5: {time:\'1:27:17\', cost:{2:88, 3:158}, price:0, effect:\'6\', spad:0.0}, 6: {time:\'1:40:39\', cost:{2:105, 3:183}, price:0, effect:\'7\', spad:0.0}, 7: {time:\'1:54:21\', cost:{2:123, 3:209}, price:0, effect:\'8\', spad:0.0}, 8: {time:\'2:08:21\', cost:{2:141, 3:236}, price:0, effect:\'9\', spad:0.0}, 9: {time:\'2:22:37\', cost:{2:159, 3:264}, price:0, effect:\'10\', spad:0.0}, 10: {time:\'2:37:07\', cost:{2:178, 3:292}, price:0, effect:\'11\', spad:0.0}, 11: {time:\'2:51:51\', cost:{2:197, 3:321}, price:0, effect:\'12\', spad:0.0}, 12: {time:\'3:06:47\', cost:{2:217, 3:350}, price:0, effect:\'13\', spad:0.0}, 13: {time:\'3:21:54\', cost:{2:237, 3:380}, price:0, effect:\'14\', spad:0.0}, 14: {time:\'3:37:11\', cost:{2:257, 3:410}, price:0, effect:\'15\', spad:0.0}, 15: {time:\'3:52:39\', cost:{2:277, 3:441}, price:0, effect:\'16\', spad:0.0}, 16: {time:\'4:08:15\', cost:{2:298, 3:472}, price:0, effect:\'17\', spad:0.0}, 17: {time:\'4:24:01\', cost:{2:319, 3:504}, price:0, effect:\'18\', spad:0.0}, 18: {time:\'4:39:55\', cost:{2:340, 3:536}, price:0, effect:\'19\', spad:0.0}, 19: {time:\'4:55:57\', cost:{2:362, 3:568}, price:0, effect:\'20\', spad:0.0}, 20: {time:\'5:12:06\', cost:{2:384, 3:601}, price:0, effect:\'21\', spad:0.0}}, \
4: {1: {time:\'1:45:35\', cost:{2:450, 3:250}, price:0, effect:\'2.0\', spad:0.0}, 2: {time:\'1:51:30\', cost:{2:548, 3:299}, price:0, effect:\'4.0\', spad:0.0}, 3: {time:\'1:58:45\', cost:{2:669, 3:359}, price:0, effect:\'6.0\', spad:0.0}, 4: {time:\'2:07:04\', cost:{2:807, 3:428}, price:0, effect:\'8.0\', spad:0.0}, 5: {time:\'2:16:15\', cost:{2:961, 3:505, 6:16}, price:0, effect:\'10.0\', spad:0.0}, 6: {time:\'2:26:13\', cost:{2:1127, 3:588, 6:36}, price:0, effect:\'12.0\', spad:0.0}, 7: {time:\'2:36:52\', cost:{2:1304, 3:677, 6:56}, price:0, effect:\'14.0\', spad:0.0}, 8: {time:\'2:48:09\', cost:{2:1492, 3:771, 6:78}, price:0, effect:\'16.0\', spad:0.0}, 9: {time:\'3:00:01\', cost:{2:1690, 3:870, 6:101}, price:0, effect:\'18.0\', spad:0.0}, 10: {time:\'3:12:25\', cost:{2:1897, 3:973, 4:40, 6:125}, price:0, effect:\'20.0\', spad:0.0}, 11: {time:\'3:25:20\', cost:{2:2112, 3:1081, 4:83, 6:150}, price:0, effect:\'22.0\', spad:0.0}, 12: {time:\'3:38:43\', cost:{2:2335, 3:1192, 4:128, 6:176}, price:0, effect:\'24.0\', spad:0.0}, 13: {time:\'3:52:33\', cost:{2:2566, 3:1308, 4:174, 6:203}, price:0, effect:\'26.0\', spad:0.0}, 14: {time:\'4:06:50\', cost:{2:2803, 3:1426, 4:221, 6:231}, price:0, effect:\'28.0\', spad:0.0}, 15: {time:\'4:21:31\', cost:{2:3048, 3:1549, 4:270, 6:260}, price:0, effect:\'30.0\', spad:0.0}, 16: {time:\'4:36:36\', cost:{2:3300, 3:1675, 4:321, 6:289}, price:0, effect:\'32.0\', spad:0.0}, 17: {time:\'4:52:04\', cost:{2:3557, 3:1803, 4:372, 6:319}, price:0, effect:\'34.0\', spad:0.0}, 18: {time:\'5:07:54\', cost:{2:3821, 3:1935, 4:425, 6:350}, price:0, effect:\'36.0\', spad:0.0}, 19: {time:\'5:24:06\', cost:{2:4091, 3:2070, 4:479, 6:381}, price:0, effect:\'38.0\', spad:0.0}, 20: {time:\'5:40:38\', cost:{2:4367, 3:2208, 4:534, 6:414}, price:0, effect:\'40.0\', spad:0.0}}, \
5: {1: {time:\'1:45:00\', cost:{2:190, 3:75}, price:0, effect:\'10%\', spad:0.5}, 2: {time:\'2:15:28\', cost:{2:413, 3:231}, price:0, effect:\'20%\', spad:1.2}, 3: {time:\'2:56:59\', cost:{2:877, 3:556}, price:0, effect:\'30%\', spad:2.1}, 4: {time:\'3:47:50\', cost:{2:1632, 3:1084}, price:0, effect:\'40%\', spad:3.0}, 5: {time:\'4:46:59\', cost:{2:2718, 3:1845}, price:0, effect:\'50%\', spad:4.1}, 6: {time:\'5:53:42\', cost:{2:4171, 3:2861}, price:0, effect:\'60%\', spad:5.1}, 7: {time:\'7:07:28\', cost:{2:6021, 3:4156}, price:0, effect:\'70%\', spad:6.3}, 8: {time:\'8:27:51\', cost:{2:8297, 3:5750}, price:0, effect:\'80%\', spad:7.5}, 9: {time:\'9:54:31\', cost:{2:11025, 3:7660}, price:0, effect:\'90%\', spad:8.7}, 10: {time:\'11:27:09\', cost:{2:14231, 3:9904}, price:0, effect:\'100%\', spad:10.0}, 11: {time:\'13:05:32\', cost:{2:17938, 3:12498}, price:0, effect:\'110%\', spad:11.3}, 12: {time:\'14:49:25\', cost:{2:22167, 3:15459}, price:0, effect:\'120%\', spad:12.6}, 13: {time:\'16:38:39\', cost:{2:26939, 3:18799}, price:0, effect:\'130%\', spad:14.0}, 14: {time:\'18:33:02\', cost:{2:32275, 3:22534}, price:0, effect:\'140%\', spad:15.5}, 15: {time:\'20:32:27\', cost:{2:38193, 3:26677}, price:0, effect:\'150%\', spad:16.9}, 16: {time:\'22:36:43\', cost:{2:44712, 3:31240}, price:0, effect:\'160%\', spad:18.4}, 17: {time:\'24:45:45\', cost:{2:51849, 3:36236}, price:0, effect:\'170%\', spad:19.9}, 18: {time:\'26:59:25\', cost:{2:59622, 3:41677}, price:0, effect:\'180%\', spad:21.4}, 19: {time:\'29:17:37\', cost:{2:68047, 3:47575}, price:0, effect:\'190%\', spad:23.0}, 20: {time:\'31:40:15\', cost:{2:77140, 3:53940}, price:0, effect:\'200%\', spad:24.6}}, \
6: {1: {time:\'1:45:00\', cost:{2:75, 3:190}, price:0, effect:\'10%\', spad:0.5}, 2: {time:\'2:15:28\', cost:{2:231, 3:413}, price:0, effect:\'20%\', spad:1.2}, 3: {time:\'2:56:59\', cost:{2:556, 3:877}, price:0, effect:\'30%\', spad:2.1}, 4: {time:\'3:47:50\', cost:{2:1084, 3:1632}, price:0, effect:\'40%\', spad:3.0}, 5: {time:\'4:46:59\', cost:{2:1845, 3:2718}, price:0, effect:\'50%\', spad:4.1}, 6: {time:\'5:53:42\', cost:{2:2861, 3:4171}, price:0, effect:\'60%\', spad:5.1}, 7: {time:\'7:07:28\', cost:{2:4156, 3:6021}, price:0, effect:\'70%\', spad:6.3}, 8: {time:\'8:27:51\', cost:{2:5750, 3:8297}, price:0, effect:\'80%\', spad:7.5}, 9: {time:\'9:54:31\', cost:{2:7660, 3:11025}, price:0, effect:\'90%\', spad:8.7}, 10: {time:\'11:27:09\', cost:{2:9904, 3:14231}, price:0, effect:\'100%\', spad:10.0}, 11: {time:\'13:05:32\', cost:{2:12498, 3:17938}, price:0, effect:\'110%\', spad:11.3}, 12: {time:\'14:49:25\', cost:{2:15459, 3:22167}, price:0, effect:\'120%\', spad:12.6}, 13: {time:\'16:38:39\', cost:{2:18799, 3:26939}, price:0, effect:\'130%\', spad:14.0}, 14: {time:\'18:33:02\', cost:{2:22534, 3:32275}, price:0, effect:\'140%\', spad:15.5}, 15: {time:\'20:32:27\', cost:{2:26677, 3:38193}, price:0, effect:\'150%\', spad:16.9}, 16: {time:\'22:36:43\', cost:{2:31240, 3:44712}, price:0, effect:\'160%\', spad:18.4}, 17: {time:\'24:45:45\', cost:{2:36236, 3:51849}, price:0, effect:\'170%\', spad:19.9}, 18: {time:\'26:59:25\', cost:{2:41677, 3:59622}, price:0, effect:\'180%\', spad:21.4}, 19: {time:\'29:17:37\', cost:{2:47575, 3:68047}, price:0, effect:\'190%\', spad:23.0}, 20: {time:\'31:40:15\', cost:{2:53940, 3:77140}, price:0, effect:\'200%\', spad:24.6}}, \
7: {1: {time:\'3:15:00\', cost:{2:450, 3:575, 4:140}, price:0, effect:\'100%\', spad:0.0}, 2: {time:\'3:30:00\', cost:{2:574, 3:761, 4:239}, price:0, effect:\'119%\', spad:0.0}, 3: {time:\'3:45:00\', cost:{2:761, 3:1041, 4:388}, price:0, effect:\'143%\', spad:0.0}, 4: {time:\'4:00:00\', cost:{2:1006, 3:1409, 4:585}, price:0, effect:\'172%\', spad:0.0}, 5: {time:\'4:15:00\', cost:{2:1305, 3:1858, 4:824}, price:0, effect:\'205%\', spad:0.0}, 6: {time:\'4:30:00\', cost:{2:1657, 3:2386, 4:1106}, price:0, effect:\'242%\', spad:0.0}, 7: {time:\'4:45:00\', cost:{2:2060, 3:2990, 4:1428}, price:0, effect:\'282%\', spad:0.0}, 8: {time:\'5:00:00\', cost:{2:2511, 3:3666, 4:1788}, price:0, effect:\'324%\', spad:0.0}, 9: {time:\'5:15:00\', cost:{2:3009, 3:4414, 4:2187}, price:0, effect:\'370%\', spad:0.0}, 10: {time:\'5:30:00\', cost:{2:3554, 3:5232, 4:2623}, price:8, effect:\'418%\', spad:0.0}, 11: {time:\'5:45:00\', cost:{2:4145, 3:6117, 4:3096}, price:15, effect:\'469%\', spad:0.0}, 12: {time:\'6:00:00\', cost:{2:4780, 3:7070, 4:3604}, price:23, effect:\'521%\', spad:0.0}, 13: {time:\'6:15:00\', cost:{2:5459, 3:8088, 4:4147}, price:30, effect:\'577%\', spad:0.0}, 14: {time:\'6:30:00\', cost:{2:6180, 3:9171, 4:4724}, price:37, effect:\'634%\', spad:0.0}, 15: {time:\'6:45:00\', cost:{2:6945, 3:10318, 4:5336}, price:43, effect:\'693%\', spad:0.0}, 16: {time:\'7:00:00\', cost:{2:7751, 3:11527, 4:5981}, price:50, effect:\'755%\', spad:0.0}, 17: {time:\'7:15:00\', cost:{2:8599, 3:12798, 4:6659}, price:56, effect:\'818%\', spad:0.0}, 18: {time:\'7:30:00\', cost:{2:9487, 3:14131, 4:7370}, price:62, effect:\'883%\', spad:0.0}, 19: {time:\'7:45:00\', cost:{2:10416, 3:15525, 4:8113}, price:67, effect:\'950%\', spad:0.0}, 20: {time:\'8:00:00\', cost:{2:11385, 3:16978, 4:8888}, price:73, effect:\'1019%\', spad:0.0}}, \
8: {1: {time:\'1:04:12\', cost:{2:300, 3:460}, price:0, effect:\'10\', spad:0.0}, 2: {time:\'1:11:52\', cost:{2:314, 3:514}, price:0, effect:\'21\', spad:0.0}, 3: {time:\'1:21:49\', cost:{2:333, 3:585, 6:15}, price:0, effect:\'34\', spad:0.0}, 4: {time:\'1:33:35\', cost:{2:356, 3:670, 6:38}, price:0, effect:\'47\', spad:0.0}, 5: {time:\'1:46:57\', cost:{2:381, 3:765, 6:63}, price:0, effect:\'60\', spad:0.0}, 6: {time:\'2:01:43\', cost:{2:409, 3:870, 6:91}, price:0, effect:\'74\', spad:0.0}, 7: {time:\'2:17:47\', cost:{2:440, 3:985, 6:122}, price:0, effect:\'88\', spad:0.0}, 8: {time:\'2:35:02\', cost:{2:473, 3:1108, 6:155}, price:0, effect:\'102\', spad:0.0}, 9: {time:\'2:53:24\', cost:{2:508, 3:1240, 6:190}, price:0, effect:\'117\', spad:0.0}, 10: {time:\'3:12:48\', cost:{2:544, 3:1378, 6:226}, price:0, effect:\'131\', spad:0.0}, 11: {time:\'3:33:13\', cost:{2:583, 3:1524, 6:265}, price:0, effect:\'146\', spad:0.0}, 12: {time:\'3:54:35\', cost:{2:624, 3:1677, 6:306}, price:0, effect:\'161\', spad:0.0}, 13: {time:\'4:16:51\', cost:{2:666, 3:1836, 6:348}, price:0, effect:\'176\', spad:0.0}, 14: {time:\'4:40:00\', cost:{2:711, 3:2001, 6:393}, price:0, effect:\'192\', spad:0.0}, 15: {time:\'5:03:59\', cost:{2:756, 3:2172, 6:438}, price:0, effect:\'207\', spad:0.0}, 16: {time:\'5:28:48\', cost:{2:804, 3:2350, 6:486}, price:0, effect:\'223\', spad:0.0}, 17: {time:\'5:54:23\', cost:{2:852, 3:2532, 6:534}, price:0, effect:\'238\', spad:0.0}, 18: {time:\'6:20:44\', cost:{2:902, 3:2721, 6:584}, price:0, effect:\'254\', spad:0.0}, 19: {time:\'6:47:50\', cost:{2:954, 3:2914, 6:636}, price:0, effect:\'270\', spad:0.0}, 20: {time:\'7:15:39\', cost:{2:1007, 3:3113, 6:689}, price:0, effect:\'286\', spad:0.0}}, \
9: {1: {time:\'5:30:00\', cost:{2:1000, 3:1000, 6:450}, price:0, effect:\'\', spad:0.0}, 2: {time:\'6:00:00\', cost:{2:1200, 3:1300, 6:600}, price:0, effect:\'\', spad:0.0}, 3: {time:\'6:30:00\', cost:{2:1400, 3:1600, 6:750}, price:0, effect:\'\', spad:0.0}, 4: {time:\'7:00:00\', cost:{2:1600, 3:1900, 6:900}, price:0, effect:\'\', spad:0.0}, 5: {time:\'7:30:00\', cost:{2:1800, 3:2200, 6:1050}, price:0, effect:\'\', spad:0.0}, 6: {time:\'8:00:00\', cost:{2:2000, 3:2500, 6:1200, 18:100}, price:0, effect:\'\', spad:0.0}, 7: {time:\'8:30:00\', cost:{2:2200, 3:2800, 6:1350, 18:200}, price:0, effect:\'\', spad:0.0}, 8: {time:\'9:00:00\', cost:{2:2400, 3:3100, 6:1500, 18:300}, price:0, effect:\'\', spad:0.0}, 9: {time:\'9:30:00\', cost:{2:2600, 3:3400, 6:1650, 18:400}, price:0, effect:\'\', spad:0.0}, 10: {time:\'10:00:00\', cost:{2:2800, 3:3700, 6:1800, 18:500}, price:0, effect:\'\', spad:0.0}, 11: {time:\'10:30:00\', cost:{2:3000, 3:4000, 6:1950, 18:600}, price:0, effect:\'\', spad:0.0}, 12: {time:\'11:00:00\', cost:{2:3200, 3:4300, 6:2100, 18:700}, price:0, effect:\'\', spad:0.0}, 13: {time:\'11:30:00\', cost:{2:3400, 3:4600, 6:2250, 18:800}, price:0, effect:\'\', spad:0.0}, 14: {time:\'12:00:00\', cost:{2:3600, 3:4900, 6:2400, 18:900}, price:0, effect:\'\', spad:0.0}, 15: {time:\'12:30:00\', cost:{2:3800, 3:5200, 6:2550, 18:1000}, price:0, effect:\'\', spad:0.0}, 16: {time:\'13:00:00\', cost:{2:4000, 3:5500, 6:2700, 18:1100}, price:0, effect:\'\', spad:0.0}, 17: {time:\'13:30:00\', cost:{2:4200, 3:5800, 6:2850, 18:1200}, price:0, effect:\'\', spad:0.0}, 18: {time:\'14:00:00\', cost:{2:4400, 3:6100, 6:3000, 18:1300}, price:0, effect:\'\', spad:0.0}, 19: {time:\'14:30:00\', cost:{2:4600, 3:6400, 6:3150, 18:1400}, price:0, effect:\'\', spad:0.0}, 20: {time:\'15:00:00\', cost:{2:4800, 3:6700, 6:3300, 18:1500}, price:0, effect:\'\', spad:0.0}}, \
10: {1: {time:\'2:17:59\', cost:{2:375, 3:200, 7:60}, price:0, effect:\'100%\', spad:0.0}, 2: {time:\'2:35:59\', cost:{2:561, 3:324, 7:109}, price:0, effect:\'119%\', spad:0.0}, 3: {time:\'2:54:00\', cost:{2:841, 3:511, 6:66, 7:184}, price:0, effect:\'143%\', spad:0.0}, 4: {time:\'3:12:00\', cost:{2:1209, 3:756, 4:53, 6:213, 7:282}, price:0, effect:\'172%\', spad:0.0}, 5: {time:\'3:30:00\', cost:{2:1658, 3:1055, 4:202, 6:393, 7:402}, price:0, effect:\'205%\', spad:0.0}, 6: {time:\'3:48:00\', cost:{2:2186, 3:1407, 4:378, 6:604, 7:543}, price:0, effect:\'242%\', spad:0.0}, 7: {time:\'4:05:59\', cost:{2:2790, 3:1810, 4:580, 6:846, 7:704}, price:0, effect:\'282%\', spad:0.0}, 8: {time:\'4:24:00\', cost:{2:3466, 3:2261, 4:805, 6:1116, 7:884}, price:0, effect:\'324%\', spad:0.0}, 9: {time:\'4:42:00\', cost:{2:4214, 3:2759, 4:1054, 6:1415, 7:1083}, price:0, effect:\'370%\', spad:0.0}, 10: {time:\'5:00:00\', cost:{2:5032, 3:3304, 4:1327, 6:1742, 7:1301}, price:0, effect:\'418%\', spad:0.0}, 11: {time:\'5:18:00\', cost:{2:5917, 3:3895, 4:1622, 6:2097, 7:1538}, price:0, effect:\'469%\', spad:0.0}, 12: {time:\'5:36:00\', cost:{2:6870, 3:4530, 4:1940, 6:2478, 7:1792}, price:9, effect:\'521%\', spad:0.0}, 13: {time:\'5:54:00\', cost:{2:7888, 3:5209, 4:2279, 6:2885, 7:2063}, price:20, effect:\'577%\', spad:0.0}, 14: {time:\'6:12:00\', cost:{2:8971, 3:5930, 4:2640, 6:3318, 7:2352}, price:30, effect:\'634%\', spad:0.0}, 15: {time:\'6:30:00\', cost:{2:10118, 3:6695, 4:3022, 6:3777, 7:2658}, price:40, effect:\'693%\', spad:0.0}, 16: {time:\'6:48:00\', cost:{2:11327, 3:7501, 4:3425, 6:4261, 7:2980}, price:50, effect:\'755%\', spad:0.0}, 17: {time:\'7:06:00\', cost:{2:12598, 3:8349, 4:3849, 6:4769, 7:3319}, price:59, effect:\'818%\', spad:0.0}, 18: {time:\'7:24:00\', cost:{2:13931, 3:9237, 4:4293, 6:5302, 7:3675}, price:68, effect:\'883%\', spad:0.0}, 19: {time:\'7:42:00\', cost:{2:15325, 3:10166, 4:4758, 6:5860, 7:4046}, price:76, effect:\'950%\', spad:0.0}, 20: {time:\'8:00:00\', cost:{2:16778, 3:11135, 4:5242, 6:6441, 7:4434}, price:85, effect:\'1019%\', spad:0.0}}, \
11: {1: {time:\'2:12:00\', cost:{2:24, 3:22}, price:0, effect:\'\', spad:0.2}, 2: {time:\'2:24:00\', cost:{2:28, 3:24}, price:0, effect:\'\', spad:0.3}, 3: {time:\'2:35:59\', cost:{2:32, 3:26}, price:0, effect:\'\', spad:0.5}, 4: {time:\'2:47:59\', cost:{2:36, 3:28}, price:0, effect:\'\', spad:0.6}, 5: {time:\'3:00:00\', cost:{2:40, 3:30}, price:0, effect:\'\', spad:0.8}, 6: {time:\'3:12:00\', cost:{2:44, 3:32}, price:0, effect:\'\', spad:0.9}, 7: {time:\'3:24:00\', cost:{2:48, 3:34}, price:0, effect:\'\', spad:1.1}, 8: {time:\'3:35:59\', cost:{2:52, 3:36}, price:0, effect:\'\', spad:1.2}, 9: {time:\'3:47:59\', cost:{2:56, 3:38}, price:0, effect:\'\', spad:1.4}, 10: {time:\'4:00:00\', cost:{2:60, 3:40}, price:0, effect:\'\', spad:1.5}, 11: {time:\'4:11:59\', cost:{2:64, 3:42}, price:0, effect:\'\', spad:1.7}, 12: {time:\'4:24:00\', cost:{2:68, 3:44}, price:0, effect:\'\', spad:1.8}, 13: {time:\'4:35:59\', cost:{2:72, 3:46}, price:0, effect:\'\', spad:2.0}, 14: {time:\'4:48:00\', cost:{2:76, 3:48}, price:0, effect:\'\', spad:2.1}, 15: {time:\'5:00:00\', cost:{2:80, 3:50}, price:0, effect:\'\', spad:2.3}, 16: {time:\'5:11:59\', cost:{2:84, 3:52}, price:0, effect:\'\', spad:2.4}, 17: {time:\'5:24:00\', cost:{2:88, 3:54}, price:0, effect:\'\', spad:2.6}, 18: {time:\'5:35:59\', cost:{2:92, 3:56}, price:0, effect:\'\', spad:2.7}, 19: {time:\'5:48:00\', cost:{2:96, 3:58}, price:0, effect:\'\', spad:2.9}, 20: {time:\'6:00:00\', cost:{2:100, 3:60}, price:0, effect:\'\', spad:3.0}}, \
12: {1: {time:\'1:45:00\', cost:{2:150, 3:265}, price:0, effect:\'10%\', spad:0.6}, 2: {time:\'2:15:28\', cost:{2:346, 3:559}, price:0, effect:\'20%\', spad:1.5}, 3: {time:\'2:56:59\', cost:{2:725, 3:1128}, price:0, effect:\'30%\', spad:2.5}, 4: {time:\'3:47:50\', cost:{2:1312, 3:2008}, price:0, effect:\'40%\', spad:3.6}, 5: {time:\'4:46:59\', cost:{2:2125, 3:3228}, price:0, effect:\'50%\', spad:4.9}, 6: {time:\'5:53:42\', cost:{2:3181, 3:4811}, price:0, effect:\'60%\', spad:6.2}, 7: {time:\'7:07:28\', cost:{2:4492, 3:6778}, price:0, effect:\'70%\', spad:7.5}, 8: {time:\'8:27:51\', cost:{2:6071, 3:9147}, price:0, effect:\'80%\', spad:9.0}, 9: {time:\'9:54:31\', cost:{2:7929, 3:11934}, price:0, effect:\'90%\', spad:10.4}, 10: {time:\'11:27:09\', cost:{2:10076, 3:15154}, price:21, effect:\'100%\', spad:12.0}, 11: {time:\'13:05:32\', cost:{2:12521, 3:18822}, price:55, effect:\'110%\', spad:13.6}, 12: {time:\'14:49:25\', cost:{2:15273, 3:22950}, price:90, effect:\'120%\', spad:15.2}, 13: {time:\'16:38:39\', cost:{2:18340, 3:27550}, price:128, effect:\'130%\', spad:16.8}, 14: {time:\'18:33:02\', cost:{2:21730, 3:32635}, price:166, effect:\'140%\', spad:18.5}, 15: {time:\'20:32:27\', cost:{2:25450, 3:38215}, price:206, effect:\'150%\', spad:20.3}, 16: {time:\'22:36:43\', cost:{2:29506, 3:44300}, price:248, effect:\'160%\', spad:22.1}, 17: {time:\'24:45:45\', cost:{2:33906, 3:50900}, price:290, effect:\'170%\', spad:23.9}, 18: {time:\'26:59:25\', cost:{2:38656, 3:58024}, price:334, effect:\'180%\', spad:25.7}, 19: {time:\'29:17:37\', cost:{2:43761, 3:65682}, price:379, effect:\'190%\', spad:27.6}, 20: {time:\'31:40:15\', cost:{2:49229, 3:73883}, price:426, effect:\'200%\', spad:29.5}}, \
13: {1: {time:\'5:00:00\', cost:{2:350, 3:350}, price:0, effect:\'10\', spad:1.0}, 2: {time:\'6:00:00\', cost:{2:693, 3:693, 6:21}, price:0, effect:\'30\', spad:2.5}, 3: {time:\'7:00:00\', cost:{2:1311, 3:1311, 4:6, 6:330}, price:0, effect:\'57\', spad:4.2}, 4: {time:\'8:00:00\', cost:{2:2219, 3:2219, 4:96, 6:784}, price:0, effect:\'91\', spad:6.1}, 5: {time:\'9:00:00\', cost:{2:3432, 3:3432, 4:218, 6:1391}, price:20, effect:\'131\', spad:8.2}, 6: {time:\'10:00:00\', cost:{2:4960, 3:4960, 4:371, 6:2155}, price:47, effect:\'175\', spad:10.5}, 7: {time:\'11:00:00\', cost:{2:6810, 3:6810, 4:556, 6:3080}, price:77, effect:\'224\', spad:12.8}, 8: {time:\'12:00:00\', cost:{2:8992, 3:8992, 4:774, 6:4171}, price:108, effect:\'278\', spad:15.2}, 9: {time:\'13:00:00\', cost:{2:11512, 3:11512, 4:1026, 6:5431}, price:141, effect:\'336\', spad:17.8}, 10: {time:\'14:00:00\', cost:{2:14375, 3:14375, 4:1312, 6:6862}, price:176, effect:\'398\', spad:20.4}, 11: {time:\'15:00:00\', cost:{2:17587, 3:17587, 4:1633, 6:8468}, price:212, effect:\'463\', spad:23.1}, 12: {time:\'16:00:00\', cost:{2:21154, 3:21154, 4:1990, 6:10252}, price:249, effect:\'532\', spad:25.9}, 13: {time:\'17:00:00\', cost:{2:25080, 3:25080, 4:2383, 6:12215}, price:287, effect:\'605\', spad:28.8}, 14: {time:\'18:00:00\', cost:{2:29368, 3:29368, 4:2811, 6:14359}, price:327, effect:\'682\', spad:31.7}, 15: {time:\'19:00:00\', cost:{2:34025, 3:34025, 4:3277, 6:16687}, price:368, effect:\'761\', spad:34.7}, 16: {time:\'20:00:00\', cost:{2:39052, 3:39052, 4:3780, 6:19201}, price:410, effect:\'844\', spad:37.8}, 17: {time:\'21:00:00\', cost:{2:44454, 3:44454, 4:4320, 6:21902}, price:452, effect:\'930\', spad:40.9}, 18: {time:\'22:00:00\', cost:{2:50234, 3:50234, 4:4898, 6:24792}, price:496, effect:\'1019\', spad:44.1}, 19: {time:\'23:00:00\', cost:{2:56396, 3:56396, 4:5514, 6:27873}, price:541, effect:\'1111\', spad:47.3}, 20: {time:\'24:00:00\', cost:{2:62942, 3:62942, 4:6169, 6:31146}, price:587, effect:\'1206\', spad:50.6}}, \
14: {1: {time:\'3:00:00\', cost:{2:2000, 3:2000, 4:50}, price:0, effect:\'1.3\', spad:1.5}, 2: {time:\'3:30:00\', cost:{2:2899, 3:2674, 4:162}, price:0, effect:\'1.7\', spad:3.0}, 3: {time:\'4:00:00\', cost:{2:4189, 3:3641, 4:323}, price:0, effect:\'2.1\', spad:4.5}, 4: {time:\'4:30:00\', cost:{2:5822, 3:4866, 4:527}, price:23, effect:\'2.6\', spad:6.0}, 5: {time:\'5:00:00\', cost:{2:7770, 3:6327, 4:771}, price:50, effect:\'3.1\', spad:7.5}, 6: {time:\'5:30:00\', cost:{2:10012, 3:8009, 4:1051}, price:82, effect:\'3.6\', spad:9.0}, 7: {time:\'6:00:00\', cost:{2:12532, 3:9899, 4:1366}, price:116, effect:\'4.1\', spad:10.5}, 8: {time:\'6:30:00\', cost:{2:15318, 3:11989, 4:1714}, price:154, effect:\'4.6\', spad:12.0}, 9: {time:\'7:00:00\', cost:{2:18359, 3:14269, 4:2094}, price:194, effect:\'5.2\', spad:13.5}, 10: {time:\'7:30:00\', cost:{2:21647, 3:16735, 4:2505}, price:237, effect:\'5.8\', spad:15.0}, 11: {time:\'8:00:00\', cost:{2:25173, 3:19380, 4:2946}, price:283, effect:\'6.3\', spad:16.5}, 12: {time:\'8:30:00\', cost:{2:28931, 3:22198, 4:3416}, price:332, effect:\'6.9\', spad:18.0}, 13: {time:\'9:00:00\', cost:{2:32915, 3:25186, 4:3914}, price:383, effect:\'7.5\', spad:19.5}, 14: {time:\'9:30:00\', cost:{2:37120, 3:28340, 4:4440}, price:436, effect:\'8.1\', spad:21.0}, 15: {time:\'10:00:00\', cost:{2:41540, 3:31655, 4:4992}, price:492, effect:\'8.7\', spad:22.5}, 16: {time:\'10:30:00\', cost:{2:46172, 3:35129, 4:5571}, price:550, effect:\'9.4\', spad:24.0}, 17: {time:\'11:00:00\', cost:{2:51010, 3:38758, 4:6176}, price:610, effect:\'10.0\', spad:25.5}, 18: {time:\'11:30:00\', cost:{2:56053, 3:42539, 4:6806}, price:672, effect:\'10.6\', spad:27.0}, 19: {time:\'12:00:00\', cost:{2:61295, 3:46471, 4:7461}, price:737, effect:\'11.3\', spad:28.5}, 20: {time:\'12:30:00\', cost:{2:66734, 3:50550, 4:8141}, price:803, effect:\'11.9\', spad:30.0}}, \
15: {1: {time:\'2:24:00\', cost:{2:200, 3:400}, price:0, effect:\'100%\', spad:0.0}, 2: {time:\'2:47:59\', cost:{2:324, 3:648}, price:0, effect:\'112%\', spad:0.0}, 3: {time:\'3:12:00\', cost:{2:511, 3:1022}, price:0, effect:\'130%\', spad:0.0}, 4: {time:\'3:35:59\', cost:{2:756, 3:1512, 4:135}, price:0, effect:\'153%\', spad:0.0}, 5: {time:\'4:00:00\', cost:{2:1055, 3:2111, 4:374}, price:0, effect:\'180%\', spad:0.0}, 6: {time:\'4:24:00\', cost:{2:1407, 3:2815, 4:656}, price:0, effect:\'211%\', spad:0.0}, 7: {time:\'4:48:00\', cost:{2:1810, 3:3620, 4:978}, price:0, effect:\'246%\', spad:0.0}, 8: {time:\'5:11:59\', cost:{2:2261, 3:4522, 4:1338}, price:0, effect:\'285%\', spad:0.0}, 9: {time:\'5:35:59\', cost:{2:2759, 3:5519, 4:1737}, price:0, effect:\'327%\', spad:0.0}, 10: {time:\'6:00:00\', cost:{2:3304, 3:6609, 4:2173}, price:0, effect:\'373%\', spad:0.0}, 11: {time:\'6:24:00\', cost:{2:3895, 3:7790, 4:2646}, price:0, effect:\'422%\', spad:0.0}, 12: {time:\'6:48:00\', cost:{2:4530, 3:9060, 4:3154}, price:0, effect:\'475%\', spad:0.0}, 13: {time:\'7:12:00\', cost:{2:5209, 3:10418, 4:3697}, price:0, effect:\'530%\', spad:0.0}, 14: {time:\'7:35:59\', cost:{2:5930, 3:11861, 4:4274}, price:0, effect:\'589%\', spad:0.0}, 15: {time:\'8:00:00\', cost:{2:6695, 3:13390, 4:4886}, price:10, effect:\'650%\', spad:0.0}, 16: {time:\'8:23:59\', cost:{2:7501, 3:15003, 4:5531}, price:26, effect:\'715%\', spad:0.0}, 17: {time:\'8:48:00\', cost:{2:8349, 3:16698, 4:6209}, price:41, effect:\'782%\', spad:0.0}, 18: {time:\'9:11:59\', cost:{2:9237, 3:18475, 4:6920}, price:55, effect:\'852%\', spad:0.0}, 19: {time:\'9:36:00\', cost:{2:10166, 3:20333, 4:7663}, price:69, effect:\'925%\', spad:0.0}, 20: {time:\'10:00:00\', cost:{2:11135, 3:22271, 4:8438}, price:82, effect:\'1001%\', spad:0.0}}, \
16: {1: {time:\'2:17:59\', cost:{2:100, 3:120}, price:0, effect:\'100%\', spad:0.0}, 2: {time:\'2:35:59\', cost:{2:142, 3:205}, price:0, effect:\'127%\', spad:0.0}, 3: {time:\'2:54:00\', cost:{2:229, 3:379}, price:0, effect:\'162%\', spad:0.0}, 4: {time:\'3:12:00\', cost:{2:368, 3:657}, price:0, effect:\'205%\', spad:0.0}, 5: {time:\'3:30:00\', cost:{2:565, 3:1051}, price:0, effect:\'252%\', spad:0.0}, 6: {time:\'3:48:00\', cost:{2:827, 3:1574}, price:0, effect:\'305%\', spad:0.0}, 7: {time:\'4:05:59\', cost:{2:1157, 3:2234}, price:0, effect:\'362%\', spad:0.0}, 8: {time:\'4:24:00\', cost:{2:1560, 3:3040}, price:0, effect:\'424%\', spad:0.0}, 9: {time:\'4:42:00\', cost:{2:2040, 3:4001}, price:11, effect:\'490%\', spad:0.0}, 10: {time:\'5:00:00\', cost:{2:2601, 3:5123}, price:24, effect:\'559%\', spad:0.0}, 11: {time:\'5:18:00\', cost:{2:3247, 3:6414}, price:35, effect:\'632%\', spad:0.0}, 12: {time:\'5:36:00\', cost:{2:3980, 3:7881}, price:47, effect:\'708%\', spad:0.0}, 13: {time:\'5:54:00\', cost:{2:4804, 3:9529}, price:57, effect:\'788%\', spad:0.0}, 14: {time:\'6:12:00\', cost:{2:5722, 3:11365}, price:68, effect:\'870%\', spad:0.0}, 15: {time:\'6:30:00\', cost:{2:6736, 3:13393}, price:78, effect:\'956%\', spad:0.0}, 16: {time:\'6:48:00\', cost:{2:7850, 3:15620}, price:88, effect:\'1045%\', spad:0.0}, 17: {time:\'7:06:00\', cost:{2:9065, 3:18051}, price:98, effect:\'1136%\', spad:0.0}, 18: {time:\'7:24:00\', cost:{2:10385, 3:20691}, price:108, effect:\'1230%\', spad:0.0}, 19: {time:\'7:42:00\', cost:{2:11812, 3:23544}, price:117, effect:\'1327%\', spad:0.0}, 20: {time:\'8:00:00\', cost:{2:13347, 3:26615}, price:126, effect:\'1426%\', spad:0.0}}, \
17: {1: {time:\'1:36:00\', cost:{2:1350, 3:2960, 4:120}, price:0, effect:\'3325\', spad:0.0}, 2: {time:\'1:46:58\', cost:{2:750, 3:1440, 4:180}, price:0, effect:\'4300\', spad:0.0}, 3: {time:\'2:01:10\', cost:{2:1250, 3:2240, 4:280}, price:0, effect:\'5925\', spad:0.0}, 4: {time:\'2:17:59\', cost:{2:1950, 3:3360, 4:420}, price:0, effect:\'8200\', spad:0.0}, 5: {time:\'2:37:04\', cost:{2:2850, 3:4800, 4:600}, price:0, effect:\'11125\', spad:0.0}, 6: {time:\'2:58:10\', cost:{2:3950, 3:6560, 4:820}, price:0, effect:\'14700\', spad:0.0}, 7: {time:\'3:21:07\', cost:{2:5250, 3:8640, 4:1080}, price:0, effect:\'18925\', spad:0.0}, 8: {time:\'3:45:45\', cost:{2:6750, 3:11040, 4:1380}, price:0, effect:\'23800\', spad:0.0}, 9: {time:\'4:11:59\', cost:{2:8450, 3:13760, 4:1720}, price:0, effect:\'29325\', spad:0.0}, 10: {time:\'4:39:44\', cost:{2:10350, 3:16800, 4:2100}, price:0, effect:\'35500\', spad:0.0}, 11: {time:\'5:08:53\', cost:{2:12450, 3:20160, 4:2520}, price:0, effect:\'42325\', spad:0.0}, 12: {time:\'5:39:24\', cost:{2:14750, 3:23840, 4:2980}, price:0, effect:\'49800\', spad:0.0}, 13: {time:\'6:11:13\', cost:{2:17250, 3:27840, 4:3480}, price:0, effect:\'57925\', spad:0.0}, 14: {time:\'6:44:17\', cost:{2:19950, 3:32160, 4:4020}, price:0, effect:\'66700\', spad:0.0}, 15: {time:\'7:18:34\', cost:{2:22850, 3:36800, 4:4600}, price:0, effect:\'76125\', spad:0.0}, 16: {time:\'7:54:00\', cost:{2:25950, 3:41760, 4:5220}, price:0, effect:\'86200\', spad:0.0}, 17: {time:\'8:30:33\', cost:{2:29250, 3:47040, 4:5880}, price:0, effect:\'96925\', spad:0.0}, 18: {time:\'9:08:12\', cost:{2:32750, 3:52640, 4:6580}, price:0, effect:\'108300\', spad:0.0}, 19: {time:\'9:46:54\', cost:{2:36450, 3:58560, 4:7320}, price:0, effect:\'120325\', spad:0.0}, 20: {time:\'10:26:39\', cost:{2:40350, 3:64800, 4:8100}, price:0, effect:\'133000\', spad:0.0}}, \
18: {1: {time:\'4:03:35\', cost:{2:1600, 3:2750, 4:600, 6:900}, price:38, effect:\'10%\', spad:1.5}, 2: {time:\'4:09:30\', cost:{2:1746, 3:3115, 4:746, 6:1119}, price:48, effect:\'20%\', spad:3.0}, 3: {time:\'4:16:45\', cost:{2:1917, 3:3542, 4:917, 6:1375}, price:59, effect:\'30%\', spad:4.5}, 4: {time:\'4:25:04\', cost:{2:2106, 3:4015, 4:1106, 6:1659}, price:72, effect:\'40%\', spad:6.0}, 5: {time:\'4:34:15\', cost:{2:2310, 3:4525, 4:1310, 6:1965}, price:85, effect:\'50%\', spad:7.5}, 6: {time:\'4:44:13\', cost:{2:2527, 3:5067, 4:1527, 6:2290}, price:98, effect:\'60%\', spad:9.0}, 7: {time:\'4:54:52\', cost:{2:2754, 3:5637, 4:1754, 6:2632}, price:112, effect:\'70%\', spad:10.5}, 8: {time:\'5:06:09\', cost:{2:2992, 3:6232, 4:1992, 6:2989}, price:127, effect:\'80%\', spad:12.0}, 9: {time:\'5:18:01\', cost:{2:3239, 3:6849, 4:2239, 6:3359}, price:141, effect:\'90%\', spad:13.5}, 10: {time:\'5:30:25\', cost:{2:3495, 3:7488, 4:2495, 6:3742}, price:156, effect:\'100%\', spad:15.0}, 11: {time:\'5:43:20\', cost:{2:3758, 3:8146, 4:2758, 6:4137}, price:172, effect:\'110%\', spad:16.5}, 12: {time:\'5:56:43\', cost:{2:4028, 3:8822, 4:3028, 6:4543}, price:187, effect:\'120%\', spad:18.0}, 13: {time:\'6:10:33\', cost:{2:4306, 3:9515, 4:3306, 6:4959}, price:203, effect:\'130%\', spad:19.5}, 14: {time:\'6:24:50\', cost:{2:4590, 3:10225, 4:3590, 6:5385}, price:219, effect:\'140%\', spad:21.0}, 15: {time:\'6:39:31\', cost:{2:4880, 3:10950, 4:3880, 6:5820}, price:236, effect:\'150%\', spad:22.5}, 16: {time:\'6:54:36\', cost:{2:5175, 3:11689, 4:4175, 6:6263}, price:252, effect:\'160%\', spad:24.0}, 17: {time:\'7:10:04\', cost:{2:5477, 3:12443, 4:4477, 6:6715}, price:269, effect:\'170%\', spad:25.5}, 18: {time:\'7:25:54\', cost:{2:5784, 3:13210, 4:4784, 6:7176}, price:286, effect:\'180%\', spad:27.0}, 19: {time:\'7:42:06\', cost:{2:6095, 3:13989, 4:5095, 6:7643}, price:303, effect:\'190%\', spad:28.5}, 20: {time:\'7:58:38\', cost:{2:6412, 3:14782, 4:5412, 6:8119}, price:321, effect:\'200%\', spad:30.0}}, \
19: {1: {time:\'2:05:59\', cost:{2:1300, 3:3000}, price:0, effect:\'17\', spad:0.0}, 2: {time:\'2:12:00\', cost:{2:607, 3:1214}, price:0, effect:\'19\', spad:0.0}, 3: {time:\'2:17:59\', cost:{2:667, 3:1334}, price:0, effect:\'21\', spad:0.0}, 4: {time:\'2:24:00\', cost:{2:729, 3:1459}, price:0, effect:\'23\', spad:0.0}, 5: {time:\'2:30:00\', cost:{2:793, 3:1587}, price:0, effect:\'25\', spad:0.0}, 6: {time:\'2:35:59\', cost:{2:858, 3:1717}, price:0, effect:\'27\', spad:0.0}, 7: {time:\'2:42:00\', cost:{2:925, 3:1850}, price:0, effect:\'29\', spad:0.0}, 8: {time:\'2:47:59\', cost:{2:992, 3:1984}, price:0, effect:\'31\', spad:0.0}, 9: {time:\'2:54:00\', cost:{2:1060, 3:2121}, price:0, effect:\'33\', spad:0.0}, 10: {time:\'3:00:00\', cost:{2:1129, 3:2258}, price:0, effect:\'35\', spad:0.0}, 11: {time:\'3:05:59\', cost:{2:1199, 3:2398}, price:0, effect:\'37\', spad:0.0}, 12: {time:\'3:12:00\', cost:{2:1269, 3:2538}, price:0, effect:\'39\', spad:0.0}, 13: {time:\'3:17:59\', cost:{2:1340, 3:2680}, price:0, effect:\'41\', spad:0.0}, 14: {time:\'3:24:00\', cost:{2:1411, 3:2822}, price:0, effect:\'43\', spad:0.0}, 15: {time:\'3:30:00\', cost:{2:1483, 3:2966}, price:0, effect:\'45\', spad:0.0}, 16: {time:\'3:35:59\', cost:{2:1555, 3:3111}, price:0, effect:\'47\', spad:0.0}, 17: {time:\'3:42:00\', cost:{2:1628, 3:3256}, price:0, effect:\'49\', spad:0.0}, 18: {time:\'3:47:59\', cost:{2:1701, 3:3403}, price:0, effect:\'51\', spad:0.0}, 19: {time:\'3:54:00\', cost:{2:1775, 3:3550}, price:0, effect:\'53\', spad:0.0}, 20: {time:\'4:00:00\', cost:{2:1849, 3:3698}, price:0, effect:\'55\', spad:0.0}}, \
20: {1: {time:\'3:05:59\', cost:{2:150, 3:550}, price:0, effect:\'10%\', spad:0.0}, 2: {time:\'3:12:00\', cost:{2:223, 3:988}, price:0, effect:\'20%\', spad:0.0}, 3: {time:\'3:17:59\', cost:{2:308, 3:1501}, price:0, effect:\'30%\', spad:0.0}, 4: {time:\'3:24:00\', cost:{2:403, 3:2068}, price:0, effect:\'40%\', spad:0.0}, 5: {time:\'3:30:00\', cost:{2:505, 3:2680}, price:0, effect:\'50%\', spad:0.0}, 6: {time:\'3:35:59\', cost:{2:613, 3:3331}, price:0, effect:\'60%\', spad:0.0}, 7: {time:\'3:42:00\', cost:{2:727, 3:4014}, price:0, effect:\'70%\', spad:0.0}, 8: {time:\'3:47:59\', cost:{2:846, 3:4728}, price:0, effect:\'80%\', spad:0.0}, 9: {time:\'3:54:00\', cost:{2:969, 3:5469}, price:0, effect:\'90%\', spad:0.0}, 10: {time:\'4:00:00\', cost:{2:1097, 3:6235}, price:0, effect:\'100%\', spad:0.0}, 11: {time:\'4:05:59\', cost:{2:1229, 3:7025}, price:4, effect:\'110%\', spad:0.0}, 12: {time:\'4:11:59\', cost:{2:1364, 3:7836}, price:8, effect:\'120%\', spad:0.0}, 13: {time:\'4:18:00\', cost:{2:1503, 3:8668}, price:13, effect:\'130%\', spad:0.0}, 14: {time:\'4:24:00\', cost:{2:1645, 3:9520}, price:17, effect:\'140%\', spad:0.0}, 15: {time:\'4:30:00\', cost:{2:1790, 3:10390}, price:21, effect:\'150%\', spad:0.0}, 16: {time:\'4:35:59\', cost:{2:1937, 3:11277}, price:25, effect:\'160%\', spad:0.0}, 17: {time:\'4:41:59\', cost:{2:2088, 3:12181}, price:29, effect:\'170%\', spad:0.0}, 18: {time:\'4:48:00\', cost:{2:2242, 3:13102}, price:33, effect:\'180%\', spad:0.0}, 19: {time:\'4:54:00\', cost:{2:2397, 3:14037}, price:37, effect:\'190%\', spad:0.0}, 20: {time:\'5:00:00\', cost:{2:2556, 3:14988}, price:40, effect:\'200%\', spad:0.0}}, \
21: {1: {time:\'1:45:00\', cost:{2:250, 3:365}, price:0, effect:\'10%\', spad:0.6}, 2: {time:\'2:15:28\', cost:{2:578, 3:825}, price:0, effect:\'20%\', spad:1.5}, 3: {time:\'2:56:59\', cost:{2:1154, 3:1631}, price:0, effect:\'30%\', spad:2.5}, 4: {time:\'3:47:50\', cost:{2:1987, 3:2798}, price:0, effect:\'40%\', spad:3.6}, 5: {time:\'4:46:59\', cost:{2:3086, 3:4336}, price:0, effect:\'50%\', spad:4.9}, 6: {time:\'5:53:42\', cost:{2:4456, 3:6254}, price:22, effect:\'60%\', spad:6.2}, 7: {time:\'7:07:28\', cost:{2:6102, 3:8558}, price:49, effect:\'70%\', spad:7.5}, 8: {time:\'8:27:51\', cost:{2:8029, 3:11256}, price:78, effect:\'80%\', spad:9.0}, 9: {time:\'9:54:31\', cost:{2:10240, 3:14351}, price:109, effect:\'90%\', spad:10.4}, 10: {time:\'11:27:09\', cost:{2:12739, 3:17849}, price:141, effect:\'100%\', spad:12.0}, 11: {time:\'13:05:32\', cost:{2:15528, 3:21755}, price:175, effect:\'110%\', spad:13.6}, 12: {time:\'14:49:25\', cost:{2:18612, 3:26071}, price:210, effect:\'120%\', spad:15.2}, 13: {time:\'16:38:39\', cost:{2:21991, 3:30802}, price:248, effect:\'130%\', spad:16.8}, 14: {time:\'18:33:02\', cost:{2:25669, 3:35952}, price:286, effect:\'140%\', spad:18.5}, 15: {time:\'20:32:27\', cost:{2:29647, 3:41522}, price:326, effect:\'150%\', spad:20.3}, 16: {time:\'22:36:43\', cost:{2:33929, 3:47516}, price:368, effect:\'160%\', spad:22.1}, 17: {time:\'24:45:45\', cost:{2:38515, 3:53936}, price:410, effect:\'170%\', spad:23.9}, 18: {time:\'26:59:25\', cost:{2:43408, 3:60786}, price:454, effect:\'180%\', spad:25.7}, 19: {time:\'29:17:37\', cost:{2:48609, 3:68068}, price:499, effect:\'190%\', spad:27.6}, 20: {time:\'31:40:15\', cost:{2:54121, 3:75784}, price:546, effect:\'200%\', spad:29.5}}, \
22: {1: {time:\'3:00:00\', cost:{2:1300, 3:1600, 4:135}, price:0, effect:\'10%\', spad:0.5}, 2: {time:\'3:30:28\', cost:{2:1479, 3:1959, 4:260}, price:0, effect:\'20%\', spad:1.2}, 3: {time:\'4:11:59\', cost:{2:1810, 3:2621, 4:492}, price:0, effect:\'30%\', spad:2.1}, 4: {time:\'5:02:50\', cost:{2:2305, 3:3611, 4:838}, price:0, effect:\'40%\', spad:3.0}, 5: {time:\'6:01:59\', cost:{2:2974, 3:4949, 4:1307}, price:13, effect:\'50%\', spad:4.1}, 6: {time:\'7:08:42\', cost:{2:3825, 3:6651, 4:1903}, price:28, effect:\'60%\', spad:5.1}, 7: {time:\'8:22:28\', cost:{2:4865, 3:8731, 4:2630}, price:43, effect:\'70%\', spad:6.3}, 8: {time:\'9:42:51\', cost:{2:6100, 3:11200, 4:3495}, price:59, effect:\'80%\', spad:7.5}, 9: {time:\'11:09:31\', cost:{2:7534, 3:14069, 4:4499}, price:75, effect:\'90%\', spad:8.7}, 10: {time:\'12:42:09\', cost:{2:9174, 3:17348, 4:5647}, price:91, effect:\'100%\', spad:10.0}, 11: {time:\'14:20:32\', cost:{2:11023, 3:21046, 4:6941}, price:107, effect:\'110%\', spad:11.3}, 12: {time:\'16:04:25\', cost:{2:13085, 3:25170, 4:8384}, price:124, effect:\'120%\', spad:12.6}, 13: {time:\'17:53:39\', cost:{2:15363, 3:29727, 4:9979}, price:141, effect:\'130%\', spad:14.0}, 14: {time:\'19:48:02\', cost:{2:17863, 3:34726, 4:11729}, price:157, effect:\'140%\', spad:15.5}, 15: {time:\'21:47:27\', cost:{2:20586, 3:40172, 4:13635}, price:175, effect:\'150%\', spad:16.9}, 16: {time:\'23:51:43\', cost:{2:23536, 3:46072, 4:15700}, price:192, effect:\'160%\', spad:18.4}, 17: {time:\'26:00:45\', cost:{2:26715, 3:52431, 4:17926}, price:210, effect:\'170%\', spad:19.9}, 18: {time:\'28:14:25\', cost:{2:30128, 3:59256, 4:20314}, price:227, effect:\'180%\', spad:21.4}, 19: {time:\'30:32:37\', cost:{2:33775, 3:66551, 4:22868}, price:245, effect:\'190%\', spad:23.0}, 20: {time:\'32:55:15\', cost:{2:37661, 3:74322, 4:25587}, price:263, effect:\'200%\', spad:24.6}}, \
23: {1: {time:\'1:45:00\', cost:{2:265, 3:150}, price:0, effect:\'10%\', spad:0.6}, 2: {time:\'2:15:28\', cost:{2:559, 3:346}, price:0, effect:\'20%\', spad:1.5}, 3: {time:\'2:56:59\', cost:{2:1128, 3:725}, price:0, effect:\'30%\', spad:2.5}, 4: {time:\'3:47:50\', cost:{2:2008, 3:1312}, price:0, effect:\'40%\', spad:3.6}, 5: {time:\'4:46:59\', cost:{2:3228, 3:2125}, price:0, effect:\'50%\', spad:4.9}, 6: {time:\'5:53:42\', cost:{2:4811, 3:3181}, price:17, effect:\'60%\', spad:6.2}, 7: {time:\'7:07:28\', cost:{2:6778, 3:4492}, price:48, effect:\'70%\', spad:7.5}, 8: {time:\'8:27:51\', cost:{2:9147, 3:6071}, price:81, effect:\'80%\', spad:9.0}, 9: {time:\'9:54:31\', cost:{2:11934, 3:7929}, price:116, effect:\'90%\', spad:10.4}, 10: {time:\'11:27:09\', cost:{2:15154, 3:10076}, price:152, effect:\'100%\', spad:12.0}, 11: {time:\'13:05:32\', cost:{2:18822, 3:12521}, price:191, effect:\'110%\', spad:13.6}, 12: {time:\'14:49:25\', cost:{2:22950, 3:15273}, price:232, effect:\'120%\', spad:15.2}, 13: {time:\'16:38:39\', cost:{2:27550, 3:18340}, price:274, effect:\'130%\', spad:16.8}, 14: {time:\'18:33:02\', cost:{2:32635, 3:21730}, price:319, effect:\'140%\', spad:18.5}, 15: {time:\'20:32:27\', cost:{2:38215, 3:25450}, price:364, effect:\'150%\', spad:20.3}, 16: {time:\'22:36:43\', cost:{2:44300, 3:29506}, price:412, effect:\'160%\', spad:22.1}, 17: {time:\'24:45:45\', cost:{2:50900, 3:33906}, price:460, effect:\'170%\', spad:23.9}, 18: {time:\'26:59:25\', cost:{2:58024, 3:38656}, price:510, effect:\'180%\', spad:25.7}, 19: {time:\'29:17:37\', cost:{2:65682, 3:43761}, price:562, effect:\'190%\', spad:27.6}, 20: {time:\'31:40:15\', cost:{2:73883, 3:49229}, price:615, effect:\'200%\', spad:29.5}}, \
24: {1: {time:\'4:18:00\', cost:{2:6080, 3:3450}, price:0, effect:\'110%\', spad:5.0}, 2: {time:\'4:42:48\', cost:{2:1898, 3:1633}, price:0, effect:\'120%\', spad:6.0}, 3: {time:\'5:11:04\', cost:{2:2245, 3:2715}, price:0, effect:\'130%\', spad:7.0}, 4: {time:\'5:41:49\', cost:{2:2714, 3:4182}, price:0, effect:\'140%\', spad:8.0}, 5: {time:\'6:14:34\', cost:{2:3302, 3:6020}, price:0, effect:\'150%\', spad:9.0}, 6: {time:\'6:49:01\', cost:{2:4007, 3:8223}, price:7, effect:\'160%\', spad:10.0}, 7: {time:\'7:24:56\', cost:{2:4826, 3:10783}, price:15, effect:\'170%\', spad:11.0}, 8: {time:\'8:02:10\', cost:{2:5758, 3:13696}, price:23, effect:\'180%\', spad:12.0}, 9: {time:\'8:40:35\', cost:{2:6801, 3:16955}, price:31, effect:\'190%\', spad:13.0}, 10: {time:\'9:20:05\', cost:{2:7954, 3:20558}, price:39, effect:\'200%\', spad:14.0}, 11: {time:\'10:00:35\', cost:{2:9216, 3:24500}, price:47, effect:\'210%\', spad:15.0}, 12: {time:\'10:42:01\', cost:{2:10585, 3:28779}, price:56, effect:\'220%\', spad:16.0}, 13: {time:\'11:24:19\', cost:{2:12061, 3:33391}, price:64, effect:\'230%\', spad:17.0}, 14: {time:\'12:07:27\', cost:{2:13642, 3:38334}, price:73, effect:\'240%\', spad:18.0}, 15: {time:\'12:51:21\', cost:{2:15329, 3:43605}, price:81, effect:\'250%\', spad:19.0}, 16: {time:\'13:36:00\', cost:{2:17120, 3:49202}, price:90, effect:\'260%\', spad:20.0}, 17: {time:\'14:21:20\', cost:{2:19015, 3:55124}, price:99, effect:\'270%\', spad:21.0}, 18: {time:\'15:07:21\', cost:{2:21013, 3:61367}, price:108, effect:\'280%\', spad:22.0}, 19: {time:\'15:54:01\', cost:{2:23114, 3:67931}, price:117, effect:\'290%\', spad:23.0}, 20: {time:\'16:41:18\', cost:{2:25316, 3:74813}, price:125, effect:\'300%\', spad:24.0}}, \
25: {1: {time:\'3:09:00\', cost:{2:1575, 3:2275, 4:100, 6:100}, price:0, effect:\'250\', spad:4.2}, 2: {time:\'3:17:59\', cost:{2:660, 3:860, 4:128}, price:0, effect:\'261\', spad:4.4}, 3: {time:\'3:27:00\', cost:{2:751, 3:951, 4:158}, price:0, effect:\'273\', spad:4.6}, 4: {time:\'3:35:59\', cost:{2:844, 3:1044, 4:189}, price:0, effect:\'285\', spad:4.8}, 5: {time:\'3:45:00\', cost:{2:940, 3:1140, 4:221}, price:0, effect:\'297\', spad:5.0}, 6: {time:\'3:54:00\', cost:{2:1038, 3:1238, 4:254}, price:0, effect:\'310\', spad:5.2}, 7: {time:\'4:03:00\', cost:{2:1137, 3:1337, 4:287}, price:0, effect:\'323\', spad:5.4}, 8: {time:\'4:11:59\', cost:{2:1238, 3:1438, 4:321}, price:0, effect:\'336\', spad:5.6}, 9: {time:\'4:20:59\', cost:{2:1340, 3:1540, 4:355}, price:0, effect:\'349\', spad:5.8}, 10: {time:\'4:30:00\', cost:{2:1444, 3:1644, 4:389}, price:0, effect:\'362\', spad:6.0}, 11: {time:\'4:39:00\', cost:{2:1548, 3:1748, 4:424}, price:0, effect:\'375\', spad:6.2}, 12: {time:\'4:48:00\', cost:{2:1653, 3:1853, 4:459}, price:0, effect:\'389\', spad:6.4}, 13: {time:\'4:57:00\', cost:{2:1760, 3:1960, 4:495}, price:0, effect:\'402\', spad:6.6}, 14: {time:\'5:05:59\', cost:{2:1867, 3:2067, 4:530}, price:0, effect:\'416\', spad:6.8}, 15: {time:\'5:15:00\', cost:{2:1974, 3:2174, 4:566}, price:0, effect:\'430\', spad:7.0}, 16: {time:\'5:24:00\', cost:{2:2083, 3:2283, 4:602}, price:0, effect:\'444\', spad:7.2}, 17: {time:\'5:33:00\', cost:{2:2192, 3:2392, 4:639}, price:0, effect:\'458\', spad:7.4}, 18: {time:\'5:42:00\', cost:{2:2302, 3:2502, 4:675}, price:0, effect:\'472\', spad:7.6}, 19: {time:\'5:50:59\', cost:{2:2412, 3:2612, 4:712}, price:0, effect:\'486\', spad:7.8}, 20: {time:\'6:00:00\', cost:{2:2523, 3:2723, 4:749}, price:0, effect:\'500\', spad:8.0}}, \
26: {1: {time:\'2:30:00\', cost:{2:1700, 3:3400, 4:170, 7:550}, price:0, effect:\'10\', spad:0.0}, 2: {time:\'2:39:50\', cost:{2:1106, 3:2712, 4:210, 7:151}, price:0, effect:\'13\', spad:0.0}, 3: {time:\'2:51:55\', cost:{2:1659, 3:3819, 4:265, 7:289}, price:0, effect:\'17\', spad:0.0}, 4: {time:\'3:05:47\', cost:{2:2337, 3:5175, 4:333, 7:459}, price:0, effect:\'21\', spad:0.0}, 5: {time:\'3:21:06\', cost:{2:3126, 3:6753, 4:412, 7:656}, price:0, effect:\'27\', spad:0.0}, 6: {time:\'3:37:42\', cost:{2:4016, 3:8532, 4:501, 7:879}, price:6, effect:\'32\', spad:0.0}, 7: {time:\'3:55:28\', cost:{2:4999, 3:10499, 4:599, 7:1124}, price:15, effect:\'38\', spad:0.0}, 8: {time:\'4:14:16\', cost:{2:6071, 3:12643, 4:707, 7:1392}, price:25, effect:\'44\', spad:0.0}, 9: {time:\'4:34:02\', cost:{2:7226, 3:14953, 4:822, 7:1681}, price:35, effect:\'51\', spad:0.0}, 10: {time:\'4:54:42\', cost:{2:8462, 3:17424, 4:946, 7:1990}, price:45, effect:\'58\', spad:0.0}, 11: {time:\'5:16:13\', cost:{2:9773, 3:20047, 4:1077, 7:2318}, price:56, effect:\'65\', spad:0.0}, 12: {time:\'5:38:32\', cost:{2:11159, 3:22818, 4:1215, 7:2664}, price:67, effect:\'72\', spad:0.0}, 13: {time:\'6:01:36\', cost:{2:12615, 3:25730, 4:1361, 7:3028}, price:78, effect:\'80\', spad:0.0}, 14: {time:\'6:25:23\', cost:{2:14140, 3:28781, 4:1514, 7:3410}, price:90, effect:\'88\', spad:0.0}, 15: {time:\'6:49:52\', cost:{2:15732, 3:31965, 4:1673, 7:3808}, price:102, effect:\'96\', spad:0.0}, 16: {time:\'7:15:01\', cost:{2:17389, 3:35279, 4:1838, 7:4222}, price:115, effect:\'105\', spad:0.0}, 17: {time:\'7:40:47\', cost:{2:19110, 3:38720, 4:2011, 7:4652}, price:128, effect:\'113\', spad:0.0}, 18: {time:\'8:07:11\', cost:{2:20892, 3:42284, 4:2189, 7:5098}, price:141, effect:\'122\', spad:0.0}, 19: {time:\'8:34:10\', cost:{2:22734, 3:45969, 4:2373, 7:5558}, price:155, effect:\'131\', spad:0.0}, 20: {time:\'9:01:44\', cost:{2:24636, 3:49773, 4:2563, 7:6034}, price:168, effect:\'140\', spad:0.0}}, \
27: {1: {time:\'5:11:59\', cost:{2:26100, 3:56500, 4:20500, 6:26600}, price:335, effect:\'160%\', spad:21.5}, 2: {time:\'5:24:00\', cost:{2:7977, 3:18693, 4:7231, 6:6477}, price:354, effect:\'170%\', spad:23.0}, 3: {time:\'5:35:59\', cost:{2:9002, 3:21256, 4:8085, 6:7502}, price:376, effect:\'180%\', spad:24.5}, 4: {time:\'5:48:00\', cost:{2:10137, 3:24094, 4:9031, 6:8637}, price:399, effect:\'190%\', spad:26.0}, 5: {time:\'6:00:00\', cost:{2:11361, 3:27154, 4:10051, 6:9861}, price:423, effect:\'200%\', spad:27.5}, 6: {time:\'6:11:59\', cost:{2:12662, 3:30405, 4:11135, 6:11162}, price:448, effect:\'210%\', spad:29.0}, 7: {time:\'6:24:00\', cost:{2:14029, 3:33824, 4:12274, 6:12529}, price:474, effect:\'220%\', spad:30.5}, 8: {time:\'6:35:59\', cost:{2:15457, 3:37392, 4:13464, 6:13957}, price:501, effect:\'230%\', spad:32.0}, 9: {time:\'6:48:00\', cost:{2:16939, 3:41097, 4:14699, 6:15439}, price:529, effect:\'240%\', spad:33.5}, 10: {time:\'7:00:00\', cost:{2:18471, 3:44928, 4:15976, 6:16971}, price:557, effect:\'250%\', spad:35.0}, 11: {time:\'7:11:59\', cost:{2:20050, 3:48876, 4:17292, 6:18550}, price:586, effect:\'260%\', spad:36.5}, 12: {time:\'7:24:00\', cost:{2:21673, 3:52933, 4:18644, 6:20173}, price:615, effect:\'270%\', spad:38.0}, 13: {time:\'7:35:59\', cost:{2:23337, 3:57093, 4:20031, 6:21837}, price:645, effect:\'280%\', spad:39.5}, 14: {time:\'7:48:00\', cost:{2:25040, 3:61350, 4:21450, 6:23540}, price:675, effect:\'290%\', spad:41.0}, 15: {time:\'8:00:00\', cost:{2:26780, 3:65700, 4:22900, 6:25280}, price:706, effect:\'300%\', spad:42.5}, 16: {time:\'8:11:59\', cost:{2:28555, 3:70137, 4:24379, 6:27055}, price:737, effect:\'310%\', spad:44.0}, 17: {time:\'8:23:59\', cost:{2:30363, 3:74658, 4:25886, 6:28863}, price:769, effect:\'320%\', spad:45.5}, 18: {time:\'8:36:00\', cost:{2:32204, 3:79260, 4:27420, 6:30704}, price:801, effect:\'330%\', spad:47.0}, 19: {time:\'8:48:00\', cost:{2:34075, 3:83939, 4:28979, 6:32575}, price:833, effect:\'340%\', spad:48.5}, 20: {time:\'9:00:00\', cost:{2:35977, 3:88693, 4:30564, 6:34477}, price:866, effect:\'350%\', spad:50.0}}, \
28: {1: {time:\'1:45:00\', cost:{2:250, 3:150}, price:0, effect:\'10%\', spad:0.5}, 2: {time:\'2:15:28\', cost:{2:563, 3:326}, price:0, effect:\'20%\', spad:1.2}, 3: {time:\'2:56:59\', cost:{2:1171, 3:668}, price:0, effect:\'30%\', spad:2.1}, 4: {time:\'3:47:50\', cost:{2:2110, 3:1196}, price:0, effect:\'40%\', spad:3.0}, 5: {time:\'4:46:59\', cost:{2:3411, 3:1928}, price:0, effect:\'50%\', spad:4.1}, 6: {time:\'5:53:42\', cost:{2:5099, 3:2878}, price:11, effect:\'60%\', spad:5.1}, 7: {time:\'7:07:28\', cost:{2:7197, 3:4058}, price:25, effect:\'70%\', spad:6.3}, 8: {time:\'8:27:51\', cost:{2:9724, 3:5479}, price:37, effect:\'80%\', spad:7.5}, 9: {time:\'9:54:31\', cost:{2:12697, 3:7151}, price:50, effect:\'90%\', spad:8.7}, 10: {time:\'11:27:09\', cost:{2:16132, 3:9083}, price:61, effect:\'100%\', spad:10.0}, 11: {time:\'13:05:32\', cost:{2:20044, 3:11284}, price:72, effect:\'110%\', spad:11.3}, 12: {time:\'14:49:25\', cost:{2:24447, 3:13761}, price:82, effect:\'120%\', spad:12.6}, 13: {time:\'16:38:39\', cost:{2:29354, 3:16521}, price:92, effect:\'130%\', spad:14.0}, 14: {time:\'18:33:02\', cost:{2:34778, 3:19572}, price:101, effect:\'140%\', spad:15.5}, 15: {time:\'20:32:27\', cost:{2:40730, 3:22920}, price:111, effect:\'150%\', spad:16.9}, 16: {time:\'22:36:43\', cost:{2:47220, 3:26571}, price:120, effect:\'160%\', spad:18.4}, 17: {time:\'24:45:45\', cost:{2:54260, 3:30531}, price:128, effect:\'170%\', spad:19.9}, 18: {time:\'26:59:25\', cost:{2:61860, 3:34805}, price:136, effect:\'180%\', spad:21.4}, 19: {time:\'29:17:37\', cost:{2:70029, 3:39400}, price:145, effect:\'190%\', spad:23.0}, 20: {time:\'31:40:15\', cost:{2:78776, 3:44321}, price:153, effect:\'200%\', spad:24.6}}, \
29: {1: {time:\'1:45:00\', cost:{2:250, 3:150}, price:0, effect:\'10%\', spad:0.5}, 2: {time:\'2:15:28\', cost:{2:563, 3:326}, price:0, effect:\'20%\', spad:1.2}, 3: {time:\'2:56:59\', cost:{2:1171, 3:668}, price:0, effect:\'30%\', spad:2.1}, 4: {time:\'3:47:50\', cost:{2:2110, 3:1196}, price:0, effect:\'40%\', spad:3.0}, 5: {time:\'4:46:59\', cost:{2:3411, 3:1928}, price:0, effect:\'50%\', spad:4.1}, 6: {time:\'5:53:42\', cost:{2:5099, 3:2878}, price:11, effect:\'60%\', spad:5.1}, 7: {time:\'7:07:28\', cost:{2:7197, 3:4058}, price:25, effect:\'70%\', spad:6.3}, 8: {time:\'8:27:51\', cost:{2:9724, 3:5479}, price:37, effect:\'80%\', spad:7.5}, 9: {time:\'9:54:31\', cost:{2:12697, 3:7151}, price:50, effect:\'90%\', spad:8.7}, 10: {time:\'11:27:09\', cost:{2:16132, 3:9083}, price:61, effect:\'100%\', spad:10.0}, 11: {time:\'13:05:32\', cost:{2:20044, 3:11284}, price:72, effect:\'110%\', spad:11.3}, 12: {time:\'14:49:25\', cost:{2:24447, 3:13761}, price:82, effect:\'120%\', spad:12.6}, 13: {time:\'16:38:39\', cost:{2:29354, 3:16521}, price:92, effect:\'130%\', spad:14.0}, 14: {time:\'18:33:02\', cost:{2:34778, 3:19572}, price:101, effect:\'140%\', spad:15.5}, 15: {time:\'20:32:27\', cost:{2:40730, 3:22920}, price:111, effect:\'150%\', spad:16.9}, 16: {time:\'22:36:43\', cost:{2:47220, 3:26571}, price:120, effect:\'160%\', spad:18.4}, 17: {time:\'24:45:45\', cost:{2:54260, 3:30531}, price:128, effect:\'170%\', spad:19.9}, 18: {time:\'26:59:25\', cost:{2:61860, 3:34805}, price:136, effect:\'180%\', spad:21.4}, 19: {time:\'29:17:37\', cost:{2:70029, 3:39400}, price:145, effect:\'190%\', spad:23.0}, 20: {time:\'31:40:15\', cost:{2:78776, 3:44321}, price:153, effect:\'200%\', spad:24.6}}, \
30: {1: {time:\'1:45:00\', cost:{2:250, 3:150}, price:0, effect:\'10%\', spad:0.5}, 2: {time:\'2:15:28\', cost:{2:563, 3:326}, price:0, effect:\'20%\', spad:1.2}, 3: {time:\'2:56:59\', cost:{2:1171, 3:668}, price:0, effect:\'30%\', spad:2.1}, 4: {time:\'3:47:50\', cost:{2:2110, 3:1196}, price:0, effect:\'40%\', spad:3.0}, 5: {time:\'4:46:59\', cost:{2:3411, 3:1928}, price:0, effect:\'50%\', spad:4.1}, 6: {time:\'5:53:42\', cost:{2:5099, 3:2878}, price:11, effect:\'60%\', spad:5.1}, 7: {time:\'7:07:28\', cost:{2:7197, 3:4058}, price:25, effect:\'70%\', spad:6.3}, 8: {time:\'8:27:51\', cost:{2:9724, 3:5479}, price:37, effect:\'80%\', spad:7.5}, 9: {time:\'9:54:31\', cost:{2:12697, 3:7151}, price:50, effect:\'90%\', spad:8.7}, 10: {time:\'11:27:09\', cost:{2:16132, 3:9083}, price:61, effect:\'100%\', spad:10.0}, 11: {time:\'13:05:32\', cost:{2:20044, 3:11284}, price:72, effect:\'110%\', spad:11.3}, 12: {time:\'14:49:25\', cost:{2:24447, 3:13761}, price:82, effect:\'120%\', spad:12.6}, 13: {time:\'16:38:39\', cost:{2:29354, 3:16521}, price:92, effect:\'130%\', spad:14.0}, 14: {time:\'18:33:02\', cost:{2:34778, 3:19572}, price:101, effect:\'140%\', spad:15.5}, 15: {time:\'20:32:27\', cost:{2:40730, 3:22920}, price:111, effect:\'150%\', spad:16.9}, 16: {time:\'22:36:43\', cost:{2:47220, 3:26571}, price:120, effect:\'160%\', spad:18.4}, 17: {time:\'24:45:45\', cost:{2:54260, 3:30531}, price:128, effect:\'170%\', spad:19.9}, 18: {time:\'26:59:25\', cost:{2:61860, 3:34805}, price:136, effect:\'180%\', spad:21.4}, 19: {time:\'29:17:37\', cost:{2:70029, 3:39400}, price:145, effect:\'190%\', spad:23.0}, 20: {time:\'31:40:15\', cost:{2:78776, 3:44321}, price:153, effect:\'200%\', spad:24.6}}, \
31: {1: {time:\'1:45:00\', cost:{2:250, 3:150}, price:0, effect:\'10%\', spad:0.5}, 2: {time:\'2:15:28\', cost:{2:563, 3:326}, price:0, effect:\'20%\', spad:1.2}, 3: {time:\'2:56:59\', cost:{2:1171, 3:668}, price:0, effect:\'30%\', spad:2.1}, 4: {time:\'3:47:50\', cost:{2:2110, 3:1196}, price:0, effect:\'40%\', spad:3.0}, 5: {time:\'4:46:59\', cost:{2:3411, 3:1928}, price:0, effect:\'50%\', spad:4.1}, 6: {time:\'5:53:42\', cost:{2:5099, 3:2878}, price:11, effect:\'60%\', spad:5.1}, 7: {time:\'7:07:28\', cost:{2:7197, 3:4058}, price:25, effect:\'70%\', spad:6.3}, 8: {time:\'8:27:51\', cost:{2:9724, 3:5479}, price:37, effect:\'80%\', spad:7.5}, 9: {time:\'9:54:31\', cost:{2:12697, 3:7151}, price:50, effect:\'90%\', spad:8.7}, 10: {time:\'11:27:09\', cost:{2:16132, 3:9083}, price:61, effect:\'100%\', spad:10.0}, 11: {time:\'13:05:32\', cost:{2:20044, 3:11284}, price:72, effect:\'110%\', spad:11.3}, 12: {time:\'14:49:25\', cost:{2:24447, 3:13761}, price:82, effect:\'120%\', spad:12.6}, 13: {time:\'16:38:39\', cost:{2:29354, 3:16521}, price:92, effect:\'130%\', spad:14.0}, 14: {time:\'18:33:02\', cost:{2:34778, 3:19572}, price:101, effect:\'140%\', spad:15.5}, 15: {time:\'20:32:27\', cost:{2:40730, 3:22920}, price:111, effect:\'150%\', spad:16.9}, 16: {time:\'22:36:43\', cost:{2:47220, 3:26571}, price:120, effect:\'160%\', spad:18.4}, 17: {time:\'24:45:45\', cost:{2:54260, 3:30531}, price:128, effect:\'170%\', spad:19.9}, 18: {time:\'26:59:25\', cost:{2:61860, 3:34805}, price:136, effect:\'180%\', spad:21.4}, 19: {time:\'29:17:37\', cost:{2:70029, 3:39400}, price:145, effect:\'190%\', spad:23.0}, 20: {time:\'31:40:15\', cost:{2:78776, 3:44321}, price:153, effect:\'200%\', spad:24.6}}, \
32: {1: {time:\'4:18:00\', cost:{2:500, 3:2000, 4:350}, price:0, effect:\'100%\', spad:0.0}, 2: {time:\'4:35:59\', cost:{2:545, 3:2365, 4:487}, price:0, effect:\'119%\', spad:0.0}, 3: {time:\'4:54:00\', cost:{2:604, 3:2839, 4:664}, price:0, effect:\'143%\', spad:0.0}, 4: {time:\'5:11:59\', cost:{2:675, 3:3400, 4:875}, price:0, effect:\'172%\', spad:0.0}, 5: {time:\'5:30:00\', cost:{2:754, 3:4036, 4:1113}, price:4, effect:\'205%\', spad:0.0}, 6: {time:\'5:48:00\', cost:{2:842, 3:4739, 4:1377}, price:10, effect:\'242%\', spad:0.0}, 7: {time:\'6:05:59\', cost:{2:938, 3:5504, 4:1664}, price:16, effect:\'282%\', spad:0.0}, 8: {time:\'6:24:00\', cost:{2:1040, 3:6325, 4:1972}, price:21, effect:\'324%\', spad:0.0}, 9: {time:\'6:42:00\', cost:{2:1150, 3:7200, 4:2300}, price:27, effect:\'370%\', spad:0.0}, 10: {time:\'7:00:00\', cost:{2:1265, 3:8124, 4:2646}, price:33, effect:\'418%\', spad:0.0}, 11: {time:\'7:18:00\', cost:{2:1387, 3:9096, 4:3011}, price:39, effect:\'469%\', spad:0.0}, 12: {time:\'7:36:00\', cost:{2:1514, 3:10113, 4:3392}, price:44, effect:\'521%\', spad:0.0}, 13: {time:\'7:54:00\', cost:{2:1646, 3:11174, 4:3790}, price:50, effect:\'577%\', spad:0.0}, 14: {time:\'8:11:59\', cost:{2:1784, 3:12276, 4:4203}, price:56, effect:\'634%\', spad:0.0}, 15: {time:\'8:30:00\', cost:{2:1927, 3:13418, 4:4632}, price:61, effect:\'693%\', spad:0.0}, 16: {time:\'8:48:00\', cost:{2:2075, 3:14600, 4:5075}, price:67, effect:\'755%\', spad:0.0}, 17: {time:\'9:06:00\', cost:{2:2227, 3:15818, 4:5531}, price:72, effect:\'818%\', spad:0.0}, 18: {time:\'9:24:00\', cost:{2:2384, 3:17073, 4:6002}, price:77, effect:\'883%\', spad:0.0}, 19: {time:\'9:41:59\', cost:{2:2545, 3:18363, 4:6486}, price:83, effect:\'950%\', spad:0.0}, 20: {time:\'10:00:00\', cost:{2:2711, 3:19688, 4:6983}, price:88, effect:\'1019%\', spad:0.0}}, \
33: {1: {time:\'4:05:59\', cost:{2:3550, 3:5800, 6:650}, price:4, effect:\'148%\', spad:10.3}, 2: {time:\'4:11:59\', cost:{2:2659, 3:4144, 6:729}, price:8, effect:\'156%\', spad:10.6}, 3: {time:\'4:18:00\', cost:{2:2947, 3:4360, 6:873}, price:12, effect:\'164%\', spad:10.9}, 4: {time:\'4:24:00\', cost:{2:3255, 3:4591, 6:1027}, price:16, effect:\'172%\', spad:11.2}, 5: {time:\'4:30:00\', cost:{2:3579, 3:4834, 6:1189}, price:20, effect:\'180%\', spad:11.5}, 6: {time:\'4:35:59\', cost:{2:3917, 3:5087, 6:1358}, price:24, effect:\'188%\', spad:11.8}, 7: {time:\'4:41:59\', cost:{2:4266, 3:5349, 6:1533}, price:28, effect:\'196%\', spad:12.1}, 8: {time:\'4:48:00\', cost:{2:4625, 3:5618, 6:1712}, price:32, effect:\'204%\', spad:12.4}, 9: {time:\'4:54:00\', cost:{2:4993, 3:5894, 6:1896}, price:36, effect:\'212%\', spad:12.7}, 10: {time:\'5:00:00\', cost:{2:5369, 3:6177, 6:2084}, price:40, effect:\'220%\', spad:13.0}, 11: {time:\'5:05:59\', cost:{2:5753, 3:6465, 6:2276}, price:44, effect:\'228%\', spad:13.3}, 12: {time:\'5:11:59\', cost:{2:6145, 3:6758, 6:2472}, price:48, effect:\'236%\', spad:13.6}, 13: {time:\'5:18:00\', cost:{2:6542, 3:7057, 6:2671}, price:52, effect:\'244%\', spad:13.9}, 14: {time:\'5:24:00\', cost:{2:6946, 3:7359, 6:2873}, price:56, effect:\'252%\', spad:14.2}, 15: {time:\'5:30:00\', cost:{2:7356, 3:7667, 6:3078}, price:60, effect:\'260%\', spad:14.5}, 16: {time:\'5:35:59\', cost:{2:7771, 3:7978, 6:3285}, price:64, effect:\'268%\', spad:14.8}, 17: {time:\'5:41:59\', cost:{2:8191, 3:8293, 6:3495}, price:68, effect:\'276%\', spad:15.1}, 18: {time:\'5:48:00\', cost:{2:8617, 3:8613, 6:3708}, price:72, effect:\'284%\', spad:15.4}, 19: {time:\'5:54:00\', cost:{2:9047, 3:8935, 6:3923}, price:76, effect:\'292%\', spad:15.7}, 20: {time:\'6:00:00\', cost:{2:9482, 3:9261, 6:4141}, price:80, effect:\'300%\', spad:16.0}}, \
34: {1: {time:\'2:33:35\', cost:{2:15705, 3:7800, 4:1050, 6:1650}, price:0, effect:\'42.0\', spad:0.0}, 2: {time:\'2:39:30\', cost:{2:4960, 3:2446, 4:623, 6:996}, price:0, effect:\'44.0\', spad:0.0}, 3: {time:\'2:46:45\', cost:{2:5259, 3:2617, 4:708, 6:1167}, price:0, effect:\'46.0\', spad:0.0}, 4: {time:\'2:55:04\', cost:{2:5591, 3:2806, 4:803, 6:1356}, price:0, effect:\'48.0\', spad:0.0}, 5: {time:\'3:04:15\', cost:{2:5948, 3:3010, 4:905, 6:1560}, price:0, effect:\'50.0\', spad:0.0}, 6: {time:\'3:14:13\', cost:{2:6327, 3:3227, 4:1013, 6:1777}, price:0, effect:\'52.0\', spad:0.0}, 7: {time:\'3:24:52\', cost:{2:6726, 3:3454, 4:1127, 6:2004}, price:9, effect:\'54.0\', spad:0.0}, 8: {time:\'3:36:09\', cost:{2:7142, 3:3692, 4:1246, 6:2242}, price:20, effect:\'56.0\', spad:0.0}, 9: {time:\'3:48:01\', cost:{2:7574, 3:3939, 4:1369, 6:2489}, price:30, effect:\'58.0\', spad:0.0}, 10: {time:\'4:00:25\', cost:{2:8021, 3:4195, 4:1497, 6:2745}, price:41, effect:\'60.0\', spad:0.0}, 11: {time:\'4:13:20\', cost:{2:8482, 3:4458, 4:1629, 6:3008}, price:51, effect:\'62.0\', spad:0.0}, 12: {time:\'4:26:43\', cost:{2:8955, 3:4728, 4:1764, 6:3278}, price:61, effect:\'64.0\', spad:0.0}, 13: {time:\'4:40:33\', cost:{2:9440, 3:5006, 4:1903, 6:3556}, price:70, effect:\'66.0\', spad:0.0}, 14: {time:\'4:54:50\', cost:{2:9937, 3:5290, 4:2045, 6:3840}, price:80, effect:\'68.0\', spad:0.0}, 15: {time:\'5:09:31\', cost:{2:10445, 3:5580, 4:2190, 6:4130}, price:89, effect:\'70.0\', spad:0.0}, 16: {time:\'5:24:36\', cost:{2:10962, 3:5875, 4:2337, 6:4425}, price:98, effect:\'72.0\', spad:0.0}, 17: {time:\'5:40:04\', cost:{2:11490, 3:6177, 4:2488, 6:4727}, price:107, effect:\'74.0\', spad:0.0}, 18: {time:\'5:55:54\', cost:{2:12027, 3:6484, 4:2642, 6:5034}, price:116, effect:\'76.0\', spad:0.0}, 19: {time:\'6:12:06\', cost:{2:12572, 3:6795, 4:2797, 6:5345}, price:125, effect:\'78.0\', spad:0.0}, 20: {time:\'6:28:38\', cost:{2:13127, 3:7112, 4:2956, 6:5662}, price:134, effect:\'80.0\', spad:0.0}}, \
35: {1: {time:\'2:33:35\', cost:{2:1500, 3:2250, 4:50, 6:15}, price:0, effect:\'10%\', spad:0.4}, 2: {time:\'2:39:30\', cost:{2:1646, 3:2505, 4:123, 6:36}, price:0, effect:\'20%\', spad:0.8}, 3: {time:\'2:46:45\', cost:{2:1817, 3:2804, 4:208, 6:62}, price:0, effect:\'30%\', spad:1.2}, 4: {time:\'2:55:04\', cost:{2:2006, 3:3136, 4:303, 6:90}, price:3, effect:\'40%\', spad:1.6}, 5: {time:\'3:04:15\', cost:{2:2210, 3:3493, 4:405, 6:121}, price:7, effect:\'50%\', spad:2.0}, 6: {time:\'3:14:13\', cost:{2:2427, 3:3872, 4:513, 6:154}, price:11, effect:\'60%\', spad:2.4}, 7: {time:\'3:24:52\', cost:{2:2654, 3:4271, 4:627, 6:188}, price:15, effect:\'70%\', spad:2.8}, 8: {time:\'3:36:09\', cost:{2:2892, 3:4687, 4:746, 6:223}, price:19, effect:\'80%\', spad:3.2}, 9: {time:\'3:48:01\', cost:{2:3139, 3:5119, 4:869, 6:260}, price:23, effect:\'90%\', spad:3.6}, 10: {time:\'4:00:25\', cost:{2:3395, 3:5566, 4:997, 6:299}, price:27, effect:\'100%\', spad:4.0}, 11: {time:\'4:13:20\', cost:{2:3658, 3:6027, 4:1129, 6:338}, price:31, effect:\'110%\', spad:4.4}, 12: {time:\'4:26:43\', cost:{2:3928, 3:6500, 4:1264, 6:379}, price:35, effect:\'120%\', spad:4.8}, 13: {time:\'4:40:33\', cost:{2:4206, 3:6985, 4:1403, 6:420}, price:39, effect:\'130%\', spad:5.2}, 14: {time:\'4:54:50\', cost:{2:4490, 3:7482, 4:1545, 6:463}, price:43, effect:\'140%\', spad:5.6}, 15: {time:\'5:09:31\', cost:{2:4780, 3:7990, 4:1690, 6:507}, price:47, effect:\'150%\', spad:6.0}, 16: {time:\'5:24:36\', cost:{2:5075, 3:8507, 4:1837, 6:551}, price:51, effect:\'160%\', spad:6.4}, 17: {time:\'5:40:04\', cost:{2:5377, 3:9035, 4:1988, 6:596}, price:55, effect:\'170%\', spad:6.8}, 18: {time:\'5:55:54\', cost:{2:5684, 3:9572, 4:2142, 6:642}, price:59, effect:\'180%\', spad:7.2}, 19: {time:\'6:12:06\', cost:{2:5995, 3:10117, 4:2297, 6:689}, price:63, effect:\'190%\', spad:7.6}, 20: {time:\'6:28:38\', cost:{2:6312, 3:10672, 4:2456, 6:736}, price:67, effect:\'200%\', spad:8.0}}, \
36: {1: {time:\'1:47:59\', cost:{2:350, 3:240}, price:0, effect:\'10%\', spad:0.4}, 2: {time:\'2:05:59\', cost:{2:498, 3:339}, price:0, effect:\'18%\', spad:0.9}, 3: {time:\'2:24:00\', cost:{2:723, 3:488}, price:0, effect:\'26%\', spad:1.3}, 4: {time:\'2:42:00\', cost:{2:1017, 3:685}, price:0, effect:\'34%\', spad:1.8}, 5: {time:\'3:00:00\', cost:{2:1377, 3:924}, price:0, effect:\'42%\', spad:2.3}, 6: {time:\'3:18:00\', cost:{2:1799, 3:1206}, price:0, effect:\'50%\', spad:2.9}, 7: {time:\'3:36:00\', cost:{2:2282, 3:1528}, price:0, effect:\'57%\', spad:3.4}, 8: {time:\'3:54:00\', cost:{2:2823, 3:1888}, price:5, effect:\'64%\', spad:3.9}, 9: {time:\'4:12:00\', cost:{2:3421, 3:2287}, price:13, effect:\'72%\', spad:4.5}, 10: {time:\'4:30:00\', cost:{2:4075, 3:2723}, price:20, effect:\'79%\', spad:5.0}, 11: {time:\'4:48:00\', cost:{2:4784, 3:3196}, price:27, effect:\'86%\', spad:5.6}, 12: {time:\'5:06:00\', cost:{2:5546, 3:3704}, price:33, effect:\'93%\', spad:6.2}, 13: {time:\'5:24:00\', cost:{2:6360, 3:4247}, price:40, effect:\'100%\', spad:6.7}, 14: {time:\'5:42:00\', cost:{2:7227, 3:4824}, price:46, effect:\'107%\', spad:7.3}, 15: {time:\'6:00:00\', cost:{2:8144, 3:5436}, price:53, effect:\'114%\', spad:7.9}, 16: {time:\'6:18:00\', cost:{2:9112, 3:6081}, price:59, effect:\'121%\', spad:8.4}, 17: {time:\'6:36:00\', cost:{2:10129, 3:6759}, price:65, effect:\'128%\', spad:9.0}, 18: {time:\'6:54:00\', cost:{2:11195, 3:7470}, price:71, effect:\'134%\', spad:9.6}, 19: {time:\'7:12:00\', cost:{2:12310, 3:8213}, price:77, effect:\'141%\', spad:10.2}, 20: {time:\'7:30:00\', cost:{2:13472, 3:8988}, price:82, effect:\'148%\', spad:10.8}}, \
37: {1: {time:\'5:15:00\', cost:{2:5350, 3:8100, 6:2250}, price:45, effect:\'3.0\', spad:0.0}, 2: {time:\'5:30:00\', cost:{2:5861, 3:8977, 6:2615}, price:60, effect:\'6.0\', spad:0.0}, 3: {time:\'5:45:00\', cost:{2:6459, 3:10002, 6:3042}, price:75, effect:\'9.0\', spad:0.0}, 4: {time:\'6:00:00\', cost:{2:7122, 3:11137, 6:3515}, price:90, effect:\'12.0\', spad:0.0}, 5: {time:\'6:15:00\', cost:{2:7836, 3:12361, 6:4025}, price:105, effect:\'15.0\', spad:0.0}, 6: {time:\'6:30:00\', cost:{2:8594, 3:13662, 6:4567}, price:120, effect:\'18.0\', spad:0.0}, 7: {time:\'6:45:00\', cost:{2:9392, 3:15029, 6:5137}, price:135, effect:\'21.0\', spad:0.0}, 8: {time:\'7:00:00\', cost:{2:10224, 3:16457, 6:5732}, price:150, effect:\'24.0\', spad:0.0}, 9: {time:\'7:15:00\', cost:{2:11089, 3:17939, 6:6349}, price:165, effect:\'27.0\', spad:0.0}, 10: {time:\'7:30:00\', cost:{2:11983, 3:19471, 6:6988}, price:180, effect:\'30.0\', spad:0.0}, 11: {time:\'7:45:00\', cost:{2:12904, 3:21050, 6:7646}, price:195, effect:\'33.0\', spad:0.0}, 12: {time:\'8:00:00\', cost:{2:13851, 3:22673, 6:8322}, price:210, effect:\'36.0\', spad:0.0}, 13: {time:\'8:15:00\', cost:{2:14821, 3:24337, 6:9015}, price:225, effect:\'39.0\', spad:0.0}, 14: {time:\'8:30:00\', cost:{2:15815, 3:26040, 6:9725}, price:240, effect:\'42.0\', spad:0.0}, 15: {time:\'8:45:00\', cost:{2:16830, 3:27780, 6:10450}, price:255, effect:\'45.0\', spad:0.0}, 16: {time:\'9:00:00\', cost:{2:17865, 3:29555, 6:11189}, price:270, effect:\'48.0\', spad:0.0}, 17: {time:\'9:15:00\', cost:{2:18920, 3:31363, 6:11943}, price:285, effect:\'51.0\', spad:0.0}, 18: {time:\'9:30:00\', cost:{2:19994, 3:33204, 6:12710}, price:300, effect:\'54.0\', spad:0.0}, 19: {time:\'9:45:00\', cost:{2:21085, 3:35075, 6:13489}, price:315, effect:\'57.0\', spad:0.0}, 20: {time:\'10:00:00\', cost:{2:22195, 3:36977, 6:14282}, price:330, effect:\'60.0\', spad:0.0}}, \
38: {1: {time:\'3:12:00\', cost:{2:9125, 3:6100, 4:1570, 6:1080}, price:0, effect:\'24\', spad:0.0}, 2: {time:\'3:24:00\', cost:{2:3329, 3:2263, 4:684, 6:429}, price:0, effect:\'28\', spad:0.0}, 3: {time:\'3:35:59\', cost:{2:3581, 3:2465, 4:825, 6:489}, price:0, effect:\'32\', spad:0.0}, 4: {time:\'3:47:59\', cost:{2:3870, 3:2696, 4:987, 6:558}, price:0, effect:\'36\', spad:0.0}, 5: {time:\'4:00:00\', cost:{2:4189, 3:2951, 4:1166, 6:635}, price:0, effect:\'40\', spad:0.0}, 6: {time:\'4:11:59\', cost:{2:4535, 3:3228, 4:1360, 6:718}, price:0, effect:\'44\', spad:0.0}, 7: {time:\'4:24:00\', cost:{2:4905, 3:3524, 4:1567, 6:807}, price:0, effect:\'48\', spad:0.0}, 8: {time:\'4:35:59\', cost:{2:5297, 3:3837, 4:1786, 6:901}, price:0, effect:\'52\', spad:0.0}, 9: {time:\'4:48:00\', cost:{2:5709, 3:4167, 4:2017, 6:1000}, price:0, effect:\'56\', spad:0.0}, 10: {time:\'5:00:00\', cost:{2:6139, 3:4511, 4:2258, 6:1103}, price:0, effect:\'60\', spad:0.0}, 11: {time:\'5:11:59\', cost:{2:6588, 3:4870, 4:2509, 6:1211}, price:0, effect:\'64\', spad:0.0}, 12: {time:\'5:24:00\', cost:{2:7052, 3:5242, 4:2769, 6:1322}, price:0, effect:\'68\', spad:0.0}, 13: {time:\'5:35:59\', cost:{2:7533, 3:5626, 4:3038, 6:1438}, price:0, effect:\'72\', spad:0.0}, 14: {time:\'5:48:00\', cost:{2:8029, 3:6023, 4:3316, 6:1556}, price:0, effect:\'76\', spad:0.0}, 15: {time:\'6:00:00\', cost:{2:8539, 3:6431, 4:3601, 6:1679}, price:0, effect:\'80\', spad:0.0}, 16: {time:\'6:11:59\', cost:{2:9062, 3:6850, 4:3895, 6:1805}, price:0, effect:\'84\', spad:0.0}, 17: {time:\'6:24:00\', cost:{2:9599, 3:7279, 4:4195, 6:1933}, price:0, effect:\'88\', spad:0.0}, 18: {time:\'6:35:59\', cost:{2:10149, 3:7719, 4:4503, 6:2065}, price:0, effect:\'92\', spad:0.0}, 19: {time:\'6:48:00\', cost:{2:10711, 3:8169, 4:4818, 6:2200}, price:0, effect:\'96\', spad:0.0}, 20: {time:\'7:00:00\', cost:{2:11286, 3:8628, 4:5140, 6:2338}, price:0, effect:\'100\', spad:0.0}}, \
39: {1: {time:\'6:09:00\', cost:{2:10950, 3:12200, 4:2800, 6:1620}, price:0, effect:\'528 6%\', spad:8.6}, 2: {time:\'6:18:00\', cost:{2:3321, 3:3428, 4:857, 6:1757}, price:0, effect:\'548 10%\', spad:9.2}, 3: {time:\'6:26:59\', cost:{2:3502, 3:3669, 4:917, 6:1901}, price:0, effect:\'567 14%\', spad:9.8}, 4: {time:\'6:35:59\', cost:{2:3689, 3:3918, 4:979, 6:2051}, price:0, effect:\'584 17%\', spad:10.4}, 5: {time:\'6:45:00\', cost:{2:3880, 3:4174, 4:1043, 6:2204}, price:0, effect:\'601 20%\', spad:11.0}, 6: {time:\'6:54:00\', cost:{2:4076, 3:4435, 4:1108, 6:2361}, price:0, effect:\'617 22%\', spad:11.6}, 7: {time:\'7:03:00\', cost:{2:4275, 3:4700, 4:1175, 6:2520}, price:0, effect:\'632 24%\', spad:12.2}, 8: {time:\'7:11:59\', cost:{2:4477, 3:4969, 4:1242, 6:2681}, price:0, effect:\'647 26%\', spad:12.8}, 9: {time:\'7:20:59\', cost:{2:4681, 3:5242, 4:1310, 6:2845}, price:0, effect:\'662 28%\', spad:13.4}, 10: {time:\'7:30:00\', cost:{2:4888, 3:5517, 4:1379, 6:3010}, price:0, effect:\'676 30%\', spad:14.0}, 11: {time:\'7:39:00\', cost:{2:5097, 3:5796, 4:1449, 6:3177}, price:0, effect:\'690 32%\', spad:14.6}, 12: {time:\'7:48:00\', cost:{2:5307, 3:6077, 4:1519, 6:3346}, price:0, effect:\'704 33%\', spad:15.2}, 13: {time:\'7:57:00\', cost:{2:5520, 3:6360, 4:1590, 6:3516}, price:0, effect:\'717 35%\', spad:15.8}, 14: {time:\'8:06:00\', cost:{2:5734, 3:6645, 4:1661, 6:3687}, price:0, effect:\'731 36%\', spad:16.4}, 15: {time:\'8:15:00\', cost:{2:5949, 3:6933, 4:1733, 6:3859}, price:0, effect:\'744 37%\', spad:17.0}, 16: {time:\'8:23:59\', cost:{2:6166, 3:7222, 4:1805, 6:4033}, price:0, effect:\'757 39%\', spad:17.6}, 17: {time:\'8:33:00\', cost:{2:6385, 3:7513, 4:1878, 6:4208}, price:0, effect:\'770 40%\', spad:18.2}, 18: {time:\'8:41:59\', cost:{2:6604, 3:7806, 4:1951, 6:4383}, price:0, effect:\'782 41%\', spad:18.8}, 19: {time:\'8:51:00\', cost:{2:6825, 3:8101, 4:2025, 6:4560}, price:0, effect:\'795 42%\', spad:19.4}, 20: {time:\'9:00:00\', cost:{2:7047, 3:8397, 4:2099, 6:4738}, price:0, effect:\'807 43%\', spad:20.0}}, \
40: {1: {time:\'4:00:00\', cost:{2:10100, 3:15500, 4:3300}, price:0, effect:\'10%\', spad:1.5}, 2: {time:\'4:15:00\', cost:{2:10246, 3:16231, 4:3738}, price:0, effect:\'20%\', spad:3.0}, 3: {time:\'4:30:00\', cost:{2:10417, 3:17085, 4:4251}, price:0, effect:\'30%\', spad:4.5}, 4: {time:\'4:45:00\', cost:{2:10606, 3:18031, 4:4818}, price:0, effect:\'40%\', spad:6.0}, 5: {time:\'5:00:00\', cost:{2:10810, 3:19051, 4:5430}, price:0, effect:\'50%\', spad:7.5}, 6: {time:\'5:15:00\', cost:{2:11027, 3:20135, 4:6081}, price:0, effect:\'60%\', spad:9.0}, 7: {time:\'5:30:00\', cost:{2:11254, 3:21274, 4:6764}, price:0, effect:\'70%\', spad:10.5}, 8: {time:\'5:45:00\', cost:{2:11492, 3:22464, 4:7478}, price:0, effect:\'80%\', spad:12.0}, 9: {time:\'6:00:00\', cost:{2:11739, 3:23699, 4:8219}, price:0, effect:\'90%\', spad:13.5}, 10: {time:\'6:15:00\', cost:{2:11995, 3:24976, 4:8985}, price:0, effect:\'100%\', spad:15.0}, 11: {time:\'6:30:00\', cost:{2:12258, 3:26292, 4:9775}, price:0, effect:\'110%\', spad:16.5}, 12: {time:\'6:45:00\', cost:{2:12528, 3:27644, 4:10586}, price:0, effect:\'120%\', spad:18.0}, 13: {time:\'7:00:00\', cost:{2:12806, 3:29031, 4:11418}, price:0, effect:\'130%\', spad:19.5}, 14: {time:\'7:15:00\', cost:{2:13090, 3:30450, 4:12270}, price:0, effect:\'140%\', spad:21.0}, 15: {time:\'7:30:00\', cost:{2:13380, 3:31900, 4:13140}, price:0, effect:\'150%\', spad:22.5}, 16: {time:\'7:45:00\', cost:{2:13675, 3:33379, 4:14027}, price:0, effect:\'160%\', spad:24.0}, 17: {time:\'8:00:00\', cost:{2:13977, 3:34886, 4:14931}, price:0, effect:\'170%\', spad:25.5}, 18: {time:\'8:15:00\', cost:{2:14284, 3:36420, 4:15852}, price:0, effect:\'180%\', spad:27.0}, 19: {time:\'8:30:00\', cost:{2:14595, 3:37979, 4:16787}, price:0, effect:\'190%\', spad:28.5}, 20: {time:\'8:45:00\', cost:{2:14912, 3:39564, 4:17738}, price:0, effect:\'200%\', spad:30.0}}, \
41: {1: {time:\'6:30:00\', cost:{2:50000, 3:50000, 4:21200}, price:218, effect:\'200%\', spad:0.0}, 2: {time:\'7:00:00\', cost:{2:50000, 3:50000, 4:22756}, price:247, effect:\'232%\', spad:0.0}, 3: {time:\'7:30:00\', cost:{2:50000, 3:50000, 4:24484}, price:283, effect:\'272%\', spad:0.0}, 4: {time:\'8:00:00\', cost:{2:50000, 3:50000, 4:26333, 5:3667}, price:325, effect:\'318%\', spad:0.0}, 5: {time:\'8:30:00\', cost:{2:50000, 3:50000, 4:28278, 5:7556}, price:371, effect:\'369%\', spad:0.0}, 6: {time:\'9:00:00\', cost:{2:50000, 3:50000, 4:30302, 5:11605}, price:421, effect:\'424%\', spad:0.0}, 7: {time:\'9:30:00\', cost:{2:50000, 3:50000, 4:32396, 5:15792}, price:474, effect:\'483%\', spad:0.0}, 8: {time:\'10:00:00\', cost:{2:50000, 3:50000, 4:34550, 5:20101}, price:530, effect:\'546%\', spad:0.0}, 9: {time:\'10:30:00\', cost:{2:50000, 3:50000, 4:36759, 5:24519}, price:590, effect:\'611%\', spad:0.0}, 10: {time:\'11:00:00\', cost:{2:50000, 3:50000, 4:39018, 5:29037}, price:652, effect:\'680%\', spad:0.0}, 11: {time:\'11:30:00\', cost:{2:50000, 3:50000, 4:41323, 5:33646}, price:716, effect:\'751%\', spad:0.0}, 12: {time:\'12:00:00\', cost:{2:50000, 3:50000, 4:43670, 5:38340}, price:783, effect:\'825%\', spad:0.0}, 13: {time:\'12:30:00\', cost:{2:50000, 3:50000, 4:46056, 5:43112}, price:852, effect:\'902%\', spad:0.0}, 14: {time:\'13:00:00\', cost:{2:50000, 3:50000, 4:48479, 5:47959}, price:924, effect:\'981%\', spad:0.0}, 15: {time:\'13:30:00\', cost:{2:50000, 3:50000, 4:50937, 5:52875}, price:997, effect:\'1062%\', spad:0.0}, 16: {time:\'14:00:00\', cost:{2:50000, 3:50000, 4:53429, 5:57858}, price:1073, effect:\'1146%\', spad:0.0}, 17: {time:\'14:30:00\', cost:{2:50000, 3:50000, 4:55951, 5:62903}, price:1150, effect:\'1231%\', spad:0.0}, 18: {time:\'15:00:00\', cost:{2:50000, 3:50000, 4:58504, 5:68008}, price:1229, effect:\'1319%\', spad:0.0}, 19: {time:\'15:30:00\', cost:{2:50000, 3:50000, 4:61085, 5:73170}, price:1310, effect:\'1409%\', spad:0.0}, 20: {time:\'16:00:00\', cost:{2:50000, 3:50000, 4:63693, 5:78387}, price:1393, effect:\'1500%\', spad:0.0}}, \
42: {1: {time:\'3:30:00\', cost:{2:2250, 3:3500, 4:950}, price:20, effect:\'10%\', spad:0.5}, 2: {time:\'4:00:00\', cost:{2:2784, 3:4569, 4:1270}, price:45, effect:\'20%\', spad:1.2}, 3: {time:\'4:30:00\', cost:{2:3531, 3:6063, 4:1719}, price:74, effect:\'30%\', spad:2.1}, 4: {time:\'5:00:00\', cost:{2:4462, 3:7924, 4:2277}, price:105, effect:\'40%\', spad:3.0}, 5: {time:\'5:30:00\', cost:{2:5558, 3:10116, 4:2934}, price:137, effect:\'50%\', spad:4.1}, 6: {time:\'6:00:00\', cost:{2:6807, 3:12614, 4:3684}, price:171, effect:\'60%\', spad:5.1}, 7: {time:\'6:30:00\', cost:{2:8199, 3:15398, 4:4519}, price:206, effect:\'70%\', spad:6.3}, 8: {time:\'7:00:00\', cost:{2:9727, 3:18454, 4:5436}, price:242, effect:\'80%\', spad:7.5}, 9: {time:\'7:30:00\', cost:{2:11385, 3:21770, 4:6431}, price:279, effect:\'90%\', spad:8.7}, 10: {time:\'8:00:00\', cost:{2:13167, 3:25334, 4:7500}, price:316, effect:\'100%\', spad:10.0}, 11: {time:\'8:30:00\', cost:{2:15068, 3:29137, 4:8641}, price:355, effect:\'110%\', spad:11.3}, 12: {time:\'9:00:00\', cost:{2:17086, 3:33173, 4:9851}, price:394, effect:\'120%\', spad:12.6}, 13: {time:\'9:30:00\', cost:{2:19216, 3:37433, 4:11129}, price:434, effect:\'130%\', spad:14.0}, 14: {time:\'10:00:00\', cost:{2:21455, 3:41911, 4:12473}, price:474, effect:\'140%\', spad:15.5}, 15: {time:\'10:30:00\', cost:{2:23801, 3:46603, 4:13881}, price:515, effect:\'150%\', spad:16.9}, 16: {time:\'11:00:00\', cost:{2:26251, 3:51502, 4:15350}, price:557, effect:\'160%\', spad:18.4}, 17: {time:\'11:30:00\', cost:{2:28802, 3:56605, 4:16881}, price:599, effect:\'170%\', spad:19.9}, 18: {time:\'12:00:00\', cost:{2:31453, 3:61907, 4:18472}, price:641, effect:\'180%\', spad:21.4}, 19: {time:\'12:30:00\', cost:{2:34202, 3:67404, 4:20121}, price:684, effect:\'190%\', spad:23.0}, 20: {time:\'13:00:00\', cost:{2:37046, 3:73092, 4:21827}, price:728, effect:\'200%\', spad:24.6}}, \
43: {1: {time:\'2:12:00\', cost:{2:55, 3:55}, price:0, effect:\'\', spad:0.0}, 2: {time:\'2:24:00\', cost:{2:60, 3:60}, price:0, effect:\'\', spad:0.0}, 3: {time:\'2:35:59\', cost:{2:65, 3:65}, price:0, effect:\'\', spad:0.0}, 4: {time:\'2:47:59\', cost:{2:70, 3:70}, price:0, effect:\'\', spad:0.0}, 5: {time:\'3:00:00\', cost:{2:75, 3:75}, price:0, effect:\'\', spad:0.0}, 6: {time:\'3:12:00\', cost:{2:80, 3:80, 6:5}, price:0, effect:\'\', spad:0.0}, 7: {time:\'3:24:00\', cost:{2:85, 3:85, 6:10}, price:0, effect:\'\', spad:0.0}, 8: {time:\'3:35:59\', cost:{2:90, 3:90, 6:15}, price:0, effect:\'\', spad:0.0}, 9: {time:\'3:47:59\', cost:{2:95, 3:95, 6:20}, price:0, effect:\'\', spad:0.0}, 10: {time:\'4:00:00\', cost:{2:100, 3:100, 6:25}, price:0, effect:\'\', spad:0.0}, 11: {time:\'4:11:59\', cost:{2:105, 3:105, 6:30}, price:0, effect:\'\', spad:0.0}, 12: {time:\'4:24:00\', cost:{2:110, 3:110, 6:35}, price:0, effect:\'\', spad:0.0}, 13: {time:\'4:35:59\', cost:{2:115, 3:115, 6:40}, price:0, effect:\'\', spad:0.0}, 14: {time:\'4:48:00\', cost:{2:120, 3:120, 6:45}, price:0, effect:\'\', spad:0.0}, 15: {time:\'5:00:00\', cost:{2:125, 3:125, 6:50}, price:0, effect:\'\', spad:0.0}, 16: {time:\'5:11:59\', cost:{2:130, 3:130, 6:55}, price:0, effect:\'\', spad:0.0}, 17: {time:\'5:24:00\', cost:{2:135, 3:135, 6:60}, price:0, effect:\'\', spad:0.0}, 18: {time:\'5:35:59\', cost:{2:140, 3:140, 6:65}, price:0, effect:\'\', spad:0.0}, 19: {time:\'5:48:00\', cost:{2:145, 3:145, 6:70}, price:0, effect:\'\', spad:0.0}, 20: {time:\'6:00:00\', cost:{2:150, 3:150, 6:75}, price:0, effect:\'\', spad:0.0}}, \
44: {1: {time:\'5:11:59\', cost:{2:8750, 3:50500}, price:45, effect:\'210%\', spad:0.0}, 2: {time:\'5:24:00\', cost:{2:2746, 3:16231}, price:51, effect:\'220%\', spad:0.0}, 3: {time:\'5:35:59\', cost:{2:2917, 3:17085}, price:58, effect:\'230%\', spad:0.0}, 4: {time:\'5:48:00\', cost:{2:3106, 3:18031}, price:66, effect:\'240%\', spad:0.0}, 5: {time:\'6:00:00\', cost:{2:3310, 3:19051}, price:74, effect:\'250%\', spad:0.0}, 6: {time:\'6:11:59\', cost:{2:3527, 3:20135}, price:82, effect:\'260%\', spad:0.0}, 7: {time:\'6:24:00\', cost:{2:3754, 3:21274}, price:91, effect:\'270%\', spad:0.0}, 8: {time:\'6:35:59\', cost:{2:3992, 3:22464}, price:100, effect:\'280%\', spad:0.0}, 9: {time:\'6:48:00\', cost:{2:4239, 3:23699}, price:109, effect:\'290%\', spad:0.0}, 10: {time:\'7:00:00\', cost:{2:4495, 3:24976}, price:119, effect:\'300%\', spad:0.0}, 11: {time:\'7:11:59\', cost:{2:4758, 3:26292}, price:128, effect:\'310%\', spad:0.0}, 12: {time:\'7:24:00\', cost:{2:5028, 3:27644}, price:138, effect:\'320%\', spad:0.0}, 13: {time:\'7:35:59\', cost:{2:5306, 3:29031}, price:148, effect:\'330%\', spad:0.0}, 14: {time:\'7:48:00\', cost:{2:5590, 3:30450}, price:158, effect:\'340%\', spad:0.0}, 15: {time:\'8:00:00\', cost:{2:5880, 3:31900}, price:168, effect:\'350%\', spad:0.0}, 16: {time:\'8:11:59\', cost:{2:6175, 3:33379}, price:179, effect:\'360%\', spad:0.0}, 17: {time:\'8:23:59\', cost:{2:6477, 3:34886}, price:189, effect:\'370%\', spad:0.0}, 18: {time:\'8:36:00\', cost:{2:6784, 3:36420}, price:200, effect:\'380%\', spad:0.0}, 19: {time:\'8:48:00\', cost:{2:7095, 3:37979}, price:211, effect:\'390%\', spad:0.0}, 20: {time:\'9:00:00\', cost:{2:7412, 3:39564}, price:222, effect:\'400%\', spad:0.0}}, \
45: {1: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:3000, effect:\'\', spad:6.0}, 2: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:6000, effect:\'\', spad:12.0}, 3: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:9000, effect:\'\', spad:18.0}, 4: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:12000, effect:\'\', spad:24.0}, 5: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:15000, effect:\'\', spad:30.0}, 6: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:18000, effect:\'\', spad:36.0}, 7: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:21000, effect:\'\', spad:42.0}, 8: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:24000, effect:\'\', spad:48.0}, 9: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:27000, effect:\'\', spad:54.0}, 10: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:30000, effect:\'\', spad:60.0}, 11: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:33000, effect:\'\', spad:66.0}, 12: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:36000, effect:\'\', spad:72.0}, 13: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:39000, effect:\'\', spad:78.0}, 14: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:42000, effect:\'\', spad:84.0}, 15: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:45000, effect:\'\', spad:90.0}, 16: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:48000, effect:\'\', spad:96.0}, 17: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:51000, effect:\'\', spad:102.0}, 18: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:54000, effect:\'\', spad:108.0}, 19: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:57000, effect:\'\', spad:114.0}, 20: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:60000, effect:\'\', spad:120.0}}, \
46: {1: {time:\'8:15:00\', cost:{2:21000, 3:41500, 4:11000}, price:35, effect:\'10%\', spad:1.5}, 2: {time:\'8:30:00\', cost:{2:22143, 3:43215, 4:12143, 9:1143}, price:47, effect:\'20%\', spad:3.0}, 3: {time:\'8:45:00\', cost:{2:23348, 3:45022, 4:13348, 9:2348}, price:62, effect:\'30%\', spad:4.5}, 4: {time:\'9:00:00\', cost:{2:24594, 3:46892, 4:14594, 9:3594}, price:77, effect:\'40%\', spad:6.0}, 5: {time:\'9:15:00\', cost:{2:25873, 3:48809, 4:15873, 9:4873}, price:93, effect:\'50%\', spad:7.5}, 6: {time:\'9:30:00\', cost:{2:27177, 3:50766, 4:17177, 9:6177}, price:110, effect:\'60%\', spad:9.0}, 7: {time:\'9:45:00\', cost:{2:28503, 3:52755, 4:18503, 9:7503}, price:128, effect:\'70%\', spad:10.5}, 8: {time:\'10:00:00\', cost:{2:29849, 3:54773, 4:19849, 9:8849}, price:146, effect:\'80%\', spad:12.0}, 9: {time:\'10:15:00\', cost:{2:31211, 3:56817, 4:21211, 9:10211}, price:164, effect:\'90%\', spad:13.5}, 10: {time:\'10:30:00\', cost:{2:32589, 3:58883, 4:22589, 9:11589}, price:183, effect:\'100%\', spad:15.0}, 11: {time:\'10:45:00\', cost:{2:33980, 3:60971, 4:23980, 9:12980}, price:202, effect:\'110%\', spad:16.5}, 12: {time:\'11:00:00\', cost:{2:35385, 3:63077, 4:25385, 9:14385}, price:222, effect:\'120%\', spad:18.0}, 13: {time:\'11:15:00\', cost:{2:36801, 3:65201, 4:26801, 9:15801}, price:242, effect:\'130%\', spad:19.5}, 14: {time:\'11:30:00\', cost:{2:38228, 3:67342, 4:28228, 9:17228}, price:262, effect:\'140%\', spad:21.0}, 15: {time:\'11:45:00\', cost:{2:39665, 3:69497, 4:29665, 9:18665}, price:282, effect:\'150%\', spad:22.5}, 16: {time:\'12:00:00\', cost:{2:41112, 3:71668, 4:31112, 9:20112}, price:303, effect:\'160%\', spad:24.0}, 17: {time:\'12:15:00\', cost:{2:42568, 3:73852, 4:32568, 9:21568}, price:324, effect:\'170%\', spad:25.5}, 18: {time:\'12:30:00\', cost:{2:44032, 3:76048, 4:34032, 9:23032}, price:345, effect:\'180%\', spad:27.0}, 19: {time:\'12:45:00\', cost:{2:45505, 3:78257, 4:35505, 9:24505}, price:367, effect:\'190%\', spad:28.5}, 20: {time:\'13:00:00\', cost:{2:46985, 3:80478, 4:36985, 9:25985}, price:389, effect:\'200%\', spad:30.0}}, \
47: {1: {time:\'5:05:59\', cost:{2:8500, 3:16500, 4:4400, 7:5500, 20:500}, price:50, effect:\'20%\', spad:2.0}, 2: {time:\'5:11:59\', cost:{2:9962, 3:18693, 4:4984, 7:6231, 20:1231}, price:107, effect:\'40%\', spad:4.0}, 3: {time:\'5:18:00\', cost:{2:11671, 3:21256, 4:5668, 7:7085, 20:2085}, price:167, effect:\'60%\', spad:6.0}, 4: {time:\'5:24:00\', cost:{2:13562, 3:24094, 4:6425, 7:8031, 20:3031}, price:229, effect:\'80%\', spad:8.0}, 5: {time:\'5:30:00\', cost:{2:15603, 3:27154, 4:7241, 7:9051, 20:4051}, price:293, effect:\'100%\', spad:10.0}, 6: {time:\'5:35:59\', cost:{2:17770, 3:30405, 4:8108, 7:10135, 20:5135}, price:358, effect:\'120%\', spad:12.0}, 7: {time:\'5:41:59\', cost:{2:20049, 3:33824, 4:9019, 7:11274, 20:6274}, price:425, effect:\'140%\', spad:14.0}, 8: {time:\'5:48:00\', cost:{2:22428, 3:37392, 4:9971, 7:12464, 20:7464}, price:492, effect:\'160%\', spad:16.0}, 9: {time:\'5:54:00\', cost:{2:24898, 3:41097, 4:10959, 7:13699, 20:8699}, price:560, effect:\'180%\', spad:18.0}, 10: {time:\'6:00:00\', cost:{2:27452, 3:44928, 4:11981, 7:14976, 20:9976}, price:629, effect:\'200%\', spad:20.0}, 11: {time:\'6:05:59\', cost:{2:30084, 3:48876, 4:13033, 7:16292, 20:11292}, price:699, effect:\'220%\', spad:22.0}, 12: {time:\'6:11:59\', cost:{2:32789, 3:52933, 4:14115, 7:17644, 20:12644}, price:769, effect:\'240%\', spad:24.0}, 13: {time:\'6:18:00\', cost:{2:35562, 3:57093, 4:15224, 7:19031, 20:14031}, price:840, effect:\'260%\', spad:26.0}, 14: {time:\'6:24:00\', cost:{2:38400, 3:61350, 4:16360, 7:20450, 20:15450}, price:911, effect:\'280%\', spad:28.0}, 15: {time:\'6:30:00\', cost:{2:41300, 3:65700, 4:17520, 7:21900, 20:16900}, price:983, effect:\'300%\', spad:30.0}, 16: {time:\'6:35:59\', cost:{2:44258, 3:70137, 4:18703, 7:23379, 20:18379}, price:1055, effect:\'320%\', spad:32.0}, 17: {time:\'6:41:59\', cost:{2:47272, 3:74658, 4:19909, 7:24886, 20:19886}, price:1128, effect:\'340%\', spad:34.0}, 18: {time:\'6:48:00\', cost:{2:50340, 3:79260, 4:21136, 7:26420, 20:21420}, price:1201, effect:\'360%\', spad:36.0}, 19: {time:\'6:54:00\', cost:{2:53459, 3:83939, 4:22383, 7:27979, 20:22979}, price:1275, effect:\'380%\', spad:38.0}, 20: {time:\'7:00:00\', cost:{2:56629, 3:88693, 4:23651, 7:29564, 20:24564}, price:1349, effect:\'400%\', spad:40.0}}, \
48: {1: {time:\'1:06:00\', cost:{2:800, 3:600}, price:0, effect:\'4.4\', spad:0.0}, 2: {time:\'1:12:51\', cost:{2:391, 3:391}, price:0, effect:\'4.8\', spad:0.0}, 3: {time:\'1:20:05\', cost:{2:509, 3:509}, price:0, effect:\'5.2\', spad:0.0}, 4: {time:\'1:27:34\', cost:{2:650, 3:650}, price:0, effect:\'5.6\', spad:0.0}, 5: {time:\'1:35:14\', cost:{2:809, 3:809}, price:0, effect:\'6.0\', spad:0.0}, 6: {time:\'1:43:03\', cost:{2:984, 3:984}, price:0, effect:\'6.4\', spad:0.0}, 7: {time:\'1:51:01\', cost:{2:1176, 3:1176}, price:0, effect:\'6.8\', spad:0.0}, 8: {time:\'1:59:05\', cost:{2:1381, 3:1381}, price:0, effect:\'7.2\', spad:0.0}, 9: {time:\'2:07:16\', cost:{2:1600, 3:1600}, price:0, effect:\'7.6\', spad:0.0}, 10: {time:\'2:15:32\', cost:{2:1831, 3:1831}, price:0, effect:\'8.0\', spad:0.0}, 11: {time:\'2:23:53\', cost:{2:2074, 3:2074}, price:0, effect:\'8.4\', spad:0.0}, 12: {time:\'2:32:18\', cost:{2:2328, 3:2328}, price:0, effect:\'8.8\', spad:0.0}, 13: {time:\'2:40:48\', cost:{2:2593, 3:2593}, price:0, effect:\'9.2\', spad:0.0}, 14: {time:\'2:49:22\', cost:{2:2869, 3:2869}, price:0, effect:\'9.6\', spad:0.0}, 15: {time:\'2:57:59\', cost:{2:3154, 3:3154}, price:0, effect:\'10.0\', spad:0.0}, 16: {time:\'3:06:40\', cost:{2:3450, 3:3450}, price:0, effect:\'10.4\', spad:0.0}, 17: {time:\'3:15:24\', cost:{2:3754, 3:3754}, price:0, effect:\'10.8\', spad:0.0}, 18: {time:\'3:24:11\', cost:{2:4068, 3:4068}, price:0, effect:\'11.2\', spad:0.0}, 19: {time:\'3:33:01\', cost:{2:4390, 3:4390}, price:0, effect:\'11.6\', spad:0.0}, 20: {time:\'3:41:54\', cost:{2:4722, 3:4722}, price:0, effect:\'12.0\', spad:0.0}}, \
49: {1: {time:\'6:11:59\', cost:{2:96000, 3:47500, 4:12600}, price:27, effect:\'105%\', spad:21.0}, 2: {time:\'6:24:00\', cost:{2:27297, 3:13148, 4:2729}, price:32, effect:\'110%\', spad:22.0}, 3: {time:\'6:35:59\', cost:{2:28737, 3:13868, 4:2873}, price:37, effect:\'115%\', spad:23.0}, 4: {time:\'6:48:00\', cost:{2:30278, 3:14639, 4:3027}, price:44, effect:\'120%\', spad:24.0}, 5: {time:\'7:00:00\', cost:{2:31898, 3:15449, 4:3189}, price:50, effect:\'125%\', spad:25.0}, 6: {time:\'7:11:59\', cost:{2:33585, 3:16292, 4:3358}, price:57, effect:\'130%\', spad:26.0}, 7: {time:\'7:24:00\', cost:{2:35330, 3:17165, 4:3533}, price:64, effect:\'135%\', spad:27.0}, 8: {time:\'7:35:59\', cost:{2:37125, 3:18062, 4:3712}, price:71, effect:\'140%\', spad:28.0}, 9: {time:\'7:48:00\', cost:{2:38966, 3:18983, 4:3896}, price:78, effect:\'145%\', spad:29.0}, 10: {time:\'8:00:00\', cost:{2:40848, 3:19924, 4:4084}, price:86, effect:\'150%\', spad:30.0}, 11: {time:\'8:11:59\', cost:{2:42769, 3:20884, 4:4276}, price:94, effect:\'155%\', spad:31.0}, 12: {time:\'8:23:59\', cost:{2:44725, 3:21862, 4:4472}, price:101, effect:\'160%\', spad:32.0}, 13: {time:\'8:36:00\', cost:{2:46713, 3:22856, 4:4671}, price:109, effect:\'165%\', spad:33.0}, 14: {time:\'8:48:00\', cost:{2:48733, 3:23866, 4:4873}, price:117, effect:\'170%\', spad:34.0}, 15: {time:\'9:00:00\', cost:{2:50781, 3:24890, 4:5078}, price:126, effect:\'175%\', spad:35.0}, 16: {time:\'9:11:59\', cost:{2:52857, 3:25928, 4:5285}, price:134, effect:\'180%\', spad:36.0}, 17: {time:\'9:23:59\', cost:{2:54959, 3:26979, 4:5495}, price:142, effect:\'185%\', spad:37.0}, 18: {time:\'9:36:00\', cost:{2:57086, 3:28043, 4:5708}, price:151, effect:\'190%\', spad:38.0}, 19: {time:\'9:48:00\', cost:{2:59237, 3:29118, 4:5923}, price:159, effect:\'195%\', spad:39.0}, 20: {time:\'10:00:00\', cost:{2:61411, 3:30205, 4:6141}, price:168, effect:\'200%\', spad:40.0}}, \
50: {1: {time:\'8:15:00\', cost:{2:31000, 3:41200, 4:21200, 5:6500}, price:105, effect:\'10%\', spad:2.0}, 2: {time:\'8:30:00\', cost:{2:32297, 3:42756, 4:22756, 5:8446}, price:134, effect:\'20%\', spad:4.0}, 3: {time:\'8:45:00\', cost:{2:33737, 3:44484, 4:24484, 5:10605}, price:168, effect:\'30%\', spad:6.0}, 4: {time:\'9:00:00\', cost:{2:35278, 3:46333, 4:26333, 5:12917}, price:206, effect:\'40%\', spad:8.0}, 5: {time:\'9:15:00\', cost:{2:36898, 3:48278, 4:28278, 5:15347}, price:247, effect:\'50%\', spad:10.0}, 6: {time:\'9:30:00\', cost:{2:38585, 3:50302, 4:30302, 5:17878}, price:290, effect:\'60%\', spad:12.0}, 7: {time:\'9:45:00\', cost:{2:40330, 3:52396, 4:32396, 5:20495}, price:335, effect:\'70%\', spad:14.0}, 8: {time:\'10:00:00\', cost:{2:42125, 3:54550, 4:34550, 5:23188}, price:383, effect:\'80%\', spad:16.0}, 9: {time:\'10:15:00\', cost:{2:43966, 3:56759, 4:36759, 5:25949}, price:432, effect:\'90%\', spad:18.0}, 10: {time:\'10:30:00\', cost:{2:45848, 3:59018, 4:39018, 5:28773}, price:484, effect:\'100%\', spad:20.0}, 11: {time:\'10:45:00\', cost:{2:47769, 3:61323, 4:41323, 5:31654}, price:536, effect:\'110%\', spad:22.0}, 12: {time:\'11:00:00\', cost:{2:49725, 3:63670, 4:43670, 5:34587}, price:590, effect:\'120%\', spad:24.0}, 13: {time:\'11:15:00\', cost:{2:51713, 3:66056, 4:46056, 5:37570}, price:646, effect:\'130%\', spad:26.0}, 14: {time:\'11:30:00\', cost:{2:53733, 3:68479, 4:48479, 5:40599}, price:703, effect:\'140%\', spad:28.0}, 15: {time:\'11:45:00\', cost:{2:55781, 3:70937, 4:50937, 5:43672}, price:761, effect:\'150%\', spad:30.0}, 16: {time:\'12:00:00\', cost:{2:57857, 3:73429, 4:53429, 5:46786}, price:820, effect:\'160%\', spad:32.0}, 17: {time:\'12:15:00\', cost:{2:59959, 3:75951, 4:55951, 5:49939}, price:880, effect:\'170%\', spad:34.0}, 18: {time:\'12:30:00\', cost:{2:62086, 3:78504, 4:58504, 5:53130}, price:941, effect:\'180%\', spad:36.0}, 19: {time:\'12:45:00\', cost:{2:64237, 3:81085, 4:61085, 5:56356}, price:1004, effect:\'190%\', spad:38.0}, 20: {time:\'13:00:00\', cost:{2:66411, 3:83693, 4:63693, 5:59616}, price:1067, effect:\'200%\', spad:40.0}}, \
51: {1: {time:\'3:05:59\', cost:{2:3050, 3:5100, 4:1025}, price:0, effect:\'5\', spad:0.5}, 2: {time:\'3:12:00\', cost:{2:3100, 3:5200, 4:1050}, price:0, effect:\'10\', spad:1.0}, 3: {time:\'3:17:59\', cost:{2:3150, 3:5300, 4:1075}, price:0, effect:\'15\', spad:1.5}, 4: {time:\'3:24:00\', cost:{2:3200, 3:5400, 4:1100}, price:0, effect:\'20\', spad:2.0}, 5: {time:\'3:30:00\', cost:{2:3250, 3:5500, 4:1125}, price:0, effect:\'25\', spad:2.5}, 6: {time:\'3:35:59\', cost:{2:3300, 3:5600, 4:1150}, price:0, effect:\'30\', spad:3.0}, 7: {time:\'3:42:00\', cost:{2:3350, 3:5700, 4:1175}, price:0, effect:\'35\', spad:3.5}, 8: {time:\'3:47:59\', cost:{2:3400, 3:5800, 4:1200}, price:0, effect:\'40\', spad:4.0}, 9: {time:\'3:54:00\', cost:{2:3450, 3:5900, 4:1225}, price:0, effect:\'45\', spad:4.5}, 10: {time:\'4:00:00\', cost:{2:3500, 3:6000, 4:1250}, price:0, effect:\'50\', spad:5.0}, 11: {time:\'4:05:59\', cost:{2:3550, 3:6100, 4:1275}, price:0, effect:\'55\', spad:5.5}, 12: {time:\'4:11:59\', cost:{2:3600, 3:6200, 4:1300}, price:0, effect:\'60\', spad:6.0}, 13: {time:\'4:18:00\', cost:{2:3650, 3:6300, 4:1325}, price:0, effect:\'65\', spad:6.5}, 14: {time:\'4:24:00\', cost:{2:3700, 3:6400, 4:1350}, price:0, effect:\'70\', spad:7.0}, 15: {time:\'4:30:00\', cost:{2:3750, 3:6500, 4:1375}, price:0, effect:\'75\', spad:7.5}, 16: {time:\'4:35:59\', cost:{2:3800, 3:6600, 4:1400}, price:0, effect:\'80\', spad:8.0}, 17: {time:\'4:41:59\', cost:{2:3850, 3:6700, 4:1425}, price:0, effect:\'85\', spad:8.5}, 18: {time:\'4:48:00\', cost:{2:3900, 3:6800, 4:1450}, price:0, effect:\'90\', spad:9.0}, 19: {time:\'4:54:00\', cost:{2:3950, 3:6900, 4:1475}, price:0, effect:\'95\', spad:9.5}, 20: {time:\'5:00:00\', cost:{2:4000, 3:7000, 4:1500}, price:0, effect:\'100\', spad:10.0}}, \
52: {1: {time:\'8:15:00\', cost:{2:40800, 3:27800, 4:3500}, price:126, effect:\'160%\', spad:15.7}, 2: {time:\'8:30:00\', cost:{2:15469, 3:11700, 4:4231}, price:132, effect:\'170%\', spad:16.6}, 3: {time:\'8:45:00\', cost:{2:16836, 3:13922, 4:5085}, price:140, effect:\'180%\', spad:17.6}, 4: {time:\'9:00:00\', cost:{2:18350, 3:16381, 4:6031}, price:147, effect:\'190%\', spad:18.7}, 5: {time:\'9:15:00\', cost:{2:19982, 3:19034, 4:7051}, price:155, effect:\'200%\', spad:19.8}, 6: {time:\'9:30:00\', cost:{2:21716, 3:21851, 4:8135}, price:163, effect:\'210%\', spad:21.0}, 7: {time:\'9:45:00\', cost:{2:23539, 3:24814, 4:9274}, price:171, effect:\'220%\', spad:22.2}, 8: {time:\'10:00:00\', cost:{2:25442, 3:27907, 4:10464}, price:179, effect:\'230%\', spad:23.5}, 9: {time:\'10:15:00\', cost:{2:27418, 3:31118, 4:11699}, price:187, effect:\'240%\', spad:24.8}, 10: {time:\'10:30:00\', cost:{2:29462, 3:34438, 4:12976}, price:195, effect:\'250%\', spad:26.1}, 11: {time:\'10:45:00\', cost:{2:31567, 3:37859, 4:14292}, price:203, effect:\'260%\', spad:27.4}, 12: {time:\'11:00:00\', cost:{2:33731, 3:41375, 4:15644}, price:212, effect:\'270%\', spad:28.8}, 13: {time:\'11:15:00\', cost:{2:35949, 3:44981, 4:17031}, price:220, effect:\'280%\', spad:30.2}, 14: {time:\'11:30:00\', cost:{2:38220, 3:48670, 4:18450}, price:229, effect:\'290%\', spad:31.6}, 15: {time:\'11:45:00\', cost:{2:40540, 3:52440, 4:19900}, price:237, effect:\'300%\', spad:33.0}, 16: {time:\'12:00:00\', cost:{2:42906, 3:56285, 4:21379}, price:246, effect:\'310%\', spad:34.5}, 17: {time:\'12:15:00\', cost:{2:45318, 3:60204, 4:22886}, price:255, effect:\'320%\', spad:36.0}, 18: {time:\'12:30:00\', cost:{2:47772, 3:64192, 4:24420}, price:264, effect:\'330%\', spad:37.5}, 19: {time:\'12:45:00\', cost:{2:50267, 3:68247, 4:25979}, price:273, effect:\'340%\', spad:39.0}, 20: {time:\'13:00:00\', cost:{2:52803, 3:72367, 4:27564}, price:281, effect:\'350%\', spad:40.5}}, \
53: {1: {time:\'8:08:59\', cost:{2:34900, 3:40000, 4:9650, 6:19200}, price:0, effect:\'824 44%\', spad:20.8}, 2: {time:\'8:18:00\', cost:{2:8418, 3:9648, 4:2344, 6:4459}, price:0, effect:\'839 45%\', spad:21.6}, 3: {time:\'8:26:59\', cost:{2:8994, 3:10368, 4:2560, 6:4747}, price:0, effect:\'853 46%\', spad:22.4}, 4: {time:\'8:36:00\', cost:{2:9611, 3:11139, 4:2791, 6:5055}, price:0, effect:\'866 47%\', spad:23.2}, 5: {time:\'8:45:00\', cost:{2:10259, 3:11949, 4:3034, 6:5379}, price:0, effect:\'879 48%\', spad:24.0}, 6: {time:\'8:53:59\', cost:{2:10934, 3:12792, 4:3287, 6:5717}, price:0, effect:\'892 49%\', spad:24.8}, 7: {time:\'9:03:00\', cost:{2:11632, 3:13665, 4:3549, 6:6066}, price:0, effect:\'904 50%\', spad:25.6}, 8: {time:\'9:11:59\', cost:{2:12350, 3:14562, 4:3818, 6:6425}, price:0, effect:\'917 51%\', spad:26.4}, 9: {time:\'9:21:00\', cost:{2:13086, 3:15483, 4:4094, 6:6793}, price:0, effect:\'929 51%\', spad:27.2}, 10: {time:\'9:30:00\', cost:{2:13839, 3:16424, 4:4377, 6:7169}, price:0, effect:\'941 52%\', spad:28.0}, 11: {time:\'9:38:59\', cost:{2:14607, 3:17384, 4:4665, 6:7553}, price:0, effect:\'953 53%\', spad:28.8}, 12: {time:\'9:48:00\', cost:{2:15390, 3:18362, 4:4958, 6:7945}, price:0, effect:\'965 53%\', spad:29.6}, 13: {time:\'9:56:59\', cost:{2:16185, 3:19356, 4:5257, 6:8342}, price:0, effect:\'976 54%\', spad:30.4}, 14: {time:\'10:06:00\', cost:{2:16993, 3:20366, 4:5559, 6:8746}, price:0, effect:\'988 54%\', spad:31.2}, 15: {time:\'10:15:00\', cost:{2:17812, 3:21390, 4:5867, 6:9156}, price:0, effect:\'1000 55%\', spad:32.0}, 16: {time:\'10:23:59\', cost:{2:18643, 3:22428, 4:6178, 6:9571}, price:0, effect:\'1011 56%\', spad:32.8}, 17: {time:\'10:33:00\', cost:{2:19483, 3:23479, 4:6493, 6:9991}, price:0, effect:\'1023 56%\', spad:33.6}, 18: {time:\'10:41:59\', cost:{2:20334, 3:24543, 4:6813, 6:10417}, price:0, effect:\'1034 57%\', spad:34.4}, 19: {time:\'10:51:00\', cost:{2:21195, 3:25618, 4:7135, 6:10847}, price:0, effect:\'1045 57%\', spad:35.2}, 20: {time:\'11:00:00\', cost:{2:22064, 3:26705, 4:7461, 6:11282}, price:0, effect:\'1057 58%\', spad:36.0}}, \
54: {1: {time:\'8:11:59\', cost:{2:282000, 3:142000, 4:33250}, price:170, effect:\'205%\', spad:41.0}, 2: {time:\'8:23:59\', cost:{2:54594, 3:29594, 4:9223}, price:195, effect:\'210%\', spad:42.0}, 3: {time:\'8:36:00\', cost:{2:57474, 3:32474, 4:10302}, price:224, effect:\'215%\', spad:43.0}, 4: {time:\'8:48:00\', cost:{2:60556, 3:35556, 4:11458}, price:255, effect:\'220%\', spad:44.0}, 5: {time:\'9:00:00\', cost:{2:63797, 3:38797, 4:12673}, price:287, effect:\'225%\', spad:45.0}, 6: {time:\'9:11:59\', cost:{2:67171, 3:42171, 4:13939}, price:321, effect:\'230%\', spad:46.0}, 7: {time:\'9:23:59\', cost:{2:70660, 3:45660, 4:15247}, price:356, effect:\'235%\', spad:47.0}, 8: {time:\'9:36:00\', cost:{2:74251, 3:49251, 4:16594}, price:392, effect:\'240%\', spad:48.0}, 9: {time:\'9:48:00\', cost:{2:77933, 3:52933, 4:17974}, price:429, effect:\'245%\', spad:49.0}, 10: {time:\'10:00:00\', cost:{2:81697, 3:56697, 4:19386}, price:466, effect:\'250%\', spad:50.0}, 11: {time:\'10:11:59\', cost:{2:85538, 3:60538, 4:20827}, price:505, effect:\'255%\', spad:51.0}, 12: {time:\'10:23:59\', cost:{2:89450, 3:64450, 4:22293}, price:544, effect:\'260%\', spad:52.0}, 13: {time:\'10:36:00\', cost:{2:93427, 3:68427, 4:23785}, price:584, effect:\'265%\', spad:53.0}, 14: {time:\'10:48:00\', cost:{2:97466, 3:72466, 4:25299}, price:624, effect:\'270%\', spad:54.0}, 15: {time:\'11:00:00\', cost:{2:101563, 3:76563, 4:26836}, price:665, effect:\'275%\', spad:55.0}, 16: {time:\'11:11:59\', cost:{2:105715, 3:80715, 4:28393}, price:707, effect:\'280%\', spad:56.0}, 17: {time:\'11:23:59\', cost:{2:109919, 3:84919, 4:29969}, price:749, effect:\'285%\', spad:57.0}, 18: {time:\'11:36:00\', cost:{2:114173, 3:89173, 4:31565}, price:791, effect:\'290%\', spad:58.0}, 19: {time:\'11:48:00\', cost:{2:118475, 3:93475, 4:33178}, price:834, effect:\'295%\', spad:59.0}, 20: {time:\'12:00:00\', cost:{2:122822, 3:97822, 4:34808}, price:878, effect:\'300%\', spad:60.0}}, \
55: {1: {time:\'10:15:00\', cost:{2:102000, 3:121500, 4:33000, 6:52500}, price:0, effect:\'1080 59%\', spad:37.0}, 2: {time:\'10:30:00\', cost:{2:24828, 3:29328, 4:8914, 6:12414}, price:0, effect:\'1100 60%\', spad:38.0}, 3: {time:\'10:45:00\', cost:{2:27196, 3:31696, 4:10098, 6:13598}, price:0, effect:\'1120 60%\', spad:39.0}, 4: {time:\'11:00:00\', cost:{2:30000, 3:34500, 4:11500, 6:15000}, price:0, effect:\'1140 61%\', spad:40.0}, 5: {time:\'11:15:00\', cost:{2:33180, 3:37680, 4:13090, 6:16590}, price:0, effect:\'1160 62%\', spad:41.0}, 6: {time:\'11:30:00\', cost:{2:36696, 3:41196, 4:14848, 6:18348}, price:0, effect:\'1180 62%\', spad:42.0}, 7: {time:\'11:45:00\', cost:{2:40520, 3:45020, 4:16760, 6:20260}, price:0, effect:\'1200 63%\', spad:43.0}, 8: {time:\'12:00:00\', cost:{2:44627, 3:49127, 4:18813, 6:22313}, price:0, effect:\'1220 64%\', spad:44.0}, 9: {time:\'12:15:00\', cost:{2:49000, 3:53500, 4:21000, 6:24500}, price:0, effect:\'1240 64%\', spad:45.0}, 10: {time:\'12:30:00\', cost:{2:53622, 3:58122, 4:23311, 6:26811}, price:0, effect:\'1260 65%\', spad:46.0}, 11: {time:\'12:45:00\', cost:{2:58482, 3:62982, 4:25741, 6:29241}, price:0, effect:\'1280 66%\', spad:47.0}, 12: {time:\'13:00:00\', cost:{2:63569, 3:68069, 4:28284, 6:31784}, price:0, effect:\'1300 66%\', spad:48.0}, 13: {time:\'13:15:00\', cost:{2:68872, 3:73372, 4:30936, 6:34436}, price:0, effect:\'1320 67%\', spad:49.0}, 14: {time:\'13:30:00\', cost:{2:74383, 3:78883, 4:33691, 6:37191}, price:0, effect:\'1340 67%\', spad:50.0}, 15: {time:\'13:45:00\', cost:{2:80094, 3:84594, 4:36547, 6:40047}, price:0, effect:\'1360 68%\', spad:51.0}, 16: {time:\'14:00:00\', cost:{2:86000, 3:90500, 4:39500, 6:43000}, price:0, effect:\'1380 68%\', spad:52.0}, 17: {time:\'14:15:00\', cost:{2:92092, 3:96592, 4:42546, 6:46046}, price:0, effect:\'1400 69%\', spad:53.0}, 18: {time:\'14:30:00\', cost:{2:98367, 3:102867, 4:45683, 6:49183}, price:0, effect:\'1420 69%\', spad:54.0}, 19: {time:\'14:45:00\', cost:{2:104819, 3:109319, 4:48909, 6:52409}, price:0, effect:\'1440 70%\', spad:55.0}, 20: {time:\'15:00:00\', cost:{2:111442, 3:115942, 4:52221, 6:55721}, price:0, effect:\'1460 70%\', spad:56.0}}, \
56: {1: {time:\'2:17:59\', cost:{2:110, 3:110}, price:0, effect:\'\', spad:0.0}, 2: {time:\'2:35:59\', cost:{2:120, 3:120}, price:0, effect:\'\', spad:0.0}, 3: {time:\'2:54:00\', cost:{2:130, 3:130}, price:0, effect:\'\', spad:0.0}, 4: {time:\'3:12:00\', cost:{2:140, 3:140}, price:0, effect:\'\', spad:0.0}, 5: {time:\'3:30:00\', cost:{2:150, 3:150}, price:0, effect:\'\', spad:0.0}, 6: {time:\'3:48:00\', cost:{2:160, 3:160}, price:0, effect:\'\', spad:0.0}, 7: {time:\'4:05:59\', cost:{2:170, 3:170}, price:0, effect:\'\', spad:0.0}, 8: {time:\'4:24:00\', cost:{2:180, 3:180}, price:0, effect:\'\', spad:0.0}, 9: {time:\'4:42:00\', cost:{2:190, 3:190}, price:0, effect:\'\', spad:0.0}, 10: {time:\'5:00:00\', cost:{2:200, 3:200}, price:0, effect:\'\', spad:0.0}, 11: {time:\'5:18:00\', cost:{2:210, 3:210}, price:0, effect:\'\', spad:0.0}, 12: {time:\'5:36:00\', cost:{2:220, 3:220}, price:0, effect:\'\', spad:0.0}, 13: {time:\'5:54:00\', cost:{2:230, 3:230}, price:0, effect:\'\', spad:0.0}, 14: {time:\'6:12:00\', cost:{2:240, 3:240}, price:0, effect:\'\', spad:0.0}, 15: {time:\'6:30:00\', cost:{2:250, 3:250}, price:0, effect:\'\', spad:0.0}, 16: {time:\'6:48:00\', cost:{2:260, 3:260}, price:0, effect:\'\', spad:0.0}, 17: {time:\'7:06:00\', cost:{2:270, 3:270}, price:0, effect:\'\', spad:0.0}, 18: {time:\'7:24:00\', cost:{2:280, 3:280}, price:0, effect:\'\', spad:0.0}, 19: {time:\'7:42:00\', cost:{2:290, 3:290}, price:0, effect:\'\', spad:0.0}, 20: {time:\'8:00:00\', cost:{2:300, 3:300}, price:0, effect:\'\', spad:0.0}}, \
57: {1: {time:\'6:18:00\', cost:{2:41000, 3:31750, 4:15400}, price:0, effect:\'23\', spad:0.0}, 2: {time:\'6:35:59\', cost:{2:7639, 3:8298, 4:3055}, price:0, effect:\'26\', spad:0.0}, 3: {time:\'6:54:00\', cost:{2:9655, 3:10819, 4:3862}, price:0, effect:\'29\', spad:0.0}, 4: {time:\'7:11:59\', cost:{2:11964, 3:13705, 4:4785}, price:0, effect:\'32\', spad:0.0}, 5: {time:\'7:30:00\', cost:{2:14518, 3:16897, 4:5807}, price:0, effect:\'35\', spad:0.0}, 6: {time:\'7:48:00\', cost:{2:17286, 3:20357, 4:6914}, price:0, effect:\'38\', spad:0.0}, 7: {time:\'8:06:00\', cost:{2:20245, 3:24056, 4:8098}, price:0, effect:\'41\', spad:0.0}, 8: {time:\'8:23:59\', cost:{2:23379, 3:27973, 4:9351}, price:0, effect:\'44\', spad:0.0}, 9: {time:\'8:41:59\', cost:{2:26674, 3:32092, 4:10669}, price:0, effect:\'47\', spad:0.0}, 10: {time:\'9:00:00\', cost:{2:30118, 3:36398, 4:12047}, price:0, effect:\'50\', spad:0.0}, 11: {time:\'9:18:00\', cost:{2:33704, 3:40880, 4:13481}, price:0, effect:\'53\', spad:0.0}, 12: {time:\'9:36:00\', cost:{2:37423, 3:45528, 4:14969}, price:0, effect:\'56\', spad:0.0}, 13: {time:\'9:54:00\', cost:{2:41267, 3:50334, 4:16507}, price:0, effect:\'59\', spad:0.0}, 14: {time:\'10:11:59\', cost:{2:45232, 3:55290, 4:18093}, price:0, effect:\'62\', spad:0.0}, 15: {time:\'10:30:00\', cost:{2:49312, 3:60390, 4:19725}, price:0, effect:\'65\', spad:0.0}, 16: {time:\'10:48:00\', cost:{2:53502, 3:65628, 4:21401}, price:0, effect:\'68\', spad:0.0}, 17: {time:\'11:06:00\', cost:{2:57799, 3:70999, 4:23119}, price:0, effect:\'71\', spad:0.0}, 18: {time:\'11:24:00\', cost:{2:62198, 3:76497, 4:24879}, price:0, effect:\'74\', spad:0.0}, 19: {time:\'11:41:59\', cost:{2:66695, 3:82119, 4:26678}, price:0, effect:\'77\', spad:0.0}, 20: {time:\'12:00:00\', cost:{2:71289, 3:87861, 4:28515}, price:0, effect:\'80\', spad:0.0}}, \
58: {1: {time:\'3:12:00\', cost:{2:2600, 3:4100, 7:200}, price:0, effect:\'\', spad:0.0}, 2: {time:\'3:24:00\', cost:{2:3200, 3:5200, 7:400}, price:0, effect:\'\', spad:0.0}, 3: {time:\'3:35:59\', cost:{2:3800, 3:6300, 7:600}, price:0, effect:\'\', spad:0.0}, 4: {time:\'3:47:59\', cost:{2:4400, 3:7400, 7:800}, price:0, effect:\'\', spad:0.0}, 5: {time:\'4:00:00\', cost:{2:5000, 3:8500, 7:1000}, price:0, effect:\'\', spad:0.0}, 6: {time:\'4:11:59\', cost:{2:5600, 3:9600, 6:100, 7:1200}, price:0, effect:\'\', spad:0.0}, 7: {time:\'4:24:00\', cost:{2:6200, 3:10700, 6:450, 7:1400}, price:0, effect:\'\', spad:0.0}, 8: {time:\'4:35:59\', cost:{2:6800, 3:11800, 6:800, 7:1600}, price:0, effect:\'\', spad:0.0}, 9: {time:\'4:48:00\', cost:{2:7400, 3:12900, 6:1150, 7:1800}, price:0, effect:\'\', spad:0.0}, 10: {time:\'5:00:00\', cost:{2:8000, 3:14000, 6:1500, 7:2000}, price:0, effect:\'\', spad:0.0}, 11: {time:\'5:11:59\', cost:{2:8600, 3:15100, 6:1850, 7:2200}, price:0, effect:\'\', spad:0.0}, 12: {time:\'5:24:00\', cost:{2:9200, 3:16200, 6:2200, 7:2400}, price:0, effect:\'\', spad:0.0}, 13: {time:\'5:35:59\', cost:{2:9800, 3:17300, 6:2550, 7:2600}, price:0, effect:\'\', spad:0.0}, 14: {time:\'5:48:00\', cost:{2:10400, 3:18400, 6:2900, 7:2800}, price:0, effect:\'\', spad:0.0}, 15: {time:\'6:00:00\', cost:{2:11000, 3:19500, 6:3250, 7:3000}, price:0, effect:\'\', spad:0.0}, 16: {time:\'6:11:59\', cost:{2:11600, 3:20600, 6:3600, 7:3200}, price:0, effect:\'\', spad:0.0}, 17: {time:\'6:24:00\', cost:{2:12200, 3:21700, 6:3950, 7:3400}, price:0, effect:\'\', spad:0.0}, 18: {time:\'6:35:59\', cost:{2:12800, 3:22800, 6:4300, 7:3600}, price:0, effect:\'\', spad:0.0}, 19: {time:\'6:48:00\', cost:{2:13400, 3:23900, 6:4650, 7:3800}, price:0, effect:\'\', spad:0.0}, 20: {time:\'7:00:00\', cost:{2:14000, 3:25000, 6:5000, 7:4000}, price:0, effect:\'\', spad:0.0}}, \
59: {1: {time:\'7:30:00\', cost:{2:41000, 3:51500, 4:20750, 9:5500, 10:2125}, price:201, effect:\'100%\', spad:2.0}, 2: {time:\'8:00:00\', cost:{2:42297, 3:53446, 4:21723, 9:6148, 10:2287}, price:258, effect:\'118%\', spad:4.0}, 3: {time:\'8:30:00\', cost:{2:43737, 3:55605, 4:22802, 9:6868, 10:2467}, price:318, effect:\'139%\', spad:6.0}, 4: {time:\'9:00:00\', cost:{2:45278, 3:57917, 4:23958, 9:7639, 10:2659}, price:380, effect:\'163%\', spad:8.0}, 5: {time:\'9:30:00\', cost:{2:46898, 3:60347, 4:25173, 9:8449, 10:2862}, price:444, effect:\'188%\', spad:10.0}, 6: {time:\'10:00:00\', cost:{2:48585, 3:62878, 4:26439, 9:9292, 10:3073}, price:509, effect:\'215%\', spad:12.0}, 7: {time:\'10:30:00\', cost:{2:50330, 3:65495, 4:27747, 9:10165, 10:3291}, price:576, effect:\'244%\', spad:14.0}, 8: {time:\'11:00:00\', cost:{2:52125, 3:68188, 4:29094, 9:11062, 10:3515}, price:643, effect:\'273%\', spad:16.0}, 9: {time:\'11:30:00\', cost:{2:53966, 3:70949, 4:30474, 9:11983, 10:3745}, price:711, effect:\'304%\', spad:18.0}, 10: {time:\'12:00:00\', cost:{2:55848, 3:73773, 4:31886, 9:12924, 10:3981}, price:780, effect:\'336%\', spad:20.0}, 11: {time:\'12:30:00\', cost:{2:57769, 3:76654, 4:33327, 9:13884, 10:4221}, price:850, effect:\'369%\', spad:22.0}, 12: {time:\'13:00:00\', cost:{2:59725, 3:79587, 4:34793, 9:14862, 10:4465}, price:920, effect:\'402%\', spad:24.0}, 13: {time:\'13:30:00\', cost:{2:61713, 3:82570, 4:36285, 9:15856, 10:4714}, price:991, effect:\'437%\', spad:26.0}, 14: {time:\'14:00:00\', cost:{2:63733, 3:85599, 4:37799, 9:16866, 10:4966}, price:1062, effect:\'472%\', spad:28.0}, 15: {time:\'14:30:00\', cost:{2:65781, 3:88672, 4:39336, 9:17890, 10:5222}, price:1134, effect:\'509%\', spad:30.0}, 16: {time:\'15:00:00\', cost:{2:67857, 3:91786, 4:40893, 9:18928, 10:5482}, price:1206, effect:\'545%\', spad:32.0}, 17: {time:\'15:30:00\', cost:{2:69959, 3:94939, 4:42469, 9:19979, 10:5744}, price:1279, effect:\'583%\', spad:34.0}, 18: {time:\'16:00:00\', cost:{2:72086, 3:98130, 4:44065, 9:21043, 10:6010}, price:1352, effect:\'621%\', spad:36.0}, 19: {time:\'16:30:00\', cost:{2:74237, 3:101356, 4:45678, 9:22118, 10:6279}, price:1426, effect:\'660%\', spad:38.0}, 20: {time:\'17:00:00\', cost:{2:76411, 3:104616, 4:47308, 9:23205, 10:6551}, price:1500, effect:\'700%\', spad:40.0}}, \
60: {1: {time:\'5:30:00\', cost:{2:2000, 3:1500, 6:1500}, price:0, effect:\'\', spad:0.0}, 2: {time:\'6:00:00\', cost:{2:1400, 3:2000, 6:700}, price:0, effect:\'\', spad:0.0}, 3: {time:\'6:30:00\', cost:{2:1600, 3:2500, 6:850}, price:0, effect:\'\', spad:0.0}, 4: {time:\'7:00:00\', cost:{2:1800, 3:3000, 6:1000}, price:0, effect:\'\', spad:0.0}, 5: {time:\'7:30:00\', cost:{2:2000, 3:3500, 6:1150}, price:0, effect:\'\', spad:0.0}, 6: {time:\'8:00:00\', cost:{2:2200, 3:4000, 6:1300}, price:0, effect:\'\', spad:0.0}, 7: {time:\'8:30:00\', cost:{2:2400, 3:4500, 6:1450}, price:0, effect:\'\', spad:0.0}, 8: {time:\'9:00:00\', cost:{2:2600, 3:5000, 6:1600, 22:100}, price:0, effect:\'\', spad:0.0}, 9: {time:\'9:30:00\', cost:{2:2800, 3:5500, 6:1750, 22:300}, price:0, effect:\'\', spad:0.0}, 10: {time:\'10:00:00\', cost:{2:3000, 3:6000, 6:1900, 22:500}, price:0, effect:\'\', spad:0.0}, 11: {time:\'10:30:00\', cost:{2:3200, 3:6500, 6:2050, 22:700}, price:0, effect:\'\', spad:0.0}, 12: {time:\'11:00:00\', cost:{2:3400, 3:7000, 6:2200, 22:900}, price:0, effect:\'\', spad:0.0}, 13: {time:\'11:30:00\', cost:{2:3600, 3:7500, 6:2350, 22:1100}, price:0, effect:\'\', spad:0.0}, 14: {time:\'12:00:00\', cost:{2:3800, 3:8000, 6:2500, 22:1300}, price:0, effect:\'\', spad:0.0}, 15: {time:\'12:30:00\', cost:{2:4000, 3:8500, 6:2650, 22:1500}, price:0, effect:\'\', spad:0.0}, 16: {time:\'13:00:00\', cost:{2:4200, 3:9000, 6:2800, 22:1700}, price:0, effect:\'\', spad:0.0}, 17: {time:\'13:30:00\', cost:{2:4400, 3:9500, 6:2950, 22:1900}, price:0, effect:\'\', spad:0.0}, 18: {time:\'14:00:00\', cost:{2:4600, 3:10000, 6:3100, 22:2100}, price:0, effect:\'\', spad:0.0}, 19: {time:\'14:30:00\', cost:{2:4800, 3:10500, 6:3250, 22:2300}, price:0, effect:\'\', spad:0.0}, 20: {time:\'15:00:00\', cost:{2:5000, 3:11000, 6:3400, 22:2500}, price:0, effect:\'\', spad:0.0}}, \
61: {1: {time:\'8:18:00\', cost:{2:80850, 3:138000, 6:35500, 22:34400}, price:210, effect:\'410%\', spad:32.0}, 2: {time:\'8:36:00\', cost:{2:22923, 3:38639, 6:11319, 22:9055}, price:224, effect:\'420%\', spad:34.0}, 3: {time:\'8:53:59\', cost:{2:23629, 3:40655, 6:12327, 22:9862}, price:241, effect:\'430%\', spad:36.0}, 4: {time:\'9:11:59\', cost:{2:24437, 3:42964, 6:13482, 22:10785}, price:260, effect:\'440%\', spad:38.0}, 5: {time:\'9:30:00\', cost:{2:25331, 3:45518, 6:14759, 22:11807}, price:281, effect:\'450%\', spad:40.0}, 6: {time:\'9:48:00\', cost:{2:26300, 3:48286, 6:16143, 22:12914}, price:302, effect:\'460%\', spad:42.0}, 7: {time:\'10:06:00\', cost:{2:27335, 3:51245, 6:17622, 22:14098}, price:325, effect:\'470%\', spad:44.0}, 8: {time:\'10:23:59\', cost:{2:28432, 3:54379, 6:19189, 22:15351}, price:349, effect:\'480%\', spad:46.0}, 9: {time:\'10:41:59\', cost:{2:29585, 3:57674, 6:20837, 22:16669}, price:373, effect:\'490%\', spad:48.0}, 10: {time:\'11:00:00\', cost:{2:30791, 3:61118, 6:22559, 22:18047}, price:399, effect:\'500%\', spad:50.0}, 11: {time:\'11:18:00\', cost:{2:32046, 3:64704, 6:24352, 22:19481}, price:425, effect:\'510%\', spad:52.0}, 12: {time:\'11:36:00\', cost:{2:33348, 3:68423, 6:26211, 22:20969}, price:452, effect:\'520%\', spad:54.0}, 13: {time:\'11:54:00\', cost:{2:34693, 3:72267, 6:28133, 22:22507}, price:480, effect:\'530%\', spad:56.0}, 14: {time:\'12:11:59\', cost:{2:36081, 3:76232, 6:30116, 22:24093}, price:509, effect:\'540%\', spad:58.0}, 15: {time:\'12:30:00\', cost:{2:37509, 3:80312, 6:32156, 22:25725}, price:538, effect:\'550%\', spad:60.0}, 16: {time:\'12:48:00\', cost:{2:38976, 3:84502, 6:34251, 22:27401}, price:567, effect:\'560%\', spad:62.0}, 17: {time:\'13:06:00\', cost:{2:40479, 3:88799, 6:36399, 22:29119}, price:597, effect:\'570%\', spad:64.0}, 18: {time:\'13:24:00\', cost:{2:42019, 3:93198, 6:38599, 22:30879}, price:628, effect:\'580%\', spad:66.0}, 19: {time:\'13:41:59\', cost:{2:43593, 3:97695, 6:40847, 22:32678}, price:659, effect:\'590%\', spad:68.0}, 20: {time:\'14:00:00\', cost:{2:45201, 3:102289, 6:43144, 22:34515}, price:691, effect:\'600%\', spad:70.0}}, \
62: {1: {time:\'10:00:00\', cost:{2:50650, 3:28300, 4:14100, 6:15250}, price:100, effect:\'300\', spad:0.0}, 2: {time:\'10:30:00\', cost:{2:21838, 3:8848, 4:4282, 6:5707}, price:130, effect:\'364\', spad:0.0}, 3: {time:\'11:00:00\', cost:{2:23377, 3:9558, 4:4519, 6:6299}, price:168, effect:\'436\', spad:0.0}, 4: {time:\'11:30:00\', cost:{2:25200, 3:10400, 4:4800, 6:7000}, price:209, effect:\'513\', spad:0.0}, 5: {time:\'12:00:00\', cost:{2:27267, 3:11354, 4:5118, 6:7795}, price:255, effect:\'594\', spad:0.0}, 6: {time:\'12:30:00\', cost:{2:29553, 3:12409, 4:5469, 6:8674}, price:304, effect:\'679\', spad:0.0}, 7: {time:\'13:00:00\', cost:{2:32038, 3:13556, 4:5852, 6:9630}, price:356, effect:\'766\', spad:0.0}, 8: {time:\'13:30:00\', cost:{2:34707, 3:14788, 4:6262, 6:10656}, price:411, effect:\'856\', spad:0.0}, 9: {time:\'14:00:00\', cost:{2:37550, 3:16100, 4:6700, 6:11750}, price:468, effect:\'948\', spad:0.0}, 10: {time:\'14:30:00\', cost:{2:40554, 3:17486, 4:7162, 6:12905}, price:527, effect:\'1042\', spad:0.0}, 11: {time:\'15:00:00\', cost:{2:43713, 3:18944, 4:7648, 6:14120}, price:589, effect:\'1138\', spad:0.0}, 12: {time:\'15:30:00\', cost:{2:47019, 3:20470, 4:8156, 6:15392}, price:652, effect:\'1236\', spad:0.0}, 13: {time:\'16:00:00\', cost:{2:50466, 3:22061, 4:8687, 6:16718}, price:718, effect:\'1335\', spad:0.0}, 14: {time:\'16:30:00\', cost:{2:54049, 3:23714, 4:9238, 6:18095}, price:785, effect:\'1436\', spad:0.0}, 15: {time:\'17:00:00\', cost:{2:57761, 3:25428, 4:9809, 6:19523}, price:854, effect:\'1539\', spad:0.0}, 16: {time:\'17:30:00\', cost:{2:61600, 3:27200, 4:10400, 6:21000}, price:924, effect:\'1642\', spad:0.0}, 17: {time:\'18:00:00\', cost:{2:65560, 3:29027, 4:11009, 6:22523}, price:996, effect:\'1747\', spad:0.0}, 18: {time:\'18:30:00\', cost:{2:69638, 3:30910, 4:11636, 6:24091}, price:1070, effect:\'1854\', spad:0.0}, 19: {time:\'19:00:00\', cost:{2:73832, 3:32845, 4:12281, 6:25704}, price:1144, effect:\'1961\', spad:0.0}, 20: {time:\'19:30:00\', cost:{2:78137, 3:34832, 4:12944, 6:27360}, price:1221, effect:\'2070\', spad:0.0}}, \
63: {1: {time:\'6:11:59\', cost:{2:67000, 3:82500, 4:11500, 6:24500}, price:395, effect:\'870\', spad:0.0}, 2: {time:\'6:24:00\', cost:{2:12297, 3:15446, 4:5148, 6:5148}, price:412, effect:\'887\', spad:0.0}, 3: {time:\'6:35:59\', cost:{2:13737, 3:17605, 4:5868, 6:5868}, price:430, effect:\'905\', spad:0.0}, 4: {time:\'6:48:00\', cost:{2:15278, 3:19917, 4:6639, 6:6639}, price:448, effect:\'923\', spad:0.0}, 5: {time:\'7:00:00\', cost:{2:16898, 3:22347, 4:7449, 6:7449}, price:468, effect:\'943\', spad:0.0}, 6: {time:\'7:11:59\', cost:{2:18585, 3:24878, 4:8292, 6:8292}, price:487, effect:\'962\', spad:0.0}, 7: {time:\'7:24:00\', cost:{2:20330, 3:27495, 4:9165, 6:9165}, price:507, effect:\'982\', spad:0.0}, 8: {time:\'7:35:59\', cost:{2:22125, 3:30188, 4:10062, 6:10062}, price:527, effect:\'1002\', spad:0.0}, 9: {time:\'7:48:00\', cost:{2:23966, 3:32949, 4:10983, 6:10983}, price:548, effect:\'1023\', spad:0.0}, 10: {time:\'8:00:00\', cost:{2:25848, 3:35773, 4:11924, 6:11924}, price:568, effect:\'1043\', spad:0.0}, 11: {time:\'8:11:59\', cost:{2:27769, 3:38654, 4:12884, 6:12884}, price:589, effect:\'1064\', spad:0.0}, 12: {time:\'8:23:59\', cost:{2:29725, 3:41587, 4:13862, 6:13862}, price:610, effect:\'1085\', spad:0.0}, 13: {time:\'8:36:00\', cost:{2:31713, 3:44570, 4:14856, 6:14856}, price:632, effect:\'1107\', spad:0.0}, 14: {time:\'8:48:00\', cost:{2:33733, 3:47599, 4:15866, 6:15866}, price:653, effect:\'1128\', spad:0.0}, 15: {time:\'9:00:00\', cost:{2:35781, 3:50672, 4:16890, 6:16890}, price:674, effect:\'1149\', spad:0.0}, 16: {time:\'9:11:59\', cost:{2:37857, 3:53786, 4:17928, 6:17928}, price:696, effect:\'1171\', spad:0.0}, 17: {time:\'9:23:59\', cost:{2:39959, 3:56939, 4:18979, 6:18979}, price:718, effect:\'1193\', spad:0.0}, 18: {time:\'9:36:00\', cost:{2:42086, 3:60130, 4:20043, 6:20043}, price:740, effect:\'1215\', spad:0.0}, 19: {time:\'9:48:00\', cost:{2:44237, 3:63356, 4:21118, 6:21118}, price:762, effect:\'1237\', spad:0.0}, 20: {time:\'10:00:00\', cost:{2:46411, 3:66616, 4:22205, 6:22205}, price:784, effect:\'1259\', spad:0.0}}, \
64: {1: {time:\'4:11:59\', cost:{2:500, 3:1000}, price:0, effect:\'5%\', spad:1.0}, 2: {time:\'4:24:00\', cost:{2:629, 3:1518}, price:0, effect:\'10%\', spad:2.0}, 3: {time:\'4:35:59\', cost:{2:773, 3:2094}, price:0, effect:\'15%\', spad:3.0}, 4: {time:\'4:48:00\', cost:{2:927, 3:2711}, price:0, effect:\'20%\', spad:4.0}, 5: {time:\'5:00:00\', cost:{2:1089, 3:3359}, price:0, effect:\'25%\', spad:5.0}, 6: {time:\'5:11:59\', cost:{2:1258, 3:4034}, price:5, effect:\'30%\', spad:6.0}, 7: {time:\'5:24:00\', cost:{2:1433, 3:4732}, price:12, effect:\'35%\', spad:7.0}, 8: {time:\'5:35:59\', cost:{2:1612, 3:5450}, price:19, effect:\'40%\', spad:8.0}, 9: {time:\'5:48:00\', cost:{2:1796, 3:6186}, price:27, effect:\'45%\', spad:9.0}, 10: {time:\'6:00:00\', cost:{2:1984, 3:6939}, price:34, effect:\'50%\', spad:10.0}, 11: {time:\'6:11:59\', cost:{2:2176, 3:7707}, price:42, effect:\'55%\', spad:11.0}, 12: {time:\'6:24:00\', cost:{2:2372, 3:8490}, price:50, effect:\'60%\', spad:12.0}, 13: {time:\'6:35:59\', cost:{2:2571, 3:9285}, price:59, effect:\'65%\', spad:13.0}, 14: {time:\'6:48:00\', cost:{2:2773, 3:10093}, price:67, effect:\'70%\', spad:14.0}, 15: {time:\'7:00:00\', cost:{2:2978, 3:10912}, price:76, effect:\'75%\', spad:15.0}, 16: {time:\'7:11:59\', cost:{2:3185, 3:11743}, price:85, effect:\'80%\', spad:16.0}, 17: {time:\'7:24:00\', cost:{2:3395, 3:12583}, price:94, effect:\'85%\', spad:17.0}, 18: {time:\'7:35:59\', cost:{2:3608, 3:13434}, price:103, effect:\'90%\', spad:18.0}, 19: {time:\'7:48:00\', cost:{2:3823, 3:14295}, price:112, effect:\'95%\', spad:19.0}, 20: {time:\'8:00:00\', cost:{2:4041, 3:15164}, price:122, effect:\'100%\', spad:20.0}}, \
65: {1: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:3000, effect:\'\', spad:6.0}, 2: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:6000, effect:\'\', spad:12.0}, 3: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:9000, effect:\'\', spad:18.0}, 4: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:12000, effect:\'\', spad:24.0}, 5: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:15000, effect:\'\', spad:30.0}, 6: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:18000, effect:\'\', spad:36.0}, 7: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:21000, effect:\'\', spad:42.0}, 8: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:24000, effect:\'\', spad:48.0}, 9: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:27000, effect:\'\', spad:54.0}, 10: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:30000, effect:\'\', spad:60.0}, 11: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:33000, effect:\'\', spad:66.0}, 12: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:36000, effect:\'\', spad:72.0}, 13: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:39000, effect:\'\', spad:78.0}, 14: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:42000, effect:\'\', spad:84.0}, 15: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:45000, effect:\'\', spad:90.0}, 16: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:48000, effect:\'\', spad:96.0}, 17: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:51000, effect:\'\', spad:102.0}, 18: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:54000, effect:\'\', spad:108.0}, 19: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:57000, effect:\'\', spad:114.0}, 20: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:10000}, price:60000, effect:\'\', spad:120.0}}, \
66: {1: {time:\'8:15:00\', cost:{2:51200, 3:61000, 4:41250, 5:31500, 6:32000}, price:150, effect:\'10%\', spad:3.0}, 2: {time:\'8:30:00\', cost:{2:52572, 3:62143, 4:42679, 5:33215, 6:34287}, price:207, effect:\'20%\', spad:6.0}, 3: {time:\'8:45:00\', cost:{2:54018, 3:63348, 4:44185, 5:35022, 6:36696}, price:267, effect:\'30%\', spad:9.0}, 4: {time:\'9:00:00\', cost:{2:55513, 3:64594, 4:45743, 5:36892, 6:39189}, price:329, effect:\'40%\', spad:12.0}, 5: {time:\'9:15:00\', cost:{2:57047, 3:65873, 4:47341, 5:38809, 6:41746}, price:393, effect:\'50%\', spad:15.0}, 6: {time:\'9:30:00\', cost:{2:58612, 3:67177, 4:48971, 5:40766, 6:44354}, price:458, effect:\'60%\', spad:18.0}, 7: {time:\'9:45:00\', cost:{2:60204, 3:68503, 4:50629, 5:42755, 6:47007}, price:525, effect:\'70%\', spad:21.0}, 8: {time:\'10:00:00\', cost:{2:61818, 3:69849, 4:52311, 5:44773, 6:49698}, price:592, effect:\'80%\', spad:24.0}, 9: {time:\'10:15:00\', cost:{2:63453, 3:71211, 4:54014, 5:46817, 6:52423}, price:660, effect:\'90%\', spad:27.0}, 10: {time:\'10:30:00\', cost:{2:65107, 3:72589, 4:55736, 5:48883, 6:55178}, price:729, effect:\'100%\', spad:30.0}, 11: {time:\'10:45:00\', cost:{2:66776, 3:73980, 4:57476, 5:50971, 6:57961}, price:799, effect:\'110%\', spad:33.0}, 12: {time:\'11:00:00\', cost:{2:68462, 3:75385, 4:59231, 5:53077, 6:60770}, price:869, effect:\'120%\', spad:36.0}, 13: {time:\'11:15:00\', cost:{2:70161, 3:76801, 4:61001, 5:55201, 6:63602}, price:940, effect:\'130%\', spad:39.0}, 14: {time:\'11:30:00\', cost:{2:71873, 3:78228, 4:62785, 5:57342, 6:66456}, price:1011, effect:\'140%\', spad:42.0}, 15: {time:\'11:45:00\', cost:{2:73598, 3:79665, 4:64581, 5:59497, 6:69330}, price:1083, effect:\'150%\', spad:45.0}, 16: {time:\'12:00:00\', cost:{2:75334, 3:81112, 4:66390, 5:61668, 6:72224}, price:1155, effect:\'160%\', spad:48.0}, 17: {time:\'12:15:00\', cost:{2:77081, 3:82568, 4:68210, 5:63852, 6:75136}, price:1228, effect:\'170%\', spad:51.0}, 18: {time:\'12:30:00\', cost:{2:78839, 3:84032, 4:70040, 5:66048, 6:78065}, price:1301, effect:\'180%\', spad:54.0}, 19: {time:\'12:45:00\', cost:{2:80606, 3:85505, 4:71881, 5:68257, 6:81010}, price:1375, effect:\'190%\', spad:57.0}, 20: {time:\'13:00:00\', cost:{2:82382, 3:86985, 4:73732, 5:70478, 6:83971}, price:1449, effect:\'200%\', spad:60.0}}, \
67: {1: {time:\'3:04:11\', cost:{2:2100, 3:2675, 4:150, 6:90}, price:6, effect:\'32\', spad:0.0}, 2: {time:\'3:12:43\', cost:{2:2400, 3:3200, 4:300, 6:210}, price:16, effect:\'60\', spad:0.0}, 3: {time:\'3:24:21\', cost:{2:2900, 3:4075, 4:550, 6:410}, price:31, effect:\'92\', spad:0.0}, 4: {time:\'3:38:35\', cost:{2:3600, 3:5300, 4:900, 6:690}, price:48, effect:\'126\', spad:0.0}, 5: {time:\'3:55:09\', cost:{2:4500, 3:6875, 4:1350, 6:1050}, price:67, effect:\'161\', spad:0.0}, 6: {time:\'4:13:50\', cost:{2:5600, 3:8800, 4:1900, 6:1490}, price:88, effect:\'198\', spad:0.0}, 7: {time:\'4:34:29\', cost:{2:6900, 3:11075, 4:2550, 6:2010}, price:111, effect:\'237\', spad:0.0}, 8: {time:\'4:57:00\', cost:{2:8400, 3:13700, 4:3300, 6:2610}, price:135, effect:\'276\', spad:0.0}, 9: {time:\'5:21:15\', cost:{2:10100, 3:16675, 4:4150, 6:3290}, price:162, effect:\'317\', spad:0.0}, 10: {time:\'5:47:12\', cost:{2:12000, 3:20000, 4:5100, 6:4050}, price:189, effect:\'358\', spad:0.0}, 11: {time:\'6:14:45\', cost:{2:14100, 3:23675, 4:6150, 6:4890}, price:218, effect:\'400\', spad:0.0}, 12: {time:\'6:43:50\', cost:{2:16400, 3:27700, 4:7300, 6:5810}, price:249, effect:\'443\', spad:0.0}, 13: {time:\'7:14:25\', cost:{2:18900, 3:32075, 4:8550, 6:6810}, price:281, effect:\'487\', spad:0.0}, 14: {time:\'7:46:27\', cost:{2:21600, 3:36800, 4:9900, 6:7890}, price:314, effect:\'532\', spad:0.0}, 15: {time:\'8:19:53\', cost:{2:24500, 3:41875, 4:11350, 6:9050}, price:348, effect:\'577\', spad:0.0}, 16: {time:\'8:54:41\', cost:{2:27600, 3:47300, 4:12900, 6:10290}, price:384, effect:\'622\', spad:0.0}, 17: {time:\'9:30:48\', cost:{2:30900, 3:53075, 4:14550, 6:11610}, price:420, effect:\'669\', spad:0.0}, 18: {time:\'10:08:14\', cost:{2:34400, 3:59200, 4:16300, 6:13010}, price:458, effect:\'715\', spad:0.0}, 19: {time:\'10:46:56\', cost:{2:38100, 3:65675, 4:18150, 6:14490}, price:496, effect:\'763\', spad:0.0}, 20: {time:\'11:26:52\', cost:{2:42000, 3:72500, 4:20100, 6:16050}, price:536, effect:\'811\', spad:0.0}}, \
68: {1: {time:\'5:30:00\', cost:{2:5250, 3:8000, 6:3000}, price:0, effect:\'25\', spad:0.0}, 2: {time:\'6:00:00\', cost:{2:5707, 3:8914, 6:3914}, price:0, effect:\'53\', spad:0.0}, 3: {time:\'6:30:00\', cost:{2:6299, 3:10098, 6:5098}, price:0, effect:\'83\', spad:0.0}, 4: {time:\'7:00:00\', cost:{2:7000, 3:11500, 6:6500}, price:12, effect:\'114\', spad:0.0}, 5: {time:\'7:30:00\', cost:{2:7795, 3:13090, 6:8090}, price:28, effect:\'146\', spad:0.0}, 6: {time:\'8:00:00\', cost:{2:8674, 3:14848, 6:9848}, price:45, effect:\'179\', spad:0.0}, 7: {time:\'8:30:00\', cost:{2:9630, 3:16760, 6:11760}, price:63, effect:\'212\', spad:0.0}, 8: {time:\'9:00:00\', cost:{2:10656, 3:18813, 6:13813}, price:81, effect:\'246\', spad:0.0}, 9: {time:\'9:30:00\', cost:{2:11750, 3:21000, 6:16000}, price:99, effect:\'280\', spad:0.0}, 10: {time:\'10:00:00\', cost:{2:12905, 3:23311, 6:18311}, price:118, effect:\'314\', spad:0.0}, 11: {time:\'10:30:00\', cost:{2:14120, 3:25741, 6:20741}, price:137, effect:\'349\', spad:0.0}, 12: {time:\'11:00:00\', cost:{2:15392, 3:28284, 6:23284}, price:157, effect:\'384\', spad:0.0}, 13: {time:\'11:30:00\', cost:{2:16718, 3:30936, 6:25936}, price:177, effect:\'420\', spad:0.0}, 14: {time:\'12:00:00\', cost:{2:18095, 3:33691, 6:28691}, price:197, effect:\'455\', spad:0.0}, 15: {time:\'12:30:00\', cost:{2:19523, 3:36547, 6:31547}, price:217, effect:\'491\', spad:0.0}, 16: {time:\'13:00:00\', cost:{2:21000, 3:39500, 6:34500}, price:238, effect:\'527\', spad:0.0}, 17: {time:\'13:30:00\', cost:{2:22523, 3:42546, 6:37546}, price:259, effect:\'564\', spad:0.0}, 18: {time:\'14:00:00\', cost:{2:24091, 3:45683, 6:40683}, price:280, effect:\'600\', spad:0.0}, 19: {time:\'14:30:00\', cost:{2:25704, 3:48909, 6:43909}, price:302, effect:\'637\', spad:0.0}, 20: {time:\'15:00:00\', cost:{2:27360, 3:52221, 6:47221}, price:324, effect:\'674\', spad:0.0}}, \
69: {1: {time:\'6:15:00\', cost:{2:3500, 3:5750, 6:400}, price:0, effect:\'10%\', spad:0.0}, 2: {time:\'6:30:00\', cost:{2:4414, 3:7121, 6:1131}, price:0, effect:\'20%\', spad:0.0}, 3: {time:\'6:45:00\', cost:{2:5598, 3:8897, 6:2078}, price:0, effect:\'30%\', spad:0.0}, 4: {time:\'7:00:00\', cost:{2:7000, 3:11000, 6:3200}, price:19, effect:\'40%\', spad:0.0}, 5: {time:\'7:15:00\', cost:{2:8590, 3:13385, 6:4472}, price:43, effect:\'50%\', spad:0.0}, 6: {time:\'7:30:00\', cost:{2:10348, 3:16022, 6:5878}, price:68, effect:\'60%\', spad:0.0}, 7: {time:\'7:45:00\', cost:{2:12260, 3:18890, 6:7408}, price:94, effect:\'70%\', spad:0.0}, 8: {time:\'8:00:00\', cost:{2:14313, 3:21970, 6:9050}, price:121, effect:\'80%\', spad:0.0}, 9: {time:\'8:15:00\', cost:{2:16500, 3:25250, 6:10800}, price:149, effect:\'90%\', spad:0.0}, 10: {time:\'8:30:00\', cost:{2:18811, 3:28717, 6:12649}, price:177, effect:\'100%\', spad:0.0}, 11: {time:\'8:45:00\', cost:{2:21241, 3:32362, 6:14593}, price:206, effect:\'110%\', spad:0.0}, 12: {time:\'9:00:00\', cost:{2:23784, 3:36176, 6:16627}, price:235, effect:\'120%\', spad:0.0}, 13: {time:\'9:15:00\', cost:{2:26436, 3:40154, 6:18748}, price:265, effect:\'130%\', spad:0.0}, 14: {time:\'9:30:00\', cost:{2:29191, 3:44287, 6:20953}, price:295, effect:\'140%\', spad:0.0}, 15: {time:\'9:45:00\', cost:{2:32047, 3:48571, 6:23237}, price:326, effect:\'150%\', spad:0.0}, 16: {time:\'10:00:00\', cost:{2:35000, 3:53000, 6:25600}, price:357, effect:\'160%\', spad:0.0}, 17: {time:\'10:15:00\', cost:{2:38046, 3:57569, 6:28037}, price:389, effect:\'170%\', spad:0.0}, 18: {time:\'10:30:00\', cost:{2:41183, 3:62275, 6:30547}, price:421, effect:\'180%\', spad:0.0}, 19: {time:\'10:45:00\', cost:{2:44409, 3:67114, 6:33127}, price:453, effect:\'190%\', spad:0.0}, 20: {time:\'11:00:00\', cost:{2:47721, 3:72082, 6:35777}, price:486, effect:\'200%\', spad:0.0}}, \
70: {1: {time:\'6:11:59\', cost:{2:20600, 3:34500, 4:5700, 6:2350, 22:3075}, price:65, effect:\'210%\', spad:9.0}, 2: {time:\'6:24:00\', cost:{2:2791, 3:5319, 6:895, 22:3197}, price:70, effect:\'220%\', spad:10.0}, 3: {time:\'6:35:59\', cost:{2:3396, 3:6327, 6:1198, 22:3349}, price:76, effect:\'230%\', spad:11.0}, 4: {time:\'6:48:00\', cost:{2:4089, 3:7482, 6:1544, 22:3522}, price:82, effect:\'240%\', spad:12.0}, 5: {time:\'7:00:00\', cost:{2:4855, 3:8759, 6:1927, 22:3713}, price:89, effect:\'250%\', spad:13.0}, 6: {time:\'7:11:59\', cost:{2:5685, 3:10143, 6:2342, 22:3921}, price:95, effect:\'260%\', spad:14.0}, 7: {time:\'7:24:00\', cost:{2:6573, 3:11622, 6:2786, 22:4143}, price:102, effect:\'270%\', spad:15.0}, 8: {time:\'7:35:59\', cost:{2:7513, 3:13189, 6:3256, 22:4378}, price:109, effect:\'280%\', spad:16.0}, 9: {time:\'7:48:00\', cost:{2:8502, 3:14837, 6:3751, 22:4625}, price:116, effect:\'290%\', spad:17.0}, 10: {time:\'8:00:00\', cost:{2:9535, 3:16559, 6:4267, 22:4883}, price:122, effect:\'300%\', spad:18.0}, 11: {time:\'8:11:59\', cost:{2:10611, 3:18352, 6:4805, 22:5152}, price:129, effect:\'310%\', spad:19.0}, 12: {time:\'8:23:59\', cost:{2:11726, 3:20211, 6:5363, 22:5431}, price:136, effect:\'320%\', spad:20.0}, 13: {time:\'8:36:00\', cost:{2:12880, 3:22133, 6:5940, 22:5720}, price:144, effect:\'330%\', spad:21.0}, 14: {time:\'8:48:00\', cost:{2:14069, 3:24116, 6:6534, 22:6017}, price:151, effect:\'340%\', spad:22.0}, 15: {time:\'9:00:00\', cost:{2:15293, 3:26156, 6:7146, 22:6323}, price:158, effect:\'350%\', spad:23.0}, 16: {time:\'9:11:59\', cost:{2:16550, 3:28251, 6:7775, 22:6637}, price:165, effect:\'360%\', spad:24.0}, 17: {time:\'9:23:59\', cost:{2:17839, 3:30399, 6:8419, 22:6959}, price:172, effect:\'370%\', spad:25.0}, 18: {time:\'9:36:00\', cost:{2:19159, 3:32599, 6:9079, 22:7289}, price:180, effect:\'380%\', spad:26.0}, 19: {time:\'9:48:00\', cost:{2:20508, 3:34847, 6:9754, 22:7627}, price:187, effect:\'390%\', spad:27.0}, 20: {time:\'10:00:00\', cost:{2:21886, 3:37144, 6:10443, 22:7971}, price:194, effect:\'400%\', spad:28.0}}, \
71: {1: {time:\'7:11:59\', cost:{2:60500, 3:32000, 4:12200, 6:16000}, price:155, effect:\'82.5\', spad:0.0}, 2: {time:\'7:24:00\', cost:{2:16319, 3:10139, 4:4555}, price:180, effect:\'85.0\', spad:0.0}, 3: {time:\'7:35:59\', cost:{2:17327, 3:12155, 4:5362}, price:205, effect:\'87.5\', spad:0.0}, 4: {time:\'7:48:00\', cost:{2:18482, 3:14464, 4:6285}, price:230, effect:\'90.0\', spad:0.0}, 5: {time:\'8:00:00\', cost:{2:19759, 3:17018, 4:7307}, price:255, effect:\'92.5\', spad:0.0}, 6: {time:\'8:11:59\', cost:{2:21143, 3:19786, 4:8414}, price:280, effect:\'95.0\', spad:0.0}, 7: {time:\'8:23:59\', cost:{2:22622, 3:22745, 4:9598}, price:305, effect:\'97.5\', spad:0.0}, 8: {time:\'8:36:00\', cost:{2:24189, 3:25879, 4:10851}, price:330, effect:\'100.0\', spad:0.0}, 9: {time:\'8:48:00\', cost:{2:25837, 3:29174, 4:12169}, price:355, effect:\'102.5\', spad:0.0}, 10: {time:\'9:00:00\', cost:{2:27559, 3:32618, 4:13547}, price:380, effect:\'105.0\', spad:0.0}, 11: {time:\'9:11:59\', cost:{2:29352, 3:36204, 4:14981}, price:405, effect:\'107.5\', spad:0.0}, 12: {time:\'9:23:59\', cost:{2:31211, 3:39923, 4:16469}, price:430, effect:\'110.0\', spad:0.0}, 13: {time:\'9:36:00\', cost:{2:33133, 3:43767, 4:18007}, price:455, effect:\'112.5\', spad:0.0}, 14: {time:\'9:48:00\', cost:{2:35116, 3:47732, 4:19593}, price:480, effect:\'115.0\', spad:0.0}, 15: {time:\'10:00:00\', cost:{2:37156, 3:51812, 4:21225}, price:505, effect:\'117.5\', spad:0.0}, 16: {time:\'10:11:59\', cost:{2:39251, 3:56002, 4:22901}, price:530, effect:\'120.0\', spad:0.0}, 17: {time:\'10:23:59\', cost:{2:41399, 3:60299, 4:24619}, price:555, effect:\'122.5\', spad:0.0}, 18: {time:\'10:36:00\', cost:{2:43599, 3:64698, 4:26379}, price:580, effect:\'125.0\', spad:0.0}, 19: {time:\'10:48:00\', cost:{2:45847, 3:69195, 4:28178}, price:605, effect:\'127.5\', spad:0.0}, 20: {time:\'11:00:00\', cost:{2:48144, 3:73789, 4:30015}, price:630, effect:\'130.0\', spad:0.0}}, \
72: {1: {time:\'6:18:00\', cost:{2:15750, 3:16000, 5:1000, 8:500}, price:25, effect:\'30%\', spad:3.0}, 2: {time:\'6:35:59\', cost:{2:16979, 3:17639, 5:2639, 8:1319}, price:57, effect:\'60%\', spad:6.0}, 3: {time:\'6:54:00\', cost:{2:18491, 3:19655, 5:4655, 8:2327}, price:93, effect:\'90%\', spad:9.0}, 4: {time:\'7:11:59\', cost:{2:20223, 3:21964, 5:6964, 8:3482}, price:131, effect:\'120%\', spad:12.0}, 5: {time:\'7:30:00\', cost:{2:22138, 3:24518, 5:9518, 8:4759}, price:172, effect:\'150%\', spad:15.0}, 6: {time:\'7:48:00\', cost:{2:24214, 3:27286, 5:12286, 8:6143}, price:214, effect:\'180%\', spad:18.0}, 7: {time:\'8:06:00\', cost:{2:26434, 3:30245, 5:15245, 8:7622}, price:258, effect:\'210%\', spad:21.0}, 8: {time:\'8:23:59\', cost:{2:28784, 3:33379, 5:18379, 8:9189}, price:303, effect:\'240%\', spad:24.0}, 9: {time:\'8:41:59\', cost:{2:31255, 3:36674, 5:21674, 8:10837}, price:349, effect:\'270%\', spad:27.0}, 10: {time:\'9:00:00\', cost:{2:33839, 3:40118, 5:25118, 8:12559}, price:396, effect:\'300%\', spad:30.0}, 11: {time:\'9:18:00\', cost:{2:36528, 3:43704, 5:28704, 8:14352}, price:444, effect:\'330%\', spad:33.0}, 12: {time:\'9:36:00\', cost:{2:39317, 3:47423, 5:32423, 8:16211}, price:493, effect:\'360%\', spad:36.0}, 13: {time:\'9:54:00\', cost:{2:42200, 3:51267, 5:36267, 8:18133}, price:542, effect:\'390%\', spad:39.0}, 14: {time:\'10:11:59\', cost:{2:45174, 3:55232, 5:40232, 8:20116}, price:593, effect:\'420%\', spad:42.0}, 15: {time:\'10:30:00\', cost:{2:48234, 3:59312, 5:44312, 8:22156}, price:644, effect:\'450%\', spad:45.0}, 16: {time:\'10:48:00\', cost:{2:51377, 3:63502, 5:48502, 8:24251}, price:696, effect:\'480%\', spad:48.0}, 17: {time:\'11:06:00\', cost:{2:54599, 3:67799, 5:52799, 8:26399}, price:748, effect:\'510%\', spad:51.0}, 18: {time:\'11:24:00\', cost:{2:57898, 3:72198, 5:57198, 8:28599}, price:802, effect:\'540%\', spad:54.0}, 19: {time:\'11:41:59\', cost:{2:61271, 3:76695, 5:61695, 8:30847}, price:855, effect:\'570%\', spad:57.0}, 20: {time:\'12:00:00\', cost:{2:64716, 3:81289, 5:66289, 8:33144}, price:910, effect:\'600%\', spad:60.0}}, \
73: {1: {time:\'7:30:00\', cost:{2:6000, 3:6000, 6:6000, 7:6000}, price:0, effect:\'\', spad:0.0}, 2: {time:\'8:00:00\', cost:{2:7000, 3:7000, 6:7000, 7:7000}, price:0, effect:\'\', spad:0.0}, 3: {time:\'8:30:00\', cost:{2:8000, 3:8000, 6:8000, 7:8000}, price:0, effect:\'\', spad:0.0}, 4: {time:\'9:00:00\', cost:{2:9000, 3:9000, 6:9000, 7:9000}, price:0, effect:\'\', spad:0.0}, 5: {time:\'9:30:00\', cost:{2:10000, 3:10000, 6:10000, 7:10000}, price:0, effect:\'\', spad:0.0}, 6: {time:\'10:00:00\', cost:{2:11000, 3:11000, 6:11000, 7:11000}, price:0, effect:\'\', spad:0.0}, 7: {time:\'10:30:00\', cost:{2:12000, 3:12000, 6:12000, 7:12000}, price:0, effect:\'\', spad:0.0}, 8: {time:\'11:00:00\', cost:{2:13000, 3:13000, 6:13000, 7:13000}, price:0, effect:\'\', spad:0.0}, 9: {time:\'11:30:00\', cost:{2:14000, 3:14000, 6:14000, 7:14000}, price:0, effect:\'\', spad:0.0}, 10: {time:\'12:00:00\', cost:{2:15000, 3:15000, 6:15000, 7:15000}, price:0, effect:\'\', spad:0.0}, 11: {time:\'12:30:00\', cost:{2:16000, 3:16000, 6:16000, 7:16000}, price:0, effect:\'\', spad:0.0}, 12: {time:\'13:00:00\', cost:{2:17000, 3:17000, 6:17000, 7:17000}, price:0, effect:\'\', spad:0.0}, 13: {time:\'13:30:00\', cost:{2:18000, 3:18000, 6:18000, 7:18000}, price:0, effect:\'\', spad:0.0}, 14: {time:\'14:00:00\', cost:{2:19000, 3:19000, 6:19000, 7:19000}, price:0, effect:\'\', spad:0.0}, 15: {time:\'14:30:00\', cost:{2:20000, 3:20000, 6:20000, 7:20000}, price:0, effect:\'\', spad:0.0}, 16: {time:\'15:00:00\', cost:{2:21000, 3:21000, 6:21000, 7:21000}, price:0, effect:\'\', spad:0.0}, 17: {time:\'15:30:00\', cost:{2:22000, 3:22000, 6:22000, 7:22000}, price:0, effect:\'\', spad:0.0}, 18: {time:\'16:00:00\', cost:{2:23000, 3:23000, 6:23000, 7:23000}, price:0, effect:\'\', spad:0.0}, 19: {time:\'16:30:00\', cost:{2:24000, 3:24000, 6:24000, 7:24000}, price:0, effect:\'\', spad:0.0}, 20: {time:\'17:00:00\', cost:{2:25000, 3:25000, 6:25000, 7:25000}, price:0, effect:\'\', spad:0.0}}, \
74: {1: {time:\'6:24:00\', cost:{2:30750, 3:20500, 4:10100}, price:212, effect:\'830%\', spad:0.0}, 2: {time:\'6:48:00\', cost:{2:32121, 3:21414, 4:10282}, price:229, effect:\'879%\', spad:0.0}, 3: {time:\'7:11:59\', cost:{2:33897, 3:22598, 4:10519}, price:250, effect:\'939%\', spad:0.0}, 4: {time:\'7:35:59\', cost:{2:36000, 3:24000, 4:10800}, price:272, effect:\'1008%\', spad:0.0}, 5: {time:\'8:00:00\', cost:{2:38385, 3:25590, 4:11118}, price:297, effect:\'1085%\', spad:0.0}, 6: {time:\'8:23:59\', cost:{2:41022, 3:27348, 4:11469}, price:323, effect:\'1168%\', spad:0.0}, 7: {time:\'8:48:00\', cost:{2:43890, 3:29260, 4:11852}, price:350, effect:\'1257%\', spad:0.0}, 8: {time:\'9:11:59\', cost:{2:46970, 3:31313, 4:12262}, price:379, effect:\'1351%\', spad:0.0}, 9: {time:\'9:36:00\', cost:{2:50250, 3:33500, 4:12700, 9:200}, price:408, effect:\'1450%\', spad:0.0}, 10: {time:\'10:00:00\', cost:{2:53717, 3:35811, 4:13162, 9:662}, price:439, effect:\'1553%\', spad:0.0}, 11: {time:\'10:23:59\', cost:{2:57362, 3:38241, 4:13648, 9:1148}, price:471, effect:\'1661%\', spad:0.0}, 12: {time:\'10:48:00\', cost:{2:61176, 3:40784, 4:14156, 9:1656}, price:503, effect:\'1772%\', spad:0.0}, 13: {time:\'11:11:59\', cost:{2:65154, 3:43436, 4:14687, 9:2187}, price:536, effect:\'1888%\', spad:0.0}, 14: {time:\'11:36:00\', cost:{2:69287, 3:46191, 4:15238, 9:2738}, price:570, effect:\'2007%\', spad:0.0}, 15: {time:\'12:00:00\', cost:{2:73571, 3:49047, 4:15809, 9:3309}, price:605, effect:\'2129%\', spad:0.0}, 16: {time:\'12:23:59\', cost:{2:78000, 3:52000, 4:16400, 9:3900}, price:641, effect:\'2255%\', spad:0.0}, 17: {time:\'12:48:00\', cost:{2:82569, 3:55046, 4:17009, 9:4509}, price:677, effect:\'2384%\', spad:0.0}, 18: {time:\'13:11:59\', cost:{2:87275, 3:58183, 4:17636, 9:5136}, price:714, effect:\'2515%\', spad:0.0}, 19: {time:\'13:36:00\', cost:{2:92114, 3:61409, 4:18281, 9:5781}, price:751, effect:\'2650%\', spad:0.0}, 20: {time:\'14:00:00\', cost:{2:97082, 3:64721, 4:18944, 9:6444}, price:789, effect:\'2788%\', spad:0.0}}, \
75: {1: {time:\'5:30:00\', cost:{2:5750, 3:3750, 4:1400}, price:0, effect:\'\', spad:0.0}, 2: {time:\'6:00:00\', cost:{2:6500, 3:4500, 4:1800}, price:0, effect:\'\', spad:0.0}, 3: {time:\'6:30:00\', cost:{2:7250, 3:5250, 4:2200}, price:0, effect:\'\', spad:0.0}, 4: {time:\'7:00:00\', cost:{2:8000, 3:6000, 4:2600}, price:0, effect:\'\', spad:0.0}, 5: {time:\'7:30:00\', cost:{2:8750, 3:6750, 4:3000}, price:0, effect:\'\', spad:0.0}, 6: {time:\'8:00:00\', cost:{2:9500, 3:7500, 4:3400}, price:0, effect:\'\', spad:0.0}, 7: {time:\'8:30:00\', cost:{2:10250, 3:8250, 4:3800}, price:0, effect:\'\', spad:0.0}, 8: {time:\'9:00:00\', cost:{2:11000, 3:9000, 4:4200}, price:0, effect:\'\', spad:0.0}, 9: {time:\'9:30:00\', cost:{2:11750, 3:9750, 4:4600}, price:0, effect:\'\', spad:0.0}, 10: {time:\'10:00:00\', cost:{2:12500, 3:10500, 4:5000}, price:0, effect:\'\', spad:0.0}, 11: {time:\'10:30:00\', cost:{2:13250, 3:11250, 4:5400}, price:0, effect:\'\', spad:0.0}, 12: {time:\'11:00:00\', cost:{2:14000, 3:12000, 4:5800}, price:0, effect:\'\', spad:0.0}, 13: {time:\'11:30:00\', cost:{2:14750, 3:12750, 4:6200}, price:0, effect:\'\', spad:0.0}, 14: {time:\'12:00:00\', cost:{2:15500, 3:13500, 4:6600}, price:0, effect:\'\', spad:0.0}, 15: {time:\'12:30:00\', cost:{2:16250, 3:14250, 4:7000}, price:0, effect:\'\', spad:0.0}, 16: {time:\'13:00:00\', cost:{2:17000, 3:15000, 4:7400}, price:0, effect:\'\', spad:0.0}, 17: {time:\'13:30:00\', cost:{2:17750, 3:15750, 4:7800}, price:0, effect:\'\', spad:0.0}, 18: {time:\'14:00:00\', cost:{2:18500, 3:16500, 4:8200}, price:0, effect:\'\', spad:0.0}, 19: {time:\'14:30:00\', cost:{2:19250, 3:17250, 4:8600}, price:0, effect:\'\', spad:0.0}, 20: {time:\'15:00:00\', cost:{2:20000, 3:18000, 4:9000}, price:0, effect:\'\', spad:0.0}}, \
76: {1: {time:\'2:17:59\', cost:{2:105, 3:60}, price:0, effect:\'\', spad:0.0}, 2: {time:\'2:35:59\', cost:{2:110, 3:70}, price:0, effect:\'\', spad:0.0}, 3: {time:\'2:54:00\', cost:{2:115, 3:80}, price:0, effect:\'\', spad:0.0}, 4: {time:\'3:12:00\', cost:{2:120, 3:90}, price:0, effect:\'\', spad:0.0}, 5: {time:\'3:30:00\', cost:{2:125, 3:100}, price:0, effect:\'\', spad:0.0}, 6: {time:\'3:48:00\', cost:{2:130, 3:110}, price:0, effect:\'\', spad:0.0}, 7: {time:\'4:05:59\', cost:{2:135, 3:120}, price:0, effect:\'\', spad:0.0}, 8: {time:\'4:24:00\', cost:{2:140, 3:130}, price:0, effect:\'\', spad:0.0}, 9: {time:\'4:42:00\', cost:{2:145, 3:140}, price:0, effect:\'\', spad:0.0}, 10: {time:\'5:00:00\', cost:{2:150, 3:150}, price:0, effect:\'\', spad:0.0}, 11: {time:\'5:18:00\', cost:{2:155, 3:160}, price:0, effect:\'\', spad:0.0}, 12: {time:\'5:36:00\', cost:{2:160, 3:170}, price:0, effect:\'\', spad:0.0}, 13: {time:\'5:54:00\', cost:{2:165, 3:180}, price:0, effect:\'\', spad:0.0}, 14: {time:\'6:12:00\', cost:{2:170, 3:190}, price:0, effect:\'\', spad:0.0}, 15: {time:\'6:30:00\', cost:{2:175, 3:200}, price:0, effect:\'\', spad:0.0}, 16: {time:\'6:48:00\', cost:{2:180, 3:210}, price:0, effect:\'\', spad:0.0}, 17: {time:\'7:06:00\', cost:{2:185, 3:220}, price:0, effect:\'\', spad:0.0}, 18: {time:\'7:24:00\', cost:{2:190, 3:230}, price:0, effect:\'\', spad:0.0}, 19: {time:\'7:42:00\', cost:{2:195, 3:240}, price:0, effect:\'\', spad:0.0}, 20: {time:\'8:00:00\', cost:{2:200, 3:250}, price:0, effect:\'\', spad:0.0}}, \
77: {1: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:5000}, price:3000, effect:\'\', spad:6.0}, 2: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:5000}, price:6000, effect:\'\', spad:12.0}, 3: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:5000}, price:9000, effect:\'\', spad:18.0}, 4: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:5000}, price:12000, effect:\'\', spad:24.0}, 5: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:5000}, price:15000, effect:\'\', spad:30.0}, 6: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:5000}, price:18000, effect:\'\', spad:36.0}, 7: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:5000}, price:21000, effect:\'\', spad:42.0}, 8: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:5000}, price:24000, effect:\'\', spad:48.0}, 9: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:5000}, price:27000, effect:\'\', spad:54.0}, 10: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:5000}, price:30000, effect:\'\', spad:60.0}, 11: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:5000}, price:33000, effect:\'\', spad:66.0}, 12: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:5000}, price:36000, effect:\'\', spad:72.0}, 13: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:5000}, price:39000, effect:\'\', spad:78.0}, 14: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:5000}, price:42000, effect:\'\', spad:84.0}, 15: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:5000}, price:45000, effect:\'\', spad:90.0}, 16: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:5000}, price:48000, effect:\'\', spad:96.0}, 17: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:5000}, price:51000, effect:\'\', spad:102.0}, 18: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:5000}, price:54000, effect:\'\', spad:108.0}, 19: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:5000}, price:57000, effect:\'\', spad:114.0}, 20: {time:\'10:00:00\', cost:{2:100000, 3:100000, 4:40000, 5:50000, 6:30000, 9:10000, 10:5000}, price:60000, effect:\'\', spad:120.0}}, \
78: {1: {time:\'5:18:00\', cost:{2:35500, 3:70650, 4:5300}, price:110, effect:\'1020%\', spad:0.0}, 2: {time:\'5:35:59\', cost:{2:16414, 3:26838, 4:5848}, price:126, effect:\'1050%\', spad:0.0}, 3: {time:\'5:54:00\', cost:{2:17598, 3:28377, 4:6558}, price:146, effect:\'1084%\', spad:0.0}, 4: {time:\'6:11:59\', cost:{2:19000, 3:30200, 4:7400}, price:169, effect:\'1123%\', spad:0.0}, 5: {time:\'6:30:00\', cost:{2:20590, 3:32267, 4:8354}, price:195, effect:\'1164%\', spad:0.0}, 6: {time:\'6:48:00\', cost:{2:22348, 3:34553, 4:9409}, price:222, effect:\'1209%\', spad:0.0}, 7: {time:\'7:05:59\', cost:{2:24260, 3:37038, 4:10556}, price:252, effect:\'1255%\', spad:0.0}, 8: {time:\'7:24:00\', cost:{2:26313, 3:39707, 4:11788}, price:283, effect:\'1303%\', spad:0.0}, 9: {time:\'7:42:00\', cost:{2:28500, 3:42550, 4:13100}, price:316, effect:\'1354%\', spad:0.0}, 10: {time:\'8:00:00\', cost:{2:30811, 3:45554, 4:14486, 9:162}, price:351, effect:\'1406%\', spad:0.0}, 11: {time:\'8:18:00\', cost:{2:33241, 3:48713, 4:15944, 9:648}, price:387, effect:\'1459%\', spad:0.0}, 12: {time:\'8:36:00\', cost:{2:35784, 3:52019, 4:17470, 9:1156}, price:424, effect:\'1514%\', spad:0.0}, 13: {time:\'8:54:00\', cost:{2:38436, 3:55466, 4:19061, 9:1687}, price:462, effect:\'1571%\', spad:0.0}, 14: {time:\'9:11:59\', cost:{2:41191, 3:59049, 4:20714, 9:2238}, price:502, effect:\'1629%\', spad:0.0}, 15: {time:\'9:30:00\', cost:{2:44047, 3:62761, 4:22428, 9:2809}, price:543, effect:\'1688%\', spad:0.0}, 16: {time:\'9:48:00\', cost:{2:47000, 3:66600, 4:24200, 9:3400}, price:585, effect:\'1748%\', spad:0.0}, 17: {time:\'10:06:00\', cost:{2:50046, 3:70560, 4:26027, 9:4009}, price:627, effect:\'1809%\', spad:0.0}, 18: {time:\'10:24:00\', cost:{2:53183, 3:74638, 4:27910, 9:4636}, price:671, effect:\'1872%\', spad:0.0}, 19: {time:\'10:41:59\', cost:{2:56409, 3:78832, 4:29845, 9:5281}, price:716, effect:\'1935%\', spad:0.0}, 20: {time:\'11:00:00\', cost:{2:59721, 3:83137, 4:31832, 9:5944}, price:762, effect:\'2000%\', spad:0.0}}, \
79: {1: {time:\'5:05:59\', cost:{2:4650, 3:10100, 4:200, 6:2175}, price:0, effect:\'300\', spad:0.0}, 2: {time:\'5:11:59\', cost:{2:1869, 3:2492, 4:273, 6:884}, price:0, effect:\'315\', spad:0.0}, 3: {time:\'5:18:00\', cost:{2:2125, 3:2834, 4:358, 6:1012}, price:0, effect:\'330\', spad:0.0}, 4: {time:\'5:24:00\', cost:{2:2409, 3:3212, 4:453, 6:1154}, price:0, effect:\'345\', spad:0.0}, 5: {time:\'5:30:00\', cost:{2:2715, 3:3620, 4:555, 6:1307}, price:8, effect:\'360\', spad:0.0}, 6: {time:\'5:35:59\', cost:{2:3040, 3:4054, 4:663, 6:1470}, price:18, effect:\'375\', spad:0.0}, 7: {time:\'5:41:59\', cost:{2:3382, 3:4509, 4:777, 6:1641}, price:27, effect:\'390\', spad:0.0}, 8: {time:\'5:48:00\', cost:{2:3739, 3:4985, 4:896, 6:1819}, price:36, effect:\'405\', spad:0.0}, 9: {time:\'5:54:00\', cost:{2:4109, 3:5479, 4:1019, 6:2004}, price:45, effect:\'420\', spad:0.0}, 10: {time:\'6:00:00\', cost:{2:4492, 3:5990, 4:1147, 6:2196}, price:54, effect:\'435\', spad:0.0}, 11: {time:\'6:05:59\', cost:{2:4887, 3:6516, 4:1279, 6:2393}, price:62, effect:\'450\', spad:0.0}, 12: {time:\'6:11:59\', cost:{2:5293, 3:7057, 4:1414, 6:2596}, price:71, effect:\'465\', spad:0.0}, 13: {time:\'6:18:00\', cost:{2:5709, 3:7612, 4:1553, 6:2804}, price:79, effect:\'480\', spad:0.0}, 14: {time:\'6:24:00\', cost:{2:6135, 3:8180, 4:1695, 6:3017}, price:87, effect:\'495\', spad:0.0}, 15: {time:\'6:30:00\', cost:{2:6570, 3:8760, 4:1840, 6:3235}, price:95, effect:\'510\', spad:0.0}, 16: {time:\'6:35:59\', cost:{2:7013, 3:9351, 4:1987, 6:3456}, price:103, effect:\'525\', spad:0.0}, 17: {time:\'6:41:59\', cost:{2:7465, 3:9954, 4:2138, 6:3682}, price:110, effect:\'540\', spad:0.0}, 18: {time:\'6:48:00\', cost:{2:7926, 3:10568, 4:2292, 6:3913}, price:118, effect:\'555\', spad:0.0}, 19: {time:\'6:54:00\', cost:{2:8393, 3:11191, 4:2447, 6:4146}, price:126, effect:\'570\', spad:0.0}, 20: {time:\'7:00:00\', cost:{2:8869, 3:11825, 4:2606, 6:4384}, price:133, effect:\'585\', spad:0.0}}, \
80: {1: {time:\'5:05:59\', cost:{2:39100, 3:42150, 4:900, 6:15650}, price:110, effect:\'265%\', spad:14.0}, 2: {time:\'5:11:59\', cost:{2:11318, 3:10462, 4:1204, 6:4907}, price:126, effect:\'280%\', spad:16.0}, 3: {time:\'5:18:00\', cost:{2:12979, 3:11569, 4:1619, 6:5599}, price:146, effect:\'295%\', spad:18.0}, 4: {time:\'5:24:00\', cost:{2:15013, 3:12925, 4:2128, 6:6447}, price:169, effect:\'310%\', spad:20.0}, 5: {time:\'5:30:00\', cost:{2:17379, 3:14503, 4:2719, 6:7433}, price:195, effect:\'325%\', spad:22.0}, 6: {time:\'5:35:59\', cost:{2:20048, 3:16282, 4:3387, 6:8545}, price:222, effect:\'340%\', spad:24.0}, 7: {time:\'5:41:59\', cost:{2:22999, 3:18249, 4:4124, 6:9774}, price:252, effect:\'355%\', spad:26.0}, 8: {time:\'5:48:00\', cost:{2:26214, 3:20393, 4:4928, 6:11114}, price:283, effect:\'370%\', spad:28.0}, 9: {time:\'5:54:00\', cost:{2:29680, 3:22703, 4:5795, 6:12558}, price:316, effect:\'385%\', spad:30.0}, 10: {time:\'6:00:00\', cost:{2:33386, 3:25174, 4:6721, 6:14102}, price:351, effect:\'400%\', spad:32.0}, 11: {time:\'6:05:59\', cost:{2:37321, 3:27797, 4:7705, 6:15742}, price:387, effect:\'415%\', spad:34.0}, 12: {time:\'6:11:59\', cost:{2:41477, 3:30568, 4:8744, 6:17473}, price:424, effect:\'430%\', spad:36.0}, 13: {time:\'6:18:00\', cost:{2:45846, 3:33480, 4:9836, 6:19294}, price:462, effect:\'445%\', spad:38.0}, 14: {time:\'6:24:00\', cost:{2:50421, 3:36531, 4:10980, 6:21200}, price:502, effect:\'460%\', spad:40.0}, 15: {time:\'6:30:00\', cost:{2:55198, 3:39715, 4:12174, 6:23190}, price:543, effect:\'475%\', spad:42.0}, 16: {time:\'6:35:59\', cost:{2:60169, 3:43029, 4:13417, 6:25262}, price:585, effect:\'490%\', spad:44.0}, 17: {time:\'6:41:59\', cost:{2:65330, 3:46470, 4:14707, 6:27412}, price:627, effect:\'505%\', spad:46.0}, 18: {time:\'6:48:00\', cost:{2:70676, 3:50034, 4:16044, 6:29640}, price:671, effect:\'520%\', spad:48.0}, 19: {time:\'6:54:00\', cost:{2:76204, 3:53719, 4:17426, 6:31943}, price:716, effect:\'535%\', spad:50.0}, 20: {time:\'7:00:00\', cost:{2:81910, 3:57523, 4:18852, 6:34320}, price:762, effect:\'550%\', spad:52.0}}, \
81: {1: {time:\'8:18:00\', cost:{2:87700, 3:113700, 6:52600}, price:404, effect:\'63.4\', spad:0.0}, 2: {time:\'8:36:00\', cost:{2:23847, 3:10666, 6:15583}, price:429, effect:\'66.7\', spad:0.0}, 3: {time:\'8:53:59\', cost:{2:25258, 3:13086, 6:16793}, price:458, effect:\'70.1\', spad:0.0}, 4: {time:\'9:11:59\', cost:{2:26875, 3:15857, 6:18178}, price:489, effect:\'73.4\', spad:0.0}, 5: {time:\'9:30:00\', cost:{2:28662, 3:18921, 6:19710}, price:521, effect:\'76.8\', spad:0.0}, 6: {time:\'9:48:00\', cost:{2:30600, 3:22243, 6:21371}, price:555, effect:\'80.2\', spad:0.0}, 7: {time:\'10:06:00\', cost:{2:32671, 3:25794, 6:23147}, price:590, effect:\'83.5\', spad:0.0}, 8: {time:\'10:23:59\', cost:{2:34865, 3:29555, 6:25027}, price:626, effect:\'86.9\', spad:0.0}, 9: {time:\'10:41:59\', cost:{2:37171, 3:33508, 6:27004}, price:663, effect:\'90.2\', spad:0.0}, 10: {time:\'11:00:00\', cost:{2:39583, 3:37642, 6:29071}, price:700, effect:\'93.6\', spad:0.0}, 11: {time:\'11:18:00\', cost:{2:42093, 3:41945, 6:31222}, price:739, effect:\'97.0\', spad:0.0}, 12: {time:\'11:36:00\', cost:{2:44696, 3:46407, 6:33453}, price:778, effect:\'100.3\', spad:0.0}, 13: {time:\'11:54:00\', cost:{2:47387, 3:51021, 6:35760}, price:818, effect:\'103.7\', spad:0.0}, 14: {time:\'12:11:59\', cost:{2:50162, 3:55779, 6:38139}, price:858, effect:\'107.0\', spad:0.0}, 15: {time:\'12:30:00\', cost:{2:53018, 3:60675, 6:40587}, price:899, effect:\'110.4\', spad:0.0}, 16: {time:\'12:48:00\', cost:{2:55952, 3:65703, 6:43101}, price:941, effect:\'113.8\', spad:0.0}, 17: {time:\'13:06:00\', cost:{2:58959, 3:70859, 6:45679}, price:983, effect:\'117.1\', spad:0.0}, 18: {time:\'13:24:00\', cost:{2:62038, 3:76137, 6:48318}, price:1025, effect:\'120.5\', spad:0.0}, 19: {time:\'13:41:59\', cost:{2:65187, 3:81534, 6:51017}, price:1068, effect:\'123.8\', spad:0.0}, 20: {time:\'14:00:00\', cost:{2:68402, 3:87046, 6:53773}, price:1112, effect:\'127.2\', spad:0.0}}, \
82: {1: {time:\'5:00:00\', cost:{2:35000, 3:45000, 4:7400, 6:15800}, price:140, effect:\'595\', spad:0.0}, 2: {time:\'5:00:00\', cost:{2:10000, 3:10000, 4:1000, 6:3500}, price:147, effect:\'606\', spad:0.0}, 3: {time:\'5:00:00\', cost:{2:10000, 3:10000, 4:1000, 6:3500}, price:155, effect:\'618\', spad:0.0}, 4: {time:\'5:00:00\', cost:{2:10000, 3:10000, 4:1000, 6:3500}, price:165, effect:\'630\', spad:0.0}, 5: {time:\'5:00:00\', cost:{2:10000, 3:10000, 4:1000, 6:3500}, price:175, effect:\'643\', spad:0.0}, 6: {time:\'5:00:00\', cost:{2:10000, 3:10000, 4:1000, 6:3500}, price:186, effect:\'656\', spad:0.0}, 7: {time:\'5:00:00\', cost:{2:10000, 3:10000, 4:1000, 6:3500}, price:197, effect:\'670\', spad:0.0}, 8: {time:\'5:00:00\', cost:{2:10000, 3:10000, 4:1000, 6:3500}, price:209, effect:\'683\', spad:0.0}, 9: {time:\'5:00:00\', cost:{2:10000, 3:10000, 4:1000, 6:3500}, price:221, effect:\'697\', spad:0.0}, 10: {time:\'5:00:00\', cost:{2:10000, 3:10000, 4:1000, 6:3500}, price:234, effect:\'710\', spad:0.0}, 11: {time:\'5:00:00\', cost:{2:10000, 3:10000, 4:1000, 6:3500}, price:247, effect:\'724\', spad:0.0}, 12: {time:\'5:00:00\', cost:{2:10000, 3:10000, 4:1000, 6:3500}, price:261, effect:\'738\', spad:0.0}, 13: {time:\'5:00:00\', cost:{2:10000, 3:10000, 4:1000, 6:3500}, price:275, effect:\'753\', spad:0.0}, 14: {time:\'5:00:00\', cost:{2:10000, 3:10000, 4:1000, 6:3500}, price:289, effect:\'767\', spad:0.0}, 15: {time:\'5:00:00\', cost:{2:10000, 3:10000, 4:1000, 6:3500}, price:304, effect:\'781\', spad:0.0}, 16: {time:\'5:00:00\', cost:{2:10000, 3:10000, 4:1000, 6:3500}, price:318, effect:\'796\', spad:0.0}, 17: {time:\'5:00:00\', cost:{2:10000, 3:10000, 4:1000, 6:3500}, price:333, effect:\'810\', spad:0.0}, 18: {time:\'5:00:00\', cost:{2:10000, 3:10000, 4:1000, 6:3500}, price:349, effect:\'825\', spad:0.0}, 19: {time:\'5:00:00\', cost:{2:10000, 3:10000, 4:1000, 6:3500}, price:364, effect:\'840\', spad:0.0}, 20: {time:\'5:00:00\', cost:{2:10000, 3:10000, 4:1000, 6:3500}, price:380, effect:\'854\', spad:0.0}}, \
83: {1: {time:\'2:12:00\', cost:{2:22, 3:24}, price:0, effect:\'\', spad:0.0}, 2: {time:\'2:24:00\', cost:{2:24, 3:28}, price:0, effect:\'\', spad:0.0}, 3: {time:\'2:35:59\', cost:{2:26, 3:32}, price:0, effect:\'\', spad:0.0}, 4: {time:\'2:47:59\', cost:{2:28, 3:36}, price:0, effect:\'\', spad:0.0}, 5: {time:\'3:00:00\', cost:{2:30, 3:40}, price:0, effect:\'\', spad:0.0}, 6: {time:\'3:12:00\', cost:{2:32, 3:44}, price:0, effect:\'\', spad:0.0}, 7: {time:\'3:24:00\', cost:{2:34, 3:48}, price:0, effect:\'\', spad:0.0}, 8: {time:\'3:35:59\', cost:{2:36, 3:52}, price:0, effect:\'\', spad:0.0}, 9: {time:\'3:47:59\', cost:{2:38, 3:56}, price:0, effect:\'\', spad:0.0}, 10: {time:\'4:00:00\', cost:{2:40, 3:60}, price:0, effect:\'\', spad:0.0}, 11: {time:\'4:11:59\', cost:{2:42, 3:64}, price:0, effect:\'\', spad:0.0}, 12: {time:\'4:24:00\', cost:{2:44, 3:68}, price:0, effect:\'\', spad:0.0}, 13: {time:\'4:35:59\', cost:{2:46, 3:72}, price:0, effect:\'\', spad:0.0}, 14: {time:\'4:48:00\', cost:{2:48, 3:76}, price:0, effect:\'\', spad:0.0}, 15: {time:\'5:00:00\', cost:{2:50, 3:80}, price:0, effect:\'\', spad:0.0}, 16: {time:\'5:11:59\', cost:{2:52, 3:84}, price:0, effect:\'\', spad:0.0}, 17: {time:\'5:24:00\', cost:{2:54, 3:88}, price:0, effect:\'\', spad:0.0}, 18: {time:\'5:35:59\', cost:{2:56, 3:92}, price:0, effect:\'\', spad:0.0}, 19: {time:\'5:48:00\', cost:{2:58, 3:96}, price:0, effect:\'\', spad:0.0}, 20: {time:\'6:00:00\', cost:{2:60, 3:100}, price:0, effect:\'\', spad:0.0}}, \
84: {1: {time:\'0:36:00\', cost:{2:125, 3:70}, price:0, effect:\'10%\', spad:0.2}, 2: {time:\'0:44:16\', cost:{2:176, 3:99}, price:0, effect:\'18%\', spad:0.3}, 3: {time:\'0:53:41\', cost:{2:235, 3:133}, price:0, effect:\'25%\', spad:0.6}, 4: {time:\'1:03:56\', cost:{2:302, 3:171}, price:0, effect:\'31%\', spad:0.8}, 5: {time:\'1:14:51\', cost:{2:373, 3:212}, price:0, effect:\'38%\', spad:1.0}, 6: {time:\'1:26:20\', cost:{2:449, 3:255}, price:0, effect:\'44%\', spad:1.3}, 7: {time:\'1:38:18\', cost:{2:529, 3:300}, price:0, effect:\'49%\', spad:1.5}, 8: {time:\'1:50:43\', cost:{2:612, 3:348}, price:0, effect:\'55%\', spad:1.8}, 9: {time:\'2:03:31\', cost:{2:698, 3:397}, price:0, effect:\'60%\', spad:2.1}, 10: {time:\'2:16:41\', cost:{2:788, 3:449}, price:0, effect:\'65%\', spad:2.4}, 11: {time:\'2:30:11\', cost:{2:880, 3:501}, price:0, effect:\'70%\', spad:2.7}, 12: {time:\'2:44:00\', cost:{2:975, 3:555}, price:0, effect:\'75%\', spad:3.0}, 13: {time:\'2:58:06\', cost:{2:1072, 3:611}, price:0, effect:\'80%\', spad:3.3}, 14: {time:\'3:12:29\', cost:{2:1171, 3:668}, price:0, effect:\'84%\', spad:3.6}, 15: {time:\'3:27:07\', cost:{2:1273, 3:726}, price:0, effect:\'89%\', spad:3.9}, 16: {time:\'3:42:00\', cost:{2:1376, 3:785}, price:0, effect:\'94%\', spad:4.2}, 17: {time:\'3:57:06\', cost:{2:1482, 3:845}, price:0, effect:\'98%\', spad:4.5}, 18: {time:\'4:12:27\', cost:{2:1589, 3:906}, price:0, effect:\'102%\', spad:4.8}, 19: {time:\'4:28:00\', cost:{2:1698, 3:969}, price:0, effect:\'107%\', spad:5.1}, 20: {time:\'4:43:46\', cost:{2:1809, 3:1032}, price:0, effect:\'111%\', spad:5.5}}, \
85: {1: {time:\'0:00:53\', cost:{2:20, 3:40}, price:0, effect:\'0.2\', spad:0.0}, 2: {time:\'0:02:22\', cost:{2:26, 3:42}, price:0, effect:\'0.4\', spad:0.0}, 3: {time:\'0:04:11\', cost:{2:33, 3:44}, price:0, effect:\'0.6\', spad:0.0}, 4: {time:\'0:06:16\', cost:{2:40, 3:46}, price:0, effect:\'0.8\', spad:0.0}, 5: {time:\'0:08:33\', cost:{2:48, 3:49}, price:0, effect:\'1.0\', spad:0.0}, 6: {time:\'0:11:03\', cost:{2:55, 3:51}, price:0, effect:\'1.2\', spad:0.0}, 7: {time:\'0:13:43\', cost:{2:63, 3:54}, price:0, effect:\'1.4\', spad:0.0}, 8: {time:\'0:16:32\', cost:{2:70, 3:56}, price:0, effect:\'1.6\', spad:0.0}, 9: {time:\'0:19:30\', cost:{2:78, 3:59}, price:0, effect:\'1.8\', spad:0.0}, 10: {time:\'0:22:36\', cost:{2:86, 3:62}, price:0, effect:\'2.0\', spad:0.0}, 11: {time:\'0:25:50\', cost:{2:93, 3:64}, price:0, effect:\'2.2\', spad:0.0}, 12: {time:\'0:29:10\', cost:{2:101, 3:67}, price:0, effect:\'2.4\', spad:0.0}, 13: {time:\'0:32:38\', cost:{2:109, 3:69}, price:0, effect:\'2.6\', spad:0.0}, 14: {time:\'0:36:12\', cost:{2:117, 3:72}, price:0, effect:\'2.8\', spad:0.0}, 15: {time:\'0:39:52\', cost:{2:125, 3:75}, price:0, effect:\'3.0\', spad:0.0}, 16: {time:\'0:43:39\', cost:{2:133, 3:77}, price:0, effect:\'3.2\', spad:0.0}, 17: {time:\'0:47:31\', cost:{2:141, 3:80}, price:0, effect:\'3.4\', spad:0.0}, 18: {time:\'0:51:28\', cost:{2:150, 3:83}, price:0, effect:\'3.6\', spad:0.0}, 19: {time:\'0:55:31\', cost:{2:158, 3:86}, price:0, effect:\'3.8\', spad:0.0}, 20: {time:\'0:59:39\', cost:{2:166, 3:88}, price:0, effect:\'4.0\', spad:0.0}}, \
86: {1: {time:\'0:01:00\', cost:{2:25}, price:0, effect:\'20\', spad:0.0}, 2: {time:\'0:07:00\', cost:{2:31}, price:0, effect:\'34\', spad:0.0}, 3: {time:\'0:13:00\', cost:{2:38}, price:0, effect:\'51\', spad:0.0}, 4: {time:\'0:19:00\', cost:{2:46, 3:6}, price:0, effect:\'70\', spad:0.0}, 5: {time:\'0:25:00\', cost:{2:54, 3:12}, price:0, effect:\'91\', spad:0.0}, 6: {time:\'0:31:00\', cost:{2:62, 3:19}, price:0, effect:\'112\', spad:0.0}, 7: {time:\'0:37:00\', cost:{2:71, 3:26}, price:0, effect:\'135\', spad:0.0}, 8: {time:\'0:43:00\', cost:{2:80, 3:33}, price:0, effect:\'159\', spad:0.0}, 9: {time:\'0:49:00\', cost:{2:89, 3:40}, price:0, effect:\'183\', spad:0.0}, 10: {time:\'0:55:00\', cost:{2:99, 3:48}, price:0, effect:\'209\', spad:0.0}, 11: {time:\'1:01:00\', cost:{2:108, 3:56}, price:0, effect:\'235\', spad:0.0}, 12: {time:\'1:07:00\', cost:{2:118, 3:63}, price:0, effect:\'262\', spad:0.0}, 13: {time:\'1:13:00\', cost:{2:128, 3:71}, price:0, effect:\'290\', spad:0.0}, 14: {time:\'1:19:00\', cost:{2:138, 3:79}, price:0, effect:\'319\', spad:0.0}, 15: {time:\'1:25:00\', cost:{2:148, 3:88}, price:0, effect:\'348\', spad:0.0}, 16: {time:\'1:31:00\', cost:{2:159, 3:96}, price:0, effect:\'377\', spad:0.0}, 17: {time:\'1:37:00\', cost:{2:169, 3:104}, price:0, effect:\'407\', spad:0.0}, 18: {time:\'1:43:00\', cost:{2:180, 3:113}, price:0, effect:\'438\', spad:0.0}, 19: {time:\'1:49:00\', cost:{2:191, 3:121}, price:0, effect:\'469\', spad:0.0}, 20: {time:\'1:55:00\', cost:{2:202, 3:130}, price:0, effect:\'501\', spad:0.0}}, \
87: {1: {time:\'1:30:00\', cost:{2:58, 3:115}, price:0, effect:\'1\', spad:0.0}, 2: {time:\'1:38:46\', cost:{2:68, 3:134}, price:0, effect:\'2\', spad:0.0}, 3: {time:\'1:49:01\', cost:{2:79, 3:156}, price:0, effect:\'3\', spad:0.0}, 4: {time:\'2:00:22\', cost:{2:92, 3:179, 7:12}, price:0, effect:\'4\', spad:0.0}, 5: {time:\'2:12:37\', cost:{2:105, 3:203, 7:25}, price:0, effect:\'5\', spad:0.0}, 6: {time:\'2:25:37\', cost:{2:118, 3:228, 7:38}, price:0, effect:\'6\', spad:0.0}, 7: {time:\'2:39:17\', cost:{2:132, 3:254, 7:52}, price:0, effect:\'7\', spad:0.0}, 8: {time:\'2:53:34\', cost:{2:147, 3:281, 7:67}, price:0, effect:\'8\', spad:0.0}, 9: {time:\'3:08:23\', cost:{2:161, 3:309, 7:81}, price:0, effect:\'9\', spad:0.0}, 10: {time:\'3:23:42\', cost:{2:176, 3:337, 7:96}, price:0, effect:\'10\', spad:0.0}, 11: {time:\'3:39:30\', cost:{2:192, 3:366, 7:112}, price:0, effect:\'11\', spad:0.0}, 12: {time:\'3:55:44\', cost:{2:207, 3:395, 7:127}, price:0, effect:\'12\', spad:0.0}, 13: {time:\'4:12:22\', cost:{2:223, 3:425, 7:143}, price:0, effect:\'13\', spad:0.0}, 14: {time:\'4:29:24\', cost:{2:239, 3:455, 7:159}, price:0, effect:\'14\', spad:0.0}, 15: {time:\'4:46:48\', cost:{2:256, 3:486, 7:176}, price:0, effect:\'15\', spad:0.0}, 16: {time:\'5:04:33\', cost:{2:272, 3:517, 7:192}, price:0, effect:\'16\', spad:0.0}, 17: {time:\'5:22:38\', cost:{2:289, 3:549, 7:209}, price:0, effect:\'17\', spad:0.0}, 18: {time:\'5:41:02\', cost:{2:306, 3:581, 7:226}, price:0, effect:\'18\', spad:0.0}, 19: {time:\'5:59:45\', cost:{2:323, 3:613, 7:243}, price:0, effect:\'19\', spad:0.0}, 20: {time:\'6:18:46\', cost:{2:341, 3:646, 7:261}, price:0, effect:\'21\', spad:0.0}}, \
88: {1: {time:\'0:51:00\', cost:{2:85, 3:90}, price:0, effect:\'11%\', spad:0.4}, 2: {time:\'0:56:29\', cost:{2:93, 3:106}, price:0, effect:\'19%\', spad:0.9}, 3: {time:\'1:03:35\', cost:{2:103, 3:126}, price:0, effect:\'27%\', spad:1.3}, 4: {time:\'1:12:00\', cost:{2:114, 3:149}, price:0, effect:\'35%\', spad:1.8}, 5: {time:\'1:21:32\', cost:{2:127, 3:175}, price:0, effect:\'43%\', spad:2.3}, 6: {time:\'1:32:05\', cost:{2:141, 3:202}, price:0, effect:\'50%\', spad:2.9}, 7: {time:\'1:43:33\', cost:{2:156, 3:232}, price:0, effect:\'57%\', spad:3.4}, 8: {time:\'1:55:52\', cost:{2:171, 3:263}, price:0, effect:\'64%\', spad:3.9}, 9: {time:\'2:09:00\', cost:{2:188, 3:296}, price:0, effect:\'71%\', spad:4.5}, 10: {time:\'2:22:52\', cost:{2:205, 3:331}, price:0, effect:\'77%\', spad:5.0}, 11: {time:\'2:37:26\', cost:{2:223, 3:367}, price:0, effect:\'84%\', spad:5.6}, 12: {time:\'2:52:42\', cost:{2:242, 3:404}, price:0, effect:\'90%\', spad:6.2}, 13: {time:\'3:08:36\', cost:{2:261, 3:442}, price:0, effect:\'97%\', spad:6.7}, 14: {time:\'3:25:08\', cost:{2:281, 3:482}, price:0, effect:\'103%\', spad:7.3}, 15: {time:\'3:42:17\', cost:{2:301, 3:523}, price:0, effect:\'109%\', spad:7.9}, 16: {time:\'4:00:00\', cost:{2:322, 3:565}, price:0, effect:\'116%\', spad:8.4}, 17: {time:\'4:18:16\', cost:{2:343, 3:607}, price:0, effect:\'122%\', spad:9.0}, 18: {time:\'4:37:06\', cost:{2:365, 3:651, 6:21}, price:0, effect:\'128%\', spad:9.6}, 19: {time:\'4:56:27\', cost:{2:388, 3:696, 6:66}, price:0, effect:\'134%\', spad:10.2}, 20: {time:\'5:16:19\', cost:{2:411, 3:742, 6:112}, price:0, effect:\'140%\', spad:10.8}}, \
89: {1: {time:\'5:15:00\', cost:{2:10500, 3:21000, 4:3100}, price:58, effect:\'10%\', spad:1.0}, 2: {time:\'5:30:00\', cost:{2:11148, 3:22297, 4:3229}, price:67, effect:\'20%\', spad:2.5}, 3: {time:\'5:45:00\', cost:{2:11868, 3:23737, 4:3373}, price:76, effect:\'30%\', spad:4.2}, 4: {time:\'6:00:00\', cost:{2:12639, 3:25278, 4:3527}, price:86, effect:\'40%\', spad:6.1}, 5: {time:\'6:15:00\', cost:{2:13449, 3:26898, 4:3689}, price:96, effect:\'50%\', spad:8.1}, 6: {time:\'6:30:00\', cost:{2:14292, 3:28585, 4:3858}, price:107, effect:\'60%\', spad:10.3}, 7: {time:\'6:45:00\', cost:{2:15165, 3:30330, 4:4033}, price:118, effect:\'70%\', spad:12.5}, 8: {time:\'7:00:00\', cost:{2:16062, 3:32125, 4:4212}, price:128, effect:\'80%\', spad:14.9}, 9: {time:\'7:15:00\', cost:{2:16983, 3:33966, 4:4396}, price:139, effect:\'90%\', spad:17.4}, 10: {time:\'7:30:00\', cost:{2:17924, 3:35848, 4:4584}, price:150, effect:\'100%\', spad:20.0}, 11: {time:\'7:45:00\', cost:{2:18884, 3:37769, 4:4776}, price:161, effect:\'110%\', spad:22.6}, 12: {time:\'8:00:00\', cost:{2:19862, 3:39725, 4:4972}, price:173, effect:\'120%\', spad:25.3}, 13: {time:\'8:15:00\', cost:{2:20856, 3:41713, 4:5171}, price:184, effect:\'130%\', spad:28.1}, 14: {time:\'8:30:00\', cost:{2:21866, 3:43733, 4:5373}, price:195, effect:\'140%\', spad:30.9}, 15: {time:\'8:45:00\', cost:{2:22890, 3:45781, 4:5578}, price:207, effect:\'150%\', spad:33.8}, 16: {time:\'9:00:00\', cost:{2:23928, 3:47857, 4:5785}, price:218, effect:\'160%\', spad:36.8}, 17: {time:\'9:15:00\', cost:{2:24979, 3:49959, 4:5995}, price:230, effect:\'170%\', spad:39.8}, 18: {time:\'9:30:00\', cost:{2:26043, 3:52086, 4:6208}, price:242, effect:\'180%\', spad:42.8}, 19: {time:\'9:45:00\', cost:{2:27118, 3:54237, 4:6423}, price:254, effect:\'190%\', spad:46.0}, 20: {time:\'10:00:00\', cost:{2:28205, 3:56411, 4:6641}, price:265, effect:\'200%\', spad:49.1}}, \
90: {1: {time:\'3:12:00\', cost:{2:6500, 3:3250, 4:550}, price:0, effect:\'5%\', spad:1.0}, 2: {time:\'3:24:00\', cost:{2:7148, 3:3574, 4:614}, price:0, effect:\'10%\', spad:2.0}, 3: {time:\'3:35:59\', cost:{2:7868, 3:3934, 4:686}, price:0, effect:\'15%\', spad:3.0}, 4: {time:\'3:47:59\', cost:{2:8639, 3:4319, 4:763}, price:0, effect:\'20%\', spad:4.0}, 5: {time:\'4:00:00\', cost:{2:9449, 3:4724, 4:844}, price:0, effect:\'25%\', spad:5.0}, 6: {time:\'4:11:59\', cost:{2:10292, 3:5146, 4:929}, price:0, effect:\'30%\', spad:6.0}, 7: {time:\'4:24:00\', cost:{2:11165, 3:5582, 4:1016}, price:0, effect:\'35%\', spad:7.0}, 8: {time:\'4:35:59\', cost:{2:12062, 3:6031, 4:1106}, price:0, effect:\'40%\', spad:8.0}, 9: {time:\'4:48:00\', cost:{2:12983, 3:6491, 4:1198}, price:0, effect:\'45%\', spad:9.0}, 10: {time:\'5:00:00\', cost:{2:13924, 3:6962, 4:1292}, price:0, effect:\'50%\', spad:10.0}, 11: {time:\'5:11:59\', cost:{2:14884, 3:7442, 4:1388}, price:0, effect:\'55%\', spad:11.0}, 12: {time:\'5:24:00\', cost:{2:15862, 3:7931, 4:1486}, price:0, effect:\'60%\', spad:12.0}, 13: {time:\'5:35:59\', cost:{2:16856, 3:8428, 4:1585}, price:2, effect:\'65%\', spad:13.0}, 14: {time:\'5:48:00\', cost:{2:17866, 3:8933, 4:1686}, price:5, effect:\'70%\', spad:14.0}, 15: {time:\'6:00:00\', cost:{2:18890, 3:9445, 4:1789}, price:8, effect:\'75%\', spad:15.0}, 16: {time:\'6:11:59\', cost:{2:19928, 3:9964, 4:1892}, price:11, effect:\'80%\', spad:16.0}, 17: {time:\'6:24:00\', cost:{2:20979, 3:10489, 4:1997}, price:14, effect:\'85%\', spad:17.0}, 18: {time:\'6:35:59\', cost:{2:22043, 3:11021, 4:2104}, price:17, effect:\'90%\', spad:18.0}, 19: {time:\'6:48:00\', cost:{2:23118, 3:11559, 4:2211}, price:20, effect:\'95%\', spad:19.0}, 20: {time:\'7:00:00\', cost:{2:24205, 3:12102, 4:2320}, price:22, effect:\'100%\', spad:20.0}}, \
91: {1: {time:\'3:12:00\', cost:{2:11500, 3:12000, 4:1000}, price:0, effect:\'\', spad:0.0}, 2: {time:\'3:24:00\', cost:{2:13000, 3:14000, 4:2000}, price:0, effect:\'\', spad:0.0}, 3: {time:\'3:35:59\', cost:{2:14500, 3:16000, 4:3000}, price:0, effect:\'\', spad:0.0}, 4: {time:\'3:47:59\', cost:{2:16000, 3:18000, 4:4000}, price:0, effect:\'\', spad:0.0}, 5: {time:\'4:00:00\', cost:{2:17500, 3:20000, 4:5000}, price:0, effect:\'\', spad:0.0}, 6: {time:\'4:11:59\', cost:{2:19000, 3:22000, 4:6000}, price:0, effect:\'\', spad:0.0}, 7: {time:\'4:24:00\', cost:{2:20500, 3:24000, 4:7000}, price:0, effect:\'\', spad:0.0}, 8: {time:\'4:35:59\', cost:{2:22000, 3:26000, 4:8000}, price:0, effect:\'\', spad:0.0}, 9: {time:\'4:48:00\', cost:{2:23500, 3:28000, 4:9000}, price:0, effect:\'\', spad:0.0}, 10: {time:\'5:00:00\', cost:{2:25000, 3:30000, 4:10000}, price:0, effect:\'\', spad:0.0}, 11: {time:\'5:11:59\', cost:{2:26500, 3:32000, 4:11000}, price:0, effect:\'\', spad:0.0}, 12: {time:\'5:24:00\', cost:{2:28000, 3:34000, 4:12000}, price:0, effect:\'\', spad:0.0}, 13: {time:\'5:35:59\', cost:{2:29500, 3:36000, 4:13000}, price:0, effect:\'\', spad:0.0}, 14: {time:\'5:48:00\', cost:{2:31000, 3:38000, 4:14000}, price:0, effect:\'\', spad:0.0}, 15: {time:\'6:00:00\', cost:{2:32500, 3:40000, 4:15000}, price:0, effect:\'\', spad:0.0}, 16: {time:\'6:11:59\', cost:{2:34000, 3:42000, 4:16000}, price:0, effect:\'\', spad:0.0}, 17: {time:\'6:24:00\', cost:{2:35500, 3:44000, 4:17000}, price:0, effect:\'\', spad:0.0}, 18: {time:\'6:35:59\', cost:{2:37000, 3:46000, 4:18000}, price:0, effect:\'\', spad:0.0}, 19: {time:\'6:48:00\', cost:{2:38500, 3:48000, 4:19000}, price:0, effect:\'\', spad:0.0}, 20: {time:\'7:00:00\', cost:{2:40000, 3:50000, 4:20000}, price:0, effect:\'\', spad:0.0}}, \
92: {1: {time:\'7:00:00\', cost:{2:1200, 3:900, 6:500, 11:750}, price:0, effect:\'\', spad:0.0}, 2: {time:\'8:00:00\', cost:{2:2400, 3:1800, 6:1000, 11:1500}, price:0, effect:\'\', spad:0.0}, 3: {time:\'9:00:00\', cost:{2:3600, 3:2700, 6:1500, 11:2250}, price:0, effect:\'\', spad:0.0}, 4: {time:\'10:00:00\', cost:{2:4800, 3:3600, 6:2000, 11:3000}, price:0, effect:\'\', spad:0.0}, 5: {time:\'11:00:00\', cost:{2:6000, 3:4500, 6:2500, 11:3750}, price:0, effect:\'\', spad:0.0}, 6: {time:\'12:00:00\', cost:{2:7200, 3:5400, 6:3000, 11:4500}, price:0, effect:\'\', spad:0.0}, 7: {time:\'13:00:00\', cost:{2:8400, 3:6300, 6:3500, 11:5250}, price:0, effect:\'\', spad:0.0}, 8: {time:\'14:00:00\', cost:{2:9600, 3:7200, 6:4000, 11:6000}, price:0, effect:\'\', spad:0.0}, 9: {time:\'15:00:00\', cost:{2:10800, 3:8100, 6:4500, 11:6750}, price:0, effect:\'\', spad:0.0}, 10: {time:\'16:00:00\', cost:{2:12000, 3:9000, 6:5000, 11:7500}, price:0, effect:\'\', spad:0.0}, 11: {time:\'17:00:00\', cost:{2:13200, 3:9900, 6:5500, 11:8250}, price:0, effect:\'\', spad:0.0}, 12: {time:\'18:00:00\', cost:{2:14400, 3:10800, 6:6000, 11:9000}, price:0, effect:\'\', spad:0.0}, 13: {time:\'19:00:00\', cost:{2:15600, 3:11700, 6:6500, 11:9750}, price:0, effect:\'\', spad:0.0}, 14: {time:\'20:00:00\', cost:{2:16800, 3:12600, 6:7000, 11:10500}, price:0, effect:\'\', spad:0.0}, 15: {time:\'21:00:00\', cost:{2:18000, 3:13500, 6:7500, 11:11250}, price:0, effect:\'\', spad:0.0}, 16: {time:\'22:00:00\', cost:{2:19200, 3:14400, 6:8000, 11:12000}, price:0, effect:\'\', spad:0.0}, 17: {time:\'23:00:00\', cost:{2:20400, 3:15300, 6:8500, 11:12750}, price:0, effect:\'\', spad:0.0}, 18: {time:\'24:00:00\', cost:{2:21600, 3:16200, 6:9000, 11:13500}, price:0, effect:\'\', spad:0.0}, 19: {time:\'25:00:00\', cost:{2:22800, 3:17100, 6:9500, 11:14250}, price:0, effect:\'\', spad:0.0}, 20: {time:\'26:00:00\', cost:{2:24000, 3:18000, 6:10000, 11:15000}, price:0, effect:\'\', spad:0.0}}, \
93: {1: {time:\'5:11:59\', cost:{2:15500, 3:25650, 4:3250}, price:110, effect:\'100%\', spad:0.0}, 2: {time:\'5:24:00\', cost:{2:16231, 3:26600, 4:3615}, price:122, effect:\'132%\', spad:0.0}, 3: {time:\'5:35:59\', cost:{2:17085, 3:27711, 4:4042}, price:137, effect:\'169%\', spad:0.0}, 4: {time:\'5:48:00\', cost:{2:18031, 3:28940, 4:4515}, price:152, effect:\'208%\', spad:0.0}, 5: {time:\'6:00:00\', cost:{2:19051, 3:30267, 4:5025}, price:168, effect:\'250%\', spad:0.0}, 6: {time:\'6:11:59\', cost:{2:20135, 3:31675, 4:5567}, price:185, effect:\'292%\', spad:0.0}, 7: {time:\'6:24:00\', cost:{2:21274, 3:33157, 4:6137}, price:203, effect:\'337%\', spad:0.0}, 8: {time:\'6:35:59\', cost:{2:22464, 3:34703, 4:6732}, price:221, effect:\'382%\', spad:0.0}, 9: {time:\'6:48:00\', cost:{2:23699, 3:36309, 4:7349}, price:239, effect:\'429%\', spad:0.0}, 10: {time:\'7:00:00\', cost:{2:24976, 3:37969, 4:7988}, price:258, effect:\'477%\', spad:0.0}, 11: {time:\'7:11:59\', cost:{2:26292, 3:39679, 4:8646}, price:277, effect:\'526%\', spad:0.0}, 12: {time:\'7:24:00\', cost:{2:27644, 3:41438, 4:9322}, price:297, effect:\'576%\', spad:0.0}, 13: {time:\'7:35:59\', cost:{2:29031, 3:43240, 4:10015}, price:317, effect:\'626%\', spad:0.0}, 14: {time:\'7:48:00\', cost:{2:30450, 3:45085, 4:10725}, price:337, effect:\'678%\', spad:0.0}, 15: {time:\'8:00:00\', cost:{2:31900, 3:46970, 4:11450}, price:357, effect:\'730%\', spad:0.0}, 16: {time:\'8:11:59\', cost:{2:33379, 3:48892, 4:12189}, price:378, effect:\'782%\', spad:0.0}, 17: {time:\'8:23:59\', cost:{2:34886, 3:50852, 4:12943}, price:399, effect:\'836%\', spad:0.0}, 18: {time:\'8:36:00\', cost:{2:36420, 3:52846, 4:13710}, price:420, effect:\'890%\', spad:0.0}, 19: {time:\'8:48:00\', cost:{2:37979, 3:54873, 4:14489}, price:442, effect:\'945%\', spad:0.0}, 20: {time:\'9:00:00\', cost:{2:39564, 3:56933, 4:15282}, price:464, effect:\'1000%\', spad:0.0}}, \
94: {1: {time:\'2:17:59\', cost:{2:115, 3:60, 6:5}, price:0, effect:\'\', spad:0.0}, 2: {time:\'2:35:59\', cost:{2:130, 3:70, 6:10}, price:0, effect:\'\', spad:0.0}, 3: {time:\'2:54:00\', cost:{2:145, 3:80, 6:15}, price:0, effect:\'\', spad:0.0}, 4: {time:\'3:12:00\', cost:{2:160, 3:90, 6:20}, price:0, effect:\'\', spad:0.0}, 5: {time:\'3:30:00\', cost:{2:175, 3:100, 6:25}, price:0, effect:\'\', spad:0.0}, 6: {time:\'3:48:00\', cost:{2:190, 3:110, 6:30}, price:0, effect:\'\', spad:0.0}, 7: {time:\'4:05:59\', cost:{2:205, 3:120, 6:35}, price:0, effect:\'\', spad:0.0}, 8: {time:\'4:24:00\', cost:{2:220, 3:130, 6:40}, price:0, effect:\'\', spad:0.0}, 9: {time:\'4:42:00\', cost:{2:235, 3:140, 6:45}, price:0, effect:\'\', spad:0.0}, 10: {time:\'5:00:00\', cost:{2:250, 3:150, 6:50}, price:0, effect:\'\', spad:0.0}, 11: {time:\'5:18:00\', cost:{2:265, 3:160, 6:55}, price:0, effect:\'\', spad:0.0}, 12: {time:\'5:36:00\', cost:{2:280, 3:170, 6:60}, price:0, effect:\'\', spad:0.0}, 13: {time:\'5:54:00\', cost:{2:295, 3:180, 6:65}, price:0, effect:\'\', spad:0.0}, 14: {time:\'6:12:00\', cost:{2:310, 3:190, 6:70}, price:0, effect:\'\', spad:0.0}, 15: {time:\'6:30:00\', cost:{2:325, 3:200, 6:75}, price:0, effect:\'\', spad:0.0}, 16: {time:\'6:48:00\', cost:{2:340, 3:210, 6:80}, price:0, effect:\'\', spad:0.0}, 17: {time:\'7:06:00\', cost:{2:355, 3:220, 6:85}, price:0, effect:\'\', spad:0.0}, 18: {time:\'7:24:00\', cost:{2:370, 3:230, 6:90}, price:0, effect:\'\', spad:0.0}, 19: {time:\'7:42:00\', cost:{2:385, 3:240, 6:95}, price:0, effect:\'\', spad:0.0}, 20: {time:\'8:00:00\', cost:{2:400, 3:250, 6:100}, price:0, effect:\'\', spad:0.0}}, \
95: {1: {time:\'7:18:00\', cost:{2:11000, 3:21500, 4:7000, 8:2500}, price:0, effect:\'\', spad:0.0}, 2: {time:\'7:35:59\', cost:{2:12000, 3:23000, 4:9000, 8:5000}, price:0, effect:\'\', spad:0.0}, 3: {time:\'7:54:00\', cost:{2:13000, 3:24500, 4:11000, 8:7500}, price:0, effect:\'\', spad:0.0}, 4: {time:\'8:11:59\', cost:{2:14000, 3:26000, 4:13000, 8:10000}, price:0, effect:\'\', spad:0.0}, 5: {time:\'8:30:00\', cost:{2:15000, 3:27500, 4:15000, 8:12500}, price:0, effect:\'\', spad:0.0}, 6: {time:\'8:48:00\', cost:{2:16000, 3:29000, 4:17000, 8:15000}, price:0, effect:\'\', spad:0.0}, 7: {time:\'9:06:00\', cost:{2:17000, 3:30500, 4:19000, 8:17500}, price:0, effect:\'\', spad:0.0}, 8: {time:\'9:23:59\', cost:{2:18000, 3:32000, 4:21000, 8:20000}, price:0, effect:\'\', spad:0.0}, 9: {time:\'9:41:59\', cost:{2:19000, 3:33500, 4:23000, 8:22500}, price:0, effect:\'\', spad:0.0}, 10: {time:\'10:00:00\', cost:{2:20000, 3:35000, 4:25000, 8:25000}, price:0, effect:\'\', spad:0.0}, 11: {time:\'10:18:00\', cost:{2:21000, 3:36500, 4:27000, 8:27500}, price:0, effect:\'\', spad:0.0}, 12: {time:\'10:36:00\', cost:{2:22000, 3:38000, 4:29000, 8:30000}, price:0, effect:\'\', spad:0.0}, 13: {time:\'10:54:00\', cost:{2:23000, 3:39500, 4:31000, 8:32500}, price:0, effect:\'\', spad:0.0}, 14: {time:\'11:11:59\', cost:{2:24000, 3:41000, 4:33000, 8:35000}, price:0, effect:\'\', spad:0.0}, 15: {time:\'11:30:00\', cost:{2:25000, 3:42500, 4:35000, 8:37500}, price:0, effect:\'\', spad:0.0}, 16: {time:\'11:48:00\', cost:{2:26000, 3:44000, 4:37000, 8:40000}, price:0, effect:\'\', spad:0.0}, 17: {time:\'12:06:00\', cost:{2:27000, 3:45500, 4:39000, 8:42500}, price:0, effect:\'\', spad:0.0}, 18: {time:\'12:24:00\', cost:{2:28000, 3:47000, 4:41000, 8:45000}, price:0, effect:\'\', spad:0.0}, 19: {time:\'12:41:59\', cost:{2:29000, 3:48500, 4:43000, 8:47500}, price:0, effect:\'\', spad:0.0}, 20: {time:\'13:00:00\', cost:{2:30000, 3:50000, 4:45000, 8:50000}, price:0, effect:\'\', spad:0.0}}, \
96: {1: {time:\'0:01:11\', cost:{2:42, 3:24}, price:0, effect:\'1\', spad:0.0}, 2: {time:\'0:02:23\', cost:{2:44, 3:28}, price:0, effect:\'2\', spad:0.0}, 3: {time:\'0:03:35\', cost:{2:46, 3:32}, price:0, effect:\'3\', spad:0.0}, 4: {time:\'0:04:47\', cost:{2:48, 3:36}, price:0, effect:\'4\', spad:0.0}, 5: {time:\'0:05:59\', cost:{2:50, 3:40}, price:0, effect:\'5\', spad:0.0}, 6: {time:\'0:07:11\', cost:{2:52, 3:44}, price:0, effect:\'6\', spad:0.0}, 7: {time:\'0:08:24\', cost:{2:54, 3:48}, price:0, effect:\'7\', spad:0.0}, 8: {time:\'0:09:35\', cost:{2:56, 3:52}, price:0, effect:\'8\', spad:0.0}, 9: {time:\'0:10:47\', cost:{2:58, 3:56}, price:0, effect:\'9\', spad:0.0}, 10: {time:\'0:11:59\', cost:{2:60, 3:60}, price:0, effect:\'10\', spad:0.0}, 11: {time:\'0:13:11\', cost:{2:62, 3:64}, price:0, effect:\'11\', spad:0.0}, 12: {time:\'0:14:23\', cost:{2:64, 3:68}, price:0, effect:\'12\', spad:0.0}, 13: {time:\'0:15:35\', cost:{2:66, 3:72}, price:0, effect:\'13\', spad:0.0}, 14: {time:\'0:16:48\', cost:{2:68, 3:76}, price:0, effect:\'14\', spad:0.0}, 15: {time:\'0:17:59\', cost:{2:70, 3:80}, price:0, effect:\'15\', spad:0.0}, 16: {time:\'0:19:11\', cost:{2:72, 3:84}, price:0, effect:\'16\', spad:0.0}, 17: {time:\'0:20:24\', cost:{2:74, 3:88}, price:0, effect:\'17\', spad:0.0}, 18: {time:\'0:21:35\', cost:{2:76, 3:92}, price:0, effect:\'18\', spad:0.0}, 19: {time:\'0:22:47\', cost:{2:78, 3:96}, price:0, effect:\'19\', spad:0.0}, 20: {time:\'0:23:59\', cost:{2:80, 3:100}, price:0, effect:\'20\', spad:0.0}}, \
97: {1: {time:\'5:11:59\', cost:{2:140, 3:70}, price:0, effect:\'\', spad:0.2}, 2: {time:\'5:24:00\', cost:{2:180, 3:90}, price:0, effect:\'\', spad:0.4}, 3: {time:\'5:35:59\', cost:{2:220, 3:110}, price:0, effect:\'\', spad:0.6}, 4: {time:\'5:48:00\', cost:{2:260, 3:130}, price:0, effect:\'\', spad:0.8}, 5: {time:\'6:00:00\', cost:{2:300, 3:150}, price:0, effect:\'\', spad:1.0}, 6: {time:\'6:11:59\', cost:{2:340, 3:170}, price:0, effect:\'\', spad:1.2}, 7: {time:\'6:24:00\', cost:{2:380, 3:190}, price:0, effect:\'\', spad:1.4}, 8: {time:\'6:35:59\', cost:{2:420, 3:210}, price:0, effect:\'\', spad:1.6}, 9: {time:\'6:48:00\', cost:{2:460, 3:230}, price:0, effect:\'\', spad:1.8}, 10: {time:\'7:00:00\', cost:{2:500, 3:250}, price:0, effect:\'\', spad:2.0}, 11: {time:\'7:11:59\', cost:{2:540, 3:270}, price:0, effect:\'\', spad:2.2}, 12: {time:\'7:24:00\', cost:{2:580, 3:290}, price:0, effect:\'\', spad:2.4}, 13: {time:\'7:35:59\', cost:{2:620, 3:310}, price:0, effect:\'\', spad:2.6}, 14: {time:\'7:48:00\', cost:{2:660, 3:330}, price:0, effect:\'\', spad:2.8}, 15: {time:\'8:00:00\', cost:{2:700, 3:350}, price:0, effect:\'\', spad:3.0}, 16: {time:\'8:11:59\', cost:{2:740, 3:370}, price:0, effect:\'\', spad:3.2}, 17: {time:\'8:23:59\', cost:{2:780, 3:390}, price:0, effect:\'\', spad:3.4}, 18: {time:\'8:36:00\', cost:{2:820, 3:410}, price:0, effect:\'\', spad:3.6}, 19: {time:\'8:48:00\', cost:{2:860, 3:430}, price:0, effect:\'\', spad:3.8}, 20: {time:\'9:00:00\', cost:{2:900, 3:450}, price:0, effect:\'\', spad:4.0}}, \
98: {1: {time:\'8:15:00\', cost:{2:3500, 3:2500, 7:1500, 18:900}, price:0, effect:\'\', spad:0.0}, 2: {time:\'8:30:00\', cost:{2:4500, 3:3000, 7:2000, 18:1300}, price:0, effect:\'\', spad:0.0}, 3: {time:\'8:45:00\', cost:{2:5500, 3:3500, 7:2500, 18:1700}, price:0, effect:\'\', spad:0.0}, 4: {time:\'9:00:00\', cost:{2:6500, 3:4000, 7:3000, 18:2100}, price:0, effect:\'\', spad:0.0}, 5: {time:\'9:15:00\', cost:{2:7500, 3:4500, 7:3500, 18:2500}, price:0, effect:\'\', spad:0.0}, 6: {time:\'9:30:00\', cost:{2:8500, 3:5000, 7:4000, 18:2900}, price:0, effect:\'\', spad:0.0}, 7: {time:\'9:45:00\', cost:{2:9500, 3:5500, 7:4500, 18:3300}, price:0, effect:\'\', spad:0.0}, 8: {time:\'10:00:00\', cost:{2:10500, 3:6000, 7:5000, 18:3700}, price:0, effect:\'\', spad:0.0}, 9: {time:\'10:15:00\', cost:{2:11500, 3:6500, 7:5500, 18:4100}, price:0, effect:\'\', spad:0.0}, 10: {time:\'10:30:00\', cost:{2:12500, 3:7000, 7:6000, 18:4500}, price:0, effect:\'\', spad:0.0}, 11: {time:\'10:45:00\', cost:{2:13500, 3:7500, 7:6500, 18:4900}, price:0, effect:\'\', spad:0.0}, 12: {time:\'11:00:00\', cost:{2:14500, 3:8000, 7:7000, 18:5300}, price:0, effect:\'\', spad:0.0}, 13: {time:\'11:15:00\', cost:{2:15500, 3:8500, 7:7500, 18:5700}, price:0, effect:\'\', spad:0.0}, 14: {time:\'11:30:00\', cost:{2:16500, 3:9000, 7:8000, 18:6100}, price:0, effect:\'\', spad:0.0}, 15: {time:\'11:45:00\', cost:{2:17500, 3:9500, 7:8500, 18:6500}, price:0, effect:\'\', spad:0.0}, 16: {time:\'12:00:00\', cost:{2:18500, 3:10000, 7:9000, 18:6900}, price:0, effect:\'\', spad:0.0}, 17: {time:\'12:15:00\', cost:{2:19500, 3:10500, 7:9500, 18:7300}, price:0, effect:\'\', spad:0.0}, 18: {time:\'12:30:00\', cost:{2:20500, 3:11000, 7:10000, 18:7700}, price:0, effect:\'\', spad:0.0}, 19: {time:\'12:45:00\', cost:{2:21500, 3:11500, 7:10500, 18:8100}, price:0, effect:\'\', spad:0.0}, 20: {time:\'13:00:00\', cost:{2:22500, 3:12000, 7:11000, 18:8500}, price:0, effect:\'\', spad:0.0}}, \
99: {1: {time:\'8:15:00\', cost:{2:2900, 3:3500, 4:1500}, price:0, effect:\'\', spad:0.0}, 2: {time:\'8:30:00\', cost:{2:3700, 3:4500, 4:2000}, price:0, effect:\'\', spad:0.0}, 3: {time:\'8:45:00\', cost:{2:4500, 3:5500, 4:2500}, price:0, effect:\'\', spad:0.0}, 4: {time:\'9:00:00\', cost:{2:5300, 3:6500, 4:3000}, price:0, effect:\'\', spad:0.0}, 5: {time:\'9:15:00\', cost:{2:6100, 3:7500, 4:3500, 6:500}, price:0, effect:\'\', spad:0.0}, 6: {time:\'9:30:00\', cost:{2:6900, 3:8500, 4:4000, 6:1000}, price:0, effect:\'\', spad:0.0}, 7: {time:\'9:45:00\', cost:{2:7700, 3:9500, 4:4500, 6:1500}, price:0, effect:\'\', spad:0.0}, 8: {time:\'10:00:00\', cost:{2:8500, 3:10500, 4:5000, 6:2000}, price:0, effect:\'\', spad:0.0}, 9: {time:\'10:15:00\', cost:{2:9300, 3:11500, 4:5500, 6:2500}, price:0, effect:\'\', spad:0.0}, 10: {time:\'10:30:00\', cost:{2:10100, 3:12500, 4:6000, 6:3000}, price:0, effect:\'\', spad:0.0}, 11: {time:\'10:45:00\', cost:{2:10900, 3:13500, 4:6500, 6:3500}, price:0, effect:\'\', spad:0.0}, 12: {time:\'11:00:00\', cost:{2:11700, 3:14500, 4:7000, 6:4000}, price:0, effect:\'\', spad:0.0}, 13: {time:\'11:15:00\', cost:{2:12500, 3:15500, 4:7500, 6:4500}, price:0, effect:\'\', spad:0.0}, 14: {time:\'11:30:00\', cost:{2:13300, 3:16500, 4:8000, 6:5000}, price:0, effect:\'\', spad:0.0}, 15: {time:\'11:45:00\', cost:{2:14100, 3:17500, 4:8500, 6:5500}, price:0, effect:\'\', spad:0.0}, 16: {time:\'12:00:00\', cost:{2:14900, 3:18500, 4:9000, 6:6000}, price:0, effect:\'\', spad:0.0}, 17: {time:\'12:15:00\', cost:{2:15700, 3:19500, 4:9500, 6:6500}, price:0, effect:\'\', spad:0.0}, 18: {time:\'12:30:00\', cost:{2:16500, 3:20500, 4:10000, 6:7000}, price:0, effect:\'\', spad:0.0}, 19: {time:\'12:45:00\', cost:{2:17300, 3:21500, 4:10500, 6:7500}, price:0, effect:\'\', spad:0.0}, 20: {time:\'13:00:00\', cost:{2:18100, 3:22500, 4:11000, 6:8000}, price:0, effect:\'\', spad:0.0}}, \
100: {1: {time:\'6:11:59\', cost:{2:1400, 3:800, 6:700}, price:0, effect:\'\', spad:0.0}, 2: {time:\'6:24:00\', cost:{2:1800, 3:1100, 6:1000}, price:0, effect:\'\', spad:0.0}, 3: {time:\'6:35:59\', cost:{2:2200, 3:1400, 6:1300}, price:0, effect:\'\', spad:0.0}, 4: {time:\'6:48:00\', cost:{2:2600, 3:1700, 6:1600}, price:0, effect:\'\', spad:0.0}, 5: {time:\'7:00:00\', cost:{2:3000, 3:2000, 6:1900}, price:0, effect:\'\', spad:0.0}, 6: {time:\'7:11:59\', cost:{2:3400, 3:2300, 6:2200}, price:0, effect:\'\', spad:0.0}, 7: {time:\'7:24:00\', cost:{2:3800, 3:2600, 6:2500}, price:0, effect:\'\', spad:0.0}, 8: {time:\'7:35:59\', cost:{2:4200, 3:2900, 6:2800}, price:0, effect:\'\', spad:0.0}, 9: {time:\'7:48:00\', cost:{2:4600, 3:3200, 6:3100}, price:0, effect:\'\', spad:0.0}, 10: {time:\'8:00:00\', cost:{2:5000, 3:3500, 6:3400}, price:0, effect:\'\', spad:0.0}, 11: {time:\'8:11:59\', cost:{2:5400, 3:3800, 6:3700}, price:0, effect:\'\', spad:0.0}, 12: {time:\'8:23:59\', cost:{2:5800, 3:4100, 6:4000}, price:0, effect:\'\', spad:0.0}, 13: {time:\'8:36:00\', cost:{2:6200, 3:4400, 6:4300}, price:0, effect:\'\', spad:0.0}, 14: {time:\'8:48:00\', cost:{2:6600, 3:4700, 6:4600}, price:0, effect:\'\', spad:0.0}, 15: {time:\'9:00:00\', cost:{2:7000, 3:5000, 6:4900}, price:0, effect:\'\', spad:0.0}, 16: {time:\'9:11:59\', cost:{2:7400, 3:5300, 6:5200}, price:0, effect:\'\', spad:0.0}, 17: {time:\'9:23:59\', cost:{2:7800, 3:5600, 6:5500}, price:0, effect:\'\', spad:0.0}, 18: {time:\'9:36:00\', cost:{2:8200, 3:5900, 6:5800}, price:0, effect:\'\', spad:0.0}, 19: {time:\'9:48:00\', cost:{2:8600, 3:6200, 6:6100}, price:0, effect:\'\', spad:0.0}, 20: {time:\'10:00:00\', cost:{2:9000, 3:6500, 6:6400}, price:0, effect:\'\', spad:0.0}}, \
101: {1: {time:\'5:05:59\', cost:{2:10250, 3:10500, 6:2650}, price:10, effect:\'60\', spad:0.0}, 2: {time:\'5:11:59\', cost:{2:10574, 3:11148, 6:2844}, price:22, effect:\'120\', spad:0.0}, 3: {time:\'5:18:00\', cost:{2:10934, 3:11868, 6:3060}, price:35, effect:\'180\', spad:0.0}, 4: {time:\'5:24:00\', cost:{2:11319, 3:12639, 6:3291}, price:49, effect:\'240\', spad:0.0}, 5: {time:\'5:30:00\', cost:{2:11724, 3:13449, 6:3534}, price:63, effect:\'300\', spad:0.0}, 6: {time:\'5:35:59\', cost:{2:12146, 3:14292, 6:3787}, price:78, effect:\'360\', spad:0.0}, 7: {time:\'5:41:59\', cost:{2:12582, 3:15165, 6:4049}, price:93, effect:\'420\', spad:0.0}, 8: {time:\'5:48:00\', cost:{2:13031, 3:16062, 6:4318}, price:109, effect:\'480\', spad:0.0}, 9: {time:\'5:54:00\', cost:{2:13491, 3:16983, 6:4594}, price:125, effect:\'540\', spad:0.0}, 10: {time:\'6:00:00\', cost:{2:13962, 3:17924, 6:4877, 8:169}, price:141, effect:\'600\', spad:0.0}, 11: {time:\'6:05:59\', cost:{2:14442, 3:18884, 6:5165, 8:553}, price:157, effect:\'660\', spad:0.0}, 12: {time:\'6:11:59\', cost:{2:14931, 3:19862, 6:5458, 8:945}, price:174, effect:\'720\', spad:0.0}, 13: {time:\'6:18:00\', cost:{2:15428, 3:20856, 6:5757, 8:1342}, price:191, effect:\'780\', spad:0.0}, 14: {time:\'6:24:00\', cost:{2:15933, 3:21866, 6:6059, 8:1746}, price:207, effect:\'840\', spad:0.0}, 15: {time:\'6:30:00\', cost:{2:16445, 3:22890, 6:6367, 8:2156}, price:225, effect:\'900\', spad:0.0}, 16: {time:\'6:35:59\', cost:{2:16964, 3:23928, 6:6678, 8:2571}, price:242, effect:\'960\', spad:0.0}, 17: {time:\'6:41:59\', cost:{2:17489, 3:24979, 6:6993, 8:2991}, price:260, effect:\'1020\', spad:0.0}, 18: {time:\'6:48:00\', cost:{2:18021, 3:26043, 6:7313, 8:3417}, price:277, effect:\'1080\', spad:0.0}, 19: {time:\'6:54:00\', cost:{2:18559, 3:27118, 6:7635, 8:3847}, price:295, effect:\'1140\', spad:0.0}, 20: {time:\'7:00:00\', cost:{2:19102, 3:28205, 6:7961, 8:4282}, price:313, effect:\'1200\', spad:0.0}}, \
102: {1: {time:\'7:11:59\', cost:{2:36000, 3:82000, 6:5500}, price:270, effect:\'105%\', spad:21.0}, 2: {time:\'7:24:00\', cost:{2:22297, 3:34594, 6:6148}, price:295, effect:\'110%\', spad:22.0}, 3: {time:\'7:35:59\', cost:{2:23737, 3:37474, 6:6868}, price:324, effect:\'115%\', spad:23.0}, 4: {time:\'7:48:00\', cost:{2:25278, 3:40556, 6:7639}, price:355, effect:\'120%\', spad:24.0}, 5: {time:\'8:00:00\', cost:{2:26898, 3:43797, 6:8449}, price:387, effect:\'125%\', spad:25.0}, 6: {time:\'8:11:59\', cost:{2:28585, 3:47171, 6:9292}, price:421, effect:\'130%\', spad:26.0}, 7: {time:\'8:23:59\', cost:{2:30330, 3:50660, 6:10165}, price:456, effect:\'135%\', spad:27.0}, 8: {time:\'8:36:00\', cost:{2:32125, 3:54251, 6:11062}, price:492, effect:\'140%\', spad:28.0}, 9: {time:\'8:48:00\', cost:{2:33966, 3:57933, 6:11983}, price:529, effect:\'145%\', spad:29.0}, 10: {time:\'9:00:00\', cost:{2:35848, 3:61697, 6:12924}, price:566, effect:\'150%\', spad:30.0}, 11: {time:\'9:11:59\', cost:{2:37769, 3:65538, 6:13884}, price:605, effect:\'155%\', spad:31.0}, 12: {time:\'9:23:59\', cost:{2:39725, 3:69450, 6:14862}, price:644, effect:\'160%\', spad:32.0}, 13: {time:\'9:36:00\', cost:{2:41713, 3:73427, 6:15856}, price:684, effect:\'165%\', spad:33.0}, 14: {time:\'9:48:00\', cost:{2:43733, 3:77466, 6:16866}, price:724, effect:\'170%\', spad:34.0}, 15: {time:\'10:00:00\', cost:{2:45781, 3:81563, 6:17890}, price:765, effect:\'175%\', spad:35.0}, 16: {time:\'10:11:59\', cost:{2:47857, 3:85715, 6:18928}, price:807, effect:\'180%\', spad:36.0}, 17: {time:\'10:23:59\', cost:{2:49959, 3:89919, 6:19979}, price:849, effect:\'185%\', spad:37.0}, 18: {time:\'10:36:00\', cost:{2:52086, 3:94173, 6:21043}, price:891, effect:\'190%\', spad:38.0}, 19: {time:\'10:48:00\', cost:{2:54237, 3:98475, 6:22118}, price:934, effect:\'195%\', spad:39.0}, 20: {time:\'11:00:00\', cost:{2:56411, 3:102822, 6:23205}, price:978, effect:\'200%\', spad:40.0}}, \
103: {1: {time:\'6:11:59\', cost:{2:21000, 3:21500, 4:5500}, price:220, effect:\'10%\', spad:0.0}, 2: {time:\'6:24:00\', cost:{2:22462, 3:23693, 4:6231}, price:245, effect:\'20%\', spad:0.0}, 3: {time:\'6:35:59\', cost:{2:24171, 3:26256, 4:7085}, price:274, effect:\'30%\', spad:0.0}, 4: {time:\'6:48:00\', cost:{2:26062, 3:29094, 4:8031}, price:305, effect:\'40%\', spad:0.0}, 5: {time:\'7:00:00\', cost:{2:28103, 3:32154, 4:9051}, price:337, effect:\'50%\', spad:0.0}, 6: {time:\'7:11:59\', cost:{2:30270, 3:35405, 4:10135}, price:371, effect:\'60%\', spad:0.0}, 7: {time:\'7:24:00\', cost:{2:32549, 3:38824, 4:11274}, price:406, effect:\'70%\', spad:0.0}, 8: {time:\'7:35:59\', cost:{2:34928, 3:42392, 4:12464}, price:442, effect:\'80%\', spad:0.0}, 9: {time:\'7:48:00\', cost:{2:37398, 3:46097, 4:13699, 9:2398}, price:479, effect:\'90%\', spad:0.0}, 10: {time:\'8:00:00\', cost:{2:39952, 3:49928, 4:14976, 9:4952}, price:516, effect:\'100%\', spad:0.0}, 11: {time:\'8:11:59\', cost:{2:42584, 3:53876, 4:16292, 9:7584}, price:555, effect:\'110%\', spad:0.0}, 12: {time:\'8:23:59\', cost:{2:45289, 3:57933, 4:17644, 9:10289}, price:594, effect:\'120%\', spad:0.0}, 13: {time:\'8:36:00\', cost:{2:48062, 3:62093, 4:19031, 9:13062}, price:634, effect:\'130%\', spad:0.0}, 14: {time:\'8:48:00\', cost:{2:50900, 3:66350, 4:20450, 9:15900}, price:674, effect:\'140%\', spad:0.0}, 15: {time:\'9:00:00\', cost:{2:53800, 3:70700, 4:21900, 9:18800}, price:715, effect:\'150%\', spad:0.0}, 16: {time:\'9:11:59\', cost:{2:56758, 3:75137, 4:23379, 9:21758}, price:757, effect:\'160%\', spad:0.0}, 17: {time:\'9:23:59\', cost:{2:59772, 3:79658, 4:24886, 9:24772}, price:799, effect:\'170%\', spad:0.0}, 18: {time:\'9:36:00\', cost:{2:62840, 3:84260, 4:26420, 9:27840}, price:841, effect:\'180%\', spad:0.0}, 19: {time:\'9:48:00\', cost:{2:65959, 3:88939, 4:27979, 9:30959}, price:884, effect:\'190%\', spad:0.0}, 20: {time:\'10:00:00\', cost:{2:69129, 3:93693, 4:29564, 9:34129}, price:928, effect:\'200%\', spad:0.0}}, \
104: {1: {time:\'8:06:00\', cost:{2:81000, 3:161500, 4:8750, 7:21500}, price:175, effect:\'144\', spad:0.0}, 2: {time:\'8:11:59\', cost:{2:27297, 3:53446, 4:3074, 7:7148}, price:194, effect:\'148\', spad:0.0}, 3: {time:\'8:18:00\', cost:{2:28737, 3:55605, 4:3434, 7:7868}, price:216, effect:\'153\', spad:0.0}, 4: {time:\'8:23:59\', cost:{2:30278, 3:57917, 4:3819, 7:8639}, price:239, effect:\'158\', spad:0.0}, 5: {time:\'8:30:00\', cost:{2:31898, 3:60347, 4:4224, 7:9449}, price:263, effect:\'163\', spad:0.0}, 6: {time:\'8:36:00\', cost:{2:33585, 3:62878, 4:4646, 7:10292}, price:288, effect:\'169\', spad:0.0}, 7: {time:\'8:41:59\', cost:{2:35330, 3:65495, 4:5082, 7:11165}, price:314, effect:\'174\', spad:0.0}, 8: {time:\'8:48:00\', cost:{2:37125, 3:68188, 4:5531, 7:12062}, price:341, effect:\'180\', spad:0.0}, 9: {time:\'8:53:59\', cost:{2:38966, 3:70949, 4:5991, 7:12983}, price:369, effect:\'185\', spad:0.0}, 10: {time:\'9:00:00\', cost:{2:40848, 3:73773, 4:6462, 7:13924}, price:397, effect:\'191\', spad:0.0}, 11: {time:\'9:06:00\', cost:{2:42769, 3:76654, 4:6942, 7:14884}, price:426, effect:\'197\', spad:0.0}, 12: {time:\'9:11:59\', cost:{2:44725, 3:79587, 4:7431, 7:15862}, price:455, effect:\'202\', spad:0.0}, 13: {time:\'9:18:00\', cost:{2:46713, 3:82570, 4:7928, 7:16856}, price:485, effect:\'208\', spad:0.0}, 14: {time:\'9:23:59\', cost:{2:48733, 3:85599, 4:8433, 7:17866}, price:515, effect:\'214\', spad:0.0}, 15: {time:\'9:30:00\', cost:{2:50781, 3:88672, 4:8945, 7:18890}, price:546, effect:\'220\', spad:0.0}, 16: {time:\'9:36:00\', cost:{2:52857, 3:91786, 4:9464, 7:19928}, price:577, effect:\'226\', spad:0.0}, 17: {time:\'9:41:59\', cost:{2:54959, 3:94939, 4:9989, 7:20979}, price:609, effect:\'232\', spad:0.0}, 18: {time:\'9:48:00\', cost:{2:57086, 3:98130, 4:10521, 7:22043}, price:641, effect:\'238\', spad:0.0}, 19: {time:\'9:53:59\', cost:{2:59237, 3:101356, 4:11059, 7:23118}, price:673, effect:\'244\', spad:0.0}, 20: {time:\'10:00:00\', cost:{2:61411, 3:104616, 4:11602, 7:24205}, price:706, effect:\'250\', spad:0.0}}, \
105: {1: {time:\'4:05:59\', cost:{2:5400, 3:5400}, price:0, effect:\'\', spad:0.0}, 2: {time:\'4:11:59\', cost:{2:6055, 3:6055}, price:0, effect:\'\', spad:0.0}, 3: {time:\'4:18:00\', cost:{2:6862, 3:6862}, price:0, effect:\'\', spad:0.0}, 4: {time:\'4:24:00\', cost:{2:7785, 3:7785}, price:0, effect:\'\', spad:0.0}, 5: {time:\'4:30:00\', cost:{2:8807, 3:8807}, price:0, effect:\'\', spad:0.0}, 6: {time:\'4:35:59\', cost:{2:9914, 3:9914}, price:0, effect:\'\', spad:0.0}, 7: {time:\'4:41:59\', cost:{2:11098, 3:11098}, price:0, effect:\'\', spad:0.0}, 8: {time:\'4:48:00\', cost:{2:12351, 3:12351}, price:0, effect:\'\', spad:0.0}, 9: {time:\'4:54:00\', cost:{2:13669, 3:13669}, price:0, effect:\'\', spad:0.0}, 10: {time:\'5:00:00\', cost:{2:15047, 3:15047}, price:0, effect:\'\', spad:0.0}, 11: {time:\'5:05:59\', cost:{2:16481, 3:16481}, price:0, effect:\'\', spad:0.0}, 12: {time:\'5:11:59\', cost:{2:17969, 3:17969}, price:0, effect:\'\', spad:0.0}, 13: {time:\'5:18:00\', cost:{2:19507, 3:19507}, price:0, effect:\'\', spad:0.0}, 14: {time:\'5:24:00\', cost:{2:21093, 3:21093}, price:0, effect:\'\', spad:0.0}, 15: {time:\'5:30:00\', cost:{2:22725, 3:22725}, price:0, effect:\'\', spad:0.0}, 16: {time:\'5:35:59\', cost:{2:24401, 3:24401}, price:0, effect:\'\', spad:0.0}, 17: {time:\'5:41:59\', cost:{2:26119, 3:26119}, price:0, effect:\'\', spad:0.0}, 18: {time:\'5:48:00\', cost:{2:27879, 3:27879}, price:0, effect:\'\', spad:0.0}, 19: {time:\'5:54:00\', cost:{2:29678, 3:29678}, price:0, effect:\'\', spad:0.0}, 20: {time:\'6:00:00\', cost:{2:31515, 3:31515}, price:0, effect:\'\', spad:0.0}}, \
106: {1: {time:\'5:15:00\', cost:{2:36000, 3:22000, 4:3350}, price:23, effect:\'200\', spad:0.0}, 2: {time:\'5:30:00\', cost:{2:37297, 3:24594, 4:3804}, price:65, effect:\'402\', spad:0.0}, 3: {time:\'5:45:00\', cost:{2:38737, 3:27474, 4:4308}, price:119, effect:\'664\', spad:0.0}, 4: {time:\'6:00:00\', cost:{2:40278, 3:30556, 4:4847}, price:184, effect:\'975\', spad:0.0}, 5: {time:\'6:15:00\', cost:{2:41898, 3:33797, 4:5414}, price:257, effect:\'1328\', spad:0.0}, 6: {time:\'6:30:00\', cost:{2:43585, 3:37171, 4:6005}, price:338, effect:\'1717\', spad:0.0}, 7: {time:\'6:45:00\', cost:{2:45330, 3:40660, 4:6615}, price:425, effect:\'2141\', spad:0.0}, 8: {time:\'7:00:00\', cost:{2:47125, 3:44251, 4:7244}, price:520, effect:\'2596\', spad:0.0}, 9: {time:\'7:15:00\', cost:{2:48966, 3:47933, 4:7888}, price:621, effect:\'3081\', spad:0.0}, 10: {time:\'7:30:00\', cost:{2:50848, 3:51697, 4:8547}, price:727, effect:\'3593\', spad:0.0}, 11: {time:\'7:45:00\', cost:{2:52769, 3:55538, 4:9219}, price:839, effect:\'4131\', spad:0.0}, 12: {time:\'8:00:00\', cost:{2:54725, 3:59450, 4:9903}, price:956, effect:\'4695\', spad:0.0}, 13: {time:\'8:15:00\', cost:{2:56713, 3:63427, 4:10599}, price:1078, effect:\'5283\', spad:0.0}, 14: {time:\'8:30:00\', cost:{2:58733, 3:67466, 4:11306}, price:1204, effect:\'5893\', spad:0.0}, 15: {time:\'8:45:00\', cost:{2:60781, 3:71563, 4:12023, 9:312}, price:1336, effect:\'6526\', spad:0.0}, 16: {time:\'9:00:00\', cost:{2:62857, 3:75715, 4:12750, 9:1143}, price:1472, effect:\'7181\', spad:0.0}, 17: {time:\'9:15:00\', cost:{2:64959, 3:79919, 4:13485, 9:1983}, price:1612, effect:\'7856\', spad:0.0}, 18: {time:\'9:30:00\', cost:{2:67086, 3:84173, 4:14230, 9:2834}, price:1756, effect:\'8551\', spad:0.0}, 19: {time:\'9:45:00\', cost:{2:69237, 3:88475, 4:14983, 9:3695}, price:1904, effect:\'9266\', spad:0.0}, 20: {time:\'10:00:00\', cost:{2:71411, 3:92822, 4:15743, 9:4564}, price:2057, effect:\'10000\', spad:0.0}}, \
107: {1: {time:\'8:30:00\', cost:{2:35000, 3:26000, 4:6000, 6:4000, 7:1500}, price:0, effect:\'\', spad:0.0}, 2: {time:\'9:00:00\', cost:{2:40000, 3:32000, 4:7000, 6:7000, 7:3000}, price:0, effect:\'\', spad:0.0}, 3: {time:\'9:30:00\', cost:{2:45000, 3:38000, 4:8000, 6:10000, 7:4500}, price:0, effect:\'\', spad:0.0}, 4: {time:\'10:00:00\', cost:{2:50000, 3:44000, 4:9000, 6:13000, 7:6000}, price:0, effect:\'\', spad:0.0}, 5: {time:\'10:30:00\', cost:{2:55000, 3:50000, 4:10000, 6:16000, 7:7500}, price:0, effect:\'\', spad:0.0}, 6: {time:\'11:00:00\', cost:{2:60000, 3:56000, 4:11000, 6:19000, 7:9000}, price:0, effect:\'\', spad:0.0}, 7: {time:\'11:30:00\', cost:{2:65000, 3:62000, 4:12000, 6:22000, 7:10500}, price:0, effect:\'\', spad:0.0}, 8: {time:\'12:00:00\', cost:{2:70000, 3:68000, 4:13000, 6:25000, 7:12000}, price:0, effect:\'\', spad:0.0}, 9: {time:\'12:30:00\', cost:{2:75000, 3:74000, 4:14000, 6:28000, 7:13500}, price:0, effect:\'\', spad:0.0}, 10: {time:\'13:00:00\', cost:{2:80000, 3:80000, 4:15000, 6:31000, 7:15000}, price:0, effect:\'\', spad:0.0}, 11: {time:\'13:30:00\', cost:{2:85000, 3:86000, 4:16000, 6:34000, 7:16500}, price:0, effect:\'\', spad:0.0}, 12: {time:\'14:00:00\', cost:{2:90000, 3:92000, 4:17000, 6:37000, 7:18000}, price:0, effect:\'\', spad:0.0}, 13: {time:\'14:30:00\', cost:{2:95000, 3:98000, 4:18000, 6:40000, 7:19500}, price:0, effect:\'\', spad:0.0}, 14: {time:\'15:00:00\', cost:{2:100000, 3:104000, 4:19000, 6:43000, 7:21000}, price:0, effect:\'\', spad:0.0}, 15: {time:\'15:30:00\', cost:{2:105000, 3:110000, 4:20000, 6:46000, 7:22500}, price:0, effect:\'\', spad:0.0}, 16: {time:\'16:00:00\', cost:{2:110000, 3:116000, 4:21000, 6:49000, 7:24000}, price:0, effect:\'\', spad:0.0}, 17: {time:\'16:30:00\', cost:{2:115000, 3:122000, 4:22000, 6:52000, 7:25500}, price:0, effect:\'\', spad:0.0}, 18: {time:\'17:00:00\', cost:{2:120000, 3:128000, 4:23000, 6:55000, 7:27000}, price:0, effect:\'\', spad:0.0}, 19: {time:\'17:30:00\', cost:{2:125000, 3:134000, 4:24000, 6:58000, 7:28500}, price:0, effect:\'\', spad:0.0}, 20: {time:\'18:00:00\', cost:{2:130000, 3:140000, 4:25000, 6:61000, 7:30000}, price:0, effect:\'\', spad:0.0}}, \
108: {1: {time:\'10:36:00\', cost:{2:29000, 3:40000, 4:3500, 6:15000}, price:0, effect:\'\', spad:0.0}, 2: {time:\'11:11:59\', cost:{2:33000, 3:45000, 4:4000, 6:20000}, price:0, effect:\'\', spad:0.0}, 3: {time:\'11:48:00\', cost:{2:37000, 3:50000, 4:4500, 6:25000}, price:0, effect:\'\', spad:0.0}, 4: {time:\'12:23:59\', cost:{2:41000, 3:55000, 4:5000, 6:30000}, price:0, effect:\'\', spad:0.0}, 5: {time:\'13:00:00\', cost:{2:45000, 3:60000, 4:5500, 6:35000}, price:0, effect:\'\', spad:0.0}, 6: {time:\'13:36:00\', cost:{2:49000, 3:65000, 4:6000, 6:40000}, price:0, effect:\'\', spad:0.0}, 7: {time:\'14:11:59\', cost:{2:53000, 3:70000, 4:6500, 6:45000}, price:0, effect:\'\', spad:0.0}, 8: {time:\'14:48:00\', cost:{2:57000, 3:75000, 4:7000, 6:50000}, price:0, effect:\'\', spad:0.0}, 9: {time:\'15:24:00\', cost:{2:61000, 3:80000, 4:7500, 6:55000}, price:0, effect:\'\', spad:0.0}, 10: {time:\'16:00:00\', cost:{2:65000, 3:85000, 4:8000, 6:60000}, price:0, effect:\'\', spad:0.0}, 11: {time:\'16:36:00\', cost:{2:69000, 3:90000, 4:8500, 6:65000}, price:0, effect:\'\', spad:0.0}, 12: {time:\'17:12:00\', cost:{2:73000, 3:95000, 4:9000, 6:70000}, price:0, effect:\'\', spad:0.0}, 13: {time:\'17:48:00\', cost:{2:77000, 3:100000, 4:9500, 6:75000}, price:0, effect:\'\', spad:0.0}, 14: {time:\'18:23:59\', cost:{2:81000, 3:105000, 4:10000, 6:80000}, price:0, effect:\'\', spad:0.0}, 15: {time:\'19:00:00\', cost:{2:85000, 3:110000, 4:10500, 6:85000}, price:0, effect:\'\', spad:0.0}, 16: {time:\'19:36:00\', cost:{2:89000, 3:115000, 4:11000, 6:90000}, price:0, effect:\'\', spad:0.0}, 17: {time:\'20:12:00\', cost:{2:93000, 3:120000, 4:11500, 6:95000}, price:0, effect:\'\', spad:0.0}, 18: {time:\'20:48:00\', cost:{2:97000, 3:125000, 4:12000, 6:100000}, price:0, effect:\'\', spad:0.0}, 19: {time:\'21:23:59\', cost:{2:101000, 3:130000, 4:12500, 6:105000}, price:0, effect:\'\', spad:0.0}, 20: {time:\'22:00:00\', cost:{2:105000, 3:135000, 4:13000, 6:110000}, price:0, effect:\'\', spad:0.0}}, \
109: {1: {time:\'6:05:59\', cost:{2:90750, 3:126500, 6:30000, 8:10250}, price:350, effect:\'1300\', spad:0.0}, 2: {time:\'6:11:59\', cost:{2:21723, 3:33446, 8:4574}, price:401, effect:\'1400\', spad:0.0}, 3: {time:\'6:18:00\', cost:{2:22802, 3:35605, 8:4934}, price:459, effect:\'1500\', spad:0.0}, 4: {time:\'6:24:00\', cost:{2:23958, 3:37917, 8:5319}, price:521, effect:\'1600\', spad:0.0}, 5: {time:\'6:30:00\', cost:{2:25173, 3:40347, 8:5724}, price:585, effect:\'1700\', spad:0.0}, 6: {time:\'6:35:59\', cost:{2:26439, 3:42878, 8:6146}, price:653, effect:\'1800\', spad:0.0}, 7: {time:\'6:41:59\', cost:{2:27747, 3:45495, 8:6582}, price:723, effect:\'1900\', spad:0.0}, 8: {time:\'6:48:00\', cost:{2:29094, 3:48188, 8:7031}, price:795, effect:\'2000\', spad:0.0}, 9: {time:\'6:54:00\', cost:{2:30474, 3:50949, 8:7491}, price:868, effect:\'2100\', spad:0.0}, 10: {time:\'7:00:00\', cost:{2:31886, 3:53773, 8:7962}, price:943, effect:\'2200\', spad:0.0}, 11: {time:\'7:05:59\', cost:{2:33327, 3:56654, 8:8442}, price:1020, effect:\'2300\', spad:0.0}, 12: {time:\'7:11:59\', cost:{2:34793, 3:59587, 8:8931}, price:1099, effect:\'2400\', spad:0.0}, 13: {time:\'7:18:00\', cost:{2:36285, 3:62570, 8:9428}, price:1178, effect:\'2500\', spad:0.0}, 14: {time:\'7:24:00\', cost:{2:37799, 3:65599, 8:9933}, price:1259, effect:\'2600\', spad:0.0}, 15: {time:\'7:30:00\', cost:{2:39336, 3:68672, 8:10445}, price:1341, effect:\'2700\', spad:0.0}, 16: {time:\'7:35:59\', cost:{2:40893, 3:71786, 8:10964}, price:1424, effect:\'2800\', spad:0.0}, 17: {time:\'7:41:59\', cost:{2:42469, 3:74939, 8:11489}, price:1508, effect:\'2900\', spad:0.0}, 18: {time:\'7:48:00\', cost:{2:44065, 3:78130, 8:12021}, price:1593, effect:\'3000\', spad:0.0}, 19: {time:\'7:54:00\', cost:{2:45678, 3:81356, 8:12559}, price:1679, effect:\'3100\', spad:0.0}, 20: {time:\'8:00:00\', cost:{2:47308, 3:84616, 8:13102}, price:1766, effect:\'3200\', spad:0.0}}, \
})');

var buildLevelMap = {13:5, 14: 1, 19:0, 34: 1, 40: 0, 51:0, 67: 0};
var Holder = (function() {

    var actualConstructor = function() {
        this.currentHost = '';
        this.playerName = '';
        this.isMinMenu = false;
        this.buildingInProgress = false;
        this.cities = null;
        arguments.callee.instances.push(this);
    }
    actualConstructor.instances = [];
    return actualConstructor;
}
        )();

Holder.prototype.setTownPanel = function(panel) {
    this.townPanel = panel;
}

Holder.prototype.updateTownPanel = function() {
    this.townPanel.caption.text = ' Города (' + getArrayCount(this.townInfo) + ')';
    this.townPanel.updateCaption();
    this.townPanel.renderContent(this);
}

Holder.prototype.collectPageInfo = function() {

    // имя игрока из заголовка страницы
    playerName = document.title.split('—')[1].trim();
    currentHost = location.host;
    isMinMenu = _getValue('isMinMenu', false);

    this.cities = _deserialize(_getValue('cities', '{ current: null, list: [] }'));
    // собираем инфу о городах игрока: название, координаты, id
    //  cities = { current: null, list: [] };
    // ищем select со списком городов (по аттрибуту name)
    var items = $x("//div[@id='town_select']/div[contains(@class, 'iteml1')]");
    for (var i in items) {
        var s = items[i].innerHTML;
        var id = items[i].getAttribute('value');
        if (!this.cities.list[i])
            this.cities.list[i] = {};

        this.cities.list[i].id = id;
        this.cities.list[i].name = s.trim();
        if (items[i].getAttribute('class').indexOf('iteml1_hover') != -1)
            this.cities.current = i;
    }
    // ищем строительство

    if (!this.cities.list[this.cities.current].building)
        this.cities.list[this.cities.current].building = {};
    this.cities.list[this.cities.current].building.at = new Date().getTime();

    if (document.location.href.indexOf('town') != -1) {
        this.buildingInProgress = $q('buildp') != null;
        if (this.buildingInProgress) {
            if (!this.cities.list[this.cities.current].building.item)
                this.cities.list[this.cities.current].building.item = {};
            var b = $x("//div[@class='task_b' or @class='task_d']/a[contains(@href,'build?pos=')]");
            if (b.length > 0) {
                var sid = parseInt(b[0].href.match(/pos=(\d+)/)[1]);
                var s = $x("//div[@class='task_b']/div[@class='task_desc']/b");
                var d = $x("//div[@class='task_d']/div[@class='task_desc']/b");
                if (s.length > 0) { //здание строится
                    var shtml = s[0].innerHTML;
                    // обновить информацию
                    this.cities.list[this.cities.current].building.item.caption = shtml.substring(0, shtml.indexOf('<br>'));
                    this.cities.list[this.cities.current].building.item.level = parseInt(shtml.substring(shtml.indexOf('—') + 2, shtml.length));
                    this.cities.list[this.cities.current].building.item.sid = sid;
                } else if (d.length > 0) { //здание разрушается
                    var shtml = d[0].innerHTML;
                    // обновить информацию
                    this.cities.list[this.cities.current].building.item.caption = shtml.substring(0, shtml.indexOf('<br>'));
                    this.cities.list[this.cities.current].building.item.level = parseInt(shtml.substring(shtml.indexOf('—') + 2, shtml.length));
                    this.cities.list[this.cities.current].building.item.sid = sid;
                }
            }
            var btime = $q('buildt').innerHTML;
            if (btime) {
                var s2 = btime.match(/\>(\d+)\</);
                if (s2 && s2[1])
                    btime = s2[1];
                this.cities.list[this.cities.current].building.item.time = 1000 * parseInt(btime);
            }
            var bprogress = $q('buildp').innerHTML;
            if (bprogress) {
                var s2 = bprogress.match(/\>(\d+)\</);
                if (s2 && s2[1])
                    bprogress = s2[1];
                this.cities.list[this.cities.current].building.item.progress = 1000 * parseInt(bprogress);
            }
        } else
            this.cities.list[this.cities.current].building.item = null;
    }

    _setValue('cities', _serialize(this.cities));
}

Holder.prototype.injectTownInfo = function() {
    this.townInfo = _deserialize(_getValue('townlist', '{}'));
    if (document.location.href.indexOf('mapinfo?o=') == -1 && document.location.href.indexOf('mapinfo?x=') == -1)
        return;
    // вставляем div с инфой и командами под ссылками

    var form = $x("//form[@action='postmessage' and @method='post']");

    if (form.length == 0) {
        return;
    }

    var tid = -1;
    var data = $x("//div[@class='pagetitle']/div");
    data = data[0].innerHTML.match(/^(.*)\((.*)\)$/);
    var tname = data[1].trim();
    tid = data[2].trim();

    data = $x("//div[@id='inf_tt_u']/div[@id='inf_tt_text_table1']/a[contains(@href, 'account?id=')]");
    var pid = data[0].href.match(/id=(\d+)/)[1];
    var pname = data[0].innerHTML.trim();

    var country = null;
    data = $x("//div[@id='inf_tt_u']/div[@id='inf_tt_text_table1']/a[contains(@href, 'countryinfo?id=')]");
    if (data.length == 1) {
        country = { id: data[0].href.match(/id=(\d+)/)[1], name: data[0].innerHTML.trim() };
    } else {
        country = { id: -1, name: 'В стране не состоит' };
    }

    var popdate = new Date().getTime();

    var popvalue = 0;
    var tclimate = '';
    var trelief = '';
    var trace = '';

    data = $x("//div[@id='inf_tt_u']/div[@id='inf_tt_text_table1']/img[contains(@class, 'res')]");
    if (data.length > 0) {
        popvalue = parseInt(data[0].parentNode.lastChild.nodeValue);
    }
    /*
     var i=0;
     while (i <data.length) {
     var o = data[i].innerHTML;
     i++;
     if(!data[i-1].nextSibling)
     continue;
     var o1 = data[i-1].nextSibling.innerHTML;

     if (o && o1) {
     if (o.indexOf('Население') != -1) {
     _log("data: " + o1);
     popvalue = parseInt(o1.substring(0, o1.indexOf('<img')));
     } else if (o.indexOf('Климат') != -1)
     tclimate = o1;
     else if (o.indexOf('Рельеф') != -1)
     trelief = o1;
     else if (o.indexOf('Раса') != -1)
     trace = o1;
     }
     }
     */
    var town = {id: tid, name: tname, climate: tclimate, relief: trelief, race: trace,
        player: { id: pid, name: pname },
        country: country,
        pop: [
            {date: popdate, value: popvalue}
        ]};

    // втавка панельки
    form = form[0];

    var inner = '<a id="townadd" href="javascript: void(0)">Добавить/обновить</a>';
    inner += '<br/><a id="playeradd" href="javascript: void(0)">Добавить игрока во враги</a>';
    if (town.country.id > -1) {
        inner += '<br/><a id="countryadd" href="javascript: void(0)">Добавить страну во враги</a>';
    }

    if (this.townInfo[town.id]) {
        var t = this.townInfo[town.id];
        var s2 = '';
        if (t.pop.length > 0) {
            var j = t.pop.length - 1;
            while (j >= 0) {
                if (!t.pop[j]) {
                    j--;
                    continue;
                }
                var d = new Date(t.pop[j].date);
                if (s2.length > 0)
                    s2 += ', ';
                s2 += t.pop[j].value + '<sub>' + d.format('dd.mm hh:nn') + '</sub>';
                j--;
            }
        }
        else
            s2 = '-';

        var d = new Date(popdate);
        s2 = '<b>' + popvalue + '<sub>' + d.format('dd.mm hh:nn') + '</sub></b>, ' + s2;
        inner += '<br /><br />' + s2;
    }

    var elem = $e('div', inner, { id: 'towndiv' });
    var infDiv = $q("inf_line");
    infDiv.parentNode.insertBefore(elem, infDiv.nextSibling);

    $q('townadd').addEventListener('click', clickAddTown(town, this), false);
    $q('playeradd').addEventListener('click', this.clickAddPlayer(town.player), false);
    if (town.country.id > -1) {
        $q('countryadd').addEventListener('click', this.clickAddCountry(town.country), false);
    }
}

function clickAddTown(town, holder) {
    return function () {
        if (holder.townInfo[town.id]) {
            var found = false;
            for (var i in holder.townInfo[town.id].pop) {
                var p = holder.townInfo[town.id].pop[i];
                if (Math.abs(town.pop[0].date - p.date) <= 60 * 1000) {
                    found = true;
                    p.date = town.pop[0].date;
                    p.value = town.pop[0].value;
                    break;
                }
            }
            if (!found)
                holder.townInfo[town.id].pop.push(town.pop[0]);
            holder.townInfo[town.id].country = town.country;
            holder.townInfo[town.id].name = town.name;
        } else {
            holder.townInfo[town.id] = town;
        }
        holder.saveTownInfo();
        holder.updateTownPanel();
    }
}

Holder.prototype.clickAddPlayer = function(player) {
    return function () {
        if (this.enemyInfo.players[player.id] != player.name) {
            this.enemyInfo.players[player.id] = player.name;
        }
        this.saveEnemyInfo();
        this.showEnemies();
    }
}

Holder.prototype.clickAddCountry = function(country) {
    return function () {
        if (this.enemyInfo.countries[country.id] != country.name) {
            this.enemyInfo.countries[country.id] = country.name;
        }
        this.saveEnemyInfo();
        this.showEnemies();
    }
}

Holder.prototype.saveTownInfo = function() {
    _setValue('townlist', _serialize(this.townInfo));
}

var Panel = (function() {

    var Pane = function(id, left, top) {
        this.id = id + 'pane';
        this.leftKey = id + 'pane_left';
        this.topKey = id + 'pane_top';
        this.left = left || '10px';
        this.top = top || (160 + 50 * panelCount) + 'px';
    }
    Pane.prototype.className = 'pane';

    var Title = function(id, normalBackground, alertBackground) {
        this.id = id + 'panetitle';
        this.normalBackground = normalBackground || '#90DD43';
        this.alertBackground = alertBackground || 'red';
        __addStyle('#' + id + 'pane { z-index: ' + (3030 - panelCount * 5) + '; background-color: ' + this.normalBackground + ';}');
    }
    Title.prototype.className = 'panetitle';

    var Button = function(id, imageIndex) {
        this.id = id + 'panebutton';
        this.image = imageList[0];
    }
    Button.prototype.className = 'panebutton';

    var Caption = function(id, text) {
        this.id = id + 'panecaption';
        this.text = text ? text : 'Тоже панель';
    }
    Caption.prototype.className = 'panecaption';

    var Content = function(id) {
        this.id = id + 'panecontent';
        this.visibleKey = id + 'pane_visible';
        this.visible = _getValue(this.visibleKey, false);
        this.text = 'Пусто';
    }
    Content.prototype.className = 'panecontent';

    var panelCss = '.pane { border: 2px groove black; \
    position: absolute; padding: 5px 5px; -moz-border-radius: 5px; } \
    .panebutton img { vertical-align: middle; } \
    .panetitle { cursor: move; text-align: left; vertical-align: middle; \
    padding: 1px 1px; } \
    .panecaption { vertical-align: middle; \
    white-space: nowrap; color:#000000; } \
    .panecontent { padding: 2px 0px; text-align: left; } \
    .panecontent div { padding: 0px 0px; text-align: left; font-size: 80%; } \
	#towndiv { padding: 5px 5px; background-color: #ffff66; } \
	.towns { border: 1px solid #999966; padding: 0px 0px;  font-size: 80%; \
    max-width: 500px;} \
    .towns tr, .towns td { border: 1px solid #999966; padding: 0px 0px; color: #000000; } \
    .towns td img { height: 16px; width: 16px; vertical-align: middle; } \
	.tactics { font-size: 80%; } \
    .tactics, .tactics tr, .tactics td { border-style: none; color:#000} \
	.trainTable { border:1px solid #000000;} \
    .trainTable td {text-align:center; border-left:1px solid #000000; color: #000000} \
	.tradeTable { border:1px solid #000000;} \
	.tradeTable td { text-align:center; border-left:1px solid #000000; border-top:1px solid #000000; color: #000000} \
	'
    __addStyle(panelCss);

    var panelCount = 0;
    var actualConstructor = function (id, caption, normalBackground, alertBackground) {
        this.pane = new Pane(id);
        this.title = new Title(id, normalBackground, alertBackground);
        this.button = new Button(id, 0);
        this.caption = new Caption(id, caption);
        this.content = new Content(id);
        arguments.callee.instances.push(this);
        panelCount++;
    }
    actualConstructor.instances = [];
    return actualConstructor;
})();

Panel.prototype.updateCaption = function() {
    $q(this.caption.id).innerHTML = (this.content.visible || !isMinMenu) ? this.caption.text : '';
}

Panel.prototype.action = function(render) {
    //_log('reder=' + render + ' ' + this.content.visibleKey + ':' + this.content.visible);
    !render && (this.content.visible = !this.content.visible);
    this.updateCaption();
    var content = $q(this.content.id);
    var button = $q(this.button.id);
    if (this.content.visible) {
        content.style.display = '';
        button.setAttribute('title', 'Спрятать');
        //_log(this.content.visibleKey + ':' + this.content.visible);
    }
    else {
        content.style.display = 'none';
        button.setAttribute('title', 'Показать');
    }
    _setValue(this.content.visibleKey, this.content.visible);
}

Panel.prototype.render = function() {
    var inner = [];
    inner.push('<div id="');
    inner.push(this.title.id);
    inner.push('" class="');
    inner.push(this.title.className);
    inner.push('">');
    inner.push('<a id="');
    inner.push(this.button.id);
    inner.push('" class="');
    inner.push(this.button.className);
    inner.push('" href="javascript: void(0)"><img src="');
    inner.push(this.button.image);
    inner.push('" /></a>');
    inner.push('<span id="');
    inner.push(this.caption.id);
    inner.push('" class="');
    inner.push(this.caption.className);
    inner.push('">');
    inner.push('</span></div><div id="');
    inner.push(this.content.id);
    inner.push('" class="');
    inner.push(this.content.className);
    inner.push(' " style="display:none" >');
    inner.push(this.content.text);
    inner.push('</div>');
    var element = $e('div', inner.join(''), {id: this.pane.id},
    {left: this.pane.left,top: this.pane.top}, document.body);
    element.className = this.pane.className;
    this.updateCaption();
    $q(this.button.id).addEventListener('click', bindMethod(this, this.action), false);


    _setValue(this.content.visibleKey, this.content.visible);

    function bindMethod(o, f) {
        return function() {
            return f.apply(o);
        }
    }
}

Panel.prototype.renderContent = function(holder) {

}


function onUSLoad() {
    function correctUI() {
        var unitbtn = $x("//div[@class='tunit_btns']");
        for (var i in unitbtn) {
            unitbtn[i].style.padding = '3px 92px 25px';
        }
    }

    if (document.body.innerHTML.length == 0) {
        // С 10.10.2009
        // Ошибка на сервере или ещё почему страничка не загружена
        // пробуем рефрешить её через 30-60 сек
        document.body.innerHTML = 'О-о! Ошибка при загрузке страницы. \
      Возможно, на сервере технические работы или проблемы с каналом Интернет. \
      Попытка обновления начнётся автоматически через 30..60 секунд...';

        var tid = window.setInterval(function() {
            location.href = document.URL;
        }, (20 + getRandomInt(10, 40)) * 1000);

        return;
    }
    _log('loading...');
    var holder = new Holder();
    try {
        holder.collectPageInfo();
    } catch (e) {
        _log(e);
    }

    /* стили панелек
     #tradepane { z-index: 3040; background-color: #99ccff; } \
     #buildpane { z-index: 3030; background-color: #ffcc33; } \
     #trainpane { z-index: 3025; background-color: #1C9205; } \
     #citypane { z-index: 3020; background-color: #ffff66; } \
     #mappane { z-index: 3010; background-color: #efefef; } \
     #enemypane {z-index: 3005; background-color: #ffffff; }\
     #pane { z-index: 3000; background-color: #90DD43; } \
     */
    var trade = new Panel('trade', ' Торговля', '#99ccff');

    trade.renderContent = function(holder) {
        var text = '<table class="tradeTable"><tr><td>N</td><td>Операция</td><td>Товар</td><td>Время</td></tr>';
        for (var i in holder.cities.list) {
            var c = holder.cities.list[i];
            var s = c.name;
            if (c.traders) {
                s += ' (' + c.traders.free + '/' + c.traders.market + '/' + c.traders.total + ')';
            }
            if (i == holder.cities.current)
                s = '<b>' + s + '</b>';
            s = '<a href="http://' + currentHost + '/tradesend?o=' + c.id + '&x=0&y=0">' + s + '</a>';
            s += ' <a href="http://' + currentHost + '/trade?send&o=' + holder.cities.list[i].id + '&x=0&y=0'
                    + '"><img title="Транспортировать ресурсы" class="ibut ib2" src="/p/spacer.gif"></a>';
            s += '  <a href="http://' + currentHost + '/trade?stream&o=' + holder.cities.list[i].id + '&x=0&y=0'
                    + '"><img title="Начать снабжение ресурсами" class="ibut ib3" src="/p/spacer.gif"></a>'
            s = '<tr><td colspan="4">' + s + '</td></tr>';
            for (var j in c.tradeOperation) {
                s += '<tr><td>';
                s += c.tradeOperation[j].num;
                s += '</td><td>';
                s += c.tradeOperation[j].operation;
                s += '</td><td>';
                s += c.tradeOperation[j].trade;
                s += '</td><td>';
                s += '<span id="op_' + i + '_' + j + '" >' + new Date(c.tradeOperation[j].time - new Date().getTime()).formatTime() + '</span>';
                s += '</td></tr>';
            }
            text += s;
        }
        $q(this.content.id).innerHTML = text;
    }

    var build = new Panel('build', ' Строения', '#FFCC33');

    build.renderContent = function(holder) {
        var text = '';
        for (var i in holder.cities.list) {
            var c = holder.cities.list[i];
            var s = c.name;
            if (i == holder.cities.current)
                s = '<b>' + s + '</b>';
            s = '<a href="' + applyTidToUri(c.id, 'town?', true) + '">' + s + '</a>';
            s = '<td>' + s + '</td><td>';

            if (c.building) {
                s += '(' + (new Date(c.building.at)).format('hh:nn:ss') + ') ';
                var item = c.building.item;
                if (item == null)
                    s += 'Ничего не строится'
                else {
                    // _log('showBuilding: '+c.building.toSource());
                    var complete = c.building.at + item.time - item.progress;
                    s += ' <a href="' + applyTidToUri(c.id, 'build?pos=' + item.sid) + '">' + item.caption + ' x' + item.level + '</a> в ' + (new Date(complete)).format('hh:nn:ss');
                }
            }
            else
                s += ' Нет информации';
            s += '</td>';
            text += '<tr>' + s + '</tr>';
        }
        text += '<tr><td><a id="show_build" href="javascript:void(0)">Рассчитать прочность города</a></td><td></td></tr>';

        $q(this.content.id).innerHTML = '<table class="tactics" cellpadding="0" cellspacing="0">' + text + '</table>';
        $q('show_build').addEventListener('click', buildingInfo(), false);

    }

    var train = new Panel('train', ' Тренировка', '#90DD43');

    train.renderContent = function(holder) {
        var text = '';
        for (var ci in holder.cities.list) {
            var c = holder.cities.list[ci];
            var s = c.name;
            if (ci == holder.cities.current)
                s = '<b>' + s + '</b>';
            s = '<a href="' + applyTidToUri(c.id, 'town?', true) + '">' + s + '</a>';
            s = '<td>' + s + '&nbsp;</td><td>';
            //
            s += '<table class="trainTable" >';
            s += '<tr>';

            //Динамическая секция по всем строениям
            var trInfoArr = holder.cities.list[ci].train;
            for (var i in trInfoArr) {
                if (trInfoArr[i]) {
                    s += '<td>&nbsp;<a href="' + applyTidToUri(c.id, 'http://' + currentHost + '/build?pos=' + i) + '">' + trInfoArr[i].building + ' x' + trInfoArr[i].level + '</a>&nbsp;</td>';
                }
            }
            s += '</tr><tr>';
            for (var i in trInfoArr) {
                if (trInfoArr[i]) {
                    if (trInfoArr[i].unitId > -1) {
                        s += '<td><img src="p/spacer.gif" class="unit u' + trInfoArr[i].unitId + '"> (' + trInfoArr[i].unitCount + ')</td>';
                    } else {
                        s += '<td>&nbsp;</td>';
                    }
                }
            }
            s += '</tr><tr>';
            for (var i in trInfoArr) {
                if (trInfoArr[i]) {
                    if (trInfoArr[i].timeEnd) {
                        s += '<td>&nbsp;<span id="tr_' + ci + '_' + i + '" >' + new Date(trInfoArr[i].timeEnd - new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000).formatTime() + '</span>&nbsp;';
                    } else
                        s += '<td>&nbsp;';
                    s += '<div style="display:inline; font-size:100%; padding-left:20px"><a style="color:red" id="rm_' + ci + '_' + i + '" href="javascript:void(0);">X</a></div></td>';
                }
            }
            // -- конец

            s += '</tr></table>';
            s += '</td>';
            text += '<tr>' + s + '</tr>';
            ;
        }
        text = '<table class="tactics" >' + text + '</table>';
        $q(this.content.id).innerHTML = text;
        for (var ci in holder.cities.list) {
            var trInfoArr = holder.cities.list[ci].train;
            for (var i in trInfoArr) {
                if (trInfoArr[i]) {
                    $q('rm_' + ci + '_' + i).addEventListener('click', onRemoveTrainBox(ci, i, holder, this), false);
                }
            }
        }
    }

    var city = new Panel('city', ' Города', '#ffff66');

    city.renderContent = function(holder) {
        this.caption.text = ' Города (' + getArrayCount(holder.townInfo) + ')';
        //$q(desc.caption.id).innerHTML = s;
        var s = '<tr><td>ID/X/Y</td><td>Город</td><td>Игрок</td><td>Население</td><td>-</td></tr>';
        for (var i in holder.townInfo) {
            var t = holder.townInfo[i];
            var ti = getTownView(i, holder);
            var cn = '';
            if (t.country)
                cn = ', ' + t.country.name;
            s += '<tr>';
            s += '<td><a id="tgom' + i + '" href="javascript: void(0)" title="Свернуть и перейти на карту">' + t.id + '</a></td>';
            s += '<td><a id="tgot' + i + '" href="javascript: void(0)" title="Свернуть и перейти на город">' + t.name + '</a> <a id="tdelc' + i + '" href="javascript: void(0)" title="Удалить город из списка"><img src="' + imageList[3] + '"></a> <a id="tmapc' + i + '" class="lbl" href="javascript: void(0)" title="' + ti.hint + ', переключить видимость">' + ti.caption + '</a></td>';
            s += '<td><a id="tgop' + i + '" href="javascript: void(0)" title="Свернуть и перейти на игрока">' + t.player.name + cn + '</a></td>';
            s += '<td>';

            var s2 = '';
            if (t.pop.length > 0) {
                var j = t.pop.length - 1;
                while (j >= 0) {
                    if (!t.pop[j]) {
                        j--;
                        continue;
                    }
                    var d = new Date(t.pop[j].date);
                    if (s2.length > 0)
                        s2 += '<br />';
                    var aPop = t.pop[j].value;
                    if (s2.length == 0)
                        aPop = '<b>' + aPop + '</b>';
                    s2 += aPop;
                    s2 += '<sub>' + d.format('dd.mm hh:nn') + '</sub>';
                    s2 += ' <a id="tdelp' + i + j + '" href="javascript: void(0)" title="Удалить население из списка"><img src="' + imageList[3] + '"></a>';
                    j--;
                }
            }
            else
                s2 = '-';
            s += s2;
            s += '</td>';
            s += '<td>-</td>';
            s += '</tr>';
        }
        $q(this.content.id).innerHTML = '<table class="towns" cellpadding="0" cellspacing="0"><tbody>' + s + '</tbody></table>';
        for (var i in holder.townInfo) {
            var t = holder.townInfo[i];
            $q('tgom' + i).addEventListener('click', onShowMap(t.id, this), false);
            $q('tgot' + i).addEventListener('click', onShowTown(t.id, this), false);
            $q('tgop' + i).addEventListener('click', onShowPlayer(t.player.id, this), false);
            $q('tdelc' + i).addEventListener('click', onDelTown(t.id, holder), false);
            $q('tmapc' + i).addEventListener('click', onChangeViewTown(t.id, holder), false); // на карте
            if (t.pop.length > 0) {
                var j = t.pop.length - 1;
                while (j >= 0) {
                    $q('tdelp' + i + j).addEventListener('click', onDelPop(t.id, j, holder), false);
                    j--;
                }
            }
        }
    }

    var enemy = new Panel('enemy', ' Враги', '#ffffff');

    if (!$q('settingspane')) {
        __addStyle('#settingspane a { color:#ffffff;}');
        var sett = new Panel('settings', 'Min', '#000000');
        sett.pane.top = '410px';

        sett.action = function(render) {
            if (render)
                return;
            isMinMenu = !isMinMenu;
            _setValue('isMinMenu', isMinMenu)
            for (var i in Panel.instances)
                Panel.instances[i].updateCaption();
        };

        sett.updateCaption = function() {
            $q(this.button.id).innerHTML = (isMinMenu ? 'Max' : 'Min');
        }
    } else {
        var action = function() {
            isMinMenu = !isMinMenu;
            for (var i in Panel.instances)
                Panel.instances[i].updateCaption();

        };
        $q('settingspanebutton').addEventListener('click', action, false);
    }

    holder.setTownPanel(city);
    holder.injectTownInfo();

    for (var i in Panel.instances) {
        Panel.instances[i].render();
        try {
            Panel.instances[i].renderContent(holder);
        } catch (e) {
            _log(e);
        }
        Panel.instances[i].action(true);
    }

    //применить цветовую раскраску
    try {
        resourceColorer();
    } catch(e) {
        _log(e);
    }
    //распознаем транспортировку ресов
    if (document.location.href.indexOf('market?send') !=-1)
    	injectCityListInTrade(holder);
    //распознаем отправку войск
    if (document.location.href.indexOf('getarmy') != -1) {
        injectCities($x("//form[@action='getarmy']/p"), 'DIV', holder);
        injectArmySpeed();
    }
    //распознаем отзыв подкрепления
    if (document.location.href.indexOf('turnout?home') !=-1) {
        injectArmySpeed();
    }
    // распознаём отправку грузов
    if (document.location.href.indexOf('market') != -1)
        injectTradeOps(holder);
    // Распознаем форму тренировки войск
    if (document.location.href.indexOf('trainpage') != -1 || document.location.href.indexOf('build?pos=') != -1) {
        trameTimeCalculate();
        collectTrainInfo(holder, train);
    }

    if (document.location.href.indexOf('account?id=') != -1) {
        parseCityListPage();
    }

    if (document.location.href.indexOf('map') != -1) {
        parseMapPage();
        var allPlayerCitiesHolder = _deserialize(_getValue("all_player_cities_holder", '{}'));
        var cities = _deserialize(_getValue('cities', '{ current: null, list: [] }'));
        var baseCoords = allPlayerCitiesHolder[cities.list[cities.current].id];
        if (baseCoords) {
            var linkDiv = $x("//div[@id='map_all']/div[contains(@style, 'position:absolute')]")[0];
            $e('DIV', '<a id="inf_tt_ico" class="a_osn_yes"></a>', {id:'inf_tt_ico_a'}, null, linkDiv);
            document.getElementById('inf_tt_ico_a').addEventListener('click', switchMapHelp);
        }
        $x("//div[@id='landlnks']")[0].addEventListener("DOMNodeInserted", onMapDivNodeInserted, false);
    }
    
    //распознаем форму Экономики города
    if (document.location.href.indexOf('economics') != -1) {
        injectEconomicCalc(holder);
    }

 
    if (document.location.href.indexOf('market?stream') != -1) {
        injectTPCities();
       streamSort();
    }
/*
    if (document.location.href.indexOf('buildinfo?id=') != -1) {
        parseBuildingInfo();
    }
*/
    if (document.location.href.indexOf('countryinfo') !=-1) {
        var players = $x("//table[@class='def_table players']/tbody/tr/td/a[@class='ulink0']");
        var line = "";
        for (var i in players) {
            line += players[i].innerHTML + '|';
        }
        _log(line);
    }

    if (document.location.href.indexOf('town') != -1) {
        var blocks = $x("//div[contains(@style,'/p/if/stone/sh_sl.png')]");
        if (blocks.length == 0) {
            $e('DIV', null, {id: 'en_build_info_panel'}, {cursor:'pointer', background: 'url(/p/if/stone/sh_sl.png)', position: 'absolute', left: '-7px', top:'444px', zIndex:10000, width:'29px', height:'26px'}, $x("//div[@class='balka2_ balka2_p1']/div[@id='cont04']")[0]);
            $q('en_build_info_panel').addEventListener('click', changeBuildPanelView(), false);
        }
    }

    if (_getValue('build_info_panel', false) && document.location.href.indexOf('town') != -1) {
        addBuildInfoPanel();
    }

    if ((document.location.href.indexOf('market') != -1 || document.location.href.indexOf('trade') != -1) && document.location.href.indexOf('adv') != -1 && document.location.href.indexOf('buy') != -1) {
        injectAdvTrade();
		$x("//table[contains(@class, 'trade_table')]")[0].addEventListener("DOMNodeInserted", onTradeTableNodeInserted, false);
    }

    applyHelpToBuildings();

    trainTimer(holder, train);
    var help_div = document.createElement('DIV');
    help_div.id = 'help_div';
    help_div.style.position = 'absolute';
    help_div.style.zIndex = 10000;
    help_div.style.border = '1px solid #333';
    help_div.style.backgroundColor = '#EEE';
    help_div.style.width = '190px';
    help_div.style.height = '180px';
    help_div.style.color = '#000';
    help_div.style.fontSize = '.8em';
    help_div.style.visibility = 'hidden';
    help_div.style.display = 'none';
    document.body.appendChild(help_div);
}


// common functions

//Применить цветовую раскраску к складу:
//фиолетовый - склад заполниться менее чем за 6 часов
//зеленый - склад опустеет более чем за 24 часа/склад заполняется
//оранжевый - склад опустеет менее чем через 24 часа но более чем за 12 часов
//бардовый - склад опустеет менее чем за 12 часов но более чем за 6 часов
//красный жирный - склад опустеет менее чем за 6 часов
//В диалоге постройки здания применить цвета к ресурсам, необходимым для постройки
//зеленый - ресурсов достаточно для постройки
//красный - ресурсов недостаточно для постройки
var arr = new Array();
function resourceColorer() {
    var lis = $x("//ul[@id='myres']/li");
    //Добавить информацию о максимальном количестве
    var capacity = null;
    for (var i in lis) {
        var cap = $x("./center/b/a/span[@id='storemax']", lis[i])[0];
        if (cap) {
            capacity = parseInt(cap.innerHTML);
            continue;
        }
        if (!capacity) continue;
        var i_nodes = $x("./i", lis[i]);
        if (i_nodes.length > 0 && i_nodes.length < 4) {
            i_nodes[1].parentNode.insertBefore($t("/"), i_nodes[1]);
            i_nodes[1].parentNode.insertBefore($e("i", capacity), i_nodes[1]);
        } else {
            i_nodes = $x("./img", lis[i]);
            if (i_nodes.length > 0) {
                i_nodes[0].parentNode.appendChild($t("/" + capacity));
            }
        }
    }
    for (var i in lis) {
        var imgs = $x("img", lis[i]);
        if (imgs.length == 0)
            continue;
        var resId = parseInt(imgs[0].className.substring(5, imgs[0].className.length));
        if (resId < 2)
            continue;
        var iss = $x("i", lis[i]);
        if (iss.length < 2) {
            var nodes = lis[i].childNodes;
            var txt = '';
            for (k in nodes) {
                if (nodes[k].nodeName == '#text') {
                    txt = txt + nodes[k].nodeValue;
                }
            }
            var art = txt.match(/(\d+)\/(\d+)/);
            if (art && art.length > 1)
                arr[resId] = parseInt(art[1]);
            else
                continue;
            imgs[0].title = imgs[0].title + ' - осталось места: ' + formatNumber(parseInt(art[2]) - parseInt(art[1]), 3);
            continue;
        }
        var nres = parseInt(iss[0].innerHTML);
        var nmax = parseInt(iss[1].innerHTML);
        imgs[0].title = imgs[0].title + ' - осталось места: ' + formatNumber(nmax - nres, 3);
        if (iss.length > 3) {
            var min = parseFloat(iss[2].innerHTML.substring(1));
            if (iss[2].innerHTML.indexOf('-') > -1) {
                if (min * 24 < nres) {
                    setColor(iss[0], iss[1], iss[2], 'green', nres / min);
                } else if (min * 12 < nres) {
                    setColor(iss[0], iss[1], iss[2], '#C27811', nres / min);
                } else if (min * 6 < nres) {
                    setColor(iss[0], iss[1], iss[2], '#A52A2A', nres/min);
		} else {
			setColor(iss[0], iss[1], iss[2], 'red', nres/min);
			applyBold(iss[0]);
			applyBold(iss[1]);
			applyBold(iss[2]);
		}
    } else if (iss[2].innerHTML.indexOf('+') > -1 ) {
		if (min * 6 + nres > nmax) {
			setColor(iss[0], iss[1], iss[2], '#5D0EDC', (nmax-nres)/min);
		} else
			setColor(iss[0], iss[1], iss[2], 'green', (nmax-nres)/min);
    }
    if (nres >= 100000) {
      applyBold(iss[0]);
    }
  }
   arr[resId] = nres;
 }


if (location.href.indexOf('build?pos=') > -1) {
  //раскрасить улучшение
  var fonts = $x("//div[@class='build_title']")
  for (var i in fonts)
	processNode(fonts[i], arr);
  //раскрасить перестройку
  fonts = $x("//div[@class='build_rebuild']/table/tbody/tr/td")
  for (var i in fonts)
	processNode(fonts[i], arr);
  //раскрасить список строительства
  var itms = $x("//div[@id='build_prc_cont']");
  for (var j in itms) {
	processNode(itms[j], arr);
  }

 }

 var nasI = $x("//div[@class='chcol2 chcol_p1']/div[@class='aC']/nobr/span");
 if (nasI && nasI.length > 0) {
   //расчитать время до макс. населения
   var nasCurr = parseFloat($x("./span", nasI[0])[0].innerHTML);
   var nasMax = parseFloat($x("./span", nasI[0])[1].innerHTML);
   var dt = $x("//div[@class='aC']/nobr")[1];
   var temp = parseFloat(dt.innerHTML.match(/(\d+.\d|\d+)/)[1]);
   var ttime = 0;
   if (temp > 0) {
     ttime = 24*(nasMax - nasCurr)/temp;
   }
   var clr = 'green';
   if (ttime < 0) {
     clr = 'red';
     ttime = -1*ttime;
   }
   var nobr = $e('nobr', null, null, null, $x("//div[@class='chcol2 chcol_p1']/div[@class='aC']")[0]);
   $e('span', '[' + Math.round(ttime*10)/10 + ']', null, {float: 'right', fontWeight: 'bold', color: clr}, nobr);

 }

}

 function applyBold(iss) {
		iss.style.fontWeight='bold';
 }

function processNode(node, arr) {
    var spans = $x("./span", node);
    for (var spi in spans) {
        var nd = spans[spi];
        var childs = nd.childNodes;
        var i = 0;
        while (i < childs.length) {
            var nod = childs[i];
            if (nod.nodeName == 'IMG') {
                var txt = nod.className.substring(5, nod.className.length)
                var colorSpan = document.createElement('SPAN');
                var val = parseInt(childs[i + 1].nodeValue);
                if (arr[parseInt(txt)] >= val)
                    colorSpan.style.color = 'green';
                else {
                    colorSpan.style.color = '#A52A2A';
                    nod.title = nod.title + ': Нехватает ' + formatNumber(val - arr[parseInt(txt)], 3);
                }
                colorSpan.style.fontWeight = 'bold';
                colorSpan.innerHTML = childs[i + 1].nodeValue;
                nd.removeChild(childs[i + 1]);
                nd.insertBefore(colorSpan, nod.nextSibling);
            }
            i++;
        }
    }
}

 function setColor(el, el1, el2, clr, ttime){
 		el.style.color = clr;
 		el1.style.color = clr;
 		el2.style.color = clr;
 		var nfo = document.createElement('span');
 		nfo.setAttribute('style', 'float:right;font-weight:bold; color:' + clr);
 		nfo.innerHTML = '[' + Math.round(ttime * 10) / 10 + ']';
 		el1.parentNode.appendChild(nfo);
 }

function applyTidToUri(tid, url, notUsePrefix) {
  var s = document.location.href;
  if (url)
    s = url;
  var pref = '&';
  if (notUsePrefix)
     pref = '';
  if (s.indexOf('tid=') == -1)
    return s+pref+'tid='+tid;
  else
    return s.replace(/tid\=\d+/, 'tid='+tid);
}

function formatNumber(num, digits) {
  var snum = new String(num);
  var ln = snum.length;
  var fmtNum = '';
  for (var i=ln-1; i>=0; i--) {
    fmtNum = snum.charAt(i) + fmtNum;
    if (i > 0 && (ln - i) % digits == 0) {
      fmtNum = '.' + fmtNum;
    }
  }
  return fmtNum;
}

function injectCityListInTrade(holder) {
    //reformat cities in trade list to new format
    var pTrade = $x("//select[@name='id']/option", null);
    for (var i in pTrade) {
        if (pTrade[i].value)
            pTrade[i].value = pTrade[i].value + '/0/0';
        else
            pTrade[i].value = '0/0/0';
    }
    var sTrade = $x("//select[@name='id']", null)[0];
    sTrade.options[sTrade.options.length] = new Option('-----------------', '0/0/0');
    for (var i in holder.townInfo) {
        var town = holder.townInfo[i];
        if (town.view == 2 || town.view == 4) {
            var coords = parseCityCoordinats(town.id);
            sTrade.options[sTrade.options.length] = new Option(town.name, coords[0]+'/'+coords[1]+'/'+coords[2]);
        }
    }
    sTrade.removeAttribute('onchange');
    sTrade.addEventListener('change', changeTradeCoord, false);
}

function parseCityCoordinats(id) {
    var inf = id.match(/(\d+)\/(\d+)\/(\d+)/);
    if (inf && inf.length > 3) {
        return [inf[1], inf[2], inf[3]];
    }
    inf = id.match(/(\d+)\/(\d+)/);
    if (inf && inf.length > 2) {
        return [0, inf[1], inf[2]];
    }
}

function injectTPCities() {
    var tplinks = $x("//div[@class='tradeway_3_sh']/div/table[@class='def_table_cw']/tbody/tr/td/a[contains(@href, 'towninfo?id=')]");
    if (tplinks.length > 0) {
        var sel = $x("//select[@name='id']")[0];
        $e('OPTION', '------ТП------', {disabled:true, name: 'id', value: '0'}, null, sel);
        for (var i in tplinks) {
            var id = parseInt(tplinks[i].href.match(/id=(\d+)/)[1]);
            $e('OPTION', tplinks[i].innerHTML, {name: 'id', value:id},null, sel);
        }
    }
}

function injectArmySpeed() {
    var armyTd = $x("//table[@id='armyetable']/tbody/tr/td");
    for (var i in armyTd) {
        var id = parseInt($x("./a", armyTd[i])[0].href.match(/id=(\d+)/)[1]);
        $e('TD', '<img class="icnu ic8" src="/p/_.gif" title="Скорость">' + unitSpeedHolder[id], null, null, armyTd[i].parentNode);
    }
}

function injectCities(pTrade, container, holder) {
    var txt = '<select id="injCities" name="id" ><option value="0/0/0"></option>';
	for (var ci in holder.cities.list) {
		var c = holder.cities.list[ci];
		txt +='<option value="' + c.id + '/0/0">'+ c.name + '</option>';
	}
	txt +='</select>';
	$e(container, txt, null, null, pTrade[0]);
	document.getElementById('injCities').addEventListener('change', changeTradeCoord, false);

}

function changeTradeCoord() {
        var inf = parseCityCoordinats($x("//select[@name='id']", null)[0].value);
        if (!inf) inf = document.getElementById('injCities').value;
		var xCoord = $x("//input[@type='text' and @name='x']")[0];
		var yCoord = $x("//input[@type='text' and @name='y']")[0];
		var oCoord = $x("//input[@type='text' and @name='o']")[0];
		xCoord.value=inf[1];
		yCoord.value=inf[2];
		oCoord.value=inf[0];
}

function getTownView(id, holder) {
  var view = 0;
  if ('view' in holder.townInfo[id])
    view = holder.townInfo[id].view;
  var result = { caption: '?', hint: '' };
  switch (view) {
    case 0:
    default:
      result.caption = '-';
      result.hint = 'не показано';
      break;
    case 1:
      result.caption = 'М<img src="'+imageList[3+view]+'" />';
      result.hint = 'мой город';
      break;
    case 2:
      result.caption = 'С<img src="'+imageList[3+view]+'" />';
      result.hint = 'участник страны';
      break;
    case 3:
      result.caption = 'К<img src="'+imageList[3+view]+'" />';
      result.hint = 'кормушка';
      break;
    case 4:
      result.caption = 'Д<img src="'+imageList[3+view]+'" />';
      result.hint = 'друг';
      break;
    case 5:
      result.caption = 'В<img src="'+imageList[3+view]+'" />';
      result.hint = 'враг';
      break;
  }
  return result;
}

function onShowMap(id, cityPanel){
  return function(){
  	try {
		cityPanel.action();
		var inf = parseCityCoordinats(id);
		location.href = 'http://' + currentHost + '/map?o=' + inf[0] + '&x=' + inf[1] + '&y=' + inf[2];
	} catch (e) {
		_log(e);
	}
  }
}

function onShowTown(id, cityPanel){
  return function(){
    cityPanel.action();
	var inf = parseCityCoordinats(id);
	location.href = 'http://' + currentHost + '/mapinfo?o=' + inf[0] + '&x=' + inf[1] + '&y=' + inf[2];
  }
}

function onShowPlayer(id, cityPanel){
  return function(){
    cityPanel.action();
    location.href = 'http://' + currentHost + '/account?id=' + id;
  }
}

function onDelTown(id, holder){
  return function(){
    // удаляем элемент
    delete holder.townInfo[id];
    holder.saveTownInfo();
    holder.updateTownPanel();
  }
}

function onChangeViewTown(id, holder) {
  return function(){
    // меняем видимость
    var view = 0;
    if ('view' in holder.townInfo[id])
      view = holder.townInfo[id].view;
    view++;
    if (view > 5)
      view = 0;
    holder.townInfo[id].view = view;

    holder.saveTownInfo();
    holder.updateTownPanel();
  }
}

function onDelPop(id, item, holder){
	return function(){
    	// удаляем элемент
    	holder.townInfo[id].pop.splice(item, 1);
    	holder.saveTownInfo();
    	holder.updateTownPanel();
  	}
}

function getArrayCount(arr) {
  var result = 0;
  for (var i in arr)
      result++;
  return result;
}

function injectTradeOps(holder) {


  	//
    // считаем торговцев свободных и всего
    var trdcnt = -1;
    var trdcntof = -1;
    var onMrk = 0;
    trdcnt = parseInt($x("//a[@title='Доступно']/span[@id='inpb']")[0].innerHTML);
    trdcntof = parseInt($x("//a[@title='Всего']")[0].innerHTML);
  	holder.cities.list[holder.cities.current].traders={free: trdcnt/250, market: onMrk, total: trdcntof/250};
  	_setValue('cities', _serialize(holder.cities));

    var tradeContainer = new TradeContainer(trdcnt);
    tradeContainer.init();
}


//К форме тренировки войск добавляется количество юнитов, которое можно создать в течении суток
// напр. Требушет  [Пища] 100 [Древесина] 600 [Металл] 100 [Житель] 5  5:47:13(4.1)
function trameTimeCalculate() {
	var armyTd = $x("//form[@action='train']/div/div/table/tbody/tr/td[@class='utm']/span");
 	for (var i in armyTd) {
    	var txt = armyTd[i].innerHTML;
        var radio_id = $x("./td[@class='urd']/input", armyTd[i].parentNode.parentNode)[0].getAttribute('id');
        var input_id = $x("./div[@class='tunit_btns']/div[@class='cnt']/input", armyTd[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode)[0].getAttribute('id');
       	armyTd[i].innerHTML = txt + "<a href=\"javascript:void(0)\" id=\"setup_" + i + "\">[" + calcTime(txt) + "]</a>";
        document.getElementById('setup_' + i).addEventListener('click', setTraneCount(radio_id, input_id, Math.round(calcTime(txt)), false));
 	}
}

function setTraneCount(radio_id, input_id, count) {
    return function() {
        $q(radio_id).checked = true;
        $q(input_id).value = count;


        var evObj = document.createEvent('UIEvents');
        evObj.initUIEvent( 'keyup', true, true, window, 1 );
        evObj.keyCode = 13;
        $q(input_id).dispatchEvent(evObj);
    }
}

function calcTime(str) {
	var tm = str.split(':');
  	var tm1 = tm[1];
  	if (tm1.indexOf('0') == 0) {
    	tm1 = tm1.substring(1,tm1.length);
  	}
  	var tt = parseInt(tm[0])*60*60 + parseInt(tm1)*60 + parseInt(tm[2]);
  	return Math.round(24*60*60/tt*10)/10;
}

function collectTrainInfo(holder, panel) {

	if (!holder.cities.list[holder.cities.current].train)
	  	holder.cities.list[holder.cities.current].train = {};

	if (document.location.href.indexOf('build?pos=') != -1) {
		var tr = $x("//div[@class='tunit_cont']/form[contains(@action, 'train')]");
		var buildDiv =  $x("//div[@class='build_train']/div[@class='desc']");
        if (tr.length == 0 && buildDiv.length == 0)
			return;

        var trInfo = {};
        var bpos = parseInt(document.location.href.match(/pos=(\d+)/)[1]);
        var info = $x("//div[@id='cont04']/div[@class='pagetitle']/div");
        var txt = info[0].innerHTML;
        var nfo = txt.match(/<a .*>(.*)<\/a> - (\d+)/);
        trInfo.building = nfo[1];
        trInfo.level = parseInt(nfo[2]);
        if (tr.length > 0) {
            // Присутвует форма тренировки - здание свободно
            trInfo.unitId = -1;
            trInfo.unitCount = 0;
            trInfo.timeEnd = 0;
        } else {
			if (buildDiv.length > 0) {
				// идет производство войск
				var hr = $x("a[contains(@href,'unitinfo?id=')]", buildDiv[0])[0].href;
				trInfo.unitId = parseInt(hr.match(/id=(\d+)/)[1]);
				trInfo.unitCount = parseInt(buildDiv[0].innerHTML.match(/Готово:\s*(\d+)\s*из\s*(\d+)/)[2]);
				var s = $x("span/span[contains(@id, 'timer')]", buildDiv[0]);
                var found = null;
                if (s.length > 0) {
                    s = s[0].innerHTML;
                    found = s.match(/(\d+)\:(\d+)\:(\d+)/);
                } else {
                    s = $x("./span[@class='td']", buildDiv[0])[0].innerHTML;
                    var days = s.match(/(\d+).(\d+) дн./);
                    var minutes = (parseInt(days[1]) + parseInt(days[2])/10) * 24 * 60 * 60;
                    found = ['0', '0', '00', '' + Math.round(minutes)] ;
                }
				var found2 = found[2];
				if (found2.indexOf('0') == 0) {
					found2 = found2.substring(1,found2.length);
				}
				trInfo.timeEnd = new Date().getTime() + (parseInt(found[1])*60*60 + parseInt(found2)*60 + parseInt(found[3]))*1000;
            }
		}
        holder.cities.list[holder.cities.current].train[bpos] = trInfo;
		_setValue('cities', _serialize(holder.cities));
		panel.renderContent(holder);
	} else {

	var trExists = $x("//div[@id='cont04']/div[@class='pagecont3']/span/div[@class='build_train']");
	if (trExists.length ==0)
	  return;
	var trainDiv = $x("//div[@id='cont04']/div[@class='pagecont3']");
    var trNodes = trainDiv[0].childNodes;
	var trCnt = -1;
	for (var i in trNodes) {
	    var trInfo = null;
	    try {
			if (trNodes[i].nodeName == 'P') {
				//Получаем информацию о военном строении и его уровне
				var descr = $x(".//a[contains(@href,'build?pos=')]/span", trNodes[i]);
				if (descr.length == 0)
					continue;
				trInfo = {};
				trInfo.building = descr[0].innerHTML;

				var hr = $x(".//a[contains(@href,'build?pos=')]", trNodes[i])[0].href;
				trCnt = parseInt(hr.match(/pos=(\d+)/)[1]);

				var s = trNodes[i].lastChild.lastChild.nodeValue;
				trInfo.level = parseInt(s.match(/\d+/)[0]);
				trInfo.unitId = -1;
				holder.cities.list[holder.cities.current].train[trCnt] = trInfo;
			}
			if (trNodes[i].nodeName == 'SPAN') {
				//Получаем информацию о строящихся войсках
				var trInfo = holder.cities.list[holder.cities.current].train[trCnt];
				var buildDiv =  $x(".//div/div[@class='desc']", trNodes[i]);
				if (buildDiv.length > 0) {
					//	идет производство войск
					var hr = $x(".//a[contains(@href,'unitinfo?id=')]", buildDiv[0])[0].href;
					trInfo.unitId = parseInt(hr.match(/id=(\d+)/)[1]);
					trInfo.unitCount = parseInt(buildDiv[0].innerHTML.match(/Готово: (\d+)\s*из\s*(\d+)/)[2]);
					var s = $x(".//span/span[contains(@id, 'timer')]", buildDiv[0])[0].innerHTML;
					var found = s.match(/(\d+)\:(\d+)\:(\d+)/);
					trInfo.timeEnd = new Date().getTime() + (parseInt(found[1])*60*60 + parseInt(found[2])*60 + parseInt(found[3]))*1000;
					holder.cities.list[holder.cities.current].train[trCnt] = trInfo;
				}
			}
	    } catch (except) {
			_log(except);
	    }

	    if (trInfo && trCnt >-1)
			holder.cities.list[holder.cities.current].train[trCnt] = trInfo;
	}
	_setValue('cities', _serialize(holder.cities));
    }
}

function onRemoveTrainBox(ci, i, holder, panel){
  return function(){
    if (confirm("Вы точно хотите удалить строение из списка?")) {
    	delete holder.cities.list[ci].train[i];
      	_setValue('cities', _serialize(holder.cities));
		panel.renderContent(holder);
    }
  }
}

function trainTimer(holder, panel) {
	for (var ci in holder.cities.list) {
		var trInfoArr = holder.cities.list[ci].train;
		for (var i in trInfoArr) {
			if (trInfoArr[i] && trInfoArr[i].timeEnd) {
				if (trInfoArr[i].timeEnd - new Date().getTime() <=0) {
					document.getElementById("tr_" + ci + "_" + i).innerHTML = 'постройка окончена';
					//Ахтунг, здание простаивает!!! А игрок не в курсе!
					$q(panel.title.id).style.backgroundColor = panel.title.alertBackground;
				} else {
					document.getElementById("tr_" + ci + "_" + i).innerHTML =  new Date(trInfoArr[i].timeEnd - new Date().getTime()).formatTime();
				}
			}
		}
	}
	var visible = _getValue(panel.content.visibleKey, panel.content.visible);
	if (visible)
		for (var ci in holder.cities.list) {
			var trInfoArr = holder.cities.list[ci].tradeOperation;
			for (var i in trInfoArr) {
				if (trInfoArr[i] && trInfoArr[i].time) {
					if (trInfoArr[i].time - new Date().getTime() <=0) {
						document.getElementById("op_" + ci + "_" + i).innerHTML = 'просрочено';
					} else {
						document.getElementById("op_" + ci + "_" + i).innerHTML =  new Date(trInfoArr[i].time - new Date().getTime()).formatTime();
					}
				}
			}
		}
		setTimeout(function(){
			trainTimer(holder, panel)
		}, 1000);
}

var nas = 0;
var cr = 0;
var pp = 0;
function injectEconomicCalc(holder) {

	var infoDivs = $x("//div[@id='econstats']/table/tbody/tr/td");
	var pNode = infoDivs[0].lastChild;
	var eNode = infoDivs[2];
	var cNode = infoDivs[4];

	nas = parseInt(pNode.nodeValue);
	infoDivs[0].replaceChild($e('SPAN', nas, {id: 'info_div_0_value'}), pNode);

	pp = eNode.innerHTML.match(/(\d+)/)[1];
	cr = cNode.innerHTML.match(/(\d+)/)[1];

	eNode.replaceChild($t('Потенциал: '), eNode.firstChild);
	eNode.insertBefore($e('SPAN', pp, {id: 'info_div_1_value'}), eNode.lastChild);
	eNode.insertBefore($t(' '), eNode.lastChild);

	cNode.replaceChild($t('Коррупция: '), cNode.firstChild);
	cNode.insertBefore($e('SPAN', cr, {id: 'info_div_2_value'}), cNode.lastChild);
	cNode.insertBefore($t('% '), cNode.lastChild);

	var trElement = $x("//div[@id='econstats']/table/tbody");
	var changeNode = $e('TD', null, {colspan : 7}, {color: '#000000'}, $e('TR', null, null, null, trElement[0]));

	var content = [];
	content.push('Население: ');
	content.push('<a href="javascript: void(0)" id="info_div_0_add_10" >+10</a>');
	content.push('/<a href="javascript: void(0)" id="info_div_0_rm_10" >-10</a>   ');
	content.push('<a href="javascript: void(0)" id="info_div_0_add_100" >+100</a>');
	content.push('/<a href="javascript: void(0)" id="info_div_0_rm_100" >-100</a>  ');
	content.push('<a href="javascript: void(0)" id="info_div_0_add_1000" >+1K</a>');
	content.push('/<a href="javascript: void(0)" id="info_div_0_rm_1000" >-1K</a>');
	content.push('  Уровень суда: ');
	var lvls = [1,1.3,1.7,2.1,2.6,3.1,3.6,4.1,4.6,5.2,5.8,6.3,6.9,7.5,8.1,8.7,9.4,10,10.6,11.3,11.9];
	content.push('<select id="info_sel_change">');
	for (var i in lvls) {
		content.push('<option value="');
		content.push(lvls[i]);
		content.push('">Суд ');
		content.push(i);
		content.push('</option>');
	}
	content.push('</select>');

	changeNode.innerHTML = content.join('');

  $q('info_sel_change').addEventListener('change', onRecalcCorrupt(holder), false);

  $q('info_div_0_add_10').addEventListener('click', onRecalcNas(10), false);
  $q('info_div_0_rm_10').addEventListener('click', onRecalcNas(-10), false);
  $q('info_div_0_add_100').addEventListener('click', onRecalcNas(100), false);
  $q('info_div_0_rm_100').addEventListener('click', onRecalcNas(-100), false);
  $q('info_div_0_add_1000').addEventListener('click', onRecalcNas(1000), false);
  $q('info_div_0_rm_1000').addEventListener('click', onRecalcNas(-1000), false);

}


function onRecalcCorrupt(holder){
  return function(){
    var effect = $q('info_sel_change').value;

    var corr = -20;
    for (var c in holder.cities.list) {
      corr+=20;
    }
    cr = corr/effect;
    if (cr > 90)
      cr = 90;
    $q("info_div_2_value").innerHTML = Math.round(cr);
    recalcEconomic();
  }
}

function onRecalcNas(val){
  return function(){
    if (nas + val < 0)
      return;
    nas = nas + val;
    pp = Math.pow(nas, 0.85) + 10;
    $q("info_div_0_value").innerHTML = nas;
    $q("info_div_1_value").innerHTML = Math.round(pp);

    recalcEconomic();
  }
}


function recalcEconomic() {
  var datas = $x("//div[@id='epro']/table[@id='tbprod']/tbody/tr");
  for (var i in datas) {
      var cur_value = 0;
      var next = false;
      var tds = $x("td", datas[i]);
      for (var j in tds) {
		if (tds[j].getAttribute('class') != 'tc') {
			if (next) {
				var foundBonus = tds[j].innerHTML.match(/(\d+)\+(\d+)/);
				tds[j].innerHTML = Math.round(cur_value);
				if (foundBonus) {
					tds[j].innerHTML = tds[j].innerHTML + '+' + foundBonus[2];
				}
				continue;
			}
			if (tds[j].innerHTML.indexOf('=') > -1) {
				next = true;
				continue;
			}
			var ext_found = tds[j].innerHTML.match(/(\d+) \* (\d+)\%( \* (\d+)%)?/);
			if (ext_found) {
				cur_value += pp * (100 - cr) / 100;
				cur_value = cur_value * parseInt(ext_found[2]) / 100;
				if (ext_found[3] && ext_found[4]) {
					cur_value = cur_value * parseInt(ext_found[4]) / 100;
				}
				continue;
			}
			var found = tds[j].innerHTML.match(/(\d+)/);
			if (found) {
				var value = found[1];
				if (tds[j].innerHTML.indexOf('%') > -1) {
					cur_value = cur_value * parseInt(value) / 100;
				} else  {
					cur_value += pp *(100 - cr) / 100;
				}
			}
		}
      }
      next = false;
  }
}
function changeBuildPanelView() {
    return function() {
        _setValue('build_info_panel', !_getValue('build_info_panel'));
        window.location.reload();
    }
}

function buildingInfo() {
	return function() {
		var total = 0;
		var buildings = $x("//div[contains(@style, 'width:auto;height:auto')]/a[contains(@href, 'build?pos=')]");
		
		var line = "";
		for (var i=0; i<buildings.length;i++) {
            try {
			var href = $x("./img", buildings[i])[0].src;		
            var bTitle = $x("./img", buildings[i])[0].title;
			var id = parseInt(href.match(/\/p\/(?:g\/)?b\/(\d+)_/)[1]);
			var pos_id = parseInt(buildings[i].href.match(/pos=(\d+)/)[1]);
			var title = bTitle.match(/уровень\s*(\d+)/);
			if (pos_id <= 1) continue;
            line += bTitle + ' - ';
            var cc = 0;
			if (title && title.length > 0) {
				var level = parseInt(title[1]);
				for (var j = 1; j<=level; j++) {
					var cost = buildInfoHolder[id][j].cost;
					for (var k in cost) {
						total += cost[k];
                        cc += cost[k];
					}
				}
			}
            line += cc;
            line += '\n';
            } catch (e) {}
		}
		alert('Прочность города: ' + total + '\n' + line);
	}
}

function applyHelpToBuildings() {

    //looking for script injected panel
    var buildings = $x("//div[@class='pmaincont']/a[contains(@href, 'build?pos=') and contains(@style, '/bg')]", null);
    //not found? looking for native panel
    if (buildings.length == 0) {
        if ($x("//div[@class='pmaincont']/a[contains(@href, 'build?pos=')]/div[@class='pmaintg']").length > 0) {
            buildings = $x("//div[@class='pmaincont']/a[contains(@href, 'build?pos=')]");
        }
    }

    for (var i in buildings) {
        buildings[i].addEventListener("mouseover", showTooltip(buildings[i]), false);
        buildings[i].addEventListener("mouseout", hideTooltip, false);

        //buildings[i].addEventListener('mousedown', showHelp(buildings[i].href), false);
    }
}

function showHelpMess(bld) {
    return function() {
        _log(bld);
    }
}

function showTooltip(link) {
    return function() {
        var tt = $q('help_div');
        var href = $x('./img',link);
        if (href.length > 0) {
            href = href[0].src;
        } else {
            href = link.style.backgroundImage;
        }

	    var id = parseInt(href.match(/\/p(\/g)?\/b\/(\d+)_/)[2]);
		var title = link.title.match(/уровень\s*(\d+)/);
        var level = parseInt(title[1]);

        var text = link.title + '<hr><b>Сл. уровень.</b><BR>';
        if (level >=20) {
            text += '<b>Максимальный уровень</b>';
        } else {
            var cost = buildInfoHolder[id][level + 1].cost;
		    for (var k in cost) {
                var  st = '';
                if (arr[k] >= cost[k])
 					st = 'green';
 				else
 					st = '#A52A2A';
                text += '<nobr><span style="color: ' + st + '"><img class="res r' + k + '" src="/p/_.gif">'+ cost[k] + '</span></nobr> ';
		    }
            text += '<nobr><span><img src="/p/_.gif" class="stimer"> ' + buildInfoHolder[id][level + 1].time + '</span></nobr>';

        }
        text += '<hr><b>Тек. эффект/стоимость/спад</b><br>';
        text += buildInfoHolder[id][level].effect + '&nbsp;/&nbsp;<img class="res r1" src="/p/_.gif" >' + buildInfoHolder[id][level].price + '&nbsp;/&nbsp;' + buildInfoHolder[id][level].spad;
        if (level < 20) {
            text += '<hr><b>+1 ур. эффект/стоимость/спад</b><br>';
            text += buildInfoHolder[id][level + 1].effect + '&nbsp;/&nbsp;<img class="res r1" src="/p/_.gif" >' + buildInfoHolder[id][level + 1].price + '&nbsp;/&nbsp;' + buildInfoHolder[id][level + 1].spad;
        }
        tt.innerHTML = '<div>' + text + '</div>';

        tt.style.left = _getX(link) + 'px';
        tt.style.top = _getY(link) - 180 + 'px';
        tt.style.visibility = 'visible';
        tt.style.display = '';
    }
}

function hideTooltip() {
    $q('help_div').style.visibility = 'hidden';
}

function _getX(e){
    var x = 0;
    while (e) {
        x += e.offsetLeft;
        e = e.offsetParent;
    }
    return x;
}

function _getY(e){
    var y = 0;
    while (e) {
        y += e.offsetTop;
        e = e.offsetParent;
    }
    return y;
}

// end common functions

function parseBuildingInfo() {
	var datas = $x("//table[@class='def_table']/tbody/tr");
	var id = document.location.href.match(/id=(\d+)/)[1];
	var infoLine = id + ':{';
	for (var i in datas) {
		var children = datas[i].childNodes;
		var time = children[0].childNodes[0].getAttribute("title");
		var lvl = parseInt(children[0].childNodes[1].nodeValue);
		
		var cost = $x("./nobr", children[1]);
		var costClass = '';
		for (var j in cost) {
			var className = cost[j].childNodes[0].getAttribute("class");
			var resType = className.match(/res r(\d+)/)[1];
			var resCount = cost[j].childNodes[1].nodeValue;
			costClass += resType + ':' + resCount;
			if (j < cost.length - 1)
				costClass +=', '; 
		}
		
		var price = 0;
		if (children[2].childNodes.length > 0) {
			price = parseInt(children[2].childNodes[1].nodeValue);
		}
		var effect = children[3].innerHTML;
		var spad = 0;
		if (children[4].innerHTML.length > 0) {
			spad = parseFloat(children[4].innerHTML);
		}
		
		infoLine += lvl + ': {time:\\\'' + time + '\\\', cost:{' + costClass +'}, price:' + price + ', effect:\\\'' + effect + '\\\', spad:' + spad + '}';
		if (i < datas.length - 1)
				infoLine +=', '; 
	}
	infoLine +='}';
	_log(infoLine);
}

function addBuildInfoPanel() {


    var text = '<div class="pmaincont">';
    var blds = $x("//div[@id='cont04']/div[@class='tmain']/div[contains(@style, 'width:auto')]");
    var c_url = null;
    var c_title = null;
    var c_lvl = null;
    var textAreas = [];
    var merr_img = null;
    for (var i in blds) {
        if (i == 0) {
            try {
            var img = $x("./a/img", blds[i])[0];
            c_url = img.src;
            c_title = img.title;
            try {c_lvl = $x("./a/div/div",blds[i])[0].className; } catch (e) {};
            var group = img.src.match(/.*p\/(?:g\/)?b\/(\d+)_(.*)_.*/);
            if (group) {
            var lvlId = buildLevelMap[parseInt(group[1])];
            if (!lvlId && lvlId !=0) {
                merr_img = '<img width="45" height="46" src="' + img.src + '" />';
                if (group[2].indexOf("b") !=-1) lvlId =  group[2].substring(0, group[2].length -1); else lvlId= group[2];
            }
            c_url = '&quot;/p/b/bg/ss0.png&quot;';
            } else {
                c_url = '&quot;/p/b/sw.gif&quot;';
            }
            } catch (e) {_log(e)}
            continue;
        }
        var href = $x("./a",blds[i])[0].href;
        var img = $x("./a/img", blds[i])[0];
        var lvlClass = null;
        var group = img.src.match(/.*p\/(?:g\/)?b\/(\d+)_(.*)_.*/);
        var style =  '/p/b/s0/sm.png';
        if (group) {
            style = img.src;
        } else {
            group = img.src.match(/.*p\/(?:g\/)?b\/s(\d+)\/(.*).png/);
            if (group && group[2].indexOf('a') == -1) style = '/p/b/s' + group[1] + '/s.png';
        }
        try {lvlClass = $x("./a/div/div",blds[i])[0].className; } catch (e) {};

        var area_index = parseInt(href.match(/pos=(\d+)/)[1]);
        var area_text = '<a href="' + href + '" style="background: url(/p/b/bg/ss0.png)" title="' + img.title + '">'
         + '<img width="45" height="46" src="' + style + '" />';
        if (lvlClass && group[2].indexOf("b") != -1 && group[2].length > 1)  {
            area_text +='<div class="pmaintb"><div class="' + lvlClass + '"></div></div>'
        } else if (lvlClass && lvlClass.indexOf('mnnd') != -1) {
            area_text +='<div class="pmaintd"><div class="' + lvlClass + '"></div></div>';
        } else if (lvlClass) {
            area_text +='<div class="pmaint"><div class="' + lvlClass + '"></div></div>';
        }
        area_text += '</a>';
        textAreas[area_index] = area_text;
    }
    for (var i = 1; i<19; i++) {
        if (textAreas[i]) {
            text += textAreas[i];
        } else {
            text += '<a href="/build/pos=' + i + '" style="background: url(/p/b/bg/ss0.png)" >'
         + '<img width="45" height="46" src="/p/b/s0/sm.png" />'
        }
    }


    try {
    text += '<a href="build?pos=0" style="left:-95px; top:-70px; poisition:absolute; z-index:1000; background: url('
     + c_url + ')" title="' + c_title + '">';
        if (merr_img) text += merr_img;
    if (c_lvl) {
        text += '<div class="lalala-pmaint"><div class="' + c_lvl + '"></div></div>';
    } } catch (e) {_log(e)};
    text += '</a>'
    text += '</div>';
    var div = $e('DIV', text, {class : 'pmain'}, {display: 'block'});
    var table = $x("//div[@id='cont04']/div[@class='tmain']")[0];
    table.parentNode.appendChild(div);
}

function calcDistance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

function onMapDivNodeInserted() {
	if (injectMapDivProcessing)
		return;
	parseMapPage();
}

function switchMapHelp() {
    mapHelpEnabled = !mapHelpEnabled;
    document.getElementById('inf_tt_ico').setAttribute('class', !mapHelpEnabled ? 'a_osn_yes' : 'a_pos_no');
    var allPlayerCitiesHolder = _deserialize(_getValue("all_player_cities_holder", '{}'));
    var cities = _deserialize(_getValue('cities', '{ current: null, list: [] }'));
    var baseCoords = allPlayerCitiesHolder[cities.list[cities.current].id];
    if (baseCoords) {
        var landLinks = $x("//div[@id='landlnks']/a");
        for (var i in landLinks) {
            var coords = landLinks[i].href.match(/x=(\d+)&y=(\d+)/);
            var range = calcDistance(baseCoords.x, baseCoords.y, parseInt(coords[1]), parseInt(coords[2]));
            applyMapOpacity(landLinks[i], range, mapHelpEnabled);
        }
    }
}

function applyMapOpacity(link, range, enabled) {
    if (enabled) {
        link.style.opacity = 0.4;
        link.style.backgroundColor = range > 25 ? '#e83838' : '#0ce70c';
    } else {
        link.style.opacity = null;
        link.style.backgroundColor = null;
    }
}

var mapHelpEnabled = false;
var injectMapDivProcessing = false;
function parseMapPage() {
    injectMapDivProcessing = true;
    var allPlayerCitiesHolder = _deserialize(_getValue("all_player_cities_holder", '{}'));
    var cities = _deserialize(_getValue('cities', '{ current: null, list: [] }'));
    var baseCoords = allPlayerCitiesHolder[cities.list[cities.current].id];
    if (baseCoords) {
    var landLinks = $x("//div[@id='landlnks']/a");
    for (var i in landLinks) {
         if (landLinks[i].getAttribute('ws_processed') == 'true')
            continue;
         var coords = landLinks[i].href.match(/x=(\d+)&y=(\d+)/);
         var range = calcDistance(baseCoords.x, baseCoords.y, parseInt(coords[1]), parseInt(coords[2]));
         landLinks[i].setAttribute('tooltip', 'Расстояние: ' + roundNumber(range, 3) + '. ' + landLinks[i].getAttribute('tooltip'));
         if (mapHelpEnabled) {
             applyMapOpacity(landLinks[i], range, true);
         }
         landLinks[i].setAttribute('ws_processed', 'true');

    }
    }
    injectMapDivProcessing = false;
}

function parseCityListPage() {

    //определяем персональную страницу игрока
    var pname = $x("//div[@class='ptitle2_ ptitle2_p1']/h2")[0].innerHTML.match(/[^\s]*? (.*)/)[1];
    var infoTr = $x("//div[@id='tb_town']/div[@class='town_row tB']");
    if (pname == playerName) {
        var allPlayerCitiesHolder = {};
        for (var i in infoTr) {
            var centroid = $x("./div[@class='conbut2']/div[@class='M_bt M_bt_cent fR']/a", infoTr[i])[0];
            var coords = centroid.href.match(/x=(\d+)&y=(\d+)/);
            var id = infoTr[i].getAttribute("onclick").match(/id=(\d+)/)[1];
            allPlayerCitiesHolder[id] = {x: parseInt(coords[1]), y: parseInt(coords[2])};
        }
        _setValue("all_player_cities_holder", _serialize(allPlayerCitiesHolder));
        _log(allPlayerCitiesHolder);
    }
    var allPlayerCitiesHolder = _deserialize(_getValue("all_player_cities_holder", '{}'));
    var cities = _deserialize(_getValue('cities', '{ current: null, list: [] }'));
    var baseCoords = allPlayerCitiesHolder[cities.list[cities.current].id];
    for (var i in infoTr) {
            var centroid = $x("./div[@class='conbut2']/div[@class='M_bt M_bt_cent fR']/a", infoTr[i])[0];
            var coords = centroid.href.match(/x=(\d+)&y=(\d+)/);
            if (coords.length > 2) {
                var divInfoHolder = $x("./div[@class='t_n_cont']/div[@class='t_dist fR']", infoTr[i])[0];
                var range = calcDistance(baseCoords.x, baseCoords.y, parseInt(coords[1]), parseInt(coords[2]));
                if (divInfoHolder.innerHTML == '')
                divInfoHolder.appendChild($t('Расстояние: ' + roundNumber(range, 3)));
            }
    }


    
    var infoTr = $x("//div[@id='tb_town']/div[@class='town_row tB']");
    var pname = $x("//div[@class='ptitle2_ ptitle2_p1']/h2")[0].innerHTML.match(/[^\s]*? (.*)/)[1];
    var plId = document.location.href.match(/id=(\d+)/)[1];
    var allPlayersHolder = _deserialize(_getValue("all_players_holder", '{data: []}'));
    var cityInfoList = [];
    for (var i in infoTr) {
        var cityInfo = {};
        cityInfoList[i] = cityInfo;

        var cview = $x("./div", $x("./div", infoTr[i])[1]);
        if (cview.length > 1) {
            cityInfo.mestorod = cview[1].title;
        }

        if (!cityInfo.mestorod) {
            cityInfo.mestorod = 'нет';
        }
        var ct = $x("./div", infoTr[i])[3];
        cityInfo.link = $x("./div/a", ct)[0].href;
        cityInfo.name = $x("./div/a", ct)[0].innerHTML;
        cityInfo.nas = $x("./div", ct)[1].lastChild.nodeValue;

        var rast = $x('./nobr', $x("./div", ct)[2])[0];
        cityInfo.rast = rast.childNodes[0].nodeValue.match(/(\d+.\d)/)[1];
        cityInfo.put = rast.childNodes[1].innerHTML;
    }
    var divNfo = $e('DIV');
    $x("//div[@id='tb_town']")[0].appendChild(divNfo);
    var lastData = allPlayersHolder.data[plId];
    divNfo.appendChild($e('DIV', 'Последнее обновление: ' + (lastData ? lastData.date : 'никогда'), {id: 'last_data_info_div'}));
    divNfo.appendChild($e('A', 'Добавить/Обновить', {id: 'last_data_info_href',  href: 'javascript:void(0)'}));
    $x("//div[@id='tb_town']")[0].appendChild($e('A', 'Показать таблицу', {id: 'show_table_link', href: 'javascript:void(0)'}));
    $q('show_table_link').addEventListener('click', showCityInfoList(allPlayersHolder), false);
    $q('last_data_info_href').addEventListener('click', addToCityInfoList(cityInfoList, plId, pname, allPlayersHolder), false);
    _log(cityInfoList);
    
}
function addToCityInfoList(cityInfoList, plId, pname, allPlayersHolder) {
    return function() {
        allPlayersHolder.data[plId] = {};
        allPlayersHolder.data[plId].date = new Date();
        allPlayersHolder.data[plId].player = pname;
        allPlayersHolder.data[plId].data = cityInfoList;
        $q('last_data_info_div').innerHTML = 'Последнее обновление: ' + allPlayersHolder.data[plId].date;
        _setValue("all_players_holder", _serialize(allPlayersHolder));
    }
}
function showCityInfoList(allPlayersHolder) {
    return function() {
        var text = '<div align="right"><a id="city_list_div_close" href="javascript:void(0);">Закрыть</a></div><table border="5px" style="color:black;"><tr><td>Игрок</td><td>id</td><td>Обновление</td></tr>';
        var textarea = 'Игрок\tID\tГород\tСсылка\tМесторождение\tНаселение\tРасстояние\tПуть\n';
        for (var i in allPlayersHolder.data) {
            if (!allPlayersHolder.data[i])
                continue;
            text += '<tr><td>' + allPlayersHolder.data[i].player +
                    '</td><td>' + i +
                    '</td><td>' + allPlayersHolder.data[i].date +
                    '</td></tr>';

            for (var j in allPlayersHolder.data[i].data) {
                var cityInfo = allPlayersHolder.data[i].data[j];
                textarea += allPlayersHolder.data[i].player + '\t'
                         + i + '\t' + cityInfo.name + '\t' + cityInfo.link + '\t'
                         + cityInfo.mestorod + '\t' + cityInfo.nas + '\t'
                         + cityInfo.rast + '\t' + cityInfo.put + '\n';
            }

        }
        text += '</table><textarea rows="10" cols="25">';
        text += textarea;
        text += '</textarea>';
        var tt = $e('DIV', text, {id: 'city_list_div', class: 'pane'}, {zIndex: 4000, left: '0px', top:'0px', backgroundColor: '#FF6'}, document.body);
        var table = $x("//div[@id='tb_town']")[0];
        tt.style.left = _getX(table) + 'px';
        tt.style.top = _getY(table) + 'px';
        document.getElementById('city_list_div_close').addEventListener('click', closeCityInfoList, false);
    }
}

function closeCityInfoList() {
    document.body.removeChild($q('city_list_div'));
}
function onTradeTableNodeInserted() {
	if (injectAdvTradeProcessing)
		return;
	injectAdvTrade()
}

var injectAdvTradeProcessing = false;
function injectAdvTrade(){

  injectAdvTradeProcessing = true;
  var tradeTr = $x("//table[contains(@class, 'trade_table')]/tbody/tr[contains(@class, 'tbl_row')]");

  for (var i in tradeTr) {
    var tradeTd = $x("td", tradeTr[i]);
	if (tradeTr[i].getAttribute('ws_processed') == 'true')
		continue;
    if (tradeTd.length == 7) {
	
	
	  var maxval = parseInt(tradeTd[2].lastChild.nodeValue!=null?tradeTd[2].lastChild.nodeValue:tradeTd[2].lastChild.lastChild.nodeValue); //максимум, который выставил продавец/покупатель
	  //покупаем или продаем?
	  var isSell = document.getElementById('r1').checked;
	  var maxMessage = 'max - 1';
	  var maxValue = maxval - 250;
	  
	  if (isSell) { //продаем. Пересчитать возможный максимум.
	        var maxByTraders = parseInt($x("//span[@id='inpb']")[0].innerHTML); //максимум, который могут перевезти торговцы.
			var maxByResources = parseInt($x("./nobr/img", tradeTd[2])[0].getAttribute('class').match(/res r(\d+)/)[1]);
			maxByResources = isInt(arr[maxByResources]) ? arr[maxByResources] : 0; //максимум данного ресурса на складе
			
			maxval = Math.min(maxval, maxByTraders, maxByResources);
			maxMessage = 'max';
			maxValue = maxval;
	  }
      
	  var l = $e('a', '+1', { href: 'javascript: void(0)', id: 'incb' + i });
      var l2 = $e('a', '+4', { href: 'javascript: void(0)', id: 'incbt' + i });
      var l3 = $e('a', '-1', { href: 'javascript: void(0)', id: 'decb' + i });
      var l4 = $e('a', '-4', { href: 'javascript: void(0)', id: 'decbt' + i });
      var lmax = $e('a', maxMessage, { href: 'javascript: void(0)', id: 'maxb' +i});

      tradeTd[5].appendChild($e('br'));
      tradeTd[5].appendChild(l);
      tradeTd[5].appendChild($t(' '));
      tradeTd[5].appendChild(l2);

      tradeTd[4].appendChild($e('br'));
      tradeTd[4].appendChild(l3);
      tradeTd[4].appendChild($t(' '));
      tradeTd[4].appendChild(l4);

      tradeTd[3].appendChild($e('br'));
      tradeTd[3].appendChild(lmax);

      var inpu = $x("./form/div/div/nobr/input", tradeTd[6])[0];
      $q('incb' + i).addEventListener('click', onIncValue(inpu, 1, maxval), false);
      $q('incbt' + i).addEventListener('click', onIncValue(inpu, 4, maxval), false);
      $q('decb' + i).addEventListener('click', onIncValue(inpu, -1, maxval), false);
      $q('decbt' + i).addEventListener('click', onIncValue(inpu, -4, maxval), false);
      $q('maxb' + i).addEventListener('click', onMaxValue(inpu, maxValue), false);
	  
	  tradeTr[i].setAttribute('ws_processed', 'true');

    }
  }
  injectAdvTradeProcessing = false;

}

function onIncValue(elem, cnt, maxval) {
  return function() {
    var incval = 250*cnt;
    var s = elem.value;
    if (s.length == 0)
      s = 0;
    else
      s = parseInt(s);
    if (s + incval > maxval)
      s = maxval;
    else
      s += incval;
    if (s < 0) {
      s = 0;
    }
    elem.value = s;
  }
}

function onMaxValue(elem, maxval) {
	return function() 
	{        
        elem.value = maxval;
	}
}

var Resource = (function() {
        var actualConstructor = function(id, max, container, parent) {
            this.id = id;
            this.max = max;
            this.container = container;
            this.parent = parent;
            arguments.callee.instances.push(this);
        }
        actualConstructor.instances = [];
        return actualConstructor;
    })();

    Resource.prototype.capacity = function() {
        return this.container.value.length == 0 || isNaN(this.container.value) ? 0 : parseInt(this.container.value);
    }

    Resource.prototype.onAdd = function(count) {
        var mmax = this.parent.capacity(this.id);
        if (this.max < mmax)  mmax = this.max;

        var incval = 250*count;

        var s = this.capacity();
    	if (s + incval > mmax)
      		s = mmax;
    	else
      		s += incval;
    	if (s < 0) {
      		s = 0;
    	}
    	this.container.value = s;
    }

    Resource.prototype.onMax = function() {
        var mmax = this.parent.capacity(this.id);
        if (this.max < mmax) mmax = this.max;
        this.container.value = mmax;
    }

var TradeContainer = (function() {

    var actualConstructor = function(size) {
        this.size = size;
        this.resources = {};
        arguments.callee.instances.push(this);
    }
    actualConstructor.instances = [];
    return actualConstructor;
    }
)();

    TradeContainer.prototype.registerResource = function(id, max, container) {
        this.resources[id] = new Resource(id, max, container, this);

        addToContainer(container, $e('a', 'max', { href: 'javascript: void(0)', id: 'maxb' + id }));
        $q('maxb' + id).addEventListener('click', onMax(id, this), false);
        addToContainer(container, $e('a', '-4', { href: 'javascript: void(0)', id: 'decbt' + id }));
        $q('decbt' + id).addEventListener('click', onAdd(id, -4, this), false);
        addToContainer(container, $e('a', '-1', { href: 'javascript: void(0)', id: 'decb' + id }));
        $q('decb' + id).addEventListener('click', onAdd(id, -1, this), false);
        addToContainer(container, $e('a', '+4', { href: 'javascript: void(0)', id: 'incbt' + id }));
        $q('incbt' + id).addEventListener('click', onAdd(id, 4, this), false);
        addToContainer(container, $e('a', '+1', { href: 'javascript: void(0)', id: 'incb' + id }));
        $q('incb' + id).addEventListener('click', onAdd(id, 1, this), false);
    }

    function addToContainer(container, element) {
        container.parentNode.insertBefore(element, container.nextSibling);
        container.parentNode.insertBefore($t(' '), element);
    }

    TradeContainer.prototype.capacity = function(id) {
        var total = 0;
        for (var i in this.resources) {
            if (id != i)
            total += this.resources[i].capacity();
        }
        return this.size - total;
    }

    function onAdd(id, count, tradeContainer) {
        return function() {
            tradeContainer.resources[id].onAdd(count);
        }
    }

    function onMax(id, tradeContainer) {
        return function() {
            tradeContainer.resources[id].onMax();
        }
    }

    TradeContainer.prototype.init = function() {
        var elements = $x("//table[@id='inp']/tbody/tr/td/input[@type='text' and contains(@name, 'res')]");
        for (var i in elements) {
            var resId = elements[i].name.match(/res(\d+)/)[1];
            this.registerResource(resId, Math.floor(arr[resId]/250)*250, elements[i]);
        }
    }

var sortType = 0;
var sortOrder = 1;

function streamSort() {

    var sortArray = [];
    var tabs = $x("//table[@class='def_table trway']", null);
    var tabIndex = tabs.length > 1 ? 1 : 0;
    var lines = $x("./tbody/tr", tabs[tabIndex]);
    for (var i in lines) {
        var columns = $x("./td", lines[i]);
        var cHolder = {city: {}, res: {}, pay: {}, traders: {}, optype: {}, time: {}, panel: ''};
        cHolder.city.text = columns[0].innerHTML;
        cHolder.city.value = $x("./a", columns[0])[0].innerHTML;
        cHolder.res.text = columns[1].innerHTML;
        cHolder.res.value = parseInt(columns[1].lastChild.nodeValue);
        cHolder.res.type = parseInt($x("./img", columns[1])[0].getAttribute('class').match(/res r(\d+)/)[1]);
        cHolder.pay.text = columns[2].innerHTML;
        cHolder.pay.value = parseFloat(columns[2].lastChild.nodeValue);
        cHolder.traders.text = columns[3].innerHTML;
        cHolder.traders.value = 0;
        if (columns[3].childNodes.length > 0) {
            cHolder.traders.value = parseInt(columns[3].firstChild.nodeValue);
        }
        cHolder.optype.text = columns[4].innerHTML;
        cHolder.optype.value = columns[4].innerHTML == 'Покупка' ? true : false;
        cHolder.time.text = columns[5].innerHTML;
        try {
            cHolder.time.value = parseFloat(columns[5].innerHTML.match(/(\d+\.\d+) /)[1]);
        } catch (e) {
            cHolder.time.value = 0;
        }
        cHolder.panel = columns[6].innerHTML;
        sortArray[i] = cHolder;
    }

    var columns = $x("./thead/tr/td", tabs[tabIndex]);
    for (var i in columns) {
        columns[i].innerHTML='<a id="sort_col_' + i + '" href="javascript:void(0)" >' + columns[i].innerHTML + '</a>';
        document.getElementById('sort_col_' + i).addEventListener('click', startSort(i, sortArray), false);
    }
}

function startSort(type, sortArray) {
    return function() {
        if  (sortType == type) {
            sortOrder = -1 * sortOrder;
        } else {
            sortType = type;
            sortOrder = 1;
        }
        sortArray.sort(streamComparator);
        var tabs = $x("//table[@class='def_table trway']", null);
        var lines = $x("./tbody/tr", tabs[tabs.length - 1]);
        for (var i in lines) {
            var columns = $x("./td", lines[i]);
            columns[0].innerHTML = sortArray[i].city.text;
            columns[1].innerHTML = sortArray[i].res.text;
            columns[2].innerHTML = sortArray[i].pay.text;
            columns[3].innerHTML = sortArray[i].traders.text;
            columns[4].innerHTML = sortArray[i].optype.text;
            columns[5].innerHTML = sortArray[i].time.text;
            columns[6].innerHTML = sortArray[i].panel;
        }
    }
}

function streamComparator(a, b) {
    if (sortType == 0) {
        //sort by city
            var x = a.city.value.toLowerCase();
            var y = b.city.value.toLowerCase();
            return sortOrder*((x < y) ? -1 : ((x > y) ? 1 : 0));
    }
    if (sortType ==1) { //sort by resource type/count
            if (a.res.type == b.res.type) {
                return sortOrder*(a.res.value - b.res.value);
            } else {
                return sortOrder*(a.res.type - b.res.type);
            }
    }
    if (sortType ==2) { //sort by payment value
            return sortOrder*(a.pay.value - b.pay.value);
    }
    if (sortType ==3) { //sort by traders count
            return sortOrder*(a.traders.value - b.traders.value);
    }
    if (sortType ==4) { //sort by operation type
            return sortOrder*(a.optype.value == b.optype.value ? 0 : a.optype.value ? -1 : 1);
    }
    if (sortType ==5) { //sort by time
            return sortOrder*(a.time.value - b.time.value);
    }
    return 0;

}


function onUSUnload() {}

var is_chrome = /chrome/.test( navigator.userAgent.toLowerCase() );
if (!is_chrome){
    window.addEventListener('load', onUSLoad, false);
    window.addEventListener('unload', onUSUnload, false);
}else {
    onUSLoad();

}
