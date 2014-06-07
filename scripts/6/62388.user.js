// ==UserScript==
// @name          Zap White Background to Gray
// @description   Changes white or near-white background to gray
// @include       *
// ==/UserScript==

(function(){function getRGBColor(node,prop){var rgb=getComputedStyle(node,null).getPropertyValue(prop);var r,g,b;if(/rgb\((\d+),\s(\d+),\s(\d+)\)/.exec(rgb)){r=parseInt(RegExp.$1,10);g=parseInt(RegExp.$2,10);b=parseInt(RegExp.$3,10);return[r/255,g/255,b/255];}return rgb;} R(document.documentElement); function R(n){var i,x,color;if(n.nodeType==n.ELEMENT_NODE && n.tagName.toLowerCase()!="input" && n.tagName.toLowerCase()!="select" && n.tagName.toLowerCase!="textarea"){for(i=0;x=n.childNodes[i];++i)R(x); color=getRGBColor(n,"background-color");if( (typeof(color)!="string" && color[0] + color[1] + color[2] >= 2.8) || (n==document.documentElement && color=="transparent")) { n.style.backgroundColor = "tan";/*Moz 1.0*/ n.style.setProperty("background-color", "#ECECEC", "important");/*Moz 1.4 after zap colors*/ } }}})()
