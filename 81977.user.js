// ==UserScript==
// @name           TeX to Image
// @namespace      http://math.stackexchange.com/
// @description    Turns TeX markup surrounded by '$' into images via the Google Chart API, or any other service.
// @include        http://math.stackexchange.com/*
// @include        http://meta.math.stackexchange.com/*
// @include        http://stats.stackexchange.com/*
// @include        http://meta.stats.stackexchange.com/*
// @include        http://tex.stackexchange.com/*
// @include        http://meta.tex.stackexchange.com/*
// @exclude        http://*.stackexchange.com/*/edit
// @author         John Gietzen
// @contributor    Isaac
// ==/UserScript==

if (typeof GM_deleteValue == 'undefined') {
	GM_deleteValue = function(name) {
		localStorage.removeItem(name);
	}

	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (!value)
			return defaultValue;
		var type = value[0];
		value = value.substring(1);
		switch (type) {
			case 'b':
				return value == 'true';
			case 'n':
				return Number(value);
			default:
				return value;
		}
	}

	GM_log = function(message) {
		console.log(message);
	}

	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	}
}

var window = unsafeWindow;
var document = window.document;

var baseUrls = [
	{ name : "Google Charts", url : "http://chart.apis.google.com/chart?cht=tx&chf=bg,s,FFFFFF00&chl=" },
	{ name : "72Pines", url : "http://tex.72pines.com/latex.php?latex=" },
	{ name : "Mathtran.org", url : "http://www.mathtran.org/cgi-bin/mathtran?D=1;tex=" },
	{ name : "CodeCogs.com", url : "http://latex.codecogs.com/gif.latex?" },
	{ name : "MimeTeX", url : "http://www.forkosh.dreamhost.com/mimetex.cgi?" },
	{ name : "MathTeX", url : "http://www.forkosh.dreamhost.com/cgi-bin/mathtex.cgi?" },
	{ name : "Sitmo Equation Editor", url : "http://www.sitmo.com/gg/latex/latex2png.2.php?z=100&eq=" }
  ];

var baseUrl = GM_getValue('baseUrl', baseUrls[0].url);

for (var i = 0; i < baseUrls.length; i++) {
    var url = baseUrls[i];
    var selected = url.url == baseUrl;
    
    GM_registerMenuCommand((selected ? "[\u2713]  " : "[   ]  ") + "Use " + url.name, createMenuCommand(url.url));
}

function createMenuCommand(url) {
    return function () {
		GM_setValue('baseUrl', url);
		window.location.href = window.location.href;
	}
}

function goGoGadgetMath() {

    var nodes = getTextNodes();
    
    var splitRegex = /(\$[^$]+\$)/g;
    var extractRegex = /^\$([^$]+)\$$/g;

    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (splitRegex.test(node.data)) {
            var parent = node.parentNode;
            
            var sections = node.data.split(splitRegex);
            
            for (var s = 0; s < sections.length; s++) {
                var newNode = null;
                
                if (!splitRegex.test(sections[s])) {
                    newNode = document.createTextNode(sections[s]);
                } else {
                    var TeX = sections[s].replace(extractRegex, '$1');
                    
                    var img = document.createElement('img');
                    img.setAttribute("src", baseUrl + encodeURIComponent(TeX));
                    img.setAttribute("alt", "$" + TeX + "$");
                    
                    newNode = img;
                }
                
                parent.insertBefore(newNode, node);
            }
            
            parent.removeChild(node);
        }
    }
}

function getTextNodes(node) {
    var currentNode = (node || document.body);
    
    var ret = [];
    
    var children = currentNode.childNodes;
    for (var i = 0; i < children.length; i++)
    {
        var child = children[i];
        
        if (child.nodeType == 3) {
            GM_log(child.data);
            ret.push(child);
        } else {
            var name = child.nodeName.toLowerCase();
            
            if (name == 'head' ||
                name == 'script' ||
                name == 'iframe' ||
                name == 'style' ||
                name == 'title' ||
                name == 'meta' ||
                name == 'textarea' ||
                name == 'object') {
                continue;
            }
            
            var subNodes = getTextNodes(child);
            
            for (var j = 0; j < subNodes.length; j++) {
                ret.push(subNodes[j]);
            }
        }
    }
    
    return ret;
}

goGoGadgetMath();