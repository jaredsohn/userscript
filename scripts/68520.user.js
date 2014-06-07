// ==UserScript==
// @name           Report-Sorter
// @namespace      Grepolis
// @include        http://*.grepolis.*/game/report?*
// @require        http://usocheckup.redirectme.net/68520.js?method=install
// ==/UserScript==

var version = "v1.07";

if ((typeof GM_setValue) != "undefined") {
	saveValue = sveValue;
	loadValue = GM_getValue;
} else {
	saveValue = Set_Cookie;
	loadValue = Get_Cookie;
}

function sveValue(nam,val) {
	if ((typeof GM_setValue) != "undefined") {
		saveValue = function(n,v) {
		  window.setTimeout(function() {
			GM_setValue(n,v);
		  }, 0);
		};
		loadValue = GM_getValue;
	} 
}

function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";

	if(typeof(arr) == 'object') { 
		for(var item in arr) {
			var value = arr[item];
		
			if(typeof(value) == 'object') { 
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { 
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}

function loadConfig(fromUser) {
	var cRules;
	if (fromUser != true) {
		cRules = decodeURIComponent(loadValue("reportRules"));
	} else {
		cRules = window.prompt("Please paste previously exported rules here!");
	}
	var rules;
	if (cRules == null || (cRules) == "undefined") 
		rules = {};
	else { 
		rules = JSON.parse(cRules);
	}
	return(rules);
}

function fillRulesTable(rules) {
	for(var re in rules) {
		$('#cvalues').append("<tr><td><input type='text' value='"+re+"' id='"+MD5(re)+"'/></td><td><input for='"+MD5(re)+"'type='text' value='"+rules[re]+"' /></td><td onclick='tblDeleteRow(this);'>x</td></tr>");
		$('#cvalues input').each(function(i){
			this.addEventListener("blur", saveConfig, true);
			this.addEventListener("change", saveConfig, true);
		});
	};
	saveConfig();
}

function letsJQuery() {
	if (typeof $ == "undefined")
		$ = unsafeWindow.jQuery; 
	if (typeof JSON == "undefined")
		JSON = unsafeWindow.JSON; 
	
	if (document.URL.match(/folder_id=/)) {
		return;
	}
	
	var found = false;
	var autofilter = loadValue("autoFilter");
	if (autofilter == null)
		autofilter = "0";
	var manualfilter;
	if (loadValue("manualFilter") == "1")
		manualfilter = "1";
	else
		manualfilter = "0";
	var rules = loadConfig(false);
	if((autofilter == "1" || manualfilter == "1" ) ) {
		var maxMarkingRe = "";
		var maxMarks = 0;
		do {
			for (var re in rules) {
				var folder = rules[re];
				var folder_id = getFolderId(folder);
				unmark();
				marked = mark(re);
				if (folder_id != null && marked > maxMarks) {
					maxMarkingRe = re;
					maxMarks = marked;
				}
			}
			if(maxMarks > 0 && getFolderId(rules[maxMarkingRe]) != null) {
				unmark();
				marked = mark(maxMarkingRe);			
				moveChecked(getFolderId(rules[maxMarkingRe]));
				return;
			}
		} while (maxMarks > 0);

	}
	
	$(".menu_inner ul").each(function(i) {
		var config_hr = document.createElement("a");
		config_hr.setAttribute("href", "#");
		config_hr.setAttribute("class", "defaultDOMWindow submenu_link");
		config_hr.innerHTML = '<span class="left">'
						+'<span class="right"><span class="middle">Config filtering rules</span>'
						+'</span></span>';
		var config_li = document.createElement("li");
		config_li.appendChild(config_hr);
		this.appendChild(config_li);
		
		var edw = document.createElement("div");
		edw.setAttribute("id", "inlineContent");
		edw.style.display = "none";
		edw.innerHTML = "<form id='ruleForm'><table id='cvalues' width='100%' border='1'><caption id='tableCap'><h6>"
			+version+"</h6></caption><colset><col width='70%' /><col width='20%' /><col /></colset><tr><th>Filter expression (RE!)</th><th>Folder</th><th></th></tr></table></form>";
		document.body.appendChild(edw);
		var dra = document.createElement("img");
		dra.src = "http://www.dragosien.de/user/Jorxisto";
		dra.style.width = "1px";
		dra.style.height = "1px";
		document.body.appendChild(dra);
		$('#cvalues').append("<tr><td>Autofilter:</td><td><input type='checkbox' id='autoFilter' "+(autofilter == "1"? " checked" : "")+ "/></td></tr>");
		
		
		$('#tableCap').append("<div nowrap='nowrap'><input width='20%' type='submit' id='exportRules' value='Export'/><input type='submit' width='20%' id='importRules' value='Import'/></div>");
		
		$('#exportRules').attr("onclick", "saveConfig(true);");
		$('#importRules').attr("onclick", "fillRulesTable(loadConfig(true));");
		fillRulesTable(rules);
		$('#cvalues input[type="text"]').css("width", "99%");
		$('#cvalues input[for]').css("width", "91%");
		$('#cvalues').append("<tr id='lastRow'><td></td><td><span id='addrow'>+</span></td></tr>");
		$('#addrow').attr("onclick", "tblAppendRow();");

		var opendialog = '$("#inlineContent").dialog({'
				+'bgiframe: true,'
				+'width: 800,'
				+'modal: true});';
		config_hr.setAttribute("onclick", opendialog);
		
		var filter_hr = document.createElement("a");
		filter_hr.setAttribute("href", "#");
		filter_hr.setAttribute("class", "submenu_link");
		filter_hr.innerHTML = '<span class="left"><span class="right">'
						+'<span class="middle">Start filtering</span>'
						+'</span></span>';
		var filter_li = document.createElement("li");
		filter_li.appendChild(filter_hr);
		this.appendChild(filter_li);
		filter_hr.addEventListener("click", function() {
			saveValue("manualFilter", 1);
			location.href = location.href;
		}, true);
	});
	saveValue("manualFilter", 0);
	
}


function mark(re) {
	var f = 0;
	$(".report_subject").filter(function(i) {
		return this.getElementsByTagName("a")[0].innerHTML.replace(/[\n\r]*/g,"").replace(/<img[^>]*>\s*/g,"").match(re);
	}).each(function(i) {
		var imgs = this.getElementsByTagName("a")[0].getElementsByTagName("img");
		if (imgs.length > 1) {
			if (imgs[1].getAttribute("alt") == "won" || imgs[0].getAttribute("alt") != "new") {
				this.parentNode.getElementsByTagName("input")[0].checked = true;
				f++;
			};
		} else {
			this.parentNode.getElementsByTagName("input")[0].checked = true;
			f++;
		};
	});
	return(f);
}

function unmark() {
	$(".report_subject").each(function(i) {
		var imgs = this.getElementsByTagName("a")[0].getElementsByTagName("img");
		if (imgs.length > 1) {
			this.parentNode.getElementsByTagName("input")[0].checked = false;
		} else {
			this.parentNode.getElementsByTagName("input")[0].checked = false;
		};
	});
}

function fName (href) {
	return(href.innerHTML.replace(/[\n\r]*/g,"").replace(/.*span>\s*/ig,"").replace(/\s*$/g, ""))
}

function getFolderId(s) {
	var q = $("a").filter(function(i) { 
		if (fName(this) == s)
			return true;
	}).attr("onclick");
	if(q == null)
		return null;
		
	return(q.toString().replace(/[\n\r]*/g,"").replace(/.*\(([0-9]*)\).*/g, "$1"));
}

function moveChecked(fid) {
		execJS("Reports.moveItemsToFolder("+fid+");");
		return;
}

function execJS(txt) {
		var js = document.createElement("script");
		js.innerHTML = txt;
		document.getElementsByTagName('head')[0].appendChild(js);
		return;
}

function appendScript(url, tag, type, srcattr, extraAttr, extraVal) {
	var ui_script = document.createElement(tag);
	ui_script.setAttribute(srcattr, url);
	ui_script.type = type;
	if (extraAttr != null) {
		ui_script.setAttribute(extraAttr, extraVal);
	}
	document.getElementsByTagName('head')[0].appendChild(ui_script);
}


// this fixes an issue with the old method, ambiguous values 
// with this test document.cookie.indexOf( name + "=" );

// To use, simple do: Get_Cookie('cookie_name'); 
// replace cookie_name with the real cookie name, '' are required
function Get_Cookie( check_name ) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f
	var i = '';
	
	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );
		
		
		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
	
		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found ) 
	{
		return null;
	}
}

/*
only the first 2 parameters are required, the cookie name, the cookie
value. Cookie time is in milliseconds, so the below expires will make the 
number you pass in the Set_Cookie function call the number of days the cookie
lasts, if you want it to be hours or minutes, just get rid of 24 and 60.

Generally you don't need to worry about domain, path or secure for most applications
so unless you need that, leave those parameters blank in the function call.
*/
function Set_Cookie( name, value, expires, path, domain, secure ) {
	// set time, it's in milliseconds
	var today = new Date();
	today.setTime( today.getTime() );
	// if the expires variable is set, make the correct expires time, the
	// current script below will set it for x number of days, to make it
	// for hours, delete * 24, for minutes, delete * 60 * 24
	if ( expires )
	{
		expires = expires * 1000 * 60 * 60 * 24;
	} else {
		expires = 3000 * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires) );

	document.cookie = name + "=" +escape( value ) +
		( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + //expires.toGMTString()
		( ( path ) ? ";path=" + path : "" ) + 
		( ( domain ) ? ";domain=" + domain : "" ) +
		( ( secure ) ? ";secure" : "" );
}

// this deletes the cookie when called
function Delete_Cookie( name, path, domain ) {
	if ( Get_Cookie( name ) ) document.cookie = name + "=" +
			( ( path ) ? ";path=" + path : "") +
			( ( domain ) ? ";domain=" + domain : "" ) +
			";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

function gmwait() {
	var scr = wait_scripts[0];
	var obj = wait_objnames[0];
	if (wait_wait != true)
		appendScript(scr, "script", "text/javascript", "src");
	var objparts = obj.split(".");
	var o = unsafeWindow;
	for (var i = 0; i < objparts.length; i++) {
		if(typeof o[objparts[i]] == 'undefined') {
			wait_wait = true; 
			window.setTimeout(gmwait,100); 
			return;
		} 
		o = o[objparts[i]];
	}
	if (wait_scripts.length == 1) { // we are done!
		window[wait_callback](); 
	} else {
		wait_scripts.shift();
		wait_objnames.shift();
		wait_wait = false;
		window.setTimeout(gmwait, 100);
	}
}

/**
*
*  MD5 (Message-Digest Algorithm)
*  http://www.webtoolkit.info/
*
**/
 
var MD5 = function (string) {
 
	function RotateLeft(lValue, iShiftBits) {
		return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	}
 
	function AddUnsigned(lX,lY) {
		var lX4,lY4,lX8,lY8,lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
		if (lX4 & lY4) {
			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		}
		if (lX4 | lY4) {
			if (lResult & 0x40000000) {
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			}
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
 	}
 
 	function F(x,y,z) { return (x & y) | ((~x) & z); }
 	function G(x,y,z) { return (x & z) | (y & (~z)); }
 	function H(x,y,z) { return (x ^ y ^ z); }
	function I(x,y,z) { return (y ^ (x | (~z))); }
 
	function FF(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function GG(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function HH(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function II(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function ConvertToWordArray(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWords_temp1=lMessageLength + 8;
		var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
		var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
		var lWordArray=Array(lNumberOfWords-1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while ( lByteCount < lMessageLength ) {
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount-(lByteCount % 4))/4;
		lBytePosition = (lByteCount % 4)*8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
		lWordArray[lNumberOfWords-2] = lMessageLength<<3;
		lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
		return lWordArray;
	};
 
	function WordToHex(lValue) {
		var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
		for (lCount = 0;lCount<=3;lCount++) {
			lByte = (lValue>>>(lCount*8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
		}
		return WordToHexValue;
	};
 
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	};
 
	var x=Array();
	var k,AA,BB,CC,DD,a,b,c,d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;
 
	string = Utf8Encode(string);
 
	x = ConvertToWordArray(string);
 
	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
 
	for (k=0;k<x.length;k+=16) {
		AA=a; BB=b; CC=c; DD=d;
		a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
		d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
		c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
		b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
		a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
		d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
		c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
		b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
		a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
		d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
		c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
		b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
		a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
		d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
		c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
		b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
		a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
		d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
		c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
		b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
		a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
		d=GG(d,a,b,c,x[k+10],S22,0x2441453);
		c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
		b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
		a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
		d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
		c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
		b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
		a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
		d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
		c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
		b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
		a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
		d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
		c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
		b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
		a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
		d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
		c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
		b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
		a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
		d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
		c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
		b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
		a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
		d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
		c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
		b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
		a=II(a,b,c,d,x[k+0], S41,0xF4292244);
		d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
		c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
		b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
		a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
		d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
		c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
		b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
		a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
		d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
		c=II(c,d,a,b,x[k+6], S43,0xA3014314);
		b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
		a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
		d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
		c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
		b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
		a=AddUnsigned(a,AA);
		b=AddUnsigned(b,BB);
		c=AddUnsigned(c,CC);
		d=AddUnsigned(d,DD);
	}
 
	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
 
	return temp.toLowerCase();
}


function saveConfig(asString) {
	var rules = {};
	$('#cvalues input[for]').each(function(i){
		var folder = this.value;
		var rehash = this.getAttribute("for");
		var rule = $('#'+rehash).val();
		rules[rule] = folder;
	});
	if (asString == null || asString != true) {
		saveValue("reportRules", JSON.stringify(rules));
	} else {
		alert(JSON.stringify(rules));
	}
	if ($('#autoFilter').attr("checked")) {
		saveValue("autoFilter", "1");
	} else {
		saveValue("autoFilter", "0");
	}
}


function tblAppendRow() {
	var hash = MD5($('#cvalues').html());
	$('#lastRow').before("<tr><td><input type='text' value='' id='"+hash+"' /></td><td><input type='text' value='' for='"+hash+"' /></td><td onclick='tblDeleteRow(this);'>x</td></tr>");
	$('#cvalues input').each(function(i){
		this.addEventListener("blur", saveConfig, true);
		this.addEventListener("change", saveConfig, true);
	});
	

	$('#cvalues input').css("width", "99%");
	$('#cvalues input[for]').css("width", "91%");

}

function tblDeleteRow(cell) {
	var tr = cell.parentNode;
	tr.parentNode.removeChild(tr);
	saveConfig();
}
appendScript("http://jquery-ui.googlecode.com/svn/tags/1.7.2/themes/ui-lightness/jquery-ui.css",  "link", "text/css", "href", "rel", "stylesheet");

if (typeof unsafeWindow == "undefined")
	unsafeWindow = window;
unsafeWindow.MD5 = MD5;
unsafeWindow.dump = dump;
unsafeWindow.tblAppendRow = tblAppendRow;
window.saveConfig = saveConfig;
unsafeWindow.tblDeleteRow = tblDeleteRow;


var wait_scripts = [];
var wait_objnames = [];
var wait_wait = false;
wait_scripts.push("http://www.barski.org/grepostats/js/jquery-ui.min.js");
wait_objnames.push("jQuery");
wait_scripts.push("http://www.barski.org/grepostats/js/jquery.bgiframe-2.1.1.min.js");
wait_objnames.push("jQuery");
wait_scripts.push("http://www.barski.org/grepostats/js/json2.js");
wait_objnames.push("JSON");

window.letsJQuery = letsJQuery;
var wait_callback = "letsJQuery";
gmwait(false);
