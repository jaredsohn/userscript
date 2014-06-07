// ==UserScript==
// @name       Gmane colored diffs
// @namespace  http://zyla.prati.pl/
// @version    0.1
// @description  Highlight diffs on Gmane messages
// @match      http://article.gmane.org/*
// @copyright  2012+, You
// ==/UserScript==

var content = document.querySelector('.bodytd pre');
var lines = content.innerHTML.split(/\n/);
var diffmode = false;

for(var i in lines) {
    if(!diffmode) {
    	if(lines[i].match(/^diff --git/))
           diffmode = true;
    } else {
        if(lines[i] == '-- ')
        	diffmode = false;    
        else if(lines[i][0] == '+')
        	lines[i] = '<span style="color: green;">' + lines[i] + '</span>';
		else if(lines[i][0] == '-')
        	lines[i] = '<span style="color: rgb(177,0,0);">' + lines[i] + '</span>';
    }
}

content.innerHTML = lines.join('\n');