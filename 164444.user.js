// ==UserScript==
// @name        LT Cover Navigation - LibraryThing
// @namespace   http://userscripts.org/users/brightcopy
// @include     http*://*.librarything.tld/work/*/covers*
// @version     2
// ==/UserScript==

function create(tag) {
    var children = [];
    var attributes = {};
    var parent;

    for (var i = 1; i < arguments.length; i++) {
        var arg = arguments[i];

        if ('length' in arg) {
            children = arg;
        }
        else if ('nodeType' in arg) {
            parent = arg;
        }
        else if (typeof(arg) === 'object') {
            attributes = arg;
        }
    }

    var e = document.createElement(tag);
    var f;

    if ('events' in attributes) {
        for (f in attributes.events) {
            e.addEventListener(f, attributes.events[f]);
        }
        delete attributes.events;
    }

    for (f in attributes) {
        e.setAttribute(f, attributes[f]);
    }

    for (i = 0; i < children.length; i++) {
        e.appendChild(children[i]);
    }

    if (parent !== undefined) {
        parent.appendChild(e);
    }

    return e;
}

function text(value) {
    return document.createTextNode(value);
}

GM_addStyle('#LT_LB { overflow:hidden; border:none !important; height:100% !important; width:100% !important; top:0 !important; left:0 !important }');

GM_addStyle('#LT_LB_content { overflow-y:scroll; height:100%; padding:0 !important }');
GM_addStyle('#LT_LB_content div.alwaysblue { display:inline-block; margin-bottom: 1em !important; }');
GM_addStyle('#LT_LB_content table { height:100% }');
GM_addStyle('#LT_LB_content table tr td:first-child img { display:none }');

GM_addStyle('#close { right:22px !important; background-color:white }');

GM_addStyle('#ltCoverDiv { position:absolute; height: 100%; top:0; width:50%; text-align:center; display:table }');
GM_addStyle('#ltCoverDiv > div { display:table-cell; vertical-align:middle }');
GM_addStyle('#ltCoverDiv > div > img { border: 2px solid white }');
GM_addStyle('#ltCoverDiv > div > img:hover { border: 2px solid gray }');
GM_addStyle('#ltCoverSpinnerDiv { background-color: white; position:absolute; top:0; height:100%; width:50%; text-align:center; display:table }');
GM_addStyle('#ltCoverSpinnerDiv > div { display:table-cell; vertical-align:middle }');
GM_addStyle('#ltCoverShortcuts { margin-right:240px !important; color: gray; font-size: 0.75em; text-align: center }');
GM_addStyle('#ltCoverShortcuts > span { cursor:pointer; background-color: #E4E4E4; color: #3D3D3D; padding: 3px 5px; border-radius: 4px; line-height: 2.5em; }');

GM_addStyle('.coverinfo { width: 50%; padding-top: 10px; }');

GM_addStyle('#ltCoverNavButtons { position:absolute; top:10px; right:85px; font-size:6pt; color:gray; text-align:center; background-color: white }');
GM_addStyle('#ltCoverNavButtons div { display:inline-block; font-size:6pt; color:gray; text-align:center }');

GM_addStyle('#ltCoverNavButtons p, #ltCoverNavButtons img { cursor:pointer; text-align:center }');
GM_addStyle('#ltCoverNavMiddleImage { cursor:default !important }');

GM_addStyle('#ltCoverNavButtons, #ltCoverNavButtons * { user-select:none; -webkit-touch-callout: none;' +
    '-webkit-user-select: none; -moz-user-select: none }');

GM_addStyle('#jumpList img { cursor:pointer }');
GM_addStyle('#jumpList { line-height: 0; opacity: 0; visibility: hidden; -webkit-transition: visibility 0.2s linear, opacity 0.2s linear; -moz-transition: visibility 0.2s linear, opacity 0.2s linear; -o-transition: visibility 0.2s linear, opacity 0.2s linear; }');
GM_addStyle('#jumpList.showing { visibility: visible; opacity: 1; }');
GM_addStyle('#jumpList div { display:inline-block; vertical-align:top; text-align:center; border: 2px solid gray; cursor:pointer }');
GM_addStyle('#jumpList a { vertical-align:middle; text-decoration:none }');

GM_addStyle('.jumpListMembers img { height:30px; min-height: 1.1em }');
GM_addStyle('.jumpListMembers div { height:26px; min-height: 1em; margin-left: 4px }');
GM_addStyle('.jumpListMembers div a { line-height:26px; margin: 0 2px }');
GM_addStyle('.jumpListAmazon img { height:25px; min-height: 1.1em }');
GM_addStyle('.jumpListAmazon div { height:21px; min-height: 1em; margin-left: 4px }');
GM_addStyle('.jumpListAmazon div a { line-height:21px; margin: 0 2px }');

GM_addStyle('#coverlist_all .cover { cursor:pointer }');

GM_addStyle('.thisbook, .thisbook a { font-weight:bold; color:green !important }');

var AMAZON_COVERS = 'am';
var MEMBER_COVERS = 'cc';

var lastBrowserDimensions = {width:0, height:0};
var nowhere = 'javascript:void(0)';
var bookISBN = '';
var pickedcover;
var lastCoverLength = 0;
var moreLinkMembers;
var moreLinkAmazon;
var leftArrow = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAyCAIAAADTHmxxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv' +
    '8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAACySURBVEhL7dY7DoUgEEZhvOti+eyLe4xEFHnMP42Np4BQfMlkKracc/D2K7erD4u9gVNKnB58SJLx' +
    'KUnDV0kCbiRZ8VOSCXclrfFI0gJPJM3wXNIQLyX1sUVSBxsltdgu6YYlSRWrkgp2SNqxT9KOY4zHQ62M7fN1YQ5fMan+hknyLSa772Ay+j4mix9iW' +
    'voZprlfYJr4NaaRN2HqeiumpxcwNV7DdPUyptN/30ext3AIf1D4O6k/PhUdAAAAAElFTkSuQmCC';
var rightArrow = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAyCAYAAABcfPsmAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw' +
    'v8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAADASURBVFhH7dc5DsMgEEBRknNxfO6V5Fux5WWA2Zoo/s2I5oml4vH6VBJ7fmdaNxjvR8DW2rLIaNt' +
    'hFno4cgZ6ucMoKj5KBBVB8qJdkDzoECQrOgXJgqpA0qJqkDSoCaQZagZphLpA6qFukCQ0BNIZDYO0R1NAWtE0sNa6zBRwxSgM7jEKgWeM3KCEkQvs' +
    'YWQGRxiZwBlGalCDkQrUYjQFLRgNQStGXdCDkQh6MbqAEYwOYBSjDczA6P6axfs7sJQ3X2Y9pxluCksAAAAASUVORK5CYII=';
var spinner = 'data:image/gif;base64,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' +
    'gIIZCIB9ZIB5Rgp2KAmKEQA7';

var lastCoverID = null;
var originalStyle;
var original_si_info = unsafeWindow.si_info;
var original_load_coverlist = unsafeWindow.load_coverlist;
var originalChangeCover = unsafeWindow.changeCover;
var originalLBShowHide = unsafeWindow.LibraryThing.lightbox.showhide;
var originalLBOff = unsafeWindow.LibraryThing.lightbox.off;

var switchCoverImgDoneTO;
var adjustCoversTO;
var switchCoverImgTO;
var changeLightboxTO;

function nlToArray(list) {
    return Array.prototype.slice.call(list, 0);
}

function nlIndexOf(list, item) {
    return nlToArray(list).indexOf(item);
}

function nlIndexOfId(list, id) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            return i;
        }
    }

    return -1;
}

function getCovers(filter) {
    var pickedcoverDiv = unsafeWindow.$$('.pickedcover').pop();
    pickedcover = pickedcoverDiv === undefined ? undefined : pickedcoverDiv.id;

    var covers = [];
    var allcovers = unsafeWindow.$$('.cover');
    for (var i = 0; i < allcovers.length; i++) {
        var cover = allcovers[i];

        if (filter === undefined || cover.id.substring(0, filter.length) === filter) {
            covers.push(cover);
        }
    }

    return covers;
}

function getCoverImage(cover) {
    var imgs = cover.getElementsByTagName('img');
    return imgs.length === 0 ? undefined : imgs[0].getAttribute('src');
}

function getCoverInfo() {
    return document.getElementsByClassName('coverinfo')[0];
}

function coverThumbnailClicked(evt) {
    evt.preventDefault();
    var e = evt.target;
    if (e.className !== 'cover') {
        e = e.parentNode;
    }
    unsafeWindow.selectedCoverID = e.id;
    coverclick();
}

function adjustCovers() {
    var covers = getCovers();

    if (unsafeWindow.$('coverlist_all').childNodes.length !== 1 && covers.length !== lastCoverLength) {
        for (var i = 0; i < covers.length; i++) {
            covers[i].removeEventListener('click', coverThumbnailClicked, false);
            covers[i].addEventListener('click', coverThumbnailClicked, false);
        }

        lastCoverLength = covers.length;

        if (pickedcover !== undefined) {
            var pickedcoverDiv = document.getElementById(pickedcover);

            var p = pickedcoverDiv.parentNode;
            if (p.firstChild !== pickedcoverDiv) {
                p.removeChild(pickedcoverDiv);
                p.insertBefore(pickedcoverDiv, p.firstChild);
            }
        }

        jumpList.innerHTML = ''; // clear it out so it will show next time
        if (isJumpListShowing()) {
            createJumpList(); // to refresh when show all covers link is clicked from jumpList
        }

        adjustCoversTO = resetTimeout(adjustCoversTO);
    }
    else {
        adjustCoversTO = resetTimeout(adjustCoversTO, adjustCovers, 100);
    }
}

function gotoCover(direction, section) {
    switchCoverImgDoneTO = resetTimeout(switchCoverImgDoneTO);
    adjustCoversTO = resetTimeout(adjustCoversTO);
    switchCoverImgTO = resetTimeout(switchCoverImgTO);
    changeLightboxTO = resetTimeout(changeLightboxTO);

    var covers;
    var newid;
    var i;

    if (typeof(direction) === 'string') {
        newid = direction;
    }
    else if (section === undefined) {
        covers = getCovers();
        i = nlIndexOfId(covers, lastCoverID);
        newid = covers[(i + direction + covers.length) % covers.length].id;
    }
    else if (direction === 0) { // user covers
        covers = getCovers(MEMBER_COVERS);
        if (covers.length !== 0) {
            newid = covers[0].id;
        }
    }
    else if (direction === 1) { // amazon covers
        covers = getCovers(AMAZON_COVERS);
        if (covers.length !== 0) {
            newid = covers[0].id;
        }
    }
    else if (direction === 2) { // your cover
        newid = pickedcover;
    }

    if (newid !== undefined && newid !== unsafeWindow.selectedCoverID) {
//        unsafeWindow.LibraryThing.lightbox.off();
        unsafeWindow.selectedCoverID = newid;
        coverclick();
    }
}

function previousCover(evt) {
    gotoCover(-1);
    evt.preventDefault();
}

function nextCover(evt) {
    gotoCover(1);
    evt.preventDefault();
}

var coverDiv = document.createElement('div');
unsafeWindow.coverDiv = coverDiv;

function gotCoverInfo(t) {
    coverDiv.innerHTML = t.responseText;
}

function coverclick(coverid) {
    var rv;
    try {
        if (typeof coverid === 'undefined') {
            lastCoverID = unsafeWindow.selectedCoverID;
            changeLightboxTO = resetTimeout(changeLightboxTO, changeLightbox, 100);
        }
    } finally {
        rv = original_si_info.apply(this, arguments);
    }

    return rv;
}

function createNav() {
    create('div', unsafeWindow.LibraryThing.lightbox.div_lightbox, {id:'ltCoverNavButtons'}, [
        create('div', {title:'Previous cover', events:{click:previousCover}}, [
            create('div', [
                create('img', {src:leftArrow}),
                create('p', [text('\u00A0')])
            ]),
            create('div', [
                create('img', {
                    id:'ltCoverNavLeftImage',
                    height:50
                }),
                create('p', {id:'ltCoverNavLeftText'})
            ])
        ]),
        create('div', {id:'ltCoverNavMiddleDiv'}, [
            create('img', {
                id:'ltCoverNavMiddleImage',
                height:60
            }),

            create('p', {id:'ltCoverNavMiddleText'})
        ]),
        create('div', {title:'Next cover', events:{click:nextCover}}, [
            create('div', [
                create('img', {
                    id:'ltCoverNavRightImage',
                    height:50
                }),
                create('p', {id:'ltCoverNavRightText'})
            ]),
            create('div', [
                create('img', {src:rightArrow}),
                create('p', [text('\u00A0')])
            ])
        ])
    ]);
}

var spinnerDiv;
var amazonCoverSize;
var coverImg;

function resetTimeout(timeout, newTO, newTime) {
    var result;

    if (timeout !== undefined) {
        clearTimeout(timeout);
    }
    if (newTO !== undefined) {
        result = setTimeout(newTO, newTime);
    }

    return result;
}

function switchCoverImg(img) {
    var url = img.getAttribute('src');
    if (url.indexOf('http://ecx-images-amazon.com') === 0) {
        url = split('.').slice(0, 3).join('.') + '.jpg';
    }
    var br = coverImg.parentNode.parentNode.getBoundingClientRect();
    var ar = img.width / Math.max(1, img.height);
    if (amazonCoverSize !== undefined && img.width !== 0 && img.height !== 0) {
        amazonCoverSize.textContent = img.width + ' x ' + img.height;
    }
    var borderoffset = 6;

    if ((br.height * ar - borderoffset) <= br.width) {
        h = (br.height - borderoffset);
        w = (br.height * ar - borderoffset);
    }
    else {
        h = (br.width / ar - borderoffset);
        w = (br.width - borderoffset);
    }

    coverImg.setAttribute('style', 'opacity:0.5; width:' + w + 'px; height:' + h + 'px');
    coverImg.setAttribute('src', url);

    var done = function () { coverImg.style.opacity = '1' };
    if (coverImg.height !== 0 || coverImg.width !== 0) {
        switchCoverImgDoneTO = resetTimeout(switchCoverImgDoneTO, done, 100);
    }
    else {
        coverImg.addEventListener('load', done);
    }
}

function changeLightbox() {
    var done = false;

    try {
        var lb = unsafeWindow.LibraryThing.lightbox;
        var close = document.getElementById('close');
        var covers = getCovers();

        if (coverImg !== undefined && coverImg.style.opacity !== '0.5') {
            coverImg.style.opacity = '0.5';
        }

        if (lb.div_lightbox !== null && close !== null && covers.length !== 0) {
            done = true;

            if (document.getElementById('ltCoverNav') === null) {
                var lbDiv = lb.div_lightbox;

                if (coverImg === undefined) {
                    spinnerDiv = create('div', lbDiv, {id:'ltCoverSpinnerDiv'}, [
                        create('div', [create('img', {src:spinner})])
                    ]);

                    coverImg = create('div', lbDiv, {id:'ltCoverDiv'}, [
                        create('div', [create('img')])
                    ]).firstChild.firstChild;
                }

                coverImg.style.opacity = '0.5';

                create('div', lb.div_content, {id:'ltCoverNav'});

                lbDiv.scrollTop = 0;

                var originalCoverImg = lbDiv.getElementsByTagName('img')[1];
                if (originalCoverImg.height !== 0 || originalCoverImg.width !== 0) {
                    switchCoverImgTO = resetTimeout(switchCoverImgTO, switchCoverImg.bind(this, originalCoverImg), 100);
                }
                else {
                    originalCoverImg.addEventListener('load', switchCoverImg.bind(this, originalCoverImg));
                }

                var coverinfo = getCoverInfo();

                var coverShortcuts = coverinfo.insertBefore(
                    create('p', {id:'ltCoverShortcuts'},
                        [
                            create('span', {shortcut:'esc'}, [text('Esc\u00A0=\u00A0Close')]),
                            text(' '), create('span', {shortcut:'left'}, [text('Left\u00A0=\u00A0Previous')]),
                            text(' '), create('span', {shortcut:'right'}, [text('Right\u00A0=\u00A0Next')]),
                            text(' '), create('span', {shortcut:'m'}, [text('M\u00A0=\u00A0Member\u00A0Covers')]),
                            text(' '), create('span', {shortcut:'a'}, [text('A\u00A0=\u00A0Amazon\u00A0Covers')]),
                            text(' '), create('span', {shortcut:'j'}, [text('J\u00A0=\u00A0Jump\u00A0List')])
                        ]
                    ), coverinfo.firstChild);

                coverShortcuts.addEventListener('click',
                    function (evt) {
                        shortcut = evt.target.getAttribute('shortcut');
                        if (shortcut !== '') {
                            doShortcut(shortcut);
                        }
                    }
                );

                if (lastCoverID.substring(0, 2) === AMAZON_COVERS) {
                    var imgsrc = lbDiv.getElementsByTagName('td')[0].getElementsByTagName('img')[0].getAttribute('src');
                    var amISBN = imgsrc.split('/')[5].split('.')[0];

                    amazonCoverSize = create('p', coverinfo, [
                        create('b', [text('Original Size: ')]),
                        create('span', [text(originalCoverImg.width + ' x ' + originalCoverImg.height)])
                    ]).lastChild;

                    create('p', coverinfo, [
                        create('b', [text('Amazon ISBN:')]),
                        text(' ' + amISBN)
                    ]);

                    create('p', coverinfo, [
                        create('a', [text('Amazon listing')],
                            {href:'http://www.amazon.com/exec/obidos/ASIN/' + amISBN + '/ref=nosim/librarythin08-20'})
                    ]);

                    create('p', coverinfo, [
                        create('a', [text('Report incorrect image to Amazon')],
                            {href:'https://www.amazon.com/gp/gfix/imageCorrection.html/ref=gfix-hmd-image?storeID=books&ASIN=' + amISBN})
                    ]);

                    create('p', coverinfo, [
                        create('a', [text('Update Amazon product information')],
                            {href:'https://www.amazon.com/gp/gfix/makeCorrections.html/ref=gfix-hmd-image?storeID=books&ASIN=' + amISBN})
                    ]);
                }
                else {
                    amazonCoverSize = undefined;
                }

                var editions = window.location.href.replace('covers', 'editions') + '?isbn=';
                var ps = coverinfo.getElementsByTagName('p');
                for (i = 0; i < ps.length; i++) {
                    var html = ps[i].innerHTML;
                    if (html.match(/isbn/i) !== null) {
                        html = html.replace(/ ([\dX]{10,13})/g, '<a href="' + editions + '$1"> $1</a>');
                        if ((bookISBN.length === 10 || bookISBN.length === 13) && html.indexOf(bookISBN) !== -1) {
                            html = html.replace(' ' + bookISBN, ' <span class="thisbook">' + bookISBN + '</span>');
                        }

                        if (html !== ps[i].innerHTML) {
                            ps[i].innerHTML = html;
                        }
                    }
                }

                if (lastCoverID === pickedcover) {
                    if (originalStyle === undefined) {
                        originalStyle = lbDiv.getAttribute('style');
                    }
                    lbDiv.setAttribute('style', originalStyle + ';border-color: #4AC539 !important');
                }
                else if (originalStyle !== undefined) {
                    lbDiv.setAttribute('style', originalStyle);
                }


                if (covers.length !== 1) {
                    if (document.getElementById('ltCoverNavButtons') === null) {
                        createNav();
                    }

                    var i = nlIndexOfId(covers, unsafeWindow.selectedCoverID);
                    var leftCover = covers[(i - 1 + covers.length) % covers.length];
                    var middleCover = covers[i];
                    var rightCover = covers[(i + 1) % covers.length];

                    var leftImg = document.getElementById('ltCoverNavLeftImage');
                    leftImg.setAttribute('src', getCoverImage(leftCover));
                    var leftText = document.getElementById('ltCoverNavLeftText');
                    leftText.textContent = (i - 1 + covers.length) % covers.length + 1;
                    leftText.setAttribute('style', leftCover.id.substring(0, 2) === AMAZON_COVERS ? 'font-style:italic;' : '');// +

                    var middleImg = document.getElementById('ltCoverNavMiddleImage');
                    middleImg.setAttribute('src', getCoverImage(middleCover));
                    var middleText = document.getElementById('ltCoverNavMiddleText');
                    middleText.textContent = i + 1;
                    middleText.setAttribute('style', (middleCover.id.substring(0, 2) === AMAZON_COVERS ? 'font-style:italic;' : '')) ;

                    var rightImg = document.getElementById('ltCoverNavRightImage');
                    rightImg.setAttribute('src', getCoverImage(rightCover));
                    var rightText = document.getElementById('ltCoverNavRightText');
                    rightText.textContent = (i + 1) % covers.length + 1;
                    rightText.setAttribute('style', rightCover.id.substring(0, 2) === AMAZON_COVERS ? 'font-style:italic;' : '');// +

                    coverinfo.appendChild(jumpList);
                }
            }
        }
    } finally {
        if (!done) {
            changeLightboxTO = resetTimeout(changeLightboxTO, changeLightbox, 100);
        }
    }
}

function showMoreCoversClick(link, evt) {
    var e = document.createEvent('MouseEvent');
    e.initEvent('click', false, false);
    link.dispatchEvent(e);
}

var jumpList = create('p', {id:'jumpList', style:'padding-top:2em'});

function isJumpListShowing() {
    return jumpList !== undefined && jumpList.className === 'showing';
}

function toggleJumpList() {
    if (jumpList.innerHTML === '') {
        createJumpList();
    }

    jumpList.className = (isJumpListShowing() ? '' : 'showing');
}

function createJumpList() {
    jumpList.innerHTML = '';

    findMoreLinks();

    var covers;
    var cover;
    var i;
    var section;

    covers = getCovers(MEMBER_COVERS);

    if (covers.length !== 0) {
        section = create('span', jumpList, {'class':'jumpListMembers'});

        for (i = 0; i < covers.length && i < 2000; i++) {
            cover = covers[i];

            create('img', section, {
                src:getCoverImage(cover),
                height:30,
                events:{click:(function (coverID, evt) {
                    gotoCover(coverID);
                    evt.preventDefault();
                }).bind(this, cover.id)}
            });
        }

        if (moreLinkMembers !== undefined) {
            create('div', section, [moreLinkMembers], {
                    events:{click:showMoreCoversClick.bind(this, moreLinkMembers)}
                });
        }
    }

    var hadMemberCovers = covers.length !== 0;
    covers = getCovers(AMAZON_COVERS);

    if (covers.length !== 0) {
        if (hadMemberCovers) {
            create('hr', jumpList);
        }

        section = create('span', jumpList, {'class':'jumpListAmazon'});

        for (i = 0; i < covers.length && i < 2000; i++) {
            cover = covers[i];

            create('img', section, {
                src:getCoverImage(cover),
                height:25,
                events:{click:(function (coverID, evt) {
                    gotoCover(coverID);
                    evt.preventDefault();
                }).bind(this, cover.id)}
            });
        }

        if (moreLinkAmazon !== undefined) {
            create('div', section, [moreLinkAmazon],
                {
                    events:{click:showMoreCoversClick.bind(this, moreLinkAmazon)}
                });
        }
    }
}

function moreLinkClicked(evt) {
    if (this.parentNode !== null) {
        this.parentNode.removeChild(this);
    }
}

function findMoreLinks() {
    moreLinkMembers = undefined;
    moreLinkAmazon = undefined;

    var moreLinks = document.body.getElementsByClassName('limitedlink');
    for (var i = 0; i < moreLinks.length; i++) {
        var link = moreLinks[i].getElementsByTagName('a')[0];
        var onclick = link.getAttribute('onclick');
        if (onclick !== null) {
            if (onclick.search('_customcovers') !== -1) {
                moreLinkMembers = link.cloneNode(true);
                moreLinkMembers.addEventListener('click', moreLinkClicked);
                moreLinkMembers.setAttribute('href', 'javascript:void(0)');
                moreLinkMembers.textContent = Number(link.textContent.match(/\d+/)[0]) -
                    link.parentNode.parentNode.childNodes.length + 1;
            }
            else if (onclick.search('_amazon') !== -1) {
                moreLinkAmazon = link.cloneNode(true);
                moreLinkAmazon.addEventListener('click', moreLinkClicked);
                moreLinkAmazon.setAttribute('href', 'javascript:void(0)');
                moreLinkAmazon.textContent = Number(link.textContent.match(/\d+/)[0]) -
                    link.parentNode.parentNode.childNodes.length + 1;
            }
        }
    }
}

function doShortcut(shortcut) {
    switch(shortcut) {
        case 'esc':
            unsafeWindow.LibraryThing.lightbox.off();
            break;
        case 'left':
            gotoCover(-1);
            break;
        case 'right':
            gotoCover(1);
            break;
        case 'm':
            gotoCover(0, true);
            break;
        case 'a':
            gotoCover(1, true);
            break;
        case 'j':
            toggleJumpList();
            break;
    }
}

function registerKeyboardShortcuts() {
    unsafeWindow.addEventListener('keydown',
        function(evt) {
            evt = evt || window.event;

            if (unsafeWindow.LibraryThing.lightbox.div_content !== null
                && unsafeWindow.LibraryThing.lightbox.div_content.childNodes.length !== 0) {

                if (evt.keyCode === 27) { // esc
                    doShortcut('esc');
                }
                else if (document.getElementById('ltCoverNavButtons') !== null) {
                    if (evt.keyCode === 77 && !evt.shiftKey && !evt.ctrlKey && !evt.altKey) { // m
                        doShortcut('m');
                    }
                    else if (evt.keyCode === 65 && !evt.shiftKey && !evt.ctrlKey && !evt.altKey) { // a
                        doShortcut('a');
                    }
                    else if (evt.keyCode === 74 && !evt.shiftKey && !evt.ctrlKey && !evt.altKey) { // j
                        doShortcut('j');
                    }
                    else if (evt.keyCode === 37 && !evt.shiftKey && !evt.ctrlKey && !evt.altKey) { // left
                        doShortcut('left');
                    }
                    else if (evt.keyCode === 39 && !evt.shiftKey && !evt.ctrlKey && !evt.altKey) { // right
                        doShortcut('right');
                    }
                    else if (evt.keyCode === 9 && !evt.ctrlKey && !evt.altKey) { // tab
                    }
                    else {
                        return; // avoid preventDefault
                    }

                    evt.stopPropagation();
                    evt.preventDefault();
                }
            }
        });
}

// --------- STARTUP --------- //
function main() {
    try {
        registerKeyboardShortcuts();
        bookISBN = document.body.getElementsByClassName('Z3988')[0].getAttribute('title').match(/rft\.isbn=([^&]+)/)[1];
    } catch (e) {}

    unsafeWindow.changeCover = function (amazon, changeto, book) {
      if (amazon) {
        if (confirm('Grab this cover from amazon?')) {
          document.forms.namedItem('uploadform').elements.namedItem('form_url').value = 'http://ecx.images-amazon.com/images/P/' + changeto + '.jpg';
          document.forms.namedItem('uploadform').submit();
        }
      }
      else {
        originalChangeCover.apply(this, arguments);
      }
    };

    unsafeWindow.si_info = coverclick;

    unsafeWindow.load_coverlist = function () {
        var rv = original_load_coverlist.apply(this, arguments);
        if (adjustCoversTO === undefined) {
            adjustCoversTO = resetTimeout(adjustCoversTO, adjustCovers, 100);
        }
        return rv;
    };

    unsafeWindow.LibraryThing.lightbox.showhide = function (id, show) {
        if (id === 'LT_LB') {
            value = show ? 'hidden' : '';
            elem = (document.documentElement || document.body);
            if (value !== elem.style.overflow) {
                if (document.body.style.overflow !== value) {
                    document.body.style.overflow = value;
                }
                if (document.documentElement && document.documentElement.style.overflow !== value) {
                    document.documentElement.style.overflow = value;
                }
            }
        }
        return originalLBShowHide.apply(this, arguments);
    }

    unsafeWindow.LibraryThing.lightbox.off = function () {
        if (coverImg !== undefined) {
            coverImg.setAttribute('src', 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
            coverImg.style.width = "";
            coverImg.style.height = "";
        }

        originalLBOff.apply(this, arguments);
    }
}

main();