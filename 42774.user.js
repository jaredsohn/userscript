// ==UserScript==
// @name           FkDaScale
// @namespace      http://userscripts.org/users/77028
// @include        http://leprosorium.ru/
// @include        http://leprosorium.ru/pages/*
// @include        http://leprosorium.ru/my/
// ==/UserScript==

(function() {

function letsGo()
{
    clientWidth = document.evaluate("//div[@class='dt']",
                                    document,
                                    null,
                                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                    null).snapshotItem(0).clientWidth;
    
    images = document.evaluate("//div[@class='dt']//img",
                               document,
                               null,
                               XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                               null);
    for (var i = 0; i < images.snapshotLength; ++i)
    {
        img = images.snapshotItem(i);
        
        if (img.naturalWidth == 0 || img.naturalHeight == 0)
        {
            img.setAttribute('width', '');
            img.setAttribute('height', '');
        }
        else
        {
            if (img.naturalWidth > clientWidth)
                scale = clientWidth / img.naturalWidth;
            else
                scale = 1;
        
            img.width = scale * img.naturalWidth;
            img.height = scale * img.naturalHeight;
         }
    }
}

letsGo();
})();
