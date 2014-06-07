// ==UserScript==

// @name           Full Screen Game & Chat

// @namespace      Kongregate

// @description    Play games at full browser height on Kongregate.com

// @include        http://kongregate.com/games/*/*

// @include        http://www.kongregate.com/games/*/*

// @include        http://a.kongregate.com/games/*/*

// ==/UserScript==

if(document.getElementById("feature")) //kongregate domain
{

	(function(){
		var scriptText = 
			'function fullScreen()' + 
			'{' + 
				'var ins = document.getElementById("floating_game_holder");' + 
				'var a   = document.createElement("a");' + 
				'a.setAttribute("href","#");' + 
				'a.setAttribute("onClick","link()");' + 
				'a.setAttribute("style","padding:5px;");' + 
				'a.innerHTML = document.getElementsByTagName("title")[0].innerHTML.split(",")[0] + " Full Size!";' + 
				'ins.appendChild(a);' + 
			'}' + 
			'function link()' + 
			'{' + 
				'if(document.getElementsByTagName("iframe")[1].id == "flashiframe")' + 
				'{' + 
					'var url = document.getElementsByTagName("iframe")[1].contentWindow.document.getElementsByTagName("iframe")[0].contentWindow.document.getElementsByTagName("iframe")[0].src;' + 
					'var cha = document.getElementsByTagName("iframe")[1].contentWindow.document.getElementsByTagName("iframe")[0].contentDocument.getElementById("chat").src;' + 
					'var fla = document.getElementsByTagName("iframe")[1].contentWindow.document.getElementsByTagName("iframe")[0].contentDocument.getElementById("chat").getAttribute("flashvars");' + 
				'}' + 
				'else' + 
				'{' + 
					'var url = document.getElementsByTagName("iframe")[2].contentWindow.document.getElementsByTagName("iframe")[0].contentWindow.document.getElementsByTagName("iframe")[0].src;' + 
					'var cha = document.getElementsByTagName("iframe")[2].contentWindow.document.getElementsByTagName("iframe")[0].contentDocument.getElementById("chat").src;' + 
					'var fla = document.getElementsByTagName("iframe")[2].contentWindow.document.getElementsByTagName("iframe")[0].contentDocument.getElementById("chat").getAttribute("flashvars");' + 
				'}' + 
				'window.location = url + "&chat=" + cha + "?" + fla;' + 
			'}' + 
			'function linkChat()' + 
			'{' + 
				'chatMovie = document.getElementById("chat");' + 
			'}';
	
		var scrpt = document.createElement('script');
		scrpt.appendChild(document.createTextNode(scriptText));
		document.getElementsByTagName("head")[0].appendChild(scrpt);
			
		window.addEventListener("load", function(event)	
			{
				if(event.currentTarget.parent == window)
				{
					var page = window.location.href.split("data=")[1];

					if(page != null)
					{
						var ins = document.getElementById("maingame");
						
						//edit border settings
						var height = page.split("&height=")[1];
						var width  = page.split("&width=")[1].split("&height=")[0];
						var w      = (document.documentElement.clientWidth - width) / 2;
						page       = page.split("&width=")[0];
	
						document.getElementById("maingameholder").setAttribute("style","width:" + (parseInt(width)) + "px;height:" + height + "px;margin-left:" + w + "px;padding:3px");
						ins.setAttribute("style","width:" + width + "px;height:" + height + "px;margin-left:" + ((w*(-1))+7) + "px;");
	
						//insert new data
						ins.innerHTML = unescape(page);
	
						ins.id = "maingameWW";
	
						//stop any repreating code conflicts
						window.stop();
	
						unsafeWindow['linkChat']();	//link the new chat location
						window.scrollBy(3,285);		//scroll down to game
					}
					else
					{
						unsafeWindow['fullScreen']();	//add full size link
					}
				}
			}, 'false');
	})();
	
}
else //a.kongregate domain
{
	
	if(document.getElementById("chat") == null)
	{
		//chat and game resizing and div building
		var chat_url = document.location.href.split("chat=")[1];
	
		var height   = document.documentElement.clientHeight - 25;	//25 width surroundings
		var width    = document.documentElement.clientWidth  - 325;	//300 width of chat
		
		parts    = chat_url.split("_height=");
		chat_url = parts[0] + "_height=" + height + "&_width" + parts[1].split("_width")[1];
		
		parts  = chat_url.split("game_title=");
		var fs = parts[1].split("&");

		chat_url = parts[0] + "game_title=" + fs[0] + " (Full Size)";

		for(var i=1;i<fs.length;i++)
		{
			chat_url = chat_url + "&" + fs[i];
		}
		
		var game    = document.getElementById("game");
		var gamediv = document.getElementById("gamediv");
	
		var wp 	 = width  / game.width;
		var hp   = height / game.height;
	
		if(wp > hp)
		{
			game.height = game.height * hp;
			game.width  = game.width  * hp;
			gamediv.setAttribute("style","float:left;width:"+width+";margin-left:"+(width-game.width)/2+"px;");
		}
		else
		{
			game.height = game.height * wp;
			game.width  = game.width  * wp;
			gamediv.setAttribute("style","float:left;height:"+height+";margin-top:"+(height-game.height)/2+"px;");
		}
	
		var chat = document.createElement("EMBED");
		chat.setAttribute("src",chat_url);
		chat.setAttribute("type","application/x-shockwave-flash");
		chat.setAttribute("width","300");
		chat.setAttribute("height",height);
		chat.setAttribute("id","chat");
		chat.setAttribute("name","chat");
	
		//div abstraction
		var chatdiv = document.createElement("div");
		chatdiv.setAttribute("id","chat_container");
		chatdiv.setAttribute("class","chatholder");
		chatdiv.appendChild(chat);
	
		var td2 = document.createElement("td");
		td2.appendChild(chatdiv);
	
		var td1 = document.createElement("td");
		td1.appendChild(gamediv);
	
		var tr = document.createElement("tr");
		tr.appendChild(td1);
		tr.appendChild(td2);
	
		var table = document.createElement("table");
		table.setAttribute("style","border-collapse:collapse;");
		table.appendChild(tr);
	
		var maingame =  document.createElement("div");
		maingame.setAttribute("id","maingamecontent");
		maingame.appendChild(table);
	
		var wrap2 = document.createElement("div");
		wrap2.setAttribute("id","flashiframe");
		wrap2.appendChild(maingame);
	
		var wrap = document.createElement("div");
		wrap.setAttribute("id","flashiframe");
		wrap.appendChild(wrap2);
	
		var flash = document.createElement("div");
		flash.appendChild(wrap);

		//switch back to proper domain
		var w = parseInt(game.width) + 300;
		var h = height;
		var spacer = "";var r = document.location.href; r = r.split("kongregate.com")[1].split("/frame")[0]; window.location = "http://www.kongregate.com" + r + spacer + "?data=" + flash.innerHTML + "&width=" + w + "&height=" + h;
	}
	
}