// ==UserScript==
// @name           IR to PDF
// @namespace      blog.vienalga.net
// @description    IR to PDF
// @include        http://www.ir.lv/zurnals/*
// ==/UserScript==


var s = document.createElement('script');
s.setAttribute('type', 'text/javascript');
s.appendChild(document.createTextNode('\n\
	$(function(){ \n\
		var x = 0, im = [];\n\
		$("img.th[num]").each(function(e1, e2){\n\
			var s = e1.src || e2.src || "";\n\
			im.push(s.replace(/th(-[0-9]+\\.jpg)/,"full$1"));\n\
		}); \n\
		if (im.length == 0) \n\
			return 0; \n\
		$("head").html("");\n\
		$("body").html("");\n\
		\n\
		var rnd = function(x1, x2){ \n\
			var x2 = x2 || 0; \n\
			var x1 = x1 || 0; \n\
			if (x1 < x2){ \n\
				return Math.random() * (x2 - x1) + x1; \n\
			} \n\
			else{ \n\
				return Math.random() * (x1 - x2) + x2; \n\
			} \n\
		}; \n\
		\n\
		var print = function(){ \n\
			$("<img />", {\n\
			    src: im[x],\n\
			    style: "max-height:100%; max-width:100%; border:0 solid; page-break-after:always;"\n\
			}).appendTo("body");\n\
			x++; \n\
			if (x < im.length){ \n\
				setTimeout(print, rnd(10000, 30000)); \n\
			} \n\
			else { \n\
				alert("Done!\\nTry to Print"); \n\
			} \n\
		}; \n\
		\n\
		print(); \n\
	}); \n\
'));
document.getElementsByTagName('head')[0].appendChild(s);
