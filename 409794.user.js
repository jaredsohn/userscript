// ==UserScript==
// @name    		谷歌翻译提示框扩展（Google Translator Tooltip Expanded）
// @author  		agunico
// @namespace		http://userscripts.org/scripts/source/409794.user.js
// @description		对Google Translator Tooltip Expanded简单的汉化和修改一下。 
// @version 		1.07
// @icon			http://translate.google.cn/favicon.ico
// @include			http*
// @include			https*
// ==/UserScript==
// Flexi 颜色拾取器 http://www.daviddurman.com/flexi-color-picker/# 
(function(p, q, s) {
    var t = (p.SVGAngle || q.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG": "VML"),
    picker,
    slide,
    hueOffset = 15,
    svgNS = 'http://www.w3.org/2000/svg';
    var u = ['<div class="picker-wrapper">', '<div class="picker"></div>', '<div class="picker-indicator"></div>', '</div>', '<div class="slide-wrapper">', '<div class="slide"></div>', '<div class="slide-indicator"></div>', '</div>'].join('');
    function mousePosition(a) {
        if (p.event && p.event.contentOverflow !== s) {
            return {
                x: p.event.offsetX,
                y: p.event.offsetY
            }
        }
        if (a.offsetX !== s && a.offsetY !== s) {
            return {
                x: a.offsetX,
                y: a.offsetY
            }
        }
        var b = a.target.parentNode.parentNode;
        return {
            x: a.layerX - b.offsetLeft,
            y: a.layerY - b.offsetTop
        }
    }
    function $(a, b, c) {
        a = q.createElementNS(svgNS, a);
        for (var d in b) a.setAttribute(d, b[d]);
        if (Object.prototype.toString.call(c) != '[object Array]') c = [c];
        var i = 0,
        len = (c[0] && c.length) || 0;
        for (; i < len; i++) a.appendChild(c[i]);
        return a
    }
    if (t == 'SVG') {
        slide = $('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            version: '1.1',
            width: '100%',
            height: '100%'
        },
        [$('defs', {},
        $('linearGradient', {
            id: 'gradient-hsv',
            x1: '0%',
            y1: '100%',
            x2: '0%',
            y2: '0%'
        },
        [$('stop', {
            offset: '0%',
            'stop-color': '#FF0000',
            'stop-opacity': '1'
        }), $('stop', {
            offset: '13%',
            'stop-color': '#FF00FF',
            'stop-opacity': '1'
        }), $('stop', {
            offset: '25%',
            'stop-color': '#8000FF',
            'stop-opacity': '1'
        }), $('stop', {
            offset: '38%',
            'stop-color': '#0040FF',
            'stop-opacity': '1'
        }), $('stop', {
            offset: '50%',
            'stop-color': '#00FFFF',
            'stop-opacity': '1'
        }), $('stop', {
            offset: '63%',
            'stop-color': '#00FF40',
            'stop-opacity': '1'
        }), $('stop', {
            offset: '75%',
            'stop-color': '#0BED00',
            'stop-opacity': '1'
        }), $('stop', {
            offset: '88%',
            'stop-color': '#FFFF00',
            'stop-opacity': '1'
        }), $('stop', {
            offset: '100%',
            'stop-color': '#FF0000',
            'stop-opacity': '1'
        })])), $('rect', {
            x: '0',
            y: '0',
            width: '100%',
            height: '100%',
            fill: 'url(#gradient-hsv)'
        })]);
        picker = $('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            version: '1.1',
            width: '100%',
            height: '100%'
        },
        [$('defs', {},
        [$('linearGradient', {
            id: 'gradient-black',
            x1: '0%',
            y1: '100%',
            x2: '0%',
            y2: '0%'
        },
        [$('stop', {
            offset: '0%',
            'stop-color': '#000000',
            'stop-opacity': '1'
        }), $('stop', {
            offset: '100%',
            'stop-color': '#CC9A81',
            'stop-opacity': '0'
        })]), $('linearGradient', {
            id: 'gradient-white',
            x1: '0%',
            y1: '100%',
            x2: '100%',
            y2: '100%'
        },
        [$('stop', {
            offset: '0%',
            'stop-color': '#FFFFFF',
            'stop-opacity': '1'
        }), $('stop', {
            offset: '100%',
            'stop-color': '#CC9A81',
            'stop-opacity': '0'
        })])]), $('rect', {
            x: '0',
            y: '0',
            width: '100%',
            height: '100%',
            fill: 'url(#gradient-white)'
        }), $('rect', {
            x: '0',
            y: '0',
            width: '100%',
            height: '100%',
            fill: 'url(#gradient-black)'
        })])
    } else if (t == 'VML') {
        slide = ['<DIV style="position: relative; width: 100%; height: 100%">', '<v:rect style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" stroked="f" filled="t">', '<v:fill type="gradient" method="none" angle="0" color="red" color2="red" colors="8519f fuchsia;.25 #8000ff;24903f #0040ff;.5 aqua;41287f #00ff40;.75 #0bed00;57671f yellow"></v:fill>', '</v:rect>', '</DIV>'].join('');
        picker = ['<DIV style="position: relative; width: 100%; height: 100%">', '<v:rect style="position: absolute; left: -1px; top: -1px; width: 101%; height: 101%" stroked="f" filled="t">', '<v:fill type="gradient" method="none" angle="270" color="#FFFFFF" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill>', '</v:rect>', '<v:rect style="position: absolute; left: 0px; top: 0px; width: 100%; height: 101%" stroked="f" filled="t">', '<v:fill type="gradient" method="none" angle="0" color="#000000" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill>', '</v:rect>', '</DIV>'].join('');
        if (!q.namespaces['v']) q.namespaces.add('v', 'urn:schemas-microsoft-com:vml', '#default#VML')
    }
    function hsv2rgb(a) {
        var R, G, B, X, C;
        var h = (a.h % 360) / 60;
        C = a.v * a.s;
        X = C * (1 - Math.abs(h % 2 - 1));
        R = G = B = a.v - C;
        h = ~~h;
        R += [C, X, 0, 0, X, C][h];
        G += [X, C, C, X, 0, 0][h];
        B += [0, 0, X, C, C, X][h];
        var r = Math.floor(R * 255);
        var g = Math.floor(G * 255);
        var b = Math.floor(B * 255);
        return {
            r: r,
            g: g,
            b: b,
            hex: "#" + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1)
        }
    }
    function rgb2hsv(a) {
        var r = a.r;
        var g = a.g;
        var b = a.b;
        if (a.r > 1 || a.g > 1 || a.b > 1) {
            r /= 255;
            g /= 255;
            b /= 255
        }
        var H, S, V, C;
        V = Math.max(r, g, b);
        C = V - Math.min(r, g, b);
        H = (C == 0 ? null: V == r ? (g - b) / C + (g < b ? 6 : 0) : V == g ? (b - r) / C + 2 : (r - g) / C + 4);
        H = (H % 6) * 60;
        S = C == 0 ? 0 : C / V;
        return {
            h: H,
            s: S,
            v: V
        }
    }
    function slideListener(d, e, f) {
        return function(a) {
            a = a || p.event;
            var b = mousePosition(a);
            d.h = b.y / e.offsetHeight * 360 + hueOffset;
            d.s = d.v = 1;
            var c = hsv2rgb({
                h: d.h,
                s: 1,
                v: 1
            });
            f.style.backgroundColor = c.hex;
            d.callback && d.callback(c.hex, {
                h: d.h - hueOffset,
                s: d.s,
                v: d.v
            },
            {
                r: c.r,
                g: c.g,
                b: c.b
            },
            s, b)
        }
    };
    function pickerListener(d, e) {
        return function(a) {
            a = a || p.event;
            var b = mousePosition(a),
            width = e.offsetWidth,
            height = e.offsetHeight;
            d.s = b.x / width;
            d.v = (height - b.y) / height;
            var c = hsv2rgb(d);
            d.callback && d.callback(c.hex, {
                h: d.h - hueOffset,
                s: d.s,
                v: d.v
            },
            {
                r: c.r,
                g: c.g,
                b: c.b
            },
            b)
        }
    };
    var v = 0;
    function ColorPicker(f, g, h) {
        if (! (this instanceof ColorPicker)) return new ColorPicker(f, g, h);
        this.h = 0;
        this.s = 1;
        this.v = 1;
        if (!h) {
            var i = f;
            i.innerHTML = u;
            this.slideElement = i.getElementsByClassName('slide')[0];
            this.pickerElement = i.getElementsByClassName('picker')[0];
            var j = i.getElementsByClassName('slide-indicator')[0];
            var k = i.getElementsByClassName('picker-indicator')[0];
            ColorPicker.fixIndicators(j, k);
            this.callback = function(a, b, c, d, e) {
                ColorPicker.positionIndicators(j, k, e, d);
                g(a, b, c)
            }
        } else {
            this.callback = h;
            this.pickerElement = g;
            this.slideElement = f
        }
        if (t == 'SVG') {
            var l = slide.getElementById('gradient-hsv');
            var m = slide.getElementsByTagName('rect')[0];
            l.id = 'gradient-hsv-' + v;
            m.setAttribute('fill', 'url(#' + l.id + ')');
            var n = [picker.getElementById('gradient-black'), picker.getElementById('gradient-white')];
            var o = picker.getElementsByTagName('rect');
            n[0].id = 'gradient-black-' + v;
            n[1].id = 'gradient-white-' + v;
            o[0].setAttribute('fill', 'url(#' + n[1].id + ')');
            o[1].setAttribute('fill', 'url(#' + n[0].id + ')');
            this.slideElement.appendChild(slide.cloneNode(true));
            this.pickerElement.appendChild(picker.cloneNode(true));
            v++
        } else {
            this.slideElement.innerHTML = slide;
            this.pickerElement.innerHTML = picker
        }
        addEventListener(this.slideElement, 'click', slideListener(this, this.slideElement, this.pickerElement));
        addEventListener(this.pickerElement, 'click', pickerListener(this, this.pickerElement));
        enableDragging(this, this.slideElement, slideListener(this, this.slideElement, this.pickerElement));
        enableDragging(this, this.pickerElement, pickerListener(this, this.pickerElement))
    };
    function addEventListener(a, b, c) {
        if (a.attachEvent) {
            a.attachEvent('on' + b, c)
        } else if (a.addEventListener) {
            a.addEventListener(b, c, false)
        }
    }
    function enableDragging(b, c, d) {
        var e = false;
        addEventListener(c, 'mousedown',
        function(a) {
            e = true
        });
        addEventListener(c, 'mouseup',
        function(a) {
            e = false
        });
        addEventListener(c, 'mouseout',
        function(a) {
            e = false
        });
        addEventListener(c, 'mousemove',
        function(a) {
            if (e) {
                d(a)
            }
        })
    }
    ColorPicker.hsv2rgb = function(a) {
        var b = hsv2rgb(a);
        delete b.hex;
        return b
    };
    ColorPicker.hsv2hex = function(a) {
        return hsv2rgb(a).hex
    };
    ColorPicker.rgb2hsv = rgb2hsv;
    ColorPicker.rgb2hex = function(a) {
        return hsv2rgb(rgb2hsv(a)).hex
    };
    ColorPicker.hex2hsv = function(a) {
        return rgb2hsv(ColorPicker.hex2rgb(a))
    };
    ColorPicker.hex2rgb = function(a) {
        return {
            r: parseInt(a.substr(1, 2), 16),
            g: parseInt(a.substr(3, 2), 16),
            b: parseInt(a.substr(5, 2), 16)
        }
    };
    function setColor(a, b, d, e) {
        a.h = b.h % 360;
        a.s = b.s;
        a.v = b.v;
        var c = hsv2rgb(a);
        var f = {
            y: (a.h * a.slideElement.offsetHeight) / 360,
            x: 0
        };
        var g = a.pickerElement.offsetHeight;
        var h = {
            x: a.s * a.pickerElement.offsetWidth,
            y: g - a.v * g
        };
        a.pickerElement.style.backgroundColor = hsv2rgb({
            h: a.h,
            s: 1,
            v: 1
        }).hex;
        a.callback && a.callback(e || c.hex, {
            h: a.h,
            s: a.s,
            v: a.v
        },
        d || {
            r: c.r,
            g: c.g,
            b: c.b
        },
        h, f);
        return a
    };
    ColorPicker.prototype.setHsv = function(a) {
        return setColor(this, a)
    };
    ColorPicker.prototype.setRgb = function(a) {
        return setColor(this, rgb2hsv(a), a)
    };
    ColorPicker.prototype.setHex = function(a) {
        return setColor(this, ColorPicker.hex2hsv(a), s, a)
    };
    ColorPicker.positionIndicators = function(a, b, c, d) {
        if (c) {
            b.style.left = 'auto';
            b.style.right = '0px';
            b.style.top = '0px';
            a.style.top = (c.y - a.offsetHeight / 2) + 'px'
        }
        if (d) {
            b.style.top = (d.y - b.offsetHeight / 2) + 'px';
            b.style.left = (d.x - b.offsetWidth / 2) + 'px'
        }
    };
    ColorPicker.fixIndicators = function(a, b) {
        b.style.pointerEvents = 'none';
        a.style.pointerEvents = 'none'
    };
    p.ColorPicker = ColorPicker
})(window, window.document);

const HREF_NO = 'javascript:void(0)';

initCrossBrowserSupportForGmFunctions();

var languagesGoogle = '<option value="auto">检测语言</option><option value="af">南非语</option><option value="sq">阿尔巴尼亚语</option><option value="ar">阿拉伯语</option><option value="hy">亚美尼亚语</option><option value="az">阿塞拜疆语</option><option value="eu">巴斯克语</option><option value="be">白俄罗斯语</option><option value="bn">孟加拉语</option><option value="bg">保加利亚语</option><option value="ca">加泰罗尼亚语</option><option value="zh-CN">中文(简体)</option><option value="zh-TW">中文(繁体)</option><option value="hr">克罗地亚语</option><option value="cs">捷克语</option><option value="da">丹麦语</option><option value="nl">荷兰语</option><option value="en">英语</option><option value="et">爱沙尼亚语</option><option value="tl">菲律宾语</option><option value="fi">芬兰语</option><option value="fr">法语</option><option value="gl">加利西亚</option><option value="ka">格鲁吉亚</option><option value="de">德国</option><option value="el">希腊</option><option value="ht">海地克里奥尔语</option><option value="iw">希伯来语</option><option value="hi">印地语</option><option value="hu">匈牙利</option><option value="is">冰岛语</option><option value="id">印尼语</option><option value="ga">爱尔兰</option><option value="it">意大利</option><option  value="ja">日语</option><option value="ko">韩语</option><option value="lv">拉脱维亚语</option><option value="lt">立陶宛语</option><option value="mk">马其顿语</option><option value="ms">马来语</option><option value="mt">马耳他语</option><option value="no">挪威语</option><option value="fa">波斯语</option><option value="pl">波兰语</option><option value="pt">葡萄牙语</option><option value="ro">罗马尼亚语</option><option value="ru">俄罗斯语</option><option value="sr">塞尔维亚语</option><option value="sk">斯洛伐克</option><option  value="sl">斯洛文尼亚语</option><option value="es">西班牙语</option><option value="sw">斯瓦希里语</option><option value="sv">瑞典语</option><option value="th">泰国语</option><option value="tr">土耳其语</option><option value="uk">乌克兰语</option><option value="ur">乌尔都语</option><option value="vi">越南语</option><option value="cy">威尔士语</option><option value="yi">意第绪语</option>';
var body = getTag('body')[0];
var imgLookup;
var txtSel = encodeURIComponent(txtSel); // text selected
var translation2Element = document.createElement('span');
var currentURL;

var initialized = false;

images();
css();

document.addEventListener('mouseup', showLookupIcon, false);
document.addEventListener('mousedown', mousedownCleaning, false);

function mousedownCleaning(evt) {
    var divDic = getId('divDic');
    var divLookup = getId('divLookup');

    if (divDic) {
        if (!clickedInsideID(evt.target, 'divDic')) divDic.parentNode.removeChild(divDic);
    }

    if (divLookup) divLookup.parentNode.removeChild(divLookup);
}

function showLookupIcon(evt) {
    if (evt.ctrlKey && evt.altKey && (!GM_getValue('ctrl') || !GM_getValue('alt'))) return;
    // XOR http://www.howtocreate.co.uk/xor.html
    if (evt.ctrlKey ? !GM_getValue('ctrl') : GM_getValue('ctrl')) return;
    if (evt.altKey ? !GM_getValue('alt') : GM_getValue('alt')) return;

    if (!initialized) {
        images();
        css();
        initialized = true;
    }

    var divDic = getId('divDic');
    var divLookup = getId('divLookup');
    txtSel = getSelection();

    // Exit if no text is selected
    if (!txtSel || txtSel == "") {
        if (divDic) {
            if (!clickedInsideID(evt.target, 'divDic')) divDic.parentNode.removeChild(divDic);
        }
        if (divLookup) divLookup.parentNode.removeChild(divLookup);

        return;
    }

    // Possible cleanup
    if (divDic) {
        if (!clickedInsideID(evt.target, 'divDic')) divDic.parentNode.removeChild(divDic);

        return;
    }

    // Remove div if exists
    if (divLookup) {
        divLookup.parentNode.removeChild(divLookup);
    }

    // Div container
    divLookup = createElement('div', {
        id: 'divLookup',
        style: 'background-color:transparent; color:#000000; position:absolute; top:' + (evt.clientY + window.pageYOffset + 10) + 'px; left:' + (evt.clientX + window.pageXOffset + 10) + 'px; padding:0px; z-index:10000; border-radius:2px;'
    });
    divLookup.appendChild(imgLookup.cloneNode(false));
    divLookup.addEventListener('mouseover', lookup, false);
    body.appendChild(divLookup);
}

// 创建提示框和启动谷歌翻译请求来获取翻译
function lookup(evt) {
    var divResult = null;
    var divDic = getId('divDic');
    var divLookup = getId('divLookup');
    var top = divLookup.style.top;
    var left = divLookup.style.left;

    // No text selected
    if (!txtSel || txtSel == "") {

        if (divDic = getId('divDic')) divDic.parentNode.removeChild(divDic);
        return;
    }

    // Cleanup divs
    if (divDic = getId('divDic')) {
        divDic.parentNode.removeChild(divDic);
    }
    divLookup.parentNode.removeChild(divLookup);

    // Div container
    divDic = createElement('div', {
        id: 'divDic',
        style: 'opacity: 0.9; font-size: ' + GM_getValue('fontsize', 'small') + '; background-color: ' + GM_getValue('backgroundColor', '#EDF4FC') + '; color: ' + GM_getValue('textcolor', 'Gray') + '; position:absolute; top:' + top + '; left:' + left + '; min-width:250px; min-height:50px; max-width:50%; padding:5px; text-align:left; z-index:10000; border-radius:4px; box-shadow: -2px 0px 9px 5px #898D91'
    });
    divDic.addEventListener('mousedown', dragHandler, false);
    body.appendChild(divDic);

    // Div result
    // This awfull wall of text is the "+" image
    divResult = createElement('div', {
        id: 'divResult',
        style: 'overflow:auto; padding:3px;'
    },
    null, '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJjSURBVDhPdZLdS1NxHMbPoi4SCUlvkqKLELrqtkD6B4ogBAmDCCzCqAiEErKbCheBMsyXsYllKTpjYcisJEuXTdO9z510bu6tuZy6WU736vFp3+/ILrIDD7/D+fF5nuf7Oz8hm44hnV5HKhnFz1iQ18RGBNFlL1aW5rEcnuV9YbeHNiQpDmAzpxSG3r1mkenmeogN/gsT+MUwgieNj6BUKVBZdZ5F7w3yeuh0fchmErvDlEDwvfu1uFJzGa3tTVA0P2YD+jY63A9kN3eHaU4y8HmdDNOsbo8dd1Va9Lt/sfo8KbwJgqXxAZ2e/MrwH1FNSlW+7MLtiTTqTFuongQq9MCZjxJODG2jWCthb68E2YtcG0oiUEouwmQa5bqXbt5g+NrXPCi3xLG65EabNYIDrySU9MZR0L0BYW11ATanBY09gzwjpT9oeYoLnxI7iZ+9YWQiM3D5RBwbyHByQVcMQjI6h1vPDBAuGnjO+JIdZo+LoZPvgaqxJP9r5eQ8wgEbasaWITzfwP7OFQgdIzYU33Fgz3UniuR2bmHzLzB4dBBclQ6Qqr51iCxK3acKQfAGXbjaNcNwncbBp04wgUcGwC38Xjs05lkYv1kRmp/CqR4XZK0BCNu5eyX+yF2CXO2zTUYegczoVCs+rCEaMKN73Ii2kSmW6DCgYdgKWbMn/+/T2S2UPxyHcE67I1ntNEMm6wQK1YuQKcOcRgYOix6lrfa/F4cM+gwhHK83obBax/NTvTK1yPMVKpycdqjFgtNKPYoap/+9df5oAqRybYQTD6q/43CHj1XaPoeSFpGNytQifgOV017CbdMQtgAAAABJRU5ErkJggg=="/><br/>Loading...');
    divDic.appendChild(divResult);

    // Options link
    var optionLink = createElement('a', {
        id: 'optionsLink',
        href: HREF_NO,
        style: 'opacity:0.2; position:absolute; bottom:3px; right:13px; font-size:18px; text-decoration:none!important;background:#528DDF;padding:1px;color:#fff;border-radius:6px 6px 6px 6px;border:2px solid #EEEEEE;font-weight:bold;width:20px;text-align:center;display:block;'
    },
    'click openCloseOptions false', '+');
    divDic.appendChild(optionLink);
    optionLink.addEventListener('mouseover',
    function(e) {
        e.target.style.opacity = 1.0
    });
    optionLink.addEventListener('mouseout',
    function(e) {
        e.target.style.opacity = 0.2
    });

    // Send the Google Translate request
    if ((txtSel + " ").search(/^\s*https?:\/\//) > -1) {
        divResult.innerHTML = '<a href="' + txtSel + '" target="_blank" >' + txtSel + '</a>';
    } else if ((txtSel + " ").search(/^\s*\S+(\.\S+)+/) > -1) // site.dom
    {
        divResult.innerHTML = '<a style="color:#888;" href="http://' + txtSel + '" target="_blank" >' + txtSel + '</a>';
    } else {
        var sl, tl, lang;
        sl = GM_getValue('from') ? GM_getValue('from') : "auto";
        tl = GM_getValue('to') ? GM_getValue('to') : "auto";
        lang = sl + "|" + tl;
        //currentURL = "http://www.google.com/translate_t?text=" + encodeURIComponent(txtSel) + "&langpair=" + lang; // Basic address, for web page parsing
        //currentURL = "http://translate.google.fr/translate_a/t?client=t&text=" + encodeURIComponent(txtSel) + "&langpair=" + lang; // URL for GET request. This adress return an array as answer
        currentPostData = "client=t&text=" + encodeURIComponent(txtSel) + "&langpair=" + lang; // Data for a POST request, for handling long requests
        GM_xmlhttpRequest({
            /*method: 'GET',
            url: currentURL,*/
            method: 'POST',
            url: 'http://translate.google.fr/translate_a/t',
            data: currentPostData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(resp) {
                try {
                    extractResult(resp.responseText);
                } catch(e) {
                    GM_log(e);
                }
            }
        });

        if (GM_getValue('to2', 'Disabled') != 'Disabled') {
            sl = GM_getValue('from') ? GM_getValue('from') : "auto";
            tl = GM_getValue('to2') ? GM_getValue('to2') : "auto";
            lang = sl + "|" + tl;
            currentPostData = "client=t&text=" + encodeURIComponent(txtSel) + "&langpair=" + lang; // Data for a POST request, for handling long requests
            GM_xmlhttpRequest({
                method: 'POST',
                url: 'http://translate.google.fr/translate_a/t',
                data: currentPostData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                onload: function(resp) {
                    try {
                        extractResult2(resp.responseText);
                    } catch(e) {
                        GM_log(e);
                    }
                }
            });
        } else {
            translation2Element.innerHTML = '';
        }
    }
}

// Lanched when we select an other language in the setup menu 
// 当我们在设置菜单中选择另一种语言启动
function quickLookup() {
    getId('divDic').style.fontSize = getId('optFontSize').value;
    getId('divDic').style.color = getId('optTextColor').value;
    getId('divResult').innerHTML = 'Loading...';

    var sl, tl, lang;
    sl = getId('optSelLangFrom').value;
    tl = getId('optSelLangTo').value;
    lang = sl + "|" + tl;
    currentPostData = "client=t&text=" + encodeURIComponent(txtSel) + "&langpair=" + lang; // Data for a POST request, for handling long requests
    GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://translate.google.fr/translate_a/t',
        data: currentPostData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function(resp) {
            try {
                extractResult(resp.responseText);
            } catch(e) {
                GM_log(e);
            }
        }
    });

    if (getId('optSelLangTo2').value != 'Disabled') {
        var sl, tl, lang;
        sl = getId('optSelLangFrom').value;
        tl = getId('optSelLangTo2').value;
        currentPostData = "client=t&text=" + encodeURIComponent(txtSel) + "&langpair=" + lang; // Data for a POST request, for handling long requests
        GM_xmlhttpRequest({
            method: 'POST',
            url: 'http://translate.google.fr/translate_a/t',
            data: currentPostData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(resp) {
                try {
                    extractResult2(resp.responseText);
                } catch(e) {
                    GM_log(e);
                }
            }
        });
    } else {
        translation2Element.innerHTML = '';
    }
}

function extractResult(gTradStringArray) {
    var arr = eval(gTradStringArray); // eval is used to transform the string to an array. I alse made a custom parsing function, but it doesn't handle antislashed characters, so I prefer using eval()
    /*
		Content of the gTrad array :
		0 / 0:Translation 1:Source text
		1 / i:Grammar / 0:Types (word, verb, ...) 1: Other translations
		5 / Array of other translations
	*/

    var translation = '';

    // 0 - Full translation
    translation += '<small><a href="https://translate.google.com/#' + GM_getValue('from', 'auto') + '/' + GM_getValue('to', 'auto') + '/' + txtSel + '">[' + arr[2] + '] ';
    for (var i = 0; i < arr[0].length; i++) translation += arr[0][i][1];
    translation += '</a> <span id="texttospeachbuttonfrom"></span></small><br/>';
    translation += '[' + GM_getValue('to', 'auto') + ']<em> ';
    for (var i = 0; i < arr[0].length; i++) translation += arr[0][i][0];
    translation += '</em> <span id="texttospeachbuttonto"></span><br/><span id="translation2Element"></span><br/>';

    translation += '<a id="toggleShowDetails" ' + (!GM_getValue('details', 'false') ? 'style="display:none"': '') + '>显示详情</a>';
    translation += '<span id="divDetails" ' + (GM_getValue('details', 'false') ? 'style="display:none"': '') + '><a id="toggleHideDetails">隐藏详情</a><br/>';
    // 1 - Grammar
    if (typeof arr[1] != 'undefined') {
        for (var i = 0; i < arr[1].length; i++) {
            translation += '<strong>' + arr[1][i][0] + ' : </strong>';
            for (var j = 0; j < arr[1][i][1].length; j++) {
                translation += ((j == 0) ? '': ', ') + arr[1][i][1][j];
            }
            translation += '<br/>';
        }
        translation += '<br/>';
    }

    // 5 - Alternative parts
    if (typeof arr[5] != 'undefined') {
        for (var i = 0; i < arr[5].length; i++) {
            if (typeof arr[5][i][2] != 'undefined') { // 5/i/2 array of alternatives, 5/i/0 the part of the text we are studying
                translation += '<strong>' + arr[5][i][0] + ' : </strong>';
                for (var j = 0; j < arr[5][i][2].length; j++) {
                    translation += ((j == 0) ? '': ', ') + arr[5][i][2][j][0];
                }
                translation += '<br/>';
            }
        }
    }
    translation += '</span>'; // Detail end

    getId('divResult').innerHTML = '<p style="margin:0px">' + translation + '</p>';
    getId('translation2Element').appendChild(translation2Element); // Optional second translation
    getId('toggleShowDetails').addEventListener('click',
    function() {
        getId('toggleShowDetails').style.display = 'none';
        getId('divDetails').style.display = 'block';
    },
    false);
    getId('toggleHideDetails').addEventListener('click',
    function() {
        getId('toggleShowDetails').style.display = 'inline';
        getId('divDetails').style.display = 'none';
    },
    false);

    // Create the Text to Speach 
    // 转换文本为语音
    var fromText = '';
    var toText = '';
    for (var i = 0; i < arr[0].length; i++) fromText += arr[0][i][1];
    for (var i = 0; i < arr[0].length; i++) toText += arr[0][i][0];
    addTextToSpeachLink(getId('texttospeachbuttonfrom'), arr[2], fromText); // arr[2] contains the detected input language
    addTextToSpeachLink(getId('texttospeachbuttonto'), GM_getValue('to', 'auto') == 'auto' ? 'en': GM_getValue('to', 'auto'), toText); // 我不能找到一种方式来获得所检测到的目标语言，所以如果被请求的目标是'自动'，我使用的是英文文本到语音的语言
}

function extractResult2(gTradStringArray) {
    var arr = eval(gTradStringArray);

    var translation = '';
    translation += '#[' + GM_getValue('to2', 'auto') + ']<em> ';
    for (var i = 0; i < arr[0].length; i++) translation += arr[0][i][0];
    translation += '</em># <span id="texttospeachbuttonto2"></span>';

    translation2Element.innerHTML = translation;

    var toText2 = '';
    for (var i = 0; i < arr[0].length; i++) toText2 += arr[0][i][0];
    addTextToSpeachLink(getId('texttospeachbuttonto2'), GM_getValue('to2', 'auto') == 'auto' ? 'en': GM_getValue('to2', 'auto'), toText2);
}

function addTextToSpeachLink(element, lang, text) {
    if (GM_getValue('tts', false) == false) return;
    var speachLink = document.createElement('a');
    speachLink.href = 'http://translate.google.com/translate_tts?tl=' + lang + '&q=' + text.replace(/[«»'"]/g, ' ');
    speachLink.target = '_blank';
    speachLink.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACaSURBVDhPvZOBDYAgDARZgVlYgRVYgRVYgZ3YiRVqHml8DRjUxEuItLaftoCRjywLWGslpdStg6lAjLHvdrz3YowR55zUWrt3IoBkBF/JOTd/CKF7BgKaPBIAaAP/SinNPkVxMgtw2fhiHlpFi+IkXgr2mIHCLS4LsK1tgP8EbltQXg+R+XSMCpfILF0kBSLMo6s84vFjWkNkAyh6GkTdlhEPAAAAAElFTkSuQmCC" height="16" width="16"/>';
    element.appendChild(speachLink);
    // 原图标url需要翻墙才能显示,换成字符串
}

function getSelection() {
    var txt = null;
    //get selected text  
    //获得选中文本
    if (window.getSelection && !window.opera) // window.getSelection() bugs with Opera 12.16 and ViolentMonkey
    {
        txt = window.getSelection();
    } else if (document.getSelection) {
        txt = document.getSelection();
    } else if (document.selection) {
        txt = document.selection.createRange().text;
    }
    return txt;
}

function openCloseOptions(evt) {
    var divOptions = getId('divOpt');

    if (!divOptions) //显示选项
    {
        divOptions = createElement('div', {
            id: 'divOpt',
            style: 'border-top:2px solid #5A91D8;position:relative; padding:5px;'
        });
        getId('divDic').appendChild(divOptions);
        getId('optionsLink').style.visibility = 'hidden';

        // 颜色拾取器, 在Opera下不工作
        try {
            if (!window.divColorPicker) {
                window.divColorPicker = createElement('div', {
                    id: 'optPicker',
                    class: 'cp-small'
                });

                window.colorPicker = ColorPicker(window.divColorPicker,
                function(hex, hsv, rgb) {
                    getId('divDic').style.backgroundColor = hex;
                });

            }
            window.colorPicker.setHex(GM_getValue('backgroundColor', '#EDF4FC'));
            divOptions.appendChild(window.divColorPicker);
        } catch(err) {
            divOptions.innerHTML += '<p>错误 : 无法加载颜色拾取器 (已知在opera中存在此问题)</p>';
        }
        //fields container  
        divOptionsFields = createElement('p');
        divOptions.appendChild(divOptionsFields);

        //从
        divOptionsFields.appendChild(createElement('span', null, null, '从 :'));
        divOptionsFields.appendChild(createElement('select', {
            id: 'optSelLangFrom'
        },
        null, languagesGoogle));
        getId('optSelLangFrom').value = GM_getValue('from') ? GM_getValue('from') : 'auto';
        getId('optSelLangFrom').addEventListener('change', quickLookup, false);

        //到
        divOptionsFields.appendChild(createElement('br'));
        divOptionsFields.appendChild(createElement('span', null, null, ' 到 :'));
        divOptionsFields.appendChild(createElement('select', {
            id: 'optSelLangTo'
        },
        null, languagesGoogle));
        getId('optSelLangTo').value = GM_getValue('to') ? GM_getValue('to') : 'auto';
        getId('optSelLangTo').addEventListener('change', quickLookup, false);

        //到2
        divOptionsFields.appendChild(createElement('br'));
        divOptionsFields.appendChild(createElement('span', null, null, ' 到(2):'));
        divOptionsFields.appendChild(createElement('select', {
            id: 'optSelLangTo2'
        },
        null, '<option value="Disabled">禁用</option>' + languagesGoogle));
        getId('optSelLangTo2').value = GM_getValue('to2') ? GM_getValue('to2') : 'Disabled';
        getId('optSelLangTo2').addEventListener('change', quickLookup, false);

        //转换文本为语音
        divOptionsFields.appendChild(createElement('br'));
        divOptionsFields.appendChild(createElement('input', {
            id: 'checkTTS',
            type: 'checkbox'
        }));
        divOptionsFields.appendChild(createElement('span', null, null, '<span title="该功能有很多问题。你需要经常刷新页面启动.mp3文件。\n你需要先设置某种语言。\n如果您使用了“自动检测语言”，那么只有英语能够正确发音。" style="border-bottom:1px dashed">转换文本为语言</span>'));
        getId('checkTTS').checked = GM_getValue('tts');

        //隐藏详细信息
        divOptionsFields.appendChild(createElement('br'));
        divOptionsFields.appendChild(createElement('input', {
            id: 'checkDetails',
            type: 'checkbox'
        }));
        divOptionsFields.appendChild(createElement('span', null, null, '默认隐藏详细信息'));
        getId('checkDetails').checked = GM_getValue('details');

        //字体大小
        divOptionsFields.appendChild(createElement('br'));
        divOptionsFields.appendChild(createElement('span', null, null, '字体大小 :'));
        divOptionsFields.appendChild(createElement('select', {
            id: 'optFontSize'
        },
        null, '<option value="x-small">超小字(12px)</option><option value="small">小(13px)（默认）</option><option value="medium">中等(16px)</option><option value="large">大(18px)</option>'));
        getId('optFontSize').value = GM_getValue('fontsize') ? GM_getValue('fontsize') : 'small';
        getId('optFontSize').addEventListener('change', quickLookup, false);

        //文本颜色
        divOptionsFields.appendChild(createElement('br'));
        divOptionsFields.appendChild(createElement('span', null, null, '文本颜色:'));
        divOptionsFields.appendChild(createElement('select', {
            id: 'optTextColor'
        },
        null, '<option value="Gray">灰		色(默认)</option><option value="Black">黑		色</option><option value="White">白	色</option><option value="CadetBlue">藏		青</option><option value="ForestGreen">葱		绿</option><option value="FireBrick">砖		红</option>'));
        getId('optTextColor').value = GM_getValue('textcolor') ? GM_getValue('textcolor') : 'Gray';
        getId('optTextColor').addEventListener('change', quickLookup, false);

        //使用ctrl键
        divOptionsFields.appendChild(createElement('br'));
        divOptionsFields.appendChild(createElement('input', {
            id: 'checkCtrl',
            type: 'checkbox'
        }));
        divOptionsFields.appendChild(createElement('span', null, null, '使用ctrl键'));
        getId('checkCtrl').checked = GM_getValue('ctrl');

        //使用alt键
        divOptionsFields.appendChild(createElement('br'));
        divOptionsFields.appendChild(createElement('input', {
            id: 'checkAlt',
            type: 'checkbox'
        }));
        divOptionsFields.appendChild(createElement('span', null, null, '使用alt键'));
        getId('checkAlt').checked = GM_getValue('alt');

        //保存
        divOptionsFields.appendChild(createElement('br'));
        divOptionsFields.appendChild(createElement('a', {
            href: HREF_NO,
            class: "gootranslink"
        },
        'click saveOptions false', '保存'));

        //重置
        divOptionsFields.appendChild(createElement('span', null, null, ' - '));
        divOptionsFields.appendChild(createElement('a', {
            href: HREF_NO,
            class: "gootranslink"
        },
        'click resetOptions false', '重置'));

        //取消
        divOptionsFields.appendChild(createElement('span', null, null, ' - '));
        divOptionsFields.appendChild(createElement('a', {
            href: HREF_NO,
            class: "gootranslink"
        },
        'click openCloseOptions false', '取消'));

    } else // 隐藏选项
    {
        divOptions.parentNode.removeChild(divOptions);
        getId('optionsLink').style.visibility = 'visible';
    }
}

function saveOptions(evt) {

    var backgroundColor = getId('divDic').style.backgroundColor;
    var from = getId('optSelLangFrom').value;
    var to = getId('optSelLangTo').value;
    var to2 = getId('optSelLangTo2').value;
    var tts = getId('checkTTS').checked;
    var details = getId('checkDetails').checked;
    var fontsize = getId('optFontSize').value;
    var textcolor = getId('optTextColor').value;
    var ctrl = getId('checkCtrl').checked;
    var alt = getId('checkAlt').checked;

    GM_setValue('backgroundColor', backgroundColor);
    GM_setValue('from', from);
    GM_setValue('to', to);
    GM_setValue('to2', to2);
    GM_setValue('tts', tts);
    GM_setValue('details', details);
    GM_setValue('fontsize', fontsize);
    GM_setValue('textcolor', textcolor);
    GM_setValue('ctrl', ctrl);
    GM_setValue('alt', alt);

    quickLookup();
    getId('divDic').removeChild(getId('divOpt'));
    getId('optionsLink').style.visibility = 'visible';
}

function resetOptions(evt) {

    GM_deleteValue('backgroundColor');
    GM_deleteValue('from');
    GM_deleteValue('to');
    GM_deleteValue('to2');
    GM_deleteValue('tts');
    GM_deleteValue('fontsize');
    GM_deleteValue('textcolor');
    GM_deleteValue('ctrl');
    GM_deleteValue('alt');

    getId('divDic').parentNode.removeChild(getId('divDic'));
}

function css() {
    var style = createElement('style', {
        type: "text/css"
    },
    null, "" + 'a.gootranslink:link {color: #0000FF !important; text-decoration: underline !important;}' + 'a.gootranslink:visited {color: #0000FF !important; text-decoration: underline !important;}' + 'a.gootranslink:hover {color: #0000FF !important; text-decoration: underline !important;}' + 'a.gootranslink:active {color: #0000FF !important; text-decoration: underline !important;}' + '.picker-wrapper,.slide-wrapper{position:relative;float:left}.picker-indicator,.slide-indicator{position:absolute;left:0;top:0;pointer-events:none}.picker,.slide{cursor:crosshair;float:left}.cp-default{background-color:gray;padding:12px;box-shadow:0 0 40px #000;border-radius:15px;float:left}.cp-default .picker{width:200px;height:200px}.cp-default .slide{width:30px;height:200px}.cp-default .slide-wrapper{margin-left:10px}.cp-default .picker-indicator{width:5px;height:5px;border:2px solid darkblue;-moz-border-radius:4px;-o-border-radius:4px;-webkit-border-radius:4px;border-radius:4px;opacity:.5;-ms-filter:"alpha(opacity=50)";filter:alpha(opacity=50);filter:alpha(opacity=50);background-color:white}.cp-default .slide-indicator{width:100%;height:10px;left:-4px;opacity:.6;-ms-filter:"alpha(opacity=60)";filter:alpha(opacity=60);filter:alpha(opacity=60);border:4px solid lightblue;-moz-border-radius:4px;-o-border-radius:4px;-webkit-border-radius:4px;border-radius:4px;background-color:white}.cp-small{padding:5px;background-color:white;float:left;border-radius:5px}.cp-small .picker{width:100px;height:100px}.cp-small .slide{width:15px;height:100px}.cp-small .slide-wrapper{margin-left:5px}.cp-small .picker-indicator{width:1px;height:1px;border:1px solid black;background-color:white}.cp-small .slide-indicator{width:100%;height:2px;left:0;background-color:black}.cp-fancy{padding:10px;background:-webkit-linear-gradient(top,#aaa 0,#222 100%);float:left;border:1px solid #999;box-shadow:inset 0 0 10px white}.cp-fancy .picker{width:200px;height:200px}.cp-fancy .slide{width:30px;height:200px}.cp-fancy .slide-wrapper{margin-left:10px}.cp-fancy .picker-indicator{width:24px;height:24px;background-image:url(http://cdn1.iconfinder.com/data/icons/fugue/bonus/icons-24/target.png)}.cp-fancy .slide-indicator{width:30px;height:31px;left:30px;background-image:url(http://cdn1.iconfinder.com/data/icons/bluecoral/Left.png)}.cp-normal{padding:10px;background-color:white;float:left;border:4px solid #d6d6d6;box-shadow:inset 0 0 10px white}.cp-normal .picker{width:200px;height:200px}.cp-normal .slide{width:30px;height:200px}.cp-normal .slide-wrapper{margin-left:10px}.cp-normal .picker-indicator{width:5px;height:5px;border:1px solid gray;opacity:.5;-ms-filter:"alpha(opacity=50)";filter:alpha(opacity=50);filter:alpha(opacity=50);background-color:white;pointer-events:none}.cp-normal .slide-indicator{width:100%;height:10px;left:-4px;opacity:.6;-ms-filter:"alpha(opacity=60)";filter:alpha(opacity=60);filter:alpha(opacity=60);border:4px solid gray;background-color:white;pointer-events:none}');
    getTag('head')[0].appendChild(style);
}

/*
 *简短的函数来代替 document.createElement document.getElementById 和document.getElementsByTagName
 */
function createElement(type, attrArray, evtListener, html) {
    var node = document.createElement(type);

    for (var attr in attrArray) if (attrArray.hasOwnProperty(attr)) {
        node.setAttribute(attr, attrArray[attr]);
    }

    if (evtListener) {
        var a = evtListener.split(' ');
        node.addEventListener(a[0], eval(a[1]), eval(a[2]));
    }

    if (html) node.innerHTML = html;

    return node;
}

function getId(id, parent) {
    if (!parent) return document.getElementById(id);
    return parent.getElementById(id);
}

function getTag(name, parent) {
    if (!parent) return document.getElementsByTagName(name);
    return parent.getElementsByTagName(name);
}

/*
 * 拖拽支持  改编自 http://www.hunlock.com/blogs/Javascript_Drag_and_Drop
 */
var savedTarget = null; // The target layer (effectively vidPane)
var orgCursor = null; // 原来的鼠标样式因此我们可以还原它？
var dragOK = false; // True if we're allowed to move the element under mouse
var dragXoffset = 0; // How much we've moved the element on the horozontal
var dragYoffset = 0; // How much we've moved the element on the verticle
var didDrag = false; // Set to true when we do a drag

function moveHandler(e) {
    if (e == null) return; // { e = window.event }
    if (e.button <= 1 && dragOK) {
        savedTarget.style.left = e.clientX - dragXoffset + 'px';
        savedTarget.style.top = e.clientY - dragYoffset + 'px';
        return false;
    }
}

function dragCleanup(e) {
    document.removeEventListener('mousemove', moveHandler, false);
    document.removeEventListener('mouseup', dragCleanup, false);
    savedTarget.style.cursor = orgCursor;

    dragOK = false; // Its been dragged now
    didDrag = true;

}

function dragHandler(e) {

    var htype = '-moz-grabbing';
    if (e == null) return; // { e = window.event;}  // htype='move';}
    var target = e.target; // != null ? e.target : e.srcElement;
    orgCursor = target.style.cursor;

    if (target.nodeName != 'DIV' && target.nodeName != 'P') return;

    if (target = clickedInsideID(target, 'divDic')) {
        savedTarget = target;
        target.style.cursor = htype;
        dragOK = true;
        dragXoffset = e.clientX - target.offsetLeft;
        dragYoffset = e.clientY - target.offsetTop;

        // Set the left before removing the right
        target.style.left = e.clientX - dragXoffset + 'px';
        target.style.right = null;

        document.addEventListener('mousemove', moveHandler, false);
        document.addEventListener('mouseup', dragCleanup, false);
        return false;
    }
}

function clickedInsideID(target, id) {

    if (target.getAttribute('id') == id) return getId(id);

    if (target.parentNode) {
        while (target = target.parentNode) {
            try {
                if (target.getAttribute('id') == id) return getId(id);
            } catch(e) {}
        }
    }

    return null;
}
// End drag code

/*
 * 提示框 图片
 */
function images() {
    imgLookup = createElement('img', {
        border: 0
    });
    imgLookup.src = 'data:image/png;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAPAA8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDvde1PUYfEAgh1ny0Zd0UaQI6rnIZZO/AAK56k+1eaePvh/FrviSXX7nVbi2F8ke1BZK/3I1QnPmDrtz0HWtHQ/FCa9b6pfaRAWtJ3hm1FJZWMtkxyMZICyAlWwVycYyFPFaOr65DqdtNbi2eIiRXtzuzwBtweePlA6dxXqYbB02lJrmT3fbReff8ABHjYzG1YNxi+V20XfV+XZfez/9k=';
}

if (typeof GM_deleteValue == 'undefined') {

    GM_addStyle = function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    GM_deleteValue = function(name) {
        localStorage.removeItem(name);
    }

    GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value) return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
        case 'b':
            return value == 'true';
        case 'n':
            return Number(value);
        default:
            return value;
        }
    }

    GM_log = function(message) {
        console.log(message);
    }

    GM_openInTab = function(url) {
        return window.open(url, "_blank");
    }

    GM_registerMenuCommand = function(name, funk) {
        //todo
    }

    GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
    }
}

/*
 * Cross browser support for GM functions
 * http://userscripts.org/topics/41177
 */
function initCrossBrowserSupportForGmFunctions() {
    if (typeof GM_deleteValue == 'undefined') {

        GM_addStyle = function(css) {
            var style = document.createElement('style');
            style.textContent = css;
            document.getElementsByTagName('head')[0].appendChild(style);
        }

        GM_deleteValue = function(name) {
            localStorage.removeItem(name);
        }

        GM_getValue = function(name, defaultValue) {
            var value = localStorage.getItem(name);
            if (!value) return defaultValue;
            var type = value[0];
            value = value.substring(1);
            switch (type) {
            case 'b':
                return value == 'true';
            case 'n':
                return Number(value);
            default:
                return value;
            }
        }

        GM_log = function(message) {
            console.log(message);
        }

        GM_openInTab = function(url) {
            return window.open(url, "_blank");
        }

        GM_registerMenuCommand = function(name, funk) {
            //todo
        }

        GM_setValue = function(name, value) {
            value = (typeof value)[0] + value;
            localStorage.setItem(name, value);
        }
    }
}