// ==UserScript==
// @name       Codepen Slim
// @version    0.1
// @description  Reduces size of top-bar, leaving more space for important stuff
// @match      http://codepen.io/*
// @match      http://*.codepen.io/*
// @copyright  2013+, Nick P
// ==/UserScript==

var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = "\
	.top-button { height: 32px; padding:0 22px; }\
    .logo { height:44px; }\
    .box-actions { height:44px; }\
	.top-button .icon { top:1px; }\
	#sharing-button { padding-top: 1px; }\
	.view-switcher { margin: 6px 25px 0 0; }\
	.header-up{ height: 44px; }\
	.logged-in-user-stuff{ padding: 3px 10px; }\
	.user-stuff:hover .dropdown-arrow,.user-stuff:focus .dropdown-arrow{top:25px;left:33px;}\
	#resizer { margin-top: -17px; }\
";
document.body.appendChild(css);