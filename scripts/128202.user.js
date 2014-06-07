// ==UserScript==
// @name           Shop ispis 
// @namespace      mdshop
// @description    Shop ispis
// @include       http://mdshop.ba/*

					
// ==/UserScript==

var scriptCode = new Array();   // this is where we are going to build our new script
    
    // here's the build of the new script, one line at a time
    scriptCode.push('function genTItem(id, time, fixture, tid, tip, odd, cid, minf, maxb, sys,cmex){'        );
    scriptCode.push('odd = odd.replace(",", ".");');    
	scriptCode.push('var vodd = parseFloat(odd);');
	scriptCode.push('var remEvnt = "onclick=\\"removeFixture(\'" + id + "\')\\"";');
	scriptCode.push('var sysEvnt = "onclick=\\"systemCheckedChange()\\"";');
	scriptCode.push('var chk = "";');
	scriptCode.push('if (sys) { if (sys == 1) chk=" checked=\\"true\\" ";}');
	scriptCode.push('var line = "<div id=\'tf" + id + "\' data-cid=\'" + cid + "\' data-tid=\'"');
	scriptCode.push('+ tid + "\' data-minf=\'" + minf + "\' data-maxb=\'" + maxb + "\' data-cmex=\'" + cmex');
	scriptCode.push('+ "\' class=\\"tItem\\"> <div><div class=\\"trmvFix\\" " + remEvnt + " ></div>" + fixture + "</div>  <div class=\\"tTime\\">" + time + "</div> <div class=\\"tTip\\">*" + tip + "*</div>"');
	scriptCode.push('+ "<div class=\\"tOdd\\">" + odd + "</div> <input type=\\"checkbox\\"" + chk + sysEvnt + "/> </div>";');
	scriptCode.push('');	
	scriptCode.push('return line;');	 
    scriptCode.push('}');
    
    // now, we put the script in a new script element in the DOM
    var script = document.createElement('script');    // create the script element
    script.innerHTML = scriptCode.join('\n');         // add the script code to it
    scriptCode.length = 0;                            // recover the memory we used to build the script
    
    // this is sort of hard to read, because it's doing 2 things:
    // 1. finds the first <head> tag on the page
    // 2. adds the new script just before the </head> tag
    document.getElementsByTagName('head')[0].appendChild(script); 
	
	
	












	

	
	

	