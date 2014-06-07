// ==UserScript==
// @name          PgnWorldViewer
// @namespace     http://pgnviewer.andyhot.gr
// @description   Replaces silverlight with java chess viewer
// @include       http://www.chesscenter.com/twic/*
// @include       http://www.chessvibes.com/*
// ==/UserScript==

function loadPgn(file, root, node) {
file = file.replace(/^\s+|\s+$/g, '');
var base = location.href;
var pos = base.lastIndexOf('/');
if (pos>=0) {
	base = base.substring(0, pos+1);
}
if (!root) {
	root = base;
}
else if (root.indexOf('http')!=0) {
	root = base + root;
}
pos = root.indexOf('ClientBin/SilverBoard.xap');
if (pos>=0) {
	root = root.substring(0, pos); 
}
pos = root.lastIndexOf('/');
if (pos>=0) {
	root = root.substring(0, pos+1);
}
root = root.replace(/^\s+|\s+$/g, '');
var fileLocation = root + file;
var lic = fileLocation.indexOf('www.chessvibes.com')>=0 ? '7khj0k5' : '8j3de7g';

	/*GM_xmlhttpRequest({
	    method: 'GET',
	    url: fileLocation,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	    },
	    onload: function(resp) {		
			node.innerHTML = resp.responseText;
	    }
	});*/
	
	/*pos = fileLocation.indexOf(location.hostname);
	if (pos>=0) {
		fileLocation = fileLocation.substring(pos + location.hostname.length);
	}*/

	var a=document.createElement('applet');
	a.width=660;
	a.height=500;
	a.archive='http://pgnviewer.andyhot.gr/pgnViewer/pgnViewS.jar';
	a.code='andyhot.chess.pgnview.PgnView.class';
	var inner = [];
	inner.push('<param name="file2load" value="' + fileLocation + '">');
	inner.push('<param name="description" value="Games">');
	inner.push('<param name="lic" value="' + lic + '">');
	inner.push('<param name="squaresize" value="40">');
	inner.push('<param name="bgcolor" value="414141">');
	inner.push('<param name="txtcolor" value="ffffff">');
	inner.push('<param name="eventfg" value="ffffff">');
	inner.push('<param name="gui" value="cp://gui1.txt">');
	a.innerHTML = inner.join('');
	node.innerHTML = '';
	node.appendChild(a);
}

var fn = function() {
var i,j;
var objs = document.getElementsByTagName('object');
for (i=0; i<objs.length; i++) {
	var obj = objs[i];
	if (obj.type && obj.type.indexOf('application/x-silverlight')==0) {
		var file;
		var source;
		var params = obj.getElementsByTagName('param');
		for (j=0; j<params.length; j++) {
			var param = params[j];
			if (param.name=='initParams') {
				var inits = param.value.split(',');
				for (var one in inits) {
					var pos = inits[one].indexOf('pgnfile=');
					if (pos>=0) {
						file = inits[one].substring(pos + 'pgnfile='.length);
					}
				}				
			}
			if (param.name=='source') {
				source = param.value;
			}
		}
		if (file) {
			var altNode = document.createElement('div');
			altNode.innerHTML = 'Loading...';
			obj.parentNode.replaceChild(altNode, obj);	
			loadPgn(file, source, altNode);
		}
	}
}
};

fn();

//window.addEventListener('load', fn, true);
