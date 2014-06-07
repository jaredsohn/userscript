// ==UserScript==
// @name           pixiv images direct link
// @namespace      http://web.zgo.jp/
// @description    pixivのフルサイズへのリンクをつける。AutoPagerize対応
// @include        http://www.pixiv.net/*
// @include        http://www.pixort.net/*
// @exclude        http://www.pixiv.net/member_illust.php?mode=manga&illust_id=*
// ==/UserScript==
var XPath = {
    cache : null,
    reset : function(){
        this.cache = {__proto__ : null};
    },

    get : function(context, expr, type){
        var x = new XPathEvaluator();
        var cache = this.cache, evaluator;
        if (expr in cache){
            evaluator = cache[expr];
        }else{
            evaluator = cache[expr] = x.createExpression(expr, null);
        }
        return evaluator.evaluate(context, type, null);
    },

    has : function(context, expr){
        return this.get(context, expr, XPathResult.BOOLEAN_TYPE).booleanValue;
    },

    first : function(context, expr){
        return this.get(context, expr, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
    },

    last : function(context, expr){
        var all = this.get(context, expr, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
        return all.snapshotItem(all.snapshotLength - 1) || null;
    },

    all : function(context, expr){
        var all = this.get(context, expr, XPathResult.ORDERED_NODE_ITERAATE_TYPE);
        var ret = [];
        for (var i; (i = all.iterateNext()) !== null;){
            ret.push(i);
        }
        return ret;
    }
};
XPath.reset();

// http://less.carbonfairy.org/post/1414938831/url
var dispatcher = {
    location : window.location,
    stash : [],

    connect : function(paths, action){
        if (paths || paths === 0){
            paths = paths.valueOf();
            if (!(typeof paths == 'object' && !(paths instanceof RegExp))) // webkit: typeof RegExp == 'function'
                paths = { pathname : paths };
            dispatcher.stash.push([paths, action]);
        }
        return dispatcher;
    },

    and : function(){
        var stash = dispatcher.stash,
                length = stash.length;
        length && (stash[length - 1][2] = true);
        return dispatcher;
    },

    dispatch : function(location){
        location = location || dispatcher.location;
        var stash = dispatcher.stash,
                params = {};
        for (var i = 0, c; c = stash[i]; ++i){
            var paths = c[0], action = c[1], chain = c[2];
            var matched = false;
            for (var k in paths){
                var v = paths[k];
                var path = location[k];
                if (typeof path === "undefined") continue;
                var m = dispatcher.match(v, path);
                matched = !!m;
                if (matched){
                    params[k] = m;
                }else{
                    break;
                }
            }
            if (matched){
                if (action)
                    action(params);
                if (!chain) break;
            }
            else if (chain)
                break;
        }
        dispatcher.clear();
        return dispatcher;
    },

    match : function(value, path){
        var ret;
        if (value instanceof RegExp)
            ret = value.exec(path) || false;
        else{
            value = value.toString();
            ret = (path.indexOf(value) != -1) && value;
        }
        return ret;
    },

    clear : function(){
        dispatcher.stash = [];
        return dispatcher;
    }
};
// Autopagerize時に使う関数
var autopageMake;
// URL dispatcher
dispatcher.connect({
            host : /^www\.pixiv\.net/,
            search : /mode=manga_tb/
        },
        function(){ // manga thumb page
            //autopageMake = makeFullSizeLink;
            //manga_tb()
        }).connect({// Ranking
            host : /www\.pixiv\.net/,
            pathname : /ranking\.php/
        },
        function(){
            autopageMake = makeFullSizeLinkTypeDelay;
            makeFullSizeLinkTypeDelay(document);
        }).connect({// other
            host : /www\.pixiv\.net/
        },
        function(){
            autopageMake = makeFullSizeLink;
            makeFullSizeLink(document);
        }).connect({ // http://www.pixort.net/index.php?word=%E6%9D%B1%E6%96%B9&mode=2week
            host : /^www\.pixort\.net/
        },
        function(){
            autopageMake = makeFullSizeLink_pixort;
            makeFullSizeLink_pixort(document);
        }).dispatch(location);

// pixort.net
function makeFullSizeLink_pixort(doc){
    var links = XPath.all(doc, ".//a");
    var sourcePixivReg = /www\.pixort\.net\/image\//;
    for (var i = 0, l = links.length; i < l; i++){
        if (links[i].hasChildNodes()){
            var linkChild = links[i].firstChild;
            if (linkChild.tagName == "IMG" && !sourcePixivReg.test(linkChild.src)){
                var full_img = document.createElement("a");
                full_img.setAttribute("style", "color:#3F658C;");
                full_img.innerHTML = "[S]";
                // http://www.pixort.net/img/img23/77gl/15126014_s.jpg →
                full_img.href = linkChild.src.replace(/^.+pixort\.net\/img\/([^\/]+)\/([^\/]+\/[^\/]+)_[ms]\.(jpe?g|gif|png)/
                        , "http://$1.pixiv.net/img/$2.$3");
                insertAfter(full_img, links[i]);
            }
        }
    }
}
// 検索画面 、その他
function makeFullSizeLinkTypeDelay(doc){
    GM_addStyle(String(<>
        <![CDATA[
        article > .GM_pixiv_dicrect_img_link{
            position:absolute;
            bottom:0;
        }
        .GM_pixiv_dicrect_img_link{
            color:#3F658C;
            margin:0 3px;
        }
    ]]></>));
    var sources = XPath.all(doc, './/img["data-src"]');
    var sourcePixivReg = /(source|ads)\.pixiv\.net/;
    for (var i = 0, l = sources.length; i < l; i++){
        var source = sources[i];
        source = source.hasAttribute("data-src") && source.getAttribute("data-src");
        if (source){
            var full_img = document.createElement("a");
            full_img.className = "GM_pixiv_dicrect_img_link";
            full_img.innerHTML = "[S]";
            full_img.href = source.replace(/(.+pixiv\.net\/\w+\/img\/[^\/]+\/[^\/]+)_([ms]|100)\.(jpe?g|gif|png)/, "$1.$3");
            insertAfter(full_img, sources[i].parentNode.nodeName === "A" ? sources[i].parentNode : sources[i].parentNode.parentNode);
        }
    }
}
// member_illust.php?mode=medium
function makeFullSizeLink(doc){
    var links = XPath.all(doc, './/a');
    var sourcePixivReg = /(source|ads)\.pixiv\.net/i;
    var regMangaThumb = /(mode=manga)/i;
    for (var i = 0, l = links.length; i < l; i++){
        var linkChild = XPath.first(links[i], './/img');
        if (linkChild && !sourcePixivReg.test(linkChild.src)){
            var full_img = document.createElement("a");
            full_img.setAttribute("style", "color:#3F658C;");
            full_img.innerHTML = "[S]";
            if (regMangaThumb.test(links[i].href)){
                full_img.href = linkChild.src.replace(/(.+pixiv\.net\/\/\w+\/img\/[^\/]+\/[^\/]+)_[ms]\.(jpe?g|gif|png)/, "$1_p0.$2");
            }else{
                full_img.href = linkChild.src.replace(/(.+pixiv\.net\/\w+\/img\/[^\/]+\/[^\/]+)_([ms]|100)\.(jpe?g|gif|png)/, "$1.$3");
            }
            insertAfter(full_img, links[i]);
        }
    }
}
// 漫画サムネイル
function manga_tb(){
    getMangaPage(function(viewDOM){
        var links = XPath.all(document, 'id("thumbnail")//a');
        for (var i = 0, l = links.length; i < l; i++){
            var link = links[i];
            if (link.hasChildNodes()){
                if (link.firstChild.tagName == "IMG"){
                    var pageNo = link.href.split("#")[1]; // pageN
                    var img = XPath.first(viewDOM, 'id("' + pageNo + '")//a[not(../span)]/img');
                    if (img){
                        var full_img = document.createElement("a");
                        full_img.setAttribute("style", "color:#3F658C;");
                        full_img.innerHTML = "[S]";
                        full_img.href = img.src;
                        link.parentNode.parentNode.appendChild(full_img);
                    }
                }
            }
        }
    })
}
function getMangaPage(callback){
    var href = location.href.replace("manga_tb", "manga");
    GM_xmlhttpRequest({
        method : 'GET',
        url : href,
        headers : {
            'User-agent' : 'Mozilla/4.0 (compatible) Greasemonkey'
        },
        onload : function(responseDetails){
            var DOMHTML = createDocumentFromString(responseDetails.responseText);
            callback(DOMHTML);
        }
    });
}
function insertAfter(newNode, node){
    if (node.nextSibling === null){
        node.parentNode.appendChild(newNode); // 末尾に追加
    }else{
        node.parentNode.insertBefore(newNode, node.nextSibling); // 基準ノードの後ろに追加
    }
}
// via http://github.com/hatena/hatena-bookmark-xul/blob/master/chrome/content/common/05-HTMLDocumentCreator.js
function createDocumentFromString(source){
    var doc;
    try{
        doc = document.cloneNode(false);
        doc.appendChild(doc.importNode(document.documentElement, false));
    }catch (e){
        doc = document.implementation.createHTMLDocument ?
                document.implementation.createHTMLDocument('hogehoge') :
                document.implementation.createDocument(null, 'html', null);
    }
    var range = document.createRange();
    range.selectNodeContents(document.documentElement);
    var fragment = range.createContextualFragment(source);
    var headChildNames = {title : true, meta : true, link : true, script : true, style : true, /*object: true,*/ base : true/*, isindex: true,*/};
    var child, head = doc.getElementsByTagName('head')[0] || doc.createElement('head'),
            body = doc.getElementsByTagName('body')[0] || doc.createElement('body');
    while ((child = fragment.firstChild)){
        if (
                (child.nodeType === doc.ELEMENT_NODE && !(child.nodeName.toLowerCase() in headChildNames)) ||
                        (child.nodeType === doc.TEXT_NODE && /\S/.test(child.nodeValue))
                )
            break;
        head.appendChild(child);
    }
    body.appendChild(fragment);
    doc.documentElement.appendChild(head);
    doc.documentElement.appendChild(body);
    return doc;
}
document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(evt){
    var node = evt.target;
    autopageMake(node);
}, false);
