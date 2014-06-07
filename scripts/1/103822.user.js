// ==UserScript==
// @name           Popup Prompter
// @namespace      http://blog.vienalga.net
// @include        http://*
// @version        0.3.0
// ==/UserScript==

var script  = document.createElement('script');

var code = document.createTextNode(' \n\
		(function(){ \n\
			var _open = window.open; \n\
			window.open = function(a, b, c){ \n\
				var eve = null, \n\
					target, \n\
					allow = false, \n\
					block = false, \n\
					callee = arguments.callee; \n\
				while (callee){ \n\
					if (callee.arguments.length) \n\
						eve = callee.arguments[0]; \n\
					callee = callee.caller; \n\
				} \n\
				window.eve = eve = window.event || eve; \n\
				target = (eve.currentTarget) ? eve.currentTarget : eve.srcElement; \n\
				block = block || \n\
						(!target) && \n\
						((eve.target.tagName == "A") && (eve.target.href == a)) &&\n\
						((target.tagName) && (target.tagName != "BODY")) || false;\n\
				allow = allow || \n\
						(!b && !c) || \n\
						!!document.getElementsByName(b).length; \n\
				try{ allow = allow || !!top.document.getElementsByName(b).length;} \n\
				catch(e_001){} \n\
 				if (!block){ \n\
					if (allow || (confirm("Allow popup to ?\\n" + a))){ \n\
						if (c) return _open(a, b, c); \n\
						if (b) return _open(a, b); \n\
						return _open(a); \n\
					} \n\
				} \n\
				var FakeWindow = {navigator:{}, document:{}, location:{}, name:{}, screen:{}, scrollbars:{}, frames:{}, history:{}, content:{}, menubar:{}, toolbar:{}, locationbar:{}, personalbar:{}, statusbar:{}, closed:{}, status:{}}; \n\
				FakeWindow.window = FakeWindow.parent = FakeWindow.top = FakeWindow.self = FakeWindow; \n\
				return FakeWindow; \n\
			}\n\
		})(); \n\
	');
script.appendChild(code);
script.setAttribute('type', 'text/javascript');
document.getElementsByTagName('head')[0].appendChild(script);