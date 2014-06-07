//
//
// ==UserScript==
// @name          FapBuster for Dirty Service Pack 1.1
// @namespace     http://dirty.ru/
// @description   FapBuster for Dirty Service Pack 1.1
// @include       http://www.dirty.ru/*
// @include       http://dirty.ru/*
// ==/UserScript==

var fap_number = -1;
var fap_timerId;
var fap_img;
var fap_checkTimerId;
var fap_style = "none";

function fap_checkData(){
	if(document.getElementById("dup_show_div").innerHTML.indexOf('<center>') > -1 || document.getElementById("dup_show_div").innerHTML.indexOf('>№') == -1){
		fap_timerId = setTimeout(fap_checkData, 200);
	}else{
		clearTimeout(fap_timerId);
		fap_check();
	}
}

function fap_docChanged(event) {
	if(typeof(event.target.id) !== 'undefined' && event.target.id == "dup_current_id"){
		if(navigator.userAgent.toLowerCase().indexOf("webkit")<0){
			document.getElementById("dup_show_div").addEventListener("DOMAttrModified", fap_attrChanged, false);
		}else{
			//workaround for webkit
			fap_checkTimerId = setInterval(fap_checkVisibility, 200);
		}
	}
}

function fap_checkVisibility(){
	if(document.getElementById("dup_show_div").style.display != "" && fap_style!=document.getElementById("dup_show_div").style.display){
		fap_style = document.getElementById("dup_show_div").style.display;
		if(fap_style == "block"){
			fap_timerId = setTimeout(fap_checkData, 100);
		}
	}
}

function fap_attrChanged(event) {
	if(event.attrName ==  "style"){
		if(event.newValue.indexOf("display: block") > -1){
			fap_timerId = setTimeout(fap_checkData, 100);
		}
	}
}

function fap_checkImage(){
	if(fap_img.width == 0){
		fap_timerId = setTimeout(fap_checkImage, 100);
	}else{
		clearTimeout(fap_timerId);
		if(fap_img.width == 2){
			document.getElementById("dup_his_vote").nextSibling.innerHTML = '<div style="text-align: center; margin-bottom: 6px;"><span style="color:red;font-size:9pt; font-weight:bold;">Кармадрочер</span> <a href="http://karmafap.balkons.lv/" target="_new">info</a></div>' + document.getElementById("dup_his_vote").nextSibling.innerHTML;
		}
	}
}

function fap_check(){
	var fap_oldnumber = fap_number;
	fap_number = parseInt(document.getElementById("dup_show_div").innerHTML.split('>№')[1].split('<')[0]);
	if(fap_oldnumber != fap_number){
		//var xmlHttp = new XMLHttpRequest();
		//xmlHttp.open("GET","http://karmafap.balkons.lv/get.php?id="+fap_number,true);
		//xmlHttp.setRequestHeader('Referer',window.location.protocol+'//'+window.location.host+'/');
		//xmlHttp.onreadystatechange=function(){
		//	if(xmlHttp.readyState==2){
		//		alert(xmlHttp.getResponseHeader("Content-Type"));
		//	}
			//if(xmlHttp.readyState==4){
			//	if(xmlHttp.status==200 && xmlHttp.responseText == "1"){
			//		document.getElementById("dup_profile_note").innerHTML = '<div style="text-align: center; margin-bottom: 6px;"><span style="color:red;font-size:9pt; font-weight:bold;">Кармадрочер</span> <a href="http://karmafap.balkons.lv/" target="_new">info</a></div>' + document.getElementById("dup_profile_note").innerHTML;
			//	}
			//}
		//}
		//xmlHttp.send(null);
		fap_img = new Image();
		fap_img.src = "http://karmafap.balkons.lv/get.php?rnd="+Math.random()+"&id="+fap_number;
		fap_timerId = setTimeout(fap_checkImage, 200);
	}
}

document.addEventListener("DOMNodeInserted", fap_docChanged, false);