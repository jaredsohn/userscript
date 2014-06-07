// ==UserScript==
// @name           Cheat
// @namespace      http://neopets.com
// @include        http://www.neopets.com/games/cheat*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

function random(from, to)
{
    return Math.floor(Math.random() * (to-from)) + from;
}

if(document.body.innerHTML.indexOf('maximum') != -1){
	return;
	//setTimeout(location.replace("http://www.neopets.com/"), random(1000,2000));
}

while(document.body.innerHTML.indexOf('play cards') != -1){
	window.setTimeout(function(){location.replace("http://www.neopets.com/games/cheat/index.phtml");}, random(1000,2000));
	break;
}

var allInput, thisInput, seconds;
allInput = document.evaluate('//input[@value]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allInput.snapshotLength; i++) {
	thisInput = allInput.snapshotItem(i);
    switch (thisInput.value) {
		case 'Click here to begin the game!':
		window.setTimeout(function(){thisInput.click();}, random(1000,2000));
			return;
            break;
        case 'Continue playing Cheat!':
        setTimeout(thisInput.click(), seconds);
			return;
            break;
		case 'Click to Continue':
		window.setTimeout(function(){thisInput.click();}, random(1000,2000));
			return;
            break;
		case 'Play Again':
		seconds = Math.random() * 2345
		window.setTimeout(thisInput.click(), seconds);
			return;
			break;
		case 'Go!':
		seconds = Math.random() * 2345;
		if(document.body.innerHTML.indexOf('You can play cards of') != -1){
			for (var j = i + 1; j < allInput.snapshotLength; j++) {thisInput = allInput.snapshotItem(j);
				switch (thisInput.value) {
					case 'Go!':
					var op = document.getElementsByTagName("option");
					var ops = [];
					for(var i = 0; i < 4; i++){
						ops.push(op[i].value);
					}
					var imgs = document.getElementsByTagName("img");
					var b = document.getElementsByTagName('b');
					var bs = b[16].textContent;
					var myCards = [];
					for (var i = 18; i < (18 + (bs * 2)); i++) {
						var pic = imgs[i].src.substring(38, 40);
						pic = pic.replace('_', '');
						if(pic == 14){
							pic = 1;
						}
						var pic2 = imgs[i].src.substring(40, 42);
						pic2 = pic2.replace('_', '');
						pic2 = pic2.substring(0, 1).toUpperCase();
						myCards.push(pic2 + pic);
						i++;
					}
					var s = Math.floor(Math.random() * (op.length)) + 1;
					$('select').val(s);
					var cd = Math.floor(Math.random() * (bs));
					set_card(myCards[cd]);
					setTimeout(thisInput.click(), seconds);
					default:
				}
			}
		}
        default:
}}

if(document.body.innerHTML.indexOf('played 1') != -1){
var pl = document.body.innerHTML.indexOf(' played 1')
var anm = document.body.innerHTML.indexOf(document.body.innerHTML.substring(pl-10,pl))
var cards = parseInt(document.body.innerHTML.substring(anm+15,anm+26).replace(/[^0-9]/g, ''))
if(document.body.innerHTML.indexOf('Spectre') != -1) {window.setTimeout(function(){document.getElementsByName('CheatYes')[0].click();}, random(1000,2000));}
if(1 / cards > .49) {window.setTimeout(function(){document.getElementsByName('CheatYes')[0].click();}, random(1000,2000));}
if(1 / cards < .49) {window.setTimeout(function(){document.getElementsByName('CheatNo')[0].click();}, random(1000,2000));}
window.setTimeout(function(){document.getElementsByName('CheatYes')[0].click();}, random(1000,2000))
}
if(document.body.innerHTML.indexOf('played 2') != -1){
var pl=document.body.innerHTML.indexOf(' played 2')
var anm=document.body.innerHTML.indexOf(document.body.innerHTML.substring(pl-10,pl))
var cards=parseInt(document.body.innerHTML.substring(anm+15,anm+26).replace(/[^0-9]/g, ''))
if(2 / cards > .25) {window.setTimeout(function(){document.getElementsByName('CheatYes')[0].click();}, random(1000,2000));}
if(2 / cards < .25) {window.setTimeout(function(){document.getElementsByName('CheatNo')[0].click();}, random(1000,2000));}
window.setTimeout(function(){document.getElementsByName('CheatYes')[0].click();}, random(1000,2000))
}
if(document.body.innerHTML.indexOf('played 3') != -1){
var pl = document.body.innerHTML.indexOf(' played 3')
var anm = document.body.innerHTML.indexOf(document.body.innerHTML.substring(pl-10,pl))
var cards = parseInt(document.body.innerHTML.substring(anm+15,anm+26).replace(/[^0-9]/g, ''))
if(3 / cards > .24) {window.setTimeout(function(){document.getElementsByName('CheatYes')[0].click();}, random(1000,2000));}
if(3 / cards < .24) {window.setTimeout(function(){document.getElementsByName('CheatNo')[0].click();}, random(1000,2000));}
window.setTimeout(function(){document.getElementsByName('CheatYes')[0].click();}, random(1000,2000))
}
if(document.body.innerHTML.indexOf('played 4') != -1){
var pl = document.body.innerHTML.indexOf(' played 4')
var anm = document.body.innerHTML.indexOf(document.body.innerHTML.substring(pl-10,pl))
var cards = parseInt(document.body.innerHTML.substring(anm+15,anm+26).replace(/[^0-9]/g, ''))
if(4 / cards > .2) {window.setTimeout(function(){document.getElementsByName('CheatYes')[0].click();}, random(1000,2000));}
if(4 / cards < .2) {window.setTimeout(function(){document.getElementsByName('CheatNo')[0].click();}, random(1000,2000));}
window.setTimeout(function(){document.getElementsByName('CheatYes')[0].click();}, random(1000,2000))
}