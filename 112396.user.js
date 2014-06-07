// ==UserScript==
// @name           FileApe AutoDownloader
// @namespace      fileapeautodownloader
// @description    Automatic download launch on fileape.com
// @include        http://fileape.com/index.php?act=download*
// @include        http://fileape.com/?act=download*
// ==/UserScript==

var args = getArgs();


if(args['id'] != null && args['g'] == null)
{
	window.location = location.href+"&g=1";
}
else if(args['g'] == '1') {
	unsafeWindow.wait = 10;
}
else if(args['t'] != null) {
	var links = document.getElementsByTagName('a');
	var found = false;
	for(var i=0 ; i<links.length ; i++) {
		if(links[i].href.length > 50)
		{
			window.location = links[i].href;
			found = true;
			break;
		}
	}
	
	if(!found) {
		alert('Unable to find a link. Sorry');
	}

}


function getArgs() {
	var args = new Object();
	var query = location.search.substring(1);
	var pairs = query.split("&");
	for(var i = 0; i < pairs.length; i++) {
	var pos = pairs[i].indexOf('=');
	if (pos == -1) continue;
	var argname = pairs[i].substring(0,pos);
	var value = pairs[i].substring(pos+1);
		args[argname] = unescape(value);
	}
	return args;
}