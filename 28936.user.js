// ==UserScript==
// @name           twitter identiconize
// @namespace      http://www.relucks.org/
// @include        http://twitter.com/home
// ==/UserScript==

(function() {
    var fl = function(doc) {
        var st = getElementsByXPath('//td[@class="thumb vcard author"]/a', doc)
        st.forEach(function(i){
            var name = i.href.split('/').pop()
            i.childNodes[0].src = 'http://identicon.relucks.org/' + name + '?size=48'
        })
    }
    fl(document)
    setTimeout(function() {
        if (window.AutoPagerize && window.AutoPagerize.addDocumentFilter) {
            window.AutoPagerize.addDocumentFilter(fl)
        }
    }, 0)

    var fs = getElementsByXPath('id("friends")//a[@rel="contact"]')
    fs.forEach(function(i){
        var name = i.href.split('/').pop()
        i.childNodes[0].src = 'http://identicon.relucks.org/' + name + '?size=24'
    })

    function getElementsByXPath(xpath, node) {
        var node = node || document
        var doc = node.ownerDocument ? node.ownerDocument : node
        var nodesSnapshot = doc.evaluate(xpath, node, null,
                                         XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
        var data = []
        for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
            data.push(nodesSnapshot.snapshotItem(i))
        }
        return data
    }
})()

