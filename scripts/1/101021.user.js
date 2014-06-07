//
// ==UserScript==
// @name			YouTube insertion for fanat1k.ru
// @author		joedm
// @namespace		http://forum.fanat1k.ru/
// @description	YouTube insertion for fanat1k.ru
// @include		http://forum.fanat1k.ru/*
// @run-at		document-end
// ==/UserScript==


function addEvent(obj, sEvent, sFunc) {
	if(obj.addEventListener) {
		obj.addEventListener(sEvent, sFunc, false);
	} else if(obj.attachEvent) {
		obj.attachEvent('on' + sEvent, sFunc);
	}
}

function processUrl(url){
	var rawid = url.split("v=")[1];
	if(rawid == null || rawid.length==0){
		return false;
	}
	id = rawid.replace(/(&|#).+/g, "");
	return id;
}

function addControl() {
	var tbl;
	var controls = document.getElementById('vB_Editor_001_controls');
	if (controls) {
		var tables = controls.getElementsByTagName('TABLE');
		tbl = tables[tables.length - 1];
	} else {
		controls = document.getElementById('vB_Editor_QR_controls')
		if (!controls) {
			return;
		}
		var tables = controls.getElementsByTagName('TABLE');
		tbl = tables[0];
	}
	var lastRow = tbl.rows[tbl.rows.length - 1];
	var c = lastRow.insertCell(-1);
	c.innerHTML="<div class='imagebutton' id='__youtube_add_3487652' style='background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgb(225, 225, 226); color: rgb(0, 0, 0); padding-top: 1px; padding-right: 1px; padding-bottom: 1px; padding-left: 1px; border-top-style: none; border-right-style: none; border-bottom-style: none; border-left-style: none; border-width: initial; border-color: initial; background-position: initial initial; background-repeat: initial initial; '><img src='images/editor/createlink.gif' width='21' height='20' alt='Вставить ссылку YouTube' title='Вставить ссылку YouTube'></div>";
	
	var thisBtn = document.getElementById('__youtube_add_3487652');
	addEvent(thisBtn, 'click', function(){
		var url = prompt('Введите URL с youtube:', '');
		var search = url.search("youtube.com/");
		if (search == -1) {
			alert("Поддерживаются только youtube видео");
			return;
		}
		// process
		var id = processUrl(url);
		if(id == false) {
			alert("В URL нет id ролика");
			return;
		}
		var codeAdd = '[URL=' + url + ']YouTube\r\n[IMG]http://img.youtube.com/vi/'+ id +'/0.jpg[/IMG][/URL]';
		var txtAr = document.getElementById('vB_Editor_001_textarea') || document.getElementById('vB_Editor_QR_textarea');
		txtAr.value += codeAdd;
	
	});
}

addControl();

