// ==UserScript==
// @name           Casino Choice Maker
// @namespace      http://
// @include        http://www.bootleggers.us/keno.php

// @include        http://www.bootleggers.us/race.php
// ==/UserScript==

function rand(n) {
	return Math.floor(Math.random() * n + 1 );
}

if ( document.title != 'Bootleggers :: Jail' ) {
	if ( window.location.href == 'http://www.bootleggers.us/keno.php' ) {
		// ####################
		// Keno code from BL
		// ####################
		var nums = 1;
		function changeto(pickId){
			if(nums <= 10 && (document.getElementById('num' + pickId).style.backgroundColor != 'red') && (document.getElementById('previouslySelected').value == 0)){
				document.getElementById('value' + nums).value=pickId;
				document.getElementById('num' + pickId).style.backgroundColor='red';
				nums++;
			}
		}

		function runKeno() {
			i = 0;
			while ( i <= '10' ) {
				changeto(rand(80))
				i++;
			}
		}

		document.getElementsByTagName('form')[0].getElementsByTagName('table')[0].getElementsByTagName('td')[82].innerHTML += ' <input type="button" id="randomNumbers" value="Random" />';
		document.getElementById('randomNumbers').addEventListener('click', runKeno, false);
	} else
	if ( window.location.href == 'http://www.bootleggers.us/race.php' ) {
		// ####################
		// Race code from BL
		// ####################
		var table = document.getElementsByTagName('form')[0]

		var old = 'Unselected';
	
		function changeColor(color, hex){
		
			document.getElementById('onColor').innerHTML = '&nbsp;on <font color="#' + hex + '"><b>' + color + '</b></font>';
		
			if(old != 'Unselected'){
			
				document.getElementById('cell' + old).style.backgroundColor='#737373';
			
			}
		
			document.getElementsByTagName('form')[0].getElementsByTagName('table')[0].getElementsByTagName('td')[22].getElementsByTagName('input')[2].value=color;
		
			document.getElementById('cell' + color).style.backgroundColor='orange';
		
			old = color;
		
		}

		function runRace() {
			var colours = new Array('Yellow', 'Black', 'Blue', 'Red', 'Cyan', 'Green', 'White', 'Orange', 'Pink', 'Purple');
			var hex = new Array('FFFF00', '000000', '0000CC', 'FF0000', '00FFFF', '00CC33', 'FFFFFF', 'FF6600', 'FF6666', '990099');

			var randNum = rand(10) - 1
			changeColor(colours[randNum], hex[randNum]);
		}

		document.getElementsByTagName('form')[0].getElementsByTagName('table')[0].getElementsByTagName('td')[22].innerHTML += ' <input type="button" id="randomNumbers" value="Random" />';
		document.getElementById('randomNumbers').addEventListener('click', runRace, false);
	}
}