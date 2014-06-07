// ==UserScript==
// @name       m.newsmth.net cross link
// @description  add cross links between mobile, www2 and nForum views
// @include      http://*.newsmth.net/*
// ==/UserScript==
function buildMobileArticleBoardLink(board, page) {
    page = (page!=null)?"?p="+page:"";
    return '<a href="http://m.newsmth.net/board/'+board+'/0'+page+'">手机版</a>';
}
function buildWww2ArticleBoardLink(board) {
    return '<a href="http://www.newsmth.net/bbsdoc.php?board='+board+'&ftype=0">www2</a>';
}
function buildMobileArticleLink(board, tid) {
    return '<a href="http://m.newsmth.net/article/'+board+'/single/'+tid+'/0">手机版</a>';
}
function buildWww2ArticleLink(bid, tid) {
    return '<a href="http://www.newsmth.net/bbscon.php?bid='+bid+'&id='+tid+'">www2</a>';
}
function buildMobileThreadLink(board, gid, start, page) {
    if(start!=null) {
        return '<a href="http://m.newsmth.net/article/'+board+'/'+gid+'/?s='+start+'">手机版</a>'; 
    } 
    
    page = (page!=null)?"/?p="+page:"";
    return '<a href="http://m.newsmth.net/article/'+board+'/'+gid+page+'">手机版</a>';
}
function buildWww2ThreadLink(board, gid, start, page) {
    start = (start!=null)?"&start="+start:"";
    page = (page!=null)?"&pno="+page:"";
    return '<a href="http://www.newsmth.net/bbstcon.php?board='+board+'&gid='+gid+start+page+'">www2</a>';
}
function buildNforumThreadLink(board, tid, page) {
    page = (page!=null&&!isNaN(page))?"?p="+page:"";
    return '<a href="http://www.newsmth.net/nForum/#!article/'+board+'/'+tid+page+'">nForum</a>';
}
function buildMobileThreadBoardLink(board, page) {
    page = (page!=null)?"/?p="+page:"";
    return '<a href="http://m.newsmth.net/board/'+board+page+'">手机版</a>';
}
function buildWww2ThreadBoardLink(board) {
    return '<a href="http://www.newsmth.net/bbsdoc.php?board='+board+'&ftype=6">www2</a>';
}
function buildNforumThreadBoardLink(board, page) {
    page = (page!=null)?"?p="+page:"";
    return '<a href="http://www.newsmth.net/nForum/#!board/'+board+page+'">nForum</a>';
}

function patchMobile() {
    var node = document.getElementsByClassName("sec sp")[0];
    node.parentNode.removeChild(node);
    
    document.getElementsByClassName("sec nav")[0].innerHTML += "【" + document.getElementsByClassName("menu nav")[0].innerHTML+"】";
}

function patchMobileThreadBoard() {
    var match = /http:\/\/m\.newsmth\.net\/board\/(\w+)(\/?\?p=(\d+))?/.exec(document.URL);
    var board = match[1];
    var page = match[3];
    
    var nav = document.getElementsByClassName("nav sec")[0];
    nav.innerHTML = "【"+nav.innerHTML+"】【"+buildWww2ThreadBoardLink(board)+"】【"+buildNforumThreadBoardLink(board, page)+"】";
}

function patchMobileThread() {
    var match = /http:\/\/m\.newsmth\.net\/article\/(\w+)\/(\d+)(\?p=(\d+))?/.exec(document.URL);
    var board = match[1];
    var gid = match[2];
    var page = match[4];
    
    var articles = document.getElementsByClassName("nav hl");
    var nav = document.getElementsByClassName("nav sec")[0];
    for(var i=0; i<articles.length; i++) {
        match = /\/article\/\w+\/post\/(\d+)/.exec(articles[i].childNodes[1].childNodes[0].href);
        var start = match[1];
        
        if(i==0) {
            nav.innerHTML = "【"+nav.innerHTML+"】【"+buildWww2ThreadLink(board, gid, start, Math.ceil(parseInt(page, 0)/2))+"】【"+buildNforumThreadLink(board, gid, page)+"】";
        }
        articles[i].childNodes[1].innerHTML +=  "|" + buildMobileArticleLink(board, start).replace("手机版", "单文");
    }
}

function patchMobileArticle() {
    var match = /http:\/\/m\.newsmth\.net\/article\/(\w+)\/(\d+)\?s=(\d+)/.exec(document.getElementsByClassName("sec nav")[0].childNodes[2].href);
    var board = match[1];
    var gid = match[2];
    var start = match[3];
    
    var nav = document.getElementsByClassName("nav sec")[0];
    nav.innerHTML = "【"+nav.innerHTML+"】【"+buildWww2ThreadLink(board, gid, start)+"】【"+buildNforumThreadLink(board, gid) + "】";
}

function patchMobileArticleBoard() {
    var match = /http:\/\/m\.newsmth\.net\/board\/(\w+)\/0(\?p=(\d+))?/.exec(document.URL);
    var board = match[1];
    var page = match[3];
    
    var nav = document.getElementsByClassName("nav sec")[0];
    nav.innerHTML = "【"+nav.innerHTML+"】【"+ buildWww2ArticleBoardLink(board) +"】【"+ buildNforumThreadBoardLink(board) + "】";
}

function patchWww2Thread() {
    var match = /http:\/\/www\.newsmth\.net\/bbstcon\.php\?board=(\w+)&gid=(\d+)(&start=\d+)?(&pno=(\d+))?/.exec(document.URL);
    var board = match[1];
    var gid = match[2];
    var page = match[5];
    
    var nav = document.getElementsByClassName("tnav smaller")[0].childNodes[0];
    nav.innerHTML = "["+buildMobileThreadLink(board, gid, null, parseInt(page)*2)+"]["+buildNforumThreadLink(board, gid, parseInt(page)*2)+"]" + nav.innerHTML;
}

function patchWww2ThreadBoard() {
    var match = /http:\/\/www\.newsmth\.net\/bbsdoc\.php\?board=(\w+)/.exec(document.URL);
    var board = match[1];
    
    var nav = document.getElementsByClassName("docTab smaller")[0];
    nav.innerHTML +=  buildNforumThreadBoardLink(board) + buildMobileThreadBoardLink(board);
}

function patchWww2Article() {
    var nav = document.getElementsByClassName("oper smaller")[0];
    
    var match = /bbstcon\.php\?board=(\w+)&gid=(\d+)/.exec(nav.childNodes[1].href);
    var board = match[1];
    var gid = match[2];
    
    match = /http:\/\/www\.newsmth\.net\/bbscon\.php\?bid=\d+&id=(\d+)/.exec(document.URL);
    var start = match[1];
    
    nav.innerHTML = nav.innerHTML.replace("<br>", "<br>["+buildMobileArticleLink(board, start)+"]["+buildNforumThreadLink(board, gid)+"]");
}

function patchWww2ArticleBoard() {
    var match = /http:\/\/www\.newsmth\.net\/bbsdoc\.php\?board=(\w+)/.exec(document.URL);
    var board = match[1];
    
    var nav = document.getElementsByClassName("docTab smaller")[0];
    nav.innerHTML +=  buildNforumThreadBoardLink(board) + buildMobileArticleBoardLink(board);
}

function patchNforumThread() {
    var match = /http:\/\/www\.newsmth\.net\/nForum\/#!article\/(\w+)\/(\d+)(\?p=(\d+))?/.exec(document.URL);
    var board = match[1];
    var gid = match[2];
    var page = match[4];
    
    var nav = document.getElementById("notice");
    nav.innerHTML += "&ensp;&ensp;【"+buildMobileThreadLink(board, gid, null, page).replace("href", 'onclick="javascript: window.location=this.href" href')+"】【"+buildWww2ThreadLink(board, gid, null, Math.ceil(parseInt(page, 0)/2)).replace("href", 'onclick="javascript: window.location=this.href" href')+"】";
}

function patchNforumThreadBoard() {
    var match = /http:\/\/www\.newsmth\.net\/nForum\/#!board\/(\w+)(\/?\?p=(\d+))?/.exec(document.URL);
    var board = match[1];
    var page = match[3];
    
    var nav = document.getElementById("notice");
    nav.innerHTML += "&ensp;&ensp;【"+buildMobileThreadBoardLink(board, page).replace("href", 'onclick="javascript: window.location=this.href" href')+"】【"+buildWww2ThreadBoardLink(board).replace("href", 'onclick="javascript: window.location=this.href" href')+"】";
}

if(document.URL.match(/http:\/\/m\.newsmth\.net\/article\/\w+\/(\d+)/)) {
    patchMobileThread();
} else if(document.URL.match(/http:\/\/m\.newsmth\.net\/board\/\w+\/0(\?p=(\d+))?/)) {
    patchMobileArticleBoard();
} else if(document.URL.match(/http:\/\/m\.newsmth\.net\/board\/\w+(p=(\d+))?/)) {
    patchMobileThreadBoard();
} else if(document.URL.match(/http:\/\/m\.newsmth\.net\/article\/\w+\/single\/(\d+)/)) {
    patchMobileArticle();
    
} else if(document.URL.match(/http:\/\/www\.newsmth\.net\/bbstcon\.php\?board=(\w+)&gid=(\d+)/)) {
    patchWww2Thread();
} else if(document.URL.match(/http:\/\/www\.newsmth\.net\/bbsdoc\.php\?board=(\w+)&ftype=6/)) {
    patchWww2ThreadBoard();
} else if(document.URL.match(/http:\/\/www\.newsmth\.net\/bbsdoc\.php\?board=(\w+)/)) {
    patchWww2ArticleBoard();
} else if(document.URL.match(/http:\/\/www\.newsmth\.net\/bbscon\.php\?bid=\d+&id=(\d+)/)) {
    patchWww2Article();
    
} else if(document.URL.match(/http:\/\/www\.newsmth\.net\/nForum\/#!article\/(\w+)\/(\d+)/)) {
    patchNforumThread();
} else if(document.URL.match(/http:\/\/www\.newsmth\.net\/nForum\/#!board\/(\w+)/)) {
    patchNforumThreadBoard();
}
    
if(document.URL.match(/http:\/\/m\.newsmth\.net/)) {
    patchMobile();
}