// ==UserScript==
// @name           gist update Description with title
// @namespace      http://efcl.info/
// @include        http://gist.github.com/*
// @include        https://gist.github.com/*
// @description    gistの説明文を更新するとdocument.titleも更新
// @author azu
// @homepage http://efcl.info/
// @twitter https://twitter.com/azu_re
// ==/UserScript==

// ==/UserScript==
new function(){
    var desc = document.getElementById("gist-text-description");
    var descBt = document.getElementById("gist-edit-button");
    if(descBt){
        desc.addEventListener("DOMNodeInserted",function(e) {
            var {title} = document;
            title = title.replace(/-.*-/,"-");
            document.title = title.replace("-", "- "+ e.currentTarget.textContent + " -");
        },false);
    }
}