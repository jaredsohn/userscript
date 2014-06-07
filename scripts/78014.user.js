// ==UserScript==
// @name           IBM Builder Caution
// @namespace      http://efcl.info/
// @description    META[GENERATOR]がIBMから始まってる時、左上にロゴを表示
// @include        http://*
// @include        https://*
// ==/UserScript==
new function(doc){
    // <meta name="GENERATOR" content="IBM～～"> なメタを探す
    var ghead = $x(doc ,'/html/head/meta[@name="GENERATOR" or @name="generator" or @name="Generator"][starts-with(@content,"IBM")]')[0] || null;
    if(ghead){
        var div = doc.createElement("div");
        // position:absolute にするとついてこない
        div.setAttribute("style", "position:fixed;overflow:auto;z-index:19111;border:0;margin:0;padding:5px;top:0;left:0;background-color:#000;-moz-border-radius:0 0 10px 0;opacity:0.7;");
        var img = doc.createElement("img");
img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAgCAYAAACFM/9sAAAEPElEQVRoge3aTYhWVRgH8DuNOql9KCj4CePopqKgTLNgTCmlNoklSNHKzzSENJlFIUSYghhBm1oUkaWlUJsiqRDTAjOsbDGrscxaZAaFChlC/FrcI73dzn3vue+rLl7mgf9i5pz//3nOc997znPPOZn2bEeWZRnux59tasE57MdSXJdFDHtrap7HPTGtiPbJmtonMpxtERfxfHC8AL+2oXUJ53ABf+NTzI4M8g38VUPzD2xLSN4CnK6hex7HM9zbIhaiLzgfh/42tGJYjNsiA705+K6jdWtCAqdhfk3duSm/7GFrZjjUIo5iXdC4Ax/KX7srgdcxJfh6Fp/V5B/Cqn10l+SgHwdqah7Am5n27OUQwANt6qTY8uDrgxb53+OGYvIGGSV/QK3YmQyrW8Q63BUGNRUrsKYNvWZYj1uCr/vwRE3+moCeYgIPMgIPYW1NzbXCQx22y2mYhwFsLOAZjE3R2Ec3HsGmiM565TXe3dgc4WzGg7E5DGNDbEVOEZsw8BzXFPiPlvgsYgDzUhK4TblNT0kgRuPLujrY0YTzyjFGRjjTm3Bi9ngDd3xNbmU9mWGJvNrfVcB7GJ+SwGOMlD+xtyI6r5bp4GHsjnDewfwSzvgQW5ETw9vY2MDtD9op3L1YUjn4fXQP0TPIqEYMRSbgqiQWNS6hFd/FV6/RYpwyNP6Ky/zFMERPWRn0H5N/VczEjAJmJQnkKl2YjL6ITisonXvDfDurhBfz34eJGIPeRM6MkJNxKQncXjoD1JsDjzbRqWNncFMTX3XnQPgcO1vgbU8Z/Ab5R/UPBfyOSSkJHKJHPv+djOik4hSOqPiOxaQQW5H/M/YEncb/n8Q3+DrC+QmvBW6x7TQ2pCSwBzdGMC6jKyWBQWdsiU4dVJdNdMmnnRh/dAs+r23SVr0OdFgCe0Isqf56UvSqBt4pr/AveFq+WHyHHyv8/SYv/ieU6CW/wp20iLwU+uxJ9DWlQi9pEemUMmamULDLX7/YmBpLl2lZpqtCr7qM6ZRCulj4HmREs0I5y7KuOnqlpnM+5d7FsoZ+qyJ9doUYt2NihV7ap5zO2kx4saHfiib99l+qMCr0kjYTOmU7a0DDcSaux5ORfk/hzkS96u2sYatpWK7+dvZq+bb6oqBxNbf054S/UzhzCmPtLnDXRvqMkdfCSbFl8gPxVu3j4PRqHirV2QTYGfnBnCr0WVRon1YnqEy+wn2h/rHmEbwQnM6WH/UdbkGnCoflq+DU4GulvEhPOXZdGUngMnwl35HZH2mfgG9T46v3vg/b/w1ztXb1YoF/56WrebWjV9rVjoXoLRlzL/oPMqLYNjg4OEp+dJoUZ4bj8osydS8CXcDuENCVuFz0ifjloi3yi01VWhexpSSBj+EjjIm0TZZbUswZTmjd3g9OL9f1trPygS1VXituraG3tUTjdiyObc/JK4pk+wdK5AcpX6q1ggAAAABJRU5ErkJggg==";
        img.alt = ghead.content || "IBM ホームページ・ビルダー";        
        img.width = "80";
        img.height = "32";
        div.appendChild(img);
        doc.body.appendChild(div);
    }
    function $x(context, exp){
        context || (context = document);
        var expr = (context.ownerDocument || context).createExpression(exp, function (prefix) {
        return document.createNSResolver(context.documentElement || context).lookupNamespaceURI(prefix) ||
        context.namespaceURI || document.documentElement.namespaceURI || "";
        });
         
        var result = expr.evaluate(context, XPathResult.ANY_TYPE, null);
        switch (result.resultType) {
        case XPathResult.STRING_TYPE : return result.stringValue;
        case XPathResult.NUMBER_TYPE : return result.numberValue;
        case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
        case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
        // not ensure the order.
        var ret = [], i = null;
        while (i = result.iterateNext()) ret.push(i);
        return ret;
        }
        return null;
    }
}(document);