// ==UserScript==
// @name Vladenia Rent All Button
// @namespace vladenia
// @description Rent all assets in Vladenia app
// @include http://map.artch.ru*
// @author Mr_Mig
// ==/UserScript==

// Нравится кнопка?? Попробуйте Mig[vk]Script!
// http://userscripts.org/scripts/show/54446
var AUTH_CODE;
var ID;
var tran;

	try{
		AUTH_CODE = window.location.href.match(/auth_key=(.+)\&language/)[1];
		ID = window.location.href.match(/viewer_id=(\d+)/)[1];
	}catch(e){};
if (!console.log){console.log = opera.postError};
console.log(ID);

function rentAll(prefix){
var assets = [];

	var arr = document.getElementById(prefix+"_assets_list_content").getElementsByTagName("td");
	
	for (var i = 0, length = arr.length; i<length; i++){
		try {
			assets.push(arr[i].innerHTML.match(/show_asset\((\d+)/)[1]);
		} catch(e){}
	}

	for(var i = 0, length = assets.length; i<length; i++){			
		url = "http://map.artch.ru/start_rent.php?viewer_id="+ID+"&auth_key="+AUTH_CODE+"&id="+assets[i];
		
			tran = new XMLHttpRequest();
			tran.open("GET", url, true);
			
			tran.onreadystatechange = function() {
					if (tran.readyState == 4) {
						
						if(tran.responseText){
							console.log(assets[i] + "\t\t"+tran.responseText)
						}
					}
				};
			tran.send();
		
		console.log("send:\t "+assets[i]);
	}		
};
var b = document.createElement("button");
b.innerHTML = "Сдать все дома!";
b.style.cssFloat = "right";
b.addEventListener("click",function(){rentAll("my");}, true);
document.getElementById("my_assets_list_block").getElementsByClassName("view_options")[0].appendChild(b);
b = document.createElement("button");
b.innerHTML = "Сдать все дома друга!";
b.style.cssFloat = "right";
b.addEventListener("click",function(){rentAll("friend");}, true);
document.getElementById("friend_assets_block").getElementsByClassName("view_options")[0].appendChild(b);