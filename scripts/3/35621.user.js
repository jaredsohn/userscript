// ==UserScript==
// @name           Smashing new window
// @namespace      benow.ca
// @description    Opens video from smashingtelly.com in a small new window.
// @include        http://smashingtelly.com/*
// ==/UserScript==


var NODE_TYPE_ELEMENT=1;
var NODE_TYPE_ATTRIBUTE=2;
var NODE_TYPE_TEXT=3;
var NODE_TYPE_COMMENT=8;

function elemToString(elem) {
	var xml= _toString(elem,0);
	return xml;
}

function _toString(node,indent) {
	if (!node) return null;
	
	if (node.nodeType==NODE_TYPE_ELEMENT) {
		var xml=_mkIndent(indent)+"<"+node.nodeName;
		for (var i=0;i<node.attributes.length;i++) {
			var attr=node.attributes[i];
			var value=attr.nodeValue;
			xml+=" "+attr.nodeName+'="'+value+'"';
		}
		if (node.childNodes.length==0)
			xml+="/>";
		else {
			xml+=">";
			var children=node.childNodes;
			var hadText=false;
			var onlyText=true;
			for (var i=0;i<children.length;i++) { 
				var child=children[i];
				if (child.nodeType==NODE_TYPE_TEXT) {
					var value=trim(child.data);
					xml+=value;
					hadText=true;
				} else {
					xml+="\n"+_toString(child,indent+2);
					onlyText=false;
				}
			}
			if (!onlyText)
			 xml+="\n"+_mkIndent(indent);
			xml+="</"+node.nodeName+">";
		}
		
		return xml;
	}
	return null;
}

function makeMask(len) {
	var result='';
	for (var i=0;i<len;i++) {
		result+='*';
	}
	return result;
}


function _mkIndent(num) {
	var result='';
	for (var i=0;i<num;i++) {
		result+=' ';
	}
	return result;
}



if (document.getElementsByTagName("html")[0].getAttribute('is-popup')!='true') {
	var embed=document.getElementById('VideoPlayback');
	if (embed) {
		var xml=elemToString(embed);
		
		var width=embed.style.width;
		if (width.indexOf('px')!=-1) 
		  width=parseInt(width.substring(0,width.length-1));
		  
		var height=embed.style.height;
		if (height.indexOf('px')!=-1) 
		  height=parseInt(height.substring(0,height.length-1));
		
		var size='width='+(width+30)+',height='+(height+25);
//		alert('size: '+size);
		top.consoleRef=window.open('','myconsole',
  	 size
		 +',menubar=0'
		 +',toolbar=0'
		 +',status=0'
		 +',scrollbars=1'
		 +',resizable=1')
		top.consoleRef.document.writeln(
		'<html is-popup="true"><head><title>Video</title></head>'
		 +'<body bgcolor=white onLoad="self.focus()">'
		 +xml
		 +'</body></html>'
		)
		top.consoleRef.document.close();
	} 
//	else alert('video not found');
}


