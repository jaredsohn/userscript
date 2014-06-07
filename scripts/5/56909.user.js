// ==UserScript==
// @name           visiable censored
// @namespace      http://gigi-net.net
// @include        http://favotter.matope.com/*
// ==/UserScript==
(function(){
//発言を拾ってきて配列に格納
var span = document.getElementsByTagName("span");
var anchor =document.getElementsByTagName("a");
var div =document.getElementsByTagName("div");
var twitters =new Array;
var id = new Array;
var userid =new Array;
for(var i=0;i<span.length;i++){
	if(span[i].getAttribute("class")==" status_text description"){
		twitters.push(span[i]);
	}
}
for(var i=0;i<anchor.length;i++){
	if(anchor[i].getAttribute("class")=="taggedlink"){
		id.push(anchor[i]);
	}
}
for(var i=0;i<div.length;i++){
	if(div[i].getAttribute("class")=="info"){
		anchor2 = div[i].getElementsByTagName("a");
		userid.push(anchor2[0].innerHTML);
	}
}
//全ての要素から規制部分を検索
var censored =new Array;
var a =new Array;
var id2 = new Array;
var userid2 = new Array;
for(i=0;i<twitters.length;i++){
	a =twitters[i].getElementsByTagName("span");
	for(var j=0;j<a.length;j++){
		if(a[j].getAttribute("class")=="censored"){
			censored.push(twitters[i]);
			//alert("a");
			id2.push(id[i]);
			userid2.push(userid[i]);
		}
	}
}


function getTitle(x){
	original = x.responseText.match(/\<span class="entry-content"\>.*?\<\/span\>/);
	original+="";
	original = original.replace(/\<span class="entry-content"\>/,"");
	original = original.replace("</span>","");
	if(original !="null"){
		censored[count].innerHTML = original;
	}
	count++;
	if(count<id2.length){
		getLink();
	}
}
var count =0;
function getLink(){
	id3 =id2[count]+"";
	id3 =id3.replace("http://favotter.matope.com/status.php?id=","");
	r_url ="http://twitter.com/"+userid2[count]+"/status/"+id3+"";
	GM_xmlhttpRequest({
  			method:"GET", 
  			url:r_url,
  			onload:getTitle
		});
}
getLink();
})();