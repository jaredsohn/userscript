// ==UserScript==
// @name       Dozensonline Dozenator
// @namespace  http://userscripts.org/users/322169
// @version    1.6.4
// @description  Converts the site-generated numbers on Dozensonline into dozenal, as they should be.
// @include    http://z13.invisionfree.com/DozensOnline/*
// @copyright  2011, James Wood
// ==/UserScript==

(function() {
    var dChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var zChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'X', 'Ɛ'];
    var intPrefix = '';
    var fractPrefix = ''
    var point = '′';
    var addPoint = true;
    var tgmTime = true;
    var tgmDatePrefix = '';
    var tgmDateSuffix = ' <sup>4</sup>Tm';
    
    // 'd' for "decimal".
    function convert(dText) {
        dText += '';
        var number = 0;
        for (var i = 0; i < dText.length; i++) {
            if (dText[i] == ',') continue;
            number *= 10;
            number += dChars.indexOf(dText[i]);
        }
        
        if (number == 0) return '0' + point;
        
        var text = '';
        var pow = Math.floor(Math.log(number) / (Math.log(12) || 1));
        do {
            var digit = Math.floor(number / Math.pow(12, pow));
            text += zChars[digit];
            number -= digit * Math.pow(12, pow--);
        }
        while (pow >= 0 || number > 0);
        
        if (addPoint)
            return intPrefix + text + point;
        else
            return intPrefix + text;
    }
    
    function convertFract(dText) {
        if (!dText) return '';
        
        dText += '';
        var number = 0;
        var inFract = false, fractLength = 0;
        var isPerCent = false;
        for (var i = 0; i < dText.length; i++) {
            if (dText[i] == '.') {
                inFract = true;
                continue;
            }
            if (dText[i] == '%') {
                isPerCent = true;
                break;
            }
            if (inFract) fractLength++;
            number *= 10;
            number += dChars.indexOf(dText[i]);
        }
        
        number /= Math.pow(10, fractLength) * (isPerCent ? 100 : 1);
        return createFract(number, fractLength, isPerCent);
    }
    
    function createFract(number, fractLength, makePerGross) {
        if (makePerGross) number *= 144;
        
        var text = '';
        var pow = Math.floor(Math.log(number) / (Math.log(12) || 1));
        pow = Math.max(pow, 0);
        do {
            var digit = Math.floor(number / Math.pow(12, pow));
            text += zChars[digit];
            number -= digit * Math.pow(12, pow--);
        }
        while (pow >= 0);
        
        text += point;
        
        // Calculate an extra place to use in rounding
        for (pow = -1; pow >= -fractLength - 1; pow--) {
            var digit = Math.floor(number / Math.pow(12, pow));
            text += zChars[digit];
            number -= digit * Math.pow(12, pow);
        }
        
        return fractPrefix + round(text) + (makePerGross ? '<sup>o</sup>/<sub>g</sub>' : '');
    }
    
    // 'z' for "dozenal".
    function round(zText) {
        if (zText[zText.length - 1] == point)
            return round(zText.substr(0, zText.length - 1) + zChars[11]) + point;
        else if (zChars.indexOf(zText[zText.length - 1]) >= 6) {
            if (zText[zText.length - 2] == zChars[11])
                return round(zText.substr(0, zText.length - 1)) + zChars[0];
            else {
                if (zText[zText.length - 2] == point)
                    return zText.substr(0, zText.length - 3) + zChars[zChars.indexOf(zText[zText.length - 3]) + 1] + point;
                else
                    return zText.substr(0, zText.length - 2) + zChars[zChars.indexOf(zText[zText.length - 2]) + 1];
            }
        }
        else {
            return zText.substr(0, zText.length - 1);
        }
    }
    
    // 's' for "sexagesimal".
    function convertTime(sText, am) {
        var triquaTims = sText.substr(3, 2) / 5;
        return tgmDatePrefix + (am ? '0' : '1') + zChars[sText.substr(0, 2) % 12] + point
            + zChars[Math.floor(triquaTims)] + zChars[Math.round(triquaTims * 12) % 12] + tgmDateSuffix;
    }
    
    function elConvert(element, pattern) {
        element.innerHTML = element.innerHTML.replace(pattern, convert(element.innerHTML.match(pattern)));
    }
    
    function elConvertFract(element, pattern) {
        element.innerHTML = element.innerHTML.replace(pattern, convertFract(element.innerHTML.match(pattern)));
    }
    
    function elConvertGlobal(element, pattern) {
        var matches = element.innerHTML.match(pattern);
        var startPos = 0;
        for (var i = 0; i < matches.length; i++) {
            var match = matches[i];
            startPos += element.innerHTML.substring(startPos).search(pattern);
            var split = [element.innerHTML.substr(0, startPos), element.innerHTML.substr(startPos, match.length), element.innerHTML.substr(startPos + match.length)];
            var result = convert(match);
            element.innerHTML = split[0] + result + split[2];
            startPos += result.length;
        }
    }
    
    // number = 17;84 would have fractLength = 2.
    function elCreateFract(element, pattern, number, fractLength, makePerGross) {
        element.innerHTML = element.innerHTML.replace(pattern, createFract(number, fractLength, makePerGross));
    }
    
    function elConvertTime(element, pattern) {
        var match = element.innerHTML.match(pattern) + '';
        element.innerHTML = element.innerHTML.replace(match, convertTime(match.substr(0, 5), match.substr(6) == 'AM'));
    }
    
    function txtConvert(textNode, pattern) {
        textNode.textContent = textNode.textContent.replace(pattern, convert(textNode.textContent.match(pattern)));
    }
    
    // Note to self: by default, regexes only match the first occurance.
    // Also, * = 0 or more, + = 1 or more
    (function() {
        var el, els, i;
        
        // Common elements:
        elConvert(document.querySelector('b+a'), /\d/);
        
        el = document.querySelector('.row4[align=center]>b');
        elCreateFract(el, /.+/, parseFloat(el.innerHTML) / 25 * 144, 4);
        
        el = document.querySelector('.row4[align=center][style]');
        el.innerHTML = el.innerHTML.replace('seconds', 'Tim');
        elConvert(el, /\d{4}(?= )/);
        
        el = document.querySelector('.row4[align=center]>a:nth-of-type(2)');
        elConvertGlobal(el, /\d+\b/g);
        
        if (document.location.search == '?act=idx' || (document.location.search == '' && document.title.indexOf(' ') == -1)) {
            // Main page
            el = document.querySelector('#navstrip+br+div');
            elConvert(el, /\b\d\d?(?= \d{4})/);
            elConvert(el, /\d{4}/);
            
            els = document.querySelectorAll('.row2[align]');
            for (i = 0; i < els.length; i++)
                elConvert(els[i], /.+/);
            
            els = document.querySelectorAll('.row2[nowrap]');
            for (i = 0; i < els.length; i++) {
                elConvert(els[i], /\b\d\d?\b/);
                elConvert(els[i], /\d{4}/);
            }
            
            el = document.querySelector('div>a+a+a');
            el.innerHTML = el.innerHTML.replace('10', zChars[10] + point);
            
            el = document.querySelector('.pformstrip');
            elConvert(el, /\d+/);
            el.innerHTML = el.innerHTML.replace('15 minutes', zChars[3] + point + ' triquaTims');
            
            els = document.querySelectorAll('.row4:last-child>b');
            for (i = 0; i < els.length - 1; i++) {
                el = els[i];
                if (el.innerHTML.match(/[0-9,]+/) == el.innerHTML)
                    elConvert(el, /.+/);
            }
            
            el = els[i];
            elConvert(el, /\b\d\d?\b/);
            elConvert(el, /\d{4}/);
            
            if (tgmTime) {
                elConvertTime(document.querySelector('#navstrip+br+div'), /\b\d\d:\d\d [AP]M/);
                els = document.querySelectorAll('.row2[nowrap]');
                for (i = 0; i < els.length; i++)
                    elConvertTime(els[i], /\b\d\d:\d\d [AP]M/);
            }
        }
        else if (document.location.search.indexOf('showforum=') != -1 || document.location.search.indexOf('act=SF') != -1) {
            // Topic list
            els = document.querySelectorAll('.row4:nth-child(5)>a, .row4:nth-child(6), .row2:nth-child(6)');
            for (i = 0; i < els.length; i++)
                if (els[i].innerHTML.indexOf('-') == -1)
                    elConvert(els[i], /.+/);
            
            els = document.querySelectorAll('.row4:nth-child(7), .row2:nth-child(7)');
            for (i = 0; i < els.length; i++) {
                el = els[i].childNodes[0];
                elConvert(el, /^\d\d?/);
                elConvert(el, /\d{4}/);
                if (tgmTime)
                    elConvertTime(el, /\d\d:\d\d [AP]M/);
                
                el.innerHTML = el.innerHTML.replace(/st|nd|rd|th/, '');
            }
            
            /* els = document.querySelectorAll('[width="20%"]');
            for (i = 0; i < els.length; i++) {
                el = els[i];
                txtConvert(el.childNodes[1], /\d+/);
                elConvert(el.childNodes[2], /\d+/);
                elConvert(el.childNodes[4], /\d+/);
            } */
            
            els = document.querySelectorAll('.row2:nth-child(3)');
            for (i = 0; i < els.length; i++)
                elConvert(els[i], /.+/);
            
            els = document.querySelectorAll('.row2:nth-child(4)');
            for (i = 0; i < els.length; i++)
                if (els[i].innerHTML != els[i].innerText)
                    break;
                else
                    elConvert(els[i], /.+/);
            
            els = document.querySelectorAll('.row2:nth-child(5)');
            for (i = 0; i < els.length; i++) {
                el = els[i];
                elConvert(el, /\d\d?/);
                elConvert(el, /\d{4}/);
                if (tgmTime)
                    elConvertTime(el, /\d\d:\d\d [AP]M/);
            }
            
            els = document.querySelectorAll('.darkrow2');
            elConvertGlobal(els[els.length - 1], /\d+(?= )/g);
        }
        else if (document.location.search.indexOf('showtopic=') != -1 || document.location.search.indexOf('act=ST') != -1) {
            els = document.querySelectorAll('.postdetails');
            for (i = 0; i < els.length; i += 2) {
                el = els[i];
                elConvert(el, /\d\d?(?= )/);
                elConvert(el, /\d{4}(?=,)/);
                if (tgmTime)
                    elConvertTime(el, /\d\d:\d\d [AP]M/);
            }
            for (i = 1; i < els.length; i += 2) {
                el = els[i];
                elConvertGlobal(el, /[\d,]+(?=<br>\n)|\d\d?(?=-)/g);
                el.innerHTML = el.innerHTML.replace(/\d\d(?=<br><br>)/, convert('20' + el.innerHTML.match(/\d\d(?=<br><br>)/)));
            }
            
            els = document.querySelectorAll('td:only-child:not([id])');
            for (i = 0; i < els.length; i++) {
                el = els[i];
                elConvert(el, /\d\d?(?= )/);
                elConvert(el, /\d{4}(?=,)/);
                if (tgmTime)
                    elConvertTime(el, /\d\d:\d\d [AP]M/);
            }
            
            els = document.querySelectorAll('.tablepad');
            if (els.length == 2) {
                var votes, totalVotes;
                
                els = document.querySelectorAll('.tablepad>*>*>*>.row1>b');
                votes = new Array(els.length);
                for (i = 0; i < els.length; i++) {
                    votes[i] = parseInt(els[i].innerHTML.match(/\d+/));
                    elConvert(els[i], /\d+/);
                }
                
                el = document.querySelector('.tablepad>*>*>*>.row1:only-child');
                totalVotes = parseInt(el.innerHTML.match(/\d+/));
                elConvert(el, /\d+/);
                
                if (totalVotes == 0)
                    totalVotes = 1;
                
                els = document.querySelectorAll('.tablepad>*>*>*>.row1:last-child:not(:first-child)');
                for (i = 0; i < els.length; i++)
                    elCreateFract(els[i], /\d{1,3}\.\d\d%(?=])/, votes[i] / totalVotes, 2, true);
            }
            
            els = document.querySelectorAll('a[title="Jump to page..."]');
            if (els.length == 2) {
                el = els[0].parentNode;
                txtConvert(el.childNodes[1], /\d+/);
                for (i = 2; i < el.childNodes.length; i += 2)
                    if (el.childNodes[i].innerText == 'Go to first unread post')
                        break;
                    else
                        if (el.childNodes[i].nodeType == 3)
                            txtConvert(el.childNodes[i], /\d+/);
                        else
                            elConvert(el.childNodes[i], /\d+/);
                
                el = els[1].parentNode;
                txtConvert(el.childNodes[2], /\d+/);
                for (i = 3; i < el.childNodes.length; i += 2)
                    if (el.childNodes[i].nodeType == 3)
                        txtConvert(el.childNodes[i], /\d+/);
                    else
                        elConvert(el.childNodes[i], /\d+/);
            }
            
            els = document.querySelectorAll('.edit');
            for (i = 0; i < els.length; i++) {
                el = els[i];
                elConvert(el, /\d\d?(?= \d)/);
                elConvert(el, /\d{4}/);
                if (tgmTime)
                    elConvertTime(el, /\d\d:\d\d [AP]M/);
            }
        }
        else if (/*document.location.search.indexOf('act=Post') != -1 ||*/ document.title.substr(0, 28) == 'Dozensonline -> Replying in ') {
            els = document.querySelectorAll('td.row4:last-child');
            for (i = 0; i < els.length; i++) {
                el = els[i];
                elConvert(el, /\d\d?(?= )/);
                elConvert(el, /\d{4}(?=,)/);
                if (tgmTime)
                    elConvertTime(el, /\d\d:\d\d [AP]M/);
            }
            
            els = document.querySelectorAll('div.pformstrip');
            for (i = 0; i < els.length; i++)
                if (els[i].innerHTML == 'Last 10 Posts [ In reverse order ]') {
                    els[i].innerHTML = 'Last ' + zChars[10] + (addPoint ? point : '') + ' Posts [ In reverse order ]';
                    break;
                }
            
            els = document.querySelectorAll('td:only-child:not([id])');
            for (i = 0; i < els.length; i++) {
                el = els[i];
                elConvert(el, /\d\d?(?= \d)/);
                elConvert(el, /\d{4}(?=,)/);
                if (tgmTime)
                    elConvertTime(el, /\d\d:\d\d [AP]M/);
            }
        }
        else if (document.location.search.indexOf('showuser=') != -1) {
            els = document.querySelectorAll('.row1>b');
            elConvert(els[0], /.+/);
            
            el = els[2];
            elConvert(el, /\d\d?(?=-)/);
            var match = el.innerHTML.match(/\d\d$/);
            el.innerHTML = el.innerHTML.replace(/\d\d$/, '20' + match);
            elConvert(el, /\d{4}/);
            
            elConvertFract(els[1], /\d+\.\d+/);
            
            el = document.querySelector('tr:nth-child(5)>.row1');
            elConvert(el, /\d\d?/);
            elConvert(el, /\d{4}/);
            if (tgmTime)
                elConvertTime(el, /\d\d:\d\d [AP]M/);
            
            el = document.querySelectorAll('.row1')[4];
            elConvert(el, /\d\d?/);
            elConvert(el, /\d{4}/);
            if (tgmTime)
                elConvertTime(el, /\d\d:\d\d [AP]M/);
            
            el = document.querySelectorAll('.row1')[12];
            elConvert(el, /\d\d?/);
            elConvert(el, /\d{4}/);
            
            el = document.querySelector('tr>.row1');
            elConvertFract(el, /\d\d?\.\d\d%/);
            el.innerHTML = el.innerHTML.replace('(  ', '( ' + zChars[0] + point + zChars[0] + zChars[0] + ' ');
        }
        else if (document.location.search.indexOf('act=Search') != -1) {
            els = document.querySelectorAll('.row4:nth-child(6), .row2:nth-child(7)');
            for (i = 0; i < els.length; i++)
                elConvert(els[i], /.+/);
            
            els = document.querySelectorAll('.row2:nth-child(8)');
            for (i = 0; i < els.length; i++) {
                el = els[i];
                elConvert(el, /\d\d?(?= )/);
                elConvert(el, /\d{4}/);
                if (tgmTime)
                    elConvertTime(el, /\d\d:\d\d [AP]M/);
            }
        }
        else if (document.location.search.indexOf('act=Msg') != -1) {
            els = document.querySelectorAll('.row1');
            for (i = 0; i < els.length; i++)
                elConvertFract(els[i], /\d{1,3}%/);
            
            els = document.querySelectorAll('.dlight>td:nth-child(4)');
            for (i = 0; i < els.length; i++) {
                el = els[i];
                elConvert(el, /\d\d?/);
                elConvert(el, /\d{4}/);
                if (tgmTime)
                    elConvertTime(el, /\d\d:\d\d [AP]M/);
            }
            
            elConvertGlobal(document.querySelector('i'), /\d+/g)
        }
    })();
})();