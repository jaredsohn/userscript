// ==UserScript==
// @match http://video.baidu.com/*
// @match http://v.baidu.com/*
// @run-at  document-idle
// @name video_baidu
// @namespace   http://userscripts.org/scripts/show/145000
// @updateURL     https://userscripts.org/scripts/source/145000.meta.js
// @description "移除百度视频的iframe等"
// @version 201309291019
// ==/UserScript==



(function(document){
    function fix_link(window){
        
        var el = document.querySelector('iframe#player') || document.querySelector('iframe#v_iframe');
        if(el) {
            top.location.href = el.src;
        }else {
            document.body.onclick=function(event){
                var target = event.target;
                
                while(target.tagName.toLowerCase()!=='a') {
                    if(target == window.document.body) return ;
                    target = target.parentNode;
                }
                if(/[\?&]url\=(https?\:[^\?&]+)/i.test(target.href)){
                    event.preventDefault();
                    top.location.href = decodeURIComponent(RegExp.$1);
                    return ;
                }
                if(/^(http\:\/\/v(?:ideo)?\.baidu\.com)\/s\?(?:[^\&]+&)*f\=/.test(target.href) ){
                    event.preventDefault();
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.open('GET', target.href, 1);
                    xmlhttp.onreadystatechange=function(){
                        if (this.readyState==4 && this.status==200) {
                            var response = this.responseText;
                            if (/<iframe[^>]+id\=['"]?v_iframe['"]?\s[^>]+src\=['"]?([^'"]+)['"]?[\s>]/i.test(response)){
                                window.top.location.href=RegExp.$1;
                            }
                        }
                    }
                    xmlhttp.send();
                    
                    
                }
            }
        }
        
    }
    var inject = document.createElement("script");
    inject.setAttribute("type", "text/javascript");
    inject.appendChild(document.createTextNode("(" + fix_link + ")(window)"));
    document.body.appendChild(inject);
    
})(document);