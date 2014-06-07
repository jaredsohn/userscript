// ==UserScript==
// @name           Comm Chatter Reincarnate
// @namespace      Comm Chatter Reincarnate
// @description    Attempts to revitalize the Bungie.net homepage.
// @include        http://www.bungie.net/
// @include        http://www.bungie.net/default.aspx
// @include        http://admin.bungie.net/
// @include        http://admin.bungie.net/default.aspx
// ==/UserScript==

var blogger = document.createElement("script"), callback = document.createElement("script"), chatter = document.createElement("div"), block1 = document.getElementsByClassName("spotlight").item(0), d = new Date(), month = new Array("January","February","March","April","May","June","July","August","September","October","November","December"), result = month[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
blogger.src = 'http://twitter.com/javascripts/blogger.js'; blogger.type = 'text/javascript'; callback.src = 'http://twitter.com/statuses/user_timeline/bungietweets.json?callback=twitterCallback2&count=1'; callback.type = 'text/javascript'; document.getElementsByTagName('head')[0].appendChild(blogger); document.getElementsByTagName('head')[0].appendChild(callback); 
chatter.id = "commChatter"; chatter.className = "spotlight";
chatter.innerHTML = '<div style="background-color:Transparent;border-width:0px;border-style:None;width:903px;min-width:10px;min-height:10px;" class="RadDockZone RadDockZone_Bungie rdHorizontal"><div style="background-color:Transparent;border-width:0px;border-style:None;width:225px; height:auto !important;" class="RadDock RadDock_Bungie"><table class="rdTable"><tbody><tr class="rdTop rdNone"><td class="rdLeft" unselectable="on" style="">&nbsp;</td><td class="rdCenter"></td><td class="rdRight" unselectable="on" style="">&nbsp;</td></tr><tr class="rdMiddle"><td class="rdLeft" unselectable="on" style="">&nbsp;</td><td class="rdCenter" style="height: auto;"><div class="rdContent"><div class="block"><h2>@bungietweets</h2><ul><li><ul id="twitter_update_list" style="list-style-type: none; font-size: 15px; font-style: italic;"></ul></li><li><a class="bluebutton" href="http://twitter.com/bungietweets"><span>Read More</span></a></li><li><img src="http://a3.twimg.com/a/1312334839/phoenix/img/front/logo.png" alt="Twitter"></ul></div></div></td><td class="rdRight" unselectable="on" style="cursor: e-resize;">&nbsp;</td></tr><tr class="rdBottom"><td class="rdLeft" unselectable="on" style="">&nbsp;</td><td class="rdCenter" unselectable="on" style="">&nbsp;</td><td class="rdRight" unselectable="on" style="">&nbsp;</td></tr></tbody></table></div><div style="background-color:Transparent;border-width:0px;border-style:None;width:225px;height:auto !important;" class="RadDock RadDock_Bungie"><table class="rdTable"><tbody><tr class="rdTop rdNone"><td class="rdLeft" unselectable="on" style="">&nbsp;</td><td class="rdCenter"></td><td class="rdRight" unselectable="on" style="">&nbsp;</td></tr><tr class="rdMiddle"><td class="rdLeft" unselectable="on" style="">&nbsp;</td><td class="rdCenter" style="height: auto;"><div class="rdContent"><div class="block"><h2>Halo Waypoint</h2> <ul><li><a id="articleTitle" href="#" style="font-size: 20px;"></a></li><li><img id="articleIcon" alt="Halo Waypoint Latest" src="#" style="float: none;"></li><li><a class="bluebutton" href="http://halo.xbox.com/en-us/news"><span>Read More</span></a></li></ul></div></div></td><td class="rdRight" unselectable="on" style="cursor: e-resize;">&nbsp;</td></tr><tr class="rdBottom"><td class="rdLeft" unselectable="on" style="">&nbsp;</td><td class="rdCenter" unselectable="on" style="">&nbsp;</td><td class="rdRight" unselectable="on" style="">&nbsp;</td></tr></tbody></table></div><div style="background-color:Transparent;border-width:0px;border-style:None;width:225px;height:auto !important;" class="RadDock RadDock_Bungie"><table class="rdTable"><tbody><tr class="rdTop rdNone"><td class="rdLeft" unselectable="on" style="">&nbsp;</td><td class="rdCenter"></td><td class="rdRight" unselectable="on" style="">&nbsp;</td></tr><tr class="rdMiddle"><td class="rdLeft" unselectable="on" style="">&nbsp;</td><td class="rdCenter" style="height: auto;"><div class="rdContent"><div class="block"><h2>Halo.Bungie.Org</h2><ul><li><span style="font-size: 15px;">'+result+'</span></li><li id="hboLatest"></li><li><a class="bluebutton" href="http://halo.bungie.org"><span>Read More</span></a></li></ul></div></div></td><td class="rdRight" unselectable="on" style="cursor: e-resize;">&nbsp;</td></tr><tr class="rdBottom"><td class="rdLeft" unselectable="on" style="">&nbsp;</td><td class="rdCenter" unselectable="on" style="">&nbsp;</td><td class="rdRight" unselectable="on" style="">&nbsp;</td></tr></tbody></table></div><div style="background-color:Transparent;border-width:0px;border-style:None;width:228px;height:auto !important;" class="RadDock RadDock_Bungie"><table class="rdTable"><tbody><tr class="rdTop rdNone"><td class="rdLeft" unselectable="on" style="">&nbsp;</td><td class="rdCenter"></td><td class="rdRight" unselectable="on" style="">&nbsp;</td></tr><tr class="rdMiddle"><td class="rdLeft" unselectable="on" style="">&nbsp;</td><td class="rdCenter" style="height: auto;"><div class="rdContent"><div class="block"><h2>Red vs. Blue</h2><ul><li><a id="episodeTitle" href="http://roosterteeth.com/archive/?sid=rvb&v=more" style="font-size: 17px !important;"></a></li><li><img id="episodeAvatar" src="#" alt="Red vs. Blue Latest Episode" style="float: none;"></li><li><a class="bluebutton" href="http://roosterteeth.com/archive/?sid=rvb&v=more"><span>View More</span></a></li><li><img src="http://s3.roosterteeth.com/assets/style/flashy/bits/footerLogo.png" alt="Red vs. Blue" style="float: right;"></div></div></td><td class="rdRight" unselectable="on" style="cursor: e-resize;">&nbsp;</td></tr><tr class="rdBottom"><td class="rdLeft" unselectable="on" style="">&nbsp;</td><td class="rdCenter" unselectable="on" style="">&nbsp;</td><td class="rdRight" unselectable="on" style="">&nbsp;</td></tr></tbody></table></div><div class="rdzClear"></div></div>';
block1.parentNode.insertBefore(chatter, block1.nextSibling);
GM_addStyle("#twitter_update_list a { font-size: 15px !important; font-style: italic !important; }");

(function returnHBO()
{
	GM_xmlhttpRequest ({
    		method: "GET",
    		url: "http://halo.bungie.org",
   		 headers: {
       			 "User-agent": "Mozilla/5.0",
        		  "Accept": "text/html",
    		},
    		onload: function (response){
        	var doc = document.implementation.createDocument("", "", null);
       		 var html = document.createElement("html");
        	 html.innerHTML = response.responseText;
        	 doc.appendChild(html);
		 document.getElementById("hboLatest").innerHTML = doc.getElementById("maincontent").getElementsByTagName("p").item(0).innerHTML;
    }
   });
})();

(function returnHaloWaypoint()
{
	GM_xmlhttpRequest ({
    		method: "GET",
    		url: "http://halo.xbox.com/en-us",
   		 headers: {
       			 "User-agent": "Mozilla/5.0",
        		  "Accept": "text/html",
    		},
    		onload: function (response){
        	var doc = document.implementation.createDocument("", "", null);
       		 var html = document.createElement("html");
        	 html.innerHTML = response.responseText;
        	 doc.appendChild(html);
		 document.getElementById("articleIcon").src = doc.getElementsByClassName("thumbnail").item(0).src;
		document.getElementById("articleTitle").textContent = doc.getElementsByClassName("entry-title").item(0).textContent;
		document.getElementById("articleTitle").href = "http://halo.xbox.com" + doc.getElementsByClassName("entry-title").item(0).href;
    }
   });
})();

(function returnRVB()
{
	GM_xmlhttpRequest ({
    		method: "GET",
    		url: "http://roosterteeth.com/archive/?sid=rvb&v=more",
   		 headers: {
       			 "User-agent": "Mozilla/5.0",
        		  "Accept": "text/html",
    		},
    		onload: function (response){
        	var doc = document.implementation.createDocument("", "", null);
       		 var html = document.createElement("html");
        	 html.innerHTML = response.responseText;
        	 doc.appendChild(html);
		 document.getElementById("episodeTitle").textContent = doc.getElementById("episodeDetails").getElementsByTagName("b").item(0).textContent;
		 document.getElementById("episodeAvatar").src = doc.getElementsByClassName("vidatar").item(0).src;
    }
   });
})();

// Between the desire and the spasm; between the potency and the existence; between the essence and the descent, falls the Shadow.