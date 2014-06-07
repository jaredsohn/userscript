// ==UserScript==
// @name	YouTube ZippyShare MP3
// @description	Adds a link that will search for a mp3 on google
// @include	http://*youtube.*/watch*v=*
// @version	2.1
// @author	Martijn Lentink
// ==/UserScript==
if (window.location == window.parent.location)
{
	var menuCreated = false;
	
	function addMenu()
	{
		if (menuCreated)
			return document.getElementById("itemlistidentity");
		
		var panelname = "action-panel-mp3";
		
		// Button
		var item = '<button id="mp3menubutton" class="action-panel-trigger yt-uix-button yt-uix-button-hh-text yt-uix-tooltip" role="button" data-trigger-for="' + panelname + '" data-button-toggle="true" type="button" onclick=";return false;" title=""><span class="yt-uix-button-content">MP3</span></button>';
		var button = document.createElement("span");
		button.innerHTML = item;
		
		var container = document.getElementById("watch7-secondary-actions");
		var firstButton = container.firstChild;
		container.insertBefore(button, firstButton);
		
		// Panel 
		var panel = document.createElement("div");
		panel.id = panelname;
		panel.className = "action-panel-content hid";
		panel.setAttribute("data-panel-loaded", "true");
		
		var itemlist = document.createElement("ul");
		itemlist.id = "itemlistidentity";
		panel.appendChild(itemlist);
		
		container = document.getElementById("watch7-action-panels");
		container.appendChild(panel);
		menuCreated = true;

		return itemlist;
	}
	
	function noResults(query, menu)
	{	
		var panel = menu.parentNode;
		var errordialog = document.createElement("div");
		errordialog.innerHTML = "<div>No results were found, I searched for '" + query + "'<br/>Do you want to edit the query?</div>";
		
		var input = document.createElement("input");
		input.setAttribute("type", "text");
		input.value = query;
		input.id = "searchAgainInput";
		
		var button = document.createElement("button");
		button.innerHTML = "Search again!";
		button.className = "yt-uix-button yt-uix-button-hh-default";
		button.addEventListener("click", function () {
			performSearch(document.getElementById("searchAgainInput").value);
			var parent = this.parentNode;
			parent.parentNode.removeChild(parent);
		});
		errordialog.appendChild(input);
		errordialog.appendChild(button);
		panel.appendChild(errordialog);
	}
	
	function addItem(menu, text, link)
	{
		listitem = document.createElement("li");
		item = document.createElement(link == null ? "span" : "a");
		//item.className = "yt-uix-button-menu-item";
		item.innerHTML = text;
		if (link != null)
			item.href = link;
		listitem.appendChild(item);
		menu.appendChild(listitem);
		itemCount++;
	}
	
	function getZippyshare(page, url)
	{
		scripts = page.getElementsByTagName("script");
		for (i=0; i < scripts.length; i++)
		{
			if (scripts[i].innerHTML.indexOf("document.getElementById('dlbutton').href") > -1)
			{
				eval(scripts[i].innerHTML.replace("document.getElementById('dlbutton').href ", 'var fulllink'));
			}	
		}
		
		var pong = url.substr(0, url.indexOf(".com/")+4) + fulllink;
		
		if (pong.indexOf('.mp3')>-1) 
		{
			return pong;
		}
	}
	
	function getHulkshare(page)
	{
		elements = page.getElementsByTagName("meta");
		tit = "";
		href = "";
		for (i = 0; i < elements.length; i++)
		{
			if (elements[i].getAttribute("property") == "og:url")
				href = elements[i].getAttribute("content");
			else if (elements[i].getAttribute("property") == "og:title")
				tit = elements[i].getAttribute("content");
		}
		var pos = href.lastIndexOf('/');
		href = href.substring(0,pos+1) + "dl/" + href.substring(pos+1);

		if (href.substring(0, 7) != "http://")
			href = "http://" + href;
		return {href: href, title: tit };
	}

	title = document.title;
	song = title.substring(0, title.indexOf(" - YouTube"));
	
	function performSearch(query) 
	{
		websiteFilter = '(site:hulkshare.com | site:zippyshare.com) & (intext:"You have requested the file" | intitle:"Listen to") -inurl:"related"';
		q = escape(websiteFilter + " " + query);
		visitUrl = "https://www.googleapis.com/customsearch/v1element?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&source=gcsc&cx=002337317970995791353:xhsqqzrqdw4&q=" + q;
		currentRequest = "";
		itemCount = 0;
		menu = addMenu();
		requestNumber = 5;

		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: visitUrl,
			headers:
			{
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'text/plain',
			},
			onload: function(responseDetails)
			{
					res=responseDetails.responseText;
					data = JSON.parse(res);
					results = data.results;
					requestNumber = (results.length >= requestNumber) ? requestNumber : results.length;
					
					for (i = 0; i < requestNumber; i++)
					{
						currentRequest = data.results[i].unescapedUrl;
						GM_xmlhttpRequest(
						{
							method: 'GET',
							url: currentRequest,
							headers: {
								'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
								'Accept': 'text/plain',
							},
							onload: function(responseDetails)
							{
								var holder = document.createElement('div');
								holder.style.display = "none";
								var finalUrl = responseDetails.finalUrl;
								holder.innerHTML = responseDetails.responseText.replace(/\\/g,"");
								document.body.appendChild(holder); //Dirty little fix but it works!
								tit = holder.getElementsByTagName("title")[0].innerHTML;
								href = "";
								
								//if (tit.toLowerCase().indexOf(".mp3") != -1)
								{
									if (tit.toLowerCase().indexOf("hulkshare") > -1)
									{
										if (tit.substring(0, 9) == "Listen to")
										{
											// tit =  tit.substring(0, tit.indexOf(" - Hulk Share -"));
											object = getHulkshare(holder);
											href = object.href;
											tit = "<b>Hulkshare</b> " + object.title;
										}
									}
									else if (tit.toLowerCase().indexOf("zippy") > -1)
									{
										tit = "<b>Zippyshare</b> " + tit.substring("Zippyshare.com - ".length);
										href = getZippyshare(holder, finalUrl);
									}
										if (href != "")
											addItem(menu, tit, href);
								}
								document.body.removeChild(holder); //And again a dirty little fix
							}
						});
					}
					//Synchronous request does not work so this dirty fix:
				setTimeout(function () {if (itemCount == 0) noResults(query, menu);}, 3000);
			}
		});
	}
	performSearch(song);
}