// ==UserScript==
// @name           lignore
// @namespace      ru.scratching.lepra
// @description    Don't show posts/comments using bvammed usernames
// @include        http://leprosorium.ru/
// @include        http://www.leprosorium.ru/
// @include        http://leprosorium.ru/pages/*
// @include        http://www.leprosorium.ru/pages/*
// @include        http://leprosorium.ru/comments/*
// @include        http://www.leprosorium.ru/comments/*
// @include        http://leprosorium.ru/users/*
// @include        http://www.leprosorium.ru/users/*
// ==/UserScript==

(function() {

function $(id) {
    return document.getElementById(id)
}

function __get(nd, cls, tag) {
    var arr = new Array;
    if (!nd) {
      nd = document;
    }
    var elems = nd.getElementsByTagName(tag);
    for (var cls, i = 0; elem = elems[i]; i++) {
      if (cls == '*' || elem.className == cls) {
        arr[arr.length] = elem;
      }
    }
    return arr;
}

function rm(e) {
    e.parentNode.removeChild(e);
}

function xPathSingle(xpath, parent) {
    return document.evaluate(xpath, parent, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function userhome() {
    return;
}

function trsp(text) {
    if (!text) return '';
    while('' + text.charAt(0) == ' ') text = text.substring(1, text.length);
    return text;
}

function getban(id) {
    return GM_getValue('lepra.banneduid.'+id, null);
}

function setban(id, b) {
    if (!b) b = 0;
    GM_setValue('lepra.banneduid.'+id, b);
}

function getnote(id) {
    var n = GM_getValue('lepra.noteon.'+id, null);
    if (!n) return '';
    return trsp(unescape(n));
}

function setnote(id, n) {
    n = escape(trsp(n));
    GM_setValue('lepra.noteon.'+id, n);
}

function somehome(id) {
    pin=__get(null, 'userregisterdate', 'div')[0];
    if (!pin) return;

    var span = document.createElement("div");
    var note = getnote(id);
    if (note == '') note = 'Add Note...';
    span.id = 'gmusernote';
    span.appendChild(document.createTextNode(note));
    span.style.cursor='pointer';
    span.style.fontSize='8pt';

    span.addEventListener("click", 
	function(e) {
	    var nnote = getnote(id);
	    nnote = prompt('Enter note:', nnote);
	    if (nnote == null) return;
	    setnote(id, nnote);
	    var told = $('gmusernote');
	    if (!told) return;
    	    if (nnote == '') nnote = 'Add Note...';
	    told.innerHTML = nnote;
	}, true);

    pin.appendChild(span);

    span = document.createElement("div");
    var banned = getban(id);
    if (!banned) note = 'Ignore it!'; 
    else note = 'Remove ban?!';
    span.appendChild(document.createTextNode(note));
    span.id = 'gmuserban';
    span.style.fontSize='8pt';
    span.style.cursor='pointer';

    span.addEventListener("click", 
	function(e) {
	    var banned = getban(id);
	    setban(id, !banned);
	    var told = $('gmuserban');
	    if (!told) return;
	    var nnote = 'Ignore it!';
	    if (!banned) nnote = 'Remove ban?!';
	    told.innerHTML = nnote;
	}, true);

    pin.appendChild(span);
}

function getUserData() {
    var uid = /uid=(\d+)/.exec(document.cookie)[1];
    var xpath = "//a[contains(@href, '/users/"+uid+"')]";
    var uname = xPathSingle(xpath, document).innerHTML;
    return {id: uid, name: uname};
}

function comments() {
    var posts = document.evaluate("//div[contains(@class,'post')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var idx = 0; idx < posts.snapshotLength; idx++) {
	post = posts.snapshotItem(idx);
	if (!post) return;
	p = post.getElementsByClassName('p');
	if (!p || !p.length) return;
	a = p[0].getElementsByTagName('a');
	if (!a || !a.length) return;
	id = a[1].href.split('/users/')[1]; //!
	if (!id) return;
	if (getban(id)) rm(post);
    }
    return;
}

function posts() {
    var posts = document.evaluate("//div[contains(@class,'post')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var idx = 0; idx < posts.snapshotLength; idx++) {
	post = posts.snapshotItem(idx);
	if (!post) return;
	p = post.getElementsByClassName('p');
	if (!p || !p.length) return;
	a = p[0].getElementsByTagName('a');
	if (!a || !a.length) return;
	id = a[0].href.split('/users/')[1];
	if (!id) return;
	if (getban(id)) rm(post);
    }
    return;
}

function heyho() {
    var u = getUserData();
    var a = document.location.href;
    if (a.indexOf('/users/') != -1) {
	var id = a.split('/users/')[1];
	id=id.replace(/\//g,'');
	if (id == u.id) userhome();
	else somehome(id);
    }
    else if (a.indexOf('/comments/') != -1) {
	comments();
    }
    else if (  (a.indexOf('/pages/') != -1)
	     ||(a == 'http://leprosorium.ru/')
	     ||(a == 'http://www.leprosorium.ru/') )
	// if (location.href.split('/').length == 4)
    {
	posts();
    }

    return;
}

heyho();

})();
