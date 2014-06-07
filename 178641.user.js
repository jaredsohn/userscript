// ==UserScript==
// @name       Teamcity - Build Log Improver
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      teamcity/*buildLog
// @copyright  2012+, You
// ==/UserScript==

console.log("adding line numbers");
var lines = document.querySelectorAll(".ts_in");
var lineNo = 1;
console.log(lines);

for (lineNo-1; lineNo<lines.length; lineNo++){
    lines[lineNo].innerHTML += " [" + lineNo + "] ";
}