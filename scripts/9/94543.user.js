// ==UserScript==
// @name           browsePlayers_SR
// @namespace      Browse Players - SR
// @include        http://www.grid-iron.org/index.php?page=club&subpage=pldetails*
// @include        http://grid-iron.org/index.php?page=club&subpage=pldetails*
// ==/UserScript==

//original by pstimpel
//srpski jezik by ulero

window.setTimeout( function()
{
	var url = window.location.href;
	var praefix="";
	if (window.location.href.indexOf('//www.')>=0) {
		praefix="www.";
	}
	var plyrid= url.substring(url.indexOf('playerid=')+9, url.length);
	var jetzt=new Date().getTime();
	var lastcheck = GM_getValue("GIbrowseRosterlastchecktime", null);
	if(!lastcheck) {
		lastcheck=0;
	}
	var diff=parseInt(jetzt) - parseInt(lastcheck);
	if(diff > 300000) {
		GM_setValue("GIFriends_lastchecktime",jetzt.toString());
		var geturl="http://"+praefix+"grid-iron.org/index.php?page=club&subpage=players";
		getPage(geturl);
	}
	var browsediv = document.createElement("div");
	browsediv.setAttribute("id","browsediv");
	idbefore=getid(plyrid,"before");
	idafter=getid(plyrid,"after");
	
	linkbefore="bgcolor=lightblue><a href=\"http://"+praefix+"grid-iron.org/index.php?page=club&subpage=pldetails&playerid="+idbefore+"\">&lt;&lt;&nbsp;Prethodni</A>";
	if(idbefore=="") {
		linkbefore=">&nbsp;";
	}
	linkafter="bgcolor=lightblue><a href=\"http://"+praefix+"grid-iron.org/index.php?page=club&subpage=pldetails&playerid="+idafter+"\">Sledeći&nbsp;&gt;&gt;</A>";
	if(idafter=="") {
		linkafter=">&nbsp;";
	}
	browsediv.innerHTML="<table border=0 cellpadding=0 cellpsacing=0 witdh=580><tr><td width=20 "+linkbefore+"</td><td width=540></td><td width=20 "+linkafter+"</td></tr></table>";
	var player_stats_table = document.getElementById("profile");
	player_stats_table.parentNode.insertBefore(browsediv, player_stats_table);

	function getid(plyrid,mode) {
		var allplids=GM_getValue("GIbrowseRosterids", null);
		if(!allplids) {
			allplids="";
		}
		eachid=allplids.split(/:/);
		var tidbefore="";
		var tidafter="";
		returnvalue="";
		for(i=0;i<eachid.length;i++) {
			if(eachid[i]==plyrid) {
			
				if(mode=="before") {
					if(i>0) {
						tidbefore=eachid[i-1];
					}
					returnvalue=tidbefore;
				} else {
					if(i==(eachid.length-1)) {
						tidafter="";						
					} else {
						tidafter=eachid[i+1];
					}
					returnvalue=tidafter;
				}
			} 
		}
		
		return returnvalue;
	}

	function getPage(geturl){
   GM_xmlhttpRequest({
		method: 'GET',
		url: geturl,
		headers: {
	    'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.9.0.6) Gecko/2009011913 Firefox/3.0.6',
	    'Accept': 'text/xml'
   		},
   		onload: function(page) {
			var theid,thisid,oldid,allid;
			allid="";
			theid=page.responseText.split(/&playerid/);
			for(i=1;i<theid.length;i++) {
				thisid=theid[i].split(/\"/);
				cleanedid=thisid[0].replace("'", "");
				cleanedid=cleanedid.replace("=", "");
				if(allid.indexOf(cleanedid)<0) {
					allid=allid + cleanedid + ":"; 
				}
			}
			GM_setValue("GIbrowseRosterids",allid);
   		}
	});
}
	
},100);