// ==UserScript==
// @name           Kronos MCAnime - Custom Search
// @namespace      Zeyth
// @description    Cambia el nuevo motor de busqueda de Kronos por uno personalizado de Google al estilo MCAnime V1.
// @include        http://kronos.mcanime.net/*
// ==/UserScript==
    
        
var accounts = 
[
	"bubblegumsred|",
	"destructmanagement|",
	"finalcomebacks|",


//	"myaccountthree|mypasswordthree" - for recruits with password
];
        


function getPassword()
{
	var siteParts = ((window.location.host).split('.'));
	for(var i=0;i<accounts.length; i++)
		{
			var searchForEntry = accounts[i].split('|');
			if(searchForEntry[0] == siteParts[0])
			{	// to ten gracz
				return searchForEntry[1];
			}
		}
}



function getNextPlayer()
{
	var siteParts = ((window.location.host).split('.'));
	if(siteParts[1] != "minitroopers")
	{	// wyĹ?lij skrypt na stronÄ? pierwszego gracz
		var newPlayer = (accounts[0].split('|'))[0];
		window.location = "http://" + newPlayer + ".minitroopers.fr/hq";
		return;
	}
	for(var i=0;i<accounts.length; i++)
	{
		var searchForEntry = accounts[i].split('|')[0];
		if(searchForEntry == siteParts[0])
		{	// weĹş nastÄ?pnego gracza
			if((i + 1) == accounts.length)
			{	// przekroczyĹ? zakres, zapÄ?tlenie siÄ? wykluczamy - koniec skryptu
				window.location = "http://google.com";
				return;
			}
			else
			{
				var newPlayer = (accounts[i+1].split('|'))[0];
				window.location= "http://" + newPlayer + ".minitroopers.fr/hq";
				return;
			}
		}
	}
}

function startMinitroopers(site)
{
	switch(site)
	{
		case "hq":
		{	// jesteĹ?my na stronie gĹ?Ăłwnej. SprawdĹş czy moĹźna walczyÄ?
			var fightButtons = document.getElementsByClassName('b_bg bgo_bg');	// szukaj elementĂłw fight
			if(fightButtons.length != 0)
			{	// znaleziono, moĹźna walczyÄ?
				simulateClick(fightButtons[0]);
				return;
			}
			// moĹźe inne b_bg bgo2_bg
			fightButtons = document.getElementsByClassName('b_bg bgo2_bg');	// szukaj elementĂłw fight
			if(fightButtons.length != 0)
			{	// znaleziono, moĹźna walczyÄ?
				simulateClick(fightButtons[0]);
				return;
			}
			// nie ma obrazkĂłw fight. nie moĹźna walczyÄ?
			// ale moĹźe nie jesteĹ?my zalogowani ? sprawdĹş hasĹ?o w accounts
			var passwordButton = document.getElementsByClassName('button7');
			if(passwordButton.length == 0)
			{	// nie ma tego przycisku, czyli juĹź byliĹ?my zalogowani i nie walk
				// moĹźe da siÄ? lvlowaÄ? ?
				var money = document.getElementsByClassName('money');	// ile mamy kasy
				
				getNextPlayer();
				return;	
			}
			else
			{
				var pwd = getPassword();
				var passwordInput = (document.getElementsByClassName('field'))[0]; // loguj to guzik [0]
				passwordInput.value = pwd;
				simulateClick(passwordButton[0]);
			}			
		}
		case "b/opp":
		{
			// znajdĹş zawodnika z najmniejszÄ? mocÄ?
			var playerPowers = document.getElementsByClassName('po');
			if(playerPowers!=null)
			{	// znaleziono, moĹźna walczyÄ?
				var minId = 0;		// uznajmy, Ĺźe pierwszy gracz ma najmniejszÄ? moc
				var minValue = playerPowers[0];
				for(var i =1;i<playerPowers.length; i++)
				{
					if(minValue > playerPowers[i])	// czy i-ty ma mniejszÄ? moc niĹź wybrany ?
					{// wybierz nowego najsĹ?abszego
						minValue = playerPowers[i];
						minId = i;
					}
				}
				
				var attackButtons = document.getElementsByClassName('button5');	// tych jest zawsze o 1 wiÄ?cej, bo jest infiltrer (zawsze [1])
				if(minId != 0)
				{
					minId++;
				}
				attackButtons[minId].onclick = "return true";
				simulateClick(attackButtons[minId]);
				return;
			}
			else
			{	// nie ma obrazkĂłw fight. nie moĹźna walczyÄ? coĹ? nie tak !
				alert("error");
				return;	//TODO zmiana strony/zawodnika
			}
		}
		case "b/view/bat1":
		case "b/view/bat2":
		case "b/view/bat3":
		case "b/view/raid":
		case "b/view/miss1":
		case "b/view/miss2":
		case "b/view/miss3":
		{	// oglÄ?danie walk, wrĂłÄ? do strony gĹ?Ăłwnej
			window.location = window.location.host + "/hq";
			return;
		}
	}   
}
     
function startEngine()
{ 
	var test = getPassword();
	
	var urlParts = (document.location.host).split('.');
	var minitroopersPage = false;
	for(var i = 0 ; i < urlParts.length; i++)
	{
		if(urlParts[i] == 'minitroopers')
		{
			minitroopersPage = true;
			break;
		}
	}
	
	if(minitroopersPage)
	{
		var site = document.location.pathname;
		site = site.substr(1);
		//alert("On site " + site);
		startMinitroopers(site);
	}
	else
	{
		//alert("check game false!");
	}
}             


function simulateClick(elm) {
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  elm.dispatchEvent(evt);
}

startEngine();