// Google Reader Multiple Columns
// version 0.1
// 2009-12-15
//-----------
// ==UserScript==
// @name          Google Reader Multiple Columns
// @namespace     http://google.com/reader/greasemonkey/content
// @description   Google Reader Multiple Columns
// @include    http*://reader.google.com/*
// @include    http*://www.google.com/reader/*
// @include    http*://google.com/reader/*
// ==/UserScript==

(function(){

    

    function addColumnButton(event) {
		var isCurrentEntry = (event.relatedNode.ownerElement.tagName == "DIV") && (event.attrName == "id") && (event.newValue == "current-entry");
		if(isCurrentEntry){
		
			var entryActions = document.querySelectorAll("#current-entry div.entry-actions")[0];
			var span = document.createElement("span");
			span.className = "link unselectable";
			span.innerHTML = "Columize";
			span.addEventListener("click", function(){
				var itembody = document.querySelectorAll("#current-entry div.item-body")[0];
				itembody.style.MozColumnWidth = '20em';
				itembody.style.overflow = 'visible';
				var imgs = itembody.querySelectorAll("img,object");
				for(var i=0; i<imgs.length; i++){
					imgs[i].style.display = "none";
				}
			}, false);
			
			entryActions.appendChild(span);
		
	    }
    }


    // add supported
    document.getElementById("entries").addEventListener("DOMAttrModified", addColumnButton, 0);
})();
