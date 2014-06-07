// ==UserScript==
// @name           pbrlib
// @description    You don't need this
// @namespace      pbr
// @version        08.08.21
// ==/UserScript==

/* 
 * 
 * pabst did this 08/08/02+
 *
 * 
 */

function arraySum(arr,start) {
	var total = 0;
	for (var i=start; i<arr.length; i++) {
		total += arr[i];
	}
	return total;
}

function fixEscapedText(str) {
	var s = str;
	while (s.indexOf('"') != -1) {
		s = s.replace('"',"&quot;");
	}
	while (s.indexOf("'") != -1) {
		s = s.replace("'","&#39;");
	}
	return s;
}

function trim(str) {
	var s = str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	return s.replace(/\n/," ");
}

function setCookie(c_name, value) {
	var expDate = new Date();
	expDate.setDate(expDate.getDate() + 1000*60*60*24*7);
	document.cookie = c_name + "=" + value + ";expires=" + expDate;
	console.log("writing cookie :"+c_name+" ==> "+value);
}

function getCookie(c_name) {
	var start = document.cookie.indexOf(c_name+"=");
	if (start != -1) {
		var c = document.cookie.slice(start,document.cookie.length);
		var end = c.indexOf(";");
		if (end != -1) {
			var data = c.slice(c_name.length+1,end);
			return data;
		}
		else {
			var data = c.slice(c_name.length+1);
			return data;
		}
	}
	else {
		console.log("cookie not set");
	}
	return null;
}

function rangeCheck(arr, i) {
	if (i < 0) return false;
	if (i >= arr.length) return false;
	return true;
}

function findChild(id,node) {
	if (node.id+"" == id+"") {
		return node;
	}
	//for each (var c in node.childNodes) {
	for (var i=0; i<node.childNodes.length; i++) {
		var c = node.childNodes[i];
		var r = findChild(id,c);
		if (r != null) {
			return r;
		}
	}    
	return null;
}

function getInetPage(address, func, target) {
	var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onreadystatechange = function() {
		if (target != null) {
			var d = ["..","...","."];
			var str = target.innerHTML.split(" ");
			target.innerHTML = str[0]+" "+d[str[1].length-1];
    	}
	};
	req.onload = function() {
		if (this.status != 200) {
			alert("pbr gm script: Error "+this.status+" loading "+address);
		}
		else {
			console.log("loaded: "+address)
			func(address,this);
		}
	};
	
	req.send(null); 
	return req;
}

function getInetPage2(address, func, target) {
	console.log("getInetPage -- '"+address+"'  -- "+(func+"").slice(0,(func+"").indexOf("{")));
	return GM_xmlhttpRequest({
		method: 'GET',
		url: address,
		headers: {
		    'User-agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9) Gecko/2008052912 Firefox/3.0 Greasemonkey',
		    'Accept': 'text/xml'
	    },
	    onreadystatechange: function(page) {
	    	if (page.readyState == 4) {
    			console.log("page.status="+page.status+" -- "+page.statusText);
				if (page.status != 200) {
					alert("pbr gm script: Error "+page.status+" loading "+address);
				}
				else {
					console.log("loaded: "+address)
					func(address,page);
				}
	    	}
	    	else {
	    		if (page.status != 0) {
	    			console.log("page.status="+page.status+" -- "+page.statusText);
	    		}
	    		if (target != null) {
		    		var d = ["..","...","."];
		    		var str = target.innerHTML.split(" ");
		    		target.innerHTML = str[0]+" "+d[str[1].length-1];
	    		}
	    	}
		}
	});
}
