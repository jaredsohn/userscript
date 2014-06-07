// ==UserScript==
// @name          Zhuaxia accesskey
// @namespace     http://www.webinterface
// @description   hot keys of zhuaxia.com
// @include       http://zhuaxia.com/*
// @include       http://*.zhuaxia.com/*
//by zakk zhang (http://www.webinterface.cn)
// ==/UserScript==
(function() {
	var current_count = 0;
	var current_pos = 0;
	var current_item;
	var center = document.getElementById("center");
	center.addEventListener('DOMNodeInserted', function(event){nodeInserted(event);},true);
	center.addEventListener('DOMNodeRemoved', function(event){nodeRemoved(event);},true);
	document.addEventListener('keydown',keyPressed,false);

	function nodeInserted(event){	
		if (event.target.tagName=="DIV"){
			try{
				if (event.target.firstChild.className == "item_row_1" || event.target.firstChild.className == "item_row_2" ){
					if(current_count == 0) {
						var item = event.target.firstChild;
						item.style.border = '2px solid #3875D7';
						current_item = item;
						current_pos = 0;
					}
					current_count++;
				}
			}
			catch(e){
				//GM_log(e);
			}
		}
	}

	function nodeRemoved(event){
		if(event.target.tagName=="DIV"){
			if(event.target.getAttribute("id") == "item_row_title"){
				current_count = 0;
			}
		}
	}

	function keyPressed(event) {
		//alert(event.which);
		switch (event.which) {
			case 74:	// j: next item
				toggleTarget(0);
				break;
			case 75:	// k: previous item
				toggleTarget(1);
				break;
			case 40:	// down
			case 34:	// page down
				toggleTarget(0);
				event.stopPropagation();
				event.preventDefault();
				break;
			case 38:	// up
			case 33:	// page up
				toggleTarget(1);
				event.stopPropagation();
				event.preventDefault();
				break;
			default: 
				break;
		}
	}

	// direction == 1 : next
	//			 == 0 : previous
	function toggleTarget(direction) {
		var center = document.getElementById("center");
		if(center) {
			var allItem, thisItem, curItem;
			allItem = document.evaluate(
				'//div[contains(@class,"item_row_")]',
				center,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
			for (var i = 0; i < allItem.snapshotLength; i++) {
				thisItem = allItem.snapshotItem(i);
				if(thisItem.style.border != null && thisItem.style.border != '') {
					if(direction == 0 && i == allItem.snapshotLength - 1) {
						return;
					} else if(direction == 1 && i == 0) {
						return;
					}
					curItem = thisItem;
					if(direction == 0){
						current_pos = i + 1;
					} else if(direction == 1) {
						current_pos = i - 1;
					}
					thisItem.style.border = '';
				}
			}
			if(curItem) {
				if(direction == 0) {
					var nextNode = curItem.parentNode.nextSibling.firstChild;
					if(nextNode.className == "item_row_1" ||  nextNode.className == "item_row_2") {
						nextNode.style.border = '2px solid #3875D7';
						current_item = nextNode;
						window.scrollTo(0, (nextNode.offsetTop-125));
					}
				} else if(direction == 1){
					var prevNode = curItem.parentNode.previousSibling.firstChild;
					if(prevNode.className == "item_row_1" ||  prevNode.className == "item_row_2") {
						prevNode.style.border = '2px solid #3875D7';
						current_item = prevNode;
						window.scrollTo(0, (prevNode.offsetTop-125));
					}
				}
			}
		}
	}

})();