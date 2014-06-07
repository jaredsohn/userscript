// ==UserScript==
// @name           Remove Web Search Ad
// @namespace      http://d.hatena.ne.jp/favril/
// @description    web検索ページから広告を消し去るスクリプト
// @include        http://search.nifty.com/websearch/search*
// @include        http://www.so-net.ne.jp/search/web/*
// @include        http://search.goo.ne.jp/web.jsp*
// @include        http://search.www.infoseek.co.jp/Web*
// @include        http://www.google.co.jp/search*
// @include        http://search.yahoo.co.jp/search*
// @include        http://ocnsearch.goo.ne.jp/ocn.jsp*
// @include        http://cgi.search.biglobe.ne.jp/cgi-bin/search*
// @include        http://www.excite.co.jp/search.gw*
// @include        http://search.msn.co.jp/results.aspx*
// @version        0.1
// @author         favril
// ==/UserScript==

(function(){
    
    var currentURL = location.href;
    if(currentURL.indexOf('http://search.nifty.com/websearch/search') != -1) {
        // for nifty
        var ad = document.getElementById('sponsoredLinkTop');
        if(ad) ad.parentNode.removeChild(ad);
        
        ad = document.getElementById('sponsoredLinkBtm');
        if(ad) ad.parentNode.removeChild(ad);
    } else if(currentURL.indexOf('http://www.so-net.ne.jp/search/web/') != -1) {
        // for so-net
        var ad = document.getElementById('sponsor_main').parentNode;
        if(ad) ad.parentNode.removeChild(ad);
        
        ad = document.getElementById('searchresult2');
        if(ad) ad.parentNode.removeChild(ad);
    } else if(currentURL.indexOf('http://search.goo.ne.jp/web.jsp') != -1) {
        // for goo
        var ad = document.getElementById('sponsor');
        if(ad) ad.parentNode.removeChild(ad);
        
        ad = document.getElementById('recommend');
        if(ad) ad.parentNode.removeChild(ad);
        
        ad = document.getElementById('service');
        if(ad) ad.parentNode.removeChild(ad);
    } else if(currentURL.indexOf('http://search.www.infoseek.co.jp/Web') != -1) {
        // for infoseek
        var ad = document.getElementById('sponsorlink1');
        var num = 2;
        while(ad) {
            ad.parentNode.removeChild(ad);
            ad = document.getElementById('sponsorlink' + num);
            num++;
        }
        
        ad = document.getElementById('sponsordown1');
        num = 2;
        while(ad) {
            ad.parentNode.removeChild(ad);
            ad = document.getElementById('sponsordown' + num);
            num++;
        }
        
        ad = document.getElementById('ssnavi_all').parentNode;
        while(ad) {
            ad.parentNode.removeChild(ad);
            ad = document.getElementById('ssnavi_all').parentNode;
        }
    } else if(currentURL.indexOf('http://www.google.co.jp/search') != -1) {
        // for google
        var ad = document.getElementById('tads');
        if(ad) ad.parentNode.removeChild(ad);
        
        ad = document.getElementById('rhsline');
        if(ad) ad.parentNode.removeChild(ad);
    } else if(currentURL.indexOf('http://search.yahoo.co.jp/search') != -1) {
        // for yahoo
        var divs = document.getElementsByTagName('div');
        var ads = [];
        for(var i=0, len=divs.length; i<len; i++) {
            if(divs[i].getAttribute('class') == 'yschspns')
                ads.push(divs[i]);
        }

        for(var i=0, len=ads.length; i<len; i++) {
            ads[i].parentNode.removeChild(ads[i]);
        }

        var ad = document.getElementById('yschec');
        if(ad) ad.parentNode.removeChild(ad);
    } else if(currentURL.indexOf('http://ocnsearch.goo.ne.jp/ocn.jsp') != -1) {
        // for ocn
        var ad = document.getElementById('sponsor');
        while(ad) {
            ad.parentNode.removeChild(ad);
            
            ad = document.getElementById('sponsor');
        }
    } else if(currentURL.indexOf('http://cgi.search.biglobe.ne.jp/cgi-bin/search') != -1) {
        // for biglobe
        var divs = document.getElementById('adjustBox').getElementsByTagName('div');
        var ads = [];
        var adf = false;
        for(var i=0, len=divs.length; i<len; i++) {
            if((divs[i].getAttribute('class') == 'searchTitleBox') && (divs[i].innerHTML.indexOf('/sponsorship.html') != -1)) {
                ads.push(divs[i]);
                adf = true;
            }
            
            if(adf && (divs[i].getAttribute('class') == 'searchHit')) {
                ads.push(divs[i]);
                adf = false;
            }
        }

        for(var i=0, len=ads.length; i<len; i++) {
            ads[i].parentNode.removeChild(ads[i]);
        }
    } else if(currentURL.indexOf('http://www.excite.co.jp/search.gw') != -1) {
        // for excite
        var divs = document.getElementById('resultsBody').getElementsByTagName('div');
        var ads = [];
        var adf = false;
        for(var i=0, len=divs.length; i<len; i++) {
            if(divs[i].getAttribute('class') == 'title') {
                if(divs[i].innerHTML.indexOf('/search_help/promotionlink/') != -1) {
                    ads.push(divs[i]);
                    adf = true;
                } else {
                    adf = false;
                }
            }
            
            if(adf && (divs[i].getAttribute('class') == 'hit')) {
                ads.push(divs[i]);
            }
        }

        for(var i=0, len=ads.length; i<len; i++) {
            ads[i].parentNode.removeChild(ads[i]);
        }
    } else if(currentURL.indexOf('http://search.msn.co.jp/results.aspx') != -1) {
        // for msn
        var divs = document.getElementById('content').getElementsByTagName('div');
        var ads = [];
        for(var i=0, len=divs.length; i<len; i++) {
            var cls = divs[i].getAttribute('class');
            if(!cls) continue;
            
            if(cls.indexOf('sb_adsW') != -1) {
                ads.push(divs[i]);
            } else if(cls == 'adB') {
                ads.push(divs[i]);
            }
        }
        
        for(var i=0, len=ads.length; i<len; i++) {
            ads[i].parentNode.removeChild(ads[i]);
        }
    }

})();
