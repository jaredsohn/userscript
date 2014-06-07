// ==UserScript==
// @name          Zyxel - allow set netmask other than C type /24
// @namespace     zyxel.local
// @description   Zyxel does not allow in some cheap home routers to set A or B netmask. This script disables C type netmask check and alows to set any valid netmask.
// @include       http://192.168.1.1/*
// @include       http://192.168.1.2/*
// @version       0.0.2
// ==/UserScript==


// according to:
// http://www.squakmt.com/replacing_javascript/index.htm

var scriptCode = new Array();   // this is where we are going to build our new script

// here's the build of the new script, one line at a time
scriptCode.push('function valid_netmask_str_c(netmask) {');
scriptCode.push('  return valid_netmask_str(netmask);');
scriptCode.push('}'                                 );

// now, we put the script in a new script element in the DOM
var script = document.createElement('script');    // create the script element
script.innerHTML = scriptCode.join('\n');         // add the script code to it
scriptCode.length = 0;                            // recover the memory we used to build the script

// this is sort of hard to read, because it's doing 2 things:
// 1. finds the first <head> tag on the page
// 2. adds the new script just before the </head> tag
document.getElementsByTagName('head')[0].appendChild(script);
