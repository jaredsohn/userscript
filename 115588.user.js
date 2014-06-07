// ==UserScript==
// @name           NYLF
// @namespace      tag: nerdz, youtube, link, fixer
// @description    NERDZ Youtube Link Fixer
// @include        http://www.nerdz.eu/*
// ==/UserScript==

var interval;
var lazyness;
var executed = 0;

function parse_url (str, component) {
    // http://kevin.vanzonneveld.net
    // +      original by: Steven Levithan (http://blog.stevenlevithan.com)
    // + reimplemented by: Brett Zamir (http://brett-zamir.me)
    // + input by: Lorenzo Pisani
    // + input by: Tony
    // + improved by: Brett Zamir (http://brett-zamir.me)
    // %          note: Based on http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
    // %          note: blog post at http://blog.stevenlevithan.com/archives/parseuri
    // %          note: demo at http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
    // %          note: Does not replace invalid characters with '_' as in PHP, nor does it return false with
    // %          note: a seriously malformed URL.
    // %          note: Besides function name, is essentially the same as parseUri as well as our allowing
    // %          note: an extra slash after the scheme/protocol (to allow file:/// as in PHP)
    // *     example 1: parse_url('http://username:password@hostname/path?arg=value#anchor');
    // *     returns 1: {scheme: 'http', host: 'hostname', user: 'username', pass: 'password', path: '/path', query: 'arg=value', fragment: 'anchor'}
    var key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port', 
                        'relative', 'path', 'directory', 'file', 'query', 'fragment'],
        ini = (this.php_js && this.php_js.ini) || {},
        mode = (ini['phpjs.parse_url.mode'] && 
            ini['phpjs.parse_url.mode'].local_value) || 'php',
        parser = {
            php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)
        };

    var m = parser[mode].exec(str),
        uri = {},
        i = 14;
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
                ini['phpjs.parse_url.queryKey'].local_value) || 'queryKey';
        parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
        uri[name] = {};
        uri[key[12]].replace(parser, function ($0, $1, $2) {
            if ($1) {uri[name][$1] = $2;}
        });
    }
    delete uri.source;
    return uri;
}



function parse_str (str, array) {
    // http://kevin.vanzonneveld.net
    // +   original by: Cagri Ekin
    // +   improved by: Michael White (http://getsprink.com)
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // +   reimplemented by: stag019
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: stag019
    // -    depends on: urldecode
    // +   input by: Dreamer
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: When no argument is specified, will put variables in global scope.
    // *     example 1: var arr = {};
    // *     example 1: parse_str('first=foo&second=bar', arr);
    // *     results 1: arr == { first: 'foo', second: 'bar' }
    // *     example 2: var arr = {};
    // *     example 2: parse_str('str_a=Jack+and+Jill+didn%27t+see+the+well.', arr);
    // *     results 2: arr == { str_a: "Jack and Jill didn't see the well." }
    var glue1 = '=',
        glue2 = '&',
        array2 = String(str).replace(/^&?([\s\S]*?)&?$/, '$1').split(glue2),
        i, j, chr, tmp, key, value, bracket, keys, evalStr, that = this,
        fixStr = function (str) {
            return decodeURIComponent((str + '').replace(/\+/g, '%20')).replace(/([\\"'])/g, '\\$1').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
        };

    if (!array) {
        array = this.window;
    }

    for (i = 0; i < array2.length; i++) {
        tmp = array2[i].split(glue1);
        if (tmp.length < 2) {
            tmp = [tmp, ''];
        }
        key = fixStr(tmp[0]);
        value = fixStr(tmp[1]);
        while (key.charAt(0) === ' ') {
            key = key.substr(1);
        }
        if (key.indexOf('\0') !== -1) {
            key = key.substr(0, key.indexOf('\0'));
        }
        if (key && key.charAt(0) !== '[') {
            keys = [];
            bracket = 0;
            for (j = 0; j < key.length; j++) {
                if (key.charAt(j) === '[' && !bracket) {
                    bracket = j + 1;
                } else if (key.charAt(j) === ']') {
                    if (bracket) {
                        if (!keys.length) {
                            keys.push(key.substr(0, bracket - 1));
                        }
                        keys.push(key.substr(bracket, j - bracket));
                        bracket = 0;
                        if (key.charAt(j + 1) !== '[') {
                            break;
                        }
                    }
                }
            }
            if (!keys.length) {
                keys = [key];
            }
            for (j = 0; j < keys[0].length; j++) {
                chr = keys[0].charAt(j);
                if (chr === ' ' || chr === '.' || chr === '[') {
                    keys[0] = keys[0].substr(0, j) + '_' + keys[0].substr(j + 1);
                }
                if (chr === '[') {
                    break;
                }
            }
            evalStr = 'array';
            for (j = 0; j < keys.length; j++) {
                key = keys[j];
                if ((key !== '' && key !== ' ') || j === 0) {
                    key = "'" + key + "'";
                } else {
                    key = eval(evalStr + '.push([]);') - 1;
                }
                evalStr += '[' + key + ']';
                if (j !== keys.length - 1 && eval('typeof ' + evalStr) === 'undefined') {
                    eval(evalStr + ' = [];');
                }
            }
            evalStr += " = '" + value + "';\n";
            eval(evalStr);
        }
    }
}

function preg_quote (str, delimiter) {
    // http://kevin.vanzonneveld.net
    // +   original by: booeyOH
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: preg_quote("$40");
    // *     returns 1: '\$40'
    // *     example 2: preg_quote("*RRRING* Hello?");
    // *     returns 2: '\*RRRING\* Hello\?'
    // *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
    // *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'
    return (str + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
}


function onSubmit (event, onSub, isProject)
{
	event.preventDefault(); // trick to prevent form submit-ing
	var textareas = event.target.getElementsByTagName ("textarea");
	if (textareas.length > 1)
	{
		alert ("Something went terribly wrong (textareas count > 1)");
		return 0;
	}
	var textarea = textareas[0];
	var valueToFix = textarea.value;
	var regexp = /\[youtube\](.+?)\[\/youtube\]/gi;
	var links = valueToFix.match (regexp);
	if (links)
	{
		for (var i=0; i < links.length; i++)
		{
			var link = links[i];
			var res = /\[youtube\](.+?)\[\/youtube\]/i.exec (link);
			if (res && res[1].match (/^https?:\/\/.*?\.?youtube\.[^\/]+\/watch/i))
			{
				var url = parse_url (res[1]);
				var arr = {};
				parse_str (url.query, arr);
				if (arr.v)
				{
					// valid youtube link, let's rewrite
					var newLink = "http://www.youtube.com/watch?v=" + arr.v;
					// fix str
					valueToFix = valueToFix.replace (new RegExp (preg_quote (link)), "[youtube]" + newLink + "[/youtube]");
				}
			}
		}
		textarea.value = valueToFix;
	}
	if (!isProject)
	{
		// get anti-csrf token and userid from original onsubmit
		var tokenp = /&id=([^&]+)&tok=([^']+)/.exec (onSub);
		if (!tokenp || !tokenp[1] || !tokenp[2])
		{
			alert ("No CSRF token/ID var!?");
			return;
		}		
		var token  = tokenp[2];
		var id     = tokenp[1];
	
		unsafeWindow.query ("/pages/profile/board.ajax.action.php", "message=" + encodeURIComponent (textarea.value) + "&id=" + id + "&tok=" + token);
		textarea.value = "";
		setTimeout (function() { unsafeWindow.mainContent ("main.ajax.php?limit=10"); }, 800);
	}
	else
	{
		// get shit from original onsubmit
		var dataO = /&tok=([^&]+)&gid=(\d+)/.exec (onSub);
		if (!dataO || !dataO[1] || !dataO[2])
		{
			alert ("No data from onsubmit. Something wrong happened!");
			return;
		}
		var token = dataO[1];
		var gid   = dataO[2];
		unsafeWindow.query ("/pages/group/board.ajax.action.php", "message=" + encodeURIComponent (textarea.value) + "&tok=" + token + "&gid=" + gid);
		textarea.value = "";
		setTimeout (function() { unsafeWindow.query ("/pages/group/refresh.php?gid=" + gid, false, "board", "Loading..."); }, 390);
	}
}

function doBadThings (formcontainer)
{
	// kill timer
	clearInterval (interval);
	executed = 0;
	var forms = formcontainer.getElementsByTagName ("form");
	if (forms.length > 1)
	{
		alert ("Something went terribly wrong (formcount > 1)");
		return 0;
	}
	var form = forms[0];
	var saveTheChildren = form.getAttribute ("onsubmit");
	form.removeAttribute ("onsubmit");
	form.addEventListener ("submit", function (e) { onSubmit (e, saveTheChildren, 0); }, false);
}

function doBadThingsForProjects (formElements)
{
	// kill timer
	clearInterval (interval);
	executed = 0;
	var form = formElements[0];
	var saveTheChildren = form.getAttribute ("onsubmit");
	form.removeAttribute ("onsubmit");
	form.addEventListener ("submit", function (e) { onSubmit (e, saveTheChildren, 1); }, false);
}


// matches: profile || post || homepage
// also matches the projects
if (document.location.href.match (/\.$/) || document.location.href.match (/\.\d+(\#c\d+)?$/) || document.location.href.indexOf ("home.php") !== -1)
{
	interval = setInterval (function() {
		if (executed) { /* wait for the timer to be killed */ return; }
		lazyness = document.getElementById ("stdform");
		if (lazyness)
		{
			executed = 1;
			doBadThings (lazyness);	
		}
	}, 1000);
}
else if (document.location.href.match (/:\d+(\#c\d+)?$/) || document.location.href.match (/:$/))
{
	interval = setInterval (function() {
		if (executed) { return; }
		if (document.getElementById ("content"))
		{
			lazyness = document.getElementById ("content").getElementsByTagName ("form");
			if (lazyness.length >= 1 && lazyness[0].getAttribute ("onsubmit").indexOf ("board.ajax.action.php") !== -1)
			{
				executed = 1;
				doBadThingsForProjects (lazyness);
			}
		}
	}, 1000);
}