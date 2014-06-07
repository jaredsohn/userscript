// ==UserScript==
// @name       Codeskulptor AddOn
// @namespace  http://mcimino.reaktix.com/
// @version    0.1
// @description  If the first lines of code have the comment #title=New Title, the page title is renamed to New Title. If the comment is #autorun, the code is automatically run.
// @match      http://www.codeskulptor.org/*
// @copyright  2012+, Saibotshamtul
// ==/UserScript==

function ParseCode(){
   	for (z=1;z<3;z++) {
        t = document.querySelector(".CodeMirror-code div:nth-child("+z+") pre span").innerHTML;
    	if (t.substring(0,7)=="#title=") {
        	document.title=t.substring(7,t.length);
    	}
    	if (t.substring(0,8)=="#autorun"){
        	document.querySelector("#run").click()
	    }
	}
}

window.setTimeout(ParseCode,1000);