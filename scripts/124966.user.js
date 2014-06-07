// ==UserScript==
// @name update to markQUE to use in chrome
// @description fix the embed cannot change in chrome
// ==/UserScript==

    var scriptCode = new Array();   // this is where we are going to build our new script
    
    // here's the build of the new script, one line at a time
scriptCode.push('function markQUE(){'                   );
scriptCode.push('	window.document["exambar"].setVariable("answeredQue",document.exam.disp.value);'                   );
scriptCode.push('	answered=true;'                   );
scriptCode.push('	eval("answered"+document.exam.disp.value+"=1");'                   );
scriptCode.push('}'                   );
    
    // now, we put the script in a new script element in the DOM
    var script = document.createElement('script');    // create the script element
    script.innerHTML = scriptCode.join('\n');         // add the script code to it
    scriptCode.length = 0;                            // recover the memory we used to build the script
    
    // this is sort of hard to read, because it's doing 2 things:
    // 1. finds the first <head> tag on the page
    // 2. adds the new script just before the </head> tag
    document.getElementsByTagName('body')[0].appendChild(script); 