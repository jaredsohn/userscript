// ==UserScript==
// @name          Masuda A bone
// @namespace     http://www.petitnoir.net/
// @description   
// @include       http://anond.hatelabo.jp/*
// ==/UserScript==

///////////////////////////////////////////////////////
//あぼーんしたい言葉
//あぼーんしたい言葉を「""」でくくって入力します。複数個追加したい場合は「,」でくぎります。
//入力例
// igonore =["あぼーんしたい言葉1","あぼーんしたい言葉2","あぼーんしたい言葉3"]
var ignore = ["死ね","糞","クソ","くそ","＜●＞","ばーか","スイーツ(笑)"];
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//あぼーんした時タイトルに表示する言葉
//
var abonemessage = "あぼーんしました";
///////////////////////////////////////////////////////

(function abone(){
//本文
	var section = document.evaluate('//div[@class="section"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

	for (i=0; i < section.snapshotLength; i++) {
		var sec = section.snapshotItem(i);
		var p = sec.textContent;
		for (t=0; t < ignore.length; t++){
			var reg = p.match(ignore[t]);
			if(reg){break;}
		}
		if(reg){
			while(sec.firstChild){
				sec.removeChild(sec.firstChild);
			}
			var message = document.createElement('h3');
			message.textContent = abonemessage;
			sec.appendChild(message);		
		}
	}

//言及	
	var　refererlist = document.evaluate('//ul/li',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (i=0; i < refererlist.snapshotLength; i++) {
		var list = refererlist.snapshotItem(i);
		var p = list.textContent;
		for (t=0; t < ignore.length; t++){
			var reg = p.match(ignore[t]);
			if(reg){break;}
		}
		if(reg){
			for(y=0;y < 8 ; y++){
				list.removeChild(list.firstChild);
			}
			var message =document.createElement('span');
			message.textContent = abonemessage;
			list.insertBefore(message, list.firstChild);
		}
	}
})();
