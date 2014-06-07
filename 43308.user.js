// MAL Anime Entries Compare!
// version 1.6
// 2010-07-29
// Copyright (c) 2009, Bastvera <bastvera@gmail.com>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "MAL Anime Entries Compare", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           MAL Anime Entries Compare
// @namespace      http://thayanger.neostrada.pl
// @include        http://myanimelist.net/anime/*
// @include        http://myanimelist.net/anime.php?id=*
// @exclude        http://myanimelist.net/anime/*/*/reviews
// @exclude        http://myanimelist.net/anime/*/*/userrecs
// @exclude        http://myanimelist.net/anime/*/*/stats
// @exclude        http://myanimelist.net/anime/*/*/characters
// @exclude        http://myanimelist.net/anime/*/*/pics
// @exclude        http://myanimelist.net/anime/*/*/moreinfo
// @exclude        http://myanimelist.net/anime/*/*/forum
// @description    This script compares anime entries from user list with entries from anime detail page and bold similar ones
// @author         Bastvera <bastvera@gmail.com>
// ==/UserScript==

//Related Anime H2
var AnchorLink;
var allTextareas = document.getElementsByTagName('H2');
for(var element in allTextareas){
    if(allTextareas[element].innerHTML=="Related Anime")
        AnchorLink = allTextareas[element];
}

if(AnchorLink!=null){
    //Element Placing
    var	newElement = document.createElement('BR');
    AnchorLink.appendChild(newElement);
    newElement = document.createElement('label');
    newElement.setAttribute('for','firstName');
    newElement.appendChild(document.createTextNode('Entries Compare in Process. Please wait...'));
    AnchorLink.appendChild(newElement);
    newElement.style.fontWeight="normal";
    newElement.style.fontSize="10px";

    //Get username
    var allNavs = document.evaluate(
        "//div[@id='menu_left']//ul[@id='nav']//a",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

    var userName;
    for (var i = 0; i < allNavs.snapshotLength; i++){
        var linkNav = allNavs.snapshotItem(i);
        var userTest=/\/profile\/.*/;
        var getName = userTest.exec(linkNav);
        getName = "" + getName;
        getName = getName.replace(/\/profile\//,"");
        if(getName!='null')
            userName=getName;
    }

    var rssURL = "http://myanimelist.net/rss.php?type=rw&u=" + userName;

    //RSS change check
    GM_xmlhttpRequest({
        method: 'GET',
        url: rssURL,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: function(responseDetails){
		
            //Cache test
            var cacheCheck = 0;
		
            var lastTime = /<pubDate>.*<\/pubDate>/;
            var modTime = lastTime.exec(responseDetails.responseText);
            var saveTime = GM_getValue('saveTime');
            modTime = "" + modTime;
            if(modTime!=saveTime){					//Cache time check
                GM_setValue('saveTime', modTime);
				newElement.style.display="none"; 	//Please wait off
				newElement = document.createElement('label');
				newElement.setAttribute('for','firstName');
				newElement.appendChild(document.createTextNode('Downloading List. Please wait...'));
				AnchorLink.appendChild(newElement);
				newElement.style.fontWeight="normal";
				newElement.style.fontSize="10px";
			}
            else
                cacheCheck++;

            //Old cache
            if(cacheCheck==0){
	
                //Anime data
			     var animeURL = "http://myanimelist.net/malappinfo.php?u=" + userName + "&status=all";
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: animeURL,
                    headers: {
                        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                        'Accept': 'application/atom+xml,application/xml,text/xml',
                    },
                    onload: function(responseDetails){
                        var text = responseDetails.responseText;

                        var key = ";";									//Chaching string
				
                        //Edit Anime links formating
                        var tagcount = 5000;							//Max number of anime entries
                        var ListLinks = [];								//Anime Links Array
                        //Array for anime entries storing
                        var anireg=/<series_animedb_id>\d{1,}<\/series_animedb_id>/g;		//Anime entries links
                        var exactlink=/\d{1,}/;							//Anime exact link
                        for (var i = 0; i < tagcount; i++){
                            var linkGet = anireg.exec(text);
                            if(linkGet==null){
                                tagcount=i;
                                break;
                            }
                            else{
                                ListLinks[i] = linkGet;
                                ListLinks[i] = exactlink.exec(ListLinks[i]);
                                key = key + ListLinks[i] + ";";
                                ListLinks[i] = "http://myanimelist.net/anime/" + ListLinks[i] + "/";
                            }
                        }
				
                        GM_setValue('list', key); //Store Cache string
                        compare(ListLinks);
                    }
                });
            }
            else
            {
                var ListLinks = [];								//Anime Links Array
                var key = GM_getValue('list');					//Fetch link from Cache
                var exactlink=/\d{1,}/g;
                var tagcount = 5000;
                for (var i = 0; i < tagcount; i++){
                    var linkGet = exactlink.exec(key);
                    if(linkGet==null){
                        tagcount=i;
                        break;
                    }
                    else{
                        ListLinks[i]=linkGet;
                        ListLinks[i] = "http://myanimelist.net/anime/" + ListLinks[i] + "/";
                    }
                }
			
                compare(ListLinks);
            }
        }
    });
	
    function compare(ListLinks){
        newElement.style.display="none"; 	//Please wait off
	
        //Document URL formating
        var docURL = document.URL;
        var docright = /http:\/\/myanimelist.net\/anime\/|http:\/\/myanimelist.net\/anime.php\?id=/;
        var docleft = /\//;
        docright.test(docURL);
        docURL = RegExp.rightContext;
        var pos = docleft.test(docURL);
        if(pos==true)
            docURL = RegExp.leftContext;
        docURL = "http://myanimelist.net/anime/" + docURL + "/";
	
        //All links from anime page
        var allElements;
        allElements = document.evaluate(
            '//a[@href]',
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);
		
        //Links compare
        var allLink;
				
        for (var i = 0; i < allElements.snapshotLength; i++){
            allLink = allElements.snapshotItem(i);
            var convert = allLink.href;
            var finder = convert.search('http://myanimelist.net/anime/');
            var self = convert.search(docURL);
            if(finder!=-1 && self==-1){
                for (var tcount in ListLinks){			
                    var finder2 = convert.search(ListLinks[tcount]);
                    if(finder2!=-1){
                        allLink.style.fontWeight="bold";
                    }
                }
            }
        }
    }
}