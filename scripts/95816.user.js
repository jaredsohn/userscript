// ==UserScript==
// @name           pixiv_bookmark_count
// @namespace      yktmt.com
// @include        http://www.pixiv.net/member_illust.php?*
// @include        http://www.pixiv.net/ranking.php?*
// ==/UserScript==

(function(){

var delay = 100;

function addItem(anchor,illust_id){
    GM_xmlhttpRequest({
        method: 'GET',
        url: "http://www.pixiv.net/bookmark_detail.php?illust_id=" + illust_id,
        onload: function(res) {
            var resXML = document.createElement('div');
            resXML.innerHTML = res.responseText.replace(/src=\".*?\"/ig,"src=\"\"");
            var count = resXML.getElementsByClassName("bookmark-count ui-tooltip");
            if(count[0]){
                anchor.parentNode.appendChild(count[0].parentNode.parentNode);
            }
        }
    })
}

function bookmarkCount(doc){
    var xpath = "";
    if(document.URL.indexOf("ranking.php") > -1 || document.URL.indexOf("member_illust.php") > -1){
        xpath = ".//a[contains(@href, 'member_illust.php?')]/img/parent::a";
    }else{
        return;
    }
    if(doc == document){
        var target = doc.getElementsByClassName("display_works linkStyleWorks")[0];
        if(!target){
            target = doc.getElementsByClassName("works_display")[0];
        }
        if(!target){
            target = doc;
        }
    }else{
        var target = doc;
    }
    var regexp = new RegExp(/member_illust\.php\?.*illust_id=(\d+)/);
    var items = document.evaluate(
        xpath, target, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
    );
    
    var anchor = [];
    var illust_id = [];
    for (var j=0; j<items.snapshotLength; j++) {
        var idmatch = items.snapshotItem(j).href.match(regexp, "$1");
        if(idmatch){
            anchor.push( items.snapshotItem(j) );
            illust_id.push( idmatch[1] );
        }
    }

    var i = 0;
    var tid = setInterval(function(){
        addItem(anchor[i],illust_id[i]);
        if(++i > anchor.length){ clearInterval(tid); }
    },delay);
    
}

window.addEventListener('load', function(){ bookmarkCount(document); }, false);
document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(e){ bookmarkCount(e.target); }, false);


})();