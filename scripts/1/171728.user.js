// ==UserScript==
// @name           Google Disable Autocomplete
// @namespace      smk
// @author         
// @description    
// @include        http://*.google.tld/*
// @include        https://*.google.tld/*
// @run-at         document-end
// ==/UserScript==

function getSearchBox(){
	return document.querySelector('input[name="q"][type="text"]');
}

function stopPropagationListener(e){
	e.stopPropagation();
}

function removeQueryComplete(){
	//simple method to disable autosuggest by getting rid of all listeners
	//google uses jquery, but the jquery code is optimized and has different method names
	let searchBox=getSearchBox();
	if(!searchBox)
		return
	let searchBoxClean=searchBox.cloneNode(false);
	searchBoxClean.setAttribute('autocomplete','on');
	let stopPropEvents='input change keypress keydown keyup'.split(' ');
	for(let stopPropEvent of stopPropEvents){
		searchBoxClean.addEventListener(stopPropEvent,stopPropagationListener,false);
		//use getters/setters to prevent the re-definition of properties
		Object.defineProperty(searchBoxClean.wrappedJSObject,'on'+stopPropEvent,{
			get: function() stopPropagationListener,
			set: function() null,
		});
	}
	searchBoxClean.addEventListener('keyup',function(e){
		if(e.keyCode==13)
			getSearchBox().form.submit();
	});
	//remove addEventListener as a precaution
	searchBoxClean.wrappedJSObject.addEventListener=function(){};
	searchBox.parentNode.appendChild(searchBoxClean);
	searchBox.parentNode.removeChild(searchBox);
	return searchBoxClean;
}

function main(){
	//page init
	removeQueryComplete();
	//google changes this element after the page is loaded, so add a mutation observer
	//to test if the changes are caught on the final page:
	//	var searchBox=document.querySelector('input[name="q"][type="text"]');
	//	searchBox.onkeydown
	var observer=new MutationObserver(function(mutations) {
		searchBox=removeQueryComplete();
		//observe the new search box
		observer.observe(searchBox,{attributes: true});
	});
	let searchBox=getSearchBox();
	if(searchBox){
		observer.observe(searchBox.form,{childList: true});
		//replace the search box entirely on attribute change, as google also monitor's it's attribute changes, which will cause a deadlock
		observer.observe(searchBox,{attributes: true});
	}
}

main();
