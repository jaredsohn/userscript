// ==UserScript==
// @name          Cheggit Favourite Tags
// @namespace     http://nipsden.blogspot.com
// @description   Allows you to keep easier track of your preferred tags
// @include       http://cheggit.net/*
// @version       0.6.1
// ==/UserScript==
// Reference material:
//    http://www.elf.org/essay/inline-image.html
//    http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference
//    http://www.w3.org/TR/CSS21/
//    http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/
//    http://developer.mozilla.org/en/docs/XPCNativeWrapper
//    [Mouse Events and GreaseMonkey]
//    http://dunck.us/collab/GreaseMonkeyUserScripts#head-4ac4d1e80f8bbd66bf4f1fbea77ea2390b6a2870
//    [Common GM Patterns] (Not used, but might be useful)
//    http://diveintogreasemonkey.org/patterns/index.html

const VERSION='0.6.1';

// Symbolic constants /* {{{ */

// Tag ordering
const TO_FIFO     =  1,
      TO_ALPHA    =  2,
      TO_INVERT   = -1,
      TO_INVALPHA = -2;

//
const L_SIDEBAR  = 0x01,
      L_TAGCLOUD = 0x02,
      L_TORRENTS = 0x04;

// Element IDs
const ID_P     = 'MyTags',          // Prefix
      ID_MT    = ID_P,              // My Tags Container
      ID_FAVS  = ID_P + 'Favs',     // Favourite Tags
      ID_CFG   = ID_P + 'Conf',     // Configuration
      ID_NOTIF = ID_P + 'Notif',    // Notification area
      ID_LINK  = ID_P + 'NavLink';  // Navbar link

// Option names
const O_TAGS      = 'mytags',       // string, bookmarked tags, format: taglabel1:tagid1;taglabel2:tagid2;...
      O_ORDER     = 'tag_ordering', // int, see TO_* constants
      O_IMGS      = 'use_images',   // boolean, use images or text add/remove links
      O_SHOWLINK  = 'show_navlink', // boolean, show/hide the top navigation link
      O_SHOWDROP  = 'show_dropdown',// boolean, show/hide the dropdown tags list
      O_LIMITTO   = 'limit_to';     // bitfield, show only the add/remove links in some parts

// Default values
const D_TAGS     = ';',
      D_ORDER    = TO_FIFO,
      D_IMGS     = true,
      D_SHOWLINK = true,
      D_SHOWDROP = true,
      D_LIMITTO  = L_SIDEBAR | L_TAGCLOUD; // Note this default is for performance and aesthetics

/* }}} // constants */

// Initialization of variables /* {{{ */
var bookmarked, bookmarked_ids, add_img, del_img, alt_add, alt_del,
    tag_ordering, raw_bookmarked, invalidated=true;

tag_ordering=GM_getValue(O_ORDER, D_ORDER);

add_img='data:image/gif;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABmJLR0QA4AC7'+
'AAuPTrTZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gkTAjk6jANP'+
'9AAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAA'+
'U0lEQVQoz2NkwAT/kdiM6JJMWDQwPNjNzYALMDGQCEjWwILmZnz+YWBgYGBk'+
'ZGBg+I/PzTCg4PoVHgj/0fGD3dz/sYnDnMRIcbBSNZQYSY1pkgEALCYXV144'+
'dX0AAAAASUVORK5CYII=';
del_img='data:image/gif;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABmJLR0QAAAAA'+
'AAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gkTAjc6EoBi'+
'egAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAA'+
'JklEQVQoz2NgGPqAkYGB4T8pGlgYGBgYuFc/IErx11AF0m0YkQAAaHoFBWls'+
'Ti0AAAAASUVORK5CYII=';

alt_add='[+]';
alt_del='[-]';

/* }}} */

// Loads the favourites (in the global var bookmarked and bookmarked_ids)
function loadFavourites() { /* {{{ */ 
    if (!invalidated) return;

    raw_bookmarked = GM_getValue(O_TAGS, D_TAGS).split(';');
    bookmarked = GM_getValue(O_TAGS, D_TAGS).split(';');
    tag_ordering = GM_getValue(O_ORDER, D_ORDER);

    if (TO_ALPHA == tag_ordering) {
        bookmarked.sort();
    }
    else if (TO_INVERT == tag_ordering) {
        bookmarked.reverse();
    }
    else if (TO_INVALPHA == tag_ordering) {
        bookmarked.sort();
        bookmarked.reverse();
    }

    // Used for lookups, order doesn't matter
    bookmarked_ids=raw_bookmarked.join(';').replace(/([\w.]+):\d+;?/g, '$1;').split(';');
    invalidated = false;
} /* }}} // loadFavourites() */

// Removes any empty tag in the preferences
function removeEmptyFavourites() { /* {{{ */
    var copy = new Array();
    for (var i=0; i<raw_bookmarked.length; ++i) {
        var token = raw_bookmarked[i];
        if (token != '') {
            copy.push(token);
        }
    }
    raw_bookmarked=copy;
    GM_setValue(O_TAGS, raw_bookmarked.join(';'));
} /* }}} // removeEmptyFavourites() */

/* {{{ "Callbacks " */
// Adds a favourite, if it doesn't exist
function addFav(ev) {
    var token = ev.target.value;
    if (-1 != raw_bookmarked.indexOf(token)) { // Already bookmarked
        return;
    }

    notice("Updating tags...");

    raw_bookmarked.push(token);
    GM_setValue(O_TAGS, raw_bookmarked.join(';'));
    //GM_log('Added tag "' + token + '"');
    invalidated = true;
    bindToTags();
    updateFavouritesDiv();
    ev.preventDefault();

    notice(null);
}

// Removes a favourite, if it exists
function delFav(ev) {
    var token = ev.target.value;
    var idx = raw_bookmarked.indexOf(token);

    if (-1 == idx) { // Not bookmarked!
        return;
    }

    notice("Updating tags...");

    raw_bookmarked.splice(idx, 1);
    GM_setValue(O_TAGS, raw_bookmarked.join(';'));
    //GM_log('Removed tag "' + token + '"');
    invalidated = true;
    bindToTags();
    updateFavouritesDiv();
    ev.preventDefault();

    notice(null);
}

function disableImages(ev) {
    notice('Replacing links...');

    GM_setValue(O_IMGS, false);
    updateFavouritesDiv();
    updateConfigurationBox();
    bindToTags();
    ev.preventDefault();

    notice(null);
}

function enableImages(ev) {
    notice('Replacing links...');

    GM_setValue(O_IMGS, true);
    updateFavouritesDiv();
    updateConfigurationBox();
    bindToTags();
    ev.preventDefault();

    notice(null);
}

// Common functionality to all the order-changing callbacks
function orderCommon_(e){
    invalidated=true;
    updateFavouritesDiv();
    updateConfigurationBox();
    e.preventDefault();
}
function orderFifo(ev) { GM_setValue(O_ORDER, TO_FIFO);   orderCommon_(ev); }
function orderLifo(ev) { GM_setValue(O_ORDER, TO_INVERT); orderCommon_(ev); }
function orderAlpha(ev){ GM_setValue(O_ORDER, TO_ALPHA);  orderCommon_(ev); }
function orderInvAlpha(ev) { GM_setValue(O_ORDER, TO_INVALPHA); orderCommon_(ev); }

function modifyLimit(l) {
    GM_setValue(O_LIMITTO, GM_getValue(O_LIMITTO, D_LIMITTO) ^ l);
    notice('You\'ll have to reload the page for the changes to take effect');
}
/*  }}} "Callbacks" */

// Creates the placeholder in which favourites will be shown
function initFavouritesDiv() { /* {{{ */
    var div=document.createElement('DIV'),
        divFavs=document.createElement('DIV'),
        divConf=document.createElement('DIV'),
        divNotif=document.createElement('DIV');

    div.id = ID_MT;
    divFavs.id = ID_FAVS;
    divConf.id = ID_CFG;
    divNotif.id = ID_NOTIF;
    div.setAttribute('class', 'menubox');
    div.setAttribute('style', 'margin-top:1em');

    divNotif.appendChild(document.createTextNode(null));

    divFavs.appendChild(document.createTextNode('Favourite Tags Placeholder'));
    divConf.appendChild(document.createTextNode('Favourites Configuration Placeholder'));
    div.appendChild(divFavs);
    div.appendChild(divConf);
    div.appendChild(divNotif);

    var link=document.createElement('DIV');
    link.style.textAlign='right';
    link.innerHTML = '<small><a href="http://userscripts.org/scripts/show/4950">'+
                     '<em>Cheggit Favourite Tags</em> v'+VERSION+'</a></small>';
    div.appendChild(link);


    document.getElementById('drawcontent').appendChild(div);
} /* }}} // initFavouritesDiv() */

// Replaces the favourites div with a new copy, returns the created DIV
function updateFavouritesDiv() { /* {{{ */
    loadFavourites();

    var mt=document.getElementById(ID_MT);
    if (!mt) { // The MyTags block doesn't exist, it's ok i.e. in browsetorrents.php
        return;
    }
    var div=document.createElement('DIV');
    var oldDiv=document.getElementById(ID_FAVS);
    div.id=ID_FAVS;
    div.innerHTML='<h2>My Tags</h2>';

    var none=true, needsCleanup=true;
    var use_images=GM_getValue(O_IMGS, D_IMGS) == true;

    for (var i=0; i<bookmarked.length; ++i) {
        var tagname=bookmarked[i].split(':')[0];
        var tagnum=bookmarked[i].split(':')[1];
        if (tagname == '') {
            needsCleanup=true;
            continue;
        }
        none=false;
        var a=document.createElement('A'), rl=document.createElement('INPUT');
        rl.setAttribute('type', 'image');
        if (use_images) {
            rl.setAttribute('src', del_img);
        }
    	var val;
    	if (tagnum) { // Support for old-style cheggit/favs
			val = tagname + ':' + tagnum;
    	}
    	else {
			val = tagname;
    	}
        rl.setAttribute('value', val);
        rl.setAttribute('alt', alt_del);
        rl.addEventListener('click', delFav, true);
        a.href="tags.php?filter=" + tagname;
        a.appendChild(document.createTextNode(tagname));
        div.appendChild(a);
        div.appendChild(rl);
        if (i<bookmarked.length-1) {
            div.appendChild(document.createTextNode(', '));
        }
    }

    if (none) { // No favourites
        var span = document.createElement('SPAN');
        span.appendChild(document.createTextNode('None'));
        span.setAttribute('style', 'font-size:14pt;color:silver;');
        div.appendChild(span);
    }

    if (needsCleanup) { // Has some empty element, remove them and re-store
        removeEmptyFavourites();
    }

    mt.replaceChild(div, oldDiv);

    updateDropdown();

    return div;
} /* }}} // updateFavouritesDiv() */

// Updates the notification area, note that most (all?) users won't see any text
function notice(text) { /* {{{ */
    var n = document.getElementById(ID_NOTIF);
    // it isn't defined in browsetorrents.php
    if (n && n.firstChild && n.firstChild.nodeType == 3 /*TextNode*/) n.firstChild.data = text;
} /* }}} // notice() */

// Replaces the configuration placeholder with a new copy, returns the created DIV
function updateConfigurationBox() { /* {{{ */
    // Allow use of text links (less intrusive)
    var cfg = document.createElement('DIV');
    var oldCfg = document.getElementById(ID_CFG);
    cfg.id = ID_CFG;
    cfg.innerHTML = '<hr /><h2><em>My Tags</em> Configuration</h2>';

    var si=GM_getValue(O_IMGS,D_IMGS);
    var to=tag_ordering;
    var act=GM_getValue('active', '1');

    var btn1 = document.createElement('BUTTON'), btn2 = document.createElement('BUTTON');
    // btn1 => Images, btn2 => Text only
    if (si == '1') {
        btn1.disabled = true;
        btn2.addEventListener('click', disableImages, true);
    }
    else {
        btn1.addEventListener('click', enableImages, true);
        btn2.disabled = true;
    }
    cfg.appendChild(document.createTextNode('Preferred bookmark tags link type: '));
    btn1.appendChild(document.createTextNode('Images'));
    btn2.appendChild(document.createTextNode('Text only'));
    cfg.appendChild(btn1);
    cfg.appendChild(btn2);

    cfg.appendChild(document.createElement('BR'));
    cfg.appendChild(document.createElement('BR'));

    btn1 = document.createElement('BUTTON'), btn2 = document.createElement('BUTTON');
    var btn3 = document.createElement('BUTTON'), btn4 = document.createElement('BUTTON');
    // btn1 => FIFO, btn2 => LIFO, btn3 => Alpha, btn4 => Inverted Alpha
    if      (to==TO_FIFO)    { btn1.disabled = true; }
    else if (to==TO_INVERT)  { btn2.disabled = true; }
    else if (to==TO_ALPHA)   { btn3.disabled = true; }
    else if (to==TO_INVALPHA){ btn4.disabled = true; }
    cfg.appendChild(document.createTextNode('Tag ordering: '));
    btn1.appendChild(document.createTextNode('Default (FIFO)'));
    btn2.appendChild(document.createTextNode('Reverse default (LIFO)'));
    btn3.appendChild(document.createTextNode('Alphabetical'));
    btn4.appendChild(document.createTextNode('Reverse alphabetical'));
    btn1.setAttribute('title', 'First In, First Out');
    btn2.setAttribute('title', 'Last In, First Out');
    btn1.addEventListener('click', orderFifo, true);
    btn2.addEventListener('click', orderLifo, true);
    btn3.addEventListener('click', orderAlpha, true);
    btn4.addEventListener('click', orderInvAlpha, true);
    cfg.appendChild(btn1);
    cfg.appendChild(btn2);
    cfg.appendChild(btn3);
    cfg.appendChild(btn4);

    cfg.appendChild(document.createElement('BR'));
    cfg.appendChild(document.createElement('BR'));
    // "Limit to"
    {
        cfg.appendChild(document.createTextNode('Show add/remove links in: '));
        var cbSb = document.createElement('INPUT'),
            cbTc = document.createElement('INPUT'),
            cbTl = document.createElement('INPUT');
        var l1 = document.createElement('LABEL'),
            l2 = document.createElement('LABEL'),
            l3 = document.createElement('LABEL');
        cbSb.type = cbTc.type = cbTl.type = 'checkbox';
        cbSb.id=ID_P + L_SIDEBAR, cbTc.id=ID_P + L_TAGCLOUD, cbTl.id=ID_P + L_TORRENTS;

        var limit_to = GM_getValue(O_LIMITTO, D_LIMITTO);
        cbSb.checked = (limit_to & L_SIDEBAR);
        cbTc.checked = (limit_to & L_TAGCLOUD);
        cbTl.checked = (limit_to & L_TORRENTS);

        l1.appendChild(document.createTextNode('Sidebar'));
        l2.appendChild(document.createTextNode('Tag cloud'));
        l3.appendChild(document.createTextNode('Torrent list'));
        l1.htmlFor=cbSb.id, l2.htmlFor=cbTc.id, l3.htmlFor=cbTl.id;

        cbSb.addEventListener('click', function(e){
            modifyLimit(L_SIDEBAR);
        }, true);
        cbTc.addEventListener('click', function(e){
            modifyLimit(L_TAGCLOUD);
        }, true);
        cbTl.addEventListener('click', function(e){
            modifyLimit(L_TORRENTS);
        }, true);

        cfg.appendChild(cbSb);
        cfg.appendChild(l1);
        cfg.appendChild(cbTc);
        cfg.appendChild(l2);
        cfg.appendChild(cbTl);
        cfg.appendChild(l3);
    }

    cfg.appendChild(document.createElement('BR'));
    cfg.appendChild(document.createElement('BR'));

    btn1 = document.createElement('BUTTON');
    if (GM_getValue(O_SHOWLINK, D_SHOWLINK) == true) {
        btn1.appendChild(document.createTextNode('Hide the "my tags" link'));
        btn1.addEventListener('click', function(e) {
            GM_setValue(O_SHOWLINK, false);
            updateNavLink();
            updateConfigurationBox();
            e.preventDefault();
        }, true);
    }
    else {
        btn1.appendChild(document.createTextNode('Show the "my tags" link'));
        btn1.addEventListener('click', function(e) {
            GM_setValue(O_SHOWLINK, true);
            updateNavLink();
            updateConfigurationBox();
            e.preventDefault();
        }, true);
    }
    cfg.appendChild(btn1);

    btn1 = document.createElement('BUTTON');
    if (GM_getValue(O_SHOWDROP, D_SHOWDROP) == true) {
        btn1.appendChild(document.createTextNode('Hide the favourite tags dropdown'));
        btn1.addEventListener('click', function(e) {
            GM_setValue(O_SHOWDROP, false);
            updateDropdown();
            updateConfigurationBox();
            e.preventDefault();
        }, true);
    }
    else {
        btn1.appendChild(document.createTextNode('Show the favourite tags dropdown'));
        btn1.addEventListener('click', function(e) {
            GM_setValue(O_SHOWDROP, true);
            updateDropdown();
            updateConfigurationBox();
            e.preventDefault();
        }, true);
    }
    cfg.appendChild(btn1);

    btn1 = document.createElement('BUTTON');
    btn1.appendChild(document.createTextNode('Backup by mail'));
    // %0A stands for newline
    btn1.addEventListener('click', function(ev) {
        window.location.href='mailto:?subject=Cheggit Favourite Tags Backup&body='+
        'This is (sort of) a backup of your bookmarked tags in Cheggit%0A'+
        '<http://cheggit.net>, using the GreaaseMonkey script Cheggit%0A'+
        'Favourite Tags <http://userscripts.org/scripts/show/4950>.%0A'+
        'The text between the groups of four dashes is the real backup:%0A'+
        '----%0A'+raw_bookmarked.join(';')+'%0A----%0A%0A'+
        'Currently there\'s no automated way to import them, but you can%0A'+
        'open the url "about:config" in Firefox and copy the contents into%0A'+
        'greasemonkey.scriptvals.http://nipsden.blogspot.com/Cheggit Favourite Tags.mytags'
        ;
    }, true);
    cfg.appendChild(btn1);

    document.getElementById('MyTags').replaceChild(cfg, oldCfg);
    return cfg;
} /* }}} // updateConfigurationBox() */

// Shows/hides the navigation link (the link on the top)
function updateNavLink() { /* {{{ */
    var display = (GM_getValue(O_SHOWLINK, D_SHOWLINK) == true);
    document.getElementById('MyTagsNavLink').style.display = (display ? '' : 'none');
} /* }}} // updateNavLink() */

// Parse in search for tags and add the appropiate links
function bindToTags() { /* {{{ */
    var limit_to = GM_getValue(O_LIMITTO, D_LIMITTO);

    if (limit_to & L_SIDEBAR) { bindToTags_(document.getElementById('cleft')); }
    if ((limit_to & L_TAGCLOUD) && window.location.href.match(/tags\.php/)) {
        bindToTags_(document.getElementById('drawcontent'));
    }
    if ((limit_to & L_TORRENTS) && window.location.href.match(/browsetorrents\.php/)) {
        bindToTags_(document.getElementById('drawcontent'));
    }
} /* }}} // bindToTags() */

// Do the actual search of tags inside "target"
function bindToTags_(target) { /* {{{ */
    if (target==null) return;

    loadFavourites();

    // Search for tags and add the links to (de)bookmark
    links=target.getElementsByTagName('A');nl=links.length;
    var use_images = GM_getValue(O_IMGS, D_IMGS) == true;

    for (var i=0;i<nl;++i) {
        var l=links[i];
        if (!l.href) { continue; }
        var tf=l.href.match(/tags\.php\?filter/);
        var bf=l.href.match(/browsetorrents.php\?filter/);

        if (tf || bf) {
            // Explode all tags/filters applied, the last one is the label shown
            var filter = links[i].href.replace(/^.*filter=([\w+]+).*?$/, '$1').split('+');
            filter = filter[filter.length-1];

            var bm=document.createElement('INPUT');
            bm.setAttribute('type', 'image');
            bm.setAttribute('value', l.innerHTML);

            if (bookmarked_ids.indexOf(filter) == -1) { // Not bookmarked yet
                if (use_images) {
                    bm.setAttribute('src', add_img);
                }
                bm.setAttribute('alt', alt_add);
                // Using a closure (wrapper caller) won't work, the vars are resolved to
                // its latest value
                bm.addEventListener('click', addFav, true);
            }
            else { // Already bookmarked
                if (use_images) {
                    bm.setAttribute('src', del_img);
                }
                bm.setAttribute('alt', alt_del);
                bm.addEventListener('click', delFav, true);
            }

            if (null == l.nextSibling || l.nextSibling.tagName != 'INPUT') {
                // First run, the tags don't have the links
                l.parentNode.insertBefore(bm, l.nextSibling);
            }
            else {
                // Already bindToTags(), replace the old link
                l.parentNode.replaceChild(bm, l.nextSibling);
            }
        }
    } // foreach link
} /* }}} // bindToTags_() */

// Updates/shows the dropdown with the favourite tags
function updateDropdown() { /* {{{ */
    var catfilter = document.getElementById('categoryFilterBox');
    if (!catfilter) { // Safeguard for future changes
        return;
    }
    var tagsearch = catfilter.parentNode; // container
    var oldTags = document.getElementById('MyTagsDD');

    if (GM_getValue(O_SHOWDROP, D_SHOWDROP) == false) {
        if (oldTags) {
            tagsearch.removeChild(oldTags);
        }
        return;
    }

    var favtags = document.createElement('SELECT');
    var t = favtags.appendChild(document.createElement('OPTION'));
    favtags.id = 'MyTagsDD';
    t.appendChild(document.createTextNode('-- Favourite Tags --'));
    t.setAttribute('value', '');

    for (var i=0; i<bookmarked.length; ++i) {
        var opt = favtags.appendChild(document.createElement('OPTION'));
        opt.appendChild(document.createTextNode( bookmarked[i].split(':')[0] ));
        opt.setAttribute('value', bookmarked[i].split(':')[0]);
    }
    favtags.addEventListener('change', function(e){
        var ft = document.getElementById('MyTagsDD');
        var tag = ft.options[ft.selectedIndex].value;
        if (tag) {
            window.location.href='tags.php?filter=' + tag;
        }
        e.preventDefault();
    }, true);

    if (oldTags) {
        tagsearch.replaceChild(favtags, oldTags);
    }
    else {
        var D = document.createElement('DIV');
        D.setAttribute('class', 'menubox');
        var p = document.createElement('P');
        p.setAttribute('class', 'title');
        p.appendChild(document.createTextNode('Favourite Tags'));
        D.appendChild(p);
        D.appendChild(favtags);
        //tagsearch.appendChild(D);
        tagsearch.insertBefore(D, catfilter.nextSibling);
    }
} /* }}} // updateDropdown() */

// Finally, the script body

loadFavourites();

// Load the stylesheet snippet:
var st = document.createElement('STYLE');
st.setAttribute('type', 'text/css');
st.innerHTML =
'input[type=image]{border:0;font-size:85%;}'+ // FIXME: be less intrussive IF NEEDED
'#'+ID_MT+'{font-size:110%;}'+
'#'+ID_LINK+'{font-size:75%;}'+
'#'+ID_NOTIF+'{color:#f33;font-weight:bold;padding:1ex 1em;}';
document.getElementsByTagName('HEAD')[0].appendChild(st);;

// Insert a quick link to "My Tags" (a bit redundant with the current design)
var navbar = document.getElementById('navbar');
if (navbar) { // safeguard for future changes and weird behaviors
    var links = navbar.getElementsByTagName('A');
    for (var i=0; i<links.length; ++i) {
        var l=links[i];
        if (l.href.match('tags.php')) {
            tagsLink = l;
            break;
        }
    }
    links=null;
    if (tagsLink != null) {
        var li=document.createElement('LI');
        li.innerHTML='<a href="tags.php#'+ID_MT+'">my tags</a>';
        tagsLink.parentNode.parentNode.insertBefore(li, tagsLink.parentNode.nextSibling);
        li.id = ID_LINK;
        updateNavLink();
    }
}
// Add the links
bindToTags();

// If currently viewing the tags, display the bookmarked ones and show mini config
if (window.location.href.match(/tags\.php/)) {
    initFavouritesDiv();
    updateFavouritesDiv();
    updateConfigurationBox();
}

/* vim:set ts=4 et ai foldmethod=marker: */
