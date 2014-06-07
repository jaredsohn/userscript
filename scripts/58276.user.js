// ==UserScript==
// @name           Facebookenlarge
// @namespace      http://userscripts.org/users/23652
// @description    Enlarges pictures when you roll over them
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// @copyright      JoeSimmons
// @version        1.0.57
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        https://raw.github.com/joesimmons/jsl/master/versions/jsl-1.3.1.js
// @require        http://usocheckup.dune.net/58276.js
// @grant          GM_info
// @grant          GM_getValue
// @grant          GM_log
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// ==/UserScript==

/* CHANGELOG ////////////////////////////////////////

1.0.57 (4/6/2014)
    - fixed a problem with banners (on shared pages boxes) unable to be enlarged

1.0.56 (3/28/2014)
    - fixed a problem with hovering over the "Photos" thumbnail on a page
    - fixed a problem with some thumbnails on the "About" page

1.0.55 (3/22/2014)
    - fixed an issue where hovering over someone's cover photo wouldn't show it

1.0.54 (3/20/2014)
    - allowed enlarging of the banner picture above "Like Page" button
    - adapted to the newest JSL

1.0.53 (9/13/2013)
    - added more image compatibility

1.0.52 (9/12/2013)
    - updated the 'ispic' RegExp

1.0.51
    - fixed the 'ispic' RegExp. some pics weren't getting matched

1.0.50
    - fixed a bug wherein the preview wouldn't always display in the correct corner
    - fixed a bug wherein some pictures would display incorrectly
    - updated HQ pic getting methods so that it shows the biggest picture possible (without ajax)
    - added a method so that the preview would never overlap the mouse cursor
    - now middle & right clicking don't hide the preview, only left-clicking

1.0.49
    - fixed a regexp bug that would cause some pictures to not show
    - added an anonymous function wrapper
    - updated GM_addStyle check/function

*/ //////////////////////////////////////////////////




// By: Ian Williams and edited for Facebook by JoeSimmons

(function () { // anonymous function wrapper

    'use strict';

    var delay = 400,
        coords = {
            'x' : 0,
            'y' : 0
        },
        size = /([\d_]{5,})([_\/])[qstna]([_\.])?/i,
        ispic = /https?:\/\/((fbcdn-)?(profile|s?(photos|content)-\w|s(photos|content))((-\w+)+)?(\.ak|\.xx)?\.(fbcdn|akamaihd))\.net\/(.*\/)+.*([_\/][qstna]([\._])?)?.*(jpe?g|[tg]iff?|bmp|png)([?&][a-z]+=[a-zA-Z0-9]+)*/i,
        rFbexternal = /&(cfs|upscale)(=[^&]+)?/g,
        XbyX = /\w\d{2,4}x\d{2,4}\//,
        c = /\w(\d+\.)+\d+\//,
        app = /www\/app_full_proxy\.php/,
        show_d, // timeout holder
        docFrag = document.createDocumentFragment();

    function primeThumbs() {
        JSL('//a[@data-hovercard]/img/..').removeAttribute('data-hovercard');
    }

    // record mouse movement for positioning the preview images
    function handleMove(event) {
        coords.x = event.pageX - pageXOffset;
        coords.y = event.pageY - pageYOffset;
        event.stopPropagation();
    }

    function show(e, s) {
        var pop = JSL('#picPop'), // grab img holder
            x = coords.x,
            y = coords.y,
            isTop = !(y < (innerHeight / 2) ), // will the preview be on the top?
            isLeft = !(x < ( (innerWidth - 15 /* 15 is the scrollbar width, approx. */) / 2) ), // will the preview be on the left?
            fromSide = (isLeft ? (x - 25) : ( (innerWidth - 50) - x) ), // don't overlap the mouse cursor
            vert, hori;

        // make sure the preview doesn't show beyond the browser dimensions
        // or overlap the mouse cursor
        pop.css('max-width', fromSide + 'px');

        // set the preview's src
        pop.attribute('src', s);

        /*
        info(
            'innerWidth: ' + window.innerWidth + '\n\n' +
            'innerHeight: ' + window.innerHeight + '\n\n' +
            'scrollTop: ' + window.pageYOffset + '\n\n' +
            'scrollLeft: ' + window.pageXOffset + '\n\n' +
            'Mouse X: ' + x + '\n\n' +
            'Mouse Y: ' + y + '\n\n'
        );
        */

        vert = !(y < (window.innerHeight / 2) ) ? 'top' : 'bottom'; // should the preview be on the top or bottom
        hori = !(x < ( (window.innerWidth - 15) / 2) ) ? 'left' : 'right'; // should the preview be on the left or right

        // determine where the preview should display according to hovered image's position
        // ideally, as far away from the hovered image as possible

        // reset the position of the hover box
        pop.css('top', 'auto').css('right', 'auto').css('bottom', 'auto').css('left', 'auto');

        // set the corner it will appear in
        pop.css(vert, '0').css(hori, '0');

        // show the preview
        pop.show('block');
    }

    function handleMouseover(event) {
        var t = event.target,
            tag = t.tagName.toLowerCase(),
            style = t.getAttribute('style'),
            _class = t.className,
            src = style && style.match(ispic) ? t.getAttribute('style') : unescape(t.src),
            imgExist = JSL('./img | ./i | ./div/img | ./span/img', t),
            odd = JSL('./../img | ./../i | ./../../div[@class="detail"]/i[@class="photo" and contains(@style, "background-image")]', t),
            ohoe = JSL('./ancestor::a[( contains(@href, "oh=") and contains(@href, "oe=") ) or ( contains(@href, "oh%3D") and contains(@href, "oe%3D") )]', t),
            hqImg;

        // sometimes the hovered element can be a parent element of the actual thumbnail element
        if (imgExist.exists) {
            t = imgExist[0];
            src = unescape(t.src);
            tag = t.tagName.toLowerCase();

            if ( src.indexOf('fbexternal') !== -1 && src.match(ispic) ) {
                src = src.match(ispic)[0].replace(rFbexternal, '');
            }
        }

        if (ohoe.exists) {
            src = decodeURIComponent( ohoe.attribute('href') ).split('&src=')[1].split('&smallsrc=')[0];
        }

        // support for elements that when hovered over, aren't the image itself
        // or it's an element where it displays the image by css' background-image
        if ( tag === 'div' && (['coverBorder', 'mat'].indexOf(_class) !== -1) ) {
            if (odd.exists) {
                t = odd[0];
                tag = t.tagName.toLowerCase();
                style = t.getAttribute('style');

                if (tag === 'i' && typeof style === 'string' && style.indexOf('background-image') !== -1) {
                    src = style.match(ispic)[0];
                } else {
                    src = unescape(t.src);
                }
            }
        }

        if ( ['img', 'i'].indexOf(tag) !== -1 && src.match(ispic) ) {
            if (tag === 'img' && src.match(app) ) src = src.match(ispic)[0];
            hqImg = ohoe.exists ? src : hq(t, tag, src);
            if ( src.match(size) ) {
                new Image().src = hqImg; // pre-load image
            }
            src = hqImg;

            // show the image if it's indeed a facebook thumbnail
            show_d = setTimeout(show, delay, t, src);
        } else if ( tag === 'div' && t.className == 'UIMediaItem_PhotoFrame' && t.parentNode.parentNode.parentNode.getAttribute('style').match(ispic) ) {
            hqImg = hq(t, tag);
            new Image().src = hqImg; // pre-load image
            src = hqImg;

            // show the image if it's indeed a facebook thumbnail
            show_d = setTimeout(show, delay, t, src);
        }

        event.stopPropagation();
    }

    function hidePicPop(event) {
        var picPop = JSL('#picPop');

        if (typeof event.which === 'number' && event.which > 1) { return; }

        clearTimeout(show_d);

        picPop.hide();
        picPop.removeAttribute('src');

        event.stopPropagation();
    }

    function hq(e, tag, src) {
        var r = '', style = e.getAttribute('style');

        switch (tag) {
            case 'div': {
                r = e.parentNode.parentNode.parentNode.getAttribute('style').match(ispic)[0];
                break;
            }

            case 'img': case 'i': {
                if ( typeof style === 'string' && style.match(ispic) ) {
                    r = style.match(ispic)[0];
                } else if (typeof src === 'string') {
                    r = src;
                } else {
                    r = e.src;
                }

                break;
            }
        }

        return r.replace(XbyX, '').replace(c, '').replace(size, '$1$2n$3');
    }

    function info(i) {
        var info = JSL('#infoBox');

        i = (i + '').replace(/[\n\r]/g, '\n<br />\n');

        info.show('block').prop('innerHTML', i);
    }

    // Make sure the page is not in a frame
    if (window.self !== window.top) { return; }

    JSL.addStyle('' +
        '#picPop { ' +
            'z-index: 99999; ' +
            'position: fixed; ' +
            'background: #000000; '+
            'overflow: hidden; ' +
            'border: 2px solid #000000; ' +
            'outline: 2px solid #FFFFFF; ' +
            'max-height: 98%; ' +
        '}\n\n' +
        '.HovercardOverlay, ._5uek, ._7m4, ._8xh, #fbProfileCover .coverBorder { ' +
            'display: none !important; ' +
        '}' +
    '');

    // add the info box
    docFrag.appendChild( JSL.create('span', {id: 'infoBox', style: 'border: 1px solid #666666; border-radius: 6px; position: fixed; top: 4px; left: 45%; font-size: 10pt; font-family: sans-serif, arial; background: #EEEEEE; color: #000000; padding: 10px; z-index: 999999; overflow: auto; display: none;'}) );

    // add the hovering bigger image holder
    docFrag.appendChild( JSL.create('img', {id: 'picPop', style: 'display: none;', 'class':'hover_img_thumb'}) );

    document.body.appendChild(docFrag);

    // keep tabs on where the mouse is so we never problems with the positioning of the preview
    window.addEventListener('mousemove', handleMove, false);

    // hover over a thumbnail
    window.addEventListener('mouseover', handleMouseover, false);

    // hide the preview when moving the mouse off a thumbnail
    window.addEventListener('mouseout', hidePicPop, false);

    // hide the preview when left-clicking
    window.addEventListener('click', hidePicPop, false);

    primeThumbs();
    JSL.setInterval(primeThumbs, 1000);

}());