// ==UserScript==
// @name           NicoVideo Multiple Tag Search Tool
// @namespace      http://endflow.net/
// @description    allows to search with multiple tags from tag list in NicoVideo watching page.
// @include        http://*.nicovideo.jp/watch/*
// @version        0.1.2
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @history        [2009-02-02] 0.1.0 first version
//                 [2009-02-02] 0.1.1 bugfix: apply ui changes after finished editing
//                 [2009-02-02] 0.1.2 bugfix: disable nicodic link on initialize

(function(){
// main
insertCheckbox();

// functions
function insertCheckbox(){
    $if($x('id("video_tags")//a[contains(@class,"__nicopedia_loaded") and not(contains(@class,"nvmtst"))]'), function(tags){
        tags.forEach(function(tag){
            tag.className += ' nvmtst';
            var span = $n('span');
            span.innerHTML = '<input type="checkbox" value="' + tag.innerHTML
                + '"onclick="nvmtst_onclick();" />';
            tag.parentNode.insertBefore(span, tag);
        });
        insertSearchButton();
        hookEditButton();
    }, function(){
        setTimeout(insertCheckbox, 200);
    });
}
function insertSearchButton(){
    if($('nvmtst_search')) return;
    $x('id("video_tags")/p')[0].innerHTML
        += '<nobr>&nbsp;&nbsp;<a style="color: rgb(0,51,255);" href="javascript:void(0);" id="nvmtst_search">【検索】</a></nobr>';
}
function hookEditButton(){
    $IF($x('id("video_tags")/p//a[not(@id) and starts-with(@href,"javascript:")]'), function(edit){
        edit.addEventListener('click', function(){hookFinishButton()}, false);
    }, function(){
        setTimeout(hookEditButton, 200);
    });
}
function hookFinishButton(){
    $IF($x('id("tag_edit_form")//form[starts-with(@action,"javascript:")]/input'), function(finish){
        finish.addEventListener('click', function(){insertCheckbox()}, false);
    }, function(){
        setTimeout(hookFinishButton, 200);
    });
}
unsafeWindow.nvmtst_onclick = function(){
    var button = $('nvmtst_search');
    button.href = 'http://www.nicovideo.jp/tag/'
        + $x('id("video_tags")//input[@type="checkbox"]')
            .filter(function(cb){return cb.checked})
            .map(function(cb){return cb.value})
            .join('+');
}

// utils
function $if(a,t,f,o){(a!=null&&0<a.length)?t.call(o,a):f.call(o)}
function $IF(a,t,f,o){(a!=null&&0<a.length)?t.call(o,a[0]):f.call(o)}
function $x(x,c){c=c||document;var r=document.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=r.iterateNext();nodes.push(i));return nodes}
function $(id){return document.getElementById(id)}
function $n(tagName){return document.createElement(tagName)}
})();
