// ==UserScript==
// @name         CCEL Toggle sidebars
// @description  Allows you to toggle both sidebars on the Christian Classics Ethereal Library www.ccel.org
// @author       Richard Trimble
// @include      http://www.ccel.org/*
// ==/UserScript==


(function (){
	var head = document.getElementsByTagName("head")[0];
	var menu_right = document.getElementById("menu_right");
	var menu_left = document.getElementById("menu_left");


	//insert a style tag to keep the toptabs table looking pretty
	var toptabsstyle = document.createElement("style");
	toptabsstyle.setAttribute("type", 'text/css');
	toptabsstyle.innerHTML = '					'+
		'#menu_left { width: 26.8% } 				'+
		'#navmenu { width: 46.4% } 				'+
		'#menu_right { width: 26.8% } 			'+
		'#menu_right a {						'+
		'			opacity: 0.4;			'+
		'			-moz-opacity:0.4;} 		'+
		'#menu_right a:link {color: #000000}   		'+
		'#menu_right a:visited {color: #000000}  		'+
		'#menu_right a:hover {					'+
		'			color: #800000;			'+
		'			text-decoration: underline;	'+
		'			opacity: 1;				'+
		'			-moz-opacity:1;} 			'+
		'#menu_right a {text-decoration: none}		'+
		'#menu_left a {						'+
		'			opacity: 0.4;			'+
		'			-moz-opacity:0.4;} 		'+
		'#menu_left a:link {color: #000000}   		'+
		'#menu_left a:visited {color: #000000}  		'+
		'#menu_left a:hover {					'+
		'			color: #800000;			'+
		'			text-decoration: underline;	'+
		'			opacity: 1;				'+
		'			-moz-opacity:1;} 			'+
		'#menu_left a {text-decoration: none}		';
	head.appendChild(toptabsstyle);//alert('toptabsstyled');

	//insert the right toggle link
	var togglelink_right = document.createElement("a");
	togglelink_right.setAttribute("id",'togglelink_right');
	togglelink_right.setAttribute("onclick",'hidesidebar_right();');
	togglelink_right.setAttribute("style",'position: relative; left: 16%; cursor: pointer; ');
	togglelink_right.innerHTML = 'Toggle sidebar';
	menu_right.setAttribute("style",'vertical-align: middle;');
	menu_right.appendChild(togglelink_right);

	//insert the left toggle link
	var togglelink_left = document.createElement("a");
	togglelink_left.setAttribute("id",'togglelink_left');
	togglelink_left.setAttribute("onclick",'hidesidebar_left();');
	togglelink_left.setAttribute("style",'position: relative; right: 16%; cursor: pointer; ');
	togglelink_left.innerHTML = 'Toggle sidebar';
	menu_left.setAttribute("style",'vertical-align: middle;');
	menu_left.appendChild(togglelink_left);

	//insert script for the toggle link to call
	var script = document.createElement("script");
	script.setAttribute("type", 'text/javascript');
	script.innerHTML = '											'+
		'function showsidebar_right() {								'+
		'var head = document.getElementsByTagName(\'head\')[0];				'+
		'var style = head.removeChild(document.getElementById(\'hidestyle-right\'));	'+
		'var togglelink = document.getElementById(\'togglelink_right\');			'+
		'togglelink.setAttribute(\"onclick\",\'hidesidebar_right();\'); }			'+
		'													'+
		'													'+
		'function hidesidebar_right() {								'+
		'var head = document.getElementsByTagName(\'head\')[0];				'+
		'var style = document.createElement(\"style\");						'+
		'style.setAttribute(\"type\", \'text/css\');						'+
		'style.setAttribute(\"id\", \'hidestyle-right\');					'+
		'style.innerHTML = \'#sidebar-right { display: none; }\';				'+
		'head.appendChild(style);									'+
		'var togglelink = document.getElementById(\'togglelink_right\');			'+
		'togglelink.setAttribute(\"onclick\",\'showsidebar_right();\');}			'+
		'													'+
		'													'+
		'													'+
		'													'+
		'function showsidebar_left() {								'+
		'var head = document.getElementsByTagName(\'head\')[0];				'+
		'var style = head.removeChild(document.getElementById(\'hidestyle-left\'));	'+
		'var togglelink = document.getElementById(\'togglelink_left\');			'+
		'togglelink.setAttribute(\"onclick\",\'hidesidebar_left();\'); }			'+
		'													'+
		'													'+
		'function hidesidebar_left() {								'+
		'var head = document.getElementsByTagName(\'head\')[0];				'+
		'var style = document.createElement(\"style\");						'+
		'style.setAttribute(\"type\", \'text/css\');						'+
		'style.setAttribute(\"id\", \'hidestyle-left\');					'+
		'style.innerHTML = \'#sidebar-left { display: none; }\';				'+
		'head.appendChild(style);									'+
		'var togglelink = document.getElementById(\'togglelink_left\');			'+
		'togglelink.setAttribute(\"onclick\",\'showsidebar_left();\');}			';
	head.appendChild(script);

/*	//uncomment this part if you want to hide the right sidebar by default
	//also change the "onclick" attribute to 'showsidebar_right();' in the
	//section 'insert the right toggle link'
	var style = document.createElement("style");
	style.setAttribute("type", 'text/css');
	style.setAttribute(\"id\", \'hidestyle-right\');
	style.innerHTML = '#sidebar-right { display: none; }';
	head.appendChild(style);
*/
}());

