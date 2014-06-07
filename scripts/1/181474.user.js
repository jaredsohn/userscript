// ==UserScript==
// @id             boards.4chan.org-e07f0e7f-025b-154e-abaf-a5609fdc1dbb@scriptish
// @name           Colored Meme Lines+
// @version        1.5 (fork v0.5)
// @namespace      
// @author         Strategetical (originally by QXQ)
// @description    Color superior memelines and kekflags
// @include        https://boards.4chan.org/*
// @include        http://boards.4chan.org/*
// @run-at         document-end
// ==/UserScript==

function RGB2Color(r,g,b){ return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b); }
function byte2Hex(n){ var nybHexString = "0123456789ABCDEF"; return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1); }
//thanks to http://krazydad.com/tutorials/makecolors.php for rainbow color math
function rainbowColorText(str){
	var phase = 0, center = 128, width = 127, frequency = Math.PI*2/str.length, totalString = '';
	var div = document.createElement('div');
	var escape = document.createElement('textarea');
	div.innerHTML = str;
	if(div.firstChild !== null && div.firstChild !== undefined){
		var decoded = div.firstChild.nodeValue;
	}else{
		var decoded = '';
	}
	for(var i=0; i<decoded.length; ++i){
		red   = parseInt(Math.sin(frequency*i+2+phase) * width + center);
		green = parseInt(Math.sin(frequency*i+0+phase) * width + center);
		blue  = parseInt(Math.sin(frequency*i+4+phase) * width + center);
		escape.innerHTML = decoded.substr(i,1);
		totalString += '<span style="color:' + RGB2Color(red,green,blue) + '">' + escape.innerHTML + '</span>';
	}
	return totalString;
}

var colorsDone = false;
function doColors(){
	var allMessages = document.querySelectorAll('.postMessage:not(.s4colored)');

	for(var i=0; i<allMessages.length; i++){
		allMessages[i].className += ' s4colored';
		lineList = allMessages[i].innerHTML.split('<br>');
		var contains = false;
		lineList.forEach(function(line, index){
			line = line.trim();
			if(line.indexOf('=') == 0 || line.indexOf('</br>=') == 0){
				contains = true;
				line = '<span style="color:rgb(230, 71, 60);">' + line + '</span>';
				lineList[index] = line;
			}else if(line.indexOf('#') == 0 || line.indexOf('</br>#') == 0){
				contains = true;
				line = '<span style="color:rgb(17, 34, 204);">' + line + '</span>';
				lineList[index] = line;
			}else if(line.indexOf('%') == 0 || line.indexOf('</br>%') == 0){
				var tempLines = line.split('<wbr>');
				for(var ii=0; ii<tempLines.length; ii++){
					tempLines[ii] = rainbowColorText(tempLines[ii]);
				}
				line = tempLines.join('<wbr>');
				contains = true;
				lineList[index] = line;
			}
		});
		if(contains) allMessages[i].innerHTML = lineList.join('<br>');
	}

	//A BETTER (but still spaghetti'd) HACK, OH ME OH MY!!!
	if (!colorsDone){
		console.log("Added colors.");
		colorsDone = true;
	}
}
doColors();
var stylething = document.createElement("style");
stylething.setAttribute("id", "stylething");
document.getElementsByTagName("body")[0].appendChild(stylething);
document.getElementById("stylething").innerHTML += "\
<style id='s4style'>\
	@keyframes nodeInserted{\
		from{\
			cursor:auto;\
		}\
		to{\
			cursor:auto;\
		}\
	}\
	@-moz-keyframes nodeInserted{\
		from{\
			cursor:auto;\
		}\
		to{\
			cursor:auto;\
		}\
	}\
	@-o-keyframes nodeInserted{\
		from{\
			cursor:auto;\
		}\
		to{\
			cursor:auto;\
		}\
	}\
	@-webkit-keyframes nodeInserted{\
		from{\
			cursor:auto;\
		}\
		to{\
			cursor:auto;\
		}\
	}\
	@-ms-keyframes nodeInserted{\
		from{\
			cursor:auto;\
		}\
		to{\
			cursor:auto;\
		}\
	}\
	blockquote.postMessage:not(.s4colored){\
		animation-duration: 0.001s;\
		-o-animation-duration: 0.001s;\
		-ms-animation-duration: 0.001s;\
		-moz-animation-duration: 0.001s;\
		-webkit-animation-duration: 0.001s;\
		animation-name: nodeInserted;\
		-o-animation-name: nodeInserted;\
		-ms-animation-name: nodeInserted;\
		-moz-animation-name: nodeInserted;\
		-webkit-animation-name: nodeInserted;\
	}\
</style>";
document.addEventListener('animationstart', doColors, false);
document.addEventListener('MSAnimationStart', doColors, false);
document.addEventListener('webkitAnimationStart', doColors, false);