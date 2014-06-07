// ==UserScript==
// @name           Hostilities Avoided
// @namespace      http://geekblog.info/wf
// @description    Warns against launching fleets to hostile systems
// @include        http://*.war-facts.com/starlog.php*
// @include        http://*.war-facts.com/extras/view_system.php*
// @include        http://*.war-facts.com/fleet_navigation.php*
// ==/UserScript==
/* Greasemonkey 20080112 workaround */
var instance = window.location.hostname.split('.')[0];

function wrap(f) {
  return function() {
    setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
  };
}
/* End of workaround */

/* Don't need these
function stripTags(s) {
	return s.replace(/<\/?[^>]+>/gi, '');
}

function trim(s) {
	return s.replace(/^\s*|\s*$/,'');
}
*/

window.getSysArray = function(def) {
	var arr = GM_getValue('hSystems_'+instance);
	
	if (arr)
		return unserialize(arr);
	else
		return def;
}

// Starlog parser
if (window.location.href.indexOf('starlog.php') != -1)
{
	unsafeWindow.addHostileSys = wrap(function(id) {
		var sys = [];

		GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://'+window.location.hostname+'/extras/view_system.php?system='+id,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml,text/html'
					},
				onload: function(responseDetails){
					var txt = responseDetails.responseText;
					var match = txt.match(/fleet_navigation\.php.+?x=(\-*\d+)&y=(\-*\d+)&z=(\-*\d+)/);

					if (match && match.length == 4)
					{
						sys['id'] = id;
						sys['x'] = match[1];
						sys['y'] = match[2];
						sys['z'] = match[3];
					}

					if (sys['id'] == id)
					{
						var arr = getSysArray([]);

						arr[id] = sys;
						GM_setValue('hSystems_'+instance,serialize(arr));
					}
				}
			});
	});

	window.sParse = function()
	{
		var hSystems = document.evaluate("//font[@class='warn']/text()[contains(.,'has vanished from our scanners')]/..", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
		for ( var i=0 ; i < hSystems.snapshotLength; i++ ) {
			var box = hSystems.snapshotItem(i);
			var parent = box.parentNode;
			//var raw = trim(stripTags(box.innerHTML));
			//var fName = raw.match(/(.+) has vanished from our scanners/)[1];
			var sID = box.innerHTML.match(/system=(\d+)/);
			
			if (sID && sID.length == 2)
				sID = sID[1];
			else
				continue; // Not a system
	
			var arr = getSysArray([]);
	
			if (typeof arr[sID] == 'object')
			{
				var lBox = document.createElement('p');
				lBox.appendChild(document.createTextNode('-This System Will Be Avoided-'));
				parent.appendChild(lBox);
			}
			else
			{
				var lBox = document.createElement('p');
				var aLink = document.createElement('a');
				aLink.appendChild(document.createTextNode('-Avoid Further Hostilities-'));
				aLink.setAttribute('href','javascript:void(0);');
				aLink.setAttribute('onclick','addHostileSys('+sID+')');
	
				lBox.appendChild(aLink);
				parent.appendChild(lBox);
			}
		}
	}
	
	window.addEventListener("load",sParse,false);

}
// view_system
else if (window.location.href.indexOf('view_system.php') != -1 && window.location.href.indexOf('system=') != -1)
{
	var lBox;
	
	window.psView = function() {
		var sID = window.location.href.match(/system=(\d+)/)[1];
	
		var arr = getSysArray([]);
		
		if (document.body.childNodes[0] == lBox)
			document.body.removeChild(lBox); // Destroy previous box
		
		lBox = document.createElement('p');
		
		if (typeof arr[sID] == 'object')
		{
			lBox.appendChild(document.createTextNode('This System Is Hostile!'));
			lBox.appendChild(document.createElement('br'));
			lBox.setAttribute('style','text-align: center; color: red; font-size: 150%; z-index: 1000;');
			var rSys = document.createElement('a');
			rSys.innerHTML = "Remove From List";
			rSys.setAttribute('style','font-size: 80%;');
			rSys.setAttribute('onclick','remHostileSys('+sID+')');
			rSys.setAttribute('href','javascript:void(0);');
			lBox.appendChild(rSys);
			document.body.insertBefore(lBox,document.body.childNodes[0]);
		}
		else
		{
			lBox.appendChild(document.createTextNode('-Avoid Hostilities-'));
			lBox.appendChild(document.createElement('br'));
			lBox.setAttribute('style','text-align: center; color: red; font-size: 150%; z-index: 1000;');
			var aSys = document.createElement('a');
			aSys.innerHTML = "Add To List";
			aSys.setAttribute('style','font-size: 80%;');
			aSys.setAttribute('onclick','addHostileSys('+sID+')');
			aSys.setAttribute('href','javascript:void(0);');
			lBox.appendChild(aSys);
			document.body.insertBefore(lBox,document.body.childNodes[0]);
		}
	}

	unsafeWindow.addHostileSys = wrap(function(id) {
		var sys = [];
		var match = document.body.innerHTML.replace(/&amp;/g,'&').match(/fleet_navigation\.php.+?x=(\-*\d+)&y=(\-*\d+)&z=(\-*\d+)/);

		if (match && match.length == 4)
		{
			sys['id'] = id;
			sys['x'] = match[1];
			sys['y'] = match[2];
			sys['z'] = match[3];
		}

		if (sys['id'] == id)
		{
			var arr = getSysArray([]);

			arr[id] = sys;
			GM_setValue('hSystems_'+instance,serialize(arr));
			psView();
		}
	});

	unsafeWindow.remHostileSys = wrap(function(id) {
		var arr = getSysArray([]);

		var narr = [];
		for (var i in arr)
			if (i != id)
				narr[i] = arr[i];

		GM_setValue('hSystems_'+instance,serialize(narr));
		psView();
	});
	
	window.addEventListener("load",psView,false);
}
// Fleet Navigation
else if (window.location.href.indexOf('fleet_navigation.php') != -1)
{
	window.ahSystems = function() {
		var f = document.getElementsByName('form2')[0];
		var v = document.getElementsByName('verify')[0];
		var tpos = document.getElementsByName('tpos')[0];
		var x = document.getElementsByName('x')[0], y = document.getElementsByName('y')[0], z = document.getElementsByName('z')[0];
		
		if (f && v && tpos.value == 'global' && x.value != null && y.value != null && z.value != null)
		{
			var arr;
	
			if (!(arr = getSysArray(false)))
				return false; // No hostile systems defined
			
			var h = 0; // Not hostile (yet)
			for (var i in arr)
				if (arr[i]['x'] == x.value && arr[i]['y'] == y.value && arr[i]['z'] == z.value)
				{
					h = 1; // Hostile!
					break;
				}
			
			if (h) // Here we go
			{
				f.addEventListener('submit',function(e){
						e.stopPropagation();
						e.preventDefault(); // Don't submit just yet.
						
						if (confirm("You are about to send this fleet to a hostile system.\n\nAre you sure you want to continue?"))
						{
							//e.target.submit(); // doesn't work, no "verify" field being passed.
							//v.click(); // doesn't work. why?
							v.type='hidden'; // will be passed
							f.submit(); // Exactly the reason an event listener wouldn't
										// work for Quicklaunch. The submit() method doesn't
										// seem to trigger the event.
						}
					},
				false);
			}		
		}
	}
	
	window.addEventListener('load',ahSystems,false);
}

//
// External Scripts not written by me, but needed here.
//======================================================


/* utf.js - UTF-8 <=> UTF-16 convertion
 *
/* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp> & 2006 Ma Bingyao <andot@ujn.edu.cn>
 * Version: 2.0
 * LastModified: Jun 18, 2006
 * This library is free.  You can redistribute it and/or modify it.
 */

/*
 * Interfaces:
 * utf8 = utf16to8(utf16);
 * utf16 = utf16to8(utf8);
 */

function utf16to8(str) {
    var out, i, j, len, c, c2;
    out = [];
    len = str.length;
    for (i = 0, j = 0; i < len; i++, j++) {
        c = str.charCodeAt(i);
        if (c <= 0x7f) {
            out[j] = str.charAt(i);
        }
        else if (c <= 0x7ff) {
            out[j] = String.fromCharCode(0xc0 | (c >>> 6),
                                         0x80 | (c & 0x3f));
        }
        else if (c < 0xd800 || c > 0xdfff) {
            out[j] = String.fromCharCode(0xe0 | (c >>> 12),
                                         0x80 | ((c >>> 6) & 0x3f),
                                         0x80 | (c & 0x3f));
        }
        else {
            if (++i < len) {
                c2 = str.charCodeAt(i);
                if (c <= 0xdbff && 0xdc00 <= c2 && c2 <= 0xdfff) {
                    c = ((c & 0x03ff) << 10 | (c2 & 0x03ff)) + 0x010000;
                    if (0x010000 <= c && c <= 0x10ffff) {
                        out[j] = String.fromCharCode(0xf0 | ((c >>> 18) & 0x3f),
                                                     0x80 | ((c >>> 12) & 0x3f),
                                                     0x80 | ((c >>> 6) & 0x3f),
                                                     0x80 | (c & 0x3f));
                    }
                    else {
                       out[j] = '?';
                    }
                }
                else {
                    i--;
                    out[j] = '?';
                }
            }
            else {
                i--;
                out[j] = '?';
            }
        }
    }
    return out.join('');
}

function utf8to16(str) {
    var out, i, j, len, c, c2, c3, c4, s;

    out = [];
    len = str.length;
    i = j = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
            // 0xxx xxxx
            out[j++] = str.charAt(i - 1);
            break;
            case 12: case 13:
            // 110x xxxx   10xx xxxx
            c2 = str.charCodeAt(i++);
            out[j++] = String.fromCharCode(((c  & 0x1f) << 6) |
                                            (c2 & 0x3f));
            break;
            case 14:
            // 1110 xxxx  10xx xxxx  10xx xxxx
            c2 = str.charCodeAt(i++);
            c3 = str.charCodeAt(i++);
            out[j++] = String.fromCharCode(((c  & 0x0f) << 12) |
                                           ((c2 & 0x3f) <<  6) |
                                            (c3 & 0x3f));
            break;
            case 15:
            switch (c & 0xf) {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                // 1111 0xxx  10xx xxxx  10xx xxxx  10xx xxxx
                c2 = str.charCodeAt(i++);
                c3 = str.charCodeAt(i++);
                c4 = str.charCodeAt(i++);
                s = ((c  & 0x07) << 18) |
                    ((c2 & 0x3f) << 12) |
                    ((c3 & 0x3f) <<  6) |
                     (c4 & 0x3f) - 0x10000;
                if (0 <= s && s <= 0xfffff) {
                    out[j] = String.fromCharCode(((s >>> 10) & 0x03ff) | 0xd800,
                                                  (s         & 0x03ff) | 0xdc00);
                }
                else {
                    out[j] = '?';
                }
                break;
                case 8: case 9: case 10: case 11:
                // 1111 10xx  10xx xxxx  10xx xxxx  10xx xxxx  10xx xxxx
                i+=4;
                out[j] = '?';
                break;
                case 12: case 13:
                // 1111 110x  10xx xxxx  10xx xxxx  10xx xxxx  10xx xxxx  10xx xxxx
                i+=5;
                out[j] = '?';
                break;
            }
        }
        j++;
    }
    return out.join('');
}

/* phpserializer.js - JavaScript to PHP serialize / unserialize class.
 *
 * This class is designed to convert php variables to javascript
 * and javascript variables to php with a php serialize unserialize
 * compatible way.
 *
 * Copyright (C) 2006 Ma Bingyao <andot@ujn.edu.cn>
 * Version: 3.0f
 * LastModified: Nov 30, 2006
 * This library is free.  You can redistribute it and/or modify it.
 * http://www.coolcode.cn/?p=171
 */

function serialize(o) {
    var p = 0, sb = [], ht = [], hv = 1;
    var classname = function(o) {
        if (typeof(o) == "undefined" || typeof(o.constructor) == "undefined") return '';
        var c = o.constructor.toString();
        c = utf16to8(c.substr(0, c.indexOf('(')).replace(/(^\s*function\s*)|(\s*$)/ig, ''));
        return ((c == '') ? 'Object' : c);
    };
    var is_int = function(n) {
        var s = n.toString(), l = s.length;
        if (l > 11) return false;
        for (var i = (s.charAt(0) == '-') ? 1 : 0; i < l; i++) {
            switch (s.charAt(i)) {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9': break;
                default : return false;
            }
        }
        return !(n < -2147483648 || n > 2147483647);
    };
    var in_ht = function(o) {
        for (k in ht) if (ht[k] === o) return k;
        return false;
    };
    var ser_null = function() {
        sb[p++] = 'N;';
    };
    var ser_boolean = function(b) {
        sb[p++] = (b ? 'b:1;' : 'b:0;');
    };
    var ser_integer = function(i) {
        sb[p++] = 'i:' + i + ';';
    };
    var ser_double = function(d) {
        if (isNaN(d)) d = 'NAN';
        else if (d == Number.POSITIVE_INFINITY) d = 'INF';
        else if (d == Number.NEGATIVE_INFINITY) d = '-INF';
        sb[p++] = 'd:' + d + ';';
    };
    var ser_string = function(s) {
        var utf8 = utf16to8(s);
        sb[p++] = 's:' + utf8.length + ':"';
        sb[p++] = utf8;
        sb[p++] = '";';
    };
    var ser_array = function(a) {
        sb[p++] = 'a:';
        var lp = p;
        sb[p++] = 0;
        sb[p++] = ':{';
        for (var k in a) {
            if (typeof(a[k]) != 'function') {
                is_int(k) ? ser_integer(k) : ser_string(k);
                __serialize(a[k]);
                sb[lp]++;
            }
        }
        sb[p++] = '}';
    };
    var ser_object = function(o) {
        var cn = classname(o);
        if (cn == '') ser_null();
        else if (typeof(o.serialize) != 'function') {
            sb[p++] = 'O:' + cn.length + ':"';
            sb[p++] = cn;
            sb[p++] = '":';
            var lp = p;
            sb[p++] = 0;
            sb[p++] = ':{';
            if (typeof(o.__sleep) == 'function') {
                var a = o.__sleep();
                for (var kk in a) {
                    ser_string(a[kk]);
                    __serialize(o[a[kk]]);
                    sb[lp]++;
                }
            }
            else {
                for (var k in o) {
                    if (typeof(o[k]) != 'function') {
                        ser_string(k);
                        __serialize(o[k]);
                        sb[lp]++;
                    }
                }
            }
            sb[p++] = '}';
        }
        else {
            var cs = o.serialize();
            sb[p++] = 'C:' + cn.length + ':"';
            sb[p++] = cn;
            sb[p++] = '":' + cs.length + ':{';
            sb[p++] = cs;
            sb[p++] = "}";
        }
    };
    var ser_pointref = function(R) {
        sb[p++] = "R:" + R + ";";
    };
    var ser_ref = function(r) {
        sb[p++] = "r:" + r + ";";
    };
    var __serialize = function(o) {
        if (o == null || o.constructor == Function) {
            hv++;
            ser_null();
        }
        else switch (o.constructor) {
            case Boolean: {
                hv++;
                ser_boolean(o);
                break;
            }
            case Number: {
                hv++;
                is_int(o) ? ser_integer(o) : ser_double(o);
                break;
            }
            case String: {
                hv++;
                ser_string(o);
                break;
            }
/*@cc_on @*/
/*@if (@_jscript)
            case VBArray: {
                o = o.toArray();
            }
@end @*/
            case Array: {
                var r = in_ht(o);
                if (r) {
                    ser_pointref(r);
                }
                else {
                    ht[hv++] = o;
                    ser_array(o);
                }
                break;
            }
            default: {
                var r = in_ht(o);
                if (r) {
                    hv++;
                    ser_ref(r);
                }
                else {
                    ht[hv++] = o;
                    ser_object(o);
                }
                break;
            }
        }
    };
    __serialize(o);
    return sb.join('');
}

function unserialize(ss) {
    var p = 0, ht = [], hv = 1; r = null;
    var unser_null = function() {
        p++;
        return null;
    };
    var unser_boolean = function() {
        p++;
        var b = (ss.charAt(p++) == '1');
        p++;
        return b;
    };
    var unser_integer = function() {
        p++;
        var i = parseInt(ss.substring(p, p = ss.indexOf(';', p)));
        p++;
        return i;
    };
    var unser_double = function() {
        p++;
        var d = ss.substring(p, p = ss.indexOf(';', p));
        switch (d) {
            case 'NAN': d = NaN; break;
            case 'INF': d = Number.POSITIVE_INFINITY; break;
            case '-INF': d = Number.NEGATIVE_INFINITY; break;
            default: d = parseFloat(d);
        }
        p++;
        return d;
    };
    var unser_string = function() {
        p++;
        var l = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
        p += 2;
        var s = utf8to16(ss.substring(p, p += l));
        p += 2;
        return s;
    };
    var unser_array = function() {
        p++;
        var n = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
        p += 2;
        var a = [];
        ht[hv++] = a;
        for (var i = 0; i < n; i++) {
            var k;
            switch (ss.charAt(p++)) {
                case 'i': k = unser_integer(); break;
                case 's': k = unser_string(); break;
                case 'U': k = unser_unicode_string(); break;
                default: return false;
            }
            a[k] = __unserialize();
        }
        p++;
        return a;
    };
    var unser_object = function() {
        p++;
        var l = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
        p += 2;
        var cn = utf8to16(ss.substring(p, p += l));
        p += 2;
        var n = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
        p += 2;
        if (eval(['typeof(', cn, ') == "undefined"'].join(''))) {
            eval(['function ', cn, '(){}'].join(''));
        }
        var o = eval(['new ', cn, '()'].join(''));
        ht[hv++] = o;
        for (var i = 0; i < n; i++) {
            var k;
            switch (ss.charAt(p++)) {
                case 's': k = unser_string(); break;
                case 'U': k = unser_unicode_string(); break;
                default: return false;
            }
            if (k.charAt(0) == '\0') {
                k = k.substring(k.indexOf('\0', 1) + 1, k.length);
            }
            o[k] = __unserialize();
        }
        p++;
        if (typeof(o.__wakeup) == 'function') o.__wakeup();
        return o;
    };
    var unser_custom_object = function() {
        p++;
        var l = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
        p += 2;
        var cn = utf8to16(ss.substring(p, p += l));
        p += 2;
        var n = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
        p += 2;
        if (eval(['typeof(', cn, ') == "undefined"'].join(''))) {
            eval(['function ', cn, '(){}'].join(''));
        }
        var o = eval(['new ', cn, '()'].join(''));
        ht[hv++] = o;
        if (typeof(o.unserialize) != 'function') p += n;
        else o.unserialize(ss.substring(p, p += n));
        p++;
        return o;
    };
    var unser_unicode_string = function() {
        p++;
        var l = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
        p += 2;
        var sb = [];
        for (var i = 0; i < l; i++) {
            if ((sb[i] = ss.charAt(p++)) == '\\') {
                sb[i] = String.fromCharCode(parseInt(ss.substring(p, p += 4), 16));
            }
        }
        p += 2;
        return sb.join('');
    };
    var unser_ref = function() {
        p++;
        var r = parseInt(ss.substring(p, p = ss.indexOf(';', p)));
        p++;
        return ht[r];
    };
    var __unserialize = function() {
        switch (ss.charAt(p++)) {
            case 'N': return ht[hv++] = unser_null();
            case 'b': return ht[hv++] = unser_boolean();
            case 'i': return ht[hv++] = unser_integer();
            case 'd': return ht[hv++] = unser_double();
            case 's': return ht[hv++] = unser_string();
            case 'U': return ht[hv++] = unser_unicode_string();
            case 'r': return ht[hv++] = unser_ref();
            case 'a': return unser_array();
            case 'O': return unser_object();
            case 'C': return unser_custom_object();
            case 'R': return unser_ref();
            default: return false;
        }
    };
    return __unserialize();
}
