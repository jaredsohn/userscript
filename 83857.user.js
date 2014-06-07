// ==UserScript==
// @name           Bezpośredni link flv do megavideo.com
// @namespace      http://lukajfilm.pl
// @description    Pobieranie z megavideo.com / megaupload.com bez limitu.
// @include        http://*megavideo.com/?d=*
// @include        http://*megavideo.com/?v=*
// ==/UserScript==

function decrypt(str, key1, key2) {
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
	download: 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ'+
    'bWFnZVJlYWR5ccllPAAAAZ1JREFUeNqkk79Lw1AQxy8vL5IORZ3sFMRSXV3qopC/w8FBuuji4KTg'+
    '4ODgVEUcRBAHcXF2cyrqKJ2Eou0kpQ6ihdZaXpOcd69pTVHbioHLy4/7ft737hIDEeE/h8zIfVqM'+
    'FTola1tvj8OI4jvjKVpKAHgk2/tjauMssz69GIdBfgyKh5ka7C6dZLUDhIBXoZQCj8rxfb8vwDRN'+
    '4FzSiRCg9xRBEIAicavV6guwKDiXdCLqwPQ8TwOaAwAoBHAu6UwNCFBbNtm6IvIggLAsXSbpQkDo'+
    'gB++VxSMTNh9AZyjAR0H0RKKF09DzT4Wi0VKgK8S8vk8/PZhGYbRvXZdl7btLUGyAx7R/Fry2yQs'+
    'qvv2oASO40C5XNZNJJ2MOpDsQEoJ9XoTctl7LZxbnepa5nd82LYd9sBvA3zw9CaCxsNJjYaCRCKh'+
    'k/lajw7NHgB/B6Sz9FSu8RyesXi4t3l89VJ5rSqFOpkDsR2dZ1GAwo84a7kzDsVYEtLpSZjN5OTp'+
    'zU9NdL3lheh9FSqFO7jcZsAog3kSf/yTuXnNTwEGALoB2iqYNNZoAAAAAElFTkSuQmCC',

	time: 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ'+
    'bWFnZVJlYWR5ccllPAAAAutJREFUeNqUkstPE1EUxr/OTFumtIUig6Ao0LSUQEUEIkZAEgILRUPC'+
    'ooREo38Cblz42Bh15RrZsBEICTGE0JAYgxCCCwFDKK8ULFCgUkAeAaaPaWnHewchaNz4Jd887jm/'+
    'c+6cO6reJwx4jSqDY1EHIBvH8h7F0G9/Ha+kLzPPmJF/xUMR2c9JUWSq1InPr5Y7KtIvF5olKYyB'+
    '/p4DteRtiGNzn2ZLrPBI1GYX19Q1GLXaBGysTi25hrtLpaj4ijsIyg/zb9XXJgk286p3BaOjYzhX'+
    '2Mhb7JW3NY8tSru8nx54ZkbQ19uDsrLrEM7bCsyl9fzXjx1rXDCCEplhMqddY5if9yKp+g2sdjuS'+
    'dTpMT07iSlERTGlWWG9chKi3Y3jwKWy2bCSbdJmUZch38LHwrsrlcitwrtUKI88rnSfGx3EiukZj'+
    'NIfmUoayTCSKucGhKUkocsBsNkOn0YBRqRQoHA6fFqBrNGaxWCBcc4AylOVkGS2HOytVWfk3S2ji'+
    'QSikmMrtdmNlext/K7ewCm7ni3nSpoWzzqkWc+ewxb68EIsBLE3ISk1VEg8PD0+fqY7icfzY3UWi'+
    'MTN294NqayEfi5x5jgSAiJphEDsD36mpQXV1NR40NsJgMCjW6/UoLi9HeVmZwlCWix4X9yeurQWQ'+
    'k2M86dbV3Y37TU3o6Oo63YFMvB+JgPX5AoTzK7OhBYi/RZ3OTY5llW1SJaWkKDC9n1ifnAwtOY1w'+
    'X9+mwtACETptoH+rvX0hwecTY78LnBQ5qziJJW1siL62tgXKUJaNHW9NNIRCe/tDQ3nptbUpWkHQ'+
    'yLL8B8ySGcnLy4FJh2M6sL7+dhaY/ETXZ8jlM/GQIFzeFkWrsbNzB6LIGjIy1LzJxJFzliMeT3Cl'+
    'tdU/0dzseh8IbL4zGkedweAyZekfoyU28zx/j2xxyyJJazVAhRUoUAMZOJ6R/zswOwB88Wi1lxiG'+
    'SQuFQk4SWqIFOGITsRr/JzrDvV8CDACGRzzydYP8EgAAAABJRU5ErkJggg==',

	size: 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ'+
    'bWFnZVJlYWR5ccllPAAAAZ5JREFUeNqkU0FLAkEUfrM7RopL2KkoFTLEPHSJbkWWEB68eevSoX6L'+
    'PyE6dOnSzXNEh6RDP6BLYLidEkJiIcVd15md5s226yoIiQ8eb97M97335s08IoSARYQ2L2LKEoBL'+
    'aXPBQdNkx1FgaYs+Rdy2THsjLaN/BWSNjfxhrnR+FlT03mhMZNqt1fbQEkKg3by9+/lsPWIgjXsA'+
    'noBtYy2XjRKSyWSo8Xh8IhhikYNc6uGOgPzSambTtu0xyDDCteu64DhO6COWS45cPlDuqZIL2f2D'+
    'NNH0ELQTCWZZFqwXi6EvPJ5+u78uqOZxVQLoI9vR3MEgBJmmGa4xe7/bHVeQSODVdT+A3zOdMwao'+
    'UcHMqVQKer3exJnCCj+AxmQFUikbjSCqSD6pVJQ9rVZh+lxxsInMvwJlwyFweRDIUbms/MBGBbEY'+
    'wCf6TdTV5hRwluBfkDy/B4yrvZiLFUz1YJbgZ5M89YW1+rOA/lAYTL61x/m/FLHIQS5tfYvM6xfp'+
    '9K7qL/MM0YcFHeTKGYIVqcvYhzkHES/vkEXH+VeAAQCrMgDZ0iDJ1wAAAABJRU5ErkJggg==',
	
	site: 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ'+
    'bWFnZVJlYWR5ccllPAAAAxRJREFUeNqEUktvE1cU/u48bI/HjhPjZPxMnEBQQotQ0gRTKeoqZcMC'+
    '1qz4CSyQqm4ilQ0LNv0JXbFH4iGqqqrUQpBBigCLJsrDTu3EcewMtsce25N59IxHXnNGn3Tu3PN9'+
    '53EP4x5sArwAFhoHBF+A/DUwdhPAHCFCaBEO4Di/wzL/gWn0nU4T5MN6fAMCRubYWbr8eWWSXb+z'+
    'EEzPTPjCIQG+VDxobNcN7bd888c/9408xT2i6NKIJozIIUv/9d7Khetrl8KJ2VQYO+Uual0bsYHp'+
    'X56W/MsZKfbyo6r88uw/RXPs+yMRDpoqodPauLc0lkuOi4nIuDT8TaKIyjwsB9B0C5oJ3FiMJn5a'+
    'V3Ju/JDnRjrd1g8L43auObDixS99VNsmXrw/xnatC8NhMAU/nr0uYafSxUkHuJydjF+UzZzL81ro'+
    'tm6tXFxI1roWrJ6Nar6CgJ+a5zk0tAa0t0W0tR4m0tP491jFiaphdSGe3Ns7vEX8V4Kjty9fiCfl'+
    'cqkB1RhAkvzg+yZ4xmAPDMzFFSzOK9g/7eNj4RBt00IyzMsuz6vA6E9s5guCPLMIvVnBwAKY+zEa'+
    'g2VB3z9BqdzCVGYaxaM6JhMpdDqdIc8TcJwmL0fMg0pZ5EUBls3cEQ6NgYdmGLQeY2j36XwOJLLf'+
    'wKefmi7PE+DF3ebZWU6MJiMcxyDwBMru+q7ZPD+splbcQ+bKNZj0Kv12R3d5noAYeF49rt+cTV6K'+
    '0B0CAkdgEHnK6M7BdnBOfducjVRGGYq+KXw4dXmegE/6S9X0/NSZOpFMZWIhPwfZx+AnESpmuAcD'+
    'SvvFsBGnbf9c2G1UqvW8y/MEpFAPjNvYK5amglJwKT2bjoUDXhUjgb5btxzE8WGx8febD1sIyBu0'+
    'aD1vTq4pV4Clu3NIXH2YnoytfjefVVLRUFD2i0J3cG4eqR39/fZB7UhV36H6aQNbTw5Q+0xzdIYC'+
    '1C2ihBjCSgTf3r6K+fXvERjLUGVjlKlNUytj949NFJ5+glZrU2ydoJKAxbzFh7vXQYKIrxs9JnRC'+
    'jwTs/wUYADZ5Xi+uKd+ZAAAAAElFTkSuQmCC',

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
		if (str.match(/\svar flashvars/)) {
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
			if (str.match(/captchaform/))
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
	tag.innerHTML = '<a title="Pobierz ('+vars.title+'; '+vars.added+')" class="tag link_tag download_link" href="'+flv+'"><img src="'+icons.download+'" width="16" height="16" /> Pobierz</a>';
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
function site() {
	var tag = tagload();
	var length = seconds_to_hms(vars.seconds);
	tag.innerHTML = '<a title="Filmy online bez limitu" class="tag link_tag download_link" href="http://www.lukajfilm.pl"><img src="'+icons.site+'" width="16" height="16" /> LukajFilm.pl</a>';
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
		site();
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