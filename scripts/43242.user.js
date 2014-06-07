// ==UserScript==
// @name            Nico:ranking_eve_filter
// @namespace       http://web.zgo.jp/
// @author          azu
// @include         http://www.nicovideo.jp/ranking/*
// @description     ニコニコ動画のランキングで直前にみたランキングと比較して、被ったものを非表示にする。
// ==/UserScript==
(function(){
function getElementsByXPath(xpath, node) {
	var node = node || document
	var nodesSnapshot = document.evaluate(xpath, node, null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
	var data = []
	for (var i = 0; i <nodesSnapshot.snapshotLength; i++) {
	data.push(nodesSnapshot.snapshotItem(i))
	}
	return (data.length>= 1) ? data : null
}
function ranking_view_load(){
	var list=GM_getValue("all_ranking_view");
	return list? list.split(/,/):[];
}
var d = document;
var __closevalue = "元に戻す";
var __openvalue  = "見たものを隠す";

var arrayNo = [];
var preArrayNo = ranking_view_load();
arrayNo = getElementsByXPath('//div[@class="data_left"]/p[1]/span[1]/text()',d);//動画番号
saveNo = [];
for(var h in arrayNo){
    saveNo.push(arrayNo[h].nodeValue);
}
GM_setValue("all_ranking_view", saveNo.join(","));

function hideReview(){
  if(input_run.value == __openvalue){
  input_run.value = __closevalue;
    for(var i=0, l = arrayNo.length;i<l;i++){
      for(var j=0,ll = preArrayNo.length;j<ll;j++){
        if (arrayNo[i].nodeValue == preArrayNo[j]){
          var tmp = arrayNo[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
          tmp.style.display = "none";
          //console.log(arrayNo[i].nodeValue +" == " +preArrayNo[j]);
        }
      }
    }
  }else{
    input_run.value = __openvalue;
    for(var i=0, l = arrayNo.length;i<l;i++){
      var tmp = arrayNo[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
      tmp.style.display = "block";
    }
  }
}

var tr_sort = d.evaluate('id("PAGEBODY")//a[@class="switch_1"]', d, null, 9, null).singleNodeValue;
var input_run = d.createElement("input");
  	input_run.type = "button";
  	input_run.className = "submit";
  	input_run.value = __openvalue;
  	input_run.addEventListener("click", hideReview, false);
tr_sort.parentNode.appendChild(input_run);
//var td_rank = d.evaluate('id("PAGEBODY")//table[2]/tbody/tr/td[2]', d, null, 9, null).singleNodeValue;

})();
