// ==UserScript==



// @name           Bitletr+TorrentChecker



// @namespace      iisonly (iisonly@gmail.com)



// @description    Adds links after every *.torrent link : donwload with bitlet.org & Check torrent status with torrent-check.t00lz.de



// @include        *



// ==/UserScript==











function insertAfter(node, referenceNode) {



  referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);



}







var linkscount = document.getElementsByTagName('a').length;



var url = "";



var node = "";







for(var i = 0; i < linkscount; i++){



	node = document.getElementsByTagName('a')[i];



	url = node.href;



	var start = url.length-8;



	if(url.substr(0,28) == "http://www.mininova.org/tor/" && location.href.substr(0,24) != "http://www.mininova.org/"){



		url = url.substr(0,24) + "get/" + url.substr(28, url.length);



	}







	if(url.substr(start,8) == ".torrent" || url.substr(0,45) == "http://dl.torrentreactor.net/download.php?id=" || url.substr(0,28) == "http://www.mininova.org/get/" && url.length>28){



		var new_node = document.createElement("span");



		var href = 'javascript:window.open(\'http://www.bitlet.org/download?torrent=' + encodeURIComponent(url) + '&referer=' + encodeURIComponent(location.href) +'\',\'\', \'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=400,height=140\');void(0);'



		var href2 = 'javascript:window.open(\'http://torrent-check.t00lz.de/url/' + (url.substr(7,url.length-7)) + '\',\'\', \'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=900,height=600\');void(0);'



		new_node.innerHTML = ' <a href="'+href+'" style="color:red; font-size:70%;"><img src="data:image/gif;base64,R0lGODlhDgAOANUwAOHkD/7+/tDeGHK/RH7DPrvXIfv6+/b29t3e3vz8/Pb29fLz86TPLPHx8P39/ejp6enq6/z7++7v7+/w8Pj496TQK+Lj4pDJNvv7++zs7Pf395DINebm5fn5+f39/u3t7dna2ubn5+Pk5O7oCevr69/g3/P09OLkD/Ly8f7//u7oCtDeF8HBwTY2Nnx8fP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADAALAAAAAAOAA4AAAZuQJdwOIQZja6Xcpl0HWFJEMISIiVfTuSrJHp8GsRjkgORLA6slrqlzUxMFIynNRiwoS+UopMIvFoEBHdJGgYOSy0bF4MvEX6IDBWMKYhqBQVrV4gCKyucKy1JLKOjLQAnAABsREQtKiN3T7JqR0EAOw==" alt="bitlet it!" border=0></a>&nbsp;<a href="'+href2+'" style="color:red; font-size:70%;"><img src="data:image/gif;base64,R0lGODlhDgAOANU6AABpJV5eXv7+/tXw/Pr9/srs/Dw8POn3/er3/u3t7fb29vz8/Onq6/j49+zs7PHx8PLy8fn5+d/g3+jp6ff399na2ubn5/b29e7v7/v7+6vh+vL6/vL7/rDi+rDj+sDp+/7//ubm5d/0/PLz87fl+uPk5NXw/cHp/AAAAOD0/d3e3v39/evr6+Lj4vP09Lfm+vv6++/w8Pz7+8HBwe7oCRISEktLSyEhIXx8fP///////wAAAAAAAAAAAAAAAAAAACH5BAEAADoALAAAAAAOAA4AAAZ8QJxwONQZjbiccpnEHXXJiqplYSVzTmROUpokHsKbWBtiYEaK2U3jed2gOUfM1cjcOqRPwXRLQi4RCwI3JwUDIgh9ORQwK0o3AykHHASKMgJLNjcbBDlvSSCZNChib3CiADUBBkdJMzM2NKkBM1lQQrGpBkVPOjY1Nb1HQQA7" alt="check it!" border=0></a> ';		





		insertAfter(new_node, node);		



		linkscount+=2;



	}



}










