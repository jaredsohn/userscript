// 4chanZoomPics
// version 0.1 BETA!
// 2009-02-25
// Copyright (c) 2009, DrSprocket
// Released under the GNU General Public License
// http://www.gnu.org/copyleft/gpl.html
//
//
// The code for the generation of the popup was taken from the /b/ackwash script:
// http://userscripts.org/scripts/show/25876
//
//
// ==UserScript==
// @name           4chanZoomPics
// @namespace      none
// @description    Shows the full size image on 4chan when mouse is hovered over the preview image.*"THE-(AT)(INCLUDES NUMBERED1,2,3,4,7, AND 8 WERE ADDED-IN TO THIS SCRIPT BY MERC.
// @include        http://boards.4chan.org/*
// @include        http://dis.4chan.org/*
// @include        http://4chanarchive.org/brchive/*
// @include        http://suptg.thisisnotatrueending.com/archive/*
// @include       http://*.4chan.org/*/res/*.html*
// @include       http://*.4chan.org/*/*.html*
// @include       http://*.4chan.org/*/*
// @include       http://lchan.org/*
// ==/UserScript==


const TIP_X_OFFSET = 45, TIP_Y_OFFSET = 120;
const MAX_HEIGHT = 600, MAX_WIDTH = 800;

const tip = document.createElement('div');
tip.id = 'zoompics_tooltip';
tip.setAttribute('style', 'display: none; position:absolute; border:1px solid #AAA; background-color:#FFF');
tip.innerHTML = '<table><tr><td id="zoompics_tipcell" style="padding: 3px"></td></tr></table>';
document.body.appendChild(tip);


var imgs = document.evaluate("//img[@md5]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); 

for(var i = 0, img = null; img = imgs.snapshotItem(i++); ) {
    img.parentNode.setAttribute('onmouseover', 'zoompics_show(this, event)');
    img.parentNode.setAttribute('onmouseout', 'zoompics_hide()');
    img.parentNode.setAttribute('onmousedown', 'zoompics_hide()');
    img.parentNode.setAttribute('onmousemove', 'zoompics_track(event)');

    var preloadimg = document.createElement('div');
    preloadimg.setAttribute('style', 'display: none; position:absolute; border:1px solid #AAA; background-color:#FFF');
    preloadimg.innerHTML = "<img src='" + img.parentNode.getAttribute("href") + "'>";
}



unsafeWindow.zoompics_hide = function() { 
    document.getElementById('zoompics_tooltip').style.display = 'none';
}

unsafeWindow.zoompics_show = function(me, e) {
    const td = document.getElementById('zoompics_tipcell');

    var theimage = document.createElement('img');
    theimage.setAttribute('src', me.getAttribute("href"));
    var fullwidth = parseInt(me.previousSibling.previousSibling.textContent.match(/ ([0-9]+)x[0-9]+/)[1]);
    var fullheight = parseInt(me.previousSibling.previousSibling.textContent.match(/ [0-9]+x([0-9]+)/)[1]);
    if ( (fullwidth > MAX_WIDTH) || (fullheight > MAX_HEIGHT) ) {
        var zoomfactor = Math.max(fullwidth / MAX_WIDTH, fullheight / MAX_HEIGHT);
        theimage.setAttribute('height', fullheight / zoomfactor);
        theimage.setAttribute('width', fullwidth / zoomfactor);
    }
    td.innerHTML = "";
    td.appendChild(theimage);

    //td.innerHTML = "<img src='" + me.getAttribute("href") + "'>";

    unsafeWindow.zoompics_track(e);

    document.getElementById('zoompics_tooltip').style.display = 'block';
}

unsafeWindow.zoompics_track = function(e) {
    const tip = document.getElementById('zoompics_tooltip');

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

