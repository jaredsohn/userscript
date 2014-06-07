    // ==UserScript==
    // @name           屏蔽ys168.com的下载提示
    // @version        1.0
    // @include        http://*.ys168.com/
    // @include        http://*.cccpan.com/
    // @updateURL      https://userscripts.org/scripts/source/152587.meta.js
    // @downloadURL    https://userscripts.org/scripts/source/152587.user.js
    // ==/UserScript==
    document.addEventListener('mousedown',
    function(e){
            var el = e.target;
            if(el.localName == 'a'  ){
                    var nSrc = el.href.split('?http://');
                    if(nSrc[1])el.href='http://'+nSrc[1];               
            }
    },false);