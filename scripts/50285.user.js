// ==UserScript==
// @name           nhg 台灣房屋地政系統修正檔
// @namespace      nhg
// @description    nhg 台灣房屋地政系統修正檔 by bluelovers
// @include        http://*.nhg.com.tw/*
// @exinclude        http://*.twhg.com.tw/*

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

		if ($BASEFILENAME != 'sep01out') {
			var cssStyle = "";

			cssStyle += "::selection {background-color: #DD0044;color: #FFFFFF;}::-moz-selection {background-color: #DD0044;color: #FFFFFF;}";
			cssStyle += "input[type='text'], input[type='password'], textarea, select { padding:1px; margin:2px; border:1px solid #A1A1A1; }";
			cssStyle += "input[type='text']:focus, textarea:focus, select:focus { border:1px solid #009900; }";

			cssStyle += "body, td, input, textarea, select, button, font[size='3'] {color:#333333;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6em;}";

			GM_addStyle(cssStyle);
		}
	}

	if ($BASEFILENAME == 'buyer') {
		var o_add_arr = new Array();
		var abc_arr = ['', 'A', 'B'];
		var aa;

		for (var jj=0; jj<abc_arr.length; jj++) {

			aa = abc_arr[jj];

			idx = o_add_arr.length > 0 ? o_add_arr.length : 0;
			o_add_arr[idx] = new Array();

			o_add_arr[idx][0] = 'unsafeWindow.window.o1'+aa+'_add_arr';
			o_add_arr[idx][1] = eval(o_add_arr[idx][0]);

			for(var i=1; i<=27; i++) {
				idx = o_add_arr.length;
				o_add_arr[idx] = new Array();

				o_add_arr[idx][0] = 'unsafeWindow.window.o_add'+aa+''+i+'_arr';
				o_add_arr[idx][1] = eval(o_add_arr[idx][0]);
			}
		}

		for(var i=0; i<o_add_arr.length; i++) {
			for (var j=0; j<o_add_arr[i][1].length; j++) {
				o_add_arr[i][1][j] = o_add_arr[i][1][j].replace(/`/ig, '"');
				o_add_arr[i][1][j] = o_add_arr[i][1][j].replace(/`/ig, '"');
				o_add_arr[i][1][j] = o_add_arr[i][1][j].replace(/`/ig, '"');
			}
		}

		_setAttribute($names('A11')[0], 'onchange', $names('A11')[0].getAttribute('onchange').replace(/`/ig, ''));
		_setAttribute($names('A11A')[0], 'onchange', $names('A11A')[0].getAttribute('onchange').replace(/`/ig, ''));
		_setAttribute($names('A11B')[0], 'onchange', $names('A11B')[0].getAttribute('onchange').replace(/`/ig, ''));

		unsafeWindow.o1_addtown_field($names('A11')[0].selectedIndex);
		$('A12').innerHTML = unsafeWindow.o_add3_arr[$('code_1').selectedIndex];

		unsafeWindow.o1A_addtown_field($names('A11A')[0].selectedIndex);
		$('A12A').innerHTML = unsafeWindow.o_addA3_arr[$('codeA_1').selectedIndex];

		unsafeWindow.o1B_addtown_field($names('A11B')[0].selectedIndex);
		$('A12B').innerHTML = unsafeWindow.o_addB3_arr[$('codeB_1').selectedIndex];

		if (selfurl_array['mode'] == 'insert') $names('A25')[0].value = 99;

		_attachEvent($names('A2')[0], 'change', function () {
			var who = $names('A2')[0];
			if (who.value.length >= 10 && $names('A4')[0].value == '') {
				$names('A4')[0].value = who.value;

				unsafeWindow.check_phone($names('A4')[0]);
			}
		});
		_attachEvent($names('A4')[0], 'change', function () {
			var who = $names('A4')[0];
			if (who.value.length >= 10 && $names('A2')[0].value == '') {
				$names('A2')[0].value = who.value;
			}
		});

		var cssStyle = "";

		cssStyle += "input[name='A4'], input[name='A1'], select[name='A47'] { border:1px solid #EE82EE; }";
		cssStyle += "input[name='A4']:focus, input[name='A1']:focus, select[name='A47']:focus { border:1px solid #FF00FF; }";

		GM_addStyle(cssStyle);
	} else if (in_array($BASEFILENAME, ['show_area', 'show_coms', 'show_obtype'])) {
		var tt = $tags('INPUT');

		for(var i=0; i<tt.length; i++) {
			_setAttribute(tt[i], 'onclick', tt[i].getAttribute('onclick') ? tt[i].getAttribute('onclick').replace(/`/ig, '') : '');
			_setAttribute(tt[i], 'ondblclick', tt[i].getAttribute('ondblclick') ? tt[i].getAttribute('ondblclick').replace(/`/ig, '') : '');
		}

		_setAttribute($names('f')[0], 'ondblclick', 'additm(this , t ,\'\')');
		_setAttribute($names('t')[0], 'ondblclick', 'delitm(main.f ,this)');

		_setAttribute(find('//input[@value=" > "]'), 'onclick', 'additm(main.f , main.t ,\'\')');

		_setAttribute(find('//input[@value=" < "]'), 'onclick', 'delitm(main.f , main.t)');

		_setAttribute(find('//input[@value="\^"]'), 'onclick', 'move(main.t,-1)');
		_setAttribute(find('//input[@value="v"]'), 'onclick', 'move(main.t,1)');

		unsafeWindow.send = unsafeWindow.window.send = function (t) {
				var tmpstr='';
			    for(i=0;i<t.options.length;i++){
			       tmpstr=tmpstr+t.options[i].value+','
			    }

			    switch($BASEFILENAME) {
			    	case 'show_coms':
			    		unsafeWindow.opener.document.myform.A12_tmp.value = tmpstr;
			    		break;
			    	case 'show_area':
			    		unsafeWindow.opener.document.myform.A11_tmp.value = tmpstr;
			    		break;
			    	case 'show_obtype':
			    		unsafeWindow.opener.document.myform.A27_tmp.value = tmpstr;
			    		break;
			    }

			    unsafeWindow.window.close();
		}
	} else if ($BASEFILENAME == 'pdamaintain') {
		if (selfurl_array['mode'] == 'select') {
			$names('A25')[0].value = 99;
		}
	} else if ($BASEFILENAME == 'buyeriud') {
		if (selfurl_array['mode'] == 'insert') {
//			iView1 = unsafeWindow.iView1 = unsafeWindow.window.iView1 = $('iView1');
//			
//			unsafeWindow.Init1 = function () {
//				iView1.document.designMode = 'On'; 
//				iHTML1 = ''; 
//				setTimeout('document.myform.__control_1.value = iHTML1;', 0); 
//				setTimeout('iView1.document.body.innerHTML = iHTML1;', 0); 
//				document.myform.A8.value = iHTML1; 
//			}
//			
//			unsafeWindow.Init1();
		}
	} else if ($BASEFILENAME == 'seller') {
		var tt = $tags('INPUT');

		for(var i=0; i<tt.length; i++) {
			_setAttribute(tt[i], 'onclick', tt[i].getAttribute('onclick') ? tt[i].getAttribute('onclick').replace(/`/ig, '') : '');
			_setAttribute(tt[i], 'ondblclick', tt[i].getAttribute('ondblclick') ? tt[i].getAttribute('ondblclick').replace(/`/ig, '') : '');
			_setAttribute(tt[i], 'onblur', tt[i].getAttribute('onblur') ? tt[i].getAttribute('onblur').replace(/`/ig, '') : '');
			_setAttribute(tt[i], 'onfocus', tt[i].getAttribute('onfocus') ? tt[i].getAttribute('onfocus').replace(/`/ig, '') : '');
			_setAttribute(tt[i], 'onchange', tt[i].getAttribute('onchange') ? tt[i].getAttribute('onchange').replace(/`/ig, '') : '');
		}
	}
	
	playerLinks();
	
	function playerLinks(){
		var links = document.getElementsByTagName("a");

		var arrayplayerLinks = new Array();
		
		for(var i = 0; i < links.length; i++){
			if (links[i].className == 'done' || links[i].getAttribute('done')) continue;
			
			if(links[i].href.search(/buy01-p.asp\?no=(TF\d+)&?/) > 0) {
//				http://www.twhg.com.tw/buy/buy01-p.asp?no=TF09754922
				
				var a = RegExp.$1;
				if (!a) continue;
				
				linkspan.appendChild(elem('hr'));
				
//				alert(a);
				if (arrayplayerLinks[links[i].href]) {
					var linkspan = elem('span', arrayplayerLinks[links[i].href]);
				} else {
					var linkspan = elem('span', "");
					
					linkspan.appendChild(textelem(' '));
	
					var igmlink2 = elem('a', '製表2', 'target', '_blank', 'done');
					igmlink2.href = 'http://www.twhg.com.tw/buy/buy01-pNew.asp?pp=0&no=' + a;
					igmlink2.setAttribute('done', 1);
					igmlink2.setAttribute('title', '附加地圖的物件介紹表');
	
					linkspan.appendChild(igmlink2);
					
					linkspan.appendChild(textelem(' '));
	
					var igmlink2 = elem('a', '製表3', 'target', '_blank', 'done');
					igmlink2.href = 'http://www.twhg.com.tw/house/nObjshow.asp?b1=\'' + a + '\'';
					igmlink2.setAttribute('done', 1);
					igmlink2.setAttribute('title', '簡易型物件表');
	
					linkspan.appendChild(igmlink2);
					
					linkspan.appendChild(textelem(' '));
	
					var igmlink2 = elem('a', '製表4', 'target', '_blank', 'done');
					igmlink2.href = 'http://www.twhg.com.tw/house/nObjshow.asp?b1=\'' + a + '\'';
					igmlink2.setAttribute('done', 1);
					igmlink2.setAttribute('title', '超簡易型物件表');
	
					linkspan.appendChild(igmlink2);
					
					linkspan.appendChild(textelem(' '));
	
					var igmlink2 = elem('a', '前台', 'target', '_blank', 'done');
					igmlink2.href = 'http://www.twhg.com.tw/buy/buy01.asp?no=' + a + '';
					igmlink2.setAttribute('done', 1);
					igmlink2.setAttribute('title', '前台物件頁');
	
					linkspan.appendChild(igmlink2);
					
					linkspan.appendChild(textelem(' '));
	
					var igmlink2 = elem('a', '詳細', 'target', '_blank', 'done');
					igmlink2.href = 'http://nh3.nhg.com.tw/pub/showhouse.php?NOTE_NO=' + a;
					igmlink2.setAttribute('done', 1);
					igmlink2.setAttribute('title', '詳細介紹頁');
					
					linkspan.appendChild(igmlink2);
					
					linkspan.appendChild(textelem(' '));
	
					var igmlink2 = elem('a', '格局', 'target', '_blank', 'done');
					igmlink2.href = 'http://www.twhg.com.tw/buy/display.asp?note_no=' + a;
					igmlink2.setAttribute('done', 1);
					igmlink2.setAttribute('title', '互動格局圖');
					
					linkspan.appendChild(textelem(' '));
	
					var igmlink2 = elem('a', '影音', 'target', '_blank', 'done');
					igmlink2.href = 'http://extra.twhg.com.tw/nhapp/lib/show_page.php?show_obid=' + a;
					igmlink2.setAttribute('done', 1);
					igmlink2.setAttribute('title', '影音看屋');
					
					linkspan.appendChild(igmlink2);
					
					linkspan.appendChild(textelem(' '));
	
					var igmlink2 = elem('a', '地圖', 'target', '_blank', 'done');
					igmlink2.href = 'http://www.twhg.com.tw/buy/googleMap.asp?type=1&NO=' + a;
					igmlink2.setAttribute('done', 1);
					igmlink2.setAttribute('title', '地圖');
					
					linkspan.appendChild(igmlink2);
					
					arrayplayerLinks[links[i].href] = linkspan.innerHTML;
				}
				
				links[i].parentNode.insertBefore(linkspan, links[i].nextSibling);
				
				links[i].target = '_blank';
				links[i].setAttribute('title', '附加本息平均攤還試算');
			} else if(links[i].href.search(/showpic\.php\?.+&OP_PIC=(.+)\.jpg/) > 0) {
				
				var a = RegExp.$1;
				if (!a) continue;
				
//				alert(a);
				if (arrayplayerLinks[links[i].href]) {
					var linkspan = elem('span', arrayplayerLinks[links[i].href]);
				} else {
					var linkspan = elem('span', "");
					
					linkspan.appendChild(textelem(' '));
					
					var igmlink2 = elem('img', '', 'target', '_blank', 'done');
	
					igmlink2.src = 'http://extra.nhg.com.tw/nhapp/images/OB01/' + a + '.jpg';
					igmlink2.setAttribute('done', 1);
					igmlink2.setAttribute('height', 240);
	
					linkspan.appendChild(igmlink2);
					
					arrayplayerLinks[links[i].href] = linkspan.innerHTML;
				}
				
				links[i].parentNode.insertBefore(linkspan, links[i].nextSibling);
				
				links[i].target = '_blank';
			} else if(links[i].href.search(/arhrp10out.php\?txtNOTE_NO=(TF\d+)&?/) > 0) {
//				http://extra.twhg.com.tw/nhapp/arh/arhrp10out.php?txtNOTE_NO=TF09711150&user_id=T2095
				
				var a = RegExp.$1;
				if (!a) continue;
				
//				alert(a);
				if (arrayplayerLinks[links[i].href]) {
					var linkspan = elem('span', arrayplayerLinks[links[i].href]);
				} else {
					var linkspan = elem('span', "");
					
					linkspan.appendChild(elem('hr'));
					
					linkspan.appendChild(textelem(' '));
	
					var igmlink2 = elem('a', '製表', 'target', '_blank', 'done');
					igmlink2.href = 'http://www.twhg.com.tw/buy/buy01-p.asp?no=' + a;
					igmlink2.setAttribute('done', 1);
					igmlink2.setAttribute('title', '附加本息平均攤還試算');
	
					linkspan.appendChild(igmlink2);
					
					linkspan.appendChild(textelem(' '));
	
					var igmlink2 = elem('a', '製表2', 'target', '_blank', 'done');
					igmlink2.href = 'http://www.twhg.com.tw/buy/buy01-pNew.asp?pp=0&no=' + a;
					igmlink2.setAttribute('done', 1);
					igmlink2.setAttribute('title', '附加地圖的物件介紹表');
	
					linkspan.appendChild(igmlink2);
					
					linkspan.appendChild(textelem(' '));
	
					var igmlink2 = elem('a', '製表3', 'target', '_blank', 'done');
					igmlink2.href = 'http://www.twhg.com.tw/house/nObjshow.asp?b1=\'' + a + '\'';
					igmlink2.setAttribute('done', 1);
					igmlink2.setAttribute('title', '簡易型物件表');
	
					linkspan.appendChild(igmlink2);
					
					linkspan.appendChild(textelem(' '));
	
					var igmlink2 = elem('a', '製表4', 'target', '_blank', 'done');
					igmlink2.href = 'http://www.twhg.com.tw/house/nObjshow.asp?b1=\'' + a + '\'';
					igmlink2.setAttribute('done', 1);
					igmlink2.setAttribute('title', '超簡易型物件表');
	
					linkspan.appendChild(igmlink2);
					
					linkspan.appendChild(textelem(' '));
	
					var igmlink2 = elem('a', '前台', 'target', '_blank', 'done');
					igmlink2.href = 'http://www.twhg.com.tw/buy/buy01.asp?no=' + a;
					igmlink2.setAttribute('done', 1);
					igmlink2.setAttribute('title', '前台物件頁');
					
					linkspan.appendChild(igmlink2);
					
					linkspan.appendChild(textelem(' '));
	
					var igmlink2 = elem('a', '詳細', 'target', '_blank', 'done');
					igmlink2.href = 'http://nh3.nhg.com.tw/pub/showhouse.php?NOTE_NO=' + a;
					igmlink2.setAttribute('done', 1);
					igmlink2.setAttribute('title', '詳細介紹頁');
					
					linkspan.appendChild(igmlink2);
					
					arrayplayerLinks[links[i].href] = linkspan.innerHTML;
				}
				
				links[i].parentNode.insertBefore(linkspan, links[i].nextSibling);
				
				links[i].target = '_blank';
			}
		}
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
