// ==UserScript==
// @name			houseol 愛屋線上
// @namespace		houseol
// @description		houseol 愛屋線上 for firefox by bluelovers
// @include			http://*.houseol.com.tw/include/*.asp*
// @include			http://*.houseol.com.tw/*.asp*
// ==/UserScript==

var _jsinit = 0;

function funcionPrincipal () {
	if (_jsinit) return;
	_jsinit = 1;

	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
	var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
	var XPIter = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;

	var XPList2 = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;

	var localStr = new Array();

	var script_stop = 0;
	var selfurl = document.location.href ? document.location.href : window.location.href;
	var selfurl_arg = '';
	var selfurl_array = new Array();

	var $BASESCRIPT, $BASEFILENAME;

	getGeneralData();

	function getGeneralData() {
		selfurl_arg = parse_url(selfurl);
		parse_str(selfurl_arg.query, selfurl_array);

		$BASESCRIPT = basename(selfurl_arg.path);
		$BASEFILENAME = explode('.', $BASESCRIPT)[0];
	}

	if ($BASEFILENAME == 'index') {
		switch(selfurl_array['module']) {
			case 'SellHouse':
			case 'RentHouse':
				if (in_array(selfurl_array['file'], ['search', 'Search'])) {

					_setAttribute($('storeid1'), 'onclick', '');

					_attachEvent($('storeid1'), 'click', function() {
						var StoreID = unsafeWindow.StoreID = $names('StoreID')[0];

						window.open(StoreID.value == '' ? 'include/pickEmp.asp?job=House&returnMode=3&f=main&elem=Manager&elem2=StoreID' : 'include/pickEmp.asp?job=Staff&returnMode=3&f=main&elem=Manager&houseid='+StoreID.value,'','top=185px,left=140px,Width=500px,Height=520px,scrollbars=yes,resizable=no');
					});

					var labels1 = find('//span[@onclick="Manager.value=\'\'"]');

					_setAttribute(labels1, 'onclick', '');

					_attachEvent(labels1, 'click', function() {
						$names('Manager')[0].value = '';
					});



				} else if (in_array(selfurl_array['file'], ['Object'])) {

					var labels1 = find('//table[@id="Ob"]', XPList2);
					for (var i = 0; i < labels1.length; i++) {
						labels1.item(i).style.display = '';
					}

					var listfrom = unsafeWindow.listfrom = unsafeWindow.window.listfrom = unsafeWindow.window.frames[0];

//					var labels1 = find('//a[@onclick="javascript:listfrom.jobs(\'Books\')"]');
//
//					_setAttribute(labels1, 'onclick', '');
//
//					_attachEvent(labels1, 'click', function(e) {
//						var job = 'Books';
//						listfrom.jobs(job);
//					});
				}
				break;
			default:

				var js_showhide = unsafeWindow.showhide

				if (js_showhide) {
						unsafeWindow.showhide = function (tempid, readed) {
						js_showhide(tempid, readed);

						var ele = $(tempid) ? $(tempid) : document.all[tempid];
						if (ele.style.display == 'block') ele.style.display = '';
					}
				}

				var cssStyle = "";

				cssStyle += "a:visited { color: #c0c0c0; }";

				GM_addStyle(cssStyle);

				break;
		}
	} else if ($BASEFILENAME == 'auto') {

		if (in_array(selfurl_array['m'], ['Circle', 'DealCus']) && in_array(selfurl_array['f'], ['lifeCircle_Search_list', 'Search_list'])) {
			var labels1 = find('//tr[@ondblclick]/td/input[@type="checkbox"]', XPList2);
			for (var i = 0; i < labels1.length; i++) {
				_setAttribute(labels1.item(i), 'type', 'radio');
			}
		}

		if (in_array(selfurl_array['f'], ['bookprint2'])) {
			var labels1 = find('//body/table/tbody/tr[3]/td/table/tbody/tr/td[2]/table/tbody/tr[2]/td');
			var labels2 = find('//body/table/tbody/tr[5]/td/span[2]');

			document.title = trim(labels1.textContent)+'-'+trim(labels2.textContent);

			var cssStyle = "";

			cssStyle += "body {color: #666666} .borderss, .borderss2 { color: blue; padding: 0px; } .borderss { padding: 1px; padding-left: 3px; padding-right: 3px; }";

			GM_addStyle(cssStyle);

			labels1.className = 'borderss2';
			var labels2 = find('//body/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr[2]/td');
			labels2.className = 'borderss2';
			var labels2 = find('//body/table/tbody/tr[3]/td/table/tbody/tr/td[3]/table/tbody/tr[2]/td');
			labels2.className = 'borderss2';
		}

		if (in_array(selfurl_array['f'], ['Search_list', 'community_Search_list', 'lifeCircle_Search_list'])) {
			var labels1 = find('//tr[@ondblclick]', XPList2);
			var labels2 = find('//label[@for]', XPList2);

			var labels13 = document.evaluate('//td[2]', labels1.item(0), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
			var labels14 = document.evaluate('//td[3]', labels1.item(0), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

			for (var i = 0; i < labels1.length; i++) {

				var who = labels1.item(i);

				_setAttribute(who, 'labelfor', labels2.item(i).getAttribute('for'));

				_attachEvent(who, 'click', function(e) {
					var who = e.target;
					if (who.tagName == 'TD') who = who.parentNode;

					$(who.getAttribute('labelfor')).checked = true;
				});


//				var labels13 = find('//td[1]', XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, who);

//				labels13.snapshotItem(0).innerHTML = '123';

				var a = labels13.snapshotItem(2+i).innerHTML.split('<br>');

				labels14.snapshotItem(1+i).innerHTML += '<br><a href="http://m010.houseol.com.tw/auto.asp?m=SellHouse&f=bookprint2&type=0&listbox=' + a[0] + '%20%20%20%23001" target="_blank">列印總表</a>';

			}
		}
	} else if (in_array($BASEFILENAME, ['pickEmp']) && in_array(selfurl_array['job'], ['House', 'Staff'])) {
		var labels1 = find('//tr[@ondblclick]', XPList2);
		var labels2 = find('//label[@for]', XPList2);

		for (var i = 0; i < labels1.length; i++) {
			_setAttribute(labels1.item(i), 'labelfor', labels2.item(i).getAttribute('for'));

			_attachEvent(labels1.item(i), 'click', function(e) {
				var who = e.target;
				if (who.tagName == 'TD') who = who.parentNode;

				$(who.getAttribute('labelfor')).checked = true;
			});
		}
	} else if ($BASEFILENAME == 'select' && selfurl_array['elem'] == 'Address') {
		var labels1 = find('//input[@name="address"]');
		if (labels1.value) document.title = labels1.value;

	} else if (in_array($BASEFILENAME, ['select']) && in_array(selfurl_array['job'], ['OU', 'OT'])) {
		var labels1 = find('//tr[@ondblclick]', XPList2);
		var labels2 = find('//label[@for]', XPList2);

		for (var i = 0; i < labels1.length; i++) {
			_setAttribute(labels1.item(i), 'labelfor', labels2.item(i).getAttribute('for'));

			_attachEvent(labels1.item(i), 'click', function(e) {
				var who = e.target;
				if (who.tagName == 'TD') who = who.parentNode;

				$(who.getAttribute('labelfor')).checked = true;
			});
		}
	}

	function trim(str) {
		return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '');
	}

	function explode( delimiter, string, limit ) {
	    // http://kevin.vanzonneveld.net
	    // +     original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // +     improved by: kenneth
	    // +     improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // +     improved by: d3x
	    // +     bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // *     example 1: explode(' ', 'Kevin van Zonneveld');
	    // *     returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}
	    // *     example 2: explode('=', 'a=bc=d', 2);
	    // *     returns 2: ['a', 'bc=d']

	    var emptyArray = { 0: '' };

	    // third argument is not required
	    if ( arguments.length < 2 ||
	        typeof arguments[0] == 'undefined' ||
	        typeof arguments[1] == 'undefined' )
	    {
	        return null;
	    }

	    if ( delimiter === '' ||
	        delimiter === false ||
	        delimiter === null )
	    {
	        return false;
	    }

	    if ( typeof delimiter == 'function' ||
	        typeof delimiter == 'object' ||
	        typeof string == 'function' ||
	        typeof string == 'object' )
	    {
	        return emptyArray;
	    }

	    if ( delimiter === true ) {
	        delimiter = '1';
	    }

	    if (!limit) {
	        return string.toString().split(delimiter.toString());
	    } else {
	        // support for limit argument
	        var splitted = string.toString().split(delimiter.toString());
	        var partA = splitted.splice(0, limit - 1);
	        var partB = splitted.join(delimiter.toString());
	        partA.push(partB);
	        return partA;
	    }
	}

	function basename(path, suffix) {
	    // http://kevin.vanzonneveld.net
	    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // +   improved by: Ash Searle (http://hexmen.com/blog/)
	    // +   improved by: Lincoln Ramsay
	    // +   improved by: djmix
	    // *     example 1: basename('/www/site/home.htm', '.htm');
	    // *     returns 1: 'home'

	    var b = path.replace(/^.*[\/\\]/g, '');

	    if (typeof(suffix) == 'string' && b.substr(b.length-suffix.length) == suffix) {
	        b = b.substr(0, b.length-suffix.length);
	    }

	    return b;
	}

	function _setAttribute(elem, key, value) {
		elem[key] = value;
		elem.setAttribute(key, value);
	}

	function parse_str(str, array){
		// Parses GET/POST/COOKIE data and sets global variables
		//
		// version: 903.421
		// discuss at: http://phpjs.org/functions/parse_str
		// +   original by: Cagri Ekin
		// +   improved by: Michael White (http://getsprink.com)
		// +	tweaked by: Jack
		// +   bugfixed by: Onno Marsman
		// %		note 1: Currently does not put variables in local scope.
		// %		note 1: So use of second argument is required.
		// *	 example 1: $P.var arr = {};
		// *	 example 1: $P.parse_str('first=foo&second=bar', arr);
		// *	 results 1: arr == { first: 'foo', second: 'bar' }
		// *	 example 2: $P.var arr = {};
		// *	 example 2: $P.parse_str('str_a=Jack+and+Jill+didn%27t+see+the+well.', arr);
		// *	 results 2: arr == { str_a: "Jack and Jill didn't see the well." }
		var glue1 = '=';
		var glue2 = '&';

		var array2 = (str+'').split(glue2);
		var array2l = 0, tmp = '', x = 0;

		array2l = array2.length;
		for (x = 0; x<array2l; x++) {
			tmp = array2[x].split(glue1);
			array[unescape(tmp[0])] = unescape(tmp[1]).replace(/[+]/g, ' ');
		}
	}

	function parse_url (str, component) {
		// http://kevin.vanzonneveld.net
		// +	  original by: Steven Levithan (http://blog.stevenlevithan.com)
		// + reimplemented by: Brett Zamir (http://brettz9.blogspot.com)
		// %		  note: Based on http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
		// %		  note: blog post at http://blog.stevenlevithan.com/archives/parseuri
		// %		  note: demo at http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
		// %		  note: Does not replace invaild characters with '_' as in PHP, nor does it return false with
		// %		  note: a seriously malformed URL.
		// %		  note: Besides function name, is the same as parseUri besides the commented out portion
		// %		  note: and the additional section following, as well as our allowing an extra slash after
		// %		  note: the scheme/protocol (to allow file:/// as in PHP)
		// *	 example 1: parse_url('http://username:password@hostname/path?arg=value#anchor');
		// *	 returns 1: {scheme: 'http', host: 'hostname', user: 'username', pass: 'password', path: '/path', query: 'arg=value', fragment: 'anchor'}

		var  o   = {
			strictMode: false,
			key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
			q:   {
				name:   "queryKey",
				parser: /(?:^|&)([^&=]*)=?([^&]*)/g
			},
			parser: {
				strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
				loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-protocol to catch file:/// (should restrict this)
			}
		};

		var m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;
		while (i--) uri[o.key[i]] = m[i] || "";
		// Uncomment the following to use the original more detailed (non-PHP) script
		/*
			uri[o.q.name] = {};
			uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
			if ($1) uri[o.q.name][$1] = $2;
			});
			return uri;
		*/

		switch (component) {
			case 'PHP_URL_SCHEME':
				return uri.protocol;
			case 'PHP_URL_HOST':
				return uri.host;
			case 'PHP_URL_PORT':
				return uri.port;
			case 'PHP_URL_USER':
				return uri.user;
			case 'PHP_URL_PASS':
				return uri.password;
			case 'PHP_URL_PATH':
				return uri.path;
			case 'PHP_URL_QUERY':
				return uri.query;
			case 'PHP_URL_FRAGMENT':
				return uri.anchor;
			default:
				var retArr = {};
				if (uri.protocol !== '') retArr.scheme=uri.protocol;
				if (uri.host !== '') retArr.host=uri.host;
				if (uri.port !== '') retArr.port=uri.port;
				if (uri.user !== '') retArr.user=uri.user;
				if (uri.password !== '') retArr.pass=uri.password;
				if (uri.path !== '') retArr.path=uri.path;
				if (uri.query !== '') retArr.query=uri.query;
				if (uri.anchor !== '') retArr.fragment=uri.anchor;
				return retArr;
		}
	}

	function fixcookiesname(name) {
		var cookiepre = document.domain ? document.domain: window.location.hostname;
		return cookiepre + '_' + spieler + '_' + name;
	}
	function getcookies(name, defaultVal) {
		name = fixcookiesname(name);
		if (typeof GM_getValue == 'undefined') {
			var ca = document.cookie.split(';');
			var nameEQ = name + "=";
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length); // Elimina espacios
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return defaultVal;
		} else return decodeURI(GM_getValue(name, defaultVal));
	}
	function setcookie(name, value, days) {
		name = fixcookiesname(name);
		if (typeof GM_setValue == "undefined") {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = "; expires=" + date.toGMTString();
			} else {
				var expires = "";
			}
			document.cookie = name + "=" + value + expires + "; path=/";
		} else GM_setValue(name, encodeURI(value));
	}
	function setOption(key, value) {
		var options = getcookies("options");
		if (options != '') options = options.split(",");
		else options = [];
		var myOption = options.indexOf(key);
		if (myOption < 0) {
			options.push(key);
			options.push(encodeURIComponent(value));
		} else {
			options[myOption + 1] = encodeURIComponent(value);
		}
		options.join(",");
		setcookie("options", options);
	}
	function getOption(key, defaultValue, type) {
		var options = getcookies('options');
		options = options.split(",");
		var myOption = options.indexOf(key);
		if (myOption < 0) {
			return defaultValue;
		}
		switch (type) {
		case "boolean":
			var myOption = (options[myOption + 1] == "true" || options[myOption + 1] == "1") ? true: false;
			break;
		case "integer":
			var myOption = parseInt(options[myOption + 1]);
			break;
		case "string":
		default:
			var myOption = decodeURIComponent(options[myOption + 1]);
			break;
		}
		return myOption;
	}
	function eatcookie(name) {
		setcookie(name, '', -1);
	}
	function t(key) {
		return T(key);
	}
	function T(key) {
		return localStr[key] ? localStr[key] : '!' + key + '!';
	}

	function arrayToInt(a){
		var h = 0;
		for(var i in a){ h += parseInt(a[i]); }
		return h;
	}

	function in_array(needle, haystack) {
		if(typeof needle == 'string' || typeof needle == 'number') {
			for(var i in haystack) {
				if(haystack[i] == needle) {
						return true;
				}
			}
		}
		return false;
	}

	function kleinster(a, b) {
		if (a < b) {
			return a;
		} else {
			return b;
		};
	}

	function seite_parameter() {
		var idx = selfurl.indexOf(fragezeichen);
		if (idx == -1) {
			return ''
		} else {
			return selfurl.substr(idx + 1);
		}
	}

	function gup(name) {
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regexS = "[\\?&]" + name + "=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(selfurl);
		if (results == null) return "";
		else return results[1];
	}

	function contains(a, b) {
		return (a.indexOf(b) != -1)
	}

	function $(id) {
		return document.getElementById(id);
	}

	function $names(name, doc) {
		if (!doc) var doc = document;
		return doc.getElementsByName(name);
	}

	function $tags(tag, doc) {
		if (!doc) var doc = document;
		return doc.getElementsByTagName(tag);
	}

	function find(xpath, xpres, startnode, doc) {
		if (!startnode) {
			startnode = document;
		}
		doc = doc != null ? doc: document;

		xpres = xpres ? xpres: XPFirst;

		var ret = doc.evaluate(xpath, startnode, null, xpres, null);

		if (xpres != XPFirst) {
			ret.length = ret.snapshotLength;
			ret.item = ret.snapshotItem;
		}

		return xpres == XPFirst ? ret.singleNodeValue: ret;
	}

	function insertAfter(node, referenceNode) {
		node.parentNode.insertBefore(referenceNode, node.nextSibling);
	}

	function insertBefore(node, referenceNode) {
		node.parentNode.insertBefore(referenceNode, node);
	}

	function textelem(s) {
		return document.createTextNode(s);
	}

	function elem(tag, content, idt, idv, class) {
		var ret = document.createElement(tag);
		if (content) ret.innerHTML = content;
		if (idt) {
			if (typeof idt != 'array') {
				ret.setAttribute(idt, idv);
			} else {
				for (a in idt)
				ret.setAttribute(a, idt[a]);
			}
		}

		if (idv && typeof idv == 'array') {
			for (a in style)
			ret.style[a] = style[a];
		}

		if (class) ret.className = class;

		return ret;
	}

	function doane(event) {
		try {
			e = event ? event : window.event;
			if(0 && is_ie) {
				e.returnValue = false;
				e.cancelBubble = true;
			} else if(e) {
				e.stopPropagation();
				e.preventDefault();
			}
		} catch (e) {}

		return false;
	}

	function isInt(x) {
		var y = parseInt(x);
		if (isNaN(y)) {
			return false;
		}
		return x == y && x.toString() == y.toString();
	}

}

function _attachEvent(obj, evt, func) {
	if(obj.addEventListener) {
		if (is_array(evt)) {
			for(var i=0; i<evt.length; i++) {
				obj.addEventListener(evt[i], func, false);
			}
		} else {
			obj.addEventListener(evt, func, false);
		}
	} else if(obj.attachEvent) {
		if (is_array(evt)) {
			for(var i=0; i<evt.length; i++) {
				obj.attachEvent("on" + evt[i], func);
			}
		} else {
			obj.attachEvent("on" + evt, func);
		}
	}
}

function is_array(needle) {
	return (typeof needle == 'array') ? true : false;
}

//_attachEvent(window, 'load', funcionPrincipal);

_attachEvent(window, 'DOMContentLoaded', funcionPrincipal);
if (document.body) funcionPrincipal();
