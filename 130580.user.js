// ==UserScript==
// @name           Smart jump
// @namespace      dzl
// @include        *
// ==/UserScript==

function parse_url(str, component){
	var key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'fragment'], ini = (this.php_js && this.php_js.ini) || {}, mode = (ini['phpjs.parse_url.mode'] &&
	ini['phpjs.parse_url.mode'].local_value) ||
	'php', parser = {
		php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)
	};
	
	var m = parser[mode].exec(str), uri = {}, i = 14;
	while (i--) {
		if (m[i]) {
			uri[key[i]] = m[i];
		}
	}
	
	if (component) {
		return uri[component.replace('PHP_URL_', '').toLowerCase()];
	}
	if (mode !== 'php') {
		var name = (ini['phpjs.parse_url.queryKey'] &&
		ini['phpjs.parse_url.queryKey'].local_value) ||
		'queryKey';
		parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
		uri[name] = {};
		uri[key[12]].replace(parser, function($0, $1, $2){
			if ($1) {
				uri[name][$1] = $2;
			}
		});
	}
	delete uri.source;
	return uri;
}

window.addEventListener("keydown", function(event){
	if (event.altKey === true && event.keyCode === 83) {
		var strSelection = window.getSelection();
		if (strSelection != "") {
			var arrUrl = parse_url(strSelection);
			if (arrUrl["scheme"]) {
				window.open(strSelection);
			}
			else {
				window.open("https://www.google.com.hk/#q=" + strSelection);
			}
		}
	}
}, false);
