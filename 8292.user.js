// ==UserScript==
// @name          Ads Remover
// @description   Remove some ads
// @include       *
// ==/UserScript==

try {
    window.isAdsTest=function(o) {
        for (var i=0; i<window.isAdsTest.Attributes.length; i++) {
            var attValue = o[window.isAdsTest.Attributes[i]];
            for (var j=0; j<window.isAdsTest.Values.length; j++) {
                var regExp = window.isAdsTest.Values[j];
                if (regExp.test(attValue)) { return true; }
            }
        }
        return false;
    }
    window.isAdsTest.Attributes=new Array(
        "id",
        "name",
        "src",
        "className",
        "movie"
    )
    window.isAdsTest.Values=new Array (
        (/([^a-z]ads|^ads|adserver|ad-|adbot|adframe|adclient|adrotator|adview|adjs\.|doubleclick\.|AdContainer)/i),
        (/([^a-z]pub|^pub|_pub|pub_)/i),
        (/banner/i),
        (/(partner|sponsor)/i)
    )
    
    var o = document.body.getElementsByTagName("*")
    for (var i=0; i<o.length; i++) {
        o[i].style.display=(window.isAdsTest(o[i])?"none":o[i].style.display);
    }
    
} catch (ex) {
    alert(ex.message);
}