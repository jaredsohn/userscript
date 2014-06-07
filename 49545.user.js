// ==UserScript==
// @name WordPress dofollow tag scanner
// @description	Searching for comments with dofollow links on Wordpress blogs.
// @include http://*
// @include https://*
// @version 1.0
// ==/UserScript==

 (function(){
	var SITE_URL='"'+location.host+'"';

	if(!_IsWordPress())	return false;	
	
	var  comments= $x('/html/body//div[contains(@id, "comment")]//p//a[not(contains(@href, ' + SITE_URL + ')) and contains(@href, "http") and not(@rel) or contains(@rel, "dofollow")]');
	if(!comments.length) var  comments= $x('/html/body//li[contains(@id, "comment")]//p//a[not(contains(@href, ' + SITE_URL + ')) and contains(@href, "http") and not(@rel) or contains(@rel, "dofollow")]');
	
	if(!comments.length) return;	// нет ссылок

	_ShowNotice('This blog looks like dofollow');

	
// functions:
	function $x(p, context,type) {
		if (!context) context = document;
		var type = type || XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
		var i, arr = [], xpr = document.evaluate(p, context, null, type, null);
		for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
		return arr;
		}
	function _IsWordPress(){
		var meta=$x('/html/head//meta[@content and  @name="generator"]');
	
		if(meta.length){
			if(String.toUpperCase(meta[0].getAttribute('content')).indexOf('WORDPRESS')==-1){ 
				return false;
				}
			}
		else return false;
		return true;
		}
	function _ShowNotice(text){
		var text=text || 'Не указан текст';
		var div=document.createElement('div');
		div.style.font='800 12px/12px Helvetica, Verdana';
		div.style.visibility='hidden';
		div.style.width=text.length-3+'em';
		div.style.height='12px';
		div.style.zIndex=50;
		div.style.border='6px solid #ff6';
		div.style.backgroundColor='#f33';
		div.style.textAlign='center';
		div.style.paddingBottom='2px';
		
		div.innerHTML=text;
		
		document.body.appendChild(div);
		div.style.position='fixed';
			div.style.top=0;	//Math.round(windowHeight()/2-parseInt(div.offsetHeight)/2)+'px';
			div.style.left=0;	//Math.round((windowWidth()-parseInt(div.offsetWidth))/2)+'px';
		div.style.visibility='visible';
		fade_out(div);
		}
		
	function windowHeight() {
		 // A shortcut, in case we're using Internet Explorer 6 in Strict Mode
		 var de = document.documentElement;
		 // If the innerHeight of the browser is available, use that
		 return self.innerHeight ||
		 // Otherwise, try to get the height off of the root node
		 ( de && de.clientHeight ) ||
		 // Finally, try to get the height off of the body element
		 document.body.clientHeight;
		}
	function windowWidth() {
		// A shortcut, in case we're using Internet Explorer 6 in Strict Mode
		var de = document.documentElement;
		// If the innerWidth of the browser is available, use that
		return self.innerWidth ||
		// Otherwise, try to get the width off of the root node
		( de && de.clientWidth ) ||
		// Finally, try to get the width off of the body element
		document.body.clientWidth;
		}
	function fade_out( elem ) {
		// Start the opacity at 0
		setOpacity( elem, 100 );
		// Show the element (but you can see it, since the opacity is 0)
		//U.show( elem );
		// We're going to do a 20 'frame' animation that takes
		// place over one second
		for ( var i = 100; i >= 0; i -= 2 ) {
		// A closure to make sure that we have the right 'i'
		 (function(){
			 var pos = i;
			 // Set the timeout to occur at the specified time in the future
			 setTimeout(function(){
				 // Set the new opacity of the element
				 setOpacity( elem, pos );
				 }, ( 100 - pos ) * 50 );
			})();
		 }
		}
		
	function setOpacity( elem, level ) {
		elem.style.opacity = level / 100;
		}
})();