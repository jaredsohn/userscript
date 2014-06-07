// ==UserScript==
// @name           what.cd - Custom Release Type Sorting and Links
// @namespace      onefish
// @description    Allows a user to set a custom sorting of release types (albums, eps, singles, etc.) which is maintained throughout the site.
// @match          http://*.what.cd/artist.php?*
// @match          https://*.what.cd/artist.php?*
// @version        0.9.9
// @installURL     https://userscripts.org/scripts/source/141886.user.js
// @downloadURL    https://userscripts.org/scripts/source/141886.user.js
// @updateURL      https://userscripts.org/scripts/source/141886.meta.js
// ==/UserScript==

function moveUp(name) {
    if (sorting.indexOf(name) != 0) {
        loc = sorting.indexOf(name);
        sorting[loc] = sorting.splice(loc - 1, 1, sorting[loc])[0];
        window.localStorage.sorting = JSON.stringify(sorting);
        setOrder();
    }
}

function moveDown(name) {
    if (sorting.indexOf(name) != (sorting.length - 1)) {
        loc = sorting.indexOf(name);
        sorting[loc] = sorting.splice(loc + 1, 1, sorting[loc])[0];
        window.localStorage.sorting = JSON.stringify(sorting);
        setOrder();
    }
}

function onClick(event) {
    thisElement = event.target;
    if (thisElement.getAttribute('title') != null) {
        if (thisElement.getAttribute('title') == 'move up') {
            moveUp(thisElement.getAttribute('type'));
        }
        if (thisElement.getAttribute('title') == 'move down') {
            moveDown(thisElement.getAttribute('type'));
        }
        if (thisElement.getAttribute('title') == 'sort torrent types' || thisElement.getAttribute('title') == 'close sorting box') {
            if (sortBox.classList.contains('hidden')) {
                sortBox.classList.remove('hidden');
                done.classList.remove('hidden');
                reset.classList.remove('hidden');
            } else {
                sortBox.classList.add('hidden');
                done.classList.add('hidden');
                reset.classList.add('hidden');
                confirm.classList.add('hidden');
            }
        }
        if (thisElement.getAttribute('title') == 'reset default sorting') {
            reset.classList.add('hidden');
            confirm.classList.remove('hidden');
        }
        if (thisElement.getAttribute('title') == 'confirm reset default sorting') {
            sorting = ['torrents_album', 'torrents_soundtrack', 'torrents_ep', 'torrents_anthology', 'torrents_compilation', 'torrents_dj_mix', 'torrents_single', 'torrents_live_album', 'torrents_remix', 'torrents_bootleg', 'torrents_interview', 'torrents_mixtape', 'torrents_unknown', 'torrents_guest_appearance', 'torrents_remixed_by', 'torrents_produced_by', 'torrents_composition'];
            window.localStorage.sorting = JSON.stringify(sorting);
            reset.classList.remove('hidden');
            confirm.classList.add('hidden');
            setOrder();
        }
    }
}

function makeBoxes() {
    motionBox = document.createElement('div');
    motionBox.setAttribute('style', 'background : transparent; position: fixed; left: 7px; top: 7px;');
    document.querySelector('body').appendChild(motionBox);
    sortBox = document.createElement('div');
    sortBox.className = 'hidden';
    sortBox.setAttribute('style', 'width: 150px; margin: 0 auto;');
}

function init() {
    if (typeof (unsafeWindow) != 'undefined') window = unsafeWindow;
    if (window.localStorage.sorting == null) {
        sorting = ['torrents_album', 'torrents_soundtrack', 'torrents_ep', 'torrents_anthology', 'torrents_compilation', 'torrents_dj_mix', 'torrents_single', 'torrents_live_album', 'torrents_remix', 'torrents_bootleg', 'torrents_interview', 'torrents_mixtape', 'torrents_unknown', 'torrents_guest_appearance', 'torrents_remixed_by', 'torrents_produced_by', 'torrents_composition'];
        window.localStorage.sorting = JSON.stringify(sorting);
    } else {
        sorting = JSON.parse(window.localStorage.sorting);
    }
    table = document.getElementById('discog_table');
    box = table.firstElementChild;
    types = table.querySelectorAll('.torrent_table');
    links = box.childNodes;
    up = document.createElement('a');
    down = document.createElement('a');
    sort = document.createElement('a');
    up.innerHTML = ' ▲ ';
    down.innerHTML = ' ▼ ';
    sort.innerHTML = '[Sort]';
    up.setAttribute('href', '#');
    down.setAttribute('href', '#');
    sort.setAttribute('href', '#');
    up.setAttribute('onclick', '; return false');
    down.setAttribute('onclick', '; return false');
    sort.setAttribute('onclick', '; return false');
    up.setAttribute('title', 'move up');
    down.setAttribute('title', 'move down');
    sort.setAttribute('title', 'sort torrent types');
    down.setAttribute('style', 'float: right;');
    up.setAttribute('style', 'float: right;');
    done = sort.cloneNode(true);
    done.innerHTML = '[Done Sorting]';
    done.classList.add('hidden');
    done.title = 'close sorting box';
    confirm = sort.cloneNode(true);
    confirm.innerHTML = '[Confirm]';
    confirm.classList.add('hidden');
    confirm.setAttribute('title', 'confirm reset default sorting');
    confirm.setAttribute('style', 'color: #ff0000;');
    reset = sort.cloneNode(true);
    reset.innerHTML = '[Reset]';
    reset.setAttribute('title', 'reset default sorting');
    reset.classList.add('hidden');
    toTop = document.createElement('a');
    toTop.title = 'Return to Top';
    toTop.innerHTML = '[Top]';
    toTop.href = '#';
}

function setOrder() {
    motionBox.innerHTML = '';
    sortBox.innerHTML = '';
    motionBox.appendChild(toTop);
    motionBox.appendChild(document.createElement('br'));
    sortBox.appendChild(document.createElement('br'));
    for (i = 0; i < sorting.length; i++) {
        if (type = document.getElementById(sorting[i])) {
            table.appendChild(type);
            box.appendChild(box.querySelector('a[href="#' + sorting[i] + '"]'));
            box.appendChild(document.createTextNode(' '));
            motionBox.appendChild(box.lastElementChild.cloneNode(true));
            motionBox.appendChild(document.createElement('br'));
        }
        sortBox.appendChild(sort.cloneNode(true));
        sortBox.lastElementChild.setAttribute('title', sorting[i]);
        sortBox.lastElementChild.innerHTML = sorting[i].replace('torrents_', '');
        sortBox.appendChild(up.cloneNode(true));
        sortBox.lastElementChild.setAttribute('type', sorting[i]);
        sortBox.appendChild(down.cloneNode(true));
        sortBox.lastElementChild.setAttribute('type', sorting[i]);
        sortBox.appendChild(document.createElement('br'));
    }
    if (reqs = box.querySelector('a[href="#requests"]')) {
        motionBox.appendChild(box.querySelector('a[href="#requests"]').cloneNode(true));
        box.appendChild(box.querySelector('a[href="#requests"]'));
        box.appendChild(document.createTextNode(' '));
    }
    sortBox.appendChild(document.createElement('br'));
    sortBox.appendChild(confirm);
    sortBox.appendChild(document.createTextNode(' '));
    sortBox.appendChild(done);
    sortBox.appendChild(document.createTextNode(' '));
    sortBox.appendChild(reset);
    box.appendChild(sort);
    box.appendChild(sortBox);
}

init();
makeBoxes();
setOrder();
document.addEventListener("click", onClick, false);