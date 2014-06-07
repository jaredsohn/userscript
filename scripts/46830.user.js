// ==UserScript==
// @name           Iflame
// @author		   Noam Nativ
// @namespace      iflame
// @description    Additional functions for frames And iFrames.
// @include        http://*

// ==/UserScript==
var defOpac = 0.3;
function createBtn(title,func){
	var btn = document.createElement('input');
	btn.setAttribute('type','button');
	btn.setAttribute('value',title);
	btn.style.cursor = 'pointer';
	btn.style.fontSize = '9px';
	btn.style.color = 'black';
	btn.style.backgroundColor = '#f0c860';
	btn.style.margin = '1px';
	btn.style.border='1px solid black';
	btn.style.float='right';
	btn.style.opacity = defOpac;
	btn.addEventListener('click', func, false);
	btn.addEventListener('mouseover', function(){
	  btn.style.opacity = '1';
	}, false);
	
	btn.addEventListener('mouseout', function(){
	  btn.style.opacity = defOpac;
	}, false);
	return btn
}

(function () {
	var iframe = window.frameElement;
	if (window.parent == window//not an iframe
		||
		iframe.parentNode.className.indexOf('mceIframeContainer')>-1//a tinyMce editor
		||
		iframe.className.indexOf('xinha')>-1//xinha editor
		||
		document.location.href.indexOf('fckeditor.html?InstanceName=')>-1//Fck editor
	){
		return false;	
	}

	var btns = new Array();
	btns[btns.length] = createBtn('Refresh',function(){
		document.location.reload();
	});

	btns[btns.length] = createBtn('Url',function(){
		var newurl;
		if(newurl = prompt('Press OK to reload frame with new url.',document.location)){
           document.location.href=  newurl;
		}
	});
	
	btns[btns.length] = createBtn('Source',function(){
			window.open('view-source:'+document.location,'src','width=' + (screen.width-100)+',height='+ (screen.height-200)+ ',scrollbars=yes');
	});
	
	
	btns[btns.length] = createBtn('X',function(){
		var parent = this.parentNode;
		parent.parentNode.removeChild(parent);
	});


	var div = document.createElement('div');
	div.style.position = 'absolute';
	div.style.top = 0;
	div.style.right = 0;
	div.style.zIndex = 1000;

	var x;
	for(x in btns){
		btn = btns[x];
		div.appendChild(btn);
	}
	document.body.appendChild(div);
	
})();

