// ==UserScript==
// @name           Handasaim Fix
// @description    Fix the annoying marquee on Handasaim
// @include        http://www.handasaim.co.il/*
// @include        http://handasaim.co.il/*
// ==/UserScript==

(function(){
	var marquee = document.getElementsByTagName('marquee')[0];
	var tickerBody = marquee.parentNode;
	var still = document.createElement('div');
	still.style.maxHeight = GM_getValue('maxHeight', 'none');
	still.style.overflowX = 'hidden';
	still.style.overflowY = 'auto';
	var link;
	for (var i=0; i<marquee.childNodes.length; i++){
		if (marquee.childNodes[i].className == 'tickerItemContainer'){
			link = marquee.childNodes[i].getElementsByTagName('a')[0];
			if (link){
				var ext = link.href.split('.').pop();
				if(ext == 'xls' || ext == 'xlsx'){
					if(GM_getValue('makeBigger', true)){
						link.style.fontSize = '20px';
					}
					if(GM_getValue('changeColor', true)){
						link.style.color = GM_getValue('XLSColor', 'green');
					}
					if(GM_getValue('addBorder', false)){
						link.parentNode.style.border = 'solid black 5px';
					}
					link.parentNode.style.padding = '0';
					
					still.insertBefore(marquee.childNodes[i].cloneNode(true), still.firstChild);
					continue;
				}
			}
			still.appendChild(marquee.childNodes[i].cloneNode(true));
		}
	}
	tickerBody.parentNode.replaceChild(still, tickerBody); 
})();


function config(){
	var inputtedHeight = prompt('News maximum height (in pixels). 0 for auto-adjust', 500);
	if (inputtedHeight > 0){
		GM_setValue('maxHeight', inputtedHeight + 'px');
	}
	else if (inputtedHeight == 0){
		GM_setValue('maxHeight', 'none');
	}
	else{
		alert('Value can\'t be negtive');
		config();
	}
	GM_setValue('makeBigger', confirm('Make Excel links bigger?'));
	var changeColor = confirm('Change Excel link color?');
	GM_setValue('changeColor', changeColor);
	if(changeColor){
		GM_setValue('XLSColor', prompt('New color for Excel links (use web color names or codes):','green'));
	}
	GM_setValue('addBorder', confirm('Add black border to excel links?'));
	
	location.reload();
}
GM_registerMenuCommand('Configure Handasaim Fix', config);