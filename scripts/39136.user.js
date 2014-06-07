// ==UserScript==
// @name          2ch URL Modify
// @version       0.3
// @author        kambara
// @namespace     http://sappari.org
// @description   Convert ttp to http link. Skip ime.nu.
// @include       http://*.2ch.net/*
// @include       http://*.bbspink.com/*
// ==/UserScript==

(function(){
    function showIframe(e) {
        e.preventDefault();
        var a = e.target;
        
        var iframe = document.createElement("iframe");
        iframe.src = a.href;
        iframe.width = "95%";
        iframe.height = "0";
        iframe.style.verticalAlign = "top";
        iframe.style.border = "3px solid #cccccc";
        iframe.addEventListener("load", function(evt){
            var doc = this.contentWindow.document;
            var dl = doc.getElementsByTagName("dl");
            var h = dl[0].offsetHeight;
            this.height = (h < 1000) ? h : 1000;
            doc.body.scrollTop = parseInt(dl[0].offsetTop);
        }, false);

        var aTag = document.createElement("a");
        aTag.href = a.href;
        aTag.innerHTML = a.innerHTML;
        aTag.target = "_blank";
        aTag.style.border = "3px solid #cccccc";
        aTag.style.backgroundColor = "#cccccc";
        
        var div = document.createElement("div");
        div.appendChild(aTag);
        div.appendChild(document.createElement("br"));
        div.appendChild(iframe);
        
        var parent = a.parentNode;
        parent.replaceChild(div, a);
        return false;
    }

    function createAnchorSpan(text, url) {
        var span = document.createElement("span");
        span.appendChild(document.createTextNode(text));
        with (span.style) {
            color = "blue";
            textDecoration = "underline";
            backgroundColor = "#DDDDFF";
            cursor = "pointer";
        }
        span.click = function() {
            showIframe(url);
        };
        return span;
    }
    function createImage(src) {
        var img = document.createElement("img");
        img.src = src;
        img.height = 100;
        return img;
    }
    function modifyLinks() {
        var aTags = document.getElementsByTagName("a");
        var anchorRegExp = /^&gt;&gt;\d+$/;
        var proxyDomainRegExp = /((www\d?\.|)ime\.(nu|st)|pinktower\.com)\//;
        var imageRegExp = /\.(gif|jpeg|jpg|png)$/i;
        for (var i=0; i<aTags.length; i++) {
            var a = aTags[i];
            if (a.href.indexOf("http") != 0) continue;
            // Anchor like ">>100"
            if (anchorRegExp.test(a.innerHTML)) {
                a.addEventListener("click", showIframe, true);
                continue;
            }
            
            // Remove ime.nu, (www2.)ime.st
            a.href = a.href.replace(proxyDomainRegExp, "");
            // Thumbnail
            if (imageRegExp.test(a.href)) {
                a.appendChild(document.createElement("br"));
                a.appendChild(createImage(a.href));
            }
        }
    }

    function ttpToHttpLink() {
        var dd = document.getElementsByTagName("dd");
        var ttp = /([^h])(ttps?:\/\/[\x21-\x7E]+)/ig;
        for (var i=0; i<dd.length; i++) {
            dd[i].innerHTML = dd[i].innerHTML.replace(ttp, "$1<a href=h$2>$2</a>");
        }
    }

    window.addEventListener("load", function(e){
        ttpToHttpLink();
        modifyLinks();
    }, false);
})();