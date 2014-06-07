// ==UserScript==
// @name           Piggydb Fragment Decoration
// @namespace      http://brandish.xrea.jp
// @description    Piggydb用フラグメント内テキストの書式拡張スクリプト
// @include        http://localhost:8080/*
// ==/UserScript==
//                  Programmed by ABE Shigeru <black@brandish.xrea.jp>

/*
【機能】

マーカー間のテキストについて、色付けなどの処理（以下「修飾処理」）を行う。

【書式】

マーカーは @ にはさまれた一文字から成る。

例：
    マーカーとして認識されるもの
        @i@
        @r@
        @a@
    マーカーとして認識されないもの
        @@
        @ir@
        @kkk@

同じマーカーで囲まれた部分について、修飾処理が行われる。

あるマーカーで囲まれた内部に、別のマーカーで囲まれた部分がある場合、
先に現れたマーカーで修飾処理を行った後、次に現れたマーカーで修飾処理が
行われる。
そのため、あるマーカーで囲まれた内部にある、別のマーカーで囲まれた部分は、
両方の修飾処理（スタイルシートの重畳適用）が行われることになる。

【設定】

修飾処理の内容は、このスクリプト内の block_table で行う。

オブジェクトのプロパティ名は、マーカー内に現れる英文字とする。
プロパティ値は、修飾処理に使われるデータを格納したオブジェクトとする。

display:
    用いるタグ
    block   = <div>
    inline  = <span>
    デフォルトはinline

style:
    設定されたオブジェクトのプロパティを、タグのstyleプロパティに
    すべてコピーする。

*/

// 修飾処理の内容
var block_table =
{
    'i': {
        style: {
            color: 'red',
        },
    },
    'r': {
        style: {
            color: 'blue',
        },
    },
    's': {
        style: {
            fontWeight: 'bold',
        },
    },
    'f': {
        style: {
            color: 'green',
        },
    },
};

(function () {
    var s = GM_getValue('block_table', '');
    if (s.length == 0) {
        return;
    }
    block_table = JSON.parse(s);
})();

////////////////////////////////////////////////////////////
// 修飾処理

var root;
var marker;

function get_next_node (node)
{
    while (!node.nextSibling) {
        if (node.parentNode == root) {
            return node;
        }
        node = node.parentNode;
    }
    return node.nextSibling;
}

function create_block_tag ()
{
    var data = block_table[marker[1]];
    var tag;
    
    switch (data.display) {
    case 'block':
        tag = document.createElement('div');
        break;
    case 'inline':
    default:
        tag = document.createElement('span');
        break;
    }
    
    if (data.style) {
        for (var name in data.style) {
            tag.style[name] = data.style[name];
        }
    }
    
    return tag;
}

function find_endmarker (start, top)
{
    var buf = new Array();
    var p = start;
    
    function insert_block ()
    {
        if (buf.length == 0) {
            return start;
        }
        var tag = create_block_tag();
        start.parentNode.insertBefore(tag, start);
        buf.forEach(function (i) {
            tag.appendChild(i);
        });
        return tag;
    }
    
    var r;
    
    while (true) {
        switch (p.nodeType) {
        case 1: // Node.ELEMENT_NODE
            if (find_endmarker(p.firstChild, p)) {
                return insert_block();
            }
            break;
        case 3: // Node.TEXT_NODE
            if (p.textContent == marker) {
                r = insert_block();
                p.parentNode.removeChild(p);
                return r;
            }
            break;
        }
        buf.push(p);
        if (!p.nextSibling) {
            insert_block();
            buf = new Array();
            p = p.parentNode;
            if (p == top) {
                return null;
            }
            while (!p.nextSibling) {
                p = p.parentNode;
                if (p == top) {
                    return null;
                }
            }
            start = p.nextSibling;
        }
        p = p.nextSibling;
    }
}

function enclose_block (node)
{
    marker = node.textContent;
    
    var start = get_next_node(node);
    
    node.parentNode.removeChild(node);
    
    return find_endmarker(start, root);
}

function extract_marker_text (node)
{
    var t = node.textContent;
    var r;
    
    r = /@([^@])@/.exec(t);
    if (!r || !block_table[r[1]]) {
        return node.nextSibling;
    }
    
    var i = r.index + r[0].length;
    
    if (r.index > 0) {
        node.parentNode.insertBefore(
            document.createTextNode(t.substring(0, r.index)), node);
    }
    
    if (t.length - i > 0) {
        node.parentNode.insertBefore(
            document.createTextNode(r[0]), node);
        
        node.textContent = t.substring(i);
        
        return node;
    }
    else {
        node.textContent = r[0];
        
        return node.nextSibling;
    }
}

function extract_marker (root)
{
    var n = root.firstChild;
    while (n) {
        switch (n.nodeType) {
        case 1: // Node.ELEMENT_NODE
            extract_marker(n);
            n = n.nextSibling;
            break;
        case 3: // Node.TEXT_NODE
            n = extract_marker_text(n);
            break;
        default:
            n = n.nextSibling;
            break;
        }
    }
}

function is_marker_node (node)
{
    if (node.nodeType != 3) { // Node.TEXT_NODE
        return false;
    }
    
    var t = node.textContent;
    
    return t.length == 3 && t[0] == '@' && t[2] == '@';
}

function decorate_fragment_content (content)
{
    extract_marker(content);
    
    root = content;
    
    var p = root.firstChild;
    
    while (true) {
        if (is_marker_node(p)) {
            p = enclose_block(p);
        }
        else if (p.hasChildNodes()) {
            p = p.firstChild;
        }
        else {
            while (!p.nextSibling) {
                p = p.parentNode;
                if (p == root) {
                    return;
                }
            }
            p = p.nextSibling;
        }
    }
}

function decorate_snapshot (snapshot)
{
    var i;
    
    for (i = 0; i < snapshot.snapshotLength; ++i) {
        try {
            decorate_fragment_content(snapshot.snapshotItem(i));
        } catch (e) {
            GM_log(e);
        }
    }
}

function decorate ()
{
    var path;
    
    path = document.location.pathname;
    
    var s;
    
    if (path == "/document-view.htm") {
        s = document.evaluate(
            '//div[@class="paragraph"]',
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    else {
        s = document.evaluate(
            '//div[@class="fragment-content"]',
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    
    decorate_snapshot(s);
}

decorate();
