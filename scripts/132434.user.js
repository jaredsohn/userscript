// ==UserScript==
// @id             baidu filter
// @name           Filter keywords on baidu search results
// @version        1.0
// @namespace      http://www.zfanw.com/blog
// @author         chenxsan
// @description    Filter some keywords on baidu search results.
// @include        http://www.baidu.com/*
// @run-at         document-end
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
var filterTerms=['tieba.baidu.com','baike.baidu.com'];
//filterTerms 是一个数组，你可以往里面添加你要过滤的内容，我这个例子是过滤掉搜索结果中的百度百科与百度贴吧内容。其实我本来是要过滤 twicli TL 上的内容，结果又拿百度开刀。
$.each(filterTerms,function(){
        $("#container>table:contains("+this+")").next("br").andSelf().remove();
    });

    
    


