// ==UserScript==
// @name        jsj tool box
// @namespace   jsj.tool.box
// @description jsj.tool.box
// @include     http://wholesale.1688.com/sample/sample_list.htm*
// @version     1
// ==/UserScript==
(function(){
function getPrice(e){
return e.querySelector("div.price em.highlight").innerText;
}
var ele = document.querySelector("#content ul.sw-mod-searchlist-offershow");
var items = ele.childNodes;
var itemsArr = [];
for (var i in items) {
    if (items[i].nodeType == 1) { // get rid of the whitespace text nodes
        itemsArr.push(items[i]);
    }
}

itemsArr.sort(function(a, b) {
  return parseFloat(getPrice(a).substring(1)) >  parseFloat(getPrice(b).substring(1)) ? 1 : -1;
});

for (i = 0; i < itemsArr.length; ++i) {
  ele.appendChild(itemsArr[i]);
};
})()