// ==UserScript==
// @name          Dark Throne - Polish Translation
// @namespace     http://riddle.pl/h/greasemonkey/darkthrone.pl-PL.user.js

// @author        ridd1e_PL

// @description   	contributors & testers: Acharius, Rabbbbit, Uwaman, Atol
// @description   	testers: tzeentch
// @description   	v. 1.0.2.2
// @description   	2006-01-02
// @description   	19:50

// @include       http://omega.darkthrone.com/*
// @include       http://www.omega.darkthrone.com/*

// @exclude       http://omega.darkthrone.com/forum/*
// @exclude       http://www.omega.darkthrone.com/forum/*

// @exclude       http://omega.darkthrone.com/recruit.dt*
// @exclude       http://www.omega.darkthrone.com/recruit.dt*

// @exclude       http://omega.darkthrone.com/recruiterloop.dt*
// @exclude       http://www.omega.darkthrone.com/recruiterloop.dt*


// ==/UserScript==

	var copyr, youhave;

	//-----//-----//----- sprawdzanie na ktorej stronie jestesmy //-----//-----//-----

	function pageEx(page) {
		if (win.indexOf('/' + page + '.dt') > -1) {
			return true;
		}
		return false;
	}
	
	//-----//-----//----- f-cja tlumaczace nazwy wlasne //-----//-----//-----	
	
	function namesUpgrades(s,minesuf) {
			s = s.replace('Level','Poziom');				 
			//-------------------------------------
			s = s.replace('Manor','Dworek');				 
			s = s.replace('Village','Wioska');				 
			s = s.replace('Town','Miasto');				 
			s = s.replace('Outpost','Posterunek');				 
			s = s.replace('Stronghold','Twierdza');				 
			s = s.replace('Fortress','Forteca');				 
			s = s.replace('Citadel','Cytadela');
			//-------------------------------------
			s = s.replace('Nickel Mine','Kopalni' + minesuf + ' Niklu');
			s = s.replace('Coal Mine','Kopalni' + minesuf + ' W\u0119gla');
			s = s.replace('Copper Mine','Kopalni' + minesuf + ' Miedzi');
			s = s.replace('Emerald Mine','Kopalni' + minesuf + ' Szmaragd\u00F3w');
			s = s.replace('Silver Mine','Kopalni' + minesuf + ' Srebra');
			s = s.replace('Gold Mine','Kopalni' + minesuf + ' Z\u0142ota');
			s = s.replace('Platinum Mine','Kopalni' + minesuf + ' Platyny');
			//-------------------------------------
			s = s.replace('Ladders','Drabiny');
			s = s.replace('Steeds','Rumaki');
			s = s.replace('Small Catapults','Ma\u0142e Katapulty');
			s = s.replace('Trebuchets','Trebusze');
			s = s.replace('Battering Rams','Tarany');
			s = s.replace('Large Catapults','Du\u017Ce Katapulty');
			s = s.replace('War Elephants','S\u0142onie Bojowe');
			//-------------------------------------
			s = s.replace('Scout Training','Wywiadowcy');
			s = s.replace('Camouflage Training','Kamufla\u017C');
			s = s.replace('Infiltration Training','Infiltracja');
			s = s.replace('Sabotage Training','Sabota\u017C');
			s = s.replace('Communication Center','Komunikacja');
			s = s.replace('Assassination Training','Zab\u00F3jstwo');
			s = s.replace('Hand to hand Combat Training','Walka Wr\u0119cz');
			//-------------------------------------
			s = s.replace('Spy Detection','Detekcja');
			s = s.replace('Guard Training','Stra\u017Cnicy');
			s = s.replace('Hand to Hand Combat','Walka Wr\u0119cz');
			s = s.replace('Weapons Training','Bro\u0144');
			s = s.replace('Interrogation','Przes\u0142uchanie');
			s = s.replace('Sentry Post','Plac\u00F3wka Wartownik\u00F3w');
			s = s.replace('Command Post','Plac\u00F3wka Dowodz\u0105ca');
			//-------------------------------------
			s = s.replace('Armory Upgrade','Zbrojownia Poziom');
			
			return s;
	}
	
	//-----//-----//----- f-cja dodajaca koncowke odmiany //-----//-----//-----	

	
	function pluralSyntax(base, one, few, many, q) {
		var len, ld, bld, text;
		var suff = new Array();
			suff[0] = one;
			suff[1] = few; 
			suff[2] = many;
		
		len = q.length;
		ld = q.substring(len - 1, len); //last digit
		bld = q.substring(len - 2, len - 1); //one digit before last 
		
		//alert(q);
		//alert(bld);
		//alert(ld);
		
		if (q == 1) {
			text = base + suff[0];
		}
		else if ((bld != 1) && ((ld >= 2) && (ld <= 4))) {
			text = base + suff[1];
		}
		else if ((bld == 1) || (ld == 0) || (ld == 1) || ((ld >= 5) && (ld <= 9))) {
			text = base + suff[2];
		}
		
		return text;		
	}
	
		//-----//-----//----- f-cje dodajaca link do forum KoA //-----//-----//-----	
		/*
			ze wzgledow etycznych prosze o nieusuwanie tego fragmentu kodu.
			napracowalismy sie aby stworzyc to spolszczenie i niech chociaz tak zostaniemy nagrodzeni :)
			do tego mala przezroczysta flaga ktora sie pojawia na stronie jest linkiem
			do tematu gdzie nalezy szukac uaktualnien i zglaszac bledy / pomylki w tlumaczeniu
		*/

	
	function addLink() {
		copyr = document.createElement('img');
		copyr.id = 'transico';
		copyr.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAMAAADImI%2BJAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAGUExURf%2F%2F%2F6gODvuS3y8AAABoSURBVHjaYmAgEgAEENEIIICIRgABRDQCCCCiEUAAEY0AAohoBBBARCOAACIaAQQQ0QgggBgYiQQAAUS0QoAAIlohQAARrRAggIhWCBBARCsECCCiFQIEENEKAQKIaIUAAUS0QoAAAwBDkwGRZvyiqwAAAABJRU5ErkJggg%3D%3D'
		with (copyr.style) {
			opacity = '.5';
			position = 'fixed';
			bottom = '5px';
			right = '5px';
			border = '1px inset #FFF';
		}
		copyr.addEventListener('mouseover', addLinkOver, true);
		copyr.addEventListener('mouseout', addLinkOut, true);	
		
		var copyrlink = document.createElement('a');
		
		copyrlink.href = 'http://riddle.pl/koa/viewtopic.php?t=719';
		copyrlink.title = 'Sprawd\u017A czy nie ma uaktualnie\u0144...'
		copyrlink.appendChild(copyr);		
		document.body.appendChild(copyrlink );			
	}
	
	function addLinkOver(event) { 
		copyr.style.opacity = '1';
		copyr.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAMAAADImI%2BJAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAwUExURe7u7ru7u0RERFVVVaqqqoiIiMzMzCIiIt3d3REREXd3d5mZmTMzM2ZmZv%2F%2F%2FwAAABKHv%2F4AAAG4SURBVHjaYuAnEgAEEAOxCgECCI9CZl5OJB5AAEEU8nBxYqhj5ePj40JwAQIIrJALKMbIzcfOycWDoo6Pj4OLHcoHCCAGiHm8DEBBZgY%2BDpjJTEBtTLwcQLXcELUAAQR1Iy87EwcfAzM3Hy%2BEz87AChFnAyplAKkECCCIQmaga9gYmJgZ2fjZuTj42Bi5eBmgrgA6C2wLQADBFPLyc%2FABLWLg4gZiBiAXaDQzIwPYoWAlAAEEUcjIx8vJx8HDAXI9HyOQywR0JUgZFxMXVCFAADFAzefl4QMy2fi4WPi4%2BVmACrn4uDn5gMIgjSAAEEAwhTzsfBz8%2FHx87Fx8LCATeYBOYwJbzAfxFkAAIRSycPKz8%2FEBTWAFKQSaxg9VCAl1gACCKGTl4GQChQFQFmQ1Gx8ziMkJClYuPjZwOAIEEAMkFji4WLm5WICBBvQ1HzBSmPkZ%2BNj5ga4ARxpIDUAAgRTyQqzgYwHGDDM%2FM9DvwLDhAHqIkQcYrAwQzwAEEEghJzMXFyMXJw8%2FJzi9cHKBogfkc7CdnJBYBQggXMmMETnlgABAAOFQyMXBgiYCEEA4FGImT4AAAwDuISd7msKWSQAAAABJRU5ErkJggg%3D%3D';
		event.preventDefault();		
	}
	
	function addLinkOut(event) { 
		copyr.style.opacity = '.5'; 
		copyr.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAMAAADImI%2BJAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAGUExURf%2F%2F%2F6gODvuS3y8AAABoSURBVHjaYmAgEgAEENEIIICIRgABRDQCCCCiEUAAEY0AAohoBBBARCOAACIaAQQQ0QgggBgYiQQAAUS0QoAAIlohQAARrRAggIhWCBBARCsECCCiFQIEENEKAQKIaIUAAUS0QoAAAwBDkwGRZvyiqwAAAABJRU5ErkJggg%3D%3D';
		event.preventDefault();
	}
	
	
	//-----//-----//----- f-cje tlumaczace tekst //-----//-----//-----	
	
	function translateProficiencies(s) {
		switch (s) {
			case "Skill" : s = "Umiej\u0119tno\u015B\u0107"; break;
			case "Current Bonus" : s = "Aktualny bonus"; break;
			case "Add" : s = "Dodaj"; break;
			case "Confirmation" : s = "Potwierdzenie"; break;
			case " Strength " : s = " Si\u0142a "; break;
			case " Constitution  " : s = " Wytrzyma\u0142o\u015B\u0107"; break;
			case " Wealth " : s = " Bogactwo "; break;
			case " Dexterity " : s = " Zr\u0119czno\u015B\u0107 "; break;
			case " Charisma " : s = " Charyzma "; break;
			case "(Offense)" : s = "(Atak)"; break;
			case "(Defense)" : s = " (Obrona)"; break;
			case "(Income)" : s = "(Przych\u00F3d)"; break;
			case "(Intelligence)" : s = "(Wywiad)"; break;
			case "(Reduced Armory Prices)" : s = "(Ni\u017Csze ceny w Zbrojowni)"; break;
		}
		if (s.indexOf('You currently have') > -1) {
			var words = s.split(' ');
			s = s.replace('unused',pluralSyntax('niewykorzystan','y','e','ych',words[3]));
			s = s.replace('points',pluralSyntax('punkt','','y','\u00F3w',words[3]));
			s = s.replace('point','punkt');
			
			s = s.replace('You currently have','Posiadasz');	
			s = s.replace('proficiency','');	
			s = s.replace('. ',' zdolno\u015Bci. ');	
			s = s.replace('You are level','Jeste\u015B na poziomie');	
		}
		
		s = s.replace('A proficiency point has been added.','Dodano punkt zdolno\u015Bci.');
		
		return s;
	}
	
	function translateMembers(s){
		switch (s) {
			case "Last Login" : s = "Ostatnie logowanie"; break;
			case "Your Link" : s = "Tw\u00F3j link"; break;
			case "Medals" : s = "Medale"; break;
			case "Game Progress" : s = "Post\u0119p gry"; break;
			case "Developer News" : s = "Newsy administrator\u00F3w"; break;
			case "Statistics" : s = "Statystyki"; break;
			case "Poll" : s = "Sonda"; break;
			case "Not Available" : s = "Niedost\u0119pny"; break;
			case "Anti Spam Policy" : s = "Polityka antyspamowa"; break;
			//---------------------------------
			case "Get your friends to click this link to get a citizen and 250 gold!" : s = "Nam\u00F3w swoich znajomych do klikni\u0119cia w ten link, a otrzymasz mieszka\u0144ca i 250 sztuk z\u0142ota!"; break;
			case "Before you send out your link, please read over our link clicking rules and " : s = "Przed wys\u0142aniem linka zapoznaj si\u0119 z zasadami klikania i nasz\u0105 "; break;
			//---------------------------------
			case "Game Features" : s = "Opcje gry"; break;
			case "Layout" : s = "Wygl\u0105d"; break;
			case "Game Graphics" : s = "Grafika"; break;
			case "Attacking" : s = "Atakowanie"; break;
			case "Spying" : s = "Szpiegowanie"; break;
			case "Alliances" : s = "Sojusze"; break;
			case "Advisor" : s = "Doradca"; break;
			case "Forum" : s = "Forum"; break;
			//---------------------------------
			case "Fort Health" : s = "Stan fortu"; break;
			case "Population" : s = "Populacja"; break;
			case "Army Size" : s = "Armia"; break;
			case "Offense" : s = "Atak"; break;
			case "Defense" : s = "Obrona"; break;
			case "Spy Offense" : s = "Wywiad"; break;
			case "Spy Defense" : s = "Kontrwywiad"; break;
			case "Attacks Won" : s = "Udane ataki"; break;
			case "Defends Won" : s = "Udana obrona"; break;
			case "Spy Victories" : s = "Udany wywiad"; break;
			case "Sentry Victories" : s = "Udany kontrwywiad"; break;
			case "Gold" : s = "Z\u0142oto"; break;
			case "Gold In Bank" : s = "Z\u0142oto w Banku"; break;
			case "Level" : s = "Poziom"; break;
			case "Experience to Next Level" : s = "Nast. poziom za"; break;
			//---------------------------------
			case "Overall Rank:" : s = "Ranking og\u00F3lny:"; break;
			case "Dark Throne recruiting is solely intended for your friends and family. Spam of any kind is not permitted and we take violations of our anti-spam policy very seriously. Violating our Anti-Spam policy will result in the suspension or deletion of your account. Before you begin recruiting friends please take the time to read our " : s = "Rekrutowanie w Dark Throne jest wy\u0142\u0105cznie zamierzone dla Twoich znajomych i rodziny. Spam jakiegokolwiek rodzaju jest zabroniony i traktujemy bardzo powa\u017Cnie ka\u017Cde z\u0142amanie naszej polityki antyspamowej. Z\u0142amanie naszej polityki antyspamowej zaskutkuje zawieszeniem b\u0105d\u017A usuni\u0119ciem Twojego konta. Przed rekrutowaniem swoich znajomych po\u015Bwi\u0119c chwil\u0119 czasu aby zaznajomi\u0107 si\u0119 z nasz\u0105 "; break;
			case "anti-spam policy" : s = "polityk\u0105 antyspamow\u0105"; break;
			//---------------------------------
		}
		if (s.indexOf('is a level') > -1) {
			s = s.replace('is a level','- Poziom');
			s = s.replace(' Elf',', Elf');
			s = s.replace(' Goblin',', Goblin');
			s = s.replace(' Human',', Cz\u0142owiek');
			s = s.replace(' Undead',', Nieumar\u0142y');
			s = s.replace('Cleric','Kap\u0142an');
			s = s.replace('Assassin','Zab\u00F3jca');
			s = s.replace('Fighter','Wojownik');
			s = s.replace('Thief','Z\u0142odziej');
		}
		if (s.indexOf('your friends register from your link') > -1) {
			s = s.replace('If your friends register from your link you will get','Je\u015Bli Twoi znajomi zarejestruj\u0105 si\u0119 z Twojego linka otrzymasz');
			s = s.replace('gold and 10 citizens','sztuk z\u0142ota i 10 mieszka\u0144c\u00F3w');
		}
		if (s.indexOf('Your last login was from') > -1) {
			s = s.replace('Your last login was from','Twoje ostatnie logowanie odby\u0142o si\u0119 z IP ');
			s = s.replace('January','Stycze\u0144 ');
			s = s.replace('February','Luty');
			s = s.replace('March','Marzec');
			s = s.replace('April','Kwiecie\u0144 ');
			s = s.replace('May','Maj');
			s = s.replace('June','Czerwiec');
			s = s.replace('July','Lipiec');
			s = s.replace('August','Sierpie\u0144 ');
			s = s.replace('September','Wrzesie\u0144 ');
			s = s.replace('October','Pa\u017Adzniernik');
			s = s.replace('November','Listopad');
			s = s.replace('December','Grudzie\u0144 ');
			
			var logged = /at [0-9]{1,}:[0-9]{2,} [ap]m/
	 
			if (logged.test(s)) {
				s = s.replace(' at ',' o '); 
				s = s.replace(' on ',' dnia '); 
				s = s.replace(' am ',' rano '); 
				s = s.replace(' pm ',' po po\u0142udniu '); 
			}
		}
		
		s = s.replace('Your current ip is','Twoje IP to');
		
		if (s.indexOf('You have ') > -1) {
			s = s.replace(/^\s+|\s+$/g, '');
			s += ' ';
			var words = s.split(' ');
			nrmsg = words[2];						
			s = s.replace('You have ','Masz ');
		}
		
		if (s == 'unread') {		
			s = s.replace('unread',pluralSyntax('nieprzeczytan','\u0105','e','ych',nrmsg));
		}
		
		s = s.replace('messages','wiadomo\u015Bci');
		s = s.replace('message','wiadomo\u015B\u0107');
		return s;
	}
	
	function translateMercenaries(s) {
		switch (s) {
			case " Gold Available: " : s = " Dost\u0119pne z\u0142oto: "; break;
			case "Mercenary Camps" : s = "Ob\u00F3z najemnik\u00F3w"; break;
			case "Upgrade Your Mercenary Camp" : s = "Ulepsz sw\u00F3j ob\u00F3z najemnik\u00F3w"; break;
			case "        You must first upgrade your fortification level before you can further upgrade your mercenary camps.      " : s = "        Najpierw musisz ulepszy\u0107 sw\u00F3j poziom fortyfikacji, zanim b\u0119dziesz m\u00F3g\u0142 ulepszy\u0107 ob\u00F3z najemnik\u00F3w.      "; break;
			case "Type" : s = "Typ"; break;
			case "Quantity Available" : s = "Dost\u0119pna ilo\u015B\u0107"; break;
			case "Cost" : s = "Koszt"; break;
			case "Hire Quantity" : s = "Wynajmij ilo\u015B\u0107"; break;
			case "Soldiers" : s = " \u017Bo\u0142nierze"; break;
			case "(Type 1)" : s = " (Typ 1)"; break;
			case "Guards" : s = " Stra\u017Cnicy"; break;
			case "Spies      " : s = " Szpiedzy      "; break;
			case "Sentries" : s = " Wartownicy"; break;
			case "(Anti Spy)" : s = " (Kontrwywiad)"; break;
			case "Error" : s = "B\u0142\u0105d"; break;
			case "Confirmation" : s = "Potwierdzenie"; break;
		}
		if (s.indexOf('You currently have') > -1) {
			s = s.replace('You currently have a level','W chwili obecnej posiadasz poziom');
			s = s.replace('mercenary camp. Every 24 hours you will be able to hire','obozu najemnik\u00F3w. Przez dob\u0119 b\u0119dziesz m\u00F3g\u0142 wynaj\u0105\u0107');
			s = s.replace('mercenaries','najemnik\u00F3w');
		}
		
			s = s.replace('You cannot hire more mercenaries of a given type than are available.','Nie mo\u017Cesz naj\u0105\u0107 wi\u0119cej najemnik\u00F3w danego typu ni\u017C jest dost\u0119pnych.');
			s = s.replace('Invalid quantity of mercenaries.','Nieprawid\u0142owa warto\u015B\u0107 najemnik\u00F3w.');
			s = s.replace('You do not have enough gold.','Nie masz wystarczaj\u0105cej ilo\u015Bci z\u0142ota.');
			s = s.replace('Upgrade completed successfully.','Ulepszenie zako\u0144czone pomy\u015Blnie.');
			
		if (s.indexOf('Upgrade to level') > -1) {
			s = s.replace('Upgrade to level','Ulepsz ob\u00F3z najemnik\u00F3w do poziomu');
			s = s.replace('mercenary camps for','za');
			s = s.replace('.','sztuk z\u0142ota.');
		}
		if (s.indexOf('have been hired') > -1) {
			var words = s.split(' ');
			s = s.replace('mercenaries',pluralSyntax('najemni','k','cy','k\u00F3w',words[6]));
			s = s.replace('have been',pluralSyntax('zosta','\u0142','\u0142o','li',words[6]));
			s = s.replace('hired',pluralSyntax('wynaj\u0119','ty','tych','tych',words[6]));
			s = s.replace('gold','sztuk z\u0142ota');			
		}
		
		s = s.replace('You must buy at least one mercenary','Musisz kupi\u0107 przynajmnij jednego najemnika');
		return s;
	}
	
	function translateMessaging(s) {
		switch (s) {
			case "New:" : s = "Nowe:"; break;
			case "Saved:" : s = "Zapisane:"; break;
			case "Sent:" : s = "Wys\u0142ane:"; break;
			case "Inbox" : s = "Skrzynka odbiorcza"; break;
			case "Saved" : s = "Zapisane"; break;
			case "Sent" : s = "Wys\u0142ane"; break;
			case "Friends" : s = "Znajomi"; break;
			case "Online:" : s = "Aktywni:"; break;
			case "Ignore" : s = "Ignorowani"; break;
			case "Compose" : s = "Napisz"; break;
			case "To" : s = "Do"; break;
			case "Subject" : s = "Temat"; break;
			case "Message" : s = "Wiadomo\u015B\u0107"; break;
			case "Code" : s = "Kod"; break;
			case "Error" : s = "B\u0142\u0105d"; break;
			case "Confirmation" : s = "Potwierdzenie"; break;
			case "profile" : s = "profil"; break;
			case "Click here" : s = "Kliknij tutaj"; break;
			case "Confirm Clear" : s = "Potwierd\u017A opr\u00F3\u017Cnienie"; break;
			case "Are you sure you want to PERMANENTLY delete all messages in your inbox?" : s = "Czy jeste\u015B pewien, \u017Ce chcesz CA\u0141KOWICIE usun\u0105\u0107 wszystkie wiadomo\u015Bci w Twojej skrzynce odbiorczej?"; break;
			case "      Administrators will never ask for your password or security code. Do not send this information to anyone." : s = "      Administratorzy nigdy nie zapytaj\u0105 Ci\u0119 o has\u0142o, lub inny kod. Nie podawaj ich nikomu!"; break;
		}
		
		s = s.replace('All unsaved messages older than 7 days will be deleted.','Wszystkie niezapisane wiadomo\u015Bci starsze ni\u017C 7 dni zostan\u0105 usuni\u0119te.');
		s = s.replace('You have no messages in this folder','Nie masz wiadomo\u015Bci w tym folderze');
		s = s.replace('unread message','nieprzeczytana wiadomo\u015B\u0107');
		s = s.replace('Pages','Strony');
		s = s.replace('You have no users in your ignore list','Nie masz nikogo na li\u015Bcie ignorowanych');
		s = s.replace('You have no users in your friends list','Nie masz nikogo na li\u015Bcie znajomych.');		
		s = s.replace('Up to 25 messages can be saved. Saved messages will not be deleted. ','Mo\u017Cesz zapisa\u0107 do 25 wiadomo\u015Bci. Nie b\u0119d\u0105 one usuni\u0119te.');
		
		var sending = /at [0-9]{2,}:[0-9]{2,} [ap]m on [0-9]{2,}\/[0-9]{2,}\/[0-9]{2,}/
 
		if (sending.test(s)) {
			s = s.replace(' at ',' o '); 
			s = s.replace(' on ',' dnia '); 
			s = s.replace(' am ',' rano '); 
			s = s.replace(' pm ',' po po\u0142udniu '); 
		}
		
		s = s.replace('Sent by ','Wys\u0142ane przez ');
		s = s.replace('Sent to ','Wys\u0142ane do ');
		s = s.replace('Sent messages cannot be deleted.','Wys\u0142ane wiadomo\u015Bci nie mog\u0105 by\u0107 usuni\u0119te.');
		s = s.replace('No user was found matching','Nie znaleziono u\u017Cytkownika o nazwie:'); 
		s = s.replace('has been added to your friends list','zosta\u0142 dodany do Twojej listy znajomych'); 
		s = s.replace('has been added to your ignore list','zosta\u0142 dodany do Twojej listy ignorowanych'); 
		s = s.replace('The selected user has been removed from your friends list.','Wybrana osoba zosta\u0142a usuni\u0119ta z Twojej listy znajomych.'); 
		s = s.replace('The selected user has been removed from your ignore list.','Wybrana osoba zosta\u0142a usuni\u0119ta z Twojej listy ignorowanych.'); 
		s = s.replace('Your message has been sent successfully to all recipients.','Twoja wiadomo\u015Bc zosta\u0142a przes\u0142ana do wszystkich odbiorc\u00F3w.'); 
		s = s.replace('if you are not forwarded or you do not wish to wait any longer',' je\u015Bli nie nast\u0119puje przekierowanie b\u0105d\u017A nie chcesz d\u0142u\u017Cej czeka\u0107'); 
		s = s.replace('The selected messages have been deleted.','Zaznaczone wiadomo\u015Bci zosta\u0142y usuni\u0119te.'); 
		s = s.replace('You are now being forwarded back to your inbox.', 'Jeste\u015B teraz przekierowywany do Twojej skrzynki odbiorczej.')
		s = s.replace('The selected message has been moved to your saved folder.','Zaznaczone wiadomo\u015Bci zosta\u0142y przeniesione do folderu Zapisane.'); 
		s = s.replace('Your inbox has been cleared','Twoja skrzynka odbiorcza zosta\u0142a opr\u00F3\u017Cniona'); 
		s = s.replace('No valid recipients.','Nie wpisano poprawnych adresat\u00F3w.'); 
		s = s.replace('Invalid subject.','Niepoprawny temat wiadomo\u015Bci.'); 
		s = s.replace('Invalid body.','Niepoprawna tre\u015B\u0107 wiadomo\u015Bci.'); 
		s = s.replace('You may not send messages to more than five users at once.','Nie mo\u017Cesz wys\u0142a\u0107 wiadomo\u015Bci do wi\u0119kszej ilo\u015Bci u\u017Cytkownik\u00F3w jak pi\u0119ciu.'); 

		return s;
	}
	
	function translateRepair(s) {
		switch (s) {
			case "Confirmation" : s = "Potwierdzenie"; break;
			case "Repair Fortification" : s = "Napraw fortyfikacj\u0119"; break;
			case " Gold Available: " : s = " Dost\u0119pne z\u0142oto: "; break;
			case "Error" : s = "B\u0142\u0105d"; break;
		}
		if (s.indexOf('Current') > -1) {
			s = s.replace('Current Fortification','Aktualna fortyfikacja');
			s = namesUpgrades(s,'');				 
		}			
		if (s.indexOf('Health') > -1) {
			s = s.replace('Fort','Wytrzyma\u0142o\u015B\u0107');
			s = s.replace('Health','fortu');				 
		}
		if (s.indexOf('Your fortification') > -1) {
			s = s.replace('Your fortification has been successfully repaired for','Twoja fortyfikacja zosta\u0142a pomy\u015Blnie naprawiona za');
			s = s.replace('gold','sztuk z\u0142ota');
		}

			s = s.replace('      Your fortification is already at full health.','Fortyfkacja ma ju\u017C pe\u0142n\u0105 wytrzyma\u0142o\u015B\u0107');


			s = s.replace('You cannot repair your fortification for more damage than it has.','Nie mo\u017Cesz naprawi\u0107 fortyfikacji ponad obra\u017Cenia jakich dozna\u0142a.');
	

			s = s.replace('Invalid number.','Nieprawid\u0142owa warto\u015B\u0107.');

		if (s.indexOf('Repair Cost') > -1) {
			s = s.replace('Repair Cost','Koszt naprawy');
			s = s.replace('gold per point','sztuk z\u0142ota za punkt wytrzyma\u0142o\u015Bci');
		}

			s = s.replace('Total cost to repair fortification','Ca\u0142kowity koszt naprawy fortyfkacji');


		return s;
	}
	
	function translateArmory(s) {
		switch (s) {
			case "Offensive" : s = "Ofensywne"; break;
			case "Defensive" : s = "Defensywne"; break;
			case "Spy Offense" : s = "Wywiadowcze"; break;
			case "Sentry Defense" : s = "Kontrwywiadowcze"; break;
			case "Confirmation" : s = "Potwierdzenie"; break;
			//---------------------------------
			case " Gold Available: " : s = " Dost\u0119pne z\u0142oto: "; break;
			case "Back to Top" : s = "Wr\u00F3\u0107 na g\u00F3r\u0119"; break;
			//---------------------------------
			case "Name" : s = "Nazwa"; break;
			case "You Have" : s = "Posiadasz"; break;
			case "Cost" : s = "Koszt"; break;
			case "Sell Cost" : s = "Sprzeda\u017C"; break;
			case "Stats" : s = "Statystyki"; break;
			case "Quantity" : s = "Ilo\u015B\u0107"; break;
			//---------------------------------
			case "Type I - Weapon" : s = "Typ I - Bro\u0144"; break;
			case "Type II - Helm" : s = "Typ II - He\u0142m"; break;
			case "Type III - Armor" : s = "Typ III - Zbroja"; break;
			case "Type IV - Boots" : s = "Typ IV - Buty"; break;
			case "Type V - Bracers" : s = "Typ V - Naramienniki"; break;
			case "Type VII - Shield" : s = "Typ VIII - Tarcza"; break;
			case "Type VI - Cloak" : s = "Typ VI - Peleryna"; break;
			//---------------------------------
			case "Club" : s = "Pa\u0142ka"; break;
			case "Hatchet" : s = "Siekiera"; break;
			case "Dagger" : s = "Sztylet"; break;
			case "Short Sword" : s = "Kr\u00F3tki Miecz"; break;
			case "Quarterstaff" : s = "Kij bojowy"; break;
			case "Mace" : s = "Bu\u0142awa"; break;
			case "Long Sword" : s = "D\u0142ugi Miecz"; break;
			case "Steel Helmet" : s = "Stalowy He\u0142m"; break;
			case "Knight's Helmet" : s = "He\u0142m Rycerza"; break;
			case "Warrior's Helmet" : s = "He\u0142m Wojownika"; break;
			case "Padded Armor" : s = "Pikowana Zbroja"; break;
			case "Studded-Leather Armor" : s = "\u0106wiekowana Zbroja"; break;
			case "Chainmail Armor" : s = "Kolczuga"; break;
			case "Leather Boots" : s = "Sk\u00F3rzane Buty"; break;
			case "Steel Boots" : s = "Stalowe Buty"; break;
			case "Knight's Boots" : s = "Buty Rycerza"; break;
			case "Leather Bracers" : s = "Sk\u00F3rzane Naramienniki"; break;
			case "Steel Bracers" : s = "Stalowe Naramienniki"; break;
			case "Knight's Bracers" : s = "Naramienniki Rycerza"; break;
			case "Wooden Shield" : s = "Drewniana Tarcza"; break;
			case "Iron Shield" : s = "\u017Belazna Tarcza"; break;
			case "Steel Shield" : s = "Stalowa Tarcza"; break;
			//---------------------------------
			case "Sling" : s = "Proca"; break;
			case "Short Bow" : s = "Kr\u00F3tki \u0141uk"; break;
			case "Spear" : s = "W\u0142\u00F3cznia"; break;
			case "Flail" : s = "Korbacz"; break;
			case "Long Bow" : s = "D\u0142ugi \u0141uk"; break;
			case "Archer's Helmet" : s = "He\u0142m \u0141ucznika"; break;
			case "Imperial Helmet" : s = "He\u0142m Imperialny"; break;
			case "Padded Boots" : s = "Pikowane Buty"; break;
			case "Studded-Leather Boots" : s = "\u0106wiekowane Buty"; break;
			case "Imperial Boots" : s = "Buty Imperialne"; break;
			case "Padded Bracers" : s = "Pikowane Naramienniki"; break;
			case "Imperial Bracers" : s = "Imperialne Naramienniki"; break;
			case "Medium Shield" : s = "\u015Arednia Tarcza"; break;
			case "Steel Shield" : s = "Stalowa Tarcza"; break;
			//---------------------------------
			case "Boots of Speed" : s = "Buty Szybko\u015Bci"; break;
			case "Cloak of Invisibility" : s = "P\u0142aszcz Niewidzialno\u015Bci"; break;
			case "Halberd" : s = "Halabarda"; break;
			case "Helm" : s = "He\u0142m"; break;
			case "Full Leather Armor" : s = "Pe\u0142na Zbroja Sk\u00F3rzana"; break;
			case "Buckler" : s = "Puklerz"; break;
			//---------------------------------
			case "Error" : s = "B\u0142\u0105d"; break;
		}
		
		s = s.replace('Not Available: Requires Armory Upgrade','Niedost\u0119pne: Wymagana Zbrojownia Poziom');
		
		if ((s.indexOf('offensive troops') > -1) && (s.indexOf('defensive troops') > -1)) {
			s = s.replace('You have','Masz');
			s = s.replace('offensive troops and','jednostek ofensywnych i');
			s = s.replace('defensive troops','jednostek defensywnych');
		}
		if ((s.indexOf('spies and') > -1) && (s.indexOf('sentries') > -1)) {
			s = s.replace('You have','Masz');
			s = s.replace('spies and','Szpieg\u00F3w i');
			s = s.replace('spy and','Szpiega i');
			s = s.replace('sentries','Wartownik\u00F3w');
			s = s.replace('sentry','Wartownika');
		}
		
		if ((s.indexOf('item was bought for') > -1) || (s.indexOf('items were bought for') > -1)) {
			var words = s.split(' ');	
			s = s.replace('items were bought for', pluralSyntax('przedmiot','','y','\u00F3w', words[6]) + ' kupiono za');
			s = s.replace('item was bought for', 'przedmiot kupiono za');
			s = s.replace('gold', 'sztuk z\u0142ota');
		}		
		
		if ((s.indexOf('Adds') > -1) && s.indexOf('to Offense') > -1) {
			s = s.replace('Adds','Dodaje');
			s = s.replace('to Offense','do Ataku');
		}
		if ((s.indexOf('Adds') > -1) && s.indexOf('to Defense') > -1) {
			s = s.replace('Adds','Dodaje');
			s = s.replace('to Defense','do Obrony');
		}
		if ((s.indexOf('Adds') > -1) && s.indexOf('to Spy Offense') > -1) {
			s = s.replace('Adds','Dodaje');
			s = s.replace('to Spy Offense','do Wywiadu');
		}
		if ((s.indexOf('Adds') > -1) && s.indexOf('to Spy Defense') > -1) {
			s = s.replace('Adds','Dodaje');
			s = s.replace('to Spy Defense','do Kontrwywiadu');
		}
		if (s.indexOf('Invalid quantity of') > -1) {
			s = s.replace('Invalid quantity of','Nieprawid\u0142owa warto\u015B\u0107');
			s = s.replace('Club','Pa\u0142ki');
			s = s.replace('Hatchet','Siekiery');
			s = s.replace('Dagger','Sztyletu');
			s = s.replace('Short Sword','Kr\u00F3tkiego Miecza');
			s = s.replace('Quarterstaff','Laski');
			s = s.replace('Mace','Bu\u0142awy');
			s = s.replace('Long Sword','D\u0142ugiego Miecza');
			s = s.replace('Steel Helmet','Stalowego He\u0142mu');
			s = s.replace('Knight\'s Helmet','He\u0142mu Rycerza');
			s = s.replace('Warrior\'s Helmet','He\u0142mu Wojownika');
			s = s.replace('Padded Armor','Pikowanej Zbroi');
			s = s.replace('Studded-Leather Armor','\u0106wiekowanej Zbroi');
			s = s.replace('Chainmail Armor','Kolczugi');
			s = s.replace('Leather Boots','Sk\u00F3rzanych But\u00F3w');
			s = s.replace('Steel Boots','Stalowych But\u00F3w');
			s = s.replace('Knight\'s Boots','But\u00F3w Rycerza');
			s = s.replace('Leather Bracers','Sk\u00F3rzanych Naramiennik\u00F3w');
			s = s.replace('Steel Bracers','Stalowych Naramiennik\u00F3w');
			s = s.replace('Knight\'s Bracers','Naramiennik\u00F3w Rycerza');
			s = s.replace('Wooden Shield','Drewnianej Tarczy');
			s = s.replace('Iron Shield','\u017Belaznej Tarczy');
			s = s.replace('Steel Shield','Stalowej Tarczy');
			s = s.replace('Sling','Procy');
			s = s.replace('Short Bow','Kr\u00F3tkiego \u0141uku');
			s = s.replace('Spear','W\u0142\u00F3czni');
			s = s.replace('Flail','Korbacza');
			s = s.replace('Long Bow','D\u0142ugiego \u0141uku');
			s = s.replace('Archer\'s Helmet','He\u0142mu \u0141ucznika');
			s = s.replace('Imperial Helmet','He\u0142mu Imperialnego');
			s = s.replace('Padded Boots','Pikowanych But\u00F3w');
			s = s.replace('Studded-Leather Boots','\u0106wiekowanych But\u00F3w');
			s = s.replace('Imperial Boots','But\u00F3w Imperialnych');
			s = s.replace('Padded Bracers','Pikowanych Naramiennik\u00F3w');
			s = s.replace('Imperial Bracers','Imperialnych Naramiennik\u00F3w');
			s = s.replace('Medium Shield','\u015Aredniej Tarczy');
			s = s.replace('Steel Shield','Stalowej Tarczy');
			s = s.replace('Boots of Speed','But\u00F3w Szybko\u015Bci');
			s = s.replace('Cloak of Invisibility','P\u0142aszcza Niewidzialno\u015Bci');
			s = s.replace('Halberd','Halabardy');
			s = s.replace('Helm','He\u0142mu');
			s = s.replace('Full Leather Armor','Pe\u0142nej Zbroi Sk\u00F3rzanej');
			s = s.replace('Buckler','Puklerza');
		}

		s = s.replace('Insufficient gold to complete transaction.','Niewystarczaj\u0105ca ilo\u015B\u0107 z\u0142ota aby dope\u0142ni\u0107 transakcji.');
		s = s.replace('Please select item(s) to buy','Prosz\u0119 wybra\u0107 przedmiot(y) do kupienia');		
			
		return s;
	}
	
	function translateClicklog(s) {
		switch (s) {
			case "Recruit Statistics" : s = "Statystyki rekrutowania"; break;
			case "In the Last 24 Hours" : s = "Ostatnia doba"; break;
			case "Total" : s = "Razem"; break;
			case "Referrals" : s = "Przekierowania"; break;
		}
		return s;
	}
	
	function translateHousing(s) {
		switch (s) {
			case " Gold Available: " : s = " Dost\u0119pne z\u0142oto: "; break;
			case "Housing" : s = "Domy"; break;
			case "upgrade" : s = "ulepsz"; break;
		}
		if (s.indexOf('currently have') > -1) {
			s = s.replace('You currently have','Aktualnie posiadasz');
			s = s.replace('houses','dom\u00F3w');
			s = s.replace('house','dom');
		}
		if (s.indexOf('additional citizens') > -1) {
			s = s.replace('You will gain','Uzyskujesz');
			s = s.replace('additional citizens per day','dodatkowych mieszka\u0144c\u00F3w na dzie\u0144');
			s = s.replace('additional citizen per day','dodatkowego mieszka\u0144ca na dzie\u0144');
		}

			s = s.replace('You may not build any more houses. To increase the amount of houses available,','Nie mo\u017Cesz wybudowa\u0107 wi\u0119cej dom\u00F3w. Aby zwi\u0119kszy\u0107 liczb\u0119 dost\u0119pnych dom\u00F3w,');

		s = s.replace('your fortification level','najpierw poziom swojej fortyfikacji');

		if (s.indexOf('You may build up to') > -1) {
			var words = s.split(' ');
			s = s.replace('houses',pluralSyntax('dom','','y','\u00F3w',words[5]));
			s = s.replace('house','dom');			
			s = s.replace('You may build up to','Mo\u017Cesz zbudowa\u0107 jeszcze');
		}

		s = s.replace('Number of Houses ','Liczba dom\u00F3w');
		s = s.replace('per house)','za dom');

		if (s.indexOf('bought successfully') > -1) {
			var words = s.split(' ');
			s = s.replace('houses',pluralSyntax('dom','','y','\u00F3w',words[6]));
			s = s.replace('house','dom');
			s = s.replace('bought successfully','kupiono pomy\u015Blnie');
		}		
		return s;
	}
	
	function translateRecruitermain(s) {
	//you have been added to the list
	
		switch (s) {
			case "Need more citizens? You can gain an additional 25 citizens per day by recruiting friends and family, using your recruit link outside of the official recruiter." : s = "Potrzebujesz wi\u0119cej mieszka\u0144c\u00F3w? Ka\u017Cdego dnia mo\u017Cesz otrzyma\u0107 ich 25 wi\u0119cej rekrutuj\u0105c przyjaci\u00F3\u0142 i rodzin\u0119 poza oficjalnym rekruterem, u\u017Cywaj\u0105c swojego rekrutuj\u0105cego linka."; break;
			case "Public Recruiter Statistics" : s = "Statystyki publicznego rekrutera"; break;
			case "Credits" : s = "Kredyty"; break;
			case "Given" : s = "Kliki"; break;
			case "Received" : s = "Otrzymane"; break;
			case "Members" : s = "Cz\u0142onkowie"; break;
			case "Status" : s = "Status"; break;
			case "Maximum" : s = "Maksimum"; break;
			case "Enabled" : s = "Mo\u017Cesz kilka\u0107"; break;
		}
		if (s.indexOf('clicks remaining today') > -1) {
			s = s.replace('You have made','Kilkn\u0105\u0142e\u015B dzisiaj');
			s = s.replace('clicks today','razy');
			s = s.replace('You have','Masz jeszcze dzisiaj');
			s = s.replace('clicks remaining today','mo\u017Cliwych klikni\u0119\u0107');
		}
		if (s.indexOf('from DarkRecruiter') > -1) {
			s = s.replace('So far today you have received','Jak dot\u0105d otrzyma\u0142e\u015B');
			s = s.replace('citizens from DarkRecruiter','mieszka\u0144c\u00F3w z DarkRecruiter\'a');
		}
		if (s.indexOf('standard recruiting') > -1) {
			s = s.replace('Including standard recruiting, you gained','Wliczaj\u0105c standardowe rekrutowanie, otrzyma\u0142e\u015B');
			s = s.replace('recruits','rekrut\u00F3w');
		}
		
		s = s.replace('You do not receive citizens as soon as you are finished clicking, but when other people click your link. This does not happen right away, and you will receive your citizens over the course of the day','Nie otrzymujesz mieszka\u0144c\u00F3w zaraz po zako\u0144czeniu klikania, lecz gdy inni ludzie klikn\u0105 w Tw\u00F3j link. To si\u0119 nie stanie od razu, b\u0119dziesz otrzymywa\u0107 ludzi w miar\u0119 up\u0142ywu dnia');
		
		//Due to players using automated programs which hurt our site, refreshing has been disabled. Please use the recruit! button on the recruiter. Click *here* to continue.

		return s;
	}
	
	function translateSettings(s) {
		switch (s) {
			case "Change Password" : s = "Zmie\u0144 has\u0142o"; break;
			case "Enter Current Password" : s = "Wpisz aktualne has\u0142o"; break;
			case "New Password" : s = "Nowe has\u0142o"; break;
			case "Verify Password" : s = "Potwierd\u017A has\u0142o"; break;
			case "The password you will use to authorize your account, only fill this in if you wish to change your password" : s = "Has\u0142o, kt\u00F3re b\u0119dzie potrzebne podczas autoryzacji Twojego konta, wype\u0142nij tylko wtedy gdy chcesz aby zosta\u0142o zmienione."; break;
			case "Change Email" : s = "Zmie\u0144 Email"; break;
			case "Current Email" : s = "Aktualny Email"; break;
			case "New Email" : s = "Nowy Email"; break;
			case "Confirmation" : s = "Potwierdzenie"; break;
			case "Verify Email" : s = "Potwierd\u017A Email"; break;
			case "If you change this, an email will be sent to your old address requesting confirmation for the change" : s = "Je\u015Bli zmienisz to pole, zostanie wys\u0142any do Ciebie email na stary adres prosz\u0105cy o potwierdzenie zmiany."; break;
			case "Game Options" : s = "Opcje gry"; break;
			case "Time Offset" : s = "Przesuni\u0119cie czasowe"; break;
			case "'Are You Sure?' Dialog" : s = "Okienko 'Czy jeste\u015B pewien'"; break;
			case " Enabled" : s = " W\u0142\u0105czone"; break;
			case " Disabled" : s = " Wy\u0142\u0105czone"; break;
			case "Alliance Invitations" : s = "Zaproszenia sojuszy"; break;
			case "Message Mode" : s = "Tryb wiadomo\u015Bci"; break;
			case " Accept All" : s = " Przyjmuj wszystkie"; break;
			case " Only Messages From Alliance Members and Friends" : s = " Tylko od sojusznik\u00F3w i znajomych"; break;
			case "War History Mode" : s = "Tryb log\u00F3w wojennych"; break;
			case " Delayed" : s = " Op\u00F3\u017Aniony"; break;
			case " Instant" : s = " Natychmiastowy"; break;
			case "Alliance Ranks" : s = "Rangi sojuszu"; break;
			case " All users at once        " : s = " Wszyscy na raz        "; break;
			case " 50 users per page        " : s = " 50 na stron\u0119        "; break;
			case " 100 users per page        " : s = " 100 na stron\u0119        "; break;
			case " 250 users per page        " : s = " 250 na stron\u0119        "; break;
			case " 500 users per page        " : s = " 500 na stron\u0119        "; break;
			case " 1000 users per page    " : s = " 1000 na stron\u0119    "; break;
			case "Members Page Options" : s = "Opcje strony gracza"; break;
			case "Login Ip Display" : s = "Wy\u015Bwietlaj logowanie IP"; break;
			case "Unique Link Box" : s = "Wy\u015Bwietlaj unikalny link"; break;
			case "Layout Options" : s = "Opcje wygl\u0105du"; break;
			case "Layout" : s = "Temat kolorystyczny"; break;
			case "Red" : s = "Czerwony"; break;
			case "Blue" : s = "Niebieski"; break;
			case "Green" : s = "Zielony"; break;
			case "Gray" : s = "Szary"; break;
			case "Advisor Bar" : s = "Panel Doradcy"; break;
			case "Avatars" : s = "Awatary"; break;
			case "Verification Warnings" : s = "Ostrze\u017Cenia o weryfikacji"; break;
			case "Menu Mode" : s = "Tryb menu"; break;
			case " Default" : s = " Standardowe"; break;
			case " Text-Only" : s = " Tekstowe"; break;
			case "Top News Headline" : s = "Nag\u0142\u00F3wek z nowo\u015Bciami"; break;
			case "Number Separator" : s = "Separator liczb"; break;
			case "Commas" : s = "Przecinek"; break;
			case "Periods" : s = "Kropka"; break;
			case "Spaces" : s = "Spacja"; break;
			case "None" : s = "Brak"; break;
			case "Click here" : s = "Kliknij tutaj"; break;
		}
		
		s = s.replace('This number will be added to all timestamps. The current server time is','Ta warto\u015B\u0107 zostanie dodana do wszystkich wy\u015Bwietlanych czas\u00F3w. Aktualny czas serwera to');
		s = s.replace('Your settings have been saved. You are now being forwarded to your members page.','Ustawienia zosta\u0142y zapisane. Jeste\u015B teraz przekierowywany do strony g\u0142\u00F3wnej.'); 
		s = s.replace('if you are not forwarded or you do not wish to wait any longer',' je\u015Bli nie nast\u0119puje przekierowanie b\u0105d\u017A nie chcesz d\u0142u\u017Cej czeka\u0107'); 

		return s;
	}
	
	function translateResetaccount(s) {

		s = s.replace('Are you sure you wish to reset your account?','Czy jeste\u015B pewny, \u017Ce chcesz zresetowa\u0107 swoje konto?');
		s = s.replace('This will cause all of your account statistics to be reset to zero and is ','Spowoduje to wyzerowanie wszystkich statystyk Twojego konta i jest ');
		s = s.replace('NOT','NIEODWRACALNE');
		s = s.replace(' reversible.','.');
		
		//An email has been sent to your email address with a unique link to confirm your account reset.
		//Your account has been reset.
		//Confirmation

		return s;
	}
	
	function translateBank(s) {
		switch (s) {
			case " Gold Available: ": s = " Dost\u0119pne z\u0142oto: "; break;
			case " Banked Gold: ": s = " Z\u0142oto w banku: "; break;
			case "Current Funds": s = "Aktualne fundusze"; break;
			case "Confirmation": s = "Potwierdzenie"; break;
			case "Error": s = "B\u0142\u0105d"; break;
			case "Deposit": s = "Wp\u0142a\u0107"; break;
			case "Withdraw": s = "Podejmij"; break;
			case "      Deposit ": s = " Wp\u0142a\u0107 "; break;
			case " gold into the bank.    ": s = " sztuk z\u0142ota do banku."; break;
			case "      Withdraw ": s = " Podejmij "; break;
			case " gold from your bank account.    ": s = " sztuk z\u0142ota ze swojego konta."; break;
			case "      You may deposit up to 80% of your gold at one time.": s = "Jednorazowo mo\u017Cesz wp\u0142aci\u0107 do 80% Twojego z\u0142ota,"; break;
		}
		if (s.indexOf('deposits remaining') > -1) {
			var words = s.split(' ');
			s = s.replace('deposits',pluralSyntax('depozyt','','y','\u00F3w',words[8]));
			s = s.replace('deposit','depozyt');
			s = s.replace('You have','Na chwil\u0119 obecn\u0105 masz');
			s = s.replace(' remaining.','.');		}

		if ((s.indexOf('minute') > -1) || (s.indexOf('hour') > -1)) {
		
			var words = s.split(' ');
			
			if ((words[24] == 'hours') || (words[24] == 'hour')) {
				s = s.replace('hours',pluralSyntax('godzin','\u0119','y','',words[23]));
				s = s.replace('hour',pluralSyntax('godzin','\u0119','y','',words[23]));
				s = s.replace('minutes',pluralSyntax('minut','\u0119','y','',words[26]));
				s = s.replace('minute',pluralSyntax('minut','\u0119','y','',words[26]));
			} //godziny + minuty
			
			if ((words[24].indexOf('minutes') > -1) || (words[24].indexOf('minute') > -1)) {
				s = s.replace('minutes',pluralSyntax('minut','\u0119','y','',words[23]));
				s = s.replace('minute',pluralSyntax('minut','\u0119','y','',words[23]));
			} //same minuty
			
			if ((words[24].indexOf('hours') > -1) || (words[24].indexOf('hour') > -1)) {
				s = s.replace('hours',pluralSyntax('godzin','\u0119','y','',words[23]));
				s = s.replace('hour',pluralSyntax('godzin','\u0119','y','',words[23]));
			} //same godziny
			
			s = s.replace('You will get an additional deposit in','Dostaniesz dodatkowy depozyt za');			
			s = s.replace('and','i');
			s = s.replace('You are at your maximum amount of deposits','Masz maksymaln\u0105 ilo\u015B\u0107 depozyt\u00F3w.');
			
		}
		
		s = s.replace('has been successfully withdrawn from your bank account','sztuk z\u0142ota zosta\u0142o pomy\u015Blnie podj\u0119tych z Twojego banku');
		s = s.replace('has been successfully deposited into your bank account','sztuk z\u0142ota zosta\u0142o pomy\u015Blnie wp\u0142aconych do Twojego banku');
		
		

		if (s.indexOf('may not deposit more') > -1) {
			s = s.replace('You may not deposit more than','Nie mo\u017Cesz wp\u0142aci\u0107 wi\u0119cej jak');
			s = s.replace('gold','sztuk z\u0142ota');			
		}
		return s;
	}
	
	function translateMining(s) {
		switch (s) {
			case "Operations": s = "Eksploatacja"; break;
			case "Miners": s = "G\u00F3rnicy"; break;
			case "Income": s = "Przych\u00F3d"; break;
			case "Income": s = "Przych\u00F3d"; break;
			case "      Visit the ": s = "Odwied\u017A stron\u0119 "; break;
			case "upgrades": s = "ulepsze\u0144"; break;
			case "Train": s = "Wytrenuj"; break;
			case "train": s = "wytrenuj"; break;
			case "upgrade": s = "ulepsz"; break;
		}
		if (s.indexOf('currently digging in') > -1) {
			s = s.replace('Your miners are currently digging in a','Twoi g\u00F3rnicy aktualnie pracuj\u0105 w');
			s = namesUpgrades(s,'');
		}
		if (s.indexOf('page to upgrade your mine to a') > -1) {
			s = s.replace('page to upgrade your mine to a','aby ulepszy\u0107 Twoj\u0105 kopalni\u0119 do');
			s = namesUpgrades(s,'');
		}	
		if (s.indexOf('miners working in your mine') > -1) {
			s = s.replace('You currently have','Aktualnie posiadasz');
			s = s.replace('miners working in your mine','g\u00F3rnik\u00F3w pracuj\u0105cych w Twojej kopalnii');
		}
		if (s.indexOf('miner is bringing') > -1) {
			s = s.replace('Each miner is bringing in','Ka\u017Cdy g\u00F3rnik wydobywa');
			s = s.replace('gold','sztuk z\u0142ota');
		}
		if (s.indexOf('You make a base of') > -1) {
			s = s.replace('You make a base of','Dostajesz');
			s = s.replace('gold per turn','sztuk z\u0142ota od fortyfikacji co tur\u0119');
		}
		if (s.indexOf('Your miners mine') > -1) {
			s = s.replace('Your miners mine','Twoi g\u00F3rnicy wydobywaj\u0105');
			s = s.replace('gold per turn','sztuk z\u0142ota na tur\u0119');
		}

		s = s.replace('Including your  wealth bonus and fortification gold, your gold per turn is','Wliczaj\u0105c bonus Bogactwa i z\u0142oto od fortyfikacji, tw\u00F3j przych\u00F3d na tur\u0119 wynosi');
		s = s.replace('Including your class and wealth bonuses and fortification gold, your gold per turn is','Wliczaj\u0105c bonusy posiadanej przez Ciebie klasy, Bogactwa i z\u0142oto od fortyfikacji, tw\u00F3j przych\u00F3d na tur\u0119 wynosi');
		s = s.replace('more miners to bring in additional resources','wi\u0119cej g\u00F3rnik\u00F3w by wydobywali dodatkowe surowce');		
		s = s.replace('Your daily income is','Tw\u00F3j dzienny przych\u00F3d wynosi');

		if (s.indexOf('productivity') > -1) {
			s = s.replace('To increase your productivity','Aby podnie\u015B\u0107 swoj\u0105 wydajno\u015B\u0107');
			s = s.replace('additional miners','dodatkowych g\u00F3rnik\u00F3w');
		}
		
			s = s.replace('additional miners','dodatkowych g\u00F3rnik\u00F3w');
			s = s.replace('To gain additional resources','Aby eksploatowa\u0107 wi\u0119cej surowc\u00F3w');

		if (s.indexOf('your mine to a') > -1) {
				s = s.replace('your mine to a','swoj\u0105 kopalni\u0119 do');
				s = namesUpgrades(s,'');
		}
		
		return s;
	}
	
	function translateAlliances(s) {
			s = s.replace('Alliance pages are disabled until we introduce the new alliance system. We want to test out the core game and fix all bugs in omega before putting in new features for players to test.','Strona sojuszy b\u0119dzie zablokowana dop\u00F3ki nie przedstawimy nowego systemu sojuszy. Chcemy przetestowa\u0107 rdze\u0144 gry i naprawi\u0107 wszystkie mo\u017Cliwe b\u0142\u0119dy, nim wypu\u015Bcimy nowe opcje do testowania dla graczy.');
		return s;
	}
	
	
	function translateRandomValidation(s) {
		switch (s) {
			case "Random Image Validation": s = "Losowa weryfikacja obrazkiem"; break;
			case "Error: Invalid position.": s = "B\u0142\u0105d: Z\u0142a pozycja."; break;
			case "": s = ""; break;
			case "Please Try Again!": s = "Prosz\u0119 spr\u00F3bowa\u0107 ponownie!"; break;
			case "Please click on the word that appears twice ": s = "Prosz\u0119 klikn\u0105\u0107 na s\u0142owo, kt\u00F3re wyst\u0119puje dwa razy "; break;
			case "to complete the random validation process.": s = "by zako\u0144czy\u0107 losow\u0105 weryfikacj\u0119 obrazkiem. "; break;			
		}
		return s;
	}
	
	function translateBattleupgrades(s) {
		switch (s) {
			case "Name": s = "Nazwa"; break;		
			case "You Have": s = "Masz"; break;		
			case "Cost": s = "Koszt"; break;		
			case "Stats": s = "Statystyki"; break;		
			case "Quantity": s = "Ilo\u015B\u0107"; break;		
			case "Offensive": s = "Ofensywne"; break;		
			case "Defensive": s = "Defensywne"; break;		
			case " Steed": s = " Rumak"; break;		
			case "War Elephant": s = "S\u0142o\u0144 Bojowy"; break;		
			case " Guard Tower Post": s = "Wie\u017Ca Obronna"; break;		
			case "(holds up to 5 units)": s = "(mie\u015Bci do 5 jednostek)"; break;		
			case "Catapult": s = "Katapulta"; break;		
			case "(per occupant)": s = "(na jednostk\u0119)"; break;		
			case "Not Available: Requires War Elephants": s = "Niedost\u0119pne: Wymaga S\u0142oni Bojowych"; break;
			case " Gold Available: " : s = " Dost\u0119pne z\u0142oto: "; break;
			case "Error" : s = "B\u0142\u0105d"; break;
			case "Confirmation" : s = "Potwierdzenie"; break;
		}
		if (s.indexOf('Only type II or III offensive') > -1) {
			s = s.replace('Only type II or III offensive units can use steeds. You have','Tylko II lub III rodzaj jednostek ofensywnych mo\u017Ce u\u017Cywa\u0107 Rumak\u00F3w. Posiadasz');
			s = s.replace('of these units','tych jednostek');
			s = s.replace('Only type II or III defensive units can use guard towers. You have','Jedynie II lub III rodzaj jednostek defensywnych mo\u017Ce u\u017Cywa\u0107 Wie\u017C Obronnych. Posiadasz');
			s = s.replace('of these units','tych jednostek');
		}
		if (s.indexOf('Invalid quantity of .') > -1) {
			s = s.replace('Invalid quantity of .','Nieprawid\u0142owa warto\u015B\u0107.');
		}
		if ((s.indexOf('Adds') > -1) && s.indexOf('to Offense') > -1) {
			s = s.replace('Adds','Dodaje');
			s = s.replace('to Offense','do Ataku');
		}
		if ((s.indexOf('Adds') > -1) && s.indexOf('to Defense') > -1) {
			s = s.replace('Adds','Dodaje');
			s = s.replace('to Defense','do Obrony');
		}
		if ((s.indexOf('upgrade was bought for') > -1) || (s.indexOf('upgrades were bought for') > -1)) {
			var words = s.split(' ');	
			s = s.replace('upgrades were bought for', pluralSyntax('ulepsze','nie','nia','\u0144', words[6]) + pluralSyntax(' bitewn','e','e','ych', words[6]) + ' kupiono za');
			s = s.replace('upgrade was bought for', 'ulepszenie bitewne kupiono za');		
			s = s.replace('gold', 'sztuk z\u0142ota');		
		}
		
			s = s.replace('Please select battle upgrades to purchase.', 'Wybierz ulepszenie bitewne do zakupienia.');
			s = s.replace('You do not have enough gold for that purchase', 'Nie masz wystarczaj\u0105cej ilo\u015Bci z\u0142ota');
			
		return s;
	}
	
	function translateTraining(s) {
		switch (s) {
			case "Miners        ": s = "G\u00F3rnicy"; break;	
			case "Soldiers ": s = "\u017Bo\u0142nierze "; break;	
			case "Soldiers": s = "\u017Bo\u0142nierzy "; break;	
			case "(Type 1)": s = "(Typ 1)"; break;	
			case "Knights ": s = "Rycerze "; break;	
			case "Knights": s = "Rycerzy"; break;	
			case "(Type 2)": s = "(Typ 2)"; break;	
			case "Berserkers ": s = "Berserkerzy "; break;	
			case "Berserkers": s = "Berserker\u00F3w"; break;	
			case "(Type 3)": s = "(Typ 3)"; break;	
			case "Guards ": s = "Stra\u017Cnicy "; break;	
			case "Guards": s = "Stra\u017Cnik\u00F3w"; break;	
			case "Archers ": s = "\u0141ucznicy "; break;	
			case "Archers": s = "\u0141ucznik\u00F3w"; break;	
			case "Elite Archers ": s = "Elitarni \u0141ucznicy "; break;	
			case "Elite Archers": s = "Elit. \u0141ucznik\u00F3w"; break;	
			case "Spies        ": s = "Szpiedzy"; break;	
			case "Sentries ": s = "Wartownicy"; break;	
			case "(Anti Spy)": s = ""; break;	
			case "Mining": s = "G\u00F3rnictwo"; break;	
			case "Offense": s = "Atak"; break;	
			case "Defense": s = "Obrona"; break;	
			case "Spy": s = "Wywiad"; break;	
			case "Sentry": s = "Kontrwywiad"; break;	
			case "You Have": s = "Masz"; break;	
			case "Cost": s = "Koszt"; break;	
			case "Quantity": s = "Ilo\u015B\u0107"; break;	
			case " Gold Available: " : s = " Dost\u0119pne z\u0142oto: "; break;
			case "Error" : s = "B\u0142\u0105d"; break;
			case "Confirmation" : s = "Potwierdzenie"; break;
		}
		s = s.replace('Upgrade','Ulepsz');
		
		if (s.indexOf('Invalid number of') > -1) {
			s = s.replace('Invalid number of','Nieprawid\u0142owa ilo\u015B\u0107');
			s = s.replace('Miners','G\u00F3rnik\u00F3w');
			s = s.replace('Soldiers','\u017Bo\u0142nierzy');
			s = s.replace('Knights','Rycerzy');
			s = s.replace('Berserkers','Berserker\u00F3w');
			s = s.replace('Guards','Stra\u017Cnik\u00F3w');
			s = s.replace('Archers','\u0141ucznik\u00F3w');
			s = s.replace('Elite Archers','Elitarnych \u0141ucznik\u00F3w');
			s = s.replace('Spies','Szpieg\u00F3w');
			s = s.replace('Sentries','Wartownik\u00F3w');
		}
		
		s = s.replace('Insufficient gold to complete transaction.','Niewystarczaj\u0105ca ilo\u015B\u0107 z\u0142ota aby dope\u0142ni\u0107 transakcji.');
		s = s.replace('Invalid number of units to upgrade','Niew\u0142a\u015Bciwa ilo\u015B\u0107 jednostek do ulepszenia.');

		if ((s.indexOf('You do not have enough') > -1) && (s.indexOf('to train') > -1)) { 
			s = s.replace('You do not have enough','Nie masz tylu');
			s = s.replace('to train','do wytrenowania');
			s = s.replace('Soldiers','\u017Bo\u0142nierzy');
			s = s.replace('Knights','Rycerzy');
			s = s.replace('Guards','Stra\u017Cnik\u00F3w');
			s = s.replace('Archers','\u0141ucznik\u00F3w');
			s = s.replace('Citizens','Mieszka\u0144c\u00F3w');
		}
		if (s.indexOf('citizens have been successfully untrained') > -1) {
			var words = s.split(' ');
			if (s.indexOf('citizens') > -1) {
				s = s.replace('citizens',pluralSyntax('Mieszka','niec','c\u00F3w','c\u00F3w',words[0]));
				s = s.replace('have been successfully untrained','zosta\u0142o pomy\u015Blnie odtrenowanych');				
			}
			if (s.indexOf('citizen') > -1) {
				s = s.replace('citizen','Mieszkaniec');
				s = s.replace('has been successfully untrained','zosta\u0142 pomy\u015Blnie odtrenowany');				
			}
		}
		if (s.indexOf('been successfully trained, costing') > -1) {
			s = s.replace('Guards','Stra\u017Cnik\u00F3w');
			s = s.replace('Guard','Stra\u017Cnik');
			s = s.replace('Soldiers','\u017Bo\u0142nierzy');
			s = s.replace('Soldier','\u017Bo\u0142nierz');
			s = s.replace('Citizens','Mieszka\u0144c\u00F3w');
			s = s.replace('Citizen','Mieszkaniec');
			s = s.replace('have been successfully trained, costing','zosta\u0142o pomy\u015Blnie wytrenowanych za');
			s = s.replace('has been successfully trained, costing','zosta\u0142 pomy\u015Blnie wytrenowany za');
			s = s.replace('gold','sztuk z\u0142ota');
		}
		
		s = s.replace(' to ',' do ');
		
		return s;
	}
	
	function translateUserlist(s) {
		switch (s) {
			case "Attack  a Specific User": s = "Zaatakuj gracza"; break;
			case "Spy on a Specific User": s = "Przeszpieguj gracza"; break;
			case "Jump to Page": s = "Skocz do strony"; break;
			case "Rank": s = "Pozycja"; break;
			case "Username": s = "Nazwa u\u017Cytkownika"; break;
			case "Gold": s = "Z\u0142oto"; break;
			case "Army Size": s = "Armia"; break;
			case "Level": s = "Poziom"; break;
			case "Race": s = "Rasa"; break;
			case "Previous": s = "Poprzednia"; break;
			case "Next": s = "Nast\u0119pna"; break;
			case "You may attack  a user within 5 levels of yours.": s = "Mo\u017Cesz zaatakowa\u0107 gracza w zasi\u0119gu 5 poziom\u00F3w od Twojego."; break;
			case "You may spy on  a user within 5 levels of yours.": s = "Mo\u017Cesz przeszpiegowa\u0107 gracza w zasi\u0119gu 5 poziom\u00F3w od Twojego."; break;
		}	
		if (s.indexOf('Currently viewing page') > -1) {
			s = s.replace('Currently viewing page','Aktualnie ogl\u0105dasz stron\u0119');
			s = s.replace('of','z');
		}

		return s;
	}
	
	function translateProfile(s) {
		switch (s) {
			case "Profile": s = "Profil"; break;
			case "Current Avatar": s = "Aktualny awatar"; break;
			case "New Avatar": s = "Nowy awatar"; break;
			case "Comments": s = "Komentarz"; break;
			case "Reset avatar to default": s = "Zresetuj awatar do domy\u015Blnego"; break;
			case "(250 characters max) (": s = "(Maksymalnie 250 znak\u00F3w) ("; break;
			case "Code": s = "Kod"; break;
			case "Click here" : s = "Kliknij tutaj"; break;
			case "Confirmation" : s = "Potwierdzenie"; break;			
		}
		if (s.indexOf('50 kb max | JPG/GIF Only | 200x200px Max') > -1) {
			s = s.replace('50 kb max','Maksymalna wielko\u015B\u0107: 50 kB');
			s = s.replace('JPG/GIF Only','Tylko JPG/GIF');
			s = s.replace('200x200px Max','Maksymalne rozmiary: 200x200px');
		}
		s = s.replace('Your profile has been saved','Tw\u00F3j profil zosta\u0142 zapisany');
		s = s.replace('You are now being forwarded to your members page.','Jeste\u015B teraz przekierowywany do strony g\u0142\u00F3wnej.'); 
		s = s.replace('if you are not forwarded or you do not wish to wait any longer',' je\u015Bli nie nast\u0119puje przekierowanie b\u0105d\u017A nie chcesz d\u0142u\u017Cej czeka\u0107');
		return s;
	}
	
	function translateViewprofile(s) {
		switch (s) {
			case "Overall Rank:": s = "Ranking og\u00F3lny:"; break;			
			case "Orders": s = "Opcje"; break;			
			case "Profile": s = "Profil"; break;
			case "Statistics": s = "Statystyki"; break;			
			case "Medals": s = "Medale"; break;			
			case "Status": s = "Status"; break;			
			case "Message This Player": s = "Powiadom tego gracza"; break;			
			case "Attack This Player": s = "Zaatakuj tego gracza"; break;			
			case "Spy Missions": s = "Misje szpiegowskie"; break;			
			case "Transfer Gold": s = "Prze\u015Blij z\u0142oto"; break;			
			case "Recruit This Player": s = "Rekrutuj tego gracza"; break;			
			case "Population": s = "Populacja"; break;			
			case "Army Size": s = "Armia"; break;			
			case "Fortification": s = "Fortyfikacja"; break;			
			case "Gold": s = "Z\u0142oto"; break;			
			case "ONLINE": s = "AKTYWNY"; break;			
			case "OFFLINE": s = "NIEAKTYWNY"; break;			
			case "Error": s = "B\u0142\u0105d"; break;			
		}	
		
		s = namesUpgrades(s,'');
		
		if ((s.indexOf('minute') > -1) || (s.indexOf('hour') > -1)) {
		
			var words = s.split(' ');
		
			if ((words[3] == 'hours,') || (words[3] == 'hour,')) {
				s = s.replace('hours,',pluralSyntax('godzin','\u0119','y','',words[2]));
				s = s.replace('hour,',pluralSyntax('godzin','\u0119','y','',words[2]));
				s = s.replace('minutes',pluralSyntax('minut','\u0119','y','',words[4]));
				s = s.replace('minute',pluralSyntax('minut','\u0119','y','',words[4]));
			} //godziny + minuty
			
			if ((words[3] == 'minutes') || (words[3] == 'minute')) {
				s = s.replace('minutes',pluralSyntax('minut','\u0119','y','',words[2]));
				s = s.replace('minute',pluralSyntax('minut','\u0119','y','',words[2]));
			} //same minuty
			
			if ((words[3] == 'hours') || (words[3] == 'hour')) {
				s = s.replace('hours',pluralSyntax('godzin','\u0119','y','',words[2]));
				s = s.replace('hour',pluralSyntax('godzin','\u0119','y','',words[2]));
			} //same godziny
			
		}
		
		if (s.indexOf('is a level') > -1) {
			s = s.replace('is a level','- Poziom');
			s = s.replace(' Elf',', Elf');
			s = s.replace(' Goblin',', Goblin');
			s = s.replace(' Human',', Cz\u0142owiek');
			s = s.replace(' Undead',', Nieumar\u0142y');
			s = s.replace('Cleric','Kap\u0142an');
			s = s.replace('Assassin','Zab\u00F3jca');
			s = s.replace('Fighter','Wojownik');
			s = s.replace('Thief','Z\u0142odziej');
		}

		s = s.replace('This user is suspended','Ten gracz zosta\u0142 zawieszony.');
		s = s.replace('This user is on vacation','Ten gracz jest na wakacjach.');
		s = s.replace('and is a Dark Throne Administrator.','Administrator Dark Throne');
		s = s.replace('Invalid user ID.','Niew\u0142a\u015Bciwy ID u\u017Cytkownika.');

		return s;
	}
	
	function translateUpgrades(s) {
		switch (s) {
			case "Gold Available: ": s = " Dost\u0119pne z\u0142oto: "; break;
			case " Banked Gold: ": s = " Z\u0142oto w banku: "; break;
			case "Current Upgrade": s = "Aktualne ulepszenie"; break;
			case "Next Upgrade": s = "Nast\u0119pne ulepszenie"; break;
			case "Stats": s = "Statystyki:"; break;
			case "Level Requirement": s = "Wymagany poziom"; break;
			case "Fortification Requirement": s = "Wymagana fortyfikacja"; break;
			case "Health: ": s = "Wytrzyma\u0142o\u015B\u0107: "; break;
			case "Cost:": s = "Koszt:"; break;
			case " Use Bank    ": s = " Przelew bankowy    "; break;
			case "You meet the upgrade requirement.": s = "Spe\u0142ni\u0142e\u015B wymagania ulepszenia."; break;
			case "Error" : s = "B\u0142\u0105d"; break;
			case "Confirmation" : s = "Potwierdzenie"; break;
			case "You meet the level requirement" : s = "Osi\u0105gn\u0105\u0142e\u015B wymagany poziom"; break;	
		}
		
		s = namesUpgrades(s,'a');
		s = s.replace('Maximum Housing','Ilo\u015B\u0107 dom\u00F3w');
		s = s.replace('Cost Per Repair Point','Naprawa 1 punktu fortu');
		s = s.replace('Fortification Hit Points','Punkty wytrzyma\u0142o\u015Bci');
		s = s.replace('Defense Bonus','Bonus do Obrony');
		s = s.replace('Offense Bonus','Bonus do Ataku');
		s = s.replace('Gold Per Miner','Z\u0142oto na G\u00F3rnika');
		s = s.replace('Deposits Per Day','Depozyty na dzie\u0144');
		s = s.replace('Gold Transfer','Transfer z\u0142ota'); s = s.replace('Not Available','Niedost\u0119pny');
		s = s.replace('Max Assassins Per Day','Zab\u00F3jstwa na dzie\u0144');
		s = s.replace('Max Infiltration Per Day','Infiltracje na dzie\u0144');
		s = s.replace('Spy Bonus','Bonus do Wywiadu');
		s = s.replace('Sentry Bonus','Bonus do Kontrwywiadu');
		s = s.replace(' gold)',' sztuk z\u0142ota)');
		s = s.replace('Insufficient funds to complete upgrade.','Niewystarczaj\u0105ce \u015Brodki aby kupi\u0107 ulepszenie');		
		s = s.replace('You do not meet the level requirement for that upgrade.','Nie spe\u0142niasz wymaga\u0144 dla tego ulepszenia.');
		s = s.replace('Upgrade completed successfully.','Ulepszenie zako\u0144czone pomy\u015Blnie.');	
		s = s.replace('You do not meet the fortification level requirement for that upgrade. You must have a','Nie spe\u0142niasz wymaganego poziomu fortykacji - ');	
		
		return s;
	}
	
	function translateWarhistory(s) {
		switch (s) {
			case "Attacking": s = "Atak"; break;
			case "Defending": s = "Obrona"; break;
			case "Spying": s = "Szpiegostwo"; break;
			case "Assassination": s = "Zab\u00F3jstwa"; break;
			case "Infiltration": s = "Infiltracje"; break;
			case "Defender": s = "Broni\u0105cy si\u0119"; break;
			case "Outcome": s = "Wynik"; break;
			case "Your Casualties": s = "Straty"; break;
			case "Gold Pillaged": s = "Z\u0142oto"; break;
			case "Experience": s = "Do\u015Bwiadczenie"; break;
			case "Turns": s = "Tury"; break;
			case "Time": s = "Czas"; break;
			case "Attacker": s = "Atakuj\u0105cy"; break;
			case "detailed": s = "wi\u0119cej"; break;
			case "You Won": s = "Wygrano"; break;
			case "You Lost": s = "Przegrano"; break;
			case "Spies Sent": s = "Wys\u0142ani szpiedzy"; break;
			case "Spies Executed": s = "Straceni szpiedzy"; break;
			case "Units Assassinated": s = "Zabite jednostki"; break;
			case "Fortification Damage": s = "Uszkodzenia fortu"; break;
			case "Attacks": s = "Ataki"; break;
			case "Defends": s = "Obrony"; break;
			case "Casualties": s = "Ofiary"; break;
			case "Kills": s = "Morderstwa"; break;
			case "Miners Killed": s = "Zabici G\u00F3rnicy"; break;
			case "Sentries Killed": s = "Zabici Wartownicy"; break;
			case "Total": s = "Og\u00F3lnie"; break;
			case "Average": s = "\u015Aredni"; break;
			case "Best": s = "Najlepszy"; break;
			case "Success": s = "Sukces"; break;
			case "Failure": s = "Pora\u017Cka"; break;
			case "Back to Top": s = "Wr\u00F3\u0107 na g\u00F3r\u0119"; break;
			case "Statistics For Currently Logged Entries": s = "Statystyki dla aktualnie zalogowanych wpis\u00F3w"; break;
			case " (only unsuccessful attempts are shown)": s = " (tylko nieudane pr\u00F3by s\u0105 pokazane)"; break;
			case "You do not have any assassination attempts logged.": s = "Nie ma zapisanych pr\u00F3b zab\u00F3jstw."; break;
			case "You do not have any spy attempts logged.": s = "Nie ma zapisanych pr\u00F3b szpiegowania."; break;
			case "You do not have any assassination attempts against you logged.": s = "Nie ma zapisanych pr\u00F3b zab\u00F3jstw przeciwko Tobie."; break;
			case "You do not have any infiltration attempts logged.": s = "Nie ma zapisanych pr\u00F3b infiltracji."; break;
			case "You do not have any infiltration attempts against you logged.": s = "Nie ma zapisanych pr\u00F3b infiltracji przeciwko Tobie."; break;
			case "You do not have any spy attempts against you logged.": s = "Nie ma zapisanych pr\u00F3b szpiegowania przeciwko Tobie."; break;
			case "You do not have any defense logged.": s = "Nie ma zapisanych informacji o obronie."; break;
			case "You do not have any attacks logged.": s = "Nie ma zapisanych informacji o atakach."; break;
		}
		
		s = s.replace('Attacks will remain in logs for 3 days','Ataki pozostan\u0105 w logach przez trzy dni');
		s = s.replace('Spy Attempts will remain in logs for 3 days','Pr\u00F3by szpiegowskie pozostan\u0105 w logach przez trzy dni');

		
		if (s.indexOf('less than 1 minute ago') > -1) {
			s = s.replace('less than 1 minute ago','mniej ni\u017C 1 minut\u0119 temu');
		}
		
		if ((s.indexOf('day') > -1) && (s.indexOf('hour') > -1)) {
			var words = s.split(' ');
			s = s.replace('days', pluralSyntax('d','zie\u0144','ni','ni',words[0]));
			s = s.replace('day', pluralSyntax('d','zie\u0144','ni','ni',words[0]));
			s = s.replace('hours', pluralSyntax('godzin','\u0119','y','',words[2]));
			s = s.replace('hour', pluralSyntax('godzin','\u0119','y','',words[2]));
		} //dzien i godzina
		
		if ((s.indexOf('hour') > -1) && (s.indexOf('minute') > -1)) {
			var words = s.split(' ');
			s = s.replace('hours', pluralSyntax('godzin','\u0119','y','',words[0]));
			s = s.replace('hour', pluralSyntax('godzin','\u0119','y','',words[0]));
			s = s.replace('minutes', pluralSyntax('minut','\u0119','y','',words[2]));
			s = s.replace('minute', pluralSyntax('minut','\u0119','y','',words[2]));
		} //godzina i minuta
		
		if ((s.indexOf('day') > -1) || (s.indexOf('hour') > -1) || (s.indexOf('minute') > -1)) {
			var words = s.split(' ');
			s = s.replace('days', pluralSyntax('d','zie\u0144','ni','ni',words[0]));
			s = s.replace('day', pluralSyntax('d','zie\u0144','ni','ni',words[0]));
			s = s.replace('hours', pluralSyntax('godzin','\u0119','y','',words[0]));
			s = s.replace('hour', pluralSyntax('godzin','\u0119','y','',words[0]));
			s = s.replace('minutes', pluralSyntax('minut','\u0119','y','',words[0]));
			s = s.replace('minute', pluralSyntax('minut','\u0119','y','',words[0]));
			
		} //same wartosci: dzien albo godzina albo minuta
		
		s = s.replace(' ago',' temu');
		
		return s;
	}
	
	function translateSpy(s) {
	switch (s) {
			case "How Many Spies Would You Like To Use?" : s = "Ilu szpieg\u00F3w chcesz u\u017Cy\u0107?"; break;
			case "Error" : s = "B\u0142\u0105d"; break;
		}
		if (s.indexOf('You may infiltrate') > -1) {
			s = s.replace('You may infiltrate up to','Mo\u017Cesz infiltrowa\u0107 do');
			s = s.replace('times every 24 hours. You may only infiltrate','razy na ca\u0142\u0105 dob\u0119. Mo\u017Cesz jedynie infiltrowa\u0107 fortyfikacj\u0119');
			s = s.replace('\'s fortification once every 24 hours.',' raz na ca\u0142\u0105 dob\u0119');
		}
			s = s.replace('Invalid number of spies','Nieprawid\u0142owa ilo\u015B\u0107 szpieg\u00F3w');
			s = s.replace('You have already sent the maximum number of spies in the last 24 hours','Wys\u0142a\u0142e\u015B ju\u017C maksymaln\u0105 ilo\u015B\u0107 szpieg\u00F3w w ci\u0105gu ostatniej doby');
			s = s.replace('This user\'s fortification is already at zero health','Fortyfikacja ma ju\u017C 0 punkt\u00F3w wytrzyma\u0142o\u015Bci');
			s = s.replace('You may only infiltrate a player\'s fortification once every 24 hours.','Mo\u017Cesz infiltrowa\u0107 fortyfikacj\u0119 danego gracza tylko raz w ci\u0105gu doby.')
		 
		return s;
	}
	
	function translateAttack(s) {
		switch (s) {
			case "How Many Turns Would You Like To Use?" : s = "Ilu tur chcesz u\u017Cy\u0107?"; break;
			case "Error" : s = "B\u0142\u0105d"; break;
		}
			s = s.replace('Invalid number of turns','Nieprawid\u0142owa ilo\u015B\u0107 tur');
			s = s.replace('You may only attack a user 5 times in a 24 hour period.','Mo\u017Cesz zaatakowa\u0107 gracza tylko 5 razy na dob\u0119.');
		return s;
	}
	
	function translateRankings(s) {
		switch (s) {
			case "Top 10 By ": s = "Najlepsi - "; break;
			case "Level": s = "Poziom"; break;
			case "Top 10 by ": s = "Najlepsi - "; break;
			case "Overall Rank": s = "Ranking og\u00F3lny"; break;
			case "Rank": s = "Pozycja"; break;
			case "Username": s = "U\u017Cytkownik"; break;
		}
		
		s = s.replace('The rankings are updated every hour.','Rankingi s\u0105 uaktualniane co godzin\u0119.');
		
		if (s.indexOf('rankings were') > -1) {
			var words = s.split(' ');
			s = s.replace('minutes',pluralSyntax('minut','\u0119','y','',words[6]));
			s = s.replace('minute',pluralSyntax('minut','\u0119','y','',words[6]));			
			s = s.replace('The rankings were updated','Ranking by\u0142 uaktualniany');
			s = s.replace('ago','temu');
		}		
		return s;
	}
	
	function translateRecruiterlist(s) {
		switch (s) {
			case "Public Recruiter": s = "Publiczny rekruter"; break;
			case "User": s = "U\u017Cytkownik"; break;
			case "Credits": s = "Kredyty"; break;
			case "Given": s = "Kliki"; break;
			case "Received": s = "Otrzymano"; break;
			case "Status": s = "Status"; break;
			case "Maximum": s = "Maksimum"; break;
			case "Enabled": s = "Mo\u017Ce klika\u0107"; break;
			case "      pages ": s = "      strony "; break;
			case "First": s = "Pierwsza"; break;
			case "Last": s = "Ostatnia"; break;
			case "Go back to the ": s = ""; break;
			case "recruiter": s = ""; break;
		}	
		return s;
	}
	
	function translateDownloads(s) {
		switch (s) {
			case "Wallpapers": s = "Tapety"; break;
		}	
		return s;
	}
	
	function translateBankhistory(s) {
		switch (s) {
			case "Amount": s = "Ilo\u015B\u0107"; break;
			case "Time": s = "Czas"; break;
			case "Incoming": s = "Przychodz\u0105ce"; break;
			case "From": s = "Od"; break;
			case "To": s = "Do"; break;
			case "When": s = "Kiedy"; break;
			case "Outgoing": s = "Wychodz\u0105ce"; break;
			case "Statistics For Currently Logged Entries": s = "Statystyki dla aktualnie zalogowanych wpis\u00F3w"; break;
			case "Total Deposits": s = "Wszystkie depozyty"; break;
			case "Total Deposited": s = "Od\u0142o\u017Cono og\u00F3\u0142em"; break;
			case "Best Deposit": s = "Najlepszy depozyt"; break;
			case "Total Withdrawals": s = "Wszystkie podj\u0119cia"; break;
			case "Total Withdrawn": s = "Podj\u0119to og\u00F3\u0142em"; break;
			case "Best Withdrawal": s = "Najlepsze podj\u0119cie"; break;
			case "You do not have any transfers logged.": s = "Nie ma zapisanych \u017Cadnych transfer\u00F3w."; break;
			case "Bank transactions will remain in logs for 3 days": s = "Transakcje bankowe pozostan\u0105 w logach przez trzy dni"; break;
		}
		if (s.indexOf('less than 1 minute ago') > -1) {
			s = s.replace('less than 1 minute ago','mniej ni\u017C 1 minut\u0119 temu');
		}
		
		if ((s.indexOf('week') > -1) && (s.indexOf('day') > -1)) {
			var words = s.split(' ');
			s = s.replace('weeks', pluralSyntax('ty','dzie\u0144','godnie','godni',words[0]));
			s = s.replace('week', pluralSyntax('ty','dzie\u0144','godnie','godni',words[0]));
			s = s.replace('days', pluralSyntax('d','zie\u0144','ni','ni',words[2]));
			s = s.replace('day', pluralSyntax('d','zie\u0144','ni','ni',words[2]));
		} //tydzien i dzien
		
		if ((s.indexOf('day') > -1) && (s.indexOf('hour') > -1)) {
			var words = s.split(' ');
			s = s.replace('days', pluralSyntax('d','zie\u0144','ni','ni',words[0]));
			s = s.replace('day', pluralSyntax('d','zie\u0144','ni','ni',words[0]));
			s = s.replace('hours', pluralSyntax('godzin','\u0119','y','',words[2]));
			s = s.replace('hour', pluralSyntax('godzin','\u0119','y','',words[2]));
		} //dzien i godzina
		
		if ((s.indexOf('hour') > -1) && (s.indexOf('minute') > -1)) {
			var words = s.split(' ');
			s = s.replace('hours', pluralSyntax('godzin','\u0119','y','',words[0]));
			s = s.replace('hour', pluralSyntax('godzin','\u0119','y','',words[0]));
			s = s.replace('minutes', pluralSyntax('minut','\u0119','y','',words[2]));
			s = s.replace('minute', pluralSyntax('minut','\u0119','y','',words[2]));
		} //godzina i minuta
		
		if ((s.indexOf('week') > -1) || (s.indexOf('day') > -1) ||
		(s.indexOf('hour') > -1) || (s.indexOf('minute') > -1)) {
			var words = s.split(' ');
			s = s.replace('weeks', pluralSyntax('ty','dzie\u0144','godnie','godni',words[0]));
			s = s.replace('week', pluralSyntax('ty','dzie\u0144','godnie','godni',words[0]));
			s = s.replace('days', pluralSyntax('d','zie\u0144','ni','ni',words[0]));
			s = s.replace('day', pluralSyntax('d','zie\u0144','ni','ni',words[0]));
			s = s.replace('hours', pluralSyntax('godzin','\u0119','y','',words[0]));
			s = s.replace('hour', pluralSyntax('godzin','\u0119','y','',words[0]));
			s = s.replace('minutes', pluralSyntax('minut','\u0119','y','',words[0]));
			s = s.replace('minute', pluralSyntax('minut','\u0119','y','',words[0]));
			
		} //same wartosci: dzien albo godzina albo minuta
		
			s = s.replace(' ago',' temu');
			
		return s;
	}
	
	function translateBbcode(s) {
		switch (s) {
			case "Special Tags": s = "Specjalne tagi"; break;
			case "Smilies": s = "U\u015Bmieszki"; break;
		}
		s = s.replace(']text[',']tekst[');
		s = s.replace(']item[',']pozycja[');
		return s;
	}
	
	function translateTransfer(s) {
		switch (s) {
			case "Confirmation": s = "Potwierdzenie"; break;
			case "Transfer": s = "Transferuj"; break;
			case "      Transfer ": s = " Transferuj "; break;
		}
		s = s.replace('has been successfully transferred to','sztuk z\u0142ota zosta\u0142o pomy\u015Blnie przetransferowanych do');
		
		if (s.indexOf('Gold is transferred from') > -1) {
			s = s.replace('Gold is transferred from your bank directly into','Z\u0142oto jest transferowane z Twojego banku od razu do banku celu: ');
			s = s.replace('\'s bank.', '.');
			s = s.replace('You can transfer up to', 'Mo\u017Cesz przetransferowa\u0107 do');
			s = s.replace('gold per player per day.','sztuk z\u0142ota na jednego gracza w ci\u0105gu dnia.');
			s = s.replace('You can receive up to','W tym samym czasie mo\u017Cesz otrzyma\u0107 do');
			s = s.replace('gold per day','sztuk z\u0142ota');
		}
		
		s = s.replace('gold to','sztuk z\u0142ota do');
		return s;
	}
	
	function translateSearch(s) {
		switch (s) {
			case "Search": s = "Szukaj"; break;
			case "Error": s = "B\u0142\u0105d"; break;
			case "Results": s = "Wyniki"; break;
			case "(limited to 50 results)": s = "(pokazano tylko 50 pierwszych)"; break;
			case "": s = ""; break;
		}
		
		s = s.replace('No results matched your query.','Nie znaleziono wynik\u00F3w dla tego zapytania.');
		
		return s;
	}
	
	function translateSpymissions(s) {
		switch (s) {
			case "Spy": s = "Szpieguj"; break;
			case "Assassinate": s = "Zamorduj"; break;
			case "Infiltrate": s = "Infiltruj"; break;
		}
			s = s.replace('Send your spies to gather information about your enemy\'s army','Wy\u015Blij szpieg\u00F3w, by zebra\u0107 informacje o armii Twojego wroga');
			s = s.replace('Send your spies to assassinate your enemy\'s trained units','Wy\u015Blij szpieg\u00F3w, by zamordowa\u0107 jednostki Twojego wroga');
			s = s.replace('Send your spies on a mission to infiltrate and damage an enemy\'s fortification','Wy\u015Blij szpieg\u00F3w, by infiltrowa\u0107 i uszkodzi\u0107 fortyfikacj\u0119 Twojego wroga');
			s = s.replace('Not Available','Niedost\u0119pne');
			s = s.replace('Requires Assassination Training','Wymaga ulepszenia: Zab\u00F3jstwo');
			
		return s;
	}
	
	function translateLogin(s) {
		switch (s) {
			case "Current password is incorrect.": s = ""; break;
			case "Your password must be at least 6 characters long.": s = ""; break;
			case "Invalid email address.": s = ""; break;
			case "No user was found matching that email/password combination. ": s = ""; break;
			case "Forgot Password?": s = ""; break;
			case "*Note- Use your current Beta email address and password to log into the Omega test.": s = ""; break;
			case " (the email address associated with your Dark Throne account)": s = ""; break;
			case "Error": s = ""; break;
			case "Confirmation": s = ""; break;
		}
		s = s.replace('Password is empty.','Has\u0142o jest puste');
		s = s.replace('No account was found matching that email address.','Nie znaleziono u\u017Cytkownika o podanym adresie email.');
		s = s.replace('Password and verify password did not match.','Has\u0142o i jego powt\u00F3rzenie si\u0119 nie zgadzaj\u0105.');
		s = s.replace('Email and verify email did not match.','Email i jego powt\u00F3rzenie si\u0119 nie zgadzaj\u0105.');
		s = s.replace('An email with further instructions has been sent. It may take a few minutes to receive.','Wys\u0142ano email z dalszymi intrukcjami. Jego odebranie mo\u017Ce potrwa\u0107 par\u0119 minut.');
		s = s.replace('Your password has been reset. An email has been sent to you containing your new password.','Twoj has\u0142o zosta\u0142o zresetowane. Wys\u0142ano do Ciebie email z nowym has\u0142em.');
		s = s.replace('Invalid hash. Your new password may have already been sent.','Nieprawid\u0142owy hash. Twoje nowe has\u0142o mog\u0142o zosta\u0107 ju\u017C wys\u0142ane.');
		return s;
	}
	
	function translateResetaccount(s) {
	switch (s) {
		case "Confirmation":  s = "Potwierdzenie"; break;
		case "Authorization": s = "Autoryzacja"; break;
		case "Game Settings": s = "Ustawienia gry"; break;
		case "Password": s = "Has\u0142o"; break;
		case "Race": s = "Rasa"; break;
		case "Humans": s = "Ludzie"; break;
		case "Undead": s = "Nieumarli"; break;
		case "Goblins": s = "Gobliny"; break;
		case "Elves": s = "Elfowie"; break;
		case "Subclass": s = "Klasa"; break;
		case "Fighter": s = "Wojownik"; break;
		case "Thief": s = "Z\u0142odziej"; break;
		case "Cleric": s = "Kleryk"; break;
		case "Assassin": s = "Zab\u00F3jca"; break;
	}
	s = s.replace('An email has been sent to your email address with a unique link to confirm your account reset.','Na tw\u00F3j adres emailowy zosta\u0142 wys\u0142any list z unikalnym linkiem potwierdzaj\u0105cym zresetowanie konta.');

	
	
		return s;
	}
		
	//-----//-----//----- przygotowanie wszystkich textNodes //-----//-----//-----

	var textnodes, node, s;
	var nrmsg;
	
	textnodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	win = new String(window.location.href);
	
	//-----//-----//----- zamiana tekstu w petli po kazdym textNode //-----//-----//-----
	
	for (var i = 0; i < textnodes.snapshotLength; i++) {
		node = textnodes.snapshotItem(i);
		s = node.data;
	
		if (pageEx('members')) 						{ s = translateMembers(s) }		
		if (pageEx('mercenaries')) 				{ s = translateMercenaries(s) }		
		if (pageEx('proficiencies')) 			{ s = translateProficiencies(s) }		
		if (pageEx('messaging')) 					{ s = translateMessaging(s) }
		if (pageEx('repair')) 						{ s = translateRepair(s) }	
		if (pageEx('armory')) 						{ s = translateArmory(s) }		
		if (pageEx('clicklog')) 					{ s = translateClicklog(s) }
		if (pageEx('housing')) 						{ s = translateHousing(s) }
		if (pageEx('recruitermain')) 			{ s = translateRecruitermain(s) }
		if (pageEx('settings')) 					{ s = translateSettings(s) }
		if (pageEx('resetaccount')) 			{ s = translateResetaccount(s) }
		if (pageEx('bank')) 							{ s = translateBank(s) }
		if (pageEx('mining')) 						{ s = translateMining(s) }
		
		if (pageEx('alliances') ||
				pageEx('alliancelisting'))		{ s = translateAlliances(s) }
				
		if (pageEx('battleupgrades'))			{ s = translateBattleupgrades(s) }
		if (pageEx('training'))						{ s = translateTraining(s) }
		if (pageEx('userlist') ||
				pageEx('overallranklist'))		{ s = translateUserlist(s) }
		if (pageEx('profile'))						{ s = translateProfile(s) }
		if (pageEx('viewprofile'))				{ s = translateViewprofile(s) }
		if (pageEx('upgrades'))						{ s = translateUpgrades(s) }
		if (pageEx('warhistory') ||
				pageEx('attacklog') ||
				pageEx('defenselog') ||
				pageEx('spylog'))							{ s = translateWarhistory(s) }
		
		if (pageEx('spy') ||
				pageEx('infiltration') ||
				pageEx('assassination'))			{ s = translateSpy(s) }
				
		if (pageEx('attack'))							{ s = translateAttack(s) }
		if (pageEx('rankings'))						{ s = translateRankings(s) }
		if (pageEx('recruiterlist'))			{ s = translateRecruiterlist(s) }
		if (pageEx('downloads'))					{ s = translateDownloads(s) }
		if (pageEx('resetaccount'))				{ s = translateResetaccount(s) }
		if (pageEx('bbcode'))							{ s = translateBbcode(s) }
		if (pageEx('bankhistory') ||
				pageEx('transferlog'))				{ s = translateBankhistory(s) }				
		if (pageEx('transfer'))						{ s = translateTransfer(s) }
		if (pageEx('search'))							{ s = translateSearch(s) }
		if (pageEx('spymissions'))				{ s = translateSpymissions(s) }
		if (pageEx('login') ||
				pageEx('forgotpassword'))			{ s = translateLogin(s) }
		
		
																				s = translateRepetetive(s);
																				
		node.data = s;
	}
	
	//-----//-----//----- f-cja dla powtarzajacych sie elementow (Doradca, Sygnaturka) //-----//-----//-----
	
	function translateRepetetive(s) {
		switch (s) {
			case "Anti Spam Policy": s = "Polityka antyspamowa"; break;
			case "Privacy Policy": s = "Polityka prywatno\u015Bci"; break;
			case "Terms of Use": s = "Warunki u\u017Cywania"; break;
			case "Rules": s = "Zasady"; break;
		}	
		
		s = s.replace('Untrained Citizens:','Mieszka\u0144cy:');
		s = s.replace('Gold:','Z\u0142oto:');
		s = s.replace('Level:','Poziom:');
		s = s.replace('Experience:','Do\u015Bwiadczenie:');
		s = s.replace('next level in','nast. poziom za');
		s = s.replace('Turns Available:','Pozosta\u0142e tury:');
		s = s.replace('Username or ID','U\u017Cytkownik albo ID');
		s = s.replace('Time Until Next Turn','Czas do nast\u0119pnej tury');
		s = s.replace('Dark Throne Time','Czas Dark Throne');
		
		s = s.replace('After making a large sum of money from an attack, bank it quickly','Po zdobyciu du\u017Cej sumy z\u0142ota z ataku, zbankuj j\u0105 szybko');
		s = s.replace('Use the mass messaging feature to coordinate attacks with your alliance','U\u017Cywaj masowych wiadomo\u015Bci aby koordynowa\u0107 ataki ze swoim sojuszem');
		s = s.replace('It is better to buy a few stronger weapons than many weaker weapons','Lepiej kupi\u0107 kilka sztuk lepszej broni ni\u017C wiele gorszej');
		s = s.replace('The more attack turns you use in an attack, the more experience and gold you will get','Im wi\u0119cej tur u\u017Cywasz podczas ataku tym wi\u0119cej dostajesz do\u015Bwiadczenia i z\u0142ota');
		
		s = s.replace('Coming Soon','Ju\u017C wkr\u00F3tce');
	
		if ((youhave == false) && (s.indexOf('       You have ') > -1)) {
			s = s.replace(/^\s+|\s+$/g, '');
			s += ' ';
			var words = s.split(' ');
			nrmsg = words[2];						
			s = s.replace('You have ','Masz ');
			youhave = true;
		}
		
		if (s == 'unread') s = s.replace('unread',pluralSyntax('nieprzeczytan','\u0105','e','ych',nrmsg));
		
		s = s.replace('messages','wiadomo\u015Bci');
		s = s.replace('message','wiadomo\u015B\u0107');
		
		if (s == "Warning") s = "Ostrze\u017Cenie";
		
		s = s.replace('left until next image verification','pozosta\u0142o do nast\u0119pnej weryfikacji obrazkiem');
		
		s = translateRandomValidation(s);
		
		return s;
	}
	
	window.addEventListener('load', addLink, true);
	
	/* a = \u0105 			e = \u0119 			o = \u00F3 			l = \u0142 										*/
	/* s = \u015B 			c = \u0107 			n = \u0144 			z = \u017C 			zi = \u017A		*/