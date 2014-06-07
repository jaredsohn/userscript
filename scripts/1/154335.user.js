// ==UserScript==
// @name        translateChineseToEnglish
// @grant       GM_xmlhttpRequest
// @namespace   passionke.com
// @description translate Chinese To English
// @include     *
// @version     1
// ==/UserScript==

document.addEventListener('keydown', function(e) {
    console.log(e.altKey)
    if (e.altKey) {
        var s = window.getSelection();
        var data = {
            client: 't',
            text: s.toString(),
            hl: 'en',
            sl: 'en',
            tl: 'zh-CN',
            ie: 'UTF-8',
            oe: 'UTF-8',
            multires: 1,
            otf: 1,
            pc: 1,
            ssel: 5,
            tsel: 5
        };
        var formatURL = function(data) {
            var objps = [];
            var str;
            for (var key in data) {
                if (data[key]) {
                    objps.push(key + '=' + data[key]);
                }
            }
            if (objps.length > 0) {
                str = '?' + objps.join('&');
            }
            return str;
        }
        if (s.toString() != undefined && s.toString() != '') {
            GM_xmlhttpRequest({
                method: 'GET',
                url: 'http://translate.google.cn/translate_a/t' + formatURL(data),
                onload: function(responseDetails) {
                    var a = eval(responseDetails.responseText);
                    var str = '';
                    a[0].forEach(function(el, index) {
                        str += el[0];
                    });
                    var el = document.createElement('span');
                    el.innerHTML = '<br ><br >' + str;
                    el.style.color = 'red';
                    s.anchorNode.insertBefore(el, null);
                }
            });
        }
    }
});
