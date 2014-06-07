// ==UserScript==
// @name        phpMyAdmin Icon Menus
// @homepage    http://www.arantius.com/article/arantius/phpmyadmin+icon+menus/
// @version     1.2
// @namespace   http://www.arantius.com/misc/greasemonkey/
// @description	Add icon-based menus to the left frame of phpMyAdmin
// @include     http://YOUR-PHPMYADMIN/PATH-HERE/navigation.php*
// ==/UserScript==

//
// This script creates an iconic menu that appears when you point your mouse
// at the small icon beside the table name in the left frame.  It shows icons
// that link to the following functions:
//  Browse, SQL, Search, Insert, Export, Operations
//
// You need to edit the include path to include "left.php*" inside the path
// that your phpMyAdmin installation lives inside.
//
// Inspired by phpMyAdminMenus written by Paul Roub:
//   http://roub.net/xul/greasemonkey/
//

//
// Versions:
//
// 1.2 Update to work with current version of phpMyAdmin (2.10.x)
// 1.1 Fix links by removing href from containing <a>
// 1.0 Initial release
//
// Originally written by Anthony Lieuallen of http://www.arantius.com/
// Licensed for unlimited modification and redistribution as long as
// this notice is kept intact.
//
// If possible, please contact me regarding new features, bugfixes
// or changes that I could integrate into the existing code instead of
// creating a different script.  Thank you
//

function makeIcon(link, imgSrc, title) {
	//link
	var a=document.createElement('a');
	a.target=mainTarget;
	a.href=link;
	//image
	var img=document.createElement('img');
	img.src=imgPath+imgSrc;
	img.border=0;
	img.title=title;
	a.appendChild(img);
	return a;
}

//inject our own custom styles
var s=document.createElement('style');
s.type='text/css';
s.appendChild(document.createTextNode(
	'div.iconmenu{display:none;position:absolute;left:0;top:-6px;background-color:white;border:2px solid black;z-index:10; padding: 2px;}'+
	'div.iconmenu img{padding:2px;background-color:#FFFFFF;}'+
	'div.iconmenu img:hover{background-color:#CCCCFF;}'+
	'div#left_tableList li a{position:relative;}'+
	'div#left_tableList li a:hover div.iconmenu{display:block;}'
));
var h=document.getElementsByTagName('head')[0];
h.appendChild(s);

//find links to inject into
var res = document.evaluate("//a[starts-with(@id, 'browse_')]",
	document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var i, el, table;

//grab properties out of the first link
el=res.snapshotItem(0);
if (!el) return;

var imgPath=el.getElementsByTagName('img')[0].src.replace(/(.*\/).*/, '$1');
var qsBase='?db='+el.href.match(/db=([^&]*)/)[1]+
	'&goto=tbl_properties_structure.php'+
	'&';
var mainTarget=el.target;

//inject our menus into each link
for (i=0; el=res.snapshotItem(i); i++) {
	table=el.href.match(/table=([^&]*)/)[1];

	//make up the menu div
	var div=document.createElement('div');
	div.className='iconmenu';

	//add in all the icons
	div.appendChild(makeIcon(
		'sql.php'+qsBase+'table='+table+'&sql_query=SELECT+%2A+FROM+%60'+table+'%60&pos=0',
		'b_browse.png', 'Browse'
	));
	div.appendChild(document.createTextNode(' '));

	div.appendChild(makeIcon(
		'tbl_sql.php'+qsBase+'table='+table,
		'b_sql.png', 'SQL'
	));
	div.appendChild(document.createTextNode(' '));

	div.appendChild(makeIcon(
		'tbl_select.php'+qsBase+'table='+table,
		'b_search.png', 'Search'
	));
	div.appendChild(document.createTextNode(' '));

	div.appendChild(makeIcon(
		'tbl_change.php'+qsBase+'table='+table,
		'b_insrow.png', 'Insert'
	));
	div.appendChild(document.createTextNode(' '));

	div.appendChild(makeIcon(
		'tbl_export.php'+qsBase+'table='+table,
		'b_export.png', 'Export'
	));
	div.appendChild(document.createTextNode(' '));

	div.appendChild(makeIcon(
		'tbl_operations.php'+qsBase+'table='+table,
		'b_tblops.png', 'Operations'
	));
	div.appendChild(document.createTextNode(' '));

	//inject the menu div
	el.appendChild(div);
	el.removeAttribute('href');
}
