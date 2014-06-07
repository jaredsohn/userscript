// ==UserScript==
// @name           Twitter Incremental Search Helper
// @description    Twitterページ内をインクリメンタルサーチ
// @namespace      http://userscripts.org/users/81646
// @include        http://twitter.com/*
// @exclude        http://twitter.com/friends
// @exclude        http://twitter.com/followers
// ==/UserScript==

(function(){

    // 検索ボックス生成
    var ipt = document.createElement("input");
    ipt.type = "text";
    var txt = document.createTextNode("インクリメンタルサーチ：");
    var p = document.createElement("p");
    p.appendChild(txt);
    p.appendChild(ipt);
    var tl = document.getElementById("timeline");
    tl.parentNode.insertBefore(p, tl);

    // フォーカスが当たったとき
    ipt.addEventListener("focus", function(){
	ipt.style.background = "#FFFFC0";
    }, false);

    // フォーカスが外れたとき
    ipt.addEventListener("blur", function(){
	ipt.style.background = "#FFFFFF";
    }, false);

    // 検索処理
    ipt.addEventListener("keyup", function(){
	var reg = new RegExp(ipt.value, "i");
	var ecs = document.getElementsByClassName("entry-content");
	for(var i=0; i<ecs.length; i++){
	    ecs[i].parentNode.parentNode.style.display = "block";
	}
	for(var i=0; i<ecs.length; i++){
	    var content = new Array;
	    for(var j=0; j<ecs[i].childNodes.length; j++){
		if(!!ecs[i].childNodes[j].childNodes[0]){
		    content.push(ecs[i].childNodes[j].childNodes[0].nodeValue);
		}else{
		    content.push(ecs[i].childNodes[j].nodeValue);
		}
	    }
	    if(!!ecs[i].parentNode.childNodes[0].childNodes[0].innerHTML){
		if(!content.join("").match(reg) &&
		   !ecs[i].parentNode.childNodes[0].childNodes[0].innerHTML.match(reg)){
		    ecs[i].parentNode.parentNode.style.display = "none";
		}
	    }else{
		if(!content.join("").match(reg)){
		    ecs[i].parentNode.parentNode.style.display = "none";
		}
	    }
	}
    }, false);

})();
