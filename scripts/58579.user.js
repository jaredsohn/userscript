// ==UserScript==
// @name           	[QLL] Quick Lunar Links
// @namespace      	www.erepublik.com
// @author	   		Lunar
// @description    	Packet of usefull functions, which extend erepublik capabilities.
// @version        	1.60
// @include        	http://www.erepublik.com/*
// @include        	http://*.erepublik.com/*
// @include        	http://economy.erepublik.com/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

/* Supporters:
inoxek
*/
//<a class="tourstart padded">
// CONSTANTS - DO NOT CHANGE
var qll_version=1.60;
var qll_serverURI="http://lunar.zzl.org/qll";
var qll_API="http://api.erepublik.com/v2/feeds/";
var qll_loadingImg="http://img514.imageshack.us/img514/984/loading8.gif";
var qll_GMSupport=true;

// These settings are default one, and can be altered via provided QLL Menu
var qll_opt = new Array();
qll_opt['utility:orders:newspaper']=179170;
qll_opt['system:language']='ENG';
//qll_opt['module:gameinfo']=false;
/*qll_opt['module:economic']=true;
qll_opt['module:economic:company']=true;
qll_opt['module:economic:marketplace']=true;*/
qll_opt['module:style:chicken:error']='http://img683.imageshack.us/img683/6885/chk.jpg';
qll_opt['system:systemboxcolor']='#40a0c0';//'#66ccdd'
qll_opt['system:systemfontcolor']='#ffffff';
qll_opt['system:activeboxcolor']='#00ff00';
qll_opt['system:notactiveboxcolor']='#ff0000';
qll_opt['system:activefontcolor']='#000000';
qll_opt['system:notactivefontcolor']='#000000';
qll_opt['css:dim']='#222222';
qll_opt['css:global:bg']='#ffffff';
qll_opt['css:global:fontc']='#000000';
qll_opt['css:global:borderc']='#66a2ff';
qll_opt['css:menu:bg']='#40a0c0';
qll_opt['css:menu:fontc']='#ffffff';
qll_opt['css:menu:borderc']='#66a2ff';
qll_opt['css:Hmenu:bg']='#60c0e0';
qll_opt['css:Hmenu:fontc']='#ffffff';
qll_opt['css:Hmenu:borderc']='#5599ee';
qll_opt['css:button:bg']='#40a0c0';//'#66a2ff'
qll_opt['css:button:fontc']='#ffffff';
qll_opt['css:button:borderc']='#66a2ff';
qll_opt['css:input:bg']='#88ddff';
qll_opt['css:input:fontc']='#000000';//'#781351'
qll_opt['css:input:borderc']='#781351';
qll_opt['css:q:bg']='#ffffc0';
qll_opt['css:q:fontc']='#781351';
qll_opt['css:q:borderc']='#cccc77';
//colors: input;button;rest

sem = new Object();
sem.count=0;
sem.obj = new Array();
sem.data = new Array();
sem.val = new Array();
sem.ajax = location.href;

// system name, id, lang-id, expand, major cat
// system name == false : row value is not mapped in qll_opt
// lang-id == -1 : not showed in menu
var qll_optdet = [
[false, 'QLLVersion', -1],
['system:checkupdates', 'QLLMenuUpdates', 6, false],
['system:language', 'QLLMenuLanguage', 7, true],
[false, 'QLLMenuSettings', 34, true],
['utility:radiochecked', 'QLLMenuRadiochecked', 15, false],
['utility:qllformatting', 'QLLMenuQllFormatting', 20, true],
['utility:qllformatting:pm', 'QLLMenuQllFormattingPM', 93, false, 'QLLMenuQllFormatting'],
['utility:qllformatting:article', 'QLLMenuQllFormattingArticle', 94, false, 'QLLMenuQllFormatting'],
['utility:qllformatting:comment', 'QLLMenuQllFormattingComment', 95, false, 'QLLMenuQllFormatting'],
['utility:qllformatting:rawtext', 'QLLMenuQllFormattingRawtext', 91, false, 'QLLMenuQllFormatting'],
['utility:qllformatting:autoyt', 'QLLMenuQllFormattingAutoYT', 92, false, 'QLLMenuQllFormatting'],
['utility:search','QLLMenuSearch',64,false],
['utility:keepalive','QLLMenuKeepalive',89,false],
['utility:notepad', 'QLLMenuNotepad', 21, false],
[false, 'QLLMenuNotepad:content', -1],
[false, 'QLLMenuMessage', 45, true],
['utility:message:signature', 'QLLMenuMessageSignature', 44, true, 'QLLMenuMessage'],
[false, 'QLLMenuMessageSignature:content', -1],
[false, 'QLLMenuArticle', 41, true],
['utility:article:cache', 'QLLMenuArticleCache', 25, false, 'QLLMenuArticle'],
['utility:article:signature', 'QLLMenuArticleSignature', 42, true, 'QLLMenuArticle'],
[false, 'QLLMenuArticleSignature:content', -1],
['utility:article:quote', 'QLLMenuArticleQuote', 70, false, 'QLLMenuArticle'],
[false, 'QLLMenuArticleCache:title', -1],
[false, 'QLLMenuArticleCache:content', -1],
['utility:orders', 'QLLMenuOrders', 30, true],
['utility:orders:newspaper', 'QLLMenuOrdersNewspaper', -1],
/*['module:gameinfo', 'QLLMenuGameinfo', 51, true],
[false, 'QLLMenuGameinfoCountries', -1],
[false, 'QLLMenuGameinfoGoldvalue', -1],
[false, 'QLLMenuGameinfoMarket', -1],
[false, 'QLLMenuGameinfoCompanies', -1],
[false, 'QLLMenuGameinfoCitizens', -1],*/
[false, 'QLLMenuErepmenu', 46, true],
['module:erepmenu:design', 'QLLMenuErepmenuDesign', 47, false, 'QLLMenuErepmenu'],
['module:economic', 'QLLMenuEconomic', 48, true],
/*['module:economic:company', 'QLLMenuEconomicCompany', 50, false, 'QLLMenuEconomic'],
['module:economic:marketplace', 'QLLMenuEconomicMarketplace', 57, false, 'QLLMenuEconomic'],*/
['module:economic:monetary', 'QLLMenuEconomicMonetary', 58, false, 'QLLMenuEconomic'],
['module:economic:work', 'QLLMenuEconomicWork', 90, false, 'QLLMenuEconomic'],
['module:hotchicks:sidebar', 'QLLMenuHotChicksSidebar', 19, false],
['module:style', 'QLLMenuStyle', 78, true],
['module:style:chicken', 'QLLMenuStyleChicken', 81, true, 'QLLMenuStyle'],
['module:style:chicken:error', 'QLLMenuStyleChickenError', -1],
['module:style:serif', 'QLLMenuStyleSerif', 80, false, 'QLLMenuStyle'],
['module:links', 'QLLMenuLinks', 10, true],
[false, 'QLLMenuLinksDataGlinks', -1],
[false, 'QLLMenuLinksDataMlinks', -1],
['module:links:label:smallfont', 'QLLMenuLinksSmallFont', 14, false, 'QLLMenuLinks'],
['module:links:listitem:centered', 'QLLMenuLinksCenter', 12, false, 'QLLMenuLinks'],
['module:links:listitem:autoresize', 'QLLMenuLinksResize', 13, false, 'QLLMenuLinks'],
['module:links:listitem:showimages', 'QLLMenuLinksImage', 14, false, 'QLLMenuLinks']
];
 
var qll_langmt=new Array(
new Array('Dostępny nowy QLL','Obecny:','Nowy:','QLL jest zaktualizowany','Kliknij by wysłać wiadomość do tego gracza','Menu QLL','Sprawdzaj aktualizacje','Wybierz język','Blokuj reklamy','Szybkie wiadomości','Pokazuj linki','Mały litery na listwie','Wyśrodkuj elementy list','Dostosuj rozmiar elementów listy','Pokazuj obrazki elementów listy','Loguj z autologowaniem','Polski','English','Dziennik Zmian','Gorące kobiety','Formatowanie tekstu QLLFORMATTING','Notatnik','Zapisz zawartość notatnika','Usunięto wszystkie informacje przechowywane przez QLL na twoim komputerze','Kliknij przycisk pod oknem notatnika aby zapisać jego zawartość.\nProszę unikać przechowywania bardzo dużych ilości danych.','Cache artykułów','Załaduj z cache','Wyczyść cache','Twój cache artykułów jest pusty','Próbowałeś załadować zawartość artykułu z cache podczas gdy zawartość obecnego artykułu nie jest pusta.\nWyczyść zawartość obecnego artykułu i spróbuj ponownie.','Rozkazy','Oficjalne rozkazy','Zobacz treść rozkazów','Rozwiń/Zwiń','Menedżer Ustawień','ID gazety','Importuj','Eksportuj','Wyczyść pole','Ustawienia zapisane','Wpisane dane są błędne.\nWklej ciąg znaków wygenerowany przez QLL aby uniknąć błędów.\nUpewnij się czy wersja QLL z której eksportujesz ustawienia jest taka sama jak wersja do której je importujesz.','Artykuły','Podpis w komentarzach','Zapisz','Podpis w prywatnych wiadomościach','Prywatne wiadomości','Modyfikacje menu erepublik','Alternatywne rozmieszczenie linków','Moduł ekonomiczny','Odśwież kursy walut','Menedżer firm','Dane z gry','Odśwież dane państw','Błąd pobierania danych z eAPI','Pobrano dane z eAPI','Ta opcja do poprawnego działania wymaga uprzedniego wykonania innych funkcji. Czy chcesz teraz wykonać wymagane operacje?','Odśwież dane z marketu','Doradca rynkowy','Doradca rynku walutowego','Informacje o nadawcy','Szukaj gracza','Szukaj firmy','Szukaj w artykułach','Przeszukaj eRepublik','Pasek wyszukiwania','Przeszukaj eRepwiki','Wpisz szukaną frazę','Odśwież dane firmy','Menedżer firmy','Bitwy, w których możesz walczyć','Szybkie cytaty','Tradycyjny wygląd','Prenumeraty','Świat bez Lany','Trenuj','QLL przybliża do tradycji','Zamień waluty','Dodaj gracza do przyjaciół','Style','Adres URL','Używaj czcionki szeryfowej','Gorący kurczak','Info','Gazeta Lunarka','Wesprzyj Lunarka','Partie polityczne','Grupy wojskowe','Sprawy państwowe','Narzędzia','Utrzymuj sesję','Doradca pracownika','Parsuj znaczniki tekstowe', 'Automatycznie parsuj linki do youtube', 'Włącz QLLFORMAT w prywatnych wiadomościach', 'Włącz QLLFORMAT w artykułach', 'Włącz QLLFORMAT w komentarzach do artykułów', 'Włącz QLLFORMAT w shoutach', 'Stwórz nową firmę'),
new Array('There is new QLL!','Current:','New:','QLL is up to date','Click to send message to this player','QLL Menu','Check for updates','Choose language','Block adverts','Instant messages','Show linkbar','Small label font','Center items on link list','Autoresize linklist items','Show images on linklist items','Login with autologin','Polski','English','Changelog','Hot chicks','QLLFORMATTING text formatting','Notepad','Save notepad content','All data stored on your PC by QLL were deleted','Click button under textarea to save content.\nPlease avoid storing very large amount of data.','Article cache','Reload from cache','Remove from cache','Your article cache is empty','You tried to reload article from cache while your new article content was not empty.\nClear article content and try again.','Orders','Official orders','See orders content','Show/Hide','Settings manager','Newspaper ID','Import','Export','Clear field','Settings saved','Inserted data is invalid.\nPaste string generated by QLL to avoid errors.\nBe sure that QLL version from which you export is same as QLL version to which you import.','Articles','Comments signature','Save','Private messages signature','Private messages','Erepublik menu modifications','Link\'s alternative arrangement','Economic module','Refresh currencies rates','Company manager','Game data','Refresh countries data','Error occured during eAPI feeds downloading','eAPI data fetch completed','To work properly this option must be executed after some other functions. Do you want to execute required operations now?','Refresh market data','Marketplace advisor','Monetary market advisor','Sender information','Search citizen','Search company','Search articles','Search eRepublik','Searchbar','Search eRepwiki','Type in your search','Refresh company data','Company manager','Battles you can fight in','Quick quotes','Traditional design','Subscriptions','World without Lana','Train','QLL brings You closer to tradition','Swap currencies','Add as a friend','Styles','URL address','Use serif font','Hotchicken','Info','Lunarek Newspaper','Donate to Lunarek','Political parties','Military groups','State affairs','Tools','Session keepalive','Worker advisor','Parse raw text tags', 'Automatically parse youtube links', 'Enable QLLFORMAT in private messages', 'Enable QLLFORMAT in articles', 'Enable QLLFORMAT in article\'s comments', 'Enable QLLFORMAT in shouts', 'Create new company')
) // last index: 97

// to be reused: 8, 71, 72, 73, 96, 59, 44

var qll_industry=new Array("food", "gift", "weapon", "ticket", "grain", "diamonds", "iron", "oil", "wood", "house", "hospital", "defense-system");

var qll_imgmt = new Array();
qll_imgmt[0]=new Array();
qll_imgmt[0]['menu0']=new Array('http://img182.imageshack.us/img182/7962/ereptoolbar1a.png','http://img156.imageshack.us/img156/6531/ereptoolbar1b.png');
qll_imgmt[0]['menu1']=new Array('http://img24.imageshack.us/img24/5818/ereptoolbar2a.png','http://img42.imageshack.us/img42/2069/ereptoolbar2b.png');
qll_imgmt[0]['menu2']=new Array('http://img24.imageshack.us/img24/5659/ereptoolbar3a.png','http://img18.imageshack.us/img18/3875/ereptoolbar3b.png');
qll_imgmt[0]['menu3']=new Array('http://img3.imageshack.us/img3/6595/ereptoolbar4a.png','http://img156.imageshack.us/img156/1160/ereptoolbar4b.png');
qll_imgmt[0]['menu4']=new Array('http://img148.imageshack.us/img148/5816/ereptoolbar5a.png','http://img42.imageshack.us/img42/3672/ereptoolbar5b.png');
qll_imgmt[1]=new Array();
qll_imgmt[1]['menu0']=new Array('http://img21.imageshack.us/img21/9305/ereptoolbar1ae.png','http://img255.imageshack.us/img255/2859/ereptoolbar1be.png');
qll_imgmt[1]['menu1']=new Array('http://img21.imageshack.us/img21/6190/ereptoolbar2ae.png','http://img511.imageshack.us/img511/1665/ereptoolbar2be.png');
qll_imgmt[1]['menu2']=new Array('http://img97.imageshack.us/img97/9695/ereptoolbar3ae.png','http://img21.imageshack.us/img21/4719/ereptoolbar3be.png');
qll_imgmt[1]['menu3']=new Array('http://img511.imageshack.us/img511/6915/ereptoolbar4ae.png','http://img21.imageshack.us/img21/903/ereptoolbar4be.png');
qll_imgmt[1]['menu4']=new Array('http://img21.imageshack.us/img21/1064/ereptoolbar5ae.png','http://img21.imageshack.us/img21/9925/ereptoolbar5be.png');
var qll_lang; var qll_img;

function qll_module_links()
{

	var mylinks ={
'Wesprzyj Lunarka!' : 'http://www.erepublik.com/en/citizen/donate/items/1376818',
'Lunarek Newspaper' : 'http://www.erepublik.com/en/newspaper/186857',
'Lunarek' : 'http://www.erepublik.com/en/citizen/profile/1376818',
'LC' : 'http://www.erepublik.com/en/organization/1496275',
'LC - Poland' : 'http://www.erepublik.com/en/organization/1583778',
'LC - Australia' : 'http://www.erepublik.com/en/organization/1957001',
'LC - Hungary' : 'http://www.erepublik.com/en/organization/1958230',
'Preview' : 'http://www.erepublik.com/en/article/805826',
'Twój link 1' : '',
'Twój link 2' : '',
'Twój link 3' : ''
};

	var parties ={
'[NP] Niezależna Polska' : {'http://www.niezaleznapolska.pl/' : 'http://img18.imageshack.us/img18/8793/nplogo.png'},
'[PPP] Polska Partia Patriotyczna' : 'http://ppp.cineq.info/',
'[PI] Partia Imperialna' : 'http://www.partiaimperialna.fora.pl/',
'[PWL] Partia Wolnych Ludzi' : 'http://pwl.org.pl/',
'[ND] Narodowa Demokracja' : 'http://erepublik-polska.pl/ND/index.php',
'Synergia' : ' http://www.ebabyboom.pl',
'[WR] Wielka Rzeczpospolita' : 'http://www.wrp.fora.pl/',
'[PPL] Polska Partia Libertariańska' : 'http://www.elibertarianie.fora.pl/'
};

	var military ={
'[ONP] Oddział Niezależnej Polski' : 'http://www.niezaleznapolska.pl/index.php?c=11',
'[WP] Wojsko Polskie' : 'http://www.wojskopolskie.eu',
'[GROM]' : 'http://www.grom.pq.pl/forum',
'[POG]Polish Operation Group' : 'http://justmaku.pl/pog/',
'[PMTF] Polish Multi - Task Force' : 'http://www.elite.teamgoo.net/',
'[PSP] Pluton Strzelców Polskich' : 'http://www.psperep.fora.pl/',
'Husaria' : 'http://www.ehusaria.pun.pl/forums.php',
'[PMO] Polish military organization' : 'http://polishmilitaryorganization.pl.tl/Strona-glowna.htm',
'[POW] Polska Organizacja Wojskowa' : 'http://www.poworg.fora.pl/',
'[PPA] Polish Private Army' : 'http://eppa.pl/',
'[BDS] Brygada Desantowo-Szturmowa' : 'http://www.bds.fora.pl/',
'Rabbits' : 'http://www.justmaku.pl/pog/',
'[SoLib] Sons of Liberty' : 'http://solib.oz.pl/',
'[AI] Armia Imperialna' : 'http://www.partiaimperialna.fora.pl/'
};

	var countrylinks ={
'Polskie forum erepublik' : 'http://www.erepublik.com.pl/',
'MON' : {'http://www.erepublik.com/en/newspaper/179170' : 'http://img42.imageshack.us/img42/1732/monmj.gif'},
'MEN' : {'http://www.erepublik.com/en/newspaper/199163' : 'http://img263.imageshack.us/img263/7537/menv.jpg'},
'MSZ' : {'http://www.erepublik.com/en/newspaper/186062' : 'http://img263.imageshack.us/img263/5440/msz2.jpg'},
'MGiF' : 'http://www.erepublik.com/en/newspaper/179529',
'Marszałek Kongresu' : {'http://www.erepublik.com/en/newspaper/189107/1' : 'http://img338.imageshack.us/img338/9623/marszkong.jpg'},
'Polskie nowości prasowe' : 'http://www.erepublik.com/en/news/latest/1/35',
'IRC przez webchat' : 'http://webchat.quakenet.org/?channels=erepublik.pl',
'Radio eRepublik.pl' : 'http://www.eRepublik.com.PL/listen.pls',
'Radio ePolska' : 'http://shouted.pl:8050/listen.pls'
};

	var tools ={
'Article visitors counter' : 'http://qll.lunar.byethost13.com/modules/article/',
'Carboon Tools' : 'http://ereptools.net/',
'Kernel Tools' : 'http://er.kernel-tools.eu/',
'Egovernment' : 'http://www.egovstats.info/index.php',
'Mapa eGobba' : 'http://www.egobba.de/',
'Erepublik plus' : 'http://www.erepublik.com/en/newspaper/187657/1',
'eRepublik Citizen Info' : 'http://www.erepublik.com/en/newspaper/209251',
'eRepublik.ws' : 'http://erepublik.ws/',
'eAnalytics' : 'http://ea.liberwing.com',
'CCCP Group tools' : 'http://www.cccp-group.org/',
'Gecko Ltd eRepublik Tools' : 'http://erepmarket.co.cc/',
'Poradnik dla nowych' : 'http://www.erepublik.com.pl/poradnik',
'Zbiór poradników' : 'http://www.erepublik.com.pl/forum/t-3805'
};

	men=document.getElementById('nav')

	var inner = new Array();
	inner[0] = inner[1] = inner[2] = inner[3] = inner[4] = '';

	var qll_content = new Array(parties,military,countrylinks,tools,mylinks);

	var g = new Array();
	for(var i=0;i<5;i++)
	{
		g[i] = document.createElement("li"); g[i].setAttribute('id', 'QLLmenu'+(i+1));
		inner[i]='\t\t<a href="#"><img src="';
		if(qll_opt['module:links:label:smallfont'])
			inner[i] = inner[i] + qll_img['menu'+i][1];
		else
			inner[i] = inner[i] + qll_img['menu'+i][0];
		inner[i] = inner[i] + '"></a>\n\t\t<ul>\n';
	}

	for(i=0;i<5;i++)
	{
		for(unit in qll_content[i])
		{
	 	 	inner[i]= inner[i] + '\t\t\t<li><a ';
	  		if(qll_opt['module:links:listitem:centered'] || qll_opt['module:links:listitem:autoresize'])
	  		{	inner[i]= inner[i] + 'style="';
	  			if(qll_opt['module:links:listitem:centered'])
	  				inner[i]= inner[i] + 'text-align:center;';
  				if(qll_opt['module:links:listitem:autoresize'] && unit.length > 21)
	  				inner[i]= inner[i] + 'font-size:9px';
  				inner[i]= inner[i] + '" ';
	  		}
   			if(qll_content[i][unit]=='[object Object]' && qll_opt['module:links:listitem:showimages'])
   			{
       			for(object in qll_content[i][unit])
       			{
        			inner[i] = inner[i] + 'href="' + object + '"><img class="QLLlinkimg" height="27" src="' + qll_content[i][unit][object] + '" border="0">' + unit + '</a></li>\n';
	 			}
	 		}
			else if(qll_content[i][unit]=='[object Object]' && !qll_opt['module:links:listitem:showimages'])
			{
				for(object in qll_content[i][unit])
				{
					inner[i] = inner[i] + 'href="' + object + '">' + unit + '</a></li>\n';
				}
			}
		 	else
		 	{	inner[i] = inner[i] + 'href="' + qll_content[i][unit] + '">' + unit + '</a></li>\n';}
 		}
	}



	for(i=0;i<5;i++)
	{
		inner[i] = inner[i] + '\t\t</ul></li>\n';
		g[i].innerHTML=inner[i];
	}


/*
	[ENG] Here you can disable one or many boxes, to do so, just put "//" before appropriate line.
	*****************************************************************************
	[POL] Tutaj możesz wyłączyć jeden lub więcej boxów, wystarczy wstawić "//" przed odpowiednią linią.
*/

	men.appendChild(g[0]) // Partie polityczne
	men.appendChild(g[1]) // Grupy wojskowe
	men.appendChild(g[2]) // Sprawy państwowe
	men.appendChild(g[3]) // Narzędzia
	men.appendChild(g[4]) // Pozostałe linki
}

// Here are declared all functions

//	-= Bootstraper =-
function qll_main()
{//qll_system_settings_delete();
	try
	{	opera.postError('');	qll_GMSupport=false;}
	catch(err)
	{}
	try
	{	GM_listValues();	}
	catch(err)
	{	qll_GMSupport=false;	}
	
	qll_system_settings_update();
    qll_system_settings_load();
	qll_styles();

	switch(qll_opt['system:language'])
	{
		case 'POL': qll_lang=qll_langmt[0]; qll_img=qll_imgmt[0]; break;
		case 'ENG': qll_lang=qll_langmt[1]; qll_img=qll_imgmt[1]; break;
		default: qll_lang=qll_langmt[0]; qll_img=qll_imgmt[0];
	}
	
	qll_module_style();

	// chicken auto reloader ^.^
	error=document.getElementById('error');
	if(error!=null)
	{		
	
		var chk=setInterval(function()
		{
			$.ajax(
			{
				url: "http://www.erepublik.com/en",
				cache: false,
				success: function(html)
				{	
					if(html.match(/<body id="error">/)==null)
					{
						clearInterval(chk);
						window.location.reload();
						return;
					}
				}
			});
		},1000);
		return;
	}
	
	url=location.pathname;
	page=url.replace(/\/[a-z][a-z][\/]?/,"");
	index=page.indexOf("/");
	if(index>0)
		page=page.substr(0,index);

	// prevention in running QLL in ridiculous places
	if(location.pathname.match(/\/[a-z][a-z]\/chat\/open\/.*/)			// chat window
		|| location.pathname.match(/.*.js/)								// .js files
		|| location.pathname.match(/.*.css/)							// .css files
		|| location.hostname.match(/.*wiki\.erepublik\.com.*/)			// wiki
		|| location.hostname.match(/.*api\.erepublik\.com.*/)			// api
		|| location.hostname.match(/.*ads\.erepublik\.com.*/)			// ads
		|| location.hostname.match(/.*tickets\.erepublik\.com.*/)		// tickets
		|| location.pathname.match(/\/[a-z][a-z]\/tickets\/report\/.*/)	// ticket
	)
	{	return;	}
	
	if(window.parent != window)
	{	// we are inside of frame
		
		try{qll_utility_qllformatting_preview();}catch(e){}
		return;
	}
		
	chk=document.getElementById('remember');
	
	qll_system_menu();
//	qll_module_ajax();
	if(qll_opt['module:links'])							try{qll_module_links_display();}catch(e){}
	if(qll_opt['utility:search'])						try{qll_utility_search();}catch(e){}
	
    if(chk==null)
    {   // not main page - logged in
		try{qll_module_erepmenu();}catch(e){}
		if(qll_opt['utility:keepalive'])					try{qll_utility_keepalive();}catch(e){}
		try{qll_utility_qllformatting();}catch(e){}
		if(qll_opt['utility:notepad'])						try{qll_utility_notepad();}catch(e){}
		if(qll_opt['system:checkupdates'])					try{qll_system_checkupdates();}catch(e){}
		if(qll_opt['module:hotchicks:sidebar'])				try{qll_module_hotchicks_sidebar();}catch(e){}
	//	if(qll_opt['module:links'])							qll_module_links();
	//alert(location.pathname);
		switch(true)
		{
			case location.pathname.match(/en\/main\/messages-compose\/[0-9]+$/) !== null:
				if(qll_opt['utility:message:signature'])	try{qll_utility_messages_signature();}catch(e){}
				break
			case location.pathname.match(/work$/) !== null:
				if(qll_opt['module:economic:work'])			try{qll_module_economic_work();}catch(e){}
				break;
		}
	
		switch(page)
		{	
			case '':
				if(qll_opt['utility:orders'])				try{qll_utility_orders();}catch(e){}
				break;
			case 'write-article':
			case 'edit-article':
				if(qll_opt['utility:article:cache'])		try{qll_utility_article_cache();}catch(e){}
				break;
			case 'article':
				if(qll_opt['utility:article:signature'])	try{qll_utility_article_signature();}catch(e){}
				if(qll_opt['utility:article:quote'])		try{qll_utility_article_quote();}catch(e){}
				break;
/*			case 'market':
				if(qll_opt['module:economic:marketplace'] && qll_opt['module:economic'] && qll_opt['module:gameinfo'])
					qll_module_economic_marketplace();
				break;*/
			case 'exchange':
				if(qll_opt['module:economic:monetary'])		try{qll_module_economic_monetary();}catch(e){}
				break;
/*			case 'company':
				if(qll_opt['module:economic:company'] && qll_opt['module:economic'] && qll_opt['module:gameinfo'])
					qll_module_economic_company();*/
			default:
		}
	}
	else
	{   // main page - not logged in
		if(qll_opt['utility:radiochecked'])	try{qll_utility_boxchecked();}catch(e){}
	}
}

function qll_styles()
{
	GM_addStyle('.QLLmsg {display: inline;width:22px;height:21px;background:url(http://www.erepublik.com/images/parts/map-erepublik-logged.png) no-repeat -199px 0px;float:left;margin-right:6px;background-position:-199px 0px;}');
	GM_addStyle('.QLLalert {display: inline;width:22px;height:21px;background:url(http://www.erepublik.com/images/parts/map-erepublik-logged.png) no-repeat -153px 0px;float:left;margin-right:6px;background-position:-153px 0px;}');
	GM_addStyle('#menu ul li#menu6 ul li a:hover {color: #FFF; background: url(http://www.erepublik.com/images/parts/map-erepublik-logged.png) 0px -899px no-repeat;}');
	GM_addStyle('#menu ul li#menu6 ul li a{width: 135px; height: 27px; padding: 13px 15px 0px 28px; font-size: 12px; color: #808080; float: left; display: block; text-decoration: none; background: url(http://www.erepublik.com/images/parts/map-erepublik-logged.png) 0px -940px no-repeat;}');
	
	// #menu ul li#QLLmenuid a[:hover]styles
	GM_addStyle('#menu ul li#QLLmenu1 a {width: 190px;background-position: 0px -369px;}');
	GM_addStyle('#menu ul li#QLLmenu2 a {background-position: -190px -369px;}');
	GM_addStyle('#menu ul li#QLLmenu3 a {background-position: -381px -369px;}');
	GM_addStyle('#menu ul li#QLLmenu4 a {background-position: -572px -369px;}');
	GM_addStyle('#menu ul li#QLLmenu5 a {background-position: -763px -369px;}');
	
	GM_addStyle('#menu ul li#QLLmenu1 a:hover {background-position: 0px -417px;}');
	GM_addStyle('#menu ul li#QLLmenu2 a:hover {background-position: -190px -417px;}');
	GM_addStyle('#menu ul li#QLLmenu3 a:hover {background-position: -381px -417px;}');
	GM_addStyle('#menu ul li#QLLmenu4 a:hover {background-position: -572px -417px;}');
	GM_addStyle('#menu ul li#QLLmenu5 a:hover {background-position: -763px -417px;}');
	GM_addStyle('#menu ul li#QLLmenu5 ul {width: 189px;}');
	
	// #menu ul li#QLLmenuid ul li a[:hover] styles
	GM_addStyle('#menu ul li#QLLmenu1 ul li a, #menu ul li#QLLmenu2 ul li a, #menu ul li#QLLmenu3 ul li a, #menu ul li#QLLmenu4 ul li a, #menu ul li#QLLmenu5 ul li a {width: 135px;height: 27px;padding: 5px 10px 5px 28px;font-size: 12px;color: #808080;float: left;vertical-align:middle;display: block;text-decoration: none;background: url(http://www.erepublik.com/images/parts/map-erepublik-logged.png) 0px -940px no-repeat;}');
	GM_addStyle('#menu ul li#QLLmenu1 ul li a:hover, #menu ul li#QLLmenu2 ul li a:hover, #menu ul li#QLLmenu3 ul li a:hover, #menu ul li#QLLmenu4 ul li a:hover, #menu ul li#QLLmenu5 ul li a:hover {color: #FFF;background: url(http://www.erepublik.com/images/parts/map-erepublik-logged.png) 0px -899px no-repeat;}');
	
	GM_addStyle('.QLLlinkimg {float:left;}');
	
	// qll system menu
	GM_addStyle('#QLLSMenu {position:fixed; top:30px; left:0px; width:50px; z-index:30000;}');
	GM_addStyle('.QLLSMenuHolder {width:40px; margin-top:10px; position:relative;}');
	GM_addStyle('.QLLSMenuMHeader {width:40px; vertical-align:top; height:40px; outline:'+ qll_opt['css:menu:borderc'] +' double 3px; background-color:' + qll_opt['css:menu:bg'] + '; color:'+qll_opt['css:menu:fontc']+'; text-align:center; overflow:hidden;}');
	GM_addStyle('.QLLSMenuContainer {width:305px; z-index:30010; position:fixed; left:35px; top:40px; overflow:auto;}');
	GM_addStyle('.QLLSMenuHeader {width:270px; position:relative; left:15px; height:40px; outline:'+ qll_opt['css:menu:borderc'] +' solid 1px; background-color:' + qll_opt['css:menu:bg'] + '; color:'+qll_opt['css:menu:fontc']+'; text-align:center; font-weight:bold; font-size:large;}');
	GM_addStyle('.QLLSMenuElement {width:230px; min-height:20px; display:block; margin-top:5px; position:relative; left:35px; outline:'+ qll_opt['css:menu:borderc'] +' solid 1px; background-color:' + qll_opt['css:menu:bg'] + '; color:'+qll_opt['css:menu:fontc']+'; text-align:center; font-size:125%;}');
//	GM_addStyle('.QLLSMenuElementIButton {}');
	GM_addStyle('.QLLSMenuElementImage {height:30px;}');
	
	// qll system styles
	GM_addStyle('.QLLbox {color:'+qll_opt['system:systemfontcolor']+'; background-color:' + qll_opt['system:systemboxcolor'] + ';width: 108px; padding:3px; display:inline-block; border:3px solid gray; margin:2px;}');
	
	GM_addStyle('.QLLsystembox {color:'+qll_opt['system:systemfontcolor']+'; background-color:' + qll_opt['system:systemboxcolor'] + ';width: 108px; padding:3px; border:3px solid gray;margin:0px;}');
	GM_addStyle('.QLLactivebox {color:'+qll_opt['system:activefontcolor']+'; background-color:' + qll_opt['system:activeboxcolor'] + ';width: 108px; padding:3px; border:3px solid gray;margin:0px;}');
	GM_addStyle('.QLLnotactivebox {color:'+qll_opt['system:notactivefontcolor']+'; background-color:' + qll_opt['system:notactiveboxcolor'] + ';width: 108px; padding:3px; border:3px solid gray;margin:0px;}');
	
	GM_addStyle('.QLLIMGLoading {width:100%;max-width:50px; background-color:' + qll_opt['system:systemboxcolor'] + ';}');
	
	// q tag - in QLLFORMATTING
	GM_addStyle('q {display:block; color:'+qll_opt['css:q:fontc']+'; background:'+qll_opt['css:q:bg']+'; border:1px solid '+qll_opt['css:q:borderc']+'; padding:3px;}');
	
	// global definition of QLL objects
	GM_addStyle('.QLLInput {color:'+qll_opt['css:input:fontc']+'; background:'+qll_opt['css:input:bg']+'; margin:1px; border:1px solid '+qll_opt['css:input:borderc']+'}');
	GM_addStyle('.QLLButton {color:'+qll_opt['css:button:fontc']+'; background:'+qll_opt['css:button:bg']+'; margin:1px 5px; border:2px outset '+qll_opt['css:button:borderc']+'}');
	
	// QLL menu
	GM_addStyle('.QLLMenuHolder {width: 685px; padding:3px; border:3px solid gray; margin:3px; text-align:center;}');
	GM_addStyle('.QLLMenuHeader {color:'+qll_opt['system:systemfontcolor']+'; background-color:' + qll_opt['system:systemboxcolor'] + ';width: 98%; padding:3px; border:3px solid gray;margin:0px; text-align:center;}');
	GM_addStyle('.QLLMenuHeaderON {color:'+qll_opt['system:activefontcolor']+'; background-color:' + qll_opt['system:activeboxcolor'] + ';width: 98%; padding:3px; border:3px solid gray;margin:0px;}');
	GM_addStyle('.QLLMenuHeaderOFF {color:'+qll_opt['system:notactivefontcolor']+'; background-color:' + qll_opt['system:notactiveboxcolor'] + ';width: 98%; padding:3px; border:3px solid gray;margin:0px;}');
	
	GM_addStyle('.QLLMenuContent {color:'+qll_opt['system:systemfontcolor']+'; background-color:' + qll_opt['system:systemboxcolor'] + ';width: 98%; padding:3px; border:3px solid gray;margin:0px;}');
	GM_addStyle('.QLLMenuToggle {color:'+qll_opt['system:systemfontcolor']+'; background-color:' + qll_opt['system:systemboxcolor'] + ';width: 98%; padding:3px; border:3px solid gray;margin:0px;}');
	GM_addStyle('.QLLMenuTextarea {color:'+qll_opt['css:input:fontc']+'; background:'+qll_opt['css:input:bg']+'; width: 98%; padding:3px; border:3px solid '+qll_opt['css:input:borderc']+';margin:0px; overflow:auto}');
	
	// QLLDisplayBox
	GM_addStyle('#QLLDisplayDim {width:100%; height:100%; position:fixed; top:0px; left:0px; background:'+qll_opt['css:dim']+'; opacity:0.8; z-index:30000;}');
	GM_addStyle('#QLLDisplayBox {width:80%; height:90%; position:fixed; left:10%; top:40px; color:'+qll_opt['css:global:fontc']+'; background:'+qll_opt['css:global:bg']+'; z-index:35000; outline:groove '+qll_opt['css:global:borderc']+' 5px;}');
	GM_addStyle('#QLLDisplayBoxTitle {width:70%; height:30px; position:fixed; left:15%; top:70px; outline:groove '+qll_opt['css:global:borderc']+' 10px; z-index:35001; text-align:center; font-size:large;}');
	GM_addStyle('#QLLDisplayBoxContent {width:78%; position:fixed; left:11%; top:115px; bottom:60px; overflow:auto; text-align:center;}');
	GM_addStyle('#QLLDisplayBoxClose {float:right; z-index:35009;}');
	
	GM_addStyle('#QLLAlertBox {width:60%; height:60%; position:fixed; left:20%; top:140px; color:'+qll_opt['css:global:fontc']+'; background:'+qll_opt['css:global:bg']+'; z-index:35010; outline:groove '+qll_opt['css:global:borderc']+' 5px;}');
	GM_addStyle('#QLLAlertBoxTitle {width:50%; height:30px; position:fixed; left:25%; top:170px; outline:groove '+qll_opt['css:global:borderc']+' 10px; z-index:35011; text-align:center; font-size:large;}');
	GM_addStyle('#QLLAlertBoxContent {width:58%; position:fixed; left:21%; top:225px; bottom:160px; overflow:auto; text-align:center;}');
	GM_addStyle('#QLLAlertBoxClose {float:right; z-index:35019;}');
	
	//	hot chicks module
	GM_addStyle('.QLLBoxModHotChicks {width: 118px; padding:0px; border:1px solid gray;margin:0px;}');
	GM_addStyle('.QLLBoxModHotChicks img{width: 118px;}');
	
	// notepad module
	GM_addStyle('.QLLNotepad {width:691px; margin-bottom:10px;}');
	GM_addStyle('.QLLNotepad div{text-align:center; padding:3px; width:679px; margin:0px; border:3px solid gray; color:'+qll_opt['system:systemfontcolor']+'; background-color:' + qll_opt['system:systemboxcolor'] + '}');
	GM_addStyle('.QLLNotepad textarea{color:'+qll_opt['css:input:fontc']+'; background:'+qll_opt['css:input:bg']+'; width:685px; height:200px; overflow:auto;}');
}

// -= QLL System menu =-
function qll_system_menu()
{
	menu = document.createElement("div");
	menu.setAttribute('id','QLLSMenu');
	menu.setAttribute('name','QLLSMenu');
	document.getElementsByTagName("body")[0].appendChild(menu);
	
	h = document.createElement("div");
	h.setAttribute('id','QLLSMenuHolder_open');
	h.setAttribute('class','QLLSMenuHolder');
	h.innerHTML= '<div class="QLLSMenuMHeader" id="QLLSMenuMHeader_open">'+qll_lang[5]+'</div><div class="QLLSMenuContainer" id="QLLSMenuContainer_open"><div class="QLLSMenuHeader" id="QLLSMenuHeader_open">'+qll_lang[5]+'</div></div>';
	h.setAttribute('onmouseover','document.getElementById("QLLSMenuContainer_open").setAttribute("style","display:block;");');
	h.setAttribute('onmouseout','document.getElementById("QLLSMenuContainer_open").setAttribute("style","display:none;");');
	menu.appendChild(h);
	$("#QLLSMenuHeader_open").click(qll_menu);

	ch = Number(document.getElementById("QLLSMenuContainer_open").offsetHeight)+5;
	if(window.innerHeight-60 < ch) ch = Number(Number(window.innerHeight)-60);
	GM_addStyle("#QLLSMenuContainer_open {height:"+ch+"px;}");
	$("#QLLSMenuContainer_open").hide();
	
	
	h = document.createElement("div");
	h.setAttribute('id','QLLSMenuHolder_info');
	h.setAttribute('class','QLLSMenuHolder');
	h.innerHTML= '<div class="QLLSMenuMHeader" id="QLLSMenuMHeader_info">'+qll_lang[82]+'</div><div class="QLLSMenuContainer" id="QLLSMenuContainer_info"><div class="QLLSMenuHeader" id="QLLSMenuHeader_info">'+qll_lang[82]+'</div></div>';
	h.setAttribute('onmouseover','document.getElementById("QLLSMenuContainer_info").setAttribute("style","display:block;");');
	h.setAttribute('onmouseout','document.getElementById("QLLSMenuContainer_info").setAttribute("style","display:none;");');
	menu.appendChild(h);
	
	info = document.getElementById('QLLSMenuContainer_info');
	info.innerHTML = info.innerHTML + '<a class="QLLSMenuElement" id="QLLSMenuElement_changelog" href="#QLLSMenu">'+qll_lang[18]+'</a> \
		<a class="QLLSMenuElement" href="http://www.erepublik.com/en/newspaper/186857/1" target="_blank">'+qll_lang[83]+'</a> \
		<a class="QLLSMenuElement" href="http://economy.erepublik.com/en/citizen/donate/1376818" target="_blank">'+qll_lang[84]+'</a>';
	$("#QLLSMenuElement_changelog").click(function(){qll_fun_showDisplayBox(qll_lang[18], qll_serverURI + '/changelog', true);});
	
	ch = Number(document.getElementById("QLLSMenuContainer_info").offsetHeight)+5;
	if(window.innerHeight-60 < ch) ch = Number(Number(window.innerHeight)-60);
	GM_addStyle("#QLLSMenuContainer_info {height:"+ch+"px;}");
	$("#QLLSMenuContainer_info").hide();
}

function qll_system_data_download_raw(filepath, memory_id)
{	// Download file and put it instantly into memory cell of GM
	GM_xmlhttpRequest
	({
		method: 'GET',
		url: qll_serverURI + filepath,
		onload:function(response)
		{
			if(response.status == "200")
			{
			alert('updated');
				var curr=response.responseText;
			
				GM_setValue(memory_id, curr);
			}
			
			if(response.status == "404")
			{
				alert(qll_lang[53]);
			}
		}
	});
}

function qll_menu()
{
//	adv=document.getElementById('content');
	
	inner="<center>";
	
	for(unit in qll_optdet)
	{
		if(qll_optdet[unit][4]!==undefined || qll_optdet[unit][2]==-1)
		{	continue;}
		inner = inner + '<div class="QLLMenuHolder"><div class="QLLMenuHeader" id="' + qll_optdet[unit][1] + '_HEAD">' + qll_lang[qll_optdet[unit][2]] + '</div>\n'
		if(qll_optdet[unit][3])
		{	inner = inner + '<div class="QLLMenuContent" id="' + qll_optdet[unit][1] + '_CONTENT"></div><div class="QLLMenuToggle" id="' + qll_optdet[unit][1] + '_TOGGLE">' + qll_lang[33] + '</div>';}
		inner = inner + '</div>';
	}
	qll_fun_showDisplayBox(qll_lang[5], inner+'</center>');
//	adv.innerHTML=inner;
	
	for(unit in qll_optdet)
	{		
		if(qll_optdet[unit][4]==undefined || qll_optdet[unit][2]==-1)
		{	continue;}
		
		$("#" + qll_optdet[unit][4] + "_CONTENT").append('<div class="QLLMenuHeader" id="' + qll_optdet[unit][1] + '_HEAD">' + qll_lang[qll_optdet[unit][2]] + '</div>\n');
		if(qll_optdet[unit][3])
		{	$("#" + qll_optdet[unit][4] + "_CONTENT").append('<div class="QLLMenuContent" id="' + qll_optdet[unit][1] + '_CONTENT"></div><div class="QLLMenuToggle" id="' + qll_optdet[unit][1] + '_TOGGLE">' + qll_lang[33] + '</div>');}
	}
	
// setting default values
	for(unit in qll_optdet)
	{
		if(qll_optdet[unit][2]==-1)
			continue;
			
		if(qll_optdet[unit][3])
		{
			$("#" + qll_optdet[unit][1] + "_CONTENT").hide();
		}
		
		if(qll_optdet[unit][0]=='system:language')
		{	
			$('#QLLMenuLanguage_CONTENT').append('<select class="QLLInput" id="QLLMenuLanguage"><option value="POL">' + qll_lang[16] + '</option>' +
			'<option value="ENG">' + qll_lang[17] + '</option></select>');
			$("#QLLMenuLanguage").attr('value',qll_opt['system:language']);
			$('#QLLMenuLanguage').change(function(){GM_setValue("QLLMenuLanguage",$("#QLLMenuLanguage").attr('value'));});
			continue;
		}
				
		if(qll_opt[qll_optdet[unit][0]])
		{	$("#" + qll_optdet[unit][1] + "_HEAD").attr("class","QLLMenuHeaderON");}
		else
		{	$("#" + qll_optdet[unit][1] + "_HEAD").attr("class","QLLMenuHeaderOFF");}
	}

// custom content creation
	$('#QLLMenuOrders_CONTENT').append(qll_lang[35]+': <input class="QLLInput" type="text" id="QLLMenuOrdersNewspaper" size="10" />');
	$("#QLLMenuOrdersNewspaper").attr('value',qll_opt['utility:orders:newspaper']);
	$("#QLLMenuOrdersNewspaper").change(function(){GM_setValue("QLLMenuOrdersNewspaper",$("#QLLMenuOrdersNewspaper").attr('value'));});

	$('#QLLMenuSettings_CONTENT').append('<textarea id="QLLMenuSettingsField" class="QLLMenuTextarea"></textarea> <button id="QLLMenuSettingsImport" type="button" class="QLLButton">'+qll_lang[36]+'</button><button id="QLLMenuSettingsExport" type="button" class="QLLButton">'+qll_lang[37]+'</button><button id="QLLMenuSettingsClear" type="button" class="QLLButton">'+qll_lang[38]+'</button>');
	$('#QLLMenuSettingsImport').click(function(){qll_system_settings_import();});
	$('#QLLMenuSettingsExport').click(function(){qll_system_settings_export();});
	$('#QLLMenuSettingsClear').click(function(){$('#QLLMenuSettingsField').attr('value',"");});
	
	$('#QLLMenuMessageSignature_CONTENT').append('<textarea id="QLLMenuMessageSignatureContent" class="QLLMenuTextarea">' + GM_getValue("QLLMenuMessageSignature:content","") + '</textarea> <button id="QLLMenuMessageSignatureSave" type="button" class="QLLButton">'+qll_lang[43]+'</button>');
	$('#QLLMenuMessageSignatureSave').click(function(){GM_setValue("QLLMenuMessageSignature:content",$('#QLLMenuMessageSignatureContent').attr("value"));});
	
	$('#QLLMenuArticleSignature_CONTENT').append('<textarea id="QLLMenuArticleSignatureContent" class="QLLMenuTextarea">' + GM_getValue("QLLMenuArticleSignature:content","") + '</textarea> <button id="QLLMenuArticleSignatureSave" type="button" class="QLLButton">'+qll_lang[43]+'</button>');
	$('#QLLMenuArticleSignatureSave').click(function(){GM_setValue("QLLMenuArticleSignature:content",$('#QLLMenuArticleSignatureContent').attr("value"));});
	
	$('#QLLMenuStyleChicken_CONTENT').append(qll_lang[79]+': <input class="QLLInput" type="text" id="QLLMenuStyleChickenError" size="50" />');
	$("#QLLMenuStyleChickenError").attr('value',qll_opt['module:style:chicken:error']);
	$("#QLLMenuStyleChickenError").change(function(){GM_setValue("QLLMenuStyleChickenError",$("#QLLMenuStyleChickenError").attr('value'));});

	
	
	/*$('#QLLMenuGameinfo_CONTENT').append('<button id="QLLMenuGameinfoCountries" type="button" class="QLLButton">'+qll_lang[52]+'</button><button id="QLLMenuGameinfoGoldvalue" type="button" class="QLLButton">'+qll_lang[49]+'</button><button id="QLLMenuGameinfoMarket" type="button" class="QLLButton">'+qll_lang[56]+'</button>');
	$('#QLLMenuGameinfoCountries').click(function(){qll_module_gameinfo_countries();});
	$('#QLLMenuGameinfoGoldvalue').click(function(){qll_module_gameinfo_goldvalue();});
	$('#QLLMenuGameinfoMarket').click(function(){qll_module_gameinfo_market();});*/
	
// due bug in .click jQuery usage, .click methods must be declared manually:
	$('#QLLMenuUpdates_HEAD').click(function(){qll_menu_switch('#QLLMenuUpdates');});
	$('#QLLMenuLanguage_TOGGLE').click(function(){$('#QLLMenuLanguage_CONTENT').slideToggle('slow');});
	$('#QLLMenuSettings_TOGGLE').click(function(){$('#QLLMenuSettings_CONTENT').slideToggle('slow');});
	$('#QLLMenuBlockAds_HEAD').click(function(){qll_menu_switch('#QLLMenuBlockAds');});
	
	$('#QLLMenuRadiochecked_HEAD').click(function(){qll_menu_switch('#QLLMenuRadiochecked');});
	$('#QLLMenuQllFormatting_HEAD').click(function(){qll_menu_switch('#QLLMenuQllFormatting');});
	$('#QLLMenuQllFormatting_TOGGLE').click(function(){$('#QLLMenuQllFormatting_CONTENT').slideToggle('slow');});	
	$('#QLLMenuQllFormattingPM_HEAD').click(function(){qll_menu_switch('#QLLMenuQllFormattingPM');});
	$('#QLLMenuQllFormattingArticle_HEAD').click(function(){qll_menu_switch('#QLLMenuQllFormattingArticle');});
	$('#QLLMenuQllFormattingComment_HEAD').click(function(){qll_menu_switch('#QLLMenuQllFormattingComment');});
	$('#QLLMenuQllFormattingRawtext_HEAD').click(function(){qll_menu_switch('#QLLMenuQllFormattingRawtext');});
	$('#QLLMenuQllFormattingAutoYT_HEAD').click(function(){qll_menu_switch('#QLLMenuQllFormattingAutoYT');});
	$('#QLLMenuSearch_HEAD').click(function(){qll_menu_switch('#QLLMenuSearch');});
	$('#QLLMenuKeepalive_HEAD').click(function(){qll_menu_switch('#QLLMenuKeepalive');});
	$('#QLLMenuNotepad_HEAD').click(function(){qll_menu_switch('#QLLMenuNotepad');});
	$('#QLLMenuMessage_TOGGLE').click(function(){$('#QLLMenuMessage_CONTENT').slideToggle('slow');});
	$('#QLLMenuMessageSignature_HEAD').click(function(){qll_menu_switch('#QLLMenuMessageSignature');});
	$('#QLLMenuMessageSignature_TOGGLE').click(function(){$('#QLLMenuMessageSignature_CONTENT').slideToggle('slow');});
	$('#QLLMenuArticle_TOGGLE').click(function(){$('#QLLMenuArticle_CONTENT').slideToggle('slow');});
	$('#QLLMenuArticleCache_HEAD').click(function(){qll_menu_switch('#QLLMenuArticleCache');});
	$('#QLLMenuArticleSignature_HEAD').click(function(){qll_menu_switch('#QLLMenuArticleSignature');});
	$('#QLLMenuArticleSignature_TOGGLE').click(function(){$('#QLLMenuArticleSignature_CONTENT').slideToggle('slow');});
	$('#QLLMenuArticleQuote_HEAD').click(function(){qll_menu_switch('#QLLMenuArticleQuote');});
	$('#QLLMenuOrders_HEAD').click(function(){qll_menu_switch('#QLLMenuOrders');});
	$('#QLLMenuOrders_TOGGLE').click(function(){$('#QLLMenuOrders_CONTENT').slideToggle('slow');});
	// Gameinfo module
	//$('#QLLMenuGameinfo_HEAD').click(function(){qll_menu_switch('#QLLMenuGameinfo');});
//	$('#QLLMenuGameinfo_TOGGLE').click(function(){$('#QLLMenuGameinfo_CONTENT').slideToggle('slow');});*/
//	$('#QLLMenuErepmenu_HEAD').click(function(){qll_menu_switch('#QLLMenuErepmenu');});
	$('#QLLMenuErepmenu_TOGGLE').click(function(){$('#QLLMenuErepmenu_CONTENT').slideToggle('slow');});
	$('#QLLMenuErepmenuDesign_HEAD').click(function(){qll_menu_switch('#QLLMenuErepmenuDesign');});
	
	// Economic module
	$('#QLLMenuEconomic_HEAD').click(function(){qll_menu_switch('#QLLMenuEconomic');});
	$('#QLLMenuEconomic_TOGGLE').click(function(){$('#QLLMenuEconomic_CONTENT').slideToggle('slow');});
	//$('#QLLMenuEconomicCompany_HEAD').click(function(){qll_menu_switch('#QLLMenuEconomicCompany');});
	//$('#QLLMenuEconomicMarketplace_HEAD').click(function(){qll_menu_switch('#QLLMenuEconomicMarketplace');});
	$('#QLLMenuEconomicMonetary_HEAD').click(function(){qll_menu_switch('#QLLMenuEconomicMonetary');});
	$('#QLLMenuHotChicksSidebar_HEAD').click(function(){qll_menu_switch('#QLLMenuHotChicksSidebar');});
	// Styles module
	$('#QLLMenuStyle_HEAD').click(function(){qll_menu_switch('#QLLMenuStyle');});
	$('#QLLMenuStyle_TOGGLE').click(function(){$('#QLLMenuStyle_CONTENT').slideToggle('slow');});
	$('#QLLMenuStyleChicken_HEAD').click(function(){qll_menu_switch('#QLLMenuStyleChicken');});
	$('#QLLMenuStyleChicken_TOGGLE').click(function(){$('#QLLMenuStyleChicken_CONTENT').slideToggle('slow');});
	$('#QLLMenuStyleSerif_HEAD').click(function(){qll_menu_switch('#QLLMenuStyleSerif');});
	// Links module
	$('#QLLMenuLinks_HEAD').click(function(){qll_menu_switch('#QLLMenuLinks');});
	$('#QLLMenuLinks_TOGGLE').click(function(){$('#QLLMenuLinks_CONTENT').slideToggle('slow');});
	$('#QLLMenuLinksSmallFont_HEAD').click(function(){qll_menu_switch('#QLLMenuLinksSmallFont');});
	$('#QLLMenuLinksCenter_HEAD').click(function(){qll_menu_switch('#QLLMenuLinksCenter');});
	$('#QLLMenuLinksResize_HEAD').click(function(){qll_menu_switch('#QLLMenuLinksResize');});
	$('#QLLMenuLinksImage_HEAD').click(function(){qll_menu_switch('#QLLMenuLinksImage');});
}

function qll_menu_switch(id)
{
	if($(id+'_HEAD').attr("class")=='QLLMenuHeaderON')
	{
        $(id+'_HEAD').attr("class","QLLMenuHeaderOFF");
	}
	else
	{
        $(id+'_HEAD').attr("class","QLLMenuHeaderON");
 	}
	
 	for(unit in qll_optdet)
 	{
		if('#'+qll_optdet[unit][1]==id)
		{	qll_opt[qll_optdet[unit][0]]=!qll_opt[qll_optdet[unit][0]];
		    GM_setValue(qll_optdet[unit][1],qll_opt[qll_optdet[unit][0]]);
		    break;
		}
  	}
}

//	-= Check for updates function =-
function qll_system_checkupdates()
{
	if(!qll_GMSupport)
	{	return;	}

	object = document.createElement("div");
	object.setAttribute('class', 'QLLsystembox');
	object.setAttribute('id', 'QLLBoxMenuUpdates');
	object.innerHTML="<img class='QLLIMGLoading' src='" + qll_loadingImg + "'>";
	adv=document.getElementById('eads');
	adv.parentNode.insertBefore(object,adv);

	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: 'http://userscripts.org/scripts/show/58579',
			onload:function(responseDetails)
		{
			var responseText = responseDetails.responseText;
			
			version = responseText.match(/<b>Version:<\/b>[^<]*/)[0];
			version = version.replace('<b>Version:</b>','');
			
			obj=document.getElementById('QLLBoxMenuUpdates');
			
			if(version>qll_version)
			{
				var inner = qll_lang[0] + '<br/>'+ qll_lang[1] +' ' + qll_version + '<br/>' + qll_lang[2] +' ' + version;
				obj.setAttribute('onclick', "window.open(\'http://userscripts.org/scripts/show/58579\');");
			}
			else
			{
				var inner = qll_lang[3];
			}
			obj.innerHTML = inner;
		}
	});	
}

// -= Settings manager options =-
function qll_system_settings_import()
{
	sett=$('#QLLMenuSettingsField').attr('value').split(";");
	
	if(sett.length<=1)
	{	
		qll_fun_showAlertBox('ALARM', qll_lang[40]);
		return;
	}
	
	var line= new Array();
	
	for(var k in sett)
	{
		if(sett[k].length==0)
		{	continue;	}

		line[k]=sett[k].split("=");
		
		if(line[k].length!==2)
		{
			alert(qll_lang[40]);
			return;
		}
		line[k][0]=qll_fun_unsafe(line[k][0]);
		line[k][1]=qll_fun_unsafe(line[k][1]);
	}
	
	if(line[0][0]!='QLLVersion' || parseInt(line[0][1])!=GM_getValue("QLLVersion",qll_version*10000000))
	{
		alert(qll_lang[40]);
		return;
	}
	
	qll_system_settings_delete();
	
	for(k in line)
	{
		if(line[k][1].length==0)
		{	continue;	}
		
		switch(line[k][1])
		{
			case 'true': line[k][1]=true; break;
			case 'false': line[k][1]=false; break;
			default: if(isFinite(parseInt(line[k][1]))) line[k][1]=parseInt(line[k][1]); break;
		}
		GM_setValue(line[k][0],line[k][1]);
	}
	
	alert(qll_lang[39]);
}

function qll_system_settings_export()
{
	var line = "";
	
	for(unit in qll_optdet)
	{
		if(qll_optdet[unit][1]==false || qll_optdet[unit][1]==undefined)
		{	continue;	}
		
		line=line+qll_fun_safe(qll_optdet[unit][1])+'='+qll_fun_safe(GM_getValue(qll_optdet[unit][1],""))+';';
	}
	
	//exporting of gameinfo data
/*	countries=GM_getValue("QLLMenuGameinfoCountries","NULL");
	if(countries!="NULL")
	{
		countries=countries.split(";");
		for(unit in countries)
		{
			country=new String(GM_getValue('QLLMenuGameinfoCountries:'+countries[unit],"NULL"));
			if(country!='NULL')
			{
				country=country.split(';');
				line=line+qll_fun_safe('QLLMenuGameinfoGoldvalue:'+country[1])+'='+qll_fun_safe(GM_getValue("QLLMenuGameinfoGoldvalue:" + country[1],""))+';';
				line=line+qll_fun_safe('QLLMenuGameinfoCountries:'+countries[unit])+'='+qll_fun_safe(GM_getValue("QLLMenuGameinfoCountries:" + countries[unit],""))+';';
				line=line+qll_fun_safe('QLLMenuGameinfoMarket:'+countries[unit])+'='+qll_fun_safe(GM_getValue('QLLMenuGameinfoMarket:' + countries[unit],""))+';';
			}
		}
	}*/

	$('#QLLMenuSettingsField').attr('value',line);
}

function qll_system_settings_delete()
{
	// deletion of gameinfo data
/*	countries=GM_getValue("QLLMenuGameinfoCountries","NULL");
	if(countries!="NULL")
	{
		countries=countries.split(";");
		for(unit in countries)
		{
			country=new String(GM_getValue('QLLMenuGameinfoCountries:'+countries[unit],"NULL"));
			if(country!='NULL')
			{
				country=country.split(';');
				GM_deleteValue("QLLMenuGameinfoGoldvalue:" + country[1]);
				GM_deleteValue("QLLMenuGameinfoCountries:" + countries[unit]);
				GM_deleteValue('QLLMenuGameinfoMarket:' + countries[unit]);
			}
		}
	}
*/
	for(unit in qll_optdet)
	{
		if(qll_optdet[unit][1]==false)
		{	continue;	}
		GM_deleteValue(qll_optdet[unit][1]);
	}
	alert(qll_lang[23]);

	/*	// would work only on FF
	var table=GM_listValues();
    for(var val in table)
		GM_deleteValue(table[val]);
	alert(qll_lang[23]);
	*/
}

function qll_system_settings_update()
{
	// GM can contain only integers, strings and boolean values, so there was need to convert float -> int :)
 	var version = GM_getValue("QLLVersion",qll_version*10000000)/10000000;
	if (version < qll_version)
 	{ 	// here will be code which will update data saved by GM to newer version, at any needed time.
		switch(true)
		{
			case version <= 1.00:
				GM_setValue("QLLMenuMessageInstantPm",GM_getValue("QLLMenuInstantPm",true));
				GM_deleteValue("QLLMenuInstantPm");
			case version < 1.50:
				GM_deleteValue("QLLMenuTraditional");
				GM_deleteValue("QLLMenuTraditionalSubscribe");
				GM_deleteValue("QLLMenuTraditionalLana");
			case version < 1.60:
				GM_deleteValue("QLLMenuBlockAds");
				GM_deleteValue("QLLMenuQllFormattingShout");
				GM_deleteValue("QLLMenuMessageUserinfo");
				GM_deleteValue("QLLMenuMessageInstantPm");
		}
		qll_system_data_download_raw('/modules/links/glinks.html', 'QLLMenuLinksDataGlinks');
	}
	GM_setValue("QLLVersion",qll_version*10000000);
}

function qll_system_settings_load()
{
	for(unit in qll_optdet)
	{
		qll_opt[qll_optdet[unit][0]]=GM_getValue(qll_optdet[unit][1],qll_opt[qll_optdet[unit][0]]);
		if(qll_opt[qll_optdet[unit][0]] === undefined)
		{	qll_opt[qll_optdet[unit][0]] = true;	}
 	}
}

//	-= multi search box =-
function qll_utility_search()
{
	GM_addStyle("body{padding-top:25px;}");
	GM_addStyle('#QLLSearch{background:'+qll_opt['css:menu:bg']+'; outline:'+ qll_opt['css:menu:borderc'] +' double 3px; color:'+qll_opt['css:menu:fontc']+'; width:100%;display: block;padding: 0;margin:0px; position:fixed; top:0px; z-index:25000; text-align:center;}');

	menu=document.getElementsByTagName('body')[0];
	object = document.createElement("div");
	object.setAttribute('id','QLLSearch');
	object.setAttribute('align','center');
	object.innerHTML='<input size="25" class="QLLInput" id="QLLSearchInput" type="text" value="'+qll_lang[66]+'" /><button class="QLLButton" type="button" id="QLLSearchNewspaper">'+qll_lang[62]+'</button><button class="QLLButton" type="button" id="QLLSearchCitizen">'+qll_lang[60]+'</button><button class="QLLButton" type="button" id="QLLSearchCompany">'+qll_lang[61]+'</button><button class="QLLButton" type="button" id="QLLSearchErepublik">'+qll_lang[63]+'</button><button class="QLLButton" type="button" id="QLLSearchErepwiki">'+qll_lang[65]+'</button>';
	menu.appendChild(object);
	$("#QLLSearchInput").focus(function(){$("#QLLSearchInput").select();});
	$("#QLLSearchNewspaper").click(function(){qll_fun_showDisplayBox(qll_lang[62], 'http://www.google.com/search?sitesearch=erepublik.com/en/article/&as_q='+$("#QLLSearchInput").attr('value'),true);});
	$("#QLLSearchCitizen").click(function(){qll_fun_showDisplayBox(qll_lang[60], 'http://www.google.com/search?sitesearch=erepublik.com/en/citizen/profile/&as_q='+$("#QLLSearchInput").attr('value'), true);});
	$("#QLLSearchCompany").click(function(){qll_fun_showDisplayBox(qll_lang[61], 'http://www.google.com/search?sitesearch=erepublik.com/en/company/&as_q='+$("#QLLSearchInput").attr('value'), true);});
	$("#QLLSearchErepublik").click(function(){qll_fun_showDisplayBox(qll_lang[63], 'http://www.google.com/search?sitesearch=erepublik.com/en/&as_q='+$("#QLLSearchInput").attr('value'), true);});
	$("#QLLSearchErepwiki").click(function(){qll_fun_showDisplayBox(qll_lang[65], 'http://www.google.com/search?sitesearch=wiki.erepublik.com/&as_q='+$("#QLLSearchInput").attr('value'), true);});
}

//	-= Citizen advert blocking =-
function qll_utility_blockadvert()
{
	$("#eads").removeAttr('width');
	$("#eads").removeAttr('height');
	$("#eads").removeAttr('src');
}

//	-= QLL Text formatting module =-
function qll_utility_qllformatting()
{
	if(!qll_opt['utility:qllformatting'] || location.pathname.match(/\/article\//) == null
		&& location.pathname.match(/\/messages\/read\//) == null
		&& location.pathname.length > 3)
	{	return;	}

	if(location.pathname.length == 3)	// main
	{
	}
	else if(location.pathname.match(/\/citizen\/profile\//) != null || location.pathname.match(/\/accounts\//) != null || location.pathname.match(/\/inventory/) != null)	// profile
	{

	}
	else if(location.pathname.match(/\/article\//) != null)	// article
	{
		if(qll_opt['utility:qllformatting:article'])
		{
			node = document.getElementById('content').getElementsByTagName('p')[1];
			qll_utility_qllformatting_raw(node);	
			qll_utility_qllformatting_a(node);
			qll_utility_qllformatting_img(node);
		}

		if(qll_opt['utility:qllformatting:comment'])
		{
		
			node = document.getElementById('comments_div').getElementsByTagName('p');
			for(var i = 0; i< node.length; i++)
			{
				qll_utility_qllformatting_raw(node[i]);	
				qll_utility_qllformatting_a(node[i]);
				qll_utility_qllformatting_img(node[i]);
			}
		}
	}
	else	// pm
	{
		if(qll_opt['utility:qllformatting:pm'])
		{
			node = document.getElementById('content').getElementsByTagName('p')[0];
			qll_utility_qllformatting_raw(node);	
			qll_utility_qllformatting_a(node);
			qll_utility_qllformatting_img(node);
		}
	}
}

function qll_utility_qllformatting_preview()
{
	node = document.getElementsByTagName('div')[0];
	qll_utility_qllformatting_raw(node);	
	qll_utility_qllformatting_a(node);
	qll_utility_qllformatting_img(node);
}

function qll_utility_qllformatting_raw(node)
{
	if(!qll_opt['utility:qllformatting:rawtext'])
	{	return;	}

	var tags = {
		'##' : 'b',
		',,' : 'i',
		'__' : 'u',
		'""' : 'q'
	};

	inner = node.innerHTML;
	
	for(tag in tags)
	{
		match = inner.match(new RegExp(tag + '[^' + tag + ']*' + tag, 'g'));
		if(match === null)
		{	continue;	}

		for(var i=0; i < match.length; i++)
		{
			match[i] = match[i].replace(new RegExp('^(' + tag + ')'),'<' + tags[tag] + '>').replace(new RegExp('(' + tag + ')$'),'</' + tags[tag] + '>');
			inner = inner.replace(new RegExp(tag + '[^' + tag + ']*' + tag), match[i]);
		}
	}
	node.innerHTML = inner;
}

function qll_utility_qllformatting_img(node)
{	// <img src="imageURI" title="QLLFORMAT" name="width@height">

	var objects = node.getElementsByTagName("img");
	
	var maxwidth=550;
	var maxheight=1100;
	
	for(var i=0; i<objects.length; i++)
	{
		var current=objects[i];
		if(current.title.replace(" ", "")==="QLLFORMAT")
		{
			var elements=current.name.split('@');

			if(elements[0] && elements[0]!=0)
			{
				if(elements[0]>maxwidth)
				{	
					elements[0]=maxwidth;
				}
				current.setAttribute('width',elements[0]);
			}
			else
			{
				current.removeAttribute('width');
			}
				
			if(elements[1] && elements[1]!=0)
			{
				if(elements[1]>maxheight)
				{	
					elements[1]=maxheight;
				}
				current.setAttribute('height',elements[1]);
			}
			else
			{
				current.removeAttribute('height');
			}

			if(current.width>maxwidth)
				current.width=maxwidth;
			
			if(current.height>maxheight)
				current.height=maxheight;
		}
		else
			continue;
	}
}

function qll_utility_qllformatting_a(node)
{	// <a href="tag@options">QLLFORMAT</a> -> [url="tag@options"]QLLFORMAT[/url]
	// <a title="QLLFORMAT" name="youtube@QF-XtANvcU"></a>
	//utility:qllformatting:autoyt
	var objects = node.getElementsByTagName("a");

	for(var i=0; i<objects.length; i++)
	{		
		var current=objects[i];
		if(current.innerHTML.replace(" ", "")==="QLLFORMAT")
		{
			var elements=current.href.replace("&amp;", "").replace("&quot;", "").replace("&quot;", "").split('@');
			var tag = elements[0].substring(elements[0].lastIndexOf("/")+1);
		}
		else if(current.title.replace(" ", "")==="QLLFORMAT")
		{
			var elements=current.name.split('@');
			var tag = elements[0];
		}
		else
		{
			mch = current.innerHTML.replace(" ","").match(/^\|[a-zA-Z]*\|/);
			if(mch !== null)
			{
				mch = mch[0].replace(/\|/g,"");
				var elements = mch.split('@');
				var tag = elements[0];
				elements.splice(1,0, current.href);
			}
			else if(current.href.match(/^http:\/\/www\.youtube\.com\//) !== null && qll_opt['utility:qllformatting:autoyt'])
			{
				if(qll_utility_qllformatting_youtube(current, current.href, 0, 0))
				{	i--;	}
				continue;
			}
			else
			{	continue;	}
		}

		switch(tag)
		{
			case 'youtube':
				if(elements.length<2)
					continue;
				if(qll_utility_qllformatting_youtube(current, elements[1], 0, 0))
				{	i--;	}
				continue;
			case 'img':
				if(elements.length<4)
					continue;
				uri=elements[1];
				object = document.createElement("img");
				object.setAttribute('src',uri);
				if(elements[2]>550)
					elements[2]=550;
				if(elements[3]>1100)
					elements[3]=1100;
					
				object.setAttribute('width',elements[2]);
				object.setAttribute('height',elements[3]);
				i--;
				break;
			default:
				continue;
				break;
		}
		current.parentNode.replaceChild(object,current); 
	}
	
}

function qll_utility_qllformatting_youtube(node, id, autoplay, loop)
{
	if(id.match("http") !== null)
	{
		id = id.replace(/^http:\/\/[a-z\.\/]*\?[^(v=)]*/,"").replace(/&.*/,"");
		if(id.match('v=') !== null)
		{
			id = id.replace('v=','');
		}
		else
		{	return false;	}
	}

	object = document.createElement("object");
	object.setAttribute('width', '445');
	object.setAttribute('height', '364');
	object.innerHTML='<param name="movie" value="http://www.youtube.com/v/' + id + '&hl=pl&fs=1&rel=0&color1=0x2b405b&color2=0x6b8ab6&border=1"></param>' +
		'<param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param>' +
		'<embed src="http://www.youtube.com/v/' + id + '&hl=pl&fs=1&rel=0&color1=0x2b405b&color2=0x6b8ab6&border=1&autoplay=' + autoplay + '&loop=' + loop +
		'" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="445" height="364"></embed>';
	node.parentNode.replaceChild(object, node);
	return true;
}

//	-= Login page radio box checked =-
function qll_utility_boxchecked()
{
	$("#remember").attr('checked','checked');
}

//	-= Notepad module =-
function qll_utility_notepad()
{
	object = document.createElement("div");
	object.setAttribute('class', 'QLLNotepad');
	inner="<div id='QLLNotepad'>" + qll_lang[21] + "</div>";
	inner=inner + "<textarea id='QLLNotepadContent'>" + GM_getValue("QLLMenuNotepad:content",qll_lang[24]) + "</textarea>";
	inner=inner + "<div id='QLLNotepadSave'>" + qll_lang[22] + "</div>";
	object.innerHTML=inner;
	adv=document.getElementById('content');
	adv.insertBefore(object,adv.childNodes[0]);
	
	$('#QLLNotepad').click(function(){qll_utility_notepad_switch();});
	$('#QLLNotepadSave').click(function(){qll_utility_notepad_save();});
	$('#QLLNotepadContent').hide();
	$('#QLLNotepadSave').hide();
}
	
function qll_utility_notepad_switch()
{
	$('#QLLNotepadContent').slideToggle('slow');
	$('#QLLNotepadSave').slideToggle('slow');
}

function qll_utility_notepad_save()
{
	GM_setValue("QLLMenuNotepad:content",$('#QLLNotepadContent').attr("value"));
	$('#QLLNotepadContent').show();
	$('#QLLNotepadSave').show();
}

//	-= Messages =-
function qll_utility_messages_signature()
{	// Adds custom signature to new private messages
	var cnt=document.getElementById('citizen_message');
	cnt.value=cnt.value+ '\n' + GM_getValue("QLLMenuMessageSignature:content","");
}

//	-= Article cache =-
function qll_utility_article_cache()
{
	var object = document.createElement("input");
	object.setAttribute('class', 'arrowbutton');
	object.setAttribute('type', 'button');
	object.setAttribute('id','QLLArticleCacheReload');
	object.setAttribute('value', qll_lang[26]);
	var button=document.getElementsByName('commit');
	button=button[button.length-1];
	button.parentNode.appendChild(object,button);
	
	
	object = document.createElement("input");
	object.setAttribute('class', 'arrowbutton');
	object.setAttribute('type', 'button');
	object.setAttribute('id','QLLArticleCacheRemove');
	object.setAttribute('value', qll_lang[27]);
	button.parentNode.appendChild(object,button);
	
	$("#QLLArticleCacheReload").click(function(){qll_utility_article_cache_reload();});
	$("#QLLArticleCacheRemove").click(function(){qll_utility_article_cache_remove();});
	$("input[name='commit']").click(function(){qll_utility_article_cache_save();});
}

function qll_utility_article_cache_save()
{
	GM_setValue("QLLMenuArticleCache:title",$('#article_name').attr("value"));
	GM_setValue("QLLMenuArticleCache:content",$('#body').attr("value"));
}

function qll_utility_article_cache_reload()
{
	var title=document.getElementById('article_name');
	var content=document.getElementById('body');
	if(content.value.length>0)
		alert(qll_lang[29])
	else
	{
		title.value=GM_getValue("QLLMenuArticleCache:title",qll_lang[28]);
		content.value=GM_getValue("QLLMenuArticleCache:content",qll_lang[28]);
	}
}

function qll_utility_article_cache_remove()
{
	GM_deleteValue("QLLMenuArticleCache:title");
	GM_deleteValue("QLLMenuArticleCache:content");
}

//	-= Article signature =-
function qll_utility_article_signature()
{
	content=document.getElementById('article_comment');
	content.value=content.value+ '\n' + GM_getValue("QLLMenuArticleSignature:content","");
}

//	-= Article comments quotes =-
function qll_utility_article_quote()
{
	coa = $("#profileholder .smalldotted:first").text();
	coh = document.getElementById('profileholder').getElementsByTagName('h1')[0].getElementsByTagName('span')[0];
	
	$(".articlerelated .box:first").append("<div class='rankholder' id='QLLMenuArticleQuoteArticle'><span class='shadow'>Q</span><span class='value'>Q</span></div>");
	query = document.getElementById("QLLMenuArticleQuoteArticle");
	query.setAttribute('onmouseover',"QLLMenuArticleQuote=new String(window.getSelection());");
//	query.setAttribute('onclick',"if(QLLMenuArticleQuote.length>0){document.getElementById('article_comment').value= document.getElementById('article_comment').value + '\\n <a class=\"informer\" target=\"_blank\" href=\"" + coa.getAttribute('href') + "\"> " + coa.innerHTML + "@"+ coh.innerHTML +":\\n' + QLLMenuArticleQuote +' </a> '; document.getElementById('article_comment').focus();}");
	query.setAttribute('onclick',"if(QLLMenuArticleQuote.length>0){document.getElementById('article_comment').value= document.getElementById('article_comment').value + '\\n" + coa + "@"+ coh.innerHTML +":\\n\"\"' + QLLMenuArticleQuote +'\"\"\\n'; document.getElementById('article_comment').focus();}");
		
	content=document.getElementById('article_comment');
	coh=document.getElementById('comments_div');
	cominst=coh.getElementsByTagName('div');
	for(com in cominst)
	{
		if(cominst[com].getAttribute('class')=='articlecomments')
		{
			s=cominst[com].getElementsByTagName('div')[1];
			auth = s.getElementsByTagName('a')[1].getAttribute('title');
			s = s.getElementsByTagName('span')[0];
			s.setAttribute('onmouseover',"QLLMenuArticleQuote=new String(window.getSelection());");
		//	s.setAttribute('onclick',"if(QLLMenuArticleQuote.length==0){ document.getElementById('article_comment').value= document.getElementById('article_comment').value + '\\n <a target=\"_blank\" href=\"" + s.getAttribute('href') + "\"> @" + s.getAttribute('title') + " </a> : '; document.getElementById('article_comment').focus();}else{document.getElementById('article_comment').value= document.getElementById('article_comment').value + '\\n <a class=\"informer\" target=\"_blank\" href=\"" + s.getAttribute('href') + "\"> @" + s.getAttribute('title') + ":\\n' + QLLMenuArticleQuote +' </a> '; document.getElementById('article_comment').focus();}");
			s.setAttribute('onclick',"if(QLLMenuArticleQuote.length==0){ document.getElementById('article_comment').value= document.getElementById('article_comment').value + '\\n@" + auth + " : '; document.getElementById('article_comment').focus();}else{document.getElementById('article_comment').value= document.getElementById('article_comment').value + '\\n@" + auth + ":\\n\"\"' + QLLMenuArticleQuote +'\"\"\\n'; document.getElementById('article_comment').focus();}");
		}
	}
}

function qll_utility_keepalive()
{	// Keep session alive by doing request every half of minute
	self.setInterval(function()
	{
		$.ajax(
		{
			url: location.href,
			cache: false,
			success: function(response){;}
		});
	
	},30000);
}

// -= Orders =-
function qll_utility_orders()
{
	var latest=document.getElementById('news');
	$.ajax(
	{
		url: "http://www.erepublik.com/en/newspaper/" + qll_opt['utility:orders:newspaper'] +"/1",
		cache: false,
		success: function(html)
		{
			html=html.substr(html.indexOf("<div class=\"articlecontent\">"));
			header=html.substr(html.indexOf("<h2 class=\"padded\">"),html.indexOf("</h2>")-html.indexOf("<h2 class=\"padded\">"));
			
			header=header.replace(/ class="padded"/,"");
			header=header.replace(/<a/,"<a target=\"_blank\"");
			
			href = header.substr(header.indexOf('href="')+6, header.indexOf('">')- header.indexOf('href="')-6);
			
			html=html.substr(html.indexOf("<p class=\"preview\">"));
			html=html.substr(0,html.indexOf("<a class=\"dotted\"")-17);

			$.ajax(
			{
				url: "http://www.erepublik.com" + href,
				cache: false,
				success: function(o)
				{
					orders = "<p align=\"center\">" + o.substr(o.indexOf("<p class=\"preview\">") + 19, o.indexOf("<p class=\"bottomcontrol\">") - o.indexOf("<p class=\"preview\">")-19 );
				//	alert(orders);
					title=document.createElement("div");
					title.setAttribute('class', 'title, box');
					title.setAttribute('style', 'float: left;');
					title.innerHTML='<h1 class=\"sIFR-replaced\"><embed class=\"sIFR-flash\" height=\"28\" width=\"250\" src=\"/flash/delicious.swf\" quality=\"best\" flashvars=\"txt=' + qll_lang[31] +'&&textcolor=#737373&hovercolor=null&linkcolor=null&w=250&h=28\" wmode=\"transparent\" bgcolor=\"transparent\" sifr=\"true\" type=\"application/x-shockwave-flash\" style=\"width: 250px; height: 28px;\"/></h1></div>';
				
					link_el=document.createElement("div")
					link_el.setAttribute('class', 'latest_events, box');
					link_el.setAttribute('style', 'float: left;');
					link_el.innerHTML='<div class="item elem"><div class="iconholder"><img class="test" src="/images/parts/icon_military_93.gif" title="' + qll_lang[32] + '" alt="' + qll_lang[32] + '" id="QLLOrdersButton"></div><div class="holder"><p>'+ header + '</p></div></div>';

					latest.parentNode.insertBefore(title, latest);
					latest.parentNode.insertBefore(link_el, latest);
					$("#QLLOrdersButton").click(function(){ qll_fun_showDisplayBox(header, orders);});
				}
			});
			
			
		//	orders=html.replace(/<\/?p( class="preview")?>/g,"");
		//	orders=orders.replace(/<\/?span[^>]*>/g,"");
	//		orders=orders.replace(/<\/?strong>/g,"");
			
			
		}
	});
}

function qll_module_links_display()
{	// Userlinks at left side of webpage
	if(!qll_GMSupport)
	{	return;	}	

//qll_system_data_download_raw('/modules/links/glinks.html', 'QLLMenuLinksDataGlinks');
	var main = GM_getValue('QLLMenuLinksDataGlinks', 0);
	if(main == 0)
	{	qll_system_data_download_raw('/modules/links/glinks.html', 'QLLMenuLinksDataGlinks');
		return 0;
	}
	var garr = new Array();
	var aux = main.split('&');
	for(var i=0; i<aux.length; i++)
	{
		garr[i] = aux[i].split(';');
		for(var j=0; j<garr[i].length; j++)
		{
			garr[i][j] = garr[i][j].split('::');
		}
	}
	
	var main = GM_getValue('QLLMenuLinksDataMlinks', 0);
	if(main != 0)
	{	
		garr[garr.length] = main.split(';');
		for(var i=0; i<garr[garr.length].length; i++)
		{
			garr[garr.length][i] = garr[garr.length][i].split('::');
		}
	}
	
	var menu = document.getElementById('QLLSMenu');
	for(var i=0; i< garr.length; i++)
	{
		h = document.createElement("div");
		h.setAttribute('id','QLLSMenuHolder_'+i);
		h.setAttribute('class','QLLSMenuHolder');
		h.innerHTML= '<div class="QLLSMenuMHeader" id="QLLSMenuMHeader_'+i+'">'+qll_lang[Number(garr[i][0][0])]+'</div><div class="QLLSMenuContainer" id="QLLSMenuContainer_'+i+'"><div class="QLLSMenuHeader" id="QLLSMenuHeader_'+i+'">'+qll_lang[Number(garr[i][0][0])]+'</div></div>';
		h.setAttribute('onmouseover','document.getElementById("QLLSMenuContainer_'+i+'").setAttribute("style","display:block;");');
		h.setAttribute('onmouseout','document.getElementById("QLLSMenuContainer_'+i+'").setAttribute("style","display:none;");');
		
		menu.appendChild(h);
		container = document.getElementById("QLLSMenuContainer_"+i);
		
		for(var j=1; j<garr[i].length; j++)
		{
			h = document.createElement("a");
			h.href = garr[i][j][1];
			h.target = "_blank";
			h.setAttribute('class','QLLSMenuElement');

			if(garr[i][j][2] == undefined)
			{
				h.innerHTML = garr[i][j][0];
			}
			else if(garr[i][j][3] == undefined)
			{
				h.innerHTML = '<img src="'+garr[i][j][2]+'" class="QLLSMenuElementImage" />' + garr[i][j][0];
			}
			else
			{
				h.innerHTML = '<img src="'+garr[i][j][2]+'" alt="'+garr[i][j][0]+'" class="QLLSMenuElementIButton" />';
			}
			container.appendChild(h);
		}
		
		if(Number(Number(window.innerHeight)-60) > container.offsetHeight+5)
			ch = container.offsetHeight+5;
		else
			ch = Number(Number(window.innerHeight)-60);
		GM_addStyle("#QLLSMenuContainer_"+i+" {height:"+ch+"px;}");
		$("#QLLSMenuContainer_"+i).hide();
	}
}

function qll_module_style()
{
	if(qll_opt['module:style'])
	{	
		if(qll_opt['module:style:chicken'])
		{
			GM_addStyle('.err {width:275px; background:url('+qll_opt['module:style:chicken:error']+') center center no-repeat;}');
			GM_addStyle('.err._404 { height:450px; background-image:url('+qll_opt['module:style:chicken:error']+');}}');
			GM_addStyle('.err._maintenance { height:450px; background-image:url('+qll_opt['module:style:chicken:error']+');}}');
			GM_addStyle('.errtxt {margin-top:10%;}');
		}
		
		if(qll_opt['module:style:serif'])
		{
			GM_addStyle('body {font-family:serif;}');
		}
	}	
}

//	-= Erepublik menu modifications =-
function qll_module_erepmenu()
{
	var menu= new Array();
	var ul = new Array();

	menu[0]=document.getElementById('menu');
	for(i=1;i<=6;i++)
		menu[i]=document.getElementById('menu'+i);
	
//	menu[1].innerHTML=menu[1].innerHTML + '<ul></ul>';
	menu[2].innerHTML=menu[2].innerHTML + '<ul></ul>';
	menu[3].innerHTML=menu[3].innerHTML + '<ul></ul>';
	menu[6].innerHTML=menu[6].innerHTML + '<ul></ul>';
	
	for(i=1;i<=6;i++)
		ul[i]=menu[i].getElementsByTagName("ul")[0];
	
	if(qll_opt['module:erepmenu:design'])
	{
	
		//object.setAttribute('class','new_feature_small');
			
	//	menu[2].getElementsByTagName("a")[0].href = "http://economy.erepublik.com/en/time-management";
		
		/*aux = ul[2].removeChild(ul[2].getElementsByTagName("li")[6]);	// adverts
		ul[6].appendChild(aux);
		
		*/
		
		object = document.createElement("li"); 
		object.innerHTML='<a href="http://economy.erepublik.com/en/work">' + "Work" + '</a>';
		ul[2].appendChild(object);
		
		object = document.createElement("li"); 
		object.innerHTML='<a href="http://economy.erepublik.com/en/train">' + "Training grounds" + '</a>';
		ul[2].appendChild(object);
			
		object = document.createElement("li"); 
		object.innerHTML='<a href="http://www.erepublik.com/en/my-places/newspaper">' + "Newspaper" + '</a>';
		ul[2].appendChild(object);
		
		object = document.createElement("li"); 
		object.innerHTML='<a href="http://www.erepublik.com/en/economy/inventory">' + "Inventory" + '</a>';
		ul[2].appendChild(object);
		
		object = document.createElement("li"); 
		object.innerHTML='<a href="http://www.erepublik.com/en/my-places/organizations">' + "Organizations" + '</a>';
		ul[2].appendChild(object);
		
		object = document.createElement("li"); 
		object.innerHTML='<a href="http://economy.erepublik.com/en/company/create">' + qll_lang[97] + '</a>';
		ul[2].appendChild(object);
	
		object = document.createElement("li"); 
		object.innerHTML='<a href="http://www.erepublik.com/en/military/campaigns">' + qll_lang[69] + '</a>';
		ul[3].appendChild(object);
		//ul[4].insertBefore(object,ul[4].getElementsByTagName("li")[3])
		
		object = document.createElement("li"); 
		object.innerHTML='<a href="http://www.erepublik.com/en/loyalty/program">' + "Loyalty program" + '</a>';
		ul[6].appendChild(object);
		
		object = document.createElement("li"); 
		object.innerHTML='<a href="http://www.erepublik.com/en/gold-bonus/1">' + "Gold bonus" + '</a>';
		ul[6].appendChild(object);
		
	}
}

//	-= Hot chick sidebar display =-
function qll_module_hotchicks_sidebar()
{
	if(!qll_GMSupport)
	{	return;	}
	
	object = document.createElement("div");
	object.setAttribute('class', 'QLLBoxModHotChicks');
	object.setAttribute('id', 'QLLBoxModHotChicks');
	object.innerHTML="<img class='QLLIMGLoading' src='" + qll_loadingImg + "'>";
	adv=document.getElementById('eads');
	adv.parentNode.insertBefore(object,adv);
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: qll_serverURI + '/modules/hotchicks/request.php',
			onload:function(responseDetails)
			{		
				var responseText = responseDetails.responseText;
				uri=responseText.substring(responseText.lastIndexOf("http"));
				obj=document.getElementById('QLLBoxModHotChicks');
				obj.innerHTML = "<img alt='" + uri + "' src='" + uri + "' border='0'>";
				$("#QLLBoxModHotChicks").click(function(){qll_fun_showDisplayBox(qll_lang[19], "<a href='" + uri + "' target='_blank'><img alt='" + uri + "' src='" + uri + "' border='0'></a>");});
			}
	});		
}

//	-= Economic module =-
function qll_module_economic_monetary()
{
	if(!qll_opt['module:economic'])
	{	return;	}
	
	selector=document.getElementById('populateSelectors');
	object = document.createElement("button");
	object.setAttribute('style', 'display:block; width:150px; float:left;');
	object.setAttribute('class', 'QLLButton');
	object.setAttribute('id','QLLEconomicMonetarySwap');
	object.innerHTML="<img src='/images/parts/icon_show-off.gif' />&nbsp;&nbsp;"+qll_lang[76];
	selector.appendChild(object);
	$("#QLLEconomicMonetarySwap").click(function()
		{
			sel=document.getElementById('accounts_selector');
			hash=sel.href;
			hash=hash.substr(hash.indexOf('#')+1);
			hash=hash.split(';');
			b=hash[0].split('=');
			s=hash[1].split('=');
			window.location.replace("#buy_currencies="+s[1]+";sell_currencies="+b[1]+";page=1");
		});
}

function qll_module_economic_work()
{
	if(!qll_opt['module:economic'])
	{	return;	}
	
	$.ajax(
	{
		url: $(".company_title").attr('href'),
		cache: false,
		success: function(html)
		{
			GM_addStyle(".recommended_employees{width:150px;margin-top:12px;margin-left:4px;float:left;display:inline}.recommended_employees table{width:auto;margin:14px auto 0;right:-4px;position:relative}.recommended_employees .levelbar{width:150px;height:6px;display:block}.recommended_employees .placer{position:relative;top:-12px;width:94%;float:left;display:inline}.recommended_employees .placer .overlay{position:absolute;margin-bottom:0;z-index:100}.recommended_employees .placer sub{position:absolute;color:#999;top:14px;font-weight:normal !important;font-style:normal !important;line-height:7px !important;font-family:'PFArmaFiveRegular', sans-serif !important;font-size:8px !important}.recommended_employees .placer sub.first{left:0%}.recommended_employees .placer sub.last{left:100%}.recommended_employees .placer span{position:absolute;left:0;width:10px;text-align:center}.recommended_employees .placer span small{top:-8px;position:relative;color:#999;font-weight:normal !important;font-style:normal !important;line-height:7px !important;font-family:'PFArmaFiveRegular', sans-serif !important;font-size:8px !important}.recommended_employees .placer span.you{z-index:4}.recommended_employees .placer span.you small{color:#666;position:relative;left:-2px;top:-4px;width:10px;float:left;display:inline;background-image:url(http://www.erepublik.com/images/modules/company/small_dotted.png);background-position:bottom;background-repeat:repeat-x;padding:0 2px}.recommended_employees .placer span.recommended{z-index:3}.recommended_employees .placer span.recommended small{color:#8da92d}");
			GM_addStyle(".rec_tooltip{z-index:100}.rec_tooltip .rec_up{width:260px;height:14px;background-image:url(http://www.erepublik.com/images/modules/company/rec_tooltip_up.png);float:left;display:inline;clear:both}.rec_tooltip .rec_repeat{width:230px;padding:5px 15px;float:left;display:inline;clear:both;background-image:url(http://www.erepublik.com/images/modules/company/rec_tooltip_repeat.png);background-repeat:repeat-y}.rec_tooltip .rec_repeat td{vertical-align:middle;padding-right:8px}.rec_tooltip .rec_repeat td.nfo{padding-right:0;padding-left:8px;font-size:11px;color:#666;text-shadow:#fff 0px 1px 0px;border-left:1px dotted #CCC}.rec_tooltip .rec_repeat small{font-size:10px;color:#999;text-shadow:#fff 0px 1px 0px}.rec_tooltip .rec_repeat strong{font-size:14px;height:17px;display:block;width:69px;color:#fff;padding-left:3px;line-height:17px;background-image:url(http://www.erepublik.com/images/modules/company/states.png)}.rec_tooltip .rec_repeat strong img{padding-left:5px;vertical-align:-2px}.rec_tooltip .rec_repeat strong.good{background-position:0 0;text-shadow:#738d2c 0px 1px 0px}.rec_tooltip .rec_repeat strong.poor{background-position:0 -18px;text-shadow:#d3620e 0px 1px 0px}.rec_tooltip .rec_repeat strong.bad{background-position:0 -36px;text-shadow:#932f2f 0px 1px 0px}.rec_tooltip .rec_down{width:260px;height:19px;background-image:url(http://www.erepublik.com/images/modules/company/rec_tooltip_down.png);float:left;display:inline;clear:both}");
			html = html.replace(/(.|\n)*<div class="recommended_employees">/, '<div class="recommended_employees">');
			html = html.replace(/<div id="market_offers_company">(.|\n)*/, '</table></div>');
			html = html.replace(/<div class="queue">(.|\n)*<div class="down_border">&nbsp;<\/div>/,'');
			$(".product").append(html);

			$("#maxProdTip").attr('style','position:absolute; top:-90px; right:30px; display:none;');
			$("#maxProd").mouseover(function(){$("#maxProdTip").show();});
			$("#maxProd").mouseout(function(){$("#maxProdTip").hide();});
		}
	});
}

function addJS(jsname, pos)
{
	var th = document.getElementsByTagName(pos)[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
} 

function addCSS(cssname, pos)
{
	var th = document.getElementsByTagName(pos)[0];
	var s = document.createElement('link');
	s.setAttribute('rel','stylesheet');
	s.setAttribute('type','text/css');
	s.setAttribute('media','screen');
	s.setAttribute('href',cssname);
	th.appendChild(s);
}

//	-= Ajax module =-
function qll_module_ajax()
{

	addJS('http://www.erepublik.com/js/jquery-1.3.2.min.js','head');
	addJS('http://www.erepublik.com/js/jquery.history.plugin.js','head');
	addJS('http://www.erepublik.com/js/exchange/filters.js','head');
	addJS('http://www.erepublik.com/js/exchange/historyList.js','head');
	addJS('http://www.erepublik.com/js/exchange/currency.js','head');
	addJS('http://www.erepublik.com/js/exchange/listOffers.js','head');

	addJS('http://economy.erepublik.com/js/uncompressed.jquery.dd.js','head');
	addJS('http://economy.erepublik.com/js/jquery.tools.min.js','head');
	addJS('http://economy.erepublik.com/js/ui.core.js','head');
	addJS('http://economy.erepublik.com/js/ui.slider.js','head');
	addJS('http://economy.erepublik.com/js/jquery.blockUI.js','head');
	addJS('http://economy.erepublik.com/js/Market/marketplace.js','head');
	addJS('http://economy.erepublik.com/js/numberChecks.js','head');
	addCSS('http://www.erepublik.com/css/cmp/marketplace.css','head');

	//$("#content a").each(function(){
	$("a").each(function(){
		if($(this).attr("href") == "#")
			return;
		$(this).click(function(event){
			event.preventDefault()
			qll_module_ajax_perform($(this).attr("href"))
		});
		
	});
}

function qll_module_ajax_perform(url)
{
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: url,
		onload:function(responseDetails)
		{
			var html = responseDetails.responseText;

			html = html.replace(/(.|\n)*<\/head>/, "");
			html = html.replace(/<div id="promo">(.|\n)*/,"</div>");
			
			bodyid = String(html.match(/<body id="[^>]*>/));
			bodyid = bodyid.replace(/(<[^"]*")|("[^>]*>)/g, "");

			html = html.replace(/<\/?body[^>]*>/g, "");

			sem.ajax = url;

			html = html.replace('id="content"', 'id="QLL_module_ajax_content"');
			html = html.replace('id="sidebar"', 'id="QLL_module_ajax_sidebar"');
			
			sbInst = qll_fun_sandbox(html);
			qll_module_ajax_loader(bodyid);
			sbInst.parentNode.removeChild(sbInst);
			qll_module_ajax()
		}
	});		
}

function qll_module_ajax_loader(bodyID)
{
	content = document.getElementById("content");
	sidebar = document.getElementById("sidebar");
	
	document.getElementsByTagName("body")[0].id = bodyID;
	content.innerHTML = document.getElementById("QLL_module_ajax_content").innerHTML;
	content.className = document.getElementById("QLL_module_ajax_content").className;
	sidebar.innerHTML = document.getElementById("QLL_module_ajax_sidebar").innerHTML;
}

// -= Extended onload fuction for being sure, that script sees jQuery library =-
window.addEventListener('load', function()
{
	var chk=setInterval(function()
	{		
		if(typeof ($ = jQuery.noConflict()) != "undefined")
		{
		
			/*if(document.getElementsByTagName("body")[0].innerHTML.length < 500)
				return;*/
			clearInterval(chk);
			qll_main();
		}
	},100);
}, false);

//	-= Miscelanous Functions =-
function qll_fun_sandbox(content)
{
	sandbox=document.getElementById('QLLsandbox');
	if(sandbox==undefined)
	{
		sandbox = document.createElement("div");
		sandbox.setAttribute('id','QLLsandbox');
		document.getElementsByTagName("body")[0].appendChild(sandbox);
		$('#QLLsandbox').hide();
	}
	instance = document.createElement("div");
	instance.innerHTML=content;
	
	sandbox.appendChild(instance);
	return instance;
}

function qll_fun_extract_id(type, reference)
{
	var id=null;
	switch(type)
	{
		case 'entity':
			id=reference.innerHTML.substr(reference.innerHTML.indexOf('/citizen/profile/')+'/citizen/profile/'.length);
			id=id.substr(0,id.indexOf('"'));
		break;
	}
	return id;
}

function qll_fun_showDim()
{
	ob=document.getElementById('QLLDisplayDim');
	if(ob!=undefined)
	{	ob.parentNode.removeChild(ob);	}

	ob=document.createElement("div");
	ob.setAttribute('id','QLLDisplayDim');
	document.getElementsByTagName('body')[0].appendChild(ob);
}

function qll_fun_showDisplayBox(title, content, useiframe)
{
	ob=document.getElementById('QLLDisplayBox');
	if(ob!=undefined)
	{	ob.parentNode.removeChild(ob);	}
	
	qll_fun_showDim();
	
	if(useiframe == true)
	{
		content= '<iframe src ="' + content + '" width="100%" height="99%" frameborder="0"></iframe>';
	}
	
	ob=document.createElement("div");
	ob.setAttribute('id','QLLDisplayBox');
	ob.innerHTML="<button class='QLLButton' id='QLLDisplayBoxClose'>X</button><div id='QLLDisplayBoxTitle'>"+title+"</div><div id='QLLDisplayBoxContent'>"+content+"</div>";
	document.getElementsByTagName('body')[0].appendChild(ob);
	$("#QLLDisplayBoxClose").click(function(){ $("#QLLDisplayDim").hide(); $("#QLLDisplayBox").hide(); });
}

function qll_fun_showAlertBox(title, content)
{
	ob=document.getElementById('QLLAlertBox');
	if(ob!=undefined)
	{	ob.parentNode.removeChild(ob);	}

	qll_fun_showDim();
	
	ob=document.createElement("div");
	ob.setAttribute('id','QLLAlertBox');
	ob.innerHTML="<button class='QLLButton' id='QLLAlertBoxClose'>X</button><div id='QLLAlertBoxTitle'>"+title+"</div><div id='QLLAlertBoxContent'>"+content+"</div>";
	document.getElementsByTagName('body')[0].appendChild(ob);
	$("#QLLAlertBoxClose").click(function(){ $("#QLLDisplayDim").hide(); $("#QLLAlertBox").hide(); });
}

function qll_fun_showexternal(uri, target, wide, inframe)
{	// Display desired page from 'uri' address in id='target' element
	ob=document.getElementById('QLLContent');
	if(ob!=undefined)
		ob.parentNode.removeChild(ob);
	if(wide==true)
	{	
		ob=document.getElementById('sidebar');
		if(ob!=undefined)
			ob.parentNode.removeChild(ob);
		ob=document.getElementById('promo');
		if(ob!=undefined)
			ob.parentNode.removeChild(ob);
		ob=document.getElementById('footer');
		if(ob!=undefined)
			ob.parentNode.removeChild(ob);
		ob=document.getElementById('content');
		if(ob!=undefined)
			ob.parentNode.removeChild(ob);
		GM_addStyle('#'+target+'{width:954px;display: block;}');
	}

	object=document.getElementById(target);
	if(object==undefined)
	{
		object=document.createElement("div");
		object.setAttribute('id',target);
		document.getElementById("menu").appendChild(object);
	}
	
	if(inframe==true)
	{
		object.innerHTML='<iframe src ="' + uri + '" width="100%" height="600px" frameborder="0"></iframe>';
	}
	else
	{
		if(!qll_GMSupport)
		{	return;	}
		
		object.innerHTML="<img class='QLLIMGLoading' src='" + qll_loadingImg + "'>";
		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: uri,
			onload:function(responseDetails)
			{
				var responseText = responseDetails.responseText;
				//adv.innerHTML="<div>" + responseText + "</div>";
				object.innerHTML=responseText;
			}
		});		
	}
}

function qll_fun_status(varname, dummy, timer, inter)
{	// Check 'varname' value every 'inter' ms for maximum of 'timer' ms
	if(!dummy)	dummy=0;
	if(!timer)	timer=15000;
	if(!inter)	inter=1000;

	switch(dummy)
	{
		case 1:
			if(sem.val[varname] == 0)
			{
				sem.val[varname]="OK";
				window.clearInterval(sem.obj[varname].interval);
				window.clearTimeout(sem.obj[varname].timerout);
				alert(qll_lang[54]);
				for(f in sem.obj[varname].fun)
				{
					qll_fun_exec(sem.obj[varname].fun[f]);
				}
			}
			break;
		case 2:
			sem.val[varname]=-1;
			window.clearInterval(sem.obj[varname].interval);
			window.clearTimeout(sem.obj[varname].timerout);
			alert(qll_lang[53]);
			break;
		default:
			if(sem.obj[varname] === undefined)
				sem.obj[varname] = new Object();
			if(sem.obj[varname].fun === undefined)
				sem.obj[varname].fun = new Array();
			sem.obj[varname].timerout=self.setTimeout(function(){qll_fun_status(varname,2);},timer);
			sem.obj[varname].interval=self.setInterval(function(){qll_fun_status(varname,1);},inter);
	}
		GM_log(varname + ":" + sem.val[varname] +":"+ sem.obj[varname].timerout +":" + sem.obj[varname].interval);
}

function qll_fun_wait(fun,varname)
{	// Order execution of 'fun' when 'varname' reaches 0
	sem.obj[varname].fun[sem.obj[varname].fun.length]=fun;
}

function qll_fun_exec(fun)
{	// Execute function
	name=fun.substr(0,fun.indexOf('('));
	args=fun.substring(fun.indexOf('(')+1,fun.lastIndexOf(')'));
	args=args.split(',');
	
	for(i in args)
		args[i]=eval(args[i]);
		
	switch(name)
	{
		case 'GMset':
			GM_setValue(args[0],args[1]);
			break;
		case 'GMget':
			GM_getValue(args[0],args[1]);
			break;
		case 'GMdelete':
			GM_deleteValue(args[0]);
			break;
		case 'qll_module_gameinfo_market':
			qll_module_gameinfo_market(args[0],args[1],args[2],args[3]);
			break;
		case 'qll_module_economic_company_manager':
			qll_module_economic_company_manager(args[0],args[1],args[2],args[3],args[4]);
			break;
		default:
			eval(fun);
		/*	fun = new Function(fun);
			fun();*/
	}		
}

function qll_fun_safe(string)
{
	string=""+string.valueOf();
	string=string.replace(/&/g,"&#38");	// &
	string=string.replace(/:/g,"&#58");	// :
	string=string.replace(/;/g,"&#59");	// ;
	string=string.replace(/</g,"&#60");	// <
	string=string.replace(/=/g,"&#61");	// =
	string=string.replace(/>/g,"&#62");	// >
	return string;
}

function qll_fun_unsafe(string)
{
	string=""+string.valueOf();
	string=string.replace(/&#62/g,">");	// >
	string=string.replace(/&#61/g,"=");	// =
	string=string.replace(/&#60/g,"<");	// <
	string=string.replace(/&#59/g,";");	// ;
	string=string.replace(/&#58/g,":");	// :
	string=string.replace(/&#38/g,"&");	// &
	return string;
}