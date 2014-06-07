// ==UserScript==
// @name           Kongregate Developer Subscriber
// @namespace      tag://kongregate
// @description    Subscribe to them developers by adding games to your playlist
// @author         UnknownGuardian
// @version        1.0.1
// @date           03.22.2013
// @include        http://www.kongregate.com*
// ==/UserScript== 

function main() {
	
	var dom = (typeof unsafeWindow === "undefined"?window:unsafeWindow);
	console.log("wat");
	function init() {
		console.log("I love developers init");


		var url = dom.location.href;
		url = url.substr(url.indexOf(".com/") + ".com/".length);

		var directory;
		if(url.indexOf("/") != -1)
			directory = url.substring(0,url.indexOf("/"));
		else
			directory = url;

		directory = directory.split("?")[0];
		console.log("directory: " + directory);

		if(directory == "games")
		{
			//add buttons to subscribe
			addSubscribeButton();
		}
		else if(directory == "my_playlist" || directory == "play_laters")
		{
			//show all devs subscribed to
			showAllSubscriptions();
		}
		else if(directory == "accounts")
		{
			//show profile button
			addProfileSubscribeButton();
		}


		var lastCheck = getLastDateChecked();
		var today = new Date();
		if(lastCheck == "" || (today.getTime() - new Date(lastCheck).getTime())/(1000*60*60) > 12)
		{
			pullLastGamesFromDevelopers();
		}
	}

	function pullLastGamesFromDevelopers()
	{
		Cookie.set('DevSubscribeLastCheck', "" + new Date(), 100000000,'/');
		console.log("Pulling games from all devs");
		var list = getAllSubscribed();
		list.each(function(item){
			new Ajax.Request("http://www.kongregate.com/accounts/" + item, {
								  method:'get',
								  onComplete: function(transport){
								  	console.log("Pulled list from developer" + item);
								  	handleDevProfilePage(item, transport.responseText);
								  	//alert('Yay' + transport.responseText + 'asdasd');
								  	//return false;
								   }
								});
		});
	}

	function handleDevProfilePage(developer, text)
	{
		if(text.indexOf("pod_head_header") != 0 )
		{
			var start = text.indexOf("pod_game_header") + "pod_game_header".length + 18;
			var subtext = text.substr(start,250);
			var end = subtext.indexOf('" class="')
			var gameURL = subtext.substring(0,end);
			console.log("got game url at " + gameURL);
			text = text.substring(start + end + 50);

			if(gameURL == "")
				return;

			var lastGameRead = getLastGameSavedFromDev(developer);
			var gameName = gameURL.substring(gameURL.lastIndexOf("/"))+1;
			if(lastGameRead == "")
			{
				Cookie.set("sub_last_" + developer, gameName, 100000000,'/');
				console.log("we didn't have any last saved, so lets just store what exists")
				
			}
			else if(lastGameRead != gameName)
			{
				//set to last game pulled
				Cookie.set("s_l_" + developer, gameName, 100000000,'/');
				//POST to http://www.kongregate.com/play_laters
				new Ajax.Request(gameURL + "/metrics.json", {
								  method:'get',
								  onComplete: function(transport){
								  	addToPlayList(transport.responseText);

								  	//alert('Yay' + transport.responseText + 'asdasd');
								  	//return false;
								   }
								});
				
			}
		}
	}

	function addToPlayList(text)
	{
		var id = text.substring(text.indexOf("?game_id=") + "?game_id=".length);
		id = id.substring(0,id.indexOf('"')-1)
		new Ajax.Request("http://www.kongregate.com/play_laters", {
								  method:'post',
								   parameters: {
								   	"game_id":id
								   },
								  onComplete: function(transport){
								  	console.log("Success adding " + id + " to play list");
								   }
								});
	}

	function showAllSubscriptions()
	{
		console.log("showing all subscriptions");
		var table = '<div class="category_listing"><div class="category_listing_header"><div class="sort_filter mrm"><span class="plm">Subscriptions</span></div><div class="clear"></div></div><div class="category_games_listing hasLayout"><div class="large_sub_pod_column_one"><div class="sub_listing" style="font-size:12px;background-color: #FFFFFF;"id="sub_browser_game_row_1"></div></div><div class="clear"></div></div></div><div><div class="clear"></div><br />';
		var target = $$(".adspacer").length == 0? $$(".category_listing")[0] : $$(".adspacer")[0];
		target.insert({after:table});
		console.log("showing all subscriptions kinda");

		var list = getAllSubscribed();

		//case insensitive sort
		list.sort(
			  function(a, b) {
			    if (a.toLowerCase() < b.toLowerCase()) return -1;
			    if (a.toLowerCase() > b.toLowerCase()) return 1;
			    return 0;
			  }
			);


		list.each(function(item){
			console.log("Adding item " + item);

			var container = new Element("div", {"style":"display:block;"});


			var linkElement = new Element("a", {"style":"min-width:200px; float:left; padding-top:2px; padding-bottom:2px;", "href":"http://www.kongregate.com/accounts/" + item});
			linkElement.update(item);
			var subElement = new Element("a",{"href":"#", "style":"min-width:500px;color:#888;float:left;padding-left: 4px;padding-top:2px; padding-bottom:2px;"});
			subElement.update("Unsubscribe");
			subElement.id = "unsubscribe_" + item;
			subElement.onclick = unsubscribeToADev;


			container.insert(linkElement);
			container.insert(subElement);

			$("sub_browser_game_row_1").insert(container)
		});
	}

	function addProfileSubscribeButton()
	{
		//use something generic that is on profiles to prevent other pages from passing this possibly.
		if($$("#games_by_user_pod").length == 0)
			return;

		var subElement = new Element("a",{"href":"#", "style":"color:#888;padding-left: 4px;"});
		var devname = dom.location.href.substring(dom.location.href.indexOf(".com/accounts/") + ".com/accounts/".length);
		if(!isDevSubscribedTo(devname))
		{
			subElement.update("Subscribe");
			subElement.id = "subscribe_" + devname;
			subElement.onclick = subscribeToADev;
		}
		else
		{
			subElement.update("Unsubscribe");
			subElement.id = "unsubscribe_" + devname;
			subElement.onclick = unsubscribeToADev;
		}

		$$("#games_by_user_pod")[0].down().down().down().insert(subElement);
	}

	function addSubscribeButton() {
		//change css
		var rulesText = ".game_details_outer .game_dev { float: none;}";
			rulesText += ".game_details_outer {padding-bottom:5px;}"
			rulesText += ".game_details_outer .game_detail {padding-bottom:5px;}"
		var head = document.getElementsByTagName('head')[0],
			style = document.createElement('style'),
			rules = document.createTextNode(rulesText);
		style.type = 'text/css';
		if(style.styleSheet)
		    style.styleSheet.cssText = rules.nodeValue;
		else style.appendChild(rules);
			head.appendChild(style);
		

		//add links
		var btn = '<a><span class="kong_ico" aria-hidden="true">b </span>Subscribe</a>';
		var devs = $$(".game_dev");
		devs.each(function(item){
			var devurl = item.down().href;
			var devname = devurl.substring(devurl.lastIndexOf("/")+1);

			var subElement = new Element("a",{"href":"#", "style":"color:#888;padding-left: 4px;"});
			if(!isDevSubscribedTo(devname))
			{
				subElement.update("Subscribe");
				subElement.id = "subscribe_" + devname;
				subElement.onclick = subscribeToADev;
			}
			else
			{
				subElement.update("Unsubscribe");
				subElement.id = "unsubscribe_" + devname;
				subElement.onclick = unsubscribeToADev;
			}
			item.insert(subElement);
		});
	}

	function subscribeToADev(e)
	{
		e.preventDefault();

		var list = getAllSubscribed();
		var dev = this.id.substring("subscribe_".length)
		list.push(dev)
		
		var savelist = list.join(",");
		Cookie.set('DevSubscribeList', savelist, 100000000,'/');

		this.id= "unsubscribe_" + dev;
		this.update("Unsubscribe");
		this.onclick = unsubscribeToADev;

		return false;
	}

	function unsubscribeToADev(e)
	{
		e.preventDefault();

		var list = getAllSubscribed();
		var dev = this.id.substring("unsubscribe_".length)
		if(list.indexOf(dev) != -1)
		{
			list.splice(list.indexOf(dev),1);
		}

		var savelist = list.join(",");
		Cookie.set('DevSubscribeList', savelist, 100000000,'/');

		this.id= "subscribe_" + dev;
		this.update("Subscribe");
		this.onclick = subscribeToADev;
		
		return false;
	}

	function isDevSubscribedTo(devName)
	{
		var list = getAllSubscribed();
		if(list.indexOf(devName) == -1)
			return false;
		return true;
	}

	function getAllSubscribed() {
		var list = Cookie.get("DevSubscribeList");
		if(list == null) 
			return [];
		return list.split(",");
	}

	function getLastDateChecked() {
		var time = Cookie.get("DevSubscribeLastCheck");
		if(time == null) 
			time = new Date(0);
		return time;
	}

	function getLastGameSavedFromDev(developer) {
		var game = Cookie.get("s_l_" + developer);
		if(game == null) 
			game = "";
		return game;
	}
	
	init();
}

// This injects our script onto the page.
// Borrowed from: http://stackoverflow.com/a/2303228
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);