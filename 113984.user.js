// ==UserScript==
// @name           Facebook Top Story Reader
// @description    Marks Top Story items as read (removes them from headlines).
// @version        0.2.1
// @author         Brendan Hagan
// @include        http://*facebook.com*
// @include		   https://*facebook.com*
// ==/UserScript==

//var auto = GM_getValue('auto', false); 

function headline() {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window,
		0, 0, 0, 0, 0, false, false, false, false, 0, null);
	//var links = $("li[data-label*='This is not a headline'] a"); 
	var topPost = 0;
	var regPost = 0; 
	var links = document.evaluate(
		"//a[@class='uiTooltip highlightIndicator']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i=0; i < links.snapshotLength; i++) { 
		//GM_log('last child: ' + links.snapshotItem(i).textContent);
		if (links.snapshotItem(i).textContent == "Highlighted Story") { 
			links.snapshotItem(i).dispatchEvent(evt); 
			topPost++;
		}
		else if (links.snapshotItem(i).textContent == "Highlight this story") { 
			//links.snapshotItem(i).style.background = "#232323"; 
			regPost++; 
		}
	}
	GM_log('Cleared ' + links.snapshotLength + ' headlines. '  + topPost + '/' + regPost);
	if (topPost > 0) { 
		headline(); //Recursive Loop to hit all? Current script might be too quick for ajax responses.
	}
}

GM_registerMenuCommand("Clear Top Stories", headline);
//GM_registerMenuCommand("Top Stories Auto: " + auto.toString(), function() { auto = !auto; GM_setValue('auto', auto); GM_log('auto = ' + auto); }); 

if (menu = document.evaluate(
		"//li[@id='navAccount']/ul",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)) { 
	try { 
	var configLink = document.createElement('li');
	//GM_log('target: ' + menu.snapshotItem(0).textContent); 
	configLink.innerHTML = '<a class="navSubmenu" id="readerConfigMenuLink" href="#" onclick="return false;">' + 'Clear Top Stories' + '</a>';
	menu.snapshotItem(0).insertBefore(configLink, menu.snapshotItem(0).childNodes[2]);
	//on('click', '#readerConfigMenuLink', headline);
	document.getElementById('readerConfigMenuLink').addEventListener('click', 
		function(event) {
			headline();  
		}, false);
	} catch(e) {} 
}