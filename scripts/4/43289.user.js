// ==UserScript==
// @name           Brainfuck Interp & Eval
// @namespace      sizzlemctwizzle
// @description    Interprets Brainfuck source code and evalutates its javascript equivalent
// @require        https://raw.github.com/einars/js-beautify/master/js/lib/beautify.js
// @version        1.0.6
// @include        *
// ==/UserScript==

function Interpreter(script, input) {

  // Brainfuck ignores everything that is not a command
  // "]" = jump backward to the matching "[" if the value of the current data point is not zero
  // "[" = jump forward past the matching "]" if the value of the current data point is zero
  script = script.replace(/[^<|>|\-|\+|\.|\,|\]|\[]/g,'').replace(/\]/g, '}\n').replace(/\[/g, 'while(cells[dpoint]){');
  
  // "+" = increase the value at the current data point by one
  groups=script.match(/\++/g);
  if (groups) {
    for (var i = 0, len = groups.length; i < len; ++i) {
      var group = groups[i],
        regex = new RegExp(group.replace(/\+/g, '\\+')),
        replacement = group.length > 1 ? "cells[dpoint]|="+group.length+";" : "||cells[dpoint];";
      script = script.replace(regex, replacement);
    }
    script = script.replace(/\|/g, '+');
  }

  // ">" = increase data point by one
  groups=script.match(/>+/g);
  if (groups) {
    for (var i = 0, len = groups.length; i < len; ++i) {
      var group = groups[i],
        regex = new RegExp(group),
        replacement = group.length > 1 ? "dpoint+=" + group.length + ";" : "++dpoint;";
      script = script.replace(regex, replacement);
    }
  }

  // "-" = decrease the value at the current data point by one
  groups=script.match(/-+/g);
  if (groups) {
    for (var i = 0, len = groups.length; i < len; ++i) {
      var group = groups[i],
        regex = new RegExp(group),
        replacement = group.length > 1 ? "cells[dpoint]|=" + group.length + ";" : "||cells[dpoint];";
      script = script.replace(regex, replacement);
    }
    script = script.replace(/\|/g, '-');
  }

  // "<" = decrease data point by one
  groups=script.match(/<+/g);
  if (groups) {
    for (var i = 0, len = groups.length; i < len; ++i) {
      var group = groups[i],
        regex = new RegExp(group),
        replacement = group.length > 1 ? "dpoint-=" + group.length + ";" : "--dpoint;";
      script = script.replace(regex, replacement);
    }
  }

  // "." = output the value at the current data point
  script = script.replace(/\./g, "output+=String.fromCharCode(cells[dpoint]);");
  // "," = replace the value of the current data point with an input value
  script = script.replace(/\,/g, "cells[dpoint]=input.charCodeAt(ipoint++);");

  // Brainfuck uses an array of 30,000 cells all initialized to zero
  // The data point starts at zero
  return "// Initialize values\nvar input=\""+input+"\", ipoint=0, output=\"\", cells=[], dpoint=0;for(var i=0;i<30000;++i){cells[i]=0;}\n\n// Actual BF code begins here\n" + script;
}

// Inject a script into the page
function addScript(js) {
  var body = document.body, script = document.createElement('script');
    if (!body) {return}
    script.type = 'text/javascript';
    try {script.innerHTML = js}
    catch(x) {script.innerText = js}
    body.appendChild(script);
}

GM_registerMenuCommand("Run Brainfuck Code", function(){
    code = prompt("Enter Brainfuck Code:") || "";
    input =  prompt("Enter Input Data:") || "";
    javascript = Interpreter(code, input);
    try {
      // Evaluate the interpreted Brainfuck code
      // This way is much faster than eval()
      // I try to prevent naming collison
      addScript('(function(){' + javascript + 'window.BrainFuckOutput_43289=output;alert("Brainfuck Output: "+output)})();');
      var checker=setInterval(function(){
	  if(unsafeWindow.BrainFuckOutput_43289) {
	    clearInterval(checker);
            unsafeWindow.BrainFuckOutput_43289 = null;
	    alert("Javascript Equivalent:\n\n" + 
                  js_beautify(javascript));
	  }
        },200);
    }
    catch(err) {
      if (confirm("Evaluation failed: " + err.description + "\nView javascript?")) 
        alert(js_beautify(javascript));
    }
});