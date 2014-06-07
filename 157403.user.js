// ==UserScript==
// @author         llbpeta 
// @name           IMDb Torrent & subs search
// @icon           http://s3.amazonaws.com/uso_ss/icon/157403/large.png
// @version        1.7
// @description    Adds title search links to the most popular torrent sites.
// @include        http://www.imdb.*/title/*
// @include        http://imdb.*/title/*
// @include        http://akas.imdb.*/title/*
// @include        http://www.akas.imdb.*/title/*
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          GM_getValue
// @grant   	   GM_addStyle
// @require        http://userscripts.org/scripts/source/150227.user.js
// ==/UserScript==

autoUpdate(157403, "1.7");

// Hide certain page elements with CSS.
var divs = document.getElementsByTagName('div');
for (var i = 0; i < divs.length; i++)    {
	if (divs[i].id.search(/sponsored_links/) != -1)
	    divs[i].style.display = 'none';
	if (divs[i].id == 'top_rhs_after')
	    divs[i].style.display = 'none';
     }

// Remove all iframes (only used for ads)
var iframes = document.getElementsByTagName('iframe');
for (var i = 0; i < iframes.length; i++)
    iframes[i].style.display = 'none';
//end of ad remover code

var div = document.evaluate ("//div[@class='infobar']", document, null,
XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var title = document.evaluate ("//h1[@class='header']", document, null,
XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

if(!title){ //Sub pages descriptions etc
	title = document.evaluate ("//div[@id='tn15title']//a", document, null,
	XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	div = document.evaluate ("//div[@id='tn15content']", document, null,
XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
if(!title){ //forums
	title = document.evaluate ("//div[@id='tn15']//a", document, null,
	XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(title.innerHTML.match(/Board:/)){ //The first /a isn't what we want on the message board list
		title.parentNode.removeChild(title);
		title = document.evaluate ("//div[@id='tn15']//a", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}
	div = document.evaluate ("//div[@id='tn15']", document, null,
	XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

if(div && title){
    title = title.cloneNode(true);
    var span = document.evaluate (".//span", title, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if(span){
        title.removeChild(span);
    }
    var txt = title.innerHTML;
    txt = txt.replace(/\<br\>[\s\S]*/g, ""); //remove original title
    txt = txt.replace(/^\s+|\s+$/g, ''); //trim the title
    txt = txt.replace(/\s/g, "+"); //replace spaces with +'s
    txt = txt.replace(/[\?#]!\"/g, ""); //remove bad chars
	
    var tab = div.insertBefore(document.createElement("table"), div.firstChild);
    tab.id = "gm_links";
    _addStyle("@namespace url(http://www.w3.org/1999/xhtml); #gm_links td { width:50px; padding:0px } #gm_links img { margin:0 1px 0 0 } #gm_links a { vertical-align:top; font-weight:bold };");
    var tr = tab.appendChild(document.createElement("tr"));
    var img 
//-----------------------------------
//--------other sites-------------
//-----------------------------------
     //Google
    img= "https://www.google.com/images/google_favicon_128.png";
    buildCell(tr, "Google","https://www.google.com/search?hl=en&q=%22"+txt+"%22%20movie&btnG=Search", img);

     //Youtube
    img= "http://images2.wikia.nocookie.net/__cb20120822175713/logopedia/images/6/67/YouTube_2011_Favicon.jpg";
    buildCell(tr, "YouTube","http://www.youtube.com/results?search_query="+txt+" trailer", img);

     //filecrop
     img = "http://filecrop.com/favicon.ico";
     buildCell(tr, "FileCrop","http://www.filecrop.com/search.php?w="+txt+"&size_i=0&size_f=100000000&engine_r=1&engine_h=1&engine_m=1&engine_d=1", img);

     //filestube
     img = "http://static.filestube.com/files/images/favicon.ico";
     buildCell(tr, "FilesTube","http://www.filestube.com/search.html?q="+txt+"&select=rar&sort=dd", img);

//-----------------------------------
//--------SUBTITLES----------- 
//-----------------------------------

    //bsplayer-subtitles
    img= "http://windows.iusethis.com/icon/windows/bsplayer.png";
    buildCell(tr, "Bsplayer-subtitlesRO","http://bsplayer-subtitles.com/index.php?p=exploresub&cmd=search&q="+txt+"&lang=RUM&bweb=Subtitle+Search", img);	
	
    //RegieLive
    img = "http://i.r-l.ro/favicon.ico";
    buildCell(tr, "RegieLiveRO","http://subtitrari.regielive.ro/cauta.html?s="+txt+"&categ=0", img);

	//Subs4free
    img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEA"+
"AAAAAAAAAAAARUW4AKysqwCYnJ8A6urqAJd5XACkjXYAzMzMAGVUQgDQxLkAalpKAJBzVQB6euAA"+
"FxeXAE6MyAB9k6oAn7fQAEVFkAA4fcIARkaFAK/K5QCKclkAk5PkAISmyABRUbkAKiq9ADhnlQBC"+
"i9UAKCiiAO/v7wCKkZgA4eH2AGFh3wCkpKQAamq1AMu9rwAhIZYAiWE4AEFBhQDe3u8AiYm4AGVM"+
"MwAQENgAnIBlAK2ttQANDcAAlIJxAHh40QC4vcIATk6TAOzq5wBDg70AT0/sANvX0wBycuMAwayX"+
"AF09HQAICOAAMTF7ADk50AB1UzEAYzsSALKy8wDIuKcARorLAC1wsgCns78AhISXAE5OjAA1f8oA"+
"aj4SAA4OpgBaeZcAgYHzANjOxADf2NEAa5bBAE83HwBiPhsAw8PDAN/f5wB/rdsA8OvmAKaWhQCH"+
"tOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAdTwAAAAAAAAkLPCkCAAAADBMAFywAAAAVUzI3TQQAADYmABIeAAAAAAAAUk4iOxkqLUMzAwAA"+
"AABLBUYuICQ+NBxQQEgQMAAjPStKAB8NT0kmABtBDkIAJQgAAAAAFjoYEQAzIQAAAD84LgYKAAAB"+
"RzEARRpMDwcASisGNQAAJzlEABRUURAdAAAAAAAAAAAvKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAD//wAA//8AAP8/AAAHJwAAAycAAOAH"+
"AACAAQAACCEAADwnAAAGIAAAhiAAAP8/AAD//wAA//8AAP//AAA=";
 //   buildCell(tr, "Subs4free","http://subs4free.com/search_report.php?search="+txt+"&x=0&y=0&selLang=0&cat=0", img);

     //Podnapisi
    img = "http://www.podnapisi.net/favicon.ico";
 //   buildCell(tr, "Podnapisi","http://www.podnapisi.net/ppodnapisi/search?tbsl=1&asdp=0&sK="+txt+"&sM=0&sJ=0&sY=&sAKA=1", img);
    buildCell(tr, "PodnapisiRO","http://www.podnapisi.net/en/ppodnapisi/search?sT=1&sM=428947&sJ=13&sK="+txt+"&sTS=&sTE=", img);
	
     //AllSubs
    img = "http://pics.allsubs.org/img/favicon.gif"
//    buildCell(tr, "AllSubs","http://www.allsubs.org//search-subtitle/"+txt+"+/200", img);
    buildCell(tr, "AllSubsRO","http://www.allsubs.org/subtitrari/cauta-titrari/"+txt+"+ro/20", img);
       
    //OpenSubtitles
    img = "http://static.opensubtitles.org/favicon.ico";
//    buildCell(tr, "OpenSubtitles","http://www.opensubtitles.org/en/search/sublanguageid-all/moviename-"+txt, img);  
    buildCell(tr, "OpenSubtitlesRO","http://www.opensubtitles.org/en/search2/sublanguageid-rum/moviename-"+txt, img);      

    //SubScene
    img = "http://subscene.com/favicon.ico";
//    buildCell(tr, "SubScene","http://subscene.com/filmsearch.aspx?q="+txt, img);
    buildCell(tr, "SubSceneRO","http://subscene.com/subtitles/title.aspx?q="+txt+"&l=", img);

//-----------------------------------
//--------INFO and POSTER--------------
//-----------------------------------

    //allmovie
    img = "http://www.allmovie.com/favicon.ico";
    buildCell(tr, "AllMovie","http://www.allmovie.com/search/all/"+txt, img);

    //movieposterdb
    img = "http://www.movieposterdb.com/favicon.ico";
    buildCell(tr, "MoviePosterDB","http://www.movieposterdb.com/search/?query="+txt, img);

//-----------------------------------
//--------TORRENT--------------
//-----------------------------------

     //fenopy
     img = "http://fenopy.se/favicon.ico";
     buildCell(tr, "Fenopy","http://fenopy.com/?keyword="+txt, img);
	 
     //Torrentz
     img = "http://torrentz.eu/favicon.ico";
     buildCell(tr, "Torrentz","http://torrentz.eu/search?f="+txt, img);       

     //btscene
     img = "http://www.btscene.org/favicon.ico";
     buildCell(tr, "Btscene","http://www.btscene.eu/verified-search/torrent/"+txt+"/", img);
	
     //1337x
     img = "http://1337x.org/favicon.ico";
     buildCell(tr, "1337x","http://1337x.org/search/"+txt+"/0/", img);
	
     //extratorrent
    img = "http://extratorrent.com/images/favicon.ico";
    buildCell(tr, "ExtraTorrent","http://extratorrent.com/search/?search="+txt+"&new=1&x=0&y=0", img);
     
     //PirateBay    
    img = "http://thepiratebay.org/favicon.ico";
    buildCell(tr, "PirateBay","http://thepiratebay.org/search/"+txt+"/0/99/200", img);
   
     //Torrentzap    
    img = "http://www.torrentzap.com/favicon.ico";
    buildCell(tr, "Torrentzap","http://www.torrentzap.com/clean-search-results1/"+txt+"/popular/4", img);

     //Mininova
    img = "http://www.mininova.org/favicon.ico";
    buildCell(tr, "Mininova","http://www.mininova.org/search/"+txt+"/4", img);

     //KIckAss
    img = "http://kat.ph/favicon.ico";
    buildCell(tr, "KickAss","http://kat.ph/usearch/"+txt+"/?categories[]=movies&categories[]=tv", img);

     //isoHunt
    img = "http://isohunt.com/favicon.ico";
    buildCell(tr, "isoHunt","http://isohunt.com/torrents/?iht=1&ihq="+txt, img);

    //take
    img = "http://take.fm/favicon.ico";
    buildCell(tr, "Take","http://take.fm/movies/search?query="+txt, img);
   
     //H33t
    img = "http://h33t.com/favicon.ico";
 //   buildCell(tr, "H33t","http://www.h33t.com/torrents.php?search="+txt+"&category=1&Go.x=0&Go.y=0&Go=Search", img);
	
     //MyTog
    img = "http://greek-team.cc/favicon.ico";
 //   buildCell(tr, "GreekTeam","http://greek-team.cc/browse.php?incldead=0&search="+txt+"&blah=0", img);
    
     //RevolutionTT
    img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAD////////38/cxNDEpKCkxNDH38/f////////38/cxNDEpKCkxNDH38/f/////////////"+
"///v7+8ABBAAAIwAABDv7+/////////v7+8ABBAAAIwAABDv7+/////////////////v7+8QECEI"+
"BM4QEDHv7+/////////v7+8QECEIBM4QECnv7+////////////////////8QFCEIBL0QEDH/////"+
"//////////8QFCEIBL0QECH/////////////+/+lpqWUlpQICAgIBL0ICBiUkpScnpycnpyUlpQI"+
"CAgIBL0ICBCUkpSlpqX/+//v7+8ABAgAACEAAFIIBNYAAGMAAEIAACEAACEAAEIAAFIIBNYAAFoA"+
"ACEABAjv7+/39/cQEBAAAFoAALUAALUAAL0AAK0AAFoAAFoAAK0ABL0ABL0AAK0AAFIIDBD39/fn"+
"4+chICEAAAgAABAQFCEABBAQECEYGCEYGCEYFCkAABAAAAgQFCkQFCEQEBDe395KSUq9ur0IDAgI"+
"EAi1sq0hIBjGw7XW19bW19bGx70ICAAICADOy8bOz8YQEBAxMDEYHBjn4+chICGloqVKSUoYGBjv"+
"6+9aWVpKSUpKSUoQFBClpqVaWVpaWVqlpqUQFBAhJCHn4+fGx8b///9SUVIQEBDn4+etqq1aWVoA"+
"AAAQFBDv6+8AAAAAAADv6+8pKCkhJCHn4+eUkpRzdXPGx8YpKCne396MioxCRUIAAAAQEBDe294Q"+
"EBAIDAje294pKCkQFBD38/d7eXtrbWvOy84pKCnv6+9zcXNraWtraWshICHn5+cQFBAQFBDv6+8Y"+
"GBhSVVKtrq3Gx8bGw8ZrbWsQEBCtqq3Gx8bOy861trUYHBicmpwIDAgQFBCloqVaXVr38/c5ODkp"+
"KCkpKCkpKCkpKCkpKCkpKCkpKCkpKCkpKCkpKCkpKCkpKCkxNDH38/f////38/fv7+/v7+/v7+/v"+
"7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/38/f///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
 //   buildCell(tr, "RevolutionTT","http://www.revolutiontt.net/browse.php?search="+txt+"&cat=0&titleonly=1", img);
 
    //Torrentleech 
    img = "http://www.torrentleech.org/favicon.ico";
 //   buildCell(tr, "TorrentLeech","http://www.torrentleech.org/torrents/browse/index/query/"+txt, img);
}
//--------------------------------------------------------------------------------
function buildCell(container, title, href, image){
    var a = document.createElement("a");
    a.href = href;  
    a.setAttribute("target","_blank");
	a.title=title;
    var img = document.createElement("img");
    img.src = image;
	img.setAttribute("height","16");
	img.setAttribute("witdh","16");
    a.appendChild(img);
    var cell = container.insertCell(0);
    cell.appendChild(a);
}

function _addStyle(css){
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            var node = document.createElement("style");
            node.type = "text/css";
            node.innerHTML = css;
            heads[0].appendChild(node); 
        }
    }
}