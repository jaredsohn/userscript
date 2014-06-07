// ==UserScript==
// @name           Keep sorting in Y Fantasy Full Games
// @namespace      *
// @description    On the My Team Page, keeps the selected view when changing days, other stats.  On the Player Search page, keeps the sort when changing player types.
// @include        http://*.fantasysports.yahoo.com/*/*
// ==/UserScript==



(function() {
	// my team age -- when changing dates, keep view
	loc_search=document.location.search;
	if(document.getElementById('datenav')){
		datenav=document.getElementById('datenav');
		links=datenav.getElementsByTagName('a');

		loc_search=document.location.search;
		loc_search=loc_search.replace(/date=[\-0-9]*/,"");
		loc_search=loc_search.replace(/\?/,"");
		for (var i in links){
			if(links[i].href){href=links[i].href;
			href=href.replace(/$/,loc_search);
			links[i].href=href;
		}}
	}

	loc_search=document.location.search;
	loc_search=loc_search.replace(/(status=\w*|pos=\w*|stat1=\w*|count=[0-9]*)/g,"");
	loc_search=loc_search.replace(/&&+/g,"&");
	loc_search=loc_search.replace(/(^\?&|&$)/g,"");
	
	// Player search page.  When changing stat filters, keep sort
	if(document.getElementById('statusselect')){
		sel=document.getElementById('statusselect');
		data=loc_search.split('&');
		for (var i in data){
			parts=data[i].split('=');
			ele=document.createElement( 'input' );
			ele.type='hidden';
			ele.name=parts[0];
			ele.value=parts[1];
			sel.parentNode.insertBefore(ele,sel);	
		}
	}
	
	// back to my team page.  if changing  in subnav (ie, ave stats to stats, keep timeframe)
	if(document.getElementById('statnav')){
		nav=document.getElementById('statnav');
		links=nav.getElementsByTagName('a');

//		GM_log(links.length);
		for (i in links){

			if(links[i].href){href=links[i].href;
			if(! href.match(/stat2/) && ! href.match(/stat1=R/)){
				//GM_log(href + links[i]);
				if(href.match(/stat1=A/)){loc_search=loc_search.replace(/stat2=L/,"stat2=AL")}
				if(href.match(/stat1=A/)){loc_search=loc_search.replace(/stat2=S/,"stat2=AS")}
				if(href.match(/stat1=S/)){loc_search=loc_search.replace(/stat2=AL/,"stat2=L")}
				if(href.match(/stat1=S/)){loc_search=loc_search.replace(/stat2=AS/,"stat2=S")}				
				links[i].href=links[i].href+"&"+loc_search;
			}}
		}
	}

})()