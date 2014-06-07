// Version 1.1
// (c) Sergei Stolyarov 
// Released under the GPL
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name           HTML Editbox clear button
// @namespace      http://regolit.com
// @description    Adds small button (cross sign) to each <input type=text> element of the page, click on that button clears corresponding editbox.
// @include        http://*
// @include        https://*
// ==/UserScript==

/**
 * Changelog
 *
 * v1.1
 *   * 'cross' character replaced with 'cross' image.
 *   * stability fixes
 *
 * v1.2
 *   * more stability fixes
 */

Element.prototype.cumulativeTop = function()
{
    element = this;
    var valueT = 0;
    do {
        valueT += element.offsetTop  || 0;
        element = element.offsetParent;
    } while (element);

    return valueT;
};

Element.prototype.cumulativeLeft = function()
{
    element = this;
    var valueL = 0;
    do {
        valueL += element.offsetLeft  || 0;
        element = element.offsetParent;
    } while (element);

    return valueL;
};

(function ()
{
    var editboxes = document.getElementsByTagName('INPUT');
    var len = editboxes.length;
    var i;
    var child;
    for (i=0; i<len; i++) {
        var e = editboxes[i];
        if ('text' != e.type) {
            continue;
        }
        // add small button [c]
        var t = document.createElement('IMG');
        t.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gGAwUoLigMDyIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAj0lEQVQY023PQQoBcRzF8U9ZmZQDyGayUjaycglZWFBTzuBAchMb2TgDYzMppSQWasLCf2po3uZXr2%2Fv%2FV7NV9Nwz341xwMiZDihUwISvLEsjB4uOKKNMXKsUS9HD3BDiie2aKjQIlTkiKuAIe7Yh6QdmmWgjysOaGEU0jZFZRSWZX8VM7ywKowJuhUvJIg%2FJNseHT2vzeYAAAAASUVORK5CYII%3D'; // 9x9 pixels
        t.title = 'Reset edit box.';
        t.style.cursor = 'hand';
        t.style.display = 'inline';
        t.width = 9;
        t.height = 9;
        t.onclick = function () { this.targetBox.value=''; this.targetBox.focus(); };
        t.onmouseover = function() { this.style.border='1px solid red'; }
        t.onmouseout = function() { this.style.border='1px solid transparent'; }

        t.targetBox = e;
        t.style.position = 'absolute';
        t.style.overflow = 'hidden';
        t.style.border = '1px solid transparent';
        t.style.clip = 'shape';
        t.style.zIndex = '1000';
        t.style.marginLeft = '2px';
        //t.style.visibility = 'visible';
        t.targetBox = e;
        //t.style.fontFamily = 'sans-serif';
        //t.style.fontSize = '10pt';
        
        //e.appendChild(t);
        e.parentNode.insertBefore(t, e);
        ty = (e.clientHeight - 7) / 2;
        t.style.top = (e.cumulativeTop() + ty) + 'px';
        t.style.left = e.cumulativeLeft() + 'px';

        e.style.paddingLeft = 2 + t.clientWidth + 'px';
    }
})();
