// ==UserScript==
// @name           LU 'topnav' customizer
// @namespace      http://n0ctem.net
// @description    Add custom menus to the top of LU pages (next to "Quicklinks")
// @include        *.liberty.edu*
// ==/UserScript==

function Menu(menuName) {
	this.name = menuName;
	var itemList = new Array();
	var menuCode = new Array();

	this.addItem = function(itemName,itemLink) {
		itemList.push([itemName,itemLink]);
	}
	
	this.addToPage = function() {
		// opening tags..
		menuCode.push('<div class="quicklinks"><ul class="dropdown dropdown-horizontal"><li class="dir">'+this.name+' &nbsp;<img src="/wwwadmin/images/v4template/quicklinks_arrow.gif" width="10" height="9"/><ul>');
		
		if (itemList.length > 1) {
			menuCode.push('<li class="quicklinks_first"><a href="'+itemList[0][1]+'">'+itemList[0][0]+'</a>')
			if(itemList.length > 2) {
				for (x = 1; x < itemList.length - 1; x++) {
					menuCode.push('<li><a href="'+itemList[x][1]+'">'+itemList[x][0]+'</a>');
				}
			}
			menuCode.push('<li class="quicklinks_last"><a href="'+itemList[itemList.length-1][1]+'">'+itemList[itemList.length-1][0]+'</a>')
		}
		else {
			menuCode.push('<li class="quicklinks_first quicklinks_last"><a href="'+itemList[0][1]+'">'+itemList[0][0]+'</a>')
		}
		
		// closing tags..
		menuCode.push('</ul></li></ul></div>');
		
		// build menu..
		var menu = document.createElement('div');
		menu.id = 'quicklink';
		menu.innerHTML = menuCode.join('\n');
		
		// cosmetics..
		menu.style.borderLeft = '1px solid #4260a4';
		
		// inject..
		document.getElementById('topnav').appendChild(menu);
	}
}

// Reduce the font size of everything except 'Quicklinks' and our custom menus.
var haystack = document.getElementsByTagName('div');
for (tag in haystack){
	if (haystack[tag].id == 'topnavdiv'){
		haystack[tag].style.fontSize = '8px';
	}
}

var researchMenu = new Menu('Research');
researchMenu.addItem('LU Research Portal',      '/index.cfm?PID=4929');
researchMenu.addItem('LUCAS',                   'http://lucas.liberty.edu/cgi-bin/Pwebrecon.cgi?DB=local&PAGE=First');
researchMenu.addItem('EbscoHost',               'http://ezproxy.liberty.edu:2048/login?url=http://search.ebscohost.com/login.asp?profile=web&defaultdb=a9h');
researchMenu.addItem('MLA Int\'l Bibliography', 'http://ezproxy.liberty.edu:2048/login?url=http://infotrac.galegroup.com/itweb/vic_liberty?db=MLA');
researchMenu.addItem('WorldCat',                'http://ezproxy.liberty.edu:2048/login?url=http://newfirstsearch.oclc.org/;autho=100129701;dbname=WorldCat;timeout=400;done=http://library.liberty.edu;FSIP');
researchMenu.addToPage();