// ==UserScript==
// @name          CSS Colors Contrast
// @description   Set appropriate font color (black or white) for a given background on Douglas Crockford's CSS Colors Names Table
// @include       http://*crockford.com/wrrrld/color.html
// @license       BSD License; http://sandbox.javascriptrules.com/license.txt
// @version       0.0.1
// @author        Marcel Duran
// @homepage      http://www.javascriptrules.com/
// ==/UserScript==

/*
Color contrast algorithm
http://www.w3.org/WAI/ER/WD-AERT/#color-contrast
*/

(function () {
    var i, len, td, rgb, m, r, g, b, bright,
        re = /rgb\((\d+), (\d+), (\d+)\)/,
        tr = document.getElementsByTagName("tr");

    for (i = 0, len = tr.length; i < len; i += 1) {
        td = tr[i].lastChild.cloneNode(true);
        tr[i].appendChild(td);
        rgb = window.getComputedStyle(td, '').backgroundColor;
        m = re.exec(rgb);
        r = parseInt(m[1], 10);
        g = parseInt(m[2], 10);
        b = parseInt(m[3], 10);
        bright = (r*299 + g*587 + b*114) / 1000;
        td.style.color = (bright > 125 ? 'black' : 'white');
    }
}());
