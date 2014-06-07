// ==UserScript==
// @name 		バンブラP整理番号表示
// @namespace 		http://gbm.yh.land.to
// @description 	バンブラP最新追加曲リストに楽曲の整理番号を表示させます。
// @include 		http://bandbros-p.nintendo.co.jp/release/newRelease/
// @version		1.01
// ==/UserScript==

var list = document.getElementsByTagName("table")[0];
var t;
t=list.getElementsByTagName("th")[1]; //th
t.style.width="16px";
t.style.padding="8px 0px";
t.style.overflow="hidden";
t=t.firstChild; //th.img
t.style.margin="0 -58px 0 0";
t.style.padding="0";

var anchors = list.getElementsByTagName("a");
var id_arr=new Array();
var s = /\d+$/g;

for (var i=0; i<anchors.length; i++){
	var id = anchors[i].href.match(s);
	if(id){
		t = document.createElement('span');
		t.textContent = "("+id+") ";
		anchors[i].parentNode.insertBefore(t,anchors[i].parentNode.firstChild);
		if(Number(id)<1000000){
			id_arr.push(Number(id))
		};
	}
}

id_arr.sort(function(a, b){
    return b - a;
});
id_arr=id_arr.slice(0,10).join(", ");
t = document.createElement('p');
t.textContent = "整理番号最新10件："+id_arr+"";
list.parentNode.insertBefore(t,list);