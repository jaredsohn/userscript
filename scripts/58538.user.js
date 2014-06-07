// ==UserScript==
// @name           IT keyboard shortcut
// @namespace      http://efcl.info/
// @include        http://情報処理試験.jp/*
// ==/UserScript==
/* 説明
	j :次の問題
	k :前の問題
	a :解説
	q :そのページをしおり 左下のリンクから戻れる。
*/
document.addEventListener("keyup", function(e){Jump(e.which);}, false);
var l = document.links;
var prev,next,answer;    
for(var i =0; i < l.length;i++){
    if(l[i].textContent == "←前の問題"){
	    prev = l[i];
	  }else if(l[i].textContent == "次の問題→"){
	  	next = l[i];
	  }else if(l[i].textContent == "解説を見る"){
	  	answer = l[i];
	  }
}
if(getLastPage()){
	console.log("test");
	makeLastLink();
}

function Jump(e){
    if(e == 75 && prev){
			location.href = prev.href;
    }else if(e == 74 && next){
			location.href = next.href;
    }else if(e == 65 && answer){
    	location.href = answer.href;
    }else if(e == 81){
    	savePage();
    }
}
function makeLastLink(){
	 	var helpDiv = document.createElement('div')
    helpDiv.setAttribute('id', 'GM_last_page')
    var a = document.createElement('a')
    a.innerHTML = '〆'
    a.href = getLastPage();
    helpDiv.appendChild(a);
    document.body.appendChild(helpDiv);
  GM_addStyle(<><![CDATA[
  	#GM_last_page{
			position : fixed; /* これで画面固定 */
			bottom : 0;
			left : 0;
			height : 20px; /* ヘッダの高さを指定 */
			background-color : #ffffff; /* 背景色を指定する必要あり */
			border-top : 0px;
			border-left : 0px;
			border-right : 0px;
			text-decoration:none;
			opacity : 0.5;
	]]></>);
}
function getLastPage(){
		return GM_getValue('lastPage') || false;
}
function savePage(){
	GM_setValue('lastPage', location.href);
}