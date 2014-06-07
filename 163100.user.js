// ==UserScript==
// @name        ReadableFeedly
// @namespace   http://www.feedly.com
// @description A little treatment for Feedly
// @include     http://www.feedly.com/home*
// @include     https://www.feedly.com/home*
// @version     0.1
// @grant       none
// ==/UserScript==

// change to reability
function makeReadability() {
	var quicklook = document.querySelector('div.entryBody');
    if (quicklook && quicklook.style.display !== 'none') {
        var xmlhttp=new XMLHttpRequest();
		xmlhttp.onreadystatechange=function() {
			if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                quicklook.innerHTML = JSON.parse(xmlhttp.responseText).content;
		    }
        };
		xmlhttp.open("GET","https://www.readability.com/api/content/v1/parser?token=GET_AN_API_KEY_AND_REPLACE_ME&url=" + document.querySelector('div.entryHeader>a').href,true);
		xmlhttp.send();
    }
}

function getInt(obj) {
    return obj==null ? 0 : parseInt(obj.textContent.replace('+','').replace('K','000'));
}

function sortTitleViewList() {
    var nl = document.querySelectorAll('div.u0Entry');
    var rows = [];
	for(var i = nl.length; i--; rows.unshift(nl[i]));
    rows = rows.sort(function(a,b){return getInt(b.querySelector('span.nbrRecommendations')) - getInt(a.querySelector('span.nbrRecommendations'));});
    var view = document.getElementById('section0_column0');
    view.innerHTML = '';
    for (var i=0; i<rows.length; i++) {
        view.appendChild(rows[i]);
    }
}

var keyActions = {
  's65' : function() {
    // shift+a - mark all as read

    var pageActionMarkAsRead = document.getElementById('pageActionMarkAsRead');
    if (pageActionMarkAsRead && pageActionMarkAsRead.style.display !== 'none') {
      // mark as read button is present and visible - we can click on it
      pageActionMarkAsRead.click();
    }
  },
    
  's83' : sortTitleViewList, 
    // shift+s - sort the list in Title View by number of +1
    
  's68' : function() {
    // shift+d - move to next category

    var pageActionJumpToNext = document.querySelector("img[data-app-action='jumpToNext']");
    if (pageActionJumpToNext && pageActionJumpToNext.style.display !== 'none') {
      // jumpToNext button is present and visible - we can click on it
      pageActionJumpToNext.click();
    }
  },
    
  's82' : makeReadability, 
    // shift+r - make readability if something
  
  's88' : function() {
    // shift + x -- expand/collapse selected category
    var selcat = document.querySelector('#feedlyTabs .header.target.selected');
    
    if (selcat != null) {
      var handle = selcat.querySelector('.handle');
      if (handle != null) {
        var evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        handle.dispatchEvent(evt);
      }
    }
  }
};

var getPressedKeys = function(e) {
	var keys = '';

	e.shiftKey && (keys += 's');
	e.ctrlKey && (keys += 'c');
	e.metaKey && (keys += 'm');
	e.altKey && (keys += 'a');

	keys += e.keyCode;

	return keys;
};

document.addEventListener('keydown', function(e) {
	var pressedKeys = getPressedKeys(e);

	var handler = keyActions[pressedKeys];
	if (handler) {
		handler();

		// stop event propagation
		e.stopPropagation();
		e.preventDefault();
	}
}, false);
