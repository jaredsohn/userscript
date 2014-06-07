// ==UserScript==
// @name         jbpan 解析
// @namespace    http://jixun.org/
// @version      1.0
// @description  自动往菊爆盘后面加文件真实链接
// @include      *
// @grant        GM_xmlhttpRequest
// @copyright    2012+, Jixun
// ==/UserScript==

function cText (sName) { return document.createTextNode (sName) }
function insAfter (fromE, toE) { toE.parentNode.insertBefore(fromE, toE.nextSibling); return fromE; }
function nLink (lObj) {
    var ret = document.createElement ('a');
    ret.textContent = lObj.fileName;
    ret.href = lObj.url;
    ret.target = '_blank';
    return ret;
}

function setData (dlCode, appendTo) {
    GM_xmlhttpRequest ({
        url: 'http://jbpan.tk/Download/index/code/' + dlCode,
        method: 'GET',
        onload: function (r) {
            var ret = JSON.parse (r.responseText), arrLinks=[];
            
            if (ret.code != 0)
                return; // ERROR?
            
            insAfter (cText (' ]'), appendTo);
            for (var i=ret.data.length-1; i>=0; i--) {
                insAfter (nLink(ret.data[i]), appendTo);
            }
            insAfter (cText (' [ '), appendTo);
        }
    });
}

addEventListener ('DOMContentLoaded', function () {
    var jbLinks = document.querySelectorAll ('a[href*="//jbpan.tk/dk"]');
    for (var i=0; i<jbLinks.length; i++) {
        var dlCode = (jbLinks[i].href.match (/\/(dk\d+)/)||[,0])[1];
        if (dlCode === 0)
            continue;
        setData (dlCode, jbLinks[i]);
    }
}, false);