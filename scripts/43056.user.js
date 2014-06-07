// ==UserScript==
// @name          /b/ackwash inlined + GreaseKit
// @description   Port of tkirby's script for GreaseKit (Safari)
// @version       9000.2
// @author        tkirby, aeosynth, VIPPER + !49Xm1d8ZeQ
// @include       http://*.4chan.org/*/res/*.html*
// @include       http://4chanarchive.org/*/dspl_thread.php5*
// @include       http://suptg.thisisnotatrueending.com/archive/*
// ==/UserScript==

// Copyright (c) 2009, Todd Kirby
// Released under the GNU General Public License
// http://www.gnu.org/copyleft/gpl.html

const op = window.location.search.match(/\d+/) || window.location.pathname.match(/\/(\d+)/)[1];

const tip = document.createElement('div');
tip.id = 'bw-tooltip';
tip.setAttribute('style', 'display: none; position:absolute; border:1px solid #AAA; background-color:#FFF');
tip.innerHTML = '<table><tr><td id="bw-tipcell" style="padding: 10px"></td></tr></table>';
document.body.appendChild(tip);

show = "const td = document.getElementById('bw-tipcell'); td.innerHTML = @tiphtml@; td.className = @tipclass@; td.removeChild(td.getElementsByTagName('input')[0]); this.onmousemove(event); document.getElementById('bw-tooltip').style.display = 'block';";

track = "const TIP_X_OFFSET = 45, TIP_Y_OFFSET = 120; const tip = document.getElementById('bw-tooltip'); const tip_height = parseInt(document.defaultView.getComputedStyle(tip, '').getPropertyValue('height')); const cursor_rel_y = event.pageY - window.scrollY; const tip_abs_bottom = event.pageY - TIP_Y_OFFSET + tip_height; const vp_bottom = window.scrollY + window.innerHeight; tip.style.top = cursor_rel_y < TIP_Y_OFFSET || tip_height > window.innerHeight ? event.pageY - cursor_rel_y : tip_abs_bottom > vp_bottom ? event.pageY - TIP_Y_OFFSET - (tip_abs_bottom - vp_bottom) : event.pageY - TIP_Y_OFFSET + 'px'; tip.style.left = event.pageX + TIP_X_OFFSET + 'px';";

var k = document.getElementsByClassName('quotelink');
for(var i = 0; i < k.length; i ++) {
    var qt = k[i];
    tipclass = ''; tiphtml = '';
    if (! (id = qt.hash.split('#')[1]) ) return;
    if (id == op) {
        qt.innerHTML += ' (OP)';
        tiphtml = 'document.body.innerHTML.match(/<span class="filesize">[^]+?<\\/blockquote>/)';
        tipclass = '';
    } else if (!document.getElementById(id)) {
        qt.innerHTML += ' (Duckroll?)';
        return;
    } else {
        tiphtml = 'document.getElementById(' + id + ').innerHTML';
        tipclass = 'replyhl';
    }
    qt.setAttribute('onmouseout', "document.getElementById('bw-tooltip').style.display='none'"); 
    qt.setAttribute('onmousedown', "document.getElementById('bw-tooltip').style.display='none'"); 
    qt.setAttribute('onmouseover', show.replace("@tiphtml@", tiphtml).replace('@tipclass@', tipclass));
    qt.setAttribute('onmousemove', track);
}