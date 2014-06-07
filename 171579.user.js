// ==UserScript==
// @author         thrakt
// @name           feedly Auto Read Duplication
// @namespace      http://d.hatena.ne.jp/thrakt/
// @version        2013.06.23
// @include        http://cloud.feedly.com/#latest
// @include        http://cloud.feedly.com/#subscription*
// @include        http://cloud.feedly.com/#category*
// ==/UserScript==

(function(){
    var urlList=[];
    document.body.addEventListener("DOMNodeInserted", function(e) {
        if (document.getElementsByClassName('u0Entry').length === 0){
          urlList=[];
          return;
        }
        var element = e.target;
        if (!element.className.contains('u0Entry')) return;
        var url = element.attributes.getNamedItem('data-alternate-link').value;
        if(urlList.indexOf(url)>-1){
            element.click();
            var inline = document.getElementsByClassName('inlineFrame')[0];
            inline.parentNode.removeChild(inline);
        }else{
            urlList.push(url);
        }
    }, false);
}) ();
//.user.js