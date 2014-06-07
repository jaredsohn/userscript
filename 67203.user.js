// ==UserScript==
// @name           nawigacja
// @namespace      http://userscripts.org/scripts/edit_src/67203
// @include        http://pl*.plemiona.pl/*
// @include        http://pl34.plemiona.pl/*
// ==/UserScript==

document.addEventListener('keyup', hotkeyHandler, false);

function hotkeyHandler(e) { 
	var t = getTarget(e);
	if ((t.type && t.type == "text") || t.nodeName == "TEXTAREA") {
		// do nothing
	} else  if(e.keyCode == 37){
		//left
		doNavigate(doc, 1);
	}else if(e.keyCode == 39){
	 //right
		doNavigate(doc, 2);
	}
}

doc = getGameDoc();

function getGameDoc(){
	getdoc=window.document;
	if(!getdoc.URL.match('game\.php')){
		for(var i=0;i<window.frames.length;i++){
				if(window.frames[i].document.URL.match('game\.php')){
						getdoc=window.frames[i].document;
				}
		}
	}
return getdoc;
};

function getTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}
		
function doNavigate(doc, direction){
								
refs=window.document.getElementsByTagName('a');

	if(direction == 1){
		for(i=0;i<refs.length;i++){
			if(refs[i].getAttribute('accesskey')=='a'){
				location.href=refs[i].href;
			}
		}
	}else if(direction == 2){
		for(i=0;i<refs.length;i++){
			if(refs[i].getAttribute('accesskey')=='d'){
				location.href=refs[i].href;
			}
		}
	}
}
