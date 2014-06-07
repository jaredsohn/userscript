// ==UserScript==
// @id             boards.4chan.org-e07f0e7f-025b-154e-abaf-a5609fdc1dbb@scriptish
// @name           Meme lines colour
// @version        1.6
// @namespace      
// @author         QXQ
// @description    Colour superior meme lines and kekflags
// @include        https://boards.4chan.org/*
// @include        http://boards.4chan.org/*
// @run-at         document-end
// ==/UserScript==
(function(){
var watchForUpdates = 'MutationObserver' in window;
var allMessages = document.querySelectorAll('.postMessage');
var thread = document.querySelector('.thread');
var threadWatcher;

init();

function init(){
	for(var i=0; i<allMessages.length; i++){
		processPost(allMessages[i]);
	}
	if(watchForUpdates){
		threadWatcher = new MutationObserver(updateNewPosts);
		var options = {
			'childList': true,
			'attributes': false,
			'characterData': true
		};
		threadWatcher.observe(thread, options);
	}
}

function updateNewPosts(newPosts){
	for(var i=0; i<newPosts[0].addedNodes.length; i++){
		processPost(newPosts[0].addedNodes[i].querySelector('.postMessage'));
	}
}

function processPost(_postEl){
	if(_postEl.className.indexOf('postMessage') == -1) return;
	lineList = _postEl.innerHTML.split('<br>');
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
	if(contains) _postEl.innerHTML = lineList.join('<br>');
}

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
function RGB2Color(r,g,b){ return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b); }
function byte2Hex(n){ var nybHexString = "0123456789ABCDEF"; return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1); }
})();