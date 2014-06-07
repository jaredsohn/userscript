// ==UserScript==
// @name        muyuge.com
// @namespace   clumsyman
// @description prevent openning new window/tab for reader op links
// @include     http://muyuge.com/*/*.html
// @version     2
// @grant       unsafeWindow
// ==/UserScript==

var links = document.querySelectorAll('ul.readertop>a[target=_blank]');
for(var i = 0; i < links.length; i++) {
    links[i].removeAttribute('target');
}
links = document.querySelectorAll('.readerFooterPage>a[target=_blank]');
for(var i = 0; i < links.length; i++) {
    links[i].removeAttribute('target');
}

function setOption(dropdown, index, text, value) {
    if (dropdown.options.length <= index) {
        dropdown.add(new Option(text, value));
    } else {
        if (dropdown.options[index].text != text) {
            dropdown.options[index].text = text;
        }
        if (dropdown.options[index].value != value) {
            dropdown.options[index].value = value;
        }
    }
}

var dropdown = document.querySelector('select#fonttype');
if (dropdown) {
    dropdown.options[0].value = '';
    dropdown.options[1].value = 'inherit';
    setOption(dropdown, 2, '小号', 'small');
    setOption(dropdown, 3, '中号', 'medium');
    setOption(dropdown, 4, '大号', 'large');
}
var dropdown = document.querySelector('select#bcolor');
if (dropdown) {
    dropdown.options[0].value = '';
    dropdown.options[1].value = 'inherit';
}
unsafeWindow.loadSet();
