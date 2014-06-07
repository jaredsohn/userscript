// ==UserScript==
// @name           make ZOZO search better
// @namespace      http://d.hatena.ne.jp/tily/
// @include        http://zozo.jp/_search/*
// ==/UserScript==
(function(){
// apply to document
modify_items(document)

// add style
GM_addStyle(<><![CDATA[
    div.ZR_home-searccolumn-searchlist-box {
        float:      none  !important;
        width:      505px !important;
        height:     700px !important;
        background-image : none !important;
    }
    div.image {
        width:      500px !important;
        height:     604px !important;
    }
    div.row, div.shop, div.price {
        width:      500px !important;
        text-align: right !important;
    }
    div.bottomicon {
         display: none;
    }
]]></>)

// register to AutoPagerize
if(typeof AutoPagerize != 'undefined') {
    AutoPagerize.addDocumentFilter(modify_items)
}

// register to Minibuffer
if(window.Minibuffer) {
    window.Minibuffer.addCommand({
        name: 'zozo-add-to-wishlist',
        command: add_to_wishlist
    })
}

// add to wishlist
function add_to_wishlist() {
    var pins = window.Minibuffer.execute('pinned-or-current-node')
    pins.forEach(function(pin){
        var href = $x('.//div[@class="bottomicon"]/ul/li[1]/a/@href', pin)[0]
        var [caid, csid] = href.nodeValue.match(/javascript:AddWishList\((\d+),\s(\d+),\sOnAdded\);/).slice(1, 3)
        script = document.createElement('script')
        script.language = 'javascript'
        script.src = [
          'http://az.zozo.jp/AddWishList.asp?caid=', caid,
          '&csid=', csid
        ].join('')
        document.body.appendChild(script)
    })
}

// modify items
function modify_items(cxt) {
    var items = $x('.//div[@class="ZR_home-searccolumn-searchlist-box"]', cxt)
    items.forEach(function(item) {
        // disable onmouseover and onmouseout
        $x('./@onmouseover', item)[0].nodeValue = null
        $x('./@onmouseout', item)[0].nodeValue = null
        var image_div = $x('./div[@class="image"]', item)[0]
        // get link and disable onclick
        var onclick = $x('./@onclick', image_div)[0]
        var link = onclick.value.match(/location.href='(.*?)';/)[1]
        onclick.nodeValue = null
        // add link to image
        var a = document.createElement('a')
        a.href = link
        var img = image_div.childNodes[1]
        img.src = img.src.replace(/\?w=125&h=150/, '?w=500&h=600')
        a.appendChild(img)
        image_div.insertBefore(a, image_div.firstChild)
    })
}

// xpath function
function $x(xpath, node) {
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