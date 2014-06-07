// ==UserScript==
// @name 	Google Calendr Ctrl-Arrow
// @description	Add keyboard navigation for google calendar
// @include         http://calendar.google.tld/*
// @include         https://calendar.google.tld/*
// @include         http://www.google.tld/calendar*
// @include         https://www.google.tld/calendar*
// @include         http://google.tld/calendar*
// @include         https://google.tld/calendar*
// @author	Veysel Oezer
// ==/UserScript==

const KEY_LEFT=37;
const KEY_RIGHT=39;
const KEY_UP=38;
const KEY_DOWN=40;

tabs= new Array('day','week','month','user','list');
current=3;
//maybe google will fix that the selected tab is not remenbered for page refresh
start_tab= document.evaluate('//*[@class="modelinkOn"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).firstChild.id.replace(new RegExp('mode-','gi') ,'');
for(var i=0; i<=tabs.length;i++){
	if(tabs[i]==start_tab)
		current=i;
}

function select_tab(){
	tab= tabs[current];
	if (tab=='user'){
		unsafeWindow.ih();
	}
	else if(tab){
		unsafeWindow.Ud(tab);
	}
}

document.addEventListener("keydown", function(e){
	var code=e.keyCode;
	if (e.ctrlKey ){
		switch (code){
			case KEY_LEFT: // Ctrl-Left - previous page
				unsafeWindow.Ce(-1);
				break;            
			case KEY_RIGHT: // Ctrl-Right - next page
				unsafeWindow.Ce(1);
				break;
			case KEY_UP:  // Ctrl-Up - next tab
				if(current<tabs.length)
					current++;
				select_tab();
				break;
			case KEY_DOWN:  //Ctrl-Down - previous tab
				if(current>0)
					current--;
				select_tab();
				break;
		}
        }
}, false);
