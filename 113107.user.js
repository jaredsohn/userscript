// ==UserScript==
// @name				Episode Butler Xtender
// @namespace		http://jparkerweb.com
// @description		[ver 3.1.5] If you use Episode Butler then this is for you!  This script will add links to 3rd party nzb / torrent search sites for shows that are listed on Episode Butler's "Upcoming episodes" and "Missed Episodes" section on the Home Page.  Direct links to each Show's Page, as well as "Mark Dwonloaded" options have been added.
// @version     		3.1.5
// @date 				9-15-2011
// @include				http://*
// ==/UserScript==


if(document.title == 'Episode Butler - Home' || document.title == 'Episode Butler - Configure'){
	var $;
	
	//set posted Episode Butler Xtender Config
	if(document.title == 'Episode Butler - Configure'){		
		var EBX_QSEasyNews = getQuerystring('EasyNews','null');
		var EBX_QSNewzbin = getQuerystring('Newzbin','null');
		var EBX_QSNZBs = getQuerystring('NZBs','null');
		var EBX_QSNZBsRus = getQuerystring('NZBsRus','null');
		var EBX_QSNZBIndex = getQuerystring('NZBIndex','null');
		var EBX_QSNewzLeech = getQuerystring('NewzLeech','null');
		var EBX_QSNZBMatrix = getQuerystring('NZBMatrix','null');
		var EBX_QSNZBsu = getQuerystring('NZBsu','null');
		var EBX_QSBTJunkie = getQuerystring('BTJunkie','null');
		var EBX_QSNewTorrents = getQuerystring('NewTorrents','null');
		var EBX_QSKickAssTorrents = getQuerystring('KickAssTorrents','null');
		var EBX_QSThePirateBay = getQuerystring('ThePirateBay','null');
		
		if(EBX_QSEasyNews == 'false'){GM_setValue('EasyNews','false');}  else if(EBX_QSEasyNews == 'true'){GM_setValue('EasyNews','true');}
		if(EBX_QSNewzbin == 'false'){GM_setValue('Newzbin','false');}  else if(EBX_QSNewzbin == 'true'){GM_setValue('Newzbin','true');}
		if(EBX_QSNZBs == 'false'){GM_setValue('NZBs','false');}  else if(EBX_QSNZBs == 'true'){GM_setValue('NZBs','true');}
		if(EBX_QSNZBsRus == 'false'){GM_setValue('NZBsRus','false');}  else if(EBX_QSNZBsRus == 'true'){GM_setValue('NZBsRus','true');}
		if(EBX_QSNZBIndex == 'false'){GM_setValue('NZBIndex','false');}  else if(EBX_QSNZBIndex == 'true'){GM_setValue('NZBIndex','true');}
		if(EBX_QSNewzLeech == 'false'){GM_setValue('NewzLeech','false');}  else if(EBX_QSNewzLeech == 'true'){GM_setValue('NewzLeech','true');}
		if(EBX_QSNZBMatrix == 'false'){GM_setValue('NZBMatrix','false');}  else if(EBX_QSNZBMatrix == 'true'){GM_setValue('NZBMatrix','true');}
		if(EBX_QSNZBsu == 'false'){GM_setValue('NZBsu','false');}  else if(EBX_QSNZBsu == 'true'){GM_setValue('NZBsu','true');}
		if(EBX_QSBTJunkie == 'false'){GM_setValue('BTJunkie','false');}  else if(EBX_QSBTJunkie == 'true'){GM_setValue('BTJunkie','true');}
		if(EBX_QSNewTorrents == 'false'){GM_setValue('NewTorrents','false');}  else if(EBX_QSNewTorrents == 'true'){GM_setValue('NewTorrents','true');}
		if(EBX_QSKickAssTorrents == 'false'){GM_setValue('KickAssTorrents','false');}  else if(EBX_QSKickAssTorrents == 'true'){GM_setValue('KickAssTorrents','true');}
		if(EBX_QSThePirateBay == 'false'){GM_setValue('ThePirateBay','false');}  else if(EBX_QSThePirateBay == 'true'){GM_setValue('ThePirateBay','true');}
	}
	
	//ready Episode Butler Xtender Config
	var EBX_showEasyNews = GM_getValue('EasyNews');
	var EBX_showNewzbin = GM_getValue('Newzbin');
	var EBX_showNZBs = GM_getValue('NZBs');
	var EBX_showNZBsRus = GM_getValue('NZBsRus');
	var EBX_showNZBIndex = GM_getValue('NZBIndex');
	var EBX_showNewzLeech = GM_getValue('NewzLeech');
	var EBX_showNZBMatrix = GM_getValue('NZBMatrix');
	var EBX_showNZBsu = GM_getValue('NZBsu');
	var EBX_showBTJunkie = GM_getValue('BTJunkie');
	var EBX_showNewTorrents = GM_getValue('NewTorrents');
	var EBX_showKickAssTorrents = GM_getValue('KickAssTorrents');
	var EBX_showThePirateBay = GM_getValue('ThePirateBay');
}


//get QueryString values
function getQuerystring(key, default_){
	if (default_==null) {
		default_="";
	}
	key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
	var qs = regex.exec(window.location.href);
	if(qs == null){
		return default_;
	}
	else{
		return qs[1];
	}
}


// version check function that will alert when an update exists
function checkForEpisodeButlerXtenderUpdate() {
	var local_version = '3.1.5';
	var date = new Date();
	var today = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
	var lastCheck = GM_getValue('lastCheck');

	if (!lastCheck || lastCheck != today) {
		GM_xmlhttpRequest({
			method: "GET",
			url: 'http://dl.dropbox.com/u/2569529/grease_monkey_scripts/episode_butler_xtender/version.txt',
			onload: function(results) {
			var global_version = results.responseText;
				if (global_version.length && global_version != local_version) {
					if (confirm('Episode Butler Xtender: Version '+ global_version +' is now available. Update?)')) {
						//greasemonkey script
						GM_openInTab('http://dl.dropbox.com/u/2569529/grease_monkey_scripts/episode_butler_xtender/episode_butler_xtender.user.js');
					}
				}
			},
		});
	}
	GM_setValue('lastCheck',today);
}


// Add jQuery
(function(){
	if(document.title == 'Episode Butler - Home' || document.title == 'Episode Butler - Configure'){
	    if (typeof unsafeWindow.jQuery == 'undefined') {
	        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement, GM_JQ = document.createElement('script');
	        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
	        GM_JQ.type = 'text/javascript';
	        GM_JQ.async = true;
	        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	    }
	    waitEpisodeButlerXtenderCode();
	}
})();


// Check if jQuery's loaded
function waitEpisodeButlerXtenderCode() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(waitEpisodeButlerXtenderCode, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        episodeButlerXtenderCode();
    }
}


// All your GreaseMonkey code must be inside this function
function episodeButlerXtenderCode() {
	if(document.title == 'Episode Butler - Home' || document.title == 'Episode Butler - Configure'){
		//see if there is a new version
		checkForEpisodeButlerXtenderUpdate();
		
		//add easynews account links
		$("ul.menu").append("<li><a title='Get an EasyNews Usenet Account'' target='EasyNews' href='http://www.easynews.com/fromafriend.html?ref_key=c6f36cbd67927048c959f9603462295aa4e7375f '> <img border='0' align='absmiddle' src='http://members.easynews.com/favicon.ico' /> Get an EasyNews Account </a></li>");
		$("div.body").append(" <a title='Get an EasyNews Usenet Account'' target='EasyNews' href='http://www.easynews.com/fromafriend.html?ref_key=c6f36cbd67927048c959f9603462295aa4e7375f '><img border='0' align='absmiddle' src='http://members.easynews.com/favicon.ico' /> Get an EasyNews Account </a>");
		
		//consolidate home menu text
		$("p:contains('Next search for newly posted episodes will be')").remove();
		$("p:contains('New and/or updated show info will be fetched')").remove();
		$("div.body > p:first").prepend("<a href=\"index?search=now\">Run EB Search Now</a> - ");
		
		//collapse "Upcoming episodes" and add clickable toggle
		$("ul#upcomingEpisodes").hide('fast');
		$("h3:contains('Upcoming episodes')").css("cursor","hand").css("cursor","pointer");
		$("h3:contains('Upcoming episodes')").click(function() {
			$('ul#upcomingEpisodes').toggle('fast');
		});
		
		//add clickable toggle to missedEpisodes
		$("h3:contains('Missed episodes')").css("cursor","hand").css("cursor","pointer");
		$("h3:contains('Missed episodes')").click(function() {
			$('ul#missedEpisodes').toggle('fast');
		});
		
		//correct known bad seasons from TV Rage
		//- Dirty Jobs: season 6 --> 8
		$("li>a:contains('Dirty Jobs - 6x')").each(function(){
			$(this).html($(this).html().replace("Dirty Jobs - 6x","Dirty Jobs - 8x"));
		});
		
		//config page Xtender settings
		if(document.title == 'Episode Butler - Configure'){
			var configURL = "" + document.location + "";
			if(configURL.indexOf("?") == -1){} else{configURL = configURL.substring(0, configURL.indexOf('?'));}
			
			var configString;
			configString = "<br /><br />";
			configString += "<b>Episode Butler Xtender Settings</b>:<br />";
			
			configString += " <img border='0' title='EasyNews' align='absmiddle' src='http://members.easynews.com/favicon.ico' />";
			if(EBX_showEasyNews == 'false'){configString += "<input id='chkXtenderEasyNews' type='checkbox' />";} else{configString += "<input id='chkXtenderEasyNews' type='checkbox' checked />";}
			
			configString += " <img border='0' title='Newzbin' align='absmiddle' src='http://www.newzbin.com/favicon.ico' />";
			if(EBX_showNewzbin == 'false'){configString += "<input id='chkXtenderNewzbin' type='checkbox' />";} else{configString += "<input id='chkXtenderNewzbin' type='checkbox' checked />";}
							
			configString += " <img border='0' title='NZBs.org' align='absmiddle' src='http://nzbs.org/favicon.ico' />";
			if(EBX_showNZBs == 'false'){configString += "<input id='chkXtenderNZBs' type='checkbox' />";} else{configString += "<input id='chkXtenderNZBs' type='checkbox' checked />";}
			
			configString += " <img border='0' title='NZBsRus' align='absmiddle' src='http://www.nzbsrus.com/favicon.ico' />";
			if(EBX_showNZBsRus == 'false'){configString += "<input id='chkXtenderNZBsRus' type='checkbox' />";} else{configString += "<input //id='chkXtenderNZBsRus' type='checkbox' checked />";}
			
			configString += " <img border='0' title='NZBIndex' align='absmiddle' src='http://www.nzbindex.nl/favicon.ico' />";
			if(EBX_showNZBIndex == 'false'){configString += "<input id='chkXtenderNZBIndex' type='checkbox' />";} else{configString += "<input //id='chkXtenderNZBIndex' type='checkbox' checked />";}
			
			configString += " <img border='0' title='NewzLeech' align='absmiddle' src='http://www.newzleech.com/favicon.ico' />";
			if(EBX_showNewzLeech == 'false'){configString += "<input id='chkXtenderNewzLeech' type='checkbox' />";} else{configString += "<input id='chkXtenderNewzLeech' type='checkbox' checked />";}
			
			configString += " <img border='0' title='NZBMatrix' align='absmiddle' src='http://nzbmatrix.com/favicon.ico' />";
			if(EBX_showNZBMatrix == 'false'){configString += "<input id='chkXtenderNZBMatrix' type='checkbox' />";} else{configString += "<input id='chkXtenderNZBMatrix' type='checkbox' checked />";}
			
			configString += " <img border='0' title='NZBsu' align='absmiddle' src='http://nzb.su/views/images/favicon.ico' />";
			if(EBX_showNZBsu== 'false'){configString += "<input id='chkXtenderNZBsu' type='checkbox' />";} else{configString += "<input id='chkXtenderNZBsu' type='checkbox' checked />";}

			configString += " <img border='0' title='BTJunkie.org' align='absmiddle' src='http://btjunkie.org/favicon.ico' />";
			if(EBX_showBTJunkie == 'false'){configString += "<input id='chkXtenderBTJunkie' type='checkbox' />";} else{configString += "<input //id='chkXtenderBTJunkie' type='checkbox' checked />";}
			
			configString += " <img border='0' title='NewTorrents.info' align='absmiddle' src='http://www.newtorrents.info/favicon.ico' />";
			if(EBX_showNewTorrents == 'false'){configString += "<input id='chkXtenderNewTorrents' type='checkbox' />";} else{configString += "<input id='chkXtenderNewTorrents' type='checkbox' checked />";}
			
			configString += " <img border='0' title='KickAssTorrents.ph' align='absmiddle' src='http://www.kat.ph/favicon.ico' />";
			if(EBX_showKickAssTorrents == 'false'){configString += "<input id='chkXtenderKickAssTorrents' type='checkbox' />";} else{configString += "<input id='chkXtenderKickAssTorrents' type='checkbox' checked />";}

			configString += " <img border='0' title='thePirateBay.org' align='absmiddle' src='http://thepiratebay.org/favicon.ico' />";
			if(EBX_showThePirateBay == 'false'){configString += "<input id='chkXtenderThePirateBay' type='checkbox' />";} else{configString += "<input id='chkXtenderThePirateBay' type='checkbox' checked />";}
			
			configString += "<br /><br /><input type=\"button\" value=\"save Xtender settings\" onClick=\"javascript: document.location = '"+ configURL +"?EasyNews='+ document.getElementById(\'chkXtenderEasyNews\').checked +'&Newzbin='+ document.getElementById(\'chkXtenderNewzbin\').checked +'&NZBs='+ document.getElementById(\'chkXtenderNZBs\').checked +'&NZBsRus='+ document.getElementById(\'chkXtenderNZBsRus\').checked +'&NZBIndex='+ document.getElementById(\'chkXtenderNZBIndex\').checked +'&NewzLeech='+ document.getElementById(\'chkXtenderNewzLeech\').checked +'&NZBMatrix='+ document.getElementById(\'chkXtenderNZBMatrix\').checked +'&NZBsu='+ document.getElementById(\'chkXtenderNZBsu\').checked +'&BTJunkie='+ document.getElementById(\'chkXtenderBTJunkie\').checked +'&NewTorrents='+ document.getElementById(\'chkXtenderNewTorrents\').checked +'&KickAssTorrents='+ document.getElementById(\'chkXtenderKickAssTorrents\').checked +'&ThePirateBay='+ document.getElementById(\'chkXtenderThePirateBay\').checked;\" />";
			configString += "<br /><br /><br />";
				
			$("ul.submenu").after(configString);
		}
	
		var showName, showNameX, showPage, showId, episodeId
		
		$("#missedEpisodes > li,#upcomingEpisodes > li").each(function(){
			showId = $(this).attr('showid');
			episodeId = $(this).attr('episodeid');
			$(this).attr('id','li_s'+ showId +'e'+ episodeId +'')
			showName = $(this).text();
			
			if(showName != "No upcoming episodes known..." && showName != "No downloaded episodes known..."){
				//gen show page link
				showPage = " - <a style='color:maroon;' title='Show Page' href='/episode?showid=" + showId + "'> show page </a> "
				
				//gen checkbox for marking show episode as downloaded
				markDownloaded = " - <input title='mark downloaded?' type='checkbox' onchange='javascript: doRequest(\"ajax?showid="+ showId +"&amp;episodeid="+ episodeId +"&amp;action=download\"+(this.checked?\"ed\":\"\")); document.getElementById(\"li_s"+ showId +"e"+ episodeId +"\").style.display=\"none\";'> <font size=\"1\">(mark downloaded?)</font> ";
				
				//get showNameX
				showNameX = showName;
				
				//find/format Season
				if(showName.match(/ [0-9]{1}x/)){
					showName = showName.replace(/ ([0-9]{1})x([0-9]{1,2})/,' 0$1x$2');
				}
				//find/format Episode
				if(showName.match(/ [0-9]{2}x[0-9]{1} /)){
					showName = showName.replace(/ ([0-9]{2})x([0-9]{1}) /,' $1x0$2 ');
				}
				//cleanup to S00E00
				showName = showName.replace(/ ([0-9]{2})x([0-9]{2}) /,' s$1e$2 ')
				
				//string formatting for know show title issues
				showName = showName.replace(" Crime Scene Investigation "," ");
				showName = showName.replace("CSI NY","CSI New York");
				
				//misc string formatting (showName)
				dashPosition = showName.indexOf(' - ');
				showName = showName.substring(0, showName.indexOf(' - ', dashPosition + 1));
				showName = showName.replace("\&","");
				showName = showName.replace(" - "," ");
				showName = showName.replace(":","");
				showName = showName.replace("!","");
				showName = showName.replace("'","");
				showName = showName.replace("  "," ");

				//misc string formatting (showNameX)
				dashPosition = showNameX.indexOf(' - ');
				showNameX = showNameX.substring(0, showNameX.indexOf(' - ', dashPosition + 1));
				showNameX = showNameX.replace("\&","");
				showNameX = showNameX.replace(" - "," ");
				showNameX = showNameX.replace(":","");
				showNameX = showNameX.replace("!","");
				showNameX = showNameX.replace("'","");
				showNameX = showNameX.replace("  "," ");
								
				//additional string formatting for know show title issues
				showNameX = showNameX.replace("CSI New York","CSI NY");

		
				//Usenet Link
				EasyNews = " <a target='_blank' title='EasyNews' href='http://members.easynews.com/global4/search.html?gps="+ showName +"&amp;fty[]=VIDEO&amp;fty[]=PARITY&amp;s1=dsize&amp;s1d=-&amp;s2=dtime&amp;s2d=-&amp;s3=nrfile&amp;s3d=%2B&amp;pby=100&amp;pno=1&amp;sS=0&amp;u=1&amp;hthm=1&amp;fly=2'> <img border='0' align='absmiddle' src='http://members.easynews.com/favicon.ico' /></a> ";
				Newzbin = " <a target='_blank' title='Newzbin' href='http://www.newzbin.com/search/query/?q="+ showNameX +"&amp;area=-1&amp;fpn=p&amp;searchaction=Go&amp;btnG_x=0&amp;btnG_y=0&amp;btnG=Go&amp;areadone=-1'> <img border='0' align='absmiddle' src='http://www.newzbin.com/favicon.ico' /></a> ";				    
				NZBs = " <a target='_blank' title='NZBs' href='http://nzbs.org/index.php?action=search&amp;q="+ showName +"'> <img border='0' align='absmiddle' src='http://nzbs.org/favicon.ico' /></a> ";
				NZBsRus = " <a target='_blank' title='NZBsRus' href='http://www.nzbsrus.com/nzbbrowse.php?searchwhere=title&amp;searchtext="+ showName +"'> <img border='0' align='absmiddle' src='http://www.nzbsrus.com/favicon.ico' /></a> ";
				NZBIndex = " <a target='_blank' title='NZBIndex' href='http://www.nzbindex.nl/search/?q="+ showName +"'> <img border='0' align='absmiddle' src='http://www.nzbindex.nl/favicon.ico' /></a> ";
				NewzLeech = " <a target='_blank' title='NewzLeech' href='http://www.newzleech.com/?group=&amp;minage=&amp;age=&amp;min=min&amp;max=max&amp;q="+ showName +"&amp;m=search&amp;adv='> <img border='0' align='absmiddle' src='http://www.newzleech.com/favicon.ico' /></a> ";
				NZBMatrix = " <a target='_blank' title='NZBMatrix' href='http://nzbmatrix.com/nzb-search.php?search="+ showName +"&amp;cat=tv-all'> <img border='0' align='absmiddle' src='http://nzbmatrix.com/favicon.ico' /></a> ";
				NZBsu = " <a target='_blank' title='NZBsu' href='https://nzb.su/search/"+ showName +"'> <img border='0' align='absmiddle' src='http://nzb.su/views/images/favicon.ico' /></a> ";
				
				//Bit Torrent Links
				BTJunkie = " <a target='_blank' title='BTJunkie' href='http://btjunkie.org/search?q="+ showName +"'> <img border='0' align='absmiddle' src='http://btjunkie.org/favicon.ico' /></a> ";
				NewTorrents = " <a target='_blank' title='NewTorrents' href='http://www.newtorrents.info/search/"+ showName +"'> <img border='0' align='absmiddle' src='http://www.newtorrents.info/favicon.ico' /></a> ";
				KickAssTorrents = " <a target='_blank' title='KickAssTorrents' href='http://www.kat.ph/search/"+ showName +"/'> <img border='0' align='absmiddle' src='http://www.kat.ph/favicon.ico' /></a> ";
				ThePirateBay = " <a target='_blank' title='ThePirateBay' href='http://thepiratebay.org/search/"+ showName +"'> <img border='0' align='absmiddle' src='http://thepiratebay.org/favicon.ico' /></a> ";
				
				//read config to show links
				if(EBX_showEasyNews == 'false'){ EasyNews = '' };
				if(EBX_showNewzbin == 'false'){ Newzbin = '' };
				if(EBX_showNZBs == 'false'){ NZBs = '' };
				if(EBX_showNZBsRus == 'false'){ NZBsRus = '' };
				if(EBX_showNZBIndex == 'false'){ NZBIndex = '' };
				if(EBX_showNewzLeech == 'false'){ NewzLeech = '' };
				if(EBX_showNZBMatrix == 'false'){ NZBMatrix = '' };
				if(EBX_showNZBsu == 'false'){ NZBsu = '' };
				if(EBX_showBTJunkie == 'false'){ BTJunkie = '' };
				if(EBX_showNewTorrents == 'false'){ NewTorrents = '' };
				if(EBX_showKickAssTorrents == 'false'){ KickAssTorrents = '' };
				if(EBX_showThePirateBay == 'false'){ ThePirateBay = '' };
				
				//add new html content to page
				$(this).append('<br />' + EasyNews + Newzbin + NZBs + NZBsRus + NZBIndex + NewzLeech + NZBMatrix + NZBsu + BTJunkie + NewTorrents + KickAssTorrents + ThePirateBay + showPage + markDownloaded + '<br /><br />');
			
			}			
		});
		//add Episode Butler Xtender Verion to footer
		$("p.footer").append(' - [Xtender ver: 3.1.5]');
	}
}