// /b/ackwash Krautchan edition
// version 0.1 BETA!
// 2009-04-06
// Copyright (c) 2009, DrSprocket
// Released under the GNU General Public License
// http://www.gnu.org/copyleft/gpl.html
//
//
// Version of the /b/ackwash script that works for krautchan.
// Original script is here: http://userscripts.org/scripts/show/25876
//
//
// ==UserScript==
// @name           /b/ackwash Krautchan edition
// @namespace      none
// @description    Add tooltips to replies (>>) in krautchan threads to show what the reply is referencing.
// @include        http://www.krautchan.net/*/*.html*
// @include        http://krautchan.net/*/*.html*
// ==/UserScript==


const TIP_X_OFFSET = 45, TIP_Y_OFFSET = 120;

ops = document.evaluate("//div[starts-with(@id, 'thread')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
opdiv = ops.snapshotItem(0);
const op = opdiv.id.match(/\d+/);

const tip = document.createElement('div');
tip.id = 'backwash_tooltip';
tip.setAttribute('style', 'display: none; position:absolute; border:1px solid #AAA; background-color:#FFF');
tip.innerHTML = '<table><tr><td id="backwash_tipcell" style="padding: 10px"></td></tr></table>';
document.body.appendChild(tip);

const qts = document.evaluate("//a[starts-with(@onclick, 'highlightPost') and not(@class)]", document, 
        null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i = 0, qt = null; qt = qts.snapshotItem(i++); ) {
    if (! (id = qt.hash.split('#')[1]) ) return;

    if (id == op) {
        qt.innerHTML += ' (OP)';
    } else if (!document.getElementById("post-" + id)) {
        qt.innerHTML += ' (Duckroll?)';
        continue;
    }

    qt.setAttribute('onmouseover', 'backwash_show(this, event)');
    qt.setAttribute('onmouseout', 'backwash_hide()');
    qt.setAttribute('onmousedown', 'backwash_hide()');
    qt.setAttribute('onmousemove', 'backwash_track(event)');
}

unsafeWindow.backwash_hide = function() { 
    document.getElementById('backwash_tooltip').style.display = 'none';
}

unsafeWindow.backwash_show = function(me, e) {
    const id = me.hash.split('#')[1];
    const td = document.getElementById('backwash_tipcell');

    if (id == op) {
        postbox = "";
        curdiv = opdiv.firstChild;
        while(curdiv.className!="file_thread") {
            curdiv = curdiv.nextSibling;
        }
        postbox += '<div class="file_thread">' + curdiv.innerHTML + '</div>';
        while(curdiv.className!="postbody") {
            curdiv = curdiv.nextSibling;
        }
        postbox += '<div class="postbody">' + curdiv.innerHTML + '</div>';
        td.innerHTML = postbox;         
        td.className = 'postreply';
    } else {
        td.innerHTML = document.getElementById("post-" + id).innerHTML;
        td.removeChild(td.getElementsByClassName('postheader')[0]);
        td.className = 'postreply';
    }

    unsafeWindow.backwash_track(e);
    document.getElementById('backwash_tooltip').style.display = 'block';
}

unsafeWindow.backwash_track = function(e) {
    const tip = document.getElementById('backwash_tooltip');

    const tip_height = parseInt(
            document.defaultView.getComputedStyle(tip, '').getPropertyValue('height'));
    const cursor_rel_y = e.pageY - window.scrollY;
    const tip_abs_bottom = e.pageY - TIP_Y_OFFSET + tip_height;

    const vp_height = window.innerHeight;
    const vp_bottom = window.scrollY + vp_height;

    tip.style.top = cursor_rel_y < TIP_Y_OFFSET || tip_height > vp_height ? e.pageY -  cursor_rel_y :
                tip_abs_bottom > vp_bottom ? e.pageY - TIP_Y_OFFSET -(tip_abs_bottom - vp_bottom) : 
                e.pageY - TIP_Y_OFFSET + 'px';

    tip.style.left = e.pageX + TIP_X_OFFSET + 'px';
}