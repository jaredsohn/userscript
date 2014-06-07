// ==UserScript==
// @name          add add_hb link
// @namespace     http://hp.vector.co.jp/authors/VA024182/
// @description   add add_hatena_bookmark link in bottom
// @include       *
// ==/UserScript==

function addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

title = document.getElementsByTagName('title');
if (!title.length) { return; }

hburl='http://b.hatena.ne.jp/add?mode=confirm&title=' +
	escape(document.title) + '&url=' +
	escape(document.location.href);
var bd, newa, hbIcon;
hbIcon = document.createElement('img');
hbIcon.src = 'http://b.hatena.ne.jp/images/append.gif';
hbIcon.alt = '!b';
hbIcon.title = '+ ' + document.title;
hbIcon.hspace = 5;
newa = document.createElement('a');
newa.href = hburl;
newa.appendChild(hbIcon);

var div;
div = document.createElement('div');
div.id = 'bottomfix';
div.appendChild(newa);

window.addEventListener(
    "load",
    function() {
        document.body.appendChild(div);
    },
    true);


addStyle(
'#bottomfix {'+
'  position: fixed;' +
'  left: 0;' +
'  right: 0;' +
'  bottom: 0;' +
'  top: auto;' +
'}' +
'#bottomfix a {' +
'  float: left;' +
'  background-color: transparent;' +
'  color: blue;' +
'}');

//
// ChangeLog
// 2006/12/28
// 2006/12/29 left 