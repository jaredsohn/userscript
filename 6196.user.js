// ==UserScript==
// @name Easy SiliconInvestor.com Reading
// @namespace http://perceptus.ca
// @description Fix the low contrast hard to read styles and fonts of siliconinvestor.com
// @include http://*siliconinvestor.com/*
// @include https://*siliconinvestor.com/*
// ==/UserScript==

// Modifier: Leonard Chan (leonard@perceptus.ca) 
// Date: 2006-11-02
// Version 1.0.0


// ***********
// Snippet based on GreaseMonkey Script "fix phppatterns.com" by:
//		Author: Steve Wainstead swain@panix.com
//		Downloaded by LC from: http://userscripts.org/scripts/show/3978 on 2006-11-02.
// Loop over all styles and set front and back colors to nothing, 
// which then gives you the browser defaults.

for (x=0; x < document.styleSheets.length; x++) {
    for (y=0; y < document.styleSheets[x].cssRules.length; y++) {
        csstext = document.styleSheets[x].cssRules[y].cssText;
        if (csstext.match(/color/)) {
            document.styleSheets[x].cssRules[y].style.color = '';
            document.styleSheets[x].cssRules[y].style.backgroundColor = '';
        }
    }
}
// // ***********


// ***********
// Snippet based on GreaseMonkey Script "del.icio.us Prettifier" by:
//		Author: Gina Trapani
//		Downloaded by LC from: http://userscripts.org/scripts/show/2631 on 2006-11-02.
// 
(function () {
	var newstyle = "body, td, p, a { font-family: Verdana, 'Lucida Grande', Arial ! important;} a { text-decoration: none ! important; } ";

	var ss = document.createElement("style");
	var t = document.createTextNode(newstyle);
	
    var root = (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);
	ss.appendChild(t);
	root.appendChild(ss);
})();
// // ***********


//var newstyle = ".lastChart table a { display: block ! important; } .lastChart table a:hover, #tagcloud a:hover {color:#D20039 ! important; } .lastChart table tr.now a:hover { color: #fff ! important; }";
	