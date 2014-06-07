// ==UserScript==
// @name           pdfreader
// @namespace      http://userscripts.org/scripts/show/57840
// @description    Override Macy's Javascript for PDF Reader
// @include        https://www.macys.com/*
// ==/UserScript==
/* many thanks to http://www.squakmt.com/replacing_javascript/index.htm */
/*
  hasPdfReader()
  returns true if a pdf reader is installed
*/
    var scriptCode = new Array();   // this is where we are going to build our new script
    
    // here's the build of the new script, one line at a time
    scriptCode.push('function hasPdfReader(){'        );
    scriptCode.push('  return(true);'                   );
    scriptCode.push('}'                                 );
    
    // now, we put the script in a new script element in the DOM
    var script = document.createElement('script');    // create the script element
    script.innerHTML = scriptCode.join('\n');         // add the script code to it
    scriptCode.length = 0;                            // recover the memory we used to build the script
    
    // this is sort of hard to read, because it's doing 2 things:
    // 1. finds the first <head> tag on the page
    // 2. adds the new script just before the </head> tag
    document.getElementsByTagName('head')[0].appendChild(script); 