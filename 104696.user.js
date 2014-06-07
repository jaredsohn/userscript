// ==UserScript==
// @name           bro3-BBScopy
// @version        0.21
// @namespace      http://m21.3gokushi.jp/BBS
// @description    BBSにコピーボタンを加える。サーバ負荷はありませんが、自己責任で。
// @include        http://m21.3gokushi.jp/bbs/res_view.php*
// ==/UserScript==
// ver 0.20 限定公開
// ver 0.21 特殊文字に配慮
(function () {
	var button1,br1;
	var postPerson=document.getElementsByClassName('ttl4');

	
	//alert(postPerson.length+1);
	
	for(var ii=0; ii<postPerson.length; ii++){
	br1 = document.createElement("br");
	button1 = document.createElement("input");
	button1.type = "button";
	button1.id = ii;
	button1.style.fontSize = "12px";
	button1.style.marginLeft = "16px";
	button1.value = "本文へコピー";
	button1.addEventListener("click", function(event){copyTotextArea(event)}, false);
	postPerson[ii].appendChild(br1);
	postPerson[ii].appendChild(button1);
	}
	
	function copyTotextArea(e){
		var tArea=document.getElementsByClassName('bbs_textarea_width')[0];
		var tmpCont=document.getElementsByClassName('contents');
		jj=e.target.id;
		tmpStr=tmpCont[jj].innerHTML;
		tmpStr=tmpStr.replace(/^\n/,'');
		tmpStr=tmpStr.replace(/^\t\t\t/,'');
		tmpStr=tmpStr.replace(/<br>\n/gi,'\n');
		tmpStr=tmpStr.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
		tmpStr = tmpStr.split("&amp;").join("&");
		tmpStr = tmpStr.split("&quot;").join('"');
		tmpStr = tmpStr.split("&nbsp;").join(" ");
		tmpStr = tmpStr.split("&copy;").join("©");
		tmpStr = tmpStr.split("&lt;").join("<");
		tmpStr = tmpStr.split("&gt;").join(">");
//		tmpStr=tmpStr.replace(//gm,'');
		tArea.value=tmpStr;
	}
	
	
})();
