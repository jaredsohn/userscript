// ==UserScript==
// @name				ai-challenge Exporter
// @id					ai-challenge_exporter
// @namespace			ai-challenge_exporter
// @version				0.1
// @author				KOLANICH
// @copyright			KOLANICH, 2014
// @description			Helps you export all the files from ai-challenge.com into zip archive
// @license				GNU GPL v3
// @noframes			1
// @icon				http://ai-challenge.com/favicon.ico
// @website				https://github.com/KOLANICH/ai-challenge-Exporter
// @include				http://ai-challenge.com/ru/profile/*
// @resource			jszip	https://raw.github.com/Stuk/jszip/master/jszip.js
// @run-at				document-end
// @contributionURL		https://github.com/KOLANICH/ai-challenge-Exporter/fork
// @contributionAmount	feel free to fork and contribute
// ==/UserScript==
//var unpackCodesRx=/([a-f\d]{32})(\w+\.\w+)\1/ig;
const signature="89c4e347cdca08508a415e959f2a9b5c";
const unpackCodesRx=new RegExp("(?://)?(?:\\r?\\n)*"+signature+"(\\w+\\.\\w+)"+signature+"(?:\\r?\\n)*","ig");
var fileEl= document.createElement("INPUT");
fileEl.type="file";
fileEl.accept="application/javascript, text/javascript";
function checkInjection(){
	if(typeof JSZip==="undefined")
		eval(GM_getResourceText('jszip').replace("var JSZip","JSZip"));
}
function unpackCodes(str){
	let tokenz=unescape(str).split(unpackCodesRx);
	let filez={};
	let j=0;
	/*for(var i=1;i<tokenz.length;i+=3){
		let hash=tokenz[i];
		let code=tokenz[i+2];
		f(hash!=GM_cryptoHash(code, "MD5").toLowerCase()){
			i-=2;
			continue;
		}
		filez[tokenz[i+1]]={};
		filez[tokenz[i+1]].hash=hash;
		filez[tokenz[i+1]].code=code;
		j++;
	}*/
	for(let i=1;i<tokenz.length;i+=2){
		filez[tokenz[i]]={};
		filez[tokenz[i]].code=tokenz[i+1];
		j++;
	}
	return filez;
}
function packCodes(filez,pretty){
	if(typeof pretty=="undefined")pretty=true;
	let str="";
	for(let name in filez){
		str+=(pretty?"//":"")+signature+name+signature+(pretty?"\n"+filez[name].code+"\n":encodeURIComponent(filez[name].code));
	}
	return str;
}

function exportToZip(filez){
	checkInjection();
	var zip = new JSZip();
	console.log(zip);
	for(let fileName in filez){
		zip.file(fileName, filez[fileName].code);
	}
	var blob=zip.generate({type:"blob",compression:"STORE"});
	console.log(blob);
	return URL.createObjectURL(blob);
}

function importFromString(codes){
	codes=unpackCodes(codes);
	codes=packCodes(codes,false);
	var ret = GM_xmlhttpRequest({
		method: "POST",
		data: "data="+encodeURIComponent(codes),
		url : "/upload",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(res) {
			if (res.responseText == "ok") {
				window.location.reload();
				GM_notification("Код сохранен!");
			} else {
				GM_notification("Код не сохранен! Ошибка: " + res.responseText);
			}
		}
	});
}

GM_registerMenuCommand("export to clipboard",function(){
	let filez=unpackCodes(decodeURIComponent(unsafeWindow["tournamentView"].model.attributes.code));
	GM_setClipboard(packCodes(filez),"text");
	alert("Exported to clipboard");
});

GM_registerMenuCommand("export",function(){
	let filez=unpackCodes(decodeURIComponent(unsafeWindow["tournamentView"].model.attributes.code));
	GM_openInTab(exportToZip(filez));
});
GM_registerMenuCommand("export from editor",function(){
	alert("NOT IMPLEMENTED!");
	GM_openInTab("https://github.com/KOLANICH/ai-challenge-Exporter/issues/1");
	/*var spl = this.get("splitCode");
	if (!$(btn).hasClass("disabled")) {
		$(btn).addClass("disabled").html("Отправка...");
	for (var name in spl) {
		data += "89c4e347cdca08508a415e959f2a9b5c" + name + "89c4e347cdca08508a415e959f2a9b5c" + encodeURIComponent(spl[name].cm.getValue());
	}
	let codePacked=decodeURIComponent(unsafeWindow["tournamentView"].model.attributes.code);
	console.log(unpackCodes(codePacked));*/
});

GM_registerMenuCommand("import from string",function(){
	let codes=prompt("Input string");
	if(!codes)return;
	importFromString(codes);
});

var reader = new FileReader();
reader.onload =function(evt){
	let codes=evt.target.result;
	if(!codes)return;
	importFromString(codes);
};
function handleFileSelect(evt) {
	for (let f of evt.target.files) {
		reader.readAsText(f);
		break;
	}
}

fileEl.addEventListener('change', handleFileSelect, false);

GM_registerMenuCommand("import from file",function(){
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
	fileEl.dispatchEvent(evt);
});