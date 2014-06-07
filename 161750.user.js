// ==UserScript==
// @author      Shyangs
// @name        Nickname for Baidu-tieba
// @description 為百度貼吧吧友取個暱稱
// @namespace   http://wiki.moztw.org/%E4%BD%BF%E7%94%A8%E8%80%85:Shyangs#Nickname4Baidutieba
// @include     http://tieba.baidu.com/p/*
// @include     http://tieba.baidu.com/f?*ct=*
// @include     http://tieba.baidu.com/f?*kz=*
// @include     http://jump.bdimg.com/p/*
// @include     http://jump.bdimg.com/f?*ct=*
// @include     http://jump.bdimg.com/f?*kz=*
// @version     0.6
// @grant       GM_getValue
// @grant       GM_setValue
// @updateURL   https://userscripts.org/scripts/source/161750.meta.js
// @downloadURL https://userscripts.org/scripts/source/161750.user.js
// @icon        http://tb.himg.baidu.com/sys/portrait/item/4daf736879616e6773fc03
// @license     MIT License; http://opensource.org/licenses/mit-license.php
// ==/UserScript==

let gObj = {};

let $ = function(id) document.getElementById(id);

let insertAfter = function(newElement,targetElement){
	let parent = targetElement.parentNode;
	if (parent.lastChild === targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
};

let GM_sV = function(obj, name, value){
	obj[name] = value;
	GM_setValue("jStr", JSON.stringify(obj));
};

let GM_gV = function(name){
	let name=JSON.parse(GM_getValue("jStr"))[name];
	return (name?name:null);
};

let (nickName){
	var getNickName = function(UID) ( (nickName=GM_gV(UID)) ?nickName:"(N)");
}

let newSpan = function(elmt){
	let UID = elmt.getElementsByClassName('p_author_name')[0].childNodes[0].nodeValue;	
	let newSpan=document.createElement("span");
	let newText=document.createTextNode(getNickName(UID));
	newSpan.setAttribute("class", "nickname_span");
	newSpan.setAttribute("title", "Edit Nickname");
	newSpan.appendChild(newText);
	newSpan.addEventListener('click', function(){
		let newNickName, nickName = getNickName(UID);
		newNickName = (newNickName = prompt("Edit Nickname", nickName))===null?nickName:newNickName;
		this.childNodes[0].nodeValue = newNickName;
		GM_sV(gObj, UID, newNickName);
	}, false);
	return newSpan;
};

//如果，GM 的 "jStr" key 值 未定義(i.e.不存在)，存預設值進去，使之存在；如果 key值存在，讀取既有資料到gObj
let (jStr=GM_getValue("jStr")){
	(typeof(jStr)==="undefined")?GM_setValue("jStr",JSON.stringify(gObj)):gObj=JSON.parse(jStr);
}

let main = function(elmt){
	let d_name = elmt.getElementsByClassName('d_name'); 
	let (ii = d_name.length){
		while(ii--){
			insertAfter(newSpan(d_name[ii]), d_name[ii]);
		}
	}
};

main($('j_p_postlist'));


let observer = new MutationObserver(function(mutations){
	mutations.forEach(function(mutation){
		observer.disconnect();
		for( let item of mutation.addedNodes ){
			if(0===item.getElementsByClassName('nickname_span').length){
				main(item);
			}
		}		
		observer.observe($('j_p_postlist'), {childList: true});
	});
});
observer.observe($('j_p_postlist'), {childList: true});
