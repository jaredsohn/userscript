// ==UserScript==
// @name            VZ RSS Kasten
// @namespace       http://www.brainhacker.de
// @description     Fügt im linken Hauptmenü einen Kasten ein, mit dem man die neuesten Einträge bestimmter RSS-Feeds lesen kann.
// @author          Lukas Heblik
// @date            2010-2-18
// @include         http://www.schuelervz.net*
// @include         http://schuelervz.net*
// @include         https://www.schuelervz.net*
// @include         https://schuelervz.net*
// @include         https://secure.schuelervz.net*
// @include         http://www.studivz.net*
// @include         http://studivz.net*
// @include         https://www.studivz.net*
// @include         https://studivz.net*
// @include         https://secure.studivz.net*
// @include         http://www.meinvz.net*
// @include         http://meinvz.net*
// @include         https://www.meinvz.net*
// @include         https://meinvz.net*
// @include         https://secure.meinvz.net*
// ==/UserScript==

// Copyright by Lukas Heblik 
// http://www.brainhacker.de

  
	//Prueft, ob linkes Menue vorhanden ist
    if(!document.getElementById("Grid-Page-Left")) {
		return;
	}
	function addGlobalStyle(string){
			if(/microsoft/i.test(navigator.appName) && !/opera/i.test(navigator.userAgent)){
				document.createStyleSheet().cssText=string;
			}
			else {
				var ele=document.createElement('link');
				ele.rel='stylesheet';
				ele.type='text/css';
				ele.href='data:text/css;charset=utf-8,'+escape(string);
				document.getElementsByTagName('head')[0].appendChild(ele);
			}
		}
    var newsresources=[];
	// ANFANG / Feed hinzufuegen
	function addFeed (feedname, feedcodename, feedurl) { //name: name of feed; codename: name used in script; feedurl: url of the feed; type:normal or feedburner
	  try{ (function(){
		newsresources[feedcodename]={
			name  :feedname,
			display:function(elm){
				var lastUpdate=GM_getValue(feedcodename + "_lastupdate");
				var chache    =GM_getValue(feedcodename + "_chache");
				elm.innerHTML =chache || "Wird geladen...";
				if(!lastUpdate || !chache || lastUpdate<(new Date()).getTime()-60*60*1000){
				newsresources[feedcodename].reload(elm);
				}//end if
			},
			reload:function(elm){
				var elm=elm;	
				GM_xmlhttpRequest({
				method: 'GET',
				url: feedurl,
				onload: function(responseDetails) {
					if (feedurl.indexOf("feeds.feedburner.com") > -1) {
						var regexp = /<item>[\w\W]*?<title>([^<]*)[\w\W]*?<description>([^<]*)[\w\W]*?<link>([^<]*)[\w\W]/;
						var [, title, text, url] = regexp.exec(responseDetails.responseText);
					} else if (feedurl.indexOf("twitter.com/statuses/user_timeline/") > -1) {
						var regexp = /<item>[\w\W]*?<title>([^<]*)[\w\W]*?<description>([^<]*)[\w\W]*?<pubDate>([^<]*)[\w\W]*?<guid>([^<]*)[\w\W]*?<link>([^<]*)[\w\W]/;
						var [, title, text, pubDate, guid, url] = regexp.exec(responseDetails.responseText);
						var text = "";
					} else {
						var regexp = /<item>[\w\W]*?<title>([^<]*)[\w\W]*?<link>([^<]*)[\w\W]*?<description><!\[CDATA\[([\w\W]*?)\]\]>/;
						var [, title, url, text] = regexp.exec(responseDetails.responseText);
					}
					elm.innerHTML="<b> <a href=\"" + url + "\"> " + title + " </a> </b>"
					+ "<br/> <br/>" + text;
					GM_setValue(feedcodename + "_chache", elm.innerHTML);
					var ms2 = Date.parse(new Date());
					GM_setValue(feedcodename + "_lastupdate", "" + ms2);
				}
				});				
			}
		}
	  })()
	  }catch(e){alert(e)}
	}
	// ENDE / Feed hinzuf&#65533;gen
	
	function addOwnFeed () {
		var check = window.prompt("Gib hier die komplette Feed-Adresse ein, die du hinzuf\u00FCgen m\u00F6chtest", "");
		if (check) {
		if (check.indexOf("/feed") != -1 || check.indexOf("feeds.feedburner.com") != -1 || check.indexOf("twitter.com/statuses/user_timeline/") != -1 && check.indexOf("http://") != -1) {
			GM_setValue("ownfeed_url", check);
			var ownfeedname = window.prompt("Und jetzt noch einen Namen f\u00FCr den Feed", "");
			if (ownfeedname != 0) {
				GM_setValue("ownfeed_name", ownfeedname);
				GM_setValue("ownfeed_active", 1);
				location.reload();
			}
		} else {
			window.alert("Das war keine richtige Feed-URL");
		}
		}
	}
	function deleteOwnFeed () {
		GM_setValue("ownfeed_active", 0);
		location.reload();
	}
	
	// ANFANG / Initialisation
	function init () {		
		// F&#65533;gt die Feeds hinzu
		// Parameter f&#65533;r Funktion addFeed: Name des Feeds, Systemname im Script (keine Leerzeichen und Umlaute), URL des Feeds, Typ: Falls Feedburner="feedburner"
		addFeed ("VZ Blog", "vzblog", "http://blog.studivz.net/feed/");
		addFeed ("StudiVZ Entwickler", "svz_dev", "http://developer.studivz.net/feed/");
		addFeed ("VZlog.de", "vzlognews", "http://www.vzlog.net/feed/");
		addFeed ("sVZ-Styles.de", "svzstyles_de", "http://feeds.feedburner.com/sVZ-Styles");
		addFeed ("sVZ-Styles.de bei Twitter", "svzstyles_de_twitter", "http://twitter.com/statuses/user_timeline/22410373.rss");
		addFeed ("VZ | brainhacker.de", "brainhacker_de", "http://www.brainhacker.de/topics/vz/feed/");
		if (GM_getValue("ownfeed_active") == 1) {
			addFeed (GM_getValue("ownfeed_name"), "ownfeed", GM_getValue("ownfeed_url"));
		}
		
		if (!GM_getValue("newssource")) {
			GM_setValue("newssource", "brainhacker_de");
		}
		
		var currentNewsName = GM_getValue("newssource");

		var div = document.createElement("div");
		div.id = "RSSBox";
        div.setAttribute("name", "RSS_Box");
		div.className="rssbox box rounded simple-ext";
		document.getElementById("Grid-Page-Left").appendChild(div);
		
		var div2 = document.createElement("div");
		div2.setAttribute("class", "innerbox");
		
		var select=document.createElement("select");
		select.addEventListener("change", function(){
			currentNewsName=select.value;
			GM_setValue("newssource", select.value)
			newsresources[currentNewsName].display(newscontainer)
		}, true)
		div2.appendChild(select);

		for(var i in newsresources){
			var option=document.createElement("option");
			option.value=i;
			option.appendChild(document.createTextNode(newsresources[i].name));
			if(currentNewsName==i) {
				option.selected=true;
			}
			select.appendChild(option)
		}

		var newscontainer=document.createElement("div");
		newscontainer.setAttribute("id", "RSSBoxContent");
		div2.appendChild(newscontainer);

		var a=document.createElement("a");
		a.href="javascript:;";
		a.addEventListener("click", function(){
		newsresources[currentNewsName].reload(newscontainer)
		}, true);
		a.appendChild(document.createTextNode("Aktualisieren"));
		div2.appendChild(a);
		
		if (GM_getValue("ownfeed_active") == 1) {}
		
		var a=document.createElement("a");
		a.setAttribute("style", "float:right; font-weight:bold;");
		a.href="javascript:;";
		if (GM_getValue("ownfeed_active") == 1) {
			a.addEventListener("click", function(){
				deleteOwnFeed();		
			}, true);
			a.appendChild(document.createTextNode("-"));
		} else {
			a.addEventListener("click", function(){
				addOwnFeed();		
			}, true);
			a.appendChild(document.createTextNode("+"));		
		}
		div2.appendChild(a);

		div.appendChild(div2);
		
		if(newsresources[currentNewsName]) {
			newsresources[currentNewsName].display(newscontainer)
		}
		
		// ANFANG / CSS-Bereich
		addGlobalStyle("#Grid-Page-Left .rssbox select { width:100%; float:none; margin:0px;}");
		addGlobalStyle("#Grid-Page-Left .rssbox > a { display:block;padding:2px;text-align:center}");
		addGlobalStyle("#RSSBox {margin-top:10px;}");
		addGlobalStyle("#RSSBoxContent {margin-top:5px; margin-bottom:5px;}");
		addGlobalStyle("#RSSBoxContent {margin-top:5px; margin-bottom:5px;}");
		// ENDE / CSS-Bereich
	}
	// ENDE / Initialisation
	init();