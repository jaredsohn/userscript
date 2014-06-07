// ==UserScript==
// @name         Liverpoolfc Weibo Share
// @namespace    http://weibo.com/1892anfield
// @license      MIT License
// @author       @艾菲路
// @version      1.0.1
// @description  可以在利物浦官网分享页面到新浪微博
// @grant        none
// @match        http://www.liverpoolfc.com/*
// @include      http://www.liverpoolfc.com/*
// sourcecode    http://userscripts.org/scripts/review/158253
// ==/UserScript==

(function(){
    var _w = 45 , _h = 16;
    var paramSina = {
        url:location.href,
        type:'3',
        count:'1', /**是否显示分享数，1显示(可选)*/
        appkey:'2293456175', /**您申请的应用appkey,显示分享来源(可选)*/
        title:titleContent, /**分享的文字内容(可选，默认为所在页面的title)*/
        pic:'', /**分享图片的路径(可选)*/
        ralateUid:'1725938903', /**关联用户的UID，分享微博会@该用户(可选)*/
        language:'zh_cn', /**设置语言，zh_cn|zh_tw(可选)*/
        rnd:new Date().valueOf()
    }
    var sina = [];
    for( var p in paramSina ){
        sina.push(p + '=' + encodeURIComponent( paramSina[p] || '' ) )
    }
    var content = document.getElementById('Content');
    var articleContent = content.getElementsByTagName('div')[0];
    var title = articleContent.getElementsByTagName('h1')[0];
    var titleContent = title.textContent;
    var date = articleContent.getElementsByTagName('div')[0];
    var cmsContentId = document.getElementById('cmsContentId');
    //var pic = cmsContentId.getElementsByTagName('img');
    var newDiv = document.createElement('div');
    newDiv.style.cssFloat = "right";
    newDiv.style.marginLeft = "20px";
    newDiv.style.marginTop = "2px";
 	var insertText = '<iframe allowTransparency="true" frameborder="0" scrolling="no" src="http://hits.sinajs.cn/A1/weiboshare.html?' + sina.join('&') + '" width="'+ _w+'" height="'+_h+'"></iframe>';
 	newDiv.innerHTML = insertText;
 	articleContent.insertBefore(newDiv, date);
})()