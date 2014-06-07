// ==UserScript==
// @name           AniDB2A-P
// @namespace      AniDB2A-P
// @description    adds Anime-Planet links to AniDB's anime pages
// @include        http://anidb.net/perl-bin/animedb.pl?show=anime&aid=*
// @include        http://www.anime-planet.com/anime/*
// ==/UserScript==

//### Link Settings ###############
var a_p=true;		//Anime-Planet
var asuki=false;		//AnimeSuki
var mal=false;		//MyAnimeList
var env=false;		//Envirosphere
var bu=false;		//Baka-Updates
var tt=false;		//TokyoTosho

var a_p2anidb=true;  //from Anime-Planet back to AniDB
//### Link Setting END ############

//For FireFox2: 
if (!document.getElementsByClassName) {
	 document.getElementsByClassName = function(clsName) {
	 	 var retVal = new Array();
	 	 var elements = document.getElementsByTagName("*");
	 	 for(var i = 0;i < elements.length;i++) {
	 	  if(elements[i].className.indexOf(" ") >= 0) {
	 	  	var classes = elements[i].className.split(" ");
	 	  	for(var j = 0;j < classes.length;j++) {
	 	  		if(classes[j] == clsName) retVal.push(elements[i]);
	 	  	}
	 	 } else if(elements[i].className == clsName) retVal.push(elements[i]);
	 } return retVal; 
  }
}

var url=location.href;

if (url.indexOf("anidb")!=-1) {
  // AniDB
var labels=document.getElementById("tab_2_pane").getElementsByTagName("label");
var str,eng,main;
var res=(document.getElementById("tab_1_pane").getElementsByClassName("resources")[0]).getElementsByClassName("value")[0];
for(var i=0; i<labels.length; i++) {
	if ((labels[i].parentNode.innerHTML.lastIndexOf('<span>en</span>'))!=-1) {
		eng=labels[i].firstChild.data;
		eng=eng.replace(/\s\((19|20)\d{2}\)$/,'');
		eng=eng.replace(/\W+/g,'-').replace(/(^-)|(-$)/g,'');
		break;
		}
}
main=document.getElementById("layout-main").getElementsByTagName("img")[0].getAttribute("alt");
main=main.replace(/\s\((19|20)\d{2}\)$/,'');
main=main.replace(/\W+/g,'-').replace(/(^-)|(-$)/g,'');

str=main.replace(/-/g,'+').toLowerCase();
if (a_p) { res.innerHTML+=', <a href="http://www.anime-planet.com/anime/'+((eng) ? eng : main )+'" rel="anidb::extern">Anime&#8209;Planet</a>'; }

if (asuki) { res.innerHTML+=', <a href="http://animesuki.com/search.php?query='+str+'&torrent=yes" rel="anidb::extern">asuki</a>'; }
if (mal) { res.innerHTML+=', <a href="http://myanimelist.net/anime.php?q='+str.replace(/\+/,' ')+'" rel="anidb::extern">MAL</a>'; }
if (env) { res.innerHTML+=', <a href="http://www.envirosphere.com/search.php?search='+str+'&include=a" rel="anidb::extern">env</a>'; }
if (bu) { res.innerHTML+=', <a href="http://baka-updates.com/search/search?searchitem='+str+'&submit.x=0&submit.y=0&submit=submit&searchradio=releases" rel="anidb::extern">BU</a>'; }
if (tt) { res.innerHTML+=', <a href="http://tokyotosho.info/search.php?terms='+str+'" rel="anidb::extern">TT</a>'; }

}
else if (url.indexOf("anime-planet")!=-1) { 
	  //Anime-Planet
	var titleH1=document.getElementById('anime').getElementsByTagName("h1")[0];
	str=titleH1.innerHTML;
	str=str.replace(/\W+/g,"+");
	var anidbsearch='http://anidb.net/perl-bin/animedb.pl?show=animelist&adb.search='+str+'&do.search=search';
	titleH1.innerHTML='<a title="AniDB search" href="'+anidbsearch+'">'+titleH1.innerHTML+'</a>';
	
	var recs=document.getElementById("recsArea").getElementsByClassName('recTitle');
	for (i=0;i<recs.length;i++) {
		relink=recs[i].getElementsByTagName('a')[0];
		str=relink.innerHTML.replace(/\W+/g,"+");
		anidbsearch='http://anidb.net/perl-bin/animedb.pl?show=animelist&adb.search='+str+'&do.search=search';
		relink.href=anidbsearch;
		relink.setAttribute("title","AniDB search");
	}
}
