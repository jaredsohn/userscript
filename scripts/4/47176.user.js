// ==UserScript==
// @name           Facebook App Debug
// @namespace      facebook_app_debug
// @description    Renders HTML server tracebacks into an iframe when facebook applications go wrong
// @include        http://apps.facebook.com/*
// @version        1.0
// @copyright      Matt Bennett
// ==/UserScript==

var build = function() {

	console.log('FAD :: building')

	//create and insert iframe
	var iframe = document.createElement('iframe')
	iframe.id = "debugframe"
	iframe.style.position = "absolute"
	iframe.style.zIndex = "10"
	iframe.style.width = "90%"
	iframe.style.top = "50px"
	iframe.style.left = "5%"
	iframe.style.marginBottom = "50px"
	iframe.style.overflow = "hidden"
	iframe.style.border = "0px none"
	iframe.style.display = "none"

	document.body.insertBefore(iframe, document.body.firstChild);

	//create and insert close button
	close = document.createElement('div')
	close.id = "closebutton"
	close.innerHTML = '<span style="font-weight: bold; font-size: 2em; padding: 5px; cursor: pointer">[ Close ]</span>'
	close.style.display = "none"
	close.style.position = "absolute"
	close.style.zIndex = "11"
	close.style.top = "55px"
	close.style.right = "5%"
	document.body.insertBefore(close, document.body.firstChild);
	
	//click listener for close button
	close.addEventListener('click',function() {
		iframe.style.display = "none"
		close.style.display = "none"
	},false)
	
	//save reference to debugframe for GM
	this.debugframe = iframe
	
	//save references for FBJS
	console.element.debugframe = iframe
	console.element.closebutton = close
}

//extract the traceback from the comment
var parse = function() {

	console.log('FAD :: parsing comments')
	
	var comments = document.evaluate("//comment()",document,null,6,null);
	var matches = comments.snapshotLength && comments.snapshotItem(0).data.match(/<html.*>[\s\S]*<\/html>/)
	return matches && matches[0] || false
}

//insert the extracted content into the iframe; set iframe height
var insert = function() {
	
	console.log('FAD :: inserting')
	//console.log('inserting on ', window.frameElement && window.frameElement.id || "host" )
	
	var data = parse()
	
	if (data) {
	
		//unmunge css rules
		var regex = /<style.*>([\s\S]*)<\/style>/
		var data = data.replace(regex,function(styleblock,rules) {
		
			return styleblock.replace(/{.*}/g, function(rulebody) {
				return rulebody.replace(/_/g,'-')
			})
		});
		
		var iframe = this.debugframe || window.parent.document.getElementById('debugframe')
		//console.log('writing error to ',iframe,' from ',window.frameElement && window.frameElement.id || "host")
		
		//insert document source
		var idoc = iframe.contentDocument		
		idoc.open("text/html")
		idoc.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">' + data)
		idoc.close()
		
		//fix table font-size due to iframe rendering in quirksmode
		idoc.styleSheets[0].insertRule('table { font-size: 1em; }',0)
		
		//set height & display
		iframe.style.display = "block"
		iframe.style.height = idoc.body.offsetHeight + "px"
		
		//show close button 
		if(!this.debugframe) {
			window.parent.document.getElementById('closebutton').style.display = "block"
		}
	}
}

//build frame if first load
if(window == window.top) {
	build()
}

//try to get data and insert
setTimeout(insert,0);