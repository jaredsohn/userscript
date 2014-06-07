// ==UserScript==
// @name        PySide Qt Document Links
// @namespace   qixinglu.com
// @description Add PySide/Qt document cross reference links
// @grant       none
// @include     http://qt-project.org/doc/qt-4.8/*.html*
// @include     http://srinikom.github.com/pyside-docs/PySide/*.html
// ==/UserScript==

function pyside_link() {
    var prefix = 'http://srinikom.github.com/pyside-docs/PySide/';
    var nodes = document.querySelectorAll('.product');
    var moduleName = nodes[1].textContent.trim();
    var objectName = nodes[2].textContent.replace('Class Reference', '').trim();
    var url = prefix + moduleName + '/' + objectName + '.html';
    var link = document.createElement('a');
    link.href = url;
    link.textContent = 'Pyside document page';
    var breadcrumb = document.querySelector('li.breadcrumbs-docscontainer');
    breadcrumb.replaceChild(link, breadcrumb.firstElementChild);
}

function qt_link() {
    var prefix = 'http://qt-project.org/doc/qt-4.8/';
    var objectName = document.querySelector('title').textContent.split(' ')[0];
    var url = prefix + objectName.toLowerCase() + '.html';
    var link = document.createElement('a');
    link.href = url;
    link.textContent = 'Qt document page';
    link.style.cssText = 'float: right; margin-right: 10px;';
    var h1Node = document.getElementsByTagName('h1')[0];
    h1Node.appendChild(link);
}

if (location.href.indexOf('qt-project.org') === -1) {
    qt_link();
} else {
    pyside_link();
}
