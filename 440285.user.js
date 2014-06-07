// ==UserScript==
// @name       VK Download All 2.5
// @namespace  http://vk.com/id190985821
// @version    1
// @description  Позволяет скачивать все аудио из поста одним кликом.
// @match      http://vk.com/*
// @match      https://vk.com/*
// @run-at document-end
// ==/UserScript==


//////////////////////////////////////////////////

var cst = '.sel0{ color: #bbb;}';
cst +='.sel1{ color: #45688E;}';
cst +='.seldiv{}';
var html_doc = document.getElementsByTagName('head').item(0);
var dwnld_css = document.createElement('style');
dwnld_css.setAttribute('type', 'text/css');
dwnld_css.innerHTML = cst;
html_doc.appendChild(dwnld_css);
//////////////////////////////////////////////


var aWindow = (typeof unsafeWindow != 'undefined')? unsafeWindow: window;
console.log('window: '+aWindow);
var dwnld_arr = new Array();
var dwnld_arr_i = 0;
var dwnld_timer;




aWindow.dwnld_2arr = function(elem){
	if(typeof elem != 'undefined'){
	dwnld_arr[dwnld_arr.length] = elem;
	console.log("added: "+elem);
	}
}

aWindow.dwnld_clck = function(item){
	if(item.className == "sel1"){
		item.className = "sel0";
	}else{
		item.className = "sel1";
	}
}

aWindow.dwnld_select = function(elem){
    var ab = elem.parentNode.parentNode;
	if(typeof ab.getElementsByClassName('seldiv')[0] == 'undefined'){
		ab.innerHTML += '<div class="seldiv" onclick="return false"></div>';
		var seldiv = ab.getElementsByClassName('seldiv')[0];
		for(var j = 0; typeof ab.getElementsByClassName('play_new down_btn')[j] != 'undefined'; j++){
				seldiv.innerHTML += '<span class="sel1" onclick="dwnld_clck(this)">' + (j+1) + ". " + ab.getElementsByTagName('b')[0].innerText + " - " + 
ab.getElementsByClassName('title')[j].innerText + '</span><br>';
		}
		seldiv.innerHTML += '<br><a class="dwnld_sel_start" onclick="dwnld_sel_start(this)">Скачать выбранное</a>';
	}else{
		var seldiv = ab.getElementsByClassName('seldiv')[0];
		seldiv.parentNode.removeChild(seldiv);
	}
}

aWindow.dwnld_sel_start = function(elem){
	var seldiv = elem.parentNode;
	var sel_arr = new Array();
	for(var i = 0; typeof seldiv.childNodes[i] != 'undefined'; i++){
		if(seldiv.childNodes[i].className == 'sel1'){
			sel_arr[sel_arr.length] = i/2;
		}
	}
	if(sel_arr.length){
		for(var j = 0; j <= sel_arr.length; j++){
			aWindow.dwnld_2arr(seldiv.parentNode.getElementsByClassName("play_new down_btn")[sel_arr[j]]);
		}
	}
}



aWindow.dwnld_start = function(i){
	i = i.parentNode.parentNode;
	for(var j = 0; typeof i.getElementsByClassName('play_new down_btn')[j] != 'undefined'; j++){
	//i.getElementsByClassName("play_new down_btn")[j].click();
		aWindow.dwnld_2arr(	i.getElementsByClassName("play_new down_btn")[j] );
	}
}


aWindow.dwnld_init = function(){
	for(var i = 0; typeof document.getElementsByClassName('post_media clear_fix wall_audio')[i] != 'undefined'; i++){
		if(typeof document.getElementsByClassName('post_media clear_fix wall_audio')[i].getElementsByClassName('dwnld_p')[0] != 'object'){
			document.getElementsByClassName('post_media clear_fix wall_audio')[i].innerHTML += '<span class="dwnld_p"><a class="dwnld_b" onclick="dwnld_start(this);">скачать все</a> &nbsp; <a class="dwnld_select" onclick="dwnld_select(this)">выбрать...</a></span>';
		}
	}

	if(typeof dwnld_arr[dwnld_arr_i] != 'undefined'){	
		dwnld_arr[dwnld_arr_i].click();
		dwnld_arr_i++;
	}
}
aWindow.dwnld_init();
aWindow.setInterval(dwnld_init, 3000);

