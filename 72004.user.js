// ==UserScript==
// @name          Togetter List Owner Post Counter
// @namespace     http://d.hatena.ne.jp/Pasta-K
// @include       http://togetter.com/li/*
// ==/UserScript==

(function(){
var mastername=document.getElementsByClassName("info_icon_author")[0].textContent;
var list=document.getElementsByClassName("list_body");
var i,c,postuser;
var all=list.length;
c=0;
for(i=0;i<list.length;i++){
	postuser=list[i].getElementsByTagName("h5")[0].getElementsByTagName("a")[0].textContent;
	if(mastername==postuser){
		c++;
	}
}
var par=(c/all*100).toFixed(1);
var addElem=document.createElement('span');
addElem.innerHTML=("自id採用率<br>"+par+"％<br>（"+c+"／"+all+"）");
var infoElem=document.getElementsByClassName("info_box_left")[0];
infoElem.insertBefore(addElem,infoElem.lastChild);
})();