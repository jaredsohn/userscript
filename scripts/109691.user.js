// #########################    A Greasemonkey script that changes
// # Insomnia White Script #    the style for all pages in insomnia.ac
// #########################    to a white version.
// 
// --------------------------------------------------------------------
// 
//  This is a Greasemonkey user script. To install this script, you
//  need Greasemonkey version 0.3 or later. To get Greasemonkey, or
//  for more information go to http://greasemonkey.mozdev.org/
//  Greasemonkey is a Mozilla Firefox add-on that allows users to
//  make on-the-fly changes to HTML web page content through the use
//  of JavaScript. Greasemonkey scripts can add new functions to web
//  pages, fix rendering bugs, combine data from multiple webpages,
//  or perform numerous other functions.
// 
// --------------------------------------------------------------------
// 
// ## Greasemonkey Metadata ###########################################
// ==UserScript==
// @name          Insomnia White Script
// @description   Transform insomnia.ac to a whiter version.
// @namespace     http://userscripts.org/users/383174
// @include       http*://insomnia.ac/*
// @exclude       
// @version       1.1
// @history       1.1 Fixed review section (new and old templates)
// @history       1.0 Initial release
// ==/UserScript==
// ####################################################################

GM_log('Insomnia White GreaseMonkey Script Loaded');

/* Uncomment the following line to make this script work in GreaseKit for Safari */
// if (typeof(unsafeWindow)!="object") {var unsafeWindow = window;}

function getElementsByClassName(classname,node){
	if (node == null) {node = document;}
	// use native implementation if available
	if (node.getElementsByClassName)
	{return node.getElementsByClassName(classname);}
	else
	{	return (  // Dustin Diaz method
		function getElementsByClass(searchClass,node)
		{	var classElements = [], // same as: new Array()
				els = node.getElementsByTagName("*"),
				pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
			for (i=0, j=0; i<els.length; i++)
			{
				if (pattern.test(els[i].className))
				{classElements[j] = els[i]; j++;}
			}
			return classElements;
		} )(classname,node);
	}
}

function addStyle(newStyle) {
	if (typeof(GM_addStyle) == "function") {
		GM_addStyle(newStyle); return;
	}
    var styleElement = document.getElementById('style_js');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'style_js';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
}

/*** Fix the style ***/
addStyle(
	  'body {'
    + '    background-color: #E7E7E7;'
    + '    color: #333333;'
    + "    font-family: 'Lucida Grande',Verdana,Arial,Sans-Serif !important;"
    + '}'
    + 'div#pages, div#wrap, div#repeatbg {'
    + '    background-color: white;'
    + '    border-left: 1px solid gray;'
    + '    border-right: 1px solid gray;'
    + '}'
    + 'div#repeatbg {'
    + '    border-bottom: 1px solid gray;'
    + '}'
    + 'div#content a img {'
    + '    border: 1px solid black;'
    + '}'
    + 'a, a:visited, a:link, div#pages ul li a, div#pages ul li a:visited, div#sidebar a, div#sidebar a:visited, .content p a, .content p a:visited {'
    + '    color: fireBrick;'
    + '}'
    + '.sidebar h2 {'
    + '    border-bottom: 1px solid #333333;'
    + '}'
    + '.content h5, div.sidebar h2, div.sidebar li {'
    + '    color: #333333;'
    + '}'
    + 'div.content h3, div.content h3 a, div.content h3 a:visited, div.sidebar font {'
    + '    color: fireBrick;'
    + '}'
    + 'div#navlist, div#banner {'
    + '    display: none;'
    + '}'
    + 'div#right, div.content h3 {'
    + '    margin-top: 10px;'
    + '}'
    + 'table table tr td font {'
    + '    color: #333333;'
    + "    font-family: 'Lucida Grande',Verdana,Arial,Sans-Serif !important;"
    + '}'
    + 'table tr td div:last-child {'
    + '    background-color: white;'
    + '    border: 1px solid gray;'
    + '    color: #333333;'
    + "    font-family: 'Lucida Grande',Verdana,Arial,Sans-Serif !important;"
    + '}'
);
