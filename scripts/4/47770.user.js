// ==UserScript==
// @name Expand short URLMod(pd pixelPipe Image Display)
// @namespace http://www.psychedesire.org/
// @description show tooltip onshort URL and replace href and HTML
// @include http://*
// @include https://*
// @author psychedesire
// origin http://d.hatena.ne.jp/xenoma/20081211/Expand_short_URL
// ==/UserScript==
(function(){
    
    var FLAG = {
        'replaceTiming': 1,    // 0:リンククリック時 1:読み込み時
        'replaceType': 1    // 0:短縮URLを残す 1:短縮URL自体を置換
    };
    
    //短縮URLサービスのドメインをどんどん追加しよう
      var LIST = [
        /* tinyURL */
        'tinyurl\\.com',
        /* mooo.jp */
        'mooo\\.jp',
        /* mo-v.jp */
        'mo-v\\.jp',
        /* jpan.jp */
        'jpan\\.jp',
        /* snipurl.com */
        'snipurl\\.com',
        /* qqa.jp */
        'qqa\\.jp',
        /* www.qurl.com */
        'qurl\\.com',
        /* rubyURL */
        'rubyurl\\.com',
        /* PURL */
        'zz\\.tc',
        /*is.gd */
        'is\\.gd',
        /*pi.pe */
        'pi\\.pe',
      ];
    var r =LIST.join("|");
    var rx = new RegExp('^https?:\\/\\/([\\w]+\\.)*(' + r + ')');

    // 短縮URL探します
    var ExpandShortUrl = function(){
        var links = document.evaluate('//a', document, null, 
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for(var i = 0; i < links.snapshotLength; i++){
            var link = links.snapshotItem(i);
            if(link.href && rx.test(link)){
                switch(FLAG['replaceTiming']){
                case 0: // クリック時置換
                    (function(){
                        var c = checkLink.cloneNode(true);
                        var l = (function(_l){return _l;})(link);
                        c.addEventListener('click', 
                            function(){
                                c.removeEventListener('click', arguments.callee,false);
                                c.innerHTML = 'Wait...';
                                getUrl(l, c);
                            },
                            false);
                        link.parentNode.insertBefore( c, l);
                    })();
                    break;
                case 1: // 即時置換
                    var l = (function(_l){return _l;})(link);
                    getUrl(l, null);
                    break;
                }
            }
        }
    }
    
    // CHECK 雛形
    var checkLink = document.createElement('a');
    checkLink.style.cssText="background : rgb(187, 0, 0) none repeat scroll 0% 0%;"
        + "color : rgb(255, 255, 255);"
        + "margin-right: 2px;";
    checkLink.href = "javascript:void(0)";
    checkLink.innerHTML = 'CHECK';
    
    
    // 短縮前URLゲット 
    var getUrl = function(link, cLink){
        var opt = {
            method:'get',
            url:link.href,
            link:link,
            onload:function({finalUrl:url}){
                if(cLink){
                    switch(FLAG['replaceType']){
                    case 0:
                        replaceUrl(cLink, url)
                        break;
                    case 1:
                        cLink.style.cssText="display:none;";
                        replaceUrl(link, url);
                        break;
                    }
                }else{
                    replaceUrl(link, url);
                }
            }
        }
        setTimeout(GM_xmlhttpRequest, 0, opt)
    }
    
    // 書き換え
    var replaceUrl = function(element, url){
        var regUrl = new RegExp('http://pixelpipe.com/');
        if(url.search(regUrl) != -1){
            splitUrl = url.split("/");
            var imgUrl = "<img src='http://static.pixelpipe.com/" + splitUrl[4] + "_m.jpg' />";
            element.setAttribute('title', url);
            element.setAttribute('href', url);
            element.innerHTML = imgUrl;
        }else{
            element.setAttribute('title', url);
            element.setAttribute('href', url);
            element.innerHTML = url;
        }
    }
    ExpandShortUrl();

})();