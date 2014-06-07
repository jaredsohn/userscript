// ==UserScript==
// @name           Subaru turbo kit v 1
// @author         vasyadze
// @namespace      com.club-subaru.forum
// @description    rap-sila
// @include        http://forum.club-subaru.com/*
// ==/UserScript==


var pagesHandler = function (event){
	
	if((document.getElementById('isFocusedElement') != undefined) &&
		(document.getElementById('isFocusedElement').value == 1)){
		return true;
	}
	
	var span=document.getElementsByClassName('gensmall');
	if(span[0] == undefined){
		return false;
	}
	var tds=span[0].parentNode.parentNode.getElementsByTagName('TD');
	if(tds.length==2){
		span = span[1];
	}else{
		span = span[0];
	}
	
	if(!(event.ctrlKey && ((event.keyCode == 39) || (event.keyCode == 37)))){
		return false;
	}
	
	//alert(document.currentText.nodeName);
	
	if(span.childNodes[0].tagName=='B'){
		var children = span.childNodes[0].childNodes;
	}else{
		return false;
	}
	var page=-1;
	for(var i=0;i<children.length;i++){
		if(children[i].nodeType==1){
			if(children[i].tagName=='B'){
				page=i;
				break;
			}
		}
	}
	if(event.keyCode == 39){
		page+=2;
	}
	if(event.keyCode == 37){
		page-=2;
	}
	if((page < 1) || (page > children.length)) return false;
	window.location = children[page].getAttribute('href');
}

var insertTag = function (tag){
	var href = '';
	var src = '';
	var startTag = '[' + tag + ']';
	var endTag = '[/'+tag+']';
	switch(tag){
		case 'url':
			var url = prompt('Давай, вставь сылку:', 'http://');
			startTag = '[url=' + url + ']';
			endTag = '[/url]';
		break;
		case 'img':
			var url = prompt('Напиши адрес картиночки:', 'http://');
			startTag = '[img]' + url + '[/img]';
			endTag = '';
		break;
	}
	
	var textareas = document.getElementsByTagName('textarea');
	for(var i=0;i<textareas.length;i++){
		if(textareas[i].getAttribute('name') == 'message'){
			txtarea = textareas[i];
			break;
		}
	}
	if(txtarea != null){
		inertToArea(txtarea, startTag, endTag)
	}
}

function messageBoxHandler(textarea){
	
	//fix link button
	var button=document.getElementsByName('addbbcode16');
	if(button.length==1) button=button[0];
	button.setAttribute('onclick', '');
	button.addEventListener("click", function() {insertTag('url')}, false );
	
	//fix image button
	var button=document.getElementsByName('addbbcode14');
	if(button.length==1) button=button[0];
	button.setAttribute('onclick', '');
	button.addEventListener("click", function() {insertTag('img')}, false );
	
	//fix B button
	var button=document.getElementsByName('addbbcode0');
	if(button.length==1) button=button[0];
	button.setAttribute('onclick', '');
	button.addEventListener("click", function() {insertTag('b')}, false );
	
	//fix I button
	var button=document.getElementsByName('addbbcode2');
	if(button.length==1) button=button[0];
	button.setAttribute('onclick', '');
	button.addEventListener("click", function() {insertTag('i')}, false );
	
	//fix U button
	var button=document.getElementsByName('addbbcode4');
	if(button.length==1) button=button[0];
	button.setAttribute('onclick', '');
	button.addEventListener("click", function() {insertTag('u')}, false );
	
	//fix Quote button
	var button=document.getElementsByName('addbbcode6');
	if(button.length==1) button=button[0];
	button.setAttribute('onclick', '');
	button.addEventListener("click", function() {insertTag('quote')}, false );
	
	//fix Code button
	var button=document.getElementsByName('addbbcode8');
	if(button.length==1) button=button[0];
	button.setAttribute('onclick', '');
	button.addEventListener("click", function() {insertTag('code')}, false );
	
	//fix Code button
	var button=document.getElementsByName('addbbcode10');
	if(button.length==1) button=button[0];
	button.setAttribute('onclick', '');
	button.addEventListener("click", function() {insertTag('list')}, false );
}

//god, bless vitek

function inertToArea(txtarea, startTag, endTag){
	//var txtarea = document.getElementById("comment_textarea") || document.getElementById("textarea2");
	txtarea.focus();

	var scrtop = txtarea.scrollTop;

	var cursorPos = getCursor(txtarea);
	var txt_pre = txtarea.value.substring(0, cursorPos.start);
	var txt_sel = txtarea.value.substring(cursorPos.start, cursorPos.end);
	var txt_aft = txtarea.value.substring(cursorPos.end);

	if (cursorPos.start == cursorPos.end){
		var nuCursorPos = cursorPos.start + startTag.length;
	}else{
		var nuCursorPos=String(txt_pre + startTag + txt_sel + endTag).length;
	}
	txtarea.value = txt_pre + startTag + txt_sel + endTag + txt_aft;
	setCursor(txtarea,nuCursorPos,nuCursorPos);

	if (scrtop) txtarea.scrollTop=scrtop;
}

function getCursor(input){
	var result = {start: 0, end: 0};
	if (input.setSelectionRange){
		result.start= input.selectionStart;
		result.end = input.selectionEnd;
	} else if (!document.selection) {
		return false;
	} else if (document.selection && document.selection.createRange) {
		var range = document.selection.createRange();
		var stored_range = range.duplicate();
		stored_range.moveToElementText(input);
		stored_range.setEndPoint('EndToEnd', range);
		result.start = stored_range.text.length - range.text.length;
		result.end = result.start + range.text.length;
	}
	return result;
}
function setCursor(txtarea, start, end){
	if(txtarea.createTextRange) {
		var range = txtarea.createTextRange();
		range.move("character", start);
		range.select();
	} else if(txtarea.selectionStart) {
		txtarea.setSelectionRange(start, end);
	}
}

init();

var txtarea=null;

function init(){
	var textareas = document.getElementsByTagName('textarea');
	for(var i=0;i<textareas.length;i++){
		if(textareas[i].getAttribute('name') == 'message'){
			txtarea = textareas[i];
			break;
		}
	}
	if(txtarea != null){
		messageBoxHandler();
	}
	
	var span=document.getElementsByClassName('gensmall');
	if(span[1] != undefined){
		span=span[1];
		if(span.innerHTML!='<b></b>'){
			document.addEventListener('keydown', pagesHandler, false);
		}
	}
	
	//for correct ctrl-> and ctrl<-
	var isFocused=document.createElement('INPUT');
	isFocused.setAttribute('type', 'hidden');
	isFocused.setAttribute('id', 'isFocusedElement');
	isFocused.value = 0;
	document.body.appendChild(isFocused);
	var allInputs=document.getElementsByTagName('input');
	var textareas=document.getElementsByTagName('textarea');
	var inputs=new Array();
	for(var i=0; i<allInputs.length;i++){
		if(allInputs[i].getAttribute('type') == 'text'){
			inputs[inputs.length]=allInputs[i];
		}
	}
	for(var i=0; i<textareas.length;i++){
		inputs[inputs.length]=textareas[i];
	}
	
	for(var i=0;i<inputs.length;i++){
		inputs[i].addEventListener("focus", function(e) { document.getElementById('isFocusedElement').value=1;}, false );
		inputs[i].addEventListener("blur", function(e) { document.getElementById('isFocusedElement').value=0;}, false );
	}
}



