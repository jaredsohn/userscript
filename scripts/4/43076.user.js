// ==UserScript==
// @name        copy STOT text on Twitter
// @namespace   http://d.hatena.ne.jp/Pasta-K
// @description TwitterのpostをSTOT形式に整形して表示。Tweenじゃない人とかwebからちょいっとどうぞ。
// @include     http://twitter.com/*
// ==/UserScript==

function status(){
	post=document.getElementsByClassName("entry-content")[0].textContent;
	metadata_un=document.evaluate('//meta[@name="page-user-screen_name"]',document,null,7,null);
	username=metadata_un.snapshotItem(0).content
	text=(username+":"+post+" ["+location.href+"]");
	document.getElementsByClassName("meta entry-meta")[0].innerHTML+='<input type="text" id="stot_text" value="'+text+'" size="40" readonly="readonly" onfocus="this.select()"/>';
};

function home(u){
	tl=document.getElementById("timeline");
	postblock=tl.getElementsByTagName("li");
	for(i=0;i<postblock.length;i++){
		statusbody=postblock[i].getElementsByClassName("status-body")[0];
		metaspace=statusbody.getElementsByClassName("meta entry-meta")[0];
		post=statusbody.getElementsByClassName("entry-content")[0].textContent;
		posturl=statusbody.getElementsByClassName("entry-date")[0].href;
		if(u.match(/home/)){
			username=statusbody.getElementsByClassName("screen-name")[0].textContent;
		}
		else{
			metadata_un=document.evaluate('//meta[@name="page-user-screen_name"]',document,null,7,null);
			username=metadata_un.snapshotItem(0).content
		};
		text=(username+":"+post+" ["+posturl+"]");
		metaspace.innerHTML+='<br><input type="text" id="stot_text" value="'+text+'" size="40" readonly="readonly" onfocus="this.select()"/>';
	};
};
(function (){
	var u=location.href;

	if(u.match(/status/)){
		status();
	}
	else{
		home(u);
	};
})();