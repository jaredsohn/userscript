// ==UserScript==
                // @name Greasemonkey Readability
                // ==/UserScript==
                
                function gmReadability ()
                {
                	// the following three lines are normally selected through the readability site
                	//  these are the default styles, but can be changed
                	// readStyle styles: style-newspaper,style-novel,style-ebook,style-terminal
                	// readSize styles are: size-small,size-medium,size-large,size-x-large
                	// readMargin styles are: margin-narrow,margin-medium,margin-wide,margin-x-wide
                	unsafeWindow.readStyle='style-newspaper';
                	unsafeWindow.readSize='size-large';
                	unsafeWindow.readMargin='margin-wide';
                	_readability_script=document.createElement('SCRIPT');
                	_readability_script.type='text/javascript';
                	_readability_script.src='http://lab.arc90.com/experiments/readability/js/readability.js?x='+(Math.random());
                	document.getElementsByTagName('head')[0].appendChild(_readability_script);
                	_readability_css=document.createElement('LINK');
                	_readability_css.rel='stylesheet';
                	_readability_css.href='http://lab.arc90.com/experiments/readability/css/readability.css';
                	_readability_css.type='text/css';
                	document.getElementsByTagName('head')[0].appendChild(_readability_css);
                	_readability_print_css=document.createElement('LINK');
                	_readability_print_css.rel='stylesheet';
                	_readability_print_css.href='http://lab.arc90.com/experiments/readability/css/readability-print.css';
                	_readability_print_css.media='print';
                	_readability_print_css.type='text/css';
                	document.getElementsByTagName('head')[0].appendChild(_readability_print_css);
                }
                
                GM_registerMenuCommand("Readability", gmReadability);
