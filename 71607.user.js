var start = new Date().getTime();
// ==UserScript==
// @name		Xemerys Beta
// @namespace           http://www.xemerys.com/
// @description   	Better Xemerys
// @include        	http://*xemerys.com*
// @version		0.2.6
// ==/UserScript==

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpathFirst(query) {
	return document.evaluate(query, document, null, 
		XPathResult.FIRST_ORDERED_NODE_TYPE, null);
}

function autoLogin(){
	var login = document.getElementById('login_area');
	
	if (login) {
		document.getElementsByTagName('form')[0].submit();
	}
}

function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

function replaceId(id, input, output) {
	document.getElementById(id).innerHTML = document.getElementById(id).innerHTML.replace(input,output);
}


function popraviPresledke() {
	var happy = document.getElementById('happy-target-1');
	happy.style.marginLeft = '20px';
	
	var message = document.getElementById('tools_icon');
	message.style.marginLeft = '30px';
}

function goldDan() {
	var gold = xpath("//li[@title='Gold']/span/span");
	if (gold) {
		var thisGold = gold.snapshotItem(0);	
		var naDan = parseFloat(thisGold.innerHTML) * 144;	
		thisGold.innerHTML += ' | ' + roundNumber(naDan,2) + '/day';	
	}
}

function style() {
	stil = xpath("//div[@id='site']");
	stil.snapshotItem(0).style.marginLeft = '20px';
	
	if (location.href == 'http://babylon.xemerys.com/city' || location.href == 'http://babylon.xemerys.com/City') {
	
		
		var Warehouse = getContent('http://babylon.xemerys.com/industry', /subadviser_content/i, 21, /scroll_content/i, -600);		
		
		document.getElementById('header').innerHTML += "<div style='position: absolute; left:980px; top:108px; background-color:#f3eee1; border:1px solid #faeede; clear:both; font-size:90%; padding:5px'>" + Warehouse + "</div>"
	
		
		var researchPage = getPage('http://babylon.xemerys.com/research');
		var researchTime = getContentFromVar(researchPage, /Estimated Time Left:/i, 30, /speedup/i, -10);
		var researchName = getContentFromVar(researchPage, /Researching:/i, 21, /<form action/i, -11);
		var researchPercent = getContentFromVar(researchPage, /value:/i, 7, /value:/i, 11);	
		if (researchPage.search(/Estimated Time Left:/i) == -1) {
			document.getElementById('header').innerHTML += "<div style='font-size: 0.8em; position: absolute; width: 300px; top: 93px; left: 1164px;' class='generic_cassette'><div class='generic_cassette_top'><div class='generic_cassette_middle'><h3 class='title'>Raziskave</h3><div class='overview_description ovrResearch'><p>Tvoji učenjaki gledajo v zrak in se dolgočasijo.<br><b>Pošlji jih raziskovat!</b></p></div></div></div></div>";
		} else { 
			document.getElementById('header').innerHTML += "<div style='position: absolute; left: 1268px; top: 128px; width: 176px; z-index: 1; text-align: center; font-size: 90%;'>" + researchPercent + "%</div>";
			document.getElementById('header').innerHTML += "<div style='font-size: 0.8em; position: absolute; width: 300px; top: 93px; left: 1164px;' class='generic_cassette'><div class='generic_cassette_top'><div class='generic_cassette_middle'><h3 class='title'>Raziskave</h3><div class='overview_description ovrResearch'><p>Tvoji učenjaki bodo raziskali <i>" + researchName + " </i>čez<b> " + researchTime + "</b></p></div></div></div></div>";
		}
				
		document.getElementById('header').innerHTML += "<div style='position: absolute; left: 1268px; top: 123px; width: 177px; background-image: url(http://xemerys.com/bg_progress_bar.png); background-repeat: no-repeat; padding-left:1px; padding-right:3px' class='ui-progressbar ui-widget ui-widget-content ui-corner-all' id='research_bar' role='progressbar' aria-valuemin='0' aria-valuemax='100' aria-valuenow='" + researchPercent + "'><div class='ui-progressbar-value ui-widget-header ui-corner-left' style='width:" + researchPercent + "%;'></div></div>";
		
		
		var energyPage = getPage('http://babylon.xemerys.com/magic');		
		var energyPercent = getContentFromVar(energyPage, /value:/i, 6, /value:/i, 10);
		var energyFull = getContentFromVar(energyPage, /Storage will be full in:/i, 33, />Acquire Energy</i, -50);
		var energyValue = getContentFromVar(energyPage, /Available Energy:/i, 25, /Storage will be full in:/i, -76);		
		if (energyPage.search(/Storage will be full in:/i) == -1) {
			document.getElementById('header').innerHTML += "<div style='font-size: 0.8em; position: absolute; width: 300px; top: 260px; left: 1164px;' class='generic_cassette'><div class='generic_cassette_top'><div class='generic_cassette_middle'><h3 class='title'>Energija</h3><div class='overview_description' style='background-image: url(http://babylon.xemerys.com/content/images/magic_adviser.png); background-position: 8px 8px;'><p><b>Energija je polna.</b></p></div></div></div></div>";
		} else { 
			document.getElementById('header').innerHTML += "<div style='position: absolute; left: 1267px; top: 295px; width: 176px; z-index: 1; text-align: center; font-size: 90%;'>" + energyValue + "</div>";
			document.getElementById('header').innerHTML += "<div style='font-size: 0.8em; position: absolute; width: 300px; top: 260px; left: 1164px;' class='generic_cassette'><div class='generic_cassette_top'><div class='generic_cassette_middle'><h3 class='title'>Energija</h3><div class='overview_description' style='background-image: url(http://babylon.xemerys.com/content/images/magic_adviser.png); background-position: 8px 8px;'><p>Energija bo polna čez <b>" + energyFull + " </b></p></div></div></div></div>";
		}
				
		document.getElementById('header').innerHTML += "<div style='position: absolute; left: 1267px; top: 290px; width: 177px; background-image: url(http://xemerys.com/bg_progress_bar.png); background-repeat: no-repeat; padding-left:1px; padding-right:3px' class='ui-progressbar ui-widget ui-widget-content ui-corner-all' id='mana_storage' role='progressbar' aria-valuemin='0' aria-valuemax='100' aria-valuenow='" + energyPercent + "'><div class='ui-progressbar-value ui-widget-header ui-corner-left' style='width: " + energyPercent + "%;'></div></div>";
			
		
		var transportPage = getPage('http://babylon.xemerys.com/commerce');		
		var transportCargo = getContentFromVar(transportPage, /<div><span title/i, 5, /centercity/, -69);
		var transportTime = getContentFromVar(transportPage, /instaport/, -30, /instaport/i, -19);

		if (transportPage.search(/transports_list/i) == -1) {			
			document.getElementById('header').innerHTML += "<div style='font-size: 0.8em; position: absolute; width: 300px; top: 398px; left: 1164px;' class='generic_cassette'><div class='generic_cassette_top'><div class='generic_cassette_middle'><h3 class='title'>Trgovina</h3><div class='overview_description' style='background-image: url(http://babylon.xemerys.com/content/images/commerce_adviser.png); background-position: 4px 8px;'><p>Na poti ni nobene pošiljke.</p></div></div></div></div>";
		} else { 
			document.getElementById('header').innerHTML += "<div style='font-size: 0.8em; position: absolute; width: 300px; top: 398px; left: 1164px;' class='generic_cassette'><div class='generic_cassette_top'><div class='generic_cassette_middle'><h3 class='title'>Trgovina</h3><div class='overview_description' style='background-image: url(http://babylon.xemerys.com/content/images/commerce_adviser.png); background-position: 4px 8px;'><div>Dostava " + transportCargo + "čez <b>" + transportTime + "</b></div></div></div></div></div>";
		}
				
	
			
		
	} 
}

function spellTime() {
	spell = xpath("//*[@id='scroll_content']/div/h4");	
	
	var i;
	for (i=0; i<=15; i++) {	
		if (spell.snapshotItem(i)) {
			spellTime = xpath("//*[@id='scroll_content']/div[1]/div/div/div/div[1]");
			if (spellTime.snapshotItem(i)) {
				spellTime = spellTime.snapshotItem(i).innerHTML.slice(25, 32);
				spell.snapshotItem(i).innerHTML += "<span style='color:#534C3C; font-size: 9px; font-style: italic'>" + spellTime + '</span>';
			}
		}
	}//for
}

function getContent(PageURL, startString, startMove, endString, endMove) {
  	var req = false;
	req = new XMLHttpRequest();
  	
	if (req) {
    req.open('GET', PageURL, false);
	req.send(null);
	
	var startpos = req.responseText.search(startString);
	var endpos = req.responseText.search(endString);	
  	} 
	return req.responseText.slice(startpos + startMove, endpos + endMove);
}

function getContentFromVar(myVar, startString, startMove, endString, endMove) {	
	var startpos = myVar.search(startString);
	var endpos = myVar.search(endString);	
  	
	return myVar.slice(startpos + startMove, endpos + endMove);
}

function getPage(PageURL) {
  	var req = false;
	req = new XMLHttpRequest();
  	
	if (req) {
    req.open('GET', PageURL, false);
	req.send(null);
	
  	} 
	return req.responseText;
}

function stIgralcev() {
	var steviloIgralcev = document.getElementById('footer').innerHTML.slice(8,12);
	document.getElementById('header').innerHTML += "<div style='position: absolute; left: 212px; top: 147px; width: 150px; font-size: 80%; color: White'>" + steviloIgralcev + " igralcev online</div>";
}

function industryDan() {
	var locationPath = location.pathname;
	if (locationPath == '/Industry/IndustryList' || locationPath == '/industry/industrylist') {
		
		var productionData = xpath("//div[@class='content_field']/span/span");	
		if (productionData) {
			for (i = 0; i <= 10; i++) {
				if (productionData.snapshotItem(i)) {
					newproductionData = productionData.snapshotItem(i).innerHTML;
					productionData.snapshotItem(i).innerHTML += "<br><span style='margin-left: 122px;'>" + roundNumber(newproductionData*6*24,2) + "<label>/dan</label></span>";	
				}
			}
		}
	
	var porabaData = xpath("//li[@class='consumption_info']/span/span");		
		if (porabaData) {
			for (i = 0; i <= 10; i++) {
				if (porabaData.snapshotItem(i)) {
					newporabaData = porabaData.snapshotItem(i).innerHTML;
					porabaData.snapshotItem(i).innerHTML += "<br><span>" + roundNumber(newporabaData*6*24,2) + "<label>/dan</label></span>";				
		
				}
			}
		}
	
	}
	
	
	if (locationPath == '/industry' || locationPath == '/Industry/Warehouse') {
		var jeTovarna = xpath("//div[@id='subadviser_content']/ul/li/a/span");
		var jeTovarnaLi = xpath("//div[@id='subadviser_content']/ul/li/a/span/parent::*/parent::li");
		var niTovarne = xpath("//div[@id='subadviser_content']/ul/li/div/span");
		var niTovarneLi = xpath("//div[@id='subadviser_content']/ul/li/div/span/parent::*/parent::li");
		var tovarnaLi = xpath("//div[@id='subadviser_content']/ul/li");
		
		var startTag = "<span style='color: #534C3C; line-height:20px;'>)(</span>";
		var endTag = "<span style='color: #534C3C'>/dan</span>";
		
		for (i = 0; i <= 20; i++) {
			if (tovarnaLi.snapshotItem(i)) {
				tovarnaLi.snapshotItem(i).style.height = '58px';
				tovarnaLi.snapshotItem(i).style.width = '166px';
			}
			
			
			if (jeTovarna.snapshotItem(i)) {
				jeTovarnaLi.snapshotItem(i).style.backgroundColor = '#e9e2c9';
				
				
				if (jeTovarna.snapshotItem(i).innerHTML != 0) {
					jeTovarna.snapshotItem(i).innerHTML += startTag + roundNumber(jeTovarna.snapshotItem(i).innerHTML*6*24,2) + endTag;
				}				
			} 
			
			
			if (niTovarne.snapshotItem(i)) {				
				
				if (niTovarne.snapshotItem(i).innerHTML != 0) {
					niTovarne.snapshotItem(i).innerHTML += startTag + roundNumber(niTovarne.snapshotItem(i).innerHTML*6*24,2) + endTag;
				}
			}
		}
	}
	
}	 

function healthLink() {
	document.getElementById('header').innerHTML += "<div title='Zdravje' style='position:absolute; top:185px; left: 675px; height:20px; width:30px; display:block;'><a style='text-decoration: none;' href='Industry/IndustryList?f=Services' class='health panel_icon'><span style='visibility: hidden;'>.</span></a></div>";
}

function spellHex() {
	var fantasyasd = xpath("/html/body/div/div[2]/div[3]/div/div/div/div[2]/div/div/ul/li/a");
	
	if (fantasyasd) { 
		alert(fantasyasd.snapshotItem(0).innerHTML + 'inenr');
	}
	
}

function domesticDan() {
	var locationPath = location.pathname;
	if (locationPath == '/city/domestic') {
		var source = document.innerHTML;
		
		
	}
	

}



//autoLogin(); 
goldDan(); 
prevedi();
//sadSmiley();
popraviPresledke(); 
spellTime(); 
stIgralcev(); 
//healthLink();
domesticDan(); 
//spellHex();
industryDan(); 
style(); 


function prevedi() {


var wiki = xpath("//*[@id='menu']/li/a/b");
wiki.snapshotItem(0).innerHTML = 'Pomooč!';
replaceId('menu', 'City', 'Mesto');
replaceId('menu', 'Premium Features', 'Bonus Točke');
replaceId('menu', 'Start Again', 'Začni znova');
replaceId('menu', 'Preferences', 'Nastavitve');
replaceId('menu', 'Account Settings', 'Moj račun');
replaceId('menu', 'Logout', 'logout');
replaceId('menu', 'Logout', 'Odjava');


replaceId('city_name_wrapper', 'Region', 'Regija');
replaceId('city_name_wrapper', 'Server Time', 'Čas na Strežniku');



var e;
e = xpath("//div[@id='scroll_content']/h2");
e.snapshotItem(0).innerHTML = 'Trenutno Aktivno';
e = xpath("//div[@id='scroll_content']/h3");
e.snapshotItem(0).innerHTML = 'Začasni Učinki';
e.snapshotItem(1).innerHTML = 'Narava in Svet';
e.snapshotItem(2).innerHTML = 'Družba';
e.snapshotItem(3).innerHTML = 'Magija';


replaceId('subadvisers', 'Overview', 'Pregled');
replaceId('subadvisers', 'Domestic Report', 'Prebivalstvo');
replaceId('subadvisers', 'Special Facilities', 'Posebne Zgradbe');
replaceId('subadvisers', 'Raw Materials', 'Surovine');
replaceId('subadvisers', 'Factories', 'Tovarne');

if (location.href == 'http://babylon.xemerys.com/industry' || location.href == 'http://babylon.xemerys.com/Industry/Warehouse') { 
	replaceId('subadvisers', 'Warehouse', 'Skladišče'); } 
else if (location.href == 'http://babylon.xemerys.com/Industry/IndustryList?f=RawMaterials' || location.href == 'http://babylon.xemerys.com/Industry/IndustryList?f=Factory' || location.href == 'http://babylon.xemerys.com/Industry/IndustryList?f=Services') { 
	e = xpath("//ul[@id='subadvisers']/li/a");
	e.snapshotItem(0).innerHTML = '<a href="/Industry/Warehouse">Skladišče</a>'; } 
if (location.href == 'http://babylon.xemerys.com/Industry/IndustryList?f=Services') { 
	replaceId('subadvisers', 'Services', 'Storitve'); } 
else if (location.href == 'http://babylon.xemerys.com/industry' || location.href == 'http://babylon.xemerys.com/Industry/IndustryList?f=RawMaterials' || location.href == 'http://babylon.xemerys.com/Industry/IndustryList?f=Factory' || location.href == 'http://babylon.xemerys.com/Industry/Warehouse') { 
	e = xpath("//ul[@id='subadvisers']/li/a");
	e.snapshotItem(2).innerHTML = '<a href="/Industry/IndustryList?f=Services">Storitve</a>'; } 
// -
replaceId('subadvisers', 'Transports', 'Trgovina');
replaceId('subadvisers', 'Trading Office', 'Uvoz / Izvoz');
replaceId('subadvisers', "Merchants' Den", 'Klepet');
//replaceId('subadviser_content', 'Establish Industry', 'Ustvari Novo'); 


if (location.href == 'http://babylon.xemerys.com/city' || location.href == 'http://babylon.xemerys.com/City') {
	
	replaceId('subadviser_content', 'Premium Points', 'Bonus Točke');
	replaceId('subadviser_content', 'Convert gold to Premium Points', 'Spremeni zlato v Bonus Točke');
	replaceId('subadviser_content', 'Chance to receive FREE Premium Points', 'Možnost, da dobiš dodatne Bonus Točke');
	replaceId('subadviser_content', 'From Happiness', 'Od Zadovoljstva');
	replaceId('subadviser_content', 'From referrals influence', 'Od vpliva povabljenih');
	replaceId('subadviser_content', 'FREE Premium Points Amount', 'Količina dodatnih Bonus Točk');
	replaceId('subadviser_content', 'From Health', 'Od Zdravja');
	replaceId('subadviser_content', 'From referrals', 'Od povabil');
	replaceId('subadviser_content', 'Refer Xemerys to your friends and win more Premium Points ', 'Povabi prijatelje v Xemerys in si prisluži več Bonus Točk');	
	replaceId('subadviser_content', '<a href="/misc/ivoshards">Activate</a> <b>Gold Membership</b> with Premium Points.', '<a href="/misc/ivoshards">Zamenjaj</a> Bonus Točke za <b>Zlato Članstvo</b>.');	
	
	replaceId('subadviser_content', 'Construction', 'Gradnja');
	replaceId('subadviser_content', 'A new', 'Novo');
	replaceId('subadviser_content', 'A new', 'Novo');
	replaceId('subadviser_content', 'A new', 'Novo');
	replaceId('subadviser_content', 'A new', 'Novo');
	replaceId('subadviser_content', 'facility will be finished in', 'poslopje bo končano čez');
	replaceId('subadviser_content', 'facility will be finished in', 'poslopje bo končano čez');
	replaceId('subadviser_content', 'facility will be finished in', 'poslopje bo končano čez');
	replaceId('subadviser_content', 'facility will be finished in', 'poslopje bo končano čez');	
	
	replaceId('subadviser_content', 'Warehouse', 'Skladišče');
	replaceId('subadviser_content', 'Next round is in about Less than', 'Nova runda čez manj kot');
	replaceId('subadviser_content', 'Next round is in about', 'Nova runda čez približno');
	replaceId('subadviser_content', 'We have no problems regarding stocks.', 'Nimamo težav z zalogami.');	
	
	replaceId('subadviser_content', 'People', 'Ljudje');
	replaceId('subadviser_content', "My Lord, if you continue this health policy, your people will throw you an epidemic(sic) party.", 'Če boš nadaljeval s takšno zdravstveno politiko, ti bodo ljudje priredili zabavo z epidemijo.');
	replaceId('subadviser_content', "My Lord, your people think you resemble Louis XVI and wish you the same happy ending! Perhaps they want some cake?", 'Tvoji ljudje te imajo radi kot Ludvika XVI in ti želijo veselo srečanje z giljotino! Morda pa želijo samo malo torte?');
	replaceId('subadviser_content', "Your people say they're doing fine, My Lord.", 'Tvoji ljudje pravijo, da jim gre vredu.');
	replaceId('subadviser_content', "Your people think you don't deserve free Premium Points!", 'Tvoji ljudje so mnenja, da si ne zaslužiš dodatnih Bonus Točk!');
	replaceId('subadviser_content', 'If you continue this trend, the quality of life of your subjects will suffer. To make matters worse, TAX INCOME will be LOWER!', 'Če boš tako nadaljeval, bo življenje tvojih podložnikov manj kvalitetno. Še huje - DAVKI bodo NIŽJI!');
	replaceId('subadviser_content', 'Your people are in good health, My Lord.', 'Tvoji ljudje so dobrega zdravja.');
	replaceId('subadviser_content', 'Population reached the maximum available housing. Extend the housing for more taxes.. ahem... people.', 'Ljudje so poselili vse bivalne površine. Povečaj bivalne površine za več davkov... khm... ljudi.');
	replaceId('subadviser_content', 'Your people are ecstatic and want to build you a statue! Yeah, right...', 'Tvoji ljudje norijo od veselja in ti želijo postaviti spomenik. Pa še kaj...');
	
	replaceId('subadviser_content', 'Finances', 'Denar');
	replaceId('subadviser_content', 'We are doing well My Lord. It can be better though.', 'Dobro nam gre. Lahko bi bilo še bolje.');
	replaceId('subadviser_content', "We bleed money like a real government, My Lord. I'm afraid you won't be able to buy the diamond plated toilet you've always wanted.", 'Imamo primanjkljaj kot prava vlada. Bojim se, da si ne boš mogel privoščiti diamantne straniščne školjke, ki si jo vedno želel.');
	
	replaceId('subadviser_content', 'Research', 'Raziskave');
	replaceId('subadviser_content', 'Your sages will finish researching', 'Tvoji učenjaki bodo raziskali');	
	
	replaceId('subadviser_content', 'Active Magical Features', 'Aktivne Magije');
}


if (location.href == 'http://babylon.xemerys.com/financial' || location.href == 'http://babylon.xemerys.com/Financial') {
	replaceId('advisor_content', 'Financial Statement', 'Finančno Poročilo');
	replaceId('advisor_content', 'Note', 'Opomba');
	replaceId('advisor_content', 'All amounts are per round estimates', 'Vse vrednosti so približki na rundo');
	replaceId('subadviser_content', 'Expenses', 'Stroški');
	replaceId('subadviser_content', 'Social Costs', 'Socialni Stroški');
	replaceId('subadviser_content', 'Base', 'Osnova');
	replaceId('subadviser_content', 'Modifiers', 'Dodatki');
	replaceId('subadviser_content', 'Wages', 'Plače');
	replaceId('subadviser_content', 'Base', 'Osnova');
	replaceId('subadviser_content', 'Modifiers', 'Dodatki');
	replaceId('subadviser_content', 'Industry Upkeep', 'Vzdrževanje Industrije');
	replaceId('subadviser_content', 'Base', 'Osnova');
	replaceId('subadviser_content', 'Modifiers', 'Dodatki');
	replaceId('subadviser_content', 'Portals Upkeep', 'Stroški Trgovanja');
	replaceId('subadviser_content', 'Base', 'Osnova');
	replaceId('subadviser_content', 'Modifiers', 'Dodatki');
	replaceId('subadviser_content', 'Total Expenses', 'Vseh Stroškov');
	replaceId('subadviser_content', 'Inflation', 'Inflacija');
	replaceId('subadviser_content', 'Total Cost', 'Skupaj Stroškov');		
	replaceId('subadviser_content', 'Income', 'Prihodki');
	replaceId('subadviser_content', 'Taxes', 'Davki');
	replaceId('subadviser_content', 'Base', 'Osnova');
	replaceId('subadviser_content', 'Modifiers', 'Dodatki');
	replaceId('subadviser_content', 'Miscellaneous', 'Razno');
	replaceId('subadviser_content', 'Total', 'Skupaj');
	replaceId('subadviser_content', 'Financial Result', 'Finančni Rezultat');
	replaceId('subadviser_content', 'Profit', 'Dobiček');
}


if (location.href == 'http://babylon.xemerys.com/commerce' || location.href == 'http://babylon.xemerys.com/Commerce') {
	replaceId('subadviser_content', 'Trade Portals', 'Trgovske Povezave');
	replaceId('subadviser_content', 'Total Portals', 'Vseh Povezav');
	replaceId('subadviser_content', 'Active Portals', 'Aktivnih Povezav');
	replaceId('subadviser_content', 'Portals Upkeer', 'Stroški Povezav');
	replaceId('subadviser_content', 'Cost', 'Nova Povezava');
	replaceId('subadviser_content', 'Build Time', 'Čas izgradnje');
}


if (location.href == 'http://babylon.xemerys.com/City/Domestic' || location.href == 'http://babylon.xemerys.com/city/Domestic' || location.href == 'http://babylon.xemerys.com/city/domestic' || location.href == 'http://babylon.xemerys.com/city/Domestic') {
	replaceId('subadviser_content', 'Population', 'Prebivalstvo');
	replaceId('subadviser_content', 'Population', 'Prebivalcev');
	replaceId('subadviser_content', 'Unemployed', 'Nezaposlenih');
	replaceId('subadviser_content', 'Employed', 'Zaposlenih');
	replaceId('subadviser_content', 'Growth Rate', 'Rast Prebivalstva');
	replaceId('subadviser_content', 'Base', 'Osnova');
	replaceId('subadviser_content', 'Modifiers', 'Dodatki');
	replaceId('subadviser_content', 'Construction Underway!', 'Poteka širitev bivalnih površin!');
	replaceId('subadviser_content', 'Estimated Time Left', 'Konec čez približno');
	replaceId('subadviser_content', 'Current population needs', 'Trenutne potrebe');
	replaceId('subadviser_content', 'Tax', 'Davek');
	replaceId('subadviser_content', 'citizen', 'prebivalca');
	replaceId('subadviser_content', 'Needs/round', 'Potrebe/rundo');		
	replaceId('subadviser_content', 'Have', 'Trenutno');
	replaceId('subadviser_content', 'For successfully living', 'Za uspešno življenje');
	replaceId('subadviser_content', 'Tax', 'Davek');
	replaceId('subadviser_content', 'citizen', 'prebivalca');
	replaceId('subadviser_content', 'Requires (/round where applicable)', 'Zahteve (/rundo, kjer je to mogoče)');
	replaceId('subadviser_content', 'Have', 'Trenutno');		
}


if (location.href == 'http://babylon.xemerys.com/magic' || location.href == 'http://babylon.xemerys.com/Magic') {
	replaceId('subadvisers', 'Magic Adviser', 'Magija');
	replaceId('subadviser_content', 'Energy', 'Energija');
	replaceId('subadviser_content', 'Available Energy', 'Stanje Energije');
	replaceId('subadviser_content', 'Storage will be full in', 'Energija se bo napolnila čez');
	replaceId('subadviser_content', 'Sanctuary', 'Zavetišče');
	replaceId('subadviser_content', "Sanctuary provides immunity against hex spells. However, while Sanctuary is active, you won't be able to cast hexes on other cities.", 'Zavetišče zagotovi varnost pred škodljivimi uroki. Ampak, dokler je Zavetišče aktivno, ne boš mogel uporabiti škodljivih urokov na drugih mestih.');
	replaceId('subadviser_content', 'Duration', 'Trajanje');
	replaceId('subadviser_content', 'You can activate Sanctuary in', 'Zavetišče lahko aktiviraš čez');	
	replaceId('subadviser_content', 'Cataclysm Defender', 'Zaščita pred Uničenjem');
	replaceId('subadviser_content', "Get your Defender TODAY! What a small price to pay for your city safety when the cataclysm pwns our world. For a day your city will be immune to its effects and all your people will mention you in their prayers after a booze night.", 'Zaščiti se še DANES! Majhna cena za varnost tvojega mesta, ko naš svet zadane uničenje. Za en dan bo tvoje mesto povsem varno in vsi ljudje te bodo omenjali v svojih molitvah po prekrokani noči.');
	replaceId('subadviser_content', 'Duration', 'Trajanje');
}


if (location.href == 'http://babylon.xemerys.com/research' || location.href == 'http://babylon.xemerys.com/Research') {
	replaceId('subadvisers', 'Research', 'Raziskave');
	//replaceId('subadviser_content', '<label class="parent">Researching:</label>', '<label class="parent">Raziskujemo:</label>');
	//replaceId('subadviser_content', 'Researched', 'Raziskano');
	//replaceId('subadviser_content', 'Estimated Time Left', 'Konec čez približno');
}


if (location.href == 'http://babylon.xemerys.com/diplomacy' || location.href == 'http://babylon.xemerys.com/Diplomacy') {
	replaceId('subadvisers', 'Diplomacy Adviser', 'Diplomacija');
	//replaceId('subadviser_content', 'Note', 'Opomba');
	//replaceId('subadviser_content', 'Up to 7 days old messages are stored', 'Shranjena so sporočila zadnjih 7 dni');
	//replaceId('subadviser_content', 'Received Messages', 'Prejeta Sporočila');
	//replaceId('subadviser_content', 'Sent Messages', 'Poslana Sporočila');
}


	replaceId('influence-content-1', 'Total Influence', 'Ugled Mesta');
	replaceId('influence-content-1', 'Total Influence', 'Ugled Mesta');
	replaceId('influence-content-1', 'Base', 'Osnova');
	replaceId('influence-content-1', 'Modifiers', 'Dodatki');
	replaceId('mana-content-1', 'Energy', 'Energija');
	replaceId('mana-content-1', 'Energy', 'Energija');
	replaceId('mana-content-1', 'Base', 'Osnova');
	replaceId('mana-content-1', 'Modifiers', 'Dodatki');
	replaceId('happy-content-1', 'Happiness', 'Zadovoljstvo');
	replaceId('happy-content-1', 'Default', 'Osnova');
	replaceId('happy-content-1', 'Services', 'Storitve');
	replaceId('happy-content-1', 'Luxuries', 'Afrodizijak');
	replaceId('happy-content-1', 'From population', 'Od Populacije');
	replaceId('happy-content-1', 'Unsatisfied Needs', 'Nepotešene Potrebe');
	replaceId('happy-content-1', 'Unemployed', 'Nezaposlenost');
	replaceId('happy-content-1', 'Modifiers', 'Dodatki');
	replaceId('health-content-1', 'Health', 'Zdravje');
	replaceId('health-content-1', 'Default', 'Osnova');
	replaceId('health-content-1', 'Services', 'Zdravstvene Storitve');
	replaceId('health-content-1', 'Luxuries', 'Vino');
	replaceId('health-content-1', 'Squalor', 'Nesnaga');
	replaceId('health-content-1', 'Modifiers', 'Dodatki');

}


var end = new Date().getTime();
var time = end - start;
document.getElementById('footer').innerHTML += "<br>Xemerys Beta Script execution time: " + time + "ms.";