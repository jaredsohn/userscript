// ==UserScript==
// @name        FP_open_link
// @namespace   yellowbluebus.com
// @include     http://focalpoint.*.net/fp/servlet/HomePageController*
// @grant       none
// @version     1
// ==/UserScript==

var scriptCode = new Array();   // this is where we are going to build our new script
    
// here's the build of the new script, one line at a time
scriptCode.push('function showElemFrame(domId, elemId) {');
scriptCode.push('    getPopupParams("popup");');
scriptCode.push('    theUrl = "../servlet/ElementManager"');
scriptCode.push('        + "?file=/elements/editFromSearchIndex.jsp"');
scriptCode.push('        + "&domId=" + domId');
scriptCode.push('        + "&elemId=" + elemId');
scriptCode.push('        + "&" + getCurrentProjectParameter();');
scriptCode.push('    window.location = theUrl;');
scriptCode.push('}');

// now, we put the script in a new script element in the DOM
var script = document.createElement('script');    // create the script element
script.innerHTML = scriptCode.join('\n');         // add the script code to it
script.setAttribute('type', 'text/javascript');
scriptCode.length = 0;                            // recover the memory we used to build the script
document.getElementsByTagName('head')[0].appendChild(script); 
