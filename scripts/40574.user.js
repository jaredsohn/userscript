// ==UserScript==
// @name           paid4clickz
// @namespace      dt@thedt.net
// @description    auto clicks paid ads
// @include        http://*paid4clickz.com/*
// ==/UserScript==

//script by dt


const surfTable = "/html/body/table/tbody/tr[2]/td/div/table/tbody/tr/td/div/table[2]/tbody/tr/td/table[1]";
const surfTable1 = "/html/body/table/tbody/tr[2]/td/div/table/tbody/tr/td/div/form/table/tbody/tr/td/p/input[7]";
const linksx = '//td[@class="al3"]/span/a';
var currentWindow;
var currentElement;
var links;


	var surf = document.evaluate(surfTable, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
	var container = document.createElement('div');
	
	var button = document.createElement('button');
	button.innerHTML = "Start";
	button.addEventListener('click', startSurf, false);
	container.appendChild(button);
	
	var clear = document.createElement('button');
	clear.innerHTML = "Clear log";
	clear.addEventListener('click', clearDebug , false);
	container.appendChild(clear);
		
	container.appendChild(document.createElement('br'));
	
	var progress = document.createElement('textarea');
	progress.style.width = "100%";
	progress.style.height = "7em";
	progress.setAttribute('readonly', 'true');
	container.appendChild(progress);
	
	surf.parentNode.insertBefore(container, surf);
	
	startSurf();
	
	olyi;

function adwatchDone(){
	debug('DONE moving to next..');
	
	
	var strike = document.createElement('strike');
	strike.setAttribute('style', 'color: #660000');
	strike.innerHTML = currentElement.innerHTML;
	currentElement.parentNode.replaceChild(strike, currentElement);
	
	setTimeout(function(){
		currentWindow.close();
		processLink();
	}, 2000);
}

var watcher;

function watchLocation(){
	
	//currentWindow.onLoad.apply(currentWindow,[]);
	
	watcher = setInterval(function(){
		
		var frames = currentWindow.document.getElementsByName('success');
		var frame = frames[0];
		debug('check_' + frame.contentWindow.location.href);
		if(frame.contentWindow.location.href.match("http://paid4clickz/success.php")){
			adwatchDone();
			clearInterval(watcher);
		}
	}, 5000);
	
	
	currentWindow.currentElement = currentElement;
}


function processLink(){
	var element = links.pop();
	
	if(element){
		debug('processing: ' + element.href);
		currentElement = element;
		var url = element.getAttribute('href');
		currentWindow = window.open(url);
		currentWindow.addEventListener('DOMContentLoaded', watchLocation, false);
		debug('opened window, waiting...');
	}else{
		debug('finished all links');
	}
}

function getLinks(){
	var links = document.evaluate(linksx, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var work = [];

	for(var i=0;i<links.snapshotLength;i++){
		var item = links.snapshotItem(i);
		//can filter items here
		work.push(item);
	}
	
	return work;
}


function olyi(){
	var surf1 = document.evaluate(surfTable1, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var inp = document.createElement('input');
	inp.name='r';
	inp.type='hidden';
	inp.value='jedra';
	surf1.parentNode.insertBefore(inp, surf1);
}

function startSurf(){
	debug('Started');
	button.setAttribute('disabled', 'disabled');
	links = getLinks();
	links.reverse();
	debug("URLS: " + links);
	processLink();
}

function clearDebug(){
	progress.value = "";
}

function debug(str){
	if(progress.value.length >= 1){
		progress.value += "\n" + str;
	}else{
		progress.value = str;
	}
	progress.scrollTop = progress.scrollHeight;

}

