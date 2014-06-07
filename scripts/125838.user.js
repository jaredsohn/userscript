// ==UserScript==
// @name           zhaopin.com filter
// @namespace      filter.zhaopin.com
// @description    filter the zhaopin.com result
// @include        *
// ==/UserScript==
var trs = document.getElementById('listTabCon').getElementsByTagName('tr');
for(var tr in trs){
    tds = trs[tr].childNodes;
    for(var td in tds){
        if(tds[td].innerHTML == '在职' || tds[td].innerHTML == '女'){
            tds[td].parentNode.style.display = 'none';
        }
    }
}