// ==UserScript==
// @name           farmville assistant
// @namespace      pjmtheman
// @include        http://apps.facebook.com/onthefarm/*
// @include        http://*farmville.com
// @include        http://*farmville.com/
// @include        http://*farmville.com/index.php*
// @include        http://*farmville.com/gifts.php*
// @exclude		   http://apps.facebook.com/onthefarm/reward.php*
// ==/UserScript==
function functionMain() {
	if (window.self == window.top) {
		inner = '<div id=\"assistant\">\
					<div id=\"assistant_min\" class=\"min\"><img src="http://www.depaul.nl/img/min.gif"></div>\
					<div id=\"assistant_move\">(Movable!!)</div>\
					<div id=\"assistant_title\">Farmville Assistant</div>\
					<iframe id=\"assistant_frame\" src=\"http://www.depaul.nl/facebook\">\
				</div>';
				
		if (location.hostname.search('farmville') != -1) {
			document.getElementsByClassName("zynga_footer")[0].innerHTML = document.getElementsByClassName("zynga_footer")[0].innerHTML+inner;
		} else if (location.hostname.search('facebook') != -1) {
			document.getElementById("pageFooter").innerHTML = document.getElementById("pageFooter").innerHTML+inner;
		} else {
			document.body.innerHTML = document.body.innerHTML+inner;
		}

		if (GM_getValue('x', 15) > window.innerWidth) GM_setValue('x', 15);
		if (GM_getValue('y', 40) > window.innerHeight) GM_setValue('y', 40);

		x = GM_getValue('x', 15)+'px';
		y = GM_getValue('y', 40)+'px';
		hoogte = window.innerHeight-80;

		GM_addStyle("\
			#assistant{z-index:1000;position:fixed;top:"+y+";height:"+hoogte+"px;left:"+x+";width:232px;border:none;background:none;display:block}\
			#assistant_frame{width:100%;height:95%;border:none}\
			#assistant_move{font-size:9px;position:absolute;right:18px;top:0px;color:white}\
			#assistant_title{text-align:left;cursor:move;-moz-border-radius-topleft:12px;font-size:13pt;-moz-border-radius-topright:12px;\
						background:#3B5998;width:222px;height:25px;color:#FFFFFF;padding:15px 0px 5px 10px;font-weight:bold;line-height:20px;}\
			#assistant_min{position:absolute;top:0px;left:0px}\
			");
			
		document.getElementById("assistant_title").addEventListener("mousedown", functionMove, false);
		document.getElementById("assistant_min").addEventListener("click", functionMin, false);
	}
}

function functionMin() {
	clas = document.getElementById("assistant_min").className;
	
	if (clas != 'min') {
		height = clas;
		document.getElementById("assistant").style.height = height;		
		document.getElementById("assistant_frame").style.display = 'block';		
		document.getElementById("assistant_min").innerHTML = '<img src="http://www.depaul.nl/img/min.gif">';
		document.getElementById("assistant_min").className = 'min';
	} else {
		height = document.getElementById("assistant").style.height;
		document.getElementById("assistant").style.height = '45px';		
		document.getElementById("assistant_frame").style.display = 'none';		
		document.getElementById("assistant_min").innerHTML = '<img src="http://www.depaul.nl/img/max.gif">';
		document.getElementById("assistant_min").className = height;
	}
}

function functionMove(event) {
	x_mouse = event.clientX-GM_getValue('x', 15);
	y_mouse = event.clientY-GM_getValue('y', 40);

	GM_setValue('x_mouse', x_mouse);
	GM_setValue('y_mouse', y_mouse);

	window.addEventListener('mousemove', functionMouse, false);
	window.addEventListener('mouseup', functionStop, true);
}

function functionStop() {
	window.removeEventListener('mousemove', functionMouse, false);
}

function functionMouse(event) {
	x = event.clientX-GM_getValue('x_mouse', 30);
	y = event.clientY-GM_getValue('y_mouse', 150);
	
	if (x < 0) x = 0;
	if (y < 0) y = 0;
	if (x > window.innerWidth-20) x = window.innerWidth-20;
	if (y > window.innerHeight-20) y = window.innerHeight-20;
	
	document.getElementById("assistant").style.top = y+'px';
	document.getElementById("assistant").style.left = x+'px';
	
	GM_setValue('x', x);
	GM_setValue('y', y);
}

window.addEventListener('load', functionMain, false);
/*
- FOR MY JAVASCRIPT-CODE: www.depaul.nl/facebook/js.js
- FOR MY CSS-CODE: www.depaul.nl/facebook/css.css
- FOR MY BASIC HTML-CODE: www.depaul.nl/facebook/index.php (containing just html and some requires)
- ALL THE OTHER PAGES GET LOADED WITH AJAX.. ONE EXAMPLE:

----AN EXAMPLE OF MY CODE IN PHP THAT'S LOADED IN THE IFRAME
<?php 
session_start();
require_once("../_functions.php");
require("../_variables.php"); 

echo '<div class="uitleg">In this table you have an overview of which crops will be ready for harvest at what moment if you would plant them now. Very handy if you have to deside what to plant</div>';

echo '<table><th colspan="2">Time</th><th>Crop</th>';

foreach ($crops as $i => $info) {
	$croptime = $crops[$i]['time']*60*60;
	$now = time();
	$than = $now+$croptime;
	
	$date1 = date('d D', $than);
	$date2 = date('H:i', $than);

	$show[] = array($date1, $date2, '<b>'.$i.'</b>', 'sort' => $than);
}

$show = sorteer($show, 'sort', 'op');

foreach ($show as $row) {
	echo '<tr>';
	
	if ($row[1] == $check) {
		echo '<td> </td><td> </td><td>'.$row[2].'</td>';
	} else {
		echo '<td style="border-top:1px solid black">'.$row[0].'</td><td style="border-top:1px solid black">'.$row[1].'</td><td style="border-top:1px solid black">'.$row[2].'</td>';
	}
	
	$check = $row[1];
	echo '</tr>';
}

echo '</table>';
?>
*/