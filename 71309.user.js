// ==UserScript==
// @name           Faction Lottery
// @namespace      apache1990.dod.net
// @description    Randomly picks someone from your faction members list, so you can do lotteries or something.
// @include        *.war-facts.com/extras/faction_members.php*
// ==/UserScript==


unsafeWindow.doStuff = function(){
	unsafeWindow.randomNumber = Math.floor(Math.random() * document.getElementsByTagName('tr').length + 1);
	if(document.getElementsByTagName('tr')[unsafeWindow.randomNumber].getElementsByTagName('td')[0].innerHTML.indexOf('WINS!') == -1){
		document.getElementsByTagName('tr')[unsafeWindow.randomNumber].getElementsByTagName('td')[0].innerHTML += " WINS!";
	}else{
		unsafeWindow.doStuff();
	}
	
	return;
}

var thing = document.createElement('p');
thing.innerHTML = "<input type='button' onclick='doStuff();' value='Random Faction Member' />";
document.getElementsByTagName('p')[0].appendChild(thing);