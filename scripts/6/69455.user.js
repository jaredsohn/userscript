// ==UserScript==
// @name           Whirlpool Image Uploader
// @namespace      blurg!
// @description    Whirlpool Image Uploader
// @include        http://forums.whirlpool.net.au/*
// @version        0.5
// @require        http://userscripts.org/scripts/source/69456.user.js
// ==/UserScript==


var wpup={};

wpup.ifile=document.createElement('input');
wpup.ifile.setAttribute('type','file');
wpup.ifile.setAttribute('id','wpup_ifile');

wpup.tex = document.evaluate( '//textarea[ contains(@id, "qqTextArea") or contains(@id, "body")]',document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

if(wpup.tex.id=='qqTextArea'){
	wpup.qqc=document.querySelector('#qqpostclear');
	wpup.qqc.parentNode.insertBefore(wpup.ifile, wpup.qqc);
}
else{
	if(document.URL.indexOf('/forum/index.cfm?action=reply&t=')>-1){
		document.querySelector('#post').parentNode.parentNode.parentNode.appendChild(wpup.ifile);
	}
	else if(document.URL.indexOf('/whim/')>-1){
		wpup.tex.parentNode.parentNode.parentNode.parentNode.appendChild(wpup.ifile);
	}
	else if(document.URL.indexOf('/user/')>-1){
		wpup.tex.parentNode.parentNode.appendChild(wpup.ifile);
	}	
}

wpup.handleFiles=function(event){
	var files = (event.type=='drop')?event.dataTransfer.files:this.files;
	var file = files[0];
	if(files.length>1){
		alert("One file at a time please");
	}
	else if(!file.type.toLowerCase().match(/image\/jpeg|jpg|png|gif/)){
		alert("This is not an image file");
	}
	else{
		var params = {'key': '19BDEFRS66f90234e5b02d1d342da1a1bcac98a7','fileupload': {value: file.getAsBinary(), filename: file.fileName, type: file.type}};
		BinaryRes.post({
			url: 'http://www.imageshack.us/upload_api.php',
			callback: wpup.on_post,
			data: params
		});
	}
};

wpup.on_post=function(response){
	wpup.tex.value+='\r'+new DOMParser().parseFromString(response.responseText,"text/xml").querySelector('image_link').textContent;
};

wpup.tex.addEventListener("dragover", function(event) {event.preventDefault();}, false);
wpup.tex.addEventListener("dragenter", function(event) {event.preventDefault();wpup.tex.style.borderColor='orange';}, false);
wpup.tex.addEventListener("dragleave", function(event) {event.preventDefault();wpup.tex.style.borderColor='inherit';}, false);
wpup.tex.addEventListener("drop", function(event) {event.preventDefault();wpup.handleFiles(event, 'drag')}, false);
wpup.ifile.addEventListener("change", wpup.handleFiles, false);

