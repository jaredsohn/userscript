// ==UserScript==
// @name           Google Products Link
// @namespace      http://www.myspace.com/willrawls
// @description    Shows the Google "Products" link in the top left bar between "Gmail" and "more". Now handles Google home page, Google search pages, and iGoogle home page
// @include        http://www.google.com/*
// ==/UserScript==


try { // Make sure we don't throw errors
	var gb3 = getElementsByClassName('gb3', 'div', null);
	if(gb3 != null && gb3 != '' && gb3.length > 0) {
		gb3 = gb3[0]; // gb3 div is the "more" link
		var gb2s = getElementsByClassName('gb2', 'div', null);   // gb2 divs are the links inside the "more" link drop down
		if(gb2s != null && gb2s.length > 0) {
			for(i = 0; i < gb2s.length; i++) {
				if(gb2s[i].innerHTML.indexOf('products') > 0 || gb2s[i].innerHTML.indexOf('prdhp') > 0) {
					var exprod = gb2s[i];                       // This is the "Products" link inside the "more" drop down
					var prod = document.createElement('div');   // Ok, create a new gb1 style link between "Gmail" and "more"
					prod.className = 'gb1';   					// gb1 links are the links before the "more" link (like GMail)
					if(exprod.innerHTML.indexOf('prdhp') > 0)
						prod.innerHTML = '<a href="#" onclick="document.location.href=\'http://www.google.com/products?q=\'+document.getElementsByName(\'q\')[0].value+\'&scoring=p&btnG=Search+Products&hl=en\'">Products</a>';
					else // Make products sort by low price
						prod.innerHTML = exprod.innerHTML.replace('">Products','&scoring=p">Products');
					gb3.parentNode.insertBefore(prod, gb3);     // Add the new "Products" gb1 link before the "more" link
					break;
				}
			}
		}
	} else {
		gb3 = document.getElementById('gbar');	// This handles the iGoogle page
		if(gb3 != null) {
			gb3 = gb3.firstChild.firstChild.lastChild.previousSibling.lastChild;	// Nasty huh ?
			var prod = document.createElement('td');   // Ok, create a new gb1 style link between "Gmail" and "more"
			prod.className = 'gb1';   					// gb1 links are the links before the "more" link (like GMail)
			prod.innerHTML = '<a href="#" onclick="document.location.href=\'http://www.google.com/products?q=\'+document.getElementsByName(\'q\')[0].value+\'&scoring=p&btnG=Search+Products&hl=en\'">Products</a>';
			gb3.parentNode.insertBefore(prod, gb3);
		}
}
} catch(e) { }

function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i];
		if(testClass.test(current.className)){
			returnElements.push(current);
		}
	}
	return returnElements;
}
