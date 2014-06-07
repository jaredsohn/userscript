// ==UserScript==
// @name          CuttletBlock
// @namespace     http://www.e3internet.com/tools/cuttlet-block
// @description   To manage comments on MattCutts.com
// @include       http://www.mattcutts.com/blog/*
// @exclude
// ==/UserScript==


function getTextBlock(str, tag, sp) {
         var len = tag.length+3;
         return str.substring(str.indexOf('<'+tag, sp), str.indexOf('</'+tag+'>', sp) + len);
}

function setCookie(name, value, expires, path, domain, secure) {
        document.cookie = name + '=' + escape(value) +
        ((expires) ? '; expires=' + expires : '') +
        ((path) ? '; path=' + path : '') +
        ((domain) ? '; domain=' + domain : '') +
        ((secure) ? '; secure' : '');
}

function getCookie(name) {
        var cookie = ' ' + document.cookie;
        var search = ' ' + name + '=';
        var setStr = null;
        var offset = 0;
        var end = 0;
        if (cookie.length > 0) {
                offset = cookie.indexOf(search);
                if (offset != -1) {
                        offset += search.length;
                        end = cookie.indexOf(';', offset)
                        if (end == -1) {
                                end = cookie.length;
                        }
                        setStr = unescape(cookie.substring(offset, end));
                }
        }
        return(setStr);
}

var links, elm, username, precookie, expires, path, domain, secure, id, precookie2, s, s1, s2, sr, sr1, sr2;

links = document.evaluate(
    "//li[@id]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < links.snapshotLength; i++) {
    elm = links.snapshotItem(i);
    id = elm.id.substring(8,20);
    username = elm.innerHTML.substring(elm.innerHTML.indexOf('<h3 class="commenttitle">')+25, elm.innerHTML.indexOf('Said,</h3>'));
    if (username.indexOf('<a')!=-1) {
        username = username.substr(username.indexOf('>')+1, username.indexOf('</a>')-4);
        username = username.substr(0, username.length-4);
    }
    username = username.substring(0, username.length-1);
    expires = 'Tue, 08 Apr 2028 01:31:34 GMT';
    precookie2 = id + '=1' +
        ((expires) ? '; expires=' + expires : '') +
        ((path) ? '; path=' + path : '') +
        ((domain) ? '; domain=' + domain : '') +
        ((secure) ? '; secure' : '');
    path = '/';
    precookie = username + '=1' +
        ((expires) ? '; expires=' + expires : '') +
        ((path) ? '; path=' + path : '') +
        ((domain) ? '; domain=' + domain : '') +
        ((secure) ? '; secure' : '');
    if (getCookie(username)=='1'||getCookie(id)=='1') elm.innerHTML = '';
    if (elm.innerHTML.indexOf('Matt Cutts</a> Said,</h3>')==-1&&elm.innerHTML!='') elm.innerHTML = '<a href="" onclick="t = getElementById(\'mg-comment-'+i+'\'); if (t.style.display!=\'none\') {t.style.display=\'none\';} else {t.style.display=\'block\';} return false;">Show/hide</a>'+
        '&nbsp;&nbsp;&nbsp;&nbsp;<a href="" onclick="t = getElementById(\'mg-comment-'+i+'\'); t.innerHTML=\'<h3>Deleted.</h3>\'; this.innerHTML=\'\'; document.cookie=\''+precookie2+'\'; return false;">Delete</a>'+
        '&nbsp;&nbsp;&nbsp;&nbsp;<a href="" onclick="document.cookie=\''+precookie+'\'">Block User</a>'+
        '<div id="mg-comment-'+i+'" style="display: block;">'+elm.innerHTML+'</div>';
}

s='display: ';
s1 = s + 'none';
s2 = s + 'block';
sr1 = /s1/g;
sr2 = /s1/g;

document.body.innerHTML = document.body.innerHTML.replace(/<ol id="commentlist">/g,'<ol id="commentlist"><li class=alt><a href="" OnClick="document.body.innerHTML = document.body.innerHTML.replace(/display:\\snone/g,\'display:\'+\' block\'); return false;">Show All</a>   <a href="" OnClick="document.body.innerHTML = document.body.innerHTML.replace(/display:\\sblock/g,\'display:\'+\' none\'); return false;">Only Matt</a></li>');