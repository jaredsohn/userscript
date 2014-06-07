// ==UserScript==
// @name           Forum Tab Drop Down Menu
// @version        1.0.0
// @namespace      chris465glb
// @description    Adds a menu to the toolbar to get to the important forums
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
	return a;
};

var container=getElementsByClassName('toolbar_item',document)[5]
container.setAttribute("id","replace_this");

var sp1 = document.createElement("span");

sp1.innerHTML = '<ul id="navigation-1" class="toolbar_item"><li><a href="http://goallineblitz.com/game/forum_main.pl" title="Forum">Forum</a><ul class="navigation-2"><li><a href="http://goallineblitz.com/game/forum_thread_list.pl?team_id=2985" title="RUF">RUF</a></li><li><a href="#" title="Vooms">Voom\u0027s<span>&raquo;</span></a><ul class="navigation-3"><li><a href="http://goallineblitz.com/game/forum_thread_list.pl?team_id=158" title="C.U.N.T.">C.U.N.T.</a></li><li><a href="http://goallineblitz.com/game/forum_thread_list.pl?team_id=23" title="MCE">MCE</a></li></ul><li><a href="http://goallineblitz.com/game/forum_thread_list.pl?team_id=1359" title="Vols">Vols</a></li><li><a href="http://goallineblitz.com/game/forum_thread_list.pl?forum_id=698" title="RoyalFam">Royal Fam</a></li></li></ul></li></ul>';


var sp2 = document.getElementById("replace_this");
var parentDiv = sp2.parentNode;

parentDiv.replaceChild(sp1,sp2);


addGlobalStyle('ul#navigation-1	{ margin:0; padding:0px 0; list-style:none; width:40px; height:28px; border-top:1px solid #65250D; border-bottom:1px solid #65250D;}'); // font:strong 8pt verdana, arial, helvetica;}');
addGlobalStyle('ul#navigation-1 li	{ margin:0; padding:0; display:block; float:left; position:relative; width:40px; }');
addGlobalStyle('ul#navigation-1 li	{ margin:0; padding:0; display:block; position:relative; width:40px; }');
addGlobalStyle('ul#navigation-1 li a:link,ul#navigation-1 li a:visited	{ padding-left:4px 0; display:block; text-align:left; text-decoration:none; color:#ffffff; width:80px; height:28px; }');

// Inital menu on hover
addGlobalStyle('ul#navigation-1 li:hover a,ul#navigation-1 li a:hover,ul#navigation-1 li a:active	{ padding:0px 0; display:block; text-align:center; text-decoration:none; background:#ec454e; color:#ffffff; width:40px; height:28px; border-left:1px solid #ffffff; border-right:1px solid #ffffff; }');

//First Drop down
addGlobalStyle('ul#navigation-1 li ul.navigation-2	{ margin:0; padding:1px 1px 0; list-style:none; display:none; background:#ffffff; width:80px; position:absolute; top:28px; left:-10px; border:1px solid #65250D; border-top:none; }');
addGlobalStyle('ul#navigation-1 li:hover ul.navigation-2	{ display:block; }');
addGlobalStyle('ul#navigation-1 li ul.navigation-2 li	{ width:80px; clear:left; width:80px; }');
addGlobalStyle('ul#navigation-1 li ul.navigation-2 li a:link,ul#navigation-1 li ul.navigation-2 li a:visited	{ clear:left; background:#65250D; padding:0px 0; width:80px; border:none; border-bottom:1px solid #ffffff; position:relative; z-index:1000; }');
addGlobalStyle('ul#navigation-1 li ul.navigation-2 li:hover a,ul#navigation-1 li ul.navigation-2 li a:active,ul#navigation-1 li ul.navigation-2 li a:hover	{ clear:left; background:#ec454e; padding:0px 0; width:80px; border:none; border-bottom:1px solid #ffffff; position:relative; z-index:1000; }');
addGlobalStyle('ul#navigation-1 li ul.navigation-2 li ul.navigation-3	{ display:none; margin:0; padding:0; list-style:none; position:absolute; left:80px; top:-2px; padding:1px 1px 0 1px; border:1px solid #65250D; border-left:1px solid #65250D; background:#ffffff; z-index:900; }');
addGlobalStyle('ul#navigation-1 li ul.navigation-2 li:hover ul.navigation-3	{ display:block; }');
addGlobalStyle('ul#navigation-1 li ul.navigation-2 li ul.navigation-3 li a:link,ul#navigation-1 li ul.navigation-2 li ul.navigation-3 li a:visited	{ background:#65250D; }');
addGlobalStyle('ul#navigation-1 li ul.navigation-2 li ul.navigation-3 li:hover a,ul#navigation-1 li ul.navigation-2 li ul.navigation-3 li a:hover,ul#navigation-1 li ul.navigation-2 li ul.navigation-3 li a:active	{ background:#ec454e; }');

// First displayed >>
addGlobalStyle('ul#navigation-1 li ul.navigation-2 li a span	{ position:absolute; top:0; left:70px; font-size:12pt; color:#fe676f; }');
// Displayed >> when hover
addGlobalStyle('ul#navigation-1 li ul.navigation-2 li:hover a span,ul#navigation-1 li ul.navigation-2 li a:hover span	{ position:absolute; top:0; left:70px; font-size:12pt; color:#ffffff; }');