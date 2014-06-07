// ==UserScript==
// @name        iGoogle menu expander
// @namespace   userscripts.org
// @include     http://www.google.com/ig*
// @version     2
// ==/UserScript==

l = function(t){console.log(t)};
var tabBar, appBar, appName, items, gadgets, popWindow, tabs, itemsShown=1;
var loadTime = new Date();
var isSettingsPage = location.href.indexOf('settings')!=-1

// add some styles used by the popup menu
GM_addStyle(""
+".ig_pop { display:block; position:relative;}"
+".ig_pop:hover ul {display:block; }"
+".ig_pop ul { display:none; position:absolute; top:28px; width:110px; border:1px solid silver; background-color:#fdfdfd; }"
+".ig_pop ul li { list-style-type:none; margin:0;}"
+".ig_pop ul li a { display:block; padding:0px 5px; color:#555; text-decoration:none;}"
+".ig_pop ul li:hover a { background-color:#f5f5f5;}"
);

// start the script
init = function(){
	if(isSettingsPage){ // code that should be run on the igoogle settings page
		try{
			tabs = [];
			menu = document.getElementById('menu');
			lis = menu.getElementsByTagName('li');
			for(i=0;i<lis.length;i++){
				li = lis[i];
				if(li.id=='newset')continue;
				tabs.push([li.id.substr(3),li.lastChild.innerHTML]);
			}
			GM_setValue('ig_tabs', JSON.stringify(tabs));
			if(location.href.indexOf('#ig_script')!=-1){
				window.location.replace('http://www.google.com/ig');
			}
		} catch(e){
			newInit();
		}
	} else { // the regular igoogle page
		tabs = JSON.parse(GM_getValue('ig_tabs', false));
		if(!tabs){
			window.location.replace('http://www.google.com/ig/settings#ig_script');
		}
		try {
			tMenu = document.getElementById('tab_menu');
			tabBar = tMenu.parentNode;
			appBar = tabBar.parentNode;
			gadgets = appBar.lastChild;
			appName = appBar.firstChild;
		} catch(e){
			return newInit();
		}
		window.addEventListener('resize', function(e){showItems();}, false);
		showItems();
	}
};


/* Calculates the nr of tabs that could fit in the window
*/
getAvailableSpace = function(){
	barWidth = appBar.offsetWidth - (220+16+16+276); // igoogle name + space on the rightside + gadgets
	buttonWidth = 103+16;
	nrItems = Math.floor(barWidth / buttonWidth);
	return nrItems;
}

/* shows the tabs in the tabbar */
showItems = function(){
	var nrItems = getAvailableSpace();
	if(itemsShown==nrItems)return;
	itemsShown = nrItems;
	tabBar.innerHTML='';
	for(i=0;i<tabs.length;i++){
		if(nrItems>i){ //create tab
			tab = newTab(i,tabs[i][0],tabs[i][1]);		
			if(nrItems==i+1 && nrItems<tabs.length){ //if last tab && more tabs then possible to display 
				//create and append indicator
				span = document.createElement('span');
				span.className='kdDisclosureIndicator';
				tab.appendChild(span);
				//create and append popwindow
				popWindow = document.createElement('ul');
				popWindow.innerHTML = '';
				tab.className +=' ig_pop';
				tab.appendChild(popWindow);
			}
			//append created tab
			tabBar.appendChild(tab);
		} else { // create element in popwindow
			li = document.createElement('li');
			li.innerHTML = '<a href="#t_'+tabs[i][0]+'">'+tabs[i][1]+'</a>';
			popWindow.appendChild(li);
		}
	}
}

/* Create a single tab */
newTab = function(index,id,name){
	tab = document.createElement('a');
	tab.href = '#t_'+id;
	tab.className = "kdButton kdTabMenu";
	tab.tabIndex=index;
	span = document.createElement('span');
	span.className="kdTabName";
	span.innerHTML=name;
	tab.appendChild(span);
	return tab; 
}

/* if init failed this function is called. To initialize the script again in 100ms */
newInit = function(){
	if (new Date() - loadTime < 10000) setTimeout(init, 100);
}

// and RUN!
init();