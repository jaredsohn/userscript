// ==UserScript==
// @name          Google Reader Bottom Link
// @description	  Adds a link to the original page in all items in Google Reader at the end of the items
// @namespace     http://www.openjs.com/
// @include       http://google.co*/reader/*
// @include       http://www.google.co*/reader/*

//by Binny V A (http://www.openjs.com/)
// ==/UserScript==

(function(){
	function insertLink() {
		var entries = getElementsByClassName("entry");
		for(var i in entries) {
			var entry = entries[i];
			if(!entry.getElementsByTagName) continue;
			var title = getElementsByClassName("entry-title","h2",entry);
			if(!title.length) continue;
		
			var link = title[0].getElementsByTagName("a")[0].href;
			var tabs = getElementsByClassName("entry-actions","div",entry);
			if(!tabs.length) continue;
			tab = tabs[0];
			if(getElementsByClassName("original-article","span",tab).length) continue; //If that article already has a link, ignore it.
			//tab.innerHTML = "<span class=\"original-article link\"><a href='"+link+"' style=''></a></span>" + tab.innerHTML;
			var span = document.createElement("span");
			span.className = "original-article link";
			var a_link = document.createElement("a");
			a_link.href = link;
			a_link.setAttribute('style','text-decoration:none;padding-right:10px;');
			a_link.appendChild(document.createTextNode("Original Article"));
			span.appendChild(a_link);
			tab.insertBefore(span,tab.firstChild);
		}
	}
	
	
	//Get all the elements of the given classname of the given tag.
	function getElementsByClassName(classname,tag,scope) {
		if(!tag) tag = "*";
		scope = scope||document;
		var anchs =  scope.getElementsByTagName(tag);
		var total_anchs = anchs.length;
		var regexp = new RegExp('\\b' + classname + '\\b');
		var class_items = new Array()
		
		for(var i=0;i<total_anchs;i++) { //Go thru all the links seaching for the class name
			var this_item = anchs[i];
			if(regexp.test(this_item.className)) {
				class_items.push(this_item);
			}
		}
		return class_items;
	}

	insertLink();
	window.setInterval(insertLink,15000);
})();