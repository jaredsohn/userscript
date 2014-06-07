// ==UserScript==
// @name           prueba
// @namespace      http://userscripts.org
// @description    prueba
// @include        http://*megavideo.com/?d=*
// @include        http://*megavideo.com/?v=*
// ==/UserScript==

function decrypt(str, key1, key2) {

        str= "b4ce458b6d2c1d6d0615bd047a5c1181";
        key1= 47295;
        key2= 91280;
	var loc1 = [];
	for (var loc3 = 0; loc3 < str.length; ++loc3) {
		loc1.push(("000" + parseInt(str.charAt(loc3), 16).toString(2)).slice(-4));
	}
	loc1 = loc1.join("").split("");
	var loc6 = [];
	for (var loc3 = 0; loc3 < 384; ++loc3) {
		key1 = (key1 * 11 + 77213) % 81371;
		key2 = (key2 * 17 + 92717) % 192811;
		loc6[loc3] = (key1 + key2) % 128;
	}
	for (var loc3 = 256; loc3 >= 0; --loc3) {
		var loc5 = loc6[loc3];
		var loc4 = loc3 % 128;
		var loc8 = loc1[loc5];
		loc1[loc5] = loc1[loc4];
		loc1[loc4] = loc8;
	}
	for (var loc3 = 0; loc3 < 128; ++loc3) {
		loc1[loc3] = loc1[loc3] ^ loc6[loc3 + 256] & 1;
	}
	var loc12 = loc1.join("");
	var loc7 = [];
	for (var loc3 = 0; loc3 < loc12.length; loc3 = loc3 + 4) {
		var loc9 = loc12.substr(loc3, 4);
		loc7.push(loc9);
	}
	var loc2 = [];
	for (var loc3 = 0; loc3 < loc7.length; ++loc3) {
		loc2.push(parseInt(loc7[loc3], 2).toString(16));
	}
	return loc2.join("");
}
function $(id) {
	return document.getElementById(id);
}
function urldecode(str) {
	return unescape(str).replace(/\+/g, " ");
}
function seconds_to_hms(seconds) {
	var t = new Date(1970,0,1);
	t.setSeconds(seconds);
	str = t.toTimeString();

	if (seconds < 3600)
		return str.substr(3,5);
	else
		return str.substr(0,8);
}
function bytes_to_mb(bytes) {
	return (bytes/1024)/1024;
}

var icons = {
	download: 'data:image/gif;base64,R0lGODlhEAAQAMQAAIWOl8rKyoibetPT02hoarm6usPDw/Pz89ra2uTk5Hl6e6mrpmGNRH2vWunp'+
					'6e3t7ZPNX47LVbW1tZPIa5nXWvv7+1hZXfT2+HFxcfNXV2FhYZ6ens7OzvDw8GOPRf///yH5BAAA'+
					'AAAALAAAAAAQABAAAAWf4CeOX9SQJGIYi+CZniBsQCEa5Nt44nUBIlvCQ6RMiB7ORRH8JCoeCAUS'+
					'YVQ4H+ZH8kEgDp5Gg9HhYDGiRRcRODDIBvMH/VEPBgVJpyORyOl2d2aDcgQiGwd7D4sPDo6Ohh8b'+
					'HSoFlpYSBRwOkZN3AxwBHxMGGQYJGocXn6EBKwYFHakfAAgXHY2PDgkdARYiAArCGBgExhrIFpEo'+
					'zCQhADs=',

	time: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0'+
				    'RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKrSURBVDjLpdPbT9IBAMXx%2FqR6qN'+
				    'bWUy89WS5rmVtutbZalwcNgyRLLMyuoomaZpRQCt5yNRELL0TkBSXUTBT5hZSXQPwBAvor%2FfZG'+
				    'azlb6%2BG8nIfP0znbgG3%2Fkz%2BKnsbb%2BxxNV63DLxVLHzqV0vCrfMluzFmw1OW8ePEwf8%2'+
				    'BWgM1UXDnapVgLePr5Nj9DJBJGFEN8%2BTzKqL2RzkenV4yl5ws2BXob1WVeZxXhoB%2BPP0xzt0'+
				    'Bly0fKTePozV5GphYQPA46as%2BgU5%2FK%2Bw2w6Ev2Ol%2FKpNCigM01R2uPgDcQIRSJEYys4J'+
				    'mNoO%2Fy0tbnY9JlxnA9M15bfHZHCnjzVN4x7TLz6fMSJqsPgLAoMvV1niSQBGIbUP3Ki93t57Xh'+
				    'ItVXjulTQHf9hfk5%2FxgGyzQTgQjx7xvE4nG0j3UsiiLR1VVaLN3YpkTuNLgZGzRSq8wQUoD16f'+
				    'lkOPSF28%2FcLCYkwqvrrAGXC1UYWtuRX1PR5RhgTJTI1Q4wKwzwWHk4kQI6a04nQ99mUOlczMYk'+
				    'FhPrBMQoN%2B7eQ35Nhc01SvA7OEMSFzTv8c%2F0UXc54xfQcj%2FbNzNmRmNy0zctMpeEQFSio%'+
				    '2FcdvqUICz9AiEPb%2BDLK2gE%2B2MrR5qXPpoAn6mxdr1GBwz1FiclDcAPCEkTXIboByz8guA75'+
				    'eg8WxxDtFZloZIdNKaDu5rnt9UVHE5POep6Zh7llmsQlLBNLSMTiEm5hGXXDJ6qb3zJiLaIiJy1Z'+
				    'pjy587ch1ahOKJ6XHGGiv5KeQSfFun4ulb%2FjosZOYY0di%2F0tw9YCquX7KZVnFW46Ze2V4wU1'+
				    'ivRYe1UWI1Y1vgkDvo9PGLIoabp7kIrctJXSS8eKtjyTtuDErrK8jIYHuQf8VbK0RJUsLfEg94Bf'+
				    'IztkLMvP3v3XN%2F5rfgIYvAvmgKE6GAAAAABJRU5ErkJggg%3D%3D',

	size: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0'+
				    'RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALnSURBVDjLfZNLaFx1HIW%2Fe2fuzJ'+
				    '00w0ymkpQpiUKfMT7SblzU4kayELEptRChUEFEqKALUaRUV2YhlCLYjYq4FBeuiqZgC6FIQzBpEG'+
				    'pDkzHNs5PMTJtmHnfu6%2F%2F7uSh2IYNnffg23zmWqtIpd395YwiRL1Q0qyIfD56cmOvUs%2F4L'+
				    'WJg40auiH6jI%2B7v3ncybdo2Hy9ebKvqNGrn03Nj1%2Bx0Bi1dHHVV9W0U%2Bye4d2d83%2BCa2'+
				    'GJrlGZx0gkppkkfrsysqclFFvh8%2B%2B3v7CWDh6ugIohfSPcPH%2Bw6fwu05ABoSby9yb3Kc%2'+
				    'FmePYXc9TdCqslWapVGdn1Zjxo%2B%2BO33Fujtx4gdEzj61f8xyC8%2FjN2rsVOcxYZOoVSZtBe'+
				    'wZOAT%2BNonuAWw3S728wFZpFm975cekGjlz8NXLVtSo0SxPImGdtFfFq5epr21wdOxrnMwuaC2j'+
				    'rRJWfYHdxRfIFeDWr0unkyrSUqxcyk2TLQzQrt6hqydPvidDBg%2F8VTAp8DegvYa3OU1z%2BSbu'+
				    'M6dQI62kioAAVgondwAnncWvzCDNCk4CLO9vsJVw8xqN%2BiPiTB5SaTSKURGSaoTHHgxoAMlduL'+
				    '1HiFMZXP8BsvkbO1GD2O3GpLOIF0KsSBijxmCrMY%2BFqgGJQDzQgGT3XrJ7DuI5EKZd4iDG%2BC'+
				    'HG84m8AIki1Ai2imRsx4FEBtQHCUB8MG1wi8QKGhjEC4mbAVHTx8kNYSuoiGurkRtLN76ivb0K6S'+
				    'IkusCEoBEgaCQYPyT2QhKpAXKHTiMmQ2lmChWZTrw32v9TsLOyVlu8Nhi2G4Vs32HsTC9IA2KPRu'+
				    'U2Erp097%2BO5RRYvz3H1r3JldivfY7IR0%2BmfOu7l3pV5EM1cq744mi%2BOPwaRD71tSk0Vsp3'+
				    '%2FuLB6s2minyrIpeOf7a00fFMf1w%2BMqRGzqvIW%2FteecdqV5a5P%2F8ncXv9ZxUdf%2FlCae'+
				    '5%2F3%2Fhvpi4OjajIp4ikVOTLY%2BcXr3Tq%2FQPcssKNXib9yAAAAABJRU5ErkJggg%3D%3D',

	megaupload: 'data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAA'+
				    'AAAAAAAAAAAAAAAAAAAAAoN76AG%2B77QBFsfIAccf3AK%2Fp%2FQDs9fkAGZ3wAM3q9wCN1vcAb'+
				    'ISOAI%2FD0QBcXl4AXJHMABESEQAGctQAAAACd3cgAAAAAP8yI%2F8AAAAPcYiIF%2FAAAPeFGIF'+
				    'YfwAD9bQREUtfMA876hzBrrPwn53svuvO2fknnezO7M7ZcicdzMqszNFyl1vMwizMtXkHWKq0S6q'+
				    'FcAI2WRERlWMgAHVoERGGVwAAB1ZmZmVwAAAANFZlQwAAAAABIzIQAAD4HwAA8A8AAOAHAADAAwA'+
				    'AgAEAAIABAAAAAAAAAAAAAAAAAAAAAAAAgAEAAIABAADAAwAA4AcAAPAPAAD4HwAA'
}

function addStyle() {
	var styles = [
		'#tube_boxes {position: fixed;bottom: 5px; right: 5px; z-index: 2512;opacity: 0.8;color:#333;font-size:11px;font-family:Verdana;font-weight:bold;}',
		'.tube_box { float: right;margin-left: 5px;text-align: center;}',
		'.tube_box .tag { border:1px solid #B6D9EE;background-color: #DFF1FD;padding:4px;-moz-border-radius:2px 5px;}',
		'.tube_box a { font-size:11px;font-family:Verdana;color:#1F85C1 !important;text-decoration:none;}',
		'.tube_box img { margin:0px;padding:0px;border:none;vertical-align:middle}',
		'.tube_box a.link_tag {display: block;}',
		'.tube_box a.download_link:hover { border:1px solid #AE150E;background-color:#CE1A10;color:#FFFFFF !important;}'
	];

	GM_addStyle(styles.join("\r\n"));
}

var vars = {};
function getinlinevars(onload) {
	var scripts = document.getElementsByTagName("script");
	for (var i = 0, len = scripts.length; i < len; i++) {
		var str = scripts[i].innerHTML;
		if (str.match(/\sflashvars\.v = /)) {
			extract(str);
			break;
		}
	}
	function extract(str) {
		vars.original_ID = location.href.split("=")[1];
		vars.ID = str.match(/flashvars\.v = \"(.*)\";\n/)[1];
		vars.title = urldecode(str.match(/flashvars\.title = \"(.*)\";\n/)[1]);
		vars.added = urldecode(str.match(/flashvars\.added = \"(.*)\";\n/)[1]);
		vars.added = vars.added.replace(/\s,/, ",");
		vars.embed = urldecode(str.match(/flashvars\.embed = \"(.*)\";\n/)[1]);
		vars.embed = vars.embed.match(/<embed src=\"http:\/\/www\.megavideo\.com\/v\/([^\"]*)\"/)[1];
	}
	onload();
}
function getxmlvars(onload) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.megavideo.com/xml/videolink.php?v='+vars.ID,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(xml) {
			var xml = (new DOMParser()).parseFromString(xml.responseText, "text/xml");
			var attr = xml.childNodes.item(0).childNodes.item(0);
			vars.s = attr.getAttribute("s");
			vars.un = attr.getAttribute("un");
			vars.k1 = attr.getAttribute("k1");
			vars.k2 = attr.getAttribute("k2");
			vars.seconds = attr.getAttribute("runtime");
			vars.size = attr.getAttribute("size");

			onload();
		}
	});
}
function checkmegaupload(onload) {
	if ("opera" in window) // no cross-domain for lame browsers (;
		return false;

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://megaupload.com/?d='+vars.original_ID,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(xml) {
			var str = xml.responseText;
			if (str.match(/View on Megavideo/))
				onload();
		}
	});
}
function tagload() {
	var box = document.createElement('div');
	box.className = 'tube_box';
	return $('tube_boxes').appendChild(box);
}
function download_tag() {
	var tag = tagload();
	var flv = 'http://www'+vars.s+'.megavideo.com/files/'+decrypt(vars.un, vars.k1, vars.k2)+'/'+vars.title+'.flv';
	tag.innerHTML = '<a title="Download ('+vars.title+'; '+vars.added+')" class="tag link_tag download_link" href="'+flv+'"><img src="'+icons.download+'" width="16" height="16" /> Download</a>';
}
function size_tag() {
	var tag = tagload();
	var mb = bytes_to_mb(vars.size);
	var mbpm = mb / (vars.seconds / 60);
	tag.innerHTML = '<div class="tag" title="File size"><img src="'+icons.size+'" width="16" height="16" /> '+Math.floor(mb)+'mb <small title="megabytes per minute">('+Math.floor(mbpm)+'mb/m)</small></div>';
}
function time_tag() {
	var tag = tagload();
	var length = seconds_to_hms(vars.seconds);
	tag.innerHTML = '<div class="tag" title="Length"><img src="'+icons.time+'" width="16" height="16" /> '+length+'</div>';
}
function megaupload_tag() {
	var tag = tagload();
	tag.innerHTML = '<a title="Megaupload copy" class="tag link_tag" href="http://megaupload.com/?d='+vars.original_ID+'"><img src="'+icons.megaupload+'" width="16" height="16" /></a>';
}
function load_player() {
	$("playerdiv").innerHTML = '<embed src="http://www.megavideo.com/v/'+vars.embed+'" type="application/x-shockwave-flash" width="800" height="450" allowscriptaccess="never" allowfullscreen="true"></embed>';
}
function change_title() {
	document.title = vars.title+"; "+vars.added + " - " + document.title;
}

(function() {
	var box = document.createElement('div');
	box.id = 'tube_boxes';
	document.body.appendChild(box);
	addStyle();

	getinlinevars(function() {
		load_player();
	});

	getxmlvars(function() {
		download_tag();
		size_tag();
		time_tag();
		change_title();
	});

	checkmegaupload(function() {
		megaupload_tag();
	});
})();

if ("opera" in window) {
function GM_xmlhttpRequest(details) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        var responseState = {
            responseXML:(xmlhttp.readyState==4 ? xmlhttp.responseXML : ''),
            responseText:(xmlhttp.readyState==4 ? xmlhttp.responseText : ''),
            readyState:xmlhttp.readyState,
            responseHeaders:(xmlhttp.readyState==4 ? xmlhttp.getAllResponseHeaders() : ''),
            status:(xmlhttp.readyState==4 ? xmlhttp.status : 0),
            statusText:(xmlhttp.readyState==4 ? xmlhttp.statusText : '')
        }
        if (details["onreadystatechange"]) {
            details["onreadystatechange"](responseState);
        }
        if (xmlhttp.readyState==4) {
            if (details["onload"] && xmlhttp.status>=200 && xmlhttp.status<300) {
                details["onload"](responseState);
            }
            if (details["onerror"] && (xmlhttp.status<200 || xmlhttp.status>=300)) {
                details["onerror"](responseState);
            }
        }
    }
    try {
      //cannot do cross domain
      xmlhttp.open(details.method, details.url);
    } catch(e) {
      if( details["onerror"] ) {
        //simulate a real error
        details["onerror"]({responseXML:'',responseText:'',readyState:4,responseHeaders:'',status:403,statusText:'Forbidden'});
      }
      return;
    }
    if (details.headers) {
        for (var prop in details.headers) {
            xmlhttp.setRequestHeader(prop, details.headers[prop]);
        }
    }
    xmlhttp.send(null);
}
function GM_addStyle(css) {
	var NSURI = 'http://www.w3.org/1999/xhtml';
	var hashead = document.getElementsByTagName('head')[0];
	var parentel = hashead || document.documentElement;
	var newElement = document.createElementNS(NSURI,'link');
	newElement.setAttributeNS(NSURI,'rel','stylesheet');
	newElement.setAttributeNS(NSURI,'type','text/css');
	newElement.setAttributeNS(NSURI,'href','data:text/css,'+encodeURIComponent(css));
	if( hashead ) {
		parentel.appendChild(newElement);
	} else {
		parentel.insertBefore(newElement,parentel.firstChild);
	}
}
}