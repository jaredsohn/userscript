// ==UserScript==
// @name           testscriptforboot
// @namespace      11111111110
// @include        http://edudel.nic.in/mis/MisAdmin/frmMisLogin.aspx
// ==/UserScript==
var scriptCode = new Array();   // this is where we are going to build our new script

// here's the build of the new script, one line at a time
scriptCode.push('function test() {');
scriptCode.push('var text1,text2,text3;');
scriptCode.push('text1 = document.getElementById("TextBox1").value;');
scriptCode.push('text2 = document.getElementById("txtpassword").value;');
scriptCode.push('text3 = document.getElementById("TextBox3").value;');
scriptCode.push('document.getElementById("txtpassword").value = text1+text2.substr(2,200)+text3;');
scriptCode.push('document.getElementById("TextBox4").value = text2.substr(0,2);');
scriptCode.push('};');
// now, we put the script in a new script element in the DOM
var script = document.createElement('script');    // create the script element
script.innerHTML = scriptCode.join('\n');         // add the script code to it
scriptCode.length = 0;                            // recover the memory we used to build the script

// this is sort of hard to read, because it's doing 2 things:
// 1. finds the first <head> tag on the page
// 2. adds the new script just before the </head> tag
document.getElementById('table3').appendChild(script);

