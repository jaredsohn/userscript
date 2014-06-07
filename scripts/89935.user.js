// ==UserScript==
// @name           [K.] Script
// @namespace      [K.] Script par Tom Capelhorn
// @include        http://*.popmundo.com/*
// @exclude        http://*.popmundo.com/*/defaultconf.asp
// ==/UserScript==

function addScript(url) 	{
    var GM_JQ = document.createElement('script');
    GM_JQ.src = url;
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ); 
}
function addCSS(url) 			{
    var GM_JQ = document.createElement('link');
    GM_JQ.href = url;
    GM_JQ.type = 'text/css';
    GM_JQ.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ); 
}
function setTheme(t,m) 		{	
	switch(t)
	{
		case 0 : 		break;
		case 1 : addCSS('http://popskins.fourmuellainc.com/css/America.css');		break;
		case 2 : addCSS('http://popskins.fourmuellainc.com/css/Blood.css');		break;
		case 3 : addCSS('http://popskins.fourmuellainc.com/css/DarkBlue.css');	break;
		case 5 : addCSS('http://popskins.fourmuellainc.com/css/Green.css');		break;
		case 7 : addCSS('http://popskins.fourmuellainc.com/css/PimpHeaven.css');	break;
		case 8 : addCSS('http://popskins.fourmuellainc.com/css/Red.css');			break;
		case 9 : addCSS('http://popskins.fourmuellainc.com/css/Saw.css');			break;
		case 10 : addCSS('http://popskins.fourmuellainc.com/css/Vista.css');		break;
		case 11 : break;
	}
	if(m)
	{
		GM_setValue("THEME", parseInt(t));
		document.location = document.location;
	}
}
THEME				= GM_getValue("THEME");
setTheme(THEME);
if((THEME != 0) && (THEME != 1) && (THEME != 2) && (THEME != 3) && (THEME != 4) && (THEME != 5) && (THEME != 6) && (THEME != 7) && (THEME != 8) && (THEME != 9) && (THEME != 10) && (THEME != 11)) 	
	{ THEME = 0; 			GM_setValue("THEME", 0); }
setTheme(THEME);
function addZeCSS() {

	var css = '@namespace url(http://www.w3.org/1999/xhtml);';
		css+='.popup {background:#FFF; border:1px solid #333;}';
		css+='.popup-header {height:22px; padding:7px; background: url("http://www.popmundo.fr/klyne/scripts/jquery/images/gradient-blue.gif") repeat-x;}';
		css+='.popup-header h2 {line-height: 10px; margin:0; padding:0; padding-left: 5px; font-size:18px; float:left; color: #FFF; font-size: 11px; font-family: verdana; font-weight: bold;}';
		css+='.popup-header .close-link {float:right; font-size:11px; padding-right: 5px;}';
		css+='.popup-body {padding:10px;}';
		css+='.popup-underline { -moz-border-radius : 0 5px 5px 0; color: #3364A1; font-size: 11px; font-family: verdana; font-weight: bold; background: #D1E1E5;}';
		css+='.nav-bar { -moz-background-clip:border;-moz-background-inline-policy:continuous;-moz-background-origin:padding;background:#192B40 url(http://www./forum/public/style_images/master/primarynav_bg.png) no-repeat scroll 0 0;border-bottom:5px solid #528F6C;font-size:0.95em;height:31px;padding-left:10px;}';
		css+='.nav-bar li { font-size:0.95em;margin-left:6px;padding:8px;}';
		css+='.nav-bar li a { color:#9BB2C8;text-decoration:none;}';
		css+='.nav-bar li.active { -moz-background-clip:border;-moz-background-inline-policy:continuous;-moz-background-origin:padding;background:transparent url(http://www.popmundo.fr/forum/public/style_images/master/tab_left.png) no-repeat scroll left top;font-size:1.05em;font-weight:bold;margin:-4px 0 auto 5px;padding:0;position:relative; }';
		css+='.nav-bar li.active a { color:#FFFFFF; text-decoration:none; -moz-background-clip:border; -moz-background-inline-policy:continuous;  -moz-background-origin:padding;  background:transparent url(http://www.popmundo.fr/forum/public/style_images/master/tab_right.png) no-repeat scroll right top; display:block; margin-left:6px; padding:10px 15px 10px 10px;}';
		css+='ul.nav-bar  { list-style-image:none; list-style-position:outside; list-style-type:none;}';
		css+='.left {float:left;}';
		css+='.right {float:right;}';
		css+='.invisible {visibility:hidden;}';
		css+='.button {border-style:solid;border-width:1px;cursor:pointer;font-size:0.85em;font-weight:bold;padding:3px 7px;text-decoration:none;background-color:#1D3652;border-color:#4F7298 #113051 #113051 #4F7298;color:#FFFFFF;}';
	
	GM_addStyle(css);
}
function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
		else { $ = unsafeWindow.jQuery; doStuff(); }
    }
GM_wait();

  function doStuff() {	
		window.addEventListener("load", function() { init() }, false);
	
		addStyle();
		
		addZeCSS();
		
		//addScript('http://www.popmundo.fr/klyne/scripts/jquery/jquery.columnfilters.js');
		//addScript('http://www.popmundo.fr/klyne/scripts/jquery/jquery.tablesorter.min.js');

		SCRIPT_TITLE 				= "[K.] Script";
		SCRIPT_VERSION 			= "Last";
		
		SHOW_RENOMMEE_POPU		= GM_getValue("SHOW_RENOMMEE_POPU");
		SHOW_CHARRESTANT 			= GM_getValue("SHOW_CHARRESTANT");
		SHOW_YOUTHHOSTEL			= GM_getValue("SHOW_YOUTHHOSTEL");
		SHOW_SKILLSINFOS			= GM_getValue("SHOW_SKILLSINFOS");
		SHOW_OPTIONCOLOR			= GM_getValue("SHOW_OPTIONCOLOR");
		SHOW_EMPLOYEMENTS			= GM_getValue("SHOW_EMPLOYEMENTS");
		SHOW_ANTIQUES					= GM_getValue("SHOW_ANTIQUES");
		SHOW_LIST							= GM_getValue("SHOW_LIST");
		SHOW_RELATIONPAGE			= GM_getValue("SHOW_RELATIONPAGE");
		SHOW_RENOMOD					= GM_getValue("SHOW_RENOMOD");
		SHOW_SALESPURCHASES		= GM_getValue("SHOW_SALESPURCHASES");
		SHOW_MENU							= GM_getValue("SHOW_MENU");
		SHOW_HEIGHT						= GM_getValue("SHOW_HEIGHT");
		SHOW_EXPAND						= GM_getValue("SHOW_EXPAND");
		SHOW_SLIDEPANEL				= GM_getValue("SHOW_SLIDEPANEL");
		SLIDEPANEL_ETAT				= GM_getValue("SLIDEPANEL_ETAT");
		SHOW_INFOSONSALE			= GM_getValue("SHOW_INFOSONSALE");
		HIDE_IMGONCITY				= GM_getValue("HIDE_IMGONCITY");
		SUP_DEF								= GM_getValue("SUP_DEF");
		SHOW_HBLOG						= GM_getValue("SHOW_HBLOG");
		SET_AREA							= GM_getValue("SET_AREA");
		SHOW_S_MOSTCRIMINAL 	= GM_getValue("SHOW_S_MOSTCRIMINAL");
		
		BLACKLIST				= GM_getValue("BLACKLIST");
		FAMILYLIST			= GM_getValue("FAMILYLIST");
		FRIENDLIST			= GM_getValue("FRIENDLIST");
		var i=0;
		function constructList(LISTE, type) {
			Listes = LISTE;
			Liste = Listes.split(',');
			
			while(i<Liste.length)
			{
				Lis = Liste[i].split('|');
				n=Liste[i].replace("|"+Lis[1], "");
				List[n] = type;
				ListID[n] = Lis[1];
				i++;
			}
		}
		List 	= 	new Array();	ListID 	= 	new Array();	Listes 	= 	new Array();
		if(BLACKLIST == undefined) { GM_setValue("BLACKLIST", ""); }
		else { constructList(BLACKLIST, 2);	}
		if(FAMILYLIST == undefined) { GM_setValue("FAMILYLIST", ""); }
		else { constructList(FAMILYLIST, 1);	}
		if(FRIENDLIST == undefined) { GM_setValue("FRIENDLIST", ""); }
		else { constructList(FRIENDLIST, 3);	}
		if((SHOW_CHARRESTANT 			!= "true") 	&& (SHOW_CHARRESTANT 			!= "false")) 	{ SHOW_CHARRESTANT = "true"; 			GM_setValue("SHOW_CHARRESTANT", "true"); }
		if((SHOW_RENOMMEE_POPU 		!= "true") 	&& (SHOW_RENOMMEE_POPU 		!= "false")) 	{ SHOW_RENOMMEE_POPU = "true"; 		GM_setValue("SHOW_RENOMMEE_POPU","true"); }
		if((SHOW_YOUTHHOSTEL 			!= "true") 	&& (SHOW_YOUTHHOSTEL 			!= "false")) 	{ SHOW_YOUTHHOSTEL = "true"; 			GM_setValue("SHOW_YOUTHHOSTEL","true"); }
		if((SHOW_SKILLSINFOS 			!= "true") 	&& (SHOW_SKILLSINFOS 			!= "false")) 	{ SHOW_SKILLSINFOS = "true"; 			GM_setValue("SHOW_SKILLSINFOS", "true"); }
		if((SHOW_OPTIONCOLOR 			!= "true") 	&& (SHOW_OPTIONCOLOR 			!= "false")) 	{ SHOW_OPTIONCOLOR = "true"; 			GM_setValue("SHOW_OPTIONCOLOR", "true"); }
		if((SHOW_EMPLOYEMENTS 		!= "true") 	&& (SHOW_EMPLOYEMENTS 		!= "false")) 	{ SHOW_EMPLOYEMENTS = "true"; 		GM_setValue("SHOW_EMPLOYEMENTS", "true"); }
		if((SHOW_EMPLOYEMENTS 		!= "true") 	&& (SHOW_EMPLOYEMENTS 		!= "false")) 	{ SHOW_EMPLOYEMENTS = "true"; 		GM_setValue("SHOW_EMPLOYEMENTS", "true"); }
		if((SHOW_ANTIQUES 				!= "true") 	&& (SHOW_ANTIQUES 				!= "false")) 	{ SHOW_ANTIQUES = "true"; 				GM_setValue("SHOW_ANTIQUES", "true"); }
		if((SHOW_LIST 						!= "true") 	&& (SHOW_LIST 						!= "false")) 	{ SHOW_LIST = "true"; 						GM_setValue("SHOW_LIST", "true"); }
		if((SHOW_SALESPURCHASES 	!= "true")	&& (SHOW_SALESPURCHASES 	!= "false")) 	{ SHOW_SALESPURCHASES = "true"; 	GM_setValue("SHOW_SALESPURCHASES", "true"); }
		if((SHOW_RELATIONPAGE 		!= "true") 	&& (SHOW_RELATIONPAGE 		!= "false")) 	{ SHOW_RELATIONPAGE = "true"; 		GM_setValue("SHOW_RELATIONPAGE", "true"); }
		if((SHOW_MENU 						!= "true") 	&& (SHOW_MENU 						!= "false")) 	{ SHOW_MENU = "true"; 						GM_setValue("SHOW_MENU", "true"); }
		if((SHOW_RENOMOD 					!= "true") 	&& (SHOW_RENOMOD 					!= "false")) 	{ SHOW_RENOMOD = "true"; 					GM_setValue("SHOW_RENOMOD", "true"); }
		if((SET_AREA 							!= "true") 	&& (SET_AREA 							!= "false")) 	{ SET_AREA = "true"; 							GM_setValue("SET_AREA", "true"); }
		if((SUP_DEF 							!= "true") 	&& (SUP_DEF 							!= "false")) 	{ SUP_DEF = "true"; 							GM_setValue("SUP_DEF", "true"); }
		if((SHOW_HBLOG 						!= "true") 	&& (SHOW_HBLOG 						!= "false")) 	{ SHOW_HBLOG = "true"; 						GM_setValue("SHOW_HBLOG", "true"); }
		if((SHOW_HEIGHT 					!= "true") 	&& (SHOW_HEIGHT 					!= "false")) 	{ SHOW_HEIGHT = "true"; 					GM_setValue("SHOW_HEIGHT", "true"); }
		if((SHOW_EXPAND 					!= "true") 	&& (SHOW_EXPAND 					!= "false")) 	{ SHOW_EXPAND = "true"; 					GM_setValue("SHOW_EXPAND", "true"); }
		if((SHOW_SLIDEPANEL 			!= "true") 	&& (SHOW_SLIDEPANEL 			!= "false")) 	{ SHOW_SLIDEPANEL = "true"; 			GM_setValue("SHOW_SLIDEPANEL", "true"); }
		if((SLIDEPANEL_ETAT 			!= "true") 	&& (SLIDEPANEL_ETAT 			!= "false")) 	{ SLIDEPANEL_ETAT = "true"; 			GM_setValue("SLIDEPANEL_ETAT", "true"); }
		if((SHOW_INFOSONSALE 			!= "true") 	&& (SHOW_INFOSONSALE 			!= "false")) 	{ SHOW_INFOSONSALE = "true";			GM_setValue("SHOW_INFOSONSALE", "true"); }
		if((SHOW_S_MOSTCRIMINAL 	!= "true")	&& (SHOW_S_MOSTCRIMINAL 	!= "false")) 	{ SHOW_S_MOSTCRIMINAL = "true";		GM_setValue("SHOW_S_MOSTCRIMINAL", "true"); }
		if((HIDE_IMGONCITY 				!= "true") 	&& (HIDE_IMGONCITY 				!= "false")) 	{ HIDE_IMGONCITY = "true";				GM_setValue("HIDE_IMGONCITY", "true"); }
		var links = document.links;
		if (!links) return;
		var protagonist = 0;
		try {
			protagonist = links[1].href.match(/.*CharacterID=([0-9]+)/)[1];
		} 
		catch (foo) { }
		if (protagonist == 0) return;
		
		var pdg = 0;
		try {
			t = links[3].href.toLowerCase().indexOf("common/company.asp?action=managelocale&localeid=") >= 0;
			if (t == true)
			{
				pdg = links[3].href.match(/.*LocaleID=([0-9]+)/)[1];
			}
			else
			{
			t = links[4].href.toLowerCase().indexOf("common/company.asp?action=managelocale&localeid=") >= 0;
			if (t == true)
			{
				pdg = links[4].href.match(/.*LocaleID=([0-9]+)/)[1];
			}
			}
			
		} 
		catch (foo) { }
		
		page = location.href;
		curpage = location.href.toLowerCase();
		isViewingFame	 				= curpage.indexOf("common/artist.asp?action=popularity") >= 0;
		isRepertoire					= curpage.indexOf("common/artist.asp?action=viewrepertoire") >= 0;
		isArtistSong					= curpage.indexOf("common/artist.asp?action=viewartistsong") >= 0;
		isOnOwnPage 					= curpage.indexOf("common/characterdetails.asp?action=view&characterid="+ protagonist) >= 0;
		isViewXP	 						= curpage.indexOf("common/characterdetails.asp?action=distributeexp&characterid="+ protagonist) >= 0;
		isRelationPage				= curpage.indexOf("common/characterdetails.asp?action=relations&characterid="+ protagonist) >= 0;
		isAnswerMessage				= curpage.indexOf("common/characterdetails.asp?action=answermessage") >= 0;
		isSendMessage					= curpage.indexOf("common/characterdetails.asp?action=sendmessage") >= 0;
		isViewingSkills				= curpage.indexOf("common/characterdetails.asp?action=myskills&characterid="+ protagonist) >= 0 || curpage.indexOf("common/characterdetails.asp?action=selectskill") >= 0;
		isViewingCharSkills		= curpage.indexOf("common/characterdetails.asp?action=skills") >= 0;
		isBlocNote 						= curpage.indexOf("common/telephone.asp?action=notepad") >= 0;
		isPhoneBook						= curpage.indexOf("common/telephone.asp?action=phonebook") >= 0;
		isCityPage 						= curpage.indexOf("common/city.asp?action=view") >= 0;
		isInteract						= curpage.indexOf("common/interact.asp") >= 0;
		isRelationShip				= curpage.indexOf("common/relationshipdetails.asp") >= 0;
		isEmployements 				= curpage.indexOf("common/company.asp?action=employments") >= 0;
		isLocalesForSales			= curpage.indexOf("common/company.asp?action=localesforsale") >= 0;
		isViewPurchases				= curpage.indexOf("common/company.asp?action=viewlocalepurchases") >= 0;
		isViewSales						= curpage.indexOf("common/company.asp?action=viewlocalesales") >= 0;
		isShowSet							= curpage.indexOf("common/performances.asp?action=arrangements&performanceid=") >= 0;
		isMostCriminal				= curpage.indexOf("common/charts.asp?action=mostcriminal") >= 0;
		isViewCashLocale			= curpage.indexOf("sortcriteria=cash") >= 0;
		isViewConditionLocale	= curpage.indexOf("sortcriteria=condition") >= 0;
		
		ServerId = 0;
		try 
		{
			ServerId = page.match(/.*www([0-9]+)/)[1];
		} 
		catch (foo) {}
		
		CharId = 0;
		try {
			CharId = page.match(/.*CharacterID=([0-9]+)/)[1];
		} 
		catch (foo) {}
		
		if((CharId != protagonist) && (CharId != 0))
			isOnCharPage=true;
		else
			isOnCharPage = false;
		
		images = new Array();
		images['accept']		= "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%02%9FIDAT8%CB%A5%93%EBKSa%1C%C7%FD%3Bv%CEvl%03%09dD!%82%84P%7B%15%24%12%3B%9A%0D%C5%BC%2CK%D3%DD%BD%D26c%D8L%8B2r%5E%C6H)-%B3%D4jsNm%EA%D4%E6%D6%942q%D9QB%CC%BD%E9B%B5at%B1o%E7%EC%C5L%12%23z%E0%0B%0F%0F%CF%E7%F3%7B%AEq%00%E2%FE'%7F%0C%14%F8%0E%89r%A7%0F%EA%B3%3D)L%C6%E3%FDa%E9%888%2Cu%252Rg%A2%3E%DD%BEW%B4%AB%20%CF%9BJ%CB%3C%C9!%9DG%86%9BA%0B%FA%96%BB%A2%E9%5ClF%89%EB%18%24%BDTH%D2C%D1%3B%0A%D8%AAt%E6xR%E4%EA%9C%11%CE%D5~%D8%5E%5E%83i%AE2%1A%AE%EFX%EDC%E3L%15%0E%D8%F8%91d%1B%9F%DE%26%C8%F1%A4%083%DDI%EB%1C%CCM%AC%09%94%A1%C2_%02%CD%CC%19%E8%D8%94%B3%A9%F6%9D%85%FD%F5%3D%5C%9C%AA%80%D8B%AE%8B%AF%93%C2%98%40%E6N2%A8%C6%B2%A2%959%98%03U%DESPL%17B1U%00%F5T!%DCk%830x%95p%B0%92%DC%9E%23H%B8B%1Ab%82%8C%111%D3%19l%865%D8%84%0A_1%94O%E4%2C%98%0F%E5%24%1BO%3E%C6%DF%B8%C0%B5Pd%0Dm%CF%1Ba%9BkD%7C%3D%C9%C4%04G%ED%09%1B%0FVn%A36%A0%81%D6%5B%C4%AEd%00%8B%1F%E6%A1%9A(%C4%D8%DAP%14%FE%B1%F9%1Dm%CF.%C10Q%8C%BE%60'%04Fb%23%26%90%DC%A76%FA%97%BBa%F4%ABP%EB%D7%E2%D3%D7%8FQ%E8%FD%97%B71%D82%5B%0F%B5%2B%1Bz%F7i%F4%07%3B%20%A8%F9%5D%D0C17%E6%9B%D0%BEp%19%BAI9%CC%BEjD%BE%7D%8E%C2%9B%3F7ayz%01e%CE%2ChXAK%A0%0E%ED%5E3%A8*bk%0B%A9%B7%04%06%F9%40%1A%EC%2BwQ%3D!%87%DA%7D%12u%D3%E5Xz%B7%80%B6%D9%06%94%0E%1E%87%C2q%02%3Ag%0E%EC%AF%BA%91n%3D%0C%AA%92%D8%3A%C4d%2B_%B8%8F%BD%1A%B3G%83%87%CC%1DT%8E%E6A%3B%9C%03%D5%90%0CJ%07%17%0E%CE%C6%A3%A5.%18%87%8A!P%F3%D6)5!%DC%F6%90%12%9BH%3A%BE%81%88%98%DCep%B0%92%D6%80%19%FA%D1%22%9C%1B%96%A3%95%DD%82%9D%85%F5%CE%22%F0Ky%11%16%A6w%7C%CA%7B%1AH%9A2%11!i%87%04%ED~3z_X%D1%3Bo%85%C5kBZK*%04%0A%5E%88R%11%F4%AE%9F%89%3AO%8A(%03%A1%A7j%08F%A0%E5%85%05*%5E%98%AD%C8%B0%D1S%A5%84%E8%AF%BF%F1_%F3%0Bg%D0%AC%E5y%BA%D4c%00%00%00%00IEND%AEB%60%82";
		images['author'] 		= "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%000%00%00%000%08%06%00%00%00W%02%F9%87%00%00%00%06bKGD%00%00%00%00%00%00%F9C%BB%7F%00%00%00%09pHYs%00%00%00H%00%00%00H%00F%C9k%3E%00%00%00%09vpAg%00%00%000%00%00%000%00%CE%EE%8CW%00%00%0AdIDATh%DE%DD%9A%0BPT%D7%19%C7%B5%89%B5%A9%D3%CC%A43%ED4il%9D%B4%93j%1F%13%5BL%A7N%A2%A2QA%05%01EP%40%05%1F%BC%C1%07%9A%B1%3EbgZ%15%95%87%8A%01%89%A2%22%22BT%1E5%06%DBi%A6%19%9B%98%B4%C6%E0%83%9A(%EF%E5%B9%AF%7B%F7%FD%E6%EB%F9%CE%BDg%F7%EEr%91%DD5%EDd%BA3%BFYY%18%FC%FD%BF%FD%EEw%CE%B9%CB%B8q%23%1F%E3%09O%7D%0D%19%3F%CE%8F%C77%08%DF!%BC%40%F8%11%E1%C7_%03%D0%E3%07%84I%FE%84%F8%26%E1%A7%13%26N%8A%98%FC%8B%D0%D4)%D3%C32%FE%E7%BC%E2%C3%F4%F0%F4%97B%22%E2'%3D%F7%FCK%C4%ED%E9%B1%02%3CC%F8%CD%0B%2F%CF%DC%16y%A0%B5%7Ba~%3B%1F%96%DF%CE%85%1Fl%E7%16%1D%EA%E0%16%13%96%1C%EE%E4%22%0A%3A%B9%C8%82.nia%17%17U%D4%CDE%13b%8A%7B(%CB%90%23%0An9rT%C1%C5Rz%B9%15%C7%04%E2(%7D%5C%5C%89%40%FCX%1C%EF%E7%93%8E%2B%BE%9C%1E%9E%3D%8B%B8M%F0'%C0%8C%17%A7%CD%DA%B9%F0%40%1B%3F%F3O%DD%F0%DA%FEn%98u%A0%07%E6%E4%2B%60%EE%C1%5E%98w%A8%0F%E6%1F%EE%87%05%05%03%10V8%00%E1E%83%B0%88%B0%B8x%08%96%1C%19%82%88%A3J%88%24%2C%3D%A6%A2D%95%A8!%9A%10s%5CCY%F66%A2%85%E5H%A9%16b%DDp%10%5B%26OB%99J9%232on%40%01%C2%F2%DB%F8%D7%F7%F7%C0l%22%1FJ%E4%E7%11%F97%88%FC%02%22%BF%B0%A0%1F%C2%89%BC%20%3E(%88%13%04q%25D%11qAZ%00%A5%97%23%A5%1A*%BB%02)C8%88CNx%88%F7!%EE%04%0F%89'%D4%CA%90%C8%AD%81%05Xt%B0%8D%9F%7D%40!%C8%1F%EA%25U%EF%A3%E2B%D5%07%04%F1b%A9%B8%CAK%7C%D9q%26-T%18%85%99%AC%20%C7%C3%CAr%0F%AB%18%EF%E8F%B0%BA%3C%88%00%8B%0F%B5%F3%A1%B4e%3C%F2%23%AA.SqVmO%A5%3D%D2%5E%B2D%2C%81qR%07%89%14%BD%2Ck%DE%D1%04%1E%60%C9%E1%0E~%9El%CB%F8T%BDD%E5Uqi%B5%A5%95%5E%E5%25%2B%88%25%9D%12XM1x%A8%F0%26%F9%A46%F0%00%91%87%3B%F9%F9%92%96Y%24%A9%3A%CA%FBV%9DU%9C%89%FBV%DA%5BX%10%5B%23%B2%F6%B4%F1%B1%A4%9C%E2%02%0F%B0%B4%A0%93_(N%99%11-C%AA%1E%3D%A2%EAB%AB0qi%B5%99%B4%AFp2%E3%0Cb%A2%CF)%3E%E0%EB%EB*%82%08%10U%D8%C5K%E5Y%CBD%B3%96%11%2FPi%BB%B8%5B%85%88'1q9i*g%F2b%DD%D9%D10%C3%FA%0A%3E%F0%00%D1E%5D%3C%9B%ED%BE%F2%5E%BD.%15%97%B4%8AT%DCW%DAK%8EQ%E9a%83%88%FB%EB%D3A%04%88)%EA%E6%97%1CQJ%E4%D5%5E%F2%23%AAN%90%17%F7%96%96%CA%0A%A2%16%81s%16%D88%1Agt%CA%90%88%00%03%2C%2B%EE%E6%23%FC%90%C7%F1%97~N%07%19Uz%22%8D%F2r%E2%9E*3i%26%97*%A5%CA*O0%01%96%1F%E9%E1%E5%DAF%90%17Fcj%A5%0Ejor%D0%DA%A5%85%7Fwqp%F9S%1DdW%8B%17%1E%13%1FM%9A%88%A5IH%3F%2F%C5%E6E%DAY%7D%E0%01bI%80(%B9%CA%8B-%93tJ%07u%9F%F0%C0qZ%D0%F1%1C%E8u%3CA%07%F5%B7%0CDVh%15%A9%B8%AF%B4T4%83Q-%87%1D%D2%2B%03%0C%F0C%12%60%C5Q%05%CF6_%D2%CA%B3~%C7%96y%D0C%A4%F5%3A%D0%11q%BD%5E%0F%26%A3%01%DA%FA%8D%B0%F9%22V~4qo%E1L%22%C8%C8%BA%20OF%A5!%88%00%C7%14%FC2%9F%9E%A7%F3%5D%9C%ED%99%E7%0D%F0e%AF%1E%8CD%DAh4R%2Cf%13t%0C%9AaK%ADpa%CA%8AK%A4%99%606%C5%01%D95%F2d%9E%0B%22%00%D9%B7%F3l%CE%BB%E5%25%93%06%C7b%FD-%23%98M%26%B0Z%CC%60%B5Z(W%5BP%D8%23%EF%2B%EE%91%16%E4r%A4%5Ct%8E%20%97%90Ue%0C%3C%40%7CI%2F%2F%5D%5D%A9%FCIA%9E-J9%17L%D0t%DB%0C%9DC%16%E8RZ%E1%BD%3BV%D8Z'L%0E%ECqYq%89p%AE(8%16A%05XY%D2%C7K%17)l%1B%BA%1D%10%E7%3B%5B%94%F0B%C5%96A%B0%DF7Tz%AA%1E%88%F8%A6%C7%90%1DL%80U%C7%FB%F8x%B7%BC%D0%3A%9E%05%CAD%9E1%800i%B2%AA-%F0%FB%2BV(%FA%8B%1D*%FEa'a%84%E9%C1Ze4%F1%11%B2%B5.Y%82%0E%B0%B2%DC%B3%C2JW%D7%DC%1A3%1Cn%B6B%D5M%1B%7C%F0%85%03%1E%0C8A%A9w%81%CD1%0Cj%83%0Bv5%08%17)%93%1FUZ%14%DC%3C%06%D9%E7M%81%07Hx%BB%9F%97%B6%0E%93%C7%CA%D7%FE%D3Fe%87%87%87%01%40%04%FF%3D%EC%02%0D%09%B0%BB%C1A%AA%FF%18%F91%84%B7x1%0C9%C1%04H%24%01%12%C4%8D%19%AB%3E%F6%3C%06hl%B1%BB%C51%84%CB%E5%A2%0C%93%00j%83%13%F64%0A%13%C6%1Fq%B7h%DD%F0%A8%04%17%A0t%80O%14%0F%1Ek%D9n%F2%AC%D0%F7%17%C9%3B%A05%BAh%BB%18%AD.w%00%97%CB%09j%BD%13%DEj%C4%EA%3F%5E%5ENz%AB%2C%00%B9%C1%04H%22%01%92%C4C%08%9B%3At7I.%DA%9C%1A%0B%EC%B8l%857%2F%D9%E0%AF%AD%0E%D29Np%3A%9D%E0%22%A8h%00'%0D%20'%EF%2B%BEuL%82%0C%B0%9A%04X%5DatW%9Fm%85%3D%7B%1B%2B%D9%02%DB%A0%89%B4%13%06p8%1C%24%84%03T%3A%07%0D%90%5B%F3x%F9%D1%84%E9%F7k%87%DD%3F%8B%AF%05%17%A0l%80%97%CE%7CV%FD%8D%E2%DE%06%17%AA%D4*!%80%8B%88%D3%00%04%A5%CE%0E%7B%1B%C5%F6%91%91%97%95f%3Fw%91L%257N%FA%8C%AFeW%05%11%60M%D9%20%BFVr%92b%BBK%5C%AC%D8%16!%CD%1D%C0%0Ev%BB%9D%84%B0%83%92g%01%C6%96%DF%E2%96%16%DE%B1%1C%DC%5E0%D8%18%26d%9D3%06v%22%A3%01N%60%00%93l%F51%40%06%DD%0A%DBi%00%A7C%08%60%B7%DB%60%88%B3%C1%DE%26%B1z%A3%C8%E3%D7%F8%3D%26%8E%A2%99%B8zca%B0%40%12%D2%F1%B5%B3%FA%A1%19Qo%CE%F1%F7%E6%AE%3B%80%E7T%25T%7F%A3%A4%FA%B8%C7a%01%1CD%DCj%B5%82%8D0%A8%B5%BA%03%C8%CA%D7%0A%F2%AC%E2(%8E%D2%A9xv%C0B%9D1%C0%BA%D3zH%A9%20%90%13%1E%BE%96uF%D913%3A%2FD%FC%9C%C0%BF%00k%25%01%D8%C5%2Bm%1F%5Ciq%BB%D0%F4%B9%0D%EC6%0BX%2C%88%19%064%96Q%03%B0%CA%D3%AA%E3A%85%9Ew%0Dx%DF%07%D6%94%AB!%B1t%10V%96(%20%B6%B8%13%E2%8E)%20%F3%CC%10%1C%BE%DCa%DAs%F4%CA%EE%09%13%BF%FD%9C%3F%9F%0Fx%05%18%ED%E2%CDp%07p%D0%00%B8%9D6%91m%B5%99%9C%07%FA%D4%26%1A%60%B3L%F5%BD%E5%CD%90R%AE%82%95E%8F%20z%DF%E7%B0x%EF'%B0%60%E7%87%10%BE%EB%03H)%FC%14%8E%5Cy%00%D7%3E%BCc%3F_%5Dst%DA%CF~%F2%BC%3F%D5%F7%090%C4%E3%A2%25m%9FTI%FB%E0F-%93%04h%BCm%A5%07%19%3C%D0%E0%89%ACWe%A4%17%F1%E6Z%EFq%89%AD%83%3D%8Fm%83%BD%BE%81%B4I%7C%E1CX%BC%A3%19%E2%F64B%FA%A1f%C8%AF%FA%18%1A%FE%DE%0A%B7%EF%3F%82%96%96%96%E1%FA%FA%CB5%B3f%BD%EE%D7%07%1B%F2%01%C4%BB%09%BE%FD%9F%C9%02%5C%10%02%98L%060%18%10%3D(%86%0C%EE%00%5E%D5%BF(T%1F%7B%1E%FB%3D%F9%A4%16%96%FE%F13X%B1%BB%01%BE%E8R%82%DEd%A1%BF%A3%AF%AF%17%EE%DE%BD%0BMMM%CD111%BF%F2g%F2%C8%07(%97%06%F0%F4%BFpHa%E7X%074%7Cf%01%23%11%A7%E7bB%CF%A0%9E.d%9B%24%EF%00%AB%3EN%1B%9C*%EB%C9hN%2C%1B%82%B0%DD7%205%FF%3D%D0%1B-%B4%FDz%7B%05%F9k%D7%AE%7D%B4~%FD%FA%DF%89%1Fy%8D%0F*%402%09%B0N%26%00%BE%03%5B%EBl%B0%AB%DE%06%3B%EB%ED%F0~%8B%99%1C%E8y%E0y%84%23%01x(h%16%D6%02%0C%B2%ED%5DO%EFg%91%D0X%FD%14l%1Fr%91%86n%BB%0E%FB%2Bo%D0%F6c%F2%CD%CD%CD%B7rrrB%89%C7%B7%02%95%97%0F%E0%EE%7F%8Bx%40%B7%C1%85%9Bf%D2*z%E8%1E%D4%C1%A0%0Ao%ADp%14%ADV%0Bj%8D%16%BA%FA9%E8%EC%D3%C2%DD%0E%1E%DEj%10%26%12%06%C0wo%23%19%0AkO%F1%10S%F0%10%E6%E5%5D%25%3D%7F%1F%06%06%FA%E1%DE%BD%7Bp%FD%FA%F5%5B%DB%B7o%9F%1F%AC%FC%98%01p%02a%80%2B%FF2%82A%CF%81%8E%D7%02%CFi%81%23%E2Z%AD%06%B4%1A%0Dh4j%D0%A8U%04%25t(%D4%E4%9Dp%D0%009%92%F6I*%D7%C0%92%7Dw!a%DF%DF%A0%A5%B5%0DZ%EF%DF%C7%CA%7F%94%9B%9B%3B%E7I%E4%FD%0B%40%AAX%FD%B1%09%BA%07%B0%CA%02%1D%A4%DA%ED%BD%1AhWh%A0%8DH%3F%EAQC%5B%8F%0An%3FT%C3%9E%06!%80w%FF%2Bi%80%C2%BA%16%AC%BC%8B%F4%FC%FBiii%BF%25%FF%F7%C4'%91%F7%2B%40%86%E4%1A%D8M%8E%8E%C8%1E%0A%D9%85%8A%60%D5%11l%9F%BC%3A%97'%00%F9%3D%18%20%A1L%05%C9%A5%ED%D0%7C%E3%8E%FD%EA%9F%9B%AA%E3%E2%E2~.N%9B'%92g%01B%5E%9C6%7BGr%B9%D2'%00%5B%03%D8M)%E1%D0%92%83%FD-%B2%89n%13%08t%D5%05%0A%1B%A1%9E%162%C1%EA%93%1C%E4_zd%7C%F7%D2%95%E2%F9%F3%DF%98%12%C8%9C%1F%EB%81o%E1%D4%C9%BF%9C%B7!%A5%AC%EF%E1%86%D3%3A%15A%89%B7%B7%F1%0E1%DEd%C5%FB%94x%AB%0F%EF%96%E1.%11%EF%18%08%98%94x%F4c%E4R%CC%F49%87%7C%0F%7F%96l%CA%94%1BO%F3%CA%F4%8A%A1%8E%3F%94%5E%DD%F9%EA%F4%A9%DF%F7w%85%F5%F7%81%BF%EC%BB%CF%3C%FB%BD%A9%AF%84e%CE%0E%89%CC%9B%8B%DBX%DC%8B%7F%25D%E6%85%BE%1A%BDc%CEk%B1%3B~%3Dy%CA%CB%CF%8A%7F%9B%F1%95%3F%9E%12%FB%F1%BF%C5%D3%81%FC%F5%C9%FF%FD%E3%3F%95%17%D7v%A7%0E%FD%9B%00%00%00%25tEXtdate%3Acreate%002009-09-13T15%3A26%3A41%2B02%3A00b*C%91%00%00%00%25tEXtdate%3Amodify%002009-09-13T15%3A26%3A41%2B02%3A00%13w%FB-%00%00%00%00IEND%AEB%60%82";
		images['bell'] 			=	"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%02%A7IDAT8%CB%95%92%5BH%D3a%18%C6%85%AE%82%82n%0A%82%1Dm%FB%5Bn-O%A9%85E%9A%B5%B2%8B%A0%A8%8C%F0B%82%A8%0B%231H%C5%B2fEx*G%A6%09KIq(%9B%939%E7%D4%0D%E94f%135%8F%9B%3A%9B%5B%DA%0E6O4%B5%91O%DF%02%87Qf%5D%3C%F0%7D%F0%3E%BF%EF%7D%DF%EF%09%02%10%F4%3F%1Ai%A2T%83r%AE%CFP%1A%AC%F0%DF76(%A9%ED%26%25%15J%8C%DBLJn%9EU%15%01ws%22Z%F2%D8%BE%0D%01%96%16%EA91%DA%86%15%D4%1Cy%F5%BBM%BD%1F%FA%C7%EC%15%7D%11%1F%F2%1CV%D3%BA%00b%E4%8E%AA%A9EgO%1A%96%5CZ%2C%3B%5B1%DB%95%0EWS%3C%06%CA%C3%A0%CCe%E5%AE%D6%FE%C9%7C%D6%DAq%00%EE%A1%7C%7Cs%A91%D7%7D%1E%9E7%09p*xp4%C6%C0%A19%0A%B5%88e%FA%0D%40%8C%3B%89%DA%A7%8C%C9X%B0%D6a%C9%FE%12s%C6%24%CC%BC%8D%C7%B4%EE%20%DC%9AH%B8T%02%B8%B4'%D1U%CC%F1%05%00%A3*%8AK%8CSd%D6%15w%FF%1D%F8f%8D%F8j%B9%0F%B7%5E%08%A7%EE0%26%9Bc0V%BB%17v%19%1F%CEF%D2E%EB%09t%3C%08%5E%0E%00%86%E5%5C%AD%BB%EF%1C%96%1D%12x'2%E15%A5b%B1%FF%0C%5C%AF%E21Z%1F%8E%A1J%1E%3E%94Q%B0JC~%8E1%A5%3E%8E%C6l%96-%00%E8%AB%E2L%CE%5B%AEa%DE%22%C2%FB%1A%3Ez%EBC1X%17%8D1%22%A7%26%1A%C6%12%0E%BA%9F%EC%82%BD%96%03w%DB1L%C8%E2Pw%93)%0B%00%3A%9F%06W%8C%A8%E2%E01%E7%60%A0%E14T%F7b%A1%13%1F%81%B6%80%8D%8F2%01%3C%ADa%E8%13%B3a%910%E1hID%CF3%1Ej%AE3%84%BF%2C%F1u1%5B%DF%23%8D%20%5DdCqK%00%AF%B5%10_z3%A1%C9%E7%A3%B3%88%81%99f%8A%00Xd%1F%24%40%B7%D9%9E%B5%BF%168%B4%3Dd%9B%0DU%E10%BC%B8%80q%5D%06%BC%E3%22%8C%A8.%A2%24e%2Btww%60A%C9%85%AD%E1%10%A47%98%83%7F%04%F8E%02%D2%A0%2B%DE%87%B6%C2X(2y%D0%97%25%A0%F4%D2%16%3CJ%DA%8Cn1%0D%16i%14%AA%AE%D2'%D6%05%F8%25%CFf%09%E5YL%E8I%E2%EC%86S%F8%FCN%08%83d%0F%3E%A9w%A3%B7L%80%8A%CB%F4%CE%BF%02V%25%CD%60%8A%A4%E9%0C%E8%0Ax0WG%C1%5C%19%89%A6%AC%10%94%A6%D0D%FF%04%F0%AB%3A%8D%B1Ir%85%9ES%9EJw%8ASh%D3%25%C9%B4vq2%8D%B5%B6%E6%07%EA_%BE%1E%9CH%E7v%00%00%00%00IEND%AEB%60%82";
		images['close']			= "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%02%5DIDAT8%CB%A5%93%FBKSa%18%C7%FD%5B%B6%1F%A2%04%89n%84%84QP%98%F32w%D6%DA%DC%A6%CE%B3L%8F%5B%2Cbi%8E%9Da%9AA%8D%C5%5C%F8C%A8%A5v%D5%CA_2Ml%94ZFj%D7%A1%E5%B1%F2%D2NMjm%9E%B3k%CA%B7%B9%60%26.%23z%E1%FB%CB%CB%FB%F9%BC%3C%0F%CF%93%02%20%E5%7F%B2%E6bV%AF%17%CEP%15%E6%F7T%193%A5%25%B9I%AD%86%7BG%AA%99qRiv%95%C8%85%EB%0A%E6tz%E2%23E%B1%DF%1C6%84%07%9D%88%BC%19Edd%08%FC%DD%0E%CC%1AJ%F1%AA%90%60%9F%AB%C5DR%C12%3C%5DN%F1%0B%B7%3B%B04%F5%16%D1%BE%3B%88%B6%DB%11m%3E%87%1F7%9B%B08%DC%07%8F%C9%80Qe6%FFL%9EI%AC%12%CC%E8t%82%18%EC%E6%AE%B7c%89q!z%F1%0C%7Cv%0B%FC%B6j%84%2FX%10i%A0%11%B6%9E%40%F8%DE%0D%CC%1D%251%7Ch%9F%FB%B1l%8F%20!%88%C1%F4%7C%AD%19%8B%AE%B1%F8%8F!%07%0D%EFY%23%82u%BAU%E1N%92%08w%5D%C1%CB%BC%0C%0CH3%E8%84%E0%03u%84%09t%5DE%B4%B3%19%3Ek%25%BE%16I%93f%A1%92%04o%AB%81%C7R%85%87D%3A%93%100%E5%DA%60%E4~%17%A2%0E%0B%7C%A7%0D%F8%D3%F1(r%E0%A5%0A%E1on%843oG0!%98%24%8B%82%A1%CEV%84%EB%0D%08%9E*%5BW0_%AA%82%BF%A9%11%FD%E2-%2B%82%89%12%15%E3%B5%D6%20d%A7%C1%1DW%C7%1F%26%8D2%0F%BEZ%13fMF%F4%89%D2VJp%15%CBiF%26B%B0%B3%0D%3E%AD%0C%DER%C9%1A%98%95g%83-%90%20%D0~%09C%E2m%E8%CD%DA%B4%D2%C4%D7ER%C1%0B%0D%E1%9E%AB%D0%20p%AB5%DE%B0y%95%F8%17%A8%C8%05%2B%8B%C121%F8%B6%16%8C%17K%97aw%B7h%A3%60%D5%20%8D%15%E4%10%23%8A%03%FC%F4a%15%02%D7Z%F1%BD%9E%86%87T%E2%B3Z%01o%9D%19%FC%E5%16L%A8%F3%D1%93%95%CA%C7%60%22%E9(%3F%95%EF'%9E%1C%DC%CB%8EJv%E1K%B5%11%DE%86%F3%F1%7C%AA%3A%86G9%5B%97a%F6w8%E92%0DJw%0B%07%C4%E9f'%B1%93y%90%BF%9D%EB%17m%E6zs%D3%98%9E%ECTsw%E6%06%E1_%B7%F1_%F3%13%1D%D2%CE%B9Ir%1B%FE%00%00%00%00IEND%AEB%60%82";
		images['gradient']	= "data:image/gif,GIF89a%01%00%16%00%C4%00%00V%9C%C2T%9C%C2%16b%8BO%9B%C1'r%9C*v%A0%24o%99L%98%C0%18d%8EB%8E%B8%3F%8B%B51%7D%A6.z%A3%1Ej%93F%92%BC8%84%AD%1Bg%90I%94%BE5%81%AA%20l%96Q%9B%C1%3C%88%B1%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%01%00%16%00%00%05%12%20%10P%C3%119%89R%3D%D2%C2%14%8415%10%22%84%00%3B";
		images['open']			= "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%02oIDAT8%CB%A5%93%EBK%93a%18%87%FD%5B%B6%2F%05%83%A4%86Y(%A8)%25X(o%D9l%8A%8AN%DB%96sk%8A%CE%F6n.%9D%BA%CD%03-%9D%13%0F%15%B5%A1%DBh%A4%3B8%0F%C3%03f%E2%D4%D2E%EA%EBP%A2%8D%22%08j%C3%AF%BF%DE%15MG%CB%88%1E%F8%7Dy%E0%BA%9E%E7%BE%B9%EF%24%00I%FF%93%DF.t%D3u%CC%0E%8F%84lu%89%A8%E6%09AX%FE%A2%3A%DC%F0%BC%82%92Z%CBH%D1h1%F3D%81nZJ%B4OJB%CF%D6%7B%B1%1AZ%84%FF%F3%06%D6%3F%AD%602%60%87%D2S%03%BE%89%13%E2%3D%B9N%24%14%FC%84%C5%91%E9%3D%3B%0E%BE%EDa%F6%83%0B%26j%10%8Fw%0C%B0%EF%9B%B0%F4q%0E%DA%05%19JG%F2%23%DC%C1%3C%22N%A0%9D%922h8%E8%DE%B5%60%EF%EB6%86%B7%F5x%B8%D6%81n_%2B%0C~%1D%FA%FCZto%B6%C0%7D%60%07%E9%11%A2%D0x%25X%D0%9B%CD%88%09hX%D1%BF%AC%C6%BB%2F%9B%F4%8B%7D%E8%DD%D2B%F3J%89_G%BD%26%83%7CQ%08%C5r-%9C%FB6%DC%1C%C9A%DE%83%0CEL%D0%E2%AC%A1%5C%01%1B%FDU3%3AWUh%5B%91C6%2B%8A%09%046.%1Af%CA%20%9D*%C6%C0%1B%1D%F4K%CD%B8%DC%9DF%C5%04%8Aq%FE%A1%F7%BD%0B%FDou4%DC%84%3F%1D%F1d%11%14%F3%7CX%FC%C3%C8%D2%A5%1E%C6%04Mv%DE%E1D%60%0C%DA%0D%12*_%FD%89%02%D2%5B%0D%AB%7F%08%E9%1D%EC%23A%BD%AD%9C2%FA%B40li%D0%F4R%08%F1%7C%05x%D6%1Bq%604w%3D%5C%F4%FB%D4%E8%F2%DE%C3%05u%F2Q%09%E2%B1%12%C5m%2B%01G%C0%02%D9%7C%25%24%DE%D2%1F5%1F%17%88%9C%1C%D4%B9%8B%E1%D85%E3RO*%D8%F7YGM%14%9A%8B%18UO%0B%83%A4G%80qj4%D6%B0(X%EB%8C%26%0As1%B1c%C2%1D%CB%AD(%1CLV%9Ef%C4%0DR%F9%A3%02%A2d%E8j%A4%D1Q%09'-1%FA%DAA%CETA%3EU%09%E3j%1B%1C4%2C%B4p%C0V%B1%224L%24%1Ce%CE%40.A%18rB%F9%03%99%E8Y%20a~m%80y%C3%00%8D%B7%11Y%5D)Q8t%1CN%B8L%D7%F4%99%CC%DC%9Et2%BB%F3%22%95%A1I%09%A7%B5%9F%0D%9Fo%3DC%9DS%B1%C8d%E5)%E6_%B7%F1_%F3%1DAF%CB%1F%00(%D3%C1%00%00%00%00IEND%AEB%60%82";
		images['update']		= "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%40%00%00%00%40%08%06%00%00%00%AAiq%DE%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0D%D7%00%00%0D%D7%01B(%9Bx%00%00%00%09vpAg%00%00%00%40%00%00%00%40%00%EA%F3%F8%60%00%00!%3DIDATx%DA%DD%7B%05XV%DB%B6%F6G(%0A6-%82%18%20%88J(a%80%A2%82%DDbc%C7%B6%B6%C1%16%EC.%8C%8Dn1%B0E%05%91%96%EE%EE%0E%E9%EE%96%0EQ%C6%1Dc%B1%60%2BG%3D%9Es%FF%DFs%EF%E5y%DEg%7D%AC5%D7%1C%EF%3B%E6%98c%CE%B9%D6%5C%1C%CE%AF%FD%E3F%F4B%F4A%F4C%F4g%D1%8F%3D%D7%8B-%F3%7F%F2%8F%0B%D1%5B%5E%5EN%F8%E8Q%23%B5%BD%7B%F7%CE%DC%B1c%87.%81~%D39%BAFe%D8%B2%FF%EB%C4q%B1%AD%F7%3D%F2%3C%88%01%EB%D6m%9E%95%93S%98%DA%DA%DAZ%D5%DC%DC%5CI%A0%DFt%8E%AEQ%19%B6%EC%F7%ECp%7Fa%EF%7F%84p%1E%B6%D5%FA%B0%E0%FB%86%00.6%BCEuu%97lNL%CC%AC%85%1E%7Ft%8E%AEQ%19%B6%2C%D77%1C%C8%F7%85%9D%DE%EC%B9%FF%98%23%B8Y%12%FD%F9%F8%F8%86%1E%3F~Z%DB%D9%D9s%EF%BCy%8Bd%F0%9C%40%0F'p%B1e%25%E7%CCYz099%AB%A1%A7%03%E8%1C%5D%A32%DF%E8%06T%97%00%D5M6%C8%16%D9d%F3G%EF%FFD%DE%20B%7D%11%223g%CE%9Ebmm%7F5%3F%BF8%BB%B0%B0%BC%E9%E1%C3%17'%F1%BC%14%7B%9D%FB%0B%07P%EB%8DX%B4H%EFXJJNSO%07%D09%BAFe%D8%B2_%3A%9A%EA%92%A2%BA%C9%06%D9%B2%B6v%B8J%B6%89%03%7B%9D%E7W%B6%3C%BF%AA%AA%BA%CC%FD%FB%8F~OJJ%8B%AA%ABk%FC%F8%F9%F3g%F8%F8%F1%13%C4%C5%A5d%AD%5C%B9f9K%AC%ABux%D8%A8%18%B3l%D9%DAsii%B9-%3D%1D%90%9E%96%D7%B2%7C%D9%FAsXF%86%8B%D3%9B_%9C%A3%C9%3D%84%B3%8C%1C%C7%8B%10Z%B5r%DD%B2%B8%D8%94%2C%B2%F1%F9s%07%90M%B2M%1C%88%0Bq%FAU%91%40%84%04_%BF%B69QRR%D9%D0%DE%FE%E9%2B!%B5%B5%0D%60c%E3d%3Bd%88%E0D*%C7%0Eq%83%10%12%08%CD%F5%EB%B7%3D%C8%CC%2Ch%EB*%FF%B9%E3%134%7C%AA%85%B0%8C%D0%8F%3B%AEo~%B7%F3%85%DE%85%9B%D1'%2F%3E%CF41~%92q%ED%F4%B5h%C3%DF%B7%3F%5E%BE%EF%91%93%99%7BQUqG%07%7C%EE%B6E%B6%89%03qam%F1%FE%92%A1%0C1t%CD%9A-%FBbbR%3E%20%A3%AF%FE%3A%F0Dvva%9D%81%C1Q%EA%0A%AA%DA%DA%B3%A6%5D%BB%F6%E7V''%B7%DB%FE%FE%81.Q%11%09E5%1F%EA%3A*%DB%CA%20%B8%DA%0B%1E%E5%5D%873%A9%BB%E1%F4%FB%DF%E0Z%AAQ%FB%F3%BC%3F%DB%9DK_w%04T9%83O%85%5D%87M%F1%A3%8Ff%D9%17%9B%AF%A7%19%7C2%C92%02%AB%A2%BB%10%FD%C1%1F%AA%DB%CA%E1%13%3A%2F%26%26%B5%86%B8%10%A7_5%842%D9%9C%97%B7%F7%9C%2BW%EE%F8%D4%D4%D43%A2)%2C%09%F4%BB%B9%B9%15%82%83%A3%B2%EC%EC%1C%1DRS3Sjj%EA%1A%9A%1A%5B%3A%3E%7D%FA%0Cy%8DY%60%96%7B%1D6%C6%E8%C0%F2Hu%D8%11%BF%10%FE%CA%3B%09%B6%95%F7%C0%B3%CE%1C%82%9B%DEBt%AB%23%24~t%81%04D%0C%FE%0Em%B2%01%AF%DA%17%F0%B2%C4%18N%A5n%84%3D%F1s%C0%20i%19%BC%C8%BA%09%A7M%CF%84%F6%E5%E7%D7EN%C2%2C%B7%AF%FE%AEe%EC%E4l%8AQ%E4%F5.%B7%98%13_%1B%B0%DB%A7%C2r%60%60%95%DD%7F%3B%07%D0X%AD%A8%AA%AAy%DA%DF%3F%B2%86B%F1%D3%A7%BFA%FF76%B6%40SS%0B%93%17%3E%7F%EA%80%B2%E6b0%CF%BF%0Fk%A3g%C1%D2H58%99%BE%13%9E%95%1A%83%E3%87%FB%E0T%7F%07%9C%1An!n%82S%E3%0Dpi%BA%01n%CD%7F%82g%CB-%F0i%BD%03%01%1F%EFCh%FBc%88h%7F%01%E1%AD%96%E0%5E%FB%10n%E7%1D%82%DF%E2f%C1J%1F%C5%8A%B9%162%B7%B4MF%CA%8F%D1%13%E1%D28)%D5MtW%8C%3Agk%94%B2%C0%DE%B8i%86%B6%C5%7FUE%D6%B87%9A%E7%5DXj%5Dd%F2%DF%EE%06%94%A5%87%E1%CF%C5G%8F%5E%F4.)%A9b%84%B6%B5%B53%F8%F8%B1%13%EDt%0E%8F%C1%15~%B05v%09%CC%09S%82C%EF7%C0%E3%92%2B%F0%B2%F2*%3C%AD%3C%0BO*O%C1%B3%CA%D3%F0%A2%EA%2C%BC%AA%3E%07%165%17%C0%AA%F6%12X%D7%5D%01%DB%FA%AB%E0%D0p%0D%DE1N%B9%C9%3A%E56%F8%B7%DD%83%E0%B6%A7%E0%5Eo%06%B7%D0%11%BB%E2f%B4%AF%8BP%8C%5C%1F%A14oc%8C%1A%F7%86(%15%CE%F6%185%CE%B6h5%81%ED1%93%CE%EE%8B%D7j%B2.3%81%A7y%A7%C00q%AE%C1%C9%E4%A5%3F-%94%FB%1B%B3%BB%AE%CC%3C%18%A1%AE%A0%A0%7C%D5%D33%B8%B6%A5%A5%0DZ%5B%3Fv%A3%AD%B5%1D%1A%9A%1B%C1*%DB%1C%E6%05%A8%C2%1Al%F9%EB%B9%C7%C1%B4%E84%DC%2C2%80%1BE%87%C1%A4%D8%00n%97%1C%81%3B%25Fp%AF%EC(%3C(%3B%0E%0F%CBO%C2%93%0AtJ%D5%190'%A7%D4%9CG%A7%5C%ECv%8A%5D%B7S%AE%A3Cn%81o%F3%23%B0%AB%BE%05%C7R%F5%00%85%17m%88T%DA%B1%3ET%A5%CFZ%3F%25%81-Q%13%CF%EE%8E%9B%D6%F8%B8%F8(%84%B6%98%83Q%F2%3C%D8%15%A3zdw%AC%FAO%8D%F3%7C%EC%D0%25%C0%CE%BCx%BFp%08%25%1Ba11q%ED%2BWnX%25%26f%B465%B5%029%A1%B9%A5%15Z%5B%3EBe%7D%15%DC%8C%BB%08%9A.caS%C4b%B8%9C%7D%04%CE%E4%EC%81S%D9%BB%F0%B8%1B%CE%E7%EE%85%8By%FB%E0r%FE%EFp%B5%E0%00%5C%2F%3C%88%8E!%A7%FC%F1C%A7%BC%E8r%CA%87.%A7%5CF%87%DC%00%C7%DA%BF%E0j%D6o%B05F%A3n%7D%B8%A2%B1~%B8%B2%F1%CE%D8%A9%8D%F7%0B%8F%40P%DB%13%F0oy%00%7F%24%CDA%07%A8%19%EE%8E%D5%F8%E7%E3%BC%BA%FA%94%91%DE%DE%01%86O%9F%BE%DC%24%2F%AF0%06%CF%0Da%C7Zr%C6%10EEe5%1B%1BGs%9C%98474P%7Foe%FB%7D%2B%7C%A8%AF%03%E3%88%F3%A0n-%0B%3B%22V%C1%89%F4%7Dp0m%23%1CB%18%A4o%86%23%19%5B%C1(s%1B%1C%CB%DC%01'%B2w2N9%CB8eO%0F%A7%1Cb%9D%D2%23R%CA%8F%C3%A3%8A%93L%F7yN%91R%7D%96%E9%3A%F65%B7%E1n%BE%11%EC%8D%9F%D5%BE'~%E6%C7%BF%F2%0F%81k%83)%B8b%D7q%AD%BF%85%89S%17v%C6%A8%1A%FD%F6%83%08%E0b%05J%5C%BDjr%20%23%A3%A0%BE%B8%B8%A2.%2C%2C%DA%F9%CC%99%0B%9B%B0%C5%E5%F1%DApqq%095kk%C7%17%C5%C5%95m%F5%F5%CD%D0%D0%F05%9E%C7%3D%06%B5Wc%60C%C0%12%D8%FF~3lK%D2%83%1DI%AB%60W%F2j%D8%FD~-%ECMY%07%FBS6%C0%814%FDn%A7%18%A2SNd%ED%82SY%BB%E1%24%1EOf%FF%06%A7%11%E7s%C9!%07%18%87%18%17%1C%84%1B%E8%94%3F%B1%0B%DD.%3E%02%A6%25%86p%AF%94%A2%E4%18F%C9%09%26J%2C%AA%AE%C2%CB2c%C4U%B0%AE%B9%01o0R%DE%D6%5E%06%9B%0F%D7%E0p%92%0E%EC%20%07%C4k%FCp%923D%5D%7D%F2L_%DF%B0%98%CA%CAZ%A8%AFo%02%1A%EA%F2%F3K%AA1%22%EC6m%DA%BA%DF%D4%D4%ECQnnISmm%23s%BD%0B%0D%E8%0C%D7Tg%98%FAl%02%2Cv%D6%86%ED%F1kaM%ECBX%17%B7%08%D6%C7%2F%01%FD%84%A5%B0)a9lI%5C%81NY%C98e%CF%FBu%F0%7B%CA%26t%CEzX%1E3%0F%B4%C24%405X%11T%82%C6%83b%D0X%D0%08U%86%99%11%93aC%E2%22%8C%9C-p%1E%BB%D1%95%BC%FDp%15%A3%E4%3A%3A%E4%26%3A%C4%84u%C8%9DbC%B8%8BQbVv%02%1E%95%9FB%9C%80%C7%D4u*%CF%60%D2%BD%00%07%13u%60%7B%D4%A4c%06e%9A%DF%0F%7D%C4hS%D3G%B7rr%8A%DBI%20%CD%EC%E8%F8%E1C%03%A0C%3A%B2%B2%F2%EB%B2%B3%8BZ%AA%AB%EB%BB%CF%13%EAj%9B%20%B5(%1D%16%BE%9C%093%2C'%81~%D4JX%1C%A5%03K%10%CB%A2%E7%C0%F2%E8%B9%B0%12%05%AE%8A%5D%00%AB%D1)%E4%90%AD%89%ABA%2Ff!(%05%8D%83A%1E%03%81%D7%85%178N%1C%E08%7F%0D%5E%17n%18%EC.%00%A3%7C%86%C2%ACpU%D8%97%B2%1A%CE%60%94%5C%40g%5C%C4%5CB%0E1%CE%FB%1D%AEa%A4%DC(%C0%08)%3C%DC%C3)G%E1a%E9)8%908%1B%B6%84O%3C%F1%0E6%7F7%F1%0D%DE%B0a%CB%D2%C8%C8%A4%5Cj%7Dj%F9%7F%05%C6%5E%97A%F1%CFQ%B0%C2%7F%01%E8%84O%87%D9a%9A%A0%8B%C7%B9%E13%60%5E%846%2C%88%9C%05%8B%22g%C3%8A%E8y(%7C%11L%08P%80%BEn%7D%19%91%5C.%5C%D0%DB%B5%17%08%B8%F4%85%01%CE%FD%60%90s%7F%18%E8%D2%0F%06%BB%F6%03A%14%2F%E4!%00%A2x%1C%EA%D1%1F%E4%7D%87%C2%C2%C8%C9%60%90%BA%01Ng%EEd%9Cq%0E%13%E0%F9%EC%DDp%11%9Dr%09%BB%0D%13%25_8%E5N%91%11%ECO%98%05%1B%83%95%CF%E0%84%F5%BB3%3C%E1%2BWL%8C%C2%C2%12%1B%CB%CBk%80Z%B9%BA%BA%EE%9F%E2CM%03D%A4G%C1Tc%15%D0~%AE%01%B3C%B4%60J%B0*L%0BV%07%AD%10%0D%98%11%3A%05%B4C%A7%C2%CC%D0i0%3Fb%16%3Ae%26%88y%892%C2%B9%5D%B9%A1%9F%0B%3F%88%BD%11%84%11w%C5%60%8C%B1%04%8C%BB%22%09%8AW%87%83%F2-iP6%93%06%25%8B%E10%CEY%12%C6x%8B%C2h%2FA%06%B2%5EB0%23x%1C%ECM%D6%83%E3%E9%5B%19%9C%C8%D8%0E%A72vt%3B%E5%2C9%06%9Dr!g%2F%5C%C7%F9%C2%BE%F8%99%98%97%94%CF%7Do%BA%CC%2Cr%86%0E%1D6%7D%F5%EA-w%5E%BE%B4%2FHK%CB%EF%A8%A8%A8%A5%D0g%40%BF%7B%82%CE%97%95W%83%A1%95%01%8C%3B7%02f%7Bh%C1%C4%00E%06%93%02%94A-P%05%D4%83%26%C2%E4%A0I0%3Dd%0ALGG%F4w%EF%CF%88%EF%E3%D6%1B%C4%EDP%D0%9FCA%E6%B0%E8%A7Q%BB%84%CBFo%14%2B%1C%B3L%F2%E3%B8e2%A0%AC%2F%0F*%7Be%60%E2%F1%11%A0qs%14L%7B%3D%06%D4%3DF%81%22F%C0x%1F1%18%8F%0E%D1%0A%94%83%5D%98%5B%8E%A4l%84%23%A9%9B%C0%10a%94%B6%19%8E%A6m%81c%E4%98%8Cmp%12%9Dr)%7B%2F%8E%0E%E8%80%40%E5s%DF%8B%80%AE%1C0%1C1KJj%E4%F1%03%07N%04xz%866%E6%E7%97Cy%F9%07%A0%A8%E8%89%8A%F2Z%88%CBL%82)%97T%60%CA%13%25P%F1W%84%B1%BEr0%CEO%1E%C6%FB)%C0%04%FFq%A0%E4%3F%1E%1D%A2%84Q%A1%01%83%3D%061%E2%050%F4GZ%8B%83%FCU%09%901%14%CE%1Dyx%C8%B9%91%87%06O%90%9F%3Fr%B4%92%8A%E2%1F%8A%13%94%D2T%D5%D4%3B4%B5%B5Ak%E1%0C%98%B2%5D%05%26_%90%05%EDg%F20%D3c%2C%A8%FB%0D%87I%BE%C3%60%A2%AF%04%CC%C2H%F8%0D%93%EB%C1%E4u%0C%0EaB%A5%19%E7a%1Ci%0CR%F4%E1%0Ft%CA%E9%8C%9D%B0%3B%5E%1B%F4%C3%94%CFx%C0%B6%1FN%80%04%3A%A7%B9%1C5%1E%1E%DEM%EA%EAZ%CF%EE%DCyV%94%95U%04ee%D5PZ%FA5*%D1%01%CF%FC%9F%C1%D83%D2%A0%E6%A0%04%A3%7DF%C2(%EF%91%20%E33%0Ad%7Dd%60%8C%8F%2C%F6%D91%1D%CA%01%8A%1D%A2%9E%22%1D(%BE%83%DF%BD%CF%E7%D1%8E%12%9F%C6%DD%1E%D6.sQ%D8c%F4%05A5%B9'%E2%DC2%D7%859%93%26M%E2hhhp%A9(%2B%8F%9F%A82%D1F%5Dm%F2'%ED%19s%40Gg!%CCZ5%0B%A6_%18%0F%F3%AC%26%80%0E%3Ax%AA%FFp%98%EC'%05%1A%88%C5a%AA%B8HZ%09%7B%13V%C1%DE%C4N%ECKZ%8DX%03%FB%93%D7%C21%8C%88%DF%E2%A6%C3%C6H%E5S%7B%8B'%FF%D3%89%10%CD%02%85%10%13%10%9B%8E%1C9%1D%9C%9E%5E%80k%EFj%A0y%FF%DF%A8%86%FC%C22%D8%F5l%3B(%5C%93%06%05%0F9%18%E6)%01%92%9E%92%20%E5)%05%C3%BD%86w%8C%F0%92%FE%24%E33%FA%E3%08%1F%E9Vng%EE%D6%5E%AE%BC%CD%D2%EEb%0D%8A%E6R%1F%E4LEldo%0BI%8F%BA%2C%C4Qx!%DCM%80BTUU%95%A3%A6%A6%26%8C0%9B%3AU%F3%93.%3A%60%DE%C2%C50%EB%8C%1A%2CtP%84%85%81%13%40%3B%60%14L%F7%1F%01%9A%FE%D20%23%40%06G%1E%5D%5C%17%2C%87%9D%0C%96%C1%CE%F8%E5%B8%DA%C4%DF%09%2B%C0%E0%FDz%D8%11%A5%09%1B%C2%94N%E9%87%AB%FC%F4%82GBFf%8C%9E%83%83W%16u%83%A2%A2%CA%AFP%5C%5C%05A1%11%A0qE%19%94%9F%8CA%D1%92%20%EA%26%0Abn%E2%20%EE.%FEI%DCC%BCy%A8%E7%D0%FA%E1%5ER5%02n%02%15%D8%FA%25B%9E%03%8B%94%1C%A5s%C7%BD%12%F3%903%17R%90%7B%22%C4%91s%16%F9%26%89i%D3%A6q4%B54E%A6L%9Eb3Cg%26%CC%3E3%19%E6%BD%1B%0Fz%81%93%60Q%B0%02%E8%A2h%1D%C4%3C%1CFW%86M%85%CDQ%F3q*%BC%08%B6%B0%D8%8C%D8D%C7%D8%C5%F0%3BF%C3V%CC%3Fk%03%26%9C%5E%1B%A8%F4%D3%0F%3E%86m%DC%B8%E3pDDrCaa%05%14%14%94w%83%F9%1F%9D%F2%C8%FE)%8C%3F%3B%0A%94%DF%C8%81%08%8A%17v%16%01%11g%91vA7%C1JAw%C1%12aw%E1%02A%0F%C1%2Cl%FD%F7%D8%FA12%5E%12a%CA%F6%92%01cm%85%D7%2B%F9%0C%E5Rp%10%FD!%11%AD-j%1C%AD%D5%1A%93%A6_R%2CY%E05%1E%D6%86%AB%81%5E%A8%12%2C%C6I%D2R%9C0%ADF%E1%1B%23tP%FC%3C%0C%EF%B9%A0%8F%D8%80X%1F%D5%89%B5%91s%60%25%0E%BF%EB%A3g%C3z%7F5X%E55%FE%CCj%DF%09%3F%7C%AE%CF%CD%8E%08%CC3%BC%B3g%AF%DDOJ%CA%EE%A0%08%C8%CB%2B%EB%06%FD%9F%91%96%0F%E7%9F%5D%04%E5%0Br%A0%F8%16%1D%E0%8C%0Ep%10%ED%18%E44%B8%A2%9Fk%FF%D4%01%AE%03%12%06%BA%0D%8A%ED%EB%CA%1F%81%AD%1F0%C0%83%DF%5D%C9%5D%FA%DD8%3Bq39'%E1a%F2%EFD~(~a%A4%12G%2Fa%1A%EF%EC%60Y%C3E%A1%E3%5B%F4%A35%40%3F%02W%96!*%18%CA%D8%E28%A4n%8E%D0e%1C%A0%1F1%1B%A1%03%EB%11k%11%2Bq%EE1%3FD%0D%A6%05%CA%83%A2%9F%24h%07%CB%83%9E%972%2Cw%19w%F6%18hs%BE%1C%0A%7B%BE%AE%1A%C0.u%25%B8%B8%B8%B4n%DDz%E4%91%9E%5E%08%B9%B9%A5_!%2F%AF%14b%A3%93%C1%D0%EC(%A8%5D%C1i%AB%B5%3C%0Cu%90%00a%5B%E1%E6%BE%CE%7D%93%F8%5C%FA%84%F7q%E9%1B%88%E2%BDx%5Cx%DC%B8%9C9%8Eb%5E%83%DE%AA8I%BF%96%7B%2Br%40%F6%9D0%DF%18%7B%E1%EF%8A%DF%90%A0%C29%9F%B7%0C%B1t%81Q%E6%BC%AA%DF%12%B4ao%ECt%D8%15%A5%05%BB%A3f%C3%EEh%EC%EF%88%1D%D8%EF%B7%23%B6!%B6%E0%24k%5D%84%16%2C%09%9D%04spd%98%11(%0BS%03F%C2%E4%C0%910%3Fx%02%8A%9F%F0y%EEk%99%83l%03w%BF%86%E3%93%93%93%13%3E%7F%FE%FC%B4%0B%17.%AF06%BE%B9%F9%D6-%D3%BD%26%26%A6%C7._%BEn%F6%EE%9DOQFF%11dg%97%F4%401%84%04E%C1%C1%7B%87%40%F3%86%0A(%D9%8E%03)%9B%E10%C4fH1%86%7B%20%8F3%8F%17%8F3%AFs%2F%97%5E%B6%5C%CE%5C%16%DC.%5C%2F%87%FB%08%3FQ%B2%93%7C(%FBFh%C5%B8%94a%1C9%BB%EFG%C0%BA%E8%09%9C%9B%C5%AB8%C6%85%CBv%5E%CF_%D3%A8%1F6%05%96%FA)%C2R%1FEX%E2%89pC%B8%20%9C%10%8E%08L%8C%8B%EC%C6%C3B%3B%05%06%8B%EC%C6%C1b%7B%84%C3xX%82yc%C5%3B%25%D8%E4%A8%5Det%7F%FF%E1%0Bg%2FM!%CD%5D%8F%DF%07.%5D%AA%A7%95%90%90%9EVPPV%97%9B%5B%DC%80%E2%9Aq%D8k%CD%CC%2Ch%A7%C9Pff%11%D00H%C7%CE%DF%C5%90%91Q%08A%81%91%E8%80%C30%FB%D6%14P%B5W%81%91V%A3%3E%0F%B0%1B%10%8B%E1%EE%88%B0C%BCA%F1%2F%F0%F8%90%C7%85%FB%EEh_%D1%BF%14%AD%87%99%8Cz%3DDw%B4%A5%20G%D6%5C%F8%87%5D%E0p%F2B%8Ea%EA%A2%81%3B%23g%AF%D2v%939%A1uo%AC%95%CEi%8D%8F%0B%CF%CF%84%C5%E7t%60%F9%F9y%A0%7F%7D%05%EC%BA%AB%0F%7B%1El%86%FD%0F%B7%C1%C1'%3B%E1%8F%E7%BB%C1%E8%E5%3E8eu%18nz%5D%80%DB~%97%E0i%C8%5D%88J%8Fj'%8D%A4%954%93v%B2%23%3Aq%E2T%3Dw%F7%B0j%1A%EAHX%97%D0N%142%E7z%02%1D%03!%C1Qp%FC%D1)Xt%7B%16%CC%B0%D3%04%F97%F2m%FD%EC%FB%F9%A0%E0%97%88g%88G%88%BB%08%13%8C%00%E3Q~%A2%97%94%ED%24%2F%8C%B6%10%9C%23%9B%2F%C2%91%B1%13%FE%E9%E7pk%F4%D6r%D6%AE%5C%AB%AD%BFnS%ED%A1%03%C7%E0%A8%D19%B8p%EE%3A%3C%7D%FC%12%5C%9D%7D%C1%D7%3B%14%1B%24%1A%22%C2%12%B1k%A6Bb%7C%26%A4%BE%CF%83%ACL%8C%D6%ACR%06%99%18%C9%D4%9DI%2Bif_%C3q%86)*%AAm27w%FD%E0%E2%12%06%5E%5E%D1%10%18%98%00%11%11)%10%8F%95%24'%E7%40JJ%1E%23%98%1C%D4%85%D4%D4%3C%08%0F%8B%81K%CF%AF%C1%AA%3BK%60%B1%ED%3CP%B4Tl%E6w%E0%B7A%C1%F7%11%B7%117%11%D7%10%970%12%CEH%F9%0A%1ESw%19a(%F3Fh%E9%08%87%C1%BDF%D9%0A%FE%B4%03%CE%9E%3D%CB9u%EA%E4%98%2BW%AE%96%3E%7Fn%05%AF_%DB%C3%5Bk'%08%0E%89%80%D4%B4%3Cl%94%82%EE%C6%E9%E4%97%0F%EF%DF%E7BBB%16DF%A6BPP%22x%7B%C7%80%ABk8%BC%7C%E9%F6%814%B3%13%3E%8E%D4%84%09%93%B6%3E~%ECX%FB%FA%B5%17%BCz%E5%09t%B4%B4%F4%81%B7o%FD%C0%CE.%10%C81%9E%9EQ%E0%EB%1B%CBT%14%1E%FE%1Ebb%D2%20%3A*%01L%DF%3C%84%8D%A6kA%DFv5L%B6%9C%DC%D4%DF%BE%BF9%0A%BE%8E%B8%8C8%878%8D8%8E%F8C%C8%BB%FF%81i%BE%A3%F7(%D8%8A%AD%1B%ED%208H%C6%5E%E8%A7%1D%60ll%CC%B9%7C%F9%F2%18%13%93%DB%A5VVN%60c%EB%06%0E%8E%EE%10%11%19%03Q%D1)%10%16%9E%8C%DC%12%C0%D7%2F%06%3C%BD%22%91s(%D8%DB%072%1A%DE%BC%F1%81%2F%B5%91V%D2%CC%BE%C2%E3%0CSRR%DB%F4%E4%C9%BB%0F%16%16%DE%D0%05*%F8%25%E8%1CU%60a%D1%E9%1C%1B%1B%7F%88%8CH%00Kg%3B%D8%F5%60%3B%ECq%D8%0E%BAot%5B%C4l%C4%9E%A3%D83%88%93%08%23%C4a%C4%01%C4%1E%01w%BE%1DSBFm%99%EC*%BD~%AC%93%C8X%E5B%09%CE8%0F%B1%9Fr%C0%8D%1B78%D7%AE%5D%9Bz%EF%9EY%B5%83%83%078%BE%F3%02wO%3F%08%8D%88%81%B76%3E%60a%89%3C-%BC%BA9~%8B%7F%17H%2Bi%EE%8A%001ee%8D%15%F7%EE%BD%CDC%CF4%3Fz%E4%D0%82%C7V%C4G%2C%F8%E9%E5K%F7%0E%BA%A9%CB%8B%5D%20'DE%25%81w%40%10%18%3E3%02C%BB%03%B0%DAzU%BB%9C%95%9C%05%C7%85c%80%82%0F!%F6!v!%B6%F18sm%EE%E3%CA%BBA!H%7C%F5%FC%10%85%15%AA%9E%923%15%BD%C5%07%AA%F8%A0%13%DC%FF%B9%13n%DD%BA%C511%F9s%CD%D3%A7%E6-%AEn%FE%E0%E2%E6%0B%01%C1a%10%16%19%07%AF-%3D%E1%D5%EBN%107%E2J%9C%89%3Bi%20-%A4%89%D5%D6LZI3i%A7%BA%07%09%08%F4%9F%80!%B1%5DQQ%F5%A2%8A%8A%C6_jjZf%93'k%BF%D4%D2%D2u%BFx%F1%5E%25%89%ED%E9%00%F2rdd2%C4%C5%BF%07%93%B7%A6p%D6%E6%04%ECw%DC%0B3%2Cg%F8a%7F%DF%D3%25%1C%B1%91%C7%99%7B-%9F%0B%AF%9E%80k%EF%15%E2%5E%03%96%E8F%C9%CF%9F%1F6VG%DDWr%C2D%2F%09%3EU%0F)%CED%FF%EF%CF%08%EF%DC%B9%C3%B9z%F5%0A%F7%DD%BBwM%AC%AD%1D%C0%DB7%14%3C%7D%82%20%3A%3E%1EB%22%E2%E0%A5%85%C7%3F8%808%13w%D2%40ZH%13i%23%8D%A4%954%B3%EF%2C%99%B1%90%B2%D1h%04%AD%12h%A9DC%C4%7C%C4%9E%FD%FBO%84QeVV%BE%FF%10V%01%01%B1%90%9BS%08%B6%DEN%60lw%19.z%9C%85uo%D6%E5%898%88P%C8%AFC%AC%C1%96%D7C%F1%CBP%FC%C2%81n%7D%E6%0A%BA%F3%EB%8E%0D%10%9B%B9%3CNIka%B8%82%FA4%3F%E9%11%1A%3E%92%7C%9C%A7%B38%1A%3ER%DFt%80%99%99%19%E7%DE%BD%7BC%9F%3Cy%1A%E3%E9%E9%0FA!%D1%10%14%16%05i%D9%99%E0%ED%1F%81%0EpG%F1%1E%DD%0E%20%AE%C4%99%B8%93%06V%8B%16%ABM%85%D5*%D85%0F%E8%9A%09%F2%B3%1B%0E%06%B1%8F%C0i%A3%82%96%BE%FE%1Esss%F7%CF%D6%D6%FEl%1F%A2%F0%EF%EC%12%94%1CKJ*%202.%01%EE%3A%DD%87%FB~w%C0%D0%F1H%FB%1C%AB94%FC-%E1v%E6Z%DC%DB%85g!%8A%9F%8B%E2g%A3%F8%19%A2%1E%FD%A6%0D%F3%1A8E5d%B8%FA%9A%84IJzQ%CA%B2%3A%81%B2b%D3%7DG%F0kzHs%AB%3BIp8%0F%91%A1%E3%60%8Ep%1B%AE%0C%EF%03'%EEe%22%E7%D1%E3%87%7Bll%EC%DA%220%EFDb%D7%8BOL%81%FC%E2%22pt%09%04%8B7%9E%DD9%808%12W%E2L%DCY%E1%92%AC%A6A%ACF%FE%9E%1B%B2%BE%B7%16%90%D3%D4%D49%81%7D%A7%81%92%DE%DB%B7%BE%8Cp%3A%D2%FF%0E%0EA%18%01%25PT%5C%0E%F6%81.%F0%C2%EF9%DC%0B%BC%0B%BF%5B%FF%9E%A3%60%A7%B0%8D%CB%853%8B%DF%B5%D7%CC%01n%7C3%86%B8%F3OC%F1%93%25%3C%07%A8%0E%F7%1A4q%B4%8F%A0%92z%88%F4%D8%D5%F1%13GlN%D0%10%D3%8BP%1A%B2%C0ol%7F%5D7%D9%3E%3A%8E%B2%BDt%ACeyg%BF%91%E5%E18p%B8%1E%3C%BF7%E6%D5%EB%D7%F1%C1%C1%11%90%98%98%81C%5B%3A%14%16%97Avn%11%D89%F83I%D0%EA-%86%FD%1B%EFnn%C4%99%B8%93%06V%0Bo%8F7%5D%5C%3F%B3%1A%94%14%12%12%5Dw%E5%8AY%1A%0D'%24%98%8E%B6%B6%FE%CC%10%E3%E0%10%08aa%C9%CC%E3%F0%E4%F4%0C%B0%0Dv%00%FBh%5B%B8%ED%7D%1B%9D%B0%DFk%A4%93%F4%BC%3En%DC%EA%83%DD%FB%AA%8Bx%08%A8%0E%F5%1C%A0%82%E2%15Gy%0FQ%18%E3%23%247%D6Wd%B4j%E0%B0a%0B%A2%14%847'j%0C%DC%910%B5%DF%F6%A8)%FC%5BB4%FAl%F2W%E3S%8B%E1%F0%3C%B2%BA%2F%F4%DA%E2%D5koo%BF%8E%94%D4%1C%9C%8F%E4ANN1%F3%18%9E%86%3E%7B%87%00%B0%B3%0F%C0a%D1%8F%11O%1C%AD%AD%FD%808%13%F7%EFl%B9%F9%F9%E7%01%88%05%BBw%1F%F1%B4%B2%F2%01g%E7%10f%5E%40%E2%DF%BD%0B%06'%A7%10ps%0B%C7%A5q9%F3h%3C%2C9%06%DC%E3%3C%C0%25%D9%15L%BD%EE%B6%1B%DA%FEa%A1%E8%2C%3F%BD%BF%07%CFx1%CF%FE%E3%A5%BC%06%8D%1B%E9%3DD%5E%D6GHF%C1Wt%A4%A2%9F%B8%94%8A%BF%84%98Z%80%E4%60%AD%E0%91%FD%16D%8E%E5_%19%A3%D4gM%BCRo%91Z%0E%8F%99%FD%1D!%CB%B7%96%26%9E%5E%3E%1F32%F3%BB%17bd%8Bl%92m'%A7%60%1C%12%83%18'%10%9C%90%23q%25%CE%C4%9D%D5%C0%F7%AF8%A0%EB%89%D0%10qqqe%23%A3%E3%E7--%DF%E5%92W%5D%5D%C3%18%90xg%E7P%E67%91%08%C7%96%A07Be%95%D5%10%92%1A%01aYa%E0%9B%EE%07%CF%FD%5E%7C4v%BC%E2%BC%DAy%D9%5Ca%2F%BE%D1C%BD%F9G%8D%F6%192%12%5B%5Ez%82%9F%98%24%8A%17G%F1%82S%02%87%0F%D0%0C%92%E6%9F%12%22%D1G%22%8A%C3%2B%13%3F%94%C7%DC%EE%99%9C%AD%BD%CDk%3F%FF%80%B6%1C%0C%F5%92%D2j%E6%09TMM%03%D0%DB(%B2I%B6%89%035%0Cqra%F9%D9%D8%F8%01q%26%EE%A4%81%ED%FF%7C%3F%B3%85%86%9E%09%F2%F3%F2%F2%0E%DD%B6m%C7%02''Ok%CC%F4%F5%D4%D2vv%01L%8B%FB%FA%C6%B0%C2%C3%C0%C3%23%02%A7%CE%91%E0%E3%13%8D%D3%CE%1C%E6%E5hAy)Dg%C5CB%01%CE%18s%A3%C0!%CC%B1%E3%89%DB%A3%D4%EBNWOmq%5B%3Di%BC%8F%84%A4%98%3FGtD%00%9F%F0%98%40%81!%B2%C1%7C%FD%85%C3p)%1E%CF%E1%DD%EA%B7%92%EF%99%93%99%94%AD%A3%CD%3E%17W%97%84%88%C8%A8%8E%C2%22z%20%5B%CB%80%C4%93%0D%B2E6%C96q%20.%C4%89%B8%7D%C9%B5%93%BB%A75i!Ml%F2%E3%F9%E1KQ%5D%DD%B9%F2%E6%E6%96%A7%02%02%A2%B3%D0%C3%1D%94Plm%03%98%BEE%5E%26%C3d%88%0C%7B%7B%D3%F48%1A%FCp%FA%19%18%18%87%E1Y%C2%BC%1A%CF%2F%2B%81%C4%BC%14H)N%83%84%C2%F7%18%15%E1%E0%1C%EC%DCf%E5i%99h%EE%FE%CC%EC%81%9B%E9%AE%3B%EE7%E6%FF%E9qY%F5%BE%BB%89%B2%85%9B%B9%B6%AD%8B%F5%06'%B7w%B7%DD%3D%DDc%83CB%5B%D33r%A0%B4%AC%FA%2B%F1T7%D9%20%5Bd%93%B8%10%07%E2B%9C%E8%7F%E2H%5C%893q'%0D%A4%854%91%B6%1Fm%A6b%DE%F9%DF%BD%FB%E4%10z%B6%81*%A0%A4%D2%25%9E%FA%1A%CD%AF%C9XHH%22c%90%E0%EF%1F%8B%84%E2!88%81%09%CB%FC%FC2%E6%15yQe%19%A4%15fAfI%0Ed%20R%0B3!%3E3%09B%E3%C3%C1%2F%C2%BF%C5%3B%C4%BB%C63%C0%A3%CC%3B%C0%BB%2C%208%B0%26%2C%22%BC%25%3E!%092%B3%F3%A0%B8%A4%12%CA%2B%E8%7D%C3%07F%7Cmm%13%D3%F2T7%D9%20%5Bd%93lw%F1%20N%C4%8D8%12%D7.'t%26%ED%00%8A%96%06%D2%C6%3E%EC%E1%FD%DE%9B!%11uuM%3DSS%8B%AC%AElO%99%9E%E9_X1%F59%0A%3BZtDF%A60-%11%14%14%CF%18%0F%0BK%C2%15d2N%8FS%98%2CM%DBc%AA%EAj%20%AF%AC%08rK%0B!%87%01%FD.%86%5C%1C%BFs%8B%8A%20%A7%B0%08%F2%0A%8B%99!%AD%B8%B4%8A%11%5CV%F1%A1%F3%88%A8%AA%AAg%5E%B7%D3%9E%23%AA%93%EA%26%1Bd%8Bl%92m%E2%40%5C%88%13q%23%8E%C4%B53%12%02%19%0D%A4%854%916v%FB%5E%AF%EF%F5%7FJ%16%93%D7%AF%DF%F9%D8%D2%D2%F3cW%B6%A7%84%E7%EE%1E%81%08%EFx%F5%CA%B1%C9%DE%DE%A7-**%15%A2q%DD%1D%1AJ%AB%C3%24%24%F1%1E%FFO%A1%5D%5B%10%17%97%CE%2CO%ABk%EA%A0%A1%B9%09*%D1%11%25%95%15PX%5E%06%05%A5ePXV%0EEe%15P%5CV%09%25%F4%AE%A1%BC%06%05w%82Z%BE%AA%BA%1Eh%CF%01%85%7C%0D%D6%91%91%91%CF%D4Iu%93%0D%B2E6%C96q%20.%C4%89%B8%11G%E2J%9C%89%3Bi%20-%A4%89%9D%09%0E%F9%5E%1E%E8~%3B%2C((%BC%D9%D8%F8A%92%A3%E3%DF%D9%DE%C2%C2%A5%CE%C0%E0d%B8%AC%AC%FC%EB5k6%FAyx%84%B4%24%24d2%C4%3A%C5%93%F04%88%8F%CF%A0%7D%BF%B4%F5%15%D7%E49PP%80%C3Vm%1D%B3%5D%86P%DBP%0F%D5%1Fj%A1%B2%BA%16*%AA%F0%88%A8%AE%A9%C72%8DP%8F%23I%E7V%9B6%DA%08%C9%DCKuP%5DT'%D5M6%C8%16%D9%24%DB%C4%81%B8%10'%E2F%1C%89k%E7%E8%10%0A%A4%81%B4%90%26v%0A%FC%C3%0D%95%BC%EC%1CY%7D%FE%FC%E5%C6o%DEx%D4YYy4%9C%3Cy%25%5CUu%F2%9F%98Ii%0D%BD%B2W%AF%5E%BB%0F%1F%3E%E6%16%14%14%DB%96%92%92%8B%04%B3Y2%19%90%94%94%85Y%3A%9B!%9E%96%96%8B%AD%97%07%D9%D9%05(%A6%04%5B%B7%0A%3E%D4%A13%1A%1B%A1%A9%19%C5%B6%B5Bk%1Bm%ABi%81%C6%A6f%1C%DE%1A%A1%B2%B2%86%11N%F7%D0%BDT%07%D5EuR%DDd%83l%91M%B2M%1C%0C%0C%8E%B9%11'%E2F%1C%89%2Bq%26%EE%A4%81%B4%90%A6%9F%D9L%D9%B5Cd%D8%C0%81%83uv%EE%3Cxs%CE%9C%C5%97%FA%F4%E9%BB%81vy%D2cr%844By%C0%80%81%9B%0C%0DO%BA%06%05%C5%B4P%88%12%88dJJv%B7%F0L%9C%BCdgc%DF%C7%05S%5E%1E%F6%F7%BCb%C6%11%85E%A58%7D.%C5dW%86c%7B9%14c%0E(**c%AEQ%19*K%F7%D0%BDTG%97%23%A8n%B2%D1e%8Fl%13%07%E2B%9CXn%C4Q%938%13w%D2%40Z%D8%B5%7F%9F%9F%99%10q%B3sg%9AA)%B0%AF%C7F%B1%AF%CA%BA%F7%08%D1y%3E%3E%BE%CD%DB%B7%FF%E6%1C%14%14%D5%9A%95U%C8%90%CF%CA*%60H%D31'%A7%88%11SP%80%89%AE%10E%A3p%12K%A2%FF%11e%AC%23J%99%B2%9D%CE(b%EA%F8%B2%CEN%1B%85%406%C96q%609%0Ea%B9%F1%B3%5CG%B1%E7%15X-%02%FF%CA%5Eb%1E%B6%B2%AEOZ%FA~c%97%18e%D3%A9%BA%BAsn%06%05E%D4%A7%A6%E62-VTT%CE%20%3F%BF%04A%C2K%BAE%97%96V%40%19%26%BF%F2%F2J%A8%C0%EE%F0%25%E8%1C%5D%A32%5DQA%F7R%1DTWW%BDd%83l%91M%B2M%1Czl%CC%EEZ%CC%F5%FD%82%7F%9F%7Fg7%F9%3F%DD'8p%E0%C0%A966%0E%EE%14%9E%04j%25j%B1b%5C%1DVTT3%C2%CA%CA*%19t%89%AE%AA%AAfP%5D%5D%F3%15%BA%CE%FF%ED%8CNt%3A%A8%9A%A9%93%EA%26%1B%5D%F6%C86q%F8bl%E7%FA%09%FE%FFO6L%D3%BCz%E8%91%23F%7B%92%92%D2j%BA%C4S%EBt%86%7C%09%13%CA%24%A4%B6%B6%1E3%3A%A1%0E%7F%D7%FE%14%A8%2C%DDC%F7R%1DTWW%97%E8%CA%0Bd%93l%13%07v%A34%1F%E7%17%7D%3D%C2%EC%15%96%94%94%9C%E4%E9%E9%E7%91%9E%9E%D7%9D%E9ss%3B%C5S%08%DB%DB%BF%2B%3B%7D%FAL%9C%BB%BB%7BANNnsuuuGSS%13Nj%9A%A1%11G%81o%81%AEQ%19*K%F7%D0%BDT%07%D5Eu%FE%ED%84%CE%11%82l%7By%F9y%10%17%F6%95%DE%2F%F9%5E%80%D9Kt%FD%FA%CD%FD))Y%F5D%22%2B%8B%96%AA%85L%B2%A3PMNN%AD_%B8p%E1%0B%2Cg%20**b4%7F%FE%FC%BFN%9C8%F1%CE%CC%CC%2C%D6%DF%DF%BF%8A%04v%B6%F2%DF%A0st%8D%CAPY%BA%87%EE%A5%3A%A8.%AA%93%EA%A6%9C%40%B6%C8%26%D9%26%0E%C4%E5%7B%BB%C5%FF%BF%7D%2F%F0%E0%C1%A3s%B1%B1%C9%F5%9D%FD%BEs%04%A0P-**%E905%BD%E7%85%E31%3D%8CPC(%B1%89j%11b%BF%BE%BE%BEcIII%FB%97%5D%82~%D39%BAFe%D8%B2S%D9%7B%D5%A8.%AA%93%EA%26%1Bd%8Bl%92m%E2%40%5C~%F5%F7%02%C2%83%07%0F%D1Z%B7n%C35%2B%2B%BB%D4%D4%D4%ACv%1A%BA(L%83%82B%F2%94%94%94h%D1%A1%C8%0EG%FD%D9%24EO%3C%A7m%DE%BC%D9%04%C5%B6%7C%C3%01-t%8D%CA%B0e%07%B3%F7R%1D%8AT'%D5M6%C8%16%D9%24%DB%C4%81%B8%FC%AA%08%F8r%CAL%24%B5DEE%F7%1D8p%E8m%60%60HaFFV%83%81%C1%1Fw%D9%07%91%A2%DF%FAfh%CB%96-%A7Pl%D37%1C%D0D%D7%D8%89L%D7Wg%5DC.%D5%A5Eu%93%0D%B2E6%C96kK%EAW~3%D4%FD%E0%84%7D%B1%40%93%8D%F9jj%EA%BF%1F9bx%5EBBb.%BB%D3%EC%9B_%8D%AD_%BF%FE%8F%E2%E2%E2%C6%9E%0E%A0st%ED%8B%AF%C6%B8z%7C56%9C%EA%26%1Bd%8B%7D%D4%3D%81%E5%C0%FF%2B%BF%1A%EB%F9%DD%E0%00v%A65%86%85%04%BB%D1%E2%5B%DF%0DJ%AD%5C%B9r%2F%B6v%3D%FEu'%40%FAM%E7%E8%1A%DB%9A%DF%FAn%B0%DF7%EC%0C%F8O%7D7%F8%AD%2FG%F9%D9%D0%FD%D1%97%A3b%98%D1%D7d%E0%18%96%9F%9F%DF%98%9B%9B%CB%80~%D39%BA%C6%B6%E8%8F%BE%1C%15%60m%FD%C7%BF%1C%FDw%BE%1D%1E8h%D0%20EMM%CD-jjj'TTT.%12%E87%9D%A3k%EC%A6%85%FF5%DF%0E%FF%3B3H%CA%EA%F4%A1%23%7DW%A8%C1b%22%7BN%E8W%CE%E8%E8%EF%BF%00G%F5%02%B3%DEhZ%CE%00%00%00%25tEXtdate%3Acreate%002009-09-13T14%3A18%3A22%2B02%3A00%CF%10%DF%BC%00%00%00%25tEXtdate%3Amodify%002009-09-13T14%3A18%3A22%2B02%3A00%BEMg%00%00%00%00%19tEXtSoftware%00www.inkscape.org%9B%EE%3C%1A%00%00%00%00IEND%AEB%60%82";
		images['yStar']			= "data:image/gif,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%020IDAT8%CB%95%92%CDK%94Q%14%C6%9F%7B%DF%F7%BE3%CE%8C%8Dch%A2%84T~4%B4h%11%05a%22m%FA%0FB%82%A4U%DBh%11%04%05%E1%3F%D0%AAEmZ%B4%93%16%B5l%17Q%60%25%B5%A9%20%08u%93c%CD%87%E3%EB%7C%BE%1F%F7%9C%D3BM%07%1C%A9%03%0F%F7%1C%EE%F3%FC%B8p%AE%12%11t%AB%F2%A7%99s%60%19%1D%B8%F0%F6E7%8F%C6!%25%CC%0B%C2%FC%F40OW%40%E9%E3%F4%ACk2c%AE%D7%DB%F7%FB%DD%C5%F9%FF%06%08%F3c%93%3C%02%AF'%07%26%BEWx%7D%DE%FBg%40qqj%DE%24%B39%ED%24%00%00%C6%EB5b%F9%D9A%5EU%FE%3C%93%11%96%AB%C2%7C%05%2Cg%85e%D4%F4dS%89t%3F8%AA%80%83%3A%94%3B%82%B6_D%D8%F4%DBBR%10%E2%AF%C2%FCF%88_%AA%D2%D2%F47%93%EE%3B%E3%24%D2p%B4%07%40C%B1%80%82%22l%B3%00%89-%04%19h3%02%89-(%0Aa%C3%00q%D8B%D8%AAU%94%88%A0%F8~j%C5%CB%F4%9FLf%8F%81%9B%AB%E0p%0Bl-%24%B6%E0%1DIL%10RpR%93%08%1A%9Bh%D7%AB%BE%90%9C%D2%00%20%24%F9%60%B3%BC%D6%DE%F8%05e%8EC%98!%C4%10%A2%ED%D3n%F7N%26%8F%A0%E1%A3%5D%AB6%85%F8%F4%F8%DCrU%03%C0%D0%A5%C5H%88%F3%EDj%A9DQ%0C%E5%0CB%ECN%98%18%C2%04%C0%40%88%D0%AAU%02%B6%94%1F%9F%5B)vla%F8%F2RC%2C%3D%0A%B6%CA%80%CE%ED%BD%C2%12%40%0Ce%06%10%B7%1A%E0%98%5EM%DCX%FD%B9%9Bs%3BvO%3C%A9%B5%81D5%40%A5%A0%139(%CF%05%D5%D7%C1%81%0F%E5%0C%82%82%F8%C4%FEL%07%80%89%C7%B4v%01%9D%806%A3%08k%3E(%AE%C3K%0E%C3q%19%14F%A0%20%1E%EA%0A%10%E2a%A5%1C4%8A%05%B4%FDJ%C4%24%CF%85h%83%C3%B5%9B%5EOo*%99%CE%82%C28%7B%18%E0%E8%C6%EA%F7%A6%10%3F%19%BB%F6%E3%CE%BE%AB%DB_%1E%0E%DC%AA%C5%EB%0F(%B2%FD%9D%7F%5E%E4%AF%96%17%26%AE%EF%9F%0F%D2%D2%FD%E4%EC%87%BB%C6%DB%9D%FF%00%1AFs%FE%0B%0F%22)%00%00%00%00IEND%AEB%60%82";
		images['zoom']			= "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%02FIDAT8%CB%8D%D2KH%D4A%1C%C0%F1%EF%CC%AA-%96%8AK%BEC%3D%D8%03%0D%A1Cm%D2fu%EEP%96%10%89%1B%18)D%97%EA%10B%A7%22%C2K%07%BB%24A%84%0Ae%A4%A6t%B6%A8%A4%F0%A0%12%F4%82J%10%8C%CD%1EZ%EE%8A%BB%FFyu%D9%15m%8D%FC%C10%0F%F8%7Df~3%23%9Cs%00L%DE%0F%07%11%B2%1D%7C!!%7C%01g-V%A99%AD%BCQ%EB%E9%8E%BA%B3%FDc%AC%11%12%60%B2%EFT%AB%90%99C8*%AC%97%E8%F4%16%A35%DEb%ACF'%E2%9D%CER!D%C6%D0%8B%9B%0D%ADk%01b%E2%5EsP%C8%CC!%AB%BD%BB%B2%BE%AB%17%A8%01%CA%00%03L%03oc%8F%C2g%C0%D7%A2%E2%89%A3%87.%3D%5Eu%12%E9%90%ED%D6%98%88%AC%EF%EA%01%0E%02%5B%81%0D%80%1F%A8%02%EA65%F4%DE%B6FG%1C%B4%A7%95%20%90!%A7%D4%20P%0D%E4%25wN5%95%5C%AB%D2q%3D(%10%A1t%40%C8%80%D1%B6%1F(%01t2)%D5%A7%A0%22%ABL%3FB%06%FE%062%ACuXcY%91%E4V%24%A6%C6%DA%18%83%D4%26%FD%15%B4%E7%CDa%5Dc%F2%C2t%B2%A5%80%D4%3C%E2%0C%8D*%A1%E6%D2%00%E3%A9Q%E7%C41%E0%03%F0%7DE%09)h%1E%98%92Y%19%97%AD%A7%A7%D2%81%84%EA%B0%8E%92%85%81%E66%60%0C%F8%04D%81Xr%3C%1E%1B%3A%3DUR%BD%CD%EF%F7%CC%9E%E1%F3%FBO%AE%FA%07%CE9%9E%DD8%D2*%7D%F2%AAV%26b%3D%3Dh%94%E9%B7%D6%81q%8D%D9%81%DC%2B%05%3B%B6%CB%9C%E2JT%3C%C6%D4%D3%E7%FC%FA%F2%AD%F8%F8%AD%97%B3%CB%00%C0%C8%F5%C3A%A0%1D!C%02%02%CE%3A%94%A7%A3%19%BE%CC%BC%CA%FA%7D%E4%14nAH%C9%EF%99%8F%BC~0b%8DM%94%9E%B836%BB%0C%FC%2B%86%2F%1C%08%E7%97%97%F6%94%07%83%F8s%F3I%C4%A2%CC%BE%99%E0%C9%C0%AB%CF%15E%1Bk%FF%0B%00%0C%9E%0B%85%F3J%0B%7B%CAv%ED%C4!%F9%F9%E9%3D_%DFM%CFyK%AAb%5D%00%C0%C3%B6%BDa%B5%A4%7B6W%15%B003%1F%F1%3CU%DB%D4%3D%FEc%DD%00%40_%CB%EE%40%2C%AE%2Ffg%89kM%DD%13q%80%3F)%A9%2B%FB%1D%89H%F5%00%00%00%00IEND%AEB%60%82";

		pays = new Array();
		pays[1]	=1;	pays[2]	=1;	pays[3]	=1;	pays[4]	=1;	pays[5]	=1;	
		pays[6]	=2;	pays[7]	=2;	pays[8]	=1;	pays[9]	=1;	pays[10]=1;	
		pays[11]=1;	pays[12]=2;	pays[13]=1;	pays[14]=4;	pays[15]=1;	
		pays[16]=1;	pays[17]=1;	pays[18]=1;	pays[19]=1;	pays[20]=1;	
		pays[21]=1;	pays[22]=1;	pays[23]=1;	pays[24]=1;	pays[25]=1;	
		pays[26]=1;	pays[27]=1;	pays[28]=1;	pays[29]=1;	pays[30]=3;	
		pays[31]=1;
				
		function init() 																				{			
			if ((!isInteract) && (!isRelationShip))
			{	 
				parenttd = X('/html/body/table[3]/tbody/tr/td[2]');
				if (parenttd) {	
					try
					{
						isVip = "oui";
						n=3;
					}
					catch(ex) 
					{
						isVip = "non"; parenttd = X('/html/body/table[2]/tbody/tr/td[2]');
						n=2;
						GM_log(ex);
					}
				}	
			}

			getStyle();
			
				
			if(1)
			{
				/*		
				if(SHOW_SLIDEPANEL == "true") 
					slidePanel();
				*/

				if (isViewingFame) 		{
												if((SHOW_RENOMOD == "true") || (SHOW_RENOMMEE_POPU == "true"))
												{ 
													showRenomee(); 
												} 
										}
				if (isShowSet) 			{
													inittd = parenttd;
													inittd = inittd.innerHTML;
													showSet(); 
										}
				if (isViewCashLocale) 			{
													inittd = parenttd;
													inittd = inittd.innerHTML;
													viewCashLocale(); 
										}
				if (isViewConditionLocale) 			{
													inittd = parenttd;
													inittd = inittd.innerHTML;
													viewConditionLocale(); 
										}
				if (isMostCriminal) 		{
												if(SHOW_S_MOSTCRIMINAL == "true"){
													viewMostCriminal(); }
										}
				if (isPhoneBook) 			{
													inittd = parenttd;
													inittd = inittd.innerHTML;
													if(SHOW_EXPAND == "true")
													{
													ViewPhoneBook(); 
													}
										}
				if (isLocalesForSales) 			{
													inittd = parenttd;
													inittd = inittd.innerHTML;
													if(SHOW_INFOSONSALE == "true")
													{
													ViewDates(); 
													}
										}
				else if (isOnOwnPage) 		{ 
												inittd = parenttd;
												inittd = inittd.innerHTML;
												showMenu();
												if(SHOW_HBLOG == "true")
												{
												showHideBlog();
												}			
												//showHoroscopes();
											}
				else if (isViewXP) 		{ 
												inittd = parenttd;
												inittd = inittd.innerHTML;
												showXPDetails(); 
											}
				else if (isRepertoire) 		{ 
												inittd = parenttd;
												inittd = inittd.innerHTML;
												//Repertoire(); 
											}
				else if (isArtistSong) 		{ 
												if(SUP_DEF == "true") 
												{
												inittd = parenttd;
												inittd = inittd.innerHTML;
												ArtistSong(); 
												}
											}
				else if (isCityPage) 		{ 
												//if(SHOW_YOUTHHOSTEL == "true") 	showYouthHostel(); 
												if(SHOW_HEIGHT == "true")		increaseHeight();
												if(HIDE_IMGONCITY == "true")				hideImgOnCityPage();
											}
				else if (isViewingSkills) 	{ 
												if(SHOW_SKILLSINFOS == "true") 
												{ 
													countStarsAndSuch();
												}
											}
				else if (isViewingCharSkills) 	{ 
												if(SHOW_SKILLSINFOS == "true") 
												{ 
													countTenStars();
												}
											}
				else if ((isAnswerMessage) || (isSendMessage)) 	
											{ 
												if(SET_AREA == "true")
												{
													setArea();
												}
											}
				else if ((isViewSales) || (isViewPurchases)) 	
											{ 
												if(SHOW_SALESPURCHASES == "true") 
												{ 
													viewSalesPurchases();
												}
											}
				else if (isRelationPage) 	{ 
												if(SHOW_RELATIONPAGE == "true") 
												{ 
													showRelationPage();
												}
											}
				else if (isEmployements) 	{ 
												if(SHOW_EMPLOYEMENTS == "true") 
												{ 
													showEmployements();
												}
											}
				else if (isBlocNote)	{ 
												if((SHOW_CHARRESTANT == "true") && (isBlocNote))
												{
													inittd = parenttd;
													inittd = inittd.innerHTML;
													compteChar("BlocNote");	
													if (window.addEventListener) 
													{
														window.addEventListener ("keypress",
															function()
															{
																compteChar("BlocNote");	
															},
															false
														   );
													}
												}
											}
				if (isOnCharPage) 	{ 
												if(SHOW_LIST == "true")
												{
												inittd = parenttd;
												inittd = inittd.innerHTML;
												showList(); 
												}
												if(SHOW_HBLOG == "true")
												{
												showHideBlog();
												}	 
											
											//showHoroscopes();
											} 
			}
		}
		function xpathNode(xpath) 															{
			return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		}
		function xpathNodes(xpath) 															{
			return document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		}
		function X(xpath) 																			{
			var elem = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (elem && elem.snapshotLength >= 1) {
				return elem.snapshotItem(0);
			}
			else return null;
		}
		function X2(xpath) 																			{
			return document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		}
		function elem(name, attrs, style, text) 								{
			var e = document.createElement(name);
			if (attrs) {
				for (var key in attrs) {
					if (key == 'class') { e.className = attrs[key]; }
					else if (key == 'id') { e.id = attrs[key]; }
					else { e.setAttribute(key, attrs[key]); }
				}
			}
			if (style) {
				for (var key in style) {
					e.style[key] = style[key];
				}
			}
			if (text) {
				e.appendChild(document.createTextNode(text));
			}
			return e;
		}
		function get(url, cb) 																	{
		  GM_xmlhttpRequest({
			method: "GET",
			 url: url,
			 onload: function(xhr) { cb(xhr.responseText); }
		  });
		}
		function post(url, data, cb) 														{
		  GM_xmlhttpRequest({
			method: "POST",
			url: url,
			headers:{'Content-type':'application/x-www-form-urlencoded'},
			data:encodeURI(data),
			onload: function(xhr) { cb(xhr.responseText); }
		  });
		}
		function removeElement(ElementXpath)										{
				var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
				for (i=0; i<alltags.snapshotLength; i++)
				{
					element = alltags.snapshotItem(i);
					element.parentNode.removeChild(element); 
				}
			}  
		function addStyle() 																		{
			newStyle  = "@namespace url(http://www.w3.org/1999/xhtml);";
			newStyle += "body { font-family: Calibri; font-size: 12px; }";
			GM_addStyle(newStyle);
		}
		function getStyle() 																		{
			header = X('/html[1]/body[1]/table[2]/tbody[1]/tr[1]/td[2]/table[1]/tbody[1]/tr[1]/td[1]/img[1]');
			style = header.src;
			style = style.replace("http://www120.popmundo.com/Common/graphics/", "");
			style = style.replace("http://www121.popmundo.com/Common/graphics/", "");
			style = style.replace("http://www122.popmundo.com/Common/graphics/", "");
			style = style.replace("http://www123.popmundo.com/Common/graphics/", "");
			style = style.replace("http://www124.popmundo.com/Common/graphics/", "");
			style = style.replace("http://www125.popmundo.com/Common/graphics/", "");
			style = style.replace("http://www126.popmundo.com/Common/graphics/", "");
			style = style.replace("/menu/GameHeader.jpg", "")
		}
		function addTableSorter(t_id) 													{
			$("#"+t_id+"").tablesorter();
				
			newStyle  = "@namespace url(http://www.w3.org/1999/xhtml);";
			newStyle += "th { background-color: #33647D; color: white; text-align: center; }";
			newStyle += "th.headerSortUp { background-image: url(http://www.popmundo.fr/klyne/scripts/asc.gif); background-color: #6D7F8C; }";
			newStyle += "th.headerSortDown {  background-image: url(http://www.popmundo.fr/klyne/scripts/desc.gif); background-color: #6D7F8C; color: white; }";
			newStyle += "th.header { cursor: pointer; font-weight: bold;     background-repeat: no-repeat;     background-position: center left;     padding-left: 20px;     border-right: 1px solid #dad9c7;     margin-left: -1px; } ";
			newStyle += "table.tablesorter {background-color:#FFF;font-family:arial;font-size:8pt;margin:10px 0 15px;text-align:left;width:100%;}";
			GM_addStyle(newStyle);
		}
		function addTableFilter(t_id)														{
			$("#"+t_id+"").columnFilters();
		}
		function getGradient(l)																	{
			return "rgb("+ (51-(l*2)) +","+ (102-(l*4)) +","+ (255-(l*6)) +")";
		}
		function slidePanel() 																	{
			function inform(text) 
			{
				document.getElementById('shortcutsSpan').innerHTML=text;
			}
				
			slidePanel = document.createElement('div');
			slidePanel.setAttribute('id', 'slidePanel');
			slidePanel.setAttribute('style', 'position: fixed; top: 10; left: -5; z-index: 9999; background: #FFF; width: 3%; padding: 5px; -moz-border-radius : 5px 5px;');
			togglePanel = document.createElement('div');
			togglePanel.setAttribute('id', 'togglePanel');
			togglePanel.setAttribute('style', 'padding: 5px;');

			span = document.createElement('span');
			span.setAttribute('id', 'shortcutsSpan');
			span.setAttribute('text-align','justify');

			//get("http://www.popmundo.fr/klyne/scripts/shortcuts.php?charid="+protagonist, inform);
					
			div = document.createElement('div');
			div.setAttribute('style', 'text-align: right;');
			div.innerHTML += '<br /><a target="_blank" href="http://www.popmundo.fr/klyne/scripts/shortcuts.php?mode=add&charid='+protagonist+'" style="color: #33647D; font-weight: bold; cursor: pointer;"><small>Ajouter un raccourci</small></a> <br/>';
			togglePanel.appendChild(span);
			togglePanel.appendChild(div);

			urlPanel = document.createElement('div');
			urlPanel.setAttribute('id', 'urlPanel');
			urlPanel.setAttribute('style', 'text-align: right;');
				
				
			span = document.createElement('span');
			span.setAttribute('id','open');
			span.setAttribute('style','cursor: pointer;');
			span.innerHTML = '<img src="'+images['open']+'" />';
			urlPanel.appendChild(span);
			
			span = document.createElement('span');
			span.setAttribute('id','close');
			span.setAttribute('style','cursor: pointer;');
			span.innerHTML = '<img src="'+images['close']+'" />';
			
			urlPanel.appendChild(span);

			slidePanel.appendChild(togglePanel);
			slidePanel.appendChild(urlPanel);
			document.body.appendChild(slidePanel);

			
			if(SLIDEPANEL_ETAT == "false")
			{
				$("div#slidePanel #togglePanel").hide();
				$("div#slidePanel #close").hide();
			}
			else
			{
				$("div#slidePanel").css('width', '15%');
				$("div#slidePanel #open").hide();
			}
			$("div#slidePanel #open").click	(function() { GM_setValue("SLIDEPANEL_ETAT", "true");	$("div#slidePanel").css('width', '200px'); $("div#urlPanel").css('-moz-opacity', '1.0'); $("div#slidePanel #togglePanel").slideDown('slow'); 	$("div#slidePanel #open").hide(); $("div#slidePanel #close").show(); });
			$("div#slidePanel #close").click	(function() { GM_setValue("SLIDEPANEL_ETAT", "false");	$("div#slidePanel #togglePanel").hide();$("div#slidePanel #middlePanel").hide();$("div#slidePanel #close").hide(); $("div#slidePanel").css('width', '25px'); $("div#slidePanel #open").css('-moz-opacity', '.50').show(); });
			$("#triList").change
			( 
				function() 
				{ 
					isChecked = 0;
					$("#triList[@checked]").each(function(){	isChecked = 1;	});
					if(isChecked)
						GM_setValue("SLIDEPANEL_TRILIST", "true");
					else
						GM_setValue("SLIDEPANEL_TRILIST", "false");
				} 
			);
		}
		function convert_pays(p) 																{
			if (p == 'unknow') { p=p; }
			else if ((p == "Angleterre") || (p == "England")) 						{p=1;}
			else if ((p == "Argentine") || (p == "Argentina")) 						{p=2;}
			else if ((p == "Australie") || (p == "Australia")) 						{p=3;}
			else if ((p == "Belgique") || (p == "Belgium")) 							{p=4;}
			else if ((p == "Bosnie-Herzégovine") || (p == "Bosnia i Hercegovina")) 	{p=5;}
			else if ((p == "Brésil") || (p == "Brazil")  || (p == "Brasil")) 								{p=6;}
			else if ((p == "Canada") || (p == "Canada"))								{p=7;}
			else if ((p == "Chine") || (p == "China")) 								{p=8;}
			else if ((p == "Croatie") || (p == "Croatia")) 							{p=9;}
			else if ((p == "Danemark") || (p == "Denmark") || (p == "Danmark")) 							{p=10;}
			else if ((p == "Écosse") || (p == "Scotland")) 							{p=11;}
			else if ((p == "Espagne") || (p == "Spain")) 								{p=12;}
			else if ((p == "Estonie") || (p == "Estonia") || (p == "Eesti")) 							{p=13;}
			else if ((p == "États-Unis") || (p == "United States")) 					{p=14;}
			else if ((p == "Finlande") || (p == "Finland")) 							{p=15;}
			else if ((p == "France") || (p == "France")) 								{p=16;}
			else if ((p == "Hongrie") || (p == "Hungary")) 							{p=17;}
			else if ((p == "Italie") || (p == "Italy") || (p == "Italia")) 								{p=18;}
			else if ((p == "Lituanie") || (p == "Lithuania")) 						{p=19;}
			else if ((p == "Mexique") || (p == "Mexico") || (p == "México")) 							{p=20;}
			else if ((p == "Norvège") || (p == "Norway") || (p == "Norge")) 							{p=21;}
			else if ((p == "Pays-Bas") || (p == "Netherlands")) 						{p=22;}
			else if ((p == "Pologne") || (p == "Polska")) 							{p=23;}
			else if ((p == "Portugal") || (p == "Portugal")) 							{p=24;}
			else if ((p == "Roumanie") || (p == "România")) 							{p=25;}
			else if ((p == "Russie") || (p == "Russia")) 								{p=26;}
			else if ((p == "Serbie") || (p == "Serbia")) 								{p=27;}
			else if ((p == "Singapour") || (p == "Singapore")) 						{p=28;}
			else if ((p == "Suède") || (p == "Sweden")) 								{p=29;}
			else if ((p == "Turquie") || (p == "Turkey") || (p == "Türkiye")) 							{p=30;}
			else if ((p == "Allemagne") || (p == "Germany")) 								{p=31;}
			
			return p;
		}
		function convert_renomee_t(reno) 												{
			if 		((reno == 'vraiment abominable') || (reno == 'truly abysmal')) 
					{ c_renomee=0;  }
			else if ((reno == 'abominable') || (reno == 'abysmal'))  
					{ c_renomee=1;  }
			else if ((reno == 'épouvantable') || (reno == 'bottom dwelling')) 
					{ c_renomee=2;  }
			else if ((reno == 'horrible') || (reno == 'horrendous')) 
					{ c_renomee=3;  }
			else if ((reno == 'affreux') || (reno == 'dreadful'))  
					{ c_renomee=4; }
			else if ((reno == 'insignifiant') || (reno == 'terrible'))  
					{ c_renomee=5; }
			else if ((reno == 'banal') || (reno == 'poor'))  
					{ c_renomee=6; }
			else if ((reno == 'en-dessous de la moyenne') || (reno == 'below average'))  
					{ c_renomee=7; }
			else if ((reno == 'moyen') || (reno == 'mediocre'))  
					{ c_renomee=8; }
			else if ((reno == 'au-dessus de la moyenne') || (reno == 'above average'))  
					{ c_renomee=9; }
			else if ((reno == 'correct') || (reno == 'decent'))  
					{ c_renomee=10; }
			else if ((reno == 'honnête') || (reno == 'nice'))  
					{ c_renomee=11; }
			else if ((reno == 'plaisant') || (reno == 'pleasant'))  
					{ c_renomee=12; }
			else if ((reno == 'très bon') || (reno == 'good'))  
					{ c_renomee=13; }
			else if ((reno == 'formidable') || (reno == 'sweet')) 
					{ c_renomee=14; }
			else if ((reno == 'splendide') || (reno == 'splendid')) 
					{ c_renomee=15; }
			else if ((reno == 'impressionnant') || (reno == 'awesome'))  
					{ c_renomee=16; }
			else if ((reno == 'superbe') || (reno == 'great'))  
					{ c_renomee=17; }
			else if ((reno == 'fantastique') || (reno == 'terrific'))  
					{ c_renomee=18; }
			else if ((reno == 'merveilleux') || (reno == 'wonderful'))  
					{ c_renomee=19; }
			else if ((reno == 'incroyable') || (reno == 'incredible'))  
					{ c_renomee=20; }
			else if ((reno == 'parfait') || (reno == 'perfect'))  
					{ c_renomee=21; }
			else if ((reno == 'révolutionnaire') || (reno == 'revolutionary'))  
					{ c_renomee=22; }
			else if ((reno == 'étourdissant') || (reno == 'mind melting')) 
					{ c_renomee=23; }
			else if ((reno == 'miraculeux') || (reno == 'earth shaking')) 
					{ c_renomee=24; }
			else if ((reno == 'DÉMENTIEL') || (reno == 'GOD SMACKING')) 
					{ c_renomee=25; }
			else if ((reno == 'ABSOLUMENT DÉMENTIEL') || (reno == 'GOD SMACKINGLY GLORIOUS')) 
					{ c_renomee=26; }
			else 	
					{ c_renomee=0; }	
			return c_renomee;
		}
		function convert_renomee_a(reno) 												{
			if  	(reno.indexOf("vraiment abominable") >= 0)		{	reno = 'truly abysmal'; 	}
			else if (reno.indexOf("abominable") >= 0)				{	reno = 'abysmal';			}
			else if (reno.indexOf("épouvantable") >= 0) 			{ 	reno = 'bottom dwelling'; 	} 
			else if (reno.indexOf("horrible") >= 0) 				{ 	reno = 'horrendous'; 		} 
			else if (reno.indexOf("affreux") >= 0) 					{ 	reno = 'dreadful'; 			} 
			else if (reno.indexOf("insignifiant") >= 0) 			{ 	reno = 'terrible'; 			} 
			else if (reno.indexOf("banal") >= 0) 					{ 	reno = 'poor'; 				} 
			else if (reno.indexOf("en-dessous de la moyenne") >= 0) { 	reno = 'below average'; 	} 
			else if ((reno.indexOf("moyen") >= 0)
					&& (reno.indexOf("au-dessus de la moyenne") < 0))
																	{ 	reno = 'mediocre'; 			} 
			else if (reno.indexOf("au-dessus de la moyenne") >= 0) 	{ 	reno = 'above average'; 	}	 
			else if (reno.indexOf("correct") >= 0) 					{ 	reno = 'decent'; 			} 
			else if (reno.indexOf("honnête") >= 0) 					{ 	reno = 'nice'; 				} 
			else if (reno.indexOf("plaisant") >= 0) 				{ 	reno = 'pleasant'; 			} 
			else if (reno.indexOf("très bon") >= 0) 				{ 	reno = 'good'; 				} 
			else if (reno.indexOf("formidable") >= 0) 				{ 	reno = 'sweet'; 			} 
			else if (reno.indexOf("splendide") >= 0) 				{ 	reno = 'splendid'; 			} 
			else if (reno.indexOf("impressionnant") >= 0) 			{ 	reno = 'awesome'; 			}	 
			else if (reno.indexOf("superbe") >= 0) 					{ 	reno = 'great'; 			} 
			else if (reno.indexOf("fantastique") >= 0) 				{ 	reno = 'terrific'; 			} 
			else if (reno.indexOf("merveilleux") >= 0) 				{ 	reno = 'wonderful'; 				} 
			else if (reno.indexOf("incroyable") >= 0) 				{ 	reno = 'incredible'; 				}	 
			else if (reno.indexOf("parfait") >= 0) 					{ 	reno = 'perfect'; 					} 
			else if (reno.indexOf("révolutionnaire") >= 0) 			{ 	reno = 'revolutionary'; 			} 
			else if (reno.indexOf("étourdissant") >= 0) 			{ 	reno = 'mind melting'; 				} 
			else if (reno.indexOf("miraculeux") >= 0) 				{ 	reno = 'earth shaking'; 			}	 
			else if ((reno.indexOf("DÉMENTIEL") >= 0) 				
					&& (reno.indexOf("ABSOLUMENT DÉMENTIEL") < 0))
																	{ 	reno = 'GOD SMACKING'; 				} 
			else if (reno.indexOf("ABSOLUMENT DÉMENTIEL") >= 0) 	{ 	reno = 'GOD SMACKINGLY GLORIOUS'; 	}

			return reno;
		}
		function convert_renomee(r,p) 													{
			renomee = r * pays[p];
			return renomee;
		}
		function create_menu(parent) 														{
			table = document.createElement('table');
			table.setAttribute('width','229');
			table.setAttribute('cellpadding','0');
			table.setAttribute('cellspacing','0');
			tr = document.createElement('tr');
			td = document.createElement('td');
			td.setAttribute('width','32');
			td.setAttribute('height','34');
			menuimage = 'graphics/'+style+'/Icons/icon_artist.gif';
			img = document.createElement('img');
			img.setAttribute('src', menuimage);
			td.appendChild(img);
			tr.appendChild(td);
			td = document.createElement('td');
			td.setAttribute('width','197');
			td.setAttribute('height','34');
			td.setAttribute('valign','top');
			td.innerHTML = '<div class="DarkColumnHeader">'+ SCRIPT_TITLE +' <small><font color="#AEC8CF">v'+ SCRIPT_VERSION +  '</font></small>';
			if(isOnOwnPage) { td.innerHTML ='<div class="DarkColumnHeader">'+ SCRIPT_TITLE +' <small><font color="#AEC8CF">v'+ SCRIPT_VERSION +  '</font></small><small style="padding-left: 30px;"  id="ScriptExpandMenu">[Options]</small></div>'; }
			tr.appendChild(td);
			table.appendChild(tr);
			parent.appendChild(table);
			parent.innerHTML += '<table width="229" border="0" cellspacing="0" cellpadding="0" class="menu">';
			
		}
		function addOption(menuType,menuFor,menuForTitle,param) {
			tr = document.createElement('tr');
			tr.setAttribute("rel", menuType);
			td = document.createElement('td');
			cb = document.createElement('input');
			if(menuType != 'MenuLang')
				cb.setAttribute('type', 'checkbox');
			else
				cb.setAttribute('type', 'radio');

			if(menuType != 'MenuLang')
			{
				if (menuFor == "true") { cb.setAttribute("checked", "checked"); }
			}
			else
			{
				if (menuFor == param) { cb.setAttribute("checked", "checked"); }
			}
			if (window.addEventListener) 
			{
				cb.addEventListener ("change",
					function()
					{
						if(menuType != 'MenuLang')
						{
							if (menuFor == "true") { GM_setValue('"'+menuFor+'"', "false"); menuFor == "false"; }
							else { GM_setValue('"'+menuFor+'"', "true"); menuFor == "true"; }
						}
						else
						{
						alert(menuFor);
							GM_setValue('"'+menuFor+'"', param); menuFor = param;
							document.location = document.location;
						}
					},
					false
				   );
			} 
			td.appendChild(cb);
			tr.appendChild(td);
			td = document.createElement('td');
			td.setAttribute('colspan', '2');
			td.innerHTML = menuForTitle;
			tr.appendChild(td);
			return tr;
		}
		function addOptionSelect(value,name) 										{
			if(THEME != value)
				return '<option value="'+value+'">'+name+'</option>';
			else	
				return '<option value="'+value+'" selected="selected">'+name+'</option>';
		}
		function showMenu() 																		{			
			if (parenttd) {	
				try
				{					
					create_menu(parenttd);
		  
					tableM = document.createElement('table');
					tableM.setAttribute('id','TableMenu');
					tableM.setAttribute('class','popup');
					tableM.setAttribute("width", "600");
					tableM.setAttribute("align", "center");
					tableM.setAttribute("cellspacing", "0");
					tableM.setAttribute("cellpadding", "0");
					tableM.setAttribute("border", "0");
									
					tr = document.createElement('tr');
					td = document.createElement('td');
					td.setAttribute("colspan", "3");
					td.setAttribute("width", "100%");
					td.innerHTML   = '<ul class="nav-bar"><li class="left" id="MenuPerso"><a>Personnage</a></li><li id="MenuShow" class="left active"><a>Carrière</a></li><li id="MenuMisc" class="left"><a>Divers</a></li><li id="MenuOptions" class="left"><a>Options</a></li><li class="left">&nbsp;</li><li id="MenuAPropos" class="left"><a>A propos</a></li><li class="right"><a class="close-link"><img src="http://www.popmundo.fr/klyne/scripts/jquery/images/close.png" /></a></li></ul>';
					tr.appendChild(td);
					tableM.appendChild(tr)
					
					trM = document.createElement('tr');
					tdM = document.createElement('td');
					tdM.setAttribute("rowspan", "100");
					tdM.setAttribute("valign", "top");
					
					table = document.createElement('table');
					tr = addOption('MenuMisc',SHOW_CHARRESTANT,'Afficher le nombre de caractères restants (Bloc-Note)'); 		table.appendChild(tr);
					tr = addOption('MenuMisc',SHOW_YOUTHHOSTEL,'Montrer les auberges (Ville)'); 		table.appendChild(tr);
					tr = addOption('MenuMisc',SHOW_LIST,'Montrer les listes'); 						table.appendChild(tr);
					tr = addOption('MenuMisc',SET_AREA,'Agrandir la boite de message.'); 						table.appendChild(tr);
					tr = addOption('MenuMisc',SHOW_SALESPURCHASES,'Voir les ventes/achats par date.'); 	table.appendChild(tr);
					tr = addOption('MenuMisc',SHOW_HBLOG,'Cacher automatiquement les blogs'); 					table.appendChild(tr);
					tr = addOption('MenuMisc',SHOW_HEIGHT,'Agrandir la hauteur (page Ville)'); 					table.appendChild(tr);
					tr = addOption('MenuMisc',SHOW_EXPAND,'Etendre le repertoire telephonique'); 					table.appendChild(tr);
					tr = addOption('MenuMisc',SHOW_INFOSONSALE,'Voir la date de fin d\'enchère'); 		table.appendChild(tr);
					tr = addOption('MenuMisc',HIDE_IMGONCITY,'Cacher l\'image sur la page de la ville'); 			table.appendChild(tr);
					tr = addOption('MenuMisc',SHOW_SLIDEPANEL,'Voir les raccourcis'); 			table.appendChild(tr);

					tr = addOption('MenuPerso',SHOW_SKILLSINFOS,'Montrer informations sur vos compétences'); 		table.appendChild(tr);
					tr = addOption('MenuPerso',SHOW_RELATIONPAGE,'Voir les villes (Relations)'); 		table.appendChild(tr);

					tr = addOption('MenuShow',SHOW_RENOMOD,'Afficher la page de renommée modifiée.'); 				table.appendChild(tr);
					tr = addOption('MenuShow',SUP_DEF,'Modifier le lien pour supprimer directement une chanson du répértoire.'); 							table.appendChild(tr);
					tr = addOption('MenuShow',SHOW_RENOMMEE_POPU,'Montrer les informations sur les ventes de disques'); 	table.appendChild(tr);
								
					tr = document.createElement('tr');
					tr.setAttribute("rel", "MenuOptions");
					td = document.createElement('td');
					td.innerHTML   = '<label>Thème: </label>';
					tr.appendChild(td);
					td = document.createElement('td');
					OptionSelect  = '<option value="0">Par d&eacute;faut</option>';
					OptionSelect += addOptionSelect(1,'America');
					OptionSelect += addOptionSelect(2,'Blood');
					OptionSelect += addOptionSelect(3,'DarkBlue');
					OptionSelect += addOptionSelect(5,'Green');
					OptionSelect += addOptionSelect(7,'PimpHeaven');
					OptionSelect += addOptionSelect(8,'Red');
					OptionSelect += addOptionSelect(9,'Saw');
					OptionSelect += addOptionSelect(10,'Vista');
					OptionSelect += addOptionSelect(11,'Elegant');
					td.innerHTML   = '<select id="ThemeSelect">'+OptionSelect+'</select>';
					tr.appendChild(td);
					td = document.createElement('td');
					button = document.createElement('button');
					button.setAttribute('id','ChooseThemeOk');
					button.setAttribute('class','button');
					button.innerHTML   += 'Choisir ce thème';
					if (window.addEventListener) 
					{
						button.addEventListener ("click",
							function()
							{
								vId = $('select[id="ThemeSelect"] option:selected').attr('value');
								setTheme(vId,1);
							},
							false
						   );
					} 
					td.appendChild(button);
					tr.appendChild(td);
					table.appendChild(tr);
					
					tr = document.createElement('tr');
					tr.setAttribute("rel", "MenuAPropos");
					tableBis = document.createElement("table");
					tableBis.setAttribute('align', 'center');
					tableBis.setAttribute('width', '600');
					trBis		 = document.createElement('tr');					
					td = document.createElement('td');
					td.setAttribute('align', 'right');
					td.setAttribute('width', '100px');
					td.innerHTML   = '<img src="'+images['author']+'" />';
					trBis.appendChild(td);
					td = document.createElement('td');
					td.setAttribute('align', 'left');
					td.setAttribute('width', '200px');
					td.innerHTML   = 'Script réalisé par <a href="http://www'+ServerId+'.popmundo.com/Common/CharacterDetails.asp?action=view&CharacterID=223855">Tom Capelhorn</a><br />Dernière version';
					trBis.appendChild(td);
					tableBis.appendChild(trBis);
					tr.appendChild(tableBis);
					table.appendChild(tr);
					
						tdM.appendChild(table);
						trM.appendChild(tdM);
						tableM.appendChild(trM);
					
						document.body.appendChild(tableM);
						
						$('table[id="TableMenu"]').hide();
						$('tr[rel^="Menu"]').hide();
							
						$('li[id^="Menu"]').css('cursor', 'pointer').click(function() {
							$('tr[rel^="Menu"]').hide();
							vId = $(this).attr('id');
							$('tr[rel="'+vId+'"]').show();
							$('li[class="left active"]').removeAttr('class').addClass('left');
							$(this).addClass('left active');
						});
						
						$('small[id="ScriptExpandMenu"]').css('cursor', 'pointer').click
						(
							function() 
							{		
								wBody = $('body').width();
								hBody = $('body').height();
								wTMenu = $('table[id="TableMenu"]').width();
								hTMenu = $('table[id="TableMenu"]').height();
								
								
								$('table[class="Paper"]').css('opacity','0');
								$('table[id="TableMenu"]').css('position','fixed').css('left',(wBody/2)-(wTMenu/2)).css('top','50').css('zIndex','9999');
								$('table[id="TableMenu"]').show();
								$('tr[rel^="Menu"]').hide();
								$('tr[rel="MenuPerso"]').show();;
								$('li[class="left active"]').removeAttr('class').addClass('left');
								$('li[id="MenuPerso"]').addClass('left active');
								$('table[id="TableMenu"] a[class="close-link"]').css('cursor', 'pointer').click
								(
									function() 
									{
										$('table[id="TableMenu"]').hide();
										$('table[class="Paper"]').css('opacity','1');
									}
								);
							}
						);						
				}
				catch(ex) 
				{
					GM_log(ex);
				}
			
			}
		}
		function IsNumeric(strString)														{
		   var strValidChars = "0123456789.-";
		   var strChar;
		   var blnResult = true;

		   if (strString.length == 0) return false;

		   for (i = 0; i < strString.length && blnResult == true; i++)
			  {
			  strChar = strString.charAt(i);
			  if (strValidChars.indexOf(strChar) == -1)
				 {
				 blnResult = false;
				 }
			  }
		   return blnResult;
		}
		function setArea() 																			{
			area = X('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/DIV[2]/FORM[1]/TEXTAREA[1]');
			area.setAttribute('cols', '55');
			area.setAttribute('rows', '15');
		}
		function viewMostCriminal()															{
			table = X('/html/body/table[3]/tbody/tr/td/table[2]');
			table.setAttribute('id', 'mostCriminal');
			table.setAttribute('class', 'tablesorter');
			table.innerHTML="<thead><tr><th>#</th><th>Nom</th><th>Localisation</th><th>Nombre</th></tr></thead>"+table.innerHTML;
			
			elems = X2('/html/body/table[3]/tbody/tr/td/table[2]/tbody/tr');
			if (elems && elems.snapshotLength) 
				for (var i = 1; i < elems.snapshotLength; i++) 
				{
					elems2 = X('/html/body/table[3]/tbody/tr/td/table[2]/tbody/tr['+i+']/td[1]');
					if(elems2) 
					{ 
						n = elems2.innerHTML.replace('&nbsp;', '');
						n = parseInt(n);
						if(n < 10)	n = '<span class="invisible">00'+n+'</span>'+n;
						else if(n < 100)	n = '<span class="invisible">0'+n+'</span>'+n;
						else n = '<span class="invisible">'+n+'</span>'+n;
						elems2.innerHTML = '&nbsp;'+n;
					}
					elems2 = X('/html/body/table[3]/tbody/tr/td/table[2]/tbody/tr['+i+']/td[4]');
					if(elems2) 
					{ 
						
							n = elems2.innerHTML.replace(' crimes &nbsp;', '');
							n = parseInt(n);
							if(n < 10) {	n = '<span class="invisible">000'+n+'</span>'+n; }
							else if(n < 100) {	n = '<span class="invisible">00'+n+'</span>'+n; }
							else if(n < 1000) {	n = '<span class="invisible">0'+n+'</span>'+n; }
							else { n = '<span class="invisible">'+n+'</span>'+n; }
							elems2.innerHTML = n + ' crimes &nbsp;';
					}
					
				}
			
			newStyle  = "@namespace url(http://www.w3.org/1999/xhtml);";
			newStyle += "#mostCriminal a:visited { color: purple; !important; }";
			GM_addStyle(newStyle);
			
			//addTableSorter("mostCriminal");
			$("#mostCriminal").columnFilters
			({
				excludeColumns:[0,1,3],
				wildCard: '*'
			});
		}
		function ViewPhoneBook()																{
			elems = X2('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/DIV[2]/FORM[1]/TABLE[1]/TBODY[1]/TR');
			if (elems && elems.snapshotLength) 
				for (var i = 1; i < elems.snapshotLength; i++) 
				{
					elems2 = X('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/DIV[2]/FORM[1]/TABLE[1]/TBODY[1]/TR['+i+']/TD[1]/A[1]');
					if(elems2) 
					{ 
						i++;
						elems3 = X('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/DIV[2]/FORM[1]/TABLE[1]/TBODY[1]/TR['+i+']/TD[1]/DIV[1]');
					
						elems3.setAttribute("style","display: inline; visibility: visible;"); 
					}
					
				}
		}
		function ViewDates()																		{
			elems = X2('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/TABLE[2]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR');
			if (elems && elems.snapshotLength) 
				for (var i = 2; i < elems.snapshotLength+1; i++) 
				{
					elems2 = X('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/TABLE[2]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR['+i+']/TD[4]/A[1]');
					if(elems2) 
					{ 	
						elems3 = X('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/TABLE[2]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR['+i+']');
						elems2.innerHTML = elems3.title.replace("L'enchère se termine le : ", "");
					}
					
				}
		}
		function format(valeur,decimal,separateur)							{
			var deci=Math.round( Math.pow(10,decimal)*(Math.abs(valeur)-Math.floor(Math.abs(valeur)))) ; 
			var val=Math.floor(Math.abs(valeur));
			if ((decimal==0)||(deci==Math.pow(10,decimal))) {val=Math.floor(Math.abs(valeur)); deci=0;}
			var val_format=val+"";
			var nb=val_format.length;
			for (var i=1;i<4;i++) {
				if (val>=Math.pow(10,(3*i))) {
					val_format=val_format.substring(0,nb-(3*i))+separateur+val_format.substring(nb-(3*i));
				}
			}
			if (decimal>0) {
				var decim=""; 
				for (var j=0;j<(decimal-deci.toString().length);j++) {decim+="0";}
				deci=decim+deci.toString();
				val_format=val_format+"."+deci;
			}
			if (parseFloat(valeur)<0) {val_format="-"+val_format;}
			return val_format;
		}
		function showHideBlog()																	{
			t=1;
			titre = X('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/DIV[2]/TABLE[1]/TBODY[1]/TR[1]/TD[3]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/B[1]');
			if(titre)
			{
				t=titre.innerHTML.indexOf("Extrait récent du blog") >= 0;
				blog = X('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/DIV[2]/TABLE[1]/TBODY[1]/TR[1]/TD[3]/TABLE[1]/TBODY[1]/TR[2]/TD[1] ');
				if((t == true) && (blog != null))
				{
					blog.setAttribute('style', 'display: none;');
					titreContent = titre.innerHTML;
					titre.innerHTML = '';
					span = document.createElement('span');
					span.setAttribute('style', 'color: #33647D; cursor: pointer;');
					span.innerHTML = "<small>>>"+titreContent+"</small>";
					if (window.addEventListener) 
					{
						span.addEventListener ("click",
							function()
							{
								if(t==1)
								{
									blog.setAttribute('style', 'display: visible;');
									t=0;
								}
								else
								{
									blog.setAttribute('style', 'display: none;');
									t=1;
								}
							},
							false
						   );
					} 
					titre.appendChild(span);
				}
			}
		}
		function showSet()																			{
			W_ACC					= 	"Acceptée";
			W_COMP					= 	"Compétition:";
			
			parenttd.innerHTML = inittd;
			if (parenttd) {
				try
				{
					prixShow = new Array();
					prixShow[1]	=6;		prixShow[2]	=6;		prixShow[3]	=7;	
					prixShow[4]	=7;		prixShow[5]	=8;		prixShow[6]	=10;	
					prixShow[7]	=12;	prixShow[8]	=15;	prixShow[9]	=20;	
					prixShow[10]=25;	prixShow[11]=35;	prixShow[12]=40;	
					prixShow[13]=50;	prixShow[14]=60;	prixShow[15]=70;	
					prixShow[16]=70;	prixShow[17]=75;	prixShow[18]=75;	
					prixShow[19]=80;	prixShow[20]=80;	prixShow[21]=85;	
					prixShow[22]=85;	prixShow[23]=90;	prixShow[24]=90;	
					prixShow[25]=95;	prixShow[26]=95;	prixShow[27]=100;
					
					create_menu(parenttd);
					
					Reno = X('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/DIV[3]/TABLE[2]/TBODY[1]/TR[5]/TD[2]');	
					Reno = prixShow[Reno.innerHTML.match(/.*Word=([0-9]+)/)[1]];
					
					parenttd.innerHTML += "&nbsp;&nbsp;<b><span id='W_PRICE'>Retail price</span>:</b><small> "+Reno+" </small>(<span id='W_PRICEGRILLE'>according to a price list</span>)</small></span><br /><br />";
				}
				catch(ex) 
				{
					GM_log(ex);
				}
			}
		}
		function showRenomee()																	{
			
			W_STOCKHOLM = "Stockholm";
			
			inittd = parenttd;
			inittd = inittd.innerHTML;
			tabbasei = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr[1]/td[1]/table[1]');
			tabbasein = tabbasei.innerHTML;
			tabbase2i = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr[1]/td[1]/table[2]');
			tabbase2in = tabbase2i.innerHTML;
			parenttd.innerHTML 	= inittd;
			tabbase = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr[1]/td[1]/table[1]');
			tabbase2 = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr[1]/td[1]/table[2]');
			tabbase.innerHTML	= tabbasein;
			tabbase2.innerHTML	= tabbase2in;
			
			if (parenttd) {
				try
				{
					F=GM_getValue("F");
					if(F==undefined) { F = 3; GM_setValue("F", "3"); }
					if((true != IsNumeric(F)))  { F = 3; GM_setValue("F", "3"); }
					check=IsNumeric(F);
					if(check == false) { F=3; }
					var t_renomee = 0;
					var a_renomee = 0;
					var t_popularite = 0;
					var c_popularite = '';
					var sr = 0;
					var pays = '';
					var debug = '';
					var elems = X2('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr[1]/td[1]/table[1]/tbody[1]/tr');
					if (elems && elems.snapshotLength > 0) 
					{
						tabp = new Array();
						tabr = new Array();
						tabrn = new Array();
						tabbm = new Array();
						for (i=2; i < elems.snapshotLength + 1; i++) 
						{
							var pays = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr[1]/td[1]/table[1]/tbody[1]/tr['+i+']/td[1]');
							pays = pays.innerHTML.replace("&nbsp;", "")
							tabp[i]=pays;
							var bm = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr[1]/td[1]/table[1]/tbody[1]/tr['+i+']/td[3]');
							var bm2 = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr[1]/td[1]/table[1]/tbody[1]/tr['+i+']/td[3]/img[2]');
							bm2 = bm2.getAttributeNode('title');
							bm2 = bm2.value.replace("%", "");
							if(bm2 < 10)	bm2 = '0'+bm2;
							tabbm[i]=bm2+'%';
							var renomee2 = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr[1]/td[1]/table[1]/tbody[1]/tr['+i+']/td[2]/a');
							renomee2 = renomee2.innerHTML;
							tabr[i]=renomee2;
							if ((renomee2)  && (pays))
							{
								c_renomee = convert_renomee_t(renomee2);
								if(c_renomee < 10)	tabrn[i] = '0'+c_renomee;
								else				tabrn[i]=c_renomee;
								if (pays == W_STOCKHOLM) { sr=c_renomee; }
								t_renomee = t_renomee+c_renomee;
								if(c_renomee >= 4) { a_renomee = a_renomee + c_renomee; }
							}
							t=i;
						}
						sr=a_renomee/sr;
						sr=Math.round(sr*100)/100;
					}
					
					
					//POPU
					tabpn=new Array();
					tabpp=new Array();
					for(i=2;i<=5;i++)
					{
						var renoimg = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr['+i+']/td[2]');
						var reno = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr['+i+']/td[1]');
						tabpn[i]=reno.innerHTML;
						tabpp[i]=renoimg.innerHTML;
					}
					
					
					
					var elems = X2('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr');
					if (elems && elems.snapshotLength > 0) 
					{
						for (i=1; i < elems.snapshotLength; i++) 
						{
							var reno = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr['+i+']/td[2]/img[2]');
							if (reno) 
							{
								c_popularite = reno.title.replace(/\s/g,"");
								c_popularite = c_popularite.replace("%", "")
								t_popularite = t_popularite + parseFloat(c_popularite);
							}
						}
					}
					
					if(SHOW_RENOMOD == "true") 
					{ 
					// Cache le tableau initial
					var tabbase = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr[1]/td[1]/table[1]');
					var tabbase2 = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr[1]/td[1]/table[2]');
					tabbase.setAttribute('style', 'display: none;');
					tabbase2.setAttribute('style', 'display: none;');
					//affiche un nouveau tableau
					var tabnewparent = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr[1]/td[1]');
					table = document.createElement('table');
					table.setAttribute('width', '95%');
					table.setAttribute('cellpadding', '2');
					table.setAttribute('cellspacing', '0');
					table.setAttribute('style', 'font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 11px;');
					table.setAttribute('border', '0');
					table.setAttribute('id', 'renoMod');
					table.setAttribute('class', 'tablesorter');
					
					thead = document.createElement('thead');
					
					tr = document.createElement('tr');
					
					th = document.createElement('th');
					th.innerHTML =  "<b><span id='W_RENO_TOWN'>Ville</span></b>";
					tr.appendChild(th);
					
					th = document.createElement('th');
					th.innerHTML =  "<b><span id='W_RENO_LEVEL'>Niveau de renommée</span></b>";
					tr.appendChild(th);
					
					th = document.createElement('th');
					th.innerHTML = "<b><span id='W_MEDIAS'>Couverture médiatique</span></b>";
					tr.appendChild(th);
					
					thead.appendChild(tr);
					table.appendChild(thead);
					
					tbody = document.createElement('tbody');
					
					rclass=1;
					for (l=26;l>=0;l--)
					{
						for(h=0;h<=t;h++)
						{
							if(tabrn[h]==l)
							{
								tr = document.createElement('tr');
								td = document.createElement('td');
								td.innerHTML = tabp[h];
								td.setAttribute('style', 'padding: 10px');

								if(rclass==0)
								{
									td.setAttribute('style', 'background: #e2eff1; padding: 10px');

								}
								tr.appendChild(td);
								
								td = document.createElement('td');
								
								td.innerHTML = '<span style="color: #FFF; font-weight: bold; background: '+ getGradient(tabrn[h]) +';">&nbsp;'+tabrn[h]+'&nbsp;</span> ' + tabr[h];
								
								if(rclass==0)
								{
									td.setAttribute('style', 'background: #e2eff1;');
								}
								tr.appendChild(td);
								
								td = document.createElement('td');
								td.setAttribute('align', 'center');
								td.innerHTML = tabbm[h];
								if(rclass==0)
								{
									td.setAttribute('style', 'background: #e2eff1;');
									rclass=1;
								}
								else
								{
									rclass=0;
								}
								tr.appendChild(td);
								
								tbody.appendChild(tr);
							}
						}
					}
					table.appendChild(tbody);
					tabnewparent.appendChild(table);
					br = document.createElement('br');
					tabnewparent.appendChild(br);
					
					table = document.createElement('table');
					table.setAttribute('width', '95%');
					table.setAttribute('cellpadding', '2');
					table.setAttribute('cellspacing', '0');
					table.setAttribute('border', '0');
					table.setAttribute('style', 'font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 11px;');
					table.setAttribute('border', '0');
					
					tr = document.createElement('tr');
					td = document.createElement('td');
					td.innerHTML = "<b><span id='W_POPUBY'>Popularité par segment de marché</span></b>";
					td.setAttribute('style', 'background: #e2eff1;');
					
					td.setAttribute('colspan', '2');
					tr.appendChild(td);
					table.appendChild(tr);
					
					rclass=1;
					for(i=2;i<=5;i++)
					{
						tr = document.createElement('tr');
						td = document.createElement('td');
						td.setAttribute('style', 'padding: 10px');
						if(rclass==0)
						{
							td.setAttribute('style', 'background: #e2eff1; padding: 10px');

						}
						td.innerHTML = tabpn[i];
						tr.appendChild(td);
						td = document.createElement('td');
						td.setAttribute('align', 'left');
						td.setAttribute('width', '70%');
						td.setAttribute('style', 'padding: 10px');
						if(rclass==0)
						{
							td.setAttribute('style', 'background: #e2eff1; padding: 10px');
							rclass=1;
						}
						else
						{
							rclass=0;
						}
						td.innerHTML = tabpp[i];
						tr.appendChild(td);
						table.appendChild(tr);
					}
					
					tabnewparent.appendChild(table);
					br = document.createElement('br');
					tabnewparent.appendChild(br);
					
					span = document.createElement('span');
					var dernierrapport = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr[6]/td[1]');
					span.innerHTML = dernierrapport.innerHTML;
					tabnewparent.appendChild(span);
					br = document.createElement('br');
					tabnewparent.appendChild(br);
										
					//addTableSorter("renoMod");
					}
					if(SHOW_RENOMMEE_POPU == "true") 
					{ 
						create_menu(parenttd);

					
						parenttd.innerHTML += "</table>";
						
						parenttd.innerHTML += '<table width="229" border="0" cellspacing="0" cellpadding="0" class="menu">';
						parenttd.innerHTML += '<tr><td width="125"><b><span id="W_TOTAL_RENO">Renommée totale</span></b></td><td  width="104" align="right"><small> '+ t_renomee +' </small></td></tr>';
						parenttd.innerHTML += '<tr><td width="125"><b><span id="W_RENO">Renommée</span><small> >= 4:</small></b></td><td width="104"  align="right"><small> '+ a_renomee +' </small></td></tr>';
						
						
						
						parenttd.innerHTML += '<tr><td width="125"><b><span id="W_TOTAL_POPU">Popularité totale</span></b></td><td width="104"  align="right"><small> '+ t_popularite +' </small></td></tr>';
						parenttd.innerHTML += '<tr><td width="125"><b><small>Stock. Rate:</small></b></td><td width="104"  align="right"><small> '+ sr +' </small></td></tr>';
						parenttd.innerHTML += '</table>';
						
						table = document.createElement('table');
						tr = document.createElement('tr');
						td = document.createElement('td');
						td.innerHTML = "<small>F</small>";
						tr.appendChild(td);
						td = document.createElement('td');
						cb = document.createElement('input');
						cb.setAttribute('type', 'text');
						cb.setAttribute('id', 'facteur');
						cb.setAttribute('size', '2');
						cb.setAttribute('maxlength', '4');
						cb.setAttribute('value', F);
						td.appendChild(cb);
						tr.appendChild(td);
						td = document.createElement('td');
						a = document.createElement('a');
						a.innerHTML = "<span id='W_CALCULER'>Calculer</span>";
						a.setAttribute('id', 'calc_f');
						a.setAttribute('style', 'cursor: pointer; color: #33647D;');
						if (window.addEventListener) 
						{
							a.addEventListener ("click",
								function()
								{
									f=document.getElementById("facteur").value;	
									GM_setValue("F", f);
									document.getElementById("FV").innerHTML = Math.round(a_renomee*t_popularite*f);
								},
								false
							   );
						} 

						td.appendChild(a);
						tr.appendChild(td);
						td = document.createElement('td');
						td.innerHTML = Math.round(a_renomee*t_popularite*F);
						td.setAttribute('colspan', '2');
						td.setAttribute('id', 'FV');
						tr.appendChild(td);
						table.appendChild(tr);
						parenttd.appendChild(table);
						
					}
				} 
				catch(ex) 
				{
					GM_log(ex);
				}
			}
		}
		function showYouthHostel()															
		{
			function getYH(code)
			{
				function inform(text) 
				{
					document.getElementById("yh").href="Locale.asp?action=MoveHere&LocaleID="+text;
				}
				get("http://popmundo.fr/klyne/scripts/yh.php?c="+code+"", inform);
				
			}
			var citylink = document.evaluate("//a[contains(@href, 'action=View&CityID=')]", document, null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
			if (citylink) 
			{
				var city_id = citylink.snapshotItem(0).href.match( /CityID=(\d+)/ )[1];
				var div = X('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]');
				if (div && city_id) 
				{
					var star = div.getElementsByTagName('img')[0];
					
					var newdiv = document.createElement('div');
					newdiv.setAttribute("id", "Hostels");
					newdiv.innerHTML = '<img src="graphics/'+style+'/miscellaneous/Rivet.gif" alt="" width="8" height="8" hspace="5" /> '+
					'<a href="javascript:void(0)" onclick="meny(\'MenuHostel\'); this.blur()">'+
					'<font color="#333333"><span id="W_YOUTHHOSTEL">Auberges</span></font></a><br />'+ 
					'<div id="MenuHostel" style="display: none; padding-left:6px; padding-bottom:5px;">'+ 
					'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
					'<a id="yh" href=""><span id="W_GOYOUTHHOSTEL">Se rendre dans une auberge</span></a></div>'+
					'<img src="images/trans_pixel.gif" width="1" height="4"><br />'+
					'';
					div.insertBefore( newdiv, star );
					getYH(city_id);
				}
			}
		}
		function compteChar(of)																	{	
			
			if (of == "unknow") { of=of; }
			else if (of == "BlocNote") 
			{
				if (parenttd) 
				{	
					try
					{
						parenttd.innerHTML = inittd;
						create_menu(parenttd);
						var blocnote = X('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/DIV[2]/FORM[1]/TEXTAREA[1]');
						bn=blocnote.value.length;
						bn=4000-bn;
						table = document.createElement('table');
						tr = document.createElement('tr');
						td = document.createElement('td');
						td.setAttribute('id','_charR');
						td.innerHTML = bn +" <span id='W_RESTCHAR'>caractères restants</span>";
						tr.appendChild(td);
						parenttd.appendChild(tr);
						parenttd.innerHTML += '</table>';

					}
					catch(ex) 
					{
						GM_log(ex);
					}
				}
			}
		}
		function showList()																			{
			if (parenttd) 
			{	
				try
				{	
					parenttd.innerHTML = inittd;
					create_menu(parenttd);
					
					var nom = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/table[1]/tbody[1]/tr[1]/td[2]/table[1]/tbody[1]/tr[1]/td[1]/b[1]');
					name=nom.innerHTML;
					id=page.match(/.*CharacterID=([0-9]+)/)[1];
					
					table = document.createElement('table');
					tr = document.createElement('tr');
					td = document.createElement('td');
					a = document.createElement('a');
					a.innerHTML = "<small>FriendList</small>";
					a.setAttribute('style', 'cursor: pointer; color: #33647D;');
					
					if (window.addEventListener) 
					{
						a.addEventListener ("click",
							function()
							{
								mode='FriendList';
								AddToList(mode,name,id);
							},
							false
						   );
					} 
					
					td.appendChild(a);
					tr.appendChild(td);
					td = document.createElement('td');
					td.innerHTML = " - ";
					tr.appendChild(td);
					td = document.createElement('td');
					a = document.createElement('a');
					a.innerHTML = "<small>BlackList</small>";
					a.setAttribute('style', 'cursor: pointer; color: #33647D;');
					
					if (window.addEventListener) 
					{
						a.addEventListener ("click",
							function()
							{
								mode='BlackList';
								AddToList(mode,name,id);
							},
							false
						   );
					} 
					
					td.appendChild(a);
					tr.appendChild(td);
					td = document.createElement('td');
					td.innerHTML = " - ";
					tr.appendChild(td);
					td = document.createElement('td');
					a = document.createElement('a');
					a.innerHTML = "<small>FamilyList</small>";
					a.setAttribute('style', 'cursor: pointer; color: #33647D;');
					
					if (window.addEventListener) 
					{
						a.addEventListener ("click",
							function()
							{
								mode='FamilyList';
								AddToList(mode,name,id);
							},
							false
						   );
					} 
					
					td.appendChild(a);
					tr.appendChild(td);
					td = document.createElement('td');
					td.innerHTML = " - ";
					tr.appendChild(td);
					td = document.createElement('td');
					a = document.createElement('a');
					a.innerHTML = "<small>Suppr.</small>";
					a.setAttribute('style', 'cursor: pointer; color: #33647D;');
					
					if (window.addEventListener) 
					{
						a.addEventListener ("click",
							function()
							{
								DelToList(name,id);
							},
							false
						   );
					} 
					
					td.appendChild(a);
					tr.appendChild(td);
					table.appendChild(tr);
					parenttd.appendChild(table);
					
					
					var nom = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/table[1]/tbody[1]/tr[1]/td[2]/table[1]/tbody[1]/tr[1]/td[1]/b[1]');
					var type = List[nom.innerHTML];
					if (type == "undefined") 
					{ 
						//Nothing 
					}
					else if (type == 1) 
					{ 
						nom.innerHTML = nom.innerHTML +" (Famille)"; 
					}
					else if (type == 0) 
					{ 
						nom.innerHTML = nom.innerHTML +" (Auteur)"; 
					}
					else if (type == 2) 
					{ 
						nom.innerHTML = nom.innerHTML +" (BlackList)"; 
					}
					else if (type == 3) 
					{ 
						nom.innerHTML = nom.innerHTML +" (FriendList)"; 
					}
					
					
				}
				catch(ex) 
				{
					GM_log(ex);
				}
			}
		}
		function AddToList(mode,name,id)												{
			var type = List[name];
			if ((type != 1) && (type != 2) && (type != 3)) 
			{ 
				if (mode == "FriendList") 	
				{ 
					FRIENDLIST		=FRIENDLIST+','+name; 	GM_setValue("FRIENDLIST", FRIENDLIST);  
					alert(name+" a été rajouté à la FriendList"); document.location = page;
				}
				if (mode == "BlackList")
				{ 
					BLACKLIST		=BLACKLIST+','+name+'|'+id; 	GM_setValue("BLACKLIST", BLACKLIST);  
					alert(name+" a été rajouté à la BlackList"); document.location = page;
				}		
				if (mode == "FamilyList")
				{ 
					FAMILYLIST		=FAMILYLIST+','+name; 	GM_setValue("FAMILYLIST", FAMILYLIST);  
					alert(name+" a été rajouté à la FamilyList"); document.location = page;
				}
			}
		}
		function DelToList(name,id)															{
			var type = List[name];
			if (type == "undefined") 
			{
				// Nothing
			}
			else if (type == 1) 
			{
				FAMILYLIST = FAMILYLIST.replace(","+name, "");
				GM_setValue("FAMILYLIST",FAMILYLIST);
				List[name] = -1;
				alert(name +" ne fais plus partie de la FamilyList");
				document.location = page;
			}
			else if (type == 2) 
			{
				BLACKLIST = BLACKLIST.replace(","+name, "");
				GM_setValue("BLACKLIST",BLACKLIST);
				List[name] = -1;
				alert(name +" ne fais plus partie de la BlackList");
				document.location = page;
			}
			else if (type == 3) 
			{
				FRIENDLIST = FRIENDLIST.replace(","+name, "");
				GM_setValue("FRIENDLIST",FRIENDLIST);
				List[name] = -1;
				alert(name +" ne fais plus partie de la FriendList");
				document.location = page;
			}
			else
			{
				alert(name +' ne fait partie d\'aucune liste !');
				//document.location = page;
			}
		}
		function showXPDetails()																{
			if (parenttd) 
			{	
				try
				{
					parenttd.innerHTML = inittd;
					create_menu(parenttd);
					
					percent = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/div[2]/table[1]/tbody[1]/tr[2]/td[2]/a');		
					if(percent)
						percent1 = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/div[2]/table[1]/tbody[1]/tr[9]/td[2]/span[1]');	
					else
						percent1 = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/div[2]/table[1]/tbody[1]/tr[4]/td[2]/span[1]');
					
					percent1 = percent1.innerHTML;	
					percent1 = parseFloat(percent1.replace("%", ""));
					
					percent2 = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/div[2]/table[1]/tbody[1]/tr[5]/td[2]/span[1]');
					percent2 = percent2.innerHTML;
					percent2 = parseFloat(percent2.replace("%", ""));
					percent3 = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/div[2]/table[1]/tbody[1]/tr[6]/td[2]/span[1]');
					percent3 = percent3.innerHTML;
					percent3 = parseFloat(percent3.replace("%", ""));
					percent4 = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/div[2]/table[1]/tbody[1]/tr[7]/td[2]/span[1]');
					percent4 = percent4.innerHTML;
					percent4 = parseFloat(percent4.replace("%", ""));
					percent5 = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/div[2]/table[1]/tbody[1]/tr[8]/td[2]/span[1]');
					percent5 = percent5.innerHTML;
					percent5 = parseFloat(percent5.replace("%", ""));
					
				
					tot = parseInt(percent1+percent2+percent3+percent4+percent5);
					prcent = Math.round((tot/500)*100);
					sstot = 500 - tot; sstot = Math.round(sstot / 3);
					
					
					tr = document.createElement('tr');
					td = document.createElement('td');
					td.innerHTML = tot +' / 500';
					tr.appendChild(td);
					td = document.createElement('td');
					td.innerHTML = '('+ prcent +'%)';
					tr.appendChild(td);
					td = document.createElement('td');
					td.innerHTML = '<small>[ ~'+ sstot +' </small><span id="W_WEEK">semaines</span> <small>]</small>';
					tr.appendChild(td);
					parenttd.appendChild(tr);
					
					parenttd.innerHTML += '</table>';
				}
				catch(ex) 
				{
					GM_log(ex);
				}
			}
		}
		function hideImgOnCityPage()														{
			if (parenttd) 
			{	
				try
				{	
					elem = X('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/DIV[1]/IMG[1]');	elem.setAttribute('style','display: none;');
					elem = X('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/DIV[1]');			elem.setAttribute('style','display: none;');
					elem = X('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/DIV[2]');			elem.setAttribute('style','display: none;');
				}
				catch(ex) 
				{
					GM_log(ex);
				}
			}
		}
		function showEmployements()															{
			
			W_REQUIS				=	"REQUIS";
			if (parenttd) 
			{	
				try
				{
					//	1	Employé de bureau
					//	2	Nettoyeur
					//	3	Vendeur
					//	4	PDG
					//	5	Bénéficiaire d'aides sociales 
					// 	7	Avocat
					//	9	Médecin 
					//	10	Vigile 
					//	11	Enseignant :
					//	12	Ouvrier 
					//	13	Barman
					//	18	Gendarme 
					//	19	Directeur RP :
					//	22	Animateur TV
					//	23	Hôtesse de l'air
					//	25	Prêtre
					//	28	Ingénieur
					//	30	Pompier
					//	31	Chauffeur
					//	35	Comptable
					//	39	Danseur(se) érotique
					//	36	Eboueur
					//	38	Entrepreneur des pompes funèbres
					//	39	Danseur érotique

					if(isVip == "oui") { n=3; }
					else { n=2; }
					var elems = X2('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr[1]/td[1]/select[1]/option')				
					if (elems && elems.snapshotLength > 0) 
					{
						for(i=1;i <= elems.snapshotLength;i++)
						{
							option1 = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr[1]/td[1]/select[1]/option[1]');
							option1v = option1.value; option1H = option1.innerHTML;
							option = X('/html[1]/body[1]/table['+n+']/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr[1]/td[1]/table[2]/tbody[1]/tr[1]/td[1]/select[1]/option['+i+']');
							t=option.innerHTML.indexOf(W_REQUIS) >= 0;
							if(t)					
							{
								optionv = option.value; optionH = option.innerHTML;
								option1.value 		= 	optionv;
								option1.innerHTML 	=	optionH;
								option.value		= 	option1v;
								option.innerHTML	=	option1H;
							}
						}
					}
				
				

					var TABLE_XPATH = "/html/body/table["+n+"]/tbody/tr/td[1]/table[2]/tbody/tr/td/table[1]/tbody";
					var EMPLOYEE_XPATH = TABLE_XPATH +"/tr/td[1]/a";

					var roles = {};
					var nodes = xpathNodes(EMPLOYEE_XPATH);

					for (var i = nodes.snapshotLength - 1; i >= 0; i--) 
					{
						var node = nodes.snapshotItem(i);
						
						var role = node.textContent;
						
						if (roles[role]) {
							roles[role]++;
						}
						else {
							roles[role] = 1;
						}
					}

					var parentNode = xpathNode(TABLE_XPATH);
					var lastRow = nodes.snapshotItem(nodes.snapshotLength - 1).parentNode.parentNode;
					var targetNode = lastRow.nextSibling;
					var n = 0; var total = 0;
					n=nodes.snapshotLength+1;
					elem = X(TABLE_XPATH +'/tr['+n+']/td[1]');
					elem.setAttribute('colspan','4');
					table = document.createElement('table');
					
					for (var r in roles) 
					{
						total += roles[r]; 
						tr = document.createElement('tr');
						td = document.createElement('td');
						td = document.createElement('td');
						td.innerHTML = roles[r];
						tr.appendChild(td);
						td = document.createElement('td');
						td.innerHTML = r;
						tr.appendChild(td);
						/* td = document.createElement('td');
						td.innerHTML = roles[r] * 33;
						tr.appendChild(td); */
						table.appendChild(tr);
					}
					tr = document.createElement('tr');
					td = document.createElement('td');
					td.setAttribute('colspan','2');
					td.setAttribute('style','border-top: 2px solid black;');
					td.innerHTML = total;
					tr.appendChild(td);
					table.appendChild(tr);
					elem.appendChild(table);
					elem.innerHTML += '</table>';
				}
				catch(ex) 
				{
					GM_log(ex);
				}
			}
		}
		function showRelationPage()															{
			W_CALL					=	"Appeler";
			if (parenttd) 
			{	
				try
				{						
					var elems2 = X2('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/DIV[2]/TABLE[1]/TBODY[1]/TR/TD[1]');	
					if (elems2 && elems2.snapshotLength > 0) 
					{
						for (i=3; i < elems2.snapshotLength; i++) 
						{	
							t = X('/html/body/table['+n+']/tbody/tr/td[1]/div[2]/table/tbody/tr['+i+']/td[1]');
							t.setAttribute('width','375px');
							t = X('/html/body/table['+n+']/tbody/tr/td[1]/div[2]/table/tbody/tr['+i+']/td[5]');
							t.setAttribute('width','80px');
							a = X('/html/body/table['+n+']/tbody/tr/td[1]/div[2]/table/tbody/tr['+i+']/td[1]/a');
							a.innerHTML = a.getAttribute('title');
							c = X('/html/body/table['+n+']/tbody/tr/td[1]/div[2]/table/tbody/tr['+i+']/td[1]/a/b');
							if(c != null)
							{	
								c.setAttribute('style','color: #00B721;');
							}
							
						}
					}
					var elems2 = X2('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/DIV[2]/TABLE[1]/TBODY[1]/TR/TD[5]/A[2]');	
					if (elems2 && elems2.snapshotLength > 0) 
					{
						for (i=0; i < elems2.snapshotLength+3; i++) 
						{	
							c = X('/html/body/table['+n+']/tbody/tr/td[1]/div[2]/table/tbody/tr['+i+']/td[5]/a[1]');
							if(c != null)
								c.innerHTML = '<img width="12px" src="'+images['zoom']+'" />';
								
							d = X('/html/body/table['+n+']/tbody/tr/td[1]/div[2]/table/tbody/tr['+i+']/td[5]/a[2]');
							if(d != null)
							{	
								d.setAttribute('href', '#')
								d.innerHTML = "<input type='checkbox' />";
							}
							
						}
					}
					
					c = X('/html/body/table['+n+']/tbody/tr/td[1]/div[2]/table/tbody/tr['+i+']/td[1]');
					
					a = document.createElement('a');
					a.innerHTML = '<center><span id="W_RELDEL">Cliquez ici pour terminer les relations cochées</span></center>';
					a.setAttribute('style', 'cursor: pointer; color: #33647D;padding-bottom: 2px;');
					
					if (window.addEventListener) 
					{
						a.addEventListener ("click",
							function()
							{
								SuppRelations();
							},
							false
						   );
					} 
					c.appendChild(a);
				}
				catch(ex) 
				{
					GM_log(ex);
				}	
			}
		}
		function countUpdate(start, end)												{
			stop=0; up=0; 
			
			while((start < end) && (stop == 0))
			{
				if(start <= 0.50)
					start+=0.35;
				else
					if(start <= 2.00)
						start+=0.30;
					else
						if(start <= 3.50)
							start+=0.25;
						else
							if(start <= 5.00)
								start+=0.20;
							else
								if(start <= 6.50)
									start+=0.15;
								else
									if(start <= 8.00)
										start+=0.10;
									else
										if(start < 9.55)
											start+=0.05;
										else
											stop=1;

						
				up++;
			}
			
			return up;
		}
		function countTenStars()																{		
			var blackstar 	= "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%08%00%00%00%08%08%06%00%00%00%C4%0F%BE%8B%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%0AOiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSgTS%E9%16%3D%F7%DE%F4BK%88%80%94KoR%15%08%20RB%8B%80%14%91%26*!%09%10J%88!%A1%D9%15Q%C1%11EE%04%1B%C8%A0%88%03%8E%8E%80%8C%15Q%2C%0C%8A%0A%D8%07%E4!%A2%8E%83%A3%88%8A%CA%FB%E1%7B%A3k%D6%BC%F7%E6%CD%FE%B5%D7%3E%E7%AC%F3%9D%B3%CF%07%C0%08%0C%96H3Q5%80%0C%A9B%1E%11%E0%83%C7%C4%C6%E1%E4.%40%81%0A%24p%00%10%08%B3d!s%FD%23%01%00%F8~%3C%3C%2B%22%C0%07%BE%00%01x%D3%0B%08%00%C0M%9B%C00%1C%87%FF%0F%EAB%99%5C%01%80%84%01%C0t%918K%08%80%14%00%40z%8EB%A6%00%40F%01%80%9D%98%26S%00%A0%04%00%60%CBcb%E3%00P-%00%60'%7F%E6%D3%00%80%9D%F8%99%7B%01%00%5B%94!%15%01%A0%91%00%20%13e%88D%00h%3B%00%AC%CFV%8AE%00X0%00%14fK%C49%00%D8-%000IWfH%00%B0%B7%00%C0%CE%10%0B%B2%00%08%0C%000Q%88%85)%00%04%7B%00%60%C8%23%23x%00%84%99%00%14F%F2W%3C%F1%2B%AE%10%E7*%00%00x%99%B2%3C%B9%249E%81%5B%08-q%07WW.%1E(%CEI%17%2B%146a%02a%9A%40.%C2y%99%192%814%0F%E0%F3%CC%00%00%A0%91%15%11%E0%83%F3%FDx%CE%0E%AE%CE%CE6%8E%B6%0E_-%EA%BF%06%FF%22bb%E3%FE%E5%CF%ABp%40%00%00%E1t~%D1%FE%2C%2F%B3%1A%80%3B%06%80m%FE%A2%25%EE%04h%5E%0B%A0u%F7%8Bf%B2%0F%40%B5%00%A0%E9%DAW%F3p%F8~%3C%3CE%A1%90%B9%D9%D9%E5%E4%E4%D8J%C4B%5Ba%CAW%7D%FEg%C2_%C0W%FDl%F9~%3C%FC%F7%F5%E0%BE%E2%24%812%5D%81G%04%F8%E0%C2%CC%F4L%A5%1C%CF%92%09%84b%DC%E6%8FG%FC%B7%0B%FF%FC%1D%D3%22%C4Ib%B9X*%14%E3Q%12q%8ED%9A%8C%F32%A5%22%89B%92)%C5%25%D2%FFd%E2%DF%2C%FB%03%3E%DF5%00%B0j%3E%01%7B%91-%A8%5Dc%03%F6K'%10Xt%C0%E2%F7%00%00%F2%BBo%C1%D4(%08%03%80h%83%E1%CFw%FF%EF%3F%FDG%A0%25%00%80fI%92q%00%00%5ED%24.T%CA%B3%3F%C7%08%00%00D%A0%81*%B0A%1B%F4%C1%18%2C%C0%06%1C%C1%05%DC%C1%0B%FC%606%84B%24%C4%C2B%10B%0Ad%80%1Cr%60)%AC%82B(%86%CD%B0%1D*%60%2F%D4%40%1D4%C0Qh%86%93p%0E.%C2U%B8%0E%3Dp%0F%FAa%08%9E%C1(%BC%81%09%04A%C8%08%13a!%DA%88%01b%8AX%23%8E%08%17%99%85%F8!%C1H%04%12%8B%24%20%C9%88%14Q%22K%915H1R%8AT%20UH%1D%F2%3Dr%029%87%5CF%BA%91%3B%C8%002%82%FC%86%BCG1%94%81%B2Q%3D%D4%0C%B5C%B9%A87%1A%84F%A2%0B%D0dt1%9A%8F%16%A0%9B%D0r%B4%1A%3D%8C6%A1%E7%D0%ABh%0F%DA%8F%3EC%C70%C0%E8%18%073%C4l0.%C6%C3B%B18%2C%09%93c%CB%B1%22%AC%0C%AB%C6%1A%B0V%AC%03%BB%89%F5c%CF%B1w%04%12%81E%C0%096%04wB%20a%1EAHXLXN%D8H%A8%20%1C%244%11%DA%097%09%03%84Q%C2'%22%93%A8K%B4%26%BA%11%F9%C4%18b21%87XH%2C%23%D6%12%8F%13%2F%10%7B%88C%C47%24%12%89C2'%B9%90%02I%B1%A4T%D2%12%D2F%D2nR%23%E9%2C%A9%9B4H%1A%23%93%C9%DAdk%B2%079%94%2C%20%2B%C8%85%E4%9D%E4%C3%E43%E4%1B%E4!%F2%5B%0A%9Db%40q%A4%F8S%E2(R%CAjJ%19%E5%10%E54%E5%06e%982AU%A3%9AR%DD%A8%A1T%115%8FZB%AD%A1%B6R%AFQ%87%A8%134u%9A9%CD%83%16IK%A5%AD%A2%95%D3%1Ah%17h%F7i%AF%E8t%BA%11%DD%95%1EN%97%D0W%D2%CB%E9G%E8%97%E8%03%F4w%0C%0D%86%15%83%C7%88g(%19%9B%18%07%18g%19w%18%AF%98L%A6%19%D3%8B%19%C7T071%EB%98%E7%99%0F%99oUX*%B6*%7C%15%91%CA%0A%95J%95%26%95%1B*%2FT%A9%AA%A6%AA%DE%AA%0BU%F3U%CBT%8F%A9%5ES%7D%AEFU3S%E3%A9%09%D4%96%ABU%AA%9DP%EBS%1BSg%A9%3B%A8%87%AAg%A8oT%3F%A4~Y%FD%89%06Y%C3L%C3OC%A4Q%A0%B1_%E3%BC%C6%20%0Bc%19%B3x%2C!k%0D%AB%86u%815%C4%26%B1%CD%D9%7Cv*%BB%98%FD%1D%BB%8B%3D%AA%A9%A19C3J3W%B3R%F3%94f%3F%07%E3%98q%F8%9CtN%09%E7(%A7%97%F3~%8A%DE%14%EF)%E2)%1B%A64L%B91e%5Ck%AA%96%97%96X%ABH%ABQ%ABG%EB%BD6%AE%ED%A7%9D%A6%BDE%BBY%FB%81%0EA%C7J'%5C'Gg%8F%CE%05%9D%E7S%D9S%DD%A7%0A%A7%16M%3D%3A%F5%AE.%AAk%A5%1B%A1%BBDw%BFn%A7%EE%98%9E%BE%5E%80%9ELo%A7%DEy%BD%E7%FA%1C%7D%2F%FDT%FDm%FA%A7%F5G%0CX%06%B3%0C%24%06%DB%0C%CE%18%3C%C55qo%3C%1D%2F%C7%DB%F1QC%5D%C3%40C%A5a%95a%97%E1%84%91%B9%D1%3C%A3%D5F%8DF%0F%8Ci%C6%5C%E3%24%E3m%C6m%C6%A3%26%06%26!%26KM%EAM%EE%9ARM%B9%A6)%A6%3BL%3BL%C7%CD%CC%CD%A2%CD%D6%995%9B%3D1%D72%E7%9B%E7%9B%D7%9B%DF%B7%60ZxZ%2C%B6%A8%B6%B8eI%B2%E4Z%A6Y%EE%B6%BCn%85Z9Y%A5XUZ%5D%B3F%AD%9D%AD%25%D6%BB%AD%BB%A7%11%A7%B9N%93N%AB%9E%D6g%C3%B0%F1%B6%C9%B6%A9%B7%19%B0%E5%D8%06%DB%AE%B6m%B6%7Dagb%17g%B7%C5%AE%C3%EE%93%BD%93%7D%BA%7D%8D%FD%3D%07%0D%87%D9%0E%AB%1DZ%1D~s%B4r%14%3AV%3A%DE%9A%CE%9C%EE%3F%7D%C5%F4%96%E9%2FgX%CF%10%CF%D83%E3%B6%13%CB)%C4i%9DS%9B%D3Gg%17g%B9s%83%F3%88%8B%89K%82%CB.%97%3E.%9B%1B%C6%DD%C8%BD%E4Jt%F5q%5D%E1z%D2%F5%9D%9B%B3%9B%C2%ED%A8%DB%AF%EE6%EEi%EE%87%DC%9F%CC4%9F)%9EY3s%D0%C3%C8C%E0Q%E5%D1%3F%0B%9F%950k%DF%AC~OCO%81g%B5%E7%23%2Fc%2F%91W%AD%D7%B0%B7%A5w%AA%F7a%EF%17%3E%F6%3Er%9F%E3%3E%E3%3C7%DE2%DEY_%CC7%C0%B7%C8%B7%CBO%C3o%9E_%85%DFC%7F%23%FFd%FFz%FF%D1%00%A7%80%25%01g%03%89%81A%81%5B%02%FB%F8z%7C!%BF%8E%3F%3A%DBe%F6%B2%D9%EDA%8C%A0%B9A%15A%8F%82%AD%82%E5%C1%AD!h%C8%EC%90%AD!%F7%E7%98%CE%91%CEi%0E%85P~%E8%D6%D0%07a%E6a%8B%C3~%0C'%85%87%85W%86%3F%8Ep%88X%1A%D11%975w%D1%DCCs%DFD%FAD%96D%DE%9Bg1O9%AF-J5*%3E%AA.j%3C%DA7%BA4%BA%3F%C6.fY%CC%D5X%9DXIlK%1C9.*%AE6nl%BE%DF%FC%ED%F3%87%E2%9D%E2%0B%E3%7B%17%98%2F%C8%5Dpy%A1%CE%C2%F4%85%A7%16%A9.%12%2C%3A%96%40L%88N8%94%F0A%10*%A8%16%8C%25%F2%13w%25%8E%0Ay%C2%1D%C2g%22%2F%D16%D1%88%D8C%5C*%1EN%F2H*Mz%92%EC%91%BC5y%24%C53%A5%2C%E5%B9%84'%A9%90%BCL%0DL%DD%9B%3A%9E%16%9Av%20m2%3D%3A%BD1%83%92%91%90qB%AA!M%93%B6g%EAg%E6fv%CB%ACe%85%B2%FE%C5n%8B%B7%2F%1E%95%07%C9k%B3%90%AC%05Y-%0A%B6B%A6%E8TZ(%D7*%07%B2geWf%BF%CD%89%CA9%96%AB%9E%2B%CD%ED%CC%B3%CA%DB%907%9C%EF%9F%FF%ED%12%C2%12%E1%92%B6%A5%86KW-%1DX%E6%BD%ACj9%B2%3Cqy%DB%0A%E3%15%05%2B%86V%06%AC%3C%B8%8A%B6*m%D5O%AB%EDW%97%AE~%BD%26zMk%81%5E%C1%CA%82%C1%B5%01k%EB%0BU%0A%E5%85%7D%EB%DC%D7%ED%5DOX%2FY%DF%B5a%FA%86%9D%1B%3E%15%89%8A%AE%14%DB%17%97%15%7F%D8(%DCx%E5%1B%87o%CA%BF%99%DC%94%B4%A9%AB%C4%B9d%CFf%D2f%E9%E6%DE-%9E%5B%0E%96%AA%97%E6%97%0En%0D%D9%DA%B4%0D%DFV%B4%ED%F5%F6E%DB%2F%97%CD(%DB%BB%83%B6C%B9%A3%BF%3C%B8%BCe%A7%C9%CE%CD%3B%3FT%A4T%F4T%FAT6%EE%D2%DD%B5a%D7%F8n%D1%EE%1B%7B%BC%F64%EC%D5%DB%5B%BC%F7%FD%3E%C9%BE%DBU%01UM%D5f%D5e%FBI%FB%B3%F7%3F%AE%89%AA%E9%F8%96%FBm%5D%ADNmq%ED%C7%03%D2%03%FD%07%23%0E%B6%D7%B9%D4%D5%1D%D2%3DTR%8F%D6%2B%EBG%0E%C7%1F%BE%FE%9D%EFw-%0D6%0DU%8D%9C%C6%E2%23pDy%E4%E9%F7%09%DF%F7%1E%0D%3A%DAv%8C%7B%AC%E1%07%D3%1Fv%1Dg%1D%2FjB%9A%F2%9AF%9BS%9A%FB%5Bb%5B%BAO%CC%3E%D1%D6%EA%DEz%FCG%DB%1F%0F%9C4%3CYyJ%F3T%C9i%DA%E9%82%D3%93g%F2%CF%8C%9D%95%9D%7D~.%F9%DC%60%DB%A2%B6%7B%E7c%CE%DFj%0Fo%EF%BA%10t%E1%D2E%FF%8B%E7%3B%BC%3B%CE%5C%F2%B8t%F2%B2%DB%E5%13W%B8W%9A%AF%3A_m%EAt%EA%3C%FE%93%D3O%C7%BB%9C%BB%9A%AE%B9%5Ck%B9%EEz%BD%B5%7Bf%F7%E9%1B%9E7%CE%DD%F4%BDy%F1%16%FF%D6%D5%9E9%3D%DD%BD%F3zo%F7%C5%F7%F5%DF%16%DD~r'%FD%CE%CB%BB%D9w'%EE%AD%BCO%BC_%F4%40%EDA%D9C%DD%87%D5%3F%5B%FE%DC%D8%EF%DC%7Fj%C0w%A0%F3%D1%DCG%F7%06%85%83%CF%FE%91%F5%8F%0FC%05%8F%99%8F%CB%86%0D%86%EB%9E8%3E99%E2%3Fr%FD%E9%FC%A7C%CFd%CF%26%9E%17%FE%A2%FE%CB%AE%17%16%2F~%F8%D5%EB%D7%CE%D1%98%D1%A1%97%F2%97%93%BFm%7C%A5%FD%EA%C0%EB%19%AF%DB%C6%C2%C6%1E%BE%C9x31%5E%F4V%FB%ED%C1w%DCw%1D%EF%A3%DF%0FO%E4%7C%20%7F(%FFh%F9%B1%F5S%D0%A7%FB%93%19%93%93%FF%04%03%98%F3%FCc3-%DB%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%00uIDATx%DA%7C%CE%B1%0D%82%00%10%85%E1%2FP%D1Zb%03%03X9%86K0%80%AD%95%8D%CBP%91%D09%045%A1%20%EE%60c%A2%256%87%89%84%F0'W%DC%DD%BBw%8F%7Fvhlp%C6%3B%84%20%C5%119%0A%DC%B0G%82g%CCUq5%AD%D40%3B%1D%F0X%2CkdI%08z%8C%8B%3Cw%7C%E6%26%8B7%1D.x%85%C3%8F%13%AE%11%1AJ%B4H%BF%03%00R%8C%18%EA%0AO%15%14%00%00%00%00IEND%AEB%60%82";
			
			var elems2 = X2('/html/body/table[3]/tbody/tr/td/div[2]/table/tbody/tr');
			for(i=2; i < elems2.snapshotLength;i++)
			{
				var elems = X('/html/body/table[3]/tbody/tr/td/div[2]/table/tbody/tr['+i+']/td[2]')
				if(elems)
				{
					var elems3 = X2('/html/body/table[3]/tbody/tr/td/div[2]/table/tbody/tr['+i+']/td[2]/img');
					if(elems3.snapshotLength == 10)
						elems.innerHTML = '<img width="8" hspace="1" height="8" alt="*" src="'+images['yStar']+'"/><img width="8" hspace="1" height="8" alt="*" src="'+images['yStar']+'"/><img width="8" hspace="1" height="8" alt="*" src="'+images['yStar']+'"/><img width="8" hspace="1" height="8" alt="*" src="'+images['yStar']+'"/><img width="8" hspace="1" height="8" alt="*" src="'+images['yStar']+'"/><img width="8" hspace="1" height="8" alt="*" src="'+images['yStar']+'"/><img width="8" hspace="1" height="8" alt="*" src="'+images['yStar']+'"/><img width="8" hspace="1" height="8" alt="*" src="'+images['yStar']+'"/><img width="8" hspace="1" height="8" alt="*" src="'+images['yStar']+'"/><img width="8" hspace="1" height="8" alt="*" src="'+images['yStar']+'"/>';
				}
			}
		}
		function countStarsAndSuch() 														{
			var uptocount = new Array();
			for(i=1;i<=10;i++)
				uptocount[i]=0;
			var starcount 	= 0;
			var skillcount 	= 0;
			var secskills 	= 0;
			var sss 		= 0;
			var blackstar 	= "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%08%00%00%00%08%08%06%00%00%00%C4%0F%BE%8B%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%0AOiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSgTS%E9%16%3D%F7%DE%F4BK%88%80%94KoR%15%08%20RB%8B%80%14%91%26*!%09%10J%88!%A1%D9%15Q%C1%11EE%04%1B%C8%A0%88%03%8E%8E%80%8C%15Q%2C%0C%8A%0A%D8%07%E4!%A2%8E%83%A3%88%8A%CA%FB%E1%7B%A3k%D6%BC%F7%E6%CD%FE%B5%D7%3E%E7%AC%F3%9D%B3%CF%07%C0%08%0C%96H3Q5%80%0C%A9B%1E%11%E0%83%C7%C4%C6%E1%E4.%40%81%0A%24p%00%10%08%B3d!s%FD%23%01%00%F8~%3C%3C%2B%22%C0%07%BE%00%01x%D3%0B%08%00%C0M%9B%C00%1C%87%FF%0F%EAB%99%5C%01%80%84%01%C0t%918K%08%80%14%00%40z%8EB%A6%00%40F%01%80%9D%98%26S%00%A0%04%00%60%CBcb%E3%00P-%00%60'%7F%E6%D3%00%80%9D%F8%99%7B%01%00%5B%94!%15%01%A0%91%00%20%13e%88D%00h%3B%00%AC%CFV%8AE%00X0%00%14fK%C49%00%D8-%000IWfH%00%B0%B7%00%C0%CE%10%0B%B2%00%08%0C%000Q%88%85)%00%04%7B%00%60%C8%23%23x%00%84%99%00%14F%F2W%3C%F1%2B%AE%10%E7*%00%00x%99%B2%3C%B9%249E%81%5B%08-q%07WW.%1E(%CEI%17%2B%146a%02a%9A%40.%C2y%99%192%814%0F%E0%F3%CC%00%00%A0%91%15%11%E0%83%F3%FDx%CE%0E%AE%CE%CE6%8E%B6%0E_-%EA%BF%06%FF%22bb%E3%FE%E5%CF%ABp%40%00%00%E1t~%D1%FE%2C%2F%B3%1A%80%3B%06%80m%FE%A2%25%EE%04h%5E%0B%A0u%F7%8Bf%B2%0F%40%B5%00%A0%E9%DAW%F3p%F8~%3C%3CE%A1%90%B9%D9%D9%E5%E4%E4%D8J%C4B%5Ba%CAW%7D%FEg%C2_%C0W%FDl%F9~%3C%FC%F7%F5%E0%BE%E2%24%812%5D%81G%04%F8%E0%C2%CC%F4L%A5%1C%CF%92%09%84b%DC%E6%8FG%FC%B7%0B%FF%FC%1D%D3%22%C4Ib%B9X*%14%E3Q%12q%8ED%9A%8C%F32%A5%22%89B%92)%C5%25%D2%FFd%E2%DF%2C%FB%03%3E%DF5%00%B0j%3E%01%7B%91-%A8%5Dc%03%F6K'%10Xt%C0%E2%F7%00%00%F2%BBo%C1%D4(%08%03%80h%83%E1%CFw%FF%EF%3F%FDG%A0%25%00%80fI%92q%00%00%5ED%24.T%CA%B3%3F%C7%08%00%00D%A0%81*%B0A%1B%F4%C1%18%2C%C0%06%1C%C1%05%DC%C1%0B%FC%606%84B%24%C4%C2B%10B%0Ad%80%1Cr%60)%AC%82B(%86%CD%B0%1D*%60%2F%D4%40%1D4%C0Qh%86%93p%0E.%C2U%B8%0E%3Dp%0F%FAa%08%9E%C1(%BC%81%09%04A%C8%08%13a!%DA%88%01b%8AX%23%8E%08%17%99%85%F8!%C1H%04%12%8B%24%20%C9%88%14Q%22K%915H1R%8AT%20UH%1D%F2%3Dr%029%87%5CF%BA%91%3B%C8%002%82%FC%86%BCG1%94%81%B2Q%3D%D4%0C%B5C%B9%A87%1A%84F%A2%0B%D0dt1%9A%8F%16%A0%9B%D0r%B4%1A%3D%8C6%A1%E7%D0%ABh%0F%DA%8F%3EC%C70%C0%E8%18%073%C4l0.%C6%C3B%B18%2C%09%93c%CB%B1%22%AC%0C%AB%C6%1A%B0V%AC%03%BB%89%F5c%CF%B1w%04%12%81E%C0%096%04wB%20a%1EAHXLXN%D8H%A8%20%1C%244%11%DA%097%09%03%84Q%C2'%22%93%A8K%B4%26%BA%11%F9%C4%18b21%87XH%2C%23%D6%12%8F%13%2F%10%7B%88C%C47%24%12%89C2'%B9%90%02I%B1%A4T%D2%12%D2F%D2nR%23%E9%2C%A9%9B4H%1A%23%93%C9%DAdk%B2%079%94%2C%20%2B%C8%85%E4%9D%E4%C3%E43%E4%1B%E4!%F2%5B%0A%9Db%40q%A4%F8S%E2(R%CAjJ%19%E5%10%E54%E5%06e%982AU%A3%9AR%DD%A8%A1T%115%8FZB%AD%A1%B6R%AFQ%87%A8%134u%9A9%CD%83%16IK%A5%AD%A2%95%D3%1Ah%17h%F7i%AF%E8t%BA%11%DD%95%1EN%97%D0W%D2%CB%E9G%E8%97%E8%03%F4w%0C%0D%86%15%83%C7%88g(%19%9B%18%07%18g%19w%18%AF%98L%A6%19%D3%8B%19%C7T071%EB%98%E7%99%0F%99oUX*%B6*%7C%15%91%CA%0A%95J%95%26%95%1B*%2FT%A9%AA%A6%AA%DE%AA%0BU%F3U%CBT%8F%A9%5ES%7D%AEFU3S%E3%A9%09%D4%96%ABU%AA%9DP%EBS%1BSg%A9%3B%A8%87%AAg%A8oT%3F%A4~Y%FD%89%06Y%C3L%C3OC%A4Q%A0%B1_%E3%BC%C6%20%0Bc%19%B3x%2C!k%0D%AB%86u%815%C4%26%B1%CD%D9%7Cv*%BB%98%FD%1D%BB%8B%3D%AA%A9%A19C3J3W%B3R%F3%94f%3F%07%E3%98q%F8%9CtN%09%E7(%A7%97%F3~%8A%DE%14%EF)%E2)%1B%A64L%B91e%5Ck%AA%96%97%96X%ABH%ABQ%ABG%EB%BD6%AE%ED%A7%9D%A6%BDE%BBY%FB%81%0EA%C7J'%5C'Gg%8F%CE%05%9D%E7S%D9S%DD%A7%0A%A7%16M%3D%3A%F5%AE.%AAk%A5%1B%A1%BBDw%BFn%A7%EE%98%9E%BE%5E%80%9ELo%A7%DEy%BD%E7%FA%1C%7D%2F%FDT%FDm%FA%A7%F5G%0CX%06%B3%0C%24%06%DB%0C%CE%18%3C%C55qo%3C%1D%2F%C7%DB%F1QC%5D%C3%40C%A5a%95a%97%E1%84%91%B9%D1%3C%A3%D5F%8DF%0F%8Ci%C6%5C%E3%24%E3m%C6m%C6%A3%26%06%26!%26KM%EAM%EE%9ARM%B9%A6)%A6%3BL%3BL%C7%CD%CC%CD%A2%CD%D6%995%9B%3D1%D72%E7%9B%E7%9B%D7%9B%DF%B7%60ZxZ%2C%B6%A8%B6%B8eI%B2%E4Z%A6Y%EE%B6%BCn%85Z9Y%A5XUZ%5D%B3F%AD%9D%AD%25%D6%BB%AD%BB%A7%11%A7%B9N%93N%AB%9E%D6g%C3%B0%F1%B6%C9%B6%A9%B7%19%B0%E5%D8%06%DB%AE%B6m%B6%7Dagb%17g%B7%C5%AE%C3%EE%93%BD%93%7D%BA%7D%8D%FD%3D%07%0D%87%D9%0E%AB%1DZ%1D~s%B4r%14%3AV%3A%DE%9A%CE%9C%EE%3F%7D%C5%F4%96%E9%2FgX%CF%10%CF%D83%E3%B6%13%CB)%C4i%9DS%9B%D3Gg%17g%B9s%83%F3%88%8B%89K%82%CB.%97%3E.%9B%1B%C6%DD%C8%BD%E4Jt%F5q%5D%E1z%D2%F5%9D%9B%B3%9B%C2%ED%A8%DB%AF%EE6%EEi%EE%87%DC%9F%CC4%9F)%9EY3s%D0%C3%C8C%E0Q%E5%D1%3F%0B%9F%950k%DF%AC~OCO%81g%B5%E7%23%2Fc%2F%91W%AD%D7%B0%B7%A5w%AA%F7a%EF%17%3E%F6%3Er%9F%E3%3E%E3%3C7%DE2%DEY_%CC7%C0%B7%C8%B7%CBO%C3o%9E_%85%DFC%7F%23%FFd%FFz%FF%D1%00%A7%80%25%01g%03%89%81A%81%5B%02%FB%F8z%7C!%BF%8E%3F%3A%DBe%F6%B2%D9%EDA%8C%A0%B9A%15A%8F%82%AD%82%E5%C1%AD!h%C8%EC%90%AD!%F7%E7%98%CE%91%CEi%0E%85P~%E8%D6%D0%07a%E6a%8B%C3~%0C'%85%87%85W%86%3F%8Ep%88X%1A%D11%975w%D1%DCCs%DFD%FAD%96D%DE%9Bg1O9%AF-J5*%3E%AA.j%3C%DA7%BA4%BA%3F%C6.fY%CC%D5X%9DXIlK%1C9.*%AE6nl%BE%DF%FC%ED%F3%87%E2%9D%E2%0B%E3%7B%17%98%2F%C8%5Dpy%A1%CE%C2%F4%85%A7%16%A9.%12%2C%3A%96%40L%88N8%94%F0A%10*%A8%16%8C%25%F2%13w%25%8E%0Ay%C2%1D%C2g%22%2F%D16%D1%88%D8C%5C*%1EN%F2H*Mz%92%EC%91%BC5y%24%C53%A5%2C%E5%B9%84'%A9%90%BCL%0DL%DD%9B%3A%9E%16%9Av%20m2%3D%3A%BD1%83%92%91%90qB%AA!M%93%B6g%EAg%E6fv%CB%ACe%85%B2%FE%C5n%8B%B7%2F%1E%95%07%C9k%B3%90%AC%05Y-%0A%B6B%A6%E8TZ(%D7*%07%B2geWf%BF%CD%89%CA9%96%AB%9E%2B%CD%ED%CC%B3%CA%DB%907%9C%EF%9F%FF%ED%12%C2%12%E1%92%B6%A5%86KW-%1DX%E6%BD%ACj9%B2%3Cqy%DB%0A%E3%15%05%2B%86V%06%AC%3C%B8%8A%B6*m%D5O%AB%EDW%97%AE~%BD%26zMk%81%5E%C1%CA%82%C1%B5%01k%EB%0BU%0A%E5%85%7D%EB%DC%D7%ED%5DOX%2FY%DF%B5a%FA%86%9D%1B%3E%15%89%8A%AE%14%DB%17%97%15%7F%D8(%DCx%E5%1B%87o%CA%BF%99%DC%94%B4%A9%AB%C4%B9d%CFf%D2f%E9%E6%DE-%9E%5B%0E%96%AA%97%E6%97%0En%0D%D9%DA%B4%0D%DFV%B4%ED%F5%F6E%DB%2F%97%CD(%DB%BB%83%B6C%B9%A3%BF%3C%B8%BCe%A7%C9%CE%CD%3B%3FT%A4T%F4T%FAT6%EE%D2%DD%B5a%D7%F8n%D1%EE%1B%7B%BC%F64%EC%D5%DB%5B%BC%F7%FD%3E%C9%BE%DBU%01UM%D5f%D5e%FBI%FB%B3%F7%3F%AE%89%AA%E9%F8%96%FBm%5D%ADNmq%ED%C7%03%D2%03%FD%07%23%0E%B6%D7%B9%D4%D5%1D%D2%3DTR%8F%D6%2B%EBG%0E%C7%1F%BE%FE%9D%EFw-%0D6%0DU%8D%9C%C6%E2%23pDy%E4%E9%F7%09%DF%F7%1E%0D%3A%DAv%8C%7B%AC%E1%07%D3%1Fv%1Dg%1D%2FjB%9A%F2%9AF%9BS%9A%FB%5Bb%5B%BAO%CC%3E%D1%D6%EA%DEz%FCG%DB%1F%0F%9C4%3CYyJ%F3T%C9i%DA%E9%82%D3%93g%F2%CF%8C%9D%95%9D%7D~.%F9%DC%60%DB%A2%B6%7B%E7c%CE%DFj%0Fo%EF%BA%10t%E1%D2E%FF%8B%E7%3B%BC%3B%CE%5C%F2%B8t%F2%B2%DB%E5%13W%B8W%9A%AF%3A_m%EAt%EA%3C%FE%93%D3O%C7%BB%9C%BB%9A%AE%B9%5Ck%B9%EEz%BD%B5%7Bf%F7%E9%1B%9E7%CE%DD%F4%BDy%F1%16%FF%D6%D5%9E9%3D%DD%BD%F3zo%F7%C5%F7%F5%DF%16%DD~r'%FD%CE%CB%BB%D9w'%EE%AD%BCO%BC_%F4%40%EDA%D9C%DD%87%D5%3F%5B%FE%DC%D8%EF%DC%7Fj%C0w%A0%F3%D1%DCG%F7%06%85%83%CF%FE%91%F5%8F%0FC%05%8F%99%8F%CB%86%0D%86%EB%9E8%3E99%E2%3Fr%FD%E9%FC%A7C%CFd%CF%26%9E%17%FE%A2%FE%CB%AE%17%16%2F~%F8%D5%EB%D7%CE%D1%98%D1%A1%97%F2%97%93%BFm%7C%A5%FD%EA%C0%EB%19%AF%DB%C6%C2%C6%1E%BE%C9x31%5E%F4V%FB%ED%C1w%DCw%1D%EF%A3%DF%0FO%E4%7C%20%7F(%FFh%F9%B1%F5S%D0%A7%FB%93%19%93%93%FF%04%03%98%F3%FCc3-%DB%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%00uIDATx%DA%7C%CE%B1%0D%82%00%10%85%E1%2FP%D1Zb%03%03X9%86K0%80%AD%95%8D%CBP%91%D09%045%A1%20%EE%60c%A2%256%87%89%84%F0'W%DC%DD%BBw%8F%7Fvhlp%C6%3B%84%20%C5%119%0A%DC%B0G%82g%CCUq5%AD%D40%3B%1D%F0X%2CkdI%08z%8C%8B%3Cw%7C%E6%26%8B7%1D.x%85%C3%8F%13%AE%11%1AJ%B4H%BF%03%00R%8C%18%EA%0AO%15%14%00%00%00%00IEND%AEB%60%82";
				
			var result = X2('/html/body/table['+n+']/tbody/tr/td[1]/div[2]/form/table/tbody/tr/td[2]');
			var result2 = X2('/html/body/table['+n+']/tbody/tr/td[1]/div[2]/form/table/tbody/tr/td[1]');
			
			starcount= X2("//img[@src='graphics/"+style+"/Miscellaneous/star1.gif']");
			starcount=starcount.snapshotLength;
			
			skillcount=X2("//input[@name='SkillID']");
			skillcount=skillcount.snapshotLength;
			
			var elems2 = X2('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/DIV[2]/FORM[1]/DIV');	
			if (elems2 && elems2.snapshotLength > 0) 
			{
				for(i=1; i <= elems2.snapshotLength; i++)
				{
				var div = X('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/DIV[2]/FORM[1]/DIV['+i+']');	
				div.setAttribute('style','display: block;');
				}
			}
			var elems2 = X2('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/DIV[2]/FORM[1]/B');	
			if (elems2 && elems2.snapshotLength > 0) 
			{
				for(i=1; i <= elems2.snapshotLength; i++)
				{
				var div = X('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/DIV[2]/FORM[1]/B['+i+']');	
				//div.setAttribute('style','display: none; visibility: hidden; height: 0');
				}
			}
			var elems2 = X2('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/DIV[2]/FORM[1]/DIV/TABLE[1]/TBODY[1]/TR');	
			if (elems2 && elems2.snapshotLength > 0) 
			{
				for (d=1; d <= elems2.snapshotLength-2; d++) 
				{
					var elem = X2('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/DIV[2]/FORM[1]/DIV['+d+']/TABLE[1]/TBODY[1]/TR');	
					for (t=1; t <= elem.snapshotLength; t++) 
					{
						var elems = X('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/DIV[2]/FORM[1]/DIV['+d+']/TABLE[1]/TBODY[1]/TR['+t+']/TD[1]');	
						if(elems.innerHTML.indexOf("checked",1) >= 0)
						{
							var a = X('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/DIV[2]/FORM[1]/DIV['+d+']/TABLE[1]/TBODY[1]/TR['+t+']/TD[1]/A');	
							a.setAttribute('style','color: red; font-weight: bold;');
							Sreste = X('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/DIV[2]/FORM[1]/DIV['+d+']/TABLE[1]/TBODY[1]/TR['+t+']/TD[2]/SPAN[1]');
							if(Sreste == null) { Sreste=0; }
							else {	Sreste = parseInt(Sreste.innerHTML.replace("%","")); }
							
							Sta = X2('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/DIV[2]/FORM[1]/DIV['+d+']/TABLE[1]/TBODY[1]/TR['+t+']/TD[2]/img[@src="graphics/'+style+'/Miscellaneous/star1.gif"]');
							Sta = parseInt(Sta.snapshotLength);
							
							uptocount[1] += countUpdate((Sta+(Sreste/100)),1.00);
							uptocount[2] += countUpdate((Sta+(Sreste/100)),2.00);
							uptocount[3] += countUpdate((Sta+(Sreste/100)),3.00);
							uptocount[4] += countUpdate((Sta+(Sreste/100)),4.00);
							uptocount[5] += countUpdate((Sta+(Sreste/100)),5.00);
							uptocount[6] += countUpdate((Sta+(Sreste/100)),6.00);
							uptocount[7] += countUpdate((Sta+(Sreste/100)),7.00);
							uptocount[8] += countUpdate((Sta+(Sreste/100)),8.00);
							uptocount[9] += countUpdate((Sta+(Sreste/100)),9.00);
							uptocount[10] += countUpdate((Sta+(Sreste/100)),9.55);
						}
						var elems1 = X('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/DIV[2]/FORM[1]/DIV['+d+']/TABLE[1]/TBODY[1]/TR['+t+']/TD[1]');	
						if(elems1.innerHTML.indexOf("(S)") >= 0)
						{
							secskills++;
						}
						var img	= X('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/DIV[2]/FORM[1]/DIV['+d+']/TABLE[1]/TBODY[1]/TR['+t+']/TD[2]/IMG[6]');
						var st	= "graphics/"+style+"/Miscellaneous/star1.gif";
						if(img)
						{
							if(img.src.indexOf(st) >= 0)
							{
								sss++;
							}	
						}	
						var img	= X('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/DIV[2]/FORM[1]/DIV['+d+']/TABLE[1]/TBODY[1]/TR['+t+']/TD[2]/IMG[7]');
						var st	= "graphics/"+style+"/Miscellaneous/star1.gif";
						if(img)
						{
							if(img.src.indexOf(st) >= 0)
							{
								sss++;
							}	
						}
						var img	= X('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/DIV[2]/FORM[1]/DIV['+d+']/TABLE[1]/TBODY[1]/TR['+t+']/TD[2]/IMG[8]');
						var st	= "graphics/"+style+"/Miscellaneous/star1.gif";
						if(img)
						{
							if(img.src.indexOf(st) >= 0)
							{
								sss++;
							}	
						}	
						var img	= X('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/DIV[2]/FORM[1]/DIV['+d+']/TABLE[1]/TBODY[1]/TR['+t+']/TD[2]/IMG[9]');
						var st	= "graphics/"+style+"/Miscellaneous/star1.gif";
						if(img)
						{
							if(img.src.indexOf(st) >= 0)
							{
								sss++;
							}	
						}	
						var img	= X('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/DIV[2]/FORM[1]/DIV['+d+']/TABLE[1]/TBODY[1]/TR['+t+']/TD[2]/IMG[10]');
						var st	= "graphics/"+style+"/Miscellaneous/star1.gif";
						if(img)
						{
							if(img.src.indexOf(st) >= 0)
							{
								sss++;
							}	
						}				
					}
				}
			}
			
			var inps = X2('/html/body/table['+n+']/tbody/tr/td[1]/div[2]/form/table/tbody/tr/td[1]/input');
			if (inps) 
			{
						
				create_menu(parenttd);
				parenttd.innerHTML += "</table>";
				table = document.createElement('table');
				tr = document.createElement('tr');
				td = document.createElement('td');
				td.setAttribute('colspan','2');
				td.setAttribute('width','229');
				td.setAttribute('align','right');
				td.setAttribute('style','cursor: pointer; color: #33647D;');
				
				tr = document.createElement('tr');
				td = document.createElement('td');
				td.innerHTML = "<b><span id='W_TOTAL_NUM_SKILLS'><small>Compétences</small></span><b>";
				tr.appendChild(td);
				td = document.createElement('td');
				td.setAttribute("align", "right");
				td.innerHTML = "<small>"+ skillcount +" ("+ secskills +" secrètes)</small>";
				tr.appendChild(td);
				table.appendChild(tr);
				
				startot=skillcount*5;
				tr = document.createElement('tr');
				td = document.createElement('td');
				td.innerHTML = "<b><span id='W_TOTAL_NUM_STARS'><small>Etoiles</small></span><b>";
				tr.appendChild(td);
				td = document.createElement('td');
				td.setAttribute("align", "right");
				td.innerHTML = "<small>"+ (starcount-sss) +' / '+ startot +" (+"+ sss +" / " + (5*skillcount) + ")</small>";
				tr.appendChild(td);
				table.appendChild(tr);
				
				
				for(i=1;i<=10;i++)
				{
					if(uptocount[i] > 0)
					{
						tr = document.createElement('tr');
						td = document.createElement('td');
						if(i != 10)
							td.innerHTML = "<b><span><small>Updates ("+i+")</small></span><b>";
						else	
							td.innerHTML = "<b><span><small>Updates (9.55)</small></span><b>";
						tr.appendChild(td);
						td = document.createElement('td');
						td.setAttribute("align", "right");
						if(uptocount[i] <= 1)
							td.innerHTML = "<small>"+ uptocount[i] +" update</small>";
						else
							td.innerHTML = "<small>"+ uptocount[i] +" updates</small>";
						tr.appendChild(td);
						table.appendChild(tr);
					}
				}
				
				parenttd.appendChild(table);
				
				parenttd.innerHTML += "</table>";
			}
			
		}
		function Repertoire()																		{
			if (parenttd) 
				{	
					try
					{
						
						create_menu(parenttd);
						
						a = document.createElement('a');
						a.innerHTML = '<center><span id="W_EXPORTER">Exporter</span></center>';
						a.setAttribute('style', 'cursor: pointer; color: #33647D;padding-bottom: 2px;');
						
						if (window.addEventListener) 
						{
							a.addEventListener ("click",
								function()
								{
									ExportRepertoire();
								},
								false
							   );
						} 
						parenttd.appendChild(a);
						
						a = document.createElement('a');
						a.innerHTML = '<center><span id="W_CONNECTACCOUNT">Se connecter à son compte</span></center>';
						a.setAttribute('style', 'cursor: pointer; color: #33647D;padding-bottom: 2px;');
						a.setAttribute('href', 'http://www.popmundo.fr/klyne/');
						a.setAttribute('target', '_blank');
						
						parenttd.appendChild(a);
						
					}
					catch(ex) 
					{
						GM_log(ex);
					}	
				}
		}
		function ExportRepertoire()															{
			W_DATASEND				= 	"Envoi effectué.";

			var elems = X2('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/TABLE[2]/TBODY[1]/TR[1]/TD[1]/FORM[1]/TABLE[1]/TBODY[1]/TR'); 
			if (elems && elems.snapshotLength) 
			{
				for (var i = 2; i < elems.snapshotLength; i++) 
				{
					nom = X('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/TABLE[2]/TBODY[1]/TR[1]/TD[1]/FORM[1]/TABLE[1]/TBODY[1]/TR['+i+']/TD[4]/A[1]');
					nom = nom.innerHTML;
					popu = X('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/TABLE[2]/TBODY[1]/TR[1]/TD[1]/FORM[1]/TABLE[1]/TBODY[1]/TR['+i+']/TD[5]/SPAN[1]');
					popu = popu.innerHTML;
					popu = parseFloat(popu.replace("%", ""));


					  post('http://www.popmundo.fr/klyne/scripts/export.php', 'nom='+ nom +  '&popu='+ popu +  '&charid='+ protagonist, function(s) {
		   
		 })
				
				}
				alert(W_DATASEND); 
			}
		}
		function SuppRelations()																{
			
			W_DATASEND				= 	"Effectué.";
			var elems = X2('/html/body/table[3]/tbody/tr/td[1]/div[2]/table/tbody/tr/td[5]/a[2]/input');
			
			if (elems && elems.snapshotLength) 
			{
				for (var i = 3; i < elems.snapshotLength+3; i++) 
				{
					
					d = X('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/DIV[2]/TABLE[1]/TBODY[1]/TR['+i+']/TD[5]/A[2]/INPUT');
					if(d.checked == true)
					{
						e = X('/html/body/table[3]/tbody/tr/td[1]/div[2]/table/tbody/tr['+i+']/td[1]');
						f = e.innerHTML.match(/.*CharacterID=([0-9]+)/)[1];
						l = location.href;
						l = l.replace("CharacterDetails.asp?action=Relations&CharacterID="+protagonist+"#", "")
						post(l+"RelationShipDetails.asp", 'action=EndRelationShipConfirm&CharacterID='+ f, function(s) {
				
						})
					}
					
				}
				
				location.href = location.href.replace("#", "");
				location.href = location.href;
			}
		}
		function viewSalesPurchases()														{
			var INCOMES_ROWS_XPATH = "/html/body/table[3]/tbody/tr/td[1]/table[2]/tbody/tr/td/table/tbody/tr[(position()>1)]";

			var incomeNodes = xpathNodes(INCOMES_ROWS_XPATH);
			var addedRows = 0;

			for (var i = 0; i < incomeNodes.snapshotLength; i++) 
			{
				var incomeRow = incomeNodes.snapshotItem(i);
				var incomeCells = incomeRow.getElementsByTagName('td');
				var day = incomeCells[0].innerHTML.match(/([\d\/]{1,})/)[1];
				var income = parseFloat(incomeCells[2].textContent);
				var ammount = parseInt(incomeCells[3].textContent);
				
				if (i == 0) {
					var monthDay = day;
					var dayIncome = 0;
					var dayAmmount = 0;
				}
				else if (monthDay != day) {
					var trClass = incomeRow.getAttribute('class');
					var newRowClass = (trClass == 'DarkColumnHL') ? 'DarkColumnHL' : null;
					var newRow2Class = (newRowClass == 'DarkColumnHL') ? null : 'DarkColumnHL';
					var tbody = incomeRow.parentNode;
					var newRow = tbody.insertRow(i + 1 + addedRows);
					newRow.setAttribute('class', newRowClass);
					for (var j = 0; j <= 3; j++) {
						newCell = newRow.insertCell(j);
						newCell.setAttribute('style', 'border-top-style: groove; border-top-width: thin;');
						newCell.setAttribute('height', 17);
						switch (j){
							case 0:
								newCell.innerHTML = "<b>&nbsp;&nbsp;"+ monthDay +"</b>";
								break;
							case 1:
								newCell.innerHTML = "<b>Total:</b>";
								break;
							case 2:
								newCell.innerHTML = "<b>"+ dayIncome.toFixed(1) +"</b>";
								break;
							case 3:
								newCell.innerHTML = "<b>"+ dayAmmount +"</b>";
								break;
							default:
								break;
						}
					}
					var newRow2 = tbody.insertRow(i + 2 + addedRows);
					newRow2.setAttribute('class', newRow2Class);
					newCell = newRow2.insertCell(0);
					newCell.setAttribute('colspan', 4);
					newCell.innerHTML = "&nbsp;";
					
					var monthDay = day;		
					var dayIncome = 0;
					var dayAmmount = 0;
					
					addedRows += 2;
				}
				
				if (i == (incomeNodes.snapshotLength - 1)) {
				
					dayIncome += income;
					dayAmmount += ammount;
					var trClass = incomeRow.getAttribute('class');
					var newRowClass = (trClass == 'DarkColumnHL') ? null : 'DarkColumnHL';
					var newRow2Class = (newRowClass == 'DarkColumnHL') ? null : 'DarkColumnHL';
					var tbody = incomeRow.parentNode;
					var newRow = tbody.insertRow(-1);
					newRow.setAttribute('class', newRowClass);
					for (var j = 0; j <= 3; j++) {
						newCell = newRow.insertCell(j);
						newCell.setAttribute('style', 'border-top-style: groove; border-top-width: thin;');
						newCell.setAttribute('height', 17);
						switch (j){
							case 0:
								newCell.innerHTML = "<b>&nbsp;&nbsp;"+ monthDay +"</b>";
								break;
							case 1:
								newCell.innerHTML = "<b>Total:</b>";
								break;
							case 2:
								newCell.innerHTML = "<b>"+ dayIncome.toFixed(1) +"</b>";
								break;
							case 3:
								newCell.innerHTML = "<b>"+ dayAmmount +"</b>";
								break;
							default:
								break;
						}
					}
				}
				
				dayIncome += income;
				dayAmmount += ammount;
			}
		}
		function ArtistSong()																		{	
			var elems2 = X2('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/TABLE[2]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[3]/A[2]');	
			
			if (elems2 && elems2.snapshotLength >= 0) 
			{
				
				var reg=new RegExp("(Supprimer)", "g");
				var a = X('/HTML[1]/BODY[1]/TABLE['+n+']/TBODY[1]/TR[1]/TD[1]/TABLE[2]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[1]/TD[3]');	
				txt=a.innerHTML.replace(/supprimer/gi, "Supprimer définivement");
				txt=txt.replace(/discardas/gi, "ConfirmDiscardAS");
				a.innerHTML=txt;
			}
		}
		function ViewObjet()																		{	
			var elems2 = X2('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/DIV[2]/TABLE[1]/TBODY[1]/TR');	
			if (elems2 && elems2.snapshotLength-2 > 0) 
			{
				for(i=1;i<elems2.snapshotLength-2;i++)
				{
					vip = 0;
					idobj = location.href.match(/.*ItemTypeID=([0-9]+)/)[1];
					var a = X('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/DIV[2]/TABLE[1]/TBODY[1]/TR['+i+']/TD[1]/B[1]');	
					if(a.innerHTML == "Objet :") 
						{ objet = X('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/DIV[2]/TABLE[1]/TBODY[1]/TR['+i+']/TD[2]'); objet=objet.innerHTML; } 
					else if(a.innerHTML == "Description :") 
						{ description = X('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/DIV[2]/TABLE[1]/TBODY[1]/TR['+i+']/TD[2]'); description=description.innerHTML; } 
					else if(a.innerHTML == "Catégorie :") 
						{ categorie = X('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/DIV[2]/TABLE[1]/TBODY[1]/TR['+i+']/TD[2]'); categorie=categorie.innerHTML; } 
					else if(a.innerHTML == "Taille/Charge :") 
						{ charge = X('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/DIV[2]/TABLE[1]/TBODY[1]/TR['+i+']/TD[2]'); charge=charge.innerHTML; } 
					else if(a.innerHTML == "Production :") 
						{ production = X('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/DIV[2]/TABLE[1]/TBODY[1]/TR['+i+']/TD[2]'); production=production.innerHTML; } 
					else if(a.innerHTML == "Compétences requises :") 
						{ requis = X('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/DIV[2]/TABLE[1]/TBODY[1]/TR['+i+']/TD[2]'); requis=requis.innerHTML; } 
					else if(a.innerHTML == "Objet VIP :") 
						{ vip = 1; } 
				}
			}
			i++;
			var elems2 = X('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/DIV[2]/TABLE[1]/TBODY[1]/TR['+i+']');	
			a = document.createElement('button');
				if (window.addEventListener) 
						{
							a.addEventListener ("click",
								function()
								{
									if(description) {} else { description=""; }
									post('http://www.popmundo.fr/klyne/scripts/exportObjet.php', 'nom='+ objet +  '&id='+ idobj + '&categorie='+ categorie + '&description='+ description +  '&charge='+ charge, function(s) {

									})
									alert("Ok");
								},
								false
							   );
						} 
				a.innerHTML = "<small><b>Exporter</b></small>";
				elems2.appendChild(a);
		}
		function viewCashLocale()																{	
			
			var elems2 = X2('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/TABLE[2]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR');	
			if (elems2 && elems2.snapshotLength > 0) 
			{
				tot=0;
				GM_log(tot);
				for(i=1;i<=elems2.snapshotLength;i++)
				{
					var a = X('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/TABLE[2]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR['+i+']/TD[2]');	
					a = a.innerHTML;
					a = a.replace("\n		", "");
					a = a.replace("&nbsp;", "");a = a.replace("&nbsp;", "");
					a = a.replace("&nbsp;", "");a = a.replace("&nbsp;", "");
					a = a.replace("&nbsp;", "");a = a.replace("&nbsp;", "");
					a = a.replace(" €", "");
					a = parseInt(a);
					tot = tot + a;
				}
			}
			tot = format(tot,"2"," ");
			i--;
			var elems = X('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/TABLE[2]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]');	
			tr = document.createElement('tr');
			td = document.createElement('td');
			td.innerHTML = '<b><span id="W_TOTAL">Total</span></b>';
			td.setAttribute("style","text-align: right; border-top: 1px solid black;")
			tr.appendChild(td);
			td = document.createElement('td');
			td.setAttribute("style","border-top: 1px solid black;")
			td.setAttribute("colspan","2")
			td.innerHTML = '<small>'+tot+' €</small>';
			tr.appendChild(td);
			elems.appendChild(tr);
		}
		function viewConditionLocale()													{	
		var MSG_IMPROVE = '[Améliorer]';
		var MSG_DONE = '[Fait]';
			function backgroundClick(evt) {
				var target = this;
				if (target.innerHTML != MSG_DONE) {
					var r = new XMLHttpRequest();
					r.open('GET', this.href, true);
					r.onreadystatechange = function() {
						if (r.readyState == 4 && r.status == 200) {
							target.innerHTML = MSG_DONE;
						}
					}
					r.send(null);
				}
				evt.stopPropagation();
				evt.preventDefault();
			}

			for (var index = 1; index < document.links.length; index++) {
				var a = document.links[index];
				var previous_a = document.links[index - 1];
				var valid = (a.href.indexOf('Rules.asp?action=Scoring&Word=') >= 0);
				if (valid) {
					var score = a.href.match(/Word=(\d+)/)[1];
					if (score <= 21) {
						var locale_id = previous_a.href.match(/LocaleID=(\d+)/)[1];
						a.href = 'Company.asp?action=ImproveStateConfirm&LocaleID='+locale_id
						a.innerHTML = MSG_IMPROVE;
						a.addEventListener('click', backgroundClick, true);
					}
				}
			}
		}
		function showHoroscopes()																{
			var elems = X2('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/DIV[2]/TABLE[1]/TBODY[1]/TR[1]/TD[3]/DIV');	
			if (elems) 
			{
				for(i=2;i<=elems.snapshotLength;i++)
				{
					elem = X('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/DIV[2]/TABLE[1]/TBODY[1]/TR[1]/TD[3]/DIV['+i+']');	
					if(elem.innerHTML.indexOf("Mon horoscope m'a dit que je devrais mettre la main sur cet objet :") >= 0)
					{
						objet = X('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/DIV[2]/TABLE[1]/TBODY[1]/TR[1]/TD[3]/DIV['+i+']/B');	
						
						GM_xmlhttpRequest({
							method: 'GET',
							url: "http://popmundo.fr/klyne/scripts/horoscopes.php?o="+objet.innerHTML,
							headers: {
								'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
								'Accept': 'application/atom+xml,application/xml,text/xml',
							},
							onload: function(responseDetails) {
								cat = responseDetails.responseText;
								var  reg=new  RegExp("[/]+", "g");
								var r=responseDetails.responseText.split(reg);
								cat = ' <small>['+r[1]+']</small>';
								
								for(x=2;x<=elems.snapshotLength;x++)
								{
									elem2 = X('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/DIV[2]/TABLE[1]/TBODY[1]/TR[1]/TD[3]/DIV['+x+']');	
									if(elem2.innerHTML.indexOf("Mon horoscope m'a dit que je devrais mettre la main sur cet objet :") >= 0)
									{
										objet2 = X('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/DIV[2]/TABLE[1]/TBODY[1]/TR[1]/TD[3]/DIV['+x+']/B');	
										if(objet2.innerHTML == r[0])	objet2.innerHTML += cat;
									}
								}
							}
						});
					}
				}
			}
		}
	}