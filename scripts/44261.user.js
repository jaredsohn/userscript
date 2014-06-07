// ==UserScript==
// @name           Watch Mega Video Without Time Restriction
// @namespace      http://zitcoms.com/
// @description    Watch Mega Video - All without time restriction
// @include        http://*megavideo.com/?v=*
// ==/UserScript==

var vars = {};

function decrypt(str, key1, key2) {
    var _loc1 = [];
    for (var _loc3 = 0; _loc3 < str.length; ++_loc3) {
    switch (str.charAt(_loc3)) {
            case "0":{
                _loc1.push("0000");
                break;

            } 

            case "1":{
                _loc1.push("0001");
                break;

            } 

            case "2": {
                _loc1.push("0010");
                break;
            } 
            case "3": {
                _loc1.push("0011");
                break;
            }
            case "4": {
                _loc1.push("0100");
                break;
            }
            case "5": {
		_loc1.push("0101");
                break;
            } 
            case "6":
            {
                _loc1.push("0110");
                break;
            } 
            case "7":
            {
                _loc1.push("0111");
                break;
            } 
            case "8":
            {
                _loc1.push("1000");
                break;
            }
            case "9":
            {
                _loc1.push("1001");
                break;
            } 
            case "a":
            {
                _loc1.push("1010");
                break;
            } 
            case "b":
            {
                _loc1.push("1011");
                break;
            }
            case "c": {
                _loc1.push("1100");
                break;
            }
            case "d": {
                _loc1.push("1101");
                break;
            }
            case "e": {
                _loc1.push("1110");
                break;
            }
            case "f": {
                _loc1.push("1111");
                break;
            } 
        } // End of switch
    } // end of for

    _loc1 = _loc1.join("").split("");
    var _loc6 = [];
    for (var _loc3 = 0; _loc3 < 384; ++_loc3) {
        key1 = (key1 * 11 + 77213) % 81371;
        key2 = (key2 * 17 + 92717) % 192811;
        _loc6[_loc3] = (key1 + key2) % 128;
    } // end of for

    for (var _loc3 = 256; _loc3 >= 0; --_loc3) {
        var _loc5 = _loc6[_loc3];
        var _loc4 = _loc3 % 128;
        var _loc8 = _loc1[_loc5];
        _loc1[_loc5] = _loc1[_loc4];
        _loc1[_loc4] = _loc8;
    } // end of for

    for (var _loc3 = 0; _loc3 < 128; ++_loc3) {
        _loc1[_loc3] = _loc1[_loc3] ^ _loc6[_loc3 + 256] & 1;
    } // end of for

    var _loc12 = _loc1.join("");
    var _loc7 = [];
    for (var _loc3 = 0; _loc3 < _loc12.length; _loc3 = _loc3 + 4) {
        var _loc9 = _loc12.substr(_loc3, 4);
        _loc7.push(_loc9);
    } // end of for

    var _loc2 = [];

    for (var _loc3 = 0; _loc3 < _loc7.length; ++_loc3) {
        switch (_loc7[_loc3]) {
            case "0000": {
                _loc2.push("0");
                break;
            }
            case "0001": {
                _loc2.push("1");
                break;
            }
            case "0010": {
                _loc2.push("2");
                break;
            }
            case "0011": {
                _loc2.push("3");
                break;
            }
            case "0100": {
                _loc2.push("4");
                break;
            }
            case "0101": {
                _loc2.push("5");
                break;
            }
            case "0110": {
		_loc2.push("6");
                break;
            }
            case "0111": {
                _loc2.push("7");
                break;
            }
            case "1000": {
                _loc2.push("8");
                break;
            }
            case "1001": {
                _loc2.push("9");
                break;
            }
            case "1010": {
                _loc2.push("a");
                break;
            }
            case "1011": {
                _loc2.push("b");
                break;
            }
            case "1100": {
                _loc2.push("c");
                break;
            }
            case "1101": {
                _loc2.push("d");
                break;
            }
            case "1110": {
                _loc2.push("e");
                break;
            } 
            case "1111": {
		_loc2.push("f");
		break;
            }
        } // End of switch
    } // end of for
    return (_loc2.join(""));
} // End of the function

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
				    '5%2F3%2Fhvpi4OjajIp4ikVOTLY%2BcXr3Tq%2FQPcssKNXib9yAAAAABJRU5ErkJggg%3D%3D'
}

function addStyle() {
	var styles = [
		'#tube_boxes {position: fixed;bottom: 5px; right: 5px; z-index: 2512;opacity: 0.8;color:#333;font-size:11px;font-family:Verdana;font-weight:bold;}',
		'.tube_box { float: right;margin-left: 5px;text-align: center;}',
		'.tube_box .tag { border:1px solid #B6D9EE;background-color: #DFF1FD;padding:4px;}',
		'.tube_box a { font-size:11px;font-family:Verdana;color:#1F85C1 !important;text-decoration:none;}',
		'.tube_box img { margin:0px;padding:0px;border:none;vertical-align:middle}',
		'.tube_box a.download_link {display: block;}',
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
		vars.ID = str.match(/flashvars\.v = \"(.*)\";\n/)[1];
		vars.s = str.match(/flashvars\.s = \"(.*)\";\n/)[1];
		vars.un = str.match(/flashvars\.un = \"(.*)\";\n/)[1];
		vars.k1 = str.match(/flashvars\.k1 = \"(.*)\";\n/)[1];
		vars.k2 = str.match(/flashvars\.k2 = \"(.*)\";\n/)[1];
		vars.title = urldecode(str.match(/flashvars\.title = \"(.*)\";\n/)[1]);
		vars.added = urldecode(str.match(/flashvars\.added = \"(.*)\";\n/)[1]);
		vars.added = vars.added.replace(/\s,/, ",");
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
			vars.seconds = attr.getAttribute("runtime");
			vars.size = attr.getAttribute("size");

			onload();
		}
	});
	

}
function tagload() {
	var box = document.createElement('div');
	box.className = 'tube_box';
	return $('tube_boxes').appendChild(box);
}

function redirectme (){
	var tag = tagload();
	var urlage = 'http://www.zitcoms.com/megavideo.php?url=' + 'http://www'+vars.s+".megavideo.com/files/"+decrypt(vars.un, vars.k1, vars.k2)+'/';
	window.location = urlage;
}

function download_tag() {
	var tag = tagload();
	var flv = 'http://www'+vars.s+".megavideo.com/files/"+decrypt(vars.un, vars.k1, vars.k2)+'/'+vars.title+'.flv';
	tag.innerHTML = '<a title="Download ('+vars.title+'; '+vars.added+')" class="tag download_link" href="'+flv+'"><img src="'+icons.download+'" width="16" height="16" /> Download</a>';
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
(function() {

	var box = document.createElement('div');
	box.id = 'tube_boxes';
	document.body.appendChild(box);
	addStyle();

	getinlinevars(function() {
		download_tag();
		redirectme();

	});

	getxmlvars(function() {
		size_tag();
		time_tag();
	});
	
})();