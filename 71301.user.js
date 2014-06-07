/* vim:foldmethod=marker:
Warring Factions Scout Helper
Copyright (C) 2006 Gordon Tran

v3	coordinate generator mark II - the jump calculator
v2	oh wow it's only v2
	new >>>
	coordinate generator mark I

*/
// ==UserScript==
// @name           WF Scout Helper
// @namespace      http://unidomcorp.com
// @description    Adds a Next planet button. v3 -modified by Carabas-
// @include        http://*.war-facts.com/fleet_navigation*
// ==/UserScript==

/* json.js {{{1 */

/*
Copyright (c) 2005 JSON.org
Copyright (c) 2005 tonyg@kcbbs.gen.nz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The Software shall be used for Good, not Evil.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


CHANGELOG
=========

 - November 2006: changed by Carabas to use the quicklaunch script to
   autolaunch the fleet when the next button is pressed.
 
 - September 2005: changes by tonyg@kcbbs.gen.nz for constructors and
   customisable serialisation

*/

Array.prototype.______array = '______array';

var WF_JSON = {
    org: 'http://www.JSON.org',
    copyright: '(c)2005 JSON.org',
    license: 'http://www.crockford.com/JSON/license.html',

    stringify: function (arg) {
        var c, i, l, s = '', v;

        switch (typeof arg) {
        case 'object':
            if (arg) {
                if (arg.______array == '______array') {
                    for (i = 0; i < arg.length; ++i) {
                        v = this.stringify(arg[i]);
                        if (s) {
                            s += ',';
                        }
                        s += v;
                    }
                    return '[' + s + ']';
		} else if (typeof arg.toJsonString != 'undefined') {
		    return arg.toJsonString();
                } else if (typeof arg.toString != 'undefined') {
                    for (i in arg) {
                        v = arg[i];
                        if (typeof v != 'undefined' && typeof v != 'function') {
                            v = this.stringify(v);
                            if (s) {
                                s += ',';
                            }
                            s += this.stringify(i) + ':' + v;
                        }
                    }
                    return '{' + s + '}';
                }
            }
            return 'null';
        case 'number':
            return isFinite(arg) ? String(arg) : 'null';
        case 'string':
            l = arg.length;
            s = '"';
            for (i = 0; i < l; i += 1) {
                c = arg.charAt(i);
                if (c >= ' ') {
                    if (c == '\\' || c == '"') {
                        s += '\\';
                    }
                    s += c;
                } else {
                    switch (c) {
                        case '\b':
                            s += '\\b';
                            break;
                        case '\f':
                            s += '\\f';
                            break;
                        case '\n':
                            s += '\\n';
                            break;
                        case '\r':
                            s += '\\r';
                            break;
                        case '\t':
                            s += '\\t';
                            break;
                        default:
                            c = c.charCodeAt();
                            s += '\\u00' + Math.floor(c / 16).toString(16) +
                                (c % 16).toString(16);
                    }
                }
            }
            return s + '"';
        case 'boolean':
            return String(arg);
        default:
            return 'null';
        }
    },
    parse: function (text, ctors) {
        var at = 0;
        var ch = ' ';

        function error(m) {
            throw {
                name: 'JSONError',
                message: m,
                at: at - 1,
                text: text
            };
        }

        function next() {
            ch = text.charAt(at);
            at += 1;
            return ch;
        }

        function white() {
            while (ch != '' && ch <= ' ') {
                next();
            }
        }

        function str() {
            var i, s = '', t, u;

            if (ch == '"') {
outer:          while (next()) {
                    if (ch == '"') {
                        next();
                        return s;
                    } else if (ch == '\\') {
                        switch (next()) {
                        case 'b':
                            s += '\b';
                            break;
                        case 'f':
                            s += '\f';
                            break;
                        case 'n':
                            s += '\n';
                            break;
                        case 'r':
                            s += '\r';
                            break;
                        case 't':
                            s += '\t';
                            break;
                        case 'u':
                            u = 0;
                            for (i = 0; i < 4; i += 1) {
                                t = parseInt(next(), 16);
                                if (!isFinite(t)) {
                                    break outer;
                                }
                                u = u * 16 + t;
                            }
                            s += String.fromCharCode(u);
                            break;
                        default:
                            s += ch;
                        }
                    } else {
                        s += ch;
                    }
                }
            }
            error("Bad string");
        }

        function arr() {
            var a = [];

            if (ch == '[') {
                next();
                white();
                if (ch == ']') {
                    next();
                    return a;
                }
                while (ch) {
                    a.push(val());
                    white();
                    if (ch == ']') {
                        next();
                        return a;
                    } else if (ch != ',') {
                        break;
                    }
                    next();
                    white();
                }
            }
            error("Bad array");
        }

        function obj() {
            var k, o = {};

            if (ch == '{') {
                next();
                white();
                if (ch == '}') {
                    next();
                    return o;
                }
                while (ch) {
                    k = str();
                    white();
                    if (ch != ':') {
                        break;
                    }
                    next();
                    o[k] = val();
                    white();
                    if (ch == '}') {
                        next();
                        return o;
                    } else if (ch != ',') {
                        break;
                    }
                    next();
                    white();
                }
            }
            error("Bad object");
        }

        function num() {
            var n = '', v;
            if (ch == '-') {
                n = '-';
                next();
            }
            while (ch >= '0' && ch <= '9') {
                n += ch;
                next();
            }
            if (ch == '.') {
                n += '.';
                while (next() && ch >= '0' && ch <= '9') {
                    n += ch;
                }
            }
            if (ch == 'e' || ch == 'E') {
                n += 'e';
                next();
                if (ch == '-' || ch == '+') {
                    n += ch;
                    next();
                }
                while (ch >= '0' && ch <= '9') {
                    n += ch;
                    next();
                }
            }
            v = +n;
            if (!isFinite(v)) {
                error("Bad number");
            } else {
                return v;
            }
        }

        function word() {
            switch (ch) {
                case 't':
                    if (next() == 'r' && next() == 'u' && next() == 'e') {
                        next();
                        return true;
                    }
                    break;
                case 'f':
                    if (next() == 'a' && next() == 'l' && next() == 's' &&
                            next() == 'e') {
                        next();
                        return false;
                    }
                    break;
                case 'n':
                    if (next() == 'u' && next() == 'l' && next() == 'l') {
                        next();
                        return null;
                    }
                    break;
            }
            error("Syntax error");
        }

	function ctor() {
	    var name = '';
	    if (ch == '@') {
		next();
		while (ch == '.' || (ch.toUpperCase() >= 'A' &&
				     ch.toUpperCase() <= 'Z')) {
		    name += ch;
		    next();
		}
		var arg = val();
		if (name in ctors) {
		    return ctors[name](arg);
		} else {
		    error("Unknown ctor " + name);
		}
	    }
	    error("Bad ctor");
	}

        function val() {
            white();
            switch (ch) {
	        case '@':
		    return ctor();
                case '{':
                    return obj();
                case '[':
                    return arr();
                case '"':
                    return str();
                case '-':
                    return num();
                default:
                    return ch >= '0' && ch <= '9' ? num() : word();
            }
        }

        return val();
    }
};

/***/

window.GM_wfscout_onNavLoad = function(e) { // {{{1
	// Next button {{{2
	var isExplorer = document.evaluate("//text()[contains(.,'Classification: Explorer') or contains(.,'Classification: Sentry') or contains(.,'Classification: Probe Rush')]", document, null, XPathResult.BOOLEAN_TYPE, null).booleanValue;
	//GM_log(isExplorer);

	var formIter = document.evaluate("//form[@name='form2']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var formNode = formIter.iterateNext();

	var localLocs, llSelect, locIndex;
	if (formNode)
	{
		localLocs = document.evaluate("//select[@name='tworld2']", formNode, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

		llSelect = localLocs.iterateNext();
	} else {
		formNode = document; // suppress error messages due to bad code structuring
	}
	locIndex = 1;

	if(llSelect) {
		var curPos = document.evaluate("//td[(child::text() = 'Fleet Position:')]/following-sibling::node()[position()=2]/child::node()", formNode, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

		while( cNode = curPos.iterateNext() )
		{
			if(cNode.textContent.match(/^\s+$/)) continue;

			for(i = 0; i < llSelect.options.length; i++) {
				if(cNode.textContent.indexOf(llSelect.options[i].text)==0) {
					locIndex = i;
					break;
				}
			}
			break;
		}
	}

	// back 2 pages for open->set dest->launch. doesn't work so well for open->about->set dest->launch though
	var inTransit = document.evaluate("//b[text()='In Transit']", formNode, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var bNode = inTransit.iterateNext();
	if (bNode) {
		bNode.setAttribute("onclick","history.go(-2);");
		bNode.style.cursor = 'pointer';
	}

	var curCoord = document.evaluate("//td[(child::text() = 'Fleet Coordinates:')]/following-sibling::node()/a[contains(text(),'global')]", formNode, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var cNode = curCoord.iterateNext();
	var newHref;
	if (cNode) {
		//GM_log("coord '"+cNode.href+"' "+cNode.textContent+" name:"+cNode.nodeName+" value:"+cNode.nodeValue);
		var z = Number(cNode.href.match("z=(-?[0-9]+)")[1]);

		/* Extra z-offset */
		newHref = cNode.href.replace(z, z + 6000);
		//GM_log(newHref);

		var ws1 = document.createTextNode(" ");

		var newA = document.createElement("a");
		newA.setAttribute("href", newHref);
		var aText = document.createTextNode("^^^");
		newA.appendChild(aText);

		var parent = cNode.parentNode;
		var after = cNode.nextSibling;

		parent.insertBefore(ws1, after);
		parent.insertBefore(newA, after);
	}

	if(llSelect && isExplorer) {
		//if (locIndex) llSelect.selectedIndex = locIndex;
		var nextBtn = document.createElement("input");
		nextBtn.setAttribute("type","button");
		if(locIndex < llSelect.options.length - 1) {
			nextBtn.setAttribute("value","[N]ext");
			nextBtn.setAttribute("accesskey","n");
			nextBtn.setAttribute("id","scoutnext");
			//Edit
			//nextBtn.setAttribute("onclick","this.previousSibling.selectedIndex = "+(locIndex+1)+"; this.form.submit();");
			nextBtn.setAttribute("onclick","this.previousSibling.selectedIndex = "+(locIndex+1)+"; GM_WF_QuickLaunch_qlworld();");
		} else {
			nextBtn.setAttribute("value","Done");
			nextBtn.setAttribute("class","warn");
			nextBtn.setAttribute("id","scoutdone");
			nextBtn.setAttribute("onclick",newHref.replace("^javascript:",""));
		}
		llSelect.parentNode.appendChild(nextBtn);
	}
	// }}}2
}

if(window.location.href.indexOf('/fleet_navigation') != -1) {
	window.addEventListener("load", window.GM_wfscout_onNavLoad, false);
}