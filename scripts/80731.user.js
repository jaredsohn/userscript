// Copyright (c) 2009, Matthias Ries
// This file is licensed under the terms of the Artistic License 2.0 as
// described at http://www.opensource.org/licenses/artistic-license-2.0.php
//
// Use and/or redistribution under the terms of the GNU Lesser GPL 2.1
// (http://www.opensource.org/licenses/lgpl-2.1.php) is also allowed.
//
// This is a GreaseMonkey user-script. To install and use this, you must first
// have GreaseMonkey installed in your browser: http://greasemonkey.mozdev.org/
//
// ==UserScript==
// @name        CPAN SyntaxHighlighter Classic 
// @version     1.0.6  (05. March 2011 )
// @author      Matthias, Ries
// @namespace   http://github.com/matthiasries/cpan-greasemoney
// @description SyntaxHighlight the search.cpan.org pages. And uses a the traditional Color Scheme
// @include     http://search.cpan.org/*
// ==/UserScript==

(
function() {
        
        var uri_to_scripts = "http://alexgorbatchev.com/pub/sh/2.0.320/scripts/";
	var uri_to_styles  = "http://alexgorbatchev.com/pub/sh/2.0.320/styles/";
        
                
        var pres = document.getElementById("cpansearch").getElementsByTagName("pre");
        var ahrefs;
	for ( c in pres ){
               pres[c].setAttribute("class", "brush: perl");
	       ahrefs = pres[c].getElementsByTagName("a");
	       for ( ac in ahrefs ){
			var link2text = document.createTextNode("http://userscripts.org/scripts/issues/80731");
			link2text.textContent = ahrefs[0].href;
			pres[c].replaceChild( link2text, ahrefs[0] );
		}
        };
        
      var head = document.getElementsByTagName("head")[0];

      var link  = document.createElement('link');
      link.rel  = 'stylesheet';
      link.type = 'text/css';
      link.href = uri_to_styles + "shCore.css";
      head.appendChild(link);
      
      link  = document.createElement('link');
      link.rel  = 'stylesheet';
      link.type = 'text/css';
      link.href = uri_to_styles + "shThemeDefault.css";
      head.appendChild(link);
      
      link  = document.createElement('style');
      link.setAttribute("type", "text/css");
      var csst = document.createTextNode( 
         ' div .lines { \n'
        +'   border: 1px solid rgb(153, 153, 136) ! important; \n'
        +'   padding: 5px !important;\n'
        +'   }\n'
        +'   .syntaxhighlighter {\n'
            +'  background-color:#EEEEEE !important; \n'
            +'  overflow:hidden !important;\n'
            +'  font-size:1em !important;\n'
            +'  margin:1em 0 !important;\n'
            +'  position:relative !important;\n'
            +'  width:100% !important;\n'
            +'  }\n'
            +'.syntaxhighlighter .line.alt1 .content { \n'
            +'   background-color:#EEEEEE !important; \n'
            +'}\n'
            +'.syntaxhighlighter .line .content {  \n'
            +'  border:1px solid #999988 !important; \n'
            +'  color:#000000 !important;\n'
            +'  }\n'
            +'  .syntaxhighlighter .line.alt2 .content {\n'
            +'  background-color:transparent  !important;\n'
            +'  }\n'
            +'  .syntaxhighlighter .line.alt1 .content {\n'
            +'  background-color:transparent  !important;\n'
            +'  }\n'
            +'  .syntaxhighlighter .line .content {\n'
            +'  border:medium none  !important;\n'
            +'  color:#000000 !important;\n'
            +' }\n'
            +'.syntaxhighlighter .toolbar {\n'
            +'  background-color: #EEEEEE !important; \n'
            +'  border: 2px solid #999988 !important; \n'
            +' }\n'
            +'.syntaxhighlighter code {\n'
            +'  font-family:	monospace !important; \n'
            +'  font-size:	12px !important; \n'
            +'  font-style:	normal !important; \n'
            +'  font-weigth:	400 !important; \n'
            +'}\n');
            
      link.appendChild(csst);
      head.appendChild(link);

      var sc  =  document.createElement('script');
      sc.type =  'text/javascript';
      sc.src  =  uri_to_scripts + "shCore.js";
      head.appendChild(sc);

      sc  = document.createElement('script');
      sc.type = 'text/javascript';
      sc.src  = uri_to_scripts + "shBrushPerl.js";
      head.appendChild(sc);



	sc = document.createElement('script');
        sc.type = 'text/javascript';
	sc.innerHTML = "\
	function initSyntaxHighlighter() {\
	SyntaxHighlighter.config.clipboardSwf = '" + uri_to_scripts + "clipboard.swf';\
	SyntaxHighlighter.all();\
	}\
	if ('function' == typeof(mtAttachEvent)) mtAttachEvent('load',initSyntaxHighlighter);\
	else window.onload = initSyntaxHighlighter;\
	";
	head.appendChild(sc);

	// load 
	sc = document.createElement('script');
	sc.type = 'text/javascript';
	sc.innerHTML = "SyntaxHighlighter.defaults['auto-links']  = true ;\n"
                     + "SyntaxHighlighter.all();\n"
		     ;
	head.appendChild(sc);
	
document.close();
})();
