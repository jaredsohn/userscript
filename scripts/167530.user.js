// ==UserScript==
// @name       pnImg
// @namespace  http://eepp.ca/
// @version    0.2
// @description  Go to previous/next image based on current URL
// @match      *://*/*
// @copyright  2013+, Philippe Proulx
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

// http://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
function pnImgPad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function pnImgGoto(match, newInt, nb) {
    var suf = pnImgPad(newInt, nb);
    window.location.href = match[1] + '/' + match[2] + suf + '.' + match[4];
}

$(document).ready(function() {
    var loc = window.location.href;
    var regex = /^(.*)\/([^\/]+?)(\d+)\.(jpg|jpeg|png|bmp)$/i;
    var match = loc.match(regex);
    if (!match) {
        return;
    }
    var int = parseInt(match[3]);
    var nb = match[3].length;
    var btnPrev = (int > 0) ? '<button style="font-size: 24px; font-weight: bold;" id="pnimg-prev">&larr;</button>' : '';
    var btnNext = ((int + 1).toString().length <= nb) ? '<button style="font-size: 24px; font-weight: bold;" id="pnimg-next">&rarr;</button>' : '';
    $('body').prepend('<div style="margin-bottom: 10px;">' + btnPrev + btnNext + '</div>');
    $('#pnimg-prev').click(function() {
        pnImgGoto(match, int - 1, nb);
    });
    $('#pnimg-next').click(function() {
        pnImgGoto(match, int + 1, nb);
    });
});
