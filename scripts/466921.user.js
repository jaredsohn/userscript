// ==UserScript==
// @name          Bootstrap 3 Documentation UserScript
// @namespace     http://userscripts.org/users/651090
// @description   The main purpose of this userscript is to set the main navbar to            fixed for easier navigation
// @include	  *://getbootstrap.com/*
// @exclude       *://getbootstrap.com/2.3.2/*
// @version       0.0.2
// ==/UserScript==

function with_jquery(f) {
     var script = document.createElement("script");
     script.type = "text/javascript";
     script.textContent = "(" + f.toString() + ")(jQuery)";
     document.body.appendChild(script);
};
 
with_jquery(function($){
    $(function() {
        $('header.navbar')
        	.addClass('navbar-fixed-top navbar-inverse')
        	.removeClass('bs-docs-nav navbar-static-top');
    });
	
});

GM_addStyle ( "	                                \
    body{                                       \
        padding-top:50px;                       \
    }                                           \
    .bs-docs-sidebar.affix {		        \
	top:100px;  			\
    }                           	        \
    header.navbar{				\
        box-shadow: 0 0 10px 1px #030303;	\
    }						\
" );

