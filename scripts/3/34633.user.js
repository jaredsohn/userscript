// ==UserScript==
// @name           AtashiKanojo
// @namespace      www.madin.jp
// @description    高橋メソッド風「あたし彼女」ビューア
// @include        http://nkst.jp/vote2/novel.php?page=*&auther=20080001
// @include        http://nkst.jp/vote2/novel.php?auther=20080001&page=*
// ==/UserScript==

//1枚ごとの表示時間(msec)
const KANOJO_DELAY = 500;
const KANJO_LAST_PAGE_NUM = 429;
const KANOJO_TOP_PAGE_URL = 'http://nkst.jp/vote2/novel.php?auther=20080001';

var Kanojo = {
    pageNum : parseInt(location.href.replace(/.*page=/,'')),
    field : null,
    lines : new Array(),
    lineIndex : 1,
    play : function () {
        getElementsByXPath('//div[@align="left"]/text()').forEach(function (line) {
            line = line.nodeValue.replace(/[\r\n]+/,'');
            if (line.length>0) Kanojo.lines.push(line);
        });
        Kanojo.field = document.createElement('DIV');
        var elements = document.body.childNodes;
        for (var i = elements.length; i --> 0; document.body.removeChild(elements[i]));
        document.body.style.background = 'white';
        with (Kanojo.field.style) {
            backgroundColor = 'white',
            color = 'black',
            fontWeight = 'bold',
            width = '100%',
            lineHeight = '100%';
            textAlign = 'center'
        }
        document.body.appendChild(Kanojo.field);
        Kanojo.display(Kanojo.lines[0]);
        Kanojo.displayAction = setInterval (function(){
            Kanojo.display(Kanojo.lines[Kanojo.lineIndex]);
            Kanojo.lineIndex ++;
            
            if (Kanojo.lineIndex >= Kanojo.lines.length) Kanojo.advance();
        }, KANOJO_DELAY);
    },
    display : function (line) {
        try {
            var width = window.innerWidth;
            var height = window.innerHeight;
            var size;
            if ('みたいな'==line) {
                size = Math.floor(Math.min(width,height)/2.1);
                line = line.substring(0,2) + '<br/>' + line.substring(2);
                Kanojo.field.style.fontSize = size;
                Kanojo.field.style.paddingTop = 0;
            }
            else {
                size = (line.length==1)?height:Math.floor(width / (line.length+0.2));
                Kanojo.field.style.fontSize = size;
                Kanojo.field.style.paddingTop = Math.floor((height-size)/2);
            }
            Kanojo.field.innerHTML = line;
        } catch (e) {}
    },
    advance : function () {
        var page;
        var nextUrl = location.href.replace(new RegExp('page=([0-9]+)'), function (line, matched) {
            page = parseInt(matched)+1;
            return 'page='+page;
        });
        location.href = (page > 0 &&  page <= KANJO_LAST_PAGE_NUM)? nextUrl : KANOJO_TOP_PAGE_URL;
    }
};


Kanojo.play();

function getElementsByXPath(xpath, node) {
    var node = node || document;
    var doc = node.ownerDocument ? node.ownerDocument : node;
    var nodesSnapshot = doc.evaluate(xpath, node, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var data = [];
    for (var i = 0, l = nodesSnapshot.snapshotLength; i < l; i++) {
        data.push(nodesSnapshot.snapshotItem(i));
    }
    return data;
}
