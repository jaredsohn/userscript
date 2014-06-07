// ==UserScript==
// @name          OGame espionaje de lunas y manda reciclas FUNCIONA
// @namespace     OGame espionaje de lunas y manda reciclas FUNCIONA
// @description   Probado de ogame.com.es
// @include       http://ogame*.de/*
// @exclude       
// ==/UserScript==    


element = document.evaluate('/html/body/center/form/table/tbody/tr[1]/td[1]/table/tbody/tr[2]/td[2]/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
galaxy = element.value;
element = document.evaluate('/html/body/center/form/table/tbody/tr[1]/td[2]/table/tbody/tr[2]/td[2]/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
system = element.value;
element = document.evaluate('/html/body/center/form/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
session = element.value;

(function() {
var tas = document.getElementsByTagName('font');
for (var i = tas.length - 1; i >= 0; i--) {
var ifont = tas[0].innerHTML;
if (tas[i].innerHTML.indexOf(ifont) != -1){
var texts = tas[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML;
var cod = "[" +galaxy+':'+system+":";
var met = texts.indexOf('<th>',texts.indexOf('<th>',texts.indexOf('<th>')+1)+1);
var metal = parseInt(texts.substring(met+4,texts.indexOf('</th>',met+4)).replace(/[s.]/gi,''));
var krs = texts.indexOf('<th>',texts.indexOf('<th>',met+1)+1);
var kristal = parseInt(texts.substring(krs+4,texts.indexOf('</th>',krs+4)).replace(/[s.]/gi,''));
var pos = texts.substr(texts.indexOf(cod) + cod.length,4);
while (pos.indexOf("]") != -1){
pos = pos.substr(0, pos.length -1);
};
if(ifont!="Spia"){
    tas[i].parentNode.innerHTML = '<a href="#" onclick="doit(8, '+galaxy+', '+system+', '+pos+', 2, '+Math.ceil((kristal+metal)/20000)+')">'+ifont+'</a>';
}else{
    tas[i].parentNode.innerHTML = '<a href="#" onclick="doit(8, '+galaxy+', '+system+', '+pos+', 3, 3)">'+ifont+'</a>';
}
};}})();  