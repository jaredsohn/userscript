// ==UserScript==
// @name           SinaWeiboHelper
// @namespace      http://shuai.be/
// @include        http://t.sina.com.cn/*
// ==/UserScript==

function addUnfo(){
	var ul = document.getElementById("feed_list");
	var li = ul.getElementsByTagName("li");
	var length = li.length;
	for(var i=0; i<length; i++){
		var img = li[i].getElementsByTagName("img")[0];
		var uid = img.getAttribute("uid");
		var name = img.title;
		var p = li[i].getElementsByTagName('div')[0].getElementsByTagName('p');
		if(p.length == 0){
			var unfo = document.createElement('p');
			var div = li[i].getElementsByTagName('div')[0];
			unfo.innerHTML = "<a onclick=\"App.followcancel('" + uid + "',this,'0','" + name + "','他');return false;\" href=\"javascript:;\">取消关注</a>";
			unfo.setAttribute("style","text-align:center; margin-top:5px;");
			if(div.className == "head_pic"){
				div.appendChild(unfo);
			}
		}
	}
}

function addUnfoTemp(){
	var ul = document.getElementById("myTempFeedUl").nextSibling;
	var li = ul.getElementsByTagName("li");
	var length = li.length;
	for(var i=0; i<length; i++){
		var img = li[i].getElementsByTagName("img")[0];
		var uid = img.getAttribute("uid");
		var name = img.title;
		var p = li[i].getElementsByTagName('div')[0].getElementsByTagName('p');
		if(p.length == 0){
			var unfo = document.createElement('p');
			var div = li[i].getElementsByTagName('div')[0];
			unfo.innerHTML = "<a onclick=\"App.followcancel('" + uid + "',this,'0','" + name + "','他');return false;\" href=\"javascript:;\">取消关注</a>";
			unfo.setAttribute("style","text-align:center; margin-top:5px;");
			if(div.className == "head_pic"){
				div.appendChild(unfo);
			}
		}
	}
}

setInterval(addUnfo,5000);
setInterval(addUnfoTemp,5000);