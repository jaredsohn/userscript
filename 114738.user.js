// ==UserScript==
// @name			Omerta Scratcher
// @version			1
// @date			20-01-2010
// @author			Morianti
// @namespace			OmertaScratcher
// @description			Avoid tedious scratching and checking for prices and do it automaticly
// @include			http://*barafranca.*/scratch.php
// @include			http://*barafranca.*/iminjail.php?redirect=%2Fscratch.php
// ==/UserScript==

//prep vars
var d = new Date();
var now = d.getMinutes();
var min = GM_getValue('min','');
var num = GM_getValue('num',0);
var oldies = GM_getValue('olds',0);

//stats
var cards = GM_getValue('cards',0);
var wins = GM_getValue('wins',0);
var money = GM_getValue('money',0);
var bullets = GM_getValue('bullets',0);
var dCards = GM_getValue('dCards',0);
var dWins = GM_getValue('dWins',0);
var dMoney = GM_getValue('dMoney',0);
var dBullets = GM_getValue('dBullets',0);
var day = GM_getValue('day',0);

//info box
var div = document.createElement('div');
div.id = 'info';
div.style.position = 'absolute';
div.style.top = '30px';
div.style.right = '50px';
div.style.border = '1px solid black';
div.style.backgroundColor = 'white';
div.style.color = 'black';
div.style.MozBorderRadius = '1px';
div.style.padding = '20px';
div.innerHTML = '<b>Omerta Scratcher Info:</b><br>';
document.body.appendChild(div);
var box = document.getElementById('info');

function reload() {
        window.location = '/scratch.php'; 

}
 

if(location.pathname != "/scratch.php") { //check jail or other stupid page

	setTimeout(reload, 60000);


} else {
	if(document.body.innerHTML.search('/static/images/userbadges/donateplus.png')!=-1) { //clicklimit
		setTimeout(function() { 
			window.location = 'http://'+document.location.hostname+'/scratch.php'; 
		}, (60-d.getSeconds()<30?60-d.getSeconds():30)*1000);
	} else {
		//check for old cards
		inputs = document.getElementsByTagName('input');
		var old = 0;
		for(i=0;i<inputs.length;i++){
			if(!isNaN(parseInt(inputs[i].value))) {
				old = 1;
				var pick = i-1;
			}
		}
		if(old && document.body.innerHTML.indexOf('color="red"')!=-1) {
			var click = function() { 
				document.getElementsByTagName('input')[pick].click(); 
			}
			olds = (inputs.length-1)/2;
			GM_setValue('olds', olds-1);
			setTimeout(click, 3000);
		} else if(document.getElementsByName('Check')[0]) { //look for "check" button
			var click = function() { 
				document.getElementsByName('Check')[0].click(); 
			}
			setTimeout(click, 3000);
		} else { //look for scratch button
			if(min != now) {
				GM_setValue('min',now);
				min = now;
				GM_setValue('num',0);
				num = 0;
			}
			if(num < 10) {

				var input = document.getElementsByTagName('input');
				for(i=0; i<input.length; i++){
					if(input[i].getAttribute('value') == 'Scratch!') {
						GM_setValue('num',num+1);

						if(oldies>0) { 
							GM_setValue('olds',oldies-1);
							setTimeout(function() {
								window.location = 'http://'+document.location.hostname+'/scratch.php';
							}, 3000);
						} else {
							var click = function() { 
								document.getElementsByName('scratch')[0].click(); 
							}
							setTimeout(click, 3000);
						}
					}
				}
			} else {
				setTimeout(function() { 
					window.location = 'http://'+document.location.hostname+'/scratch.php'; 
				}, (60-d.getSeconds())*1000);
			}
		}
		if(document.getElementsByName('goback')[0]){
			if(day != d.getDate()) {
				GM_setValue('day', d.getDate());
				GM_setValue('dCards', 0);
				GM_setValue('dWins', 0);
				GM_setValue('dBullets', 0);
				GM_setValue('dMoney', 0);

				dCards = dWins = dBullets = dMoney = 0;
			}

			cards++;
			dCards++;
			GM_setValue('cards',cards);
			GM_setValue('dCards',dCards);
			if(document.body.innerHTML.split('\n')[3].indexOf('<br>')!=-1) {
				var line = document.body.innerHTML.split('\n')[3].split('<br>')[1];
				var amount = parseInt(line.replace(/[^0-9]/g,''));

				if(!isNaN(amount)) {
					wins++;
					dWins++;

					GM_setValue('wins', wins);
					GM_setValue('dWins', dWins);
					if(amount<500) {
						bullets = bullets + amount;
						GM_setValue('bullets', bullets);
						dBullets = dBullets + amount;
						GM_setValue('dBullets', dBullets);
					} else {
						money = money + amount;
						GM_setValue('money', money);
						dMoney = dMoney + amount;
						GM_setValue('dMoney', dMoney);
					}
				}
			}
		}
		var calc = ((cards*5000)-money)
		if(calc < 0) { var calc = 0 }
		
		var calc2 = ((dCards*5000)-dMoney)
		if(calc2 < 0) { var calc2 = 0 }
				
		box.innerHTML += "<br><br><b>Stats All-time:</b><br><br>Cards scratched: " + number_format(cards, 0, '.', '.') + " ($ " + (number_format(cards*5000, 0, '.', '.')) + " spent)<br>Wins: " + number_format(wins, 0, '.', '.') + "<br>Money won: $ " + number_format(money, 0, '.', '.') + " <br>Bullets won: " + number_format(bullets, 0, '.', '.') + " <br>Win ratio: " + number_format(((wins/cards)*100), 2, ',', ',') + "%<br>Money / card: $ " + (Math.round(money/cards)) + "<br>Bullets / card: " + (Math.round(bullets/cards)) + " <br>Profit: $ " + number_format((money + (bullets*750) - (cards*5000)), 0, '.', '.') + " (750 p/b) <br>Price / bullet: $ " + number_format(calc / bullets, 0, '.', '.');
		box.innerHTML += "<br><br><b>Stats Today:</b><br><br>Cards scratched: " + number_format(dCards, 0, '.', '.') + " ($ " + (number_format(dCards*5000, 0, '.', '.')) + " spent)<br>Wins: " + number_format(dWins, 0, '.', '.') + "<br>Money won: $ " + number_format(dMoney, 0, '.', '.') + " <br>Bullets won: " + number_format(dBullets, 0, '.', '.') + " <br>Win ratio: " + number_format(((dWins/dCards)*100), 2, ',', ',') + "%<br>Money / card: $ " + (Math.round(dMoney/dCards)) + "<br>Bullets / card: " + (Math.round(dBullets/dCards)) +" <br>Profit: $ " + number_format((dMoney + (dBullets*750) - (dCards*5000)), 0, '.', '.') + " (750 p/b) <br>Price / bullet: $ " + number_format(calc2 / dBullets, 0, '.', '.') + " <br>";

	}
}
function number_format(a, b, c, d) {
 a = Math.round(a * Math.pow(10, b)) / Math.pow(10, b);
 e = a + '';
 f = e.split('.');
 if (!f[0]) {
  f[0] = '0';
 }
 if (!f[1]) {
  f[1] = '';
 }
 if (f[1].length < b) {
  g = f[1];
  for (i=f[1].length + 1; i <= b; i++) {
   g += '0';
  }
  f[1] = g;
 }
 if(d != '' && f[0].length > 3) {
  h = f[0];
  f[0] = '';
  for(j = 3; j < h.length; j+=3) {
   i = h.slice(h.length - j, h.length - j + 3);
   f[0] = d + i +  f[0] + '';
  }
  j = h.substr(0, (h.length % 3 == 0) ? 3 : (h.length % 3));
  f[0] = j + f[0];
 }
 c = (b <= 0) ? '' : c;
 return f[0] + c + f[1];
}