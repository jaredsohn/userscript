// ==UserScript==
// @name          h2.hatenaTextSizeChanger
// @namespace     http://d.hatena.ne.jp/Pasta-K
// @include       http://h2.hatena.ne.jp*
// ==/UserScript==

function changefontsize(){
	var size=document.getElementById("setsize").value;
	var e=document.getElementsByClassName("entry");
	for(var i=0;i<e.length;i++){
		e[i].style.fontSize=(size+"px");
	}
}
(function(){
var selectHtml =<select id="setsize">
	<option value="15">15px(default)</option>
	<option value="17">17px</option>
	<option value="20">20px</option>
	<option value="22">22px</option>
	<option value="25">25px</option>;
</select>;
var selectElem=document.createElement('spam');
selectElem.innerHTML=("文字サイズ"+selectHtml);
selectElem.addEventListener("change", changefontsize , false);

var h=document.evaluate("/html/body/div/div[3]/div[2]",document,null,7,null);
h.snapshotItem(0).appendChild(selectElem);
})();