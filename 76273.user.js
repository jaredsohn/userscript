// ==UserScript==
// @name           MediaMaker with booklog tags
// @namespace      http://efcl.info/
// @description    メディアマーカーに登録時にBooklogからタグ候補を持ってくる
// @include        http://mediamarker.net/reg?*
// @include        http://mediamarker.net/u/*/edit*
// ==/UserScript==
(function(_doc) {
    var asin = document.getElementsByName("asin")[0].value

    function insertMD(tags){
       var inp = _doc.getElementById("poptag");
       var tr = document.createElement("tr");
       var td = document.createElement("td");
       td.className = "label_tag";
       td.textContent = "Booklog"
       var tagCloud = document.createElement("td");
       tagCloud.className = "tag";
       for(var i=0,l=tags.length;i<l;i++)(function(){
           var aTag =  document.createElement("a");
           aTag.setAttribute("onclick","javascript: addTag('"+tags[i]+"'); pushTag(); return false;");
           aTag.setAttribute("style" , "margin:1px 3px;background-color: rgb(255, 255, 255); color: rgb(0, 102, 204); text-decoration: underline;")
           aTag.textContent = tags[i];
           tagCloud.appendChild(aTag);
       })()
       tr.appendChild(td);
       tr.appendChild(tagCloud);
       // 親ノード.insertBefore(追加するノード, 基準ノード.nextSibling); // 基準ノードの後ろに追加

       inp.parentNode.parentNode.insertBefore(tr ,inp.parentNode.nextSibling);
    }
    function getTags(doc) {
        var tags = [];// タグ
        var el = $x(doc ,'id("mainArea")/div[@class="itemUnit"]//span[@class="tag"]/a');
        for (var i = 0, l = el.length; i < l; i++) {
            tags.push(el[i].textContent);
        }
        return tags;
    }

    function getBooklogDoc(asin, yieldNext) {
        GM_xmlhttpRequest({
            method: 'get',
            url: "http://booklog.jp/asin/" + asin,
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            },
            onload: function(res) {
                if (res.readyState == 4 && res.status == 200) {
                    yieldNext(res.responseText);
                }
            },
        });
    }
    // yield http://labs.cybozu.co.jp/blog/kazuho/archives/2007/05/coopthread.php
    // prototype拡張版 http://d.hatena.ne.jp/amachang/20080303/1204544340
    function runnable(f) {
        var o;
        o = f(function (t) { try{ o.send(t);}catch(e){} });
        o.next();
    }

    // Query String から 配列を返す
    function getParameter(str) {
        var dec = decodeURIComponent;
        var par = new Array,
            itm;
        if (typeof(str) == 'undefined') return par;
        if (str.indexOf('?', 0) > -1) str = str.split('?')[1];
        str = str.split('&');
        for (var i = 0; str.length > i; i++) {
            itm = str[i].split("=");
            if (itm[0] != '') {
                par[itm[0]] = typeof(itm[1]) == 'undefined' ? true : dec(itm[1]);
            }
        }
        return par;
    }
    //createDocument メソッドと文書型宣言及び名前空間の指定
    function createHTMLDocumentByString(source) {
        var XHTML_NS = 'http://www.w3.org/1999/xhtml';
        var doctype = document.implementation.createDocumentType('html', '-//W3C//DTD HTML 4.01//EN', 'http://www.w3.org/TR/html4/strict.dtd');
        var doc = document.implementation.createDocument(XHTML_NS, 'html', doctype);
        var range = document.createRange();
        range.selectNodeContents(document.documentElement);
        var content = doc.adoptNode(range.createContextualFragment(source));
        doc.documentElement.appendChild(content);
        return doc;
    }

    function $x(context, exp) {
        context || (context = document);
        var expr = (context.ownerDocument || context).createExpression(exp, function(prefix) {
            return document.createNSResolver(context.documentElement || context).lookupNamespaceURI(prefix) || context.namespaceURI || document.documentElement.namespaceURI || "";
        });

        var result = expr.evaluate(context, XPathResult.ANY_TYPE, null);
        switch (result.resultType) {
        case XPathResult.STRING_TYPE:
            return result.stringValue;
        case XPathResult.NUMBER_TYPE:
            return result.numberValue;
        case XPathResult.BOOLEAN_TYPE:
            return result.booleanValue;
        case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
            // not ensure the order.
            var ret = [],
                i = null;
            while (i = result.iterateNext()) ret.push(i);
            return ret;
        }
        return null;
    }
    // Booklog関係の操作関数
    var booklog = {
        getTags: getTags,
        getBooklogDoc: getBooklogDoc
    }
    // getBooklogDocでの結果の入れ皿

    runnable(function (yieldNext){
        var result = yield booklog.getBooklogDoc(asin, yieldNext);
        console.log(result);
        var aryTag = booklog.getTags(createHTMLDocumentByString(result));
        console.log(aryTag);
        insertMD(aryTag);
    });
})(document)